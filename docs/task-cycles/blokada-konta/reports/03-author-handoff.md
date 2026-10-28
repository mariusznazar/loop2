# Handoff — one author, task `blokada-konta`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **one author** of the change, a fresh
agent: you make the whole change, with its foundation step, and return before review. Your
questions go to the orchestrator, never to the human. Do not run the product's full gate
(`npm test` without arguments) — that run is the orchestrator's; run the focused checks of what
you change.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\blokada-konta`, branch
  `task/blokada-konta`, head `ed9da63`. The branch's first commit `ed9da63` moved the-way's pin
  from `574a37b` to `3aee7d9`; base `6540e4c` on `main`. Never reset, rewrite or amend `ed9da63`.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it
  names, one beside it included, only when the step or variant that names it comes.
- Variant: **the whole change as the one author**.
- Frozen task: `.runs/task-cycles/blokada-konta/task.md` — read it whole.
- Reviewed spec: `.runs/task-cycles/blokada-konta/spec.md` (review `PASS`,
  `reports/02-spec-review-report.md`) — read it whole; it binds.
- Foundation step: `.the-way/task-cycle/skill/foundation_step.md` — read it whole when you write
  the entries; the skill of an element when you write an entry of that element. Use this
  product's project skills (`the-way-record-decision`, `the-way-record-invariant`,
  `the-way-record-glossary-term`, `the-way-record-environment-fact`, `the-way-update-part-map`;
  for To do 7 and 8 `the-way-maintain-testing-guidelines` and
  `the-way-maintain-coding-guidelines`), each of which reads its source in `.the-way`; never a
  personal skill of that name.
- Report path: `.runs/task-cycles/blokada-konta/reports/03-author-report.md`
- Checks the move of the pin carried: none (the gate on `ed9da63` fails only where the base fails).
- The product's instructions: `AGENTS.md` in the worktree; it sends you to `guidelines/coding.md`
  before code, `guidelines/testing.md` before tests, `guidelines/styleguide-browser-view.md` before
  a file of `browser-view`, and `src/browser/AGENTS.md` in `src/browser/`. Commit messages follow
  the repository's form (`<type>: :<gitmoji>: <English text>`, see `git log`); stage files by
  path, never `git add -A` or `git add .`.

## Answers of step 4

- Trust boundary: **yes**. The part map names `src/server/**` the trust boundary of
  `account-server`; the change touches the login route (`POST /api/session`), the session reads of
  authenticated routes and the database opening, which take in data from the network and from the
  database file, and adds an owner command taking an email address from its arguments. Every code
  review checks crafted input at that boundary.
- Irreversible operation: **yes**. The change carries the first migration of the persistent
  account database `loop2_accounts` on the test server from schema version 1; after it, a rollback
  to a commit before this task refuses that database (D-112, deploy exit code 8). The change
  prepares the migration — code, tests on temporary databases, the deploy skill's text — and never
  performs it. You never deploy, never run anything on the server or in the `loop2` container,
  never open the server's database (D-12); the human deploys the request's commit and blocks and
  unblocks a test account.

## Notes from the spec's review (information, not findings)

Quoted word for word from `reports/02-spec-review-report.md`, § "Notes that are not findings":

> - Decision 2 says a guarded write "fails as an unknown account's write fails today ('Session
>   cannot be replaced' …)". Today an unknown account's insert fails on the foreign key, with
>   SQLite's own error, not with "Session cannot be replaced" (`src/server/database.ts:177`–`:195`).
>   Both reach the Store's callback and end in 503, so the behaviour the spec relies on holds.
> - In the race the spec accepts (block committed during the password check, no re-read),
>   `ticket.succeed()` runs before the guarded write refuses, so that one attempt clears the
>   address's email failure history, unlike Decision 3's rule for a blocked login. It concerns an
>   account that cannot sign in anyway, and the re-read the spec leaves to the maker removes it.
> - *Foundation entries* lists the part map as unchanged. That holds if the command's tests go into
>   files the part map already claims (for example `tests/account-storage.test.mjs`,
>   `tests/http.test.mjs`); a new test file under `tests/` needs a part map entry, which
>   `foundation_check.py` will report.

## What to read

Foundation entries, each whole (`foundations/decisions.md`, `foundations/invariants.md`,
`foundations/environment_facts.md`, `foundations/part_map.md`, `foundations/glossary.md`):

- Decisions in play: D-11, D-12, D-75, D-97, D-99, D-100, D-101, D-102, D-109, D-112, D-114, D-117.
- Decisions of `account-server` the change leans on: D-07, D-37, D-96, D-103, D-104, D-106, D-107,
  D-110, D-111, D-115, D-116; of testing that shape the tests: D-77, D-78, D-81, D-83, D-84, D-85.
- Invariants: `account-session-authorization`, `account-schema-lifecycle`,
  `account-database-schema`, `account-session-storage`, `account-attempt-limits`,
  `account-attempt-tracking`, `account-mutation-request-guards`, `account-client-requests`,
  `account-client-outcomes`, `account-save-durable-storage`, `player-opaque-session-cookie`,
  `player-express-session-sqlite-store`, `loop2-one-serving-process`.
- Environment facts: `node-sqlite-database`, `express-session-store-contract`,
  `express-session-cookie-lifecycle`, `docker-volume-lifecycle`.
- Part map entries: `account-server`, `browser-view`, `deployment`, `agent-workflow`,
  `product-foundation`.

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-database-access.md`,
`guidelines/coding-session-store.md`, `guidelines/coding-account-policy.md`,
`guidelines/coding-http-application.md`, `guidelines/coding-browser-api-client.md`,
`guidelines/testing.md`, `guidelines/styleguide-browser-view.md`; and `src/browser/AGENTS.md`.

The task's projected entries and answers are quoted word for word in the frozen task. Its source
`C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md` (approved
2026-10-28) may be searched selectively for the passage a projected entry cites; the refinement
conversation the task names no longer exists. Read nothing outside the worktree beyond that, and
write nothing outside it.

## Return

Write your report as the method gives and return: status, commits, a one-line check result
naming what failed or did not run, and the report's path.
