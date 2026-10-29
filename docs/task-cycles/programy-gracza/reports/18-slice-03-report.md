# Slice 3 report — programy-gracza

**Status:** done

## Files changed
- tests/invariants/program_fixture.py (+18): new `HELD_PROGRAMS_JS` with `heldProgram(state)` (copy during a map run, else the list's program the team goes with) and `heldPrograms(state)` (list programs plus the copy).
- tests/invariants/test_program_closed_lists.py: driver records `heldProgram(after)`; docstring says so.
- tests/invariants/test_program_rule_pick.py: driver records `heldProgram(state)` (the copy); docstring says so.
- tests/invariants/test_program_world_reference.py: driver records `{program, all}` per moment; `findings` reads every program of `all`; first-offer equality reads `held[0]["program"]`; docstring says so.
- tests/invariants/test_simulation_inputs.py: made-up state has the new shape (`programs` list, `run.copy`); `pushRule` pushes onto a list program's group rules, new `pushCopyRule` onto the copy's; both asserted reported; docstring says so.

## Commit
See the commit below the report in git log (one commit, `test: :test_tube: read the program list and the copy in the invariant checks`).

## Checks (command, exit; before -> after)
- `npm test -- tests/invariants/test_program_closed_lists.py`: 1 -> 0
- `npm test -- tests/invariants/test_program_rule_pick.py`: 1 -> 0
- `npm test -- tests/invariants/test_program_world_reference.py`: 1 -> 0
- `npm test -- tests/invariants/test_simulation_inputs.py`: 0 -> 0 (it passed before, because its made-up control used the old flat shape; changed per To do 1/6 so the control pushes onto the new shape)
- `npm test -- tests/quality/test_quality_invariants.py`: 0 -> 0 (Ruff on PATH from `.runs/quality-venv`)
Before-state: the first three failed on `JSON.parse(undefined)` of `state.program`.

## Changed expectations (To do)
- Programs read from the copy/list instead of `state.program`: To do 1 (list) and 6/7 (copy the run carries out; edits go to the copy).
- No assertion weakened; none removed.

## Controls
- simulation-inputs: with `pushCopyRule` made a no-op, `npm test -- tests/invariants/test_simulation_inputs.py` exit 1 ("the checker misses the change the made-up function pushCopyRule makes"); restored, exit 0.
- Existing controls in closed-lists and world-reference unchanged and passing.
- Observation: replacing `heldProgram` in a run by the list's program does not fail rule-pick (exit 0), because at send the copy equals the list program set before it; the check's expectations compare to that program, so they cannot tell them apart. Not a weakening by this slice, but the check does not independently prove it reads the copy.

## Reaches beyond Read
- `src/browser/sim/programs.ts` (named in handoff) to mirror `teamProgram` in `heldProgram`.
- `tests/invariants/test_simulation_inputs.py` and the two other drivers read whole for the edit; no foundation entries reached beyond the list.

## Plan vs code
- None structural. Product files unchanged. Gate (`npm test` with no arguments) not run.
