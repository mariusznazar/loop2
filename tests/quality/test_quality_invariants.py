"""Invariant tests: each standing quality check runs its pinned tool on the product's own code."""

from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

import quality_environment

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = "{ts,tsx,mts,cts,js,jsx,mjs,cjs}"
WEB = "{ts,tsx,mts,cts,js,jsx,mjs,cjs,html,css}"
# The D-32 scope, each pattern within one .gitattributes keeps at LF. A pattern matching no file
# fails the check, but a brace alternative may: the HTML and CSS of tests/sim and tests/view stand
# beside their scripts. test_source_tool_scope.py keeps the patterns to the scope.
PRETTIER_PATTERNS = [f"src/browser/**/*.{WEB}", f"src/server/**/*.{SCRIPT}",
                     f"scripts/**/*.{SCRIPT}", f"tests/**/*.{SCRIPT}", f"balance/**/*.{SCRIPT}",
                     f"tests/{{sim,view}}/**/*.{WEB}", "{eslint,prettier}.config.mjs"]
# The flags of the Prettier check; the scope test runs the same check on made-up files (D-32).
PRETTIER_FLAGS = ["--check", "--no-config", "--no-editorconfig", "--ignore-path", ".gitignore"]
# Named one by one: review keeps a new standalone Bash script from going unnamed (D-31).
BASH_SCRIPTS = ["deploy/loop2-deploy", "deploy/loop2-backup", "deploy/loop2-watch"]


def venv_tool(name):
    """The pinned tool README.md installs into `.runs/quality-venv`, on Windows or elsewhere."""
    return quality_environment.venv_tool(ROOT, name)


class QualityInvariants(unittest.TestCase):
    """A tool that reports a break or cannot run exits other than 0, and the test fails with
    its output; nothing is skipped."""

    @classmethod
    def setUpClass(cls):
        # decision: D-424 "Before its first check, the test of the quality checks makes the environment `.runs/quality-venv` of Ruff and ShellCheck whenever it is absent, half made or not at the versions `requirements-quality.txt` pins"
        # Absent or half made, the environment is made again; where that fails the whole class
        # fails with the one message, and no check runs in place of it (D-424).
        try:
            quality_environment.ensure_quality_environment(ROOT)
        except quality_environment.EnvironmentNotMade as error:
            raise AssertionError(str(error)) from None

    def assert_passes(self, *command):
        result = subprocess.run(command, cwd=ROOT, capture_output=True, text=True,
                                encoding="utf-8", errors="backslashreplace", timeout=900,
                                check=False)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_eslint_source_rules(self):
        # invariant: eslint-source-rules
        # decision: D-28 "For the adopted linters, full-compliance source invariants apply"
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
        # decision: D-28 "For the adopted linters, full-compliance source invariants apply"
        # data: ruff.toml
        self.assert_passes(venv_tool("ruff"), "check", "--config", "ruff.toml", "--ignore-noqa",
                           "--no-fix", "--no-cache", ".")

    def test_shellcheck_source_rules(self):
        # invariant: shellcheck-source-rules
        # decision: D-28 "For the adopted linters, full-compliance source invariants apply"
        self.assert_passes(venv_tool("shellcheck"), "--norc", "--shell=bash",
                           "--extended-analysis=true", *BASH_SCRIPTS)

    def test_prettier_source_format(self):
        # invariant: prettier-source-format
        # decision: D-32 "All application, script and test TypeScript and JavaScript in browser-view, simulation, account-server, build-tools, balance-tools and deployment and browser HTML and CSS pass `--check` of local pinned Prettier 3.9.10 run with `--no-config --no-editorconfig --ignore-path .gitignore`"
        self.assert_passes("node", "node_modules/prettier/bin/prettier.cjs", *PRETTIER_FLAGS,
                           *PRETTIER_PATTERNS)

    def test_introduced_npm_vulnerabilities(self):
        # invariant: introduced-npm-vulnerabilities
        self.assert_passes(sys.executable, "-B", "scripts/audit_dependencies.py")


if __name__ == "__main__":
    unittest.main()
