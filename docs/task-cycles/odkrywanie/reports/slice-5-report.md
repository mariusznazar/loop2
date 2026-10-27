# Slice 5 report

**Status:** done

Commit: see `git log -1` on task/odkrywanie ("test: start the view tests and the first invariant tests from a game that knows everything").

## Files changed
- tests/view/program-editor.test.mjs (+2/-1): the program in the counts test (sent, 20 minutes passed) starts from `newKnowingGame()`. Other `newGame()` uses (send without game time, program-only checks) stay.
- tests/view/terrain-picture.test.mjs (+5/-1): `sent()` starts from `newKnowingGame()`; the empty-picture test keeps `newGame()`.
- tests/invariants/program_fixture.py (+25): `KNOWING_GAME_JS`, source of `async newKnowingGame(game, gamePath)`; reads data modules next to game.js, same content as the Slice 3 fixture.
- tests/invariants/test_{action_in_progress,character_team,exploring_reveal,map_run_layout,move_reach,map_run_repeatability,map_run_tiles}.py: `DRIVER = KNOWING_GAME_JS + ...`, the driver's new-game step uses it (map_run_tiles: its per-start `game.newGame()`); docstring sentence added saying so. No expectation, no invariant sentence changed.

## Checks (command, exit code)
- `npm test -- <file>` for each of the 9 changed test files: all 0.
- `npx eslint --max-warnings 0` on the two view files: 0. `npx prettier --check --no-config --no-editorconfig tests/view/*.mjs`: 0 (after `--write` fixed one wrapped line in terrain-picture).
- `npm test`: exit 1, only the base's three failures (test_loop2_one_serving_process setUpClass, test_ruff_source_rules, test_shellcheck_source_rules). Ran before the prettier rewrap of terrain-picture; that file re-run alone: 0.
- `python -B .the-way/elements/common/foundation_check.py`: 0 ("0 errors").
- Not run: ruff, shellcheck (not installed; base failures). No new test case added, so no failing-first run.

## Own-work check
Requirement: behaviour and expectations unchanged. Check: diff shows only new-game construction and docstrings changed; all files pass unchanged. That the Understanding is really full is not asserted here (nothing gates on it before Slice 8); it is the same construction as Slice 3's fixture, whose precondition test covers it.

## Choices
- program-editor: only the one game that is sent and passes game time moved; lines ~771 and ~889 send without passing time and keep `newGame()`.
- Invariant tests not in this slice's list (e.g. player_map_run_pace, restart_seed, walk_*) untouched.
- Python fixture holds JS source; a driver using it must define `gamePath` (path of game.js).

## Reaches beyond the dispatch
None. Foundation entries: none found out of step.
