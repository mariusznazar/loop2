PASS 6381c4f1a65757a598547c52520a6e9d89eb850f

# Review of the fix of the findings of the review of correction 1

Fix range `9fee9680..6381c4f1` (one commit, `6381c4f1`, by the correction agent). `git rev-parse HEAD` = `6381c4f1a65757a598547c52520a6e9d89eb850f`, the head given. Method: `.the-way/task-cycle/review/SKILL.md` and `fix.md` (review of a fix). Findings file: `reports/findings-correction-review.md` (I-1, I-2).

Counts: blocking 0; Minor 2 (new, in the fix); out of scope 0. Both findings fixed.

## Files changed (`git diff --numstat 9fee9680..6381c4f1`)

- `foundations/decisions.md` +5 -4
- `guidelines/styleguide-browser-view.md` +14 -5
- `src/browser/program-panel.css` +41 -6
- `src/browser/view/rule-list.tsx` +45 -9
- `tests/view/rule-editor.test.mjs` +53 -25

## Each finding

**I-1 — fixed.** In the phone layout the text of a row and of a header (`rule-list-body`) is now a box over the whole first line (`display: flex; flex-basis: 100%`, taking the row's padding as its own). Between and around the buttons stand empty elements `rule-list-gap`, one of them the spacer `rule-list-spacer`, which take the click, hold no button, carry `aria-hidden` and no text. The row has no padding or row gap of its own left, so no part of the line outside a button is bare row.

Evidence: Chromium of Playwright CLI 0.1.22, `.playwright/cli.phone.config.json` (360 × 740, touch, `(hover: none)` true), the composed program of three groups and six rules. The contacts were radius 10, 16 and 24 px sent through `Input.dispatchTouchEvent`. A capturing listener recorded each click's target and stopped it.

- **Grid over the lines**, every 6 px from 8 px above each line's box to 8 px below it, plus the corners, 918–1134 points per line and radius. Lines: rule 2, rule 3 (the first rule of „Jedzenie”) and the header „Jedzenie”.
  - Programy: rule 3 and the header — 0 points outside a button reached a button, at every radius. Rule 2 — the only hits were points outside the row: the 4 px gap between the row and the line „+ reguła” below it, or the top edge of „+ reguła”.
  - Screen of a map run: the hits on rule 2 and rule 3 all lay 0.37 px above the buttons' top edge (row top 322.88 + 8 × 6 = 368.88 against button top 369.25). That is the edge itself, so I ran the band probe below.
- **Band probe**: 1, 2, 3, 4, 6, 8 and 12 px outside each edge of each button of the same three lines, at the middle of the edge and 6 px from its ends, at the three radii; points inside any button's box were skipped. Results were the same on Programy and on the screen of a map run.
  - On the line, from 2 px outside a button: 0 hits on every line at every radius.
  - On the line, at 1 px: rule 3 had 17/72 hits on the map run screen and 25/72 on Programy (rule 2 and the header had none). A tap centred 1 px from a 48 px button's edge is that button's edge, so I do not count it as the fault remaining.
  - Off the line: some hits, see Minor m-1.
- **Centre of each button**, at every radius: every tap reached its own button.
- **Real taps with no listener**, Programy at 360 px, radius 16 and 24, on rule 3, the header „Jedzenie” and rule 1. Four places were tapped: the free right end of the text line (6 px from the row's right, 6 px above the text box's bottom, the very spot of I-1), the strip right of „↓”, 3 px left of the last button, and the handle. Each opened its own line, the order of rules and groups unchanged and no group folded.
- **The buttons by their own box**: rule 3 „W dół”/„W górę” moved it down and back. „Grupa w dół”/„Grupa w górę” moved group 2 down and back. „Zwiń grupę” folded group 2 and „Rozwiń grupę” unfolded it.

**I-2 — fixed.** `clickedBody` (`src/browser/view/rule-list.tsx`) now excludes only buttons, so the handle opens as the text does.

- At 360 px with touch: a tap on the handle opened rule 3, rule 1 and the header „Jedzenie” (above).
- At 1280 × 720 with the mouse, no touch:
  - a click on the handle of rule 2 opened rule 2, and one on the handle of group 2 opened group 2;
  - dragging rule 1 by its handle onto rule 4 moved it (`1,2,3,4,5,6` → `2,3,1,4,5,6`) and opened nothing new;
  - dragging group 3 by its handle onto header 1 moved it first (groups `1,2,3` → `3,1,2`).

## What the fix itself might break

- **Computer layout**: `.rule-list-gap { display: none }` outside the phone block, and all other new rules stand in `@media (width < 1280px)`.
  - At 1280 × 720 the rows and headers measured as they did at `9fee9680`: 27 px high, controls at 1122/1136..1243, controls 2 px and text 4 px from the top.
  - All 60 gaps in the page draw no box (0 client rects).
  - A rule row under the mouse is `rgb(39, 39, 42)`.

  I did not repeat the correction's pixel comparison.
- **Keyboard and screen reader**: the gaps have no `tabindex`, no text and `aria-hidden="true"` (0 of 60 fail any of these). The rule list at 1280 holds 42 tab stops: 6 rows, 3 headers, 18 rule buttons, 12 header buttons and 3 „+ reguła”, which is the count with no gaps.
- **Single open**: a click on a gap opens through the gap's handler, and the row's `clickedBare` skips `.rule-list-gap`, so it asks once. The new case presses five places of a row and three of a header and expects exactly 5 + 3 opens, with none from „▾”.
- **D-425 thresholds**: `src/browser/view/rule-list.tsx` is 794 lines including comments and blank lines, so under 800 code lines. `GroupHeader` and `RuleRow` are well under 200 lines. `tests/quality/test_function_and_file_size.py` passes. The file is close to the 800-line threshold for the next change that adds to it.
- **Entries**: the binding sentences are unchanged. The `tests:` clauses of D-396, D-306 and D-296 now name the covers, the handle and the click on a button asking nothing, and the new cases hold that. The case's `decision:` lines quote D-306's second paragraph and D-296's second sentence (foundation_check: 0 errors). The styleguide sentences on the handle, the covers and the computer layout drawing none of them agree with the code.

## Minor (new in the fix)

**m-1. Off the rows, a finger-sized tap near a button still goes to that button.** Two places:

- the panel's margin right of the right-hand buttons (1–12 px right of „Usuń” or „Usuń grupę”): 3 points × 3 radii hit at every distance on rule 3 and the header;
- the empty part of the line „+ reguła” and the 4 px gap above it, under the last rule of a group (8–12 px under „W dół” of rule 2): the tap reaches „W dół” or „+ reguła”.

What a player sees: a tap in the empty margin right of „Usuń” deletes the rule, and a tap in the empty space under the last rule of a group moves that rule into the next group. Both places lie outside every row, so they are outside I-1's place and the remark's „on a rule's row”. Nothing there takes a click, and Chromium sends the tap to the nearest button. The same held before the fix, when the bare row and the panel's margin both sent the tap to „Usuń”.

The fix removed the row's own right padding (`padding: 0` in the phone block), so the right-hand buttons now stand at the row's right edge. „Usuń” moved from 287..335 to 291..339 at 360 px, 4 px nearer the panel's margin. Kept Minor because it is outside the row, existed before the fix, and the margin is 12 px of the panel.

**m-2. The fix report's „The buttons keep 48 × 48 px and their places” and „To a button: 0 / 0 / 0” are not exact.** The right-hand buttons moved 4 px right in the phone layout (m-1). Points 1 px outside a button's top edge reach it (band probe), and points off the row reach buttons (m-1). The report's 8 px grid missed both. Harmless to the player beyond m-1.

## Declined to judge

- How Chrome on a real Android phone adjusts a tap — the radii are an emulation (fix report, concern 3).

## Checks run

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, „0 errors”.
- `python -B .the-way/instruction-files/check_instructions.py` — exit 0, „0 error, 144 warn, 7 info”.
- `npm test -- tests/view/rule-editor.test.mjs` — exit 0, 82 pass, 0 fail.
- `npm test -- tests/quality/test_quality_invariants.py` — exit 0, 8 tests OK.
- `npm test -- tests/quality/test_function_and_file_size.py` — exit 0, 2 tests OK.
- `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0, 4 tests OK.
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` — exit 0, 3 tests OK.
- Manual, in the browser: `npm run local` at `https://127.0.0.1:57352`, an account at `example.test`, the same composed state as in my first review (a second character „Drugi”, a program of three groups and six rules). Probes as given above, on Programy and on the paused screen of a map run of „Drugi” at 360 px with touch, then the ordinary config at 1280 × 720. The browser was closed and the start stopped (`npm run local:stop`, 1 stopped).
- Not run: the full `npm test` (the cycle's own run). I did not re-run the view tests of other files: the fix touched only `rule-editor.test.mjs` among the tests, and the stylesheet it changed is `program-panel.css`, whose rule list `rule-editor.test.mjs` draws.

## Reaches beyond the dispatch

- `foundations/decisions.md` D-425 (binding sentences, by search): the thresholds the handoff names.
- `src/browser/view/rule-list.tsx` and `src/browser/program-panel.css`: the diff and its context (read for the fix, not whole).

## Working copies

- `.runs/review-correction-2/` of the worktree (test logs, local start log, compose and probe scripts, composed state): removed.
- `.playwright-cli/` of the worktree (the CLI's own files): removed.
- The local start's database stays under `.runs/local-start/`, made by the product's own tool, which the next start removes. No screenshot was taken. `git status --short` empty.

## Unread material

- `reports/correction-1-report.md`: only its section „Fix of the review's findings (I-1, I-2)” (lines 170–325), as the handoff names; the earlier sections read in my first review.
- `reports/findings-correction-review.md`: read whole.
- `guidelines/styleguide-browser-view.md`: only the fix's hunks with their context.

## Searches not found or unclear

- How large a contact Chrome on a real Android phone reports, so where its adjustment stops: unknown here; the evidence is Chromium's emulated contact.
- Which edge the 1 px hits on rule 3 sit on was not broken down by the probe's output (it tallied by distance and by on/off the line only).
