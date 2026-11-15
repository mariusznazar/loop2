# Findings of the review of the whole change, for the fix

Source: `reports/review-whole-report.md` (first line `FAIL 826b2a63607f53148d8c702ea5a8f234f5d1583f`), cut in the reviewer's words: the blocking finding B1 and the Minor findings M1-M5 within the task, none marked outside the task's scope.

### Blocking

**B1 — Important — `scripts/docker_gate.py:187-196` (`daemon_gap`, part 1, commit `ed932e40`): a process that takes the lock without waiting never re-asks the daemon, so a start that finished while it was on its way to the lock is begun a second time.**

The code:

```
    with start_lock() as waited:
        gap = recorded_gap()
        if gap:
            return gap
        if waited:
            deadline = time.monotonic() + limit
            if daemon_answers(...):
                return None
        return started_gap(limit, deadline)
```

The ask of the daemon after the lock is made only where `waited` is true. Take process C that begins while process A is starting Docker Desktop. C's first `daemon_answers` (line 180) finds no daemon, then `desktop_present` runs, then C reaches `start_lock`. If A has finished its whole start and let go of the lock before C's `try_lock`, C takes the lock at once (`waited` False), finds no recorded gap (A succeeded), skips the ask, and calls `started_gap`, which runs `docker desktop start` again with a daemon already answering. That is a second start in a run whose start succeeded, which is what D-390's new paragraph (a process that asks while another's start has not finished waits and starts none of its own) and the task's item 1 ("at most once ... also when processes begin at different moments") forbid.

How the window opens in practice: C's first `docker version` is made while Docker Desktop is coming up; each of the three calls before the lock (`daemon_answers`, `desktop_present`) is allowed up to 30 s (`ANSWER_LIMIT`), and a start takes 30-60 s by the decision's own estimate. A call that hangs on a half-ready daemon straddles the end of A's start. I did not measure that a real Docker Desktop hangs there; the code makes it possible, and the test of this case does not exist.

Evidence: `reports/review-whole-scratch-late-lock.py` (patches `daemon_answers` to say no once and then yes, `start_desktop` to count) printed `gap: None starts: 1`: a daemon that answers on the second ask, at the moment the lock is taken at once, still gets a start. Exit 0. None of the tests catches it: the author's mutation of the re-ask (`reports/author-mutation-skip-reask.log`) removed the re-ask only inside `if waited:`, and `ProcessesAtOnce` has no process that is stalled between its first ask and its lock.

Why it matters: it is the exact case the task and the new D-390 sentence were written for (processes beginning at different moments), and the invariant `gate-docker-start-waits-once` counts starts. The cost of the real second `docker desktop start` on a running Docker Desktop is not known here (probably a no-op), but the sentence of the decision is not met.

Fix, small: after the lock is held and the gap re-read, ask the daemon whatever `waited` says (a stopped Docker adds one fast failed `docker version` to the path of the starter), and give `waited` only the job of resetting the deadline; add a test with a process whose first ask is slow (the stand-in could hold a `version` call, or the test could patch `daemon_answers` in a process of its own as the scratch does). The slice it comes from: part 1, commit `ed932e40` (not part 2; reverting `826b2a63` does not remove it).

### Minor

**M1 — `foundations/decisions.md`, D-390's new paragraph, the clause "where the process that began the start ended before it finished, the next test to ask starts Docker Desktop again" (commit `ed932e40`).** Settlement row 2 carries two things: a start is at most once also when it succeeds, and a test that asks during another process's start waits for that start within its limit and starts none of its own. The clause about a start whose process died is the author's answer to the question the task carried to the cycle ("what becomes of the record of a process that died"). The code does what the clause says and the test `test_a_start_whose_process_died_is_started_again_by_the_next_process_that_asks` holds it, so it is not wrong; but it is a binding sentence the row did not approve, and it weakens "at most once" with a stated exception. Grade Minor because the code and test agree with it and the cycle was asked to choose; the request should show the clause to the human as the cycle's own choice, not as part of the row. Within the task.

**M2 — `foundations/decisions.md`, D-406 *Verification*: "a run of the whole gate with them so that starts Docker Desktop once and waits for it once" (commit `826b2a63`).** The sentence is garbled ("so that starts"); it should read "a run of the whole gate with them that starts Docker Desktop once and waits for it once". The meaning is recoverable, the text is not. Within the task.

**M3 — `scripts/docker_gate.py:140-153` (`start_lock`, `try_lock` at lines 42-60): the wait for the lock has no limit of its own and every `OSError` of the lock call counts as "held".** D-390's new paragraph says the waiting test waits "within its limit". The waiter is bound only by the holder's bound: every call of the starter is capped by `within(deadline, ...)`, so a live holder lets go after about its limit, and a dead one is released by the operating system; I checked this by reading. A holder that is alive and stalled (a suspended process) holds the others without end, and an `OSError` from `msvcrt.locking` or `flock` other than "the lock is taken" (for example a failure of the lock call itself) would make `try_lock` answer False for ever and the waiter polls for ever. The first is rare, the second is only a guess about uncommon errors; a cap at the waiter's deadline (then treat the start as one that did not finish) would make the sentence "within its limit" literal. Within the task, Minor because neither case is shown to happen.

**M4 — `tests/quality/docker_standin.py` `take_lock` (lines about 52-65 of the file in head): a call that waits more than 5 s takes the lock directory over, and the holder's `finally: (folder / "lock").rmdir()` can then raise `FileNotFoundError`.** In practice a call of the stand-in holds the lock for milliseconds, so this needs a process stalled for over 5 s inside the stand-in. If it happens the stand-in dies with a traceback and exit 1, which the tests read as "no daemon". It does not change what any existing test proves: the single-process tests never overlap calls, the answers of each command are those of the old program (I compared the diff command by command), and `calls.log` still counts the same calls. Minor, within the task.

**M5 — Contingent on the orchestrator reverting `826b2a63`: what the part-1 tree then says.** I checked the tree of `ed932e40` (the tree that reverting `826b2a63` gives) in a worktree of mine: `foundation_check.py` 0 errors, exit 0; `tests/quality/test_test_gate.py` 8 tests OK, exit 0 (needs a `node_modules/npm` there; the first run failed only for its absence). Part 1 is whole and consistent in code and README. Two texts are then not true: (a) `tests/quality/test_docker_gate.py`, the test `test_a_whole_run_that_finds_docker_stopped_starts_it_once_and_skips_nothing`, whose comment (added in `ed932e40`) says "Breaking it: let the directories' processes, running at the same time, each find no daemon..." and whose line `decision: D-390` cites a concurrent run: with `--jobs 1` back, this test runs its two directories one after another and would pass with the lock removed, so it no longer fails for the fault it names (the new `ProcessesAtOnce` class would still catch the fault, and D-390's *Verification* names those tests too); (b) D-406 as it then stands still says "Accepted with it: the gate takes longer than in those three runs until the repair is made", the repair being made. Both are small and the orchestrator can correct them in the commit that reverts; they come from part 1 only if part 2 is dropped. Within the task.
