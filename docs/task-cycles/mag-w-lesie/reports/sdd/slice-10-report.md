# Slice 10 report — terrain panel, tile list and README

Status: DONE · Commits: `5ded019` feat(view): terrain panel drawing and the list of revealed tiles, linked by hover · `b319b5f` docs: describe the game page, the icons in assets/icons and the footer credits

## Implemented

- `src/browser/view/tile-list.ts`
  - `tileList(state)` (pure, no DOM): `{ columns, rows }`. Columns = resources of `MAPS[run.mapId].resources` in the map's order, each `{ resource, name, href }` with the name from `RESOURCES` and `href = /icons/<icon>.svg`. Rows = revealed tiles only, in tile-list (row-major) order, each `{ col, row, label: tileLabel(tile), cells }`, a cell being the stock as text or „—” where the tile lacks the resource (C4, C5). No run → `{ columns: [], rows: [] }`.
  - `tileKey(tile)` → `"col,row"`, the key tying a drawn tile to its row.
  - `createTileListView(onHover)`: a `<table class="tile-list">`; header row = empty cell + per column the icon `<img>` (16 px, `alt=""`) and the name; body rows `tr[data-tile]` with a `th` label and `td` cells. Hover is delegated to the table (`pointerover` → closest `tbody tr[data-tile]`, `pointerleave` → null), so it survives redraws.
- `src/browser/view/terrain-panel.ts` — `createTerrainPanel()` → `{ element, update(state) }`:
  - draws `terrainPicture(state)` into one `<svg>` with `document.createElementNS`: per tile `<g data-tile class="tile [revealed]">` with the polygon and an SVG `<image>` per icon (`href` from the picture, class `dimmed` at stock 0); outline polygons (`character`, `step-target`) drawn in a layer on top of all tiles, `pointer-events: none`; a 4 px margin in the viewBox keeps the thick stroke visible at the edges;
  - no click handler anywhere; hover is delegated to the `<svg>` (`pointerover`/`pointerleave`);
  - the hovered key is the only view-local state; it lives in the panel's closure, is re-applied (`.hovered` class on tile group and row) after every redraw, and is cleared when the run disappears;
  - `update` skips the redraw while `state.run` is the same object as at the previous draw. Verified in `src/browser/sim/game.ts:143-168`: `passRealTime` returns `advanceMinutes(carried, 0)`, which returns `{ state }` with `run` unchanged when no whole minute passed; only a stepped minute, send, restart or end produce a new `run`.
- `src/browser/view/app.ts` — the placeholder `div.terrain-panel` replaced by `createTerrainPanel()`; `renderMapColumn` calls `terrainPanel.update(state)` after the status row.
- `src/browser/index.html` — inline styles: panel as a wrapping flex row (drawing, list beside it); unrevealed tiles `#34332e` (dark), revealed `#dfe7cf` (lighter); hovered tile/row tint; dimmed icon `opacity: 0.3`; character outline amber `#e3a008`, width 4; step target amber, width 2, dashed `5 4`; list with tabular numbers.
- `README.md` (Polish) — describes the program panel, sending „Mag żywiołów” to Las, the status row and its buttons, the terrain panel and the list (hover link, no clicks), the footer credits; a section on icons (`assets/icons` outside the served directory, copied by `npm run build` to `dist/public/icons`, authors and source commit in `src/browser/view/credits.ts`); keeps all commands; updated the in-browser check paragraph; still says „Kod przeglądarki jest w `src/browser`”.

## TDD evidence

- RED 1: `tests/view/tile-list.test.mjs` written first; run against no module → `ERR_MODULE_NOT_FOUND` (an error, not a failure), so a stub `tileList` returning `{ columns: [], rows: [] }` was added.
- RED 2 (stub): 1 pass („a game without a map run has no columns and no rows” — the stub's value happens to be correct there), 4 fail with assertion errors: columns (expected the four resources with names/hrefs), row labels `['(1, 0)', '(0, 1)', '(1, 1)']`, cells `[['12','—','6','—'], ['—','—','—','—'], ['—','0','—','6']]`, entrance row count 1.
- GREEN: implemented `tileList`; 5/5 pass. Then the DOM builders were added (not unit-testable in Node without a browser; they are covered by the HTTP checks and the unchecked in-browser list below).
- Test fixtures are hand-built tiles with literal expectations (labels, cells, names, hrefs), plus one integration case through `send` + `advanceMinutes(…, 20)` (exploring reveals the entrance `(1, 1)`).

## Tests and results

- `npm run typecheck` — passes.
- `npm test` — 150 tests, 150 pass, 0 fail (baseline at `4366b8c`, measured by stashing this slice: 145).
- `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl` — 44 tests, OK (no port-3000 rerun needed).
- Format guards (no foundation file changed by this slice; run for the contract): part map 0 errors (1 unchecked: dependency graph); invariants 0 errors; decisions 9 errors, all `merge of <request link>` placeholders (D-03/2, D-09/1, D-10/1 … D-16/1) — the expected ones.
- `rules.test.mjs` S1/S2 scans (in `npm test`) pass: no map/resource/archetype id or name in the new view code.
- Importing `dist/public/view/terrain-panel.js`, `tile-list.js`, `app.js` in Node succeeds — no DOM touched at import.

## HTTP checks (`npm run dev`, server stopped afterwards, port 3000 free)

| Path | Result |
|---|---|
| `/` | 200 text/html, holds the new styles (`terrain-drawing` 9×) |
| `/main.js` | 200 text/javascript |
| `/view/terrain-panel.js` | 200 text/javascript, imports `./terrain-picture.js`, `./tile-list.js` only |
| `/view/tile-list.js` | 200 text/javascript |
| `/view/terrain-picture.js`, `/view/app.js` | 200; `app.js` creates and updates the terrain panel |
| `/icons/wood-stick.svg`, `/icons/flax.svg` | 200 image/svg+xml |

## Unchecked (no browser automation in this cycle)

The in-browser checks of task items 1–8 are **unchecked**:
1. Map Las 4 × 4 with entrance (1, 1), step 5 min and its resources, as seen in play.
2. Sending the one character „Mag żywiołów” to Las.
3. Layout drawn at the start; „Restart” restores the same layout from minute 0; „Zakończ” returns to sending; a new send gives a new layout.
4. Program panel editing before and during a run; change effective from the next free minute; program kept across „Restart”/„Zakończ”.
5. The character acts only by the program.
6. Exploring 20 min reveals the tile; moves; „Idź” towards the nearest known tile.
7. Terrain panel: whole rectangle from minute 0, dark unrevealed / lighter revealed tiles with icons and no numbers, dimmed icon at stock 0 (not reachable in play today — stock never changes before task 4), thick amber outline on the character's tile, dashed one on the step target, the list beside it with stock and „—”, hover tile ↔ row both ways, no click effect, status row above; hover highlight surviving the 200 ms ticks and minute redraws.
8. One game minute per real second; pause and resume.
Also unchecked: browser console free of errors; the visual look (colours, icon contrast of the white-on-black icons on light tiles, layout at narrow widths).

## Files changed

- `src/browser/view/terrain-panel.ts` (new)
- `src/browser/view/tile-list.ts` (new)
- `src/browser/view/app.ts`
- `src/browser/index.html`
- `tests/view/tile-list.test.mjs` (new)
- `README.md`

## Self-review

- Brief's Change list respected; no other files written (besides this report). Commits by explicit paths.
- D-09/1: no click handling; numbers only in the list; hover is the only interaction, both ways. D-04/3: the panel only reads the state passed in; no game state kept by the view; hover key is view-local state only. D-08/1 / S2: columns, names and icons come from `MAPS` and `RESOURCES`; the only literals are the SVG namespace, class names, „—”.
- Redraw skip keyed on `state.run` identity, as required; verified against `game.ts`.
- Edge: hovering an unrevealed tile highlights only the tile (it has no row) — consistent with the list holding revealed tiles only.
- The list's first header cell is empty: the spec gives no heading text for the label column, so none was invented.

## Concerns

- The dimmed-icon state cannot be seen in play until task 4 changes stock; only `terrainPicture`'s test (Slice 7) covers it.
- The thick outline is drawn as a top-layer polygon, so it is not covered by neighbours; whether its look matches „gruby bursztynowy obrys” is a visual judgement left to the in-browser check.
