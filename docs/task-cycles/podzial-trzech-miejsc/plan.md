# Plan — loop2: podzielić trzy miejsca ponad limitem rozmiaru — startApp, createProgramsEntry i plik strony wspólnych kontrolek

- Task: `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md`
- Spec: none
- Base: `fc6e0046`

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| The last paragraph of the rule "The kitchen-sink page" of `guidelines/styleguide-browser-view.md`: code needed only by the page stays in the directory `src/browser/kitchen-sink/`, with the reason that it does not reach the output of `npm run build` kept | a sentence of the styleguide, written in its place by the cycle's author (task question 4); no element entry | row 1 of *Settlements to record*; To do 4 | Slice 1, which writes it with the code it allows |
| `function-and-file-size` set to `Violated: no`; check: `tests/quality/test_function_and_file_size.py`, case `test_no_function_and_no_file_is_over_a_threshold`, without its expected-failure mark | invariant, through `the-way-record-invariant` | To do 6 | Slice 5, which writes it once Slice 4 has cleared the last place and taken the mark off the test (WAY-69); never written before Slice 4, since it would say `no` while code stands over a threshold |
| D-323, its sentence on what gives way after an error no code of the game handled, agreed with D-311 and D-371: whether the end-of-run window is open is a memory of the page, so the window still opens after the error, at the end of the scene's effect and by „Koniec przejścia” (the choice of the window's reach is in *Choices*) | decision, changed through `the-way-record-decision` | To do 8 | Slice 6; written by the agent of these entries before Slice 1, in a commit of its own apart from the split |
| `uncaught-failure-game-state`, agreed with the changed D-323, changed only where its wording no longer holds; check: `tests/view/run-screen-state.test.mjs`, the guard case "after halt the question, the window and the wait change nothing, while entering and leaving go on", and `tests/view/uncaught-failure.test.mjs` | invariant, through `the-way-record-invariant` | To do 8 | Slice 6; written with D-323 by the agent of these entries before Slice 1 |

## Slices

### Slice 1 — the kitchen-sink page in modules of its own directory

- **Goal:** `src/browser/kitchen-sink/kitchen-sink.tsx` (890 lines of code at the base, threshold 800) is divided by groups of samples into modules that stand directly in `src/browser/kitchen-sink/` — not in a subdirectory, which `tsconfig.kitchen-sink.json` does not include, and never in `src/browser/view/`, which `npm run build` compiles: `sample-parts.tsx`, what several groups share (`Section`, the reason a state does not apply, the wrapper `Forced` of the held hover and focus, the figure `FormFigure` with its name, `IconMask` and the list of icon files); `control-samples.tsx`, the shared controls in their seven states (the states, the reasons, the samples, the table of controls, its section, and the ref of the empty number field's input, which the entry reads); `account-samples.tsx`, the forms waiting for the server and the part of the menu „Konto”; `role-samples.tsx`, the roles; `tile-samples.tsx`, the tiles. The entry `kitchen-sink.tsx` keeps `PAGE_MARKER` (exported, since the probe of `tests/invariants/test_application_build_kitchen_sink.py` imports it from `./kitchen-sink/kitchen-sink.js`), `Page`, `typeEmptyInto` and the first draw, and stays the one module that marks the body and renders. The code moves without a change of what the page draws: the same samples, in the same order, in the same states, with the same classes and texts. Measured at the base, the groups hold about 300 lines of code (the controls, less the shared parts), 220 (the forms and the menu), 110 (the roles), 170 (the tiles), 50 (the shared parts) and 60 (the entry), so each file stays far under 800 and no function grows. Each new module starts with a comment that says what it holds; the entry's comment no longer says that code only the page needs stays in that module. In the same slice, the last paragraph of the rule "The kitchen-sink page" of `guidelines/styleguide-browser-view.md` is written to the meaning of row 1 of the task's *Settlements to record* (task questions 1 and 4): code needed only by the page stays in the directory `src/browser/kitchen-sink/`, beyond that directory the page imports only modules the game uses, and the reason stays that such code in `src/browser/view/` would reach the output of `npm run build`; no other sentence of the styleguide changes. The picture of the page is collected before the first change of code, on the slice's base: `npm run kitchen-sink` started as a background command (it builds the page, prints `Kitchen-sink page: http://127.0.0.1:<port>/` and opens the default browser too); then Playwright CLI as `.claude/skills/loop2-play/SKILL.md` gives it, in a session of its own: `playwright-cli open <address>`, the markup of the page's host written to `before.html` (`document.querySelector(".sample-page").outerHTML` through `playwright-cli --raw eval`), a screenshot of the whole page as `before.png`, and `playwright-cli console error`. Both files stand in the agent's directory for working copies under `.runs/`; the screenshot the tool writes into `.playwright-cli/` is moved there and the original removed. The command is then stopped and the browser session closed. After the split the same steps give `after.html` and `after.png`: `after.html` equals `before.html` byte for byte (a `cmp` of the two prints nothing), the two screenshots are looked at side by side for the same sections, samples, order and states, and the console holds no error. No screenshot is committed, kept in the cycle's record or shown to the human; the report gives the result of each comparison, where the files stood and that they were removed.
- **Change:** `src/browser/kitchen-sink/kitchen-sink.tsx` · `src/browser/kitchen-sink/sample-parts.tsx` · `src/browser/kitchen-sink/control-samples.tsx` · `src/browser/kitchen-sink/account-samples.tsx` · `src/browser/kitchen-sink/role-samples.tsx` · `src/browser/kitchen-sink/tile-samples.tsx` · `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:24-29` To do ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:35-39` Acceptance criteria ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:43-48` Questions to settle, question 1 ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:58-63` Questions to settle, question 4 ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:71-85` Context and Questions carried to cycle ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:98-108` Settlements to record and Out of scope ·
  `foundations/decisions.md:4899-4913` D-45 · `foundations/decisions.md:4340-4372` D-269 ·
  `foundations/decisions.md:4263-4310` D-265 · `foundations/decisions.md:822-840` D-425 ·
  `foundations/decisions.md:4722-4736` D-421 ·
  `foundations/invariants.md:498-507` application-build-kitchen-sink ·
  `foundations/invariants.md:1408-1417` function-and-file-size ·
  `foundations/invariants.md:408-417` eslint-source-rules · `foundations/invariants.md:438-447` prettier-source-format ·
  `foundations/invariants.md:458-467` browser-view-token-values ·
  `foundations/part_map.md:3-32` browser-view · `foundations/part_map.md:90-125` build-tools ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `src/browser/AGENTS.md` ·
  `tsconfig.kitchen-sink.json` · `tsconfig.browser.json` · `scripts/kitchen-sink.mjs` ·
  `src/browser/kitchen-sink/index.html` · `tests/invariants/test_application_build_kitchen_sink.py` ·
  `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md`
- **Model:** same - a split of 890 lines with a picture to compare and a styleguide sentence to write is more than a mechanical move; no review of its own judges it before the whole-change review (class raised by the orchestrator in the plan's review, WAY-229)
- **Risk:** none
- **Checks:** the comparison of the page before and after the split given in *Goal* (`cmp` of `before.html` and `after.html` prints nothing; screenshots looked at; no console error) ·
  `npm run kitchen-sink -- --build-only` (the one compile of the page; it fails on a type error) ·
  `node tests/quality/eslint-size-rules.mjs` names no file of `src/browser/kitchen-sink/` and no place the base did not name ·
  `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/kitchen-sink` ·
  `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore "src/browser/kitchen-sink/**/*.{ts,tsx,css,html}"` ·
  `npm test -- tests/invariants/test_application_build_kitchen_sink.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_cross_part_imports.py` ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** none

### Slice 2 — the drawing of the start page in a module of its own

- **Goal:** The drawing of the start page moves out of `startApp` in `src/browser/view/app.ts` into a new module `src/browser/view/page-places.ts`, with no change of behaviour: the types of what the page shows (`PageState`, `GamePage`, `Logout`, `Reset`), what the bar is given in a state (`barPropsOf`, `sameBarProps`, `NAME_ALONE`, `NO_SENTENCES`), and a factory that builds the places of the page — the header with the menu bar and the row of the failure (drawn at the start, hidden), and `main` with the page's sentences and the waiting screen — and holds what the page shows and what the bar and the row of sentences were last given, with the one change of what the page shows (`release`, `mainContent`, `drawMain`, `draw`, `change`) and the reading of the game the page holds (`gameOf`). The factory takes from the page what the places call back (the bar's logout and the waiting screen's retry) and gives the page what it reads and calls: the current value, `change`, `gameOf`, the row of the failure, the waiting screen's focus of its retry where the page needs it, and the header and `main` to append to the root. The order of the elements in the document, the moment each root is drawn and the order of the steps of `change` stay as they are (D-262, D-381, D-407). No call of `screen-address.ts`, `email-confirmation.ts` or `password-reset.ts` moves in this slice: they stay in `startApp`, and where the agent finds it has to move one, it stops and returns. Measured at the base, the types and the bar's props hold about 60 lines of code of `app.ts` and the places and the drawing about 90 of `startApp`, so `page-places.ts` holds about 160 and `startApp` comes to about 360: it stays over the threshold, and the mark and the comment of `test_no_function_and_no_file_is_over_a_threshold` stay as they are. The descriptions of `guidelines/coding-browser-module.md` that name what this slice moves — that the page (`app.ts`) builds the header and `main` (rule "Nowy ekran i moduły w DOM"), that `app.ts` creates the bar and the waiting screen in `startApp` (examples "Pasek menu w Reactcie" and "Kontrolki i ich aktualizacja"), and that `change` closes and draws (example "Gra na stronie i odpowiedzi serwera") — say where the code stands after the slice (To do 7); no other sentence changes, and the table "Files of this kind" gets no row (task *Out of scope*).
- **Change:** `src/browser/view/app.ts` · `src/browser/view/page-places.ts` · `guidelines/coding-browser-module.md`
- **Read:** `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:24-39` To do and Acceptance criteria ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:71-85` Context and Questions carried to cycle ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:106-108` Out of scope ·
  `foundations/decisions.md:822-840` D-425 · `foundations/decisions.md:4645-4661` D-407 ·
  `foundations/decisions.md:4263-4310` D-265 · `foundations/decisions.md:3139-3189` D-262 ·
  `foundations/decisions.md:3215-3227` D-381 ·
  `foundations/decisions.md:4613-4629` D-323, as row 3 of *Foundation entries* changed it ·
  `foundations/decisions.md:4402-4471` D-280 · `foundations/decisions.md:4592-4612` D-286 ·
  `foundations/invariants.md:1408-1417` function-and-file-size ·
  `foundations/invariants.md:1218-1227` uncaught-failure-game-state ·
  `foundations/invariants.md:408-417` eslint-source-rules · `foundations/invariants.md:438-447` prettier-source-format ·
  `foundations/part_map.md:3-32` browser-view ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/menu-bar.tsx:35-101` · `src/browser/view/waiting-screen.tsx` ·
  `src/browser/view/page-sentences.tsx` · `src/browser/view/header-rows.tsx` ·
  `src/browser/view/game-view.ts:95-172` · `src/browser/view/account-card.tsx:56-109`
- **Model:** same - moving closures that share mutable page memory out of `startApp`, where the tests of `tests/view/` cover the behaviour only in part, asks for more care than a mechanical move (class raised by the orchestrator in the plan's review, WAY-229)
- **Risk:** none
- **Checks:** `npm run typecheck` ·
  `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view/app.ts src/browser/view/page-places.ts` ·
  `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/app.ts src/browser/view/page-places.ts` ·
  `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/login-card-focus.test.mjs` ·
  `npm test -- tests/view/owner-panel.test.mjs` · `npm test -- tests/view/previous-save.test.mjs` ·
  `npm test -- tests/view/uncaught-failure.test.mjs` · `npm test -- tests/view/menu-bar.test.mjs` ·
  `node tests/quality/eslint-size-rules.mjs` names nothing of `page-places.ts`, names `startApp` with fewer lines than 449, and no place the base did not name ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** none

### Slice 3 — the rest of startApp under the threshold

- **Goal:** `startApp` in `src/browser/view/app.ts` holds at most 200 lines of code, aiming at about 150 or fewer, with no change of behaviour. The nested functions that remain in it after Slice 2 leave it as functions at module level that receive what they share with the page as a parameter — the places of `src/browser/view/page-places.ts`, one record of the page's memory that outlives a change of kind (the values that stand today as `let` in `startApp`: the notice that waits, the registration's message, whether the game replaces one that lost a conflict, the entry of the next game, the state kept after 401, the number of the last request, the failure, and the card's focus after a refused link or „Anuluj”), the client and the address — rather than nesting in another factory, whose one function would again count all their lines (D-425). The acts on a standing game — the logout (`logOut`, `setLogout`), the reset of the game (`resetGame`), the holding of the saver's outcomes (`whenNotBusy`) and the game's place (`onPlace`) — go to a new module `src/browser/view/page-game-acts.ts`. The session check, the load, the card and the building of a game (`checkSession`, `loadGame`, `enter`, `showGame`, `showForms`, `expire`, `reloadAfterConflict`, `placeCard`, `focusCard`, `waitForServer`, `askingFailed`, `loadFailed`, `leaveGame`, `takeNotice`) stay in `app.ts` at module level beside `startFrom`, so that the console line of a load that failed keeps its place `view/app.startFrom` true. `startApp` keeps the making of the places and of the memory, the last-resort handling (`onUncaught`, `reportLine`, `installLastResort`), the entry from the address — `start` and `showReset`, which read the reset token and the confirmation token of the address — and the first draw. There is no import cycle: what a function of `page-game-acts.ts` calls back in `app.ts` it receives through its parameter. Every call of a file of the trust boundary of `browser-view` keeps its arguments and what its result leads to: `screenAddress` in the game's place, which moves; `readResetToken`, `readConfirmationToken` and `confirmFromAddress` in the entry from the address, which stays; `browserAddress` as the default address of `startApp`. The places of the log lines, `view/app.startFrom` and `view/account-card.createAccountCard`, stay as they are; one transition at a time and the ignoring of a late answer through the number of the last request work as before. Measured at the base, the acts on a standing game hold about 105 lines of code, so `page-game-acts.ts` holds about 130 with its parameters and `app.ts` about 360. The descriptions of `guidelines/coding-browser-module.md` that name `startApp` or `app.ts` and what this slice moves — in the example "Gra na stronie i odpowiedzi serwera", that the values which outlive a change between kinds „stoją w `startApp` osobno”, and the sentences on „Wyloguj” and on `installLastResort` — say where the code stands after the slice (To do 7); no other sentence changes, and the table "Files of this kind" gets no row. At the end `node tests/quality/eslint-size-rules.mjs` names no function or file of `app.ts`, `page-places.ts` or `page-game-acts.ts`; the mark and the comment of `test_no_function_and_no_file_is_over_a_threshold` stay, since `createProgramsEntry` still stands over the threshold.
- **Change:** `src/browser/view/app.ts` · `src/browser/view/page-game-acts.ts` · `src/browser/view/page-places.ts` · `guidelines/coding-browser-module.md`
- **Read:** `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:24-39` To do and Acceptance criteria ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:71-85` Context and Questions carried to cycle ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:106-108` Out of scope ·
  `foundations/decisions.md:822-840` D-425 · `foundations/decisions.md:4645-4661` D-407 ·
  `foundations/decisions.md:4263-4310` D-265 ·
  `foundations/decisions.md:4613-4629` D-323, as row 3 of *Foundation entries* changed it ·
  `foundations/decisions.md:3139-3189` D-262 · `foundations/decisions.md:3215-3227` D-381 ·
  `foundations/decisions.md:2966-2980` D-96 · `foundations/decisions.md:2981-3008` D-97 ·
  `foundations/decisions.md:3953-3999` D-209 · `foundations/decisions.md:4035-4076` D-211 ·
  `foundations/decisions.md:656-700` D-213 · `foundations/decisions.md:3556-3595` D-225 ·
  `foundations/decisions.md:4201-4217` D-402 · `foundations/decisions.md:4472-4517` D-281 ·
  `foundations/decisions.md:4592-4612` D-286 · `foundations/decisions.md:2148-2162` D-356 ·
  `foundations/decisions.md:1962-2012` D-253 ·
  `foundations/invariants.md:1388-1397` page-address-fragment ·
  `foundations/invariants.md:1218-1227` uncaught-failure-game-state ·
  `foundations/invariants.md:998-1007` expired-session-unsaved-progress ·
  `foundations/invariants.md:1408-1417` function-and-file-size ·
  `foundations/invariants.md:1228-1237` cross-part-imports ·
  `foundations/invariants.md:408-417` eslint-source-rules · `foundations/invariants.md:438-447` prettier-source-format ·
  `foundations/part_map.md:3-32` browser-view ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/last-resort.ts` · `src/browser/view/email-confirmation.ts` ·
  `src/browser/view/password-reset.ts` · `src/browser/view/game-view.ts:95-172` ·
  `src/browser/view/account-card.tsx:56-109` ·
  every other invariant of `foundations/invariants.md` whose *Part* names `browser-view` and which the moved code reaches (WAY-62), in particular those about the confirmation of an email address, the reset of a password and the address of the page - search by *Part* and by those words (added by the orchestrator in the plan's review)
- **Model:** strongest — dividing one closure over shared mutable memory between module-level functions and a new module, with no change of behaviour, is design work.
- **Risk:** trust boundary — the call sites in `startApp` of `src/browser/view/screen-address.ts`, `src/browser/view/email-confirmation.ts` and `src/browser/view/password-reset.ts` move or are rewired
- **Checks:** `npm run typecheck` ·
  `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view/app.ts src/browser/view/page-places.ts src/browser/view/page-game-acts.ts` ·
  `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/app.ts src/browser/view/page-places.ts src/browser/view/page-game-acts.ts` ·
  `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/login-card-focus.test.mjs` ·
  `npm test -- tests/view/owner-panel.test.mjs` · `npm test -- tests/view/previous-save.test.mjs` ·
  `npm test -- tests/view/uncaught-failure.test.mjs` · `npm test -- tests/view/menu-bar.test.mjs` ·
  `npm test -- tests/view/screen-address.test.mjs` · `npm test -- tests/view/email-confirmation.test.mjs` ·
  `npm test -- tests/view/password-reset.test.mjs` ·
  `node tests/quality/eslint-size-rules.mjs` names nothing of `app.ts`, `page-places.ts` or `page-game-acts.ts` and no place the base did not name ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 2

### Slice 4 — createProgramsEntry under the threshold, and the size test without its mark

- **Goal:** `createProgramsEntry` (245 lines of code at the base) and its method `build` (225) in `src/browser/view/programs-entry.ts` hold at most 200 lines of code each, aiming at about 170 or fewer, with no change of behaviour: the pull of the previous save as Programy holds it (the value `pull`, the numbering of questions and pulls `pullAsk`, `askPrevious`, `pullPrevious`, `answerPull`, `setPull` and the pull's part of leaving Programy) moves to a new module `src/browser/view/programs-pull.ts`, and the memory of the reset control (`ResetState`, `resetViewOf`, `setResetState`, `askReset`, `withdrawReset`, `confirmReset`, and the reset's part of leaving Programy and of `setReset`) to a new module `src/browser/view/programs-reset.ts`. Each is a factory of a memory of the page outside React (D-401, D-402, D-407), which `build` makes and from which it draws the list as it does today: a question asked on entering Programy, an answer after `dispose()`, after leaving or after a later question or pull ignored, the act of the pull taken through the store, and nothing done after `halt()`, all as before. The options of the entry and its type `ProgramsEntry` do not change, so `src/browser/view/game-view.ts` does not change. Measured at the base, the pull holds about 70 lines of code of `build` and the reset control about 35, so `build` comes to about 130 and `createProgramsEntry` to about 150. This is the slice in which the run of the size rule stops reporting anything, so it carries the test's part of To do 6: once the code is divided, `node tests/quality/eslint-size-rules.mjs` prints no line and ends with `0 functions and files over a threshold`; then, in the same slice and its same commit, `@unittest.expectedFailure` goes from `test_no_function_and_no_file_is_over_a_threshold` in `tests/quality/test_function_and_file_size.py` together with the comment above it that names the places („Expected failure while code stands over a threshold…”), so that no commit holds the test failing without its mark or the mark on a passing test. The invariant `function-and-file-size` is not this slice's: Slice 5 sets it. Where the run still names any place — one of the task's three, or another — the mark and the comment stay as they are and the slice returns with what the run printed: a place other than the task's three is for the orchestrator to judge by To do 5, never for this slice to divide.
- **Change:** `src/browser/view/programs-entry.ts` · `src/browser/view/programs-pull.ts` · `src/browser/view/programs-reset.ts` · `tests/quality/test_function_and_file_size.py`
- **Read:** `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:24-39` To do and Acceptance criteria ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:49-54` Questions to settle, question 2 ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:64-69` Questions to settle, question 5 ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:71-85` Context and Questions carried to cycle ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:106-108` Out of scope ·
  `foundations/decisions.md:822-840` D-425 · `foundations/decisions.md:4169-4185` D-400 ·
  `foundations/decisions.md:4186-4200` D-401 · `foundations/decisions.md:4201-4217` D-402 ·
  `foundations/decisions.md:4035-4076` D-211 · `foundations/decisions.md:4645-4661` D-407 ·
  `foundations/decisions.md:4613-4629` D-323, as row 3 of *Foundation entries* changed it ·
  `foundations/invariants.md:1408-1417` function-and-file-size ·
  `foundations/invariants.md:1218-1227` uncaught-failure-game-state ·
  `foundations/invariants.md:998-1007` expired-session-unsaved-progress ·
  `foundations/invariants.md:408-417` eslint-source-rules · `foundations/invariants.md:438-447` prettier-source-format ·
  `foundations/part_map.md:3-32` browser-view · `foundations/part_map.md:90-125` build-tools ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/program-list.tsx:39-102` · `src/browser/view/screen-registry.ts:22-129` ·
  `src/browser/view/game-view.ts:205-225` · `src/browser/view/previous-save-lines.ts` ·
  `src/browser/view/state-store.ts:59-102` · `tests/quality/eslint-size-rules.mjs`
- **Model:** same - moving the pull and the reset control, which keep a numbering of questions and ignore late answers, out of `build` without a change of behaviour asks for more care than a mechanical move; it also takes off the expected-failure mark (class raised by the orchestrator in the plan's review, WAY-229)
- **Risk:** none
- **Checks:** `npm run typecheck` ·
  `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view/programs-entry.ts src/browser/view/programs-pull.ts src/browser/view/programs-reset.ts` ·
  `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/programs-entry.ts src/browser/view/programs-pull.ts src/browser/view/programs-reset.ts` ·
  `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/view/program-list.test.mjs` ·
  `npm test -- tests/view/program-panel.test.mjs` · `npm test -- tests/view/screen-registry.test.mjs` ·
  `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/uncaught-failure.test.mjs` ·
  `node tests/quality/eslint-size-rules.mjs` prints no line and ends with `0 functions and files over a threshold` ·
  `npm test -- tests/quality/test_function_and_file_size.py` passes both cases, with no expected failure and no unexpected success ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 1 · Slice 3

### Slice 5 — the invariant of the size rule no longer violated

- **Goal:** The invariant `function-and-file-size` in `foundations/invariants.md` reads `Violated: no`, written through the skill `the-way-record-invariant` — its `SKILL.md` and the files it names read as files when their steps come — as `.the-way/task-cycle/skill/foundation_step.md` gives (To do 6; row 2 of *Foundation entries*). Before writing, the agent confirms that the invariant holds on the slice's base: `node tests/quality/eslint-size-rules.mjs` prints no line, and `test_no_function_and_no_file_is_over_a_threshold` in `tests/quality/test_function_and_file_size.py` carries no expected-failure mark and passes; where either fails, it writes nothing and returns. Nothing else of the entry changes: its sentence, *Method*, *Rests on*, *Derives from* and *Part* stay. No code, test or guideline changes in this slice; the sentence of `guidelines/coding.md` "Size of a function and a file" on the mark and the violated invariant stays true as it stands.
- **Change:** `foundations/invariants.md`
- **Read:** `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:24-33` To do ·
  `foundations/decisions.md:822-840` D-425 ·
  `foundations/part_map.md:90-125` build-tools · `foundations/part_map.md:155-162` product-foundation ·
  `guidelines/coding.md` · `tests/quality/test_function_and_file_size.py` · `tests/quality/eslint-size-rules.mjs` ·
  `.the-way/elements/invariants/skill/SKILL.md` · `.the-way/elements/invariants/skill/decide_entry.md` ·
  `.the-way/elements/invariants/skill/draft.md` · `.the-way/elements/invariants/skill/write.md` ·
  `.the-way/elements/invariants/template.md` · `.the-way/elements/common/way_of_working.md` ·
  `.the-way/elements/common/rules.md` · `.the-way/task-cycle/skill/foundation_step.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `node tests/quality/eslint-size-rules.mjs` prints no line ·
  `npm test -- tests/quality/test_function_and_file_size.py` passes both cases, with no expected failure ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 4 · function-and-file-size, row 2 of *Foundation entries*, written in this slice

### Slice 6 — the end-of-run window after an error no code of the game handled

- **Goal:** To do 8, the one change of behaviour of the task, in a commit of its own apart from the split, to D-323 and `uncaught-failure-game-state` as rows 3 and 4 of *Foundation entries* wrote them before Slice 1: after an error that no code of the game handled, the game halted, the end-of-run window opens of itself at the end of the scene's effect of a death or a completion, and „Koniec przejścia” opens it, as before the error, since whether the window is open is a memory of the page and not of the game state; the game state and saving stay as D-323 gives them. The places are the two guards the task names in `src/browser/view/run-screen-state.ts`, of `openWindow` and of `effectEnded`, and the comments of the module's interface that say they do nothing after halt. Everything else keeps its behaviour after halt, as the tests that this slice does not change hold it: „✕” and Escape change nothing (the case "after halt() the window's buttons change nothing" of `tests/view/end-window-game.test.mjs` stays as it is, acceptance criterion 1), the question „Zapisać, odrzucić, wrócić?” stays (`closeQuestion` and `ask` change nothing), so „Koniec przejścia” with a question standing after the error leaves the question and the window does not stand beside it (D-371), and no act of the player changes the state. Where the changed D-323 says otherwise than this paragraph, the decision binds and the agent returns with the difference instead of choosing. First the failing test: the guard case "after halt the question, the window and the wait change nothing, while entering and leaving go on" of `tests/view/run-screen-state.test.mjs` takes the new expectation for the window and the wait — the end of the effect after halt shows the window, „Koniec przejścia” after halt opens a window „✕” closed before the error, „✕” after halt and the question as before — with the changed D-323 as the case's source, and is seen failing; then the code makes it pass. `src/browser/view/app.ts` and `src/browser/view/state-store.ts`, which the task names as places, only make the halt and do not change in this slice, nor does any code the split slices moved; where the agent finds the change needs another file, it stops and returns.
- **Change:** `src/browser/view/run-screen-state.ts` · `tests/view/run-screen-state.test.mjs`
- **Read:** `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:18-39` Need, To do and Acceptance criteria ·
  `foundations/decisions.md:4613-4629` D-323, as row 3 of *Foundation entries* changed it · `foundations/decisions.md:10061-10189` D-311 ·
  `foundations/decisions.md:10528-10546` D-371 · `foundations/decisions.md:10444-10478` D-368 ·
  `foundations/decisions.md:10502-10527` D-370 · `foundations/decisions.md:11341-11407` D-322 ·
  `foundations/decisions.md:10190-10210` D-324 · `foundations/decisions.md:8111-8142` D-173 ·
  `foundations/decisions.md:4645-4661` D-407 ·
  `foundations/invariants.md:1218-1227` uncaught-failure-game-state, as row 4 of *Foundation entries* left it ·
  `foundations/invariants.md:1408-1417` function-and-file-size ·
  `foundations/part_map.md:3-32` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/run-entry.ts` · `src/browser/view/state-store.ts` ·
  `tests/view/end-window-game.test.mjs:1200-1229`
- **Model:** same - the one change of behaviour of the task, test first, bound to the changed D-323; its follow-through (comments made false, the citation of the decision) asks for more care than a mechanical move (class raised by the orchestrator, WAY-229)
- **Risk:** none
- **Checks:** `npm test -- tests/view/run-screen-state.test.mjs` fails on the guard case after the change of the test and before the change of the code, and passes after it ·
  `npm test -- tests/view/end-window-game.test.mjs` · `npm test -- tests/view/run-screen.test.mjs` ·
  `npm test -- tests/view/end-question.test.mjs` · `npm test -- tests/view/uncaught-failure.test.mjs` ·
  `npm test -- tests/view/state-store.test.mjs` · `npm run typecheck` ·
  `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view/run-screen-state.ts tests/view/run-screen-state.test.mjs` ·
  `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/run-screen-state.ts tests/view/run-screen-state.test.mjs` ·
  `node tests/quality/eslint-size-rules.mjs` prints no line ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 5 · D-323 and uncaught-failure-game-state, rows 3 and 4 of *Foundation entries*

## Coverage

| What the task requires | Slices or entries |
|---|---|
| To do 1: `startApp` under the threshold of a function, the page doing and showing the same | Slice 2, Slice 3 |
| To do 2: `createProgramsEntry` and `build` under the threshold, Programy doing and showing the same | Slice 4 |
| To do 3: `kitchen-sink.tsx` under the threshold of a file, the page's own code in several files of `src/browser/kitchen-sink/` | Slice 1 |
| To do 4: the last paragraph of the rule "The kitchen-sink page" of the styleguide | Slice 1; *Foundation entries* row 1 |
| To do 5: a place other than the three over a threshold at the cycle's start | measured at the cycle's start by the orchestrator: none (`node tests/quality/eslint-size-rules.mjs` on `fc6e0046` named only the three); Slices 1–3 check that the run names no place the base did not name, and Slice 4 returns any place still named instead of dividing it |
| To do 6: the expected-failure mark and its comment off the size test and `function-and-file-size` at `Violated: no`, in the change that clears the last place | Slice 4 (the mark and the comment, in the commit that clears the last place); Slice 5 (the invariant); *Foundation entries* row 2 |
| To do 7: the descriptions of the guidelines that name the divided places agree with the code | Slice 2, Slice 3 (`guidelines/coding-browser-module.md`); Slice 1 (the styleguide's paragraph and the page's module comment) |
| To do 8: the end-of-run window opens of itself and by „Koniec przejścia” after an error no code handled, D-323 and `uncaught-failure-game-state` agreed with D-311 and D-371, in a commit of its own | *Foundation entries* rows 3 and 4, in the commit of the entries before Slice 1; Slice 6, the code and the test in a commit of its own |
| Acceptance criterion 1: the tests of `tests/view/` pass with their expectations unchanged, but for the guard case of the window | Slices 2, 3 and 4 run the cases that cover the code they move, unchanged; Slice 6 changes only the guard case of `tests/view/run-screen-state.test.mjs` |
| Acceptance criterion 2: after an error no code handled, at a death the window opens of itself and „Koniec przejścia” opens it | Slice 6 |
| Acceptance criterion 3: the kitchen-sink page shows the same samples, in the same order and states, before and after | Slice 1 (the markup compared byte for byte and the screenshots compared, collected before the split) |
| *Settlements to record*, row 1 | *Foundation entries* row 1, Slice 1 |
| *Out of scope*: no status of a new file in the table "Files of this kind" | Slices 2, 3 and 4 add no row |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| Order: the entries of D-323 and `uncaught-failure-game-state` before Slice 1, then the kitchen-sink page, the drawing of the start page, the rest of `startApp`, Programy with the removal of the size test's mark, the invariant of the size rule, and the code of To do 8 last | the code of To do 8 first, before the split | With the code of To do 8 last, every slice of the split is judged against the unchanged behaviour, and its code touches only `run-screen-state.ts` and its test, which no split slice moves; D-323 says for the time of the split what the code does only at Slice 6, as every entry written before its code does |
| D-323 and `uncaught-failure-game-state` written by the agent of the plan's *Foundation entries* before Slice 1, the code of To do 8 in a slice of its own | both entries in the slice of the code, by WAY-69 | A slice that changes `foundations/decisions.md` reads the whole file by the measure of `slice_size.py`, about 517 000 tokens, far over its limit; the entries' commit and the code's commit each stand apart from the split, as To do 8 asks |
| `function-and-file-size` set to `Violated: no` in a slice of its own right after Slice 4, not by the agent of the entries before Slice 1 and not in Slice 4 | the invariant in Slice 4 with the mark; or before Slice 1 | Before Slice 1 the entry would say `no` while three places stand over a threshold; in Slice 4 the slice reads about 160 000 tokens with `foundations/invariants.md` and the skill, over the limit. Between the commits of Slice 4 and Slice 5 the invariant reads `yes` while its test passes, a stale entry for one commit and no failing test |
| The kitchen-sink page divided by its groups of samples — the controls, the forms with the part of the menu „Konto”, the roles, the tiles — with what several groups share in one module and the entry keeping the marker and the first draw | one module per section with the shared helpers copied into each; or fewer, larger modules | Copied helpers drift apart and change the page's markup unseen; a wrong group boundary costs only a move between files of one directory |
| The page compared before and after by the markup of its host, byte for byte, and by screenshots looked at | screenshots alone, or a pixel comparison | A pixel comparison fails on rendering noise of the browser; screenshots alone miss a changed attribute or class; the markup misses nothing React draws but the live value of a field, which the screenshot shows |
| `startApp` divided in two slices: first the drawing to `page-places.ts`, then the rest | one slice for the whole of `startApp` | One slice would hold the trust-boundary review over twice the moved code; two slices cost one more handoff, and the first leaves `startApp` over the threshold with the mark still on |
| The functions that leave `startApp` stand at module level and receive the page's places, one record of its memory, the client and the address as a parameter; the acts on a standing game go to `page-game-acts.ts`, the session check, the load, the card and the building of a game stay in `app.ts` beside `startFrom`, and the entry from the address and the last resort stay in `startApp` | a class with a method for each nested function; or one factory per concern with the functions nested in it | A class departs from the factories the view is built of and leaves every concern in one module; a factory counts all its nested lines, so the acts and the building together would stand near 200 again; if the module-level form proves awkward, the slice's own review sees it before anything builds on it |
| The calls of the trust boundary's files stay where they are but for `screenAddress` in the game's place | the entry from the address moved out of `startApp` too | Moving `readResetToken`, `readConfirmationToken` and `confirmFromAddress` would widen what the trust-boundary review has to compare, for no gain in size |
| `createProgramsEntry` divided by the two memories its comment names, the pull of the previous save and the reset control, each a factory of its own module | only `answerPull` turned into a pure function | `build` would come to about 185, a few lines under the threshold, and the next change of Programy would break it again |
| The removal of the size test's mark and comment rides in the slice that clears the last place, in its same commit | a slice of its own after the split | A commit would stand with the size test passing while marked as an expected failure, which unittest reports as an unexpected success and a failed run |
| To do 8 opens the window after the error by the end of the scene's effect and by „Koniec przejścia” only — the two guards the task names, `openWindow` and `effectEnded`; „✕”, Escape and the question keep what they do after the error | „✕” and Escape closing the window after the error too, as a memory of the page | The window could stand after the error with no way to close it but a reload, which the sentence of D-323 asks for anyway; closing it too would change the expectation of `tests/view/end-window-game.test.mjs` "after halt() the window's buttons change nothing", which acceptance criterion 1 does not allow |
