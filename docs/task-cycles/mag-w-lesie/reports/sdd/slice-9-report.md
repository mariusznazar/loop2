# Slice 9 report — the program editor

Status: DONE · Commit: `4366b8c` feat(view): program editor committing whole programs through setProgram on change (branch `task/mag-w-lesie`)

## Implemented

`src/browser/view/program-editor.ts`
- Pure, exported commit rules (no DOM at import; DOM is used only inside `createProgramEditor`):
  - `offeredResources(state)` — the run's map's resources during a run, otherwise the resources of the map shown in the send panel (`sendTargets()[0].mapId`), in the map's order from `MAPS`.
  - `readNumberField(text, previous)` → `{ value, commit }` — empty/blank/non-finite text keeps `previous` and commits nothing; otherwise `Math.round`, clamped to `CONDITIONS.hereBelow` min/max, `-0` normalised to `0`; commit only when the value differs.
  - `addRule` (appends „Zawsze → Eksploruj”), `removeRule`, `moveRule(program, index, -1|1)` (null past either end).
  - `withConditionKind` / `withActionKind` — switching to a kind that names a resource takes the first offered resource and, for „Tu leży mniej niż”, the data's `defaultValue`; same kind → null (no commit).
  - `withConditionResource`, `withConditionValue`, `withActionResource` — null when unchanged.
  - `focusAfter(edit, index, ruleCount)` — „↑”/„↓”: same button in the moved rule's new row; „Usuń”: the „Usuń” of the row now at that position, else „Dodaj regułę”; „Dodaj regułę”: the new row's condition select.
- `createProgramEditor(commit)` — heading „Program”, `<ol>` with one row per rule: condition select (labels from `CONDITIONS`), number input (min/max/step from data) and resource select shown only for „Tu leży mniej niż”, „→”, action select (labels from `ACTIONS`), resource select shown only for „Idź”, buttons „↑”, „↓”, „Usuń”; button „Dodaj regułę”. Resource option names from `RESOURCES`. Every edit commits on `change` (selects, number field) or `click` (buttons) by building a whole new `Program` and calling `commit`; the editor never writes the state. `update(state)` sets each control only where its value differs and shows/hides the number field and resource selects; rows are rebuilt only after a structural edit (or if the rule count or the offered resource list changes), then focus goes to `focusAfter`'s target.
- No content id or name in the code (S2 scan passes); no way to carry out an action by hand (D-13/1).

`src/browser/view/app.ts`
- Creates the editor in the program panel; its `commit` flushes the clock, then `store.apply(setProgram(state, program))` (D-04/3 complies example).
- `store.apply` calls `programEditor.update(state)` only when `state.program` or `state.run?.mapId` changed — never on a clock tick (passRealTime keeps the program reference), so typing keeps focus. Initial `update` after building the page.

`src/browser/index.html` — inline styles for the editor rows.

## Tests and results

- `tests/view/program-editor.test.mjs` — 15 tests: import touches no DOM; number field (invalid keeps previous, rounding, clamping to 0–50, `-0` → 0, unchanged value written back without commit); „Dodaj regułę”; „Usuń”; „↑”/„↓” incl. ends; condition/action kind switches (first resource, default N 1, same kind → no commit); resource/number edits; offered resources before sending and during a run; focus targets; every program the editor builds (all kind pairs, every resource in every slot, numbers at and beyond the ends, moves, removals — 30+ programs) passes `setProgram` both with and without a run and is stored unchanged.
- `npm run typecheck` — clean.
- `npm test` — 145 tests, 145 pass, 0 fail (before this slice: 130; +15).
- Invariant gate `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl` — Ran 44 tests, OK (no port-3000 failure, no rerun needed).
- Part-map guard (`foundations/part_map.md --base 1701186…`, with the new files intent-added) — 0 errors, 0 warnings, 1 unchecked (dependency graph; the guard's standing unchecked item). Foundation files unchanged by this slice.

## TDD evidence

- RED: test written first; `npm run build` then `node --test tests/view/program-editor.test.mjs` → fail, `ERR_MODULE_NOT_FOUND` for `dist/public/view/program-editor.js` (the feature missing).
- GREEN: after writing `program-editor.ts` → 15/15 pass.
- Mutation check on the built module (each restored afterwards): `Math.round`→`Math.trunc` → 2 failures; `defaultValue`→`min` → 1; `index < ruleCount`→`<=` in `focusAfter` → 1; first resource → second → 2.

## HTTP checks

`npm run dev`, then over HTTP: `/view/program-editor.js` 200 `text/javascript` (13161 B, holds „Dodaj regułę”); `/view/app.js` 200 and imports/uses `createProgramEditor`; every import of the editor module (`/sim/data/actions.js`, `conditions.js`, `maps.js`, `resources.js`, `/view/send-panel.js`) and `/sim/game.js`, `/main.js` 200; `/` serves the page with the editor styles. Server stopped (port 3000 free afterwards).

## Unchecked (in-browser, no browser automation in this cycle)

- A program written before „Wyślij” drives the run (status row „Eksploruje”, then „Wędruje” or „Idzie po: …”).
- Typing „12” in the number field keeps focus and commits 12.
- An edit during a 20-minute exploration changes the status only after it ends.
- The program stays after „Restart” and „Zakończ”.
- Focus placement after „↑”, „↓”, „Usuń”, „Dodaj regułę”; show/hide of the number field and resource selects.

## Files changed

- `src/browser/view/program-editor.ts` (new)
- `src/browser/view/app.ts`
- `src/browser/index.html`
- `tests/view/program-editor.test.mjs` (new)

## Self-review

- Spec § 5 program panel: texts „Program”, „Tu leży mniej niż”/„Zawsze”, „Eksploruj”/„Wędruj”/„Idź”, „→”, „↑”, „↓”, „Usuń”, „Dodaj regułę” — labels from data, fixed texts as quoted. Commit on `change` only, never `input`. Number rule as § 5/C12. Focus rules as § 5.
- § 4.5 / C3: the editor can only build programs from the closed list with offered resources, and the test shows every built program passes `setProgram`.
- D-04/3: the editor hands the edited program to `setProgram` through the app; it holds no game state of its own (it keeps the last program it was shown only to build the next one).
- D-10/1: untouched — `setProgram` never touches `run.current`; the editor adds no interruption.
- D-08/1 / S2: resources, labels, range from data; `tests/sim/rules.test.mjs` S2 scan passes over `src/browser/view/**`.
- No DOM at import (test proves the import succeeds in Node, which has no `document`).

## Choices made here (not in the brief)

1. „↑” on the first row and „↓” on the last are enabled no-ops rather than disabled: a disabled button cannot take focus, and § 5 puts focus on the moved rule's same button, which can land on the first/last row.
2. Selects and the number field carry `aria-label`s in Polish („Warunek”, „Liczba”, „Zasób warunku”, „Akcja”, „Zasób akcji”) and the arrows „W górę”/„W dół” — not visible text, not quoted by the spec.
3. The commit flushes the clock before `setProgram`, as the status-row controls do, so real time elapsed before an edit is stepped under the program in force then.
4. Without a run, the offered map is the first send target's map (the map shown in the send panel); with today's one map this is Las.
5. A resource select shows an extra option for a rule's resource that is not in the offered list (cannot happen with today's one map) instead of showing a blank value.
6. The data's unit „szt.” is not shown; § 5 lists no unit in the row.

## Concerns

- None blocking. In-browser behaviour (focus, show/hide, status changes) is verified only by reading the code and the pure-function tests; it is listed above as unchecked.
