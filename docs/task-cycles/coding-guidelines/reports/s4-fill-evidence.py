"""Populate the report from the captured actual process results."""
import json
from pathlib import Path
import subprocess

directory = Path(__file__).resolve().parent
report = directory / "s4-report.md"
rows = []
for metadata in sorted(directory.glob("s4-*.txt.json")):
    evidence = json.loads(metadata.read_text(encoding="utf-8"))
    command = subprocess.list2cmdline(evidence["command"])
    output = metadata.name.removesuffix(".json")
    rows.append(f"| `{command}` | {evidence['exit_code']} | [{output}]({output}) |")
table = "| Exact child command | Actual exit | Complete stdout/stderr |\n|---|---:|---|\n"
table += "\n".join(rows)
with report.open(encoding="utf-8", newline="") as stream:
    text = stream.read()
assert "<!-- command-evidence -->" in text
with report.open("w", encoding="utf-8", newline="") as stream:
    stream.write(text.replace("<!-- command-evidence -->", table))
print(len(rows))
