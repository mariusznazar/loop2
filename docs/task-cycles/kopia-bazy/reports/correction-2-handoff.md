# Handoff — correction after the human's actions, task kopia-bazy

You make: a correction for the human's remarks. Read `.the-way/task-cycle/change/SKILL.md` again for that variant.

**Worktree.** `C:\Storage\repos\loop2-wt\kopia-bazy`, branch `task/kopia-bazy`, head `e69034c`. This head runs on the server. Change no code, no test, no script: only what follows.

**What the human's actions showed, 2026-10-31 and 2026-11-01.**
- H5: `e69034c` deployed, healthy.
- H2: two hand runs with the same weekday file, so Strych accepts a file over an older one; the deliberate failure, exit 3, its notice arrived with `ł` and `ę` whole; the schedule ran by itself at 03:17 server time: `made: loop2-accounts-7.sqlite.age, 90328 bytes`, `end: sent`.
- H3: PASS, exit 0: image revision e69034ce9b6ecad1d3854eff5b8db1f39e163895, login status 200, save revision 141, marker yes. 7 x 82136 = 574952 bytes, within 200000000.

**Remark 1. Clear the mark.** `account-save-backup`: *Violated* goes from `yes` to `no`, that one field, through `the-way-record-invariant`, read from `.the-way/elements/`, as commit e95a8b1 did in the previous cycle. Its own commit.

**Remark 2. The trial's procedure, what H3 proved in the owner's hands.** In `references/backup_and_restore.md`, section "Trying a backup on the owner's computer", both skill copies, byte-identical, in the skill's English, with no Mikrus host: `<host from the constants block>`.
- `age`: `winget` hung on the owner's computer; say that the Windows zip of age's releases page serves too. A newer `age` than the server's opened the file.
- Step 1 gives the commands that worked: a private folder, the key pasted into a file with a final line break and no `.txt`, `icacls <file> /inheritance:r /grant:r "${env:USERNAME}:R"`, and `scp -p -i .\strych-key <login>@<host>:loop2-accounts-<day>.sqlite.age .`. On a first connection, compare the ED25519 fingerprint with the one of step 6 of "Installing and reinstalling" before answering yes; a prompt for another type is no match to accept.
- Step 3 gives the same `icacls` for the key file, and a check of the first 15 bytes in PowerShell: `$b = [IO.File]::ReadAllBytes("$PWD\accounts.sqlite")`, then `[Text.Encoding]::ASCII.GetString($b[0..14])`, which shows `SQLite format 3`.
- Step 5: `Read-Host` stands in a block of its own, entered alone: a pasted block's next line would be read as the password. Say why in one sentence. The launcher's path may be given whole.
- Step 8: the removal, in order: give the rights back with `icacls <file> /grant:r "${env:USERNAME}:F"` for both key files, because read-only keys stopped `Remove-Item`; then `Remove-Item -Recurse -Force` of the folder; then `Test-Path` shows `False`. `Remove-Variable` of the password's variables and closing the window.
- Nothing else in the file; the Minor findings of the reviews stay out.

**Checks.** `python -B .the-way/elements/common/foundation_check.py`; `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`; `diff -r` of the two skill copies, each with its command and exit code. The full `npm test` is the orchestrator's. Do not touch the server. Do not push. Commit messages in English in the repository's form; `git add` by path.

**Report.** `docs/task-cycles/kopia-bazy/reports/correction-2-report.md`: each remark as made, and how, with its checks, and **Searches not found or unclear**.

**Return.** Your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
