"""Exercise local language checks with real discovery and subprocess boundaries."""

from contextlib import redirect_stderr
import importlib
import io
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "scripts"))
import quality_support


class PythonShellChecks(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="python-shell-check-")
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        subprocess.run(["git", "init", "--quiet", self.root], check=True,
                       capture_output=True)
        self.write(".gitignore", ".runs/\n")
        parts = ("browser-view", "simulation", "account-server", "build-tools",
                 "deployment", "agent-workflow")
        mapping = "# Parts\n\n" + "".join(
            f"## {part}\n\n- **Files:** {part}/**\n\n" for part in parts)
        mapping += "## foundation\n\n- **Files:** foundations/**\n  .gitignore\n"
        self.write("foundations/part_map.md", mapping)
        self.write(".runs/fake_tool.py", FAKE_TOOL)
        self.state = {"ruff": {}, "shellcheck": {}}
        self.state_path = self.root / ".runs/state.json"

    def write(self, path, text):
        destination = self.root / path
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(text, encoding="utf-8", newline="\n")
        return destination

    def module(self, name):
        try:
            return importlib.import_module("check_" + name)
        except ImportError:
            self.fail(f"the {name} method is not implemented")

    def run_check(self, name, *, environment=None, available=True):
        module = self.module(name)
        self.state_path.write_text(json.dumps(self.state), encoding="utf-8")
        folder = "Scripts" if os.name == "nt" else "bin"
        suffix = ".exe" if os.name == "nt" else ""
        executable = self.root / ".runs/quality-venv" / folder / (name + suffix)
        if available:
            executable.parent.mkdir(parents=True, exist_ok=True)
            executable.touch()

        def invoke(command, **options):
            # Replace only the unavailable external binary, keeping actual execution,
            # environment, stdout decoding and exit-code handling in the shared helper.
            if Path(command[0]) != executable:
                raise AssertionError("method selected a nonlocal executable")
            return quality_support.run_tool(
                [sys.executable, self.root / ".runs/fake_tool.py", name, *command[1:]],
                **options)

        record = self.root / ".runs/result.jsonl"
        with patch.object(module, "run_tool", side_effect=invoke), patch.dict(
                os.environ, environment or {}), redirect_stderr(io.StringIO()):
            code = quality_support.run_check(
                "fixture", name + "-source-rules/1", lambda: module.check(self.root),
                record=record)
        return code, json.loads(record.read_text(encoding="utf-8"))

    def test_new_python_files_in_all_adopted_parts_are_read(self):
        for part in ("browser-view", "simulation", "account-server", "build-tools",
                     "deployment", "agent-workflow"):
            with self.subTest(part=part):
                path = self.write(part + "/nested/new file.py", "print(missing)\n")
                self.assertEqual(self.run_check("ruff")[0], 1)
                path.unlink()

    def test_python_stub_and_shebang_sources_are_checked(self):
        for filename, text in (("new.pyi", "print(missing)\n"),
                               ("runner", "#!/usr/bin/env python3\nprint(missing)\n")):
            with self.subTest(filename=filename):
                path = self.write("build-tools/" + filename, text)
                self.assertEqual(self.run_check("ruff")[0], 1)
                path.unlink()

    def test_explicit_rules_and_isolation_prevent_configuration_bypass(self):
        self.write("build-tools/new.py", "value = 1\n")
        self.assertEqual(self.run_check("ruff", environment={"RUFF_OUTPUT_FORMAT": "text",
                                                            "RUFF_NO_CACHE": "false"})[0], 0)

    def test_python_blocking_suppressions_fail_even_without_tool_diagnostics(self):
        for directive in ("# noqa", "# noqa: F821", "# noqa: F", "# ruff: noqa",
                          "# flake8: noqa", "# ruff: noqa: F401, E402"):
            with self.subTest(directive=directive):
                self.write("build-tools/new.py", "value = 1  " + directive + "\n")
                self.assertEqual(self.run_check("ruff")[0], 1)

    def test_nonblocking_noqa_and_literal_directive_text_are_allowed(self):
        self.write("build-tools/new.py", 'value = "# noqa: F821"  # noqa: E402\n')
        self.assertEqual(self.run_check("ruff")[0], 0)

    def test_pinned_ruff_suppression_actions_fail_on_clean_source(self):
        cases = (
            "value = 1  # ruff: ignore[F821]\n",
            "# ruff: file-ignore[F821]\nvalue = 1\n",
            "# ruff: disable[F821]\nvalue = 1\n# ruff: enable[F821]\n",
            "# ruff: disable[F401]\nvalue = 1\n",
            "value = 1  # ruff : ignore [ E402, F821, ] reason\n",
            "value = 1  # note # ruff: ignore[E402] # ruff: ignore[F821]\n",
            "value = 1  # noqa: E402 # ruff: ignore[F821]\n",
            "value = 1  # ruff: ignore[U001]\n",
            "# ruff: file-ignore[PGH002]\nvalue = 1\n",
            "# ruff: disable[TCH006]\nvalue = 1\n# ruff: enable[TCH006]\n",
            "value = 1  # noqa: R501\n",
        )
        for source in cases:
            with self.subTest(source=source):
                self.write("build-tools/new.py", source)
                code, record = self.run_check("ruff")
                self.assertEqual(code, 1)
                self.assertEqual(record["invariant"], "ruff-source-rules/1")
                self.assertEqual(record["verdict"], "fail")

    def test_nonblocking_pinned_ruff_actions_and_literal_data_remain_neutral(self):
        cases = (
            "value = 1  # ruff: ignore[E402]\n",
            "# ruff: file-ignore[E402]\nvalue = 1\n",
            "# ruff: disable[E402]\nvalue = 1\n# ruff: enable[E402]\n",
            'value = "# ruff: ignore[F821]"\n',
            'value = "# ruff: file-ignore[F821]"\n',
            'value = """# ruff: disable[F821]\n# ruff: enable[F821]"""\n',
            "value = 1  # ruff: ignore[M001]\n",
        )
        for source in cases:
            with self.subTest(source=source):
                self.write("build-tools/new.py", source)
                code, record = self.run_check("ruff")
                self.assertEqual(code, 0)
                self.assertEqual(record["verdict"], "pass")

    def test_extensionless_bash_and_new_bash_suffixes_are_checked(self):
        for filename, prefix in (("deploy", "#!/bin/bash\n"),
                                 ("new.bash", ""), ("new.sh", ""),
                                 ("env-runner", "#!/usr/bin/env -S bash -e\n")):
            with self.subTest(filename=filename):
                path = self.write("deployment/" + filename, prefix + "echo $missing\n")
                self.assertEqual(self.run_check("shellcheck")[0], 1)
                path.unlink()

    def test_embedded_yaml_and_python_bash_literals_are_outside_shell_scope(self):
        self.write("deployment/job.yaml", "run: echo $missing\n")
        self.write("build-tools/test.py", 'script = "echo $missing"\n')
        self.assertEqual(self.run_check("shellcheck")[0], 0)

    def test_shell_configuration_and_environment_cannot_disable_checks(self):
        self.write("deployment/new.sh", "echo $missing\n")
        self.write("deployment/.shellcheckrc", "disable=all\n")
        code, _ = self.run_check("shellcheck", environment={
            "SHELLCHECK_OPTS": "--exclude=SC2086 --severity=error"})
        self.assertEqual(code, 1)

    def test_shell_directives_distinguish_violation_neutrality_and_unknown_membership(self):
        for directive, expected in (("disable=SC2086", 1), ("disable=all", 1),
                                    ("enable=quote-safe-variables", 1),
                                    ("extended-analysis=false", 1), ("shell=sh", 1),
                                    ("shell=bash", 0), ("extended-analysis=true", 0),
                                    ("disable=SC2250", 0),
                                    ("disable=SC9999", 2), ("source=/dev/null", 2),
                                    ("source-path=library", 2)):
            with self.subTest(directive=directive):
                self.write("deployment/new.sh", "# shellcheck " + directive + "\necho ok\n")
                self.assertEqual(self.run_check("shellcheck")[0], expected)

    def test_shell_directive_text_in_quoted_data_and_heredoc_is_not_a_directive(self):
        for text in ("printf '%s' '# shellcheck disable=all'\n",
                     "cat <<'EOF'\n# shellcheck disable=all\nEOF\n"):
            with self.subTest(text=text):
                self.write("deployment/new.sh", text)
                self.assertEqual(self.run_check("shellcheck")[0], 0)

    def test_ruff_incomplete_diagnostic_cannot_be_reported_as_a_proven_violation(self):
        self.write("build-tools/new.py", "value = 1\n")
        incomplete = {"filename": str(self.root / "build-tools/new.py"), "message": "Unknown",
                      "location": {"row": 1, "column": 1},
                      "end_location": {"row": 1, "column": 2}}
        self.state["ruff"] = {"stdout": json.dumps([incomplete]), "exit": 1}
        code, record = self.run_check("ruff")
        self.assertEqual(code, 2)
        self.assertIsNone(record["invariant"])

    def test_diagnostics_and_success_exit_must_agree(self):
        self.write("build-tools/new.py", "print(missing)\n")
        self.write("deployment/new.sh", "echo $missing\n")
        for name in ("ruff", "shellcheck"):
            with self.subTest(tool=name):
                self.state[name] = {"exit": 0}
                code, record = self.run_check(name)
                self.assertEqual(code, 2)
                self.assertIsNone(record["invariant"])

    def test_tools_must_be_available_and_exactly_pinned(self):
        for name in ("ruff", "shellcheck"):
            with self.subTest(tool=name):
                code, record = self.run_check(name, available=False)
                self.assertEqual(code, 2)
                self.assertIsNone(record["invariant"])
                self.state[name]["version"] = "0.0.0"
                self.assertEqual(self.run_check(name)[0], 2)

    def test_shellcheck_windows_banner_accepts_pinned_version_with_license_lines(self):
        self.state["shellcheck"]["version_stdout"] = (
            "ShellCheck - shell script analysis tool\r\nversion: 0.11.0\r\n"
            "license: GNU General Public License, version 3\r\n")
        self.assertEqual(self.run_check("shellcheck")[0], 0)

    def test_malformed_tool_output_never_yields_a_named_verdict(self):
        self.write("build-tools/new.py", "value = 1\n")
        self.write("deployment/new.sh", "echo ok\n")
        for name in ("ruff", "shellcheck"):
            for output in ("not json", "{}", '[{"code": 1}]'):
                with self.subTest(tool=name, output=output):
                    self.state[name] = {"stdout": output}
                    code, record = self.run_check(name)
                    self.assertEqual(code, 2)
                    self.assertIsNone(record["invariant"])

    def test_unexpected_exits_and_stderr_are_inability_not_success(self):
        self.write("build-tools/new.py", "value = 1\n")
        self.write("deployment/new.sh", "echo ok\n")
        for name in ("ruff", "shellcheck"):
            for options in ({"exit": 2}, {"exit": 1}, {"stderr": "warning"}):
                with self.subTest(tool=name, options=options):
                    self.state[name] = options
                    self.assertEqual(self.run_check(name)[0], 2)


FAKE_TOOL = r'''
import json
import os
from pathlib import Path
import sys

name = sys.argv[1]
args = sys.argv[2:]
state = json.loads(Path(".runs/state.json").read_text())[name]
if "--version" in args:
    if "version_stdout" in state:
        os.write(1, state["version_stdout"].encode("utf-8"))
        sys.exit(0)
    version = state.get("version", "0.17.1" if name == "ruff" else "0.11.0")
    print("ruff " + version if name == "ruff" else "ShellCheck - shell script analysis tool\nversion: " + version)
    sys.exit(0)
if name == "ruff":
    required = {"check", "--isolated", "--ignore-noqa", "--no-preview", "--no-fix",
                "--no-cache", "--output-format=json"}
    assert required <= set(args), args
    selected = args[args.index("--select") + 1].split(",")
    assert len(selected) == len(set(selected)) == 393
    assert {"F821", "F401", "ASYNC100", "YTT303"} <= set(selected)
    assert not {"E402", "PLW1510", "I001", "ISC004", "UP031", "RUF059", "PIE808",
                "RUF007", "RUF012", "PLR0402", "FURB167", "RUF100", "SIM117",
                "FURB192", "SIM102"} & set(selected)
    assert not any(key.startswith("RUFF_") for key in os.environ)
else:
    assert {"--norc", "--shell=bash", "--severity=style", "--format=json1",
            "--extended-analysis=true"} <= set(args), args
    assert "SHELLCHECK_OPTS" not in os.environ
path = args[-1]
text = sys.stdin.read() if path == "-" else Path(path).read_text()
diagnostics = []
if "print(missing)" in text and name == "ruff":
    diagnostics = [{"code": "F821", "message": "Undefined name", "filename": str(Path(path).resolve()),
                    "location": {"row": 1, "column": 1}, "end_location": {"row": 1, "column": 5},
                    "fix": None, "noqa_row": 1, "url": "https://docs.astral.sh/ruff/rules/undefined-name/"}]
if "echo $missing" in text and name == "shellcheck":
    diagnostics = [{"file": path, "line": 1, "column": 6, "endLine": 1, "endColumn": 14,
                    "level": "info", "code": 2086, "message": "Double quote", "fix": None}]
if name == "shellcheck" and "loopquality=" in text:
    # Model only the parser boundary, not the adapter's directive policy.
    if not text.startswith("cat <<") and not text.startswith("printf "):
        diagnostics = [{"file": path, "line": 1, "column": 14, "endLine": 1, "endColumn": 25,
                        "level": "warning", "code": 1107,
                        "message": "This directive is unknown. It will be ignored.", "fix": None}]
output = diagnostics if name == "ruff" else {"comments": diagnostics}
sys.stderr.write(state.get("stderr", ""))
print(state.get("stdout", json.dumps(output)))
sys.exit(state.get("exit", int(bool(diagnostics))))
'''


if __name__ == "__main__":
    unittest.main()
