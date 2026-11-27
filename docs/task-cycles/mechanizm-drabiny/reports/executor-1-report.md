done with concerns

# Report of executor 1 — slice 1, the mechanism of a rung and the three rungs in the data

Branch `task/mechanizm-drabiny`, base `1d14b6eb`. One commit: `48c1e0fc` (`feat: :sparkles: the game maps' data hold the mechanism of a rung ... (D-464, D-465, D-466)`). Working tree clean after it.

The concern: one view test that the slice's *Goal* does not announce fails after the change, `tests/view/end-window.test.mjs` (see "Failing tests"). Nothing else is outstanding.

## Files changed (added / removed lines)

| File | + | - |
|---|---|---|
| `src/browser/sim/data/maps.ts` | 234 | 2 |
| `tests/sim/data.test.mjs` | 302 | 3 |
| `tests/invariants/test_content_identifiers.py` | 3 | 0 |
| `tests/invariants/test_map_run_tiles.py` | 22 | 2 |

## What was made

- `maps.ts`: the types `RungRow`, `RungResourceRow`, `RungAttackerRow`, `MapRow`; `composeRung(opener, row, name)` (exported) and `composeMaps(rows)` (exported); the table `ROWS` (the five maps as they were, written whole, the data of the five maps unchanged; the three rung rows between `forestPack` and `forestLair`, in the order of D-466); `MAPS = composeMaps(ROWS)`; `MapId = keyof typeof MAPS`.
  - A rung row names its opener in `opensAfter` and gives numbers only: `carryIn`, `carryOut`, `width`, `height`, `entrance`, `ambientTemperature`, `stepMinutes`, `resources` and `attackers` (entries by identifier, numbers only), `solving`, and the three hand-written sentences. It has no `name`, `region` or `recordCreature` (typed `never`, so writing one is a type error).
  - Composition: resources and attackers in the opener's order, each with the numbers of the row's entry of the same identifier; the solving condition is the opener's with the row's numbers; everything else (region, record creature, caps, grid...) is the opener's unless the row gives it. A resource of density 0 stays in its place.
  - Refusals (thrown while the module loads, so a faulty row stops every test and the game at once, not silently): a resource or an attacker the opener lacks, a kind of solving condition the opener lacks, an identifier twice in a row, an opener that does not stand earlier in the table.
  - Name: `<name of the first map of the line that is no rung> <Roman numeral of the place>`, from II; the table's order is the order of `MAPS`.
- The three rungs `forestDeep2`, `forestDeep3`, `forestDeep4`, each with its own `solvingText`, `goalText` and `completionText` ("Las — głębiej II rozwiązany" ...). Provisional numbers (Slice 6 settles them), only streak, beaten attacks and the wolf's chance and cooldown differ from `forestDeep`:

  | Rung | Opener | Streak | Beaten attacks | Wolf chance per minute | Wolf cooldown |
  |---|---|---|---|---|---|
  | `forestDeep2` | `forestDeep` | 600 | 3 | 0.01 | 150 |
  | `forestDeep3` | `forestDeep2` | 660 | 4 | 0.012 | 120 |
  | `forestDeep4` | `forestDeep3` | 720 | 5 | 0.014 | 100 |

  Grid, entrance, temperature, step, resources and caps are those of `forestDeep` (checked by `.runs/executor-1/own-check.mjs`, all three `true`).
- `tests/sim/data.test.mjs`: the region test names the three rungs; the order test became "the maps stand in the order D-466 gives, each map's opener standing before it" (literal order of eight, opener index lower than own); new cases: who opens whom; the mechanism on a made-up opener (`FIELD`) and rows: numbers taken and the rest from the opener (including `carryIn: 0` overriding 3 and `entrance: null`), no-number row, matching by identifier whatever the row's order, density 0 kept in place and placed on no tile of ten seeds (a real `newMapRun`), refusals (stranger resource, attacker, kind, an attacker on an opener with none, duplicates, opener later / absent / `"toString"`), names `Pole II` ... `Pole X` over a chain of nine rungs and two lines of rungs; on the game's rungs: the composed names with completion text `<name> rozwiązany`, the same resource and attacker identifiers in order, the same kinds of condition, region, record creature, sentences different from the opener's; every map's `solvingText` begins with its own streak in minutes. No case expects a number of a rung (D-449).
- `tests/invariants/test_content_identifiers.py`: `ENTRIES` holds the three composed names, in the order of the data.
- `tests/invariants/test_map_run_tiles.py`: `MAP_RESOURCES` holds the three rungs; the driver's list of solved maps (`solvedMaps`) now also holds `forestDeep2` and `forestDeep3`, because without them a send to `forestDeep3`/`forestDeep4` is refused (their openers unsolved); the docstring names them. This list is in the file the slice's *Change* names, so no reach.

## Checks (command, exit code)

Test-first, seen failing:

| Command | Exit | What it showed |
|---|---|---|
| `npm test -- tests/sim/data.test.mjs` (stub `composeMaps` returning its rows, no rungs yet) | 1 | 14 fail / 44 pass: the region, order, openers, mechanism, refusal, name and game-rung cases fail on their assertions (`.runs/task-cycles/mechanizm-drabiny/reports/executor-1/red-data-test.txt`) |
| `npm test -- tests/invariants/test_content_identifiers.py` with the two invariant tests taken back to the base's text while the data held the rungs | 1 | `test_tripwire_every_data_entry_is_written_out` fails naming `forestDeep2` (`reports/executor-1/red-ci.txt`) |
| `npm test -- tests/invariants/test_map_run_tiles.py`, same | 1 | `test_tripwire_every_map_and_resource_is_written_out` fails naming `forestDeep2` (`reports/executor-1/red-mrt.txt`) |

After the change (the commit's tree, files added to the index before the runs):

| Command | Exit |
|---|---|
| `npm test -- tests/sim/data.test.mjs` | 0 (58 pass) |
| `npm test -- tests/sim/discovery.test.mjs` | 0 |
| `npm test -- tests/sim/layout.test.mjs` | 0 |
| `npm test -- tests/sim/map-card.test.mjs` | 0 |
| `npm test -- tests/sim/rules.test.mjs` | 0 |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0 |
| `npm test -- tests/invariants/test_map_run_tiles.py` | 0 |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 |
| `npm run typecheck` | 0 |

Extra, not in the *Checks*: `npx eslint src/browser/sim/data/maps.ts tests/sim/data.test.mjs` 0; `npx prettier --check` of both 0; `python -B .the-way/elements/common/foundation_check.py` 0 (0 errors; the first run found 7 errors in my `decision:` quotations, which began mid-sentence of D-464, D-465, D-466; I changed the quotations to begin at a sentence of the decision, and the rerun passed; the first run's failing lines were the ones named; the data.test.mjs file was changed only in those comments); `node --test tests/sim/*.test.mjs` 0 (1171 pass); `node --test tests/*.test.mjs` 0 (332 pass); `node --test tests/balance/*.test.mjs` 0 (113 pass); `node --test tests/view/*.test.mjs` exit 1, 18 fail (below).

After the last edit of `tests/sim/data.test.mjs` (the `carryIn: 0` line) I ran again `npm test -- tests/sim/data.test.mjs` (exit 0) plus eslint and prettier; I did not rerun the other checks of the table after that edit, which touched that one test file only, and the foundation check had passed before it and is not changed by it.

Not run: the whole gate (`npm test` without a file) — the orchestrator's; `ruff format`/`ruff check` of the two Python files — the worktree has no `.runs/quality-venv` and the quality test that builds it is not in the *Checks*; the two Python edits add table entries and strings in the form of their neighbours. Mutation tool (Stryker) of D-94 — the reviewer's.

## Failing tests

The 18 failing view tests (`.runs/task-cycles/mechanizm-drabiny/reports/executor-1/all-view.txt`), by file:

| File | Failing | The slice's *Goal* |
|---|---|---|
| `tests/view/catalog-lines.test.mjs` | 7 | announced, Slice 2 |
| `tests/view/map-catalog.test.mjs` | 7 | announced, Slice 2 |
| `tests/view/maps-screen.test.mjs` | 1 | announced, Slice 2 |
| `tests/view/map-lines.test.mjs` | 1 | announced, Slice 3 |
| `tests/view/end-window-lines.test.mjs` | 1 | announced, Slice 3 |
| `tests/view/end-window.test.mjs` | 1 | **not announced** |

`tests/view/end-window.test.mjs`, the case „the buttons stand after the scrolling part, outside it: „Restart” and „Zakończ” as shared destructive buttons, and „Otwarte: …” plain, only after a completion of a map that opens another” (line 570): it expects, after a completion of `forestDeep`, the buttons `Restart`, `Zakończ`, `Otwarte: Las — wataha →`; it now gets `Otwarte: Las — głębiej II →` after the wolf pack's button too. Result on the base `1d14b6eb` (a working copy of it at `.runs/executor-1/base`, removed): `npm test -- tests/view/end-window.test.mjs` exit 0, 14 pass. So the test passes on the base and fails after the slice, and the *Goal* does not name it. I changed nothing in it: its file is not in the slice's *Change*, the slice's *Checks* do not hold it, and the expectation it holds is the one D-466 changes (the end-of-run window after a completion of Las — głębiej gives `Otwarte: Las — wataha →` and under it `Otwarte: Las — głębiej II →`). Recommended: Slice 3 (the end window's) adds the second button to this case. The orchestrator should add `tests/view/end-window.test.mjs` to a slice (3 is the natural one) and to the slice's list of tests left failing.

The five announced files I did not run on the base: the failures there are the counts and lists of five maps (for example "expected ["5 poznanych · 4 rozwiązane"], got ["6 poznanych · 4 rozwiązane"]", "expected "Las — matecznik", got "Las — głębiej II"") that the *Goal* announces.

## Own-work check

- Requirement most likely not met: that a rung keeps what it is to keep of its opener and nothing else changes — the same resources in the same order, the same attackers, the same kinds of condition, region and record creature (To do 1, D-464) — and that the composed names come out right for a rung of a rung (D-465: "Las — głębiej IV", never "Las — głębiej II II").
- The check: the made-up-table cases of `tests/sim/data.test.mjs` (a deep-equal of a whole composed rung written out by hand, resources matched out of order, a chain of nine rungs giving II..X, two lines of rungs); the game-rung case (same identifiers and kinds as the opener); and `.runs/executor-1/own-check.mjs`, which compares the composed rungs of the built data with `forestDeep` field by field (region, grid, entrance, temperature, step, resources, caps, record creature): `same` is `true` for all three, and `MAPS` keys in the order of D-466 (`.runs/executor-1/own-check.json`).
- What it showed: all as required; the composed names are "Las — głębiej II", "Las — głębiej III", "Las — głębiej IV".
- Mutations in my head, and which test catches each: a numeral written `IIII` or a place off by one (names `Pole II`..`Pole X`, game names); the row's omitted number overwriting the opener's (`defined`; the no-number row, the partial resource rows); a zero (`carryIn: 0`, `entrance: null`, density 0) treated as missing (the cases with those values); resources taken in the row's order (matching case); a stranger identifier or kind accepted (refusal cases); `"toString"` found as an opener (its case); a rung built from an opener that stands later (its case); the rung's `completionText` not naming the composed name (game-rung names case); the rung's `goalText` taken from the opener (the `notEqual` case). Not caught on purpose: the rungs' numbers (D-449, Slice 6). Not caught: the Polish agreement of the hours and attacks in a rung's `goalText` and `solvingText` with its numbers (the test checks only that `solvingText` begins with the streak in minutes, and that the three sentences differ from the opener's); I checked them by eye: 600 min "Dziesięć godzin ... trzy pokonane wilki", 660 min "Jedenaście godzin ... cztery pokonane wilki", 720 min "Dwanaście godzin ... pięć pokonanych wilków".
- Walkthrough (`walkthrough.md`) and `ui_check.md`: not read. The slice alters no screen of the code and no user-visible behaviour by itself: it adds three maps to the data, which the catalog and the end window will show only once Slices 2 and 3 make their tests and expectations follow; the screens draw them from the data by the existing code (the five view tests that count maps are the evidence that they now appear). I did not run the game in a browser.

## Reaches beyond the handoff

- `npm ci` in the worktree root (`node_modules` was absent) and in the base working copy; no file of the repository changed by them.
- Read `foundations/decisions.md` D-327 and D-333 by their current ranges (the handoff's ranges), plus the `eslint-size-rules.mjs` of `tests/quality/` to see the limits (D-425). No other reach.

## Choices (with the way rejected and its cost if wrong)

- A single ordered table `ROWS` of rows, whole maps and rung rows together, composed by `composeMaps`; a row without a `name` is a rung's. Rejected: two tables (whole maps, rung rows) plus a third list holding the order — the order would stand twice; a wrapper function `rung({...})` around each rung row — more noise in the rows. Cost if wrong: moving to either later is a change of one file.
- The refusal of a row that adds a resource, an attacker or a kind the opener lacks is thrown at runtime while the module loads, and a test shows it; it is not a type error. Rejected: a mapped type over the table that checks each row against its opener's composed type — a recursive type over the table, the rung of a rung reading the composed type of the rung before it; the cost is that a faulty row of task 16 shows when the data is loaded (every test fails at once, naming the identifier), not in the editor. What the type does give: identifiers of resources and creatures must be real (`ResourceId`, `CreatureId`), and a rung row cannot carry `name`, `region` or `recordCreature`.
- Rung rows' numbers as in the table above (the plan's *Choices* leaves them to Slice 6). Cost if wrong: one row each.
- `MAPS` is now typed `{ [Id in keyof ROWS]: MapDef }` (before, the exact literal types with `as const`); `typecheck` passes, so no code of `src/` read a narrower type. A later reader of an optional field of a specific map now meets `MapDef`'s optionality.
- A row that gives a value `undefined` is treated as not giving it (the helper `defined`).

## Foundation entries made untrue by the code

None found. D-464, D-465 and D-466 as written describe what the code does. The text of the module (the doc comments) does not contradict D-24, D-136 or D-388.

## Trust boundary / irreversible operations

The change touches no trust boundary and holds no operation that cannot be undone.

## Working copies

- `.runs/executor-1/base` (a worktree of `1d14b6eb`, with `.the-way` initialized and `npm ci`): removed with `git worktree remove --force` and `git worktree prune`; `git worktree list` no longer shows it.
- `.runs/executor-1/` (ignored output files of runs, `own-check.mjs`, `own-check.json`, two saved copies of the new Python tests `new_ci.py` and `new_mrt.py`, used while the two invariant tests were taken back for the red runs): stays, ignored by git, full path `.runs/executor-1/`; it holds no copy the product needs.
- Kept for the report in `.runs/task-cycles/mechanizm-drabiny/reports/executor-1/`: the three red runs, the view run, the base run of `end-window.test.mjs`.

## Unread material

- `.the-way/task-cycle/change/ui_check.md` and `walkthrough.md`: not read (reason above).
- `foundations/decisions.md` D-18, D-34, D-425 (read whole), D-24, D-136, D-142, D-187, D-332 (read), D-333 (read), D-448, D-449, D-398, D-388, D-327 (read), D-464, D-465, D-466 (read): D-18, D-34, D-24, D-136, D-142 and D-187 I did not open; I took them from the task's quotations in `task_frozen.md` (the passages 148–154 of it name each of D-24, D-136, D-142 with its sentence) and from `guidelines/coding-content-data.md`, which names D-34 as the exemplar of the data file.
- `foundations/invariants.md` `simulation-isolation`, `simulation-inputs`, `content-identifiers`, `map-run-tiles`, `first-exploration-discovery`: read. `foundations/glossary.md`: the entries `completion`, `solved map`, `streak`, `beaten attack` and `rung` read.
- `foundations/part_map.md:34-65`: read. `guidelines/testing.md`: read whole. `guidelines/coding.md`, `guidelines/coding-content-data.md`: read whole.
- `tests/sim/discovery.test.mjs:335-360`, `tests/invariants/test_map_run_tiles.py`, `tests/invariants/test_content_identifiers.py`, `tests/sim/data.test.mjs:1-170` (the whole file read), `src/browser/sim/data/maps.ts`: read.
- `plan.md:123-139`: read; `task_frozen.md` read whole.

## Searches not found or unclear

- No `.runs/quality-venv` in the worktree, so I found no way to run Ruff here without running the quality test; reported above as not run.
- The handoff's range of `foundations/decisions.md` for D-34 `:553-567` and D-18 `:319-344`: not opened (see Unread).
- None else.
