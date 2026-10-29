# Slice 2 report — the mailer, first file of the kind mail-sending

**Status:** `done with concerns` (concerns C1–C3 below; none blocks the slice's goal)

Slice base `589f4d7`, branch `task/potwierdzenie-adresu`, worktree
`C:\Storage\repos\loop2-wt\potwierdzenie-adresu`. Not pushed.

## Commits

| Commit | Message |
|---|---|
| `2798337` | feat: :sparkles: send account mail through SMTP only after STARTTLS, bounded and never throwing |
| `7b621ce` | test: :white_check_mark: test the mailer against a real SMTP server on loopback |

## Files changed (added / removed lines)

| File | + | − | Commit |
|---|---|---|---|
| `src/server/account-mail.ts` (new) | 190 | 0 | `2798337` |
| `package.json` | 3 | 1 | `2798337` |
| `package-lock.json` | 44 | 1 | `2798337` |
| `tests/account-mail.test.mjs` (new) | 512 | 0 | `7b621ce` |
| `foundations/part_map.md` (F31) | 1 | 0 | `7b621ce` |

## Dependencies (as the handoff asks)

- `nodemailer` **10.2.1**, exact, in `dependencies` (no runtime dependencies of its own; types bundled).
- `smtp-server` **3.21.1**, exact, in `devDependencies`; its `dependencies` are `nodemailer: 10.2.1`
  (deduplicated with ours, `npm ls` shows `nodemailer@10.2.1 deduped`), `punycode.js 2.3.1`,
  `ipv6-normalize 1.0.1` — the lockfile gains these four packages and nothing else.
- Audit: the slice's check `test_introduced_npm_vulnerabilities` passed (no advisory the lockfile at
  `{fork-point}` `7a633a7` does not report). For reference, the pinned npm 12.2.1 audit of the
  current lockfile (command of D-33) reports 4 advisories in total (moderate 2, high 2) in
  `body-parser`, `ip-address`, `qs`, `undici` — all present before this slice; none in the four added
  packages.
- Install was run with the machine's npm 11.13.0 (`npm install --save-exact …`), not the repository's
  pinned npm 12.2.1; the lockfile diff is only the four entries and the two root dependency lines.

## Checks run

| Command | Exit | Note |
|---|---|---|
| `npm test -- tests/account-mail.test.mjs` | 0 | 7 tests, 7 pass (final run, committed content) |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | 1 test |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests: ESLint, Ruff, ShellCheck, Prettier, introduced npm vulnerabilities (audit read the public registry) |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors`, run with the test file staged, content as committed |
| `npm run typecheck` | 0 | before the tests were written |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/server/account-mail.ts tests/account-mail.test.mjs` | 0 | before the quality test |

Not run: the whole gate (`npm test` without a file), as the handoff and the method say.
`tests/invariants/test_loop2_one_serving_process.py` is not a check of this slice (handoff).

### The invariant's test seen failing (`account-email-nodemailer-starttls`)

The mailer was written before its test file (the harness — certificate, SMTP server — had to exist
first), so the invariant's test was seen failing by breaking the behaviour for a moment, as the
method allows: `requireTLS: true` → `false` and the mailer's own `if (!connection.secure)` guard
removed.

- Failing run: `npm test -- tests/account-mail.test.mjs` → exit 1; only
  "a server that offers no STARTTLS receives no login and no message" failed, at
  `assert.equal(outcome, "failed")` with `'sent' !== 'failed'` (the client logged in and submitted in
  plain text to the server that offered no STARTTLS).
- Restored, passing run: the same command → exit 0 (table above).
- Each half alone (only `requireTLS: false`, or only the guard removed) still passes: either one
  refuses plain text. Both are kept on purpose (defence in depth); a reviewer mutating one of them
  will see no failure.

### Other mutations run (each applied, test run, file restored and compared byte for byte)

| Mutation in `account-mail.ts` | Result of `npm test -- tests/account-mail.test.mjs` |
|---|---|
| `rejectUnauthorized: false` | exit 1 — the certificate case fails |
| `logger: true` (alone, and with `debug`/`transactionLog`) | exit 1 — the console case fails |
| failure line also prints `error.message` | exit 1 — the console case fails ("the line holds smtp-login@example.test", the server's refusal repeats the login) |
| no `connection.close()` on failure | exit 1 — the deadline case fails (server never sees the close within 3 s) |
| deadline option ignored (60 s) | exit 1 — the deadline case fails |
| recipient check always passes | exit 1 — the crafted-recipient case fails |
| paragraphs joined by one newline | exit 1 — the message case fails |
| From display name empty | exit 1 — the message case fails |

Left without a test that fails (named so the reviewer sees them):

- `minVersion: "TLSv1.2"` — Node 24's default minimum is already TLS 1.2, so removing it changes
  nothing observable today; it stays as a statement that does not depend on Node's default.
- Per-phase timeouts (5 s each) — a test would wait 5 s per case; the overall deadline is tested.
- `disableFileAccess` / `disableUrlAccess` — the composed message never holds a path or URL
  attachment, so removing them is equivalent for every input the mailer takes.
- `quit()` after `sent` instead of `close()` — not observable in outcome.
- Host-name verification against a DNS host name (production `outsider.mikr.us`): the tests connect
  to `127.0.0.1` because Nodemailer resolves any host name through `dns.resolve4/6`, which would
  query a DNS server (network). Verification against the IP SAN and refusal of a certificate for
  another name are tested; that Nodemailer sets `servername` and `host` from a DNS host name for the
  STARTTLS `tls.connect` is read from its source (`dist/esm/smtp-connection/index.js`, the
  `_upgradeConnection` options and the constructor's `servername`), not tested.

## Own-work check (method section 3)

- Requirement most likely not met: "resolves to `sent` or `failed`, never rejecting" for settings or
  failures the cases do not reach.
- Check: a one-off script (scratchpad, not committed) sending through `SmtpMailer` with a refused
  port, port `NaN`, port `-5`, an empty host and a sender holding CR/LF, with `unhandledRejection` and
  `uncaughtException` handlers set.
- Showed: every send resolved `failed` (2–95 ms), none rejected, no unhandled error; failure lines
  `ESOCKET` / `ECONNECTION`. Exit 0.

## What was made

`src/server/account-mail.ts` exports:

- `composeConfirmationMessage(address, link): AccountMessage` — `{ to, subject, text }`, pure; subject
  and the three paragraphs of D-146, the link alone on the line after „otwórz odnośnik:”.
- `interface Mailer { send(message: AccountMessage): Promise<SendOutcome> }`, `SendOutcome = "sent" | "failed"`
  — the seam Slices 4 and 5 use for the runtime and the stand-in mailer.
- `MailSettings = { from, host, port, user, password }` — Slice 4 builds it from the five settings
  and the password file (names are mine; adapt there if spec Decision 7 names them otherwise).
- `class SmtpMailer implements Mailer`, `new SmtpMailer(settings, { deadline?, trustedCertificate? })`
  — `deadline` defaults to 10 000 ms; `trustedCertificate` (tests only) is added to Node's root
  certificates, never replacing them, and verification is never switched off.

`tests/account-mail.test.mjs` (integration test, D-81/D-84/D-151): `smtp-server` on port 0 of
`127.0.0.1`, readiness awaited within 5 s, closed in `t.after` within 5 s (`closeTimeout: 1000`),
no network. The TLS certificate is generated in the test (P-256 key, a small DER writer, self-signed,
valid from an hour ago for one day, SAN `IP:127.0.0.1` or `DNS:mail.example.test`) — no key or
certificate file in the repository, no `openssl` on PATH. Cases:

1. submission only after STARTTLS and login with the configured login and password (server records
   `secure` at AUTH and DATA, the authenticated user, envelope sender and the one recipient);
2. **`// invariant: account-email-nodemailer-starttls`** — a server that offers no STARTTLS (and
   would accept plain-text login and mail) receives no login and no message; outcome `failed`;
3. a certificate the mailer does not trust, and a trusted certificate for another host name: no
   login, no message, `failed`;
4. a server that holds its answer to DATA: `failed` within the 300 ms deadline (bound 3 s, under the
   5 s phase timeouts), and the server sees the connection closed;
5. 15 crafted recipients (CR/LF with a header, LF, comma, semicolon, angle brackets, second `@`,
   space, quote, colon, parentheses, square brackets, backslash, NUL, empty local part, empty domain)
   each `failed` with no connection; then a plain non-ASCII address (`gracz.ąę@przykład.test`) is sent
   on the same server;
6. the submitted message: From `loop2 <sender>` (quoted or not), To the one address, no Cc/Bcc,
   Subject „Potwierdź adres e-mail w loop2”, `text/plain`, body equal to the D-146 text with the link
   on its own line — headers and quoted-printable decoded by the test's own small decoder, not by the
   library;
7. the console: a child process sends one accepted and one refused message (outcomes over IPC);
   stdout is empty, stderr is exactly one line, it holds neither password, the login, the token nor
   the link, and it names `EAUTH`.

## Choices made (with the way rejected and the cost if wrong)

- **Nodemailer's `SMTPConnection` and `MailComposer` (public subpaths `nodemailer/lib/smtp-connection`,
  `nodemailer/lib/mail-composer`) instead of `createTransport().sendMail()`.** The transport gives no
  handle on the connection of a send in flight, so the 10 s deadline could only stop waiting, not close
  the connection, which spec Decision 5 requires. Rejected: `createTransport` with its `getSocket` hook
  owning the socket — bypasses the library's own connecting and timeouts. Cost if wrong: about
  twenty more lines in the exemplar (connect → login → send) that `sendMail` would hide; the kind's
  guidelines (Slice 3) describe this shape.
- **The mailer checks `connection.secure` after connecting, besides `requireTLS`** — see the failing
  run above. Cost: one line that no single mutation exposes.
- **Login always attempted** (not only when the server advertises AUTH), so a server without AUTH
  makes the send fail instead of submitting unauthenticated.
- **Pinned `nodemailer` 10.2.1, not the registry's latest 10.3.0** (published 2026-10-29 06:12 UTC,
  today). 10.2.1 is the version `smtp-server` 3.21.1 (its latest) depends on, as the slice requires,
  and the version the fact `nodemailer-require-tls` was read from. Cost if wrong: an upgrade to 10.3
  needs a matching `smtp-server` and a re-read of the fact.
- **Failure line `Account mail failed: <CODE>`**, `<CODE>` the error's `code` only when it is an
  upper-case word (`/^[A-Z][A-Z0-9_]*$/`), else `unknown`. The overall deadline and a refused recipient
  have no library code and log `unknown`, as spec Decision 6 words it. Rejected: an own word such as
  `EDEADLINE` — the spec allows only the library's code or "unknown". Cost if wrong: during H4 a hang
  cut by the deadline is not told apart from other non-library failures by its line; a hang shorter
  than the deadline still shows the library's `ETIMEDOUT` from its 5 s phase timeouts.
- **Per-phase timeouts 5 s** (connection, which covers DNS, greeting, socket; DNS 5 s) — "a few seconds"
  in spec Decision 6; the 10 s deadline bounds the sum.
- **To header passed as an address object, not a string**, so the library never parses the recipient
  as an address list.

## Reaches beyond the dispatch

- Installed sources of `nodemailer` 10.2.1: `dist/esm/smtp-transport/index.js` (whether `sendMail`
  exposes the connection), `dist/esm/smtp-connection/index.js` (options, `requireTLS`, STARTTLS
  upgrade options, `servername`, `login` fallback, timeouts, logger), `dist/esm/shared/index.js`
  (`resolveHostname`: a host name goes to `dns.resolve4/6` — why the tests use `127.0.0.1`),
  `smtp-connection/index.d.ts`, `mail-composer/index.d.ts`, `package.json` exports — for the options
  and their names, as the plan allows.
- Installed sources of `smtp-server` 3.21.1: `dist/esm/types.d.ts` (options and session fields),
  `dist/esm/smtp-server.js` (handlers, close), `dist/esm/tls-options.js` (its built-in certificate is
  for `CN=localhost`, no SAN, expired 2025-02-09 — so the test makes its own).
- npm registry metadata: `npm view nodemailer dist-tags versions time`, `npm view smtp-server` version,
  dependencies and time — to pick the pinned pair.
- `scripts/test.py`, `scripts/test-node-file.mjs` (how a single Node file runs), `tests/http.test.mjs`
  `listen`/`close` helpers and `tests/passwords.test.mjs` (child-process pattern, import of
  `dist/server`), `src/server/passwords.ts` and `src/server/account-policy.ts` (style), the
  `console.error` uses in `src/server/` — for the repository's patterns.
- For F31 through `the-way-update-part-map`: `.the-way/elements/part-map/skill/SKILL.md`,
  `template.md`, `examples.md`, `elements/common/rules.md`, `elements/common/way_of_working.md`.
- `.runs/task-cycles/potwierdzenie-adresu/plan.md` searched for "mailer|account-mail|compose" — to see
  what later slices expect of the interface; `reports/06-foundation-report.md` § Entries written — the
  F-row to identifier map the handoff names.

## Concerns for the orchestrator

- **C1 — the part map's `account-server` sentence does not name sending mail.** It reads "serves the
  built game, handles the HTTP requests sent to it, owns account and session persistence, gives the
  operator a command that blocks and unblocks a player account, and measures its own password work";
  from this slice the part also composes and submits account email to Outsider (D-141, D-142, D-150).
  The update-part-map skill's step 2 found it; the plan gives Slice 2 only F31, and the sentence is
  an entry's binding part, so I did not change it. Recommended: the orchestrator adds the change (e.g.
  "…, sends account email messages through the mail service, …") through `the-way-update-part-map`
  in the return step or a later slice. If left, the map under-describes the part and the next reader
  of the map does not find mail sending under any part's responsibility.
- **C2 — `nodemailer` 10.3.0 was published today**; the slice pins 10.2.1 for the reasons above.
  Nothing to do now; named so the review does not read the pin as stale by accident.
- **C3 — two protections have no failing test** (`requireTLS` alone vs the `secure` guard alone, and
  `minVersion`), listed above with the reason.

## Plan versus code

- No structural mismatch. Small adaptation: the plan says the mailer is "built from the mail
  settings"; the settings object's field names (`from`, `host`, `port`, `user`, `password`) are this
  slice's choice, since the configuration that reads them comes in Slice 4.
