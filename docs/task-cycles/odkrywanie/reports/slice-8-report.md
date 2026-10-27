# Slice 8 report

**Status:** done

**Commit:** see `git log -1` on branch task/odkrywanie (feat: carry out only the program rules the character's repertoire holds)

## Files changed
- `src/browser/sim/game.ts` (+programOf helper; `startRun` and `advanceMinutes` pass the reduced program to `newMapRun`/`stepMinute`; `state.program` and `ruleCounts` stay on the full program)
- `tests/sim/repertoire.test.mjs` (6 new cases + group case)
- `tests/invariants/test_program_rule_pick.py` (driver takes an optional list of actions the game lacks; new case marked `invariant: program-rule-pick` with the knowing game as control; docstring updated)

## Checks (command, exit)
- Red JS: `npm test -- tests/sim/repertoire.test.mjs` exit 1, 5 new cases failing on assertions (log `reports/s8-red-js.log`)
- Red Py: `npm test -- tests/invariants/test_program_rule_pick.py` exit 1, new case failing (1 != 2 rule) (`s8-red-py.log`)
- Green: both exit 0 after the code (`s8-green-*.log`); repertoire file rerun exit 0 after adding the group case
- `npm test`: exit 1 (`s8-npm-test.log`). Failures: base's three (`test_loop2_one_serving_process` setUpClass, `test_ruff_source_rules`, `test_shellcheck_source_rules`) plus `test_container_serves_each_icon_with_the_file_bytes` (docker exit 137, known flaky); rerun alone `npm test -- tests/invariants/test_loop2_container_icons.py` exit 0 (`s8-icons-alone.log`). No test outside Change failed because of the gating.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, 0 errors (`s8-foundation.log`).
- Prettier --check on game.ts and repertoire.test.mjs passed; not run: ruff, shellcheck (not installed; base failure), ESLint separately (inside npm test JS stage, passed).

## Own-work check
Requirement most likely missed: a group whose condition is outside the repertoire, and a rule passed over still keeping the count of the full program. Checks: group case in repertoire.test.mjs (program deep-equal to the full one, counts {1:0,2:1}); mid-run action loss test shows stepMinute path uses the reduced program.

## Reaches beyond handoff
None.

## Choices
- Reduced program computed once per `advanceMinutes` call (Understanding does not change within a call) and once at `startRun`; the character is found in the team by id, falling back to CREATED_ARCHETYPE as `editorRepertoire` does. Cost if wrong: an Understanding changing within a call (none today) would be seen one call late.
- Only one archetype exists, so no test varies predispositions at game level (covered by Slice 2 unit tests).
- Invariant test changed: new case added only; no sentence or expected value changed.

## Foundation entries
None found out of step with the code.

## Concerns
None.
