"""Observe actual compiler subprocesses without replacing their implementation."""
import json
import os
from pathlib import Path
import subprocess
import sys

root = Path(__file__).resolve().parents[4]
mode = sys.argv[1]
assert mode in {"typecheck", "build"}
output = Path(__file__).with_name(f"s1-resume-{mode}-processes.jsonl")
output.write_text("", encoding="utf-8")
env = dict(os.environ)
env["NODE_OPTIONS"] = "--require=" + str(Path(__file__).with_name("s1-resume-compiler-trace.cjs"))
env["S1_TRACE_FILE"] = str(output)
result = subprocess.run(["npm.cmd", "run", mode], cwd=root, env=env)
assert result.returncode == 0, result.returncode
entries = [json.loads(line) for line in output.read_text(encoding="utf-8").splitlines()]
assert len(entries) == 2, entries
assert [entry["argv"][1:3] for entry in entries] == [["-p", "tsconfig.browser.json"], ["-p", "tsconfig.server.json"]], entries
for entry in entries:
    assert entry["runtime"] == "7.0.2", entry
    assert ("--noEmit" in entry["argv"]) == (mode == "typecheck"), entry
assert (root / "dist/public/main.js").is_file() if mode == "build" else True
assert (root / "dist/server/main.js").is_file() if mode == "build" else True
print(json.dumps({"mode": mode, "entries": entries}))
