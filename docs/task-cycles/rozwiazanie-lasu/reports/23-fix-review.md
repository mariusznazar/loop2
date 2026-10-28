PASS 5cb8d0b

# Review of a fix — task `rozwiazanie-lasu`, finding I-1

- Range: `7bc8746..5cb8d0b`, one commit `5cb8d0b` ("register the streak and completion simulation
  tests with the mutation runner"); `git rev-parse HEAD` in the worktree is
  `5cb8d0b6270d990f15226b6a6f9585f0670cb7ec`, the head given.
- Method: `.the-way/task-cycle/review/SKILL.md` and `fix.md` (pinned `3aee7d9`). Read: the
  findings file `reports/21-findings-I1.md`, the fix report `reports/22-fix-report.md`, and the
  diff.
- Counts: blocking 0, Minor 0, out of scope 0.

## Findings of the findings file

**I-1 — fixed.** `stryker.config.json` `tap.testFiles` now lists `tests/sim/completion.test.mjs`
and `tests/sim/streak.test.mjs`. That is the change I recommended, and nothing else was changed.
`npm test -- tests/quality/test_mutation_test_selection.py` in the worktree at `5cb8d0b` exits 0
(`Ran 1 test … OK`). The same test exited 1 at `7bc8746` (review `20-whole-review.md`). The list
now holds 22 entries, still in alphabetical order. Before this review, my Stryker run used the same
two-file addition in a scratch copy; it ran the two files without error.

## What the fix itself could break

The diff adds two lines to one JSON file. The file still parses and holds no CR (carriage return)
characters, so its line endings stay LF. No other file changed. No new finding.

## Declined to judge

None.

## Checks run

| Check | Result |
|---|---|
| `git rev-parse HEAD`; `git log --oneline 7bc8746..5cb8d0b`; `git diff 7bc8746..5cb8d0b` | head `5cb8d0b`; one commit; `stryker.config.json` +2 |
| `npm test -- tests/quality/test_mutation_test_selection.py` in the worktree | exit 0 |
| `python -B -c` (json load: count of `tap.testFiles` and whether it is sorted) | 22 entries, sorted |
| `git show 5cb8d0b:stryker.config.json \| grep -c $'\r'` | 0 (LF) |
| Full gate `npm test` without a file | not run, as the dispatch says |

## Reaches beyond the dispatch

None.
