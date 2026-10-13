# Plan — Wdrożyć szkielet loop2 na serwer testowy na Mikrusie

- Task: `docs/task-cycles/serwer-testowy/task-frozen.md`
- Spec: `docs/task-cycles/serwer-testowy/spec.md` (revision 2, approved in
  `reports/spec-re-review.md`, "Revision 2 review")
- Base: 170118680abec6760291df5d13f908c58409f867

No server name, SSH port, SSH user or IPv6 address appears in this plan, in any slice's files or in
any check's output; every slice refers to them by the GitHub secret name or the owner's private note.

## Foundation entries

The foundation step writes these through `the-way-record-decision`, `the-way-record-invariant`,
`the-way-record-environment-fact` and `the-way-update-part-map`. Slice 1 depends on none of them;
every row below is written before Slice 2, the first slice that adds a deployment file. Each
invariant check is written by an agent given the invariant's sentence, its method and the spec's
description of the files it reads — never by a slice agent, never from the code (WAY-69). The checks
written here are read-only for the slices; a slice that needs one changed returns to the foundation
step. Until the slice that adds the files a check reads, that check fails: this is its failing test,
not a defect.

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| "Where does the MVP run?" — written whole, *Approved by* from the definition's gate record | decision (new) | projected entry, `definicja_mvp_loop2.md`; plan item 2 writes it | Slices 2, 3, 4, 5, 6 |
| "How does a change reach the server?" — written whole, *Approved by* from the gate record | decision (new) | projected entry; plan item 2 writes it | Slices 3, 4, 5, 6 |
| "What serves the built game and account requests in the container?" — the part D-05/2 lacks, "in the loop2 container" | decision (new version of D-05) | projected entry; plan item 2 writes it | Slice 2 |
| Settlement row 1 — loop2 at `loop2.mariusznazar.com` through Cloudflare (proxied AAAA, Origin Rule to the container port, HTTPS for players at Cloudflare, plain HTTP to the server until encrypted before task 15) | decision (new) | *Settlements to record* row 1 | Slices 2, 5, 6 |
| Settlement row 2 — `main` is the deploy branch | decision (new) | row 2 | Slices 3, 5, 6 |
| Settlement row 3 — the agent only reads the server through the `mikrus` MCP; every change is a human's | decision (new) | row 3 | Slice 6 |
| Settlement row 4 — secrets and server-access values stay outside the repository; directory, container port and rebuild script may stand in it | decision (new) | row 4 | Slices 3, 4, 5, 6 |
| Settlement row 5 — the loop2 container is a Docker container | decision (new) | row 5 | Slice 2 |
| Settlement row 6 — a Cloudflare Origin Rule can change the destination port, on the Free plan, up to 10 rules | environment fact (new) | row 6 (source and read date from the task's Context) | the row-1 decision's *Based on*; Slices 2, 6 |
| `loop2-container-isolation/1`; check `tests/invariants/test_loop2_container_isolation.py` — reads `compose.yaml`, `Dockerfile` and `deploy/loop2-deploy`: own Compose project, service and container; no shared network or volume, no Docker socket mount; no command naming another project or container except the read-only state of `loop`; no `down`; no host-wide prune and no image prune without the loop2 label filter. Runs without Docker | invariant (new) with its check | projected invariant; plan item 2 writes it | Slices 2, 3, 4 |
| `loop2-distinct-address/1`; check `tests/invariants/test_loop2_distinct_address.py` — reads the public address the repository declares once, in `.github/workflows/deploy.yml`, and its host differs from `kantarion.bieda.it` | invariant (new) with its check | projected invariant; plan item 2 writes it | Slice 5 |
| `loop2-one-serving-process`, new version with "in the loop2 container"; the citations in `tests/invariants/test_loop2_one_serving_process.py` move to the new version, and the container part goes into `tests/invariants/test_loop2_one_serving_process_container.py` — static: exec-form `CMD` running `node`, one Compose service; where a Docker daemon answers: build the image, run it with `--init`, count the listening processes and their children (the health probe and the init process are not serving processes), else that part is skipped and stays unchecked | invariant (new version) with its check extended | projected invariant; plan item 2 writes it | Slice 2 |
| `account-server-typecheck/1` — sentence unchanged; its tripwire (`test_no_deployment_route_left_unread`) is replaced by a check that reads `Dockerfile`, `compose.yaml`, `.github/workflows/deploy.yml` and `deploy/loop2-deploy` and shows the serving image exists only after `npm run typecheck` succeeded (type check in the build stage before the runtime stage copies `dist/`; Compose builds, pulls no prebuilt image; the script builds before `up --no-build`; the workflow ships no files), and still fails on any other deployment file; a Docker-dependent part, if any, is skipped and unchecked without a daemon. Files: `tests/invariants/test_account_server_typecheck.py`, and `tests/invariants/loop2_invariant_support.py` where a shared reader is needed | invariant check extended | spec, *Foundation entries* row; D-01/1 | Slice 2 (must precede it) |
| `account-server-runtime/1` — sentence unchanged; `tests/invariants/test_account_server_runtime.py` already reads every file `deployment_files()` matches (`Dockerfile`, `compose.yaml`, `.github/workflows/*.yml`, `deploy/*`); the foundation step confirms it reads the forms the spec gives (multi-stage `FROM node:24-slim`, no `image:` in Compose, no Node.js setup in the workflow) and changes it only where it does not | invariant check confirmed | spec; D-01/1 | Slices 2, 5 |
| Part map: new part `deployment` — files `Dockerfile`, `.dockerignore`, `compose.yaml`, `.gitattributes`, `.github/workflows/deploy.yml`, `deploy/**`, `tests/deploy/**`, `tests/invariants/test_loop2_container_isolation.py`, `tests/invariants/test_loop2_distinct_address.py`, `tests/invariants/test_loop2_one_serving_process_container.py`; depends on account-server and build-tools; trust boundary `deploy/**` only; failure modes as the skill finds them. Part `agent-workflow` gains `tests/agent_workflow/**`. External-context rows: GitHub Actions, Cloudflare, the Mikrus host | part-map change | spec, *Foundation entries* row "new deployment files"; the change's new files | Slices 2–6 |

Not in this table: the environment fact on whether Cloudflare reaches the IPv6-only origin. A
correction of the request writes it from the human's reported observation of human action 5,
never the foundation step. "What public address do the game and account server share?" and
`loop2-shared-public-origin/1` belong to task 15.

## Slices

### Slice 1 — listen address from the environment

- **Goal:** `src/server/main.ts` takes its listen host and port from `LOOP2_LISTEN_HOST` and
  `LOOP2_LISTEN_PORT`, defaulting to `127.0.0.1` and `3000` when unset; a port that is not an
  integer from 1 to 65535 (an empty value included) makes the process exit non-zero with a message
  naming the value and no readiness line; the readiness line and the occupied-address error name
  the address actually used. README (Polish) gains one line naming both variables, and its last
  sentence says the skeleton is deployed to the test server through the container and the
  `loop2-deploy` skill. `src/server/app.ts` is unchanged.
- **Change:** `src/server/main.ts` · `tests/startup.test.mjs` · `README.md`
- **Read:** `docs/task-cycles/serwer-testowy/task-frozen.md` · `docs/task-cycles/serwer-testowy/spec.md`
  `src/server/app.ts` · `package.json` · `foundations/invariants.md`
  `tests/invariants/test_account_server_occupied_address.py`
  `tests/invariants/loop2_invariant_support.py:212-293`
- **Checks:** first, new tests in `tests/startup.test.mjs`, failing: the variables set to a free
  port on `127.0.0.1` give a readiness line naming that address; `0`, `65536`, `abc`, `3000x` and
  an empty value each give a non-zero exit, a message naming the value and no readiness line. Then
  `npm test` (the unchanged occupied-port test on the default address included), and afterwards,
  never at the same time as `npm test` (both use port 3000),
  `python -B .the-way/gate/run_tests.py tests/invariants`: every check that passed at the base
  still passes; checks the foundation step added for files no slice has made yet fail as expected.
- **Depends on:** none

### Slice 2 — container image and Compose service

- **Goal:** `Dockerfile` (multi-stage, every stage `FROM node:24-slim`; build stage `npm ci`,
  `npm run typecheck`, `npm run build`, production dependencies only; runtime stage with
  `package.json`, production `node_modules` and `dist/` only, user `node`, `NODE_ENV=production`,
  `LOOP2_LISTEN_HOST=0.0.0.0`, `LOOP2_LISTEN_PORT=3000`, `EXPOSE 3000`, exec-form `CMD`, a Node.js
  `HEALTHCHECK` on `http://127.0.0.1:3000/`, labels `org.opencontainers.image.title=loop2` and the
  revision from build argument `LOOP2_COMMIT`); `.dockerignore` as an allow-list of
  `package.json`, `package-lock.json`, `tsconfig.*.json`, `scripts/` and `src/`; `compose.yaml`
  with project `loop2`, service `app`, container `loop2`, `LOOP2_COMMIT` defaulting to `unknown`,
  host port 18080 to 3000, `mem_limit: 512m`, `restart: unless-stopped`, `init: true`, no volume,
  external network, socket mount or reference to `loop` — all as spec components 2 and 3 give.
- **Change:** `Dockerfile` · `.dockerignore` · `compose.yaml`
- **Read:** `docs/task-cycles/serwer-testowy/task-frozen.md` · `docs/task-cycles/serwer-testowy/spec.md`
  `package.json` · `scripts/build.mjs` · `tsconfig.server.json` · `tsconfig.browser.json`
  `.gitignore` · `src/server/main.ts` · `foundations/invariants.md` · `foundations/part_map.md`
  `tests/invariants/test_account_server_runtime.py` · `tests/invariants/test_account_server_typecheck.py`
  and, written by the foundation step and so not measured here, tests/invariants/test_loop2_container_isolation.py
  and tests/invariants/test_loop2_one_serving_process_container.py
- **Checks:** the failing tests are the foundation step's: the extended typecheck check, the
  runtime check, the static parts of the container-isolation check and of the container
  one-serving-process check. Then `docker compose -f compose.yaml config` (local Compose CLI 5.4.0
  needs no daemon; it differs from the server's 2.35.1, so a pass does not prove the server accepts
  the file) and `python -B .the-way/gate/run_tests.py tests/invariants`: runtime, typecheck and
  the static container parts pass; the isolation check's script part fails until Slice 4. Only
  where a Docker daemon answers: `docker build --build-arg LOOP2_COMMIT=<sha> .` and `docker run
  --init` of the image — Node.js 24, non-root process, one listening process, `GET /` 200, an
  unknown `/api/` path a JSON 404, health check healthy — and a build with a type error appended to
  `src/server/main.ts` in a temporary copy fails. On this machine the daemon does not run: those
  stay unchecked, and the human's first deployment is their first real run.
- **Depends on:** Slice 1 · every foundation entry above

### Slice 3 — deployment script: input, lock, fetch, accepted commit, checkout

- **Goal:** `.gitattributes` holds `deploy/** text eol=lf`. `deploy/loop2-deploy` (bash) exists
  with the marked constants block at its top (fixed `PATH`, `umask`, checkout `/srv/loop2`,
  installed path `/usr/local/bin/loop2-deploy`, log `/var/log/loop2-deploy.log`, lock
  `/run/loop2-deploy.lock`, memory source `/proc/meminfo`, the two thresholds, the lock and health
  waits, host port 18080, branch `main`, project `loop2`, service `app`, container `loop2`) and
  runs spec steps 1–6: validate the one input on its two paths (forced command:
  `SSH_ORIGINAL_COMMAND` set and no argument; human: unset and exactly one argument) against
  `^[0-9a-f]{40}$` as the whole value, else exit 2 before any git or Docker call; take the lock
  with `flock` (else exit 4, a lock file it cannot open included, with its own message); log the
  start with the running container's revision label or `none`; fetch from the clone's `origin`
  remote — forced path `main` only, human path every branch head with pruning (else exit 6);
  accept a commit that is an ancestor of, or equal to, freshly fetched `origin/main` (forced) or of
  any `refs/remotes/origin/*` head (human), else exit 3; `git checkout --force --detach` and
  `git clean -ffdx` (else exit 6). The stages after the checkout come in Slice 4. No value is
  `eval`ed or interpolated into shell text; nothing printed reveals a server-access value.
  The test seam in `tests/deploy/deploy_script_support.py`: a temporary copy of the script with
  only the constants block replaced, asserted byte-identical outside it; recording stubs for
  `docker`, `curl`, `flock` and `df`, written at run time with LF endings into a stub directory
  first on the copy's `PATH`; a guard that aborts when any of the four resolves outside that
  directory; a temporary Git repository standing in for GitHub and a clone of it standing in for
  `/srv/loop2`; Git's own bash, never another `bash` on `PATH` such as the WSL one; a missing tool
  skips the test, so it reports unchecked, never pass.
- **Change:** `.gitattributes` · `deploy/loop2-deploy` · `tests/deploy/deploy_script_support.py`
  `tests/deploy/test_loop2_deploy_input.py` · `tests/deploy/test_loop2_deploy_commit.py`
- **Read:** `docs/task-cycles/serwer-testowy/task-frozen.md` · `docs/task-cycles/serwer-testowy/spec.md`
  `docs/task-cycles/serwer-testowy/reports/spec-re-review.md:188-261`
  `tests/invariants/loop2_invariant_support.py:1-140` · `foundations/part_map.md`
  `.the-way/gate/run_tests.py:1-60`
- **Checks:** first, failing tests. `tests/deploy/test_loop2_deploy_input.py`: non-hex, 39 and 41
  characters, uppercase hex, leading or trailing whitespace, an embedded newline, `--help`, `-c`,
  `;`, `$(...)`, backticks, `|`, `&&`, two words, empty input, two arguments, both
  `SSH_ORIGINAL_COMMAND` and an argument, and no input at all (the forced command with no client
  command) — each exit 2 with no stub call and no git call on the fixture.
  `tests/deploy/test_loop2_deploy_commit.py`: the forced path fetches only `main`, the human path
  every branch head; an earlier ancestor of `main` is accepted; a commit on no branch is refused
  with exit 3 on both paths; a commit only on another branch is refused with exit 3 on the forced
  path in two states — absent from the clone, and already fetched by an earlier human-path run but
  not on `main` — while the human path accepts it; a lock stub reporting a held lock gives exit 4;
  a failing fetch gives exit 6; the checkout is detached at the commit and clean. Then
  `bash -n deploy/loop2-deploy` under Git Bash, `python -B .the-way/gate/run_tests.py tests/deploy`,
  and `git ls-files --eol deploy/loop2-deploy` showing `i/lf w/lf` with `eol=lf`. Unchecked here:
  `shellcheck` (not installed) and real `flock` serialization (Git Bash has no `flock`; a stub
  proves nothing about locking).
- **Depends on:** Slice 2 · decisions "Where does the MVP run?", "How does a change reach the
  server?", settlement rows 2 and 4 · `loop2-container-isolation/1` · the part-map change

### Slice 4 — deployment script: warning, resource gate, build, switch, probe, prune

- **Goal:** `deploy/loop2-deploy` runs spec steps 7–13 after the checkout: the installed-versus-
  source comparison (warn and continue on a difference, with the rollback wording; warn without
  crashing when the commit has no `deploy/loop2-deploy`); the resource gate (`MemAvailable` at
  least 1024 MiB, at least 4 GiB free on the filesystem of Docker's root directory read as that one
  field, both logged on every run, else exit 5 with no build); `docker compose --project-name loop2
  -f /srv/loop2/compose.yaml build app` with `LOOP2_COMMIT` (else exit 7, nothing switched), then
  `MemAvailable` logged again; `up -d --no-build --no-deps --remove-orphans --wait --wait-timeout
  120 app` and the local probe of `127.0.0.1:18080` (`/` 200, an unknown `/api/` path a JSON 404),
  else exit 8 with the last container log lines and the restore line naming the previous commit;
  the `loop` container's name, status and health logged after the build stage on success and
  failure, never its port; on success only, a prune of dangling images labelled
  `org.opencontainers.image.title=loop2`, the line "deployed `<sha>`, previously `<sha>`", exit 0.
  Never `down`, another project's or container's command (beyond reading `loop`'s state), a
  host-wide prune or an unfiltered image prune; never whole `docker info`, `hostname` or `uname -n`
  in its output.
- **Change:** `deploy/loop2-deploy` · `tests/deploy/deploy_script_support.py`
  `tests/deploy/test_loop2_deploy_build.py` · `tests/deploy/test_loop2_deploy_switch.py`
- **Read:** `docs/task-cycles/serwer-testowy/task-frozen.md` · `docs/task-cycles/serwer-testowy/spec.md`
  `foundations/part_map.md`; made by Slices 2 and 3, so not measured here: compose.yaml,
  Dockerfile, tests/deploy/test_loop2_deploy_input.py, tests/deploy/test_loop2_deploy_commit.py,
  and the foundation step's tests/invariants/test_loop2_container_isolation.py
- **Checks:** first, failing tests. `tests/deploy/test_loop2_deploy_build.py`: a difference
  between the installed copy and the source warns and continues; a commit without
  `deploy/loop2-deploy` warns and then fails the build with exit 7; a fake meminfo below 1024 MiB
  and a `df` stub below 4 GiB each give exit 5 without `docker compose build`; both values are
  logged on a pass; a failed build gives exit 7 and never calls `up`; the `loop` state is logged
  after a failed build. `tests/deploy/test_loop2_deploy_switch.py`: a failed health wait and a
  failed probe each give exit 8 with the restore line; the `loop` state is logged after a success
  and after exit 8; only loop2-labelled dangling images are pruned, only on success; a repeated
  deployment of the running commit succeeds; the output never holds whole `docker info`,
  `hostname` or `uname -n`; no command the script runs contains `down`, another project name or an
  unfiltered prune. Then `bash -n deploy/loop2-deploy`,
  `python -B .the-way/gate/run_tests.py tests/deploy` and
  `python -B .the-way/gate/run_tests.py tests/invariants` (the container-isolation check now
  passes in full). Unchecked here: `shellcheck`, real Docker and real `flock`.
- **Depends on:** Slice 3

### Slice 5 — GitHub Actions workflow

- **Goal:** `.github/workflows/deploy.yml` runs on a push to `main`, in concurrency group
  `deploy-loop2` with `cancel-in-progress: false`, with `permissions: {}` and no checkout; decodes
  `DEPLOY_SSH_KEY` into a file only the runner can read, pins `DEPLOY_KNOWN_HOSTS`, and makes one
  SSH call with `StrictHostKeyChecking=yes` and `BatchMode=yes` to `DEPLOY_USER` at `DEPLOY_HOST`
  on `DEPLOY_PORT`, whose remote command is `github.sha` passed through an environment variable,
  never interpolated into the script text; fails when the server script exits non-zero; then
  probes, with a few short retries, loop2's public address — declared once as a workflow variable,
  `https://loop2.mariusznazar.com/` — for 200 and an unknown `/api/` path for an API error, and
  `https://kantarion.bieda.it/` for an answer, failing with a message naming the address that
  failed. No access value is written in the file.
- **Change:** `.github/workflows/deploy.yml` · `tests/deploy/test_deploy_workflow.py`
- **Read:** `docs/task-cycles/serwer-testowy/task-frozen.md` · `docs/task-cycles/serwer-testowy/spec.md`
  `tests/invariants/test_account_server_runtime.py:90-193`; made by Slice 4 or by the foundation
  step, so not measured here: deploy/loop2-deploy (its exit codes and output),
  tests/invariants/test_loop2_distinct_address.py
- **Checks:** first, the failing `tests/deploy/test_deploy_workflow.py`, standard library only
  (PyYAML is not assumed): trigger `push` on `main` only; the concurrency group and
  `cancel-in-progress: false`; `permissions: {}`; no `actions/checkout`; the five secrets named and
  no other secret; `StrictHostKeyChecking=yes` and `BatchMode=yes`; `github.sha` reaches the run
  script only through `env`; both public probes; no IPv6 literal and no host name besides the two
  public addresses and `github.com`. Then `python -B .the-way/gate/run_tests.py tests/deploy` and
  `python -B .the-way/gate/run_tests.py tests/invariants` (distinct-address, runtime and typecheck
  pass). Unchecked here: `actionlint` (not installed) and any real run, which is the merge's push.
- **Depends on:** Slice 4 · decisions "How does a change reach the server?", settlement rows 1, 2
  and 4 · `loop2-distinct-address/1`

### Slice 6 — deployment skill

- **Goal:** the repository skill `loop2-deploy`, identical in `.claude/skills/loop2-deploy/` and
  `.agents/skills/loop2-deploy/`, in English, written under the conventions in
  C:/Storage/The Brain/The Brain/Notes/Areas/(A) Claude code/konwencje_skilli_i_commandow.md
  (outside the repository): model-invocable, self-contained, `description` under 400 characters
  with no `: ` and no ` #`. `SKILL.md` covers seeing deployments (Actions run, deploy log, running
  commit from the container's revision label, `docker compose -p loop2 ps`), rollback (ordinary:
  merge a revert; fast: one human command `loop2-deploy <earlier sha>` lasting until the next push;
  a port change also needs the Origin Rule; no data to lose now, and code rollback never rolls back
  data later), agent versus human (the agent reads only, through the `mikrus` MCP and its `servers`
  tool, read-only commands listed; every change is the human's) and the log stages with exit codes
  2–8. `references/setup_and_secrets.md` covers the five human actions in their order before the
  merge, the two input paths, the run account's needs (Docker access, write access to the checkout,
  the log and the lock; a non-root account also needs the log file made and the lock creatable in
  `/run`), the five secret names and what each holds, the read-only deploy key and its SSH alias,
  access values by reference to the owner's private note only, rotation of the automation key, the
  deploy key and the pinned host key, and reinstalling the script — including that when a
  correction changes `deploy/loop2-deploy` before the merge, the human reinstalls from the new
  request head. `references/troubleshooting.md` covers a failed automated deployment by exit code,
  the resource gate, the installed-script warning and how to review and reinstall (keeping the
  previous copy), Cloudflare 521/522 right after a deployment against the origin probe, and
  reclaiming Docker build cache as a human decision.
- **Change:** `.claude/skills/loop2-deploy/SKILL.md`
  `.claude/skills/loop2-deploy/references/setup_and_secrets.md`
  `.claude/skills/loop2-deploy/references/troubleshooting.md`
  `.agents/skills/loop2-deploy/SKILL.md`
  `.agents/skills/loop2-deploy/references/setup_and_secrets.md`
  `.agents/skills/loop2-deploy/references/troubleshooting.md`
  `tests/agent_workflow/test_loop2_deploy_skill.py`
- **Read:** `docs/task-cycles/serwer-testowy/task-frozen.md` · `docs/task-cycles/serwer-testowy/spec.md`
  `.claude/skills/the-way-critique/SKILL.md:1-10` · `foundations/part_map.md`; made by
  Slices 2–5, so not measured here: compose.yaml, deploy/loop2-deploy,
  .github/workflows/deploy.yml; outside the repository, so not measured here: the conventions file
  named in the goal (about 26 KB)
- **Checks:** first, the failing `tests/agent_workflow/test_loop2_deploy_skill.py`: the two
  copies hold the same file names and bytes; the frontmatter `description` read whole is under 400
  characters and holds no `: ` and no ` #`; no file holds an IPv6 literal or a Mikrus server-name
  form. Then `python -B .the-way/gate/run_tests.py tests/agent_workflow`. Read by the slice's
  reviewer, not a command: every topic of To do 5 is present, and the exit codes, paths and secret
  names match `deploy/loop2-deploy` and the workflow.
- **Depends on:** Slices 2, 3, 4, 5 · settlement rows 1–4 · the part-map change

## Coverage

| What the task requires | Slices or entries |
|---|---|
| To do 1 — Docker container loop2 beside loop, which nothing changes | Slices 2, 3, 4; "Where does the MVP run?"; row 5; `loop2-container-isolation/1` |
| To do 2 — `https://loop2.mariusznazar.com/` through Cloudflare | Slice 2 (port 18080), Slice 5 (public probe), Slice 6 (setup); row 1; row 6; `loop2-distinct-address/1`; human action 1 at the request |
| To do 3 — push to `main` triggers the server rebuild; the server pulls; the key can only rebuild a commit of `main` | Slices 3, 4, 5; "How does a change reach the server?"; row 2 |
| To do 4 — Node.js 24 and types checked before deployment | Slices 1, 2; `account-server-runtime/1`; `account-server-typecheck/1` extended |
| To do 5 — skill: seeing deployments, secrets and rotation, rollback with step count and data, agent versus human, logs | Slice 6; row 3 |
| Acceptance 1 — `https://kantarion.bieda.it/` still works | Slice 4 (`loop` state logged), Slice 5 (probe of the old game), `loop2-container-isolation/1`; human action 5 |
| Acceptance 2 — no secrets or access values in the request or repository | row 4; Slices 3–6 (no value written; workflow and skill tests scan for IPv6 literals and server-name forms; the script prints none); the orchestrator's scan of the diff, record and request text before the request |
| Settlement rows 1–5 | the five decision rows of *Foundation entries* |
| Settlement row 6 | the environment-fact row of *Foundation entries* |
| Carried question — listen address in the container without breaking start tests or `account-server-occupied-address/1` | Slice 1; Slice 2 (`ENV`) |
| Carried question — image, container and memory limit | Slice 2 (`mem_limit: 512m`); Slice 4 (resource gate); human action 5 reads the applied limit |
| Carried question — source of the server-side script | Slice 3 (`deploy/loop2-deploy`); Slice 6 (install and reinstall) |
| Carried question — Cloudflare reaching an IPv6-only origin | not a slice: a correction after human action 5 writes the environment fact from the human's observation |
| Carried question — whether the runtime, typecheck and one-serving-process methods cover the deployment files | *Foundation entries*: typecheck extended, one-serving-process new version with container part, runtime confirmed |
| Projected entries of plan item 2 | the three projected decision rows and the three invariant rows of *Foundation entries* |
| Orchestrator answer — `.gitattributes` LF for `deploy/**` | Slice 3 |
| Orchestrator answer — exit-3 test in two states | Slice 3 (`tests/deploy/test_loop2_deploy_commit.py`) |
| Orchestrator answer — reinstall from the new request head after a correction changes the script | Slice 6 (`references/setup_and_secrets.md`) |
| Human actions 1–5, before the merge | not slices: the blocked draft request lists them; Slice 6 describes each |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| Six slices; the script split at the checkout, so the input boundary (WAY-48) is reviewed alone | one script slice | a reviewer of a single slice judges the boundary and Docker stages at once |
| Every foundation entry written before Slice 2; Slice 1 depends on none | foundation step before Slice 1 | none to the code; new checks fail until their files exist either way |
| Listen tests added to `tests/startup.test.mjs` | a new test file, which needs `package.json`'s `test` script changed | `startup.test.mjs` grows beyond the occupied-port case |
| An empty `LOOP2_LISTEN_PORT` is refused like any non-integer | an empty value read as unset | a shell exporting an empty variable stops local start with a clear message |
| Script tests in Python `unittest` under `tests/deploy`, run by the-way's gate runner; stubs written at run time | Bats or committed shell stubs | a second test style beside `node:test`; with committed stubs, `.gitattributes` would need more patterns |
| `.gitattributes` holds only `deploy/**` LF, since the change adds no other shell file | a repository-wide `* text=auto` | a later shell file outside `deploy/` would need its own line |
| Git's own bash for the script tests; a missing one skips them | any `bash` on `PATH` | on Windows `bash` may be WSL's, which sees other paths and tools |
| The script fetches from the clone's `origin` remote, set by the human at clone time with the SSH alias; no URL in the constants block | the GitHub URL as a constant | a clone made without the alias fails at fetch with exit 6 |
| A lock file the run account cannot open gives exit 4 with its own message; the skill names what a non-root account needs | leave it to an unspecific failure | after a reboot a non-root account would fail every deployment until the human looks |
| A static workflow test, standard library only | relying on `actionlint` (absent) or PyYAML | text checks miss a YAML subtlety `actionlint` would catch |
| Skill split into `SKILL.md` and two references | one long `SKILL.md` | an agent reads more than it needs for one question |
| The skill test compares only the `loop2-deploy` copies, as the spec says | comparing every skill under both directories | drift of the-way's own copies stays unwatched |
| New part named `deployment`, holding `.gitattributes` and the container one-serving-process check; the local check stays in account-server | `.gitattributes` in build-tools | a rename later costs a part-map change |
| The runtime check is confirmed, not changed | extending it by habit | if it misses a form, a non-24 image passes until the foundation step corrects it |
