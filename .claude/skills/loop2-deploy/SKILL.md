---
name: loop2-deploy
description: How loop2's test-server deployment works - seeing which commit runs, reading the deploy log and its exit codes 2-8, rolling back, what an agent may read on the server versus what only the human changes, secrets, setup and failed deployments. Use for any question about deploying or the test server.
---

# loop2-deploy

Loop2 runs in a Docker Compose project with an application and a Cloudflare Tunnel connector.
The application keeps player accounts and sessions in a SQLite database in the named Docker
volume `loop2_accounts` and signs session cookies with keys read from a root-provisioned file
on the host.
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
| Account database volume / file in the container | `loop2_accounts` / `/app/data/accounts.sqlite` |

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
  `stat -c '%U %g %a' /etc/loop2/session-secrets` (expects `root 1000 440`).
- Allowed: the fixed internal application probe and bounded connector readiness command below;
  `timeout 8 curl -4 -v --connect-timeout 5 -o /dev/null telnet://region1.v2.argotunnel.com:7844`
  (also the same check for `region2.v2.argotunnel.com`). A **Connected** line is success evidence,
  often followed by timeout exit 124; it proves host TCP/IPv4 reachability only, not UDP or
  container connectivity. See `references/troubleshooting.md`.
- No token-file or session-key-file reads, no reading or copying of the account database or
  its volume (it holds e-mail addresses and password hashes), full `docker inspect`, Compose
  configuration dumps, arbitrary container execution, restarts, deployments, key changes or
  secret rotation. The MCP's changing tools
  (`upload`, `porty`, `domains`) are the human's too.

Every server or Cloudflare change is the human's, except deployment started by the existing
automation. The agent prepares the commands. Read `references/setup_and_secrets.md` for setup,
the five transition actions and rotations; read `references/troubleshooting.md` for failure,
script installation and rollback through the route change.

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
| 7 | build | app type check/build, connector preparation, or missing Compose file | untouched |
| 8 | switch, probe | either service fails health within 120 seconds or internal HTTP fails | may be partly running or broken |

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
  replacement keeps it. Never run volume pruning on the host: while no loop2 container
  references the volume, a prune removes the accounts.
- **Deploying a request and accepting it:** "Deploying a request head" in
  `references/setup_and_secrets.md`: deployment, persistence check, password measurement in the
  deployed image, public browser journey.

## Rollback

An ordinary rollback within the same route is one deployment: merge a revert request, or the
human runs `loop2-deploy <earlier sha>`. A fast rollback lasts until the next push to `main`;
a revert keeps the branch and server aligned. No earlier product image is retained for recovery.

**A rollback changes code, never data.** The accounts, sessions and session-key file stay as
they are; accounts made after the target commit are not undone and nothing is restored from
an earlier time. Rolling back to a commit without accounts leaves the volume and the key file
unused but intact; deploying forward again brings the accounts back. An application refuses a
database whose schema version is newer than it knows, so an old commit may fail health with
exit 8 on a newer database. Details and recovery: "Rollback and the accounts" in
`references/troubleshooting.md`.

**Crossing the tunnel transition also requires the matching installed script and Cloudflare
route.** Follow the complete procedure in `references/troubleshooting.md` before deploying or
merging a revert. It involves script installation, one deployment and four Cloudflare changes,
with an outage during the route switch.
