# Author report — task wilk-wbiega (the whole change, one author)

**Status: done**

The run was cut off once (the harness's limit on background agents, about 20:50). What I found in the
worktree when I continued: HEAD at the base `7ff7c729`, uncommitted changes in `scene.ts` (data),
`styles.css`, `scene-picture.ts`, `scene.tsx` and the four new PNGs. I treated them as my own unfinished
work: I re-ran the pixel comparison of the four PNGs (0 differing pixels of 30,720), reviewed the diff and
then ran the game in a real browser. The browser showed one real bug that no earlier check had caught:
`Creature` and `Scuffle` were siblings with the same React key (`fight:181`), so every redraw added another
wolf element (elements accumulated in the DOM and a second wolf ran beside the standing one). Fixed with
distinct keys (`creature-…`, `scuffle-…`). The jsdom tests I wrote catch it (reintroduced for a moment: five
tests failed; restored; 69 pass).

## Commits (branch `task/wilk-wbiega`, author address private, checked with `git log --format='%h %ae'`)

- `2f144fdb` feat — the wolf in the scene: 4 PNGs, data, picture/effect code, view, CSS, tests
- `8a1a2cfb` feat — credits rows (LPC Wolf row; the dust row widened) and their test
- `ab8c1606` docs — foundation: D-271, D-148, D-316, D-317, D-322, fact `lpc-wolf-licence`, invariant
  `sprite-credits` (Rests on), part map External context row
- `e717ec0f` docs — styleguide part "The scene of a map run"

Files changed (added/removed lines): see `git diff --stat 7ff7c729..HEAD`. In short: 4 new PNGs
(`assets/sprites/wolf-idle.png` 64×32 ×1 frame, `wolf-run.png` 5 frames, `wolf-bite.png` 5 frames,
`wolf-death.png` 4 frames), `src/browser/sim/data/scene.ts` (+48), `src/browser/view/scene-picture.ts`
(+~200), `src/browser/view/scene.tsx` (+~190), `src/browser/styles.css` (+~120),
`src/browser/view/credits.ts`, tests `tests/view/scene-picture.test.mjs` (+~250), `tests/view/scene.test.mjs`
(+~300), `tests/view/icons.test.mjs`, `foundations/*.md` (decisions, environment_facts, invariants,
part_map), `guidelines/styleguide-browser-view.md`.

## What was built (against the task's To do)

1. Run in: effect `creatureIn` made by `creatureEffect` in the reading whose events carry exactly one of
   `attacked`/`combatEnded` and it is `attacked`, only where the scene goes on (`standing === "going"`).
   The wolf element itself comes from state (`activeCombat`), so after a load / return to the screen / reduced
   motion it stands at once; the effect is only an attribute `data-entering` on that element: 300 ms linear
   from the right edge (`--from-x`), run sheet shown, its 5 frames played once. Mage turns toward the wolf
   (`facing` in the scene's kept `Shown`, set once the mage stands still, kept after the fight).
2. Scuffle: state-derived (`activeCombat !== null`): bite sheet looping at 160 ms/frame, mage idle, the
   cloud (the dust's file) between them looping at the beat; no effect, lasts the combat minutes.
3. Outcome: `creatureDown` (defeated: 4 death frames in 300 ms, lies, gone), `creatureOut` (departed: runs to
   the right edge in 300 ms, facing right); `characterDied` → no effect, wolf stays idle (state: `death.cause
   === "combat"`); completion in the combat (`completion` and `lastCombat.result === null`) → wolf stays
   idle. Overdue (two marks in one reading) and any reading at a stop → none. Reduced motion: still image
   ≤ 300 ms (`scene-effect` life outside the media block).
4. First attack: stop at the discovery shows the wolf already beside the mage (no run, standing is not
   `going`), frames paused (new element under paused play state sits on frame 0), the scuffle starts at „Wznów”.
5. The picture stands in the data: `SCENE_CREATURES` (keyed by `CreatureId`) and `SCENE_FIGHT` in
   `src/browser/sim/data/scene.ts`; the view names no wolf file (grep of `scene*.ts*` for "wolf"/"wilk" finds
   nothing). `tests/view/scene-picture.test.mjs` "every file the scene's data names…" now includes the wolf's
   four files (seen failing with a wolf file moved away: 2 failures; restored).
6. Credits rows: `PACK_CREDITS` in `src/browser/view/credits.ts` (where the credits stand today: footer-less
   today, the folded "Autorzy grafiki" section on the login card and at the bottom of Siedziba — one
   component `credits-section.tsx`): "Wilk: „[LPC] Wolf Animation”, Stephen „Redshrike” Challener (grafika),
   William.Thompsonj (współtwórca), opengameart.org, CC BY 3.0, zmienione (wycięte klatki)", links to
   https://opengameart.org/content/lpc-wolf-animation and http://creativecommons.org/licenses/by/3.0/; the dust
   row's name is now "Kurz i obłok walki". (The task's example parenthesis "wycięte klatki, odbicie" came out
   as "wycięte klatki": no file is mirrored; CSS mirrors.)
7. Styleguide: paragraphs on the wolf, run, scuffle, outcome, stops, reduced motion; layer order; Good/Bad.
8. Foundation: see below.

## Checks (command and exit code)

- `npm test -- tests/view/scene-picture.test.mjs` exit 0 (69 pass); before my tests: 62 pass, exit 0
- `npm test -- tests/view/scene.test.mjs` exit 0 (69 pass); with the duplicate key reintroduced: exit 1
  (5 fail), restored: exit 0
- `npm test -- tests/view/icons.test.mjs` exit 0 (32 pass)
- `node --test tests/view/*.test.mjs` exit 0 (1210 pass, 0 fail) — all view tests
- `npm test -- tests/invariants/test_loop2_container_sprites.py` exit 0 (Docker answered, 84 s; the built
  image served every sprite, the wolf's four files included, with the file's bytes)
- `npm test -- tests/quality/test_quality_invariants.py` exit 0 (eslint, prettier, ruff, shellcheck)
- `npm test -- tests/invariants/test_browser_view_token_values.py` exit 0; `test_content_identifiers.py` 0;
  `test_cross_part_imports.py` 0; `test_browser_view_framework.py` 0; `test_application_build_output.py` 0;
  `test_icon_credits.py` 0
- `python -B .the-way/elements/common/foundation_check.py` exit 0 ("0 errors"), also with
  `--skip-test-citations` exit 0
- NOT run: the full `npm test` (the orchestrator's). No check failed on the base (base gate: 542 tests, exit 0).

The invariant `loop2-container-sprites` has no new test of its own (its set is every PNG in the directory; the
view test ties the drawing's files to it); I saw its view test fail once (a wolf file removed) and pass again.
`sprite-credits` stays Method `review` (a test cannot know which packs lie under `assets/sprites/`); the
credits lines are tested in `icons.test.mjs`. `sprite-file-content` (review, D-273): no refusal test, as D-273
says.

## Trust boundary (`assets/sprites/**`): what I verified

- Each new file is a PNG holding pixels alone: chunks `IHDR, IDAT, IEND` only (read from the bytes; the test
  `the wolf's files hold pixels alone…` asserts the chunk list), RGBA 8-bit, alpha 0 or 255 only.
- Pixels = the source's pixels: script `.runs/wolf-scripts/verify_sprites.py` compares every pixel of each
  file with the source cell of `wolfsheet1.png` (64×32 cells at x = 320 + 64·frame): idle y=288 frame 0;
  run y=320 frames 0–4; bite y=352 frames 0–4; death y=192 frames 0–3. Result: 0 differing pixels in each file
  (2,048 / 10,240 / 10,240 / 8,192). No frame is mirrored or recoloured; I used the pack's own left-facing set
  (the bottom set of the sheet).
- The build copies with the same bytes: the container invariant test passed.
- Untrusted data handling: the pack sheets and the Smoke & Fire file were copied to `.runs/wolf-src/` and
  `.runs/dust-src/` (own directories), the scripts live in `.runs/wolf-scripts/`, paths passed as arguments,
  Python run with `-I`. The dust file was not recoloured again (see choices); `dust.png` is unchanged.

## Own-work check (section 3)

Weakest requirement: "no flashes; reduced motion stands still; the first attack's stop; the four outcomes" —
shown in the running game, not by code inspection (`npm run local`, Playwright CLI, scenes composed with the
simulation: `.runs/wolf-scripts/compose.mjs` advances a real map run to minute 177–180 with a fixed attack
draw, so the real attack, combat and outcome run on the page at 1×):
- Run in at 1×: wolf enters from the right edge and stops beside the mage (frames at +1.25 s, 1.34 s, 1.45 s),
  scuffle bites with the cloud between them for the five seconds; defeated (kick program): wolf falls and lies
  ~300 ms, then none; departed (dodge program): runs off right, mirrored; death in the fight (low health):
  mage falls left, wolf stands idle, no cloud; at the right edge (explore, mage at 275): wolf runs in past
  the mage and stands on its left, mirrored, mage turned left; first attack (new game, wolf unknown): stop at
  the discovery, wolf beside the mage, frozen on frame 0, plaques out; reduced motion
  (`emulateMedia reducedMotion: reduce`): wolf at once, frames still, defeated = a lying wolf for ~300 ms.
  Not shown in the browser: a departing wolf at the right edge (wolf left of the mage runs through the mage's
  place; code path is the same, geometry covered by unit tests); completion in the combat (covered by tests
  only; needs a map solved in the combat).
- Flashes: 100 screenshots of the scene every ~42 ms over the scuffle (1.7–5.8 s): the largest change between two
  consecutive shots is 3,576 px of 204,288 (luminance step > 25), the mean luminance of the scene stays within
  0.75/255. By computation: the wolf's frame is 64×32 pixels of the picture = 8,192 screen px, the cloud 16×16 =
  1,024, both under 21,824 (D-317). No effect darkens or lights the whole area.
- Screenshots: inspected in the session and kept nowhere (not pushed; no repository holds one).

## Choices I made (the orchestrator enters them)

1. **Which sheet**: `wolfsheet1.png` (the old game's; brown). Rejected: sheets 2–6, recolours of the same
   frames (checked visually on the scene's snow). Cost if wrong: replace four files with the same script
   (`.runs/wolf-scripts/make_sprites.py`) and the credit line stays true.
2. **Cut and frame**: common frame 64×32, bottom-aligned (the pack's cells already have the feet on the last
   row, checked on all frames), facing left as the pack draws the bottom set; no mirrored file, scale 1:1 of the
   picture (drawn at ×2 with the scene, D-349); idle = the walk row's first frame (the pack has no idle row).
   Rejected: the top (right-facing) set mirrored at cutting, as the old game did — the wolf stands on the right
   of the mage, so the left-facing set needs no mirroring in the common case and the credit says only "cut
   frames". Cost if wrong: rebuild the files; the credit parenthesis gains "odbicie".
3. **Where the picture stands in the data**: `SCENE_CREATURES` in `src/browser/sim/data/scene.ts` keyed by
   `CreatureId` (as `SCENE_MAGES` is keyed by archetype), not in `creatures.ts` (the rules of the creature).
   Cost if wrong: move the constant.
4. **Cloud of the scuffle = `dust.png` reused**, no new file, no new credit beyond the dust row's wider name:
   its 8 frames loop at 160 ms (full cloud to scraps, then back to the full cloud). Rejected: a new recoloured
   file / a ping-pong order — more files and more pixel work. Cost if wrong: add a file recoloured the way task 17
   did and change its data entry.
5. **The wolf's side**: by geometry (the right side if the 64-px frame, 2 px from the figure, stays inside the
   336-px picture, else the left), not by comparing with `rightEdgeX`. It gives the same result at every place
   of the data (right everywhere except at 275; at the berry bush 224 the frame ends at 335 of 336 — one pixel
   of margin). Cost if wrong: a change of `SCENE_FIGHT.gap` or of the mage's places can flip a place.
6. **Gap 2 px, cloud 3 px above the ground line**, chosen by looking at the scene at its one size (`SCENE_FIGHT`
   in the data; no token: they are scene pixels). The values are mine; judge on a screenshot.
7. **Run-in as an attribute on the state-derived wolf** (not a separate overlay), so that "stands at once" after
   a load and under reduced motion is the default; under reduced motion the effect state stays unconsumed (no
   animation end) and is harmless (only used while a matching key stands, CSS rules for it are inside the
   `no-preference` block). Frames of the run (5), the fall (4) and the departure (5) play once through the 300 ms,
   as the dust's eight do (precedent: D-366) — not at the 160 ms beat. Cost if wrong: change the durations in one
   rule.
8. **Layer order**: wolf under the mage (it passes behind it at the right edge), the cloud over both, all under
   the tint. Accepted effect: at the right edge the mage that falls toward the middle lies over the nose of the
   wolf (seen in the game; recorded in D-316's Rationale).
9. **Mage turns only when standing** (not mid-walk), and keeps its facing after the fight.
10. **Foundation placement of the rows**: row 1 → D-271 (sentence: the game takes LPC Wolf under CC BY 3.0, plus
    *Based on* `lpc-wolf-licence`, Rationale and *Rejected* from Q1); rows 2, 5, 6 → D-316; rows 3, 4 → D-317;
    row 7 → D-322 (one sentence plus Verification and *Rejected*: the stop at the first attack); row 8 → fact
    `lpc-wolf-licence`; row 9 → `sprite-credits` (the entry already had the row-9 wording from task 17; I added
    `lpc-wolf-licence` to *Rests on*; Method stays `review`); part map row for the LPC Wolf pack (`them → us`,
    `untrusted`); D-148 changed whole as projected (+ `derives from D-316`).

Entries written (marker; one sentence English / Polish):
- D-271 `row 1` — the scene's pictures include the wolf from LPC Wolf, the game takes it under CC BY 3.0 and
  credits it; the cloud of a scuffle is the Smoke & Fire sprite / Wilk z LPC Wolf na licencji CC BY 3.0 z wzmianką,
  obłok szamotaniny z paczki Smoke & Fire. Every sentence the entry had (CSS layers, 3:1, specks, cold layer) kept.
- D-148 `projected` — the creature appears in the text and in the scene, not in the terrain drawing / stworzenie
  jest w tekście i w scenie, nie w rysunku terenu.
- D-316 `projected` + `rows 2, 5, 6` — the scene draws what attacks the character; it runs in, stands beside the
  mage, scuffles, falls/leaves/stays by outcome / wilk wbiega, stoi obok maga, szamotanina, wynik. All earlier
  sentences kept (props, campfire, tint 20 %, return over 2 s…).
- D-317 `projected` + `rows 3, 4` — what is an effect of an ordinary event and what is not; the three moments
  have no limit; the whole reduced-motion rule; no flash / co jest efektem zwykłego zdarzenia, ruch pod
  ograniczeniem, chwile bez limitu. *Rejected* now holds the ways from the task's questions (it was "none
  considered"). Does not contradict D-322, D-311, D-319.
- D-322 `row 7` — at the stop of the first attack the creature stands beside the mage, no run, the scuffle
  begins at „Wznów” / przy pierwszej napaści wilk stoi od razu obok maga.
- `lpc-wolf-licence` `row 8` — the page's author, collaborator, five licences, link of CC-BY 3.0, the credit it
  asks for / strona paczki: licencje, wzmianka. I read the page myself on 2026-11-12 (WebFetch got 403; `curl`
  got 200); it says exactly what the task quotes; the archived copy is the existing snapshot
  `web.archive.org/web/20261030052334/…` (read: the passages are in it).
- `sprite-credits` `row 9` — Rests on gains `lpc-wolf-licence`.
- part map External context — the LPC Wolf pack, `them → us`, `untrusted`.
- No glossary entry written (no word needed one).

Where the task's text and the code/foundation differ: (a) the task says D-316's projected wording has "the moment
of the map run"; I wrote "how the map run stands" (the code's `SceneStanding`) because "moment" is the term of
the three moments in D-322; (b) the task's example credit parenthesis "wycięte klatki, odbicie" came out
"wycięte klatki"; (c) the task says the picture of the creature stands "in the creature's data" — I put it in
the scene's data (choice 3); (d) the task's *Context* says dust/Smoke & Fire row by task 17 has the name "Kurz":
widened to "Kurz i obłok walki"; (e) `sprite-credits` already had the full row-9 wording on the base.

## Reaches beyond the handoff

- `tests/view/icons.test.mjs` (the credits test) — to update the dust row's name and add the wolf row.
- `src/browser/sim/data/creatures.ts`, `src/browser/sim/run.ts`, `src/browser/sim/game.ts`, `types.ts` — read only,
  for the combat events and state (`attacked`, `combatEnded`, `activeCombat`, `lastCombat`, `death.cause`).
- `tests/sim/understanding-fixture.mjs`, `tests/sim/program-fixture.mjs` — used by my scene composer in `.runs/`.
- Foundation: `foundations/glossary.md` not read whole (no term needed); D-311, D-141, D-27, D-62, D-122, D-132 read
  only as far as D-317/D-322 touch them (D-322 whole; D-311, D-27 by search); `.the-way/elements/decisions`,
  `environment-facts`, `invariants`, `part-map` skills (SKILL.md, templates read; `projected.md`, `write.md`,
  `examples.md` of the elements not opened).
- `.runs/` only for my own scripts, sources, screenshots; nothing tracked outside the listed files.

## Unread material

- `foundations/` entries from the handoff's wide list ("the other decisions whose *Scope* names browser-view…,
  D-04, D-39, D-42, D-62, D-122, D-132, D-311, D-314, D-315, D-362 to D-373"): not read whole; I read D-141 (by
  search), D-147, D-148, D-271–D-273 (D-272, D-273 whole), D-316–D-322 whole, D-349 by search, D-27 by search.
  Invariants `design-token-contrast`: not read; `sprite-file-content`, `loop2-container-sprites`: read through
  their tests and D-271/D-273.
- Environment facts `pixel-crawler-terms`, `smoke-fire-particle-licence`, `cc-by-3-*`, `game-icons-licence`,
  `wcag-three-flashes`: read `smoke-fire-particle-licence`, `pixel-crawler-terms`, both `cc-by-3-*` and
  `game-icons-licence` (whole); `wcag-three-flashes` only as D-317 cites it.
- `guidelines/coding-simulation-module.md`: not read (I changed no simulation module); `guidelines/testing.md`
  (465 lines): read selectively (the trust-boundary and invariant-test parts), not whole; `guidelines/styleguide-
  browser-view.md`: read the scene section whole, the rest by headings.
- `.the-way/task-cycle/change/ui_check.md`: not opened — the check of the user interface was made in the real
  game by the playbook `loop2-play`; `reserved_choices.md`: not needed (no reserved choice).
- `the notes on the packs in the predecessor game's repository` lines 30–50: read; nothing from it copied.
- The pack's pages for the old game's `howl.png` and the five other sheets: not used.

## Searches not found or unclear

- "Creature's data" in the task (To do 5) — the creature's rules file `creatures.ts` holds no picture; the scene's
  data holds the pictures of everything the scene draws (choice 3).
- The footer of the game: `src/browser/view/footer.ts` named in the task's *Need* does not exist; the credits stand
  in `credits-section.tsx` (login card, bottom of Siedziba).
- Task 24 (`spokojniejszy-wyglad`) is not merged: rows are where the credits stand today.
- `guidelines/testing.md` "seen failing" for the credit lines: not applicable (invariant has Method review).
- Unclear: whether the departing wolf standing on the left of the mage (mage at the right edge) should run
  through the mage to the right edge ("za brzeg kadru, z którego przyszedł" says yes); I did that and drew the
  wolf behind the mage. Not seen in the browser.

## Problems as observed

- The duplicate React key (above): found in the browser by counting `.scene-creature` elements during the run;
  cause verified (two siblings, same key; fixed → one element).
- Python on this machine writes files in the console code page unless `encoding="utf-8"` is given: my first
  write of `credits.ts`, `icons.test.mjs` (Polish text) and the `×` in two test files came out as invalid UTF-8 /
  U+FFFD; found by a byte check and fixed (all changed files are valid UTF-8, no U+FFFD; the committed files are
  the fixed ones).
- A composed save with a hand-set `run.minute` is refused as corrupt ("shape"); the composer advances the run with
  `advanceMinutes` instead (kept in `.runs/wolf-scripts/compose.mjs`, not in the repository).
