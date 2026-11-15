PASS c1735524201ee4488a352af3aff4a03bedd71c86

# Review of the fix — task `naprawa-startu-dockera-w-bramce`

Range `826b2a63..c1735524` (`41015a29` B1, `d1acd7a8` M3, `ee6ba709` M4, `c1735524` M2). `git rev-parse HEAD` is `c1735524201ee4488a352af3aff4a03bedd71c86`, the head given. Read: the handoff, `fix.md`, the findings file, the author's fix report, `git diff 826b2a63..c1735524` (4 files, +100 −15). Counts: 0 blocking; 3 Minor that remain or are new, none blocking; 0 out of scope.

## Each finding of the findings file

- **B1 — fixed.** `scripts/docker_gate.py` `daemon_gap`: after the lock is held and the gap re-read, `daemon_answers` is asked whatever `waited` says; `waited` only resets the deadline. The new test `test_a_process_whose_first_ask_ends_after_a_start_is_done_does_not_start_again` builds the late-lock case: process C's first ask is held by a file, process A then makes its whole start (answers `None`, one start), C is released, says no, takes the free lock with `waited` False and must not start again. Does it fail for that case and only then? I ran it on a copy of the head in which I put the old logic back (the ask only inside `if waited:`): `AssertionError: 2 != 1`, exit 1 (the author's before log shows the same on `826b2a63`). On the head it passes (17-test run below). The one thing it fails on is a second start by the late process; the held-ask trick does not depend on timing. The cost the author names (one more fast failed `docker version` on a stopped daemon, never more than the remaining limit) is real and small.
- **M1 — left unchanged on purpose** (the handoff says the cycle shows the clause to the human); no judgment here.
- **M2 — fixed.** D-406 *Verification* now reads "a run of the whole gate with them that starts Docker Desktop once and waits for it once." One word changed; `foundation_check.py` exit 0, "0 errors".
- **M3 — fixed.** `start_lock(deadline)` raises `StartWaitExpired` when the lock is still held at the waiter's own deadline (the limit counted from its first ask), the polling sleep is cut to the time left, `daemon_gap` catches it and returns `unfinished_gap(limit)`, which records the gap for the run as `started_gap` does (the tail of `started_gap` moved into it unchanged). The raise happens before the `yield`, inside the `try`, so the descriptor is closed. It covers the stalled live holder and an `OSError` that `try_lock` reads as "held" for ever. The new test `test_a_wait_for_a_start_that_never_lets_go_ends_in_the_limit_with_the_gap` has the test process hold the lock and the child ask with limit 3: gap within 3 + 20 s with "within 3 seconds", no start, and a second process gets the same gap at once. On a copy of the head with the cap removed I ran it: the child never ends, `subprocess.TimeoutExpired` after 60 s, exit 1; on the head it passes. It fails only for the missing cap.
- **M4 — fixed.** `docker_standin.py`: the holder's `rmdir` of the lock directory is in `try ... except FileNotFoundError`. I did not provoke the branch (it needs a call stalled over 5 s); by reading it ends the call as it should. See N3 for a remaining edge of the same takeover.
- **M5 — not part of this fix** (contingent on a revert). The author's remark that reverting `826b2a63` also needs reverting `c1735524` (it edits D-406 as part 2 wrote it) is right: that commit changes one line inside the D-406 block that `826b2a63` rewrote.

## What the fix itself may have broken (new findings)

None Critical or Important. Judged against D-390's new paragraph and `gate-docker-start-waits-once`:

- A waiter whose wait expired returns the gap "the gate tried to start Docker Desktop and no daemon answered within N seconds" and records it, so every later test of the run is skipped at once with no new start: that is what the invariant says for a start that did not finish in its limit, and the waiter waited once, within its own limit, and started none of its own. It matches D-390's "waits for that start, within its limit, and starts none of its own".
- Normal order of waiters and holder: a holder asked first, so its deadline is no later than the waiter's, and it ends (success or recorded gap) before the waiter's cap; the waiter then re-reads the gap and re-asks as before. The cap changes behaviour only where the holder outlives the waiter's deadline.
- A start that succeeds, a start that does not finish, a dead starter, a process beginning during, before and after a start: traced through the new code, unchanged except as B1 and M3 intend. Existing tests of `DaemonGap` and `GateRuns` still pass with the extra ask after the lock.

**N1 — Minor, new, `scripts/docker_gate.py` `daemon_gap` / `start_lock`: the cap uses the waiter's own deadline, which can fall before the end of a holder that restarted after a dead starter.** A holder that took the lock after waiting resets its deadline to its own later time, so it can still be starting when a waiter that asked earlier reaches its deadline. That waiter then records "no daemon answered within N seconds" although the holder's start may yet succeed, and the later tests of the run are skipped with a message that Docker did not rise. The case needs a starter that died (D-390's clause of M1) and a second waiter whose limit ends first; a narrower variant: a waiter that begins within about a second of the holder (its deadline then lies before the holder's last ask ends, which can run past the holder's deadline by up to the minimum call time of one second) and a daemon that answers only in that last second. Both are rare and the cost is a skip that the run reports as unchecked, not a wrong pass. Grade Minor; within the task; blocks nothing. A cure would be to cap by the wait and not record the gap, or to re-ask once before recording; not needed for this review.

**N2 — Minor, new, `scripts/docker_gate.py` module docstring (top of the file): it says a waiting process "goes by what the start left: a gap recorded, a daemon answering, or, where the process that started died, neither, and then it starts itself", and does not mention the new end of the wait at the process's own limit (the gap then recorded).** `daemon_gap`'s docstring is also silent on it. The code and D-390 are right; the docstring is incomplete. Within the task.

**N3 — Minor, new, `tests/quality/docker_standin.py` bottom of the program: after a stale takeover the late holder's `rmdir` (now tolerant of a missing directory) can remove the lock directory that the taker has made in the meantime.** A third call could then enter beside the taker. It needs a call stalled over 5 s inside the stand-in and a third caller at that moment; before the fix the same stall crashed the holder. Within the task, stand-in only.

## Declined to judge

- Whether the unconditional ask after the lock costs measurable time on a real stopped Docker Desktop: the orchestrator's three full runs measure the gate; I may not start or stop the real Docker Desktop.
- M1 and M5: set aside by the handoff.

## Checks I ran (command, exit code)

- `git rev-parse HEAD`, `git log 826b2a63..c1735524`, `git diff 826b2a63..c1735524`: head confirmed.
- `python -B scripts/test.py tests/quality/test_docker_gate.py` in the reviewed worktree: exit 0, `Ran 17 tests`, `OK`, 59.7 s (log kept as `reports/review-fix-docker-gate-run.log`).
- `python -B .the-way/elements/common/foundation_check.py` in the reviewed worktree: exit 0, "0 errors".
- `the ruff of the main checkout's quality environment check --config ruff.toml --ignore-noqa --no-fix --no-cache scripts tests/quality` (the main checkout's venv binary, read only): exit 0, "All checks passed!".
- Mutation of B1 in a copy (the old `if waited:` guard put back around the ask): `PYTHONPATH=<copy root> python -B -m unittest test_docker_gate.ProcessesAtOnce.test_a_process_whose_first_ask_ends_after_a_start_is_done_does_not_start_again` from the copy's `tests/quality`: exit 1, `AssertionError: 2 != 1`.
- Mutation of M3 in a copy (the `raise StartWaitExpired` check removed): the test `test_a_wait_for_a_start_that_never_lets_go_ends_in_the_limit_with_the_gap` in the same way: exit 1, `subprocess.TimeoutExpired` after 60 s.
- Not run: `test_test_gate.py` (the fix touches nothing it reads; the author ran it, exit 0), the full gate, any real Docker Desktop, `test_quality_invariants.py` as a whole, the `FileNotFoundError` branch of M4, the `fcntl` branch.

## Reach beyond the dispatch

none beyond the handoff, `fix.md` (named by the method), the findings file, the author's fix report and the code of the diff (`scripts/docker_gate.py`, `tests/quality/docker_standin.py`, `tests/quality/test_docker_gate.py`, `foundations/decisions.md` D-406 line).

## Working copies

One: a worktree of `c1735524` at `.runs/review-fix/wt`, in which I made the two mutations. Removed with `git worktree remove --force` (exit 0) and `git worktree prune`; `.runs/review-fix/` then deleted after the run log was copied to `reports/review-fix-docker-gate-run.log`. The reviewed worktree was not changed (`git status --short` empty). Remainder: none.

## Unread material

Counts from my selection of the first review (64 decisions of the scopes `build-tools` and `product-foundation`: 13 read whole, 51 by title only) stand; this review added no decision. For this review I read whole: the handoff, `fix.md`, the findings file, the author's fix report and the diff. Not read again: the foundation selection of the first review (the diff changes one word of D-406 and no other entry). Guidelines: not re-read; the fix adds no rule of them that the first review had not weighed (the `guidelines/coding.md` and `guidelines/testing.md` of the first review stand).

## Searches not found or unclear

- Whether a real Docker Desktop answers `docker version` slowly while it starts (what makes the late-lock case real): not found; I may not start it. B1 stays fixed by the code either way.
- The author's `reports/author-fix-b1-before.log` and `reports/author-fix-m3-before.log`: I did not rely on them, I ran the mutations myself.
