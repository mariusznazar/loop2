Status: done with concerns

# Slice 19 report - the screen of a map run, its table of tiles and the end-of-run window at 360 px

## Commits

- `5f5e0088` on `task/uklad-na-telefon` (base `137a2267`): `src/browser/run-screen.css` +44 -2, `src/browser/styles.css` +70 -0. No markup, no test, no token changed. Nothing pushed.

## What changed

All three rules stand in blocks `@media (width < 1280px)` with no media type, after the rules of the computer layout they change; the computer layout's rules are untouched.

1. `src/browser/styles.css`, after the `.tile-list` rules: the table of revealed tiles. In the phone layout `.tile-list`, `thead`, `tbody` are blocks and each `tr` is a wrapping flex line: the label cell (`8ch`) and the numeric cells (`flex: 1 1 0`, `max-width: 12ch`, same in head and rows, so the columns align) share the first line, and the last cell (`td.tile-fire`) takes a line of its own (`flex: 1 0 100%`, indented by the label's width), hidden when empty; the empty last `th` of the head is hidden; the text spans of the fire cell may break at a space; the icon of a column heading stands over its name. Its markup does not change (D-421).
2. `src/browser/run-screen.css`, the existing phone block of the grid: `.screen-area.run-tabs { overflow-x: visible }` - the `overflow-x: auto` of the computer layout goes in the phone layout (row 5).
3. `src/browser/run-screen.css`: `.now-row { height: var(--touch-target-min) }`, `.next-row { min-height: var(--touch-target-min) }` in the phone layout, both rows held whether they name a rule or not so that a row gaining or losing its rule moves nothing under it.
4. `src/browser/run-screen.css`, after `.end-window-buttons`: `.end-window { max-height: calc(100vh - 220px) }` in the phone layout (see "Problems" 2).

## Checks (command, exit code)

- `npm test -- tests/invariants/test_browser_view_token_values.py` - exit 0 (4 tests OK), run twice (before and after the last edit of `styles.css`).
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` - exit 0 (3 tests OK), run twice.
- `npm test -- tests/view/run-screen.test.mjs` - exit 0 (25 pass, 0 fail), run twice.
- `npx prettier --check src/browser/run-screen.css src/browser/styles.css` - exit 0.
- In the running game (`npm run local`, Chromium by `playwright-cli`, phone config with touch, page area 360 × 740; 1100 × 800 by `resize`; 1280 × 720 by the ordinary session): see the walk below.
- Not run: `npm test` with no argument (not mine, by the handoff). No red-first run exists: the change is stylesheet rules that jsdom does not apply (styleguide, rule "Two layouts and one threshold between them"), so no test can fail before and pass after; the browser measurement is the check, and it failed before the change as shown below.

## Own-work check (section 3)

Requirement most likely not met: "the table of revealed tiles fits its area with no scroll to the side, its numbers still in the rows" and "the end-of-run window's buttons stay in sight". The check: the measurement of loop2-play (`scrollsToTheSide`, `contentWiderThanItsBox`, `outsideTheWindow`, `controlsSmallerThan48`) on a composed Las run with the tile table in its worst case (a campfire burning with two burning items on one tile, one extinguished), and the position of the window's lower edge against `innerHeight`.

- Before the change (base): table `section.screen-area` content 527 > box 342, `table.tile-list` spanning 21..524 in a window 360 px wide; `now-row` and `next-row` 326 × 18.2 in `controlsSmallerThan48`. With no campfire on any tile the table fitted by itself on the base (no entry of the table on the lists), so the scroll showed only with a campfire on a tile, which is the case I composed.
- After: `scrollsToTheSide` false; `contentWiderThanItsBox` holds only the signs the handoff names or their kin (`div.world-area` 330 > 318, `div.scene` 339 > 336 while the mage walks, `div.scene-sheet` 256 > 64 - the sprite sheets, taken as signs by slices 14-18); `outsideTheWindow` holds only `img` of the sheets; `controlsSmallerThan48` empty. The table has no entry on any list.
- Window: with 12 rules that never fired (the middle part scrolls: body 611 in a box 372) the window at 360 × 740 starts at y 172 and, with the base's `80vh`, ended at 764, 23 px below the lower edge of the window with its buttons (buttons' bottom 763 against `innerHeight` 740). After: window 520 high, buttons' bottom 691 < 740, the page not scrolled.
- Tap on `.now-row` and `.next-row` by `page.touchscreen.tap` at their centre: focus lands on the row itself (`now-row DIV`, `next-row DIV`), the page scrolls to the program (scrollY 0 -> 1027); no neighbour control takes the tap (the rows are now 48 high).
- Tap on a revealed tile of the drawing with the tab „Teren” picked: `tr.hovered` is the row `3,0`, its `th` border colour is the `link-highlight` colour, and the line under the drawing gives that tile (D-19 holds in the new row layout).

## Walkthrough (`walkthrough.md`)

The change alters what a user sees, so the walk was made. System: this computer (Windows 11), Chromium by Playwright CLI 0.1.22, address `https://127.0.0.1:<port>` of `npm run local`, made-up account at `example.test`. The states were composed with the built simulation (`dist/browser/sim`) and sent by the page's own save request, as the skill gives; a loaded save carries no events, so the chronicle and the window's "Ostatnie minuty" were also taken from a live run played from a composed state near the death.

| Case | By what | Verdict |
|---|---|---|
| 360: map run of Las, header, scene, rows, body, drawing, program, tabs in one column, nothing scrolls to the side | phone session, measurement + screenshot | pass (signs only, as above) |
| 360: „Teren” with many tiles and a campfire: table fits, numbers in the rows, no scroll in the frame | measurement + screenshot of the area | pass (failed on the base: 527 > 342) |
| 360: „Kronika” with its filters, with entries from a live run (death at minute 243) | screenshot of the area, measurement | pass |
| 360: rows „Teraz” and „Potem” hold 48 px, tap lands on them | measurement `controlsSmallerThan48`, `page.touchscreen.tap` | pass (failed on the base: 326 × 18.2) |
| 360: end-of-run window after a death (live death and loaded) and after a solved map (live, from a composed state at streak 476) | measurement + screenshots | pass; width = content column (344 at left 8) |
| 360: window with many rules that never fired: middle scrolls, buttons in sight | `getBoundingClientRect` against `innerHeight`, screenshot | pass after the change; failed on the base (buttons 23 px under the edge) |
| 360: tap on a tile marks its row in the new table | `page.touchscreen.tap`, class and colour read | pass |
| 1100 × 800: the open pick of „Czynność” with its names inside the frames; the table | screenshot of the rule panel and of the area, measurement | pass |
| 360: the same open pick | screenshot of the rule panel | pass (names break in their cells, inside the frames) |
| 1280 × 720, mouse, no touch: as before | full-page screenshots before and after, „Kronika” and „Teren”, pixel difference by PIL | pass: `getbbox()` of the difference is `None` for both (identical); computed style: window `max-height` 576 px, `.now-row` 18.19 px, `.run-tabs` `overflow-x: auto`, table `display: table` |
| side observation | - | see "Problems" 3 and 4 |

What I did not check: Firefox, Edge and a real phone (outside the agent's reach by D-396); a map run with a character whose name has no spaces and a long name in the header (not on this screen's changed rules); the table of a map of another size than 4 × 4 (Skraj lasu 2 columns, Las 4 columns; the rules do not depend on the count, and 4 was measured); the end window with the row of warnings above it shown (the 220 px allowance counts it from arithmetic, not from a real failed save); the discovery band and „Dodaj regułę z tym” inside the window (not touched). Screenshots were looked at and removed; none is shown to the human and none was pushed, as the handoff directs (only Slice 20 shows a set).

## Problems as observed

1. The table's scroll needed a campfire to be seen. At 360 the four numeric columns and the label fit the 318 px area by themselves; the cell with the campfire and burning items (nowrap texts of about 195 px, one per thing) is what made the table 527 px wide. Verified by the measurement before and after. The fix takes the fire cell to its own line, so the table is the same for any map.
2. The end-of-run window's `80vh` (D-370 and the styleguide's rule "The end-of-run window") leaves room for the menu bar only where the bar is one line. At 360 the bar wraps „Konto” and is 116 px high; the grid of the screen adds its gap `--space-xl` (56 px) between the bar and the window, so the window starts at 172 px. Measured. I changed the phone layout's height to `calc(100vh - 220px)` (172 px plus about one line of the warnings row). This is a layout dimension, so D-43 leaves it out and the token-value test passes. It departs from the sentence of the styleguide that the height "stands in the rule `end-window`" in the unit `vh`: the unit stays `vh`, with a length taken off. The 220 is arithmetic from measured values, not a value from a source; if the bar's height changes (a slice of the menu bar, a longer name of the game) the allowance must be measured again.
3. Observation outside this slice: the grid `.screen` puts its gap between the hidden `.run-screen-areas` (a grid item whose children are all `hidden`, but which is itself displayed and holds a track of height 0) and the end-of-run window, so the window starts 56 px below the menu bar at either layout (at 1280 × 720 too, where it is the same). Not changed: it is the computer layout's look and is outside the slice's brief. Cause verified only as far as: the previous sibling of the window is `div.run-screen-areas`, the distance is 56 px, equal to the gap.
4. Observation: the world area's `content 330 > box 318` and the `div.scene` 339 > 336 while the mage walks are the signs the handoff names (the scene's place reaches into the area's padding by design, slice 15; the walking mage's frame is clipped by `.scene`'s `overflow: hidden`). No text crosses a frame by the screenshots.

## Concerns

- The fire line of a row stands under its row's numbers, indented by the label's width, with no line or colour that ties it to the row beyond the indent; on the screenshot it reads as belonging to the row above it. If the human finds it ambiguous, a small top margin of every row would separate the pairs - not done, as it changes the density of the table.
- The 220 px in the window's height (Problems 2) is a measured allowance, not a derived one; a failed save (D-208) shows the row of warnings, and I did not provoke it.
- The styleguide's rule "The end-of-run window" and D-370 say the height is `max-height` in `vh` with the value in the rule `end-window`; a reviewer may take `calc(100vh - 220px)` for a second value. The foundation is not mine to change in this slice; named here.

## Choices (with the way rejected and the cost if wrong)

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The table's rows become wrapping flex lines in the phone layout, the fire cell on a line of its own under the numbers | `table-layout: fixed` with the fire cell narrow, its words breaking by letters; a `display: grid` with a fixed number of columns (the number depends on the map) | the table's semantics: Chromium keeps the roles of a table whose cells have another `display`, an older engine may not; the head's empty last `th` is hidden |
| `.now-row` fixed at `height: var(--touch-target-min)` and `.next-row` at `min-height`, both always | the floor on the rows that name a rule only (`[tabindex]`) | a page 60 px taller at 360 with the rows empty of a rule; the other way would make the rows jump by 30 px when a rule appears |
| The window's height `calc(100vh - 220px)` in the phone layout | `60vh` (loses space on tall phones, gives 444 px at 740) ; making the menu bar stick (D-370 rejects it) | the allowance is arithmetic from the bar at 360, see Problems 2 |
| `ch` for the label and the column widths of the table | `px` (the layout dimensions of `width` stay exempt, so also allowed) | none known; `ch` follows the font size |

## Reaches beyond the dispatch (section 1)

- `.the-way/task-cycle/change/slice.md` and `walkthrough.md`: named by section 1 and section 3 of the method, not by the handoff's list.
- `foundations/environment_facts.md:1027` (`android-touch-target-size`): the handoff names "entry 2 (the new environment fact)" without a line; I found it by searching its identifier.
- `tests/invariants/test_browser_view_token_values.py` lines 25-60 (what the test reads as a value in place of a token): to know that px inside `max-height`/`width` is a layout dimension.
- `src/browser/view/tabs-area.tsx`, `src/browser/view/tile-list.ts`, `src/browser/kitchen-sink/tile-samples.tsx` (the table's markup and the kitchen-sink table that shares `.tile-list`), `src/browser/sim/types.ts`, `game.ts`, `saved-game.ts` (lines 1056-1085), `data/maps.ts`, `data/conditions.ts`, `data/items.ts` (to compose the states): reads to compose and to check that the rules fit the markup of both tables.
- `src/browser/view/end-window.tsx`: not read whole, only its structure by grep, to find the classes.

## Working copies

- `.runs/slice-19/` (composing script, saved documents, helper scripts, screenshots before/after, test and build logs) and `.playwright-cli/` (the measurement script, snapshots, console logs) in the worktree: stood in the worktree root; removed with `rm -rf` by their full paths. The browser session was closed with `playwright-cli close`, and `npm run local:stop` ended the start ("Local starts stopped: 1"). `dist/` was rebuilt by `npm run build` (the product's own output, ignored). `.runs/local-start/` holds the database of the start, made by the product's own tool, and stays outside the rule.

## Unread material

- `.runs/task-cycles/uklad-na-telefon/task.md`: read lines 20-79 (To do, Acceptance criteria, Questions 1-7), not the rest.
- `foundations/decisions.md`: D-396, D-19, D-311, D-370, D-368, D-133, D-343, D-336, D-421 each read whole at the ranges I found by grepping their headings (D-311 read to the end of its entry at line 10672); the handoff's own ranges differ from the plan's and I used the current ones.
- `.claude/skills/loop2-play/SKILL.md`, `guidelines/styleguide-browser-view.md` (read whole in three pages), `guidelines/coding.md`, `src/browser/AGENTS.md`, `.the-way/task-cycle/change/ui_check.md`, `slice.md`, `walkthrough.md`: read whole.
- `foundations/glossary.md`: read lines 16-27 (map run), not the rest.
- `src/browser/view/tile-table.tsx`: read whole.
- `src/browser/run-screen.css` and `src/browser/styles.css`: read whole.
- `.runs/task-cycles/uklad-na-telefon/plan.md` and `cycle.md` and other agents' reports: not read, by the handoff.

## Searches not found or unclear

- The handoff's note 2(a) says "the rows `now-row` and `next-row` measured under 48 px at 360 px after slice 7: they open a rule by a tap" - on a map run with no winning rule the rows carry no `tabindex` and are not listed by the measurement; they are listed only while they name a rule. Not unclear in effect (I hold both rows), only in when the measurement sees them.
- The handoff says the plan's *Read* includes the "entry 2 (the new environment fact)" with no address; found `foundations/environment_facts.md:1027` by searching.
- The handoff's list of checks names "a map run of Las with its table of many tiles on „Teren”" - the table of a loaded save has up to 16 rows at 4 × 4 (Las), so "many" is 12-13 revealed tiles here; there is no larger map.
- No test covers the phone rules; none was looked for beyond `grep` for `run-screen.css`/`styles.css`/`overflow-x` in `tests/`, which found three files that read the stylesheets (the two invariants run above and `tests/view/shared-controls.test.mjs`, not run: not in the slice's *Checks* and it reads shared controls, not the rules I touched).
