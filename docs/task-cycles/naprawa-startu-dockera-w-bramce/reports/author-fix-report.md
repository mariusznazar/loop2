# Author fix report — task `naprawa-startu-dockera-w-bramce`

Status: `done`. Range of the fix: `826b2a63..c1735524`. No commit of the fix touches the files of
part 2 except M2, which edits one word of D-406 (a text `826b2a63` wrote); the commits for B1, M3 and
M4 touch only `scripts/docker_gate.py`, `tests/quality/test_docker_gate.py` and
`tests/quality/docker_standin.py`.

## Commits

| Commit | Finding | Files |
|---|---|---|
| `41015a29` | B1 | `scripts/docker_gate.py` (the ask of the daemon after the lock no longer depends on `waited`), `tests/quality/test_docker_gate.py` (new test) |
| `d1acd7a8` | M3 | `scripts/docker_gate.py` (`StartWaitExpired`, `start_lock(deadline)`, `unfinished_gap`), `tests/quality/test_docker_gate.py` (new test) |
| `ee6ba709` | M4 | `tests/quality/docker_standin.py` |
| `c1735524` | M2 | `foundations/decisions.md` (D-406 *Verification*, one word) |

## Findings

**B1 — fixed.** After the lock is held and the gap re-read, `daemon_gap` now asks the daemon
whatever `waited` says; `waited` only resets the deadline. The cost on a stopped Docker is one more
fast failed `docker version` on the path of the starter. New test
`test_a_process_whose_first_ask_ends_after_a_start_is_done_does_not_start_again` (line
`decision: D-390`): process C is held at its first ask of the daemon by a file; process A then does
its whole start (answers `None`, one start); C is released, its first ask says no, it reaches the
lock free, and must not start again. C runs `docker_gate.daemon_gap` in a process of its own with
`daemon_answers` patched for the first call, as the reviewer's scratch did.
- On the code of `826b2a63` (`scripts/docker_gate.py` unchanged since; only the test added):
  `python -B scripts/test.py tests/quality/test_docker_gate.py` exit 1, `Ran 16 tests`,
  `FAILED (failures=1)`, `AssertionError: 2 != 1` at the last assertion of the new test (after C
  is released). Log: `reports/author-fix-b1-before.log`.
- After the fix: same command, exit 0, `Ran 16 tests`, `OK`. Log: `reports/author-fix-b1-after.log`.

**M1 — not changed; I hold the clause right, and agree it is the cycle's own choice.** The clause
"where the process that began the start ended before it finished, the next test to ask starts Docker
Desktop again" is what the code does (the operating system releases a dead holder's lock, nothing is
recorded) and `test_a_start_whose_process_died_is_started_again_by_the_next_process_that_asks` holds
it. The row approves only "at most once also when it succeeds" and "a test that asks during another
process's start waits for that start, within its limit, and starts none of its own". The orchestrator
should show the clause to the human in the request as the cycle's own choice (my first report named it
as choice 1, not as part of the row).

**M2 — fixed** (`c1735524`): "a run of the whole gate with them so that starts Docker Desktop once"
now reads "a run of the whole gate with them that starts Docker Desktop once and waits for it once".
Full `foundation_check.py`: "0 errors".

**M3 — fixed** (`d1acd7a8`). The wait for the lock is capped at the waiter's own deadline (the limit
counted from its first ask): `start_lock(deadline)` raises `StartWaitExpired` when the lock is not let
go of by then, `daemon_gap` catches it and returns the gap of a start that did not finish
(`unfinished_gap`, which also records it for the run, as `started_gap` does). This covers both a live
but stalled holder and an `OSError` of the lock call that `try_lock` reads as "held" for ever: the
waiter ends at its limit either way, and starts none of its own. D-390's sentence already says "waits
for that start, within its limit, and starts none of its own" and what a start that does not finish
gives, so I left D-390 untouched (row 2 and the M1 clause stay as they were). New test
`test_a_wait_for_a_start_that_never_lets_go_ends_in_the_limit_with_the_gap` (line
`invariant: gate-docker-start-waits-once`): the test holds the lock itself and does nothing, a process
with limit 3 asks, and gets the gap within 3 + 20 s with no start; a second process then gets the same
gap at once (recorded).
- Before (tree of `41015a29`, test only added): exit 1, `Ran 17 tests`, `FAILED (errors=1)`, the new
  test raising `subprocess.TimeoutExpired` (the waiter had no limit and was still waiting after 60 s).
  Log: `reports/author-fix-m3-before.log`.
- After: exit 0, `Ran 17 tests`, `OK`. Log: `reports/author-fix-m3-after.log`.
- A deliberately narrower error handling of `try_lock` (answering False only for "the lock is taken")
  was not made: the cap bounds the wait, and I know the errno values of only the Windows case.

**M4 — fixed** (`ee6ba709`): the holder's `rmdir` of the lock directory in the stand-in is now in a
`try ... except FileNotFoundError`, so a holder whose lock was taken over as stale ends its call as it
should. Evidence: a one-off check (not kept as a test, the case needs a call stalled for more than 5 s)
of the takeover path — a stand-in call run with the lock directory left in place waited 5.1 s, took the
lock over, answered `99.0.0`, exit 0, left no lock. The `FileNotFoundError` branch itself I did not
provoke (it needs a holder stalled over 5 s in the middle of a call); it is by reading.

**M5 — not fixed, as the handoff says.** None of my changes touches the comment of
`test_a_whole_run_that_finds_docker_stopped_starts_it_once_and_skips_nothing` or the "Accepted with it"
sentence of D-406, so nothing is made worse. A revert of `826b2a63` also needs the revert of `c1735524`
(it edits D-406 as part 2 wrote it); otherwise the revert conflicts at that line.

## Checks (command, exit code)

- `python -B scripts/test.py tests/quality/test_docker_gate.py`: exit 0, 17 tests, `OK` (head `c1735524`).
- `python -B scripts/test.py tests/quality/test_test_gate.py`: exit 0, 9 tests, `OK`.
- `python -B .the-way/elements/common/foundation_check.py`: "0 errors" (full citation run), exit 0.
- ruff (`ruff.toml`, flags of `test_ruff_source_rules`, ruff of the main checkout's `quality-venv`) over `scripts` and `tests/quality`: exit 0.
- Not run: the full gate; `test_quality_invariants.py` as a whole (no `quality-venv` in this worktree).

## Choices

- B1: the unconditional re-ask, the reviewer's own proposal; rejected: re-asking only when the first
  ask took long (a timing rule to tune, more branches). Cost if wrong: one extra `docker version`
  (fast on a stopped daemon, at most the remaining limit, at least 1 s) before every start.
- M3: where the wait expires the process records the gap, as a start that did not finish; rejected:
  starting itself after the wait (breaks "starts none of its own"), and returning the gap without
  recording (every later test of the run would wait out its own limit again, against D-390's "skipped
  at once"). The text of the gap ("the gate tried to start Docker Desktop and no daemon answered
  within N seconds") is the same as the other unfinished start, though the waiter itself did not call
  `docker desktop start`; I kept one sentence for both, since another process of the run did.

## Reach beyond the handoff

none beyond the findings file, `fix.md`, and the code they name (`scripts/docker_gate.py`, the three test files). I did not open `reports/review-whole-report.md` or the reviewer's scratch script.

## Unread material

`reports/review-whole-report.md` (the handoff names it as the full review; the findings file gave
what the fix needed) and `reports/review-whole-scratch-late-lock.py`; nothing else.

## Searches not found or unclear

none

## Working copies

`.runs/author-fix/` (run logs only) was removed before returning; the logs the report cites are kept
in `reports/` (`author-fix-b1-before.log`, `author-fix-b1-after.log`, `author-fix-m3-before.log`,
`author-fix-m3-after.log`). The stand-in's temporary directories are made and removed by the tests
and by my one-off M4 check.
