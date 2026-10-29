# Handoff — planner, task `potwierdzenie-adresu`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **planner**, a fresh agent. Your questions go to the orchestrator, never to the
human; you return before any slice is made, and you write no code, test or foundation entry.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\potwierdzenie-adresu`, branch
  `task/potwierdzenie-adresu`, head = base `7a633a7` (`main`, the merge of task 19
  `blokada-konta`). Process pin `.the-way` at `3aee7d9`, not moved by this task.
- Method: `.the-way/task-cycle/plan/SKILL.md` in the worktree (project skill `the-way-plan-task`).
  Read it whole; read a file it names when the step that names it comes. The size script is
  `.the-way/task-cycle/slice_size.py`.
- Frozen task: `.runs/task-cycles/potwierdzenie-adresu/task.md` — read it whole.
- Reviewed spec: `.runs/task-cycles/potwierdzenie-adresu/spec.md` — read it whole; it passed its
  review (`reports/04-spec-rereview-report.md`, PASS) after one revision. The spec binds where it
  settles more than the task; the task binds where they differ.
- Plan path: `.runs/task-cycles/potwierdzenie-adresu/plan.md`; size report
  `.runs/task-cycles/potwierdzenie-adresu/plan-size.md`.
- Report path: `.runs/task-cycles/potwierdzenie-adresu/reports/05-plan-report.md`
- The product's instructions: `AGENTS.md` in the worktree. Do not commit; the plan stays in the
  ignored `.runs/`. Do not run the product's gate (`npm test`); it is the orchestrator's.

## Answers of step 4

- Trust boundary: **yes**. The part map names `src/server/**` as the trust boundary of
  `account-server`. The change adds a route that takes a confirmation token from the network
  without a session, a session-authorized route that triggers a send, an outbound SMTP connection
  to Mikrus Outsider with a credential read from a file, new startup configuration, and a schema
  step on the persistent account database. Every code review of the cycle checks crafted input at
  that boundary — token forms, origin and body guards, header injection into the message, the
  credential and tokens never reaching logs, the container environment or responses.
- Irreversible operation: **yes**. The change carries a schema step of the persistent account
  database `loop2_accounts` on the test server; after it a rollback to an earlier commit refuses
  that database (D-112, D-15). It runs when the human deploys the branch (H4) and when the merge
  deploys `main` (D-11). The cycle prepares it (code, tests on temporary databases, the deploy
  skill's text) and never performs it. No agent deploys, sends real mail through Outsider or
  changes anything on the server (D-12); tests never reach the real Outsider.

## What the plan must carry

- Every item of *To do* 1–16, every row of *Settlements to record* (K1–K7, K9, K10), every
  projected entry the task carries and every foundation entry the spec's *Foundation entries*
  lists. The pin is not moved by this task; no checks were carried by a pin move.
- The guideline work of To do 8, 12 and 13 runs through the project skills
  `the-way-maintain-styleguide`, `the-way-maintain-coding-guidelines` and
  `the-way-maintain-testing-guidelines`; place it in the slices as those skills and the task's
  approval notes (WAY-172) require.
- Both answers of step 4 are **yes**: mark each slice whose files fall in a trust boundary of the
  part map (`src/server/**`, `deploy/**`, `package-lock.json`) or that holds the schema step.
- Base checks failing on `7a633a7` on this machine: `tests/invariants/test_loop2_one_serving_process.py`
  (its `setUpClass` runs `Get-NetTCPConnection -State Listen`, which returns no objects in this
  environment). Everything else of `npm test` passed on the base once `.runs/quality-venv` was
  installed. *Checks* name focused checks only, never a run of the whole gate.
- Real Outsider, the server and deployments stay out of every slice (D-12, step 4); H4 is the
  human's, after the request.

## What to read

Foundation entries, each whole (`foundations/decisions.md`, `foundations/invariants.md`,
`foundations/environment_facts.md`, `foundations/glossary.md`):

- Decisions in play (the task's list): D-05, D-13, D-15, D-17, D-12, D-39, D-44, D-96, D-97, D-99,
  D-104, D-105, D-108, D-109, D-111, D-112, D-117.
- Decisions of the touched parts the design leans on: D-11, D-37, D-40, D-86, D-101, D-102, D-103,
  D-107, D-110, D-114, D-115, D-116, D-137, D-138, D-139, D-33, D-81, D-84.
- Invariants: `email-verification-nonblocking`, `account-mutation-request-guards`,
  `account-startup-configuration`, `account-schema-lifecycle`, `account-database-schema`,
  `account-session-authorization`, `account-client-outcomes`, `account-client-requests`,
  `account-request-transport`, `loop2-host-sharing`, `loop2-one-serving-process`,
  `introduced-npm-vulnerabilities`, `blocked-account-access`, `player-server-session`,
  `unblock-restores-no-session`, `account-attempt-limits`, `account-attempt-tracking`,
  `account-session-storage`, `public-file-access`, `loop2-shared-public-origin`.
- Environment facts: `mikrus-tunnel-outbound-tcp`, `compose-file-secret-permissions`,
  `node-sqlite-database`, `sqlite-wal-concurrency`, `docker-volume-lifecycle`,
  `fetch-origin-header`, `fetch-same-origin-credentials`.
- Glossary: `test server`, `headquarters`, `deployment`, `public address`.
- Part map (`foundations/part_map.md`, short — read whole): entries `account-server`,
  `browser-view`, `deployment`, `build-tools`, `agent-workflow`, `product-foundation` and its
  *External context* (Mikrus Outsider is not yet a partner there).

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-http-application.md`,
`guidelines/coding-database-access.md`, `guidelines/coding-account-policy.md`,
`guidelines/coding-session-store.md`, `guidelines/coding-browser-module.md`,
`guidelines/coding-browser-api-client.md`, `guidelines/styleguide-browser-view.md`,
`guidelines/testing.md`.

Product files the choice depends on (read to design, not to write): `src/server/*.ts` (notably
`database.ts`, `account-routes.ts`, `app.ts`, `configuration.ts`, `main.ts`, `account-block.ts`,
`account-policy.ts`, `session-store.ts`, `transport.ts`), `src/browser/account-api.ts`,
`src/browser/view/app.ts`, `src/browser/view/account-screen.ts`, `src/browser/view/headquarters.ts`,
`src/browser/view/controls/`, `src/browser/kitchen-sink/kitchen-sink.ts`, `tests/http.test.mjs`,
`tests/account-storage.test.mjs`, `tests/startup.test.mjs`, `Dockerfile`, `compose.yaml`,
`deploy/loop2-deploy`, `.claude/skills/loop2-deploy/SKILL.md` and its `references/`.

The task's sources: the frozen task quotes the projected entries and the answers it rests on word
for word. The project definition
`C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md` (approved
2026-10-28, sha256 `3e9c2cc9146b…`) may be searched selectively for a passage the task cites. The
Outsider documentation pages the task's *Context* names may be read on the web; Nodemailer 10's
documentation likewise (its STARTTLS options, `requireTLS`, timeouts) — name each such reach.

Beyond the spec designer's list above, the spec's *Foundation entries* names further entries to
change — among them D-137 and `blocked-account-access`; read each entry it names whole.

## Return

Write the plan, the size report and your report as the method gives, and return your status
(`done`, `done with concerns`, `questions` or `returned`) with the three paths.
