# Correction 1 — fix report

**Status:** done. **Commit:** `7095f804` (author `mariusznn@gmail.com`), on the start head `9dd26b22`.

## Remark 1 — the measure of flashes on a real recording

The game was started with `npm run local` (build, then `Local game: https://127.0.0.1:55572`), signed in with a made-up account at `example.test`, a character „Agent” made, and the map run „Skraj lasu” entered, all with Playwright CLI 0.1.22 from the worktree root as `loop2-play` gives. Nothing touched the test server or a player's save.

**The page's numbers**, `playwright-cli eval` of `window.innerWidth`, `window.innerHeight`, `window.devicePixelRatio` and the `.scene` rectangle (exit 0): width 1280, height 720, ratio 1; scene 672 × 304 CSS px at left 33, top 59.98.

**(a) A real recording of the scene of a map run.**
- Command: `playwright-cli --raw run-code --filename .claude/skills/loop2-play/frames.js | node .claude/skills/loop2-play/save-frames.mjs > .playwright-cli/frames.log` — exit 0 and 0. It gave 22 frames over 2866 ms.
- Size of a frame (read with Pillow): **800 × 450 px**. The page is 1280 × 720 CSS px, so the frames are shrunk as `SKILL.md` and `flashes.mjs` say: 800 / 1280 = 450 / 720 = **0.625**, the same ratio across and down, no bars at the edges.
- Region by the skill's rule (rectangle × ratio, whole pixels): 21, 38, 420 × 190. I cut that region out of a frame and looked at it: it is the scene (forest, props, the mage) to within a pixel.
- Command: `node .claude/skills/loop2-scene-art/flashes.mjs --log .playwright-cli/frames.log --region 21,38,420,190 --scale 0.625` — exit 0. Result: `frames: 22 of 800 x 450 px`; moved pixels between consecutive frames at most 432 of 79,800 (0.54 %); at most 432 of them in one field of 213 × 160 frame px (341 × 256 screen px at scale 0.625), the threshold 8,525 frame px (21,824 screen px); against the first frame at most 444 (0.56 %). The moved pixels are the mage walking.

**(b) A flash of a known size on real frames.**
- A recording script of my own, a copy of `frames.js` in `.runs/author/`, started the stream, then, with the page's own `evaluate`, put an overlay of **200 × 100 CSS px** (20,000 screen px) over the scene, black, then turned it white 800 ms later, then removed it. The overlay and the script stayed in `.runs/author/`.
- Command: `playwright-cli --raw run-code --filename .runs/author/frames-flash.js | node .claude/skills/loop2-play/save-frames.mjs > .runs/author/flash.log` — exit 0 and 0; 25 frames, 800 × 450.
- Command: `node .claude/skills/loop2-scene-art/flashes.mjs --log .runs/author/flash.log --region 21,38,420,190 --scale 0.625` — exit 0. Result: moved pixels between consecutive frames at most **7,963** (frames 19 and 20, +2250 ms), all of them in one field; against the first frame at most 8,444 (the overlay plus the walking mage).
- Expected: 20,000 screen px × 0.625² = **7,812.5** frame px. Found 7,963, 1.9 % more (the edge of the overlay after JPEG, and some pixels of the walking mage). Read back to the screen: 7,963 / 0.390625 = 20,385 screen px for an overlay of 20,000. The unit of the measure is the screen pixel after `--scale`, shown on real frames: set beside the field's threshold of 21,824 screen px (8,525 frame px at this ratio), the flash of 20,000 screen px reads as just under it, and the unscaled count of 7,963 set beside 21,824 would have read as a third of it.

**Verdict:** the recording behaves as `SKILL.md` assumes (the ratio of the frame's width to `window.innerWidth`, the same for the region and the scale), so no code of `flashes.mjs` or its tests changed. `SKILL.md` was sharpened in two places by the real frames (the Flashes section): a window of 1280 × 720 px gives frames of 800 × 450 px; the region is the rectangle times the ratio **in whole pixels** (`--region` takes whole numbers, and the rectangle has fractions, 59.98); the script's first line prints the size of the frames; the page's numbers come from one `playwright-cli eval` command, which the section now gives.

## Remark 2 — the full-size screenshot

`SKILL.md`, check 2 (both copies, byte-identical, `diff -r` clean), has the paragraph: how to take it (`playwright-cli screenshot --filename=.playwright-cli/shot.png`, with a map run going and not paused, the pause greys the scene), how to read the page's numbers beside it (`window.devicePixelRatio` and the `.scene` rectangle), how to feed it to `contrast.mjs` with `--ground` and `--prop`, and how a pixel of the scene's picture becomes a pixel of the screenshot: at the ratio 1 the screenshot of a 1280 × 720 window is 1280 × 720 px (confirmed, `playwright-cli screenshot` gave 1280 × 720), the scene is 672 × 304 px, twice its picture (D-349), so the pixel `sx,sy` is the block of 2 × 2 screenshot pixels whose top left lies `round(left) + 2*sx` across and `round(top) + 2*sy` down, any of its four pixels being the sample; where the ratio is not 1 every number is multiplied by it.
- Checked on the real screenshot: I sampled the scene's picture (`forest-scene.png`) against the screenshot at the block's pixels and at pixels shifted by one and two; the mean difference of brightness (tint and sprites included) is lowest, 17.2, for the pixels inside the block and 24 to 27 for the pixels outside it. `contrast.mjs` read the screenshot (`--ground .playwright-cli/shot.png@43,66`, exit 0).
- Test: `test_a_screenshot_of_the_page_gives_the_colour_of_a_pixel_of_the_scene_by_its_block_of_four` (`test_scene_art_contrast.py`) builds a 1280 × 720 PNG, with a block of 2 × 2 white pixels at the place the rule gives for the scene's pixel 5,3 (scene at 33, 60) in grey, and shows that `contrast.mjs` reads the block's pixels as white (21.00:1 for black) and the pixel next to it as the grey (4.62:1, the figure worked out by hand from the WCAG formula: 0.1812 + 0.05 over 0.05). The commands the paragraph names are covered by the existing test of the skill's text (every option a `node …/contrast.mjs` command of the text uses is one the script takes); the `playwright-cli` lines are not ours and are not run by a test.

## Remark 3

Let through; no change.

## Own-work check (after the change)

- `npm test -- tests/agent_workflow/<file>.py` for `test_loop2_scene_art_skill`, `test_scene_art_contrast`, `test_scene_art_flashes`, `test_loop2_play_skill`: each exit 0, OK (7, 6, 14, 8 tests).
- `ruff check tests`: 0. `prettier --check` on the skill's scripts: 0 (not changed). `python -B .the-way/elements/common/foundation_check.py`: 0 errors. `python -B .the-way/instruction-files/check_instructions.py .`: 0 errors, 138 warnings, none naming the skill.
- A first version of the new test had a wrong expected value for the grey (4.63 worked out roughly by hand where the formula gives 4.623, so 4.62); I computed it again with the formula and corrected the expectation, not the script.
- The full `npm test` was not run.

## Anything held wrong

none.

## Unread material

none.

## Searches not found or unclear

none.

## Working copies

- The game was stopped with `npm run local:stop` (`Local starts stopped: 1`) and the Playwright session closed (`playwright-cli close`).
- `.runs/author/` (the overlay script, the logs, the crops and my small scripts) and `.playwright-cli/` (the frames, the screenshot, the console logs) in the worktree: removed. The Playwright CLI saved everything under the worktree's `.playwright-cli/`; nothing was written to the main checkout, and no Playwright MCP tool was used. The game's own database under `.runs/local-start/` stays by design until the next start.
