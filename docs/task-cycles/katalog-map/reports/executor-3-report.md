done with concerns

# Report of executor 3 - Slice 3, task `katalog-map`

## Commits

- `e0342c5d` feat: add the region to the data of each map and the maps Las — wataha and Las — matecznik, the latter naming the bear for the record of damage (D-24, D-448, D-438) - base `b41798ba`; pushed nowhere.

Files changed (added/removed lines):

- `src/browser/sim/data/maps.ts` - `REGIONS` (`["Las"]`) and `RegionName`; `MapDef.region`; `MapDef.recordCreature?: CreatureId` (the creature whose health the record of Slice 11 shows); `region: "Las"` on `forestEdge`, `forest`, `forestDeep`; new maps `forestPack` and `forestLair`.
- `tests/sim/data.test.mjs` - `region` added to the two whole-map `deepEqual` cases; five new cases (regions, the chain order, `forestPack`, `forestLair`, `recordCreature` among the attackers).
- `tests/invariants/test_content_identifiers.py` - two entries in `ENTRIES` for the new maps (see "Reach beyond the dispatch").

(Line counts: `git show --stat e0342c5d` gives them.)

## Maps as entered

- `forestPack` ("Las — wataha"): 5 × 5, entrance drawn, 7 °C, step 5, the four resources of Las — głębiej (moss and fiber included), wolf 0.015 a minute with 90 minutes of quiet, solving `{ streak: 540, defeatedAttacks: 6 }`, opened by `forestDeep`. `solvingText`: "540 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu oraz sześć pokonanych napaści wilka"; `completionText`: "Las — wataha rozwiązany" (the sentences of the overlay, which are in the form of `forestDeep`).
- `forestLair` ("Las — matecznik"): 6 × 6, entrance drawn, 7 °C, step 5, `carryIn: 0`, resources of `LAIR_RESOURCES` (stick 0.5/12/30, berry 0.4/8/40, moss 0.3/6/60, fiber 0.3/6/60 as density/stock/renew minutes), bear 0.01 a minute with 180 minutes of quiet, solving `{ streak: 600, defeatedAttacks: 1 }`, opened by `forestPack`, `recordCreature: "bear"`. `solvingText`: "600 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu oraz jedna pokonana napaść niedźwiedzia"; `completionText`: "Las — matecznik rozwiązany".
- The numbers of the lair come from `git -C the old game's repository show feat/archetypes:src/sim/data/maps.ts` (the entry `forestLair`: threat bear 0.01 / 180, survival 600, 1 defeat, `carryIn` 0, 6 × 6, 7 °C, entry random; and `LAIR_RESOURCES`).

## Measurement (the stops of the Goal, in order)

Command: `npm run --silent balance -- progression --out .runs/executor-3/progression-1.md`, exit 0, one run (the table is below as the skill prints it; no number was changed, so there is no table "before").

1. Las — matecznik: no reference program solves one seed (P1-P23 all 0 %). The stop of `blocked` does not apply.
2. Las — wataha: the best program (P10) solves 46.8 % (median 1014 minutes); the best program of Las — głębiej (P10) solves 92.4 %. The pack solves some seeds and fewer than głębiej, so the wolf pack's numbers stand unchanged; `solvingText` unchanged.
3. `first-exploration-discovery`: `tests/sim/discovery.test.mjs` walks `Object.keys(MAPS)`, so it covers both new maps; 50 of 50 pass. No resource number was changed.

The matecznik's table row is also lower than the pack's (best 0 % against 46.8 %), as the task asks.

### Final table (word for word, as the skill prints it)

| Map | Program | Solved (seeds 1-500) | Median game minutes of solved runs | Deaths by cause | Runs at the cap |
| --- | --- | --- | --- | --- | --- |
| Skraj lasu | P1 | 0 % | — | cold 497, hunger 3 | 0 |
| Skraj lasu | P2 | 16.8 % | 840 | hunger 415, cold 1 | 0 |
| Skraj lasu | P3 | 96.4 % | 975 | cold 17, hunger 1 | 0 |
| Skraj lasu | P4 | 97 % | 712 | cold 15 | 0 |
| Skraj lasu | P5 | 94.6 % | 754 | cold 27 | 0 |
| Skraj lasu | P6 | 94.6 % | 754 | cold 27 | 0 |
| Skraj lasu | P7 | 94.6 % | 754 | cold 27 | 0 |
| Skraj lasu | P8 | 96.4 % | 975 | cold 17, hunger 1 | 0 |
| Skraj lasu | P9 | 97 % | 712 | cold 15 | 0 |
| Skraj lasu | P10 | 94.6 % | 754 | cold 27 | 0 |
| Skraj lasu | P11 | 94.6 % | 754 | cold 27 | 0 |
| Skraj lasu | P12 | 0 % | — | cold 500 | 0 |
| Skraj lasu | P13 | 0 % | — | cold 500 | 0 |
| Skraj lasu | P14 | 0 % | — | hunger 499, cold 1 | 0 |
| Skraj lasu | P15 | 0 % | — | hunger 499, cold 1 | 0 |
| Skraj lasu | P16 | 0 % | — | cold 500 | 0 |
| Skraj lasu | P17 | 94.6 % | 754 | cold 27 | 0 |
| Skraj lasu | P18 | 0 % | — | cold 500 | 0 |
| Skraj lasu | P19 | 0 % | — | cold 500 | 0 |
| Skraj lasu | P20 | 0 % | — | cold 500 | 0 |
| Skraj lasu | P21 | 0 % | — | cold 500 | 0 |
| Skraj lasu | P22 | 0 % | — | cold 500 | 0 |
| Skraj lasu | P23 | 97.4 % | 733 | cold 13 | 0 |
| Las | P1 | 0 % | — | cold 498, hunger 2 | 0 |
| Las | P2 | 7.4 % | 850 | hunger 313, cold 150 | 0 |
| Las | P3 | 50.4 % | 923 | cold 75, hunger 171 | 2 |
| Las | P4 | 71.8 % | 754 | cold 141 | 0 |
| Las | P5 | 62.4 % | 775 | cold 188 | 0 |
| Las | P6 | 93.8 % | 480 | cold 31 | 0 |
| Las | P7 | 94 % | 480 | cold 30 | 0 |
| Las | P8 | 50.4 % | 923 | cold 75, hunger 171 | 2 |
| Las | P9 | 69.6 % | 643 | cold 152 | 0 |
| Las | P10 | 99.4 % | 480 | cold 3 | 0 |
| Las | P11 | 62.4 % | 775 | cold 188 | 0 |
| Las | P12 | 0 % | — | cold 500 | 0 |
| Las | P13 | 0 % | — | cold 498, hunger 2 | 0 |
| Las | P14 | 0 % | — | hunger 350, cold 150 | 0 |
| Las | P15 | 0 % | — | hunger 351, cold 149 | 0 |
| Las | P16 | 0 % | — | cold 500 | 0 |
| Las | P17 | 93.8 % | 480 | cold 31 | 0 |
| Las | P18 | 93.8 % | 480 | cold 31 | 0 |
| Las | P19 | 64.8 % | 633 | cold 176 | 0 |
| Las | P20 | 93.8 % | 480 | cold 31 | 0 |
| Las | P21 | 0 % | — | cold 500 | 0 |
| Las | P22 | 0 % | — | cold 500 | 0 |
| Las | P23 | 94 % | 480 | cold 30 | 0 |
| Las — głębiej | P1 | 0 % | — | combat 407, cold 93 | 0 |
| Las — głębiej | P2 | 0 % | — | combat 288, cold 77, hunger 135 | 0 |
| Las — głębiej | P3 | 0 % | — | combat 384, cold 41, hunger 75 | 0 |
| Las — głębiej | P4 | 0 % | — | combat 397, cold 103 | 0 |
| Las — głębiej | P5 | 0 % | — | combat 385, cold 115 | 0 |
| Las — głębiej | P6 | 0 % | — | combat 470, cold 30 | 0 |
| Las — głębiej | P7 | 0 % | — | combat 470, cold 30 | 0 |
| Las — głębiej | P8 | 1.6 % | 771 | cold 130, combat 247, hunger 115 | 0 |
| Las — głębiej | P9 | 34.8 % | 603 | cold 221, combat 105 | 0 |
| Las — głębiej | P10 | 92.4 % | 654 | combat 22, cold 16 | 0 |
| Las — głębiej | P11 | 1.6 % | 781 | cold 341, combat 151 | 0 |
| Las — głębiej | P12 | 0 % | — | combat 160, cold 340 | 0 |
| Las — głębiej | P13 | 0 % | — | cold 386, combat 114 | 0 |
| Las — głębiej | P14 | 0 % | — | combat 252, cold 113, hunger 135 | 0 |
| Las — głębiej | P15 | 0 % | — | combat 395, cold 59, hunger 46 | 0 |
| Las — głębiej | P16 | 0 % | — | combat 160, cold 340 | 0 |
| Las — głębiej | P17 | 0 % | — | combat 470, cold 30 | 0 |
| Las — głębiej | P18 | 0 % | — | combat 470, cold 30 | 0 |
| Las — głębiej | P19 | 0 % | — | combat 391, cold 109 | 0 |
| Las — głębiej | P20 | 0 % | — | combat 470, cold 30 | 0 |
| Las — głębiej | P21 | 0 % | — | cold 393, combat 107 | 0 |
| Las — głębiej | P22 | 0 % | — | combat 374, cold 126 | 0 |
| Las — głębiej | P23 | 0 % | — | combat 470, cold 30 | 0 |
| Las — wataha | P1 | 0 % | — | combat 479, cold 21 | 0 |
| Las — wataha | P2 | 0 % | — | combat 457, cold 22, hunger 21 | 0 |
| Las — wataha | P3 | 0 % | — | combat 474, cold 11, hunger 15 | 0 |
| Las — wataha | P4 | 0 % | — | combat 480, cold 20 | 0 |
| Las — wataha | P5 | 0 % | — | combat 479, cold 21 | 0 |
| Las — wataha | P6 | 0 % | — | combat 492, cold 8 | 0 |
| Las — wataha | P7 | 0 % | — | combat 492, cold 8 | 0 |
| Las — wataha | P8 | 0 % | — | combat 253, hunger 92, cold 155 | 0 |
| Las — wataha | P9 | 24.2 % | 1014 | combat 181, cold 198 | 0 |
| Las — wataha | P10 | 46.8 % | 1014 | combat 251, cold 15 | 0 |
| Las — wataha | P11 | 0 % | — | combat 182, cold 318 | 0 |
| Las — wataha | P12 | 0 % | — | cold 411, combat 89 | 0 |
| Las — wataha | P13 | 0 % | — | combat 298, cold 202 | 0 |
| Las — wataha | P14 | 0 % | — | combat 452, cold 27, hunger 21 | 0 |
| Las — wataha | P15 | 0 % | — | combat 479, cold 18, hunger 3 | 0 |
| Las — wataha | P16 | 0 % | — | combat 426, cold 74 | 0 |
| Las — wataha | P17 | 0 % | — | combat 492, cold 8 | 0 |
| Las — wataha | P18 | 0 % | — | combat 492, cold 8 | 0 |
| Las — wataha | P19 | 0 % | — | combat 478, cold 22 | 0 |
| Las — wataha | P20 | 0 % | — | combat 492, cold 8 | 0 |
| Las — wataha | P21 | 0 % | — | combat 157, cold 343 | 0 |
| Las — wataha | P22 | 0 % | — | combat 483, cold 17 | 0 |
| Las — wataha | P23 | 0 % | — | combat 492, cold 8 | 0 |
| Las — matecznik | P1 | 0 % | — | combat 382, cold 118 | 0 |
| Las — matecznik | P2 | 0 % | — | combat 263, cold 133, hunger 104 | 0 |
| Las — matecznik | P3 | 0 % | — | combat 350, hunger 80, cold 70 | 0 |
| Las — matecznik | P4 | 0 % | — | combat 380, cold 120 | 0 |
| Las — matecznik | P5 | 0 % | — | combat 353, cold 147 | 0 |
| Las — matecznik | P6 | 0 % | — | combat 353, cold 147 | 0 |
| Las — matecznik | P7 | 0 % | — | combat 353, cold 147 | 0 |
| Las — matecznik | P8 | 0 % | — | combat 350, hunger 80, cold 70 | 0 |
| Las — matecznik | P9 | 0 % | — | combat 380, cold 120 | 0 |
| Las — matecznik | P10 | 0 % | — | combat 353, cold 147 | 0 |
| Las — matecznik | P11 | 0 % | — | combat 353, cold 147 | 0 |
| Las — matecznik | P12 | 0 % | — | combat 160, cold 340 | 0 |
| Las — matecznik | P13 | 0 % | — | combat 160, cold 340 | 0 |
| Las — matecznik | P14 | 0 % | — | combat 216, cold 180, hunger 104 | 0 |
| Las — matecznik | P15 | 0 % | — | combat 216, cold 180, hunger 104 | 0 |
| Las — matecznik | P16 | 0 % | — | combat 160, cold 340 | 0 |
| Las — matecznik | P17 | 0 % | — | combat 353, cold 147 | 0 |
| Las — matecznik | P18 | 0 % | — | combat 330, cold 170 | 0 |
| Las — matecznik | P19 | 0 % | — | combat 287, cold 213 | 0 |
| Las — matecznik | P20 | 0 % | — | combat 330, cold 170 | 0 |
| Las — matecznik | P21 | 0 % | — | combat 353, cold 147 | 0 |
| Las — matecznik | P22 | 0 % | — | combat 362, cold 138 | 0 |
| Las — matecznik | P23 | 0 % | — | combat 367, cold 133 | 0 |

Each map was measured with the practice and ranks from the first solvings of the maps before it, each by that map's best program, and with the stock its program takes, brought out by manual runs of solved maps (Skraj lasu: no manual run, the stock not gathered in full; Las: 3 manual runs; Las — głębiej: 3 manual runs; Las — wataha: 3 manual runs; Las — matecznik: no manual run).

## Checks (command and exit code)

- `rg -l "forestDeep|Object\.(keys|values|entries)\(MAPS\)" tests/sim tests/balance` - lists 26 files (25 `*.test.mjs`, plus `tests/sim/reference-programs.mjs`).
- `npm run --silent build` - exit 0 (twice, before and after the tests' edit).
- `node --test` on the listed files: my first run, with the listed files, `exit=1`: 562 tests, 556 pass, 6 fail (2 of them `tests/sim/data.test.mjs` at its old expectations, which I then brought to the region; 3 of `tests/balance/overlay.test.mjs`, Slice 5; 1 of `tests/sim/saved-game.test.mjs`, see Concerns). After the edit I ran by mistake bare `node --test` (an empty list from my `sed`, the full discovery of `*.test.mjs` under `tests/` plus `scripts/test-node-file.mjs`, which is no test file and fails when loaded as one), `exit=1`: 3103 tests, 3095 pass, 8 fail - listed below. That broad run is no run of the product's gate (`npm test` with no argument is the gate; I did not run it).
- `npm test -- tests/sim/data.test.mjs` - exit 0 (45 of 45), after the edit.
- `npm test -- tests/sim/discovery.test.mjs` - exit 0 (50 of 50).
- `npm test -- tests/sim/map-card.test.mjs` - exit 0 (11 of 11).
- `npm test -- tests/balance/progression.test.mjs` - exit 0 (13 of 13).
- `npm test -- tests/invariants/test_content_identifiers.py` - first run exit 1 (`test_tripwire_every_data_entry_is_written_out` named `forestPack` and `forestLair` as missing from `ENTRIES`); after the two entries, exit 0 (5 of 5).
- `npm run --silent typecheck` - exit 0.
- `npx eslint --max-warnings 0 src/browser/sim/data/maps.ts` (and `tests/sim/data.test.mjs`) - exit 0.
- `npx prettier --check src/browser/sim/data/maps.ts` (and `tests/sim/data.test.mjs`) - exit 0.
- `python -B .the-way/elements/common/foundation_check.py` (and the same with `--skip-test-citations`; both printed the same list) - exit 1, 14 errors, exactly the 14 known citations of Slices 8 and 9 (`tests/view/account-screen.test.mjs:4229, :4488`, `tests/view/map-lines.test.mjs:198, :237`, `tests/view/maps-screen.test.mjs:221, 319, 321, 353, 355, 407, 409, 475, 556, 1042`). The first run listed 3 more, in my own new `decision:` lines of `tests/sim/data.test.mjs` (each quotation must begin a sentence of its decision); I changed the quotations to begin the sentences and the 3 went away.
- `ruff format --check` on `tests/invariants/test_content_identifiers.py`: not run, `.runs/quality-venv` of this worktree holds no Ruff; the two lines added copy the form of their neighbours.
- Not run: the product's gate (`npm test` with no argument), by the handoff.

### Failing tests after the change, and their owners

- `tests/balance/overlay.test.mjs` - "a map the overlay adds can be swept, after the map it opens after", "the restore leaves every table deep-equal to what it was, and removes a map the overlay added", "each overlay file of the part adds its map, which opens after a map the game holds, and can be swept" - expected, owner Slice 5 (the overlay `balance/overlays/forest-pack.json` adds a map the data now hold).
- `tests/view/map-lines.test.mjs:31` "the list of maps hides maps until their prerequisites are solved; the editor keeps its full map list" - the list is now five ids, three expected - expected, owner Slice 8.
- `tests/view/end-window-lines.test.mjs:428` "the way-on buttons after a completion of Las name the map it opens, and none after a death or a completion of the map it opens" - after a completion of `forestDeep` the end window now has "Otwarte: Las — wataha →", the case expected none - fails only because the data hold five maps; no owner named in the handoff (`tests/view/` other than the listed ones: Slice 9 by the handoff's rule).
- `tests/view/end-window.test.mjs:570` "the buttons stand after the scrolling part, outside it: ..." - got `["Restart","Zakończ","Otwarte: Las — wataha →"]` for the same reason - same owner question.
- `tests/view/maps-screen.test.mjs` and `tests/view/account-screen.test.mjs`: no case failed in my broad run (the handoff expected some; I found none that fails on the five maps).

## Own-work check

The requirement of my slice that the work most likely does not meet: a map that "carries" its stop rules and the first discovery (`first-exploration-discovery`) on the two new maps, and the lair being enterable with entry cap 0 though no program solves it.

- `tests/sim/discovery.test.mjs` "a character of a new game whose program holds Zawsze → Eksploruj ... on every map" sends a character to each map of `Object.keys(MAPS)` with the other maps solved, so it reaches `forestPack` and `forestLair` (entrance drawn, entry cap 0 on the lair): 50 of 50, first discovery by minute 20 on both.
- Traced with the instrument: `trace --map forestPack` and `trace --map forestLair` (one reference program, seed 3) - the pack's run met "ATTACK wilk" and ended "death ... cause combat"; the lair's run began with the pack empty (`pack=[]`: entry cap 0), met "ATTACK niedźwiedź" and ended "death ... cause combat" at minute 311. The bear attacks the lair, as the data say.
- Mutation in my head against the new data test: lair `carryIn` 1, lair `opensAfter` changed, a pack attacker other than the wolf, a region left off a map (type error, and the `region` test), `recordCreature` left off the lair or naming a creature that does not attack there - each fails a case of `tests/sim/data.test.mjs`. The numbers of the new maps are not tested (D-449: no test expects a new map's resources or shares); their wording `solvingText` is not tested against their `solving` numbers (written by hand, as the task says) - an unprotected spot, named here.
- Tests were written after the data, not before (the data are a row of constants); the region and the five-map cases fail on the base data (the two old cases failed with `region` missing at the first run).

## Walkthrough

The change alters what the product shows: the five maps now stand in the game's data, so the screen Mapy lists them and the end window after Las — głębiej offers "Otwarte: Las — wataha →" (seen in the failing view tests above). The screens are changed in Slices 8-10; the walk of this slice is the one case of the simulation I can reach without them:

| Case | By what | Verdict |
|---|---|---|
| The pack's and the lair's map runs start and meet their creature (wolf, bear) | `balance trace` of each map on the built game (system: Windows, no browser) | pass, as above |
| The lair opens with entry cap 0 (a character carries nothing in) | `trace` of the lair: pack empty at the start | pass |
| The catalog, the card, the end window show the new maps | a browser on the running game | not checked: the screens belong to Slices 8-10 and the view tests listed above fail until they are brought to five maps; the game was not started in a browser in this slice |
| Side observation | - | `tests/sim/saved-game.test.mjs:2885` fails (Concerns); the end window offers "Otwarte: Las — wataha →" after Las — głębiej (a view test expects none) |

## Concerns

1. `tests/sim/saved-game.test.mjs:2885` "a crafted document of the current version is refused whole as shape" fails with "a creature absent from the data": the case at line 1749 sets `lastCombat.creatureId = "bear"`, but the bear is in `CREATURES` since Slice 1/2, so the document is accepted. It fails at the base `b41798ba` as well (my change does not touch creatures); no slice of the plan owns the file. I did not edit it (not in my Change). Recommended: one line in that file, naming a creature id the data do not hold (for example a made-up one), with the cause - the bear's entry in the data - named in the commit; owner: the cycle's next slice that may change `tests/sim/`, or a small fix slice before the gate.
2. `tests/view/end-window-lines.test.mjs` and `tests/view/end-window.test.mjs` fail on five maps (above) and are in no owner's *Change* list that I was given; the handoff's rule names Slice 9 for any file of `tests/view/` that fails only on the five maps.
3. The flag `solvable` and `SOLVABLE_SHARE` of `balance/progression.mjs` are left as the plan says (Choices, concern 2). With the wolf pack's best at 46.8 % it reads solvable there; the lair reads not solvable (0 %).
4. The instrument's table prints the pack's best program at 46.8 % and the pack's median at 1014 minutes, the same as the measurement of 2026-11-25 recorded in the task; so adding moss changed nothing against that measurement.

## Choices

- `recordCreature?: CreatureId` as the name of the new optional field of `MapDef` (the plan names no name; Slice 11 reads it). Rejected: `healthRecordCreature`, `bearOf` (too long or names the bear). Cost if wrong: one rename in `maps.ts` and the data test before Slice 11 reads it.
- `REGIONS` is `as const` array `["Las"]` and `RegionName` its member type, exported from `maps.ts` (the order is the catalog's order, as the Goal says). Rejected: a `Record` of region objects (no field of a region is asked for).
- The `forestPack` and `forestLair` rows go in `MAPS` after `forestDeep` in that order, which is the catalog's order as well; a test (`the maps stand in the order of the chain`) holds that each map is opened by the one before it in the list. If a later map branches (the old game's `slope`, `forestRavine`), that test is changed with it - a deliberate-decision test, kept because the catalog groups by this order and D-136's opener is the chain.
- No change in `tests/sim/map-card.test.mjs`, `tests/sim/discovery.test.mjs`, `tests/balance/progression.test.mjs`, `tests/balance/cli.test.mjs`: each already walks `MAPS` or names maps by id and passes with five maps; the Goal's "brought to the five maps" needed no edit there.

## Reach beyond the dispatch

- `tests/invariants/test_content_identifiers.py` (not in the slice's *Change*): the plan's check `npm test -- tests/invariants/test_content_identifiers.py` failed with the tripwire "the data gives the map 'forestPack' ... add it there"; I added the two entries to `ENTRIES`, as the test's own message says. Why: the check the plan lists cannot pass otherwise.
- `foundations/decisions.md`: D-24, D-136 and D-438 read by heading for the exact text of my `decision:` quotations (the handoff names them); D-448 and D-449 whole.
- `.the-way/task-cycle/change/walkthrough.md`: read, as the method requires, before the walk.

## Working copies

- `.runs/executor-3/` (outputs of builds, tests, the table `progression-1.md` and its log): removed before return; the final table stands in this report. No worktree, clone or program file was made; the label key and the programs were never written to a file.

## Unread material

- `foundations/decisions.md`: of the entries the handoff's *Read* names, I read D-24, D-136, D-438 whole, and D-448 and D-449 whole; D-18, D-142, D-187, D-388, D-428 and D-429 not read in the file (I had the task's quotations of D-18, D-388 and D-429).
- `foundations/invariants.md`: `first-exploration-discovery` read whole; `content-identifiers` read through the test's docstring and `ENTRIES` (`tests/invariants/test_content_identifiers.py:1-130`) and not in the file; `first-map-stock` and `first-map-balance` not read (nothing of this slice touches the first map's stock or balance).
- `foundations/part_map.md`: not read (no file added; the one added is none).
- `tests/sim/discovery.test.mjs`: lines 325-375 read, the rest not (the slice changes no line of it).
- `tests/sim/map-card.test.mjs`, `tests/balance/progression.test.mjs`, `tests/balance/cli.test.mjs`: not read whole (grep for the map ids only; they passed unchanged).
- `.runs/task-cycles/katalog-map/task.md`: only the lines the handoff names (28-29, 33, 76-90, 135-142, 157-160, 172, 178-180).
- `.runs/task-cycles/katalog-map/reports/executor-2-report.md`: not read (I read `creatures.ts` instead for the bear's id).
- `balance/overlays/forest-pack.json`, `guidelines/*.md` named, `.claude/skills/loop2-balance/SKILL.md`, `src/browser/sim/data/maps.ts`: read whole. `guidelines/testing.md`: read whole.

## Searches not found or unclear

- The plan names no name for the new optional field of `MapDef` (Goal: "an optional field naming the creature whose health the record of Slice 11 shows"); I searched `plan.md` for it (`rg` on "optional field", "MapDef") and found only the Goal and the Choices row; I chose `recordCreature` (see Choices). Slice 11's executor must be told.
- The handoff expected failing cases in `tests/view/maps-screen.test.mjs` and `tests/view/account-screen.test.mjs`; none failed in my broad run (3103 tests). Unclear whether those files' cases that count maps are gated differently.
- `--skip-test-citations` did not change the output of `foundation_check.py` (it printed the same 14 errors as without it); unclear whether the flag exists in this version of `.the-way`.
- The handoff says the old game's `forestLair` and `LAIR_RESOURCES`; found in `feat/archetypes:src/sim/data/maps.ts` as the handoff says.
