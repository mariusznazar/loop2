# Slice 8 executor report: the balance instrument takes its default cap from the built game

**Status:** done

**Commit:** `b1a49f87` (on `task/ocena-programu-na-ziarnach`, base `bae893e2`), message `refactor: :recycle: take the default cap of a map run ... (D-437, D-18)`. The commit author is the private address of the `mariusznazar` account, as the repository's git rule gives for this remote.

## Files changed

- `balance/engine.mjs`: +2 / -1. Adds `import { BALANCE } from "../dist/browser/sim/data/balance.js";` and sets `export const DEFAULT_CAP_MINUTES = BALANCE.judgingCapMinutes;` in place of `4000`. The opening comment stays true. `balance/trace.mjs` and `balance/campaign.mjs` are unchanged and still import the name from the engine. `campaign.mjs` already imports `BALANCE` from the same built file, so the import follows an existing way.
- `tests/balance/engine.test.mjs`: +6. Adds a test "the default cap of a map run is the judging cap the built game holds, not a number of the instrument", which asserts `DEFAULT_CAP_MINUTES === BALANCE.judgingCapMinutes`. No existing expectation changed, so the rule "Changing an existing test" does not apply.

No `stryker.config.json` change: no test file was added, only a test in an existing file.

## Checks run

Each is `npm test -- <file>` from the worktree root, exit code as shown. Logs were in a working directory, removed below; the counts are as printed.

| Command | Exit |
|---|---|
| `npm test -- tests/balance/engine.test.mjs` | 0 (new test passes; 0 fail) |
| `npm test -- tests/balance/agreement.test.mjs` | 0 |
| `npm test -- tests/balance/trace.test.mjs` | 0 |
| `npm test -- tests/balance/campaign.test.mjs` | 0 |
| `npm test -- tests/balance/cli.test.mjs` | 0 |
| `npm test -- tests/invariants/test_balance_instrument_repeatability.py` | 0 |
| `npm test -- tests/invariants/test_cross_part_imports.py` | 0 |

Not run: the full gate (by the handoff's rule), and `tests/quality/test_mutation_test_selection.py` (no new test file was added, so the handoff's condition does not hold).

## Own-work check

- **Requirement:** the instrument must not keep its own 4000 for the default cap; the value must come from the built game's data (`guidelines/coding-balance-instrument.md`, "Liczba gry" and "Jedno miejsce wspólnej rzeczy"). The weakest point: a hard-coded number could still pass the existing tests, because the game value is also 4000 today.
- **Check:** the new test, run against the real code and then against two deliberate mutations, each restored afterwards.
  1. Game value perturbed in `src/browser/sim/data/balance.ts` (4000 to 3001) with the engine reading it: `npm test -- tests/balance/engine.test.mjs` exited 0. This is expected: the engine follows the game, and the test compares with the same data. (`npm test` rebuilds `dist` first, so an edit made only to `dist` was overwritten by the build and did not count.)
  2. Hard-coded engine constant `4000` against the game value perturbed to `3001`: `npm test -- tests/balance/engine.test.mjs` exited **1**, with `✖ the default cap of a map run is the judging cap the built game holds ...` and `AssertionError [ERR_ASSERTION]: Expected values to be strictly equal`. This shows the test catches a reintroduced copy of the number.
  - Both mutations were reverted: `balance/engine.mjs` restored from a copy and checked by `git status` (only the two committed files differed before the commit, no further diff after), `src/browser/sim/data/balance.ts` restored to 4000, and `node scripts/build.mjs` rerun (exit 0), so `dist/browser/sim/data/balance.js` again reads `judgingCapMinutes: 4000`.
- **Note on the new test:** it passes before and after the change while the two values coincide; it fails only on a hard-coded copy that differs from the game. It is the test that the rule "Liczba gry" needs.

## Reaches beyond the handoff

- Read `guidelines/testing.md` lines 120–160 (the rule "Changing an existing test" and "Behaviour, not implementation") before adding the test. The rest of that file was not read.
- Read `src/browser/sim/data/balance.ts` only by grep (`judgingCapMinutes` at line 50, `export const BALANCE` at line 1).
- Grep for `judgingCapMinutes` across the worktree to find other readers: `tests/sim/judging.test.mjs`, `src/browser/sim/judging.ts`, `src/browser/sim/data/balance.ts`. Not changed.
- Grep for `DEFAULT_CAP|4000|balance.js|dist/browser` in `balance/` and `tests/balance/`, to confirm no other copy of 4000 in the instrument.

## Unread material

- `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md` passages (lines 50, 125–127, 147–149): not read by me; the handoff copied them, and I used the copy.
- `foundations/decisions.md` D-437, D-427, D-428, D-18 ranges, and `foundations/invariants.md` ranges for `instrument-game-agreement` and `balance-instrument-repeatability`: not read. The decision and invariant identifiers come from the handoff and from `guidelines/coding-balance-instrument.md`.
- `foundations/part_map.md:127-137`: not read.
- `guidelines/coding.md`: not read in full (the file exists; I used the slice's requirement and the instrument guideline).
- `guidelines/coding-balance-instrument.md`: read whole.
- `balance/trace.mjs` and `balance/campaign.mjs:1-140`: not read by me. I checked imports by grep only (`campaign.mjs:25`, `campaign.mjs:59`, `campaign.mjs:128`; `trace.mjs` imports `DEFAULT_CAP_MINUTES` per the handoff's note and the grep).
- `tests/balance/agreement.test.mjs` and `tests/balance/cli.test.mjs:100-140`: not read.
- `.the-way/task-cycle/change/SKILL.md` and `slice.md`: read whole. `walkthrough.md` and `ui_check.md` not read, not applicable (no user-visible behaviour).

## Searches not found or unclear

- `/tmp` is a directory on this machine, so I did not write there; the logs went to `.runs/executor-8/`.
- The commit hook (`rules-on-demand`) asked me to re-run the commit after showing the git rules; the rules were followed (path-based `git add`, English message, `git commit -m`), and the re-run was the same commit.
- none otherwise.

## Choices

- Import the built `balance.js` in `engine.mjs` the way `campaign.mjs` already does, rather than through a new helper. Cost if wrong: none observed.
- Added one test in the existing file instead of a new file, so no mutation-selection entry is needed.

## Working copies

- `.runs/executor-8/` (logs of the checks and mutation runs, and one copy of `balance/engine.mjs`): removed by its full path with `rm -rf`, and confirmed absent afterwards. Nothing remains.
