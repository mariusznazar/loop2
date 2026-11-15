FAIL 826b2a63607f53148d8c702ea5a8f234f5d1583f

# Review of the whole change — task `naprawa-startu-dockera-w-bramce`

Range `a1306b53..826b2a63` (three commits: `5cf9df53`, `ed932e40` — part 1 —, `826b2a63` — part 2). `git rev-parse HEAD` is `826b2a63607f53148d8c702ea5a8f234f5d1583f`, the head given. One-author route, no spec, no plan, so no slice reviews: this is the only review of the whole change.

Counts: 1 blocking, 5 Minor, 0 out of scope.

## Findings

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

### Out of scope

none.

## What I weighed, by the handoff's list

- **The repair, other moments.** Start at the same moment: both try the lock, one takes it, the other polls and then re-reads the gap and re-asks (correct). Start during a start: the same. Start after a successful start: the first `docker version` answers. Start after a start that did not finish: `recorded_gap` at the top, and again inside the lock (this re-read after the lock closes the race of a gap recorded between the first read and the lock: correct). The start that does not finish: the starter records the gap inside the lock before it lets go (`started_gap` is called inside `with`), so a waiter cannot see "lock free, no gap, no daemon" for a start that ended unfinished: correct. Starter dies: the operating system lets the lock go, the waiter finds no gap and no daemon and starts for itself with a fresh limit (so its total is the wait plus its own limit; D-390 says so). Starter hangs: bounded by its own calls (see M3). The only hole I found is B1.
- **The `fcntl` branch, from the code.** `fcntl.flock(descriptor, LOCK_EX | LOCK_NB)` on an integer descriptor from `os.open`; contention raises `BlockingIOError`, a subclass of `OSError`, which `try_lock` catches; the descriptor is not inheritable (PEP 446), so the `docker desktop start` child cannot keep the lock after the holder closes it; each process has its own open file description, so two processes (and two descriptors of one process) conflict. I judge it sound and untested. The author's remark that it is reached only on a Mac is not exact: Docker Desktop also exists for Linux, where `docker desktop --help` succeeds, so a Linux computer with Docker Desktop reaches it. Not a finding.
- **Windows branch.** `msvcrt.locking(fd, LK_NBLCK, 1)` on byte 0 of an empty file (locking past the end of a file is allowed) raises `OSError` on contention; the lock goes with the handle at `os.close` or process end. The tests ran green here (two runs of `test_docker_gate.py`, below).
- **The stand-in.** See M4: no existing test proves less. The new `ProcessesAtOnce` tests take the shared-state file through `LOOP2_DOCKER_RUN_STATE` and the stand-in through `docker.environment`.
- **Tests, do they fail for the fault they name.** `test_a_process_that_asks_during_a_start_that_does_not_finish_gets_its_gap_after_it` and `..._waits_for_that_start_alone`: yes (author's runs on the old code show `2 != 1`; mutation logs; I did not repeat the mutations). `test_a_start_whose_process_died_...`: passes on the old code too, as the author says; it holds the clause of M1, not the lock. The rendezvous test of part 2 `test_the_whole_gate_runs_the_directories_of_python_tests_at_the_same_time`: it fails with `--jobs 1` (author's log `reports/author-run-new-gate-test-with-jobs1.log`) and passes without; it waits 20 s for the other directory's file, the runner starts both directories' processes together (`run_all` with `max_workers = number of directories`), so on a loaded computer the margin is the start of one Python interpreter against 20 s: safe. The replaced pin test (`--jobs 1` text) is gone and its replacement is a behaviour test: good.
- **Foundation entries against the rows.** D-390 new paragraph: row 2 plus the clause of M1; *Verification* lists `tests:` and keeps the pair of examples for what no test holds; *Rationale* adds the lock (more than the row, but it is the rationale of the code). D-406 in place (row 1): answer, *Verification*, *Rationale*, *Rejected* rewritten; its rationale now says the tests that use Docker give their containers, images and volumes random names, which item 2 supports (below); heading and question unchanged. D-405: only its last rationale sentence changed (`diff` shows nothing else). Texts that still say the directories run one after another: a search of tracked `*.md`, `*.py`, `*.mjs` outside `.the-way` and `package-lock.json` for "one after another", "jobs 1", "po kolei", "jeden po drugim": only D-405's answer ("stages one after another", which is about stages, not directories), D-406's *Rejected*, and unrelated matches; `README.md` and `scripts/test.py` are corrected. No decision or invariant outside the change contradicts it: D-391 (stays running), D-392 (no memory threshold), D-77, D-83, D-49, D-84, D-362 read, none touched. The invariant `gate-docker-start-waits-once` (first-start-unfinished, waited once) is not contradicted; it is narrower than the new D-390 sentence, as the author says. D-406's measurements stay worded as the product's own, with their record not open (D-362 forbids naming the note; the text names none).
- **Item 2, the Docker tests of `tests/deploy` and `tests/invariants`.** Checked against code, test by test: `grep require_daemon` names exactly eight test files (`test_account_backup_stream.py`, `test_account_storage.py`, `test_loop2_image_icons.py`, `test_loop2_tunnel_image.py`, `test_restore_trial.py`, `test_loop2_container_icons.py`, `test_loop2_container_sprites.py`, `test_loop2_one_serving_process_container.py`), the author's list. Image tags and container names carry `uuid4().hex[:12]` (lines checked: `test_loop2_image_icons.py:94-95`, `test_loop2_tunnel_image.py:37-38`, `test_restore_trial.py:339,370`, the three invariants at `129-130`, `133-134`, `200-201`, `test_account_backup_stream.py:57`, `test_account_storage.py:101`); `account_container_support.py:75` gives volumes a full `uuid4().hex`; `scripts/restore-trial.mjs:559` gives the launcher's names `randomBytes(6)`. No `-p`/`--publish` in these tests, and `--network` is `none` only (account support line 87, restore launcher lines 382, 415 in this file; the tunnel test `--network none`). The one by-pattern look, `leftovers()` in `test_restore_trial.py:296-304` (`name=loop2-restore-trial-`), cannot match a name made by another of the eight (the tag `loop2-restore-trial-check:` is an image, not listed). I found no prune of images or volumes in these tests that a run beside them could hit (the `prune` hits are in stub-based deploy tests, whose `docker` is a recording stub). The result "no collision found" is faithful to the code. The table of the author's report matches for every file it names.
- **Reserved choices.** None taken; the lock uses the standard library only. Trust boundary and irreversible operation (step 4 of the cycle said no): I judge it so too; the change writes a lock file beside the state file in a temporary folder and starts a user-visible application that D-391 already allows.

## Structure of the code the change leaves

`python -B .the-way/task-cycle/change_file_sizes.py a1306b53 826b2a63` (exit 0): `scripts/docker_gate.py` 158 to 219 (+61), `tests/quality/test_docker_gate.py` 212 to 309 (+97), `tests/quality/docker_standin.py` 99 to 125 (+26), `tests/quality/test_test_gate.py` 123 to 152 (+29), `scripts/test.py` 81 to 80, `README.md` 92 to 92, `foundations/decisions.md` 9929 to 9929. `guidelines/coding.md` holds no rule of size (no `### Size of a function and a file` heading), so there is no threshold test to run on base and head; no finding of structure. `daemon_gap` was split into `daemon_gap` and `started_gap`; nothing has no user after the change (`daemon_gap`'s docstring is updated for the lock; `shared_state` and the other helpers keep users); no name stopped being true that I found.

## Declined to judge

- Whether the three full runs show any failure that appears only with the directories side by side: the orchestrator's measurement (item 3 of the task), not yet made.
- What a second `docker desktop start` does on a running real Docker Desktop (B1's cost): I may not start or stop the real Docker Desktop of this computer.
- The `fcntl` branch's behaviour on Mac and Linux: judged from the code only, not run.

## Checks I ran (command, exit code)

- `git rev-parse HEAD`, `git log a1306b53..826b2a63`, `git diff a1306b53..826b2a63`: head confirmed.
- `python -B .the-way/elements/common/foundation_check.py` in the reviewed worktree: exit 0, "0 errors" (many "held by nothing" listings of old decisions, none of D-390, D-405, D-406).
- `python -B scripts/test.py tests/quality/test_docker_gate.py` in the reviewed worktree: exit 0, 15 tests OK, 48.7 s (log kept: `reports/review-whole-docker-gate-run.log`).
- `python -B scripts/test.py tests/quality/test_test_gate.py` in the reviewed worktree: exit 0, 9 tests OK, 22.0 s.
- `the ruff of the main checkout's quality environment check --config ruff.toml --ignore-noqa scripts tests/quality` (the main checkout's venv binary, read only): exit 0, "All checks passed!".
- `python -B .runs/review-whole/scratch_late_lock.py` (kept as `reports/review-whole-scratch-late-lock.py`): exit 0, printed `gap: None starts: 1`, the evidence of B1.
- In a worktree of `ed932e40` (the tree that reverting `826b2a63` leaves): `python -B .the-way/elements/common/foundation_check.py` exit 0 ("0 errors"); `python -B scripts/test.py tests/quality/test_test_gate.py` exit 0 (8 tests OK) after giving it `node_modules/npm`; the first run exit 1 (3 failures) only because that copy had no `node_modules/npm`.
- Not run: the full gate, any real Docker Desktop, the real `docker` tests of `tests/deploy` and `tests/invariants`, `test_quality_invariants.py` as a whole (no `quality-venv` in the worktree; only ruff by hand), the author's mutations (not repeated), the `fcntl` branch.

## Reach beyond the dispatch

- `.the-way/gate/run_tests.py` (lines 104-122 and its header): to confirm that a run with no argument gives each directory a worker of its own (`max_workers = number of directories`), for the safety of the rendezvous test.
- `tests/quality/gate_fixture.py` (`use_real_python_runner`, `track_files`): to read what the rendezvous test runs.
- `scripts/restore-trial.mjs` (lines 60-68, 236-244, 376-386, 559-560): the launcher's names and network, for item 2.
- `tests/deploy/test_restore_trial.py` (lines 290-312, 355-395), `tests/invariants/account_container_support.py` grep lines: for item 2.
- `git show ed932e40:tests/quality/test_docker_gate.py` and `:scripts/test.py`: the part-1 tree, for M5.
- `foundations/decisions.md` D-391, D-392, D-77, D-83, D-49, D-73, D-28, D-78, D-84, D-362 (whole); `foundations/invariants.md` entry `gate-docker-start-waits-once`: selected by Reading the foundation or named by the handoff.

## Working copies

One: a worktree of `ed932e40` at `.runs/review-whole/wt` (with a copy of `.the-way` and of `node_modules/npm` inside it). Removed with `git worktree remove --force` (exit 0) and `git worktree prune`; the directory `.runs/review-whole/` (scratch script, logs, lists of decisions) was then deleted, and `scratch_late_lock.py` and `docker_gate.log` were kept in `reports/` under the names `review-whole-scratch-late-lock.py` and `review-whole-docker-gate-run.log`. Remainder: none. (`.runs/npm/` in the worktree is not mine; I did not create it.)

## Unread material

Decisions of my selection: 64 decisions whose *Scope* names `build-tools` or `product-foundation` (found by a script over `foundations/decisions.md`, title of each listed). Read whole: 13 (D-28, D-49, D-73, D-77, D-78, D-83, D-84, D-362, D-390, D-391, D-392, D-405, D-406). By title only: 51 (all the others of the 64). Of those 51, titles that point to some bearing and that I did not open: D-163 and D-235 (how code that talks to external services is tested with stand-ins; they bear on the style of the stand-in `docker`, not on what changed), D-74, D-81, D-82, D-85 (testing discipline of D-73's family; the testing guidelines I read whole cite them). The rest (D-01 to D-06, D-27, D-29 to D-33, D-45, D-46, D-75, D-76, D-79, D-87 to D-89, D-94, D-95, D-106, D-107, D-111, D-154, D-229, D-234, D-252, D-253, D-255 to D-258, D-263 to D-271, D-273, D-351, D-393) have no bearing I could see.

Invariant `gate-docker-start-waits-once`: read whole. Part-map entries: `product-foundation` read whole; `build-tools` read from its heading through the start of its *Files* list (`foundations/part_map.md` lines 85-112), not to its end (the rest of its *Files* and its *Depends on* and *Trust boundary* lines unread). Glossary entries: not read (the change uses no term that needs one beyond words the decisions define).

Guidelines: `guidelines/coding.md` read whole (lines 1-330); `guidelines/testing.md` read whole (lines 1-476, in two reads, the first cut at 352 by the tool and the rest read from 353). Kind files `guidelines/coding-*.md`: none read, none of their *When to read* rows matches Python scripts and tests of the gate. The `the-way` testing templates (`.the-way/product-guidelines/testing/`): not read; the foundation check passed on the lines `decision:` and `invariant:`.

## Searches not found or unclear

- A check that a line `decision:` may repeat on one test (two on `test_a_whole_run_that_finds_docker_stopped_starts_it_once_and_skips_nothing`): no rule found against it, and the foundation check passed.
- Whether a real Docker Desktop makes `docker version` hang while it starts (what makes B1 more than a possibility): not found; I could not start it.
- A rule of size in `guidelines/coding.md`: none found, as the author says.
