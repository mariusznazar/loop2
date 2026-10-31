# Plan — Rozliczenie przejść: co płaci domknięcie, co kosztuje powtórka mapy i co zabiera śmierć

- Task: `.runs/task-cycles/rozliczenie-przejsc/task.md`
- Spec: `.runs/task-cycles/rozliczenie-przejsc/spec.md`
- Base: `95de83b`

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| `solved-map-manual-run` | invariant, new; check: cases of `tests/sim/trip.test.mjs` under the marker of this name | projected `solved-map-manual-run/1`, carried in full; To do 22; spec, *Foundation entries* | Slice 1 |
| D-189 | decision, changed | projected „What pays, and what takes from the chest?”, the part this code makes true; To do 22; spec, *Foundation entries* | Slice 1 |
| D-190 | decision, changed | projected „What does a character's death take?”, the part this code makes true; To do 22; spec, decision 11 and *Foundation entries* | Slice 3 |
| `manual map run` | glossary term, stands in the foundation; nothing to write | projected, written by task 7 (task, *Context*) | Slice 1 |
| Row 1 (spec: D-214) | decision, new | *Settlements to record*, row 1 | Slice 1 |
| Row 2 (D-194) | decision, changed | *Settlements to record*, row 2; To do 22 | Slice 1 |
| Row 3 (spec: D-215) | decision, new | *Settlements to record*, row 3 | Slice 4 |
| Row 4 (spec: D-216) | decision, new | *Settlements to record*, row 4 | Slice 4 |
| Row 5 (spec: D-217) | decision, new | *Settlements to record*, row 5 | Slice 5 |
| Row 6 (spec: D-218) | decision, new | *Settlements to record*, row 6 | Slice 5 |
| Row 7 (spec: D-219) | decision, new | *Settlements to record*, row 7 | Slice 3 · Slice 5 |
| Row 8 (spec: D-220) | decision, new | *Settlements to record*, row 8 | Slice 2 |
| Row 9 (`resurrection-renewal`) | invariant, new; check: cases of `tests/sim/death.test.mjs` under the marker of this name | *Settlements to record*, row 9 | Slice 2 · Slice 3 |
| Row 10 (`death-settled-once`) | invariant, new; check: cases of `tests/sim/death.test.mjs` under the marker of this name, the load case of spec decision 10 included | *Settlements to record*, row 10 | Slice 3 |
| Row 11 (`resurrection`) | glossary term, new | *Settlements to record*, row 11 | Slice 2 · Slice 3 |
| Row 12 (`generation number`) | glossary term, new | *Settlements to record*, row 12 | Slice 2 · Slice 3 · Slice 5 |
| D-04 | decision, changed | spec, decision 7 and *Foundation entries* | Slice 3 · Slice 5 |
| D-03 | decision, changed | spec, decision 7 and *Foundation entries* | Slice 5 |
| D-179 | decision, changed | spec, *Foundation entries*; To do 5 | Slice 1 |
| `trip-transfer` | invariant, changed; check: its existing cases of `tests/sim/trip.test.mjs` under its marker, changed in Slice 1 | To do 22; spec, *Foundation entries* | Slice 1 |
| `trip-run-end` | invariant, changed; check: its existing cases of `tests/sim/trip.test.mjs` under its marker, changed in Slice 1 | To do 22; spec, *Foundation entries* | Slice 1 |

The agent of these entries writes them before Slice 1, from `spec.md:284-325`, as the foundation
step gives. Each `// invariant:` marker of a slice names an entry that stands by then.

## Slices

### Slice 1 — A manual run of a solved map neither pays nor takes

- **Goal:** `GameMapRun` holds `solvedMapRun`, bound in `startRun` from `solvedMaps` and carried unchanged to the run's end, the saved document and back. A marked run takes its equipment through `takeFromNowhere` of `trip.ts` and leaves the chest as it is. `tripLoot` gives a marked run an empty list, so it deposits nothing and `deposited` is `[]`. A completion of a marked run pays no practice and keeps `run.practice`; the solved maps grow as today; a death on a marked run pays nothing. `SAVED_GAME_VERSION` is 2, the load reads `solvedMapRun` and `deposited` as spec decision 9 gives, `solvedMaps` read before the run, and every document this slice's game saves loads back.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/trip.ts` · `src/browser/sim/game.ts` ·
  `src/browser/sim/saved-game.ts` · `tests/sim/trip.test.mjs` · `tests/sim/skills.test.mjs` ·
  `tests/sim/saved-game.test.mjs`
- **Read:** `.runs/task-cycles/rozliczenie-przejsc/task.md:18-22` To do, items 1–5 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:31-31` To do, item 14 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:38-38` To do, item 21 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:43-62` Questions to settle, W1, Q1, Q2 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:73-78` Questions to settle, Q4 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:135-153` Context, the table of loop ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:24-45` Constraints ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:49-82` Decisions, 1 and 2 ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:229-269` Decisions, 9 and 10 ·
  rows solved-map-manual-run, D-189, Row 1, Row 2, D-179, trip-transfer and trip-run-end of the
  plan's Foundation entries, as written ·
  `foundations/decisions.md:57-107` D-04 · `foundations/decisions.md:1084-1103` D-55 ·
  `foundations/decisions.md:2166-2201` D-122 · `foundations/decisions.md:3201-3215` D-179 ·
  `foundations/decisions.md:3255-3267` D-183 · `foundations/decisions.md:3281-3332` D-185–D-188 ·
  `foundations/decisions.md:3333-3358` D-189, D-190 · `foundations/decisions.md:3359-3373` D-191 ·
  `foundations/decisions.md:3404-3418` D-194 · `foundations/decisions.md:3494-3508` D-200 ·
  `foundations/decisions.md:3615-3640` D-206 · `foundations/decisions.md:3828-3890` D-212, D-213 ·
  `foundations/invariants.md:165-175` map-run-repeatability ·
  `foundations/invariants.md:214-235` simulation-isolation, simulation-inputs ·
  `foundations/invariants.md:309-318` restart-seed ·
  `foundations/invariants.md:518-537` character-team, minute-span-split ·
  `foundations/invariants.md:958-977` trip-transfer, trip-run-end ·
  `foundations/invariants.md:1028-1037` save-version ·
  `foundations/part_map.md:28-59` simulation ·
  `foundations/glossary.md:65-72` map run restart ·
  `foundations/glossary.md:131-149` manual map run, completion, solved map ·
  `foundations/glossary.md:181-186` practice ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/character.ts` · `src/browser/view/trip-lines.ts` · `tests/view/trip.test.mjs` ·
  `tests/sim/completion.test.mjs:191-226` a map solved stays solved ·
  loop at commit cdc7c0d, outside this repository (C:/Storage/repos/loop, read with git show):
  src/sim/chest.test.ts:316-419 and src/sim/skills.test.ts:454-480
- **Model:** cheaper
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts` reads a new key and narrows `deposited` · cannot be undone — `SAVED_GAME_VERSION` becomes 2, so the merge's deployment of `main` discards every older saved game state whole (D-206, D-11); the cycle only prepares the number and performs nothing on the server
- **Checks:** Start from failing cases in `tests/sim/trip.test.mjs` under `// invariant: solved-map-manual-run`, for To do 1–5 and 14, each citing its loop test. Expected values that change, each naming its requirement as `guidelines/testing.md`, *Changing an existing test*, asks: `tests/sim/trip.test.mjs:109` (To do 3, 5); `:333` (To do 5); `:361` (To do 3, 5: its restart now follows a completion, so the case keeps its marker `trip-run-end` and still shows the leftovers fund no later run that takes from the chest); `tests/sim/skills.test.mjs:537` (To do 2: its run holds no mark, so it still pays, and its name changes). In `tests/sim/saved-game.test.mjs`: the document of version 1 stays and is refused as `version`; the current document becomes version 2 with `solvedMapRun` false, its map run being on `forestDeep`; the cases that use 2 as another version (`:496`, `:603`, `:611`–`:618`) take another number; the completion at `:555` and the crafted completions at `:914`–`:945` add their map to `solvedMaps`, so each stays refused or admitted for the reason its name gives; each row of decision 9 this slice brings joins `CRAFTED` under `// invariant: save-version`. Then: `npm run typecheck` · `npm test -- tests/sim/trip.test.mjs` · `npm test -- tests/sim/skills.test.mjs` · `npm test -- tests/sim/saved-game.test.mjs` · `npm test -- tests/sim/completion.test.mjs` · `npm test -- tests/view/trip.test.mjs` · `npm run build` · `npm test -- tests/invariants/test_restart_seed.py` · `npm test -- tests/invariants/test_simulation_inputs.py` · `npm test -- tests/invariants/test_map_run_repeatability.py` · `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Foundation entries: `solved-map-manual-run` · D-189 · Row 1 · Row 2 · D-179 · `trip-transfer` · `trip-run-end`

### Slice 2 — A character has a generation and a resurrection

- **Goal:** `Character` holds `generation`, 1 at creation, and `resurrectionReadyAtMs`, 0 at creation; `RunCharacter` gains nothing. `BALANCE.resurrectionRenewalRealMinutes` is 480. `resurrectionReady(character, nowMs)`, exported from `game.ts`, is the one comparison and is true from the moment of readiness on, that moment included. The load reads both keys strictly as spec decision 9 gives, and every document this slice's game saves loads back. The version stays 2: no saved game state of that version exists anywhere, as the comment over the document in the test says.
- **Change:** `src/browser/sim/data/balance.ts` · `src/browser/sim/types.ts` ·
  `src/browser/sim/game.ts` · `src/browser/sim/saved-game.ts` · `tests/sim/data.test.mjs` ·
  `tests/sim/team.test.mjs` · `tests/sim/saved-game.test.mjs` · `tests/sim/death.test.mjs` ·
  `stryker.config.json`
- **Read:** `.runs/task-cycles/rozliczenie-przejsc/task.md:25-26` To do, items 8 and 9 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:29-29` To do, item 12 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:43-47` Questions to settle, W1 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:111-113` Questions to settle, Q10 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:135-153` Context, the table of loop ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:24-45` Constraints ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:83-95` Decisions, 3 ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:229-269` Decisions, 9 and 10 ·
  rows Row 8, Row 9, Row 11 and Row 12 of the plan's Foundation entries, as written ·
  `foundations/decisions.md:57-107` D-04 · `foundations/decisions.md:377-395` D-18 ·
  `foundations/decisions.md:1104-1130` D-56 · `foundations/decisions.md:1716-1730` D-94 ·
  `foundations/decisions.md:3346-3358` D-190 · `foundations/decisions.md:3374-3388` D-192 ·
  `foundations/decisions.md:3615-3640` D-206 · `foundations/decisions.md:3828-3890` D-212, D-213 ·
  `foundations/invariants.md:214-235` simulation-isolation, simulation-inputs ·
  `foundations/invariants.md:518-527` character-team ·
  `foundations/invariants.md:598-607` mutation-test-selection ·
  `foundations/invariants.md:1028-1037` save-version ·
  `foundations/part_map.md:28-59` simulation · `foundations/part_map.md:79-110` build-tools ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/coding-content-data.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  loop at commit cdc7c0d, outside this repository (C:/Storage/repos/loop, read with git show):
  src/sim/death.test.ts:77-81, src/sim/data/balance.ts:125, src/sim/roster.test.ts:18 and
  src/sim/sim.test.ts:2002-2003
- **Model:** cheaper
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts` reads `Character.generation` and `Character.resurrectionReadyAtMs`
- **Checks:** Start from failing cases: a new `tests/sim/death.test.mjs`, listed in `stryker.config.json`, with `resurrectionReady` before, at and after the moment under `// invariant: resurrection-renewal` (To do 12), and `tests/sim/data.test.mjs` pinning 480 and citing loop (To do 9). Expected values that change: `tests/sim/team.test.mjs:53` (To do 8). In `tests/sim/saved-game.test.mjs` both documents' characters gain the keys, rewritten at version 2 under the exception the comment at `:29`–`:38` already states; the rows of decision 9 for these keys join `CRAFTED`, and a load case admits a moment below zero. Then: `npm run typecheck` · `npm test -- tests/sim/death.test.mjs` · `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/team.test.mjs` · `npm test -- tests/sim/saved-game.test.mjs` · `npm run build` · `npm test -- tests/quality/test_mutation_test_selection.py` · `npm test -- tests/quality/test_node_test_selection.py` · `npm test -- tests/invariants/test_character_team.py` · `npm test -- tests/invariants/test_simulation_inputs.py` · `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 1 · Foundation entries: Row 8 · Row 9 · Row 11 · Row 12

### Slice 3 — A death is settled once, on the browser's clock

- **Goal:** `GameMapRun` holds `deathSettlement`, null until settled. `settleDeath(state, nowMs)` of `game.ts` settles a death as spec decisions 4 and 5 give and returns the very state it got where there is nothing to settle. `restart` takes the skills, for the run and for its repertoire alike, from the team's character after a `progressLost` settlement and from the run it replaces otherwise (decision 6). `clock.ts` reads `Date.now()` once on each flush and uses that one reading for `settleDeath` and for `send`, and on each reading hands the store one result: the events of `passRealTime` with the settled state, so the store, the saver and the screen never see a death unsettled. `advanceMinutes` and `passRealTime` keep their signatures. The load reads `deathSettlement` as decision 9 gives, which refuses a death unsettled; the version stays 2. The doc comment of `passRealTime` stops calling it the only way real time enters.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/game.ts` ·
  `src/browser/sim/saved-game.ts` · `src/browser/view/clock.ts` · `tests/sim/death.test.mjs` ·
  `tests/sim/saved-game.test.mjs` · `tests/view/clock.test.mjs` ·
  `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/rozliczenie-przejsc/task.md:27-34` To do, items 10–17 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:43-47` Questions to settle, W1 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:63-72` Questions to settle, Q3 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:114-118` Questions to settle, Q11 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:135-155` Context, the table of loop and the code ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:24-45` Constraints ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:83-184` Decisions, 3 to 7 ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:229-269` Decisions, 9 and 10 ·
  rows D-190, Row 7, Row 9, Row 10, Row 11, Row 12 and D-04 of the plan's Foundation entries, as
  written ·
  `foundations/decisions.md:57-107` D-04 · `foundations/decisions.md:1084-1103` D-55 ·
  `foundations/decisions.md:1191-1220` D-61, D-62 · `foundations/decisions.md:1356-1370` D-71 ·
  `foundations/decisions.md:1746-1760` D-96 · `foundations/decisions.md:2082-2107` D-119 ·
  `foundations/decisions.md:2436-2460` D-132 · `foundations/decisions.md:3087-3101` D-173 ·
  `foundations/decisions.md:3346-3373` D-190, D-191 · `foundations/decisions.md:3404-3418` D-194 ·
  `foundations/decisions.md:3434-3448` D-196 · `foundations/decisions.md:3494-3508` D-200 ·
  `foundations/decisions.md:3615-3684` D-206, D-207 ·
  `foundations/decisions.md:3828-3890` D-212, D-213 ·
  `foundations/invariants.md:165-175` map-run-repeatability ·
  `foundations/invariants.md:198-235` player-map-run-pace, simulation-isolation, simulation-inputs ·
  `foundations/invariants.md:309-318` restart-seed ·
  `foundations/invariants.md:518-537` character-team, minute-span-split ·
  `foundations/invariants.md:958-977` trip-transfer, trip-run-end ·
  `foundations/invariants.md:1028-1037` save-version ·
  `foundations/part_map.md:3-59` browser-view, simulation ·
  `foundations/glossary.md:65-72` map run restart · `foundations/glossary.md:118-130` Understanding,
  repertoire · `foundations/glossary.md:181-186` practice ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/skills.ts` · `src/browser/view/game-view.ts:101-180` the store and the saver ·
  `src/browser/view/game-saver.ts` · `tests/sim/skills.test.mjs:284-302` a restart keeps its skills ·
  `tests/sim/trip.test.mjs:95-116` the practice of a run after its completion ·
  `tests/invariants/test_minute_span_split.py` ·
  loop at commit cdc7c0d, outside this repository (C:/Storage/repos/loop, read with git show):
  src/sim/death.test.ts and src/sim/death.ts
- **Model:** same — one reading of the clock has to reach both the simulation and the view, and every test that saves a death made by `advanceMinutes` changes with it
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts` reads `deathSettlement`, a closed list with a number
- **Checks:** Start from failing cases in `tests/sim/death.test.mjs` for To do 10–17 under `// invariant: resurrection-renewal` and `// invariant: death-settled-once`, row 10's load case as spec decision 10 gives, and a `Restart` after a wiping death that drops a branch action from the run and keeps it in the Understanding. In `tests/view/clock.test.mjs`, with `Date` mocked: one reading on each flush, the same reading for `settleDeath` and `send`, one result to the store. Expected values and helpers that change: in `tests/sim/saved-game.test.mjs` the document gains the key, rewritten at version 2 under the same exception; the case at `:547` holds a settlement; the crafted deaths at `:766` and `:865` hold a valid settlement, so each stays refused for the reason its name gives; „a death in combat” at `:1271` passes through `settleDeath`; the rows of decision 9 for this key join `CRAFTED`. In `tests/view/account-screen.test.mjs` the helper at `:1179` settles before saving, and the case at `:1546` gains an assertion that the death is saved settled. Then: `npm run typecheck` · `npm test -- tests/sim/death.test.mjs` · `npm test -- tests/sim/saved-game.test.mjs` · `npm test -- tests/sim/skills.test.mjs` · `npm test -- tests/sim/trip.test.mjs` · `npm test -- tests/view/clock.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/game-saver.test.mjs` · `npm run build` · `npm test -- tests/invariants/test_minute_span_split.py`, its file unchanged · `npm test -- tests/invariants/test_restart_seed.py` · `npm test -- tests/invariants/test_simulation_inputs.py` · `npm test -- tests/invariants/test_simulation_isolation.py` · `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 2 · Foundation entries: D-190 · Row 7 · Row 9 · Row 10 · Row 11 · Row 12 · D-04

### Slice 4 — The map-run screen says what the run pays and what the death took

- **Goal:** The screens of spec decision 8's first table stand as it gives. `createTripLines` gains two elements and `trip-lines.ts` two pure functions of the state, `tripTexts` staying as it is. The line of To do 6 stands whenever `run.solvedMapRun` is true, under the body row and backpack, above the practice line. The line of To do 18 stands at `deposited`'s place, read from `deathSettlement` alone, its role a class on `.trip-result`, and draws nothing while the settlement is null. A loaded screen is the same screen. No token, role or shared control changes.
- **Change:** `src/browser/view/trip-lines.ts` · `src/browser/view/game-view.ts` ·
  `src/browser/styles.css` · `tests/view/trip.test.mjs`
- **Read:** `.runs/task-cycles/rozliczenie-przejsc/task.md:23-24` To do, items 6 and 7 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:35-35` To do, item 18 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:84-97` Questions to settle, Q6 and Q7 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:156-156` Context, the lines of the screen ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:24-45` Constraints ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:185-207` Decisions, 8, the map-run screen ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:248-269` Decisions, 10 ·
  rows Row 3 and Row 4 of the plan's Foundation entries, as written ·
  `foundations/decisions.md:57-107` D-04 · `foundations/decisions.md:814-843` D-39, D-40 ·
  `foundations/decisions.md:1206-1220` D-62 · `foundations/decisions.md:1570-1595` D-87, D-88 ·
  `foundations/decisions.md:2166-2201` D-122 · `foundations/decisions.md:2436-2460` D-132 ·
  `foundations/decisions.md:2707-2721` D-147 · `foundations/decisions.md:3281-3306` D-185, D-186 ·
  `foundations/decisions.md:3509-3523` D-201 · `foundations/decisions.md:3828-3865` D-212 ·
  `foundations/invariants.md:458-477` browser-view-token-values, browser-view-focus-outline ·
  `foundations/part_map.md:3-27` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.the-way/task-cycle/change/ui_check.md` · `src/browser/view/status-row.ts` ·
  `src/browser/view/body-row.ts` · `src/browser/tokens.css` · `tests/view/account-screen.test.mjs:1178-1185` a game ended in a death
- **Model:** cheaper
- **Risk:** none
- **Checks:** Start from a failing pure-function table in `tests/view/trip.test.mjs` over the six rows of decision 8's table, a loaded screen included, with To do 7's preview and deposit lines. Then: `npm run typecheck` · `npm test -- tests/view/trip.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` · `npm run build` · `npm test -- tests/invariants/test_browser_view_token_values.py`. State check and screenshot: an ignored harness under `.runs/task-cycles/rozliczenie-przejsc/`, copied into the ignored `dist/public/`, mounts the real `createGameView` with a stub client on states the simulation's functions make, one for each of the six rows and each kind of death, and `python -B -m http.server 8768 --bind 127.0.0.1 --directory dist/public` serves it. Through the `playwright-mcp` skill, read the DOM order and each line's computed role and inspect a screenshot of each state at a desktop width and at 480×900. Report what this shows and that it does not show the way through an account, and stop the server. Where this route fails, report the failed check itself.
- **Depends on:** Slice 1 · Slice 3 · Foundation entries: Row 3 · Row 4

### Slice 5 — The headquarters shows the resurrection and the generation

- **Goal:** Each row of the headquarters shows the label of To do 20 from generation 2 up, and the resurrection line of To do 19 on a row of its own under the name and archetype, above „Program:”, as spec decision 8 gives. The pure functions `generationLabel` and `resurrectionLine` give the text and role; `generation` enters `teamKey`. `Clock` gives the moment of its latest reading, read at the start too, and a call after each flush tells the view a reading was made; `Headquarters.update(state, nowMs)` draws the line with the rest, and a second method rewrites these lines alone on every tick while the headquarters shows, writing an element only when its text or role changed. No game state changes and nothing is saved by a tick. The doc comment of `createGameView` stops saying the view draws only from the state.
- **Change:** `src/browser/view/clock.ts` · `src/browser/view/headquarters.ts` ·
  `src/browser/view/game-view.ts` · `src/browser/styles.css` · `tests/view/clock.test.mjs` ·
  `tests/view/headquarters.test.mjs` · `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/rozliczenie-przejsc/task.md:30-30` To do, item 13 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:36-37` To do, items 19 and 20 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:98-107` Questions to settle, Q8 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:114-123` Questions to settle, Q11 and Q12 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:157-157` Context, the headquarters' row ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:24-45` Constraints ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:161-184` Decisions, 7 ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:208-228` Decisions, 8, the headquarters ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:248-269` Decisions, 10 ·
  rows Row 5, Row 6, Row 7, Row 12, D-04 and D-03 of the plan's Foundation entries, as written ·
  `foundations/decisions.md:39-107` D-03, D-04 · `foundations/decisions.md:814-843` D-39, D-40 ·
  `foundations/decisions.md:1084-1130` D-55, D-56 · `foundations/decisions.md:1570-1595` D-87, D-88 ·
  `foundations/decisions.md:3479-3508` D-199, D-200 · `foundations/decisions.md:3641-3684` D-207 ·
  `foundations/invariants.md:458-477` browser-view-token-values, browser-view-focus-outline ·
  `foundations/part_map.md:3-27` browser-view · `foundations/glossary.md:87-93` headquarters ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.the-way/task-cycle/change/ui_check.md` · `src/browser/view/status-row.ts` ·
  `src/browser/view/character-skills.ts` · `src/browser/tokens.css`
- **Model:** cheaper
- **Risk:** none
- **Checks:** Start from failing cases in `tests/view/headquarters.test.mjs`: Q12's three examples, the moment of readiness, a clock set back, the label at 1 and 2. In `tests/view/clock.test.mjs`: the moment read at the start and after each flush, the call after each flush, none after `dispose`. In `tests/view/account-screen.test.mjs`: a case that follows a clock tick to the rewritten line and sees no save. Then: `npm run typecheck` · `npm test -- tests/view/headquarters.test.mjs` · `npm test -- tests/view/clock.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/game-saver.test.mjs` · `npm run build` · `npm test -- tests/invariants/test_browser_view_token_values.py`. State check and screenshot by the harness route of Slice 4: a ready line, a line with hours, one below an hour, one that turns ready within a tick, a character at generation 1 and at 2, at a desktop width and at 480×900, then stop the server. Where this route fails, report the failed check itself.
- **Depends on:** Slice 2 · Slice 3 · Slice 4 · Foundation entries: Row 5 · Row 6 · Row 7 · Row 12 · D-04 · D-03

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Need: a manual repeat pays nothing and takes nothing | Slice 1 |
| Need: a death has a price, with a resurrection and a generation | Slice 2 · Slice 3 · Slice 4 · Slice 5 |
| Need: the earning loop's settlement stands | Slice 1 · Slice 3 |
| To do 1, first completion pays once per map | Slice 1 · `solved-map-manual-run` |
| To do 2, a solved map's manual run pays nothing, its practice stays with the run | Slice 1 · `solved-map-manual-run` · Row 2 |
| To do 3, the map's state at the start decides, `Restart` included | Slice 1 · Row 1 |
| To do 4, the mark lasts to the end, the screen and the load | Slice 1 |
| To do 5, equipment from nowhere, the chest untouched | Slice 1 · D-179 |
| To do 6, the line on a solved map's run | Slice 4 · Row 3 |
| To do 7, preview, practice and deposit lines there | Slice 1 makes the values · Slice 4 tests the screen |
| To do 8, generation and a ready resurrection | Slice 2 · Row 8 |
| To do 9, 480 real minutes in the balance data | Slice 2 |
| To do 10, a death uses a ready resurrection | Slice 3 · Row 9 |
| To do 11, a death without one wipes and raises the generation | Slice 3 · Row 9 · Row 12 |
| To do 12, readiness at the exact moment | Slice 2 · Row 9 |
| To do 13, the browser's clock counts it, the game closed too | Slice 2 keeps a moment · Slice 3 reads it · Slice 5 shows it · Row 7 |
| To do 14, every death ends the run and pays nothing | Slice 1 on a marked run · Slice 3 with a resurrection |
| To do 15, what survives every death | Slice 3 |
| To do 16, a death settled once, a load settling nothing | Slice 3 · Row 10 |
| To do 17, the retained run stands, `Restart` starts from the wiped team | Slice 3 |
| To do 18, the line after a death | Slice 4 · Row 4 |
| To do 19, the headquarters' resurrection line | Slice 5 · Row 5 |
| To do 20, the generation label | Slice 5 · Row 6 |
| To do 21, the raised version | Slice 1 |
| To do 22, the entries of the foundation | Foundation entries, all rows |
| Row 1 | Row 1 · Slice 1 |
| Row 2 | Row 2 · Slice 1 |
| Row 3 | Row 3 · Slice 4 |
| Row 4 | Row 4 · Slice 4 |
| Row 5 | Row 5 · Slice 5 |
| Row 6 | Row 6 · Slice 5 |
| Row 7 | Row 7 · Slice 3 · Slice 5 |
| Row 8 | Row 8 · Slice 2 |
| Row 9 | Row 9 · Slice 2 · Slice 3 |
| Row 10 | Row 10 · Slice 3 |
| Row 11 | Row 11 |
| Row 12 | Row 12 |
| Projected `solved-map-manual-run/1` | `solved-map-manual-run` · Slice 1 |
| Projected „What pays, and what takes from the chest?”, this code's part | D-189 · Slice 1 |
| Projected „What does a character's death take?”, this code's part | D-190 · Slice 3 |
| Projected `manual map run`, standing already | Slice 1 makes its use true; nothing to write |
| Spec decisions 1, 2 | Slice 1 |
| Spec decision 3 | Slice 2 |
| Spec decisions 4, 5, 6 | Slice 3 |
| Spec decision 7 | Slice 3 · Slice 5 · D-04 · D-03 |
| Spec decision 8 | Slice 4 · Slice 5 |
| Spec decision 9 | Slice 1 · Slice 2 · Slice 3 |
| Spec decision 10 | every slice, by its *Checks* |
| Spec decision 11 | D-190 |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| `SAVED_GAME_VERSION` becomes 2 in Slice 1, with the first change of shape; Slices 2 and 3 change the shape and rewrite the document at 2, under the exception `tests/sim/saved-game.test.mjs:36`–`:38` already states | raising it in the last slice that changes the shape — two slices would hold a changed shape at version 1, the very pairing the guideline forbids | none past the merge: one number, and version 2 reaches a server only by the merge |
| Each rule of the load lands with the behaviour that makes it true: `deposited` at a marked completion in Slice 1, a death settled in Slice 3 | a first slice of the whole shape and its load rules — the branch would save a deposit or a death its own load refuses, or the rules would stand loose across slices | three reviews of the trust boundary, each on a short read |
| Character keys (Slice 2) apart from the settlement (Slice 3) | one slice — 12 files, over the limit of 10, and two goals a reviewer judges apart | a further slice on `saved-game.ts` |
| `settleDeath`, the clock's composition and the load's refusal of an unsettled death in one slice | the simulation first, the clock after — a state of the branch between them plays a death its next load refuses | a larger Slice 3, hence class `same` |
| The clock's one reading goes in Slice 3; its moment for the view and the call after each flush in Slice 5 | all clock work in Slice 3 — the two additions would have no user or check of theirs | a second touch of `clock.ts` and `clock.test.mjs` |
| `guidelines/coding-saved-game.md` stays as it is (spec, *Left to the maker*): what it says stays true | a paragraph on the new keys in its *Examples* | the next author reads the keys from the exemplar |
| `tests/view/account-screen.test.mjs` gains a case that follows a tick to the rewritten line (spec, *Left to the maker*): nothing else tests that wiring in a game view | the pure functions and the clock's call tested alone | one case more in a long file |
| The kitchen-sink page stays as it is: the new lines are no shared control, state of one or role, and a class on `.trip-result` adds no role | a sample of the new lines there — the page shows no game screens (D-45) | a sample added later |
| Screens are inspected through an ignored harness over the real `createGameView`, as the cycle `plan-wyprawy` did | the way through an account — an unconfigured server answers account routes with 503 (D-111), so the game does not start | the account path stays unobserved in the slices; the report says so |
| `tests/sim/death.test.mjs` is born in Slice 2 with its first case, so `stryker.config.json` changes once | creating it in Slice 3 — `resurrectionReady` would have its case elsewhere | the file changes in two slices |
