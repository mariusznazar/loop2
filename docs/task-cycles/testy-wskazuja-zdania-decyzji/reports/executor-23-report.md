# Report — executor of slice 23 (map drawing, body row and tile list)

**Status:** done with concerns (the concerns are remarks under R3 and one judgment worth the reviewer's eye, below; nothing blocks)

## Commits (base `03063270`)

- `64b62433` test: :white_check_mark: mark the tests that hold the sentences of the decisions on the drawing of the game map, the campfire on it, what the body row, the backpack and the list of revealed tiles show of what is not yet discovered, the nature energy in the body row and a burning item in the list with lines decision:
- `12a43a40` docs: :memo: name the tests of D-19, D-70, D-125, D-178 and D-385, drop the pair of D-70, which its tests hold whole, and rewrite the pair of D-19, D-125, D-178 and D-385 only for the part no invariant and no test holds

Author address checked after the commits: `mariusznn@gmail.com`, as on the earlier commits of the branch.

## Files changed (added / removed lines)

- `foundations/decisions.md` +40 / −24 (only the *Verification* fields of D-19, D-70, D-125, D-178, D-385)
- `tests/view/world-area.test.mjs` +10 / −0
- `tests/view/terrain-picture.test.mjs` +7 / −0
- `tests/view/tile-list.test.mjs` +10 / −0
- `tests/view/body-row.test.mjs` +3 / −0
- `tests/view/run-screen.test.mjs` +1 / −0 — a file beyond the slice's *Change* (item 5): its case „a hovered tile of the drawing marks its row in the table of the area under the drawing and the line gives its numbers; a hovered row marks its tile” holds a sentence of D-19. It is a file of `browser-view` (`tests/view/**`); I read the styleguide's head and its section on roles (see Unread material) and ran its focused test (exit 0).
- `tests/invariants/test_terrain_drawing_numbers.py`: not changed. Its three cases are tests of the invariant terrain-drawing-numbers, which states "never on the drawing" of D-19; by R1 they get no line, and they hold no other sentence of my decisions.

No code, name or assertion of a test changed; every added line in `tests/` is a line `decision:` (checked by script, below). Mentions of decision numbers in comments stay where they were (e.g. `// D-178: …` at `tests/view/body-row.test.mjs:45`, `// D-70: one icon …` at `tests/view/terrain-picture.test.mjs:292`).

## Checks run

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (base, before edits) | 0 | none of D-19, D-70, D-125, D-178, D-385 listed |
| `python -B .the-way/elements/common/foundation_check.py` (after edits) | 0 | `0 errors`; 11 decisions listed `held by nothing` (D-181 … D-220 range, other slices'), none of D-19, D-70, D-125, D-178, D-385 |
| `npm test -- tests/view/world-area.test.mjs` | 0 | 22 tests, 22 pass |
| `npm test -- tests/view/terrain-picture.test.mjs` | 0 | 16 tests, 16 pass |
| `npm test -- tests/view/tile-list.test.mjs` | 0 | 15 tests, 15 pass |
| `npm test -- tests/view/body-row.test.mjs` | 0 | 17 tests, 17 pass |
| `npm test -- tests/view/run-screen.test.mjs` | 0 | 20 tests, 20 pass |
| `npm test -- tests/invariants/test_terrain_drawing_numbers.py` | 0 | Ran 3 tests, OK (file unchanged; run because the slice's *Checks* list it) |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/view/world-area.test.mjs tests/view/terrain-picture.test.mjs tests/view/tile-list.test.mjs tests/view/body-row.test.mjs tests/view/run-screen.test.mjs` | 0 | all files use Prettier code style |
| `git diff -U0 03063270 -- foundations/decisions.md`, read | — | five hunks, starting at lines 521, 1596, 2696, 3763, 9906 of the base: each the *Verification* field of D-19, D-70, D-125, D-178, D-385, and nothing outside it |

Not run: the full gate `npm test` without a file (not the executor's, as the method and handoff say). `test_ruff_source_rules` and `test_shellcheck_source_rules` were not run by me; per the handoff they fail at the base.

## Own-work check

- Requirement most likely not met: a quotation of a line `decision:` that does not begin at the start of a binding sentence, or does not stand in it once spaces are joined (31 long quotations were typed by hand, with „ ” and — characters).
- Check: a script (`quote_check.py` in my working directory) read the added lines of `git diff -U0 03063270 -- tests`, took each decision's binding paragraph from the log, joined runs of white space, and tested each quotation for three words or more and for starting at the start of the paragraph or after ". ". It also flagged any added line in `tests/` that is not a line `decision:`. Control run of the same test on D-70: a mid-sentence quotation („campfire shows on the drawing”) and a quotation with a changed word both came back False, the true quotation True.
- Result: `31 lines 0 bad` (exit 0); no added line in `tests/` other than lines `decision:`. The foundation check after the edits also ran with `0 errors`.

## Reaches beyond the dispatch

- `tests/view/run-screen.test.mjs:488-625` — found by searching the tests for `D-19` and for the content of D-19 (hovering, the line of a tile); its case at line 494 holds a part of D-19.
- `tests/sim/understanding-fixture.mjs` whole, `src/browser/sim/understanding.ts` (`newUnderstanding`), `src/browser/sim/data/conditions.ts` (`satietyBelow`, `natureEnergyBelow`) — to judge whether the states of `world-area.test.mjs` and `body-row.test.mjs` have an Understanding that lacks the items and conditions, which decides whether they hold D-125 and the "from game minute zero" part of D-178. I also ran a one-off Node script building the state of `sent()` of `world-area.test.mjs`: its Understanding holds `items: []` and `conditions: ["always"]` at game minute 0.
- `foundations/decisions.md` D-88 heading and sentence — to word the part of D-19 no test holds (real browser events are checked by hand, never by jsdom).
- `foundations/glossary.md:80-123` („extinguished campfire”, „Understanding”) — to judge that a campfire crafted and not yet lit is extinguished (D-70).
- `src/browser/styles.css` around `.body-value` — to judge what "in the role `text`" means in code (no rule gives the energy a colour; only `.body-value.danger` has one).
- `src/browser/view/tile-list.ts:1-55` — to see that the name of a burning item comes from `ITEMS` (for the remark on D-385; code is as the decision says).

## Working copies

- `.runs/executor-23/` held `understanding-check.mjs`, `quote_check.py`, the foundation check outputs and the logs of the focused runs. Removed before return (`rm -rf .runs/executor-23`); nothing of it was needed in `reports/` beyond what this report quotes.

## Table of decisions

### D-19 — the drawing of the game map

One binding sentence. Its parts: (a) a picture, not a control, its only interaction hovering; (b) hovering links a tile with its row of the list; (c) the numbers of stock stand in the list; (d) and in the line under the drawing, which shows the hovered tile or else the character's tile; (e) never on the drawing.

- Held by tests:
  - (a) in part (a click and controls; not other gestures nor real browser events): `tests/view/world-area.test.mjs:893` „the drawing is a picture: a click on a tile changes nothing, and nothing in it is a control”.
  - (b) and (d): `tests/view/world-area.test.mjs:915` „a hovered tile marks its row and the line under the drawing shows its numbers; a hovered row marks its tile; with none hovered the line is the character's tile”; `tests/view/run-screen.test.mjs:494` „a hovered tile of the drawing marks its row in the table of the area under the drawing and the line gives its numbers; a hovered row marks its tile”.
  - (c): `tests/view/tile-list.test.mjs:95` „each row gives the stock of every resource of the map, „—” where the tile lacks it, 0 when used up”; `tests/view/tile-list.test.mjs:112` „a fresh map run lists nothing; exploring the entrance lists that tile with its stock”; `tests/view/world-area.test.mjs:1113` „the table has a column per resource of the map, a row per revealed tile with the stock, and the fire cell”.
  - (d): `tests/view/tile-list.test.mjs:218` „the line of a hovered revealed tile gives its label and the stock of every resource of the map, „—” where it lacks one”; `:236` „with no tile hovered the line is the character's tile”; `:249` „the character's tile not yet revealed gives its label alone”; `:255` „a key that names no tile of the map run gives the line of the character's tile”; `:269` „the line of a tile with a burning campfire gives its stock and nothing of the fire”.
  - The quotation of a line must start at the start of the sentence, so the lines at the (b)/(d) and (d) cases run through (c), which those cases do not check; the list above says which part each holds.
- Held by invariants: (e), terrain-drawing-numbers (its three cases in `tests/invariants/test_terrain_drawing_numbers.py` get no line, R1).
- Held by nothing: hovering as a real browser delivers it (D-88 leaves real events to a check by hand), and what the drawing does for a gesture other than a click (double click, drag).
- *Verification*: pair rewritten.

### D-70 — the campfire in the browser view

One sentence: icon on its tile; one icon for burning, one for extinguished; minutes left in the tile's row.

- Held in whole: `tests/view/world-area.test.mjs:1063` „the campfire's icon stands in its tile and its state in the row of the same key, and nowhere else”.
- Held in part: icon on its tile — `tests/view/terrain-picture.test.mjs:269` „the campfire's icon stands on its tile, burning and extinguished, and on no other tile”, `:359` „the campfire's icon stands beside the resources' icons, none overlapping, within the tile”, `:338` „the drawing shows no number of the campfire or of a burning stick” (the campfire shown as an icon with no number of its minutes); the two icons — `:293` „a burning campfire is drawn with campfire.svg and an extinguished one with wood-pile.svg, in the same place”, `:304` „a campfire crafted and never lit is drawn with the extinguished campfire's icon”, `:318` „the icon follows the minutes left: one minute is a burning campfire, none an extinguished one”; minutes in the row — `tests/view/tile-list.test.mjs:166` „a tile's row gives its campfire's state: burning with the minutes left, or extinguished”, `:180` „a burning stick stands in its tile's row after the campfire, and only while it burns”.
- Invariants: none. Held by nothing: none.
- *Verification*: pair removed.

### D-125 — what the views show of what is not yet discovered

One sentence: the body row, the backpack, the list and the drawing show the game state whatever the Understanding holds — satiety before „Sytość poniżej”, every item the backpack, the list and the drawing hold. The cases below run on a state whose Understanding holds no item and of the conditions only „Zawsze” (checked by a run, see Reaches).

- Held in part: the body row's satiety and the backpack's items — `tests/view/world-area.test.mjs:516` „only the value below its threshold stands in danger, and the backpack reads its pieces of the cap”; satiety from game minute zero — `:589` „the body row stands in cells with the minutes of the needs under temperature and satiety from game minute zero, none under health and nature energy”; the drawing's icons of undiscovered resources — `:798` „the drawing has a tile per tile of the map run, the icons of the resources a revealed tile holds dimmed at a stock of 0, and no text”; the list's columns and stock of undiscovered resources — `:1113` „the table has a column per resource of the map, a row per revealed tile with the stock, and the fire cell”.
- Not holding it: `tests/view/body-row.test.mjs`, `tests/view/tile-list.test.mjs`, `tests/view/terrain-picture.test.mjs` — their functions receive no Understanding, or their state knows everything (`newKnowingGame`).
- Invariants: none. Held by nothing: a campfire and a burning item on the drawing and in the list while the Understanding does not hold them (every test with a campfire or a burning stick runs on a game that knows everything).
- *Verification*: pair rewritten.

### D-178 — nature energy in the body row

One sentence: ends with „Energia natury {n}”; cut down to a whole number; from game minute zero; in the role `text` at every value, zero included.

- Held in part: `tests/view/body-row.test.mjs:43` „the body row reads temperature, satiety, health and nature energy in cells, with the minutes under the first two, as D-178 gives for Las” (ends with it, not in `danger` at 90); `:67` „nature energy is cut down to a whole number and never stands in danger, at zero too” (89.5 as 89, not in `danger` at 0, 89.5, 100, last value); `:245` „the cells keep the danger of their values: a value below its threshold in danger, the others not” (not in `danger` at 90); `tests/view/world-area.test.mjs:516` (last cell „Energia natury 90”, „Energia natury 0”, not in `danger` at both); `:589` (from game minute zero, before „Energia natury poniżej” is discovered).
- Invariants: none. Held by nothing: that the energy stands in `text` rather than another role than `danger` — the tests check only the flag `danger`; no test reads the colour of the value, so `warning` or `positive` would pass.
- *Verification*: pair rewritten.

### D-385 — a burning item in the list

One sentence: in the tile's row after the campfire's text, as „patyk — płonie, zostało 3 min”, for as long as it burns; no icon on the drawing; its name from the game's data.

- Held in part: row, place after the campfire, text and minutes, only while it burns — `tests/view/tile-list.test.mjs:180` „a burning stick stands in its tile's row after the campfire, and only while it burns”; no icon on the drawing — `tests/view/terrain-picture.test.mjs:338` „the drawing shows no number of the campfire or of a burning stick” (the drawing at minute 52, with a stick burning, equals the one at minute 53, with none).
- Invariants: none. Held by nothing: the name read from the game's data (the tests expect the literal „patyk”, which a name written in the code would also give).
- *Verification*: pair rewritten.

## Pairs added or rewritten (for the human to accept at the merge)

D-19 (rewritten; the field reads):

> invariants: terrain-drawing-numbers. tests: a click on a tile of the drawing changing nothing, and nothing in the drawing a control; hovering a tile marking its row in the list of revealed tiles, and hovering a row marking its tile; the numbers of stock standing in the rows of the list and in the line under the drawing, which gives the hovered tile, or the character's tile where none is hovered or the key names no tile. For hovering as a real browser delivers it, and for what the player does on the drawing other than a click, an agent compares a change with the part no invariant and no test holds:
> - complies: in a browser, hovering a tile marks its row in the list of revealed tiles, and hovering that row marks the tile, while the tab „Teren” of the area under the world on the screen of a map run is picked (D-311)
> - violates: a double click or a drag on a tile that sends the character there or changes the program

D-125 (rewritten):

> tests: with an Understanding that holds no item and of the conditions only „Zawsze”, the body row showing satiety from game minute zero, the backpack listing the items it holds, the list of revealed tiles giving the stock of every resource of the map, and the drawing of the game map drawing the icon of every resource a revealed tile holds. For a campfire and a burning item, an agent compares a change with the part no test holds:
> - complies: a campfire and a burning stick on a revealed tile drawn and listed in its row while the Understanding holds neither the campfire nor the stick
> - violates: the drawing or the list of revealed tiles leaving out a campfire or a burning stick until the Understanding holds it

D-178 (rewritten):

> tests: the body row ending with „Energia natury {n}”, from game minute zero, before „Energia natury poniżej” is discovered; the energy cut down to a whole number, 89.5 shown as „Energia natury 89”; the energy never in `danger`, at 0, 90 and 100. For the role the energy stands in other than `danger`, an agent compares a change with the part no test holds:
> - complies: „Energia natury 0” and „Energia natury 100” in the colour of `text`, as „Zdrowie 40” is
> - violates: „Energia natury” in `warning` or `positive` at some value of the energy

D-385 (rewritten):

> tests: a lit stick standing in its tile's row after the campfire's text, as „patyk — płonie, zostało 3 min” with its minutes left, while it burns and not after its last minute; no icon of it on the drawing of the game map. For the name of a burning item, an agent compares a change with the part no test holds:
> - complies: the name of a burning item in its tile's row read from the item's name in the game's data, so that an item renamed in the data shows under its new name
> - violates: the name „patyk” written in the code of the list instead of read from the game's data

D-70: pair removed; the field reads "tests: the campfire's icon on its tile and on no other, within the tile beside the icons of the resources; one icon for a burning campfire and another, in the same place, for an extinguished one, a campfire crafted and not yet lit and one with no minutes left included; its minutes left in its tile's row of the list of revealed tiles, and no number of them on the drawing."

## Remarks under R3 (the log says more or less than its tests; nothing changed)

- D-70 says the campfire's minutes "stand in the tile's row of the list of revealed tiles", not that they stand there alone. Two tests check more: `tests/view/tile-list.test.mjs:269` (comment at :268 "D-70: the campfire's state stands in the table alone.") and `tests/view/world-area.test.mjs:1063` check that the line under the drawing gives nothing of the fire. No decision's sentence holds that rule; D-19 speaks only of the numbers of stock. I marked neither case for it.
- `tests/view/world-area.test.mjs:1001` „a hovered tile not revealed marks the tile alone, and the line gives its label with nothing of its stock” and `tests/view/tile-list.test.mjs:238` check that the line of a tile not revealed gives no stock; D-19 does not say so (it is fog of war, not my decisions' sentences). Left unmarked.

## Concerns

- Judgment for the reviewer's eye: I marked `tests/view/terrain-picture.test.mjs:338` for D-70 ("shows … as an icon on its tile") on the reading that a drawing which wrote the campfire's minutes beside the icon would not show the campfire "as an icon"; the test fails on that break. A stricter reading would leave only D-385 on that case.
- D-178's role part: I judged "in the role `text`" held only as "never in `danger`", and kept a pair for the rest. If the reviewer reads "not `danger`" as all the sentence asks, the pair can go.

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1-82 (When to read, Roles, Each role in its meaning, Every background with its text) and its list of headings; the rest (lines 82-986, rules of tokens, focus, contrast, screens) not read — the slice adds only comment lines to tests, which those rules do not govern.
- `foundations/part_map.md`: searched for `tests/view` and `test_terrain_drawing_numbers` (both in `browser-view`, lines 3-20); not read whole.
- `foundations/glossary.md`: list of headings and lines 80-123 read; not read whole.
- `tests/view/world-area.test.mjs`: read 1-314, 505-669, 740-1147; not read 314-505 (Teraz, Potem, the scene) and 669-740 (notes after the end, the last encounter) — none of those cases concerns my decisions by name or content search.
- `tests/view/terrain-picture.test.mjs`: read 1-60 and 125-460; not read 60-125 (hexagon geometry, cited D-24).
- `tests/view/run-screen.test.mjs`: read 488-625 only, plus a search of its case names and of `hover`, `tile-line`, `tile-list`, `D-19`.
- `.the-way/elements/decisions/template.md`: read 105-264, covering the three sections the plan names.
- The rest named by the handoff was read whole: the method `SKILL.md` and `slice.md`, `elements/decisions/skill/SKILL.md`, the task passages, `guidelines/testing.md`, `guidelines/coding.md`, the entries D-19, D-70, D-125, D-178, D-385, D-73, D-82 and the invariant terrain-drawing-numbers, `tests/view/tile-list.test.mjs`, `tests/view/body-row.test.mjs` (in two ranges covering the whole), `tests/invariants/test_terrain_drawing_numbers.py`.

## Searches not found or unclear

- A test showing a campfire or a burning item on the drawing or in the list with an Understanding that does not hold it (D-125): not found (`newKnowingGame` in every fire case; search of `tests/view` for `ITEMS`, `burningItems`, `lightItem`, `NO_UNDERSTANDING_ITEMS`).
- A test reading the name of a burning item from the game's data (D-385): not found.
- A test reading the colour of the body row's values (D-178): not found (search of `tests` for `body-value` and `Energia natury`).
- No other test file holding my decisions' sentences outside those named: searched `tests/` for `D-19`, `D-70`, `D-125`, `D-178`, `D-385` and for `tile-line`, `tileLine`, `terrain-drawing`, `TerrainDrawing`, `TileTable`, `tile-list`, `płonie, zostało`, `wygasłe`, `wood-pile`, `campfire.svg`, `terrainPicture`, `backpackText`, `bodyCells`, `bodyValues`, `backpack-text`; the hits in `icons.test.mjs`, `data.test.mjs`, `tabs-area.test.mjs`, `chronicle-game.test.mjs`, `scene-picture.test.mjs`, `hex.test.mjs` and the invariant tests of icons and tokens concern data of icons, tabs or other decisions, not these sentences.
