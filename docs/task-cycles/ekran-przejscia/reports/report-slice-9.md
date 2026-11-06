# Report — Slice 9 of the task cycle `ekran-przejscia`

(Saved by the orchestrator from the executor's returned text: the harness refused the executor's own write.)

- **Status:** done with concerns
- **Branch / base:** `task/ekran-przejscia`, base `8bac89d`
- **Commit:** `6c2f520` feat: :sparkles: build the screen of a map run in React with its header over the world, the program with the band and the right area of the table or the rule panel, D-311, D-281, D-282, D-122, D-313
- **Check result:** every check of the slice passed, and the real-browser walk with its screenshots. Not run, as the handoff gives: the whole gate and `foundation_check.py`.

## Files changed
| File | + | − |
|---|---|---|
| `src/browser/view/run-screen.tsx` (new) | 203 | 0 |
| `src/browser/view/run-screen.ts` (removed) | 0 | 105 |
| `src/browser/styles.css` | 51 | 10 |
| `src/browser/view/game-view.ts` | 1 | 1 |
| `tests/view/run-screen.test.mjs` (new) | 417 | 0 |
| `tests/view/account-screen.test.mjs` | 24 | 102 |

## What was made
- Boundary `createRunScreen(panel, controls)` in `run-screen.tsx`: own root on a `section.screen.run-screen` with tabIndex −1; first render synchronous (`flushSync`, the skeleton of the three areas, no game state yet); returns `element`, `update(state, run, events)`, `focus()`; `update` draws from `state.run === run ? state : { ...state, run }` and hands the program panel that same state (D-281).
- View: `RunHeader` (Slice 5) first; under it `div.run-screen-areas[data-scene-scale=SCENE_SCALE]` with three `section.screen-area`: `run-world` holds `WorldArea`; `run-program` holds `DiscoveryBand` above a place for the program panel, which a layout effect appends there and its cleanup removes; `run-right` holds `TileTable` while no rule is open, and always the rule panel's host `div.run-rule-host` given to the panel through `placeRulePanel` (never hidden; empty while closed).
- Open rule panel: `onOpen` sets a small store the view reads with `useSyncExternalStore` (the pattern of `createFolding`); the table is not rendered while open.
- Hover: the hovered tile's key is the screen's `useState`, shared by the drawing, the line and the table.
- Band: „Dodaj regułę z tym” calls `panel.addDiscoveredRule()`; „Wznów” of the band calls `controls.togglePause()`.
- Stylesheet: removed `.screen.columns` and its selector in `@media (max-width: 720px)`, updated the comment of `.screen`; added the grid of `.run-screen-areas` with every layout dimension named in its comment; narrowed `.tile-list` cell padding from `--space-s` to `--space-xs`; `overflow-x: auto` on `.run-right`.

### Layout dimensions (named in the stylesheet comment)
| | Scale 1 (336 × 152) | Scale 2 (672 × 304) |
|---|---|---|
| World column (scene + 2 × 16 px padding + 2 × 1 px frame) | 370 px | 706 px |
| Right column (the scene's width at scale 1) | 336 px | 336 px |
| Gap | `--space-l` (16 px) | same |
| Program at content 1344 px (window 1920) | 606 px | 270 px |
| Program at window 1280 (content 1248) | 510 px | 174 px |
| Program minimum | 170 px | 170 px |
| Window width from which three areas stand side by side | 940 px | 1276 px |
| Below that width | one column: world, program, right | same |

In the right column the rule panel gets 276 px inside the padding and frame; the table of Las measured 279 px with the narrower padding. Measured in headless Chromium: at 1920 world 706 / 370, program 270 / 606, right 336; at 1280 program 174 / 510; below the threshold (1200 at scale 2, 900 at scale 1) one column, every area 1168 / 868; the scene at 672 × 304 and 336 × 152.

## Checks (command, exit code)
| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/run-screen.test.mjs`, stub `createRunScreen` | 1 | 7 of 7 failed on assertions (an earlier version stopped on `TypeError`; changed so every case reaches an assertion) |
| same, first run after the implementation | 1 | 7 failed on React's „not wrapped in act”: the test built the screen outside `act`; now inside `inAct` |
| same | 0 | 7 pass |
| `npm test -- tests/view/account-screen.test.mjs`, before its changes | 1 | 11 failed, each reading the old structure |
| same, after its changes | 1, then 0 | the new no-op click first failed on „not wrapped in act”; wrapped in `inAct`, 126 pass |
| mutation: `act` in `game-view.ts` always calling `saver.moment()`, same command | 1 | the changed no-op case fails; restored |
| `npm test -- tests/view/program-panel.test.mjs` | 0 | 49 pass |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | 4 OK |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 | 3 OK |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 | 9 OK |
| `npm test -- tests/invariants/test_terrain_drawing_numbers.py` | 0 | 3 OK |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 | 3 OK |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | 1 OK |
| `npm run typecheck` | 0 | |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 OK, none skipped |
| `npx prettier --check` on the changed files | 0 | |

## Real-browser walk (D-88, D-254)
`npm run local` at https://127.0.0.1:53105, Playwright CLI 0.1.22, two made-up accounts at `example.test`, window 1920 × 1080 unless named; console 0 errors, 0 warnings. Afterwards `playwright-cli close`, `npm run local:stop` („Local starts stopped: 1”), `.playwright-cli/` deleted.
- First chill: at „Minuta 84 · Eksploruje · Passa 0/480 (pauza)” the band in the program area above the panel; both buttons on one line at a program width of 270 px; the band's text runs to 6 lines.
- „Dodaj regułę z tym”: the copy got rule 1.2 „Zawsze → Eksploruj”, „Reguła 1.2” opened in the right area in the table's place; the focus on the cell „Eksploruj” in „Czynność” inside the right area; the streak 0.
- „Wznów” of the band (second account, new game): „(pauza)” gone and the band gone; 2.5 s later at 1× „Minuta 86”.
- A rule opened from its row: „Reguła 1.1” in the right area, the table gone; „Zamknij panel” brought the table back — at both scene sizes and both window widths.
- Hover: the revealed tile (1, 1) marked its row and the highlight; the hidden tile (0, 0) marked alone, the line „(0, 0)”; pointer away brought back „(1, 1): patyk 12 · jagoda — · mech — · włókno 6”; hovering the row marked the tile. Only one tile revealed in that run, so the browser's line for a hovered revealed tile showed the fallback's numbers; jsdom covers two revealed tiles.
- Header: name and map side by side, the status in the mono font, the buttons aligned right, one line at 1920 and 1280. No cut-plan warning reached, so its place not seen in a browser; `run-header.test.mjs` covers its order.

### Screenshots (`.runs/task-cycles/ekran-przejscia/screenshots/`, ignored by git)
| File | Shows |
|---|---|
| `scene-672x304-window-1920.png`, `scene-672x304-window-1280.png` | the editor with the copy's rules in the program area |
| `scene-672x304-window-1920-rule-panel.png`, `scene-672x304-window-1280-rule-panel.png` | the rule panel open in the right area |
| `scene-336x152-window-1920.png`, `scene-336x152-window-1280.png` | the editor at scale 1 |
| `scene-336x152-window-1920-rule-panel.png`, `scene-336x152-window-1280-rule-panel.png` | the rule panel at scale 1 |
| `scene-672x304-window-1200-narrower.png`, `scene-336x152-window-900-narrower.png` | one column below the threshold |
| `band-first-chill-scale2-1920.png` | the band with both buttons |
| `hover-tile-scale2-1920.png`, `hover-row-scale2-1920.png` | hover from the drawing and from the table |

For scale 1, `SCENE_SCALE` set to 1 locally and built; restored to 2 and built again before the commit: `world-area.tsx:30` reads `export const SCENE_SCALE = 2;`, `git diff` of the file empty.

## Own-work check
- Most likely missed: the focus „Dodaj regułę z tym” sends into the rule panel in the right area (the panel focuses its field in its own layout effect before telling the screen it opened; a host hidden while closed would lose it in a real browser, while jsdom keeps it). Check: after the click in the real browser, `document.activeElement` was the cell „Eksploruj” in „Czynność” inside `.run-right`.
- UI check (`ui_check.md`): screenshots inspected; no shared control changed. Seen: until the character's tile is revealed the table shows its heading row and no rows; at 174 px (scale 2, window 1280) the program area wraps „Zapisz jako nowy program” and the rule rows onto several lines.
- Mutations in the head, each failing a case of `run-screen.test.mjs`: the panel handed `state` instead of the shown state; the band's „Wznów” wired to anything but `togglePause`; `onOpen` ignored; the hovered key kept per component; the band after the panel. The layout effect's cleanup has no case (the screen is never disposed today).

## Changes to existing tests (`tests/view/account-screen.test.mjs`)
| Case or helper | Change | Cause |
|---|---|---|
| „a save builds the game the load gives …” | `run-panel` → `run-screen` | task items 2 and 8 |
| `shownScreen` | `run-panel` → `run-screen` | same |
| `statusTextOf` | `status-text` → `run-header-status` | task items 1 and 8 |
| „each act of the player … one that changes nothing sends nothing” | new no-op act | task item 8: the React header draws nothing without a map run |
| „the screen of a map run gives its program panel the map run it was given …” | moved to `tests/view/run-screen.test.mjs` | the screen moved |
| „on the screen of a map run an open rule panel stands in the place of the table …” | moved to `tests/view/run-screen.test.mjs` | the terrain panel and its host are gone |
- The new no-op act: formerly a click on the unlabelled pause button of the DOM status row in a game with no map run; now the „Wznów” the hidden screen still holds after „Zakończ”; `setPaused` with no map run changes nothing; same path through `act` and its save guard; the hand mutation shows the case still catches a save of an unchanged state.
- The moved „given map run” case gives the given map run another game minute (7), so the header tells the two runs apart (the old check of `Minuta 0` did not).
- `createProgramPanel`, `createRunScreen` and `unpressed` left `account-screen.test.mjs` with the moved cases.

## Choices (rejected way, cost if wrong)
1. Right column 336 px, program minimum 170 px, thresholds 940 / 1276 px. 304 px tried first (program 302 / 206 px as the round counted), but in the browser the table (327 px) overflowed and the rule panel's „Eksploruj” overflowed its cell. A column of the rule panel's width on Programy (~432 px) leaves no program column at scale 2 even at 1344. Cost: four cells to a line in the rule panel at ~66 px each, long names wrap; at scale 2 in a 1280 window the program column is 174 px (the round counted 208). Material for the human's choice of size; a wider right column moves 1276 above 1280.
2. Table cell padding narrowed to `--space-xs` (fixes the screen in the component's own rule); rejected a wider right column.
3. One narrower arrangement below the threshold: one column; rejected a middle step (two more thresholds).
4. The rule host never hidden; the table unmounted while the panel is open.
5. `onOpen` drives a store read by `useSyncExternalStore`; rejected `flushSync` from `onOpen` (React refuses it inside the panel's commit) and toggling `hidden` by hand. Concern: `onOpen` is called from the program panel's layout effect, so the re-render that hides the table is scheduled from another root's effect; the screen's `update` is still called only from event handlers and the clock. A reviewer may read this against D-267 and the handoff's „never from render or an effect”.
6. `data-scene-scale` on `.run-screen-areas`, from `SCENE_SCALE`; the rules of both sizes keyed by it; the correction changes the constant and deletes the `@media` block of the size not chosen.

## Reaches beyond the handoff
- `src/browser/view/game-view.ts` (not in *Change*): removed `runPanel.element.classList.add("screen-area")` — the program area is now the area; the class on the panel would draw a frame inside a frame.
- `src/browser/view/terrain-panel.ts` (how the old layout hid the rule host); `setPaused`, `setPace` in `src/browser/sim/game.ts`, `pickProgram` in `programs.ts`, `closeAwayReport` in `loop.ts` (a no-op act); `tests/view/program-panel.test.mjs`, `world-area.test.mjs`, `discovery-band.test.mjs` (fixtures copied); `tests/invariants/test_browser_view_token_values.py`.
- No trust boundary; `saved-game.ts` and `assets/sprites/` untouched.

## Concerns
- Choice 5.
- Empty right area at the first discovery: until the character's tile is revealed (nothing at minute 84), the right area shows the table's headings over empty space.
- Old rules kept for Slices 10 and 11: `.status-row`, `.status-text`, `.discovery-text`, `.terrain-panel`, `.rule-panel-host`; only `.screen.columns` removed.
- `guidelines/coding-browser-module.md` still lists `run-screen.ts` as `do not copy`; the new row is Slice 12's.

## Searches not found or unclear
- The width the rule panel of task 5 takes: no entry or guideline gives one; its cells are a grid of `minmax(0, 1fr)`; on Programy 2 of 6 grid parts, in the editor's layout at least 300 px; chosen from the browser (choice 1).
- Another no-op act reachable with the new header: none besides the hidden header's „Wznów” after „Zakończ”; `setPace` always returns a new state.
- Two revealed tiles in a played map run: not reached before the character froze at minute 243.
