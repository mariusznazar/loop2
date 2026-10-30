# Fix 1 — wprawa-i-drzewa

Status: done

Starting commit: adc6e548095e56860964fc7f1e4df71d3a11db0f
Final commit: 86157c1e86ed7ea4555cd7e3d468fb682e40edbf
Message: fix: :white_check_mark: qualify MVP decisions and cover skill integration
Worktree: C:/Storage/repos/loop2-wt/wprawa-i-drzewa

Only blocking findings R1–R3 are fixed. R4 and R5 remain untouched as instructed. No product-runtime or UI behavior changed. No full gate, Stryker run, browser check, push, PR, main-checkout change or vault write was performed.

## R1 — fixed

Used the project `the-way-record-decision` method, the accepted frozen task's Q7 and settlement rows 4, 6, 9 and 12. Read the current entries whole and the linked D-185/D-189 entries; the relationship search found no invariant deriving from these six edited decisions. This repair qualifies present MVP behavior, rather than deciding future behavior.

- D-64 now says carrying capacity is **currently** 15 and skill trees **currently** have no raising branch.
- D-182 now says every completion **currently** pays and death/early exits **currently** retain the character's skills.
- D-184 describes the headquarters editor's current repertoire and says purchased branches **currently contribute no actions** to its offer, replacing the unqualified “without”. Both in-run editor modes retain their existing meaning.
- D-187 describes the section's current appearance and current absences before discovery/at maximum rank, replacing “only” and “without” in its binding sentences while preserving the accepted strings and disabled-button behavior.
- D-188 now qualifies both headquarters purchasing and the current lack of in-run purchasing/undo.
- D-189 lists positive skills and describes zero-valued skills/the empty line as currently absent, replacing the unqualified “only”.

The three projected entries D-119, D-179 and D-180 were left unchanged, respecting Q7's explicit exception. The reading of the final diff against Q7 confirmed the six affected binding paragraphs preserve the accepted current behavior and do not rewrite projected wording. The foundation check exited 0 with 0 errors.

## R2 — fixed

Added `the combat resolution minute adds its successful strikes to the run's earlier practice` in tests/sim/skills.test.mjs. The fixture is a run immediately before combat resolves, with earlier gathering practice 7 and one-handed-combat practice 3. The real `stepMinute` transition resolves combat, closes the encounter and updates the run's practice.

Independent accepted arithmetic: stick base damage 6 plus three stronger-strike ranks at 2 each gives 12; the wolf's 24 health takes two strikes. The expected run record is explicitly `{ smallItemGathering: 7, oneHandedCombat: 5 }`. Assertions check resolution minute, ended combat, defeated creature, both skill amounts and unchanged input. They do not use `sumPractice` or `resolveCombat` to compute the expected result.

Deliberately reproducing mutant 575 by replacing `+ right[id]!` with `- right[id]!` made this test fail: actual oneHandedCombat 1, expected 5. The other 17 tests passed. The production source was restored before the next demonstration and has no final diff.

## R3 — fixed

Added `meal and walking bonuses apply to their own actions when both are bought` in tests/sim/skills.test.mjs. One character snapshot has legally affordable Szybki posiłek rank 1 and Długi krok rank 1. The real `pickActivity` transition starts each requested action and its scheduled duration is asserted independently: eating 5−1 = 4 minutes; walking 5−2 = 3 minutes. It also checks the selected action and unchanged input.

Deliberately reproducing mutant 538 by replacing the action-list condition with `false` made this test fail: eating took 2 minutes instead of 4. The other 17 tests passed. The production source was restored; all 18 tests then passed.

## Checks and exact results

All commands ran from C:/Storage/repos/loop2-wt/wprawa-i-drzewa.

| Command | Run and exit code |
|---|---|
| `git ls-files --stage -- .the-way` | exit 0; gitlink a8dfe8ac62885e88bc8f463e93ab16b621d48e92 |
| `git -C .the-way rev-parse HEAD` | exit 0; same pinned commit |
| `node node_modules/prettier/bin/prettier.cjs --write tests/sim/skills.test.mjs` | exit 0; formatted the two added tests |
| `npm test -- tests/sim/skills.test.mjs` | initial added-test run: exit 0, 18 passed |
| `npm test -- tests/sim/skills.test.mjs` | deliberate combat-subtraction defect: exit 1, 17 passed and the new R2 test failed (1 instead of 5) |
| `npm test -- tests/sim/skills.test.mjs` | after restoring addition and deliberately disabling action filtering: exit 1, 17 passed and the new R3 test failed (2 instead of 4) |
| `git diff -- src/browser/sim/skills.ts; npm test -- tests/sim/skills.test.mjs` | restored implementation: empty source diff, batch exit 0, 18 passed |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, 0 errors, after the decision repair |
| `npm test -- tests/quality/test_quality_invariants.py` | exit 0, 5 passed |
| `git diff --check; git diff --stat; git status --short` | batch exit 0; no whitespace errors, exactly two changed files |
| `git add foundations/decisions.md tests/sim/skills.test.mjs; git commit -m "fix: :white_check_mark: qualify MVP decisions and cover skill integration"; git rev-parse HEAD; git status --short` | batch exit 0; commit 86157c1e86ed7ea4555cd7e3d468fb682e40edbf, clean working tree |

A combined patch attempted to restore the later `sumPractice` line before editing the earlier filtering line; patch verification rejected the out-of-order context atomically. Reordered hunks applied successfully. No extra test run occurred between that rejected patch and the corrected one; the table above records every focused test run of this fix.

These tests strengthen existing correct behavior, so their initial run passed; the intentional defect runs are the failure demonstrations, not a claim that the existing implementation was broken. The changed file is an invariant-test file because it already cites `action-duration-minimum`; that existing test and citation were not changed. Both new cases are ordinary behavior tests.

The full `npm test` gate was not run because the orchestrator owns it after review. Stryker was not rerun because the reviewer owns the mutation rerun. UI evidence was not repeated because this fix changes tests and foundation wording, with no UI code or behavior change.

## Weakest-point check

The most likely weakness was adding assertions that still observe an isolated helper rather than the run state that matters to the player. The R2 check crosses `stepMinute` into combat resolution and asserts the accumulated run practice, including the unchanged other skill. The R3 check crosses action selection/start with both bonuses present. Reproducing each specific surviving mutation separately demonstrated that the corresponding new test rejects it, and restoration returned the same command to 18 passes. The final diff confirms that neither deliberate production defect remains.

For R1, the own check was a direct comparison of the changed binding paragraphs to Q7 and its projected-entry exception. Six current-behavior paragraphs changed; D-119/D-179/D-180 did not. No new future restriction or alternative was invented.

## Choices, reaches and concerns

- No disputed finding or question remains. The choices are limited to representative fixtures: two high-damage strikes for clear practice arithmetic, and two duration branches in distinct trees for clear separation of effects. A complete natural game journey or every branch combination would add setup without a sharper assertion for these findings.
- Reached the existing combat fixture/type definitions and `finishMinute`/`stepMinute` to construct the actual resolution transition. Reached the decision relationship search and D-185/D-189 for the foundation method's dependent-entry check. No new part, trust boundary or irreversible action is involved.
- Read the whole review and its relevant mutation classification; used IDs 575 and 538 as defect descriptions. No new behavior was derived from mutation-tool output: the expected numbers come from accepted task Q8.
- Remaining Minor R4 and R5 are intentionally not fixed and remain for the PR as the handoff requires.

## Searches not found or unclear

- Combined reads of `review.md`, `review-mutations.md`, the task excerpt and `tests/sim/skills.test.mjs` exceeded the output limit. Read the obscured review sections and test imports separately; the relevant mutation IDs and affected functions were read directly. No absence claim depends on the truncated output.
- `rg -n 'D-64|D-182|D-184|D-185|D-187|D-188|D-189' foundations/invariants.md foundations/decisions.md` returned the existing decision headings and D-185/D-189 relationships, but no matching invariant source. Those positive decision hits controlled the search; no invariant wording was changed.

## Changed files

| File | Added | Removed |
|---|---:|---:|
| foundations/decisions.md | 6 | 6 |
| tests/sim/skills.test.mjs | 67 | 0 |

The ignored fix report is not part of the product commit. Return is before the independent fix review.
