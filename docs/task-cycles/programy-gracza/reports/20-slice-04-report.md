# Slice 4 report — the operations on the player's program list

**Status:** done with concerns (one structural choice below).

**Commits** (base `a303ad5`):
- `c908faf` feat: add the operations on the player's program list — `src/browser/sim/programs.ts` (+173), `game.ts` (2 lines: `checkProgram`, `reconcileCounts` exported), `types.ts` (+7: `ProgramNameRefusal`, `ProgramNameCheck`), `tests/sim/program-list.test.mjs` (new, 26 cases), `stryker.config.json` (+1).
- `bf7e827` test: protect the copy, streak and counts from an edit of a saved program — `tests/invariants/test_saved_program_edit.py` (new), `foundations/part_map.md` (+1 line in `simulation` *Files*, written per `the-way-update-part-map`: a pattern for the new check file, same commit, since foundation_check requires the file tracked).

## Checks (command, exit code)
- First failing case: `npm test -- tests/sim/program-list.test.mjs` with `createProgram` a stub returning the state: exit 1, `actual [[1,'Program']]` vs `expected [[1,'Program'],[2,'Program 2']]` (assertion, not a missing module). Passing after the code: exit 0 (26 cases).
- `npm run typecheck`: 0
- `npm test -- tests/invariants/test_saved_program_edit.py`: 0 (4 tests). Seen failing: with `editProgram` temporarily also zeroing the streak where the copy's program is the one edited, exit 1 (`0 != 10 : a rule added: the streak changed`); restored, verified by diff. Controls inside the file: `setProgram` on the copy with the same content sets the streak to 0 and reconciles counts (running and paused); the saved program really changes. First run also failed once on my own wrong expectation (`{3: 0}` count for an added rule), fixed in the test, not the code.
- `npm test -- tests/invariants/test_simulation_inputs.py`: 0
- `npm test -- tests/invariants/test_simulation_isolation.py`: 0
- `npm test -- tests/quality/test_quality_invariants.py`: 0 (first run 1, Prettier on `types.ts` and the test; fixed with `prettier --write`)
- `npm test -- tests/quality/test_mutation_test_selection.py`: 0
- `python -B .the-way/elements/common/foundation_check.py`: 0, 0 errors (run after the part-map commit; before it, exit 1 on the unclaimed pattern, as expected).
- Not run: the gate (`npm test` with no arguments), as instructed; stryker.

## Own-work check
Requirement most likely missed: F9 — an edit of a saved program leaves the copy, streak, beaten attacks and counts. Check: the invariant file above, over seven edit kinds x program 1 (the copy's source) and program 2 x running/paused; broken on purpose, it failed.

## Choices and mismatches
- Structural-ish: the operations (`programName`, `suggestedProgramName`, `createProgram`, `renameProgram`, `deleteProgram`, `editProgram`, `pickProgram`) are in `programs.ts` as the plan says, but `editProgram` needs `checkProgram` and `reconcileCounts`, which live in `game.ts`, so `programs.ts` and `game.ts` import each other (the `GameResult` import is type-only; the value imports are used only at call time, so the cycle loads). Rejected: moving the operations into `game.ts` (departs from the plan's module) and moving `checkProgram` (about 170 lines, outside this *Change*). Cost if wrong: a later split of the checking code into its own file removes the cycle. Orchestrator may want to decide this before Slice 5.
- Name refusal is returned as `ProgramNameCheck` (`{ok, name}` / `{ok:false, reason: "empty"|"taken"}`) by `programName(programs, text, ownId?)`; `renameProgram` throws with the reason. Letter case folded with `toLowerCase()`.
- `createProgram` returns only the state; the new number is `nextProgramId - 1` of the result (or the previous `nextProgramId`).
- Edit resource check "of every map": both maps hold the same four resources, so the test only distinguishes a known resource from an unknown one (`gold`).

## Reaches beyond the *Read*
None beyond `.the-way/task-cycle/change/slice.md`, `.the-way/elements/part-map/skill/SKILL.md`, `tests/sim/understanding-fixture.mjs`, `tests/sim/copy.test.mjs` (style), `src/browser/sim/data/maps.ts` (resources), `scripts/test.py` head.
