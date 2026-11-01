# Handoff — review of the fix, whole change, task kopia-bazy

Review the fix once, as `.the-way/task-cycle/review/SKILL.md` and its `fix.md` give. Boundary and answers of step 4 as in your first handoff, `docs/task-cycles/kopia-bazy/reports/whole-review-handoff.md`. Read-only; any mutation in a scratch export; leave no process behind you.

**Range.** Base `d8b14826d0d7aab5c524c9b4d45123990cec2b8d`, head `eb4ece0`. Run `git rev-parse HEAD` in the worktree first.

**Read.**
- The findings: `docs/task-cycles/kopia-bazy/reports/whole-review-findings.md`
- The fix's report: `docs/task-cycles/kopia-bazy/reports/whole-fix-report.md`
- What it was bound to: `docs/task-cycles/kopia-bazy/reports/whole-fix-handoff.md`

**Information.** D-217 gained a clause past the handoff's list, "opens only an existing database file", and two of its binding sentences were merged: judge them against the task's row 2 and spec decision 2.

**Report.** `docs/task-cycles/kopia-bazy/reports/whole-fix-review-report.md`, first line `PASS <sha>` or `FAIL <sha>`.

**Return.** That first line, a one-line check result naming what failed or did not run, and the report's path.
