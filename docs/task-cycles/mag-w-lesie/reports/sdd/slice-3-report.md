# Slice 3 report

## Implemented
- `src/browser/sim/random.ts`: `nextRandom` (mulberry32, 0x6D2B79F5 only here), `streamState(seed, 'layout'|'wander')` = fmix32(seed ^ constant), `mixSeed`, private `fmix32`. Stream constants: layout 0x4c41594f, wander 0x57414e44.
- `src/browser/sim/layout.ts`: `drawLayout(map, seed)` -> `{ tiles, entrance }` (entrance axial Hex). Order: tiles row-major; per tile per resource one draw (u < density); minimum guarantee per resource in array order (one draw, floor(u*tileCount), full stock); fixed entrance, no draw.

## Tests
- `tests/sim/random.test.mjs` (8), `tests/sim/layout.test.mjs` (8). `npm test`: 23 -> 39 pass, 0 fail. `npm run typecheck` clean.
- Invariants: 9 fail, all expected (no `dist/public/sim/game.js` yet: action_in_progress, map_run_repeatability, player_map_run_pace, simulation_randomness driven tests). The static scan test of simulation_randomness passes.

## TDD evidence
- RED: `npm test` after writing both tests: `ERR_MODULE_NOT_FOUND ... dist/public/sim/random.js`; tests 25, pass 23, fail 2 (the two new files).
- GREEN: after implementation `npm test`: tests 39, pass 39, fail 0.

## Files
random.ts, layout.ts, random.test.mjs, layout.test.mjs (new).

## Self-review
Minimum guarantee tested both on Las seeds 1-20 and with a near-zero-density map (forces the extra draw path). No map/resource id literals in sim code. Did not read loop's resources.test.ts (the spec states its rule).

## Concerns
- `drawLayout` takes `MapDef` (type from data/maps.ts); entrance returned as axial Hex.
