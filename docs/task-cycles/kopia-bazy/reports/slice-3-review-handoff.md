# Handoff — reviewer of slice 3, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. You did not make this change. Your questions go to the orchestrator; never to the human.

**Worktree.** `C:\Storage\repos\loop2-wt\kopia-bazy`, branch `task/kopia-bazy`. Work from its root; the pinned the-way is its `.the-way`. Read-only: no change, no commit, no server, nothing against Strych or `pusher`. Make any mutation in a scratch export, and leave no process behind you.

**Method.** Read `.the-way/task-cycle/review/SKILL.md` whole and follow it. Read a file it names when its step comes.

**What is reviewed.** Slice 3. Range: base `acb7aee`, head `45eaf4b`.

**Your selection.** Slice 3's handoff, with its section of the plan, its ranges and passages: `docs/task-cycles/kopia-bazy/reports/slice-3-handoff.md`. Beside it D-222 and `docs/task-cycles/kopia-bazy/spec.md` decision 16.

**Author's report.** `docs/task-cycles/kopia-bazy/reports/slice-3-report.md`, its section *After the answer* included.

**Answers of step 4.**
- Trust boundary: yes — `deploy/**` and the new keys. Check crafted input at that boundary: the script takes no argument; what comes back from Strych, `rsync`, `ssh`, `docker`, `age` and the environment must drive no decision but an exit code, and the listing is never read.
- Irreversible operation: yes — replacing the seven-day-old backup on Strych, which only the schedule a human installs does. Check that the change only prepares it: no test and no agent reaches Strych or runs the script on the server.

**Information from the mechanical check.**
- Clean worktree; 354ae7c holds exactly the nine files of the slice's *Change*; 45eaf4b changes the notice's words after the orchestrator's answer (Polish, the owner's rule for text put before its reader).
- Two invariant tests are altered: `test_no_other_deployment_route` and `BASH_SCRIPTS`. A new test, `test_backup_script_starts_no_image`, holds what the first change gives up. Judge the change under *Changing an existing test*.
- The executor's concerns 1 to 5 in its report, the empty stream that exits 0 first among them. Judge them.
- The script writes the log with `log` printing to standard output too; cron's mail is off.

**Report.** `docs/task-cycles/kopia-bazy/reports/slice-3-review-report.md`, first line `PASS <sha>` or `FAIL <sha>`, as your method gives.

**Return.** That first line, a one-line check result naming what failed or did not run, and the report's path.
