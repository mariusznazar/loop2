# Handoff — slice 2, executor

You are the executor of slice 2 of a plan, in a task cycle of the loop2 repository run by an orchestrator. The person who requested the cycle delegated intermediate choices to the orchestrator; your questions go to the orchestrator, never to the human, and no answer is the human's approval.

- Worktree (work from its root): `the task's worktree`, branch `task/programy-ze-starych-zapisow`; base of this slice: `4e1decb267358d61c1e0258209f4d09bf366a2e8` (HEAD when this handoff was written).
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`), variant "a slice, or the retry of a slice" (the-way pinned at `55afa8e57aa1b83c77108576a36642722e0dda15`). Read the `SKILL.md` whole and a file it names only when the step or variant that names it comes. For a review: `.the-way/task-cycle/review/SKILL.md` (`the-way-review-change`).
- Frozen task: `docs/task-cycles/programy-ze-starych-zapisow/task.md`; reviewed spec: `docs/task-cycles/programy-ze-starych-zapisow/spec.md`; plan: `docs/task-cycles/programy-ze-starych-zapisow/plan.md`. Report path: `docs/task-cycles/programy-ze-starych-zapisow/reports/slice-2-executor-report.md`.
- The cycle's answers at start: trust boundary yes (`src/server/**`, `src/browser/sim/saved-game.ts`, and by the spec the new `src/browser/sim/previous-programs.ts`; every review checks crafted input there); irreversible operation no (the schema step only adds; granting the privilege is a human's command); reserved choice none; open design choice settled by the reviewed spec. D-209 and D-213 stay unchanged. The foundation entries of the change are already written and committed (commit `809fbf6b`); the entry labels E1–E24 of the plan name them: E1 D-206, E2 D-104, E3 D-109, E4 D-112, E5 D-210, E6 D-167/D-169, E7 D-354, E8 D-355, E9 D-393, E10 D-394, E11 D-395, E12 D-396, E13 `save-version`, E14 `account-client-outcomes`, E15 `account-session-authorization`, E16 `account-mutation-request-guards`, E17 `player-save-isolation`, E18 `account-schema-lifecycle` and `account-database-schema`, E19 `previous-save-slot` (new invariant), E20 `previous-save-programs-reader` (new invariant), E21 glossary "previous save", E22 glossary "previous-save privilege", E23 the part map, E24 D-44. Where the foundation entries and the spec seem to differ, the spec binds the code and you name the difference in your report.
- Where it applies to this stage: a check named below is run by you with its command and exit code in the report; no run of the product's gate (`npm test` without a file) and no `foundation_check.py` — the orchestrator runs those (one expected error of the foundation check stands until slice 6 creates `src/browser/sim/previous-programs.ts`).
- Commit with explicit `git add <paths>`, never `git add -A`; messages in English in the style of this repository's `git log`; `git commit -F <file>` where a message holds quotes.

## The slice's section of the plan, copied word for word

### Slice 2 — The routes: the previous save, the reset and the privilege in the account body

- **Goal:** the account API answers the two new routes and every account body carries the privilege. In `src/server/account-routes.ts`, from decision 1 of the spec: both paths go into the router's table of paths, so each answers `Cache-Control: no-store`, the transport check and the 503 of a server without accounts like every account route. **`GET /api/previous-saved-game`**: after the transport check, the session (no session, or a blocked account: 401 `unauthenticated`), then the privilege read at that moment (without it 403 with the code `previous-save-forbidden`, whatever the slot holds), then the read; the answer is JSON with one key `previous`, `null` where the account has none, otherwise an object with exactly `version` and `game`, the stored text embedded as it is, as `GET /api/saved-game` does, and no revision; it reads no input. **`POST /api/saved-game-reset`**: a state-changing route under the mutation guards with the 16 KiB limit; the body is an object with no field (any field: 400 `invalid-request`); then the session (401 `unauthenticated`); then the database's reset write: blocked answers 401 `unauthenticated`, no privilege 403 `previous-save-forbidden`, a moved save 204 with no body and the business event `saved-game-reset` with the account's identifier, nothing to move 204 with no body and no event. **The account body** of `GET /api/account`, the login and the registration gains the boolean `previousSaveAllowed` and nothing about the slot. The guidelines change with it: `guidelines/coding.md` gains the event `saved-game-reset` in *Logging scope*, and `guidelines/testing.md` gains the rows of the two routes in the table of *Trust boundaries* (the line `src/server/`, with the case titles written here) and in the table of who may do what. Tests, the failing ones first, in `tests/http.test.mjs` on the real HTTP and SQLite as its neighbours are, carrying the markers of E15, E17 and E19: the existing expectations of account bodies gain the new field; the list of unconfigured routes answers 503 for both; no session, a forged or removed session and a blocked account get JSON 401 on both and change nothing; an account without the privilege gets 403 on both, with whatever its slot holds, and its slot and current save stay; a privileged account reads `null` and then the document of its slot; a save of a higher version fills the slot and the route returns it; the reset moves the save, answers 204, a second reset answers 204 and changes nothing, and a card based on a revision other than 0 then gets the conflict of D-209; a body with a field on the reset is 400; the event line of the reset has the account's identifier and nothing else, and the existing test of business events lists it; no request names an account. In `tests/transport.test.mjs` the reset route joins the state-changing routes under the guards: refused requests change nothing and the transport check stands before the session.
- **Change:** `src/server/account-routes.ts` · `tests/http.test.mjs` · `tests/transport.test.mjs` · `guidelines/coding.md` · `guidelines/testing.md`
- **Read:** `docs/task-cycles/programy-ze-starych-zapisow/task.md:26-31` To do · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:6-10` Words used and Intent · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:30-41` Constraints · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:45-112` 1. The HTTP contract, 2. Where the previous save moves, and the revision, and 3. Which saves move · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:166-176` 7. Units and their interfaces · `foundations/decisions.md:17-38` D-02 · `foundations/decisions.md:2056-2068` D-104 · `foundations/decisions.md:2123-2135` D-109 · `foundations/decisions.md:2870-2889` D-137 · `foundations/decisions.md:3883-3904` D-202 · `foundations/decisions.md:3922-3954` D-204 · `foundations/decisions.md:4096-4139` D-209 · `foundations/decisions.md:4140-4166` D-210 · `foundations/invariants.md:718-727` account-session-authorization · `foundations/invariants.md:728-737` account-mutation-request-guards · `foundations/invariants.md:988-997` player-save-isolation · `foundations/invariants.md:858-867` blocked-account-access · `foundations/invariants.md:1018-1027` saved-state-http-exchange · `foundations/part_map.md:62-82` account-server · E2 · E3 · E9 · E10 · E12 · E15 · E16 · E17 · E19 · E21 · E22 · `guidelines/coding-http-application.md` · `src/server/transport.ts` · `src/server/log-line.ts` · `src/server/database.ts`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/**` (the HTTP routes of the account and save server)
- **Checks:** `npm test -- tests/http.test.mjs` · `npm test -- tests/transport.test.mjs` · `npm run typecheck`; the new cases are written first and seen to fail.
- **Depends on:** Slice 1 · E2 · E3 · E9 · E10 · E12 · E15 · E16 · E17 · E19

## Passages of the task, the spec and the plan the *Read* names, copied word for word

#### docs/task-cycles/programy-ze-starych-zapisow/task.md lines 26-31 — To do

1. Serwer trzyma przy każdym koncie, z uprawnieniem czy bez, jeden poprzedni zapis gry: zapis, który zastąpił przyjęty zapis wyższej wersji albo reset (punkt 5), przechodzi na to miejsce i nadpisuje wcześniejszy poprzedni zapis; poprzedni zapis ma ten sam limit 64 KiB co zapis gry.
2. Konto ma uprawnienie, które człowiek nadaje i zdejmuje poleceniem uruchamianym w kontenerze `loop2`, tak jak blokadę konta (D-137); polecenie mówi, że nadało albo zdjęło uprawnienie, że konto już było w żądanym stanie albo że konta o tym adresie nie ma. Jedno uprawnienie obejmuje wciąganie programów (punkty 3–4) i reset (punkt 5).
3. Na koncie z uprawnieniem, gdy poprzedni zapis istnieje, ekran Programy ma przycisk „Wciągnij programy z poprzedniego zapisu”, dostępny w dowolnej chwili; na koncie bez uprawnienia albo bez poprzedniego zapisu przycisku nie ma.
4. Przycisk dopisuje na koniec listy programy z poprzedniego zapisu: program o nazwie zajętej na liście dostaje kolejny numer, np. „Las (2)”; programu, którego dzisiejsza gra nie przyjmuje (np. czynność albo przedmiot, których już nie ma), gra nie dopisuje i jednym zdaniem podaje nazwy pominiętych. Każdy program przechodzi to samo sprawdzenie co program z edytora; reszty poprzedniego zapisu gra nie czyta.
5. Na koncie z uprawnieniem gra ma przycisk „Zacznij od zera” z potwierdzeniem: po potwierdzeniu bieżący zapis przechodzi na miejsce poprzedniego zapisu, a gra startuje od nowa, więc programy da się potem wciągnąć punktem 3.
6. Skill wdrożenia `loop2-deploy` opisuje polecenie uprawnienia z punktu 2, tak jak opisuje polecenie blokady konta.

#### docs/task-cycles/programy-ze-starych-zapisow/spec.md lines 6-10 — Words used and Intent

Words used below. The **previous save** is the one saved game state the server holds beside the account's current one (the task's "poprzedni zapis"). The **privilege** is the account's flag set by the operator command (the task's "uprawnienie"). The **current save** is today's `saved_games` row. The **schema version** (the database's `user_version`) and `SAVED_GAME_VERSION` (the version of the shape of a saved game state) are two different numbers that both read 5 after this change: the change adds schema step 5 and leaves `SAVED_GAME_VERSION` at 5, because no type of the game state changes.

## Intent

A player whose saved game state is replaced by a newer shape of the game, or who resets the game for a test, no longer loses the programs: the server keeps the replaced document as the previous save, and an account that holds the privilege can append the programs of that document to the list of its present game, and can start the game from zero. Everything else about D-206 stays: the game loads whole only a document of its current version.

#### docs/task-cycles/programy-ze-starych-zapisow/spec.md lines 30-41 — Constraints

## Constraints

- **The task**, every sentence. In particular: the previous save has the 64 KiB limit of the saved game state; the privilege covers pull and reset together; the button shows only for a privileged account with a previous save; a reset moves the current save to the previous slot, the game starts anew, and a card open before the reset gets the refusal as today (D-209, which the task keeps unchanged: "Bez zmiany"); D-213 is unchanged too; the server computes nothing of the game (D-07).
- **Reading of the task's point 1.** "The save that replaced an accepted save of a higher version" is read as: the stored save that an accepted save of a higher version replaces moves to the previous slot (the task's line under D-210: "przyjęcie zapisu wyższej wersji odkłada dotychczasowy jako poprzedni zapis"); the reset moves the stored current save. The other reading (the incoming save is stored as previous) contradicts point 5 and the task's D-210 line.
- **D-07, D-210.** The server reads nothing inside the game. It copies the stored text; it compares the version numbers only.
- **D-104, D-109, trust boundary.** `src/server/**` and `src/browser/sim/saved-game.ts` are trust boundaries. Every state-changing route passes the guards of `mutationGuards` (exact Origin, JSON, body limit); input is an object of expected fields with explicit checks; a session alone names the account; no field of a request names an account.
- **D-112 and the schema rule.** One step per version, a step that reached the test server is never edited (steps 1–4 stay), a step is additive and keeps every row; transactions hold no asynchronous work. Block, version, revision and now the privilege are read in the transaction that writes.
- **D-213, D-386 and the kind guideline `guidelines/coding-saved-game.md` stay as they are** and govern `saved-game.ts` and the load only. The reader of this change is a new simulation file outside that kind (decision 4); it keeps the same discipline by the spec's own words: it takes `unknown`, throws for no value a document can hold, changes nothing passed to it, shares nothing with it, reads no clock, imports only simulation files; an error of its own code is not a skip and propagates.
- **D-137, D-354.** The operator's sentence is not a log line; a command that touches the accounts' data installs its own last resort; only a human runs it.
- **Invariants that this change touches** (listed under Foundation entries): `save-version`, `account-client-outcomes`, `account-session-authorization`, `player-save-isolation`, `account-mutation-request-guards`, `account-schema-lifecycle`, `account-database-schema`.
- **Code as it stands.** `writeSavedGame` in `src/server/database.ts` already reads block, stored version and stored revision in one transaction, in the order blocked, outdated, conflict; the page builds a game from a refused load with `revision` equal to the stored revision, so the first save of a new game after a version bump is accepted on its basis and is the save that moves the old one. `readAccount` validates every column of `accounts`.
- **Deployment.** The first deployment of the change moves the persistent database of the test server to schema version 5; from then on `main` before this change fails health with exit 8 (the same property of every earlier schema step, as the skill states for versions 2 to 4). A trial deployment of the branch before the merge has the same effect on `main`'s deployments. This is the human's decision at deployment, not the change's.

#### docs/task-cycles/programy-ze-starych-zapisow/spec.md lines 45-112 — 1. The HTTP contract, 2. Where the previous save moves, and the revision, and 3. Which saves move

### 1. The HTTP contract

Two new routes and one new field. Both routes sit in the router's `paths` table, so they carry `Cache-Control: no-store`, the transport check and the 503 of a server without accounts like every account route.

**`GET /api/previous-saved-game`** — the previous save of the session's account.

- Checks, in this order: the transport check of the router; the session (no session, a blocked account: 401 `unauthenticated`, as `GET /api/saved-game`); the privilege of the account read at that moment (without it: 403 with the code `previous-save-forbidden`, whatever the slot holds, so the answer tells nothing of the slot); then the read.
- Answer 200, JSON, built as the answer of `GET /api/saved-game` is, the stored text embedded as it is: one key `previous`, holding either `null` (the account has none) or an object with exactly `version` (the stored version) and `game` (the stored game). No revision is sent: the browser does not need it. A `null` is a success of its own, never a 404, for the reason D-204 gives (an unmatched `/api/` request is a 404 too).
- No input: no body, and the query string is read by nothing.
- The answer is at most the stored document (64 KiB, D-104) and a few bytes of envelope.

**`POST /api/saved-game-reset`** — moves the current save to the previous slot and leaves the account with no current save.

- Checks, in this order: the transport check; the guards of D-104 with the 16 KiB limit of the small routes (Origin, JSON, compressed bodies refused, a non-object refused); the body is an object with no field (any field: 400 `invalid-request`, as the logout route); the session (401 `unauthenticated`); then one database write that, in its own transaction, reads the block (blocked: 401, as a save of a blocked account), then the privilege (without it: 403 `previous-save-forbidden`), then does the move.
- Answer 204 with no body when the move was made and also when the account had no current save (nothing to move: nothing changes, the previous slot stays as it is). The browser needs no difference between the two.
- The business event `saved-game-reset` with the account's identifier is logged when a current save moved.

**The account answer** — `GET /api/account`, the login and the registration answers all carry the account's body; it gains one boolean, `previousSaveAllowed`, the privilege. It carries nothing of the slot, so it leaks nothing about it. The browser reads it with the rest of the account when it names the account, and shows no control and sends no request for the previous save when it is false.

Ways considered:

- *Fold the previous save into the existing route* (`GET /api/saved-game?previous=...`, `DELETE /api/saved-game` for the reset). Rejected: the route that builds the game would hold a mode that serves another document, one parameter away from the document the game is loaded and overwritten from; `DELETE` stands outside the guards written for `POST`/`PUT` and carries no JSON body for the check of the media type.
- *One status route for everybody* answering the privilege and the existence of a previous save. Rejected: every account would ask it on every Programs screen, and a non-privileged account would get a success from a route that holds a privileged function.
- *The privilege learnt from a failing request* (403 on the first `GET`). Rejected by the task ("so the button shows without a failing request").
- *404 or an empty success for an account without the privilege.* A 404 reads as a missing route (D-05, D-204). An empty success answers a non-privileged account the same as a privileged one without a slot; it also leaks nothing, but then the reset, which cannot answer "done" when it moved nothing because of the missing privilege, would still have to be a 403, and two routes would refuse in two ways. One refusal, 403 with its code, for both.
- *The existence of the slot as a second boolean of the account answer.* Rejected: it goes stale at once (the slot appears at the first save after a bump, in a page that is already open) and the account answer is read once per page load.

Price if wrong: before the first deployment, the contract is cheap to change. After it, the only user is the operator's own account; the cost is a page and a route changed together in one deployment (the client and the server always deploy together; an old tab only ignores the new field).

### 2. Where the previous save moves, and the revision

**The schema step.** One new step, number 5, added at the end of the list, additive, editing none of 1–4:

- a flag column on `accounts`, not null, default 0, checked to 0 or 1, so every existing account stays unprivileged and unchanged;
- a table of previous saved game states, one row per account: the account's identifier as key and as a foreign key that cascades with the account, the version (at least 1), the revision (at least 1), and the game text with the same 64 KiB check by bytes as `saved_games` (a text cast to a blob, D-104).

Ways considered for the slot: columns on the `saved_games` row — rejected, because the reset deletes the current row and the slot must outlive it, and because D-112 keeps the saved game state out of the row every login reads; a table of previous saves with a row per move (a history) — rejected by the task (one previous save). The previous table is a copy of the current table's shape, so one reading and one validation of a stored game serve both.

**Operations in the database class** (units of `database.ts`, each one transaction, each reading in it what it checks):

- The save write (existing) keeps its order: blocked, outdated (stored version greater than the incoming one), conflict (stored revision other than the basis), and keeps the revision it gives (the stored revision plus 1, or 1 where the account has no current save). After those pass, and only then, when the account has a current save of a version lower than the incoming one, the same transaction first copies the current row into the previous slot (replacing what the slot held) and then writes the new current row. A thrown error rolls back both.
- The reset write: reads blocked, then the privilege, then the current save; with a current save it copies the row to the previous slot and deletes the current row, in one transaction; without one it changes nothing.
- A reader of the previous save by account identifier, validating the stored columns as the reader of the current save does.
- A write of the privilege by the normalized address: one transaction, outcomes granted / already granted / revoked / not granted / no such account, returning the account identifier for the event.

**The revision after a reset: D-209 stays as it is.** After a reset the account holds no current save, so a save based on 0 is accepted and gets revision 1, and any other basis is refused, as D-209 says. A card open across the reset, whose basis is not 0, gets the refusal as today (409 `save-conflict`); it loads the server's save, which is none, and builds a new game by the path and with the sentence D-209 already has. The reset itself names no basis (the player confirmed the act; from a stale card it moves what the server holds, which still lands in the previous slot and so is not lost).

The prices of keeping D-209 as written, all in the privileged player's own account:

1. A card open across the reset whose basis equals a revision that the new game's saves have since reached (it needs equal numbers) is accepted over the new game. What is lost is the new game; the previous save is never touched by a save.
2. A card whose basis is 0 (it loaded when the account had no save and has not saved since) is accepted after a reset, as it is today before a first save.
3. The sentence of D-209, "Gra została zapisana w innej przeglądarce. Wczytano ten zapis.", is imprecise for a card that loses to another card's reset and finds no save; it stays.
4. A tab of an older version after a reset bypasses D-210: that guard compares with the stored current save, and after a reset there is none. An older tab whose save is refused as a conflict loads no save, builds a game of its own version and saves it on basis 0, accepted with the lower version; a reload with the current code then refuses it as another version, and the first save of the new game moves it into the slot, replacing the document the reset put there. The harm is the programs of the reset document, in a rare sequence (an older tab open across a deployment and a reset). It is not closed here; D-210 stays as the task has it, apart from the move.

Way considered: continuing the revision from the previous slot's revision after a reset closes price 1 with one more read in the save write. Rejected: it changes D-209, which the task keeps unchanged, adds a coupling between two tables and calls for a sentence of its own. Price if the choice is wrong: price 1 happens, once, to one account.

Price if the moves are wrong as a whole: a lost previous save is a lost document of one player's own (D-07); the server's other state is unharmed because a move is a copy plus the usual write inside one transaction.

### 3. Which saves move

Exactly two things put a document into the previous slot, and each replaces what the slot held:

1. An accepted save whose version is higher than the stored current save's version: the stored current save moves.
2. The reset, with a current save present.

Nothing else moves: an accepted save of the same version as the stored one (the stored one is overwritten, as today); a save refused as blocked, outdated or conflicting (it writes nothing, so it moves nothing); a first save of an account with no current save; the block or unblock of the account; the grant or the revoke of the privilege (the slot stays while the privilege is off and is there again when it is granted); a load. The slot is not read by the game's load and not written by the browser.

Price: two version bumps before the pull, or a reset before the pull, replace the older previous save and its programs; the confirmation of the reset must say so (decision 6). The task accepts this ("kolejne odłożenie nadpisuje wcześniejszy").

#### docs/task-cycles/programy-ze-starych-zapisow/spec.md lines 166-176 — 7. Units and their interfaces

### 7. Units and their interfaces

- `src/server/database.ts` — adds the schema step, the privilege to `Account`, the previous-save reader, the reset write, the privilege write, and the move inside the save write. Depends on nothing new. Used by the routes and the command.
- `src/server/account-routes.ts` — adds the two paths and handlers and the field of the account body. Depends on the database class and `mutationGuards`.
- `src/server/account-previous-save.ts` — the operator command. Depends on `database.ts`, `account-policy.ts` (`normalizeEmail`), `log-line.ts`.
- `src/browser/account-api.ts` — adds `previousSaveAllowed` to `Account` (a boolean the client requires, as it requires `emailConfirmed`), the refusal code `previous-save-forbidden` to `refusalCodes`, `loadPreviousSavedGame()` returning the result of a document or `null` read with the exact keys `previous`, `version`, `game` as `loadSavedGame` reads its answer, and `resetSavedGame()` as a 204 request with the empty-object body. Keeps no state.
- `src/browser/sim/previous-programs.ts` — new; the reader of decision 4. Depends on `programs.ts` (`checkProgram`, `ProgramCheckError`) and `SAVED_GAME_VERSION` from `saved-game.ts` as a value to compare, or a constant of its own that a test ties to it (the maker's choice; the file may not import anything outside the simulation).
- `src/browser/sim/programs.ts` — adds the append with numbering of names. Depends on nothing new.
- The view (`program-list.tsx` or the program screen's page code, `game-view.ts`, `app.ts`) — the pull button and its states, the reset control with its confirmation, the page's flow of the reset and the new game, the sentences. Depends on the client and the two simulation functions above. `game-saver.ts` is not changed for the reset.
- The skill and its references — the section and the paragraphs of decision 5.
- **Existing tests that read the schema version as 4 and must change with step 5** (verified in the code at the base commit): `tests/account-storage.test.mjs` lines 185-189 (version 5 as the first unknown one: becomes 6), 323, 347, 451, 487, 594, 639 (the current version after a move) and 1289-1290 (the assertion "no schema step is added", which the change makes false), with their titles and comments that say "version 4" (lines 318, 320, 444, 587); `tests/account-backup.test.mjs` line 281; `tests/deploy/test_account_backup_stream.py` line 90 (a test of the deployment part). The tests that read other versions (lines 215, 365, 508, 674, 705 and the 99 of `tests/startup.test.mjs`) stay.


## Foundation entries, read whole, each by its range as the worktree stands now

- `foundations/decisions.md:17-38` D-02
- `foundations/decisions.md:2056-2068` D-104
- `foundations/decisions.md:2123-2135` D-109
- `foundations/decisions.md:2870-2889` D-137
- `foundations/decisions.md:3883-3904` D-202
- `foundations/decisions.md:3922-3954` D-204
- `foundations/decisions.md:4106-4149` D-209
- `foundations/decisions.md:4150-4185` D-210
- `foundations/invariants.md:718-727` account-session-authorization
- `foundations/invariants.md:728-737` account-mutation-request-guards
- `foundations/invariants.md:988-997` player-save-isolation
- `foundations/invariants.md:858-867` blocked-account-access
- `foundations/invariants.md:1018-1027` saved-state-http-exchange
- `foundations/part_map.md` — the entry `account-server` (find it by its heading `## account-server`)

Entries of the plan the slice names by label, with the identifiers and ranges as the foundation stands now (read each whole):

- E2: `foundations/decisions.md:2056-2068` D-104
- E3: `foundations/decisions.md:2123-2135` D-109
- E9: `foundations/decisions.md:9635-9649` D-393
- E10: `foundations/decisions.md:9650-9664` D-394
- E12: `foundations/decisions.md:9680-9694` D-396
- E15: `foundations/invariants.md:718-727` account-session-authorization
- E16: `foundations/invariants.md:728-737` account-mutation-request-guards
- E17: `foundations/invariants.md:988-997` player-save-isolation
- E19: `foundations/invariants.md:1328-1337` previous-save-slot
- E21: `foundations/glossary.md:254-259` previous save
- E22: `foundations/glossary.md:260-265` previous-save privilege

## Files and guidelines the *Read* names (read each guideline file whole; the code and tests as far as the slice needs)

- `guidelines/coding-http-application.md`
- `src/server/transport.ts`
- `src/server/log-line.ts`
- `src/server/database.ts`

## What slice 1 left (names in the code now)

Slice 1 is committed (`896b7509`, fix `4e1decb2`; the plan's *Foundation entries* in `809fbf6b`). In `src/server/database.ts` read, before you wire the routes: the schema step 5 (column `previous_save_allowed` on `accounts`, table `previous_saves`), the `Account` field for the privilege, `readPreviousSavedGame`, `resetSavedGame` (its four distinct results: moved, nothing to move, blocked, unprivileged; it throws `Unknown account` for a missing account, so the route must decide how that answers, as the routes answer a save of a vanished account) and `setPreviousSavePrivilege`, and the save write that moves a replaced document. Use their real names and result shapes; the spec's names are proposals. The foundation entries write the contract in D-394, D-396 and the new invariant `previous-save-slot`.

## Report

Write the full report to the report path by the method's form; return the status, your commits, a one-line check result naming what failed or did not run, the report path, your questions, the reach beyond this handoff, **Unread material** and **Searches not found or unclear** (each `none` where that is the answer), and the own-work check the method asks for.
