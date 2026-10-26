"""Compare package paths and versions without modifying either lockfile."""

import json
from pathlib import Path
import subprocess

base = json.loads(subprocess.check_output(
    ["git", "show", "7012abc:package-lock.json"]))["packages"]
current = json.loads(Path("package-lock.json").read_text(encoding="utf-8"))["packages"]
for name in sorted(base.keys() & current.keys()):
    if base[name].get("version") != current[name].get("version"):
        print(name, base[name].get("version"), "->", current[name].get("version"))
print("removed_paths", len(base.keys() - current.keys()))
print("added_paths", len(current.keys() - base.keys()))
