# Handoff — review of correction 1, task kopia-bazy

Review the correction once, as `.the-way/task-cycle/review/SKILL.md` gives: the human's remarks stand in place of a findings file. Boundary and answers of step 4 as in `docs/task-cycles/kopia-bazy/reports/slice-6-review-handoff.md`. Read-only; any scratch work outside the worktree; leave no process behind you.

**Range.** Base `fa7eedb`, head `db73929`. Run `git rev-parse HEAD` in the worktree first.

**The human's remarks.** In `docs/task-cycles/kopia-bazy/reports/correction-1-handoff.md`, word for word: I2 and I5 decided by the recommendations of request 46.

**Read.**
- The correction's report: `docs/task-cycles/kopia-bazy/reports/correction-1-report.md`
- The findings it answers: `docs/task-cycles/kopia-bazy/reports/slice-6-fix-review-report.md`, I2 and I5

**Information.** The `mv` walk ran under Git Bash on Windows, where the mode `0700` does not apply; repeat steps 1 and 4 in a throwaway Linux container if that bears on your judgment, with no image pulled beyond what stands on this computer. The test was renamed and a code comment reworded, beyond the handoff.

**Report.** `docs/task-cycles/kopia-bazy/reports/correction-1-review-report.md`, first line `PASS <sha>` or `FAIL <sha>`.

**Return.** That first line, a one-line check result naming what failed or did not run, and the report's path.
