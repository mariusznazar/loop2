# Fix report — review of the whole change (head 6019d7a), findings B1, B2 and six Minor

**Status:** done (one contested Minor part, one Minor item for the human; D-27 left to the return step as told).

## Commits (fix range runs from 6019d7a)

- `e210dc74` fix: place the icon and the fibre's dust at the mage that gathered (B1, Minor 1 for the walk-away case)
- `8531d93d` fix: face the bending mage toward its prop from the data (B2), the backpack-spending guard (Minor 3), the plaque text colour and the Roles row (Minor 4), wordings (Minor 2, 5)

## Findings

### B1 — fixed
- `src/browser/view/scene.tsx`: `sceneEffect` now gets `current.x`, the place the mage stood (or walked to) at the previous
  reading, not `next` (the place the action that starts in this reading leads it to). Comment added at the call.
- Test written first and seen failing on the 6019d7a code: `tests/view/scene.test.mjs`, case "an effect stands at the mage that
  gathered, though the next action walks elsewhere". Command `npm test -- tests/view/scene.test.mjs`, exit non-zero, message:
  "the icon lands at the sticks' mage, not at 307: expected 22.0238%, got 91.369%". Cases: hit at the sticks then „Eksploruj”
  (lands at 74, starts 17 right of it), hit at the bush then „Zbierz — Patyk” (lands at 256), hit of the fibre then „Eksploruj”
  (lands at 176, straight up), miss of the fibre then „Eksploruj” (cloud at 168), miss at the sticks then „Eksploruj” (cloud at 83).
  The helper `reading` gained `next`. After the fix: same command, exit 0 (35 pass).
- Real browser (Playwright CLI, `npm run local`, composed program „Zbierz — Patyk” then nothing fitting, pace 16×): every one of 14
  flights logged `plaque left = 22.0238 %` (the sticks' mage, 74/336), and the last one, at which the mage's next place was the
  clearing (`mage left = 42.8571 %`), also 22.0238 %. Screenshot `.playwright-cli/walk-away-flight.png` (frozen mid-flight, the mage
  just started its walk, the stick icon beside it): the ending followed by a walk.

### B2 — fixed
- Data: `ScenePropSpot = SceneSpot & { mageFaces }` in `src/browser/sim/data/scene.ts`; sticks `right`, bush `right`, moss `left`,
  with a comment giving the pixel columns (figure 20–44 of its frame; sticks 80–101, bush 252–280, moss 40–51). I checked the berry
  bush too: frame 224, figure 244–268, bush 252–280, so right.
- `scene-picture.ts`: `mage.bendFacing` (the prop's side, null without a prop or without bending); `scene.tsx`: `data-bend-facing`;
  `styles.css`: the bend sheet is mirrored again only where the figure's facing and `data-bend-facing` differ (two selectors); the
  comment corrected. The fibre has no prop and bends as the mage faces (the earlier "always right" is gone).
- Styleguide sentence corrected (sticks and bush right, moss left, fibre as it stands).
- Tests: `scene-picture.test.mjs` "the bending mage faces its prop…" and "each prop's facing is the side its middle lies on, from the
  places of the data" (derived from the places, not from the field); `scene.test.mjs` "the bending mage faces its prop whatever way
  it walked" covers sticks, moss, bush, the moss placed at a first draw (figure faces right, bend turned over) and the fibre after
  both a left and a right walk. The older sticks test renamed.
- Real browser: at the moss (a composed run with moss on the tile), `data-facing=left`, `data-bend-facing=left`, bend sheet
  `transform: none`; the picture `.playwright-cli/moss-zoom.png` (crop of `moss-bend.png`, bend frame held at its first frame) shows the mage
  bent toward the moss on its left.

### Minor 1 — fixed with B1 (the tests above draw an ending followed by a walk).
### Minor 2 — fixed: "as after a catch-up" replaced by "as after a tab left in the background" in `scene-picture.ts` and in the D-317 Verification.
### Minor 3 — partly fixed, partly contested
- Fixed inside the task: a reading in which an action that takes pieces out of the backpack also ended (`craftCampfire`, `lightCampfire`,
  `lightItem`, `feedCampfire`, `eat`) shows no effect (`USES_BACKPACK` in `scene-picture.ts`); test "no effect where an action that takes
  pieces out of the backpack ended in the same reading" (also that the end of „Eksploruj” does not hinder).
- Contested: "a single old end among many other ends is not recognised as overdue (the end's minute is not compared with the reading's
  minute)". The task and the foundation give no minute threshold for "overdue"; a reading carries 3.2 game minutes at 16×, so an end a
  minute or two before the reading's minute is an ordinary one. I did not invent a threshold; a reading with several gathering ends is
  still dropped whole. Goes to the request's list.
### Minor 4 — fixed: `.scene-flight-plaque` has `color: var(--text)`; the Roles row for `panel` names the flying icon's plaque
  (`guidelines/styleguide-browser-view.md`, still D-40 in its Decision column; D-363 settles the use).
### Minor 5 — fixed: the D-271 `violates` line wrapped.
### Minor 6 — held, no code change
The dust's main fill is `#88673f`, 3.13:1 against the ground `#bccae5`, and the lightest of the five; the cloud's dark outline and shades
(`#5a3d23`, `#352b28`) separate it from the sticks (`#9c794d`, `#88673f`, `#634219`), and in the real browser (`dust-miss.png`) the cloud
reads as distinct, lumpy earth beside the sticks. I found no clearly better reading of "stands out from the ground" (the condition is against
the ground), and a darker ramp would be a change of look for Mariusz to judge. Left for his eye at the request.

## Own-work check

- Requirement most likely not met now: the icon and the cloud stand at the mage that gathered for every ending, and the mage bends toward
  every prop. Checks: the jsdom cases above and the two real-browser runs (walk-away ending, moss). Not checked in a real browser: the
  berry bush facing, the fibre path after a walk, reduced motion, 8×.
- Mutations in head: `current.x` swapped back for `next` fails the B1 case; `mageFaces` of the moss set to `right` fails the
  prop-middle test and the moss case; the two-selector rule reduced to one fails the first-draw moss case.

## Checks (command, exit code)

- `npm test -- tests/view/scene.test.mjs` — 0 (35 pass); `…/scene-picture.test.mjs` — 0 (40); `…/icons.test.mjs` — 0 (33);
  `…/run-screen.test.mjs` — 0 (13); `…/world-area.test.mjs` — 0 (21)
- `npm run typecheck` — 0; `npx prettier --check src tests/view` — 0; `npx eslint src/browser tests/view/{scene,scene-picture,icons}.test.mjs` — 0
- `python -B .the-way/elements/common/foundation_check.py` — 0 errors
- `npm test -- tests/invariants/test_browser_view_token_values.py` / `test_content_identifiers.py` / `test_design_token_sources.py` /
  `test_cross_part_imports.py` — 0 each. `test_simulation_isolation.py`, `test_design_token_contrast.py`, `test_icon_credits.py` — 0 each.
- Not run: the full `npm test`; `test_loop2_container_sprites.py` (Docker).

## Screenshots (`.playwright-cli/`, not pushed)

- `dust-miss.png`, `flight-hit.png`: kept, unchanged (the sticks case; still what they show).
- `moss-bend.png` (whole page) and `moss-zoom.png` (scene crop): the mage bending toward the moss on its left. New.
- `walk-away-flight.png` (whole page), `walk-crop.png` (scene crop): the stick icon beside the mage that gathered, at the start of the walk
  to the clearing. New. Only the account `agent@example.test` stands behind them.

## Unread material

- The reviewer's full report `review-whole-report.md` (only the findings file was read). Foundation entries of the handoff not named by
  the fix: not re-read. `foundations/decisions.md` D-362 not edited (the facing is in the styleguide and the data, not in a binding
  sentence; I left a possible entry to the return step).

## Searches not found or unclear

- The glossary entry "catch-up" the reviewer cites: not read; I used his meaning (a clock reading with many minutes) for the wording.
- Whether D-362 should carry the facing: unclear, not in the task's To do 8; remark for the return step.
