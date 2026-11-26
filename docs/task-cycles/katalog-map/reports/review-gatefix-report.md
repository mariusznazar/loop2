PASS 07f2577faf97d6d4ee1f1dcc044cfce9b46b21a1

# Review of the fix of the red gate, range f53f2409..07f2577f (task `katalog-map`)

Range: one commit, `07f2577f`, one file, `tests/invariants/test_map_run_tiles.py` (+16, -4). `git rev-parse HEAD` is `07f2577faf97d6d4ee1f1dcc044cfce9b46b21a1`.

## Findings

Blocking: 0. Minor: 0. Out of scope: 0.

Declined to judge: none set aside as outside the task. (Noted, not a finding: the tripwire compares each resource of the data against the written-out table, so a resource written out but absent from the data is not flagged by it. This is how the tripwire stood before the commit, which does not touch it; the test `test_tiles_at_each_start` still compares tiles with the written-out list.)

## Judgments

1. Added resources and stocks. `forestPack` and `forestLair` are each written out as stick 12, berry 8, moss 6, fiber 6. In `src/browser/sim/data/maps.ts` `forestPack` (lines 139-144) holds stick 12, berry 8, moss 6, fiber 6 and `forestLair` (lines 161-166) holds the same stocks (their densities differ, 0.7/0.5/0.4/0.4 and 0.5/0.4/0.3/0.3; the table holds stocks alone, as the file's docstring says). Four resources per map, none missing, none extra. The values are literals typed in the test file; nothing is computed from the code under test, as `guidelines/testing.md` ("Where the expected value comes from", "Test inputs and expected values") requires. Maps are selected by id.
2. The tripwire is untouched. The diff has three hunks: the docstring sentence, two rows of `MAP_RESOURCES`, and the `solvedMaps` line of `DRIVER`. `not_written_out`, `data_maps`, `READER` and `test_tripwire_every_map_and_resource_is_written_out` are unchanged; `data_maps` still reads every entry of `MAPS`, and the run below shows the tripwire passes with all five maps written out (it failed before, on `forestPack` and `forestLair`).
3. The driver. `['forestEdge', 'forest', 'forestDeep', 'forestPack']` is the chain of `opensAfter` in the data (forest after forestEdge, forestDeep after forest, forestPack after forestDeep, forestLair after forestPack), so each of the five maps of `MAP_RESOURCES` can be sent (`game.ts:520`, `canSendMap`). The invariant `map-run-tiles` (`foundations/invariants.md:297`) speaks of tiles at a map run's start; the state `solvedMaps` is consumed in `startRun` only for `solvedMapRun` (practice and chest equipment, `game.ts:334`), and the tiles come from `newMapRun(mapOf(mapId), seed, …)`, so the docstring's statement that the input opens maps "without changing their generated tiles" stays true. The docstring sentence now names exactly the maps in the list ("Skraj lasu, Las, Las — głębiej and Las — wataha, the prerequisites for each map of MAP_RESOURCES down to Las — matecznik (D-149)"); D-149 (read) is the decision on how a map opened by another is offered and refused, which is the reason the driver needs the list. The expected values did not move, no assertion was weakened, and the 45 starts per map (15 times x 3) and the controls still run over the added maps.
4. Mutation in a copy (see Checks): a wrong stock in each new row fails the test, in three tests each time.
5. Both foundation scripts exit 0.

The author's claim that the instruction ("add the two maps") did not suffice is confirmed by the nature of the change: without opening the maps the driver refuses the send (`canSendMap`), which the author reports as `send: map forestPack is not available`. I did not re-run that failing state (not needed to judge the commit).

## Checks

- `git rev-parse HEAD` -> 07f2577f (matches). `git log f53f2409..07f2577f` -> one commit; `git diff` read whole.
- `npm test -- tests/invariants/test_map_run_tiles.py` in the reviewed worktree: exit 0, "Ran 6 tests ... OK".
- Mutation 1, copy of the head with `forestPack` berry stock 8 -> 9 (`sed` on line 83 of the copy): `npm test -- tests/invariants/test_map_run_tiles.py` exit 1, 3 failures: `test_control_the_layouts_can_show_a_break` ("no tile of forestPack holds berry"), `test_tiles_at_each_start` (list of violations of forestPack), `test_tripwire_every_map_and_resource_is_written_out` (the data gives 'forestPack' the resource 'berry' with the stock 8, not written out).
- Mutation 2, same copy with `forestLair` fiber stock 6 -> 5 (line 91): exit 1, 3 failures, the same three tests, naming `forestLair` and `fiber`.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0. `python -B .the-way/instruction-files/check_instructions.py`: exit 0. (Run in the reviewed worktree; output discarded, exit codes only.)
- The product's full gate: not run, by the handoff.

## Reaches beyond the dispatch

- `foundations/decisions.md`, entry D-149 (lines 5988-6010): to confirm what the docstring's citation stands for. Read whole.
- `src/browser/sim/game.ts` (lines 134-150, 325-350, 520) and `src/browser/sim/loop.ts` (lines 100-120), found by grep for `solvedMaps`: to judge whether the changed `solvedMaps` could change the tiles a map run starts with. Read the passages named.
- `src/browser/sim/data/maps.ts` lines 60-178: the data the table transcribes. (Named by the handoff; read as a passage, the file's first 60 lines of types were not read.)

## Working copies

One: a detached git worktree of `07f2577f` at `.runs/review-gatefix/wt` with a junction `node_modules` to the reviewed worktree's `node_modules`, and a backup `orig.py` beside it. The junction was removed with `rmdir` (the real `node_modules` of the reviewed worktree is intact, 268 entries), then `git worktree remove --force` and `git worktree prune`; `.runs/review-gatefix/` is gone. `git worktree list` no longer shows it; `git status --short` of the reviewed worktree is empty. No remainder. No probe input was kept: the mutations are the one-line edits named above.

## Unread material

- `guidelines/testing.md`: read whole (three reads: lines 1-203, 204-353, 354-510).
- `.the-way/task-cycle/review/fix.md`: not read. The handoff did not name it, and this review is of a commit that fixes a red gate, not of the findings of a review; no findings file was given.
- `src/browser/sim/data/maps.ts` lines 1-59 (type definitions): not read.
- `foundations/invariants.md`: the entry `map-run-tiles` read whole (lines 297-307); no other entry.
- `tests/invariants/test_map_run_tiles.py`: read whole.
- `.runs/task-cycles/katalog-map/reports/fix-gate-report.md`: read whole.
- `cycle.md` and other files of `.runs/task-cycles/katalog-map/`: not read, as the handoff says.

## Searches not found or unclear

- none. (One non-finding: the hook of this session refused the first `git worktree add` call and asked to read `a rules file of the author's agent configuration`; I read it as the hook printed it and repeated the call.)
