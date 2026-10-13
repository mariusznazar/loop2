# Troubleshooting

Read the stage first: the Actions log shows the script's stage lines, the server log
`/var/log/loop2-deploy.log` holds git's and Docker's own output. The stages and exit codes are in
`SKILL.md`. The agent only reads; the actions below that change the server are the human's.

## A failed automated deployment

Find the exit code in the Actions log (`The server script (or the SSH connection) failed with exit
code N`) and the matching `stage` line in the deploy log.

| Exit | What to do |
|---|---|
| 255 or no stage line | SSH itself failed: wrong or blocked `DEPLOY_HOST` or `DEPLOY_PORT`, a host-key mismatch (`DEPLOY_KNOWN_HOSTS`), a rejected key. The runners use IPv4 only, so the name must resolve over IPv4 and its port must reach SSH. ssh's own errors may show the server's resolved address; mind that when sharing the log. |
| 2 | The input was refused; a workflow or `authorized_keys` problem, not a code problem. |
| 3 | The commit was not fetched or is not on `main`. Check that the pushed commit exists on GitHub. |
| 4 | Another deployment held the lock for 900 s, or the lock file cannot be opened (see the run account in `setup_and_secrets.md`). Retry. |
| 5 | Resource gate, below. |
| 6 | Fetch or checkout failed: the deploy key, the SSH alias, GitHub reachability, or a full disk. Read git's message in the server log, fix, re-run the workflow. |
| 7 | The type check or build failed. loop2 still runs the previous commit. The fix goes to `main`. |
| 8 | The container did not become healthy, or the probe failed. loop2 is down or broken. Read the last 50 container lines in the server log (they are not in the Actions log), then run `loop2-deploy <previous sha>` using the restore line in the log, or merge a revert. |

With exits 2 to 7 loop2 still runs the previous commit (after the first merge, the human-deployed
request commit). A first human deployment of the request commit that fails at start (exit 8) leaves
no earlier container: fix on the task branch and run the human path again, before the merge.

## The resource gate (exit 5)

Before building, the script requires `MemAvailable` of at least 1024 MiB and at least 4 GiB free on
the filesystem of Docker's root directory, and logs both values (`resources: ...`). Nothing was
built and the running container is untouched. The human may stop a heavy process or free memory,
free disk (for example Docker build cache, below), or change the thresholds in the script's constants
block and reinstall it. Re-run the workflow afterwards. An `unreadable` value fails the gate too.

## Installed-script warning

The log line `warning: the installed /usr/local/bin/loop2-deploy differs from deploy/loop2-deploy at
commit ...` means the installed copy is not the checked-out source; the run went on with the installed
copy. It is expected after a rollback to a commit older than the script's last change, and when a
commit has no `deploy/loop2-deploy` at all. Otherwise review and reinstall (human):

1. `diff /usr/local/bin/loop2-deploy /srv/loop2/deploy/loop2-deploy` and read the difference.
2. Keep the previous copy: `cp -p /usr/local/bin/loop2-deploy /usr/local/bin/loop2-deploy.previous`.
3. Copy the source to a temporary file and run `bash -n` on it.
4. Install it root-owned, mode 0755, over `/usr/local/bin/loop2-deploy`.
5. Run a deployment. If the new copy fails `bash -n` or its first run, copy `.previous` back.

## Cloudflare 521 or 522 right after a deployment

The container is probably still starting (the switch has a few seconds of outage). Probe the origin
from the host: `curl -sS -o /dev/null -w '%{http_code}' http://127.0.0.1:18080/`. An answer of 200
there with 521 or 522 at the public address for more than a minute points at routing (the AAAA
record, the Origin Rule's port 18080, the Flexible Configuration Rule, or port 18080 over the host's
IPv6), not at the container. No answer there means the container is down: read
`docker compose -p loop2 ps` and the deploy log.

## Reclaiming Docker build cache

Repeated builds grow the build cache, and low free disk makes the resource gate fail. Reclaiming it
is a human decision: `docker system df` shows the size, `docker builder prune` removes build cache
only (never `docker system prune`, which would reach the old game's resources). The next build is
slower after a prune.
