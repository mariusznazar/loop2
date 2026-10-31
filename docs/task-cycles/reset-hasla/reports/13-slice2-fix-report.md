# Slice 2 fix report — task `reset-hasla`

**Status:** done. **Commit:** `08df410` (on top of `0fdaffe`). No push.

## Finding 1 — fixed
`src/server/account-routes.ts`: `establishSession(runtime, request, accountId, passwordHash)` and `signIn(runtime, request, response, account, passwordHash)` take the hash to name. The login passes `checkedHash` (the hash its password was checked against); the registration passes `account.passwordHash` (the hash it made). The comment on `establishSession` now says the caller names the hash. 14 lines added, 8 removed, one file.

## Checks (command, exit code)
- `npm test -- tests/http.test.mjs` exit 0; `npm test -- tests/account-storage.test.mjs` exit 0; `npm run typecheck` exit 0; `npm test -- tests/quality/test_quality_invariants.py` exit 0; eslint on `src/server` exit 0; prettier --check exit 0.
- Not run: full `npm test`, `foundation_check.py`.

## Own-work check (finding's M2, by hand)
Comparison disabled (`if (account.passwordHash === "")`), login naming `checkedHash`: `npm test -- tests/http.test.mjs` exit 1; the case "a password replaced while the old password is checked…" failed with "Session cannot be replaced" (the guard refused the store; the route answers the 503 for it), at "replaced meanwhile": `503 !== 401`, as spec and D-100 describe. So the guard now stands alone, as the spec says. Restored; the passing run above is after the restore.

## Observation
`checkedHash` is `string | undefined`; it is narrowed to `string` at the login's `signIn` call only by the comparison `account.passwordHash !== checkedHash` (the build failed with the comparison disabled until a `!` was added for the mutation). Harmless, but the comparison is thus also what satisfies the type checker; a removal of it needs a decision on that argument.

## Reaches
none beyond the findings file and `fix.md`.

## Searches not found or unclear
none
