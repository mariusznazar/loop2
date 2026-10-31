# Slice 7 report — the browser client's two calls

**Status:** done

**Commit:** see `git log -1` on `task/reset-hasla` ("feat: :sparkles: add the browser client's password reset request and set-password calls, each a success only for 204").

**Files changed:** `src/browser/account-api.ts` (+11 / -0 net of formatting: two interface members, two client methods via `noContentRequest`), `tests/account-api.test.mjs` (+52 / -2).

**Checks (command, exit code):**
- Failing run first: `npm test -- tests/account-api.test.mjs` exit 1, with both methods stubbed as empty calls (`{}` body); failed at the assertion in "each call sends its documented method, relative path and JSON body" (`actual: {}`, `expected: { email: 'Ala@x.pl' }`).
- Passing run: `npm test -- tests/account-api.test.mjs` exit 0 (22 pass).
- `npm run typecheck` exit 0.
- `npm test -- tests/quality/test_quality_invariants.py` exit 0 (5 tests).
- Not run: `npm test` (the gate; the orchestrator's) and `foundation_check.py`.

**Tests changed (existing cases extended, none weakened):** request table (method, path, JSON body incl. distinct password and confirmation values) — invariant account-client-requests; success-only-204 table (200/201/202 give `unexpected` for both calls); 204 gives `{ok:true,value:null}`; refusal table with the server's real texts (400 invalid-email, 400 invalid-password, 400 password-mismatch, 400 invalid-link, 429 too-many-attempts) — invariant account-client-outcomes. Expected values are literals; texts copied from `src/server/account-routes.ts:137-141,126`, the 429 text from the existing case.

**Own-work check:** requirement most likely missed: only 204 counts for each new call and the body carries exactly the named fields in the right order. Checks: the status table and the body table with distinct values for password and confirmation (a swap would fail). Both pass. The red run showed the body assertion catches an empty call.

**Reaches beyond the dispatch:** `src/server/account-routes.ts` (read lines ~126-141 only, for the refusal texts used in the test table).

**Searches not found or unclear:** none. `refusalCodes` already holds invalid-email, invalid-password, password-mismatch, invalid-link, too-many-attempts, so no change there (spec Decision 1).

**Choices:** no new tests file; extended the existing tables. No server-side check of the 429 text for the new routes beyond the existing shared text (hand-copied contract, D-117).

**Problems:** none.
