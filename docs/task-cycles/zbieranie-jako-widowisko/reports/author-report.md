# Author report — Zbieranie jako widowisko (one author of the whole change)

**Status:** done with concerns (concerns listed at the end; the session was killed once by a computer
restart and resumed; the work below was finished after the restart, from the committed state).

## Commits (on `task/zbieranie-jako-widowisko`, base `211a4ea`)

- `6780cf5` feat: the two sprite files `assets/sprites/mage-bend.png` and `assets/sprites/dust.png`
- `af19716` feat: bending, flying icon, dust, credit row (data, drawing, scene, stylesheet, credits, footer, icons test)
- `a5a9610` test: the scene's new behaviour (scene and scene-picture tests)
- `034a336` fix: bend sheet faces right, arc of the icon lowered
- `6019d7a` docs: foundation entries and styleguide

Files changed (added/removed lines, `git diff --stat 211a4ea HEAD`): `foundations/decisions.md` +96/-…,
`foundations/environment_facts.md` +6, `foundations/invariants.md` +10, `foundations/part_map.md` +1,
`guidelines/styleguide-browser-view.md` +26, `src/browser/sim/data/scene.ts` +39,
`src/browser/styles.css` +117, `src/browser/view/credits-section.tsx` +8, `credits.ts` +34,
`footer.ts` +33, `scene-picture.ts` +115, `scene.tsx` +122, `tests/view/icons.test.mjs` +71,
`tests/view/scene-picture.test.mjs` +171, `tests/view/scene.test.mjs` +422, two PNG files. 17 files,
1217 insertions, 54 deletions in all.

## What was made

- **Bend sheet** `mage-bend.png` (256 × 64, 4 frames of 64 × 64): made by hand from the earlier session's
  grids in `.runs/work/`. Frames: full bend, half bend, standing frame (frame 0 of `mage-idle.png`),
  half bend. Placed at (19, 31) of the 64 × 64 frame, which I verified is where `base.png` sits in
  frame 0 of `mage-idle.png` (pixel-exact match). 12 colours of the mage only. Hand fix of the
  half-bend frame: the notch in the outline at the hand (rows 26–27) closed; 5 pixels differ from the
  earlier session's frame. The trunk lean was left as the earlier session made it.
- **Dust** `dust.png` (128 × 16, 8 frames): the eight smoke cells of the pack file (rows 0 and 1 of the
  4 × 4 sheet) recoloured by a map of the pack's five greys to five browns taken from pixels of
  `forest-scene.png` (`#7b5536`, `#614941`, `#5a3d23`, `#352b28`) and `sticks.png`/`fire.png`
  (`#88673f`); each is at least 3.13:1 against the ground `#bccae5` (computed). Nothing else of the pack
  entered the repository.
- **Data** (`scene.ts`): `bend` in `SCENE_MAGES`, `SCENE_DUST`, `SCENE_EFFECTS` (landing point on the mage,
  feet point, dust sink, arc).
- **Drawing** (`scene-picture.ts`): `mage.bend`, `mage.bending`, and the pure `sceneEffect(before, after,
  events, mageX)`.
- **Scene** (`scene.tsx`): third mage sheet always in the DOM; `data-bending`; the scene keeps the state
  of its previous reading and the list of one effect, renders the dust before the mage and the flight
  after it, and drops an effect at the end of its animation. No new field of the game state or save (D-04).
- **Stylesheet**: bend sheet shown instead of the idle sheet while bending; turned back to face right for a
  mage that walked left; effect life 300 ms at every motion setting; movement (arc, dust frames) only
  under `no-preference`.
- **Credits**: `PACK_CREDITS` in `credits.ts`; `footerCredits()` returns the icons then the pack; the
  footer and the section of credits use `sourceSite`.
- **Foundation**: D-362, D-363, D-364 (rows 1–3), D-317 and D-271 changed (parts), fact
  `smoke-fire-particle-licence`, invariant `sprite-credits` (row 4), part map row, styleguide section.

## Foundation entries (WAY-134 form: meaning in English / in Polish; mark)

- D-362 (row 1): the mage bends in a loop through the whole gathering at the scene's beat; Mag schyla się w pętli przez całe zbieranie w stałym takcie klatek sceny.
- D-363 (row 2): the icon of the gathered resource flies on a `panel` plaque from the prop (or the feet) to the mage, one per „Obchód”; Ikona zebranego zasobu leci na plakietce `panel` z rekwizytu (z włókna spod stóp) do maga, jedna za „Obchód”.
- D-364 (row 3): the dust of a missed „Zbierz” stands at the prop, under the feet for fibre; Kurz chybionego „Zbierz” staje przy rekwizycie, przy włóknie pod stopami.
- `sprite-credits` (row 4, projected): the credits hold a full line for each pack that asks for one; Wzmianki mają pełny wiersz dla każdej paczki, której licencja żąda wzmianki. Method `review`.
- `smoke-fire-particle-licence` (projected): the page gives KnoblePersona and CC-BY 3.0 with the link; Strona paczki podaje KnoblePersona i CC-BY 3.0 z odnośnikiem.
- D-317 (projected, the part): effects of ordinary events last at most 300 ms, no text, overdue ones dropped; Efekt zwykłego zdarzenia trwa najwyżej 300 ms, bez tekstu, zaległy przepada.
- D-271 (projected, the part): the dust is a recoloured sprite of the second pack and the game credits each pack that asks; Kurz jest przekolorowanym obrazkiem drugiej paczki, a gra wymienia każdą paczkę, która tego żąda.
- Part map `External context` row for the pack (projected).
- Styleguide section "The scene of a map run" (projected).
- The text of the fact was taken from the page I read (2026-11-11, saved in `.runs/dust-download/page.html`):
  author `KnoblePersona`, licence `CC-BY 3.0`, link `http://creativecommons.org/licenses/by/3.0/`. The page
  says what the task quotes. The archived copy cited is the closest one found (2026-09-29), whose text I
  checked for the same three strings. The citation of the link address is accepted by
  `foundation_check.py` (0 errors), so the fallback of the definition's note was not needed.
- D-27 still says only icons are credited in the footer; the footer now also holds the pack row.
  Task 24 rewrites D-27; I left it (not in To do 8). A mismatch for the orchestrator.

## Choices made (and the way not taken)

1. **Previous reading**: the scene keeps the previous `GameState` it was given and compares the carried
   amount of the gathered resource, with exactly one `activityFinished` of a gather/patrol in the call's
   events. Not taken: a new field in the game state (D-04 forbids).
2. **Overdue effects**: a reading with more than one end of a gathering shows none; an effect whose turn
   comes at a stop (pause, discovery, death, completion) or at a map run started is dropped; a newer effect
   replaces a still running one. Not taken: show the last end of a batch (its hit/miss cannot be told
   from the backpack alone), or show a frozen effect over a discovery. Cost if wrong: a gathering at a
   discovery or after a catch-up shows no icon/dust.
3. **Timings**: effects 300 ms; dust runs its 8 frames once in 300 ms (37.5 ms each); flight: 300 ms,
   x linear, y ease-out up to 6 scene pixels above the higher end then ease-in down. Bend loop 4 frames
   at 160 ms (640 ms); first frame (full bend) is the reduced-motion frame. Not taken: 4 dust frames at 75 ms.
4. **Frame order**: full bend, half, standing, half. Not taken: half, full, half (a doubled half frame at
   the wrap).
5. **Dust colours**: the brown ramp above. Not taken: darker ramp (`#614941`…`#281c0d`), flatter ramp.
6. **Under reduced motion** the icon stands on its plaque at the place it lands (the end of the
   movement), the dust on its first frame; both vanish after 300 ms by a CSS visibility animation that
   runs at every motion setting (so `animationend` removes them). Not taken: the icon at the prop.
7. **Facing**: the bend sheet always faces right (turns back the mirror), because the mage walks left
   to the sticks and the moss and would bend with its back to the prop. Not in the task; cost if wrong:
   the bending mage does not mirror like the idle one.
8. **Credit row**: `Kurz: „Smoke & Fire Animated Particle [16x16]”, KnoblePersona, opengameart.org, CC BY 3.0,
   zmienione (przekolorowane)`; the licence link is `http://…` as the task and the page give it (the icon
   rows use `https://`).
9. Existing tests of the icon credits changed (`tests/view/icons.test.mjs`): the footer and the section now
   hold one more line after the icons; each assertion about icon lines is kept over the icon lines and a
   new test checks the pack line (text and both links). Reason: To do 7.

## Checks (command and exit code)

- `npm run typecheck` — 0
- `npx prettier --check src tests/view` — 0; `npx eslint src/browser tests/view/{scene,scene-picture,icons}.test.mjs` — 0
- `npm test -- tests/view/icons.test.mjs` — 0 (33 pass)
- `npm test -- tests/view/scene.test.mjs` — 0 (33 pass, new 14)
- `npm test -- tests/view/scene-picture.test.mjs` — 0 (37 pass)
- `npm test -- tests/view/run-screen.test.mjs` / `world-area.test.mjs` / `account-screen.test.mjs` — 0 each
- `npm test -- tests/invariants/test_browser_view_token_values.py` / `test_content_identifiers.py` /
  `test_design_token_sources.py` / `test_cross_part_imports.py` / `test_simulation_isolation.py` /
  `test_icon_credits.py` / `test_design_token_contrast.py` — 0 each (icon credits 5 tests OK)
- `python -B .the-way/elements/common/foundation_check.py` — 0 errors (also with `--skip-test-citations` between entries)
- `npm test -- tests/invariants/test_application_build_output.py` — 0 (7 tests OK in 233 s; it finished after my first return). Also `test_design_token_contrast.py` and `test_application_package_layout.py` — 0 each
- Not run: the full `npm test` (the orchestrator's); `tests/invariants/test_loop2_container_sprites.py`
  (needs Docker; not run here — the set it reads is every `.png` in `assets/sprites/`, so both new files
  are in it; `tests/view/scene-picture.test.mjs` ties the data's file names to existing files and passes).
- No invariant of a `test` method is new (`sprite-credits` is `review`), so no failing run was needed. For
  the tests I wrote the breaks they catch: `gained`/`kind==="gather"` swapped (hit vs miss tests),
  `ends.length !== 1` weakened (two-ends test), the `standing === "going"` gate removed (stop test), the key
  shared with the mage (the first run of the existing tests failed for it: "two children with the same key";
  fixed by the key `effect-N`), the facing turn-back removed (facing test), the effect not removed at
  `animationend` (end test). I did not run each mutation.

## Own-work check (section 3)

- Requirement most likely not met: "lot ikony i kurz ... najwyżej 300 ms ... pod ustawieniem ograniczenia ruchu
  pojawiają się na swoim miejscu" and that the mage bends through the whole gathering at all paces.
- Checks and what they showed: (a) real browser (Playwright CLI, `npm run local`, made-up account
  `agent@example.test`, a composed state with a program of „Zbierz — Patyk”): the mage's bend animation
  runs (`.scene-mage-bend`, frames change at about 160 ms in a stream of frames), the dust stands at the
  sticks (frozen at 15 ms for the screenshot) and the icon is mid-flight beside the mage under the badge
  (frozen at 140 ms); a dead mage shows the idle sheet, not the bend. (b) jsdom: the computed
  `animation-duration` of the effect is 300 ms, `animation-play-state` is `paused` for an effect at a
  pause, the effect element is dropped at the end of its own animation and kept at a child's.
- **Not checked in a real browser**: the reduced-motion setting (jsdom reads no `@media` rule of a
  feature; I did not emulate it in the browser), the pace 8×/16×, the fibre path in the browser, the
  `animationend` removal in a real browser (jsdom: React listens under the name `webkitAnimationEnd` there,
  so the test fires both names). I found the first run of an earlier check unreliable because the effect
  was replaced before my screenshot (the dust lasts until the next gathering end when its animation is
  frozen by my script); fixed by taking the screenshot in the same page call.

## Screenshots (in `.playwright-cli/` of the worktree, ignored; not pushed)

- `.playwright-cli/dust-miss.png` — the whole page of the map run
  at 1×, with the scene: the mage in the full bend frame (facing right) and the cloud of dust (first frame)
  on the snow beside the sticks, the badge over its head. Only the account `agent@example.test` stands behind
  it (no address shown on the page).
- `.playwright-cli/flight-hit.png` — the same, the icon of the
  stick on its `panel` plaque mid-flight under the badge, the mage bending.
- Cropped views of the scene: `.playwright-cli/scene-crop.png` (dust), `scene-crop2.png` (flight),
  `bend-loop.png` (eight frames of the loop at 160 ms). Note: the arc was lowered (14 → 6 pixels) after
  I saw the plaque cover the badge at its peak; `flight-hit.png` is taken after that change; `dust-miss.png`
  is taken with the bend facing fix, before the arc change (no effect on it).
- The game start was ended with `npm run local:stop`; frames, state and snapshot files deleted.

## Reaches beyond the handoff (section 1)

- `.the-way/task-cycle/change/ui_check.md` (named in `make-change` section 3).
- `.the-way/elements/decisions/{template,examples,skill/*}.md`, `common/{way_of_working,rules}.md`,
  `invariants/{template,skill/*}`, `environment-facts/{template,skill/write}`, `part-map/template.md`
  (element skills for the foundation step).
- `tests/view/page-document.mjs` (helpers for the jsdom tests), `tests/sim/{program,understanding}-fixture.mjs`,
  `.claude/skills/loop2-play/compose-state.mjs`, `frames.js`, `save-frames.mjs`.
- `foundations/decisions.md` D-66 not read whole (only cited); `grep` for the entries of D-316 to D-322, D-271,
  D-273 read whole.

## Unread material

- Decisions D-03, D-04, D-18, D-27, D-43, D-65, D-66, D-67, D-71, D-125, D-197, D-242, D-267, D-291, D-314,
  D-315, D-321, D-349 of the handoff list: not read whole in this session (the task quotes their binding
  sentences in *Decisions in play*, which I read). Read whole: D-271, D-273, D-316 to D-320, D-322.
- Invariants `browser-view-framework`, `design-token-contrast`, `design-token-sources`, `icon-file-content`,
  `loop2-container-icons`, `action-in-progress`, `player-map-run-pace`, `map-run-layout`, `font-file-provenance`,
  `content-identifiers`'s text: not read whole (their tests were run where named above). Read whole:
  `catch-up-state`, `catch-up-minutes`, `sprite-file-content`, `loop2-container-sprites`, `icon-file-content`,
  `icon-credits`, `loop2-container-icons`.
- `foundations/part_map.md` and `glossary.md` not read whole (the part map read in the parts I edited and its
  external context; the glossary not at all — no term was added).
- `guidelines/testing.md` read whole except the sections on account-server/deploy rows I did not need
  (read in full to the end); `styleguide-browser-view.md` read whole to line 400 and from 400 to 470 and 596 to
  the end, not lines 470–596 (menu bar, Mapy, program editor).
- `.claude/skills/loop2-play/SKILL.md` read whole. `foundation_step.md` read whole. `project-level/…reserved_choices.md`:
  not read (no reserved choice).
- The earlier session's `.gif` previews (`anim_2x.gif`, `anim_4x.gif`) and `research-sceny-pikselowe-2026-11-11.md`
  not read; I read `compare_dust.png`.

## Searches not found or unclear

- The pack's frame count: the task says "4 frames of smoke and 4 of fire"; the file holds 16 cells (64 × 64):
  8 smoke cells in rows 0–1 and 8 fire cells in rows 2–3. The page says no count. I used the 8 smoke cells.
- `D-66`'s text and `item`/`resource` identity: I relied on `finishGathering` (`item: ItemId = resource`).
- `scripts/test.py` fails when run directly (`KeyError: 'npm_execpath'`); it works through `npm test --`.

## Concerns

- The reduced-motion path, the pace 8×/16× and the fibre path are checked only in jsdom, the code and the
  CSS, not in a running browser.
- The brown dust sits next to the brown sticks and the mage's hand; whether it stands out enough is the
  human's judgement at the request (the ramp has at least 3.13:1 against the ground by arithmetic).
- Effects are not created at a stop (discovery, pause); a gathering that ends together with a discovery shows
  no icon or dust.
- The flight plaque overlaps the badge for a moment at the start of some flights (not at the peak after the
  arc change).
- Process remarks (not in the repository): `.runs/` scratch was lost on the restart except downloads and grids;
  the handoff's "do not run `npm test`" and `scripts/test.py` need `npm test --`, not `python -B scripts/test.py`.
