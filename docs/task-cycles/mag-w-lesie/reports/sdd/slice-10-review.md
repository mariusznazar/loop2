# Slice 10 review — terrain panel, tile list and README (4366b8c..b319b5f)

### Spec Compliance

- ✅ Spec compliant. Every file the brief's *Change* names has its hunk, and no other file changed (diff stat: `README.md`, `src/browser/index.html`, `src/browser/view/app.ts`, `terrain-panel.ts` (new), `tile-list.ts` (new), `tests/view/tile-list.test.mjs` (new)).
  - Drawing through `document.createElementNS`: `src/browser/view/terrain-panel.ts:5` (SVG_NS), `:15-19` (`svgElement`), `:30` (the `<svg>`). It draws every tile of `terrainPicture` (the whole rectangle from minute 0), a polygon per tile and an SVG `<image>` per icon (`:58-74`), with class `dimmed` at stock 0 (`:71`). It draws no text, so no numbers appear on the drawing (D-09/1).
  - Outlines sit in a top layer with `pointer-events: none` (`terrain-panel.ts:77-81`; `index.html:72`). The character outline is amber `#e3a008`, width 4 (`index.html:73`). The step target is amber, width 2, dashed `5 4` (`index.html:74`). `'stepTarget'` from `terrain-picture.ts:25` maps to class `step-target` (`terrain-panel.ts:80`).
  - No click handler anywhere in the diff. Hover is the only interaction and it works both ways: tile → row through `pointerover`/`pointerleave` on the `<svg>` (`terrain-panel.ts:36-40`), and row → tile through `pointerover`/`pointerleave` on the `<table>` (`tile-list.ts:77-81`). Both feed one `setHovered`/`markHovered`, which toggles `.hovered` on every `[data-tile]` (`terrain-panel.ts:42-52`). The `<g>` and the `<tr>` share the key `"col,row"` (`tile-list.ts:56-58`).
  - Tile list (C4, C5): `tileList` is pure (`tile-list.ts:33-53`). It has one column per resource of the run's map in the map's order, with name and icon from `RESOURCES` (`:36-40`), rows for revealed tiles only in tile-list order (`:41-42`), label `tileLabel` (`:46`) and „—” where the tile lacks the resource (`:8`, `:47-50`). The header shows icon and name (`tile-list.ts:88-97`). The list stands beside the drawing (flex row, `index.html:59-65`). The status row stays above the panel (`app.ts:77`).
  - S2 / D-08/1: no map, resource or archetype id or name appears as a literal in the view code. Columns come from `MAPS[run.mapId].resources` and `RESOURCES` (`tile-list.ts:36-39`).
  - D-04/3: the panel reads only the `state` passed to `update`. The hovered key is its only own state (`terrain-panel.ts:32`). Spec § 3 allows it.
  - Carried from Slice 8, redraw skip and highlight surviving redraws: `terrain-panel.ts:89` returns early while `state.run === drawnRun`, and `:95` re-applies `.hovered` after each redraw.
    - Named risk: the skip could be unsound, or it could never fire. Checked `src/browser/sim/game.ts:143-168`. `passRealTime` with less than a whole minute ends in `advanceMinutes(carried, 0)`, which returns `{ state: carried }`. That state is a new object with the same `run`, so `store.apply` (`app.ts:46-50`) still calls `renderMapColumn`, and the panel skips. `setPaused` and `setProgram` (`game.ts:103-136`) also keep `run`.
    - `terrainPicture` (`terrain-picture.ts:40-84`) and `tileList` read only `state.run` and static data, so a redraw keyed on `run` identity misses nothing.
    - Listener duplication: listeners are attached once, in the constructors (`terrain-panel.ts:36-40`, `tile-list.ts:77-81`). `draw`/`drawPicture` only call `replaceChildren` (`terrain-panel.ts:81`, `tile-list.ts:99-100`), so redraws add no listeners.
  - README (spec § 7): „Strona ma być pusta” is gone (`README.md:13`), and the empty-page check is replaced with what the page shows (`README.md:37`). The panels, the terrain panel and the list are described (`:17-25`). `assets/icons` gets its own section (`:27-29`), and the footer credits are mentioned (`:23`, `:29`). „Kod przeglądarki jest w `src/browser`” is kept (`:41`).
    - Named risk: the invariant tests read README placements. Checked `tests/invariants/*.py`. They depend on `src/browser`, `src/server`, `npm run build`, `npm start` and 127.0.0.1:3000, and the README still names all of them. The report records 44 invariant tests OK.
- ⚠️ Cannot verify from diff (no browser in this cycle; the controller's manual testing step should check):
  1. That the hover tint shows on revealed tiles holding four icons. Four 16.8 px icons in a 2×2 block cover most of a size-24 hex (`terrain-picture.ts:51-64`), and the icons are white shapes on a full black square. Only the tile's rim shows `#f5e9b0` (`index.html:69`), and the amber outlines are drawn over the black squares' edges.
  2. Whether icons flicker once per game minute (see Minor 2).
  3. That the browser fires no stray `pointerleave` on the `<svg>` when the hovered `<g>` is replaced under a stationary pointer. By spec it fires none, and even if one arrived, the next `pointerover` restores the same key.
  4. Console free of errors. The SVG2 plain `href` on `<image>` (`terrain-panel.ts:65`) needs a current browser; that holds for every evergreen browser.

### Strengths

- The split is clean. The pure `tileList` lives apart from the DOM builder (`tile-list.ts:33-53` vs `:70-118`). The list view reports hover through a callback, and the panel owns the one hover key. So both directions run through the same `setHovered`/`markHovered` (`terrain-panel.ts:33`, `:42-52`).
- Delegated listeners on the stable containers (`<svg>`, `<table>`) make the highlight survive redraws without re-binding. Moving between drawing and list is ordered correctly, because the leave of the old container fires before the over of the new one.
- The redraw skip is minimal and verified against the simulation. The comment at `terrain-panel.ts:88` states the real reason.
- Putting the outlines on a top layer with `pointer-events: none` and a 4 px viewBox margin (`terrain-panel.ts:7`, `:55-59`, `:77-81`) avoids both neighbour overdraw and outlines clipped at the edges, and keeps hover targeting the tile underneath.
- Tests use hand-built tiles with literal expectations: hidden tiles skipped, row-major order, „—” vs „0” (C5's reason), and an empty list without a run. One integration case runs through `send` and `advanceMinutes(…, 20)` (`tests/view/tile-list.test.mjs:31-82`). The RED evidence shows assertion failures, not only an import error.
- The hover state is cleared when the run disappears, so an unseen `pointerleave` cannot leave a stale highlight (`terrain-panel.ts:91-92`).

### Issues

#### Critical (Must Fix)

None.

#### Important (Should Fix)

None.

#### Minor (Nice to Have)

1. `src/browser/view/tile-list.ts:39` and `src/browser/view/terrain-picture.ts:67` build the icon URL with the same template `` `/icons/${RESOURCES[id].icon}.svg` ``.
   - Why it matters: a change of the icon path or extension, which the build script also fixes, must be made in two places. If one is missed, the list header and the drawing drift apart without a failing test.
   - Fix: a single `iconHref(resource)` exported from one view module and used by both.
2. `src/browser/view/terrain-panel.ts:56-81` and `src/browser/view/tile-list.ts:86-99` rebuild every SVG `<image>` and every header `<img>` on each new `run`, which happens once per game minute, so once per real second. That includes the header, whose columns change only with the map.
   - Why it matters: image elements created anew are decoded asynchronously in some browsers even from cache, which can show as an icon blink every second. It cannot be judged without a browser.
   - Fix, if the manual check shows a blink: rebuild the `<thead>` only when `run.mapId` changes, and keep the tile `<g>`s, updating their class and icons in place.
3. The carried requirement (skip the redraw when `state.run` is unchanged, keep the highlight through redraws) has no automated check. It lives only in DOM code (`terrain-panel.ts:87-96`). The brief demanded only the pure-function test, and this cycle has no browser, so it rests on reading and on the manual step.
   - Fix (optional): extract the skip predicate, or cover it with a DOM shim, if a later slice adds one.

### Assessment

**Task quality:** Approved

**Reasoning:** The drawing, the list, the two-way hover and the README match spec § 5 and § 7, C4, C5, C6, D-09/1, D-04/3, D-08/1 and S2. The redraw skip is sound against `game.ts` and `app.ts`, and listeners are bound once on stable containers. The remaining points are polish (a duplicated URL template, whole rebuilds each minute) and in-browser checks the cycle's manual step must cover.
