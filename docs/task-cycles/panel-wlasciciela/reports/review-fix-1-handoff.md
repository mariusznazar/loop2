# Handoff — review of the fix of slice 1 ("panel właściciela")

You are the reviewer of slice 1, resumed, for the review of the fix: the variant of `review-change` that `.the-way/task-cycle/review/fix.md` gives; read it now and follow it.

- Worktree (read-only): `the task's worktree`. **Range to review: `55e3b8e83a5875cbf3de161411f2ae2b71e2f1f4..6e1eeef7`** — compute the diff yourself (`git diff 55e3b8e8..6e1eeef7`, `git log 55e3b8e8..6e1eeef7`), and confirm the head.
- The findings that the fix was given: `.runs/task-cycles/panel-wlasciciela/reports/fix-1-findings.md` (your blocking finding I1; your Minor findings M1–M3 and O1 are not part of this fix and stay for the review of the whole change). The fix's report (claims to verify): `.runs/task-cycles/panel-wlasciciela/reports/fix-1-report.md`.
- Trust boundary: yes for the change as a whole (as before); the fix touches only the layout of a test file, but check that it changed nothing else (no assertion, no title, no value) and no line outside the lines slice 1 added.
- Your report: `.runs/task-cycles/panel-wlasciciela/reports/review-fix-1-report.md`; first line `PASS <sha>` or `FAIL <sha>`. A new Critical or Important finding in the fix counts as one that remains; a Minor finding does not block. Your directory for working copies: `.runs/review-1/` (removed again before you return).
- Report as before: checks with command and exit code, reach beyond the handoff, working copies, **Unread material**, **Searches not found or unclear**.
