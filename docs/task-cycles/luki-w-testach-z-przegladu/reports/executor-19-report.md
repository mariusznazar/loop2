# Report — executor of slice 19: flaky: the failure watcher's window under a clock that stands still

**Status:** done with concerns

The failure did not come back in 150 separate runs of the case (30 alone, 120 under four kinds of
load) nor in 6 more runs inside whole runs of its file under the heaviest load. As the slice gives
for that outcome, nothing changes: **the case needs the orchestrator's 3 full gate runs under load.**
The failing run's own record does locate the fault, though (see Cause): the stand-in `docker` for the
tunnel's `inspect` never ran its first line in that run. The case's clock logic and the watcher are
not involved; the watcher did what it is designed to do with a reading that failed.

## Files and commits

- No file changed; no commit. The range from base `4bfc33cd70b9b1b779338c45e1a8ef541d7f2744` is
  empty. `git status --short` is empty, and HEAD is still `4bfc33cd`.
- `tests/deploy/test_loop2_watch.py`, `tests/deploy/watch_script_support.py` and `deploy/loop2-watch`
  were each read whole. The first was read in two reads, lines 1-807 and 808-1380.

## Cause: what the failing run's record shows, and what stays open

The failing run is in `git show 4955a906:docs/task-cycles/oboz-w-siedzibie/base-gate.log`, lines 2509-2544.

1. **The failing assertion.** `assert_quiet` failed because `pusher` was called once, with `loop2_gra_nie_dziala` (the kind `down`). The
   watcher logged `due=down; sent=down; pusher=down:0; containers=loop2-cloudflared`: the game
   container was fine and the tunnel container was not.
2. **The tunnel's `inspect` has no record.** The second run's calls hold one `docker inspect`, the one
   for `loop2`. The one for `loop2-cloudflared` is missing. After the game's `inspect` comes straight
   the second look at the deployment's lock, then `pusher`. The script calls `read_container` for both
   names unconditionally (`read_containers`, `deploy/loop2-watch:367-372`), and it went on past that
   point. So it did start the tunnel's `inspect`. The first thing every stand-in does is append its
   record (`STUB` in `tests/deploy/backup_script_support.py:66-70`). A start with no record therefore
   means a stand-in process that never reached its first line.
3. **The watcher reacted as designed.** A reading that fails or gives no line of the expected shape
   counts as `down` (`read_container`, `deploy/loop2-watch:350-365`, and `evaluate`). The case
   `test_docker_that_cannot_be_read_is_down_and_only_down` holds that on purpose. The clock that
   stands still plays no part: the containers are read before `read_logs`, and the case changes
   nothing about the containers.
4. **The signature made on purpose.** The case's two runs were repeated with the watcher's Docker time
   limit cut to 0.01 s in the second run's copy (`signature.py`, see Working copies), so that a
   stand-in that has not reached its first line gets stopped. 1 run of 10 gave the failing run's
   **exact list of calls**: one `inspect` of `loop2`, both looks at the deployment's lock, then
   `pusher loop2_gra_nie_dziala`. The other 9 cut both stand-ins (`down`, other calls). With 0.02 s,
   0.03 s and 0.05 s: 4, 17 and 10 runs quiet, and 16, 3 and 0 `down` with other calls. So that list
   of calls is exactly what the watcher does when the tunnel's stand-in does not get going.
5. **What stays open, a guess and not shown: why the stand-in did not run.** In the case the time
   limit is 60 s, and the run did not hit the test's 45 s limit (`RUN_TIMEOUT`). So the stand-in
   either failed to start under Git's bash (MSYS) on Windows, or the time limit fired early. Three
   facts make the first the likelier, none of them a proof:
   - **The same gate run had a second silent stand-in.** In `tests/invariants`
     (`test_a_signal_with_a_trap_is_named_by_its_exit_code_in_the_log_too` [INT], same log, lines
     2552-2576), the `docker` stand-in of the backup left no record and did not send its signal. Its
     `timeout … docker exec` stage still read status 0, since the backup logged `made` and `sent`.
     That is a stand-in that ran none of its lines and wrote nothing to its error output, which went
     into the backup's log.
   - **That gate run was about 45% slower than its two neighbours**: `tests/deploy` 790 s against
     542 s and 527 s, `tests/invariants` 971 s against 716 s and 685 s (`base-gate-2.log` and
     `gate-final.log` of the same commit). So the computer was busier.
   - **Process starts have failed under load in other gate runs on this computer.**
     `git show c80cc519:docs/task-cycles/rozwiazanie-lasu/reports/40-gate.log` lines 586-608 hold
     two things. In one, the stand-ins' guard got an empty `type -P` for every tool, so Git's bash
     did not see the stand-ins' directory. In the other, two test directories ended with exit code
     3221225794, which is 0xC0000142, `STATUS_DLL_INIT_FAILED`: Windows failed to start a process.

## Every attempt (each run a process of its own, counted)

Runner: `.runs/executor-19/run_case.py`. It runs one case, or with `ALL` a whole file, through
`unittest` in its own process, with the paths `scripts/test.py` adds (the test's directory and the
repository root) plus `scripts/`, which `scripts/test.py` has on its path as the directory of its
own script. Series: `.runs/executor-19/series.sh LABEL 30` (bash loop, one `python -B run_case.py`
per run, exit code of each run recorded). All from the worktree root at `4bfc33cd`, unchanged.

| Series (command `bash .runs/executor-19/series.sh <label> 30`) | Conditions | Passed | Failed | Run time |
|---|---|---|---|---|
| `alone-before` | nothing of mine running | 30 | 0 | 1.3-1.4 s |
| `spin40-before` | 40 spinning node processes (2 per logical CPU; 20 logical CPUs), `spinners.sh 40` | 30 | 0 | 33.7-41.1 s |
| `fork24-before` | 24 bash loops that start, without pause, a bash script through `timeout 60` the way the watcher starts a stand-in (`forkload.sh 24`; 30,890 starts in all) | 30 | 0 | 6.3-7.4 s |
| `files6-before` | 6 loops each running whole files one after another: `test_loop2_watch.py`, `test_loop2_backup.py`, `test_account_save_backup_failure_notice.py`, `test_loop2_watch_message.py` (`fileload.sh 6`) | 30 | 0 | 2.2-2.8 s |
| `files6-spin40-before` | the 6 file loops and 40 spinning node processes together | 30 | 0 | 43.3-60.7 s |

Every run's exit code was 0 (each series script exited 0 and printed `30 runs, 30 passed, 0 failed, 0 other`).

Further attempts:

- **The case inside whole runs of its file.** Under the 6 file loops with 40 spinners (round 1),
  the case ran 6 times inside whole runs of `test_loop2_watch.py`: 6 passes.
- **A probe of starting a stand-in.** `.runs/executor-19/probe.sh` reads a stand-in exactly as the
  watcher reads `docker inspect`: `output=$(timeout --kill-after=10 60 stub … 2>/dev/null 7>&-)`.
  The stand-in records itself first and then prints a line. Alone: `bash probe.sh alone 1000` →
  exit 0, `1000 starts, 0 bad`. Under the 24 fork loops: `bash probe.sh fork24 400` → exit 0,
  `400 starts, 0 bad`. "Bad" means a status other than 0, a wrong line, or no record.
- **Not tried:** memory pressure on the computer (low commit charge or desktop heap), which is what
  `STATUS_DLL_INIT_FAILED` usually goes with. I judged it a risk to the human's computer. I did not
  try sleep or suspend of the computer during a run either.

## A different flaky case found under load (not repaired, out of the slice)

Under the 6 file loops with 40 spinners, 2 of the 6 whole runs of `test_loop2_watch.py` failed on
**another** case: `TheDockerCommands.test_a_docker_that_never_answers_is_cut_off_and_read_as_down`
[`logs *`], at `tests/deploy/test_loop2_watch.py:1182`. Both failed with
`AssertionError: Lists differ: [ ['loop2_gra_nie_dziala'] ] != []`.

- **What was cut.** That subtest writes `DOCKER_WAIT_SECONDS="1"` into the copy, so the 1 s limit
  covers both `inspect` calls and not only the hanging `logs`. Under load one `inspect` stand-in, which
  recorded its call, did not answer within 1 s and was stopped. One run logged
  `containers=loop2`. The other logged
  `logs unreadable (docker exit 124) … containers=loop2-cloudflared`. A `down` was sent where the
  case expects quiet.
- **Why it is not repaired here.** The cause is the case's 1 s limit, shorter than a stand-in's answer
  on a busy computer. That is shown, but the case is not in the slice (the slice names one case), and
  To do 7 lists six named tests, this one not among them. I recommend a line on the task list, or
  adding it to the cycle at the orchestrator's choice.
- **How a repair could look.** A limit for `logs` that leaves the `inspect` calls time, but the
  constants block has one `DOCKER_WAIT_SECONDS` for both. Or a longer limit (several seconds) with a
  hang that outlasts it, at the cost of a longer case under the 45 s `RUN_TIMEOUT`.
- **A related limit.** Under the heaviest load the watcher's runs took up to about 30 s each:
  `files6-spin40-before` ran up to 60.7 s for the case's two runs. That is close to the 45 s
  `RUN_TIMEOUT` of one run (`backup_script_support.py:62`), which no run of mine passed.

## Checks (each command with its exit code)

- The 5 series above: `bash .runs/executor-19/series.sh <label> 30` → exit 0 each, counts as in the table.
- `npm.cmd test -- tests/deploy/test_loop2_watch.py` → **exit 0**, `Ran 99 tests in 193.493s`, `OK`
  (alone, after all load stopped).
- `npm.cmd test -- tests/deploy/test_loop2_watch_message.py` → **exit 0**, `Ran 9 tests in 37.883s`, `OK`.
- `bash probe.sh alone 1000` → exit 0. `bash probe.sh fork24 400` → exit 0. Results as above.
- `python -B .runs/executor-19/signature.py 0.01 10` → exit 0, and the same for `0.05 10`, `0.02 20`
  and `0.03 20`. Results as in Cause, point 4.
- `python -B .the-way/elements/common/foundation_check.py`: not run, because no `// invariant:` or
  `decision:` comment was added or changed (no file changed).
- Not run, as the method and the handoff give: the full gate (`npm.cmd test` without a file,
  `gate_times.py`). That stays the orchestrator's, and this case needs its 3 full gate runs under load.
- **Not reached by the slice:** "the case then passes at least 30 further separate runs" applies after
  a repair. With nothing changed, there is no "after".

## Own-work check

- **Requirement most likely unmet:** "the cause … is established … not guessed". The risk was that I
  would take the clock that stands still, or the watcher's window, for the cause.
- **Check:** read the failing run's record against the script's order of calls and the stand-in's
  first line. Then made the same list of calls on purpose by stopping the tunnel's stand-in before its
  first line (`signature.py`). Then looked for the same signature in the other test that failed in that
  gate run, and in the other gate logs of the project.
- **Result:** the list of calls is reproduced exactly only when the tunnel's stand-in does not get
  going. The clock plays no part, because the containers are read before the window. Why the stand-in
  did not run is narrowed to the start of a process under load on Windows, which is likely but not
  shown. It is reported as a guess in Cause, point 5.

## Reaches beyond the handoff

- `tests/deploy/backup_script_support.py`, whole: the stand-in's text (`STUB`) and the run, on which
  `watch_script_support.py` stands.
- `tests/deploy/deploy_script_support.py:94-135` (`GUARD`, `git_bash`, `shell_path`) and `:146-150`
  (`write_bytes`): how stand-ins are written and found.
- `deploy/loop2-backup:170-209`: how the backup reads the status of the `docker` stage, to read the
  second failure of that gate run.
- `tests/invariants/test_account_save_backup_failure_notice.py:245-275`: that second failing case.
- `scripts/test.py`, whole: which paths the runner must add.
- `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-17-report.md`, whole: "as in Slice 17".
- Gate logs in history: `git show 4955a906:…/base-gate-2.log`, `…/gate-final.log` and `…/cycle.md`
  (lines 47-48 and 92), for the stage times and the orchestrator's note. A search of every `*.log`
  added under `docs/task-cycles` for failures of deploy and stand-in tests, which found
  `c80cc519:docs/task-cycles/rozwiazanie-lasu/reports/40-gate.log:586-608`.

## Choices

- **Nothing changed (chosen)**, as the slice gives where the failure does not come back. The way
  rejected was a support that reruns a run whose stand-in left no record. It would hide this cause
  rather than repair it, and `guidelines/testing.md` "Flaky tests" makes a rerun diagnosis only, never
  a way to a green gate. It also cannot see a start that left no trace without knowing the script's
  calls. Cost if wrong: if the cause lies in the seam after all, the case fails again in a gate run
  under load, with the same signature. The record of such a run (the calls) is what tells it apart.
- **The sibling flake left for the orchestrator**, not repaired in this slice (see above).

## Working copies

All stood in `.runs\executor-19\`:
- `run_case.py` and `series.sh`: the runner and the series;
- `spin.mjs` and `spinners.sh`: the spinning load;
- `forkload.sh`: the load of process starts;
- `fileload.sh`: the load of whole test files;
- `probe.sh`: the probe of starting a stand-in;
- `signature.py`: the signature made on purpose;
- every run's output, under `out/`, `fileload/` and `probe-*/`.

The whole directory was removed before returning. Every background process I started was stopped
through its stop file and confirmed ended: both batches of 40 spinners (node.exe count back to the 5
that are not mine), the 24 fork loops (`fork load ended`), and the 6 file loops (python.exe count back
to the 3 that are not mine).

**Unread material:** none. The handoff's passages of the task, D-356, D-235, failure-watcher-message,
mikrus-pusher-mail and the part deployment were each read whole, and so were `guidelines/testing.md`
(in two reads, lines 1-214 and 215-495), `guidelines/coding.md`, and the three files of the slice's
*Change*.

**Searches not found or unclear:**
- Why a stand-in process ran none of its lines under Git's bash on Windows. Not found. No run of mine
  showed it: 150 runs of the case, 1,400 probed starts and 30,890 starts under load.
- Whether `timeout` of MSYS counts time the computer was asleep while Python's wait does not. That
  would be another way to a stop before the first line. Not checked.
