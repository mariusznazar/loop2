"""Exercise test-server ownership when initialization and process observation fail."""

from contextlib import ExitStack
from pathlib import Path
import os
import subprocess
import sys
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "invariants"))
import loop2_invariant_support as support


class ServerResources(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="server-resources-")
        self.addCleanup(self.temporary.cleanup)
        self.copy = SimpleNamespace(path=self.temporary.name)
        self.handles = []
        self.log_dirs = []
        self.real_open = open
        self.real_mkdtemp = tempfile.mkdtemp
        self.stack = ExitStack()
        self.addCleanup(self.stack.close)
        self.stack.enter_context(patch.object(support, "port_in_use", return_value=False))
        self.stack.enter_context(patch.object(support, "npm", return_value=sys.executable))
        self.stack.enter_context(patch.object(support.tempfile, "mkdtemp", self.make_log_dir))
        self.stack.enter_context(patch.object(support, "open", self.open_log, create=True))

    def make_log_dir(self, **options):
        directory = self.real_mkdtemp(dir=self.copy.path, **options)
        self.log_dirs.append(directory)
        return directory

    def open_log(self, path, mode="r", **options):
        handle = self.real_open(path, mode, **options)
        if mode != "wb":
            return handle
        self.handles.append(handle)
        self.addCleanup(handle.close)
        return handle

    def assert_released(self):
        self.assertTrue(self.handles)
        self.assertTrue(all(handle.closed for handle in self.handles))
        self.assertTrue(self.log_dirs)
        self.assertTrue(all(not os.path.exists(path) for path in self.log_dirs))

    def test_second_log_open_failure_releases_first_log_and_directory(self):
        def open_until_stderr(path, mode):
            if os.path.basename(path) == "stderr.txt":
                raise PermissionError("stderr open failed")
            return self.open_log(path, mode)

        with patch.object(support, "open", open_until_stderr):
            with self.assertRaisesRegex(PermissionError, "stderr open failed"):
                support.Server(self.copy)
        self.assert_released()

    def test_spawn_failure_releases_both_logs_and_directory(self):
        with patch.object(support, "popen", side_effect=OSError("spawn failed")):
            with self.assertRaisesRegex(OSError, "spawn failed"):
                support.Server(self.copy)
        self.assertEqual(len(self.handles), 2)
        self.assert_released()

    def test_stop_without_a_process_releases_acquired_resources(self):
        server = support.Server.__new__(support.Server)
        server.log_dir = self.make_log_dir(prefix="partial-")
        server.process = None
        server._logs = ExitStack()
        self.addCleanup(server._logs.close)
        server._stdout = server._logs.enter_context(
            self.open_log(os.path.join(server.log_dir, "stdout.txt"), "wb"))
        server.stop()
        self.assert_released()

    def test_live_server_keeps_both_logs_open_until_stop(self):
        real_popen = support.popen

        def start_child(_args, cwd, **options):
            process = real_popen([sys.executable, "-u", "-c",
                                  "import sys,time; print('child out'); "
                                  "print('child err',file=sys.stderr); time.sleep(60)"],
                                 cwd, **options)
            self.addCleanup(self.reap, process)
            return process

        with patch.object(support, "popen", start_child):
            with patch.object(support, "port_in_use", side_effect=[False, True]):
                server = support.Server(self.copy)
        self.addCleanup(server.stop)
        self.assertFalse(server._stdout.closed)
        self.assertFalse(server._stderr.closed)
        self.assertTrue(os.path.isdir(server.log_dir))
        server._stdout.write(b"probe out\n")
        server._stderr.write(b"probe err\n")
        self.assertIn("probe out", server.output())
        self.assertIn("probe err", server.stderr())
        server.stop()
        self.assertIsNotNone(server.process.poll())
        self.assert_released()

    def test_stop_releases_logs_when_process_cleanup_reports_failure(self):
        server = support.Server.__new__(support.Server)
        server.log_dir = self.make_log_dir(prefix="stop-failure-")
        server.process = object()
        server._logs = ExitStack()
        self.addCleanup(server._logs.close)
        for name in ("stdout.txt", "stderr.txt"):
            server._logs.enter_context(self.open_log(os.path.join(server.log_dir, name), "wb"))
        with patch.object(support, "kill_tree", side_effect=AssertionError("query failed")):
            with self.assertRaisesRegex(AssertionError, "query failed"):
                server.stop()
        self.assert_released()

    @staticmethod
    def reap(process):
        if process.poll() is None:
            process.kill()
        process.wait(timeout=10)


class WindowsProcessCleanup(unittest.TestCase):
    def test_failed_descendant_query_rejects_partial_stdout(self):
        answer = subprocess.CompletedProcess(["powershell"], 1,
                                             b"42 7 1700000000000\r\n", b"query failed")
        with patch.object(support.subprocess, "run", return_value=answer):
            with self.assertRaisesRegex(AssertionError, "query failed"):
                support._windows_descendants(7, 1700000000)

    def test_successful_descendant_query_keeps_age_and_parent_filter(self):
        answer = subprocess.CompletedProcess(["powershell"], 0,
                                             b"42 7 1700000000000\n"
                                             b"43 42 1700000000000\n"
                                             b"44 7 1600000000000\n"
                                             b"45 45 1700000000000\n", b"")
        with patch.object(support.subprocess, "run", return_value=answer):
            self.assertEqual(support._windows_descendants(7, 1700000000), [42, 43])

    @unittest.skipUnless(os.name == "nt", "native Windows taskkill integration")
    def test_failed_descendant_query_still_terminates_known_main_process(self):
        real_run = subprocess.run
        sentinel = subprocess.Popen([sys.executable, "-c", "import time; time.sleep(60)"],
                                    stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL,
                                    stderr=subprocess.DEVNULL)
        self.addCleanup(ServerResources.reap, sentinel)
        for failure in (None,
                        subprocess.TimeoutExpired(["powershell"], 60)):
            with self.subTest(failure=type(failure).__name__):
                process = subprocess.Popen([sys.executable, "-c", "import time; time.sleep(60)"],
                                           stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL,
                                           stderr=subprocess.DEVNULL)
                self.addCleanup(ServerResources.reap, process)

                def query_fails(command, failure=failure, process=process, **options):
                    if command[0] == "powershell":
                        if failure is not None:
                            raise failure
                        partial = f"{sentinel.pid} {process.pid} 9999999999999\n".encode()
                        return subprocess.CompletedProcess(command, 1, partial, b"query failed")
                    return real_run(command, **options)

                with patch.object(support.subprocess, "run", side_effect=query_fails):
                    with self.assertRaises(type(failure) if failure is not None else AssertionError):
                        support.kill_tree(process)
                self.assertIsNotNone(process.poll(), "main process survived failed observation")
                self.assertIsNone(sentinel.poll(), "partial failed output killed unrelated process")


if __name__ == "__main__":
    unittest.main()
