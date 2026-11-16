PASS fe15a2671b959c3162ff7dea2203c48c0c7f8137

# Review of fix 1, pass 1 side (code, tests, comments) — cycle `drobne-bledy-ekranow`

- Fix range: `5b3dac418ed9d744c4e9854b068909b96944be57..fe15a2671b959c3162ff7dea2203c48c0c7f8137` (7 commits; `git rev-parse HEAD` confirmed `fe15a267…`).
- Bounds: the findings of pass 1 in `reports/review-whole-findings.md` (B1, M1, M2, M3, M4) and the changes the fix made to `src/**` and `tests/**`. `foundations/decisions.md`, the styleguide and findings I-1 to I-4 and M-1 to M-3 belong to the pass 2 reviewer; I-1 is the same defect as B1, and I judge it only through B1's lines.
- Result: all five findings are fixed. The fix diff adds no Critical or Important finding. One Minor note stands outside the fix diff and blocks nothing.

## Findings, one by one

### B1 (Important) — fixed

All twelve `decision:` lines now start a binding sentence of their decision, word for word:
- `tests/view/shared-controls.test.mjs:787` quotes D-267 from „No tool guards …”.
- `tests/view/program-panel.test.mjs:1993` quotes D-306 from „After the last field …”.
- `tests/view/program-panel.test.mjs:617` quotes the first sentence of D-174, without the elision. The author chose the first sentence over the one my report named, because the first is the sentence that carries „its click switches the character …”. That choice is right: the sentence I named does not hold what the test checks.
- `tests/view/program-panel.test.mjs:647` quotes D-164 from „Programs belong to the player, …”.
- `tests/view/login-card-focus.test.mjs:218, 233, 249, 269, 303, 318` quote the whole second sentence of D-381. Line 269 no longer quotes the plan.
- `tests/view/game-saver.test.mjs:527` and `:561` quote D-208 from „When one fails, …”.

Evidence: `python -B .the-way/elements/common/foundation_check.py` exits 0 with `0 errors` (it exited 1 with 12 errors at `5b3dac41`).

On line 269: the test shows that the game opens and no card takes focus. D-381's „the page moves focus to it only after …” covers that case, so the quotation is a sentence the test holds.

### M1 — fixed

`tests/view/menu-bar.test.mjs:318`–`330` now focuses the link before the press, as a browser does, and asserts `active()` is the link: „a click on a link leaves the focus on it”. The title and the D-285 quotation now carry the focus clause. This is the outcome I saw in the real browser in the review (focus on „Mapy”).

The fix report says a mutation that sends every outside click to „Konto” fails this test and its neighbour. I did not rerun that mutation; the assertion as written cannot pass under it.

### M2 — fixed

`src/browser/view/rule-list.tsx:167`–`194`:
- `StructuralEdit` is gone.
- `FocusTarget` keeps only the removal's two shapes.
- `focusAfterRemove` returns the same two results the removal used.
- `keysOf` lost its dead `"condition"` mapping and its `"row" in target` guard; type narrowing now covers it.

The one call site, `rule-list.tsx:435`, still gets `rule:<id>:remove` or `group:<id>:add`/`open`, exactly as before. `tests/view/rule-editor.test.mjs` passes (76 of 76), including the focus case after „Usuń”.

### M3 — fixed

The three comments of `tests/view/program-panel.test.mjs` (`:590`, `:613`, `:1989`) no longer name the task document.

Evidence:
- A search for `To do|task\.md` under `tests/` finds nothing.
- Positive control: a search for `D-294\. A new copy` finds 1.

### M4 — fixed

- `src/browser/view/tile-table.tsx:78` keys each fire text by its place: `key={index}`.
- `src/browser/view/terrain-drawing.tsx:95` gives the class `hovered` only to a revealed tile.

`tests/view/world-area.test.mjs` passes (23 of 23). It reads `g.hovered` only on revealed tiles.

## What the fix diff itself changed

- **Comments of `moveRule` and `ruleArrows`** (`src/browser/view/program-editor.ts:253`, `:284`–`287`): these are comments only, and they now say what `ruleArrows` does.
- **`tests/view/program-editor.test.mjs:1614`–`1624`**: a new case puts an empty group at each edge of the program. `ruleArrows(…, 2, 0)` gives `{ up: true, down: true }`. A regression to „off at the program's ends” would give `up: false`, so the case fails for the behaviour it names.
- **Two test titles**: they now say what D-297 says (`program-editor.test.mjs:1591`, `rule-editor.test.mjs:400`). The D-297 quotation of `rule-editor.test.mjs:402` is cut before the clause that the test does not hold, and it still starts the sentence.
- **Nothing broken**: no behaviour of the product changed beyond M4's class, and no test was weakened.

## Note outside the fix diff (Minor, blocks nothing)

- `tests/view/rule-editor.test.mjs:1127` (title) and `tests/view/program-panel.test.mjs:1044` (comment) still write the rule without its unit: „Zapas poniżej 8 · Patyk”. After To do 3 the row reads „Zapas poniżej 8 szt. · Patyk”, so this wording no longer matches the screen. The fix report raised it as concern 1. Fix: add „szt.” in both places.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Head | `git rev-parse HEAD` | 0 | `fe15a2671b959c3162ff7dea2203c48c0c7f8137` |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| Lint | `npx eslint src/browser/view/program-editor.ts src/browser/view/rule-list.tsx src/browser/view/terrain-drawing.tsx src/browser/view/tile-table.tsx` and the seven changed test files | 0 | clean |
| Format | `npx prettier --check` on the same 4 code files and 7 test files | 0 | all formatted |
| Focused tests | `npm test -- tests/view/game-saver.test.mjs` | 0 | 23 of 23 |
| | `npm test -- tests/view/login-card-focus.test.mjs` | 0 | 6 of 6 |
| | `npm test -- tests/view/menu-bar.test.mjs` | 0 | 32 of 32 |
| | `npm test -- tests/view/program-editor.test.mjs` | 0 | 54 of 54 |
| | `npm test -- tests/view/program-panel.test.mjs` | 0 | 60 of 60 |
| | `npm test -- tests/view/rule-editor.test.mjs` | 0 | 76 of 76 |
| | `npm test -- tests/view/shared-controls.test.mjs` | 0 | 50 of 50 |
| | `npm test -- tests/view/world-area.test.mjs` (it tests the changed `tile-table.tsx` and `terrain-drawing.tsx`) | 0 | 23 of 23 |
| Not run | the full suite; the local game | — | as the dispatch gives |
| Not run | the instruction check | — | not asked for this review; the fix report gives exit 0 |

## Reaches beyond the dispatch

None. I read the fix diff of `src/**` and `tests/**` and the fix report. The `decision:` quotations were judged against the decisions as I read them in the review of the whole change, and the foundation check confirmed them.

## Unread material

- The diff of `foundations/decisions.md` and `guidelines/styleguide-browser-view.md`: not read. That is pass 2's side.
- `reports/review-whole-findings.md`: not opened as a file. I used my own findings in their words, which the coordinator says the file holds.
- The fix report: read whole.
- No decision read anew. The count of decisions read whole stays as in `reports/review-whole-report.md` (17).

## Searches not found or unclear

- `To do|task\.md` under `tests/`: not found, as M3 requires. Positive control `D-294\. A new copy` found 1.

## Working copies

- `.runs/review-whole/` held the fix diff and the log of the focused tests. It was removed after this report; the results are in the table above.
- The fix diff was first written by mistake into `reports/` (`_tmp-fix1.diff`). It was moved into the directory above within the same step, so nothing of it is left in `reports/`.
- No worktree, browser session or local start was made.
