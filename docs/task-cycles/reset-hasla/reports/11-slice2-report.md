# Slice 2 report — task `reset-hasla`

**Status:** done

**Commit:** `0fdaffe` on `task/reset-hasla` (no push).

## Files changed
- `src/server/database.ts` (+): `StoredSession.expectedPasswordHash?`; the `saveSession` statement stores nothing when the account is blocked or, where an expectation is given, holds another hash.
- `src/server/session-store.ts` (+9): `expectPasswordHash(session, hash)` over a `WeakMap`; `set` passes it on. Stored payload unchanged.
- `src/server/account-routes.ts` (+23/-6): `establishSession`/`signIn` take the runtime and the account and name `account.passwordHash`; the login remembers the hash it verified against and, after the re-read, releases the ticket and answers `invalid-credentials` when it differs (before the block check).
- `tests/account-storage.test.mjs` (+97): three storage cases (invariants `account-session-storage`, `password-reset-ends-sessions`).
- `tests/http.test.mjs` (+87/-1): two route cases and a `resetDirectly` helper (invariant `password-reset-ends-sessions`).

## Checks (command, exit code)
- Failing run first (store had an empty `expectPasswordHash` stub): `npm test -- tests/account-storage.test.mjs` exit 1 (two new cases: "Missing expected rejection"); `npm test -- tests/http.test.mjs` exit 1 (login 200 !== 401; registration left 1 session, expected 0).
- A first failing run of the storage cases was a false one (a test mutated `cookie.expires`, which the library setter turns into an invalid cookie, so `rejects` passed for the wrong reason); fixed by assigning a new cookie object, then the failure above was seen.
- Passing run: `npm test -- tests/account-storage.test.mjs` exit 0 (59 pass); `npm test -- tests/http.test.mjs` exit 0 (41 pass); `npm run typecheck` exit 0; `npm test -- tests/quality/test_quality_invariants.py` exit 0; eslint on changed files exit 0; prettier --check exit 0.
- Not run: full `npm test` (the orchestrator's gate); `foundation_check.py`.

## Own-work check
Requirement most likely missed: the login must not sign in on a replaced password (the route comparison is what separates 401 from a 200 or 503). Check: replaced the comparison by a never-true condition; `npm test -- tests/http.test.mjs` failed on the login case (exit 1). Note: without the comparison the guard alone does not stop it, because `establishSession` names the re-read account's (new) hash; the comparison is load-bearing, as the spec says. Second mutation: dropping `expectPasswordHash` in `establishSession` failed the registration case. Both restored.

## Reaches beyond the dispatch
- `src/server/configuration.ts:20-23` (`AccountRuntime.store` type), to pass `runtime.store` into `establishSession`; `src/server/database.ts` `resetPassword`/`issueLink` (Slice 1 code) for the test helper. No other.

## Searches not found or unclear
- The handoff's labels say N3 = `D-216`, but `D-216` in `foundations/decisions.md` is "What form does a password-reset link take?". The guard of Decision 7 lives in D-112 (its Verification names it), so code comments cite D-112. The label mapping in the handoff looks off for N3; flag to the orchestrator.

## Choices
- Expectation passed as `null` binds twice in SQL (`? IS NOT NULL AND password_hash <> ?`); rejected: building two statements (more code). Cost if wrong: none seen.
- `checkedHash` taken from the first account read (`account?.passwordHash`); for an unknown address it is undefined and the route fails earlier.
- No invariant test changed; no plan/code mismatch beyond the label note.
