# Slice 2 — executor report

**Status:** done with concerns (concerns: one error of `foundation_check.py` that stands in a file of slice 1, and the end-of-run window after a live completion was not reached in the real game; both below).

**Commit (on base `d0c4210873324ffc6c5aa33b78028f17f023d36a`):** `a874dbff` refactor: :recycle: let the screen Przejście and its program panel read the question and the window from the state of the screen

**Files changed (added / removed lines):**

- `src/browser/view/run-screen-reading.ts` — new, 33 / 0 (the Hook both roots read the state through)
- `src/browser/view/run-screen.tsx` — 47 / 57
- `src/browser/view/run-entry.ts` — 23 / 27
- `src/browser/view/program-panel.tsx` — 46 / 23
- `tests/view/run-screen.test.mjs` — 80 / 66

## What was made

- `run-screen-reading.ts`: `RunScreenReading` (`Pick<RunScreenState, "subscribe" | "snapshot">`) and `useRunScreenSnapshot(reading)`, which is `useSyncExternalStore` over Slice 1's subscription, with the subscription wrapped so that a change calls `flushSync(changed)`. The question or the window therefore already stands in the document when the entry moves the focus right after the change (the moment `flushSync` gave before). The listener runs inside `taken`, inside an act of the store (an event handler or the clock), never inside a render or an effect.
- `program-panel.tsx`: `ProgramPanel.setQuestion` and the panel's `question` variable are gone. `createProgramPanel(controls, mode, folding, endQuestion = null)` takes the optional fourth parameter `EndQuestionSource = { state: RunScreenReading; answers: EndQuestionControls }`. The view draws the question through a small component `EndQuestionSlot`, which calls the Hook and renders `EndQuestion` at the same place in the tree as before (above the copy section). Only the `run` mode draws it; Programy passes no fourth parameter (`programs-entry.ts` unchanged).
- `run-screen.tsx`: `setQuestion` and `setWindow` are gone from the type and the object; `RunScreenPanel` loses `setQuestion`. `createRunScreen(panel, controls, chronicle, reading = NO_WINDOW)`; the view reads `windowShown` through the Hook (and keeps the guard "the given run has ended"). The scroll of the page to its top, which `draw` did when the window appeared, is now an effect of `RunScreenView` with the dependency `[covering]`; it runs after the window's own focusing effect, as the old code scrolled after the focus. The `windowOpen` and `drawn` variables are gone. The module and function comments say what holds now.
- `run-entry.ts`: every call of `setQuestion`, `setWindow` and the `syncWindow` helper are gone; `closeQuestion()` is `screenState.closeQuestion()`; the panel is created after `controls` with `{ state: screenState, answers: controls }`, and the screen with `screenState` as the fourth argument. `askToEnd` still calls `focusQuestion()`; `restart` still calls `focusHeaderButton("Restart")`; `focusWindow` unchanged.
- `git grep -n -e setQuestion -e setWindow` prints nothing (exit 1); the new file holds none either.

## Checks (command, exit code)

- Test first, red: `npm test -- tests/view/run-screen.test.mjs` with `wiredScreen` and the question case changed and the code not yet written: exit 1; the case "the question stands in the program panel …" failed at `assert.ok(question, "the question stands in the panel")` ("expected a true value, got undefined"), the expected reason (log kept in `.runs/task-cycles/porzadki-widoku-po-react/reports/slice-2-executor-evidence/red-1.txt`). Two window cases also failed in that run, since the stand-in controls already told the state and the old screen did not read it.
- Green: `npm test -- tests/view/run-screen.test.mjs` exit 0 (20 pass).
- `npm test -- tests/view/run-screen-state.test.mjs` exit 0 · `end-question` exit 0 · `end-window-game` exit 0 · `end-window` exit 0 · `program-panel` exit 0 · `previous-save` exit 0 · `chronicle-game` exit 0 · `uncaught-failure` exit 0 (each `npm test -- tests/view/<name>.test.mjs`).
- Extra, tests of code I touch: `scene.test.mjs` exit 0 (it calls `createRunScreen` with three arguments, unchanged); `account-screen.test.mjs` exit 0.
- `npm run typecheck` exit 0.
- `npx --no-install eslint --max-warnings 0` on the four files and the new file: exit 0.
- `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on the same files: exit 0.
- `git grep -n -e setQuestion -e setWindow`: no output (exit 1).
- `python -B .the-way/elements/common/foundation_check.py`: exit 0 printed, but reports `1 error`: `tests/view/run-screen-state.test.mjs:309: the quotation does not begin a sentence of D-371`. That file is not changed by this slice (the diff of `d0c42108..HEAD` for it is empty); it comes from slice 1. The new file is claimed by the part `browser-view` (`src/browser/view/**`) and raises nothing. Not run by me: the full `npm test` (not mine to run).

## Own-work check

- Requirement most likely not met: "the question or the window already stands in the document when the entry moves the focus right after a change". Check: a mutation that drops the `flushSync` from the Hook (`changed();` in its place), run against `end-question`, `end-window-game` and `run-screen`: each file exit 1, 3 failing cases each (logs `.runs/task-cycles/porzadki-widoku-po-react/reports/slice-2-executor-evidence/mut-*.txt`); the code was restored (`flushSync(changed)` stands at `run-screen-reading.ts:28`), and the same three files pass in the commit. So the existing tests do hold the synchronous drawing.
- Real game (`npm run local`, Playwright CLI, an account `agent2@example.test`):
  - Map run of Skraj lasu, „+ dodaj grupę” (a change of the copy), then „Zakończ”: the question stands in `.program-panel`, its next sibling is `.copy-section`, the focus is on „Zapisz” (first answer), the clock reads „Minuta 10 (pauza)”. „Wróć”: the question is gone and the clock runs again („Minuta 11”).
  - End-of-run window, death: a document composed with the game's own functions (an empty program, death by cold at minute 243, settled) sent by `PUT /api/saved-game`, then a reload: the window stands over the screen, the header is `hidden`, the focus is on the window, the page at the top. „✕”: the window goes, the header shows, the focus is on „Koniec przejścia”; „Koniec przejścia”: the window stands again. Also live: a composed paused run at minute 236 of the same program, „16×” and „Wznów”: after about 4 s the window opened by itself over the screen with the focus on it, no `uncaught` line in the console.
  - Programy: the panel draws, no question, no console error.
  - Not reached: the window after a live completion (a completion of a map needs hours of play or a composed state close to the condition; a loaded save carries no events, so the scene effect of a completion was not seen either). The death case covers the same path of the state (`taken` with `endedRun`).

## Changed test cases of `tests/view/run-screen.test.mjs` (by `guidelines/testing.md`, "Changing an existing test")

The reason of every change: the boundary of the screen changes (To do 1 of the task: `setQuestion` and `setWindow` go, the screen and the panel read the state of the screen Przejście), so a case can no longer tell the screen with a method; it changes the state the screen reads. Source of the reason: task To do 1 and D-407 (the decision's text: "The screen Przejście and its program panel read the question and the window from the state of the screen Przejście"). Each case keeps what it checked; no assertion was weakened or removed except where named.

- Helper `wiredScreen`: builds a real `createRunScreenState` over the case's game (`get: () => game.state`, not halted, motion not reduced), gives it to `createProgramPanel` (with the answers, which are the controls) and to `createRunScreen`; the stand-in `openWindow` and `closeWindow` tell the state (`openWindow()`, `closeWindow()`) in place of `setWindow`. The `controls` object now stands before the panel. Returns `screenState` in the game.
- "the question stands in the program panel, directly above the heading of the copy and under the band of a discovery, only while the state of the screen holds it" (renamed from "… only while the screen is told to show it"): `setQuestion(true)` became `screenState.ask(null)`, `setQuestion(false)` became `screenState.closeQuestion()`; "shown once" is now checked after a second `ask` (which the state refuses) and an `update` of the screen, in place of a second `setQuestion(true)` (the new state has no "set what is set"). Same assertions on place, order and count.
- "while the state of the screen shows the window, the screen of an ended map run draws it and hides … once it does not, the screen shows them again" (renamed from "told the window stands …"): `setWindow(true)` became `screenState.entered()` (the player comes onto the screen, so the window of an ended map run stands), `setWindow(false)` became `screenState.closeWindow()`; the running map run still shows no window. The comment line "not drawn until told" says "until the state shows it".
- "what the window covers stays in the tree and keeps its state …": same two replacements.
- "„✕” asks the game view to close the window and the focus goes to „Koniec przejścia” …": `setWindow(true)` became `entered()`; the stand-in `closeWindow` and `openWindow` now change the state, and the assertions (acts `closeWindow`, `openWindow`; the window gone and standing again; the focus on „Koniec przejścia”) are unchanged.
- "the buttons of the window ask for „Restart”, „Zakończ” and the opening of the map they name": three `setWindow(true)` became `entered()`.
- "„Dodaj regułę z tym” of the window closes the window and then does what the panel's button does …": `setWindow(true)` became `entered()`; acts `["closeWindow", "editCopy"]` still asserted.
- "the window's „Ostatnie minuty” …": `setWindow(true)` became `entered()` (after the death, `entered()` opens the window of the ended map run).
- "the page scrolls to its top when the window appears, and at no other draw": `setWindow(true)` became `entered()`, `setWindow(false)` became `closeWindow()`; the repeated `setWindow(true)` of "at no other draw" is a second `entered()` (a no-op in the state) and the "next appearance" is now `left()` then `entered()`, since the state opens the window again at each entering, with one added comment line. Same writes asserted: `[0]`, `[0]`, `[0]`, `[0, 0]`, `[0, 0]`.
- Header comment of the file (line 7) and the comment above the helper name the state of the screen.

Cases not changed: the others of the file, which never called either method. (22 lines named the methods at the base; 0 now.)

## Choices

- **A new file `run-screen-reading.ts`** for the Hook, shared by the two roots. Rejected: the same ten lines in `run-screen.tsx` and `program-panel.tsx` (duplicated synchronous-flush rule), and putting `flushSync` in `run-screen-state.ts` (the state module is React-free and calls no screen). Cost if wrong: one more file in the part; it is under `src/browser/view/**`, so the part map and the checks claim it, but the table of kinds in `coding-browser-module.md` has no row for it (a file added after the last audit has none, per that guideline).
- **Synchronous drawing by `flushSync` inside the subscription**, not a plain `useSyncExternalStore`. The plain one only schedules the redraw (a microtask), so `focusQuestion` and `focusHeaderButton("Restart")` of the entry, called right after the change inside the same act, would find nothing; the mutation above shows tests fail without it. Cost if wrong: a `flushSync` inside a listener of the state; it runs only from acts of the store, as the old draws did.
- **`createRunScreen` takes the state as an optional fourth parameter** (default: a reading that shows no window), because `tests/view/scene.test.mjs` calls it with three arguments and must stay unchanged and green. A required parameter would have meant changing that test (out of the slice). Cost if wrong: a screen can be built that never shows the window; only tests do that.
- **The panel's question is drawn by the component `EndQuestionSlot`** so that the Hook is called unconditionally, while the panel without the source (Programy) draws no slot. Rejected: a context of React (D-407 violates it) and reading the state in `ProgramPanelView` itself (a Hook behind a condition).
- **The scroll to the page's top is a passive effect** of `RunScreenView` keyed on `covering`: the child `EndWindow` focuses in a passive effect, and a parent's passive effect runs after its child's, so the scroll still comes after the focus as before. A layout effect would have scrolled first and been undone by the focus.

## Mismatches between the plan and the code

- None structural. The plan's "`RunScreenPanel` … `setQuestion`" and "the panel's object" line up with the code. A small one: the plan says tests change "22 lines"; the helper `wiredScreen` also had to gain the panel's new fourth parameter and the screen's fourth argument, which is part of the same change.
- `foundation_check.py` reports an error in a test file of slice 1 (above); not mine to change.
- D-407 *Verification* names no call that closes the window any more. After this change the game view still closes the window by a call from a user act: the screen's `windowControls.close()` and `windowControls.addRule()` call `controls.closeWindow()` (the entry's control, which calls `screenState.closeWindow()`); the game view does not call a method of the screen or of the panel to show or take away the question or the window.

## Reaches beyond the handoff

- `src/browser/AGENTS.md` was read (it is in the handoff's *Read*); no other file outside the *Read* was read for meaning. A grep of `tests/` and `src/` for `setQuestion|setWindow|createRunScreen|createProgramPanel(` and for the users of `ProgramPanelView`, to find every caller (found `tests/view/scene.test.mjs`, `rule-signs.test.mjs`, `program-panel.test.mjs`, `programs-entry.ts`: all compatible with the optional parameters). A read of `end-window.tsx` by `grep` for its focus effect (to place the scroll effect). The composed-state script of the skill (`compose-state.mjs`, first 60 lines) as a model for my own working scripts.

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1 to 607 of 1076 (the roles, the rules of tokens, focus, contrast, the shared controls, the menu and the screens Mapy and Wiedza start); the rest (later screens' rules) not read; this slice changes no look.
- `guidelines/testing.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, `.claude/skills/loop2-play/SKILL.md`, the seven decisions: read whole. Task passages: carried whole in the handoff; the task file itself not opened.
- `.the-way/task-cycle/change/ui_check.md`: not read; the slice changes no look (the question and the window stand where and as before), and no screenshot was made or shown.

## Searches not found or unclear

- None unclear. Searched and not found: a row for the new file in `guidelines/coding-browser-module.md` (none expected).

## Working copies

- `.runs/slice-2-executor/` (logs of the runs, the composed documents, my two scripts, snapshots, `reading.bak`): removed. Kept beside this report in `.runs/task-cycles/porzadki-widoku-po-react/reports/slice-2-executor-evidence/`: the red and green logs, the three mutation logs and the two scripts that composed the saved documents (`compose-ended.mjs`, `compose-live.mjs`). `.playwright-cli/` (snapshots, console logs, `send-state.js`) was removed; the local start was ended with `npm run local:stop` (one start stopped). No worktree, clone or screenshot was made.
