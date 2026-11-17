# Report — executor of slice 20: flaky: the backup's trapped signal named by its exit code

**Status:** done with concerns

The failure did not come back. The case ran 90 times, each run a process of its own: 30 alone and
60 under two kinds of load. The case's INT run also ran 320 more times inside one process, 300 of
them under the heaviest load I used. Every run passed. As the slice gives for that outcome, nothing
changes: **the case needs the orchestrator's 3 full gate runs under load.**

The failing run's own record does narrow the fault (see Cause). In that run the `docker` stand-in
never ran its first line, yet its stage still read status 0. Several explanations are ruled out
by evidence. What made a stand-in end with status 0 without running stays open, and is marked
below as a guess.

## Files and commits

- No file changed and no commit was made. The range from base
  `4bfc33cd70b9b1b779338c45e1a8ef541d7f2744` is empty, HEAD is still `4bfc33cd`, and
  `git status --short` is empty.
- I read each of the three files the slice may change whole:
  `tests/invariants/test_account_save_backup_failure_notice.py`,
  `tests/deploy/backup_script_support.py` and `deploy/loop2-backup`.

## Cause: what the failing run's record shows, and what is ruled out

The failing run is in `git show 4955a906:docs/task-cycles/oboz-w-siedzibie/base-gate.log`,
lines 2549-2578, subtest `[INT]`.

1. **What the record holds.** The run exited 0. Stdout and the log both read `start`,
   `made: loop2-accounts-6.sqlite.age, 1024 bytes` and `end: sent loop2-accounts-6.sqlite.age`.
   Stderr is empty. The calls are `date`, `flock --exclusive`, `age …`, `flock --unlock`,
   `date -u +%u`, `date`, `rsync …` and `date`. **There is no `docker` call.**
2. **The `docker` stage read status 0.** The script logs `made:` only after `require_whole_file`
   (`deploy/loop2-backup:201-213`), and that function lets the run through only when
   `COMMAND_STATUS` is 0. `COMMAND_STATUS` is `PIPESTATUS[0]` of
   `timeout … docker exec …` (`deploy/loop2-backup:177-183`). The docker stage's stderr goes to the
   log (`2>>"$LOG_FILE"`), and the log holds no error line. So the stage ended 0 and printed no error.
3. **The stand-in did not run its first line.** The first command of every stand-in appends its
   record to `calls/all` (`STUB`, `tests/deploy/backup_script_support.py:66-70`). Only after that
   does it look at its rule and send the signal.
4. **Ruled out: the record was lost by the two stages appending to the file at the same time.**
   `docker` and `age` run at once in the pipe. If the computer's `>>` were not atomic, `age`'s
   record could overwrite `docker`'s. Two tests under Git's bash on this computer kept every record:
   - `append_race.sh race 300`: 300 trials, each starting two bash processes at once that append
     one record each. No record was lost.
   - `append_loops.sh race/loops 3000`: two loops each appending 3000 records to one file found
     6000 of 6000.
5. **Ruled out: the stand-in ran and sent INT, and bash's special handling of SIGINT while it
   waits for a child dropped the signal.** That would leave a `docker` record, given point 4. HUP,
   the subtest before, passed in the same run.
6. **Ruled out: a Ctrl+C console event that killed the stand-in while it started.** Cygwin maps a
   process that ends with `STATUS_CONTROL_C_EXIT` to SIGINT (`status_exit` in `pinfo.cc` of the
   Cygwin source, read on GitHub through a summarising fetch tool, so it is a reading and not a
   verbatim quote). `timeout` would then have returned 130, not 0. As a measurement:
   `victim.sh int4 600` started a stand-in 600 times, the way the backup starts `docker`, while 4
   loops sent trapped INT signals the way the stand-ins do (600 rounds in all, each round ending
   130). There were 0 bad starts (bad means a status other than 0, a wrong line or no record).
7. **Ruled out: a different `docker` found on the copy's PATH.** There is no `docker` in
   `/mingw64/bin`, `/usr/bin` or `/bin`, so a stand-in lookup that missed would give 127, not 0.
8. **Ruled out: SIGINT ignored when the backup's bash started.** A Cygwin bash started as a
   background job (`&`) inherits SIGINT ignored, and bash then silently refuses
   `trap 'exit 130' INT`. That gives exactly "0 != 130": `bash -c '… & wait'` printed
   `trap -- '' SIGINT` both before and after setting the trap, and `int_sender.sh` gave 130 in the
   foreground and 0 as `&` or `( … ) &`. In the gate run this does not fit, for two reasons:
   - The stand-in would still have left its record.
   - `test_each_failed_end_calls_pusher_once_with_the_one_fixed_notice`, subtest `interrupted`
     (INT too), runs later in the same test process, so with the same inherited start, and it
     passed there.

   The test's chain also passes through native Windows processes (Python and Git's
   `bin/bash.exe`), and the case passed when started from a process with Ctrl+C disabled:
   `python -B newgroup.py` (`CREATE_NEW_PROCESS_GROUP`) gave exit 0.
9. **What stays open — a guess, not shown.** Something at the level of Cygwin or Windows made a
   process in the chain end with status 0 before the stand-in ran a line. The chain is: the
   script's fork for the pipe stage, `timeout`, `timeout`'s fork, then the exec of the stand-in's
   bash. In Cygwin's exec, a child that ends before it syncs with its parent with Windows exit
   code 0 is taken as a success (`child_info::proc_retry` returns `EXITCODE_OK` for exit code 0;
   read from `sigproc.cc`/`spawn.cc` the same way as point 6). I did not show which process ended
   that way, nor why.

## Executor 19's reading checked against the log and the code: it holds

- "the `docker` stand-in of the backup also left no record": **holds** (point 1).
- "did not send its signal": **holds as an inference.** The log shows only that the script was not
  ended by INT. With the record missing and appends shown atomic (point 4), the stand-in did not
  reach the line that sends the signal.
- "its `timeout … docker exec` stage still read status 0": **holds** (point 2).
- "about 45% slower than its two neighbours": **holds.** `base-gate.log` has `tests/deploy`
  790.729 s and `tests/invariants` 970.894 s. `base-gate-2.log` has 541.924 s and 716.168 s, and
  `gate-final.log` has 527.062 s and 684.628 s (all three at `4955a906`).
- An addition: the two errors of `tests/quality` in the same run (`test_ruff_source_rules`,
  `test_shellcheck_source_rules`, `FileNotFoundError` from `CreateProcess`, log lines 2581-2660)
  are not a failed process start. Both call `venv_tool(...)`, and WinError 2 says the tool file
  was not there. I did not check that worktree's venv, so this is a reading.
- The gate runs its test directories at the same time (`.the-way/gate/run_tests.py:127`,
  `ThreadPoolExecutor`). So in that run `tests/deploy`, the watcher's signal cases included, ran
  beside this case.

## Every attempt (each counted)

Runner: `.runs/executor-20/run_case.py <file> <case>`. It runs one case through `unittest` in its
own process, with the paths `scripts/test.py` adds (the test's directory and the repository root)
plus `scripts/`. Series: `bash .runs/executor-20/series.sh <label> 30`: a loop of
`python -B run_case.py`, one process per run, recording each run's exit code and time. All runs
were made from the worktree root at `4bfc33cd`, unchanged. The case is
`EveryFailedEndCallsPusher.test_a_signal_with_a_trap_is_named_by_its_exit_code_in_the_log_too`;
each run holds its six subtests, INT among them.

| Series (`"the Git for Windows installation/bin/bash.exe" .runs/executor-20/series.sh <label> 30`) | Conditions | Passed | Failed | Run time | Exit |
|---|---|---|---|---|---|
| `alone-before` | nothing of mine running | 30 | 0 | 3.3-3.8 s | 0 |
| `spin40-before` | 40 node processes each spinning one CPU (`spinners.sh 40 2400`; 20 logical CPUs). Run 30 (29.2 s) overlapped the spinners' end by about 2 s; the others ran fully under them | 30 | 0 | 29.2-88.1 s | 0 |
| `files6-signal4-before` | 6 loops each running whole files one after another (`fileload.sh 6`: `test_loop2_watch.py`, `test_loop2_backup.py`, `test_loop2_watch_message.py`, `test_loop2_deploy_dump.py`), plus 4 loops of `int_sender.sh INT 20` (`signalload.sh 4`) | 30 | 0 | 8.1-9.8 s | 0 |

Under the load of the third series, the file loops finished 15 whole files, all with exit 0:
6 of the watcher, 2 of the backup, 3 of the watcher's message and 4 of the deploy dump. These hold
the watcher's real trapped signal cases.

The 4 signal loops ran 492 × 20 rounds, every one ending 0, not 130. Because they were started
with `&`, SIGINT was ignored in them (point 8). They therefore gave process starts and `kill` calls,
not trapped signals.

More attempts, beyond the series:

- **The INT run repeated inside one process.** `python -B .runs/executor-20/probe_signal.py INT N
  <out>` builds a fresh `BackupFixture` for each run, as the case does, and counts the exit code
  and the `docker` records:
  - alone, N=20: exit 0, all 20 runs `exit 130, docker records 1`;
  - under `fileload.sh 6` and `spinners.sh 20 3000`, N=300: exit 0, all 300 runs
    `exit 130, docker records 1`, in 1258.7 s. In that time the file loops finished 15 whole files,
    all with exit 0 (the same counts as above).
- **Starting a stand-in.**
  - `victim.sh alone 300`: exit 0, 300 starts, 0 bad.
  - `victim.sh int4 600` beside 4 × `int_sender.sh INT 150`, started through Git's `bin/bash.exe`
    so that their traps worked (each `exit 130 x 150`): 0 bad.
- **Appends:** `append_race.sh race 300` and `append_loops.sh race/loops 3000`, as in Cause,
  point 4. Both exited 0.
- **Started with Ctrl+C disabled:** `python -B newgroup.py <dir>` ran the case once in a child
  started with `CREATE_NEW_PROCESS_GROUP`. The case passed (exit 0).
- **Not tried:** memory or desktop-heap pressure, and sleep of the computer, for the reason executor
  19 gives (a risk to the human's computer). Also not tried: the 40 spinners together with the file
  loops in a series of 30 separate runs. Under 40 spinners alone one run took up to 88 s, so such a
  series would have taken over an hour. The heaviest combination I used was the 300 in-process runs
  under the file loops and 20 spinners.

## Checks (each command with its exit code)

- The three series above, each with exit 0 and the counts in the table.
- `npm.cmd test -- tests/invariants/test_account_save_backup_failure_notice.py` → **exit 0**,
  `Ran 8 tests in 29.017s`, `OK` (alone, after all my load had stopped).
- `npm.cmd test -- tests/invariants/test_account_save_backup_encrypted.py` → **exit 0**,
  `Ran 2 tests in 9.822s`, `OK`.
- The probes and their exit codes are listed under "More attempts" above.
- `python -B .the-way/elements/common/foundation_check.py`: **not run.** No `// invariant:` or
  `decision:` comment was added or changed, because no file changed.
- **Not run, as the method and the handoff give:** the full gate (`npm.cmd test` without a file,
  `gate_times.py`). That stays the orchestrator's, and this case needs its 3 full gate runs under
  load.
- **Not reached by the slice:** "the case then passes at least 30 further separate runs" applies
  after a repair. With nothing changed, there is no "after".

## Own-work check

- **Requirement most likely unmet:** "the cause … is established". It was not established. The
  report names what is ruled out and what stays a guess.
- **A second risk: attempts that never exercise the failing path.** A series that "passes" proves
  nothing if the INT never reaches a working trap. The check: the in-process probe counted, for
  each of its 320 runs, the exit code 130 and the presence of the `docker` record. All 320 showed
  both, so the stand-in ran, sent INT, and the trap ended the script.
- The same kind of check caught one of my own loads that did not do what I meant: the 4 signal
  loops ran with SIGINT ignored (point 8). The table and "More attempts" describe them as what they
  were.

## Reaches beyond the handoff

- `git show 4955a906:docs/task-cycles/oboz-w-siedzibie/base-gate-2.log` and `…/gate-final.log`,
  only the `== tests/…` and `Ran … tests in …` lines, to check executor 19's "45% slower".
- `base-gate.log` lines 2581-2665 (`tests/quality` of the same run), to see whether it held a
  failed process start.
- `.the-way/gate/run_tests.py`, by searching for `concurrent`/`ThreadPoolExecutor`: whether
  directories run at the same time.
- `scripts/test.py` lines 1-80: the paths a single-file run adds, for the runner.
- `tests/deploy/deploy_script_support.py` (`GUARD`, `git_bash`, `shell_path`, `read_bytes`,
  `write_bytes`): how stand-ins are written and found.
- `tests/invariants/loop2_invariant_support.py:117-183` (`_windows_descendants`, `kill_tree`,
  `popen`): whether a concurrent killing of a process tree could hit a stand-in. It is called only
  on a timeout in `tests/deploy`, and taskkill's exit code is 1, not 0, so I did not follow it.
- `tests/deploy/test_restore_trial.py:395-445` (a CTRL_BREAK sender, skipped without Docker in that
  run) and `tests/deploy/test_loop2_watch.py:1235-1260` (the watcher's signal cases): the other
  senders of signals and console events.
- Cygwin's source on GitHub (`winsup/cygwin/sigproc.cc`, `spawn.cc`, `pinfo.cc`, `dcrt0.cc`), read
  through a summarising fetch tool: how exit codes of a child that ends early map to a status. It
  was the public source, with nothing of the project sent.

## Choices

- **Nothing changed.** That is the slice's own rule when the failure does not come back, and it
  matches Acceptance criteria and question 7 of the task. Way rejected: making the stand-ins more
  robust on a guess, for example retrying a start with no record. That would change the case
  without a cause shown and could hide a real fault of the script. Cost if wrong: the case can still
  fail once in a slow gate run.
- **A line for the task list (recommendation for the orchestrator):** the next occurrence should
  keep the whole gate log and, if it can be had, the stdout and stderr of the stand-in's stage. A
  log of the stand-in's own start written outside `calls/all` would tell "never started" from
  "started and ended at once". That is a change of the seam, so it is not mine to make here.

## Working copies

- `.runs\executor-20\`: the
  runner, the series, load and probe scripts, their outputs, and the probes' temporary directories
  (`race/`, `victim-*`). It was removed before return, with all its contents. The fixtures' own
  temporary directories (`loop2-backup-test-*` under the system's temporary directory) are made and
  removed by the case itself (`BackupFixture.remove`).
- Load processes: every spinner, file loop and signal loop I started was stopped through the file
  `stop-load` and the spinners' own deadline. Afterwards no `run_case`, `fileload`, `signalload`,
  `int_sender` or `spinners` process was left, and `node.exe` was back to the 4 processes that ran
  before I started (44 with my 40 spinners).

**Unread material:** `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-19-report.md`.
I read lines 1-135: the status, the cause, the attempts, the other flaky case and the checks. I did
not read lines 136 to the end (own-work check, reaches, choices, working copies). Everything else
the handoff names was read whole: `guidelines/testing.md` in two reads (lines 1-214 and 215-494),
`guidelines/coding.md`, D-233, D-235, both invariants, `mikrus-pusher-mail`, the part
`deployment`, and the passages of the task copied into the handoff.

**Searches not found or unclear:**

- Why a stand-in's stage can end with status 0 without the stand-in running a line: not found
  (Cause, point 9).
- The exact exit-code paths of Cygwin's exec for a child that ends before it syncs: unclear. The
  fetch tool summarised the source and would not quote whole functions.
- Whether the venv tools were missing in the worktree of the `4955a906` gate run: not checked.
