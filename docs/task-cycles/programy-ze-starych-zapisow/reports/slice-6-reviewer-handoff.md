# Handoff — slice 6, reviewer

You are the reviewer of slice 6, in a task cycle of the loop2 repository run by an orchestrator. The person who requested the cycle delegated intermediate choices to the orchestrator; your questions go to the orchestrator, never to the human, and no answer is the human's approval.

- Worktree (work from its root): `the task's worktree`, branch `task/programy-ze-starych-zapisow`; base of this slice: `6a9283c43ec304ed6db495a0b56f4e24829fdc1e` (HEAD when this handoff was written).
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`), variant "a slice, or the retry of a slice" (the-way pinned at `55afa8e57aa1b83c77108576a36642722e0dda15`). Read the `SKILL.md` whole and a file it names only when the step or variant that names it comes. For a review: `.the-way/task-cycle/review/SKILL.md` (`the-way-review-change`).
- Frozen task: `docs/task-cycles/programy-ze-starych-zapisow/task.md`; reviewed spec: `docs/task-cycles/programy-ze-starych-zapisow/spec.md`; plan: `docs/task-cycles/programy-ze-starych-zapisow/plan.md`. Report path: `docs/task-cycles/programy-ze-starych-zapisow/reports/slice-6-reviewer-report.md`.
- The cycle's answers at start: trust boundary yes (`src/server/**`, `src/browser/sim/saved-game.ts`, and by the spec the new `src/browser/sim/previous-programs.ts`; every review checks crafted input there); irreversible operation no (the schema step only adds; granting the privilege is a human's command); reserved choice none; open design choice settled by the reviewed spec. D-209 and D-213 stay unchanged. The foundation entries of the change are already written and committed (commit `809fbf6b`); the entry labels E1–E24 of the plan name them: E1 D-206, E2 D-104, E3 D-109, E4 D-112, E5 D-210, E6 D-167/D-169, E7 D-354, E8 D-355, E9 D-393, E10 D-394, E11 D-395, E12 D-396, E13 `save-version`, E14 `account-client-outcomes`, E15 `account-session-authorization`, E16 `account-mutation-request-guards`, E17 `player-save-isolation`, E18 `account-schema-lifecycle` and `account-database-schema`, E19 `previous-save-slot` (new invariant), E20 `previous-save-programs-reader` (new invariant), E21 glossary "previous save", E22 glossary "previous-save privilege", E23 the part map, E24 D-44. Where the foundation entries and the spec seem to differ, the spec binds the code and you name the difference in your report.
- Where it applies to this stage: a check named below is run by you with its command and exit code in the report; no run of the product's gate (`npm test` without a file) and no `foundation_check.py` — the orchestrator runs those (one expected error of the foundation check stands until slice 6 creates `src/browser/sim/previous-programs.ts`).
- Commit with explicit `git add <paths>`, never `git add -A`; messages in English in the style of this repository's `git log`; `git commit -F <file>` where a message holds quotes.

## The slice's section of the plan, copied word for word

### Slice 6 — The reader of programs from a previous save and the append with numbering

- **Goal:** the simulation reads the programs of a document of an older version one by one through the check of the editor, and appends them to a game state. From decisions 3 and 4 of the spec. **New file `src/browser/sim/previous-programs.ts`**, a simulation file under `guidelines/coding-simulation-module.md` that also meets the wording of `guidelines/coding-saved-game.md`: it takes an `unknown`, throws for no value a document can hold, changes nothing passed to it, shares nothing with it, reads no clock and imports only simulation files (`checkProgram` and `ProgramCheckError` of `programs.ts`, and `SAVED_GAME_VERSION` of `saved-game.ts` as a value to compare). Its input is the document the client hands over, `{ version, game }`; its output is either "unreadable" or the programs read, in order, each item either a program (its trimmed name and its content as `checkProgram(content, null)` built it) or a skipped item with the name it is told by (its name where that is a non-empty text, else its place on the list counted from 1). Unreadable is: not a plain object with an own `version` that is a safe integer from 1 up to `SAVED_GAME_VERSION` and an own `game` that is a plain object with an own `programs` that is a list without holes (a higher version is unreadable; the current one is read). An item is accepted only when it is a plain object with exactly the own data keys `id`, `name`, `program`, its name is a text not empty after trimming and `checkProgram` accepts its program; every other item is skipped and named and the others go on; the value of `id` is neither used nor checked; only `ProgramCheckError` is a refusal, every other error propagates; nothing of the document beside `version`, `game.programs` and the items is read, and the strict comparison of the load is not applied to a program's content. **In `src/browser/sim/programs.ts`** a new function takes a game state and the programs read and returns the game state with them appended at the end of the list in order, each with the next program number (`nextProgramId` rises by the count) and a name free on the list by D-169's rule (trimmed, letter case ignored), taken one program at a time against the list including those just appended: the name as it stands where free, else the name, a space and `(n)` for the smallest n from 2 that makes it free (a name already ending in "(2)" gets another: "Las (2) (2)"); nothing else of the game state changes — no copy, no count, no pick, no program used last — and the name appended is the trimmed one the reader returned. `guidelines/coding-simulation-module.md` gains the new file in its table of files as a copy of the kind, and `guidelines/testing.md` gains the row of the new trust boundary in its *Trust boundaries* table with the case titles written here. Tests, the failing ones first, carrying the marker of E20 and of E13: in the new `tests/sim/previous-programs.test.mjs`, documents of versions 1 to 5 written out by hand (a version 1 program lacking a trip plan is skipped, the others read), items with a foreign key, a missing key, a name of spaces, a name that is no text, a program naming an action or an item the data lacks, a document of a higher version, of version 0, of 1.5, with no `game`, with `programs` not a list or holding a hole, and crafted values of every kind at every place (a getter or a prototype key is no JSON value; the cases are those of `tests/sim/saved-game.test.mjs` for the load) which never make it throw, with the argument left as it was and the result sharing nothing with it; in `tests/sim/program-list.test.mjs` the append: order, numbering "Las (2)" and "Las (3)", a name taken by an earlier appended one, letter case, "Las (2) (2)", the counter, and that nothing else of the state changes. `stryker.config.json` lists the new test file, as `tests/quality/test_mutation_test_selection.py` demands.
- **Change:** `src/browser/sim/previous-programs.ts` · `src/browser/sim/programs.ts` · `tests/sim/previous-programs.test.mjs` · `tests/sim/program-list.test.mjs` · `stryker.config.json` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md`
- **Read:** `docs/task-cycles/programy-ze-starych-zapisow/task.md:26-31` To do · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:6-10` Words used and Intent · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:12-28` Goals and non-goals · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:30-41` Constraints · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:103-136` 3. Which saves move and 4. What the browser does with the fetched previous document · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:166-176` 7. Units and their interfaces · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:232-239` Decisions settled after the review · `foundations/decisions.md:3287-3301` D-164 · `foundations/decisions.md:3302-3316` D-165 · `foundations/decisions.md:3337-3351` D-167 · `foundations/decisions.md:3367-3381` D-169 · `foundations/decisions.md:3978-4011` D-206 · `foundations/decisions.md:4260-4299` D-213 · `foundations/decisions.md:9458-9472` D-386 · `foundations/invariants.md:1028-1037` save-version · `foundations/invariants.md:838-847` saved-program-edit · `foundations/invariants.md:848-857` copy-save · `foundations/glossary.md:25-31` program · `foundations/glossary.md:199-203` trip plan · `foundations/part_map.md:30-60` simulation · E1 · E6 · E9 · E11 · E13 · E20 · E21 · E23 · `guidelines/coding.md` · `guidelines/coding-saved-game.md` · `src/browser/sim/saved-game.ts:70-110` the version constant and the saved document · `src/browser/sim/saved-game.ts:250-275` the program as the load reads it · `src/browser/sim/saved-game.ts:478-495` the list of programs as the load reads it · `tests/sim/saved-game.test.mjs:28-62` the old documents kept by hand · `tests/sim/saved-game.test.mjs:210-230` the document of version 1 · `tests/sim/saved-game.test.mjs:2195-2275` the crafted values that never throw · `tests/sim/program-fixture.mjs` · `stryker.config.json`
- **Model:** cheaper
- **Risk:** trust boundary — `src/browser/sim/previous-programs.ts` reads a document that came from the network (a boundary the part map gains, E23)
- **Checks:** `npm test -- tests/sim/previous-programs.test.mjs` · `npm test -- tests/sim/program-list.test.mjs` · `npm test -- tests/sim/saved-game.test.mjs` (unchanged, still green) · `npm test -- tests/quality/test_mutation_test_selection.py` · `npm test -- tests/invariants/test_simulation_isolation.py` · `npm test -- tests/invariants/test_simulation_inputs.py` · `npm run typecheck`; the new cases are written first and seen to fail. The review of the slice runs the mutation tool of `guidelines/testing.md` on the two changed simulation files.
- **Depends on:** Slice 2 (both change `guidelines/testing.md`) · E1 · E6 · E9 · E11 · E13 · E20 · E21 · E23

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

#### docs/task-cycles/programy-ze-starych-zapisow/spec.md lines 12-28 — Goals and non-goals

## Goals and non-goals

Goals:

- The server keeps one previous save per account, for every account, with or without the privilege (task point 1).
- An operator command grants and revokes the privilege (point 2); the `loop2-deploy` skill describes it (point 6).
- A privileged account with a previous save sees the button that appends the programs of that save (points 3, 4); a privileged account sees the reset control, with a confirmation (point 5).
- A document of any older version gives its programs one by one, each through the check of the editor; what the game does not admit is skipped and named.

Non-goals:

- Migration of whole saves between versions (out of scope of the task). The reader of this change reads programs and nothing else of a document.
- More than one previous save, a history, an undo of a pull, a pull that replaces the list, a pull that stops at the first refused program.
- An HTTP route that grants the privilege (D-137 forbids an operator HTTP route; only the container command does).
- A change of `GameState`, of `SAVED_GAME_VERSION`, of the load (`loadSavedGame`), of D-209, of D-213 or of the sentence of D-96 for a refused load.
- A deletion of the previous save by anything but the next move into the slot (or the deletion of the account, which cascades).
- A save made by the page before a reset, and any new state of the saver for the reset.

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

#### docs/task-cycles/programy-ze-starych-zapisow/spec.md lines 103-136 — 3. Which saves move and 4. What the browser does with the fetched previous document

### 3. Which saves move

Exactly two things put a document into the previous slot, and each replaces what the slot held:

1. An accepted save whose version is higher than the stored current save's version: the stored current save moves.
2. The reset, with a current save present.

Nothing else moves: an accepted save of the same version as the stored one (the stored one is overwritten, as today); a save refused as blocked, outdated or conflicting (it writes nothing, so it moves nothing); a first save of an account with no current save; the block or unblock of the account; the grant or the revoke of the privilege (the slot stays while the privilege is off and is there again when it is granted); a load. The slot is not read by the game's load and not written by the browser.

Price: two version bumps before the pull, or a reset before the pull, replace the older previous save and its programs; the confirmation of the reset must say so (decision 6). The task accepts this ("kolejne odłożenie nadpisuje wcześniejszy").

### 4. What the browser does with the fetched previous document

**Which code reads it.** A new simulation file, `src/browser/sim/previous-programs.ts`, outside `saved-game.ts` and outside the kind `saved-game`; its kind guideline is `guidelines/coding-simulation-module.md` (it neither turns a game state into a document nor a document into a game state or a refusal; it takes programs out of a document). `saved-game.ts`, `loadSavedGame`, D-213 and `guidelines/coding-saved-game.md` stay unchanged, and D-206 keeps the load whole-or-nothing; the pull is a second, separate act that reads less. The file has its own small checks (a plain object, an own data key, a list without holes) and imports from the simulation `checkProgram` and `ProgramCheckError` of `programs.ts` alone; it needs nothing exported from `saved-game.ts`. It is a new place where a document that came from the network is read, so the part map's *Trust boundary* of `simulation` gains it (decision 7, Foundation entries), and crafted documents are the subject of its test.

- *Input:* the document the client hands over, an `unknown`. *Output:* either "unreadable" or the programs read: for each item of the document's list of programs, in order, either a program with its name and its content as `checkProgram(content, null)` built it, or a skipped item with the name it is told by.
- *Unreadable* means: the document is not a plain object with an own `version` that is a safe integer from 1 up to the current `SAVED_GAME_VERSION` and an own `game` that is a plain object with an own `programs` that is a list without holes. A version above the current one is unreadable, because its shape is unknown to this code, which is the conservative reading; a version from 1 to the current is read, including the current (the reset puts a current-version document in the slot).
- *Items are read strictly, one by one.* An item is accepted only when it is a plain object with exactly the own data keys `id`, `name` and `program` (the shape every version from 1 to 5 wrote, as the history of `saved-game.ts` shows), its `name` is a text that is not empty after trimming, and `checkProgram(item.program, null)` accepts its program — the check the editor uses for a program (`editProgram`). An item that fails any of these is skipped and named, and the others go on: the item's name when it is a non-empty text, else its place on the list counted from 1. The value of `id` is not used and not checked: the pulled program gets a number of the present game. A refusal of the check is only `ProgramCheckError`; every other error propagates. Nothing of the document outside `version`, `game.programs` and the items is read.
- *Why one by one.* A program of version 2 has no trip plan and the check refuses it; a program naming an action or an item the data no longer has is refused by the closed lists; refusing one must not refuse the others (the task).
- The strict `matches` comparison of the load is not applied to a program's content: the editor's check builds the program from the closed lists and drops what it does not know, which is what "the same check as the editor" is.

**Appending.** A new function in `programs.ts` (beside `createProgram` and the naming functions it uses), not in the reader's file, takes a game state and the programs read and returns the game state with them appended at the end of the list in order, each with the next program number (`nextProgramId` rises by the count, D-165) and a name free on the list; nothing else of the game state changes: no copy, no count, no pick, no program used last. Names follow D-169's rule (trimmed, letter case ignored) and are taken one program at a time against the list including those just appended: the name as it stands if free; else the name, a space and `(n)` for the smallest n from 2 that makes it free — "Las (2)", and "Las (3)" when "Las (2)" is taken. A name that already ends in a number in parentheses gets another: "Las (2) (2)".

**What the player is told.** One result line in the Programs screen, after each pull, whose content is:

- how many programs were appended, when any were;
- one sentence naming the skipped programs by the names the reader gave them, all of them, when any were skipped (the task: "jednym zdaniem podaje nazwy pominiętych");
- when the document is unreadable, or readable with no program accepted and none skipped, one sentence that the previous save holds no programs this version of the game can read; nothing appended;
- the previous save is gone since the check (the answer is `null`): one sentence that there is none, and the control goes away;
- a failure of the fetch: one sentence that the previous save could not be fetched, the control kept for a retry; a 401 is handled as a save's 401 (D-211) through the page; a 403 `previous-save-forbidden` as one sentence that the account has no such privilege now.

The names of skipped programs come from the document and are shown only as text. After a pull the game saves at once, as it does after any act on the list of programs (D-207); a game that comes out over the limit gets the sentence of D-208 as any save does.

Ways considered for the reader: a lenient `loadSavedGame` for older versions — rejected, it is the migration D-213 forbids ("a lenient load that fills missing keys"); the reader inside `saved-game.ts` — rejected, it reads less than the kind's guideline allows ("Wolno odmówić więcej, niewolno mniej") and would change that guideline and D-213 for a function that is not a load; reading the old document's whole game state and picking programs from it — rejected, it reads what the task says the game does not read; items read leniently (any other key ignored) — rejected, the items had one shape in every version and strict items skip one by one the same way. Price if wrong: a program the reader accepts that the game's own load would refuse is impossible, because the same check admits both; a program wrongly skipped is lost for the pull but stays in the slot.

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

#### docs/task-cycles/programy-ze-starych-zapisow/spec.md lines 232-239 — Decisions settled after the review

## Decisions (settled by the orchestrator after the review of the spec)

Rulings R1–R5 of the cycle record (`cycle.md`, *Questions and autonomous choices*) are applied above. The reviewer of the revision (`reports/spec-revision-review-report.md`, `PASS`) left four notes for the maker, settled here as autonomous choices:

- The name the append writes is the trimmed one the reader returned (the game's load refuses an untrimmed name, so a crafted name must never reach a save).
- The trust boundaries named in *Constraints* include the new reader file, `src/browser/sim/previous-programs.ts`; where the lines of this spec disagree on whether the reader imports `SAVED_GAME_VERSION`, it imports it (the reader needs the highest readable version), and the maker reads "imports only simulation files" accordingly.
- The new file stays under the kind guideline `guidelines/coding-simulation-module.md`; its strict items already meet the wording of `guidelines/coding-saved-game.md`, which the maker reads as well.
- Nothing stops a reset while a logout waits; the logout's own continuation covers it (`app.ts` already holds the old saver's outcomes). No change.


## Foundation entries, read whole, each by its range as the worktree stands now

- `foundations/decisions.md:3287-3301` D-164
- `foundations/decisions.md:3302-3316` D-165
- `foundations/decisions.md:3337-3351` D-167
- `foundations/decisions.md:3367-3381` D-169
- `foundations/decisions.md:3978-4021` D-206
- `foundations/decisions.md:4279-4318` D-213
- `foundations/decisions.md:9477-9491` D-386
- `foundations/invariants.md:1028-1037` save-version
- `foundations/invariants.md:838-847` saved-program-edit
- `foundations/invariants.md:848-857` copy-save
- `foundations/glossary.md:25-31` program
- `foundations/glossary.md:199-204` trip plan
- `foundations/part_map.md` — the entry `simulation` (find it by its heading `## simulation`)

Entries of the plan the slice names by label, with the identifiers and ranges as the foundation stands now (read each whole):

- E1: `foundations/decisions.md:3978-4021` D-206
- E6: `foundations/decisions.md:3337-3351` D-167
- E6: `foundations/decisions.md:3367-3381` D-169
- E9: `foundations/decisions.md:9635-9649` D-393
- E11: `foundations/decisions.md:9665-9679` D-395
- E13: `foundations/invariants.md:1028-1037` save-version
- E20: `foundations/invariants.md:1338-1347` previous-save-programs-reader
- E21: `foundations/glossary.md:254-259` previous save
- E23: `foundations/part_map.md`, the entry `account-server` by its heading
- E23: `foundations/part_map.md`, the entry `simulation` by its heading

## Files and guidelines the *Read* names (read each guideline file whole; the code and tests as far as the slice needs)

- `guidelines/coding.md`
- `guidelines/coding-saved-game.md`
- `src/browser/sim/saved-game.ts:70-110` the version constant and the saved document`
- `src/browser/sim/saved-game.ts:250-275` the program as the load reads it`
- `src/browser/sim/saved-game.ts:478-495` the list of programs as the load reads it`
- `tests/sim/saved-game.test.mjs:28-62` the old documents kept by hand`
- `tests/sim/saved-game.test.mjs:210-230` the document of version 1`
- `tests/sim/saved-game.test.mjs:2195-2275` the crafted values that never throw`
- `tests/sim/program-fixture.mjs`
- `stryker.config.json`

## What you review

- Review, read-only, the slice 6 range `19ea8b1c..6a9283c4` with `review-change`, the executor's report `docs/task-cycles/programy-ze-starych-zapisow/reports/slice-6-executor-report.md`. Return `PASS 6a9283c4` or `FAIL 6a9283c4` as the first line of your report, graded findings, and the checks you ran.
- Trust boundary: yes — `src/browser/sim/previous-programs.ts` reads a document that came from the network (the part map names it a trust boundary of `simulation`). Check crafted input at it in earnest: a value of every kind at every place (null, arrays, objects with a prototype key or a getter-free JSON shape, huge or negative or fractional numbers, `__proto__` keys, deep or large lists, a list with a hole, a name that is no text), that no value makes it throw other than by an error of its own code, that the argument is left as it was and the result shares nothing with it, that only `version`, `game.programs` and the items are read, that each item is read strictly (exactly `id`, `name`, `program`), that a program is accepted only through `checkProgram(content, null)` and only `ProgramCheckError` is a refusal, that the appended name is the trimmed one the reader returned, and the numbering "Las (2)", "Las (3)", "Las (2) (2)" against D-169 (letter case ignored, one program at a time against the list including those just appended).
- Mutation testing: `guidelines/testing.md` asks the review of a simulation slice to run the mutation tool (StrykerJS) on the changed simulation files, here `src/browser/sim/previous-programs.ts` and `src/browser/sim/programs.ts`, as the guideline gives (the executor did not run it); run it as the guideline says and report the surviving mutants of the changed lines, or say why you could not.
- Gaps carried to you: the executor did not open the invariant `save-version` and did not read lines 129–327 and 341–412 of `tests/sim/program-list.test.mjs` before appending to it; it added `previous-save-programs-reader` to the *Trust boundaries* invariant line of `guidelines/testing.md` (not named by the plan; judge it); it named the reader's parameter `saved` because the isolation check flags `document`; it shows the trimmed name for a skipped item and returns a `GameState` from `appendPrograms`, not a `GameResult` (judge each against the spec and the neighbouring list functions).
- Foundation check: the executor reports `foundation_check.py` exit 0, 0 errors, at its commit; you may run it once and report its command and exit code.
- Minor findings of earlier slices are outside this range.

## Report

Write the full report to the report path by the method's form; return the status, your commits, a one-line check result naming what failed or did not run, the report path, your questions, the reach beyond this handoff, **Unread material** and **Searches not found or unclear** (each `none` where that is the answer), and the own-work check the method asks for.
