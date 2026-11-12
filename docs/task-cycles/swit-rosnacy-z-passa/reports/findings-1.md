# Findings of review 1 — the whole change of the task "swit-rosnacy-z-passa"

Cut word for word from `reports/review-1-report.md` (first line: FAIL 83c8369a58703dcf4f471226635bc424d5135da0): the blocking findings first, then the Minor findings of the review of the whole change within the task. The out-of-scope finding O1 is not here.

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
