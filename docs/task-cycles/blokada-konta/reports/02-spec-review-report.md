PASS

# Report — spec review, task `blokada-konta`

- Spec reviewed: `.runs/task-cycles/blokada-konta/spec.md`
- Against: the frozen task `.runs/task-cycles/blokada-konta/task.md` (whole), the designer's report
  `01-spec-design-report.md`, the foundation entries and guidelines the handoff names, and the
  product files the choice depends on, at worktree head `ed9da63`.
- Method: `.the-way/task-cycle/spec/SKILL.md`, review variant (`review.md`).

## Findings

None. No requirement of the task is dropped or changed, the spec invents no behaviour that matters
to the build, it contradicts neither the task, the foundation as it proposes to change it, nor
itself, and no open point would make a wrong guess costly.

## What was checked

- **Coverage of the task.** To do 1–8, the acceptance criterion, the four *Settlements to record*,
  the three projected entries this task writes (the fourth, "Who can create and use a player
  account?", stays with task 16, and the spec rightly does not write it), questions 1–7 and the
  *Out of scope* line all map to a goal, a decision, a unit or a foundation entry of the spec.
- **The four carried questions are settled.** (1) Migration: one ordered list of steps in the
  existing `BEGIN IMMEDIATE` transaction, the rule for tasks 20, 16 and 21 stated. (2)
  Invalidation: deletion of the account's session rows in the blocking transaction, a guard in
  the same statement as the session insert, and `sessionAccount` as the supplement the task
  allows; unblocking has nothing to revive, so settlement row 2 holds. (3) Thresholds:
  `release()` for a blocked login with the correct password, `fail()` for a wrong one, admission
  (email lock) unchanged and first. (4) Connection: a second, short-lived `AccountDatabase` in a
  separate process, with D-112's wording named as changing.
- **Decision 2 against the code.** `src/server/app.ts` configures `express-session` with
  `resave: false`, `saveUninitialized: false`, `rolling: true`, so `store.set` (→ `saveSession`)
  runs only for a modified session — the login and registration paths through `establishSession`
  — while ordinary requests go through `touch` (→ `renewSession`, which updates existing rows
  only). The guarded insert therefore covers every way a blocked account's session row could be
  written again. A guarded write that stores nothing reaches the Store's callback, and
  `establishSession` (`src/server/account-routes.ts:109`) destroys the session and answers 503
  `session-unavailable` without a cookie, as the spec says.
- **Decision 3 against the code and guidelines.** The login route's order
  (`src/server/account-routes.ts:262`–`:303`) admits before the account read and the awaited
  `verifyPassword`, so settling a blocked login after the password work keeps
  `account-attempt-limits` and the account-policy rule "Rezerwacja przed pracą hasła, rozliczenie
  po jej końcu". The browser client (`src/browser/account-api.ts:96`–`:110`) keys the server
  message on the code, not on the status, so a 403 with `account-blocked` on the list reaches the
  form's warning (`src/browser/view/account-screen.ts`, `send`); the transport refusal, also 403,
  carries no code and stays apart.
- **Decision 4 against the image.** `Dockerfile` sets `WORKDIR /app` and `USER node` and copies
  `dist/`; `tsconfig.server.json` builds every `src/server/**/*.ts` into `dist/server/`;
  `compose.yaml` gives the container `LOOP2_DATABASE_PATH=/app/data/accounts.sqlite`, which
  `docker exec` inherits. The command line the spec gives therefore resolves in the running
  container.
- **Migration.** SQLite's adding of a non-null column requires a non-null default, so code of the
  previous commit still running beside a migrated database (it inserts accounts by explicit
  column list) is not broken by the step; the existing test that uses version 2 as "unknown" is
  named as changing for a changed requirement; `tests/startup.test.mjs` uses 99 and stays valid.
- **Deploy skill.** `.agents/skills/loop2-deploy/` holds `SKILL.md` and
  `references/troubleshooting.md`, the copies the units table names; the troubleshooting sentence
  To do 6 quotes is at § „Rollback and the accounts”.

## Notes that are not findings

Recorded so the maker is not surprised; none changes the design.

- Decision 2 says a guarded write "fails as an unknown account's write fails today ('Session
  cannot be replaced' …)". Today an unknown account's insert fails on the foreign key, with
  SQLite's own error, not with "Session cannot be replaced" (`src/server/database.ts:177`–`:195`).
  Both reach the Store's callback and end in 503, so the behaviour the spec relies on holds.
- In the race the spec accepts (block committed during the password check, no re-read),
  `ticket.succeed()` runs before the guarded write refuses, so that one attempt clears the
  address's email failure history, unlike Decision 3's rule for a blocked login. It concerns an
  account that cannot sign in anyway, and the re-read the spec leaves to the maker removes it.
- *Foundation entries* lists the part map as unchanged. That holds if the command's tests go into
  files the part map already claims (for example `tests/account-storage.test.mjs`,
  `tests/http.test.mjs`); a new test file under `tests/` needs a part map entry, which
  `foundation_check.py` will report.

## Reaches beyond the dispatch

- `src/server/app.ts` — search for the `session(` options; to see whether `store.set` runs
  outside login (Decision 2).
- `src/server/configuration.ts`, lines 80–145 — how the server validates `LOOP2_DATABASE_PATH`
  and opens the database, against Decision 4.
- `src/browser/view/account-screen.ts`, lines 140–195 — that a refusal's message goes to the
  form's warning whatever the status (Decision 3).
- `tsconfig.server.json`, `package.json` (scripts) — that the new entry point is built to
  `dist/server/`.
- `tests/account-storage.test.mjs` lines 160–230, `tests/deploy/test_account_storage.py` lines
  90–140, and a search of `tests/` for `user_version`, `table_info`, `sqlite_schema` — which
  existing tests depend on the schema version or layout.
- `tests/account-api.test.mjs` — search for `deepEqual`/`refusalCodes`; whether the code list is
  fixed by a test.
- `foundations/invariants.md` — `loop2-one-serving-process`, whole; whether a second process in
  the container conflicts with it (it listens on nothing, so no).
- `.agents/skills/loop2-deploy/` — directory listing; that the copies exist.
- `.claude/skills/loop2-deploy/SKILL.md`, § „Agent or human” — that the agent may not run the
  command (D-12).
