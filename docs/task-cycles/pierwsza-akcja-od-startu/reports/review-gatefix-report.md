PASS e6ac95cdc86bfabf2b4bb3ceb0eca187020b6427

# Review of the gate fix — task pierwsza-akcja-od-startu

Range `d925d5ca17f6ea57be36e103379bda4d50ab4493..e6ac95cdc86bfabf2b4bb3ceb0eca187020b6427` (`git rev-parse HEAD` confirmed). One commit, one file: `stryker.config.json` 1/0 (adds `"tests/sim/new-account-first-pass.test.mjs",` to `tap.testFiles`). Part `build-tools` (its entry in `foundations/part_map.md` lists `stryker.config.json`). Method: `review/SKILL.md` and `fix.md`; read and `git` only, because the full gate is running.

Blocking findings 0, Minor 0, out of scope 0.

## Judgement

- **Form and place: right.** The line has the form of its neighbours (two-space-deeper indentation, double quotes, trailing comma, the array continues after it) and stands in alphabetical order between `tests/sim/map-card.test.mjs` and `tests/sim/previous-programs.test.mjs`. A script over the file (read-only) shows the list is sorted, without duplicates, and has 39 entries.
- **Belongs there: yes.** The invariant `mutation-test-selection` (`foundations/invariants.md`, derived from D-94) says the StrykerJS configuration lists every `tests/sim/*.test.mjs` file except `rules.test.mjs`; `tests/quality/test_mutation_test_selection.py` compares the list with `tests/sim/*.test.mjs` minus `rules.test.mjs`. The new file is a `tests/sim/*.test.mjs` file and not `rules.test.mjs`. My own comparison of the set in `stryker.config.json` with the files of `tests/sim` (script, read only): equal, 39 and 39. `guidelines/testing.md` ("Test files in the gate", "Mutation testing") says the same: the config lists the `tests/sim/*.test.mjs` files except `rules.test.mjs`.
- **Anything else needed for the same file? No.** `mutate` is `src/browser/sim/**/*.ts` (source files, not tests); `ignorePatterns`, `buildCommand` and the other keys do not name test files. The gate's Node selection takes the file by the pattern `tests/sim/*.test.mjs` in `scripts/test.py` (line 17), so `test_node_test_selection.py` needs nothing. D-94 and the invariant are unchanged and still true. No other list of test files exists in the repository for the mutation tool (`grep` for the invariant's name finds only D-94 and the invariant).
- One fact for the owner of the mutation analysis, not a finding: the file is now run in each mutant's test run and takes about 1.6 s, and it needs the built `dist` like the other simulation tests; with the test green (D-404) the initial run of StrykerJS no longer stops on it.

## Checks

- `git rev-parse HEAD`, `git diff --numstat`, `git diff`, `git diff --name-only` of the range: exit 0 (one file).
- Read-only Python comparison of `tap.testFiles` with `tests/sim/*.test.mjs` minus `rules.test.mjs` (sorted, unique, equal): exit 0, result `True 39 39 True True`.
- Not run: `npm test` of any file, `npm run build`, `tests/quality/test_mutation_test_selection.py` itself, prettier (the gate is running on the tree and writes `dist/`; the author reports it passing, the comparison above is the same check); mutation analysis (forbidden).

## Unread material

- `stryker.config.json`, `tests/quality/test_mutation_test_selection.py` and the gate-fix report read whole; the entries `mutation-test-selection` and D-94 read whole (the changed line leaves them true). `guidelines/testing.md` was read whole in the review of the whole change and not re-read. The part map's `build-tools` entry read in the earlier review.

## Searches not found or unclear

- None.
