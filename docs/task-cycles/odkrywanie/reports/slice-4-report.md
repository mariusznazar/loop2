# Slice 4 report

**Status:** done with concerns (scope narrower than the plan's file list; one flaky container test, see Problems)

Commit: 4a06041 "test: start the rest of the timed simulation and view tests from a game that knows everything".

## Files changed (7 files, +43 -11)
- tests/sim/program.test.mjs: the "editing, deleting or transferring a started rule" test (character created, sent, time passed) starts from `newKnowingGame()`.
- tests/sim/program-counts.test.mjs: `ready()` (feeds `sent()`) starts from `newKnowingGame()`; `newGame().ruleCounts` check keeps `newGame()`.
- tests/sim/purity.test.mjs: `freshGame()` (feeds `midRun()`, sent, time passed) starts from `newKnowingGame()`; the `setProgram(newGame(), ...)` purity cases keep `newGame()`.
- tests/sim/team.test.mjs: new helper `createdKnowing` beside `created` (both via `createdIn`); used in the two tests that send and pass time (chest stays empty; send keeps chosen character and restart after 30 minutes). Tests that only send/end without time keep `created`.
- tests/sim/time.test.mjs: `sent()` starts from `newKnowingGame()`.
- tests/view/status-row.test.mjs, tests/view/tile-list.test.mjs: `sent()` starts from `newKnowingGame()`; unused `newGame` import removed in status-row (tile-list still uses it for `tileList(newGame())`).
- Imports of `newKnowingGame` from `understanding-fixture.mjs` added. No assertion changed.

## Not changed (plan lists them in Change)
- tests/sim/traits.test.mjs: `sent()` sends and restarts but never passes game time; `newGame()` kept by the Slice 3 rule. Candidates for Slice 8: the restart tests (`restart(other)`, `restart(filled)`).
- tests/sim/world.test.mjs: only run-level calls (`newMapRun`, `stepMinute`), which stay as they are.
- tests/view/clock.test.mjs: its game is never sent (the clock is only counted applying time to a store without a map run), so `newGame()` stays.
Cost if wrong: if Slice 8 gating also affects these, they are switched there.

## Checks (command, exit code)
- `npm test -- <file>` for each of the 7 changed files: all exit 0 (program, program-counts, purity, team, time, status-row, tile-list).
- `npx eslint --max-warnings 0` on the 7 files: 0. `npx prettier --check --no-config --no-editorconfig` on them: 0.
- `npm test`: exit 1. Node stage all passed. Python failures: the base's three (test_loop2_one_serving_process setUpClass, test_ruff_source_rules, test_shellcheck_source_rules) plus `tests/deploy/test_loop2_image_icons.py::test_built_image_serves_every_icon_and_the_page` ("database is locked" while verifying fresh account resources in a container).
- `npm test -- tests/deploy/test_loop2_image_icons.py` (alone, rerun for diagnosis): exit 0.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0 ("0 errors").
- Not run: ruff, shellcheck (not installed, base failures).

## Own-work check
Requirement: behaviour and expectations unchanged. Check: `git diff` shows no assertion edited; all 7 files pass unchanged assertions. Slice-8 gating is not checkable yet.

## Reaches beyond the dispatch
None.

## Choices
- Rule applied as in Slice 3: only games sent and then passing game time use the knowing game. Rejected: switching every game in the files (wider than the rule; would hide tests of the plain new-game state).

## Problems
- The container test failure above is a SQLite lock inside a Docker container (test code only changed under tests/sim and tests/view, none of it reached by that test); it passed alone. Cause not verified, guess: Docker/volume timing on this machine. Not in the baseline log.

## Foundation entries
None found out of step.
