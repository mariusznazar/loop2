"""Tests of scripts/audit_dependencies.py: when it audits and what it counts."""

import contextlib
import io
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
import audit_dependencies


class DependencyAudit(unittest.TestCase):

    def setUp(self):
        # A repository with no local npm, so a run that audits cannot succeed in it. Its start
        # commit is the fork point: origin/HEAD names it, and the branch goes on from it.
        directory = tempfile.TemporaryDirectory()
        self.addCleanup(directory.cleanup)
        self.root = Path(directory.name)
        (self.root / "scripts").mkdir()
        shutil.copy(ROOT / "scripts/audit_dependencies.py", self.root / "scripts")
        (self.root / "package.json").write_text('{"name": "case"}\n', encoding="utf-8")
        self.git("init", "-q")
        self.commit_lockfile('{"lockfileVersion": 3}\n')
        self.git("update-ref", "refs/remotes/origin/HEAD", "HEAD")

    def git(self, *arguments):
        subprocess.run(["git", "-c", "user.name=Fixture", "-c",
                        "user.email=fixture@example.invalid", *arguments],
                       cwd=self.root, capture_output=True, check=True)

    def commit_lockfile(self, text):
        (self.root / "package-lock.json").write_text(text, encoding="utf-8")
        self.git("add", "package.json", "package-lock.json", "scripts")
        self.git("commit", "-q", "-m", "lockfile")

    def audit(self):
        return subprocess.run([sys.executable, "-B", "scripts/audit_dependencies.py"],
                              cwd=self.root, capture_output=True, check=False).returncode

    def test_audits_only_a_lockfile_changed_from_the_fork_point(self):
        self.assertEqual(self.audit(), 0)
        # The main branch moves on with a lockfile of its own; the fork point stays.
        self.git("checkout", "-q", "-b", "upstream")
        self.commit_lockfile('{"lockfileVersion": 1}\n')
        self.git("update-ref", "refs/remotes/origin/HEAD", "HEAD")
        self.git("checkout", "-q", "-")
        self.assertEqual(self.audit(), 0)
        # A committed lockfile change on the branch is audited, and with no npm it fails.
        self.commit_lockfile('{"lockfileVersion": 2}\n')
        self.assertEqual(self.audit(), 1)

    def test_counts_each_advisory_of_low_or_higher_severity(self):
        # invariant: dependency-audit-refusal
        report = {"vulnerabilities": {
            "a": {"via": [{"name": "a", "source": 1, "severity": "low"},
                          {"name": "a", "source": 2, "severity": "info"}]},
            "b": {"via": ["a", {"name": "b", "source": 3, "severity": "critical"}]},
        }}
        self.assertEqual(audit_dependencies.advisories(report), {("a", 1), ("b", 3)})
        with self.assertRaises(ValueError):
            audit_dependencies.advisories({"message": "request failed", "error": {}})
        # Only an advisory the fork point's lockfile does not have is reported.
        self.commit_lockfile('{"lockfileVersion": 2}\n')
        reports = {True: {("x", 1), ("y", 2)}, False: {("x", 1)}}
        errors = io.StringIO()
        with patch.object(audit_dependencies, "ROOT", self.root), \
                patch.object(audit_dependencies, "audit",
                             lambda directory: reports[Path(directory) == self.root]), \
                contextlib.redirect_stderr(errors):
            self.assertEqual(audit_dependencies.main(), 1)
        self.assertEqual([line.split(":")[0] for line in errors.getvalue().splitlines()], ["y"])


if __name__ == "__main__":
    unittest.main()
