### Slice 3 — seeded generators and the drawn layout

- **Goal:** `random.ts` gives the mulberry32 step, the per-stream generator states and `mixSeed`
  of spec § 4.4; `layout.ts` draws the tiles of a map from a seed in the contracted order with
  the minimum guarantee and the fixed entrance.
- **Change:** `src/browser/sim/random.ts` · `src/browser/sim/layout.ts` ·
  `tests/sim/random.test.mjs` · `tests/sim/layout.test.mjs`
- **Read:** `.runs/task-cycles/mag-w-lesie/spec.md`
- **Also reads (made by earlier slices, not measured):** `src/browser/sim/types.ts`,
  `src/browser/sim/data/maps.ts`, `src/browser/sim/data/resources.ts`, `src/browser/sim/hex.ts`
- **Reads outside the repository:** loop's `src/sim/resources.test.ts`.
- **Checks:** the failing tests first: `tests/sim/random.test.mjs` and `tests/sim/layout.test.mjs`
  (spec § 9.1 random and layout, minimum guarantee for seeds 1–20); then `npm run typecheck`;
  `npm test` (count grew); the invariant tests as in Slice 1.
- **Depends on:** Slice 2 · `simulation-randomness/1` · term `map run`

