# Report — fix of the review of slice 6, task kopia-bazy

**Status:** done

**Commits:** two on `task/kopia-bazy` (hashes in the return message).
1. `scripts/restore-trial.mjs`, `tests/deploy/test_restore_trial.py` (I5, code).
2. `.claude/skills/loop2-deploy/references/backup_and_restore.md` and its byte-identical copy in `.agents/skills/loop2-deploy/references/` (I1 to I5, text).

## Findings

- **I1 fixed.** "With no server" is now a counted list of ten steps, every one the human's, in the order the finding gives: provision; create `/etc/loop2` as in H2; session keys, SMTP password, tunnel token; `apt install age` plus checks of `rsync` and `pusher` with a test message and the advice for a host with no `pusher` (read the log every morning or take the missing notice to the owner before the schedule is installed); backup key root:root 0400; `/backup_key` root:root 0600; SSH entry and known-hosts file; deploy; restore steps 1 to 8; Installing steps 7 to 12. It says plainly that the path has never been tried. Check: read against the finding; `test_loop2_deploy_skill.py` exit 0 (copies identical, no Mikrus name or address).
- **I2 fixed.** Restore step 1 makes `/root/loop2-restore` (`mkdir -m 0700`), outside `/srv/loop2`; step 4 moves all three files (`accounts.sqlite`, `-wal`, `-shm`) to `/root/loop2-restore/previous`; step 7 removes the directory only after the check passes, the same day; a "way back" paragraph gives stop `app`, remove restored file and companions, move the three back, deploy, remove the directory. The text says why not `/srv/loop2` (`git clean -ffdx`) and not `/tmp`.
- **I3 fixed.** Installing step 2 now says: from this deployment until this request's merge, merge nothing else to `main` and deploy nothing else, because another deployment removes the backup command.
- **I4 fixed.** Log table: `docker` 1 reads "no running container `loop2` (missing or stopped), no backup command in the running commit, or a failed backup; Docker's own text in the line before it says which"; 125 to 127 no longer claims a missing container; the rollback case is marked as `docker` 1.
- **I5 fixed in code and text.** `cleanPassword` strips one leading U+FEFF before the line ending. Tests `PasswordReading` (3 tests, through Node on the exported function): BOM with CRLF, LF and no line ending is dropped; only the first mark is dropped and a mark inside stays; a mark alone is refused as empty.
  - Failing first: `python -B -m unittest tests.deploy.test_restore_trial.PasswordReading`, exit 1 (3 tests, 5 failures, assertion on the leading `\ufeff`). `npm test` takes a whole file only (it refuses `-k`), so the focused failing run used `unittest`.
  - Passing after: the same command, exit 0 (Ran 3, OK).
  - Reference: the PowerShell form is kept; it now says it needs no special console, and exit 1 is described as including "the test account could not log in".

## Checks (command, exit code)

- `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` exit 0 (5 tests)
- `npm test -- tests/deploy/test_restore_trial.py` exit 0 (13 tests, including the run on Docker)
- `npm test -- tests/quality/test_quality_invariants.py` exit 0 (5 tests)
- Not run: the full `npm test` (the orchestrator's); nothing on the server.

## Own-work check

Requirement most likely missed: the BOM fix must not alter a password without a mark or one with a mark inside. Test `test_only_the_first_mark_is_dropped_and_a_password_without_one_is_unchanged` covers it; passes.

## Choices

- Directory `/root/loop2-restore`: root's home, outside the checkout, not shared. Rejected: a path under `/srv` (erased by the deployment) and `/tmp` (shared). If wrong: a different path needs one text edit.
- For a host without `pusher` I gave the stop-gap of reading the log each morning and taking the missing notice to the owner as a decision; no source settles an alternative notice, so none is invented.
- Only one leading mark is stripped (a second would be part of the password).

## Reaches beyond the dispatch

None. Skill `SKILL.md` and `setup_and_secrets.md` not changed.

## Observations

- The password text in the finding's table was reproduced by the reviewer; I did not re-measure PowerShell's bytes, only the function's behaviour on those bytes.
- The Edit tool turned `\ufeff` escapes typed in the test into raw U+FEFF characters once; I rewrote them as escape sequences and checked the file holds no raw mark.

## Searches not found or unclear

- None unresolved. Unclear: `rsync` availability on a new host is not stated by any source; the text says to check and install with `apt`, which I did not verify.
