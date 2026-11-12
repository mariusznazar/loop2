# Author report — trzy-chwile-gdy-czas-stoi

**Status: done with concerns** (the concerns are in "Weakest points" and "Choices"; nothing blocks review).

## Commits (branch `task/trzy-chwile-gdy-czas-stoi`, base `20bcc58d`, nothing pushed)

1. `c130b231` feat — the code, the sprite, the tokens and the tests.
2. `04b43088` fix — plaques 8 scene pixels higher (clear of the badge), found when viewing the running game.
3. `d8c8f496` fix — the first animation of a moment ends on a change of `visibility`, because the invariant `browser-view-token-values` read my first version (`opacity: 1`) as a value in place of a token.
4. `959a8024` docs — foundation entries (D-322, D-311, D-271, D-39, D-42, D-315, new fact `wcag-three-flashes`).
5. `81578d66` docs — styleguide part, README line 26.

## Files changed (added / removed lines, all commits)

- `assets/sprites/mage-death.png` (new, 384 × 64 px).
- `src/browser/sim/data/scene.ts` (+ death sheet in `SCENE_MAGES`, `SCENE_MOMENTS`: places of plaques and 24 specks).
- `src/browser/view/scene-picture.ts`, `scene.tsx`, `world-area.tsx`, `run-screen.tsx`, `game-view.ts`.
- `src/browser/styles.css`, `src/browser/tokens.css`.
- Tests: `tests/view/scene.test.mjs`, `scene-picture.test.mjs`, `scene-frost-contrast.test.mjs`, `end-window-game.test.mjs`.
- `foundations/decisions.md`, `foundations/environment_facts.md`, `guidelines/styleguide-browser-view.md`, `README.md`.
- (`git diff --stat 20bcc58d..HEAD` gives the exact counts.)

## What was made

- **Scene** (`scene-picture.ts`, `scene.tsx`): `SceneDrawing.moment` (discovery / death / completion, with a key), `momentBegins(standing, events)` and `endEffectBegins(events)` (pure, from the events of the call, as `mapRunStarted` is read). The scene keeps `{key, playing}`; `playing` is true only in the reading whose events carry the moment, so a first draw, a redraw, a return to the screen, a reload and a load show the last image at once. The last image is the plain style of the elements; the effect is an animation added while `data-moment-playing` stands on `.scene` (inside `prefers-reduced-motion: no-preference`), so reduced motion shows the last image with no JS knowledge.
- **Effects**: discovery — plaques (icon of each discovered action/item/campfire that has an icon, once per icon, `panel` ground, `--bar-width` frame in `discovery`) come out of the two tall pines and stand over the clearing; death — `mage-death.png` sheet, six frames at the 160 ms beat, the mage falls toward the middle of the frame, cold layer (`.scene-chill`, `mix-blend-mode: color`) after a death of cold only; completion — 24 one-pixel specks rising in whole pixels, shown only while the effect plays (the last image has none).
- **End of effect**: each moment has a master element whose first animation (`scene-moment-life`, whole duration, animates nothing) tells the scene the effect is over; `animationcancel` (scene hidden while it runs) also ends it. The scene calls `onEffectEnd` → `WorldArea` → `RunScreen` controls `effectEnded()` → `game-view.ts`.
- **Window** (`game-view.ts`): `effectPending` is set in `take()` when the run ends in a reading whose events carry a death/completion, the player is on the screen and `matchMedia("(prefers-reduced-motion: reduce)")` is false; `windowShown()` waits for it; cleared by `effectEnded`, `openWindow`, `closeWindow`, `askToEnd`, leaving the screen, a restart. At an entry on the screen, after a reload/load and under reduced motion the window opens at once.
- **Pause exemption**: `.scene:not([data-standing="going"]) *:not(.scene-moment-part, .scene-moment-part *)` — only elements marked `scene-moment-part` run at a stop.
- **Foundation**: D-322 rewritten (new binding text, Verification, Rationale, Rejected; the "ready sheet of the mage's death" rejection removed); D-311 gets the window sentence; D-271 keeps task 18's CSS sentence and extends it (cold layer, specks 3:1, fall from the death sheet); D-39 gets the plaque frame; D-42 gets 2.3.1 as the fourth criterion, keeps `condition-unmet has no threshold.` and the dark-bar sentence, "four" in Verification, the plaque-frame pair in the 3:1 list, *Based on* gets `wcag-three-flashes` (new fact, source: W3C WCAG 2.2 REC, passage copied from the page fetched 2026-11-12); D-315 names the plaques of a discovery and the cold layer (marked "the cycle's own", see Choices 5). Styleguide part "The scene of a map run", roles table, contrast pair, value sources, README line 26. `foundation_check.py`: 0 errors.

## Checks run (command, exit code)

- `npm run typecheck` — 0. `npx eslint src tests/view` — 0. `npx prettier --check` on every file I touched — clean (the 11 warnings in `guidelines/*.md` I did not touch are on the base too).
- `node --test tests/view/*.test.mjs` — 0 (1197 pass). `node --test tests/sim/*.test.mjs` — 0 (767 pass).
- `npm test -- tests/view/scene.test.mjs` (62), `scene-picture.test.mjs` (62), `scene-frost-contrast.test.mjs` (3), `end-window-game.test.mjs` (26) — each 0.
- `npm test -- tests/invariants/test_loop2_container_sprites.py` — 0 (ran the container, 88 s, not skipped). `test_browser_view_token_values.py` — 1 on my first CSS (opacity in keyframes; fixed in `d8c8f496`), then 0. `test_design_token_sources.py` — 0. `test_design_token_contrast.py` — 0.
- `python -B .the-way/elements/common/foundation_check.py` — 0 errors (also with `--skip-test-citations` during the work).
- Not run: the full `npm test` (orchestrator's), `tests/quality`, `tests/deploy`, Stryker (no simulation module changed except data).

Test-first: for the new behaviours I wrote code and tests together; I then proved each protection by mutation (applied, ran the file, restored): game-view never waiting; `playing: true` always; icons not deduped; `cold: true` always; facing fixed to `right`; the pause exemption removed; `settle` ignoring `playing`. Each made the named tests fail. No invariant's test was changed.

## Trust boundary (`assets/sprites/mage-death.png`)

- PNG with chunks `IHDR`, `IDAT`, `IEND` only (3186 bytes); a test (`scene-picture.test.mjs`) asserts that, the 384 × 64 size, a standing first frame, a lying last frame and the ground line in every frame. The file was added to the "every file the scene's data names stands in assets/sprites/" test.
- Pixels: cut from `the Pixel Crawler pack in the predecessor game's repository, Entities\Npc's\Wizzard\Death\Death-Sheet.png` (384 × 32, six frames of 64 × 32). Script (Pillow, one-off, not kept): each source frame pasted into its own 64 × 64 frame at (+13, +32) — bottom-aligned on the ground line, 13 columns right. Compared back pixel by pixel (every source pixel at +13/+32 equal in RGBA, every other pixel alpha 0): 0 mismatches. 13, not 16 (the idle sheet's offset): the fallen mage is 64 px wide and at 16 three columns of three frames would be cut off. Cost: frame 0 stands 3 px left of the idle figure.
- Build: `cmp assets/sprites/mage-death.png dist/public/sprites/mage-death.png` — identical; the container test serves the same bytes.
- Licence fact `pixel-crawler-terms` (alter allowed, no credit asked) and README line 26 stay true; README now lists the file. The fact itself was read only through the task and `Terms.txt` of the pack.

## Own-work check (WAY-164)

- Requirement most likely unmet: "the end-of-run window opens after the effect, and at once where the last image shows at once" (point 7) and "a scene drawn again shows the last image" (5/6), because both depend on browser events jsdom cannot fire. Checked in the real game (Playwright CLI, `npm run local`, states composed with the sim and sent by the save request): cold death — window stood 975 ms after the death began (fall = 960 ms); completion — 2718 ms (900 + 1800 ms); after `page.reload()` on an ended run the window stood at once, `data-moment-playing` absent, no specks, `animation-name: none`; leaving to Siedziba during the fall and coming back (bar link) — scene not playing, mage on its last frame, window at once (so `animationcancel` works in Chromium); under `emulateMedia({reducedMotion: "reduce"})` the death and the completion showed the last image and the window at once; the combat-death state composed from a real death (cause edited) showed the lying mage and no cold layer.
- Flashing (D-42 2.3.1, D-317, point 9), by frames over time: screencast frames of the scene (672 × 304 px), relative luminance per pixel, in the stretch of each effect. Cold death: mean luminance of the scene moved 0.0055 over the whole effect; at most 1.4 % of the area changed by ≥ 0.10 between two frames (walking mage, badge going), 4.7 % against the first frame. Hunger death: span 0.0026, 2.3 % / 3.1 %. Completion: span 0.0002, 0.035 % / 0.053 % (specks). Discovery (frames 5600–6134 ms): span 0.0023, 0.56 % / 1.7 %. WCAG's threshold is 25 % of the area, so none is near. The cold layer blends by `color` (a test pins that), so it keeps the brightness of the picture.
- Frames/states looked at: discovery (plaque row, standing), cold death (eight frames of the fall + last image), hunger death (twelve frames), completion (three frames mid-effect, last image), combat death (last image), each at 1440 × 900.
- Screenshots (from the real game): kept at `mariusznazar/screenshots`, branch `loop2/trzy-chwile-gdy-czas-stoi`, commit `11eb42fbf9e30bd4a710513b7440207d34964014`, directory `loop2/trzy-chwile-gdy-czas-stoi/`. They show the made-up game scene only (no account). Embeds:
  - `![Death of cold, last image: the cold layer](https://github.com/mariusznazar/screenshots/blob/11eb42fbf9e30bd4a710513b7440207d34964014/loop2/trzy-chwile-gdy-czas-stoi/death-cold-last-image.png?raw=true)`
  - `![Death of hunger, last image: no layer, the cool grey-green tint of streak 0 for comparison](https://github.com/mariusznazar/screenshots/blob/11eb42fbf9e30bd4a710513b7440207d34964014/loop2/trzy-chwile-gdy-czas-stoi/death-hunger-last-image.png?raw=true)`
  - `![Completion, mid-effect: specks of light over the full gold](https://github.com/mariusznazar/screenshots/blob/11eb42fbf9e30bd4a710513b7440207d34964014/loop2/trzy-chwile-gdy-czas-stoi/completion-specks.png?raw=true)`
  - `![Completion, last image](https://github.com/mariusznazar/screenshots/blob/11eb42fbf9e30bd4a710513b7440207d34964014/loop2/trzy-chwile-gdy-czas-stoi/completion-last-image.png?raw=true)`
  - `![Discovery: plaques over the clearing](https://github.com/mariusznazar/screenshots/blob/11eb42fbf9e30bd4a710513b7440207d34964014/loop2/trzy-chwile-gdy-czas-stoi/discovery-plaques.png?raw=true)`
  The browser, the local start and `.playwright-cli/` were closed and deleted; the clone `.runs/screenshots` was deleted.

## Colours proposed (the human chooses at the request)

- Cold layer: `--scene-chill: #2f5fd0` at `--scene-chill-opacity: 0.5`. No source fixes it; the `Source:` comment says "proposed by the cycle … pending Mariusz's choice (question 9)". It is blue (hue far from the grey-green `#6f8f6a` of streak 0, which the hunger screenshot shows) and `color`-blended.
- Specks: `--scene-speck-ember: #b21818` (pixel (14, 14)) and `--scene-speck-bronze: #985a3b` (pixel (2, 15)), both of `Environment/Structures/Stations/Bonfire/Bonfire_03-Sheet.png` of Pixel Crawler (loop `cdc7c0d`). Contrast against the full-gold snow `#ddc69e` (the sample of the frost test) is ≥ 3 (a test pins it); the colours of that pack's fire that are lighter (`#de5325`, `#ff913d`, `#f47732`) fall under 3:1 on the snow, so the specks are dark embers, not bright light. On the screenshot they read as small red-brown sparks, not as light: the human may want other colours.
- One place each: the colours and opacity in `src/browser/tokens.css` (4 lines); the cold layer's timing in the rule `.scene[data-moment-playing] .scene-chill` of `styles.css` (delete its three `animation-*` lines for "at once"); durations in the block "playing rules" of `@media (prefers-reduced-motion: no-preference)` and in the comment there; places and the specks' pattern in `SCENE_MOMENTS`.

## Choices I made (each with the way rejected and its cost if wrong)

1. **What tells a moment that just came from one drawn again**: the events of the call (`discovered`, `characterDied`, `mapRunCompleted`) plus "a first draw has none" — the way `mapRunStarted` is read. Rejected: a flag in the game state (D-316/D-04 forbid state kept for the scene); a timestamp (needs a timer). Cost if wrong: a reading that carries a moment without those events would not play; none found.
2. **Durations** (CSS, in comments): fall 6 × 160 ms (the beat of the frames) = 960 ms; plaques 600 ms each, 150 ms apart, fading in; specks 1800 ms each, delays up to 900 ms (total 2700 ms). Rejected: slower fall/longer window wait. Cost: the human may find the death too quick (≈1 s) or the completion's wait (2.7 s) long; one number each.
3. **Cold layer timing**: it fades in over the fall (opacity from 0, `color` blend, so brightness is untouched). Rejected: at once (a hard change of the whole scene's colour in one frame). Cost: a one-rule change.
4. **Places**: plaques in a row centred on the mage's middle (176), line y = 56, 22 px step, 8 to a row (more wrap upward), each from the nearer tall pine; the same icon once (`Idź`/`Idź — ognisko`, `Zbierz`/`Obchód` share an icon). Rejected: one plaque per thing (two identical plaques look like a bug). Cost: two shared-icon things show one plaque. The first row sat at y = 64, 3 px above the badge; moved to 56 after viewing.
5. **Plaques lie over the tint** (like the badge), so the frame keeps the colour of `discovery`. This is beyond the task's rows: D-315 listed only the badge and the frost as lying over the tint, so I edited D-315 (and its Verification) to add the plaques and the cold layer; mark it `the cycle's` in the request. Rejected: under the tint, as the flying icon's plaque (the frame would turn green-yellow at streak 0). Cost if wrong: one rule moves and D-315's two clauses.
6. **Reduced motion is read by the game view only** (`matchMedia`) for the window; the scene relies on CSS alone. Rejected: matchMedia in the scene's render. Cost: under reduced motion `data-moment-playing` stays set (no animation runs, so nothing shows); if the setting is switched off later, the effect would play once.
7. **Death sheet offset +13 / +32** (see the trust boundary) and **the mage falls toward the middle of the frame** (`fallFacing`: turned left in the right half). Without it the corpse at the right edge ("Eksploruj", the common end) is cut by the frame and under the frost. Rejected: moving `rightEdgeX` (D-318 data, many tests). Cost: the mage turns on the first frame of the fall; frame 0 stands 3 px off the idle figure (mirrored: 2 px).
8. **Window gating lives in the game view** (`effectPending`, one memory beside `endWindowOpen`) and the scene reports the end through callbacks. Rejected: the scene opening the window; a timer. D-368/D-371 left as they are (their "opens when a map run ends"/"stands only while" stay true; D-311 carries the new sentence). If review wants the clause in D-371, it is one sentence.
9. **D-271 edit**: kept task 18's sentence and extended it for the cold layer and for 3:1 of the specks, as point 13 of the task allows. D-317 not touched (task says task 20 writes it).
10. **Fact identifier** `wcag-three-flashes`; D-42 has the new pair in the 3:1 sentence.

## Changed existing tests (deliberate, named)

- `tests/view/end-window-game.test.mjs`: the window no longer opens at the game minute of the end but after the effect, so the helpers `dieOnTheScreen` / `completeOnTheScreen` now also fire the end of the effect (`playTheEffect`), and the first test does so before asserting the window. Five new cases cover: waits and opens after the effect (death and completion); opens at once under reduced motion; "Koniec przejścia" opens it during the wait and a late end opens nothing the player closed; a return to the screen opens it at once; `animationcancel` opens it. This is the order check of point 4 in both directions.
- `tests/view/scene-picture.test.mjs`: `decodePng` now reads 8-bit RGB as well (the forest picture is RGB); the file list test includes the death sheet. No invariant's test changed (`loop2-container-sprites` is cited by the file-list test; only a name was added).

## Weakest points checked

- The stop rule exempting moment parts: a test reads the computed `animation-play-state` of the effect elements (running) and of the mage, the fire and the tint (paused) at the same stop.
- A speck passing over a tree: a test samples the forest picture along every speck's path (all snow); the contrast test pins the two tokens.
- The cold layer vs the cool tint: shown side by side in the screenshots (hunger death = grey-green, cold death = blue).
- `animationend` of an animation that changes nothing visible: first version changed `opacity` (rejected by the token invariant); the `visibility` version was timed in the real browser (975 ms / 2718 ms, above).

## Problems seen (not fixed)

- Specks read as dark sparks, not light (see Colours).
- The plaque row and the badge are close when there is a badge (the row is 11 px above it after the fix).
- Under reduced motion JS keeps `playing` true (Choice 6). Harmless today.

## Reaches beyond the handoff (what, where, why)

`src/browser/view/game-view.ts`, `run-screen.tsx`, `world-area.tsx`, `discovery-band*.ts/tsx`, `status-row.ts` (discoveryText, to take the icons in the band's order); `src/browser/sim/run.ts` (the `GameEvent` kinds) and `sim/types.ts` (`Understanding`, `Death`); `src/browser/sim/data/{actions,resources,campfire,items,balance,maps}.ts` (icons, body rules, Las solving); `tests/view/end-window-game.test.mjs`; `scripts/test.py`; the pack `the Pixel Crawler pack in the predecessor game's repository, …` (death sheet, Bonfire sheets, `Terms.txt`); `.the-way/elements/{common,decisions,environment-facts}/…` and `.the-way/product-guidelines/styleguide/template.md` (form of entries); D-368, D-370, D-371, D-373, D-372, D-357, D-358 (read whole as neighbours); W3C WCAG 2.2 page (curl, 2026-11-12). Parts touched: `browser-view`, one data file of `simulation`, `product-foundation` (foundation files), README.

## Unread material

- Foundation entries I read only through the task's quotations, not whole: D-62, D-132, D-272, D-349, D-321 (read), the invariants `sprite-file-content`, `design-token-contrast`, `loop2-container-sprites` (I read their tests and the guidelines that cite them, not their entries), the fact `pixel-crawler-terms`, `foundations/part_map.md` (only the `browser-view` entry), the glossary (only headings), the other decisions whose *Scope* names the touched parts (not searched exhaustively; read whole: D-39, D-40, D-42, D-43, D-122, D-271, D-311, D-314–D-322, D-368–D-373, D-357, D-358).
- `guidelines/coding-simulation-module.md` (not needed: only a data file changed). `.the-way/task-cycle/change/slice.md`/`fix.md` (not the variant).
- The task was read whole; `foundations/decisions.md` otherwise by ranges.

## Searches not found or unclear

- The "route the foundation settles for screenshots" was found (D-357/D-358, `loop2-play` skill); the handoff's "Do not push" I read as meant for the task branch, so the screenshots were pushed to the screenshots repository by D-358 (public repository, made-up game scene only). If that was not meant, delete the branch `loop2/trzy-chwile-gdy-czas-stoi` of `mariusznazar/screenshots`.
- `pixel-crawler-terms` and the task say the fire of the scene was "cut from the pack"; no pack file equals `assets/sprites/fire.png` pixel for pixel (`Bonfire_02-Sheet.png` is the closest, 660 equal pixels). I took the specks' colours from `Bonfire_03-Sheet.png`, where both exist, and name that file; the scene's own fire sheet is not claimed to be it.
- The base gate log had no failures (last lines: `542 tests in 4 directories; every directory passed`, `0 errors`); nothing failing on the base was hit.
