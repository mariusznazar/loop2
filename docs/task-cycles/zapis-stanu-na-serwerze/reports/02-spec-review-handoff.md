# Handoff — spec reviewer, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **reviewer** of the spec, a fresh
agent that did not write it. Your questions go to the orchestrator, never to the human; you return
`PASS` or `FAIL` before any plan or code.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`, head = base `dce2970`. Process pin `.the-way` at `a8dfe8a`.
- Method: `.the-way/task-cycle/spec/SKILL.md` in the worktree. Read it whole; read a file it names
  (the review file beside it included) only when the step or variant that names it comes.
- Variant: you review the spec (reviewer).
- Frozen task: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md` — read it whole.
- Spec: `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md` — read it whole.
- Designer's report: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/01-spec-design-report.md`.
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/02-spec-review-report.md`
- The product's instructions: `AGENTS.md` and `src/browser/AGENTS.md` in the worktree. Change no
  file other than your report; do not commit; do not run `npm test`.

## Answers of step 4

- Trust boundary: **yes**. The part map names `src/server/**` as the trust boundary of
  `account-server`. The change adds routes that take a whole saved game state as JSON from the
  network (up to 64 KiB), authorized by the session alone, with a check that the browser saw the
  last save and a version comparison, and a schema step on the persistent account database. On the
  browser side, the saved game state the server returns is data from outside the simulation: the
  simulation's load function must refuse a crafted or malformed one whole. Check that the spec
  meets crafted input at both places — oversized, compressed, non-JSON, structurally invalid
  bodies, another account's identifier in the request, missing or forged session, stale or forged
  conflict token, a lower or non-numeric version, and saved states with wrong shapes, unknown
  archetypes, huge numbers, prototype keys and deep nesting.
- Irreversible operation: **yes**. The schema step from version 3 to version 4 of the persistent
  account database `loop2_accounts` on the test server; after it, code of `main` from before this
  task's merge refuses that database (D-112), so a rollback across it cannot start. It runs when
  the human deploys the branch (H1, H2) and when the merge deploys `main` (D-11). The cycle prepares
  it and never performs it; check that the spec only prepares it.

## Choices the orchestrator accepted provisionally

The designer settled two readings itself (report, *Questions sent and their answers*); the
orchestrator accepted both as autonomous choices, which you may still find wrong:

- the one-time sentences of a refused load stand above the game, as a one-time notice of the
  email-confirmation notice's kind;
- the new game is saved at once after a refused load.

## What to read

The same selection the designer had:

- Decisions, each whole (`foundations/decisions.md`): D-04, D-07, D-11, D-12, D-15, D-17, D-21,
  D-28, D-39, D-51, D-53, D-62, D-75, D-91, D-96, D-97, D-101, D-104, D-108, D-109, D-112, D-114,
  D-117, D-132, D-137, D-139, D-156, D-157, D-164, D-173; and D-02, D-05, D-06, D-35, D-36, D-37,
  D-44, D-55, D-56, D-102, D-103, D-110, D-129, D-130, D-138, D-165, D-167, D-171, D-172, D-81,
  D-83, D-84, D-77.
- Invariants, each whole: `simulation-isolation`, `simulation-inputs`, `content-identifiers`,
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
- Part map (`foundations/part_map.md`, read whole).
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`,
  `guidelines/coding-content-data.md`, `guidelines/coding-browser-module.md`,
  `guidelines/coding-browser-api-client.md`, `guidelines/coding-http-application.md`,
  `guidelines/coding-database-access.md`, `guidelines/styleguide-browser-view.md`,
  `guidelines/testing.md`.
- Product files the spec rests on, as you need them to check it: `src/browser/sim/types.ts`,
  `src/browser/sim/game.ts`, `src/browser/sim/programs.ts`, `src/browser/sim/data/`,
  `src/browser/account-api.ts`, `src/browser/main.ts`, `src/browser/view/app.ts`,
  `src/browser/view/game-view.ts`, `src/browser/view/clock.ts`, `src/server/database.ts`,
  `src/server/account-routes.ts`, `src/server/app.ts`, `src/server/transport.ts`,
  `.claude/skills/loop2-deploy/` and the tests beside them.

The project definition `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md`
(sha256 `fda97782458d…`) may be searched selectively for a passage the task cites; the Fetch
standard and MDN may be read to check the spec's claims about `keepalive` and `visibilitychange` —
name each such reach.

## Return

Write your report as the method gives, with `PASS` or `FAIL` as its first line, and return that
line, the report path and a one-line summary of the findings.
