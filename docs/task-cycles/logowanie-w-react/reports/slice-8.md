# Slice 8 report - The controls in React and the test that keeps them alike

**Status:** done

**Commits:** 8d65336 and the follow-up that moves the warning and note, on task/logowanie-w-react (base 50461c1).

**Files changed:** src/browser/view/controls/react-button.tsx (new; ReactButton, ReactFormWarning, ReactFormNote), src/browser/view/controls/react-text-field.tsx (new; ReactTextField, ReactPasswordField, ReactFormWarning, ReactFormNote), tests/view/react-controls.test.mjs (new, 21 cases), tests/invariants/test_browser_view_token_values.py (+7/-1: two controls, one guard in `literal_texts`). button.ts, text-field.ts unchanged.

## Checks (command, exit code)
- `npm test -- tests/view/react-controls.test.mjs`: first run against empty stubs of the components exited 1, failing at the assertions (comparison of plain data, e.g. expected `<p class=form-warning>`, got `<span>`); with the components, exit 0 (21 pass). Differences put in for a moment, each seen failing (exit 1) and restored: aria-busy removed (1 case failed), aria-describedby pointing at the input (3 failed), class "input-field error" renamed (2 failed). Final run after prettier: exit 0.
- `npm test -- tests/invariants/test_browser_view_token_values.py`: with two new controls (colour on the same line after `</p>` and after `</>`) and the old reader: exit 1, 2 failures; with the guard (a `/` directly after `<` starts no regex): exit 0.
- `npm test -- tests/invariants/test_browser_view_framework.py`: exit 0 (7 tests).
- `npm test -- tests/view/memory-limit.test.mjs`: exit 0 (37 pass).
- `npm test -- tests/quality/test_quality_invariants.py`: first exit 1 (prettier on the new test), after `prettier --write`: exit 0.
- Not run: full `npm test`, the product gate, `foundation_check.py` (the orchestrator's). Not checked: part-map ownership of the two new .tsx files (foundation_check not run).

## Own-work check
Requirement most likely unmet: "each draws the same elements with the same classes and attributes as its DOM form" in states the card reaches. Check: 21 cases compare tag, sorted attributes, text and children as plain data across plain/label/submit/selected/unselected/waiting/waiting-then-stopped buttons, hidden/visible-label/hint/autocomplete/error/cleared-error/disabled text and password fields, and shown/hidden/cleared warning and note; ids compared by what they point at, input `value` left out. All same; three mutations seen failing.

## Choices
- Button API: `selected?: boolean` (undefined = no group, no aria-pressed; false = in group, unselected; true = selected) instead of a `kind` prop, because the DOM form has `kind: "selected"` plus `setButtonSelected(el, false)` and the card needs both; `waitingText?: string|null` stands for setButtonWaiting; `buttonRef`, `onClick` passed through. Rejected: a `kind` union (cannot express the unselected-in-group state). Cost if wrong: a later screen wants another kind; it adds a prop.
- Field is controlled: `value`/`onChange`/`inputRef`/`disabled` props pass through; ids from `useId` (`<id>-input`, `<id>-message`). The DOM form's `type: number` has no React form (per plan).
- ReactFormWarning and ReactFormNote live in react-text-field.tsx, as the plan puts them (an interim draft had them in react-button.tsx; moved before the final commit).
- Token reader: in `literal_texts` a `/` directly after `<` (no space) is no regex start; rest unchanged. Rejected: dropping `<` from REGEX_AFTER (breaks `a < /re/`). Cost: `x </re/.test(y)` without a space would be misread as before.

## Reaches beyond the dispatch
None. Read after the repair, each whole or by its Current range: guidelines/coding.md, guidelines/testing.md, guidelines/styleguide-browser-view.md, foundations/decisions.md D-42 (882-896), D-43 (897-911), D-44 (912-926), D-47 (957-971), D-03 (39-51), D-265 (5427-5459), foundations/invariants.md browser-view-focus-outline (469-478). Earlier: page-document.mjs, button.ts, text-field.ts, coding-browser-module.md, src/browser/AGENTS.md, the token-values test, package.json, scripts/test.py, slice-7 report.

## Rules checked against, and what changed
- Goal (warning and note in the text-field file; ids compared by what they point at): met after commit cc1c1e8; the test resolves `id`, `for` and `aria-describedby` to the tag and class of the target, and a dangling pointer keeps its text and so differs. Nothing more changed.
- D-265: both forms draw one tree; tag, attributes, text and children compared, input `value` left out; no wrapper of the DOM function; no class only the React form sets; every React form has cases. Nothing to change.
- D-44: no React destructive button, select list or number field; waiting text and disabled as setButtonWaiting does. Nothing to change.
- D-47 and browser-view-focus-outline: the .tsx files set no outline and mark no control. Nothing to change.
- D-43 and the styleguide rule on token values: no colour, length or font in the .tsx files; the reader change only widens what is read. Nothing to change.
- D-03: React in .tsx allowed; framework guard passes. Nothing to change.
- guidelines/coding.md (linter, formatter): ESLint and prettier pass via test_quality_invariants (prettier fixed before commit). Nothing to change.
- guidelines/testing.md (level, expected value, behaviour, files in the gate): unit test in tests/view/; expected side is the DOM form by D-265, not the code under test; nothing to change. Styleguide "States of shared controls": the page of all states is not extended, by spec decision 6 / D-265 (the page shows the DOM form).
- No new commit: nothing departed.

## Searches not found or unclear
none. Check after repair: `python -B .the-way/elements/common/foundation_check.py` exit 0 ("0 errors"); the slice's five checks exit 0 again.
