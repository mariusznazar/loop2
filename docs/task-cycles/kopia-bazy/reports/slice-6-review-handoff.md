# Handoff — reviewer of slice 6, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. You did not make this change. Your questions go to the orchestrator; never to the human.

**Worktree.** `C:\Storage\repos\loop2-wt\kopia-bazy`, branch `task/kopia-bazy`. Work from its root; the pinned the-way is its `.the-way`. Read-only: no change, no commit, no server.

**Method.** Read `.the-way/task-cycle/review/SKILL.md` whole and follow it. Read a file it names when its step comes.

**What is reviewed.** Slice 6. Range: base `46614c6`, head `a11ad0a`.

**Your selection.** Slice 6's handoff, with its section of the plan, its ranges and passages: `docs/task-cycles/kopia-bazy/reports/slice-6-handoff.md`. Check every claim of the skill against the code it describes: `deploy/loop2-backup`, `deploy/loop2-backup.cron`, `deploy/loop2-deploy`, `src/server/account-backup.ts`, `scripts/restore-trial.mjs`, `Dockerfile`, `compose.yaml`.

**Author's report.** `docs/task-cycles/kopia-bazy/reports/slice-6-report.md`, *After the answer* included.

**Answers of step 4.**
- Trust boundary: yes in the task. The skill is read by agents with a tool that can run any command on the server: judge it as instructions an agent will follow.
- Irreversible operation: yes — this slice writes the human's procedures for restoring over the server's database and for changing the encryption key. Check that the change only prepares them: no instruction has an agent install, run the backup, restore, change a key, make the hand run of the send, fetch a backup or list Strych. Follow each procedure step by step as the human who has only this text, also on the day the server is gone: a missing or wrong step here costs the data.

**Information.**
- Clean worktree; two commits. The second adds the fingerprint of Strych's host key after the orchestrator's answer: no secret, and needed to compare the key.
- The sentences the task names at `references/setup_and_secrets.md:299`–`300` and `references/troubleshooting.md:101`–`102` and `:128`–`129` had to change.
- The executor's open searches, in its report: judge the mode of the restored file, and the fetch with a temporary key.

**Report.** `docs/task-cycles/kopia-bazy/reports/slice-6-review-report.md`, first line `PASS <sha>` or `FAIL <sha>`, as your method gives.

**Return.** That first line, a one-line check result naming what failed or did not run, and the report's path.
