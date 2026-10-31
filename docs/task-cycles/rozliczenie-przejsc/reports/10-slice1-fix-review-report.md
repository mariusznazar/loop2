PASS de432c6

# Review of the fix of Slice 1, task `rozliczenie-przejsc`

Fix range `16f8bee..de432c6`, one commit, one file. `git rev-parse HEAD` is
`de432c6dae709849674c3447c09f839d82e633ca`, the head given. Process pin: gitlink and `.the-way` HEAD
both `a8dfe8a`. Bounded by `reports/09-slice1-fix-findings.md`, as
`.the-way/task-cycle/review/fix.md` gives.

Counts: 0 blocking, 1 Minor, 0 out of scope.

## Findings of the findings file

### F1. Raising the version leaves ten cases of the page's test file red — **fixed**

The defect no longer exists on `de432c6`:

- `tests/view/account-screen.test.mjs:1059` holds `VERSION = 2`; `:1637` and `:1763` give 3 as the
  foreign version. No other literal version stands in the file.
- `node --test tests/view/account-screen.test.mjs`: exit 0, 35 pass, 0 fail, against 25 pass and
  10 fail on `16f8bee`.
- The two foreign-version cases still do their work: with the load made to admit version 3 as well,
  both fail, „a refused save starts a new game…” and „a conflict drops the game…”, and nothing else.
- The file's expectations changed by their requirement, To do 21: the comment at `:1058` and the
  commit say so; the author does not contest the finding.
- The own-work part of F1: the fix report searches the tests for the save functions and says this
  file alone held a copy of the version. All of `tests/sim` and `tests/view` passing on the head
  agrees with that for those files.

## What the fix itself broke

Nothing. The diff is four lines of one test file, no source and no foundation entry.

## Minor

### M1. The comment at the version carries the task's history and runs long

- **Place:** `tests/view/account-screen.test.mjs:1058`.
- **What is wrong:** „2 since To do 21 of rozliczenie-przejsc” says where the number came from, and
  the next raise makes it false unless someone rewrites it. The line is 131 characters, beside the
  file's comments of about 100.
- **Why Minor:** no behaviour; Prettier and ESLint pass. A reader loses nothing today.

Earlier Minor and out-of-scope findings (M1–M3, O1 of `reports/08-slice1-review-report.md`) lie
outside the findings file, so they are not judged again here.

## Declined to judge

None.

## Checks

The scratch worktree was a detached worktree of `de432c6` with its dependencies linked; it is removed,
and the reviewed worktree stayed clean.

| Command | Where | Exit | Result |
|---|---|---|---|
| `npm run build` | scratch | 0 | |
| `node --test tests/view/account-screen.test.mjs` | scratch | 0 | 35 pass, 0 fail |
| `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` | scratch | 0 | 750 pass, 0 fail |
| `node node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig --ignore-path .gitignore --check tests/view/account-screen.test.mjs` | scratch | 0 | |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 tests/view/account-screen.test.mjs` | scratch | 0 | |
| hand mutant, `loadSavedGame` also admitting version 3; `node --test tests/view/account-screen.test.mjs` | scratch | 1 | 33 pass, 2 fail, the two foreign-version cases |
| `python -B .the-way/elements/common/foundation_check.py` | reviewed worktree | 0 | 0 errors |
| `git log --format='%h %ae %s' 16f8bee..de432c6` | reviewed worktree | 0 | address `mariusznn@gmail.com` |

Not run:

- The product's gate, `npm test` with no file argument: the orchestrator's.
- So `tests/*.test.mjs` at the top of `tests/`, the Python tests and the quality checks did not run on
  this head; the five Python invariant checks of the first review ran on `16f8bee`, and the fix touches
  none of what they read.

## Reaches beyond the dispatch

None beyond the files of the range and the method's `.the-way/task-cycle/review/fix.md`.

## Searches not found or unclear

none
