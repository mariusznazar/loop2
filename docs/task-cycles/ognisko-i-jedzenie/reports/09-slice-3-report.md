# Slice 3 report — content data

**Status:** done. **Commit:** 7a273ae (base 6a443ee).

## Files (added/removed lines)
- src/browser/sim/data/maps.ts +3/-0 (`ambientTemperature`, Las 25)
- src/browser/sim/data/balance.ts +18/-0 (`gatherChance` 0.7; `body` block: start values = caps, cooling, satiety loss, thresholds, health loss/regain)
- src/browser/sim/data/items.ts new (`ItemDef`, `ItemId = ResourceId`, `ITEMS`: stick fuel 20 + lightable 3 min/0.15; berry food 25; moss, fiber no use; names taken from `RESOURCES`)
- src/browser/sim/data/campfire.ts new (`CAMPFIRE`: ognisko, craft 6 stick, light 2 stick, 60 min, 0.5)
- src/browser/sim/data/traits.ts new (`Traits`, `TRAITS` carryingCapacity 15, not on the archetype)
- tests/sim/data.test.mjs +72/-0

## Checks (command, exit code)
- Tests first: stubs of the 3 new files, `npm run build` 0, `node --test tests/sim/data.test.mjs` exit 1 (7 new tests failed on assertions, 14 passed).
- After the data: `npm run typecheck` 0; `npm run build` 0; `node --test tests/sim/data.test.mjs tests/sim/rules.test.mjs tests/sim/layout.test.mjs` 0; test_content_identifiers.py 0; test_map_run_tiles.py 0; test_quality_invariants.py -k eslint -k prettier 0.
- Extra: `python -B .the-way/elements/common/foundation_check.py` 0 (0 errors).
- Not run: full `npm test` (cycle's run).

## Own-work check
Requirement most likely missed: Las's cooling of 0.024 °C/min and the item uses coming out as the task gives them. Test "cooling in Las is 0.024" derives it from the data against a hand-written literal; the item and campfire tests use literals; the cross-check test shows every item and the campfire's items name items of the data.

## Choices
- Items are keyed by resource ids (`ItemId = ResourceId`), typed `Record<ItemId, ItemDef>` (not `as const`) so optional uses read without union errors; names come from `RESOURCES`. Rejected: separate item names (could drift). Cost if wrong: later slices rename/reshape one file.
- Body numbers live in `BALANCE.body` (one object); start values double as caps, noted in a comment.
- `CAMPFIRE` is `as const satisfies CampfireDef`.
- Mutation thought: a wrong constant is caught by the deepEqual tests; those tests do check the task's numbers, which are decisions of the task, accepted since the slice requires it.

## Reaches beyond dispatch
None. Nothing outside the tests reads the new data. No plan/code mismatches. Known failing base checks (one-serving-process, ruff, shellcheck) not met, as `npm test` was not run.
