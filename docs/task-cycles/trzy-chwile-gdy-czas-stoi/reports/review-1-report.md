FAIL 81578d6653c3f583810685cd6f18c9372bad5068

# Review 1 — the whole change, task trzy-chwile-gdy-czas-stoi

Range `20bcc58df073ab5d5ead7c6f04cd136117da08bd..81578d6653c3f583810685cd6f18c9372bad5068`, five commits of
one author without a plan (`c130b231`, `04b43088`, `d8c8f496`, `959a8024`, `81578d66`); `git rev-parse HEAD`
in the worktree is the head given. No spec, no plan, no slices: every finding below comes from no slice, the
range is one author's.

The code does what the task asks, and I saw it do so in a real browser (discovery, death of cold, a reload
after it, and a death under reduced motion). The trust boundary holds: every pixel of the death sheet
matches its source. The change fails on its written parts: one guideline sentence the task names was left
standing, D-315 and D-322 as written differ from what the code does, and D-271 gains a rule the task does
not carry.

## Blocking findings

### Important 1 — the styleguide still says that all motion of the scene stands at a discovery, a death and a completion (To do 13)

- Place: `guidelines/styleguide-browser-view.md:706-707`: „Przy zatrzymaniu — pauzie, odkryciu, śmierci i
  ukończeniu — cały ruch sceny, także ogień, mag, lot ikony, kurz i powrót odcienia, stoi (D-322).”
- What is wrong: To do 13 quotes exactly this sentence as what the part says today and has to change. The
  range left it as it was and added a new paragraph right after it (lines 713-727), which says the effect
  moves („Ruszają się tylko elementy efektu”). The rule now contradicts itself. It also states D-322 as it
  stood before the change: at a death the mage falls, and at the other two moments the plaques and specks
  move.
- Why it matters: a later author or reviewer who reads the first sentence would treat any effect at a
  stop as a defect. The template's rule "A changed entry brings its rules along" (WAY-169) asks that every
  rule naming D-322 be brought in line in the same change.
- Evidence: `git diff 20bcc58d..81578d66 -- guidelines/styleguide-browser-view.md` leaves lines 706-711
  untouched. The fix is to say that at the player's pause everything stands, and at the three moments
  everything but the moment's effect stands.

### Important 2 — D-315 as written puts the specks of light under the tint, and the code puts them over it (WAY-263)

- Place: `foundations/decisions.md:7034-7039` (D-315, changed by `959a8024`): „The layer lies over everything
  the scene draws — … — but the badge over the mage's head and the plaques of a discovery, … and the frost
  …; the cold layer after a death of cold (D-322) lies over the layer of the tint, under the frost.”
- What is wrong: the specks are drawn by the scene, and D-315 does not list them among the exceptions. So the
  entry this change writes requires the tint layer to lie over them. The code does the opposite:
  `src/browser/view/scene.tsx:705-707` draws `Specks` after the tint, the stylesheet comment at
  `src/browser/styles.css:1810-1815` and the styleguide at `guidelines/styleguide-browser-view.md:641-643` and
  `:741-744` put them "nad odcieniem światła", and `tests/view/scene.test.mjs` asserts
  `layers.indexOf("scene-specks") > layers.indexOf("scene-tint")`.
- Why it matters: the code does what the entry it writes forbids. Under WAY-263 that is Important whatever
  the size of the fix. The fix is to name the specks in D-315's list, and in its Verification, next to the
  plaques. D-322's "over the full gold of the tint" does not settle the layering, since it can be read as
  "above the golden scene".
- On the handoff's question 2: the other edits of D-315 follow from what the task carries. The plaques are
  "like the badge" (question 2), which lies over the tint. The cold layer has to be told from the tint at
  streak 0 (question 3), which it cannot be under a `color`-blended tint. So I do not count those edits as a
  WAY-30 change beyond the task. They were incomplete, not out of bounds.

### Important 3 — D-271 gains a 3:1 threshold for the specks that the task does not carry, and it turns "specks of light" into dark sparks (WAY-30)

- Place: `foundations/decisions.md:5766-5767`: „… the outline or the fill of the frost and each colour of the
  specks by at least 3:1 against the snow it lies on or rises over.”; also Verification `:5784-5785` (complies
  „each 3:1 or more against the snow under the full gold”) and `:5791` (violates „a speck whose colour reads
  under 3:1 on the snow it rises over”). The styleguide repeats it (`guidelines/styleguide-browser-view.md:743-744`),
  and `tests/view/scene-frost-contrast.test.mjs` pins it.
- What is wrong: the task gives the specks the condition of question 8 alone: „dobranych tak, żeby
  odróżniały się od tła, na którym stoją” (To do 3), with no ratio. It lets this task change task 18's
  sentence in D-271 "only if it does not fit the specks" (question 13). The sentence already fitted: the
  specks are an effect, and the existing clause "the colour of an effect stands out from the ground it
  stands on" covers them. Its 3:1 was tied to the frost alone. No settlement of the task, and no answer of
  the human, sets 3:1 for the specks.
- Why it matters: under the full gold the snow (`#ddc69e`, the change's own sample) has a relative luminance
  of about 0.58. No colour lighter than that can reach 3:1 against it; a colour has to be darker than a
  luminance of about 0.16. With the new rule, specks of light can only be dark. The author's report says the
  proposed specks "read as dark sparks, not light". Question 9 reserves the colours of the specks for the
  human at the request. If he picks a light colour, the foundation the change writes forbids it, so the rule
  decides his choice in advance.
- Fix: either drop the 3:1 for the specks from D-271, its Verification, the styleguide and the test, keeping
  "stands out from the ground" from task 18's sentence, or keep it only as a question to the human at the
  request, with this consequence stated.

### Important 4 — D-322 says the mage stands still during every effect, while at a death the mage itself falls (WAY-263)

- Place: `foundations/decisions.md:7279`, the binding text of D-322: „… and nothing but the effect moves while it
  plays, the fire and the mage standing as at every stop: …”.
- What is wrong: question 12's answer, which settlement row 6 records, keeps the mage still only „przy
  odkryciu i rozwiązaniu” („ogień i mag (przy odkryciu i rozwiązaniu) stoją”). The entry drops that
  qualification, and in the same sentence the mage falls in six frames after a death. The code
  (`src/browser/styles.css`, the rules `.scene[data-moment-playing] .scene-mage-sprite .scene-mage-death img`)
  moves the mage at a death.
- Why it matters: the entry states the settlement more broadly than its source and says what the code does
  not do. Under WAY-263 that is Important. The fix is one phrase: "the fire, and at a discovery and a
  completion the mage, standing as at every stop".

## Minor findings (all within the task)

- `guidelines/styleguide-browser-view.md:798-800` (rule "The end-of-run window"): „Otwiera się samo, gdy
  przejście ręczne kończy się śmiercią postaci albo ukończeniem mapy” no longer says when the window opens:
  after the effect of the end, at once where the scene shows the last image at once. D-311 says so now. The
  rule's *Decision* line names D-311 but not D-322, and WAY-169 asks that a rule naming a changed decision
  be brought in line in the same change. Within the task (To do 7); minor, because the sentence is not
  false, only less precise.
- `foundations/decisions.md:8436` (D-371, untouched): „„Koniec przejścia” stands in the header before
  „Restart”, only while the map run has ended and the window is closed.” While the window waits for the
  effect, the game view's memory has it open (`src/browser/view/game-view.ts:349-354`,
  `endWindowOpen = true`, `effectPending = true`). Yet „Koniec przejścia” stands in the header, because the
  screen receives `windowShown()` (`src/browser/view/run-screen.tsx:151,168`), and the author's tests rely on
  pressing it during the wait (`tests/view/end-window-game.test.mjs`, „„Koniec przejścia” opens the window at
  once while it waits…”). The behaviour is sensible, but D-371 read literally forbids it. One sentence in
  D-371 about the wait would close the gap. On the handoff's question 2: D-368 rightly stays as it is
  („opens of itself” still holds, and D-370's Rationale already expects the effect before the window).
  D-317 rightly stays as well (the task: "Bez zmiany"; the moments are not effects of an ordinary event, and
  no effect flashes the whole area).
- `tests/view/end-window-game.test.mjs:394`: the changed test is still named „the window opens at the game
  minute a character's death ends the map run while the player is on its screen…”, but it now fires the end
  of the effect (`playTheEffect`) before asserting the window. The change of expectation is justified by To do 7.
  The name now misstates what the test protects.
- `foundations/decisions.md:5784-5785` (D-271, complies): „the specks of light … in colours read from pixels
  of the pack's bonfire”. The foundation's example is written from a proposal that is still pending the
  human's choice. Likewise the new violation „a cold layer whose colour no choice of the human gave”
  (`:5791`) describes the code as it stands today (`src/browser/tokens.css`, `--scene-chill` „pending
  Mariusz's choice”). Both hold only once the human chooses at the request. The request should say that the
  token comments and these examples change with his choice.
- `src/browser/view/scene.tsx:509-513` with `src/browser/view/game-view.ts:146-151,351-354`: under reduced motion the
  scene keeps `data-moment-playing` set; I saw `playing=true` at a death under reduced motion in Chromium.
  If the player switches the setting off while the moment stands, the effect plays then and the window,
  already standing, does not wait. The author names this (Choice 6). It is harmless today and recorded so
  the human sees it.

## Out-of-scope findings

- D-322's *Origin* (`foundations/decisions.md`, D-322 Origin line), like those of D-39, D-42, D-311 and others,
  still names task documents (`scena_z_ludzikiem_loop2.md … To do …`). The pinned decision template forbids
  that („a task document is never named in *Origin*”, `.the-way/elements/decisions/template.md:223-226`).
  The range did not add such a reference (it added `rozpoznanie_frajda.md`, a research document), so this
  is outside the task.

## Declined to judge

- The colours `#2f5fd0` at 0.5, `#b21818` and `#985a3b` as such: question 9 gives them to the human at the
  request. Only the rule they are measured by is judged above (Important 3).
- The durations (fall 960 ms, plaques 600 ms + 150 ms each, specks 1800 ms + up to 900 ms): the task leaves
  them to the cycle and the human's viewing (question 6).
- The look of the dead mage lying under the cold layer, a dark blue shape at the bottom of the clearing, and
  whether it reads as a fallen mage: the human's viewing before the merge (question 6).

## Checks run

All in a separate clone of the head, `.runs/review-1-head` (clone of the worktree at `81578d66`, `.the-way`
initialised from the worktree's own submodule at `55afa8e5`, which matches the gitlink), after `npm ci` (exit 0).
The clone was deleted when I finished.

- `npm test -- tests/view/scene.test.mjs` — exit 0, 62 tests pass.
- `npm test -- tests/view/scene-picture.test.mjs` — exit 0, 62 pass.
- `npm test -- tests/view/end-window-game.test.mjs` — exit 0, 26 pass.
- `npm test -- tests/view/scene-frost-contrast.test.mjs` — exit 0, 3 pass.
- `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0 (4 tests);
  `test_design_token_contrast.py` — exit 0 (3); `test_design_token_sources.py` — exit 0 (2);
  `test_content_identifiers.py` — exit 0 (4); `test_simulation_isolation.py` — exit 0 (5).
- `npm run typecheck` — exit 0. `npx eslint` on the five changed view modules, `src/browser/sim/data/scene.ts`
  and the four changed test files — exit 0. `npx prettier --check` on those plus `styles.css` and
  `tokens.css` — exit 0.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`.
- `cmp assets/sprites/mage-death.png dist/public/sprites/mage-death.png` after the build — exit 0: the build
  copies the same bytes.
- `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/data/scene.ts:57-232"` —
  exit 0. Stryker made no mutant in the changed lines, which hold only `as const` data. No `tests/sim` file
  covers them; what reads them is the view's tests, which are outside Stryker's run. I classify this as
  behaviour not worth fixing through the simulation suite.
- Trust boundary, manual: a one-off Pillow script of my own (not the author's), in the session's scratch
  directory. The source is `Death-Sheet.png` at loop `cdc7c0d`, taken with `git show` (384 × 32, RGBA). For each
  of the six frames the script searched every offset that carries every opaque source pixel unchanged into the
  64 × 64 frame of `assets/sprites/mage-death.png`. Exactly one offset fits, (13, 32), the same for all six
  frames. With it there are 0 mismatching pixels, 0 extra pixels in the destination, and 0 source pixels
  lost outside the frame (opaque source pixels per frame: 465, 449, 449, 373, 347, 352). The file's chunks are
  `IHDR IDAT IEND` alone, 3186 bytes, nothing after `IEND`. The scene names it only through
  `SCENE_MAGES.elementalMage.death.file` in the data, and the view builds `/sprites/<file>`. No name or URL
  reaches outside `assets/sprites/`. The fact `pixel-crawler-terms` allows altering the pack's arts and asks
  for no credit, and README line 26 lists the file.
- Real browser, manual (`.claude/skills/loop2-play/SKILL.md`): `npm run local` in the clone, Playwright CLI
  0.1.22, a made-up account `@example.test`, a new character, Las at 16×. Polling the scene's attributes every
  10–20 ms:
  - First discovery at minute 84: `data-moment=discovery`, `data-moment-playing` for about 760 ms, then
    off; two plaques with frames `rgb(255, 210, 48)` (`--discovery`), 2 px wide, on `rgb(24, 24, 27)`
    (`--panel`). The mage's frames were `paused`. The burning fire was not drawn yet (`none`), so I could not
    check the fire. I looked at a screenshot: a row of two plaques over the clearing, the scene in colour.
  - Second discovery at minute 104: four plaques, about 1060 ms of effect. „Wznów” took them away at once.
  - Death of cold at minute 243: `data-moment=death`, `playing=true`, `.scene-chill` present, no window. The
    window stood 964 ms after the first dead reading (fall 960 ms) and the scene then went `hidden`.
  - Reload on that screen: the window stood at once, `data-moment-playing` absent. After „✕”: the death sheet
    `display: block`, `translate: -83.3333%` (last frame), `animation-name: none`; chill opacity 0.5,
    `mix-blend-mode: color`, `rgb(47, 95, 208)`; mage `grayscale(1) brightness(0.55)`, facing left (the mage
    at the clearing, x 144). The mage box ends at scene row 136 (`groundLine`), above the frost.
  - „Restart” under `emulateMedia({ reducedMotion: "reduce" })`: death at about 14.6 s. The window stood at
    the first dead reading (0 ms); the death image had `animation-name: none` and the last frame, and the
    chill had no animation.
  - Not checked in a real browser: a completion and its specks (not reachable by play in reasonable time; I
    did not compose a state), a death of hunger or in a fight, leaving the screen during the effect. These rest
    on the jsdom tests and the author's report. I kept no screenshot for the human (WAY-317): the
    screenshots of this cycle are the author's. The browser was closed, the local start stopped and
    `.playwright-cli/` deleted with the clone.
- Not run: the full `npm test`, `tests/quality`, `tests/deploy` and the container test
  `test_loop2_container_sprites.py`. The full suite is the cycle's own run; for the container I relied on the
  `cmp` above and the author's run.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md` § Origin (lines 218-226): to judge the *Origin* edits of D-322.
- `.the-way/product-guidelines/template.md` lines 68-114 (WAY-170): the form of the edited styleguide and the
  rule that a changed entry brings its rules along (WAY-169).
- `src/browser/sim/types.ts:155-166`, `src/browser/sim/data/items.ts:29`, `src/browser/sim/run.ts` and
  `src/browser/sim/game.ts` (events `characterDied`, `mapRunCompleted`, `discovered`): to confirm that every
  death path emits the event the scene and the game view read, and that `Understanding.items` holds only
  resources and the campfire, so `RESOURCES[id].icon` cannot be undefined.
- `src/browser/view/run-screen.tsx` (whole `setWindow`/`draw` path) and `src/browser/view/game-view.ts`
  (`take`, `renderScreens`, `syncWindow`): the order in which the window and the scene are drawn.
- `src/browser/styles.css:1795-2040` and `:2280-2490`: the whole scene section, to judge specificity of
  the new rules against the existing ones (the death sheet against `.scene-mage-sprite img`, the dead rules
  against `[data-bending]`).
- `the predecessor game's repository` at `cdc7c0d`: the source death sheet, for the pixel check.
- `package.json`: React 19.3.1, for the ref cleanup that `watchCancel` returns.

## Unread material

- Decisions of my selection (Scope naming `browser-view`, `simulation`, `product-foundation`,
  `agent-workflow` or `build-tools`, by comma or `·`, plus those the task names): 343. Read whole: 39 —
  D-04, D-39, D-40, D-42, D-43, D-61, D-62, D-122, D-132, D-212, D-267, D-271, D-272, D-273, D-283, D-284,
  D-311, D-314, D-315, D-316, D-317, D-318, D-319, D-320, D-321, D-322, D-349, D-357, D-358, D-364, D-365,
  D-366, D-367, D-368, D-369, D-370, D-371, D-372, D-373. By title only: 304. No decision bearing on the
  change stayed unread.
- Invariants: `foundations/invariants.md` read whole. Part map read whole. Glossary of the product read
  whole. The fact `pixel-crawler-terms`, the WCAG facts and the new `wcag-three-flashes` read whole; I did
  not fetch the W3C page, and the quotation matches the text of 2.3.1 as I know it.
- Guidelines read whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`,
  `guidelines/coding-content-data.md`, `guidelines/styleguide-browser-view.md` (at the head),
  `guidelines/testing.md`, `src/browser/AGENTS.md`. Not read: the other `guidelines/coding-*.md` files, whose
  index rows do not match the work.
- The-way's own glossary at the pinned commit (WAY-226): not read; I used no word of the process that it
  would define differently.

## Searches not found or unclear

- `foundations/decisions.md` mixes `,` and `·` in *Scope*. My first search split on `·` alone and found 223
  decisions; the corrected count is 343, and the titles of both lists were skimmed.
- Stryker's `--mutate` range for the data file produced no mutant. It is unclear whether that is the range
  form on a file of `as const` data or no mutable expression; either way, nothing was measured there.
