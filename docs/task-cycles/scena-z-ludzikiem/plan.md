# Plan — Scena z magiem na ekranie przejścia

- Task: `docs/task-cycles/scena-z-ludzikiem/task.frozen.md`
- Spec: none
- Base: 8f9e713

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| E1 | decision (new) — What does the scene show, and from what does it draw? — the part this task makes true: the character and its campfire drawn from the game state, no state of the game in the scene, the picture of each resource and archetype in the game's data, motion from CSS at a fixed beat that does not depend on the pace, with no loop of drawing; what attacks, the night, the dawn and the scuffle stay with tasks 18 and 20 | projected entry, *Decisions in play* (task lines 172-173) | Slices 3, 4, 5 |
| E2 | decision (new) — How long do the scene's effects last? — only its last sentence: the scene follows the system's setting for reduced motion and shows no flash of its whole area | projected entry, *Decisions in play* (task lines 174-175) | Slice 5 |
| E3 | decision D-271 — the part „the character of the scene is the pack's mage” | projected entry, *Decisions in play* (task lines 176-177) | Slices 1, 3 |
| E4 | decision D-272 — the part „as the scene”: stands at the base (written by task 6), nothing to write; listed so that no slice writes it again | projected entry, *Decisions in play* (task lines 178-179) | Slice 4 |
| E5 | decision D-04 — the exception for the scene: it draws also from its previous reading of the game state and from the events the simulation returned, as far as the scene's code reads them (the place where the mage stays, the start of a map run); the chronicle stays with task 15 | projected entry, *Decisions in play* (task lines 180-181) | Slice 5 |
| E6 | decision D-43 — the exceptions „the geometry of the scene computed in TypeScript, the frames and positions of a sprite”, and the icon of an action drawn as a mask with no text beside it, which takes `text-strong` (row 9) | projected entry, *Decisions in play* (task lines 182-183); row 9 | Slices 4, 5, 6 |
| E7 | decision D-39 — the part: `positive` also stands as the fill of the progress bar over the mage's head, on a track in `highlight` in a badge on `panel`, with at least 3:1 against what it stands on; `warning` stands in no progress bar | projected entry, *Decisions in play* (task lines 184-185) | Slices 4, 6 |
| E8 | decision D-40 — the part: the badge stands on `panel`, the bar's track takes `highlight`, and the icon in the badge stands in `text-strong` though it is no text and stands at no text | projected entry, *Decisions in play* (task lines 186-187); row 9 | Slices 4, 6 |
| E9 | decision D-122 — the part „the scene keeping its colours” at a stop at a discovery | projected entry, *Decisions in play* (task lines 188-189) | Slices 3, 4 |
| E10 | invariant `loop2-container-sprites` — written here, since task 6 did not write it; its check: `tests/invariants/test_loop2_container_sprites.py` (Slice 2), the image built from the working tree serving each PNG file directly in `assets/sprites/` with the same bytes, together with the case of `tests/view/scene-picture.test.mjs` (Slice 3) that every file the scene's data names is such a file | projected entry, *Decisions in play* (task lines 190-191) | Slices 1, 2, 3 |
| Row 1 | decision — the player's pause greys the scene with `grayscale(1) brightness(0.5)` and stops all its motion; at a stop at a discovery the scene keeps its colours and its motion stops too | *Settlements to record*, row 1 | Slices 3, 4, 5 |
| Row 2 | decision — where the mage goes for each activity (To do 3) | *Settlements to record*, row 2 | Slice 3 |
| Row 3 | decision — sticks, bush and moss always stand in the frame; the campfire only while it stands on the character's tile, burning or extinguished | *Settlements to record*, row 3 | Slices 3, 4 |
| Row 4 | decision — the walk lasts 640 ms and frames change every 160 ms at every pace, a movement of the character and no effect of an ordinary event; a changed target turns the mage from where it is; at the start, after „Restart”, after a load and under reduced motion it stands at once | *Settlements to record*, row 4 | Slice 5 |
| Row 5 | decision — no icon and no bar over the head while waiting, and no icon in combat until task 20 | *Settlements to record*, row 5 | Slices 3, 4 |
| Row 6 | decision — icon and bar on a badge with a solid `panel`, never straight on the picture; the bar's fill `positive` on a track `highlight` | *Settlements to record*, row 6 | Slice 4 |
| Row 7 | decision — the scene is a picture: a click on it does nothing and no pause sign stands on it | *Settlements to record*, row 7 | Slice 4 |
| Row 8 | decision — until tasks 18 and 19, after a death and after a completion the scene's motion stops and the badge goes; after a death the mage is grey, after a completion in colour | *Settlements to record*, row 8 | Slices 3, 4, 5 |
| Row 9 | decision — the icon in the badge takes `text-strong` though no text stands beside it | *Settlements to record*, row 9 | Slice 4 |

The foundation step writes these before Slice 1, each part into the entry another task writes in
full, as WAY-126 gives; where rows 1-9 fold into E1, E7, E8 or E9 instead of entries of their own is
the foundation agent's choice. The entries the task stands on without changing them (task lines
193-218) are read, not written.

## Slices

### Slice 1 — the scene's sprite files

- **Goal:** `assets/sprites/` holds six new PNG files of the pack Pixel Crawler, each holding pixels
  alone — no chunk but `IHDR`, `PLTE` and `tRNS` where the pixels need them, `IDAT` and `IEND`, so no
  text, time, gamma, colour-profile or physical-size chunk (D-271, sprite-file-content):
  `mage-idle.png` and `mage-run.png`, the pack's mage, cut from
  C:\Storage\repos\loop\assets\pixel-crawler\Entities\Npc's\Wizzard\Idle\Idle-Sheet.png (128 × 32,
  four frames of 32 × 32) and ...\Wizzard\Run\Run-Sheet.png (384 × 64, six frames of 64 × 64), each
  into one row of its frames, both sheets in one common frame size, the figure aligned to the bottom
  and centred in it, so that it does not jump when the scene switches between the two (task
  *Context*, the line on the pack's different frames), the mage facing as the pack draws it; and
  `fire.png`, `sticks.png`, `berry-bush.png` and `moss.png`, taken from the old Loop's cut pictures
  C:\Storage\repos\loop\public\sprites\fire.png (128 × 32, four frames of 32 × 32), sticks.png,
  bush.png and moss.png, which today hold `IHDR`, `IDAT` and `IEND` alone: copy them unchanged where
  their chunks still show that. Confirm that each picture is of Pixel Crawler — the fire likely from
  the pack's Environment\Structures\Stations\Bonfire, the props from its environment pictures under
  C:\Storage\repos\loop\assets\pixel-crawler\ — and name the source of each in the report; a picture
  not traced to the pack stays out and is named there (D-271: a picture drawn from another pack
  violates it). Cut with a one-off Python script using Pillow, kept in
  `docs/task-cycles/scena-z-ludzikiem/sprites/`, which git ignores; no script, image library or
  dependency enters the repository. Before writing the script read
  C:\Storage\The Brain\The Brain\.ai\rules\scripts.md. The build is not changed: it copies every
  PNG file directly in `assets/sprites/` (`copySpriteFiles`), so the files stand directly there, in
  no subdirectory. In `README.md`, where the sentence of `npm run build` names
  `assets/sprites/login-backdrop.png` and `assets/sprites/forest-scene.png` as composed from
  pictures of Pixel Crawler by Anokolisa whose terms ask for no credit, name the new pictures the
  same way. View each file. The report names, for each file, its source, its frame size and number
  of frames, the chunks it holds, and the script's path and the command that ran it.
- **Change:** `assets/sprites/mage-idle.png` · `assets/sprites/mage-run.png` ·
  `assets/sprites/fire.png` · `assets/sprites/sticks.png` · `assets/sprites/berry-bush.png` ·
  `assets/sprites/moss.png` · `README.md`
- **Read:** `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:29-43` To do ·
  `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:126-152` Context ·
  `foundations/decisions.md:5620-5645` D-271 · `foundations/decisions.md:5674-5703` D-273 ·
  `foundations/decisions.md:6737-6774` D-314 and D-315 · `foundations/invariants.md:1199-1207`
  sprite-file-content · `foundations/part_map.md:3-28` browser-view · E3 ·
  `scripts/static-files.mjs` · `guidelines/styleguide-browser-view.md`
- **Model:** cheaper
- **Risk:** trust boundary — `assets/sprites/**`
- **Checks:** the one-off script of `docs/task-cycles/scena-z-ludzikiem/sprites/` run with
  `python -I`, listing the chunk types and the size of each new file; `npm run build`, then
  `git diff --no-index --stat assets/sprites dist/public/sprites` exiting 0, each file copied
  unchanged
- **Depends on:** E3

### Slice 2 — the container holds the scene's sprites

- **Goal:** a new test `tests/invariants/test_loop2_container_sprites.py` is the check of
  `loop2-container-sprites` (E10) on the image's side, on the model of
  `tests/invariants/test_loop2_container_icons.py`: the image `docker build` builds from the working
  tree serves each file directly in `assets/sprites/` whose name ends in `.png` at
  `/sprites/<file name>` with the same bytes as the file in the working tree; an empty set fails
  the check; where no Docker daemon answers the test is skipped, so the invariant stays unchecked,
  never passed. Its docstring reads the invariant's sentence as E10 words it, as the icons test reads
  its own, and says that the files the scene's drawing asks for are tied to these files by the case
  of Slice 3. Through `the-way-update-part-map`, the part map's entry `deployment` claims the new
  file, as it claims the icons test. See the test fail once against a wrong expectation made only
  locally, never committed, and name that run in the report.
- **Change:** `tests/invariants/test_loop2_container_sprites.py` · `foundations/part_map.md`
- **Read:** E10 · `foundations/invariants.md:344-353` loop2-container-icons ·
  `foundations/part_map.md:143-168` deployment · `tests/invariants/test_loop2_container_icons.py` ·
  `tests/invariants/account_container_support.py` · `Dockerfile` · `.dockerignore` ·
  `scripts/static-files.mjs` · `guidelines/coding.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_loop2_container_sprites.py` (a skip without a
  Docker daemon is reported as unchecked); `python -B .the-way/elements/common/foundation_check.py`
  for the claim of the new file
- **Depends on:** Slice 1 · E10

### Slice 3 — what the scene draws, from the data and the game state

- **Goal:** a new data file `src/browser/sim/data/scene.ts` holds the scene's pictures and places
  (D-18, E1; content-identifiers keeps them out of the view): the background, `forest-scene.png`
  of D-314, and the frame of 336 × 152 pixels in which every place is given; the mage's idle and run
  sheets keyed by `ArchetypeId` — file, frame size and number of frames (4 and 6), as the files of
  Slice 1 give them; the fire's sheet (4 frames) with its place and the place the mage stands at it;
  a prop for each of the stick, the berry and the moss, keyed by `ResourceId`, with its file, size,
  place and the place the mage stands at it — the fibre has none, so at it the mage stays (To do 3);
  the clearing and the right edge, one place each. The places carry the layout of the old Loop's
  scene, C:\Storage\repos\loop\src\components\probe\Scene.tsx lines 44-58 at cdc7c0d (in pixels of
  the frame: moss at 40, the mage at 26; sticks at 80, the mage at 58; bush at 252, the mage at 240;
  fire at 124, the mage at 96; clearing 160; right edge 292; ground line 136), which the background
  of task 6 follows; a place found not to fit that background is moved and named in the report. The
  file follows the exemplar `src/browser/sim/data/resources.ts` (`satisfies`, identifiers from
  `keyof typeof`) and imports simulation files alone.
  A new pure module `src/browser/view/scene-picture.ts`, on the model of
  `src/browser/view/terrain-picture.ts`, gives from a game state holding its map run plain data for
  drawing, with no DOM:
  - where the mage goes (To do 3, row 2): „Zbierz” and „Obchód” to the place at the prop of their
    target resource, and stays for a target with no prop; „Wytwórz — ognisko”, „Zapal — ognisko”
    and „Zasil — ognisko” to the place at the fire; „Zapal — patyk” and „Zjedz” stays; „Eksploruj”,
    „Wędruj”, „Idź” and „Idź — ognisko” to the right edge, always the same place; waiting to the
    clearing; in combat (no current activity) and after a death or a completion it stays. „Stays”
    is a value of its own: the place is left to the scene's previous reading (Slice 5), the
    clearing where there is none;
  - the mage's sheets, from the data by the archetype of the map run's character in the team;
  - the props, always (To do 4, row 3), and the fire only while a campfire stands on the
    character's tile, burning while it has minutes left and extinguished otherwise (D-68);
  - the badge: the icon file of the current action, the one the row of the rule shows
    (`ACTIONS[kind].icon`, D-291), and the progress of the action, the game minutes passed since its
    start with the fraction `realMsCarry` holds over its length in game minutes, from 0 to 1; no
    badge while waiting, in combat, after a death and after a completion (To do 6, 9; rows 5, 8);
  - how the scene stands: going; stopped by the player's pause (`paused` with no `discovery`),
    grey; stopped at a discovery (`discovery` held), in colour (E9); after a death, stopped with the
    mage grey; after a completion, stopped in colour (To do 8, 9; rows 1, 8). A loaded map run comes
    back paused (D-212), so grey.
  Every URL of a sprite is built from the data under `/sprites/`. No identifier or name of a map, a
  resource or an archetype stands in the module (content-identifiers).
  Write the cases first in a new `tests/view/scene-picture.test.mjs`, unit tests with the expected
  values written out: a case for each line of the table of To do 3, the place expected written as
  the prop of the target the task names; the props in a map run with none on the character's tile;
  the fire absent, burning and extinguished; the badge's icon the file of the rule's row for each
  action; the progress at the start, midway with a carry and at the end; no badge while waiting, in
  combat, after a death and after a completion; each way the scene stands; and a case marked with
  `loop2-container-sprites` that every file the scene's data names stands directly in
  `assets/sprites/` as a `.png` file, as `tests/view/icons.test.mjs` checks that each icon the data
  names exists as a file.
- **Change:** `src/browser/sim/data/scene.ts` · `src/browser/view/scene-picture.ts` ·
  `tests/view/scene-picture.test.mjs`
- **Read:** `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:29-43` To do ·
  `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:51-66` Questions to settle, questions 1-3 ·
  `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:74-79` Questions to settle, question 5 ·
  `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:86-91` Questions to settle, question 7 ·
  `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:126-152` Context ·
  `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:220-234` Settlements to record ·
  E1 · E9 · E10 · Row 1 · Row 2 · Row 3 · Row 5 · Row 8 ·
  `foundations/decisions.md:52-112` D-04 · `foundations/decisions.md:383-400` D-18 ·
  `foundations/decisions.md:1229-1242` D-62 · `foundations/decisions.md:1334-1347` D-68 ·
  `foundations/decisions.md:2205-2243` D-122 · `foundations/decisions.md:2486-2510` D-132 ·
  `foundations/decisions.md:3891-3929` D-212 · `foundations/decisions.md:5620-5645` D-271 ·
  `foundations/decisions.md:6184-6207` D-291 · `foundations/decisions.md:6737-6754` D-314 ·
  `foundations/invariants.md:214-246` simulation-isolation, simulation-inputs and
  content-identifiers · `foundations/glossary.md:18-23` map run ·
  `foundations/glossary.md:80-85` extinguished campfire · `foundations/glossary.md:111-115`
  archetype · `foundations/glossary.md:136-140` completion · `foundations/part_map.md:3-60`
  browser-view and simulation · `guidelines/coding.md` · `guidelines/coding-content-data.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `src/browser/view/terrain-picture.ts` ·
  `src/browser/sim/data/resources.ts` · `src/browser/sim/data/campfire.ts` ·
  `src/browser/sim/data/archetypes.ts` · `src/browser/sim/data/actions.ts` ·
  `src/browser/sim/types.ts:150-284` · `src/browser/sim/types.ts:352-434` ·
  `src/browser/view/rule-list.tsx:476-487` · `tests/view/terrain-picture.test.mjs` ·
  `tests/view/icons.test.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/scene-picture.test.mjs`, seen failing before the modules
  exist; `npm test -- tests/invariants/test_content_identifiers.py`;
  `npm test -- tests/invariants/test_simulation_isolation.py`;
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · E1 · E9 · E10 · Row 1 · Row 2 · Row 3 · Row 5 · Row 8

### Slice 4 — the scene drawn still

- **Goal:** a new React component `src/browser/view/scene.tsx` draws the scene from what the pure
  module of Slice 3 gives, still — motion comes in Slice 5; read the two files Slice 3 made,
  `src/browser/view/scene-picture.ts` and `src/browser/sim/data/scene.ts`, whole, besides *Read*.
  It draws the background; the props; the
  fire, burning, or extinguished as the same picture without colour and on its first frame (To do
  4); the mage at its place, on the first frame of its idle sheet; over its head the badge on a
  solid `panel` (row 6, E8, D-272), in it the action's icon drawn as a mask (the class
  `action-icon` of the stylesheet, its file in `--icon`, as the rule's row draws it) in
  `text-strong` (row 9, E6, E8), and under the icon the bar, a track in `highlight` with a fill in
  `positive` as long as the progress (E7). Stopped by the player's pause, the whole scene takes
  `grayscale(1) brightness(0.5)` (To do 8, row 1); at a discovery it keeps its colours (E9); after a
  death the mage is grey and the badge gone, after a completion the badge is gone and the mage in
  colour (To do 9, row 8); the grey of the dead mage and of the extinguished fire is one value, the old Loop's
  `grayscale(1) brightness(0.55)`, settled by the orchestrator as an autonomous choice (the old Loop
  draws both with it) (C:\Storage\repos\loop\src\components\probe\sprites.tsx line 64,
  cdc7c0d). The scene is drawn at the size of `SCENE_SCALE`, pixel-sharp; the places, frames and
  sizes of the sprites come from TypeScript as percentages of the frame or as custom properties set
  on the element, so that the stylesheet holds no length in `px` for a sprite beyond the layout
  dimensions D-43 leaves out, and `browser-view-token-values` stays as it is (E6). The scene is a
  picture (To do 11, row 7): nothing in it is reached by the keyboard, a click on it does nothing,
  no pause sign and no text stands on it or over it (D-272, D-44, D-47), and it is hidden from
  assistive technology as the picture with an empty `alt` is today. `src/browser/view/world-area.tsx`
  draws the scene in the place of the picture of the forest; the background's file comes from the
  data of Slice 3. In `src/browser/styles.css` the rules of the scene read existing tokens alone —
  no new token, colour or role (`src/browser/AGENTS.md`); the badge's size is chosen by viewing the
  scene at both scales (carried question 5), its icon's side a layout dimension, its padding a
  stage of the spacing scale and the bar's thickness an existing token; the two greys stand in the
  scene's rules, each with a comment naming its source. Write the cases first in a new
  `tests/view/scene.test.mjs` on the harness of `tests/view/page-document.mjs`: the parts drawn in
  each way the scene stands; the badge with its icon file and a fill as long as the progress; no
  badge while waiting, in combat, after a death and after a completion; the fire absent, burning
  and extinguished; no element of the scene the keyboard reaches, and a click on it leaving the
  game state as it was. The case of `tests/view/world-area.test.mjs` „the scene is the picture of
  the forest at the size of the scale, with no text inside or over it” follows the scene that is no
  longer one `img`, the changed case naming its cause, To do 1 and 7, and keeping its check of the
  size and of no text. Then operate the built game in a real browser as
  `.claude/skills/loop2-play/SKILL.md` gives (D-254, D-88) and take screenshots into
  `docs/task-cycles/scena-z-ludzikiem/screenshots/` at the committed scale, and at the other scale
  reached by changing the constant locally, never committed: the mage gathering a stick with the
  badge, at the fire, paused, at a discovery, after a death and after a completion; name each file in
  the report, with the badge's size and why.
- **Change:** `src/browser/view/scene.tsx` · `src/browser/styles.css` ·
  `src/browser/view/world-area.tsx` · `tests/view/scene.test.mjs` · `tests/view/world-area.test.mjs`
- **Read:** `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:29-47` To do and Acceptance
  criteria · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:51-55` Questions to settle,
  question 1 · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:80-97` Questions to settle,
  questions 6-8 · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:114-124` Questions to settle,
  questions 12-13 · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:126-160` Context and
  Questions carried to cycle · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:220-234`
  Settlements to record · E1 · E4 · E6 · E7 · E8 · E9 · Row 1 · Row 3 · Row 5 · Row 6 · Row 7 ·
  Row 8 · Row 9 · `foundations/decisions.md:39-50` D-03 · `foundations/decisions.md:824-942` D-38 to
  D-45 · `foundations/decisions.md:959-973` D-47 · `foundations/decisions.md:1229-1242` D-62 · `foundations/decisions.md:1334-1347` D-68 · `foundations/decisions.md:2205-2243` D-122 · `foundations/decisions.md:2486-2510` D-132 · `foundations/decisions.md:1593-1617` D-87 and
  D-88 · `foundations/decisions.md:5150-5177` D-254 · `foundations/decisions.md:5491-5563` D-267
  and D-268 · `foundations/decisions.md:5620-5672` D-271 and D-272 ·
  `foundations/decisions.md:5848-5870` D-279 · `foundations/decisions.md:6184-6207` D-291 ·
  `foundations/decisions.md:6621-6655` D-311 · `foundations/decisions.md:6737-6774` D-314 and D-315 ·
  `foundations/invariants.md:35-43` browser-view-framework · `foundations/invariants.md:236-246`
  content-identifiers · `foundations/invariants.md:459-497` browser-view-token-values,
  browser-view-focus-outline, design-token-contrast and design-token-sources ·
  `foundations/invariants.md:1189-1197` document-test-memory-limit ·
  `foundations/glossary.md:80-85` extinguished campfire · `foundations/glossary.md:136-140`
  completion · `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `src/browser/tokens.css` · `src/browser/view/rule-list.tsx:476-487` ·
  `src/browser/view/run-screen.tsx` · `tests/view/page-document.mjs`
- **Model:** same — it lays the sprites out at two scales under the token rule and picks the
  badge's size by viewing the running game, the look the human judges first
- **Risk:** none
- **Checks:** `npm test -- tests/view/scene.test.mjs`, seen failing before the component exists;
  `npm test -- tests/view/world-area.test.mjs`;
  `npm test -- tests/invariants/test_browser_view_token_values.py`;
  `npm test -- tests/invariants/test_browser_view_focus_outline.py`;
  `npm test -- tests/invariants/test_content_identifiers.py`;
  `npm test -- tests/invariants/test_browser_view_framework.py`;
  `npm test -- tests/quality/test_quality_invariants.py`; the screenshots above
- **Depends on:** Slice 3 · E1 · E4 · E6 · E7 · E8 · E9 · Row 1 · Row 3 · Row 5 · Row 6 · Row 7 ·
  Row 8 · Row 9

### Slice 5 — the scene moves

- **Goal:** read `src/browser/view/scene-picture.ts` of Slice 3 whole besides *Read*. The scene of
  Slice 4 moves by CSS alone, at a fixed beat that does not depend on the
  pace, with no loop of drawing — no interval, timer or animation frame of its own (E1, row 4,
  To do 5): the frames of the mage's sheets and of the burning fire change every 160 ms; the mage
  walks to its place in 640 ms on its run sheet, facing the way it walks, and stands on its idle
  sheet once there; a target changed on the way turns it from where it is; at the start of a map run
  and after „Restart” — the event `mapRunStarted` the simulation returned — and at the scene's first
  draw, after a load included, it stands at once at its place, crossing nothing; where Slice 3 says
  it stays, it keeps the place of the scene's previous reading (E5). The bar fills smoothly between
  the readings of the clock (every 200 ms, `src/browser/view/clock.ts`): its length follows each
  reading over the reading's interval, and a new action's bar starts empty without running back
  (carried question 4). Every stop — the player's pause, a discovery, a death, a completion —
  stops all motion where it is: the frames, the fire and the mage on its way (To do 8, 9; rows 1,
  8). Under the system's setting for reduced motion the frames do not change, the mage stands at its
  place at once and the bar jumps at each reading (E2, To do 10); the scene shows no flash of its
  whole area, and its grey comes at the pause with no animation. The game redraws the screen five
  times a second, so a redraw must restart no animation of the scene (D-03's accepted risk).
  `src/browser/view/run-screen.tsx` hands the events of `update` to the world area, and
  `src/browser/view/world-area.tsx` hands them to the scene; nothing new enters the game state (E5,
  D-04). Write the cases first in `tests/view/scene.test.mjs`, of what jsdom can show: a scene that
  stands at once at `mapRunStarted` and at its first draw, and walks at an ordinary change of
  activity; a place kept from the previous reading where the mage stays; a stopped scene in each of
  the four stops; a new action's bar starting empty. Then operate the built game as
  `.claude/skills/loop2-play/SKILL.md` gives and read motion from a stream of frames
  (D-254): at 1×, 4× and 16×; a pause and a discovery during a walk; a target changed during a
  walk; „Restart”; a load; and the same with reduced motion emulated in the browser. Name in the
  report what the frames show, with each file of `docs/task-cycles/scena-z-ludzikiem/frames/`
  used, and that the human's own viewing at 1×, 4× and 16× before the merge stays (Acceptance
  criteria; D-254).
- **Change:** `src/browser/view/scene.tsx` · `src/browser/styles.css` ·
  `src/browser/view/world-area.tsx` · `src/browser/view/run-screen.tsx` · `tests/view/scene.test.mjs`
- **Read:** `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:29-47` To do and Acceptance
  criteria · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:51-55` Questions to settle,
  question 1 · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:67-73` Questions to settle,
  question 4 · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:86-91` Questions to settle,
  question 7 · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:126-160` Context and Questions
  carried to cycle · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:220-234` Settlements to
  record · E1 · E2 · E5 · E6 · Row 1 · Row 4 · Row 8 · `foundations/decisions.md:39-112` D-03 and
  D-04 · `foundations/decisions.md:899-912` D-43 · `foundations/decisions.md:1435-1446` D-75 ·
  `foundations/decisions.md:1606-1617` D-88 · `foundations/decisions.md:2205-2243` D-122 ·
  `foundations/decisions.md:1229-1242` D-62 · `foundations/decisions.md:1334-1347` D-68 · `foundations/decisions.md:2486-2510` D-132 ·
  `foundations/decisions.md:3891-3929` D-212 · `foundations/decisions.md:5150-5177` D-254 ·
  `foundations/decisions.md:5491-5563` D-267 and D-268 · `foundations/invariants.md:35-43`
  browser-view-framework · `foundations/invariants.md:459-467` browser-view-token-values ·
  `foundations/invariants.md:1189-1197` document-test-memory-limit ·
  `foundations/glossary.md:65-71` map run restart · `foundations/glossary.md:130-134` manual map run ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `src/browser/view/clock.ts` · `src/browser/sim/run.ts:62-82` · `src/browser/sim/game.ts:425-443` ·
  `src/browser/view/game-view.ts:540-556` · `tests/view/run-screen.test.mjs` ·
  `tests/view/page-document.mjs`
- **Model:** strongest — motion that freezes where it is at four kinds of stop, turns on its way and
  survives a redraw five times a second, from CSS alone, is a design of its own
- **Risk:** none
- **Checks:** `npm test -- tests/view/scene.test.mjs`, the new cases seen failing first;
  `npm test -- tests/view/run-screen.test.mjs`; `npm test -- tests/view/world-area.test.mjs`;
  `npm test -- tests/invariants/test_browser_view_token_values.py`;
  `npm test -- tests/quality/test_quality_invariants.py`; the stream of frames above
- **Depends on:** Slice 4 · E1 · E2 · E5 · E6 · Row 1 · Row 4 · Row 8

### Slice 6 — the guidelines know the scene

- **Goal:** through `the-way-maintain-styleguide`, `guidelines/styleguide-browser-view.md` says how
  the scene uses roles and values (To do 14): a rule for the scene — the badge on `panel`, its
  icon in `text-strong` with no text beside it, the bar with its fill in `positive` on a track in
  `highlight`, the grey of the player's pause and its source, the colours kept at a discovery and
  after a completion, the grey of the dead mage and of the extinguished fire and its source, the
  scene with no text, no control and no flash; the table *Roles* follows E7 and E8 where their
  meanings grow; and the rule „No value in place of a design token” lists the exemptions of E6 —
  the geometry of the scene computed in TypeScript, the frames and positions of a sprite and the
  icon with no text beside it — and says that `browser-view-token-values` lets them through
  because they stand in TypeScript, as Slices 4 and 5 made them. Through
  `the-way-maintain-coding-guidelines`, the table *Files of this kind* of
  `guidelines/coding-browser-module.md` gains rows for `src/browser/view/scene.tsx` and
  `src/browser/view/scene-picture.ts`, and that of `guidelines/coding-content-data.md` a row for
  `src/browser/sim/data/scene.ts` (To do 15), each with the status the table gives a file of its
  kind (`copy`, as for the React modules and the pure modules and as for the data files). The text
  says what the code of Slices 3-5 does, read from that code — the files Slices 3-5 made,
  `src/browser/view/scene.tsx`, `src/browser/view/scene-picture.ts` and
  `src/browser/sim/data/scene.ts`, read whole besides *Read* — and words no decision.
- **Change:** `guidelines/styleguide-browser-view.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/coding-content-data.md`
- **Read:** `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:29-43` To do ·
  `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:80-85` Questions to settle, question 6 ·
  `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:114-124` Questions to settle, questions 12-13 ·
  E6 · E7 · E8 · Row 1 · Row 6 · Row 8 · Row 9 · `foundations/decisions.md:824-912` D-38 to D-43 ·
  `foundations/invariants.md:459-467` browser-view-token-values ·
  `.claude/skills/the-way-maintain-styleguide/SKILL.md` ·
  `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md` · `src/browser/styles.css`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`;
  `npm test -- tests/invariants/test_browser_view_token_values.py`
- **Depends on:** Slice 3 · Slice 4 · Slice 5 · E6 · E7 · E8

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Outcome: in a larger scene of a pixel forest the mage walks to the sticks and the campfire, with the icon of its activity and a progress bar over its head, and the scene stays in colour at a discovery | Slices 1, 3, 4, 5 · E1 · E9 |
| To do 1 — a moving scene of a forest in snow, in full light, in place of task 6's still frame, at the size task 6 chose | Slices 4, 5 (the frame of task 6 stays the background, D-314, D-315; `SCENE_SCALE` as the base holds it) |
| To do 2 — the character is the pack's mage | Slice 1 · Slice 3 · E3 |
| To do 3 — where the mage goes for each activity | Slice 3 · Row 2 |
| To do 4 — props always, the campfire only on the character's tile, burning with moving fire or extinguished without colour and motion | Slices 3, 4, 5 · Row 3 |
| To do 5 — motion from CSS at a fixed beat, 160 ms frames, 640 ms walk, turning on the way, standing at once at the start, after „Restart” and after a load | Slice 5 · Row 4 · E1 · E5 |
| To do 6 — the badge on `panel` with the action's icon in `text-strong` and the bar `positive` on `highlight`; none while waiting or in combat | Slices 3, 4 · Rows 5, 6, 9 · E7 · E8 |
| To do 7 — the pictures of the character and of each resource in the scene stand in the game's data | Slice 3 · E1 |
| To do 8 — the pause greys the scene and stops its motion; a stop at a discovery keeps colour and stops motion | Slices 3, 4, 5 · Row 1 · E9 |
| To do 9 — after a death and a completion motion stops and the badge goes; the dead mage grey, the mage after a completion in colour | Slices 3, 4, 5 · Row 8 |
| To do 10 — no flash of the whole area; reduced motion: no frames, the mage at once, the bar jumping | Slice 5 · E2 |
| To do 11 — the scene is a picture, no click, no pause sign | Slice 4 · Row 7 |
| To do 12 — the new pictures in `assets/sprites/`, PNG with pixels alone, and every file the drawing asks for in `npm run build` and in the server's image | Slice 1 · Slice 2 · Slice 3 (its case of `loop2-container-sprites`) · E10 |
| To do 13 — the foundation gets the parts of *Decisions in play* this task makes true and the accepted rows | E1-E10 · Rows 1-9 |
| To do 14 — the styleguide on the scene's roles and values, and the token rule and its guard letting the frames and positions of a sprite through | Slice 6 · Slices 4, 5 (no `px` of a sprite in the stylesheet) · E6 |
| To do 15 — the tables of `coding-browser-module.md` and `coding-content-data.md` know the new files | Slice 6 |
| Acceptance criterion — the human views the scene of the task's branch at 1×, 4× and 16× before the merge | stays with the human, before the merge; Slices 4 and 5 give the agent's screenshots and frames, which replace no part of it (D-254) |
| Questions to settle 1-13 | their answers stand in To do 1-15 and rows 1-9, covered above; question 9 by the base's `SCENE_SCALE` (report, question 2); question 10 by the acceptance criterion; question 11 by D-314 and D-315 at the base |
| Questions carried to cycle 1-5 | *Choices*, rows 1, 2, 3, 6 and 7 |
| Rows 1-9 of *Settlements to record* | Rows 1-9 of *Foundation entries*, and the slices each names |
| Projected entries of *Decisions in play* carried in part | E1-E10 |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The still frame of task 6 stays the scene's background, and the props, the fire and the mage stand over it as sprites of their own (carried question 1; D-314, D-315) | composing the background anew from separate files | a later redraw of the frame moves trees under a prop; the places of Slice 3 then move with it |
| The mage is cut once by a one-off Pillow script kept under `.runs/`, never in the repository, as task 6 composed its frame; the fire and the props are the old Loop's cut pictures copied unchanged (carried question 2) | a cutting script in `scripts/`, with an image library in the build tools | a later cut of the same mage takes the recipe from Slice 1's report in the cycle's record, not a command of the repository |
| The scene's pictures and places stand in one new data file, `src/browser/sim/data/scene.ts`, keyed by `ResourceId` and `ArchetypeId` (carried question 3) | fields spread over `resources.ts`, `campfire.ts` and `archetypes.ts` | the layout of one picture moves into three catalogues of the simulation's numbers later, a change of data alone |
| The places of the old Loop's scene, in pixels of the frame of 336 × 152, which task 6's background follows | places chosen anew by viewing | a prop standing on a tree of the background; Slice 4's screenshots show it and Slice 3's data moves it |
| The bar's length is the progress at each reading, with the fraction of a game minute `realMsCarry` holds, gliding over the reading's interval of 200 ms by CSS, and a new action's bar a new element that starts empty (carried question 4) | an interpolation in TypeScript between readings, which is a loop of drawing | the bar runs one reading behind the game; at 16× an action of 5 game minutes lasts about a third of a second, so it fills in two readings |
| The badge's size is chosen by viewing the scene at both scales; its icon's side a layout dimension, its padding a stage of the spacing scale, the bar's thickness an existing token (carried question 5) | a new token for the badge | the human picks another size at the request; one value to change |
| The frames, places and sizes of the sprites come from TypeScript as percentages or custom properties, so the stylesheet holds no `px` of a sprite and the guard `browser-view-token-values` stays as it is (To do 14, E6) | `px` of the sprites in the stylesheet, with the guard's test taught to let them through | a later task that needs a `px` of a sprite in the stylesheet changes the guard then |
| The beats of 160 ms, 640 ms and 200 ms and the two greys stand as values of the scene's rules in `src/browser/styles.css`, each with its source in a comment and in the styleguide, with no token: the styleguide's kinds of token values hold neither durations nor filters, and D-43 counts neither | tokens in `src/browser/tokens.css` | the styleguide may be read to want them as tokens; moving five values into the token file with their sources |
| The walk is a CSS transition of the mage's place, which turns from where the mage is by itself and restarts nothing at a redraw; a stop pins the mage at the place it has reached; the frames are CSS animations held by their play state at a stop | the walk as a keyframe animation started anew at each change of target | at 16× the targets change often; the other way turns by reading the place at each change, a stop by holding the play state |
| The mage stands at once at the event `mapRunStarted` and at the scene's first draw, and where it stays it keeps the place of the previous reading, which E5 allows; nothing enters the game state | a field of the game state for the scene, which D-04's projected *Rejected* refuses because a drawing's state would enter the save | a start the event does not mark makes the mage walk across the frame at it |
| The grey of the dead mage and of the extinguished fire is one value, by default the old Loop's `grayscale(1) brightness(0.55)`, settled by the orchestrator (record, Q3): the value the old Loop draws both with | `grayscale(1)` alone, read from „bez koloru”; the pause's own value | the human sees a dead mage brighter or darker than wanted; one value to change |
| The grey comes at the pause at once, with no transition | the old Loop's 220 ms ease of the filter | the change of the whole scene reads as abrupt; a transition added later is to be read against E2's „no flash” |
| `loop2-container-sprites` is checked by a container test of every PNG of `assets/sprites/` (Slice 2) and a case tying the scene's data to those files (Slice 3) | the method `review`; one Python test reading the TypeScript data | a second image build in the gate where Docker answers, minutes long, skipped where it does not |
| The base's `SCENE_SCALE` of 2, 672 × 304, is kept, and every place is given in pixels of the frame and drawn at the scale, so either size works | the scale changed in this task | if the human meant 336 × 152, the constant changes and the rules of one scale go, as task 6 left it |
| The still scene and its motion are two slices | one slice | a still composition the motion later moves elsewhere; the reviewer of the whole change reads both together |
| The three guideline files change in one last slice through their two skills, after the code they describe | each folded into the slice that adds its files | text that describes code before that code holds |
| The new files are named `mage-idle.png`, `mage-run.png`, `fire.png`, `sticks.png`, `berry-bush.png`, `moss.png`, `scene.ts`, `scene-picture.ts` and `scene.tsx` | names taken from the old Loop as they stand (`bush.png`, `char_idle.png`) | a rename, one line of data each |
