# Report — Slice 5 (carrying capacity and the backpack)

**Status:** done (one concern: see Choices)

**Commit:** dfe814a6a65c6f5f2b4ced8eb5b8e5c13e9520a1 (base 46ec64d)

**Files (added/removed lines):** src/browser/sim/character.ts +25 (new) · src/browser/sim/game.ts +19/-6 · src/browser/sim/run.ts +13/-2 · src/browser/sim/types.ts +15/-2 · tests/sim/traits.test.mjs +115 (new)

## Checks (command, exit code)
- Test first: with `newTraits` temporarily returning capacity 0, `npm run build` 0, `node --test tests/sim/traits.test.mjs` exit 1 (assertions failing). Restored before commit.
- `npm run build` 0 · `node --test tests/sim/traits.test.mjs` 0 (9 pass) · `npm run typecheck` 0
- `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` 0 (193 pass)
- `test_restart_seed.py`, `test_map_run_repeatability.py`, `test_simulation_inputs.py` (unittest discover -s tests/invariants -p <file>) each 0
- `tests/quality test_quality_invariants.py -k eslint -k prettier` 0
- `python -B .the-way/elements/common/foundation_check.py` 0 (0 errors)
- Not run: full `npm test` (the cycle's run); the three known failing checks not met.

## Own-work check
Requirement most likely missed: "restart keeps the traits of the replaced run's character" and "backpack empty at every map run". Tests: restart of a run with capacity 4 keeps 4 (cap 4); restart of a run with 6 of one item gives an empty backpack; two sent runs do not share a backpack object; newMapRun without the argument gives a new character's traits. Mutation in head: restart passing newTraits() instead of the run's traits fails the capacity-4 test.

## Choices and adaptations
- `Traits` type already existed in `data/traits.ts` (Slice 3); `types.ts` re-exports it (like ArchetypeId) instead of redefining it.
- `Backpack = Record<ItemId, number>`, all items present at 0. `MapRun.character` is now `Character` = {archetypeId, at, traits, backpack}. Concern: the backpack sits inside `character` as the plan says, but `tests/sim/actions.test.mjs:115` compares `character` across minutes; it passes now, and will break in the slice where gathering changes the backpack (Slice 7) unless that test is adapted. Alternative (rejected, plan says character): backpack beside `body` on MapRun.
- Helpers in `character.ts`: `newTraits()`, `newBackpack()`, `backpackCount(backpack)`, `backpackCap(character)` (takes anything with `traits`).
- `newMapRun` gains an optional 5th argument `traits` (default `newTraits()`), copied into the run. `startRun` in game.ts gains a `traits` parameter; `send` passes `newTraits()`, `restart` passes `run.character.traits`.

## Reaches beyond the dispatch
None beyond reading run.ts, game.ts, types.ts, body.ts, data files, guidelines, tests/sim/actions.test.mjs:100-125, body.test.mjs head.

## Problems observed
None. The view reads only `run.character.at` and `archetypeId`; unaffected (typecheck 0).
