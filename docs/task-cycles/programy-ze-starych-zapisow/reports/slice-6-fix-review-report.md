PASS ea8de2c29a9aef16c8e1d270f9b40d98a99b4467

# Slice 6, review of the fix of findings I1, I2, I3

Range `6a9283c43ec304ed6db495a0b56f4e24829fdc1e..ea8de2c2` (one commit, 3 files: `src/browser/sim/previous-programs.ts`, `tests/sim/previous-programs.test.mjs`, `tests/sim/program-list.test.mjs`). `git rev-parse HEAD` is `ea8de2c29a9aef16c8e1d270f9b40d98a99b4467`. I changed no tracked file; `git status --short` is empty. Counts: blocking 0, Minor 0 new, out of scope 0.

## Each finding of the findings file

**I1 (three changed files fail `prettier-source-format`): fixed.**
- Evidence: the invariant's own flags (`--check --no-config --no-editorconfig --ignore-path .gitignore`) with its own pattern list from `tests/quality/test_quality_invariants.py` (`src/browser/**` web, `src/server/**`, `scripts/**`, `tests/**`, `tests/{sim,view}/**`, `{eslint,prettier}.config.mjs`) say "All matched files use Prettier code style!", exit 0. `npm test -- tests/quality/test_quality_invariants.py` runs the same check: exit 0, 5 tests OK.
- The fix diff of the `.ts` file is the one type, `PreviousPrograms`, on one line, as Prettier writes it; no behaviour changed.

**I2 (a fault inside the program check is not tested to propagate): fixed.**
- New test `a fault inside the program check of an item propagates out of the reading` (`tests/sim/previous-programs.test.mjs`, last test of the file). The item's program is a `Proxy` whose `get` throws `TypeError`; `checkProgram` reads `value.groups` inside the `try` of `readItem`, so the error reaches the `catch`; the test asserts `TypeError`.
- My mutant, run by me in a scratch copy: `if (error instanceof ProgramCheckError) return {...}` replaced by `if (true) return {...}` (`previous-programs.ts:90`). Result: 16 pass, 1 fail, and the one that fails is the new test. Exit 1 (node's test runner).

**I3 (a wrong key among the right number of keys is not tested): fixed.**
- New test `an item with three keys of which one is not id, name or program is skipped and named`: `{ ident: 1, name, program }` and `{ id, name, programme }` are skipped and named, `{ id, name, program }` is read.
- My mutant: `keys.every((key) => ...)` replaced by `keys.some((key) => ...)` (`previous-programs.ts:40`). Result: 16 pass, 1 fail, the failing one is the new test. Exit 1.
- Both mutants were applied to a scratch copy only, rebuilt each time (`node scripts/build.mjs`, exit 0), and the original file restored (`cmp` identical).

## What the fix itself broke

Nothing found. I read `git diff -w 6a9283c4..ea8de2c2`: besides the two new tests and the one type line, every change in the test files is line-wrapping by Prettier with the same assertions and messages (no assertion dropped or weakened; the expected values are the same). The 17 tests of the reader file and the 33 of `program-list.test.mjs` pass. No new Critical or Important finding.

My Minor findings M1 to M5 are outside the fix and unchanged; they block nothing.

## Checks I ran (command, exit code)

In the worktree `the task's worktree`, head `ea8de2c2`:
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` with the six patterns of the invariant: exit 0.
- `npm test -- tests/quality/test_quality_invariants.py`: exit 0.
- `npm test -- tests/sim/previous-programs.test.mjs`: exit 0.
- `npm test -- tests/sim/program-list.test.mjs`: exit 0.
- `npm test -- tests/sim/saved-game.test.mjs`: exit 0.
- `npm test -- tests/quality/test_mutation_test_selection.py`: exit 0.
- `npm test -- tests/invariants/test_simulation_isolation.py`: exit 0.
- `npm test -- tests/invariants/test_simulation_inputs.py`: exit 0.
- `npm run typecheck`: exit 0.
- `npx eslint` on the three changed files: exit 0.
- `python -B .the-way/elements/common/foundation_check.py`: "0 errors" (I read the last line only; the command's exit code was not captured in this run; the earlier run in my first review had exit 0).

In the scratch copy `the cycle's scratch directory/fixcopy` (copy of `src`, `tests`, `scripts`, `assets`, `foundations` and the config files, with `node_modules` as a junction):
- `node scripts/build.mjs`: exit 0 each time.
- `node --test tests/sim/previous-programs.test.mjs` unmutated: 17 pass, 0 fail.
- Same with the `some` mutant: 16 pass, 1 fail (the new I3 test), exit 1.
- Same with the `if (true)` mutant: 16 pass, 1 fail (the new I2 test), exit 1.

I did not run Stryker again (the findings asked for the two named mutants).

## Reach beyond the handoff

- `.the-way/task-cycle/review/fix.md`: the variant.
- `tests/quality/test_quality_invariants.py` lines 10-22 and 63-66, to take the invariant's patterns and flags (read in the first review).
- The fix report and the findings file name were as the message gave; I read the fix report and not the findings file (see below).

## Unread material

- `reports/slice-6-findings.md`: not opened; I took the findings from my own report of the first review, which it was made from.
- `tests/sim/previous-programs.test.mjs`: read through `git diff -w` of the range and not whole again; it was read whole in the first review.

## Searches not found or unclear

None.
