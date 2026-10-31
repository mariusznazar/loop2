---
name: loop2-deploy
description: How loop2's test-server deployment works - seeing which commit runs, reading the deploy log and its exit codes 2-8, database backups and restores, rolling back, blocking or unblocking a player account, what an agent may read on the server versus what only the human changes, secrets, setup and failed deployments. Use for any question about deploying or the test server.
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
  in `/srv/loop2/deploy`.
- Allowed: the fixed internal application probe and bounded connector readiness command below;
  `timeout 8 curl -4 -v --connect-timeout 5 -o /dev/null telnet://region1.v2.argotunnel.com:7844`
  (also the same check for `region2.v2.argotunnel.com`). A **Connected** line is success evidence,
  often followed by timeout exit 124; it proves host TCP/IPv4 reachability only, not UDP or
  container connectivity. See `references/troubleshooting.md`.
- No token-file, session-key-file or SMTP-password-file reads, no triggering of mail (below), no reading or copying of the account database or
  its volume (it holds e-mail addresses and password hashes), no reading of the backup
  encryption key or the known-hosts file, no running of the backup script or of the backup
  command, no hand run of the send, no fetching, opening or listing of backups on Strych, full `docker inspect`, Compose
  configuration dumps, arbitrary container execution, restarts, deployments, key changes or
  secret rotation. The MCP's changing tools
  (`upload`, `porty`, `domains`) are the human's too.

Every server or Cloudflare change is the human's, except deployment started by the existing
automation. The agent prepares the commands. Read `references/setup_and_secrets.md` for setup,
the five transition actions and rotations; read `references/troubleshooting.md` for failure,
script installation and rollback through the route change; read `references/backup_and_restore.md`
for the backups, their log, keys, installation, key change and restore.

## Seeing deployments

- Actions shows stage lines and probes both public addresses after deployment. SSH errors may
  reveal resolved server access values, so do not publish raw Actions logs.
- The server log starts a run with `start: commit <sha>, path: ..., running commit: <sha>` and
  ends with `deployed <sha>, previously <sha>` or `stage <name>: ... (exit N)`. Git and Docker
  output stays in this log. Treat service logs as potentially sensitive; report selected,
  redacted diagnosis, not raw logs.
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
  volume, a prune removes the accounts and every saved game state with them.
- **Deploying a request and accepting it:** "Deploying a request head" in
  `references/setup_and_secrets.md`: deployment, persistence check (accounts, sessions and, after redeploying the same commit
  (H2), a saved game state), password measurement in the deployed image, public browser
  journey.

## Database backups

Every night at 03:17 (server clock) the installed `loop2-backup` makes a consistent backup of the
database, encrypts it with `age` and sends it to Mikrus Strych, which keeps seven files, one per
weekday, each replaced a week later. A failed night calls `pusher` with the subject
`kopia bazy loop2 nieudana`. A cron that did not start writes nothing. Where backups, keys and
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
- **What the human set up outside the repository** (H1, H2): in Outsider's panel the domain
  `mariusznazar.com`, the mailbox `loop2@mariusznazar.com` and DKIM; in the domain's DNS at
  Cloudflare an MX record to Outsider, an SPF TXT record, the DKIM TXT record at selector `x`,
  and a DMARC TXT record whose reports go to the sender mailbox. The records of the website
  itself were not touched.
- **Never by an agent:** an agent never reads or changes the password or its file, and never
  sends mail through Outsider: it does not log in to the SMTP server and does not create an
  account or press "Wyślij ponownie" or "Wyślij odnośnik" on the test server, since each of these sends a real
  message from a monthly allowance of 1000.
- **What an agent may read:** the mailer's failure line in the bounded service logs,
  `Account mail failed: <code>`, with the error code only (never an address, link or
  password). Read the code like this:
  - `EAUTH`: Outsider refused the login or the password.
  - `ECONNECTION`, `ETIMEDOUT`, `ESOCKET`, `EDNS`, `ETLS`, `EREQUIRETLS`: a connection, name
    lookup or TLS failure towards Outsider on port 587.
  - `EENVELOPE`, `EMESSAGE`: Outsider accepted the login but refused the sender, the recipient
    or the message, for example because the monthly allowance is used up; the human checks
    Outsider's panel.
  - `unknown`: the library gave no code: the send ran out of its 10 seconds, the connection
    ended or was not upgraded to TLS, or the mailer refused the address before connecting.
    The line `Account mail missed its deadline` is the same 10-second limit seen from the
    route.
  - Any other code (for example `EPROTOCOL`): report it as it is.

  In every case the agent reports the code; the human changes the login in `compose.yaml` or
  the password file, or looks in Outsider's panel.
- **Startup:** the five mail settings are required with the other account settings; a missing
  or invalid setting, or a missing or invalid password file, stops the application before it
  listens (exit 8). A password file that is missing at `compose up` fails there instead.
  The merge of the change deploys it, so the file must exist on the server before the merge.
- **The first delivery (H4):** the human deploys the branch commit, creates an account with an
  address on an external mailbox, receives the message and opens its link. That deployment
  also moves the database to schema version 3 (see Rollback). The first deployment of the commit
  with saved game states moves it on to version 4.

## Blocking a player account

The owner blocks a player account, and unblocks it, with one command run in the application
container from a shell on the server. Only the human runs it; an agent never does (D-12). The
address is the account's email address, as the player logs in with it; letter case and
surrounding spaces do not matter.

```sh
docker exec loop2 node dist/server/account-block.js block <email>
docker exec loop2 node dist/server/account-block.js unblock <email>
```

- **`block`** marks the account blocked and ends its sessions in every browser in the same
  step. A blocked player who reloads the page sees the forms again; a login with the right
  password shows `To konto jest zablokowane.`, and a wrong password still shows
  `Nieprawidłowy adres e-mail lub hasło.`. A game already open in a browser plays on until the
  page is reloaded or the player logs out.
- **`unblock`** lets the account log in again. The sessions the block ended stay ended, so the
  player logs in anew.
- **What it prints.** One line. Exit 0 means the account is now in the state asked for: blocked,
  already blocked, unblocked, or was not blocked. Every other exit changed nothing: 1 the
  database could not be opened or changed, for example because it stayed busy longer than the
  wait (run the command again); 2 wrong arguments, or an address without a single `@` with text
  on both sides; 3 `LOOP2_DATABASE_PATH` names no existing database file (the command never
  creates one); 4 no account has that address.
- **What it touches.** It opens the account database beside the running application, makes one
  short change and closes it; the application keeps serving. It prints no password hash,
  session identifier or database error. The address stays in the server's shell history.
- **What it does not do.** The account stays in the database, so its address cannot be
  registered again; the person can still register with another address. A login of the
  blocked account does not count towards the limit of failed logins.

## Rollback

An ordinary rollback within the same route is one deployment: merge a revert request, or the
human runs `loop2-deploy <earlier sha>`. A fast rollback lasts until the next push to `main`;
a revert keeps the branch and server aligned. No earlier product image is retained for recovery.

**A rollback changes code, never data.** The accounts, sessions and session-key file stay as
they are, and so are the saved game states the same database holds; accounts and saved game
states made after the target commit are not undone and nothing is restored from an earlier time. Rolling back to a commit without accounts leaves the volume and the key file
unused but intact; deploying forward again brings the accounts back. An application refuses a
database whose schema version is newer than it knows, so an old commit may fail health with
exit 8 on a newer database. The first deployment of a commit with account blocking moves the
database to schema version 2, so from then on a rollback to a commit from before account
blocking fails health with exit 8. The first deployment of the commit with address
confirmation, including the human's trial deployment of its branch (H4) before the merge,
moves the database to schema version 3: an earlier commit, `main` included, then refuses it
and fails health with exit 8, and only the human repairs the database.

**The first deployment of the commit with saved game states, including the human's deployment
of its branch (H1) before the merge, moves the database to schema version 4,** which adds the
table of saved game states. From then on a commit that knows only version 3 or older, `main`
before this change included, refuses the database and fails health with exit 8: a rollback to it
cannot start, and only the human repairs the database. Until the branch is merged, a merge of
anything else to `main` deploys that older code and takes the test server down. Details and recovery: "Rollback and the accounts" in
`references/troubleshooting.md`.

**Crossing the tunnel transition also requires the matching installed script and Cloudflare
route.** Follow the complete procedure in `references/troubleshooting.md` before deploying or
merging a revert. It involves script installation, one deployment and four Cloudflare changes,
with an outage during the route switch.
