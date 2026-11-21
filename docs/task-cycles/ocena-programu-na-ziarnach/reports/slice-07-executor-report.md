# Executor report — slice 7, task `ocena-programu-na-ziarnach`

**Status:** done with concerns (one failing test file outside the slice, `tests/sim/saved-game.test.mjs`; see Problems).

## Commit

- `3218a620` `feat: :sparkles: make the judging of a program an act of the player ...` (one commit, on `task/ocena-programu-na-ziarnach`, base `9efb8a8a`).

## Files changed (added / removed lines)

| File | + / - |
|---|---|
| `src/browser/sim/judging-record.ts` (new) | +140 / 0 |
| `src/browser/sim/judging.ts` | +26 / -1 |
| `src/browser/sim/game.ts` | +12 / -9 |
| `src/browser/sim/programs.ts` | +32 / -6 |
| `src/browser/sim/loop.ts` | +16 / -3 |
| `tests/sim/judging-record.test.mjs` (new) | +885 / 0 |
| `stryker.config.json` | +1 / 0 — **an addition to the slice's *Change***: the new test file must be listed there (`tests/quality/test_mutation_test_selection.py`) |

## What was made

- `judging-record.ts` (imports `data/balance.js` and types only, neither `game.ts` nor `judging.ts`): `rememberedOf` (kinds and equipment; cause and minute dropped), `withRememberedJudging` (replaces the judging of a triple, nothing else), `judgingMark` (`{ solved, allSolved, stockShort, badge }`; `null` where nothing is remembered; `stockShort` where the chest holds less of any item than the judging took, so more in the chest leaves it as it is), `judgingsWithoutProgram`, `judgingsWithoutCharacter` (both prune empty levels), `judgingsAfterSave` (compares groups with their order, rules and trip plan, by `JSON.stringify`; the identity counters are no content; returns the very value when nothing differs), `judgingsAfterDeath` (erases the character's judgings for `progressLost` only).
- `judging.ts`: `judgeAndRemember(state, ids)` returns `GameResult & { judging }` (events always `[]`), the state differing from the input in `judgings` alone. It reads and passes no clock; the store counts time before it (D-409, a later slice).
- `programs.ts`: new `withProgramSaved(state, id, program)` returns the two fields `programs` and `judgings`; `editProgram` and `saveCopyIntoProgram` take them from it; `deleteProgram` removes the program's judgings. `renameProgram`, `createProgram`, `appendPrograms`, `saveCopyAsNewProgram` (new numbers, which D-165 never reuses, have no judging) and `switchProgram` change no remembered judging.
- `game.ts`: `setProgram` (no map run) takes them from `withProgramSaved`; `settleDeath` erases through `judgingsAfterDeath`; the first-chill rule that `advanceMinutes` writes into the listed program (D-123) takes them from `withProgramSaved` too.
- `loop.ts`: `takeEnd`'s `progressLost` branch erases through `judgingsAfterDeath`; `endLoopRun`, `passLoops` and `catchUp` reach it, so the catch-up too.

## Checks (command and exit code)

Failing run first (the module and `judgeAndRemember` existed as stubs returning the input, so every test reached its assertion):

- `npm test -- tests/sim/judging-record.test.mjs` — exit 1, 22 tests: 20 failed, 2 passed (the two that pass hold behaviour that already stood: a covered death, a death of a character with no practice and a bought rank erase nothing; and the refusals, which the act takes from `judgeOnSeeds`).

After the code:

| Command | Exit |
|---|---|
| `npm test -- tests/sim/judging-record.test.mjs` | 0 (22 of 22) |
| `npm test -- tests/sim/judging.test.mjs` | 0 |
| `npm test -- tests/sim/death.test.mjs` | 0 |
| `npm test -- tests/sim/loop.test.mjs` | 0 |
| `npm test -- tests/sim/catch-up.test.mjs` | 0 |
| `npm test -- tests/sim/program-list.test.mjs` | 0 |
| `npm test -- tests/sim/copy.test.mjs` | 0 |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 |
| `npm test -- tests/invariants/test_saved_program_edit.py` | 0 |
| `npm test -- tests/sim/discovery.test.mjs` (not in *Checks*; covers the chill write I touched) | 0 (see below) |
| `npm test -- tests/sim/saved-game-judgings.test.mjs` | 0 |
| `npm test -- tests/sim/purity.test.mjs` | 0 |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 |
| `npx eslint src/browser/sim/game.ts src/browser/sim/loop.ts src/browser/sim/programs.ts src/browser/sim/judging.ts src/browser/sim/judging-record.ts tests/sim/judging-record.test.mjs` | 0 |
| `npx prettier --check src/browser/sim tests/sim/judging-record.test.mjs stryker.config.json` | 0 |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1: 5 errors, all the known D-243 quotations (`tests/view/account-screen.test.mjs:2683/2807/2975`, `tests/view/maps-screen.test.mjs:494/700`); none in my files |
| `npm test -- tests/sim/saved-game.test.mjs` (not in *Checks*) | 1: 20 of 44 fail, see Problems |

`discovery.test.mjs` failed once (exit 1, 3 tests) in the middle of the work: my first version of `withProgramSaved` returned a whole state, and spreading it inside `advanceMinutes` put the stale `ruleCounts` back over the reconciled ones. I changed the function to return only `programs` and `judgings` and added `...state,` where a caller needed it; rerun exit 0. My own test file does not catch that regression on its own (it asserts on `judgings`, not on `ruleCounts`); `discovery.test.mjs` does.

The full gate was not run (handoff).

## Own-work check

- **Requirement:** the erasing is hooked into every place the simulation writes content into a listed program and into both death settlements (the slice's *Goal*; a missed place is what a reviewer looks for).
- **Check:** (1) `grep -rn "programs:" src --include=*.ts` outside `saved-game.ts` and `grep -rn "withProgramContent\|withFirstChillRule\|teamAfterDeath(" src`: the writes into the list are `newGame` (new list), `createProgram`, `appendPrograms`, `saveCopyAsNewProgram` (new numbers), `renameProgram` (name only), `deleteProgram` (hooked), `editProgram`, `saveCopyIntoProgram`, `setProgram` and the chill write in `advanceMinutes` (all through `withProgramSaved`); `withProgramContent` is now called only inside `withProgramSaved`. `teamAfterDeath` has two callers, `settleDeath` and `takeEnd`, both hooked; `progressLost` is produced only there. The view and store files only read `state.programs`. (2) Each hook has a test in `tests/sim/judging-record.test.mjs` that fails without it: I broke the `takeEnd` hook (replaced the erasing by `state.judgings`) and the file failed in the earning-loop and catch-up tests (exit 1), then restored it (exit 0 again). The other hooks were seen failing in the first red run (20 failures) before their code existed.
- **Result:** no missed place found; the one gap I found is the one in the first-chill write, handled below as a choice.

## Walkthrough

The change alters no behaviour a user sees in the running product: it adds a simulation act and pure functions no screen calls yet, and it changes what `deleteProgram`, `editProgram`, `setProgram`, `saveCopyIntoProgram`, `settleDeath` and `endLoopRun` do to a field (`judgings`) that no screen reads yet.

## Choices (with the way rejected and its cost if wrong)

1. **The first-chill rule counts as a save of content.** `advanceMinutes` writes "Zawsze → Eksploruj" into the listed program at the first chill (D-123), so the remembered judgings of that program are erased there. Rejected: leaving it out, because D-440 says a change of the rules erases them and the program judged before the chill behaves differently after it. Cost if wrong: a player loses a remembered judging of a program at the first chill of a new game (rare, one time per program). D-123 says the rule "counts neither as an unsaved change of the copy nor as a change of the program that a save of the copy announces"; that sentence concerns the copy's unsaved-changes line, not judgings, but the orchestrator may want to confirm.
2. **Identity counters are no content.** `judgingsAfterSave` compares `groups` and `tripPlan` only; `nextGroupId` and `nextRuleId` do not erase. Rejected: comparing the counters as `withCopyProgram` does, since an added and removed rule would then erase a judging of an unchanged program. Cost if wrong: none seen; a counter change with the same groups gives the same program behaviour.
3. **The content comparison is `JSON.stringify`.** Rejected: importing `sameData` from `programs.ts` (a cycle: `programs.ts` imports `judging-record.ts`) and copying it. A difference in key order only would read as a change and erase one judging, the safe side; programs pass `checkProgram` and keep one key order.
4. **`judgingMark` returns `{ solved, allSolved, stockShort, badge }`** and `null` where nothing is remembered; "all twelve" is `solved === BALANCE.judgingSeeds.length`. The later view slices consume these names.
5. **`judgeAndRemember` returns `GameResult & { judging }`** (like `LoopAdvance`), so the store can run it as any act of `GameResult` shape.
6. Pruning empty levels in the erasing functions, so an erased state equals a never-judged one.

## Reaches beyond the handoff

- `stryker.config.json` (+1 line), named in the handoff's notes as required.
- Ran `tests/sim/discovery.test.mjs`, `tests/sim/saved-game.test.mjs`, `tests/sim/saved-game-judgings.test.mjs`, `tests/sim/purity.test.mjs`, `tests/quality/test_function_and_file_size.py`, which are not in the slice's *Checks*, to cover the files I touched.
- Read `.the-way/task-cycle/change/slice.md` (named by `SKILL.md`), `.the-way/guidelines/coding-shared-module.md` (grep only, for the row question) and `a note in the author's private notes` (the commit hook asked for it).

## Does `guidelines/coding-simulation-module.md` say a new module owes a row?

It does not say so in words. Its "Files of this kind" table lists every module of `src/browser/sim/` except the content data and `saved-game.ts` (which have their own guidelines), with a status `exemplar`, `copy` or `do not copy`. `judging.ts` (slice 3) and `judging-record.ts` are in no row. The guideline is not edited; whether the two files owe rows is for the orchestrator (the guideline text implies the table is meant to be complete, so a row for each, status `copy`, is the likely answer).

## Problems as observed

- `npm test -- tests/sim/saved-game.test.mjs` exits 1 with 20 of 44 failing, the first with `{ ok: false, reason: 'shape' }` instead of a loaded state. The file has no `judgings` in it (`grep -c judgings` gives 0) and was last changed before slice 4, which made the load strict about the `judgings` key and the loop record. My slice touches neither `saved-game.ts` nor that test; the cause is a guess from that (missing key in the file's documents), **not verified on the base commit**. It may be for the slice that updates the saved-game tests.

## Working copies

Stood in `.runs/executor-7/` (logs of the runs, one-off edit scripts, a backup of `loop.ts` for the mutation, the commit message file). Removed before return with `rm -rf` on its full path; no remainder.

## Unread material

- `guidelines/testing.md`: read the sections "Choosing the level", "Where the expected value comes from", "Test inputs and expected values", "Changing an existing test", "Behaviour, not implementation", "Mutation testing" and "Test files in the gate", and the first lines of "Trust boundaries"; not read: the rest of "Trust boundaries" (lines 170-248, the list of boundary cases of the account server), "AI in tests", "Flaky tests", "Register of flaky tests", "Tests on a document imitation", the unit/integration/smoke definitions, which concern other parts.
- `foundations/decisions.md` entries D-439, D-440, D-165, D-167, D-168, D-170, D-243, D-190, D-221, D-409, D-425, the three invariants and the two glossary entries: read whole by the ranges of the handoff.
- `src/browser/sim/types.ts`: read from line 330 to the end (the part with `Judging`, `RememberedJudging`, `GameState`); not the first 330 lines. `src/browser/sim/trip.ts`: whole.
- `programs.ts` and `game.ts`: read the parts named above (the functions that write into the list, death settlement, `advanceMinutes`), not every function; `loop.ts`: read lines 1-30 and 280-420 (`takeEnd`, `endLoopRun`).
- Task passages and the slice section: read whole (copied in the handoff).

## Searches not found or unclear

- None not found. Unclear: whether the first-chill write counts as a save for D-440 (choice 1); whether the two modules owe rows in the guideline table (above).
