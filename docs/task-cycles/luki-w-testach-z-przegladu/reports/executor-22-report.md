# Report — executor of slice 22: flaky: the built image's icons when Docker could not begin the build

**Status:** done with concerns

The concerns, in short (each is spelled out below):

1. **Docker Desktop updated itself during my runs.** Between about 14:25 and 14:28 local time,
   while my pairs of runs were stopping and starting it, Docker Desktop installed version
   4.99.0.245822 (engine 29.7.2 became 29.9.3). The new version no longer rewrites the docker
   context file when the file has not changed (its log says `docker cli context desktop-linux
   already up-to-date`). On this computer, then, the failure's trigger no longer happens, with or
   without my change. The update also cleared Docker Desktop's log folder, so the older logs I
   quote below now exist only in this report.
2. **The repair is committed, but the orchestrator may drop it.** It closes the part of the cause
   that lies in the repository: the gate took a cached answer from Docker Desktop for an answer of
   the daemon. Under the version where the failure was seen, that cached answer is what put the
   rewrite of the context file inside a test's `docker build`. It cannot be shown to prevent the
   failure on the Docker Desktop installed now, because the rewrite no longer happens there. The
   costs and the option of dropping it are under "Choices".
3. **The link to the failing run in loop2#136 is an inference.** Docker Desktop's logs for that
   moment (2026-11-16, about 00:39–00:56 UTC) were never kept: the oldest log on this computer
   began at 2026-11-16T12:59Z, before the update cleared them all. Below I give the mechanism, an
   exact reproduction of the error text, and the facts that tie them together.

## Files and commits

- `scripts/docker_gate.py` — +13 −3
- `tests/quality/test_docker_gate.py` — +16 −4
- `tests/quality/docker_standin.py` — +16 −8. This file is not on the slice's *Change* list, so
  this is a small mismatch with the plan: the stand-in `docker` used by the gate's test has to
  answer the gate's new question, and it is the helper of `tests/quality/test_docker_gate.py`,
  which is on the list.
- `tests/deploy/test_loop2_image_icons.py` — unchanged. The cause does not lie in the test case.
- Commit (range from base `74e5365c62267d3e3b7f076f99c316aff13cab90`):
  - `f742a3fb7bb321c586ccc2777882a7456739b115` test: :bug: make the Docker gate ask the daemon
    `docker system df` instead of `docker version`, ...

## Cause, with its evidence

**What failed (loop2#136, its gate log kept in commit `892fa5bc`,
`docs/task-cycles/hook-wersji-the-way/reports/gate-final-run1.log:2850-2857`):**
`test_loop2_image_icons.py:103`, `docker build` exit 1:
`ERROR: failed to build: failed to read metadata: open <the meta.json of the desktop-linux context>: The process cannot access the file because it is being used by another process.`
The gate run started at 2026-11-16 00:38:31 UTC, lasted 1093 s, and one other gate run went at
the same time (`gate_times.md`). The failing test came late in `tests/deploy`, after the tests
that had already run containers, so Docker Desktop was running at that point.

**Facts shown on this computer, while Docker Desktop still had engine 29.7.2 (each fact with the
run that shows it):**

1. *The error text means that another process held `meta.json` in a way that blocks reading, the
   way a replacement of the file by rename holds it.* I opened
   `%USERPROFILE%\.docker\contexts\meta\fe9c6bd7…\meta.json` with DELETE access (as the rename
   that replaces a file opens it) and ran commands meanwhile
   (`.runs/executor-22/hold_meta.py`):
   - `docker version` exit 1, `Failed to initialize: unable to resolve docker endpoint: context "desktop-linux": open …meta.json: The process cannot access the file because it is being used by another process.`
   - `docker build -t loop2-exec22-hold:1 .` exit 1, `ERROR: failed to read metadata: open …meta.json: The process cannot access the file because it is being used by another process.`

   This error has no `failed to build:` prefix, which means the build's own start read the file.
   The text in loop2#136 does have the prefix: there the read came during the build.
2. *Docker Desktop replaces `meta.json` each time its engine starts, and at no other time.*
   - Two cold starts, watched with a stat loop every millisecond (E1, E2): the file's identity
     changed twice per start. The first change came at the moment of `docker desktop start`
     (13:32:09.611 and 13:33:49.804). The second came when the engine began to run (13:32:18.333
     and 13:33:57.295), 140–150 ms before the first `docker version` that answered (13:32:18.476
     and 13:33:57.448).
   - In E2 the reader, which opens the file every 1 ms with Python's default sharing (as Go's
     `os.Open` does on Windows), failed once in 29 880 opens: `errno=13 Permission denied` at
     13:33:49.802. The backend logged `updated docker cli context desktop-linux` at
     12:33:49.802592Z, the same moment (UTC+1).
   - Every `clicontext] updated docker cli context desktop-linux` line in the backend logs from
     2026-11-16T12:59Z to 2026-11-17T12:57Z (40 lines) came either at a start of Docker Desktop (two
     lines per start, 13 starts: one at 10:58Z before my work, E1, E2 and the 10 starts of my
     pairs) or within about 10 ms after
     `engine linux/wsl is running`, when the VM was started from Resource Saver (14 such wakes:
     2026-11-16 13:07, 13:39, 14:29, 17:24, 18:04, 22:05, 23:31; 2026-11-17 00:35, 01:35, 02:08,
     03:21, 03:59, 05:15, and mine at 12:40). In those logs no other process wrote the file.
3. *While Docker Desktop's VM is stopped for Resource Saver, the gate's question is answered from
   a cache.* With the VM stopped (`idle] VM stopped` at 12:39:59Z),
   `docker version --format '{{.Server.Version}}'` printed `29.7.2` in 150 ms. The backend logged
   `apicache] cache << GET /v1.55/version`, and the VM was not started. The same was true of
   `docker ps -a`, `docker info`, `docker network ls`, `docker plugin ls`,
   `docker network inspect bridge` and `docker image inspect` (each `cache <<`, no VM start). Only
   `docker system df` started the VM, and it was held 5.9–6.5 s until the daemon answered. Docker's
   page on Resource Saver says that "Docker commands that don't run containers, for example listing
   container images or volumes", do not necessarily make Docker Desktop leave Resource Saver; it
   names no commands beyond that, and it gives no way to see the mode from the CLI.
4. *So the gate let the test go on, and the test's build started the VM; the rewrite then fell
   inside the build.* Run I2 was `npm.cmd test -- tests/deploy/test_loop2_image_icons.py` from
   Resource Saver, exit 0, 10 s. The gate's `docker version` came from the cache (12:40:17.46Z).
   Then the build's `/grpc` session started the VM (`idle -> busy … /grpc`, `starting VM` at
   12:40:17.61Z), and `meta.json` was replaced at 12:40:22.895Z, while the build was still running.
5. *The build reads `meta.json` again right after the engine comes up, and fails there with
   loop2#136's exact text.* With the VM stopped, I started `docker build -t loop2-exec22-hold:1 .`.
   As soon as Docker Desktop had replaced the file (seen 6.35 s after the start), I held it with
   DELETE access for 1.5 s (`.runs/executor-22/hold_after_write.py`; this does not stand in the
   way of Docker Desktop's own write). The build exited 1 after 7.85 s with
   `ERROR: failed to build: failed to read metadata: open …meta.json: The process cannot access the file because it is being used by another process.`
   That is the text of loop2#136, prefix included.

   Two controls:
   - With an awake engine, holding the file from 0.5 s, 1.0 s and 1.5 s after the build's start
     until it ended did not fail the build (3 runs, each exit 0).
   - Holding it from 0.5 s to 2.5 s into a build that started the VM did not fail the build
     either (exit 0; the engine came up at 6.3 s).

   So the read in question comes when the engine comes up. That is the moment Docker Desktop
   rewrites the file, which makes the two collide by milliseconds.

**Mechanism (on the Docker Desktop with engine 29.7.2).** Docker Desktop replaces the docker
context file whenever its engine starts: at its own start, and whenever Resource Saver wakes the
VM. A `docker` or buildx process that opens the file in that millisecond fails with this error.
The gate's `docker version` gets a cached answer while the VM sleeps, so the test's `docker build`
is what wakes the VM. buildx then reads the file again just as the engine comes up, which is the
moment of the rewrite. Two gate runs at once also put more docker commands in flight at such a
moment.

**Link to loop2#136 (inference, not verified).** The error text, its `failed to build:` prefix
and the build's place late in a long `tests/deploy` all fit a wake of the VM during that build,
with another gate run active at the same time. Whether the VM had gone into Resource Saver in that
run cannot be read back: no log of that hour was kept.

**After the update (Docker Desktop 4.99.0.245822, engine 29.9.3).** The cache still answers
`docker version` while the VM sleeps. In run S1, the old gate answered in under 54 ms and the
build's `/grpc` woke the VM. But at the engine's start, and at Docker Desktop's start in pairs
08–10, the backend logs `docker cli context desktop-linux already up-to-date` and the file's
identity does not change (S1 and S2 stat logs). On this computer the rewrite, and with it the
trigger, is gone.

## Repair

`daemon_answers` in `scripts/docker_gate.py` now asks `docker system df` instead of
`docker version`. Only the daemon answers that question. While the VM sleeps, Docker Desktop
starts the VM for it and holds it until the daemon answers. So the start of the VM falls inside
the gate's own question, and the test's commands begin after it. The module's docstring and the
function's docstring say why the question goes to the daemon.

The effect on the test's own sequence, from Resource Saver, timed by
`.runs/executor-22/gate_then_build.py` (`docker_gate.daemon_gap()` then
`docker build -t loop2-exec22-seq:1 .`, as the test does):

- **Before (S1, the gate copied from `HEAD`):** the gate answered in under 54 ms from the cache.
  The VM was started by the build (`/grpc`), and the build took 7.35 s, the wake included.
- **After (S2, the changed gate):** the gate's `system df` started the VM
  (`idle -> busy … 1 calls to /v1.56/system/df`). The engine was ready at 13:40:13.767Z and the gate
  answered at 14:40:14.663 local time. The build started then and woke nothing.

D-390, D-391, D-392 and D-406 say the same as before. The gate still starts Docker Desktop
only when no daemon answers, waits at most 3 minutes, never stops it, and asks nothing about
memory. The change serves D-390's rationale: "Only an answer of the daemon counts as Docker being
up, because that answer is what the tests need". No `// decision:` or `// invariant:` citation was
added or changed.

**The new test case** is
`test_a_version_that_docker_desktops_cache_answers_is_no_answer_of_the_daemon` in
`DaemonGap`. Its stand-in answers `docker version` as the cache does (`cached_version=True`) while
its daemon never answers. The case expects a gap after one start. The break it catches: the gate
asks `docker version` again and takes the cached answer for the daemon's. It was seen failing on
the old gate with `AssertionError: unexpectedly None`.

The stand-in now treats `system df` as its question to the daemon, with the same rise logic as
before; it still answers `version`. The case of a hanging daemon patches `system df` instead of
`version`, and its stub was renamed `hang_on_the_question`.

## Checks (command and exit code)

**Where and how the series ran.** Every run of the image test is a process of its own:
`npm.cmd test -- tests/deploy/test_loop2_image_icons.py`, started by `.runs/executor-22/run_one.sh`,
which kept each run's output. Both series ran on this computer (20 logical CPUs) with no load
added by me. A Docker daemon answered through `docker_gate` in every run, and no run was skipped.

**What "a pair" is.** For each pair, `pairs.sh` did four things:
1. It checked `docker ps -a` and found no container.
2. It ran `docker desktop stop` and waited until no daemon answered, plus 3 s.
3. It started two separate runs at the same moment.
4. Each run's own `docker_gate` found no daemon and called `docker desktop start --detach`.

The backend logs show a full start of Docker Desktop for each pair of the series before the
change. For each pair, the two runs began within 13 ms of each other.

| Series | Code | Conditions | passed | failed | not run |
|---|---|---|---|---|---|
| before, alone | base `74e5365c` | Docker Desktop running (engine 29.7.2), 30 runs one after another | 30 | 0 | 0 |
| before, pairs | base | 10 pairs at the same time from a stopped Docker Desktop (engine 29.7.2) | 20 | 0 | 0 |
| before, from Resource Saver | base | 1 run (I2) with the VM stopped | 1 | 0 | 0 |
| after, alone | the change (committed as `f742a3fb` after one comment-only edit) | Docker Desktop running (engine 29.7.2), 30 runs | 30 | 0 | 0 |
| after, pairs | same | 10 pairs from a stopped Docker Desktop; it updated itself during pairs 05–07, and pairs 08–10 ran on 4.99.0 | 20 | 0 | 0 |
| after, final tree | `f742a3fb` | 1 run, Docker Desktop 4.99.0 | 1 | 0 | 0 |

- **Exit codes:** every run exited 0.
- **Durations:**
  - Before: alone 4–5 s, pairs 16–26 s.
  - After: alone 5–6 s, except run 01 at 107 s. `scripts/` is part of the image's build context
    (`.dockerignore` lets `scripts/` in), so the changed `docker_gate.py` made the first build
    rebuild it.
  - After, pairs: 17–21 s, and 45 s for pair 07, during the update.
- **What the series show.** The failure was not reproduced in any of the 102 runs of the test
  file. I reproduced it only by holding the file just after Docker Desktop's rewrite (fact 5).
  The real collision takes a window of about a millisecond, and only at a start of the engine;
  that is why the series do not hit it.
- **The gate's own test:** `npm.cmd test -- tests/quality/test_docker_gate.py`
  - before the gate's change, with the new case in place: exit 1, `Ran 20 tests`,
    `FAILED (failures=1)`, the new case `AssertionError: unexpectedly None`;
  - after it: exit 0, `Ran 20 tests … OK`;
  - after the final comment edit: exit 0, `Ran 20 tests … OK`.
- `.runs/quality-venv/Scripts/ruff.exe check scripts/docker_gate.py tests/quality/test_docker_gate.py tests/quality/docker_standin.py`
  — exit 0, `All checks passed!` (run twice, before and after the comment edit).
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`, run on the final
  tree before the commit.
- **Not run:** the product's gate (`npm.cmd test` without a file), which is the orchestrator's.
  The 3 full gate runs under load are not mine either. Only those runs can show whether a VM wake
  during a gate run still meets a docker command.

## Own-work check

**The requirement my work most likely does not meet:** "the cause … is established". The failing
moment of loop2#136 itself cannot be seen, and none of my runs of the real test failed. So the
established mechanism might not be the one behind loop2#136.

**The check:** first, whether anything other than Docker Desktop's rewrite at an engine start
writes `meta.json`. I went through all 40 update lines in 24 h of backend logs: each was paired
with an engine start, and no other writer appeared. Second, whether a mid-build read happens only
at the engine's coming up. Holds during an awake build (3 runs) and early in a waking build
(1 run) never failed it; a hold just after the rewrite during a waking build failed it with the
exact text.

**What it showed:** no other writer, and no other moment when a build reads the file. The tie to
loop2#136's own run stays an inference.

**Mutations in my head:**
- The gate asks `docker version` again: the new case fails (seen).
- `daemon_answers` drops its check of a non-empty output: a `system df` that exits 0 with nothing
  printed would count as an answer. The real CLI always prints a header, so this is not
  protected, and not worth a case.
- The stand-in answers `version` from the cache but the gate never asks it: the existing
  rising-daemon cases still pass, because the stand-in's `system df` follows the same rise logic.

## Choices, with the ways rejected

**`docker system df` as the question to the daemon.** Of nine commands I tried with the VM
stopped, it is the only one that went to the daemon.
- Rejected: `docker info`, `docker plugin ls`, `docker network inspect`, `docker image inspect`
  (all answered from the cache); `docker events --since … --until …` (it hung and was killed).
- Cost if wrong:
  - It takes 0.5 s with an awake engine here (19 images, 2 volumes, 2118 build cache entries). On a
    computer with very large volumes it can take longer. Past `ANSWER_LIMIT` (30 s), the gate
    would treat the daemon as silent and could, within 3 minutes, end in a skip that says the
    start was tried.
  - Which requests Docker Desktop answers from its cache is not documented. A later version that
    caches `/system/df` would quietly bring back today's behaviour. No test can see that.

**Keeping the repair after the update.** The alternative is to leave every file unchanged and
record the cause as Docker Desktop's: its unconditional rewrite, gone in 4.99.0.
- Kept, because the gate's taking of a cached answer is the repository's own share of the cause.
  On a computer with the older Docker Desktop, it is what makes a test's build be the one that
  wakes the VM. It also departs from D-390's rationale, which counts only an answer of the daemon.
- Cost:
  - The `system df` above.
  - The repair narrows the collision on the older Docker Desktop but does not remove it: a
    command another process starts in the millisecond of the rewrite still fails.
  - The orchestrator can drop commit `f742a3fb` if it judges the cause to lie in Docker Desktop
    alone after the update.

**Not retrying `docker build` on this error in the test.** Rejected: that would turn a re-run into
a green result (the "Flaky tests" rule of `guidelines/testing.md`), and every other docker command
of every test is exposed in the same way.

**Not setting `DOCKER_HOST`, so that commands would skip the context file.** Rejected: it would
change how every test reaches Docker, and the deployment's check `test_loop2_host_sharing.py`
watches that variable in the deployment's files.

## Docker Desktop on the human's computer

**Stops and starts.** I stopped Docker Desktop 22 times: 2 cold starts (E1, E2) and the 20 pairs.
Before each stop I ran `docker ps -a`, and no container existed, mine or another session's. No
other `docker` process was running either, apart from the ones I started. Each time it was started
again (by me in E1 and E2, by the gate's `docker desktop start` in the pairs).

**Now.** Docker Desktop is running and answering: `docker version` gives 29.9.3, exit 0
(D-391).

**The update.** `the executable of Docker Desktop in its installation directory` was written at 14:25:20 local
time; its ProductVersion is 4.99.0.245822. Before the update the engine was 29.7.2 and the client
29.7.2; I did not record Docker Desktop's own version number. The update happened while my pairs
were stopping and starting Docker Desktop, so the stops and starts most likely let an update that
was already waiting install itself. That is an inference: the installer's log went with the
cleared log folder.

**Logs.** `%LOCALAPPDATA%\Docker\log\host` was emptied at about 14:27:51 local time; 13 new files
remain. The older backend logs, among them those of 2026-11-16, are gone.

**What my runs made and what remains.**
- Containers: none remain (`docker ps -a` empty).
- Images and volumes: the same as my baseline, taken before my first build
  (`diff baseline-images.txt now-images.txt` and the same for volumes, both exit 0). The images
  `loop2-exec22-hold:1` and `loop2-exec22-seq:1` and every test image were removed.
- One dangling image, `ce57a8176560`, created at 13:24:18, was there before my first Docker
  command (13:30) and was left alone.
- My image builds added entries to the build cache. I left the cache, because pruning it would
  also remove entries of other work.

**Processes.** No load process was used. My watchers, pollers and wait scripts all ended; one
`docker events` probe that hung was killed along with its three `bash` processes. A final check
found no process of mine left.

## Reaches beyond the handoff

- **loop2#136**'s description (`gh pr view 136`) and its cycle record in commit `892fa5bc`
  (`docs/task-cycles/hook-wersji-the-way/gate_times.md`,
  `reports/gate-final-run1.log:2823-2866`): for the exact error and when the gate ran.
- **`.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-21-report.md`** (whole) and
  **`executor-17-report.md`** (lines found by search): for the method "as in Slice 17".
- **Docker Desktop's logs**: `%LOCALAPPDATA%\Docker\log\host\com.docker.backend.exe.log*`, its
  `clicontext`, `idle`, `apicache` and `engines` lines.
- **Docker's documentation page on Resource Saver**
  (https://docs.docker.com/desktop/use-desktop/resource-saver/), read 2026-11-17.
- **Files of the repository:** `scripts/test.py` (lines 1-60), `.dockerignore` and a search of
  `Dockerfile`, for how a run of one file reaches the gate and why the image rebuilt.
- **The repository was searched** for `docker version`, `system df`, `Resource Saver`,
  `DOCKER_CONFIG`, `DOCKER_CONTEXT` and `daemon_answers`: the foundation names none of them.
- **Suggestion for the orchestrator.** The gate's question now relies on Docker Desktop's
  behaviour in Resource Saver. An environment fact recorded from the documentation page above
  (with `the-way-record-environment-fact`) would give the foundation the source of that
  behaviour. I did not write it: my slice writes no foundation entry.

## Working copies

**Where they stood.** All in
`.runs\executor-22\`:
- the watcher, poller, hold, sequence, series, pairs and wait scripts;
- a copy of the gate before the change (`oldgate/scripts/docker_gate.py`);
- the description of loop2#136 and the gate log of its cycle;
- every run's output, the baselines of images and volumes, and the commit message file.

**Removal.** The directory was removed with `rm -rf` before returning. No worktree was made.

**Unread material:** none. The handoff's files and entries were read whole, `guidelines/testing.md`
in two pages.

**Searches not found or unclear:**
- Docker Desktop's logs for the failing moment of loop2#136 (2026-11-16, about 00:39–00:56 UTC):
  not found. The oldest log on this computer began at 2026-11-16T12:59Z, and the update then
  cleared them all.
- Whether the VM was in Resource Saver during loop2#136's run: unclear, for the same reason.
- A docker command lighter than `docker system df` that Docker Desktop does not answer from its
  cache: not found among the nine I tried.
- Docker Desktop's own version before the update, and whether its update was waiting before my
  stops: not recorded.
