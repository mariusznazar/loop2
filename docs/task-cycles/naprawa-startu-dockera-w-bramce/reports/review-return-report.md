FAIL af061ed2eae4f8a5a03f958c6b0dab3b2f4ea5a7

# Review of the return step — task `naprawa-startu-dockera-w-bramce`

Range `c1735524..af061ed2` (one commit, `af061ed2`; `git rev-parse HEAD` = `af061ed2eae4f8a5a03f958c6b0dab3b2f4ea5a7`, matches the dispatch). Reviewer: fresh, did not make or review any earlier stage. Counts: 1 blocking (Important), 1 Minor (new), 0 out of scope.

## Findings

### Important

**I1. D-390 rests on an outside fact about the operating system and no environment fact holds it; the reason the author gives for not writing one does not stand.**

- Place: `foundations/decisions.md` D-390, second paragraph ("where the process that began the start ended before it finished, the next test to ask starts Docker Desktop again"), the *Verification* clause "a start whose process ended is begun again by the next process to ask", and the last sentences of the *Rationale* ("a lock that the operating system releases when its holder ends leaves a start that ended with its process holding no one"); `Based on:` of D-390 names only `docker-desktop-start-detach`. The code: `scripts/docker_gate.py` `try_lock` (`msvcrt.locking` / `fcntl.flock`) and `start_lock`, whose docstring says the lock "is let go of when its holder ends, however it ends".
- What is wrong: that sentence of D-390 is true only if the operating system releases the lock of a process that ended. This is the behaviour of a platform call the gate uses and, were it untrue, the clause on a dead starter would be false (the next process would wait for the dead one up to its limit and give a gap, never start). `.the-way/elements/environment-facts/template.md`, "Which facts are written", asks for a fact for every citation that, once it stopped being true, would call the decision into question, "the behaviour of a tool the process uses", and for the return step "each source outside the product that the change rests on and the foundation does not yet hold"; `.the-way/task-cycle/skill/return_step.md` says the return step writes them, and that "no entry is deferred". The author's report instead names the fact as "not found" and says "a person with the pages can write the fact as a follow-up" — that is a deferral.
- The author's reason (no way to read a page word for word; a model's summary is no source) is a limit of the author's tool, not an exemption in the template. The pages are readable word for word: I fetched both with `curl` into the scratchpad (not into the worktree) on 2026-11-15 and found the passages.
  - Win32 `LockFile` (https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-lockfile): "If a process terminates with a portion of a file locked or closes a file that has outstanding locks, the locks are unlocked by the operating system. However, the time it takes for the operating system to unlock these locks depends upon available system resources."
  - `flock(2)` (https://man7.org/linux/man-pages/man2/flock.2.html): "the lock is released either by an explicit LOCK_UN operation on any of these duplicate file descriptors, or when all such file descriptors have been closed."
- Two things the writer of the fact must settle, so the entry says no more than its source says (template, "The sentence"): (a) neither page names `msvcrt.locking` or `fcntl.flock` by that route — I did not read a page for `msvcrt.locking` (the Python documentation), so I cannot say what it states about release at the end of a process, and the link from the C runtime's `_locking` to `LockFile` is not on these pages, so the sentence must be one the sources say (the Windows page for Win32 file locks, the Linux page for descriptors that close) or the source for the link must be found; (b) the Windows page says the release can be delayed, whereas D-390's *Rationale* says a dead start "holds no one" without that qualification; the code is safe under the delay (a waiter gives the gap at its limit and starts none), but the wording of the *Rationale* should follow the fact.
- Why it matters: D-390 is the entry that tells the next agent why a dead starter is begun again; its one external premise stands uncited, and the one source that exists qualifies it. The dead-starter test shows the behaviour on this computer only, and a test is no source for a fact (template: "Nothing runs to check a fact").
- Evidence: `git diff a1306b53..HEAD -- foundations/` shows the paragraph, clause and rationale sentence added with no `Based on` added; `grep -n "lock" foundations/environment_facts.md` finds no entry on locks (search of the file by the headings: no entry on files or locks; the listed headings run from `node-24-support-schedule` to `session-proxy-security`, and `docker-desktop-start-detach` is the only Docker entry).
- What closes it: one or two facts through `the-way-record-environment-fact` (for Windows and, as far as the code's `fcntl` branch is a stand taken by the foundation, for Linux; the author may judge that the branch that no run uses needs none), `Based on` of D-390 extended to name them, and the *Rationale* sentence aligned with the sources.

### Minor

**M6. `scripts/test.py` module docstring is loose against the code.** `scripts/test.py:4-5` says "the directories that run at the same time start it and await it once"; the code gives one state file and `docker_gate` makes the start once, but where the starter dies the next process starts again (D-390's second paragraph) and a waiter that reaches its limit records the gap. "Start it and await it once" is the D-406 clause word for word, so it is faithful to the entry; I note only that the entry and the docstring say "at most once" in the decisions and "once" in the docstring. No change required.

## Questions of the handoff

- *Is the docstring correction true to the code?* Yes. Module docstring (`scripts/docker_gate.py:21-23`): "The wait for the lock ends at the limit of the process that waits, counted from its first ask: the process then gives, and records for the run, the gap of a start that did not finish, and starts none of its own." Checked against `daemon_gap`: `deadline = time.monotonic() + limit` is taken at the first ask; `start_lock(deadline)` raises `StartWaitExpired` at that deadline; the handler returns `unfinished_gap(limit)`, which calls `record_gap` and starts nothing. The `daemon_gap` docstring ("every call of `docker` here, and the wait for another process's start, is held to what remains of it") is true of `within(...)` and the `start_lock(deadline)` wait; the earlier sentence, that the limit restarts "from the end of the wait ... where this process, after that wait, must start Docker Desktop itself", is what `if waited: deadline = ...` does. No other text of `scripts/docker_gate.py`, `scripts/test.py`, `tests/quality/test_docker_gate.py` or `tests/quality/test_test_gate.py` that I read misstates the code: the docstrings of `start_lock`, `started_gap`, `unfinished_gap`, the header of `ProcessesAtOnce`, and the "Breaking it" comment of the test that holds D-406.
- *The entries compared with the final code and the settlement rows.* D-390's second paragraph (row 2) is what the code does: the lock (`start_lock`), the re-ask after the lock whatever `waited` says, the wait cut at the waiter's own limit with the gap recorded, a dead holder's lock released by the system. Its *Verification* `tests:` clause lists three behaviours, each with a test carrying a `decision: D-390` line (`test_a_whole_run_that_finds_docker_stopped_starts_it_once_and_skips_nothing` and `ProcessesAtOnce` tests at lines 224, 238, 293 of `tests/quality/test_docker_gate.py`); the wait-cap tests carry the invariant line. D-406 (row 1) says the gate gives the runner no argument limiting the jobs: `scripts/test.py:49-56` gives none; the tests at `test_test_gate.py:70` and `test_docker_gate.py:327,343` carry its lines; the *Rejected* option is `--jobs 1`; the stale pair of examples is gone. D-405's rationale sentence now reads "the full gate runs them at the same time (D-406)"; its answer is untouched. README's sentence ("więc katalogi biegną naraz") matches. No entry says the old thing: `grep -rn -i "one after another\|jobs 1"` over `scripts`, `tests/quality`, `README.md`, `guidelines`, `AGENTS.md`, the part map and the glossary finds nothing stale; the remaining "one after another" strings are in D-405's own answer (stages) and D-406's *Rejected* line. The D-406 rationale's claim that the Docker tests name their containers, images and volumes with a random part rests on item 2 of the author's report, which tabulates every Docker test of the two directories; `grep` of `--name`, `-t`, `volume create`, `network` in `tests/deploy` and `tests/invariants` agrees (the `--project-name loop2` calls are in tests that stand in a recorded stand-in or `--dry-run`).
- *Glossary, invariants, part map.* I agree with the author: none needed. No new term is used against a glossary entry; the invariant `gate-docker-start-waits-once` still holds (a waiter that reaches its limit records the gap) and the task and D-406 set no further rule, so an invariant for "a test that asks during another's start waits for it" would be written for behaviour merely because none covers it (`return_step.md`); the part map `build-tools` line (line 87) already says the part "starts Docker Desktop, where it is installed, for a test of the test gate that needs a Docker daemon when none answers", its *Files* cover `scripts/**`, `tests/quality/**` and the README, and `guidelines/testing.md` *Where in code* already lists the five files.
- *The environment fact.* Needed — see I1.

## Declined to judge

- N1 (the waiter's cap can fall before a restarted holder's end), N3 (the stand-in's late holder can remove a taker's lock directory), M1 (the dead-starter clause as the cycle's own choice, for the request) and M5: known, go to the request's list; not repeated as new.
- The three full runs of `npm test` and the D-406 answer's condition on them (task *To do* 3 and 4): the cycle's own step 10, outside the return step.
- Whether `fcntl.flock` semantics on a Mac or in a container hold: no run reaches that branch (outside the task).

## Checks (command and exit code)

- `python -B scripts/test.py tests/quality/test_docker_gate.py` in the reviewed worktree at `af061ed2` (stand-in `docker`, no real Docker Desktop touched): exit 0, 17 tests, OK, 64 s.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors" (the `listed:` lines are the known ones, e.g. D-218 and D-220 held by nothing).
- `git diff c1735524..af061ed2`: 1 file, `scripts/docker_gate.py`, docstrings only; no code line changed.
- `curl` of the two pages above to the scratchpad `a scratch folder outside the repository, file lockfile.html` and `...\flock.html`, passages found by a read-only script (exit 0).
- Not run: the full gate; `tests/quality/test_test_gate.py` and `test_quality_invariants.py` (nothing they read changed in the range); ruff (the author's run at the head is the only record; the diff is docstring text only).
- `git status --short` in the worktree after my checks: clean.

## Reach beyond the dispatch

- `.the-way/elements/environment-facts/skill/` (`SKILL.md`, `decide_entry.md`, `draft.md`, `read.md`) and `.the-way/elements/environment-facts/template.md`: to judge whether the fact is needed and how a source is taken.
- `foundations/environment_facts.md` (headings; the `docker-desktop-start-detach` entry whole): to find any entry on locks or processes.
- `foundations/part_map.md` entry `build-tools` (lines 85-99) and `guidelines/testing.md` *Where in code*: to confirm the author's "none".
- `foundations/invariants.md`, the entry `gate-docker-start-waits-once`.
- `.runs/task-cycles/naprawa-startu-dockera-w-bramce/cycle.md` (to see Q3 and the step order) and `reports/author-report.md` (grep only, item 2's table).
- `tests/deploy` and `tests/invariants` (grep for container, image, volume, network names) to check the D-406 rationale's claim.
- `scripts/docker_gate.py`, `scripts/test.py`, `tests/quality/test_docker_gate.py`, `tests/quality/test_test_gate.py` (read as needed); `README.md` diff.

## Working copies

None made; `.runs/review-return/` was never created. The two downloaded pages and a log of the focused run are in the session scratchpad outside the repository.

## Unread material

- `reports/review-whole-report.md` and `reports/review-fix-report.md` (named by the handoff "for context"): not opened; the Minor findings the handoff lists were taken from it.
- `.the-way/elements/environment-facts/skill/write.md` and `projected.md`: not opened (no entry was written here).
- `tests/quality/docker_standin.py`: not read whole; read only through the tests that use it.

## Searches not found or unclear

- A source, readable word for word, that says of `msvcrt.locking` itself (not of Win32 `LockFile`) that its lock is released when the process ends: not looked for (I did not open the Python page); this is the gap behind I1 (a).
- An entry on file locks or on the release of a lock at the end of a process in `foundations/environment_facts.md`: not found.
