done with concerns

# Report - slice 9 of "loop2: uklad na telefon dla wszystkich ekranow gry"

## Status and commit

- Status: `done with concerns` (one file outside the slice's *Change* list was touched, with the reason below; two things the slice does not cover are named under *Problems*).
- Commit on `task/uklad-na-telefon`: `347adcb73b7d91267240fdaf0ab0ef8e43667bb4` (one commit, the files added by path).
- Not pushed. No other slice started.

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/styles.css` | 30 | 2 |
| `src/browser/character-screen.css` | 5 | 4 |
| `src/browser/run-screen.css` | 31 | 21 |
| `src/browser/account-card.css` (not in the slice's *Change*; see choice 3) | 11 | 0 |

(`git diff --stat` before the commit: 77 insertions, 27 deletions in 4 files.)

## What the change does

- `styles.css`: the `@media (max-width: 720px)` of the columns of Programy, Mapy and Wiedza is now `@media (width < 1280px)` with a comment naming D-396 and D-282. A new block `@media (width < 1280px)` after the `.screen-area` rule sets the shell: `body { padding: 0 var(--space-s) }` (8 px), `.screen-area { padding-inline: var(--space-m) }` (12 px) and `.menu-bar { flex-wrap: wrap; gap: var(--space-xs) var(--space-l) }`. Its comment holds the arithmetic: 360 - 2 x 8 - 2 x (12 + 1) = 318 px for the world area, a crop of 18 px (9 a side) of the scene's 336, under the 32 px the slice allows.
- `character-screen.css`: `@media (max-width: 720px)` is now `@media (width < 1280px)` with a comment naming D-396 and D-282; the head comment of the file no longer says 720 px.
- `run-screen.css`: the computer layout is the base (two columns `706px minmax(0, 1fr)`, rows `auto 1fr`, the areas `"world program" "tabs program"`, `align-self: stretch` of the program), and a block `@media (width < 1280px)` after it restores one column (`minmax(0, 1fr)`, `grid-template-rows: none`, the areas `"world" "program" "tabs"`, `align-self: start`). The head comment no longer counts 1074 px (the bullet "706 + 16 + 320 + 32 = 1074 px" and the remark "under 320 px from 1074 px up to about 1090 px" are gone); the comment of `.end-window` says "the one column of the phone layout" instead of "under 1074 px".
- `account-card.css`: one block `@media (width < 1280px)` setting `.account-card-screen { margin: 0 calc(-1 * var(--space-s)) }`.

## The form chosen for the run screen (handoff note 3)

I chose the second form of the note: the one-column rules move into a block below 1280 px and the two-column rules become the base rules. Reason: the styleguide's rule "Two layouts and one threshold between them" says the phone layout stands in blocks `@media (width < 1280px)` after the computer layout's rules, and gives `@media (min-width: 1074px)` as a bad example; a `@media (width >= 1280px)` block would be a second form of threshold and would leave the phone layout as the unmarked base. Way rejected: `@media (width >= 1280px)` around the unchanged two-column rules (smallest text diff, leaves the computer rules where they stand). Cost if wrong: a reviewer who reads "the computer layout's rules stay as they are" literally sees the two-column rules moved into the base rule; their effect at 1280 px and wider is unchanged (measured below, 161 visible elements with the same rectangles).

## Choices

1. Page padding 8 px (`--space-s`) and area padding 12 px (`--space-m`). Chosen from the scale 2, 4, 8, 12, 16, 24, 32 so that page + area <= 27 px a side: 8 + 12 gives 318 px (crop 9 px a side), 8 + 16 would give 310 px (crop 13 a side, the mage's column 319 still inside) and 12 + 12 310 px. Way rejected: keep the page padding at 16 px and take the area to 8 px (310 px) - it would have left `account-card.css` untouched, but the slice's goal says both paddings become smaller steps. Cost if wrong: 8 px beside the page edge is tight on a real phone; one token change in one block.
2. The menu bar: `flex-wrap: wrap` on `.menu-bar` only. The item list `.menu-bar-items` already wraps; with the bar not wrapping, the name, the items and „Konto” shared one row and the items shrank to their longest word. Way rejected: a column layout of the bar. Cost if wrong: „Konto” stands alone on its own row at the right edge when the name and the items fill the first (seen at 360 px, Siedziba and run screen); a later slice may want it beside the name.
3. The compensation in `account-card.css`, outside the slice's *Change* list. The screen of the login card undoes the body's side padding with `margin: 0 calc(-1 * var(--space-l))`; with the body padding at 8 px that overshoots by 8 px a side. Seen, not assumed: at 360 px with only the three files changed, the phone session reported `innerWidth` 368 and the page scrolling to the side on the login card (Chromium widened the layout viewport); with the block it reports 360 / 360. Way rejected: leave it for the card's slice (slice 16 per the plan's entry table) - the commit would leave the login card scrolling to the side; or put the rule in `styles.css`, against the styleguide rule that a screen's rules stand in its own stylesheet. Cost if wrong: the orchestrator may prefer the slice to stay within its three files and slice 16 to carry this block; the block is 9 lines and can be moved.
4. The one-column tracks of the screens stay `1fr` / `minmax(0, 1fr)` as they were; I did not turn the shared one-column track into `minmax(0, 1fr)` (see Problems, Postać).

## Checks (command, exit code)

| Check | Result |
|---|---|
| `npm test -- tests/invariants/test_browser_view_token_values.py` | exit 0 (4 tests OK) |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | exit 0 (3 tests OK) |
| `npm test -- tests/view/shared-controls.test.mjs` (the one test that names `styles.css`; run as a focused check of touched code) | exit 0 (50 pass, 0 fail) |
| `git grep -n "@media" -- "src/browser/*.css"` | no width threshold but `1280px`: `account-card.css:38`, `character-screen.css:28`, `run-screen.css:68`, `styles.css:258`, `styles.css:283`, `styles.css:557` (all `(width < 1280px)`); the other hits are `prefers-reduced-motion` and the comment lines naming `@media`. No `(max-width: 720px)` or `(min-width: 1074px)` is left in `src/browser`. |
| `npm run build` before each browser check | exit 0 |

No test was written: the rules are phone-layout CSS, which jsdom does not apply (styleguide, "Two layouts and one threshold between them"), and the thresholds' only test coverage is the two invariants above. Seeing an invariant's test fail first does not apply: I wrote no invariant and no test. Not run: the full `npm test` (not allowed by the handoff).

## Own-work check (section 3)

The requirement most likely to fail: "A page area 1280 px wide or wider shows the computer layout ... Nothing outside the phone layout's blocks changes but the thresholds" and the acceptance "at 1280 x 720 each screen looks as before" - especially the run screen, whose rules I rewrote from a min-width block to a base plus a phone block.

Check: in the game started with `npm run local` (`https://127.0.0.1:60978`, a made-up account `agent9@example.test`, the state composed by `compose-state.mjs`, a map run of Skraj lasu paused at minute 5), at the page area 1280 x 720 in a session with no touch I dumped `getBoundingClientRect` of every element of the body (left, top, width, height, one decimal) and a screenshot, once with the changed CSS files replaced by the ones of the base commit (`git show HEAD:...` copied into `dist/public`, then the page reloaded) and once after `npm run build` with my files, in the same game state and the same order of visits.

Result:
- Programy, Wiedza, Mapy (without and with a map picked) and the run screen: 0 elements changed, 0 appearing, 0 disappearing (47-161 visible elements each); the screenshots of Programy, Wiedza and the two Mapy states are byte-identical (same md5).
- Siedziba and Postać: 1 element each differs, the `img` of an animated sprite sheet (`translate` of the frame at the moment of capture); the screenshots are byte-identical.
- The run screen's screenshots differed at first by a white focus frame on the screen in the "before" image (navigation by hash had put focus on it); taken again by the same path (`#/mapy/forestEdge`, then `#/postac/1/przejscie`) the after-screenshot is byte-identical to the before one.
- A first comparison, made with a "before" taken before the map run existed, showed differences only in elements that the map run adds (the menu item „Wróć do przejścia”, the run note, a page taller by 26 px); that was the state, not the CSS, and I redid the "before" in the same state, as above.

Checks of the phone layout (Chromium, touch, `.playwright/cli.phone.config.json`, 360 x 740, logged in on the phone session):
- Siedziba at 360 px: `scrollsToTheSide` false (`scrollWidth` 360 = `clientWidth` 360). The measurement lists `contentWiderThanItsBox` and `outsideTheWindow` only for the picture band (`div.camp`, its sprite sheet and `img.camp-background`, spanning -492..852), which is the cropped picture and belongs to slice 17; `controlsSmallerThan48` lists `a.team-member-name` (36.3 x 18.2) and `summary` "Autorzy grafiki" (318 x 16.8), both named in handoff note 5 as belonging to slices 16-19.
- The login card at 360 px: no scroll to the side (360 / 360) with the block of `account-card.css`; 368 without it (choice 3).
- The run screen at 360 px: `scrollsToTheSide` false; world area 344 px wide and 318 px of content, the scene box 318 px (the number the handoff asks for: **the world area has 318 px inside at a page area of 360 px**, 18 px under the picture's 336, so the crop is 9 px a side; `max-width: 100%` of `.scene` shrinks the picture by a fraction today, which Slice 15 changes). Measurement entries: `div.world-area` content 322 > box 318 (the `.now-row` and `.next-row` rows use `margin-inline: -4px` with `padding-inline: 4px` by the base rules, so the row's right edge is 4 px past the content edge inside the area's padding; not visible), the scene's sprite sheet and an `img` spanning 157..400 (the mage's sheet, clipped by the scene's `overflow: hidden`).
- Mapy (`#/mapy/forestEdge`), Programy (`#/programy/1`), Wiedza (`#/wiedza`) and the run screen at 360 px: the areas stand in one column (same `left` 8, width 344, increasing `top`), in the order of the document: the list of maps over the card, the list of programs over the program panel, Zrozumienie over Umiejętności, the world over the program over the tabs.
- The same screens at the page area 1100 x 800 (after `resize`, the touch kept): one column, areas 1084 px wide at `left` 8, no scroll to the side. Postać at 1100 also one column.
- The boundary: at 1279 x 800 the run screen stands in one column (areas 1263 px wide); at 1280 x 800 in two (the world 706 px, the program 526 px at `left` 738, the tabs under the world) - the 706 px and the 526 px of the base comment.
- The menu bar at 360 px wraps: the name and the four items stand on the first row („Wróć do przejścia · Skraj lasu · minuta 5” on the second row on Siedziba) and „Konto” on a row of its own at the right; nothing crosses the window.

Walkthrough (`walkthrough.md`): the change alters what the user sees at a page area under 1280 px (columns, paddings, the menu bar) and, by moving rules, could alter the computer layout. Plan of cases and verdicts:

| Case | By what | Verdict |
|---|---|---|
| 1280 x 720: the six screens look as before | browser (Chromium, `https://127.0.0.1:60978`, no touch): rectangles of every element and screenshots, before and after in one state | as before (see above) |
| 1280 and 1279 px boundary on the run screen | browser, `resize` | two columns at 1280, one at 1279 |
| 1100 px: run screen, Programy, Mapy, Wiedza in one column | browser, touch session, `resize 1100 800` | one column each, no scroll to the side |
| 360 px: no scroll to the side for the shell, read on Siedziba | browser, phone session, `scrollWidth` vs `clientWidth` and `phone-measure` | no scroll |
| 360 px: the world area holds at least 304 px | browser, element widths | 318 px |
| 360 px: menu bar wraps within the width | browser, phone session | wraps, nothing outside the window |
| 360 px: the login card does not scroll | browser, phone session before logging in | no scroll (with the `account-card.css` block) |
| 360 px: Postać | browser | page scrolls to the side (402 > 360), see Problems 1 |
| side observation | - | the notes under Problems |

Not checked: the screens that need a state I did not build (the end-of-run window, the owner panel, the waiting screens, the open menu „Konto”, the open rule panel) at 360 px; they belong to later slices and the shell change touches them only through the page padding. Firefox and Edge (D-396: checked by hand). A real phone.

## Problems as observed

1. Postać at 360 px scrolls to the side (`innerWidth` 402, `scrollWidth` 402 over `clientWidth` 360): the one-column track of `.screen.character-areas` is 394 px, not 344, because the track `1fr` cannot go under the content's minimum; elements reaching past 360 are `.character-head` (389), `.character-screen-status` (389), `.character-tree-row` and its children (389) and the figure's sprite `img` (501, clipped by `overflow: hidden`). Cause (verified for the widths, a guess for which element sets the minimum): `.character-tree-row` has fixed minimums in `grid-template-columns: auto minmax(0, 1fr) 6em minmax(4em, 10em) 6em 4em` with 12 px gaps. It is the content of the screen Postać, not the shell; it already overflowed at 360 px before this change (the paddings were wider). Left for the slice of Postać. Not fixed here.
2. Stale comments in files outside this slice's list that still count 720 px: `src/browser/maps-screen.css:10` ("one under the other in a window under 720 px") and `src/browser/knowledge-screen.css:11` ("under the other in a window under 720 px"). The rules they describe are the ones in `styles.css` now at 1280 px. Not changed: not in *Change*; a later slice that touches those files should fix them.
3. The page area at 360 x 740 is what the CLI's phone setting gives; Playwright reported `innerWidth` 368 when something wider than 360 stood on the page (the login card before the block of choice 3) and went back to 360 after it - the measurement is therefore a good detector of a shell overflow.

## Reach beyond the dispatch (section 1)

- `src/browser/account-card.css` (changed, though not in the dispatch; lines 1-70 before the edit, the rest after; the rest holds no negative margin, also found by searching `calc(-1 * var(--space` in `src/browser/*.css`): to see how the card undoes the body's padding.
- `src/browser/index.html`, `src/browser/tokens.css` (the `--space-*` lines by search): to know the spacing scale and the stylesheets the page links.
- `tests/` searched for `1074`, `720 px`, `max-width: 720` and for the names of the three stylesheets: found only the invariant tests' own fixtures and `tests/view/shared-controls.test.mjs`, which I ran.
- `.the-way/task-cycle/change/slice.md` and `walkthrough.md`: named by the method.
- `src/browser/sim/data/scene.ts:36-63` read as named; no other source of the scene was read.

## Working copies

- `.runs/slice-9/` (rectangle dumps, screenshots, the measurement scripts, build and test logs) and `.playwright-cli/` (the composed state, the CLI's session files) in the worktree stood and are removed (`rm -rf` by full path). The "before" CSS copied over `dist/public/*.css` was restored by `npm run build` before the final check; `dist/` is the product's own build output.
- The game started by `npm run local` was ended with `npm run local:stop` ("Local starts stopped: 1"); its database under `.runs/local-start/` stays by the product's own rule. The browser sessions were closed (`playwright-cli close`).
- No screenshot was pushed or shown: the slice's screenshots were looked at and removed.

## Unread material

- `guidelines/styleguide-browser-view.md`: read whole (three pages).
- `guidelines/coding.md`, `src/browser/AGENTS.md`, `.claude/skills/loop2-play/SKILL.md`, `.the-way/task-cycle/change/ui_check.md`: read whole.
- `foundations/decisions.md`: D-396 (5508-5526), D-280 (4525-4597), D-282 (4644-4675), D-311 (10539-10673), D-166 (8313-8335), D-421 (4852-4866), D-43 (5067-5081): each read whole. 
- `foundations/invariants.md:478-497`, `foundations/part_map.md:3-33`, `src/browser/sim/data/scene.ts:36-63`: read as named.
- `.runs/task-cycles/uklad-na-telefon/task.md:26-45` and `:81-95`: read lines 20-99 in one read.
- `src/browser/styles.css`, `src/browser/character-screen.css`: read whole before the change. `src/browser/run-screen.css` (1471 lines) and `src/browser/account-card.css` (103 lines): read whole before / after the change (the last 12 lines of `run-screen.css` and lines 70-103 of `account-card.css` through a second look at the end, not before the edit; they hold no threshold and no negative margin).
- The `D-370`, `D-389` and `D-44` entries named in the notes' list of ranges were not read; the slice does not touch the window's width, the picture band or the destructive button.

## Searches not found or unclear

- The handoff's *Checks* line "at 360 px the page does not scroll to the side for the shell (read on Siedziba)" says nothing of the login card; the card's overflow (choice 3) is what the check does not name, and I found it only by opening the card in the phone session.
- Unclear: whether the orchestrator wants the compensation of the login card in this slice (done) or in the slice of the card; nothing in the handoff says which slice owns `account-card.css`.
- Unclear: the handoff and the plan say "the page's side padding and the padding of an area are smaller steps" but do not say which steps; I chose 8 px and 12 px by the arithmetic above (the task's text gives only the 304 px floor).
- I found no named place for the screenshots of a slice's own checks; none was kept (the plan's choice: working copies, looked at and removed).

## Questions

- None blocking. Recommended answers if asked: keep `account-card.css` in this commit (it is the smaller deviation from the slice's boundary than leaving the card scrolling to the side); leave Postać's overflow and the two stale comments to the slices of those screens.
