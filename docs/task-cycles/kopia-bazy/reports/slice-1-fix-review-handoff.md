# Handoff — review of the fix, slice 1, task kopia-bazy

Review the fix once, as `.the-way/task-cycle/review/SKILL.md` and its `fix.md` give. Boundary and answers of step 4 as in your first handoff, `docs/task-cycles/kopia-bazy/reports/slice-1-review-handoff.md`. Read-only.

**Range.** Base `49bfb74e7ea8b81016fe9c58b40801b1d9e1d2f0`, head `4ced3b9`. Run `git rev-parse HEAD` in the worktree first.

**Read.**
- The findings: `docs/task-cycles/kopia-bazy/reports/slice-1-findings.md`
- The fix's report: `docs/task-cycles/kopia-bazy/reports/slice-1-fix-report.md`
- Its handoff, with what it was bound to: `docs/task-cycles/kopia-bazy/reports/slice-1-fix-handoff.md`

**Report.** `docs/task-cycles/kopia-bazy/reports/slice-1-fix-review-report.md`, first line `PASS <sha>` or `FAIL <sha>`.

Make mutations only in a scratch export, never in the worktree, and leave no process running behind you.

**Return.** That first line, a one-line check result naming what failed or did not run, and the report's path.
