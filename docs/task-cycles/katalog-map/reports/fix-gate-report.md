done

# Report - fix of the gate's red test `test_tripwire_every_map_and_resource_is_written_out`

Commit: `07f2577f` test: write out Las — wataha and Las — matecznik in the table of the map-run-tiles check and open them in its driver (D-24). Changed file: `tests/invariants/test_map_run_tiles.py` (16 added, 4 removed lines). Pushed nothing.

## What I changed

1. `MAP_RESOURCES`: added `forestPack` and `forestLair`, each with the four resources written out by hand: stick 12, berry 8, moss 6, fiber 6 (the stocks of the rows in `src/browser/sim/data/maps.ts`; the stocks of the lair are the same as the pack's, only its densities differ, and this table holds stocks alone). The tripwire (`not_written_out`, `data_maps`) is not edited.
2. The driver of the same file (`DRIVER`) sent each map from a game whose solved maps were `['forestEdge', 'forest']`. With the two new maps in `MAP_RESOURCES` the driver died: "send: map forestPack is not available" (a map opens only after its opener is solved, D-136). I set the solved maps to `['forestEdge', 'forest', 'forestDeep', 'forestPack']` (the openers of every map of the table) and brought the sentence of the file's docstring that names the solved maps to that. The input only opens the maps; the tiles generated are not changed by it (the docstring's own claim about it).

The change of the driver was not in the coordinator's instruction ("add the two maps to `MAP_RESOURCES`"); the table alone is not enough for the test to pass, as the run below shows.

## Commands and exit codes

- `npm test -- tests/invariants/test_map_run_tiles.py` with the two entries only: exit 1 (4 failures; the driver exited 1 with "send: map forestPack is not available" - the failing run that led to the driver's change).
- The same command after the driver's change: exit 0 (6 of 6 tests OK).
- One file at a time, each as `npm test -- tests/invariants/<file>.py`, all exit 0: `test_character_team` (6 tests), `test_action_in_progress` (2), `test_content_identifiers` (5), `test_exploring_reveal` (3), `test_map_run_tiles` (6), `test_player_map_run_pace` (12), `test_minute_span_split` (9), `test_simulation_inputs` (2), `test_simulation_randomness` (6), `test_program_closed_lists` (4), `test_simulation_isolation` (5). These are the files of `tests/invariants/` that name `forestDeep`, `forestEdge`, `MAPS`, `maps.ts` or `maps.js` (`rg -l`); `program_fixture.py` also matched, it is a helper and no test.
- The product's full gate: not run, by the instruction.

## Own-work check

The requirement most likely unmet: the new rows of `MAP_RESOURCES` must be the stocks the data hold, and the check must really start map runs on the two new maps. Check: the same file's `test_tiles_at_each_start` (45 starts per map, each tile holding none or the stock of the list and nothing off the list) and `test_control_the_layouts_can_show_a_break` (each resource of each new map stands on some tile with its stock and is missing from another) passed on both new maps; the tripwire `test_tripwire_every_map_and_resource_is_written_out` compares the data with the table and passed (exit 0 of the file). The expected values are written out by hand from the data, not computed.

## Search of the other test directories

- `rg -l "forestDeep|forestEdge|maps\.ts|\bMAPS\b|maps\.js"` over `tests/invariants`, `tests/agent_workflow`, `tests/quality`, `tests/deploy` and the top-level `tests/*.mjs`, `tests/*.py`: only the eleven files of `tests/invariants/` above; none in `tests/agent_workflow`, `tests/quality`, `tests/deploy` or the top level.
- A dictionary literal keyed by map ids (`rg` for `"forestDeep":` / `forestDeep:` outside `tests/view/`): `tests/invariants/test_map_run_tiles.py:75` (now fixed) and `tests/sim/data.test.mjs:97` (my own table of regions, which holds all five maps). No other table keyed by map ids that lacks the two new maps.
- `tests/view/` (the same search was not made there beyond the name search; the gate passed those tests) and `tests/balance`, `tests/sim`: passed in the gate, so fine by the coordinator's rule.

## Unread material

- `foundations/invariants.md`: the entry `map-run-tiles` read whole; no other entry.
- `guidelines/testing.md`: the first 60 lines read in this task; I had read the whole file earlier in this session (Slice 3, same worktree) and it has not changed since.
- `tests/invariants/test_map_run_tiles.py`: read whole.
- `.runs/orchestrator/gate-final.log`: not read (the failure was quoted in the coordinator's message).
- The ten other invariant files: not read, only run.

## Searches not found or unclear

- none. (Unclear to me only that the coordinator expected the table alone to fix the test; the driver needed the change above.)
