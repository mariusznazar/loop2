# Slice 6 report — the loop2-deploy skill

**Status:** done with concerns (see Searches not found or unclear)

**Commit:** 0ea27e1 on task/kopia-bazy (base 46614c6)

**Files:** both copies of SKILL.md, references/backup_and_restore.md (new), references/setup_and_secrets.md, references/troubleshooting.md, and tests/agent_workflow/test_loop2_deploy_skill.py (the new file added to FILES). Both copies byte-identical (diff -r exit 0). No part-map change, so the part-map skill was not applied.

**Checks**
- Test first: after adding the new file to FILES, `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` failed (FileNotFoundError on the missing reference, and the file-list assertion). Note: `npm test -- <file>` runs scripts/test.py with that argument and passed with exit 0 at the end.
- After the files: `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` exit 0, 5 tests OK.
- Break once: appended a Mikrus server name to one copy only; the byte-identical test and the no-Mikrus-name test both failed; restored (diff -r exit 0).
- Ruff on the test file with --config ruff.toml --ignore-noqa --no-fix --no-cache: exit 0. ESLint and ShellCheck: no file of theirs changed, not run. Prettier does not cover the skill's Markdown in the gate's patterns; running it on those files warns (exit 1) but the gate does not check them; not changed.
- Not run: full npm test and foundation_check (the gate is the orchestrator's).

**Own-work check.** Requirement most likely unmet: no instruction has an agent do a server-changing act, and no Mikrus host or address appears. The test covers names and IPv6 patterns; I also read the agent list in SKILL.md and "What an agent may read" in the reference: only tail of the log, stat of the two files, cmp of the installed copies. Strych's host is pointed to via the constants block (STRYCH_HOST).

**Choices**
- The "two new files" for stat are the encryption key and the known-hosts file; expected values root 0 400 and root 0 644 (numeric group via %g, as the existing stat reads). Rejected: including the script/cron files (they are covered by cmp).
- The restore over the server's database takes the volume directory from docker volume inspect Mountpoint (existing text says the human opens the volume as root); the restored file is installed with owner uid and gid 1000, mode left to the installer. Cost if wrong: the procedure was never tried; the reference says so.
- The hand run of the send is a concrete command using the script's options on a small file named loop2-send-trial.txt (the fixed name); host as a placeholder.
- PowerShell password reading uses New-Object System.Net.NetworkCredential, because the test's IPv6 pattern forbids the double-colon static call.
- The Node.js release check line is quoted from src/server/account-database-check.ts; exit 7 rows in SKILL.md and troubleshooting.md name it.

**Mismatch with the plan:** none structural. The plan's line numbers for the three sentences held in the files.

**Reaches beyond the dispatch:** deploy/loop2-deploy (compare_installed_copy warning wording), Dockerfile (check step), src/server/account-backup.ts (messages), scripts/restore-trial.mjs (arguments and exit codes), to take the names from the files.

**Searches not found or unclear**
- The host-key fingerprint of Strych: no file outside .runs holds it, and the skill must name no host; the reference says "the fingerprint compared at the first access" and that the skill does not hold it. Whether to put the (non-secret) fingerprint into the skill for the no-server case is for the orchestrator.
- Mode of the restored accounts.sqlite that the application expects: not found; only that uid 1000 owns the directory.
- Whether the scp of weekday files from Strych works with a temporary key exactly as written: taken from the task (H1 proved a fetch), not verified.
- Which "two new files" stat means: inferred (see Choices).

## After the answer

The coordinator answered the fingerprint search: the fingerprint of Strych's host key (from the frozen task's Context) now stands in step 6 of "Installing and reinstalling" in references/backup_and_restore.md, in both copies, with the sentence that a key showing another fingerprint is not used until the owner has found out why. No Mikrus host is named; the host is still pointed to in the constants block of deploy/loop2-backup. The other three searches stay open.

- Commit: a11ad0a
- Check: `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` exit 0, 5 tests OK; `diff -r` of the two copies exit 0.
