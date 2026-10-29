PASS 23daea55f5984d99bacfeadb6681b44eb6705fb1

# Independent review of the return-step correction

Range: `ab2e8d3552d6be4c7cd8b387e779de1c0f4d2e88..23daea55f5984d99bacfeadb6681b44eb6705fb1`. Worktree: `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu`. The reviewer authored none of this change. The gitlink and process checkout both identify `3aee7d958835cc19b95519f4d21b37538b78e3e1`. HEAD matched the assigned head at the beginning and end.

No Critical or Important finding, no new Minor finding, no out-of-scope finding. The three affected suites independently pass: 4 + 6 + 3 tests. This verdict covers this return range, not a new full-gate result. The existing Minor M1 from report 35 remains outside this diff and remains recorded there; this review neither fixes nor withdraws it.

## Findings

- Critical: none.
- Important: none.
- Minor introduced by this range: none.
- Out-of-scope findings: none.

## What the correction protects

The actual diff is one commit and exactly three Python invariant tests, +15/-5. It changes no application source, foundation sentence, guideline, dependency, expected-failure flag or skip. It expands independent literal expectations instead of replacing them with values calculated from the production data.

1. [test_content_identifiers.py:50](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/invariants/test_content_identifiers.py#L50) adds `forestDeep` and `Las — głębiej`. The name follows frozen task To do 1 and the identifier is the selected implementation identifier in the actual map data. The existing scanner visits both the identifier and name of every entry. Its positive and negative controls now also visit this entry, including code/string/template uses versus comments and longer tokens. The tripwire still compares live data with the independent written domain and rejects omitted or renamed entries.

2. [test_map_run_tiles.py:68](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/invariants/test_map_run_tiles.py#L68) writes the four deeper-map resource stocks explicitly: stick 12, berry 8, moss 6, fiber 6. These are the accepted values in task To do 1, independently matched against `data/maps.ts`. At [test_map_run_tiles.py:99](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/invariants/test_map_run_tiles.py#L99), preparing `solvedMaps: ['forest']` makes the deeper-map send legal under D-149. It does not replace the public `send`, `restart` or `end` operations. Following `send` through `startRun`, `newMapRun` and `drawLayout` confirms that solved maps only control availability; they are not an input to generated tiles. The helper supplying all knowledge does not itself unlock maps. Each map is checked over 15 real-time inputs and three starts per input, with a nonempty-tile assertion and exact start counts. Both resource presence and absence must occur; stock and off-list comparisons remain intact. Preparing a solved first map for the original forest cases also remains legal.

3. [test_program_closed_lists.py:63](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/invariants/test_program_closed_lists.py#L63) adds the two health condition kinds and three combat action kinds. The source meanings are task To do 5, D-143/D-144/D-151 and their corresponding data entries. The valid rule program actually contains each new kind, and the valid group list contains both new health conditions with independent valid values 50 and 10. Nine groups have IDs 1–9, so `nextGroupId: 10` is correct. Both programs pass through actual `setProgram` in HQ and during a run. Reading the parser confirms that group conditions and rule conditions reach the same checked condition parser, while rule actions reach the checked action parser. The test compares the entire accepted program with its input, so silently removing a new kind or refusing all programs cannot satisfy the positive control. Unknown-kind offers, inherited-property names, wrong types and missing kinds still exercise refusal. The equality tripwire still detects additions and removals, rather than merely checking inclusion.

Changed invariant protection: `content-identifiers`, `map-run-tiles`, `program-closed-lists`. Their sentences, derivations and `Violated: no` marks remain unchanged. The changes extend their existing methods to the task's accepted vocabulary/map; no newly observed behavior is promoted to a new invariant. The current part map explicitly assigns these three test paths to simulation. Its existing patterns also cover the task's new simulation and view files, agreeing with the return report's claim that no map change is needed.

## Strongest weak-point check and mutation assessment

The likeliest false success would be making a list comparison green while continuing to test only the original map or refusing the newly accepted program kinds. I followed each written domain into the executed driver and the assertions, then independently ran all three files. The deeper map participates in the same 45-start checks as the original map; the valid program and group controls offer the new kinds to the real parser and compare the returned program exactly.

The existing executable controls deliberately supply scanner violations, omitted/renamed entries, wrong resource stocks, off-list resources, accepted invalid programs and refused valid programs. They passed independently, proving that those comparisons reject their explicit broken results. Manual fault assessment also shows: removing `forestDeep` from a written list fails its tripwire; removing the legal prerequisite makes the actual public send throw before a result can be accepted; reverting one new parser case causes the valid-program equality control to fail. The latter parser faults were reasoned from the actual call chain, not independently injected.

No new Stryker campaign was run: this range changes only Python expectation/input lists, which the configured StrykerJS runner does not execute or mutate. There is no changed TypeScript simulation source to select. This is not reported as a mutation-tool pass. The earlier whole-change and fix mutation campaigns remain the evidence of reports 31 and 35. Their results are not claimed as new executions here.

The author's red logs were inspected: all three fail at the intended stale-domain assertion, not at build/import setup. The content log has a mangled non-ASCII rendering; the UTF-8 source literal and successful independent scanner run establish the actual name. These are author red executions, not independent reviewer red executions. The independent green checks and retained explicit negative controls substantiate the bounded correction.

## Independent checks

All commands ran in the assigned worktree. Test commands were piped through `Tee-Object` to the named logs, with `exit $LASTEXITCODE`; PowerShell's NativeCommandError presentation of unittest stderr did not change the captured successful process exits.

| Command | Exit / result |
|---|---|
| `git rev-parse HEAD` | 0; assigned head, rechecked after review. |
| `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD` | 0 each; matching recorded pin. |
| `git log --oneline ab2e8d3552d6be4c7cd8b387e779de1c0f4d2e88..23daea55f5984d99bacfeadb6681b44eb6705fb1` | 0; one return commit. |
| `git diff ab2e8d3552d6be4c7cd8b387e779de1c0f4d2e88..23daea55f5984d99bacfeadb6681b44eb6705fb1`; same range with `--numstat` | 0; exactly three files, +15/-5. |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0; 4 passed. Log `43-content_identifiers.log`. |
| `npm test -- tests/invariants/test_map_run_tiles.py` | 0; 6 passed. Log `43-map_run_tiles.log`. |
| `npm test -- tests/invariants/test_program_closed_lists.py` | 0; 3 passed. Log `43-program_closed_lists.log`. |
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa tests/invariants/test_content_identifiers.py tests/invariants/test_map_run_tiles.py tests/invariants/test_program_closed_lists.py` | 0; all checks passed. |
| `git diff --check ab2e8d3552d6be4c7cd8b387e779de1c0f4d2e88..23daea55f5984d99bacfeadb6681b44eb6705fb1` | 0. |
| `git status --porcelain=v1` | 0, empty; no tracked edit made by this reviewer. |

## Reading, reaches and limits

Read the dispatch, pinned review method and shared reading procedures, repository instructions, global review playbook, coding/testing guidelines, complete frozen task/spec, plan Foundation entries/Coverage, foundation report and return handoff/report. Read the three changed tests whole, their shared fixture, selected foundation entries and product/process glossary. Read report 35 and the relevant report 31 findings as preceding review evidence; they do not replace review of the current diff. The return author's broader comparison was checked against its mapped source rows and the actual affected domain/availability/validation paths. No current disputed foundation wording or newly required entry was found in this correction.

Selective reaches: D-22/D-23 and D-94/D-95 for linked layout/closed-list meanings and the mutation boundary; `game.ts` validation and public send/start paths, `run.ts` new-run construction, `layout.ts` generation, and the temporary-copy/build portions of `loop2_invariant_support.py` to verify that prepared knowledge/availability and real builds do not supply the expected result. An initial attempted read of `src/browser/sim/map.ts` found no file; searching the actual run imports located `layout.ts`, which was read. No absence conclusion depended on that guessed path. No external source was needed beyond the frozen accepted task supplied by the cycle.

Full `npm test`, standalone foundation check, unaffected gameplay tests, browser execution, Docker checks and seed measurement were not rerun. The orchestrator owns the final gate. The previously reported serving-process setup error, Docker skips, browser evidence limits, M1 and 0/20 measurement are not changed or converted into passes by this review. No product edit, commit, push, request or merge was made. The review did not read `cycle.md` or delegate work.

## Declined to judge

None. This review is bounded to the return-step commit and its directly affected contracts; it does not reopen the already reviewed preceding implementation.
