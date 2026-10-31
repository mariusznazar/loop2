# Handoff — reviewer of slice 2, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. You did not make this change. Your questions go to the orchestrator; never to the human.

**Worktree.** `C:\Storage\repos\loop2-wt\kopia-bazy`, branch `task/kopia-bazy`. Work from its root; the pinned the-way is its `.the-way`. Read-only: no change, no commit, no server. Make any mutation only in a scratch export, and leave no process behind you.

**Method.** Read `.the-way/task-cycle/review/SKILL.md` whole and follow it. Read a file it names when its step comes.

**What is reviewed.** Slice 2. Range: base `4ced3b9`, head `aec92e4`.

**Your selection.** Slice 2's handoff, with its section of the plan, its ranges and passages: `docs/task-cycles/kopia-bazy/reports/slice-2-handoff.md`. Beside it D-222.

**Author's report.** `docs/task-cycles/kopia-bazy/reports/slice-2-report.md`

**Answers of step 4.**
- Trust boundary: yes — `src/server/**`, `deploy/**`, the new keys. Here a new file under `src/server/` that every image build runs, and the `Dockerfile`.
- Irreversible operation: yes in the task, none in this slice; check that it stays so.

**Information from the mechanical check.**
- Clean worktree; one commit; exactly the five files of the slice's *Change*.
- The executor applied the part-map skill's rules itself.
- Spec decision 9 and H5.2 read the release from the build's output. The executor saw it under `--progress=plain` and did not read how `deploy/loop2-deploy` builds. Judge whether the deploy log will hold it.
- No test exercises the check's path for a difference in values read.

**Report.** `docs/task-cycles/kopia-bazy/reports/slice-2-review-report.md`, first line `PASS <sha>` or `FAIL <sha>`, as your method gives.

**Return.** That first line, a one-line check result naming what failed or did not run, and the report's path.
