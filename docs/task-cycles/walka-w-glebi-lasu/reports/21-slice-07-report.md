# Slice 7 report

Status: done with concerns.

Worktree: `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu`. Branch: `task/walka-w-glebi-lasu`. Base: `471597bbe8defb909ed0fff2baeb6de2baa70902`. Head/commit: `b960201d82830ce72767fbd6f1b5f2bb9b2ac4a9` (`test: :test_tube: cover successful combat input purity`). No product code changed.

## Change

| Path | Added | Removed |
|---|---:|---:|
| `tests/invariants/test_simulation_inputs.py` | 29 | 3 |

The purity invariant now requires successful frozen-input calls to `resolveCombat`, `chooseCombatRule` and `finishMinute`; it also explicitly fails if a proposed call throws. The missing successful call was confirmed red before restoring the calls: `npm test -- tests/invariants/test_simulation_inputs.py`, exit 1, failed because `program.js chooseCombatRule was never called`. After adding the calls and success assertions, the same command passed, exit 0 (2 tests).

The planned behavior checks already existed in `tests/sim/encounters.test.mjs` (20 cases, including interruption, M+5, discovery, restart, split advancement and rule counts), `tests/sim/program-counts.test.mjs`, and the existing invariant suites. I kept those authored checks intact and added only the missing successful immutable-input coverage. This is the adaptation from the plan's broader list of files; the cost is that the Python invariant descriptions and scenario generators still describe their previous noncombat scenarios. The plan's checks were all run below.

## Checks

| Command | Exit | Result |
|---|---:|---|
| `npm test -- tests/invariants/test_simulation_inputs.py` (red, successful combat calls temporarily absent) | 1 | Failed on the missing `chooseCombatRule` call, as intended. |
| `npm test -- tests/invariants/test_simulation_inputs.py` (after restoration) | 0 | 2 passed; each named function had a successful frozen-input call. |
| `npm test -- tests/invariants/test_action_in_progress.py` | 0 | 2 passed. |
| `npm test -- tests/invariants/test_program_rule_pick.py` | 0 | 8 passed. |
| `npm test -- tests/invariants/test_minute_span_split.py` | 0 | 9 passed. |
| `npm test -- tests/invariants/test_map_run_repeatability.py` | 0 | 3 passed. |
| `npm test -- tests/invariants/test_restart_seed.py` | 0 | 2 passed. |
| `npm test -- tests/invariants/test_streak_program_change.py` | 0 | 4 passed. |
| `npm test -- tests/sim/purity.test.mjs` | 0 | 3 passed. |
| `npm test -- tests/sim/program-counts.test.mjs` | 0 | 11 passed. |
| `npm test -- tests/sim/encounters.test.mjs` | 0 | 20 passed. |
| `npm test -- tests/sim/acceptance.test.mjs` | 0 | 5 passed; Las acceptance behavior remains. |
| `node .runs/task-cycles/walka-w-glebi-lasu/reports/measurement.mjs` | 0 | 20 actual `newMapRun` seeds measured through minute 5000 or an ending state. |
| `python -B .runs/task-cycles/walka-w-glebi-lasu/reports/check_foundation_scope.py` | 0 | Projected map/combat binding and solving wording check passed. |
| `& .runs/quality-venv/Scripts/ruff.exe check tests/invariants/test_simulation_inputs.py` | 0 | Ruff passed. |
| `git diff --check` | 0 | No whitespace errors. |

No full `npm test` gate or mutation run was performed; the handoff explicitly excludes both. The focused tests build Node tests as required. Browser evidence is outside this slice. The measurement outcomes are written without a success threshold: 0/20 completed. Eleven runs died with no defeated attacks, eight with one, and one with two. All had zero new discoveries or resumes because the prescribed preparation starts with the knowledge revealed by Las and the first wolf. The loss of health and streak is reported as measured; balance was not tuned.

The complete actual program and per-seed minute, streak, defeated-attack, result, discovery and resume counts are in the ignored artifacts `measurement-20-seeds.md` and `measurement-20-seeds.json`; the executable is `measurement.mjs`. Preparation used minute zero, standard body, empty backpack, real map data, full post-wolf knowledge, the forest prerequisite solved, combat group first (stick strike then kick), then the 17 rules and thresholds of the baseline `ACCEPTANCE_PROGRAM`. The baseline program was transcribed from the named acceptance source and checked against its existing passing acceptance test. The public run seed itself was 1 through 20; no `send` timestamp was treated as the seed.

## Own-work check and choices

Most likely requirement to miss: a new public combat operation might only be called with invalid pooled input, so the existing mutation checker would never exercise its successful immutable-input path. The check was the new explicit successful-call assertions in `test_simulation_inputs.py`; all three calls completed, no argument snapshot changed, and the invariant passed.

I chose to preserve the exact prescribed 17-rule program and fixed 20 seeds. An alternative would be adding a survival rule or changing combat priority after the 0/20 measurement. That would make a different experiment and hide the observed result; the cost of preserving the result is that this test program frequently dies before the map requirements are reached.

No reaches beyond the dispatch altered what the slice means. The named project coding and testing guidelines, simulation-module guideline, source files, invariant fixtures, and mapped foundation entries were read. No unanswered design choice remains.
