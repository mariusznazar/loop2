# Fix 1 report — findings of review 1 (the one author)

**Status:** `done`. Commits (from the reviewed head `83c8369a`): `78957216` (code and tests), `a3125aaa` (foundation and styleguide). Worktree clean.

## Each finding

- **I1 (plaque over the tint): fixed, way (b) as ruled.** `src/browser/view/scene.tsx`: the flight effect now renders after the mage and before `.scene-tint`; DOM order is background, props, fire, dust, mage, flying icon, tint, frost, badge carrier. Comments in `scene.tsx` and `styles.css` follow. The test "the layers: ..." (`tests/view/scene.test.mjs`) now asserts the effect lies under the tint and over the mage, and its comment names the defect the other way round. Seen failing when I moved the flight back after the tint (exit 1, that test), restored. D-315 keeps its two exceptions; it now names "the flying icon on its plaque" among what lies under the layer (statement, *Verification*, *Rationale* with the accepted cost). Styleguide paragraph rewritten (order of layers, the plaque takes the hue). No third exception added.
  - **Measurement (D-365, Chromium, reduced motion, animation paused at the landing, plaque 32 x 32 px; icon = brightest pixel, plaque = its background):** without tint plaque `#18181b`, icon `#f4f4f5`, 16.12:1; cool tint (streak 0) `#111e11` / `#eef8ed`, 15.84:1; t = 0.4 `#181a0f` / `#f4f9da`, 16.26:1; t = 0.8 `#1c180e` / `#f9f4e6`, 16.11:1; full gold (`--tint` forced to 1, since a completion creates no effect) `#1e170e` / `#f9f3e9`, 16.07:1. D-365 asks for the icon on a solid dark `panel` plaque with no numeric threshold; the roles' own threshold is 4.5:1 and every measured pair keeps 15.8:1 or more. The plaque stays dark and the icon light. No `questions`.
- **I2 (D-271, palettes): fixed.** Statement and *Rationale* now say the packs' palettes bind the frost and the specks, and the colours of the tint layer have their source in the human's choice. *Verification* keeps "colours the pictures of the pack's trees hold" for the frost.
- **M1 (*Origin*): fixed per the ruling, template `.the-way/elements/decisions/template.md`, section "Origin" (lines 218 to 226: a task document is never named in *Origin*; the reasoning goes to *Rationale* and *Rejected*, *Origin* then reads `none`).** D-372 and D-373: `none`. D-132, D-271, D-315, D-316: *Origin* restored byte for byte from the base `7846213c` (my added item removed). No `TODO` stood in any of them. `grep -c swit_rosnacy foundations/decisions.md` gives 0.
- **M2 (outline only): fixed.** D-271 statement, *Rationale* ("the frost chosen meets it by its outline") and *Verification* now say "outline or fill".
- **M3 (uniform band): fixed.** D-372 statement and *Verification* say "at its deepest" / "deepest teeth reach"; the styleguide says the full thickness stands only on the deepest teeth.
- **M4 (thin frost): shown, look unchanged.** D-372 and the styleguide say that at the first one or two pixels the frost is the outline alone. Screenshots from the real game (`npm run local`): 1 pixel (`--frost` 1, about 36.9 °C) and 2 pixels (`--frost` 2, about 36.8 °C), pushed to `mariusznazar/screenshots`, directory `loop2/swit-rosnacy-z-passa`, branch `loop2/swit-rosnacy-z-passa`, **new commit `1ef193d6c4520a43c6ec7baec3809bdbf5320957`** (the earlier seven files are in it too):
  - `![The scene with a frost of one pixel](https://github.com/mariusznazar/screenshots/blob/1ef193d6c4520a43c6ec7baec3809bdbf5320957/loop2/swit-rosnacy-z-passa/08-scene-frost-1-pixel.png?raw=true)`
  - `![The scene with a frost of two pixels](https://github.com/mariusznazar/screenshots/blob/1ef193d6c4520a43c6ec7baec3809bdbf5320957/loop2/swit-rosnacy-z-passa/09-scene-frost-2-pixels.png?raw=true)`
  The links to the first seven files at `f61c319d...` still work.
- **M5 (contrast test): fixed.** The comment names each source: `#bccae5`, `#bacfd0`, `#ddc69e` are in the task document; `#c2cebe` and `#d4caa5` are in table (a) of the preview the task cites, and my own measurement of today's rendering gave `#c2cebe` and `#d4caa6`. It says what the test guards (the outline token against snow measured once; a change to the tint tokens passes unseen). The overclaim sentence is gone; the styleguide says the same.
- **M6 (rounding): fixed, and my earlier statement corrected.** The reviewer was right: `Math.ceil` was caught by the test at 35.2 °C (14.4 gives 14, ceil 15), and my report said no test catches it. That test now uses 35.5 °C, thickness 12, an anchor the task's linear rule fixes (14.4 was not). After this change `Math.ceil` is caught by no test; the rounding between anchors stays unpinned by design.
- **M7 (values in the styleguide): fixed.** The scene paragraphs no longer write 0,80, 2 s, the 3/5 and 2/7 periods, 20 minutes or 0/8/16; they point to D-316, D-372, D-373 and the frost rules in `src/browser/styles.css`. The 3:1 stays (it is a rule of D-271).

## Checks (command, exit code)

`npm run typecheck` 0; `python -B .the-way/elements/common/foundation_check.py` 0 (0 errors); `npm test -- tests/view/scene.test.mjs` 0; `scene-picture.test.mjs` 0; `scene-frost-contrast.test.mjs` 0; `run-screen.test.mjs` 0; `tests/invariants/test_browser_view_token_values.py` 0; `test_design_token_sources.py` 0; `test_design_token_contrast.py` 0; `tests/quality/test_quality_invariants.py` 0 (eslint, prettier). Prettier on the changed files clean. The full `npm test` was not run.

## Own-work check

Requirement most likely unmet: "nothing the scene draws but the badge and the frost lies over the tint, and the plaque stays legible". Checked in a real browser by the contrast numbers above and by the layers test (broken once, failing, restored).

## Reaches beyond the handoff

`foundations/decisions.md` D-365 whole (the handoff names it); the base `7846213c` copy of the four *Origin* blocks (`git show`); `.the-way/task-cycle/change/fix.md` (the variant file). The harness page under `.runs/harness` (ignored) was extended to render a flying icon.

## Unread material

Findings file and handoff read whole. The review report itself (`review-1-report.md`) not read; I used the findings file as the handoff says.

## Searches not found or unclear

None. One note: a completion creates no flight effect (effects start only while the scene goes on), so the full-gold plaque contrast was measured with `--tint` forced to 1; an effect already running when a completion arrives would stand under that gold.
