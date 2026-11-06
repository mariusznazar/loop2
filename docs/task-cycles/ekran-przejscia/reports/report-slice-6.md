# Report — Slice 6, `ekran-przejscia`

(Saved by the orchestrator from the executor's returned text: the harness refused the executor's own write.)

- **Status:** done with concerns (wording and class-name choices below; no screenshot)
- **Commit:** `eca76c8` (base `05cef64`), one commit, not pushed; working tree clean.
- **Check result:** nothing failed. Whole gate not run (the cycle's). No screenshot: nothing renders `WorldArea` until Slice 9.

## Files changed
| File | Added / removed |
|---|---|
| `src/browser/view/terrain-drawing.tsx` (new) | +115 / 0 |
| `src/browser/view/tile-table.tsx` (new) | +82 / 0 |
| `src/browser/view/world-area.tsx` (new) | +111 / 0 |
| `src/browser/view/tile-list.ts` (adds `tileLine`) | +26 / 0 |
| `src/browser/styles.css` (three rules) | +24 / 0 |
| `tests/view/world-area.test.mjs` (new, 13 cases) | +671 / 0 |
| `tests/view/tile-list.test.mjs` (7 new cases, one import changed) | +77 / 1 |

## What was made
- `TerrainDrawing({ state, hovered, onHover })`: the same SVG as `terrain-panel.ts`: tiles `g[data-tile]` with `tile`, `revealed`, `hovered`; icons `icon` or `icon dimmed`, the campfire's always `icon`; outlines (`outline character`, `outline step-target`) after all tiles; `outline link-highlight` last. Handlers only `onPointerOver` (closest `[data-tile]`, else null) and `onPointerLeave`; no click, no text.
- `TileTable({ state, hovered, onHover })`: today's classes (`tile-list`, `tile-fire`), `tr[data-tile]` marked `hovered`; a row reports its key; the head or leaving reports null; nothing without a map run.
- `tileLine(state, hovered)` in `tile-list.ts`: a revealed tile reads `"(1, 0): patyk 12 · jagoda — · mech 6 · włókno —"` from `tileList`'s row; a tile not revealed gives its label alone, e.g. `"(0, 0)"`; nothing hovered, or a key naming no tile, gives the character's tile; null without a map run; nothing of the campfire (D-70).
- `WorldArea({ state, hovered, onHover })` in order: `img.scene`; `p.combat-line` only with `lastCombat`; the deposit `p.trip-result`; the settlement `p.trip-result` (`danger` when it took progress); `div.body-row` (`p.body-text` with `span.body-value`, `danger` below threshold, and `p.backpack-text`); the solved-map line `p.trip-result`; `p.run-practice`; the preview `p.trip-result`; `div.world-drawing` with the drawing; `p.tile-line`.
- Scene constants in `world-area.tsx`: `SCENE_SCALE = 2`, `sceneSize(scale)` (336 × 152 for 1, 672 × 304 for 2); `img` `src="/sprites/forest-scene.png"`, `alt=""`, width and height from `sceneSize(SCENE_SCALE)`.
- CSS: `.scene` block, `max-width: 100%`, `height: auto`, `image-rendering: pixelated`; `.world-drawing` `margin-top: var(--space-m)`; `.tile-line` `text` colour, tabular numbers, `margin: var(--space-xs) 0 0`. Existing tokens only.

## Checks run
| Command | Exit |
|---|---|
| `npm test -- tests/view/tile-list.test.mjs`, stub returning null: 6 of 7 new cases failed on assertions | 1 |
| same, after | 0 (16 pass) |
| `npm test -- tests/view/world-area.test.mjs`, stubs: 13 of 13 failed (`TypeError` or `expected X, got []`) | 1 |
| same, after (the no-map-run case first failed; `tile-table.tsx` fixed) | 0 (13 pass) |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 |
| `npm run typecheck` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 |
| `npx eslint --max-warnings 0` on the six changed code and test files | 0 |
| `npx prettier --no-config --no-editorconfig --ignore-path .gitignore --check` on them and `styles.css` | 0 |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 |
| `npm test -- tests/invariants/test_terrain_drawing_numbers.py` | 0 |

## Own-work check
- Requirement most exposed: one hovered tile links the drawing, the line and the table in another area; hovering the drawing's only interaction (D-19, task item 5); the key lives in the screen.
- Check: a `Screen` host in the test holds one `useState` key for `WorldArea` and, in a separate `div`, `TileTable`; `pointerover` on a polygon, an icon and a row cell, `pointerout` on the drawing and the table. Showed: tile and row marked with the same key; the line `(1, 0): patyk 12 · jagoda — · mech 6 · włókno —`; the highlight polygon last in the SVG; leaving returns the line to the character's tile; a click changes nothing; the drawing's text stays `""`.
- Mutations run and reverted, each caught: settlement `danger` dropped; campfire icon `dimmed`; row `hovered` dropped; table `onPointerLeave` dropped; `closest("[data-tile]")` replaced by a direct attribute test (2 cases).
- UI: states covered in code and tests; screenshot unchecked (nothing renders `WorldArea` yet); jsdom proves no real `pointerleave`, focus or layout (D-88); `.scene`, `.world-drawing`, `.tile-line` seen in no browser — Slice 9 must cover them.

## Choices (rejected way, cost if wrong)
1. Line text `"(col, row): <resource> <cell> · …"`, `—` for an absent resource, `0` for a used-up one; no passage gives the wording; rejected a prefix such as „Kafelek (1, 0)”; one string and expected texts to change.
2. A key naming no tile counts as none hovered; rejected null (no line after a restart that kept a stale key).
3. Props `{ state, hovered, onHover }` for all three; `terrainPicture`, `tileList` computed in render without `useMemo`, so Slice 7 can pass a game state to `TerrainDrawing`.
4. Size switch `sceneSize(scale)` plus `SCENE_SCALE`, no scale prop (one place, as Slice 9 asks); scale 1 tested through `sceneSize(1)`.
5. `div.world-drawing` wrapper for the top margin; `.terrain-drawing`, `.terrain-panel` untouched while the DOM panel stays.
6. The body-row separator `" · "` repeated in `world-area.tsx` (not exported from `body-row.ts`, outside *Change*) until Slice 10.
7. Each body value has an extra outer `span` (React's keyed wrapper for the separator).
8. DOM cases in `body-row.test.mjs`, `combat-line.test.mjs`, `tile-list.test.mjs:289` left for Slice 10.

## Reaches beyond the dispatch
- A grep of `plan.md` (Slice 7 and Slice 9 expectations); `src/browser/view/run-header.tsx`, `tests/view/run-header.test.mjs:1-120`; `tests/view/trip.test.mjs` fixtures; `src/browser/styles.css`, `src/browser/tokens.css`.

## Trust boundary
None touched; no file in `assets/sprites/` or `src/browser/sim/saved-game.ts` changed; no build step changed.

## Gaps
All guideline files read whole; `guidelines/testing.md` with `sed -n` and `cut -c`, line 169 (8098 characters) in two pieces. `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `ui_check.md` read whole.

## Searches not found or unclear
- The wording of the line of a tile: no passage gives it (choice 1).
- A fresh map run has no revealed tile, the character's included, so the line then reads just `(1, 1)`; the plan does not say whether intended; one rule kept for every unrevealed tile.
- No passage fixes the class names (`world-area`, `scene`, `world-drawing`, `tile-line`); Slice 9 may rely on `.world-area` and `.scene`.
