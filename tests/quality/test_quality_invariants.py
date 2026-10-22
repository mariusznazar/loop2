"""Invariant tests: each standing quality check runs on the product's own code and passes."""

from pathlib import Path
import subprocess
import sys
import unittest

ROOT = Path(__file__).resolve().parents[2]


def run(*arguments):
    """Run a command from the repository root; return its exit code and its whole output."""
    result = subprocess.run(arguments, cwd=ROOT, capture_output=True, text=True,
                            encoding="utf-8", errors="backslashreplace", timeout=900,
                            check=False)
    return result.returncode, result.stdout + result.stderr


def fork_point():
    """The commit the change starts from: `git merge-base HEAD <main branch>`, the main branch
    being the one `origin/HEAD` names."""
    code, output = run("git", "symbolic-ref", "--short", "refs/remotes/origin/HEAD")
    if code != 0:
        raise AssertionError("origin/HEAD names no main branch:\n" + output)
    code, base = run("git", "merge-base", "HEAD", output.strip())
    if code != 0:
        raise AssertionError("no merge base with " + output.strip() + ":\n" + base)
    return base.strip()


class QualityInvariants(unittest.TestCase):
    """A check that cannot run — Ruff or ShellCheck missing, the registry unreachable — exits
    2, and the test fails with the check's output; nothing is skipped."""

    def assert_check_passes(self, *arguments):
        code, output = run(sys.executable, "-B", *arguments)
        self.assertEqual(code, 0, output)

    def test_eslint_source_rules(self):
        # invariant: eslint-source-rules
        self.assert_check_passes("scripts/check_eslint.py")

    def test_eslint_configuration_rules(self):
        # invariant: eslint-configuration-rules
        self.assert_check_passes("scripts/check_eslint.py", "--configuration")

    def test_ruff_source_rules(self):
        # invariant: ruff-source-rules
        self.assert_check_passes("scripts/check_ruff.py")

    def test_shellcheck_source_rules(self):
        # invariant: shellcheck-source-rules
        self.assert_check_passes("scripts/check_shellcheck.py")

    def test_prettier_source_format(self):
        # invariant: prettier-source-format
        self.assert_check_passes("scripts/check_format.py")

    def test_introduced_npm_vulnerabilities(self):
        # invariant: introduced-npm-vulnerabilities
        self.assert_check_passes("scripts/check_dependencies.py", "--fork-point", fork_point())


if __name__ == "__main__":
    unittest.main()
