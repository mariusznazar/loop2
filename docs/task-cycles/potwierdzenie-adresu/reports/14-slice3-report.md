# Slice 3 report — coding guidelines of the kind mail-sending

**Status:** done

## Files and commits
- `guidelines/coding-mail-sending.md` (new, 130 lines)
- `guidelines/coding.md` (+3 / -1): row `mail-sending` in *Kinds of code*; the deferred-kinds line no longer defers the mail pattern.
- Commit: see `git log` on branch `task/potwierdzenie-adresu` (message `docs: :memo: add coding guidelines of the kind mail-sending`).

## Checks
- `python -B .the-way/elements/common/foundation_check.py` : exit 0, "0 errors".
- `python -B .the-way/instruction-files/check_instructions.py .` : exit 0, no warning on the new file (32 warnings, all on files not touched by this slice or old lines of coding.md).
- Not run: the whole gate (not mine); no code changed, no test written (prose).

## Own-work check
Requirement most likely unmet: every binding rule is carried by a decision (WAY-172), no rule smuggles a meaning from the spec alone. Check: each rule's *Decision* read against its text. Result: spec-only details (recipient character list, per-phase timeouts, one connection per message, library logger/file-access off, log line format, test certificate seam) are placed in *Examples* without a decision field. Two rule bodies carry small spec-derived how-to (certificate checked against host name and never disabled; password sent only after TLS) under D-142; the invariant `account-email-nodemailer-starttls` tests the untrusted-certificate and no-STARTTLS cases.

## Choices
- Four rules besides TLS, three with *Invariant* `none` (D-146, D-150 verification is by agent comparison; no cheap test of the file's convention exists). Rejected: naming `account-email-nodemailer-starttls` on the others — it checks TLS only.
- Recipient refusal (character list) kept as an example, not a rule: D-146/D-150 carry only "address in no other header"; the refusal itself is spec Decision 6. If the human wants it binding, it needs a decision (question below, low priority).
- Testing paragraph cites D-151 in *Examples* and points to `guidelines/testing.md`; the testing guidelines for SMTP are a later slice.
- Order: new row appended at the end of the kinds table.

## Reaches beyond dispatch
None beyond reading `tests/account-mail.test.mjs` markers (grep) and the foundation report's entry table.

## Questions (non-blocking)
- Should refusing a non-plain recipient before connecting become a binding rule? Recommend no: D-146's violates clause already covers header safety; adding a decision for one list of characters costs more than it protects.

## Problems
None observed. `tests/invariants/test_loop2_one_serving_process.py` fails on the base (known), not run.
