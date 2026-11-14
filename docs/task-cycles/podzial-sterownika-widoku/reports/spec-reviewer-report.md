FAIL

# Report — the reviewer of the spec (write-spec)

- Spec reviewed: `.runs/task-cycles/podzial-sterownika-widoku/spec.md`
- Method: `.the-way/task-cycle/spec/SKILL.md` and `review.md` beside it, read whole, at the pinned `.the-way` of the worktree.
- Against: the frozen task (whole), the designer's handoff and report, `src/browser/view/game-view.ts` on the base `9e13af95` (whole).

## Findings

### 1. The spec contradicts itself on what the state of Przejście does after `halt()` — a wrong guess changes what the player sees

Decision 9, `tests/view/run-screen-state.test.mjs`: „nothing changes after halt except `forgetQuestion`”.

Decision 3: `entered()` — „the window opens where the map run has ended” (no halt guard); `left()` — „the question closes unless the game is halted, the wait ends, the player is off the screen” (the wait and the place change after halt too).

Today's code agrees with decision 3, not with the test line: `show` sets `endWindowOpen = true` on entering an ended map run (`game-view.ts:1129-1136`) and `effectPending = false` on leaving (`:1127`) with no check of `halted`, and `current` changes whatever the halt; only `closeQuestion`, `askToEnd`, `openWindow`, `closeWindow`, `effectEnded` are guarded (`:547`, `:613`, `:663`, `:671`, `:679`). Navigation keeps working after `halt()` (the address listener and `show` are not stopped).

A builder who writes the module to make the test line pass makes `entered()` and `left()` no-ops after halt: after an error nothing handled, a player who leaves the screen of an ended map run and comes back no longer gets the window (D-368, D-371 „it becomes open again at every entering”), and the screen state keeps believing the player is on the screen after leaving. The test line should name what is guarded (`ask`, `closeQuestion`, `openWindow`, `closeWindow`, `effectEnded`) and say that `forgetQuestion`, `entered` and `left` work after halt as today.

### 2. `openWindow` of Przejście drops the `setQuestion(false)` that today's code sends

Decision 5, the row „run screen | `openWindow`, `closeWindow`, `effectEnded` | Przejście | the screen state, then the window's sync; no act”. Decision 3: `openWindow()` is „today's three controls (`:662-682`) without their call of the screen”.

Today `openWindow` (`:662-668`) calls `closeQuestion()`, which tells the run screen `setQuestion(false)` (`:549`), before it opens the window. In the spec the question closes inside the screen state's `openWindow()`, but nothing makes the entry call `setQuestion(false)`: the general sentence „`setQuestion(false)` where `closeQuestion` closed one” does not fire, because the entry calls `openWindow()`, not `closeQuestion()`.

Reachable: a question standing over an ended map run (D-324 keeps „Koniec przejścia” in the header then). A builder following the row leaves the question drawn in the program panel; the window covers it, and after „✕” it shows again over a map run with no question in memory. Nothing redraws it: an ended map run's readings return the state held, which `take` ignores (`:398`), so no `drawResult` resets it. D-324 asks that „Koniec przejścia” close the question as „Wróć” does. The row should say: close the question (`closeQuestion()`, `setQuestion(false)` where it closed one), then `openWindow()`, then the sync — or `openWindow()` returns whether it closed a question and the entry tells the screen.

### 3. The import rule of an entry forbids what the entries of Programy and Przejście must import

Decision 1 calls each import line „a rule the review checks”: „An entry imports its screen's factory, the simulation, `screen-address.ts` where it navigates, and types of the store, the registry and (the entry of Przejście only) the screen state”.

Decision 5 gives the entry of Programy the pull and the reset (`:838-1071`). That code needs `CHECK_FAILED`, `FETCH_FAILED`, `NO_PREVIOUS_SAVE`, `NOT_ALLOWED`, `pullResultLine` from `previous-save-lines.ts`, the types `AccountResult`, `PreviousSavedGame` and `AccountClient` from `../account-api.ts`, and two factories (`createProgramList`, `createProgramPanel`) plus the types `PullView`, `ResetView` and `ProgramPanelControls`. The entry of Przejście needs `createProgramPanel` as well as `createRunScreen`, and the type `Chronicle`. Only the simulation and the factories fit the rule's words.

The builder has to choose: break a rule the change's reviewer is told to check, or move the pull's lines somewhere the spec does not name. The rule should list what an entry may import in full — for instance its screen's factories and the modules and types those factories' inputs take, `previous-save-lines.ts` and the types of `account-api.ts` for Programy — or say plainly that the list is not exhaustive.

## Checked and found sound

- The task's line numbers at `2b4d760c` against the base: checked by `git show 2b4d760c:src/browser/view/game-view.ts` at `:220`, `:361`, `:377-381`, `:451-453`, `:675-677`, `:882-890`, `:910`, `:932`, `:944`, `:1018-1023`. They map as the spec's table gives. Every base line the spec cites matches `game-view.ts` on the base.
- Twelve test files call a factory, the clock, the saver, the chronicle or the folding directly: confirmed by search (`character-screen`, `clock`, `chronicle`, `headquarters-screen`, `game-saver`, `maps-screen`, `program-list`, `rule-signs`, `run-screen`, `program-panel`, `tabs-area`, `scene`). Five test files import `game-view.js`; the task's requirement („every existing test file unchanged”) holds whatever the count.
- „Depends on time” read as every act today preceded by `clock.flush()`: matches the code (pull only where programs were accepted, `back` only where it resumes, the leave's pause, `askToEnd`), with `create` and `onBuy` without a reading and the reset with no result. This is consistent with *To do* 1 and settlement 3.
- New tests for the three modules and none for the entries or the panel acts: consistent with the acceptance criterion („nowe moduły dostają własne testy”, read as the three modules of *To do* 1–3) and with testing.md, „Not tested on purpose” (code that only passes data on).
- The kept call orders hold against the code: the clock is created before the saver, and neither reads or calls back at creation (`clock.ts:84-109`, `game-saver.ts:219-222`). The leave's pause draws while the old screen is still current. Commit comes before leave, and both before the address. Postać comes before Mapy, while-shown built before the always elements are hidden. `setQuestion`, sync and `update` keep their order within Przejście's draw. The window's owed focus is set after the first show and before the catch-up.
- `focusShown()` replacing `runScreen.focus()`, `characterScreen.focus()`, `mapsScreen.focus()`: each screen's `focus()` is `element.focus()` (`run-screen.tsx:303-305`, `character-screen.tsx:197-198`, `maps-screen.tsx:461-462`, `headquarters.tsx:415-416`), so the result is the same.
- „Wejdź” disposes Mapy inside its own guard, and the guard's later draw reaches a disposed screen. `maps-screen.tsx:459` ignores `update` after `dispose`, as `mapsScreen?.update` does today.
- The first draw before the first show: the run screen gets `setWindow(false)` and then `setWindow(true)`, where today it gets `true` twice. Both end with the window drawn after `update`, still out of the page, and the focus owed as today (`run-screen.tsx:266-316`).
- What the task settled stays: separate React roots, factory inputs unchanged, the three settlement rows as decisions, `app.ts` untouched, and *Out of scope*. The decisions the handoff names for what the player sees each have a place in decision 8.

## Observations (not findings)

- `saveAndEnd` row: „the save and the end as `:690-704`” leaves out today's guard `:689` (no map run, or no unsaved changes after the reading → return, no navigation). It is hardly reachable, because a reading changes no copy. The builder should still copy `:688-704` together.
- `tests/view/uncaught-failure.test.mjs` reaches the game view through `startApp` and guards D-323 (`invariant: uncaught-failure-game-state`). `account-screen` and `previous-save` also go through `startApp` in part. The spec's count of „five through `createGameView`” is right for direct imports, but the existing proof of `halt()` at game level is this sixth file, which the request may name.
- Decision 4 says the order between screens within one draw is not observable. That holds because only one screen is shown, and a hidden element takes no focus. `placed` in table order puts Programy's ask/leave before Przejście's sync, where today they come after it. This is unobservable by the same argument, but „in this order, which is today's” is not literal for `placed`.

## Reaches beyond the handoff

- `foundations/invariants.md`: the list of headings and *Part* lines, and three entries read whole — `uncaught-failure-game-state`, `expired-session-unsaved-progress` (both cited by `tests/view/`) and `cross-part-imports` (Part `every`, from D-351). Read to check the store's test citation and the import rules.
- `git show 2b4d760c:src/browser/view/game-view.ts` at the task's lines — to check the spec's mapping, as the handoff asks.
- Search of `tests/` for `game-view.js`, `app.js`, `createGameView`, `startApp` and the direct factory calls — to check the five and the twelve. The imports of `tests/view/uncaught-failure.test.mjs` were read (`:8-27`, `:253`). The hits in `tests/sim/rules.test.mjs` and `tests/invariants/test_simulation_isolation.py` were confirmed to be text fixtures.
- `src/browser/kitchen-sink/kitchen-sink.ts` imports — to rule out the D-269 rule of `coding-browser-module.md` (the kitchen sink imports nothing the change moves).
- `tests/invariants/test_browser_view_framework.py`, test names — to rule out a rule on new `.ts` files.

## Unread material

- `foundations/decisions.md`: of the named decisions, D-324 and D-371 were read whole. D-03, D-04, D-173, D-207, D-280, D-281, D-283, D-284, D-295, D-311, D-322, D-323, D-339 and D-368 were read only in the fragments the frozen task quotes. D-07, D-28, D-36, D-208, D-211, D-212, D-250, D-264, D-265, D-267, D-282, D-287, D-346, D-351, D-370, D-383 and D-395 were not read.
- `foundations/invariants.md`: beyond the three entries above, the browser-view and every invariants that the named decisions link to were not searched for or read.
- `foundations/glossary.md`: not read.
- `foundations/part_map.md`: only the entry `browser-view` (`:1-28`).
- `guidelines/coding.md`: not read. `guidelines/coding-browser-module.md` and `guidelines/testing.md` were read whole.
- Code read: `game-view.ts`, `clock.ts`, `game-saver.ts` and `run-screen.tsx` whole; `maps-screen.tsx` `:340-470`; `character-screen.tsx` and `headquarters.tsx` only through a search for `focus()`. Not read: `screen-address.ts`, `app.ts`, `end-question.tsx`, `end-window.tsx`, `program-panel.tsx`, `program-list.tsx`, `chronicle.ts`.
- Tests: the five files through `createGameView` and the twelve with direct calls were not read; only their imports and the factory calls were searched.

## Searches not found or unclear

- Whether any existing test exercises navigation after `halt()` (finding 1) or „Koniec przejścia” with the question standing and then „✕” (finding 2) was not established. Whether the existing tests would catch a wrong guess is therefore unknown.
- The task's eleven test files with direct calls: the search finds twelve. Which one the task left out is unclear; it does not matter to the requirement.

## Working copies

None made; no directory under `.runs/spec-reviewer/` was created.
