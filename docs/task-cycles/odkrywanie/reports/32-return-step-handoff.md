# Handoff — return step, task cycle odkrywanie

## Delegation

The human (Mariusz) started this the-way task cycle and delegated every intermediate choice to the
cycle's orchestrator. You answer to the orchestrator, never to the human.

## Your stage

- Method: the project skill `the-way-make-change` (pinned the-way at `.the-way`, commit 574a37b),
  read whole with what it names, taking the cycle's return step. Read step 11 of
  `.the-way/task-cycle/skill/SKILL.md` whole (the paragraph beginning "Take the return step"), with
  the paragraph beginning "The foundation step writes the entries the task carries", and the
  element skills it names: `the-way-record-decision`, `the-way-record-invariant`,
  `the-way-record-glossary-term`, `the-way-record-environment-fact`, `the-way-update-part-map`.
  Write each entry only through its element's skill.
- Worktree: `C:/Storage/repos/loop2/.runs/worktrees/odkrywanie`, branch `task/odkrywanie`, head
  `bdef6f8058037c9ca153e8b37b4f1c85f162b472` (reviewed: whole change PASS after one fix). Commit
  by explicit paths, messages in English. Change no product code unless a foundation entry cannot
  be made to match otherwise — then return `questions` instead.
- Questions for the human arise only where the foundation step allows them; return such a question
  with status `blocked`.
- Report: `.runs/task-cycles/odkrywanie/reports/33-return-step-report.md`, filling for the record:
  foundation compared with code (what no longer matched and its correction, or none); decisions,
  invariants, environment facts, glossary terms, part-map changes written or changed; projected
  entries written whole or in part; rows of *Settlements to record* written (row → identifier).
  For each entry you write or change, one sentence of its meaning in Polish. Each check with its
  command and exit code; run `python -B .the-way/elements/common/foundation_check.py` before you
  return. Return only your status, commits, a one-line check result and the report path.

## What to compare

- Frozen task, whole: `.runs/task-cycles/odkrywanie/task.md` (its § Decisions in play names the
  entries the task touches; § Settlements to record its rows O1–O9; § Out of scope what later tasks
  bring).
- Plan: `.runs/task-cycles/odkrywanie/plan.md`. The change: `git diff d9a2374..bdef6f8`.
- Entries this change wrote or changed (commit dcd529d): D-118, D-119 (the part this task makes
  true), D-120, D-121 (O9), D-122 (O2), D-123 (O1), D-124 (O6), D-125 (O7), D-126 (O8), D-71
  changed (O3); invariants `player-map-run-pace` (O4), `minute-span-split` (O5),
  `program-rule-pick` (follows O8); glossary terms predisposition, archetype, Understanding (the
  part this task makes true), repertoire. Report of their writer:
  `.runs/task-cycles/odkrywanie/reports/04-foundation-entries-report.md`.
- Entries the task names: D-04, D-18, D-20, D-21, D-23, D-25, D-39, D-44, D-60, D-62, D-63, D-71,
  D-82; invariants `player-map-run-pace`, `minute-span-split`, `program-closed-lists`,
  `content-identifiers`; terms character skill, program rule, map run.
- The entries a search of the foundation finds for what the change touches, and the part map of
  simulation, browser-view and product-foundation (new files: `src/browser/sim/data/skills.ts`,
  `src/browser/sim/data/revelations.ts`, `src/browser/sim/understanding.ts`,
  `tests/sim/understanding-fixture.mjs`, `tests/sim/repertoire.test.mjs`,
  `tests/sim/discovery.test.mjs`).
- Each executor's choices are in `.runs/task-cycles/odkrywanie/reports/slice-<n>-report.md`
  (1–12); the reviews in `reports/20-whole-review.md` and `reports/22-fix-review.md`.
