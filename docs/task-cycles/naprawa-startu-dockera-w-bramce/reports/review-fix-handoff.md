# Handoff to the reviewer — the review of the fix

Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), the fix of earlier findings. You
are the reviewer of the whole change, resumed. Worktree (read only):
`the task's worktree`. Range of the fix: from the
head you reviewed, `826b2a63`, to `c1735524` (four commits: `41015a29` B1, `d1acd7a8` M3,
`ee6ba709` M4, `c1735524` M2). Findings file the fix was given: `reports/fix-findings.md`
(under `.runs/task-cycles/naprawa-startu-dockera-w-bramce/`); the fix report:
`reports/author-fix-report.md` in the same directory. Your directory for working copies:
`.runs/review-fix/` of the worktree; the working-copies rule of your first handoff holds.

Judge: whether B1 is fixed (the daemon asked again after the lock whatever `waited` says; does the
new test fail for the late-lock case and only then?), whether M2, M3 and M4 are fixed and the fixes
bring no new Critical or Important finding (in particular: the cap of the wait at the waiter's own
deadline, `StartWaitExpired`, `unfinished_gap`, and what `daemon_gap` now returns and records for a
waiter whose wait expired, against D-390's new paragraph and the invariant
`gate-docker-start-waits-once`). M1 was left unchanged on purpose (the cycle shows the clause to the
human in the request); M5 is contingent on a revert of `826b2a63` and not part of this fix. A Minor
finding that remains or is new does not block; only a new Critical or Important finding fails this
review.

Report: `reports/review-fix-report.md` (same directory), first line `PASS <sha>` or
`FAIL <sha>` with the sha of `c1735524`, as `review-change` gives it; checks with command and exit
code, **Unread material**, **Searches not found or unclear**, working copies. No full gate.
