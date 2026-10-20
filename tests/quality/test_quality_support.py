"""Exercise discovery and verdict boundaries using disposable repositories and processes."""

from contextlib import redirect_stderr
import io
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

try:
    from scripts import quality_support as support
except ImportError:
    support = None


class QualitySupportTests(unittest.TestCase):
    def setUp(self):
        self.assertIsNotNone(support, "the shared quality mechanics are not implemented")
        self.temporary = tempfile.TemporaryDirectory(prefix="quality-support-")
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.git("init", "--quiet")
        self.write(".gitignore", "ignored/\n")
        self.write("foundations/part_map.md", "# Part map\n\n## tools\n\n"
                   "- **Files:** scripts/**\n  foundations/**\n  .gitignore\n\n"
                   "## other\n\n- **Files:** other/**\n")
        self.write("scripts/tracked.py", "value = 1\n")
        self.git("add", ".gitignore", "foundations/part_map.md", "scripts/tracked.py")

    def git(self, *arguments):
        return subprocess.run(["git", *arguments], cwd=self.root, check=True,
                              capture_output=True)

    def write(self, path, text):
        destination = self.root / path
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(text, encoding="utf-8")
        return destination

    def tool(self, code, **options):
        return support.run_tool([sys.executable, "-c", code], cwd=self.root, **options)

    def record(self, operation):
        path = self.root / "records/result.jsonl"
        with redirect_stderr(io.StringIO()):
            code = support.run_check("scripts/check_fixture.py", "fixture-rule/1",
                                     operation, record=path)
        return code, [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines()]

    def test_discovers_nested_untracked_owned_files_and_keeps_tracked_ignored_files(self):
        self.write("scripts/new/nested test.py", "value = 2\n")
        self.write("other/irrelevant.py", "value = 3\n")
        self.write("ignored/new.py", "value = 4\n")
        self.write(".gitignore", "ignored/\nscripts/tracked.py\n")
        self.assertEqual(support.discover_files(self.root, {"tools"}),
                         [".gitignore", "foundations/part_map.md",
                          "scripts/new/nested test.py", "scripts/tracked.py"])

    def test_git_patterns_keep_single_star_from_claiming_nested_paths(self):
        self.write("foundations/part_map.md", "## tools\n- **Files:** scripts/*.py\n"
                   "  foundations/**\n  .gitignore\n\n## nested\n"
                   "- **Files:** scripts/nested/**\n")
        self.write("scripts/nested/new.py", "value = 2\n")
        self.assertEqual(support.discover_files(self.root, {"nested"}),
                         ["scripts/nested/new.py"])

    def test_ambiguous_ownership_fails_even_outside_requested_parts(self):
        self.write("other/new.py", "value = 2\n")
        with (self.root / "foundations/part_map.md").open("a", encoding="utf-8") as stream:
            stream.write("\n## duplicate\n- **Files:** other/**\n")
        with self.assertRaisesRegex(support.QualityError, "ambiguous.*other/new.py"):
            support.discover_files(self.root, {"tools"})

    def test_unknown_part_and_unowned_new_files_fail_discovery(self):
        with self.assertRaisesRegex(support.QualityError, "unknown part"):
            support.discover_files(self.root, {"missing"})
        self.write("unowned.py", "value = 2\n")
        with self.assertRaisesRegex(support.QualityError, "unowned.py"):
            support.discover_files(self.root, {"tools"})

    def test_excludes_dependencies_generated_output_runs_and_gitlinks(self):
        for path in ("scripts/node_modules/generated.py", "dist/generated.py",
                     "scripts/.runs/generated.py", "scripts/.venv/generated.py",
                     "scripts/__pycache__/generated.py"):
            self.write(path, "value = 2\n")
            self.git("add", "-f", path)
        self.git("-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid",
                 "commit", "--quiet", "-m", "Fixture")
        head = self.git("rev-parse", "HEAD").stdout.decode().strip()
        self.git("update-index", "--add", "--cacheinfo", f"160000,{head},scripts/vendor")
        self.assertEqual(support.discover_files(self.root, {"tools"}),
                         [".gitignore", "foundations/part_map.md", "scripts/tracked.py"])

    def test_nested_source_named_dist_is_not_assumed_to_be_generated_output(self):
        self.write("scripts/dist/source.py", "value = 2\n")
        self.assertIn("scripts/dist/source.py", support.discover_files(self.root, {"tools"}))

    def test_missing_tracked_source_fails_instead_of_disappearing(self):
        (self.root / "scripts/tracked.py").unlink()
        with self.assertRaisesRegex(support.QualityError, "scripts/tracked.py"):
            support.discover_files(self.root, {"tools"})

    def test_failed_git_discovery_is_not_an_empty_success(self):
        with tempfile.TemporaryDirectory() as outside:
            with self.assertRaises(support.QualityError):
                support.discover_files(Path(outside), {"tools"})

    def test_local_tool_returns_both_streams_and_status(self):
        result = self.tool("import sys; sys.stdout.buffer.write(b'report\\n'); "
                           "sys.stderr.buffer.write(b'detail\\n')")
        self.assertEqual((result.returncode, result.stdout, result.stderr),
                         (0, "report\n", "detail\n"))

    def test_missing_executable_and_relative_launcher_fail(self):
        with self.assertRaises(support.QualityError):
            support.run_tool([str(self.root / "missing.exe")], cwd=self.root)
        with self.assertRaisesRegex(support.QualityError, "absolute"):
            support.run_tool(["python", "-c", "pass"], cwd=self.root)

    def test_nonzero_exit_is_failure_unless_the_adapter_accepts_it(self):
        with self.assertRaises(support.QualityError) as caught:
            self.tool("import sys; print('not complete'); sys.exit(2)")
        self.assertEqual(caught.exception.result.returncode, 2)
        self.assertIn(b"not complete", caught.exception.result.stdout)
        result = self.tool("import sys; sys.stdout.buffer.write(b'violations\\n'); sys.exit(1)",
                           accepted_codes=(0, 1))
        self.assertEqual((result.returncode, result.stdout), (1, "violations\n"))

    def test_unreadable_output_cannot_become_a_verdict(self):
        code, lines = self.record(lambda: self.tool(
            "import sys; sys.stdout.buffer.write(bytes([255]))"))
        self.assertEqual(code, 2)
        self.assertEqual([(line["verdict"], line["invariant"]) for line in lines],
                         [("fail", None)])

    def test_timeout_is_an_unavailable_check(self):
        code, lines = self.record(lambda: self.tool("import time; time.sleep(10)", timeout=0.05))
        self.assertEqual((code, lines[0]["invariant"]), (2, None))

    def test_schema_distinguishes_pass_violation_and_unavailable(self):
        code, lines = self.record(lambda: True)
        self.assertEqual(code, 0)
        self.assertEqual(lines, [{"check": "scripts/check_fixture.py", "verdict": "pass",
                                  "invariant": "fixture-rule/1"}])
        code, lines = self.record(lambda: False)
        self.assertEqual((code, lines), (1, [{"check": "scripts/check_fixture.py",
                                            "verdict": "fail", "invariant": "fixture-rule/1"}]))
        code, lines = self.record(lambda: json.loads("malformed"))
        self.assertEqual((code, lines[0]["verdict"], lines[0]["invariant"]), (2, "fail", None))
        self.assertIn("JSONDecodeError", lines[0]["description"])

    def test_unavailable_reports_traceback_and_preserves_structured_record(self):
        for exception in ("RuntimeError", "KeyboardInterrupt"):
            with self.subTest(exception=exception):
                record = self.root / "failure.jsonl"
                script = (
                    "import sys\n"
                    "sys.path.insert(0, sys.argv[1])\n"
                    "from quality_support import run_check\n"
                    "def operation():\n"
                    f"    raise {exception}('failure detail')\n"
                    "sys.exit(run_check('fixture', 'fixture-rule/1', operation, "
                    "record=sys.argv[2]))\n")
                result = subprocess.run(
                    [sys.executable, "-B", "-c", script, str(Path(support.__file__).parent),
                     str(record)], capture_output=True, text=True, encoding="utf-8")
                self.assertEqual(result.returncode, 2)
                self.assertEqual(result.stdout, "")
                expected = {"check": "fixture", "verdict": "fail", "invariant": None,
                            "description": exception + ": failure detail"}
                lines = result.stderr.splitlines()
                self.assertEqual(json.loads(lines[-1]), expected)
                self.assertEqual(json.loads(record.read_text(encoding="utf-8")), expected)
                self.assertIn("Traceback (most recent call last):", lines[:-1])
                self.assertIn(exception + ": failure detail", lines[:-1])
                self.assertTrue(any("in operation" in line for line in lines[:-1]))

    def test_each_failure_reports_to_current_stderr(self):
        for detail in ("first failure", "second failure"):
            with self.subTest(detail=detail):
                captured = io.StringIO()

                def operation(detail=detail):
                    raise RuntimeError(detail)

                with redirect_stderr(captured):
                    code = support.run_check("fixture", "fixture-rule/1", operation)
                self.assertEqual(code, 2)
                diagnostics = captured.getvalue().splitlines()
                self.assertIn("Traceback (most recent call last):", diagnostics[:-1])
                self.assertIn("RuntimeError: " + detail, diagnostics[:-1])
                self.assertIsNone(json.loads(diagnostics[-1])["invariant"])

    def test_noninterrupt_base_exceptions_propagate_without_a_verdict(self):
        for problem in (SystemExit(7), GeneratorExit(), BaseException("stop")):
            with self.subTest(exception=type(problem).__name__):
                record = self.root / "stopped.jsonl"
                captured = io.StringIO()

                def operation(problem=problem):
                    raise problem

                with redirect_stderr(captured), self.assertRaises(type(problem)) as caught:
                    support.run_check("fixture", "fixture-rule/1", operation, record=record)
                self.assertIs(caught.exception, problem)
                self.assertEqual(record.read_bytes(), b"")
                self.assertEqual(captured.getvalue(), "")
                # Exclusive access on Windows also checks that the record was closed.
                record.unlink()

    def test_no_partial_pass_when_a_later_operation_fails(self):
        def operation():
            self.tool("print('first operation passed')")
            self.tool("import sys; sys.exit(3)")
            return True

        code, lines = self.record(operation)
        self.assertEqual(code, 2)
        self.assertEqual([line["invariant"] for line in lines], [None])

    def test_accidental_none_result_is_no_success(self):
        code, lines = self.record(lambda: None)
        self.assertEqual((code, lines[0]["invariant"]), (2, None))

    def test_record_path_and_citation_validation_precede_execution(self):
        for citation, path in (("fixture-rule/01", "result.jsonl"),
                               ("fixture-rule/1", "result.txt")):
            with self.subTest(citation=citation, path=path):
                with self.assertRaises(ValueError):
                    support.run_check("fixture", citation,
                                      lambda: self.fail("must not run"), record=self.root / path)


if __name__ == "__main__":
    unittest.main()
