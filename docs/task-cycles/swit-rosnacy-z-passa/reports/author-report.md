# Author report — swit-rosnacy-z-passa (the whole change as the one author)

**Status:** `done with concerns` (the concerns are listed under "Concerns"; none stops the merge).

Branch `task/swit-rosnacy-z-passa`, base `7846213c25675b2c084e4587cd1ffb09316ef486`. Worktree clean after the commits.

## Commits

| Commit | Message (shortened) |
|---|---|
| `96d7b4f3` | feat: tint the light of the scene with the streak, shrink the flame of a campfire in its last 20 minutes and lay frost on the edges of the frame as the body cools |
| `38a75f0a` | docs: record where the tint of the scene's light stands and how it follows the streak, the flame in the last 20 minutes of a fire and the frost on the edges of the frame, and let CSS draw layers and specks in the scene |
| `83c8369a` | docs: say in the styleguide how the scene shows the tint of its light, the smaller flame and the frost, and where the values of the tint and the frost come from |

## Files changed (added / removed lines, from `git diff --stat 7846213c..HEAD`)

| File | + / - |
|---|---|
| `assets\sprites\fire-small.png` | new, 929 bytes |
| `...\src\browser\sim\data\scene.ts` | 45 / 1 (the smaller flame's file and its 20 minutes, `SCENE_TINT`, `SCENE_FROST`) |
| `...\src\browser\view\scene-picture.ts` | 100 / 1 (tint, frost, fire sprite, `tintShown`) |
| `...\src\browser\view\scene.tsx` | 95 / 5 (layers, tint element, frost, badge carrier) |
| `...\src\browser\styles.css` | 212 / 9 |
| `...\src\browser\tokens.css` | 9 / 0 (seven tokens, each with its `Source:`) |
| `...\tests\view\scene-picture.test.mjs` | 284 / 1 |
| `...\tests\view\scene.test.mjs` | 332 / 3 |
| `...\tests\view\scene-frost-contrast.test.mjs` | new, 58 |
| `...\foundations\decisions.md` | 215 (D-315, D-316, D-132, D-271 edited; D-372 and D-373 new) |
| `...\guidelines\styleguide-browser-view.md` | 59 (the scene rule, the exceptions paragraph of the token rule, "Every value with its source") |

## Checks (command and exit code)

All run from the worktree root; the full `npm test` was not run (the orchestrator's gate).

| Command | Exit | Result |
|---|---|---|
| `npm run typecheck` | 0 | |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |
| `npm test -- tests/view/scene.test.mjs` | 0 | 47 tests |
| `npm test -- tests/view/scene-picture.test.mjs` | 0 | 50 tests |
| `npm test -- tests/view/scene-frost-contrast.test.mjs` | 0 | 2 tests |
| `npm test -- tests/view/run-screen.test.mjs`, `world-area.test.mjs`, `end-window-game.test.mjs` | 0 each | |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | |
| `npm test -- tests/invariants/test_design_token_sources.py`, `test_design_token_contrast.py`, `test_browser_view_focus_outline.py` | 0 each | |
| `npm test -- tests/invariants/test_cross_part_imports.py`, `test_simulation_isolation.py`, `test_content_identifiers.py`, `test_application_package_layout.py` | 0 each | |
| `npm test -- tests/quality/test_node_test_selection.py`, `tests/quality/test_quality_invariants.py` | 0 each | eslint, prettier, ruff of the quality test |
| `npm test -- tests/invariants/test_application_build_output.py` | 0 | built the bundle in a copy; 7 tests (after the rename described below) |
| `npm test -- tests/invariants/test_loop2_container_sprites.py` | 0 | real `docker build` and `docker run` (about 85 s); every file of `assets/sprites/`, the new one included, is served byte for byte |

The failing run that I met and fixed: `npm test -- tests/invariants/test_application_build_output.py` failed, exit 1, in `test_the_page_loads_one_file_that_joins_the_browsers_code`: its heuristic for "a module specifier left in the bundle" (`\bfrom\s*["']`) matched the string literal `"--tint-from"` of my first name of the custom property (`from"` followed by a quote). I renamed the property to `--tint-start`; the same command then passed (7 tests, exit 0).

No test was written first for the code: the code of the tint, the frost and the layers was found by exploration in a harness page (below), and the tests were written after it. Each test was then seen failing under a deliberate break of the code, restored before the commit:

| Break | Test that failed |
|---|---|
| `lastMinutes: 20` -> `19` | "a burning fire draws the smaller flame with 20 minutes of burning left or fewer ..." |
| the hold of the tint in the pause and at a discovery removed from `tintShown` | "while time stands, in the player's pause and at a discovery, the tint shown is kept ..." |
| `requiredShare: 0.8` -> `0.9` | "the tint is the streak's share of the required streak times 0.8 ..." |
| the tint's element moved after the badge's carrier in `scene.tsx` | "the layers: the tint over everything the scene draws ..." |

A break no test catches: `Math.round` -> `Math.ceil` in the frost's thickness. The task fixes only the anchors (none at 37 °C, 8 pixels at 36 °C, 16 at 35 °C), and every anchor is a whole number, so the choice of rounding between them is not pinned; I judged that a test pinning it would check a deliberate choice, not a behaviour (the testing guidelines, "Changing an existing test").

No invariant's test changed. `sprite-file-content` stays at method `review` (D-273): a further PNG does not change the boundary, so I added no refusal test and did not cite the invariant from a test.

## Own-work check (WAY-164)

The requirement my work most likely does not meet: **"the tint leaves the brightness of the picture as it is, and the badge stays on the full `panel`, whatever the streak; the pause greys the tint and the frost with the scene; under the system's setting for reduced motion the return shows its end at once and the frames stand"** — all three are properties of the real stylesheet in a real browser, which jsdom cannot show (the testing guidelines, "Not tested on purpose"). I checked them in Chromium (chrome-headless-shell 1248, the one Playwright CLI uses):

- Brightness: mean OKLab lightness of the scene with and without the tint layer: streak 0: +0.00 %, t = 0.8: -0.38 %, full gold: -0.62 % (the preview measured at most 0.6 %).
- The badge: its background pixel in the real game at tint 0.4 and at 0.8 is `rgb(24, 24, 27)`, the `panel`, untinted.
- The pause: a paused scene with tint 0.8, frost and a small flame has no pixel with channels differing by more than 2 (204 000 pixels, 0 non-grey), so the tint and the frost are greyed with the scene.
- Reduced motion (`reducedMotion: "reduce"` in the page): after a loss of the streak the tint element has `animation-name: none` and `--tint: 0` at once, and the fire's frames have `animation-name: none`; without it the tint element runs `scene-tint-return` and the fire's `scene-frames`.
- The return in a real browser: a loss from streak 480 to 0 gave `--tint` 0.787 at 50 ms, 0.580 at 550 ms, 0.213 at 1450 ms and 0 at 2450 ms (about 2 s, linear); a loss in the pause kept 0.667 until `Wznów` and then returned over 2 s (0.650 at 50 ms, 0.317 at 1050 ms, 0 at 2250 ms).
- Contrast of the frost's outline `#3c7289` against the snow as the browser mixes it, sampled from screenshots of the real scene: t = 0: `#bacfd0` 3.26; t = 0.4: `#c2cebe` 3.25; t = 0.8: `#d4caa6` 3.23; t = 1: `#ddc69f` 3.19; and the task's untinted `#bccae5` 3.21. All reach 3:1; the test `tests/view/scene-frost-contrast.test.mjs` keeps this against a token change.
- The real game (`npm run local`, Playwright CLI): a composed state of Las with streak, temperature and fire set; no console errors; the screens below.

### Screenshots of the check (the route of D-357 and D-358)

Pushed to `mariusznazar/screenshots`, directory `loop2/swit-rosnacy-z-passa`, branch `loop2/swit-rosnacy-z-passa`, commit `f61c319d91814070745e78ed04cfe6390ccce118`. Each shows only the made-up account of the start. Links for the request:

- Full flame and smaller flame side by side, enlarged 4x from the real scene (the one the acceptance criterion is about): `![The full flame and the smaller flame of the campfire, enlarged](https://github.com/mariusznazar/screenshots/blob/f61c319d91814070745e78ed04cfe6390ccce118/loop2/swit-rosnacy-z-passa/01-flame-full-and-smaller.png?raw=true)`
- The screen of a map run with the smaller flame (campfire with 15 minutes left, streak 242 of 480): `![The screen of a map run with the smaller flame](https://github.com/mariusznazar/screenshots/blob/f61c319d91814070745e78ed04cfe6390ccce118/loop2/swit-rosnacy-z-passa/02-screen-smaller-flame.png?raw=true)`
- The scene at streak 0, the cool tint, the full flame: `![The scene at streak 0](https://github.com/mariusznazar/screenshots/blob/f61c319d91814070745e78ed04cfe6390ccce118/loop2/swit-rosnacy-z-passa/03-scene-streak-0-cool-tint.png?raw=true)`
- The scene at streak 242, tint 0.4, the smaller flame: `![The scene at streak 242](https://github.com/mariusznazar/screenshots/blob/f61c319d91814070745e78ed04cfe6390ccce118/loop2/swit-rosnacy-z-passa/04-scene-streak-242-smaller-flame.png?raw=true)`
- The scene with frost at 35.9 °C (9 pixels), streak 372: `![The scene with frost at 35.9 degrees](https://github.com/mariusznazar/screenshots/blob/f61c319d91814070745e78ed04cfe6390ccce118/loop2/swit-rosnacy-z-passa/05-scene-frost-35-9C-streak-372.png?raw=true)`
- The scene with the full frost (35.0 °C), streak 480, tint 0.8: `![The scene with the full frost](https://github.com/mariusznazar/screenshots/blob/f61c319d91814070745e78ed04cfe6390ccce118/loop2/swit-rosnacy-z-passa/06-scene-frost-full-streak-480.png?raw=true)`
- The scene after the completion of Las, full gold, under the window that "✕" uncovered: `![The scene after a completion](https://github.com/mariusznazar/screenshots/blob/f61c319d91814070745e78ed04cfe6390ccce118/loop2/swit-rosnacy-z-passa/07-scene-completion-full-gold.png?raw=true)`

Motion is described in words, not shown: the return of the tint runs 2 s, linear, as measured above; the frames of the fire run at the same beat of 160 ms before and after the flame turns small (the same element, only its picture changes; a test keeps it).

## The trust boundary `assets/sprites/**` (how the file was made and checked)

`fire-small.png` was made by a script kept outside the repository (`.runs/flame/make_small_fire.py`, ignored by git): it reads `assets/sprites/fire.png` (128 x 32, four frames of 32 x 32), and in each frame turns every pixel of one of the five flame colours of that file (`rgb(124,9,12)`, `(178,24,24)`, `(222,83,37)`, `(40,22,19)`, `(76,44,28)`) that lies outside a kept region into the opaque black the pit already has, and saves with Pillow, no other change. The kept region is row 16 and 17, columns 13 to 20, and row 18, columns 12 to 21 of each frame, so the fan loses its outer rays and its two top rows and keeps a tongue narrower at its top than at its foot. Stones and logs are untouched.

Checks of its content, run by me: the chunks are `IHDR`, `IDAT`, `IEND` only (no text, no profile, no metadata); RGBA 8-bit, 128 x 32; the set of colours is a subset of the colours of `fire.png` (no new colour); 96 pixels differ from `fire.png`, every one a flame-coloured pixel of `fire.png` that became opaque black; the flame pixels per frame went from 44 to 20; the build copies it as `dist/public/sprites/fire-small.png`, and the container test served it byte for byte. The same checks stay as a test (`tests/view/scene-picture.test.mjs`, "the smaller flame's file holds pixels alone ...") with a PNG reader of its own in the test (zlib and the five filters), whose expectations are literals, not computed by the product. Mariusz judges the look at the request (the screenshots above).

## Foundation entries (WAY-134: each with one sentence in English and one in Polish, and its mark)

| Entry | Mark | Meaning in English | Znaczenie po polsku |
|---|---|---|---|
| D-315 (title now "Where does the tint of the scene's light stand?") | `row 1` and `projected` (whole) | The tint of the scene's light is a layer over the background in full light, over everything the scene draws but the badge over the mage's head and the frost, which lies over it. | Odcień światła sceny to warstwa nad tłem w pełnym świetle, nad wszystkim, co scena rysuje, poza plakietką nad głową maga i szronem, który leży nad nią. |
| D-316 (the tint sentence, Rationale, Rejected) | `rows 2 and 3` (tied to it, no second entry) and `projected` (the part) | The tint goes evenly with the streak to a trace of 20 % of the cool tint at the required streak, is full gold only at a completion, returns over 2 s after a loss (from `Wznów` after a loss in the pause), and stands at once at a death, a completion, a start, `Restart` and a load. | Odcień idzie równo z passą do śladu chłodu 20 % przy passie wymaganej, pełne złoto daje tylko rozwiązanie, utrata passy przywraca chłód w 2 s (w pauzie od „Wznów”), a przy śmierci, rozwiązaniu, starcie, „Restart” i wczytaniu odcień stoi od razu. |
| D-132 (the light in full gold added) | `projected` (whole; its window part was already merged by task 16) | After a completion the light of the scene stands in full gold, under the end-of-run window and in sight again when "✕" uncovers the screen. | Po rozwiązaniu światło sceny stoi w pełnym złocie, pod oknem końca przejścia, a „✕” je odsłania. |
| D-271 (the sentence of rule D with its condition) | `rows 5 and 7` and `projected` (the part) | CSS may draw layers and specks of one-pixel squares on the scene's grid in the packs' palettes, whatever has a drawing comes from a pack, and the frost's outline stands out from the snow by 3:1. | CSS rysuje warstwy i drobinki z kwadratów piksela sceny w paletach paczek, wszystko z rysunkiem pochodzi z paczki, a obrys szronu odcina się od śniegu co najmniej 3:1. |
| D-372 (new) | `row 4` | The frost on the edges of the frame is none at 37 °C, half at 36 °C, 16 scene pixels at 35 °C and below, and warming takes it back. | Szron na brzegach kadru: brak przy 37 °C, połowa przy 36 °C, 16 pikseli przy 35 °C i niżej, a ogrzanie go cofa. |
| D-373 (new) | `row 6` | A burning campfire shows its full flame with more than 20 minutes left and a smaller, hand-cut flame in its last 20 minutes. | Płonące ognisko ma pełny płomień przy ponad 20 minutach palenia i ręcznie zmniejszony w ostatnich 20. |

The numbers D-372 and D-373 are the next free numbers of the log at this base; another task branch may take them too, which the merge would show.

The styleguide (`guidelines/styleguide-browser-view.md`) was changed by the template of `the-way-maintain-styleguide` (`.the-way/product-guidelines/styleguide/template.md`, "Writing the file"), not by its refinement steps, which the skill assigns to a task's refinement: its meanings are from the decisions above, its values from the task's To do, and it holds no value. No glossary entry and no part map entry changed.

## Choices (each with the way rejected and its cost if wrong)

The four *Questions carried to cycle*:

1. **How the state reaches the stylesheet.** The view gives numbers only: `--tint` (rounded to four decimals), and for the frost `--frost` (whole scene pixels), `--pixel-x` and `--pixel-y` (one scene pixel as a percentage of the frame); colours and opacities come from the seven tokens. The registered number property `--tint` (`@property`) lets CSS animate the return, so the formula of the colour and the opacity stands once. Rejected: a keyframe that repeats the formula with `--tint-start` (two copies of the formula); building the colour or the opacity in TypeScript (D-43). Cost if wrong: a browser without `@property` (before 2024 for Firefox) flips the tint at half of the return instead of fading, and nothing else breaks.
2. **Layer order.** The badge is no longer inside the mage's element; its own element, `.scene-badge-carrier`, has the mage's box and runs the same walk (the two elements are created together on each walk, so their animations start together). Order from the bottom: forest, props, fire, dust, mage, tint, frost, flying icon's plaque, badge carrier. Rejected: a `z-index` on the badge inside the mage's element (the mage's element is a stacking context while its `translate` animates, so the badge would stay trapped under the tint during every walk). Cost if wrong: two elements hold the walk; a change to the walk's rules must name both (the CSS names both selectors, and a test keeps their boxes and walks equal).
3. **The ragged edge of the frost.** Per edge: a solid band two pixels thinner than the frost, a row of teeth one pixel deeper on 3 of every 5 pixels and a row two pixels deeper on 2 of every 7 (other periods on the sides); crystals are single squares in two lattices of different periods, only in the fill; the rim, in the outline colour, has the whole thickness and the fill lies over it one pixel thinner, so the outline is the pixel the fill leaves under each column's inner edge. Built of `mask` layers on four plain elements. Rejected: a `clip-path: polygon` of hundreds of vertices (kilobytes of generated CSS); a box-shadow ring (a straight edge, no ragged edge); a canvas or an SVG (not CSS, D-271's rule D). Cost if wrong: the outline is the bottom pixel of each column and does not run up the vertical walls of the teeth; at thickness 1 to 2 the frost is the outline alone (dark teal specks, as seen in the harness); at the corners the bands of two edges overlap; `mask` and `mask-composite` need a browser of 2023 or later.
4. **Contrast of the outline at full gold.** Measured 3.19:1 at t = 1 (above), kept by a test. No change to the colour chosen by Mariusz was needed.

Other choices:

- **The plaque of the flying icon (D-365) lies over the tint**, like the badge (both are a solid `panel` with an icon in `text-strong`); row 1 names only the badge. Rejected: the plaque under the tint (its `panel` would take a hue and the icon's contrast, set by D-320's reasoning for the badge, would no longer hold). Cost if wrong: one reorder of the DOM and a test.
- **The tint also stands still at a discovery**, not only in the player's pause (row 3 names the pause): a return is "motion of the scene" and D-322 stops all motion at a discovery. Rejected: letting it return while the discovery holds time. Cost if wrong: a loss that coincides with a discovery shows its return at `Wznów` instead of during the discovery.
- **The tint is 0 before a completion on a map whose condition asks for no streak** (none exists; question 4 leaves it to the task that adds one). It is stated in the comment of the code only, not in the decision or the styleguide.
- **"The last 20 minutes" is `minutesLeft <= 20`** (a fire with 20 left shows the smaller flame, with 21 the full). Rejected: `< 20`. Cost if wrong: one minute of the smaller flame earlier or later.
- **The frost's thickness is `Math.round` of the cold's share times 16**; none at exactly 37 °C. Rejected: `Math.ceil` (a pixel of frost the moment the body leaves 37 °C). Not pinned by a test (above).
- **`requiredShare: 0.8` stands in the scene's data** (`SCENE_TINT`), the frost's start and full temperatures are read from `BALANCE` (`startTemperature`, `chilledBelow`), so the scene cannot drift from the balance data.
- **The tint's return is a new element of the layer** (a new `key`) that starts at the tint shown, as a walk starts on a new element; when the animation ends the state forgets the return, so a scene hidden and shown again does not run it again. A return that is running is kept when the streak grows or falls again (no jump).
- **The size of the smaller flame**: 20 of 44 flame pixels per frame remain (the first cut I tried kept 24; I chose the smaller of the two looks after viewing both at the scene's size).

## Reaches beyond the dispatch (section 1 of the method)

- `the preview folder of the task's refinement, outside the repository`, `b-szron-FA.png`, `skrypty\gen.py` (lines 160 to 250): the task names this folder as the source of Mariusz's choice; I read it to see how the frost FA and the tint were drawn and what the preview measured. Why: the handoff did not list it, and the shape of the ragged edge is a question carried to the cycle.
- `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `projected.md`, `.the-way/elements/decisions/template.md`, `.the-way/elements/common/way_of_working.md`, `rules.md`, and `.the-way/product-guidelines/styleguide/SKILL.md`, `template.md`: the skills of the foundation step and of the styleguide, named by the handoff and by the method's section 1. `.the-way/task-cycle/change/ui_check.md`: named by section 3.
- `tests/invariants/test_browser_view_token_values.py` (lines 1 to 200) and `test_application_build_output.py`, `tests/quality`'s gate patterns in `scripts/test.py`: to know what the token invariant flags in a stylesheet (`px` in non-layout properties, colours as hexadecimals and named colours, unitless opacity) and to understand the failure of the bundle test.
- `foundations/decisions.md`: D-368 to D-371 (to match the end-of-run window already merged), D-320 (its tail), D-321, D-322 and D-357, D-358 whole (the screenshot route); `foundations/invariants.md`: `browser-view-token-values`, `browser-view-focus-outline`, `design-token-contrast`, `design-token-sources`, `sprite-file-content`, `loop2-container-sprites`.
- `.claude/skills/loop2-play/SKILL.md`, `compose-state.mjs`: named by the handoff.
- the author's global rules for scripts and for commits: the global rules for scripts and commits.

## Unread material

- Decisions named by the handoff that I did not read whole (I read what the task document quotes of them, and I read whole only D-132, D-271, D-315, D-316, D-317, D-321, D-322, D-357, D-358 and the neighbours listed above): D-38, D-39, D-42, D-43, D-48, D-68, D-69, D-70, D-122, D-131, D-133, D-250, D-272, D-273, D-311, D-314, D-318, D-319, D-320 (read from its Verification on), D-341, D-349, D-364, D-366, D-367. The invariants `browser-view-token-values` and the others were read whole; `sprite-credits` was not read.
- Glossary entries `streak`, `completion`, `extinguished campfire` and the part map entries of the four parts: not read (I used the wording the task quotes).
- Source code: `src/browser/sim/body.ts` not read (the temperature's rule is taken from the task's quote and from `balance.ts`, read); `src/browser/sim/types.ts` read only from line 194 to 330; `src/browser/view/run-screen.tsx` and `src/browser/sim/data/items.ts` not read (the 20 minutes of a stick are from the task's quote of `items.ts:35`; I did not open the line); `tests/view/scene.test.mjs` read to line 900 and from the helpers I needed, the rest by search.
- `guidelines/testing.md`: read whole. `guidelines/coding.md`, `coding-browser-module.md`, `coding-content-data.md` and `styleguide-browser-view.md`: read whole.

## Searches not found or unclear

- The task's item 7 says D-132 is written "w całości" with the place that task 16 settled; the D-132 of this base already names the end-of-run window (task 16 merged), so I added only what this task makes true (the light in full gold). If the intent was a wider rewrite, it is not done.
- The task says the *Origin* of the entries about the tint names this task's document, and the pinned template of decisions says a task document is never named in *Origin* (WAY-27); the existing entries (D-368 and others) name task documents. I followed the task and the existing entries.
- Row 1 does not say where the plaque of the flying icon stands (chosen above) and says "the wolf", which the scene does not draw yet (task 20).
- Where the dead mage's grey (`grayscale(1) brightness(0.55)` on the mage's sprite) lies relative to the tint: it is under the tint, so the dead mage takes the hue of the layer in its opacity (the task's Context says so); not shown in a screenshot.
- The *Questions carried to cycle* ask for a ragged edge "from squares of one pixel"; the shape is described in the styleguide as the cycle's choice, and the human has not seen it before the request.
- No test for the real rendering of the frost's shape exists (jsdom draws no masks); the check is the screenshots above.

## Concerns (for the orchestrator and the review)

- The frost is built of `mask` layers whose lengths are percentages of the frame (`--pixel-x`, `--pixel-y`, six decimals), exact at the scene's one size of 672 x 304 px at device pixel ratio 1 (seen in Chromium at 1x and 3x). At a device pixel ratio that is not a whole number the hard stops of the gradients may land on a fraction of a pixel; I did not see it.
- The outline of the frost at its first one or two pixels is the outline alone (dark teal specks); Mariusz may want the first steps lighter.
- The tint's return depends on `@property`; see choice 1.
- D-372 and D-373 may collide with the numbers of another branch.
