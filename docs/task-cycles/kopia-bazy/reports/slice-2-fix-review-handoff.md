# Handoff — review of the fix, slice 2, task kopia-bazy

Review the fix once, as `.the-way/task-cycle/review/SKILL.md` and its `fix.md` give. Boundary and answers of step 4 as in your first handoff, `docs/task-cycles/kopia-bazy/reports/slice-2-review-handoff.md`. Read-only; any mutation in a scratch export; leave no process behind you.

**Range.** Base `aec92e4c19582b518c6db8c3b477575d82058a56`, head `acb7aee`. Run `git rev-parse HEAD` in the worktree first.

**Read.**
- The finding: `docs/task-cycles/kopia-bazy/reports/slice-2-findings.md`
- The fix's report: `docs/task-cycles/kopia-bazy/reports/slice-2-fix-report.md`
- What it was bound to: `docs/task-cycles/kopia-bazy/reports/slice-2-fix-handoff.md`

**Information.** The fix ran 88 seconds with 10 tool uses, and its report claims mutation runs with exit codes: repeat at least the `expect` mutant yourself. It adds one file the slice's *Change* did not name, `tests/account-database-check-standin.mjs`, claimed in the part map, and rewords one sentence of the invariant test.

**Report.** `docs/task-cycles/kopia-bazy/reports/slice-2-fix-review-report.md`, first line `PASS <sha>` or `FAIL <sha>`.

**Return.** That first line, a one-line check result naming what failed or did not run, and the report's path.
