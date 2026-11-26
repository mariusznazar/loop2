done with concerns

# Report - executor of Slice 1, task `katalog-map`

Branch `task/katalog-map`, base `612476a6`. One commit: `a0949dec` (feat: add the bear's four sheets cut from the pack
"[LPC] bears, deer, lions and more" and credit the pack under CC BY 4.0). Nothing pushed. The full gate was not run.

## Files changed

| File | Added / removed lines |
|---|---|
| `assets/sprites/bear-idle.png` | new, 835 bytes, one frame of 64 x 64 |
| `assets/sprites/bear-run.png` | new, 2079 bytes, 5 frames |
| `assets/sprites/bear-bite.png` | new, 2018 bytes, 3 frames |
| `assets/sprites/bear-death.png` | new, 2225 bytes, 4 frames |
| `README.md` | +1 / -1 (point 2: "four packs", the fourth pack with its four files and how they were made, the closing sentence names the second, third and fourth) |
| `src/browser/view/credits.ts` | +13 / -2 (one `PACK_CREDITS` entry, comment of the list) |
| `tests/view/icons.test.mjs` | +28 / -14 |

## What I took from the pack, and which bear

The pack: `https://opengameart.org/content/lpc-bears-deer-lions-and-more`, download `lpc_animals_2022_v1.1.zip` (421 287 bytes,
sha256 `a4ea2c5b33061858e02a60dda34adb30bc8c4a334030bdcc7fafef32c810c002`), fetched with `curl` and an ordinary User-Agent into
`.runs/executor-1/`, unzipped there, no script run from inside it, scripts of mine kept in `.runs/executor-1-scripts/`, my Python
run with `-I`. Both directories are removed (see Working copies).

I took the sheet `individual creature spritesheets/bear, grizzly.png` (320 x 768, 5 x 12 cells of 64 x 64), the brown bear. The
black bear is a very dark brown and the polar one is white; I looked at the grizzly and black sheets, the polar one is white by the
page's own description and by its measure, and would vanish in the snow of the scene. Rows of the grizzly sheet (looked at, scale 2
and 4): row 0 walk away, row 1 walk to the right, row 2 walk to the left (5 frames), row 3 walk toward the viewer; rows 4-7 attack
(up, right 3 frames, left 3 frames, down), rows 8-11 fall. The bear faces left (nose at the left of the frame) in rows 2, 6 and 10.

| File | Cut command (from the root) | Compare |
|---|---|---|
| `bear-idle.png` | `cut <sheet> --at 256,128 --frame 64x64 --count 1` (the last frame of the left walk) | `differing pixels: 0 of 4096` |
| `bear-run.png` | `cut <sheet> --at 0,128 --frame 64x64 --count 5` (left walk) | `differing pixels: 0 of 20480` |
| `bear-bite.png` | `cut <sheet> --at 0,384 --frame 64x64 --count 3` (left attack) | `differing pixels: 0 of 12288` |
| `bear-death.png` | `cut <sheet> --at 0,640 --frame 64x64 --count 4` (left fall, the last two frames the bear lying) | `differing pixels: 0 of 16384` |

Why that standing frame: the first frame of the attack is, to within 115 pixels after a shift of 2 rows, the last frame of the walk
(the other four walk frames differ from it by 423 to 546 pixels). The wolf's sheets start the bite on the idle frame, so the idle
frame is walk frame 4; bite frame 0 is then the same pose. Walk frame 1 has the legs most upright and would look more like standing,
but the bite would then start on another pose. This is a choice I made and the orchestrator or the human may change (cost: a re-cut
of `bear-idle.png`, one command).

`sprite-file-content`: the four files hold the chunks `IHDR, IDAT, IEND` only (probe `executor-1-probes/chunks.mjs`).

## The licence: the pack's text against the environment fact and the task

The zip holds PNG files only: 46 files, no text, licence, README or credits file (`unzip -l` matched none of `txt`, `licen`, `readme`,
`credit`). So the pack's own licence and attribution text is the page's. I read the page (HTML to text, my script, saved copy removed):

- Author: tapatilorenzo. Licence field: `CC-BY 4.0`.
- Section "License": "Sevarihk is responsible for the Shiba dog, shark, giant rat, walking mushroom, and underwater tiles ... This is
  allowed under the CC-BY 4.0 license ... Note that any work which isn't derivative of Sevarihk's work may be used explicitly under
  CC0, no attribution required. I also don't require attribution for my adaptations of Sevarihk's work (though attribution to him is
  still required when using derivative work)."
- "Copyright/Attribution Notice: Adapted from work by Sevarihk under CC-BY 4.0 license, including the shiba dog, shark, giant rat,
  walking mushroom, and underwater tile sprites."
- "Sprite Info": "Bear sprites (64x64). Grizzly, black bear, polar bear." A comment of FiveBrosStopMosYT on the page: "The bears,
  deer, small rats, and lions are completely his", which the author does not contradict.

In plain words for the bear sheets I cut: they are the author's own work and do not derive from Sevarihk (the page lists exactly five
sprite groups as Sevarihk's, and no bear is among them). The page's licence field names CC BY 4.0, which asks for a credit to the
author. The page also says that work not derived from Sevarihk may be used under CC0 with no attribution. So the page offers the bear
both ways; the text of the page and the environment fact `lpc-bears-deer-lions-licence` agree with each other word for word (the fact
quotes the same passages). Nothing in the page disagrees with the task (Q2 part 2, To do 3: CC BY 4.0 with a credit): the game takes
the stricter of the two offers and credits tapatilorenzo. I did not drop the credit. No attribution to Sevarihk is needed for the
bears by the pack's own text, and the credit line does not name him.

I did not read the fact's source archive link, only the live page (read 2026-11-25); the fact's quoted passages are on the page as
quoted.

## Numbers for the request: the first check of `loop2-scene-art`

Command: `node .claude/skills/loop2-scene-art/sheet-frames.mjs measure assets/sprites/mage-idle.png#64 assets/sprites/wolf-idle.png#64 assets/sprites/bear-idle.png#64`
(exit 0). Pixels of the scene's picture, frame 0 of each file:

| Figure | Width x height | Box in its frame | Against the mage |
|---|---|---|---|
| mage (`mage-idle.png`, frame 64 x 64) | 25 x 32 | x 20-45, y 32-64 | - |
| wolf (`wolf-idle.png`, frame 64 x 32) | 63 x 31 | x 0-63, y 1-32 | height 0.97 times, width 2.52 times |
| bear (`bear-idle.png`, frame 64 x 64) | 59 x 51 | x 2-61, y 9-60 | height 1.59 times, width 2.36 times |

The task's context gives 59 x 52 for the bear; I measure 51 high for the idle frame I took (frame 0 of the walk is 52 high, the
others 51 or 49). Other bear boxes (measured the same way): walk 59 x 51-52, bite 59-64 x 51-58 (frame 2, the swipe, reaches the
frame's left and top edge: x 0-64, y 0-58), death 59 x 49, 55 x 52, 59 x 34, 59 x 32. The screen shows the scene once or twice as
large (D-349). The bear is taller than the mage by a half and as wide as the wolf; the human judges it (D-415) from the screenshot
that Slice 2 or 11 shows.

## Concerns for the orchestrator (Slice 2 and the screenshot slices)

1. **The feet of the bear stand at different rows in its own sheets.** Lowest visible row of the figure: idle 60 (frame 4), run
   60-62, bite 58 (all three frames), death 59, 59, 57, 57, of a frame 64 rows high, so its bottom row is 63. The wolf's sheets end on
   row 32 of 32 (feet on the bottom row, as `SceneCreatureSheets` says). The mage's feet are on row 64 of 64. A bear of the pack
   therefore stands 3 to 4 rows above the line where a mage or wolf frame would stand, and its bite sits 2 rows higher than its idle
   (the attack row of the pack is drawn two rows up from its walk, probe `executor-1-probes/shift2-output.txt`: bite frame 0 against
   walk frame 4 matches best with a shift of 2). The files are cut as the pack has them (compare 0 differing pixels, as the slice
   asks), so I did not shift anything. If the scene places a frame by its bottom edge, Slice 2 has to account for this, or the bear
   floats about 3 rows (6 screen pixels at two times) above the ground and jumps 2 rows when it starts to bite. A hand-made shift
   would break the "every pixel moved unchanged" statement of D-271.
2. **The bite sheet has 3 frames where the wolf's has 5** (the pack's attack is stand, reach, swipe). The idle, run and death sheets
   have 1, 5 and 4 frames, as the wolf's. Slice 2's `frames` for `bear` is therefore `idle 1, run 5, bite 3, death 4`; the wolf's
   comment "the bite sheet loops while the creature fights" holds for 3 frames too. Anything that assumes 5 bite frames fails.
3. **The page's own CC0 sentence** (see Licence): the stricter CC BY 4.0 is credited; nothing for the plan to change.
4. The bear's frame is 64 x 64 against the wolf's 64 x 32, so a creature frame is no longer always 32 high; Slice 2's placement
   (`SceneSpot`) must not assume it.

## Checks (commands and exit codes)

| Check | Result |
|---|---|
| `node .claude/skills/loop2-scene-art/sheet-frames.mjs compare <grizzly sheet> --at ... --frame 64x64 --count N assets/sprites/bear-<file>.png` for each of the four files | exit 0 each; `differing pixels: 0` of 4096, 20480, 12288, 16384 |
| `node .claude/skills/loop2-scene-art/sheet-frames.mjs measure assets/sprites/mage-idle.png#64 assets/sprites/wolf-idle.png#64 assets/sprites/bear-idle.png#64` | exit 0; numbers above |
| `npm test -- tests/view/icons.test.mjs` (before the commit, after `git add`, and once more after the last edit) | exit 0; 41 tests, 41 pass |
| `npm run --silent typecheck` | exit 0 |
| `npx eslint --max-warnings 0 src/browser/view/credits.ts` | exit 0 |
| `npx prettier --check src/browser/view/credits.ts tests/view/icons.test.mjs` | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | exit 1, 14 errors, all of the known ones (`tests/view/maps-screen.test.mjs`, `tests/view/map-lines.test.mjs`, `tests/view/account-screen.test.mjs`: Slices 8 and 9 own them). |
| `python -B .the-way/elements/common/foundation_check.py` (no flag) | exit 1, 14 errors, the same ones. |

The foundation check first listed a 15th error, mine: the `decision:` quotation I wrote at `tests/view/icons.test.mjs:449` began in the
middle of the sentence of D-271 ("the game credits each pack ..."); the check wants a quotation that begins a sentence. I changed it to
begin at "A sprite file holds pixels alone, ..." and the error was gone (second run above; the first run exit 1 with 15 errors, the
second exit 1 with 14).

Not run: the full gate (`npm test` with no file), `tests/invariants/test_icon_credits.py` (it reads the icons' credits, which this
change does not touch; named here as not run), the python test of the scene-art scripts. Listed failing tests of other slices
(`tests/balance/overlay.test.mjs`, `tests/view/map-lines.test.mjs`, `tests/view/maps-screen.test.mjs`, `tests/view/account-screen.test.mjs`)
were not run by me and my slice does not touch them.

## Test changes and the breaks they catch

`tests/view/icons.test.mjs`:
- `PACK_LINES`, `PACK_PAGES`: the bear's line and page added; `PACK_LICENCES` (new) holds the licence link text and address of each
  pack line, the bear's `CC BY 4.0` with `https://creativecommons.org/licenses/by/4.0/`; the test of the pack lines now says "last three
  lines" and checks each line's licence against its own pack (before, one constant for all). Break caught: a bear line with the licence
  of the wolf (3.0), a missing link, a wrong title or author.
- `SPRITE_PACKS`, `PACK_OF_SPRITE`: the pack and the four files assigned; the README parser splits on `The fourth is ` too; the test
  title says "four packs". Break caught: a bear file with no assignment, a README that does not name the files under the bear's pack.
- the second test of the pack lines asks for a line of the new pack once a file of it exists (precondition `packsInUse.has(...)`).
- Seen failing once: with the bear's entry removed from `PACK_CREDITS` (and restored from the index), `npm test -- tests/view/icons.test.mjs`
  had 4 failures (item counts 24 expected, the last-three-lines test, the pack-without-a-line test), 37 passing; after the restore,
  exit 0, 41 pass. A bear file with no assignment is caught by the existing test; I did not break the README.
- Decision quotation: the D-271 sentence that now holds the bear ("A sprite file holds pixels alone, ... the game takes the pack LPC
  Wolf under its licence CC BY 3.0, the bear's pictures come from the pack „[LPC] bears, deer, lions and more”, which the game takes
  under its licence CC BY 4.0 and credits") is quoted at the two tests that held the shorter prefix of it and are about the bear's
  credit; the third test keeps its shorter prefix.

Not tested and by design: the pictures' pixels beyond what the cut's comparison with the sheet says; whether the bear looks right
(the human judges it, D-415).

## Own-work check (section 3 of the method)

- Requirement most likely unmet: the files must be cuts of one bear facing left, "every pixel moved unchanged" (D-271), and the credit
  line must carry what `sprite-credits` asks (what it is for, title, author, page with a link, licence with a link, how the files
  differ) and agree with the page.
- Check: (a) `compare` on each file (0 differing pixels, above); (b) chunk probe, only `IHDR, IDAT, IEND`; (c) I looked at the sheet
  rows to confirm the nose is at the left in rows 2, 6, 10 (images at scale 4); (d) the section of credits in the running game: I
  started `npm run local` (address in its `Local game:` line), opened the login card in Playwright CLI, opened the folded credits and
  read the last line: `Niedźwiedź: „[LPC] bears, deer, lions and more”, tapatilorenzo, opengameart.org, CC BY 4.0, zmienione (wycięte klatki)`,
  the links `https://opengameart.org/content/lpc-bears-deer-lions-and-more` and `https://creativecommons.org/licenses/by/4.0/`; (e) in the
  same run `fetch('/sprites/bear-idle.png')`, `-run`, `-bite`, `-death` answered 200, `image/png`, 835, 2079, 2018 and 2225 bytes, the
  sizes of the files in `assets/sprites/` (the build copies them). Showed: all as required. What it did not show: how the bear looks
  in the scene (nothing in the game's data names the files until Slice 2).

## Walk of the running product (`walkthrough.md`)

The change alters what a visitor sees in one place: one more line in the folded section of credits, "Autorzy grafiki", on the login
card and at the bottom of Siedziba. The files are served at `/sprites/bear-*.png` but no screen draws them yet.

| Case | By what | Verdict |
|---|---|---|
| The folded credits on the login card hold a last line for the bear's pack: what it is for, title, author, page link, CC BY 4.0 link, the change | the login card of the local game in Playwright CLI at `https://127.0.0.1:<port of the Local game line>` (Chromium of the CLI, Windows 11), read with `eval` after opening the `<details>` | passes: the text and both link addresses as above; the first two lines unchanged |
| The four sprite files are served by the built game with the bytes of the repository files | `fetch` of the four paths from the same page | passes, 200, `image/png`, sizes equal to the files |
| The line fits the card in the phone layout / opened state, the look of the line | not checked | unchecked: it is a text line in the existing list with its existing rule (`credits.css`), no new style; no screenshot taken, none shown to the human |
| Siedziba's section (same component `CreditsSection`) | not checked in the browser | unchecked: needs an account and a character; the same component and the same `creditLines()` feed both places, which `tests/view/icons.test.mjs` renders |
| Side observation | - | nothing wrong seen; I did not read the browser console |

What I did not check: the look of the bear in the scene (Slice 2 onward), the phone layout, Siedziba. Errors outside the task's scope: none.
The game was stopped (`npm run local:stop`, "Local starts stopped: 1") and the Playwright session closed.

## Reach beyond the dispatch

- The page of the pack (the licence text): the handoff names it; no extra.
- `tests/view/icons.test.mjs` whole, `README.md:30-36` and `src/browser/view/credits.ts` whole, `src/browser/view/credits-section.tsx` and the head of
  `src/browser/view/credit-lines.ts` (to see how a `PackCredit` is drawn), `.the-way/task-cycle/change/slice.md`, `ui_check.md`,
  `walkthrough.md`, `.claude/skills/loop2-play/SKILL.md` lines 1-140 (to start the game), `tests/invariants/test_icon_credits.py` lines 1-200 (named
  in the dispatch *Read*, read in part). `git log --oneline` and `git.md` of the author's rules for the commit form.

## Choices (with the way rejected and its cost)

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| Grizzly bear | black bear (very dark, harder to see on the scene's dark parts); polar (white on snow) | one re-cut command per file |
| Idle = last frame of the walk (frame 4) | frame 1 (legs upright, looks more like standing) | one re-cut command; the bite would start on another pose |
| Bite sheet 3 frames, the whole attack of the pack | repeating frames to make 5 | none; the frames are the pack's |
| Credit name `Niedźwiedź` for the pack's line, as `Wilk` is for the wolf's | `Niedźwiedź (matecznik)` | one string |
| Credit line "changes" `zmienione (wycięte klatki)`, as the wolf's | adding a mention of the standing frame | one string; the README says how the idle sheet was made |
| `PACK_LICENCES` array in the test, one entry per line | one constant for the licence | none |

## Working copies

- `.runs\executor-1\` (the zip, the unzipped pack, the page, the looks, the logs): removed.
- `.runs\executor-1-scripts\` (my scripts): removed. What the report needs is kept in
  `.runs\task-cycles\katalog-map\reports\executor-1-probes\`: `shift2.mjs` (compares each walk frame with
  bite frame 0 under shifts of -6 to 6 rows), `shift2-output.txt` and `chunks.mjs` (lists the chunk types of a PNG).
  Note: `shift2.mjs` imports `image.mjs` of the skill by a relative path from the removed directory; to run it again, copy it back to a directory two levels under the root.
- The game's own start directory `.runs/local-start/` is made by `npm run local` and is the product tool's, not mine.
- A stray empty file `.runs/exec1-scripts-dummy`, made by a mistyped command of mine, was removed.

## Unread material

- `guidelines/styleguide-browser-view.md` (1507 lines): not read, not even in part. My change adds a data entry in `credits.ts` and tests; it
  changes no component, style or screen text beyond one more line of an existing list.
- `guidelines/testing.md`: read lines 1-310 (to the end of the section "Mutation testing"), not lines 310-509 (flaky tests,
  document imitation, test files in the gate, recipes, not-tested-on-purpose, examples). The tool's limit on a read made it impossible in one read.
- `.runs/task-cycles/katalog-map/task.md`: read only the lines of the handoff's *Read* (30, 56-64, 130, 177, 201).
- `foundations/part_map.md:1-33`, `foundations/environment_facts.md` `lpc-wolf-licence`: the wolf fact I saw (lines 840-844); the part map I did not open (the foundation check
  reports no unclaimed file, which is what my change needed of it).
- `foundations/invariants.md:1208-1226` I read; `sprite-credits` I read whole.
- `.claude/skills/loop2-scene-art/sheet-frames.mjs`: read lines 1-60 only (its header and the strip request), used by its commands.
- `src/browser/sim/data/scene.ts:86-125` read; `README.md:30-36` read the line 2 whole.

## Searches not found or unclear

- The pack's own licence and attribution text "inside the download": not found. The zip holds 46 PNG files and nothing else; the text of the
  licence is on the page only. (Searched with `unzip -l` and `find`.)
- The task's size for the bear (59 x 52) against my measure (59 x 51 for the idle frame): unclear which frame the task measured; it is the
  walk's frame 0 (52 high).
- `--skip-test-citations` of `foundation_check.py` printed the same 14 citation errors (three test files) with and without the flag, and also
  reported my own mis-begun quotation at `tests/view/icons.test.mjs:449`; so the flag did not skip the citation check as the handoff
  describes it. I did not look into the flag. Of no consequence for the slice: the same 14, owned by Slices 8 and 9.
