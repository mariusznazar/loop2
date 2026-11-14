PASS 0785c763896565f0ccd3f2323e4fb44eee5a17ac

# Review of the whole change — review-change, the whole change (one author, no plan)

- Range: `9e13af95af4fa77445eccfe3e50a28e00c2adaf0..0785c763896565f0ccd3f2323e4fb44eee5a17ac`, branch `task/podzial-sterownika-widoku`; `git rev-parse HEAD` in the worktree gave `0785c763896565f0ccd3f2323e4fb44eee5a17ac`, the head given.
- Commits: `d01611f6` (store), `a6935a2c` (state of Przejście), `8b68ec28` (registry), `29d5d2c9` (entries, composition, guideline), `0785c763` (D-407, D-408, D-409).
- Blocking findings: none. Minor: 6, all within the task. Out of scope: none.

## Changed files (added / removed lines, `git diff --numstat`)

| File | + | − |
|---|---|---|
| `foundations/decisions.md` | 45 | 0 |
| `guidelines/coding-browser-module.md` | 30 | 13 |
| `src/browser/view/character-entry.ts` | 58 | 0 |
| `src/browser/view/game-view.ts` | 111 | 1129 |
| `src/browser/view/headquarters-entry.ts` | 66 | 0 |
| `src/browser/view/maps-entry.ts` | 126 | 0 |
| `src/browser/view/program-panel-acts.ts` | 72 | 0 |
| `src/browser/view/programs-entry.ts` | 403 | 0 |
| `src/browser/view/run-entry.ts` | 281 | 0 |
| `src/browser/view/run-screen-state.ts` | 199 | 0 |
| `src/browser/view/screen-registry.ts` | 283 | 0 |
| `src/browser/view/state-store.ts` | 208 | 0 |
| `tests/view/run-screen-state.test.mjs` | 262 | 0 |
| `tests/view/screen-registry.test.mjs` | 419 | 0 |
| `tests/view/state-store.test.mjs` | 380 | 0 |

No existing file under `tests/` changed, and `src/browser/view/app.ts` did not change. No invariant test changed. No screenshot file is in the range.

## Findings

### Critical

None.

### Important

None.

### Minor (all within the task)

1. **`src/browser/view/screen-registry.ts:128-148` — a screen kind that no entry holds is caught only when that screen is shown, not when the registry is built.**
   - What is wrong: spec decision 4 says the registry "throws where a kind of `Screen` is held by no entry or by two". Its rejection (c), which gives up the compiler's completeness check for the table, rests on "the runtime check with a test catches the same fault at the first build". The code throws for a duplicate kind at creation (`:133-139`). For a missing kind it throws only for the first screen (`:148`) and then at each `show` (`entryOf`, `:140-145`).
   - Why it matters: a future screen (Wiedza) whose table line is forgotten still builds, and every game-level test that never navigates to it passes. The fault shows only when someone opens that screen's address: `show` throws inside the address listener, the error goes to the last-resort handler, and the game halts (D-323). It is not silent, and the new screen's own tests would navigate to it, so this is Minor. It does weaken the guarantee that the spec traded the compile-time check for.
   - The author's reason, that a list of kinds would be "one more shared place for a new screen", does not hold. A runtime array of kinds can live in `src/browser/view/screen-address.ts`, the file D-408 already names as a place a new screen changes. It can be tied to the type `Screen["kind"]` at compile time (an array checked with `satisfies` and an exhaustive mapped type), and the registry can check it at creation.
   - Evidence: `tests/view/screen-registry.test.mjs:129-164` pins the throw at `show` (`/no screen entry holds the kind run/` after creation succeeded with two entries).

2. **`src/browser/view/screen-registry.ts:1-8` (module doc) against `:169-179` — the doc says "The registry knows no screen", but `tellPlace` names the kind `"run"`.** `returnEntry: current.kind === "run" ? null : returnToRunEntry(...)` is a branch for one screen inside the registry. The spec placed it there on purpose (decision 4, `ScreenPlace` "off Przejście"), so the code follows the spec. Only the sentence claims more than the code does. Fix the wording, for example "knows no screen but Przejście, whose way back the page is told". The same overclaim appears in D-408's rationale ("turns each of those functions into a loop over the table"); it does no harm to a new screen.

3. **`foundations/decisions.md:9877` (D-407, binding sentence) — "keeps a separate React root for each screen and for the menu bar".** In the code, Programy holds two roots (`createProgramList` and `createProgramPanel` in `src/browser/view/programs-entry.ts:321-365`), and Przejście holds two (the run panel and `createRunScreen` in `src/browser/view/run-entry.ts:59`, `:237`). The sentence follows the task's row 1 ("po jednym na ekran albo pasek"), so it is faithful to its source. Read literally, though, it says one root per screen. A later agent could take the two roots on Programy for a departure, or think it has to merge them. Wording such as "roots of its own for each screen and for the menu bar, none shared between screens" would match both the source's intent and the code. Since the wording comes from the task row, this is for the human to settle.

4. **`foundations/decisions.md:9888` (D-407, *Rejected*, way c) — "it is a rewrite of most of the view".** The source (task question 1, way c) says "ok. 800 linii do przepisania", meaning the game view's controller, about 800 of `game-view.ts`'s 1300 lines. The template keeps counts out of *Rejected*, so the number had to go. But "most of the view" (the view is `src/browser/view/`, many thousands of lines) overstates the cost that the source kept. The task says the one-root question comes back with a later task, which will read this rejection. Suggested wording: "a rewrite of the game view's controller". The other two rejected ways and the rationale match the source.

5. **`tests/view/state-store.test.mjs:165` — the comment "1000 ms of real time are one game minute (D-04)" cites the wrong decision.** D-04 says real time enters the simulation as an argument. The rate, one game minute per real second at 1×, is D-21's binding sentence. testing.md "Where the expected value comes from" asks for the source of a value in the foundation, so the citation should be D-21.

6. **`tests/view/screen-registry.test.mjs:407-418` — "dispose takes every living instance down, in table order" pins an order that no requirement sets.** Spec decision 4 says only that `dispose` "disposes every living instance". The base disposed Postać and Mapy first and Siedziba last. testing.md "Behaviour, not implementation" ("Nie utrwalaj … kolejności wewnętrznych wywołań bez wymagania, które je ustala") asks to assert that every instance is disposed, not their order. The order assertions for `drawResult` (`:320-331`) and for the `always` elements (`:168-184`) are a different case: spec decision 4 fixes those orders.

## The handoff's questions, judged

- **"`send` is a moment even where the send is refused" (spec decision 9).** The author is right. `send` of the simulation throws on every refusal (`src/browser/sim/game.ts:451-471`), and `clock.send` returns early once the clock is disposed (`src/browser/view/clock.ts`, `if (!running) return`). So no "refused send" exists that leaves the state as it was after a reading changed it, and the spec's sentence is vacuous for this code. `store.send` keeps the base's shape (`state-store.ts:178-182`: the state before is taken before the clock's reading). `tests/view/state-store.test.mjs:283-302` pins what holds. No finding. The spec sentence is a defect of the spec, not of the change.
- **The closed import list of decision 1.** I checked each new file's imports against the list. Every entry imports only the simulation, types of the store and of the registry, and the modules and types the list names for it. The entries get `Screen` through the registry's re-export (`screen-registry.ts:20`), which is the remedy the spec's revision reviewer proposed; `Screen` is part of the registry's port, so it counts as a type of the registry. `state-store.ts`, `run-screen-state.ts`, `screen-registry.ts` and `program-panel-acts.ts` stay within their rules. `game-view.ts` is the only file that imports the entries, the store, the screen state and the registry together. No finding.
- **No list of all screen kinds in the registry.** Minor finding 1.
- **`syncWindow()` after `openWindow`, `closeWindow` and `effectEnded` even where the state did nothing.** `setWindow` returns at once when the window already stands as asked (`src/browser/view/run-screen.tsx:312-316`). Every change of `windowShown()`'s inputs (a taken result, `ask`, `entered`, `left`) is followed by a draw or by `placed`, which syncs, so at those three calls the screen's flag already equals `windowShown()`. The extra call is a no-op, and the differential runs below show no difference. No finding.
- **D-408 and D-409 with `Rejected: unknown`.** The decision template (`.the-way/elements/decisions/template.md`, WAY-134) gives `unknown` for a settlement row whose source keeps no way not chosen, and bars a way derived from the row's "what the cycle would otherwise guess". Rows 2 and 3 cite Need, To do and the task line, which keep no such way. No finding.
- **The decisions the author left unread.** Of the 35 the author listed, I read 23 whole. None of them is broken by the code; details are under "Against the foundation" below. I read the other 12 by title only (D-07, D-88, D-97, D-208, D-211, D-225, D-250, D-282, D-346, D-383, D-395, D-396). The code they govern (the saver, the chronicle's tab and filter, the shared controls, the account flows) was moved unchanged or not touched, and the five game-level test files pass unchanged.

## Against the task

- *To do* 1: done. The store (`state-store.ts`) is the one place every result passes. `act` reads the clock first, and `actWithoutCatchUp` serves exactly Siedziba's `create` (`headquarters-entry.ts:31-35`) and Postać's `onBuy` (`character-entry.ts:40-44`). `git grep "flush()" src/browser/view` finds `clock.flush()` only in `state-store.ts` (`act`, `keep`, the saver's `read`). D-207's moments and D-323's refusal are kept (`take`, `takeAsAct`, `send`, `startLoop`, `halt`).
- *To do* 2: done. The registry (`screen-registry.ts`) holds the table. Showing, drawing after a result and after a reading, picking the element that gets the focus, and clean-up all go through it with no per-screen branch (the only exception is Minor 2). Siedziba, Programy and Przejście are `always`; Postać and Mapy are `while-shown`.
- *To do* 3: done. `run-screen-state.ts` holds the question, the window, the wait for the effect and the owed focus, and touches no DOM, screen, act or registry. The opening and closing rules of D-173, D-311, D-322, D-324, D-368 and D-371 match the base line for line (compared against `game-view.ts` at the base: `:295-318`, `:409-423`, `:546-576`, `:606-626`, `:662-682`, `:1124-1136`, `:1256`).
- *To do* 4: done. `GameViewOptions`, `GameView` and `GameEntry` are kept; `KeptGame` and `ScreenPlace` are re-exported; `app.ts` is unchanged.
- *To do* 5: done. Both examples are rewritten, and the nine files have rows with the statuses of spec decision 1.
- Acceptance criterion 1: not checkable yet, because the pull request description does not exist. The author's list (report section "What the pull request description can list") agrees with the code: a module, an entry file, one table line with its import in `game-view.ts`, the address in `screen-address.ts`, and the menu bar position.
- Acceptance criterion 2: holds. No existing test file is in the diff. Every case I ran passed (checks below), and the author ran all of `tests/view/`.
- *Settlements to record*: rows 1, 2 and 3 are D-407, D-408 and D-409. Each says what the code does, apart from Minors 3 and 4. *Out of scope* is kept: `app.ts`, the menu bar, the account card, the `switch` statements of `screen-address.ts` and the hand-moved panels are not touched.
- "The player sees nothing change": I verified it differentially, as described under Checks.

## Against the foundation

- **D-03, D-36, D-265:** no new framework. The entries of Siedziba and Programy build a `section` through the DOM API and stand as `do not copy`. The entries that a new screen copies (`character-entry.ts`, `maps-entry.ts`) build nothing through the DOM API.
- **D-04, D-409:** every act changes the state only through simulation functions passed to `take`. Time-dependent acts read the clock inside the store.
- **D-207, D-323:** the moments of saving and the refusal after halt are unchanged. The game-level proof (`tests/view/uncaught-failure.test.mjs`) passes, and the new state-store case cites `invariant: uncaught-failure-game-state`.
- **D-173, D-311, D-322, D-324, D-368, D-370, D-371:** the same as today. The differential runs show the same pages and focus moves for the question, the window, „✕”, Escape (focus to „Koniec przejścia”), the re-entry after leaving by the menu bar, and halt on an ended map run.
- **D-280, D-281, D-283, D-284:** `leave` pauses through `act`, and `entered` resumes nothing. The run screen gets its map run as a parameter (`run-entry.ts:266`).
- **D-287, D-329:** the Mapy guard is kept per instance.
- **D-294, D-295, D-339, D-342:** the folding and the chronicle are made once and shared; `record` gets the copy act.
- **D-96, D-212, D-247, D-352:** the first screen, the catch-up as the last step, and the reload for an emailed link's fragment are unchanged.
- **D-401, D-402:** the pull and the reset are moved whole into the Programy entry.
- **D-351:** `tests/invariants/test_cross_part_imports.py` passes.
- **D-407, D-408, D-409:** the binding sentences match the code apart from Minor 3. *Rejected* follows the template (Minor 4 is about wording). `Based on: none`, the relations and the pairs of examples are well formed, and `foundation_check.py` reports 0 errors.

## Against the guidelines

- **`guidelines/coding.md`:** linter and formatter clean (ESLint and Prettier exit 0). There is no rule of size, so findings of structure would be Minor. The large closures that remain are `build` in `programs-entry.ts` (about 300 lines) and in `run-entry.ts` (about 220 lines). They were moved from the old function, which was 1018 lines; I raise no finding.
- **`guidelines/coding-browser-module.md`:** the rules on hooks and effects are not reached (no `.tsx` changed). D-265's rule on new screens is respected.
- **`guidelines/testing.md`:** the new tests import `tests/view/page-document.mjs` first and take `assert` from it when they use jsdom; `run-screen-state.test.mjs` uses no document and `node:assert`. Each case names the bug it catches. Minors 5 and 6 are the only departures I found.
- **`styleguide-browser-view.md`:** not selected, because the change alters no part of the interface the player sees (the HTML traces below are byte-identical).
- **Product guideline changes:** the change edits `guidelines/coding-browser-module.md` only in its table rows and example prose, so the form of the file against `product-guidelines/template.md` is not reached.
- **Reserved choices:** none taken (no language, library, store of data or place to run is added).
- **Trust boundaries:** none touched (no file under `assets/`, `src/server/`, `deploy/` or `saved-game.ts`).
- **Irreversible operations:** none.

## The structure the change leaves

- File sizes (`python -B .the-way/task-cycle/change_file_sizes.py 9e13af95… 0785c763…`, exit 0): `game-view.ts` went from 1300 to 282 lines (−1018). The nine new source files total 1696 lines (`programs-entry.ts` 403, `screen-registry.ts` 283, `run-entry.ts` 281, `state-store.ts` 208, `run-screen-state.ts` 199, `maps-entry.ts` 126, `program-panel-acts.ts` 72, `headquarters-entry.ts` 66, `character-entry.ts` 58). The three test files total 1061 lines.
- No invariant of size exists (`guidelines/coding.md` holds no `### Size of a function and a file`), so no threshold test was run.
- No code was left without a user. One name stopped being true: Minor 2.

## The author's own-work check

The author named "the player sees nothing change" as the weakest requirement, which is the right place to look, and checked it with a differential driver. I reran that driver on fresh builds of both commits and got the same result. The author could not show the driver would notice a change; I checked that with two mutations of the head build:

- Reversing the order of `placed` calls gave no difference. This confirms the spec's claim that the order between roots is not observable.
- Disabling `entered()` on the screen Przejście changed the trace (220 differing lines in `fc`).

So the trace catches behaviour, and the author's check would catch the requirement unmet. I also added five scenarios covering paths the author's run did not reach. All matched byte for byte:

- creating a character;
- Escape in the window, then leaving to Mapy and to a map card and coming back;
- halt on an ended map run, with „✕”, a return and „Zakończ”;
- an editor field with focus on Programy committed on the move to another program and to Siedziba;
- a map run going on, left by Mapy and resumed.

## Declined to judge

- The spec's sentence in decision 9 on a refused `send`: a defect of the spec (a cycle artifact outside the range), judged above as no finding of the change.
- The two quality cases `test_ruff_source_rules` and `test_shellcheck_source_rules`, which fail for a missing tool on the base and on the head alike; they cover Python and Bash files, which the change does not touch.
- `ScreenRegistry.show` and `drawResult` still work after `dispose()` (they build and draw, though they tell the page nothing). The game view never calls them after `dispose` (the address listener checks `disposed`), so this is not reachable in the product.

## Checks run

| Check | Command or method | Exit / result |
|---|---|---|
| head given | `git rev-parse HEAD` (reviewed worktree) | `0785c763…`, matches |
| sizes | `python -B .the-way/task-cycle/change_file_sizes.py 9e13af95… 0785c763…` | 0 |
| builds for the differential run | `node node_modules/typescript-compiler/bin/tsc -p tsconfig.browser.json` in worktrees of the base and of the head | 0, 0 |
| author's differential driver | `node driver.mjs` (copy of `reports/author-diff-driver.mjs`) with `DIST` of each build; `fc /b` of the two traces | 0, 0; no differences (287 lines, about 1 MB) |
| my extra scenarios | the same driver head with the five scenarios of `reports/review-whole-extra-scenarios.mjs`; `fc /b` | 0, 0; no differences (133 lines) |
| driver sensitivity | head build mutated (a) `placed` in reverse order, (b) `entered()` disabled in Przejście; trace compared with the base's; build restored | (a) no difference (order between roots unobservable, as the spec says); (b) differs, 220 lines of `fc` |
| focused tests (head worktree) | `npm.cmd test tests/view/<f>.test.mjs` for `state-store`, `run-screen-state`, `screen-registry`, `account-screen`, `chronicle-game`, `end-question`, `end-window-game`, `previous-save`, `uncaught-failure`, `clock`, `run-screen` | 0 each (for example, state-store 12/12, end-window-game 27/27) |
| types (head worktree) | `npm.cmd run typecheck` | 0 |
| lint (head worktree) | `npx.cmd eslint src/browser/view tests/view` | 0 |
| format (head worktree) | `npx.cmd prettier --check src/browser/view tests/view guidelines/coding-browser-module.md` | 0 |
| invariants and quality (reviewed worktree, Python, no build) | `npm.cmd test` for `tests/invariants/test_cross_part_imports.py`, `tests/invariants/test_browser_view_framework.py`, `tests/quality/test_node_test_selection.py`, `tests/quality/test_source_tool_scope.py` | 0 each |
| foundation | `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) | 0; `0 errors` (the "held by nothing" notices are of older decisions such as D-218 and D-220) |
| stale names | `git grep` for `renderScreens`, `openCharacterScreen`, `panelControls`, `mapsControls`, `screenHolder`, `focusShownScreen`, `pauseOnLeaving`, `drawMapsScreen`, `game-view.ts` outside `game-view.ts` | only current mentions in the guideline and the registry's own `shownElement` |

Not run:

- the full gate, `npm test` with no argument (the orchestrator runs it);
- `test_ruff_source_rules` and `test_shellcheck_source_rules` (tools missing here, failing on the base too);
- StrykerJS (testing.md runs it for changed `simulation` files only, and none changed);
- a check in a real browser of focus and events (D-88). No interface change the player sees exists, the jsdom traces match, and I took no screenshot.

## Reaches beyond the dispatch

- `.the-way/product-guidelines/reading.md` (whole) and `.the-way/elements/common/way_of_working.md` § "Reading the foundation": to select the guidelines and decisions, as the method gives.
- `.the-way/elements/decisions/template.md` (whole): to judge `Rejected: unknown`, the counts kept out of *Rejected*, and the form of D-407 to D-409.
- `foundations/part_map.md`: the entry `browser-view` and the `Files` lines of `agent-workflow` and `product-foundation`, to name the touched parts.
- `foundations/invariants.md`: the entry `uncaught-failure-game-state`, which a new test cites.
- `foundations/glossary.md`: the headings, to check that "store", "registry" and "entry" collide with no term.
- `foundations/decisions.md`: D-21, binding sentence only, to judge the citation of Minor 5.
- Code at the base: `src/browser/view/game-view.ts` whole, to compare behaviour.
- Code at the head: `src/browser/view/run-screen.tsx:296-325` (`setWindow`), `src/browser/view/clock.ts` (`send`, `startLoop`, `catchUp`, `dispose`), `src/browser/sim/game.ts:446-476` (`send`'s refusals), `src/browser/view/headquarters.tsx:235-260`, `program-list.tsx:280-305` and `program-panel.tsx:595-615` (which fields with `useId` mount at creation, for the changed order of building the roots), a grep of `tests/view/page-document.mjs` (it starts the memory limit itself), `account-api.ts` (`PreviousSavedGame`), a grep of `tests/view/previous-save.test.mjs`, `package.json`, `tsconfig.browser.json` and the head of `scripts/build.mjs` (to build the two commits).
- `reports/spec-reviewer-revision-report.md:36-60`: its observation on the types of the closed import list.
- The user's rules `the user's rule file for scripts` and `git.md` (given by a hook before scripts and worktrees).

## Working copies

- `.runs/review-whole/` held:
  - two `git worktree`s, `base` (`9e13af95…`) and `head` (`0785c763…`), each with a junction `node_modules` to the reviewed worktree's;
  - the traces, the logs of the checks, and two Python helpers that list and extract decisions.
- Removed: the junctions first (with `rmdir`; the reviewed worktree's `node_modules` was checked intact), then `git worktree remove --force` for each worktree (exit 0, 0), `git worktree prune`, and the directory deleted.
- The reviewed worktree's `git status --short` is empty and its HEAD is unchanged.
- Kept beside this report: `reports/review-whole-extra-scenarios.mjs`, the five extra scenarios. They run when appended to lines 1-190 of `reports/author-diff-driver.mjs`.

## Unread material

- Decisions of my selection: 294 decisions whose *Scope* names `browser-view`, `agent-workflow` or `product-foundation`. I read 38 whole and 256 by title only.
  - Read whole: D-03, D-04, D-28, D-36, D-96, D-173, D-207, D-212, D-217, D-247, D-264, D-265, D-267, D-268, D-280, D-281, D-283, D-284, D-287, D-294, D-295, D-311, D-322, D-323, D-324, D-329, D-339, D-342, D-351, D-352, D-368, D-370, D-371, D-401, D-402, D-407, D-408, D-409.
  - Every one of the 294 was run through by title, and I opened every one whose title points to the change.
  - Read by title only although the handoff named them: D-07, D-88, D-97, D-208, D-211, D-225, D-250, D-282, D-346, D-383, D-395, D-396. The code they govern is moved unchanged or not touched (see "The handoff's questions").
- Guidelines: `guidelines/coding.md`, `guidelines/coding-browser-module.md` and `guidelines/testing.md` read whole.
  - `guidelines/styleguide-browser-view.md`: not selected, since the work changes no interface the player sees.
  - The other `coding-<kind>.md` files: not selected, since no index row's *When to read* matches.
- Cycle files not read: `reports/spec-reviewer-report.md` (the first spec review, FAIL), `spec-reviewed.md`, `cycle.md`, `gate_times.md`, `reports/author-handoff.md`, and the spec designer's reports. Of `reports/spec-reviewer-revision-report.md`, I read its findings index and `:36-60`.
- Part map: only the parts named above.
- Code: of the screen modules (`headquarters.tsx`, `program-list.tsx`, `program-panel.tsx`, `run-screen.tsx`, `clock.ts`), only the passages listed under the reaches.

## Searches not found or unclear

- A "refused send" that leaves the state as it was (spec decision 9): not found in the code; `send` throws on every refusal.
- The pull request description that acceptance criterion 1 judges: it does not exist yet, so that criterion is unchecked here.
