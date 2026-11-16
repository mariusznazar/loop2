# Slice 12 report — cycle `drobne-bledy-ekranow`

## Status

`done with concerns` (one small mismatch of the plan, one choice for the orchestrator, below).

## Commits

- `798c278a` fix: :bug: draw no link-highlight line at a hovered tile not revealed, and break the fire cell of the tile table at its separator so the table fits its area at 1280 x 720

Range: base `2b4fdc3af5af8e7980ae87bd845553dea333c8f2` .. `798c278a`.

## Files changed (added / removed lines)

- `src/browser/view/terrain-drawing.tsx` — 6 / 2: the hovered tile is found only among revealed tiles, so the polygon of `link-highlight` is drawn only at a revealed tile (D-41, D-19).
- `src/browser/view/tile-table.tsx` — 14 / 2: the texts of the fire cell are each a `<span className="tile-fire-text">`, joined by the same ` · `; text content of the cell is unchanged.
- `src/browser/styles.css` — 13 / 2: the fire cell may wrap (`white-space: normal`), each text keeps to one line (`.tile-fire-text`), cells of a row stand at its top (`vertical-align: top`).
- `tests/view/world-area.test.mjs` — 54 / 9: the case of a hovered unrevealed tile rewritten (below), one case added for the fire cell.

## Checks (command, exit code)

Seen failing first, for the expected reason:

- `npm test -- tests/view/world-area.test.mjs` before the code change: exit 1; the case „a hovered tile not revealed draws no line of link-highlight …” failed with "no line round a tile not revealed: expected null, got <polygon class="outline link-highlight">" (log: `reports/slice-12-hover-unrevealed-fail.log`).
- `npm test -- tests/view/world-area.test.mjs` with `tile-table.tsx` put back to the base (the fire case only): exit 1; "expected [...two texts...], got []" (log: `reports/slice-12-fire-cell-fail.log`).

Passing, after the change:

- `npm test -- tests/view/world-area.test.mjs` — exit 0 (22 tests before adding the fire case; passes with it; log `reports/slice-12-world-area-pass.log`)
- `npm test -- tests/view/tile-list.test.mjs` — exit 0
- `npm test -- tests/view/terrain-picture.test.mjs` — exit 0
- `npm test -- tests/invariants/test_terrain_drawing_numbers.py` — exit 0
- `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0
- Beyond the slice's list, the other view tests that name the touched things: `npm test -- tests/view/run-screen.test.mjs`, `… tabs-area.test.mjs`, `… chronicle-game.test.mjs` — exit 0 each.
- `npx eslint src/browser/view/terrain-drawing.tsx src/browser/view/tile-table.tsx tests/view/world-area.test.mjs` — exit 0
- `npx prettier --check src/browser/view/terrain-drawing.tsx src/browser/view/tile-table.tsx src/browser/styles.css tests/view/world-area.test.mjs` — exit 0

No invariant test was changed; the two invariant tests above only had to stay green (no new invariant, so no "seen failing" for them).

## The judgment in the running game (1280 × 720)

Game started with `npm run local` by `.claude/skills/loop2-play/SKILL.md`, Playwright CLI, viewport set to 1280 × 720. A state was composed by the game's own functions (Las, all 16 tiles revealed with stocks of two and three digits, a campfire burning on tile (0, 0) with a burning stick on it, an extinguished campfire on (1, 0), a stick burning 118 min on (2, 0)) and sent by the ordinary save request.

- **Before my change:** the table was 685 px wide in a content area 672 px wide (area `section.run-tabs`: scrollWidth 717 > clientWidth 704, 13 px too much). The cause is the fire cell of tile (0, 0): „ognisko — płonie, zostało 42 min · patyk — płonie, zostało 2 min” on one line (`white-space: nowrap` on every cell). The table scrolled horizontally.
- **Tried:** the plan's own way — narrowing the gaps — was weighed and not used: the 4 px side padding of the cells cannot be cut without harm, since the fire cell is left-aligned right after the right-aligned last number (2 px + 2 px would give „49ognisko”-like closeness); the stock columns are already as wide as their headings, so their padding gives nothing to the reader. What narrows the table without cutting any name is the one wide column: its cell breaks between the texts (campfire / burning stick), each text kept on one line.
- **After:** the table is 672 px wide, `scrollWidth` of the area 704 = `clientWidth` 704: it fits whole with no horizontal scroll. The row of tile (0, 0) stands on two lines — „ognisko — płonie, zostało 42 min ·” and under it „patyk — płonie, zostało 2 min” — and no name is cut. The one remaining case that would still scroll (a text that is wider than the area on its own) cannot occur with the data (the longest text is a name of an item plus „ — płonie, zostało N min”, about 215 px, in an area of 672 px minus 300 px of other columns); the scroll rule of `.screen-area.run-tabs` stays as it was, as the fallback. Therefore the plan's fallback (table stays scrolled with a visible bar, to be told in the request) is **not needed**: the table fits.
- **Hover as a real browser delivers it** (a state with every third tile not revealed, pointer moved over tiles with the mouse): over unrevealed (0, 0) and (3, 0): 0 polygons of `link-highlight`, no row marked (`tr.hovered` none), the line under the drawing „(0, 0)” / „(3, 0)”; over revealed (1, 0) and (2, 0): 1 polygon of `link-highlight`, row (1, 0) / (2, 0) marked, the line with the stocks.
- **Screenshot shown** (the table at 1280 × 720, with the wrapped row), placed as D-418/D-419 give, branch `loop2/drobne-bledy-ekranow` of `mariusznazar/screenshots`, commit `492a82d0ba300f58f25226e0059767b5511dff59`:

  `![The table of revealed tiles under „Teren” at 1280 × 720 px: the table fits its area, the row of the tile with a campfire and a burning stick breaks between the two texts](https://github.com/mariusznazar/screenshots/blob/492a82d0ba300f58f25226e0059767b5511dff59/loop2/drobne-bledy-ekranow/slice-12-tile-table-1280x720.png?raw=true)`

  It shows only the made-up state of that start (no address, password or token on it; the page shows no account address in the part shown).

## Own-work check

- **Requirement most likely not met:** "the table of revealed tiles fits its area whole at 1280 × 720 with no horizontal scroll" (task To do 11), with the burning stick among the texts; second, "no line of `link-highlight` at an unrevealed hovered tile" in a real browser, which jsdom does not prove (D-88).
- **Check:** measured in the running game at 1280 × 720 `scrollWidth` against `clientWidth` of the area and the table's width, before and after (685 px vs 672 px; area 717/704 vs 704/704); and the mouse moved over unrevealed and revealed tiles, reading polygons of `link-highlight`, marked rows and the line (above).
- **Result:** fits, no scroll; no line and no row at an unrevealed tile, line and row at a revealed one.

## Choices (with the way rejected and cost if wrong)

1. **Fire cell wraps at the separator instead of narrowing paddings.** Rejected: halving the side padding of all cells (saves 24 px, fits at 661 px): it leaves 4 px between the last number and the start of the fire text, and does not hold for a tile with three burning texts. Cost if wrong: the row of such a tile is two lines tall; the plan's wording says „narrow its gaps and columns”, which this does for the one column that is too wide.
2. **`vertical-align: top` for the cells of a row** (`.tile-list tbody tr > *`), so the numbers of a two-line row stand level with its first line. Cost if wrong: none seen; the rows of one line look the same.
3. **The tile still carries the class `hovered` in the drawing when it is not revealed** (the `g.hovered`); only the line of `link-highlight` and the row are gone. No rule of the stylesheet reads `.tile.hovered`, so nothing is drawn by it. The old test asserted this class for the unrevealed tile; the rewritten case asserts what the task requires (no line, no row marked) and no longer asserts the class. If the cycle wants the class removed as well, it is a one-condition change in `terrain-drawing.tsx` and in the test.
4. **Keys of the spans' fragments are the text** (`key={text}`): two identical texts on one tile (two sticks with the same minutes left) would give a duplicate key warning from React. The simulation puts one entry per burning item, so identical entries on one tile are possible in theory; I did not check whether the game can produce them. Guess marked: not verified either way.

## Mismatch of the plan and the code (small)

The section says „the line under the drawing already counts a hovered unrevealed tile as none (`tile-list.ts`)”. In `src/browser/view/tile-list.ts:94-111` `tileLine` finds a hovered unrevealed tile and returns its label alone („(0, 0)”), as its comment and the test at `tests/view/world-area.test.mjs` say; it counts such a tile as hovered, but without a stock. I kept that behaviour (the files of my slice do not include `tile-list.ts` and `tests/view/tile-list.test.mjs` asserts it); D-19 says the line shows „the hovered tile or else the character's tile”. If the plan meant the line should fall back to the character's tile, that is another change.

## Questions and concerns

- Question for the orchestrator (no blocking): whether to also drop the class `hovered` of the unrevealed tile (choice 3). Recommended: leave it, it draws nothing.
- Concern: the table is fixed at 1280 × 720 with Las (four resources); a map with more resource columns (none now) would need the same look again.

## Reaches beyond the dispatch

- `.claude/skills/loop2-play/SKILL.md` and `.the-way/task-cycle/change/ui_check.md` — named by my *Read*; read whole.
- `src/browser/run-screen.css:1-110` (the rule `.screen-area.run-tabs`, the width of the area) — not named; read to know the area's width and its scroll rule; not changed.
- `src/browser/sim/types.ts` (types `BurningItem`, `MapRun`) and `src/browser/sim/saved-game.ts` (names only, by grep) — to compose the state.
- Other view tests that name the touched things (`run-screen`, `tabs-area`, `chronicle-game`) — run, passed.

## Unread material

- `.runs/task-cycles/drobne-bledy-ekranow/task.md` — only the passages of the handoff (lines 25, 35, 138-142), as the dispatch gives them.
- `foundations/decisions.md`: read D-19 (9793-9835) and D-41 (4705-4719) whole; D-311, D-385, D-396, D-421, D-43, D-417, D-418, D-419, D-420 not opened by me (the handoff's text of the task and of the `loop2-play` skill gave what I used: D-418/D-419 through the skill's section "Show a screenshot to the human", D-396 the page area of 1280 × 720, D-421 through the header of `styles.css`).
- `foundations/invariants.md` (`terrain-drawing-numbers`, `browser-view-token-values`, `document-test-memory-limit`) — not opened; their tests ran green, and the change uses no value `browser-view-token-values` forbids (no px, colour or font in the new rules).
- `guidelines/styleguide-browser-view.md` (91 KB) — **not read whole**; only searched (case-insensitive) for `table`, `tile-list`, `wrap`, `vertical-align`, `nowrap`: no hit. The changed rules use no value the token rule forbids, but the file's other rules were not checked against the change.
- `guidelines/testing.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md` — read whole.

## Searches not found or unclear

- The plan's statement that `tile-list.ts` counts a hovered unrevealed tile as none: not found as written (see the mismatch).
- Whether the game can put two identical burning items on one tile: not searched.

## Working copies

- `.runs/slice-12/` (compose scripts, the composed state files, logs, the copy of the screenshot): stood in the worktree; removed entirely before returning. Logs worth keeping are in `reports/` as `slice-12-hover-unrevealed-fail.log`, `slice-12-fire-cell-fail.log`, `slice-12-world-area-pass.log`.
- `.playwright-cli/` (screenshots and the files of the run-code scripts): removed; the browser was closed (`playwright-cli close`) and the local start stopped (`npm run local:stop`, 1 start stopped).
- `.runs/screenshots/` (clone of `mariusznazar/screenshots`): removed after the push.
- Nothing remains.
