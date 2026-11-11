FAIL 6019d7a38988371edf625e17f1126bced3d0d1c3

# Review of the whole change — "Zbieranie jako widowisko"

Range `211a4ea..6019d7a` (5 commits, 17 files, +1217/-54), branch `task/zbieranie-jako-widowisko`. Route: one author, no spec, no plan, no slices, so every blocking finding comes from the one author's commits (`af19716` code, `a5a9610` tests, `034a336` fix, `6019d7a` foundation). `git rev-parse HEAD` = `6019d7a38988371edf625e17f1126bced3d0d1c3`, as the handoff gave. The pinned `.the-way` matches the gitlink (`e3825a82…`).

## Blocking findings (2, both Important, both within the task)

### B1 (Important). The icon and the fibre's dust are placed by where the mage will stand next, not where it stood when the gathering ended

- Place: `src/browser/view/scene.tsx:256-257` and `:270` (`next = placeOf(drawing, current.x)`, then `sceneEffect(lastState, state, events, next)`); the argument is used in `src/browser/view/scene-picture.ts:247` (feet) and `:274` (landing point `mageX + SCENE_EFFECTS.body.x`).
- What is wrong: `next` is the place of the goal of the activity that has just started, in the reading that carries the end. When the next action sends the mage elsewhere (any "Idź", "Eksploruj", a campfire action), the icon lands at the new destination and the fibre's dust and flight start there, not at the mage that gathered. The code takes the mage's place from the reading after the end, the effect belongs to the reading before it.
- Evidence (my scratch run in jsdom, deleted after, on the built `dist/`): a stick gathered at the sticks (mage frame at 42, body 74, i.e. 22.0 % of the frame), the next activity "explore" (place 275). `.scene-flight-plaque` `left` = 91.369 % (x = 307 = 275 + 32) and `--from-x` = -64.2857 %: the icon crosses 216 scene pixels in 300 ms to a point the mage reaches only after 640 ms, passing the mage, which walks from 42. For a missed fibre the dust stands at the destination, 275 + 32 - 8, not under the mage's feet. The tests (`tests/view/scene.test.mjs` helper `reading`, `tests/view/scene-picture.test.mjs` `effectOf`) always draw the next reading with the same action, so `next === current.x` and they cannot see this.
- Why it matters: To do 3 ("leci łukiem do maga i znika przy nim"), To do 4 ("przy włóknie pod stopami maga") and D-363/D-364 (Verification: "starting under the mage's feet") are not met for every ending followed by a walk, which is the usual ending of a gathering in a program that has more than one rule. The author's report states the intended behaviour as "mage standing" and did not check it.
- Fix direction (for the cycle, not applied): pass the place where the mage stood at the previous reading (`current.x`, which is also what `reachedX` starts from) and add a case where the next action walks elsewhere.

### B2 (Important). The bend sheet always faces right, which turns the mage's back to the moss; the styleguide and a comment say the props lie to the right, which the data contradicts

- Place: `src/browser/styles.css:1727-1734` (the rule and its comment), `guidelines/styleguide-browser-view.md:626-629` ("zawsze zwrócony w prawo, tam gdzie leżą rekwizyty"), `tests/view/scene.test.mjs:874` (only the sticks).
- What is wrong: from `src/browser/sim/data/scene.ts` (`SCENE_PROPS`) and the pixel columns of the sheets I measured (`mage-idle.png` figure columns 20..44 of its 64 px frame, `mage-bend.png` 22..46 at full bend): at the moss the mage's frame is at 32, so its figure spans 52..76; the moss spans 40..51 (`moss.png` is 12 px wide at x 40): the moss lies immediately left of the figure. With the bend forced to face right, the mage bends away from the moss. At the sticks (frame 42, figure 62..86, sticks 80..101) and the berry bush (frame 224, figure 244..268, bush 252..280) right is the right way. So the stated reason "the way its props lie" is false for one of the three props, and the idle sheet, which mirrors by walk direction, turns toward the moss while the bend turns away from it.
- Evidence: the coordinates above (data and my reading of the PNG pixels). The author checked in a real browser only the sticks.
- Why it matters: every "Zbierz — Mech" and "Obchód — Mech" shows the mage bending the wrong way; the guideline sentence is false against the data and a later agent would copy it. The task does not name facing, but a mage that bends away from what it gathers is a defect a reasonable player sees. The author named this choice as "not in the task" in the report.
- Fix direction: face toward the prop (per resource, from the data, not from the walk direction), or state and test the real rule; correct the styleguide and the CSS comment with it.

## Minor findings within the task

1. `tests/view/scene.test.mjs:874` and `tests/view/scene-picture.test.mjs` (`effectOf`) never draw an ending followed by another place; this is the gap that hides B1 (listed here as test coverage, graded with B1).
2. `src/browser/view/scene-picture.ts:222` and `foundations/decisions.md:6991` (D-317 Verification) say "as after a catch-up". The glossary entry "catch-up" is the computing after a load or a sign-in, after which the scene has no previous reading; the case meant is a clock reading that carries many minutes (a tab left in the background). Wording only, the behaviour does not depend on it.
3. `sceneEffect` counts exactly one end of a gathering and takes the backpack's change as the result. A reading that carries one gathering end and also, for example, the end of "Zjedz" of the same item would decide hit or miss from a net change, and a single old end among many other ends is not recognised as overdue (the end's minute is not compared with the reading's minute). Rare; the task prescribes the backpack comparison, so this is the cost of that choice, not a departure from it.
4. `src/browser/styles.css`, `.scene-flight-plaque`: a `panel` background with no text role set. The rule "Every background with its text" has a precedent for a bar with no text, and the plaque holds an image with its own colours, so this is polish. The Roles table row for `panel` (`guidelines/styleguide-browser-view.md:17`) still names only "plakietka nad głową postaci", while the plaque of the flying icon is a second use of `panel` (D-363 settles it).
5. `foundations/decisions.md` D-271 Verification: the `violates` line "another format, or a PNG file carrying text or metadata chunks; a picture drawn from a pack other than the two named; the cloud of dust in a colour that" is one long line where its neighbours are wrapped near 100 columns. Cosmetic.
6. Appearance for the human at the request, not graded: the dust's main fill `#88673f` (3.13:1 against the ground, my arithmetic agrees with the author's) is the colour of the sticks' pixels the author took it from, so a cloud centred on the sticks sits in their colour. The task leaves this judgement to Mariusz (Acceptance criteria).

## Minor findings outside the task

- D-27 (`foundations/decisions.md:655`) still says the footer and the section credit icons only, while both now also hold the pack's line. The task document makes task 24 rewrite D-27, and the handoff hands it to the return step. Out of scope; `icon-credits` is still true as written (it speaks of each icon file).
- The author's screenshots lie in `.playwright-cli/` of the worktree (ignored, not in the range). Their publication for the request is the orchestrator's step (acceptance criterion), not a change of the repository.

## Declined to judge

- A gathering that ends at a stop (pause, discovery, death, completion) shows no effect, and a reading with several ends shows none: read against To do 5/6 and D-317 ("an effect overdue when its turn comes is dropped", "stand still with the scene"), this is a defensible reading of an ambiguous task and the author named its cost; I set it aside as a judgement for the human, not a finding. (A first gathering that causes a discovery will show no icon.)
- The use of 8 smoke cells for 4: the task says "4 frames of smoke", the pack file is not in the repository and not in `.runs/dust-download/` (only the page), so I could not count its cells. The 8 frames of `assets/sprites/dust.png` form a cloud that thins to 5 pixels (frame pixel counts 172, 123, 85, 86, 60, 42, 18, 5), which fits 8 frames in 300 ms; whether they are the pack's own cells is unverified.
- Timings (300 ms, 160 ms beat, arc of 6 scene pixels, the plaque of 24 px), the order of the bend frames and the colours of the dust: the task leaves them to the cycle and Mariusz's eye.
- Everything the author did not check in a real browser (reduced motion, 8x and 16x, the fibre path in the browser, `animationend` in a real browser): I did not run a browser either; read only from the CSS and from jsdom.

## Against the task (checked item by item)

- To do 1 (bend in a loop through the whole gathering, fibre and "Obchód" included, at the scene's beat): met by `bendingOf` (`scene-picture.ts`), the third sheet and `data-bending`, the shared frame animation (`styles.css`, `.scene-mage-sprite img`, 4 frames x 160 ms), hidden during a walk and visible after it. Facing: B2.
- To do 2 (hand-made frames from the idle frame, 12 colours, a PNG of pixels alone, name and frame count in the data): `mage-bend.png` is 256 x 64, 4 frames, 12 colours of the mage plus full transparency (my decode: 13 distinct RGBA values, all alpha 0 or 255), standing frame equal to the idle frame's colours; data in `SCENE_MAGES`. Met.
- To do 3 (flying icon on a `panel` plaque, one per "Obchód", fibre from under the feet): met for an ending followed by the same place; not met when the next action leaves the place (B1).
- To do 4 (dust at the prop, under the feet for fibre, recoloured pack cloud, PNG, data): met under the same exception (B1 for fibre); the colours are five browns, each at least 3.13:1 against `#bccae5` (my computation).
- To do 5 (at most 300 ms, no text, overdue dropped, from the previous reading and events, no new game-state field): met (`sceneEffect`, 300 ms `.scene-effect`, no change to `types.ts` or the save).
- To do 6 (stops hold the new motion; no flash; reduced motion: one bend frame, icon and dust still, at most 300 ms): met in the CSS (effect life outside the `no-preference` block; movement inside it); `.scene:not([data-standing="going"]) *` pauses effects. Checked by reading and jsdom only.
- To do 7 (credit row text, two links, where D-27 puts credits): met, text and both links as the task writes them (`credits.ts`, `footer.ts`, `credits-section.tsx`, tests in `icons.test.mjs`).
- To do 8 (foundation and styleguide): see below.
- Acceptance criterion (screenshot at the request): not a property of the range; the screenshots exist outside the repository.

## Settlements and projected entries

- Row 1 -> D-362, row 2 -> D-363, row 3 -> D-364: each says what the task row says (bend in a loop, icon on `panel` from the prop or the feet, one icon per "Obchód", dust at the prop or under the feet); Origin cites the task; foundation check passes. The unspecified facing is not in D-362 (see B2 for the styleguide sentence).
- Row 4 -> invariant `sprite-credits`: the line parts match row 4 (what it is for, title, author, page with link, licence with link, how the files differ); Rests on omits `lpc-wolf-licence`, which does not exist yet in the facts (task 20 adds it): correct.
- D-317 (first sentence of the projected entry, "at most 300 ms ... no text at 8x and 16x ... overdue dropped"): word for word from the task. D-271 (dust from the second pack, credits for each pack that asks, `Based on` gains `smoke-fire-particle-licence` and `cc-by-3-adaptation-credit`, Verification updated): matches the task; the scuffle's cloud is left to task 20 as the task says.
- Fact `smoke-fire-particle-licence`: the text matches the task's wording; I compared it with the saved page `.runs/dust-download/page.html`: author "KnoblePersona", licence "CC-BY 3.0" linking to `http://creativecommons.org/licenses/by/3.0/` (the link is `http`, as the task writes it). The archived copy was not fetched by me.
- Part map row (`External context`): present, untrusted, them -> us, like the Pixel Crawler row. `loop2-container-sprites`: no new test needed; `scripts/static-files.mjs` copies every `.png` of `assets/sprites/` and the test lists the directory.
- Styleguide section "The scene of a map run": updated for bending, flight and dust, times named as in `styles.css` (comments carry the sources); the facing sentence is B2. Where the section's Good/Bad lines were not extended, no rule requires it.

## Trust boundary `assets/sprites/**` (answer: yes)

- Bytes of both new files (my parse, CRC of every chunk checked): `dust.png` 1080 bytes = signature + `IHDR` (128 x 16, 8-bit RGBA, no interlace) + one `IDAT` + `IEND`, ending exactly at the end of the file; `mage-bend.png` 1290 bytes, the same shape (256 x 64). No ancillary chunk (no `tEXt`, `iTXt`, `zTXt`, `iCCP`, `eXIf`, `pHYs`, `tIME`), no trailing bytes. Pixels alone: satisfies D-273 and `sprite-file-content`.
- Build and container test: the build copies every `.png` of the directory (`scripts/static-files.mjs:32-42`, `Dockerfile:10`); `tests/invariants/test_loop2_container_sprites.py` reads every `.png` of the directory by listing it (not run, it needs Docker); `tests/view/scene-picture.test.mjs` ties the data's names to existing files and passes.
- Nothing of the downloaded archive other than the one derived image entered the repository: the range holds exactly two binary files, the two PNGs. No screenshot, frame, snapshot or other image of the author's inspection is in the range (`git log --stat` over the range lists only those two image files; `.playwright-cli/` and `.runs/` are ignored and not tracked).
- Credit: the row names the pack ("Smoke & Fire Animated Particle [16x16]"), the author (KnoblePersona), the page link and the licence with its link, and says the files were recoloured, as `cc-by-3-adaptation-credit` and `cc-by-3-licence-copy` need (the licence URI is given with the credit).
- Source of `dust.png`: derived from a pack downloaded from OpenGameArt (the page text says "License(s): CC-BY 3.0"); the pack file is not in the repository, so the derivation is not reproducible from the range (see Declined to judge).

## Gaps the author's report carried (judged)

- Effects at a stop dropped: Declined to judge (above).
- Facing always right: B2.
- 8 smoke cells: Declined to judge (above).
- Checks not made in a real browser: stated, repeated above. B1 and B2 are both findings no real-browser pass of the sticks would show; B1 shows when the next action is a walk.
- D-27 and the footer: Minor outside the task (above).

## Checks I ran (each as `npm test -- <file>`, one build at a time)

- `npm test -- tests/view/scene.test.mjs`: exit 0, 33 pass.
- `npm test -- tests/view/scene-picture.test.mjs`: exit 0, 37 pass.
- `npm test -- tests/view/icons.test.mjs`: exit 0, 33 pass.
- `npm test -- tests/invariants/test_browser_view_token_values.py`: exit 0, 4 OK.
- `npm test -- tests/invariants/test_content_identifiers.py`: exit 0, 4 OK.
- `npm test -- tests/invariants/test_icon_credits.py`: exit 0, 5 OK.
- `npm test -- tests/invariants/test_cross_part_imports.py`: exit 0, 10 OK.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors".
- Scratch jsdom run for B1 (a file under `.runs/review-whole/`, removed after): the plaque landed at 91.369 % with the mage at 42; observation described in B1. Not a standing test.
- PNG parse and decode of the three sprite files (scratch in the session's scratchpad, outside the worktree): chunk list, CRCs, distinct colours, per-frame columns and pixel counts.
- Not run: the full `npm test` (the orchestrator's); `tests/invariants/test_loop2_container_sprites.py` (Docker); `tests/invariants/test_application_build_output.py` (the author ran it; I did not repeat the 233 s run); no real browser.
- Tests: no invariant test is new or changed (`sprite-credits` is `review`). The tests the change adds do fail for the behaviours they name (I read each against the code): the hit/miss, the one end, the stop, the 300 ms and `animationend`, the facing. They pass for a reason other than the code's own number in the places I checked (coordinates are written out from the data's numbers in comments); the gap is B1's case.

## Reaches beyond the handoff

- `scripts/static-files.mjs`, `Dockerfile`, `tests/invariants/test_loop2_container_sprites.py` (heads): to confirm the build copies and the test covers every `.png` (trust boundary answer).
- `src/browser/sim/run.ts`, `src/browser/sim/types.ts` (the end of a gathering and `Activity`): to check how a hit and the events are made.
- `src/browser/view/world-area.tsx`, `run-screen.tsx` (grep): to see how `events` reach the scene.
- `src/browser/view/scene-picture.ts` and `scene.tsx` read whole; `src/browser/styles.css` lines 1650-1990.
- `foundations/invariants.md` (`icon-credits`, `sprite-file-content`, `loop2-container-sprites`), `foundations/environment_facts.md` (`pixel-crawler-terms`, the new fact) by search and the passage found.
- `.runs/dust-download/page.html` and `page_text.txt` (the saved page): to check the fact against the source.
- The Notes folder listing `zbieranie_jako_widowisko_loop2.md` (only that the file the Origin lines name exists).

## Unread material

- Decisions of my selection: **read whole 16** (D-04, D-27, D-43, D-44 shown whole by accident of the range, D-66, D-271, D-291, D-316, D-317, D-319, D-320, D-321, D-322, D-362, D-363, D-364); **by title only 0**: I did not screen the 364 titles. I searched by identifier and by the words of the change instead, and relied on the task's quotation of D-18, D-67 (read the head only), D-272, D-273, D-318 and D-349.
- Decisions that bear on the change and stayed unread whole: D-18, D-272, D-273, D-318, D-349 (read through the task's quotation and the grep of the invariants' tests; none is contradicted by what I saw), D-03, D-65, D-67, D-71, D-125, D-197, D-242, D-267, D-291's neighbours, D-314, D-315 (D-03 and D-267 concern React hooks, which the guideline `coding-browser-module.md` states and I checked against `scene.tsx`).
- Invariants: read whole `sprite-credits`, `sprite-file-content`, `icon-credits`, `loop2-container-sprites` (the first line and its method). Not read whole: `browser-view-token-values`, `content-identifiers` (their tests pass), `browser-view-framework`, `design-token-contrast`, `design-token-sources`, `loop2-container-icons`, `font-file-provenance`, `action-in-progress`, `player-map-run-pace`, `map-run-layout`.
- `foundations/part_map.md` and `foundations/glossary.md`: read whole.
- Guidelines read whole: `guidelines/coding.md`, `coding-browser-module.md`, `coding-content-data.md`, `testing.md`, `styleguide-browser-view.md`. Not read: the other `coding-*.md` files (they do not reach this change), `src/browser/AGENTS.md` read whole (9 lines).
- The pinned the-way method files read: `task-cycle/review/SKILL.md` and `whole_change.md` whole; `product-guidelines/template.md` not read (the change adds a styleguide section only; compared by eye with the neighbouring sections' shape).

## Searches not found or unclear

- The Smoke & Fire pack file, with its cell count and the order of its cells: not in the repository or in `.runs/dust-download/`; the task says 4 smoke frames, the author says 8 cells. Unclear, not resolvable from the range.
- Where the foundation settles a place for the author's screenshots (WAY-316/317): not looked up by me; the screenshots are not in the range.
- Whether a reading that carries one gathering end plus other ends can arise outside a tab left in the background: not found in `clock.ts` or `game-view.ts` in the passages I read; assumed to arise only there.
- `scripts/test.py` run directly fails with `KeyError: 'npm_execpath'` and `npm test` rejects several files at once ("Expected exactly one test file"); both match the author's note and the guideline in `testing.md`, so I ran each file apart.
