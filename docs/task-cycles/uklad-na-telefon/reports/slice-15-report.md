**Status:** done with concerns

# Slice 15 — the scene's two sizes: report

## Files and commits

One commit on `task/uklad-na-telefon`, on the slice's base `986377e390de1a8cb776aa7c171ecc1f89f12842`:

- `5acdcdbb` feat: :sparkles: draw the scene of a map run at its picture's size, 336 × 152 px, in a phone layout narrower than 707 px and at twice it elsewhere (… D-349, D-372, D-396)

| File | Added | Removed |
|---|---|---|
| `src/browser/run-screen.css` | 79 | 17 |
| `src/browser/view/world-area.tsx` | 17 | 10 |
| `src/browser/view/scene.tsx` | 10 | 5 |
| `src/browser/sim/data/scene.ts` | 5 | 3 |
| `src/browser/styles.css` | 3 | 2 |
| `tests/view/world-area.test.mjs` | 12 | 7 |

What changed:

- `world-area.tsx`: the scene stands in a place of its own, `<div className="scene-place">`; the comments on `SCENE_WIDTH`/`SCENE_HEIGHT` and on the area speak of two sizes and of the place.
- `run-screen.css`:
  - `.scene-place` is a flex row that centres the scene, with `overflow-x: clip`.
  - `.scene` gets `flex: none`. Its `width: fit-content; max-width: 100%` go, and so do `max-width: 100%; height: auto` of `.scene-background`. The frame is never scaled by a fraction any more.
  - A phone block `@media (width < 1280px)` gives `.scene-place` the margin `calc(-1 * var(--space-m))`: the place takes the world area's side padding.
  - A block `@media (width < 707px)`, after the plaque rules, draws the background at 336 × 152 px. In the same block the plaques of a discovery take a size of their own: padding 0 and an icon of 16 px.
  - The comments of the scene, the badge, the flying icon and the plaques follow the new D-349: no "one size" is left.
- `scene.tsx`: comments only (header, `pixel()`, `SceneProps.width/height`, `Ground`). The function `Scene` is not touched.
- `scene.ts`: the comment of `PICTURE_PIXEL` follows D-349. No value changed.
- `styles.css`: one comment of slice 9 (the phone shell) is corrected; it said the scene is cropped 9 px a side at 360 px, which is no longer true.
- `tests/view/world-area.test.mjs`: the order lists start with `scene-place` instead of `scene` (4 lists). The case "the scene is the picture of the forest at 672 × 304 px" now reads the scene inside its place: the place is the first child of the world area, holds the scene alone and has no style. The cause lies in the requirement: the plan's place in `world-area.tsx`, which D-349's crop needs.

No sprite file changed.

## Checks

| Command | Exit |
|---|---|
| `npm test -- tests/view/world-area.test.mjs` with the updated test on the base `world-area.tsx` (the test seen failing; the file restored after) | 1 (3 cases failed: the order of the world area, Teraz and Potem, the scene at 672 × 304) |
| `npm test -- tests/view/world-area.test.mjs` | 0 (24 pass) |
| `npm test -- tests/view/scene.test.mjs` | 0 |
| `npm test -- tests/view/scene-picture.test.mjs` | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 (4 tests OK) |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 (2 tests OK) |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 (8 tests OK) |
| in the running game (loop2-play), see the walk below | measured, see below |

Not run:

- The full gate (`npm test` with no argument): it is the cycle's run, as the method gives.
- `foundation_check.py`: this slice writes no foundation entry.

## Own-work check

**Requirement most likely unmet.** "The crop hides nothing the player acts with, such as a creature" (task, item 5; D-349: "a creature at an edge in full sight").

**Check.** I read the frames of the sprites with PIL, in a one-time script `cols.py` in `.runs/slice-15/`, now removed:

- The wolf's sheets fill their frame from column 0 to column 63.
- The mage's figure takes columns 20 to 44 of its frame.
- By `creaturePlace`, the wolf fighting the mage at the berry bush (`mageAt` 224) stands on the mage's right, in the frame of columns 271 to 334 of 336.

**What it showed.** With the planned crop, the world area 318 px wide at 360 px and the crop centred, 9 px would go on each side. The scene would show columns 9 to 326 only, so the wolf at the bush would lose the last 8 columns of its frame, its tail. The mage at the right edge (column 319) would stay whole. The plan checked only the mage and the creature beside it there.

**Correction.** The place of the scene takes the area's side padding in the phone layout (12 px a side). At 360 px the place is 342 px, the scene 336 px, 3 px to spare a side, and nothing is cropped.

Measured in Chromium at 360 × 740 with touch (the scene's `getBoundingClientRect`):

- place 9..351 (342 px), scene and background 12..348, 336 × 152;
- the mage at the right edge: box 287..351, so its figure's last column is at 12 + 319 = 331 < 348;
- the frame of the wolf at the bush, by its percentages, would be at 283..347, inside.

Whether the frame is whole is decided by measurement. I saw no wolf in the scene, since none attacked in the walk.

## The walk

What the change alters for the player:

- In the phone layout the scene is no longer scaled by a fraction: it is 336 × 152 below 707 px and 672 × 304 from 707 px.
- At 360 px the scene stands whole, centred, reaching almost to the area's frame.
- The plaques of a discovery are smaller at the smaller scene.
- The computer layout is unchanged.

Shared code touched: the world area's markup (the place) and the scene's rules of `run-screen.css`.

Where: Chromium of Playwright CLI 0.1.22, `npm run local` at `https://127.0.0.1:57182` (and `:57909` for "before", on the base). The session was named `s15`, of this cycle alone. Phone: `.playwright/cli.phone.config.json` (360 × 740, `hasTouch`, `isMobile`), operated by taps. Computer: a new session with the ordinary setting, 1280 × 720, no touch.

| Case | By what | Verdict |
|---|---|---|
| Before, at 360: the scene scaled by a fraction | measurement on the base: scene and background 318 × 143.8 | confirmed the fault of D-349 the task names |
| At 360 the picture is 336 × 152 | `getBoundingClientRect` of `.scene-background`: 336 × 152 at 12..348 | pass |
| At 360 the mage at the right edge is whole, with its badge | screenshot and measurement: mage box 287..351, figure to 331; badge 299..339 (40 × 48, icon 32 px) | pass |
| At 360 nothing is cropped and nothing scrolls to the side | place 342 holds 336; `scrollsToTheSide` false | pass |
| At 720 (phone layout) the scene is 672 × 304 | measurement: scene 672 × 304, place 702 | pass |
| At the threshold, 707 px: 672 × 304; at 706 px: 336 × 152 | measurement: place 689 / 688, scene 672 / 336 | pass |
| At 1280 × 720 (no touch) the scene and the screen are as before | measurement: world 16..722, scene 33..705, 672 × 304, the same as before; screenshots of the scene before and after side by side; a probe plaque of a discovery 36 × 36 with 4 px padding, as before | pass |
| At 1× the badge, a plaque of a discovery and the flying icon are legible | screenshots at 360. Badge 40 × 48, icon 32 px. Plaques of a discovery 20 × 20, 2 px apart (four plaques measured at 145, 167, 189, 211). Flying-icon plaque 32 × 32, held mid-flight by pausing its animations | pass, but see concern 2 |
| A tap on a tile of the drawing still marks its row inside the new structure | tap at 360 on tile (1, 1): its row marked, line "(1, 1): patyk 7 · jagoda 8" | pass |
| The phone measurement of loop2-play at 360 | `scrollsToTheSide` false. `contentWiderThanItsBox`: `div.world-area` content 330 > box 318, and a `scene-sheet` (a sprite sheet clipped by design). `outsideTheWindow`: one sprite sheet `img` (−74..182). `controlsSmallerThan48`: `now-row`, `next-row` (18.2 px high) | see concerns 3 and 5 |
| Side observation | while setting a rule by touch at 360 | a tap on the bare area of a rule's row does not open it, see "Errors outside the scope" |

**What I did not check:**

- A wolf in the scene at either size: no attack came in the walk. Its place is computed from the percentages and the measured frame, above.
- Firefox and Edge (D-396 leaves them to a person).
- A window 707 to 723 px wide with a classic scrollbar. The touch session has overlay scrollbars and the 1280 session does not reach that width.
- The completion, the death and the frost at 1× in the browser: they are percentages of the frame, unchanged.

I saw no game error in the console. The only lines are the 401 of `/api/account` before signing in and the 404 of the favicon, which are ordinary.

## Screenshots

Every screenshot was a working copy in `.runs/slice-15/`, looked at and removed. None is shown to the human: the plan gives the set of screenshots to slice 20.

- Before, from the base: the scene at 360, 720 and 1280 × 720, with the badge, the four plaques of a discovery and the flying icon.
- After: the same, at 360 also with the mage at the right edge, and at 706, 707 and 720.

## Reaches beyond the dispatch

- `src/browser/styles.css`: read whole, since its phone block holds the paddings of slice 9 and its comment had to change (see section 4 below).
- `tests/view/world-area.test.mjs`: read in the passages of the order lists and of the 672 × 304 case, and changed.
- `guidelines/testing.md`: read before changing the test.
- `src/browser/view/scene-picture.ts`: the passages `goalOf`, `creaturePlace`, `plaquesOf`, to check where a creature and the plaques stand.
- `src/browser/view/run-screen.tsx`: lines 190–215, where the world area stands.
- `tests/invariants/test_browser_view_token_values.py`: `LAYOUT_PROPERTIES` and `value_findings`, to see that `width`/`height` in px pass and a length in `left` would not.
- `src/browser/tokens.css`: the spacing tokens.
- `.the-way/task-cycle/change/slice.md` and `walkthrough.md`: named by the method.
- `assets/sprites/*`: the columns read by PIL.

## Adaptations of section 4 (plan and code)

These are small mismatches, each adapted and named here. The orchestrator may judge items 1 and 2 structural.

1. **The crop at 360 px.** The plan expected an even crop of 9 px a side and checked the mage alone. That crop would cut the tail of the wolf at the berry bush (own-work check above). I gave the scene's place the world area's side padding in the phone layout, so at 360 px nothing is cropped. The place still clips and centres where it is narrower than the picture, below about 354 px. The 2× threshold is counted with that place.
2. **A file outside *Change*: `tests/view/world-area.test.mjs`.** The place the plan puts in `world-area.tsx` makes the scene no longer the first child of the world area. I updated the four order lists and the case of 672 × 304 so that they read the place. The attributes 672 × 304, the frame "sized by its picture alone" and the absence of text stay asserted.
3. **A file outside *Change*: the comment in `src/browser/styles.css`.** The comment of slice 9 said "a crop of 9 px a side". I corrected it to say that the scene's place takes the padding and stands whole. Only the comment changed.

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The place takes the world area's side padding in the phone layout (`margin-inline: calc(-1 * var(--space-m))`) | an even crop of 9 px inside the padding (cuts the wolf at the bush); a crop of one side only (the plan rejected it); the wolf's place in the data changed (changes the computer layout) | the scene stands 3 px from the area's frame at 360 px, while the rows under it keep 12 px; `div.world-area` shows in `contentWiderThanItsBox` (330 > 318) though nothing scrolls. The human may prefer the indent |
| The threshold of the smaller size is `@media (width < 707px)` = 672 + 2 × 8 + 2 × 1 + 17 (the widest classic scrollbar) | 690 px, the fit with no scrollbar | between 690 and 706 px a browser with overlay scrollbars draws 336 × 152 though 672 would fit; with 690 a classic scrollbar would crop up to 8.5 px a side of the larger scene and cut the wolf at the bush (2 px to spare at 2×) |
| The scene is centred in its place at every width of the phone layout (flex `justify-content: center`) | the scene at the start where it fits and centred only where it overflows | at 720 to 1279 px the 672 px scene stands centred over left-aligned rows; before, it stood at the left |
| The plaques of a discovery take a size of their own at the smaller scene: icon 16 px (the size of the icons in the table's head), padding 0, a plaque of 20 px | the plaque kept at 36 px (plaques 22 px apart overlap by 14 px and hide part of each icon, as the "before" at 360 showed); plaques spaced in CSS pixels (a change of `scene-picture.ts` and lengths in `left`, which the token test refuses) | a 16 px icon is small; the human judges it on a screenshot |
| The badge (icon 32 px) and the flying-icon plaque (32 px) keep their sizes at 1× | smaller sizes of their own | at 1× the badge (40 × 48) is large beside a mage 25 px wide, and the flying plaque covers most of the mage's body as it lands (see concern 2) |
| The 336 × 152 is written as `width`/`height` of `.scene-background` in the stylesheet (a layout dimension of D-43), the attributes stay 672 × 304 | `round()` of CSS to the largest multiple without a threshold (no scrollbar problem) | the styleguide's rule "The scene of a map run" prescribes a threshold; `round()` would depart from it |

No invariant test changed.

## Concerns

1. **The crop at 360 px.** The place's bleed into the area's padding is my answer to a gap of the plan: the wolf at the berry bush would lose its tail under the planned crop. It changes the look of the phone layout: the scene stands 3 px from the area's frame. D-349's example of what complies says "its sides cropped slightly" at 360 px, but at 360 px the sides are now not cropped at all. D-349's own text asks for a crop only where pixels are missing, so this complies; the example no longer describes 360 px exactly.
2. **The small elements at 1×.** On the screenshot at 360:
   - The badge and the flying icon are legible, though large beside the mage.
   - The flying plaque, 32 px, lands over the mage's body and touches the badge for its 300 ms. It did so already at the fractional scale before.
   - The plaques of a discovery at 20 px are legible to my eye but small.

   Slice 20's screenshots should show a discovery at 360 for the human.
3. **The phone measurement lists `div.world-area` (content 330 > box 318).** This is the place reaching into the padding, not a text crossing a frame; nothing scrolls. A reviewer reading the list will see it.
4. **The threshold counts a classic scrollbar of 17 px**, as the existing comment of `run-screen.css` names 15 to 17 px. A wider scrollbar of some system would crop the 2× scene by a few pixels in a narrow band of widths.
5. **Not of this slice: the rows „Teraz” and „Potem”** are 18.2 px high at 360 in `controlsSmallerThan48`. They are controls (D-336) under the touch-target minimum. Some other slice of the plan may hold them; I did not change them.

## Errors outside the scope

**A tap on the bare area of a rule's row does not open the row** in the phone layout; a tap on its text does, and a mouse click on the same point does.

Evidence, at 360 × 740 with touch, rule 1.1 closed:

- `page.touchscreen.tap` at the middle of `li.rule-list-row` (the element at that point is the `li` itself): no row opened.
- `page.touchscreen.tap` on a `span.rule-reason` of the same row: the row opened.
- `page.mouse.click` at the middle point: the row opened.

The cause is not verified. A guess: the row is draggable for the handle's mouse drag (D-288), and Chromium's touch on a draggable element gives no click. The rule editor is not this slice's; the request should put it before the human or a slice of the editor.

## Working copies

- `.runs/slice-15/` in the worktree held the screenshots, the measurement and catch scripts, `cols.py`, `move.py`, the logs of the checks, `local.log` and a copy of `world-area.tsx` for the failing run. Removed before return.
- `.playwright-cli/`, the files Playwright CLI wrote for session `s15` (console logs, snapshots): removed.
- The browser session `s15` was closed. The local start was stopped by `npm run local:stop`; its database under `.runs/local-start/` stays until the next start, as the skill gives.

Nothing was kept in `reports/` besides this report.

## Unread material

- `guidelines/styleguide-browser-view.md`: read whole (lines 1–1457, in three reads).
- `guidelines/testing.md`: read except lines 208–249, the rest of the table of trust boundaries, which this slice does not touch.
- Every other file and entry the dispatch names was read whole:
  - `guidelines/coding.md`, `coding-browser-module.md`, `coding-content-data.md`;
  - `src/browser/AGENTS.md`, loop2-play `SKILL.md`, `ui_check.md`;
  - D-349, D-372, D-320, D-365, D-321, D-389, D-43;
  - `part_map.md` lines 1–70;
  - task lines 30–95 (it holds 32–34, 49–55, 81–95).

## Searches not found or unclear

- The handoff's note 2 says "a crop of up to 16 px a side keeps it whole". That holds for the mage at the right edge, but not for the wolf fighting at the berry bush, whose frame ends on column 334. Found by reading the sprites and `creaturePlace`; handled under section 4.
- How Chromium treats a touch tap on a draggable row (the error above): unclear, not searched further.
- A wolf in the scene at 1× in the browser: not reached by playing in the walk.
