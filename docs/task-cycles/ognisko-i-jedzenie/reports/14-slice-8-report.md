# Report — executor of Slice 8, cycle `ognisko-i-jedzenie`

- **Status:** done with concerns. The concerns are problems I observed outside this slice; nothing in the slice is left open (see *Problems observed*).
- **Slice base:** `006616f0e165ec40d210b59aedb919b960362783` · **Commit:** `612404fe542bce7a0e89d2712e34d651853881cc` on `task/ognisko-i-jedzenie` (author `<the repository owner's address>`).

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `src/browser/sim/data/actions.ts` | 27 | 0 |
| `src/browser/sim/types.ts` | 7 | 1 |
| `src/browser/sim/program.ts` | 80 | 2 |
| `src/browser/sim/run.ts` | 133 | 8 |
| `src/browser/sim/game.ts` | 14 | 0 |
| `src/browser/sim/body.ts` | 11 | 0 |
| `src/browser/view/program-editor.ts` | 6 | 2 |
| `tests/sim/campfire.test.mjs` (new) | 533 | 0 |
| `tests/invariants/test_program_closed_lists.py` | 10 | 2 |
| `tests/view/program-editor.test.mjs` | 33 | 1 |

## What was made

- **Data** (`actions.ts`): six action kinds with label, status text and minutes:
  `walkToCampfire` „Idź — ognisko” (minutes of the tile it enters), `craftCampfire` „Wytwórz — ognisko” 20,
  `lightCampfire` „Zapal — ognisko” 5, `lightItem` „Zapal — patyk” 5, `feedCampfire` „Zasil — ognisko” 5,
  `eat` „Zjedz — jagoda” 5.
- **Feasibility** (`program.ts`): `RunView` gains `campfires`. New `itemFor(backpack, use)` (`program.ts:31`) is
  the simulation's pick of the piece: the first item in `ITEMS` order that the data marks `fuel`, `food` or
  `lightable` and of which the backpack holds a piece. New `campfireTarget(run)` (`program.ts:94`) is the nearest
  tile holding a campfire, burning or not, counted in minutes of walking. Crafting needs a revealed tile, no
  campfire on it and `CAMPFIRE.craft` in the backpack. Lighting a campfire needs a campfire here at 0 minutes and
  `CAMPFIRE.light`. Lighting a stick needs a revealed tile and a lightable piece. Feeding needs a campfire here
  with more than 0 minutes and a piece of fuel. Eating needs a piece of food. „Idź — ognisko” needs a campfire
  that is reachable at more than 0 minutes, so it is passed over on a campfire's tile.
- **Duration and effect at the end** (`run.ts`): `startActivity` takes the fixed minutes from the data, and for
  „Idź — ognisko” the step toward `campfireTarget`. `finishUse` (`run.ts:183`) applies D-64 step 5. The effect
  and the removal of the pieces happen together:
  - crafting puts an unlit campfire `{at, minutesLeft: 0}` on the tile;
  - lighting gives the campfire here `CAMPFIRE.burnMinutes`;
  - lighting a stick adds a burning item;
  - feeding adds the fuel's minutes to the campfire here, whatever is left, 0 included;
  - eating raises satiety through the new `eatenBody` (`body.ts:27`), rounded like the body minute and capped at the starting satiety.

  „Idź — ognisko” ends as every move does (through `stepTo`).
- **Program check** (`game.ts`): the six kinds are taken in without fields. Extra fields are dropped, as for `explore`.
- **Editor** (`program-editor.ts`): the action select already lists every key of `ACTIONS` (`program-editor.ts:308`),
  and the resource select is hidden for an action that names no resource (`program-editor.ts:438`). The code change
  is only to the descriptions.

## Checks (command → exit code)

Every command was run from the worktree root.

| Command | Exit | Notes |
|---|---|---|
| `npm run build` (before the code) then `node --test tests/sim/campfire.test.mjs` | 1 | **Failing run, test first:** 20 tests, 18 failed on assertions (one on `setProgram` throwing "not on the closed list"). Two passed before the code: „passed over on a campfire's tile” (an unknown kind was infeasible, so rule 1 was picked anyway) and „the action ending in the minute of death takes no effect” (Slice 4 already gave that behaviour). |
| `python -B -m unittest discover -s tests/invariants -p test_program_closed_lists.py` (test changed, code not yet) | 1 | **Failing run of the invariant test:** the tripwire reported the data's action kinds against the written-out ones. |
| `npm run build` | 0 | final state |
| `node --test tests/sim/campfire.test.mjs` | 0 | 20/20 |
| `npm run typecheck` | 0 | |
| `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` | 0 | 242/242 |
| `python -B -m unittest discover -s tests/invariants -p test_program_closed_lists.py` | 0 | |
| `… -p test_program_world_reference.py` | 0 | |
| `… -p test_walk_target.py` | 0 | |
| `… -p test_walk_feasibility.py` | **1** | `test_a_stock_of_zero_is_no_stock` (berry): "zero here did not come about at minute 120". **Already failing on the slice base:** I stashed my changes, ran the same command at 006616f, got exit 1 with the identical message, then restored the changes. Not caused by this slice. |
| `… -p test_move_reach.py` | 0 | |
| `… -p test_action_in_progress.py` | 0 | |
| `… -p test_program_rule_pick.py` | 0 | |
| `… -p test_content_identifiers.py` | 0 | |
| `… -p test_simulation_inputs.py` | 0 | |
| `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier` | 0 | The first run gave exit 1 for an unused import in `run.ts`. I fixed it and reran. |

**Not run:**
- Ruff on `tests/invariants/test_program_closed_lists.py` — Ruff is not installed on this machine.
- The full suite — it belongs to the cycle.
- Screenshot of the editor — the foundation settles no route for screenshots. I checked the states in code: no control or state was added; the action select (shared select list) gets six more options from the data; the resource select stays hidden for the new kinds (`program-editor.ts:438`). The rendered appearance is **unchecked**.

## Own-work check

- **Requirement most likely unmet:** in a real map run, driven only through the public `game.ts` functions, a program made of the new actions crafts, lights, feeds and eats as the slice says. In particular, no campfire or burning stick ends up on a hidden tile (D-65), no backpack count goes below 0, and no temperature or satiety goes over its cap.
- **Check:** a scratch script, `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\d1e0cc19-26f4-410a-bc8b-e2f6c7179a11\scratchpad\ownwork.mjs`. It sends to Las with three real times and runs 300 minutes of the program [eat, feed, craft, light campfire, gather berry, gather stick, go to campfire, explore, wander]. Every minute it asserts those three properties.
- **What it showed:** exit 0, no violation.
  - Real time 1760000000000: the run crafted 1 campfire, lit it once (first burning at minute 180) and fed it 6 times; the body stood at 37.0 °C at the fire.
  - The other two real times: the runs ate 14 berries and satiety stayed at 73.6 or above.
  - A first ordering, with „Zapal — patyk” before gathering, lit every stick as soon as it was gathered (13–14 times) and so never crafted. That is the program's order, not a fault.
- **Mutations I worked through in my head and covered with tests:** a wrong number of pieces used (8→2, 3→1), lighting or feeding every campfire instead of the one here (test „lighting and feeding land on the campfire of the character's tile alone”), a cap on feeding (1000→1019), feeding refusing an extinguished campfire at its end, eating above 100, warmth starting in the minute of lighting, „Idź — ognisko” toward a farther campfire or allowed on a campfire's tile.
- **Mutations no test catches:** the order in which fuel is chosen when two items are fuel. The data holds one fuel, so this cannot be tested with today's data.

## Reaches beyond the dispatch

- `tests/invariants/test_walk_feasibility.py:270-315` — to understand the failure above.
- `tests/invariants/test_simulation_inputs.py:1-90` — to learn whether a new exported function must be listed there. It is not: unlisted exports are called with the pool of values.
- `foundations/part_map.md` (grep `tests/sim`) — to confirm that the new test file is claimed by a part (`tests/sim/**`).
- `tests/sim/world.test.mjs`, `tests/sim/actions.test.mjs`, `tests/sim/data.test.mjs` (excerpts), and a grep of `tests/` for lists of `ACTIONS` keys — to find tests that list action kinds and to follow their patterns.

## Choices made (way rejected; cost if wrong)

1. **All six kinds take no target.** The simulation picks the campfire (the one here, or the nearest) and the piece (`itemFor`, first in `ITEMS` order).
   - Rejected: targets such as „Zapal” with campfire or item, or „Zjedz” with an item. The slice says the simulation chooses the piece, and `status-row.ts` (outside this slice) appends a target name only for `walkTo`.
   - Cost if wrong: if the player must later pick which food or what to light, these kinds gain a target and the closed-lists test and editor change with them. No saved programs exist yet.
2. **„Idź — ognisko” is its own kind `walkToCampfire`**, not `walkTo` with a campfire target.
   - Rejected: the latter, because `status-row.ts` reads `RESOURCES[action.resource]` for `walkTo`.
   - Cost if wrong: the editor shows „Idź” and „Idź — ognisko” as two options.
3. **Status texts** (written by me, after the existing texts; for the human to see in the request): „Idzie do ogniska”, „Wytwarza ognisko”, „Zapala ognisko”, „Zapala patyk”, „Zasila ognisko”, „Je jagodę”. Each names its object, because these kinds take no target and Slice 11 appends names only for actions that take one.
4. **Labels and status texts are literal Polish strings in `actions.ts`.**
   - Rejected: building them from `CAMPFIRE.name` or `ITEMS`, because the status texts need declined forms.
   - Cost: „ognisko”, „patyk” and „jagoda” stand twice in the data.
5. **At the end of an action, each effect checks again that what it needs is still there, and changes nothing where it is not**, as gathering does. Only feeding can meet a changed campfire, and it lands whatever the campfire's minutes are.
6. **Unrestricted by the task, so left feasible:**
   - lighting a stick where another stick already burns or beside a campfire — each piece warms and the cap holds (`world.ts`);
   - eating at satiety 100 — the task makes eating infeasible only without food.
7. **No new events.** The effects show in the state. The spec leaves the events to me.

## Adaptations (section 4)

- `src/browser/sim/body.ts` is not in the slice's *Change* list. I added `eatenBody` there so that the six-place rounding of satiety (spec, *Decimal exactness*) stays in the one body module, rather than duplicating `decimal` in `run.ts`.
- `RunView` (`program.ts`) gains `campfires`, which the feasibility of the campfire actions reads.
- `campfireHere` stays private to `program.ts`.

## Changed invariant test

`tests/invariants/test_program_closed_lists.py`:
- `ACTION_KINDS` lists the six new kinds;
- `VALID` holds a rule of each new kind;
- `UNLISTED_ACTION_KINDS` gains near-miss names (`craft`, `light`, `feed`, `Eat`, `lightcampfire`, `walkToFire`).

I saw it fail first (exit 1, tripwire) and then pass (exit 0). Its CRLF line endings in the worktree are kept.

## Problems observed

- `test_walk_feasibility.py` fails on the slice base and after it, with the same message (evidence above).
  - Guessed cause, not verified: the case sets a berry tile to 0 and advances to minute 120. That is a multiple of the berry's 40-minute renewal (Slice 6, D-60), so the tile gets a piece back and "zero here" never comes about.
  - The spec's *Constraints* name this test among those to adapt.
- The docstring of `tests/invariants/test_simulation_inputs.py` says its programs use "every action kind", but its `ACTIONS` list holds only explore, wander and walkTo — not `gather` (Slice 7) and not the six kinds of this slice. The test passes. The file is not in my *Change* list, so I left it.
