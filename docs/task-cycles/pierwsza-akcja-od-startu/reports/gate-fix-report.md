# Gate-fix report — pierwsza-akcja-od-startu

Commit: see `git log -1` on `task/pierwsza-akcja-od-startu` (message: "test: :white_check_mark: list the test of the first pass of a new account in the mutation test selection"), on top of `d925d5ca`. One file, `stryker.config.json`, one line added.

Status: done. Fix: `tests/sim/new-account-first-pass.test.mjs` added to `tap.testFiles`, in the alphabetical place after `tests/sim/map-card.test.mjs`, in the file's form. `tests/quality/test_mutation_test_selection.py` expects exactly the files `tests/sim/*.test.mjs` except `rules.test.mjs`; with the line added the sets are equal.

Checks (mine, not the gate):
- `npm test tests/quality/test_mutation_test_selection.py` exit 0 (1 test OK).
- `npx prettier --check stryker.config.json` exit 0.
- `python -B .the-way/elements/common/foundation_check.py` exit 0, "0 errors".
- Not run: the full gate, mutation analysis.

Unread material: the passage of `guidelines/testing.md` on the mutation test selection was read earlier (section "Test files in the gate" and "Mutation testing"); `tests/quality/test_mutation_test_selection.py` was read whole now. Nothing else named was left unread.

Searches not found or unclear: none. The same test checks only `tests/sim`; I looked for another list that must name the new file (`tests/quality/test_node_test_selection.py` takes it by the pattern `tests/sim/*.test.mjs` in `scripts/test.py`) and found none to change.

Own-work check: the requirement most likely not met was that the list equals the directory exactly; the test above checks that and passes.
