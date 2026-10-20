"""Check assigned source selection and print review anchors from the diff package."""

import ast
from pathlib import Path
import re

root = Path(__file__).resolve().parents[4]
lines = (root / ".superpowers/sdd/plan/review-e85670a..49a3705.diff").read_text(
    encoding="utf-8").splitlines()
filename = ""
number = 0
added = {}
needles = ("def suppresses_blocking", "directive = re.search", "def _directives",
           "neutral = True", "def test_python_blocking", "def test_nonblocking")
for line in lines:
    if line.startswith("+++ b/"):
        filename = line[6:]
        added[filename] = []
    elif line.startswith("@@"):
        number = int(re.search(r"\+([0-9]+)", line)[1]) - 1
    elif line.startswith("+") or line.startswith(" "):
        number += 1
        if line.startswith("+"):
            added[filename].append(line[1:])
        if any(needle in line for needle in needles):
            print(f"{filename}:{number}: {line[1:]}")

tree = ast.parse("\n".join(added["scripts/check_ruff.py"]))
assignment = next(item for item in tree.body if isinstance(item, ast.Assign)
                  and item.targets[0].id == "BLOCKING")
selected = assignment.value.func.value.value.split()
facts = (root / "foundations/environment_facts.md").read_text(encoding="utf-8")
fact = facts.split("## ruff-default-rules/1\n", 1)[1].split("\n## ", 1)[0]
fact_sentence = fact.split("\n- **Holds for:**", 1)[0]
full = set(re.findall(r"`([A-Z]+[0-9]+)`", fact_sentence))
decisions = (root / "foundations/decisions.md").read_text(encoding="utf-8")
decision = decisions.split("### D-30/1", 1)[1].split("\n### ", 1)[0]
examples = set(re.findall(r"`([A-Z]+[0-9]+)`", decision))
assert len(full) == 407 and len(examples) == 14
assert len(selected) == len(set(selected)) == 393
assert set(selected) == full - examples
print("Ruff exact adopted membership: 407 - 14 = 393; no missing or extra codes")
print("guidelines directory exists:", (root / "guidelines").exists())
