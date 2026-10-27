# Blocking findings of the slice 7 review (reports/40-credentials-review.md), in the reviewer's words

Reviewed head: 8aa2e9c1c28cf82cf41ca50af30b5c8a86de7bd1. Verdict: FAIL, 1 Important, 5 Minor, 0 out of scope. Only the Important finding below is to be fixed; the Minor findings 2-6 are not fixed in this round (they go to the review of the whole change).

#### 1. `account-attempt-limits` says the server refuses what the product admits, and its own cited test asserts the admission (new thread)

**Anchor:** `foundations/invariants.md:764`. The contradicting cited test is `tests/http.test.mjs:1084`–`1088`; the code that makes the sentence false is `src/server/account-policy.ts:152`–`154`.

**To paste:** The invariant says a login for an email address is refused when that address has five failed logins in the last 15 minutes. But a success clears the address's earlier failures (D-100: "success clears pre-lock email history"), and the lock case relies on exactly that: after four failures and one success, "failure 2 after success" is the fifth failed login within 15 minutes, and the test expects 401, not the refusal the sentence promises. The sentence needs the success condition, for example "…five failed or unsettled logins in the last 15 minutes since its last successful login…".

**Why I report it:**

- *Why it matters.* `account-attempt-limits` is new in this slice. It has Method `test` and Violated `no`. Slice 8 will cite it in the trust-boundary row of `guidelines/testing.md`, and later account work (password recovery reuses this policy, per D-114's rationale) will take it as the rule the server keeps.
- *The mechanism.* `succeed` sets `emailEntry.failures = []` (`account-policy.ts:152`–`154`). This follows D-100's binding sentence, so the code is right. The sentence the invariant states is not: it counts every failed login of the last 15 minutes, with no reset at a success.
- *Concrete values,* taken from the cited test itself (`tests/http.test.mjs:1082`–`1088`). The clock is frozen at T.
  - Four wrong logins at T (`failure 1`–`4`).
  - A correct login at T (`success clears the four`).
  - `failure 1 after success` at T.
  - `failure 2 after success` at T+1 min.

  When `failure 2 after success` is admitted, the address has 4 + 1 = 5 failed logins within 15 minutes. The sentence says it is refused before password work. The test expects, and the code gives, a verified 401. Mutation c2 (run C, `39-credentials-mutation-C.log:549`) shows this assertion is the one that pins success-clearing. So the test protects behaviour that the invariant's sentence forbids.
- *Consequence.* An agent that checks a later change against the sentence would call the correct behaviour a violation. An agent that "fixes" the code to match the sentence would break D-100, and the cited test would then fail under it.
- *Grade.* This is a foundation entry written by this change that does not say what the code does (review method, section 2, "Against the foundation"). That makes it Important, within the task. It comes from commit 31e61ef, which wrote the invariant.
- *Fix.* Reword through `the-way-record-invariant`. The email clause should count failures since the address's last successful login, for example: "…a login for an email address with five failed or unsettled logins in the last 15 minutes since its last successful login, or within 15 minutes of its fifth failure, …". The Polish meaning in `reports/39-credentials-report.md:251` repeats the same omission ("z pięcioma nieudanymi lub nierozliczonymi próbami w ciągu 15 minut") and needs the same correction for the request. The IP clause is correct as written: a success does not clear address failures, and the IP case asserts that.

