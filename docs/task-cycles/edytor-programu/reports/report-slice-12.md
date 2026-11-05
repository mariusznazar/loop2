# Report — slice 12 of `edytor-programu`: the program panel in React

Saved by the orchestrator from the executor's returned text (its tool refused the file); layout condensed, content kept.

**Status:** done with concerns. **Commits** (base `9d1d5f2`, not pushed): `d88b366` (the panel, tests, game view), `3d81280` (a browser-found defect in `rule-panel.tsx`).

## Files changed
- `src/browser/view/program-panel.tsx` (renamed from `.ts` with `git mv`, +705/-600): `createProgramPanel(controls, mode, folding)` returns `element`, `update(state, events)`, `showProgram(id)`, `dispose()`; one React root per panel rendered with `flushSync`; `RuleListView`, `RulePanelView` and (Programy only) `TripPlanView` are components inside it. Pure exports unchanged (`programListOptions`, `nextShown`, `shownContent`, `NAME_MESSAGES`, `ShownProgram`, `ProgramPanelControls`, `ProgramPanelMode`); new: `createFolding`, `Folding`, `ProgramPanelView`.
- `src/browser/view/game-view.ts` (+7/-3): makes the folding once and gives it to both panels; calls `dispose()` on both panels at its own `dispose()`.
- `src/browser/styles.css` (+31): `.program-title`, `.program-panel .trip-plan`, `.program-editor-layout` with `.with-panel`; no new colour, role or value.
- `tests/view/program-panel.test.mjs` rewritten on jsdom, 43 cases; `tests/view/account-screen.test.mjs` +39/-16.
- `3d81280` also touches `rule-panel.tsx` (+6) and a panel test file (+33).

## What was built
- Run mode: „Program:” select („Kopia w przejściu” first), „Nowy program”, „Zmień nazwę”, destructive „Usuń” and „Przełącz postać na ten program”, the copy's heading, „Niezapisane zmiany w kopii.”, the three copy buttons, the line of a changed program, the name field with messages; no trip plan; parts that do not apply are no longer drawn (the DOM panel kept them hidden).
- Programy mode: the sentence „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.” while the game state holds a map run; below it the program's name (`h2.program-title`), `TripPlanView` keyed by program number (a new section per program), then the rules.
- Both modes: the rule list followed by the rule panel at its right once a row or header is open; the open rule is panel state and resets when the shown program changes; the copy's panel says „Zmiana zeruje passę tego przejścia.”; after „✕” or Escape the focus returns to the closed row or header.
- Folding: `createFolding()` is a store (`snapshot`, `subscribe`, `set`) read with `useSyncExternalStore`, keyed by saved-program number or `copy`; a fold on one panel redraws the other; a reload forgets it.
- Focus and uncommitted text: the old panel's focus rules kept; text typed and not committed goes to the program it was typed into (the boundary blurs the editor before showing another program).

## Checks
- Test first: with `createFolding` an empty stub on the old DOM panel, the two new cases (trip plan between name and rules on Programy; none on a map run's screen) failed with exit 1 on an assertion (`the program's name stands: expected a true value, got false`); after the panel they passed.
- All exit 0: `program-panel` (43), `rule-editor` (59), `trip-plan` (11), `program-list` (10), `account-screen` (126), `program-editor` (60), `react-controls` (53); invariants `test_saved_program_edit.py` (4), `test_copy_save.py` (5), `test_streak_program_change.py` (5), `test_browser_view_framework.py` (9), `test_browser_view_token_values.py` (4), `test_browser_view_focus_outline.py` (3); `npm run typecheck`.
- Quality test: first run also failed `test_eslint_source_rules` (six `unbound-method` errors; `Folding` and `PanelActions` changed to property function types); second run exit 1 with the 2 base errors. ESLint `--max-warnings 0 --no-inline-config` and Prettier `--check` on the changed files clean.
- Browser-defect case: with `preventDefault` removed `program-panel.test.mjs` exit 1 (1 failed); with it exit 0.
- Not run: the full gate; `foundation_check.py`; StrykerJS.

## Own-work check
Four hand mutations against `program-panel.test.mjs`, restored byte-identical (`cmp`), all caught with exit 1: blur before showing another program removed (2 failed); folding keyed per screen (2); trip plan on both screens (1); focus not sent back to the row after close (2).

## UI check (real browser on `npm run local`, Playwright CLI, 1400×1000; state composed by the executor's own script from the simulation and sent by the ordinary save request)
Screenshots in `C:\Storage\repos\loop2-wt\edytor-programu\.runs\task-cycles\edytor-programu\reports\` (21 files `slice-12-*.png`):
- Programy with list, editor and folded plan: `slice-12-programy-list-editor.png`.
- The six actions of acceptance criterion 3: `slice-12-panel-field-condition.png`, `-number.png`, `-condition-target.png`, `-action.png`, `-action-target.png`; afterwards the rule read „Zapas poniżej 8 · Patyk → Zbierz — Patyk”.
- Greyed reasons: „wybierzesz w przejściu postaci, która ją kupiła” (`slice-12-reason-branch-without-run.png`); „gałąź niewykupiona” (`slice-12-run-screen-panel-open-action-reasons.png`); „nie znasz jeszcze celu” (`slice-12-reason-no-target.png`); „nie ma go na tej mapie” could not be shown: both maps in the data hold all four resources (`slice-12-reason-not-on-map-run-screen.png` shows none; `rule-editor.test.mjs` covers the reason).
- Held value chosen and greyed with no reason: `slice-12-held-value-greyed.png`.
- Folding: `slice-12-folded-group.png`, `slice-12-folded-all.png`; a fold survived Siedziba and back (rules drawn: 0).
- Trip plan: `slice-12-trip-plan-empty.png` („Plan wyprawy: pusty”), `slice-12-trip-plan-unfolded.png`; Enter on the folded line opens and closes it.
- Sentence above the editor beside a map run: `slice-12-programy-beside-map-run-sentence.png`.
- Map run screen: `slice-12-run-screen-copy.png` (copy, its three buttons, „Wykonano {n}×” at rules and headers), `slice-12-run-screen-panel-open-action-reasons.png` (panel open with the copy's sentence).
- Drag between groups (real drag recorded with `page.screencast`, 11 frames, deleted with `.playwright-cli/`): `slice-12-drag-mid-drop-line.png` shows „tu wyląduje”; DOM readings: 1 line mid-drag, 0 after the drop, rule 1.1 now in group 2 (`slice-12-drag-after-drop.png`); a drag cancelled by Esc: 1 line before, 0 after Esc, 0 after release, order unchanged (`slice-12-drag-after-esc.png`).
- Number typed at 16× (acceptance criterion 1): `slice-12-number-typed-16x.png` plus twelve readings over 3 seconds while the minute went from 5 to 50: same input element, value „12”, with focus every time, nothing committed until Enter; after Enter the row read „Zapas poniżej 12 · Patyk”. The caret position could not be read (a number input reports no selection): "cursor in place" rests on element, text and focus.
- Keys: Enter on a row opens the panel and moves the focus into it; Escape closes it and the focus goes to the row.
- Not checked: hover and focus-ring colours beyond what the screenshots show; any width other than 1400 px.

## Choices
1. One React root per panel with the parts as components (rejected: three `create…` boundaries — a detached element cannot take focus and each would need its own state sync).
2. The open rule and name field are panel state keyed by the shown program (rejected: state held in the boundary).
3. Folding as a store read by `useSyncExternalStore` (a plain map would show a stale panel after a fold on the other screen); panels subscribe; the game view's `dispose()` disposes them.
4. The rule panel stands under the rows on the run screen, not beside them: the grid is `repeat(auto-fit, minmax(300px, 1fr))` and the program column there is about 475 px of content, so it always stacks; beside the rows on Programy (rejected: two fixed columns — rows about 240 px wide). The one place the plan's "beside the rows" is not met; Slice 13 moves the panel anyway.
5. Elements the DOM panel hid are no longer drawn (the copy section, the switch button, rename and delete while the copy is shown).
6. The program's name on Programy is an `h2` in `text-strong` (the task fixes its look nowhere).
7. Run-mode `showProgram` now gives way to the first program for one not on the list (the old run panel showed a gone program's value on the list).

## Reaches beyond the handoff
- `rule-panel.tsx` (Slice 10's file, outside this slice's *Change*): one line, `event.preventDefault()` on Enter in the number field's wrapper. Found in the real browser: on Enter the panel moves focus to a cell of the next pick during the key's own event, and Chromium then delivers the same Enter to that cell and picks it; „Cel warunku” was skipped and the six actions came out as five. Slice 10's report named the risk; jsdom cannot show it, so the new case holds the cause (the keydown is consumed).
- `game-view.ts`: `dispose()` now disposes both panels (the handoff says the game view's change is the folding alone); without it two React roots stay mounted per game, which the document-test memory limit (D-268) is meant to catch.
- `account-screen.test.mjs`: beyond the cases the plan names, 14 cases that act on DOM screens outside act now go through `press` or `inAct` (the program panels are React and update on every state change); one count regex became „Wykonano {n}×” (D-93).
- Read: `program-list.test.mjs`, `trip-plan.test.mjs` (heads), `rule-editor.test.mjs` (helpers, two cases); `sim/understanding.ts` (`editorRepertoire`), `programs.ts`, `maps.ts`, the React controls; `plan.md` rows E1–E38 by grep; D-282, D-283.

## Searches not found or unclear
The place of the program's name on Programy is settled nowhere beyond "above its rules"; "beside the rows" on the run screen; whether „+ dodaj grupę” should stand beside „+ reguła” (Slice 9's footer choice left as made); no data makes „nie ma go na tej mapie” appear.

## Concerns
`guidelines/coding-browser-module.md` still names `program-panel.ts` and has no rows for the new React files (Slice 14); a focus left pending by an edit the page refuses (unchanged); at 16× the panel redraws on each game-minute update (nothing visible slipped at 1400×1000, no frame time measured); the „▸” fold glyph looks tinted at 11 px but its computed colour is `text` (font rendering, not a role); a state change from a DOM control now renders two React roots, one hidden (small cost, no skip for an unchanged view). `npm run local` stopped, browser closed, `.playwright-cli/` deleted; the tracked `.playwright/cli.config.json` untouched.
