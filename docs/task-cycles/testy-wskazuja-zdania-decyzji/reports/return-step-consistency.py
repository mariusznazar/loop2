"""Cross-check the Verification fields of the decision log against the lines `decision:` of the tests.

Writes its findings to a UTF-8 file named by the first argument; prints only counts.
"""

import re
import subprocess
import sys
from pathlib import Path

root = Path.cwd()
log = (root / "foundations/decisions.md").read_text(encoding="utf-8")

entries = {}
for match in re.finditer(r"^### (D-\d+) — .*?(?=^### |\Z)", log, re.S | re.M):
    entries[match.group(1)] = match.group(0)

lines_by_decision = {}
files = subprocess.run(
    ["git", "ls-files"], capture_output=True, text=True, encoding="utf-8", check=True
).stdout.splitlines()
pattern = re.compile(r'decision: (D-\d+) "')
for name in files:
    if name.endswith(".md") or name.startswith(".the-way"):
        continue
    path = root / name
    if not path.is_file():
        continue
    try:
        text = path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        continue
    for number, line in enumerate(text.splitlines(), 1):
        found = pattern.search(line)
        if found:
            lines_by_decision.setdefault(found.group(1), []).append(f"{name}:{number}")

report = []
withdrawn = 0
counts = {"tests_without_lines": 0, "lines_without_tests": 0, "nothing_without_pair": 0,
          "pair_without_phrase": 0, "unknown_decision_lines": 0}
for decision, body in entries.items():
    verification = re.search(r"^- \*\*Verification:\*\*(.*?)(?=^- \*\*Origin)", body, re.S | re.M)
    if verification is None:
        withdrawn += 1
        continue
    field = verification.group(1)
    has_tests = re.search(r"(^|\s)tests: ", field) is not None
    has_invariants = "invariants:" in field
    has_pair = "complies:" in field
    has_lines = decision in lines_by_decision
    if has_tests and not has_lines:
        counts["tests_without_lines"] += 1
        report.append(f"{decision}: clause tests: with no line decision: in the tree")
    if has_lines and not has_tests:
        counts["lines_without_tests"] += 1
        report.append(f"{decision}: lines decision: {lines_by_decision[decision][:3]} with no clause tests:")
    if not has_tests and not has_invariants and not has_pair:
        counts["nothing_without_pair"] += 1
        report.append(f"{decision}: held by no test and no invariant, and no pair")
    if has_pair and (has_tests or has_invariants) and "no invariant" not in field and "no test" not in field and "part" not in field:
        counts["pair_without_phrase"] += 1
        report.append(f"{decision}: pair beside tests/invariants with no words limiting it to a part")
for decision in lines_by_decision:
    if decision not in entries:
        counts["unknown_decision_lines"] += 1
        report.append(f"{decision}: lines decision: name a decision the log lacks")

Path(sys.argv[1]).write_text("\n".join(report) + "\n", encoding="utf-8")
print(len(entries), "entries;", withdrawn, "without Verification;", counts)
