# Report — Slice 7 of the task cycle `ekran-przejscia`

(Saved by the orchestrator from the executor's returned text: the harness refused the executor's own write.)

- **Status:** done with concerns
- **Commit:** `5389bf4` test: :white_check_mark: let the check of terrain-drawing-numbers read the drawing the React component draws, in place of the terrain panel, D-19 (base `eca76c8`)
- **Check result:** `npm test -- tests/invariants/test_terrain_drawing_numbers.py` exit 0, `npm test -- tests/quality/test_quality_invariants.py` exit 0. Not run: the whole gate and `foundation_check.py` (the cycle's).

## Files
- `tests/invariants/test_terrain_drawing_numbers.py`: +209 −310

## What the check does now
- How it draws: the Node script the check writes takes `jsx` (`react/jsx-runtime`) and `renderToStaticMarkup` (`react-dom/server`) through `createRequire` from the built `dist/browser/view/terrain-drawing.js` (the same React instance the built module uses), and draws `TerrainDrawing({ state, hovered, onHover })` with each game state passed straight in. Anything React reports through `console.error` stops the script with a failure.
- States: kept (before a send, minute 0, every 20th minute to 240, stock of `stick` set to 0, at T and T_OTHER). New: each state with a map run also drawn with its first tile hovered (key from the built `tileKey`).
- Reading back: `MarkupReader` on Python's `html.parser` turns the markup into a tree; refuses tags closing out of order, an element left open, more than one top element. No jsdom or happy-dom, so `tests/view/memory-limit.mjs` not needed (the plan allowed either way).
- What counts as shown: unchanged — text nodes (`title`/`desc` included), `SHOWN_ATTRIBUTES`, targets of `aria-labelledby`/`aria-describedby`. New: a pointing attribute whose target is outside the drawing is a finding.
- Scan: a built module other than `terrain-drawing.js` that imports it and renders `TerrainDrawing` (`jsx`/`jsxs`/`jsxDEV`/`createElement`); today `world-area.js`.
- Docstring: quotes E18's sentence; says the line of a tile and the table stand outside the drawing and the reading; names D-19 and `guidelines/testing.md` „Changing an existing test” as the cause.

## Changed invariant test, named
- Removed: the control „the cut-out list holds the stock of every revealed tile” — no cut any more (plan Slice 7 *Goal*; D-19; task *Context*).
- Replaced: the stand-in `document` and its control by `test_control_the_markup_reads_back_as_the_tree_it_means` (React's markup of a made-up element read back to a hand-written tree; a hand-written `<image x="1"/>`; 4 malformed markups refused).
- Changed: the reading control's made-up drawings are the SVG alone; „aria-labelledby names a table cell” became „aria-labelledby pointing outside the drawing”, flagged.
- Kept: the element-per-tile check, the check that the stock-0 state came about, the check that nothing is found.

## Checks run
| Command | Exit | What it showed |
|---|---|---|
| `npm test -- tests/invariants/test_terrain_drawing_numbers.py` (first run) | 1 | markup control failed: missing `key` props on made-up children; keys added |
| same | 0 | 3 tests OK |
| same, `terrain-drawing.tsx` briefly drawing `<title>{stock of stick}</title>` in each tile | 1 | „minute 0: text in /svg/g/title shows ['1…12']” — the invariant's test seen failing; restored with `git checkout` |
| same, `terrain-drawing.tsx` drawing one tile only | 1 | „3 not greater than or equal to 16 … fewer elements than the map run has tiles”; restored |
| same, reader's `handle_startendtag` broken (before the `/>` case) | 0 | passed — React writes SVG with end tags; the `/>` case added |
| same reader break after that case | 1 | markup control failed; restored (byte-equal) |
| same, `findings` skipping an unresolved pointing attribute | 1 | the „pointing outside” case went unseen; restored |
| same, `"title"` removed from `SHOWN_ATTRIBUTES` | 1 | the „title attribute” case went unseen; restored |
| `npm test -- tests/invariants/test_terrain_drawing_numbers.py` (committed) | 0 | 3 tests OK |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests OK |

## Own-work check
- Requirement most likely missed: the scan must find a module that imports *and renders* the component.
- Check: the scan's two patterns on the built `world-area.js` as built, with `_jsx(TerrainDrawing,` replaced by `_jsx("div",`, and with the import path changed: matches as built, nothing in either broken version.
- Not done: breaking the scan in the product (removing the render leaves an unused import the typecheck refuses).

## Reaches beyond the handoff
`scripts/build.mjs`; `node_modules/react-dom/package.json` exports; `world-area.tsx` and the built `world-area.js`; `src/browser/view/run-screen.ts` (still calls `createTerrainPanel()` at line 64); `plan.md` searched for `terrain-panel`; a one-line Node run on how React closes `img` and SVG `image`.

## Concerns
- Gap until Slice 9: the game still shows the drawing from `createTerrainPanel()` (`src/browser/view/run-screen.ts:64`), and no check reads that drawing after this slice; a gap only if the cycle stops between this slice and Slice 9.
- New strictness: an `aria-labelledby`/`aria-describedby` on the drawing pointing outside it now fails the check instead of being ignored.
- Hover covers one tile: only the first tile drawn hovered; a stock appearing only when another tile is hovered would go unseen.

## Choices
- `renderToStaticMarkup` plus a Python reader, not the document imitation: no jsdom, no memory limit; the reader may parse differently from a browser, limited by strict refusals and the hand-written control.
- The added hovered drawing.

## Searches not found or unclear
- `guidelines/testing.md` is 52,519 bytes and 454 lines, not about 66 kB as the handoff says; read whole with `sed -n` in three ranges, the 8,098-character line included.
- „each control seen failing once on a made-up drawing that shows a stock” does not fit the controls not about a stock; each seen failing on its own break, the main case on the component made to show a stock.
