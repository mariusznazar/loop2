# Report — slice 10 of the task `ekrany-i-menu`, the screen Programy

**Status:** done with concerns (the concerns are listed at the end: a stale comment in a file outside the slice, the
return step's D-173 clause, one thing no automated test covers).

## Commit

- `5e305f8` on `task/ekrany-i-menu` (from `0e7c625`), author address `mariusznn@gmail.com`. Not pushed. No
  uncommitted tracked change.

## What changed and why

| File | + / − | What |
|---|---|---|
| `src/browser/view/program-panel.ts` | 160 / 38 | The panel gets a mode: `createProgramPanel(controls, mode = "run")`. `"run"` is today's panel, untouched in behaviour (it keeps the select list „Program:” with „Kopia w przejściu” first, the actions, the copy section, „Przełącz postać na ten program”). `"programs"` is the new one: only the editor under the sentence „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.” (class `program-run-note`, shown while `state.run` is non-null, so going on, paused and ended alike; map name from `MAPS`). Both modes share one new method `showProgram(programId)`. The editor-drawing logic moved into a small shared helper `createEditorDrawing`. |
| `src/browser/view/game-view.ts` | 110 / 26 | Two panels (`runPanel` for Przejście, `programsPanel` for Programy) with one shared `panelControls`; Siedziba holds the headquarters alone (the class `columns` left it); Programy holds `createProgramList` on the left and the programs panel beside it. The list's acts: „Nowy program” shows the new program with a new history entry, „Zmień nazwę” renames, „Usuń” deletes and, where the program shown is gone, opens the nearest screen (`resolveScreen`) with the entry replaced. `drawPrograms()` gives the panel and the list the program the address names (first of the list for `#/programy`); it runs in `show` and `renderScreens`. Before the screen or the program changes, an editor field with focus in Programy is blurred so its uncommitted text commits to the program it was typed into. `dispose()` also disposes the list. The panels now update before `renderScreens()` in `store.apply` (the order was screens first). |
| `src/browser/styles.css` | 18 / 3 | `.screen.programs-screen` grid (list narrower, `minmax(200px, 1fr) minmax(320px, 3fr)`, one column under 720px with the `columns` screens), `.program-run-note` in `text-secondary`, comment on the `.screen` block updated. No value outside tokens. |
| `tests/view/program-panel.test.mjs` | 270 / 40 | `wiredPanel(start, mode)`; the mode's cases (below). The 40 removed lines are the re-indentation Prettier made when the wiring call took a second argument. |
| `tests/view/account-screen.test.mjs` | 238 / 40 | The cases that edited programs beside Siedziba edit them on Programy (below), six new cases of the screen, and `act` around creation and disposal of the game. |
| `src/browser/view/program-list.tsx` | 0 | In the slice's *Change* list but needed no change: its props, `chosenId`, links and acts already serve the screen. |

### Cases written (all in `tests/view/program-panel.test.mjs` unless noted)

- Four cases, one per stage of the waiting map run (going on, paused, ended in a death, ended in a completion): Programy shows the
  saved program, the sentence stands above the editor (checked by order of the elements), no select list, no list actions, no name
  field, no copy section, no switch button, counts null, and an edit lands as `editProgram(1)` while the run's copy is untouched.
  **This is the plan's first failing case**; it was run failing for the expected reason before the code (below).
- The sentence stands only while the game state holds a map run (absent before a send, gone after „Zakończ”).
- The panel of the map run's screen holds the sentence nowhere (guard; passed before the code too, since the sentence did not exist).
- `showProgram`: shows the asked program and takes its edits; a program gone from the list gives way to the first; a number that is not
  on the list shows the first.
- Uncommitted editor text lands in the program it was typed into when Programy shows another; showing the same program again (or time
  passing) keeps the field and its focus.
- **The case showing the offer follows the map run's character (row 11, questions 15 and 17, D-196):** Ala buys „Obchód”, Ola does not;
  on Programy, no „Obchód” outside a run, offered in Ala's run, still offered paused, still offered after a death, gone after „Zakończ”,
  and absent in Ola's run.
- In `account-screen.test.mjs`: Siedziba holds no panel, Programy holds the list and a panel with the sentence, Przejście holds the select
  list with the copy first and no sentence; the address picks the program on the list and in the panel, an edit lands in it and not in the
  copy, `#/programy` shows the first, history entries are as expected; the program each panel shows stays its own (a pick on the
  select list of Przejście does not move Programy); „Nowy program” shows the new program with a new entry; deleting the program shown
  opens `#/programy` in place of its entry.

### Changes to existing cases, each with its reason

- `ACTS` of „each act of the player …” (`account-screen.test.mjs`): `an edit of a program`, `an edit of a program's trip plan`,
  „Nowy program”, „Zmień nazwę”, „Usuń” now start on `#/programy` (`hash`), because the editor and the list of programs stand on
  Programy and no longer beside Siedziba. `an edit of the copy` takes its button from `.run-screen`, because Programy has an editor
  with a „Dodaj grupę” too and stands earlier in the document. „Zmień nazwę” types into the list's name field, which is a field of
  React, through `typeInto` and presses in acts of its own (`ownActs: true`): the typed name reaches „Zapisz” only when the act that
  typed it has ended (nested act kept it queued; first attempt saved the old name).
- `shownScreen`: Programy is recognised by `programs-screen`, not `program-panel`, because the map run's screen has a program panel now.
- „the page's sentence above the first screen leaves …”: the act that "changes no screen" was „Nowy program” on Siedziba; that button now
  opens the new program on Programy, so the act is creating a character.
- „a game built again after a conflict …”: the edit on Programy is pressed in act, since it redraws the list (React).
- `view.dispose()` and the game creation in „the document kept for the same account …” go through `inAct` (17 `dispose()` calls): the game holds a
  React root now (the list), and its unmount and first render are React updates that the test environment wants in act, as the existing
  `character.view.dispose()` calls already do.

## Checks (command, exit code)

Test-first run, before the code in `program-panel.ts`:
- `npm test -- tests/view/program-panel.test.mjs` → exit 1, 8 failing; the first four (Programy beside a waiting map run, each stage)
  and "the sentence stands only while …" failed on `deepEqual([], [NOTE])` (the sentence was missing); the three `showProgram`
  cases failed on `showProgram is not a function` (the method did not exist yet, a stub-less start, not a first failing assertion).

After the code and the tests:
- `npm test -- tests/view/program-panel.test.mjs` → 0 (31 tests)
- `npm test -- tests/view/program-list.test.mjs` → 0
- `npm test -- tests/view/program-editor.test.mjs` → 0
- `npm test -- tests/view/account-screen.test.mjs` → 0 (123 tests; 118 before my new cases)
- `npm test -- tests/invariants/test_saved_program_edit.py` → 0
- `npm test -- tests/invariants/test_copy_save.py` → 0
- `npm run typecheck` → 0
- `npm test -- tests/invariants/test_browser_view_token_values.py` → 0
- `npm test -- tests/quality/test_quality_invariants.py` → 0

Also run (tests of the code touched, not in *Checks*): `tests/view/headquarters.test.mjs`, `tests/view/screen-address.test.mjs`,
`tests/view/menu-bar.test.mjs`, `tests/invariants/test_browser_view_framework.py`,
`tests/invariants/test_application_build_kitchen_sink.py`, `tests/invariants/test_browser_view_focus_outline.py`,
`tests/invariants/test_streak_program_change.py` → all 0. Final re-run of the *Checks* list on the committed tree → all 0.

Not run: `npm test` without an argument (the full gate) and `foundation_check.py`, as the handoff says. I changed no test of an
invariant, so no invariant test was needed to be seen failing; the two invariant tests of the *Checks* passed unchanged
(they do not reach the new screen: see *Own-work check*).

## Own-work check

- **The requirement most likely missed:** that the program panel on Programy never shows or edits the copy while a map run waits or has
  ended, and that the program each panel shows stays its own (question 15; "the game view holds one panel for Przejście and one for
  Programy"). A slip here loses the player's unsaved copy or edits a program other than the one shown.
- **The check:** the four stage cases (an edit on Programy beside a run going on, paused, dead and complete lands as `editProgram`
  with the run's copy object identical before and after) and, on the whole page, "the program each panel shows stays its own" (pick
  program 1 on the select list of Przejście, edit there, then at `#/programy/2` edit on Programy: the two saved documents show the
  group in program 1 and program 2 respectively, and the select list of Przejście still reads 1). I also broke the code to see the
  cases catch it: removing `programsPanel.showProgram(chosenId)` from `drawPrograms` failed the address case and the own-program case;
  removing the blur from `showProgram` of the programs panel failed the uncommitted-text case; hiding the sentence for ended runs
  failed the death and completion stage cases. All restored before the commit (the diff of the commit has none of them).
- **A mutation no automated test catches:** removing `commitProgramsScreen()` from `show` in `game-view.ts`. jsdom's programmatic
  `blur()` does not fire `change`, so no case in `account-screen.test.mjs` can show that text typed into an editor field and left
  uncommitted is committed to the right program when the address changes by the browser's back or a link. The panel-level case
  (hand-made model that does fire `change`) covers `showProgram`'s own blur only. This is the "real events and focus are checked in
  the browser" category (D-88); I did not make a real-browser check of this particular path (no way to type and then press back
  without leaving the focus; the orchestrator's walk can).
- **Real browser** (route of `.claude/skills/loop2-play/SKILL.md`: `npm run local`, `playwright-cli`, 1280×720; the start was ended with
  `npm run local:stop` and `.playwright-cli/` deleted):
  - Siedziba after registration, no panel beside the headquarters (snapshot).
  - Programy with one program: list on the left with „Program” marked by the bar in `selected`, „Nowy program”, „Zmień nazwę” and
    a disabled „Usuń”; editor and „Plan wyprawy” on the right, no select list, no copy (screenshot). Programs in the page's two
    columns, the list column narrower.
  - „Nowy program” changed the address to `#/programy/2` with a new entry (history length grew), and the link for program 1 returned
    to `#/programy/1` with `aria-current` moving; deleting program 2 (shown) gave `#/programy`, the first program marked,
    history length growing by the pick only (the delete replaced), focus on the screen `programs-screen`.
  - A map run sent from Siedziba lands on `#/postac/1/przejscie` (screenshot): the select list „Program:” shows „Kopia w przejściu”,
    the copy's heading and buttons, the editor, the map-run column; no sentence there. The bar's „Programy” then showed `#/programy`
    (screenshot): the list with two programs, „Program” marked, the sentence „Zmiany tutaj nie dotykają przejścia na mapie Las.” above
    the editor in the muted colour, the bar offering „Wróć do przejścia · Las · minuta 4”.
  - Not seen in a browser: the narrow layout (under 720px); a map run ended in a death on Programy (covered by the stage cases on
    the hand-made model and by the sentence logic, which depends only on `state.run`); typing a name in the list's field with the
    real keyboard (covered by `tests/view/program-list.test.mjs` and the `ACTS` rename case on jsdom).

## Choices made beyond the plan

1. **Mode as a parameter, two factories behind one entry.** `createProgramPanel(controls, mode = "run")` delegates to
   `createRunPanel` (today's code, renamed) and `createProgramsPanel` (new, about 70 lines). Rejected: one big function with
   `if (mode === ...)` around every part (a 290-line function whose list, actions, name field, copy section and switch are all
   guarded; more risk to the run mode). Cost if wrong: the two share only the editor-drawing helper; a later rule that should hold
   for both panels must be written twice.
2. **`showProgram(programId)` on both modes.** In the run mode it is the pick on the list; in the programs mode it is how the game
   view names the program (the address). Rejected: a third argument of `update` (re-entrancy: a commit made by the blur re-enters
   `update`, and a new program passed on that nested call would let the pending text land in the wrong program). Cost if wrong:
   `showProgram` in the run mode is used by nobody but the tests.
3. **`show()` of the run panel blurs the editor only when the program shown changes** (it blurred always before). So that showing
   what is shown changes nothing in both modes. Behaviour change in an edge nobody hits (a `show` of the same value); the existing
   cases pass.
4. **After „Nowy program” the new program opens with `go` (a new entry); after deleting the program shown the nearest screen opens
   with `replace`.** The plan says "a pick … with a new entry" and "a deletion … leads to the nearest screen (question 8)" and does not say
   which for create or delete. `replace` because the entry the player was on names a program that is gone, as D-281 handles an address that names no
   existing screen. Rejected for the delete: `go` (back would land on an address that no longer names a program, and the
   same rule would then replace it anyway). Cost if wrong: one back press fewer after a delete.
5. **The sentence in `text-secondary`.** It explains rather than warns (the styleguide's roles: `text-secondary` = description or note,
   `warning` = something will not run or is not saved). Nothing in D-166 or the styleguide fixes a role. If the owner wants `warning`
   it is one line in `styles.css`.
6. **Programy's grid `minmax(200px, 1fr) minmax(320px, 3fr)`** and the list in a `screen-area`; the column sizes are layout dimensions
   (exempt in D-43). The plan fixes no widths.
7. **Two panels update before `renderScreens()`** in `store.apply` (and at build), so `drawPrograms` in `renderScreens` calls
   `showProgram` on a panel that already has the new state. Rejected: leaving the old order (`showProgram(5)` on a panel whose state
   does not hold program 5 yet would fall back to the first).
8. **`drawPrograms` skips the list redraw while `state.programs` and the chosen number are the same objects** (a game minute during
   a run changes the state each second; the list is a React root with `flushSync`). Cost if wrong: a list that does not redraw on a
   change that reuses the same `programs` array; the simulation always returns a new array on a change of programs (the
   `ACTS` cases rename, create and delete show the list in step).
9. **Focus after deletion:** `focusShownScreen()` runs after the delete (moves focus to the screen only where it was lost, as the
   disabled „Usuń” loses it with one program left). Seen in the browser: `programs-screen` has focus.
10. **The first program is shown on Programy until named, and one gone gives way to the first** inside the panel too (`savedShown`),
    not only in the game view, so the panel never shows a program that is not on the list whatever the view tells it.

## Reaches beyond the handoff

- `src/browser/view/screen-address.ts` (whole) and `src/browser/view/run-screen.ts` (whole): named in the handoff's note as
  earlier slices' files; I read them to know `Screen`, `resolveScreen`, `markedMenuItem` and how Przejście takes its panel.
- `src/browser/view/program-editor.ts` (the export types, `update`, the Akcja select at line 872, `offerOf`): to write the case of the
  offer and to know what `editor.update(state, ...)` does with the state.
- `tests/view/program-list.test.mjs` is not opened whole (only its imports and one helper by grep); `tests/sim/skills.test.mjs`
  (the headquarters helper, the „Obchód” test at line 588) and `tests/sim/understanding-fixture.mjs`: the way to buy „Obchód” in a
  fixture. `tests/view/page-document.mjs` (whole, `inAct`, `typeInto`, `watchConsole`): to understand why creation and disposal
  of the game had to go through act.
- `foundations/decisions.md` D-173 and D-174 were in the handoff's *Read* list; I did not read D-196's neighbours beyond it.
- `guidelines/styleguide-browser-view.md`, `guidelines/testing.md` read whole as the handoff names.

## Mismatches between the plan and the code

- **Small:** the handoff's note that Slice 8 built one moving panel and my section asks for two. Followed my section: two panels, the
  one on Przejście passed to `createRunScreen`, the one on Programy placed in `programsScreen` by the game view.
- **Small:** `program-list.tsx` is in the *Change* list and needed no change.
- **Small:** `tests/view/program-panel.test.mjs`'s three `showProgram` cases failed first with "not a function", not with an
  assertion: I did not add a stub of `showProgram` before running them. The four stage cases that carry the plan's first failing case
  did fail on their assertion.

## Concerns for the return step and the orchestrator

1. **Stale comment outside the slice's *Change* list.** `src/browser/view/run-screen.ts` (lines 4–8 of the header and the doc of
   `createRunScreen`'s `panel` parameter: "which the game view moves between the screens that hold it", "the program panel with
   the copy beside the column") still says the one panel moves. It is the panel of Przejście only now. I did not touch it (outside the
   boundary). Same for the comment in `src/browser/view/program-list.tsx` header: still true.
2. **D-173** (as the handoff's ruling says): "after „Zakończ” the program panel shows the program the copy belongs to" no longer holds
   in its old form, since „Zakończ” leads to Postać. I did not change D-173 and added no behaviour for it. A case in the old
   `program-panel.test.mjs` (`„Restart” and a death show the copy with counts; „Zakończ” shows the copy's program with them`) still tests
   the run-mode panel after `end(...)` as before: the run-mode panel's `nextShown` still moves to the copy's program at the end. That
   behaviour is harmless but the clause it tests is the one the return step corrects; the test may need to follow D-173's new text.
3. **`counts` on Programy after „Zakończ”.** `shownContent` still puts the counts beside the program they stand beside
   (`countsProgram`) on Programy when there is no run. The plan does not say whether Programy shows counts at all; the old
   behaviour after „Zakończ” showed them beside the copy's program in the one panel. I kept it. If the screens task wants no counts
   on Programy, it is a change in `shownContent`'s use in `createProgramsPanel`.
4. **The program editor's header comment** (`program-editor.ts`, "Builds the program editor under the program panel's list, which names
   the program shown, so the editor carries no heading of its own") is still true for Programy because the list names the program;
   on Przejście the select list does. Not touched.

## Searches not found or unclear

- None of the foundation entries the handoff names was unclear. One thing I looked for and did not find: a rule of the styleguide or
  of D-166 for the role of the sentence „Zmiany tutaj nie dotykają …” (see choice 5); nothing in `foundations/decisions.md:3012-3030` or the
  roles table fixes it, so it is mine to report.
- Looked for a test that proves the commit of uncommitted editor text on a change of the address in jsdom: not possible (jsdom's
  programmatic `blur()` fires no `change`); see *Own-work check*.
