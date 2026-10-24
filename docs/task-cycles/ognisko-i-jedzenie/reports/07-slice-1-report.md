# Slice 1 report

**Status:** done

Commit: see `git log` on branch task/ognisko-i-jedzenie (one commit on base 3789fa4).

## Files changed
- tests/sim/time.test.mjs: hidden-tab test 3600000 ms -> 240000 ms, expects minute 240.
- tests/sim/actions.test.mjs: "never ends" test renamed "no step ends the run by itself: steps keep coming for four hours", 600 -> 240; determinism test 300 -> 240 steps.
- test_map_run_repeatability.py: scenario 621 -> 236 minutes (200/100/320 seconds -> 80/40/115), MINIMUM_MINUTES 600 -> 230, docstring.
- test_simulation_randomness.py: long run split so no map run passes 240 (200+30+5s+5 = 240 before restart, 200 after restart and after second send), LONG_RUN_MINUTES_BEFORE_RESTART 2000 -> 240, docstring.
- test_program_rule_pick.py, test_exploring_reveal.py, test_move_reach.py: LONG_MINUTES 600 -> 240, docstrings.
- test_exploring_reveal.py: control thresholds "more than 10" explorings / refused free minutes -> "more than 5" (a 240-minute run holds 9 explorings; explore takes 20 min), docstring updated. Cost if wrong: the control is weaker in count only; it still requires non-trivial explorings.

## Checks (command, exit code)
- npm run build: 0
- node --test tests/sim/time.test.mjs tests/sim/actions.test.mjs: 0 (30 pass)
- python -B -m unittest discover -s tests/invariants -p <file> for the five invariant files: 0 each
- python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier: 0
- Not run: test_ruff_source_rules (Ruff not installed).
- Invariant tests changed in span/threshold only; logic untouched. I did not break the code to see them fail (no assertion about behaviour changed). First run of test_exploring_reveal with 240 minutes failed on the control thresholds (9 not > 10), fixed as above; the time test first failed from my arithmetic slip (ms vs minutes), fixed.

## Own-work check
Requirement: no map run of these files passes minute 240. Checked by reading every span in the diff (all <= 240) and by the tests passing on the base.

## Reaches beyond dispatch
None. Note: working-tree CRLF on some Python files (index LF); sed -i left LF in three files; git normalizes, diff is clean.
