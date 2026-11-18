# Report - executor of slice 2 (the part `balance-tools`: the engine, agreeing with the game)

**Status:** done (one point for the orchestrator under *Problems*: three foundation-check lines, of which one is not named by the plan)

## Commits (branch `task/przyrzad-balansu`, base `62b73c35`)

- `0d48e760` docs: the part `balance-tools` in `foundations/part_map.md`; the pattern `tests/balance/*.test.mjs` in `scripts/test.py`
- `f6b096e1` feat: `balance/engine.mjs`, `tests/balance/agreement.test.mjs`, `tests/balance/engine.test.mjs`

## Files changed

| File | Added / removed |
|---|---|
| `balance/engine.mjs` | +354 / 0 (354 lines in all; the largest function, `runOnce`, about 50 lines of code) |
| `tests/balance/agreement.test.mjs` | +179 / 0 |
| `tests/balance/engine.test.mjs` | +154 / 0 (not in the slice's *Change*; see reaches) |
| `foundations/part_map.md` | +9 / 0 |
| `scripts/test.py` | +2 / -1 |

## What was made

- Part map: entry `balance-tools`, written by following `the-way-update-part-map` (its `SKILL.md`, the pinned `elements/part-map/skill/SKILL.md`, `decide_entry.md`, `write.md`, `template.md`, `way_of_working.md`): *Files* `balance/**`, `tests/balance/**`; *Depends on* `simulation`; *Trust boundary* `none`. No file of the part falls under another part's pattern (the foundation check reports no unclaimed or doubly claimed file).
- Engine (`balance/engine.mjs`, one file, under the 800-line limit, so not divided): static imports of the built simulation from `dist/browser/sim/`; exports `fullUnderstanding`, `buildSkills`, `prerequisitesOf`, `makeState`, `runOnce`, `quantile`, `meanOf`, `summarize`, `sweep`, `seedRange`. It copies no number of the game. `runOnce` takes the equipment through `takeTrip`, reduces the program through `programOf`, and steps with `newMapRun` and `stepMinute`.
- Where it differs from the notes' instrument because the game changed: the state of a measurement is made with `newGame`, `createCharacter` and `setProgram` and keeps the team's `resurrectionReadyAtMs` (the notes' version rebuilt the team and dropped it); the maps that open the measured map count as solved (`prerequisitesOf`, read from the data's `opensAfter`, so Las starts from a state with Skraj lasu solved); the program is the one `teamProgram` gives, as a send without a program number carries it.
- Left out of this slice on purpose: the loop, `T0`, `earnedPoints`/`freePoints`, overlays, the notes' `loadSim` (replaced by static imports; Slice 5's overlay imports the data tables itself, being the same module instances).
- `tests/balance/agreement.test.mjs`: sends 40 real moments per case through `send` and `advanceMinutes` (full Understanding, cap 4000) and the seed each send took through `runOnce`, and compares outcome, end minute, cause, practice, end backpack and loot (what the game deposits). Cases, each marked `// invariant: instrument-game-agreement`: Las with the best program and an empty chest; Las with the loop program and 8 sticks; Las - głębiej with its best program and its chest (8 sticks, 7 berries); the same with its decent program (12 sticks, 3 berries); and a fifth, Las with the patrol program, 160 practice in gathering and the bought rank of `patrol` (skills from practice and bought ranks). Preconditions: a take list of eight sticks starts the run with them and an empty chest leaves the backpack empty (literal `enteredWith`); the compared map runs of two cases end in more than one minute. The game side's state is built by hand in the test (`newKnowingGame`, `setProgram`, `createCharacter`, literal skills), not through the engine's `makeState`. Programs come from `tests/sim/reference-programs.mjs`.
- `tests/balance/engine.test.mjs` (extra): the state of a measurement (one character, full Understanding, the chest, and the game can `send` each of the three maps from it), `buildSkills` refusing an unknown skill or branch, a map absent from the data refused, a cap, `summarize` on hand-made results with expectations worked out by hand (including the empty list), and `sweep` equal to `runOnce` per seed.

## Checks

| Check | Command | Exit |
|---|---|---|
| Agreement test failing before the engine stands (stub engine returning empty results; every comparison fails on an assertion, 5 of 6 cases fail, the precondition passes) | `npm test -- tests/balance/agreement.test.mjs` | 1 |
| The same after the engine | `npm test -- tests/balance/agreement.test.mjs` | 0 (6 of 6) |
| Engine tests | `npm test -- tests/balance/engine.test.mjs` | 0 (7 of 7) |
| Selection of Node tests | `npm test -- tests/quality/test_node_test_selection.py` | 0 |
| Imports within the part map | `npm test -- tests/invariants/test_cross_part_imports.py` | 0 |
| Private paths and names | `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` | 0 |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1, three lines, see *Problems* |
| Foundation check, citations on | `python -B .the-way/elements/common/foundation_check.py` | 1, the same three lines and no line about `instrument-game-agreement` (its citing test is found) |
| Prettier | `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore balance tests/balance` | 0 (the engine failed once, was formatted with `--write`, then passed) |
| ESLint, beyond the slice's checks | `node node_modules/eslint/bin/eslint.js --max-warnings 0 tests/balance balance`; and a copy of `balance/engine.mjs` placed for a moment under `tests/balance/` (removed) | 0, 0 |
| Size rules | `node tests/quality/eslint-size-rules.mjs`, naming nothing of `tests/balance`; `balance/` is not reached until Slice 3, so by hand: file 354 lines, `runOnce` about 50 lines of code, every function far under 200 | none of the part reported |

The full gate (`npm test` with no argument) was not run, as the handoff says.

## Own-work check

Requirement most likely not met: the instrument agrees with the game also where the equipment comes from the chest and the skills from ranks (To do 6). Check: mutations of the engine, each run against the agreement test, each restored (diff against a copy shows identical).

- The chest ignored (`chest: { pieces: {} }` in `makeState`): the three cases with a chest (loop program, głębiej best, głębiej decent) fail, the empty-chest and skills cases pass. 3 of 6 fail.
- The loot computed as a marked run (`solvedMapRun: true`): 5 of 6 fail (every case that ends solved).
- The rank not set in `buildSkills`: the skills case fails.

Each was seen failing and then the engine restored; the committed engine is the unmutated one.

## Choices (way rejected, cost if wrong)

- The engine imports the data and functions by static path from `dist/browser/sim/`, not through a loader that takes a directory like the notes'. Rejected: the directory-taking loader (a second way to point at the build, and Slice 5's overlay must mutate the same module instances the game uses, which static imports give). Cost: a second loader to add if one wants to measure another build.
- `makeState` ends with `setProgram` rather than setting `programs[0]`; `runOnce` reads the program with `teamProgram`. Rejected: the notes' direct write. Cost: none seen, both give the same program.
- `prerequisitesOf` in the engine (exported) gives the solved maps; `runOnce` has no `solvedMaps` option. Rejected: an option that could name the measured map itself as solved, which would make the game take from nowhere and deposit nothing - not the map run the instrument models. Cost: Slice 6's loop composes `[...prerequisitesOf(mapId), mapId]` itself.
- Agreement is compared on the end backpack and the loot as well as the four fields the invariant names, since those carry the chest's effect. Cost: a change of the game that moves only the backpack fails the test, which is a real disagreement for a map run with a take list.
- The compared moments are `FIRST_REAL_MS + index * 104729`, 40 per case (the notes used 100). Rejected: 100 per case - 4 times the work for the same coverage of the paths; the five cases run in about 0.6 s together. Cost: a rare disagreement on a seed not among the 200 could go unseen.

## Reaches beyond the handoff

- `tests/balance/engine.test.mjs`, a file not named in the slice's *Change*: the engine's state-making, summary and sweep would otherwise stand without a test (the agreement test covers only `runOnce`). Pattern `tests/balance/**` is the part's already. Slice 3 sees one more file in `tests/balance/`.
- Read, beyond the handoff's list, `.the-way/task-cycle/change/slice.md` (named by the method) and `tests/quality/eslint-size-rules.mjs`, `eslint.config.mjs`, `.gitattributes`, `tests/quality/test_node_test_selection.py` (to see what reaches `balance/` and `tests/balance/` before Slice 3).

## Problems observed

- The foundation check (`--skip-test-citations`) reports three lines, all of one cause - the changed D-32 and the reworded `eslint-source-rules` and `prettier-source-format`, which Slice 3 cites in `tests/quality/test_quality_invariants.py`:
  - `tests/quality/test_quality_invariants.py:78: the quotation stands in no binding sentence of D-32` - **not named** by the plan's *Foundation entries* paragraph (it names the two invariants and the D-378 lines but not this quotation of D-32); it is the same cause (D-32's sentence gained the part) and in Slice 3's file, so I left it and name it here.
  - `foundations/invariants.md:408` and `:438` - the two reworded invariants, named by the plan for Slice 3.
  No other line, in particular none about `balance-tools` in a *Scope* or *Part*, and none about D-378.
- An observation, not a defect of this slice: `build-tools` holds `package.json` and `scripts/test.py`; Slice 8 adds an npm script that runs `balance/cli.mjs`, and this slice adds a path of `tests/balance/` to the runner's list. The part map's *Depends on* of `build-tools` is `browser-view · simulation · account-server · product-foundation`, without `balance-tools`. By the template a dependency is any reach, not only an import, so Slice 8 (or the orchestrator now) may need to decide whether `build-tools` depends on `balance-tools`; `cross-part-imports` passes since it reads imports only. I did not change *Depends on* of `build-tools` (it is not in my slice, and the template forbids rewriting it to fit the code without the human).
- `scripts/test.py` has the new pattern; a `tests/balance/*.test.mjs` with no file would make Node report an unmatched glob only on a platform that does not expand it itself; two files stand there now.

## Unread material

- `.runs/task-cycles/przyrzad-balansu/task-frozen.md`: read whole. The plan: read the slice's section, rows and *Choices*; I read the plan's other slices (4-10) in part, to see what Slices 5-8 need of the engine.
- `foundations/decisions.md` entries D-22, D-351, D-362, D-266, D-18, D-81 to D-85, D-136 and `foundations/invariants.md` entries map-run-repeatability, simulation-randomness, cross-part-imports, tracked-file-private-paths, tracked-file-private-names, node-test-selection: **not opened by range**. I read D-378, D-425, D-427, D-428, D-429 and the invariant `instrument-game-agreement` whole; the others stood in the task's *Decisions in play* by their binding sentences, which I read there, and in `guidelines/testing.md`. The cross-part and private-path behaviour was shown by running their tests (exit 0), and the repeatability of the seed by the agreement test. Named here as read in part.
- `foundations/glossary.md`: read the term `overlay` only (searched `depend`, found no entry).
- `guidelines/coding.md`: read whole (the persisted output was truncated by the harness; I then read lines 25 to the end, and the head of the file in the first output). `guidelines/testing.md`: read lines 1-250 and 248-437 whole, by ranges.
- `src/browser/sim/run.ts`: read lines 330-480 and 650-781; not lines 1-330 or 480-650. `src/browser/sim/trip.ts`, `run-record.ts`, `game.ts`, `tests/sim/understanding-fixture.mjs`: read whole.
- Outside the repository: the notes' `przyrzad/silnik.mjs`, `przyrzad/sprawdzenie_zgodnosci.mjs`, `README.md` read whole; `przyrzad/programy.mjs` first 60 lines only (not needed here). No note, folder or file of the notes, nor the old game's repository, is named in any file of the commit (a search of `balance/`, `tests/balance/` and the part map found none; `tests/agent_workflow/test_tracked_file_private_paths.py` passes).

## Searches not found or unclear

- A game function that builds a full Understanding: searched `src/browser/sim/understanding.ts` exports and `game.ts`; none, only `newUnderstanding` (the minimal one) - so the engine builds it from the data, like the test fixture.
- In the plan, Slice 3's *Foundation entries* paragraph does not name the D-32 quotation line (see *Problems*); unclear whether it is expected.

## Working copies

`.runs/executor-2/` (the red and green outputs of the tests, a backup of the engine used for the mutation check, the outputs of the Python checks) stood in the worktree root; removed with this report written. Nothing else was made outside the tracked files.
