# Fix report — I-1, task rozwiazanie-lasu

**Status:** done

## Finding I-1: fixed
Added `tests/sim/completion.test.mjs` and `tests/sim/streak.test.mjs` to `tap.testFiles` in
`stryker.config.json` (alphabetical positions). Files changed: `stryker.config.json` (+2 / -0).

## Commits
See `git log -1` on branch `task/rozwiazanie-lasu` ("register the streak and completion simulation tests with the mutation runner").

## Checks
- `npm test -- tests/quality/test_mutation_test_selection.py` before the fix: exit 1 (the two files missing, as the finding says).
- Same command after the fix: exit 0.
- Not run: the full gate (`npm test` without a file), per the handoff.

## Own-work check
Requirement most likely missed: the list matches every `tests/sim/*.test.mjs` except `rules.test.mjs`. The invariant's test checks exactly that; it passes.

## Reaches beyond the dispatch
None. Choices: kept the list alphabetical, as the existing entries are. No Minor findings touched.
