"""Preserve the independent blocking findings verbatim in the fix dispatch."""

from pathlib import Path
import re

root = Path.cwd()
cycle = root / ".runs/task-cycles/walka-w-glebi-lasu"
reports = cycle / "reports"
review = (reports / "31-whole-review.md").read_text(encoding="utf-8-sig")
start = review.index("## Important findings")
end = review.index("## Minor and out-of-scope findings")
findings = review[start:end]
(reports / "32-blocking-findings.md").write_text(findings, encoding="utf-8", newline="\n")
plan = (cycle / "plan.md").read_text(encoding="utf-8-sig")
section = re.search(r"(?ms)^### Slice 7 .*?(?=^### Slice 8 )", plan).group(0)
selection = re.search(r"(?m)^- \*\*Read:\*\*.*$", section).group(0)
handoff = f"""# One fix of whole-review findings

Worktree C:/Storage/repos/loop2-wt/walka-w-glebi-lasu, branch task/walka-w-glebi-lasu. Fix base/reviewed HEAD 99b2a271675fc32a8c136f563bad70c300444e1a. Task base7a633a7ab44868427c9c824948b99d4400a631ca. Process pin3aee7d958835cc19b95519f4d21b37538b78e3e1. You are a fresh same-class author because findings concern multiple slices3/5/6/7, whose highest class is same (slice6). User delegated intermediate choices via implement-task; no trust boundary/irreversible operation. No user approval needed. Questions to orchestrator only.

Read project .agents/skills/the-way-make-change/SKILL.md and pinned .the-way/task-cycle/change/SKILL.md whole. Variant: "the fix of a review's findings". Read referenced variant files when their step calls. Follow AGENTS/global script/git rules and relevant coding/testing guidelines. Do not read cycle.md, begin another stage, run full gate or merge/push/PR. The pinned cycle permits this one fix followed by the same reviewer's re-review.

Read the whole frozen task at .runs/task-cycles/walka-w-glebi-lasu/task.md and the reviewed spec.md beside it. Plan source plan.md and full review reports/31-whole-review.md. Exact blocking findings are copied to reports/32-blocking-findings.md with no grade/scope edits. Address all3 findings with maintained regression tests and required invariant annotation; do not fix Minor/out-of-scope issues (none reported). Reviewer found no current gameplay defect. Change product behavior only if your checks expose an actual mismatch and report it with evidence.

Read selection for the affected simulation/invariant scope, verbatim from plan Slice7:

{selection}

Additional whole reads: src/browser/sim/combat.ts; tests/sim/combat.test.mjs; tests/sim/encounters.test.mjs; src/browser/sim/understanding.ts; existing relevant test files and fixtures named by R1-R3 and your actual changes; reports/21-slice-03-report.md,21-slice-05-report.md,21-slice-06-report.md,21-slice-07-report.md for contracts and limitations. Foundation report14 maps F identifiers to written entries. The reviewer has scratch evidence reports/31-probes.test.mjs and retained Stryker JSON/logs; use the actual task meaning to choose independent expectations rather than transplanting a second engine as oracle.

Prior implementation contracts: map forestDeep, nullable ordinary current, activeCombat plus lastCombat; finishMinute/stepMinute programs are prefiltered and advanceMinutes owns actual Understanding filtering/discovery. New input-purity successful calls are already covered. First/repeated wolf checks must connect the actual discovered state's persistent Understanding to subsequent lifecycle, not independent fully-known fixtures. Split-time/replay must exercise combat and compare full appropriate state and ordered events, including discovery and terminal cases; changing real-clock markers or counters only to make equality pass is not a proof. Explain any normalization the public API requires.

Run affected focused checks via npm test -- <one file>, never full npm test. Keep meaningful red/green evidence for the concrete faults the reviewer found (including exact command/exit); if using a temporary fault to show the new protection, restore source and prove clean final implementation before commit. Independent reviewer owns Stryker assessment/re-run; no broad duplicate mutation campaign assigned here. Local Ruff/ShellCheck in .runs/quality-venv/Scripts if needed. Baseline Windows serving-process enumeration error and Docker skips remain unrelated; do not repair them.

Commit only explicit changed paths after own-work checks, no empty commit or force staging. Preserve ignored reports and unrelated files. Write reports/33-fix-report.md with status, base/head/commits, changed paths/line counts, each R finding addressed with evidence, checks exact command/exit and initial red/final result, own weakest-point check, reaches and choices/rejected options/cost. Return concise status/commit/check outcome/report path. Same independent reviewer will assess fix once; root owns full gate after that.
"""
(reports / "32-fix-handoff.md").write_text(handoff, encoding="utf-8", newline="\n")
print("findings_and_handoff_written=true")
