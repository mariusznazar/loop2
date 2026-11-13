# Author report — task oboz-w-siedzibie (the whole change as the one author)

**Status:** done with concerns (concerns listed at the end: the Python invariant test could not run for lack of Docker, the screenshots are not pushed, the composition and the numbers wait for the human's eye).

## Commits (branch `task/oboz-w-siedzibie`, base `2b4d760c`, not pushed)

| Commit | Content |
|---|---|
| `e05f7b2b` feat | the camp: two sprite files, data, `camp.tsx`, `camp-picture.ts`, `headquarters.tsx`, CSS, `PICTURE_PIXEL` |
| `10ba53b6` test | tests of the camp; the container-files case widened to the camp; docstring of the Python invariant test |
| `68fe6248` docs | foundation: D-389 new, D-272, D-271, `loop2-container-sprites` |
| `07fd0de3` docs | styleguide rule of the camp, geometry added to the token rule, README line of the sprites |

`git log --format='%h %ae' -1` shows `mariusznn@gmail.com` (the private address) after the first commit.

## Files changed (added / removed lines, `git diff --stat 2b4d760c HEAD`)

- `assets/sprites/camp-clearing.png` (new, 672 × 48 RGB, 4781 B), `assets/sprites/chest.png` (new, 26 × 21 RGBA, 428 B)
- `src/browser/sim/data/scene.ts` +38/-0 (`PICTURE_PIXEL`, `CAMP`)
- `src/browser/view/camp-picture.ts` +86/-0 (new, pure), `src/browser/view/camp.tsx` +112/-0 (new)
- `src/browser/view/headquarters.tsx` +65/-53 (camp above the panel, the manual run read; mostly re-indentation by Prettier)
- `src/browser/view/scene.tsx` +1/-1 (`Sheet` exported), `src/browser/view/world-area.tsx` +3/-2 (scene size from `PICTURE_PIXEL`)
- `src/browser/styles.css` +80/-2 (camp rules, camp selectors added to the scene's frame animation rule)
- tests: `tests/view/camp-picture.test.mjs` +116/-0 (new), `tests/view/headquarters-screen.test.mjs` +140/-2, `tests/view/scene-picture.test.mjs` +15/-1, `tests/invariants/test_loop2_container_sprites.py` +9/-9
- `foundations/decisions.md` +87/-8, `foundations/invariants.md` +2/-2, `guidelines/styleguide-browser-view.md` +44/-4, `README.md` +1/-1
- total 17 files, 799 insertions, 85 deletions

## Where the band stands in the DOM (answer to point 1)

Measured in the running game: `header` (menu bar host, then `p.save-line` / `.failure-line`, the warning row) → `main.app-main` → [`p.page-notice`, the page's sentence, when one stands] → `div.game-view` → `section.screen.headquarters-screen` → `div.headquarters-host` → `div.camp` (the band) then `div.headquarters.screen-area` (the panel with `h2` „Siedziba”). So the band is under the warning row, under the page's sentence (D-286; checked in the game with „Zapis pochodził z innej wersji gry…” standing above the band) and over the heading. The band is a sibling of the panel, not inside it, so it has the whole width of the content (1344 px at most), not the panel's width less its padding and frame.

Fill of a wide window: the clearing is 672 × 48 picture pixels, drawn 1344 × 96, exactly the widest content (D-280). A window wider than that has the content at 1344 and the band at 1344, so no window is wider than the picture and nothing needs filling. A narrower band shows the middle of the picture (picture centred in the band, `overflow: hidden`), never scaled.

## What was made

- Pictures: the chest is the rectangle 26 × 21 at (179, 75) of the pack's sheet of interior props (found from the pixels: rows 75–95, columns 179–204; the row below is a stone block and is not in the rectangle; the task's "27 × 22 by eye" is not the size). The clearing is the pack's snow tile (`Floors_Tiles.png` at 0, 384, 32 × 32) repeated over 672 × 48 and, over it, the pines and saplings of the forest of the scene pasted opaque pixel by opaque pixel (no blending), their bases 16–21 rows from the top so that the band shows their lower part. Layout (piece, left x, base y): pine_low 8,20 · sap_snow 56,16 · tree_snow 84,18 · pine_low2 118,21 · sap_bare 172,16 · pine_low 196,19 · tree_bare 262,18 · sap_bare 410,16 · pine_low2 432,21 · sap_snow 488,16 · pine_low 512,19 · tree_snow 566,18 · pine_low2 596,21 · sap_bare 650,16. The scratch tools are under `.runs/camp-work/` (ignored by git).
- Data (`scene.ts`): `PICTURE_PIXEL = 2` (also used now by `world-area.tsx` for the scene's 672 × 304, so the pixel size is one constant), `CAMP` with the two files, `cell: 32` (pixels a character takes in the row), `gap: 6`, `lift` 3 / 6 / 5 (character / fire / chest). The camp draws the mage's idle sheet through `SCENE_MAGES` and the fire through `SCENE_FIRE.picture`; no second copy, the view names no file or archetype.
- View: `campDrawing(state)` (pure) gives the clearing, fire, chest and the characters of Siedziba (neither `state.run.character.id` nor a key of `state.loops`; a character whose loop was stopped is in Siedziba), in the order of creation, at most `campCapacity()` = floor((672/2 − 32/2 − 6)/32) = 9. `Camp` (React) draws them. `headquarters.tsx` gets `runCharacter` in its `Drawn` record, so the screen redraws at every change of the manual run (the primitive, not the whole `run`, so a game minute still draws nothing).
- Layout: the band is a flex row, `.camp-team` and `.camp-stores` each `flex: 1 1 0`, the fire between them, so the fire is at the exact middle of the band. The characters are cells in a `row-reverse wrap` line in a box of one line's height with hidden overflow: the cells that do not fit wrap to a line that is never seen, so the band shows whole characters from the first, no window measuring, no listener, no JavaScript at a resize. Every size is a number of picture pixels times `PICTURE_PIXEL` put in the element's style by TypeScript; the camp's CSS holds no length.
- Motion: the camp's selectors (`.camp-member img`, `.camp-fire img`) were added to the scene's rule that runs the frames at 160 ms, inside the `prefers-reduced-motion: no-preference` block, so the beat is the scene's constant and under reduced motion the frames stand. The fire always burns (it reads no campfire of the state).
- A picture: `aria-hidden="true"` on the band, `alt=""` on every image, no handler, no tabindex, no text.
- Foundation: **D-272** binding sentence as projected (*Origin* `none`, other fields and *Rationale*/*Rejected* kept as they were); **D-271** binding sentence, *Verification* and *Rationale*/*Rejected* take the camp's pictures and the one still chest (*Based on* unchanged, `pixel-crawler-terms`); **D-389** new, one entry, `row 1`; **`loop2-container-sprites`** sentence "every file the scene's drawing or the camp's drawing asks for", *Derives from* gains D-389, `row 2`. `foundation_check.py` 0 errors.
- Styleguide: new rule „The camp of Siedziba” beside „The scene of a map run”; the token rule gains the camp's geometry in the exempt list and one paragraph, and D-389 in its *Decision*. No new role, token value or role meaning.

### The new decision D-389: Relations, Scope, Verification and why

- *Scope* `browser-view` alone: the decision binds how the screen looks and behaves; the numbers it keeps in the game's data are not part of what it binds (D-316 names `simulation` because it also binds the data; this one does not).
- *Relations* `derives from` D-54 (the order), D-272 (where a picture may stand; the band), D-280 (the width of the content), D-314 and D-315 (the clearing from the same pictures, full light), D-316 and D-317 (motion by CSS at the fixed beat, reduced motion, no flash), D-321 (a picture, not a control), D-349 (twice the pixels, crop and no scaling). Each is a higher decision the binding sentences serve; none is narrowed.
- *Verification* `invariants: loop2-container-sprites` (the camp's files are served) and a pair complies/violates for what no test checks (the layout, the width behaviour, motion).
- *Based on* `none` (the pack's terms stay in D-271's *Based on*), *Origin* `none`.
- One sentence of meaning, English: the camp is a 96 px picture band over Siedziba's panel showing the fire, the chest and the characters that are in Siedziba, as many whole ones as the window holds, a picture that moves like the scene and takes no click. Po polsku: obóz to pas obrazka o wysokości około 96 px nad panelem Siedziby, z ogniskiem, skrzynką i postaciami, które są w Siedzibie, tyle całych, ile mieści okno; porusza się jak scena i nie bierze kliknięcia.
- The number D-389 is the next free one on the base; another task that writes a decision on the same base would take the same number.

## Pictures from the pack (trust boundary `assets/sprites/**`)

- Each new file is a PNG holding pixels alone: chunks `IHDR`, `IDAT`, `IEND` only (`.runs/camp-work/verify.log`, script `.runs/camp-work/tools/verify_assets.py`, run as `python -I`).
- Pixel provenance, compared pixel by pixel against the pack's own sheets (inputs copied into their own empty directories under `.runs/camp-work/pack/` and `in/`, scripts elsewhere, paths passed as arguments): `chest.png` equals the sheet rectangle (179, 75, 26, 21), 0 of 546 RGBA pixels differ; `camp-clearing.png` equals the composition rebuilt from the sheets alone (snow tile and each piece cut at the offset an exact-match search found it at: pine_low and pine_low2 in Trees/Model_02/Size_02 at 3,1 and 67,1; sap_bare 144,34, sap_snow 208,32, tree_bare 161,17, tree_snow 225,18 in Trees/Model_01/Size_02), 0 of 32256 pixels differ. The search found each cut picture of the old game in exactly one place of the pack; the "pack" read here is the copy in the human's old repository (the foundation's fact cites the itch.io page, not that copy), so "the pack's sheets" means that copy.
- Build copies and serving: `npm run build` copies both files; started with `npm run local`, `GET /sprites/chest.png` and `GET /sprites/camp-clearing.png` answered 200 and the bytes' sha256 equal the file in `assets/sprites/` and in `dist/public/sprites/` (three identical hashes each).
- No credit row: `pixel-crawler-terms` says no credit is asked and `sprite-credits` binds only packs whose licence asks for one, so „Autorzy grafiki” is unchanged.
- No refusal test (D-273): a further PNG does not change the boundary.

## Checks run (command and exit code)

| Command | Exit | Result |
|---|---|---|
| `npm run typecheck` | 0 | |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors (also after each foundation edit; `--skip-test-citations` once, right after the first entry) |
| `npm test -- tests/view/camp-picture.test.mjs` | 0 | 7 pass |
| `npm test -- tests/view/headquarters-screen.test.mjs` | 0 | 22 pass |
| `npm test -- tests/view/scene-picture.test.mjs` | 0 | 69 pass |
| `npm test -- tests/view/scene.test.mjs` | 0 | 71 pass |
| `npm test -- tests/view/world-area.test.mjs` | 0 | 22 pass |
| `npm test -- tests/view/run-screen.test.mjs` | 0 | 20 pass |
| `npm test -- tests/view/page-document.test.mjs` | 0 | 56 pass |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 | |
| `npm test -- tests/invariants/test_design_token_contrast.py` | 0 | |
| `npm test -- tests/invariants/test_design_token_sources.py` | 0 | |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 | |
| `npm test -- tests/invariants/test_application_build_output.py` | 0 | |
| `npm test -- tests/invariants/test_application_package_layout.py` | 0 | |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | ESLint, Prettier, Ruff on the changed files |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | the new test file is in the gate's selection |
| `npm test -- tests/invariants/test_loop2_container_sprites.py` | 1 | **not run**: "No test executed" — it skips with no Docker daemon (the daemon's pipe does not exist on this computer). `loop2-container-sprites` has no `pass` from this cycle; the container's serving of the new files is unchecked by that test. The nearest evidence is the local server's answer above. |

The full `npm test` was not run, as the handoff says.

### Failing runs (each test seen failing for the break it names, then restored; commands with exit codes, `.runs/camp-work/mutate.log`)

Each break was one line of the committed code, applied, the file's test run, and the file restored with `git checkout`; the tree was clean after (0 changed files). The tests were written after the code, so these breaks are the failing runs.

| Break | Command | Exit | Failing case |
|---|---|---|---|
| `runCharacter` left out of the screen's redraw comparison | `npm test -- tests/view/headquarters-screen.test.mjs` | 1 | the camp follows the manual map run and the earning loops |
| the run's character left in the camp | `npm test -- tests/view/camp-picture.test.mjs` | 1 | three cases (empty, only Siedziba, run states) |
| the loop's character left in the camp | same | 1 | only the characters in Siedziba stand in the camp |
| the capacity forgets the gap (10, not 9) | same | 1 | as many characters as the widest band holds |
| no cut at the capacity | same | 1 | the same case |
| `aria-hidden` removed | `npm test -- tests/view/headquarters-screen.test.mjs` | 1 | the camp is a picture |
| `PICTURE_PIXEL = 3` | same | 1 | the camp is drawn at twice the pixels |
| the chest's file name pointing at no file | `npm test -- tests/view/scene-picture.test.mjs` | 1 | every file the scene's and the camp's data name (invariant `loop2-container-sprites`) |
| the same case with `assets/sprites/chest.png` moved away, then restored | same | 1, then 0 | "chest.png is not in assets/sprites/" |

### Changed invariant test

`tests/view/scene-picture.test.mjs`, the case cited `invariant: loop2-container-sprites`: renamed to "every file the scene's and the camp's data name stands directly in assets/sprites/ as a .png file", now also takes the addresses `campDrawing` asks for (a team of one) and `CAMP`'s two files. `tests/invariants/test_loop2_container_sprites.py`: only the docstring (sentence, reading, the name of that case, what it does not cover); the set it checks (every PNG directly in `assets/sprites/`) already covers the new files.

## Own-work check (section 3 and `ui_check.md`)

The requirement the work most likely does not meet: **"in a narrower window the band crops the picture at the sides with the campfire in the middle and never scales it down; the band shows as many whole characters as it holds"** — that is layout, which jsdom cannot show (D-88), and the first, equal-sized-pixels requirement of D-349 at an odd window width.

Checked in the running game (Playwright CLI, one session of its own, closed at the end; `npm run local` stopped), 12 characters in Siedziba, probe of `getBoundingClientRect`:

| Window | Band | Fire centre minus band centre | Whole characters in the row | Characters in the DOM |
|---|---|---|---|---|
| 1400 | 1344 × 96 | 0 | 9 | 9 (team of 12) |
| 1000 | 968 | 0 | 6 | 9 |
| 700 | 668 | 0 | 4 | 9 |
| 500 | 468 | 0 | 2 | 9 |
| 400 | 368 | 0 | 2 | 9 |
| 360 | 328 | 0 | 1 | 9 |

The number of whole characters equals floor((half-band − half-fire − gap)/64 px) at each width; a cell that does not fit wraps below the band's bottom edge (`y` = band top + 96) and is clipped. At 321 px (odd, the band 289 wide) the fire stands at a half pixel. Equal pixels: in a screenshot of the band, at 1400 and at 1399 (odd) every 2 × 2 block of the picture is one colour (30 912 of 30 912 blocks at the right offset, share 1.000, the other offsets 0.54 to 0.74), and at 321 (odd, fractional offset) 6624 of 6624 (1.000), so no pixel is unequal.

Also checked in the game: the camp shows 3, then 2 after „Wejdź” for the second character (the screen Siedziba still lists all three names), then 3 after „Zakończ” and a return to Siedziba; the page's sentence stands above the band; a click on the band and a Tab afterwards reached no control of it (the next stop was the first name in „Drużyna”); the console held only the ordinary 401 and favicon 404 entries. „Puść w pętlę” and „Zatrzymaj” were checked in the test with `loops` / `stoppedLoops` only: „Puść w pętlę” stands at a solved map, which a new game has not reached, and composing a state was not worth it for a reading that the test already pins.

**Motion over time (in words, no image):** a sampling every 20 ms of the computed `translate` of the fire's and a character's picture over 1.7 s showed the frame offset moving −25 %, −50 %, −75 %, 0 % in steps about 160 ms apart (a 640 ms loop of four frames) for both, while the chest and the clearing never changed; `document.getAnimations()` listed 10 running animations of 640 ms for 9 characters and the fire. With `page.emulateMedia({reducedMotion: 'reduce'})` the same sampling saw one value (`none`, the first frame) for the fire and a character, and 0 animations. Nothing flashes: only the frame of a figure of about 64 × 96 CSS px changes at a time, against a threshold of 21 824 px of D-317.

**The states the styleguide requires of a changed component:** the camp adds no shared control and no role, so the states of shared controls do not apply (the camp has no control). The kitchen-sink page is not touched (D-45, no game state on it).

**Screenshots:** inspected; they are not pushed to `mariusznazar/screenshots`. They lie in `the author's ignored directory of screenshots (pushed to the screenshots repository, branch loop2/oboz-w-siedzibie)/` (git-ignored): `camp-no-characters-1400.png` (new game, the fire and the chest alone), `camp-four-characters-1400.png`, `camp-three-characters-700.png`, `camp-three-characters-400.png` (two of three characters), `camp-under-page-sentence-1000.png` (the page's sentence above the band). They show only made-up accounts at `example.test`. D-357 and D-358 settle `mariusznazar/screenshots`, branch `loop2/oboz-w-siedzibie`; the push is an outside write that the handoff did not order, so I left it to the orchestrator (the files are ready).

## Choices I made (each with the way rejected and its cost if wrong)

1. **The band is a sibling above the panel, not inside it.** Rejected: inside `.headquarters`. Cost if wrong: the band would be 34 px narrower than the content and stand inside the panel's padding, and the existing tests that count the panel's sections would see it; moving it is one element.
2. **The layout: fire at the exact middle, chest to its right, characters in one row to its left growing outward.** Rejected: characters on both sides alternately — the chest takes room on one side, so the visible set would stop being a prefix of the creation order when the sides hold different counts. Cost if wrong: a one-sided camp looks lopsided with few characters; the human judges on the screenshot.
3. **Whole characters by CSS wrapping and hidden overflow.** Rejected: measuring the band with a `ResizeObserver` and cutting the list in React — a listener and a layout read that jsdom cannot show. Cost: the camp's DOM holds up to 9 characters of which a narrow window hides some; "as many as fit" is checked in the browser and not by a test.
4. **The DOM cap = the capacity of the widest band (9), derived from the data.** Rejected: one element per character of a team that has no limit. Cost: none visible, since no band holds more.
5. **The data in `scene.ts`, the mage's idle sheet and the fire taken from `SCENE_MAGES` and `SCENE_FIRE`.** Rejected: a new data file `camp.ts`, and copies of the two sheets' rows. Cost: `scene.ts` now holds the camp's rows too; a future archetype with its own camp pose needs a camp row then.
6. **`PICTURE_PIXEL` shared with the scene** (the scene's `672 × 304` is now `SCENE.background × PICTURE_PIXEL`). Rejected: a second `2` for the camp. Cost: a touch of `world-area.tsx`, covered by its existing tests and by the scene tests.
7. **One redraw key, the character of the run, not the whole `run`.** Rejected: comparing `state.run`, which changes every game minute and would redraw the hidden screen five times a second.
8. **No stagger of the idle frames between characters.** Rejected: a negative `animation-delay` per character (a second copy of the 160 ms beat in the stylesheet). Cost: all characters breathe in the same frame, which looks mechanical.
9. **The clearing's recipe** (snow plus 14 pines, saplings and trees, bases 16–21 rows from the top) and the numbers `cell` 32, `gap` 6, `lift` 3 / 6 / 5, `PICTURE_PIXEL` 2 were chosen by viewing the result; rejected: bare snow (the "same pictures as the forest" of the task would be only the ground), and the tall pines of 76 rows (almost all cropped by a 48-row band). Cost if wrong: re-compose the picture or change a number; the task carries both as questions the human judges on the screenshot.
10. **The chest's bounds are 26 × 21 from the pixels**, not the 27 × 22 of the eye; the cut contains no pixel of another object.
11. **Scope of D-389: `browser-view`; D-272's *Verification* left as it is** (the task says the waiting fields stay); the glossary gains no entry for „camp” (an ordinary word, used in its ordinary meaning).
12. **README line added** (it lists where each sprite of the pack is used; leaving it would make it untrue). Not named in the handoff.
13. **Screenshots not pushed** (see above).

## Reaches beyond the handoff

- `README.md` (the sentence about the pack's pictures, edited).
- `src/browser/view/scene.tsx` (one word: `Sheet` exported, the camp reuses it) and `src/browser/view/world-area.tsx` (uses `PICTURE_PIXEL` and `SCENE`).
- `tests/invariants/test_loop2_container_sprites.py` (docstring).
- `guidelines/coding-browser-module.md`: its table "Files of this kind" has no row for the two new view files (`camp.tsx`, `camp-picture.ts`); I did not edit it (the handoff names only the styleguide part and that file's table goes through `the-way-maintain-coding-guidelines`). The part map needs no change: `src/browser/view/**` and `assets/sprites/**` already claim the new files (`foundation_check.py` reports 0 errors).
- `decisions.md` D-44 and D-322 were read for the references D-389 makes; `part_map.md` was read for the files' parts.

## Unread material

- Decisions the handoff names "as they bear on the scene": **not read** D-363, D-365, D-368, D-369, D-370, D-371 (action costs, the flying icon, the end-of-run window; none touches the camp). D-318, D-319, D-320, D-362, D-364, D-366, D-367, D-372, D-373 were read whole.
- The other decisions whose *Scope* names `browser-view`, `simulation`, `deployment`, `agent-workflow` or `product-foundation` (reading step 2 of "Reading the foundation"): **read only those the handoff and the task name and those the search met** (D-18, D-36, D-44, D-53 by quotation, D-87, D-88, D-325, D-329, D-330). I did not read the whole set by scope; in particular not D-39 to D-41, D-47, D-48 (the roles and tokens: the camp adds none), D-122, D-132, D-217 to D-219, D-243 to D-245, nor the decisions of `deployment` and `agent-workflow` other than D-357 and D-358.
- Facts: only `pixel-crawler-terms` was read; `lpc-wolf-licence`, `smoke-fire-particle-licence`, `cc-by-3-adaptation-credit` and `cc-by-3-licence-copy` (D-271's other sources) were not, since no pack or licence changes.
- Part map: read the entries of `browser-view` and `simulation` and the head of `account-server`; not `deployment`, `build-tools`, `agent-workflow`, `product-foundation`, `test-helpers`.
- Glossary: only `headquarters`.
- `guidelines/coding-simulation-module.md`: not read (no non-data module of `src/browser/sim/` changed).
- Skills: `the-way-record-decision` (SKILL, `read.md`, `decide_entry.md`, template), `the-way-record-invariant` (SKILL, `decide_entry.md`, `draft.md`, `write.md`, template), `rules.md`, `way_of_working.md`, `foundation_step.md`, `ui_check.md`, the styleguide skill and the template of the styleguide and of guidelines were read; `projected.md` and the refinement files of the styleguide skill (`recognize.md`, `audit.md`, `settle.md`, …) were not, since neither mode applies.
- Everything else in the handoff's lists was read whole: `guidelines/coding.md`, `coding-browser-module.md`, `coding-content-data.md`, `testing.md`, `styleguide-browser-view.md`, `src/browser/AGENTS.md`, `.claude/skills/loop2-play/SKILL.md`, the task, and the decisions D-27, D-42, D-43, D-50, D-51, D-54, D-62, D-70, D-96, D-184, D-208, D-246, D-262, D-264, D-265, D-271 to D-273, D-280, D-282, D-286, D-287, D-311, D-314 to D-317, D-321 to D-323, D-349, the six invariants, and every file I changed (`headquarters.tsx`, `scene.tsx`, `scene-picture.ts`, `world-area.tsx`, `scene.ts` whole; `styles.css` the camp's neighbourhood and every scene rule I touched or reused, not the whole 3000-line file).

## Searches not found or unclear

- The three "pack's sheets" of the handoff (`Interior_Props_01.png` and the others) were found under the old repository's copy of the pack; the cut pictures the forest was composed of lie there too, in `public/sprites/` (not named by the handoff). I used them as inputs and checked them against the pack's sheets. Not found: the script or the layout the old game used to compose `forest-scene.png`; my reconstruction of it from the cut pictures differs from the file in 797 of 51 072 pixels, so the forest's recipe is not exactly known and the camp's clearing does not claim it.
- Unclear: the handoff and the task say "about 96 px"; the data holds exactly 96 (48 × 2). The task's "27 × 22 px" chest is by eye; the pixels give 26 × 21.
- Unclear to the foundation: whether a new view file needs a row in the table of `coding-browser-module.md`; no check flags its absence.
- Not available: a Docker daemon, so the Python test of `loop2-container-sprites` was not run.

## Concerns

1. `loop2-container-sprites` has no `pass` from the Python test here (no Docker). The orchestrator's full `npm test` will skip it too unless run where Docker runs; the invariant for the two new files rests on the JS case and on the local server's answer.
2. The recipe of the clearing's composition is not in the repository (the foundation says "composed from the cut pictures"; the layout is in this report, the tools in `.runs/camp-work/`).
3. The look — layout, the clearing, the numbers — is the human's to judge on the screenshots; the screenshots are in `the author's ignored directory of screenshots (pushed to the screenshots repository, branch loop2/oboz-w-siedzibie)/`, not pushed.
4. The band touches the menu bar at its top edge (as the panels of the other screens do) and stands `--space-l` above the panel; the heading „Siedziba” stands 96 px + 16 px lower than before (the accepted cost of D-389).
