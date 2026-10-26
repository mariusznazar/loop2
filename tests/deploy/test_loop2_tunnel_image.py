"""The pinned connector can execute Compose's readiness check as its inherited nonroot user.

D-10/D-13 require a real connector image and the host token's group-readable permissions.
This smoke test catches an image update that removes `ready`, changes the runtime identity,
or drops the loop2 ownership label. With no tunnel running, readiness must fail by refusing
its local connection. This is not evidence of authenticated readiness or host token access.
"""

import json
import os
import shutil
import subprocess
import unittest
import uuid

import deploy_script_support as support


class ConnectorImage(unittest.TestCase):

    def command(self, *arguments, timeout=30):
        return subprocess.run([self.docker, *arguments], cwd=support.ROOT,
                              capture_output=True, text=True, encoding="utf-8",
                              errors="replace", timeout=timeout)

    def test_nonroot_connector_can_run_the_disconnected_readiness_check(self):
        self.docker = shutil.which("docker")
        if self.docker is None:
            self.skipTest("Docker unavailable; connector image capabilities stay unchecked")
        try:
            daemon = self.command("version", "--format", "{{.Server.Version}}")
        except (OSError, subprocess.TimeoutExpired):
            self.skipTest("Docker daemon unavailable; connector image capabilities stay unchecked")
        if daemon.returncode != 0 or not daemon.stdout.strip():
            self.skipTest("Docker daemon unavailable; connector image capabilities stay unchecked")

        config = self.command("compose", "--project-name", "loop2", "-f", "compose.yaml",
                              "config", "--format", "json")
        self.assertEqual(config.returncode, 0, config.stderr)
        connector = json.loads(config.stdout)["services"]["cloudflared"]
        health = connector["healthcheck"]["test"]
        self.assertEqual(health[0], "CMD", "the distroless image needs an exec-form healthcheck")
        tag = "loop2-tunnel-check:" + uuid.uuid4().hex[:12]
        name = "loop2-tunnel-check-" + uuid.uuid4().hex[:12]
        image = self.command("build", "-f", connector["build"]["dockerfile"], "-t", tag,
                             os.fspath(support.ROOT), timeout=300)
        self.addCleanup(self.command, "image", "rm", "-f", tag)
        self.assertEqual(image.returncode, 0, image.stdout + image.stderr)
        identity = self.command("image", "inspect", "--format", "{{.Config.User}}", tag)
        self.assertEqual(identity.returncode, 0, identity.stderr)
        self.assertEqual(identity.stdout.strip(), "65532:65532")
        owner = self.command("image", "inspect", "--format",
                             '{{index .Config.Labels "org.opencontainers.image.title"}}', tag)
        self.assertEqual(owner.returncode, 0, owner.stderr)
        self.assertEqual(owner.stdout.strip(), "loop2")

        self.addCleanup(self.command, "rm", "-f", name)
        ready = self.command("run", "--name", name, "--network", "none", "--entrypoint",
                             health[1], tag, *health[2:])
        self.assertNotEqual(ready.returncode, 0, ready.stdout + ready.stderr)
        self.assertIn("connection refused", ready.stdout + ready.stderr)


if __name__ == "__main__":
    unittest.main()
