from pathlib import Path

path = Path("tests/quality/test_quality_support.py")
source = path.read_bytes().decode("utf-8")
newline = "\r\n" if "\r\n" in source else "\n"
anchor = "    def test_no_partial_pass_when_a_later_operation_fails(self):"
addition = '''    def test_unavailable_reports_traceback_and_preserves_structured_record(self):
        for exception in ("RuntimeError", "KeyboardInterrupt"):
            with self.subTest(exception=exception):
                record = self.root / "failure.jsonl"
                script = (
                    "import sys\\n"
                    "sys.path.insert(0, sys.argv[1])\\n"
                    "from quality_support import run_check\\n"
                    "def operation():\\n"
                    f"    raise {exception}('failure detail')\\n"
                    "sys.exit(run_check('fixture', 'fixture-rule/1', operation, "
                    "record=sys.argv[2]))\\n")
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

                def operation():
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

                def operation():
                    raise problem

                with redirect_stderr(captured), self.assertRaises(type(problem)) as caught:
                    support.run_check("fixture", "fixture-rule/1", operation, record=record)
                self.assertIs(caught.exception, problem)
                self.assertEqual(record.read_bytes(), b"")
                self.assertEqual(captured.getvalue(), "")
                # Exclusive access on Windows also checks that the record was closed.
                record.unlink()

'''
assert source.count(anchor) == 1
source = source.replace(anchor, addition.replace("\n", newline) + anchor)
path.write_bytes(source.encode("utf-8"))
