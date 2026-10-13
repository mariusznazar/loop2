### Slice 7 — the terrain picture

- **Goal:** `terrainPicture(state, size)` in `src/browser/view/terrain-picture.ts` is a pure
  function giving the SVG size and, per tile, its polygon, whether it is revealed, its resource
  icons with positions and dimming at stock 0, and its outline (`character`, `stepTarget` or
  none), as spec § 5 describes; it holds no numbers of stock.
- **Change:** `src/browser/view/terrain-picture.ts` · `tests/view/terrain-picture.test.mjs`
- **Read:** `.runs/task-cycles/mag-w-lesie/spec.md` · `foundations/decisions.md` ·
  `foundations/part_map.md`
- **Also reads (made by earlier slices, not measured):** `src/browser/sim/types.ts`,
  `src/browser/sim/hex.ts`, `src/browser/sim/game.ts`, `src/browser/sim/data/resources.ts`
- **Checks:** the failing test first: `tests/view/terrain-picture.test.mjs` (spec § 9.2: 16 tiles
  from minute 0, no icons on unrevealed tiles, one icon per resource present, dimmed at stock 0,
  the two outlines); then `npm run typecheck`; `npm test` (count grew); the invariant tests as in
  Slice 5.
- **Depends on:** Slice 5 · Slice 6 · foundation step 2 (part map) · D-04 new version · Row 1 ·
  "Where does the game's content live?"

