# Author report — loop2: skill z gotowymi skryptami do grafiki sceny

**Status:** done with concerns (two concerns, below: the kind of row 1, and the JPEG upsampling).

## Commits (branch `task/skill-scen-pikselowych`, base `e125db89`)

- `021f2aa7` feat: add the skill `loop2-scene-art` — both copies, six scripts, shared modules, `AGENTS.md` pointer, tests.
- `9459331b` docs: add D-415 (row 1 of *Settlements to record*).

Author address of both: `mariusznn@gmail.com` (checked with `git log --format='%h %ae'`).

## Files changed (35 files, 4370 lines added, none removed)

- `.claude/skills/loop2-scene-art/` and the byte-identical `.agents/skills/loop2-scene-art/`, 12 files each:
  - `SKILL.md` (151 lines), the order of steps, the three checks, the flash measure, who judges, the reviewer.
  - Six scripts: `sheet-frames.mjs` (cut, compare, measure), `recolor.mjs`, `grid.mjs` (to-grid, to-png), `contrast.mjs`, `preview.mjs`, `flashes.mjs`.
  - Shared modules, not scripts: `cli.mjs` (refusal and exit code 1, option table), `png.mjs` (PNG read and write on `node:zlib`), `jpeg.mjs` (baseline JPEG reader, for the frames of `loop2-play`), `image.mjs` (read by signature, crop, box, colours), `colour.mjs` (WCAG 2.2 contrast).
- `AGENTS.md` +2 lines: the pointer, as for `loop2-play`.
- `foundations/decisions.md` +15 lines: D-415, in the section "Scene".
- `tests/agent_workflow/`: `scene_art_support.py` (PNG written and read with the standard library, a way to run a script), `test_loop2_scene_art_skill.py`, `test_scene_art_{sheet_frames,recolor,grid,contrast,preview,flashes,refusals}.py` (54 tests).

## Choices (with the way rejected and its cost if wrong)

- **Node, no dependency** (the orchestrator's answer). `package.json` and `requirements-quality.*` are untouched. Node had no JPEG reader, and the frames of `loop2-play` are JPEG, so `jpeg.mjs` is a baseline decoder written here (about 350 lines). Rejected: asking for a dependency or making the frames PNG (the screencast gives JPEG only). Cost if wrong: the decoder is code to keep; it refuses progressive and arithmetic JPEG with a message.
- **Layout.** Six scripts at the top of the skill directory beside `SKILL.md`, five modules they import, as `loop2-play` keeps its scripts. Rejected: a subdirectory for modules (the skill test pins a flat listing, as `test_loop2_play_skill.py` does). The new directory needed no change of `eslint.config.mjs` or of the quality tests: ESLint and Prettier scope are the parts `browser-view`, `simulation`, `account-server`, `build-tools`, `deployment`, and `.claude/**` belongs to `agent-workflow`. I ran Prettier on the files anyway (`--check` passes on both copies).
- **Command line of each script** (the head comment of each file gives it, and a test pins that each option the text of `SKILL.md` uses is one its script takes):
  - `sheet-frames.mjs cut SHEET --at X,Y --frame WxH --count N --out FILE`; `compare SHEET (same options) FILE`; `measure FILE[#W]... [--frame W]`.
  - `recolor.mjs IN OUT --map #from=#to ... [--palette PIC ...] [--region X,Y,W,H]`.
  - `grid.mjs to-grid PIC OUT.txt [--at --size] [--trim]`; `to-png GRID OUT.png [--reference GRID]`.
  - `contrast.mjs --effect COLOUR... [--ground SAMPLE...] [--prop SAMPLE...]`, a sample being `#rrggbb` or `picture@x,y`.
  - `preview.mjs --out FILE [--put pic@x,y[#index/width]...] [--scene PIC] [--crop X,Y,W,H] [--scale N]`.
  - `flashes.mjs --log FILE | FRAME... [--region X,Y,W,H]`.
- **The scale measure sits in `sheet-frames.mjs measure`** (not a seventh script): the figure is the box of the visible pixels of a frame, and the output sets the first frame of each later file against the first file's. Rejected: putting it in `contrast.mjs` (a different thing). Cost if wrong: the task's list of six names no script for scale, so a reader may look for one.
- **`flashes.mjs` takes the log `save-frames.mjs` prints** (`path +N ms`), because the frames' times exist nowhere else and I did not change `loop2-play` (its test pins the frames folder's listing). It reports counts of pixels whose relative luminance moved by 0.10 or more (darker one under 0.80), the largest per consecutive pair, the most inside one field of 341 × 256 px against the 21,824 px D-317 names, and against the first frame. It sets no threshold and does not call a move a flash. Rejected: counting WCAG flash pairs per pixel per second (more code, and the rule D-317 states is "no flash of the whole area").
- **`recolor.mjs` writes only colours a named palette picture holds** (the input itself where none is named). This is how "no new colour" is held; the task gives no more.
- **`contrast.mjs` exits 0 whatever the ratio** (the task's *To do* 6), shown by a test. A sample may be a pixel of a JPEG frame, so the colour under the tint can be measured.
- **No move of a function out before the change** (WAY-365): `guidelines/coding.md` holds no rule of size, and all files are new.
- **D-415** is written, not the skill alone (see concern 1).

## Own-work check (the cycle's checks of section 3)

All run from the worktree root. Exit codes are 0 unless marked.

- `npm test -- tests/agent_workflow/test_loop2_scene_art_skill.py`, `…/test_scene_art_sheet_frames.py`, `…/test_scene_art_recolor.py`, `…/test_scene_art_grid.py`, `…/test_scene_art_contrast.py`, `…/test_scene_art_preview.py`, `…/test_scene_art_flashes.py`, `…/test_scene_art_refusals.py`: each 0, OK (7, 9, 7, 8, 5, 6, 9, 3 tests).
- `npm test -- tests/agent_workflow/test_loop2_play_skill.py`: 0 (the pattern's test still passes). `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py`: 0.
- `ruff check tests` (quality venv, ruff 0.17.1): 0. `prettier --check` on both copies: 0.
- `python -B .the-way/elements/common/foundation_check.py` (after D-415): `0 errors`, with and without `--skip-test-citations`.
- `python -B .the-way/instruction-files/check_instructions.py .`: 0 errors, 145 warnings, none new except one I fixed (`save-frames.mjs` named without its path in the skill; the rest are old). No warning names the new skill now.
- Not run: the full `npm test` (the orchestrator's), the build, ESLint (the new files lie outside its scope), a test of a failing run first for the tests of scripts (see below).
- **Tests written after the code, not first.** The change is a tool with prose; I wrote the scripts and tests together, and showed each test could fail by mutation: 14 mutants of the scripts, 13 killed (a skipped CRC check, a skipped data-length check, a skipped palette check, a recoloured transparent pixel, the "darker under 0.80" clause, the 0.10 move, a wrong luminance weight, a wrong chroma coefficient, a wrong flat-block scale of the JPEG reader, an offset of the cut by one pixel, transparent pixels compared by colour, a trim removed from the preview). One survived, `total = 1` in the alpha blend of `preview.mjs`: it is equivalent while the scene's picture is opaque, which every scene file is. One mutant (partial alpha in `grid.mjs`) was not applied because its text did not match; the grid test for a partly transparent pixel passes in the suite.
- No invariant's test was written (none is derived from D-415, and D-273 keeps `sprite-file-content` by review).

### Acceptance criteria

- **Criterion 1** (the sentence "Skrypty skilla dają na plikach `assets/sprites/` wymiary…"): measured on the files by `sheet-frames.mjs measure` and pinned by `test_the_figures_of_the_wolf_and_the_mage_in_the_game_are_the_ones_the_review_measured`: `wolf-idle.png` frame 0 is 63 px wide and 31 px high, `mage-idle.png` frame 0 is 25 px wide and 32 px high (frames 1-3 of the mage are 30, 30 and 31 high; the measure of the review was frame 0). The values agree with the criterion; no file differs. The test's expected values are literals, from the criterion; I also read the files with Pillow separately (63×31, 25×32 box).
- **Criterion 2** (the agent goes through the steps with the repository alone): `SKILL.md` names no file outside the repository and no note; a sheet of a pack is "in the pack's own download". The tracked-private-paths test passes.

### The sentences of the task each script and test answers

- *To do* 1: the skill in `.claude/skills/` and `.agents/skills/`, `AGENTS.md` pointer; tests `…skill.py` (both copies, byte-identical, description, the pointer).
- *To do* 2 (the order of steps), 3 (the new pack, read from D-271, `sprite-credits`, `environment_facts.md` and the part map): `SKILL.md` steps 1-5; no new pack's entries were written.
- *To do* 4.1 `sheet-frames.mjs cut/compare` (tests: a cut equals the sheet's pixels with IHDR/IDAT/IEND only; compare names the frame and pixel; transparent pixels equal; wrong size; past the sheet); 4.2 `recolor.mjs` (tests: alpha kept, no chaining, new colour refused, absent colour refused, region); 4.3 `grid.mjs` (tests: to-grid text, round trip, trim, refusals, warnings, reference); 4.4 `contrast.mjs` (21:1 black on white and `#767676` on white 4.54:1, samples from pictures, ground and prop named apart, exit 0 on a low ratio); 4.5 `preview.mjs` (laid pixels, strips, alpha, clipping, scaling, the default forest); 4.6 `flashes.mjs` (black to white 100 %, half 50 %, a move under 0.10 and a move between light frames not counted, region, log with times, one frame and two sizes refused, JPEG frame against PNG frame, the JPEG reader on a flat and a detailed picture against Pillow's reading, progressive/truncated/damaged JPEG refused).
- *To do* 5 (three checks, each with its script), 6 (numbers and image, the human judges, no threshold), 7 (the reviewer's independence): `SKILL.md`, "The three checks", "Who judges, and the reviewer". The test pins that each of the six scripts has a command in the text and every option of those commands exists.
- The orchestrator's addition (a malformed, truncated or wrong-sized PNG is refused with a message and exit code 1, no output file): `test_scene_art_refusals.py` runs 11 commands (every input of every script) against 11 kinds of unsound PNG: not a PNG, empty, cut short, cut in the header, a wrong checksum, bytes after the end, pixel data of another size than the header, no width, interlaced, 16-bit, not a zlib stream, an inflated stream longer than the header asks. Each asserts exit code 1, `error: ` first, the file's name, the reason, no stack trace and no output file. Plus a missing file and a palette PNG read.

### Weakest-point check

The weakest point is the JPEG reader: it is the only part of the change not backed by a source the repository already uses, and the frames that matter are made by Chrome, not by the Pillow files in the test.

- Requirement it most likely misses: *To do* 4.6, "z klatek, które daje `loop2-play`", and the reading of those frames.
- Check: I took a real JPEG screenshot with Chrome (Playwright MCP, quality 90, 1707 × 769 px; text, a gradient, solid blocks) and compared my reader with Pillow's over every pixel. Chrome writes it 4:2:0 baseline. Result: mean difference 0.158 levels per channel, worst 57 at the sharp coloured edges of text. The cause is a guess marked as such: Pillow smooths the half-size colour planes when it enlarges them and my reader repeats each colour sample, so the large differences are at colour edges, and the brightness of flat areas agrees to a level or two (on the test pictures: 0 and 2 over every pixel). For the measure of flashes this matters little: both frames of a pair are read the same way, so a still scene gives the same values in both, and the counted move is a change of 0.10 of luminance. I did not make the reader smooth the colour planes. Cost if wrong: a noisy count of moved pixels at the edges of coloured text in a frame.
- The screenshot is no part of the change and was not committed; the tool saved it under the main checkout's `.runs/author/` (the tool resolves its path against its own workspace root), so I moved it into my directory and removed the original, and the empty `.playwright-mcp/` the tool made there.

## Concerns and questions

1. **Row 1 is written as a decision, and `Where it goes` question 1 could send it to the skill.** The row says who judges (the human, at the request) and that no threshold decides; the skill carries the agent's procedure (numbers and an image, no threshold of its own). I judged the first part a rule of the product's acceptance that someone who does not know it would break (the cycle that wrote a 3:1 threshold for specks did), and not only an instruction of an agent, as D-254 and D-357 to D-359 were. If the orchestrator or the human reads it as an instruction, D-415 is the one thing to drop; the skill stands without it (it holds the same statement in its own words). Not changed: D-271, any test, the styleguide (its rule "The scene of a map run" lists decisions, and I did not add D-415 to that list, which goes through `the-way-maintain-styleguide`).
2. **JPEG upsampling**, above.
3. **The scale measure is not one of the six scripts' headings** (a mode of `sheet-frames.mjs`); the skill names it in check 1.

No questions need an answer before review.

## Entries written (row 1 only; no projected entry, no entry of the cycle's own)

- **D-415** — mark `row 1`. English: The human judges, at the request that brings an effect of the scene, whether its colour stands out from the prop it stands at and whether another element covers it, from numbers and a picture, and no threshold decides; a threshold binds only where a decision gives it, as D-271 gives the frost 3:1 against the snow. Polish: To, czy kolor efektu odcina się od rekwizytu, przy którym efekt staje, i czy inny element sceny go nie zasłania, ocenia człowiek przy prośbie o scalenie z liczb i obrazu, a żaden próg tego nie rozstrzyga; próg obowiązuje tylko tam, gdzie daje go decyzja, jak D-271 daje szronowi 3:1 wobec śniegu.
  - Its *Rejected* is the way kept by the row's source (a new rule in D-271), with the cost beside it. *Based on* `none`, *Relations* `derives from D-271`, *Scope* `browser-view`, *Origin* `none`.
  - The search of the foundation found no other entry on this question; D-271 answers the ground only, and D-316, D-317 and D-366 do not touch it.

## Reaches beyond the handoff

- `foundations/part_map.md` (the `agent-workflow` files and the "External context" table), read in part, to know that `.claude/**`, `.agents/**`, `AGENTS.md` and `tests/agent_workflow/**` already belong to `agent-workflow`, and for step 5 of the skill.
- `src/browser/view/credits.ts` (the credits, `PACK_CREDITS`), `src/browser/sim/data/scene.ts` (the files and places of the props) and `src/browser/view/scene.tsx` (the element `.scene`), read in part, to name them correctly in the skill.
- `.the-way/instruction-files/` (`SKILL.md`, `kind_skill.md`, `writing.md`) whole, and `.the-way/elements/decisions/` (`SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `examples.md`), `elements/common/way_of_working.md` and `rules.md` whole, for the skill and the entry.
- The task's material folder: `przeglad_zadan_17_20.md` whole and the scripts `grid.py`, `verify_sprites.py`, `measure.py`, `analyze.py`, `flicker.py`, `make_sprites.py`, `make_small_fire.py`, `compose.py`, `palette_fit.py`, `dark_smoke.py`, `contact.py` of the material; the other files (frames, `cap*.js`, the harnesses, `compose-moments.mjs`, the research report) not read. Nothing of it is named, copied or depended on by anything committed.
- `.claude/skills/loop2-deploy/SKILL.md` (head) and its test (head), to see the second skill's pattern.
- The decisions' `D-73`, `D-77`, `D-81`, `D-83`, `D-85` were read through `guidelines/testing.md` and not as entries; the invariant `sprite-file-content` and `sprite-credits` whole; the glossary was searched for the terms of D-415 (none needed an entry).

## Unread material

- Decisions D-73, D-77, D-81, D-83 and D-85: read through `guidelines/testing.md`, not as entries. D-255, D-256 and D-258: read from the heading to the start of the *Rationale* (D-255's *Rationale* in part). D-87, D-362, D-414, D-272, D-273, D-317, D-349, D-316, D-366 and D-271 were read whole.
- The glossary file as a whole: only its headings and a search by the terms (request, effect, prop, scene, ground) were read.
- `guidelines/styleguide-browser-view.md`: the section "The scene of a map run" and "Contrast of every pair" (part); not the rest.
- `tests/view/scene-picture.test.mjs`: the PNG reader near line 804 and the nearby test; not the rest.
- `foundations/environment_facts.md`: the entries `pixel-crawler-terms`, `smoke-fire-particle-licence`, `lpc-wolf-licence`, `cc-by-3-adaptation-credit`, `cc-by-3-licence-copy` only.

## Searches not found or unclear

- The task's reference lines (`foundations/decisions.md:6176`, `:7793`, `guidelines/styleguide-browser-view.md:614`, `part_map.md:121`) point to other lines in this worktree (D-271 stands at line 4630, D-317 at 10734): the log grew; I searched by identifier.
- No script for the contrast of a colour against samples existed in the material (only a mention); `contrast.mjs` is written from the WCAG definition, not from a script of the material.
- The sentence of the task "mag 32 × 25 px" does not say which is the height; the files give 32 high and 25 wide (frame 0), and the test says so.
- The Playwright MCP tool wrote a screenshot into the main checkout instead of my directory (the path resolved against the tool's workspace); cleaned as above.

## Working copies

- `.runs/author/` of the worktree held my scratch scripts (Pillow measure, mutation runner, JPEG embedder, a preview image, the Chrome JPEG): removed. Nothing is kept beside this report.
- The Chrome screenshot first saved at `.runs/author/chrome.jpeg of the main checkout`, with `.playwright-mcp/page-….yml of the main checkout`: moved or removed, and both directories removed. Nothing stays.
