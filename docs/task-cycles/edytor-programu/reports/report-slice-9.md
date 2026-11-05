# Report — slice 9 of `edytor-programu`: the rule list in React

Saved by the orchestrator from the executor's returned text (its tool refused the file); layout condensed, content kept.

**Status:** done with concerns. **Commit:** `2bf7d42` (base `3afd424`), not pushed.

## Files changed
- `src/browser/view/rule-list.tsx` (new, +683): component `RuleListView` and boundary `createRuleList({ onCommit, onOpen, onFoldedChange, props })` returning `element`, `update(props)`, `dispose()` as `program-list.tsx` does. Props: `state`, `program`, `counts`, `folded`, `open`.
- `tests/view/rule-editor.test.mjs` (new, +871): 45 cases on jsdom through `tests/view/page-document.mjs`; Slice 10's rule-panel cases go into this file.
- `src/browser/styles.css` (+119): new classes only (`rule-list-*`, `rule-number`, `rule-condition`, `rule-action`, `rule-time`, `rule-count`, `drag-handle`, `drop-line`); old `.rule` and `.rule-group` rules of the DOM editor untouched; no new colour, role or value.

## Checks
- `npm test -- tests/view/rule-editor.test.mjs` exit 0 (45); `tests/view/program-editor.test.mjs` exit 0 (60); `npm run typecheck` exit 0; `test_browser_view_framework.py`, `test_browser_view_token_values.py`, `test_browser_view_focus_outline.py`, `test_content_identifiers.py` exit 0 each.
- `npm test -- tests/quality/test_quality_invariants.py` exit 1: only the ruff and shellcheck tests error (base state), the other 3 pass.
- ESLint `--max-warnings 0` on the two new code files exit 0; Prettier `--check` on three files clean; `foundation_check.py` "0 errors". Not run: the full gate.
- Test first: began from the two named cases (↓ on the last rule of a group; drop line gone after a drag end) against an empty stub; both failed with a `TypeError` on a missing element (the stub drew no rows), not on an assertion; then the component was written and both passed.

## Own-work check
Weakest points: the drop line left behind after a drag; focus after a move across groups. Four mutations of `rule-list.tsx`, restored each time (file identical to the commit): document-level `dragend`/`drop` listeners removed → 1 case failed; other-arrow focus fallback removed → 1; line shown also for a drop that changes nothing → 3; line not cleared on a drop → 3.

## States and screenshots
Screenshots unchecked: the list stands on no screen until Slice 12 (the plan's reason). Checked in the test: a rule row (sentence, number, icon, time, count); a header (number, name, condition, count of rules, sum); the open row and open header; a folded group; an empty group; the drop line in each landing including a folded group; `+ reguła` disabled; the arrows at the program's ends. jsdom does not show the real drag, the real focus ring or the look on `highlight`; the manual browser check covers those (D-88).

## Choices
1. Row `li` and header `div`, each `tabIndex={0}`; click, Enter and Space open the panel; only the handle is `draggable` (D-254 risk). Not `<button>` (cannot hold the sentence's parts; D-44 builds buttons from the shared controls). Cost: a screen reader may not announce the row as a control.
2. "+ dodaj grupę" stands in a footer below the groups, not in each group's "+ reguła" row; a folded group has no "+ reguła". If "beside it" meant the same row, one line of JSX moves it.
3. A drop that changes nothing shows no line and commits nothing.
4. Landing: over a row the pointer's half decides (upper half: before the row; lower half: before the next row or at the end of the group); over a header or the rest of a group a rule goes to the group's end; a group goes before or after the group under the pointer by the same halves.
5. Focus after an edit: after a move the component tries the moved rule's own arrow, then the other arrow when its own is off, then its row, then its group's header; after „Usuń” and after adding a rule it follows `focusAfter` mapped to the list's controls; after a rule is added focus goes to its new row.
6. Plural of the number of rules ("1 reguła", "2 reguły", "5 reguł"), covered by a case.
7. Fold button "▾"/"▸" with `aria-expanded` and a label; "zwiń wszystkie" becomes "rozwiń wszystkie" when every group is folded.

## Concerns
- `guidelines/coding-browser-module.md` *Files of this kind* has no row for `rule-list.tsx` (outside the change list; `foundation_check.py` reports no error; Slice 14 adds the row).
- A focus left pending by an edit the page refuses is used at the next change of the `program` prop; small risk; no case covers it.
- The drop line's `pointer-events`, the half-height landing with real element boxes and `dragleave` with `relatedTarget` in Safari show only in a real browser.

## Reaches beyond the handoff
None beyond reading `src/browser/styles.css` around the controls, the `icon` field in `src/browser/sim/data/actions.ts` and `tests/sim/understanding-fixture.mjs`.

## Searches not found or unclear
- "Beside it" for "+ dodaj grupę" (To do 8, "obok „+ reguła”") is unclear: it could mean the same row (choice 2).
- Assistive-technology semantics for a rule row are settled nowhere (choice 1).
