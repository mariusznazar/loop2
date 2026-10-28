# Slice 5 report - a completion ends the map run and solves its map

**Status:** done

## Files and commits
See `git log` on `task/rozwiazanie-lasu` (one commit, `feat: :sparkles: complete the map run and solve its map`).
- `src/browser/sim/types.ts`: `Completion`, `MapRun.completion`, `GameState.solvedMaps`.
- `src/browser/sim/run.ts`: event `mapRunCompleted`, exported `mapRunEnded(run)` (death or completion), `meetsSolving(run, map)`, guard of `minuteBeforePick`, `completion: null` in `newMapRun`.
- `src/browser/sim/game.ts`: completion check in the minute loop after `discover` took hold, before the pick; `solvedMaps`; guards of `passRealTime`, `advanceMinutes`, `setProgram` use `mapRunEnded` (re-exported from game.ts); carry zeroed at a completion; doc comments of `restart`, `end`, `passRealTime`, `setProgram`, `advanceMinutes`.
- `tests/sim/completion.test.mjs` (new, 11 cases), `tests/sim/streak.test.mjs` (changed), `tests/invariants/test_player_map_run_pace.py`, `tests/invariants/test_minute_span_split.py`.

## Checks (all exit 0 on the final tree)
`npm test -- <file>` for tests/sim/{completion,time,discovery,program-counts,flow,streak,acceptance,purity}.test.mjs and tests/invariants/test_{player_map_run_pace,minute_span_split,map_run_repeatability,restart_seed,action_in_progress,program_rule_pick,streak_program_change,simulation_inputs,simulation_isolation}.py. Also prettier --check, eslint --max-warnings 0 on touched TS/mjs, ruff (main repo's quality venv) on the two touched py files: all 0.
Test first: `npm test -- tests/sim/completion.test.mjs` failed (exit 1, assertion failures, run.completion undefined) before the code; 11 pass after.
Invariant tests seen failing: removing the `completion` clause that zeroes the carry in passRealTime made test_player_map_run_pace fail (`160 != 0`, exit 1); making minuteBeforePick/advanceMinutes read only `death` made test_minute_span_split fail the completion control (exit 1). Both restored; passing runs above.
Not run: full gate (`npm test` with no file), per the handoff; foundation_check.

## Own-work check
Requirement most likely missed: the completion minute that is also a discovery's must hold the discovery and not be paused, with no pick. Test "the completion in the minute of a discovery ..." (empty Understanding, streak 479, exploration ending in the minute) shows discovery set, paused false, `discovered` before `mapRunCompleted`, solvedMaps `[forest]`.

## Changed existing test (cause: this task)
`tests/sim/streak.test.mjs` "a streak below 480 grows past it ...": streak 479 over 2 minutes now stops at 480 / minute 1, renamed accordingly.

## Choices
- `meetsSolving` is `run.streak >= map.solving.streak` (SolvingDef holds only the streak). Rejected: `===` (a state with a streak above 480 would never complete). Cost if wrong: small.
- The completion is built in `advanceMinutes` (`{minute: run.minute}`), not in run.ts; `stepMinute` left as is (spec: maker's choice) - it does not learn the completion.
- On a completion `paused` is set false only where a discovery is held; a pause already set by the player stays (the view hides it after an end).
- Invariant tests drive explicit state through a driver step `patchRun` (the scenarios reach 480 without loss in none); COMPLETES scenario: ACCEPTANCE with streak 460, completion in minute 20.
- Quality: no file outside the Change list touched. `pauseLabel` and the status row still read `run.death` (view slices).

## Reaches beyond the dispatch
None. No mismatch between plan and code except the stale foundation line ranges the handoff already named; the foundation's current `player-map-run-pace` and `minute-span-split` wordings were used for the docstrings.
