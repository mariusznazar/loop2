FAIL 7b621ce

# Review — Slice 2 of `potwierdzenie-adresu` (the mailer), range `589f4d7..7b621ce`

Reviewer: fresh agent, did not make the change. Method: `.the-way/task-cycle/review/SKILL.md`
(pinned the-way `3aee7d9`). `git rev-parse HEAD` in the reviewed worktree is `7b621ce`, the head
given. Checks needing a build ran in a separate detached worktree of `7b621ce`
(`C:\Storage\repos\loop2-wt\rv-s2-7b621ce`, removed at the end).

Counts: blocking 1 (Important) · Minor 1 · out of scope 0.

## Findings

### Important

**I1 — the test's self-made certificate is invalid about once in 230 certificates, so the whole
test file fails at random (about 1 run in 115).**
Place: `tests/account-mail.test.mjs:64-65`

```js
  const serial = randomBytes(16);
  serial[0] &= 0x7f;
```

What is wrong: the serial number is written as a DER INTEGER as is. When the masked first byte is
`0x00` and the second byte is below `0x80` (chance 1/128 × 1/2 = 1/256), the INTEGER has a
non-minimal leading zero, which DER forbids. OpenSSL rejects such a certificate with
`ERR_OSSL_ASN1_ILLEGAL_PADDING` ("asn1 encoding routines::illegal padding") when `SMTPServer`
builds its secure context, so the server constructor throws. The file makes two certificates at
module load: a bad `localCertificate` fails all seven cases; a bad `otherHostCertificate` fails the
certificate case.

Why it matters: a test of the full gate goes red on code that is correct, with no relation to the
change under test, on roughly one gate run in 115 — on the developer's machine, before every
request and on every later change. The testing guidelines' "Flaky tests" rule
(`guidelines/testing.md:256-264`) forbids rerunning to get a green gate, so each such run costs a
diagnosis; and a red run of this file is what the cycle reads as "the STARTTLS invariant's test
failed". The fix is one line: keep the first byte in `0x01..0x7f` (for example
`serial[0] = (serial[0] & 0x7f) | 0x40`), so the INTEGER is always minimal and positive.

Evidence:
- Observed twice in my runs of the unchanged head: `node --test tests/account-mail.test.mjs`
  on the built head, 24 runs (3 rounds × 8 in parallel) — one run failed all 7 cases
  with `ERR_OSSL_ASN1_ILLEGAL_PADDING` at `smtp-server/dist/esm/smtp-server.js:243` ←
  `tests/account-mail.test.mjs:135`; and a mutation run (below) where the certificate case failed
  with the same error, unrelated to the mutation.
- Cause isolated: a scratch copy of the file's `der`/`oid`/`utcTime`/`certificate` (lines 28-103,
  unchanged, plus a hook recording the serial) made 3000 certificates and loaded each with
  `tls.createSecureContext`: 13 failed, and all 13 — and only those — had serial byte 0 = `0x00`
  and byte 1 < `0x80`. Exit 0, output `{"n":3000,"failures":13,"zeroLead":13,"zeroLeadFail":13}`.

### Minor

**M1 — the part map's `account-server` responsibility does not say that the part sends account
email.** Place: `foundations/part_map.md:60`. The sentence reads "serves the built game, handles the
HTTP requests sent to it, owns account and session persistence, gives the operator a command that
blocks and unblocks a player account, and measures its own password work"; from this slice
`src/server/account-mail.ts` (claimed by `src/server/**`) composes and submits mail to Mikrus
Outsider, which the map's *External context* now lists (`foundations/part_map.md:170`, F30). This
is the executor's concern C1, found by step 2 of `the-way-update-part-map`, which turns such a
finding into a change or a question. The plan gives Slice 2 only F31, so this slice correctly left
the binding sentence alone; graded Minor because no code or check depends on the sentence today.
Recommended: the orchestrator places the sentence change through `the-way-update-part-map` in a
later slice or the return step. If left, a reader of the map finds mail sending under no part.

## What I checked and found sound

- Against the slice goal, spec Decision 6 and D-146/D-150/D-142: pure composition with the D-146
  subject and three paragraphs, link alone on the line after „otwórz odnośnik:”; one operation
  resolving `sent`/`failed`; recipient refused without connecting for exactly the characters spec
  Decision 6 lists (`\s`, `\p{Cc}`, `, ; < > ( ) [ ] " \ :`, one `@` with text on both sides); explicit
  envelope; From `loop2 <from>`; To passed as an address object; no implicit TLS, `requireTLS`,
  `rejectUnauthorized: true`, `minVersion: "TLSv1.2"`; login always attempted; one connection per
  message; 5 s phase timeouts and a 10 s overall deadline as a constructor option; `logger`, `debug`,
  `transactionLog` off, `disableFileAccess`/`disableUrlAccess` on; one failure line with an
  upper-case code or `unknown`; the test seam adds a certificate to `rootCertificates` and never
  turns verification off.
- Deadline and late answers, by reading Nodemailer 10.2.1's installed source
  (`dist/esm/smtp-connection/index.js`): `close()` clears `_responseActions`, so a late reply calls
  no callback; a close during DNS resolution sets `_closing`, and the post-resolve path refuses to
  open a socket (lines 359-362); `_onError` emits `error` (the mailer listens, so no unhandled
  `error` event) and `finish` is idempotent. Host-name verification for a DNS host such as
  `outsider.mikr.us`: the constructor sets `servername` from a non-IP host (line 138) and
  `_upgradeConnection` passes `host` and `servername` to `tls.connect` (lines 1067-1073) — read from
  source, not testable without DNS (D-151); the IP-SAN variant is tested.
- Hostile input at the boundary: the crafted recipients (CR/LF with a header, LF, comma, semicolon,
  angle brackets, second `@`, space, quote, colon, parentheses, brackets, backslash, NUL, empty
  parts) never connect; Outsider's replies (untrusted per *External context*) reach the log only as
  a code matching `^[A-Z][A-Z0-9_]*$`, which Nodemailer sets from fixed strings (`_formatError`).
- The invariant `account-email-nodemailer-starttls` (`foundations/invariants.md:908-916`, method
  test): its case at `tests/account-mail.test.mjs:296-313` carries the marker and fails when the
  STARTTLS protection is removed (mutation below). No existing invariant test was changed.
- Dependencies: `nodemailer` 10.2.1 in `dependencies`, `smtp-server` 3.21.1 in `devDependencies`,
  whose lockfile entry depends on `nodemailer` 10.2.1 exactly; the lockfile gains only `nodemailer`,
  `smtp-server`, `punycode.js`, `ipv6-normalize` and the two root lines.
- Tests against `guidelines/testing.md`: integration level on a real SMTP server on port 0 of
  loopback; readiness and shutdown each awaited within 5 s and registered with `t.after`, so they
  run on failure; expected subject and body from D-146 (comment at line 423), decoded by the test's
  own decoder, not the library; preconditions labelled. The 300 ms deadline case did not flake under
  load: 32 runs at 16 in parallel on 20 logical CPUs, all passed, slowest 333 ms.
- Own-work check of the report (never rejecting): matches where the code is weakest; the error
  paths I traced in source agree with it.

## Declined to judge

- The field names of `MailSettings` (`from`, `host`, `port`, `user`, `password`) — Slice 4 reads the
  settings and may adapt them.
- Pinning `nodemailer` 10.2.1 rather than 10.3.0 (published 2026-10-29) — the plan requires the
  version `smtp-server`'s dependency names; a later upgrade is not this slice's task.
- Whether Outsider accepts non-ASCII local parts (SMTPUTF8) or the full address as login — H4, spec
  Decision 11.
- Installing with npm 11.13.0 instead of the pinned 12.2.1 — the lockfile diff holds only the
  expected entries and `lockfileVersion` is unchanged; nothing observable follows.

## Checks run

All in `C:\Storage\repos\loop2-wt\rv-s2-7b621ce` (detached at `7b621ce`, `npm ci` exit 0) unless said.

| Command / method | Exit | What it showed |
|---|---|---|
| `npm test -- tests/account-mail.test.mjs` | 0 | 7 of 7 pass |
| `node --test tests/account-mail.test.mjs`, 3 rounds × 8 parallel | 1 of 24 runs failed | the failing run: all 7 cases, `ERR_OSSL_ASN1_ILLEGAL_PADDING` (I1) |
| `node --test tests/account-mail.test.mjs`, 2 rounds × 16 parallel | 0 in all 32 | no timing flake of the 300 ms deadline case |
| scratch `cert_padding.mjs` (copy of test lines 28-103 + serial hook), 3000 certificates | 0 | 13 rejected, all with serial `00 <0x80` (I1) |
| mutation: `requireTLS: false` and the `connection.secure` guard removed, then `npm test -- tests/account-mail.test.mjs` | 1 | the invariant case fails at line 305, `'sent' !== 'failed'`; the certificate case also failed, from I1, not the mutation |
| mutation: only `requireTLS: false` | 0 | either protection alone keeps the case green, as the report says (C3) |
| mutation: only the `connection.secure` guard removed | 0 | same |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | the new file is in the gate |
| `npm test -- tests/quality/test_quality_invariants.py` | 1 | ESLint, Prettier and the introduced-vulnerabilities audit (public npm registry) passed; Ruff and ShellCheck errored with `FileNotFoundError`: the fresh worktree has no `.runs/quality-venv` |
| `<reviewed worktree>/.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa .` (in my worktree) | 0 | Ruff clean; the slice changes no Python |
| `<same venv>/shellcheck.exe --norc --shell=bash --extended-analysis=true deploy/loop2-deploy` | 0 | ShellCheck clean; the slice changes no Bash |
| `npm run typecheck` | 0 | the subpath imports of `nodemailer/lib/...` type-check |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| reading Nodemailer 10.2.1 source (see above) | — | deadline, late answers, DNS-phase close, error events, servername |

Not run: the whole gate (`npm test` without a file) — the orchestrator's, per the dispatch.

## Reaches beyond the dispatch

- `node_modules/nodemailer/dist/esm/smtp-connection/index.js` (installed 10.2.1): constructor
  (120-175), `connect` (190-250), `close` (422-475), `login` (492-525), `_onError`/`_formatError`/
  `_onClose` (880-1000), `_upgradeConnection` (1041-1110), `_actionEHLO`/`_actionSTARTTLS`
  (1470-1640) — to verify the deadline, the closing, the error paths and STARTTLS behaviour the
  mailer relies on.
- `.runs/task-cycles/potwierdzenie-adresu/plan.md:20-48` (F-rows) and
  `reports/06-foundation-report.md` (F27, F29, F30, F31 lines) — to check which part-map rows were
  this slice's; `foundations/part_map.md:170` — the Outsider row of *External context*.
- `.the-way/elements/part-map/skill/SKILL.md` steps 2-3 — to grade the executor's concern C1 (M1).
- `tests/quality/test_quality_invariants.py:20-62` — why Ruff and ShellCheck errored in the fresh
  worktree, and their exact commands.
