### Slice 2 — hex geometry and nearest tile

- **Goal:** `src/browser/sim/hex.ts` gives the coordinate conversion, neighbours in tile-list order,
  hex distance, the nearest qualifying tile by minutes of walking with its first step, centres,
  corners and the tile label of spec § 4.3 and § 4.5 (assumption A2).
- **Change:** `src/browser/sim/hex.ts` · `tests/sim/hex.test.mjs`
- **Read:** `.runs/task-cycles/mag-w-lesie/spec.md`
- **Also reads (made by earlier slices, not measured):** `src/browser/sim/types.ts`,
  `src/browser/sim/data/maps.ts`
- **Reads outside the repository:** loop's `src/sim/terrain.test.ts` and `src/sim/movement.test.ts`.
- **Checks:** the failing test first: `tests/sim/hex.test.mjs` (spec § 9.1 hex); then
  `npm run typecheck`; `npm test` (count grew); the invariant tests as in Slice 1.
- **Depends on:** Slice 1

