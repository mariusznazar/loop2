# Slice 4 report

**Status:** done with concerns

**Commit:** `e8ab9cd53398b7f40f9f05bcca0ef07ac08f5d40` - `test: :recycle: preserve adversarial program checks for groups`

## Change

All nine assigned Python invariant drivers now construct their actual program inputs with `program_from_rules`. The helper still constructs the current flat representation. The new `program_rules` accessor returns the fixture's rule list directly for editing inputs; neither helper computes expected behavior or validates input. Malformed kinds, resources, coordinates, extra fields, empty lists and hostile values are preserved.

The independent world-reference checker now distinguishes exact structural locations: positive integer `nextGroupId` and `nextRuleId` at the root, positive integer `id` on a direct group or its direct rule, and a direct group's string `name`. It traverses condition/action content and unexpected containers. The existing stock-comparison number exception is limited to an actual direct rule/group condition. Both a handwritten grouped example and the existing handwritten flat controls remain checker inputs. They are not a second accepted production format.

The walk-feasibility checker now compares the exact chosen action and resource. When walking is impossible, it requires exploration only on an unrevealed tile under the program whose exploration condition always holds; otherwise it requires wandering. It no longer reads `ruleIndex`. Wrong resource, wrong exploration fallback, false exploration condition, waiting, missing walking and impossible walking controls remain or were added. All seed counts, traversal counts, stock-zero cases, isolation, randomness, refusal-positive and terrain-drawing assertions remain.

The handmade JavaScript mutation-control state in simulation-inputs remains a checker-only fixture and is labeled as such. Actual calls into the product use the shared Python builder.

Files changed (added / removed lines):

| File | Added | Removed |
|---|---:|---:|
| [program_fixture.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/program_fixture.py) | 5 | 0 |
| [test_program_closed_lists.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_program_closed_lists.py) | 7 | 6 |
| [test_program_world_reference.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_program_world_reference.py) | 106 | 39 |
| [test_restart_seed.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_restart_seed.py) | 5 | 4 |
| [test_simulation_inputs.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_simulation_inputs.py) | 6 | 5 |
| [test_simulation_isolation.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_simulation_isolation.py) | 3 | 2 |
| [test_simulation_randomness.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_simulation_randomness.py) | 4 | 3 |
| [test_terrain_drawing_numbers.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_terrain_drawing_numbers.py) | 3 | 2 |
| [test_walk_feasibility.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_walk_feasibility.py) | 48 | 25 |
| [test_walk_target.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_walk_target.py) | 4 | 3 |

## Checks

All test runs used the repository's required command, `npm test` (invoked as `npm.cmd test` from a Python subprocess on Windows). The subprocess captured stdout/stderr in full and propagated the real exit code. No focused or filtered tests were run.

| Command | Exit | Result |
|---|---:|---|
| `npm test` before implementing the checker changes | 1 | Node 318 passed; agent workflow 5 passed; deploy 64 passed in 521.636 s; invariants 161 tests in 648.902 s, with exactly two intended assertion failures and the baseline listener-enumeration error; quality 32 passed. No skips. Foundation check was not reached. Full [test-first log](slice-4-test-first.log) and [exit code](slice-4-test-first-exit-code.txt). |
| `python -B .the-way/elements/common/foundation_check.py` after the first gate | 0 | `0 errors`; separate because the gate stopped before foundation checking. |
| `npm test` after all source edits and formatting, first attempt | 1 | Node 318 and agent workflow 5 passed. Deploy ran 64 tests in 394.492 s with one failure: `ImageServesIcons.test_built_image_serves_every_icon_and_the_page`, because `docker build` could not open its locked desktop-linux context metadata file. Invariants ran 161 tests in 594.524 s with only the baseline listener error; both changed checkers and all assigned tests passed. Quality 32 passed in 57.926 s. No skips. Foundation checking was not reached. Full [Docker-lock attempt log](slice-4-test-docker-lock.log) and [exit code](slice-4-test-docker-lock-exit-code.txt). |
| `python -B .the-way/elements/common/foundation_check.py` after the Docker-lock attempt | 0 | `0 errors`; separate because the gate stopped before foundation checking. |
| `npm test` once more on the unchanged tree, as directed by the orchestrator | 1 | Node 318 passed, 0 skipped; agent workflow 5 passed; deploy 64 passed in 261.712 s; invariants 161 tests in 425.508 s with no assertion failures and only the baseline listener-enumeration error; quality 32 passed in 23.196 s. No Python skips. All assigned tests and all three Docker checks passed. The Docker file lock did not recur. The whole gate still failed and did not reach foundation checking. Full [final log](slice-4-test.log) and [exit code](slice-4-test-exit-code.txt). |
| `python -B .the-way/elements/common/foundation_check.py` after the final retry | 0 | `0 errors`; run separately because the final gate stopped before this check. |
| `git status --short` after commit | 0 | Empty output: the tracked working tree is clean. |
| `git show --format= --numstat HEAD` | 0 | Commit contains exactly the ten assigned files and the line counts above. |
| `git diff --check` | 0 | No whitespace errors. |
| `git diff --numstat` | 0 | Exactly the ten assigned files; 191 additions and 89 removals. |
| `rg -n 'ruleIndex' tests/invariants/test_walk_feasibility.py` | 1 (expected) | No positional selection checks remain in this driver. |
| The assigned-file scan below | 0 | Actual product programs use the builder. Remaining raw wrappers are the independent world-reference controls and the simulation-inputs checker-only mutation state. The output includes positive controls for both Python and JavaScript wrappers. |

The successful assigned-file scan was:

```powershell
rg -n 'rules.*:|ruleIndex' tests/invariants/test_program_closed_lists.py tests/invariants/test_program_world_reference.py tests/invariants/test_simulation_inputs.py tests/invariants/test_walk_target.py tests/invariants/test_restart_seed.py tests/invariants/test_simulation_isolation.py tests/invariants/test_simulation_randomness.py tests/invariants/test_walk_feasibility.py tests/invariants/test_terrain_drawing_numbers.py
```

An earlier command was:

```powershell
rg -n '"rules"\s*:|rules:|ruleIndex' tests/invariants/test_program_closed_lists.py tests/invariants/test_program_world_reference.py tests/invariants/test_simulation_inputs.py tests/invariants/test_walk_target.py tests/invariants/test_restart_seed.py tests/invariants/test_simulation_isolation.py tests/invariants/test_simulation_randomness.py tests/invariants/test_walk_feasibility.py tests/invariants/test_terrain_drawing_numbers.py
```

It returned exit 0 but showed only the JavaScript fixture, omitting known Python controls. That pattern was not reliable evidence for this invocation. It was not used as evidence of absence; the broader scan above replaced it.

The two test-first failures were actual assertion failures, not setup failures:

- `ProgramWorldReference.test_control_grouped_metadata_is_not_a_world_reference`: `assertEqual(naming(grouped), [])` failed with eight findings for legal root/group/rule ids and numbered group names.
- `WalkFeasibility.test_control_the_comparison_flags_breaks`: `assertTrue(findings(wrong_fallback, ...)[0])` failed because the old checker accepted exploration on a revealed tile when the fabricated record had a later `ruleIndex`.

The separate environment error was `test_loop2_one_serving_process.OneExpressProcessServesGameAndApi.setUpClass`: PowerShell `Get-NetTCPConnection -State Listen` returned no `MSFT_NetTCPConnection` objects. This matches the recorded base error; no unrelated test was changed to hide it. The cause of that environment behavior was not investigated in this slice.

Docker coverage must be reported per run. The test-first run had no skips and no Docker failures. In the first post-change run the deploy image check reached `docker build` but failed on a locked Docker context metadata file; that run does not establish that image-serving behavior passed. The two container invariants passed in that same run. The orchestrator instructed one full retry on the unchanged tree; its deploy suite and invariant suite reported no skips and no Docker failures, so all three container checks exercised their build/run/HTTP or listener assertions. This interpretation is grounded in the gate's unfiltered unittest discovery and the three test bodies/skip conditions listed below. Both post-change logs and exit codes are retained. No Docker configuration or test was changed and no further retry was made.

No production UI changed. A screenshot check is not applicable; the retained terrain test checks rendered DOM data in its existing harness, not visual appearance in a live browser. The foundation check inside a failed npm gate remains unchecked even if its separate invocation passes.

## Own-work check

The weakest requirement was allowing structural ids and group names without also hiding numeric world references. The handwritten grouped positive fixture does not use the builder. Fifteen independent negative edits cover action id, rule tile, action coordinates, numbered resource labels, action name, group coordinates, group-condition id, nested groups, root id, rule name, group next-id metadata, an unexpected metadata container, a structured group name, a structured rule id and a fake condition in an unexpected field. Existing flat negative controls and the real-product valid-program acceptance checks remain. A checker that rejects everything fails the positive fixture; a checker that globally ignores ids, names or numeric values fails the negative cases. Both post-change `npm test` runs exercised this requirement without a failure in the checker or its controls. Those commands still exited 1 for the environment failures listed above; this is passing evidence for the scoped checks, not a passing full gate.

The second risk was replacing a positional assertion with a weaker action check. Exact resource matching and the feasible fallback checks catch missing or wrong walking, impossible walking, exploration on a revealed tile, exploration despite a false condition and waiting despite an available fallback. The positive fabricated fallback on an unrevealed tile with a false exploration condition requires wandering. Existing minimum case counts and the zero-stock scenarios still prevent vacuous runs.

Own diff inspection found an overly broad staged replacement had changed three stock-zero literals to booleans while changing the checker's argument. Those three values were restored before the staged implementation was applied and before the final gate. The final diff leaves `holds_some` and both zero-stock mutation payloads unchanged. No test expectation was weakened to accommodate it.

## Expectations and choices

| Choice | Rejected alternative | Source and cost if wrong |
|---|---|---|
| A small input-only builder and direct rule accessor for all assigned product inputs. | Repeating flat wrappers or allowing two production formats. | Slice 4 and the copied plan choice. The helper is another test dependency, but cannot choose results or repair malformed values. Slice 5 must switch both helpers consistently. |
| Traverse explicit structural positions for grouped metadata; retain handwritten flat checker controls for this slice. | Ignore every field named `id`/`name`, or make the checker depend on the fixture builder. | D-90, task item 1 and planned stable positive identities. Overbroad exemptions would conceal world references; fifteen targeted corruptions and handwritten positives exercise that boundary. The checker must track the small structural contract. |
| Permit the stock-comparison value only in a direct rule/group condition. | Recognize a dictionary containing `kind: hereBelow` anywhere in the program. | Program-world-reference and D-26: an unexpected container must not hide coordinates/numbers. This makes the checker's accepted locations explicit and requires updating it if valid conditions gain another location. |
| Check selected action/resource plus the feasible exploration/wandering fallback. | Keep positional ruleIndex assertions or merely require any non-walking action. | Task item 2, D-23, D-25 and walk-feasibility. Rule order representation must not substitute for observable action correctness. The two explicit program cases remain checker parameters; their fallback expectations must change if their input rules change. |
| Preserve the handcrafted mutation state only inside the simulation-inputs checker controls. | Send it to the product or rewrite the mutation detector's controls to follow the grouped representation. | Explicit Slice 4 boundary. Keeping it isolated avoids coupling a generic mutation detector to the program model; the comment makes that boundary visible. |

Changed invariant interpretations: program-world-reference now excludes planned structural program metadata from world references and confines stock values to genuine condition locations; walk-feasibility uses the selected action and its feasible fallback rather than a rule's position. The other seven invariant drivers change only input construction, preserving their expectations.

No structural mismatch, additional product scope or unresolved implementation question was found. No production code, assets, dependency lockfile, server or deployment behavior changed. This report stops before Slice 5 and the return step.

## Reads beyond the dispatch selection

- [package.json](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/package.json) and [run_tests.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/.the-way/gate/run_tests.py): command ordering, directory discovery, output buffering and why the foundation check is not reached after failed Python tests.
- [loop2_invariant_support.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/loop2_invariant_support.py): targeted support/runner sections to understand temporary builds and product-driver execution.
- [Slice 3 report](slice-3-report.md) and [Slice 3 test log](slice-3-test.log): earlier migration conventions, baseline error and gate durations. The orchestrator also supplied measured durations from Slices 1-3.
- [ruff.toml](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/ruff.toml) and [test_quality_invariants.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/quality/test_quality_invariants.py): configured Python checks and how the full gate invokes them.
- [deploy_script_support.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/deploy/deploy_script_support.py): targeted runner section while assessing the longer deploy phase; no process polling or runner changes.
- [test_loop2_image_icons.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/deploy/test_loop2_image_icons.py), [test_loop2_container_icons.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_loop2_container_icons.py) and [test_loop2_one_serving_process_container.py](https://github.com/mariusznazar/loop2/blob/f9b76ff703f09079fbddf86d3e40582484a06a01/tests/invariants/test_loop2_one_serving_process_container.py): test bodies and skip conditions to distinguish actual Docker execution from the base run's old skips.
- [Code review playbook](<C:/Storage/The Brain/The Brain/Notes/Areas/(A) Claude code/playbook_code_review.md>) and [Obsidian rulebook](<C:/Storage/The Brain/The Brain/Notes/Resources/(R) Obsidian/obsidian_rulebook.md>): user-required reading before own diff inspection and reading the vault-hosted playbook. No vault file was changed.
