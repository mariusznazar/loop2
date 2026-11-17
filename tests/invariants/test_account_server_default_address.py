"""Invariant account-server-default-address: the server started without a listening address of
its own takes 127.0.0.1:3000 after configuration validation. Two cases establish it, wholly
unconfigured non-production startup and fully configured valid startup, explicitly (D-111).

The product is built by `npm run build` in a temporary copy of the working tree, and its built
server `dist/server/main.js` is started there by `node` with neither `LOOP2_LISTEN_HOST` nor
`LOOP2_LISTEN_PORT` in its environment; the real tree is never written. The first case gives it
no account setting; the second gives it every account setting valid, with the database, the
session secret file and the SMTP password file in a temporary directory. Each check passes whether
or not 127.0.0.1:3000 is free when it runs:
- the server prints its readiness line `Loop: http://127.0.0.1:3000`, and the check stops it at
  once; or
- the server exits with a non-zero code before any readiness line, and its error output names
  `127.0.0.1:3000` together with `EADDRINUSE`, the address being held by another process.

A readiness line naming another address, an exit with code 0, an exit whose message names no
occupied 127.0.0.1:3000, and a server that neither prints a readiness line nor exits within
START_WAIT seconds each fail.

Does NOT cover: whether 127.0.0.1:3000 answers HTTP once the line is printed (the other checks of
the started server do that on a free port); an address taken by `npm start` instead of `node`;
that each account setting is validated (tests/startup.test.mjs does that).
"""

import base64
import json
import os
import re
import secrets
import shutil
import tempfile
import time
import unittest

import loop2_invariant_support as support

LISTEN_VARIABLES = ("LOOP2_LISTEN_HOST", "LOOP2_LISTEN_PORT")
ACCOUNT_VARIABLES = ("LOOP2_DATABASE_PATH", "LOOP2_SESSION_SECRET_FILE",
                     "LOOP2_PUBLIC_ORIGIN", "LOOP2_PROXY_MODE",
                     "LOOP2_MAIL_FROM", "LOOP2_SMTP_HOST", "LOOP2_SMTP_PORT",
                     "LOOP2_SMTP_USER", "LOOP2_SMTP_PASSWORD_FILE")
DEFAULT_READY_LINE = re.compile(r"(?m)^Loop: http://127\.0\.0\.1:3000$")
ANY_READY_LINE = re.compile(r"(?m)^Loop: .*$")
OCCUPIED_DEFAULT = re.compile(r"127\.0\.0\.1:3000.*EADDRINUSE|EADDRINUSE.*127\.0\.0\.1:3000")
START_WAIT = 15  # seconds for the server to print a readiness line or exit


def environment_without_listen_or_account_settings(node_env):
    environment = {name: value for name, value in os.environ.items()
                   if name not in LISTEN_VARIABLES + ACCOUNT_VARIABLES}
    environment["NODE_ENV"] = node_env
    return environment


class AccountServerDefaultAddress(unittest.TestCase):

    def assert_default_address(self, environment):
        """Start the built server with `environment` and check the readiness line or the
        occupied-address exit on 127.0.0.1:3000."""
        copy = support.built_copy()
        node = shutil.which("node")
        self.assertIsNotNone(node, "node is not on PATH")
        log_dir = tempfile.mkdtemp(prefix="loop2-default-address-")
        self.addCleanup(shutil.rmtree, log_dir, ignore_errors=True)
        stdout_path = os.path.join(log_dir, "stdout.txt")
        stderr_path = os.path.join(log_dir, "stderr.txt")
        with open(stdout_path, "wb") as stdout, open(stderr_path, "wb") as stderr:
            process = support.popen([node, copy.file("dist/server/main.js")], copy.path,
                                    env=environment, stdout=stdout, stderr=stderr)
            try:
                deadline = time.monotonic() + START_WAIT
                while True:
                    exited = process.poll() is not None
                    out = support.read_text(stdout_path)
                    if ANY_READY_LINE.search(out) or exited or time.monotonic() > deadline:
                        break
                    time.sleep(0.1)
            finally:
                support.kill_tree(process)
        out = support.read_text(stdout_path)
        err = support.read_text(stderr_path)
        output = f"--- stdout ---\n{out}\n--- stderr ---\n{err}"
        ready = ANY_READY_LINE.search(out)
        if ready:
            self.assertRegex(out, DEFAULT_READY_LINE,
                             f"the server reported ready on another address:\n{output}")
            return
        self.assertTrue(exited, f"the server neither reported ready nor exited within "
                                f"{START_WAIT} s:\n{output}")
        self.assertNotEqual(process.returncode, 0,
                            f"the server exited 0 without reporting ready:\n{output}")
        self.assertRegex(err, OCCUPIED_DEFAULT,
                         f"the server exited without naming an occupied 127.0.0.1:3000:\n"
                         f"{output}")

    def test_server_without_listen_variables_takes_127_0_0_1_3000(self):
        # invariant: account-server-default-address
        self.assert_default_address(environment_without_listen_or_account_settings("test"))

    def test_fully_configured_server_without_listen_variables_takes_127_0_0_1_3000(self):
        # invariant: account-server-default-address
        settings_dir = tempfile.mkdtemp(prefix="loop2-default-address-settings-")
        self.addCleanup(shutil.rmtree, settings_dir, ignore_errors=True)
        secret_file = os.path.join(settings_dir, "session-secrets.json")
        with open(secret_file, "w", encoding="utf-8") as handle:
            json.dump([base64.urlsafe_b64encode(secrets.token_bytes(32)).rstrip(b"=").decode()
                       for _ in range(2)], handle)
        password_file = os.path.join(settings_dir, "smtp-password")
        with open(password_file, "w", encoding="utf-8") as handle:
            handle.write("synthetic-smtp-password")
        environment = environment_without_listen_or_account_settings("production")
        environment.update({
            "LOOP2_DATABASE_PATH": os.path.join(settings_dir, "accounts.sqlite"),
            "LOOP2_SESSION_SECRET_FILE": secret_file,
            "LOOP2_PUBLIC_ORIGIN": "https://game.example.test:8443",
            "LOOP2_PROXY_MODE": "cloudflare-tunnel",
            "LOOP2_MAIL_FROM": "sender@mail.example.test",
            "LOOP2_SMTP_HOST": "smtp.example.test",
            "LOOP2_SMTP_PORT": "587",
            "LOOP2_SMTP_USER": "sender@mail.example.test",
            "LOOP2_SMTP_PASSWORD_FILE": password_file,
        })
        self.assert_default_address(environment)


if __name__ == "__main__":
    unittest.main()
