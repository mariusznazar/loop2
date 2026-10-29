PASS 5ab1b5a

# Review — Slice 5 of `potwierdzenie-adresu` (range `b4e50b2..5ab1b5a`)

Reviewer: fresh agent, did not make the change. Method: `.the-way/task-cycle/review/SKILL.md`.
`git rev-parse HEAD` in the worktree = `5ab1b5a58cc03e0836501f70b8805ae34281a6ab`, the head given;
one commit in the range; changed files = the slice's *Change* (`src/server/account-routes.ts`,
`src/server/account-policy.ts`, `tests/http.test.mjs`, `tests/transport.test.mjs`).

Counts: blocking 0 · Minor 4 · out of scope 0 (Declined to judge: 4 lines).

## Findings

### Critical

None.

### Important

None.

### Minor

**m1 — A block landing during a registration's send makes the end-of-response session save fail: a stack trace in the log and the connection destroyed after the 201 is written.**
Place: `src/server/account-routes.ts:415-423` (registration awaits `sendConfirmation` between
`signIn` and `response.status(201).json`), with the session middleware of `src/server/app.ts:26-37`.
What: after `regenerate` + explicit `save`, express-session 1.19.0 still saves again in its `res.end`
wrapper (the regenerated session's id differs from the original cookie id, so `shouldSave` is true;
`node_modules/express-session/index.js:343-352`). When the owner's block commits during the send,
`AccountDatabase.saveSession` refuses (`src/server/database.ts:293`, "Session cannot be replaced"),
the store calls back with the error synchronously, the wrapper ends the response and defers
`next(err)`; the app's error handler sees `headersSent` and passes on to Express's final handler,
which logs `err.stack` and destroys the socket.
Why it matters: the session row is correctly not written (D-112's block guard holds, D-137 holds:
the next request gets 401), the 201 body is fully handed to the socket before the destroy (the
store's callback is synchronous, so `_end` runs before the deferred `next`), and the logged stack holds
no token or address. The effect is a stack trace in the operator's log for an expected race, and a
theoretical truncation of the 201 if the socket's buffer were backed up when it is destroyed. The
same path existed before this slice, but its window grew from microseconds to the send's deadline
(up to 10 s). A fix lies outside this slice's files (`app.ts` or the session layer).
Evidence: my run of `npm test -- tests/http.test.mjs` at the head prints the stack twice (cases
"a block committed through another connection while the message is on its way …" — both the
on-its-way registration and the block-before-recording registration), all 33 cases pass; the
executor's own *Problems* names it. Recommendation: accept for this slice; the cycle may decide
whether the end-of-response save should stay quiet for a blocked account.

**m2 — The token format check `isLinkToken` has no test that fails when it is removed.**
Place: `src/server/account-policy.ts:33-41`, used at `src/server/account-routes.ts:295-298`.
What: spec Decision 2 requires the server to accept "a token only of exactly that form (43
base64url characters that decode to 32 bytes and encode back to the same text)". Through the route
every non-canonical string still gets `invalid-link` without the check, because its SHA-256 digest
(over the text) matches no row — including the "another spelling of the same bytes" case the test
lists (`tests/http.test.mjs`, case "a link confirms its own account once …"). So the route test
protects the outcome but not the check; deleting `isLinkToken` passes every test.
Why it matters: low — the protected behaviour (one refusal, nothing changed) holds without the check;
its value is no database lookup for strings of another shape. A unit test of the policy function
would protect it; `tests/` for the policy is not in this slice's *Change*.
Evidence: reasoning over `linkTokenDigest` (`account-policy.ts:43-46`) and `confirmEmailAddress`
(`database.ts:431-441`, lookup by digest primary key); the executor reports the same.

**m3 — The route's sending deadline sits on `AccountPolicy` as a constructor option.**
Place: `src/server/account-policy.ts:12, 121-123, 135-150`; read at `account-routes.ts:244`.
What: D-116 describes the account-policy kind as credential checks and attempt admission against a
supplied clock; spec Decision 12 lists for `account-policy.ts` the D-105 numbers and window, the link
lifetime and the token functions — not a sending deadline. `guidelines/coding-mail-sending.md`
(*Połączenie*) puts the overall send limit as an option of the mailer's constructor. The slice
now has two independent 10 s defaults (`account-mail.ts:14` and `account-policy.ts:12`).
Why it matters: no user effect today (the route's bound is needed so a never-answering mailer cannot
hang a registration — D-151's "route test whose stand-in mailer never answers" — and the executor's
own-work check shows the real mailer ends first at 5 s on a silent server). The consequence is for
the code: the exemplar of the account-policy kind gains a mail-timing option that later copies of
the kind will follow, and the two deadlines must be kept in step by hand. Moving it is local to the
policy, the route and the http fixture, as the executor notes under *Choices*.
Evidence: the files and lines above; `guidelines/coding-account-policy.md` *Zegar w testach* (options
are the clock and the table capacity).

**m4 — No test asserts that a confirmation without a session creates no session and sets no cookie.**
Place: `tests/http.test.mjs` (confirmation cases) and `tests/transport.test.mjs` ("transport refuses
both link routes …", the valid-transport control at the end).
What: spec Decision 4 says the confirmation route needs no session "none created". The control
confirmation without a cookie checks only `204`; neither file checks `set-cookie` or the session
count on that path. The code is right (`saveUninitialized: false`, the handler never touches
`request.session`), so this is coverage, not a defect.
Evidence: the two test passages named.

## Checked and found as claimed

- Both routes behind the transport gate (`router.all(Object.values(paths))`, `account-routes.ts:253`),
  `no-store`, the unconfigured 503, and the D-104 guards (`account-routes.ts:267-276`); the guard case
  of `tests/transport.test.mjs` runs every Origin, media, encoding and body variant against both new
  routes with no link, confirmation or message after each refusal, and the new transport case refuses
  six transport variants per route before session, link or mailer.
- Confirmation: body exactly `{ "token" }` (`stringFields`), else 400 `invalid-request`; one 400
  `invalid-link` with „Odnośnik jest nieważny albo wygasł.” for malformed, unknown, used, other
  spelling, expired, other purpose, blocked and after unblocking; 204 only on `confirmed`; confirms
  the link's account, not a session's sent along. A database error falls to the 500 of the error
  handler, as spec Decision 4 says.
- Resend: body exactly `{}` before the session; 401 `unauthenticated` for absent, unknown, forged,
  deleted-by-block and row-past-the-guard sessions, and after unblocking; 409
  `email-already-confirmed`; the address is always the stored account's; issue finding the account
  blocked → 401; 200 with `sent`/`limited`/`failed` otherwise.
- Registration: the send step runs only after `signIn` stored the session; refused (invalid,
  duplicate, full gate) and unstored-session registrations record no link and hand nothing on; 201
  with `emailConfirmed: false` and `confirmationMessage` for `sent`, `failed`, a rejecting mailer, a
  silent mailer past the shortened deadline, an issue that throws (no message handed on), `limited`
  (30 in total) and a block before issuing (`failed`). `GET /api/account` and `POST /api/session`
  carry `emailConfirmed`.
- K1 settlement / D-143: no retire step after `sent`; the issue itself spends earlier links, and a
  failed send's link supersedes earlier ones (case "a later message's link stops earlier ones, also
  when its sending failed …").
- D-149 / `account-message-limits`: a failed send counts; three per account and thirty in total refuse
  with nothing handed on or recorded; both free again after the hour.
- `unblock-restores-no-link`: a block committed through a second `AccountDatabase` while the stand-in
  holds its answer spends the link, which stays dead after unblocking.
- Logging: only fixed lines (`Account mail missed its deadline`, `Account mail failed: unknown`,
  `Account confirmation link could not be recorded`); the log-and-response case captures every console
  method and finds no token and no `confirm-email` in any line, body or header.
- Policy: `accountMessageLimits` 1 h / 30 / 3, `confirmationLinkLifetime` 24 h, token 32 random bytes
  base64url, SHA-256 digest; pure, no HTTP or database.
- The changed existing tests add only the new required fields (`emailConfirmed`,
  `confirmationMessage`) and widen the unconfigured-503 case to six routes — a requirement change with
  its source (spec Decision 4), no weakened assertion. The invariant tests changed:
  `account-session-authorization` (new case in `tests/http.test.mjs`),
  `account-mutation-request-guards` (guard case in `tests/transport.test.mjs` extended to five routes),
  `account-request-transport` (new case in `tests/transport.test.mjs`); new markers
  `account-message-limits`, `email-confirmation-link`, `unblock-restores-no-link`,
  `blocked-account-access`. Expected values come from the spec, D-143, D-105 and the fixed Polish
  sentence, not from product output.
- Own-work check: the executor's requirement (registration ends within the client's 15 s with the
  production deadline and a silent mail server) is where the change is weakest, and its scratch run
  (201 `failed` after 5.2 s) would catch it unmet.
- Irreversible operation: this slice adds no schema step; it only uses the step of Slice 1.

## Declined to judge

- `guidelines/testing.md` trust-boundary rows that still list three state-changing and four transport
  routes — Slice 10's *Change* (`plan.md:310-313`), not this slice.
- `tests/account-storage.test.mjs` and `tests/startup.test.mjs` content — unchanged by this range;
  executor reports them green.
- The browser's handling of the new bodies and outcomes — Slices 6–7.
- Mass registration with foreign addresses exhausting D-105's 30 an hour for everyone — a property of
  D-105 as decided, not of this change.

## Checks run

All in a separate detached worktree of `5ab1b5a` under the session scratchpad, with `node_modules`
linked read-only from the reviewed worktree; the worktree and link were removed afterwards and the
reviewed worktree stayed clean at `5ab1b5a`.

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/http.test.mjs` | 0 | 33 pass; the m1 stack trace printed twice |
| scratch mutation: `sendConfirmation` returns the mailer's promise without `boundedSending`, then `npm test -- tests/http.test.mjs` | 1 | 2 fail: "registration answers 201 …" and "no response and no line of the server's log …" (silent mailer hangs) — the deadline is protected |
| scratch mutation: registration runs `sendConfirmation` before `signIn`, then `npm test -- tests/http.test.mjs` | 1 | 2 fail: "a refused registration or one whose session is not stored …" and the block case — the ordering is protected |
| `npm test -- tests/transport.test.mjs` | 0 | 8 pass |
| `npx eslint --max-warnings 0` on the four files | 0 | |
| `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on the four files | 0 | |
| `python -B .the-way/elements/common/foundation_check.py` (in the reviewed worktree, read-only) | 0 | `0 errors`; `git status` clean after |
| Manual: read the executor's `slice5-logs/http-red.log` and `transport-red.log` | — | the 14 http and 2 transport cases named fail before the code (404 / missing fields), as reported |

Not run: `tests/account-storage.test.mjs` and `tests/startup.test.mjs` (files unchanged by the range;
executor's runs are claims), `npm run typecheck` (eslint's type-checked rules ran on the changed
files), the whole gate (the cycle's own run).

## Reaches beyond the dispatch

- `src/server/database.ts` — `issueLink`, `confirmEmailAddress`, `blockAccount`, `unblockAccount`,
  `saveSession`, `renewSession`: the contracts the routes call, to judge outcome mapping and m1.
- `src/server/session-store.ts` `set`/`touch`/`complete`: whether the store's callback is synchronous
  and whether a touch of a deleted session throws (m1).
- `node_modules/express-session/index.js:260-370` (1.19.0) and `node_modules/finalhandler/index.js`
  around line 118: how a failed end-of-response save is handled after headers were sent (m1).
- `.runs/task-cycles/potwierdzenie-adresu/plan.md` slice headings and Slice 10's goal: whether the
  testing-guidelines rows belong to a later slice.
- The executor's logs in `.runs/task-cycles/potwierdzenie-adresu/slice5-logs/`: the red runs claimed.
