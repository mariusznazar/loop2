# Database backups and restore

The account database (accounts, sessions, saved game states) is backed up every night from the
game server to Mikrus Strych, encrypted. Everything here that changes the server, the keys or
Strych is the human's. An agent only reads what "What an agent may read" lists. Use `SKILL.md`
for the other read commands.

## Where things lie

| What | Where |
|---|---|
| Backups | Strych, in the home directory of the login: seven files `loop2-accounts-1.sqlite.age` to `loop2-accounts-7.sqlite.age`. The number is the day of the week of the run by the UTC date (1 Monday to 7 Sunday). Each night replaces the file of its day, so the oldest backup is seven days old. Nothing is deleted by a command and nothing lists Strych. |
| Backup script / its source | `/usr/local/bin/loop2-backup` (root, 0755) / `deploy/loop2-backup` |
| Schedule / its source | `/etc/cron.d/loop2-backup` (root, 0644; the installed name has no dot, because cron skips a file with a dot) / `deploy/loop2-backup.cron`. 03:17 daily by the server's clock, as root |
| Log | `/var/log/loop2-backup.log` |
| Encryption key | `/etc/loop2/backup-encryption-key`, root:root, mode 0400, made by `age-keygen`, a copy in the owner's private note. Outside the checkout, in no Compose secret and in no container |
| Host-key file for Strych | `/etc/loop2/strych-known-hosts` (root, 0644): one line, the host key of Strych with the fingerprint given in step 6 of "Installing and reinstalling" |
| Strych key | `/backup_key` on the game server, a copy in the owner's private note |
| Strych login | in root's SSH configuration on the server (`~/.ssh/config`, an entry for Strych's host naming the login and `IdentityFile /backup_key`), a copy in the private note. Never in the repository |
| Strych's host | the constants block of `deploy/loop2-backup` (`STRYCH_HOST`). This skill names no Mikrus host or address; Mikrus's pages are the Strych page of its wiki and the Strych option in its panel |
| Lock | `/run/loop2-deploy.lock`, shared with the deployment |

The key and the known-hosts file are secrets or access values (D-13). Strych holds 200 MB per
user. The backup of a day is the database file plus `age`'s small overhead, not compressed.

## What the script does

At 03:17 the script, in order: checks that the key can be read; takes the deployment's lock (waits
up to 900 seconds, so a backup and a deployment never overlap); runs
`node dist/server/account-backup.js --to-standard-output` in the `loop2` container and pipes its
output through `age` into one file in a private temporary directory of the host, so the plain
database exists only inside the pipe; releases the lock; logs the weekday file and the size; sends
the file with `rsync` over `ssh` (batch mode, host key checked against
`/etc/loop2/strych-known-hosts`); removes the temporary directory. Any non-zero end calls
`pusher` once, with the subject `kopia bazy loop2 nieudana` and the text
`Kopia bazy loop2 nie udała się.` and nothing of what failed.

The command's fixed word `--to-standard-output` sends every address and password hash to wherever
standard output points. It is used only as the script uses it: never run it by hand, never with
`docker exec -t`, never into a file or a terminal.

## The log

Lines look like `<UTC time> loop2-backup: <text>`. A run holds `start`, then on success
`made: loop2-accounts-<day>.sqlite.age, <bytes> bytes`, then `end: sent loop2-accounts-<day>.sqlite.age`.
A failure holds `stage <name>: <text> (exit N)`, then `notice: pusher exit N` and
`end: failed (exit N)`. The `made` line comes before the send, so a night that fails at the send
holds its size beside the exit code. The log holds no player data and no access value.

| Exit | Stage | Meaning |
|---|---|---|
| 0 | | sent |
| 2 | input | an argument was given; the script takes none |
| 3 | key | the key file is missing, empty or unreadable; nothing was made |
| 4 | lock | the lock file cannot be opened, the lock was not free within 900 seconds (a deployment was running), or could not be released |
| 5 | temporary | no private temporary directory on the host (disk or permissions) |
| 6 | stream | `docker` or `age` did not exit 0; the line gives both statuses. `docker` 1: no running container `loop2` (missing or stopped), no backup command in the running commit, or a failed backup; Docker's own text stands in the line before it in the log and says which; 2: wrong arguments; 3: no database file at the container's path; 4: the output could not be written out; 124 or 137: the 300 second limit; 125 to 127: Docker itself failed or could not start the command. A commit from before the backup command gives a failure here too, with `docker` 1 |
| 7 | file | the encrypted file is missing or empty |
| 8 | send | `rsync` exit N, see below |
| 9 | weekday | the UTC day of the week could not be read |
| 129, 130, 138, 140 to 143 | | the run was ended by a signal |

`rsync` exit values at the send: 11 file I/O, 12 protocol stream, 23 partial transfer, 30 input
timeout; 124 and 137 come from `timeout` (the 1800 second limit). The manual lists no 255, but a
run gave `rsync exit 255` when `ssh` exited 255: a refused login, a changed host key of Strych or
a lost key reads as 255. The script discards the error text of `ssh` and `rsync`, because a
refused login prints the login. For the reason, the human makes the hand run below.

Reading a log:

- **A size near 200 bytes is an empty backup.** `age` makes a valid file of about that size from no
  input, and it would replace that weekday's file. The script's checks stop an empty file, but
  read the size anyway: the database measures far more.
- **The limit per backup is about 25 MB.** `rsync` writes the new file beside the old one before
  replacing it, so eight files stand on Strych for the length of a transfer. 7 times the size must
  stay within 200 MB, and with the extra file the real limit is 25 MB per backup (about 385
  accounts at the full limit of each saved game state, against the 440 expected). The log records
  each night's size; a size approaching 25 MB means the backups will stop fitting.
- **A failed send with a logged size near 25 MB** and a passing hand run of the send means Strych
  has no room for the eighth file.
- **A failed night keeps the older backup** in its weekday file, so seven backups still stand,
  one of them then 14 days old. "Which is the newest" is answered by the file's time on Strych,
  or by the log while one exists.
- **A cron that did not start writes nothing.** Silence in the log at 03:17 is not a success. The
  notice comes only from a run that started. Whether the host's cron starts the file is shown only
  by finding a run at 03:17 in the log the next morning.
- **After a rollback to a commit from before the backup command**, the nightly run fails at the
  stream stage and a notice comes each night. That is a true alarm: no backup is made until a
  commit with the command is deployed again. The deployment's warnings about the installed
  backup script and schedule are expected too (see "Installed-script warning" in
  `troubleshooting.md`).

## Installing and reinstalling

The human does these steps, in this order, from the exact branch head the code was reviewed at.
Extract each file from the commit with `git show <sha>:<path>` into a temporary file, check a
script with `bash -n`, then `install` (see "Installing a script from an exact commit" in
`setup_and_secrets.md`).

1. Reinstall `/usr/local/bin/loop2-deploy` if the commit changes `deploy/loop2-deploy`, root
   0755. Check with `cmp`.
2. Deploy the commit with `loop2-deploy <sha>` (`SSH_ORIGINAL_COMMAND` unset). The log ends with
   `deployed`. The build output of the first build of a commit shows the Node.js release the image
   was checked on; that line stands in `/var/log/loop2-deploy.log`, not on the terminal of a human
   run, and a repeat of the same commit prints none. The deployment's warnings about the two
   absent installed copies are expected until steps 7 and 11. **From this deployment until this
   request's merge, merge nothing else to `main` and deploy nothing else to the server.** Any
   other deployment replaces the image with one that has no backup command: the nightly run then
   fails, and the later steps (the hand runs, the restore trial) would run on the wrong code.
3. `apt install age` on the server (`age --version` shows it works). The package holds
   `age-keygen` too.
4. Make the key: `age-keygen -o /etc/loop2/backup-encryption-key` as root, then set owner root,
   group root, mode 0400. Copy the file into the owner's private note. Check with `stat`.
5. Write root's SSH configuration entry for Strych's host (host from the constants block, login
   and `IdentityFile /backup_key` from the private note).
6. Fill `/etc/loop2/strych-known-hosts` (root, 0644) from `ssh-keyscan` for that host, keeping
   the one line whose fingerprint is `SHA256:3WieS14O9NRnaiL5imCQfMugcVExGOoPqZEMhUD/LZk` (not a
   secret; compared at the first access to Strych). `ssh-keygen -lf /etc/loop2/strych-known-hosts`
   shows the fingerprint. A key showing another fingerprint is not used until the owner has found
   out why.
7. Install `/usr/local/bin/loop2-backup` from `deploy/loop2-backup` at the commit, root 0755.
   Check with `cmp`.
8. In the test account on the public game, give a character or a program a name to recognise,
   wait for the automatic save, then reload the page: the name is back. Write the name down; it
   is the marker of the restore trial. Do this before any run whose backup the trial may use.
9. Run `/usr/local/bin/loop2-backup` by hand as root, then again. The log shows success twice
   with the same weekday file; the second run shows that Strych accepts a file over an older
   one.
10. One deliberate failure: move the key file aside, run the script, move the key back. The
    notice arrives (with `ł` and `ę` whole), the log shows stage `key`, and the weekday file on Strych is unchanged.
11. Install `/etc/cron.d/loop2-backup` from `deploy/loop2-backup.cron`, root 0644. Check with `cmp`.
12. The next morning read the log for a run at 03:17. It is the only proof that the host's cron
    runs the file. Left out, it is reported as unchecked, never as passed.

If the change is abandoned after step 11, the human removes `/etc/cron.d/loop2-backup`, or a
notice comes every night.

## The hand run of the send

For the reason of a failed send, the human runs the script's `rsync` options by hand on the
server, as root, in a private terminal, on a small file that is not a backup:

```sh
printf 'test
' > /tmp/loop2-send-trial.txt
rsync --whole-file --times --timeout=120   --rsh="ssh -o BatchMode=yes -o StrictHostKeyChecking=yes -o UserKnownHostsFile=/etc/loop2/strych-known-hosts -o GlobalKnownHostsFile=/dev/null -o ConnectTimeout=30"   /tmp/loop2-send-trial.txt <host from the constants block>:loop2-send-trial.txt
echo "rsync exit $?"; rm -f /tmp/loop2-send-trial.txt
```

The text may show the login: it stays on that screen and out of notes, requests, logs and chat.
Every hand run replaces the one fixed file name `loop2-send-trial.txt` on Strych and nothing
else. **A passing hand run proves access only.** A small file fits where the eighth backup does
not. An agent never makes this run.

## Changing the encryption key

Older backups need the key they were made with, so the old key stays until no backup needs it.

1. Make the new key in a file of its own beside the old one, with `age-keygen -o` and mode 0400,
   root. Do not touch the old key yet.
2. Add the new key to the owner's private note as the current one. Keep the old key in the note
   too, marked old.
3. Move the new file over `/etc/loop2/backup-encryption-key`. Check with `stat`.
4. Run the script by hand once; the log shows `end: sent`.
5. Keep the old key in the note until all seven weekday files have been replaced since the
   change. Seven nights are not enough where a night failed: the log shows which files were
   replaced. Count a weekday file as replaced only for a `made` line of that file after the
   change that is followed by `end: sent`.
6. Only then remove the old key from the note.

If the key is lost, every backup is lost with it. If the key is replaced without the old one
kept, the older backups cannot be opened.

No source says whether the Strych key `/backup_key` can be replaced. Do not plan on it. It has a
copy in the private note, and that copy is what reaches the backups after the game server is lost.

## What an agent may read

Allowed (through the `mikrus` MCP, as in `SKILL.md`):

- a bounded tail of `/var/log/loop2-backup.log`, for example `tail -n 60`
- `stat -c '%U %g %a' /etc/loop2/backup-encryption-key` (expects `root 0 400`) and
  `stat -c '%U %g %a' /etc/loop2/strych-known-hosts` (expects `root 0 644`)
- `cmp` of the installed `/usr/local/bin/loop2-backup` and `/etc/cron.d/loop2-backup` with
  `deploy/loop2-backup` and `deploy/loop2-backup.cron` in `/srv/loop2`

Never: reading the content of the key, the known-hosts file or root's SSH configuration; running
the backup script or the command; making the hand run of the send; fetching or opening a backup;
listing Strych with the owner's key; installing, changing a key or the schedule.

## Restoring

A restore undoes everything after the backup: accounts, saves, blocks, password changes and
logouts made since are gone. A browser with the game open then has a save number higher than the
server's, so its save is refused and it loads the saved game state from the backup with the
sentence "Gra została zapisana w innej przeglądarce. Wczytano ten zapis." (D-209). A backup newer
than the running code's schema is refused until a commit that knows it is deployed. A restore is
not a rollback (D-15): code and data are separate paths.

### Trying a backup on the owner's computer

This proves a backup restores in the built image without touching the server. Run on the
owner's computer in PowerShell, with the Docker engine on and `age` installed (`winget`).

1. Make a temporary Strych key from the private note and fetch the weekday files with `scp -p`
   (keeps their times), using the login from the note and the host from the constants block of
   `deploy/loop2-backup`.
2. Take the newest file by time and write down its size in bytes: the capacity sum is
   7 x size, within 200 000 000, and the limit above is 25 MB.
3. Decrypt it with the key from the note, saved to a temporary file:
   `age --decrypt -i <key file> -o accounts.sqlite loop2-accounts-<day>.sqlite.age`.
4. Build the image from a clean checkout of the same commit: `docker build -t <image> .`
5. Read the test account's password without placing it in the shell history. Keep that
   password ASCII: the console code page may alter another character on its way to the launcher.
   This form needs no special console: the launcher drops a byte-order mark that a UTF-8 console
   puts before the piped text.

   ```powershell
   $secure = Read-Host -AsSecureString 'Test account password'
   $credential = New-Object System.Net.NetworkCredential('', $secure)
   $credential.Password | node scripts/restore-trial.mjs --image <image> --database .\accounts.sqlite --marker '<the marker name written down in the install step 8>' --email <test account address>
   ```
6. Read the result. Exit 0 is PASS; 1 the trial ran and judged the backup (FAIL), for example the
   test account could not log in; 2 refused,
   nothing was started (arguments, or a terminal as standard input); 3 could not run to a verdict;
   4 a container or volume could not be removed and is named; 130 interrupted. The launcher
   prints the Node.js release, the login status, the save's revision and whether the marker
   stands in the saved game state. A trial that stopped with exit 3 is not a PASS.
7. Write the capacity sum and the launcher's report into the request's record.
8. Remove the fetched files, the decrypted file and both temporary keys.

Not proven by this trial: building a new server, restoring over a live volume, backups of later
schema versions.

### Restoring over the server's database

Eight steps, all the human's. The procedure has never been tried.

The private directory of step 1 is `/root/loop2-restore`. It lies outside `/srv/loop2` on purpose:
the deployment of step 6 runs `git clean -ffdx` in `/srv/loop2` and would erase anything left
there. It is not `/tmp`, a shared directory. It holds the plain database (addresses and password
hashes), so step 7 removes it.

1. Choose the backup (the newest by time on Strych, or the one wanted). Make the directory:
   `mkdir -m 0700 /root/loop2-restore`, and bring the backup into it as root with the Strych
   login and key.
2. Decrypt it there: `age --decrypt -i /etc/loop2/backup-encryption-key -o accounts.sqlite <file>`.
   `head -c 15 accounts.sqlite` shows `SQLite format 3`.
3. Stop the application: from `/srv/loop2`, `docker compose -p loop2 stop app`.
4. Find the volume's directory with `docker volume inspect --format '{{ .Mountpoint }}' loop2_accounts`.
   Move all three files, `accounts.sqlite`, `accounts.sqlite-wal` and `accounts.sqlite-shm`
   (those that exist), together into `/root/loop2-restore/previous`. The recent writes lie in the
   two companions, so the one file is not the database; after a crash they were never merged.
   The volume is left with none of the three.
5. Install the decrypted file there as `accounts.sqlite` with owner uid 1000 and group 1000.
6. Start by deploying the commit that was running (`loop2-deploy <sha>`, `SSH_ORIGINAL_COMMAND`
   unset); take the sha from the running container's label (`SKILL.md`). If the backup is from a
   newer schema than that commit knows, deploy a commit that knows it instead; until then health
   fails with exit 8.
7. Check: the deployment ends with `deployed`, the public page loads, the test account logs in
   and its marker name is there. Only when the check passes, remove the whole directory:
   `rm -r /root/loop2-restore`, the same day. If the check fails, do not remove it; go the way
   back below.
8. Write down what was lost: everything after the backup's time.

The way back, when step 7 fails and the database from before the restore is wanted: stop `app`
(`docker compose -p loop2 stop app` from `/srv/loop2`), remove the restored `accounts.sqlite` and
any `-wal` and `-shm` beside it in the volume's directory, move the three files back from
`/root/loop2-restore/previous` (owner uid 1000, group 1000), and deploy the running commit
(`loop2-deploy <sha>`). Then remove `/root/loop2-restore`.

### With no server

This path has never been tried; this text is all there is. Every step is the human's, ten in all,
in this order:

1. Provision a new host ("Initial host provisioning" in `setup_and_secrets.md`), which includes
   the installed `loop2-deploy`.
2. Create `/etc/loop2` as in H2 of "H1-H5" in `setup_and_secrets.md` (deployment account as
   owner, numeric group 65532, mode 0750).
3. Put the session keys, the SMTP password and the tunnel token in place, each by its section of
   `setup_and_secrets.md`, from the owner's private note.
4. `apt install age`. Check that `rsync` exists (`rsync --version`; install it with `apt` if not)
   and that `pusher` exists (`command -v pusher`). Send a test message with
   `echo test | pusher test_kopii` and check that it arrives. On a host with no `pusher` the script's notice
   reaches no one: a failed night leaves only `notice: pusher exit 127` in the log. Then do not
   leave the schedule unwatched: read `/var/log/loop2-backup.log` every morning, or take the
   missing notice to the owner as a decision before step 10.
5. Write `/etc/loop2/backup-encryption-key` from the private note, root:root, mode 0400.
6. Write `/backup_key` from the private note, root:root, mode 0600 (`ssh` refuses a private key
   that others can read).
7. Fill root's SSH configuration entry and the known-hosts file (steps 5 and 6 of "Installing and
   reinstalling").
8. Deploy a commit that knows the backup's schema (`loop2-deploy <sha>`), so the volume exists.
9. Restore: steps 1 to 8 of "Restoring over the server's database".
10. Install the backup script and schedule again: steps 7 to 12 of "Installing and reinstalling".
