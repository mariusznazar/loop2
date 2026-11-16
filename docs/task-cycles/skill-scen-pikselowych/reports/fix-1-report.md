# Fix report, round 1 — loop2: skill z gotowymi skryptami do grafiki sceny

**Status:** done

**Commits** (fix range from `9459331b`, author `mariusznn@gmail.com`):
- `e9d0ec78` fix: scripts, `SKILL.md` (both copies, byte-identical, checked with `diff -r`), tests.
- `af282831` docs: the *Verification* of D-415 (M9).

All findings of the file are fixed; none is contested. O1 was not touched.

## Findings

**I1 (flash units).** Chose the first way: scale the field and the threshold.
- `flashes.mjs`: a new option `--scale R`, how many frame pixels one screen pixel is (the frame's width over `window.innerWidth`). The field of 341 × 256 and the threshold 21,824 are multiplied by `R` and `R²` before the count is set beside them (`busiestField` now takes the field). The line prints both: `at most N of them in one field of … frame px (341 x 256 screen px at scale R); WCAG 2.3.1, the source of D-317, gives T frame px (21824 screen px) as the general flash threshold`. Without `--scale` it prints the counts in frame pixels and a line saying no comparison is made; `--scale` that is no positive number is refused with `error:` and exit 1. The head comment says the counts are in frame pixels.
- `SKILL.md`, "Flashes": says a frame is the screen scaled down, gives `--scale <ratio>` in the command and says the script scales the field and the threshold by it.
- Tests (`test_scene_art_flashes.py`): the field line read at scale 1 and at scale 2 on 400 × 300 frames with a 380 × 280 block (106,400 moved; the expected 87,296 = 341 × 256, 21,824 and 4 × 21,824 = 87,296 worked out by hand); a 100 × 100 block counted whole wherever it lies (10,000); no scale gives no comparison; a scale of 0, -1, `abc` and empty is refused.
- Rejected way: stop printing the comparison and only say the counts are in frame pixels. Cost: the human would have to scale 21,824 by hand for every request, which is the error the finding names.
- Mutations killed: field not scaled, threshold scaled by `R` instead of `R²`, a sign in the summed-area window.

**I2 (sample from a frame).**
- `SKILL.md`, check 2: a frame is the screen scaled down to fit 800 px, lossy (JPEG) and with its colour at half resolution, so its pixel is an approximation, good for a broad area such as the snow and not for a prop in thin strokes; for such a prop the sample comes from its sprite file or from a full-size PNG screenshot. The line about the files the scripts read (top of `SKILL.md`) now names `contrast.mjs` beside `flashes.mjs` for JPEG.
- `jpeg.mjs` head comment: the colour planes are enlarged by repeating samples where other readers smooth them, so colour at a sharp edge can differ by tens of levels, brightness of flat areas agrees to a level or two.
- The 800 px figure I confirmed in the Playwright source the reviewer cites (`_startScreencast`, `scale = Math.min(1, 800 / Math.max(viewport.width, viewport.height))`). No test (prose).

**I3 (test name).** `test_scene_art_sheet_frames.py`: renamed to `test_the_box_of_the_visible_pixels_of_frame_0_of_the_idle_files_of_the_wolf_and_the_mage`; the comment says only what is measured (frame 0 of each file, 64 px wide frames: wolf 63 × 31, mage 25 × 32). The expected values are unchanged.

**M1.** `grid.mjs to-grid` makes the output's folder (`mkdirSync` recursive). Test: a grid written under a folder that does not exist (`test_a_grid_is_written_in_a_folder_that_is_not_there_yet`); the mutation that removes the call is killed.

**M2.** `png.mjs`: more than one IHDR chunk is refused (`damaged PNG (more than one IHDR chunk)`). Test: a new kind in `test_scene_art_refusals.py`, run through every input of every script (exit 1, `error:`, the file's name, no output file). Mutation killed.

**M3.** `jpeg.mjs`: after the last block the end marker must stand whole (`reader.end()`), else `truncated JPEG (its end marker is missing)`. Test: `FLAT_JPEG[:-2]` in the damaged-JPEG case of `test_scene_art_flashes.py`. Mutation (`if (false)`) killed.

**M4.** `SKILL.md` names D-415 in the list of rules at its top, in "The three checks" and in "Who judges, and the reviewer"; the wording stays short and states no more than it did.

**M5.** Tests read the busiest-field line (above) and the line "against the first frame": white, then white with its left half black, then black on 4 × 4 frames: consecutive at most 8 of 16 at frames 0 and 1, against the first at most 16 of 16 at frame 2.

**M6.** `SKILL.md`, check 3: the game places a frame by its whole cell (`ScenePicture` and `SceneSpot` in `src/browser/sim/data/scene.ts`: left edge and bottom edge); the preview's x is the cell's left edge plus L, its y the cell's top (bottom edge less frame height) plus T, with `x L-R, y T-B` from `sheet-frames.mjs measure`; take it for each frame. Test (`test_scene_art_preview.py`): a 5 × 5 cell with a 2 × 2 figure; the test reads L and T from `measure`'s output, lays the picture at the cell's place plus those, and shows every red pixel lands where the cell's own pixels would (the expected set is the cell's pixels shifted by the cell's place, written in the test, not read from the script's picture).

**M7.** `grid.mjs --reference` compares what the pixels show (the colour a key stands for, `.` for none), and refuses a reference with a key outside its colours. Tests: the same keys with another colour line gives 3 differing pixels; other keys for the same colours gives 0. Mutation (compare keys again) killed.

**M8.** `flashes.mjs` output and head comment and `SKILL.md`: the field and the threshold are WCAG 2.3.1's, the source of D-317, kept by D-42, in screen pixels (the field-line test reads the wording).

**M9.** `foundations/decisions.md`, D-415 *Verification*, `violates`: the self-referring clause is replaced by "a test of the scene or a rule of style that sets a least contrast of an effect against a prop, or a rule that no element covers an effect; a check that fails a change for the ratio of an effect against a prop; a least contrast or such a rule written into a decision by the change that brings the effect, with nothing the human settled before it". The meaning of row 1 is as before. `python -B .the-way/elements/common/foundation_check.py`: 0 errors.

## Own-work check

- `npm test -- tests/agent_workflow/<file>.py` for `test_loop2_scene_art_skill`, `test_scene_art_sheet_frames`, `…_recolor`, `…_grid`, `…_contrast`, `…_preview`, `…_flashes`, `…_refusals`, `test_loop2_play_skill`, `test_tracked_file_private_paths`: each exit 0, OK (7, 9, 7, 9, 5, 7, 14, 3, 8, 1 tests).
- `ruff check tests`: 0. `prettier --check` on the skill's `.mjs`: 0. `foundation_check.py`: 0 errors. `check_instructions.py`: 0 errors, 143 warnings, none naming the skill. The full `npm test` was not run.
- A first run of the new tests failed on two lines of the tests I had just written (an escape that became a real line break while I wrote the edit script, and a literal NUL byte that Ruff reported); fixed in the test files before the commit, no weakening of any assertion.
- Weakest point of the fix: the I1 fix depends on the reader giving the right `--scale`; a wrong ratio gives a wrong comparison with no sign. The skill says how to take it (frame width over `window.innerWidth`, the same ratio it already asks for the region) and the script refuses no scale rather than guess one.

## Unread material

none (the cited places of the findings and of `src/browser/sim/data/scene.ts` and `scene-picture.ts` were read; `coreBundle.js` read at the lines the reviewer cites; `review-whole-report.md` not read: the findings file held what each fix needed).

## Searches not found or unclear

none.

## Working copies

`.runs/author/` held a mutation runner: removed. Nothing else was made.
