# Author report — the return step, task `naprawa-startu-dockera-w-bramce`

Status: `done`. Commit: `af061ed2` (one, a docstring correction, below). Head before the step `c1735524`.

## What was compared, and the result

Compared with the code the change leaves (`scripts/docker_gate.py`, `scripts/test.py`, the two test
files of `tests/quality/`, `README.md`):

| Text | Result |
|---|---|
| D-390 new paragraph (a run starts Docker Desktop at most once; a test that asks during another process's start waits for it, within its limit, and starts none of its own; where the starter ended before it finished, the next to ask starts again) | matches the code at head: the lock, the re-ask after the lock whatever `waited` says (B1), the wait cut at the waiter's own limit with the recorded gap (M3; "within its limit" is now literal), a dead holder released by the operating system. No edit. |
| D-390 *Verification* clause `tests:` | still true; the tests it describes carry the `decision: D-390` lines. The late-ask test (B1) is held by the clause "starts it once ... in several [processes] at the same time", the wait-cap test (M3) by the invariant line. No edit. |
| D-390 *Rationale* (lock outside any one process; operating-system release leaves a dead start holding no one) | matches. No edit. |
| D-406 new answer, *Verification*, *Rationale*, *Rejected* | match `scripts/test.py` (no argument limiting the jobs), the test of two directories that meet, and the two `GateRuns` tests. M2's wording is fixed. No edit. |
| D-405 rationale sentence "the full gate runs them at the same time (D-406)" | matches; its answer was untouched. |
| D-391 (the gate does not stop Docker Desktop), D-392 (no memory threshold) | unaffected: the code issues no stop or restart and asks nothing about memory (the stand-in tests `docker.stops() == []`). No edit. |
| Invariant `gate-docker-start-waits-once` | its sentence (an unfinished start is waited for once, later tests skipped at once with no new start) still holds: a waiter whose wait expired records the gap, so the later tests skip at once. No edit; no new invariant, since neither the task nor a decision nor the human sets one beyond it (D-390's new sentence is held by tests with `decision:` lines, as the template gives). |
| Part map, `build-tools` | description still true ("starts Docker Desktop, where it is installed, for a test of the test gate that needs a Docker daemon when none answers", "runs the test gate"); its *Files* (`scripts/**`, `tests/quality/**`, `README.md`) cover every file the change touched, and it names none of them a trust boundary. No edit. |
| Part map, `product-foundation` | `foundations/**`; nothing to change. |
| `guidelines/testing.md` *Where in code* | already lists `scripts/test.py`, `scripts/docker_gate.py`, `tests/quality/docker_standin.py`, `tests/quality/test_docker_gate.py`, `tests/quality/test_test_gate.py`; no file added by the change is missing. |
| `README.md` | the sentence of the run of the directories is corrected in `826b2a63` ("biegną naraz"); no other text of it speaks of the order. |
| Module docstring of `scripts/docker_gate.py` (N2) | **did not match the code**, corrected in `af061ed2` (see below). |
| Search of the foundation for `docker_gate`, `docker_standin`, `start_lock`, `run_tests`, `Docker Desktop`, `daemon`, `jobs`, "at the same time", "lock" in `foundations/*.md`, `guidelines/*.md`, `AGENTS.md`, `README.md` | no other entry speaks of the order of the directories or of the number of starts. D-77 and D-83 mention the runner only as the one command, unchanged. |

## The one correction (N2): `af061ed2`

I hold N2 a text that no longer matches the code: the module docstring said a process that finds the
lock held "waits for the lock instead of starting" and then goes by what the start left, which
described a wait without end, while the code ends the wait at the waiter's own limit. Corrected in a
commit of its own: the module docstring gains the sentence "The wait for the lock ends at the limit of
the process that waits, counted from its first ask: the process then gives, and records for the run,
the gap of a start that did not finish, and starts none of its own."; the docstring of `daemon_gap`
now says that every call of `docker` there, "and the wait for another process's start", is held to
what remains of the limit. Comments and docstrings only; `ruff` clean; `test_docker_gate.py` still
17 tests OK.

## Findings left for the request's list, not touched

M1 (the clause of D-390 on a dead starter is the cycle's own choice, shown at the request), M5
(contingent on a revert of `826b2a63`, which then also needs the revert of `c1735524`), N1 (the
waiter's cap can fall before a restarted holder's end), N3 (the stand-in's late holder can remove a
taker's lock directory). I changed no code for them.

## Where each settlement went

- Row 1 (the full gate runs the directories at the same time): the log, D-406 (new answer in place), written by the change (`826b2a63`); the sentence of D-405's rationale corrected in the same commit.
- Row 2 (one start in a run, also when it succeeds; a test that asks during another's start waits for it): the log, D-390 (second paragraph of binding sentences, clause `tests:`, rationale sentence), written by the change (`ed932e40`, `41015a29`, `d1acd7a8`).
- The choice of the lock as the way a start in progress becomes visible, and of what becomes of a dead starter: binds after the merge only as the clause of D-390 that M1 names; no further entry. Its ways rejected stand in `reports/author-report.md` for the questions table.
- The choice of what replaces the test that pinned `--jobs 1` (a behaviour test of two directories that meet): a test, not an entry; stays a row of the questions table.
- Glossary, environment facts, invariants, part map: **none** needed (reasons above). No new term is used against its entry: "start", "daemon", "gap" are not glossary terms and no entry of the glossary treats them.

## Environment fact not written: the operating system's release of a lock when its holder ends

D-390's clause and rationale rest on the fact that the operating system releases a file lock of a
process that ended. The change holds it by the test of a killed starter on this computer (Windows),
and the rationale says it in prose. I did not write an environment fact for it: the template needs a
passage word for word from a source that says it of the call the code uses (`msvcrt.locking`, which
sits on the C runtime, and `fcntl.flock`, a branch that on Linux and in a container is not reached
and on a Mac is untested), and the only reading tool I have for a page here returns a model's
summary, not the page's own words, which the template excludes as a source ("an agent's paraphrase"
is no source). A reading is allowed only for a host the product's people run, not for the behaviour
of a platform call. So the claim stays in D-390's *Rationale* uncited; a person with the pages can
write the fact as a follow-up of the request's choice (not proposed here as an entry to be deferred,
only named as not found).

## Checks (command, exit code)

- `python -B scripts/test.py tests/quality/test_docker_gate.py`: exit 0, 17 tests, `OK` (head `af061ed2`).
- `python -B .the-way/elements/common/foundation_check.py`: "0 errors", exit 0 (full citation run).
- ruff (`ruff.toml`, the flags of `test_ruff_source_rules`, the ruff of the main checkout's `quality-venv`) over `scripts` and `tests/quality`: exit 0.
- Not run: the full gate; `tests/quality/test_test_gate.py` (nothing it reads changed since its last green run, 9 tests, exit 0, at `c1735524`); `test_quality_invariants.py` as a whole.

## Reach beyond the handoff

`foundations/part_map.md` (the entries `build-tools` and `product-foundation`, read as the handoff
says; `deployment` read only to the end of its first lines), `.the-way/elements/environment-facts/skill/SKILL.md`
and `template.md` (to decide the environment fact above), `reports/review-fix-report.md` (named by the
handoff). `reports/review-whole-report.md` was not opened: the handoff gave its Minor findings and the
fix report gave the rest.

## Unread material

`reports/review-whole-report.md` (see above); the `read.md`, `decide_entry.md`, `draft.md` and
`write.md` beside the environment-facts `SKILL.md`: no entry of that element was written, so the step
that names them did not come.

## Searches not found or unclear

- A source, readable word for word, that says of `msvcrt.locking` or of `fcntl.flock` that the lock is released when the holder ends: not looked for in a page (see above); the behaviour is shown on Windows by the dead-starter test, not by a source.

## Working copies

none made (the directory `.runs/author-return/` was never created).
