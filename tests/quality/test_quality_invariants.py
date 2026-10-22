"""Invariant tests: each standing quality check runs its pinned tool on the product's own code."""

from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]
WINDOWS = sys.platform == "win32"
VENV = ROOT / ".runs/quality-venv" / ("Scripts" if WINDOWS else "bin")
SCRIPT = "{ts,tsx,mts,cts,js,jsx,mjs,cjs}"
WEB = "{ts,tsx,mts,cts,js,jsx,mjs,cjs,html,css}"
# The D-32 scope, each pattern within one .gitattributes keeps at LF. A pattern matching no file
# fails the check, but a brace alternative may: tests/quality, with no such file yet, stands
# beside tests/sim and tests/view, and their HTML and CSS beside their scripts.
PRETTIER_PATTERNS = [f"src/browser/**/*.{WEB}", f"src/server/**/*.{SCRIPT}",
                     f"scripts/**/*.{SCRIPT}", f"tests/{{sim,view,quality}}/**/*.{SCRIPT}",
                     f"tests/{{sim,view}}/**/*.{WEB}", "tests/{http,startup}.test.mjs",
                     "{eslint,prettier}.config.mjs"]
# Named one by one: review keeps a new standalone Bash script from going unnamed (D-31).
BASH_SCRIPTS = ["deploy/loop2-deploy"]


def venv_tool(name):
    """The pinned tool README.md installs into `.runs/quality-venv`, on Windows or elsewhere."""
    return VENV / (name + ".exe" if WINDOWS else name)


class QualityInvariants(unittest.TestCase):
    """A tool that reports a break or cannot run exits other than 0, and the test fails with
    its output; nothing is skipped."""

    def assert_passes(self, *command):
        result = subprocess.run(command, cwd=ROOT, capture_output=True, text=True,
                                encoding="utf-8", errors="backslashreplace", timeout=900,
                                check=False)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_eslint_source_rules(self):
        # invariant: eslint-source-rules
        # data: eslint.config.mjs
        # An empty suppressions file of its own keeps any eslint-suppressions.json of the
        # repository from hiding a report (D-29); a path to no file makes ESLint exit with 2.
        with tempfile.TemporaryDirectory() as temp:
            suppressions = Path(temp) / "eslint-suppressions.json"
            suppressions.write_text("{}\n", encoding="utf-8")
            self.assert_passes("node", "node_modules/eslint/bin/eslint.js", "--max-warnings",
                               "0", "--suppressions-location", str(suppressions), ".")

    def test_ruff_source_rules(self):
        # invariant: ruff-source-rules
        # data: ruff.toml
        self.assert_passes(venv_tool("ruff"), "check", "--config", "ruff.toml", "--ignore-noqa",
                           "--no-fix", "--no-cache", ".")

    def test_shellcheck_source_rules(self):
        # invariant: shellcheck-source-rules
        self.assert_passes(venv_tool("shellcheck"), "--norc", "--shell=bash",
                           "--extended-analysis=true", *BASH_SCRIPTS)

    def test_prettier_source_format(self):
        # invariant: prettier-source-format
        self.assert_passes("node", "node_modules/prettier/bin/prettier.cjs", "--check",
                           "--no-config", "--no-editorconfig", "--ignore-path", ".gitignore",
                           *PRETTIER_PATTERNS)

    def test_introduced_npm_vulnerabilities(self):
        # invariant: introduced-npm-vulnerabilities
        self.assert_passes(sys.executable, "-B", "scripts/audit_dependencies.py")


if __name__ == "__main__":
    unittest.main()
