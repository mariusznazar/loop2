# Handoff — spec designer, task `blokada-konta`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **designer** of the spec, a fresh
agent. Your questions go to the orchestrator, never to the human; you return before any plan,
slice or code.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\blokada-konta`, branch
  `task/blokada-konta`, head `ed9da63` (the task branch's first commit moved the-way's pin from
  `574a37b` to `3aee7d9`; base `6540e4c` on `main`).
- Method: `.the-way/task-cycle/spec/SKILL.md` in the worktree. Read it whole; read a file it names
  (`design.md` beside it) when the step that names it comes.
- Variant: you write the spec (designer).
- Frozen task: `.runs/task-cycles/blokada-konta/task.md` — read it whole.
- Spec path: `.runs/task-cycles/blokada-konta/spec.md`
- Report path: `.runs/task-cycles/blokada-konta/reports/01-spec-design-report.md`
- The product's instructions: `AGENTS.md` in the worktree. Do not commit; the spec stays in the
  ignored `.runs/`.

## Answers of step 4

- Trust boundary: **yes**. The part map names `src/server/**` as the trust boundary of
  `account-server`; the change touches the login route (`POST /api/session`), session reads of
  authenticated routes and the database opening, which take in data from the network and from the
  database file, and it adds an owner command that takes an email address from its arguments.
  Every code review of the cycle checks crafted input at that boundary.
- Irreversible operation: **yes**. The change carries the first migration of the persistent account
  database `loop2_accounts` on the test server from schema version 1 to a newer one; after it, a
  rollback to a commit before this task refuses that database (D-112, deploy exit code 8). The
  cycle prepares the migration (code, tests on temporary databases, the deploy skill's text) and
  never performs it: the human deploys the request's commit by hand and blocks and unblocks a test
  account (*Human actions* of the task). Blocking an account with the owner command is likewise
  run only by the human (D-12).

## The open design choice

The task's section *Questions carried to cycle* leaves these four open (quoted word for word from
the frozen task):

> - Jak baza w wersji schematu 1 przechodzi na wersję z blokadą — pierwsze przejście bazy kont z wersji 1 (pytanie 5): nowe brzmienie D-112, niezmienników `account-schema-lifecycle` i `account-database-schema`, które dziś mówią tylko o wersji 1, i reguły „Otwarcie schematu bez utraty danych” (punkty 5 i 8 To do); zadania 20, 16 i 21 dokładają po nim swoje wersje.
> - Jak serwer unieważnia rekordy sesji blokowanego konta — usuwa je z bazy czy trwale oznacza jako nieważne — tak żeby sesja zapisana przez logowanie trwające w chwili blokady też nie dawała dostępu, a odblokowanie nie przywróciło żadnej z nich. Samo odrzucanie sesji przy odczycie po stanie konta nie wystarcza: `player-server-session/1` każe rekord unieważnić (“invalidates that record on logout or account blocking”), a odblokowanie przywróciłoby takie sesje (wiersz 2 *Settlements to record*); sprawdzenie stanu konta przy odczycie może unieważnienie tylko uzupełnić (punkty 2 i 3 To do, `blocked-account-access/1`).
> - Jak logowanie zablokowanego konta liczy się do progów prób z D-102 (punkt 4 To do).
> - Jak polecenie właściciela sięga do bazy obok działającego serwera, przy D-112 “The account server opens one application-owned SQLite connection before readiness” (punkty 1 i 2 To do).

Beside them, the spec settles what the task's rows 1–4 of *Settlements to record* and its four
projected entries need to be written as entries (their wording is the foundation step's, made by
the author; the spec gives the design they rest on).

## What to read

Foundation entries, each whole (`foundations/decisions.md`, `foundations/invariants.md`):

- Decisions in play: D-11, D-12, D-75, D-97, D-99, D-100, D-101, D-102, D-109, D-112, D-114, D-117.
- Decisions of the touched part `account-server` the design leans on: D-07, D-96, D-103, D-104,
  D-106, D-107, D-110, D-111, D-115, D-116, D-37.
- Invariants: `account-session-authorization`, `account-schema-lifecycle`,
  `account-database-schema`, `account-session-storage`, `account-attempt-limits`,
  `account-attempt-tracking`, `account-mutation-request-guards`, `account-client-requests`,
  `account-client-outcomes`, `account-save-durable-storage`, `player-opaque-session-cookie`,
  `player-express-session-sqlite-store`.
- Environment facts (`foundations/environment_facts.md`): `node-sqlite-database`,
  `express-session-store-contract`, `express-session-cookie-lifecycle`, `docker-volume-lifecycle`.
- Part map (`foundations/part_map.md`): entries `account-server`, `browser-view`, `deployment`,
  `agent-workflow`.

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-database-access.md`,
`guidelines/coding-session-store.md`, `guidelines/coding-account-policy.md`,
`guidelines/coding-http-application.md`, `guidelines/coding-browser-api-client.md`,
`guidelines/testing.md`.

Product files the choice depends on (read to design, not to write): `src/server/database.ts`,
`src/server/session-store.ts`, `src/server/account-routes.ts`, `src/server/account-policy.ts`,
`src/server/main.ts`, `src/server/measure-passwords.ts`, `src/browser/account-api.ts`,
`src/browser/view/app.ts`, `tests/account-storage.test.mjs`, `Dockerfile`, `compose.yaml`,
`.claude/skills/loop2-deploy/SKILL.md` and its `references/troubleshooting.md`.

The task's sources: the frozen task quotes the projected entries and the answers it rests on word
for word. The refinement conversation it names
(`C:\Storage\repos\loop2\.runs\project-refinement\blokada-konta.md`) no longer exists (the
directory is empty at the cycle's start); the task's quotations are the source. The project
definition `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md`
(approved 2026-10-28) may be searched selectively for a passage the task cites.

## Return

Write the spec and your report as `design.md` gives, and return your status (`questions` or
`done`) with the two paths.
