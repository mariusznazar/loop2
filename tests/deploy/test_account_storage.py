"""Accounts and sessions outlive the replacement of the loop2 container (D-17, D-112).

The deployment replaces the application container and keeps its named volume `loop2_accounts`
mounted at `/app/data`. This test builds the image from the working tree, starts its normal
command with explicit production account settings on a fresh data volume and a synthetic
read-only session secret under 512 MiB, and checks as node that the fresh volume is writable.
The database path and the volume's mount point are those `compose.yaml` gives the `app`
service, so a deployment that would keep the database outside its volume loses it here.
Through the running server's own HTTP port, from inside the container, it creates an account
with a synthetic address and password and reads it with the session cookie it got. It then
removes that container, starts a new one from the same image on the same two volumes, and checks
that the session cookie still names the account and that the password still signs in.

The requests carry the headers Cloudflare's tunnel gives every request (D-110) and the public
origin, as the browser's would. The synthetic password and the cookie reach the container only
through the probe's standard input and are never printed.

Where no Docker daemon answers, the test is skipped and says what stays unchecked.

Does NOT cover: saved game states, which the product does not store yet, so the replacement
check of account-save-durable-storage stays open; the Compose stack and the deployment command
(the test runs the image with equivalent settings); a rollback to older code; the server's image.
"""

import json
import secrets
import shutil
import subprocess
import time
import unittest
import uuid

from tests.invariants import account_container_support as support
from tests.invariants import loop2_invariant_support as compose

DAEMON_TIMEOUT = 30     # seconds for `docker version` to answer
BUILD_TIMEOUT = 1200    # seconds for the image build
COMMAND_TIMEOUT = 120   # seconds for any other docker command
SERVE_WAIT = 60         # seconds for a started container to answer GET /

ORIGIN = "https://loop2.mariusznazar.com"
EMAIL = "replacement-check@example.com"
COOKIE = "__Host-loop2.sid"

# Run inside the container by its own Node.js: one request to the server, its status, JSON body
# and the session cookie it sets, if any.
REQUEST_PROBE = r"""
const spec = JSON.parse(SPEC);
const headers = { "x-forwarded-proto": "https", "cf-connecting-ip": "192.0.2.10" };
if (spec.cookie) headers.cookie = spec.cookie;
if (spec.body) {
  headers.origin = spec.origin;
  headers["content-type"] = "application/json";
}
fetch("http://127.0.0.1:" + process.env.LOOP2_LISTEN_PORT + spec.path, {
  method: spec.body ? "POST" : "GET", headers, redirect: "manual",
  body: spec.body ? JSON.stringify(spec.body) : undefined,
  signal: AbortSignal.timeout(20000),
}).then(async (response) => {
  const text = await response.text();
  let body = null;
  try { body = JSON.parse(text); } catch {}
  const cookie = response.headers.getSetCookie()
    .map((line) => line.split(";")[0]).find((pair) => pair.startsWith(spec.name + "="));
  console.log(JSON.stringify({ status: response.status, body, cookie: cookie ?? null }));
}, (error) => { console.error(String(error)); process.exit(1); });
"""


def compose_account_storage():
    """(database path, mount point of the `accounts` volume) of compose.yaml's `app` service."""
    _top, services = compose.compose_outline(compose.read_required("compose.yaml"))
    app = services["app"]
    environment = compose._yaml_mapping(app["environment"].block, app["environment"].line + 1)
    mounts = [line.strip()[2:].strip() for line in app["volumes"].block
              if line.strip().startswith("- ")]
    destinations = [mount.split(":")[1] for mount in mounts if mount.split(":")[0] == "accounts"]
    if len(destinations) != 1:
        raise AssertionError(f"compose.yaml mounts the accounts volume {len(destinations)} times")
    return environment["LOOP2_DATABASE_PATH"].value, destinations[0]


def docker():
    return shutil.which("docker")


def docker_answers():
    if docker() is None:
        return False
    try:
        result = subprocess.run([docker(), "version", "--format", "{{.Server.Version}}"],
                                capture_output=True, timeout=DAEMON_TIMEOUT)
    except (OSError, subprocess.TimeoutExpired):
        return False
    return result.returncode == 0 and result.stdout.strip() != b""


def docker_run(*arguments, timeout=COMMAND_TIMEOUT):
    result = subprocess.run([docker(), *arguments], cwd=support.ROOT, stdin=subprocess.DEVNULL,
                            stdout=subprocess.PIPE, stderr=subprocess.STDOUT, timeout=timeout)
    return result.returncode, result.stdout.decode("utf-8", "replace")


class AccountsSurviveContainerReplacement(unittest.TestCase):

    def test_replaced_container_keeps_accounts_and_sessions(self):
        # invariant: account-schema-lifecycle
        if not docker_answers():
            self.skipTest("no Docker daemon answers; whether accounts and sessions outlive a "
                          "container replacement stays unchecked")
        suffix = uuid.uuid4().hex[:12]
        tag = "loop2-account-storage-check:" + suffix
        self.addCleanup(docker_run, "image", "rm", "-f", tag)
        code, output = docker_run("build", "--build-arg", "LOOP2_COMMIT=account-storage-check",
                                  "-t", tag, ".", timeout=BUILD_TIMEOUT)
        self.assertEqual(code, 0, f"`docker build` failed:\n{output}")
        storage = compose_account_storage()
        data_volume, secret_volume = support.create_account_volumes(self, tag)
        password = secrets.token_hex(16)

        first = "loop2-account-storage-first-" + suffix
        support.start_application(self, tag, first, data_volume, secret_volume, *storage)
        support.verify_account_resources(self, first, data_volume, secret_volume, *storage)
        self.wait_until_serving(first)
        created = self.request(first, "/api/accounts", body={
            "email": EMAIL, "password": password, "passwordConfirmation": password})
        self.assertEqual(created["status"], 201, created["body"])
        account = created["body"]
        self.assertEqual(account["email"], EMAIL)
        cookie = created["cookie"]
        self.assertIsNotNone(cookie, "registration set no session cookie")
        before = self.request(first, "/api/account", cookie=cookie)
        self.assertEqual((before["status"], before["body"]), (200, account))

        code, output = docker_run("rm", "--force", first)
        self.assertEqual(code, 0, output)
        code, output = docker_run("volume", "inspect", data_volume)
        self.assertEqual(code, 0, f"the data volume went with its container: {output}")

        second = "loop2-account-storage-second-" + suffix
        support.start_application(self, tag, second, data_volume, secret_volume, *storage)
        support.verify_account_resources(self, second, data_volume, secret_volume, *storage)
        self.wait_until_serving(second)
        after = self.request(second, "/api/account", cookie=cookie)
        self.assertEqual((after["status"], after["body"]), (200, account),
                         "the session of the replaced container no longer names its account")
        signed_in = self.request(second, "/api/session",
                                 body={"email": EMAIL, "password": password})
        self.assertEqual((signed_in["status"], signed_in["body"]), (200, account),
                         "the account's password no longer signs in after the replacement")
        again = self.request(second, "/api/accounts", body={
            "email": EMAIL, "password": password, "passwordConfirmation": password})
        self.assertEqual(again["status"], 409, "the address could be registered a second time")

    def request(self, name, path, body=None, cookie=None):
        spec = {"path": path, "body": body, "cookie": cookie, "origin": ORIGIN, "name": COOKIE}
        script = REQUEST_PROBE.replace("SPEC", json.dumps(json.dumps(spec)), 1)
        result = subprocess.run([docker(), "exec", "-i", name, "node", "-"],
                                input=script.encode("utf-8"), capture_output=True,
                                timeout=COMMAND_TIMEOUT)
        # The probe's input holds the password and cookie; its output only the cookie.
        self.assertEqual(result.returncode, 0,
                         f"request {path} failed: {result.stderr.decode('utf-8', 'replace')}")
        return json.loads(result.stdout.decode("utf-8").strip().splitlines()[-1])

    def wait_until_serving(self, name):
        deadline = time.monotonic() + SERVE_WAIT
        while True:
            result = subprocess.run(
                [docker(), "exec", name, "node", "-e",
                 "fetch('http://127.0.0.1:3000/').then(r => process.exit(r.status === 200 ? 0 "
                 ": 1), () => process.exit(1))"],
                capture_output=True, timeout=COMMAND_TIMEOUT)
            if result.returncode == 0:
                return
            if time.monotonic() > deadline:
                self.fail(f"{name} does not serve within {SERVE_WAIT} s:\n"
                          f"{docker_run('logs', name)[1]}")
            time.sleep(1)


if __name__ == "__main__":
    unittest.main()
