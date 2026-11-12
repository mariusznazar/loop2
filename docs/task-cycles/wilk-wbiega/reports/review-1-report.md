FAIL e717ec0f20dba485f648b0c7602c2ccdf5513061

# Review of the whole change — task wilk-wbiega

Range `7ff7c729f60fafac1f9cd467dd68607a5f326451..e717ec0f20dba485f648b0c7602c2ccdf5513061` (four
commits of one author, no spec, no plan, no slices). `git rev-parse HEAD` in the worktree is the head
given; `.the-way` at `55afa8e57aa1b83c77108576a36642722e0dda15`, as the gitlink records. The worktree
was left untouched (`git status --short` empty); every check ran in a separate clone of the head under
`.runs/review-1-check`, deleted at the end.

Blocking findings: 1 (Important). Minor: 5, all within the task. Out of scope: 0.

## Findings

### Important

**I-1 — The wolf does not run in when the reading of the attack also carries the end of a gathering.**
`src/browser/view/scene.tsx:616-625` (commit `2f144fdb`): the effect of a reading is
`sceneEffect(...) ?? creatureEffect(...)`, and the scene keeps one effect at a time. By D-71 a minute
lets the action that ends in it take effect and then tries the attack before the pick, so the events of
one minute can carry `activityFinished` of a gathering and `attacked` together; then `sceneEffect`
returns the flight of the icon or the dust, `creatureEffect` is never asked, and the wolf appears at
once beside the mage, with no run in, though nothing is overdue, no load happened and no stop holds the
scene. To do 1 asks that at an attack the wolf runs in, with exactly three exceptions (an overdue run,
a load in the combat minutes, reduced motion) and Q5's first-attack stop; D-316 says "it runs in from
the right edge of the frame", D-317's *Verification* says "the wolf running in from the right edge in
300 ms at 1× and at 16×". The two effects do not compete for one place: the run in is an attribute on
the wolf element the state already draws, so the flight or dust and the run in could both play.
Evidence: a script of mine (`attack_with_gather.mjs`, run on the built head) played 300 seeds of a
manual map run of Las — głębiej with the program „Zbierz — Patyk / Zbierz — Jagoda / Eksploruj” and,
for each reading that carried an attack, asked both functions: at one game minute per reading (1× to
4×) 6 of 97 attacks had a non-null gathering effect together with a non-null run in, so the run in was
lost; at three minutes per reading (about 16×, the clock reading every 200 ms) 11 of 97. No test covers
a reading with both events (`tests/view/scene.test.mjs` and `tests/view/scene-picture.test.mjs` only
pair `attacked` with nothing or with `combatEnded`). Graded Important: a missed requirement in a
reproducible fraction of attacks — roughly one in ten at 16× — that no test protects. Slice: none (one
author without a plan).

### Minor (all within the task)

**M-1 — The credit of the dust says „obłók”, not „obłok”.** `src/browser/view/credits.ts:54` reads
`name: "Kurz i obłók walki"` (bytes `ob c5 82 c3 b3 k`: „ó” where Polish has „o”), and
`tests/view/icons.test.mjs:211` expects the same misspelt line, so the test protects the typo. The task
(To do 6) gives „Kurz i obłok walki”, the author's report says „Kurz i obłok walki”, and the styleguide
writes „obłok” throughout (`guidelines/styleguide-browser-view.md:614`, `:639`, `:707`). Every player
who opens „Autorzy grafiki” on the login card or at the bottom of Siedziba reads a misspelt word; nothing
breaks. Fix both lines together. Every other changed file is valid UTF-8 with no U+FFFD, no BOM and no
CRLF, and every other Polish word added in `src/`, `tests/` and `guidelines/` reads correctly (checked
by a script over all non-ASCII words of the added lines).

**M-2 — D-316 does not carry the approved projected words "the moment of the map run".**
`foundations/decisions.md:7628` (commit `ab8c1606`) reads "what attacks it and how the map run stands",
where the projected entry the task carries reads "what attacks it and the moment of the map run". The
author's reason (gap 2(a)) — that "moment" is the word of D-322's three moments — is exactly why the
projected words fit: the scene draws the moment (`SceneMoment`, `momentBegins` in
`src/browser/view/scene-picture.ts`) from its previous reading and the events, which is what that clause
of the sentence states. "How the map run stands" is broader (it takes in `SceneStanding`: going, paused)
and still true of the code, so a reader is not misled, which keeps this Minor; but it alters a source the
human approved without a decision. Restore the projected words.

**M-3 — Test comments point to the task document's questions.** `tests/view/scene-picture.test.mjs:1309`,
`:1340`, `:1366`, `:1415` and `tests/view/scene.test.mjs:2256`, `:2334`, `:2365`, `:2409` open with
"D-316, Q2.", "D-322, Q5." and the like; Q2–Q5 are the numbers of the questions of this task's document.
`guidelines/testing.md`, *Where the expected value comes from*: „Komentarz testu nie wskazuje dokumentu
spoza fundamentu.” No test on the base cites a Q number (`git grep '\bQ[0-9]\b' 7ff7c729 -- tests src`
finds none). After the merge nobody can resolve "Q4"; the D-numbers already carry the requirement. Drop
the Q references.

**M-4 — The test of the wolf's side checks a hand-written list of places, not the data's.**
`tests/view/scene-picture.test.mjs:1358` loops over `[32, 42, 80, 144, 224]`, the mage's places copied
as numbers, to assert that the wolf stands on the right "at every place the mage stands at but the right
edge". The author's own choice 5 says a change of `SCENE_FIGHT.gap` or of a place can flip a side; a
new or moved place in `src/browser/sim/data/scene.ts` would not be checked, since the list does not come
from `SCENE_PROPS`, `SCENE_FIRE` and `SCENE`. The same test also pins `SCENE_FIGHT.gap === 2`
(`:1345`), a value the handoff calls the author's proposal, which no foundation entry holds
(`guidelines/testing.md`: a value the test needs and the foundation does not carry goes to the
foundation first). Reading the places from the data would let the test catch the regression it names.

**M-5 — D-317's *Rejected* names the process's tasks.** `foundations/decisions.md` D-317 *Rejected*:
"each task its own classification — the classifications could exclude one another" (commit
`ab8c1606`). The decision is to state the product's reasoning; "each task" is a word of the cycle, not
of the scene. Something like "a classification made anew for each kind of effect" says the same without
it. A reader is not misled, so Minor.

## Against the task

- To do 1 (run in, side, mage turns, 300 ms, overdue/load/reduced motion): met except I-1. The run in
  is an attribute (`data-entering`) on the wolf the state draws, so a load and reduced motion leave the
  wolf standing at once (tests and the browser run below).
- To do 2 (scuffle): bite frames in a loop at 160 ms, mage idle, the cloud between them from `dust.png`,
  under reduced motion still; seen in the browser.
- To do 3 (outcomes): defeated falls in four frames and is gone; departed runs to the right edge;
  death leaves the wolf idle; a completion in the combat leaves it idle; overdue and stop readings show
  none. Defeated and death seen in the browser; departed and completion in the combat only through the
  tests (I found no seed for a departure with my composer).
- To do 4 (first attack): seen in the browser — the wolf stands at once at the stop at the discovery,
  no run in, and the scuffle goes on after „Wznów”.
- To do 5 (files from LPC Wolf, PNG with pixels alone, the picture in the data, the view names no file):
  met; verified below. `SCENE_CREATURES` in `src/browser/sim/data/scene.ts` (gap 2(c)) is the game's
  data: `guidelines/coding-content-data.md` lists `scene.ts` as a content-data file, D-316 says
  "standing in the game's data", and the test of the scene's files reads it. Not a finding.
- To do 6 (credit rows): the wolf row has every part To do 6 and *Settlements to record* row 9 ask, with
  both links; it stands in the credits section D-27 places today (login card, bottom of Siedziba). Gap
  2(b): the parenthesis „zmienione (wycięte klatki)” is true and whole — I verified that no file is
  mirrored; CSS mirrors at drawing time, which does not change the files, and `sprite-credits` asks how
  "the files of the game differ from its source". Not a finding. Gap 2(d): the widened name is right but
  misspelt (M-1); reusing `dust.png` unchanged matches D-271 as written.
- To do 7 (styleguide): the scene section tells the wolf, run, scuffle, outcomes, stops, reduced motion
  and layer order as the code does; `guidelines/styleguide-browser-view.md` keeps its structure.
- To do 8 and rows 1–9: row 1 → D-271 (sentence, *Based on* `lpc-wolf-licence`, *Rejected* from Q1);
  rows 2, 5, 6 → D-316; rows 3, 4 → D-317; row 7 → D-322; row 8 → fact `lpc-wolf-licence`; row 9 →
  `sprite-credits` (wording already on the base, *Rests on* gains `lpc-wolf-licence`); part map row
  added. D-148 written whole as projected. Each changed entry keeps every sentence it had on the base
  (word diff checked). Gap 2(e)/3: the edit of D-322 records row 7, which the task carries without
  naming an entry, in the decision that already says what the scene shows at a stop; within the task.
  D-317 and D-322 agree (play once, stand on the last image, a redraw shows it at once; „Wznów” cutting
  the discovery's effect stays in D-322), and neither contradicts D-311 (window after the effect) or
  D-319 (the walk is no effect, 640 ms, stands at once under reduced motion). No entry names an origin,
  a note, the predecessor's private repository or a task, apart from M-5's wording.

## Trust boundary (`assets/sprites/**`)

- Each of the four files: chunks `IHDR, IDAT, IEND` only, CRCs valid, nothing after `IEND`, RGBA 8-bit,
  no interlace, alpha 0 or 255 only (script `check_wolf.py`, my own, `python -I`).
- Transfer from the source sheet (copied into an empty directory of its own under `.runs/`, scripts kept
  elsewhere, paths as arguments): every frame of every file equals, pixel for pixel (clear pixels
  compared as clear), an unmirrored 64 × 32 cell of the sheet at x = 320 + 64·frame — idle y 288, run
  y 320, bite y 352, death y 192 — 15 frames, 0 without an exact match. Viewed scaled up: all four files
  face left, the death row at y 192 being the left-facing death of the sheet.
- Build: `npm run build` in the clone writes `dist/public/sprites/wolf-*.png` with the same SHA-256 as
  the sources; `npm test -- tests/invariants/test_loop2_container_sprites.py` (Docker) exit 0.
- No URL is built from a name: the only sprite URL is `/sprites/${picture.file}` at
  `src/browser/view/scene-picture.ts:152`, and the files are constants of the data.
- No operation that cannot be undone is in the range.

## Real browser

`npm run local` in the clone, Playwright CLI, an account at `example.test`, game states composed by my
own script (`compose_fight.mjs`: the game's own functions, a manual map run of Las — głębiej saved three
minutes before an attack, checked with `loadSavedGame`) and sent by the ordinary save request. A
run-code script pressed „Wznów” and sampled the scene every 40 ms for 11 s (wolf elements and their
attributes and boxes, the cloud, the effects, the standing) with clipped screenshots. At 1×:
- Defeated: the wolf entered at the reading of minute 185 from x 659 (scene box, px) through 505, 366 to
  178 in about 300 ms, facing left, the cloud hidden until it arrived; one wolf element only; the scuffle
  with the cloud between them stood through minutes 185–189; at 190 the fall effect stood at 178 and was
  gone about 0.39 s later (sampling granularity), the wolf gone with it; mage turned right.
- Death in the fight: the same run in, the scuffle until 212, at 213 the scene `dead` with the wolf
  idle, no cloud; after the end window the scene shows the fallen grey mage lying partly under the wolf's
  head — at the sticks too, not only at the right edge (D-316 accepts that the mage "can lie over the
  nose of the wolf"; for the human to judge on a screenshot).
- First attack (wolf unknown): the stop at the discovery at 185 with the wolf already beside the mage,
  `data-entering` absent, cloud standing; after „Wznów” the scuffle went on, and the wolf fell at 190.
- Not run: a departure (no seed found), a map solved in the combat, the right edge, reduced motion, 16×,
  and a flash measurement — these rest on the tests and on the author's own run.
No screenshot was kept or pushed; all were deleted with the clone.

## Tests

The new tests assert behaviour and could fail: the scene-picture tests compute sides, places and
effects from explicit inputs; the jsdom tests check elements, attributes and computed styles, including
that a sheet's animation end does not end the run in (target check) and that each stop pauses the bite
frames and the cloud. The changed `tests/view/icons.test.mjs` (+60 −60, most of it indentation) changes
its expectation for new data, the wolf row, with the reason in the task, as *Changing an existing test*
allows; its only wrong expectation is the typo of M-1. No invariant test changed. The own-work check
named the weakest requirement (flashes, stops, the four outcomes) and checked it in the browser; it did
not consider readings that carry two events, where I-1 lies.

## Declined to judge

none

## Checks run (in the clone of the head)

- `npm ci` and `npm run build` — exit 0.
- `node --test tests/view/scene-picture.test.mjs tests/view/scene.test.mjs tests/view/icons.test.mjs` —
  exit 0, 170 pass.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors".
- `npm test -- tests/quality/test_quality_invariants.py` (fresh `.runs/quality-venv` from
  `requirements-quality.txt`) — exit 0.
- `npm test -- tests/invariants/test_content_identifiers.py`, `test_cross_part_imports.py`,
  `test_browser_view_token_values.py`, `test_icon_credits.py`, `test_browser_view_framework.py` — each
  exit 0.
- `npm test -- tests/invariants/test_loop2_container_sprites.py` — exit 0 (Docker).
- `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/data/scene.ts:85-131"`
  (the changed simulation file) — exit 0; Stryker generated 0 mutants in the range (constants and types
  only), so it says nothing either way.
- Scripts of my own: `check_wolf.py` (chunks and pixel transfer), a viewer of the sheet and files, a
  UTF-8/U+FFFD/CRLF/BOM check of every changed text file, a scan of non-ASCII words of the added lines,
  `attack_with_gather.mjs` and helpers (I-1), the browser run above. All passed except as the findings
  say.
- Not run: the full `npm test` and the full gate (the cycle's own run).

## Reaches beyond the selection

- `src/browser/sim/run.ts:515-783` (`minuteBeforePick`, `finishMinute`) — to see whether death can
  happen inside a combat and whether a gathering's end and an attack fall in one minute (I-1).
- `src/browser/sim/data/maps.ts`, `skills.ts`, `actions.ts`, `tests/sim/program-fixture.mjs`,
  `tests/sim/understanding-fixture.mjs`, `.claude/skills/loop2-play/SKILL.md` and its `compose-state.mjs`,
  `frames.js`, `save-frames.mjs` — to compose game states and run the game.
- `src/browser/view/clock.ts` (`TICK_MS` 200) — the minutes per reading at 16× (I-1).
- `foundations/environment_facts.md` § `cc-by-3-adaptation-credit`, `lpc-wolf-licence`;
  `foundations/invariants.md` § `sprite-credits`, `sprite-file-content`, `loop2-container-sprites` —
  read whole, for the credit and the boundary.

## Unread material

Decisions of my selection (Scope naming `browser-view`, `simulation`, `product-foundation` or
`agent-workflow`, plus those the task names): 346. Read whole: 30 — D-04, D-27, D-42, D-43, D-62, D-71,
D-122, D-132, D-140, D-141, D-143, D-146, D-147, D-148, D-271, D-272, D-273, D-311, D-314, D-315, D-316,
D-317, D-318, D-319, D-320, D-321, D-322, D-349, D-366, D-367. By title only: 316, among them D-39,
D-364, D-365, D-372, D-373 and D-362, D-363, D-368, whose titles point to the scene's other effects, the
end window and the gathering, not to the wolf. Not read: the invariant `design-token-contrast` (the range
changes no token), the fact `wcag-three-flashes` beyond D-317's quotation of it, the glossary (no term
was in question). Guideline files read whole: `guidelines/coding.md`, `coding-content-data.md`,
`coding-browser-module.md`, `testing.md`, `styleguide-browser-view.md`. Not read:
`guidelines/coding-simulation-module.md` (the range changes no simulation module but the data file) and
`.the-way/task-cycle/change/ui_check.md`.

## Searches not found or unclear

- No seed of my composer gave a departed wolf (`dodge` with dodging practice paid in): the departure
  was not seen in the browser.
- The fallen mage lying partly under the wolf's head at the sticks: whether that reads well is the
  human's to judge (D-316 accepts the overlap).
