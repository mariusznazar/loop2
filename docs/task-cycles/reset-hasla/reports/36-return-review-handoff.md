# Handoff — reviewer of the return step, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You review the commits of the return step, a fresh
agent that made none of them. Your questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\reset-hasla`, branch `task/reset-hasla`.
  Process pin `.the-way` at `a8dfe8a`, not moved.
- Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`). Read it whole;
  read a file it names when the step that names it comes.
- What is reviewed: the return step's commits, the range `d5c80d3..7b85e6d`, against the task and the
  entries the return step writes or corrects. Confirm `git rev-parse HEAD` first.
- The author's report, claims to verify:
  `.runs/task-cycles/reset-hasla/reports/35-return-step-report.md`
- Report path: `.runs/task-cycles/reset-hasla/reports/36-return-review-report.md`; first line `PASS <sha>`,
  `FAIL <sha>` or `questions`.
- Do not change any file in the reviewed worktree. Do not run the full gate.

## Answers of step 4

- Trust boundary: **yes**, `src/server/**`. The range changes no file there; the entries it corrects
  state rules of that boundary, so compare them with `src/server/account-routes.ts`.
- Irreversible operation: **no**.

## What to read

- Frozen task: `.runs/task-cycles/reset-hasla/task.md`: To do 3, rows 2, 3, 6, 15, questions 13 and 15.
- Foundation entries, each whole: D-214, D-218, D-101, D-103, D-116, D-44, and the invariants
  `account-attempt-limits`, `account-session-authorization`.
- Guideline file, whole: `guidelines/coding-account-policy.md`.
- Product files: `src/server/account-routes.ts`, `src/server/account-policy.ts`,
  `src/browser/view/account-screen.ts`.

## Return

Write your report as the method gives, with your reaches and **Searches not found or unclear**. Return
its first line and the path.
