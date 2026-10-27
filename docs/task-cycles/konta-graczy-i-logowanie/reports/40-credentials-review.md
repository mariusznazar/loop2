FAIL 8aa2e9c1c28cf82cf41ca50af30b5c8a86de7bd1

# Review of planned slice 7: credential transitions and bounded admission

- Reviewed range: base `480309c953da7ff4f3a650c6ef431dad29fb62cb`, head `8aa2e9c1c28cf82cf41ca50af30b5c8a86de7bd1`. The range has five commits (31e61ef, e0d5b80, 2bc2b83, 3bd81d5, 8aa2e9c) and changes nine paths (+1547/-23). I computed this myself with `git log` and `git diff --stat` over `480309c..8aa2e9c`.
- `git rev-parse HEAD` gives the given head. The tree is clean. The process checkout and the gitlink both give `574a37b9ab9572f876298f4cc10754581222d3f0`.
- Method:
  - `.claude/skills/the-way-review-change/SKILL.md`, which delegates to `.the-way/task-cycle/review/SKILL.md`. I read it whole.
  - The user's playbook `C:/Storage/The Brain/The Brain/Notes/Areas/(A) Claude code/playbook_code_review.md`. Each finding below follows its anchor / to-paste / why shape, and each is a new thread.
- I did not read `cycle.md`.
- Counts:
  - blocking: 1 (Important);
  - Minor: 5;
  - out of scope: 0 (the Declined-to-judge lines below are out of scope by definition).

## Findings

### Important

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

### Minor

#### 2. "Settled only when its password work has completed" fits attempts that never do password work only loosely (new thread)

**Anchor:** `foundations/invariants.md:764` (closing clause); `foundations/decisions.md:1936` (D-114, second binding sentence); the paths with no password work are `src/server/account-routes.ts:234`–`235`, `:248`–`249` and `:240`–`245`.

**To paste:** An admitted registration for an address that already has an account is settled right away, with no password work at all (the duplicate pre-check). An attempt the native gate refuses for capacity never starts password work either. Both the invariant and D-114 say each admitted attempt is settled "when its password work has completed". Could the wording say "after its password work, if any, has completed", so that the duplicate pre-check does not read as a violation?

**Why I report it:**

- The rule exists so that a disconnect cannot free or erase an attempt whose native work is still running. The code keeps that rule: no route reads the connection, and every settlement follows the awaited operation.
- The duplicate pre-check (`account-routes.ts:234`) calls `ticket.release()` before any `hashPassword`. A capacity refusal releases when the gate throws, before any work starts.
- Read literally, "only when its password work has completed" has nothing to wait for on those paths. A reviewer could take the pre-check as breaking D-114, or could take the sentence as forbidding a pre-check that avoids Argon2 work.
- This is wording, not behaviour, so it is Minor. It is cheap to fold into the rewording of finding 1, which touches the same sentence.

#### 3. The race and parallel-reservation cases do not assert that their requests overlapped, so a slow runner turns them into sequential checks that still pass (new thread)

**Anchor:** `tests/http.test.mjs:818` (duplicate race), `tests/http.test.mjs:1146` (twentieth and twenty-first address attempts), `tests/http.test.mjs:1203` (fifth and sixth registrations).

**To paste:** Each of these three cases expects the same statuses whether its two requests overlapped or ran one after the other. Without overlap, the lost insert race (`account-routes.ts:248`) and the address and registration reservations are not exercised, yet the case stays green. A precondition on `policy.inFlight` — for example, waiting until both registrations are admitted in the race — would make a missed overlap a visible failure, as the disconnect case already does.

**Why I report it:**

- *What each case should exercise.*
  - The race case is the only test of the spec's named fault "concurrent duplicate normalized email" in its insert-race form. That form is `createAccount` returning null and being answered 409 at `account-routes.ts:248`.
  - The two parallel cases are the IP-level and registration-level evidence for D-100's "in-flight reservations counted before asynchronous password work".
- *Mechanism.*
  - If the first request of a pair finishes before the second is admitted, the second is refused by the settled history instead of the reservation: 20 failures, or 5 created accounts.
  - In the race, the second request is then answered by the duplicate pre-check at `account-routes.ts:234`, not by the lost insert.
  - The asserted statuses are identical in both orders: `[201, 409]`, `[401, 429]`, `[201, 429]`.
- *Example.* Take the race case on a runner where the first registration's Argon2 hash (about 160 ms, from the executor's local measurement) ends before the second request's body is parsed. The second request then takes the pre-check branch. Now suppose a later change answers a null `createAccount` with a 500. The race case still passes, and no other test reaches that branch.
- *Practice versus guarantee.* With a localhost dispatch of a few milliseconds against 120–160 ms of Argon2, overlap is near certain on an ordinary runner. The cases are right today. The gap is that they cannot report when they stop protecting what they name. That is exactly what this review was asked to check.
- *The executor's own-work section* says every timing-dependent case asserts its condition. That holds for the full-gate batches and the disconnect case, but not for these three.
- *Grade.* The regression would need both a slow runner and a fault on these paths, so this is Minor rather than Important.
- *Possible fix.*
  - Race: `await waitFor(() => f.policy.inFlight === 2, …)` before awaiting both responses. The registration pre-check runs in the same tick as admission, and the insert and its settlement run in the same tick after the hash. So `inFlight` reaching 2 proves that both requests passed the pre-check before either inserted.
  - Parallel cases: start the first request, wait for `inFlight === 1`, send the second, then assert `inFlight === 1` once it is refused. This mirrors the disconnect case.

#### 4. The registration branch of `account-attempt-tracking` is not tested (new thread)

**Anchor:** `src/server/account-policy.ts:186`; the cited test is `tests/http.test.mjs:1314`–`1360`.

**To paste:** The tracking case fills the tables only with logins, so a registration that needs a new address key in a full table is never tried. Removing the capacity check at `account-policy.ts:186` would, I believe, leave the whole suite green, although the invariant covers "an attempt that needs a new key", registrations included.

**Why I report it:**

- *What the sentence covers.* `account-attempt-tracking` (Method `test`) says that, in a full table of live entries, any attempt needing a new key is refused without eviction.
- *Two call sites.* `admitLogin` checks room at `account-policy.ts:124`–`128`. `admitRegistration` checks it separately at `:186`.
- *What the case reaches.* The cited case uses capacity 2 and only `login` after its setup registration, so only the login call site is reached.
- *The fault.* A plausible fault drops or misplaces the `:186` check, for example while refactoring registration admission. The registration's address key would then go into a full table, beyond capacity.
- *Why the harm is limited.* An admitted registration that ends in release is forgotten at once (`forget`). Growth past capacity therefore needs created accounts, and each of those pays Argon2 and the five-per-hour limit.
- *Evidence.* This is a mental mutation; I did not execute it (see "Checks").
- *Fix.* One more step in the tracking case: with both address slots live, a registration from a third address gets 429 and creates no account.

#### 5. Lone UTF-16 surrogates in a password reach Argon2 as U+FFFD, so passwords that differ only there are the same password (new thread)

**Anchor:** `src/server/account-policy.ts:29`–`32`; the hashing is `node_modules/argon2/argon2.cjs:108` and `:194` (`Buffer.from(password)`).

**To paste:** JSON can carry an unpaired surrogate such as `"\ud800"`. `acceptablePassword` counts it as one code point, but the `argon2` package encodes the string as UTF-8, which replaces every unpaired surrogate with U+FFFD. Two registrations whose passwords differ only in unpaired surrogates, or by U+FFFD in their place, therefore verify each other. Would refusing a password with `!password.isWellFormed()` as `invalid-password` (and the same check in `checkLogin`) be worth one line?

**Why I report it:**

- *What D-96 requires.* Password content is "preserved without trimming or normalization". The replacement is a silent normalization that happens after the check.
- *Example.*
  - Registration stores the hash of `"\ud800" + "a".repeat(11)`. That is 12 code points by the `[...password]` count, and it is hashed as the bytes `EF BF BD` followed by eleven `a`.
  - A login with `"\udc00" + "a".repeat(11)`, or with `"\ufffd" + "a".repeat(11)`, gives the same bytes and verifies.
- *Why the impact is low.* A browser text input cannot produce an unpaired surrogate, so normal players never meet this. A crafted client only collides with its own odd password.
- *Email.* The same encoding applies to email: `node:sqlite` binding and the SHA-256 limiter key both encode as UTF-8. That only makes two odd spellings one address, which the task's case folding already accepts in kind.
- *Evidence.* Source inspection of the installed package only; nothing was executed.
- *Fix.* `String.prototype.isWellFormed` exists in Node 24. Refusing ill-formed strings in `acceptablePassword` (and in `normalizeEmail`) keeps "the content is never changed" true.

#### 6. When a table is full of live entries, each refused newcomer costs a full-table sweep and leaves no trace, so the refusal can be repeated cheaply (new thread)

**Anchor:** `src/server/account-policy.ts:232`–`241`, called from `:125`–`126` and `:186`.

**To paste:** When a table is full of live entries, every attempt with a new key runs `live()` over all 10,000 entries and is then refused without being recorded or counted. Repeated well-formed requests with fresh addresses therefore each buy a 10,000-entry sweep on the event loop, without spending any limit or any Argon2 work. Is a cheaper "nothing can have expired yet" test (for example, the earliest expiry kept beside the table) worth it?

**Why I report it:**

- *What the bound is for.* D-101 bounds memory and refuses at capacity. The cost of the refusal itself is not settled anywhere.
- *Mechanism.*
  - `room()` walks the whole map whenever `table.size >= keyCapacity`.
  - When every entry is live, nothing is deleted and the request gets 429.
  - The refused request creates no key and consumes no reservation, so the next request repeats the full walk.
- *Example.*
  - An attacker first fills the email table: 10,000 failed logins spread over 500 or more client addresses, at about 12 minutes of gate time with two slots.
  - Each further login with a new email then costs one walk: 10,000 `live()` calls, each filtering an array of up to five entries.
  - That is roughly a millisecond, by my estimate. I measured nothing.
  - So the walk adds several times a request's own handling cost, and the attacker pays nothing beyond sending the request.
- *Grade.* This is an availability cost, not a bypass, and it needs a filled table first, so it is Minor. The data side is unmeasured: I have no measurement of the sweep time and state it only as an estimate.

## Checks against the dispatch's points (source inspection unless marked)

- *Email normalization and "coś@coś":*
  - `normalizeEmail` (`account-policy.ts:21`–`26`) trims, then lowercases, then requires exactly one `@` with nonempty sides.
  - The malformed case covers `no-at-sign`, `@x`, `x@`, `a@b@c` and blanks; `player@localhost` is accepted.
  - Matches D-97.
- *12/128 code points, unchanged whitespace and Unicode, exact confirmation:*
  - `[...password]`, with boundaries tested at 11/12/128/129 in emoji and letters, and 128 in two-byte letters.
  - Twelve spaces and a padded password with emoji are stored and verified unchanged (`argon2.verify` on the trimmed form is false).
  - A trailing space and a changed letter are mismatches.
  - Gap: finding 5.
- *Malformed and extra fields before hash or write:*
  - `stringFields` requires exactly the named own keys, each a string.
  - The malformed case runs inside a full gate, so any hash or verify attempt would give 429 instead of the asserted 400/401. The final account and session counts show no writes.
  - Sound.
- *Generic login failure through the same gate:*
  - Unknown addresses verify against `runtime.dummyHash` (`account-routes.ts:284`–`287`).
  - The identical-failure case compares the bodies with `deepEqual`.
  - The full-gate control proves that an unknown address reaches the gate (mutation b2, run B, line 543).
- *Stored Argon2id:* the hash prefix of the configured profile is checked, and so is the package's own `argon2.verify`, independently of product code.
- *Fresh session identity, durable save before 201/200, save failure:*
  - `establishSession` awaits `regenerate` and `save`; on either error it detaches through `session.destroy`. I verified the express-session behaviour this relies on:
    - `Session.destroy` deletes `req.session` (`session/session.js:109`–`112`);
    - `onHeaders` returns without a cookie when `req.session` is absent (`index.js:231`–`235`);
    - the end hook returns without a save (`index.js:337`–`340`).
  - The save-failure case uses a real SQLite trigger. It asserts no cookie, no `id`, the account kept and a later successful login.
  - The 503 wording says sign-in failed, not that the account was never made.
- *Duplicate-email races:* the code handles a null insert as 409. The test's overlap is unasserted (finding 3).
- *Limits, windows and settlement:*
  - Thresholds and windows match D-100 and the spec table.
  - The window boundary rule (`time + window > now`) and the lock rule (`lockedUntil > now`) are each tested at −1 ms and at the exact instant.
  - Every admitted ticket settles exactly once on every path:
    - the success, failure, duplicate and lost-race branches;
    - capacity refusals;
    - other thrown errors, which release and then rethrow.
  - No settlement reads the connection.
- *Disconnect:*
  - The disconnect case asserts that the attempt was admitted, that the server saw the socket close, and that the attempt was still unsettled afterwards.
  - It then asserts that the outcome still counted as the fifth failure and locked the address.
  - Mutations a3 and c1 fail it (runs A, C, D).
  - The executor's concern "refuses before password work is review-only" is weaker than stated. Moving admission after the password call would leave `inFlight` at 0 during the work, and the disconnect case's assertion "stays unsettled while its password work runs" would fail. Only "admit, then still verify a refused attempt" stays uncaught, and I accept that as review-kept.
- *Bounded maps without live eviction:* see the tracking case and finding 4. Capacity refusals are not failures (mutation e1, run D). Sweep cost: finding 6.
- *Client address against spoofed forwarding headers:*
  - Both routes key on `response.locals.accountClientAddress`.
  - Registration is tested with a mapped spelling and chosen `X-Forwarded-For`/`X-Real-IP`/`Forwarded` headers (mutation d1).
  - Login keying on `request.ip` would collapse every client in the IP case onto one address and fail "another client address is admitted".
- *Invariant status changes:*
  - `player-argon2-password-hash`: review → test, Violated cleared. The cited test checks the complete sentence. Mutation b1 fails its `argon2.verify` assertion (run B, line 472); it passes at the head.
  - `account-mutation-request-guards`: review → test, Violated cleared. All three state-changing routes face 22 shared variants plus per-field variants. Each variant's body would change state if admitted, and the controls show the bodies working once every guard is satisfied. Mutations a5 and c5 fail it (run A line 568, run C line 589).
  - Both clearings must be named in the request (WAY-51); the executor's report says so.
  - `account-attempt-limits`: finding 1 (blocking) and finding 2.
  - `account-attempt-tracking`: finding 4.
- *D-114, the kind file and the index row, against the pinned templates (first file of its kind, WAY-200):*
  - D-114 has one question heading and two binding sentences that name the path and the kind identifier in backticks. Its fields follow the template, and Verification uses the combined invariants-plus-pair form. Rationale and Rejected name no file.
  - `guidelines/coding-account-policy.md` follows the required form of a kind: header lines; When to read; Files of this kind with one exemplar row naming D-114; rules with Decision/Invariant/Good/Bad; Examples; Where in code. It follows the same form as the accepted precedent `guidelines/coding-session-store.md`.
  - The `guidelines/coding.md:23` row follows the Kinds-of-code columns.
  - D-100's and D-101's Verification lines now name the new invariants, and each new invariant names them back in Derives from.
- *Timing-dependent tests:*
  - `withFullGate` checks, after the action, that both slots stayed occupied. Since a slot can only empty once, a pass proves they were occupied throughout.
  - The disconnect case asserts its condition.
  - The three overlap cases do not (finding 3).
- *Other checks:*
  - The transport guard test evolved from the temporary 503 to the canonical 401, with no guard assertion removed.
  - The slice 6 tests are unchanged apart from `accountFixture` passing a policy.

## Declined to judge

- A distributed attacker filling a table so that newcomers are refused: the spec and D-101 accept fail-closed capacity ("a full table can refuse legitimate newcomers").
- Slice 5's guard and transport refusals carrying `{error}` without `code`. This is the executor's choice 1, and slice 9's client consumes it. Those files are outside the Change list.
- An out-of-shape login during a lock answering 401 instead of 429: the spec requires bad lengths and shapes to keep the generic login message without Argon2, and both answers are failures.
- No `Retry-After`: the spec says "may".
- No create/login rows in the permission table of `guidelines/testing.md`: the plan gives them to slice 8.
- No copy row for `account-routes.ts` in `guidelines/coding-http-application.md`: WAY-200 gives a file added after the audit no row until a refresh.
- `player-self-registration`, `player-password-login` and `email-verification-nonblocking` staying Violated `yes`: their sentences need slice 9's browser evidence.
- The target-image Argon2 measurement and the full saved-game durability promise: unchecked by instruction.
- The D-94/D-95 identifier collision with PR 31, which D-114 joins: the root's final reconciliation.

## Checks run

| # | Command or method | Exit | Result |
|---|---|---:|---|
| 1 | `git -C .the-way rev-parse HEAD && git ls-files --stage -- .the-way && git status --short && git rev-parse HEAD` (Git Bash) | 0 | Pin `574a37b…` both ways; clean; HEAD `8aa2e9c1…` |
| 2 | `git log --oneline 480309c..8aa2e9c`, `git diff --stat 480309c..8aa2e9c`, `git diff 480309c..8aa2e9c -- <each changed path>` | 0 | 5 commits, 9 paths, +1547/-23, as dispatched |
| 3 | `python -B .the-way/elements/common/foundation_check.py` (local, read-only) | 0 | `0 errors` |
| 4 | Manual: read `reports/39-credentials-final.log` (first bytes `Clo`, so UTF-8) | — | `HEAD is now at 8aa2e9c`, pin 574a37b; Node `tests 396 / pass 396 / fail 0 / skipped 0`; Python 5/65/176/32 OK, `skipped=3` |
| 5 | Manual: `grep` of `39-credentials-mutation-{A..E}.log` and `39-credentials-red2.log` for the `ℹ pass/fail` lines and AssertionError messages | — | Fail counts 6/10/7/4/1 and red 14 match the report. The named assertions are present: e.g. A `/api/accounts missing origin`, `a third email key is refused while two are live`; B `unknown address goes through the same gate`; C `failure 2 after success`, `/api/accounts unexpected field`; D `an equivalent spelling with a chosen forwarding chain`; E `one millisecond before the lock ends` |

**Not run:**

- Full `npm test` through the Linux harness. The executor's evidence was not disputed by anything I found, and the handoff forbids repeating the unchanged final gate.
- The mental mutation of finding 4 (dropping `account-policy.ts:186`), the slow-runner scenario of finding 3 and the surrogate collision of finding 5. Each would need a mutated clone and a full run that this review does not need in order to grade them. They stay unverified and are stated as source inspection.
- The three Linux-skipped Python tests, the Windows gate, and target, Cloudflare and browser checks: as the executor's report states.

## Reading reaches beyond the dispatch

- `.the-way/elements/invariants/template.md` and `.the-way/product-guidelines/template.md`: the forms that the coding and decision templates named in the handoff build on. Needed to judge the invariant entries and the kind file.
- `guidelines/coding-session-store.md`: the precedent for the form of a kind file.
- `foundations/decisions.md:1678`–`1943` (D-96 to D-114, by identifier at the head): to compare the new and changed entries with the decisions they derive from.
- `node_modules/express-session/session/store.js:45`–`60`, plus the `index.js` and `session/session.js` passages the selection names: to confirm that a failed regenerate or save leaves no cookie once the session is detached.
- `node_modules/argon2/argon2.cjs:100`–`110`, `:190`–`195`: how the package encodes a string password (finding 5).
- The verifier logs `reports/39-credentials-*.log`: to check the executor's evidence, not only its claims.
