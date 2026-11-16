"""Compare, for each decision, the invariants deriving from it with those its Verification names.

Writes the mismatches to the UTF-8 file named by the first argument; prints only a count.
"""

import re
import sys
from pathlib import Path

root = Path.cwd()
invariants = (root / "foundations/invariants.md").read_text(encoding="utf-8")
log = (root / "foundations/decisions.md").read_text(encoding="utf-8")

derived = {}
for match in re.finditer(r"^## ([a-z0-9-]+)\n(.*?)(?=^## |\Z)", invariants, re.S | re.M):
    name, body = match.group(1), match.group(2)
    source = re.search(r"^- \*\*Derives from:\*\* (.*)$", body, re.M)
    if source is None:
        continue
    for decision in re.findall(r"D-\d+", source.group(1)):
        derived.setdefault(decision, set()).add(name)

named = {}
for match in re.finditer(r"^### (D-\d+) — .*?(?=^### |\Z)", log, re.S | re.M):
    decision, body = match.group(1), match.group(0)
    field = re.search(r"^- \*\*Verification:\*\*(.*?)(?=^- \*\*Origin)", body, re.S | re.M)
    names = set()
    if field:
        clause = re.search(r"invariants:(.*?)(?:\.\s|\.$|$)", field.group(1).replace("\n", " "))
        if clause:
            names = {part.strip() for part in clause.group(1).split("·") if part.strip()}
    named[decision] = names

lines = []
for decision in sorted(set(derived) | set(named), key=lambda d: int(d[2:])):
    missing = derived.get(decision, set()) - named.get(decision, set())
    extra = named.get(decision, set()) - derived.get(decision, set())
    if missing or extra:
        lines.append(f"{decision}: derived but not named {sorted(missing)}; named but not derived {sorted(extra)}")
Path(sys.argv[1]).write_text("\n".join(lines) + "\n", encoding="utf-8")
print(len(lines), "mismatches")
