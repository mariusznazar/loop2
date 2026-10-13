### Slice 10 — terrain panel, tile list and README

- **Goal:** the terrain panel draws `terrainPicture` as SVG through `document.createElementNS`
  with no click handling; the tile list beside it shows one row per revealed tile with the stock
  of each resource of the map („—” where absent), columns headed by the icons and names from
  `resources.ts`; hovering a tile highlights its row and hovering a row highlights its tile; the
  list's rows come from a pure function the test checks; `README.md` describes what the page now
  shows instead of the empty page, and names `assets/icons` and the footer credits.
- **Change:** `src/browser/view/terrain-panel.ts` · `src/browser/view/tile-list.ts` ·
  `src/browser/view/app.ts` · `src/browser/index.html` · `tests/view/tile-list.test.mjs` ·
  `README.md`
- **Read:** `.runs/task-cycles/mag-w-lesie/spec.md` · `.runs/task-cycles/mag-w-lesie/task.md` ·
  `foundations/decisions.md` · `tests/invariants/test_browser_view_framework.py`
- **Also reads (made by earlier slices, not measured):** `src/browser/view/terrain-picture.ts`,
  `src/browser/view/app.ts`, `src/browser/index.html`, `src/browser/sim/hex.ts`,
  `src/browser/sim/types.ts`, `src/browser/sim/data/resources.ts`
- **Checks:** the failing test first: `tests/view/tile-list.test.mjs` (rows only for revealed
  tiles in tile-list order, labels `(col, row)`, stock per resource, „—” where absent); then
  `npm run typecheck`; `npm test` (count grew); the invariant tests as in Slice 5 (README still
  places the browser view in `src/browser`); in the running product, the whole check of task
  items 1–8 below.
- **Depends on:** Slice 7 · Slice 9 · Row 1 · "Where does the game's content live?"

