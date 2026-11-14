# Slice 1 report: a test for the second look at the deployment's lock with a broken `flock`

- **Status:** `done with concerns`. The test is written, seen passing against the unchanged `deploy/loop2-watch`, seen failing against a temporary change, and committed. Concern: the named runner `scripts/test.py` did not finish in this session, so the named checks were run through `unittest` instead (see Checks).
- **Commit:** `3817a067` on `task/serwer-odczyty-i-straznik` (one commit, two files, by path). Not pushed.
- **Base:** `9630fb90ee9d405545455929a59842afe8e5a2a9`.

## Files changed

| File | Added | Removed |
|---|---|---|
| `tests/deploy/test_loop2_watch.py` | 19 | 0 |
| `tests/deploy/watch_script_support.py` | 8 | 5 |

`deploy/loop2-watch` is not changed at the commit: `git diff -- deploy/loop2-watch` is empty after `git checkout -- deploy/loop2-watch` (the temporary mutation was restored that way).

What changed:
- `watch_script_support.py`: `WatchFixture.hold_deploy_lock_from(look, status=1)` takes the status `flock` answers with at the held look. The stand-in's `flock` exits with the value of a new file `hold-shared-status`, which `hold_deploy_lock_from` always writes. Every existing call keeps status 1. The module docstring names the new option.
- `test_loop2_watch.py`: new method `TheDeploymentLock.test_a_broken_flock_at_the_second_look_drops_the_readings_and_names_its_status`, in the class beside the held-lock case. For status 2 and 127 it makes the first look free (`hold_deploy_lock_from(2, status=...)`), with a container exited and a failure line in the log, so the readings would send messages. It asserts: code 0 and no `pusher` call; `docker` was called (precondition); state file unchanged; exactly one log line; the line matches `loop2-watch: dropped: .*\(flock exit {status}\)`; the line does not match `is held|holds`. The test cites no invariant.

Note on the handoff's wording: the log line starts with a timestamp, then `loop2-watch: dropped: `, so the test matches that prefix rather than a line that begins with `dropped:`.

## Checks

Test-first: the new test describes behaviour that already exists, so it passed on the first run, as the handoff expects. The fixture extension was written before the test because the test needs it to reach its assertions.

1. Unchanged script, new test alone: `python -B -m unittest -v test_loop2_watch.TheDeploymentLock.test_a_broken_flock_at_the_second_look_drops_the_readings_and_names_its_status` (run in `tests/deploy`). Result: both subtests (status 2 and 127) `ok`, `Ran 1 test in 10.197s`, `OK`. The exit code was not captured for this run; the `OK` line is its result.
2. Mutation (temporary): in `deploy/loop2-watch`, the `dropped:` log line at line 557 was changed from `dropped: the deployment lock $DEPLOY_LOCK_WHY after the readings; the state is not advanced` to `dropped: the deployment lock is held after the readings; the state is not advanced`. Same command, result: exit 1, `FAILED (failures=2)`, both subtests FAIL. Excerpt: `AssertionError: Regex didn't match: 'loop2-watch: dropped: .*\\(flock exit 2\\)' not found in '2026-11-09T00:05:00Z loop2-watch: dropped: the deployment lock is held after the readings; the state is not advanced'`. Output file: `a temporary file of the session's scratchpad (mutant-run.txt, not kept)`.
3. Restore: `git checkout -- deploy/loop2-watch`, then `git diff --stat -- deploy/loop2-watch` is empty, `git status --short` is empty before the commit.
4. Named check `python -B scripts/test.py tests/deploy/test_loop2_watch.py`: NOT COMPLETED. Started in the background; after about 17 minutes it had printed one progress character. Stopped with TaskStop. I did not find the cause (the docker gate's state wrapper is trivial, so it is not the cause I can see). Substitute run: the module's 11 test classes, one `python -B -m unittest -v test_loop2_watch.<Class>` each (run in `tests/deploy`, stdin from /dev/null), each with exit 0: TheFiveKinds 15 OK, TheWindow 8 OK, TheState 10 OK, TheDeploymentLock 10 OK (includes the new test), TheWatchersOwnLock 4 OK, TheThrottles 9 OK, TheDockerCommands 6 OK, TheAbnormalEnds 8 OK, TheLog 5 OK, TheScheduleAsCronReadsIt 3 OK, TheConstants 1 OK. Total 79 tests, all OK. This is the same module through the same `unittest` loader that `scripts/test.py` uses for `test_*.py`, but without the runner's docker-gate wrapper; the runner itself is not verified by this run.
5. Named check `python -B scripts/test.py tests/deploy/test_loop2_watch_message.py`: substitute `python -B -m unittest -v test_loop2_watch_message` (run in `tests/deploy`), exit 0, `Ran 8 tests in 163.394s`, `OK`. It shares the changed fixture; the flock stand-in's new exit line runs only when `hold-shared-from` exists, so its tests are unaffected.
6. Named check `python -B scripts/test.py tests/quality/test_quality_invariants.py`: substitute `python -B -m unittest -v test_quality_invariants` (run in `tests/quality`), exit 0, `Ran 5 tests in 51.379s`, `OK`.
7. Not run: `npm test` (the whole gate, as instructed); `foundation_check.py` (not part of the slice's checks).

Own-work check (section 3):
- Requirement most likely not met: the second look with a broken `flock` must not be reported as a held lock, and the run must stay silent with the state unchanged.
- Check: the test above, run against the real script and against the wording mutation.
- Result: the real script passes both statuses; the mutation fails both statuses on the status-naming regex and on the not-held assertion. The failing run was made against a temporary change, and the file was restored before the commit.
- Second requirement: existing callers of the fixture keep their behaviour. Checked by the full `TheDeploymentLock`, `TheWatchersOwnLock` and message-file runs above: all OK.

## Choices made

- **Mutation form.** I used a wording mutation of the second look's `dropped:` line, not a change of the decision. In the current script the decision already drops the run for any non-zero status (`deploy_lock_is_held` returns held for every non-zero status); what differs by status is only the words of the line. So the test catches a wrong reason in the second look's line, not a change in whether the run drops. Rejected: changing the status branches of `deploy_lock_is_held`, which runs at both looks and would also break the first-look tests; that is not the second look alone. Cost if wrong: a reviewer who wants a logic-level mutant needs to add one; the current mutant is the one that the test is written to catch.
- **Fixture form.** Status is a second file, `hold-shared-status`, rather than a second field in `hold-shared-from`, so the existing file format and the `release_deploy_lock` path are unchanged. Cost: one more file in the stand-in directory.

## Reaches beyond the handoff

- `tests/deploy/backup_script_support.py`: read whole. The watch fixture builds on it (answers, `run`, `guard_stubs`), so I needed its mechanics.
- `scripts/test.py`: read lines 20-78 only (the runner's main flow and `python_file`), to see what the named check does.
- `scripts/docker_gate.py`: read `shared_state` (lines 97-108) and `start_desktop`/`within` (lines 111-122) and `require_daemon` (lines 153-158) only, while looking at the runner's slowness.
- Git commit rules: a hook delivered `.ai/rules/git.md` on the first commit attempt. I followed it: English message, commit by path, task branch, not `main`. The first attempt was refused by the hook and re-run unchanged.

## Unread material

- `guidelines/coding.md`, `guidelines/testing.md` (both pages), `deploy/loop2-watch`, `tests/deploy/test_loop2_watch.py`, `tests/deploy/watch_script_support.py`, `.the-way/task-cycle/change/SKILL.md`, `.the-way/task-cycle/change/slice.md`: read whole.
- `docs/task-cycles/serwer-odczyty-i-straznik/task.md`: read lines 25-39 only (the Source line and the To do list, item 5 at line 33).
- `foundations/decisions.md`: D-356 read whole at lines 9027-9041; D-235 read whole at lines 4956-4979 (the current ranges from the handoff).
- `docs/task-cycles/serwer-odczyty-i-straznik/plan.md`: not opened (the handoff gives the slice section).
- `tests/deploy/test_loop2_watch_message.py`: not read; I searched it for `hold`/`flock` only (no use of `hold_deploy_lock_from`), then ran it.
- `tests/quality/test_quality_invariants.py`: not read; run only.
- `tests/deploy/deploy_script_support.py` and `tests/invariants/loop2_invariant_support.py`: imported by the fixture chain, not read.
- `scripts/test.py` lines 1-19 and `scripts/docker_gate.py` other lines: not read.

## Searches not found or unclear

- Cause of the slowness of the named runner `scripts/test.py` on this machine: not found. What I saw: the runner printed one progress character in about 17 minutes; the same module run per class through `unittest` took about 11 minutes of test time in total (the per-class times reported: 186 s, 49 s, 129 s, 65 s, 20 s, 59 s, 31 s, 79 s, 23 s, 3 s, under 1 s), with the wall-clock time longer because the classes ran one after another in the background. Memory was not short (about 8 GB free). Guess, not verified: the many Git Bash child processes each test starts are slow on this machine.
- One background run of `test_loop2_watch` as a whole module sat on one test for more than 15 minutes, while that test passed alone in about 20 seconds; the per-class runs then completed. Cause not found; guess, not verified: the slow child-process start, as above.
- Nothing else unclear.

## Problems as observed

- The named runner did not finish in this session (above). This slice's named check is therefore not run in its named form; the substitute runs are listed with their results. The gate `npm test` was not run, as instructed.
- No other problem found in `deploy/loop2-watch` or the test files; no change to the script was needed.
