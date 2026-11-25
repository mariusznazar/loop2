# Plan — loop2: katalog map na ekranie Mapy — Matecznik z liczbą i Las — wataha jako pierwsza nowa mapa z samych danych, sprawdzone przed wejściem do gry

- Task: `.runs/task-cycles/katalog-map/task.md`
- Spec: none
- Base: 97936c245cecfc11778fcf3d10feb075436d17fc

## Foundation entries

One agent writes these, before Slice 1, each through its project skill of the-way (`the-way-record-decision`,
`the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-update-part-map`,
`the-way-record-environment-fact`), in the wording the task quotes in *Decisions in play* and *Settlements to
record*. The writer of the environment fact reads the pack's page on OpenGameArt
(`https://opengameart.org/content/lpc-bears-deer-lions-and-more`) to quote its author, licence and attribution
passage, so it needs network access; where it has none it returns, since the fact cannot be written from memory.
`D-136` (written by task 9), `D-388`, `D-187`, `D-27`, `D-239`, `D-243`, `D-333`, `D-148`, `D-428`, `D-396`,
`D-418` and `D-439` stay as they are, as *Decisions in play* says.

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| D-325 — What does the screen Mapy show? | decision, changed (a catalog with regions, search, three views and empty places in place of the list of open maps; the number at Matecznik; the rejected "empty places" and the counter sentence of its rationale go) | Settlement row 1 · *Decisions in play* | Slice 8 · Slice 9 · Slice 10 · Slice 11 · Slice 12 |
| D-331 — What does the screen Mapy show before a map is picked, and how does a row of the list look? | decision, changed (a row with the state circle, the name and the short demand) | Settlement row 2 · *Decisions in play* | Slice 9 · Slice 10 · Slice 12 |
| D-134 — Where does the player see that a map is solved? | decision, changed only as far as the circle of the row replaces the word on the list; the card stays | *Decisions in play* | Slice 9 · Slice 10 · Slice 12 |
| D-149 — When does the game offer a map opened by another map? | decision, changed by the Q1 a note of *Decisions in play* (a map not yet opened stands on the screen Mapy only as an empty place in the view „Postęp” and in the counter of its region); unchanged for Matecznik (Q3 a). The orchestrator's handoff did not list this edit; *Decisions in play* does | *Decisions in play* | Slice 8 · Slice 9 |
| D-24 — What is a game map made of? | decision, changed (a map's data carry its region) | Settlement row 3 | Slice 3 · Slice 8 |
| D-327 — What does the card of a map hold? | decision, changed (the card of Matecznik carries the number; „Czyha” shows the bear with icon, health and blow; „Odbiera” shows entry cap 0) | *Decisions in play* | Slice 11 · Slice 12 |
| D-440 — What does the game remember of a judging, and what stands beside the list „Program:”? | decision, changed (the record of the most creature health a judging took, in this browser) | Settlement row 4 · *Decisions in play* | Slice 6 · Slice 7 · Slice 11 |
| D-441 — Where does the game keep the last judging of each character, program and map? | decision, changed (the record is a value of its own in the lasting storage beside the judgings) | *Decisions in play* | Slice 7 · Slice 11 |
| D-271 — Where do the scene's pictures come from? | decision, changed (the bear's pictures come from the pack "[LPC] bears, deer, lions and more", taken under CC-BY 4.0 and credited) | Settlement row 5 | Slice 1 · Slice 2 · Slice 4 |
| D-18 — Where does the game's content live? | decision, rationale only (the sentence "each further map is meant to teach a further mechanic or set a challenge that the means so far do not close" is corrected) | To do 7 | none |
| D-429 — Do the results of the balance instrument's measurements enter the repository? | decision, rationale only (the sentence on the numbers of the maps narrowed to the numbers a decision or an invariant names) | To do 7 | none |
| D-438 — May the progression require the player's absence? | decision, changed (a second paragraph: Las — matecznik is excepted until the change that sets its numbers; the reading of "can be solved" and of "no program solves it" of Settlement row 6) | Settlement row 6 · To do 7 | Slice 3 · Slice 5 |
| (new) How may a map differ from the map that opens it? | decision, new | To do 7 · *Decisions in play* | Slice 3 · Slice 5 |
| (new) Which numbers of a map are requirements of the game? | decision, new (its *Relations* and *Verification* are written by this agent) | To do 7 · *Decisions in play* | Slice 3 · Slice 5 |
| `wall` of `foundations/glossary.md` | glossary, changed (without "and without it is solved rarely") | To do 7 | none |
| Environment fact: the licence of the pack "[LPC] bears, deer, lions and more" | environment fact, new (author, licence CC-BY 4.0, the page's attribution passage quoted, with the date it was read) | Settlement row 5 · skill `loop2-scene-art`, step 5 | Slice 1 |
| `sprite-credits` of `foundations/invariants.md` | invariant, changed in *Rests on* only (the new fact is added; its test `tests/view/icons.test.mjs` is changed by Slice 1) | Settlement row 5 · skill `loop2-scene-art`, step 5 | Slice 1 |
| External context of `foundations/part_map.md` | part map, one row added: the pack "[LPC] bears, deer, lions and more", `them → us`, `untrusted` | Settlement row 5 · skill `loop2-scene-art`, step 5 | Slice 1 |

## Slices

### Slice 1 — The bear's pictures from the new pack, with the pack's credit

- **Goal:** Four PNG files of the bear stand in `assets/sprites/`: `bear-idle.png`, `bear-run.png`, `bear-bite.png`
  and `bear-death.png`, each a strip of 64 × 64 frames cut with `sheet-frames.mjs cut` from the pack's sheets of one
  bear (a bear of the pack seen from the side, facing left as the wolf's sheets face, the brown one rather than the
  polar one, which would vanish in the snow of the scene — the executor looks at the sheets and says which it took),
  each cut compared with its sheet down to `differing pixels: 0`. The roles are those of the wolf's sheets
  (`SCENE_CREATURES` of `src/browser/sim/data/scene.ts`): the idle sheet is one standing frame made from a frame of
  the walk, because the pack has no standing animation; the run sheet is the walk, the bite sheet is the attack, the
  death sheet is the fall. The executor fetches the pack's download from its page into a directory of its own under
  `.runs/`, treats it as untrusted (no script is run from inside it), reads the pack's own licence and attribution
  text there and compares it with the environment fact written before this slice. `README.md`, point 2, now names
  four packs, names this one with its four files and says, as for the wolf, how they were made; `PACK_CREDITS` of
  `src/browser/view/credits.ts` holds the pack's line (what it is for — the bear —, title, author, page with a link,
  CC BY 4.0 with its link, and how the files differ from the source); `tests/view/icons.test.mjs` assigns the four
  files to the new pack, holds the pack's line and page link, and counts the lines of the section anew. The first check
  of `loop2-scene-art` is made with the numbers of the bear's figure beside the mage's and the wolf's, and the numbers
  go into the report for the request. Nothing in the game's data names the files yet (Slice 2 does).
- **Change:** `assets/sprites/bear-idle.png` · `assets/sprites/bear-run.png` · `assets/sprites/bear-bite.png` · `assets/sprites/bear-death.png` · `README.md` · `src/browser/view/credits.ts` · `tests/view/icons.test.mjs`
- **Read:** `.runs/task-cycles/katalog-map/task.md:30-30` To do 3 · `.runs/task-cycles/katalog-map/task.md:56-64` Q2 · `.runs/task-cycles/katalog-map/task.md:130-130` the pack, in Context · `.runs/task-cycles/katalog-map/task.md:177-177` D-271 in *Decisions in play* · `.runs/task-cycles/katalog-map/task.md:201-201` Settlement row 5 · `foundations/decisions.md:5160-5267` D-271 · `foundations/invariants.md:1208-1216` sprite-file-content · `foundations/invariants.md:1218-1226` loop2-container-sprites · `foundations/invariants.md:1308-1316` sprite-credits · `foundations/environment_facts.md:840-844` lpc-wolf-licence · the new environment fact (row "Environment fact: the licence of the pack …" of *Foundation entries*) · `foundations/part_map.md:1-33` browser-view · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-scene-art/SKILL.md` · `.claude/skills/loop2-scene-art/sheet-frames.mjs` · `src/browser/sim/data/scene.ts:86-125` SCENE_CREATURES · `README.md:30-36` · `tests/invariants/test_icon_credits.py`
- **Model:** same — chooses a bear, frames and a standing frame by looking at sheets it has not seen, which the scripts support and do not decide
- **Risk:** trust boundary — `assets/sprites/**`, four files cut from a pack that comes from outside (part map, `browser-view`)
- **Checks:** `node .claude/skills/loop2-scene-art/sheet-frames.mjs compare` on each of the four files against the sheet (`differing pixels: 0`) · `node .claude/skills/loop2-scene-art/sheet-frames.mjs measure assets/sprites/mage-idle.png#64 assets/sprites/wolf-idle.png#64 assets/sprites/bear-idle.png#64` (numbers for the report) · `npm test -- tests/view/icons.test.mjs` · `npm run --silent typecheck` · `npx eslint --max-warnings 0 src/browser/view/credits.ts` · `npx prettier --check src/browser/view/credits.ts tests/view/icons.test.mjs`
- **Depends on:** Foundation entries (D-271, the environment fact, `sprite-credits`, the part map row)

### Slice 2 — The bear creature, its icon and its place in the scene's data

- **Goal:** `bear` is in `CREATURES` of `src/browser/sim/data/creatures.ts` with the numbers of the old game's entry (120
  health, a blow of 20, the one rule "always → strike", revealed by being attacked by it, name „niedźwiedź”), an icon
  `bear-head` and its icon title, and `CreatureDef` gets a field with the form of the name after „z” („wilkiem”,
  „niedźwiedziem”; Slice 2b makes `now-lines.ts` read it), which the wolf's entry and its test in
  `tests/sim/data.test.mjs` hold too. The file `assets/icons/bear-head.svg` is the game-icons.net icon `bear-head`
  (author Delapouite) prepared as the other icons of `assets/icons/` are (the old game's repository holds the source
  file; the executor compares it with the icon source commit `ICON_SOURCE_COMMIT` of `credits.ts` and with how
  `wolf-head.svg` differs from its source, and prepares the file the same way); `ICON_CREDITS` of
  `src/browser/view/credits.ts` credits it. `SCENE_CREATURES` of `src/browser/sim/data/scene.ts` holds `bear`
  with the four sheets of Slice 1 and their frame sizes and counts. The section of credits lists the bear's icon after
  the wolf's (the tests of the section say so). No map attacks with the bear yet.
- **Change:** `src/browser/sim/data/creatures.ts` · `src/browser/sim/data/scene.ts` · `assets/icons/bear-head.svg` · `src/browser/view/credits.ts` · `tests/sim/data.test.mjs` · `tests/view/icons.test.mjs`
- **Read:** `.runs/task-cycles/katalog-map/task.md:30-30` To do 3 · `.runs/task-cycles/katalog-map/task.md:128-129` Context (the old game's lair and the bear) · `.runs/task-cycles/katalog-map/task.md:182-182` D-27 in *Decisions in play* · `foundations/decisions.md:4932-4983` D-27 · `foundations/decisions.md:5160-5267` D-271 · `foundations/part_map.md:1-66` browser-view and simulation · `guidelines/coding.md` · `guidelines/coding-content-data.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `assets/icons/wolf-head.svg`. Outside the repository, read-only, not counted by the size script (about 2.4 KB and 0.7 KB): the file src/sim/data/creatures.ts (the bear entry) and the file assets/game-icons/delapouite/bear-head.svg of the old game's repository the old game's repository, branch feat/archetypes, read with git -C the old game's repository show feat/archetypes:<path>, never checked out.
- **Model:** cheaper — the entry, the credit and the sheets' mapping follow the wolf's, and the icon is prepared as the existing ones
- **Risk:** trust boundary — `assets/icons/**`, one icon file from game-icons.net (part map, `browser-view`)
- **Checks:** `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/view/icons.test.mjs` · `npm test -- tests/view/scene-picture.test.mjs` · `npm test -- tests/sim/discovery.test.mjs` · `npm test -- tests/invariants/test_icon_file_content.py` · `npm test -- tests/invariants/test_icon_credits.py` · `npm run --silent typecheck` · `npx eslint --max-warnings 0 src/browser/sim/data/creatures.ts src/browser/sim/data/scene.ts src/browser/view/credits.ts` · `npx prettier --check src/browser/sim/data/creatures.ts src/browser/sim/data/scene.ts src/browser/view/credits.ts`
- **Depends on:** Slice 1 · Foundation entries (D-271)

### Slice 2b — The name of a creature after „z” from its data

- **Goal:** `src/browser/view/now-lines.ts` reads the form of a creature's name after „z” from the field Slice 2 added to
  the creature's data, in place of its rule that ends a name in „k”, and „Teraz” reads „Walczy z wilkiem” as before and
  „Walczy z niedźwiedziem” for the bear (D-147). `tests/view/now-lines.test.mjs` holds both forms, the bear's as a
  made-up case on the data's entry.
- **Change:** `src/browser/view/now-lines.ts` · `tests/view/now-lines.test.mjs`
- **Read:** `.runs/task-cycles/katalog-map/task.md:30-30` To do 3 · `foundations/decisions.md:6963-6993` D-147 · `foundations/part_map.md:1-33` browser-view · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `src/browser/sim/data/creatures.ts`
- **Model:** cheaper — one pure function reads a field the data hold
- **Risk:** none
- **Checks:** `npm test -- tests/view/now-lines.test.mjs` · `npm test -- tests/view/run-screen.test.mjs` · `npm run --silent typecheck` · `npx eslint --max-warnings 0 src/browser/view/now-lines.ts` · `npx prettier --check src/browser/view/now-lines.ts tests/view/now-lines.test.mjs`
- **Depends on:** Slice 2

### Slice 3 — Region in the data and the two new maps, with the check of the balance instrument

- **Goal:** A map's data carry its region: `maps.ts` holds a list of regions, in the order the catalog shows them
  (`Las` alone for now), `MapDef` gets `region` of that list, and `forestEdge`, `forest` and `forestDeep` are in
  `Las`. `MapDef` also gets an optional field naming the creature whose health the record of Slice 11 shows (the
  view names no map and no creature of its own, `content-identifiers`). Two maps are added, both in `Las`: `forestPack`
  („Las — wataha”) after `forestDeep`, with the numbers of `balance/overlays/forest-pack.json` (grid 5 × 5, entrance
  drawn, 7 °C, step 5, the four resources of Las — głębiej, moss included, a wolf with chance 0.015 a minute and 90
  minutes of quiet, solved by a streak of 540 with six beaten attacks, opened by `forestDeep`), and `forestLair`
  („Las — matecznik”) after it, with the numbers of `forestLair` and `LAIR_RESOURCES` of the old game (grid 6 × 6,
  entrance drawn, 7 °C, step 5, entry cap 0, a bear with chance 0.01 and 180 minutes of quiet, solved by a streak of
  600 with one beaten attack, opened by `forestPack`), carrying the field that names the bear. The sentences
  `solvingText` and `completionText` of both are written by hand in the form of those of `forestDeep`. The tests of
  `tests/sim/` and `tests/balance/` that name the maps or walk `MAPS` are brought to the five maps. The check of the
  maps is made with the instrument (`loop2-balance`, `progression`) on the data of this branch, every reference
  program on seeds 1–500, and the table is kept for the report as the skill gives it (labels `P1`, `P2`…, no
  program's content, never written into the repository, D-429). The order of the stops is: (1) if any reference
  program solves one seed of Las — matecznik, the executor makes no change of numbers, returns `blocked` with the
  table, and the cycle asks the human (the exception of D-438 does not stand); (2) if the best program of Las —
  wataha solves no seed, or solves a share not smaller than the best program of Las — głębiej, the executor changes
  the wolf pack's numbers only as far as that needs — first the number of attacks to beat, then the chance or the
  quiet time — rewrites its `solvingText` to agree, measures again, and reports the change and the table before and
  after, for the request; (3) if `first-exploration-discovery` fails on a new map, the executor changes the fewest
  numbers of that map's resources that make it hold and says so. No other number of the new maps is tuned to a result.
  After this slice the tests `tests/balance/overlay.test.mjs` (Slice 5 owns it), `tests/view/map-lines.test.mjs`
  (Slice 8 owns it) and the places of `tests/view/maps-screen.test.mjs` and of any other file of `tests/view/` that
  fail only because the data hold five maps (Slice 9 owns them) may fail; the report lists each file of `tests/view/`
  that fails and why.
- **Change:** `src/browser/sim/data/maps.ts` · `tests/sim/data.test.mjs` · `tests/sim/map-card.test.mjs` · `tests/sim/discovery.test.mjs` · `tests/balance/progression.test.mjs` · `tests/balance/cli.test.mjs`
- **Read:** `.runs/task-cycles/katalog-map/task.md:28-29` To do 1 and 2 · `.runs/task-cycles/katalog-map/task.md:33-33` To do 6 · `.runs/task-cycles/katalog-map/task.md:76-90` Q5 and Q6 · `.runs/task-cycles/katalog-map/task.md:135-142` Context (moss, the pack's measurement, niezmienniki) · `.runs/task-cycles/katalog-map/task.md:157-160` the new decisions and D-438 in *Decisions in play* · `.runs/task-cycles/katalog-map/task.md:172-172` D-24 · `.runs/task-cycles/katalog-map/task.md:178-180` D-18, D-429, D-388 · `foundations/decisions.md:306-330` D-18 · `foundations/decisions.md:5628-5667` D-24 · `foundations/decisions.md:5939-5968` D-136 · `foundations/decisions.md:6032-6049` D-388 · `foundations/decisions.md:6113-6126` D-438 · `foundations/decisions.md:6854-6876` D-142 · `foundations/decisions.md:8734-8747` D-187 · `foundations/decisions.md:12096-12111` D-428 · `foundations/decisions.md:12113-12126` D-429 · `foundations/invariants.md:1388-1396` first-exploration-discovery · `foundations/invariants.md:236-246` content-identifiers · `foundations/invariants.md:1348-1366` first-map-stock and first-map-balance · `foundations/part_map.md:34-66` simulation · `foundations/part_map.md:128-139` balance-tools · `guidelines/coding.md` · `guidelines/coding-content-data.md` · `guidelines/coding-simulation-module.md` · `guidelines/coding-balance-instrument.md` · `guidelines/testing.md` · `.claude/skills/loop2-balance/SKILL.md` · `balance/overlays/forest-pack.json` · `src/browser/sim/data/maps.ts` · `tests/sim/discovery.test.mjs:330-370`. Outside the repository, read-only, not counted by the size script (about 18 KB): the file src/sim/data/maps.ts (forestLair, forestPack, LAIR_RESOURCES, FOREST_RESOURCES) of the old game's repository the old game's repository, branch feat/archetypes, read with git -C the old game's repository show feat/archetypes:<path>, never checked out.
- **Model:** same — decides from a measurement whether the wolf pack's numbers stand, and holds the stop that returns to the human
- **Risk:** none
- **Checks:** `rg -l "forestDeep|Object\.(keys|values|entries)\(MAPS\)" tests/sim tests/balance`, then one `npm run --silent build` and `node --test` on the files it lists (the sim and balance tests that name the maps; the owners of the expected failures are in the Goal) · `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/discovery.test.mjs` · `npm test -- tests/sim/map-card.test.mjs` · `npm test -- tests/balance/progression.test.mjs` · `npm test -- tests/invariants/test_content_identifiers.py` · `npm run --silent typecheck` · `npm run --silent balance -- progression --out .runs/<its directory>/progression.md` (the ordered stops above) · `npx eslint --max-warnings 0 src/browser/sim/data/maps.ts` · `npx prettier --check src/browser/sim/data/maps.ts`
- **Depends on:** Slice 2 · Foundation entries (D-24, D-438, the two new decisions)

### Slice 4 — The bear seen in the scene, with its scale beside the mage and the wolf

- **Goal:** The bear's pictures are looked at in the running game, as `loop2-play` gives it: a state composed so that a
  character stands on the lair map with the bear about to attack (the pace 16× brings the first attack after the 180
  quiet minutes), and the scene is seen through the minutes of a combat — the bear running in, the scuffle with the
  cloud, the bear defeated, the character dead, the bear running off — in the computer layout at 1280 × 720 and the phone
  layout at 360 px; the same is seen once with the wolf on Las — głębiej for the scale. The checks 1 and 3 of
  `loop2-scene-art` are made with the bear (its scale against the mage and the wolf, and whether the bear covers or is
  covered by the mage's figure, the cloud and the plaque of the discovery of the bear). One screenshot of the bear
  beside the mage and one of the wolf beside the mage are kept where D-418 and D-419 settle for the request (never
  in the repository), with the numbers of the first check. Where the bear stands wrong — over the mage's figure, out of
  the frame, its feet off the ground line — the executor changes the numbers of `SCENE_CREATURES` or `SCENE_FIGHT`
  in `src/browser/sim/data/scene.ts` and the cases of `tests/view/scene-picture.test.mjs` that hold them, and says what
  and why; where it stands right the slice changes no file. The report says what was looked at and what the
  screenshots show; the human judges the scale (D-415).
- **Change:** `src/browser/sim/data/scene.ts` · `tests/view/scene-picture.test.mjs`
- **Read:** `.runs/task-cycles/katalog-map/task.md:30-30` To do 3 · `.runs/task-cycles/katalog-map/task.md:35-35` To do 8 · `.runs/task-cycles/katalog-map/task.md:130-130` the pack, in Context · `foundations/decisions.md:1668-1696` D-418 and D-419 · `foundations/decisions.md:5160-5267` D-271 · `foundations/decisions.md:10907-10974` D-349 · `foundations/decisions.md:11527-11661` D-316 · `foundations/decisions.md:12062-12075` D-415 · `foundations/part_map.md:34-66` simulation · `guidelines/coding.md` · `guidelines/coding-content-data.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-scene-art/SKILL.md` · `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md` · `src/browser/sim/data/scene.ts` · `tests/view/scene-picture.test.mjs:1400-1560`
- **Model:** same — composes a game state and judges rendered images against a rule that has no threshold
- **Risk:** none
- **Checks:** the browser check above in both layouts with the measurements of `loop2-play` ("Check the phone layout") · `node .claude/skills/loop2-scene-art/sheet-frames.mjs measure assets/sprites/mage-idle.png#64 assets/sprites/wolf-idle.png#64 assets/sprites/bear-idle.png#64` · `npm test -- tests/view/scene-picture.test.mjs` · `npm test -- tests/view/scene.test.mjs`
- **Depends on:** Slice 3 · Slice 2b

### Slice 5 — The balance instrument's example, tests and skill follow the data

- **Goal:** `balance/overlays/forest-pack.json` is removed, since the wolf pack now stands in the game's data and an
  overlay that adds it would merge into the map that is there. `tests/balance/overlay.test.mjs` takes `wasteland.json`
  as its overlay that adds a map (its map opens after `forest`, so the expected prerequisites are `forestEdge` and
  `forest`), and its restore test adds a map of its own made-up key where it added `forestPack`; the path
  `balance/overlays/forest-pack.json` in the control case of `tests/invariants/test_balance_instrument_file_writes.py`
  is replaced by the path of an overlay that stays. In `.claude/skills/loop2-balance/SKILL.md` (and its copy
  `.agents/skills/loop2-balance/SKILL.md`, which stays byte for byte the same) the example of an overlay is
  `wasteland.json`, the list of the game's maps in the flag `--map` names the five maps, the timing of `progression`
  is for five maps, and the paragraph under "The table is the map check's without the earning loop's columns" no longer
  reads a map as solvable at 20 % of the seeds: it says what the settled reading of To do 9 says — a map can be solved
  where its best reference program, with the character built from what the maps before it gave, solves one seed or more;
  it is harder than the map that opens it where that program solves a smaller share; and Las — matecznik, until the
  change that sets its numbers, passes the check where no program solves it. Done with the tests of
  `tests/balance/`, which name no map that is gone.
- **Change:** `balance/overlays/forest-pack.json` · `tests/balance/overlay.test.mjs` · `tests/invariants/test_balance_instrument_file_writes.py` · `.claude/skills/loop2-balance/SKILL.md` · `.agents/skills/loop2-balance/SKILL.md`
- **Read:** `.runs/task-cycles/katalog-map/task.md:33-33` To do 6 · `.runs/task-cycles/katalog-map/task.md:36-36` To do 9 · `.runs/task-cycles/katalog-map/task.md:82-90` Q6 · `.runs/task-cycles/katalog-map/task.md:139-139` the users of the overlay, in Context · `.runs/task-cycles/katalog-map/task.md:159-159` D-438 in *Decisions in play* · `foundations/decisions.md:6113-6126` D-438 · `foundations/decisions.md:12096-12126` D-428 and D-429 · `foundations/invariants.md:1438-1456` instrument-game-agreement and balance-instrument-file-writes · `foundations/part_map.md:128-139` balance-tools · `guidelines/coding.md` · `guidelines/coding-balance-instrument.md` · `guidelines/testing.md` · `balance/overlays/wasteland.json`
- **Model:** cheaper — carries the settled reading and the removal of an example into tests and a skill
- **Risk:** none
- **Checks:** `npm test -- tests/balance/overlay.test.mjs` · `npm test -- tests/invariants/test_balance_instrument_file_writes.py` · `npm test -- tests/balance/check-map.test.mjs` · `npm test -- tests/balance/cli.test.mjs` · `cmp .claude/skills/loop2-balance/SKILL.md .agents/skills/loop2-balance/SKILL.md` · `rg -U "20\s*%" .claude/skills/loop2-balance/SKILL.md` finds no reading of solvable maps · `rg -n "forest-pack|forestPack" balance tests .claude/skills/loop2-balance .agents/skills/loop2-balance` finds none
- **Depends on:** Slice 3 · Foundation entries (D-438, the two new decisions)

### Slice 6 — A judging reports how much health it took from the creature

- **Goal:** The result of a judging (`Judging` of `src/browser/sim/types.ts`, given by `judgeOnSeeds` and by
  `judgeAndRecord` of `src/browser/sim/judging.ts`) holds, besides the twelve results, for each of the twelve seeds in
  the order of the data's seeds the most health the character took from the map's creature in one fight of that seed:
  a fight the character won gives the creature's full health; a fight in which the character died counts as any other,
  by the health the creature lost; a seed with no fight resolved gives 0; a fight cut off by the completion, the death
  by cold or hunger, or the cap before its turns resolve gives 0. The number is read from the map run's state as the
  judging steps it, so the game state, the map run, the saved game and `JudgingRecord` hold nothing new, the
  twelve results stay as they are and the first paragraph of D-439 is untouched. The tests of `tests/sim/judging.test.mjs`
  hold each case above on a map with a creature (`forestDeep` and its wolf) and one on a map with none.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/judging.ts` · `tests/sim/judging.test.mjs` · `tests/sim/saved-game.test.mjs`
- **Read:** `.runs/task-cycles/katalog-map/task.md:31-31` To do 4 · `.runs/task-cycles/katalog-map/task.md:91-95` Q7 · `.runs/task-cycles/katalog-map/task.md:140-140` how a judging remembers nothing of the damage, in Context · `.runs/task-cycles/katalog-map/task.md:174-175` D-439 and D-440 in *Decisions in play* · `foundations/decisions.md:6835-6852` D-141 · `foundations/decisions.md:6899-6920` D-144 · `foundations/decisions.md:6945-6961` D-146 · `foundations/decisions.md:5695-5706` D-71 · `foundations/decisions.md:12132-12188` D-439 and D-440 · `foundations/part_map.md:34-66` simulation · `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` · `src/browser/sim/judging.ts` · `src/browser/sim/judging-record.ts:1-60` · `src/browser/sim/run.ts:690-820` stepMinute and finishMinute · `src/browser/sim/combat.ts`
- **Model:** cheaper — reads a result the simulation already makes and adds one field with its tests
- **Risk:** none
- **Checks:** `npm test -- tests/sim/judging.test.mjs` · `npm test -- tests/sim/judging-record.test.mjs` · `npm test -- tests/sim/encounters.test.mjs` · `npm test -- tests/invariants/test_simulation_inputs.py` · `npm test -- tests/invariants/test_simulation_isolation.py` · `npm run --silent typecheck` · `npx eslint --max-warnings 0 src/browser/sim/judging.ts src/browser/sim/types.ts` · `npx prettier --check src/browser/sim/judging.ts src/browser/sim/types.ts`
- **Depends on:** Slice 3 · Foundation entries (D-440)

### Slice 7 — The record of the most damage in the browser's lasting storage

- **Goal:** `src/browser/view/judging-cache.ts` keeps, beside the judgings, the record of one account, one game and one
  map: the most health the creature of the map lost in one fight of any judging made in this browser (the number Slice 6
  gives for a seed), as a value under a key of its own with its own version in the key and the account's identifier,
  the game's moment and the map in it, and holding, besides the number, the health and the blow of the creature as the
  game's data give them when the record was made. The cache offers a way to read the record for a map and a creature's
  numbers — it gives the number only where the stored creature numbers equal those given, so a record made at other
  numbers shows nothing — and a way to offer a new number, which replaces the stored one only where it is higher; the
  record never falls after another program or a character's death, and a judging that took less leaves it. As the
  judgings are, the record is read only in the form the cache writes, a value of another form or another version of
  the key is read as none, a key of another version is neither read, written nor removed, a refusing storage leaves
  the record for the open page alone, and no exception of the storage leaves the cache. On opening the cache removes
  the records of the account under the moment of another game and, where the page built the game after a refused save,
  the records of this game, as it does for the judgings; the values of other accounts stay. The value holds nothing
  but the number and the creature's numbers, no email address and no name. The tests are in a new file; the existing
  tests of the cache stay green.
- **Change:** `src/browser/view/judging-cache.ts` · `tests/view/judging-cache-record.test.mjs`
- **Read:** `.runs/task-cycles/katalog-map/task.md:31-31` To do 4 · `.runs/task-cycles/katalog-map/task.md:91-95` Q7 · `.runs/task-cycles/katalog-map/task.md:175-176` D-440 and D-441 in *Decisions in play* · `foundations/decisions.md:12159-12235` D-440 and D-441 · `foundations/invariants.md:1468-1476` judging-cache-reading · `foundations/part_map.md:1-33` browser-view · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `tests/view/judging-cache.test.mjs:1-120`
- **Model:** same — storage read at a trust boundary whose rules (forms, versions, refusals, tidying) the executor must keep whole
- **Risk:** trust boundary — `src/browser/view/judging-cache.ts` reads the browser's lasting storage (part map, `browser-view`)
- **Checks:** `npm test -- tests/view/judging-cache-record.test.mjs` · `npm test -- tests/view/judging-cache.test.mjs` · `npm test -- tests/view/judging-cache-page.test.mjs` · `npm test -- tests/invariants/test_content_identifiers.py` · `npm run --silent typecheck` · `npx eslint --max-warnings 0 src/browser/view/judging-cache.ts` · `npx prettier --check src/browser/view/judging-cache.ts`
- **Depends on:** Slice 6 · Foundation entries (D-440, D-441)

### Slice 8 — The lines of the catalog, as pure functions

- **Goal:** A new module `src/browser/view/catalog-lines.ts` of pure functions, with no DOM, gives the catalog's
  content from the game's data and the solved maps, in the old game's way (its spec chapters 2–5, `MapCatalog.tsx` and
  `mapFacts.ts`), for the component of Slice 9: the regions in the order of the data's list, each with its maps and its
  counter („Las · 1 z 5”, the solved maps of the region over all its maps in the data, the not yet opened ones included);
  the open maps of a region, the solved ones apart; the row of a map with its state, its name, its facts in the old
  order — the demand (whole hours of the streak, „N do pokonania”), what the map takes („⊘ wnosisz N” in the role of a
  warning, `⊘` on the first only, „⊘ wnosisz 0” at an entry cap of 0), the terrain („bez ognia N min” where the map
  chills, the step only where it differs from the usual step of D-333) — and the icon of the creature that attacks
  there, from the data; the search, which finds the open maps whose name or whose resource's name holds the typed
  text, ignoring case, not folding Polish letters, with the text trimmed, an empty text finding all, and the sentence
  „Nic nie pasuje do „{zapytanie}”.” where nothing fits; the three views — „Dokąd” (per region the open unsolved maps,
  then the solved ones folded under one row that counts them, unfolded by a search and, for the region of the picked
  map, always), „Co daje” (groups per resource of the open maps, the resource that fewest maps give first, in the group
  the solved maps first, each row's „≈ 8 z 25 · po 15 · +1 co 60 min” or „nie wraca” in the role of a warning, from
  `expectedTiles`) and „Postęp” (per region the open maps and one empty place with no name for each map of the region
  not yet opened, none while a search is typed; a region with nothing open not at all). Where the old game's order or
  words are not clear, the executor follows its code. `tests/view/map-lines.test.mjs` is brought to the five maps. The
  module names no map, resource or creature (`content-identifiers`).
- **Change:** `src/browser/view/catalog-lines.ts` · `tests/view/catalog-lines.test.mjs` · `tests/view/map-lines.test.mjs`
- **Read:** `.runs/task-cycles/katalog-map/task.md:32-32` To do 5 · `.runs/task-cycles/katalog-map/task.md:44-55` Q1 · `.runs/task-cycles/katalog-map/task.md:65-69` Q3 · `.runs/task-cycles/katalog-map/task.md:127-127` D-325 and the catalog's counter, in Context · `.runs/task-cycles/katalog-map/task.md:168-171` D-325, D-331, D-134 and D-149 in *Decisions in play* · `.runs/task-cycles/katalog-map/task.md:185-185` D-333 · `foundations/decisions.md:5900-5918` D-134 · `foundations/decisions.md:5970-5984` D-149 · `foundations/decisions.md:5628-5667` D-24 · `foundations/decisions.md:10140-10164` D-325 · `foundations/decisions.md:10277-10297` D-331 · `foundations/decisions.md:10316-10339` D-333 · `foundations/invariants.md:236-246` content-identifiers · `foundations/part_map.md:1-33` browser-view · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `src/browser/view/map-lines.ts` · `src/browser/view/counted-name.ts` · `src/browser/sim/map-card.ts` · `src/browser/sim/data/maps.ts` · `src/browser/sim/data/resources.ts` · `tests/view/map-lines.test.mjs`. Outside the repository, read-only, not counted by the size script (about 13.7 KB, 2.4 KB and 16 KB): the files src/components/probe/MapCatalog.tsx, src/components/probe/mapFacts.ts and docs/superpowers/specs/2026-09-07-mapy-katalog-i-strona-design.md (chapters 2–5) of the old game's repository the old game's repository, branch feat/archetypes, read with git -C the old game's repository show feat/archetypes:<path>, never checked out.
- **Model:** cheaper — carries the old game's catalog, which is settled, into pure functions with tests
- **Risk:** none
- **Checks:** `npm test -- tests/view/catalog-lines.test.mjs` · `npm test -- tests/view/map-lines.test.mjs` · `npm test -- tests/invariants/test_content_identifiers.py` · `npm run --silent typecheck` · `npx eslint --max-warnings 0 src/browser/view/catalog-lines.ts` · `npx prettier --check src/browser/view/catalog-lines.ts tests/view/catalog-lines.test.mjs tests/view/map-lines.test.mjs`
- **Depends on:** Slice 3 · Foundation entries (D-325, D-149, D-24)

### Slice 9 — The catalog on the screen Mapy: its structure and behaviour

- **Goal:** The left area of the screen Mapy shows the catalog in place of the list of open maps: a component in a new
  file `src/browser/view/map-catalog.tsx`, drawn from the pure lines of Slice 8, with the search field above the list (the
  shared text field), the three views as tabs (the shared button of the kind `tab`, „Dokąd” the one picked when the screen
  opens), the regions with their headers and counters, rows of two lines — the state circle at the left (filled for a
  solved map, empty for an open one), the name and the short demand, the facts, and the creature's icon at the right — each
  row a link to `#/mapy/{map}`, the picked row marked as the picked row of the list is now (D-331), the solved maps of
  „Dokąd” folded under one row that unfolds them and empty places in „Postęp”. The view, the typed text and the unfolded
  regions live in the component and do not outlive the screen; the group of the picked map unfolds so that the picked
  row is seen (the one departure from the old code that D-331 forces). `maps-screen.tsx` draws the component in place of
  its list and its `MapList`; the card, „Kto idzie” and the judging stay as they are. The rows take the classes the list
  has now, so the screen stands styled until Slice 10 gives the catalog its own rules; the component names no map, no
  resource and no creature (`content-identifiers`). The tests of `tests/view/maps-screen.test.mjs`, and of any other file of
  `tests/view/` that failed after Slice 3 only because the data hold five maps, are brought to the catalog; the cases of the
  component are in the new file `tests/view/map-catalog.test.mjs` (a view and a typed text switched, the folding, the
  empty places, the sentence of nothing found, the picked row, the unfolded group of the picked map, the links).
- **Change:** `src/browser/view/map-catalog.tsx` · `src/browser/view/maps-screen.tsx` · `tests/view/map-catalog.test.mjs` · `tests/view/maps-screen.test.mjs` · `tests/view/account-screen.test.mjs` · `tests/view/end-window-lines.test.mjs` · `tests/view/end-window.test.mjs`
- **Read:** `.runs/task-cycles/katalog-map/task.md:32-32` To do 5 · `.runs/task-cycles/katalog-map/task.md:44-55` Q1 · `.runs/task-cycles/katalog-map/task.md:124-127` Context (the old screen and its spec, D-325) · `.runs/task-cycles/katalog-map/task.md:143-143` the two areas, in Context · `.runs/task-cycles/katalog-map/task.md:168-171` D-325, D-331, D-134 and D-149 in *Decisions in play* · `foundations/decisions.md:4645-4675` D-282 · `foundations/decisions.md:10140-10164` D-325 · `foundations/decisions.md:10277-10297` D-331 · `foundations/decisions.md:5900-5918` D-134 · `foundations/decisions.md:5970-5984` D-149 · `foundations/decisions.md:5417-5461` D-276 · `foundations/part_map.md:1-33` browser-view · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `src/browser/view/maps-screen.tsx` · `src/browser/view/controls/react-button.tsx` · `src/browser/view/controls/react-text-field.tsx` · `tests/view/maps-screen.test.mjs:240-330`. The file src/browser/view/catalog-lines.ts that Slice 8 makes, whole (it does not exist at the plan's base). Outside the repository, read-only, not counted by the size script: the file src/components/probe/MapCatalog.tsx (about 13.7 KB) of the old game's repository the old game's repository, branch feat/archetypes, read with git -C the old game's repository show feat/archetypes:<path>, never checked out.
- **Model:** same — a component with state, a list of links and a screen that keeps its focus and judging plumbing, many cases to hold
- **Risk:** none
- **Checks:** `npm test -- tests/view/map-catalog.test.mjs` · `npm test -- tests/view/maps-screen.test.mjs` · `npm test -- tests/view/catalog-lines.test.mjs` · `npm test -- tests/view/screen-registry.test.mjs` · `npm test -- tests/invariants/test_content_identifiers.py` · `npm test -- tests/invariants/test_browser_view_framework.py` · `npm run --silent typecheck` · `npx eslint --max-warnings 0 src/browser/view/map-catalog.tsx src/browser/view/maps-screen.tsx` · `npx prettier --check src/browser/view/map-catalog.tsx src/browser/view/maps-screen.tsx`
- **Depends on:** Slice 8 · Foundation entries (D-325, D-331, D-134, D-149)

### Slice 10 — The look of the catalog in both layouts, checked in the game and shown beside the old Loop

- **Goal:** The catalog has its own rules in `src/browser/maps-screen.css`, on the design tokens (no new token; where a
  value is lacking the executor names it in the report and does not add it, `src/browser/AGENTS.md`): the rows in two
  lines with the state circle, name, short demand, facts and the creature's icon, the facts of „⊘” in the role `warning`,
  the headers of the regions with their counters, the search field and the three tabs, the folded row of the solved maps,
  the dashed empty places of „Postęp”, the picked row with its text in `text-strong` and a bar in `selected` at its left,
  a row under the pointer on `highlight`; the rules of the phone layout in a block `@media (width < 1280px)` after those of
  the computer layout, every control at the touch minimum, nothing scrolling to the side or out of its frame at 360 px
  (D-396, D-282). The old Loop is a threshold, not a pattern (Q1, part 2): the executor may leave its look — words,
  proportions, spacing, arrangement — within what the human chose in Q1 and says in the report what it left and why, and
  does not reach for a variant the human did not choose; where the look needs a change in the markup of
  `map-catalog.tsx` it makes it with the case of `tests/view/map-catalog.test.mjs` that holds it. The change is
  checked in the running game as `loop2-play` gives ("Check the phone layout" included), in both layouts, with each of
  the three views, a search that finds and one that finds nothing, a folded and an unfolded region, and a picked map;
  the screenshots for the request are made at a window of 1600 × 1000 — the state of a new game beside the old
  `loop_02_mapy.png`, and the state with a map picked beside `loop_03_mapa_skraj.png`, in a state as like the old one as
  the game gives — and for each of the three views and for the phone layout at 360 px, kept where D-418 and D-419 settle
  and nowhere in the repository (`ui_check.md`). The report names each place the catalog does less well than the old
  Loop's, so that the human sees it with the pair.
- **Change:** `src/browser/maps-screen.css` · `src/browser/view/map-catalog.tsx` · `tests/view/map-catalog.test.mjs`
- **Read:** `.runs/task-cycles/katalog-map/task.md:32-32` To do 5 · `.runs/task-cycles/katalog-map/task.md:35-35` To do 8 · `.runs/task-cycles/katalog-map/task.md:40-40` Acceptance criterion · `.runs/task-cycles/katalog-map/task.md:44-55` Q1 · `.runs/task-cycles/katalog-map/task.md:109-117` the pair of screenshots · `.runs/task-cycles/katalog-map/task.md:124-127` Context (the old screen and its spec, D-325) · `foundations/decisions.md:1668-1696` D-418 and D-419 · `foundations/decisions.md:4645-4675` D-282 · `foundations/decisions.md:5509-5528` D-396 · `foundations/decisions.md:10140-10164` D-325 · `foundations/decisions.md:10277-10297` D-331 · `foundations/decisions.md:4853-4866` D-421 · `foundations/part_map.md:1-33` browser-view · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md` · `src/browser/maps-screen.css`. The file src/browser/view/map-catalog.tsx that Slice 9 makes, whole (it does not exist at the plan's base). Outside the repository, read-only, not counted by the size script: the file src/components/probe/MapCatalog.tsx (about 13.7 KB, for its classes of look) of the old game's repository the old game's repository, branch feat/archetypes, read with git -C the old game's repository show feat/archetypes:<path>, never checked out, and the old game's two screenshots loop_02_mapy.png and loop_03_mapa_skraj.png in the author's notes folder the author's folder of the old Loop's screenshots.
- **Model:** strongest — the look and arrangement of the catalog are designed here and judged against the old game's screenshots, the acceptance criterion
- **Risk:** none
- **Checks:** `npm test -- tests/view/map-catalog.test.mjs` · `npm test -- tests/view/maps-screen.test.mjs` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py` · `npm test -- tests/invariants/test_design_token_sources.py` · `npm run --silent typecheck` · `npx prettier --check src/browser/maps-screen.css src/browser/view/map-catalog.tsx tests/view/map-catalog.test.mjs` · the browser check in both layouts with the measurements of `loop2-play` ("Check the phone layout": nothing scrolling to the side, nothing out of its frame, no control under the touch minimum)
- **Depends on:** Slice 9 · Foundation entries (D-325, D-331)

### Slice 11 — The number at Las — matecznik, in its row and on its card

- **Goal:** The number „niedźwiedź: {n} ze {zdrowie}” (the creature's name and health from the data, the number the
  record of Slice 7 holds) stands in the row of the map whose data name the creature for the record, among the facts of the
  row, and on the card of that map in „Czyha” at the creature's lines, both in the role `text` as „{n} z 12” beside a
  judging is (D-440); it stands nowhere before the first judging on that map, and nowhere where the record was made at
  other numbers of the creature. `maps-entry.ts` remembers the damage of each judging in the cache (in the same act that
  remembers the judging's record, unless the store has halted) and gives the screen the means to read the record, which
  the screen reads at each draw as it reads the judging's record. The row and the card name no map and no creature of
  their own (`content-identifiers`). The tests, in the new file `tests/view/maps-record.test.mjs` and the files of the catalog's tests of Slices 8 and 9, cover: a judging that took 24 of 120 shows „niedźwiedź: 24 ze 120”; a
  second judging that took less leaves it, one that took more raises it; a change of the program or the death of the
  character leaves it; a map with no creature for the record shows nothing; the card and the row both show it. The
  change is checked in the running game on a state composed as `loop2-play` gives ("Compose a game state": the wolf pack
  solved, a character with a program on the lair map, the program judged), in both layouts, and the screenshot of the
  screen with Matecznik and its number, in the state after the wolf pack is solved and a program is judged, goes where
  D-418 and D-419 settle, as do the same screen in the phone layout at 360 px.
- **Change:** `src/browser/view/maps-entry.ts` · `src/browser/view/maps-screen.tsx` · `src/browser/view/map-lines.ts` · `src/browser/view/catalog-lines.ts` · `src/browser/view/map-catalog.tsx` · `tests/view/catalog-lines.test.mjs` · `tests/view/map-catalog.test.mjs` · `tests/view/maps-record.test.mjs`
- **Read:** `.runs/task-cycles/katalog-map/task.md:31-31` To do 4 · `.runs/task-cycles/katalog-map/task.md:35-35` To do 8 · `.runs/task-cycles/katalog-map/task.md:91-95` Q7 · `.runs/task-cycles/katalog-map/task.md:173-176` D-327, D-439, D-440 and D-441 in *Decisions in play* · `.runs/task-cycles/katalog-map/task.md:200-200` Settlement row 4 · `foundations/decisions.md:1668-1696` D-418 and D-419 · `foundations/decisions.md:10185-10210` D-327 · `foundations/decisions.md:12159-12235` D-440 and D-441 · `foundations/invariants.md:236-246` content-identifiers · `foundations/part_map.md:1-33` browser-view · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md` · `src/browser/view/maps-entry.ts` · `src/browser/view/map-lines.ts`. The files src/browser/view/catalog-lines.ts (Slice 8) and src/browser/view/map-catalog.tsx (Slice 9), whole; they do not exist at the plan's base
- **Model:** cheaper — joins three finished parts (the damage of Slice 6, the record of Slice 7, the rows of Slices 8 and 9) by the rules the task settles
- **Risk:** none
- **Checks:** `npm test -- tests/view/maps-screen.test.mjs` · `npm test -- tests/view/map-lines.test.mjs` · `npm test -- tests/view/catalog-lines.test.mjs` · `npm test -- tests/view/map-catalog.test.mjs` · `npm test -- tests/view/judging-cache-record.test.mjs` · `npm test -- tests/invariants/test_content_identifiers.py` · `npm run --silent typecheck` · `npx eslint --max-warnings 0 src/browser/view/maps-entry.ts src/browser/view/maps-screen.tsx src/browser/view/map-lines.ts src/browser/view/catalog-lines.ts src/browser/view/map-catalog.tsx` · `npx prettier --check src/browser/view/maps-entry.ts src/browser/view/maps-screen.tsx src/browser/view/map-lines.ts src/browser/view/catalog-lines.ts src/browser/view/map-catalog.tsx` · the browser check in both layouts as in Slice 9
- **Depends on:** Slice 6 · Slice 7 · Slice 10 · Foundation entries (D-327, D-440, D-441)

### Slice 12 — The section „The screen Mapy” of the styleguide

- **Goal:** The rule „The screen Mapy” of `guidelines/styleguide-browser-view.md` says what the screen is after Slices 9 and
  10, through the skill `the-way-maintain-styleguide`: the catalog (regions with their counters, the search, the three views,
  the rows with the state circle, the facts and their roles, the empty places, the folding of the solved maps), the
  number of Las — matecznik in the row and in „Czyha” in the role `text`, and the decisions the rule names now (D-325,
  D-331, D-134, D-149, D-327, D-440, D-441). It brings no new role and no new value of a token, and says nothing the
  code does not do. Its *Good* and *Bad* cases change with it. Where the screens of Slices 9 and 10 left a departure from
  the old Loop that the report of Slice 10 names, the rule says what stands now.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/katalog-map/task.md:31-32` To do 4 and 5 · `.runs/task-cycles/katalog-map/task.md:168-171` D-325, D-331, D-134 and D-149 in *Decisions in play* · `.runs/task-cycles/katalog-map/task.md:173-176` D-327, D-439, D-440 and D-441 in *Decisions in play* · `foundations/decisions.md:10140-10164` D-325 · `foundations/decisions.md:10277-10297` D-331 · `foundations/decisions.md:5900-5918` D-134 · `foundations/decisions.md:5970-5984` D-149 · `foundations/decisions.md:10185-10210` D-327 · `foundations/decisions.md:12159-12235` D-440 and D-441 · `foundations/part_map.md:1-33` browser-view · `.the-way/product-guidelines/styleguide/SKILL.md` · `guidelines/styleguide-browser-view.md` · `src/browser/maps-screen.css`. The file src/browser/view/map-catalog.tsx that Slice 9 makes, whole (it does not exist at the plan's base)
- **Model:** cheaper — writes down what the finished screens do, in the form of the rule it replaces
- **Risk:** none
- **Checks:** `rg -U "katalog|Katalog" guidelines/styleguide-browser-view.md` finds the section · `rg -U "lista\s+otwartych\s+map" guidelines/styleguide-browser-view.md` finds no description of the old list as the screen's left area · `python -B .the-way/elements/common/foundation_check.py` (the check of the foundation and guidelines, run on its own, not the gate)
- **Depends on:** Slice 10 · Slice 11 · Foundation entries (D-325, D-331, D-134, D-149, D-327)

## Coverage

| What the task requires | Slices or entries |
|---|---|
| To do 1 — Las — wataha in the data, with the numbers of the overlay, checked before entering the game; numbers changed only as far as the check needs and `solvingText` agreeing | Slice 3 |
| To do 2 — Las — matecznik in the data with the old game's numbers, entry cap 0, open to entry and judging, no „Puść w pętlę” (no change: D-239, D-243 already do it), `first-exploration-discovery` held | Slice 3 · Foundation entries (D-438) |
| To do 3 — the bear: 120 health, blow 20, „sam cios”, icon `bear-head` (D-27); the scene's bear from the new pack, D-271 change, licence fact, credit line, part map row; standing frame from the walk; scale against mage and wolf checked and shown | Slice 1 · Slice 2 · Slice 2b · Slice 4 · Foundation entries (D-271, the environment fact, `sprite-credits`, the part map row) |
| To do 4 — the number in the row and on the card, the record of the browser, one fight, 0 without a fight, the death counted, the maximum of twelve seeds, absent before the first judging, bound to the creature's numbers, in the lasting storage beside the judgings, D-439's first paragraph untouched, the place in „Czyha” in `text` | Slice 3 (the field of the map's data) · Slice 6 · Slice 7 · Slice 11 · Slice 12 · Foundation entries (D-440, D-441, D-327) |
| To do 5 — the catalog: regions with counters over all maps of the data, rows with circle, name, short demand and creature's mark, facts in the old order, search, the three views, empty places, the view and the text not outliving the screen, the group of the picked map unfolded, both layouts at 360 px | Slice 3 (the region in the data) · Slice 8 · Slice 9 · Slice 10 · Slice 12 · Foundation entries (D-325, D-331, D-134, D-149, D-24) |
| To do 6 — the one check of each new map with the instrument on the data of the branch, the best program, the stops in their order, the overlay and what uses it brought to the data, the table in the request without programs and with labels, nothing else tuned | Slice 3 (the measurement and the stops) · Slice 5 (the overlay, its tests, the skill) |
| To do 7 — the entries written in the task's wording, D-438 with the paragraph, `wall` without the clause, the rationale of D-429 narrowed, the rationale of D-18 corrected | Foundation entries |
| To do 8 — the pair of screenshots beside the old Loop at 1600 × 1000, the state with Matecznik and its number after the wolf pack and a judging, the phone layout at 360 px, each of the three views, kept as D-418 and D-419 give | Slice 10 · Slice 11 · Slice 4 (the bear's scale) |
| To do 9 — the paragraph of the skill on the 20 % reading replaced, the example of the overlay following To do 6 | Slice 5 |
| Settlement row 1 (D-325) | Foundation entries |
| Settlement row 2 (D-331) | Foundation entries |
| Settlement row 3 (D-24) | Foundation entries · Slice 3 |
| Settlement row 4 (D-440) | Foundation entries · Slice 6 · Slice 7 · Slice 11 |
| Settlement row 5 (D-271) | Foundation entries · Slice 1 · Slice 2 |
| Settlement row 6 (D-438) | Foundation entries · Slice 3 · Slice 5 |
| The four projected entries — the two new decisions, D-438, `wall` — and the settled edits of D-325, D-331, D-134, D-24, D-327, D-440, D-441, D-271, the rationales of D-18 and D-429 (and the note of D-149) | Foundation entries |
| Acceptance criterion — on the pair of screenshots of the old Loop and loop2 the human names the old Loop as the more legible in no case | Slice 10 · Slice 11 (the screenshots) — the human's judgement stays with the request |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The wolf pack takes the resources of Las — głębiej, moss and fiber included, as `forest-pack.json` has them and as the 46.8 % measurement of 2026-11-25 had them | no moss: the table's default, but the measurement would then not describe the map | Small: the resources are no requirement of the game (Q5); the check of Slice 3 measures what is entered |
| Region: a list of regions in `maps.ts` fixes their order, `MapDef.region` is one of its names, so a typo is a type error | the region derived from a map's name; a free text and the order of first appearance | Low: one more entry in the list when the next region comes; a free text would take a typo for a new region |
| The data of a map name the creature whose health the record shows (an optional field of `MapDef`, set on the lair alone) | the view names Las — matecznik or the bear (breaks `content-identifiers`); a flag on the creature (which then shows the number on every map that creature attacks) | Low: a second map with the bear shows nothing until its data say so |
| A judging reports the damage per seed in `Judging`, read from the map run's state after each minute of `judgeOnSeeds`; the game state, the map run and the saved game get no field | a field on the map run that counts the damage (changes the saved game's shape, the file `saved-game.ts` at a trust boundary, the invariant `save-version` and the byte for byte replay of the instrument, for a number only a judging needs) | Low: if the map run's own record were wanted later the judging's reading is a few lines to move |
| The record lives in the cache of `judging-cache.ts` as a second family of keys with its own version in the key, one value for each account, game and map, holding the creature's health and blow beside the number | the number inside `JudgingRecord` under the key of the triple (the record would go with the program and the character, against Q7 a, and raising the key's version would hide every judging stored now); a new file for the storage (a new trust boundary file and a change of the part map for a number) | Medium: a later change of the form of the record raises its own key's version and hides the stored records, as D-441 gives for judgings |
| The record is bound to the creature's health and blow alone, the two numbers the card shows | binding to the whole entry of the creature (its program too) | Low: a change of the bear's rules alone leaves an old record standing; the lasting storage is cleared with the game's other values on a new game |
| The case of a creature's name after „z” is a field of the creature's data | widening the rule in `now-lines.ts` that turns „wilk” into „wilkiem” (a second ending to guess for the next creature) | Low: one more field to fill for the next creature |
| `forest-pack.json` is deleted and its tests, the example of the skill and the control path move to `wasteland.json` | keeping the overlay (it would merge into the map in the data and the tests expect no such map); writing a new example overlay for a map not yet in the game | Low: the example of an overlay that adds a map is `wasteland.json` until a later map task adds another |
| The flag `solvable` of `balance/progression.mjs` (a best program at 20 % or more) and its constant `SOLVABLE_SHARE` are left as they are; Slice 5 changes the skill's reading, the table's own columns and sentence do not print the flag | changing the constant to "one seed or more" and the three cases of `tests/balance/progression.test.mjs` that name it (code and tests of the balance part that To do 9 does not ask for) | Medium: the field of the measurement's result and the skill's sentence disagree on a word until a later change; the concern is in the report for the orchestrator |
| The hours of a demand read whole („10 h”) and, where the streak is not a whole number of hours, in minutes | decimals of an hour | Low: all five maps are whole hours |
| The search ignores case by `toLowerCase`, trims the typed text and folds no Polish letter, as the old code does | a search that folds „ł” to „l” (the task says not to) | Low: none |
| The view, the typed text and the folded regions live in the state of the catalog component and end with the screen; the group of the picked map is unfolded in the drawing and not stored | storing them in the page's state (they would outlive the screen against To do 5) | Low: none |
| The order of the slices departs from the example of the styleguide (tokens before screens): no token, font or library is new, so the screens come straight after the data and the pure lines | the example's order with a slice of tokens | None: no value is lacking; where one is, Slice 10 names it and the human decides (`src/browser/AGENTS.md`) |
| Slice 3 and Slice 5 are two slices: the maps, the measurement and its stops first, the instrument's artefacts after; the tests of the balance part that a map added to the data breaks wait for Slice 5, with the owner named in Slice 3 | one slice for both (nine files, the measurement and the alignment under one review) | Low: for the span of one slice a balance test fails as expected |
| No slice moves code out of a file first: the code size check on the base reports 0 functions and files over a threshold, and the new catalog code stands in new files; `maps-screen.tsx` (626 code lines, `MapsView` 153) is only given a call in place of its list | a move-out slice before Slice 9 | Low: Slice 9 shrinks `MapsView`, and a review sees the growth of the file |
| The pictures, the creature's data and the case after „z” are three slices (1, 2, 2b), and the catalog is three (8 pure lines, 9 structure, 10 look) | one slice each for the bear and for the catalog (the guidelines of the browser view alone read about 100 000 tokens, and the executor of such a slice would be left too little for its files; the size check of the first draft said so) | Low: more handoffs; each slice is reviewed with the whole change, only Slices 1, 2 and 7 on their own |

## Orchestrator's answers and additions after the plan's review (provisional, not the human's approval)

- Foundation entries are written by one agent on the class `same` as the orchestrator's (reads decisions whole and
  judges wording against the task's quoted text); it needs network for the environment fact.
- Concern 1 (D-149 in *Foundation entries*): kept.
- Concern 2 (`SOLVABLE_SHARE`, `solvable` flag of `balance/progression.mjs`): left as the plan has it; the request
  says the flag and the skill's reading differ until a later change.
- Concern 3 (network): Slices 1 and the foundation entries' environment fact need it; the machine has network; an
  agent that has none returns.
- Concern 4 (screenshots): D-419 settles it — the agent that shows a screenshot pushes it itself to
  `mariusznazar/screenshots`, directory `loop2/katalog-map/`, on the branch `loop2/katalog-map` (never `main`), with
  the `gh` account of the human who owns that repository. Slices 4, 10 and 11 do it. Before pushing, the executor
  looks at each image and keeps out of it any email address, account name or other personal datum (a test account's
  display is fine); it reports the commit of the push and each file's raw link in its report.
- Concern 5 (size): the executors of Slices 1, 2 and 11 read guidelines whole as the plan says; none is split further.
- Concern 6 (which `tests/view/` files break with five maps): Slices 3 and 9 list them, as the plan says.
- Slice 4 may change no file; its mechanical check then accepts an empty range for that slice alone, and its report
  stands as its result.
- The executors run no gate (`npm test` with no file argument); focused checks only.
- After the foundation commit `612476a6` (written by the agent of *Foundation entries*): `python -B
  .the-way/elements/common/foundation_check.py` reports 14 errors, each a `decision:` line of a test that quotes a
  sentence of D-325 or D-327 that the entries changed: `tests/view/account-screen.test.mjs:4229` and `:4488` (D-325;
  owner Slice 9, whose *Change* now lists that file), `tests/view/map-lines.test.mjs:198` and `:237` (D-327; owner
  Slice 8) and `tests/view/maps-screen.test.mjs:221, 319, 321, 353, 355, 407, 409, 475, 556, 1042` (owner Slice 9). The
  new wording each must quote is in `foundations/decisions.md` (D-325 and D-327 binding sentences) and listed in
  `reports/foundation-report.md`, section on those citations. The slices of those owners bring the quotations to the
  new sentences and run the foundation check on its own until it lists none for their files.
- The line numbers of `foundations/*.md` in the slices' *Read* were counted at the base; the foundation commit moved
  them. An executor finds each entry by its heading (`### D-nnn —`, `## <invariant-id>`), which the plan names.
- New decisions D-448 and D-449 stand at the end of the section on maps in `foundations/decisions.md`.
- After Slice 3 (commit `e0342c5d`; measurement: no reference program solves a seed of Las — matecznik; best program of Las —
  wataha 46.8 % against 92.4 % of Las — głębiej; no number changed): the new field of `MapDef` that names the creature of the
  record is `recordCreature` (Slice 11 reads it). Owners of the tests that fail after Slice 3: `tests/sim/saved-game.test.mjs:2885`
  (a case that uses `"bear"` as an id absent from the data; the bear is in the data since Slice 2) — Slice 6, whose *Change* now lists
  that file, one-line change to an id the data lack; `tests/view/end-window-lines.test.mjs:428` and `tests/view/end-window.test.mjs:570`
  (the end window after Las — głębiej now offers "Otwarte: Las — wataha →") — Slice 9, whose *Change* now lists both.
