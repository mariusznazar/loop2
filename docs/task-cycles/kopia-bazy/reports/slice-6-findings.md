# Blocking findings — review of slice 6, in the reviewer's words

From `reports/slice-6-review-report.md`, head `a11ad0af701d65a2f5f74edf3a6179cfa1ca35eb`.

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
