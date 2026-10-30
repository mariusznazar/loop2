# Handoff — planner, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **planner**, a fresh agent. Your
questions go to the orchestrator, never to the human; you return before any slice is made and
write no code.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`, head = base `dce2970`. Process pin `.the-way` at `a8dfe8a`, not
  moved by this task, so no checks of a pin move are carried.
- Method: `.the-way/task-cycle/plan/SKILL.md` in the worktree. Read it whole; read a file it names
  (its size script and anything beside it) only when the step that names it comes.
- Frozen task: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md` — read it whole.
- Reviewed spec: `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md` — read it whole. Its
  *Decisions* 10 was written by the orchestrator to settle the re-review's last finding; it binds
  like the rest.
- Spec reviews, for context only: `reports/02-spec-review-report.md`,
  `reports/04-spec-rereview-report.md` (same directory).
- Plan path: `.runs/task-cycles/zapis-stanu-na-serwerze/plan.md`; size report:
  `.runs/task-cycles/zapis-stanu-na-serwerze/plan-size.md`.
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/05-plan-report.md`
- The product's instructions: `AGENTS.md` and `src/browser/AGENTS.md`. Do not commit; do not run
  `npm test` (the gate is the orchestrator's; slices name focused checks only).

## Answers of step 4

- Trust boundary: **yes**. `src/server/**` (part map, `account-server`): routes that take a whole
  saved game state as JSON from the network (up to 64 KiB), authorized by the session alone, with
  the revision check and the version comparison, and a schema step on the persistent account
  database. On the browser side the simulation's load function (`src/browser/sim/saved-game.ts`,
  which the spec makes a trust boundary of `simulation`) refuses a crafted or malformed saved game
  state whole. Mark every slice that touches either place, or the part map's other trust
  boundaries, with the trust-boundary risk.
- Irreversible operation: **yes**. The schema step from version 3 to version 4 of the persistent
  database `loop2_accounts` on the test server; after it, code of `main` from before this task's
  merge refuses the database (D-112). The human runs it by deploying the branch (H1, H2) and the
  merge runs it again (D-11). The cycle prepares it and never performs it. Mark the slice that
  writes the schema step, and the slice that writes the deploy skill's text about it, with that
  risk.

## Human actions in the cycle

H1 and H2 (task, *Human actions*) are the human's, at the blocked draft request after the whole
change and its review; no slice performs them. To do 14 — removing the violated mark of
`account-save-durable-storage` — waits for H2: plan it as work after H2 (outside the slices made
before the request), and name it so in the plan.

## What to propose for each slice's *Read*

Name the foundation entries, guideline files and passages each slice needs. The orchestrator's own
reading for this task — check yours against it and take from it what each slice needs:

- Decisions: D-04, D-07, D-11, D-12, D-15, D-17, D-21, D-28, D-39, D-51, D-53, D-62, D-75, D-91,
  D-96, D-97, D-101, D-104, D-108, D-109, D-112, D-114, D-117, D-132, D-137, D-139, D-156, D-157,
  D-164, D-173; D-02, D-05, D-06, D-35, D-36, D-37, D-44, D-55, D-56, D-102, D-103, D-110, D-129,
  D-130, D-138, D-165, D-167, D-171, D-172, D-81, D-83, D-84, D-77.
- Invariants: `simulation-isolation`, `simulation-inputs`, `content-identifiers`,
  `character-team`, `map-run-repeatability`, `player-map-run-pace`, `copy-save`,
  `saved-program-edit`, `account-server-express-http`, `loop2-api-error-route`,
  `account-save-durable-storage`, `account-save-sqlite-access`, `loop2-shared-public-origin`,
  `account-session-authorization`, `account-mutation-request-guards`, `account-request-transport`,
  `account-schema-lifecycle`, `account-database-schema`, `account-session-storage`,
  `account-client-requests`, `account-client-outcomes`, `blocked-account-access`,
  `player-server-session`, `player-express-session-sqlite-store`, `email-confirmation-link`,
  `browser-view-framework`.
- Environment facts: `node-sqlite-database`, `sqlite-wal-concurrency`, `docker-volume-lifecycle`,
  `fetch-origin-header`, `fetch-same-origin-credentials`, `samesite-strict-cookie`,
  `cgroup-memory-accounting`.
- Glossary: `map run`, `manual map run`, `headquarters`, `copy`, `program`, `completion`,
  `blocked account`, `archetype`, `Understanding`, `game minute`, `deployment`, `test server`.
- Part map: `foundations/part_map.md` (short).
- Guidelines: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`,
  `guidelines/coding-content-data.md`, `guidelines/coding-browser-module.md`,
  `guidelines/coding-browser-api-client.md`, `guidelines/coding-http-application.md`,
  `guidelines/coding-database-access.md`, `guidelines/styleguide-browser-view.md`,
  `guidelines/testing.md`; for browser-view files also `src/browser/AGENTS.md`.

The foundation step (`.the-way/task-cycle/skill/foundation_step.md`) writes the entries the task
carries — the projected entries of *Decisions in play*, the rows of *Settlements to record* and
the spec's *Foundation entries* — as the plan's *Foundation entries*, before slice 1, by the
element skills named in the product's `AGENTS.md`. The new kind's exemplar and its guidelines
(To do 12) and the guideline changes of spec *Decisions* 10 go through their maintain skills where
a slice makes them; a new guideline meaning the human must approve (WAY-172) is a question for the
foundation step to name, not a slice's choice.

## Return

Write `plan.md`, `plan-size.md` and your report as the method gives, and return your status
(`done`, `done with concerns`, `questions` or `returned`) with the three paths.
