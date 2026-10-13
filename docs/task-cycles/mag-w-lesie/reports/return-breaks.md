# Deliberate breaks of 11 invariant checks (WAY-69, WAY-08)

The worktree was at HEAD b0b6274, and none of its files, its index, HEAD or its branches were changed. Each run used a copy made from `git archive HEAD`, with the pinned `.the-way` (d04c3feb) and `node_modules` from the worktree and its own `git init`. Every copy ran only its one check: `python -B .the-way/gate/run_tests.py tests/only_<name> --record .runs/<name>.jsonl`.
While the runs went on, HEAD moved to 618f29e, a commit I did not make. It changes only `foundations/decisions.md` and `foundations/part_map.md`, and no check or product code, so these results hold for it too.
The copies and records are in `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\cdeb45b6-2a6f-46b3-9ad7-de2ce102c613\scratchpad\breaks2\{unbroken,broken}\<case>\`.

| invariant | break: file and one-line change | unbroken | broken (failing tests) |
|---|---|---|---|
| simulation-isolation/1 | `src/browser/sim/game.ts` send: `mixSeed(state.lastSeed, realMs)` → `mixSeed(state.lastSeed, realMs + (Date.now() % 1))` | pass (4/4) | FAIL: test_source_imports_and_uses_nothing_outside_the_language, test_built_simulation_runs_with_the_language_globals_alone |
| simulation-isolation/1 (B) | `game.ts` setPaused, no-run path: `return { state, events: [] }` → `return { state: { ...state, realMsCarry: globalThis.Date.now() % 1 }, events: [] }` | — | **PASS (4/4): break missed** |
| simulation-inputs/1 | `src/browser/sim/run.ts` stepMinute: the copying `tiles = run.tiles.map(...)` → `for (const tile of run.tiles) if (sameHex(tile.at, at)) tile.revealed = true;` | pass (2/2) | FAIL: test_no_exported_function_changes_its_arguments |
| content-identifiers/1 | `src/browser/view/send-panel.ts`: `` `Mapa: ${MAPS[target.mapId].name}` `` → `'Mapa: Las'` | pass (3/3) | FAIL: test_browser_files_outside_the_data_name_no_content |
| program-rule-pick/1 | `src/browser/sim/program.ts` chooseActivity: `if (conditionHolds(...) && actionFeasible(...))` → `if (actionFeasible(...))` | pass (4/4) | FAIL: all 4 (test_no_rule_when_none_holds_and_can_be_carried_out, test_the_first_rule_with_both_is_started, test_every_free_minute_of_long_runs, test_control_the_comparison_flags_wrong_picks) |
| exploring-reveal/1 | `program.ts` actionFeasible explore: `here !== undefined && !here.revealed` → `here !== undefined` | pass (3/3) | FAIL: all 3 (test_exploring_at_the_entrance, test_long_runs, test_control_the_comparison_flags_breaks) |
| move-reach/1 | `run.ts` wander: `neighbours(...)` → neighbours of neighbours, the character's own tile excluded | pass (2/2) | FAIL: test_every_move_ends_on_a_neighbour, test_control_the_comparison_flags_breaks |
| walk-target/1 | `src/browser/sim/hex.ts` nearestTile: `cost[i]! < cost[best]!` → `>` (the farthest tile) | pass (2/2) | FAIL: test_going_to_each_resource, test_control_the_comparison_flags_breaks |
| map-run-tiles/1 | `src/browser/sim/layout.ts` per-tile draw: `= resource.stock` → `= resource.stock + 1` | pass (3/3) | FAIL: all 3 (test_tiles_at_each_start, test_control_the_data_and_the_layouts_can_show_a_break, test_control_the_comparison_flags_breaks) |
| map-run-tiles/1 (B) | `layout.ts` fallback for a resource that no tile got: `= resource.stock` → `= resource.stock + 1` | — | **PASS (3/3): break missed** |
| restart-seed/1 | `game.ts` restart: `run.seed` → `(run.seed + 1) >>> 0` | pass (2/2) | FAIL: test_each_restart_keeps_the_seed_of_the_run_it_replaces |
| icon-file-content/1 | `assets/icons/fern.svg`: `onload="alert(1)"` added to `<svg>` | pass (2/2) | FAIL: test_icon_files_hold_nothing_that_runs_or_refers_outside |
| icon-credits/1 | new `assets/icons/rock.svg` (a copy of fern.svg) with no credit | pass (3/3) | FAIL: test_footer_credits_each_icon_file |
| icon-credits/1 (B) | `src/browser/view/credits.ts`: `name: 'CC BY 3.0'` → `'CC BY 4.0'` | — | FAIL: test_footer_credits_each_icon_file |

In every failing case the check failed for the reason it was written to catch: its assertion message names the break, and no case failed because the build or the driver crashed.

## Important findings

1. **simulation-isolation/1 misses `globalThis.Date.now()` on a code path its run does not reach.**
   - The scan of the source does not flag it:
     - the pattern for the system time, `(?<![\w$.])Date…now`, skips `Date` when a `.` stands before it;
     - the check of members of `globalThis` lets `Date` through, because `Date` is a global of the language.
   - The run of the built simulation does catch the call, but only on paths that `GAME_STEPS` reaches, and setPaused without a map run is not one of them.
   - The docstring says the scan of the source covers the paths the run does not reach, which is not true for this form.
   - Fix: make the scan flag `.now` reached through `Date`, `globalThis.Date`, `window.Date` and the like, and `new X.Date()` with no arguments, and add these forms to `FLAGGED_SOURCES`.
2. **map-run-tiles/1 never reaches the layout's fallback branch.** That branch is step 3 of `drawLayout`: when no tile drew a resource, it puts the resource on one tile.
   - None of the 36 starts the check makes takes this branch, so a wrong stock written there goes unseen.
   - From a new game, the branch is taken roughly once in 1,000–2,000 sends. With the fallback break in place, sends at the real times 1760001609000 (berry), 1760002975000 (fiber) and 1760006249000 (moss) put the wrong stock on a tile.
   - Fix: add such real times to `REAL_TIMES`, and add a control that the fallback was taken at least once.

## Re-run on bec4d25 (the two checks after their fix)

Each run used a fresh copy made from `git archive bec4d25` with the same setup as before; the worktree was not touched. The breaks are the same ones as in the table above, and the copies are under `...\scratchpad\breaks3\`.

| invariant | case | verdict |
|---|---|---|
| simulation-isolation/1 | unbroken | pass (5/5) |
| simulation-isolation/1 | break A (`Date.now()` in send) | FAIL: test_source_imports_and_uses_nothing_outside_the_language, test_built_simulation_runs_with_the_language_globals_alone |
| simulation-isolation/1 | break B (`globalThis.Date.now()` in setPaused when there is no map run) | FAIL: the same two tests; the scan of the source now reports "reads the system time by Date.now" |
| map-run-tiles/1 | unbroken | pass (4/4) |
| map-run-tiles/1 | break A (draw for each tile: `+ 1`) | FAIL: all 4 (test_tiles_at_each_start, test_control_the_data_and_the_layouts_can_show_a_break, test_control_the_comparison_flags_breaks, test_control_single_tile_starts_are_reached) |
| map-run-tiles/1 | break B (fallback: `+ 1`) | FAIL: test_tiles_at_each_start, test_control_single_tile_starts_are_reached (send at 1760001609000) |

Both findings above are closed: each check now fails on its break B, and still passes unbroken and fails on break A.

## Re-run on e44e053 (the expected values written into the checks as literals)

Each run used a fresh copy made from `git archive e44e053` with the same setup as before; the worktree was not touched. The copies are under `...\scratchpad\breaks4\`.

| invariant | case | verdict |
|---|---|---|
| map-run-tiles/1 | unbroken | pass (4/4) |
| map-run-tiles/1 | break A (draw for each tile: `+ 1`) | FAIL: all 4 (test_tiles_at_each_start, test_control_the_layouts_can_show_a_break, test_control_the_comparison_flags_breaks, test_control_single_tile_starts_are_reached) |
| map-run-tiles/1 | break B (fallback: `+ 1`) | FAIL: test_tiles_at_each_start, test_control_single_tile_starts_are_reached |
| content-identifiers/1 | unbroken | pass (2/2) |
| content-identifiers/1 | break A (`'Mapa: Las'` in `view/send-panel.ts`) | FAIL: test_browser_files_outside_the_data_name_no_content |
| content-identifiers/1 | break C1 (`view/footer.ts`: `resourceName: resource.icon === 'berry-bush' ? 'jagoda' : resource.name`) | FAIL: test_browser_files_outside_the_data_name_no_content ("names the resource berry by its name 'jagoda'") |
| content-identifiers/1 | break C2 (new `stone: { name: 'kamień', icon: 'fern' }` in `sim/data/resources.ts`, and `export const FIRST_FIND = 'kamień';` in `view/send-panel.ts`) | **PASS (2/2): break missed** |

### Important finding

**content-identifiers/1 misses a map, a resource or an archetype that the data gains but the check's literal list does not.**
- The check now scans only for the six entries written out in `ENTRIES`.
- A view file that names a newly added entry by its identifier or its name breaks the sentence, and the check stays green.
- The data reader this replaced would have caught it.
- The docstring states this limit, but nothing makes it show when it happens, so the check goes silently out of date.
- map-run-tiles/1 has the same gap for a game map added to `MAPS`, which `MAP_RESOURCES` would not include. I did not run a break for this.
- Fix within WAY-69: add a tripwire test that fails while the data holds an entry, a game map in the case of map-run-tiles, that the literals lack. For example, read the keys of `MAPS`, `RESOURCES` and `ARCHETYPES` from the data and compare them with the literals. This uses the data only to fail and never as an expected value, so whoever adds content must also write it out in the check.

## Re-run on a149fbf (tripwire tests added)

Each run used a fresh copy made from `git archive a149fbf` with the same setup as before; the worktree was not touched. The copies are under `...\scratchpad\breaks5\`.

| invariant | case | verdict |
|---|---|---|
| content-identifiers/1 | unbroken | pass (4/4) |
| content-identifiers/1 | break C2 (new resource `stone`, named `'kamień'`, and that name used in `view/send-panel.ts`) | FAIL: test_tripwire_every_data_entry_is_written_out |
| map-run-tiles/1 | unbroken | pass (6/6) |
| map-run-tiles/1 | D1 (`stone`, stock 4, added to Las's list in `sim/data/maps.ts`, and to `resources.ts`) | FAIL: test_tripwire_every_map_and_resource_is_written_out, test_tiles_at_each_start, test_control_the_comparison_flags_breaks, test_control_single_tile_starts_are_reached |
| map-run-tiles/1 | D2 (new map `meadow`/`Łąka` in `maps.ts`, and a layout giving `stock + 1` on that map only) | FAIL: test_tripwire_every_map_and_resource_is_written_out |

- D1 is not strictly a break of the sentence: the layout puts the data's own stock of `stone`, so the product stays true to it. Its failures show the check flags data it has not written out; three of them come from the literals, not from a broken product.
- D2 is a true break of the sentence on a map the literals do not hold. Only the tripwire catches it, which is what the tripwire is for.

The finding from the e44e053 re-run is closed.
