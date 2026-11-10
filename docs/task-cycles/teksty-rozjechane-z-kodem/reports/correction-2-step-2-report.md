# Correction 2, step 2 — the startup check for two or more byte-order marks

**Status:** done

## Commit

- `b4c2356` fix: :bug: refuse a mail password file of two or more byte-order marks and nothing else at startup (range base `aee1ecd`; `e175b32` was head before the change)

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/server/configuration.ts` | 9 | 4 |
| `tests/startup.test.mjs` | 12 | 0 |

Change in `readSmtpPassword`: the refusal is now `password.replace(byteOrderMark, "") === ""`, where `byteOrderMark` is the constant `/\uFEFF/gu` declared with the other regular expressions. The control-character refusal, the message and the 1024-byte limit are unchanged. The comment above the function now says "a file of byte-order marks and nothing else, which holds no password, is refused", matching D-111.

Test change in the existing case (name and `// invariant: account-startup-configuration` marker unchanged, no assertion weakened):
- invalid list: `Buffer.from([0xef, 0xbb, 0xbf, 0xef, 0xbb, 0xbf])` (two marks) and three marks, as bytes, placed before the 1025-byte fixture;
- accepted part: a file of two marks and the secret text; the expected password is `\uFEFF${secret}` (the decoder drops only the leading mark).

## Checks

1. Failing run, before the code change, with the new fixtures: `npm test -- tests/startup.test.mjs`, exit 1. 17 pass, 1 fail: the case "the SMTP password file must be a small non-empty UTF-8 regular file …" at `tests/startup.test.mjs:408`, `AssertionError: Missing expected rejection` (the two-mark file was accepted). Log: `a scratch folder outside the repository`.
2. Passing run, after the code change: `npm test -- tests/startup.test.mjs`, exit 0. 18 pass, 0 fail. Log: `…/scratchpad/c2s2-green.log`.
3. `npm run typecheck`, exit 0.
4. `python -B .the-way/elements/common/foundation_check.py`, exit 0 ("0 errors").
5. Extra, not in the handoff: `npx prettier --check src/server/configuration.ts tests/startup.test.mjs`, exit 0; `npx eslint src/server/configuration.ts tests/startup.test.mjs`, exit 0.

Not run: the full `npm test` (the orchestrator runs it).

Guideline row: the trust-boundary row of `src/server/` in `guidelines/testing.md` (line 170) describes this case as the refusal of "plik pusty, plik z samymi znacznikami kolejności bajtów (BOM) i plik ze znakiem sterującym" and quotes the case name, which is unchanged. The plural "znacznikami" already covers two or more marks, so the row still says what the case does; I did not edit it.

## Own-work check

- Requirement (the correction): a password file of two or more byte-order marks and nothing else is refused at startup with the setting's name; a mark followed by text is accepted with the leading mark dropped; the 1024-byte file, ordinary text, control characters, invalid UTF-8 and non-regular files keep their results.
- Check: the two- and three-mark fixtures in the invalid list (`tests/startup.test.mjs:402-403`), run before and after; the two-mark-plus-text acceptance (`tests/startup.test.mjs:440-449`), run after; the earlier mark-plus-text, 1024-byte, zero-byte and 1025-byte fixtures, all in the same run.
- Result: failing run at line 408 (two marks accepted); passing run with all 18 cases.
- Named break caught: changing the refusal back to `password === ""` (the previous step's code) makes the two-mark fixture accepted again, which is the failing run above. The three-mark fixture and the mark-plus-text acceptance guard the other sides of the rule.
- Mutation in head: refusing any file that starts with a mark would fail the two-mark-plus-text acceptance; dropping the global flag from `byteOrderMark` would let `replace` remove only the first mark and fail the three-mark refusal.

## Incident during the edit

- While writing the constant and the test expectation, a raw U+FEFF character was written into the source instead of the escape `\uFEFF`. ESLint (`no-irregular-whitespace`) caught it at `configuration.ts:48` and `startup.test.mjs:449`. I replaced both with the escape and re-ran every check above on the final bytes; the commit holds only escapes (verified: zero raw U+FEFF characters in the two files).

## Unread material

- `.the-way/task-cycle/change/SKILL.md`: not re-read in this step; I relied on my earlier whole read of it in this cycle. The handoff asked for it to be read again.
- `foundations/decisions.md` D-111: read whole in this step (lines 2014-2026).
- `guidelines/testing.md` row at line 170: read the startup part through a text extract (the surrounding row was read whole in step 1, not again here).
- Nothing else named by the handoff was left unread.

## Searches not found or unclear

- none

## Questions and concerns

- None blocking.
- Concern: the foundation-check run reports "0 errors" only; the handoff's check named no particular output, so I took exit 0 as the pass.
