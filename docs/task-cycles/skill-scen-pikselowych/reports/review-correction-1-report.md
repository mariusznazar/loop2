PASS 7095f8042c67c3397d5be0d9c531b81ad1f848f7

# Review of correction 1 — loop2: skill z gotowymi skryptami do grafiki sceny

Range `9dd26b22354a79f18bc5a30a07ee6a8adc05e699..7095f804`. `git rev-parse HEAD` is `7095f8042c67c3397d5be0d9c531b81ad1f848f7`, the head given. One commit, `7095f804`, which changes three files: `SKILL.md` in both copies (byte-identical, `diff -r` empty) and `tests/agent_workflow/test_scene_art_contrast.py`. The human's remarks, `reports/correction-1-remarks.md`, bind this review in place of a findings file.

Result: remarks 1 and 2 are made, and remark 3 needed no change and got none. The correction introduces no Critical or Important finding. Two Minor findings are listed below.

## Each remark

- **Remark 1 (the measure of flashes on a real recording): made.**
  - What the author's report shows: a real recording of the running game at 1280 × 720 CSS px with a pixel ratio of 1 gave frames of 800 × 450. That is the ratio 0.625, the same across and down, which is what Playwright's code gives (`scale = Math.min(1, 800 / Math.max(width, height))`, `coreBundle.js:23312-23319`, read in round 1).
  - The overlay of a known size: 200 × 100 CSS px is 20,000 screen pixels, so 20,000 × 0.625² = 7,812.5 frame pixels were expected. The measure counted 7,963, 1.9 % more, which the JPEG edge and the walking mage account for. That is the evidence the remark asks for: the unit after `--scale` is the screen pixel on real frames, and the ratio behaves as the skill assumes. Without `--scale` the same flash would have read as a third of the threshold.
  - I could not repeat the recording: it needs the local start and an account. I judged the evidence by its agreement with the code and with my own scaled frames of round 1, where the same arithmetic held.
  - The sharpened text is true to the code and to that evidence:
    - "a window of 1280 × 720 px gives frames of 800 × 450 px", which is Playwright's rule;
    - the ratio is the frame's width over `window.innerWidth`, for the region and for `--scale` alike;
    - "The script prints the size of the frames on its first line": `flashes.mjs` prints `frames: N of W x H px` first.
  - I ran the new `playwright-cli eval` command of the section word for word on a page of my own (see Checks). It prints `width` and the `.scene` rectangle.
  - Nothing left in the skill contradicts the real frames. The recording's frames are not in the repository; the author removed `.playwright-cli/` and `.runs/author/`.
- **Remark 2 (how to take a full-size screenshot): made.** The new paragraph of check 2 (`.claude/skills/loop2-scene-art/SKILL.md:114-130`) says how to take the screenshot, with a map run going and not paused; how to read the page's numbers; how to give the screenshot to `contrast.mjs`; and how a pixel of the scene's picture maps to the screenshot.
  - Every command exists and works as written. I ran all three word for word on a page of my own: in a playwright-cli browser, an element `.scene` 672 × 304 at left 33 and top 59.98, laid out the way the game's rectangle is.
    - `playwright-cli eval "JSON.stringify({ ratio: window.devicePixelRatio, scene: … })"` printed `ratio 1`, `left 33`, `top 59.97`.
    - `playwright-cli screenshot --filename=.playwright-cli/shot.png` wrote a PNG of 1280 × 720.
    - `contrast.mjs --ground .playwright-cli/shot.png@33,60` read the element's colour at `round(left)`, `round(top)`, and the pixel to its left was the page's white. So `round` picks the first row and column the browser draws.
  - The rule `round(left) + 2*sx`, `round(top) + 2*sy` agrees with D-349: the scene is 672 × 304 px, twice its picture of 336 × 152, so one pixel of the picture is 2 × 2 CSS px. It also agrees with where the game draws the picture. `src/browser/styles.css:2040-2052`: `.scene` has no border and no padding, and `.scene-background` is a block at its top left with `image-rendering: pixelated`. The author's own measure on the real screenshot points the same way: the lowest difference was inside the block.
  - The new test, `test_a_screenshot_of_the_page_gives_the_colour_of_a_pixel_of_the_scene_by_its_block_of_four`, writes its expected values from independent sources. 21.00:1 is WCAG's ratio of black on white. 4.62:1 comes from the WCAG formula worked out by hand; I recomputed it (`python -c`: luminance 0.1812, ratio 4.623). Its comment names the skill's rule and the arithmetic, and no source outside the repository, so D-82 holds.
- **Remark 3:** let through as the human said. The range has no change for it.

## Minor findings

- **N1.** `.claude/skills/loop2-scene-art/SKILL.md:129-130` (both copies): "Where the ratio is not 1, multiply every number by it first." The command the paragraph gives, `playwright-cli screenshot --filename=…`, has no `--hires`, and `playwright-cli screenshot --help` says that without `--hires` the screenshot is in CSS pixels; device pixels come only with `--hires`. At a pixel ratio other than 1, the default screenshot still has one pixel per CSS pixel, so multiplying the coordinates by the ratio lands on the wrong pixel, or outside the scene. The configuration of this repository sets no device scale (`.playwright/cli.config.json` holds only `ignoreHTTPSErrors`), so the ratio is 1, as the author measured, and the sentence misleads only where someone changes that. Fix: tie the multiplication to `--hires`, or drop the sentence.
- **N2.** `tests/agent_workflow/test_scene_art_contrast.py:42-61`. The test builds the PNG with the white block already at the coordinates the rule gives (43,66), then samples those same coordinates. It shows that `contrast.mjs` reads a pixel of a 1280 × 720 PNG at the place named, which `test_samples_come_from_pixels_of_pictures_and_each_role_is_named` already shows. It cannot show that the rule matches where the game draws the scene, and its name ("a screenshot of the page gives the colour of a pixel of the scene by its block of four") claims more than it checks. It does no harm; it adds little protection (`guidelines/testing.md`, "Testy bez dodatkowej ochrony").

## Declined to judge

- The rounding of the region in "Flashes" ("in whole pixels"). The author's region top of 38 comes from 59.98 × 0.625 = 37.49, which rounds to 37. One frame pixel does not change the measure, and the remark did not ask about it.

## Checks I ran

All from the worktree root.

- `git rev-parse HEAD` → `7095f804…` (exit 0). `git log 9dd26b22..7095f804`: one commit. `diff -r .claude/skills/loop2-scene-art .agents/skills/loop2-scene-art`: exit 0, no difference.
- The skill's commands on a page of my own, in a playwright-cli browser:
  - `playwright-cli open <file URL>` exited 1 ("Access to "file:" protocol is blocked"), but the browser opened.
  - `playwright-cli goto about:blank`, then `playwright-cli eval "() => { … innerHTML … }"` to lay out a `.scene` of 672 × 304 at 33, 59.98.
  - The two `playwright-cli eval "JSON.stringify(…)"` commands of `SKILL.md`, word for word: results `{"ratio":1,…"left":33,"top":59.96875,…}` and the same with `width`.
  - `playwright-cli screenshot --filename=.playwright-cli/shot.png`: a PNG of 1280 × 720, read with Pillow. Pixel (33,60) is the element's grey; (32,59) and (33,59) are the page's white.
  - `node .claude/skills/loop2-scene-art/contrast.mjs --effect "#000000" --ground .playwright-cli/shot.png@33,60 --prop .playwright-cli/shot.png@32,60`: exit 0, `#767676` 4.62:1 and `#ffffff` 21.00:1.
  - `playwright-cli close`: exit 0.
  - `playwright-cli screenshot --help` and `playwright-cli eval --help`, read for N1.
- `npm test -- tests/agent_workflow/<file>.py`, each exit 0: `test_scene_art_contrast.py` (6 tests), `test_loop2_scene_art_skill.py` (7), `test_scene_art_flashes.py` (14), `test_loop2_play_skill.py` (8), `test_tracked_file_private_paths.py` (1).
- `python -B .the-way/elements/common/foundation_check.py`: `0 errors`.
- `python -B .the-way/instruction-files/check_instructions.py .`: exit 0, "0 error, 138 warn, 7 info"; no line names `loop2-scene-art`.
- `.runs/quality-venv/Scripts/ruff.exe check tests/agent_workflow/`: exit 0.
- A search of the diff for names of notes, the task's material or disk paths: no match. That holds D-362.
- `python -c` recomputing the test's 4.62 (luminance 0.1812, ratio 4.623): exit 0.
- Not run: the full `npm test` (the orchestrator's gate), and a recording of the running game, which needs the local start (see remark 1).

## Reaches

- `src/browser/styles.css:2040-2052`, `.scene` and `.scene-background`, for where the picture stands in the element.
- `.playwright/cli.config.json`, for the device scale (N1).
- `.claude/skills/loop2-play/SKILL.md`, by search for viewport and device scale.

## Working copies

- `.runs/review-whole/` held the page I tried to open, the outputs of the checks and the outputs of the tests. It is removed after this report is written.
- `.playwright-cli/` in the worktree root held the screenshot `shot.png` and a page snapshot that playwright-cli wrote by itself. It did not exist before my checks; I removed it.
- The playwright-cli browser is closed. Nothing is kept beside this report, and `git status --short` is clean.

## Unread material

None. I read the remarks, the correction report and the diff whole, and `fix.md` in the round before. The frames of the author's real recording were removed by the author and cannot be read; remark 1 is judged on the report's figures.

## Searches not found or unclear

- `playwright-cli open` refuses a `file:` URL, so I built my test page on `about:blank` by `eval`.
- Whether the screencast of Chrome sets its colour at half resolution, as `SKILL.md:111` says, was not checked on a real frame. That line is outside this correction.
