PASS a0949deca18bf274e0037563882bfd216e5b72e2

# Review of Slice 1 (range 612476a6..a0949dec), task `katalog-map`

`git rev-parse HEAD` = `a0949deca18bf274e0037563882bfd216e5b72e2`. One commit in the range; seven files: four PNG, `README.md`,
`src/browser/view/credits.ts`, `tests/view/icons.test.mjs`. Blocking: 0. Minor: 0. Out of scope: 0.

## Findings

None blocking, none Minor.

Observations that are not findings (for the request's description, not defects):
- The idle frame is 59 x 51 in the figure's box where the task's context says 59 x 52; the executor says the 52 is walk frame 0.
  I re-measured the idle file: 59 x 51. The numbers for the request are right as the executor gives them (below).
- The bear's feet stand at different rows in its sheets, the bite sheet has 3 frames (the wolf's has 5) and a creature frame is
  64 x 64 where the wolf's is 64 x 32. The dispatch assigns these to Slices 2 and 4; not judged here.

## What I verified, against what the slice claims

1. **The four files are the unmodified frames of the pack.** I fetched the pack's download myself
   (`https://opengameart.org/sites/default/files/lpc_animals_2022_v1.1.zip`, 421287 bytes, sha256
   `a4ea2c5b33061858e02a60dda34adb30bc8c4a334030bdcc7fafef32c810c002`, the same as the executor's), unzipped it in my own directory,
   ran no script from inside it, and ran `compare` against `individual creature spritesheets/bear, grizzly.png` with the cut
   parameters of the executor: each `differing pixels: 0` (of 4096, 20480, 12288, 16384), exit 0. I looked at the sheet and at
   the run, bite and death strips: the brown (grizzly) bear, nose at the left in rows 2, 6 and 10 (y 128, 384, 640), which are the
   walk, the attack and the fall of the bear facing left; rows 1 and 5 face right and are not used. The brown bear rather than the
   polar one is what the slice asks for.
2. **`sprite-file-content`** holds: the four files hold the chunks `IHDR, IDAT, IEND` only (probe
   `reports/executor-1-probes/chunks.mjs` run by me on each; exit 0), and are PNG files, no metadata chunk, no text chunk. The
   files are stored `-text` (binary), as the other sprites.
3. **The pack's licence against the fact `lpc-bears-deer-lions-licence` and the task.** The zip holds 47 PNG files (the
   executor says 46; the count is of no consequence) and two directories, no licence, README or credits text; so the pack's text
   is the page's. I read the live page (HTML fetched into my directory): the licence field is `CC-BY 4.0`, the `License` section
   and the `Copyright/Attribution Notice` say what the fact quotes (Sevarihk's five sprite groups are named, no bear among them;
   non-derivative work may be used under CC0). The credit line (`Niedźwiedź: „[LPC] bears, deer, lions and more”, tapatilorenzo,
   opengameart.org, CC BY 4.0, zmienione (wycięte klatki)`) with the links to the pack's page and to
   `https://creativecommons.org/licenses/by/4.0/` is faithful to the fact and to the task (Q2 part 2, settlement row 5: CC BY 4.0,
   credited): the game takes the stricter of the two offers the page makes and does not use the CC0 sentence, and it does not
   name Sevarihk because no bear is his by the page. README point 2 says the same ("The licences of the second, the third and the
   fourth pack ask for a credit") and says how the files were made ("from the rows in which the bear faces left, every pixel moved
   unchanged: the run sheet is its walk, the bite sheet its attack, the death sheet its fall, the idle sheet one frame of its
   walk"), which `compare` confirms.
4. **`sprite-credits` holds.** `PACK_CREDITS` holds what the pack is for (`Niedźwiedź`), title, author, page with a link,
   licence with a link and how the files differ; the test of the pack lines checks each against `PACK_LINES`, `PACK_PAGES` and the
   new per-line `PACK_LICENCES` (so a bear line with the licence of the wolf fails, where before one constant served all); the test
   of README assigns the four files to the fourth pack through `packOfSpriteInReadme`, whose split now also cuts at "The fourth is ";
   `PACK_OF_SPRITE` and `SPRITE_PACKS` hold the pack; the precondition `packsInUse.has(...)` makes the "pack without a line" test
   ask about the bear's pack. The test file stays at 616 lines, under the 800 of D-425. The invariant `sprite-credits` is
   named in the report as one whose test changed: `tests/view/icons.test.mjs` (three tests marked `// invariant: sprite-credits`
   were changed; each change strengthens or extends, none weakens).
5. **`loop2-container-sprites`**: the python test `tests/invariants/test_loop2_container_sprites.py` reads every PNG of
   `assets/sprites/`; it needs Docker and is part of the gate; I did not run it (gate not run by agents). The files are plain PNG in
   the directory `scripts/static-files.mjs` copies; the executor's walk fetched all four from the built game with equal sizes.
6. **Trust boundary** (`assets/sprites/**`, files from outside): the files are written by the skill's `cut` from the pack's PNG
   (re-encoded, pixels only); nothing from the pack other than pixels reaches the repository; nothing in the game's data names
   the files yet (`git diff` shows no change under `src/browser/sim/`), so no crafted input has a path to the game in this slice.
7. **Code that passes a test without meeting the requirement:** none found. The test's expected values (`PACK_LINES` etc.) are the
   page's title, author and licence written out independently of `PACK_CREDITS`; the product has no branch for the test's input.
8. **Guidelines.** `guidelines/testing.md` (read whole): "Changing an existing test" - the changed expectations (`PACK_LICENCE` to
   `PACK_LICENCES`, counts 2 to 3) have their cause in the requirement (D-271 now names the third pack); "Behaviour, not
   implementation" - the tests assert the credit's text and links the invariant requires; the trust-boundary rule for
   `assets/sprites/` says a further PNG file does not change the boundary and that review stands in place of a test. `guidelines/coding.md`
   read whole: formatter and linter pass (below); the size rule is met. The numbers for the request, re-run by me:

   | Figure | Width x height | Box in its frame | Against the mage |
   |---|---|---|---|
   | mage (`mage-idle.png`, 64 x 64) | 25 x 32 | x 20-45, y 32-64 | - |
   | wolf (`wolf-idle.png`, 64 x 32) | 63 x 31 | x 0-63, y 1-32 | height 0.97, width 2.52 |
   | bear (`bear-idle.png`, 64 x 64) | 59 x 51 | x 2-61, y 9-60 | height 1.59, width 2.36 |

9. **The author's walk** (credits line in the running login card; the four files served): the judgment that only one line of the
   folded section changes for a visitor agrees with the diff; its two unchecked cases (phone layout, Siedziba) give reasons and
   are the same component fed by `creditLines()`, which the test renders. I did not repeat the walk.

## Declined to judge

- The bear's feet at different rows in its sheets, the 3-frame bite sheet and the 64 x 64 creature frame: Slice 2 and later (the
  dispatch).
- How the bear looks in the scene, its scale beside the mage, the choice of walk frame 4 as the standing frame: the human judges
  at the request (D-415); only the numbers are checked here.
- The fact entry's own wording and the part-map row (written in `612476a6`, outside the range): I only confirmed that the
  fact agrees with the live page and that the part map holds the row for the pack (`foundations/part_map.md:236`).

## Checks

| Command | Exit | Result |
|---|---|---|
| `git rev-parse HEAD` | 0 | `a0949dec...` |
| `node .claude/skills/loop2-scene-art/sheet-frames.mjs compare <grizzly sheet> --at 256,128 --frame 64x64 --count 1 assets/sprites/bear-idle.png` | 0 | `differing pixels: 0 of 4096` |
| same, `--at 0,128 --count 5 ... bear-run.png` | 0 | `differing pixels: 0 of 20480` |
| same, `--at 0,384 --count 3 ... bear-bite.png` | 0 | `differing pixels: 0 of 12288` |
| same, `--at 0,640 --count 4 ... bear-death.png` | 0 | `differing pixels: 0 of 16384` |
| `node .claude/skills/loop2-scene-art/sheet-frames.mjs measure assets/sprites/mage-idle.png#64 assets/sprites/wolf-idle.png#64 assets/sprites/bear-idle.png#64` | 0 | numbers above |
| `node .../executor-1-probes/chunks.mjs assets/sprites/bear-{idle,run,bite,death}.png` | 0 | `IHDR,IDAT,IEND` each |
| `npm test -- tests/view/icons.test.mjs` | 0 | 41 tests, 41 pass |
| `npm run --silent typecheck` | 0 | |
| `npx eslint --max-warnings 0 src/browser/view/credits.ts` | 0 | |
| `npx prettier --check src/browser/view/credits.ts tests/view/icons.test.mjs` | 0 | |
| `python -B -m pytest -q tests/invariants/test_icon_credits.py` | 0 | 3 passed, 10 subtests |
| `python -B .the-way/elements/common/foundation_check.py` | 1 | 14 errors, exactly the known ones: `tests/view/account-screen.test.mjs` (2), `tests/view/map-lines.test.mjs` (2), `tests/view/maps-screen.test.mjs` (10), citations of D-325/D-327; no other error |

Not run: the full gate; `tests/invariants/test_loop2_container_sprites.py` (needs Docker, part of the gate); a mutation of the
README or of `PACK_CREDITS` by me (I read the tests' logic instead; the executor reports one break seen failing).

## Reach beyond the dispatch

- The pack's download and its page on OpenGameArt (`https://opengameart.org/content/lpc-bears-deer-lions-and-more`): to compare
  the sheets and the licence text with the files and the fact, as the dispatch asked.
- `foundations/part_map.md` (grep for the pack's row, line 236), `tests/invariants/test_loop2_container_sprites.py` (head, by grep), `tests/quality/eslint-size-rules.mjs`
  (head, for the file-size threshold), `tests/view/scene-picture.test.mjs` (grep, for tests that list the sprite directory): to see whether another test or rule is
  touched by four new files; none is.

## Working copies

`.runs\review-1\` (the zip, the unzipped pack, the page, the foundation-check
output): removed. Nothing kept; nothing was needed beyond this report.

## Unread material

- `guidelines/styleguide-browser-view.md` (1507 lines): not read whole; I searched it and `guidelines/coding-browser-module.md` for
  the credits section and `PACK_CREDITS` and read only the hit (styleguide line 387-388, about the stylesheet of the credits
  section, not touched by this change; coding-browser-module lists `credits.ts` as `copy`). The change adds a data entry and no
  component, style or text outside the existing list.
- `guidelines/coding-browser-module.md` (429 lines): read only around the table hit (lines 38-39), not whole.
- `.claude/skills/loop2-scene-art/SKILL.md`: read lines 1-60 and the step "A new pack" and the head of "The three checks";
  `.claude/skills/loop2-scene-art/sheet-frames.mjs`: read lines 1-60 (head) only.
- `src/browser/AGENTS.md`: read whole (9 lines). `guidelines/coding.md`, `guidelines/testing.md`: read whole.
- `foundations/decisions.md` D-271: read its opening paragraph (lines 5160-5170) and the sentence the tests quote, not the whole
  entry (it runs to 5267); the foundation check passes the quotations of the tests of this slice. `foundations/invariants.md`
  `sprite-file-content`, `loop2-container-sprites`, `sprite-credits`: read whole. Fact `lpc-bears-deer-lions-licence`: read whole;
  `lpc-wolf-licence` whole. `foundations/part_map.md`: lines 1-40 and the row at 236 only.
- `src/browser/sim/data/scene.ts:86-125` (SCENE_CREATURES): not read; the slice changes nothing there.
- The executor's `shift2.mjs` and `shift2-output.txt` (the idle-frame choice, bite frame 0 against walk frame 4): not read or re-run; the choice is the
  human's to judge at the request and is not a requirement of the slice beyond "one standing frame made from a frame of the walk",
  which holds.
- The passages of the task given in the handoff: read whole.

## Searches not found or unclear

- The pack's own licence and attribution text inside the download: not found (47 PNG files and two directories, no text file); the text
  is on the page only. I read the page instead.
- The task's 59 x 52 for the bear against the 59 x 51 I and the executor measure for the idle frame: which frame the task measured is
  not stated in the task; the walk's frame 0 is 52 high by the executor's report (I measured only the idle file).
- The executor says the zip holds 46 PNG files; I count 47 (`unzip -Z1 | grep -c '\.png$'`). Immaterial.
