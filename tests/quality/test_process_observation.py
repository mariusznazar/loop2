"""Check that failed process observations cannot supply successful invariant evidence."""

from pathlib import Path
import subprocess
import sys
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "invariants"))
import test_loop2_one_serving_process as observation


class ProcessObservation(unittest.TestCase):
    def read(self, reader, platform, command_name, stdout, returncode):
        def invoke(command, **options):
            if command[0] != command_name:
                raise ValueError(f"unexpected process command: {command!r}")
            return subprocess.CompletedProcess(command, returncode, stdout, b"read failed")

        with patch.object(observation.os, "name", platform):
            with patch.object(observation.subprocess, "run", side_effect=invoke):
                return reader()

    def test_failed_windows_process_read_rejects_plausible_output(self):
        with self.assertRaises(AssertionError):
            self.read(observation._processes, "nt", "powershell",
                      b"42 7 1700000000000 node.exe\r\n", 1)

    def test_failed_unix_process_read_rejects_plausible_output(self):
        with self.assertRaises(AssertionError):
            self.read(observation._processes, "posix", "ps", b"42 7 node\n", 1)

    def test_failed_windows_listener_read_rejects_plausible_output(self):
        with self.assertRaises(AssertionError):
            self.read(observation.tcp_listeners, "nt", "powershell",
                      b"42 127.0.0.1 3000\r\n", 1)

    def test_failed_unix_listener_read_rejects_plausible_output(self):
        with self.assertRaises(AssertionError):
            self.read(observation.tcp_listeners, "posix", "lsof",
                      b"p42\nn127.0.0.1:3000\n", 1)

    def test_successful_windows_process_read_preserves_process_fields(self):
        self.assertEqual(
            self.read(observation._processes, "nt", "powershell",
                      b"42 7 1700000000000 node.exe\r\n", 0),
            {42: (7, 1700000000000, "node.exe")})

    def test_successful_unix_process_read_preserves_process_fields(self):
        self.assertEqual(
            self.read(observation._processes, "posix", "ps", b"42 7 node\n", 0),
            {42: (7, None, "node")})

    def test_successful_windows_listener_read_preserves_listener_fields(self):
        self.assertEqual(
            self.read(observation.tcp_listeners, "nt", "powershell",
                      b"42 127.0.0.1 3000\r\n", 0),
            [(42, "127.0.0.1", 3000)])

    def test_successful_unix_listener_read_preserves_listener_fields(self):
        self.assertEqual(
            self.read(observation.tcp_listeners, "posix", "lsof",
                      b"p42\nn127.0.0.1:3000\n", 0),
            [(42, "127.0.0.1", 3000)])


if __name__ == "__main__":
    unittest.main()
