# Slice 6 report

**Status:** done

Commit: f0ff814 "test: start the second group of invariant tests from a game that knows everything" (branch task/odkrywanie).

## Files changed (tests/invariants/)
- test_minute_span_split.py (+6/-3), test_player_map_run_pace.py, test_program_rule_pick.py, test_restart_seed.py: `DRIVER = KNOWING_GAME_JS + r"""`, driver's new-game step uses `await newKnowingGame(game, gamePath)`; docstring sentence added; import extended.
- test_program_closed_lists.py: the game sent to a map (`withRun`) starts from the knowing game; the game never sent keeps `game.newGame()`.
- test_program_world_reference.py: both variants end up sent (withRun false sends later), so both start from the knowing game.
- No expectation, no invariant sentence changed.

## Checks (command, exit code)
- `npm test -- tests/invariants/test_<f>.py` for each of the 6 files: all 0.
- `npm test`: exit 1. Failures: base's three (test_loop2_one_serving_process setUpClass, test_ruff_source_rules, test_shellcheck_source_rules) plus test_account_storage.test_replaced_container_keeps_accounts_and_sessions ("database is locked" in container; the known flake).
- Flake rerun alone: `npm test -- tests/deploy/test_account_storage.py` exit 1 first, exit 0 on the next run (both runs reported).
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors" (run on its own).
- Not run: ruff, shellcheck (not installed; base failures). No new test case, so no failing-first run.

## Own-work check
Requirement: behaviour and expectations unchanged. Diff only changes new-game construction, imports, docstrings; all six files pass unchanged. That the Understanding is full is covered by Slice 3's fixture precondition.

## Notes
- Three embedded-JS lines exceed 100 columns (same form as Slice 5's); ruff could not run.
- I briefly checked out d9a2374 by mistake and returned to task/odkrywanie; no change to the work, worktree clean at f0ff814.
- Reaches beyond the dispatch: none. Foundation entries out of step: none found.
