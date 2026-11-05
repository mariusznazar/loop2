# Report — slice 11, first attempt (returned, no code)

Saved by the orchestrator from the executor's returned text (its tool refused the file); layout condensed, content kept.

**Status:** `returned`. **Commits:** none (branch unchanged at `ee9cab2`). No check run.

## Why it returned
The slice assumes the React number field of Slice 7 can hold a trip position's count. Under D-181 (`foundations/decisions.md`, "A position's count is a safe integer from 1 up … an invalid entry keeps the previous count in the position and stays visible in the field, whose frame and message „Wpisz liczbę całkowitą od 1.” below it take the role `warning`") it cannot. The DOM trip editor does this (`src/browser/view/trip-editor.ts:118-126`, `tripCount`). The React number field commits through `readNumberField` (`src/browser/view/program-editor.ts`), the rule-panel rule: `"2.4"` is rounded to 2 and committed as valid; `"0"` or `"-3"` is clamped to 1 and the invalid entry hidden with no warning; empty or non-numeric text returns `commit: false`, `handleBlur` drops the draft and the previous count returns with no message. Its `error` prop exists, but the field never calls the parent for invalid text.

## Options the executor named
A. An opt-in commit rule on `ReactNumberField` (a prop keeping the previous value on text that is not a valid count, keeping the draft visible, taking the message from the parent through `error`; default unchanged): touches `react-number-field.tsx` and a case in `tests/view/react-controls.test.mjs` — recommended (one number field, as D-44 requires; the rule-panel rule unchanged).
B. A count field inside `trip-plan.tsx` with the trip rule: violates D-44 as written; duplicates focus and draft logic — not recommended.
C. Use `ReactNumberField` unchanged: contradicts D-181 — not acceptable without a new human decision.

## A second design point (the executor's own choice for the resume)
The plan says the folded line unfolds "by a click on the line, or by Enter on it"; `ReactButton` takes only a text string; a native `<button>` in `trip-plan.tsx` would break D-44. Approach: a wrapper element whose click handler toggles folding, holding a shared `ReactButton` with `expanded` and a label; Enter on the focused button fires a click that bubbles to the wrapper. No shared control changes.

## Reads beyond the handoff / searches
Read `trip-editor.ts`, `react-select-list.tsx`, `react-number-field.tsx`, `react-button.tsx`, `rule-panel.tsx`, `rule-list.tsx`, `menu-bar.tsx`, `program-list.tsx`, `tests/view/page-document.mjs`, `tests/view/program-list.test.mjs`, `tests/view/account-screen.test.mjs:2155-2260`, `tests/view/trip.test.mjs`, `terrain-picture.ts`, data `items.ts`, `resources.ts`, `program-editor.ts`, `sim/program.ts`, the trip-editor rules in `styles.css`, `plan.md` slices 10–13. Not found: a count field applying D-181 in React; a clickable React row holding icons among the shared controls. `ui_check.md` not read (no code made).
