# Report — executor of slice 11 (the React forms of the shared controls stand on a test of their own)

**Status:** done

## Commits (range starts at `4437ebd784c2ff148bf67130f4ee4b36cdea8d39`)

1. `e8b68dda` — `test: :white_check_mark:` new `tests/view/shared-controls.test.mjs` (D-44, D-265, D-275, D-276, D-289, D-395)
2. `6839f5b1` — `docs: :memo:` comments of the five `react-*.tsx` files (D-265, D-44)

Worktree clean at the end (`git status --short` empty). No push, no amend.

## Files changed

| File | Added / removed |
|---|---|
| `tests/view/shared-controls.test.mjs` | +1178 / -0 (new; 49 cases, enters `npm test` by its pattern) |
| `src/browser/view/controls/react-button.tsx` | comments only |
| `src/browser/view/controls/react-text-field.tsx` | comments only |
| `src/browser/view/controls/react-number-field.tsx` | comments only |
| `src/browser/view/controls/react-pick-cell.tsx` | comments only |
| `src/browser/view/controls/react-select-list.tsx` | comments only |

The five `.tsx` files together: +27 / -28 lines, all comment lines (checked: no changed line outside `/** … */`, `*` and `//` lines). `tests/view/react-controls.test.mjs` is untouched and stays (slice 12 deletes it).

## What the new test holds (React form alone, expected values written out)

- Button: plain, `aria-label`, `submit` (type `submit`, never otherwise); kinds `destructive`, `positive`, `main` (type `button`, class `button main`), `secondary` (type `button`, class `button secondary`), each as a table case with its full attribute set and no `aria-pressed` (D-275, D-274); selected in its group (`aria-pressed` true / false); `tab` selected / not selected with `aria-pressed` and a click that the screen's selection follows (D-276); `aria-expanded` true, false, not given; a submit button waiting (waiting text, `disabled`, `aria-busy`, whole again on `null`) (D-44); the six looks locked with their text kept and not busy (D-44); a click reaching the handler, a waiting and a locked button giving none.
- Fields: hidden and visible label, hint, autocomplete token, password type, address keyboard and no spell check, disabled; the error message the input points at (`aria-describedby`, `aria-invalid`, class `input-field error`, message shown) and its leaving by a new render; a typed value reaching the handler while the field keeps the screen's value; form warning (`p.form-warning`, `role="alert"`) and form note (`p.form-note`, `role="status"`), shown and hidden.
- Pick cell: available, chosen, greyed with reason (`aria-disabled`, no `disabled`, reason inside), chosen and greyed, icon mask; a greyed cell gives no pick and an available one gives one (D-289).
- Select list: positions in order with the value shown, no positions, disabled, a choice reaching the handler with the list keeping the screen's value.
- Number field: attributes (type, `aria-label`, min, max, step, value), error state, disabled; typed text kept through ten renders and committed on Enter; a new value taken only without focus; the clamped number committed on leaving, nothing when left untouched; the trip count rule (`readTripCount`, D-395, D-181); and two I added beyond the old file: a rule written in the test (not a product function) that the field obeys and does not replace by a range rule of its own, and "left with no typing commits nothing, whatever the rule reads".

Decision lines (`// decision:`) in the new file cite D-44, D-265, D-274, D-275, D-276, D-289, D-395, D-181; each quote was checked by the foundation check (no error names the new file).

**The *Verification* lines naming "both forms" (D-44, D-275, D-276) and their case on the React form** (for the reviewer):

- D-44: "a submit button that waits shows its waiting text, is disabled and busy…" and the six "locked" cases; the sentences under a form ("the form warning…", "the form note…").
- D-275: "a secondary action is a button of the type button with the class button secondary…" and "a secondary action locked while the screen waits…".
- D-276: "a tab selected…", "a tab not selected…", "a click on a tab reaches the screen's handler…" and the two locked tab cases.

## Checks (command, exit code)

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/shared-controls.test.mjs` | 0 | 49 pass, 0 fail |
| `npm test -- tests/view/react-controls.test.mjs` | 0 | 56 pass, 0 fail |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | 1 test OK |
| `npx eslint` on the new test and the five `.tsx` files | 0 | clean |
| `npx prettier --check` on the same six files | 0 | clean |
| `npm run typecheck` | 0 | clean |
| `python -B .the-way/elements/common/foundation_check.py` | 1 | **known state**: 39 errors, every one a line of `tests/view/react-controls.test.mjs` quoting the old D-265 sentence (slice 12 deletes the file); none names the new file or any other file |

Not run: the whole `npm test` (the orchestrator's alone). The slice's *Checks* name no whole run, so no mismatch to report.

## Own-work check (section 3)

- **Requirement my work most likely does not meet:** that every case of the old file that protects a behaviour or attribute of the React form still has a test that fails when that behaviour breaks (a copy that merely passes would protect nothing).
- **Check:** mutation of the product code in the worktree, two batches, run with `npm test -- tests/view/shared-controls.test.mjs`, then `git checkout -- src/browser/view/controls/` and a clean rerun (exit 0, 49 pass).
  - Batch 1 (exit 1, 9 failed, each mutation caught): `aria-busy` removed; `aria-expanded` removed; `aria-describedby` of the text field removed; pick cell `onClick={onPick}` with no greyed guard; select list `value` → `defaultValue`; number field showing `String(value)` instead of the draft; number field's `rule` replaced by a range clamp.
  - Batch 2 (14 failed, each mutation caught): button `disabled` ignoring waiting; `aria-pressed` only when selected; `type=submit` for kind `main`; text field `value` → `defaultValue`; `FORM_WARNING.role` changed; pick cell `disabled` in place of `aria-disabled`; number field Enter and blur committing without typing.
  - One mutation was **not** caught by the cases copied from the old file: Enter or blur committing with no typing (the range rule reads the untouched text as "no change", so nothing showed). I added the case "a field left with no typing commits nothing, whatever the rule reads" to the custom-rule test; the same mutation then failed it (batch 2 above). The old file did not catch it either.

## Reaches beyond the handoff

- `foundations/decisions.md` lines of D-44, D-275, D-276, D-265 (4542-4555, 4826-4857, 4859-4903, 3985-4031 of the handoff's current ranges): named by the *Read* as "Foundation entries rows 6, 7, 8, 2"; read as the current entries. Not a reach.
- `.the-way/task-cycle/change/slice.md` (named by the method file, read whole).
- `.the-way/elements/common/foundation_check.py`, lines 66-100 and 790-860 (what a `decision:` quotation must satisfy: stand in a binding sentence and begin a sentence), and one run of the check. Why: to write quotations that pass.
- No other reach.

## Choices (with the way rejected and the cost if wrong)

- **Attributes compared through `attributesOf(element)`** (a plain object of all attributes, an input's `value` attribute left out), so each case names every attribute it expects and an extra or missing one fails. Rejected: single `getAttribute` asserts only — an extra attribute (a stray `aria-pressed` on a secondary action) would pass. Cost if wrong: a deliberate new attribute needs the case's literal updated (that is the point of D-265's "a new state … given its case in the same change").
- **Tables of named variants** for the kinds and the locked looks (testing.md allows a table of explicitly named variants). Rejected: one test per kind — near-identical bodies.
- **D-288 is not cited by a `decision:` line**: its binding sentence that mentions the greyed cell is mid-sentence and the foundation check requires a quotation to begin a sentence; D-289's first sentence carries the same requirement and is cited. Cost if wrong: none for the check; D-288's Verification holds complies/violates lines, so it needs no citation to be "held".
- **Cases not carried over**: those that existed only to compare two forms (every `deepEqual(drawnTree, domTree)`), `setButtonExpanded` / `setButtonSelected` / `setButtonWaiting` / `setPickCellChosen` DOM-function cases, "a pick cell chosen in place", and the DOM half of the greyed-cell case. Ground: they protect the DOM form, which slice 13 deletes (spec Decision 7).

## Unread material

- `guidelines/styleguide-browser-view.md`: read whole (lines 1-1045, in three pages).
- `guidelines/testing.md`: read whole (two pages).
- `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, `tests/view/page-document.mjs`, `tests/view/react-controls.test.mjs`, the five `react-*.tsx` files: read whole.
- Spec lines 18, 171, 178 and the decisions D-288, D-289, D-395, D-44, D-275, D-276, D-265: read whole as entries (D-288/D-289/D-395 by their line ranges; the others by the handoff's current ranges).
- Not read: the rest of `foundations/decisions.md`, the task document `task.md`, `plan.md`, `spec.md` beyond the three named lines (as the handoff directs). Of the decision entries I read only the ranges named.

## Searches not found or unclear

- None unsettled. One point checked rather than unclear: the handoff's current range for D-265 (`3985-4031`) held the new text of D-265 (the entry written by the foundation step), which the new test cites; D-44, D-275, D-276 ranges matched their entries.

## Working copies

None made. No directory `.runs/executor-11/` was created, no screenshot taken (no screen changed; nothing was run in a browser).

## Problems observed

- None in the product code. `npm test -- <file>` rebuilds `dist/` each run (about 5 s); the mutation runs left `dist/` built from mutated code until the clean rerun, which rebuilt it from the restored source (the last run of each file above is on restored code).
