# Serwer testowy loop2 — design specification

Status: second revision of the design for the `serwer-testowy` task cycle, after the independent
spec review (`reports/spec-review.md`) and re-review (`reports/spec-re-review.md`), under the
orchestrator's binding rulings on both (`reports/design-revision-prompt.md`,
`reports/design-revision-2-prompt.md`). Provisional orchestrator choice; the human reviews it with
the eventual request.

## Purpose and authority

Deploy the existing empty game and its Express server from the private loop2 repository into a
dedicated Docker container on the Mikrus host where the old loop game runs. A push to `main` makes
that host fetch, type-check, build and start the pushed commit, served at
`https://loop2.mariusznazar.com/` through Cloudflare. The old game at `https://kantarion.bieda.it/`
and every other workload on the host keep running untouched. This task adds no accounts, database,
session, mail, application secret or data volume; later account and save tasks build on the
container it creates.

Binding sources: the frozen task (`task-frozen.md`) with its six *Settlements to record*; the
approved MVP definition `definicja_mvp_loop2.md` (gate record: approved by Mariusz, 2026-10-04) and
its projected entries assigned to plan item 2 of `plan_mvp_loop2.md`; the current foundation
(D-01/1, D-05/2 and their invariants); the-way WAY-13, WAY-48, WAY-69, WAY-126, WAY-134, WAY-135,
WAY-140. Under settlement row 3 and WAY-140 the agent only **reads** the server, through the
`mikrus` MCP; **every change on the server, in Cloudflare and in GitHub settings is a human
action**. The request therefore opens as a blocked draft listing the five human actions, all done
before the merge in the order *Human actions* gives. No live deployment is claimed before those
actions and their checks.

No server name, SSH port, SSH user or IPv6 address appears in the repository, this spec, the
request or the skill; they are referred to by the GitHub secret that holds them or by the owner's
private note outside the repository (settlement row 4). The server directory, the container port
and the rebuild script may stand in the repository.

## Observed server state (read by the orchestrator, access values omitted)

4352 MiB RAM, about 3700 MiB available, no swap; 1 CPU; root filesystem 44 GB with 22 GB free;
Docker 28.1.1 with Compose v2.35.1; git 2.34.1; `flock` present. Running containers: `loop` (the old
game, healthy, about 56 MiB) and a second, unrelated workload (healthy, about 100 MiB); each
publishes one of the host's two public IPv4 ports. Docker build cache: 6.3 GB. `/srv` holds only
`loop`. Host port 18080 is free. The deployment must leave both existing containers untouched: no
host-wide prune, no `down`, no command against another Compose project.

## Approaches weighed

| Approach | How it works | Benefit | Cost and failure mode |
|---|---|---|---|
| **B with build-before-switch — chosen** | One server clone, checked out detached at the requested commit (of `main` for the automation key); `docker compose build` (whose Dockerfile runs the type check and the build); only after a successful build, `docker compose up -d` of the loop2 service. | Fewest moving parts; close to the proven loop pattern; a failed fetch, type check or build leaves the running container in service; a rollback is the same command with an earlier commit. | A failed **start** after a good build leaves loop2 down until a human runs one command or a revert reaches `main`; the previous image is not kept for an instant switch back; each deployment has a few seconds of outage. |
| A — commit-tagged images, release directories, `rollback N` (the first spec's choice) | Build `loop2:<sha>` into an immutable release directory, keep a history of successful releases, switch back by index. | Instant restore of a verified image. | The review showed a SHA tag is not immutable, rollback across a changed Compose port breaks the public route, and the history needs its own ordering rules — more state and code than a skeleton test server warrants. **Dropped**; this revision narrows the first spec's approach A to approach B. |
| C — build in GitHub Actions and ship an image or files | CI builds, the server receives the artifact. | Less load on the shared host. | Violates the approved decision: the server pulls the code from GitHub itself. Excluded. |

## Components

### 1. Application listen configuration

`src/server/main.ts` reads its listen host and port from `LOOP2_LISTEN_HOST` and
`LOOP2_LISTEN_PORT`; when unset they default to `127.0.0.1` and `3000`, so local use, README,
`tests/startup.test.mjs` and every current invariant check keep their address. A port value that
is not an integer from 1 to 65535 makes the process exit non-zero, with a message naming the bad
value and without the readiness line. The readiness line and the occupied-address error name the
address actually used, so `account-server-occupied-address/1` keeps holding for any configured
address. `src/server/app.ts` is unchanged. README, in Polish like the rest of the file, gains one
line naming the two variables, and its last sentence — which says deployment does not belong to the
skeleton — changes to say the skeleton is deployed to the test server through the container and the
deployment skill.

### 2. Image (`Dockerfile`, `.dockerignore`)

- Multi-stage, every stage `FROM node:24-slim` (Node.js major 24 only).
- Build stage: copy `package.json` and `package-lock.json`, `npm ci`; copy the TypeScript configs,
  `scripts/` and `src/`; `npm run typecheck`; `npm run build`; then reduce `node_modules` to
  production dependencies. A type error stops the image build, so no image exists to switch to.
- Runtime stage: only `package.json`, production `node_modules` and `dist/`; runs as the image's
  non-root `node` user; sets `NODE_ENV=production`, `LOOP2_LISTEN_HOST=0.0.0.0`,
  `LOOP2_LISTEN_PORT=3000`; `EXPOSE 3000`; exec-form `CMD ["node", "dist/server/main.js"]`.
- `HEALTHCHECK` runs a short Node.js one-liner that requests `http://127.0.0.1:3000/` and exits 0
  only on HTTP 200 (the slim image has no curl), with an interval and start period short enough
  for the 120-second wait in the deployment script. The probe is a client, not a serving process.
- Labels: `org.opencontainers.image.title=loop2` and `org.opencontainers.image.revision` from a
  build argument `LOOP2_COMMIT`, so the running container names the commit it was built from.
- `.dockerignore` is an allow-list: everything is excluded except `package.json`,
  `package-lock.json`, `tsconfig.*.json`, `scripts/` and `src/`. The local `node_modules`, `dist`,
  `.git`, `.runs`, `.the-way`, tests, foundation, skills and any stray secret file never enter the
  build context. No server-access value enters the image.

### 3. Compose (`compose.yaml`)

- Project `name: loop2`; one service `app` with `container_name: loop2`, built from the checkout's
  `Dockerfile` with build argument `LOOP2_COMMIT: ${LOOP2_COMMIT:-unknown}` (a default, not a
  required variable, so read-only commands such as `ps` and `logs` work without it).
- Publishes host port **18080** to container port 3000. The port stays stable across commits; the
  Cloudflare Origin Rule points at it. Changing it is a repository change plus a human change of
  the Origin Rule, and a rollback across such a change also needs the rule changed.
- `mem_limit: 512m` for the running container: a chosen bound on loop2's effect on the shared host,
  not a measured need; the skeleton uses far less. `restart: unless-stopped`. `init: true`, so a
  minimal init forwards the stop signal and `docker compose up` does not wait out the stop timeout
  on every deployment.
- No volume, no external network, no Docker socket mount, no reference to the `loop` project, its
  container, files, network or volume.

### 4. Repository automation (`.github/workflows/deploy.yml`)

- Runs on `push` to `main`. `concurrency: { group: deploy-loop2, cancel-in-progress: false }`: one
  run at a time, a running deployment is never cancelled; GitHub replaces an older *pending* run
  with a newer one, which is the desired outcome because the newer commit contains the older.
- `permissions: {}`: the run needs no repository token; it does not check out the code and sends
  neither source nor image to the server.
- Secrets by name only: `DEPLOY_HOST`, `DEPLOY_PORT`, `DEPLOY_USER`, `DEPLOY_SSH_KEY` (private key,
  base64 in one line), `DEPLOY_KNOWN_HOSTS` (pinned host-key lines). The key is decoded into a
  temporary file readable only by the runner; SSH runs with `StrictHostKeyChecking=yes` against the
  pinned `known_hosts` and `BatchMode=yes`.
- One SSH invocation whose remote command is exactly the 40-hex `github.sha`, passed through an
  environment variable rather than interpolated into the script text. The run fails when the server
  script exits non-zero; the script's output, including the installed-script warning (component 5),
  appears in the run log.
- After a successful deployment the run probes the public addresses, with a few short retries:
  `https://loop2.mariusznazar.com/` must answer 200 and an unknown `/api/` path an API error, and
  `https://kantarion.bieda.it/` must still answer; a failure of either fails the run with a message
  naming which address failed (the old game is an acceptance criterion). loop2's public address is
  declared once, as a variable in this workflow.
- The secrets, the automation key and the installed script must exist **before the merge**: the
  merge is a push to `main` and starts this workflow at once.
- The workflow holds the automation key, so it is security-sensitive, but it accepts no input the
  product does not trust: its only input is the `github.sha` GitHub gives it. It is therefore not a
  trust-boundary file under WAY-48; the trust boundary is `deploy/**`, the files that read what an
  SSH client sends.

### 5. Server-side script (`deploy/loop2-deploy`)

The versioned source lives in the repository at `deploy/loop2-deploy` (bash). The human installs a
root-owned copy, mode 0755, at **`/usr/local/bin/loop2-deploy`**, outside the checkout; the
automation key's `authorized_keys` entry is `restrict,command="/usr/local/bin/loop2-deploy"`,
added without disturbing existing entries. The checkout never runs as the forced command, so a
commit cannot change what the key executes.

**Run account.** One server account — the one the automation key logs into, not named here
(settlement row 4) — owns the clone, holds the SSH alias with the read-only GitHub key, and runs
both the forced command and every manual run. It needs Docker access and write access to the
checkout, the log and the lock. One account avoids git's safe-directory refusal on a clone owned by
another account and a fetch that cannot find the alias.

**Input — two paths.** Exactly one commit name, matching `^[0-9a-f]{40}$` as the whole value — no
surrounding whitespace, newline, option-like prefix, second word or shell syntax:

- **Forced-command path** — `SSH_ORIGINAL_COMMAND` is set and no argument is given. The script
  fetches `main` only and accepts a commit that is an ancestor of (or equal to) `origin/main`.
- **Human path** — `SSH_ORIGINAL_COMMAND` is unset and exactly one argument is given (a human
  logged in on the server). The script fetches every branch head of the GitHub repository and
  accepts a commit that belongs to any branch there. This lets the human deploy the request's
  commit before the merge (*Human actions*) and roll back to any earlier commit.

No input, both inputs at once, several arguments or a non-matching value are refused (exit 2)
before git or Docker is called. **The automation key cannot reach the human path:** the forced
command replaces whatever the client asks to run, so the client cannot pass an argument; when the
client asks for no command at all, sshd runs the forced command with `SSH_ORIGINAL_COMMAND` unset
and with no argument, which is refused for lack of input. The human path widens nothing an
attacker holding that key can reach; a human with a shell on the server can already run anything.
The value is only ever used as data (git arguments after validation); there is no `eval` and no
shell interpolation of it.

**Constants block (the test seam).** Every constant stands in one marked block at the top of the
script: the fixed `PATH`, the checkout `/srv/loop2`, the installed path
`/usr/local/bin/loop2-deploy`, the log `/var/log/loop2-deploy.log`, the lock
`/run/loop2-deploy.lock`, the memory source `/proc/meminfo`, the two thresholds, the lock wait, the
health wait, the host port 18080, the branch `main`, the Compose project `loop2`, service `app` and
container `loop2`. The script also sets its own `umask`. No environment variable and no argument
changes a constant, so nothing sent through the forced command can change a path, a threshold or the
path taken. Tests replace only this block in a temporary copy (see *Verification*).

**Output.** Everything the script prints reaches the Actions log. It never prints `docker info`
whole, `hostname`, `uname -n` or any value from which the server name, SSH port, user or IPv6
address could be read; it reads only the single fields it needs (Docker's root directory) and
prints commit names, stage names, sizes and container states.

**Run, in order.** Each refusal or failure logs its stage and exits with the code given.

1. Validate the input — else exit 2.
2. Take the exclusive lock with `flock`, waiting up to 15 minutes — else exit 4. The workflow's
   concurrency group already serializes automation; the lock also serializes a human run against
   an automation run.
3. Log the start: requested commit, the path (forced command or human), and the commit the
   running loop2 container was built from (its revision label, or `none`).
4. `git fetch` over the server's read-only deploy key — else exit 6. Forced path:
   `+refs/heads/main:refs/remotes/origin/main` only. Human path: `+refs/heads/*:refs/remotes/origin/*`
   with pruning.
5. The requested object must be a commit and — forced path — an **ancestor of (or equal to)
   `origin/main`** (`git merge-base --is-ancestor`), the approved decision's "commit that belongs to
   that branch" taken literally; human path — an ancestor of (or equal to) at least one
   `refs/remotes/origin/*` head. Else exit 3. The forced path tests only `refs/remotes/origin/main`,
   which it has just fetched, so remote-tracking refs of other branches left by an earlier human run
   never widen it.
6. `git checkout --force --detach <commit>` and `git clean -ffdx`: the checkout is a pure copy of
   git, never edited in place — else exit 6. A clone has no hooks installed, and the script sets
   none.
7. Compare the installed script `/usr/local/bin/loop2-deploy` with the checked-out
   `deploy/loop2-deploy`. When they differ, print and log a clear warning — the installed copy
   differs from the repository source at this commit; a human should review the difference and
   reinstall (see the skill) — and continue with the installed copy. The warning also appears after
   a rollback to a commit older than the last script change; the message says so. A checked-out
   commit with no `deploy/loop2-deploy` (any commit from before this task) gets a warning that the
   source is missing, never a crash; such a commit then fails at the build for lack of
   `compose.yaml` (exit 7), leaving the running container in service.
8. **Resource gate**, before any build — else exit 5, with the running container untouched:
   - `MemAvailable` from `/proc/meminfo` at least **1024 MiB**;
   - free space, read with `df`, on the filesystem holding Docker's root directory (that one field
     read from `docker info`) at least **4 GiB**.
   The script logs both values on every run, pass or fail.
9. `LOOP2_COMMIT=<commit> docker compose --project-name loop2 -f /srv/loop2/compose.yaml build app`.
   The Dockerfile's `npm run typecheck` and `npm run build` run here. A failure — else exit 7 —
   leaves the running container in service. After the build the script logs `MemAvailable` again.
10. Switch: `docker compose --project-name loop2 -f /srv/loop2/compose.yaml up -d --no-build
    --no-deps --remove-orphans --wait --wait-timeout 120 app`. `--remove-orphans` is limited to the
    `loop2` project. If the container does not become healthy — exit 8 — the script logs the last
    container log lines and the line "previously running commit: `<sha>`; to restore run
    `loop2-deploy <sha>` on the server".
11. Local origin probe: `curl` to `http://127.0.0.1:18080/` must give 200 and to an unknown
    `/api/` path a 404 JSON response — else exit 8 with the same restore line.
12. After the switch, and also after any failure in steps 9–11, log the state of the `loop`
    container (its name, status and health; never its port), so every log entry that reached the
    build shows whether the old game survived.
13. On success only: remove **dangling images carrying the label
    `org.opencontainers.image.title=loop2`** (`docker image prune -f --filter label=...`) — the
    images replaced by this deployment. Log "deployed `<sha>`, previously `<sha>`" and exit 0.
    Repeating the deployment of the running commit is harmless: it rebuilds (mostly from cache) and
    recreates only if the image changed.

**Never.** No `docker compose down`, no command naming another Compose project or container
except the read-only state of `loop`, no `docker system|builder|volume|network|container prune`,
no image prune without the loop2 label filter. Build cache growth is not reclaimed by the script;
the disk gate stops a deployment before it fills the disk, and reclaiming cache is a human
decision described in the skill.

**Why these thresholds.** About 3700 MiB are available today, the two existing containers use
about 160 MiB, and the host has no swap, so an exhausted memory makes the kernel kill a process —
possibly the old game. Building this skeleton (`npm ci` of a handful of packages, the native
TypeScript 7 compiler on two small configurations, an image export) is expected to need a few
hundred MiB; this is an expectation, not a measurement. 1024 MiB leaves that plus a margin, and
today's state passes with about 2.7 GiB to spare; falling below it means something else on the
host has changed and a human should look before building. One deployment adds well under 1 GiB of
images and cache; 4 GiB leaves room for the other workloads' growth and logs, and today's 22 GB
passes. The logged values from the first deployments are the evidence for tuning either threshold,
which is a repository change plus a reinstall.

**Trust and keys.** The part-map trust boundary is `deploy/**`: the script is the only file that
reads data the product does not trust (`SSH_ORIGINAL_COMMAND`). The automation key can do nothing
but run this script with a validated commit of `main`. A stolen key can make the server rebuild **any** commit of `main`, including an earlier
one — it can switch loop2 to older code of `main` until the next push, but cannot bring code in; the
log names every request. This is the approved decision taken literally and is accepted for a test
server with no data; it is a point to revisit before task 15 puts accounts behind this route. The
server's separate GitHub Deploy key is read-only. Rotating either key is a human action the skill
describes.

### 6. Cloudflare (human-configured, unchanged from the first spec)

A proxied AAAA record `loop2` pointing at the server's IPv6 address (kept outside the repository);
an Origin Rule matching only `loop2.mariusznazar.com` and overriding the destination port to 18080;
a Configuration Rule scoped to that hostname setting the encryption mode to Flexible, so visitors
use HTTPS on 443 and Cloudflare reaches the origin over HTTP. No zone-wide SSL change, no change to
the old game's route. Cloudflare documents the mechanisms ([Origin
Rules](https://developers.cloudflare.com/rules/origin-rules/), [encryption
modes](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/),
[Flexible](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/flexible/)); that
Cloudflare reaches this IPv6-only origin, and that Docker publishes 18080 on the host's IPv6, are
**unverified** until the human's setup checks pass; the human reports those observations back and
a correction of this request writes the environment fact from them. HTTP from Cloudflare to the origin — and the
origin port answering anyone over IPv6 directly — must be replaced by an encrypted, restricted
origin connection before task 15 introduces player accounts; visitor HTTPS is not end-to-end
encryption.

### 7. Deployment skill (`loop2-deploy`)

A repository skill, present identically in `.claude/skills/loop2-deploy/` and
`.agents/skills/loop2-deploy/`, the two places this repository already exposes its skills (Claude
Code and Cursor read the first, Codex only the second). Written following
`C:/Storage/The Brain/The Brain/Notes/Areas/(A) Claude code/konwencje_skilli_i_commandow.md`:
`SKILL.md` plus its own `references/`, self-contained (it reads only repository files; any link
outside the repository is informational), a `description` under 400 characters with no `: ` and no
` #` sequence, model-invocable. Written in English like the repository's other skills. Its files
fall under the existing `agent-workflow` part's patterns.

It covers what To do 5 requires:

- **Seeing deployments:** the GitHub Actions run of `deploy.yml`; the deploy log
  `/var/log/loop2-deploy.log`; the running commit from the container's revision label (not from
  the checkout, which may stand at a commit whose build failed); `docker compose -p loop2 ps`.
- **Secrets and their rotation:** the five GitHub secret names and what each holds; the server's
  read-only deploy key and its SSH alias for GitHub; access values in the owner's private note
  outside the repository, referred to by name only; rotation of the automation key, the deploy key
  and the pinned host key, each as a human sequence.
- **Rollback:** a rollback is a rebuild of an earlier commit. Ordinary path: a revert merged to
  `main` deploys itself (open the revert PR, merge it). Fast path: the human logs in and runs
  `loop2-deploy <earlier sha>` (one command, the human path, which accepts a commit of any branch);
  the earlier commit is the "previously" commit in the log. A fast rollback lasts only until the next push to `main`, which deploys the tip again —
  to keep it, revert on `main`. A rollback across a change of the published port also needs the
  Origin Rule changed. The skeleton has no data to lose; once a later task adds data, rolling back
  code does not roll back data.
- **Agent versus human:** the agent reads the server only through the `mikrus` MCP, using its
  `servers` tool to find the server id (never written down) and read-only commands (log tail,
  `docker ps`, `docker compose -p loop2 ps|logs`, `docker inspect` of labels and state, `free`,
  `df`, `git -C /srv/loop2 status|log`); the MCP runs commands as root, so the read-only limit is
  an agreement the skill states. Every change — installing or reinstalling the script, keys,
  `authorized_keys`, GitHub secrets, Cloudflare, running a deployment or rollback on the server,
  reclaiming Docker build cache — is the human's.
- **Logs:** the deploy log's stages and exit codes (2 input, 3 commit on no accepted branch, 4 lock, 5 resource
  gate, 6 fetch or checkout, 7 build or type check, 8 start or probe); application logs through
  `docker compose -p loop2 logs`; the Actions log; Cloudflare 521/522 right after a deployment
  meaning the container is still starting, and the origin probe on `127.0.0.1:18080` to tell it
  apart from a routing fault.
- **The installed-script warning:** how to review the difference and reinstall from the checkout
  (keeping the previous copy for recovery if the new one fails `bash -n` or its first run).
- **The resource gate:** what exit 5 means and what the human may do.
- **Setup:** the five human actions below, in their order relative to the merge, and the two input
  paths of the script (forced command: commits of `main` only; human run: commits of any branch).
- **A failed automated deployment:** read the stage from the Actions log and the deploy log; with
  exit 2–7 loop2 still runs the previous commit (after the first merge, the human-deployed request
  commit) and the fix goes to `main`; with exit 8 run `loop2-deploy <previous sha>` from the log's
  restore line, or merge a revert.

## Error handling summary

| Failure | Running loop2 | Old game | Exit | Recovery |
|---|---|---|---|---|
| malformed or missing input, commit on no accepted branch (forced path: not on `main`), lock timeout | untouched | untouched | 2 / 3 / 4 | none needed |
| fetch or checkout fails | untouched | untouched | 6 | retry; check deploy key and GitHub reachability |
| resource gate | untouched | untouched | 5 | human frees memory or disk, or tunes a threshold |
| type check or build fails | untouched | untouched, state logged | 7 | fix on `main` |
| container unhealthy or probe fails | **down or broken** | untouched, state logged | 8 | human runs `loop2-deploy <previous sha>`, or a revert merges to `main` |
| first (human) deployment of the request commit fails at start | none existed | untouched | 8 | fix on the task branch and run the human path again, before the merge |

## Foundation entries

The foundation step writes these, before the code, through the project's record skills; the
invariant checks come from an agent that does not write the code they cover, and the deliberate
break from the code's reviewer (WAY-69). This spec names each entry and its meaning, not its final
wording.

| Source | Entry | Meaning |
|---|---|---|
| projected decision "Where does the MVP run?" | new decision, written whole, *Approved by* from the gate record (Mariusz, 2026-10-04) | loop2 runs in its own container on Mikrus at an address other than `kantarion.bieda.it`; the loop container stays untouched |
| projected decision "How does a change reach the server?" | new decision, written whole, *Approved by* from the gate record | a push to the deploy branch makes the server fetch and build that commit itself; the automation key can only start a rebuild of a commit belonging to that branch |
| projected decision "What serves the built game and account requests in the container?" | new version of D-05, adding "in the loop2 container" (the part D-05/2 lacks) | the one Express 5 process serving the game and `/api/` is the one in the loop2 container |
| projected `loop2-container-isolation/1` | new invariant with a check | the loop2 deployment runs in a container separate from loop's; the check reads the deployment files (own project, service, container; no shared network, volume or socket; no command against another project; no host-wide prune) |
| projected `loop2-distinct-address/1` | new invariant with a check | loop2's public address differs from `kantarion.bieda.it`; the check reads the address the repository declares (the workflow variable) |
| projected `loop2-one-serving-process/1`, container wording | new version of the invariant, check extended to the container | one process in the loop2 container serves game and `/api/` (exec-form `CMD`, one service). The container part counts listening processes and their children, not Node.js processes: the health probe and the init process are not serving processes. Where Docker is available the check builds and runs the image with `--init`, as Compose does, and reports that part unchecked where it is not |
| `account-server-runtime/1`, `account-server-typecheck/1` (and D-01/1) | sentences unchanged; checks read the new deployment files | runtime: every Node.js reference in the Dockerfile, Compose file and workflow is major 24. Typecheck: its tripwire fails on any deployment file today, so the check is extended first to read `Dockerfile`, `compose.yaml`, the workflow and `deploy/` and show the serving image exists only after `npm run typecheck` succeeded |
| settlement row 1 | own decision | loop2 is served at `loop2.mariusznazar.com` through Cloudflare — proxied AAAA, Origin Rule to the container port, HTTPS for players at Cloudflare, plain HTTP to the server until encrypted before task 15 |
| settlement row 2 | own decision | `main` is the deploy branch; every merged PR reaches the test server; a separate deployment step and environment may come later |
| settlement row 3 | own decision | the agent reads the server only through the `mikrus` MCP; every change on the server is a human's; access is to be secured further later |
| settlement row 4 | own decision | secrets and server-access values (server name, SSH port, user, IPv6) stay outside the repository, in GitHub secrets and the owner's note; the directory, container port and rebuild script may stand in it |
| settlement row 5 | own decision | the loop2 container is a Docker container |
| settlement row 6 | environment fact | a Cloudflare Origin Rule can change the destination port, on the Free plan, up to 10 rules (source and read date from the task) |
| new deployment files | part-map change | a new part for `Dockerfile`, `.dockerignore`, `compose.yaml`, `.github/workflows/deploy.yml`, `deploy/**` and their tests; its trust boundary `deploy/**` only (the script reads `SSH_ORIGINAL_COMMAND`; the workflow holds the key but accepts no untrusted input); external-context rows for GitHub Actions, Cloudflare and the Mikrus host. The test that the two skill copies are identical belongs to the existing `agent-workflow` part |
| whether Cloudflare reaches an IPv6-only origin | environment fact, written by **this request in a correction after the human actions** | written only from the human's reported observation of action 5 (the AAAA record, the Origin Rule and the public HTTPS check), never before it; the foundation step does not write it |

Left to later tasks: the decision "What public address do the game and account server share?" and
the invariant `loop2-shared-public-origin/1` (task 15).

## Verification

Before any server change, in the repository:

- **Script test seam:** each script test runs a temporary copy of `deploy/loop2-deploy` in which
  only the marked constants block is replaced — its `PATH` puts a stub directory first, its paths
  point into a temporary directory (checkout cloned from a temporary Git repository standing in for
  GitHub, installed path, log, lock, a fake meminfo file), and its thresholds stay as written — and
  first asserts that everything outside the block is byte-identical to `deploy/loop2-deploy`. Stubs
  for `docker`, `curl`, `flock` and `df` record every call and answer as the test sets; a guard
  aborts the test if any of the four resolves outside the stub directory, so a real Docker is never
  reached. Nothing in the seam is reachable from the forced command (no environment variable or
  argument changes a constant).
- **Script, adversarial input (WAY-48):** non-hex, 39 and 41 characters, uppercase hex, leading or
  trailing whitespace, embedded newline, option-like strings (`--help`, `-c`), shell metacharacters
  (`;`, `$(...)`, backticks, `|`, `&&`), two words, empty input, two arguments, both
  `SSH_ORIGINAL_COMMAND` and an argument present, and the forced path with no command
  (`SSH_ORIGINAL_COMMAND` unset, no argument) — each refused with exit 2, and the stubs and the git
  fixture record no call. The forced path with a valid commit that exists only on another branch is
  refused with exit 3, while the human path accepts that same commit.
- **Script, behaviour:** the forced path fetches only `main` and the human path every branch head;
  a commit on no branch is refused (exit 3) on both paths; an earlier ancestor of `main` is
  accepted; with the lock stub holding the lock the run waits and then exits 4; the resource gate
  refuses below each threshold (fake meminfo, `df` stub) without calling `docker compose build`; a
  failed build never calls `up`; a failed health wait or probe exits 8 and logs the restore line;
  the `loop` state is logged after the build stage in success and failure; only loop2-labelled
  dangling images are pruned, only on success; the installed-versus-source comparison warns on a
  difference and continues, and warns without crashing when the checked-out commit has no
  `deploy/loop2-deploy`; the output never contains a whole `docker info`, `hostname` or `uname -n`;
  no command of the script contains `down`, another project name or an unfiltered prune. A tool
  missing on the test machine makes the test report itself unchecked, never pass. Real `flock`
  serialization is not proven by a stub and stays unchecked until it runs on a machine with
  `flock`.
- **Skill copies:** a test that `.claude/skills/loop2-deploy/` and `.agents/skills/loop2-deploy/`
  hold identical files (part `agent-workflow`).
- **No access values (acceptance criterion 2):** before the request, the orchestrator scans the
  diff, the cycle record and the request text for IPv6 literals, Mikrus server-name forms and the
  SSH port and user held in the owner's note, without writing those values anywhere.
- **Image:** where Docker is available locally, build and run the image: Node.js 24, non-root
  process, one listening process, `GET /` 200, unknown `/api/` path a JSON 404, health check
  healthy, a type error in `src/server` failing the build. Where Docker is not available this is
  unchecked and the human's first deployment is its first real run.
- **Application:** `npm test` (including the unchanged occupied-address test on the default
  address) and tests for the two listen variables and an invalid port.
- **Invariant gate:** `python -B .the-way/gate/run_tests.py tests/invariants` with the extended and
  new checks; the format guard of every changed foundation file.

## Human actions (all before the merge, at the blocked draft request, in this order)

1. **Cloudflare:** the proxied AAAA record `loop2`, the Origin Rule to port 18080 for
   `loop2.mariusznazar.com`, and the hostname-scoped Flexible Configuration Rule.
2. **Read-only repository key:** generate it on the server under the run account, add its public
   half to the loop2 repository as a Deploy key without write access, and add an SSH alias for
   GitHub using it.
3. **Clone and install:** clone the repository to `/srv/loop2` under the run account; fetch the
   task branch and install the script **from the request's head commit** — e.g. from
   `git -C /srv/loop2 show <request head sha>:deploy/loop2-deploy` — as root-owned 0755
   `/usr/local/bin/loop2-deploy`; check it with `bash -n`. (`main` holds no script yet.)
4. **Automation key and secrets:** create the key, append the `restrict,command=...` entry to the
   run account's `authorized_keys` without removing existing entries, set the five GitHub secrets
   with pinned host-key lines, and delete the private key from the server. This must be done
   before the merge, because the merge's push starts the workflow at once.
5. **First deployment and checks:** run `loop2-deploy <request head sha>` on the server (the human
   path, which accepts a commit of the task branch); then check `http://127.0.0.1:18080/` on the
   host, reachability of port 18080 over the host's IPv6, `https://loop2.mariusznazar.com/`, that
   `https://kantarion.bieda.it/` still works, and the applied memory limit of the `loop2` container
   (`docker inspect` of `HostConfig.Memory`, expected 512 MiB). The human reports these
   observations back to the cycle; a correction of the request then writes the IPv6-origin
   environment fact from them. If IPv6 routing, the port or the memory limit fails, the route or
   limit is revised before acceptance is claimed.

After the merge, the workflow run of the merge commit is the first automated deployment. If it
fails, loop2 stays on the human-deployed commit (exits 2–7) or fails as the error table says
(exit 8), and the skill says what to do.

## Source alignment and limits

The approved plan assigns the deployment decisions and the isolation and address invariants to
item 2 and the shared-origin entries, accounts, sessions, mail and backup to later items; older
"resolved in task: serwer testowy" labels in the definition for mail, session, Argon2 and backup
are superseded by the plan's change log, and the frozen task excludes them. This design follows the
narrower, later settlement. The resource thresholds rest on one observation of the host and an
expected, unmeasured build footprint; the logged values from real deployments are their check.
