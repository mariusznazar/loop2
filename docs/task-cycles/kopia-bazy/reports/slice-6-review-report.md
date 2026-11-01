FAIL a11ad0af701d65a2f5f74edf3a6179cfa1ca35eb

# Review of slice 6 — the loop2-deploy skill

Range `46614c6..a11ad0a`, two commits. Paths below of the reference mean `.claude/skills/loop2-deploy/references/backup_and_restore.md`; its copy in `.agents/` is byte-identical, so a fix goes into both.

What holds: every item of spec decision 13 has its place; the exit codes, stages, log lines, times and file names agree with `deploy/loop2-backup`, except finding I4; the rsync options of the hand run are the script's; the fingerprint is the spec's and the task's; no instruction has an agent perform anything forbidden (the actor wording is M4); the three named sentences changed and read true; no Mikrus host or address stands in the skill.

## Blocking findings

Five, all Important, all within the task. None is Critical: every one fails visibly or gives a wrong reading; none destroys data unaided, I2 being the closest.

### I1 — "With no server" cannot be followed from its text

**Place:** the reference, lines 251–258, with lines 236, 18, 16.

**What is wrong.** Walked as the human on a fresh host, after "Initial host provisioning" and a deployment:

- Restore step 2 (line 236) runs `age`, which a new host does not have. Installing step 3 (`apt install age`, line 108) is not among the steps this section sends the human to: it names "steps 5 and 6" only (line 256).
- The section says "with the files from the owner's private note: … the backup key and the Strych key" and does not say where they go or with what mode. Restore step 2 reads `/etc/loop2/backup-encryption-key`; root's SSH entry reads `/backup_key`. The table gives the paths, but no mode for `/backup_key`, and ssh refuses a private key readable by others.
- `/etc/loop2` itself is made in the tunnel's H2 (`setup_and_secrets.md:43`), not in "Initial host provisioning", which is the only thing this section names.
- It closes with "Install the backup script and schedule again afterwards." That skips Installing steps 3, 9, 10 and 12. On a new host `rsync` and `pusher` are not given: the task read them on this server only (`task-frozen.md:126–127`), `pusher` being Mikrus's `/bin/pusher`. Without step 10 a host with no `pusher` fails every night with only `notice: pusher exit 127` in a log nobody reads (`deploy/loop2-backup:104–108`): the silence D-219 accepts for a stopped schedule, here for a schedule that runs.
- To do 7 asks for the restore's number of steps and who does them "także gdy serwera już nie ma" (`task-frozen.md:31`). This path has no count and names no actor.

**Why it matters.** This is the day the whole task exists for, and spec decision 12 says the new-server path is not proven by the trial, so the text is all there is. The handoff's standard is the human with only this text.

**Fix.** A numbered, counted list: provision; create `/etc/loop2` as in H2; session keys, SMTP password and tunnel token by their sections; `apt install age` and check `rsync` and `pusher`; `/etc/loop2/backup-encryption-key` root:root 0400; `/backup_key` root 0600; root's SSH entry and the known-hosts file; deploy; restore steps 1–8; Installing steps 7 to 12.

### I2 — The moved-aside database is not whole, and step 6 can erase it

**Place:** the reference, lines 238–241 and 247–248. **Partly mandated:** spec decision 13 says to remove the `-wal` and `-shm`. The promise to keep the old file is the executor's own; the defect is the two together.

**What is wrong.**

- Step 4 keeps `accounts.sqlite` "until step 7" as the way back, and removes its `-wal` and `-shm`. `setup_and_secrets.md:291–292` says the recent writes lie in those companions, so the one file is not the database. A clean stop merges them (`src/server/main.ts:30–39` closes the database on SIGTERM), but the database stays unclosed after a crash, an OOM kill or a stop past Docker's wait, and a restore is most likely after exactly such an end. The kept file then lacks committed writes and, after a partial checkpoint, may be corrupt.
- "Move … out of it" names no destination. Step 3 has just put the human in `/srv/loop2`, and step 6's deployment runs `git clean -ffdx` there (`deploy/loop2-deploy:194`), which erases anything left in the checkout. `/tmp` would leave addresses and password hashes in a shared directory.
- Nothing says what to do if step 7 fails.

**Why it matters.** The fallback fails at the one moment it is used, and the current data goes with it.

**Fix.** Step 4: move all three files together into the private directory of step 1, which lies outside `/srv/loop2`; the volume is left with none of them, which meets the spec's purpose. Add the way back: stop `app`, remove the restored file and its companions, move the three back, deploy.

### I3 — The no-merge window is lost

**Place:** the reference, lines 106–107, against spec decision 11, row H5.2 ("The no-merge window opens here"), and question 10 (`task-frozen.md:104`).

**What is wrong.** The line reads "From this deployment until a merge, the rules in "Deploying a request head and accepting it" in `setup_and_secrets.md` apply." The one merge rule there (`setup_and_secrets.md:309–313`) begins "When the request brings saved game states", which this request does not, and it forbids merges only. Question 10 forbids more: "nic innego nie scala się do `main` ani nie wdraża na serwer". The task names the case: the human action H1 of task 21 deploys its own branch (`task-frozen.md:130`).

**Why it matters.** Another deployment removes the backup command from the server's image: nightly failures, and H2 and H3 run on the wrong code, with tasks 14, 18 and 21 waiting on that window.

**Fix.** Say it in the step: from this deployment until this request's merge, nothing else is merged to `main` and nothing else is deployed, because any other deployment removes the backup command.

### I4 — The log table misreads `docker` exit 1

**Place:** the reference, line 57.

**What is wrong.** It reads "`docker` 1: the database could not be backed up" and "125 to 127: Docker itself or no container named `loop2`". On Docker 29.7.2 `docker exec` exits 1 for a missing container and for a stopped one, and a missing script exits 1 too:

| Case | Exit |
|---|---|
| `docker exec r6-no-such-container true` | 1 |
| `docker exec` on a created, not started container | 1 |
| `node /app/no-such-file.js` in `node:24-slim` | 1 |

So a dead game container, and a rollback to a commit without the command (the case the same line and lines 87–91 mention, with no number), all read as a failing database.

**Why it matters.** To do 7 and decision 13 ask how to read the result, and settlement 10 names the dead container as a case of its own (`task-frozen.md:205`). A reader of the table goes after the wrong thing. Docker's own line stands just above in the log, which softens this but does not make the table true.

**Fix.** `docker` 1: no running container `loop2`, no command in this commit, or a failed backup; the line before it in the log says which.

**Unverified:** the server's Docker version was not read (no server); the local engine is the evidence.

### I5 — The PowerShell password form breaks under a UTF-8 console, and the reference then blames the backup

**Place:** the reference, lines 214–219; `scripts/restore-trial.mjs:150–157` (slice 5's file).

**What is wrong.** Under a console in code page 65001, Windows PowerShell 5.1 writes a byte-order mark before the piped text. Measured with the reference's form and a scratch reader:

| Console | `$OutputEncoding` | Bytes received for `ascii-pass-1` |
|---|---|---|
| 852, this computer's default | us-ascii | `6173…310d0a`, clean |
| 437 | us-ascii | clean |
| 65001 | us-ascii or utf-8 without preamble | `efbbbf6173…`, mark first |
| any | `[Text.Encoding]::UTF8` | mark first |

`cleanPassword` keeps it: given those bytes it returned text of length 13 with first code unit `feff`, not equal to the password sent. The login then cannot succeed, and the launcher ends with `FAIL: the test account could not log in`, exit 1, which line 219 reads as "the trial ran and judged the backup (FAIL)". Keeping the password ASCII, the protection the reference gives, does not help.

**Condition, stated plainly.** A plain PowerShell window on this computer passes clean bytes: system OEM code page 852, no profile file. It breaks after `chcp 65001`, under a shell that sets it (this tool's own shell does), or with `$OutputEncoding` set to UTF-8.

**Why it matters.** A sound backup gets a false verdict in the one check the task rests on, inside the no-merge window. Spec decision 12 rejected commands in the skill for just this cost.

**Fix.** Either strip a leading U+FEFF in `cleanPassword` with a test, which is a change to slice 5's file and is for the orchestrator to route, or add a sentence that this runs in a plain window, never under `chcp 65001`, and that login status 401 with a right password means the mark, not the backup.

## Minor

**M1 — The mode of the restored file (the executor's open search).** The reference, line 242, gives no mode. Judged: state 0600. The launcher proves that mode runs the application, `scripts/restore-trial.mjs:260–265`. No code in `src/server` sets or checks the file's mode. The word "Install" invites `install`, whose default is 0755, world-readable and executable, on a file of addresses and password hashes; the application would still run, and Docker's data directory normally shuts other users out, so this is exposure in depth, not a break. Unverified on the server.

**M2 — The fetch with a temporary key (the executor's open search).** The reference, lines 203–205 and 234–235. Judged: the facts suffice for the owner's path, since the seven names, the home directory, the host and the login are all reachable from the text and the note, and H3 will exercise it before the merge; a failure there is visible. What is missing:
- No command, though every other step has one. H1 fetched one named file without `-p` (`task-frozen.md:124`), so `-p` and several files are untried. A form such as `scp -p -i <temporary key> <login>@<host>:loop2-accounts-*.sqlite.age .` would close it; that exact form is untried and could not be tried here.
- No comparison with the fingerprint. The first connection from another computer asks about the host key, and the fingerprint stands only at Installing step 6. Spec decision 6 rejected trusting whoever answers first; `age` still protects the content, so this is Minor.
- Nothing on the temporary key file's own permissions or line ending on Windows.
- Server path, step 1: no tool, and no `UserKnownHostsFile=/etc/loop2/strych-known-hosts`, and "the newest by time on Strych" has no way given to read a time (H1 used `rsync --list-only`; the script never lists, but the human may).

**M3 — "The same commit" points at nothing, and the image cannot show it.** The reference, line 210. No commit was named before it. `docker build -t <image> .` leaves `LOOP2_COMMIT` at `unknown` (`Dockerfile:15`), so the launcher prints `image revision: unknown` (`scripts/restore-trial.mjs:358–361`), and the report written into the request cannot show what D-220 requires. Name the commit and add `--build-arg LOOP2_COMMIT=<sha>`.

**M4 — Two procedures name no actor.** "Changing the encryption key" (lines 153–167) and "Trying a backup on the owner's computer" (lines 198–225) are bare imperatives, while Installing and Restoring say "the human". Lines 4–5 and 185–187 cover them, so no instruction has an agent act; but agents hold a tool that can run any command and run on the owner's computer. D-12 and D-220 name both acts. One sentence in each.

**M5 — A restore across a key change.** The reference, lines 236 and 208, name one key. A backup older than a key change needs the old one, and the note holds two during that time. `age` then refuses it. One sentence: use the old key from the note for a backup made before the change.

**M6 — Nothing guards the time of a restore.** The reference, lines 234–248. A push to `main` during steps 3–6 deploys and starts the application on the half-replaced volume, after step 4 on no database. The section does not say to merge nothing until step 7. If the data was damaged before the human acts, each night until then replaces the oldest backup with damaged data; the newest good one survives a week, so the cost is small.

**M7 — Small wording.**
- Line 72, "The script's checks stop an empty file": the check stops a zero-byte file only (`deploy/loop2-backup:209`), so a file near 200 bytes passes it. The sentence reads against the one before it, which rightly says such a file would replace the weekday file.
- Line 31, "the plain database exists only inside the pipe": D-218 says on the host; it rests in the container's writable layer too (D-217).
- Line 23: D-13 does not name the known-hosts file, and line 116 rightly calls its fingerprint no secret.
- Exit 1 of the script (`deploy/loop2-backup:28`) is missing from the table.
- Lines 142–144: the code block lost its `\n` and its line continuations, leaving a literal line break in `printf` and three spaces where a backslash stood. It runs, but reads as broken.

## Tests and the author's check

- `tests/agent_workflow/test_loop2_deploy_skill.py`: only `FILES` grew; the patterns stayed, as the plan asks. The list test requires the new file in both copies, and the byte test compares them. Not an invariant test; no invariant test changed.
- The test covers no procedure, which the plan accepts: this slice's risk is in prose only a reading can check.
- The author's own-work check named agent instructions and host names. That was checked and it holds, but it is not where the slice is weakest. The weakest place is the human's walk through the procedures, and nothing in the author's check would catch I1 to I5.

## Declined to judge

- `age` 1.0.0's `--encrypt --identity` and the rest of `deploy/loop2-backup`'s behaviour: earlier slices, read here only as the source of the skill's claims.
- Where the fix of I5 belongs: the launcher is slice 5's file; that routing is the orchestrator's.
- "Rotation — human sequences" in `setup_and_secrets.md:439–457` does not list the encryption key: the plan's *Change* names only three sentences in that file, and `SKILL.md` points to the reference.
- "About 385 accounts": taken from spec decision 5 and D-216; 25 000 000 / 65 536 gives 381, which is a difference in the source, not in this slice.
- Whether Strych can give up a replaced file, or how `pusher` delivers: human actions H2 and H4.

## Checks run

| Check | Result |
|---|---|
| `git rev-parse HEAD` | `a11ad0af…`, the head given, exit 0 |
| `git -C .the-way rev-parse HEAD` against `git ls-files --stage -- .the-way` | both `a8dfe8ac…` |
| `git diff 46614c6..a11ad0a`, `git log 46614c6..a11ad0a` | two commits, nine files |
| `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` | exit 0 |
| `git ls-files --eol` on both copies | all LF |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | exit 0, 5 tests OK |
| `grep -c` of the fingerprint in spec, task and reference | 1 in each |
| `docker exec r6-no-such-container true` | exit 1 |
| `docker create` then `docker exec` on the stopped container, then `docker rm` | exit 1 |
| `docker run --rm node:24-slim node /app/no-such-file.js` | exit 1 |
| Scratch script: the pipe under consoles 65001, 852, 437 with and without `[Text.Encoding]::UTF8`, `powershell -NoProfile` | table in I5 |
| The reference's `New-Object System.Net.NetworkCredential('', $secure)` line, on a scratch value | runs on PowerShell 5.1 and gives the password |
| `node scripts/restore-trial.mjs` piped, with a missing database | exit 2, as line 220 says |
| `cleanPassword` of the bytes with the mark | keeps `feff`, not equal to the password |
| Manual: each procedure walked as the human with only this text, on the server and with no server | findings above |
| Manual: each exit, stage, log line, time and name in the reference, against the two scripts, `src/server/account-backup.ts`, `scripts/restore-trial.mjs`, `Dockerfile`, `compose.yaml` | agree except I4 and M7 |
| `git status --short` after all checks | empty |

**Not run:**
- Anything on the server or on Strych, by the dispatch, so `scp`, `ssh-keyscan` and the restore steps are unexecuted, and the server's Docker version, the live file's mode and Docker's directory mode are unread.
- `age` commands: `age` was not needed for any finding and was not run.
- The full `npm test` and `foundation_check.py`: the cycle's own run, by the method.
- ESLint, Prettier, ShellCheck, Ruff: no file of theirs changed beyond one list in a Python test the author ran through Ruff; not repeated.

## Reaches beyond the dispatch

- `src/server/main.ts`: whether a stop closes the database, for I2.
- `src/server/account-database-check.ts:84`, `src/browser/view/game-saver.ts:18`: the two quoted sentences, both exact.
- `docs/task-cycles/kopia-bazy/task-frozen.md:100–139`: question 10 and the Context on H1 and `pusher`, for I1, I3 and M2.
- `.the-way/task-cycle/review/SKILL.md` read whole; `guidelines/coding.md` and `guidelines/testing.md` read whole, as the slice's selection names.
- `.dockerignore` and `.gitignore`: whether a decrypted file in the checkout reaches the image; it does not.
- The registry's code pages and the absence of a PowerShell profile on this computer, for I5's condition.

## Searches not found or unclear

- Mode of the live `accounts.sqlite`, and of Docker's data directory, on the server: not read, no server access.
- Exit codes of `docker exec` on the server's Docker version: read locally only.
- Whether `scp -p` with a wildcard works against Strych: not tried; H1 fetched one named file.
- Whether a new host outside Mikrus has `pusher`, or a new Mikrus host has it working: no source.
