"""Check that failed process observations cannot supply successful invariant evidence."""

from pathlib import Path
import os
import subprocess
import time
import sys
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "invariants"))
import test_loop2_one_serving_process as observation


class ProcessObservation(unittest.TestCase):
    def read(self, reader, platform, command_name, stdout, returncode, stderr=b""):
        def invoke(command, **options):
            if command[0] != command_name:
                raise ValueError(f"unexpected process command: {command!r}")
            return subprocess.CompletedProcess(command, returncode, stdout, stderr)

        with patch.object(observation.os, "name", platform):
            with patch.object(observation.subprocess, "run", side_effect=invoke):
                return reader()

    def test_exit_zero_windows_process_error_rejects_partial_output(self):
        with self.assertRaisesRegex(AssertionError, "query failed"):
            self.read(observation._processes, "nt", "powershell",
                      b"42 7 1700000000000 node.exe\r\n", 0, b"query failed")

    @unittest.skipUnless(os.name == "nt", "native Windows CIM integration")
    def test_native_windows_readers_reject_nonterminating_cim_errors(self):
        real_run = subprocess.run
        results = []

        def partial_read(command, **options):
            changed = list(command)
            changed[-1] = changed[-1].replace(
                "Get-CimInstance Win32_Process",
                "@(Get-CimInstance Win32_Process | Select-Object -First 1; "
                "Get-CimInstance Loop2MissingObservationClass)")
            result = real_run(changed, **options)
            results.append(result)
            return result

        for reader in (observation._processes,
                       lambda: observation.support._windows_descendants(os.getpid(), 0)):
            with self.subTest(reader=reader):
                with patch.object(observation.subprocess, "run", side_effect=partial_read):
                    with self.assertRaisesRegex(AssertionError, "Get-CimInstance failed"):
                        reader()
                result = results[-1]
                self.assertEqual(result.returncode, 0)
                self.assertTrue(result.stdout.strip(), "probe produced no partial table")
                self.assertIn(b"Get-CimInstance", result.stderr)

    @unittest.skipUnless(os.name == "nt", "native Windows CIM integration")
    def test_native_windows_readers_keep_owned_child_in_healthy_observation(self):
        started = time.time()
        child = subprocess.Popen([sys.executable, "-c", "import time; time.sleep(60)"],
                                 stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL,
                                 stderr=subprocess.DEVNULL)
        try:
            table = observation._processes()
            self.assertEqual(table[child.pid][0], os.getpid())
            self.assertIn(child.pid,
                          observation.support._windows_descendants(os.getpid(), started))
        finally:
            child.kill()
            child.wait(timeout=10)

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
