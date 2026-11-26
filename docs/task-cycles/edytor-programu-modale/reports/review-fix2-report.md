PASS 83f6bf6a0b1d4ccda0db0a038b727a5741eea450

# Review of the second fix — task `edytor-programu-modale`

Range `dace1f39c1070b7ecf640b42223c4490222a96e7..83f6bf6a0b1d4ccda0db0a038b727a5741eea450` (one commit, `83f6bf6a`), full diff, reviewed by `review-change` with `fix.md`, the review of a fix. `git rev-parse HEAD` = `83f6bf6a0b1d4ccda0db0a038b727a5741eea450`. The findings file `reports/fix2-findings.md` bounds the review: it holds the blocking finding 1 alone, and Minor findings 2–7 of `reports/review-remarks-report.md` go to the request's list by the orchestrator's note.

Counts: blocking 0; findings fixed 1, remaining 0; new Minor 0; out of scope 0.

## Finding 1 — the shadow of the window darkened the text of the operable rows under its lower edge: **fixed**

What the fix does:
- `--window-shadow` is gone from `src/browser/tokens.css`.
- `box-shadow` is gone from `.rule-list-panel .rule-panel` (`src/browser/program-panel.css:451-457`). `git grep box-shadow -- src/browser` finds nothing, so no other rule gives the window a shadow.
- The window is now set off by its frame in `window-frame` alone.

Evidence that the defect no longer exists:
- **Pixels of the author's shots.** `loop2_okno_cien_wiersze_pod_1600.png` is the finding's state at `dace1f39`. `loop2_okno_ramka_wiersze_pod_1600.png` is the same state at the fix. Both are at `mariusznazar/screenshots` `23c0929e`, with rows 1.13 and 1.14 standing in reach under the window's lower edge. I read the column at x=1280 from y=654 to 699 with Pillow:
  - before the fix, the bare column under the edge reads (14, 14, 15) and rises to (24, 24, 27) only about 39 px below — the shadow, the finding's k ≈ 0.58 to 1;
  - at the fix, every pixel from 663 on reads (24, 24, 27), the panel, so k = 1. Text under the edge keeps the roles' own ratios on `panel`, which `design-token-contrast` holds at 4.5:1. The author's measured 11.99 / 6.75 / 5.39 are those ratios.
  - y=660 in both shots is a glyph of row 1.12, which the edge cuts. That row is `inert` (`liesUnder`) and was not part of the finding.
- **No place still names the shadow:**
  - `git grep window-shadow` finds nothing (exit 1).
  - `git grep` for „shadow” in `foundations`, `guidelines`, `src/browser` and the window test finds only sentences that say the window casts no shadow and why: D-40 *Verification* and *Rationale* (`foundations/decisions.md:5055`, `:5060`), the comment at `src/browser/program-panel.css:448-450`, and `tests/view/rule-window.test.mjs:217-221`, `:257-259`. The other hits in `foundations/environment_facts.md` are names of ESLint and Ruff rules.
  - `git grep` for „cień/cienia” in the styleguide finds only the Bad example (`guidelines/styleguide-browser-view.md:1233`: a shadow that darkens the rows under the edge below their threshold) and the look bullet (`:1266-1270`: the window casts no shadow, unlike loop's, because the rows under it stay in reach). The other hits are the scene's „odcień” and „cieńszy”.
  - The table Roles row of `window-frame` (`:25`) no longer names a shadow, and neither does the bullet of "Every value with its source" (`:488-491`, now „ramka okna reguły”).
  - The kitchen-sink page lists the role `window-frame` alone (`src/browser/kitchen-sink/role-samples.tsx:23`) and had no shadow sample.
  - D-42 and the invariant `design-token-contrast` never named the shadow, and the fix leaves them unchanged.
- **The entries say what the code does.**
  - D-40 *Verification*, „the window of a rule framed in `window-frame` and casting no shadow, through the real stylesheet”: the test reads the frame through the real stylesheet and asserts the computed `box-shadow` is `none` (`tests/view/rule-window.test.mjs:255-260`).
  - D-40 *Rationale* says why there is no shadow, and its figure „about 2.3:1” matches the probe (2.28:1 at the edge). It also states the accepted cost: the window looks flatter than loop's.
  - D-40's binding sentence (`:5050`) names no shadow and is unchanged.
- **The test would catch the shadow's return.** At `dace1f39` the same test asserted that the computed `box-shadow` was `var(--window-shadow)` and passed (my previous review, exit 0). So jsdom reports a declared `box-shadow` as written, and a shadow put back would turn the computed value from `none` to that value and fail the test. The author also reports a failing run with the old stylesheet (exit 1, 1 fail).
- **The change of the test's expectation** has its cause in the requirement: D-40 *Verification* changed with it, as `guidelines/testing.md` "Changing an existing test" asks.

## Does the frame alone still set the window off (the human's remark)?

Yes, in both layouts. I looked at the author's four after-shots and the before-shot:
- `loop2_okno_ramka_wiersze_pod_1600.png`: the window of rule 1.1 at 1600 × 1000 with rows 1.13–2.6 under it. The light frame closes the window on all four sides. Its lower edge cuts plainly across the list, and the rows below read as rows of the column, not of the window.
- `loop2_okno_ramka_wiersze_pod_360.png`: the window of rule 1.1 at 360 × 740, its bar with „↑”, „↓” and „Usuń”, and rows 1.14 and group 2 under it. The frame marks its sides and its lower edge against the rows.
- `loop2_okno_ramka_grupy_360.png`: the window of group 2 at 360 × 740. The frame marks its top and sides under the open header.
- `loop2_okno_ramka_grupy_1600.png` was fetched but not opened. It shows the same frame and rule as the shot of rule 1.1 at 1600, so I left it unviewed.

**D-42 for the frame alone.** `window-frame` `#71717b` keeps 3.67:1 on `panel` and 3.09:1 on `highlight`, held by `design-token-contrast` (exit 0). The fix removes the only thing that lowered the contrast of any text, and adds none.

## New findings

None. Minor findings 2–7 of the previous review are not part of this fix. The fix's diff leaves them as they stood and makes none of them worse: finding 2 on the colours the frame touches, finding 6 on the unaligned table row.

## Declined to judge

- Minor findings 2–7 of `reports/review-remarks-report.md`: outside the findings file by the orchestrator's note; they go to the request's list.

## Checks

- `npm test -- tests/invariants/test_design_token_contrast.py` — exit 0 (3 tests).
- `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0 (4 tests).
- `npm test -- tests/invariants/test_design_token_sources.py` — exit 0 (2 tests).
- `npm test -- tests/view/rule-window.test.mjs` — exit 0 (10 pass, 0 fail).
- `npm run typecheck` — exit 0.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0 („0 errors”), at `83f6bf6a`, the one commit of the fix.
- `python -B .the-way/instruction-files/check_instructions.py` — exit 0 („0 error, 0 warn, 122 info”).
- `git grep -n window-shadow` — exit 1, no match.
- `git grep` for „shadow” and for „cień|cienia|cieni” in the tracked foundation, guidelines, `src/browser` and the window test, and `git grep box-shadow -- src/browser` — results as above.
- Manual: the five screenshots at `mariusznazar/screenshots` `23c0929e` fetched with `gh api`, four viewed, and the before/after pair at 1600 read pixel by pixel with Pillow.
- Not run: the full gate (`npm test` with no file), which is the cycle's. No running game was opened: the author's shots in the finding's state served.

## Reach beyond the dispatch

- `reports/review-remarks-report.md` and `reports/review-remarks-shadow-probe.txt`, my own previous report and probe, for the finding's method and figures.

## Working copies

`.runs/review-fix2/` held the five screenshots. It was removed with `rm -rf .runs/review-fix2`, and `git status` of the reviewed worktree is clean. No browser was opened, and no worktree was made.

## Unread material

- `guidelines/coding.md`: not read. The fix removes one declaration and one token and changes the text of one assertion, and no rule of size or structure is reached.
- `guidelines/testing.md`: read to line 203 earlier; for this fix I read its rule "Changing an existing test" (lines 129-140) again. Lines 204-510 are not read.
- `.the-way/product-guidelines/reading.md` and `.the-way/elements/common/way_of_working.md`: not read. The review of a fix reads what the findings file and the handoff name, and no finding needed them.
- `loop2_okno_ramka_grupy_1600.png`: fetched, not viewed (above).

## Searches not found or unclear

none
