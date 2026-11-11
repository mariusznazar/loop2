PASS 8531d93d3c5cdc5b9572bce17c534d4bdadd228d

# Review of the fix of the whole-change review's findings

Fix range `6019d7a38988371edf625e17f1126bced3d0d1c3..8531d93d3c5cdc5b9572bce17c534d4bdadd228d` (commits `e210dc74`, `8531d93d`); `git rev-parse HEAD` = `8531d93d3c5cdc5b9572bce17c534d4bdadd228d`. Eight files changed, no new file; `git diff --name-only` shows no path under `assets/` (trust boundary `assets/sprites/**`: the fix adds and changes no file there).

## Findings of the findings file

- **B1 (Important), fixed.** `src/browser/view/scene.tsx` now calls `sceneEffect(lastState, state, events, current.x)`, where `current` is the shown place of the previous reading (the render-phase placement of the new place happens afterwards, in the layout effect, so `current.x` is still where the mage gathered). The guard is `current !== null`. The new test `tests/view/scene.test.mjs`, "an effect stands at the mage that gathered, though the next action walks elsewhere", draws an ending followed by "Eksploruj" or another place (hit at the sticks lands at 74, hit at the bush at 256, fibre hit starts at 176, fibre miss dust at 168, miss at the sticks at 83); the `reading` helper gained a `next` argument. This is the case I reproduced earlier (plaque at 91.369 % with the mage at 42). The defect is gone on the new head.
- **B2 (Important), fixed.** Facing now comes from the data: `ScenePropSpot` with `mageFaces` (sticks right, bush right, moss left) in `src/browser/sim/data/scene.ts`, `mage.bendFacing` in `scene-picture.ts`, `data-bend-facing` in `scene.tsx`, and in `src/browser/styles.css` the bend sheet is mirrored again only where the figure's facing and the prop's side differ (two selectors). I re-derived the values from the earlier measurement (figure columns 20..44; moss 40..51 lies left of the figure at frame 32; sticks and bush overlap or lie right): right for sticks and bush, left for moss. I traced the four cases of the CSS: moss walked to from the right (figure mirrored, bend not turned: faces left), moss at a first draw (figure facing right, bend mirrored: faces left), sticks walked to from the right (figure mirrored, bend turned back: faces right), fibre (no `data-bend-facing`: bends as the figure faces). The styleguide sentence is corrected (`guidelines/styleguide-browser-view.md:626-630`) and now says what the data says. Tests: `scene-picture.test.mjs` derives the side from the places of the data (prop middle against `mageAt + 32`), not from `mageFaces`; `scene.test.mjs` covers sticks, moss, bush, the moss at a first draw and the fibre after both walks. The defect is gone.
- **Minor 1 (the tests miss an ending followed by another place), fixed** with B1: the new case above.
- **Minor 2 (wording "catch-up"), fixed**: replaced by "a tab left in the background" in `scene-picture.ts` and in the D-317 Verification.
- **Minor 3 (net change of the backpack; old end among many), fixed in part, contested in part.** Fixed: `USES_BACKPACK` (`craftCampfire`, `lightCampfire`, `lightItem`, `feedCampfire`, `eat`) makes a reading in which such an action also ended show no effect; I checked the list against `run.ts` (the actions that lower the backpack are the ones in `landUse`) and found no other. Tests: "no effect where an action that takes pieces out of the backpack ended in the same reading", with "Eksploruj" not hindering. Contested: no minute threshold for an "old" end. I keep the contest as the author's: neither the task nor the foundation defines how old an end must be to be overdue, so a threshold would be invented, and the reading with several gathering ends is already dropped. I withdraw that half of the finding; it goes, as the author says, to the request's list.
- **Minor 4 (panel plaque text colour; Roles row), fixed**: `color: var(--text)` on `.scene-flight-plaque`, the Roles row for `panel` names the plaque of the flying icon. (The Decision column still reads D-40; D-363 carries the use, which I accept.)
- **Minor 5 (long line in D-271), fixed**: the `violates` line is wrapped.
- **Minor 6 (dust colour), held by the author with no code change.** I keep it as I graded it: not graded, a matter of Mariusz's eye at the request. The author's argument (the cloud's dark shades `#5a3d23`, `#352b28` separate it from the sticks; the condition is against the ground, 3.13:1 and above) is consistent with my own contrast arithmetic; I do not rule on the look.

## What the fix itself may have broken (diff read whole)

Nothing new that is Critical or Important. Checked: `current.x` while a walk is in progress is the destination, which is where a gathering ends; the `current !== null` guard cannot be null on a going scene past the first draw; the two selectors of the bend mirror never both match; `bendFacingOf` returns null without a prop, without bending and for non-gathering actions; `content-identifiers` still passes (the code reads `PROPS[action.resource]?.mageFaces`, naming no resource); the foundation entries are changed only in wording (D-271 line wrap, D-317 Verification word).

New Minor notes in the fix (block nothing):
- `src/browser/sim/data/scene.ts`: the `mageFaces` comment and `tests/view/scene-picture.test.mjs` hold the magic 32 (the figure's middle) twice, in the data comment and in a test. A change of the sheet's figure would need both; polish.
- D-362 does not carry the facing, which the styleguide now states (the author left it for the return step). An issue outside the fix diff's findings; note only.

## Declined to judge

- The look of the mage's bend toward the moss and of the dust (a human's judgement at the request).
- Real-browser behaviour of the walk-away flight and of the moss: I ran no browser; the author's claims (`walk-away-flight.png`, `moss-zoom.png`, 14 flights at 22.0238 %) are the author's evidence, unverified by me. jsdom and the CSS trace above support them.

## Checks I ran (one at a time)

- `npm test -- tests/view/scene.test.mjs`: exit 0, 35 pass.
- `npm test -- tests/view/scene-picture.test.mjs`: exit 0, 40 pass.
- `npm test -- tests/view/icons.test.mjs`: exit 0, 33 pass.
- `npm test -- tests/invariants/test_browser_view_token_values.py`: exit 0, 4 OK.
- `npm test -- tests/invariants/test_content_identifiers.py`: exit 0, 4 OK.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors".
- Not run: the full `npm test`; `test_loop2_container_sprites.py` (Docker); no real browser. I did not repeat the author's mutation runs (current.x back to next; moss `mageFaces`; one selector), so the claim that the new tests fail on the old code rests on the author's report and on my own reproduction of the old behaviour in the earlier review.

## Reaches beyond the handoff

- `src/browser/sim/run.ts` (grep of `without(` and `landUse`): to check that `USES_BACKPACK` is the complete list of actions that lower the backpack.
- `src/browser/sim/data/actions.ts` (grep): the action kinds.

## Unread material

- Read whole: the findings file's findings as they stand in my earlier report, the fix report, the fix diff of all eight files, `.the-way/task-cycle/review/fix.md`.
- Not re-read: the foundation entries and guidelines of the earlier review (read then; the fix touches D-271 and D-317 wording and one styleguide section and one Roles row, which I read in the diff).
- Decisions read whole in this review: 0 beyond the diff's hunks of D-271 and D-317; by title only: 0.

## Searches not found or unclear

- None new. The Smoke & Fire pack's cell count remains unverifiable (carried from the earlier review, outside the fix).
