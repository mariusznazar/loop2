# Handoff — fix of the whole-change findings, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You fix the blocking findings of the review of the
whole change, a fresh agent, since they concern the plan's *Foundation entries*, Slice 10 and Slice
11. Your questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\reset-hasla`, branch `task/reset-hasla`, head `2e5d694`. Process pin
  `.the-way` at `a8dfe8a`, not moved.
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`). Read it whole;
  read `fix.md` beside it, since your variant is "the fix of a review's findings".
- Findings file: `.runs/task-cycles/reset-hasla/reports/33-whole-fix-findings.md`, three blocking
  findings.
- Frozen task: `.runs/task-cycles/reset-hasla/task.md`: To do 11 and 14, rows 2, 3, 11, and
  question 6 for what a failed login is.
- Reviewed spec: `.runs/task-cycles/reset-hasla/spec.md`: Decision 7, Decision 15.
- Report path: `.runs/task-cycles/reset-hasla/reports/33-whole-fix-report.md`

## Each finding's way

- I-1: `foundations/decisions.md`, D-100, through `the-way-record-decision`. Its code and tests stay.
- I-2: `src/browser/kitchen-sink/kitchen-sink.ts`. Read `guidelines/styleguide-browser-view.md` and D-44
  whole, and `src/browser/AGENTS.md`. The finding gives the fix for „Załóż konto” as a refusal sample or
  a narrowing of D-44; take the sample. Look at the page in a browser (Playwright through ToolSearch,
  query "playwright"), and take one screenshot of the changed samples; stop any server you start.
- I-3: `guidelines/testing.md`, five rows, as the column „The cycle's author” of
  `the-way-maintain-testing-guidelines` gives (`.the-way/product-guidelines/testing/SKILL.md:37-45`).

Not yours: the review's Minor and out-of-scope findings, though the report suggests one for this
round. Do not fix them.

## Checks

`python -B .the-way/elements/common/foundation_check.py`, `node scripts/kitchen-sink.mjs --build-only`,
`npm test -- tests/invariants/test_application_build_kitchen_sink.py`, `npm run typecheck`,
`npm test -- tests/quality/test_quality_invariants.py`, each with its command and exit code. Do not run
the full gate (`npm test` with no argument); it is the orchestrator's. Commit by explicit paths in the
repository's style, no push. `.runs/quality-venv` and `node_modules` stand in this worktree.

## Return

Write your report as `fix.md` gives, with your reaches and **Searches not found or unclear**. Return
your status, your commits, a one-line check result and the report's path.
