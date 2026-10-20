"""Append traceable acceptance tables and verbatim deferred findings."""

import json
from pathlib import Path
import re

REPORTS = Path(__file__).resolve().parent
TASK = REPORTS.parents[3]
SCRATCH = TASK / ".runs/final-review-scratch"
rows = json.loads((REPORTS / "final-review-executions.json").read_text(encoding="utf-8"))
by_label = {row["label"]: row for row in rows}


def link(path, title):
    return f"[{title}]({Path(path).as_posix()})"


def evidence(row):
    return (
        link(row["output"], "full output")
        + " · " + link(Path(row["output"]).with_suffix(".json"), "exact command")
    )


def case_input(row):
    relative = row["source"].split("; applied whole file at ", 1)[1]
    saved = SCRATCH / ".runs/cases" / row["label"] / relative
    return link(saved, relative)


diagnostics = {
    "browser-view-framework": "Named forbidden framework import; build also rejects the absent package.",
    "content-identifiers": "Names content outside its data file.",
    "simulation-isolation": "Host/system time or timer use in simulation.",
    "account-server-express-http": "Raw Node HTTP request handler outside an Express application.",
    "loop2-api-error-route": "API response is an HTML document (and wrong representation/status).",
    "simulation-inputs": "Exported simulation function changes argument 0.",
    "eslint-source-rules": "ESLint no-debugger message in bad case; blocking comment suppression in own break.",
    "eslint-configuration-rules": "Configuration comparison fails for weakened rule or omitted source.",
    "ruff-source-rules": "F401 in bad case; blocking_suppression true in own break.",
    "shellcheck-source-rules": "SC2086 in bad case; policy_changing_directive true in own break.",
    "prettier-source-format": "format or configuration differs, with the input path.",
    "introduced-npm-vulnerabilities": "dependency-audit / introduced-npm-vulnerabilities/1 verdict fail.",
    "guidelines-form": "Required Kinds of code section is missing.",
    "guidelines-reference-current": "D-32 fingerprint 00000000 differs from current 7eedf283.",
    "loop2-one-serving-process": "Started process tree listens on another TCP port.",
}
chunks = [
    "\n## Actual guideline case matrix\n\n",
    "Each good run exits 0 and each bad run exits 1. The source column links the exact "
    "guideline block; the two input links retain the complete applied files. Output/command "
    "links identify the corresponding independent executions.\n\n",
    "| Invariant and source | Complete good / bad input | Actual good / bad exits and evidence | Observed bad diagnostic |\n",
    "|---|---|---|---|\n",
]
cases = [row for row in rows if row["label"].startswith("case-")]
for good, bad in zip(cases[::2], cases[1::2]):
    assert good["expected"] == good["exit"] == 0
    assert bad["expected"] == bad["exit"] == 1
    source = good["source"].split("; applied whole file at ", 1)[0].replace("\\", "/")
    source = source.replace(SCRATCH.as_posix(), TASK.as_posix())
    chunks.append(
        f"| `{good['invariant']}` · [guideline source]({source}) "
        f"| {case_input(good)} · {case_input(bad)} "
        f"| good **0**: {evidence(good)}; bad **1**: {evidence(bad)} "
        f"| {diagnostics[good['invariant']]} |\n"
    )
chunks.extend([
    "\n## Independent deliberate-break matrix\n\n",
    "These inputs were authored separately from the guideline bad blocks. Every valid "
    "input below exits 1 with the indicated detection. Each exact command is in the "
    "linked metadata, and the complete input is retained.\n\n",
    "| Invariant | Reviewer-authored input and purpose | Actual exit / evidence | Observed diagnostic |\n",
    "|---|---|---|---|\n",
])
for row in rows:
    if not row["label"].startswith("break-"):
        continue
    invalid = row["label"] == "break-account-server-express-http"
    purpose = row["source"].split("; applied whole file at ", 1)[0]
    diagnostic = (
        "**Invalid initial probe:** an empty server services no route; no invariant violation. "
        "Kept for transparency; the later request-listener row is the valid break."
        if invalid else diagnostics[row["invariant"]]
    )
    chunks.append(
        f"| `{row['invariant']}` | {case_input(row)}; {purpose} "
        f"| **{row['exit']}**: {evidence(row)} | {diagnostic} |\n"
    )
chunks.extend([
    "\n## Baseline and restoration matrix\n\n",
    "| New invariant | Baseline | Restored |\n|---|---|---|\n",
])
for row in rows:
    if row["label"].startswith("baseline-"):
        restored = by_label[row["label"].replace("baseline-", "restored-", 1)]
        chunks.append(
            f"| `{row['invariant']}` | **{row['exit']}**: {evidence(row)} "
            f"| **{restored['exit']}**: {evidence(restored)} |\n"
        )
chunks.extend([
    "\nAdditional restored real checks: "
    + evidence(by_label["restored-one-serving-process"]) + " (one-serving-process, exit 0); "
    + evidence(by_label["restored-express-http"]) + " (Express HTTP, exit 0). "
    "Final scratch status is empty: " + evidence(by_label["scratch-status"]) + ".\n",
    "\n## Changed process-observation acceptance\n\n",
    "| Check / invocation | Actual result | Evidence |\n|---|---|---|\n",
    "| `python -B .runs/task-cycles/coding-guidelines/reports/final-review-nonzero-observation.py` "
    "| Exit 0: all four changed readers/branches reject real child commands exiting 7 with "
    "valid-looking partial stdout. Unix branches are exercised on Windows, not native Unix. | "
    + link(REPORTS / "final-review-nonzero-observation.log", "Complete commands/stdout/stderr")
    + " · " + link(REPORTS / "final-review-nonzero-observation.py", "Own probe source") + " |\n",
    "| `python -B .runs/task-cycles/coding-guidelines/reports/final-review-observation-probe.py` "
    "| Exit 1: both Windows readers accept an actual non-terminating CIM error with exit 0. "
    "Acceptance failure I-1. | "
    + link(REPORTS / "final-review-observation-probe.log", "Complete commands/stdout/stderr") + " |\n",
    "| `python -B .runs/task-cycles/coding-guidelines/reports/final-review-process-false-pass.py` "
    "| Exit 1: normal observation rejects two live HTTP servers; failed partial native observation "
    "makes the unchanged assertion accept them. Acceptance failure I-1. | "
    + link(REPORTS / "final-review-process-false-pass.log", "Complete commands/stdout/stderr") + " |\n",
    "\nThe capture invocations ran these scripts with Python `-B` from the task root and retained "
    "the child stdout/stderr as bytes. Script sources describe all injected failures; no failed "
    "acceptance result is converted to a product pass.\n",
    "\n## Independent reassessment of every deferred entry\n\n",
    "All four entries in the current-deferred section and later events of "
    + link(TASK / ".superpowers/sdd/plan/progress.md", "the progress ledger")
    + " were included. Each original finding below is copied without shortening or rewriting "
    "its words. The new judgment follows the original, separately.\n",
])
deferred = [
    (
        "s1-resume-review.md",
        "Minor retained, in scope documentation. Independently verified README still states "
        "Node 24.x and the actual npm 12.2.1 lock entry requires ^24.15.0 within that major. "
        "This is a concrete setup-description mismatch, not evidence of a failed tested install. "
        "No older-runtime installation was performed. Leaving it unchanged can confuse contributors; "
        "a minimum-version clarification costs only prose. It does not change the accepted tool pin.",
    ),
    (
        "s2-review.md",
        "Minor retained only as an evidence-output note, not a code defect or approval blocker. "
        "The complete installation log really records success followed by the pip 25.3-to-26.2.1 "
        "notice; the pinned tool results are unaffected. Leaving it costs a little output noise; "
        "the optional installation flag is the only proposed cost. No pip upgrade is warranted.",
    ),
    (
        "s7-review.md",
        "Minor retained, report-only. Independently searched current tests/view: sendTargets and "
        "send.target have no hits, while the statusText positive control finds actual tests. "
        "The independent complete-source preservation proof covers send-panel.ts, but neither it "
        "nor the passing 59-view-test claim proves an observed send click. The original report "
        "overclaims coverage. Leaving it risks repeating that overclaim; correcting the evidence "
        "description is sufficient, without new product tests or browser work.",
    ),
    (
        "s12-review.md",
        "Minor retained, in scope guideline prose. The final root instruction scan independently "
        "records the precise @eslint/js missing-import warning and exits 0. The package token is "
        "not a missing instruction file. Leaving it keeps a recurring false warning; inline-code "
        "formatting can clarify the intended package reference. No measured failure to load or "
        "follow the real conditional pointer is established.",
    ),
]
for name, judgment in deferred:
    path = REPORTS / name
    text = path.read_text(encoding="utf-8")
    match = re.search(r"(?ms)^### Minor\b.*?(?=^## |\Z)", text)
    assert match, name
    original_line = text[:match.start()].count("\n") + 1
    chunks.append("\nOriginal source: " + link(str(path) + ":" + str(original_line), name) + ".\n\n")
    chunks.append(match.group(0).rstrip() + "\n\n")
    chunks.append("**Final independent judgment:** " + judgment + "\n")
chunks.append(
    "\n## Final assessment\n\n"
    "**Needs fixes.** The full guideline-case acceptance is successful and most requirements are "
    "supported, but I-1 and I-2 prevent readiness for this exact head. "
    "Four nonblocking Minor entries remain as independently graded above. "
    "No approval for a later revision, merge, deployment or next cycle stage is implied.\n"
)
with (REPORTS / "final-review.md").open("a", encoding="utf-8", newline="") as handle:
    handle.write("".join(chunks))
print("appended", len(cases), "case records and", len(deferred), "original findings")
