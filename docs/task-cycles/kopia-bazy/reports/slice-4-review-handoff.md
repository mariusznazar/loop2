# Handoff — reviewer of slice 4, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. You did not make this change. Your questions go to the orchestrator; never to the human.

**Worktree.** `C:\Storage\repos\loop2-wt\kopia-bazy`, branch `task/kopia-bazy`. Work from its root; the pinned the-way is its `.the-way`. Read-only: no change, no commit, no server. Make any mutation in a scratch export, and leave no process behind you.

**Method.** Read `.the-way/task-cycle/review/SKILL.md` whole and follow it. Read a file it names when its step comes.

**What is reviewed.** Slice 4. Range: base `0d18e4d`, head `f451316`.

**Your selection.** Slice 4's handoff, with its section of the plan, its ranges and passages: `docs/task-cycles/kopia-bazy/reports/slice-4-handoff.md`.

**Author's report.** `docs/task-cycles/kopia-bazy/reports/slice-4-report.md`

**Answers of step 4.**
- Trust boundary: yes — `deploy/**`. `deploy/loop2-deploy` is the script the automation's key runs: check that the commit name's refusals, the stages, the exit codes and the order are as they were, and that the new paths take nothing from the commit's content but a comparison.
- Irreversible operation: yes in the task, none in this slice; check that it stays so: the deployment installs neither copy.

**Information from the mechanical check.** Clean worktree; one commit. An existing test's expectation changes, `test_commit_without_the_script_warns_then_fails_the_build_with_7`: judge it under *Changing an existing test*.

**Report.** `docs/task-cycles/kopia-bazy/reports/slice-4-review-report.md`, first line `PASS <sha>` or `FAIL <sha>`, as your method gives.

**Return.** That first line, a one-line check result naming what failed or did not run, and the report's path.
