# Report — slice 7 of `edytor-programu`: the select list and the number field in React

Saved by the orchestrator from the executor's returned text (its tool refused the file); layout condensed, content kept.

**Status:** done. **Commit:** `ba30024` (base `69158b7`), not pushed.

## What was made
- `src/browser/view/controls/react-select-list.tsx` (new, 49 lines): `ReactSelectList`, a controlled `<select class="select-list">` with `aria-label`, `disabled`, `value`, `onChange`, one `<option>` per position.
- `src/browser/view/controls/react-number-field.tsx` (new, 100 lines): `ReactNumberField`, an `<input type="number">` in the `span.input-field` tree of `number-field.ts`, with `min`, `max`, `step`, `aria-invalid`, `aria-describedby`, the message `span` hidden without an error.
- `tests/view/react-controls.test.mjs` (+257): 10 new cases after the pick cell section; Prettier applied.
- Not changed: `select-list.ts`, `number-field.ts` (no attribute had to stand in both forms), kitchen-sink page, `styles.css`, `tokens.css`.

## Choices
1. The number field draws its own tree instead of extending `react-text-field.tsx` (`ReactInputField` there supports only `text` and `password`; the file is not in the change list). Rejected: adding a `type` and number attributes to it. Cost: the error-message structure exists in two React files.
2. Typed text lives in a `draft` state, `null` while unfocused; while set, the field ignores the `value` prop. Rejected: `useEffect` copying the prop into state (D-267 forbids it), a `key` remount (loses focus).
3. Commit: Enter, and leaving the field after typing, call `readNumberField(text, value, number)` from `program-editor.ts`; the result becomes the new draft and `onCommit` runs only when `commit` is true; leaving without typing commits nothing. Cost: if a parent rejects a commit, the draft keeps showing the committed number until the next focus.
4. The number field takes the whole `ConditionNumber` (`min`, `max`, `step`, `defaultValue`); `max` is required here while the DOM form allows omitting it.
5. The select list is controlled; every case with `value` passes `onChange`.

Layering concern: `react-number-field.tsx` imports `readNumberField` from `src/browser/view/program-editor.ts` (a screen module); D-265 allows a React module to import a pure function of a DOM module and the plan names this; moving the rule to `sim/` was outside the change list.

## Checks
- Red run before implementation (stubs rendering `null`): `npm test -- tests/view/react-controls.test.mjs` exit 1, the 10 new cases failed, 42 old passed.
- Green: same command exit 0, 52 of 52, also after Prettier.
- Mutation: `value={draft ?? String(value)}` → `value={String(value)}`, exit 1, two cases failed (keeps typed text through ten renders; takes a new value from props only without focus); restored (`diff` confirmed).
- `npm run typecheck`: exit 0. `npm test -- tests/invariants/test_browser_view_framework.py`: exit 0, 9 tests.
- `npm test -- tests/quality/test_quality_invariants.py`: first run exit 1 (`test_prettier_source_format` on the test file, then formatted); after: exit 1 with only `test_ruff_source_rules` and `test_shellcheck_source_rules` (base state).
- Prettier `--check` on the test and both `.tsx`: exit 0. ESLint `--max-warnings 0 --no-inline-config` on the three files: exit 0.
- Not run: full gate; `foundation_check.py` (no foundation file changed); a screenshot.

## Own-work check
- Requirement most likely unmet: acceptance criterion 1 (typed number and focus stay through redraws up to 16×/s). Cases: text and `document.activeElement` kept through ten renders with other values while focused; a new value taken from props only without focus. Mutation shows the draft logic is what the tests protect.
- Weakest point: jsdom shows no caret; nothing here proves the cursor or focus in a real browser (D-03's named risk); no screen uses the React form yet, so the criterion first gets a real-browser check in the slice that puts the field on a screen.
- Screenshot not run: the slice alters no screen (new forms used by no screen; DOM forms unchanged). States checked in code: select list default, empty, disabled; number field default, error, disabled.

## Reaches beyond the handoff
Read whole the guidelines and `ui_check.md`; `program-editor.ts` lines 1195–1250 and 1375–1390; `src/browser/sim/program.ts` 36–44 and 70–78; exemplars `react-pick-cell.tsx`, `react-button.tsx`, `pick-cell.ts`, `text-field.ts`; plan row E3.

## Searches not found or unclear
- The plan's change list names `select-list.ts` and `number-field.ts`; not changed (no attribute had to stand in both forms). `react-text-field.tsx` not in the change list; the number field has its own tree (choice 1). Nothing else missing.

## Concerns
Layering (a control imports a screen module's pure function); the error structure written twice; criterion 1 proved in jsdom only until a screen uses the field.
