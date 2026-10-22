"""Fail on each npm advisory of low or higher severity that the audit of the lockfile reports
and the audit of the lockfile at the fork point does not (D-33).

Exit code: 0 when the lockfile equals the one at the fork point, or brings in no advisory; 1 when
it brings one in, or when git or the audit gives no complete answer.
"""

import json
from pathlib import Path
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
NPM = ROOT / "node_modules/npm/bin/npm-cli.js"
AUDIT = ["audit", "--json", "--package-lock-only", "--audit-level=low", "--include=dev",
         "--include=optional", "--include=peer", "--registry=https://registry.npmjs.org/"]
BLOCKING = {"low", "moderate", "high", "critical"}


def git(*arguments):
    return subprocess.run(["git", *arguments], cwd=ROOT, capture_output=True,
                          check=True).stdout


def advisories(report):
    """The (package, advisory) pairs of blocking severity in an `npm audit --json` report."""
    if "error" in report or not isinstance(report.get("vulnerabilities"), dict):
        raise ValueError("npm audit gave no complete report: " + json.dumps(report))
    return {(via["name"], via["source"]) for entry in report["vulnerabilities"].values()
            for via in entry["via"] if isinstance(via, dict) and via["severity"] in BLOCKING}


def audit(directory):
    # npm audit exits 1 both on a finding and on a failed request; the report tells them apart.
    result = subprocess.run(["node", NPM, *AUDIT], cwd=directory, capture_output=True,
                            text=True, encoding="utf-8", check=False)
    return advisories(json.loads(result.stdout))


def main():
    fork_point = git("merge-base", "HEAD", "origin/HEAD").decode().strip()
    if not git("diff", fork_point, "--", "package-lock.json"):
        print("package-lock.json equals the one at " + fork_point + "; nothing to audit")
        return 0
    with tempfile.TemporaryDirectory() as directory:
        for name in ("package.json", "package-lock.json"):
            Path(directory, name).write_bytes(git("show", fork_point + ":" + name))
        before = audit(directory)
    introduced = sorted(audit(ROOT) - before)
    for name, source in introduced:
        print(f"{name}: advisory {source} is new against {fork_point}", file=sys.stderr)
    return 1 if introduced else 0


if __name__ == "__main__":
    sys.exit(main())
