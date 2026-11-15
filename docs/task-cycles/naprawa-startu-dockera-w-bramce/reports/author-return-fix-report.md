# Author report — the fix of the return step's finding I1, task `naprawa-startu-dockera-w-bramce`

Status: `done`. Range `af061ed2..325abcbe`.

## Commits

| Commit | What |
|---|---|
| `92fd6ce9` | `foundations/environment_facts.md`: new entry `windows-file-lock-release-at-process-end`; `foundations/decisions.md` D-390: *Based on* extended to name it, *Rationale* sentence about the lock aligned with the source. Binding sentences of D-390 untouched. |
| `325abcbe` | `scripts/docker_gate.py`: two docstrings no longer say a dead start "holds no one" / is let go of "however it ends" without the delay the source names (comments only). |

## I1 — fixed

**The fact written** (as `the-way-record-environment-fact` gives it: read `SKILL.md`, `template.md`,
`read.md`, `decide_entry.md`, `draft.md`, `write.md`; the entry went through "Which facts are written"
and "The sentence"):

```
## windows-file-lock-release-at-process-end

On Windows, when a process terminates with a portion of a file locked, the operating system unlocks the locks, and the time it takes depends upon available system resources.

- **Source:** https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-lockfile (archived: https://web.archive.org/web/20261024175828/https://learn.microsoft.com/en-us/windows/win32/api/FileAPI/nf-fileapi-lockfile, 2026-10-24) § Remarks — "If a process terminates with a portion of a file locked or closes a file that has outstanding locks, the locks are unlocked by the operating system. However, the time it takes for the operating system to unlock these locks depends upon available system resources."; read 2026-11-15
```

- Source read with `curl` into `.runs/author-return-fix/` (page saved, markup stripped, whitespace
  collapsed); the passage stands there word for word, in the live page and in the archived copy (both
  checked by exact string match, `True`). The archived copy is the closest capture that already
  exists and returned status 200 in the archive's CDX index (`20261024175828`; its URL has the path
  segment `FileAPI`, as the capture was made).
- Meaning, English: when a process of the gate that holds the start lock ends, Windows releases the
  lock, though not necessarily at once. Znaczenie po polsku: gdy proces trzymający blokadę startu
  kończy się, Windows zwalnia blokadę, choć niekoniecznie od razu.
- Place of the entry: the settlement is a fact the cycle's decision rests on, `the cycle's` (no row
  carries it); it goes to `foundations/environment_facts.md`, before the list of withdrawn identifiers.

**D-390 aligned.** *Based on*: `docker-desktop-start-detach · windows-file-lock-release-at-process-end`.
The *Rationale* sentence now reads: "... where the holder ends, the operating system releases its
lock, on Windows after a time that depends on available system resources, so a start that ended with
its process holds the others for that time at most, and a process that waits gives up at its own
limit with the gap of a start that did not finish; that start recorded nothing that anyone waited
for, so the next process begins it again." (point (b)). The full `foundation_check.py` (citation run)
after the entry and after the decision: "0 errors".

**What the sources say, and no more (point (a)).**
- The Win32 `LockFile` page says it of Win32 file locks. The sentence says it of locks of a process
  on a file on Windows, with the page's own delay qualification, and does not name `msvcrt.locking`.
- I looked for a page that links Python's `msvcrt.locking` to those locks. Python's
  <https://docs.python.org/3/library/msvcrt.html> says only "Locks the specified bytes ... If the
  bytes cannot be locked, OSError is raised" for `LK_NBLCK` and says nothing about the end of a
  process; Microsoft's `_locking` page (https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/locking)
  says "Regions should be locked only briefly and should be unlocked before closing a file or exiting
  the program" and does not say what happens at the end of a process, nor that `_locking` calls
  `LockFile`. **The link from `msvcrt.locking` to the Win32 locks is not on any page I found**; the
  fact therefore stays at what the `LockFile` page says, and the dead-starter test on this computer
  (a killed starter does not hold the next process) is what shows it for the call the code uses.
  That gap is named under *Searches not found*.

**Linux / the `fcntl` branch: no fact written.** The `flock(2)` page (https://man7.org/linux/man-pages/man2/flock.2.html,
read 2026-11-15; passage "the lock is released either by an explicit LOCK_UN operation on any of
these duplicate file descriptors, or when all such file descriptors have been closed." found word for
word) speaks of descriptors that close, not of the end of a process, and is a Linux page, while the
branch runs where `fcntl` exists and Docker Desktop is installed, which on Linux and in a container is
never (D-390: no Docker Desktop, skip at once; `daemon_gap` returns before the lock). I judged that
branch not one the foundation takes a stand on, as the finding allows; a fact for it would say that a
process's closing of its descriptors releases the lock, with the step "the end of a process closes its
descriptors" resting on no page I read. Not written, and not deferred: no run reaches it, so no
decision rests on it.

**Second docstring pass (`325abcbe`).** The module docstring and the docstring of `start_lock` of
`scripts/docker_gate.py` said a dead start "holds no one" and that the lock is let go of "however it
ends"; the fact qualifies that on Windows with a delay, so both now say it, as D-390's rationale does.
Comments only; I changed no code. This is the "text that no longer matches" the return step corrects,
not a fix of M6 (M6 not touched).

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after the entry: "0 errors"; the full run (`python -B .the-way/elements/common/foundation_check.py`) after the decision, and again at the head: "0 errors", exit 0.
- `python -B scripts/test.py tests/quality/test_docker_gate.py` at the head: exit 0, 17 tests, `OK`.
- ruff (`ruff.toml`, flags of `test_ruff_source_rules`, ruff of the main checkout's `quality-venv`) over `scripts` and `tests/quality`: exit 0.
- Not run: the full gate; `test_test_gate.py` (nothing it reads changed); `test_quality_invariants.py` as a whole.

## Reach beyond the handoff

The Python documentation page of `msvcrt` and Microsoft's `_locking` page (for the link the finding's
point (a) asks to look for), and the archive's CDX index for the archived copy.

## Unread material

`reports/review-return-report.md` (the handoff names it as the full review; the findings file gave
what the fix needed). The `write.md` step 4.4 for a changed fact did not apply (a new fact; its only
dependant is D-390, edited here).

## Searches not found or unclear

- A page that says `msvcrt.locking` (or the C runtime's `_locking`) is `LockFile` of Win32, or what happens to its locks when a process ends: not found on Python's `msvcrt` page nor on Microsoft's `_locking` page.
- A page that says a `flock(2)` lock is released when the process holding it ends (the Linux page says "when all such file descriptors have been closed"): none read; no Linux or macOS fact written.

## Working copies

`.runs/author-return-fix/` (the saved pages and their text) was removed before returning; the
passages quoted above and in the entry are kept in this report. Remainder: none.
