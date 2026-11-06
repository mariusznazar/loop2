# Slice 4 report: the scene drawn still

**Status:** done with concerns (the badge's bar is twice the token at the scale 2, see *Choices*; the mage's places were corrected after the orchestrator's answer, see *Mage's places*)

## Commits

Branch `task/scena-z-ludzikiem` in `C:/Storage/repos/loop2-wt/scena-z-ludzikiem`, on top of `73564b5`. Pinned the-way unchanged (`61c72fb`). Worktree clean after the commits.

- `ddff013` feat: :sparkles: draw the scene still in the world area: the forest, props, campfire, the mage and the badge over its head, greyed at a pause and for a dead mage
- `a3368dc` test: :white_check_mark: check the scene's parts in each way it stands, its badge, fire and greys, and that a click on it does nothing
- `5d12eea` fix: :bug: move the mage's places 16 pixels left for its wider frame, the moss's further, so each prop stays seen beside the mage (resume, the orchestrator's answer)

## Files changed (`git diff --stat 73564b5..HEAD`)

| File | Change | Added | Removed |
|---|---|---|---|
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/src/browser/view/scene.tsx` | new component | 132 | 0 |
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/src/browser/styles.css` | scene rules replace the one `.scene` rule | 109 (net) | |
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/src/browser/view/world-area.tsx` | draws `Scene` in place of the `img`; comments | 39 (net) | |
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/src/browser/sim/data/scene.ts` | `rightEdgeX` 292 to 291 (see below) | 8 (net) | |
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/tests/view/scene.test.mjs` | new, 11 cases | 444 | 0 |
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/tests/view/world-area.test.mjs` | the scene case follows the scene | 38 (net) | |
| `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/tests/view/scene-picture.test.mjs` | `RIGHT_EDGE` 292 to 291 | 2 (net) | |

Totals: 734 added, 38 removed over the seven files. `scene.ts` and `scene-picture.test.mjs` are the two files the handoff added to the slice's *Change* for the right-edge correction alone; nothing else of slice 3's files was touched.

## What was built

- `scene.tsx` draws from `sceneDrawing(state)` and holds no state. Structure, all inside `div.scene[aria-hidden="true"][data-standing=…]`: `img.scene-background` (the forest, `alt=""`, `width`/`height` attributes from `sceneSize`), one `div.scene-prop[data-resource]` per prop, `div.scene-fire[data-burning]` only where a campfire stands on the character's tile, and `div.scene-mage` holding the idle sheet (`.scene-sheet.scene-mage-sprite`) and, only while a badge is due, `div.scene-badge`.
- Every sprite stands at a place and size given as percentages of the frame (336 × 152) in inline `left/top/width/height`; a sheet's frame count is the custom property `--frames`, and the sheet shows its first frame. The badge's icon is `span.action-icon` with `--icon: url("/icons/<file>.svg")` as the rule's row draws it; its bar is `.scene-badge-bar > .scene-badge-fill` with `--progress` (0 to 1) set on the fill.
- The still scene puts the mage at the goal's place, and at the clearing (160) where the goal is "stays", since the previous reading is Slice 5's. The badge is a child of `.scene-mage` and the sheet its sibling, so Slice 5 can flip the sheet without flipping the badge.
- `styles.css`: the scene's rules read tokens only (`--panel`, `--text-strong`, `--highlight`, `--positive`, `--space-xs`, `--bar-width`). The two greys stand each with a comment naming its source: `.scene[data-standing="paused"] { filter: grayscale(1) brightness(0.5); }` (old Loop `Scene.tsx` at cdc7c0d; D-322) and `.scene[data-standing="dead"] .scene-mage-sprite, .scene-fire[data-burning="false"] { filter: grayscale(1) brightness(0.55); }` (old Loop `sprites.tsx` line 64 at cdc7c0d; D-322, D-316). The old `.scene` rule (an `img` of `height: auto`) is replaced. No token, colour or role was added.
- `world-area.tsx` draws `<Scene state width height />` where the `img` stood; `SCENE_SCALE` stays 2, `sceneSize` stays exported.

## Badge's size and why

- Scale 2 (committed, 672 × 304): icon side 32 px, padding `--space-xs` (4 px), gap `--space-xs`, bar `calc(var(--bar-width) * 2)` (4 px); badge about 40 px wide over a mage figure about 50 px wide. I first tried 24 px with the bar at `--bar-width` (2 px): the icon was readable but small and the 2 px bar all but vanished (`scale2` frames viewed while trying; those trial files are deleted). 32 px reads as clearly as the icons of the rule rows next to it, and the 4 px bar shows its fill at 17 % and at 53 %.
- Scale 1 (336 × 152, constant changed locally and reverted): icon side 16 px, bar `--bar-width` (2 px); the badge is 24 px wide over a figure 25 px wide, the same two thirds of the figure's width as at the scale 2. The icon reads at that size on the screenshot.
- The icon's side is a rule keyed by `.run-screen-areas[data-scene-scale="…"]`, as the layout's other scale rules are, so choosing one scale deletes the other's rule. The bar's doubling at the scale 2 is likewise one rule.

## Right edge (handoff item 1) and mage's places

Slice 3's concern was true for 292: the idle frame 0 box is (20, 32, 45, 64), so the last opaque column is 44, which at x 292 lies at 336, one past the frame's last (335); on the first screenshot the last two screen columns held figure pixels and were clipped. I first moved it to 291 (`ddff013`). The orchestrator then answered that the mage's frame is 64 px wide and the old Loop's was 32, so every place of the mage moves 16 px left; the right edge became 275 (`5d12eea`).

### Mage's places, final values (left edge of the mage's frame, in pixels of the 336 × 152 frame)

| Place | Before | Final | Why |
|---|---|---|---|
| moss | 26 | **32** | The orchestrator's shift gives 10, but at 10 the figure (columns 30 to 55) stood on the whole moss (40 to 52) and hid it (`scale2-gathering-moss-badge.png` of that try). Adjusted by whole pixels to 32: figure 52 to 77, just right of the moss, which shows beside the mage |
| sticks | 58 | **42** | the shift; figure 62 to 87 over the sticks 80 to 102: the sticks show beside the mage, only their left 7 columns are under the figure |
| berry bush | 240 | **224** | the shift; figure 244 to 269 over the bush 252 to 281: the mage stands at its lower left, the bush's top and right side are seen |
| fire | 96 | **80** | the shift; the mage stands left of the fire (124 to 156), the fire is seen |
| clearing | 160 | **144** | the shift; the mage stands in the middle of the clearing (figure centre 176.5 of 336) |
| right edge | 292 | **275** | the shift of the 291 of `ddff013`; figure ends at column 319, 16 px inside the frame, whole and clear of the border |

The props' and the fire's own places stay (moss 40, sticks 80, berry bush 252, fire 124). `tests/view/scene-picture.test.mjs` keeps each expectation written out (`MAGE_AT_*`, `CLEARING`, `RIGHT_EDGE`), and `tests/view/scene.test.mjs` its percentages (sticks 12.5 %, berry bush 66.6667 %, fire 23.8095 %, right edge 81.8452 %, clearing 42.8571 %).

## Props and fire (handoff item 2)

On the screenshots the moss (128), the berry bush (122), the sticks (132) and the fire (132) all rest on the snow of the background; none floats over it or sinks into it. The background is flat snow with no ground line, so the old Loop's bottom lines read as depth, the bush further back than the moss. No place was corrected except the mage's right edge above.

## Checks (command, exit code)

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `npm test -- tests/view/scene.test.mjs` with a stub `Scene` that returns null | 1 | 9 failed, 2 passed. Each failure is the assertion "the scene stands in the page: expected a true value, got null". The two passes are the click case (it found the old `img.scene` still in the world area) and the no-map-run case, both satisfied by the stub. |
| 2 | `npm test -- tests/view/scene.test.mjs` with the real component (first run) | 1 | 2 failed, 9 passed: my test read the sheet of the mage wrongly (`sheetOf` on the sheet element itself) and jsdom answers `none` for a scene with no filter. Both are test slips; fixed in the test, not in an assertion's strength. |
| 3 | `npm test -- tests/view/scene.test.mjs` (after the fix) | 0 | 11 of 11 pass. |
| 4 | Mutation: pause grey `brightness(0.5)` to `0.6` in `styles.css`, then `npm test -- tests/view/scene.test.mjs` | 1 | the greys case fails. Restored. |
| 5 | Mutation: the dead mage's grey moved from `.scene-mage-sprite` to the whole scene, same command | 1 | the greys case fails. Restored. |
| 6 | `npm test -- tests/view/world-area.test.mjs` | 0 | 13 of 13 pass. |
| 7 | `npm test -- tests/view/scene-picture.test.mjs` (touched by the right-edge move) | 0 | pass. |
| 8 | `npm test -- tests/view/run-screen.test.mjs` (code touched) | 0 | pass. |
| 9 | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | pass. |
| 10 | `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 | pass. |
| 11 | `npm test -- tests/invariants/test_content_identifiers.py` | 0 | pass. |
| 12 | `npm test -- tests/invariants/test_browser_view_framework.py` | 0 | pass. |
| 13 | `npm test -- tests/quality/test_quality_invariants.py` | 0 | pass (ESLint, Prettier, Ruff over the touched files). |
| 15 | After the change of places (`5d12eea`): `npm test -- tests/view/scene-picture.test.mjs`, `tests/view/scene.test.mjs`, `tests/view/world-area.test.mjs`, `tests/view/run-screen.test.mjs`, `tests/invariants/test_content_identifiers.py`, `tests/quality/test_quality_invariants.py` | 0 each | pass; Prettier `--check` on the three changed files exit 0 |
| 14 | `npm run build` (after each change, and at the end with `SCENE_SCALE = 2`) | 0 | pass; the typecheck stands inside it. |

Each `npm test -- <file>` builds first; the commands in rows 3 and 6 to 13 were run on the committed state (all with exit 0).

**Not run:** `npm test` with no argument and `python -B .the-way/elements/common/foundation_check.py` (the orchestrator's gate); `tests/invariants/test_loop2_container_sprites.py` (needs Docker; the slice adds no sprite file). Mutation testing with Stryker (the testing guidelines do not adopt it for browser-view).

## Own-work check

- **Requirement most likely not met:** (a) "a click on [the scene] does nothing, no pause sign" (To do 11), the old Loop's click-to-pause being the likeliest thing to be carried over; (b) the mage whole inside the frame at the right edge; (c) the two greys with the right scope. **Checks and results:** (a) `tests/view/scene.test.mjs`, the click case clicks the scene and every element inside it through the real `createRunScreen` with spy controls: no control called, page markup unchanged; and in the real browser (`npm run local`, a second start) a click on `.scene`, `.scene-mage`, `.scene-badge` and `.scene-prop` left `data-standing="going"` and the minute running (37 then 41), no focusable element inside the scene, focus not moved. (b) the pixel read above and `scale2-exploring-right-edge.png`. (c) the greys case reads the real `styles.css` laid on a jsdom page and compares `getComputedStyle(...).filter`, and fails under mutations 4 and 5.
- **UI check (`ui_check.md`):** the scene is no shared control, so the styleguide's list of control states does not apply, and the kitchen-sink page does not draw the game from a state (D-45). The route to a running screenshot is `loop2-play`; it was performed (below).

## Screenshots, in `C:/Storage/repos/loop2-wt/scena-z-ludzikiem/docs/task-cycles/scena-z-ludzikiem/screenshots/`

All files were retaken after the move of the places (`5d12eea`), the moss at its final 32. States were composed with the game's own functions (a scratch script in `.playwright-cli/`, not committed) and sent by the ordinary save request; then the screen of the map run was opened. Each file is the scene element alone unless it ends in `-page`. At the scale 2 (committed) and at the scale 1 (constant changed locally, rebuilt, shot, reverted, rebuilt; the committed constant is 2):

| State | Scale 2 | Scale 1 |
|---|---|---|
| mage gathering a stick, badge with the "Zbierz" icon and the fill at about half, going | `scale2-gathering-stick-badge.png`, full page `scale2-gathering-stick-badge-page.png` | `scale1-gathering-stick-badge.png`, `scale1-gathering-stick-badge-page.png` |
| gathering moss, at its place | `scale2-gathering-moss-badge.png` | `scale1-gathering-moss-badge.png` |
| gathering the berry bush, at its place | `scale2-gathering-berry-badge.png` | `scale1-gathering-berry-badge.png` |
| waiting: no badge, mage in the clearing | `scale2-waiting-clearing.png` | `scale1-waiting-clearing.png` |
| exploring: mage at the right edge, "Eksploruj" badge | `scale2-exploring-right-edge.png` | `scale1-exploring-right-edge.png` |
| at the burning fire, feeding it, badge | `scale2-at-the-fire-burning.png` | `scale1-at-the-fire-burning.png` |
| extinguished fire (same picture, grey, still), going | `scale2-at-the-fire-extinguished.png` | `scale1-at-the-fire-extinguished.png` |
| paused: whole scene grey, badge kept | `scale2-paused.png` | `scale1-paused.png` |
| at a discovery: colours kept, badge kept | `scale2-discovery.png` | `scale1-discovery.png` |
| after a death (cold): mage grey, no badge | `scale2-after-death.png` | `scale1-after-death.png` |
| after a completion: mage in colour, no badge | `scale2-after-completion.png` | `scale1-after-completion.png` |

After the final places I looked at the scale 2 files of the sticks, the moss, the berry bush, the burning fire and the right edge and the clearing (the sticks, the moss and the bush all show beside the mage, nothing is clipped), and at the scale 1 files of the moss and the right edge. I did not open each other file of the retake; the state of each was read from the page (`data-standing`, badge present or not, fill) when it was taken and matched the table.

**Unchecked:** motion of any kind (Slice 5); the scene at 1×, 4× and 16× by a person (Acceptance criteria); the badge's legibility at 16× pace (that is motion, Slice 5); the scene at a window narrower than the three-area layout.

## Choices made (with the way rejected and its cost if wrong)

1. **The place of the mage "stays" in the still scene is the clearing (now 144).** The plan says so ("the clearing where there is none"). *Rejected:* the last goal's place (would need a memory, Slice 5's E5). Cost if wrong: after a death or in combat the mage stands in the clearing until Slice 5 keeps its place; the death screenshot shows it there.
2. **Percentages for place and size, `--frames` for the frame count, `--progress` for the bar.** *Rejected:* a `px` length per sprite in the stylesheet (breaks `browser-view-token-values`' spirit and doubles with the scale). Cost if wrong: a reviewer who wants the inline `style` free of custom properties; the fill could be a plain `width: N%`.
3. **`img` elements inside a clipping sheet, `width: calc(var(--frames) * 100%)`.** *Rejected:* `background-image` with `background-size` (the file would stand in a style string; tests would parse a URL). Cost if wrong: Slice 5 animates `transform` of the `img` instead of `background-position`.
4. **The bar at the scale 2 is `calc(var(--bar-width) * 2)`.** *Rejected:* `--bar-width` alone (2 px bar on a 40 px badge, nearly invisible at the scale 2). The handoff says the bar's thickness is an existing token; a product of the token and 2 is not a new token, but a reviewer may read it as a value of its own. Cost if wrong: one rule deleted and the bar goes back to 2 px.
5. **Badge position `bottom: 56%` of the mage's frame, centred with `inset-inline: 0; margin-inline: auto; width: fit-content`** (no `transform`, so Slice 5 may animate the mage's wrapper freely, and no half pixel from `translateX(-50%)`). The 56 % puts its bottom edge about 3 frame rows above the idle head (row 32) and the run head (row 29). *Rejected:* a fixed px offset. Cost if wrong: the head touches the badge in some run frame; Slice 5 sees it.
6. **`overflow: hidden` on the scene.** Clips anything that lies outside the frame, the badge near the edges included. At 291 nothing does.
7. **The scene element's `className` is exactly `scene`** because `tests/view/world-area.test.mjs` reads the world area's parts by class; all other state is in `data-*`.
8. **The test for the greys lays the real `styles.css` on the jsdom page and reads `getComputedStyle().filter`.** *Rejected:* a regex over the CSS text. Cost if wrong: a jsdom upgrade that drops `filter` from computed styles would make the case fail for a reason other than the code (it would fail loudly, not pass).

## Changed existing case

`tests/view/world-area.test.mjs`, "the scene is the picture of the forest at the size of the scale, with no text inside or over it": the scene is no longer one `img`, so the case now names its cause (To do 1 and 7, task scena-z-ludzikiem) and reads the size and source from `.scene-background`, `aria-hidden="true"` on the frame, `textContent === ""` and `alt=""` on every image. It keeps its two checks of the size and of no text. Its old check "the scene has no child and its parent is the world area" became "the frame is the world area's first child and holds no text".

## Problems observed

- **The mage covered the sticks and, after the first shift, the moss**: resolved, see *Mage's places*. After the final places each prop stands visible beside the mage, the sticks and the bush partly under the figure (the figure spans 7 of the sticks' 22 columns and 17 of the bush's 29, the bush only at its lower left).
- **A loaded run comes back paused and grey**, as the skill says, so a screenshot of "going" needs a click on "Wznów"; each "going" file was taken after it.
- Away time: the composed saves are stamped with the time of their making, so a few seconds of real time passed as game minutes before a screenshot (minute 30 became 35 or 61). Nothing wrong; the progress values in the files differ from the composed state by that.
- jsdom answers `none` for the filter of an unfiltered element; the case maps it to the empty string.

## Searches not found or unclear

- The slice names `ui_check.md` only "if its step names it"; `make-change` section 3 names it for a screen change, so I read it after the work (it adds the screenshot route, which the slice had already given).
- Not found: a place for a pause sign or a "dead" mark; none is wanted (D-321, D-322).
- Unclear: whether `calc(var(--bar-width) * 2)` counts as "an existing token" for the bar (choice 4).
- Unclear: whether the badge, as a child of `.scene-mage`, should be hidden from the filter of the dead mage; the greys' rule hits `.scene-mage-sprite` only, and a dead mage has no badge, so no case arises.
- `foundations/` and `guidelines/` were not touched: the styleguide and coding-guidelines items (To do 14 and 15) belong to later slices; `guidelines/coding-browser-module.md` does not yet list `src/browser/view/scene.tsx`.

## Reaches beyond the handoff

- `C:/Storage/The Brain/The Brain/.ai/rules/git.md` (before the commits) and `scripts.md` (before the scripts).
- `tests/invariants/test_browser_view_token_values.py` (head), to read what it scans in a TypeScript style string and in `filter`.
- `src/browser/view/run-screen.tsx` and `tests/view/run-screen.test.mjs` (the run screen's `createRunScreen` signature and its spy controls, for the click case); `tests/sim/program-fixture.mjs`, `tests/sim/understanding-fixture.mjs`; `src/browser/sim/data/conditions.ts` and `src/browser/sim/types.ts` (the `Condition` and `Action` types) and `src/browser/sim/saved-game.ts` (`loadSavedGame`), `src/browser/sim/game.ts` (`settleDeath`, `advanceMinutes`), for the scratch script that composed the states.
- `docs/task-cycles/scena-z-ludzikiem/plan.md` (Slice 5 section and the passage of Slice 3 on "stays"), to leave a structure Slice 5 can use.
- `docs/task-cycles/scena-z-ludzikiem/sprites/check_outputs.py` (run, not changed), for the right-edge measurement.

## Personal data

None involved. The local accounts used `example.test` addresses and a throwaway password on a database that `npm run local` makes for each start; none is in this report.
