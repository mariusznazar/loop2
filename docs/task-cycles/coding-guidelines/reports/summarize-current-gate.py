"""Summarize captured gate results without replacing their complete output."""
import argparse
import json
from pathlib import Path
import re
import subprocess

parser = argparse.ArgumentParser()
parser.add_argument("--prefix", required=True)
parser.add_argument("--head", required=True)
args = parser.parse_args()
reports = Path(".runs/task-cycles/coding-guidelines/reports")
results = json.loads((reports / (args.prefix + "-gate-results.json")).read_text(encoding="utf-8"))
assert len(results) == 21, "Gate incomplete"
summary = []
lines = [
    "# Controller full required gate",
    "",
    "Actor: root. Completed product source: `" + args.head + "`.",
    "Original fork and reconciled target: `c379207bfd8bd148d3589ea75604ba5165915d01`.",
    "All 21 commands ran sequentially through run-final-gate.py. Complete stdout/stderr and",
    "exact argv, actual exit and duration are retained beside this report.",
    "",
    "| Command | Exit | Summary | Complete output | Exact execution |",
    "|---|---:|---|---|---|",
]
for item in results:
    path = Path(item["output"])
    output = path.read_text(encoding="utf-8", errors="replace")
    signals = [
        line for line in output.splitlines()
        if re.search(r"^(Ran \d+ tests?|OK(?:\s|$)|FAILED|[#ℹ] (?:tests|pass|fail|skipped|cancelled)|WARN |.*(?:warnings?|unchecked):)", line)
    ]
    if not signals:
        signals = output.splitlines()[-3:]
    summary.append({"label": item["label"], "exit_code": item["exit_code"], "signals": signals})
    command = subprocess.list2cmdline(item["command"]).replace("|", r"\|")
    brief = "; ".join(signals).replace("|", r"\|")
    lines.append(
        f"| `{command}` | {item['exit_code']} | {brief} | "
        f"[{path.name}]({path.name}) | [{path.name}.json]({path.name}.json) |"
    )
lines += [
    "",
    "## Limits retained",
    "",
    "- Part-map guard: two dependency criticality warnings; inter-part dependency graph unchecked because no product command reports it.",
    "- Instruction check: ten existing remote Linux path warnings and one false @eslint/js import warning; no measured instruction-loading failure.",
    "- Four adopted environment facts have Method: TODO. These guards check form and references, not an automatic live watch of those facts.",
    "- Actual runtime evidence is Windows plus the Docker checks in these suites. Native Unix host process branches, other supported architectures, minimum Python and older Node 24 installations were not run.",
    "- Browser rendering, screenshots, actual hover/focus/click remain unchecked: D-19 establishes no agent browser route. Source preservation is separate evidence.",
    "- Advisory results describe the real database at execution time, not future advisory publications.",
    "",
    "Independent guideline good/bad pairs, deliberate breaks, native error/healthy/two-listener",
    "acceptance, source-preservation proof and code review verdicts are in final-review.md,",
    "final-fix-review.md, return-citations-review.md and assessment-settlement-review.md;",
    "unit-suite passes alone do not replace them.",
]
(reports / (args.prefix + "-summary.json")).write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
(reports / (args.prefix + "-verification.md")).write_text("\n".join(lines) + "\n", encoding="utf-8")
print(json.dumps({"commands": len(results), "passed": sum(item["exit_code"] == 0 for item in results), "failed": [item["label"] for item in results if item["exit_code"]]}))
