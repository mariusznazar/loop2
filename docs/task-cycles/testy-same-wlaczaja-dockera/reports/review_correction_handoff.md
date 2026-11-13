# Handoff — review of a correction for the human's remarks, `review-change`

You reviewed this task's whole change and its fix earlier. This is the review of the correction made for the human's
remarks on the open request; read `.the-way/task-cycle/review/fix.md` whole (it names what a correction's review reads and
what bounds it) after `.the-way/task-cycle/review/SKILL.md`. Read-only; run no full `npm test`; do not stop or start
Docker Desktop.

- Worktree `the repository's root`. Range to review: `50bb46a2ddb25bca8e3a7fd8cd6324ab25b8ece8..b6ee3cb8`
  (two commits `c6d51cba`, `b6ee3cb8`; confirm `git rev-parse HEAD` is `b6ee3cb8…`; compute the diff yourself). The merge commit
  `50bb46a2` itself was reviewed (`PASS`), it is the base here.
- The remarks, in place of a findings file, in `.runs/task-cycles/testy-same-wlaczaja-dockera/reports/correction_remarks.md`
  (the human's comment on the request) and word for word in
  `.runs/task-cycles/testy-same-wlaczaja-dockera/reports/correction_handoff.md`: fix 1(a) (the part-map sentence must not read as if the
  test run also started mutation analysis, and must say "where Docker Desktop is installed") and 1(b) (a hanging Docker must not
  make the first test wait about a minute beyond the 3 minutes); 1(c) and 2 are let through and are not for this review.
- The correction report (claims to verify): `.runs/task-cycles/testy-same-wlaczaja-dockera/reports/correction_report.md`.
  Judge whether each of 1(a) and 1(b) stands fixed, whether the new test fails for the right reason on the old code and
  passes now (the author states it replaces the asks of `docker version` at the `subprocess.run` boundary because a timeout of
  the Windows stand-in kills only its `.cmd` wrapper: judge whether that proves the bound of the wait, and what it does not
  prove), whether the correction broke a case that held (D-390: at most 3 minutes, a recorded failed start makes later tests skip
  at once, no Docker Desktop skips at once), and whether it adds a new finding. Only a new Critical or Important finding
  blocks; a Minor one goes to the request's list.
- Foundation entries by identifier, each whole: D-390, D-391, D-392, the invariant `gate-docker-start-waits-once` in
  `foundations/invariants.md`, the environment fact `docker-desktop-start-detach`, the `build-tools` entry of
  `foundations/part_map.md`. Guideline files, each whole: `guidelines/coding.md`, `guidelines/testing.md`.
- Checks you may run: `python -B .the-way/elements/common/foundation_check.py`; `python -B scripts/test.py tests/quality/test_docker_gate.py`;
  `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` — run `npm_execpath` set to the worktree's npm as the
  earlier reviews did where needed; each with command and exit code.
- Report: `.runs/task-cycles/testy-same-wlaczaja-dockera/reports/review_correction_report.md`, first line `PASS <sha>` or
  `FAIL <sha>`; **Unread material**, **Searches not found or unclear** (`none` where none). Return its first line, files with line
  counts, the report path, questions and concerns.
