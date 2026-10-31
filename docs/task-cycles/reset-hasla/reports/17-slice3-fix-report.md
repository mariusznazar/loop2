# Slice 3 fix report

**Status:** done

**Finding 1 (blocking): fixed.** Two cases added in `tests/http.test.mjs` (+53/-1), both `invariant: account-attempt-limits`:
- "a login in progress at a clear that is released leaves the failures made after the clear counting": ticket, clear, one failure, `release` twice, `inFlight` 0, then admissions until refusal must be 4.
- "a login in progress at a clear leaves no reservation behind once it has failed": ticket, clear, `fail`, clock +16 minutes, held tickets must be 5.
The last assertion message of the existing case now says "its failure counts after the clear: five failures lock the address" (it had claimed a lock it did not show; the lock itself is shown by the first policy case). Code unchanged.

## Own-work check
Fault applied: the clear installs a new entry with `reserved` copied. Run `npm test -- tests/http.test.mjs` exit 1; exactly the two new cases failed: release case `5 !== 4` (the failure made after the clear sat on the new entry, the release landed on the old one), reservation case `4 !== 5` (a copied reservation nothing settles). The existing case stayed green, as the review said. Restored with `git checkout -- src/server/account-policy.ts`; diff then showed only the test file.

## Checks after the fix
- `npm test -- tests/http.test.mjs`: exit 0 (48 pass, 0 fail)
- `npm run typecheck`: exit 0
- `npm test -- tests/quality/test_quality_invariants.py`: exit 0
- Full gate: not run (orchestrator's).

## Reaches beyond the dispatch
none

## Searches not found or unclear
none
