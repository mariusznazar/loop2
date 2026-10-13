# Slice 4 report — program choice, actions and the minute step

Status: DONE · Commit: `92143f3` feat(sim): choose activities by program and step a map run by the game minute

## Implemented

`src/browser/sim/program.ts`
- `conditionHolds(run, map, condition)`: `always` holds; `hereBelow(R, N)` holds iff the stock of R on the character's tile is < N, the stock counted 0 when the tile is unrevealed or lacks R (so N = 0 never holds).
- `actionFeasible(run, map, action)`: explore iff the character's tile is unrevealed; wander iff the tile has ≥ 1 neighbour on the map; walkTo R iff `nearestTile(tiles, at, t ⇒ t.revealed && stock[R] > 0)` exists with `minutes > 0`. Never draws.
- `chooseActivity(run, map, program)`: the first rule, in program order, whose condition holds and whose action is feasible → `{kind:'rule', ruleIndex, action}` (the action copied, not aliased); else `{kind:'wait'}`.
- Extra exports: `walkTarget(run, resource)` (the nearest-tile query, shared by feasibility and the start of Idź) and `type RunView = Pick<MapRun, 'tiles' | 'character'>`; the program functions accept that narrower view, so by type they cannot read the generator or the current activity.

`src/browser/sim/run.ts`
- `type GameEvent` — the six kinds of spec § 4.3, discriminated by `kind`: `mapRunStarted {seed}`, `mapRunEnded {}`, `activityStarted {minute, activity, stepTo}`, `activityFinished {minute, activity}`, `tileRevealed {minute, at}`, `moved {minute, from, to}`. This slice emits the last four; `game.ts` (Slice 5) emits the first two.
- `newMapRun(map, seed, program, { mapId, archetypeId })` → `{ run, events }`: `drawLayout`, character on the entrance, minute 0, `wanderRandom = streamState(seed, 'wander')`, then chooses and starts the first activity at minute 0; events `[activityStarted]`.
- `stepMinute(run, map, program)` → `{ run, events }`: `minute += 1`; if it equals `current.endMinute`, applies the finish (explore → tile revealed, `tileRevealed`; wander/walkTo → character on `stepTo`, `moved`; wait → nothing), emitting `activityFinished` first, then chooses and starts the next activity in the same minute with the program passed now (C1), emitting `activityStarted`. Otherwise only the minute changes.
- Start: wait lasts `BALANCE.waitMinutes`; explore `ACTIONS.explore.minutes`; Wędruj draws once from `wanderRandom` and picks `candidates[floor(u × n)]` (unrevealed neighbours if any, else all, tile-list order), lasting the target tile's `stepMinutes`; Idź takes `walkTarget(...).next`, lasting that tile's `stepMinutes`, no draw.
- Pure: inputs never mutated; changed tiles and the character are copied; unchanged tiles are shared between the old and the new run (structural sharing, no mutation).

## Tests and results

- `tests/sim/program.test.mjs` — 11 tests: always holds; hereBelow 0 on an unrevealed tile; hereBelow on a revealed tile incl. a lacking resource; N = 0 never holds; first rule wins; false condition skipped; infeasible action skipped; no rule → wait; a wait lasts 1 minute (`BALANCE.waitMinutes` = 1); feasibility and choice leave the run (incl. `wanderRandom`) unchanged; the chosen action is a copy.
- `tests/sim/actions.test.mjs` — 17 tests: a run starts at minute 0 on the entrance, unrevealed, with `activityStarted`; explore lasts 20, reveals at minute 20, changes no stock, no other tile, emits `activityFinished`, `tileRevealed`; explore not feasible again → wait 20–21; next activity chosen at the finishing minute by the program given then; a program change mid-explore does not interrupt it; Wędruj prefers the unrevealed neighbour (8 seeds); goes to a neighbour when all are revealed; draws exactly once, `candidates[floor(u × n)]`; not feasible with no neighbour; a step lasts the target tile's `stepMinutes` (9), the character stays until it ends, `current.stepTo` is the target throughout, `moved` at the end; Idź gives the first step towards the nearest revealed stocked tile and draws nothing; Idź not feasible on unrevealed / used-up stock; not feasible on the target; Idź by program reaches the stock in `hexDistance` steps; the run never ends by itself (600 minutes); determinism; `newMapRun`/`stepMinute` do not change their inputs (200 minutes).
- `npm run typecheck`: clean.
- `npm test`: **67 pass, 0 fail** (baseline before the slice: 39 — the same command on the earlier files gives `tests 39, pass 39`; grew by 28).
- Invariants `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`: Ran 44, 35 OK, 9 FAIL — all 9 with the same message "`npm run build` placed no dist/public/sim/game.js, so the simulation cannot be driven" (the four checks of the expected interim state until Slice 5). No other failure.
- Forward check (scratch script, not committed): the `test_action_in_progress.py` scenario replayed directly on `newMapRun`/`stepMinute` (seed 12345) gives exactly its expectations: explore 0→20 by rule 1 unchanged through the change at minute 5; at 20 wander by rule 0, 20→25, target ≠ entrance, unchanged through the change at 22; at 25 the character on the target and explore by rule 0, 25→45; controls: PA_HOLDS at 0 → wander 0→5; PA kept → wait 20→21; PA_HOLDS kept → wander at 25.

## TDD evidence

RED — tests written first, before `program.ts`/`run.ts` existed:
```
$ npm run build && node --test tests/sim/program.test.mjs tests/sim/actions.test.mjs
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '...\dist\public\sim\program.js' imported from ...\tests\sim\actions.test.mjs
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '...\dist\public\sim\program.js' imported from ...\tests\sim\program.test.mjs
ℹ fail 2      (exit 1)
```
GREEN — after writing the two modules:
```
$ npm run build && node --test tests/sim/program.test.mjs tests/sim/actions.test.mjs
ℹ tests 28  ℹ pass 28  ℹ fail 0   (exit 0)
```
Because the RED was a missing module rather than a behavioural failure, I checked that the tests can fail by mutating the source and rebuilding (each mutation reverted afterwards):

| Mutation | Result |
|---|---|
| Wędruj ignores unrevealed neighbours | 2 fail |
| hereBelow reads the stock of an unrevealed tile | 1 fail |
| Idź feasible while standing on the target | 2 fail |
| activity starts one minute late | 6 fail |
| Wędruj lasts the map's step instead of the target tile's | 1 fail |
| the finishing minute ignores the program passed in | 7 fail |

After reverting: 28 pass.

## Files changed

- `src/browser/sim/program.ts` (new)
- `src/browser/sim/run.ts` (new)
- `tests/sim/program.test.mjs` (new)
- `tests/sim/actions.test.mjs` (new)

`package.json` needed no change: its `"tests/sim/*.test.mjs"` glob already picks up the two new test files.

## Self-review

- Spec rule S1: both modules import only `./…` files of `sim/`; a grep for DOM/Node/timer/time/randomness names and for `../` imports finds nothing. Randomness only through `random.ts` (`nextRandom`, `streamState`).
- Spec rule S2: no map, resource or archetype id or name as a literal in the sources; the tests take ids from the data modules (`Object.entries(MAPS)[0]`, `Object.keys(ARCHETYPES)[0]`, the map's resources array).
- Feasibility never draws: by type (`RunView` has no `wanderRandom`) and by test.
- D-10/1 and `action-in-progress/1`: `stepMinute` consults the program only at `endMinute`; tested directly and by the forward check.
- D-13/1: the next activity is the first applicable rule, else a wait; there is no entry point to start an action by hand.
- D-15/1: a move is one neighbour step, then the program chooses again; explore reveals the tile, is infeasible on a revealed one, and changes no stock.
- D-16/1: Idź uses `nearestTile` over revealed tiles, counted in walking minutes.
- `_map` is unused in `conditionHolds`/`actionFeasible`; kept for the spec's signature.
- The `!` in the start of Idź relies on `chooseActivity` having checked feasibility on the same tiles in the same call.

## Concerns

1. **`newMapRun` signature.** Spec § 4.3 lists `newMapRun(map, seed, program)`, but `MapRun` needs `mapId` and `archetypeId` and a `MapDef` carries no id. I added a fourth parameter `{ mapId, archetypeId }` and return `{ run, events }` (events `[activityStarted]`, as § 4.6 asks). Slice 5's `send`/`restart` should call `newMapRun(MAPS[mapId], seed, program, { mapId, archetypeId })` and put `mapRunStarted` before the returned events.
2. **`GameEvent` lives in `run.ts`**, discriminated by `kind`; `game.ts` should import it from there.
3. **Event order within a finishing minute:** `activityFinished`, then `tileRevealed`/`moved`, then `activityStarted`. The spec names the kinds but not their order within one minute; this order follows the wording of § 4.6.
4. **Extra exports** from `program.ts` beyond the spec's three: `walkTarget` and `RunView`.
