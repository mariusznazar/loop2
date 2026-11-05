# Report — slice 10 of `edytor-programu`: the rule panel in React

Saved by the orchestrator from the executor's returned text (its tool refused the file); layout condensed, content kept.

**Status:** done with concerns. **Commit:** `ee9cab2` (base `2bf7d42`), not pushed.

## Files changed
- `src/browser/view/rule-panel.tsx` (new, +614): `RulePanelView` and boundary `createRulePanel({ onCommit, onClose, props })` returning `element`, `update(props)`, `dispose()`. Props: `state`, `program`, `open: { groupId, ruleId | null, field? } | null`, `copy: boolean`.
- `tests/view/rule-editor.test.mjs` (+577/-6): 14 new panel cases; the 6 removed lines are the header comment and import block, widened for the panel.
- `src/browser/styles.css` (+96): new classes `rule-panel*` only; no new colour, role or value.

## What the panel does
- A rule shows fields in the order condition, number, target of the condition, action, target of the action, each only where `ruleFields` gives it; a group (`ruleId: null`) shows „Nazwa grupy” (`ReactTextField`) and its condition with number and target, no action.
- One field's pick open at a time (grid of `ReactPickCell` in the sections of `conditionPick` / `actionPick` / `…TargetPick`); the other fields show their value as a `ReactButton` that opens that field; the number field is always a `ReactNumberField`. Conditions: two cells to a line (`two-columns`), sections parted by a line in `divider` (`parted`); actions carry group names, icon and `actionTime` beside the cell (and beside the action's value while its pick is closed); no search, no „ostatnio”, no current value.
- A pick hands `onCommit` a whole new program (through `withConditionKind`, `withActionKind`, `with…Resource`, `withConditionItem`, `withConditionValue`, `renameGroup`) and opens the next field (`fieldAfter`) with focus there; a pick of the held value commits nothing (D-131) and still moves on; after the last field the panel stays on it.
- The number commits on Enter or on leaving the field; Enter also moves on, even when the number stayed the same.
- Grid keys: arrows move among the cells, greyed ones included (left/right in order; up/down to the line above/below, crossing sections and keeping the column); Enter picks and does nothing on a greyed cell; one cell has `tabIndex` 0, so Tab leaves the grid.
- „✕” and Escape call `onClose`. A new `open` resets the panel to the field it names (or the condition) and moves the focus in; `open: null`, or a gone rule/group, draws nothing. When `copy` is true: „Zmiana zeruje passę tego przejścia.” in `text-secondary`. Heading „Reguła {2.1}” or „Grupa {2}” (D-292).

## Checks
- Test first: the stub drew an empty section; `npm test -- tests/view/rule-editor.test.mjs` exit 1, 14 of 59 failed, each on an assertion.
- After the code: `tests/view/rule-editor.test.mjs` exit 0 (59 = 45 + 14); `tests/view/program-editor.test.mjs` exit 0 (60); `tests/view/react-controls.test.mjs` exit 0 (52, extra); `npm run typecheck` exit 0; `test_browser_view_framework.py` exit 0 (9); `test_browser_view_token_values.py` exit 0 (4); `test_browser_view_focus_outline.py` exit 0 (3); `test_content_identifiers.py` exit 0 (4, extra).
- `tests/quality/test_quality_invariants.py` exit 1: only `test_ruff_source_rules` and `test_shellcheck_source_rules` (base state); the other 3 pass.
- ESLint `--max-warnings 0` on `rule-panel.tsx` and the test file: exit 1 first (one unnecessary type assertion, removed), then exit 0. Prettier `--check` on three files exit 0. `foundation_check.py` exit 0, "0 errors". Not run: the full gate.

## Own-work check
Most likely missed: the keyboard grid and the flow of fields. Six mutations, each run against `tests/view/rule-editor.test.mjs` and restored (file identical to the commit): Enter on a greyed cell picks it → exit 1; no move on after the number's Enter → exit 1 (acceptance case); every cell left at `tabIndex` 0 → exit 1; the number field keyed by the game minute → exit 1 (the 16× case: "the same field"); down across a section going to the section's first cell → exit 1; the copy's sentence on every panel → exit 1. All caught (two mutation runs had to be redone: a `sed` pattern missed a Prettier-formatted line; one mutation hit a TypeScript error).

## States and screenshots
Screenshots unchecked: the panel stands on no screen until Slice 12 and the kitchen-sink page holds no React (D-269). Checked in the test on jsdom: open on a rule and on a group; open on the condition and on the field the opener names; the open pick with the other fields as values; a cell chosen; greyed with each of the four reasons; held but greyed with no reason; the copy's sentence present and absent; closed (draws nothing); a number typed and kept, with focus, through five redraws at 16×. Not shown by jsdom (left to the manual browser check, D-88): the look (panel on `panel`, frame, dashed greyed cell), the real focus ring and Tab order, whether Enter's `preventDefault` stops the button's native click in every browser.

## Choices
1. One field's pick open at a time (rejected: all picks open at once — D-282 asks for steps, D-299 wants the pick whole without scrolling, and the acceptance case then proves each pick moved on). Cost if wrong: drawing every field with `renderGrid`; the keys logic stays.
2. `tabIndex` set on the pick cells' elements in a layout effect (the shared `ReactPickCell` takes no `tabIndex`; controls are outside this slice's *Change*). Rejected: adding a `tabIndex` prop in both forms and in `react-controls.test.mjs`. Cost: an effect writes an attribute React does not own.
3. Leaving the number field commits but does not open the next field; only Enter moves on (opening the next grid on blur would replace the element Tab just moved to, or take the focus from where the player clicked); Tab still reaches the next field's value button. Cost if wrong: the plan's "and moves on" may have meant blur too.
4. The group's name is held as typed while focused and committed on Enter or blur; Enter also opens the condition; any text is committed, an empty one included, as in the old DOM editor.
5. Words: labels „Warunek”, „Liczba”, „Cel warunku”, „Czynność”, „Cel czynności”, „Nazwa grupy”; heading „Reguła 2.1” / „Grupa 2”; „✕” labelled „Zamknij panel” — the task fixes none of these words.
6. The copy's sentence in `text-secondary` (no role in the task; `danger` not taken, D-44 keeps red for the loudest threats).
7. The time stands under the cell in the same grid item, not inside it (the pick cell has no time prop); also beside the action's value while the pick is closed.
8. Default target of a new condition or action from `offeredResources` and `offeredItems`, as in the old editor.
9. No focus move after a pick on the last field.

## Q7 case
A held action, condition or „Zapas poniżej” item the Understanding or archetype does not hold stands chosen and greyed with no reason text (e.g. „Kopnij” held while the Understanding holds only „Eksploruj”: no `.pick-cell-reason`; a click on „Eksploruj” changes it).

## Reaches beyond the handoff
`plan.md:14-63` (foundation rows by words); `tests/view/program-editor.test.mjs:1343-1700`; data files `conditions.ts`, `actions.ts`, `items.ts`, `resources.ts`, `maps.ts`; `src/browser/sim/game.ts:415-580` (`setPace`, `passRealTime`); `account-card.tsx` (layout effect exemplar, D-36, D-267).

## Searches not found or unclear
- Whether "and moves on" covers blur as well as Enter (taken as Enter only, choice 3).
- The panel's words and the role of the copy's sentence are settled nowhere (choices 5, 6).
- A second click on the row whose panel is open does not send the panel back to the condition (reset only when `open` names another rule, group or field).
- „Zapas poniżej” defaults to 8 and its first item is „patyk”, so in the acceptance case „8 with Enter” and the first „Patyk” change nothing and only move on; the 16× case covers a number that changes (12).

## Concerns
- Focus on opening needs the panel already in the document: `createRulePanel` draws into a detached element, so a panel created already open cannot take the focus; the test helper creates it closed, then opens it; Slice 12 should place the panel before opening it, or hold `RulePanelView` inside the React program panel.
- The focus after closing is the page's job: after „✕” or Escape the focus goes to the body until the page moves it (e.g. to the rule's row).
- A focus left pending by a pick the page refuses waits until that field stands or another rule opens (same small risk as slice 9).
- `guidelines/coding-browser-module.md` has no row for `rule-panel.tsx` (outside this slice's change list; Slice 14).
- The `tabIndex` effect writes an attribute on elements React draws (choice 2).
