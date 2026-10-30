# Handoff — spec designer, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **designer** of the spec, a fresh
agent. Your questions go to the orchestrator, never to the human; you return before any plan,
slice or code.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`, head = base `dce2970` (`main`, the merge of task 9 `plomyk`).
  Process pin `.the-way` at `a8dfe8a`, not moved by this task.
- Method: `.the-way/task-cycle/spec/SKILL.md` in the worktree. Read it whole; read a file it names
  (`design.md` beside it included) only when the step or variant that names it comes.
- Variant: you write the spec (designer).
- Frozen task: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md` — read it whole. It is long; its
  *Questions to settle*, *Context*, *Decisions in play* and *Settlements to record* hold the answers
  the human gave and the entries the design rests on.
- Spec path: `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md`
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/01-spec-design-report.md`
- The product's instructions: `AGENTS.md` in the worktree, and `src/browser/AGENTS.md`. Do not
  commit; the spec stays in the ignored `.runs/`. Do not run the product's gate (`npm test`); it is
  the orchestrator's.

## Answers of step 4

- Trust boundary: **yes**. The part map names `src/server/**` as the trust boundary of
  `account-server`. The change adds routes that take a whole saved game state as JSON from the
  network (up to 64 KiB), authorized by the session alone, with a check that the browser saw the
  last save and a version comparison, and a schema step on the persistent account database. On the
  browser side, the saved game state the server returns is data from outside the simulation: the
  simulation's load function must refuse a crafted or malformed one whole. Every code review of the
  cycle checks crafted input at both places.
- Irreversible operation: **yes**. The change carries the schema step from version 3 to version 4
  of the persistent account database `loop2_accounts` on the test server; after it, code of `main`
  from before this task's merge refuses that database (D-112), so a rollback across it cannot
  start. It runs when the human deploys the branch (H1, H2) and when the merge deploys `main`
  (D-11). The cycle prepares it (code, tests on temporary databases, the deploy skill's text) and
  never performs it. No agent deploys or changes anything on the server (D-12).

## The open design choice

The task's section *Questions carried to cycle* leaves these open (quoted word for word from the
frozen task):

> - Jak przeglądarka rozpoznaje, że ponowne zalogowanie po wygaśnięciu sesji jest na to samo konto (np. identyfikator konta z odpowiedzi `GET /api/account`) — wybór cyklu w granicach D-109.
> - Ścieżki, metody i kody odmowy tras zapisu oraz ich klient w przeglądarce — wybór cyklu w granicach D-104, D-108, D-109 i D-117.
> - Czy niezmiennik `account-mutation-request-guards` (“Every state-changing account route refuses … a non-JSON, compressed, oversized or structurally invalid body …”) obejmuje trasę zapisu i jaki rozmiar jest dla niej „oversized” (punkt 4) — wybór cyklu w granicach D-104 po jej zmianie.
> - Gdzie stoi numer wersji kształtu zapisu i co pilnuje, żeby zmiana kształtu stanu gry podbiła ten numer — wybór cyklu w granicach `save-version/1`; skąd serwer zna numer wersji przyjmowanego zapisu (osobne pole żądania albo kolumna, pytanie 4) — wybór cyklu w granicach D-07.
> - Czym przeglądarka pokazuje serwerowi, że widziała ostatni zapis (pytanie 3) — wybór cyklu.
> - Jak wysłać ostatni zapis przy zamykaniu albo ukrywaniu karty (pytanie 1) — wybór cyklu w granicach D-104 i D-117 oraz limitu treści żądań wysyłanych przy zamykaniu strony (`keepalive`, `sendBeacon`), który przy zapisie do 64 KiB może nie przepuścić ostatniego zapisu — limit do sprawdzenia w standardzie Fetch; w repozytorium nie ma o nim faktu środowiskowego.
> - Jak często gra ponawia nieudany zapis (pytanie 2) — wybór cyklu.
> - Kolejność zdania o nieudanym zapisie i wiersza niepotwierdzonego adresu (D-157), gdy oba stoją w nagłówku — wybór cyklu w granicach `guidelines/styleguide-browser-view.md`.
> - *Scope* wpisów, które zapisuje to zadanie, stoi w definicji jako `TODO`; cykl ustala je z mapy części.

Beside them, the spec gives the design that the task's *Settlements to record* (rows 1–10) and its
projected entries rest on, where a row leaves the mechanism open — among others: the shape of the
saved game state and the simulation's load function that returns a game state or a refusal (row
10, To do 11, change of D-04 with its second sentence judged), the table of saved game states in
schema version 4 and the migration step that keeps accounts, sessions, links and their values (To
do 1, change of D-112, `account-database-schema`, `account-schema-lifecycle`), the moments of
automatic saving and the 30-second rhythm during a running map run with its clock (row 1), the
browser's save state machine — saving, failed with retry, too large, conflict with load, older code
stopped, session gone with the unsaved state kept in page memory — and how each refusal reaches
the player and "Wyloguj" (rows 2–6, To do 7–10), the order in which the game is built after
sign-in or reload only once the server answered the load (row 7, change of D-96), the paused
landing on a loaded map run and the screen after its end (row 8, To do 6, D-96 and D-156 projected
changes, the D-53 rationale correction), the body limit of the save route and the per-player stored
limit (row 9, change of D-104), how the server compares the version of a received save without
computing the game (D-07), and the first file of the new kind of saved-game code, its kind
guidelines and its row in `guidelines/coding.md` (To do 12, D-28, WAY-216; its boundary against
`simulation-module`). The wording of the foundation entries is the foundation step's, made later
by the author; the spec gives the design they rest on. Where the task and the foundation already
settle a point, the spec cites them and does not reopen it.

## What to read

Foundation entries, each whole (`foundations/decisions.md`, `foundations/invariants.md`,
`foundations/environment_facts.md`, `foundations/glossary.md`):

- Decisions in play (the task's list): D-04, D-07, D-11, D-12, D-15, D-17, D-21, D-28, D-39, D-51,
  D-53, D-62, D-75, D-91, D-96, D-97, D-101, D-104, D-108, D-109, D-112, D-114, D-117, D-132,
  D-137, D-139, D-156, D-157, D-164, D-173.
- Decisions of the touched parts the design leans on: D-02, D-05, D-06, D-35, D-36, D-37, D-44,
  D-55, D-56, D-102, D-103, D-110, D-129, D-130, D-138, D-165, D-167, D-171, D-172, D-81, D-83,
  D-84, D-77.
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
- Part map (`foundations/part_map.md`, short — read whole).

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`,
`guidelines/coding-content-data.md`, `guidelines/coding-browser-module.md`,
`guidelines/coding-browser-api-client.md`, `guidelines/coding-http-application.md`,
`guidelines/coding-database-access.md`, `guidelines/styleguide-browser-view.md`,
`guidelines/testing.md`.

Product files the choice depends on (read to design, not to write): `src/browser/sim/types.ts`,
`src/browser/sim/game.ts`, `src/browser/sim/programs.ts`, `src/browser/sim/data/`,
`src/browser/account-api.ts`, `src/browser/main.ts`, `src/browser/view/app.ts`,
`src/browser/view/game-view.ts`, `src/browser/view/clock.ts`, `src/browser/view/account-screen.ts`,
`src/browser/view/email-status.ts`, `src/browser/view/email-confirmation.ts`,
`src/browser/view/status-row.ts`, `src/server/database.ts`, `src/server/account-routes.ts`,
`src/server/app.ts`, `src/server/transport.ts`, `src/server/account-block.ts`, `tests/http.test.mjs`,
`tests/account-storage.test.mjs`, `tests/account-api.test.mjs`, `tests/view/`, `tests/sim/`,
`tests/deploy/`, `.claude/skills/loop2-deploy/SKILL.md` and its `references/`.

The task's sources: the frozen task quotes the projected entries and the answers it rests on word
for word. The project definition
`C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md` (approved
2026-10-29, sha256 `fda97782458d…`, fingerprint 934f56c6) may be searched selectively for a
passage the task cites. The Fetch standard (the `keepalive` body limit) and MDN pages on
`sendBeacon`, `visibilitychange` and `pagehide` may be read on the web — name each such reach. The
reference game loop's save code (`C:\Storage\repos\loop`, `src/sim/`, commit `cdc7c0d` as the task's
*Context* cites) may be read as an example only.

## Return

Write the spec and your report as `design.md` gives, and return your status (`questions` or
`done`) with the two paths.
