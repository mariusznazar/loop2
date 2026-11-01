# Handoff — fix of the review of slice 6, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator in your report; never to the human.

**Worktree.** `C:/Storage/repos/loop2-wt/kopia-bazy`, branch `task/kopia-bazy`, head `a11ad0af701d65a2f5f74edf3a6179cfa1ca35eb`. Work from its root; the pinned the-way is its `.the-way`. No other agent writes in it now.

**Method and variant.** Read `.the-way/task-cycle/change/SKILL.md` whole. You make: the fix of a review's findings. Read a file it names when its step comes.

**Findings file.** `docs/task-cycles/kopia-bazy/reports/slice-6-findings.md`. Fix those five, I1 to I5. The review's Minor and declined findings are not yours, unless a bound answer below names one. Answer with evidence a finding you hold wrong.

**Read.**
- Frozen task, whole: `docs/task-cycles/kopia-bazy/task-frozen.md`
- `docs/task-cycles/kopia-bazy/spec.md`: decisions 11, 12, 13
- The whole review: `docs/task-cycles/kopia-bazy/reports/slice-6-review-report.md`
- `docs/task-cycles/kopia-bazy/reports/slice-6-handoff.md`, the facts and rules it binds
- `.claude/skills/loop2-deploy/` whole; `deploy/loop2-backup`; `deploy/loop2-deploy`; `scripts/restore-trial.mjs`; `tests/deploy/test_restore_trial.py`
- Foundation: D-12, D-13, D-15, D-16, D-17, D-214, D-216, D-217, D-218, D-219, D-220
- `guidelines/coding.md`, `guidelines/testing.md`, whole

**Bound answers.**
- I1: the fix the finding gives, a numbered, counted list that names who does each step. Say plainly that this path has never been tried. Where it needs `pusher` or `rsync`, have the human check they exist and that a test message arrives, and give what to do on a host with no `pusher`: the script's notice cannot reach anyone there.
- I2: the fix the finding gives: all three files move together to the private directory of step 1, outside `/srv/loop2`, with the way back. Give that directory a concrete, stated path and say when it is removed, because it holds addresses and password hashes in plain form.
- I3: as the finding gives.
- I4: as the finding gives.
- I5: fix it in the code, as well as in the text: `cleanPassword` in `scripts/restore-trial.mjs` strips one leading U+FEFF, with a test in `tests/deploy/test_restore_trial.py` seen failing first by command and exit code. Keep the reference's form of the password and say it needs no special console. A false verdict on a sound backup is what the fix removes.
- Both skill copies stay byte-identical at each commit; the skill names no Mikrus host or address; no instruction has an agent perform a server change.

**Boundary.** Do not touch the server. Do not push. Run `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`, `npm test -- tests/deploy/test_restore_trial.py`, `npm test -- tests/quality/test_quality_invariants.py`, each with its command and exit code; the full `npm test` is the orchestrator's. Commit messages in English in the repository's form; `git add` by path.

**Report.** `docs/task-cycles/kopia-bazy/reports/slice-6-fix-report.md`, each blocking finding as fixed with the check that shows it, or contested with the evidence, and **Searches not found or unclear**.

**Return.** Your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
