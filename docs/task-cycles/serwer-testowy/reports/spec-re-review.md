# Spec re-review — serwer-testowy

**Status: Issues Found.** The revision settles the five earlier findings and follows the
orchestrator's rulings, but two new blocking issues remain. First, the human actions cannot be
carried out in the order the spec gives, because the design deploys only commits of `main` while
the request stays unmerged. Second, the script's verification relies on a test seam that the
spec's own script rules forbid. Reviewer: fresh agent (Claude Code, claude-opus-5-5). I read the
spec, the frozen task, `definicja_mvp_loop2.md` (the three projected decisions, the three
invariants and the gate record), `plan_mvp_loop2.md` (row 2, Projected entries, Change log),
`foundations/*.md`, `src/server/*.ts`, `package.json`, `package-lock.json`, `scripts/build.mjs`,
README, `tests/startup.test.mjs` and the typecheck, runtime and one-serving-process checks with
their support module, WAY-126 and WAY-140 at the pinned `.the-way`
(d04c3feb1a47e0ffc9a3b2354c23aacafe25c74b, equal to the gitlink), `spec-review.md`,
`design-revision-prompt.md` and `design-revision.md`. Nothing was changed apart from this file.

## Earlier findings

| Finding | State | Evidence |
|---|---|---|
| F1 — settlement mapping | Resolved. Every settlement row, projected entry and part-map change has its own row, and the deferred task-15 entries are named. This matches plan row 2 (Where/How/What-serves decisions, the three invariants, runtime and typecheck realized). | `spec.md:277-303`; `plan_mvp_loop2.md` Projected entries |
| F2 — mutable SHA tags | Ruled moot. The image history is dropped, and a rollback is a rebuild of an earlier commit of `main`. | `spec.md:45-46`, `spec.md:242-248` |
| F3 — rollback across a port change | Resolved. The host port stays at 18080, and the skill says a rollback across a port change also needs the Origin Rule changed. With no history there is nothing to order. | `spec.md:85-87`, `spec.md:246-247` |
| F4 — installed script versus source | Resolved as ruled: the script compares the installed copy with the source, warns and continues; the human reinstalls and keeps the previous copy. | `spec.md:116-120`, `spec.md:152-156`, `spec.md:261-262` |
| F5 — resource gate | Resolved as ruled: thresholds with their reasoning, values logged on every run, and the `loop` state logged after the build stage. | `spec.md:157-161`, `spec.md:172-174`, `spec.md:187-196` |

## Blocking findings

### B1 — The human actions cannot be done before merge, yet the request must stay blocked until they are

The spec makes the request wait for all five human actions (`spec.md:24-25`, `spec.md:331`).
It also deploys only commits that are an ancestor of `origin/main` (`spec.md:146-148`). WAY-140
says the human performs in-cycle actions "at the request"
(`.the-way/foundations/decisions.md:4227-4229`). At that point `main` (base 1701186) has no
`Dockerfile`, `compose.yaml`, workflow or `deploy/loop2-deploy`. Three consequences follow:

- Action 3 says "clone the repository to `/srv/loop2`; install `deploy/loop2-deploy`"
  (`spec.md:337-338`). The file exists only on `task/serwer-testowy`, and the spec does not say
  where the human takes it from.
- Action 5 says "run `loop2-deploy <current main sha>`" (`spec.md:342`). That commit has nothing
  to build, so the run fails (exit 7, or an earlier error about the missing Compose file). The
  commit of the request itself is refused with exit 3 (`spec.md:146-148`).
- "Then let a push to `main` deploy through the workflow" (`spec.md:344-345`). The workflow
  reaches `main` only by merging, and the merge is itself the push that triggers it
  (`spec.md:97`). If the merge comes before actions 1, 2 and 4 are done, that first run on `main`
  fails.

So acceptance criterion 1 (`task-frozen.md:23`) and To do 2 (`task-frozen.md:16`) cannot be
observed while the request is a blocked draft. The plan writer would inherit a setup sequence that
cannot be carried out. The spec has to choose an order. Ways open, for the orchestrator to rule:

- **(a) Merge, then check.** Actions 1, 2 and 4 are done at the blocked request. Action 3 installs
  the script from the task branch (for example from `origin/task/serwer-testowy` in the server
  clone). The human merges, the workflow run of the merge commit is the first deployment, and the
  action-5 checks follow it.
  - Cost: acceptance is observed after merge. The spec must say what happens if the checks fail
    (a revert PR, or a follow-up). The IPv6 environment fact then cannot enter this request.
- **(b) A human-only first deployment of the task-branch commit.** The script accepts that
  commit only when it is run without `SSH_ORIGINAL_COMMAND`; the key's path is unchanged.
  - Benefit: everything is observed before merge, and the IPv6 fact can enter the request.
  - Cost: a second mode inside the trust-boundary script. It reverses "nothing … can select
    another mode" for humans (`spec.md:129-130`) and needs its own adversarial tests.
- **(c) A one-off manual `docker compose build/up` from the task-branch checkout.**
  - Cost: the script is not proven before merge, and the `loop2-deploy` restore line has no
    script-built predecessor.

Whichever way is chosen, the spec should list the actions in order relative to the merge. It
should also state that secrets, the key and the installed script must exist before the merge,
because the merge's push triggers the workflow at once.

### B2 — The script's behaviour tests rely on a seam the script forbids

The script "sets its own fixed `PATH` … and takes its paths from constants in the script"
(`spec.md:128-130`, constants at `spec.md:132-134`). Its behaviour tests, however, run it "with
stub `docker`, `curl` and `flock` commands first on `PATH` and a temporary Git repository standing
in for GitHub" (`spec.md:313-321`). With a fixed `PATH` the stubs are never found. Two outcomes
follow:

- On a Linux developer machine the script would call the real `docker`, including
  `compose build/up` and `image prune`.
- On this Windows machine `docker` sits outside any fixed Unix `PATH`, so calls fail and the
  stages cannot be told apart.

The constants have the same problem. `/srv/loop2`, `/usr/local/bin/loop2-deploy`,
`/var/log/loop2-deploy.log` and `/run/loop2-deploy.lock` cannot point at a temporary repository.
The resource-gate test "refuses below each threshold" cannot control `MemAvailable` (read from
`/proc/meminfo`) or the free disk space (no `df` stub is listed). The adversarial-input tests
(`spec.md:309-312`) must show refusal "before git or Docker is called", but no stub can record a
call. That breaks the WAY-48 checks the cycle depends on.

The spec should name the seam. One way: all constants (`PATH`, the four paths, the meminfo
source) sit in one block at the top. The tests run a temporary copy in which only that block is
replaced, and assert that the rest is byte-identical to `deploy/loop2-deploy`. Add a `df` stub (or
read free space through the stubbed `docker`). Add a guard that aborts the test if `docker`
resolves outside the stub directory. Whatever seam is chosen must be unreachable from the forced
command.

## Non-blocking notes

1. **Run account (no account named).** The spec never says which account the script runs as. It
   writes `/run` and `/var/log`, needs Docker access, uses the GitHub SSH alias for `git fetch`,
   and works on a clone the human made. If the clone's owner differs from the account running the
   script, git's safe-directory check may refuse it. If the alias sits in another account's
   configuration, the fetch fails. The spec should say: "the clone, the read-only key's alias,
   manual runs and the forced command all use the one account the automation key logs into".
2. **Health probe and the container check.** `HEALTHCHECK` periodically starts a second Node.js
   process (`spec.md:70-72`), and `init: true` adds a process with PID 1 (`spec.md:89-91`). The
   container part of `loop2-one-serving-process` (`spec.md:291`) should count listening processes
   and their children, not Node.js processes. The local `docker run` should use `--init` like
   Compose, or the check sees a different process tree from the server's.
3. **Nothing checks acceptance criterion 2.** No verification line checks that the repository and
   the request contain no access values (`task-frozen.md:24`). Add a pre-request scan for IPv6
   literals and for the values held in the owner's note. Also add a rule that script output, which
   reaches the Actions log (`spec.md:108-109`), never prints `docker info` whole, `hostname` or
   `uname -n`. On this host the Docker host name may equal the server name, and GitHub masks only
   exact secret strings.
4. **Old-game check per deployment.** After the first deployment, acceptance criterion 1 rests
   only on the logged `loop` container state. The workflow's public probe (`spec.md:110-112`)
   could also request `https://kantarion.bieda.it/` at no cost. This is optional.
5. **IPv6 environment fact has no writer.** "Not in this request" (`spec.md:300`) follows the
   ruling, but no later task is named to write it, so it may never be written. Under B1 way (b)
   it could enter this request; under way (a) it needs a named follow-up.
6. **Memory limit unverified on this host.** `mem_limit: 512m` (`spec.md:88`) is unverified on an
   unprivileged LXC host. The first-deployment checks should read the applied limit
   (`docker inspect` `HostConfig.Memory` or the `docker stats` limit) rather than assume it.
7. **Trust boundary of the workflow.** The cycle record lists the deploy workflow as a
   trust-boundary file (`cycle.md`, Sharpness row). The spec's part-map row names only
   `deploy/**` (`spec.md:299`). One of them should be changed so they agree.
8. **README.** Its last sentence says deployment does not belong to the skeleton. That becomes
   false; change it together with the one-line addition (`spec.md:59`), in Polish like the rest of
   the file.
9. **Skill copies.** The two skill copies (`spec.md:224-226`) have no check that they stay
   identical. The existing `.claude/skills` and `.agents/skills` are identical today, so a small
   test would keep them so.
10. **Pre-merge copy of the script.** The script handles a checked-out commit without
    `deploy/loop2-deploy` or `compose.yaml` (any commit from before the merge) only implicitly,
    through a build failure. Step 7 should warn rather than crash when the source file is
    missing.

## Checks against the task and sources

- **To do 1–5:** all covered.
  - 1: Docker container beside `loop` (`spec.md:80-93`).
  - 2: Cloudflare route and public probe (`spec.md:206-220`, `spec.md:110-112`).
  - 3: push to `main`, the server pulls, the key is limited to commits of `main`
    (`spec.md:95-204`).
  - 4: Node.js 24 image, type check in the image build (`spec.md:63-66`).
  - 5: every skill topic, including the rollback step count and what happens to data
    (`spec.md:233-264`).
- **Acceptance criteria:** criterion 1 is checked by human action 5 plus `loop` logging, subject
  to B1. Criterion 2 is stated but has no check (note 3).
- **Questions carried to the cycle:** all five answered (`spec.md:51-59`, `spec.md:61-93`,
  `spec.md:116`, `spec.md:216-217` with `spec.md:300`, `spec.md:291-292`).
- **Human actions:** the five match `task-frozen.md:68-72`; their order is B1.
- **Invented behaviour:** none beyond the task, the rulings and the carried questions. The
  public probe, the exit codes and `init: true` are design detail serving To do 2 and 3.
- **Foundation:** no contradiction found.
  - D-05/2 gains only "in the loop2 container", as WAY-126 and the frozen task require.
  - The listen defaults keep `account-server-occupied-address/1` and `tests/startup.test.mjs`.
  - The runtime check reads `FROM node:24-slim`; the workflow and Compose name no Node.js image.
  - The typecheck tripwire (`tests/invariants/loop2_invariant_support.py:299-335`) will match
    `Dockerfile`, `compose.yaml`, the workflow and `deploy/*`. The spec plans to extend it.
  - The lockfile holds `@typescript/typescript-linux-x64` 7.0.2, so `npm ci` in `node:24-slim`
    can install the native compiler.
- **Access values:** I searched the spec for IPv6 patterns, five-digit ports other than 18080,
  Mikrus host-name forms and an SSH user. None were found. "root" appears only as the
  filesystem, the owner of the installed copy, and the account the MCP runs as.

## What can run here (Docker daemon not running on this Windows machine)

- **Runs:**
  - `npm test`, including the new tests for the listen variables;
  - the invariant gate and the format guards;
  - static checks of the Dockerfile, Compose file and workflow by the invariant checks;
  - `docker compose config` — Compose CLI v5.4.0 is installed and needs no daemon. It differs
    from the server's v2.35.1, so a pass here does not prove the server accepts the file;
  - `bash -n` and the script tests under Git Bash, once the B2 seam exists.
- **Stays unchecked:**
  - the whole Image section (`spec.md:322-325`): build, Node.js 24 at runtime, non-root, one
    listener, `GET /`, `/api/` 404, health check, type error failing the image build;
  - the container part of `loop2-one-serving-process` and of the typecheck check's image proof;
  - what the `.dockerignore` actually leaves in the build context;
  - real `flock` serialization: Git Bash has no `flock`, and a stub proves nothing about locking;
  - `shellcheck` and `actionlint`: not installed;
  - everything on the server and in Cloudflare (IPv6 publication of 18080, Cloudflare reaching an
    IPv6-only origin, the forced command with `restrict`, the real resource values, the memory
    limit) until the human's first deployment.

## Revision 2 review

**Status: Approved** (with three non-blocking notes). This is a scoped check of the second
revision (`spec.md`, revised under `reports/design-revision-2-prompt.md`; summarized in the
"Revision 2" section of `reports/design-revision.md`). Same reviewer; only this section was added.

### B1 and B2

| Item | Applied as ruled | Evidence |
|---|---|---|
| B1, way (b): two input paths | Yes. The automation path fetches `main` only and accepts only commits of `origin/main`. The human path (no `SSH_ORIGINAL_COMMAND`, one argument) fetches every branch head and accepts a commit of any branch. | `spec.md:141-158`, `spec.md:182-190` |
| Why the automation key cannot reach the human path | Stated. The forced command replaces whatever command the client sends, so no argument can arrive. A client that sends no command leaves the input empty, and the run is refused. | `spec.md:152-156` |
| Refs left by a human run do not widen the automation path | Stated: that path tests only the freshly fetched `origin/main`. | `spec.md:188-190` |
| Human actions in order, all before the merge | Yes. The script is installed from the request's head commit. The key and secrets are set before the merge, because the merge starts the workflow. The first deployment uses the human path with the request's head commit, and the checks include the applied memory limit. | `spec.md:25-26`, `spec.md:120-121`, `spec.md:404-430` |
| Who writes the IPv6 environment fact | This request writes it, in a correction made from the human's reported observation; the foundation step does not write it. | `spec.md:262-264`, `spec.md:352`, `spec.md:424-425` |
| A failed first automated run after the merge | Covered in the spec and the skill. | `spec.md:313-316`, `spec.md:327`, `spec.md:428-430` |
| B2: one marked block of constants | Yes, including the thresholds, the waits, the port, the branch and the Docker names. No environment variable or argument changes a constant. | `spec.md:160-167` |
| B2: how the tests use that block | The tests replace only that block in a temporary copy and check that the rest is byte-identical to the source. Recording stubs stand in for `docker`, `curl`, `flock` and `df`. A guard stops the test if any of the four resolves outside the stub directory. | `spec.md:361-369` |
| B2: new attack-input tests | Added: a commit only on another branch sent through the automation path (exit 3, while the human path accepts it), a connection with no command, both inputs at once, two arguments. | `spec.md:370-376` |

### Notes 1–10

All ten are applied as ruled:

| Note | Evidence |
|---|---|
| 1 — one run account, not named | `spec.md:135-139`, `spec.md:408`, `spec.md:411`, `spec.md:416` |
| 2 — the container check counts listening processes and their children; runs with `--init` | `spec.md:343` |
| 3 — scan for access values; output rule | `spec.md:169-172`, `spec.md:385`, `spec.md:392-394` |
| 4 — workflow probe of `kantarion.bieda.it` | `spec.md:115-119` |
| 5 — settled by B1 | `spec.md:352` |
| 6 — applied memory limit checked | `spec.md:422-423` |
| 7 — trust boundary is `deploy/**`; the workflow is called security-sensitive | `spec.md:122-125`, `spec.md:243-244`, `spec.md:351` |
| 8 — README, in Polish | `spec.md:61-64` |
| 9 — test that the two skill copies match, in part `agent-workflow` | `spec.md:351`, `spec.md:390-391` |
| 10 — a missing script source gets a warning, then exit 7 | `spec.md:198-201`, `spec.md:384-385` |

### Contradictions and access values

- **No new contradiction.** The automation key is still limited to commits of `main`. That keeps
  To do 3 (`task-frozen.md:17`) and the projected decision "How does a change reach the server?"
  taken literally. The human path is a human action on the server, which settlement row 3 and
  WAY-140 already assign to the human.
- **The foundation table is otherwise unchanged.** The error table, the skill's exit-3 wording and
  the human actions agree with each other (`spec.md:303`, `spec.md:322`, `spec.md:327`).
- **No access values.** I searched the spec and the design report again for IPv6 literals,
  five-digit ports other than 18080, Mikrus host-name forms and the second workload's name. None
  were found.

### Non-blocking notes

1. **Line endings on this machine.** Git here has `core.autocrlf=true`, set in
   `C:/Program Files/Git/etc/gitconfig`. The repository has no `.gitattributes`, and tracked files
   are written out with Windows line endings (`git ls-files --eol` shows `w/crlf`). So
   `deploy/loop2-deploy` will carry those endings in this worktree. Git Bash then fails on the
   copy the tests run, while the byte-identical check still passes, because both files carry the
   same endings.
   - Fix: add a `.gitattributes` line `deploy/** text eol=lf` and give that file a part in the
     part-map change.
   - Without it, the script tests fail on this machine for a reason unrelated to the script. The
     server is not affected: its clone and `git show` use Unix line endings.
2. **Two variants of the exit-3 test.** The test "a commit only on another branch, sent through
   the automation path" (`spec.md:375-376`) should cover two states. Once the commit is absent
   from the clone, and once it is present because an earlier human run fetched it. Only the
   second state tests the claim at `spec.md:188-190`.
3. **A correction that changes the script.** Corrections to the request after human action 5 add
   commits: at least the one that writes the IPv6 fact, and any review fixes. If one of them
   changes `deploy/loop2-deploy`, the copy installed at action 3 is stale. The merge's automated
   run would then only warn (`spec.md:194-198`). The human actions could say that the human
   reinstalls the script before the merge when a correction touches it.

The cycle record's summary table still lists the workflow among the files where untrusted input
enters; it is the orchestrator's to change, not the spec's (see the "Revision 2" section of
`reports/design-revision.md`).
