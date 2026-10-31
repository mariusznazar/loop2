# Slice 3 report — the account policy of a reset

**Status:** done

**Commit:** see `git log -1` on `task/reset-hasla` ("feat: :sparkles: add the password rules of a new password, the reset link's lifetime and the clearing of an address's failed logins to the account policy").

**Files:** `src/server/account-policy.ts` (+~35/-9), `tests/http.test.mjs` (+~180/-1). Both kept LF; prettier clean.

## Change
- `checkNewPassword` holds the password rules (`invalid-password`, `password-mismatch`); `checkRegistration` is built on it, same results and order (email first). New type `PasswordProblem`.
- `passwordResetLinkLifetime = 60 * minute`; comment at `confirmationLinkLifetime` follows D-155.
- `AccountPolicy.clearEmailAttempts(email)`: finds the entry by the same digest key, empties `failures`, sets `lockedUntil = 0`, keeps `reserved`, calls `forget`; no entry means nothing created; address table untouched.
- Comment "a registration or a resend" became "an account message" (only occurrence).

## Checks
- Failing run (clear stubbed as a no-op, tests written first): `npm test -- tests/http.test.mjs` exit 1, 4 new cases failed on their assertions (e.g. "the cleared address is admitted inside the old lock"). `account-attempt-limits` cases: locked address, client address, login in progress; `account-attempt-tracking`: full table.
- Passing run: `npm test -- tests/http.test.mjs` exit 0 (46 pass, 0 fail).
- Mutation (clear deletes the entry): the login-in-progress case failed ("four failures and the reservation ... are five"); restored.
- `npm run typecheck` exit 0. `npm test -- tests/quality/test_quality_invariants.py` exit 0 (5 tests).
- Not run: the product's gate (orchestrator's).

## Own-work check
Requirement most likely missed: a login in progress at the clear keeps its reservation and settles once on the same entry (Decision 9). The case holds three failures, a ticket, the clear, four more failures, shows the fifth admit refused by the reservation, then settles the ticket twice and `succeed`, expects `inFlight` 0 and a lock from its failure. It fails under delete-entry and under no-clear. A zeroed-reservation fault was reasoned, not run.

## Choices
- Tests call the policy directly with an explicit clock; no test of the `passwordResetLinkLifetime` value (a constant would only fail on a deliberate decision).
- "Clearing an unknown address adds no key" is only observable indirectly (a non-live entry would be evicted by `room`), so the case checks a full live table is neither disturbed nor filled; a created non-live entry would not be caught by behaviour. Cost if wrong: harmless leftover memory slot, evicted on need.
- Test 2 (client address) builds twenty failures from several emails to avoid email locks.

## Reaches beyond the dispatch
none

## Searches not found or unclear
none. Note: a mistaken `git checkout -p` in the shell hung and was stopped; it changed nothing, and the file was restored from the mutation by hand and verified by the passing run above.
