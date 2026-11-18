"""Run one test case (or a whole test file) of the repository in a process of its own.

usage: run_case.py ROOT FILE [CASE] -- env STOPFILE (a whole-file run stops at the next test once
the file exists), RUNLOG (one line per script run: its index and seconds).
"""
import os
import sys
import time
import unittest
import importlib.util
from pathlib import Path

root = Path(sys.argv[1]).resolve()
target = (root / sys.argv[2]).resolve()
case = sys.argv[3] if len(sys.argv) > 3 else None
sys.path[:0] = [str(target.parent), str(root), str(root / "scripts")]
stop = os.environ.get("STOPFILE")
runlog = os.environ.get("RUNLOG")

spec = importlib.util.spec_from_file_location(target.stem, target)
module = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = module
spec.loader.exec_module(module)

if runlog:
    support = sys.modules.get("watch_script_support")
    if support is not None:
        original = support.WatchFixture.run
        counter = [0]

        def timed(self, arguments=()):
            started = time.time()
            try:
                return original(self, arguments)
            finally:
                counter[0] += 1
                with open(runlog, "a") as handle:
                    handle.write(f"{counter[0]} {time.time() - started:.2f}\n")

        support.WatchFixture.run = timed


wait = os.environ.get("WAIT")
if wait:
    support = sys.modules.get("watch_script_support")
    original_copy = support.WatchFixture.write_copy

    def write_copy(self, **extra):
        if extra.get("DOCKER_WAIT_SECONDS") == "5":
            extra["DOCKER_WAIT_SECONDS"] = wait
        return original_copy(self, **extra)

    support.WatchFixture.write_copy = write_copy

loader = unittest.TestLoader()
suite = loader.loadTestsFromName(case, module) if case else loader.loadTestsFromModule(module)


class Result(unittest.TextTestResult):
    def startTest(self, test):
        if stop and os.path.exists(stop):
            self.stop()
        super().startTest(test)


result = unittest.TextTestRunner(resultclass=Result, verbosity=0).run(suite)
sys.exit(0 if result.wasSuccessful() else 1)
