# Findings to fix — Slice 2, review `reports/11-slice2-review-report.md` (FAIL 7b621ce)

The blocking finding, copied word for word from the review report (lines 14-51):

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

