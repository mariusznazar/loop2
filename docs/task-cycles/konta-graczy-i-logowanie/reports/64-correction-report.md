# Correction after the human's remarks: the target measurement on kernel 5.15

**Status:** done.

- Base: b018ee54f51bf307c272771d78c488fbb995812d. Head: 66a156fd5e52a189236aadd83b1f8d43d6a48abc. Branch task/konta-graczy-i-logowanie. Pin and checkout: 574a37b9ab9572f876298f4cc10754581222d3f0, both checked. The method files are the same as in my earlier rounds, because the pin did not move.
- Remarks: reports/63-human-remarks.md. Human decision A: measure under a limit equal to the budget, about 80 % of 512 MiB. The measurement fails if the kernel counted a hit of that limit or an OOM kill. `memory.peak` is no longer required.
- I did not read cycle.md, push, run anything on the server or dispatch an agent.

## Commit

| Commit | Content |
|---|---|
| 66a156fd5e52a189236aadd83b1f8d43d6a48abc | Judge the image password measurement by limit hits under 80% of the deployment's limit, so it runs on kernel 5.15 without memory.peak, and measure on the server with its own Node.js |

Author the owner's private address; staged by explicit paths.

## Changed paths (b018ee5..66a156f, added/removed)

| Path | + | − |
|---|---:|---:|
| `src/server/measure-passwords.ts` | 19 | 14 |
| `scripts/measure-passwords.mjs` | 29 | 17 |
| `tests/password-measurement.test.mjs` | 89 | 32 |
| `foundations/environment_facts.md` | 2 | 2 |
| `foundations/invariants.md` | 1 | 1 |
| `.claude/skills/loop2-deploy/SKILL.md` | 1 | 2 |
| `.claude/skills/loop2-deploy/references/setup_and_secrets.md` | 44 | 47 |
| `.agents/skills/loop2-deploy/SKILL.md` | 1 | 2 |
| `.agents/skills/loop2-deploy/references/setup_and_secrets.md` | 44 | 47 |

Not tracked by git:
- `reports/49-target-measurement-procedure.md` is rewritten to the new procedure (77 lines).
- The harness inputs under `.runs/account-linux-inputs/` are new: `correction64-red.tar`, `mutate-correction64.py`, `verify-correction64-mutation.sh` and `measure64-local.sh`.

## What changed

**Entrypoint (`src/server/measure-passwords.ts`).** It reads the memory counts of its container from cgroup v2 or v1. A missing peak no longer stops the measurement.
- On cgroup v2, `limitHitEvents` is the `max` count of `memory.events`, and `oomKillEvents` is its `oom_kill`.
- On cgroup v1, `limitHitEvents` is `memory.failcnt`, and `oomKillEvents` is `oom_kill` of `memory.oom_control`.
- `cgroupPeakBytes` comes from `memory.peak` or `memory.max_usage_in_bytes` where the file exists, otherwise `null`. It is information only.
- The measurement fails closed if `memory.events` names no `max` or no `oom_kill` count, or if neither cgroup layout is there.
- The v2 `oom` count is no longer read: there is no OOM state without a hit of the limit.

**Launcher (`scripts/measure-passwords.mjs`).**
- `--memory` is still the deployment's limit, at most 512m; the minimum is now 8m.
- The measurement container runs with `--memory` and `--memory-swap` equal to `measurementLimit(memory)`. That is 80 % of the deployment's limit, rounded down to whole MiB. For 512m it is 409 MiB, 428867584 bytes.
- The verdict needs all of these:
  - the container and its cgroup show that limit, with no swap;
  - `limitHitEvents` and `oomKillEvents` are both 0;
  - OOMKilled is false, the container did not restart and it exited 0;
  - every functional check passes.
- The peak is not judged.
- The launcher uses built-in modules only. Its header says it runs on Node.js 20.

**Skill `loop2-deploy` (both copies byte-identical).** In `references/setup_and_secrets.md`, the section "Measuring the password work of the deployed image" now gives only the server route: bash as root, in `/srv/loop2`, with the host's Node.js. The Windows PowerShell route is dropped (choice 3). In `SKILL.md`, the label line no longer points at a PowerShell form that is gone.

## The human procedure as it now stands

This is the text of `reports/49-target-measurement-procedure.md`. The same text stands in both skill copies, in `references/setup_and_secrets.md`.

> **What it needs.** A shell on the server as root, the shell the deployment is run from; the commands are bash. The host's Node.js, version 20 or later (`node --version`); the launcher uses only built-in modules, and the measurement itself runs on the image's own Node.js 24. The checkout `/srv/loop2`, which the deployment leaves at the deployed commit.
>
> 1. Check room for a temporary container of 409 MiB: `grep MemAvailable /proc/meminfo`. The value should be at least `1048576 kB`; otherwise wait.
> 2. Measure:
>
>    ```bash
>    sha=<the 40-character request head>
>    cd /srv/loop2
>    git rev-parse HEAD
>    docker inspect --type container --format '{{ index .Config.Labels "org.opencontainers.image.revision" }}' loop2
>    node --version
>    image=$(docker inspect --type container --format '{{.Image}}' loop2)
>    node scripts/measure-passwords.mjs --image "$image" --commit "$sha" --memory 512m > "/tmp/measure-$sha.txt"
>    echo $?
>    tail -n 1 "/tmp/measure-$sha.txt"
>    ```
>
>    `git rev-parse HEAD` and the label must both print `$sha`. If git refuses the checkout as root with `dubious ownership`, `cat /srv/loop2/.git/HEAD` prints the same commit. `--memory 512m` is the deployment's limit; the measurement runs under 409 MiB, 428867584 bytes.
> 3. Read the result.
>    - **0, `PASS`:** no hit of the 409 MiB limit and no OOM kill, so memory stayed below 80 % of 512 MiB. Copy the file's content into the report on the request, because `/tmp` does not keep it. It holds no password, hash, cookie or secret. On kernel 5.15 the peak reads `null`.
>    - **1, `FAIL: …`:** these lines mean the profile or gate must change in code, then rebuild, redeploy and measure again:
>      - `the container's memory reached its limit of 428867584 bytes`;
>      - `a process of the container was killed for lack of memory`;
>      - `the container was killed for lack of memory`.
>
>      `cgroup memory accounting is unavailable`, or another line naming a `cgroup file`, means the result cannot be judged and goes back to the cycle.
>    - **2, empty file:** wrong arguments; the reason went to the terminal.
>
> **What it changes:** one container from the deployed image is started and removed afterwards. It has no network, volume, secret or application environment, 409 MiB with no swap and no restarts. `loop2`, its volume and its secrets are untouched.

## Checks (command, exit)

Harness: Git Bash with `MSYS_NO_PATHCONV=1`; COMMON is `--network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly loop2-task22-verifier:latest`, and the target ref is 2c1d64ca287d014eb4b6f86be03849b55838428e. Every harness container ran detached (`docker run -d`). I waited with `docker wait` (the exit below is its output), then took `docker logs` into the named log and removed the container.

| # | Command | Exit | Result |
|---|---|---:|---|
| 1 | local: `npm run build`, `node --test tests/password-measurement.test.mjs`, eslint `--max-warnings 0`, prettier `--check`, `node scripts/build.mjs --check` | 0 | Quick feedback only: 11/11 pass, lint, format and types clean. Not the evidence of record. |
| 2 | `git bundle create .runs/account-linux-inputs/product.bundle task/konta-graczy-i-logowanie origin/main` | 0 | First at b018ee5 for the red runs, then at 66a156f; heads checked with `git bundle list-heads`. |
| 3 | `docker run -d --name loop2-task15-correction64-red COMMON bash /inputs/verify-session34-overlay.sh b018ee5… 2c1d64c… correction64-red.tar` | 1 | Overlay of only the new test file. It stopped on `SyntaxError: … does not provide an export named 'measurementLimit'`, a missing export rather than an assertion, so it is not counted as red. The log was overwritten by row 4. |
| 4 | the same with `--name loop2-task15-correction64-red2` and an overlay that adds a stub `measurementLimit()` returning 0 to the base's launcher | 1 | `64-correction-red.log`: failing first (below). |
| 5 | `docker run -d --name loop2-task15-correction64-mutation COMMON bash /inputs/verify-correction64-mutation.sh 66a156f… 2c1d64c…` | 1 | `64-correction-mutation.log` (below). |
| 6 | `docker run -d --name loop2-task15-correction64-local COMMON bash /inputs/measure64-local.sh 66a156f… 512m 64m` | 1 (the 64m control, by design) | `64-correction-local.log`; the values are under "Local measurement". |
| 7 | `docker run -d --name loop2-task15-correction64-final COMMON bash /inputs/verify.sh 66a156f… 2c1d64c…` | **0** | `64-correction-final.log`: **final head**. The checkout is 66a156f and the pin 574a37b; Node v24.22.1, Python 3.14.9. Node tests: 432 run, 432 pass, 0 fail, 0 skipped. Python: agent_workflow 5 (this includes the skill's twin-byte, frontmatter and sensitive-value checks), deploy 66, invariants 176, quality 40 with `skipped=3` (the Windows-only tests); "287 tests in 4 directories; every directory passed". Foundation check: `0 errors`. |
| 8 | `python C:/Users/Mariusz/.codex/skills/.system/skill-creator/scripts/quick_validate.py .claude/skills/loop2-deploy`, and the same for `.agents/skills/loop2-deploy` | 0, 0 | `Skill is valid!` twice. `cmp` of the three files of the two copies: identical. |
| 9 | `python -B .the-way/elements/common/foundation_check.py` at the head | 0 | `0 errors` |
| 10 | `git diff --cached --check` before the commit | 0 | clean |
| 11 | cleanup on the task's daemon: `docker image rm node:20`, then a count of containers, volumes and images | 0 | `c=0 v=0 i=0`. All five verifier containers I started were removed by name; `loop2-task15-dind` keeps running. |

**Not run:**
- The measurement on the test server, which is the human's.
- Real cgroup v2 in a container: the local daemon is cgroup v1. The v2 path, including the kernel 5.15 files without `memory.peak` from remark 4, is checked only through crafted files in the tests.
- The Windows full gate and the three Linux-skipped Windows tests.
- The persistence check across redeployment (remark 5), which is the human's.

## Failing first and mutation evidence

**Red run (row 4)**, on base b018ee5 with the new test file and a stub `measurementLimit()`. Node tests: 432 run, 424 pass, 8 fail, each on an `AssertionError`:
- "the entrypoint measures the production profile …": `undefined !== 0` for `memory.limitHitEvents`.
- "… cgroup v1 …": deepEqual shows `oomEvents: 3` where `limitHitEvents: 3` is expected.
- "… kernel keeps no peak, as kernel 5.15 does": status 1 with `cgroup file memory.peak is unavailable`. This is the server's failure, reproduced.
- "… does not count hits of its limit": `'cgroup file memory.peak is unavailable'` does not match `/memory\.events names no max/`.
- "the launcher passes a measured image …": four problems instead of none, among them "the container's memory limit is not the requested one".
- "the launcher passes a run whose kernel keeps no peak …": five problems, among them "the measurement reports no peak memory".
- "the measurement container's limit is 80% …": `0 !== 428867584`.
- "the launcher takes only a commit name …": deepEqual lacks `limitBytes: 428867584`.

"the launcher fails each run that breaks one bound …" passed on the base, because the old code fails every case, for other reasons. Its new rows ("one hit of the limit", "no count of limit hits", "another limit seen in the cgroup") are shown by the mutation below.

**Mutation (row 5)**, at head 66a156f in a disposable clone, two named faults together:
- h1: in the launcher, `if (memory.limitHitEvents !== 0)` became `if (memory.limitHitEvents > 0 && false)`, so it no longer judges limit hits. I had prepared `< 0` instead, but my sed edit of the mutation script did not apply; the form in the log is the one that ran.
- e1: on cgroup v2 the entrypoint reads `oom` instead of `max` for `limitHitEvents`.

Node tests: 432 run, 429 pass, 3 fail:
- e1 makes "… kernel keeps no peak, as kernel 5.15 does" fail: `limitHitEvents: 0` where 2 is expected.
- e1 makes "… does not count hits of its limit" fail: status 0, because a file without `max` but with `oom` is accepted.
- h1 makes "the launcher fails each run …" fail at `one hit of the limit`: `true !== false`.

**Restoration:** the task worktree was never mutated; row 7, the same commit unmutated, exits 0.

**Invariant tests:** none changed or added. No test cites `player-argon2-deployment-check` (method review) or the fact. The tests in `tests/password-measurement.test.mjs` cite no invariant, so no invariant mutation round was due.

## Local measurement (LOCAL ONLY: this does not satisfy player-argon2-deployment-check)

Source: `64-correction-local.log`.
- Application image sha256:d3e02de4384856451cfc313f19fb425430fbbc60be307bfd44e5319021599818, built from 66a156f on `loop2-task15-dind`; the launcher checked its label first.
- Daemon: Docker 29.9.2 linux/amd64, cgroup **v1**, cgroupfs, kernel 5.15.167.4-microsoft-standard-WSL2. The image has Node 24.22.1 and argon2 0.45.1; the profile is Argon2id m=65536 KiB, t=3, p=1, 32 bytes.

| Launcher Node | `--memory` | Container limit (Memory = MemorySwap) | Verdict | Details |
|---|---|---:|---|---|
| v24.22.1 (verifier) | 512m | 428867584 | **PASS**, exit 0 | 20 hashes and 20 verifications at two at once. Hash median 124 ms (118.4–154.3); verification median 123.3 ms (119.9–154.8); 2526 ms total. Limit hits 0; OOM kills 0; peak, information only, 152682496 bytes; current 18386944; process maximum resident memory 193597440; exit 0; no restart. Gate: 2 admitted, the 3rd refused, 2 admitted after release; right password accepted, wrong one rejected. |
| v24.22.1 | 64m (control) | 53477376 | **FAIL**, exit 1 | "the container was killed for lack of memory; the measurement exited with 137; the measurement printed no result". OOMKilled true. |
| **v20.20.2** (official `node:20` image sha256:8f693eaa…c9ba5, on the same daemon) | 512m | 428867584 | **PASS**, exit 0 | Same verdict. Hash median 139.6 ms; verification median 139 ms; 2804 ms total; limit hits 0; OOM kills 0; peak 153067520. |

After the runs: 0 leftover measurement containers, and the script's trap removed the image.

How Node 20 ran:
- `measure64-local.sh` created the `node:20` container on the task's daemon with `--network host`, which is the daemon's own isolated network namespace, not my computer's.
- It copied the verifier's docker CLI and the commit's `scripts/` into the container.
- It ran `node scripts/measure-passwords.mjs …` against `DOCKER_HOST=tcp://127.0.0.1:2375`.

The daemon stays bound to loopback inside its own namespace, and no host socket was used.

## Foundation and guideline consequences

Each entry was written by following its element skill's pinned instructions by hand (`.the-way/elements/invariants/skill/SKILL.md`, `.the-way/elements/environment-facts/skill/SKILL.md` and their templates).

**Environment fact `cgroup-memory-accounting`: changed in place.**
- Sentence on b018ee5: "Linux 6.12's memory controller records a cgroup's highest memory usage — in cgroup v2's `memory.peak` … in cgroup v1's `memory.max_usage_in_bytes` — counts the cgroup's processes killed by any OOM killer as `oom_kill` in v2's `memory.events` and v1's `memory.oom_control`, and counts in v1's `memory.failcnt` the times its usage hit its limit."
- New sentence: "Linux 5.15's memory controller counts the times a cgroup's memory usage was about to go over its limit — in cgroup v2 as `max` in `memory.events`, a count that includes the cgroup's descendants, and in cgroup v1 in `memory.failcnt` — and counts the cgroup's processes killed by any OOM killer as `oom_kill`, in v2's `memory.events` and in v1's `memory.oom_control`."
- Source: the kernel documentation at tag v5.15, `cgroup-v2.rst` (memory.events "hierarchical", `max`, `oom_kill`) and `cgroup-v1/memory.rst` (5.4 failcnt, 10. OOM Control). I fetched both with curl and matched every quoted passage word for word after whitespace normalisation, read 2026-10-27.
- The peak is no longer in the fact: nothing rests on it any more.
- Named by: `player-argon2-deployment-check` (Rests on) only; no decision's Based on names it.
- Meaning: „Kontroler pamięci Linuksa 5.15 liczy, ile razy zużycie pamięci grupy miało przekroczyć jej limit (v2: `max` w `memory.events`, łącznie z grupami potomnymi; v1: `memory.failcnt`), i liczy procesy grupy zabite przez OOM killer (`oom_kill`).”

**Invariant `player-argon2-deployment-check`: sentence changed.** Its Method stays review, Rests on stays `cgroup-memory-accounting`, Derives from stays D-106, its Parts stay, and Violated stays **yes**.
- Sentence on b018ee5: "The deployed loop2 container image has passed, under its 512 MiB memory limit and after warmup, at least 20 hashes and 20 verifications with the configured Argon2id cost settings two at a time, a correct and a wrong password check and the refusal of a third concurrent operation, with no out-of-memory kill or restart and with the peak memory of its container's cgroup below 80% of that limit."
- New sentence: "The deployed loop2 container image has passed, after warmup, at least 20 hashes and 20 verifications with the configured Argon2id cost settings two at a time, a correct and a wrong password check and the refusal of a third concurrent operation in a container limited, without swap, to at most 80% of its 512 MiB deployment limit, which did not restart and whose cgroup counted no hit of that limit and no out-of-memory kill."
- Tests citing it: none.
- Meaning: „Wdrożony obraz przeszedł po rozgrzewce co najmniej 20 skrótów i 20 sprawdzeń haseł po dwa naraz, sprawdzenie poprawnego i błędnego hasła oraz odmowę trzeciej operacji w kontenerze ograniczonym bez swapu do najwyżej 80% limitu 512 MiB, który się nie restartował i którego cgroup nie odnotował ani dotknięcia limitu, ani zabicia z braku pamięci — czyli pamięć została poniżej 80%.”
- Violated stays yes: „Nie spełnione dziś: pomiar na serwerze testowym jeszcze nie przeszedł; po wdrożeniu tej poprawki człowiek uruchamia go ponownie, a lokalny pomiar tego nie zastępuje.”

**Guidelines:** no change.
- `guidelines/testing.md` already lists `tests/password-measurement.test.mjs`.
- `guidelines/coding-password-hashing.md` still says the profile is provisional until measured in the intended image, which is true.

**Part map:** no change. account-server still measures its own password work in the image it runs in, and build-tools still launches and judges that measurement.

## Return step (step 11 of `.the-way/task-cycle/skill/SKILL.md`), for what I touched

| Entry or guideline | Compared with the code at 66a156f | Result |
|---|---|---|
| `player-argon2-deployment-check` | the launcher's verdict (`judge`), the container flags and `measurementLimit` | Corrected above. Matches. |
| `cgroup-memory-accounting` | the counters the entrypoint reads (`max`, `oom_kill`, `failcnt`, `memory.oom_control`) | Corrected above. Matches: the peak files are optional and not judged, so the invariant does not rest on them. |
| D-106 (cost settings set after measuring in the intended Mikrus image) | unchanged code path; the measurement now can run there | Matches, no change. |
| D-103 (gate cap selected by measurement within the container memory budget) | the gate is unchanged; the budget is now enforced as the container's limit | Matches, no change. |
| D-113 (profile provisional until the intended image is measured) | profile unchanged | Matches, no change. |
| part map: account-server and build-tools | the sentences on measuring and launching | Match, no change. |
| `guidelines/testing.md`, `guidelines/coding-password-hashing.md` | test file list and wording | Match, no change. |
| loop2-deploy skill (both copies) | the launcher's CLI, limits, messages and the server facts of the remarks | Corrected above. Matches. |

New source outside the product: the kernel 5.15 documentation, now cited by the changed fact. No new glossary word, decision or invariant.

## Choices (rejected way, cost if wrong)

1. **The container limit is 80 % of `--memory` rounded down to whole MiB: 409 MiB, 428867584 bytes.**
   - Rejected: exactly 429496729 bytes. The kernel rounds a limit down to whole pages, so the cgroup would show a different number from the one requested.
   - Rejected: page rounding in the launcher, which depends on the page size.
   - A whole MiB is a multiple of every page size, so the limit reads back unchanged.
   - Cost: 0.6 MiB stricter than 80 %.
2. **`--memory` still names the deployment's limit (512m)**, and the launcher derives the container's limit from it. Rejected: making `--memory` the container's limit, which changes the command the plan and the human already use and moves the 80 % arithmetic to the human. Cost: the container runs under a limit different from the one typed; both numbers are printed under `request`.
3. **The computer route is dropped and only the server route is kept.** The human has no SSH alias and ran it on the server; the launcher now runs on the host's Node 20. Rejected: keeping both routes, which means two procedures to keep correct, and the PowerShell one is untested against a real daemon. Cost: if Node is removed from the host, there is no route until one is written; the skill states that Node 20 or later is needed.
4. **A limit hit fails the measurement even when reclaim recovered from it** (v2 `max`, v1 `failcnt`). This is the human's rule ("never hit that limit"). Rejected: judging only OOM kills, which is weaker than "the peak stayed below 80 %". Cost: page cache close to the limit could fail a run whose working memory fits. Locally the peak is 37 % of the 409 MiB limit, so the margin is wide.
5. **The v2 `oom` count is no longer read**, because every OOM state follows a hit of the limit. Cost: the report shows one count fewer.
6. **The fact now cites kernel 5.15 instead of 6.12**, the kernel of both the test server (5.15.158-2-pve) and the local daemon (5.15.167). Rejected: keeping 6.12 and adding 5.15. Cost: a later kernel move needs the fact re-read.
7. **Skill fallback for git as root:** `cat /srv/loop2/.git/HEAD`, which prints the commit because the deployment leaves the checkout detached. Rejected: `git -c safe.directory=…`, whose acceptance on the command line depends on the git version. Cost: the line reads git's internal file.

## Reading reaches

- `reports/64-correction-handoff.md` and `reports/63-human-remarks.md`, whole.
- task.md lines 33–35 (To do 8 and 10), 120–124 (Human actions) and 165 (projected `player-argon2-deployment-check/1`).
- At b018ee5: `src/server/measure-passwords.ts`, `scripts/measure-passwords.mjs` and `tests/password-measurement.test.mjs`, whole; the loop2-deploy skill's sections "Agent or human", "Seeing deployments", "Deploying a request head", "Measuring the password work" and the setup header.
- The current foundation entries `player-argon2-deployment-check`, `password-operation-gate` and `cgroup-memory-accounting`; D-103, D-106 and D-113 (first paragraphs); grep of guidelines, the part map and decisions for the measurement and the peak.
- `.the-way/task-cycle/skill/SKILL.md` lines 300–330 (steps 9–11); the element skills and template, as read in the earlier rounds at the same pin.
- `reports/57-reconcile-report.md` "Checks" (via grep), and the `quick_validate.py` path from `reports/51-*`.
- Kernel documentation v5.15 (cgroup-v2.rst and cgroup-v1/memory.rst), fetched into the scratchpad.
- Not read: cycle.md.

## Observations

- The local daemon is cgroup v1, so the v2 counter path ran only against crafted files. The first real v2 run will be the human's on the server, whose remark 4 shows `memory.events` with `max` and `oom_kill`, as the new code expects.
- The handoff's line on old decision numbers (D-94..D-115 are now D-96..D-117) did not affect this change: the code and tests name no decision, and the entries keep their links.
