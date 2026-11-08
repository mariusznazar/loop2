PASS 52367a97ee32519e9c97a2649be9530f3e50a73c

# Report 15 — review of the fix of the findings of report 13 (review-change, fix.md)

Range `434f32bbbf74695181ab5de5add4137d989aaac2..52367a97ee32519e9c97a2649be9530f3e50a73c`, one commit `52367a9`; `git rev-parse HEAD` in the worktree gave `52367a97ee32519e9c97a2649be9530f3e50a73c`. Read: `.the-way/task-cycle/review/SKILL.md`, `fix.md`, the findings file `reports/14-findings.md`, the fix report `reports/14-fix-report.md`, and `git diff 434f32b..52367a9` (6 files, +24/−7).

Counts: blocking 0; Minor 1 remaining (M-5); new findings in the fix diff 0; out of scope 0.

## Findings of the findings file

**I-1 (Important) — fixed.** `src/browser/styles.css`, `.run-header-requirement-text` no longer sets `font-family`; it keeps `font-variant-numeric: tabular-nums` and inherits the Geist face. `grep -n "font-family-mono" src/browser/styles.css` finds one line, 1344, in the rule `.run-header-clock`, which D-46 allows. A new case in `tests/view/run-header.test.mjs` ("the words of the bar of the solving condition are not in the mono face of the clock, and keep tabular figures") reads the computed style through the real stylesheet, the same method as the clock's existing face case, and the fixer saw it fail with the mono line put back (report 14). It passes now (22/22).

**M-1 (Minor) — fixed.** `src/browser/view/run-screen.tsx:3-5` names the header as „the character's name, the map's name, the clock, the bar of the solving condition and the buttons”, which matches D-311.

**M-2 (Minor) — fixed.** `src/browser/view/screen-address.ts:154` reads „the one the clock in the header of that screen writes”, which matches D-280.

**M-3 (Minor) — fixed.** In `guidelines/styleguide-browser-view.md:293-294`, *Good* and *Bad* now name the header of the screen of a map run, and the rule's text and decision are untouched. The fixer wrote the two lines directly rather than through `the-way-maintain-styleguide` and flags it. The content is an example of an unchanged rule, so I see no defect in it.

**M-4 (Minor) — fixed.** `foundations/decisions.md:4048` (D-216 *Rejected*) now reads „the same in the status row, which the header then held — …”. It still records the way weighed then and no longer reads as a present row. The foundation check passes.

**M-5 (Minor) — remains, kept.** The fix returns it without code. Way 1 (bring the copy back) and way 2 (inert look while a saved program is shown) would each set a behaviour D-336 does not give. The code is unchanged (`now-rows.tsx` `RuleRow`, `program-panel.tsx` `scrollToRule`), so the inert control while a saved program is shown still exists. I keep the finding and agree it needs the human's choice rather than a guess. It blocks nothing (WAY-162), and I recommend it go into the request's description as an open question for Mariusz.

## The fix diff itself

Nothing broken. The CSS change only drops one declaration. The comment and prose edits change no behaviour. The new test adds a guard and weakens nothing. No simulation file, `saved-game.ts` or `assets/**` is touched. The one prose line in `screen-address.ts:154` exceeds 80 columns, which Prettier accepts for comments (check below).

## Declined to judge

none

## Checks

| Check | Command | Exit / result |
|---|---|---|
| Head | `git rev-parse HEAD` | `52367a97ee32519e9c97a2649be9530f3e50a73c` |
| Worktree clean | `git status --short` | empty |
| Build | `npm run build` | 0 |
| Header test | `node scripts/test-node-file.mjs tests/view/run-header.test.mjs` (after the build) | 0, 22 pass |
| Run screen | `node scripts/test-node-file.mjs tests/view/run-screen.test.mjs` | 0, 13 pass |
| Screen address | `node scripts/test-node-file.mjs tests/view/screen-address.test.mjs` | 0, 57 pass |
| Menu bar | `node scripts/test-node-file.mjs tests/view/menu-bar.test.mjs` | 0, 28 pass |
| Token values | `python -B scripts/test.py tests/invariants/test_browser_view_token_values.py` | 0 |
| Contrast | `python -B scripts/test.py tests/invariants/test_design_token_contrast.py` | 0 |
| Types | `npm run typecheck` | 0 |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 ("0 errors") |
| Formatter | `npx prettier --no-config --no-editorconfig --check src/browser/styles.css src/browser/view/run-screen.tsx src/browser/view/screen-address.ts tests/view/run-header.test.mjs` | 0 |
| Linter | `npx eslint --max-warnings 0 src/browser/view/run-screen.tsx src/browser/view/screen-address.ts tests/view/run-header.test.mjs` | 0 |
| Remaining mono and status-row mentions | `grep -n "font-family-mono" src/browser/styles.css`; `grep -rn "status row\|wiersz stanu" foundations guidelines src/browser` (outside `status-row.ts`) | only the clock rule; only D-216's corrected *Rejected* |
| Whole gate | `npm test` with no argument | not run, by the dispatch |
| Failing run of the new case | not repeated by me | the fixer's red run (exit 1 with the mono line restored) is in report 14; the case uses the same computed-style method as the clock's face case, which asserts the mono value and passes |

The build wrote only `dist/`, which is ignored.

## Reaches beyond the dispatch

- `src/browser/styles.css:1340-1346` — to confirm the one remaining mono rule is the clock's.

## Searches not found or unclear

- I did not run the new test case against the old CSS myself. I rely on the fixer's red run and on the method being the same one the clock's case already proves.
