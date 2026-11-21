done with concerns

# Report - slice 14 of "loop2: uklad na telefon dla wszystkich ekranow gry": a tap on a tile marks its row

## Commit

- `986377e390de1a8cb776aa7c171ecc1f89f12842` on `task/uklad-na-telefon` (base `48bbe99c`), not pushed.

## Files changed

| File | Added / removed |
|---|---|
| `src/browser/view/terrain-drawing.tsx` | +28 / -15 |
| `src/browser/view/run-screen.tsx` | +21 / -4 |
| `src/browser/view/world-area.tsx` | +15 / -7 |
| `tests/view/run-screen.test.mjs` | +163 |

Total of the commit: 4 files, 227 insertions, 26 deletions (`git show --stat`).

`world-area.tsx` is not in the slice's *Change* list; see Adaptations.

## What was made

- `TerrainDrawing` (`terrain-drawing.tsx`): a pointer of the kind `touch` no longer hovers (`onPointerOver` and `onPointerLeave` act only for a pointer that is not touch, so a bare event with no `pointerType`, as the old hover cases send, still hovers). A new `onPointerUp` of kind touch calls the new prop `onTap(key | null)` with the key of the tile reached (`closest("[data-tile]")`), or null for the drawing beside every tile. The tile finder is one small function, `tileKeyOf`, used by hover and tap.
- `WorldArea` (`world-area.tsx`): passes the new prop `onTap` to the drawing; comments say "marked tile, hovered or tapped".
- `RunScreenView` (`run-screen.tsx`): a second state `tapped` beside `hovered`; `marked = hovered ?? tapped` goes to the world area (drawing and line under it) and to the tabs area (table), as the one marked key; `onTap={setTapped}`. One effect with a cleanup puts a `pointerup` listener on the document that sets `tapped` to null for a touch pointer whose target is not inside `.terrain-drawing`, so a tap anywhere else, on the page outside the screen too, takes the mark off. A tap on the drawing is the drawing's: it moves the mark, or beside every tile takes it off.
- A tap marks by the lift (`pointerup`), not by the finger coming down: a finger that rests on a tile or a scroll that takes the finger (`pointercancel`) marks nothing; the pointer leaving after the lift cannot undo the mark, since touch hover is ignored.
- A tile not revealed that is tapped gets no row and no line round it; the line under the drawing then gives its label alone, as for a hover of such a tile (`tileLine` is unchanged).

## Checks (command and exit code)

| Check | Exit |
|---|---|
| `npm test -- tests/view/run-screen.test.mjs`, before the code, with the new cases only: 3 of the 4 new cases failed, 22 passed | 1 |
| `npm test -- tests/view/run-screen.test.mjs`, after | 0 (25 tests, 0 fail) |
| `npm test -- tests/view/world-area.test.mjs` | 0 |
| `npm test -- tests/view/tile-list.test.mjs` | 0 |
| `npm test -- tests/invariants/test_terrain_drawing_numbers.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py`, first run | 1: `test_prettier_source_format` named `tests/view/run-screen.test.mjs` as not formatted |
| the same, after `node node_modules/prettier/bin/prettier.cjs --write` on my 4 files | 0 |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 |
| `npm test -- tests/view/run-screen.test.mjs` and `tests/view/world-area.test.mjs` again after the Prettier write | 0, 0 |
| `python -B .the-way/elements/common/foundation_check.py` (not in the slice's *Checks*, run as the new test comments quote D-19) | 0 (0 errors) |

The full gate (`npm test` with no argument) was not run, as the handoff says.

### The failing run of the new cases

Before the code the three cases that need the tap failed on their assertion, for the expected reason:

- "a tap with a finger on a revealed tile marks its row ...": `its row in the table: expected ["1,0"], got []`
- "a tap elsewhere takes the mark off ...": `precondition: marked: expected ["1,0"], got []`
- "a finger that only touches a tile or is taken by a scroll marks nothing ...": `a finger resting on a tile: expected [], got ["1,0"]` (the old code hovered at the touch's `pointerover`)

The fourth case, "a click of a mouse on a tile changes nothing, and a hover of a mouse still marks its tile", passed before the change, as it should: it guards D-19's existing behaviour (click changes nothing, hover marks) against an implementation that marks on any pointer's lift. It is not a failing-first case, and I say so rather than bend it.

## Own-work check (section 3)

The requirement my work most likely does not meet: the mark must survive the finger being lifted and the pointer leaving, in a real browser, where the sequence of events is a browser's, not a test's (D-88: jsdom proves no real touch). Checks:

- jsdom, `tapOn` sends `pointerover, pointerdown, pointerup, pointerout (relatedTarget null), click` of kind touch; the mark must be there after it. It was.
- Chromium with real touch (`page.tap` through `run-code`, config `.playwright/cli.phone.config.json`, page area 360 x 740, `maxTouchPoints` 1, the page's own `pointerup` listener read `touch`), on a composed state of the map run "Skraj lasu" with 5 revealed tiles, under „Teren”:
  - before the change (base): a tap on the revealed tile (1,0) left `rows []`, `tiles []`, line `(1, 1)`: nothing marked.
  - after: tap on tile (1,0), read after 1.2 s: row `1,0` marked, tile `1,0` marked, line `(1, 0): patyk 12 · jagoda 8`. Tap on (3,1): mark moved to (3,1). Tap on (2,2): moved. Tap on a tile not revealed (0,0): no row, no tile marked, line `(0, 0)` (label alone). Tap on the header: nothing marked, line `(1, 1)` (the character's tile). Tap on (1,3): marked; tap on a row of the table: nothing marked, line `(1, 1)`.
  - a screenshot after a tap showed the tile (2,2) outlined in `link-highlight` and its line `(2, 2): patyk 12 · jagoda 8` under the drawing; one scrolled to the table showed „Teren” picked and the row (3,1) with the mark at its left edge. Both looked at and removed (see Working copies).
- Chromium at 1280 x 720 with no touch (`maxTouchPoints` 0, ordinary session): a mouse over tile (1,0) marked its row and tile and gave the line; a mouse click there changed nothing more; the mouse leaving took the mark off (line back to `(1, 1)`); a mouse over the row (0,1) of the table marked the tile (0,1).

Mutations I made in my head and what catches each:

- touch not excluded from `onPointerOver`/`onPointerLeave`: the first and third new cases fail (the old failing runs above).
- mark on `pointerdown` instead of the lift: the "finger that only touches a tile" case.
- the document listener missing, or not guarded against taps on the drawing (it would clear what the drawing set, at the same lift): the second case (tap elsewhere) and the first (the second tile's tap).
- mark by any pointer's lift: the mouse case.
- `marked = hovered ?? tapped` swapped to `tapped ?? hovered`, or a mouse hover while a tile stays tapped: **not tested**. D-19 says nothing about the two together; I chose the hover to win while the mouse is over a tile, the tapped tile to show again when it leaves, a choice for hybrid devices (see Choices).
- a pen: treated like a mouse (hover), not tested.

## Walkthrough (`walkthrough.md`)

I did not read `.the-way/task-cycle/change/walkthrough.md`: the handoff names `SKILL.md`, `slice.md` of the method and `ui_check.md` only, and section 3 of the method says to read `walkthrough.md` for a change of behaviour a user sees. The change alters what a user sees (which tile is marked after a tap), so this is a gap of mine: the walk below is what the handoff's *Checks* and the cases of D-19 asked for, not the plan of cases `walkthrough.md` prescribes. The orchestrator should judge whether to ask a walk by that file.

Walk made (system: the game from `npm run local`, Chromium by Playwright CLI 0.1.22, addresses `https://127.0.0.1:<port>/#/postac/1/przejscie`, a made-up account at `example.test`):

| Case | Verdict | Where |
|---|---|---|
| tap on a revealed tile marks its row and the line, stays | right | Chromium, touch, 360 px |
| tap on another tile moves the mark | right | same |
| tap on a tile not revealed marks no row | right (line gives its label) | same |
| tap on the header, on a row of the table takes the mark off | right | same |
| mouse hover marks, mouse click changes nothing, a row hovered marks its tile | right | Chromium, no touch, 1280 x 720 |
| tap on the page outside the screen (`document.body`) takes the mark off | checked only in jsdom | jsdom |
| tap on „Kronika” / „Teren” tab takes the mark off | not checked in the browser; by the document listener it must | - |
| keyboard-only switch of the tab with a tile still tapped (a touch laptop) | not checked: the mark of a tapped tile stays, since no pointer lift clears it | - |
| a phone measure (`scrollsToTheSide`, `controlsSmallerThan48`) | not run: the slice changes no layout or size, no CSS | - |

Nothing fell wrong. Error outside the task's scope: none seen.

## Adaptations of the plan (section 4)

- Small mismatch: the slice's *Change* names `terrain-drawing.tsx`, `run-screen.tsx` and the test file. The tap handler's prop has to travel through `world-area.tsx` (which hands the drawing its props), so I changed `world-area.tsx` too (a new prop `onTap` and comments). Rejected: finding the tile in `run-screen.tsx` from a document listener alone, which would keep `world-area.tsx` untouched but spread the knowledge of `[data-tile]` and `.terrain-drawing` over a second module. Cost if wrong: a prop passed through one more component; reverted by moving the tile finder into the screen.

## Choices (way rejected; cost if wrong)

- Two states, `hovered` and `tapped`, merged as `hovered ?? tapped`; rejected: one state whose touch and mouse setters overwrite each other (a mouse leaving would then take a tap's mark off on a hybrid device, and a tap would overwrite a mouse hover); cost if wrong: on a touch laptop a mouse over a tile shows that tile and not the tapped one, a small surprise.
- The tap is the lift (`pointerup`) of a touch pointer; rejected: `click` (a mouse also clicks, and D-19 says the click changes nothing) and `pointerdown` (a scroll would mark); cost if wrong: a finger that moves a little between down and up still counts as a tap if the browser sends `pointerup`, which is how a browser tells a tap from a pan (a pan sends `pointercancel`), so little.
- A tap on a row of the table is no new act (the plan's choice): its touch `pointerover` marks the tile of the row for the moment of the touch and `pointerleave` takes it off, the document listener also takes the tapped mark off. Left as the table has it; I did not make the table ignore touch.
- No check of `touch` in `TileTable`; the table's `onHover` stays as it was.
- The prop names `hovered` / `onHover` stay in the three modules and their other tests, though `hovered` now carries the marked key (hovered or tapped); the classes `hovered` stay too. Rejected: a rename to `marked`, which touches `tile-table.tsx`, `tabs-area.tsx` and the tests of `world-area` for no change of behaviour. Comments say what the key is.
- `onTap` is a required prop of `TerrainDrawing` and `WorldArea`; `tests/view/world-area.test.mjs` builds `WorldArea` with no `onTap`, which is fine for its events (none of kind touch) and passed.

## Concerns

1. `walkthrough.md` not read (above).
2. The line under the drawing for a tapped tile not revealed gives that tile's label, as for the hover; D-19 says only that a tap on such a tile marks no row. Not a concern of correctness, noted so that the orchestrator can see that the line changes there.
3. Only a *tap with a finger* elsewhere takes the tapped mark off; a mouse click, or a tab switched by keyboard, does not (a mouse is not touch). On a hybrid device a tapped tile stays outlined until the next tap with a finger. D-19 speaks of "a tap elsewhere", so this follows it.
4. The size rule: the functions I touched stay under 200 lines (`tests/quality/test_function_and_file_size.py` passed, exit 0).

## Reach beyond the dispatch (section 1)

- `Grep` of the styleguide's headings and of `terrain|tile|kafel|D-19` in `guidelines/styleguide-browser-view.md`, and a read of its lines 1243-1282, 1435-1457: I read the styleguide's part, not the whole file, as the plan-selected passages are about the phone layout and touch (lines 1-979 read whole), see Unread material.
- `tests/view/world-area.test.mjs` (lines 150-215, 955-1060) and `tests/view/page-document.mjs` (lines 1-150): to see how the tests of the drawing build `WorldArea` with no `onTap`, and what `fire` sends (a bare `Event`, which has no `pointerType`; jsdom 30.1.3 has `PointerEvent`, so the new cases build their events with it).
- `src/browser/view/tabs-area.tsx` and `src/browser/sim/saved-game.ts` (a grep of `loadSavedGame`) and `.claude/skills/loop2-play/compose-state.mjs`: to compose a state with revealed tiles for the browser check, since playing 5 minutes did not reveal tiles (the character died of cold at minute 243 with one tile revealed). The composed state (a copy of `compose-state.mjs` at `.runs/slice-14/compose.mjs`) sets `revealed: true` on five tiles of a fresh run of "Skraj lasu", checks it loads with `loadSavedGame`, and goes in through `PUT /api/saved-game` as the skill says. It was removed.

## Working copies

- `.runs/slice-14/` (compose script, state document, output files of the runs, three screenshots): stood in `.runs/slice-14`; removed.
- `.playwright-cli/` (scripts and the session's working files): stood in `.playwright-cli`; removed.
- The browser session closed (`playwright-cli close`) and both local starts ended (`npm run local:stop`, "Local starts stopped: 1" each). `.runs/local-start/` holds the databases the product's own tool makes; it is the product's, not my copy.
- No screenshot was shown to the human: the screenshots were looked at and removed, as the plan's choice says (only slice 20 shows a set).

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1-979 (roles, rules, the phone-layout, touch, both-layouts rules, menu bar, screens Mapy, Wiedza and Postać, the head of the program editor) and 1243-1282, 1435-1457; not read: lines 980-1242 (the rest of the program editor, the scene of a map run, the picture band of Siedziba) and 1283-1434 (the end-of-run window, the list of accounts), which the *Read* of the slice does not name by passage and which do not touch the drawing's hover or tap.
- `guidelines/testing.md`: read lines 1-207 (levels, the rules for the choice of level, expected values, changing a test, trust boundaries and the first part of its table); not read: lines 208-510, which the page limit cut. I wrote tests by the rules of the first part: the expected values are literals, each case names its break.
- `foundations/decisions.md` ranges named by the handoff (D-19, D-41, D-70, D-88) and `foundations/invariants.md:354-363`: read whole.
- `.runs/task-cycles/uklad-na-telefon/task.md` passages (36, 59-61, 81-95): not read; the handoff's own text carried the goal and the notes, and I did not open the task.
- `.the-way/task-cycle/change/walkthrough.md`: not read (Concerns 1).
- `src/browser/view/tile-table.tsx`, `src/browser/view/world-area.tsx`, `src/browser/view/terrain-drawing.tsx`, `src/browser/view/run-screen.tsx`, `tests/view/run-screen.test.mjs` (lines 1-260 and 440-590 before my edit; the new cases I wrote), `.claude/skills/loop2-play/SKILL.md`, `src/browser/AGENTS.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `.the-way/task-cycle/change/ui_check.md`: read whole (`tests/view/run-screen.test.mjs` read in the parts above, not whole).

## Searches not found or unclear

- No existing test or helper builds a touch pointer event; `tests/view/page-document.mjs` `fire` sends a bare `Event` that cannot carry `pointerType`. I made the helper `pointer` in `tests/view/run-screen.test.mjs` with the window's `PointerEvent` (jsdom 30.1.3 has it). Not unclear, noted as a place a shared helper could stand.
- The playing path in the skill (a map run of five minutes) revealed no tile, and a first-chill run died of cold; the skill says nothing about reaching a revealed tile quickly. I composed a state as above.
- `page.tap` on a tile polygon times out with "`<div class="icon-mask">` from `foreignobject` subtree intercepts pointer events" (the icon sits at the centre of the tile); a `force: true` tap sends a real touch at the centre, which reaches the icon, and the drawing finds the tile by `closest("[data-tile]")`. The skill's section on tapping does not mention it.
- The handoff says to take "before" screenshots at 360 px and 1280 x 720; I took the 360 px one (nothing marked after the tap) and the 1280 x 720 behaviour before is the unchanged hover, which I read by DOM only after the change, not before.
