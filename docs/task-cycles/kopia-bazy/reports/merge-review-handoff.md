# Handoff — reviewer of the reconciliation with main, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. You made none of this. Your questions go to the orchestrator; never to the human.

**Worktree.** `C:\Storage\repos\loop2-wt\kopia-bazy`, branch `task/kopia-bazy`. Work from its root; the pinned the-way is its `.the-way`. Read-only: no change, no commit, no server.

**Method.** Read `.the-way/task-cycle/review/SKILL.md` whole and follow it for the reconciliation with the target branch.

**What is reviewed.** The reconciliation. Commits: `3d30597` (this change's decisions D-214 to D-224 move to D-222 to D-232, as task 14 took D-214 to D-221 on `main`), the merge of `origin/main` `4ed8fcd`, and the commit after it that gives `death-settled-once` its *Violated* line back. Range: base `ca9e7df`, head of the branch. Run `git rev-parse HEAD` in the worktree first.

**Your selection.**
- The orchestrator's own work: it renumbered by a script over every tracked file, resolved the two conflicts, appended entries on both sides, and compared each merged entry with its side: 232 decisions and 108 invariants, each equal to one side. Repeat that comparison your own way.
- Every reference that moved must point at the entry it meant: a code comment, a test, `guidelines/testing.md`, an invariant's *Derives from*, a decision's *Relations*. A reference to D-214 to D-221 in this change's files would now point at task 14's entries.
- Whether what `main` brought meets this change: `src/browser/`, the saved game's version, `guidelines/testing.md`, `foundations/glossary.md` and D-04 against the backup, the restore trial's marker and D-13, D-73, D-112, D-217 as renumbered, D-225.
- `docs/task-cycles/kopia-bazy/reports/gate-final.log`, the gate on this tree.

**Answers of step 4.** Trust boundary and irreversible operations as in `docs/task-cycles/kopia-bazy/reports/whole-review-handoff.md`.

**Report.** `docs/task-cycles/kopia-bazy/reports/merge-review-report.md`, first line `PASS <sha>` or `FAIL <sha>`.

**Return.** That first line, a one-line check result naming what failed or did not run, and the report's path.
