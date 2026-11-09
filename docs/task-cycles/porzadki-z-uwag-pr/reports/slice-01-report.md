# Slice 1 report - the three flaky tests pass whatever the clock and the computer's speed

- **Status:** done with concerns
- **Worktree:** `the root of the repository`, branch `task/porzadki-z-uwag-pr`
- **Range:** `0277f8a` (head at start) to `048b4b8`
- **Commit:** `048b4b8` test: :white_check_mark: keep the three flaky cases exact whatever the clock and the computer's speed

## Files changed

| File | Added | Removed |
|---|---|---|
| `tests/account-storage.test.mjs` | 6 | 0 |
| `tests/http.test.mjs` | 46 | 6 |
| `tests/startup.test.mjs` | 3 | 1 |

No product file changed in the commit. Temporary changes to product and library files were made for forced runs and reverted (see below); `git status` is clean after the commit.

## What changed

1. **account-storage (To do 1).** The two loops of corrupted or unusable cookies (`:1819`–`:1846` and `:1885`–`:1910`) now call `t.mock.timers.enable({ apis: ["Date"], now: 1000 })` at the start of each case. The library's `Cookie` copy reads `Date.now()` twice, so a real clock lets one millisecond move the expiry to 5001. With the clock frozen the expectation of 5000 is exact. The guard is kept: the case still fails when the database expiry does not replace the JSON expiry (mutant below).
2. **startup (To do 2).** The occupied-port case's `spawnSync` timeout goes from 5000 to 20000 ms, with a comment. It stays a bound: a hung start still fails the case at about 20 s (run below). `refusedStart` keeps 5000 ms, as the plan's Choices say.
3. **http (To do 3).** The three cases that waited on `f.policy.inFlight === 1` now act at a moment they observe:
   - The fixture's database proxy gained a hook `afterFind`, run once `findAccountByEmail` has returned and before the password check is answered. A new helper `nextAccountRead(f, label)` resolves on it, with the same 5 s bound as `waitFor`.
   - The block case and the reset case use that hook in place of the poll, so the block or the reset lands between the account read and the check's answer.
   - The disconnect case uses the hook too. Its post-disconnect assertion `inFlight === 1` still depended on the password check outlasting the disconnect, so that check's `argon2.verify` is held by a gate until the test releases it. The gate wraps the real `argon2.verify`, is restored in `t.after`, and is released before the completion wait.

## Checks (command - exit code)

Every run was a focused file run; `npm test` without arguments was not run.

**Forced race, base (before the fix):**
- account-storage on base with a temporary 3 ms busy wait inserted in `node_modules\express-session\session\cookie.js` (setter of `maxAge`, before `Date.now()` is read): `npm test -- tests/account-storage.test.mjs` - exit 1. Failures `5003 !== 5000` and `5004 !== 5000` in the cookie cases.
- startup on base with a temporary 6 s busy wait at the top of `src/server/main.ts`: `npm test -- tests/startup.test.mjs` - exit 1; the occupied-port case fails at 5029 ms, killed by its 5 s timeout with no `EADDRINUSE` line.
- http on base with a temporary `verifyPassword` in `src/server/passwords.ts` that answers at once (no argon2): `npm test -- tests/http.test.mjs` - exit 1; the disconnect case, the block case and the reset case fail on a 5 s deadline (`5288`, `5289`, `5426` ms).

**Fix, forced race:**
- account-storage with the same busy wait, after the fix: `npm test -- tests/account-storage.test.mjs` - exit 0 (63 pass). An intermediate run with only the first loop fixed was exit 1: the second loop (`set and touch refuse unusable cookie input`) failed with `5003 !== 5000`. That is why the second loop is fixed too (see reaches).
- startup with the 6 s start, after the fix: `npm test -- tests/startup.test.mjs` - exit 1 only because the temporary 6 s delay also breaks 12 other cases (`refusedStart` and others with 5 s bounds); the occupied-port case passes at 6206 ms.
- http with the instant-answer hack, first version (`Promise.resolve`, answered in microtasks): `npm test -- tests/http.test.mjs` - exit 1. The block case reports `200 !== 403` and the reset case `200 !== 401`. Reading: the check answered in microtasks, so the block or reset landed after the route's re-read. Real argon2 answers in a later macrotask, so the hook design holds there; this hack is not a faithful forcing.
- http with the check answering in a `setImmediate` macrotask (faithful to "ends before any 5 ms poll"): `npm test -- tests/http.test.mjs` - exit 1 before the gate was added. The block and reset cases passed; the disconnect case failed on its post-disconnect assertion `0 !== 1`, which is why the gate was added. The other failures (`passwords count`, `working link`, `locked address`, `every failure`) come from the hack, which changes the password results of other cases.
- http, forced run with the gate: not run. The forcing hack bypasses `argon2.verify`, so the gate is not on its path. The gate is verified by the natural run only (below).

**Mutants (own-work check, see below):**
- account-storage with `session-store.ts` not replacing the JSON expiry with the database expiry (`src/server/session-store.ts`, the `value.cookie.expires = new Date(row.expiresAt)` line removed): `npm test -- tests/account-storage.test.mjs` - exit 1; 10 failures including `database expiry replaces older JSON expiry`. Reverted.
- http with `account-routes.ts` not re-reading the account after the check (the `findAccountById` after `verifyPassword` removed): `npm test -- tests/http.test.mjs` - exit 1; `a block committed while the password is checked...` and `a password replaced while the old password is checked...` fail. Reverted.
- startup with a hanging start (`while (true) {}` appended to `src/server/main.ts`): `npm test -- tests/startup.test.mjs` - exit 1; the occupied-port case fails at 20020 ms, so the bound works. Reverted.

**Final, natural (committed state):**
- `npm test -- tests/account-storage.test.mjs` - exit 0 (63 pass, 0 fail)
- `npm test -- tests/startup.test.mjs` - exit 0 (18 pass, 0 fail)
- `npm test -- tests/http.test.mjs` - exit 0 (73 pass, 0 fail)
- `npx prettier --check` on the three test files and `src/server/passwords.ts` - exit 0
- `npx eslint` on the three test files - exit 0

**Not run:** the product's full gate `npm test` without arguments (forbidden by the handoff); `python -B .the-way/elements/common/foundation_check.py` (not part of this slice's checks; the cycle runs it).

## Own-work check

- **Requirement most likely not met:** the frozen clock could hide the database-expiry guard, so the cookie case would pass even when the stored expiry is ignored. **Check:** the session-store mutant above. **Shown:** the guard fails (10 failures). Passing.
- **Second requirement:** the http cases must still catch the fault their comments name (acting on the account read before the check). **Check:** the re-read mutant above. **Shown:** the block and reset cases fail. Passing.
- **Third requirement:** the occupied-port case stays bounded. **Check:** hanging start mutant. **Shown:** fails at 20 s. Passing.

No test was weakened and no assertion was removed. The assertions of the three cases are unchanged; the disconnect case keeps its `inFlight === 1` assertion.

## Reaches beyond the handoff

1. **Second cookie loop in account-storage** (`:1885`–`:1910`, "set and touch refuse unusable cookie input without changing stored sessions"). It has the same race at `:1910` (`valid.cookie.expires.getTime() === 5000` after a load). The handoff names only the first loop. I fixed the second too, with the same one-line mock, because it fails under the same forced race. Cost if wrong: one more case stays flaky in the same file; reverting is a one-line change per loop.
2. **New hook `afterFind` and helper `nextAccountRead` in `tests/http.test.mjs`.** The fixture's proxy had no hook after the account read. Cost if wrong: the helper is local to the file and used by three cases only.
3. **Gate on `argon2.verify` in the disconnect case.** This goes beyond the handoff's examples. Way rejected: keeping the post-disconnect assertion as it was, which depends on argon2 outlasting the disconnect detection (the forced run failed on it). The gate holds real argon2 until the test releases it; the module object is shared with `src/server/passwords.ts`, as it already is for the fault injection at the existing `argon2.hash` override. Cost if wrong: a fault in the gate fails the case loudly (it does not pass silently).

## Choices

- Frozen clock with `t.mock.timers.enable({ apis: ["Date"], now: 1000 })` rather than a fixed offset in the expectation. Way rejected: expecting `5000 + drift` or relaxing to a range, which would weaken the assertion. Cost if wrong: none found; the mock is restored by node:test at the end of each case.
- Timeout 20000 ms (not larger). Way rejected: removing the bound, against D-77 and D-84. Cost if wrong: a hung start takes 20 s to fail, not 5 s.
- Hook after the read (`afterFind`) rather than a hook before the read (`beforeFind`). The `beforeFind` hook would commit the block before the read, so the fault the case names would not be detected. Cost if wrong: none found; mutant caught.

## Adaptations of the plan to the code

- The plan's "today about `:1819`–`:1846`" matches the first loop; its assert is at `:1833` (the plan's `:1825`–`:1831` in the task is the same assert before a shift). Line numbers in the plan are approximate; the code is as described.
- Item 3 said the three cases should not depend on the check outlasting "one 5 ms poll". The disconnect case also depended on the check outlasting the disconnect detection; the gate addresses it (reach 3).

## Changed invariant tests

- `account-session-storage` test "crafted persisted payloads fail through Store callbacks before package hydration" (the frozen clock is added to its loop body; its assertions are unchanged).
- `account-session-storage` test "set and touch refuse unusable cookie input without changing stored sessions" (second loop, reach 1).
- `password-reset-ends-sessions` test "a password replaced while the old password is checked refuses that login, stores no session and clears no failure" (its comment names this invariant; the wait changed to the hook, assertions did not).
- "a block committed while the password is checked refuses that login as blocked and clears no failure" (its comment names no invariant; it guards the blocked-login behaviour of D-139; the wait changed to the hook, assertions did not).
- `account-attempt-limits` test "a disconnected login keeps its reservation until its password work completes and still counts" (the wait changed to the hook and the password work gated; assertions did not).

## Searches not found or unclear

- `guidelines/coding-*.md` kind guidelines: not read. No changed file is product code of those kinds; the three files are tests.
- `guidelines/testing.md` mentions no mocked clock or argon2 gate; the rules applied are "Czekaj na sygnał lub warunek z limitem" and "Time and randomness" (D-84), which the changes follow.
- `node_modules/express-session/session/store.js`: read; `Store.prototype.load` calls `createSession`, which constructs `new Cookie(sess.cookie)`. The race mechanism is confirmed by the forced run (5003).
- None other.

## Temporary changes, all reverted

- `node_modules/express-session/session/cookie.js` - busy wait added, then restored from a copy; restored file compared byte-for-byte (`cmp`) with the copy.
- `src/server/main.ts`, `src/server/passwords.ts`, `src/server/session-store.ts`, `src/server/account-routes.ts` - hacks and mutants, each reverted from its copy or `git checkout`; `git status` shows only the three test files before the commit.
- `tests/http.test.mjs` - the base version was put in place for one forced run; the new version was copied back from a scratchpad copy before the later runs, and the committed file is that version.
