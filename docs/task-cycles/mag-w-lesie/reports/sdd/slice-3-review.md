### Spec Compliance

- ✅ Spec compliant. Checked line by line against § 4.4 and § 9.1 (random, layout):
  - `random.ts:94-100` is the standard mulberry32 step, with `(state + 0x6d2b79f5) >>> 0`, a value in [0, 1) and the new state as a uint32.
  - `random.ts:103-105` is `fmix32(seed ^ STREAM_CONSTANT[stream])`. The two constants are distinct (`random.ts:77-80`), and `Stream` is `'layout' | 'wander'`.
  - `random.ts:83-91` is the MurmurHash3 finaliser with the correct constants and a `>>> 0` result.
  - `random.ts:108-112` is `mixSeed` exactly as specified, with lo = realMs mod 2^32 and hi = floor(realMs / 2^32). The XOR and `+` operators wrap through ToInt32, and `fmix32` normalises with `>>> 0`.
  - `layout.ts:39-51` builds the tiles row-major, each with `revealed: false`, `stepMinutes: map.stepMinutes` and `stock: {}`.
  - `layout.ts:53-57` draws per tile, per resource in array order, once each, and uses `u < density`.
  - `layout.ts:59-63` applies the minimum guarantee for density > 0 resources that no tile has, in array order, with one draw and `floor(u * tiles.length)`, and gives the tile the full stock.
  - `layout.ts:65` returns the fixed entrance with no draw.
  - `layout.ts` has no map, resource or archetype id literal. `random.ts` is the only file with 0x6d2b79f5.
- ⚠️ Cannot verify from the diff:
  - The `MapDef` and `Tile` shapes: `entrance.col/row` and `resources[].density/stock/id`. The report says typecheck is clean. The controller should confirm that the entrance type in `MapRun` (Slice 4/5) expects an axial `Hex`.
  - The invariant scan `tests/invariants/test_simulation_randomness.py`. The report says it passes. Nothing in the diff conflicts with it.

### Strengths
- `random.ts` is small and pure, and a single fmix32 is shared by `streamState` and `mixSeed`.
- `drawLayout` keeps its generator state in a local closure, so the layout stream state is not kept (spec § 4.4), and it does not mutate `map` (`layout.test.mjs:189-193`).
- Tests check real behaviour, with no mocks:
  - minimum guarantee on seeds 1-20 with the real Las map (`layout.test.mjs:165-172`);
  - the forced-draw path with density 0.0001 (`layout.test.mjs:174-182`);
  - zero density is never placed (`layout.test.mjs:184-187`);
  - the high part of `realMs` matters (`random.test.mjs:257-259`).
- The tests read the map data rather than hardcoding ids (S2).

### Issues

#### Critical (Must Fix)
None.

#### Important (Should Fix)
None.

#### Minor (Nice to Have)
- `tests/sim/random.test.mjs`, `tests/sim/layout.test.mjs`: no test pins the exact algorithm or draw order. Every assertion is relational (deterministic, in range, differs). A change to the mixing, to the draw order of steps 2-3, or to the stream constant would pass all tests, while the draw order is declared a contract and saved or replayed layouts would silently change. Fix: add one golden test, for example the first values of `sequence(streamState(1,'layout'), 3)`, `mixSeed(1, 1000)`, or the stock of a fixed `drawLayout(map, 1)`. Compute the values once with the standard mulberry32 and keep them as literals.
- `layout.test.mjs:174-182`: the test does not assert that the guarantee path actually ran. With density 0.0001 it is practically certain but not proven. Optionally compare against a layout of the same seed with the guarantee-free count, or assert that each resource lands on exactly one tile.
- `layout.test.mjs:160-163`: the "other seed gives other tiles" check uses seeds 1 and 2 as the spec asks, fine. There is no test for a seed above 2^31, where `seed ^ constant` goes through a signed int. The code handles it via `>>> 0` in `fmix32`, so this is only a coverage gap.

### Assessment

**Task quality:** Approved

**Reasoning:** The implementation matches the § 4.4 formulas and draw order exactly, keeps S1/S2 (pure, no id literals, the only mulberry constant in `random.ts`), and its tests exercise real behaviour including the minimum guarantee. The only gap is the absence of golden-value tests that would pin the contracted draw order against silent change.
