"""The file selection of D-77 runs one real test file and refuses an empty run."""

import unittest

from gate_fixture import GateFixture


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
