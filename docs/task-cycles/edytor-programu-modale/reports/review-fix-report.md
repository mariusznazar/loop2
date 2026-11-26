PASS bfc8c7f2816795132f3eb8d6a52224997259c8f1

# Review of the fix — task `edytor-programu-modale`

Range `f124f5f4529b15b22111aa20cc1bf6bec40a0f75..bfc8c7f2816795132f3eb8d6a52224997259c8f1` (commits `9a7720aa`, `bfc8c7f2`), read in full; `git rev-parse HEAD` is `bfc8c7f2816795132f3eb8d6a52224997259c8f1`. Method: `.the-way/task-cycle/review/SKILL.md`, variant of a fix (`fix.md`). Bounded by `reports/fix-findings.md`: the blocking finding 1 and the Minor findings M1–M6.

Result: the blocking finding is fixed; no new Critical or Important finding. Minor findings that remain (M2, M3) block nothing.

## Each finding

**1 (blocking, Important) — a tap beside „▾” on a header of several lines folds the group. Fixed.**
`src/browser/program-panel.css` now gives `.rule-list-header .rule-list-controls` `align-items: stretch`, so the gap and „▾” fill the whole height of the header; the styleguide rule "Program editor" says so. My repeat in the running game (fix head built by `npm run local`, Playwright CLI 0.1.22, Chromium, page area 360 × 740 with `hasTouch`, touch taps through `Input.dispatchTouchEvent`), on a group header renamed to wrap to three lines (header 432..519, 87 px):

| Place | Under the point (`elementFromPoint`) | Touch, radius 0 / 8 / 15 px | Mouse |
|---|---|---|---|
| Old strip, 4 px under the header's top, at the centre of „▾” | `button` („▾”, now 291..339 × 432..519) | folds, all three | folds |
| 4 px above the header's bottom, at the centre of „▾” | `button` | folds, all three | — |
| Gap before „▾” (287..291), 6 px under the top | `rule-list-gap` | opens the window of the group, all three | — |
| Centre of the header's text | `rule-list-name` | opens, all three | — |
| End of the text, 3 px left of the gap, middle line and top line | `rule-list-body` | opens, all six | opens |

So no place of the header outside its button is bare any more: the old strip is now the button itself, drawn as tall as the header with its frame (I looked at a screenshot of the header: „▾” stands as a framed button the full height of the header at its right), and a tap there is a tap on a button, which D-296 leaves to the button. A tap meant to open the window at the end of the header's text lands on the text box or on the gap and opens it, even with a 15 px touch radius 3 px from the button. Touch target: „▾” is 48 × 87, above the 48 × 48 of D-396; nothing got smaller. D-296 („A tap or a click anywhere on the header outside its buttons opens the group, at its centre and on its text as well”) and the styleguide sentence are met. The cost is a wider fold target in tall headers (the column right of the gap), which is visibly the button; no rule of the task or the foundation is against it.

**M1 — the size watch may end in the `ResizeObserver` loop error. Fixed.** `src/browser/view/rule-window.tsx`: the observer's callback now only asks for one animation frame (deduplicated, cancelled in the cleanup) and lays the boxes there, outside the browser's delivery of size changes; the layout effect still lays them at each commit. This removes the mechanism my probe showed (a change of layout inside the callback that widens the observed window in the same frame). The new test stubs the observer and the frame, changes the window's box, and asserts nothing is laid in the callback and the row is laid in the frame; the author saw it fail on the old Hook. Not reproduced in the game by either of us; judged fixed by the mechanism.

**M2 — the window sets itself off little from the area. Remains (Minor); the author's contest accepted as to who acts.** A stronger frame or a shadow needs a token value only the human may give (`src/browser/AGENTS.md`); the author names it for the request. It stays a point for the human against the acceptance criterion; it blocks nothing.

**M3 — `RulePanelView` 184 of 200 lines. Remains (Minor), contest accepted.** Under the thresholds of D-425 and the fix adds nothing to `rule-panel.tsx`; nothing is required now. The size test passes on the head.

**M4 — D-306 „on the same field” not held by the window-arrow test. Fixed.** The test now opens „Czynność” first and checks the pick of „Czynność” still stands after „↓” moves the rule to another group.

**M5 — the end-of-run window over an open window of a rule, unchecked in a browser. Fixed (checked).** The author composed an ended map run and reports the window of rule 1.2 on „Czynność” hidden under the end-of-run window (0 `inert`) and back as it was after „✕” (same heading and field, 6 `inert`), with no failure line. I did not repeat it; the claim agrees with the code path I read in the whole review.

**M6 — „window” in two meanings, no glossary entry. Fixed in part; contest of the rest accepted.** D-288's prose now says „browser window” at its five uses of that meaning (only *Rationale* and *Rejected*; no binding sentence or quotation changed; the foundation check reports 0 errors). The author's reading of the glossary template — no entry for a word whose meanings are all ones a reader of the field gives — I accept; with the rewording no sentence reads ambiguously.

## New findings in the fix diff

None Critical or Important. None Minor.

## Declined to judge

- The wider fold target in a tall header (the column of „▾” over the full height): considered under finding 1 and judged no defect — it is visibly the button and keeps D-296.

## Checks run

- `npm test -- tests/view/rule-window.test.mjs` — exit 0; `tests/view/rule-editor.test.mjs` — 0; `tests/view/program-panel.test.mjs` — 0; `tests/view/run-screen.test.mjs` — 0 (each in a worktree of the head).
- `npm run typecheck` — exit 0; `npm test -- tests/quality/test_function_and_file_size.py` — exit 0 (head worktree).
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors"; `python -B .the-way/instruction-files/check_instructions.py` — exit 0, "0 error, 0 warn, 122 info" (reviewed worktree).
- Manual: the taps of the table above in the running game, and a screenshot of the tall header, looked at and not kept.
- Not run: the full gate (`npm test` with no file), the cycle's own run; Firefox, Edge and a real phone.

## Working copies

In `.runs/review-fix/`: a worktree of `bfc8c7f2` (`head`, with a junction to the worktree's `node_modules`), the local start's log and database inside it, the Playwright config and scripts, `.playwright-cli/` files and one screenshot. Browser closed, local start stopped, junction removed, worktree removed with `git worktree remove --force` and `git worktree prune`, the directory removed. The empty directory `.runs/review-whole/` left by the whole review was free now and is removed. The reviewed worktree is unchanged (`git status --short` empty).

## Unread material

none — the findings file, the author's fix report, the handoff, `fix.md` and the full fix diff were read; the frozen task was read whole in the review of the whole change and not again.

## Searches not found or unclear

- The `ResizeObserver` loop of M1 was never reproduced in the game (by me or the author); M1 is judged fixed by its mechanism and the probe of the whole review.
