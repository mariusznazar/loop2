"""Refresh the current cycle overview after all source reviews and final checks."""
from pathlib import Path
import json
import re

root = Path.cwd().resolve()
cycle = root / ".runs/task-cycles/coding-guidelines"
reports = cycle / "reports"
results = json.loads((reports / "handoff-final-gate-results.json").read_text(encoding="utf-8"))
assert len(results) == 21 and all(result["exit_code"] == 0 for result in results)
assert (reports / "assessment-settlement-review.md").is_file()
path = cycle / "cycle.md"
with path.open(encoding="utf-8", newline="") as stream:
    text = stream.read()
updates = {
    "Status": "all product work, code reviews, return step, one independent foundation assessment and its settlements, reconciliation and final required gate complete. Ready to archive this record, push task/coding-guidelines and update existing PR16 for human review. Those publication actions follow this record; no merge or deployment is authorized or performed.",
    "Whole-change review": "one final whole-branch review c379207..e31f6a4, two Important findings; one fix e31f6a4..ef057111 and scoped re-review accepted both. Later return metadata ef057111..52bd7f7 and assessment settlements52bd7f7..712117b independently approved. Four original Minor findings retained verbatim in the PR; no unresolved blocking code finding.",
    "Review rounds": "30 completed code-review reports:26 slice/integration reports,1 final whole-branch review,1 sole final-fix re-review,1 return-metadata review and1 assessment-settlement review. One independent foundation assessment on gpt-6-astra (authors gpt-6.1-sol), assessed c379207..52bd7f7 with75 filtered source paths. Its two remarks settled once at712117b; no second assessment.",
    "Weakest-point checks": "actual pinned tools and audit, adversarial configuration/data/observation paths, source-preservation proofs and partial resource-acquisition cleanup recorded by their owners. Independent13 good/bad pairs (26 expected outcomes) and15 valid deliberate breaks detected; native healthy/error/two-server acceptance passed after final fix. Final root gate handoff-final:21/21commands pass,514tests,0skips. Complete final output and limits: reports/handoff-final-verification.md.",
    "Product guidelines": "current selection general guidelines/coding.md plus four indexed kind files, read whole for the broad source change. General coding.md and metadata/index apply to final tooling/document settlements; no indexed kind condition matched these narrow deltas. D28 dependency updated to550e88d6. All26 case blocks preserved. Browser appearance/screenshots/actual hover/focus/click remain unchecked because D19 establishes no route.",
}
for key, value in updates.items():
    text, count = re.subn(r"(?m)^- " + re.escape(key) + r":.*$", "- " + key + ": " + value, text, count=1)
    assert count == 1, key
start_row = next(line for line in text.splitlines() if line.startswith("| Start |"))
final_row = "| Final | high; all seven parts remain high, no computed decrease | package-lock.json; scripts/check_dependencies.py; src/server/** | repository edits reversible; no deployment or server mutations | full required gate, independent source/code reviews, adversarial audit/process checks,13 guideline pairs,15 breaks and one independent foundation assessment with settled remarks |"
if final_row not in text:
    text = text.replace(start_row, start_row + "\n" + final_row)
text=text.replace(
    "## Return step\n\nNot run.",
    "## Return step\n\nCompleted at ef057111 in [return-step.md](reports/return-step.md): all22 settlements covered. Its citation omission was corrected at52bd7f7 and independently approved in [return-citations-review.md](reports/return-citations-review.md). No new invariant meaning was added.",
)
text=text.replace(
    "## Independent assessment\n\nNot run.",
    "## Independent assessment\n\nCompleted once on c379207..52bd7f7 by gpt-6-astra: [assessment](reports/foundation-assessment.md). Both remarks settled at712117b: [settlement](reports/assessment-settlement.md), [independent scoped review](reports/assessment-settlement-review.md). No second assessment; this source-only review did not receive operational history or author reasoning.",
)
text=re.sub(
    r"(?m)^- Request URL and status:.*$",
    "- Request URL and status: https://github.com/mariusznazar/loop2/pull/16 — existing draft; source work is now accepted and final checks pass. Archive/push/description update and ready-for-review action follow this record. The former npm pin conflict is resolved by the accepted12.2.1 amendment. No merge.",
    text,count=1,
)
text=text.replace(
    "- Writes to the task's backlog entry: none.",
    "- Writes to the task's backlog entry: added PR16 URL to the existing in-progress line in C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/_tasks_active.md; no status/other-line change or vault commit.",
)
text=text.replace("## Verification\n","## Baseline verification (historical)\n",1)
text=text.replace("## Blocked request verification\n","## Historical blocked boundary before the accepted npm amendment\n",1)
text=text.replace(
    "No unrun check is reported passed. Baseline Docker BuildKit failure will remain visible in final evidence; changed code checks continue and final required run will establish current result.",
    "No unrun check is reported passed. This historical Docker BuildKit failure is retained; current Docker tests and final required gate pass, as reports/handoff-final-verification.md records.",
)
text += """

## Final source and publication boundary

- Final product commit: `712117b84b20dca607c160964c7b85440759f74b`; base/current target `c379207bfd8bd148d3589ea75604ba5165915d01`;82 files,+10806/-1320.
- Reconciliation and exact command evidence: [final-reconciliation.json](reports/final-reconciliation.json), [executions](reports/final-reconciliation-executions.json). Matching upstream `origin/task/coding-guidelines`; process gitlink/checkout remain `d829e3aa6242a9b8901274531dd82fd5c7d87628`.
- Final foundation selection: all seven parts; all current D01-D37 decisions, all invariants and relevant facts/glossary, as return-step.md records. Only D28's current wording and its sole guideline fingerprint changed in assessment settlement; ownership remains178 claims and all seven criticalities high.
- All22 settlements preserved. D28 records the enduring chosen discipline; plan.md preserves the original before-this-PR-merge full-compliance and repair-scope obligations. No new invariant meaning, version correction, recovered row or glossary-definition move is presented at merge.
-36 numbered coordinator choices C1-C36; implementation choices and costs also remain in full author reports. No remaining human foundation question or pre-review human action.
- The independent assessment's exact source manifest/range is [foundation-assessment-range.json](reports/foundation-assessment-range.json). Its report and the separate settlement/review are retained; they are not represented as an assessment run on the later settlement commit.
- All executable sources, invariant sentences/check algorithms, and26 guideline case blocks retain accepted verification after the documentation-only settlement. The final root gate nevertheless reran on the settled source.
- Earlier failed, blocked and intermediate gate outputs remain historical evidence, not final approval. This includes the original npm11 vulnerability counterexample, invalid initial Express break, comparison-instrument corrections, failed partial process observation and gate runs spanning later source edits.
- Retained limits: two map warnings; inter-part dependency graph unchecked;11 instruction warnings; four fact Methods TODO/unchecked; unexecuted native Unix host process branches, other architectures/minimum Python/older Node24 installs; no browser rendering/screenshot/actual hover/focus/click; no fresh-session instruction-following measurement; advisory result limited to execution time.
- Backlog write: added PR16 URL to this task's existing in-progress line in `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/_tasks_active.md`; no other line/status changed and no vault commit. That backlog entry remains in progress until human merge; the task document's accepted status was not changed.
- Automatic approval review rejected deletion of two pre-existing bytecode cache files with only `blocked by policy`; no bypass/retry and no product requirement depends on deleting them. They remain untracked and outside commits/archive.
- Publication follows this snapshot: archive sanitized record/stages/reports in docs/task-cycles/coding-guidelines, commit addition then immediate removal, push task branch and update existing draft PR16, link this record by adding SHA, mark ready after verifying publication. No merge; keep worktree. Repository permits merge commits and disables squash/rebase merges, so preserved-commit links can survive integration.
"""
with path.open("w", encoding="utf-8", newline="") as stream:
    stream.write(text)
print("Final cycle overview refreshed")
