# Report — Slice 11 of `ekran-przejscia`

(Saved by the orchestrator from the executor's returned text: the harness refused the executor's own write.)

- **Status:** done with concerns
- **Commit:** `ebce3d3` refactor: :recycle: remove the terrain panel's DOM module and the DOM table of revealed tiles, since the screen moved to React (task item 8, D-265)
- **Check result:** everything passes except the slice's `git grep` check, which exits 0 because of `.terrain-panel` in `src/browser/styles.css:1448` (left, as the orchestrator's note says); with that file excluded it exits 1. The whole gate and `foundation_check.py` not run.

## Files changed (added / removed)
- `src/browser/view/terrain-panel.ts` deleted (0 / 160).
- `src/browser/view/tile-list.ts` loses `createTileListView` and `TileListView` (0 / 71); `tileList`, `tileKey`, `tileLine` and the types stay.
- `tests/view/tile-list.test.mjs` loses the DOM case „on the panel the campfire's icon stands in its tile and the state in the row of the same key” and its stand-in document (0 / 127).
- `tests/invariants/test_browser_view_token_values.py`: `test_control_the_population_is_the_part_less_the_token_file` names `src/browser/view/terrain-drawing.tsx` in place of the removed file (1 / 1).
- `src/browser/kitchen-sink/kitchen-sink.ts`: the comment points at `terrain-drawing.tsx` (1 / 1); the page's code unchanged.
- `tests/invariants/test_terrain_drawing_numbers.py`: docstring-only edit (1 / 1); see Reaches.

## Checks
| Command | Exit |
|---|---|
| `npm test -- tests/invariants/test_browser_view_token_values.py` with `terrain-panel.ts` deleted, control not yet changed: `'src/browser/view/terrain-panel.ts' not found in [...]` | 1 |
| `npm test -- tests/view/tile-list.test.mjs` (15 pass) | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` (4 OK) | 0 |
| `npm test -- tests/invariants/test_terrain_drawing_numbers.py` (3 OK) | 0 |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` (3 OK) | 0 |
| `git grep -n -E "createTerrainPanel\|createTileListView\|terrain-panel" -- src tests` — only `.terrain-panel` at `src/browser/styles.css:1448` | 0 |
| the same with `':!src/browser/styles.css'` | 1 |
| `npm run typecheck` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` (5 OK) | 0 |
| `npm test -- tests/view/world-area.test.mjs` (13 pass; holds the carrying case) | 0 |
| `npm test -- tests/view/run-screen.test.mjs` (7 pass; uses `tile-list.ts`) | 0 |

## Own-work check
- Most likely missed: remove `createTileListView`, keep `tileList`, `tileKey`, the line of a tile, change nothing the screen shows (task item 8).
- `git grep` for importers of `terrain-panel`, `createTileListView`, `TileListView` before removal: only `terrain-panel.ts`, `tile-list.ts` and the removed DOM case; `terrain-drawing.tsx`, `tile-table.tsx`, `world-area.tsx` import only `tileKey`, `tileList`, `tileLine`. Typecheck exit 0: nothing dangling.
- Carrying case `world-area.test.mjs` „the campfire's icon stands in its tile and its state in the row of the same key, and nowhere else”: read and run; asserts one campfire icon (class `icon`, parent tile `1,1`) and the state text in the row of the same key, burning and extinguished.

## Reaches beyond the handoff
- Docstring in `tests/invariants/test_terrain_drawing_numbers.py:24` named `createTerrainPanel()`, which the slice's grep over `tests` must not find; replaced by „the terrain panel's DOM module”; no assertion or code changed; the file is not in *Change*.
- `grep -n coding-browser-module` on `plan.md` (Slice 12 owns the table).

## Concerns
- The grep check cannot exit 1 while `.terrain-panel` stays in the stylesheet.
- `guidelines/coding-browser-module.md:52` still lists `src/browser/view/terrain-panel.ts | do not copy`; line 51 lists `run-screen.ts`, now `run-screen.tsx` — Slice 12's.
- No trust boundary; `saved-game.ts` untouched.

## Reading gaps
- `guidelines/testing.md` and the styleguide read whole with `sed`; rows of the trust-boundary table at lines 130–200 cut to 3000 characters in output (nothing for this slice).

## Choices
- Removed the DOM case instead of porting it (the carrying case exists in `world-area.test.mjs`).
- Docstring edit instead of an unsatisfied grep (prose only).

## Searches not found or unclear
- The slice's grep check cannot exit 1 because of the stylesheet rule.
- Who removes the stale `terrain-panel.ts` row: assumed Slice 12.
