# Correction of invariant fixtures after the full gate

## Status and commit

**Status:** done. Return before fresh independent review.

- Base: `86157c1e86ed7ea4555cd7e3d468fb682e40edbf`.
- Correction: `a9f2930195d0637a330d224cc046362e0a1cd1c7` — `fix: :white_check_mark: retain skill trees in invariant fixtures`.
- Worktree: `C:/Storage/repos/loop2-wt/wprawa-i-drzewa`, branch `task/wprawa-i-drzewa`.
- Pinned process checkout and gitlink both: `a8dfe8ac62885e88bc8f463e93ab16b621d48e92`.
- Working tree clean after commit. R4 and R5 remain Minor and were not changed.

## Cause, evidence and correction

The orchestrator's `npm test` at the base exited 1. Its original evidence remains unchanged in `.runs/task-cycles/wprawa-i-drzewa/gate.log` and `reports/gate-failures.md`: Node 807 passed; Python workflow 5 passed; deployment 66 run with 3 skips; invariants 204 run with 349 failure instances and 2 skips; quality 40 passed. The final foundation stage was not reached.

`Understanding` now includes `trees`, and `repertoireOf` filters that list for the character's predispositions. `KNOWING_GAME_JS` in `tests/invariants/program_fixture.py` replaced the new game's understanding with the old four-field shape. Sending a character from this fixture therefore reached `understanding.trees.filter` with `trees` undefined. The first focused action-in-progress run reproduced that exact stack in both tests.

The helper now imports the skill catalog and sets `trees: Object.keys(SKILLS)`, alongside its existing catalog-derived actions, conditions, items and creatures. Its comment names the full input. These identifiers construct inputs; they do not calculate any expected result.

A search for further construction of `understanding` under `tests/invariants` found a second loss of the field in the local driver of `test_program_rule_pick.py`: after calling the shared helper, it rebuilt the object while removing selected actions, items or conditions. That file still failed with 11 failure instances across 8 test methods after the shared helper was fixed. It now spreads the fixture's understanding before overriding those deliberately filtered lists. The same command then passed all 8 tests. This retains the existing missing-action, missing-item and missing-condition controls and all assertions.

The original log's failure families were inspected rather than treating every error-like line as an independent product defect:

- 340 driver-exit assertions contain the undefined `filter` stack.
- The character-team assertions report that same failed send, followed by restart/end with no map run.
- The isolation assertion wraps failed sends with that same error; its focused rerun now passes.
- Three randomness assertions wrap the same send error.
- The three empty movement-coverage assertions (directions, walk feasibility and walk target) follow driver failures before their counters can collect runs.
- The two `Error: Session cannot be replaced` lines occur during the successful Node account test about blocking an account while its message is in flight; they are not failed test results. The nearby test has a success marker and the Node stage passed.

No second substantive product defect was established by these traces. The full gate still needs to establish the result for all affected consumers after review; these focused results do not claim that all 349 failure instances have been rerun.

## Exact checks

All commands ran from the worktree root. Each focused test command uses the repository's entry point and exactly one test file. The Python invariant checks build and exercise the simulation in their own temporary copies.

| Command | Exit | Result |
|---|---:|---|
| `git ls-files --stage -- .the-way` | 0 | Gitlink matches the pinned commit above. |
| `git -C .the-way rev-parse HEAD` | 0 | Checkout matches that gitlink. |
| `npm test -- tests/invariants/test_action_in_progress.py` | 1 | Before either fixture change: 2 tests, 2 failures at the missing `trees.filter`. |
| `npm test -- tests/invariants/test_action_in_progress.py` | 0 | After the shared helper correction: 2 passed. |
| `npm test -- tests/invariants/test_player_map_run_pace.py` | 0 | Corrected shared helper: 9 passed, including the control that known discoveries do not stop the run. |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 | Corrected shared helper: 5 passed, including execution with language globals alone. |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | After the shared helper correction: 5 passed. |
| `npm test -- tests/invariants/test_program_rule_pick.py` | 1 | Shared helper fixed but local driver still dropping `trees`: 8 tests, 11 failure instances at `trees.filter`. |
| `npm test -- tests/invariants/test_program_rule_pick.py` | 0 | After the local driver correction: 8 passed. |
| `npm test -- tests/invariants/test_player_map_run_pace.py *> .runs/task-cycles/wprawa-i-drzewa/reports/gate-correction-empty-trees.log; $checkExit = $LASTEXITCODE; Get-Content -Encoding UTF8 -LiteralPath '.runs/task-cycles/wprawa-i-drzewa/reports/gate-correction-empty-trees.log' -Tail 24; exit $checkExit` | 0 | Deliberate temporary fixture variant `trees: []`: 9 passed. See the evidence limitation below. |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | After restoring `trees: Object.keys(SKILLS)`, with both final file changes present: 5 passed. |
| `git diff --check; git diff --stat; git status --short` | 0 | No whitespace errors; only the two intended files. |
| `git diff --check; git diff -- tests/invariants/program_fixture.py tests/invariants/test_program_rule_pick.py; git status --short` | 0 | Final diff confirms full catalog restored, local preservation added, no assertion or production change. |
| `git add tests/invariants/program_fixture.py tests/invariants/test_program_rule_pick.py; git commit -m "fix: :white_check_mark: retain skill trees in invariant fixtures"; git rev-parse HEAD; git status --short` | 0 | Commit above; clean working tree. |

The failed focused runs demonstrate stale fixture setup, not a deliberate violation of the underlying gameplay invariants. No new invariant assertion was added, and no existing assertion was weakened. The final fixture is the same one used by the passing action, pace and isolation runs; the temporary empty-tree variant was restored exactly before commit.

No full `npm test` was run by the author: the orchestrator owns it after independent review. No standalone foundation check was run in this correction because no foundation entry changed; the failed full gate's foundation stage remains unchecked. Node/UI suites were not repeated because production code and UI behavior did not change. Stryker was not run: there is no production simulation change in this correction.

## Weakest-point check and limits

The likely incomplete correction was fixing only the shared helper while a consumer discarded the new field again. Searching constructions of `understanding` found the local program-rule driver, and its focused failure after the shared fix plus success after preserving the object demonstrates that second required change.

Another possible mistake was providing an empty list merely to avoid the exception. I temporarily replaced the new full catalog with `trees: []` and ran the pace check. It still passed all 9 tests. This is **not** evidence that the pace test checks completeness of known trees. The relevant discovery code computes newly revealed trees from newly revealed actions; this fixture already knows all actions, so empty trees need not cause a new discovery pause. The catalog mapping was restored, and the final diff was inspected directly. The fixture's completeness rests on that explicit catalog-to-input mapping; no additional permanent test was added solely to assert data copying, consistent with testing guidelines' deliberate exclusion of trivial copying without its own rule.

The representative behavior checks now reach their existing assertions. Their independent minute, duration and rule-choice expectations remain unchanged. No fallback was added to production code to accept malformed fixture states.

## Reading, reach, choices and concerns

- Used the project `the-way-make-change` and its pinned whole-change method for this narrow resumed implementation. The frozen task and its accepted discovery behavior remain the authority; no new game choice was introduced.
- Read both changed files whole before editing. Expanded the original author's reach to the Python invariant fixture and the local program-rule driver, both claimed by the `simulation` entry in `foundations/part_map.md`. That entry also claims the action, pace and isolation checks selected here. It has no trust boundary. No irreversible operational action is involved.
- Read `guidelines/coding.md` and `guidelines/testing.md` completely, with smaller reads after combined output truncated. The kind table has no separate Python test/support-code guide; coding.md delegates test shapes to testing.md and defers Python formatting. Read `coding-simulation-module.md` to check its boundary: it applies to production modules in `src/browser/sim/`, not this Python support file. General Python quality rules still apply and their check passed.
- Selected and read `action-in-progress`, `player-map-run-pace`, `simulation-isolation`, `program-rule-pick` and `ruff-source-rules`, and the relevant linked decisions D-04, D-20, D-21, D-23, D-30, D-118, D-122, D-126, D-127 and D-140. D-73 grounds the test method; D-183 grounds tree discovery, and D-164 describes the held-program fixture left unchanged. The original task reading from the author stage remains in force.
- Reached `Understanding`'s declaration, the `SKILLS` catalog, `repertoireOf` and tree-discovery calculation to check the missing field, correct catalog and empty-list experiment. These are read-only reaches.
- Chose the catalog's keys rather than a handwritten list, so new trees remain known in this full-knowledge fixture. A handwritten list would become stale on the next content addition. Chose preservation of the rest of the local understanding object rather than another duplicated field list, because that local driver only intends to remove the lists its scenario names. If a future case needs a missing tree, its input should name and remove that tree explicitly.
- No question remains. R4/R5 stay Minor. All original full-gate failures remain documented; no log was overwritten or represented as a pass.

## Searches not found or unclear

- Initial searches for decision headings with `^## D-...` returned no matches because this file uses `###`. A broader search for the actual decision identifiers found the headings; whole entries were then read. No conclusion about missing decisions was drawn from the first pattern.
- Some combined reads exceeded the output limit, especially the repetitive failure-header list and the long Ruff environment source quotation. The complete distinct-method list and grouped original-log exception families were inspected, with direct surrounding traces for wrapped errors, movement counters and the two Node log messages. Required guideline contents and the obscured changed-test sections were read in smaller chunks. No absence claim relies on truncated output.
- No separate Python test/support-code kind is listed in coding.md; its explicit delegation to testing.md is used, rather than inventing a new guide or applying the production-module kind to test support.

## Changed files

| File | Added | Removed |
|---|---:|---:|
| `tests/invariants/program_fixture.py` | 4 | 2 |
| `tests/invariants/test_program_rule_pick.py` | 1 | 0 |

This ignored report and the empty-tree experiment log are not part of the product commit.
