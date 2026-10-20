"""Commit only the prepared record, then its exact removal, retaining evidence."""
from pathlib import Path
import json
import subprocess
import time

root = Path.cwd().resolve()
reports = root / ".runs/task-cycles/coding-guidelines/reports"
target = (root / "docs/task-cycles/coding-guidelines").resolve()
assert root.as_posix() == "C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines"
assert target.is_relative_to(root) and target != root
paths = json.loads((reports / "archive-paths.json").read_text(encoding="utf-8"))
assert paths and len(paths) == len(set(paths))
for path in paths:
    resolved = (root / path).resolve(strict=True)
    assert resolved.is_relative_to(target) and resolved.is_file() and not resolved.is_symlink()
assert not subprocess.check_output(["git", "diff", "--cached", "--name-only"]).strip()
assert not subprocess.check_output(["git", "diff", "--name-only"]).strip()
executions = []

def run(label, argv):
    started = time.monotonic()
    output = reports / ("archive-" + label + ".txt")
    with output.open("wb") as stream:
        result = subprocess.run(argv, stdout=stream, stderr=subprocess.STDOUT)
    executions.append({
        "command": argv, "exit_code": result.returncode,
        "seconds": round(time.monotonic() - started, 3), "output": output.as_posix(),
    })
    (reports / "archive-executions.json").write_text(json.dumps(executions, indent=2) + "\n", encoding="utf-8")
    if result.returncode:
        raise RuntimeError(label + " failed; preserve state for inspection")

for index in range(0, len(paths), 25):
    run(f"add-{index // 25:03}", ["git", "add", "--", *paths[index:index + 25]])
staged = subprocess.check_output(["git", "diff", "--cached", "--name-only"], text=True).splitlines()
assert set(staged) == set(paths), "Index includes unexpected paths"
run("commit-addition", ["git", "commit", "-m", "docs: archive completed coding guidelines cycle evidence"])
addition = subprocess.check_output(["git", "rev-parse", "HEAD"], text=True).strip()
(reports / "archive-addition-sha.txt").write_text(addition + "\n", encoding="ascii")
for index in range(0, len(paths), 25):
    batch = paths[index:index + 25]
    for path in batch:
        assert (root / path).resolve(strict=True).is_relative_to(target)
    run(f"remove-dry-{index // 25:03}", ["git", "rm", "--dry-run", "--", *batch])
    run(f"remove-{index // 25:03}", ["git", "rm", "--", *batch])
staged = subprocess.check_output(["git", "diff", "--cached", "--name-only"], text=True).splitlines()
assert set(staged) == set(paths), "Removal includes unexpected paths"
run("commit-removal", ["git", "commit", "-m", "docs: remove archived coding guidelines cycle from working tree"])
removal = subprocess.check_output(["git", "rev-parse", "HEAD"], text=True).strip()
run("net-source", ["git", "diff", "--exit-code", "712117b84b20dca607c160964c7b85440759f74b", "HEAD"])
result = {"addition": addition, "removal": removal, "files": len(paths), "net_product_delta": False}
(reports / "archive-commits.json").write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
print(json.dumps(result))
