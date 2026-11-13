PASS 07fd0de35e07ea03bb4e8e706ce221f54be0b801

# Review 1 — the whole change, task oboz-w-siedzibie

Range: `2b4d760c517a8b399b2d9b80f77531455e32d11c..07fd0de35e07ea03bb4e8e706ce221f54be0b801`, four commits
(`e05f7b2b`, `10ba53b6`, `68fe6248`, `07fd0de3`), 17 files, +799 −85. `git rev-parse HEAD` in the
reviewed worktree gave the head given. Variant: the whole change, one author, no plan, no slices, no spec.

Counts: blocking 0 · Minor 4 (all within the task) · out of scope 0 findings, 3 lines of Declined to judge.

## Findings

### Critical

none

### Important

none

### Minor (all four lie within the task)

**M1 — The layout the human is still to judge is written into the foundation and the styleguide as the
expected one.** `foundations/decisions.md:9518` (D-389 *Verification*, complies: "the fire in the middle
… the chest to its right and the characters of Siedziba to its left"), `guidelines/styleguide-browser-view.md:792`
(*Good* of "The camp of Siedziba") and `:803-806` (the rule's body: "skrzynki po jego prawej … postaci
po jego lewej"), and the comment of `src/browser/sim/data/scene.ts:307-322`. The task leaves the
composition of the camp to Mariusz on the screenshot at the request (Q3: "Dokładną kompozycję i wysokość
Mariusz ocenia na zrzucie przy prośbie o scalenie"; *Questions carried to cycle*, first item), and
settlement row 1 says nothing of where the chest and the characters stand. Nothing here is false today,
and the binding sentence of D-389 does not fix the sides, so this is no departure from an entry; but
accepting the screenshot now also accepts these three texts, and a changed composition at the request
has to change all of them, the styleguide rule included. Evidence: the task's Q3 and row 1 against
the three places quoted. Suggest the orchestrator says so beside the screenshot in the request.

**M2 — D-271's title no longer names what the entry answers.** `foundations/decisions.md:6153`, "D-271 —
Where do the scene's pictures come from?", while its binding text now also settles the pictures of the
camp at the top of Siedziba (`:6159-6161`). A reader who scans the log by title for where the camp's
pictures come from passes D-271 by (this review found it through the task, not the title). Evidence:
the title against the added sentence. Whether a title may change is the record-decision skill's to
say; if it may, "Where do the pictures of the scene and of the camp come from?" or similar.

**M3 — The new styleguide rule restates D-389 and lists where the code stands.**
`guidelines/styleguide-browser-view.md:788-822`. `.the-way/product-guidelines/template.md:84-88` asks
that a rule "repeats [no] decision of the product's log" and "does not list the state of the product's
code"; the body repeats D-389 almost sentence by sentence and names `camp.tsx`, `camp-picture.ts`,
`styles.css` and `scene.ts` (`:798-801`). To do 7 asks for exactly this content ("z czego obóz się
składa, które postacie w nim stoją, gdzie stoi pas …") and the neighbouring rule "The scene of a map
run" (`:614-786`) has the same form, so the cost is only the usual one: two texts to keep in step with
D-389. Evidence: the template lines against the rule.

**M4 — No permanent case checks that the two new sprite files hold pixels alone.** `assets/sprites/chest.png`,
`assets/sprites/camp-clearing.png`. Earlier sprite additions each got such a case in
`tests/view/scene-picture.test.mjs` (the smaller flame, `:826-837`; the death sheet, `:1234`; the wolf's
files, `:1477`). D-273 and `guidelines/testing.md:171,179-186` leave the boundary to review, and this
review checked both files (chunks `IHDR`, `IDAT`, `IEND` only, see Checks), so the change keeps the
rule; the gap is that a later re-export of either file with a text or colour-profile chunk would pass
every test. Optional.

## Against the task, item by item

- **To do 1** — met. The band is the first child of `.headquarters-host`, above `.headquarters`
  (`src/browser/view/headquarters.tsx:262-264`), so it stands under the header's warning row and over the
  heading, at the full content width (`.camp { width: 100% }`, `src/browser/styles.css:1273-1280`); 96 px
  high (48 picture pixels × `PICTURE_PIXEL` 2). The clearing is drawn at 1344 × 96, centred with
  `left: 50%; translate: -50% 0` and `overflow: hidden`, never scaled (`styles.css:1282-1289`). Rebuilt
  by me pixel for pixel from the old game's snow ground and its cut trees, which are the pictures the
  forest of the scene is made of (see Checks), so "z tych samych wyciętych obrazków … z których jest las
  sceny" holds, in full light. The page's sentence stands above the band (screenshot
  `camp-under-page-sentence-1000.png`; D-286).
- **To do 2** — met. `inSiedziba` (`src/browser/view/camp-picture.ts:64-66`) leaves out the character of
  `state.run` whatever its state (going, paused, died, completed — the run object stays until „Zakończ”)
  and any key of `state.loops`; a stopped loop has no key, so that character is back. Order of
  creation, cut at `campCapacity()` = 9. The screen now redraws on a change of the run's character
  (`headquarters.tsx:326, 338-348`), and `game-view.ts` calls `headquarters.update` on every state change
  (`renderScreens`, `game-view.ts:932-933`), so „Wejdź” and „Zakończ” reach the camp; „Puść w pętlę” and
  „Zatrzymaj” already did through `loops`. „Restart” keeps the same character, so no redraw is owed.
- **To do 3** — met. The camp's two selectors join the scene's frame rule inside
  `@media (prefers-reduced-motion: no-preference)` (`styles.css:2431-2440`): same 160 ms beat, no
  timer, frames on the first under reduced motion. The fire is `SCENE_FIRE.picture`, never the state's
  campfire. Only a figure's frame changes at a time; nothing flashes.
- **To do 4** — met. `aria-hidden="true"` on the band, `alt=""` on every image, no handler, no
  tabindex, no text (`camp.tsx:74-111`; test "the camp is a picture …").
- **To do 5** — met. One still chest, 26 × 21, one frame; credits untouched; D-271 extended; the
  invariant and its test extended (below).
- **To do 6** — met. The panel's JSX only re-indents; every string and the order of the sections are
  unchanged (`headquarters.tsx:265-314` against the base), and the test "the camp stands over the panel
  … adds no text" pins that the screen's text is the panel's.
- **To do 7** — met, with M1 and M3. New rule beside "The scene of a map run"; the token rule's exempt
  list and paragraph name the camp's geometry; `tokens.css` untouched; no new role, value or meaning.
  The camp's stylesheet holds no length (`0`, `50%`, `-50%`, `var(--space-l)` only); the camp's pixel
  sizes are set from TypeScript, which D-43 counts against a token only for colours.
- **To do 8 and *Settlements to record*** — met.
  - D-272: binding sentence in the projected wording, word for word with the task's quotation; every
    other field kept as it was (`decisions.md:6253-6277`), as the task's rule for waiting fields gives.
  - Row 1 → D-389 (`decisions.md:9495-9558`): the binding text carries every part of row 1 (place,
    width, height, clearing in full light without tint at twice the pixels, crop around the fire, which
    characters, the first that fit, the list keeping all, fire and chest alone, motion, reduced motion,
    the always burning fire, a picture taking no click or key, hidden from readers). *Rejected* holds
    every way not chosen under Q1, Q2, Q3, Q4 and Q6 with its reason; *Rationale* holds the accepted
    costs. Q5 stays out of it, as row 1 says.
  - D-271 changed for the camp's pictures and the one still chest, with Q5's rejected way
    (`decisions.md:6159-6161, 6177-6179, 6199, 6229-6236`).
  - Row 2 → `loop2-container-sprites` sentence and *Derives from* (`foundations/invariants.md:1208-1216`).
  - The code does what each of these entries says (checked against the code above); no entry is
    restated more broadly than the code.
- **Changed invariant tests:** `tests/view/scene-picture.test.mjs:467-499` (case renamed and widened to the
  addresses the camp's drawing asks for and `CAMP`'s two files — a strengthening);
  `tests/invariants/test_loop2_container_sprites.py:1-35` (docstring only; its set, every PNG directly in
  `assets/sprites/`, already takes the new files).

## The author's choices the handoff asked about

- **Band as a sibling above the panel** — right: inside the panel it would be narrower than the content
  and stand in the panel's padding, against "na całą szerokość treści".
- **Fire at the exact middle, chest right, characters wrapping with hidden overflow** — works as the task
  asks: `.camp-team` and `.camp-stores` are `flex: 1 1 0` around a fixed fire; the row is
  `row-reverse wrap` in a box one line high with `overflow: hidden`, so the band shows whole cells, the
  first in creation order nearest the fire. A wrapped cell's sprite reaches 32 px above its cell, but the
  mage's frames are transparent above row 32 (measured), so nothing of a hidden character shows in the
  band (its top opaque pixel would sit 122 px below the band's top, the band is 96). The sides are M1.
- **DOM cap of 9** — correct: (1344 − 64)/2 − 12 = 628 px → 9 cells of 64; no band holds more.
- **`PICTURE_PIXEL` shared, touch of `world-area.tsx`** — acceptable: the scene stays 672 × 304 (D-349),
  covered by the world-area and scene tests that passed; the price is one view constant in the
  simulation's data file, which already holds the scene's picture geometry.
- **D-389 as a new number, scope `browser-view`** — the number is free on every local branch and
  remote ref (`git grep` found `### D-389` only on this branch); the binding text binds the screen,
  not the data, so `browser-view` alone fits.
- **D-272's waiting fields as they are** — as the task's rule for waiting fields gives; none is made
  untrue by the band.
- **README line** — right; it keeps the README's list of where each picture of the pack is used true.
- **No row in the file table of `guidelines/coding-browser-module.md`** — not required. The guideline
  says a file added after the table's last audit has no row and is no exemplar
  (`coding-browser-module.md:187-189`); `src/browser/view/end-question.tsx` on the base already has
  none. A row comes with an audit through `the-way-maintain-coding-guidelines`.
- **Heading „Siedziba” 112 px lower** — 96 px of band plus `--space-l` under it. Q3 accepts the heading
  moving down "o wysokość pasa"; the extra gap is the author's and is for Mariusz's eye.

## Trust boundary `assets/sprites/**`

- Both files are PNGs holding pixels alone: chunks `IHDR`, `IDAT`, `IEND` only, file ends exactly
  after `IEND`. `chest.png` 26 × 21 RGBA, `camp-clearing.png` 672 × 48 RGB.
- Pixels are the pack's pixels moved: `chest.png` equals the rectangle (179, 75, 26, 21) of the pack's
  sheet of interior props, 0 of 546 pixels differ; a magnified view shows the chest whole inside the
  rectangle and the stone block below starting on the next row. `camp-clearing.png` rebuilt from the old
  game's cut snow ground and its cut trees at the layout the author's report gives: 0 of 32 256 pixels
  differ. The cut ground equals the pack's snow tile and the bottom rows of `forest-scene.png`, 0
  differing.
- The build copies them with the same bytes (SHA-256 equal in `dist/public/sprites/`); `assets/sprites/`
  holds 18 files, all `.png`, and the build output holds the same 18.
- No refusal test owed (D-273: a further PNG does not change the boundary).

## Invariant `loop2-container-sprites` on this computer

Nothing that ran checks the container. What ran: the JS case of `tests/view/scene-picture.test.mjs` ties
every file the scene's and the camp's drawings ask for to a PNG directly in `assets/sprites/` (passed);
the build copies both files byte for byte (hash check, `test_application_build_output.py` passed). The
container's serving of them stays unchecked: no Docker daemon answers here (`docker version` cannot reach
`dockerDesktopLinuxEngine`), so `test_loop2_container_sprites.py` skips. In the full gate on this
computer, `.the-way/gate/run_tests.py` prints `skipped: …` for that case and still exits 0
(`run_tests.py:38-58`, `wasSuccessful()` counts a skip as success), so the gate passes while the
invariant stays **unchecked**; it must be reported as unchecked, never as passed.

## Declined to judge

- The look of the camp — the composition, the clearing's trees cut at the band's top, the fire's frame,
  the numbers `cell` 32, `gap` 6, `lift` 3/6/5, the exact 96 px and the 16 px under the band: the task
  leaves them to Mariusz on the screenshots (Q3, *Questions carried to cycle*).
- Pushing the screenshots to the screenshots repository (D-357, D-358): the orchestrator's step, not the
  code under review.
- The commits' author address: the same as the commits already merged on `main`; nothing of the task.

## Checks run

| Check | Command or method | Exit / result |
|---|---|---|
| head | `git rev-parse HEAD` in the reviewed worktree | 0, `07fd0de3…` as given |
| range | `git log` and `git diff --stat` of `2b4d760c..07fd0de3` | 0; 4 commits, 17 files, +799 −85 |
| build of head | `npm run build`, in a separate worktree of the head (removed after) | 0 |
| focused view tests | `node --test tests/view/camp-picture.test.mjs tests/view/headquarters-screen.test.mjs tests/view/scene-picture.test.mjs tests/view/world-area.test.mjs tests/view/scene.test.mjs tests/view/run-screen.test.mjs` | 0; 211 pass, 0 fail |
| token values | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| focus outline | `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 |
| part imports | `npm test -- tests/invariants/test_cross_part_imports.py` | 0; 10 tests |
| content identifiers | `npm test -- tests/invariants/test_content_identifiers.py` | 0; 4 tests |
| simulation isolation | `npm test -- tests/invariants/test_simulation_isolation.py` | 0; 5 tests |
| build output | `npm test -- tests/invariants/test_application_build_output.py` | 0; 7 tests |
| test selection | `npm test -- tests/quality/test_node_test_selection.py` | 0 |
| container sprites | `npm test -- tests/invariants/test_loop2_container_sprites.py` | 1, "No test executed" — skipped, no Docker daemon (`docker version`: exit 1, cannot connect) |
| foundation | `python -B .the-way/elements/common/foundation_check.py` in the reviewed worktree | 0; 0 errors |
| mutation, changed simulation lines | `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/data/scene.ts:37-43,src/browser/sim/data/scene.ts:323-336"` | 0; 0 mutants made on those lines (constants and literals only), so nothing to classify |
| sprite chunks and provenance | scratch Python scripts run with `python -I`, inputs passed as arguments | as under Trust boundary |
| built copies | SHA-256 of both files in `assets/sprites/` and `dist/public/sprites/` | equal |
| D-389 number | `git grep "^### D-389"` over every local branch and remote ref | only this branch |
| screenshots | viewed `camp-four-characters-1400.png`, `camp-three-characters-400.png`, `camp-under-page-sentence-1000.png` | band under the header's row and over the heading; 4 of 4 characters at 1400, 2 of 3 at 400 with whole figures; the page's sentence above the band |

Not run, with the reason:

- The full `npm test`: the cycle's own run (step 10).
- `tests/quality/test_quality_invariants.py` (ESLint, Prettier, Ruff) and `npm run typecheck`: no quality
  environment prepared for this review; the author reports both exit 0, and the build's compilation
  passed. Unverified by me.
- A real-browser check of the layout at several widths, of motion and of reduced motion: not rerun; the
  author's report gives measurements, and three screenshots agree with the CSS read above. Unverified
  by me beyond that.
- The container serving: no Docker daemon (above).

## Reaches beyond the dispatch

- The human's private repository of the old game, its copy of the pack and its cut pictures: read only,
  to re-derive the provenance of both new files; nothing of it is quoted here.
- `src/browser/view/game-view.ts` (`renderScreens`, the clock's callback): to confirm the screen is
  updated on every state change, which the redraw on the run's character relies on.
- `src/browser/sim/types.ts:225-283, 433`: the shape of a run and of the pause, to judge the test states.
- `src/browser/view/scene.tsx:156-181` and `src/browser/styles.css:190-229, 1890-1927, 2395-2454, 2686-2690`:
  the `Sheet` the camp reuses and the rules its frames run by.
- `scripts/test.py` and `.the-way/gate/run_tests.py:1-80`: what the full gate does with a skipped case.
- `.the-way/product-guidelines/template.md:66-115`: the form a guideline rule takes (M3).

## Unread material

- Decisions: of the 374 whose *Scope* names a touched part (browser-view, simulation, build-tools,
  deployment, agent-workflow, product-foundation), 54 read whole and 320 by title only. Read whole: D-18,
  D-27, D-36, D-42 to D-55, D-70, D-87, D-88, D-96, D-184, D-208, D-243 to D-246, D-262 to D-265, D-271 to
  D-273, D-280 to D-287, D-314 to D-317, D-321 to D-323, D-349, D-357, D-358, D-373, D-389.
- Decisions that bear on the change and stayed unread: D-04 (cited in the docstring of
  `src/browser/view/camp.tsx:2`; the same citation stands in `scene.tsx`), D-03, D-311, D-319, D-320, D-372,
  D-217, D-218, D-330 — each by title only.
- Invariants: read whole sprite-file-content, loop2-container-sprites, sprite-credits,
  browser-view-token-values, browser-view-focus-outline, design-token-contrast, design-token-sources,
  content-identifiers, simulation-isolation, simulation-inputs, cross-part-imports,
  tracked-file-private-paths, tracked-file-private-names, rule-state-from-pick,
  uncaught-failure-game-state, loop2-deploy-log-dump, failure-watcher-message, browser-failure-report;
  the other invariants whose *Part* names a touched part or `every` were read by heading and *Part* only.
- Part map: every entry read whole. Glossary: headquarters, manual map run, earning loop, extinguished
  campfire and the entries around them read whole; the rest by heading. The-way's glossary at the pinned
  commit: not read.
- Guideline files: all read whole — `guidelines/coding.md`, `guidelines/coding-browser-module.md`,
  `guidelines/coding-content-data.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`
  (its new rule through the diff), `src/browser/AGENTS.md`. `guidelines/coding-simulation-module.md`
  not selected: no simulation module outside the data changed.
- Screenshots `camp-no-characters-1400.png` and `camp-three-characters-700.png` not viewed.

## Searches not found or unclear

- StrykerJS made no mutant on the changed lines of `scene.ts`; whether that is the mutators' reach
  (numbers and `as const` objects) or the configuration's is not settled here.
- `git status` failed inside my scratch worktree once `.the-way` was linked from the reviewed worktree
  (a submodule's `.git` file pointing elsewhere); it did not touch the tests, which use `git ls-files`.
- "about 96 px" (task) against exactly 96 px plus 16 px under the band: unclear only as a matter for
  Mariusz's eye (Declined to judge).
