"""Run the complete gate, or exactly one Node or Python test file (D-77)."""

import importlib.util
import os
from pathlib import Path
import subprocess
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]
NODE_TESTS = ["tests/http.test.mjs", "tests/startup.test.mjs",
              "tests/sim/*.test.mjs", "tests/view/*.test.mjs"]


def command(*arguments):
    return subprocess.run(arguments, cwd=ROOT, check=False).returncode


def build():
    return command("node", os.environ["npm_execpath"], "run", "build")


def python_file(path):
    # Keep both repository imports and helpers beside the selected module available.
    sys.path[:0] = [str(path.parent), str(ROOT)]
    spec = importlib.util.spec_from_file_location(path.stem, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    try:
        spec.loader.exec_module(module)
        suite = unittest.TestLoader().loadTestsFromModule(module)
        result = unittest.TextTestRunner().run(suite)
    except SystemExit:
        print("The selected Python file exited before producing a test result.", file=sys.stderr)
        return 1
    if result.testsRun <= len(result.skipped):
        print("No test executed in the selected file.", file=sys.stderr)
        return 1
    return 0 if result.wasSuccessful() else 1


def main(arguments):
    if not arguments:
        stages = [build,
                  lambda: command("node", "--test", *NODE_TESTS),
                  lambda: command(sys.executable, "-B", ".the-way/gate/run_tests.py"),
                  lambda: command(sys.executable, "-B",
                                  ".the-way/elements/common/foundation_check.py")]
        for stage in stages:
            code = stage()
            if code:
                return code
        return 0
    if len(arguments) != 1:
        print("Expected exactly one test file, or no argument for the full gate.", file=sys.stderr)
        return 2
    path = Path(arguments[0]).resolve()
    if not path.is_file():
        print("The selected test file does not exist.", file=sys.stderr)
        return 2
    if path.name.endswith(".test.mjs"):
        code = build()
        return code or command("node", "scripts/test-node-file.mjs", str(path))
    if path.name.startswith("test_") and path.suffix == ".py":
        return python_file(path)
    print("Expected a *.test.mjs or test_*.py test file.", file=sys.stderr)
    return 2


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
