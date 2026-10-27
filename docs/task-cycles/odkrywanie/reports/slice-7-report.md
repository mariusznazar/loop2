# Slice 7 report

**Status:** done

Commit: 76c2faa "test: start the third group of invariant tests from a game that knows everything"

## Files changed (tests/invariants/)
- test_simulation_inputs.py: DRIVER = KNOWING_GAME_JS + ...; scenario now keeps `newGame` and its `setProgram` state, then goes on from the knowing game (all later states); docstring lists both. Every exported function is still called.
- test_simulation_isolation.py: driver's newGame step uses `newKnowingGame` when `config.knowing` is set; only the real-simulation run passes it (made-up control modules have no data directory and keep `newGame`); docstring sentence.
- test_simulation_randomness.py, test_terrain_drawing_numbers.py, test_walk_feasibility.py, test_walk_target.py: newGame step uses `newKnowingGame(game, gamePath)`; docstring sentence.
No expected value or invariant sentence changed.

## Checks (command, exit code)
- `npm test -- tests/invariants/test_<f>.py` for simulation_inputs, simulation_isolation, simulation_randomness, terrain_drawing_numbers, walk_feasibility, walk_target: all 0.
- `npm test`: exit 1; failed: test_loop2_one_serving_process setUpClass, test_ruff_source_rules, test_shellcheck_source_rules (the base's three) and test_container_serves_each_icon_with_the_file_bytes (SQLite "database is locked", known flaky); the last re-run alone `npm test -- tests/invariants/test_loop2_container_icons.py`: exit 0. Log: .runs/task-cycles/odkrywanie/reports/slice-7-npm-test.log
- `python -B .the-way/elements/common/foundation_check.py`: exit 0 (0 errors).
- Not run: ruff, shellcheck (not installed; base failures). No new test case, so no failing-first run.

## Own-work check
Requirement: behaviour and expectations unchanged. Diff only touches new-game construction and docstrings; all six files pass unchanged.
Not asserted: that the Understanding is full (nothing gates on it until Slice 8).

## Choices
- isolation: a `knowing` config flag rather than a fallback on missing data, so controls stay unchanged. The data modules are read outside the vm by a native import (only to list keys); the game itself still runs inside the vm.
- inputs: the pre-send `newGame` and `setProgram` states are kept as inputs, the rest of the scenario starts from the knowing game.

## Reaches beyond the dispatch
None. Foundation entries: none found out of step.
