PASS af282831b4854d1da76bb8656260b87d6468b31f

# Review of the fix, round 1 — loop2: skill z gotowymi skryptami do grafiki sceny

Fix range `9459331b738617be566c11cfb40286d4de4cbd56..af282831`. `git rev-parse HEAD` is `af282831b4854d1da76bb8656260b87d6468b31f`, the head given. Two commits: `e9d0ec78` (scripts, `SKILL.md` in both copies, tests) and `af282831` (D-415's *Verification*). The findings file `reports/review-whole-findings.md` bounds this review. Both copies of the skill are byte-identical (`diff -r` empty).

Result: every blocking finding is fixed, all nine Minor findings within the task are fixed, and the fix introduces no new Critical or Important finding. One new Minor note, outside the fix's purpose, is listed below.

## Each finding

- **I1: fixed.**
  - `flashes.mjs` takes `--scale R`, the frame's width over `window.innerWidth`. It multiplies the field by `R` and the threshold by `R²` before setting the count beside them (`.claude/skills/loop2-scene-art/flashes.mjs:157-170`). Without `--scale` it prints the counts in frame pixels and says it makes no comparison. `SKILL.md`, section "Flashes", puts `--scale <ratio>` in the command and says why.
  - My own check: frames of 800 × 450, which is the screen of a 1280 px window scaled to fit 800 px, with a flash of 125 × 69 frame px (8,625). That is 22,000 screen px, just above WCAG's 21,824.
    - Without `--scale`: "no --scale given, so no comparison…".
    - With `--scale 0.625`: "at most 8625 of them in one field of 213 x 160 frame px …; … gives 8525 frame px (21824 screen px)". The count now stands correctly just above the scaled threshold.
    - With `--scale 1`, the old, wrong reading: 8,625 against 21,824.
  - The new tests check the field line at scales 1 and 2, with expected values worked out by hand (87,296 = 341 × 256; 106,400; 4 × 21,824), and the refusal of a scale of 0, -1, `abc` or empty.
- **I2: fixed.** `SKILL.md` check 2 (`.claude/skills/loop2-scene-art/SKILL.md:110-114`) now says what a frame is: the screen scaled down to fit 800 px, JPEG, with its colour at half resolution, so a pixel of it is an approximation. It is good for a broad area such as the snow, not for a prop drawn in thin strokes, and for such a prop it sends the reader to the sprite file or a full-size PNG screenshot. The line at the top names `contrast.mjs` beside `flashes.mjs` for JPEG, and the head comment of `jpeg.mjs` states the limit of its colour enlargement.
- **I3: fixed.** The test is now `test_the_box_of_the_visible_pixels_of_frame_0_of_the_idle_files_of_the_wolf_and_the_mage` (`tests/agent_workflow/test_scene_art_sheet_frames.py:97-99`). Its comment says only what is measured, and no source outside the foundation is named. The expected values are unchanged and agree with my own reader (round 1).
- **M1: fixed.** `grid.mjs:79` makes the output's folder. A new test writes into folders that do not exist.
- **M2: fixed.** `png.mjs:47-48` refuses a second IHDR. My crafted file with two IHDR chunks now gives `damaged PNG (more than one IHDR chunk)` with exit 1 in `flashes.mjs`, and exit 1 with no output file in `sheet-frames.mjs cut`. The refusal test runs it through every input of every script.
- **M3: fixed.** `jpeg.mjs:217` and `:251-256` require the end marker after the last block. My JPEG without its last two bytes, and without its last byte, are both refused ("truncated JPEG (its end marker is missing)", exit 1, no output file).
  - Because this check could refuse sound frames, I ran sound JPEGs made by Pillow through the scripts: quality 60 with chroma at 4:2:0, quality 60 at 4:2:2, quality 90 at 4:4:4, optimized Huffman tables, restart markers after every block and after every row, an odd size of 801 × 451, grey, and bytes after the end marker. All are read with exit 0. The new check refuses no sound file among them.
- **M4: fixed.** `SKILL.md` names D-415 in the list of rules at its top, in "The three checks" and in "Who judges, and the reviewer". It states no more than before.
- **M5: fixed.** Tests now read the busiest-field line, including a 100 × 100 block counted whole, and the line "against the first frame" (8 of 16 between neighbours, 16 of 16 against the first). The expected values are written by hand.
- **M6: fixed.** `SKILL.md` check 3 says how to turn the game's place, which is a cell's left edge and bottom edge, into the preview's: add the box `measure` prints, frame by frame. I checked the rule against my round-1 preview, made by hand from `scene.ts` and `scene-picture.ts`. The mage's bend at 42 + 22 = 64 and 136 − 64 + 36 = 108, and the dust at 83 + 0 = 83 and 134 − 16 + 1 = 119, are what it gives. A new test lays a cell by the rule and finds each pixel where the cell's own would be.
- **M7: fixed.** `grid.mjs:118-120` and `:184-189` compare the colours the keys stand for. The tests: the same keys with another colour line give 3 differing pixels, and other keys for the same colours give 0. A reference with a key outside its colours is refused.
- **M8: fixed.** `flashes.mjs` (head comment, constant and output) and `SKILL.md` now give the field and the threshold as WCAG 2.3.1's, "the source of D-317", kept by D-42, in pixels of the screen.
- **M9: fixed.** `foundations/decisions.md:11118`, `violates` in D-415's *Verification*: the clause that turned on itself is gone. The new text reads "a least contrast or such a rule written into a decision by the change that brings the effect, with nothing the human settled before it". It is coherent and keeps the meaning of settlement row 1 (the threshold of task 19 as its case), and the binding sentence of D-415 is unchanged.

## New findings in the fix diff

- None Critical or Important.
- Minor, not blocking and outside the findings: `SKILL.md:112-114` sends the reader to "a full-size PNG screenshot" for a sample at a thin prop. It does not say how to take one at full size, and `loop2-play` speaks of screenshots only for showing the human. A reader may have to work out the command. The sprite file, the other source it names, needs no screenshot, so check 2 can still be made.

## Declined to judge

- That `jpeg.mjs` accepts bytes after its end marker. They harm no reading, and the findings did not ask about it.

## Checks I ran

All from the worktree root.

- `git rev-parse HEAD` → `af282831…` (exit 0). `diff -r .claude/skills/loop2-scene-art .agents/skills/loop2-scene-art` (exit 0, no difference).
- `npm test -- tests/agent_workflow/<file>.py`, each exit 0:
  - `test_loop2_scene_art_skill.py` (7 tests), `test_scene_art_sheet_frames.py` (9), `test_scene_art_recolor.py` (7), `test_scene_art_grid.py` (9), `test_scene_art_contrast.py` (5).
  - `test_scene_art_preview.py` (7), `test_scene_art_flashes.py` (14), `test_scene_art_refusals.py` (3), `test_loop2_play_skill.py` (8), `test_tracked_file_private_paths.py` (1).
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, `0 errors`.
- `python -B .the-way/instruction-files/check_instructions.py .`: exit 0, "0 error, 143 warn, 7 info"; no line names `loop2-scene-art`.
- `.runs/quality-venv/Scripts/ruff.exe check tests/agent_workflow/`: exit 0. `npx prettier --check` on the `.mjs` files of both copies: exit 0. `git ls-files --eol`: every file of the skill and the tests is LF.
- `git diff --stat 9459331b..af282831` on `package.json`, `package-lock.json` and `requirements-quality.*`: empty, so no dependency was added.
- `python -B .runs/review-whole/crafted2.py` (exit 0):
  - crafted files: two IHDR chunks; a JPEG without its EOI; a JPEG without its last byte;
  - the nine sound JPEG variants above;
  - frames for the units with no `--scale`, `--scale 0.625` and `--scale 1`.

  The results are kept in `reports/review-fix-1-crafted.txt`.
- Not run: the full `npm test` (the orchestrator's gate). Nor a real `loop2-play` screencast, which needs the local start; the units were judged on frames I made at the size Playwright gives.

## Reaches

- `.claude/skills/loop2-play/SKILL.md`, by search for "screenshot", for the new Minor note.
- `src/browser/view/scene-picture.ts:45-46` (`ScenePlacedSprite`: "its left edge and the line it stands on"), to check the rule of M6.

## Working copies

`.runs/review-whole/` held my script `crafted2.py`, the crafted and sound files, the frames and the outputs of the checks. It is removed after this report is written. Kept beside this report: `reports/review-fix-1-crafted.txt`.

## Unread material

The findings file whole, the fix report whole, and the diff of the range whole. `.the-way/task-cycle/review/SKILL.md` was read in round 1, and `fix.md` whole now. No decision beyond D-415's changed line was opened again for this round. Otherwise none.

## Searches not found or unclear

None.
