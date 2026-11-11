# Handoff — the second correction for the human's remarks (make-change, "a correction for the human's remarks")

Same delegation, worktree, branch (head `84db15e`; the tree equals `1c9ca88`), commit rules and `scripts.md` rule as before. Method: `the-way-make-change`, variant **"a correction for the human's remarks"**. The remarks bind.

## The human's remarks

The owner read the request's list of unfixed findings and answered: "robimy poprawki teraz" for these four groups (the orchestrator's words in the question, which the owner accepted):

1. The notice subject. The skill (`backup_and_restore.md`, around the table row on the notice; `SKILL.md` around the line on the notice) gives the subject of the failure notice as `kopia bazy loop2 nieudana`; `deploy/loop2-backup:56` sends `kopia_bazy_loop2_nieudana`. Correct the skill's text (not the script) in every place it quotes the subject, after reading the script line and what `tests/invariants/test_account_save_backup_failure_notice.py` expects; a person searching the inbox must find the notice by the words the instruction gives.
2. Finding C2 of the review of the correction (`reports/review-correction-report.md`): the old-key path of step 2 says only "decrypt with `-i /root/loop2-restore/old-key`". Say that it is the same command as the one above with `-i /root/loop2-restore/old-key` instead of `-i /etc/loop2/backup-encryption-key`, so the `umask 077` and the output file stay.
3. Finding C1 of the same review: the result paragraph of "Restoring over the server's database" says each step worked as written. Two branches the trial never reached must be named in the not-tried list and the "as written" claim narrowed accordingly: moving `-wal` and `-shm` in step 4 (none existed after the clean stop of `app`) and redoing a password reset or a block in step 8 (the owner had done none since the backup, so none was due).
4. Findings N1 and N2 of the review of the fix (`reports/review-fix-report.md`): N1 — the sentence in `SKILL.md` (around the list of allowed version reads) says each is "run alone with no pipe or other option", while the reading the environment fact quotes ran `bash --version | head -1` and `grep --version | head -1` in one call with the counting command; let the sentence allow the first line of a version read through `head -1` and such reads in the same call as the count, and keep the fact as it is (do not edit foundations). N2 — rewrap the two prose lines that lost their wrap (search by content; the line numbers moved: one in `SKILL.md` near the allowed version reads, one in `backup_and_restore.md` in the paragraph "A second attempt after a failed one").

Both copies of the skill (`.claude/` and `.agents/`) stay byte for byte equal. Change nothing outside these four groups.

## Report and checks

Report: `reports\correction2-report.md` in the record directory (the same one as your earlier reports): what each group got, the commit, the checks with command and exit code (`python -B tests/agent_workflow/test_loop2_deploy_skill.py`, `bash -n` of the changed shell blocks, `python -B .the-way/elements/common/foundation_check.py` only if you touch foundations, and the test file named in group 1 if the skill's text is covered by it), **Unread material**, **Searches not found or unclear**, the own-work check. Commit by explicit paths with an English message. Return status, commits, one-line check result, report path, questions.
