# Correction 2 report — the four small groups (make-change, "a correction for the human's remarks")

**Status:** `done`.

**Commit:** one commit on `task/odtwarzanie-bazy-z-kopii` on top of `84db15e` (see `git log --oneline -1`; message "docs: quote the subject of the backup failure notice as the script sends it, name the unreached branches of the trial, keep umask in the old-key decrypt and let a version read pass through head -1"). Files: `SKILL.md` and `references/backup_and_restore.md` in `.claude/skills/loop2-deploy/` and `.agents/skills/loop2-deploy/` (copies equal). Foundations untouched.

## Each group

1. **Notice subject, done.** Read before editing: `deploy/loop2-backup:56` `readonly NOTICE_SUBJECT=kopia_bazy_loop2_nieudana`, passed as `pusher "$NOTICE_SUBJECT"`; `tests/deploy/test_loop2_backup.py:117` asserts the `pusher` argument is `kopia_bazy_loop2_nieudana` ("the subject goes into a URL path, so it is ASCII"); `tests/invariants/test_account_save_backup_failure_notice.py` states only that subject and text hold no tool output or step name (it quotes no subject). The foundation fact `mikrus-pusher-mail` quotes Mikrus: "podkreślenia będą traktowane jak spacje" (underscores are treated as spaces). The skill quoted the subject with spaces in two places: `backup_and_restore.md` ("What the script does") now says `` `kopia_bazy_loop2_nieudana` (`pusher` takes underscores as spaces, so the mail's subject reads "kopia bazy loop2 nieudana") ``; `SKILL.md` ("Database backups") now says the subject `kopia_bazy_loop2_nieudana`, "which `pusher` turns into spaces in the mail's subject". Both the argument and the words of the inbox are given, so a search by either finds it. Search for the old spelling in `.claude`, `.agents`, `foundations`: only the quoted inbox form inside the new parenthesis remains. The script and the test file were not changed. The watcher's subjects in the `SKILL.md` table already use underscores and were left.
2. **Review finding C2, done.** Step 2's old-key path now says: decrypt "with the same command as above, giving `-i /root/loop2-restore/old-key` in place of `-i /etc/loop2/backup-encryption-key` (the `umask 077` and `-o accounts.sqlite` stay); step 7 removes the key with the directory".
3. **Review finding C1, done.** The result paragraph now says "Each step that was run worked as written except three places", names the two branches never reached (step 4: no `-wal` and no `-shm` stood in the volume after the clean stop of `app`; step 8: the owner had reset no password and blocked no account since the backup, so nothing was redone) and adds both to the not-tried list ("the move of `-wal` and `-shm` in step 4, a password reset or a block redone in step 8").
4. **N1, done.** `SKILL.md` allowed version reads: "each run alone, or piped through `head -1` to keep its first line, and each also allowed in the same call as the counting command of `references/backup_and_restore.md`; no other pipe or option". The fact and the counting block are unchanged (script check: the fact's command equals the block, `True`). **N2, done in `SKILL.md`**: that sentence is rewrapped with the rewrite above (the over-long line is gone). **N2 in `backup_and_restore.md`:** the line the reviewer meant (in the paragraph "A second attempt after a failed one") was already rewrapped in the correction `1c9ca88`; I scanned the changed region for prose lines over 100 characters and found none (the only two long lines after line 370 are code lines: the `rsync` option line and the `install` command, which cannot be wrapped), so nothing more to change there.

## Checks (command, exit code)

- `python -B tests/agent_workflow/test_loop2_deploy_skill.py` — exit 0.
- `python -B tests/invariants/test_account_save_backup_failure_notice.py` — exit 0 (it does not cover the skill's text; run because group 1 concerns the notice).
- `bash -n` on the eight `sh` blocks extracted from the changed file — exit 0 each (no shell block was changed this time).
- Script check that the counting block still equals the command in the fact `loop2-host-ssh-host-key-options` — `True`.
- Not run: the foundation check (no foundation file touched); the whole gate.

## Own-work check

- Requirement most likely not met: "change nothing outside these four groups; both copies equal". Check: `git diff --stat` before the commit showed exactly the four files, 38 insertions and 22 deletions, and the twin test (byte equality) passes; I read the diff hunks of both skill files and they hold only the four groups.
- Weak point: the claim that `pusher` turns underscores into spaces rests on the foundation fact's quote of Mikrus's page, not on a run of `pusher` (D-12: I run nothing on the server).

## Unread material

- `review-correction-report.md` and `review-fix-report.md` were not opened; I worked from the handoff's description of C1, C2, N1 and N2. If the reviewer's exact wording of N2 differs from my reading (which prose lines he meant), the `backup_and_restore.md` half may be unchanged by design, as stated above.
- `tests/deploy/test_loop2_backup.py` was read only around line 117 (grep hits), and `test_account_save_backup_failure_notice.py` by grep for subject words, not whole.
- Everything unread in the earlier reports stands.

## Searches not found or unclear

- A test that covers the skill's quoted subject: not found; the twin test covers only structure and absence of host names.
- The exact lines of N2: found `SKILL.md` (the allowed version reads); in `backup_and_restore.md` no remaining over-long prose line in the paragraph named, see group 4.
