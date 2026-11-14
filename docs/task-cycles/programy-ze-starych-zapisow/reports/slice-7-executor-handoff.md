# Handoff — slice 7, executor

You are the executor of slice 7 of a plan, in a task cycle of the loop2 repository run by an orchestrator. The person who requested the cycle delegated intermediate choices to the orchestrator; your questions go to the orchestrator, never to the human, and no answer is the human's approval.

- Worktree (work from its root): `the task's worktree`, branch `task/programy-ze-starych-zapisow`; base of this slice: `ea8de2c29a9aef16c8e1d270f9b40d98a99b4467` (HEAD when this handoff was written).
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`), variant "a slice, or the retry of a slice" (the-way pinned at `55afa8e57aa1b83c77108576a36642722e0dda15`). Read the `SKILL.md` whole and a file it names only when the step or variant that names it comes. For a review: `.the-way/task-cycle/review/SKILL.md` (`the-way-review-change`).
- Frozen task: `docs/task-cycles/programy-ze-starych-zapisow/task.md`; reviewed spec: `docs/task-cycles/programy-ze-starych-zapisow/spec.md`; plan: `docs/task-cycles/programy-ze-starych-zapisow/plan.md`. Report path: `docs/task-cycles/programy-ze-starych-zapisow/reports/slice-7-executor-report.md`.
- The cycle's answers at start: trust boundary yes (`src/server/**`, `src/browser/sim/saved-game.ts`, and by the spec the new `src/browser/sim/previous-programs.ts`; every review checks crafted input there); irreversible operation no (the schema step only adds; granting the privilege is a human's command); reserved choice none; open design choice settled by the reviewed spec. D-209 and D-213 stay unchanged. The foundation entries of the change are already written and committed (commit `809fbf6b`); the entry labels E1–E24 of the plan name them: E1 D-206, E2 D-104, E3 D-109, E4 D-112, E5 D-210, E6 D-167/D-169, E7 D-354, E8 D-355, E9 D-393, E10 D-394, E11 D-395, E12 D-396, E13 `save-version`, E14 `account-client-outcomes`, E15 `account-session-authorization`, E16 `account-mutation-request-guards`, E17 `player-save-isolation`, E18 `account-schema-lifecycle` and `account-database-schema`, E19 `previous-save-slot` (new invariant), E20 `previous-save-programs-reader` (new invariant), E21 glossary "previous save", E22 glossary "previous-save privilege", E23 the part map, E24 D-44. Where the foundation entries and the spec seem to differ, the spec binds the code and you name the difference in your report.
- Where it applies to this stage: a check named below is run by you with its command and exit code in the report; no run of the product's gate (`npm test` without a file) and no `foundation_check.py` — the orchestrator runs those (one expected error of the foundation check stands until slice 6 creates `src/browser/sim/previous-programs.ts`).
- Commit with explicit `git add <paths>`, never `git add -A`; messages in English in the style of this repository's `git log`; `git commit -F <file>` where a message holds quotes.

## The slice's section of the plan, copied word for word

### Slice 7 — The pull on the screen Programy

- **Goal:** a privileged account's screen Programy offers „Wciągnij programy z poprzedniego zapisu” while a previous save exists, and the button appends the programs of that save. From decisions 4 and 6 of the spec (the part named "The pull button"), the task's points 3 and 4 and the guidelines of the view. `GameViewOptions` of `src/browser/view/game-view.ts` gains the account's privilege (a boolean from the account the page names) and its `client` widens to the client's `loadPreviousSavedGame`; `src/browser/view/app.ts` passes both where it builds the game (a missing flag counts as false, so no existing test changes). The control stands in the list of programs (`src/browser/view/program-list.tsx`, which gets its state through its props, the page of the list keeping the memory) with the list's other acts, as a plain shared button (`ReactButton`), never for an account without the privilege and then never asking the server for anything. The game view asks `GET /api/previous-saved-game` when the screen Programy is shown, only for a privileged account; while the question is open the button is not shown; a document shows it; `null` or a failure leaves it away, and a failure of the check shows one sentence that the previous save could not be checked (the next opening asks again); an answer that arrives after the player left the screen or the game was disposed is ignored. The button is available whenever the screen is shown, including while a manual map run waits or goes on. Pressed: it shows its waiting state and is not pressable; the view fetches the previous save again, so that the pull works on what the server holds now; the reader of slice 6 reads the document; the append of slice 6 puts the programs read on the list as an act of the player through the one place every act passes (`act`), so that the game saves at once (D-207) and a state over the limit gets D-208's sentence as any save does; then one result line stands next to the control: how many programs were appended where any were; one sentence naming all the skipped programs by the names the reader gave them where any were; one sentence that the previous save holds no programs this version of the game can read where the document is unreadable or nothing was accepted and nothing skipped; one sentence that there is no previous save where the answer is `null`, the control then going away; one sentence that the previous save could not be fetched for a failed fetch, the control kept for a retry; a 401 handled as a save's 401 (D-211) through `onSignedOut`; a 403 `previous-save-forbidden` as one sentence that the account has no such privilege now. The names shown come from the document and are shown only as text. The button returns to rest and stays while the previous save exists (a second press appends copies again). The Polish wording of every sentence is the maker's, in the voice of the existing ones and in the roles of the styleguide (a result in `text`, a failure in `warning`, never `positive` or `danger` for a pull); a new rule of `src/browser/styles.css` reads tokens only. Tests, the failing ones first: in `tests/view/program-list.test.mjs` the states of the control drawn from props; in the new `tests/view/previous-save.test.mjs` the game view built as `tests/view/end-question.test.mjs` builds it, with a client that answers when the case chooses: no request and no control for an account without the privilege or without the flag, the order of the states while the question is open, a pull that appends in order with the numbering and saves at once, skipped names in one sentence, unreadable, `null`, a failure, 401 and 403, a late answer after leaving the screen, and a pull while a manual map run waits.
- **Change:** `src/browser/view/program-list.tsx` · `src/browser/view/game-view.ts` · `src/browser/view/app.ts` · `src/browser/styles.css` · `tests/view/program-list.test.mjs` · `tests/view/previous-save.test.mjs`
- **Read:** `docs/task-cycles/programy-ze-starych-zapisow/task.md:26-31` To do · `docs/task-cycles/programy-ze-starych-zapisow/task.md:72-77` Context · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:6-10` Words used and Intent · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:30-41` Constraints · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:114-136` 4. What the browser does with the fetched previous document · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:149-153` 6. What the browser shows, the pull button · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:166-176` 7. Units and their interfaces · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:221-230` Left to the maker · `foundations/decisions.md:3287-3301` D-164 · `foundations/decisions.md:3317-3336` D-166 · `foundations/decisions.md:3337-3351` D-167 · `foundations/decisions.md:3367-3381` D-169 · `foundations/decisions.md:3978-4011` D-206 · `foundations/decisions.md:4012-4075` D-207 · `foundations/decisions.md:4076-4095` D-208 · `foundations/decisions.md:4167-4202` D-211 · `foundations/decisions.md:1036-1050` D-44 · `foundations/glossary.md:25-31` program · `foundations/part_map.md:3-28` browser-view · E1 · E6 · E9 · E11 · E21 · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` · `src/browser/account-api.ts` · `src/browser/sim/programs.ts` · `tests/view/page-document.mjs` · `tests/view/end-question.test.mjs:1-150` the game view built on jsdom · the file made by Slice 6, src/browser/sim/previous-programs.ts
- **Model:** same — an asynchronous flow in the 1000-line game view that meets stale answers, a save and several screens, which a cheaper model is likely to wire wrongly
- **Risk:** none
- **Checks:** `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/view/program-list.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/end-question.test.mjs` · `npm test -- tests/view/react-controls.test.mjs` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm run typecheck`; the new cases are written first and seen to fail.
- **Depends on:** Slice 5 · Slice 6 · E1 · E6 · E9 · E11 · E21

## Passages of the task, the spec and the plan the *Read* names, copied word for word

#### docs/task-cycles/programy-ze-starych-zapisow/task.md lines 26-31 — To do

1. Serwer trzyma przy każdym koncie, z uprawnieniem czy bez, jeden poprzedni zapis gry: zapis, który zastąpił przyjęty zapis wyższej wersji albo reset (punkt 5), przechodzi na to miejsce i nadpisuje wcześniejszy poprzedni zapis; poprzedni zapis ma ten sam limit 64 KiB co zapis gry.
2. Konto ma uprawnienie, które człowiek nadaje i zdejmuje poleceniem uruchamianym w kontenerze `loop2`, tak jak blokadę konta (D-137); polecenie mówi, że nadało albo zdjęło uprawnienie, że konto już było w żądanym stanie albo że konta o tym adresie nie ma. Jedno uprawnienie obejmuje wciąganie programów (punkty 3–4) i reset (punkt 5).
3. Na koncie z uprawnieniem, gdy poprzedni zapis istnieje, ekran Programy ma przycisk „Wciągnij programy z poprzedniego zapisu”, dostępny w dowolnej chwili; na koncie bez uprawnienia albo bez poprzedniego zapisu przycisku nie ma.
4. Przycisk dopisuje na koniec listy programy z poprzedniego zapisu: program o nazwie zajętej na liście dostaje kolejny numer, np. „Las (2)”; programu, którego dzisiejsza gra nie przyjmuje (np. czynność albo przedmiot, których już nie ma), gra nie dopisuje i jednym zdaniem podaje nazwy pominiętych. Każdy program przechodzi to samo sprawdzenie co program z edytora; reszty poprzedniego zapisu gra nie czyta.
5. Na koncie z uprawnieniem gra ma przycisk „Zacznij od zera” z potwierdzeniem: po potwierdzeniu bieżący zapis przechodzi na miejsce poprzedniego zapisu, a gra startuje od nowa, więc programy da się potem wciągnąć punktem 3.
6. Skill wdrożenia `loop2-deploy` opisuje polecenie uprawnienia z punktu 2, tak jak opisuje polecenie blokady konta.

#### docs/task-cycles/programy-ze-starych-zapisow/task.md lines 72-77 — Context

- Źródło nie jest zatwierdzoną definicją projektu (`status: draft`), więc zadanie jest niezależne, a cytat z „Kierunek” 4 służy jako uzasadnienie potrzeby.
- Część „docelowo postęp przechodzi między wersjami” (migracje zapisu gry) należy do osobnej sprawy: według źródła migracje „wchodzą najpóźniej przed pierwszym obcym graczem” (the architecture note of the project, karta D19).
- Programy sprawdza dziś funkcja `checkProgram` (`src/browser/sim/programs.ts:238`) — ta sama, która przyjmuje program z edytora; wczytanie zapisu jest ścisłe (D-213).
- Wzór polecenia operatora w kontenerze: blokada konta (`src/server/account-block.ts`, D-137).
- Programów z zapisów zastąpionych przed wdrożeniem tego zadania gra nie odzyska: tamte zapisy są już nadpisane na serwerze.
- Miejsce przycisku „Zacznij od zera” na ekranie wybiera cykl według wytycznych wyglądu widoku.

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

#### docs/task-cycles/programy-ze-starych-zapisow/spec.md lines 114-136 — 4. What the browser does with the fetched previous document

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

#### docs/task-cycles/programy-ze-starych-zapisow/spec.md lines 149-153 — 6. What the browser shows, the pull button

### 6. What the browser shows

The task fixes the buttons' names and the confirmation of the reset; the maker places the reset control by `guidelines/styleguide-browser-view.md`, and the spec fixes only this about it: the control exists only for an account whose account answer says `previousSaveAllowed`; it is in the game (not outside it); and it is behind the confirmation, the click that opens the confirmation changing nothing. For any other account nothing of it is in the page and no request for the previous save or the reset is ever sent.

**The pull button.** It stands on the Programs screen, with the list's other acts (the screen of D-166/D-167), is available whenever that screen is shown, including while a manual map run waits or goes on, and exists only when the check below says the previous save exists. A privileged account's Programs screen asks `GET /api/previous-saved-game` when the screen is shown (the answer is used only to show or hide the button; nothing is kept between openings). While the question is open the button is not shown. An answer of a document shows it; `null` or a failure leaves it away (a failure of the check shows one sentence that the previous save could not be checked; the next opening asks again). Pressed: the button shows its waiting state and is not pressable; the page fetches the previous save again (so the pull works on what the server holds now); the result decision 4 gives is shown; the button returns to its resting state and stays while the previous save exists (a second press appends copies again, as the task accepts). The sentence of a result or a failure stands next to the control it answers.

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

#### docs/task-cycles/programy-ze-starych-zapisow/spec.md lines 221-230 — Left to the maker

## Left to the maker

- The Polish wording of every sentence of decisions 4 and 6, in the voice of the existing ones, and the roles the styleguide gives them.
- The place of the reset control, its confirmation's layout and the waiting states, by the styleguide; the exact names of the new methods, types, columns, table and codes (the names above are the spec's proposal where it gives one).
- How the page holds the old saver's outcomes during the reset (decision 6, step 2): by the existing mechanism of the logout or by a similar guard of its own; the spec binds the behaviour.
- How the Programs screen asks the question of the existence of the previous save and hands the answer to the button; how the view gets the client's two new methods.
- Whether the append function returns the final names or the page recomputes the count.
- The tests: which cases, their fixtures (a database of schema version 4 written in a test by its own schema, per the database guidelines; documents of versions 1 to 5 for the reader, with a version 1 program that lacks a trip plan, items with a foreign key or a missing key, and other crafted documents), and the changes to the existing tests that decision 7 lists.
- Whether the sentence for skipped programs shortens a very long list of names (the task says it names them; nothing in the spec shortens it).
- The text of the skill's new section and of the edited passages, and the exact paragraphs of `troubleshooting.md`; the `.agents` copy of `SKILL.md` stays byte-identical to the `.claude` one.


## Foundation entries, read whole, each by its range as the worktree stands now

- `foundations/decisions.md:3287-3301` D-164
- `foundations/decisions.md:3317-3336` D-166
- `foundations/decisions.md:3337-3351` D-167
- `foundations/decisions.md:3367-3381` D-169
- `foundations/decisions.md:3978-4021` D-206
- `foundations/decisions.md:4022-4085` D-207
- `foundations/decisions.md:4086-4105` D-208
- `foundations/decisions.md:4186-4221` D-211
- `foundations/decisions.md:1036-1050` D-44
- `foundations/glossary.md:25-31` program
- `foundations/part_map.md` — the entry `browser-view` (find it by its heading `## browser-view`)

Entries of the plan the slice names by label, with the identifiers and ranges as the foundation stands now (read each whole):

- E1: `foundations/decisions.md:3978-4021` D-206
- E6: `foundations/decisions.md:3337-3351` D-167
- E6: `foundations/decisions.md:3367-3381` D-169
- E9: `foundations/decisions.md:9635-9649` D-393
- E11: `foundations/decisions.md:9665-9679` D-395
- E21: `foundations/glossary.md:254-259` previous save

## Files and guidelines the *Read* names (read each guideline file whole; the code and tests as far as the slice needs)

- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `src/browser/account-api.ts`
- `src/browser/sim/programs.ts`
- `tests/view/page-document.mjs`
- `tests/view/end-question.test.mjs:1-150` the game view built on jsdom`
- `the file made by Slice 6, src/browser/sim/previous-programs.ts`

## What the earlier slices left

Slices 1 to 6 are committed (head `ea8de2c2`). The client of slice 5 (`src/browser/account-api.ts`: `loadPreviousSavedGame`, `resetSavedGame`, the `Account` field `previousSaveAllowed`) and the reader and append of slice 6 (`src/browser/sim/previous-programs.ts` and the append function in `src/browser/sim/programs.ts`) exist; read them for their real names, signatures and result shapes before you wire the view; the spec's names were proposals. The foundation check passes at the head (the part-map pattern of the reader's file is now satisfied).

Two rules from the reviews of earlier slices apply to you: (1) run, besides the checks named for the slice, the formatter invariant of the gate on your changed files — `npm test -- tests/quality/test_quality_invariants.py` (or `npx prettier --check` with the flags and patterns at the top of that file) — because Prettier rejecting a changed file fails the gate; (2) a test that claims to cover a behaviour must fail when that behaviour is broken: after writing the tests, break the behaviour on purpose in two or three places (the 'no request without the privilege' rule, the stale-answer rule, the order of states) and see the tests fail, restore the code byte for byte, and say so in the report with the commands and exit codes.

This slice has no review of its own (Risk none); the review of the whole change judges it, and it runs the real view in a browser if it can, so say in the report what you saw of the states.

## Report

Write the full report to the report path by the method's form; return the status, your commits, a one-line check result naming what failed or did not run, the report path, your questions, the reach beyond this handoff, **Unread material** and **Searches not found or unclear** (each `none` where that is the answer), and the own-work check the method asks for.
