# Handoff — correction for the human's decision, task kopia-bazy

You make: a correction for the human's remarks. Read `.the-way/task-cycle/change/SKILL.md` again for that variant.

**The human's decision, 2026-10-31, word for word:** „oba tak jak rekomendujesz”. It answers the two questions of request 46, `https://github.com/mariusznazar/loop2/pull/46`. Each binds:

1. **I2.** "Recommendation: make `previous` at step 1: `mkdir -m 0700 /root/loop2-restore /root/loop2-restore/previous`."
2. **I5.** Way (a): "strip every leading mark, `/^\u{feff}+/u`, with the test's second case changed, one character, and the sentence stands."

**The findings as they stand:** `docs/task-cycles/kopia-bazy/reports/slice-6-fix-review-report.md`, I2 and I5.

**Change.** `.claude/skills/loop2-deploy/references/backup_and_restore.md` and its byte-identical copy in `.agents/skills/loop2-deploy/references/`, `scripts/restore-trial.mjs`, `tests/deploy/test_restore_trial.py`. Nothing else; the review's N1 to N4 and M1 to M7 are not part of this.

**Checks.** Show the changed test failing first, then passing, by command and exit code. Run `npm test -- tests/deploy/test_restore_trial.py`, `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`, `npm test -- tests/quality/test_quality_invariants.py`, and `diff -r` of the two skill copies. Walk steps 1 and 4 of the restore once more with `mkdir` and `mv` on scratch files, one file at a time, and say what stands in `previous`. Under console 65001 with `$OutputEncoding = [Text.Encoding]::UTF8`, show the launcher's reading gives the password back. The full `npm test` is the orchestrator's.

**Boundary.** Do not touch the server. Do not push. Commit messages in English in the repository's form; `git add` by path.

**Report.** `docs/task-cycles/kopia-bazy/reports/correction-1-report.md`: each remark as made, and how, with its checks, and **Searches not found or unclear**.

**Return.** Your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
