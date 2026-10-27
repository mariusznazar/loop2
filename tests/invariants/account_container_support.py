"""Disposable production account resources for local application-image smoke tests.

Files are created inside the daemon's volumes, so a remote disposable daemon needs no
host-path bind mount. No credential is passed in arguments, environment or output.
`start_production_container` starts one container on fresh volumes; a test replacing the
container calls its three steps itself and starts the next container on the same volumes.
"""

import json
import os
import shutil
import subprocess
import uuid

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
COMMAND_TIMEOUT = 120

SECRET_SETUP = """
const fs = require('node:fs');
const { randomBytes } = require('node:crypto');
const path = '/run/secrets/loop2_session_secrets';
fs.writeFileSync(path, JSON.stringify([randomBytes(32).toString('base64url')]),
                 { mode: 0o440, flag: 'wx' });
fs.chownSync(path, 0, 1000);
"""

RESOURCE_PROBE = """
(async () => {
const fs = require('node:fs');
const { AccountDatabase } = await import('/app/dist/server/database.js');
const path = process.env.LOOP2_DATABASE_PATH;
const secret = process.env.LOOP2_SESSION_SECRET_FILE;
const stat = fs.statSync('/app/data');
const secretStat = fs.statSync(secret);
const keys = JSON.parse(fs.readFileSync(secret, 'utf8'));
fs.writeFileSync('/app/data/node-write-probe', 'written by node', { flag: 'wx' });
const written = fs.readFileSync('/app/data/node-write-probe', 'utf8');
fs.unlinkSync('/app/data/node-write-probe');
const database = new AccountDatabase(path);
database.close();
console.log(JSON.stringify({ uid: process.getuid(), gid: process.getgid(),
  directoryUid: stat.uid, directoryGid: stat.gid, written,
  secretUid: secretStat.uid, secretGid: secretStat.gid,
  secretMode: secretStat.mode & 0o777, keyBytes: keys.map(k => Buffer.from(k, 'base64url').length),
  databasePath: path, production: process.env.NODE_ENV,
  databaseFile: fs.statSync(path).isFile(),
  origin: process.env.LOOP2_PUBLIC_ORIGIN, proxyMode: process.env.LOOP2_PROXY_MODE }));
})().catch(error => { console.error(error); process.exitCode = 1; });
"""


def run(*arguments, script=None):
    result = subprocess.run([shutil.which("docker"), *arguments], cwd=ROOT,
                            input=None if script is None else script.encode("utf-8"),
                            capture_output=True, timeout=COMMAND_TIMEOUT)
    return result.returncode, (result.stdout + result.stderr).decode("utf-8", "replace")


def create_account_volumes(test, tag):
    """Fresh data and secret volumes, the secret holding synthetic session material.

    The volumes are removed when the test ends; the data volume outlives any one container, so a
    test can replace the application container and keep it."""
    suffix = uuid.uuid4().hex
    data_volume = "loop2-account-data-check-" + suffix
    secret_volume = "loop2-account-secret-check-" + suffix
    for volume in (data_volume, secret_volume):
        # Prove this name is absent, then let Docker create it; never reuse another run's data.
        code, _output = run("volume", "inspect", volume)
        test.assertNotEqual(code, 0, "temporary volume already exists")
        test.addCleanup(run, "volume", "rm", volume)
        code, output = run("volume", "create", volume)
        test.assertEqual(code, 0, output)
    setup = "loop2-account-secret-setup-" + suffix[:12]
    test.addCleanup(run, "rm", "-f", setup)
    code, output = run("run", "--rm", "-i", "--name", setup, "--network", "none",
                       "--memory", "512m", "--user", "0:0", "--entrypoint", "node",
                       "--mount", f"type=volume,src={secret_volume},dst=/run/secrets",
                       tag, "-", script=SECRET_SETUP)
    test.assertEqual(code, 0, f"temporary secret setup failed: {output}")
    return data_volume, secret_volume


def start_application(test, tag, name, data_volume, secret_volume):
    """Start the image's normal command with explicit production settings on the given volumes."""
    test.addCleanup(run, "rm", "-f", name)
    code, output = run("run", "-d", "--init", "--name", name, "--memory", "512m",
                       "--mount", f"type=volume,src={data_volume},dst=/app/data",
                       "--mount", f"type=volume,src={secret_volume},dst=/run/secrets,readonly",
                       "-e", "LOOP2_DATABASE_PATH=/app/data/accounts.sqlite",
                       "-e", "LOOP2_SESSION_SECRET_FILE=/run/secrets/loop2_session_secrets",
                       "-e", "LOOP2_PUBLIC_ORIGIN=https://loop2.mariusznazar.com",
                       "-e", "LOOP2_PROXY_MODE=cloudflare-tunnel", tag)
    test.assertEqual(code, 0, f"production container start failed: {output}")


def start_production_container(test, tag, name):
    """Start the image's normal command with fresh database and read-only secret volumes."""
    data_volume, secret_volume = create_account_volumes(test, tag)
    start_application(test, tag, name, data_volume, secret_volume)
    verify_account_resources(test, name, data_volume, secret_volume)


def verify_account_resources(test, name, data_volume, secret_volume):
    """Node writes the data volume and opens the database; settings, limit and mounts hold."""
    code, output = run("exec", "-i", name, "node", "-", script=RESOURCE_PROBE)
    test.assertEqual(code, 0, f"node cannot use fresh account resources: {output}")
    # The successful probe writes one JSON line; Node may append SQLite's experimental warning.
    actual = json.loads(output.splitlines()[0])
    test.assertEqual(actual, {
        "uid": 1000, "gid": 1000, "directoryUid": 1000, "directoryGid": 1000,
        "written": "written by node", "secretUid": 0, "secretGid": 1000,
        "secretMode": 0o440, "keyBytes": [32],
        "databasePath": "/app/data/accounts.sqlite", "databaseFile": True,
        "production": "production",
        "origin": "https://loop2.mariusznazar.com", "proxyMode": "cloudflare-tunnel",
    })
    code, output = run("inspect", name)
    test.assertEqual(code, 0, output)
    container = json.loads(output)[0]
    test.assertEqual(container["HostConfig"]["Memory"], 512 * 1024 * 1024)
    mounts = {mount["Destination"]: mount for mount in container["Mounts"]}
    test.assertEqual(set(mounts), {"/app/data", "/run/secrets"})
    test.assertEqual(mounts["/app/data"].get("Name"), data_volume)
    test.assertTrue(mounts["/app/data"]["RW"])
    test.assertFalse(mounts["/run/secrets"]["RW"])
    test.assertEqual(container["HostConfig"]["PortBindings"], {})
    print(f"Production image {container['Image']}; container {name}; data volume {data_volume}; "
          f"secret volume {secret_volume}; uid/gid 1000; memory 536870912; resources verified",
          flush=True)
