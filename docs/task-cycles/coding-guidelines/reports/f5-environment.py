"""Print sanitized local audit tooling and operational cleanup verification."""
import json
from pathlib import Path
import platform
import subprocess

print("Python", platform.python_version())
subprocess.run(["node", "--version"], check=True)
npm = Path("C:/Program Files/nodejs/node_modules/npm")
print("reference npm", json.loads((npm / "package.json").read_text())["version"])
print("fixture semver", json.loads((npm / "node_modules/semver/package.json").read_text())["version"])
source = npm / "node_modules/@npmcli/metavuln-calculator/lib/advisory.js"
for number, line in enumerate(source.read_text().splitlines(), 1):
    if "semverOpt" in line or "semver.satisfies(version, this.range" in line:
        print(str(source) + ":" + str(number) + ":" + line)
subprocess.run(["git", "worktree", "list"], check=True)
subprocess.run(["git", "branch", "--list", "task/coding-guidelines-dependencies"], check=True)
print("accidental worktree exists:", Path(
    "C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines-dependencies").exists())
