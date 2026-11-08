# Report 14 — fix of the review's findings (report 13, head `434f32b`)

**Status:** done with concerns — I-1 and M-1 to M-4 fixed in one commit; M-5 is returned (no code), because its fix needs a choice the task and D-336 do not settle (see M-5). The committed fix stands.

**Commit:** `52367a9` fix: :bug: set the numbers of the bar of the solving condition in Geist, and bring the comments, an example of the styleguide and D-216 into line with a header that has no status row

Pinned the-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96` (unchanged).

## Files changed (`git show --numstat 52367a9`)

`src/browser/styles.css` (-1), `src/browser/view/run-screen.tsx`, `src/browser/view/screen-address.ts`, `tests/view/run-header.test.mjs` (+17), `guidelines/styleguide-browser-view.md` (2 lines), `foundations/decisions.md` (1 line).

## Findings

**I-1 — fixed.** In `src/browser/styles.css`, rule `.run-header-requirement-text`, the line `font-family: var(--font-family-mono);` is gone; `font-variant-numeric: tabular-nums` stays. The handoff said a fix changes no test, since no test pinned the face; I added one case, because the finding is a breach of D-46 that nothing guarded: „the words of the bar of the solving condition are not in the mono face of the clock, and keep tabular figures” in `tests/view/run-header.test.mjs` (through the real stylesheet: the face is not `var(--font-family-mono)`, figures are `tabular-nums`). The break it catches is a bug, not a deliberate decision (D-46 gives the mono face to the chronicle and the clock only).
- Seen failing: with the mono line put back for a moment, `npm test -- tests/view/run-header.test.mjs` exit 1 (1 failed, 21 passed); file restored from a copy.
- Passing: `npm test -- tests/view/run-header.test.mjs` exit 0 (22 passed).
- In a running browser: the bar's words computed to `Geist, sans-serif` with `tabular-nums`, the clock `"Geist Mono", monospace` (read from `getComputedStyle` of a Las map run, „Passa 3/480”); screenshot of the header inspected.

**M-1 — fixed.** `src/browser/view/run-screen.tsx:3-5`: the header comment now says „one header — the character's name, the map's name, the clock, the bar of the solving condition and the buttons — over three areas”.

**M-2 — fixed.** `src/browser/view/screen-address.ts:154`: „The minute is the one the clock in the header of that screen writes”, as D-280 now has it.

**M-3 — fixed.** `guidelines/styleguide-browser-view.md` (now lines 293-294), rule „A fault of one screen is fixed in its component”: *Good* „Za ciasny nagłówek ekranu przejścia poprawiony w regułach tego nagłówka innym stopniem skali odstępów.”, *Bad* „Wartość stopnia skali odstępów zmieniona w pliku tokenów, żeby zmieścił się nagłówek ekranu przejścia.” The rule's own text and its decision (D-38) are untouched. I wrote the two lines directly as a minimal edit of an example; I did not run the whole refinement of the skill `the-way-maintain-styleguide`, which leads a styleguide task with the human and has no step for one example line (see *Searches*).

**M-4 — fixed.** `foundations/decisions.md:4048` (D-216 *Rejected*): „the same in the status row, which the header then held — a very long row and a change of its accepted wording;” — the reviewer's clause. Written through the steps of `the-way-record-decision` (read `elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md` "Changing a decision", `elements/common/way_of_working.md`): an edit in place of *Rejected* only; no binding sentence, field or number changed, so nothing follows from it to other entries. `python -B .the-way/elements/common/foundation_check.py`: exit 0 ("0 errors"), also exit 0 on the tree before the edit.

**M-5 — returned, no code.** The two ways to remove a row that looks clickable and does nothing while the program panel shows a saved program (`src/browser/view/program-panel.tsx:822` returns unless the panel shows the copy; `src/browser/view/now-rows.tsx:76` makes the row a tab stop):
1. The click brings the copy back into the panel (the program panel switches `shown` from the saved program to the copy) and centres the rule. Cost: a click on „Teraz” or „Potem” discards the player's view of a saved program — a changed panel state D-336 does not give; what happens to unsaved edits in the shown program is another open question (D-173 and the question „Zapisać, odrzucić, wrócić?” sit on that panel).
2. The row looks and behaves as plain text while the panel shows a saved program (no tab stop, no pointer, no hover). Cost: the row's look changes with a state of another area, a rule D-336 and the styleguide do not give, and the keyboard loses a stop it had a moment before.
3. Leave it, as the plan's *Choices* accepted („A player who shows a saved program during a map run clicks and sees nothing happen”). Cost: none today; the player sees an inert row in a rare state.
Recommendation: way 3 for this task and a question to the human, because ways 1 and 2 both set a behaviour D-336 is silent on. `tests/view/run-screen.test.mjs` „while the program panel shows a saved program a click on Teraz scrolls nothing” stays as it is.

## Checks (command and exit code)

- `npm test -- tests/view/run-header.test.mjs`: exit 0 (22 passed); the red run above exit 1.
- `npm test -- tests/view/run-screen.test.mjs`: exit 0.
- `npm test -- tests/view/screen-address.test.mjs`: exit 0.
- `npm test -- tests/view/menu-bar.test.mjs`: exit 0.
- `npm test -- tests/invariants/test_browser_view_token_values.py`: exit 0.
- `npm test -- tests/invariants/test_design_token_contrast.py`: exit 0.
- `npm run typecheck`: exit 0.
- `npx eslint --max-warnings 0 src/browser/view/run-screen.tsx src/browser/view/screen-address.ts tests/view/run-header.test.mjs`: exit 0.
- `npx prettier --no-config --no-editorconfig --check` on `src/browser/styles.css`, `run-screen.tsx`, `screen-address.ts`, `tests/view/run-header.test.mjs`: exit 0.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0.
- Not run: `npm test` with no argument (the cycle's run); the Python quality invariants for the styleguide file beyond the two named above (a two-line text change of examples).
- Browser: `npm run local` started and stopped (`npm run local:stop`, "Local starts stopped: 1"); `playwright-cli close`; `.playwright-cli/` and the log deleted.

## Own-work check

Requirement most likely missed: the fix must not draw a new finding, so no other rule of the bar may use the mono face and the figures must still not jitter. Check: `grep -n "font-family-mono" src/browser/styles.css` (exit 0) now finds one line, 1344, the rule of the clock, the new test pins `tabular-nums`, and the browser computed style shows Geist with `tabular-nums` for the bar's words. A mutation not caught by a test: the comments of M-1 and M-2 and the text of M-3 and M-4 (prose, no test, as the testing method says).

## Reaches beyond the handoff

- `src/browser/view/program-panel.tsx:816-830` and `src/browser/view/now-rows.tsx:70-80`, to name the ways of M-5 (read only).
- `.the-way/elements/decisions/template.md` "Changing a decision" and `.the-way/elements/common/way_of_working.md`, named by the skill, for M-4.
- `.the-way/task-cycle/skill/SKILL.md:270-295` and `.the-way/product-guidelines/styleguide/` listing, to find how a styleguide line is written (see *Searches*).

## Searches not found or unclear

- The handoff says a styleguide line (M-3) „is written as the cycle's author `the-way-maintain-styleguide` names, from the task”. I found no passage of `.the-way/task-cycle/skill/SKILL.md` or `foundation_step.md` that names that skill for a small edit; the skill's own scope is leading a styleguide task's refinement with the human. I made the minimal edit and flag it here; if a different way was meant, M-3 is two lines to redo.
- Line numbers of M-3 in the findings (`293-294`) were right; those of M-4 (`4048`) were right.
- The review report `reports/13-review-report.md` was not opened; the findings file carried the evidence and I checked each place in the code myself.

## Choices

- Kept `font-variant-numeric: tabular-nums` (the finding's fix); rejected keeping the mono face with a change of D-46, which needs the human.
- Added one test where the handoff expected none: cost if wrong, one extra case that fails only if someone sets the mono face on the bar's words.
- M-4: used the reviewer's clause word for word rather than rewording the rejected option as „the same in the header”, which would change what was rejected.
