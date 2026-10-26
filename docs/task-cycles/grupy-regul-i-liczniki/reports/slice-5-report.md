# Slice 5 report

**Status:** done with concerns

## Change

Added `ruleActivity(action)` to `tests/sim/program-fixture.mjs`, returning the current rule activity shape with `ruleIndex: 0` and the exact action object supplied. Migrated the four manual activity fixtures in campfire, gather, world renewal, and status row. The timing and all other state fields, comments, and assertions are unchanged. In particular, the campfire, gathering, and world fixtures still model an action already in progress while the current program is empty; the helper does not select or validate a rule.

The current `Activity` type in `src/browser/sim/types.ts` confirms this input shape. The action-in-progress decision permits the supplied action to continue after program edits.

## Files and commit

| File | Added | Removed |
|---|---:|---:|
| `tests/sim/program-fixture.mjs` | 4 | 0 |
| `tests/sim/campfire.test.mjs` | 2 | 2 |
| `tests/sim/gather.test.mjs` | 2 | 2 |
| `tests/sim/world.test.mjs` | 2 | 2 |
| `tests/view/status-row.test.mjs` | 2 | 2 |

Commit: `3399e5c test: :recycle: share rule activity fixtures`

## Checks

- `rg -n 'ruleIndex|ruleActivity' tests/sim/program-fixture.mjs tests/sim/campfire.test.mjs tests/sim/gather.test.mjs tests/sim/world.test.mjs tests/view/status-row.test.mjs` — exit 0. The sole `ruleIndex` occurrence is in `ruleActivity`; each of the four consumers calls it.
- `git diff --check` — exit 0.
- `npm test` — exit 1. Build and all 318 Node tests passed. Python `tests/agent_workflow` passed 5 tests, `tests/deploy` passed 64, and `tests/quality` passed 32. `tests/invariants` ran 161 tests and had one setup error in `test_loop2_one_serving_process.OneExpressProcessServesGameAndApi.setUpClass`: PowerShell `Get-NetTCPConnection -State Listen` found no listening connections. The process runner totals 262 Python tests across four directories and reports only `tests/invariants` failed. This matches the pre-existing environment failure described in the handoff. The gate stopped before its chained foundation check.
  - Full output: `.runs/task-cycles/grupy-regul-i-liczniki/reports/slice-5-test.log`
  - Recorded exit code: `.runs/task-cycles/grupy-regul-i-liczniki/reports/slice-5-test.exit-code` (`1`)
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, run separately because `npm test` stopped before it. Output: `.runs/task-cycles/grupy-regul-i-liczniki/reports/slice-5-foundation.log`; recorded exit code: `.runs/task-cycles/grupy-regul-i-liczniki/reports/slice-5-foundation.exit-code`.
- `git status --short` — exit 0, empty output: worktree clean after the commit.
- `git rev-parse HEAD` — exit 0, `3399e5c69a9a445f4a097a6b2df60ac5937d4694`.
- `git ls-files --stage -- .the-way` — exit 0, gitlink `2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c`.
- `git -C .the-way rev-parse HEAD` — exit 0, `2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c`, matching the gitlink.
- `git diff --check` — exit 0 after commit.

The Node report says `skipped 0`. None of the four Python directory summaries reports skipped tests either: deploy and quality end in `OK`, invariants ends in `FAILED (errors=1)`, and the runner's total is 262 tests. Docker was available for this run. All three Docker checks ran and passed: the deploy image serves the page and icons, the container serves the icon files, and the container has one serving Node process. Their existing skip branches only skip the Docker-backed check when `docker_answers()` is false; this run has no such skips. The one invariant setup error was in the separate host-process check (`test_loop2_one_serving_process`), not the container check. This is consistent with the per-run interpretation and unchanged skip conditions in the Slice 4 report. The complete current-run evidence is in `slice-5-test.log`; the earlier Docker context-lock failure described in the Slice 4 report did not recur here.

## Own-work check

Most likely failure: a migrated fixture could accidentally change the action or the timing/state of the running activity, or leave one manual `ruleIndex` outside the shared constructor. The rg check above confirms all four consumers use the constructor and the only remaining identity field is in the constructor. `npm test` executed all four consumers as part of its 318 passing Node tests, preserving the source-backed action completion, gathering, renewal, and display assertions. The one Python environment error does not affect those checks.

## Reads beyond the slice selection

- Read `src/browser/sim/types.ts`, `src/browser/sim/run.ts`, and `src/browser/view/status-row.ts` to compare the constructor with the current activity type and understand the active-action lifecycle and view consumer.
- Read `package.json` and `.the-way/gate/run_tests.py` to interpret the repository test command and its directory-level results.
- Read the Obsidian rulebook before reading the requested code-review playbook, as required by the supplied global instructions. The playbook was read before inspecting the diff.
- `git rev-parse HEAD` at dispatch — exit 0, slice base `e8ab9cd53398b7f40f9f05bcca0ef07ac08f5d40`.
- `git ls-files --stage -- .the-way` at dispatch — exit 0, gitlink `2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c`; `git -C .the-way rev-parse HEAD` — exit 0, same commit.

## Choices

- Added one small constructor to the existing fixture module and kept the setup fields at call sites. Rejected retaining four copies of the activity shape or adding a second abstraction layer; either would leave duplicated setup or widen this input-only change. The constructor preserves the current first-rule reference and does not infer a rule from the program.
- Did not add a failing-first test: this helper only preserves existing test input shape, as the slice specifies. Existing scenario assertions and their full Node execution verify the migrated setups.
- No plan adaptation or invariant-test expectation changed.
