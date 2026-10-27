# Slice 7 report — credential transitions and bounded admission

**Status:** done with concerns. The concerns are listed under "Questions and concerns". None of them blocks this slice.

- Worktree: `C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie`, branch `task/konta-graczy-i-logowanie`.
- Base: `480309c953da7ff4f3a650c6ef431dad29fb62cb`, clean at start. Head: `8aa2e9c1c28cf82cf41ca50af30b5c8a86de7bd1`. The working tree is clean after the last commit.
- The process checkout and the gitlink are both `574a37b9ab9572f876298f4cc10754581222d3f0`. I checked this at the start, and every verifier log prints it.
- I did not push, merge, rebase or reset anything, and touched no target, secret, deployment, vault or global file. I did not reconcile with origin/main (PR 31), as instructed.

## Commits

| Commit | Message |
|---|---|
| `31e61efcf91018a75abe3c31b26e57d271fa8855` | Complete registration and login behind bounded attempt admission |
| `e0d5b80b4eceecc38b9805e8732c7d25f8d6d039` | Make the account policy file the exemplar of its kind |
| `2bc2b83a6fd397724eb4839acc3b0177210c02eb` | Check that the registration limit keys on the canonical connecting address |
| `3bd81d5997636b997c244c51387b92f14cb08062` | Check that capacity refusals do not count and the lock runs from the fifth failure |
| `8aa2e9c1c28cf82cf41ca50af30b5c8a86de7bd1` | Name the unsettled disconnected attempt as the checked outcome |

## Changed files (`git diff --numstat 480309c..8aa2e9c`)

| File | Added | Removed |
|---|---:|---:|
| `src/server/account-policy.ts` (new) | 279 | 0 |
| `src/server/account-routes.ts` | 196 | 4 |
| `src/server/app.ts` | 6 | 2 |
| `tests/http.test.mjs` | 784 | 2 |
| `tests/transport.test.mjs` | 172 | 9 |
| `guidelines/coding-account-policy.md` (new) | 68 | 0 |
| `guidelines/coding.md` | 1 | 0 |
| `foundations/decisions.md` | 17 | 2 |
| `foundations/invariants.md` | 24 | 4 |
| **Total, 9 files** | **1547** | **23** |

These are 9 of the 10 Change paths. `foundations/part_map.md` needed no change (see "Foundation, guideline and surface consequences"). I edited no path outside the Change list. Every changed file keeps LF (`git ls-files --eol`: `i/lf w/lf`).

## What was built

**`src/server/account-policy.ts`** is new and is the first file of kind `account-policy`, so it is that kind's exemplar. It holds no HTTP, password-hashing or database code. It contains:

- `normalizeEmail`: ECMAScript `trim()` plus `toLowerCase()`; the address must contain exactly one `@`, with text on both sides.
- `acceptablePassword`: length counted in Unicode code points with `[...password]`, from 12 to 128 inclusive. The content is never changed.
- `checkRegistration` and `checkLogin`: return typed outcomes, not HTTP responses.
- `AccountPolicy`: takes a supplied clock (`now`) and a key capacity (`keyCapacity`, default 10,000); the thresholds and windows are fixed constants.
  - `admitLogin(email, address)` and `admitRegistration(address)` either refuse (`null`) or return a ticket. A ticket settles exactly once: `succeed()`, `fail()` or `release()` for a login; `created()` or `release()` for a registration.
  - `inFlight` reports how many admitted attempts are not yet settled.
- Email keys are SHA-256 digests (base64url) of the normalized address. Histories are trimmed to their windows.
  - An email address locks for 15 minutes from its fifth failure, and the lock clears its failures.
  - A success clears the email's failures, not the address's.
  - A window entry still counts while `time + window > now`, so it stops counting at the exact instant the window ends. A lock is active while `lockedUntil > now`.
  - Admission counts failures plus unsettled reservations against 5 (email), 20 (address logins) and 5 (address registrations per hour).
  - A full table first sweeps expired entries. An entry is live while it holds a reservation, an active lock or history inside its window. If no room remains, the table refuses; it never evicts a live entry. Room for both keys of a login is checked before either key is created.

**`src/server/account-routes.ts`** (HTTP kind) replaces the two guarded 503 placeholders with real routes. Its other routes from slice 6 are unchanged.

- Both routes first take exactly the expected fields, each a string (`stringFields`). An absent, extra, array, object, number or null field gives 400 `invalid-request`. This happens before any admission, hash or write.
- `POST /api/accounts` `{email, password, passwordConfirmation}`, in order:
  1. A credential check, which can give 400 `invalid-email`, `invalid-password` or `password-mismatch`, with Polish messages.
  2. `admitRegistration(verified address)`, or 429.
  3. A duplicate pre-check: an existing account gives release and 409.
  4. `hashPassword`. A full gate gives release and 429; any other error gives release and the error handler's 500.
  5. `createAccount`. A lost race (null) gives release and 409 `account-exists`, "Konto z tym adresem już istnieje.".
  6. `created()`.
  7. Sign-in: 201 `{id, email}`.
- `POST /api/session` `{email, password}`, in order:
  1. A malformed address or password length gives 401 `invalid-credentials`, "Nieprawidłowy adres e-mail lub hasło.", with no admission and no Argon2.
  2. `admitLogin(email, verified address)`, or 429.
  3. `findAccountByEmail`, then `verifyPassword(account hash or the startup dummy hash)` through the shared gate. A full gate gives release and 429; any other error gives release and 500.
  4. If the account is unknown or the password is wrong: `fail()` and the same 401.
  5. Otherwise `succeed()`, then sign-in: 200 `{id, email}`.
- Every settlement happens right after the awaited password operation. No route listens to the connection, so a client that disconnects can neither release its reservation early nor erase its outcome.
- Sign-in (`establishSession`) calls `session.regenerate`, sets `accountId`, then awaits `session.save` before the response.
  - If regenerate or save fails, `session.destroy` detaches the fresh session from the request. With no session attached, express-session sets no cookie and does not save again when the response ends. The response is then 503 `session-unavailable`, "Nie udało się zalogować. Spróbuj zalogować się ponownie.".
  - A stored account stays and can sign in later; it is not deleted.
  - No database transaction spans hashing or HTTP: every database call is a single synchronous statement.
- Limitation and capacity both give 429 `too-many-attempts`, "Za dużo prób. Spróbuj ponownie za kilka minut.". I send no Retry-After (choice 4).

**`src/server/app.ts`**: `createApp(runtime = null, policy?)` passes an optional policy to `accountRoutes`. Production (`main.ts`, unchanged) gets the default policy. The session and security assembly is unchanged.

**Contract for slice 9 (browser client).** Every refusal body has a string `error`, the one user-facing message. Every refusal from the four account routes' own handlers also carries `code` (choice 1).

| Status | `code` | Meaning |
|---|---|---|
| 400 | `invalid-request` | Wrong field set or types |
| 400 | `invalid-email`, `invalid-password`, `password-mismatch` | Registration feedback |
| 401 | `invalid-credentials` | Login failure (generic) |
| 401 | `unauthenticated` | No valid session (slice 6) |
| 409 | `account-exists` | Duplicate address |
| 429 | `too-many-attempts` | Limit or capacity |
| 503 | `session-unavailable` | Credentials accepted, session not stored |
| 500 | `logout-failed` | Logout failed (slice 6) |

The guard and transport refusals from slice 5 (403/415/413/400/503, and the error handler's 500) keep `{error}` without a code. 201 and 200 carry `{id, email}`.

## Checks run (command → exit)

All repository tests ran only as full `npm test`, inside the established isolated Linux harness (reports/linux-verification.md). I rebuilt the product bundle before each batch of runs.

The common Docker arguments, called COMMON below, are: `--network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly loop2-task22-verifier:latest`. The target ref is always `7012abcfb55b4ba2b2836b574a2275eb1551df28`, because the bundle does not hold 2c1d64c. I ran everything from Git Bash with `MSYS_NO_PATHCONV=1`. The logs are UTF-8; each starts with ASCII bytes (`Clo`). They sit beside this report.

| # | Command | Exit | Result |
|---|---|---:|---|
| 1 | `git status --short`; `git log --oneline -3`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0 | Clean; base 480309c; pin 574a37b both ways. |
| 2 | `npm run build`; `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/server tests/http.test.mjs tests/transport.test.mjs`; `node node_modules/prettier/bin/prettier.cjs --write/--check --no-config --no-editorconfig <changed .ts/.mjs>` (local Windows; quick feedback only, not tests; the gate's own lint and format checks ran inside npm test) | 0 | Compiles, lint-clean, formatted. |
| 3 | `docker run --name loop2-task15-credentials39-red COMMON bash /inputs/verify-session34-overlay.sh 480309c… 7012abc… credentials39-red.tar` | 1 | `39-credentials-red.log`. The first red overlay: new tests plus an empty `AccountPolicy` shell laid over the base. 396 Node tests, 382 pass, 14 assertion failures. One failure came from a defect of my test, not of the base: the new guard case expected no Set-Cookie on refused requests that carry a valid session, but D-99 renews such a session on every request. I fixed the test (it now allows only a renewal of the same session) and reran as run 4. I removed this exited container after reading its log; the log is kept. |
| 4 | `docker run --name loop2-task15-credentials39-red2 COMMON bash /inputs/verify-session34-overlay.sh 480309c… 7012abc… credentials39-red2.tar` | 1 | `39-credentials-red2.log`: the final red overlay. The build succeeded; 396 Node, 382 pass, 14 assertion failures (table below). |
| 5 | `docker run --name loop2-task15-credentials39-dev COMMON bash /inputs/verify-session34-overlay.sh 480309c… 7012abc… credentials39-dev.tar` | 1 | `39-credentials-dev.log`: development overlay (working code and tests, no foundation edits yet). 396/396 Node and all Python pass. The foundation check reported only the five citations of `account-attempt-limits`, which did not exist yet. |
| 6 | `python -B .the-way/elements/common/foundation_check.py` (local, after each foundation or guideline write and at the final head) | 0 | `0 errors`. |
| 7 | `git diff --check` before each commit | 0 | Clean. |
| 8 | `docker run --name loop2-task15-credentials39-first COMMON bash /inputs/verify.sh e0d5b80b… 7012abc…` | 0 | `39-credentials-first.log`: 396/396 Node; Python 5+65+176+32 run, OK (skipped=3); foundation `0 errors`. |
| 9 | `docker run --name loop2-task15-credentials39-mutation-A COMMON bash /inputs/verify-credentials39-mutation.sh e0d5b80b… 7012abc… A` | 1 | `39-credentials-mutation-A.log`: 6 assertion failures, as expected. |
| 10 | same, mode `B` | 1 | `39-credentials-mutation-B.log`: 10 failures, as expected. |
| 11 | same, mode `C` | 1 | `39-credentials-mutation-C.log`: 7 failures, as expected. |
| 12 | `docker run --name loop2-task15-credentials39-mutation-D COMMON bash /inputs/verify-credentials39-mutation.sh 8aa2e9c1… 7012abc… D` | 1 | `39-credentials-mutation-D.log`: 4 failures, as expected. |
| 13 | same, mode `E` at 8aa2e9c | 1 | `39-credentials-mutation-E.log`: 1 failure, as expected. |
| 14 | `docker run --name loop2-task15-credentials39-final COMMON bash /inputs/verify.sh 8aa2e9c1c28cf82cf41ca50af30b5c8a86de7bd1 7012abcfb55b4ba2b2836b574a2275eb1551df28` | 0 | `39-credentials-final.log`. The final head is shown as `HEAD is now at 8aa2e9c`, with the process pin 574a37b; Node v24.22.1, Python 3.14.9. Results: 396/396 Node pass, 0 skipped; Python 278 tests run (5, 65, 176, 32), every directory OK, `skipped=3`; foundation check `0 errors`. The Docker-dependent deploy and invariant tests ran. `docker inspect` exit code 0. |

Archive identities (sha256):

- `credentials39-red.tar`: `34dbd62143250943521bd8613d15742f927a6bf3140ce60dc78e0ff8b9e95c16`
- `credentials39-red2.tar`: `a175981c02475619551a4180f6fa6619a33fd38f2b73ff0a98f629f817c2f5e5`
- `credentials39-dev.tar`: `37fa460dd794456baeec583c9fea130afd2c723e4bc6bdbcc25ac351354af64f`

New harness files in `.runs/account-linux-inputs/` (git-ignored, LF):

- `mutate-credentials39.py`: each mode replaces anchors that must match exactly once. Final sha256 `0519b74a060b135e2c7172ee8a23bc9bb0e4a96aeb444b8dca81d94bf518484a`. Modes A–C were unchanged when they ran; I appended D and E later.
- `verify-credentials39-mutation.sh`: `verify-session34-mutation.sh` with the mutation script swapped.

Before each run I dry-checked every mode's anchors on `git archive HEAD src/server` copies in the session scratchpad (`…\scratchpad\anchor39-*`, `anchor39b-*`, `anchor39c-D`).

**Not run, or unchecked:**

- The three tests that skip on Linux: `test_native_windows_readers_reject_nonterminating_cim_errors`, `test_native_windows_readers_keep_owned_child_in_healthy_observation` and `test_failed_descendant_query_still_terminates_known_main_process`. The run prints only `skipped=3`. No Linux pass is attributed to them.
- The Windows full gate: not run. The unchanged base was not rerun just to advance.
- Unchecked and still violated, as instructed: the Argon2 measurement in the target image (`player-argon2-deployment-check`) and the full saved-game durability promise (`account-save-durable-storage`).
- Also unchecked: the public browser journey, the real Cloudflare provider settings, and acceptance of the secure cookie and the client address on the target.
- No screenshot: this slice changes no user interface.

## Fail-first and mutation evidence

**Failing first.** Run 4 laid the committed-form tests over the unchanged base 480309c, plus an empty `AccountPolicy` shell. The shell lets the tests load (section 2 of the method: "create the empty function or file first"). The build succeeded, and every failure below is an assertion.

| Test | Failing assertion at base |
|---|---|
| http: registration stores an Argon2id hash… (`invariant: player-argon2-password-hash`) | 503 !== 201 |
| http: a credential success replaces only this browser's session… | 503 !== 201 |
| http: one normalized address holds one account… also in a race | [503, 503] vs [201, 409] |
| http: passwords count 12 to 128 Unicode code points… | `twelve-emoji` 503 !== 201 |
| http: malformed fields and out-of-shape credentials are refused… | 503 !== 400 |
| http: a known address with a wrong password and an unknown address fail login identically | 503 !== 201 |
| http: a failed session save keeps the new account usable… | `the account remains` |
| http: five failed logins lock an address… (`account-attempt-limits`) | 503 !== 201 |
| http: one client address is admitted twenty failed logins… (`account-attempt-limits`) | 503 !== 201 |
| http: one client address creates five accounts per rolling hour… (`account-attempt-limits`) | 503 !== 201 |
| http: a disconnected login keeps its reservation… (`account-attempt-limits`) | 503 !== 201 |
| http: full limiter tables refuse newcomers… (`account-attempt-tracking`) | 503 !== 201 |
| transport: mutation guards reject foreign origins, non-JSON and malformed bodies (evolved) | `application/json` 503 !== 401 |
| transport: refused state-changing requests change no account or session… (`account-mutation-request-guards`) | `/api/accounts unexpected field` 503 !== 400 |

The two additions made after the red run (commits 2bc2b83 and 3bd81d5) were each seen failing under the mutation that targets them (runs 12 and 13). They extend tests that the red run already shows failing.

**Executed mutations.** Each mutation was applied to a disposable clone of the stated commit, followed by full npm test; the worktree was never mutated. Restoration is the unmutated head passing full npm test: run 8 (e0d5b80) and run 14 (8aa2e9c, the final head). Within each run, every failing test is attributable to one mutation, because no other mutation of that run reaches that test's failing assertion. The reasons are given where this is not obvious.

| Run, mode | Mutation (exact) | Named assertion that failed |
|---|---|---|
| A (e0d5b80) | a1: success also clears address failures (`addressEntry.failures = []` in `succeed`) | IP case: `the twentieth attempt's reservation refuses the twenty-first` — [401, 401] instead of [401, 429] |
| A | a2: a registration still counts at the instant its hour ends (`>=` instead of `>`) | registration-limit case: the `slot-8` registration at exactly one hour, 429 !== 201 |
| A | a3: a login reservation is released on the response `close` | disconnect case: at that commit the message read `precondition: …`, 0 !== 1; rerun in D with the final wording |
| A | a4: a full table evicts its first key before sweeping | tracking case: `a third email key is refused while two are live`, 401 !== 429 |
| A | a5: the Origin check guards only `/api/logout` | guard case (`account-mutation-request-guards`): `/api/accounts missing origin`, 201 !== 403 |
| A | a6: a failed session save is answered as success (`&& false`) | save-failure case: `registration: a failed save is a failure` |
| B (e0d5b80) | b1: registration hashes `checked.password.trim()` | Argon2 case (`player-argon2-password-hash`): `argon2.verify(stored, password)`, false !== true. Eight other cases fail on their own logins with the exact password, which b1 also explains (each shows 401 where 200 is expected). |
| B | b2: an unknown address fails without password work (`account ? verify : false`) | malformed-input case: `unknown address goes through the same gate`, 401 !== 429. b1 cannot produce this, because b1 changes only stored hashes. |
| C (e0d5b80) | c1: unsettled logins do not count toward the email limit | disconnect case: `the disconnected attempt still holds its reservation`, 200 !== 429 |
| C | c2: a success keeps the email's earlier failures | lock case: `failure 2 after success`, 429 !== 401 |
| C | c3: password length in UTF-16 units (`password.length`) | password case: `max-emoji`, 400 !== 201 |
| C | c4: the email is stored and compared as supplied | Argon2 case: `the account is stored under its normalized address`; race case: [201, 201] instead of [201, 409] |
| C | c5: unexpected body fields are ignored | guard case: `/api/accounts unexpected field`, 201 !== 400; malformed-input case: extra field, 429 !== 400 |
| D (8aa2e9c) | d1: registration keys its limit by `request.ip` | registration-limit case (own-work check): `an equivalent spelling with a chosen forwarding chain`, 201 !== 429. Tracking case: `the second tracked email and address`, 429 !== 401. Under d1 the registration's `127.0.0.1` key takes one of the two address slots, so this second failure also comes from d1. |
| D | e1: a login refused for password capacity counts as a failure (`ticket.fail()`) | lock case: `failure 1`, 429 !== 401. The five capacity refusals had locked the address. |
| D | a3 (again): reservation released on `close` | disconnect case: `the disconnected attempt stays unsettled while its password work runs`, 0 !== 1 |
| E (8aa2e9c) | e2: the lock runs from the first counted failure | lock case: `one millisecond before the lock ends`, 200 !== 429 |

Every new or changed invariant test has a named failure under a plausible mutation, and restored full npm test:

- `player-argon2-password-hash`: b1.
- `account-attempt-limits`: a1, a2, a3, c1, c2, e1, e2.
- `account-attempt-tracking`: a4.
- `account-mutation-request-guards`: a5, c5.

**Mental mutations (not executed)** and what catches them:

- 201/200 before awaiting the save: the save-failure case (a 503 is expected and no cookie is allowed).
- Regenerate skipped (session fixation): the fresh-identity case (the old record must be gone and a new ID issued).
- Insert race answered 500: the race case (the loser must get 409 with the exact message).
- A duplicate or invalid registration consuming a slot: the registration-limit case (one duplicate and one invalid request lie between the creations).
- A known account's failure shaped differently from an unknown address's: the identical-failure case (`deepEqual` of the bodies).
- An out-of-shape login reaching Argon2: the malformed-input case under a full gate (401 is expected, never 429).
- Lock bypassed by correct credentials: the lock case (`locked, correct password`).
- A lock that also blocks other emails from the same client: the lock case (`another address from the same client is not locked`).
- Session saved but not tied to the new account: the Argon2 case (`storedRow(...).account_id === stored.id`).

**Not caught by any test:**

- The clause "refuses before password work" for an attempt that admission refuses. A fault that checks the limit only after verifying would still answer 429, so status alone cannot show the ordering. Review keeps it.
- Email keys stored as raw text rather than as digests. This is not observable and is left to review.
- The exact `code` strings and the Polish registration-feedback messages. These are deliberate wording choices, asserted only as a code where the code carries a distinct meaning. The required messages (duplicate, login, limitation) are asserted exactly.

## Own-work check

**The requirement my work most likely did not meet:** "use the verified client address", together with the spec's named fault "forwarded-chain spoof changing limiter key". The first version had no test for a caller-chosen chain at the limiter level, only the transport parser test from slice 5. A route keyed on `request.ip` would have passed every limit case that sends no `X-Forwarded-For`.

**The check:** in the registration-limit case, after the fifth account, a registration that arrives as `::ffff:198.51.100.60` and carries `X-Forwarded-For`, `X-Real-IP` and `Forwarded` values of its choice must still get 429 (commit 2bc2b83). Mutation d1 (`request.ip`) fails exactly that assertion (run 12). The final head passes it (run 14).

**Weakest point, checked separately:** two cases depend on Argon2 work outlasting a localhost exchange of a few milliseconds:

- the full-gate batches of the malformed-input case and of the lock case's capacity refusals;
- the disconnect case.

Each such case asserts that the condition it depends on held — both slots still occupied, or the attempt still unsettled. A slow machine therefore turns into a visible failure, never a false pass. Argon2 takes about 120–160 ms per operation (local measurement, below), against requests of a few milliseconds. The batches are kept at seven requests or fewer. All runs above passed these preconditions at the final head.

## Diagnostics and synthetic values

- Every new header and cookie assertion uses `assert.ok(<condition>, <message>)`, so no cookie value or session ID appears in a diff.
- The stored hash is checked by `assert.ok(/…/.test(hash))` and by `argon2.verify`, never by printing it.
- The passwords are synthetic, and the addresses come from the documentation ranges.

Scan of all ten `39-credentials-*.log` files: 0 matches each for `s%3A`, `__Host-loop2.sid=` and `argon2id$v`. Positive controls:

- The logs start with ASCII bytes (`Clo`), so they are UTF-8, not UTF-16.
- The same grep finds the test name `registration stores an Argon2id` in `39-credentials-first.log`, so the search reads the file.

No log was redacted.

## Foundation, guideline and surface consequences

**New decision D-114** ("Which file is the exemplar for account policy?"), written through the-way-record-decision. D-113 is the last number and no number is withdrawn, so D-114 is the next free one. Root still has to reconcile the D-94/D-95 collision with PR 31 (reports/29a-target-advance.md); D-114 adds one more account-task number that this renumbering must carry.

- Scope: account-server.
- Relations: derives from D-28, D-96, D-97, D-100 and D-101.
- Verification: `account-attempt-limits` · `account-attempt-tracking`, plus a complies/violates pair.
- Polish: Wzorcem rodzaju `account-policy` jest `src/server/account-policy.ts`. Zasady kont sprawdzają dane logowania i rejestracji oraz dopuszczają i rozliczają próby według przekazanego zegara, niezależnie od HTTP, haszowania i bazy, a każdą dopuszczoną próbę rozlicza się raz, po zakończeniu pracy hasła.

**D-100 and D-101, Verification only.** The binding sentences are unchanged. D-100 now names `account-attempt-limits`, and D-101 names `account-attempt-limits` · `account-attempt-tracking`; both keep their pairs.

- Polish: Decyzje o progach prób i o pamięci liczników wskazują teraz niezmienniki, których testy ich pilnują.

**New invariant `account-attempt-limits`**, written through the-way-record-invariant. Method test, Rests on none, Derives from D-100 · D-101 · D-114, Part account-server, **Violated: no**.

- Tests citing it: the lock, IP, registration-limit and disconnect cases in `tests/http.test.mjs`.
- Polish: Serwer przed pracą hasła odmawia logowania na adres e-mail z pięcioma nieudanymi lub nierozliczonymi próbami w ciągu 15 minut od ostatniego udanego logowania albo w ciągu 15 minut od piątej porażki, logowania z adresu klienta z dwudziestoma takimi próbami w ciągu 15 minut i rejestracji z adresu klienta z pięcioma utworzonymi lub nierozliczonymi kontami w ciągu godziny, a każdą dopuszczoną próbę rozlicza dopiero po zakończeniu pracy hasła, także gdy klient się rozłączył.
- Its clause "before password work", for refused attempts, is kept by review only (see "Not caught by any test").
- Corrected in the fix round (reports/41-slice7-fix-report.md, commit 9490083): the email clause counts failures since the address's last successful login.

**New invariant `account-attempt-tracking`**. Method test, Rests on none, Derives from D-101 · D-114, Part account-server, **Violated: no**.

- Test citing it: "full limiter tables refuse newcomers without evicting a live restriction". It runs with a capacity of 2. The value 10,000 stays in D-101, which an agent compares; no test checks the constant.
- Polish: Gdy tablica śledzonych adresów e-mail albo adresów klienta jest pełna żywych wpisów, próba wymagająca nowego klucza dostaje odmowę bez wypierania żywego wpisu, a wpis, którego historia, blokada i rezerwacje wygasły, zwalnia miejsce.

**`player-argon2-password-hash`**: Method review → test, **Violated yes → no**. The sentence is unchanged: "The account server stores an encoded Argon2id hash made by the `argon2` package for each player password and verifies login passwords through that package."

- Test: "registration stores an Argon2id hash of the exact password…". It checks the stored encoded Argon2id hash of the configured profile with the package's own `argon2.verify`, independently of product code, and that login accepts the exact password and refuses the trimmed one.
- Registration is the only path that creates a password. Rests on stays `argon2-password-api`.
- Polish: Serwer zapisuje dla hasła skrót Argon2id z biblioteki `argon2` i sprawdza nim hasło przy logowaniu.
- **Violated mark cleared.** Polish: Znacznik „naruszony” zdjęty — serwer to robi, a pilnuje tego test, raz widziany z porażką. The request has to name this clearing.
- The target-image measurement remains the separate `player-argon2-deployment-check`, still Violated yes.

**`account-mutation-request-guards`** (plan F21): Method review → test, **Violated yes → no**. The sentence is unchanged.

- Direct cited refusal test: "refused state-changing requests change no account or session and do no password work" in `tests/transport.test.mjs`. It covers all three state-changing routes against 22 shared variants, plus the per-field variants of the two credential routes:
  - Origin: missing, null, foreign, suffix lookalike, with a path, without its port, malformed, duplicate.
  - Media and size: missing, text, form, parameterized, duplicate, gzip, duplicate identity encoding, oversized.
  - Body: empty, broken, array, scalar, null, unexpected field; and for each field, missing, numeric and array.
- Every variant carries a body that would succeed if the request were admitted. The case asserts:
  - the exact status;
  - no new or cleared session cookie (only the D-99 renewal of the same session is allowed);
  - no new account;
  - one session row;
  - the live session keeps its identity.
- The controls then show the same bodies changing state once every guard is satisfied.
- It was seen failing at base (run 4) and under a5 and c5, and it passes at the final head.
- "Before password work": the handler is the only place that hashes, and no refused variant reaches it, as the unchanged account and session state shows.
- Polish: Każda trasa zmieniająca stan konta odrzuca brakujący, zdublowany, błędny albo obcy nagłówek `Origin` oraz treść inną niż JSON, skompresowaną, za dużą albo o złej budowie, zanim zacznie się praca hasła lub zmiana danych.
- **Violated mark cleared.** Polish: Znacznik „naruszony” zdjęty — wszystkie trasy zmieniające stan, także rejestracja i logowanie z ich polami, odmawiają przed pracą hasła i zmianą, czego pilnuje test raz widziany z porażką. The request has to name this clearing.

**Unchanged and still Violated: yes:**

- `player-self-registration`, `player-password-login`, `email-verification-nonblocking`. The server half now exists and is tested, but each sentence is about the player, and the browser forms and the entry to the headquarters are slice 9. Slice 8 or 9 should judge them against slice 9's evidence.
- `player-argon2-deployment-check`: the target measurement.
- `account-save-durable-storage`: the full saved-game sentence.
- `account-save-sqlite-access` and `loop2-shared-public-origin`: their own slices.

Unchanged and passing: `password-operation-gate` (`passwords.ts` is untouched), `account-session-authorization`, `account-request-transport`, `player-opaque-session-cookie`, and the cookie and Store invariants.

**Guidelines** (written through the-way-maintain-coding-guidelines, cycle-author part, "Writing the files" of the coding template):

- New `guidelines/coding-account-policy.md`, in the required form of a kind:
  - Files of this kind: one row, `src/server/account-policy.ts`, exemplar, D-114.
  - Two rules, each with its invariant: reservation before password work and settlement after it (`account-attempt-limits`); bounded tables without eviction (`account-attempt-tracking`).
  - Examples: credential checks without HTTP, and the supplied clock and capacity in tests.
  - Polish: Nowy rodzaj kodu „zasady kont” ma wzorzec i dwie reguły z niezmiennikami: próbę rezerwuje się przed pracą hasła i rozlicza raz po jej końcu, a pełna tablica odmawia nowym kluczom bez wypierania żywych wpisów.
- `guidelines/coding.md`, Kinds of code: the row `account-policy` → `guidelines/coding-account-policy.md`.
  - Polish: Indeks wytycznych kodu wskazuje nowy plik rodzaju.
- Not changed, because neither path is a Change path of this slice:
  - `guidelines/testing.md`: no create/login permission or refusal rows; the plan gives those to slice 8.
  - `guidelines/coding-http-application.md`: no copy row for `account-routes.ts`.

**Part map** (the-way-update-part-map, step 2): no entry changes.

- `src/server/**` already claims `account-policy.ts`, and both test files belong to account-server.
- The new module imports only `node:crypto`, so Depends on is unchanged.
- The trust boundary `src/server/**` covers the credential intake.
- The account-server sentence ("serves the built game, handles the HTTP requests sent to it and owns account and session persistence") already includes registration, login and their admission.
- The map has no API surface entry.
- Polish: Mapa części bez zmian — nowy plik i testy już należą do serwera kont, a jego zależności, granica zaufania i zakres odpowiedzialności się nie zmieniają.

**Surface:** none changed in the map. The HTTP contract above is what slice 9 consumes.

## Reading reaches beyond the selection

- `.the-way/task-cycle/change/SKILL.md` and the files of the pinned element and guideline methods:
  - `product-guidelines/coding/SKILL.md`, `product-guidelines/coding/template.md`, `product-guidelines/template.md`;
  - `elements/decisions/skill/SKILL.md`, `template.md`, `examples.md`;
  - `elements/invariants/skill/SKILL.md`, `template.md`, `examples.md`;
  - `elements/part-map/skill/SKILL.md`, `template.md` (lines 1–80);
  - `elements/common/way_of_working.md`, `rules.md`.
  - These are method prerequisites the selection's skills name. I did not open the pinned example entries in `.the-way/foundations/`, because the product's own D-111–D-113 and the account-server invariants gave the form directly.
- `node_modules/express-session/index.js:170–480` and `session/store.js` (regenerate): to establish that, after regenerate, a failed save would still set the cookie and save again at the end of the response unless the session is detached. This is why `establishSession` destroys on failure.
- `eslint.config.mjs`, `tsconfig.server.json`, `package.json`: the lint scope (`transport.test.mjs` is outside the ESLint file list) and the `npm test` route.
- `grep` of `tests/` for the old placeholder routes, `503`, the guideline file names and `account-routes`: to find every test that the evolved routes affect.
- `docker ps -a` and `docker inspect loop2-task15-session34-final`: the length of a full run (about 90 seconds) and the naming of earlier containers.
- A local Node measurement of `dist/server/passwords.js` (hash about 160 ms, verify about 120 ms, two in parallel about 150 ms on this Windows host): to size the timing margins. This is not a test and not a target measurement.

I did not read `cycle.md`.

## Choices made (rejected way, and cost if wrong)

1. **Refusal shape: `{error}` always, plus `code` on every refusal from the account routes' own handlers. Slice 5's guard and transport refusals stay `{error}`.**
   - Rejected: adding codes to the guard refusals. They live in `src/server/transport.ts`, outside this slice's Change list, and a browser that sends correct requests never meets them.
   - Cost: slice 9's client must treat a missing `code` as a generic failure, and choose its message by status when `code` is absent.
2. **A login with a malformed address or an out-of-range password gets the generic 401 before admission, and is not counted.**
   - Rejected: counting it as a failure. Such a password can never be correct, so the attempt brings no brute-force gain, and counting it would let cheap requests lock an address without Argon2 cost.
   - Cost: a locked address answers such a request with 401 rather than 429. Both are failures, and neither reveals anything.
3. **Registration admission comes before the duplicate pre-check; the pre-check runs before hashing.**
   - Rejected: pre-check before admission. The order makes a limited client always get 429, and the pre-check avoids Argon2 work for an existing address.
   - Cost: none in limits, because a duplicate releases its slot. The existence of an address remains discoverable, a cost the task accepts (K5).
4. **No Retry-After.** The spec says "may".
   - Rejected: computing it for every kind of limit, which would add untested arithmetic.
   - Cost: clients cannot show a precise wait.
5. **Capacity refusals and limits share 429 `too-many-attempts`** and the one required message. Rejected: 503 for capacity. The spec says all limitations show that text, and a capacity refusal is not a failure.
6. **A credential success is settled before the session is stored.** If the save then fails (503), the email's failures stay cleared. Rejected: settling after the save, which would tie admission accounting to session storage. Cost: none against the decisions.
7. **The test seams are a supplied clock and a key capacity on `AccountPolicy`, plus a read-only `inFlight` count** used only as a wait condition, with a deadline. Rejected: a test-only HTTP route or facade. The thresholds and windows are deliberately not options.
8. **Gate occupation in tests uses the real module.** The test calls `hashPassword` from `dist/server/passwords.js`, the same module instance the app uses, to fill both native slots. Rejected: replacing the gate.
9. **`policy` is an optional second parameter of `createApp`**, rather than a field of `AccountRuntime`. `configuration.ts` is not a Change path, and production uses the default.

Adaptations (method section 4): none structural. The spec's optional `rate-limits.ts` was not needed: one file holds the policy.

## Questions and concerns (each with my recommendation)

1. **"Refuses before password work" for refused attempts is protected by review only** (see the evidence section). *Recommendation:* the reviewer reads `account-routes.ts`, where admission precedes every `hashPassword`/`verifyPassword` call. No test change is needed unless the reviewer finds a cheap observable.
2. **Timing-dependent cases** (full gate, disconnect) carry explicit assertions on their condition, so a slow runner fails visibly rather than passing. *Recommendation:* if one ever fails on its condition, treat it as a timing diagnosis under "Flaky tests", never a rerun to green.
3. **The player invariants stay Violated yes:** `player-self-registration`, `player-password-login` and `email-verification-nonblocking`. *Recommendation:* slice 8 or 9 clears them with the browser evidence. Slice 8 adds to `guidelines/testing.md` the visitor create/login rows and the Origin/media/transport rows, citing D-100, D-102 and D-107, and names `account-mutation-request-guards`, `account-attempt-limits` and `account-attempt-tracking` in its boundary row.
4. **`guidelines/coding-http-application.md` still lacks a copy row for `account-routes.ts`.** *Recommendation:* refresh it in the slice that next touches that file or in final reconciliation.
5. **Decision numbering:** D-114 joins the account-task numbers that root renumbers when it reconciles with PR 31. *Recommendation:* carry D-114's references (D-100, D-101, two invariants, the kind guideline) through that renumbering.
6. **The review of slice 6, Minor findings 2 and 3, still stands.** That is the "touches" message, and the precise 401 wording for a sessionless logout with a body. My change makes neither comment false. Minor 4, the placeholder comment, is gone with the placeholder.

## Resources

- Owned containers left exited for inspection:
  - `loop2-task15-credentials39-red2` (1)
  - `-dev` (1, foundation citations only)
  - `-first` (0)
  - `-mutation-A`, `-mutation-B`, `-mutation-C`, `-mutation-D`, `-mutation-E` (1 each)
  - `-final` (0)
- `loop2-task15-credentials39-red` was removed after its log was read. The log is kept.
- Scratch copies: `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\c03d2664-799c-4af1-901d-6528e8909f2c\scratchpad\red39`, `…\anchor39-A`, `…\anchor39-B`, `…\anchor39-C`, `…\anchor39-D`, `…\anchor39b-D`, `…\anchor39b-E` and `…\anchor39c-D`.
- No other worktree, daemon setting or host socket was touched.
