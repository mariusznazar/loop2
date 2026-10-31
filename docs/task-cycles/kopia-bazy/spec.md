# Spec — Spójna kopia bazy kont i zapisów poza serwerem gry ze sprawdzonym odtworzeniem

- Task: `docs/task-cycles/kopia-bazy/task-frozen.md`
- Open choice: the eleven rows of the task's *Questions carried to cycle*, and how To do 2's capacity sentence and H3 are met given the compression choice, and what a human needs from the repository for H5, H2 and H3.

## Intent

The account database exists in one place. This change makes a completed, consistent copy of it leave the game server every night, encrypted, for Mikrus Strych, keeps seven such copies there, tells the owner when a night's copy fails, proves once that a copy can be restored without the old server, and makes every Node.js release that reaches the server pass a check of the database's read, write and backup operations first.

The change only prepares. A human installs the script and the schedule, and from then on the schedule a human installed is what replaces a seven-day-old copy on Strych. The change holds no deletion command, restores nothing over the server's database and changes no key: a restore and a key change stay a human's documented steps.

## Goals and non-goals

Goals:

- An operator command in the `loop2` container that produces one consistent copy of the database and writes it to its standard output.
- A script outside the container, started by cron each night, that takes that output, encrypts it on the way, sends the finished file to Strych, and tells the owner through `pusher` when any step fails.
- Seven copies kept on Strych with no deletion command and no reading of Strych's file list.
- A check of read, write and backup that runs inside the image build, on the image's own Node.js release.
- A deployment warning when the installed backup script or schedule differs from the repository.
- A launcher the owner runs on his computer for H3.
- The `loop2-deploy` skill, in both copies, describing all of this (To do 7), the testing guideline row (To do 9) and every foundation entry named below (To do 8).

Non-goals:

- No third Compose service, no timer in the game server, no new HTTP route, no new mount of `loop2_accounts`.
- No compression. No pin of the Node.js image. No schema step: the database stays at version 4, so the code of `main` can still open the database after H5.
- No restore script for the server: the restore over a live database is a documented human procedure. No trial of that procedure and no build of a new server (settlement 12).
- No message on success, no warning before Strych fills up, no alert for a schedule that did not start: settlement 8 accepts that silence and records its review.
- No second destination: H1 passed, so way B of question 2 stays unbuilt.
- No agent performs an installation, a backup, a restore or a key change.

## Constraints

- **Task.** Everything under *Questions to settle*, *Settlements to record* and *Decisions in play* is settled; this spec designs inside it.
- **D-12.** Every change on the server but an automated deployment is a human's. Agents read only.
- **D-13.** Credentials never stand in a repository file, argument, log or environment. The Strych login is an access value: no repository file holds it.
- **D-16, D-15.** Installed copies are a human's; a deployment only warns about a difference, because a refusal would stop rollbacks.
- **D-17, `loop2-host-sharing`.** The application alone mounts `loop2_accounts`. A deployment changes nothing it did not change before.
- **D-112, D-114.** A short connection beside the server's opens through `AccountDatabase`; SQL and connection ownership stay in `src/server/database.ts`.
- **`loop2-deploy-keeps-running`.** A failure before the new containers start leaves the running ones in service.
- **Memory.** The container's limit is 512 MiB, the password work stays under 409 MiB, and the host has no swap (`mikrus-host-swap`), so the command has about 100 MiB of room. Measured in a container limited to 512 MiB, on the image's own Node.js, its backup step peaks at 58 MiB (decision 1).
- **`shellcheck-source-rules`.** Each new Bash script joins the test's list, without silencing directives. `deploy/**` is already LF by `.gitattributes`.
- **D-73, D-84, D-163.** Failures are shown on real files; a stand-in proves only the reaction to it; no test reaches a foreign service.
- **Code as it stands.** `NODE_ENV=production` in the image forces `LOOP2_PROXY_MODE=cloudflare-tunnel`, and the session cookie is `__Host-` and `Secure`, so a browser on the owner's computer cannot log in to a locally run image. Requests need Cloudflare's headers, as `tests/deploy/test_account_storage.py` sends them.

## Decisions

Two words used below. A **weekday file** is one of seven fixed file names on Strych, one per day of the week, so a night's copy replaces the copy made seven days earlier. The **backup script** is the host script `deploy/loop2-backup`, installed as `/usr/local/bin/loop2-backup`.

### 1. How the consistent copy is made (carried row 2)

`backup()` of `node:sqlite`, through the connection the command opens, copying the whole database in one step by a `rate` above any page count.

The one step is the point of this decision. The documentation says writes from another connection restart a backup, and SQLite warns that such a backup "may never run to completion". Measured on a 66 MB database, with a separate process committing in WAL mode with full synchronization, on this computer and in a container of `node:24-slim` limited to 512 MiB, the database lying on a bind mount of the Windows disk:

| Where, Node.js | `rate` | Result | Restarts seen | Peak memory of the process | The writer |
|---|---|---|---|---|---|
| this computer, 24.17.0 | default, 100 | not finished after 20 s | 1337 | 55 MiB | longest commit 118 ms |
| this computer, 24.17.0 | above the page count | finished in 0.37 s, integrity check `ok` | 0 | 54 MiB | longest commit 9 ms, no busy error |
| container, 24.22.1 | default, 100 | not finished after 20 s | 18 | 62 MiB | longest commit 48 ms |
| container, 24.22.1 | above the page count | finished in 6.1 s, integrity check `ok` | 0 | 58 MiB | longest commit 394 ms, no busy error, under the 1000 ms busy timeout |

The container's times are those of the bind mount, not of the server's Docker volume; only the memory is what this table gives for the server. Restarts follow the disk's speed: on an anonymous Docker volume, in the same limited container, one step took 485 ms with no restart and the writer's longest commit at 55 ms, and the default `rate` took 1.5 s with 70 restarts, integrity check `ok`. So "the default `rate` does not finish" is no general fact and reaches no foundation entry; what decides here is that one step has no restart to suffer. A second measurement, on both releases, showed the one target file is whole on its own: a row held only in the source's write-ahead log, and `user_version`, were present after the file alone was moved and opened, and no `-wal` file stood beside it.

- Rejected: `VACUUM INTO` — would also finish beside a writer, but it is a second operation beside the one the projected decision and its source name (the Online Backup API), and it rewrites the file rather than copying it. It is the fallback if one-step backup ever fails.
- Rejected: the default `rate` — measured above.
- Rejected: `rate: -1` — the documentation says "positive", 24.17.0 accepted it, and 24.22.1, the release of the local `node:24-slim`, refuses it with `ERR_OUT_OF_RANGE`. The `rate` is therefore a positive whole number above any page count.
- Rejected: copying the three files — not consistent. A `sqlite3` tool — not in the image and not `node:sqlite`.
- Cost if wrong: a Node.js release refuses that `rate`. The check of decision 9 fails the build, exit 7, with the running game untouched.

### 2. The operator command (settlement 3; carried row 3)

`src/server/account-backup.ts`, run as `node dist/server/account-backup.js` in the `loop2` container, follows the pattern of `account-block.ts`: it opens the existing file of `LOOP2_DATABASE_PATH` with `AccountDatabase`, never creating one.

It needs exactly one fixed word, `--to-standard-output`. Without that word, or with anything else, it refuses with the usage exit code and prints nothing to standard output, before it opens the database. So the bare command, the likeliest slip, shows no player's data on any screen.

Given the word, it backs up into a private temporary directory in the container's own `/tmp`, closes the database, writes the finished file to standard output and removes the directory, also after a failure. Standard output carries the copy's bytes and nothing else; messages go to standard error and hold no database error, path of a player's data or address.

Exit 0 means the whole file was written. Every other exit means the output is not a copy: distinct codes for a database failure, wrong arguments and no database file, as in `account-block.ts`.

There is no refusal for a terminal. Inside the container the command sees a terminal only under `docker exec -t`, so such a check would stop only a person who typed both `-t` and the word, who has already asked for the output. The script never uses `-t`. The skill warns that the word sends every address and password hash to wherever standard output points.

`AccountDatabase` gains one method that makes the backup at a given path; no SQL and no `node:sqlite` import stand outside `database.ts`.

Only a human or the installed backup script runs the command; the skill forbids it to agents.

### 3. How the file leaves the container (carried row 3)

Through `docker exec`'s standard output, read by the backup script. The temporary copy lies in the container's writable layer for the seconds of the run. On the host the plain database exists only in the pipe, never on the disk.

- Rejected: a file in `/app/data` fetched by `docker cp` — a plain copy in the persistent volume, left there by any failure, and three commands to fail.
- Rejected: a new bind mount or a volume mount in a helper container — changes D-17.
- Measured: 8 MiB of every byte value passed through `docker exec` without a terminal with its SHA-256 unchanged, in a pipe from Git's bash on this computer. Docker's engine answers here, so the smoke test of decision 15 keeps this true in the gate, and H3 proves it on the real path.
- Cost if wrong: a damaged stream fails `age`'s decryption or the database's opening at a restore, which is why H3 runs before the merge.

### 4. Encryption (carried row 4; settlements 4, 5, 6)

`age`, in the backup script's pipe on the host, with an identity file used as a symmetric key: encrypting and decrypting with the same one secret file. The age manual documents this use.

- The key is `/etc/loop2/backup-encryption-key`, owner root, group root, mode 0400, made by `age-keygen` in H2, with a copy in the private note. It stays outside the checkout, in no Compose secret and in no container.
- `age` exits 0 only for a whole input, and its files cannot be altered without the decryption failing, which matters on a shared server. The server, Ubuntu 22.04, does not have it installed, and its `apt` offers the candidate `1.0.0-1ubuntu0.1` (read 2026-10-30), a package that holds `age-keygen` too; the owner's Windows computer has it through `winget`.

Ways weighed:

| Way | Why it lost |
|---|---|
| `age` key pair, public half on the server, private half only in the note | Stronger against a thief of the server, who however reads the live database anyway. Settlement 6 says the key is a secret lying on the server, with a copy; this way has no such secret, and the note would hold the only copy. |
| `gpg --symmetric` with a passphrase file | Needs no install on the owner's computer (Git for Windows has it), but it wants several flags to run without a person, keeps a home directory and may start a background agent on a host with no swap. |
| `openssl enc` | Probably installed, but it authenticates nothing: a changed file decrypts to rubbish without an error. |
| Node's `crypto` inside the command | No install at all and no plain bytes leave the container, but it is our own file format and it brings the key into the game container. |

Cost if wrong: one more package on two machines, in exchange for two short commands. Losing the key loses every copy, as question 4 accepted.

### 5. Compression, capacity (carried row 5; the first added question)

No compression. A copy on Strych is the database file plus `age`'s small overhead.

- Why: To do 2 needs seven copies in 200 MB, and the database measures 114.8 kB today. Uncompressed, the bound of the task's *Context* stands as it is: accounts times copies of about 3000 at the full limit of 64 KiB. Compression is one more pipe stage and one more restore step for room nothing needs yet, and it gives no guarantee, since it depends on content. It can be added later without touching the keys or the weekday files.
- Rejected: `gzip` in the pipe — cheap and worth doing the day a copy nears the limit, not before. `zstd` — one more package.
- The capacity sentence: in H3 the owner takes S, the size in bytes of the encrypted file he fetched from Strych, and writes the sum 7 × S ≤ 200 000 000 into the request's record. Bytes of that file, not of the database, and 200 MB taken in decimal as the smaller reading. If it fails, the cycle stops at the blocked request and returns to question 2.
- What the sum alone misses: `rsync` writes the new file beside the old one before replacing it, so eight copies stand on Strych for the length of a transfer. A night whose eighth copy does not fit fails cleanly: the old file stays and `pusher` fires. The real limit per copy is therefore 25 MB, about 385 accounts at the full limit against the 440 of question 1. The skill states this number, and the log records each night's size.

### 6. Sending, access and the host key (carried rows 5 and 6)

`rsync` over `ssh`, as H1 proved, into the home directory on `strych.mikr.us`, whole-file, with a bounded connection and input timeout, keeping the file's time. `rsnappush` is rejected: it is not installed, deletes nothing, and its saving does not apply to a file that changes daily.

- **Login.** The constants block of `deploy/loop2-backup` names only the host `strych.mikr.us`. Root's `~/.ssh/config` entry for that host, the form Strych's documentation gives, supplies the login and `IdentityFile /backup_key`. Root's file holds no such entry today (read 2026-10-30), so H2.3 writes it, with the login from the private note. This keeps the login out of the repository (D-13).
- **Host key.** The script forces batch mode and strict host-key checking against the file `/etc/loop2/strych-known-hosts`. H2 fills that file from `ssh-keyscan`, keeping the line whose fingerprint equals the one the human compared in H1, `SHA256:3WieS14O9NRnaiL5imCQfMugcVExGOoPqZEMhUD/LZk`, which is no secret. A changed host key then fails the send and fires `pusher`.
- Rejected: `accept-new` — trusts whatever answers first on a shared server's name. Disabling the check — sends past any impostor. Root's default `known_hosts` — it holds lines for the host from H1 (read 2026-10-30), but what stands there is what H1 happened to answer, while the design's own file holds only the line compared with the fingerprint.
- Cost if wrong: a legitimate key change at Mikrus stops the copies with a message each night, until a human repeats the check.

### 7. How older copies go (carried row 7; the trust boundary)

Seven weekday files `loop2-accounts-<1..7>.sqlite.age`, the number being the day of the week by the UTC date of the run. Each night replaces that day's file. Nothing is deleted by a command and Strych's listing is never read, so the shared server supplies no name to act on.

`rsync`'s default writes a temporary file beside the target and moves it into place when complete, and removes a partial file when interrupted, so a failed send leaves the seven-day-old copy standing.

Ways weighed:

| Way | Why it lost |
|---|---|
| Dated names, then delete what a remote listing shows as old | Takes names from a shared server's answer into a deleting command. Deletion on Strych is undocumented and H1 did not try it. |
| `rsync --delete` with a name filter | The same power, and it needs seven copies kept on the game server or a trick of empty files. |
| Dated names, deleting the one name computed as seven days old | No listing, but deletion is still untried, and one missed night strands a file for good. |
| Writing over the file in place | No eighth copy, but a failed send destroys that copy and leaves a broken file with the newest date. |

Consequences:

- A failed night keeps the older copy in its weekday file, so seven copies still stand. One of them is then 14 days old, which costs nothing.
- "Which is the newest" is answered by the file's time, or by the log on the server while one exists.
- A hand run during the day replaces that day's file; the copy is simply fresher.
- **Reading of settlement 10.** Its "usuwanie starych kopii" has no separate step in this design: the send also replaces the oldest copy, so a failed replacement is a failed send, and that failure calls `pusher`. The row's meaning stands, that no failed step stays silent. The wording is the writer's, and it names no step that does not exist (see *Foundation entries*).
- **Untried fact.** Overwriting a file on Strych has not been tried, since H1 sent one file. H2 tries it with a second run. If Strych refuses, retention has no way left and the cycle returns to question 2, as the refinement's note on deletion already foresees.

### 8. Hour, deployment, log, notice (carried rows 8 and 9; settlements 8, 9, 10)

**Hour.** 03:17 by the server's clock, daily, as root. The server's clock read CET, +0100, on 2026-10-30, so that is night. The minute avoids the round hours other users of a shared server pick. If the server's zone follows summer time, the hour is neither skipped nor repeated at Poland's clock changes (cron's manual: a job in a skipped hour runs soon after, a job in a repeated hour does not run twice).

**A deployment at that hour.** The script takes the deployment's own lock, `/run/loop2-deploy.lock`, with the deployment's own wait of 900 seconds, for the container and encryption step only, and releases it before sending. That file is root-owned with mode 640 (read 2026-10-30), so a backup run by root opens it. The two never overlap: a deployment waits out a backup's seconds, and a backup waits out a deployment. A backup that outwaits 900 seconds is a failed night with a message, and the next night repairs it. Rejected: no lock — a replaced container fails the copy, a false alarm for a normal event.

**The script's steps**, each bounded in time so a hung tool cannot end in silence, each result logged:

1. Check that the encryption key can be read.
2. Take the lock.
3. Stream the command's output, asked for by its fixed word, through `age` into one file in a private temporary directory on the host. Only a ciphertext ever rests there, and the directory is removed at the end. The host's temporary filesystem has about 19 GB free (read 2026-10-30).
4. Release the lock.
5. Only if every stage of the pipe exited 0 and the file is not empty, log the weekday file and the ciphertext's size, on every attempt, before anything is sent.
6. Send.

**The log** is `/var/log/loop2-backup.log`: each attempt's start and its end, the weekday file and size of each ciphertext made, and the stage and exit code of a failure, so a night that fails at the send holds its size beside the exit code. The error text of `docker`, `age` and `flock` goes to this file alone, as in `deploy/loop2-deploy`. It holds no player data and no access value. It answers carried row 9: a cron that did not start writes nothing, which the skill says plainly.

**The send's error text reaches no file.** For the send step the log holds the stage and `rsync`'s exit code, and the script discards the error text of `ssh` and `rsync` in every run. A refused login prints the login, which is an access value (D-13), and an agent may read this log. A human who needs the reason makes a hand run of the send, in a private terminal: `rsync` of a small file with the script's options, as the skill gives it. The text stays on that screen, and an agent never makes this run. A passing hand run proves access only: a small file fits where the eighth copy does not, so a failed send with a passing hand run and a logged size near 25 MB means Strych has no room for the eighth copy.

**The notice.** One handler at the script's exit: any non-zero end, from any cause, calls `pusher` once with a fixed subject and fixed text saying only that the copy failed. No tool's output is piped into it, and no step's name (settlement 9). A failing `pusher` is logged.

### 9. The Node.js release check (carried row 1; To do 6)

A check in the image build. `src/server/account-database-check.ts`, built like the rest of `src/server`, is run by a `RUN` step in the final stage of `Dockerfile`, after `dist` is copied. It creates a temporary database through `AccountDatabase`, writes an account and a saved game state, reads them back, makes a backup by the method of decision 2, opens the copy, reads the same values, removes its files, prints the Node.js release it checked and exits 0; any difference or error exits non-zero.

No image can exist on the server without having passed on its own Node.js release, by construction:

- A failure fails `docker compose build`, so the deployment ends at exit 7 with the running containers untouched, which `loop2-deploy-keeps-running` already covers.
- A changed base image invalidates the build cache and reruns the check. A cached step means the same base and the same code passed before. On a new host after a disaster the check simply runs on whatever release that host gets.
- The deploy log's build output shows the release.

| Way | Cost | Result |
|---|---|---|
| Pin only, by version and digest | A pin checks nothing: someone must run a check by hand at each bump, and base-image fixes stop until someone bumps | Rejected |
| A check in `deploy/loop2-deploy` before the containers are replaced | One more container on a host without swap, a new allowed `docker run` that `loop2-host-sharing`'s reading forbids, and a reinstall for every change of it | Rejected |
| Both a pin and a check | Reproducible builds, which this sentence does not need, at the price of a pin to maintain | Rejected for now |
| The check in the image build | Unpinned, so H3's image may stand on another 24.x than the server's; the launcher reports the release it ran on | **Chosen** |

Cost if wrong: a new release fails the check on the server and deployments stop at exit 7 until a human pins the last good release. A pin can be added then, in one change.

### 10. Comparing the installed copies (carried row 10)

Yes. `compare_installed_script` in `deploy/loop2-deploy` compares three pairs instead of one: the deploy script, the backup script and the schedule, each with its source at the deployed commit. It only warns, in the same words of kind, so the warning reaches the Actions log.

This is what makes the accepted drift of question 3 visible. It costs one reinstall of `loop2-deploy` in H5. Warnings are expected between H5 and H2 and after a rollback to a commit from before this change; the skill says so, and decision 13 says what else that rollback does. Rejected: no comparison — the drift D-10 rejected for the tunnel would stay invisible.

### 11. What is installed, from where, in what order (the second added question)

All sources come from the exact branch head, by the skill's existing procedure: `git show <sha>:<path>` into a temporary file, `bash -n` where it is a script, then `install`.

| Step | Who and where | What | Source | What shows it worked |
|---|---|---|---|---|
| H5.1 | human, server | Reinstall `/usr/local/bin/loop2-deploy`, root 0755 | `deploy/loop2-deploy` at the head | `cmp` |
| H5.2 | human, server | `loop2-deploy <head>` with `SSH_ORIGINAL_COMMAND` unset | the head | log ends with `deployed`; the build output shows the check's release; warnings about the two absent copies are expected. The no-merge window opens here |
| H2.1 | human, server | `apt install age` | the server's `apt`, candidate `1.0.0-1ubuntu0.1` | `age --version` |
| H2.2 | human, server | `age-keygen` into `/etc/loop2/backup-encryption-key`, root:root 0400; copy into the private note | — | `stat` |
| H2.3 | human, server | Write root's `~/.ssh/config` entry for Strych's host, which is absent today; fill `/etc/loop2/strych-known-hosts`, root 0644 | the host from the constants block of `deploy/loop2-backup`; the login from the private note; the fingerprint in decision 6 | `ssh-keygen -lf` shows that fingerprint |
| H2.4 | human, server | Install `/usr/local/bin/loop2-backup`, root 0755 | `deploy/loop2-backup` at the head | `cmp` |
| H2.4a | human, browser | In the test account on the public game, give a character or a program a name to recognise, wait for the automatic save, then reload the page. This comes before every run whose copy H3 may use, and the name is written down for H3 | — | the name is back after the reload, which shows the save finished |
| H2.5 | human, server | Run it by hand, then again | the installed copy | log shows success twice with the same weekday file. The second run is the overwrite trial of decision 7 |
| H2.6 | human, server | One deliberate failure: move the key file aside, run, move it back | the installed copy | the message arrives, the log shows the stage, the weekday file on Strych is unchanged |
| H2.7 | human, server | Install `/etc/cron.d/loop2-backup`, root 0644 | `deploy/loop2-backup.cron` at the head; the installed name has no dot, as cron requires | see below |
| H2.8 | human, server | Next morning, read the log for a run at 03:17 | — | the only proof that the host's cron runs this file |
| H3 | owner, his computer | Decision 12 | the same commit | PASS and the capacity sum |

H2.8 costs the one night question 10 named as the human's wish. This spec recommends it: the cron service is active and `/etc/cron.d` exists (read 2026-10-30), but whether a file there really starts stays H2.8's to show, and a schedule that never starts is exactly the silence settlement 8 accepts. It stays the human's choice; left out, it is reported as unchecked, never as passed.

If the request is abandoned after H2, the human removes `/etc/cron.d/loop2-backup`, or a message comes every night. Rolling back needs no data step, as no schema changes.

### 12. The restore trial (To do 5, H3, settlement 12)

`scripts/restore-trial.mjs`, a launcher on the model of `scripts/measure-passwords.mjs`, with Node.js built-ins only, run by the owner on his computer. It takes the built image, the decrypted database file and a marker text as arguments, and the test account's address; the password comes on standard input, never as an argument.

It starts one container from the image on a fresh temporary volume holding that file and on a synthetic session key and SMTP password file, with the production settings of `compose.yaml`. Through the server's HTTP port, from inside the container with Cloudflare's headers as `tests/deploy/test_account_storage.py` sends them, it logs in and reads `GET /api/saved-game`. It prints the Node.js release, the login's status, the save's revision, whether the marker stands in the saved game state, and PASS or FAIL. It removes the container and volumes, also after a failure. It prints no game text, no address and no password. It sends no mail, since login sends none.

The marker is the name of step H2.4a, which the human gives a character or a program in the test account before the copy is made; saved game states hold both as text. This shows "that exact change is back", not merely that some save exists.

The owner's order:

1. Turn on the Docker engine and install `age`.
2. Make a temporary Strych key from the note, as in H1, and fetch the weekday files with `scp`, keeping their times.
3. Take the newest and write down its size.
4. Decrypt it with the key from the note.
5. Build the image from a clean checkout of the same commit.
6. Run the launcher.
7. Write the sum of decision 5 and the launcher's report into the request's record.
8. Remove the copies, the decrypted file and both temporary keys.

- Rejected: a sequence of commands in the skill alone — about ten Docker commands in PowerShell, an inline client and a password to keep out of arguments, never run before H3. A typo there costs a correction inside the no-merge window, while tasks 14, 18 and 21 wait.
- Rejected: a browser — the login cannot work on a local image (see *Constraints*).
- Not proven by this trial, and said so in the skill: building a new server, restoring over a live volume, copies of later schema versions.

### 13. The skill (To do 7)

A new reference, `references/backup_and_restore.md`, in both copies of the skill, byte-identical, with `SKILL.md`'s resource table and agent lists updated and its description naming backups. No file of the skill names a Mikrus host or address, web pages included: `tests/agent_workflow/test_loop2_deploy_skill.py` keeps its pattern and only gains the new file in its list. Where the skill needs Strych's host, it points to the constants block of `deploy/loop2-backup`, which the repository still answers on the day the server is gone. Mikrus's pages are named in words.

The reference holds:

- Where copies lie, and where each new key and file lies.
- The steps of decision 11, as the procedure for installing and reinstalling.
- Changing the encryption key: a new key, the old one kept in the note until all seven weekday files have been replaced since the change, because older copies still need it. Seven nights are not enough where a night failed: the log shows which files were replaced.
- That no source says whether the Strych key can be replaced.
- How to read the log and what each failed stage means, including the 25 MB limit per copy, and that a cron that did not start writes nothing.
- The hand run of the send of decision 8, for the reason of a failed send, with a warning that its text may show the login and stays out of notes, requests and logs, and with the sentence that a passing hand run proves access only, so a failed send with a passing hand run and a logged size near 25 MB means Strych has no room for the eighth copy.
- That the command's fixed word sends every address and password hash to standard output, so it is used only as the script uses it.
- That after a rollback to a commit from before this change the nightly run fails and a message comes each night. That is a true alarm, as no copy is made until a commit with the command is deployed again.
- What an agent may read: a bounded tail of the log, `stat` of the two new files, and `cmp` of the installed copies. What it may not do: read key contents, run the backup script or the command, make the hand run of the send, fetch or open a copy, or list Strych with the owner's key.
- Restoring: on the owner's computer as in decision 12, and over the server's database as a counted human procedure. Stop `app`; replace the file in the volume with owner uid 1000 and remove the `-wal` and `-shm` beside it; start by deploying the running commit; check. With no server: provision first, then the same.
- What a restore undoes: everything after the copy, including accounts, saves, blocks, password changes and logouts. An open browser then gets the sentence of D-209. A copy newer than the running code's schema is refused until a commit that knows it is deployed. The server procedure has never been tried.

The sentences at `references/setup_and_secrets.md:299`–`300` and `references/troubleshooting.md:101`–`102` and `:128`–`129` change in the same change. `SKILL.md` and `troubleshooting.md` also read exit 7 with the check's failure, and D-15 stays true: a restore is a separate path, not a rollback.

### 14. Units and their interfaces

| Unit | Does one thing | Used by | Depends on |
|---|---|---|---|
| `AccountDatabase` backup method | Makes one consistent copy at a path, whole in one step | units below | `node:sqlite` |
| `src/server/account-backup.ts` | Given its one fixed word, writes one copy to standard output, or fails with a code; without the word, refuses and prints nothing | the backup script, a human | `AccountDatabase`, `LOOP2_DATABASE_PATH` |
| `src/server/account-database-check.ts` | Checks read, write and backup on the running release; exit code | `Dockerfile` | `AccountDatabase` |
| `deploy/loop2-backup` | One night's copy: lock, stream, encrypt, send, log, notice. No argument. A constants block between the same markers as `deploy/loop2-deploy` | cron, a human | `docker`, `age`, `rsync`, `ssh`, `flock`, `pusher`, the two files in `/etc/loop2`, root's SSH entry |
| `deploy/loop2-backup.cron` | Starts the script nightly as root, with cron's mail off | cron | the installed script |
| `compare_installed_script` in `deploy/loop2-deploy` | Warns about three pairs of copies | the deployment | `cmp` |
| `scripts/restore-trial.mjs` | Proves one decrypted file logs in and holds the save | the owner | `docker`, a built image |
| `references/backup_and_restore.md` | The human's procedures and the agent's limits | humans, agents | all above |

### 15. Tests (To do 9 and the two questions of step 4)

- **The command**, integration on real SQLite files, with a separate writer process running: the copy finishes, opens and holds what was committed before it started, also a row only in the write-ahead log. Without the fixed word, and with any other argument, it refuses with empty standard output and without opening the database. Every refusal changes nothing. A missing file creates nothing. Nothing is left in the temporary directory.
- **The check**, on the real Node.js: passes. On a temporary directory that cannot be written: fails non-zero. A test of `Dockerfile` as it stands: the step stands in the final stage, after `dist`.
- **The script**, through the same kind of seam as `tests/deploy/deploy_script_support.py`, with stand-ins for `docker`, `age`, `rsync`, `flock`, `pusher` and `date`:
  - order of steps, and `docker exec` called with the command's fixed word and without `-t`;
  - each failing step, a stopped container among them, gives exactly one `pusher` call with the fixed text;
  - a marker fed as the database reaches neither `pusher`, nor the log, nor `rsync`;
  - a sentinel login printed on the `rsync` stand-in's standard error, with a failing exit, is absent from the log and from the notice, while the log holds the stage, that exit code and the ciphertext's size;
  - a failing or absent key or `age` means `rsync` never runs;
  - `rsync` gets no deleting option and one of exactly seven names over a week;
  - no remote listing is requested;
  - the host-key options stand.
- **The comparison**, the three pairs, warning only.
- **The launcher**, its refusals without Docker; its run where a daemon answers, otherwise skipped and reported unchecked.
- **A container smoke test**, in the shape of `tests/deploy/test_account_storage.py`: the bytes of `docker exec` open as the database. Docker's engine answers on this computer, so it runs in the gate here; on a machine where no daemon answers it skips and reports itself unchecked.
- **The testing guideline.** A new row answer for Strych and `pusher`: no test reaches them; the script's reactions are shown with stand-ins, which prove reactions and not delivery; the real contact is checked by a human when the way of talking to them changes. Its meaning needs the human's approval (WAY-172). Every new test of an invariant cites it and has been seen failing once.
- **The irreversible operations** are prepared only: no test, script or skill instruction of an agent performs them.

### 16. Settled by the orchestrator after the review of the revision

The one finding left after the revision: a failed send on a full Strych logged no size, and the hand run of a small file passed. Settled as step 6 of the cycle settles a question, by the reviewer's fix, the smallest reversible reading: decision 8 logs the ciphertext's size before every send, says what a passing hand run proves, and decision 15's test holds it. No decision is reopened. Rejected: keeping `rsync`'s text in the log — breaks D-13's *Verification*. Cost if wrong: one log line. Also settled: the entry's real parts stand in place of the definition's `Part: every`, as the entry of `account-save-sqlite-access` from the same definition does; the meaning of a projected invariant is unchanged by naming them.

## Foundation entries

The foundation step or the return step writes these, as `.the-way/task-cycle/skill/foundation_step.md` gives. Of a row of *Settlements to record*, the meaning is the row's and the wording the writer's. A projected entry stands whole as approved.

**Decisions, new:**

- "Which failure does the database backup survive?" — the projected entry. A completed, consistent copy stands outside the host; Strych is the place when it passes. Scope: account-server, deployment, agent-workflow.
- "How does the account and save server access SQLite?" — the projected entry. `node:sqlite` only, and a release deploys only after the check; realized by the image-build check. Scope: account-server, build-tools, deployment.
- How often a copy is made and how many stay — settlement 1 with the weekday files, and no deletion command or remote listing.
- Where the copy runs — settlement 2 with the stream through `docker exec`, the shared lock, the hour and the comparison of the three pairs. It names D-10's *Rejected* as the reasoning reversed for this case and leaves D-10 unchanged.
- How the copy is encrypted — settlement 4, `age` with an identity file, no compression.
- How the owner learns of a failed copy — settlements 8 and 9, the gap and its review before the public launch of accounts, and the log, which holds no access value.
- What a checked restore means — settlement 12.
- How the code that talks to Strych and `pusher` is tested — the departure from the testing template, like D-163.

**Decisions, changed:**

- D-13 — adds the encryption key's path, owner, mode and private copy, adds `/backup_key` with its private copy, and says no container receives either. Rotation for the encryption key, with no consumer to recreate. Settlements 6 and 7.
- D-112 — the backup command opens a short connection beside the server's under the same rules. Settlement 3.
- D-73 — its list of departures gains the new testing decision.

**Unchanged, checked:** D-10, D-15, D-16, D-17, `loop2-host-sharing`.

**Invariants, new:**

- `account-save-backup` — the projected sentence. Method `review`, since it speaks of the state of a running server and no cheap test can see it; H2 and H3 are its evidence, so no test carries an expected-failure marking. Rests on the new SQLite fact. Part account-server · deployment.
  - It is recorded with *Violated: yes*, because its sentence is false from its recording until the human's H2 and H3.
  - The mark is cleared only after those checks, by a later commit on this branch that changes that one field, as commit e95a8b1 did in the previous cycle. That commit changes no code, so the code H5 deployed and H3 tried is the code that merges. A left-out H2.8 does not hold the mark back: it stays reported as unchecked.
  - The request names the mark, set and cleared, under *What the foundation puts in front of the human at the merge* (`.the-way/task-cycle/record_template.md:169`–`171`), where the human accepts it at the merge.
- `account-save-sqlite-upgrade` — the projected sentence. Method `test`: every deployed image passes through the checked build step. Rests on `node-sqlite-database`. Part account-server · deployment.
- An invariant for settlement 5 — a copy does not leave the server unencrypted. Method `test`. Rests on the `age` fact. Part deployment.
- An invariant for settlement 10 — every failed step ends in `pusher`. Its words name no step that does not exist: they cover the send, which also replaces the oldest copy, so a failed replacement is a failed send. Method `test`. Rests on the `pusher` fact. Part deployment.

**Invariants, changed:** `account-save-sqlite-access` — *Derives from* moves from the definition's passage to the new SQLite decision.

**Environment facts:**

- `node-sqlite-database`, changed — adds `backup()`, its `rate` and its restart under other connections.
- New: SQLite's Online Backup API — a snapshot, restarted by other connections, and N pages per step.
- New: settlement 11's `pusher` fact.
- New: `age` — an identity file used with `-e`, whole-input exit, no unauthenticated output.
- Strych's own facts stay in the decision's *Based on*, since the human rejected a separate fact for them (K11).

**Part map**, through `the-way-update-part-map`:

- `account-server` — responsibility gains the backup command and the check; the new test file is claimed.
- `deployment` — responsibility gains the backup script and schedule; new invariant test files are claimed.
- `build-tools` — keeps `scripts/**`.
- *External context* gains Mikrus Strych and the `pusher` service, both directions, untrusted.

**Guidelines:** `guidelines/testing.md` through `the-way-maintain-testing-guidelines` — the row at line 56, the count of departures at line 10, and the trust-boundary rows of `src/server/` (the command's refusals) and `deploy/` (the script's refusal to send). `guidelines/coding-database-access.md` stays true as it stands.

**Glossary:** none.

## Left to the maker

- Names and numbers of exit codes and stage names, and the bounds of each step's time.
- The fixed subject and text of the notice, within settlement 9.
- Whether the backup script's test seam shares code with `deploy_script_support.py`.
- Text of the deployment's warnings.
- How the launcher brings the file into the temporary volume, and its waiting.
- The size of the writer's load in the command's test. Whether a default-`rate` backup finishes under it depends on the disk, so the test guards decision 1 by what it asserts of the one step, not by the default's failure to finish.
- Which existing tests that read `Dockerfile` or `deploy/loop2-deploy` need their lists extended; each such change follows *Changing an existing test*. `tests/agent_workflow/test_loop2_deploy_skill.py` gains the new file in its list, and its pattern stays.
- Division into slices. To do 6 stands apart from the backup except for the one method both use.
