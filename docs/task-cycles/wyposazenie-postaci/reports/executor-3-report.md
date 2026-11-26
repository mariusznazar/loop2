**Status:** done with concerns

# Executor-3 report: Slice 3, the gear at the start and the end of each map run

## Commits

- `ad07d536` feat: :sparkles: the gear at the start and the end of each map run (…)

Range from the slice base `ad81cec4`: one commit.

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `src/browser/sim/gear.ts` | 61 | 4 |
| `src/browser/sim/game.ts` | 45 | 19 |
| `src/browser/sim/loop.ts` | 39 | 11 |
| `src/browser/sim/judging.ts` | 4 | 1 |
| `stryker.config.json` | 1 | 0 |
| `tests/sim/gear-transfer.test.mjs` (new) | 536 | 0 |

No file outside the slice's *Change* was changed.

## What the slice does

- `gear.ts` has two new functions:
  - `teamAtRunEnd(team, characterId, runGear, taken)` merges the gear slot by slot. A slot the player changed keeps the player's choice, and the piece the map run left there goes to the chest while the chest has room; otherwise the piece is lost. Any other slot takes what the map run left. Where `taken` is set, the map run's gear is lost: a changed slot keeps the player's choice and every other slot is emptied. The changed slots are cleared. Where nothing changes, the function returns the very team it got.
  - `teamAtRunStop(state)` gives the manual map run's gear back at „Zakończ” and „Restart”, but only before a completion or a death.
- `game.ts` grows only by calls to those two functions:
  - The completion in `advanceMinutes` gives the gear back in the same minute, after the deposit. This happens for every completion, whether or not it pays practice.
  - `end` and `restart` call `teamAtRunStop`. `restart` starts the new map run from the character's gear.
  - `teamAfterDeath` takes a fifth parameter, `runGear`, and decides whether the death takes the gear by the uses left at `nowMs`. It now reads the uses before the no-practice check, so a character with no practice loses its gear when no use is left. The death that spends the last use keeps the gear. `settleDeath` passes it the run's gear.
  - Counted lines of `game.ts`: 742 before, 760 after (the limit of D-425 is 800).
- `loop.ts`:
  - `beginRun` passes `character.gear` to the map run it starts.
  - `startLoop` clears the character's changed slots.
  - In `takeEnd`, the completion deposits the loot first and then merges the gear. A death merges the gear through `teamAfterDeath`, and `chest` is re-read from the settled team. The next map run starts from the character the end produced.
  - `stopLoop` merges the gear in the same way.
  - The open game (`passLoops`) and the catch-up both go through `takeEnd`.
- `judging.ts`: each of the twelve runs starts with `character.gear`.

## Checks

Tests written first, failing run (before any code), with `npm test -- tests/sim/gear-transfer.test.mjs`: exit 1, 13 of 14 tests failing. Every failure was an `AssertionError` on the expected value, none a missing function. The judging test passed before the code; it asserts only that nothing is taken.

Invariant tests, each seen failing once on a deliberate break and then restored, run with `npm test -- tests/sim/gear-transfer.test.mjs`:
- `catch-up-state`. The break was a catch-up that clears the character's changed slots before each end. The run exited 1, and only „the catch-up gives the same character and chest as the open game through ends that merge the gear” failed, at „a completion: chest”. The code was restored; a grep found no trace of the break.
- `death-settled-once`. The break was `settleDeath` without its guard `|| run.deathSettlement`. The run exited 1, and only „a death of a manual map run gives the gear back …” failed, at „practice, a use left: once”. The code was restored; a grep shows the guard in place.

The slice's *Checks*, after the code:

| Command | Exit |
|---|---|
| `npm test -- tests/sim/gear-transfer.test.mjs` | 0 (14 of 14) |
| `npm test -- tests/sim/death.test.mjs` | 0 |
| `npm test -- tests/sim/loop.test.mjs` | 0 |
| `npm test -- tests/sim/catch-up.test.mjs` | 0 |
| `npm test -- tests/sim/completion.test.mjs` | 0 |
| `npm test -- tests/sim/judging.test.mjs` | 0 |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 |
| `npm run typecheck` | 0 |

Further checks on the code this slice touched:

| Command | Exit |
|---|---|
| `npm test -- tests/sim/team.test.mjs` (calls `teamAfterDeath`) | 0 |
| `npm test -- tests/sim/gear-acts.test.mjs` | 0 |
| `npm test -- tests/sim/gear-state.test.mjs` | 0 |
| `npx eslint` on the four changed sources and the new test | 0 |
| `npx prettier --check` on the changed files | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 1 |

The foundation check reported 13 errors, all of the known kind: quotations of D-144, D-145, D-445 and D-446 in `combat`, `encounters`, `rule-signs`, `skills` and `character-screen` tests. None of them is in a file of this slice, so this slice adds none. The handoff expected 14; I did not look into the difference of one.

Not run: the full suite (`npm test` with no file), as the handoff gives. Stryker is not run here either: the testing guidelines leave it to the reviewer for the simulation part, so I also skipped the mutation-in-head step for that part.

Tests that fail on the slice's base: none of the checks failed after the change, so nothing was run on the base.

## Own-work check

- Requirement I judged most likely unmet: a death decides the gear by the uses left at the moment of its settlement. In the catch-up, a character later on the list therefore finds the last use already spent by an earlier one, and its death takes the gear even though it spends no use itself (D-190, D-240).
- Check: a probe, `node .runs/executor-3/probe-last-use.mjs`, kept as `docs/task-cycles/wyposazenie-postaci/reports/executor-3-probe-last-use.mjs`. Its relative imports assume it stands in a directory two levels below the repository root, as `.runs/executor-3/` did. In the probe, Ala (with practice) and Ola (no practice) both hold a stick and die in the first minute of a catch-up with one use left.
- Result: `uses spent 3 Ala hand stick Ola hand null Ola loop true`, exit 0. Ala, earlier on the list, spent the last use and kept the stick. Ola found no use left and lost the stick, and her earning loop went on, as a death with no practice gives.

## Walkthrough

The change alters no behaviour a user sees in the running product today. No simulation path changes a map run's gear yet (the refill and „Załóż” come in Slice 4), and no screen lets the player put gear on yet. So the gear handed back always equals the gear the map run started with, and every character's gear is empty for a player.

## Reaches beyond the dispatch

- `tests/sim/gear-acts.test.mjs`, `catch-up.test.mjs`, `loop.test.mjs`, `completion.test.mjs` and `trip.test.mjs`, read in part for their helpers and the way they set a map's caps in a test.
- `src/browser/sim/character.ts`, `data/gear.ts`, `run.ts:370-459` and the gear lines of `saved-game.ts` (a grep), to learn the gear's shape and what the load refuses. The load refuses changed slots at a character with no earning loop, so every end that drops a loop must clear them.
- `tests/quality/eslint-size-rules.mjs`, read in part to measure `game.ts` against D-425.

## Working copies

- `.runs/executor-3/` under the worktree held a probe of ESLint sizes, the probe above, two copies of a source file kept for restoring after the breaks, and the output of each test run. It is removed.
- The last-use probe is kept beside this report, as `executor-3-probe-last-use.mjs`.

## Unread material

- `foundations/decisions.md` D-461 and later entries of the section "Gear of a character": I read the section in one range and its last part was cut. D-461's text is unread past its *Verification* head, and D-462 and D-463 are unread. None of them is named in my *Read*.
- `foundations/decisions.md` D-452: its range in the handoff's table, 12713-12726, was read whole.
- Everything else the dispatch names was read whole, in the current ranges the handoff gives.

## Searches not found or unclear

- A map whose data set an exit cap. None does. The test sets `MAPS.forest.carryOut = 0` for the length of one case and restores it in `finally`, as `trip.test.mjs` does.
- The order in which the merge's pieces and the loot share the chest's last room. D-460 does not settle it; see my choices below.
- The difference between the 14 foundation-check errors the handoff gives and the 13 I see. Not explored.

## Choices, with the way rejected and the cost if wrong

1. **In the chest, the loot goes first and the merge's pieces after it, in the order of the data's slots.** Rejected: the merge's pieces first. Loot first leaves the deposit of `trip-transfer` as it was. If the other order was wanted, the cost is a swap of two lines in `takeEnd`; the tests assert only the total in the chest, never which piece got in.
2. **`teamAfterDeath` takes `runGear` as a fifth parameter whose default is the character's own gear.** Rejected: a required parameter. That would have needed changes to `tests/sim/team.test.mjs` and `tests/sim/loop.test.mjs`, which call the function with four arguments and lie outside my *Change*. With the default, a caller that forgets the parameter hands back the character's own gear, so the gear a map run left would be lost there with no error. Both callers in `src` pass the parameter, and TypeScript does not flag a missing one.
3. **`teamAfterDeath` now reads the uses (`usesAt`) before the no-practice check.** Before, a no-practice death never read them. A `nowMs` whose clock moment overflows the safe integers now throws a `RangeError` for a no-practice death too. I did not test that edge.
4. **„Zakończ” and „Restart” give the gear back only while the map run has not ended.** After a completion the gear was given already. After a death, giving it again would bring back gear the death took. The manual death test checks „Zakończ” and „Restart” after each kind of death.
5. **`stopLoop` merges the map run's gear without looking at a death.** By D-241 a stop never meets an ended map run, so the case with a death is not handled.

## Concerns

- The judging's runs now start with the character's gear, but no behaviour of a run reads the gear before Slice 4. The test can therefore show only that the judging takes nothing from the gear or the chest. That each of the twelve runs starts with the gear has no test yet.
- The test „the catch-up gives the same character and chest …” asserts the gear the catch-up leaves only where the outcome follows from the case's setup. Its two death rows span 2 minutes; the completion and covered-death rows span 300 minutes and compare the open game with the catch-up.
