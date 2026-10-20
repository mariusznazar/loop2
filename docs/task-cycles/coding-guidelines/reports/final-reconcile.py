"""Capture final source/routing reconciliation without changing the task branch."""
from pathlib import Path
import argparse
import json
import subprocess
import time

parser = argparse.ArgumentParser()
parser.add_argument("--head", required=True)
args = parser.parse_args()
root = Path.cwd().resolve()
reports = root / ".runs/task-cycles/coding-guidelines/reports"
executions = []

def run(name, command):
    started = time.monotonic()
    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    output = reports / ("final-reconcile-" + name + ".txt")
    output.write_bytes(result.stdout)
    executions.append({
        "command": command, "exit_code": result.returncode,
        "seconds": round(time.monotonic() - started, 3), "output": output.as_posix(),
    })
    if result.returncode:
        raise RuntimeError(name + " failed")
    return result.stdout.decode("utf-8").strip()

try:
    run("fetch", ["git", "fetch", "origin"])
    head = run("head", ["git", "rev-parse", "HEAD"])
    target = run("target", ["git", "rev-parse", "origin/main"])
    base = run("base", ["git", "merge-base", "HEAD", "origin/main"])
    upstream = run("upstream", ["git", "rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{upstream}"])
    pin = run("pin", ["git", "-C", ".the-way", "rev-parse", "HEAD"])
    gitlink = run("gitlink", ["git", "ls-files", "--stage", "--", ".the-way"])
    status = run("status", ["git", "status", "--porcelain", "--untracked-files=all"])
    stats = run("stat", ["git", "diff", "--shortstat", base, head])
    files = run("files", ["git", "diff", "--name-only", base, head]).splitlines()
    assert head == args.head
    assert target == base == "c379207bfd8bd148d3589ea75604ba5165915d01"
    assert upstream == "origin/task/coding-guidelines"
    assert pin == "d829e3aa6242a9b8901274531dd82fd5c7d87628"
    assert gitlink.split()[1] == pin
    allowed = {
        "?? tests/invariants/__pycache__/loop2_invariant_support.cpython-314.pyc",
        "?? tests/quality/__pycache__/test_invariant_support.cpython-314.pyc",
    }
    assert set(status.splitlines()) <= allowed, "Unexpected working-tree state"
    summary = {
        "head": head, "target": target, "base": base, "upstream": upstream,
        "pin": pin, "stat": stats, "files": files, "untracked_preserved": status.splitlines(),
        "tracked_clean": True,
    }
    (reports / "final-reconciliation.json").write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"head": head, "target": target, "tracked_clean": True, "stat": stats}))
finally:
    (reports / "final-reconciliation-executions.json").write_text(json.dumps(executions, indent=2) + "\n", encoding="utf-8")
