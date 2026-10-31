# Handoff — planner, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **planner**, a fresh agent. Your
questions go to the orchestrator, never to the human; you return before any slice is made, and you
write no code, test or foundation entry.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\reset-hasla`, branch
  `task/reset-hasla`, head = base `95de83b`. Process pin `.the-way` at `a8dfe8a`, not moved by this
  task; no checks were carried by a pin move.
- Method: `.the-way/task-cycle/plan/SKILL.md` in the worktree (project skill `the-way-plan-task`).
  Read it whole; read a file it names when the step that names it comes. The size script is
  `.the-way/task-cycle/slice_size.py`.
- Frozen task: `.runs/task-cycles/reset-hasla/task.md` — read it whole.
- Reviewed spec: `.runs/task-cycles/reset-hasla/spec.md` — read it whole; it passed its review
  (`reports/04-spec-rereview-report.md`, PASS) after one revision. The spec binds where it settles
  more than the task; the task binds where they differ.
- Plan path: `.runs/task-cycles/reset-hasla/plan.md`; size report
  `.runs/task-cycles/reset-hasla/plan-size.md`.
- Report path: `.runs/task-cycles/reset-hasla/reports/05-plan-report.md`
- The product's instructions: `AGENTS.md` in the worktree. Do not commit; the plan stays in the
  ignored `.runs/`. Do not run the product's gate (`npm test`); it is the orchestrator's.
- The quality tools stand in `.runs/quality-venv`; `node_modules` is installed.

## Answers of step 4

- Trust boundary: **yes**. `src/server/**` (part map, `account-server`). Two new routes take data
  from the network without a session. Every code review of the cycle checks crafted input at that
  boundary: token forms, origin and body guards, account enumeration through content or time,
  tokens and links never reaching logs, a link of another kind, a blocked account, a login in
  progress.
- Irreversible operation: **no**. The reviewed spec needs no schema step; its reviewer checked that
  in the code. No agent deploys, sends real mail through Outsider or changes anything on the server
  (D-12); tests never reach the real Outsider.

## What the plan must carry

- Every item of *To do* 1–14, every row of *Settlements to record* (1–19), every projected entry
  the task carries and every foundation entry the spec's *Foundation entries* lists.
- To do 11 goes through the skill `the-way-maintain-styleguide` and To do 14 through
  `the-way-maintain-testing-guidelines`; every foundation entry through its element's project skill
  (`the-way-record-decision`, `the-way-record-invariant`, `the-way-record-environment-fact`,
  `the-way-record-glossary-term`, `the-way-update-part-map`).
- To do 13 is the human's action H1, in the cycle, before the merge, outside the window of task 17.
  No slice performs it; the plan prepares what the repository allows and names what H1 will need.
- Testing rules that bind the plan: `guidelines/testing.md`, whole. New invariants need tests that
  cite them by the line `invariant: <identifier>`; an invariant's test is seen to fail before it
  passes (the author reports both runs).
- The screens the change adds are checked in the kitchen-sink page and by the styleguide's order of
  work; the plan names how each slice with a user interface shows its states.

## What to read

Foundation entries, each whole, as far as dividing the work needs them: the identifiers the task's
*Decisions in play* names and those the spec's *Foundation entries* lists.

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-http-application.md`,
`guidelines/coding-database-access.md`, `guidelines/coding-account-policy.md`,
`guidelines/coding-session-store.md`, `guidelines/coding-password-hashing.md`,
`guidelines/coding-mail-sending.md`, `guidelines/coding-browser-module.md`,
`guidelines/coding-browser-api-client.md`, `guidelines/styleguide-browser-view.md`,
`guidelines/testing.md`.

Part map (`foundations/part_map.md`). Product files as far as dividing the work needs them; the
spec's units table names them.

## Return

Write the plan, its size report and your report as the method gives, and return your status with
the paths.
