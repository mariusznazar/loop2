# Handoff — slice 9, executor

You are the executor of slice 9 of a plan, in a task cycle of the loop2 repository run by an orchestrator. The person who requested the cycle delegated intermediate choices to the orchestrator; your questions go to the orchestrator, never to the human, and no answer is the human's approval.

- Worktree (work from its root): `the task's worktree`, branch `task/programy-ze-starych-zapisow`; base of this slice: `8cac0a43b8b9f7bd35da323184351e6a8e7e16e4` (HEAD when this handoff was written).
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`), variant "a slice, or the retry of a slice" (the-way pinned at `55afa8e57aa1b83c77108576a36642722e0dda15`). Read the `SKILL.md` whole and a file it names only when the step or variant that names it comes. For a review: `.the-way/task-cycle/review/SKILL.md` (`the-way-review-change`).
- Frozen task: `docs/task-cycles/programy-ze-starych-zapisow/task.md`; reviewed spec: `docs/task-cycles/programy-ze-starych-zapisow/spec.md`; plan: `docs/task-cycles/programy-ze-starych-zapisow/plan.md`. Report path: `docs/task-cycles/programy-ze-starych-zapisow/reports/slice-9-executor-report.md`.
- The cycle's answers at start: trust boundary yes (`src/server/**`, `src/browser/sim/saved-game.ts`, and by the spec the new `src/browser/sim/previous-programs.ts`; every review checks crafted input there); irreversible operation no (the schema step only adds; granting the privilege is a human's command); reserved choice none; open design choice settled by the reviewed spec. D-209 and D-213 stay unchanged. The foundation entries of the change are already written and committed (commit `809fbf6b`); the entry labels E1–E24 of the plan name them: E1 D-206, E2 D-104, E3 D-109, E4 D-112, E5 D-210, E6 D-167/D-169, E7 D-354, E8 D-355, E9 D-393, E10 D-394, E11 D-395, E12 D-396, E13 `save-version`, E14 `account-client-outcomes`, E15 `account-session-authorization`, E16 `account-mutation-request-guards`, E17 `player-save-isolation`, E18 `account-schema-lifecycle` and `account-database-schema`, E19 `previous-save-slot` (new invariant), E20 `previous-save-programs-reader` (new invariant), E21 glossary "previous save", E22 glossary "previous-save privilege", E23 the part map, E24 D-44. Where the foundation entries and the spec seem to differ, the spec binds the code and you name the difference in your report.
- Where it applies to this stage: a check named below is run by you with its command and exit code in the report; no run of the product's gate (`npm test` without a file) and no `foundation_check.py` — the orchestrator runs those (one expected error of the foundation check stands until slice 6 creates `src/browser/sim/previous-programs.ts`).
- Commit with explicit `git add <paths>`, never `git add -A`; messages in English in the style of this repository's `git log`; `git commit -F <file>` where a message holds quotes.

## The slice's section of the plan, copied word for word

### Slice 9 — The page's reset: the request, the held outcomes and the new game

- **Goal:** a confirmed reset sends `POST /api/saved-game-reset` and, on 204, replaces the game with a new one. From decision 6 of the spec (the part named "The reset"). In `src/browser/view/app.ts` the page gives the game the callback of slice 8 only for an account with the privilege, and on a confirmed reset: (1) sends no save of its own first, since programs are saved right after each edit (D-207); (2) sends the reset through the client's `resetSavedGame()`; while it waits the control shows its waiting state, the outcomes of the old game's saver (conflict, outdated, signed out) are held by the page, as it already holds them while a logout is under way (`loggingOut` and `deferred`), and acted on only if the reset fails, and „Wyloguj” is not pressable (`src/browser/view/menu-bar.tsx` gets the state it needs and draws „Wyloguj” disabled, its waiting text staying „Wylogowywanie…” for the logout alone; a guard in the page's logout also stands); no new state of `GameSaver` is asked for; (3) on 204 the page drops the old game with its saver and builds a new game as for an account with no save (revision 0, `newGame()`, a new saver), with one sentence above it that the game starts anew and the previous game waits as the previous save, drops the held outcomes and sends no save at once; (4) on 401 it proceeds as for a save with no session (D-211), on 403 it shows one sentence that the account has no such privilege now, on any other failure one sentence that the game could not be started anew, the game staying, its saving going on, the held outcome, if any, acted on and the control available again. A save of the old game that reaches the server after the reset has a basis other than 0 and gets the conflict of D-209, which nobody acts on. Nothing stops a reset while a logout waits; the logout's own continuation covers it. A reset whose answer is lost shows the failure sentence and the game stays; its next save is refused as a conflict and the page loads the server's save, finds none and builds a new game by D-209's path. Tests, the failing ones first, in `tests/view/previous-save.test.mjs` through `startApp` with a client whose answers the case gives, as `tests/view/account-screen.test.mjs` does: no control and no request for an account without the privilege; the order of the calls (no `saveGame` before the reset); the waiting state and the held outcomes of the saver, acted on only after a failure; a new game with revision 0 on 204 and the sentence above it, with no save sent at once; 401, 403 and another failure each with its sentence and the game kept; a conflict from the old saver after the reset is not acted on; „Wyloguj” disabled while the reset waits; and in `tests/view/menu-bar.test.mjs` the bar's drawing of that state.
- **Change:** `src/browser/view/app.ts` · `src/browser/view/menu-bar.tsx` · `tests/view/previous-save.test.mjs` · `tests/view/menu-bar.test.mjs`
- **Read:** `docs/task-cycles/programy-ze-starych-zapisow/task.md:26-31` To do · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:6-10` Words used and Intent · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:30-41` Constraints · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:74-101` 2. Where the previous save moves, and the revision · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:149-164` 6. What the browser shows · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:166-176` 7. Units and their interfaces · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:221-239` Left to the maker and Decisions settled after the review · `foundations/decisions.md:1036-1050` D-44 · `foundations/decisions.md:1938-1952` D-96 · `foundations/decisions.md:1953-1967` D-97 · `foundations/decisions.md:4012-4075` D-207 · `foundations/decisions.md:4076-4095` D-208 · `foundations/decisions.md:4096-4139` D-209 · `foundations/decisions.md:4140-4166` D-210 · `foundations/decisions.md:4167-4202` D-211 · E12 · E21 · `foundations/part_map.md:3-28` browser-view · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` · `src/browser/account-api.ts` · `src/browser/view/game-view.ts` · `src/browser/view/game-saver.ts` · `tests/view/page-document.mjs` · `tests/view/account-screen.test.mjs:44-130` the page on jsdom · `tests/view/account-screen.test.mjs:289-427` the held client, the fixtures and the start of the page
- **Model:** same — a page flow in a module that is not to be copied, holding the old saver's outcomes beside the logout's guard and replacing a game; the order of the awaits is where it goes wrong
- **Risk:** none
- **Checks:** `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/view/menu-bar.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/uncaught-failure.test.mjs` · `npm test -- tests/view/game-saver.test.mjs` · `npm run typecheck`; the new cases are written first and seen to fail.
- **Depends on:** Slice 5 · Slice 8 · E12 · E21

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

#### docs/task-cycles/programy-ze-starych-zapisow/spec.md lines 74-101 — 2. Where the previous save moves, and the revision

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

#### docs/task-cycles/programy-ze-starych-zapisow/spec.md lines 149-164 — 6. What the browser shows

### 6. What the browser shows

The task fixes the buttons' names and the confirmation of the reset; the maker places the reset control by `guidelines/styleguide-browser-view.md`, and the spec fixes only this about it: the control exists only for an account whose account answer says `previousSaveAllowed`; it is in the game (not outside it); and it is behind the confirmation, the click that opens the confirmation changing nothing. For any other account nothing of it is in the page and no request for the previous save or the reset is ever sent.

**The pull button.** It stands on the Programs screen, with the list's other acts (the screen of D-166/D-167), is available whenever that screen is shown, including while a manual map run waits or goes on, and exists only when the check below says the previous save exists. A privileged account's Programs screen asks `GET /api/previous-saved-game` when the screen is shown (the answer is used only to show or hide the button; nothing is kept between openings). While the question is open the button is not shown. An answer of a document shows it; `null` or a failure leaves it away (a failure of the check shows one sentence that the previous save could not be checked; the next opening asks again). Pressed: the button shows its waiting state and is not pressable; the page fetches the previous save again (so the pull works on what the server holds now); the result decision 4 gives is shown; the button returns to its resting state and stays while the previous save exists (a second press appends copies again, as the task accepts). The sentence of a result or a failure stands next to the control it answers.

**The reset.** The control opens a confirmation, which says: the present game goes to the place of the previous save, a previous save already there is replaced and its programs cannot be pulled any more, and the game starts from zero; with a way to confirm and a way to withdraw that changes nothing. After the confirmation:

1. The page sends no save of its own first: programs are saved right after each edit (D-207), so the server's current save already holds them.
2. The page sends `POST /api/saved-game-reset`. While it waits, the control shows its waiting state, and the outcomes of the old game's saver (conflict, outdated, signed out) are held by the page, as the page already holds them while a logout is under way (`loggingOut` and `deferred` in `app.ts`), and acted on only if the reset fails; "Wyloguj" is not pressable. No new state of `GameSaver` is asked for.
3. On 204 the page drops the old game with its saver and builds a new game as for an account with no save (revision 0, a new game, a new saver), showing one sentence above it that the game starts anew and the previous game waits as the previous save; the held outcomes are dropped; no save is sent at once, as for an account with no save. A save of the old game that reaches the server after the reset has a basis other than 0 and gets the conflict of D-209, which nobody acts on.
4. On 401 the page proceeds as for a save with no session (D-211). On 403 one sentence that the account has no such privilege now. On any other failure one sentence that the game could not be started anew; the game stays, the saving goes on and the held outcome, if any, is acted on, the control available again.

Prices: the last moments of the old game not yet saved at the confirmation (a manual map run in progress, up to the 30 seconds of D-207's rhythm, or a save in flight) are not in the previous save; a save of the old game made while its basis is 0 (a game that had not yet saved) and landing after the reset is accepted, and the new game's first save is then refused as a conflict and loads it (price 2 of decision 2).

**A reset whose answer is lost** (a timeout after the server moved the save): the page shows the failure sentence and the game stays; its next save is refused as a conflict and the page loads the server's save, finds none and builds a new game on D-209's path with D-209's sentence, imprecise as price 3 of decision 2 names. The state heals itself.

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

#### docs/task-cycles/programy-ze-starych-zapisow/spec.md lines 221-239 — Left to the maker and Decisions settled after the review

## Left to the maker

- The Polish wording of every sentence of decisions 4 and 6, in the voice of the existing ones, and the roles the styleguide gives them.
- The place of the reset control, its confirmation's layout and the waiting states, by the styleguide; the exact names of the new methods, types, columns, table and codes (the names above are the spec's proposal where it gives one).
- How the page holds the old saver's outcomes during the reset (decision 6, step 2): by the existing mechanism of the logout or by a similar guard of its own; the spec binds the behaviour.
- How the Programs screen asks the question of the existence of the previous save and hands the answer to the button; how the view gets the client's two new methods.
- Whether the append function returns the final names or the page recomputes the count.
- The tests: which cases, their fixtures (a database of schema version 4 written in a test by its own schema, per the database guidelines; documents of versions 1 to 5 for the reader, with a version 1 program that lacks a trip plan, items with a foreign key or a missing key, and other crafted documents), and the changes to the existing tests that decision 7 lists.
- Whether the sentence for skipped programs shortens a very long list of names (the task says it names them; nothing in the spec shortens it).
- The text of the skill's new section and of the edited passages, and the exact paragraphs of `troubleshooting.md`; the `.agents` copy of `SKILL.md` stays byte-identical to the `.claude` one.

## Decisions (settled by the orchestrator after the review of the spec)

Rulings R1–R5 of the cycle record (`cycle.md`, *Questions and autonomous choices*) are applied above. The reviewer of the revision (`reports/spec-revision-review-report.md`, `PASS`) left four notes for the maker, settled here as autonomous choices:

- The name the append writes is the trimmed one the reader returned (the game's load refuses an untrimmed name, so a crafted name must never reach a save).
- The trust boundaries named in *Constraints* include the new reader file, `src/browser/sim/previous-programs.ts`; where the lines of this spec disagree on whether the reader imports `SAVED_GAME_VERSION`, it imports it (the reader needs the highest readable version), and the maker reads "imports only simulation files" accordingly.
- The new file stays under the kind guideline `guidelines/coding-simulation-module.md`; its strict items already meet the wording of `guidelines/coding-saved-game.md`, which the maker reads as well.
- Nothing stops a reset while a logout waits; the logout's own continuation covers it (`app.ts` already holds the old saver's outcomes). No change.


## Foundation entries, read whole, each by its range as the worktree stands now

- `foundations/decisions.md:1036-1050` D-44
- `foundations/decisions.md:1938-1952` D-96
- `foundations/decisions.md:1953-1967` D-97
- `foundations/decisions.md:4022-4085` D-207
- `foundations/decisions.md:4086-4105` D-208
- `foundations/decisions.md:4106-4149` D-209
- `foundations/decisions.md:4150-4185` D-210
- `foundations/decisions.md:4186-4221` D-211
- `foundations/part_map.md` — the entry `browser-view` (find it by its heading `## browser-view`)

Entries of the plan the slice names by label, with the identifiers and ranges as the foundation stands now (read each whole):

- E12: `foundations/decisions.md:9680-9694` D-396
- E21: `foundations/glossary.md:254-259` previous save

## Files and guidelines the *Read* names (read each guideline file whole; the code and tests as far as the slice needs)

- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `src/browser/account-api.ts`
- `src/browser/view/game-view.ts`
- `src/browser/view/game-saver.ts`
- `tests/view/page-document.mjs`
- `tests/view/account-screen.test.mjs:44-130` the page on jsdom`
- `tests/view/account-screen.test.mjs:289-427` the held client, the fixtures and the start of the page`

## What the earlier slices left

Slices 1 to 8 are committed (head `8cac0a43`). Read `src/browser/view/game-view.ts`, `src/browser/view/program-list.tsx` and `src/browser/view/previous-save-lines.ts` for slice 8's real option names (`onReset`, `setReset` or as the code has them), how the control, its waiting state and its sentence are driven from the page, and the two sentences slice 8 added to `previous-save-lines.ts` (one used by a test, the 403 sentence waiting for you); wire them in `src/browser/view/app.ts`. Slice 5's client (`src/browser/account-api.ts`: `resetSavedGame`) and the server's behaviour (`src/server/account-routes.ts`: 204, 401, 403 `previous-save-forbidden`, 409 is not answered by the reset) are committed.

Rules from the reviews of earlier slices: (1) besides the checks named for the slice, run the formatter invariant of the gate on your changed files — `npm test -- tests/quality/test_quality_invariants.py` (or `npx prettier --check` with the flags and patterns at the top of that file); (2) a test that claims to cover a behaviour must fail when that behaviour is broken: after writing the tests, break the behaviour on purpose in three or four places (a `saveGame` before the reset, the held outcomes of the old saver acted on after a success, „Wyloguj” pressable while the reset waits, the new game not built with revision 0) and see the tests fail, restore byte for byte, and say so in the report with commands and exit codes. Say in the report what you saw of the real flow in a browser (ui_check.md and D-357 give the route for screenshots; never into the repository); if you can run the game locally with a made-up privileged account (see the project skill `loop2-play`), press „Zacznij od zera” through the confirmation and show what happens, including that the previous save can then be pulled by the pull of slice 7 — that is the task's point 5 in the real game.

This slice has no review of its own (Risk none); the review of the whole change judges it.

## Report

Write the full report to the report path by the method's form; return the status, your commits, a one-line check result naming what failed or did not run, the report path, your questions, the reach beyond this handoff, **Unread material** and **Searches not found or unclear** (each `none` where that is the answer), and the own-work check the method asks for.
