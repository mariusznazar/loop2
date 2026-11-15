"""The file selection of D-77 runs one real test file and refuses an empty run; the whole run
runs the directories of Python tests at the same time (D-406)."""

import json
import unittest

from gate_fixture import GateFixture

# A test of one directory that passes only once the test of the other has begun: the two
# directories run at the same time or the first one fails after its wait.
MEETS = """\
import time
import unittest
from pathlib import Path


class Meets(unittest.TestCase):

    def test_the_other_directory_runs_at_the_same_time(self):
        Path({mine}).write_text("here")
        deadline = time.monotonic() + 20
        while not Path({theirs}).exists():
            self.assertLess(time.monotonic(), deadline, "the other directory did not begin")
            time.sleep(0.05)
"""


class TestGate(unittest.TestCase):

    def setUp(self):
        self.gate = GateFixture(self)

    def assert_focused(self):
        self.assertFalse((self.gate.root / "python-stage").exists())
        self.assertFalse((self.gate.root / "foundation-stage").exists())

    def test_python_selection_imports_sibling_helper_without_build_or_neighbours(self):
        self.gate.write("tests/cases/helper.py", 'VALUE = 42\n')
        self.gate.write("tests/cases/test_selected.py", 'import unittest\n'
                        'from helper import VALUE\n'
                        'class Case(unittest.TestCase):\n'
                        '    def test_value(self): self.assertEqual(VALUE, 42)\n')
        self.gate.write("tests/cases/test_other.py", 'raise RuntimeError("not selected")\n')
        self.gate.write("tests/cases/nested/__init__.py", "")
        self.gate.write("tests/cases/nested/test_selected.py", 'raise RuntimeError("nested")\n')
        result = self.gate.run("tests/cases/test_selected.py")
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("Ran 1 test", result.stderr)
        self.assertFalse((self.gate.root / "built").exists())
        self.assert_focused()

    def test_node_selection_builds_then_runs_only_the_selected_file(self):
        self.gate.node_test("tests/selected.test.mjs")
        self.gate.write("tests/other.test.mjs", 'throw new Error("not selected");\n')
        result = self.gate.run("tests/selected.test.mjs")
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertTrue((self.gate.root / "tests/selected.test.mjs.ran").exists())
        self.assert_focused()

    def test_the_whole_gate_runs_its_stages(self):
        self.gate.write("tests/passing.test.mjs",
                        'import test from "node:test"; test("passes", () => {});\n')
        result = self.gate.run()
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual((self.gate.root / "built").read_text(encoding="utf-8"), "yes")
        self.assertTrue((self.gate.root / "python-stage").exists())
        self.assertTrue((self.gate.root / "foundation-stage").exists())

    def test_the_whole_gate_runs_the_directories_of_python_tests_at_the_same_time(self):
        # decision: D-406 "The full gate runs the directories of Python tests at the same time"
        # Breaking it: give the Python stage `--jobs 1` and the first directory waits for a
        # directory that does not begin until it ends, so it fails after its wait.
        self.gate.use_real_python_runner()
        for mine, theirs in (("one", "two"), ("two", "one")):
            self.gate.write(f"tests/{mine}/test_meets.py", MEETS.format(
                mine=json.dumps(str(self.gate.root / f"{mine}.here")),
                theirs=json.dumps(str(self.gate.root / f"{theirs}.here"))))
        self.gate.track_files()
        result = self.gate.run(timeout=120)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_empty_or_skipped_only_files_fail(self):
        # invariant: focused-test-execution
        # Removing either runner's executed-test check must turn this assertion red.
        cases = {
            "tests/empty.test.mjs": "",
            "tests/suite.test.mjs": 'import { describe } from "node:test"; describe("empty", () => {});',
            "tests/skipped.test.mjs": 'import test from "node:test"; test.skip("skip", () => {});',
            "tests/test_empty.py": "",
            "tests/test_skipped.py": 'import unittest\nclass Case(unittest.TestCase):\n'
                                     '    @unittest.skip("skip")\n'
                                     '    def test_skip(self): pass\n',
        }
        for name, content in cases.items():
            with self.subTest(name=name):
                self.gate.write(name, content)
                result = self.gate.run(name)
                self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_python_exit_during_import_or_collection_fails(self):
        # invariant: focused-test-execution
        # A successful process exit before unittest returns is not a test result.
        cases = {
            "tests/test_import_exit_zero.py": "raise SystemExit(0)\n",
            "tests/test_import_exit_none.py": "raise SystemExit()\n",
            "tests/test_collect_exit_zero.py":
                "def load_tests(loader, tests, pattern): raise SystemExit(0)\n",
            "tests/test_collect_exit_none.py":
                "def load_tests(loader, tests, pattern): raise SystemExit()\n",
        }
        for name, content in cases.items():
            with self.subTest(name=name):
                self.gate.write(name, content)
                result = self.gate.run(name)
                self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_missing_or_non_test_file_fails_before_building(self):
        # invariant: focused-test-execution
        self.gate.write("tests/helper.mjs", 'throw new Error("must not execute");\n')
        self.gate.write("tests/helper.py", 'raise RuntimeError("must not execute")\n')
        for name in ("tests/missing.test.mjs", "tests/test_missing.py", "tests/helper.mjs",
                     "tests/helper.py", "tests", "tests/*.test.mjs"):
            with self.subTest(name=name):
                result = self.gate.run(name)
                self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertFalse((self.gate.root / "built").exists())
        self.assert_focused()

    def test_more_than_one_file_is_rejected(self):
        self.gate.node_test("tests/one.test.mjs")
        self.gate.node_test("tests/two.test.mjs")
        result = self.gate.run("tests/one.test.mjs", "tests/two.test.mjs")
        self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertFalse((self.gate.root / "built").exists())

    def test_failed_tests_and_import_errors_fail_the_selection(self):
        cases = {
            "tests/fail.test.mjs": 'import test from "node:test"; test("fails", () => { throw new Error("failed"); });',
            "tests/import.test.mjs": 'import "./absent.mjs";',
            "tests/test_fail.py": 'import unittest\nclass Case(unittest.TestCase):\n'
                                  '    def test_failure(self): self.fail("failed")\n',
            "tests/test_import.py": 'import absent_module\n',
        }
        for name, content in cases.items():
            with self.subTest(name=name):
                self.gate.write(name, content)
                result = self.gate.run(name)
                self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)


if __name__ == "__main__":
    unittest.main()
