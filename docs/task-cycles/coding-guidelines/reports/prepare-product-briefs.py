"""Adapt pinned Slice headings for Superpowers' Task-only extraction helper."""

import pathlib
import re
import subprocess

root = pathlib.Path(__file__).resolve().parents[4]
cycle = root / ".runs/task-cycles/coding-guidelines"
source = (cycle / "plan.md").read_text(encoding="utf-8")
section = source.split("## Slices\n", 1)[1].split("## Independence and execution", 1)[0]
sections = re.split(r"(?=^### Slice )", section, flags=re.MULTILINE)
product = [item for item in sections if re.match(r"### Slice \d+ ", item)]
assert len(product) == 12
adapted = "\n".join(re.sub(r"^### Slice (\d+) ", r"### Task \1 ", item) for item in product)
adapter = root / ".superpowers/sdd/plan/product-extraction-adapter.md"
adapter.write_text(adapted, encoding="utf-8", newline="")
helper = "C:/Users/Mariusz/.claude/plugins/cache/claude-plugins-official/superpowers/6.4.1/skills/subagent-driven-development/scripts/task-brief"
for number in range(1, 13):
    output = root / f".superpowers/sdd/plan/task-{number}-brief.md"
    subprocess.run(["C:/Program Files/Git/bin/bash.exe", helper, str(adapter), str(number), str(output)], check=True, cwd=root)
print("Prepared 12 product briefs; source plan remains authoritative.")
