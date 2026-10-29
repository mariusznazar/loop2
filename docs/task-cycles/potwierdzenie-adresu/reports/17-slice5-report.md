# Slice 5 report — the confirming route, the resend route and the send step

**Status:** done with concerns (the concerns are under *Problems* and *Choices*; none blocks the slice)

**Commit:** `5ab1b5a` on `task/potwierdzenie-adresu`, on top of the slice base `b4e50b2` —
`feat: :sparkles: confirm an email address from its link and send the confirmation message at registration and on request`

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/server/account-routes.ts` | 172 | 15 |
| `src/server/account-policy.ts` | 48 | 1 |
| `tests/http.test.mjs` | 660 | 5 |
| `tests/transport.test.mjs` | 124 | 3 |

- `account-policy.ts`: `accountMessageLimits` (window 1 h, total 30, per account 3), `confirmationLinkLifetime` (24 h), `createLinkToken` (32 random bytes, base64url), `isLinkToken` (43 base64url characters that decode to 32 bytes and re-encode identically), `linkTokenDigest` (SHA-256 of the token text, base64url); `AccountPolicy` gains the option and read-only property `sendingDeadline` (default 10 000 ms, positive safe integer up to 2^31−1).
- `account-routes.ts`: the two routes, the send step `sendConfirmation` and its bound `boundedSending`, `accountBody` with `emailConfirmed`, registration's 201 with `confirmationMessage`, `signIn` now only stores the session (the route answers).
- `tests/http.test.mjs`: the fixture hands `createApp` the runtime spread with a stand-in mailer and a proxy of the database whose `issueLink` can run a case's hook first; the unconfigured-503 case covers six routes; the existing account bodies gain `emailConfirmed: false` (and registration's `confirmationMessage: "sent"`) — the requirement changed (spec Decision 4), not the test's strength; eight new cases.
- `tests/transport.test.mjs`: the fixture uses a stand-in mailer (before, a control registration would have reached the SMTP mailer for `smtp.example.test`); the guard case covers the two new routes (also no link recorded, no address confirmed, nothing handed to the mailer per refusal) with controls; one new transport case.

## Checks

Each `*.test.mjs` run builds the game first, as `npm test -- <file>` does. Logs are in `.runs/task-cycles/potwierdzenie-adresu/slice5-logs/`.

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/http.test.mjs` (new tests, code unchanged) | 1 | failing first: the 8 new cases and the 6 existing cases whose bodies gain `emailConfirmed` fail on assertions (404 for the new routes, missing fields). One case failed on a `TypeError` (no message to read), so `tokenOf` now asserts that a message was handed on. Log `http-red.log`. |
| `npm test -- tests/http.test.mjs` | 0 | 33 pass. Log `http-green.log`. |
| `npm test -- tests/transport.test.mjs` (code stashed) | 1 | failing first: the new transport case and the guard case fail (404 ≠ 403). Log `transport-red.log`. |
| `npm test -- tests/transport.test.mjs` with the two new paths taken out of `mutationGuards` | 1 | the guard case fails (`/api/email-confirmation missing origin`: 500 ≠ 403), so `account-mutation-request-guards` is seen failing on its own break. Code restored. Log `transport-m1-guards.log`. |
| `npm test -- tests/transport.test.mjs` with the transport gate limited to the four old paths | 1 | only the new transport case fails (`204 ≠ 403`), so `account-request-transport` is seen failing on its own break. Code restored. Log `transport-m2-gate.log`. |
| `npm test -- tests/transport.test.mjs` | 0 | 8 pass |
| `npm test -- tests/account-storage.test.mjs` | 0 | 44 pass |
| `npm test -- tests/startup.test.mjs` | 0 | 15 pass |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `npm run typecheck` | 0 | |
| `npx eslint --max-warnings 0` on the four files | 0 | |
| `npx prettier --check` on the four files | 0 | |

Invariant markers in the new tests and their failing runs (all against the code without the routes, `http-red.log` / `transport-red.log`, then green with the commands above): `account-session-authorization` and `blocked-account-access` (resend authority), `account-message-limits` (registration limited; resend limits), `email-confirmation-link` (single use and refusals; supersession, expiry, kind; blocks), `unblock-restores-no-link` (block while the message is on its way, then unblock), `account-request-transport` and `account-mutation-request-guards` (transport file; also seen failing on their own mutations above).

Not run:
- The whole gate (`npm test` without a file): the cycle's run, as the handoff and the method say.
- `tests/invariants/test_loop2_one_serving_process.py`: fails on the base on this machine (handoff); not a check of this slice.
- `tests/account-mail.test.mjs`, `tests/account-api.test.mjs`: their code is unchanged by this slice.

## Own-work check

- **Requirement most likely unmet:** spec Decision 5 — registration's answer, waiting for the send, must end within the browser's 15-second limit even when the real mail service hangs, under the production default deadline, not only the shortened one of the tests.
- **Check:** a one-off script (`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\8920f01f-a1b3-457e-b488-3f70c8b0c5f7\scratchpad\silent-smtp-check.mjs`, not committed) built a configured runtime with the real `SmtpMailer` pointed at a loopback TCP server that accepts and never speaks, used the default `AccountPolicy` (10 s), and timed one registration over HTTP.
- **What it showed:** `{"status":201,"outcome":"failed","elapsedMs":5170,"smtpConnections":1}`, plus the mailer's own line `Account mail failed: ETIMEDOUT`. The mailer's 5-second phase timeout ends the send first; the route deadline (10 s) stays the outer bound. Hashing plus a 10-second worst case fits within 15 s.

## Reaches beyond the dispatch

- `spec.md` lines 276–357 and 388–442 (Decisions 6, 7, 8, 10, 11) and 520–560 (*Left to the maker*): to confirm which deadline Decision 4's "misses its deadline" means, and that the route's seam is mine to choose ("the exact signature of the test seam for the mailer").
- `reports/08-slice1-report.md` § Choices made and `reports/15-slice4-report.md` whole: the handoff cites them for what earlier slices settled.
- `.the-way/task-cycle/change/slice.md`: named by the method for my variant.
- `foundations/decisions.md` D-140 (lines 2527–2538): in the handoff's current ranges, read whole.

## Choices

- **The route's sending deadline sits on `AccountPolicy` as the option `sendingDeadline`** (default 10 s), because `createApp(runtime, policy)` already passes the policy as the tests' seam and the slice's Change list does not hold `app.ts`. Rejected: a third parameter of `createApp`/`accountRoutes` — changes the http-application exemplar for a test seam; a deadline on the runtime — changes `configuration.ts`, outside the slice. Cost if wrong: the account-policy guidelines say threshold and window values are not options; a deadline is neither, but a reviewer may want it elsewhere. Moving it is local to the policy, the route and the http fixture.
- **The route bounds the mailer itself and maps a rejected or junk answer to `failed`**, though `SmtpMailer` already bounds itself and never rejects: spec Decision 4 says the send step never throws, and D-151 asks for a route test whose stand-in never answers. The route does not read the mailer's error; on rejection it logs only the fixed line `Account mail failed: unknown`, and on its own deadline `Account mail missed its deadline`. Rejected: trusting the mailer contract only — a broken or stand-in mailer would hang the registration until the client's 15 s. Cost if wrong: two log lines with the same shape as the mailer's own.
- **An issue that throws is logged with one fixed line** (`Account confirmation link could not be recorded`), with no error text. Rejected: silence — the operator would see failed sends with no cause. Rejected: the error's message — a database error is never logged by this server elsewhere.
- **The token's digest is SHA-256 of the token text** (not of the decoded bytes), as `AccountPolicy` already digests email keys. With the format check this is one spelling to one digest; another spelling of the same bytes is refused (tested).
- **The resend route checks the body (`{}`) before the session**, as logout does; the 409 message is „Adres e-mail jest już potwierdzony.” (left to the maker).
- **The resend's 401 when the issue finds the account blocked** is the same `unauthenticated` answer as for a deleted session (spec Decision 4). Registration maps that case to `failed`.
- **Testing a block "before recording"**: no await stands between the route's account read and `issueLink`, so the test proxies the runtime's database and commits the block through a second `AccountDatabase` (as the owner's command does) right before the real `issueLink` runs. Only the timing is substituted; the issue, the block and the read are the product's. The block "while the message is on its way" needs no proxy: the stand-in holds its answer.
- **The invariant tests changed:** `account-session-authorization` (new case in `http.test.mjs`), `account-mutation-request-guards` (the guard case in `transport.test.mjs` extended to five routes) and `account-request-transport` (new case in `transport.test.mjs`).
- Plan and code otherwise agreed; no structural mismatch. Small adaptation: the plan names no place for the route's deadline seam (above).

## Problems

- **A stack trace in the test output, as observed:** in the case where the block lands while the message is on its way, the registration's 201 is sent, and then express-session's save at the end of the response (`ServerResponse.json` → `Session.save` → `SqliteSessionStore.set` → `AccountDatabase.saveSession`) throws `Session cannot be replaced` for the now-blocked account. Express prints that error's stack because headers were already sent. Cause verified from the trace in `http-green.log`. The session row is not written, which is what the block guard of D-112 asks; the line holds no token or address. The same path existed before for a block landing between the explicit session save and the response's end, but the window is now as long as the send (up to 10 s). Recommended: accept, or have the cycle decide whether the end-of-response save should be quiet for a blocked account (outside this slice's files).
- **`isLinkToken` is not observable through the route:** every refused token gets the same answer as an unknown one, by design (D-144). Removing the format check would fail no test, because a malformed token's digest matches no row. Its value is defence in depth: no lookup for strings of another shape, and one spelling per link. A unit test of the policy function would catch it, but `tests/` for the policy is not in the slice's Change list. Recommended: leave it to review, or add a policy unit test in a later slice.
- `guidelines/testing.md`'s trust-boundary rows still list three state-changing routes and four transport routes, and name no case for the new routes. The spec gives that to the guidelines step (`the-way-maintain-testing-guidelines`), not to this slice.
