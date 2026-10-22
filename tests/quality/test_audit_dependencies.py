"""Tests of scripts/audit_dependencies.py: when it audits and what it counts."""

from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
import audit_dependencies


class DependencyAudit(unittest.TestCase):

    def test_audits_only_a_lockfile_changed_from_the_fork_point(self):
        # A repository with no local npm: a run that audits cannot succeed in it.
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "scripts").mkdir()
            shutil.copy(ROOT / "scripts/audit_dependencies.py", root / "scripts")
            (root / "package.json").write_text('{"name": "case"}\n', encoding="utf-8")
            (root / "package-lock.json").write_text('{"lockfileVersion": 3}\n',
                                                    encoding="utf-8")

            def git(*arguments):
                subprocess.run(["git", "-c", "user.name=Fixture", "-c",
                                "user.email=fixture@example.invalid", *arguments],
                               cwd=root, capture_output=True, check=True)

            def audit():
                return subprocess.run([sys.executable, "-B", "scripts/audit_dependencies.py"],
                                      cwd=root, capture_output=True, check=False).returncode

            git("init", "-q")
            git("add", "package.json", "package-lock.json")
            git("commit", "-q", "-m", "start")
            git("update-ref", "refs/remotes/origin/HEAD", "HEAD")
            self.assertEqual(audit(), 0)
            (root / "package-lock.json").write_text('{"lockfileVersion": 2}\n',
                                                    encoding="utf-8")
            self.assertEqual(audit(), 1)

    def test_counts_each_advisory_of_low_or_higher_severity(self):
        report = {"vulnerabilities": {
            "a": {"via": [{"name": "a", "source": 1, "severity": "low"},
                          {"name": "a", "source": 2, "severity": "info"}]},
            "b": {"via": ["a", {"name": "b", "source": 3, "severity": "critical"}]},
        }}
        self.assertEqual(audit_dependencies.advisories(report), {("a", 1), ("b", 3)})
        with self.assertRaises(ValueError):
            audit_dependencies.advisories({"message": "request failed", "error": {}})


if __name__ == "__main__":
    unittest.main()
