# Handoff — fix of the review of the whole change, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator in your report; never to the human.

**Worktree.** `C:/Storage/repos/loop2-wt/kopia-bazy`, branch `task/kopia-bazy`, head `d8b14826d0d7aab5c524c9b4d45123990cec2b8d`. Work from its root; the pinned the-way is its `.the-way`. No other agent writes in it now.

**Method and variant.** Read `.the-way/task-cycle/change/SKILL.md` whole. You make: the fix of a review's findings. Read a file it names when its step comes.

**Findings file.** `docs/task-cycles/kopia-bazy/reports/whole-review-findings.md`. Fix those four, I1 to I4. The review's Minor and out-of-scope findings are not yours. Answer with evidence a finding you hold wrong.

**Read.**
- Frozen task, whole: `docs/task-cycles/kopia-bazy/task-frozen.md`
- `docs/task-cycles/kopia-bazy/spec.md`: decisions 2, 11, 12, 13, and *Foundation entries*
- The whole review: `docs/task-cycles/kopia-bazy/reports/whole-review-report.md`
- `scripts/restore-trial.mjs`, `tests/deploy/test_restore_trial.py`, `src/server/account-backup.ts`, `.claude/skills/loop2-deploy/references/backup_and_restore.md`, `guidelines/testing.md`
- Foundation: D-12, D-13, D-137, D-214, D-215, D-216, D-217, D-218, D-219, D-220, D-221, D-222
- `guidelines/coding.md`, `guidelines/testing.md`, whole

**Bound answers.**
- I1: as the finding gives: a listing or removal that did not exit 0 means unknown, never empty, so exit 4, naming what was made, and no verdict of PASS stands above it. Test with a stand-in `docker`, seen failing first by command and exit code.
- I2: as the finding gives: the commit is the head H5 deployed, in both skill copies. A sentence says the report's revision must read that sha.
- I3: as the finding gives, in both skill copies.
- I4: extend D-217 through the project skill `the-way-record-decision`, read from `.the-way/elements/`: the command needs its one fixed word and without it refuses before it opens the database, and only a human or the installed backup script runs it; add a *violates* line for an agent running it through the `mikrus` server, as D-137 has. It is the smallest reading: D-217 already owns the command, and it is this change's own entry. Then make the guideline's row at `guidelines/testing.md:168` cite what holds it, and correct the comment at `src/server/account-backup.ts:16-18` to say what the code does: a failure and a reader that goes away, not "every end". No new invariant. Give the changed D-217 in one Polish sentence for the request.
- The word in entries is "backup". Both skill copies stay byte-identical; the skill names no Mikrus host or address; no instruction has an agent perform a server change.

**Boundary.** Do not touch the server. Do not push. Run the affected focused files by `npm test -- <file>`, the gate's own Ruff, ESLint and Prettier commands on what you change, and `python -B .the-way/elements/common/foundation_check.py`; the full `npm test` is the orchestrator's. Commit messages in English in the repository's form; `git add` by path.

**Report.** `docs/task-cycles/kopia-bazy/reports/whole-fix-report.md`, each blocking finding as fixed with the check that shows it, or contested with the evidence, and **Searches not found or unclear**.

**Return.** Your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
