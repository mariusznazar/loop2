FAIL 83c8369a58703dcf4f471226635bc424d5135da0

# Review 1 — the whole change of the task "swit-rosnacy-z-passa"

Variant: the whole change (one author, no spec, no plan, no slices). Range
`7846213c25675b2c084e4587cd1ffb09316ef486..83c8369a58703dcf4f471226635bc424d5135da0`, three commits
(`96d7b4f3` code, tests and `assets/sprites/fire-small.png`; `38a75f0a` foundation; `83c8369a`
styleguide). `git rev-parse HEAD` in the worktree is `83c8369a…`, as dispatched. Method:
`.the-way/task-cycle/review/SKILL.md` and `whole_change.md` at the pinned the-way `55afa8e`.

Counts: 2 blocking (Important, within the task), 7 Minor (all within the task), 1 out of scope.

## Findings

### Important (blocking)

**I1. The plaque of the flying icon lies over the tint, while D-315 as this change writes it — and
the task's settlement row 1 it records — put it under the tint.** Within the task. Comes from
`96d7b4f3` (code, test) and `38a75f0a` / `83c8369a` (entry, styleguide): the change's files disagree
with each other.

- Code: `src/browser/view/scene.tsx:466-483` renders the tint (`.scene-tint`), then the frost, then
  the `flight` effect, then the badge carrier; the flying icon with its plaque therefore lies over
  the tint. The test pins it: `tests/view/scene.test.mjs:1429` asserts "the plaque of the icon over
  the tint", and its comment at `:1379` names "a plaque of the flying icon under the tint" as the
  defect it catches. The styleguide says the same (`guidelines/styleguide-browser-view.md:627-631`:
  „pod szronem, plakietką lecącej ikony i plakietką nad głową maga”).
- Entry written by this change: `foundations/decisions.md:7029-7032`, D-315: "The layer lies over
  everything the scene draws — the background, the props, the campfire burning or extinguished, the
  mage, the wolf and the dust — but the badge over the mage's head, which stays on its solid `panel`
  background (D-320), and the frost on the edges of the frame". The flying icon is something the
  scene draws and is named in neither exception, so by the entry it lies under the layer.
- Source: the task's settlement row 1 („Pod warstwą odcienia światła leży wszystko, co scena rysuje …
  poza plakietką nad głową maga … i poza szronem”) and question 6 („wszystko w scenie poza
  plakietką nad głową maga”, with the frost added as „drugim wyjątkiem”). The human settled two
  exceptions; the code makes a third.
- Why it matters: WAY-263 — the change's files do what the entry it writes forbids, and the
  styleguide restates the entry more broadly than the entry says. The next reviewer comparing a scene
  change with D-315 will call today's order a violation, or the next author will "fix" it.
- The author's reason is real: D-365 puts the flying icon "on a small plaque on a solid `panel`
  background … as the badge over the head keeps the icon of an action", the same reason D-320 gives
  the badge, and the task never weighed D-365 against row 1. That makes this a gap between the
  settlement and D-365, which the cycle may not close by a silent choice.
- Fix, one of two: (a) record the plaque of the flying icon as a third exception in D-315 (statement,
  *Verification*, *Rationale*), which changes the human's settlement and needs the human's yes —
  recommended, since D-365's reason is D-320's; or (b) follow row 1 literally: render the flight under
  `.scene-tint`, change the test at `:1429` and the styleguide at `:627-631`, and accept that the
  plaque's `panel` takes the tint's hue. See question 1 below.

**I2. D-271, as this change writes it, says CSS draws layers in the colours of the packs' palettes;
the tint layer's colours are not in any pack.** Within the task. Comes from `38a75f0a`.

- Entry: `foundations/decisions.md:5805-5807`, D-271 *Rationale*: "A layer of colour or a speck of one
  square needs no drawing, so CSS draws them on the grid of the scene's pixels in colours of the
  packs' palettes". "Them" is the layer and the speck. The statement at `:5762-5766` ("CSS may draw in
  the scene layers, such as the tint of its light and the frost, and specks, squares of one pixel of
  the scene on its grid in colours of the palettes of the packs") can be read the same way.
- Code: `src/browser/tokens.css` gives the tint `#6f8f6a` and `#e8a838`, sourced as Mariusz's choice
  from the preview. The task's *Context* says they occur in no picture of Pixel Crawler and in nothing
  in `assets/sprites/`, and states the qualification: „paleta paczek wiąże w zasadzie D drobinki
  z kwadratów pikseli, a kolory warstwy odcienia mają źródło w wyborze Mariusza (pytania 3 i 13)”.
- Why it matters: WAY-263 — the entry restates the rule without the task's qualification, so the
  change's own tint tokens do what the entry, read as written, forbids. A later change could be told to
  move the tint to pack colours, or a reviewer could mark this tint a violation of D-271.
- Fix: say in the statement and the *Rationale* that the packs' palettes bind the specks and the
  frost (squares on the grid), while the colours of the tint layer have their source in the human's
  choice (the token sources). Keep the frost's "colours the pictures of the pack's trees hold" in
  *Verification* as it is.

### Minor (each within the task; for the findings file of the fix)

- **M1. *Origin* names the task document, against the pinned template (WAY-27). The task mandates it,
  and it is still a defect.** `foundations/decisions.md:8425` (D-372) and `:8459` (D-373) name
  `swit_rosnacy_z_passa_loop2.md`. D-132 (`:2563`), D-271 (`:5792`), D-315 (`:7046`) and D-316
  (`:7095`) gain it as a further item. The pinned `.the-way/elements/decisions/template.md:218-226`:
  "a task document is never named in *Origin* … What it holds of the reasoning goes into the entry's
  *Rationale* and *Rejected*; *Origin* then reads `none`". The rule is in the pin (commit `77ecd4a` is
  an ancestor of `55afa8e`). The task's item 7 asks for the opposite; the author followed the task and
  flagged it. The open branch `task/martwe-odsylacze-origin` (`a18acf22`) removes every task-document
  *Origin* from the log (267 occurrences of `_zadania` on `main`, 0 on that branch). This change adds
  new ones on the same lines, so the two branches collide, and the task document will be gone when the
  task closes. Suggested: for D-372 and D-373, *Origin* names only `rozpoznanie_frajda.md` (a research
  document), or reads `none`. In the edited entries, add no task document. The reasoning is already in
  each *Rationale* and *Rejected*. See question 2.
- **M2. The measure of the frost's contrast is narrowed from „obrys albo wypełnienie” to the outline
  alone.** `foundations/decisions.md:5762-5766` ("the outline of the frost by at least 3:1") and
  *Verification* "a frost whose outline reads … under 3:1". The source is settlement row 5 and
  question 10: „Obrys albo wypełnienie szronu odcina się od śniegu … co najmniej 3:1”. With FA it
  makes no difference today, but a later frost whose fill reaches 3:1 with no outline would read as a
  violation of D-271 although the human allowed it. Write "its outline or its fill".
- **M3. D-372 states the thickness as a uniform band; the code's frost is ragged.**
  `foundations/decisions.md:8418-8420` ("at 36 °C a frost 8 pixels of the scene thick on each edge;
  at 35 °C … one 16 pixels thick") against `src/browser/styles.css` (the frost rules): the solid band
  is `--depth − 2` pixels, and the full depth stands only on the teeth of 2 of every 7 pixels. A
  reviewer who measures the band at 36 °C finds 6 pixels. Say "at its deepest" or "to its inner
  teeth" in the statement and *Verification*. The styleguide (`:659-664`) already describes the
  shape.
- **M4. At a thickness of 1 or 2 scene pixels the frost is sparse specks of the dark outline colour,
  not a white frost with an inner outline.** `src/browser/styles.css` (the `.scene-frost-rim` /
  `.scene-frost-body` masks): at `--frost: 1` the band and the first row of teeth are 0, so only the
  teeth of 2 of every 7 pixels show, all in `#3c7289`. At 2 the body adds fill on those teeth alone.
  This lasts from 37 °C to about 36.8 °C, a few game minutes, at the start of every map run below
  37 °C. Task item 5 describes the frost as fill `#f3fbff` with a one-pixel inner outline. The author
  disclosed it, and the human has not seen it. Either show it to the human with the screenshots, or
  start the fill at depth 1.
- **M5. The frost contrast test overstates what it guards and misattributes two of its inputs.**
  `tests/view/scene-frost-contrast.test.mjs:32-43` says the snow samples are "the preview of the task,
  table (a)", but `#c2cebe` (t = 0.4) and `#d4caa5` (t = 0.8) are not in the task. They are the
  author's own measurements of today's rendering (the author's report gives `#d4caa6`). The comment
  also claims the test "catches … the frost lying over a tint that is not there". The test reads only
  `--scene-frost-outline` against fixed literals. A change to `--scene-tint-*`, which changes the snow
  under the frost, passes unseen. The styleguide repeats the overclaim (`:664-666`: „pod każdym
  odcieniem światła … co pilnuje test”). The testing guidelines, "Where the expected value comes
  from", ask for the true source of each value. Name the source honestly, and say in the comment and
  the styleguide that the test guards the outline token against snow samples measured once.
- **M6. The author's claim that `Math.round` → `Math.ceil` in the frost's thickness is caught by no
  test is false, and the test that catches it pins a choice the task leaves open.** I made that
  mutation in a scratch worktree. `npm test -- tests/view/scene.test.mjs` failed, exit 1, in "warming
  at the fire takes the frost back, reading by reading", which asserts `"14"` at 35.2 °C
  (`tests/view/scene.test.mjs:1632`). 14.4 rounds to 14 and ceils to 15. The task fixes only 0, 8 and
  16. "Behaviour, not implementation" asks that a test not pin such a choice. Use an anchor value
  (e.g. 35.5 °C → 12) or accept 14 and say why. The report's statement should also be corrected.
- **M7. The styleguide writes values the pinned styleguide template says to point to.**
  `guidelines/styleguide-browser-view.md:637-641` and `:659-662` write "0,80", "2 s", the periods
  „3 z każdych 5”, „2 z każdych 7” and the thicknesses 0/8/16, while
  `.the-way/product-guidelines/styleguide/template.md:181` says "Point to the values; write none into
  the styleguide". The existing scene text already writes "300 ms", so this follows a precedent. The
  cost is that the periods or the 2 s changed in `styles.css` leave the styleguide stale with no check.
  Point to the rules and decisions that hold them (D-316, D-372, the frost rules in
  `src/browser/styles.css`).

Not a finding, noted: the test's PNG reader (`tests/view/scene-picture.test.mjs`, `decodePng`) checks
bit depth and colour type but not the interlace or compression bytes. My own check of the file shows
both 0 (below), so it decodes this file correctly.

### Out of scope

- **O1. The number D-372 is also taken by the open branch `task/martwe-odsylacze-origin`** ("How
  short can an action shortened by bought branches be?"). Whichever merges second must renumber.
  This is the reconciliation's concern, not this change's correctness.

## The task, item by item

- To do 1 (layer, blend, mix, opacity, token values and sources): met in `styles.css` `.scene-tint`
  and `tokens.css` (seven tokens with `Source:`). The order of layers departs from row 1 for the
  flying plaque (I1).
- To do 2 (curve 0 → 0.8 at the required streak, stays, 1 only at a completion; stands at once at a
  death, a completion, a start, „Restart” and a load): met, `scene-picture.ts` `tintOf` / `tintShown`.
  Tests cover Las 480, Las — głębiej 540 with one requirement unmet, a death, a completion, a start
  with and without the event, and a first draw. Under D-212 a load mounts the scene fresh with the run
  paused, so the tint stands at once.
- To do 3 (2 s return as a change of state; in the pause, from „Wznów”; 2 s in `styles.css` with
  its source comment): met. A loss at a discovery stop also waits for the scene to go on. That is
  consistent with D-122 ("the same pause as after „Pauza”") and D-322, so not a finding.
- To do 4 (two flame stages, 20 minutes, same frames and beat, a PNG of pixels alone, the file and
  the threshold in `scene.ts`, the extinguished fire unchanged): met. `minutesLeft <= 20` matches
  D-373 ("more than 20 … its last 20").
- To do 5 (frost 0 at 37 °C, half at 36 °C, 16 px at 35 °C and below, warming takes it back, FA
  colours, CSS squares on the grid, edges only, over the tint, 3:1): met in code, with M2, M3 and M4.
  The values `#f3fbff`, `#3c7289`, `#c5dfed` and 16 match the task. I recomputed 3:1 independently:
  `#3c7289` gives 3.211 on `#bccae5`, 3.263 on `#bacfd0`, 3.193 on `#ddc69e`.
- To do 6 (drawn from the game state; reduced motion; every stop holds; the pause greys tint and
  frost): met by code reading. The return is defined only under `prefers-reduced-motion: no-preference`,
  and the stop rule holds every animation of `.scene`. The tint and the frost are children of the
  greyed `.scene`. The real-browser behaviour rests on the author's own-work check (see Checks).
- To do 7 (D-315 and D-132 whole, the tint part of D-316, the rule-D sentence of D-271, the seven
  rows): D-315 projected text, *Verification*, *Rationale* and *Rejected* are present, plus row 1, with
  I1. D-132 now reads as the projection requires: the window's place was already in it from task 16,
  and the author added "the light of the scene in full gold … under the window … in sight again when
  „✕” uncovers the screen". This is enough, and nothing more of the projected text is missing. The
  D-316 projected sentence, *Rationale* and *Rejected* are present, with 20 % and 2 s (rows 2 and 3).
  D-271 has the rule D sentence (row 7), with I2, M2. Row 4 is in D-372 (M3) and row 6 in D-373.
  *Origin*: see M1.
- To do 8 (styleguide, the scene part and "Every value with its source"): present, with M5, M7 and
  the I1 drift.
- Acceptance criterion (Mariusz accepts the smaller flame from a screenshot in the request): the
  screenshot exists, `01-flame-full-and-smaller.png`. I viewed it, and it shows the same stones and
  logs with the fan cut down. The decision is Mariusz's at the request.
- Source fidelity of values: colours, opacities, 2 s, 20 %, 20 minutes, 16 px / 32 px, 37 °C → 35 °C
  all match the task. The code values are 0.8, 20 and 16, with 37 / 35 read from `BALANCE`. I checked
  them against `balance.ts:24,31`, `items.ts:35` (`fuel: { burnMinutes: 20 }`) and `body.ts:85-88`:
  0.002 × (37 − 25) = 0.024 °C a minute on Las at 25 °C, as the task says.

## Trust boundary `assets/sprites/**`

- `assets/sprites/fire-small.png` (929 bytes): chunks `IHDR`, `IDAT`, `IEND` only, every CRC valid,
  no bytes after `IEND`, 128 × 32, 8-bit RGBA, compression 0, filter 0, interlace 0. Git stores it
  as binary (`-text`). The committed test also holds that every changed pixel was a flame pixel of
  `fire.png` and is now opaque black, so there is no new colour.
- The build is unchanged: `scripts/static-files.mjs:32-42` copies only `.png` files directly in
  `assets/sprites/` into `sprites/` of the build (D-273's review condition holds).
- No file name or URL is built from user data: `spriteOf` builds `/sprites/${picture.file}` from
  `SCENE_FIRE.low.picture.file`, a constant in `src/browser/sim/data/scene.ts`.
- `sprite-file-content` stays at method `review`, which is correct under D-273: a further PNG does
  not change the boundary.

## The author's own-work check

The named requirement covers the brightness, the badge on `panel`, the pause greying, reduced motion
and the 2 s return. It sits where the change is weakest, real-browser rendering that jsdom cannot
show, and the measurements described would catch it unmet. It did not cover the order of the flying
plaque against the settlement (I1) or the thinnest frost (M4). The screenshots I viewed agree with
the code: 01, 03, 04, 05, 06, 07 at commit `f61c319d` of `mariusznazar/screenshots` show the cool
tint at streak 0, the smaller flame, a 9-pixel and a 16-pixel ragged frost over the tint with the
badge over it, and full gold after the completion.

## Declined to judge

- The tint on a map whose condition asks for no streak: the task leaves it to the task that adds
  such a map (question 4, *Out of scope*).
- The wolf under the tint: task 20 draws it.
- The fallback where `@property` is unsupported: the foundation names no browser-support floor. The
  author disclosed the cost (the tint flips at half of the return).
- Fractional device pixel ratios for the frost's percentage masks: D-349 fixes one CSS size and
  states no device-pixel-ratio requirement. Not verified.
- Recording the effect classification and the whole reduced-motion rule (questions 11, 12, 15): task
  20 writes them.

## Checks run

| Check | Command or method | Result |
|---|---|---|
| Head | `git rev-parse HEAD` in the worktree | `83c8369a…`, as dispatched |
| Range | `git log 7846213c..83c8369a`, `git diff 7846213c..83c8369a` | three commits, 11 files |
| Focused tests (in a detached scratch worktree of `83c8369a`, `node_modules` linked) | `npm test -- tests/view/scene-picture.test.mjs` | exit 0, 50 pass |
| | `npm test -- tests/view/scene.test.mjs` | exit 0, 47 pass |
| | `npm test -- tests/view/scene-frost-contrast.test.mjs` | exit 0, 2 pass |
| Format | `node node_modules/prettier/bin/prettier.cjs --check` on the 8 changed code and test files | exit 0 |
| Lint | `node node_modules/eslint/bin/eslint.js --max-warnings 0` on the 6 changed TS/MJS files | exit 0 |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) | exit 0, 0 errors |
| Mutation, simulation file | `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/data/scene.ts"` (scratch worktree) | exit 0; "Instrumented 1 source file(s) with 0 mutant(s)", so nothing to classify |
| Hand mutation | `Math.round` → `Math.ceil` in `frostOf`, then `npm test -- tests/view/scene.test.mjs` (scratch worktree, reverted) | exit 1, "warming at the fire takes the frost back…" fails (M6) |
| Sprite content | Python read of both PNGs: chunks, CRCs, IHDR fields, trailing bytes; `git ls-files --eol` | as under Trust boundary |
| Contrast | WCAG ratio of `#3c7289` against the five snow samples, recomputed | all ≥ 3.19 |
| Screenshots | `gh api … contents/loop2/swit-rosnacy-z-passa/<file>.png?ref=f61c319d…` for the seven files, viewed | agree with the code |
| Number collision | `git show <branch>:foundations/decisions.md` over local branches | D-372 also on `task/martwe-odsylacze-origin` (O1) |
| Reviewed worktree untouched | `git status --short` after all checks | clean |

The scratch worktree was removed after the checks, its `node_modules` junction unlinked first.

Not run:

- The game in a real browser (`npm run local`, as in `.claude/skills/loop2-play/SKILL.md`), at streak
  0, the required streak, full gold, a loss, the pause, three frost thicknesses and the smaller flame.
  Reason: cost against what it would add. The screenshots cover streak 0, 242, frost 9 and 16, full
  gold and the smaller flame. The pause greying, the 2 s return and reduced motion therefore rest on
  the author's measurements and my code reading, and I did not verify them myself.
- The full `npm test`: excluded by the handoff (the cycle's own run).
- The invariant, build and container tests the author ran: not repeated, since the change touches
  none of their code.

## Reaches beyond the selection

- `.the-way/elements/decisions/template.md` § Origin (`:218-226`), and the-way history for `77ecd4a`:
  to judge the author's open point about *Origin* (M1).
- `.the-way/product-guidelines/styleguide/template.md` whole (WAY-170, the styleguide the change
  writes): M7.
- `git log` and `git show` of the branch `task/martwe-odsylacze-origin`, decisions only: to see
  whether the *Origin* rule is being applied in the repository, and for the number collision (M1, O1).
- `scripts/static-files.mjs:32-42`: the build's copy of sprites (D-273).
- `src/browser/sim/data/balance.ts`, `items.ts`, `body.ts`, `maps.ts` (the lines cited above): the
  values the task quotes.
- `src/browser/styles.css:1795-1860` (the scene's base rules): whether the frame is exactly the
  picture's box, which the frost's percentages rely on (`display: block` on the background, so yes).
- The author's screenshots in `mariusznazar/screenshots` at `f61c319d`.

## Unread material

- Decisions of my selection (the *Scope* search over `browser-view`, `simulation`,
  `product-foundation` and `agent-workflow`: 331 entries): **45 read whole, 286 by title only.** Read
  whole: D-04, D-18, D-38, D-39, D-40, D-42, D-43, D-48, D-57, D-58, D-60, D-62, D-68, D-69, D-70,
  D-122, D-131, D-132, D-133, D-212, D-250, D-271, D-272, D-273, D-311, D-314, D-315, D-316, D-317,
  D-318, D-319, D-320, D-321, D-322, D-341, D-349, D-357, D-358, D-364, D-365, D-366, D-367, D-368,
  D-372, D-373. Every decision the handoff listed as unread by the author is among them. No decision
  whose title bears on the scene, the tint, the frost, the flame, tokens or sprites stayed unread. The
  testing decisions D-73 to D-89 were read by title only, through `guidelines/testing.md`.
- Invariants: read whole: browser-view-framework, simulation-isolation, content-identifiers,
  eslint-source-rules, prettier-source-format, browser-view-token-values, design-token-contrast,
  design-token-sources, node-test-selection, document-test-memory-limit, sprite-file-content,
  loop2-container-sprites, cross-part-imports, tracked-file-private-paths, sprite-credits. The other
  invariants whose *Part* names a touched part or `every` (about 65: the account, save, simulation
  rule, deploy and container ones) were read by title only, because the change reaches none of their
  code. That departs from "Reading the foundation" step 3, which asks for them whole.
- Glossary: `streak`, `completion`, `extinguished campfire` read whole. The-way's glossary at the
  pinned commit (WAY-226) not read.
- Part map: `browser-view`, `simulation`, `agent-workflow`, `product-foundation` read whole.
- Guidelines read whole: `guidelines/coding.md`, `coding-content-data.md`, `coding-browser-module.md`,
  `testing.md`, `styleguide-browser-view.md`, `src/browser/AGENTS.md`. Other `coding-*.md` files not
  read: their index rows do not match the change.
- Not read: the task's sources outside the repository (the definition, the plan, the preview folder
  `podglad-swit`). I relied on the task's quotes of them.

## Searches not found or unclear

- Whether the human's „wszystko … poza plakietką nad głową maga” (question 6, row 1) was meant to
  cover the plaque of the flying icon of D-365: the task names neither the flying icon nor D-365 (I1).
- The task's item 7 asks that *Origin* name the task document. The pinned template forbids it
  (WAY-27). Which one governs is unclear (M1).
- The source of the snow samples `#c2cebe` and `#d4caa5` in the contrast test: not in the task. The
  author's report gives `#d4caa6` from its own screenshots (M5).

## Questions for the orchestrator (they do not hold the review)

1. I1: should the plaque of the flying icon become a third exception in D-315, with the human's yes,
   or move under the tint as row 1 reads? Recommended: ask the human for the exception, with the
   reason D-365 already gives (the plaque keeps the icon legible on the forest, as the badge does).
2. M1: should D-372, D-373 and the edited entries follow the pinned WAY-27, with *Origin* naming no
   task document, against the task's item 7? Recommended: yes, given the pin and the open branch
   `task/martwe-odsylacze-origin` that removes such *Origin* items.
