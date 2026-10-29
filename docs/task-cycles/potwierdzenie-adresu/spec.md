# Spec — Potwierdzenie adresu e-mail gracza odnośnikiem z wiadomości wysłanej z kontenera loop2 przez Outsidera

- Task: `.runs/task-cycles/potwierdzenie-adresu/task.md`
- Open choice: the eight *Questions carried to cycle* of the task — where the D-105 counters
  stand, how the link token is stored and what the link looks like, how confirmation state and
  links enter schema version 3, how the browser learns the outcome of the send at registration,
  the roles of „Potwierdzanie adresu…” and „Wysłaliśmy odnośnik potwierdzający na <adres>.”, the
  layout of the message body, and the two delivery questions settled by H4 — together with the
  mechanisms the accepted settlements K1–K7, K9 and K10 leave open: the session-less confirming
  request under D-104, the startup configuration of mail, the SMTP password's path to the
  application, blocking's effect on links, the header row, and how mail code is tested without
  the real Outsider.

## Intent

After registration the account server sends the player a plain-text message through Mikrus
Outsider whose link, opened in a browser, marks the account's email address as confirmed; the
player plays meanwhile as today. The change lays the mailbox use, the SMTP connection, the
credential file, the send limits and the link store that password reset (task 21) reuses, and
moves the account database to schema version 3.

## Goals and non-goals

Goals:

- A confirmation message is sent once an account is created and on „Wyślij ponownie”; account
  creation and entry into the headquarters never depend on its success (To do 1).
- A link works once, for 24 hours, only until a later message of its account has been sent
  successfully, and only while the account is not blocked (To do 5, 16; K1, K10).
- The page confirms from the link without a session, through a request meeting D-104 (To do 3,
  4; K2).
- The header row of an unconfirmed signed-in player, its resend button with „Wysyłanie…”, and the
  three outcome sentences (To do 6, 7, 8; K3, K4).
- D-105 limits shared by every account message, durable across restarts (To do 7).
- Production startup requires the mail settings and the SMTP password file (To do 10; K6, K7).
- Existing accounts keep every value and stay unconfirmed (To do 9).
- The deploy skill, the new kind's coding guidelines, the testing guidelines and the styleguide
  say what this change adds (To do 8, 11, 12, 13).

Non-goals:

- Password reset, its message, its route and its link handling (task 21). The schema admits the
  purpose `password-reset` (Decision 3) and the limits count every purpose, but no reset code is
  written.
- Changing an account's address (K9); deleting accounts.
- HTML mail, attachments, a mail queue, retries of a failed send, connection pooling.
- Verifying the SMTP connection at startup.
- Reacting to a link pasted into an already open game tab (a fragment change without reload);
  the email client opens a new page.
- Any action on the server, in Outsider or in DNS: H4 and every server change are the human's
  (D-12).

## Constraints

- The frozen task: To do 1–16, answers 1–10, K1–K7, K9, K10, the fixed Polish sentences, sender,
  subject and body (K5), and the order of cycles: task 19's schema version 2 is merged at base
  `7a633a7`, so this change adds version 3 (answer 6).
- D-104 and `account-mutation-request-guards`: every new state-changing route takes exactly the
  configured Origin and a JSON body of expected fields, refused before mutation.
- D-109 and `account-session-authorization`: identity comes only from the stored session; this
  change adds two authorities (the link alone confirms its own account; a session sends a message
  to its own account's address), which change D-109 (K2, K3).
- D-110 and `account-request-transport`: the new routes stand behind the same transport gate.
- D-112 and `guidelines/coding-database-access.md`: one step per version appended at the end,
  steps 1 and 2 untouched, the move keeps every account and session value, no transaction spans
  an `await` or an HTTP response.
- D-111 and `account-startup-configuration`: settings are validated before listening, errors name
  the setting or path, never contents; the wholly unconfigured non-production mode stays (To do
  10).
- D-13, D-17, `loop2-host-sharing`, `compose-file-secret-permissions`: a file-backed secret,
  read-only, granted only to its consumer, keeping host owner root, group 1000, mode 0440; no
  credential in environment, arguments, logs, responses or repository files.
- D-117 and `account-client-outcomes`/`account-client-requests`: the browser reads typed results,
  relative `/api/` paths, no redirect, a bounded wait (15 s default, `src/browser/account-api.ts:72`).
- D-86 and `src/server/app.ts:58`: only files of the public directory exist; the link must hit
  `/`.
- D-39, D-40, D-44, the styleguide's „Each role in its meaning” and „States of shared controls”:
  shared controls only; waiting labels; refusal sentences in `warning`.
- D-96 and `email-verification-nonblocking`: entry without confirmation. D-96's "immediately
  enters the headquarters" is read as "without a confirmation step"; the bounded wait of Decision
  5 is the cost the human accepted in answer 8.
- OWASP (task Context): tokens single-use and time-limited; no token or full link in logs.
- Nodemailer 10 (registry: `nodemailer` latest 10.2.1, published 2026-10-22, no runtime
  dependencies, types bundled): with `requireTLS` the client sends STARTTLS whether or not it is
  advertised and fails the connection when the upgrade does not happen (source of 10.2.1,
  `dist/cjs/smtp-connection/index.js` around lines 141–147 and 1516–1537). Its per-phase timeouts
  (`connectionTimeout`, `greetingTimeout`, `socketTimeout`) do not bound a whole send.
- The code as it stands: `AccountDatabase` owns all SQL (`src/server/database.ts`), routes
  sequence work (`src/server/account-routes.ts`), `AccountPolicy` holds limits as constants with a
  supplied clock (`src/server/account-policy.ts`), the header is built in
  `src/browser/view/app.ts:30`–`36`, waiting text in `text-secondary` exists as
  `.session-check-text` (`src/browser/styles.css:186`).
- Production containers in tests are started by `tests/invariants/account_container_support.py`
  with explicit production settings; they will need the mail settings too.

## Decisions

> **Settled after review by the orchestrator (2026-10-29, cycle Q2 revised).** The foundation step
> found that the retire step after `sent` leaves an exception K1 does not allow (a retire that fails
> after the mail service accepted the message). The cycle changes its own design so that K1 holds
> whole: **the issue operation stops every earlier unspent link of the same account and purpose in
> the same transaction that inserts the new row**, before the message is handed to the mailer. There
> is no separate retire step and no retire failure case. A send that then fails leaves no earlier
> link working; the player sends again. Where Decisions 3, 4 and 12 below say otherwise ("retire
> earlier links: after a successful send", "on `sent` retire earlier links", "retiring earlier links
> throws after the mailer answered `sent`"), this note prevails.

### 1. Where the D-105 counters stand — in the account database, counted from the link rows

Every account message is one row of the link table (Decision 3), written before the message is
handed to SMTP. Admission counts, in the same write transaction that inserts the row, the rows
created in the last hour — all of them (limit 30) and those of the account (limit 3) — and inserts
only below both limits; otherwise the outcome is `limited` and nothing is sent. The account stands
for the address because an account's address never changes (K9). A row counts whatever the send's
outcome: an attempt handed to Outsider may have been delivered even when the answer is a failure
or a timeout, and D-105 says "at most". The numbers 30, 3 and one hour stand as constants of the
account-policy kind; the database method receives them and does the counting and the insert
atomically.

- Rejected: process memory like D-103 — a restart or deployment within the hour clears the
  counters and lets up to 30 more messages through, so D-105's "at most 30 per hour" does not hold
  across a deployment; it also needs D-103's bounded-table, eviction and reservation machinery for
  a path that sends at most 30 times an hour. A separate counter table — a second record of the
  same fact the link rows already hold.
- Rejected: counting only successful sends — Outsider may accept a message whose answer was lost,
  and a player could hammer a failing Outsider without bound.
- Cost if wrong: a player whose three sends failed waits up to an hour; the counting query reads
  at most a day of rows (bounded by 30 an hour), negligible.

### 2. The token and the link — 32 random bytes, stored only as a SHA-256 digest, carried in the fragment of `/`

- The token is 32 bytes from the crypto random generator, written as 43 base64url characters. The
  database keeps only its SHA-256 digest (base64url, 43 characters) as the row's key; the token
  itself is never stored, logged or returned by any route.
- The link is the configured public origin (`LOOP2_PUBLIC_ORIGIN`) followed by
  `/#confirm-email=<token>`. The fragment never leaves the browser in a navigation, so the token
  reaches neither Cloudflare's nor any server's request line, nor a `Referer`; `/` is the game's
  page, which exists (D-86).
- The page reads the fragment, sends the token in the JSON body of a `POST` (Decision 4), and
  removes the fragment from the address with `history.replaceState` once the server's answer is
  definitive — confirmed or the link refusal — so a reload neither resends a spent token nor keeps
  it in the address bar; after a lost connection the fragment stays and a reload tries again.
- The server accepts a token only of exactly that form (43 base64url characters that decode to 32
  bytes and encode back to the same text); any other string gets the same refusal as an unknown
  token.
- No attempt limit on confirming: guessing a 256-bit token is infeasible, and the transport and
  body guards bound each request's work.
- Rejected: a query parameter — the token reaches the Cloudflare edge's and the server's request
  logs, against OWASP's "never log … full verification URLs". A path such as `/potwierdz/<token>`
  — logged likewise, and `express.static` answers 404 for it (`src/server/app.ts:58`). Storing the
  token in clear — a read of the database would yield live links. A salted or slow hash — needless
  for 256 random bits.
- Cost if wrong: a mail client that drops fragments would deliver a link that only opens the game;
  the player resends from the header. H4 shows whether the tested client keeps it.

### 3. Schema version 3 — one appended step: a confirmation column and a link table

Step 3, appended after task 19's step 2:

- `accounts` gains a nullable integer column for the time the address was confirmed; null means
  unconfirmed. Every existing account gets null and keeps every other value and every session
  (To do 9). The stored account read validates it as null or a safe integer, and the account
  record carries `emailConfirmed`.
- A new STRICT table of emailed links, one row per message sent or attempted: the token digest
  (primary key), the account (foreign key to `accounts(id)`, `ON DELETE CASCADE`), the purpose
  constrained to `email-confirmation` or `password-reset`, the creation time, the expiry time, and
  a spent mark (0 or 1). Indexes on the account and on the creation time.
- A row is usable while it is not spent, its expiry is later than now (the boundary equal to now
  is expired, as for sessions) and its account is not blocked.
- The purpose admits `password-reset` now because K1, K10 and D-105 already bind both kinds to the
  same rules and limits, and a CHECK cannot be widened in SQLite without rebuilding the table,
  which D-112 rejects where a column suffices. No code writes that purpose in this change.
- The rows serve as the D-105 record (Decision 1), so a spent row stays until both its expiry has
  passed and it is older than one hour; the existing periodic cleanup prunes such rows in bounded
  batches beside expired sessions.
- Operations, each a synchronous method of `AccountDatabase` inside one write transaction, none
  spanning an `await`:
  - issue a link: read the account's blocked state, count the last hour's rows (all, and the
    account's) against the given limits, and insert the row only for an unblocked account below
    both limits — outcome `issued`, `limited` or `blocked`; reading the block in the same
    transaction as the insert means a block committed by the owner's command either precedes it
    (nothing is inserted, no message goes) or follows it and spends the row it inserted, so a
    message already on its way carries a dead link — the rule D-112 already keeps for a session write — so no link issued around a block survives the
    unblock (K10, To do 16);
  - retire earlier links: after a successful send, mark spent every other unspent row of the same
    account and purpose created before the new one (K1: "sending a new link invalidates earlier
    ones" applies only once the new message has been sent; a failed send leaves earlier links
    valid, and its own row stays usable, harmless if never delivered and useful if it was);
  - confirm by digest: find the row of purpose `email-confirmation`, check it usable with the
    account's blocked state read in the same transaction, set the account's confirmation time if
    still null, and mark spent every unspent confirmation row of that account — outcome
    `confirmed` or `invalid`; an invalid outcome changes nothing;
  - blocking (D-137's command, `blockAccount`) also marks spent every link row of the account, of
    either purpose, in its existing transaction; unblocking clears only the block, so no link
    returns (K10).
- Rejected: deleting rows on use, supersession or block — loses the D-105 record (Decision 1) and,
  for a block, would let a blocked account's later sends escape the hourly count. A boolean
  confirmed column — equally small; the time is kept because it costs nothing and tells when.
  A purpose constrained to confirmation only — task 21 would have to rebuild the table.
  Keeping other confirmation links usable after confirmation — leaves live tokens for an account
  with nothing left to confirm.
- Cost if wrong: a deployed step is never edited (D-112), so a wrong column or constraint is fixed
  only by a later step; this is why the purpose and the spent mark are chosen for task 21 too.

### 4. Routes and their contracts

All new paths join the existing transport and `no-store` gate (`router.all` list) and the JSON
503 of the unconfigured mode; both new routes are `POST` behind `mutationGuards` (D-104).

- `POST /api/email-confirmation` — body exactly `{ "token": <string> }`; no session needed (the
  link alone authorizes, K2), none created; a session cookie, if sent, is handled as on any route.
  Success: 204 after the confirm operation commits. Every token that is malformed, unknown,
  spent, expired, of a blocked account, or of another purpose: 400 with code `invalid-link` and
  message „Odnośnik jest nieważny albo wygasł.” — one answer for all, so it says nothing about
  which. A body of other fields or types: 400 `invalid-request`, as today.
- `POST /api/email-confirmation-message` — body exactly `{}` (as logout); a valid session of an
  unblocked account required, else JSON 401 `unauthenticated` (D-109); the address is always the
  session account's own; no field may name an address or account. An already confirmed account:
  409 with code `email-already-confirmed` and a message; nothing sent. Otherwise the send step
  (below) and 200 with `{ "confirmationMessage": "sent" | "limited" | "failed" }`.
- `POST /api/accounts` — unchanged up to and including the session (D-102 ticket settled as
  today, session stored before success, D-109); then the send step, then 201 with `id`, `email`,
  `emailConfirmed: false` and `confirmationMessage`. When the session cannot be stored the answer
  stays the 503 of today and no message is sent; the player signs in later and resends.
  A refused registration (invalid, duplicate, limited) sends nothing.
- `GET /api/account` and `POST /api/session` — the account body gains `emailConfirmed`
  (boolean); nothing else changes.
- The send step, shared by the two sending routes: create a token, issue its link row with the
  D-105 limits (Decision 1; `limited` ends the step without contacting Outsider), compose the
  message with the link, hand it to the mailer, and on `sent` retire earlier links. It never
  throws to the route; each failure has one outcome:
  - the mailer fails or misses its deadline: `failed` (Decision 6);
  - issuing the row throws (for example `SQLITE_BUSY` after the busy timeout while the owner's
    command holds the write lock, or a disk error): `failed`, and no message is sent, since a
    message whose link has no row could never confirm;
  - retiring earlier links throws after the mailer answered `sent`: `sent` — the message went and
    its link works — and the earlier links stay usable until they expire or are spent by a later
    send, confirmation or block; the step logs one fixed line without any token or address. This
    is the one case where K1's "a new link invalidates earlier ones" is not met, accepted because
    reporting a delivered message as failed would make the player send again into the same
    fault;
  - issuing finds the account blocked (a block committed after the route checked the session,
    Decision 3): at registration `failed`; on the resend route the answer is JSON 401
    `unauthenticated`, as for every request of a blocked account's deleted session (D-137).
  The registration answer is 201 with the account in every one of these cases (To do 1: the
  account is created and the player enters the headquarters whatever the send does).
- A database failure in `POST /api/email-confirmation` is an ordinary server error (500, as today
  from the error handler); the page shows the client's failure message and keeps the fragment,
  so a reload tries again (Decision 2).
- Rejected: limits and failures as error statuses (429, 503) on the resend route while
  registration reports them in a 201 body — two representations of one outcome; the client and
  the header would map both. One `confirmationMessage` value in both bodies, read by one client
  function.
- Cost if wrong: an HTTP-minded reviewer may prefer 429 for `limited`; the change is local to the
  route and the client.

### 5. How the browser learns the outcome at registration — the registration answer waits for the send, bounded at 10 s

The registration response is sent after the send step ends, and the send step is bounded by an
overall deadline of 10 seconds after which its outcome is `failed` and the SMTP connection is
closed; a late answer from Outsider is ignored. The browser client's 15-second limit is kept, so
hashing, the session write and the bounded send end well within it. Meanwhile the registration
button reads „Zakładanie konta…” as today. A client that disconnects does not stop the send; the
account and session exist, and a reload shows the header row.

- Rejected: the send in the background with the browser polling for its outcome (the human's
  second listed way) — a per-account in-flight state, a field or route to poll, and a poll loop in
  the page, for a wait of normally one to three seconds.
- Rejected: registration answering at once and the page requesting the first send itself — the
  server would send nothing after a registration whose page did not follow up, against To do 1
  ("po założeniu konta serwer wysyła"), and the human did not see this way.
- Cost if wrong: while Outsider hangs, entering the headquarters takes up to about 10 s more; that
  is the cost named in answer 8. If measurements show slower normal sends, only the deadline and
  the client limit change.

### 6. The mail-sending unit — `src/server/account-mail.ts`, the exemplar of a new kind

One file, independent of HTTP and the database:

- A pure composition of the confirmation message from an address and a link: subject „Potwierdź
  adres e-mail w loop2”; plain text only, no HTML part; the body is the task's three parts, each a
  paragraph separated by one empty line, with the link alone on its own line right after the first
  part's sentence that ends with „otwórz odnośnik:” (answer 4's „ / ” marks the paragraph breaks).
- A mailer created from the mail settings, with one operation: send a composed message to one
  recipient, resolving to `sent` or `failed`, never rejecting. It:
  - refuses, as `failed` without connecting, a recipient that is not one plain address: exactly
    one `@`, text on both sides, no whitespace, control character, or any of `, ; < > ( ) [ ] " \ :`
    — D-99 accepts such addresses at registration, so they reach the sender and must not become
    extra recipients or header text;
  - passes the SMTP envelope explicitly (sender address, the one recipient), the From header as
    the configured address with the fixed display name „loop2” (K5), and the To header as that one
    address;
  - connects to the configured host and port without implicit TLS, with STARTTLS required, server
    certificate verified against the host name (minimum TLS 1.2), authenticates with the
    configured login and the password read at startup, and offers no fallback to plain text;
  - opens one connection per message (no pool), with per-phase timeouts of a few seconds and the
    overall 10-second deadline of Decision 5 (a constructor option, so tests shorten it);
  - turns off the library's logger and debug output and its file and URL access for content;
  - logs one fixed line on failure carrying only the library's error code (an upper-case word)
    or "unknown" — never the error message, the server's reply, the message, the link, the token,
    the login or the password.
- A test seam: the mailer accepts an additional trusted certificate for the server (used only by
  tests); certificate verification is never switched off.
- Route tests receive a stand-in mailer through the same interface (Decision 9).
- Rejected: composing the message in the route — mixes HTTP sequencing with message text and
  header safety; a module per concern (composer, transport) — two files for about one screen of
  code, and the exemplar would show half the kind.
- Cost if wrong: the kind's guidelines (To do 12) take this file as their exemplar; a later split
  changes the exemplar's row.

### 7. Startup configuration of mail — five settings, part of the account settings

- New settings: `LOOP2_MAIL_FROM` (sender address), `LOOP2_SMTP_HOST`, `LOOP2_SMTP_PORT`,
  `LOOP2_SMTP_USER`, `LOOP2_SMTP_PASSWORD_FILE`. They join the account settings of D-111: a start
  with any account setting requires all nine (production always requires all nine); a partial or
  invalid set refuses before listening; the wholly unconfigured non-production mode stays. This
  matches To do 10's "jak dziś przy kluczach sesji" — session keys are required whenever accounts
  are configured.
- Validation, each failure naming its setting or path and nothing of the value:
  - sender: exactly one `@`, text on both sides, printable ASCII without whitespace or the
    address specials of Decision 6;
  - host: a DNS host name (letters, digits, hyphens, dots), at most 253 characters;
  - port: a decimal integer from 1 to 65535;
  - login: non-empty, at most 254 characters, printable, no whitespace or control character;
  - password file: a regular file of at most 1 KiB, strict UTF-8, non-empty, with no control
    character — so a trailing newline is refused rather than silently trimmed (the human's file
    has none, task Context); read once at startup.
- The public origin already configured builds the links.
- Startup does not contact Outsider: a failing Outsider must not keep the game down, and container
  and startup tests run without network.
- `AccountRuntime` gains the mailer built from these settings.
- Rejected: mail as a separate optional group with a "mail off" mode outside production — a second
  configured-but-incomplete mode beside D-111's one unconfigured mode, against "every partial
  explicit configuration refuses"; cheaper for existing test fixtures, which instead now supply
  synthetic mail settings. Trimming the password file — hides a rotation mistake until the first
  failed login to Outsider.
- Cost if wrong: every test and local run that configures accounts supplies the mail settings; a
  local run's sends then fail visibly unless it points at a local SMTP server.

### 8. The SMTP password's path — a third Compose secret

- `compose.yaml`: a secret `loop2_smtp_password` from `/etc/loop2/smtp-password`, granted only to
  `app` in the short form (read-only `/run/secrets/loop2_smtp_password`, host permissions kept);
  the app's environment gains the five settings as plain values — `LOOP2_MAIL_FROM` and
  `LOOP2_SMTP_USER` `loop2@mariusznazar.com`, `LOOP2_SMTP_HOST` `outsider.mikr.us`,
  `LOOP2_SMTP_PORT` `587`, `LOOP2_SMTP_PASSWORD_FILE` `/run/secrets/loop2_smtp_password`.
- `deploy/loop2-deploy` and the Dockerfile do not change: a missing host file fails `compose up`
  or startup, which ends the deployment with exit 8 and the running containers as D-15 describes.
- `tests/invariants/test_loop2_host_sharing.py` admits exactly the third secret for `app` and
  still refuses every other source, grant or option; `tests/invariants/account_container_support.py`
  provisions a synthetic SMTP password file in its secret volume (root, group 1000, 0440) and
  passes synthetic mail settings, and its resource probe checks that file's owner, group and mode.
- Rejected: an environment variable for the password — D-13 Rejected; a Compose `environment`
  secret source — the same exposure.
- Cost if wrong: if the SMTP login is not the full address (open question of the task), the human
  changes one plain value in `compose.yaml` after H4; no credential moves.

### 9. Testing without the real Outsider

- The mailer (Decision 6) is tested as an integration test against a real SMTP server on
  loopback, started in the test process from the `smtp-server` package (devDependency at the
  version whose `nodemailer` dependency equals the pinned one; registry latest 3.21.1 depends on
  `nodemailer` 10.2.1), port 0, readiness awaited with a time limit, closed after each case even
  on failure. Cases: a message is submitted only after STARTTLS and authentication with the
  configured login and password; a server that offers or completes no STARTTLS receives no
  message and the outcome is `failed`; a server that stops answering yields `failed` within the
  shortened deadline; a crafted recipient (CR/LF, comma, angle brackets, a second `@`) yields
  `failed` and nothing is submitted; the submitted message has exactly the one recipient, the
  From, To and Subject of K5, a text-only body with the link on its own line; nothing written to
  the console holds the password, the token or the link. The server's certificate is a test
  certificate the case trusts through the mailer's seam; how the test obtains it is left to the
  maker, provided no network is used and verification is not turned off.
- Routes are tested on real HTTP and SQLite (as `tests/http.test.mjs` does) with a stand-in
  mailer that records messages and returns the outcome the case chooses or never answers — the
  route reacts to the outcome; the SMTP operation is proved by the mailer's own tests (D-84).
  The token for confirming is read from the recorded message's link. Among the cases: a block
  committed through a second connection while the stand-in mailer holds its answer spends the
  link, which confirms nothing after unblocking; a block committed before issuing leaves no row
  and sends nothing; a failure to issue the row still answers registration with 201 and
  `failed`.
- The database step and the link operations are tested on real files in
  `tests/account-storage.test.mjs`, the version-2 database written by the test's own schema.
- Startup refusals are tested as today in `tests/startup.test.mjs`.
- Pure browser functions (reading the fragment, the outcome-to-sentence mapping) are unit tests
  under `tests/view/`; the client's new calls go to `tests/account-api.test.mjs`.
- No test reaches the real Outsider; delivery is H4, done by the human.

### 10. The browser — client, header row, confirmation notice

- Client (`src/browser/account-api.ts`): the account gains a required boolean `emailConfirmed`
  (an account body without it is `unexpected`); `register` returns the account and the
  `confirmationMessage` value (`sent`, `limited` or `failed`, else `unexpected`); new
  `confirmEmail(token)` → success on 204 only; new `sendConfirmationMessage()` → the
  `confirmationMessage` value on 200 only; `invalid-link` and `email-already-confirmed` join the
  known refusal codes.
- Header row: a new browser module `src/browser/view/email-status.ts`, placed in the header after
  the title, „Wyloguj” and its warning, on a line of its own (full width), shown only for a
  signed-in player whose address is unconfirmed, on every screen of the game. It holds one
  sentence and the shared button „Wyślij ponownie”. The sentence is „Adres e-mail
  niepotwierdzony.” until a send made in this page ends, then the outcome's sentence replaces it:
  `sent` — „Wysłaliśmy odnośnik potwierdzający na <adres>.” with the account's address;
  `limited` — „Za dużo wiadomości. Spróbuj ponownie za godzinę.”; `failed` — „Nie udało się
  wysłać wiadomości. Spróbuj ponownie później.”; a client failure (no connection, unexpected
  answer) — the client's own message. The button stays beside every sentence. While waiting it is
  disabled and reads „Wysyłanie…” (`setButtonWaiting`), and focus returns to it after the answer.
  Right after registration the row starts with the registration's outcome sentence. On
  `email-already-confirmed` the row disappears. Each request takes the next number and only the
  last answer acts; the row is removed with the game on logout.
- Roles: „Adres e-mail niepotwierdzony.” `text-secondary` (task); „Wysłaliśmy odnośnik
  potwierdzający na <adres>.” `text-secondary` — a note of what happened while the address is
  still unconfirmed, not that something is in order (`positive`, D-39), and not a caution; the
  limit, failure and client-failure sentences `warning` (D-39: something was not carried out).
- Confirmation on load (`src/browser/view/app.ts`): when the fragment holds a token, the page first
  shows „Potwierdzanie adresu…” in `text-secondary` in the place where it shows „Sprawdzanie
  logowania…” (the same meaning: the page waits for the server), sends the confirmation, and only
  then runs the session check, so the header reflects the confirmed state. The result — „Adres
  e-mail potwierdzony.” in `positive` or „Odnośnik jest nieważny albo wygasł.” in `warning`, or the
  client's failure message in `warning` — stands as one sentence above the screen the session
  check leads to (the account forms or the game), and leaves at the next change between forms and
  game. Under SameSite=Strict the navigation from the mail client carries no cookie, but the
  page's own requests do, so the session check sees an existing session.
- Account screen: the registration's `signedIn` passes the outcome on, so the header row starts
  with it; sign-in and reload start with „Adres e-mail niepotwierdzony.”.
- Styles in `src/browser/styles.css` read tokens only; no new token or role.
- Kitchen-sink page: the header row with „Wyślij ponownie” waiting („Wysyłanie…”) and with a
  refusal sentence beside the button (To do 8), with made-up values.
- Rejected: the outcome sentence added after „Adres e-mail niepotwierdzony.” — the task says the
  outcome sentence "stoi tam", in that place; two sentences lengthen a header row shown on every
  screen. `positive` for „Wysłaliśmy…” — would read as "done" while the address is unconfirmed.
- Cost if wrong: one sentence per row versus two is a change local to the row module.

### 11. The two delivery questions — left to H4, not to code

Whether mail from the deployed container reaches an external inbox and whether the SMTP login is
the full address are settled only by the human's H4 (task, Human actions and To do 15); no code or
test of this change can settle them. The change takes the full address as the login (the task's
To do 10 value) as a plain `compose.yaml` value, so a different login is a one-line change after
H4, and the mailer's failure line (error code only, Decision 6) is what the agent may read through
the service logs to tell an authentication failure (`EAUTH`) from a connection or TLS failure
during H4. Outbound TCP from the container to `outsider.mikr.us:587` is unverified (the fact
`mikrus-tunnel-outbound-tcp` covers only the tunnel port); H4 shows it.

### 12. Units and their interfaces

| Unit | What it does | How it is used | Depends on |
|---|---|---|---|
| `src/server/account-mail.ts` (new kind) | composes the confirmation message; sends one message over SMTP with STARTTLS, bounded, never throwing | the send step calls compose then `send` → `sent`/`failed` | Nodemailer 10, the mail settings |
| `src/server/database.ts` | step 3; account `emailConfirmed`; issue link for an unblocked account under limits; retire earlier links; confirm by digest; block spends links; prune links | routes and the block command call synchronous methods | `node:sqlite` |
| `src/server/account-policy.ts` | D-105 numbers and window; link lifetime 24 h; token creation, format check and digest — pure, no HTTP or database | routes pass the numbers to the database and the digest to lookups | `node:crypto` |
| `src/server/configuration.ts` | reads and validates the five mail settings and the password file; builds the mailer into the runtime | startup, tests | `account-mail.ts` |
| `src/server/account-routes.ts` | the two routes, the send step, the extended account bodies | `createApp` | the units above |
| `src/server/account-block.ts` | unchanged behaviour of the command; its report line may mention that links stopped working | the owner | `database.ts` |
| `src/browser/account-api.ts` | the extended and the two new client calls | app, account screen, header row | `fetch` |
| `src/browser/view/email-status.ts` (new) | the header row | `app.ts` creates it with the client and the account | shared button, client |
| `src/browser/view/app.ts`, `account-screen.ts` | confirmation on load, notice placement, outcome hand-over | page start | the units above |

The seam for tests is the mailer interface: `createApp` (or the runtime it receives) takes a
mailer; the runtime built from configuration supplies the SMTP one.

## Foundation entries

Written or changed by the foundation step through the record skills; wording is that step's.

- Decision (new, K1): link validity — confirmation 24 h, reset 1 h, each works once, a newly sent
  link invalidates earlier links of its kind and account (with this spec's reading that "sent"
  means accepted by Outsider).
- Decision (new, K2): the link opens the game page, which confirms with a D-104 request without a
  session; the fragment form `/#confirm-email=<token>` and the digest-only storage of Decision 2.
- Decision (new, K3): the header row of an unconfirmed player, the resend authority and the
  outcome sentences, with the roles of Decision 10.
- Decision change, D-44 (K4): „Wysyłanie…” as the waiting label of „Wyślij ponownie” — through
  `the-way-maintain-styleguide` together with the rule „States of shared controls”.
- Decision (new, K5): sender, display name, plain text, subject and body of the confirmation
  message.
- Decision change, D-111 (K6): the five mail settings and the password file join the required
  account settings.
- Decision changes, D-13 and D-17 (K7): the third runtime credential file and its grant to the
  application alone.
- Decision (new, K9): an account's address is the one given at registration; no address change.
- Decision (new, K10), and D-137's text: blocking spends every link of the account; unblocking
  restores none.
- Decision change, D-109: the link alone authorizes confirming its own account; a valid session
  authorizes sending a confirmation message to its own account's address.
- Decision change, D-105: the counters stand in the account database and every attempted message
  counts — or a new decision deriving from D-105 that says so.
- Decision change, D-112: schema version 3, the confirmation time, the link table, blocking
  spending links, pruning of link rows.
- Decision (new): the exemplar of the mail-sending kind, `src/server/account-mail.ts` (To do 12).
- Invariant changes: `account-schema-lifecycle` and `account-database-schema` (version 3, the
  move keeps every account, session and value and leaves accounts unconfirmed);
  `account-startup-configuration` (the mail settings count as account settings);
  `loop2-host-sharing` (the application's read-only SMTP-password grant);
  `account-session-authorization` (the resend route without a session answers JSON 401);
  `account-mutation-request-guards` (now five state-changing routes; its wording already says
  "every"); `account-client-outcomes` (the account requires `emailConfirmed`); `blocked-account-access`
  or a new invariant for "a blocked account's links confirm nothing, also after unblocking".
- Invariant candidates (new, method test): an emailed link confirms once, only within its
  lifetime, only until a later message of its account has been sent, and only while its account
  is unblocked; account messages beyond 30 an hour
  in total or 3 an hour per address are not sent.
- Projected entries this change makes partly true, written by this change in their confirmation
  part (task, *Decisions in play*: "Zapisuje część wpisu, którą jego kod czyni prawdziwą
  (WAY-126), a resztę dopisuje zadanie zapisujące"; WAY-126: "where the code makes only part of it
  true, the agent writes that part and the human accepts its meaning at the merge"), each listed
  with its meaning in the request; task 21 writes the reset part later:
  - decision „How does a player sign in and reset a forgotten password?” — the part "a
    confirmation message establishes that address";
  - decision „Which service delivers account emails?” — its first sentence for confirmation
    messages; its second sentence (delivery from the intended container in a real test) becomes
    true for confirmation messages only after H4, so the foundation step writes it only if H4 has
    passed before the merge, and otherwise the request names it as left to task 21;
  - decision „How does the account server send email through Outsider?” — composing and sending
    confirmation messages through Outsider SMTP with Nodemailer 10, the connection upgraded to TLS
    and sending failing without STARTTLS (Decision 6);
  - invariant `account-email-via-outsider/1` — the confirmation part, method review;
  - invariant `account-email-nodemailer-starttls/1` — the confirmation part, method test, proved by
    the mailer's STARTTLS case of Decision 9.
- Environment facts (new): `mikrus-outsider-mail/1` (To do 14), the *Based on* of the partial
  „Which service delivers account emails?”; a Nodemailer 10 fact for `requireTLS` sending STARTTLS
  and failing without the upgrade (source: the 10.2.1 package, cited in *Constraints*), the *Based
  on* of the partial „How does the account server send email through Outsider?” and of
  `account-email-nodemailer-starttls/1`.
- Part map: `account-server` claims the new test file of the mailer; External context gains Mikrus
  Outsider (both directions; its SMTP replies are untrusted).
- Glossary: none required; the foundation step judges whether "confirmed email address" or
  "account message" needs a term.
- Guidelines (not foundation, same cycle): the new kind file and its row in `guidelines/coding.md`
  (`the-way-maintain-coding-guidelines`); `guidelines/testing.md` — the answer to „Czy kod
  rozmawia z cudzą usługą?” for SMTP, the trust-boundary rows of the two routes, and the existing
  rows this change alters — the `GET /api/account`, `POST /api/accounts` and `POST /api/session`
  rows (their bodies gain `emailConfirmed`, registration's its send outcome), the D-104 rows that
  list three state-changing routes, and the transport row "na czterech trasach"
  (`the-way-maintain-testing-guidelines`, human approval per WAY-172); the styleguide (To do 8).

## Left to the maker

- Names of methods, types, the column, the table and the CSS classes; the exact signature of the
  test seam for the mailer.
- The per-phase SMTP timeouts within the 10-second deadline.
- The wording of the `email-already-confirmed` refusal message (never shown: the row disappears)
  and of the command's report line after a block.
- How the mailer test obtains and trusts its certificate (no network, verification on).
- Whether the confirmation notice and the confirmation flow stay in `app.ts` or take a module of
  their own.
- The deploy skill's text in both copies (`.claude/skills/loop2-deploy/` and
  `.agents/skills/loop2-deploy/`, kept identical): where the SMTP password lies, its metadata read
  (`stat -c '%U %g %a' /etc/loop2/smtp-password`, expecting `root 1000 440`), its rotation (the
  human replaces the file and the private copy, then recreates the application container), what
  the human set in Outsider and DNS (H1, H2), the agent's limits on it, the rollback note that the
  first deployment of this change moves the database to version 3, and H4.
- Slicing, if the plan divides the change (Decision 12's units suggest server storage and mail,
  routes, browser, deployment, guidelines).
