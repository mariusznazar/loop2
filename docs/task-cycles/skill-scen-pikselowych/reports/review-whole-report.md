FAIL 9459331b738617be566c11cfb40286d4de4cbd56

# Review of the whole change — loop2: skill z gotowymi skryptami do grafiki sceny

Range `e125db89f913b8c2d7b04d493f5696c96c522ebf..9459331b` (`git rev-parse HEAD` = `9459331b738617be566c11cfb40286d4de4cbd56`, the head given), two commits: `021f2aa7` (skill, scripts, tests, `AGENTS.md` pointer) and `9459331b` (D-415). No plan: the change came from one author, so a blocking finding comes from a commit, not from a slice. `.the-way` stands on the pinned `bfb2e109`.

Counts: 3 blocking (Important), 0 Critical, 10 Minor (9 within the task, M1–M9; 1 outside it, O1), 0 out-of-scope Important.

## Important

### I1. `flashes.mjs` compares a count of frame pixels with a field and a threshold given in screen pixels, and the frames of `loop2-play` are always scaled down

- Place: `.claude/skills/loop2-scene-art/flashes.mjs:22-23` (`FIELD = { width: 341, height: 256, threshold: 21824 }`), `:61-66` (`busiestField` uses that field in frame pixels), `:145-150` (the output line); `.claude/skills/loop2-scene-art/SKILL.md:137-138`; both copies.
- What is wrong: D-317's *Based on* gives the field as "a 341 x 256 pixel rectangle anywhere on the displayed screen area when the content is viewed at 1024 x 768 pixels", so the field and the quarter of it (21,824 px) are in pixels of the screen. The frames `loop2-play` gives are smaller than the screen. `.claude/skills/loop2-play/frames.js:5-6` starts the screencast with `quality: 60` and no `size`. Playwright then fits the frame into 800 px (`playwright-core/lib/coreBundle.js:23312-23319`: `scale = Math.min(1, 800 / Math.max(viewport.width, viewport.height))`, and 800 × 600 where no viewport is set). The smallest window the game supports is 1280 px wide (D-396), so a frame pixel is at least 1.6 screen pixels wide. In area, the counted moved pixels are at most 0.39 of the screen's, and the "field" of 341 × 256 frame pixels covers at least 546 × 410 screen pixels. That is wider than most of the scene and taller than all of it (304 px). The script prints both numbers on one line: "at most N of them in one field of 341 x 256 px; D-317 gives 21824 px as the general flash threshold". A flash that covers exactly 25 % of a real field, 21,824 screen pixels, shows as about 8,500, and the reader takes it to be well under the threshold. The skill already knows the frames are scaled: `SKILL.md:128-130` has the reader multiply the scene's rectangle by "the ratio of the frame's width to `window.innerWidth`". It applies no such ratio to the field. Every test of `flashes.mjs` uses frames at 1:1, and no test reads the field line (see M5), so nothing shows this.
- Why it matters: *To do* 4.6 asks for the measure of flashes "z klatek, które daje `loop2-play`, wobec zasady o błyskach z D-317". On exactly those frames the measure puts an understated number beside the threshold. The human judges the request from these numbers (*To do* 6), so the error reaches the judgement unseen.
- Evidence: the lines above. My own check of `busiestField` on frames made at 1:1 (500 × 300, a 100 × 100 square and a 300 × 200 block turned black to white) gave "at most 60000 of them in one field", the value worked out by hand. The arithmetic is right; the units are wrong.
- What would fix it: scale the field and the threshold by the frame's width over `window.innerWidth`, for example an option the reader gives as `SKILL.md` already has them compute it. Or, failing that, stop printing the comparison and say in `SKILL.md` that the counts are in frame pixels.

### I2. The skill sends the reader to take a colour sample "as it shows on the screen" from a frame of `loop2-play`, which is a scaled-down JPEG of quality 60, and does not state the limit

- Place: `.claude/skills/loop2-scene-art/SKILL.md:109-111` ("for a colour as it shows on the screen, take the sample from a frame of the running game (`loop2-play`), which `--ground` and `--prop` read too"); `.claude/skills/loop2-scene-art/jpeg.mjs:322-327` (the colour planes are enlarged by repeating samples); `SKILL.md:19-21` (the only place JPEG is mentioned, for `flashes.mjs` alone).
- What is wrong: a frame is the screen scaled down to at most 800 px (see I1), JPEG at quality 60 (`frames.js:6`), with colour at half resolution. One pixel of the scene's picture is 2 CSS px on the screen (D-349) and at most 1.25 pixels of the frame. A frame pixel at a prop drawn in one-pixel strokes, such as the sticks' outline, is therefore a mix of several pixels of the scene, plus the loss of JPEG. On top of that, `jpeg.mjs` repeats each colour sample where Pillow and the browser smooth it. The author measured up to 57 levels of difference at coloured edges (author report, weakest point). The skill presents the frame's pixel as "a colour as it shows on the screen" and states none of this. The handoff's question 3 asks whether the skill states the limit where a reader needs it; it does not, and the reader needs it exactly here.
- Why it matters: check 2 ("Kolor efektu wobec rekwizytu", *To do* 5.2) gives the human numbers to judge (D-415). The task names a wrong sample as the source of the mistake in task 17 ("Błąd zadania 17 był w wyborze próbki"). Followed as written, this advice yields a sample colour that may stand nowhere on the screen. The resulting ratio looks as precise as one taken from a sprite file.
- Evidence: the lines above. `contrast.mjs` on my own samples of the sprite files works: dust against the snow `#bccae5` gives 3.13:1 at its lightest brown, and against the sticks `#634219` 1.09:1. I recomputed both ratios with a separate formula. The fault is only in the advice on frames.
- What would fix it: say in `SKILL.md` that a frame pixel is an approximation, scaled and lossy, good for a broad area such as the snow and not for a pixel of a prop. Or point to a full-size PNG screenshot for samples under the tint.

### I3. A test comment and a test name give a document outside the foundation as the source of the expected values

- Place: `tests/agent_workflow/test_scene_art_sheet_frames.py:97-99`, namely `test_the_figures_of_the_wolf_and_the_mage_in_the_game_are_the_ones_the_review_measured` with the comment "The review of tasks 17 to 20 measured wolf-idle.png at 31 px high and 63 px long and mage-idle.png at 32 x 25 px".
- What is wrong: D-82 (`foundations/decisions.md:918`, binding sentence): "a test comment names as the source of an expectation no document outside the foundation — a task document and a copy of one kept in the record of a task cycle included". Its *Verification* (`:925`) counts as a violation "a test comment that names a task document, a note or the copy of a task document in the record of a task cycle as the source of the expected value". `guidelines/testing.md:100-101`, rule "Where the expected value comes from", says the same: "Komentarz testu nie wskazuje dokumentu spoza fundamentu". The review of tasks 17–20 is a note in the task's material, outside the repository; the comment names it as the source, and so does the test's name.
- Why it matters: a binding decision of the touched part `agent-workflow` (D-82's *Scope* names it). A reader sent to a review they cannot open is the dead pointer D-82 and D-362 remove. The expected values themselves are sound. They are facts of the two files, which I measured with a PNG reader of my own (see Checks): the relation the code under test does not compute, which needs no source named.
- Evidence: the lines above. The fix is a rename and a comment that says what is measured (the box of the visible pixels of frame 0 of each file), with no source.

## Minor — within the task

- **M1.** `.claude/skills/loop2-scene-art/grid.mjs:78`: `to-grid` writes the grid with `writeFileSync` and does not make the folder. An output path in a folder that does not exist ends in Node's own `ENOENT` stack trace, not an `error:` line. `image.mjs:24` makes the folder for every picture a script writes. I ran `node .claude/skills/loop2-scene-art/grid.mjs to-grid assets/sprites/sticks.png .runs/review-whole/nodir/frame.txt --trim` and got exit 1 with a stack trace. `SKILL.md:19-21` promises an `error: <file>: …` line, and step 4 writes into `.runs/<name>/`, which exists only if step 1 ran.
- **M2.** `.claude/skills/loop2-scene-art/png.mjs:45` checks only that the first chunk is IHDR, so a PNG with a second IHDR is read and passed. My crafted file with two IHDR chunks went through `sheet-frames.mjs cut` with exit 0 and an output file. It does no harm (the second header is ignored and the output holds pixels alone), but it is a malformed PNG accepted at an input from outside.
- **M3.** `.claude/skills/loop2-scene-art/jpeg.mjs:53` returns at the end of the first scan, so a JPEG cut before its EOI marker is read as whole. My `good.jpeg` without its last two bytes gave exit 0 in `flashes.mjs` and in `sheet-frames.mjs cut`. The image data was whole, so the reading is correct; a file cut inside its data is refused (author's test, and my "cut after scan header" case).
- **M4.** `.claude/skills/loop2-scene-art/SKILL.md:84-87` and `:143-144` state in the skill's own words what D-415 now decides (the human judges; a check sets no threshold; a threshold binds only where a decision gives one), and never name D-415. *To do* 2 has the skill point to the rules where they stand rather than repeat them. With D-415 written, the binding text and the skill's restatement can drift apart. Naming D-415 there would keep one source.
- **M5.** `tests/agent_workflow/test_scene_art_flashes.py`: no test reads the line of the busiest field (`flashes.mjs:148-150`) or the line "against the first frame" (`:151-158`). `busiestField` is a summed-area window, arithmetic that is easy to get wrong. My check above found it right on 1:1 frames, but nothing in the gate would catch a broken one.
- **M6.** `.claude/skills/loop2-scene-art/preview.mjs:8-10, 108-110` and `SKILL.md:121-122`: a picture is laid by the box of its visible pixels. The game places a frame by its whole cell: `src/browser/sim/data/scene.ts:18-23` gives "the picture's left edge and the line it stands on", and `src/browser/view/scene-picture.ts:657-664` places the dust by its 16 × 16 cell. The skill does not say how to turn one into the other. The offset differs per frame: 0–3 px for the dust's frames 0–6 and 6 px for frame 7; 20–22 px and 32–36 px for the mage's sheets. A preview laid at the game's numbers is therefore off by those offsets, and check 3 ("czy efekt nie znika pod innym elementem") depends on where the effect lies against the mage. I got a correct preview only after taking each box from `sheet-frames.mjs measure` (dust at 83,119, mage-bend at 64,108, sticks at 80,119). It shows the case the task names, the brown dust lost on the sticks and partly behind the mage.
- **M7.** `.claude/skills/loop2-scene-art/grid.mjs:172-174`: `--reference` compares the rows' keys, not their colours. An edit that changes a colour line (`B #643200` → `B #ffffff`) and keeps the keys reports "0 pixels differ from the reference".
- **M8.** `.claude/skills/loop2-scene-art/flashes.mjs:22` and its output (`:149`, "D-317 gives 21824 px as the general flash threshold"), and `SKILL.md:137-138` ("that D-317 names"): the binding sentence of D-317 is "The scene shows no flash of its whole area". The field of 341 × 256 and its quarter stand in D-317's *Based on* (WCAG). The success criterion 2.3.1 that holds the threshold binds through D-42. Attributing the number to D-317 tells a reader that D-317 sets this threshold. The number itself is sourced; "D-317's source, WCAG 2.3.1, kept by D-42" would be exact.
- **M9.** `foundations/decisions.md:11118`, the *Verification* of D-415 (`violates: a sentence of a decision, a test of the scene or a rule of style that sets a least contrast of an effect against a prop, or a rule that no element covers an effect, which no decision gave`). Read for "a sentence of a decision", the clause "which no decision gave" turns on itself: such a sentence is a decision giving it. The intent is plain from the task (a threshold slipped into a decision by a cycle, as task 19 did with D-271), so a reader is unlikely to misread it in practice. It is Minor by WAY-364: the content agrees with the code.

## Minor — outside the task

- **O1.** `guidelines/styleguide-browser-view.md:640`, rule "The scene of a map run", lists the decisions it rests on and does not list D-415. This is not a finding for this change. The rule states nothing D-415 governs: it speaks of the dust against the ground, never against a prop. The file changes only through `the-way-maintain-styleguide`, and the task leaves the styleguide as it is ("Reguły zostają tam, gdzie są"). It is a note for the return step, if the orchestrator wants the rule to name D-415.

## Judgements the handoff asked for

1. **D-415.**
   - It states the meaning of row 1: the human judges, at the request, whether the colour stands out from the prop and whether another element covers it, from numbers and a picture, and no threshold decides. Its second sentence, "A threshold binds only where a decision gives it, as D-271 gives…", comes from the task's answer to the second question and from *To do* 6, not from invention. Its *Rationale* and *Rejected* are taken from the answer's *Not chosen* and from *Context* (the two cases of dust staying in the game, the 3:1 specks of task 19).
   - It is a decision of the product, not an instruction to the agent. It settles what the product's rules may hold, namely no threshold of an effect against a prop in a decision, a test or a rule of style, and who accepts such an effect. D-87 is the precedent: it is a decision of the log on how appearance is accepted, by a person in a browser. D-254 and D-357–D-359 were withdrawn because they were ways of operating tools; this is not one.
   - It does not collide with D-271. It cites D-271's 3:1 for the frost exactly ("the outline or the fill of the frost 3:1 against the snow") and leaves the ground rule as it is. D-42, D-317 and D-366 hold nothing against it.
   - The skill adds no threshold against a prop: `contrast.mjs` exits 0 whatever the ratio, shown by `test_a_low_ratio_sets_no_exit_code_because_the_script_gives_numbers_and_no_threshold`. The only threshold the scripts print is the flash threshold, from D-317's source and D-42 (see I1 and M8).
2. **The scale check.** A reader finds it: `SKILL.md:89-95` names it as check 1 with its command (`sheet-frames.mjs measure`). The task's list of six scripts is met. 4.1 is `sheet-frames.mjs cut` and `compare`, 4.2 `recolor.mjs`, 4.3 `grid.mjs`, 4.4 `contrast.mjs`, 4.5 `preview.mjs`, 4.6 `flashes.mjs`, each with its test file in `tests/agent_workflow/`. *To do* 5 asks each check to name the script that makes it, not for a seventh script.
3. **`jpeg.mjs` and `flashes.mjs`.** `flashes.mjs` stays sound with this reader for what it compares. Both frames of a pair are read the same way, so a still part of the scene gives the same values in both, and the move it counts, 0.10 of luminance, is far above the reader's error in flat areas. The limit is not stated where a reader needs it: for a colour sample from a frame (I2), and the frames' scale for the field (I1).
4. **The styleguide.** A note for the return step, not a finding for this change (O1).
5. **The author's unread material.**
   - I read whole: the decisions D-82 to D-85 and D-87, which the author read only through `guidelines/testing.md`, and the section "The scene of a map run" of the styleguide (lines 638–810).
   - Of the glossary I read every heading and the entries "unit test" and "integration test". It has no entry for effect, prop, scene or request.
   - I did not read `tests/view/scene-picture.test.mjs`. The change touches no code of the scene, and the PNG reader of the skill was judged on its own behaviour and inputs.

## The task, item by item

- **To do 1:** met. The skill is in `.claude/skills/loop2-scene-art/` and `.agents/skills/loop2-scene-art/`, byte-identical (`diff -r` empty, and the skill test). `AGENTS.md:17` points to it as it points to `loop2-play`.
- **To do 2:** met. `SKILL.md` steps 1–5 follow the order the task gives, and the rules are pointed to (D-271, D-317, D-349, the styleguide's section). M4 remains.
- **To do 3:** met. Step 5 names the change of D-271, the fact of the licence in `foundations/environment_facts.md` (as `lpc-wolf-licence`), the line in `PACK_CREDITS` of `src/browser/view/credits.ts` under `sprite-credits`, and the row of "External context" of `foundations/part_map.md`. I checked that all of them exist.
- **To do 4:** six scripts, each with a test in `npm test`. 4.6 is met in form but its measure is wrong in units on the frames named (I1).
- **To do 5:** three checks, each with its script. The scale check is `measure`, the colour check `contrast.mjs`, the covering check `preview.mjs` (M6). The advice on frame samples is I2.
- **To do 6:** met (`SKILL.md:84-87, 143-144`; `contrast.mjs` exits 0).
- **To do 7:** met (`SKILL.md:146-151`).
- **Acceptance criterion 1:** met, and verified independently. My own PNG reader (`.runs/review-whole/measure_own.py`, standard library, written apart from the skill and from `scene_art_support.py`) gives `wolf-idle.png` (64 × 32, one frame) a box of 63 wide and 31 high. It gives `mage-idle.png` (256 × 64, frames of 64) 25 wide and 32 high in frame 0, then 30, 30 and 31 high in frames 1–3. The test's expected values are literals, not taken from the script's output; its ratio line (1.03, 0.40) is arithmetic on them. Only the comment and the name of that test are a finding (I3).
- **Acceptance criterion 2:** met. `SKILL.md` names nothing outside the repository but the pack's own download, and every file and entry it names exists. `test_tracked_file_private_paths.py` passes, and my search of the diff for names of notes, folders of the task's material or disk paths found none outside the comment of I3.
- **Questions to settle:** the three answers are carried by the skill: the sixth script; numbers and a picture with no threshold; the reviewer chooses their own samples.
- **Questions carried to cycle:** met. Node with `node:zlib`; `package.json`, `package-lock.json` and `requirements-quality.*` are untouched (`git diff --stat` on them is empty).
- **Settlement row 1:** written as D-415 (see judgement 1).
- **Reserved choice:** none taken. Node.js is the repository's own runtime, and no library was added.
- **Trust check (crafted input):** malformed, truncated, wrong-sized, interlaced and 16-bit PNG, and progressive and damaged JPEG, are refused with `error:` and exit 1, with no output file. The author's `test_scene_art_refusals.py` and `test_scene_art_flashes.py` cover them; I confirmed with my own crafted files (Checks). The two inputs accepted are M2 and M3.
- **Author's own-work check:** it named the JPEG reader as the weakest point and checked it against a Chrome *screenshot* of 1707 × 769 px. The frames the measure gets are screencast frames of at most 800 px, which that check could not reach; it would not have caught I1 or I2.
- **Tests:** each fails when its behaviour breaks, for the cases they hold, and none computes its expectation with the code under test. Pillow's reading is the source for the JPEG pixels, WCAG's known pairs for contrast, and hand-written rows for the rest. Gaps: M5.
- **Guidelines:** `guidelines/coding.md`. Ruff passes on `tests/agent_workflow/`. ESLint's scope (D-29) and Prettier's (D-32) do not cover `agent-workflow`; Prettier passes on the files anyway. LF line endings in all 33 new files. `guidelines/coding.md` has no rule of size (`### Size of a function and a file` absent), so a finding of structure would be Minor. I raise none beyond those listed: `jpeg.mjs` at 352 lines and `grid.mjs` at 202 are the largest new files, each holding one concern. `guidelines/testing.md`: levels (integration, files and processes), the place of the files and the gate are as the rules give, and "Where the expected value comes from" yields I3.

## Declined to judge

- How often `loop2-play` gives a frame. Its `SKILL.md:162-163` says "a run at 1× about one a second", which could miss an effect of 300 ms, but that is the behaviour of `loop2-play`, which the task names as the source of the frames, not of this change.
- That `sheet-frames.mjs cut` takes only frames side by side in one row with no gap. No sentence of the task asks for other layouts of a sheet, and the scene's existing sheets are single rows.
- Whether the word "request" in D-415 needs the qualifier WAY-104 gives words of the process. No sentence of the files would be read wrongly without it.

## Checks I ran

All from the worktree root `the root of the task's worktree`.

- `git rev-parse HEAD` → `9459331b…` (exit 0); `git -C .the-way rev-parse HEAD` → `bfb2e109…`, equal to the gitlink (exit 0).
- `diff -r .claude/skills/loop2-scene-art .agents/skills/loop2-scene-art`: exit 0, no difference.
- `npm test -- tests/agent_workflow/test_loop2_scene_art_skill.py`: exit 0 (7 tests). The same for `test_scene_art_sheet_frames.py` (9), `test_scene_art_recolor.py` (7), `test_scene_art_grid.py` (8), `test_scene_art_contrast.py` (5), `test_scene_art_preview.py` (6), `test_scene_art_flashes.py` (9), `test_scene_art_refusals.py` (3), `test_loop2_play_skill.py` (8) and `test_tracked_file_private_paths.py` (1): each exit 0.
- `npm test -- tests/invariants/test_cross_part_imports.py`: exit 0.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, `0 errors`.
- `python -B .the-way/instruction-files/check_instructions.py .`: exit 0, "0 error, 143 warn, 7 info"; no line names `loop2-scene-art`. The author reported 145 warnings; the difference is unexplained and touches no file of this change.
- `.runs/quality-venv/Scripts/ruff.exe check tests/agent_workflow/`: exit 0. `npx prettier --check .claude/skills/loop2-scene-art/*.mjs`: exit 0.
- `git ls-files --eol` on the 33 new files: all `i/lf w/lf`.
- `python -B .the-way/task-cycle/change_file_sizes.py e125db89f913b8c2d7b04d493f5696c96c522ebf 9459331b`: exit 0. 35 files: 33 added, `AGENTS.md` 33→35, `foundations/decisions.md` 11118→11133. No test of a rule of size exists to run on the base and the head, because `guidelines/coding.md` holds no such rule.
- `python -B .the-way/elements/common/decision_index.py` with `--sections`, then with the sections "Scene" and "Look of the browser view: styleguide, controls, pictures and fonts", `--part agent-workflow --part product-foundation --part browser-view` and the task's decisions: exit 0 each.
- Criterion 1 by my own reader: `python -B .runs/review-whole/measure_own.py assets/sprites/wolf-idle.png 64` and `… mage-idle.png 64`: exit 0, figures as above. Then `node .claude/skills/loop2-scene-art/sheet-frames.mjs measure assets/sprites/mage-idle.png#64 assets/sprites/wolf-idle.png#64`: exit 0, the same figures.
- The scripts on my own samples:
  - `sheet-frames.mjs measure assets/sprites/dust.png#16 assets/sprites/sticks.png`: exit 0.
  - `contrast.mjs --effect assets/sprites/dust.png --ground assets/sprites/forest-scene.png@100,140 --ground …@30,128 --prop assets/sprites/sticks.png@11,6 --prop …@4,9`: exit 0. Two ratios rechecked with a separate formula (`python -c`, 3.13 and 1.09).
  - `preview.mjs --crop 40,90,80,52 --scale 6 --out .runs/review-whole/layers.png --put assets/sprites/sticks.png@80,119 --put assets/sprites/dust.png@83,119#0/16 --put assets/sprites/mage-bend.png@64,108#0/64`: exit 0. I looked at the preview: the mage bends, the brown dust lies over the sticks and is hard to tell from them, and the mage covers the dust's left edge.
  - `grid.mjs to-grid assets/sprites/sticks.png .runs/review-whole/frame.txt --trim` then `to-png … --reference …` then `sheet-frames.mjs compare assets/sprites/sticks.png --at 0,0 --frame 22x13 --count 1 …`: exits 0, 0, 0; the round trip gives "differing pixels: 0 of 286".
  - `grid.mjs to-grid … .runs/review-whole/nodir/frame.txt`: exit 1 with a stack trace (M1).
  - A node script checking that `#5a3d23`, the colour of the skill's example of step 3, is held by `forest-scene.png`: true.
- Crafted input, `python -B .runs/review-whole/crafted.py` (exit 0). Each file was run through `flashes.mjs` and `sheet-frames.mjs cut`; the results are kept in `reports/review-whole-crafted.txt`.
  - Refused with `error:`, exit 1 and no output file: a PNG with a header of 100000 × 100000, with no IDAT, with filter type 7, with a palette index past its table, and empty; a progressive JPEG, a JPEG cut after its scan header, a JPEG with damaged entropy bytes, a CMYK JPEG and a JPEG with a header of 65535 × 65535.
  - Accepted: a PNG with two IHDR chunks (M2) and a JPEG without EOI (M3). A grey JPEG is read, as it should be.
- `busiestField` on frames of my own (500 × 300 px, a 100 × 100 square and a 300 × 200 block turned white): exit 0, "at most 60000 of them in one field", 60000 being the value worked out by hand.
- Not run: the full `npm test` (the orchestrator's gate, as the handoff gives). Nor a real `loop2-play` screencast through `flashes.mjs`: it needs the local start and a browser session; I1 rests on the screencast code of the installed Playwright instead.

## Reaches beyond my selection

- `guidelines/styleguide-browser-view.md`, the section "The scene of a map run" (lines 638–810). The change touches no user interface of `browser-view`, so the selection required no file of that part. I read the section because D-415 has the scope `browser-view`, and to judge the order of layers the skill cites and the handoff's question 4.
- `.claude/skills/loop2-play/frames.js`, `save-frames.mjs` and its `SKILL.md` (by search), to know the frames `flashes.mjs` reads.
- `playwright-core/lib/coreBundle.js:23312-23319` and its `types/types.d.ts:18753-18790`, for the default size of a screencast frame (I1).
- `src/browser/sim/data/scene.ts` (lines 15–70, 135–160, 286–292) and `src/browser/view/scene-picture.ts:640-672`, for the places of the props and the dust (M6) and for my samples.
- `foundations/part_map.md`, "External context" (lines 193–213); `foundations/invariants.md`, `sprite-credits` and `tracked-file-private-names` whole; `foundations/environment_facts.md` by heading `lpc-wolf-licence`; `src/browser/view/credits.ts` by `PACK_CREDITS`. All to check the names step 5 of the skill gives.
- The *Scope* lines of D-29, D-30 and D-32, for which files ESLint, Ruff and Prettier must cover.
- `the author's own rule for writing scripts`, the user's rule for writing scripts, before my throwaway scripts.

## Working copies

- `.runs/review-whole/` held the decision indexes, the outputs of the checks, my scripts (`measure_own.py`, `crafted.py`, `has.mjs`), the crafted inputs, the frames for `busiestField`, the grid and preview files of my runs and `layers.png`. It is removed after this report is written. Kept beside this report: `reports/review-whole-crafted.txt` (results of the crafted inputs). No worktree was made, and no screenshot was taken or shown to the human. My check of `busiestField` imported `scene_art_support` without `-B` and left `tests/agent_workflow/__pycache__/scene_art_support.cpython-314.pyc`, which git does not track; I removed it, and `git status --short` is clean.

## Unread material

- **Decisions read whole: 14 of my index.** D-271, D-272, D-273, D-317, D-349, D-362, D-366, D-415, D-42 and D-87 among the decisions listed in full; D-82, D-83, D-84 and D-85 among those listed by heading. The rest of the index was read by its binding sentences (39 in full) and its headings (261, run through). None of those gave a bearing that needed the entry opened.
- Decisions that bear on the change and stayed unread whole:
  - D-316: binding sentence only, from the index.
  - D-73, D-77 and D-81: read through `guidelines/testing.md`.
  - D-29, D-30 and D-32: *Scope* lines only.
  - D-396: binding sentence only, from the index; it gives the smallest window, 1280 px, that I1 rests on.
- Guideline files: `guidelines/coding.md` and `guidelines/testing.md` read whole. `guidelines/styleguide-browser-view.md` only the section above; my selection required none of it, as the change touches no user interface. No `guidelines/coding-*.md` kind matches.
- The-way's glossary at the pinned commit: not read. The product's glossary: headings and two entries.
- `tests/view/scene-picture.test.mjs`: not read.

## Searches not found or unclear

- The task's line references (`foundations/decisions.md:6176` for D-271, `:7793` for D-317, `:8788` for D-349, `:1750` for D-87, `:9034` for D-362, `part_map.md:121`) point elsewhere in this worktree. D-271 is at 4630, D-317 at 10734, D-349 at 10025, D-87 at 976, D-362 at 734; I searched by identifier.
- The default size of a screencast frame is not in Playwright's `types.d.ts`. I found it in the code of `coreBundle.js` (I1) and did not confirm it on a real frame of `loop2-play`.
- How often `loop2-play` gives frames while an effect plays ("about one a second" at 1×) is unclear to me, and so is whether a 300 ms effect is caught at all (Declined to judge).
- The author's count of 145 warnings of `check_instructions.py` against my 143: the difference is not explained.
