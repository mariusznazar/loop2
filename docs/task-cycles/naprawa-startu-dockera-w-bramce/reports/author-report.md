# Author report — task `naprawa-startu-dockera-w-bramce`

## Status

`done`

## Commits (branch `task/naprawa-startu-dockera-w-bramce`, base `a1306b53`)

Part 1, the repair of the start (two commits), then part 2, the side-by-side run (one commit, which
alone reverts part 2):

| Commit | Part | What |
|---|---|---|
| `5cf9df53` | 1 | `tests/quality/docker_standin.py`: the stand-in `docker` takes turns between overlapping calls (+57 −31) |
| `ed932e40` | 1 | `scripts/docker_gate.py` (+62 −1), `tests/quality/test_docker_gate.py` (+98 −1 with part 2's two lines), `foundations/decisions.md` D-390 (row 2) |
| `826b2a63` | 2 | `scripts/test.py` (+4 −5), `tests/quality/test_test_gate.py` (+35 −6), `tests/quality/test_docker_gate.py` (+2, two `decision: D-406` lines), `README.md` (+1 −1), `foundations/decisions.md` D-406 new answer and the D-405 rationale |

Reverting `826b2a63` leaves part 1 whole: `--jobs 1`, the old D-406 and the old pin test come back, and
the two lines `decision: D-406` of `test_docker_gate.py` go with it (they quote the new answer).

## What was made

### Part 1

- `scripts/docker_gate.py`: the process that starts Docker Desktop holds an operating-system lock
  (`start_lock`, a file `<state file>.lock`; `msvcrt.locking` on Windows, `fcntl.flock` elsewhere)
  from before `docker desktop start` until it has the answer. A process that finds no daemon,
  Docker present and Docker Desktop present waits for the lock (poll of `POLL_INTERVAL`), then goes
  by what the start left: a recorded gap (returns it), a daemon that answers (returns `None`), or
  neither (it starts itself). `daemon_gap` was split: the start-and-wait loop is now `started_gap`.
  The process that had to wait for the lock counts its limit from the end of the wait; a process
  that took the lock at once keeps the limit counted from its first ask, as before.
- `tests/quality/docker_standin.py`: the stand-in was racy (its state file was read while another
  call was writing it, and a `desktop start` could be lost to a concurrent write-back). One of the
  three first runs without `--jobs 1` showed it: the second failure then read "no Docker Desktop
  to start" instead of `2 != 1`. The stand-in now takes a lock directory for the length of one call
  (and takes a lock left by a killed call over after 5 s). No behaviour of the stand-in changed.
- `tests/quality/test_docker_gate.py`: new class `ProcessesAtOnce` (real processes, real
  `daemon_gap`, the stand-in, one shared state file):
  - `test_a_process_that_asks_during_a_start_of_another_waits_for_that_start_alone` (start that
    succeeds seen by a process that began during it; `decision: D-390`);
  - `test_a_process_that_asks_during_a_start_that_does_not_finish_gets_its_gap_after_it`
    (`invariant: gate-docker-start-waits-once`);
  - `test_a_start_whose_process_died_is_started_again_by_the_next_process_that_asks` (a process
    killed in the middle of a start; `decision: D-390`).
  `test_a_whole_run_that_finds_docker_stopped_starts_it_once_and_skips_nothing` got the lines
  `decision: D-390` and `decision: D-406`; `test_one_run_of_the_whole_gate_waits_for_a_docker_that_does_not_rise_once`
  got `decision: D-406` (it keeps its `invariant:` line).
- Foundation, row 2 (`row 2`): D-390 gets a second paragraph of binding sentences, its
  *Verification* a clause `tests:`, its *Rationale* a sentence on the lock. Wording of the new
  paragraph: "In one run of the gate, whichever of its processes need a daemon, Docker Desktop is
  started at most once: a test that asks for a daemon while a start begun by another process of the
  run has not finished waits for that start, within its limit, and starts none of its own; where the
  process that began the start ended before it finished, the next test to ask starts Docker Desktop
  again."
  - Meaning, English: a run of the gate starts Docker Desktop at most once, also when the start
    succeeds; a process that needs a daemon during another process's start waits for that start
    and does not begin its own; a start whose process died is begun again by the next process.
  - Znaczenie po polsku: przebieg bramki uruchamia Docker Desktop najwyżej raz, także gdy start się
    udaje; proces, który potrzebuje demona w trakcie startu zaczętego przez inny proces, czeka na
    ten start i nie zaczyna własnego; start, którego proces zginął, zaczyna od nowa następny proces,
    który o demona poprosi.

### Part 2

- `scripts/test.py`: `--jobs 1` and its comment withdrawn (the comment now reads "The directories
  of tests run at the same time (D-406)."); the module docstring's last clause changed to say that
  the directories running at the same time start Docker Desktop and await it once.
- `tests/quality/test_test_gate.py`: `test_the_whole_gate_runs_its_stages_and_gives_the_python_runner_one_job`
  (line `decision: D-406`) replaced by two tests:
  - `test_the_whole_gate_runs_its_stages`: the old test without the assertion on the argument
    (it checks that the build ran and that the Python stage and the foundation check ran);
  - `test_the_whole_gate_runs_the_directories_of_python_tests_at_the_same_time`
    (`decision: D-406 "The full gate runs the directories of Python tests at the same time"`): two
    directories each hold a test that passes only after a file of the other directory appeared, so
    the real `run_tests.py` of the fixture passes only when the directories run at the same time.
- `README.md`: "przez `python -B .the-way/gate/run_tests.py --jobs 1`, więc katalogi biegną jeden
  po drugim" is now "przez `python -B .the-way/gate/run_tests.py`, więc katalogi biegną naraz".
- Foundation, row 1 (`row 1`): D-406 has its answer in place (same number; heading and question
  unchanged): "The full gate runs the directories of Python tests at the same time, giving the runner
  of the Python tests no argument that limits how many of them run at once. A run of the gate with
  the directories at the same time starts Docker Desktop at most once and waits for it at most once,
  whichever directories need a daemon, so that `gate-docker-start-waits-once` holds in it."
  *Verification* is `tests:` (no pair of examples: the two sentences are held by the tests above);
  *Rationale* and *Rejected* rewritten to describe the decision as it stands (the 18.3–19.6 and
  23–24 / 24.0–28.0 minute measurements stay as the product's own with their record not open; the
  cause of the old failure is told as what stood in the way, now repaired; *Rejected*: the
  directories one after another with `--jobs 1`, 23 to 31 minutes against 18 to 20). D-405: only
  its rationale, "the full gate now runs them one after another (D-406)" -> "the full gate runs them
  at the same time (D-406)"; its answer is untouched.
  - Meaning, English: the full gate runs the directories of Python tests at the same time, and a
    run so made still starts Docker Desktop at most once and waits for it at most once.
  - Znaczenie po polsku: pełna bramka uruchamia katalogi testów Pythona naraz, a tak uruchomiony
    przebieg nadal uruchamia Docker Desktop najwyżej raz i czeka na niego najwyżej raz.

## Evidence of the fault, the failing run and the passing run

All runs are `python -B scripts/test.py tests/quality/test_docker_gate.py` (focused; no full gate).

| Run | Tree | Exit | Result |
|---|---|---|---|
| before the repair | `--jobs 1` removed from `scripts/test.py`, `docker_gate.py` as on base, stand-in made atomic | 1 | `Ran 12 tests`, `FAILED (failures=2)`; both `AssertionError: 2 != 1` (`test_a_whole_run_that_finds_docker_stopped_starts_it_once_and_skips_nothing` line 186 and `test_one_run_of_the_whole_gate_waits_for_a_docker_that_does_not_rise_once` line 174 of the base file). Log: `reports/author-run-before-repair-side-by-side.log`. Two more runs of the same tree gave the same two `2 != 1`. |
| the same, with the stand-in not yet atomic (first run) | same | 1 | `2 != 1` for the first, and for the second `'tried to start Docker Desktop' not found in '... this computer has no Docker Desktop to start'`: the stand-in's own race, fixed in `5cf9df53` |
| new tests on the old `docker_gate.py` | `--jobs 1` removed, new tests present | 1 | `Ran 15 tests`, `FAILED (failures=4)`: the two above plus the two new tests of `ProcessesAtOnce` about a start that succeeds and one that does not finish, both `2 != 1`; the dead-process test passes on the old code too (it has no lock to leave behind) |
| after the repair, directories side by side (`--jobs 1` removed) | `docker_gate.py` repaired | 0 | `Ran 15 tests`, `OK`. Log: `reports/author-run-after-repair-side-by-side.log`. Three more runs, exit 0 each, `OK` |
| after part 2 (committed tree) | HEAD `826b2a63` | 0 | `test_docker_gate.py`: `Ran 15 tests`, `OK`; `tests/quality/test_test_gate.py`: `Ran 9 tests`, `OK` |
| the new gate test with `--jobs 1` still in place | part 2's test, base `scripts/test.py` | 1 | `FAILED (failures=1)`: the first directory fails after its 20 s wait, "the other directory did not begin". Log: `reports/author-run-new-gate-test-with-jobs1.log` |

The invariant's tests (`gate-docker-start-waits-once`) were seen failing before the repair and
pass after: the two `GateRuns` tests and `test_a_process_that_asks_during_a_start_that_does_not_finish_gets_its_gap_after_it`
(the last one failed on the old code with `2 != 1`).

## Checks (command, exit code)

- `python -B scripts/test.py tests/quality/test_docker_gate.py`: exit 0 (15 tests) — five runs on the repaired code, all 0; the committed tree: 0.
- `python -B scripts/test.py tests/quality/test_test_gate.py`: exit 0 (9 tests).
- `python -B .the-way/elements/common/foundation_check.py` (the full citation run, not only `--skip-test-citations`): "0 errors" after part 1 and after part 2. The base lists many decisions "held by nothing"; none of them is D-390, D-405 or D-406. A deliberately wrong quotation of a line `decision: D-390` made the check report "the quotation stands in no binding sentence of `D-390`", and was restored.
- ruff, with the repository's own `ruff.toml` and the flags of `test_ruff_source_rules`, over `scripts` and `tests/quality`, using the ruff of the main checkout's `.runs/quality-venv` (this worktree has no `quality-venv`): exit 0, "All checks passed!".
- Not run: the full gate (`npm test`) and `.the-way/gate/run_tests.py` over the repository, as the handoff forbids; `test_quality_invariants.py` as a whole (needs `.runs/quality-venv`, absent from this worktree; only ruff was run by hand); the whole of `tests/deploy` and `tests/invariants` with a real Docker (not mine to run, and the stand-in is what the tests here use).

## Own-work check (section 3)

Requirement most likely not met: "the run with the directories side by side starts Docker Desktop at
most once and waits for it at most once, whichever directories need a daemon" — in particular when
the processes do not begin at the same moment, and when the start that is going on does not succeed.

Checks and what they showed:
1. Two real processes, the second launched when the stand-in has logged the first `desktop start`,
   success path: both answer `None`, one start. Failed on the old code (`2 != 1`), passes now.
2. Same, with a daemon that never rises, limit 4 s: both processes return the same gap, one start,
   total under 4 + 4 + 20 s. Failed on the old code, passes now.
3. A first process killed during its start: the next process starts again (two starts in all) and
   returns `None`; the lock is the operating system's, so nothing holds the second.
4. Mutations, each caught: skipping the daemon re-ask after a wait -> `GateRuns` successful-start
   test and `...waits_for_that_start_alone` fail (`reports/author-mutation-skip-reask.log`);
   skipping the re-read of the gap inside the lock -> the two tests of a start that does not finish
   fail (`reports/author-mutation-skip-gap-reread.log`). Both restored before commit.
5. Repetition for flakiness: five runs of the whole file after the repair, all green (about 48 s each).

## Reach beyond the dispatch

- `.the-way/elements/decisions/template.md`, `.the-way/elements/common/rules.md`, `.the-way/elements/common/way_of_working.md`, `.the-way/elements/decisions/skill/{read,decide_entry}.md`: read whole, as `foundation_step.md` gives for a decision.
- `.the-way/gate/run_tests.py` (head and `run_all`): to check that the runner runs the directories at the same time when given no argument, and how it takes its jobs.
- `git ls-files --eol`, `.gitignore`, `ruff.toml`, `tests/quality/test_quality_invariants.py`: for line endings (all LF) and to run ruff by hand.
- `guidelines/testing.md` was read in three pages (whole); `guidelines/coding.md` whole.
- `scripts/restore-trial.mjs` (lines 65, 236–243, 495–530) and the support files `tests/invariants/account_container_support.py`, `tests/deploy/deploy_script_support.py` (names only): for item 2.
- A search of `*.md`, `*.py`, `*.mjs`, `*.json`, `*.yml` for `jobs 1` / `one after another` outside `node_modules`, `.the-way`, `.runs`: the only places that spoke of the one-after-another run were `scripts/test.py`, its pin test, `README.md`, D-405 and D-406.

## Item 2: do the Docker tests of `tests/deploy` and `tests/invariants` collide when the directories run at once?

Result: **no collision found.** Read, test by test (revision of this worktree, base `a1306b53`):

The tests that use a real Docker (those that call `docker_gate.require_daemon`):

| Test file | Image tag | Container names | Volumes | Port / network |
|---|---|---|---|---|
| `tests/deploy/test_account_backup_stream.py` | `loop2-backup-stream-check:` + `uuid4().hex[:12]` (lines 57–58) | `loop2-backup-stream-` + same suffix (65) | via `create_account_volumes` | none published; no network made |
| `tests/deploy/test_account_storage.py` | `loop2-account-storage-check:` + `uuid4().hex[:12]` (101–102) | `loop2-account-storage-first-` / `-second-` + suffix (111, 135) | via `create_account_volumes` (108) | none |
| `tests/deploy/test_loop2_image_icons.py` | `loop2-image-icons-check:` + uuid (94) | `loop2-image-icons-check-` + uuid (95) | via `start_production_container` | none |
| `tests/deploy/test_loop2_tunnel_image.py` | `loop2-tunnel-check:` + uuid (37) | `loop2-tunnel-check-` + uuid (38) | none | `--network none` (52); `docker compose ... config` only reads |
| `tests/deploy/test_restore_trial.py` (the one real-Docker test `RunOnARealBackup`, 314 ff.) | `loop2-restore-trial-check:` + uuid (370) | `loop2-restore-source-` + uuid (339); the launcher `scripts/restore-trial.mjs` names its own `loop2-restore-trial-{data,secrets,setup,app}-<id>` (65, 240–243) | via `create_account_volumes`; the launcher's two volumes with the prefix | the launcher uses `--network` (382, 415) for its own containers |
| `tests/invariants/test_loop2_container_icons.py` | `loop2-invariant-check:` + uuid (129) | `loop2-invariant-check-` + uuid (130) | via `start_production_container` | none |
| `tests/invariants/test_loop2_container_sprites.py` | same prefix + uuid (133–134) | same | same | none |
| `tests/invariants/test_loop2_one_serving_process_container.py` | same prefix + uuid (200–201) | same | same | none |

`tests/invariants/account_container_support.py:75–83, 102` gives every volume `loop2-account-data-check-` / `loop2-account-secret-check-` + a full `uuid4().hex`, the setup container `loop2-account-secret-setup-` + 12 hex characters of it, and proves the volume name absent before it creates it (80–81). No test of the eight publishes a port (`-p` / `--publish` appear nowhere in them) or creates a network (the only `--network` arguments are `none` in `account_container_support.py:87`, `test_loop2_tunnel_image.py:52`, and the restore launcher's own).

The one place where a test looks at containers or volumes **by pattern** is `tests/deploy/test_restore_trial.py` `leftovers()` (296–304): `docker ps -a` and `docker volume ls` filtered with `name=loop2-restore-trial-`, asserted empty at 365 and 382, and force-removed at 307–311. No name made by any other of the eight tests contains the substring `loop2-restore-trial-` (the closest, `loop2-restore-source-` and the image tag `loop2-restore-trial-check:`, are not a container or a volume name with that substring: the tag is an image, which neither listing reads). So a test of `tests/invariants` running beside it cannot make `leftovers()` non-empty. What could: a second run of the whole gate on the same computer at the same time (two `test_restore_trial` tests live then), which is a collision between two gates, not between the two directories of one; the task states that the gates of cycles run one at a time on this computer. Not repaired, named only.

The other tests of the two directories that name `docker` (`test_loop2_deploy_build.py`, `_commit.py`, `_dump.py`, `_switch.py`, `test_loop2_deploy_keeps_running.py`, `test_loop2_deploy_trigger_input.py`, `deploy_script_support.py`) use recording stubs written into a temporary directory; none reaches a real daemon.

What the eight tests do share, not by name: the CPU and memory of the computer and BuildKit's layer cache (several `docker build` of the same context at the same time). That is load, not a collision; the orchestrator's three runs will show whether it matters.

## Choices (the questions carried to the cycle)

1. **How a start in progress becomes visible, and what becomes of a process that died in the middle of a start.**
   Chosen: an operating-system lock on a file beside the state file, held by the process that starts, from before `docker desktop start` until the answer; the others wait for it with a poll and then re-read the recorded gap and re-ask the daemon (and start themselves only if neither answers). The operating system releases the lock when its holder ends, however it ends, so a process that died in the middle of a start leaves nothing recorded and holds no one; the next process starts again and waits its own limit. A start that ended with its process finished nothing anyone waited for, so a second start there does not break "at most once" in a run where nothing dies; D-390 says so in the second paragraph.
   Rejected: (a) a state file that records "start in progress" with the pid of the starter: needs a check whether the pid is alive, and on Windows `os.kill(pid, 0)` is not a check (it ends the process), so a portable check needs another mechanism and a stale record can hold the others up; (b) a marker file made with `O_EXCL`: a process that died leaves the marker, so the others wait for a start nobody makes until a timeout I would have to invent; (c) recording "started" (a success) in the state file after the start: a daemon that answered and later stopped would then never be started again in the run, and the re-ask of the daemon already tells success.
   Cost if wrong: a Windows `msvcrt.locking` that behaves differently from what I tested would let two processes start (the tests then fail with `2 != 1`, as before the repair); a waiter has no cap of its own for the wait for the lock, so a starter that hung would hold it up, but every call of the starter is capped by its own limit (`within`), so a waiter waits at most about the starter's limit; the `fcntl` branch is **untested** (this computer is Windows and WSL has no Python): on Linux and in a container the lock is not reached at all, because there `docker desktop` is absent and `daemon_gap` returns before it, so the branch runs only on a Mac with Docker Desktop.
2. **What the new D-406 answer puts in the place of the test that pins `--jobs 1`.**
   Chosen: a behaviour test of the sentence, `test_the_whole_gate_runs_the_directories_of_python_tests_at_the_same_time` (two real directories that pass only if they run at the same time, through the real runner of the fixture), plus the old test without the argument assertion, kept as `test_the_whole_gate_runs_its_stages` and holding no decision line; the second sentence of D-406 is held by the two `GateRuns` tests, which carry a `decision: D-406` line each.
   Rejected: (a) an assertion that the Python stage was given no arguments (`python-stage` file empty): it fails only on a deliberate decision, and the guideline "test behaviour, not text" and the skill's "name the break each test catches" call that a test worth nothing; (b) no test, leaving the `GateRuns` tests to hold D-406: they fail on a start made twice, not on `--jobs 1` coming back, so a return of `--jobs 1` would pass every test and the first sentence of D-406 would be held by none.
   Cost if wrong: the rendezvous test waits 20 s and fails if the real runner ever runs directories one after another; on a computer with one processor the runner still runs both directories (threads, one process each), so it does not depend on the number of processors, but a heavily loaded computer that does not start the second directory within 20 s would fail it falsely.

Also named:
- **The test of a successful start carries `decision: D-390` and `decision: D-406`, not `invariant: gate-docker-start-waits-once`.** The row asked whether it gets the invariant's marker; the invariant's sentence is about a start that has not finished in its limit, and a successful start does not show it. The invariant is not changed. Rejected: widening the invariant to a successful start, which is a change of an invariant the row did not carry. Cost if wrong: the invariant's test line stays on the two tests of an unfinished start only.
- **The sentence of D-390 is a second paragraph, not a fourth sentence of the first.** The first paragraph already has three sentences (limit three); the template allows a paragraph for a part of another question that the entry answers. Rejected: merging into an existing sentence, which would put a test's quotation (it must begin at the start of a sentence) in the middle of one.
- **D-406 keeps its number and its question**, as row 1 and the task say ("a new answer in place"); the heading's wording "one after another or at the same time" stays a fair question.
- No move out of a function over the size threshold: `guidelines/coding.md` holds no rule of size (the task says the rule is for another task), so section 1's move did not apply; `daemon_gap` was nevertheless split into `daemon_gap` and `started_gap` by the change itself.

## Problems observed

- The stand-in `docker` was itself racy under concurrent calls (see Part 1); fixed and covered by the runs above. Evidence: the first run without `--jobs 1` before the fix, second failure "no Docker Desktop to start". Cause verified: its read of `state.json` met a write in progress (reading the code), and the runs after the fix no longer show it (three runs).
- The README's paragraph, D-405's rationale and `scripts/test.py`'s docstring are the only places that told the one-after-another run; no other file did (search above).

## Mismatches with the handoff

- The handoff asks the failing run to show "the two `AssertionError: 2 != 1`". With the stand-in as it was, one of three runs showed a different second failure (the stand-in race). Both runs I recorded (`reports/author-run-before-repair-side-by-side.log`) show the two `2 != 1`, taken after the stand-in was made atomic; the first, racy run is described above, its log not kept.

## Unread material

none. (Handoff-named: D-390, D-391, D-392, D-405, D-406 read whole; the invariant `gate-docker-start-waits-once` read whole; the part-map entries `build-tools` and `product-foundation` were not read: I changed no file the part map names as a boundary of `build-tools` and the handoff itself states the answer of step 4, so I did not open the part map. D-77, D-83, D-49, D-73, D-28 were not read whole: I only read how the task and the testing guidelines cite them, as out of scope, and changed nothing they hold.)

## Searches not found or unclear

- The part-map entries named by the handoff were not opened (see above); nothing needed them.
- Whether a test may carry two `decision:` lines: the template says "a line `decision:`" for a test and the foundation check accepted two on one test (0 errors, and the one-wrong-quotation check proves the lines are read).
- Whether the `fcntl` branch works: not found how to run it here (no Linux Python on this computer); named in the cost of choice 1.

## Working copies

None left. I made working copies of my own under `.runs/author/` of this worktree (`test.py.orig`, `docker_gate.py.good`, `t.bak`, and the run logs); the directory was removed before returning. The logs the report needs are kept in `reports/` beside this file (`author-run-before-repair-side-by-side.log`, `author-run-after-repair-side-by-side.log`, `author-run-new-gate-test-with-jobs1.log`, `author-mutation-skip-reask.log`, `author-mutation-skip-gap-reread.log`). The stand-in `docker` of the tests makes its own temporary directories, which the tests remove (files a product's tests make by themselves).
