# Report — executor of Slice 12, cycle `ognisko-i-jedzenie`

**Status:** done

Slice base `eca1fb1b4974241fec78dcb95f89779c357ca6c5`; pinned `.the-way` at 86b78ad (checked:
`git -C .the-way rev-parse HEAD` equals the gitlink).

## Commits

- `8c7db07` feat: draw the campfire's icon on its tile and give its state and a burning stick's in the tile's row

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `src/browser/view/terrain-picture.ts` | 61 | 21 |
| `src/browser/view/terrain-panel.ts` | 15 | 1 |
| `src/browser/view/tile-list.ts` | 39 | 2 |
| `src/browser/styles.css` | 6 | 0 |
| `tests/view/terrain-picture.test.mjs` | 129 | 0 |
| `tests/view/tile-list.test.mjs` | 194 | 0 |

## What was made

- `terrainPicture` gives each tile `campfire: { href, x, y, size } | null` — the icon file the
  campfire's data names (`/icons/${CAMPFIRE.icon}.svg`), on a revealed tile holding a campfire,
  burning or extinguished alike. The picture holds no state, no minutes and no `dimmed` for it, so
  the drawing cannot tell burning from extinguished (accepted in D-63) and never draws it in
  `depleted` (D-41). A burning stick is not in the picture.
- The campfire's icon takes the next place in the tile's icon grid, after the resources' icons
  (two a row, centred). Up to four icons keep the size and places they had (0.7 × size); with five
  (four resources and a campfire, three rows) every icon of that tile is drawn at 1.4 × size / 3,
  so the grid stays in the same square of side 1.4 × size.
- `terrain-panel.ts` draws the campfire's icon as an `<image class="icon">` inside the tile's
  `g[data-tile]`, so hovering it links the tile and its row as before.
- `tileList` rows gain `fire: string[]`: the campfire's „<name> — płonie, zostało <n> min” or
  „<name> — wygasłe”, then each item burning on the tile „<name> — płonie, zostało <n> min”, in the
  map run's order; names from `CAMPFIRE.name` and `ITEMS[item].name`.
- The table gets one last column, its heading empty, its cell `td.tile-fire` holding the texts
  joined by „ · ” (the separator the body row uses); `styles.css` sets that cell left-aligned in
  the role `text` (content to read; D-40) instead of the stock cells' `text-strong`.

## Checks (command → exit code)

Tests written first; the failing run before any code (after `npm run build` → 0):

- `node --test --test-reporter=spec tests/view/terrain-picture.test.mjs tests/view/tile-list.test.mjs`
  → **1**: 15 pass, 6 fail, each on an `AssertionError` (the new field `campfire` / `fire`
  undefined, the panel holding 0 campfire icons). Failing: "the campfire's icon stands on its
  tile, burning and extinguished, and on no other tile"; "the drawing shows no number of the
  campfire or of a burning stick"; "the campfire's icon stands beside the resources' icons, none
  overlapping, within the tile"; "a tile's row gives its campfire's state: burning with the minutes
  left, or extinguished"; "a burning stick stands in its tile's row after the campfire, and only
  while it burns"; "on the panel the campfire's icon stands in its tile and the state in the row
  of the same key". The new test "the campfire's state leaves the row's stock as it was" passed
  before the code: it guards the stock cells against the change, it does not test the new
  behaviour.

After the code:

- `npm run build` → 0
- `node --test tests/view/terrain-picture.test.mjs tests/view/tile-list.test.mjs` → 0 (21 pass)
- `npm run typecheck` → 0
- `node --test "tests/view/*.test.mjs"` → 0 (92 tests, 92 pass)
- `python -B -m unittest discover -s tests/invariants -p test_terrain_drawing_numbers.py` → 0 (3 tests)
- `python -B -m unittest discover -s tests/invariants -p test_browser_view_token_values.py` → 0 (4 tests)
- `python -B -m unittest discover -s tests/invariants -p test_content_identifiers.py` → 0 (4 tests)
- `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier` → 0 (2 tests)

A mutation run: `iconPlaces` with the icon side fixed at half the box (the old 0.7 × size) →
`node --test --test-reporter=tap tests/view/terrain-picture.test.mjs` fails "the campfire's icon
stands beside the resources' icons, none overlapping, within the tile" (1 fail); restored, 0 fail.

No invariant test was changed. Not run, by `make-change` section 3: the full suite (`npm test`).

## Test map runs

The tests drive the built simulation (`setProgram`, `send`, `advanceMinutes`) with the program
„Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk”, „Eksploruj” (each under „Zawsze”) on Las,
its backpack given 9 sticks by hand before minute 0. Reckoned by hand from the task's numbers and
asserted on the run: explore to minute 20, craft to 40 (6 sticks), light the campfire to 45 (2
sticks, 60 minutes, so 42 left at minute 63 — the task's example — and 0 from minute 105), light a
stick to 50 (3 minutes: 3, 2, 1 at minutes 50–52, gone at 53).

## Own-work check (section 3)

- Requirement most likely missed: the drawing showing a number of the campfire or the stick, or
  telling their state (D-19 row 15, D-63). Check: the pictures at minutes 51, 52 and 53 — where the
  campfire's minutes are 54, 53, 52 and the stick's 2, 1, gone — are deep-equal, and the campfire's
  icon at minute 63 (burning) deep-equals that at 110 (extinguished). Showed: equal, so neither
  minutes, nor the burning stick, nor the state reach the drawing; and the panel draws the icon with
  class `icon` alone, never `dimmed`, in both states.
- Second: the texts matching the task's literally. Check: compared the code's strings with
  `task.md:30` by code point — the dash is U+2014 in both; „płonie, zostało” and „— wygasłe” match.
- UI states: the states the styleguide requires apply to shared controls; this slice adds none.
  The tile's states — no campfire, burning, extinguished, with four resources' icons — are
  checked in code by the tests above.
- Screenshot: **unchecked** — the foundation settles no route to a screenshot of the running
  product (no entry of `foundations/` names one; D-19 says the repository declares no real
  browser). How the five-icon tile and the new column look is therefore unseen.

## Choices made (way rejected, cost if wrong)

- The campfire's icon in the tile's icon grid, last, shrinking that tile's icons only where five
  icons take three rows. Rejected: the campfire drawn larger or under the resources' icons
  (overlap), or at a fixed spot (collides with the grid). Cost if wrong: on a tile with all four
  resources and a campfire (about 5.6 % of Las tiles hold all four) the icons are a third smaller
  than elsewhere; a reviewer may prefer another place.
- The state in a last column with an empty heading, texts joined by „ · ”, in `text`. Rejected: the
  state written in the label cell (mixes the coordinates with the state), one line per text (taller
  rows), a heading word (the task gives none — choosing one would be a new text). Cost if wrong:
  the column has no heading; a screen reader announces its cell without a column name.
- A crafted campfire not yet lit stands at `minutesLeft` 0 (Slice 6) and so reads „ognisko —
  wygasłe”, as the task's two states give; the task names no third state for a never-lit campfire.
- Burning texts appear for any tile, but rows exist only for revealed tiles; D-65 keeps every
  campfire and burning stick on a revealed tile, and the drawing draws the campfire only on a
  revealed tile, as the resources' icons.

## Reaches beyond the dispatch

- `tests/view/body-row.test.mjs:88-133` and `tests/view/icons.test.mjs:130-155` — how view tests
  stand in for `document`, to write the panel test's stand-in.
- `src/browser/sim/hex.ts` (`hexCenter`, `hexCorners`, `sameHex`) — the tile's geometry, to bound
  the icons in the layout test.
- `src/browser/sim/data/maps.ts` — the four resources of Las and their densities, for the most
  icons a tile can hold.
- `foundations/` searched for „screenshot” / „zrzut” — no hit; the reason the screenshot is
  unchecked.
- Ranges of the dispatch read at their current places by `reports/foundation-map.md` (D-27 at
  600–632, D-36 at 749–763, D-38–D-44 at 779–883, D-47/D-48 at 914–943, F15 = D-63 at 1154–1168,
  F20 = D-65 at 1184–1197).

## Adaptations (section 4)

None structural. `TileListRow` gains the field `fire`, `PictureTile` the field `campfire`, and
`PictureIcon` is split into `PictureIconPlace` & the resource fields; no caller outside the two
view modules and their tests reads these types.

## Problems observed

None. The known failures of the base (`test_loop2_one_serving_process.py`, Ruff, ShellCheck,
`test_walk_feasibility.py`) were not met: none of them is among this slice's checks.
