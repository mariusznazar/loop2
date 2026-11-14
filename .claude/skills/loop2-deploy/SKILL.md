---
name: loop2-deploy
description: How loop2's test-server deployment works - seeing which commit runs, reading the deploy log and its exit codes 2-8, database backups and restores, rolling back, blocking or unblocking a player account, what an agent may read on the server versus what only the human changes, secrets, setup, failed deployments, the log record and alerts. Use for any question about deploying or the test server.
---

# loop2-deploy

Loop2 runs in a Docker Compose project with an application and a Cloudflare Tunnel connector.
The application keeps player accounts, sessions and saved game states in a SQLite database in
the named Docker volume `loop2_accounts`, signs session cookies with keys read from a root-provisioned file
on the host and sends account mail through Outsider's SMTP server with a password read from
another root-provisioned file.
A push to `main` starts `.github/workflows/deploy.yml`, whose SSH call passes the commit to the
installed `/usr/local/bin/loop2-deploy`. Its source is `deploy/loop2-deploy`. The server fetches
the code, prepares both images before replacing either container, recreates both services,
waits for their health checks, then probes the application inside its container. Nothing is
shipped from GitHub to the server.

The public address is `https://loop2.mariusznazar.com/`. Cloudflare's remotely managed tunnel
forwards it to `http://app:3000` over the private Compose network. The application publishes no
host port. The connector uses HTTP/2 over IPv4, encrypted to Cloudflare, with metrics on its own
`127.0.0.1:2000`. Its image version and digest stand in `deploy/cloudflared.Dockerfile`.

| Resource | Value |
|---|---|
| Project / checkout | `loop2` / `/srv/loop2` |
| Application service / container / limit | `app` / `loop2` / 512 MiB |
| Tunnel service / container / limit | `cloudflared` / `loop2-cloudflared` / 256 MiB |
| Deploy log / lock | `/var/log/loop2-deploy.log` / `/run/loop2-deploy.lock` |
| Host token file / container secret | `/etc/loop2/cloudflared-token` / `/run/secrets/cloudflare_tunnel_token` |
| Host session-key file / container secret | `/etc/loop2/session-secrets` / `/run/secrets/loop2_session_secrets` |
| Host SMTP-password file / container secret | `/etc/loop2/smtp-password` / `/run/secrets/loop2_smtp_password` |
| Account database volume / file in the container | `loop2_accounts` / `/app/data/accounts.sqlite` |
| Backup script / schedule / log | `/usr/local/bin/loop2-backup` / `/etc/cron.d/loop2-backup` / `/var/log/loop2-backup.log` |
| Backup encryption key / Strych host-key file | `/etc/loop2/backup-encryption-key` / `/etc/loop2/strych-known-hosts` |
| Dump of the game's log / its rotation file | `/var/log/loop2-app.log` / `/etc/logrotate.d/loop2-app` (source `deploy/loop2-app.logrotate`) |
| Failure watcher script / schedule | `/usr/local/bin/loop2-watch` / `/etc/cron.d/loop2-watch` |
| Watcher log / state directory / lock | `/var/log/loop2-watch.log` / `/var/lib/loop2-watch/` / `/run/loop2-watch.lock` |
| Scheduled check of the public address | `.github/workflows/check-address.yml` (GitHub, not the server) |

The old game (`loop`) and `foundryvtt` share the host and stay untouched. Deployment never
prunes host-wide, runs `down`, or changes another Compose project. Replaced dangling images
with loop2's ownership label can be removed; upstream bases and shared build cache stay.

## Agent or human

The agent reads only, through the `mikrus` MCP: `servers` gives the server ID and `exec` runs
commands. Never copy the ID, server name, SSH port, user, address or any secret into repository
files or requests. The MCP has full rights, so the following limits are an agreement:

- Allowed: bounded `tail` of the deploy log; `docker ps`; `docker compose -p loop2 ps` and
  `logs --tail 100 app cloudflared` from `/srv/loop2`; container label, state and health fields;
  the individual memory-limit reads below; scoped `docker stats --no-stream loop2 loop2-cloudflared`;
  `free`, `df`, `docker system df`; `git -C /srv/loop2 log`,
  `git -C /srv/loop2 --no-optional-locks status`; `cat` of the deploy script and `cmp`;
  `docker volume ls --filter name=loop2_accounts`; the metadata of the session-key file only,
  `stat -c '%U %g %a' /etc/loop2/session-secrets` (expects `root 1000 440`), and likewise the
  metadata of the SMTP-password file only, `stat -c '%U %g %a' /etc/loop2/smtp-password`
  (expects `root 1000 440`); a bounded tail of the backup log `/var/log/loop2-backup.log`;
  the metadata of the two backup files only, `stat -c '%U %g %a'` of
  `/etc/loop2/backup-encryption-key` (expects `root 0 400`) and of `/etc/loop2/strych-known-hosts`
  (expects `root 0 644`); `cmp` of the installed backup script and schedule with their sources
  in `/srv/loop2/deploy`; the number of lines that set `KnownHostsCommand` or `VerifyHostKeyDNS`
  in root's SSH configuration and the system-wide one, by the one counting command in "What an
  agent may read" in `references/backup_and_restore.md` (expects `0`; the number only, never a
  line); the metadata of the installed deploy script only,
  `stat -c '%a %U:%G' /usr/local/bin/loop2-deploy` (expects `755 root:root`); and the number of
  lines of the account's own `~/.ssh/authorized_keys` that begin with the forced command
  `restrict,command="/usr/local/bin/loop2-deploy" `, `grep -c -e '^restrict,command="/usr/local/bin/loop2-deploy" ' ~/.ssh/authorized_keys`
  (expects `1`; the count only, never a line or a key).
- Allowed, for a reading in an environment fact only: `stat --version`, `bash --version`,
  `grep --version`, `docker --version`, `docker compose version` and `free --version`, each run alone, or piped through
  `head -1` to keep its first line, and each also allowed in the same call as the counting
  command of `references/backup_and_restore.md`; no other pipe or option. Each prints the tool's
  version, whose first line is what such a reading quotes; they expect no fixed value.
- Allowed, the log's rotation: `systemctl is-enabled logrotate.timer` (expects `enabled`) and
  `systemctl cat logrotate.timer` (the timer's unit file, which holds the line `OnCalendar=daily`;
  it shows that `logrotate` is scheduled every day, not that a run happened). The server has the
  entry of cron as well, `ls /etc/cron.daily/logrotate` (expects the path back). Also `ls -1 /var/log/loop2-app.log*`,
  which lists the names of the dump and its rotated copies only, never their content.
- Allowed, the failure record: a bounded `tail -n 200` or a `grep -F -m 50 -- '<fixed string>'` of
  `/var/log/loop2-app.log` and of its newest rotated file `/var/log/loop2-app.log.1`; `zgrep -F -m 50`
  of the older compressed ones (`/var/log/loop2-app.log.2.gz` to `.4.gz`); a bounded `tail -n 100` of
  `/var/log/loop2-watch.log`; `stat -c '%y' /var/lib/loop2-watch/state`, the age of the watcher's
  state file and never its content; `stat -c '%U %G %a' /var/log/loop2-app.log`;
  `docker inspect --type container --format '{{.HostConfig.LogConfig.Type}}' loop2` (expects
  `local`); `cmp` of the installed watcher script, its schedule and the logrotate file with their
  sources in `/srv/loop2/deploy`. Locally, `gh run list --workflow check-address.yml --limit 10`,
  `gh run list --workflow check-address.yml --event schedule --limit 20 --json createdAt,startedAt`
  (the times of the scheduled runs, JSON that expects no fixed value) and
  `gh workflow view check-address.yml`.
- Allowed: the fixed internal application probe and bounded connector readiness command below;
  `timeout 8 curl -4 -v --connect-timeout 5 -o /dev/null telnet://region1.v2.argotunnel.com:7844`
  (also the same check for `region2.v2.argotunnel.com`). A **Connected** line is success evidence,
  often followed by timeout exit 124; it proves host TCP/IPv4 reachability only, not UDP or
  container connectivity. See `references/troubleshooting.md`.
- No write to the dump file, its rotated copies, the watcher's files or the logrotate file; no
  reading of the watcher's state file; no running of the watcher; no `docker logs` of a replaced
  container (it is gone); no rotation by hand.
- No token-file, session-key-file or SMTP-password-file reads, no triggering of mail (below), no reading or copying of the account database or
  its volume (it holds e-mail addresses and password hashes), no reading of the backup
  encryption key or the known-hosts file, no reading of root's SSH configuration beyond that
  count, no running of the backup script or of the backup
  command, no hand run of the send, no fetching, opening or listing of backups on Strych, full `docker inspect`, Compose
  configuration dumps, arbitrary container execution, restarts, deployments, key changes or
  secret rotation. The MCP's changing tools
  (`upload`, `porty`, `domains`) are the human's too.

Every server or Cloudflare change is the human's, except deployment started by the existing
automation. The agent prepares the commands. Read `references/setup_and_secrets.md` for setup,
the five transition actions and rotations; read `references/troubleshooting.md` for failure,
script installation and rollback through the route change; read `references/backup_and_restore.md`
for the backups, their log, keys, installation, key change and restore. The human's steps for the
failure record and alerts are in "The failure record and alerts" in `references/setup_and_secrets.md`.

## Seeing deployments

- Actions shows stage lines and probes both public addresses after deployment. SSH errors may
  reveal resolved server access values, so do not publish raw Actions logs.
- The server log starts a run with `start: commit <sha>, path: ..., running commit: <sha>` and
  ends with `deployed <sha>, previously <sha>` or `stage <name>: ... (exit N)`. Git and Docker
  output stays in this log. Treat service logs as potentially sensitive; report selected,
  redacted diagnosis, not raw logs.
- After the build and before the containers are replaced the log gets one more line. On success
  it is `dump: the size of /var/log/loop2-app.log went from <N> to <M> bytes`, the bytes appended
  from the log of both services, which the replacement removes. On failure it is a line with
  `warning: the dump of the log of both loop2 services ... failed (exit <N>; ...)`; the
  deployment goes on, and the log of the containers it replaces is not kept. A run that ends at
  exit 2 to 7 has no `dump:` line, because it stopped before the dump and replaced nothing. Look
  for the `warning:` line after any deployment that follows a report of a failure (see "The
  failure record and alerts").
- The running application commit comes from its label, not the checkout or connector image.
  Run this in bash on the server (it is what `mikrus` `exec` gives); it is not for Windows
  PowerShell 5.1, which drops the nested double quotes before Docker sees them:
  `docker inspect --type container --format '{{ index .Config.Labels "org.opencontainers.image.revision" }}' loop2`
- State and health: `docker inspect --type container --format '{{.State.Status}} {{if .State.Health}}{{.State.Health.Status}}{{end}}' loop2-cloudflared`;
  use the same scoped read for `loop2`. Connector health means an active edge connection,
  not a verified public hostname route.
- Requested limits: `docker inspect --type container --format '{{.HostConfig.Memory}}' loop2`
  expects 536870912; the same command for `loop2-cloudflared` expects 268435456. The limit
  column of `docker stats --no-stream loop2 loop2-cloudflared` shows the enforced limit.
- Connector readiness: `timeout 5 docker exec loop2-cloudflared cloudflared tunnel --metrics 127.0.0.1:2000 ready`.
- Internal application probe (fixed read-only Node client, bounded independently of Docker):

```sh
timeout 15 docker exec loop2 node -e 'Promise.all(["/", "/api/loop2-deploy-probe"].map(async path => { const r = await fetch("http://127.0.0.1:3000" + path, { redirect: "manual", signal: AbortSignal.timeout(10000) }); return r.status + " " + (r.headers.get("content-type") || ""); })).then(rows => { console.log(rows.join("\n")); process.exit(0); }, () => process.exit(1));'
```

Expected lines: root `200` and API `404 application/json` (charset may follow). This proves
internal HTTP only; the human checks the public page/API and outside-host IPv6 port separately.

## Log stages and exit codes

| Exit | Stage | Meaning | Running services |
|---|---|---|---|
| 0 | — | both healthy; internal HTTP passed | new commit |
| 2 | input | not one lowercase 40-hex commit or ambiguous input paths | untouched |
| 3 | commit | absent, on no accepted branch, or automation commit outside `main` | untouched |
| 4 | lock | cannot open lock or it is held for 900 seconds | untouched |
| 5 | resources | less than 1024 MiB available memory, 4 GiB free Docker disk, or unreadable | untouched |
| 6 | fetch, checkout | Git fetch, checkout or clean failed | untouched |
| 7 | build | app type check/build, the image's Node.js release check of the database (read, write, backup), connector preparation, or missing Compose file | untouched |
| 8 | switch, probe | either service fails health within 120 seconds or internal HTTP fails | may be partly running or broken |

The release check runs in the image build: a Node.js release that fails it ends the deployment
at exit 7, and the log's build output names the release and the failure (see
`references/troubleshooting.md`).

After exit 8 the log gives the previous application commit and restoration guidance. The
switch is not atomic. Failed health waits put the last 50 lines of both service logs in the
server log, not Actions; after a probe failure read bounded service logs. Resource readings,
the old game's state and installed-script mismatches are also logged.

## Accounts, session keys and the database

- **Session keys:** the file `/etc/loop2/session-secrets` holds a JSON array of keys, newest
  first, owner root, group 1000, mode 0440, outside the checkout. Compose mounts it read-only
  only into `app`. The human creates it before the first deployment of an accounts commit and
  rotates it; a copy stays in the owner's private note. Sequences: "Session signing keys" in
  `references/setup_and_secrets.md`. A missing or invalid file stops the application before it
  listens: the deployment ends with exit 8.
- **Database:** the volume `loop2_accounts` is created by the deployment itself and mounted
  only into `app` at `/app/data`; nothing is prepared on the host by hand. Container
  replacement keeps it. The database holds the accounts, the sessions and the players' saved game
  states. Never run volume pruning on the host: while no loop2 container references the
  volume, `docker volume prune --all` removes the accounts and every saved game state with
  them (the commands that remove it: "The account database" in `references/setup_and_secrets.md`).
- **Deploying a request and accepting it:** "Deploying a request head" in
  `references/setup_and_secrets.md`: deployment, persistence check (accounts, sessions and, after redeploying the same commit
  (S2), a saved game state), password measurement in the deployed image, public browser
  journey.

## Database backups

Every night at 03:17 (server clock) the installed `loop2-backup` makes a consistent backup of the
database, encrypts it with `age` and sends it to Mikrus Strych, which keeps seven files, one per
weekday, each replaced a week later. A failed night calls `pusher` with the subject
`kopia_bazy_loop2_nieudana`, which `pusher` turns into spaces in the mail's subject. A cron that did not start writes nothing; the watcher reports a night without a successful send after 26 hours, see "The failure record and alerts". Where backups, keys and
the log lie, how to read the log, install, change the encryption key and restore:
`references/backup_and_restore.md`.

- **Only the human** installs the script and schedule, runs the backup, changes a key, makes the
  hand run of the send, restores. An agent never runs the backup command: its fixed word sends
  every address and password hash to standard output.
- **Unknown:** no source says whether the Strych key can be replaced.
- A restore is a separate path, not a rollback (D-15), and undoes everything after the backup.

## Account mail

The application sends both account messages, the address-confirmation message and the
password-reset message, through Outsider's SMTP server on port
587, from `loop2@mariusznazar.com`, over TLS only. The sender address, the server, the port
and the login are plain values of the `app` service in `compose.yaml`; the password is not an
environment value: it lies in `/etc/loop2/smtp-password` (owner root, group 1000, mode 0440,
outside the checkout, one line of UTF-8 without a trailing newline), which Compose mounts
read-only into `app` alone as `/run/secrets/loop2_smtp_password`. A copy stays in the owner's
private note. The agent reads the file's metadata only and never its content.

- **Rotation is the human's:** replace the file and the private copy, then recreate the
  application container by deploying the running commit. Sequence: "The SMTP password" in
  `references/setup_and_secrets.md`.
- **What the human set up outside the repository** (M1, M2): in Outsider's panel the domain
  `mariusznazar.com`, the mailbox `loop2@mariusznazar.com` and DKIM; in the domain's DNS at
  Cloudflare an MX record to Outsider, an SPF TXT record, the DKIM TXT record at selector `x`,
  and a DMARC TXT record whose reports go to the sender mailbox. The records of the website
  itself were not touched.
- **Never by an agent:** an agent never reads or changes the password or its file, and never
  sends mail through Outsider: it does not log in to the SMTP server and does not create an
  account or press "Wyślij ponownie" or "Wyślij odnośnik" on the test server, since each of these sends a real
  message from a monthly allowance of 1000.
- **What an agent may read:** the mailer's failure line in the bounded service logs, one JSON
  object with `"failure":"mail"`, the error's `kind` and `code`, the `place` in the code and the
  account's number (never an address, link or password). Read `code` like this:
  - `EAUTH`: Outsider refused the login or the password.
  - `ECONNECTION`, `ETIMEDOUT`, `ESOCKET`, `EDNS`, `ETLS`, `EREQUIRETLS`: a connection, name
    lookup or TLS failure towards Outsider on port 587.
  - `EENVELOPE`, `EMESSAGE`: Outsider accepted the login but refused the sender, the recipient
    or the message, for example because the monthly allowance is used up; the human checks
    Outsider's panel.
  - `DEADLINE`: the send ran out of its 10 seconds; with the `place`
    `account-routes.boundedSending` it is the same limit seen from the route.
  - `CONNECTION_ENDED`, `NOT_ENCRYPTED`: the connection ended, or was not upgraded to TLS.
  - `UNSAFE_RECIPIENT`: the mailer refused the address before connecting.
  - `none`: the error has no code; report its `kind`.
  - Any other code (for example `EPROTOCOL`): report it as it is.

  In every case the agent reports the code; the human changes the login in `compose.yaml` or
  the password file, or looks in Outsider's panel.
- **Startup:** the five mail settings are required with the other account settings; a missing
  or invalid setting, or a missing or invalid password file, stops the application before it
  listens (exit 8). A password file that is missing at `compose up` fails there instead.
  The merge of the change deploys it, so the file must exist on the server before the merge.
- **The first delivery (M4):** the human deploys the branch commit, creates an account with an
  address on an external mailbox, receives the message and opens its link. That deployment
  also moves the database to schema version 3 (see Rollback). The first deployment of the commit
  with saved game states moves it on to version 4.

## The failure record and alerts

**Where the game's log lies.**

- **The running containers.** Both services run under Docker's `local` log driver with its
  default rotation, which bounds each container's log at about 100 MB. Read it with
  `docker compose -p loop2 logs --tail 100 app cloudflared` from `/srv/loop2`. Docker removes a
  container's log with the container and every deployment recreates both, so this part lives
  until the next deployment.
- **The dump `/var/log/loop2-app.log`.** Just before the replacement, `loop2-deploy` appends a
  header line, `<UTC time> loop2-deploy | previous commit <sha>, new commit <sha>`, and then the
  whole log of both services as Compose prints it, with Docker's timestamps. The lines under a
  header are those of the containers of its previous commit. Find the generations with
  `grep -n -F -m 20 -- 'loop2-deploy |' /var/log/loop2-app.log`.
- **The `account-block` lines**, which the human appends to the same file with the command in
  "Blocking a player account". Nothing else reaches it.

**How long each lives.** A running container's log: until the next deployment, and not above
about 100 MB. The dump: `logrotate` rotates it weekly, or sooner when it passes 100 MiB, and
keeps four rotated files (the newest, `.1`, in plain text; `.2.gz` to `.4.gz` compressed), so a
line lives about four weeks, shorter when the size forces a rotation. It survives deployments, a
host restart and a rollback to an older commit, as long as the installed deploy script is the one
that has the dump. It misses a container removed any other way than by that script, and the few
seconds between the copy and the stop of the old container.

**How an agent reads it.** Bounded, and by a fixed string: for a failure from before the last
deployment, `grep -F -m 50 -- '"failure":"' /var/log/loop2-app.log /var/log/loop2-app.log.1`
(`-m` limits each file), then `zgrep -F -m 50` on the older ones. A line of the game begins with
its JSON object after the service's name and Docker's time. The file holds the game's lines for
those weeks, with `accountId` values, and the human's `account-block` lines: it is the retention
of that data (D-252), and its lines are reported selected and redacted like other service logs.

**The three ways the owner learns the game failed.**

1. **The watcher** (`loop2-watch`, root, cron every five minutes). It reads state and health of
   both containers and the fresh failure lines of the game container's log, skips a run while a
   deployment or the backup holds the deploy lock, and calls `pusher` with a fixed subject and
   one fixed Polish sentence per kind, which name the kind and send the reader here. It never
   puts a number, a commit, an account or any output into a message, because `pusher` may travel
   unencrypted.

   | Mail subject | Kind | An agent reads |
   |---|---|---|
   | `loop2_gra_nie_dziala` | a container is missing, not running or restarting, or Docker cannot be read | state and health under "Seeing deployments", the deploy log |
   | `loop2_usluga_niezdrowa` | a health check reads `unhealthy` | the same, then bounded service logs |
   | `loop2_ponowny_start` | a container has the same id and a new start time | bounded service logs of that container |
   | `loop2_awarie_serwera` | failure lines of the server in the log of `loop2` | `grep -F -m 50 -- '"failure":"'` in the service logs, then the dump |
   | `loop2_brak_kopii_bazy` | the log of the nightly backup holds no successful send from the last 26 hours | the last `end: sent` line of the bounded tail of `/var/log/loop2-backup.log` and the stage lines after it, as in "The log" of `references/backup_and_restore.md`; a schedule that did not start shows as a night with no line, see "Database backups" above |
   | `loop2_awarie_przegladarek` | failure lines the browsers reported (`"failure":"browser"`) | `grep -F -m 50 -- '"failure":"browser"'` in the same places |

   At most one message per kind in six hours, the backup kind at most once in 24 hours, and six in all
   in 24 hours; a held message is
   only counted in the watcher's log, and a `pusher` call that fails still counts as sent. A
   container that was replaced (a deployment, a human's `up`) is recorded silently and raises no
   `restarted`. The browser kind comes last in the order and goes once in six hours at most, so a
   flood of browser reports takes at most four of the day's six messages and leaves at least two
   for the server kinds.
2. **The scheduled check of the public address** (`.github/workflows/check-address.yml`). Every
   five minutes, at minutes that are not the top of the hour, GitHub Actions opens the public
   address, up to six attempts 20 seconds apart, and the run fails unless one answers 200.
   GitHub then notifies the owner of the failed run. It sees what the watcher cannot: a server
   that is off, a fallen tunnel, a Cloudflare fault.
3. **The browser's report.** The page's last-resort handling, besides its line in the console,
   sends the kind, code and place of an error no code handled to `POST /api/browser-failure`,
   once per distinct line per page load. The server accepts at most 30 reports an hour for the
   whole server, writes each as a failure line with `"failure":"browser"` (with the `accountId`
   of the session when there is one, never from the request), and writes one `LIMITED` line at the
   first refusal of an hour. The watcher counts these lines as the browser kind. A browser error
   that happens while the server or the network is down reaches nobody.

**Accepted gaps of the watcher.** Failure lines written between its last run and a deployment that
removes the container are only in the dump and are not reported: after a deployment that follows a
report, read the dump. It does not watch itself and does not read the dump. If cron does not start
it, nothing is sent; its state file is rewritten at every quiet run, so a state file older than
about ten minutes shows it has not run (a deployment or the backup holding the lock leaves the
state alone for that run). Its log, `/var/log/loop2-watch.log`, has a line only for a run that
skipped, found something, sent or held a message, or ended abnormally (`skipped:`, `run: due=...`,
`dropped:`, `stage ...`, `end: failed (exit N)`); a quiet healthy run writes none. A second,
different outage of the same kind within six hours is not announced by it, and the scheduled check
still sees an unreachable game. The backup kind is heard only about a day late: a schedule of the
backup that did not start is reported when the last successful send is 26 hours old, and that kind
goes at most once in 24 hours. The watcher reads only the line `end: sent` of the backup log, so the
wording of that line is not changed without the watcher. On a server without a working `flock`, the
watcher ends with success and writes a line `skipped: flock could not take ...` to its own log, reads
nothing, and no message of any kind comes. The backup kind works only once a human reinstalls
`loop2-watch` from the merge commit, as "Installing a script from an exact commit" in
`references/setup_and_secrets.md` gives; until then the installed watcher does not know the kind.

**The four limits of the scheduled check.** Alone it fails in four ways. (1) When the server and
GitHub are both down, nothing is sent. (2) GitHub disables a scheduled workflow after 60 days
with no activity in the repository, which is public; then the check stops silently. (3) GitHub
sends the failure notice of a scheduled run to the user who last changed the cron line, so
notifications set off, or set on another account, give a silence taken for "it works". (4) A real
outage brings two messages, one from the watcher and one from GitHub, and during a longer one a
GitHub mail every five minutes.

**What no test proves.** Docker's log driver and its `inspect` fields, the `--since` and
`--until` windowing of `docker logs` that the watcher uses, `logrotate`, delivery by `pusher`,
cron and the GitHub e-mail are proved only by the human's steps in "The failure record and
alerts" in `references/setup_and_secrets.md`; the windowing has no cheap check and stays
unchecked until the first real failure line is counted.

## Blocking a player account

The owner blocks a player account, and unblocks it, with one command run in the application
container from a shell on the server. Only the human runs it; an agent never does (D-12). The
address is the account's email address, as the player logs in with it; letter case and
surrounding spaces do not matter.

```sh
docker exec loop2 node dist/server/account-block.js block <email>
docker exec loop2 node dist/server/account-block.js unblock <email>
```

These plain commands are allowed and leave the event out of the failure record, since the
command runs by `docker exec` and its lines reach only the terminal. To keep the event in
`/var/log/loop2-app.log`, the human runs this instead (`block` shown, `unblock` the same), in
bash, as the account that owns the dump file or as root. The address goes between the single
quotes of `email=` (a single quote inside it is written `'\''`):

```sh
email='<email>'
case $email in
  *$'\n'* | *$'\r'*)
    echo "refused: the address holds a line feed or a carriage return; nothing was run" >&2 ;;
  *)
    out=$(docker exec loop2 node dist/server/account-block.js block "$email" 2>&1); status=$?
    printf '%s\n' "$out"
    printf '%s\n' "$out" | while IFS= read -r line; do
      case $line in
        '{"event":"account-'*'}' | '{"failure":"account-block"'*'}')
          printf '%s account-block | %s\n' "$(date -u '+%Y-%m-%dT%H:%M:%SZ')" "$line" ;;
      esac
    done >> /var/log/loop2-app.log
    echo "exit $status" ;;
esac
```

An address that holds a line feed or a carriage return is refused with that message: the command
does not run and nothing reaches the file. Otherwise the terminal shows what the plain command
shows, then `exit` and the status. The file gets only
the lines that begin with one of the two exact starts of the command's JSON lines and end with
`}`, each with a UTC time and the tag `account-block` in front, in the shape of the file's other
lines. The command's sentences carry the email address and never reach the file; a line that
begins with a bare `{` does not pass either, because a registered address can begin with `{`. A
crash line of the command (`"failure":"uncaught"`) is not appended. The server accepts any text
around exactly one `@`, so a registered address can hold a line break, and the check above
refuses it before the command runs. Residual risk: an address that reaches the command another
way, such as a command typed without the check or the address put into a different variable
than `email`, is not checked, and the filter alone lets one whole line of the output that looks
like a JSON line of the command pass into the file with the words the address carries.

- **`block`** marks the account blocked and ends its sessions in every browser in the same
  step. A blocked player who reloads the page sees the login card again; a login with the right
  password shows `To konto jest zablokowane.`, and a wrong password still shows
  `Nieprawidłowy adres e-mail lub hasło.`. A game already open in a browser plays on until the
  page is reloaded or the player logs out.
- **`unblock`** lets the account log in again. The sessions the block ended stay ended, so the
  player logs in anew. The emailed links the block stopped, of the address confirmation and of
  the password reset, stay stopped too (D-137, D-160): the player who opens one sees that it is
  invalid or expired and asks for a new one; for the confirmation, signed in again, with „Wyślij
  ponownie”.
- **What it prints.** One line, after a change also a JSON line of the event with the account's
  number, and at exit 1 also a JSON line of the error's kind and code. Wrong arguments (no action or
  one other than `block` and `unblock`, no address, a further word) print the usage line, `Usage: node dist/server/account-block.js block|unblock <email address>`,
  and under it `Nothing changed.`. Exit 0 means the account
  is now in the state asked for: blocked,
  already blocked, unblocked, or was not blocked. Every other exit changed nothing: 1 the
  database could not be opened or changed, for example because it stayed busy longer than the
  wait (run the command again); 2 wrong arguments, or an address without a single `@` with text
  on both sides; 3 `LOOP2_DATABASE_PATH` names no existing database file (the command never
  creates one); 4 no account has that address.
- **What it touches.** It opens the account database beside the running application, makes one
  short change and closes it; the application keeps serving. It prints no password hash or
  session identifier, and of a database error only its kind and code. The address stays in the
  server's shell history.
- **What it does not do.** The account stays in the database, so its address cannot be
  registered again; the person can still register with another address. A login of the
  blocked account does not count towards the limit of failed logins.

## Rollback

An ordinary rollback within the same route is one deployment: merge a revert request, or the
human runs `loop2-deploy <earlier sha>`. A fast rollback lasts until the next push to `main`;
a revert keeps the branch and server aligned. No earlier product image is retained for recovery.

**A rollback and the failure record.** A commit from before the `local` log driver in
`compose.yaml` recreates both containers on the host's default driver, which does not rotate: the
log of a running container is then not bounded. The dump is made by the installed deploy script,
not by the commit; the installed script is the one with the dump only if the human reinstalled it,
and a rollback to an older commit does not change that. The dump reads the `compose.yaml` of the
commit being deployed: a commit whose Compose file has no `app` or no `cloudflared` service
(see "Rollback across the tunnel transition" in `references/troubleshooting.md`) makes
`docker compose logs` fail, the script warns, and the log of the running containers is not
kept. A commit from before the watcher, the
logrotate file or the browser route makes the deployment warn about the installed copies that
differ (expected), and the page's reports meet the JSON 404 and are lost.

**A rollback changes code, never data.** The accounts, sessions and session-key file stay as
they are, and so are the saved game states the same database holds; accounts and saved game
states made after the target commit are not undone and nothing is restored from an earlier time. Rolling back to a commit without accounts leaves the volume and the key file
unused but intact; deploying forward again brings the accounts back. An application refuses a
database whose schema version is newer than it knows, so an old commit may fail health with
exit 8 on a newer database. The first deployment of a commit with account blocking moves the
database to schema version 2, so from then on a rollback to a commit from before account
blocking fails health with exit 8. The first deployment of the commit with address
confirmation, including the human's trial deployment of its branch (M4) before the merge,
moves the database to schema version 3: an earlier commit, `main` included, then refuses it
and fails health with exit 8, and only the human repairs the database.

**The first deployment of the commit with saved game states, including the human's deployment
of its branch (S1) before the merge, moves the database to schema version 4,** which adds the
table of saved game states. From then on a commit that knows only version 3 or older, `main`
before this change included, refuses the database and fails health with exit 8: a rollback to it
cannot start, and only the human repairs the database. Until the branch is merged, a merge of
anything else to `main` deploys that older code and takes the test server down. Details and recovery: "Rollback and the accounts" in
`references/troubleshooting.md`.

**Crossing the tunnel transition also requires the matching installed script and Cloudflare
route.** Follow the complete procedure in `references/troubleshooting.md` before deploying or
merging a revert. It involves script installation, one deployment and four Cloudflare changes,
with an outage during the route switch.
