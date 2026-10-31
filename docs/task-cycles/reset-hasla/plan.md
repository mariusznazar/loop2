# Plan — Samodzielny reset zapomnianego hasła odnośnikiem wysłanym na potwierdzony adres gracza

- Task: `.runs/task-cycles/reset-hasla/task.md`
- Spec: `.runs/task-cycles/reset-hasla/spec.md`
- Base: 95de83b98a5083c516b8fffad3237eaa64cad8d5

"Row n" is a row of the task's *Settlements to record*, "To do n" an item of its *To do*, "Decision
n" a decision of the spec. N1–N6, I1–I3 and F1–F2 are the labels of this plan's table below for
entries that do not exist yet; each gets its identifier when it is written.

## Foundation entries

Every entry is written through the project skill of its element, as
`.the-way/task-cycle/skill/foundation_step.md` gives, on the task branch before Slice 1. The plan
names them and words none.

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| D-44 | decision, changed: the waiting texts of „Wyślij odnośnik” and „Ustaw hasło”, the two new forms on the kitchen-sink page, the sentence in `text-secondary` under the request form | rows 1, 3, 8; To do 11; spec, *Foundation entries* | Slices 8, 9, 10 |
| D-96 | decision, changed: the screen's third state, the form in place of game and forms, also for a signed-in player | rows 1, 6; spec | Slices 8, 9 |
| D-98 | decision, changed: the repeated-password rule holds for the new password, no comparison with the old one | row 7; spec | Slices 3, 6, 9 |
| D-102 | decision, changed: a successful reset clears the address's failures and lock and leaves the client address's | row 15; spec | Slices 3, 6 |
| D-105 | decision, changed: the ending of row 3's sentence is the "try later" of a limit; exhausting the hourly limit is an accepted cost | rows 3, 4; spec | Slice 5 |
| D-106 | decision, projected in part: the hash of a password set by a reset; a change of its wording only where the writer's search finds it needed | To do 5; the task's projected entry (D-106, part) | Slice 6 |
| D-109 | decision, changed: who may ask for a link, and what a reset link alone authorizes | row 2; spec | Slices 5, 6 |
| D-112 | decision, changed: setting a password by a link is one transaction; a session write that names a password hash stores nothing once the account holds another; its *Rationale* gains the second store | rows 12, 14, 19; Decisions 6, 7; spec | Slices 1, 2 |
| D-138 | decision, changed: the server also invalidates sessions at a reset | row 14; spec | Slices 1, 6 |
| D-152 | decision, projected in full: the confirmed address serving recovery and the single-use reset link | To do 12; the task's projected entry | Slices 1, 5, 6 |
| D-153 | decision, projected in full: password-reset messages and the real delivery test before public recovery | To do 12; the task's projected entry; question 11 | Slices 4, 5; H1 |
| D-154 | decision, projected in full: password-reset messages through Nodemailer | To do 12; the task's projected entry | Slice 4 |
| D-155 | decision, changed: a reset link is spent only together with the new password | row 12; spec | Slices 1, 6 |
| D-158 | decision, changed: the fourth paragraph; its *Rejected* no longer holds | row 17; spec | Slice 4 |
| D-160 | decision, changed: the refusal's sentence and place hold for a reset link too | row 10; spec | Slices 6, 9 |
| D-211 | decision, changed: a reset is a third cause of the ended session | row 14; spec | Slice 9 (the page's existing path; no code of its own) |
| N1 — the answer to a request for a link | decision, new: row 3's one answer, leaving before any work on an account, with the accepted cost of a recording commit's stall | row 3; Decision 2; spec | Slices 5, 8 |
| N2 — no limit per client address | decision, new: the accepted cost and its review condition | row 4; spec | Slice 5 |
| N3 — the form of a reset link | decision, new, parallel to D-156 | row 5; spec | Slices 5, 6, 9 |
| N4 — the form „Ustaw nowe hasło” | decision, new: its buttons, its outcomes, and that the page does not check the link first | rows 8, 9, 10, 11, 13; spec | Slices 6, 9 |
| N5 — the order of the set-password route and its gate without a ticket | decision, new | Decisions 4, 5; spec | Slice 6 |
| N6 — the reset message and no message about the change | decision, new: sender, subject, body and the accepted departure from OWASP | rows 16, 18; spec | Slice 4 |
| I1 — `password-reset-verified-email` | invariant, new, projected in full, method `test`. Check: `tests/account-storage.test.mjs` (Slice 1, single use), `tests/http.test.mjs` (Slice 5, a message only to a confirmed address) | To do 12; the task's projected entry | Slices 1, 5 |
| I2 — `password-reset-link` | invariant, new, method `test`. Check: `tests/account-storage.test.mjs` (Slice 1), `tests/http.test.mjs` (Slice 6) | row 19; spec | Slices 1, 6 |
| I3 — `password-reset-ends-sessions` | invariant, new, method `test`, rests on F1 and F2; its sentence speaks of requests that start after the reset. Check: `tests/account-storage.test.mjs` (Slices 1, 2), `tests/http.test.mjs` (Slices 2, 6) | row 14; Decision 7; spec | Slices 1, 2, 6 |
| `account-session-authorization` | invariant, changed, method `test`. Check: `tests/http.test.mjs` (Slices 5, 6) | row 2; spec | Slices 5, 6 |
| `player-server-session` | invariant, changed, method `test`. Check: `tests/account-storage.test.mjs` (Slice 1), `tests/http.test.mjs` (Slice 6) | row 14; spec | Slices 1, 6 |
| `account-session-storage` | invariant, changed, method `test`. Check: `tests/account-storage.test.mjs` (Slice 2) | Decision 7; spec | Slice 2 |
| `account-attempt-limits` | invariant, changed, method `test`. Check: `tests/http.test.mjs` (Slices 3, 6) | row 15; spec | Slices 3, 6 |
| `unblock-restores-no-link` | invariant, changed, method `test`. Check: `tests/account-storage.test.mjs` (Slice 1), `tests/http.test.mjs` (Slice 6) | row 19; spec | Slices 1, 6 |
| `account-email-via-outsider` | invariant, changed, projected in full, method `review`. Check: the review of Slice 4 | To do 12; the task's projected entry; spec | Slice 4 |
| `account-email-nodemailer-starttls` | invariant, changed, projected in full, method `test`. Check: the existing cases of `tests/account-mail.test.mjs`, with the reset message submitted through the same mailer (Slice 4) | To do 12; the task's projected entry; spec | Slice 4 |
| `player-argon2-password-hash` | invariant, projected in part: the hash of a password set by a reset; a change of its wording only where the writer's search finds it needed. Check: `tests/http.test.mjs` (Slice 6) | To do 5; the task's projected entry (part) | Slice 6 |
| F1 — `express-session-end-of-request` | environment fact, new: express-session 1.19.0 at the end of a request touches a session loaded from the cookie whose data did not change and does not save it | Decision 8; spec | Slice 6 |
| F2 — `express-session-regenerated-session-saved-again` | environment fact, new: express-session 1.19.0 saves a session made by `regenerate` again at the end of the request and hands `Store.set` the same object | Decision 7; spec | Slice 2 |

The part map does not change: every new file falls under an existing pattern. No glossary term is
proposed; the writer judges again, as the spec says.

## Slices

### Slice 1 — The reset operations of the account database

- **Goal:** `AccountDatabase` holds `resetLinkWorks(tokenDigest)` and `resetPassword(tokenDigest,
  passwordHash)`, with the exported type `ResetOutcome`, both on one private read of a working link:
  purpose `password-reset`, unspent, `expires_at` after now, account not blocked. `resetPassword` is
  one write transaction: with no working link it changes nothing and returns `invalid`; otherwise it
  replaces the password hash, deletes every session of the account, spends every unspent reset link
  of the account and returns the account's normalized address. Confirmation links stay untouched and
  no schema step is added.
- **Change:** `src/server/database.ts` · `tests/account-storage.test.mjs`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:46-73` Constraints ·
  `.runs/task-cycles/reset-hasla/spec.md:206-238` Decision 6 — The database's two operations ·
  `.runs/task-cycles/reset-hasla/task.md:31-32` To do 6 and 7 ·
  `.runs/task-cycles/reset-hasla/task.md:212-212` Settlements to record, row 12 ·
  `.runs/task-cycles/reset-hasla/task.md:214-214` Settlements to record, row 14 ·
  `.runs/task-cycles/reset-hasla/task.md:219-219` Settlements to record, row 19 ·
  `foundations/decisions.md:1985-1996` D-112 · `foundations/decisions.md:1998-2011` D-114 ·
  `foundations/decisions.md:2549-2562` D-137 · `foundations/decisions.md:2564-2575` D-138 ·
  `foundations/decisions.md:2821-2834` D-155 · `foundations/decisions.md:2836-2849` D-156 ·
  `foundations/decisions.md:2896-2907` D-160 · `foundations/decisions.md:2782-2793` D-152 ·
  `foundations/invariants.md:868-876` player-server-session ·
  `foundations/invariants.md:888-896` email-confirmation-link ·
  `foundations/invariants.md:898-906` unblock-restores-no-link ·
  `foundations/invariants.md:768-776` account-database-schema ·
  `foundations/environment_facts.md:250-254` node-sqlite-database ·
  `foundations/environment_facts.md:316-320` sqlite-wal-concurrency ·
  `foundations/glossary.md:157-161` blocked account ·
  Foundation entries rows I1, I2 and I3 ·
  `guidelines/coding.md` · `guidelines/coding-database-access.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/database.ts`: a token digest from the network reaches the
  reset operations; a block, a later link and expiry have to be read again in the write transaction
- **Checks:** Start from a storage case in which a working reset link changes password, sessions and
  links together, failing at its assertion against an empty `resetPassword`. Then the cases of
  Decision 6's *Proved by*, on real SQLite, each refusal changing nothing: a block committed through
  a second connection and a later link recorded between `resetLinkWorks` and `resetPassword`, a link
  stopped by a block and an unblock after it, expiry at the exact boundary, a confirmation link, an
  unknown digest. Cases carry `invariant: password-reset-link`,
  `invariant: password-reset-verified-email`, `invariant: password-reset-ends-sessions`,
  `invariant: player-server-session` and `invariant: unblock-restores-no-link`; each is seen failing
  once, then passing, with `npm test -- tests/account-storage.test.mjs`. Also `npm run typecheck`
  and `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** D-112 · D-138 · D-155 · I1 · I2 · I3

### Slice 2 — No session from a login or registration in progress at a reset

- **Goal:** Decision 7 stands whole. `saveSession` takes an optional expected password hash through
  `StoredSession`, and its statement stores nothing when the account holds another hash, at either
  store of a session. `SqliteSessionStore.expectPasswordHash(session, passwordHash)` keeps the hash
  in a `WeakMap` beside the session object, so the stored payload stays as D-115 has it, and `set`
  passes it on. `establishSession` takes the account and names the hash: at a login the one the
  password was checked against, at a registration the one just made. The login route, after
  `verifyPassword`, compares the stored hash with the one it checked against; where they differ it
  releases the ticket and answers `invalid-credentials`, before it looks at the block. A store with
  no expectation behaves as at the base.
- **Change:** `src/server/database.ts` · `src/server/session-store.ts` ·
  `src/server/account-routes.ts` · `tests/account-storage.test.mjs` · `tests/http.test.mjs`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:71-73` Constraints, express-session ·
  `.runs/task-cycles/reset-hasla/spec.md:240-325` Decision 7 — A login in progress with the old
  password · `.runs/task-cycles/reset-hasla/task.md:135-135` Questions carried to cycle, first
  question · `.runs/task-cycles/reset-hasla/task.md:214-214` Settlements to record, row 14 ·
  `foundations/decisions.md:1985-1996` D-112 · `foundations/decisions.md:2013-2026` D-115 ·
  `foundations/decisions.md:1905-1916` D-107 · `foundations/decisions.md:1821-1832` D-101 ·
  `foundations/decisions.md:1849-1862` D-103 · `foundations/decisions.md:2028-2041` D-116 ·
  `foundations/decisions.md:2577-2590` D-139 · `foundations/decisions.md:1806-1819` D-100 ·
  `foundations/invariants.md:778-786` account-session-storage ·
  `foundations/invariants.md:858-866` blocked-account-access ·
  `foundations/invariants.md:678-686` player-express-session-sqlite-store ·
  `foundations/environment_facts.md:238-242` express-session-store-contract ·
  `foundations/environment_facts.md:262-266` express-session-cookie-lifecycle ·
  Foundation entries rows I3 and F2 ·
  `guidelines/coding.md` · `guidelines/coding-http-application.md` ·
  `guidelines/coding-database-access.md` · `guidelines/coding-session-store.md` ·
  `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/session-store.ts`, `src/server/database.ts` and
  `src/server/account-routes.ts`: a login in progress at a reset, and every way a session comes to be
  stored
- **Checks:** Start from the route case in the shape of „a block committed while the password is
  checked” (`tests/http.test.mjs:1578`): `resetPassword` commits directly on the database during a
  login's password work, and the login gets 401, no session and no change to the failure count. Then
  the route case with a held mailer, a reset committing while a registration waits on its message:
  201, no session row, and its cookie gets 401. Then the storage cases of Decision 7's *Proved by*:
  an expectation that holds writes, also twice with the same object; after the hash changes, also
  through a second connection, the same object stores nothing; no expectation behaves as at the base.
  Cases carry `invariant: password-reset-ends-sessions` and `invariant: account-session-storage`;
  each is seen failing once, then passing, with `npm test -- tests/account-storage.test.mjs` and
  `npm test -- tests/http.test.mjs`. Also `npm run typecheck` and
  `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** Slice 1

### Slice 3 — The account policy of a reset

- **Goal:** `checkNewPassword` holds the password rules alone and `checkRegistration` is built on it
  with the same results; `passwordResetLinkLifetime` is one hour; `AccountPolicy.clearEmailAttempts`
  empties an address's failures and lock in the entry object that exists, keeps `reserved`, frees the
  entry through `forget` when nothing live remains, creates no entry and changes no client-address
  entry. Comments that speak of "a registration or a resend" follow.
- **Change:** `src/server/account-policy.ts` · `tests/http.test.mjs`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:161-162` Decision 4, step 3 ·
  `.runs/task-cycles/reset-hasla/spec.md:358-386` Decision 9 — Clearing the address's history ·
  `.runs/task-cycles/reset-hasla/spec.md:492-492` Decision 14, the link's lifetime ·
  `.runs/task-cycles/reset-hasla/task.md:30-30` To do 5 ·
  `.runs/task-cycles/reset-hasla/task.md:32-32` To do 7 ·
  `.runs/task-cycles/reset-hasla/task.md:207-207` Settlements to record, row 7 ·
  `.runs/task-cycles/reset-hasla/task.md:215-215` Settlements to record, row 15 ·
  `foundations/decisions.md:1776-1789` D-98 · `foundations/decisions.md:1834-1847` D-102 ·
  `foundations/decisions.md:1849-1862` D-103 · `foundations/decisions.md:2028-2041` D-116 ·
  `foundations/decisions.md:2821-2834` D-155 ·
  `foundations/invariants.md:788-796` account-attempt-limits ·
  `foundations/invariants.md:798-806` account-attempt-tracking ·
  `guidelines/coding.md` · `guidelines/coding-account-policy.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/account-policy.ts`: what lifts a login lock
- **Checks:** Start from a policy case with an explicit clock: a locked address admits a login after
  `clearEmailAttempts`. Then the cases of Decision 9's *Proved by* that need no route: the client
  address's failures still count; a login in progress keeps its reservation, settles once and leaves
  `inFlight` right; clearing an unknown address adds no key; a full table is not disturbed. Cases
  carry `invariant: account-attempt-limits` and, for the table, `invariant: account-attempt-tracking`;
  each is seen failing once, then passing, with `npm test -- tests/http.test.mjs`. Also
  `npm run typecheck` and `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** Slice 2

### Slice 4 — The reset message and the confirmation message's new paragraph

- **Goal:** `composePasswordResetMessage(address, link)` gives the message of To do 8, and
  `composeConfirmationMessage` gains row 17's paragraph before its last one. The texts stay in the
  mail file; no way of reaching Outsider changes, so D-163 asks for nothing beyond H1.
- **Change:** `src/server/account-mail.ts` · `tests/account-mail.test.mjs`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:488-493` Decision 14 — The messages ·
  `.runs/task-cycles/reset-hasla/task.md:33-35` To do 8, 9 and 10 ·
  `.runs/task-cycles/reset-hasla/task.md:216-218` Settlements to record, rows 16, 17 and 18 ·
  `foundations/decisions.md:2866-2879` D-158 · `foundations/decisions.md:2922-2935` D-162 ·
  `foundations/decisions.md:2937-2950` D-163 · `foundations/decisions.md:2795-2806` D-153 ·
  `foundations/decisions.md:2808-2819` D-154 ·
  `foundations/invariants.md:918-926` account-email-via-outsider ·
  `foundations/invariants.md:928-936` account-email-nodemailer-starttls ·
  `foundations/environment_facts.md:322-326` mikrus-outsider-mail ·
  `foundations/environment_facts.md:328-332` nodemailer-require-tls ·
  Foundation entries row N6 ·
  `guidelines/coding.md` · `guidelines/coding-mail-sending.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/account-mail.ts`: a player's address and a link enter a
  message
- **Checks:** Start from the existing case „the submitted message has one recipient, the fixed sender
  and subject and a text body with the link on its own line” for the reset message, on the real loopback SMTP server, failing at
  its assertion against an empty `composePasswordResetMessage`. The confirmation message's expected
  body changes because of row 17, named as `guidelines/testing.md`, *Changing an existing test*,
  asks. The case that nothing the mailer writes to the console holds the password, the login, the
  token or the link reaches the reset message too.
  `npm test -- tests/account-mail.test.mjs`, `npm run typecheck` and
  `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** D-153 · D-154 · D-158 · N6

### Slice 5 — The request for a link

- **Goal:** `POST /api/password-reset-message` stands behind the transport gate and the guards of
  Decision 1, answers a well-formed address with 204 before any work on an account and a badly
  written one with 400 `invalid-email`, and only after the answer, through `setImmediate`, starts
  `sendResetMessage`, which never rejects. `sendConfirmation` becomes `sendLinkMessage(runtime,
  policy, account, kind)`, one path with a table of two kinds, keeping all it does; both confirmation
  routes read its outcome as before. A message goes only to a confirmed address of an account not
  blocked and within the limits of D-105. Comments on "both sending routes" and the five small routes
  follow.
- **Change:** `src/server/account-routes.ts` · `tests/http.test.mjs` · `tests/transport.test.mjs`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:46-73` Constraints ·
  `.runs/task-cycles/reset-hasla/spec.md:77-91` Decision 1 — Two routes, no new refusal code ·
  `.runs/task-cycles/reset-hasla/spec.md:93-134` Decision 2 — The request is answered before any work
  on an account · `.runs/task-cycles/reset-hasla/spec.md:136-155` Decision 3 — One sending path with a
  table of kinds · `.runs/task-cycles/reset-hasla/task.md:18-19` To do 2 and 3 ·
  `.runs/task-cycles/reset-hasla/task.md:137-137` Questions carried to cycle, third question ·
  `.runs/task-cycles/reset-hasla/task.md:202-205` Settlements to record, rows 2 to 5 ·
  `foundations/decisions.md:1791-1804` D-99 · `foundations/decisions.md:1864-1875` D-104 ·
  `foundations/decisions.md:1877-1890` D-105 · `foundations/decisions.md:1931-1942` D-109 ·
  `foundations/decisions.md:1944-1957` D-110 · `foundations/decisions.md:2821-2834` D-155 ·
  `foundations/decisions.md:2836-2849` D-156 · `foundations/decisions.md:2851-2864` D-157 ·
  `foundations/decisions.md:2881-2894` D-159 · `foundations/decisions.md:2896-2907` D-160 ·
  `foundations/decisions.md:2909-2920` D-161 · `foundations/decisions.md:2922-2935` D-162 ·
  `foundations/decisions.md:2937-2950` D-163 · `foundations/decisions.md:108-127` D-05 ·
  `foundations/invariants.md:718-726` account-session-authorization ·
  `foundations/invariants.md:728-736` account-mutation-request-guards ·
  `foundations/invariants.md:738-746` account-request-transport ·
  `foundations/invariants.md:908-916` account-message-limits ·
  `foundations/environment_facts.md:334-338` uri-fragment-in-requests ·
  Foundation entries rows N1, N2, N3 and I1 ·
  `src/server/account-policy.ts` · `src/server/account-mail.ts` ·
  `guidelines/coding.md` · `guidelines/coding-http-application.md` ·
  `guidelines/coding-mail-sending.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/account-routes.ts`: an address from the network without a
  session; enumeration through content or time; tokens and links never reaching logs; a blocked
  account
- **Checks:** Start from the route case of a mailer that never answers: the 204 comes at once.
  Then the same answer and body for an unknown address, an unconfirmed one, a blocked one, one above a
  limit and when recording fails; nothing recorded and nothing handed on for the first four, each
  such case sending a request for a confirmed control address after it and waiting for that message,
  as Decision 2's *Proved by* gives; a forced failed lookup leaves the process alive and one fixed
  line in the log without the address; `invalid-email` hands nothing on; a reset message counts
  against the limits shared with confirmation; a later request stops the earlier reset link; a recorded
  reset link's `expires_at` minus `created_at` is 3 600 000. The new
  route joins the Origin, body, field and transport refusals of `tests/transport.test.mjs` and the
  list of canonical routes at `tests/http.test.mjs:197`. Cases carry
  `invariant: password-reset-verified-email`, `invariant: account-session-authorization`,
  `invariant: account-message-limits`, `invariant: account-mutation-request-guards` and
  `invariant: account-request-transport`; each is seen failing once, then passing, with
  `npm test -- tests/http.test.mjs` and `npm test -- tests/transport.test.mjs`. Also
  `npm run typecheck` and `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** Slice 3 · Slice 4

### Slice 6 — Setting the password by a link

- **Goal:** `POST /api/password-reset` follows the order of Decision 4: transport and guards, exactly
  three string fields, the password rules through `checkNewPassword`, the token's form and
  `resetLinkWorks`, `hashPassword` through the gate, `resetPassword`, then `clearEmailAttempts` and
  204 in the same turn as the commit. Refusals are 400 `invalid-password`, `password-mismatch`,
  `invalid-link` and 429 `too-many-attempts`; no `refusalCodes` entry is added, no ticket taken, and
  a full gate or a refused password leaves the link working. The route never touches
  `request.session`, and a session of the same account authorizes nothing afterwards, however it was
  sent along.
- **Change:** `src/server/account-routes.ts` · `tests/http.test.mjs` · `tests/transport.test.mjs`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:46-73` Constraints ·
  `.runs/task-cycles/reset-hasla/spec.md:77-91` Decision 1 — Two routes, no new refusal code ·
  `.runs/task-cycles/reset-hasla/spec.md:157-184` Decision 4 — The order of the set-password route ·
  `.runs/task-cycles/reset-hasla/spec.md:186-204` Decision 5 — The gate only, no attempt ticket ·
  `.runs/task-cycles/reset-hasla/spec.md:327-356` Decision 8 — The session a set-password request
  brought with it · `.runs/task-cycles/reset-hasla/spec.md:358-386` Decision 9 — Clearing the
  address's history · `.runs/task-cycles/reset-hasla/task.md:30-32` To do 5, 6 and 7 ·
  `.runs/task-cycles/reset-hasla/task.md:136-136` Questions carried to cycle, second question ·
  `.runs/task-cycles/reset-hasla/task.md:202-202` Settlements to record, row 2 ·
  `.runs/task-cycles/reset-hasla/task.md:211-215` Settlements to record, rows 11 to 15 ·
  `.runs/task-cycles/reset-hasla/task.md:219-219` Settlements to record, row 19 ·
  `foundations/decisions.md:1776-1789` D-98 · `foundations/decisions.md:1821-1832` D-101 ·
  `foundations/decisions.md:1834-1847` D-102 · `foundations/decisions.md:1849-1862` D-103 ·
  `foundations/decisions.md:1864-1875` D-104 · `foundations/decisions.md:1892-1903` D-106 ·
  `foundations/decisions.md:1931-1942` D-109 · `foundations/decisions.md:1944-1957` D-110 ·
  `foundations/decisions.md:1972-1983` D-113 · `foundations/decisions.md:1985-1996` D-112 ·
  `foundations/decisions.md:2549-2562` D-137 · `foundations/decisions.md:2564-2575` D-138 ·
  `foundations/decisions.md:2821-2834` D-155 · `foundations/decisions.md:2836-2849` D-156 ·
  `foundations/decisions.md:2896-2907` D-160 ·
  `foundations/invariants.md:638-646` player-argon2-password-hash ·
  `foundations/invariants.md:658-666` password-operation-gate ·
  `foundations/invariants.md:718-726` account-session-authorization ·
  `foundations/invariants.md:728-736` account-mutation-request-guards ·
  `foundations/invariants.md:738-746` account-request-transport ·
  `foundations/invariants.md:788-796` account-attempt-limits ·
  `foundations/invariants.md:858-866` blocked-account-access ·
  `foundations/invariants.md:868-876` player-server-session ·
  `foundations/invariants.md:898-906` unblock-restores-no-link ·
  `foundations/environment_facts.md:262-266` express-session-cookie-lifecycle ·
  Foundation entries rows N3, N4, N5, I2, I3 and F1 ·
  `src/server/account-policy.ts` · `src/server/database.ts:150-221` the connection and its
  transaction · `src/server/passwords.ts` · `src/server/app.ts` ·
  `guidelines/coding.md` · `guidelines/coding-http-application.md` ·
  `guidelines/coding-account-policy.md` · `guidelines/coding-password-hashing.md` ·
  `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/account-routes.ts`: a token and a password from the network
  without a session; token forms, a link of another kind, a blocked account, origin and body guards
- **Checks:** Start from the route case of a working link setting a password and the new password
  logging in. Then every combination of a good and bad link with a good and bad password, with the
  refusal Decision 4 gives, a link that still works where it was good, and no password work where it
  was bad (a full gate does not turn the bad-link answer into 429); a full gate leaves a good link
  working; a hash that fails answers 500 and spends nothing; a token of the other kind, used, expired,
  superseded, of a blocked account and stopped by a block before an unblock gets the one
  `invalid-link`; a block and a later link committed during hashing change nothing and answer
  `invalid-link`; the sessions of Decision 8's *Proved by*, with a session of a second account still
  working; a locked address logging in straight after a reset, and a refused set-password clearing
  nothing. The new route joins the refusals of `tests/transport.test.mjs` and the list at
  `tests/http.test.mjs:197`. Cases carry `invariant: password-reset-link`,
  `invariant: password-reset-ends-sessions`, `invariant: player-server-session`,
  `invariant: unblock-restores-no-link`, `invariant: account-attempt-limits`,
  `invariant: account-session-authorization`, `invariant: player-argon2-password-hash`,
  `invariant: account-mutation-request-guards` and `invariant: account-request-transport`; each is
  seen failing once, then passing, with `npm test -- tests/http.test.mjs` and
  `npm test -- tests/transport.test.mjs`. Also `npm run typecheck` and
  `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** Slice 1 · Slice 2 · Slice 3 · Slice 5

### Slice 7 — The browser client's two calls

- **Goal:** `AccountClient` gains `requestPasswordReset(email)` and `setPassword(token, password,
  passwordConfirmation)`, both through `noContentRequest`, so only 204 counts as success; nothing
  about an account comes back and nothing is kept (D-117).
- **Change:** `src/browser/account-api.ts` · `tests/account-api.test.mjs`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:77-91` Decision 1 — Two routes, no new refusal
  code · `.runs/task-cycles/reset-hasla/spec.md:482-486` Decision 13 — The browser client ·
  `foundations/decisions.md:2043-2056` D-117 · `foundations/decisions.md:1918-1929` D-108 ·
  `foundations/invariants.md:808-816` account-client-requests ·
  `foundations/invariants.md:818-826` account-client-outcomes ·
  `foundations/environment_facts.md:256-260` fetch-same-origin-credentials ·
  `src/browser/AGENTS.md` ·
  `guidelines/coding.md` · `guidelines/coding-browser-api-client.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** Start from the table of `tests/account-api.test.mjs` „each call sends its documented
  method, relative path and JSON body”, failing at its assertion against an empty call, then a
  success status other than 204 and a refusal for each call. Cases carry
  `invariant: account-client-requests` and `invariant: account-client-outcomes`.
  `npm test -- tests/account-api.test.mjs`, `npm run typecheck` and
  `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** Slice 5 · Slice 6, the routes whose contract the client copies by hand (D-117)

### Slice 8 — The third state of the account screen

- **Goal:** Under „Zaloguj się” stands the button of row 1, which opens the form of To do 1 in place of
  both forms; „Wróć do logowania” returns to them. The screen's state is which sections `element`
  holds, and `reset` from outside always returns to the two forms. `accountForm` takes the button's
  text apart from the title and is exported, `registrationProblems` is split so that each rule can be
  used alone with the same result for registration, `send` serves all three forms, and the request
  form joins `forms`, so the two new buttons lock with the rest. A badly written address stands under
  the field and nothing is sent; after 204 the field is empty and row 3's sentence stands in the new
  `createFormNote` of `controls/text-field.ts`, in `text-secondary` with `role="status"`; a failure
  stands as the form's warning and keeps the field. Stylesheet rules read existing tokens only.
- **Change:** `src/browser/view/account-screen.ts` · `src/browser/view/controls/text-field.ts` ·
  `src/browser/styles.css` · `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:453-480` Decision 12 — The third state of the
  account screen · `.runs/task-cycles/reset-hasla/spec.md:495-500` Decision 15 — Kitchen-sink and
  style · `.runs/task-cycles/reset-hasla/spec.md:585-594` Left to the maker ·
  `.runs/task-cycles/reset-hasla/task.md:17-17` To do 1 ·
  `.runs/task-cycles/reset-hasla/task.md:19-19` To do 3 ·
  `.runs/task-cycles/reset-hasla/task.md:201-201` Settlements to record, row 1 ·
  `.runs/task-cycles/reset-hasla/task.md:203-203` Settlements to record, row 3 ·
  `foundations/decisions.md:769-782` D-36 · `foundations/decisions.md:799-812` D-38 ·
  `foundations/decisions.md:814-827` D-39 · `foundations/decisions.md:829-842` D-40 ·
  `foundations/decisions.md:859-872` D-42 · `foundations/decisions.md:874-887` D-43 ·
  `foundations/decisions.md:889-902` D-44 · `foundations/decisions.md:934-947` D-47 ·
  `foundations/decisions.md:1570-1581` D-87 · `foundations/decisions.md:1583-1594` D-88 ·
  `foundations/decisions.md:1746-1759` D-96 · `foundations/decisions.md:1791-1804` D-99 ·
  `foundations/invariants.md:458-466` browser-view-token-values ·
  `foundations/invariants.md:468-476` browser-view-focus-outline ·
  Foundation entries row N1 ·
  `src/browser/AGENTS.md` · `src/browser/view/controls/button.ts` ·
  `src/browser/account-api.ts:95-120` the client's calls ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** Start from a page case in `tests/view/account-screen.test.mjs`: the button opens the
  form in place of both forms. **How the slice shows its states:** one page case on the hand-made
  document model for each state — the form with its empty field, waiting (the field and all the
  screen's buttons locked, the waiting text of row 1), a bad address under the field with nothing
  sent, the sentence of row 3 under the form with the field empty and the form staying, a refusal and
  a lost connection as the warning with the field kept and focus back where the player sent it from,
  and „Wróć do logowania” and `reset` clearing all of it. The cases of registration and sign-in in
  that file stay as they are and protect the split functions. The rendered appearance is not seen in
  this slice: the forms need a configured server, so their samples are seen on the kitchen-sink page
  in Slice 10,
  the layout of the one form in place of two only on the human's visit in H1, and the report marks
  the screenshot unchecked with that reason.
  `npm test -- tests/view/account-screen.test.mjs`,
  `npm test -- tests/invariants/test_browser_view_token_values.py`,
  `npm test -- tests/invariants/test_browser_view_focus_outline.py`, `npm run typecheck` and
  `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** Slice 7

### Slice 9 — The form „Ustaw nowe hasło” and the page's start

- **Goal:** `src/browser/view/password-reset.ts` holds `readResetToken`, the pure `resetOutcome` and
  `createResetScreen`, with the section of To do 4. `start()` gains a branch before the confirmation
  branch: with a reset token the page places the reset screen in `main`, sends no request and builds
  no game. Rules are checked before sending and nothing is sent on a problem; while waiting the fields
  and „Anuluj” are disabled. On `changed`, `refused` and „Anuluj” the screen clears the fragment first
  and then calls `finished`; the page goes on as Decision 10's table gives. Everything else keeps the
  form, the one sentence under it and focus. Stylesheet rules read existing tokens only.
- **Change:** `src/browser/view/password-reset.ts` · `src/browser/view/app.ts` ·
  `src/browser/styles.css` · `tests/view/password-reset.test.mjs` ·
  `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:388-418` Decision 10 — The page's start ·
  `.runs/task-cycles/reset-hasla/spec.md:420-451` Decision 11 — The reset screen ·
  `.runs/task-cycles/reset-hasla/spec.md:585-594` Left to the maker ·
  `.runs/task-cycles/reset-hasla/task.md:20-29` To do 4 ·
  `.runs/task-cycles/reset-hasla/task.md:206-211` Settlements to record, rows 6 to 11 ·
  `.runs/task-cycles/reset-hasla/task.md:213-213` Settlements to record, row 13 ·
  `foundations/decisions.md:769-782` D-36 · `foundations/decisions.md:799-812` D-38 ·
  `foundations/decisions.md:814-827` D-39 · `foundations/decisions.md:829-842` D-40 ·
  `foundations/decisions.md:859-872` D-42 · `foundations/decisions.md:874-887` D-43 ·
  `foundations/decisions.md:889-902` D-44 · `foundations/decisions.md:934-947` D-47 ·
  `foundations/decisions.md:1570-1581` D-87 · `foundations/decisions.md:1583-1594` D-88 ·
  `foundations/decisions.md:1746-1759` D-96 · `foundations/decisions.md:1776-1789` D-98 ·
  `foundations/decisions.md:1931-1942` D-109 · `foundations/decisions.md:2836-2849` D-156 ·
  `foundations/decisions.md:2896-2907` D-160 · `foundations/decisions.md:3544-3559` D-203 ·
  `foundations/decisions.md:3795-3826` D-211 ·
  `foundations/invariants.md:458-466` browser-view-token-values ·
  `foundations/invariants.md:468-476` browser-view-focus-outline ·
  `foundations/invariants.md:998-1006` expired-session-unsaved-progress ·
  `foundations/environment_facts.md:334-338` uri-fragment-in-requests ·
  Foundation entries rows N3 and N4 ·
  `src/browser/AGENTS.md` · `src/browser/view/email-confirmation.ts` ·
  `src/browser/view/account-screen.ts` · `src/browser/view/controls/button.ts` ·
  `src/browser/view/controls/text-field.ts` · `tests/view/email-confirmation.test.mjs` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** Start from the unit case of `readResetToken` in `tests/view/password-reset.test.mjs`,
  then `resetOutcome` for each answer. Page cases stand in `tests/view/account-screen.test.mjs`
  beside the confirmation's, which hold the hand-made document model. **How the slice shows its
  states:** one page case for each — the form for a signed-out and a signed-in player with no request
  sent and no game built and no save; waiting; a problem under its field with nothing sent; `changed`
  (the fragment gone, row 9's sentence in `positive` above the forms, no session check, focus on the
  address field); `refused` (the fragment gone, the usual session check, row 10's sentence in
  `warning` above the forms or above the game); „Anuluj” (the fragment gone, the usual session check,
  no sentence); a lost connection, a timeout, 429 and 500 keeping form, fragment and link, with the
  sentence under the form and focus back. The rendered form is looked at in a browser: `npm run dev`
  without account settings serves the page, and `/#reset-password=x` shows the form with no server
  answer needed (`LOOP2_LISTEN_PORT` picks a free port); the report names what was seen, or marks it
  unchecked with its reason where the harness has no browser. The sample of the form with a refusal
  comes in Slice 10.
  `npm test -- tests/view/password-reset.test.mjs`,
  `npm test -- tests/view/account-screen.test.mjs`,
  `npm test -- tests/view/email-confirmation.test.mjs`,
  `npm test -- tests/invariants/test_browser_view_token_values.py`,
  `npm test -- tests/invariants/test_browser_view_focus_outline.py`, `npm run typecheck` and
  `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** Slice 7 · Slice 8

### Slice 10 — The states on the kitchen-sink page and in the styleguide

- **Goal:** To do 11 stands, D-44 having been written with the entries. `formSample` of the
  kitchen-sink page shows both new forms waiting and with a refusal under them, and the request form
  with its sentence, importing `createFormNote` from `controls/text-field.ts`. The styleguide's rule
  „States of shared controls” holds the two waiting texts and the sentence in `text-secondary` under
  the request form as what it is, no refusal, and its rule „The kitchen-sink page”, which lists the
  forms the page shows, holds the new ones. Follows the column „The cycle's author” of the skill
  `the-way-maintain-styleguide` and its template's section „Writing the file”; it settles no meaning
  of its own, and one the task did not settle stops the slice.
- **Change:** `src/browser/kitchen-sink/kitchen-sink.ts` · `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:495-500` Decision 15 — Kitchen-sink and style ·
  `.runs/task-cycles/reset-hasla/spec.md:578-580` Foundation entries, guidelines ·
  `.runs/task-cycles/reset-hasla/task.md:36-36` To do 11 ·
  `.the-way/product-guidelines/styleguide/SKILL.md:33-41` Where the skill works ·
  `.the-way/product-guidelines/styleguide/template.md:172-183` Writing the file ·
  `foundations/decisions.md:799-812` D-38 · `foundations/decisions.md:814-827` D-39 ·
  `foundations/decisions.md:829-842` D-40 · `foundations/decisions.md:889-902` D-44 ·
  `foundations/decisions.md:904-917` D-45 · `foundations/decisions.md:1570-1581` D-87 ·
  `foundations/decisions.md:1583-1594` D-88 ·
  `foundations/invariants.md:498-506` application-build-kitchen-sink ·
  `src/browser/AGENTS.md` · `src/browser/view/account-screen.ts` ·
  the reset screen's file, as Slice 9 created it ·
  `src/browser/view/controls/text-field.ts` · `src/browser/kitchen-sink/kitchen-sink.css` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** **How the slice shows its states:** the page itself: `node scripts/kitchen-sink.mjs
  --build-only` builds it and `npm run kitchen-sink` serves it on the developer's machine; the
  report names what was seen of each new sample and its text roles, or marks it unchecked with its
  reason where the harness has no browser.
  `npm test -- tests/invariants/test_application_build_kitchen_sink.py`,
  `npm test -- tests/invariants/test_browser_view_token_values.py`,
  `npm test -- tests/invariants/test_browser_view_focus_outline.py`,
  `python -B .the-way/elements/common/foundation_check.py`, `npm run typecheck` and
  `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** Slice 8 · Slice 9

### Slice 11 — The guidelines and the deploy skill after the change

- **Goal:** To do 14 stands. The rule „Trust boundaries” of `guidelines/testing.md` holds a row for the
  request for a link and a row for setting a password, both routes in the rows of Origin and JSON
  requirements, the route counts that changed, the new cases by their names in its row of
  `src/server/`, and the identifiers the change adds in its *Decision* and *Invariant* fields. Follows
  the column „The cycle's author” of the skill `the-way-maintain-testing-guidelines` and its
  template's section „Writing the file”; it settles no choice of its own, and one the task did not
  settle stops the slice. The coding guidelines follow what the entries and the code now say, as
  `.the-way/product-guidelines/reading.md` places in the current task, using only meanings the
  decisions already carry: `guidelines/coding-session-store.md`, *Callback po operacji*, names the
  expected password hash; `guidelines/coding-database-access.md`, *Stan konta w instrukcji zapisu*,
  names the password hash beside the block; `guidelines/coding-mail-sending.md`, *Wzorzec rodzaju* and
  *Jedna wiadomość dla jednego odbiorcy*, name the reset message; `guidelines/coding-browser-module.md`
  names `createFormNote` beside `createFormWarning`, and its *Files of this kind* gains the screen
  modules only where its wording says it lists them all. `.claude/skills/loop2-deploy/SKILL.md`, in
  *Account mail*, says the application sends both messages and that an agent does not press
  „Wyślij odnośnik” on the test server either; `.agents/skills/loop2-deploy/SKILL.md` follows word for
  word where that copy holds the same passage.
- **Change:** `guidelines/testing.md` · `guidelines/coding-session-store.md` ·
  `guidelines/coding-database-access.md` · `guidelines/coding-mail-sending.md` ·
  `guidelines/coding-browser-module.md` · `.claude/skills/loop2-deploy/SKILL.md` ·
  `.agents/skills/loop2-deploy/SKILL.md`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:77-91` Decision 1 — Two routes, no new refusal
  code · `.runs/task-cycles/reset-hasla/spec.md:578-580` Foundation entries, guidelines ·
  `.runs/task-cycles/reset-hasla/task.md:39-39` To do 14 ·
  `.the-way/product-guidelines/testing/SKILL.md:37-45` Where the skill works ·
  `.the-way/product-guidelines/testing/template.md:264-273` Writing the file ·
  `.the-way/product-guidelines/coding/SKILL.md:37-41` Where the skill works ·
  `.the-way/product-guidelines/coding/template.md:206-214` Writing the files ·
  `foundations/decisions.md:1864-1875` D-104 · `foundations/decisions.md:1931-1942` D-109 ·
  Foundation entries rows N1, N4, N5, I1, I2 and I3 ·
  `tests/http.test.mjs` · `tests/transport.test.mjs` · `tests/account-storage.test.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`. Every case the table names is
  looked up by its name in the test file it names, and the search is reported. A search of the five
  guideline files for each identifier they newly cite finds it in the foundation.
- **Depends on:** Slice 1 · Slice 2 · Slice 4 · Slice 5 · Slice 6 · Slice 8

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Required outcome: a player with a confirmed address sets a new password by a single-use link sent there | Slices 1–9; entries D-152, I1, I2 |
| Required outcome: self-service reset counts as working only once the reset message from the intended container reached an external inbox | H1 (below); D-153 |
| To do 1, the button and the form „Nie pamiętam hasła”, D-109 | Slices 5, 7, 8; D-96, D-44, D-109 |
| To do 2, recording and sending only to a confirmed address, limits shared | Slices 1 (the read of a working link), 3 (the lifetime), 5; D-105, D-155, I1 |
| To do 3, the one sentence, no wait on the mail server, a badly written address | Slices 5, 8; N1, N2, D-105 |
| To do 4, the link, its form and its endings | Slices 1, 5, 6, 9; N3, N4, D-155 |
| To do 5, password rules and hash | Slices 3, 6; D-98, D-106, `player-argon2-password-hash` |
| To do 6, a blocked account's link changes nothing | Slices 1, 6; D-160, `unblock-restores-no-link`, I2 |
| To do 7, sessions end, nobody signed in, history and lock cleared | Slices 1, 2, 3, 6; D-138, D-211, D-102, `player-server-session`, `account-attempt-limits`, I3 |
| To do 8, the reset message | Slice 4; N6, D-154 |
| To do 9, the confirmation message's paragraph | Slice 4; D-158 |
| To do 10, no message about the change | Slice 4 adds none; N6 |
| To do 11, D-44, the styleguide's rule and the kitchen-sink page | D-44; Slices 8, 9, 10 |
| To do 12, the entries of the plan and *Settlements to record* | the whole table of *Foundation entries* |
| To do 13, delivery and use from the deployed container | H1 (below); no slice performs it; Slice 4 proves the submission on a real loopback SMTP server |
| To do 14, the table of the testing guidelines | Slices 5, 6 (cases with their marks); Slice 11 |
| Guidelines the change makes narrower (`product-guidelines/reading.md`), and the deploy skill's *Account mail* | Slice 11 |
| Question carried: a login in progress at a reset | Slice 2; D-112, F2, I3 |
| Question carried: the link checked before password work and again in the transaction | Slices 1, 6; N5, D-112 |
| Question carried: the answer does not wait, sending stays bounded and logged | Slice 5; N1 |
| Row 1 | D-96, D-44; Slice 8 |
| Row 2 | D-109, `account-session-authorization`; Slices 5, 6 |
| Row 3 | N1, D-105, D-44; Slices 5, 8 |
| Row 4 | N2, D-105; Slice 5 (no limit is added) |
| Row 5 | N3; Slices 5, 9 |
| Row 6 | D-96; Slice 9 |
| Row 7 | D-98; Slices 3, 6, 9 |
| Row 8 | D-44, N4; Slice 9 |
| Row 9 | N4; Slice 9 |
| Row 10 | N4, D-160; Slices 6, 9 |
| Row 11 | N4; Slices 6, 9 |
| Row 12 | D-155; Slices 1, 6 |
| Row 13 | N4; Slice 9 (no request sent), and no route added in Slices 5, 6 |
| Row 14 | D-138, D-211, D-112, `player-server-session`, I3; Slices 1, 2, 6 |
| Row 15 | D-102, `account-attempt-limits`; Slices 3, 6 |
| Row 16 | N6; Slice 4 |
| Row 17 | D-158; Slice 4 |
| Row 18 | N6; Slice 4 adds none |
| Row 19 | I2, `unblock-restores-no-link`, D-112; Slices 1, 6 |
| Projected in full: D-152, D-153, D-154, `password-reset-verified-email`, `account-email-via-outsider`, `account-email-nodemailer-starttls` | *Foundation entries*; Slices 1, 4, 5, 6 |
| Projected in part: D-106, `player-argon2-password-hash` | *Foundation entries*; Slice 6 |
| Spec, entries beyond the rows: `account-session-storage`, F1, F2, N5 | *Foundation entries*; Slices 2, 6 |
| Checks carried by a move of the pin | none; the pin did not move |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The database's reset operations are Slice 1, so the review that also judges the *Foundation entries* reads D-112, row 19 and the new invariants beside the code that makes them true | the small mail slice first — its review would judge those entries with nothing to hold them against | a heavier first review |
| Decision 7 stands whole in Slice 2, storage and routes together, since the guard is judged only as a chain from the route's expectation to the statement | the storage half with Slice 1 and the routes with Slice 6 — each review would see half of an argument | a slice of five files, two of them long tests |
| Slice 3 keeps the policy apart from the routes that use it, and its cases stay in `tests/http.test.mjs`, where the policy's cases stand | a new `tests/account-policy.test.mjs` — a file no pattern of the part map claims, against the spec's "Part map: no change" | none: only where a few cases stand |
| The messages stay a slice of their own | with the request route — a reviewer of the route would also compare a text with its source word by word | one more review of a small slice |
| The set-password route comes after the request route, so that its tests can ask for a link through the route | the reverse order — tests would have to record links directly | none: both are made before the review of the whole change |
| The browser client is its own slice, with no review of its own, ahead of the screens | inside Slice 8 — a screen's slice would then also carry a contract with the server | none |
| Unit cases of `password-reset.ts` stand in the new `tests/view/password-reset.test.mjs`, page cases in `tests/view/account-screen.test.mjs`, which holds the hand-made document model | every case in a new file — a copy of about 360 lines of test model | a long file grows by some cases |
| D-44 is written in the foundation step, and the styleguide's text and the page in Slice 10, after the screens they describe | all of To do 11 before the screens — the page imports `createFormNote` and shows forms that would not exist yet; all of it last — the styleguide wants a changed meaning approved before the code that uses it | the styleguide lags the code by two commits on the task branch |
| To do 11 and To do 14 go through their skills as the column „The cycle's author” gives, since both skills work inside a refinement and settle with the human; here the human settled them in the task | running the skills' steps in the cycle — they ask the human, which the cycle does not | none where the task settled the meanings; a gap stops the slice at a blocked draft request |
| Slice 11 comes last, because its table names cases by their final names | together with Slice 5 or 6 — a second edit of the same table, and names that may still move | none |
| Added by the orchestrator in the plan's review: the four coding guideline files and the deploy skill's two passages stand in Slice 11, so that the review of the whole change judges them | leaving the guidelines as they are and naming them in the request, as the planner proposed — `product-guidelines/reading.md` places an extension of existing guidelines in the current task unless the human separates it; fixing them at the return step — a later, separate review for a small edit | a few lines more in a slice of its own |
| Every slice stands on `cheaper`: the spec settles the design and the review of each risky slice catches the rest; the cycle's retry raises the class where one fails | `same` for Slices 2 and 6 — a higher cost on a design already reviewed | one retry on a higher class |

## What H1 needs

H1 (To do 13, the task's *Human actions*) is the human's: in the cycle, before the merge, outside the
window of task 17 (*Context*, plan change log, line 304). No slice and no agent performs it (D-12):
no agent deploys, presses „Wyślij odnośnik” on the test server or sends mail through Outsider.

What the cycle has ready when H1 is asked for:

- the reviewed head of `task/reset-hasla`, pushed, its full 40-character commit named in the request,
  with the gate's result beside it;
- the reset message proved on a real loopback SMTP server (Slice 4), so that H1 proves only what no
  test here can: delivery from the deployed container to an external inbox (D-163);
- no schema step and no new setting, so nothing on the server has to be prepared, the database stays
  at its version, and a rollback by `loop2-deploy <earlier sha>` or a merge of anything else starts
  normally.

What H1 will need from the human:

- the window of task 17 not open: its H5 not done, or task 17 merged. A deployment of either branch and
  any merge replace the same image, so a merge between H1's deployment and its end takes away the code
  the trial stands on, and the trial starts again;
- the steps „Script”, „Session keys and SMTP password” and „Deployment” of *Deploying a request head
  and accepting it* in `.claude/skills/loop2-deploy/references/setup_and_secrets.md`, with the head's
  commit and `SSH_ORIGINAL_COMMAND` unset;
- an account with a confirmed address on an external mailbox and not blocked; the test account of task
  20's H4 will do, its address in the owner's private note and never in a file here;
- at `https://loop2.mariusznazar.com/`: „Nie pamiętam hasła”, the address, „Wyślij odnośnik”, row 3's
  sentence; the message received as To do 8 gives it; its link opened, the form, a new password twice,
  „Ustaw hasło”, row 9's sentence; a login with the new password;
- to mind: three messages an hour for one address (D-105), and each new request stops the earlier link;
  the account's sessions end, so another open browser meets the sentence of D-211; the account's new
  password replaces the one in the private note;
- where no message comes: the answer on the page says nothing by design (row 3). The cause stands in the
  bounded service logs as `Account mail failed: <code>` or `Account mail missed its deadline`, which an
  agent may read and read out by the table in `.claude/skills/loop2-deploy/SKILL.md`;
- the same visit is the manual check of real events, focus and the changed look on this path (D-75,
  D-87, D-88), which no test here proves: the forms by keyboard, focus after a refusal, and the one
  form standing in place of the two, which no page reachable without a configured server shows.

The human's result goes into the cycle's record as H1. A failed trial stops the merge: without a switch
in code the merge alone would turn the reset on (question 11).
