PASS d3a04f38726617e7338fd7dbc2e5f71dbbdd74f8

# Review of slice 1 (with the foundation entries), task `scena-z-ludzikiem`

Range `8f9e713..d3a04f3`, worktree `C:\Storage\repos\loop2-wt\scena-z-ludzikiem`, branch `task/scena-z-ludzikiem`.
`git rev-parse HEAD` = `d3a04f38726617e7338fd7dbc2e5f71dbbdd74f8`, as given. Commits in range: `40ded65`, `0d11c97` (foundation), `873f9f9`, `d3a04f3` (slice 1). I changed no tracked file and made no commit; `git status --short` was empty after every check (the build wrote only the ignored `dist/`).

Counts: blocking 0, Minor 4 (one of them out of scope), Important 0, Critical 0.

## Findings

### Critical
none

### Important
none

### Minor

1. **D-317 title promises durations the body does not state** (`C:\Storage\repos\loop2-wt\scena-z-ludzikiem\foundations\decisions.md:6829`). The question reads "How long do the scene's effects last?", and the body holds only "The scene follows the system's setting for reduced motion and shows no flash of its whole area." Nothing in D-317 says how long an effect lasts. *Why it matters:* a reader who looks the question up finds no answer to it; D-319 even says the walk is "no effect of an ordinary event", pointing at a limit that no entry states yet. *Evidence:* the *Decisions in play* of the task says the first sentence of the projected entry ("An effect of an ordinary event lasts at most 300 ms ...") is written by task 20, so this is the planned partial entry, and the foundation report names it (concern 5). Nothing to fix now; task 20 must complete the body and, if it wishes, keep the title. Grade Minor, in scope (the entry is written here).

2. **D-122 now contradicts itself** (`foundations/decisions.md:2212-2255`). The new clause says the scene keeps its colours at a stop at a discovery (so a pause and a stop are told apart), while the Rationale still says "Accepted with it: a stop at a discovery cannot be told apart in the game state from the player's pause". *Why it matters:* the next reader of D-122 takes the older sentence as binding. *Evidence:* the task's *Context* says the code contradicts that sentence through `state.discovery` and that task 16, which writes D-122, corrects it. Out of scope by the task's own assignment; named so that task 16 does not miss it. Minor, out of scope.

3. **README sentence repeats itself** (`C:\Storage\repos\loop2-wt\scena-z-ludzikiem\README.md:25`). The added clause says again "autorstwa Anokolisy, których warunki nie wymagają wzmianki" and the sentence now holds three semicolon-joined parts, 1800+ characters in one list item. It is correct and names all six files as the task asks (checked below), but could say "oraz postać maga ... i rekwizyty ... z tej samej paczki" once. Polish only, no effect on behaviour. Minor.

4. **Name `berry-bush.png` for a bush with no berries** (the executor's observation 1). I viewed the pack's `Environment\Props\Static\Vegetation.png` whole: it has no bush with berries at all, only green, olive, amber and red bushes. The file is exactly the one the old Loop uses for berries (`C:\Storage\repos\loop\src\components\probe\Scene.tsx:47`, `bush: ... /sprites/bush.png`, `berry: 'bush'`), D-316 and the task call it "the berry bush" ("krzak jagód"), and a berry-less bush is the only honest Pixel Crawler choice (D-271 forbids another pack). No change needed; the name is the game's name for the thing, not a claim about the pixels. Minor, no action.

## Judgment of the executor's other two observations

- **Idle frame 0 on the top row (observation 2).** I reproduced it: the pack's own `Idle-Sheet.png` frame 0 has opaque pixels on row 0 (bbox y 0..31). In `mage-idle.png` that frame sits at y 32..63 of a 64-high frame, so nothing is cut by the new file; frame 0's top is the pack's art. I viewed the 4x montage: the hat of frame 0 is whole. No finding.
- **Half-pixel centring (observation 3).** Idle figure box x 20..44 and run figure box x 19..44 (frame 64 wide, bottom row 63 in every frame of both sheets). Centres differ by 0.5 source pixel (1 screen pixel at `SCENE_SCALE` 2). The feet and the body line up and the idle/run switch does not jump vertically; the run frames differ among themselves by up to 1 px in x because the pack draws them so. No finding.

## What I checked against the task and the handoff

**Trust boundary (`assets/sprites/**`):**
- Each of the six new files is a PNG with chunks `IHDR, IDAT, IEND` only, no trailing bytes after `IEND`: no text, time, gamma, colour-profile or physical-size chunk. (Own script, listing below. The two older files `forest-scene.png` and `login-backdrop.png` are likewise clean, the latter with two `IDAT`.) Sizes in bytes: mage-idle 1564, mage-run 2294, fire 1056, sticks 306, berry-bush 654, moss 203. All colour type 6, 8 bit, no `PLTE`.
- Only the build copies them: `scripts/static-files.mjs` `copySpriteFiles` reads `assets/sprites/` and copies `name.endsWith(".png")` only; the Dockerfile and `.dockerignore` copy the directory into the build stage only (`COPY assets/sprites/`, `!assets/sprites/`); nothing else in the repository (excluding the foundation text) reads the directory; the runtime paths `/sprites/...` in `src/browser/styles.css` and `src/browser/view/world-area.tsx` refer to the served copy.
- `npm run build` then `git diff --no-index --stat assets/sprites dist/public/sprites` exit 0, empty output; `dist/public/sprites/` lists the eight files. `git ls-files --eol` shows the new files as `-text` (binary), so no line-ending rewrite can touch them.
- **Provenance, by pixels, read-only against `C:\Storage\repos\loop\`:**
  - `mage-run.png` is pixel-identical to `assets\pixel-crawler\Entities\Npc's\Wizzard\Run\Run-Sheet.png` (384 x 64, six frames of 64 x 64), transparent pixels compared as equal regardless of colour.
  - `mage-idle.png` (256 x 64) is, frame by frame for all four frames, `Idle-Sheet.png` (128 x 32) with each 32 x 32 frame placed at offset (16, 32) in a 64 x 64 frame; no flip, so the mage faces right as the pack draws it (seen in the montage).
  - `sticks.png` found at exactly (20, 97) in `Environment\Props\Static\Resources.png`; `berry-bush.png` at (98, 5) and `moss.png` at (82, 279) in `Environment\Props\Static\Vegetation.png`; each a whole-picture exact match, and only one position each.
  - `fire.png`: SHA-256 equal to `C:\Storage\repos\loop\public\sprites\fire.png`; I compared the whole sheet with every sheet of `Environment\Structures\Stations\Bonfire\`: it equals `Bonfire_02-Sheet.png` shifted one pixel to the right (all 127 columns compared), and no other sheet. Column 0 and column 31 of every frame of `fire.png` are fully transparent, so the shift moves no pixel across a frame boundary and nothing is lost. The claim of the report is true.
  - `sticks`, `bush`->`berry-bush` and `moss` have SHA-256 equal to the old Loop's `public\sprites\` files, which are the "unchanged copies" the task asks for.
  - No picture is of another pack.
- Frame size and count the report gives: mage-idle 4 x 64 x 64, mage-run 6 x 64 x 64, fire 4 x 32 x 32, others single pictures (22 x 13, 29 x 27, 12 x 9): true.
- README `npm run build` sentence now names all six new files as cut from the same Pixel Crawler pack, whose terms ask for no credit, next to the two existing ones. The diff is one line, no other README change.

**Foundation entries (D-316 to D-322, parts of D-04, D-39, D-40, D-43, D-122, D-271, invariant `loop2-container-sprites`), read whole at their present range, against *Settlements to record* rows 1-9 and *Decisions in play*:**
- Row 1 (pause grey `grayscale(1) brightness(0.5)`, all motion stands, colour and standing motion at a discovery): D-322 and the clause in D-122, with the verification pairs. Row 2: D-318 (every action of *To do* 3, incl. flax, "Zapal — patyk", "Zjedz", waiting, fight). Row 3: D-316. Row 4: D-319 (640 ms, 160 ms, turn from the place reached, stands at once at start, "Restart", load and reduced motion; "no effect of an ordinary event"). Row 5, 6, 9: D-320 with D-39, D-40, D-43 (badge on `panel`, track `highlight`, fill `positive`, icon `text-strong`; no icon and bar while waiting; no icon in combat). Row 7: D-321. Row 8: D-322 (death: still, no badge, grey mage `grayscale(1) brightness(0.55)`; completion: still, no badge, colour). They say what the task says; I found no sentence that says more or less broadly than its row. The two grey values are the ones the orchestrator settled.
- *Decisions in play*: D-04 exception for the scene (previous reading and events), D-43 (frames and positions of a sprite, geometry of the scene, icon in the badge), D-39 (`positive` as the bar's fill, `warning` never), D-40, D-122 (scene keeps colours), D-271 (mage clause) and E2 (reduced motion, no flash) are all present; E4/D-272 stood at the base. D-316 relates to D-04, D-18, D-271, and its scope adds `simulation` because the pictures stand in `src/browser/sim/data/`, consistent with `content-identifiers`.
- `python -B .the-way/elements/common/foundation_check.py`: "0 errors".
- The invariant `loop2-container-sprites` says what the plan's slice 2 and 3 will test (path, same bytes, every file the scene's drawing asks for) and its parts include `build-tools`, `account-server`, `deployment`. It is `Method: test` with no test file yet; the plan (`plan.md` E10, Slice 2 `tests/invariants/test_loop2_container_sprites.py`, Slice 3 a case of `tests/view/scene-picture.test.mjs`) makes the test in this change. This is unverifiable at this range; the review of the whole change must see both tests exist, or the method has to read `review` (the foundation report's concern 1). Not a finding of slice 1.
- D-04's exception is worded as the approved definition words it for the scene ("its previous reading ... and the events the simulation returned"); whether the scene's code reads events is unknown until slices 3 and 5 exist (foundation report concern 3). Judge at the whole-change review.

**Guidelines:** `guidelines/styleguide-browser-view.md` has no rule about pictures, sprites or the scene (searched for sprite, scene, picture, image and png: no match, and the headings list holds nothing for them); slice 1 draws no interface. I read the section list and grepped, I did not read all 532 lines.

## Declined to judge

- The values `grayscale(1) brightness(0.55)` and `brightness(0.5)` against D-43 and the guard `browser-view-token-values`: settled by the orchestrator, written into the stylesheet by a later slice; the styleguide slice must keep them acceptable to the guard.
- The scene's code, data, motion and tests: not in this range.
- Whether `tests/invariants/test_loop2_container_sprites.py` will pass and be claimed by the part `deployment`: slice 2.

## Checks run

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `git rev-parse HEAD`; `git log --oneline 8f9e713..d3a04f3`; `git diff --stat 8f9e713..d3a04f3` | 0 | head `d3a04f3`; four commits; nine files (six new PNG, README one line, decisions, invariants) |
| 2 | `python -I C:/Users/Mariusz/AppData/Local/Temp/claude/c7b90770d5ecab56/36edb2f6-2155-422c-930f-0a39e611f3c7/scratchpad/chunks.py assets/sprites/*.png` (my own chunk lister, reads bytes, checks signature, chunk list, trailing bytes) | 0 | all eight files `IHDR` (`IDAT`) `IEND` only, no trailing bytes |
| 3 | `python -I .../scratchpad/prov.py` (my own: pixel comparison of the mage files with the pack's sheets, whole-picture search of the props in the pack sheets, fire against every Bonfire sheet; Pillow, no numpy) | 0 | results as above |
| 4 | `python -I .../scratchpad/fire.py` (fire frames' edge columns; 4x montage to the scratchpad, viewed) | 0 | columns 0 and 31 transparent in all four frames; montage looked right |
| 5 | `sha256sum` of `fire`, `sticks`, `berry-bush`, `moss` against `loop/public/sprites/{fire,sticks,bush,moss}.png` | 0 | each pair equal |
| 6 | `npm run build` | 0 | built; only `dist/` (ignored) written |
| 7 | `git diff --no-index --stat assets/sprites dist/public/sprites` | 0 | empty output |
| 8 | `python -B .the-way/elements/common/foundation_check.py` | 0 | "0 errors" |
| 9 | `python -B -m pytest -q -p no:cacheprovider tests/invariants/test_application_build_output.py` | 0 | 7 passed, 10 subtests passed |
| 10 | `git status --short` after the checks | 0 | empty |

Not run: `npm test` (the cycle's gate, not repeated), the executor's own scripts (I wrote my own checks instead of trusting theirs), anything in the running game (slice 1 has no code).
Python for the scripts: system Python with Pillow; no numpy, nothing installed; the scripts live in the scratchpad, outside the repository.

## Reaches beyond the handoff

- Read `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md` before writing my scripts (my instructions require it).
- `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:1-28, 44-125, 153-245` (the *Decisions in play*, *Settlements to record* and *Questions to settle*): the handoff named only lines 29-43 and 126-152, but it also asks to judge the foundation entries against *Settlements to record* and *Decisions in play*, which stand there.
- `docs/task-cycles/scena-z-ludzikiem/reports/foundation-report.md` and `slice-1-report.md`: the reports to verify, as the handoff says.
- `docs/task-cycles/scena-z-ludzikiem/plan.md` (grep for `container-sprites`, Slice headings) and `cycle.md` line 54, 66: to see whether the test of the invariant is planned in this change.
- `foundations/decisions.md` D-291, D-18, D-62, D-132 headings and D-291 text; `foundations/environment_facts.md` `pixel-crawler-terms`; `foundations/invariants.md` `loop2-container-icons` (the sibling); `Dockerfile`, `.dockerignore`, `.gitattributes`; a grep of the repository for `assets/sprites` and `container-sprites`: to check "nothing but the build copies it" and the invariant's form.
- `C:\Storage\repos\loop\src\components\probe\Scene.tsx:47,72` (grep for `bush`): to judge the bush's name.

## Searches not found or unclear

- A berry-bearing bush in the pack: not found in `Vegetation.png` (viewed whole); the pack holds only plain bushes. Not a gap in the change.
- Whether the old Loop cut `fire.png` from `Bonfire_02` shifted one pixel on purpose: unclear (same as the executor's note); the result is a faithful, lossless shift of a pack sheet, so provenance holds.
- Whether the scene's code will read the events the simulation returns (D-04 breadth): unclear at this range.
- Whether `Method: test` of `loop2-container-sprites` is met: the test files do not exist yet; they are planned in slices 2 and 3.
- I did not read `guidelines/styleguide-browser-view.md` line by line (see above).
