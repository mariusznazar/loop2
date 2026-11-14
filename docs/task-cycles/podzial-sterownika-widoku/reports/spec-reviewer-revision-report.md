PASS

# Revision report — the reviewer of the spec (write-spec, review of one revision)

- Revised spec: `.runs/task-cycles/podzial-sterownika-widoku/spec.md`
- Compared with: `.runs/task-cycles/podzial-sterownika-widoku/spec-reviewed.md`, by a word-level diff of the two files, and with the designer's `reports/spec-designer-revision-report.md`.
- Earlier findings: `reports/spec-reviewer-report.md`.
- Method: `.the-way/task-cycle/spec/review.md` (review of a revised spec), read whole.

## Earlier findings

1. **The state of Przejście after `halt()` — resolved.**
   - Decision 3 now names exactly the guarded methods: `ask`, `closeQuestion`, `openWindow`, `closeWindow` and `effectEnded`. These match `game-view.ts:547`, `:613`, `:663`, `:671` and `:679` on the base.
   - It says that `forgetQuestion`, `entered`, `left` and `built` work after halt as today, and that `left` leaves a standing question in place after halt. That matches today: `closeQuestion` is guarded, while `effectPending = false` and the change of `current` are not (`:1124-1136`).
   - Decision 9's test line now tests the same thing. The contradiction is gone.
   - The designer's statement that no existing test moves between screens after `halt()` agrees with what I read:
     - `end-question.test.mjs:884-913` stays on the screen of the map run;
     - `end-window-game.test.mjs:1145-1154` presses only „✕”;
     - the test names in `uncaught-failure.test.mjs` at `:357`, `:428` and `:448` cover a reading, an act and the buttons of Mapy.
2. **„Koniec przejścia” with the question standing — resolved.**
   - Decision 3's `openWindow()` now closes a standing question and returns whether it closed one.
   - Decision 5 gives `openWindow` a row of its own: the state's `openWindow()`, then `setQuestion(false)` where it closed a question, then the window's sync. That is today's order at `:662-668`, `:549`.
   - The sentence on the entry's calls names `openWindow` too, and decision 9 tests the state's half.
   - `end-window-game.test.mjs:742-757` reads as the designer reports. It checks that the question is gone and the window open, and presses no „✕” afterwards, so the screen's `setQuestion(false)` rests on review, as the spec now says.
3. **The import rule of an entry — resolved.**
   - Decision 1 now gives a closed list per entry. I checked it against what each act and memory in `game-view.ts` uses:
     - **Siedziba:** `createHeadquarters`; `createCharacter`, `stopLoop`, `closeAwayReport` and `takeLoopPractice` from the simulation.
     - **Programy:** `createProgramList`, `PullView`, `ResetView`; `createProgramPanel`, `Folding`, `ProgramPanelControls`; the constants and `pullResultLine` of `previous-save-lines.ts`; `AccountClient`, `AccountResult` and `PreviousSavedGame`; `resolveScreen` and `screenAddress`; `readPreviousPrograms`, `appendPrograms`, `programById` and the program acts from the simulation.
     - **Przejście:** `createRunScreen`, `RunScreenControls`; `createProgramPanel`, `Folding`, `ProgramPanelControls`; `Chronicle`; the types of the screen state; `end`, `restart`, `setPace`, `setPaused`, `mapRunEnded`, `copyHasUnsavedChanges`, `programById`, `saveCopyAsNewProgram`, `saveCopyIntoProgram` and `suggestedProgramName` from the simulation.
     - **Postać:** `createCharacterScreen`; `buyBranch` and `stopLoop` from the simulation.
     - **Mapy:** `createMapsScreen` and `MapsScreenControls`; `pickProgram` and `stopLoop` from the simulation.
   - Every name exists where the list puts it (`program-panel.tsx:58`, `:99`; `program-list.tsx:39`, `:49`; `chronicle.ts:55`; `previous-save-lines.ts:18-80`; `screen-address.ts:83`, `:111`). No import the moved code needs falls outside the list.

The observation on `saveAndEnd`'s guard is also taken in: decision 5 now copies `:686-705` with the guard at `:689`. The observation on `uncaught-failure.test.mjs` is taken in too: decision 8's D-323 row and decision 9 name it.

## What the revision broke besides

Nothing.
- The diff touches only decision 1's import list, decision 3's `openWindow` and the paragraph on halt, decision 5's `saveAndEnd` row, `openWindow` row and sentence on the entry's calls, decision 8's D-323 row, and decision 9's test line and new paragraph on what the existing tests pin.
- Each change answers one of the three findings or one of the two observations; nothing else in the spec changed.
- None of the changes reopens what the task settled or changes what the player sees. Read against D-173, D-311, D-323, D-324, D-368, D-370 and D-371, the halt and question rules now describe today's code exactly.

## Observations (not findings)

- **Types the closed list does not name:** for Programy and Przejście the list names types one by one, and leaves out `ProgramPanel`, `ProgramList` and `RunScreen`, and, for every entry but Programy, the type `Screen` of `screen-address.ts`.
  - The moved code needs none of them by name: the factories' return types and the registry's `ScreenEntry` type the values by inference.
  - A builder who adds an explicit annotation, such as `screen: Screen` in Postać's `key`, makes a type-only import the rule does not list.
  - A type-only import adds no dependency between parts. The reviewer of the code can let it pass, or the registry can re-export `Screen`.
- The order of `placed` (my first report's observation) is unchanged, as the designer says; it stays unobservable.

## Reaches beyond the handoff

- **Since the first review:**
  - `tests/view/end-window-game.test.mjs` at `:738-759` and `:1140-1155`, and `tests/view/end-question.test.mjs` at `:880-915`, to check the revision's claims about what the existing tests pin;
  - the test names of `tests/view/uncaught-failure.test.mjs`;
  - `src/browser/view/scene-picture.ts`, imports only, to confirm the new `run-screen-state.test.mjs` can run with no document;
  - `src/browser/view/end-window.tsx`, a search for focus and effects, to confirm the window takes the focus when it mounts (`:59-66`);
  - `src/browser/view/run-header.tsx`, `src/browser/view/end-question.tsx` and `src/browser/view/end-window.tsx`, a search for their control types.
- **From the first review:** as listed in `reports/spec-reviewer-report.md`.

## Gaps of the first review, closed now

- **Decisions (`foundations/decisions.md`):**
  - Read whole: D-03, D-323, D-324, D-371.
  - Read through the statement, its scope and its verification: D-04, D-173, D-207.
  - Read through the statement, up to its *Scope* line: D-07, D-28, D-36, D-208, D-211, D-212, D-250, D-264, D-265, D-267, D-268, D-280, D-281, D-282, D-283, D-284, D-287, D-295, D-311, D-322, D-339, D-346, D-351, D-368, D-370, D-383, D-395.
  - Not named but cited by the spec, read the same way: D-96, D-217, D-247, D-329, D-342, D-352, D-401, D-402.
  - None contradicts the revised spec. In particular:
    - D-268 allows `node:assert` in a test file that loads no document imitation, as `run-screen-state.test.mjs` is planned.
    - D-264 and D-268 cover the jsdom tests of the store and the registry.
    - D-401 keeps the pull as an act of the player that saves at once.
- **`foundations/glossary.md`:** read whole. The spec's terms („store”, „registry”, „entry”, „moment of saving”) clash with no entry; „moment of saving” is the term the glossary's *Not* of „save time” already uses.
- **`guidelines/coding.md`:** read whole. Nothing in it bears on the spec beyond what `coding-browser-module.md` and `testing.md` hold.
- **Code:**
  - `screen-address.ts`: whole.
  - `app.ts`: every use of `createGameView` and `GameView`. It imports `createGameView`, `GameEntry`, `GameView`, `KeptGame` and `ScreenPlace`, all of which the spec keeps or re-exports.
  - `program-panel.tsx`: `:54-181` and `:660-796`. `setQuestion`, `showProgram`, `update` and `dispose` are as the spec relies on them.
  - `chronicle.ts`: `record`, `createChronicle` and `entriesToDeath`.
  - `end-question.tsx` and `end-window.tsx`: their control types and the window's focus.

## Unread material

- `foundations/decisions.md`: the *Verification*, *Rationale* and *Rejected* of every decision listed above as read through its statement. Of D-04, the rationale from `:108` on.
- `foundations/invariants.md`: beyond `uncaught-failure-game-state`, `expired-session-unsaved-progress` and `cross-part-imports`, the browser-view and every invariants that the named decisions link to were not each read whole.
- Code:
  - `headquarters.tsx` and `character-screen.tsx`: only their exported types and `focus()`; their factories' inputs match the calls in `game-view.ts`, which the spec keeps.
  - `program-list.tsx`: only its exported types.
  - `maps-screen.tsx`: only `:340-470` and its exported types.
  - `end-question.tsx` and `end-window.tsx`: beyond their control types and the window's focus effect.
  - `chronicle.ts`: beyond the three functions named above.
- Tests: the five files through `createGameView` and the twelve with direct calls beyond the passages named above.

## Searches not found or unclear

none

## Working copies

None made; no directory under `.runs/spec-reviewer/` was created.
