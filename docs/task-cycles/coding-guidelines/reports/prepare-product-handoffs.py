"""Prepare immutable requirements links for the twelve planned product slices."""

from pathlib import Path

reports = Path(__file__).resolve().parent
for number in range(1, 13):
    text = f"""# Product slice {number}

Read author-contract.md first. Root supplies current start commit on dispatch. Work only in C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines. Read the whole frozen task .runs/task-cycles/coding-guidelines/task.md, authoritative plan.md beside it, and your extracted slice .superpowers/sdd/plan/task-{number}-brief.md. The original plan is authoritative; the extracted brief differs only in its Slice/Task heading for the borrowed helper. This is product slice {number}, not any F-numbered independent-method batch.

Read whole current applicable foundation and guidelines via the selection methods in the contract; use the plan's Read list and dependencies. Root's dispatch supplies current guideline selection and relevant interface reports. Write only this slice's Change paths plus ignored report/evidence artifacts. Do not edit frozen invariant checks or other slices' files. If a method appears wrong or new evidence requires a frozen-check correction, return concrete evidence to root for the separate foundation route; do not weaken a check to pass.

Implement the whole slice against the frozen task. Keep actual focused red/green evidence for behavior changes. Formatting-only work preserves syntax/literals and uses existing behavioral checks. Run the exact planned checks and a meaningful weakest-point check, record actual failed/unchecked results and limits. No routine additional broad suites. Read whole changed files for self-review, explicitly commit assigned paths, and return before independent review or further work.

Full report .runs/task-cycles/coding-guidelines/reports/s{number}-report.md, containing all author-contract evidence, choices and costs, exact versions, scope/sharpness, changed file counts and every remaining issue. Return concise status, commit range, counts and check verdicts. No push, merge, deployment, external writes or subagents.
"""
    (reports / f"s{number}-handoff.md").write_text(text, encoding="utf-8", newline="")
print("Prepared 12 product handoffs.")
