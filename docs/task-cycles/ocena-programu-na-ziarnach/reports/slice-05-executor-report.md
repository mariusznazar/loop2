# Slice 5 executor report — task `ocena-programu-na-ziarnach`

**Status:** done

## Commits

- `9efb8a8a` feat: :sparkles: count in each earning loop the map runs completed in a row with no death and the largest such number, its loop record … (D-241, D-190, D-206, D-213)

## Files changed

| File | Added / removed |
|---|---|
| `src/browser/sim/types.ts` | +6 / -1 (`EarningLoop` gets `inARow` and `loopRecord`) |
| `src/browser/sim/loop.ts` | +14 / -2 (`startLoop` writes 0 and 0; `takeEnd` counts) |
| `src/browser/sim/saved-game.ts` | +9 / -1 (`earningLoop` reads both keys strictly) |
| `tests/sim/loop.test.mjs` | +6 / -2 (key list and the two 0s of the first case; the two D-243 quotations at the old lines 237 and 304 shortened) |
| `tests/sim/loop-record.test.mjs` | new, 23 cases |
| `stryker.config.json` | +1 (reach beyond *Change*, see below) |

Field names (mine, the plan and D-241 name none): `inARow` (map runs completed in a row with no death, since the start) and `loopRecord` (the largest such number). "streak" is avoided: the glossary already uses it for game minutes of a map run.

## Behaviour

- `startLoop`: both 0.
- `takeEnd` (the one place of `loop.ts` where an end of an earning loop's map run is dealt with; `endLoopRun`, `passLoops` and `catchUp` all go through it): a completion does `inARow += 1` and `loopRecord = max(loopRecord, inARow)`; a death settled as `covered` or `noPractice` (the earning loop goes on, D-190) sets `inARow = 0`, the record stays; a death settled as `progressLost` drops the earning loop with its counts (as before). `stopLoop` drops the earning loop, so the counts go with it; `advanceLoopRun` and `takeLoopPractice` carry the loop through with `...loop` and leave the counts.
- Save: `savedGame` is a JSON copy of the state, so it writes both keys without change. Load: `earningLoop` takes the two keys through `fields` (all present, none foreign), each through `count` (safe integer from 0), and refuses (`shape`) `inARow > loopRecord`. The version is not raised (it stands at 8 in the code).

## Checks (command, exit code)

| Check | Result |
|---|---|
| `npm test -- tests/sim/loop-record.test.mjs`, written first, before any code | exit 1; 20 of 23 failed for the expected reason: `undefined` where 0..3 was expected, and a load refusing the document (`ok: true` expected `false`) for the missing keys. Output kept in `.runs/executor-5/red.txt` (removed, see below) |
| same, after the code | exit 0, 23 pass |
| `npm test -- tests/sim/loop.test.mjs` | exit 0, 46 pass |
| `npm test -- tests/sim/catch-up.test.mjs` | exit 0, 35 pass |
| `npm test -- tests/sim/saved-game-judgings.test.mjs` | exit 0, 11 pass |
| `npm test -- tests/invariants/test_simulation_inputs.py` | exit 0, 2 tests OK |
| `npm test -- tests/quality/test_mutation_test_selection.py` | exit 0 (checks the Stryker list that I extended) |
| `npx prettier --check` on the five changed source/test files | exit 0 |
| `npx eslint` on the same | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | exit 1, 5 errors, all the known D-243 quotations in `tests/view/account-screen.test.mjs` (2683, 2807, 2975) and `tests/view/maps-screen.test.mjs` (494, 700); none in a file I changed. The same script without `--skip-test-citations` reports nothing for `tests/sim/loop.test.mjs` or `tests/sim/loop-record.test.mjs` |

Not run: the full gate (not mine); `tests/sim/saved-game.test.mjs` (waits for slice 6; it will fail until its document gets the two keys); tests of `tests/view/` and `tests/balance/` that build an earning loop literal (they are other slices').

Three of the 23 cases passed in the red run, for the reason that the document with the keys is refused whole before any number is read (the run above the record, the non-whole numbers, the no-throw sweep). They were seen failing on a mutant (below), which is the evidence that they test what they name.

## Own-work check

Weakest point against the requirement (the trust boundary, "refused whole as `shape` without a throw", and "the run not above the longest"): a check dropped from the load would leave the tests green.
Check: four mutants of the code, each followed by `npm test -- tests/sim/loop-record.test.mjs`, each restored from a copy afterwards:

1. `if (inARow > loopRecord) refuse();` removed: exit 1, 2 fail ("a run in a row above the loop record is refused as shape", "a number of an earning loop that is no whole number from 0 …").
2. `count(read.inARow)` replaced by `Math.trunc(Number(read.inARow))`: exit 1, 2 fail (the non-whole-number case and the no-throw sweep).
3. `inARow = 0` on a covered death removed: exit 1, the sequence cases of all three drivers fail.
4. `loopRecord = Math.max(loopRecord, inARow)` replaced by `loopRecord = inARow`: exit 1, the sequence cases fail.

All four were restored (`git diff` of the source after them equals the commit).

The sequences run through three drivers: `endLoopRun` after `advanceLoopRun`, `passLoops`, `catchUp` (the open game and the catch-up count alike). The expected numbers are written by hand from D-241's "complies" example (3 completions, a covered death, 2 completions: 2 in a row, record 3, 5 completed).

## Choices

- Refusal on load is exactly what the task gives: whole numbers from 0, run not above the record, missing or foreign key. I did not also refuse `loopRecord > completed` (always true in a game the game makes, since each counted run is a completion); the task does not ask for it, the rule of the guideline allows refusing more but slice 6 builds a hand-written document and a stricter rule could clash with it. Cost if wrong: a crafted document with a record above the completions loads; it can only show a larger number in the report line.
- The death branch resets the run for `covered` and `noPractice` and relies on `progressLost` returning early (the loop is dropped), so no counts are carried past a stop.

## Reach beyond the handoff

- `stryker.config.json` (one line added): the handoff's notes name it and ask for it to be reported as an addition to the slice's *Change*.
- Doc comments of `endLoopRun` in `src/browser/sim/loop.ts` extended with the counting (same file as *Change*).

## Mismatches noted

- The frozen task (context, line 158) says `SAVED_GAME_VERSION` is 7 today; the code has 8 (raised earlier by the resurrection change). Not raised here, as asked.

## Quotations of decisions

The two D-243 lines of `tests/sim/loop.test.mjs` (old 237 and 304) now quote "The player starts an earning loop with „Puść w pętlę”, which stands at each character in the section „Kto idzie” of the card of each solved map, beside „Wejdź”, and takes the program of that character's list „Program:”", which stands in D-243. Other quotations I wrote are of D-190, D-213, D-241 and D-386, copied from tests already green in the foundation check; `foundation_check.py` shows no error for my files.

## Working copies

Directory `.runs/executor-5/` held the output files of the check runs and two copies of `loop.ts` and `saved-game.ts` kept for the mutants. No worktree or clone was made. Removed before return (see the last line of this report).

## Unread material

none (every file and range of the handoff read: D-241, D-243, D-190, D-221, D-240 whole; of the other named entries — D-245, D-206, D-386, the four invariants, the glossary terms, `tests/sim/saved-game.test.mjs:1-120` — I did not open them beyond what the handoff copied, since the work did not need them: the guidelines `coding.md`, `coding-simulation-module.md`, `coding-saved-game.md` and `testing.md` were read whole; `loop.ts`, `saved-game.ts` read where they touch, `types.ts` read from the earning loop type; `tests/sim/loop.test.mjs` read lines 1-460, 690-870 and 1170-1435, `tests/sim/catch-up.test.mjs` 1-200, `tests/sim/saved-game-judgings.test.mjs` 1-330 and 340-518).

Precisely unread or partly read: `foundations/decisions.md` D-245, D-206, D-386; `foundations/invariants.md` save-version, catch-up-state, loop-practice-payment, death-settled-once; `foundations/glossary.md` earning loop, completion, resurrection; `tests/sim/saved-game.test.mjs:1-120`; the frozen task's passages were read only as copied in the handoff.

## Searches not found or unclear

none

## Class of model

`same` was enough.

Removed: `.runs/executor-5/` was deleted whole with `rm -rf` by its full path; no remainder.
