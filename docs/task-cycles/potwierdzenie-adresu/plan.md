# Plan — Potwierdzenie adresu e-mail gracza odnośnikiem z wiadomości wysłanej z kontenera loop2 przez Outsidera

- Task: `.runs/task-cycles/potwierdzenie-adresu/task.md`
- Spec: `.runs/task-cycles/potwierdzenie-adresu/spec.md`
- Base: `7a633a7`

## Foundation entries

Written by the foundation step before Slice 1, through the record skill of each element, except
F31, which Slice 2 writes (see *Choices*). Each row names the entry and its meaning's source; its
wording is the writer's. Row identifiers F1–F33 are this plan's labels only; an entry gets its
identifier when written.

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| F1 — validity of emailed links: confirmation 24 h, reset 1 h, each works once, a newly sent link invalidates earlier links of its kind and account, "sent" read as accepted by Outsider | decision (new) | K1; spec Decision 3 and *Foundation entries* | Slices 1, 5 |
| F2 — the link opens the game page, which confirms through a D-104 request without a session; the fragment form `/#confirm-email=<token>`; only the token's digest is stored | decision (new) | K2; spec Decisions 2 and 4 | Slices 1, 5, 6, 7 |
| F3 — the header row of a signed-in player with an unconfirmed address, who may ask for a resend and to which address, the outcome sentences and their roles | decision (new) | K3; spec Decision 10 | Slices 5, 6, 7, 8 |
| F4 — D-44 changed: „Wysyłanie…” is the waiting label of „Wyślij ponownie” | decision (change of D-44) | K4; To do 8; spec *Foundation entries* | Slices 7, 8 (Slice 8 writes the styleguide rule's text) |
| F5 — sender `loop2@mariusznazar.com` with display name „loop2”, plain text, subject and body of the confirmation message | decision (new) | K5; answer 4; spec Decision 6 | Slices 2, 3 |
| F6 — D-111 changed: the five mail settings and the SMTP password file join the required account settings | decision (change of D-111) | K6; spec Decision 7 | Slices 4, 9 |
| F7 — D-13 and D-17 changed: the third runtime credential file `/etc/loop2/smtp-password`, granted read-only to the application alone, its rotation | decision (changes of D-13 and D-17) | K7; spec Decision 8 | Slices 4, 9 |
| F8 — an account's address is the one given at registration; loop2 has no address change | decision (new) | K9 | Slices 1, 5 |
| F9 — blocking spends every emailed link of the account, unblocking restores none; D-137's text says so | decision (new) and change of D-137 | K10; To do 16; spec Decision 3 | Slices 1, 5, 9 |
| F10 — D-109 changed: the link alone authorizes confirming its own account; a valid session authorizes sending a confirmation message to its own account's address | decision (change of D-109) | K2, K3; spec *Constraints* and *Foundation entries* | Slice 5 |
| F11 — D-105's counters stand in the account database and every attempted message counts — as a change of D-105 or a new decision deriving from it | decision (change of D-105, or new) | spec Decision 1 | Slices 1, 5 |
| F12 — D-112 changed: schema version 3, the confirmation time, the link table, blocking spending links, pruning link rows | decision (change of D-112) | To do 9; answer 6; spec Decision 3 | Slices 1, 9 |
| F13 — the exemplar of the kind `mail-sending` is `src/server/account-mail.ts` | decision (new) | To do 12 (WAY-216); spec Decision 6 | Slices 2, 3 |
| F14 — `account-schema-lifecycle` and `account-database-schema` changed: version 3, the move keeps every account, session and value and leaves accounts unconfirmed; checks in `tests/account-storage.test.mjs` and `tests/startup.test.mjs` | invariant changes | To do 9; spec *Foundation entries* | Slice 1 |
| F15 — `account-startup-configuration` changed: the mail settings count as account settings; check in `tests/startup.test.mjs` | invariant change | K6; spec Decision 7 | Slice 4 |
| F16 — `loop2-host-sharing` changed: the application's read-only SMTP-password grant; check in `tests/invariants/test_loop2_host_sharing.py` | invariant change | K7; spec Decision 8 | Slice 9 |
| F17 — `account-session-authorization` changed: the resend route without a valid session answers JSON 401; check in `tests/http.test.mjs` | invariant change | F10; spec Decision 4 | Slice 5 |
| F18 — `account-mutation-request-guards`: now five state-changing routes; the writer judges whether the wording ("every") needs a change; check in `tests/transport.test.mjs` | invariant change or none | spec *Foundation entries* | Slice 5 |
| F19 — `account-client-outcomes` changed: an account requires a boolean `emailConfirmed`; check in `tests/account-api.test.mjs` | invariant change | spec Decision 10 | Slice 6 |
| F20 — a blocked account's links confirm nothing, also after unblocking — as a change of `blocked-account-access` or a new invariant; checks in `tests/account-storage.test.mjs` and `tests/http.test.mjs` | invariant change or new, method test | K10; To do 16 | Slices 1, 5 |
| F21 — an emailed link confirms once, only within its lifetime, only until a later message of its account has been sent, and only while its account is unblocked; checks in `tests/account-storage.test.mjs` and `tests/http.test.mjs` | invariant (new), method test | K1, K10; spec *Foundation entries* | Slices 1, 5 |
| F22 — account messages beyond 30 an hour in total or 3 an hour per address are not sent; checks in `tests/account-storage.test.mjs` and `tests/http.test.mjs` | invariant (new), method test | D-105; spec Decision 1 | Slices 1, 5 |
| F23 — projected „How does a player sign in and reset a forgotten password?”, the part "a confirmation message establishes that address" | decision (new, part, WAY-126) | task *Decisions in play*; spec *Foundation entries* | Slices 5, 7 |
| F24 — projected „Which service delivers account emails?”, its first sentence for confirmation messages; its second sentence only if H4 passed before the merge, otherwise named in the request as left | decision (new, part) | task *Decisions in play*; spec *Foundation entries*; cycle Q8 | Slices 2, 9 |
| F25 — projected „How does the account server send email through Outsider?”, the part for confirmation messages | decision (new, part) | task *Decisions in play*; spec Decision 6 | Slice 2 |
| F26 — projected `account-email-via-outsider/1`, the confirmation part, method review | invariant (new, part) | task *Decisions in play*; spec *Foundation entries* | Slices 2, 4, 9 |
| F27 — projected `account-email-nodemailer-starttls/1`, the confirmation part, method test; check: the STARTTLS case of `tests/account-mail.test.mjs` | invariant (new, part) | task *Decisions in play*; spec Decision 9 | Slice 2 |
| F28 — `mikrus-outsider-mail/1`, whole | environment fact (new) | To do 14; projected entry | F24; Slice 9 |
| F29 — Nodemailer 10 with `requireTLS` sends STARTTLS and fails the connection without the upgrade (source: the 10.2.1 package) | environment fact (new) | spec *Constraints* and *Foundation entries* | F25, F27; Slice 2 |
| F30 — part map *External context*: Mikrus Outsider, both directions, untrusted | part-map change | spec *Foundation entries* | Slices 2, 9 |
| F31 — part map `account-server` *Files* claims `tests/account-mail.test.mjs` | part-map change | spec *Foundation entries* | Slice 2 — written by Slice 2's agent with the file, through `the-way-update-part-map` |
| F32 — the testing meaning of To do 13 (code that talks to SMTP is tested against a real SMTP server on loopback; routes against a stand-in mailer): tied to D-84 and D-73 where their meaning carries it, otherwise proposed as a change of D-84 and approved at a blocked draft request before Slice 2 (WAY-172) | decision change or none | To do 13; spec Decision 9 | Slices 2, 5, 10 |
| F33 — glossary: the writer judges whether "confirmed email address" or "account message" needs a term | glossary entry or none | spec *Foundation entries* | Slices 5, 7 |

## Slices

### Slice 1 — Schema version 3 and the store of emailed links

- **Goal:** The account database has schema step 3 appended after task 19's step 2: `accounts` gains a nullable confirmation time (null for every existing account, every other value and every session kept), the account record carries `emailConfirmed`, and a STRICT table of emailed links holds one row per message sent or attempted (token digest as key, account with cascade, purpose `email-confirmation` or `password-reset`, creation and expiry times, a spent mark, indexes on account and creation time). `AccountDatabase` gains synchronous single-transaction operations, none spanning an `await`: issue a link for an unblocked account below the hourly limits it is given (outcome `issued`, `limited` or `blocked`, the block read in the same transaction as the insert, and the same transaction spending every earlier unspent link of the same account and purpose — spec *Decisions*, the orchestrator's note); confirm by digest (outcome `confirmed` or `invalid`, an invalid outcome changing nothing, a confirmation spending every unspent confirmation link of the account); blocking spends every link of the account in its existing transaction, unblocking restores none; the periodic cleanup prunes, in bounded batches, link rows both expired and older than one hour. The block command keeps its behaviour; its report line may say the account's links stopped working. No route, policy constant or token creation is in this slice: the methods take digests, times and limits as arguments.
- **Change:** `src/server/database.ts` · `src/server/account-block.ts` · `tests/account-storage.test.mjs`
- **Read:** `.runs/task-cycles/potwierdzenie-adresu/task.md:17-34` To do ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:152-168` Settlements to record ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:53-94` Constraints ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:98-118` 1. Where the D-105 counters stand ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:146-193` 3. Schema version 3 ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:348-376` 9. Testing without the real Outsider ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:433-448` 12. Units and their interfaces ·
  plan Foundation entries F1, F8, F9, F11, F12, F14, F20, F21, F22 ·
  `foundations/decisions.md:1938-1949` D-112 · `foundations/decisions.md:1951-1964` D-114 ·
  `foundations/decisions.md:1830-1843` D-105 · `foundations/decisions.md:2484-2497` D-137 ·
  `foundations/decisions.md:2499-2510` D-138 · `foundations/decisions.md:1744-1757` D-99 ·
  `foundations/decisions.md:284-302` D-15 ·
  `foundations/invariants.md:758-766` account-schema-lifecycle ·
  `foundations/invariants.md:768-776` account-database-schema ·
  `foundations/invariants.md:778-786` account-session-storage ·
  `foundations/invariants.md:838-846` blocked-account-access ·
  `foundations/invariants.md:848-856` player-server-session ·
  `foundations/invariants.md:858-866` unblock-restores-no-session ·
  `foundations/environment_facts.md:250-254` node-sqlite-database ·
  `foundations/environment_facts.md:316-320` sqlite-wal-concurrency ·
  `foundations/glossary.md:157-161` blocked account · `foundations/glossary.md:39-44` test server ·
  `foundations/part_map.md:58-74` account-server ·
  `guidelines/coding.md` · `guidelines/coding-database-access.md` · `guidelines/testing.md`
- **Model:** same — the schema step cannot be changed once deployed, and the issue-versus-block race spans two connections, so a fault survives in every moved database.
- **Risk:** trust boundary — `src/server/**` · cannot be undone — schema step 3 of the persistent database `loop2_accounts`, run on the test server when the human deploys the branch (H4) or the merge deploys `main`; this slice only writes and tests it on temporary databases.
- **Checks:** `npm test -- tests/account-storage.test.mjs`, starting from failing cases for: the move of a version-2 database written by the test's own schema to version 3 with every account, session and value kept and every account unconfirmed; issuing under and at both limits; confirming once, at the expiry boundary, after a later link was issued (also when its send then failed) and for a blocked account; a block committed through a second connection spending a link issued before it; pruning; an unknown newer version (the test's "newer" number moves past 3, since 3 is now known — a change of an existing test with its reason). Then `npm test -- tests/http.test.mjs` and `npm test -- tests/startup.test.mjs` unchanged and passing; `python -B .the-way/elements/common/foundation_check.py`.
- **Depends on:** F1 · F8 · F9 · F11 · F12 · F14 · F20 · F21 · F22

### Slice 2 — The mailer, first file of the kind mail-sending

- **Goal:** `src/server/account-mail.ts` exists, independent of HTTP and the database: a pure composition of the confirmation message from an address and a link (subject, plain text only, the three paragraphs of answer 4 with the link alone on its own line after „otwórz odnośnik:”), and a mailer built from the mail settings whose one operation sends a composed message to one recipient and resolves to `sent` or `failed`, never rejecting. It refuses without connecting a recipient that is not one plain address (the characters spec Decision 6 lists); passes the envelope explicitly and the From header with the fixed display name „loop2”; connects without implicit TLS with STARTTLS required, certificate verified against the host name, TLS 1.2 at least, authenticated, no plain-text fallback; one connection per message with per-phase timeouts and an overall deadline of 10 s that is a constructor option; turns off the library's logger, debug output and file or URL access; logs on failure one fixed line with only the library's error code or "unknown". A test-only seam trusts an additional server certificate; verification is never switched off. Nodemailer 10 is a runtime dependency and `smtp-server` a development dependency at the version whose `nodemailer` dependency equals the pinned one. `tests/account-mail.test.mjs` is an integration test against a real SMTP server on loopback (port 0, readiness awaited with a time limit, closed after each case even on failure, no network) holding the cases of spec Decision 9, the STARTTLS case marked `invariant: account-email-nodemailer-starttls` (F27). The part map's `account-server` claims the test file (F31, through `the-way-update-part-map`). The executor may read the Nodemailer 10 and `smtp-server` documentation or their installed sources for options and naming each reach in its report.
- **Change:** `src/server/account-mail.ts` · `tests/account-mail.test.mjs` · `package.json` · `package-lock.json` · `foundations/part_map.md`
- **Read:** `.runs/task-cycles/potwierdzenie-adresu/task.md:17-34` To do ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:69-83` Context ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:152-168` Settlements to record ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:53-94` Constraints ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:247-264` 5. How the browser learns the outcome at registration ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:266-299` 6. The mail-sending unit ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:348-376` 9. Testing without the real Outsider ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:422-431` 11. The two delivery questions ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:433-448` 12. Units and their interfaces ·
  plan Foundation entries F5, F13, F24, F25, F26, F27, F29, F30, F31, F32 ·
  `foundations/decisions.md:252-265` D-13 · `foundations/decisions.md:1744-1757` D-99 ·
  `foundations/decisions.md:708-719` D-33 · `foundations/decisions.md:1459-1470` D-81 ·
  `foundations/decisions.md:1498-1509` D-84 ·
  `foundations/invariants.md:448-456` introduced-npm-vulnerabilities ·
  `foundations/glossary.md:100-104` integration test ·
  `foundations/part_map.md:58-74` account-server · `foundations/part_map.md:76-106` build-tools ·
  `foundations/part_map.md:155-168` External context ·
  `guidelines/coding.md` · `guidelines/testing.md`
- **Model:** same — the first file of a kind that every later mail file copies, with TLS, header-injection and secret-handling rules and an SMTP test harness the product has none of.
- **Risk:** trust boundary — `src/server/**` · `package-lock.json`
- **Checks:** `npm test -- tests/account-mail.test.mjs`, starting from the failing STARTTLS case (a server that offers or completes no STARTTLS receives no message, outcome `failed`), then the cases of spec Decision 9; `npm test -- tests/quality/test_node_test_selection.py`; `npm test -- tests/quality/test_quality_invariants.py` (lint, format and the audit of the changed lockfile, which reads the public npm registry); `python -B .the-way/elements/common/foundation_check.py`.
- **Depends on:** F5 · F13 · F25 · F27 · F29 · F30 · F32

### Slice 3 — Coding guidelines of the kind mail-sending

- **Goal:** `guidelines/coding-mail-sending.md` exists in the form of a kind's guidelines, with `src/server/account-mail.ts` as its exemplar under F13, its rules drawn from the decisions the foundation step wrote and from the exemplar, and its *Where in code*; `guidelines/coding.md` gains the kind's row in *Kinds of code* and its line on deferred kinds no longer defers the mail pattern. The slice is written as the cycle's author of `the-way-maintain-coding-guidelines` writes kind files ("Writing the files" of the coding template). A rule that needs a meaning no decision carries is not written: the slice returns it as a question (WAY-172).
- **Change:** `guidelines/coding-mail-sending.md` · `guidelines/coding.md`
- **Read:** `.runs/task-cycles/potwierdzenie-adresu/task.md:17-34` To do ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:69-83` Context ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:266-299` 6. The mail-sending unit ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:450-523` Foundation entries ·
  plan Foundation entries F5, F13, F25, F27, F29 ·
  `foundations/decisions.md:635-648` D-28 · `foundations/decisions.md:1951-1964` D-114 ·
  `foundations/decisions.md:252-265` D-13 ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/coding/template.md` ·
  `.the-way/product-guidelines/coding/SKILL.md` ·
  `guidelines/coding-database-access.md` · `guidelines/coding-account-policy.md` ·
  src/server/account-mail.ts and tests/account-mail.test.mjs (made in Slice 2)
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` (guidelines' references and *Applies to*).
- **Depends on:** Slice 2 · F13

### Slice 4 — Startup requires the mail settings and the SMTP password file

- **Goal:** `src/server/configuration.ts` reads and validates `LOOP2_MAIL_FROM`, `LOOP2_SMTP_HOST`, `LOOP2_SMTP_PORT`, `LOOP2_SMTP_USER` and `LOOP2_SMTP_PASSWORD_FILE` as account settings, as spec Decision 7 gives each (a start with any account setting requires all nine, production always; a partial or invalid set refuses before listening naming the setting or path and nothing of the value; the password file is a regular file of at most 1 KiB, strict UTF-8, non-empty, without control characters, a trailing newline refused, read once); the wholly unconfigured non-production mode stays; startup does not contact Outsider. `AccountRuntime` carries the mailer of Slice 2 built from these settings, the seam through which route tests later substitute a stand-in. Every test fixture that configures accounts supplies synthetic mail settings and a synthetic password file: the Node tests that open a runtime, the default-address test's list of account settings it strips, and the container support, which provisions the password file in its secret volume (root, group 1000, 0440), passes the settings and checks the file's owner, group and mode in its resource probe.
- **Change:** `src/server/configuration.ts` · `tests/startup.test.mjs` · `tests/http.test.mjs` · `tests/transport.test.mjs` · `tests/invariants/test_account_server_default_address.py` · `tests/invariants/account_container_support.py`
- **Read:** `.runs/task-cycles/potwierdzenie-adresu/task.md:17-34` To do ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:50-52` question 5 ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:69-83` Context ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:152-168` Settlements to record ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:266-299` 6. The mail-sending unit ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:301-328` 7. Startup configuration of mail ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:330-346` 8. The SMTP password's path ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:433-448` 12. Units and their interfaces ·
  plan Foundation entries F6, F7, F15, F26 ·
  `foundations/decisions.md:1912-1923` D-111 · `foundations/decisions.md:252-265` D-13 ·
  `foundations/decisions.md:331-354` D-17 · `foundations/decisions.md:946-959` D-49 ·
  `foundations/invariants.md:748-756` account-startup-configuration ·
  `foundations/invariants.md:508-516` account-server-default-address ·
  `foundations/invariants.md:155-163` loop2-host-sharing ·
  `foundations/environment_facts.md:244-248` session-secret-rotation ·
  `foundations/environment_facts.md:196-200` compose-file-secret-permissions ·
  `foundations/part_map.md:58-74` account-server · `foundations/part_map.md:76-106` build-tools ·
  `src/server/main.ts` · `src/server/app.ts` ·
  `guidelines/coding.md` · `guidelines/testing.md` ·
  src/server/account-mail.ts and guidelines/coding-mail-sending.md (made in Slices 2 and 3)
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/**`
- **Checks:** `npm test -- tests/startup.test.mjs`, starting from failing cases: each mail setting missing or invalid, and the password file missing, a directory, oversized, not UTF-8, empty or ending in a newline, each refuses before readiness naming its setting or path without its contents; a full valid set starts. Then `npm test -- tests/http.test.mjs`, `npm test -- tests/transport.test.mjs`, `npm test -- tests/invariants/test_account_server_default_address.py`; where Docker answers, `npm test -- tests/invariants/test_loop2_one_serving_process_container.py` and `npm test -- tests/deploy/test_account_storage.py` (a run whose cases all skip fails, and is reported as unchecked). `tests/invariants/test_loop2_one_serving_process.py` fails on the base on this machine and is not a check of this slice.
- **Depends on:** Slice 2 · F6 · F7 · F15

### Slice 5 — The confirming route, the resend route and the send step

- **Goal:** The account server takes `POST /api/email-confirmation` (body exactly `{ "token" }`, no session needed, 204 on `confirmed`, one 400 `invalid-link` answer with „Odnośnik jest nieważny albo wygasł.” for every malformed, unknown, spent, expired, blocked or other-purpose token) and `POST /api/email-confirmation-message` (body exactly `{}`, a valid session of an unblocked account, 401 `unauthenticated` otherwise, 409 `email-already-confirmed` for a confirmed account, else 200 with `confirmationMessage` `sent`, `limited` or `failed`), both behind the transport gate, `no-store`, the unconfigured 503 and the D-104 guards. `POST /api/accounts` runs the send step after the session is stored and answers 201 with `emailConfirmed: false` and `confirmationMessage` in every outcome of the send; a refused registration or an unstored session sends nothing. `GET /api/account` and `POST /api/session` add `emailConfirmed`. The send step creates a token, issues its row under the D-105 limits, composes and hands the message to the runtime's mailer, never throws to the route, and maps each failure as spec Decision 4 lists (an issue that throws or finds the account blocked, a mailer failure or missed deadline); earlier links are spent by the issue itself, with no retire step after `sent` (spec *Decisions*, the orchestrator's note). `src/server/account-policy.ts` holds the D-105 numbers and window, the link lifetime of 24 h, and the token's creation, format check (43 base64url characters decoding to 32 bytes and re-encoding identically) and SHA-256 digest, pure and without HTTP or the database. Route tests run on real HTTP and SQLite with a stand-in mailer that records messages and returns the outcome the case chooses or never answers; the token is read from the recorded link.
- **Change:** `src/server/account-routes.ts` · `src/server/account-policy.ts` · `tests/http.test.mjs` · `tests/transport.test.mjs`
- **Read:** `.runs/task-cycles/potwierdzenie-adresu/task.md:17-34` To do ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:36-67` Questions to settle ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:152-168` Settlements to record ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:53-94` Constraints ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:98-118` 1. Where the D-105 counters stand ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:120-144` 2. The token and the link ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:146-193` 3. Schema version 3 ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:195-245` 4. Routes and their contracts ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:247-264` 5. How the browser learns the outcome at registration ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:348-376` 9. Testing without the real Outsider ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:433-448` 12. Units and their interfaces ·
  plan Foundation entries F1, F2, F3, F8, F9, F10, F11, F17, F18, F20, F21, F22, F23, F32, F33 ·
  `foundations/decisions.md:1701-1712` D-96 · `foundations/decisions.md:1744-1757` D-99 ·
  `foundations/decisions.md:1787-1800` D-102 · `foundations/decisions.md:1802-1815` D-103 ·
  `foundations/decisions.md:1817-1828` D-104 · `foundations/decisions.md:1830-1843` D-105 ·
  `foundations/decisions.md:1884-1895` D-109 · `foundations/decisions.md:1897-1910` D-110 ·
  `foundations/decisions.md:1981-1994` D-116 · `foundations/decisions.md:766-779` D-37 ·
  `foundations/decisions.md:1524-1535` D-86 · `foundations/decisions.md:2484-2497` D-137 ·
  `foundations/decisions.md:2512-2525` D-139 ·
  `foundations/invariants.md:718-726` account-session-authorization ·
  `foundations/invariants.md:728-736` account-mutation-request-guards ·
  `foundations/invariants.md:738-746` account-request-transport ·
  `foundations/invariants.md:788-796` account-attempt-limits ·
  `foundations/invariants.md:798-806` account-attempt-tracking ·
  `foundations/invariants.md:838-846` blocked-account-access ·
  `foundations/invariants.md:858-866` unblock-restores-no-session ·
  `foundations/invariants.md:628-636` email-verification-nonblocking ·
  `foundations/invariants.md:608-616` player-self-registration ·
  `foundations/environment_facts.md:310-314` fetch-origin-header ·
  `foundations/part_map.md:58-74` account-server ·
  `src/server/app.ts` · `src/server/transport.ts` · `src/server/configuration.ts` ·
  `src/server/database.ts` ·
  `guidelines/coding.md` · `guidelines/coding-http-application.md` ·
  `guidelines/coding-account-policy.md` · `guidelines/coding-database-access.md` ·
  `guidelines/testing.md` ·
  src/server/account-mail.ts and guidelines/coding-mail-sending.md (made in Slices 2 and 3)
- **Model:** same — a session-less authority and the send step's failure ordering at the trust boundary, across HTTP, the database, the mailer and the block command's concurrent write.
- **Risk:** trust boundary — `src/server/**`
- **Checks:** `npm test -- tests/http.test.mjs`, starting from failing cases: registration answers 201 with `sent`, `limited` and `failed` (stand-in failing, never answering past the shortened deadline, issue throwing) and sends nothing for refused registrations; resend for no session, a blocked account's deleted session, a confirmed account and over each limit; confirmation once, expired, spent, superseded by a later issued link (also one whose send failed), other purpose and malformed all giving the one `invalid-link` answer; a block committed through a second connection while the stand-in mailer holds its answer spends the link, which confirms nothing after unblocking; a block committed before issuing leaves no row and sends nothing; the token never appears in a response or the log. Then `npm test -- tests/transport.test.mjs` (Origin, body and transport refusals on both new routes before mutation), `npm test -- tests/account-storage.test.mjs`, `npm test -- tests/startup.test.mjs`; `python -B .the-way/elements/common/foundation_check.py`.
- **Depends on:** Slice 1 · Slice 2 · Slice 4 · F1 · F2 · F3 · F10 · F11 · F17 · F18 · F20 · F21 · F22

### Slice 6 — The browser client's confirmation calls

- **Goal:** `src/browser/account-api.ts` reads a required boolean `emailConfirmed` in every account body (an account without it is `unexpected`); `register` returns the account with the `confirmationMessage` value (`sent`, `limited` or `failed`, anything else `unexpected`); new `confirmEmail(token)` succeeds on 204 only; new `sendConfirmationMessage()` returns the `confirmationMessage` value on 200 only; `invalid-link` and `email-already-confirmed` join the known refusal codes. Requests go to the relative paths with the method and JSON body each route takes, follow no redirect and keep the client's time limit.
- **Change:** `src/browser/account-api.ts` · `tests/account-api.test.mjs`
- **Read:** `.runs/task-cycles/potwierdzenie-adresu/spec.md:195-245` 4. Routes and their contracts ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:378-420` 10. The browser ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:348-376` 9. Testing without the real Outsider ·
  plan Foundation entries F2, F3, F19 ·
  `foundations/decisions.md:1996-2009` D-117 · `foundations/decisions.md:1871-1882` D-108 ·
  `foundations/invariants.md:808-816` account-client-requests ·
  `foundations/invariants.md:818-826` account-client-outcomes ·
  `foundations/environment_facts.md:256-260` fetch-same-origin-credentials ·
  `foundations/part_map.md:3-26` browser-view ·
  `src/browser/AGENTS.md` · `guidelines/coding.md` · `guidelines/coding-browser-api-client.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/account-api.test.mjs`, starting from failing cases: an account body without `emailConfirmed` is `unexpected`; each `confirmationMessage` value and an unknown one; `confirmEmail` on 204, 400 `invalid-link` and a 200; `sendConfirmationMessage` on 200, 401 and 409; the paths, methods and bodies sent.
- **Depends on:** Slice 5 · F19

### Slice 7 — The header row and the confirmation from the link

- **Goal:** A new browser module `src/browser/view/email-status.ts` draws, on a line of its own in the header after the title, „Wyloguj” and its warning, for a signed-in player with an unconfirmed address on every screen, one sentence and the shared button „Wyślij ponownie”, as spec Decision 10 gives: the sentence „Adres e-mail niepotwierdzony.” in `text-secondary` until a send made in this page ends, then the outcome's sentence in its role; the button disabled with „Wysyłanie…” while waiting and focused again after the answer; only the last request's answer acts; the row disappears on `email-already-confirmed` and leaves with the game on logout. A new module `src/browser/view/email-confirmation.ts` reads `#confirm-email=<token>` from the page's address, and the page start in `src/browser/view/app.ts` first shows „Potwierdzanie adresu…” in `text-secondary` where „Sprawdzanie logowania…” stands, sends the confirmation, removes the fragment with `history.replaceState` only on a definitive answer, then runs the session check and shows the result sentence (`positive` or `warning`, or the client's failure in `warning`) above the screen the check leads to until the next change between forms and game. `src/browser/view/account-screen.ts` passes the registration's `confirmationMessage` on through `signedIn`, so the header row starts with that outcome's sentence; sign-in and reload start with „Adres e-mail niepotwierdzony.”. Styles in `src/browser/styles.css` read tokens only; no new token or role. Pure functions (reading the fragment, outcome to sentence and role) and the modules' behaviour on the hand-made document model have unit tests under `tests/view/`.
- **Change:** `src/browser/view/email-status.ts` · `src/browser/view/email-confirmation.ts` · `src/browser/view/app.ts` · `src/browser/view/account-screen.ts` · `src/browser/styles.css` · `tests/view/email-status.test.mjs` · `tests/view/email-confirmation.test.mjs` · `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/potwierdzenie-adresu/task.md:17-34` To do ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:36-67` Questions to settle ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:152-168` Settlements to record ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:120-144` 2. The token and the link ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:247-264` 5. How the browser learns the outcome at registration ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:378-420` 10. The browser ·
  plan Foundation entries F2, F3, F4, F23, F33 ·
  `foundations/decisions.md:796-809` D-39 · `foundations/decisions.md:811-824` D-40 ·
  `foundations/decisions.md:871-884` D-44 · `foundations/decisions.md:751-764` D-36 ·
  `foundations/decisions.md:1701-1712` D-96 · `foundations/decisions.md:1714-1727` D-97 ·
  `foundations/decisions.md:1996-2009` D-117 · `foundations/decisions.md:1550-1561` D-88 ·
  `foundations/invariants.md:628-636` email-verification-nonblocking ·
  `foundations/invariants.md:458-466` browser-view-token-values ·
  `foundations/invariants.md:35-43` browser-view-framework ·
  `foundations/invariants.md:468-476` browser-view-focus-outline ·
  `foundations/glossary.md:87-92` headquarters · `foundations/glossary.md:94-98` unit test ·
  `foundations/part_map.md:3-26` browser-view ·
  `src/browser/account-api.ts` · `src/browser/view/controls/button.ts` ·
  `src/browser/view/controls/text-field.ts` · `src/browser/view/status-row.ts` ·
  `src/browser/AGENTS.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/email-status.test.mjs` and `npm test -- tests/view/email-confirmation.test.mjs`, starting from failing cases: each outcome's sentence and role, the waiting label, a stale answer ignored, the row hidden when confirmed; a fragment with a token, without one and malformed; confirmation before the session check, the fragment kept after a lost connection and removed after a definitive answer. Then `npm test -- tests/view/account-screen.test.mjs`, `npm test -- tests/invariants/test_browser_view_token_values.py`, `npm test -- tests/invariants/test_browser_view_focus_outline.py`, `npm test -- tests/invariants/test_browser_view_framework.py`, `npm test -- tests/quality/test_quality_invariants.py`; the check of a changed user interface that `make-change` gives.
- **Depends on:** Slice 6 · F3 · F4

### Slice 8 — The page of every state and the styleguide's waiting label

- **Goal:** The kitchen-sink page shows the header row with „Wyślij ponownie” waiting („Wysyłanie…”) and with a refusal sentence beside the button, with made-up values and no game state, built from the module of Slice 7. The styleguide's rule „States of shared controls” names „Wysyłanie…” of „Wyślij ponownie” beside „Logowanie…” and „Zakładanie konta…”, and its rule on the kitchen-sink page names the header row's states, written as the cycle's author of `the-way-maintain-styleguide` writes the styleguide's file, from the meaning F4 carries (approved in answer 3, WAY-172).
- **Change:** `src/browser/kitchen-sink/kitchen-sink.ts` · `src/browser/kitchen-sink/kitchen-sink.css` · `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/potwierdzenie-adresu/task.md:17-34` To do ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:152-168` Settlements to record ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:378-420` 10. The browser ·
  plan Foundation entries F3, F4 ·
  `foundations/decisions.md:781-794` D-38 · `foundations/decisions.md:871-884` D-44 ·
  `foundations/decisions.md:886-899` D-45 · `foundations/decisions.md:796-809` D-39 ·
  `foundations/decisions.md:811-824` D-40 ·
  `foundations/invariants.md:498-506` application-build-kitchen-sink ·
  `foundations/invariants.md:458-466` browser-view-token-values ·
  `foundations/part_map.md:3-26` browser-view ·
  `src/browser/kitchen-sink/index.html` · `src/browser/view/controls/button.ts` ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/styleguide/template.md` ·
  `.the-way/product-guidelines/styleguide/SKILL.md` ·
  `src/browser/AGENTS.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  src/browser/view/email-status.ts (made in Slice 7)
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_application_build_kitchen_sink.py`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/quality/test_quality_invariants.py`; `python -B .the-way/elements/common/foundation_check.py`; the check of a changed user interface that `make-change` gives, on the page `npm run kitchen-sink` builds.
- **Depends on:** Slice 7 · F4

### Slice 9 — The deployment grants the SMTP password, and the deploy skill says so

- **Goal:** `compose.yaml` declares the secret `loop2_smtp_password` from `/etc/loop2/smtp-password`, granted only to `app` in the short form, and gives `app` the five mail settings as plain values (`LOOP2_MAIL_FROM` and `LOOP2_SMTP_USER` `loop2@mariusznazar.com`, `LOOP2_SMTP_HOST` `outsider.mikr.us`, `LOOP2_SMTP_PORT` `587`, `LOOP2_SMTP_PASSWORD_FILE` `/run/secrets/loop2_smtp_password`); `deploy/loop2-deploy` and the Dockerfile do not change. `tests/invariants/test_loop2_host_sharing.py` admits exactly the third secret for `app` and the fixed settings, and still refuses every other source, grant or option. Both copies of the `loop2-deploy` skill, kept byte-identical, say where the SMTP password lies and how its metadata is read (`stat -c '%U %g %a' /etc/loop2/smtp-password`, expecting `root 1000 440`), its rotation by the human (replace the file and the private copy, then recreate the application container), what the human set in Outsider and DNS (H1, H2), that an agent never reads or changes it and never sends mail through Outsider, the rollback note that the first deployment of this change moves the database to version 3 so earlier code refuses it, H4, and the failure line's error code (`EAUTH` against a connection or TLS failure) as what an agent may read in the service logs. No value of a credential or access stands in any file.
- **Change:** `compose.yaml` · `tests/invariants/test_loop2_host_sharing.py` · `.claude/skills/loop2-deploy/SKILL.md` · `.claude/skills/loop2-deploy/references/setup_and_secrets.md` · `.claude/skills/loop2-deploy/references/troubleshooting.md` · `.agents/skills/loop2-deploy/SKILL.md` · `.agents/skills/loop2-deploy/references/setup_and_secrets.md` · `.agents/skills/loop2-deploy/references/troubleshooting.md`
- **Read:** `.runs/task-cycles/potwierdzenie-adresu/task.md:17-34` To do ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:36-67` Questions to settle ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:69-83` Context ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:96-101` Human actions ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:152-168` Settlements to record ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:301-328` 7. Startup configuration of mail ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:330-346` 8. The SMTP password's path ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:422-431` 11. The two delivery questions ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:525-542` Left to the maker ·
  plan Foundation entries F6, F7, F9, F12, F16, F24, F26, F28, F30 ·
  `foundations/decisions.md:211-230` D-11 · `foundations/decisions.md:232-250` D-12 ·
  `foundations/decisions.md:252-265` D-13 · `foundations/decisions.md:284-302` D-15 ·
  `foundations/decisions.md:331-354` D-17 · `foundations/decisions.md:1938-1949` D-112 ·
  `foundations/decisions.md:2484-2497` D-137 · `foundations/decisions.md:1912-1923` D-111 ·
  `foundations/invariants.md:155-163` loop2-host-sharing ·
  `foundations/environment_facts.md:196-200` compose-file-secret-permissions ·
  `foundations/environment_facts.md:202-206` mikrus-tunnel-outbound-tcp ·
  `foundations/environment_facts.md:304-308` docker-volume-lifecycle ·
  `foundations/glossary.md:32-37` deployment · `foundations/glossary.md:39-44` test server ·
  `foundations/part_map.md:108-122` agent-workflow · `foundations/part_map.md:132-153` deployment ·
  `tests/agent_workflow/test_loop2_deploy_skill.py` ·
  `guidelines/coding.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** trust boundary — keys and the deployment: `compose.yaml` grants a runtime credential to the container, and the skill tells agents and the human how that credential and the first deployment of schema version 3 are handled (added by the orchestrator in the plan's review).
- **Checks:** `npm test -- tests/invariants/test_loop2_host_sharing.py`, starting from failing cases: the third secret granted to `app` only and the five settings fixed; a grant of it to `cloudflared`, an `environment` source and a long-form option refused. Then `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`; where Docker answers, `npm test -- tests/deploy/test_account_storage.py` (all cases skipped is reported as unchecked); `python -B .the-way/elements/common/foundation_check.py`.
- **Depends on:** Slice 4 · F6 · F7 · F16

### Slice 10 — Testing guidelines for code that talks to SMTP and for the new routes

- **Goal:** `guidelines/testing.md` answers „Czy kod rozmawia z cudzą usługą?” for Outsider's SMTP (a real SMTP server on loopback for the mailer, a stand-in mailer for the routes, which proves their reaction and not the SMTP operation, no test reaching the real Outsider), names `tests/account-mail.test.mjs` among the integration test files, adds the trust-boundary rows of the two new routes and the direct refusal cases that check them, and changes the existing rows this change alters: the `GET /api/account`, `POST /api/accounts` and `POST /api/session` rows (their bodies gain `emailConfirmed`, registration its send outcome), the D-104 rows and the `src/server/` row that list three state-changing routes, and the transport row "na czterech trasach"; and the count of D-73's departures at `guidelines/testing.md:10-11` („jego sześć odstępstw …”), which D-151 makes seven, with any *Decision* list that names them (added by the orchestrator from Slice 1's review, m2). Written as the cycle's author of `the-way-maintain-testing-guidelines` writes `guidelines/testing.md`, on the meaning F32 settles; a meaning neither F32 nor another decision carries is not written but returned as a question (WAY-172).
- **Change:** `guidelines/testing.md`
- **Read:** `.runs/task-cycles/potwierdzenie-adresu/task.md:17-34` To do ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:69-83` Context ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:195-245` 4. Routes and their contracts ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:348-376` 9. Testing without the real Outsider ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:450-523` Foundation entries ·
  plan Foundation entries F10, F17, F18, F20, F21, F22, F27, F32 ·
  `foundations/decisions.md:1353-1364` D-73 · `foundations/decisions.md:1433-1444` D-79 ·
  `foundations/decisions.md:1459-1470` D-81 · `foundations/decisions.md:1498-1509` D-84 ·
  `foundations/decisions.md:1511-1522` D-85 · `foundations/decisions.md:1817-1828` D-104 ·
  `foundations/decisions.md:1884-1895` D-109 · `foundations/decisions.md:1830-1843` D-105 ·
  `foundations/glossary.md:94-98` unit test · `foundations/glossary.md:100-104` integration test ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/testing/template.md` ·
  `.the-way/product-guidelines/testing/SKILL.md` ·
  `guidelines/coding.md` · `tests/http.test.mjs` · `tests/transport.test.mjs` ·
  tests/account-mail.test.mjs (made in Slice 2)
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` (guidelines' references to decisions and invariants).
- **Depends on:** Slice 2 · Slice 5 · F32

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Outcome: after registration a message sent from the loop2 container through Outsider from `mariusznazar.com`, whose link confirms the address; play goes on unconfirmed | Slices 2, 4, 5, 7, 9; F5, F23, F24, F25, F26, F27; H4 (human, after the request) |
| To do 1 — send after registration through Outsider SMTP 587 with Nodemailer 10, TLS required; account and entry never depend on the send or D-105 | Slices 2, 4, 5; F5, F25, F26, F27, F29 |
| To do 2 — plain text, subject and body | Slice 2; F5 |
| To do 3 — the link opens the game page, which confirms through a D-104 request, signed in or not | Slices 5, 6, 7; F2, F10 |
| To do 4 — „Potwierdzanie adresu…”, then the result sentence above forms or headquarters | Slice 7; F2 |
| To do 5 — 24 h, once, a new link invalidates earlier ones | Slices 1, 5; F1, F21 |
| To do 6 — header row, its sentences and roles, also right after registration | Slices 5, 6, 7; F3 |
| To do 7 — resend only signed in and to the own address, „Wysyłanie…”, limit and failure sentences | Slices 5, 6, 7; F3, F10, F11, F22 |
| To do 8 — D-44 and „States of shared controls” gain „Wysyłanie…”, kitchen-sink shows waiting and refusal | F4; Slices 7, 8 |
| To do 9 — existing accounts unconfirmed, no account or session lost, the next schema version | Slice 1; F12, F14 |
| To do 10 — production startup requires the mail settings and the password file, read-only Compose secret; unconfigured mode stays | Slices 4, 9; F6, F7, F15, F16 |
| To do 11 — the deploy skill in both copies: SMTP password, rotation, Outsider and DNS | Slice 9 |
| To do 12 — the first mail file is the exemplar of a new kind, with kind guidelines and an index row | Slices 2, 3; F13 |
| To do 13 — `guidelines/testing.md` on testing code that talks to SMTP, its meaning approved as WAY-172 gives | F32; Slice 10 |
| To do 14 — `mikrus-outsider-mail/1` | F28 |
| To do 15 — delivery from the deployed container and the link confirming (H4) | H4, the human's, after the request; Slice 9 documents it; F24's second sentence written only if H4 passed before the merge |
| To do 16 — blocking invalidates links, a blocked account's link refused, none back after unblock, with a test | Slices 1, 5; F9, F20 |
| K1 | F1; Slices 1, 5 |
| K2 | F2, F10; Slices 5, 6, 7 |
| K3 | F3, F10; Slices 5, 6, 7 |
| K4 | F4; Slices 7, 8 |
| K5 | F5; Slice 2 |
| K6 | F6, F15; Slices 4, 9 |
| K7 | F7, F16; Slices 4, 9 |
| K9 | F8 |
| K10 | F9, F20; Slices 1, 5 |
| Projected `mikrus-outsider-mail/1` (whole) | F28 |
| Projected „How does a player sign in and reset a forgotten password?” (part) | F23 |
| Projected „Which service delivers account emails?” (part) | F24 |
| Projected „How does the account server send email through Outsider?” (part) | F25; Slice 2 |
| Projected `account-email-via-outsider/1` (part) | F26; Slices 2, 4, 9 |
| Projected `account-email-nodemailer-starttls/1` (part) | F27; Slice 2 |
| `email-verification-nonblocking` kept | Slices 5, 7 (registration answers 201 and enters the headquarters whatever the send does) |
| Spec *Foundation entries*: D-105, D-109, D-112, D-137 changes; exemplar decision; invariant changes and candidates; Nodemailer fact; part map; glossary | F9, F10, F11, F12, F13, F14–F22, F29, F30, F31, F33 |
| Spec *Foundation entries*, guidelines: kind file and index row; testing rows; styleguide | Slices 3, 10, 8 |
| Checks carried by a pin move | none — the task does not move the pin |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| F31, the part map's claim of `tests/account-mail.test.mjs`, is written by Slice 2 with the file, since `foundation_check.py` reports a *Files* pattern that matches no tracked file | the foundation step writes it before Slice 1 — the foundation check fails from then until Slice 2 | Slice 1's mechanical check sees one fewer foundation file than the spec lists; none for the product |
| The kind is named `mail-sending`, its file `guidelines/coding-mail-sending.md`, after what the code does, as `password-hashing` and `database-access` are | `account-mail`, after the file | a rename of the kind in F13, the index row and the file name |
| The kind's guidelines are a slice of their own (Slice 3), written by an agent that did not write the exemplar | the mailer's author writes them in Slice 2 — the exemplar's author describes its own code | one more dispatch |
| The confirmation from the link takes a module of its own, `src/browser/view/email-confirmation.ts` (left to the maker by the spec) | the flow in `app.ts` — the fragment reading cannot be unit-tested without starting the page, and `app.ts` grows | one more module in the view |
| Token creation, format check, digest, the D-105 numbers and the link lifetime enter `account-policy.ts` in Slice 5; Slice 1's database methods take digests, times and limits as arguments | in Slice 1 with the database — that slice would change two kinds of code and its tests would need no policy | Slice 1's tests compute digests themselves |
| Every fixture that configures accounts gains synthetic mail settings in Slice 4, together with the requirement, so every slice leaves its tests passing | updating fixtures with the routes in Slice 5 — the tests fail between the slices | a larger Slice 4 |
| `compose.yaml` and its host-sharing test go with the deploy skill in Slice 9, not with the configuration in Slice 4 | `compose.yaml` in Slice 4 — Slice 4 would span four parts | commits between Slices 4 and 9 hold a `compose.yaml` without the mail settings; no deployment of the branch happens before the request (H4 after it) |
| `tests/password-measurement.test.mjs` stays unchanged: the measurement entrypoint ignores account settings and opens no settings file | adding the mail settings to its environment | none known |
| The browser client is a slice of its own (Slice 6), a contract the reviewer judges against the routes | in the view slice — Slice 7 would change ten files of two kinds | one more dispatch |
| The testing guidelines come last (Slice 10), after the cases they cite exist; the meaning they rest on (F32) is settled by the foundation step before any code | testing guidelines before the mailer — they could not name the cases | none, while F32 is settled first |
| Slices 1, 2 and 5 run on the same class as the orchestrator, the rest cheaper | all cheaper | a retry one class higher for a slice that fails (WAY-229) |
