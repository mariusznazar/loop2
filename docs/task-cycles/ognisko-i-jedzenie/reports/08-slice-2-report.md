# Slice 2 report

**Status:** done

**Commit:** see `git log` on `task/ognisko-i-jedzenie` (one commit, "test: keep map runs of group B tests within game minute 240, before a mage can die"), base d15aeb3.

## Files (7, all in tests/invariants/; 26 insertions, 24 deletions)
- test_player_map_run_pace.py: the one-hour step passRealTime 3600000 becomes 200000 (minutes 3610 -> 210, 3612 -> 212); the same expectations of the invariant (whole seconds, pause) hold.
- test_walk_target.py: LONG_MINUTES 800 -> 240 (docstring updated); MORE seeds 3 -> 9 so the control thresholds stay (went > 100, far > 5). With 240 minutes and 5 seeds `far` was 3 (failed); thresholds not touched.
- test_walk_feasibility.py: LONG_MINUTES 800 -> 240 (docstring), MORE 3 -> 9 seeds (thresholds kept).
- test_map_run_layout.py: MINUTES 300 -> 240 (docstring "to 240"); CHANGE_AT 150 unchanged.
- test_simulation_inputs.py: MINUTES 300 -> 170 (docstring), scenario passRealTime 61000 -> 6000. Reason: its calls also apply passRealTime 61000 to sampled states, so the highest minute reached is 170+6+61 = 237.
- test_simulation_isolation.py: scenario 400 -> 150 single minutes (docstring, assertion of minute 400 -> 150); with passRealTime 61000 and 5 paused-advance the first run reaches at most 216.
- test_terrain_drawing_numbers.py: MINUTES 600 -> 240 (docstring); EVERY 20 divides it.

## Checks (command, exit code), each from the worktree root
- `python -B -m unittest discover -s tests/invariants -p test_player_map_run_pace.py` 0
- `... -p test_walk_target.py` 0 (first try with 5 seeds: exit 1, far=3)
- `... -p test_walk_feasibility.py` 0
- `... -p test_map_run_layout.py` 0
- `... -p test_simulation_inputs.py` 0
- `... -p test_simulation_isolation.py` 0
- `... -p test_terrain_drawing_numbers.py` 0
- Not run: `test_ruff_source_rules` (Ruff not installed), full suite (cycle's run).

## Own-work check
Requirement most likely missed: some map run still passing minute 240. Checked by reading every minute-bearing literal of the seven files (grep for 3-digit numbers, passRealTime/advanceMinutes calls) and adding up the largest chain in each file; the sums are above. Not verified by instrumenting the simulation.

## Notes
- No reach beyond the dispatch. Invariant tests changed only in spans/seed counts, not in assertions of the invariant (walk-target/feasibility control thresholds unchanged).
- test_simulation_inputs.py docstring and TABLE still name streams layout and wander; unchanged here (not a minute-span matter).
- The 9 extra seeds make walk_target ~31 s and walk_feasibility ~70 s.
