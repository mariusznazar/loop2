# Findings to fix — slice 2 (review `reports/review-2-report.md`, `FAIL 7fafc74325055854795e5bac9fe19f37ceb6f3fd`)

Blocking findings, in the reviewer's words. The slice review's Minor findings are not fixed here.


**I1 — No test fails when the role read of `blockForPanel` leaves the transaction.**
Place: `tests/account-owner.test.mjs:205-232` (the test "a role given or taken by a second connection just before the block …"); the code it should protect: `src/server/database.ts:879-886`.
What is wrong: the task (slice 2 goal, *Risk*) and D-137 (*Verification* and the `violates` line: "a block of the panel that reads the role in one transaction and marks the account in another") require that the transaction of the block reads the role itself. The implementation does this correctly, but the only test of the point commits the second connection's role change *before* the call and calls `blockForPanel` afterwards, in sequence. Any implementation that reads the role before `BEGIN IMMEDIATE` (a pre-read, a cached account, a role passed in) gives the same answers on this test. The window the entry names (a role given between a check and the block) is not exercised at all.
Why it matters: this is the trust-boundary behaviour the handoff asked me to check by mutation; a plausible refactor (hoisting `findAccountByEmail` out of the transaction, or reusing the account `blockAccount`'s callers already hold) would pass every test of the slice and would let a block of an account made owner in the gap go through, locking the owner out of the panel (D-137 rationale). Slice 4's route test for 409 `owner-not-blockable` "also where a second connection gave the role just before" will have the same limit unless the database level holds it.
Evidence (mutation, run in a worktree of `7fafc743`, `npm run build` then `node --test tests/account-owner.test.mjs`):
- M2 (the role read before the transaction: `const early = this.findAccountByEmail(email)` outside `this.transaction`, and `early.role === "owner"` decides the refusal) → build exit 0, tests: **6 pass, 0 fail** — the mutant survives.
- Mutations that did get caught are listed under Checks.
Fix suggestion (one way, the author may find a better one): make the test observe where the read happens — for example, in the test replace `database.findAccountByEmail` on the instance by a wrapper that records `database.connection.isTransaction` (the connection is a plain property in the built JS) at each call, and assert it was true for the call that decided the answer; or have the wrapper call a second connection's `setAccountRole` between a pre-read and the transaction is impossible to arrange without a hook, so the recording of "read inside the transaction" is the practical check. Either way the test must fail on M2.

