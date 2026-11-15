# Handoff — review of the fix of slice 3 ("panel właściciela")

You are the reviewer of slice 3, resumed, for the review of the fix: the variant of `review-change` that `.the-way/task-cycle/review/fix.md` gives; read it now and follow it.

- Worktree (read-only): `the task's worktree`. **Range to review: `85966562aadfa413888dab094544f707710bf942..276b4289`** — compute the diff yourself (`git diff 85966562..276b4289`, `git log 85966562..276b4289`), and confirm the head.
- The findings that the fix was given: `.runs/task-cycles/panel-wlasciciela/reports/fix-3-findings.md` (your blocking finding I-1; your Minor findings M-1 and M-2 are not part of this fix and stay for the review of the whole change). The fix's report (claims to verify): `.runs/task-cycles/panel-wlasciciela/reports/fix-3-report.md`.
- Trust boundary: yes for the change as a whole. The fix adds assertions to `tests/account-owner.test.mjs` and changes nothing in `src/server/**`. Judge it against I-1: run your mutation M8 (`made-owner` also blocks the account) and the `already-owner` one yourself and give the exit codes; check the fixture holds a live session and an unspent link and that every outcome asserts them, and that no existing assertion was weakened.
- Your report: `.runs/task-cycles/panel-wlasciciela/reports/review-fix-3-report.md`; first line `PASS <sha>` or `FAIL <sha>`. A new Critical or Important finding in the fix counts as one that remains; a Minor finding does not block. Your directory for working copies: `.runs/review-3/` (remove it, your script `mutate.py` included, before you return).
- Report as before: checks with command and exit code, reach beyond the handoff, working copies, **Unread material**, **Searches not found or unclear**.
