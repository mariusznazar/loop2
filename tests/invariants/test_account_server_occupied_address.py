"""Invariant account-server-occupied-address/1: an occupied address prevents readiness."""

import re
import shutil
import socket
import subprocess
import time
import unittest

import loop2_invariant_support as support


READY_LINE = re.compile(r"(?m)^Loop: http://127\.0\.0\.1:3000$")


class AccountServerOccupiedAddress(unittest.TestCase):

    def test_occupied_address_exits_without_reporting_ready(self):
        # invariant: account-server-occupied-address/1
        self.assertFalse(support.port_in_use(), "server address is occupied before the control")
        copy = support.built_copy()
        node = shutil.which("node")
        self.assertIsNotNone(node, "node is not on PATH")

        def require_normal_launch():
            server = support.Server(copy)
            try:
                deadline = time.monotonic() + 5
                while not READY_LINE.search(server.output()) and time.monotonic() < deadline:
                    time.sleep(0.1)
                self.assertRegex(server.output(), READY_LINE)
            finally:
                server.stop()
            self.assertFalse(support.port_in_use(), "server address remained occupied after stop")

        require_normal_launch()

        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as blocker:
            blocker.bind((support.HOST, support.PORT))
            blocker.listen(5)
            self.assertTrue(support.port_in_use(), "blocker did not hold the server address")

            result = subprocess.run(
                [node, copy.file("dist/server/main.js")],
                cwd=copy.path,
                capture_output=True,
                text=True,
                timeout=10,
            )
            self.assertNotEqual(result.returncode, 0)
            output = result.stdout + "\n" + result.stderr
            self.assertNotRegex(output, READY_LINE)
            self.assertTrue(support.port_in_use(), "blocker lost the server address")

        require_normal_launch()


if __name__ == "__main__":
    unittest.main()
