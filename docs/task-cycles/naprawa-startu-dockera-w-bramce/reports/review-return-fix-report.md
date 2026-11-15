PASS 325abcbe180da781cfed76626e4e5b20951861b7

# Review of the fix of the return step's finding I1 — task `naprawa-startu-dockera-w-bramce`

Range `af061ed2..325abcbe` (two commits: `92fd6ce9`, `325abcbe`); `git rev-parse HEAD` = `325abcbe180da781cfed76626e4e5b20951861b7`, matches the dispatch. Counts: 0 blocking, 2 Minor (new), 0 out of scope.

## The finding of the findings file

**I1 — fixed.**

- The fact exists: `foundations/environment_facts.md`, entry `windows-file-lock-release-at-process-end`, before the withdrawn identifiers. Its sentence — "On Windows, when a process terminates with a portion of a file locked, the operating system unlocks the locks, and the time it takes depends upon available system resources." — says no more than its source: the passage says the locks are unlocked by the operating system when a process terminates with a portion of a file locked, and that the time depends on available system resources. It names no `msvcrt.locking` and claims no immediacy.
- Source checked against the page, as before. I fetched the live page (https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-lockfile) and the archived copy (https://web.archive.org/web/20261024175828/https://learn.microsoft.com/en-us/windows/win32/api/FileAPI/nf-fileapi-lockfile) with `curl` and, after markup was stripped and whitespace collapsed, the whole passage of the entry — "If a process terminates with a portion of a file locked or closes a file that has outstanding locks, the locks are unlocked by the operating system. However, the time it takes for the operating system to unlock these locks depends upon available system resources." — stands word for word in both (exact string match, True, True). The place `§ Remarks` is right: the heading "Remarks" precedes the passage on the live page. The archive's CDX index lists the capture `20261024175828` (status 200) for that date, so the archived copy exists already and is the one named. The entry follows the template's form for a page without editions (address, archived copy and its date, place, passage, date read).
- D-390: `Based on:` now reads `docker-desktop-start-detach · windows-file-lock-release-at-process-end`. The *Rationale* sentence now reads "where the holder ends, the operating system releases its lock, on Windows after a time that depends on available system resources, so a start that ended with its process holds the others for that time at most, and a process that waits gives up at its own limit with the gap of a start that did not finish; that start recorded nothing that anyone waited for, so the next process begins it again." That follows the source including the delay and is true of the code: `daemon_gap` ends the lock wait at the process's own `deadline` with `StartWaitExpired` and `unfinished_gap`, which starts nothing. The binding sentences and the *Verification* of D-390 are unchanged (diff shows only the *Based on* line and the rationale sentence).
- Foundation check: `python -B .the-way/elements/common/foundation_check.py` — "0 errors", exit 0.
- Docstrings (`325abcbe`): the module docstring now says the lock of a process that died is released "on Windows after a time that depends on available system resources, so a dead start holds the others for that time at most", and the `start_lock` docstring says the system lets go "when its holder ends, however it ends, on Windows after a time that depends on available system resources". Both match the entry and the code; comments only (`git diff af061ed2..325abcbe -- scripts` has docstring lines alone).

## The author's choice of no Linux fact and no fact for `msvcrt.locking` — sound

- `msvcrt.locking`: the template says a fact "says no more than its source says" and "a model's memory, an agent's paraphrase ... are no source". The author read the Python `msvcrt` page and Microsoft's `_locking` page, found neither says the lock is the Win32 lock or what happens at a process's end, and so wrote the fact at what the `LockFile` page says. That is the template's rule applied; the link from `_locking` to `LockFile` is the product's own reasoning and stays unsourced, which the author names. (I did not read the Python or `_locking` pages myself; I rely on the author's report for what they say.)
- Linux / the `fcntl.flock` branch: the `flock(2)` passage I found earlier speaks of descriptors that close, not of the end of a process; `daemon_gap` returns before `start_lock` on a computer with no Docker Desktop, so no run reaches the branch (D-390: no Docker Desktop, skip at once). A fact is written for a citation a decision rests on, and here the decision's binding sentences are held by a test on the one platform where the branch that runs exists; not writing one is consistent with `return_step.md` ("no entry is deferred": the author says it is not deferred but not needed, since no run reaches it).

## New findings in the fix diff

None Critical or Important.

- **Minor (new, M7).** D-390's *Rationale* says "where the holder ends, the operating system releases its lock" generally, then qualifies Windows only; the fact it cites covers Windows only, so the general half, for a platform the gate does not reach, rests on no cited source. No effect on any run; if the `fcntl` branch is ever reached, a fact for it would be wanted.
- **Minor (new, M8).** The fact is about Win32 locks of a process; the code calls `msvcrt.locking`. The *Based on* of D-390 therefore names a fact whose link to the call is the product's own inference (the author's report names it under *Searches not found*; the rationale does not). It is the best the sources allow and the dead-starter test shows the behaviour on this computer; noted for the request.
- M6 of the earlier review was not part of the fix and is unchanged; N1, N3, M1 and M5 stay on the request's list.

## Declined to judge

- Whether a fact for `msvcrt.locking` could be found on a page the author and I did not read (outside the fix's range; the author's search is named).
- The three full runs of `npm test` and the condition of D-406's answer on them (the cycle's step 10).

## Checks (command and exit code)

- `python -B .the-way/elements/common/foundation_check.py` at `325abcbe`: exit 0, "0 errors".
- `python -B scripts/test.py tests/quality/test_docker_gate.py` at `325abcbe` (stand-in `docker`; no real Docker Desktop started or stopped): exit 0, 17 tests, OK, 63 s.
- `curl` of the live and archived pages into the scratchpad `a scratch folder outside the repository, file ll.html` and `...\lla.html`, exact-match script (`python -I`): exit 0, passage found in both.
- `curl` of the archive's CDX index for 2026-10-24: capture `20261024175828` listed, status 200.
- `git diff af061ed2..325abcbe`: 4 files read in full (`foundations/environment_facts.md`, `foundations/decisions.md`, `scripts/docker_gate.py`; no other file changed).
- `git status --short` after the checks: clean.
- Not run: the full gate; ruff (the author's run only; docstring text); `test_test_gate.py` (nothing it reads changed).

## Reach beyond the dispatch

- `.the-way/task-cycle/review/fix.md` (the method of a fix review) and `reports/review-return-report.md` (my own earlier report, for the finding's words).
- The live and archived Microsoft page and the archive's CDX index, to check the passage and the capture.

## Working copies

None made; `.runs/review-return-fix/` was never created. The two pages are in the session scratchpad outside the repository.

## Unread material

- `.the-way/elements/environment-facts/skill/write.md` (not opened; I checked the entry against `template.md` as the handoff asks).
- The Python `msvcrt` page and Microsoft's `_locking` page: not read by me (only the author's report of them).

## Searches not found or unclear

- A page that says `msvcrt.locking` / `_locking` is Win32 `LockFile` or what happens to its locks at the end of a process: not found by the author; not searched by me.
- Whether a page in the foundation states the Linux release of a lock at process end: none exists, and none is needed (above).
