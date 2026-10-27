# The human's remarks on request #32 (correction after review)

Request: https://github.com/mariusznazar/loop2/pull/32, head b018ee54f51bf307c272771d78c488fbb995812d. The target branch has not moved (origin/main 2c1d64ca287d014eb4b6f86be03849b55838428e is already merged); the pin matches.

## What happened on the test server (human actions, 2026-10-27)

1. The session key file was created by the human; the orchestrator read only its metadata: `root 1000 440`, 48 bytes.
2. The human deployed b018ee5 with `loop2-deploy`; exit 0. Orchestrator reads: application label b018ee5, both containers `running healthy`, limits 536870912 and 268435456 bytes, internal probe `200 text/html` and `404 application/json`, volume `loop2_accounts` present, application at 41 MiB.
3. The human has no SSH alias on the computer, so the measurement ran **on the server** in bash as root, from the checkout `/srv/loop2` (at b018ee5), with the host's Node.js **v20.19.0** (`/bin/node`; `node --check scripts/measure-passwords.mjs` passed there):
   `node scripts/measure-passwords.mjs --image "$image" --commit "$sha" --memory 512m > /tmp/measure-$sha.txt` → exit 1, last line:
   `FAIL: the measurement exited with 1; cgroup file memory.peak is unavailable; the measurement reports a failure; the measurement reports no measured operations`
   The JSON report: container exit 1, `oomKilled` false, restarts 0; result versions node 24.22.1, argon2 0.45.1, linux-x64, kernel `5.15.158-2-pve`; errors `cgroup file memory.peak is unavailable`. No measured operation ran. The measurement container left nothing behind.
4. Server facts read by the orchestrator: kernel `5.15.158-2-pve` (a Proxmox LXC guest), `/sys/fs/cgroup` is `cgroup2fs`, Docker 28.1.1 with cgroup version 2 and the systemd driver. In the running `loop2` container's cgroup (both from the host, `/sys/fs/cgroup/system.slice/docker-<id>.scope/`, and from inside the container, `/sys/fs/cgroup/`) the memory files are: `memory.current memory.events memory.events.local memory.high memory.low memory.max memory.min memory.numa_stat memory.oom.group memory.pressure memory.stat memory.swap.current memory.swap.events memory.swap.high memory.swap.max` — **no `memory.peak`**. `memory.events` reads `low 0`, `high 0`, `max 0`, `oom 0`, `oom_kill 0`; `memory.max` 536870912.
5. The human walked the public journey (step 5 of the skill's "Deploying a request head and accepting it") on b018ee5 and reported no problem; the persistence check across a redeployment is still to be done after this correction's deployment.

## The human's decision (binding)

The measurement must work on this server. Of the ways the orchestrator laid out, the human chose **A**:

> Measure under a memory limit equal to the budget — 80 % of 512 MiB, about 410 MiB — and require that the kernel never hit that limit and killed nothing (the `max` and `oom_kill` counters of `memory.events`, which kernel 5.15 has). If the limit was never reached, the peak stayed below 80 %. The invariant's meaning stays.

Rejected: B (sampling `memory.current` and taking the maximum — a short spike can be missed, weaker than the invariant promises) and C (leaving the measurement undone).

## What the correction must cover (orchestrator's reading of the remarks)

- The measurement entrypoint (`src/server/measure-passwords.ts`) and launcher (`scripts/measure-passwords.mjs`): run the measurement container under the budget limit (no swap beyond it) and judge it by "no limit hit, no OOM kill, no restart, functional checks pass" from counters the kernel has — on cgroup v2 `memory.events` `max` and `oom_kill`; on cgroup v1 (the local harness) the equivalents (`memory.failcnt`, `memory.oom_control` `oom_kill`) — with the peak reported where the kernel offers one (`memory.peak`, `memory.max_usage_in_bytes`) as information, not as the verdict. `memory.peak` must no longer be required.
- The launcher must run with the server host's Node.js 20 as well as Node 24 (it uses built-in modules only today); show it.
- Tests: the existing measurement tests evolve; each changed or new invariant test is seen failing under a plausible deliberate mutation and restored through full npm test.
- Foundation, through the element skills: `player-argon2-deployment-check` (its sentence names a 512 MiB limit and a cgroup peak below 80 % of it) and `cgroup-memory-accounting` (its source and wording must cover the v2 `memory.events` counters on kernel 5.15, not only 6.12) are corrected to what the code now does, keeping the meaning the human chose; any other entry the change touches.
- The `loop2-deploy` skill (both copies, byte-identical) and the procedure file: the measurement section gives the route that works for this owner — on the server, in bash as root, from `/srv/loop2` at the deployed commit, with the host's Node.js — and keeps or drops the computer route as you judge; the failure line about `memory.peak` changes accordingly.
