# Report — slice 11 of `edytor-programu`: the trip plan of Programy in React (second dispatch)

Saved by the orchestrator from the executor's returned text (its tool refused the file); layout condensed, content kept. The first attempt: `report-slice-11-returned.md`.

**Status:** done with concerns. **Commit:** `9d1d5f2` (base `ee9cab2`), not pushed.

## Files changed
`src/browser/view/trip-plan.tsx` (+347, new: `TripPlanView`, `createTripPlan`); `tests/view/trip-plan.test.mjs` (+392, new, 11 cases on jsdom); `src/browser/view/controls/react-number-field.tsx` (+51/-5: opt-in `rule="trip"` and `onReject`; widened *Change*); `tests/view/react-controls.test.mjs` (+66: one case for the opt-in; widened *Change*); `src/browser/styles.css` (+55: `.trip-plan*`). `number-field.ts` unchanged (the opt-in adds no DOM attribute).

## What was built
- Folded line: a `div.trip-plan-line` whose click toggles folding, holding a shared `ReactButton` with `expanded`; reads "Plan wyprawy", or "Plan wyprawy: pusty" when both lists are empty; otherwise „Zabierz” and „Wynieś” each show their positions as an `<img>` of `/icons/${RESOURCES[item].icon}.svg` (alt = the item's name, colour kept in its file) and the count; Enter on the focused button is a native click that bubbles to the wrapper.
- Unfolded: each list has an h4, an `ol` of rows, "Dodaj przedmiot" below; a row holds the item select (`tripChoices` options), the count field (`rule="trip"`), the shared "↑", "↓" and destructive "Usuń"; every edit calls `onCommit` with a whole new program.
- Focus after an edit goes to the control the edit leaves in place (disabled target falls back to the row's select); ref map and layout effect as in `rule-panel.tsx`. Boundary `createTripPlan({ onCommit, props })` returns `{ element, update, dispose }`.

## Choices
1. Opt-in on `ReactNumberField` (the orchestrator's option A, Q9): `rule?: "trip"`, `onReject`. Under `"trip"`, text that `tripCount` rejects commits nothing, keeps the previous count and the draft, and calls `onReject` when the player typed it; a valid count calls `onCommit` every time (even when equal) so the parent can clear its message; the default range path is unchanged; `handleFocus` now keeps a non-null draft (under the range rule the draft is always null at focus). Cost to watch: `react-number-field.tsx` now imports `tripCount` from `trip-editor.ts`, so that function must move before the DOM trip editor is removed.
2. The rejected-count state lives in the section (a set of `side/item` keys, shown as the field's `error`); the page must make a new section per program so one program's message does not show in another's.
3. Rows keyed by item: a move keeps the row's draft; a select change remounts the count field, so a pending invalid count is dropped on an item change and the row shows its previous count. This deviates from the DOM editor, which keeps the invalid draft; no data is lost; keying by index rejected (a draft would follow the wrong item).
4. Folding by a wrapper `div` with `onClick` around the shared button (native `<button>` rejected: breaks D-44).
5. Styles reuse the global `.trip-list` and `.trip-entry` classes; labels and headings in `text-label`; counts and the line inherit `text`; icon height `1lh`.
6. Empty states: the empty line is the text "Plan wyprawy: pusty"; an empty list shows only its add button; no kitchen-sink addition (no new shared control, state or role).
7. Count `max` is `Number.MAX_SAFE_INTEGER` (the DOM editor sets no max).

## Checks
- Failing first: `npm test -- tests/view/trip-plan.test.mjs` on a stub exit 1 (the first case failed with `the line holds a button: expected a true value, got null`; the others stopped at the same missing element — not an assertion on the new behaviour). Opt-in case first: `node --test tests/view/react-controls.test.mjs` failed with `the zero commits nothing: expected [], got [1]` (exit code not captured; output shows `fail 1`).
- `tests/view/react-controls.test.mjs` exit 0, 53/53 (one of the executor's own assertions was a test bug: typing `5` into a field already showing `5` fires no input event; text changed to `5.0`, expected `[5, 5]`). `tests/view/trip-plan.test.mjs` exit 0, 11/11. `tests/view/trip.test.mjs` exit 0, 7/7. `tests/view/rule-editor.test.mjs` exit 0, 59/59. `npm run typecheck` exit 0. `test_browser_view_framework.py` exit 0 (9), `test_browser_view_token_values.py` exit 0 (4), `test_content_identifiers.py` exit 0 (4).
- `tests/quality/test_quality_invariants.py` exit 1: 3 of 5 pass; ruff and shellcheck errors (base state). ESLint `--max-warnings 0 --no-inline-config` on the four changed TS/JS files exit 0; Prettier `--check` on the five changed files clean.
- The last two cases (focus after a move, equal count commits nothing) were written after the component passed the first nine; not seen failing.
- Not run: the full gate; `foundation_check.py`; StrykerJS (a manual mutation instead).

## Own-work check
Most likely unmet: focus after an edit stays where the player works; the folded line opens on click and on Enter (Enter-on-button cannot be tested in jsdom). Mutation: `tripChoices(items, list)[0]` replaced by `items[0]` → exit 1, `Dodaj przedmiot commits…` failed (10 pass, 1 fail); file restored byte-identical (`cmp`). Weakest: Enter on the folded line, focus after edits and the look (hover, focus outline, destructive colour at rest) unchecked in a browser.

## UI check
Screenshots unchecked: the plan stands on no screen until Slice 12. Checked in the test: empty line; folded line with icons and counts; unfolding and folding; add enabled and disabled; count default, error (message with `aria-invalid`), valid commit clears the message, equal count makes no edit; item select; ↑/↓ with edges disabled; Usuń with the destructive class. Not checked: hover, visible focus, destructive colour at rest and under the pointer, an unfolded empty list.

## Reaches beyond the handoff
Read in full: the four guideline files and `src/browser/AGENTS.md`, `rule-panel.tsx`, `trip-editor.ts`, `tests/view/page-document.mjs`; foundation entries at the handoff's ranges plus the glossary term and part map; heads and grep hits of `program-list.tsx`, `rule-list.tsx`, `terrain-picture.ts`, `tile-list.ts`, the `button.ts`, `number-field.ts`, `select-list.ts` controls, the React controls, `items.ts`, `resources.ts`, `program.ts`, `types.ts`, `programs.ts`, `trip.test.mjs`, the account-screen trip case at `:2155-2260`, styles sections, `tests/invariants/test_program_world_reference.py:190-200` (a grep hit for `trip-plan`, not run).

## Searches not found or unclear
- Not found: a React form of a trip count field applying D-181 (why option A was needed).
- Unclear, decided by the executor: whether the DOM editor's kept invalid draft across an item change is required (chose the remount, choice 3); the human should decide before Slice 12 if the DOM behaviour is wanted.

## Concerns
Enter on the folded line, focus after edits and the look unverified in a browser (left to Slice 12's screen check); choice 3 deviates from the DOM editor; `react-number-field.tsx` imports `tripCount` from `trip-editor.ts` (must survive Slice 13); `test_quality_invariants.py` keeps its 2 base errors.
