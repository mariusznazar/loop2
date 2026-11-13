# Handoff — a correction for the human's remarks, `make-change`

Variant: **"a correction for the human's remarks"** (`.the-way/task-cycle/change/fix.md` where the method sends you;
read `.the-way/task-cycle/change/SKILL.md` whole first, and the file it names for this variant when the step comes).
You are the one author, resumed. The remarks bind; the review reads the remarks in place of a findings file.

- Worktree `the repository's root`, branch `task/testy-same-wlaczaja-dockera`. Head now: the
  merge commit `50bb46a2ddb25bca8e3a7fd8cd6324ab25b8ece8` (`origin/main` merged in; the one conflict was
  `foundations/invariants.md`, resolved; reviewed separately, you change nothing of that merge). Your range starts at it.
- The remarks, word for word (source: a comment of the human on the request, saved in
  `.runs/task-cycles/testy-same-wlaczaja-dockera/reports/correction_remarks.md`; the numbers refer to the items of
  the request's *Fix or let through*):

  > 1. (a) Fix it in this request: the sentence the change added to the description of the build part must not read as if the test run also started the mutation analysis, and it says "where Docker Desktop is installed".
  > 1. (b) Fix it in this request: if Docker does not refuse the connection but hangs, the first test that needs Docker must not wait about one minute beyond the 3 minutes.
  > 1. (c) Let it through: the per-directory wait when the process's own test runner is started directly instead of `npm test` belongs to the pinned process.
  > 2. Let it through: no fresh reviewer for the seven decisions read by title only; the full test run, the foundation check and the search of the whole foundation for Docker found no conflict.

  (c) and 2 are let through: change nothing for them.
- What you change:
  - **(a)** the one sentence about the test gate in the `build-tools` entry of `foundations/part_map.md` (line 86 at the
    reviewed tree): the clause on Docker Desktop must not sit mid-list so that "and mutation analysis" reads as part of
    it, and it must carry "where Docker Desktop is installed" (D-390's qualification: a computer without Docker Desktop
    skips at once). Write it through `the-way-update-part-map`, as far as the cycle allows without a human. Keep the
    entry's one-sentence form (the part-map template's "The binding part").
  - **(b)** the bound of the wait in `scripts/docker_gate.py` (`daemon_gap` and its callers): today the first
    `daemon_answers()` (up to 30 s) and `desktop_present()` (up to 30 s) run before the deadline is taken, and
    `start_desktop()` (up to 60 s) is inside it, so with a daemon that hangs rather than refuses the first test can wait
    3 minutes plus up to a minute. The first test must not wait about a minute beyond the 3 minutes: take the deadline
    from the first ask of the test and keep every call of the helper (the asks and the start) within what remains of it.
    D-390 says "at most 3 minutes". Add the case to `tests/quality/test_docker_gate.py` with the stand-in `docker`
    (extend `tests/quality/docker_standin.py` with a daemon that hangs, if needed), see it fail on the code as it stands
    and pass after, and keep the other cases. The tests wait seconds (`LOOP2_DOCKER_START_LIMIT`), never real minutes.
  - Repeat only what the remarks touch: if the correction changes what D-390, the invariant
    `gate-docker-start-waits-once` or any entry says, the return step's comparison with the code for those entries (a
    changed word of an entry goes through the element's skill); say in your report what you compared and what stayed.
- You run no full `npm test`; do not stop or start Docker Desktop; run `foundation_check.py` after a foundation edit and
  the focused checks you need (each with command and exit code). Commit by path, English messages, no `git add -A`.
- Foundation to read as before (your earlier handoff `reports/author_handoff.md`), D-390, D-391, D-392 and
  `gate-docker-start-waits-once` again, and `scripts/docker_gate.py`, `tests/quality/docker_standin.py`,
  `tests/quality/test_docker_gate.py`. The review of the whole change that found (a) and (b) is
  `.runs/task-cycles/testy-same-wlaczaja-dockera/reports/review_whole_report.md` (Minor findings 6 and, for (a), the return
  step's review `reports/review_return_report.md`, Minor).
- Report: `.runs/task-cycles/testy-same-wlaczaja-dockera/reports/correction_report.md`, with **Unread material**, **Searches
  not found or unclear** (`none` where none), the own-work check, each check with command and exit code. Return status,
  commits, a one-line check result.
