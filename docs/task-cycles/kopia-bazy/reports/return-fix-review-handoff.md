# Handoff — review of the fix, return step, task kopia-bazy

Review the fix once, as `.the-way/task-cycle/review/SKILL.md` and its `fix.md` give. Boundary as in your first handoff, `docs/task-cycles/kopia-bazy/reports/return-review-handoff.md`. Read-only; leave no process behind you.

**Range.** Base `687495a9735ef1138ad99941daf140be51cb6ca3`, head `ca9e7df`. Run `git rev-parse HEAD` in the worktree first.

**Read.**
- The findings: `docs/task-cycles/kopia-bazy/reports/return-findings.md`
- The fix's report: `docs/task-cycles/kopia-bazy/reports/return-fix-report.md`
- What it was bound to, with the orchestrator's reading of the server: `docs/task-cycles/kopia-bazy/reports/return-fix-handoff.md`

**Information.** The fix adds a fact the handoff did not name, `openssh-extra-host-key-sources`, because D-224's new binding sentence rests on it. It also changes a comment in `deploy/loop2-backup`, which the handoff asks for: check that no behaviour moved.

**Report.** `docs/task-cycles/kopia-bazy/reports/return-fix-review-report.md`, first line `PASS <sha>` or `FAIL <sha>`.

**Return.** That first line, a one-line check result naming what failed or did not run, and the report's path.
