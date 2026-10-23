"""Invariant account-server-occupied-address: an occupied address prevents readiness.

The built server is started on 127.0.0.1 and a port the system names free, given to it in
`LOOP2_LISTEN_HOST` and `LOOP2_LISTEN_PORT`: once normally, as a control, then while this check
holds a port the system named free by binding port 0, and once more normally."""

import os
import re
import shutil
import socket
import subprocess
import unittest

import loop2_invariant_support as support

ANY_READY_LINE = re.compile(r"(?m)^Loop: ")


def ready_line(port):
    return re.compile(r"(?m)^Loop: http://127\.0\.0\.1:" + str(port) + r"\s*$")


class AccountServerOccupiedAddress(unittest.TestCase):

    def test_occupied_address_exits_without_reporting_ready(self):
        # invariant: account-server-occupied-address
        copy = support.built_copy()
        node = shutil.which("node")
        self.assertIsNotNone(node, "node is not on PATH")

        def require_normal_launch():
            server = support.Server(copy)
            try:
                self.assertRegex(server.output(), ready_line(server.port))
            finally:
                server.stop()
            self.assertFalse(support.port_in_use(server.port),
                             "server address remained occupied after stop")

        require_normal_launch()

        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as blocker:
            blocker.bind((support.HOST, 0))
            blocker.listen(5)
            port = blocker.getsockname()[1]
            self.assertTrue(support.port_in_use(port), "blocker did not hold the server address")

            result = subprocess.run(
                [node, copy.file("dist/server/main.js")],
                cwd=copy.path,
                env={**os.environ, "LOOP2_LISTEN_HOST": support.HOST,
                     "LOOP2_LISTEN_PORT": str(port)},
                capture_output=True,
                text=True,
                timeout=10,
            )
            self.assertNotEqual(result.returncode, 0)
            output = result.stdout + "\n" + result.stderr
            self.assertNotRegex(output, ANY_READY_LINE)
            self.assertTrue(support.port_in_use(port), "blocker lost the server address")

        require_normal_launch()


if __name__ == "__main__":
    unittest.main()
