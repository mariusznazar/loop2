done with concerns

# Planner report — task `katalog-map`

- Plan: `.runs/task-cycles/katalog-map/plan.md`
- Size report (last run of `task-cycle/slice_size.py`, exit 0): `.runs/task-cycles/katalog-map/plan-size.md`
- Check result: size script exit 0, 13 slices, every one `fits`; Slices 4 and 9 `fit by ranges` of one test file each (`tests/view/scene-picture.test.mjs`, `tests/view/maps-screen.test.mjs`), which their agents change by search. Nothing else was run: no gate, no product test. One focused check on the base, `node tests/quality/eslint-size-rules.mjs`: "0 functions and files over a threshold in 347 files", so no slice needs a move-out first.
- Commits: none. Files written: the plan, the size report and this report.

## Shape of the plan

Foundation entries (one agent, before Slice 1; 18 rows) then 13 slices in this order:

1. Slice 1 — the bear's four sprite files from the new pack, README, `PACK_CREDITS`, `tests/view/icons.test.mjs` (trust boundary: sprite files).
2. Slice 2 — bear in `CREATURES`, icon `bear-head`, its credit, `SCENE_CREATURES.bear`, a field for the name after "z" (trust boundary: icon file).
3. Slice 2b — `now-lines.ts` reads that field ("Walczy z niedźwiedziem").
4. Slice 3 — `region` in map data, `forestPack`, `forestLair`, the data field naming the creature of the record, the sim/balance tests, and the `progression` measurement with its ordered stops (Matecznik solved by any program: return `blocked`; wataha not harder or unsolvable: change only its numbers; `first-exploration-discovery`: change the fewest resource numbers).
5. Slice 4 — the bear seen in the running scene, scale checked, screenshots (no file changes unless the bear stands wrong).
6. Slice 5 — overlay `forest-pack.json` removed, overlay test, control path, the skill (both copies) with the new reading of "can be solved" (To do 9).
7. Slice 6 — `Judging` reports the most creature health taken in one fight, per seed.
8. Slice 7 — the record in `judging-cache.ts` (trust boundary: lasting storage).
9. Slice 8 — pure lines of the catalog (`catalog-lines.ts`).
10. Slice 9 — catalog component and screen wiring, tests.
11. Slice 10 — look of the catalog in both layouts, browser check, screenshots beside the old Loop (the one slice marked `strongest`).
12. Slice 11 — the number in Matecznik's row and card, entry wiring, screenshot.
13. Slice 12 — the styleguide section "The screen Mapy".

Tests the plan leaves failing at a base, with owners (named in Slice 3's Goal): `tests/balance/overlay.test.mjs` (Slice 5), `tests/view/map-lines.test.mjs` (Slice 8), `tests/view/maps-screen.test.mjs` and any other file of `tests/view/` that fails only because the data hold five maps (Slice 9).

Order against the styleguide's example (fonts, tokens, one screen, its states): departed from. No font, token or library is new, so the data and the pure lines come first, then the screen, then its look and states. Slice 10 must name, not add, a token it lacks (`src/browser/AGENTS.md`).

## Choices (all listed in the plan's *Choices*)

Wataha keeps the moss of the overlay; region is a typed list in `maps.ts`; the map's data name the creature of the record; damage read from the run's state inside `judgeOnSeeds` (no field in the map run, the saved game or `JudgingRecord`); the record is a second key family with its own version inside `judging-cache.ts`, bound to the creature's health and blow; the case of a creature's name after "z" is data; overlay removed and tests moved to `wasteland.json`; the 20 % flag left in `balance/progression.mjs`; split of the bear, balance and catalog work as given above.

## Concerns and questions for the orchestrator (with proposed answers)

1. D-149 is missing from the handoff's list of settled edits, but *Decisions in play* says "zmiana z Q1 a" (a map not yet opened stands only as an empty place in "Postęp" and in its region's counter). I put it in *Foundation entries*. Proposed: keep it.
2. `balance/progression.mjs` still has `SOLVABLE_SHARE = 20` and a `solvable` flag in its result (and three cases in `tests/balance/progression.test.mjs` hold it). To do 9 changes only the skill's sentence, and the table does not print the flag. After Slice 5 the skill and the code disagree on the word "solvable". Proposed: leave it and say so in the request; the alternative is a small balance-tools change (constant plus three cases) added to Slice 5, which To do 9 does not ask for.
3. Network is needed twice: the writer of the environment fact quotes the pack's page, and Slice 1 fetches the pack's download (into its own directory under `.runs/`, untrusted). Slice 2's icon comes from the old repository's copy of game-icons (`assets/game-icons/delapouite/bear-head.svg`); whether that copy is the same as `ICON_SOURCE_COMMIT` of `credits.ts` is not checked here and Slice 2 is told to compare. Where an executor has no network it should return, not write from memory.
4. Screenshots: D-418 puts them in the public GitHub repository `mariusznazar/screenshots`. Publishing there is an outside action. The plan says "kept where D-418 and D-419 settle"; the orchestrator decides who pushes and whether an executor may.
5. Slices 1, 2 and 11 read 140–145k estimated tokens, near the 150k limit, because every slice that touches `browser-view` carries about 100k tokens of whole guideline files (styleguide ~50k, testing ~34k, browser-module ~11k, coding ~7k). The new files that Slices 8 and 9 make cannot be counted by the script (they do not exist at the base), nor can the outside sources (old repository, old screenshots); I wrote them without backticks and gave their sizes where known (MapCatalog.tsx ~13.7 KB, mapFacts.ts ~2.4 KB, the spec ~16 KB, `maps.ts` ~18 KB). Slice 11's real reading is about 9k tokens above the 140.7k the script prints.
6. Which `tests/view/` files break when the data hold five maps was not measured (I ran no test and did not edit code). The plan names the known ones; the Slice 3 and Slice 9 executors list the rest.
7. Slice 3 is the only slice that can stop the cycle (Matecznik solved by a program). It also may change the wolf pack's numbers; the request must say so (To do 1).
8. Guidelines uncertain or missing: none missing. Uncertain: the rule "a guideline goes whole" makes every browser-view slice with tests read ~100k tokens of guidelines; I cut slices to fit rather than ask for excerpts. `guidelines/coding.md` names no kind for tests of `tests/view/`; I read the styleguide for them because the part map puts `tests/view/**` in `browser-view`.

## Reaches beyond the dispatch

- `src/browser/sim/data/maps.ts`, `creatures.ts`, `judging.ts`, `judging-record.ts`, `run.ts:690-830`, `types.ts` (parts), `view/maps-screen.tsx`, `maps-entry.ts`, `map-lines.ts`, `judging-cache.ts`, `credits.ts`, `credit-lines.ts`, `now-lines.ts` (part), `scene.ts` (part), `balance/progression.mjs` (part), `balance/overlays/*.json`, `tests/balance/overlay.test.mjs` (part), `tests/invariants/test_balance_instrument_file_writes.py` (part), `tests/view/icons.test.mjs` (part), `README.md` (point 2): to name each slice's files; read to cut slices, not to design.
- `.the-way/task-cycle/slice_size.py`, `.the-way/task-cycle/change/ui_check.md`, `.the-way/product-guidelines/reading.md`: how size is measured, what a UI check keeps, and that a guideline goes whole.
- `foundations/decisions.md` D-425 (limits of size) and, through a small range script, the line ranges of 60 entries; `foundations/glossary.md` (`wall`, `overlay`, `judging`); `foundations/invariants.md` (the entries the handoff names, by their text); `foundations/environment_facts.md` `lpc-wolf-licence`.
- `scripts/test.py` and `package.json`: to give `npm test -- <file>` and `npm run --silent typecheck` as the focused checks.

## Working copies

I made no worktree and no clone. In my directory `.runs/planner/` I made four small files (an ESLint probe, a range script, two outputs); I removed the directory before returning. Nothing stays.

## Unread material

- `guidelines/styleguide-browser-view.md` (1507 lines): read 1–210, 345–460, 481–700, 838–917 and 1484–1507; not read 204–345 (states of shared controls), 700–838 (menu bar and list of programs), 917–1484 (other screens, the scene section, picture band, chronicle, end window, accounts).
- `guidelines/testing.md` (509 lines): read 1–60 and the start of "Where the expected value comes from" and "Test inputs and expected values" (to about line 125), and the heading list; not read the rest (trust boundaries, mutation testing, flaky tests, test files in the gate, recipes, exclusions).
- `guidelines/coding-balance-instrument.md`: not read (Slices 3 and 5 name it for their agents). `guidelines/coding-saved-game.md`: not read (no slice touches the saved game).
- `foundations/decisions.md`: the entries the handoff names were read only as the *Listed in full* paragraphs of `.runs/orchestrator/index.md` (main sentence and scope), except D-425, read whole; their *Rationale*, *Rejected*, *Relations* and *Verification* fields were not read. The entries named in slices' *Read* are named by range for their agents.
- `foundations/invariants.md`: read from the index lines of each (text and fields of the 14 entries) only through the range output and the sections printed; `function-and-file-size` was read through D-425 and the size run, not its own entry.
- `foundations/part_map.md`: whole. `foundations/glossary.md`: `wall`, `overlay`, `judging` only.
- `.claude/skills/loop2-play/SKILL.md`: headings only (named in the Read of Slices 4, 10 and 11). `.claude/skills/loop2-balance/SKILL.md` and `loop2-scene-art/SKILL.md`: whole.
- Old repository: `MapCatalog.tsx`, `mapFacts.ts`, `creatures.ts` whole; `maps.ts` lines 1–60 and 150–290 (the region list, forestDeep, forestPack, forestLair, forestRavine); not read `LAIR_RESOURCES` itself, the spec's chapters 2–5 (only its headings), the old screenshots (not looked at).
- Product code: `maps-screen.tsx`, `maps-entry.ts`, `map-lines.ts`, `map-card.ts`, `judging-cache.ts`, `judging.ts`, `judging-record.ts`, `maps.ts`, `creatures.ts` whole; `types.ts` 100–175 and 370–400; `run.ts` 690–830; `credits.ts` 1–130 and 150–185; `credit-lines.ts` 1–120; `now-lines.ts` 40–90; `scene.ts` 60–200; `progression.mjs` 1–60 and 225–330; `overlay.test.mjs` 1–140; `icons.test.mjs` 160–260; `map-lines.test.mjs` 1–60. No other test file was read.

## Searches not found or unclear

- Which tests of `tests/view/` fail with five maps in the data: not found without running them; I ran none.
- Whether the old repository's copy of game-icons is the commit of `ICON_SOURCE_COMMIT`: unclear.
- What the pack's sheets hold for the bear (direction rows, an attack row, a death row) and what its page says about authors and attribution: not looked at (needs the network); the task says walk, attack and death in four directions, 64 × 64 frames, no standing animation.
- Who may publish the screenshots to the public repository of D-418: unclear (concern 4).
- Where the `solvable` flag of `balance/progression.mjs` is meant to follow To do 9: unclear (concern 2).
- A place in the handoff or the task for the exact form of the hours of a demand ("12 h") when a streak is not whole hours: not found; chosen in *Choices*.
