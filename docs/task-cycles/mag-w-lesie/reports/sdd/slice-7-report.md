# Slice 7 report

Implemented `src/browser/view/terrain-picture.ts`: `terrainPicture(state, size = 24)` pure, returns `{width, height, offsetX, offsetY, tiles[]}`; per tile `col,row,points,revealed,icons[{resource,href,x,y,size,dimmed}],outline`. No run -> empty picture. Icons only on revealed tiles, in resource-data order, 2 per row centred on the tile; outline `character` wins over `stepTarget`. No stock numbers in the output.

Tests: `tests/view/terrain-picture.test.mjs` (8 tests). npm test: 124 tests, 124 pass (baseline 116). Typecheck clean. Invariants: 44 tests OK.

TDD: RED = module not found (ERR_MODULE_NOT_FOUND) before the implementation. GREEN after it; two test fixtures I had wrongly assumed (tiles revealed at minute 0; 200 min of explore revealing many tiles) were corrected in the test, not the code (nothing is revealed at minute 0; the revealed-icons test patches all tiles to revealed in a plain state).

Files: src/browser/view/terrain-picture.ts, tests/view/terrain-picture.test.mjs.

Self-review: no content ids/names in view code; no DOM; imports only from sim/. Concern: icon layout (0.7*size squares, 2 per row) is my choice, Slice 10 may adjust.
