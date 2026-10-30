PASS 2ce1616a0502949bce585f909e3be4b226d61430

## Result and boundary

Independent review of `a9f2930195d0637a330d224cc046362e0a1cd1c7..2ce1616a0502949bce585f909e3be4b226d61430`. Blocking: 0. Minor: 0. Out of scope: 0. Findings: none.

HEAD matched the dispatch. The gitlink and process checkout both equal `a8dfe8ac62885e88bc8f463e93ab16b621d48e92`. The complete independently computed diff contains one test file, two additions and one deletion. No foundation sentence, violation marker, surface, part assignment, production function or UI changes in this range. Earlier R4/R5 remain as recorded by the whole-change review; this review introduces no new grade for them and does not claim to resolve them.

## Correction assessed

The handwritten action catalog at [test_program_closed_lists.py:70](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/tests/invariants/test_program_closed_lists.py#L70) adds `patrol`. Its expected value comes from the frozen task's To do 6, Q3/Q9 and accepted settlement 5, which introduce Obchód, supported by D-185 and the action catalog's explicit `patrol` entry. The second gate's preserved failure is exactly the resulting catalog mismatch. This is a requirement-backed correction of an obsolete expectation.

The added explicit valid rule at [test_program_closed_lists.py:95](https://github.com/mariusznazar/loop2/blob/2ce1616a0502949bce585f909e3be4b226d61430/tests/invariants/test_program_closed_lists.py#L95) extends the control program to contain the new kind with a berry resource. The whole test still compares the returned program to independently written `VALID` in headquarters and during a run. It reads production catalog keys only for the independent-catalog tripwire; it does not use those keys to construct the expected catalog or program. That distinction is preserved.

All existing unlisted kinds, plausible-field variants, group-condition checks, exact acceptance comparison, refusal checks and comparison/tripwire controls remain unchanged. A blanket refusal would fail the valid-program control. Accepting an unlisted kind would still fail the refusal checks. Omitting patrol from the production action catalog would fail the tripwire; refusing patrol at `checkAction` would fail the acceptance control. Thus the change does not suppress the failure by weakening the checks.

Accepting a program containing patrol before a character can execute it is consistent with D-126, which requires unavailable rules to remain stored and be skipped. The actual `setProgram` caller delegates to `checkProgram`; `checkAction` accepts patrol with a validated resource, whereas `actionFeasible` separately requires branch availability. The test checks storage, not execution or branch ownership, exactly as its documented scope says.

The changed invariant test is `tests/invariants/test_program_closed_lists.py`, citing `program-closed-lists`. Its source sentence remains correct and marked `Violated: no`. The author's weakest-point check correctly identified that updating only the tuple would omit patrol from the acceptance control; the second added line closes that gap. No further foundation correction is needed for these two test-data changes.

## Declined to judge

None. The review is bounded to the dispatched return-step commit; prior feature implementation and its reviews are context, not a reopened whole-change review.

## Checks

Commands ran from `C:/Storage/repos/loop2-wt/wprawa-i-drzewa`.

| Command | Exit | Result |
|---|---:|---|
| `git ls-files --stage -- .the-way` | 0 | Expected process gitlink. |
| `git -C .the-way rev-parse HEAD` | 0 | Same pinned checkout. |
| `git rev-parse HEAD` | 0 | Dispatched head, confirmed again after inspection. |
| `git log --oneline a9f2930195d0637a330d224cc046362e0a1cd1c7..2ce1616a0502949bce585f909e3be4b226d61430` | 0 | One correction commit. |
| `git diff a9f2930195d0637a330d224cc046362e0a1cd1c7 2ce1616a0502949bce585f909e3be4b226d61430 --` | 0 | Complete one-file diff inspected. |
| `npm test -- tests/invariants/test_program_closed_lists.py` | 0 | 3 passed, no skips, 3.018 seconds. |
| `git diff --check a9f2930195d0637a330d224cc046362e0a1cd1c7..2ce1616a0502949bce585f909e3be4b226d61430` | 0 | No whitespace errors. |
| `git status --short` | 0 | Clean tracked tree before writing this ignored report. |

No review test failed or was skipped. The full gate was deliberately not repeated: the orchestrator owns the full run after target reconciliation. The base gate remains failed (one invariant failure and five skipped tests); this focused pass does not relabel it. Foundation check, quality suite, mutation analysis and browser checks were not independently repeated in this review. There are no production or UI changes here, and Python test data is not a Stryker mutation target. The author's independent quality/foundation results remain attributed evidence, not my own runs.

## Reading and reaches

Read the project review skill and its pinned method whole; repository and browser AGENTS, coding and testing guidelines, process and product glossaries, the full changed test, complete return report and complete diff. Read the frozen task's accepted patrol paragraphs, Q3/Q9/Q13 and all accepted settlement rows; the original gate-2 failure and summary; selected original author/whole-review, fix-review and gate-review passages establishing the preceding review boundary. Read the simulation part entry, `program-closed-lists` and its linked D-23, plus D-73 and D-183 whole. No `cycle.md` was read.

Additional selective reaches: D-126 and D-185 whole to distinguish accepting a known action in a program from permission to execute the branch, and to establish the accepted patrol meaning; `src/browser/sim/data/actions.ts:60`, `game.ts:197`, `program.ts:206` and `programs.ts:129-235` to follow the actual data, caller, validation and execution boundary. These reads remain inside simulation; no new trust boundary or irreversible operation emerged. The user code-review playbook was also read whole for reporting conventions.

## Searches not found or unclear

- Two combined reads exceeded the output budget. The testing guideline's omitted portion, both glossaries, the complete changed test, return report and selected foundation entries were reread in smaller outputs. No conclusion relies on truncated material.
- `rg -n 'checkProgram|checkAction|ACTIONS|hasOwn' src/browser/sim/program*.ts` used a literal Windows wildcard path and returned an IO error, not an absence result. The corrected `rg -n 'checkProgram|checkAction|ACTIONS|hasOwn' src/browser/sim -g 'program*.ts'` found the relevant functions; their complete relevant bodies were then read.
