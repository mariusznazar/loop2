# Handoff — reviewer of the reconciliation, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You review the reconciliation with the target
branch, a fresh agent that made none of it. Your questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\reset-hasla`, branch `task/reset-hasla`,
  head `08ca3eb`. Process pin `.the-way` at `a8dfe8a`.
- Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`). Read it whole;
  read a file it names when the step that names it comes.
- What is reviewed: the reconciliation, the range `fdfbc62..08ca3eb`: the renumbering `d2e1c3b` and the
  merge `08ca3eb` of `origin/main` at `4ed8fcd`, parents `d2e1c3b` and `4ed8fcd`.
- The author's report, claims to verify:
  `.runs/task-cycles/reset-hasla/reports/37-reconciliation-report.md`
- Report path: `.runs/task-cycles/reset-hasla/reports/38-reconciliation-review-report.md`; first line
  `PASS <sha>`, `FAIL <sha>` or `questions`.
- Do not change any file in the reviewed worktree. The orchestrator's full gate is running there on
  this head while you read, so do not run the gate, and run anything that builds in a separate
  worktree or export.

## Answers of step 4

- Trust boundary: **yes**, `src/server/**`. `main` changed no server file; the routes must read as they
  did at `fdfbc62`.
- Irreversible operation: **no**; no schema step on either side. Check that the merge adds none.

## What to check

`main` carries task 14 (settling map runs), which the task's reviews never saw beside this change.

- What the merge could break that merged without a conflict: the two changed files on both sides,
  `src/browser/styles.css` and `tests/view/account-screen.test.mjs`; the page's start in
  `src/browser/view/app.ts` with the reset branch before the game is built, against main's changes
  to the game and its save version 2; `password-reset` and the session end against main's handling of a
  saved game state; the kitchen-sink page.
- Every mention of D-214 to D-221 means main's entry and every mention of D-222 to D-227 this task's.
- Nothing either side settled was dropped or reworded. The foundation joins both.
- The earlier cycle's reviews need not be repeated: judge what the merge changed.

## What to read

The frozen task `.runs/task-cycles/reset-hasla/task.md`, *Settlements to record* and To do, as far as
a claim needs them. Foundation entries, each whole: D-44, D-96, D-112, D-203, D-204, D-206, D-210, D-211,
D-214 to D-227; the invariants `save-version`, `password-reset-link`, `password-reset-ends-sessions`,
`expired-session-unsaved-progress`. Guidelines, each whole: `guidelines/coding-browser-module.md`,
`guidelines/styleguide-browser-view.md`.

## Return

Write your report as the method gives, with your reaches and **Searches not found or unclear**. Return
its first line and the path.
