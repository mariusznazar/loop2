# Report — executor of slice 21: flaky: the container's one listening process killed with code 137

**Status:** done with concerns

The concern: the cause below is shown by a deterministic reproduction and by 137 coming back
spontaneously in the test's own sequence under disk load, but the real case's own runs under that
load failed only in the mirror form of the same race (`database is locked`, 2 of 30), not with 137;
and what happened in loop2#78 itself cannot be read back (its container log was not kept). The tie
of loop2#78's 137 to this race is therefore an inference, marked as such below.

## Files and commits

- `tests/invariants/account_container_support.py` — +29 −1
- `tests/invariants/test_loop2_one_serving_process_container.py` — unchanged (the cause lies in the
  support's start sequence, not in the case)
- Commit (range from base `4bfc33cd70b9b1b779338c45e1a8ef541d7f2744`):
  - `74e5365c62267d3e3b7f076f99c316aff13cab90` test: :bug: make start_application wait for the server's readiness line before it returns, ...

## Cause, with its evidence

**What fails (loop2#78, as its description records it):** `AssertionError: 137 != 0 : node cannot
use fresh account resources` — the exit code of `docker exec -i <container> node -` running
`RESOURCE_PROBE` in `verify_account_resources` (`tests/invariants/account_container_support.py`,
called by `start_production_container` at line 208 of the case).

**Mechanism (verified).** Before the change, `start_application` returned as soon as `docker run -d`
did, and `verify_account_resources` ran the probe at once. The probe opens the account database
(`new AccountDatabase(path)`) while the server, started at the same moment, opens it in its start
(`openAccountRuntime`, `src/server/configuration.ts:223`). On a fresh volume both migrate the new
database in a `BEGIN IMMEDIATE` transaction with `synchronous = FULL`, and each waits for the other
at most its busy timeout of 1000 ms (`src/server/database.ts:250-252`, 280-295). Whichever holds the
write lock longer than that makes the other fail with `SQLITE_BUSY` (errcode 5):

- the probe first and slow → the server's start fails (`main.start`, errcode 5), the server exits,
  the init process exits, the container stops, and the kernel kills the probe still running in it:
  `docker exec` returns **137**;
- the server first and slow → the probe fails with `Error: database is locked` and exit 1.

Facts shown, each by a run in a working copy under `.runs/executor-21/` (removed):

1. *`docker exec` gives 137 when the container's main process ends under it:* a container whose
   main process sleeps 3 s, with `docker exec ... node -e "setTimeout(()=>{},20000)"` in it →
   exec exit **137**, container `exited 0`, `OOMKilled false`.
2. *E1, a process of the container holding the fresh database's write lock at the server's start:*
   an exec right after `docker run -d` that opens the database, takes `BEGIN IMMEDIATE` and holds it
   N ms (the image's own Node and `node:sqlite`), in the support's own start sequence: N = 3000 →
   **5 of 5** exec exit **137** after 1.13-1.14 s, container `exited 1`, `OOMKilled false`, its log
   `{"failure":"Invalid or unavailable account configuration: LOOP2_DATABASE_PATH","kind":"Error","code":"ERR_SQLITE_ERROR","errcode":5,"place":"main.start"}`;
   N = 700 (under the busy timeout) → **3 of 3** exec exit 0, container running, log
   `Loop: http://0.0.0.0:3000`. The exec took the lock before the server in every one of these runs.
3. *E2, the race in the test's sequence, timed:* fresh volumes, `start_application` as it stood
   before the change, and at once a probe identical to `RESOURCE_PROBE` up to and including
   `new AccountDatabase(path)`, with the VM's clock read around the opening:

   | Conditions | runs | exec 137 | probe begins opening (after container start) | opening took | server's readiness line |
   |---|---|---|---|---|---|
   | alone | 10 | 0 | 253-303 ms | 29-37 ms | 421-477 ms |
   | 40 spinning threads on the host (one Node process, 2 per logical CPU; 20 logical CPUs) | 10 | 0 | 3694-4324 ms | 2-13 ms | 2954-3313 ms |
   | 4 fsync writers in the Docker VM | 10 | 0 | 571-1133 ms | 53-377 ms | 898-1417 ms |
   | 12 fsync writers in the Docker VM | 10 | **2** | 790-2273 ms | 15-565 ms (passing runs) | 1221-3056 ms |

   The two 137s under 12 writers: container `exited 1`, `OOMKilled false`, the same `main.start`
   errcode 5 line in its log. So alone the probe opens the database *before* the server (it is a race
   on every run, won by a margin of ~30 ms against 1000 ms); host CPU load delays the `docker exec`
   from Windows so much that the server finishes first and there is no race; disk load in the VM
   stretches both openings, and past 1000 ms one of them fails.
   The fsync writer: a container of the same image, `--user 0`, its own volume, running
   `while true; do dd if=/dev/zero of=/data/big bs=1M count=1024 conv=fsync; rm -f /data/big; done`.
4. *Not memory:* in every run here the daemon's `oom` events and the VM's kernel log
   (`wsl -d docker-desktop dmesg | grep -i -c -E 'oom|killed process|out of memory'`) showed **0**
   out-of-memory kills. E4, the case's own sequence (resource probe and HTTP probe) on this VM's
   cgroup v1, 5 runs: `memory.max_usage_in_bytes` 96 870 400-97 648 640 B of the limit 536 870 912 B,
   `memory.failcnt` 0, `oom_kill` 0 — the container peaks at ~18 % of 512 MiB.

**Link to loop2#78 (inference, not verified):** loop2#78 gives only the assertion line; no container
log or `OOMKilled` state was kept. 137 there is explained by the race above (the only way I got 137
in any run, with `OOMKilled false` and the server's busy failure in the log); it appeared in a run of
the whole gate, where the directories of Python tests run at once and other tests build images and
run containers in the same VM, and loop2#78 records that the computer hung twice in that cycle. The
memory explanation the slice's title suggests is not supported: the container uses ~97 MB of its
512 MiB and no kill was recorded as out-of-memory. The 512 MiB limit, `compose.yaml`, the
`Dockerfile` and D-106, D-113, D-390, D-406 are not involved and were not changed.

**Observation, not acted on:** the server ending its start when another connection holds the write
lock past its busy timeout is the product's bounded behaviour as D-112 states it ("the opening of a
database succeeding or failing within the busy timeout"); in production the same would happen to a
start that met a long write of an operator's command or of the backup command. Nothing of that is
this slice's to change.

## Repair

`start_application` now waits, after `docker run -d`, until the server prints its readiness line
(`Loop: http://`, `READY_LINE`), polling `docker inspect` for the running state and then
`docker logs` every 0.25 s, at most `READY_WAIT` = 60 s. It fails with the container's log where the
container stops before the line (`the container stopped before the server's readiness line`) or the
line does not come in 60 s. The server prints that line only after it has opened and migrated the
database (`src/server/main.ts`, after `openAccountRuntime`), so the probe opens an existing database
beside the server's connection, which is what D-112 describes ("The account server opens one
application-owned SQLite connection before readiness, and ... each open one short-lived connection
beside it"); the function cites D-112 with that opening passage.

Placed in `start_application`, not only in the case, because every caller runs the same sequence:
`start_production_container` (this case, `tests/invariants/test_loop2_container_icons.py`,
`tests/invariants/test_loop2_container_sprites.py`, `tests/deploy/test_loop2_image_icons.py`) and the
callers of the three steps (`tests/deploy/test_account_backup_stream.py`,
`tests/deploy/test_account_storage.py`, `tests/deploy/test_restore_trial.py`). The case's assertions
are unchanged; the probe's `databaseFile: true` is now a file the server created, while the probe's
own write to `/app/data` (`node-write-probe`) still proves that node writes the volume.

**Choices, with the ways rejected:**

- Wait on the readiness line, not on the image's health check (first check after 5 s, about 5 s
  more per start, and tied to the `Dockerfile`), and not on an HTTP probe in the container (a
  `docker exec` per poll, and port 3000 written into the support). Cost if wrong: the line's text is
  the server's; a change of it fails every container test at once with the container's log, never
  silently.
- Not retrying the probe on 137 or `database is locked` — that would hide the race; not raising the
  server's busy timeout — product code bound by D-112.
- 60 s for the line: the slowest readiness seen was ~3.3 s after the start (40 spinning threads); the
  same 60 s stands as `LISTEN_WAIT` in the case.

## Checks (command and exit code)

Every run of the case below is a process of its own: `npm.cmd test -- tests/invariants/test_loop2_one_serving_process_container.py`
(3 tests in the file, the container case among them), run by a loop script in `.runs/executor-21/`
that kept each run's log; Docker Desktop was started by the case's own `docker_gate` in the first run
(exit 0, 20 s). Docker Desktop 29.7.2, kernel 5.15.167.4-microsoft-standard-WSL2, cgroup v1, 20 CPUs,
16.65 GB for the VM.

| Series | Code | Conditions | passed | failed | not run |
|---|---|---|---|---|---|
| before the repair | base `4bfc33cd` | alone | 30 | 0 | 0 |
| before the repair | base `4bfc33cd` | 12 fsync writers in the Docker VM (as in E2) | 28 | 2 | 0 |
| after the repair | the change (committed as `74e5365c` without further edits) | alone | 30 | 0 | 0 |
| after the repair | same | 12 fsync writers in the Docker VM | 30 | 0 | 0 |
| after the repair | same | 40 spinning threads on the host | 10 | 0 | 1 |

- Exit codes: every passing run exit 0; the two failing runs (08 and 22 of the loaded series before
  the repair) exit 1, both `AssertionError: 1 != 0 : node cannot use fresh account resources: Error:
  database is locked` at `enableWriteAheadLog` / `new AccountDatabase`, `errcode: 5` — the mirror form
  of the race. No run of the case gave 137.
- Durations: alone 5-8 s; under 12 writers 25-48 s; under 40 spinning threads 131-169 s.
- The series under 40 spinning threads was stopped by me after 10 runs, as each took over two minutes;
  its 11th run was killed during its image build (exit 127, not run, not counted). The loop then ran
  three more runs after the load had stopped (12-14, exit 0 each, alone, not counted in any series) and
  a 15th that I killed after its container started (not run); I removed its container, its two volumes
  and its image by hand.
- The daemon's `die` and `oom` events were recorded in every series. A fault of my loop script left
  each series' `docker events` process running into the next ones, so the event files overlap; across
  all of them every `loop2-invariant-check-*` container died with exit code 137 from the cleanup's
  `docker rm -f`, none with another code, and there was no `oom` event. The stray processes were
  stopped.
- The tests of the code I touched, after the change, alone, once each, all exit 0, none skipped:
  `npm.cmd test -- tests/invariants/test_loop2_container_icons.py` (exit 0, 1 test),
  `npm.cmd test -- tests/invariants/test_loop2_container_sprites.py` (exit 0, 1 test),
  `npm.cmd test -- tests/deploy/test_loop2_image_icons.py` (exit 0, 1 test),
  `npm.cmd test -- tests/deploy/test_account_backup_stream.py` (exit 0, 1 test),
  `npm.cmd test -- tests/deploy/test_account_storage.py` (exit 0, 1 test),
  `npm.cmd test -- tests/deploy/test_restore_trial.py` (exit 0, 19 tests).
- The wait's two ways (E3, `python -B .runs/executor-21/e3_wait_branches.py <tag>`, exit 0, 2 tests):
  a server given a database path in a directory that does not exist fails the wait with
  `the container stopped before the server's readiness line:` and its log line (errcode 14); a normal
  start returns with the readiness line in the log and `verify_account_resources` passes.
- `.runs/quality-venv/Scripts/ruff.exe check tests/invariants/account_container_support.py` — exit 0.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors` (run with the change
  and its D-112 citation in place, before the commit).
- `git status --short -- compose.yaml Dockerfile` — empty, exit 0;
  `git diff --stat 4bfc33cd70b9b1b779338c45e1a8ef541d7f2744..HEAD -- compose.yaml Dockerfile` — empty, exit 0.
- Not run: the product's gate (`npm.cmd test` without a file) — the orchestrator's. The 3 full gate
  runs under load are not mine either.

## Own-work check

Requirement most likely not met: "the cause ... is established" — the real case never gave 137 in my
runs, so the repair could be fixing a different failure from loop2#78's. Check: whether anything else
in the case's sequence can give 137 — memory (E4 above: peak ~97 MB of 512 MiB, failcnt 0, oom_kill 0;
kernel log and daemon events: 0 out-of-memory kills in all runs) and whether 137 comes back in the
case's own sequence by the race (E2: 2 of 10 under 12 writers, server's errcode 5 in the log). It
showed no other way to 137 and the race's way reproduced; the tie to loop2#78's own run stays an
inference.

Mutation in the head: removing the call of `wait_until_ready` brings the race back (shown by the series
before the repair); a wait that returned on any log text would let the server's busy failure line pass
as ready — the pattern is anchored to `^Loop: http://`; a wait that only polled the log would hang 60 s
on a dead container — the running state is checked each round (E3).

## Reaches beyond the handoff

- loop2#78's description (`gh pr view 78`), for the failing assertion's text — the handoff gives only
  "kod 137".
- `src/server/main.ts`, `src/server/configuration.ts:210-250`, `src/server/database.ts:200-340`, for
  how the server opens the database at its start and its busy timeout.
- D-112 (`foundations/decisions.md:2730-2746`), whole, for what the decision says about the server's
  connection, readiness and the busy timeout; cited in the change.
- `tests/deploy/test_restore_trial.py:325-360`, `tests/deploy/test_account_storage.py:100-150`,
  `tests/deploy/test_account_backup_stream.py:55-80`, for how the other callers use the support.
- `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-17-report.md` (first part), for the
  method "as in Slice 17".

## Working copies

All stood in `.runs\executor-21\`
(the scripts of E1-E4, the loop script, the load script, each run's log, the event files) and were
removed with that directory before returning. Docker objects I made — the image
`loop2-exec21-diag:1`, the twelve writer containers `exec21-io-1..12` and their volumes, the
containers of E1-E4 and their volumes, and the leftovers of the interrupted runs — were removed; no
container or volume of mine remains (`docker ps -a` empty, `docker volume ls` shows only two volumes
`mm-gobuild` and `mm-gomod` that are not mine). The load process (40 spinning threads) and the
`docker events` processes were stopped. Docker Desktop, which the case started, stays running (D-391).
Older images of other runs (`loop2-account-storage-check:*`, `loop2-image-icons-check:*` and others)
were there before me and were left.

**Unread material:** `tests/invariants/loop2_invariant_support.py` was read at lines 1-300 as the
handoff names, not beyond. `foundations/decisions.md` entries D-106, D-113, D-390, D-391, D-392,
D-406, `foundations/invariants.md` loop2-one-serving-process, `foundations/environment_facts.md`
cgroup-memory-accounting, `foundations/part_map.md` deployment, `compose.yaml`, `Dockerfile`,
`scripts/docker_gate.py`, `guidelines/testing.md` (in two pages) and `guidelines/coding.md` were read
whole. `executor-17-report.md` was read in its first part only (it is not named by the handoff).

**Searches not found or unclear:**
- The container log, `OOMKilled` state or daemon events of loop2#78's failing run — not found
  anywhere; loop2#78's description records only the assertion line.
- The slice's title says "killed with code 137 at the limit of 512 MiB", suggesting memory; nothing I
  found supports a memory cause (see Cause, point 4).
- The handoff's environment fact cgroup-memory-accounting speaks of cgroup v2 and v1; this Docker VM
  runs cgroup v1, so E4 read `memory.max_usage_in_bytes`, `memory.failcnt` and `memory.oom_control`.
