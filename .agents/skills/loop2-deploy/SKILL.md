---
name: loop2-deploy
description: How loop2's test-server deployment works - seeing which commit runs, reading the deploy log and its exit codes 2-8, rolling back, what an agent may read on the server versus what only the human changes, secrets, setup and failed deployments. Use for any question about deploying or the test server.
---

# loop2-deploy

loop2 runs as one Docker container on a shared test server. A push to `main` starts the GitHub
Actions workflow `.github/workflows/deploy.yml`; it makes one SSH call that hands the commit name to
the server script `deploy/loop2-deploy` (installed at `/usr/local/bin/loop2-deploy`). The script
fetches that commit, builds the image, starts the container and probes it. Nothing is shipped from
GitHub to the server; the server pulls the code itself with a read-only deploy key.

Fixed facts, all in `compose.yaml` and the script: Compose project `loop2`, service `app`, container
`loop2`, checkout `/srv/loop2`, host port 18080 (container port 3000), memory limit 512 MiB, log
`/var/log/loop2-deploy.log`. The public address is `https://loop2.mariusznazar.com/` (Cloudflare
proxies it and an Origin Rule sends it to port 18080). An older game, container `loop`, shares the
server and must stay untouched: the deployment never prunes host-wide, never runs `down` and never
touches another Compose project.

## Agent or human

- **The agent reads only.** It reaches the server through the `mikrus` MCP: its `servers` tool gives
  the server id (never write that id, the server name, ports or addresses into the repository), its
  `exec` tool runs commands. The MCP runs commands as root, so "read only" is an agreement this
  skill states, not a technical limit. Allowed: `tail` of the deploy log, `docker ps`,
  `docker compose -p loop2 ps` and `logs`, `docker inspect` of labels and state, `free`, `df`,
  `git -C /srv/loop2 log` and `git -C /srv/loop2 --no-optional-locks status` (a plain `status` can
  rewrite the index), `cat` of the script, `cmp`.
- The MCP's changing tools (`upload`, `porty`, `domains`, and any `exec` command that changes state)
  are the human's too.
- **Every change is the human's:** installing or reinstalling the script, keys, `authorized_keys`,
  GitHub secrets, Cloudflare rules, running a deployment or rollback on the server, reclaiming Docker
  build cache. The agent prepares the exact command and asks the human to run it.
- Setup and secrets: `references/setup_and_secrets.md`. A failed deployment, the resource gate, the
  installed-script warning, Cloudflare 521/522: `references/troubleshooting.md`.

## Seeing deployments

- **The Actions run** of "Deploy loop2" for the commit: the first step prints the script's output
  (stage lines), the second probes the public addresses of loop2 and of the old game. ssh's own
  fatal errors (a refused connection, a host-key mismatch) may print the resolved address of the
  server into this log, so treat the Actions log as not safe to share publicly.
- **The deploy log** `/var/log/loop2-deploy.log`: every line has a UTC time and `loop2-deploy:`. A
  run starts with `start: commit <sha>, path: ..., running commit: <sha>` and ends with
  `deployed <sha>, previously <sha>` or a `stage <name>: ... (exit N)` line. Docker's and git's own
  output goes only to this file, never to the Actions log.
- **The running commit** is the container's revision label, not the checkout (the checkout may stand
  at a commit whose build failed):
  `docker inspect --format '{{ index .Config.Labels "org.opencontainers.image.revision" }}' loop2`
- **State:** `docker compose -p loop2 ps`; application logs `docker compose -p loop2 logs --tail 100 app`.
- **The applied memory limit:** `docker inspect --type container loop2` and read `HostConfig.Memory`
  (512 MiB is 536870912).

## Log stages and exit codes

| Exit | Stage | Meaning | Running loop2 |
|---|---|---|---|
| 0 | - | deployed | new commit |
| 2 | input | not exactly one commit name of 40 lowercase hex characters, or both an SSH command and an argument | untouched |
| 3 | commit | the commit is not fetched, or (automation key) not on `main`, or (human run) on no branch of GitHub | untouched |
| 4 | lock | `/run/loop2-deploy.lock` cannot be opened, or another deployment held it for 900 s | untouched |
| 5 | resources | less than 1024 MiB `MemAvailable`, less than 4 GiB free for Docker, or a value unreadable | untouched |
| 6 | fetch, checkout | git fetch, checkout or clean failed (deploy key, GitHub reachability) | untouched |
| 7 | build | type check or image build failed (also: the commit has no `compose.yaml`) | untouched |
| 8 | switch, probe | the container was not healthy within 120 s, or the local probe on `127.0.0.1:18080` failed | down or broken |

After exit 8 the log holds a `previously running commit` line with the exact restore command. When
the container did not start healthy, its last 50 log lines go only to the server log (and
`docker compose -p loop2 logs`), not to the Actions log; after a failed probe only
`docker compose -p loop2 logs` has them. The script also logs the resource values
(`resources: MemAvailable ... free space ...`), the old game's state after a failure, and a warning
when the installed script differs from the checked-out source (see troubleshooting).

## Rollback

A rollback is a rebuild of an earlier commit; no old image is kept.

- **Ordinary:** open a revert pull request and merge it; the merge deploys itself.
- **Fast (human, on the server):** `loop2-deploy <earlier sha>`, one command of the human path, which
  accepts a commit of any branch. The earlier commit is the `previously` commit in the log. It lasts
  only until the next push to `main`, which deploys the tip again; to keep a rollback, revert on `main`.
- A rollback across a change of the published port also needs the Origin Rule changed.
- The skeleton has no data to lose. Once a later task adds data, rolling back code does not roll back
  data.
