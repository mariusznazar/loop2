done with concerns

# Executor report - Slice 6 (task katalog-map): a judging reports how much health it took from the creature

Branch `task/katalog-map`, base `351845ad`. Nothing pushed.

## Commits

- `8ec02b7d` test: name an id the data lack in the case of a creature absent from the data (`tests/sim/saved-game.test.mjs`, 1 line). Cause: the case used `"bear"`, which the data hold since Slice 2; the case failed at base (see checks). Only that line changed.
- `6b3d86a8` feat: a judging gives per seed the most health its fights took from the map's creature (`src/browser/sim/types.ts`, `src/browser/sim/judging.ts`, `tests/sim/judging.test.mjs`; 133 insertions, 7 deletions across the three files).

## What changed

- `Judging` (types.ts) gets a third field `creatureDamage: number[]`, one number per seed in the order of `BALANCE.judgingSeeds`. The twelve `results`, `equipment`, `JudgingRecord` and the game state, map run and saved game are untouched.
- judging.ts: a helper `fightDamage(run)` returns `CREATURES[lastCombat.creatureId].health - lastCombat.result.creatureHealth`, or 0 when `lastCombat` or its `result` is null. `judgeOnSeeds` takes, per seed, the maximum of `fightDamage(run)` after each `stepMinute` call, in the same loop that already steps the run to its end or the cap.
- The field's name `creatureDamage` is my choice; the plan does not name it.

## Reading of one fight (the probe)

Probe: `.runs/task-cycles/katalog-map/reports/executor-6-probe-damage.mjs` (run as `node <path> forestDeepDecent` from the worktree root). Output: `.runs/task-cycles/katalog-map/reports/executor-6-probe-output.txt`. The probe builds nothing; it reads `dist/` after `npm test`.

Seed 1 of Las — głębiej (`forestDeep`) with `REFERENCE_PROGRAMS.forestDeepDecent`: the wolf attacks at minute 206 and the fight resolves at 211 (`combatMinutes` = 5). Its turns leave the wolf at 9 of 24 health and the character dies in that fight (`characterDied`, cause `combat`, the death minute 211). The fight took 24 - 9 = 15 from the wolf, which equals the sum of the character's damage over the exchanges (15). The judging line for seed 1 is `death combat 211` with `creatureDamage` 15. Seed 11 fights twice: wins the first (wolf at 0, 24 taken) and dies in the second (12 taken); its most is 24. The test that holds each case is named below.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Judging tests, before the code (red) | `npm test -- tests/sim/judging.test.mjs` | 1 | 5 new tests fail on `undefined` where a number is expected; 15 pass |
| Judging tests, after the code | `npm test -- tests/sim/judging.test.mjs` | 0 | 20 of 20 pass |
| Mutation: the last fight instead of the largest (`creatureDamage = fightDamage(run)`), restored after | `npm test -- tests/sim/judging.test.mjs` | 1 | exactly one failure, the "largest of the twelve seeds" test; code restored, cmp-checked, rerun 20/20 |
| Judging record | `npm test -- tests/sim/judging-record.test.mjs` | 0 | 16 pass |
| Encounters | `npm test -- tests/sim/encounters.test.mjs` | 0 | 29 pass |
| Saved game, at base (fix not applied) | `npm test -- tests/sim/saved-game.test.mjs` | 1 | 1 fails: "a crafted document of the current version is refused whole as shape" (the bear case) |
| Saved game, after the one-line fix | `npm test -- tests/sim/saved-game.test.mjs` | 0 | 47 pass |
| Simulation inputs | `npm test -- tests/invariants/test_simulation_inputs.py` | 0 | 2 tests OK |
| Simulation isolation | `npm test -- tests/invariants/test_simulation_isolation.py` | 0 | 5 tests OK |
| Typecheck | `npm run --silent typecheck` | 0 | clean |
| ESLint | `npx eslint --max-warnings 0 src/browser/sim/judging.ts src/browser/sim/types.ts` | 0 | clean |
| Prettier (the two source files) | `npx prettier --check src/browser/sim/judging.ts src/browser/sim/types.ts` | 0 | clean |
| Prettier (the two test files, not in the plan's checks) | `npx prettier --check tests/sim/judging.test.mjs tests/sim/saved-game.test.mjs` | 0 | clean after `prettier --write` on `judging.test.mjs`; the write changed only my new block |
| Foundation check, the allowed focused form | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1 | 14 errors, all the known ones (`maps-screen`, `account-screen`, `map-lines`, Slices 8 and 9); none from my files |
| Foundation check, full (for my citation lines) | `python -B .the-way/elements/common/foundation_check.py` | 1 | 14 errors, the same known ones; my first version had 5 citation errors (quotes not beginning a sentence of D-440), fixed by quoting the whole sentence |

The full gate (`npm test` without arguments) was not run, as asked.

## Own-work check (section 3 of make-change)

Requirement: per seed, the most health taken from the map's creature in one fight; a won fight gives its full health; a lost fight counts by the health the creature lost; a seed with no resolved fight gives 0; a fight cut off by the cap or the completion gives 0; the twelve results unchanged; the map of no creature gives 0.

Tests (all in `tests/sim/judging.test.mjs`, each with its `decision:` line quoting D-440 or D-144):
- "a judging gives the most health a fight took ... a fight the character won gives the creature's whole health": literal 24 on each seed whose last fight is won (the seeds 2, 4, 8, 9, 10, 12 of `forestDeepDecent`).
- "a fight in which the character died counts by the health the creature lost, and a seed whose fight took none gives 0": for each seed whose last fight is lost, the damage equals the sum of the character's damage in that fight's exchanges (an independent sum, not the health subtraction); a seed with no fight gives 0 (seed 3).
- "a judging gives the largest of the twelve seeds' fights": seed 11 gives 24 where its last fight took 12.
- "a fight the judging stops before its turns resolve gives 0": the cap set to the attack minute plus 2, on seed 2; the result is undecided and the damage 0.
- "a map with no creature gives 0 in every seed": `forest` with `forestBest`, twelve zeros.

Mutation: the "largest" rule replaced by the last fight fails exactly the test that names it (see checks).

Not covered: a fight cut off by the **completion** (the map solved in a minute while a fight is open). I did not find a seed or program of the three reference programs I probed that completes during a fight, and I did not construct one. The code path is the same as for the cap (`lastCombat.result` stays null, so 0), but no test holds it.

## Choices

- Field name `creatureDamage`, per seed, in the order of the seeds; the way rejected: a field on the map run (the plan's way) and a record of the fights (more state). Cost if wrong: low, one name in one type.
- The reading is the maximum of `fightDamage(run)` taken after each minute, not only at the end: a fight's result stays in `lastCombat` until the next attack, so the maximum sees a fight even when a later attack replaces it. The way rejected: reading only the last state (it misses seed 11). Cost if wrong: none seen.
- The creature is the one of `lastCombat`; the map's only attacker is `attackers[0]` (`run.ts` line 787), so this is the map's creature.

## Adaptations and notes

- The plan says `judgeOnSeeds` and `judgeAndRecord`; the record is unchanged, as the plan asks, so `judgeAndRecord` changes only by what `judgeOnSeeds` returns.
- The judging test file is run against `dist/` after the build; the new tests fail as expected before the code, no other test failed.
- Foundation wording gap, for the orchestrator: D-440 names "a seed with no fight giving 0" but no sentence says that a fight cut off by the cap or the completion gives 0. The cut-off test quotes the same D-440 sentence as the others. The task's Goal names the cut-off case; D-440 does not.

## Problems observed

- Working-copy mishap: I created `.runs/executor-6` (in the main checkout, not the worktree) by a `mkdir -p` with a wrong root, at 20:43, empty. I removed it with `rmdir` the same minute (the directory was empty). Nothing in the main checkout was changed. The worktree's own `.runs/executor-6/` was used afterwards.
- A hook of the session rejected my first `git commit` call once, to show the rules file for git; I reran the same commit, commit message and paths unchanged.

## Working copies

- `.runs/executor-6/` (probe, log files, saved copies of the two files): removed with a full-path `rm -rf`; confirmed absent.
- The probe is kept at `.runs/task-cycles/katalog-map/reports/executor-6-probe-damage.mjs`, its output at `.../reports/executor-6-probe-output.txt`.
- No worktree was made; none to remove.

## Unread material

- `.runs/task-cycles/katalog-map/task.md`: read lines 25-177 (To do 4, Q1-Q7 region, Context, Decisions in play up to D-441, D-271) and the lines the handoff names; not read: lines 1-24 and lines 178 to the end (further decisions in play and the sections after them). The handoff names none of those.
- `foundations/decisions.md`: read whole the entries the handoff names (D-71, D-141, D-144, D-146, D-439, D-440); D-438 and D-143 only by heading, not read.
- `foundations/part_map.md`: read lines 30-69 only; the simulation part's entry is in that range.
- `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/testing.md`: read whole (testing.md in three pages, 1-510).
- `src/browser/sim/judging-record.ts`: read lines 1-60 only, as the handoff names. Not read: the rest of the file (`recordOfJudging`), which does not construct `Judging`.
- `src/browser/sim/run.ts`: read lines 690-820 only, as named.
- `src/browser/sim/combat.ts`: read whole.
- `tests/sim/judging.test.mjs`: read whole before the change.
- `.ai/rules/scripts.md` (the user's rule for scripts) read, outside the dispatch.

## Searches not found or unclear

- A completion inside an open fight on a reference program or seed: searched by probing three of the reference programs of `forestDeep` (`forestDeepDecent`, `forestDeepBest`, `forestDeepNaive`); none completes; no test for that case (see own-work check).
- The creature id "dragon" absent from the data: `grep` on `src/browser/sim/data/creatures.ts` gave 0 hits.
- D-440 wording of a cut-off fight: not found (see Problems / Adaptations).
- Reach beyond the dispatch: grep of `src/browser/sim/data/maps.ts` (attackers), `src/browser/sim/data/creatures.ts` (health), `tests/sim/reference-programs.mjs` (program names), `tests/sim/saved-game.test.mjs` (the case), `tests/sim/*.mjs` (forestDeep uses), and the foundation decision headings.

## Questions

None blocking. For the orchestrator's decision: whether D-440 should name the cut-off case (the task's Goal does; the foundation does not). Whether a completion-cut-off test is wanted, and if so, a program that completes inside a fight must be found or built in a later slice.
