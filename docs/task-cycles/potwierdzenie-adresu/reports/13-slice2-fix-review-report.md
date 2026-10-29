PASS 426081f

# Review of a fix — Slice 2 of `potwierdzenie-adresu`, range `7b621ce..426081f`

Reviewer: the agent that wrote `reports/11-slice2-review-report.md`; did not make the fix. Method:
`.the-way/task-cycle/review/SKILL.md` with `fix.md` (pinned the-way `3aee7d9`). `git rev-parse HEAD`
in the reviewed worktree is `426081f`, the head given; the range is one commit, `426081f`, changing
only `tests/account-mail.test.mjs` (+3 −1). Checks ran in a separate detached worktree of `426081f`
(`C:\Storage\repos\loop2-wt\rv-s2fix-426081f`, `npm ci` exit 0), removed at the end.

Counts: blocking 0 · Minor 0 · out of scope 0.

## Findings of `reports/12-slice2-fix-findings.md`

### I1 — the test's self-made certificate was invalid about once in 230 certificates — **fixed**

`tests/account-mail.test.mjs:64-67` now sets `serial[0] = (serial[0] & 0x7f) | 0x40;`, so the
serial's first byte is always `0x40..0x7f`: the DER INTEGER is positive and has no leading zero, the
shape OpenSSL refused. The length of the serial (16 bytes) is unchanged, so no other DER field
moves. Evidence:

- A scratch copy of the file's certificate code as it stands at `426081f` (the text from
  `function der(` up to `function withinLimit(`, with a hook recording the serial), 10 000
  certificates alternating the two SAN kinds the test uses, each loaded with
  `tls.createSecureContext`: exit 0, `{"n":10000,"failures":0,"firstByteOutOfRange":0}`. The same
  method on the old code refused 13 of 3000 (review 11), so the check detects the defect.
- `node --test tests/account-mail.test.mjs` on the built fix, 3 rounds × 8 in parallel: 0 of 24
  runs failed (the old head failed 1 of 24 in the same setup).

## What the fix diff itself could break

Nothing found. The change touches only the serial of the test certificate; no assertion, case or
product file changes. The new comment (lines 64-65) states the rule slightly more narrowly than DER
does (a leading `0x00` followed by a byte `≥ 0x80` is also a minimal positive INTEGER), but what it
says holds for the code it describes; no finding.

## Declined to judge

- The review's Minor M1 (the `account-server` sentence of the part map) — not in the findings file;
  the cycle schedules it.

## Checks run

| Command / method | Exit | What it showed |
|---|---|---|
| `npm test -- tests/account-mail.test.mjs` | 0 | 7 of 7 pass |
| scratch certificate check, 10 000 certificates (above) | 0 | no certificate refused; first byte always in range |
| `node --test tests/account-mail.test.mjs`, 3 rounds × 8 parallel | 0 failing runs of 24 | no random failure |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig tests/account-mail.test.mjs` | 0 | formatted |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 tests/account-mail.test.mjs` | 0 | clean |

Not run: the whole gate (the orchestrator's); `foundation_check.py` and the audit — the fix changes
no foundation file, file claim or lockfile.

## Reaches beyond the dispatch

None beyond `fix.md`, the findings file, the fix report and the fix diff.
