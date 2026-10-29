# Slice 2 fix report — findings of review `11-slice2-review-report.md` (FAIL 7b621ce)

**Status:** `done`

Branch `task/potwierdzenie-adresu`, from head `7b621ce`. Not pushed.

## Commit

| Commit | Message |
|---|---|
| `426081f` | test: :white_check_mark: keep the test certificate's serial a minimal DER integer |

Files: `tests/account-mail.test.mjs` +3 −1. No product code changed.

## I1 — fixed

The test's certificate serial (`tests/account-mail.test.mjs:64-67`) is now
`serial[0] = (serial[0] & 0x7f) | 0x40;`, so its first byte is always `0x40..0x7f`. That makes the
DER INTEGER always positive and minimal, with no leading zero. A comment states the DER rule.
I took the fix the review suggested; the other DER fields of the certificate (lengths, OIDs, times,
signature) have no leading-zero rule that random data can break.

Check that would have caught it: a one-off script (in the session's scratchpad, not committed) that
loads the file's `der`/`oid`/`utcTime`/`certificate` source as it stands (the text from
`function der(` to `function withinLimit(`), makes N certificates and loads each with
`tls.createSecureContext`. It exits 1 when any certificate is refused.

| Run | Command | Exit | Output |
|---|---|---|---|
| unchanged head `7b621ce` | `node serial-check.mjs tests/account-mail.test.mjs 3000` | 1 | `{"n":3000,"failures":7}` |
| after the fix | `node serial-check.mjs tests/account-mail.test.mjs 10000` | 0 | `{"n":10000,"failures":0}` |

7 in 3000 matches the review's rate of about 1 in 256 (expected about 12; 13 in the review's run).

## Checks run after the fix

| Command | Exit | Note |
|---|---|---|
| `npm test -- tests/account-mail.test.mjs` | 0 | 7 tests, 7 pass |
| `node --test tests/account-mail.test.mjs` ×8 in parallel, on the built fix | 0 ×8 | repeated only to check the fix, not to make a run green |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests (ESLint, Ruff, ShellCheck, Prettier, audit) |

Not run: the whole gate and `foundation_check.py`. The fix changes three lines inside an existing
test file and no foundation file or file claim.

## Not fixed (as instructed)

- Review Minor M1 (the `account-server` sentence in the part map): the cycle schedules it.

## Reaches beyond the dispatch

None beyond the findings file, `fix.md` and the test file.
