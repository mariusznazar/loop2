# Report — slice 4, executor

**Status:** done

**Commit:** see `git log -1` on branch task/rozwiazanie-lasu: "feat: :sparkles: zero the streak when an edit changes the program"
(files: src/browser/sim/game.ts +19/-1, tests/invariants/test_streak_program_change.py +239, foundations/part_map.md +1).

## Change
- `setProgram` compares the checked program with `state.program` by a deep structural equality (`sameData`, key-order independent); where they differ and `state.run` exists with no death, the run's streak becomes 0 (paused or not). Same program, or a run ended in death, leaves it. The first-chill rule written in `advanceMinutes` does not go through `setProgram`.
- New invariant test (marked `invariant: streak-program-change`): add, delete, reorder, swap of same-content rules, condition change, action change, group rename, group condition change, each running and paused; controls: identical program handed back (running, paused; twin rules), and death-ended run keeps streak 7 (state field replaced by a `replaceRun` driver step, since a dying character holds 0 itself).
- part `simulation` Files gained the test (edited directly, the single line the handoff dictated; skill entry point read, no shape change to the entry).

## Checks (command, exit)
- Failing run first: `npm test -- tests/invariants/test_streak_program_change.py` exit 1 (16 subtest failures "10 != 0", precondition and controls passed).
- After the change: same command exit 0 (4 tests).
- `npm test -- tests/sim/program-counts.test.mjs` 0 · `flow` 0 · `streak` 0 · `purity` 0
- `npm test -- tests/invariants/test_action_in_progress.py` 0 · `test_simulation_inputs.py` 0
- `python -B .the-way/elements/common/foundation_check.py` exit 0 (0 errors), run with the test staged.
- Also: eslint on game.ts exit 0; ruff (loop2 quality-venv) on the test: all passed.
- Not run: full `npm test` (orchestrator's).

## Own-work check
Requirement most likely missed: identical edit must not zero although key order or object identity differs. Control covers a deep copy; sameData ignores key order. Death case covered by state replacement.

## Reaches beyond dispatch
None beyond reading `.the-way/elements/part-map/skill/SKILL.md`, `guidelines/testing.md`, `guidelines/coding.md`, `coding-simulation-module.md` (parts).

## Notes
No mismatch between plan and code. Not covered by a stored test: the first-chill rule not zeroing (streak is 0 in that minute anyway, as spec says).
