# Handoff — slice 1, executor

You are the executor of slice 1 of a plan, in a task cycle of the loop2 repository run by an orchestrator. The person who requested the cycle delegated intermediate choices to the orchestrator; your questions go to the orchestrator, never to the human, and no answer is the human's approval.

- Worktree (work from its root): `the task's worktree`, branch `task/programy-ze-starych-zapisow`; base of this slice: `809fbf6b27d9021c6ac1647cbcba5a6ca51b5ae2` (HEAD when this handoff was written).
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`), variant "a slice, or the retry of a slice" (the-way pinned at `55afa8e57aa1b83c77108576a36642722e0dda15`). Read the `SKILL.md` whole and a file it names only when the step or variant that names it comes. For a review: `.the-way/task-cycle/review/SKILL.md` (`the-way-review-change`).
- Frozen task: `docs/task-cycles/programy-ze-starych-zapisow/task.md`; reviewed spec: `docs/task-cycles/programy-ze-starych-zapisow/spec.md`; plan: `docs/task-cycles/programy-ze-starych-zapisow/plan.md`. Report path: `docs/task-cycles/programy-ze-starych-zapisow/reports/slice-1-executor-report.md`.
- The cycle's answers at start: trust boundary yes (`src/server/**`, `src/browser/sim/saved-game.ts`, and by the spec the new `src/browser/sim/previous-programs.ts`; every review checks crafted input there); irreversible operation no (the schema step only adds; granting the privilege is a human's command); reserved choice none; open design choice settled by the reviewed spec. D-209 and D-213 stay unchanged. The foundation entries of the change are already written and committed (commit `809fbf6b`); the entry labels E1–E24 of the plan name them: E1 D-206, E2 D-104, E3 D-109, E4 D-112, E5 D-210, E6 D-167/D-169, E7 D-354, E8 D-355, E9 D-393, E10 D-394, E11 D-395, E12 D-396, E13 `save-version`, E14 `account-client-outcomes`, E15 `account-session-authorization`, E16 `account-mutation-request-guards`, E17 `player-save-isolation`, E18 `account-schema-lifecycle` and `account-database-schema`, E19 `previous-save-slot` (new invariant), E20 `previous-save-programs-reader` (new invariant), E21 glossary "previous save", E22 glossary "previous-save privilege", E23 the part map, E24 D-44. Where the foundation entries and the spec seem to differ, the spec binds the code and you name the difference in your report.
- Where it applies to this stage: a check named below is run by you with its command and exit code in the report; no run of the product's gate (`npm test` without a file) and no `foundation_check.py` — the orchestrator runs those (one expected error of the foundation check stands until slice 6 creates `src/browser/sim/previous-programs.ts`).
- Commit with explicit `git add <paths>`, never `git add -A`; messages in English in the style of this repository's `git log`; `git commit -F <file>` where a message holds quotes.

## The slice's section of the plan, copied word for word

### Slice 1 — The database: schema step 5, the privilege, the previous save and its moves

- **Goal:** `src/server/database.ts` holds schema version 5, the privilege and the previous save, and the save write moves a replaced document into the previous slot. Make, from decision 2 of the spec, each unit one transaction that reads in it what it checks. (a) Schema step 5, appended at the end of the list, steps 1 to 4 untouched: a not-null flag column on `accounts` defaulting to 0 with a 0-or-1 check, and a table of previous saved game states with one row per account — the account's identifier as key and as a foreign key that cascades with the account, the version (at least 1), the revision (at least 1) and the game text with the same 64 KiB check by bytes as the table of current saves. `Account` gains the boolean privilege (the spec proposes the name `previousSaveAllowed`) and the reader of an account validates the new column as it validates the others. (b) The save write keeps its order of refusals — blocked, outdated, conflict — and the revision it gives; once they pass, and only then, when the account holds a current save of a version lower than the incoming one, the same transaction copies the stored row into the previous slot (replacing what the slot held) and then writes the new current row, so a thrown error rolls back both. A save of the same version, a first save and every refused save move nothing. (c) A reset write: it reads the block, then the privilege, then the current save; for an unblocked, privileged account with a current save it copies the row into the previous slot and deletes the current row; with no current save it changes nothing; blocked, without privilege, moved and nothing-to-move are four distinct results. (d) A reader of the previous save by account identifier, validating the stored columns as the reader of the current save does, returning none for an empty slot. (e) A privilege write by normalized address in the manner of the block and unblock writes: one transaction, with the results granted, already granted, revoked, not granted and no such account, returning the account's identifier for the event. Blocking and unblocking do not touch the slot. Tests, the failing ones first: the tests that read the schema version as 4 change as decision 7 of the spec lists them (the first unknown version becomes 6, the current version after a move becomes 5, the assertion that no schema step is added is replaced, the titles and comments that say "version 4" are corrected, and the two tests of the backup read version 5); tests that compare an account record gain the new field; new cases, carrying the markers of E18, E19 and E17, show that a version-4 database written in the test by its own schema opens as version 5 keeping every row with every account unprivileged and no previous save, that a failing step 5 leaves it at version 4 unchanged, that a save of a higher version moves the stored document and one of the same version does not, that a refused save moves nothing, that a second move replaces the first, that the reset moves and that without the privilege, blocked or with no save it moves nothing, that the privilege write gives each result, that a block and a grant leave the slot as it is, and that the table of previous saves refuses text over 65 536 bytes counted in bytes.
- **Change:** `src/server/database.ts` · `tests/account-storage.test.mjs` · `tests/account-backup.test.mjs` · `tests/deploy/test_account_backup_stream.py`
- **Read:** `docs/task-cycles/programy-ze-starych-zapisow/task.md:26-31` To do · `docs/task-cycles/programy-ze-starych-zapisow/task.md:101-111` Settlements to record · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:6-10` Words used and Intent · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:30-41` Constraints · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:74-112` 2. Where the previous save moves, and the revision, and 3. Which saves move · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:166-176` 7. Units and their interfaces · `foundations/decisions.md:209-242` D-07 · `foundations/decisions.md:2056-2068` D-104 · `foundations/decisions.md:2177-2191` D-112 · `foundations/decisions.md:2192-2206` D-114 · `foundations/decisions.md:2870-2889` D-137 · `foundations/decisions.md:3955-3977` D-205 · `foundations/decisions.md:3978-4011` D-206 · `foundations/decisions.md:4096-4139` D-209 · `foundations/decisions.md:4140-4166` D-210 · `foundations/decisions.md:4698-4722` D-229 · `foundations/invariants.md:758-767` account-schema-lifecycle · `foundations/invariants.md:768-777` account-database-schema · `foundations/invariants.md:1008-1017` account-save-sqlite-store · `foundations/invariants.md:988-997` player-save-isolation · `foundations/invariants.md:858-867` blocked-account-access · `foundations/glossary.md:156-160` blocked account · `foundations/part_map.md:62-82` account-server · E1 · E2 · E4 · E5 · E9 · E10 · E12 · E17 · E18 · E19 · E21 · E22 · `guidelines/coding.md` · `guidelines/coding-database-access.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/**` (the database access of the account and save server)
- **Checks:** `npm test -- tests/account-storage.test.mjs` · `npm test -- tests/account-backup.test.mjs` · `npm test -- tests/deploy/test_account_backup_stream.py` (needs a Docker daemon, which the gate's helper starts) · `npm run typecheck`; the cases named in the Goal are written first and seen to fail.
- **Depends on:** none · E1 · E2 · E4 · E5 · E9 · E10 · E12 · E17 · E18 · E19

## Passages of the task, the spec and the plan the *Read* names, copied word for word

#### docs/task-cycles/programy-ze-starych-zapisow/task.md lines 26-31 — To do

1. Serwer trzyma przy każdym koncie, z uprawnieniem czy bez, jeden poprzedni zapis gry: zapis, który zastąpił przyjęty zapis wyższej wersji albo reset (punkt 5), przechodzi na to miejsce i nadpisuje wcześniejszy poprzedni zapis; poprzedni zapis ma ten sam limit 64 KiB co zapis gry.
2. Konto ma uprawnienie, które człowiek nadaje i zdejmuje poleceniem uruchamianym w kontenerze `loop2`, tak jak blokadę konta (D-137); polecenie mówi, że nadało albo zdjęło uprawnienie, że konto już było w żądanym stanie albo że konta o tym adresie nie ma. Jedno uprawnienie obejmuje wciąganie programów (punkty 3–4) i reset (punkt 5).
3. Na koncie z uprawnieniem, gdy poprzedni zapis istnieje, ekran Programy ma przycisk „Wciągnij programy z poprzedniego zapisu”, dostępny w dowolnej chwili; na koncie bez uprawnienia albo bez poprzedniego zapisu przycisku nie ma.
4. Przycisk dopisuje na koniec listy programy z poprzedniego zapisu: program o nazwie zajętej na liście dostaje kolejny numer, np. „Las (2)”; programu, którego dzisiejsza gra nie przyjmuje (np. czynność albo przedmiot, których już nie ma), gra nie dopisuje i jednym zdaniem podaje nazwy pominiętych. Każdy program przechodzi to samo sprawdzenie co program z edytora; reszty poprzedniego zapisu gra nie czyta.
5. Na koncie z uprawnieniem gra ma przycisk „Zacznij od zera” z potwierdzeniem: po potwierdzeniu bieżący zapis przechodzi na miejsce poprzedniego zapisu, a gra startuje od nowa, więc programy da się potem wciągnąć punktem 3.
6. Skill wdrożenia `loop2-deploy` opisuje polecenie uprawnienia z punktu 2, tak jak opisuje polecenie blokady konta.

#### docs/task-cycles/programy-ze-starych-zapisow/task.md lines 101-111 — Settlements to record

## Settlements to record

Candidates: 6 shown, 5 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Serwer odkłada na każdym koncie jeden poprzedni zapis — ten, który zastąpił zapis wyższej wersji albo reset — a kolejne odłożenie nadpisuje wcześniejszy; dotyczy każdego konta, z uprawnieniem czy bez. | decision | *Questions to settle* 1 (wybór Mariusza) | ile zapisów i dla których kont trzyma serwer oraz kiedy je odkłada |
| 2 | Uprawnienie to znacznik na koncie, nadawany i zdejmowany poleceniem człowieka w kontenerze jak blokada konta, i jeden znacznik obejmuje wciąganie programów i reset. | decision | *Questions to settle* 2 (wybór Mariusza) | czym jest uprawnienie, kto je nadaje i czy wciąganie i reset mają osobne uprawnienia |
| 3 | Konto z uprawnieniem wciąga programy przyciskiem „Wciągnij programy z poprzedniego zapisu” na ekranie Programy w dowolnej chwili, gdy poprzedni zapis istnieje. | decision | *Questions to settle* 3 (wybór Mariusza) | czy wciąganie jest jednorazowe przy wczytaniu, czy stałe, i gdzie stoi |
| 4 | Wciągnięte programy dopisują się na koniec listy z kolejnym numerem przy zajętej nazwie, a program, którego dzisiejsza gra nie przyjmuje, jest pomijany i gra podaje nazwy pominiętych. | decision | *Questions to settle* 4 (wybór Mariusza) | czy programy zastępują listę i czy jeden zły program przerywa wciąganie |
| 5 | Konto z uprawnieniem resetuje grę od zera przyciskiem „Zacznij od zera” z potwierdzeniem, a bieżący zapis przechodzi na miejsce poprzedniego zapisu. | decision | *Questions to settle* 5 (wybór Mariusza) | czy reset jest w grze czy na serwerze i czy zachowuje programy do wciągnięcia |

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

#### docs/task-cycles/programy-ze-starych-zapisow/spec.md lines 74-112 — 2. Where the previous save moves, and the revision, and 3. Which saves move

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

- `foundations/decisions.md:209-242` D-07
- `foundations/decisions.md:2056-2068` D-104
- `foundations/decisions.md:2177-2191` D-112
- `foundations/decisions.md:2192-2206` D-114
- `foundations/decisions.md:2870-2889` D-137
- `foundations/decisions.md:3955-3977` D-205
- `foundations/decisions.md:3978-4021` D-206
- `foundations/decisions.md:4106-4149` D-209
- `foundations/decisions.md:4150-4185` D-210
- `foundations/decisions.md:4717-4741` D-229
- `foundations/invariants.md:758-767` account-schema-lifecycle
- `foundations/invariants.md:768-777` account-database-schema
- `foundations/invariants.md:1008-1017` account-save-sqlite-store
- `foundations/invariants.md:988-997` player-save-isolation
- `foundations/invariants.md:858-867` blocked-account-access
- `foundations/glossary.md:156-161` blocked account
- `foundations/part_map.md` — the entry `account-server` (find it by its heading `## account-server`)

Entries of the plan the slice names by label, with the identifiers and ranges as the foundation stands now (read each whole):

- E1: `foundations/decisions.md:3978-4021` D-206
- E2: `foundations/decisions.md:2056-2068` D-104
- E4: `foundations/decisions.md:2177-2191` D-112
- E5: `foundations/decisions.md:4150-4185` D-210
- E9: `foundations/decisions.md:9635-9649` D-393
- E10: `foundations/decisions.md:9650-9664` D-394
- E12: `foundations/decisions.md:9680-9694` D-396
- E17: `foundations/invariants.md:988-997` player-save-isolation
- E18: `foundations/invariants.md:758-767` account-schema-lifecycle
- E18: `foundations/invariants.md:768-777` account-database-schema
- E19: `foundations/invariants.md:1328-1337` previous-save-slot
- E21: `foundations/glossary.md:254-259` previous save
- E22: `foundations/glossary.md:260-265` previous-save privilege

## Files and guidelines the *Read* names (read each guideline file whole; the code and tests as far as the slice needs)

- `guidelines/coding.md`
- `guidelines/coding-database-access.md`
- `guidelines/testing.md`


## Report

Write the full report to the report path by the method's form; return the status, your commits, a one-line check result naming what failed or did not run, the report path, your questions, the reach beyond this handoff, **Unread material** and **Searches not found or unclear** (each `none` where that is the answer), and the own-work check the method asks for.
