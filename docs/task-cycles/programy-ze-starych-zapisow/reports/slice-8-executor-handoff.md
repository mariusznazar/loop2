# Handoff — slice 8, executor

You are the executor of slice 8 of a plan, in a task cycle of the loop2 repository run by an orchestrator. The person who requested the cycle delegated intermediate choices to the orchestrator; your questions go to the orchestrator, never to the human, and no answer is the human's approval.

- Worktree (work from its root): `the task's worktree`, branch `task/programy-ze-starych-zapisow`; base of this slice: `72a395c729ed3c20f3f51373d11935a3fdb86d7e` (HEAD when this handoff was written).
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`), variant "a slice, or the retry of a slice" (the-way pinned at `55afa8e57aa1b83c77108576a36642722e0dda15`). Read the `SKILL.md` whole and a file it names only when the step or variant that names it comes. For a review: `.the-way/task-cycle/review/SKILL.md` (`the-way-review-change`).
- Frozen task: `docs/task-cycles/programy-ze-starych-zapisow/task.md`; reviewed spec: `docs/task-cycles/programy-ze-starych-zapisow/spec.md`; plan: `docs/task-cycles/programy-ze-starych-zapisow/plan.md`. Report path: `docs/task-cycles/programy-ze-starych-zapisow/reports/slice-8-executor-report.md`.
- The cycle's answers at start: trust boundary yes (`src/server/**`, `src/browser/sim/saved-game.ts`, and by the spec the new `src/browser/sim/previous-programs.ts`; every review checks crafted input there); irreversible operation no (the schema step only adds; granting the privilege is a human's command); reserved choice none; open design choice settled by the reviewed spec. D-209 and D-213 stay unchanged. The foundation entries of the change are already written and committed (commit `809fbf6b`); the entry labels E1–E24 of the plan name them: E1 D-206, E2 D-104, E3 D-109, E4 D-112, E5 D-210, E6 D-167/D-169, E7 D-354, E8 D-355, E9 D-393, E10 D-394, E11 D-395, E12 D-396, E13 `save-version`, E14 `account-client-outcomes`, E15 `account-session-authorization`, E16 `account-mutation-request-guards`, E17 `player-save-isolation`, E18 `account-schema-lifecycle` and `account-database-schema`, E19 `previous-save-slot` (new invariant), E20 `previous-save-programs-reader` (new invariant), E21 glossary "previous save", E22 glossary "previous-save privilege", E23 the part map, E24 D-44. Where the foundation entries and the spec seem to differ, the spec binds the code and you name the difference in your report.
- Where it applies to this stage: a check named below is run by you with its command and exit code in the report; no run of the product's gate (`npm test` without a file) and no `foundation_check.py` — the orchestrator runs those (one expected error of the foundation check stands until slice 6 creates `src/browser/sim/previous-programs.ts`).
- Commit with explicit `git add <paths>`, never `git add -A`; messages in English in the style of this repository's `git log`; `git commit -F <file>` where a message holds quotes.

## The slice's section of the plan, copied word for word

### Slice 8 — The reset control with its confirmation, on the screen Programy

- **Goal:** a privileged account sees „Zacznij od zera” in the game, behind a confirmation, and the game hands the confirmed act to the page. From decision 6 of the spec (the part named "The reset"), the task's point 5 and the guidelines of the view. The control stands in the list of programs beside the pull control (the plan's choice of place; the styleguide may force another, in which case the maker stops and says so), exists only for an account with the privilege and only where the page gave the game a callback for a confirmed reset (an option of `GameViewOptions`, optional, so that no page that gives none shows the control), and is a destructive shared button (D-44: a button that resets progress is destructive, neutral at rest and in `danger` under the pointer and at focus). Pressing it opens a confirmation and changes nothing else: it says that the present game goes to the place of the previous save, that a previous save already there is replaced and its programs cannot be pulled any more, and that the game starts from zero, with a way to confirm and a way to withdraw that changes nothing (the wording in Polish, in the voice of the existing sentences, and the shared controls of D-44 only). Confirming calls the callback once; while the page waits for the server the control shows its waiting state and is not pressable, and the game offers the page a way to set that state and to show one sentence beside the control (the 403 and the other failure of the reset) and to clear it; the control returns to rest after a failure. Leaving the screen or disposing the game closes the confirmation. A new rule of `src/browser/styles.css` reads tokens only. `guidelines/styleguide-browser-view.md` names the destructive buttons one by one in the rule that lists them („Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, …); the slice adds „Zacznij od zera” to that list and to any other line of the file that lists them, as a plain edit with the rest of the change (E24). Tests, the failing ones first, in `tests/view/program-list.test.mjs` for the control drawn from props (absent without the privilege or without the callback, opened, withdrawn, confirmed once, waiting, a sentence) and in `tests/view/previous-save.test.mjs` for the game view: the click that opens the confirmation sends nothing and changes nothing, the confirmation names the replacement of an earlier previous save, and no request for the reset is made by the game itself.
- **Change:** `src/browser/view/program-list.tsx` · `src/browser/view/game-view.ts` · `src/browser/styles.css` · `tests/view/program-list.test.mjs` · `tests/view/previous-save.test.mjs` · `guidelines/styleguide-browser-view.md`
- **Read:** `docs/task-cycles/programy-ze-starych-zapisow/task.md:26-31` To do · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:6-10` Words used and Intent · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:30-41` Constraints · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:149-164` 6. What the browser shows · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:166-176` 7. Units and their interfaces · `docs/task-cycles/programy-ze-starych-zapisow/spec.md:221-230` Left to the maker · `foundations/decisions.md:1036-1050` D-44 · `foundations/decisions.md:3317-3336` D-166 · `foundations/decisions.md:4012-4075` D-207 · `foundations/decisions.md:4096-4139` D-209 · `foundations/part_map.md:3-28` browser-view · E9 · E12 · E21 · E24 · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` · `src/browser/view/app.ts` · `tests/view/page-document.mjs` · `tests/view/end-question.test.mjs:1-150` the game view built on jsdom
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/view/program-list.test.mjs` · `npm test -- tests/view/react-controls.test.mjs` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm run typecheck`; the new cases are written first and seen to fail.
- **Depends on:** Slice 7 · E9 · E12 · E21 · E24

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

- `foundations/decisions.md:1036-1050` D-44
- `foundations/decisions.md:3317-3336` D-166
- `foundations/decisions.md:4022-4085` D-207
- `foundations/decisions.md:4106-4149` D-209
- `foundations/part_map.md` — the entry `browser-view` (find it by its heading `## browser-view`)

Entries of the plan the slice names by label, with the identifiers and ranges as the foundation stands now (read each whole):

- E9: `foundations/decisions.md:9635-9649` D-393
- E12: `foundations/decisions.md:9680-9694` D-396
- E21: `foundations/glossary.md:254-259` previous save
- E24: `foundations/decisions.md:1036-1050` D-44

## Files and guidelines the *Read* names (read each guideline file whole; the code and tests as far as the slice needs)

- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `src/browser/view/app.ts`
- `tests/view/page-document.mjs`
- `tests/view/end-question.test.mjs:1-150` the game view built on jsdom`

## What the earlier slices left

Slices 1 to 7 are committed (head `72a395c7`). Slice 7 put the pull control on the list of programs: read `src/browser/view/program-list.tsx`, `src/browser/view/game-view.ts`, `src/browser/view/previous-save-lines.ts` and `src/browser/view/app.ts` for the real props, option names and the way the pull's states are drawn and tested, and add your control beside it in the same manner. Decision D-396 (the reset) and D-44 (E24: „Zacznij od zera” is a destructive button) are already written in the foundation.

Rules from the reviews of earlier slices: (1) besides the checks named for the slice, run the formatter invariant of the gate on your changed files — `npm test -- tests/quality/test_quality_invariants.py` (or `npx prettier --check` with the flags and patterns at the top of that file); (2) a test that claims to cover a behaviour must fail when that behaviour is broken: after writing the tests, break the behaviour on purpose in two or three places (the control appearing without the privilege or without the callback, the confirmation changing something when opened, the callback called twice) and see the tests fail, restore byte for byte, and say so in the report with commands and exit codes. The styleguide `guidelines/styleguide-browser-view.md` says nothing of a destructive act's confirmation: build it from the shared controls of D-44 only, with the content the spec's decision 6, "The reset", gives, and say in the report which patterns you followed. This slice changes a user interface: read `.the-way/task-cycle/change/ui_check.md` where the method names it and follow the foundation's route for screenshots (decision D-357); screenshots go only to the place it names, never into the repository.

This slice has no review of its own (Risk none); the review of the whole change judges it.

## Report

Write the full report to the report path by the method's form; return the status, your commits, a one-line check result naming what failed or did not run, the report path, your questions, the reach beyond this handoff, **Unread material** and **Searches not found or unclear** (each `none` where that is the answer), and the own-work check the method asks for.
