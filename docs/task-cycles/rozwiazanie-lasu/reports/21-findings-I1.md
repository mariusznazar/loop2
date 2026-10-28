# Findings to fix — review of the whole change `6540e4c..7bc8746` (report `20-whole-review.md`), in the reviewer's words

**I-1. The full gate fails: the mutation runner's list of simulation tests lacks the two new test
files.**

- Place: `stryker.config.json`, `tap.testFiles` (unchanged by the range), against the new files
  `tests/sim/streak.test.mjs` and `tests/sim/completion.test.mjs`.
- What is wrong: the invariant `mutation-test-selection`, checked by
  `tests/quality/test_mutation_test_selection.py`, requires `tap.testFiles` to list every
  `tests/sim/*.test.mjs` except `rules.test.mjs`. The change added two such files and did not
  register them.
- Evidence: in a separate worktree of `7bc8746`,
  `npm test -- tests/quality/test_mutation_test_selection.py` exits 1:
  `AssertionError: Items in the second set but not the first: 'tests/sim/completion.test.mjs'
  'tests/sim/streak.test.mjs'`. The gate on the base and on `c0c51a0`
  (`reports/03-pin-gate.log`) failed only the three environment checks, so this is a new failure
  that the full `npm test` before the request will show.
- Why it matters: the product's one command fails, so the request cannot be opened as passing;
  and the mutation tool, which `guidelines/testing.md` ("Mutation testing") has the reviewer run on
  changed simulation files, silently leaves out the two files that carry the streak and completion
  cases — exactly the drift the invariant exists to stop.
- Fix: add `tests/sim/completion.test.mjs` and `tests/sim/streak.test.mjs` to `tap.testFiles`
  (I did so in my scratch worktree for the Stryker run below; the test then passes).
- Comes from: spans slices 3 (`635ac25`, `tests/sim/streak.test.mjs`) and 5 (`68cfa84`,
  `tests/sim/completion.test.mjs`); the root is a gap of the plan — neither slice's *Change* lists
  `stryker.config.json` and neither slice's *Checks* runs
  `tests/quality/test_mutation_test_selection.py` (plan *Choices* row 3 chose new files in
  `tests/sim/` without the registration it implies).
