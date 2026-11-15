# Handoff to the reviewer of the return step — task `naprawa-startu-dockera-w-bramce`

You are a fresh reviewer; you made none of the change and you did not review any earlier stage of
it. Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), the return step. Worktree
(read only): `the task's worktree`, branch
`task/naprawa-startu-dockera-w-bramce`. Range of the return step: `c1735524` to `af061ed2` (one
commit; it corrects the docstrings of `scripts/docker_gate.py`). Your directory for working copies:
`.runs/review-return/` of the worktree.

Read: the frozen task `.runs/task-cycles/naprawa-startu-dockera-w-bramce/task-frozen.md` (whole);
the return step's report `reports/author-return-step-report.md` and its handoff
`reports/return-step-handoff.md`; the method of the step `.the-way/task-cycle/skill/return_step.md`
(it says what the return step compares and writes). For context, the review of the whole change
(`reports/review-whole-report.md`, FAIL, fixed) and of its fix (`reports/review-fix-report.md`,
PASS) are beside it, all under `.runs/task-cycles/naprawa-startu-dockera-w-bramce/`; the code at the
head `af061ed2` is what you judge against the entries.

Judge against the task and the entries the return step writes or corrects:

- Is the docstring correction true to the code? Does any other text of `scripts/docker_gate.py`,
  `scripts/test.py` or the tests now misstate what the code does?
- The entries the change wrote (D-390's new paragraph, its *Verification* and *Rationale*; D-406's
  new answer in place; D-405's rationale sentence) — are they compared with the final code and
  faithful to the task's settlement rows 1 and 2? Does any entry still say the old thing?
- The return step wrote **no environment fact**. The author's reason: D-390's clause about a dead
  starter rests on the operating system releasing a lock when its holder ends, and a fact needs a
  word-for-word source passage for `msvcrt.locking` / `fcntl.flock`, which the author could not read
  word for word; the dead-starter test shows the behaviour on Windows. Judge whether the foundation
  needs such a fact now (against `.the-way/task-cycle/skill/return_step.md` and the environment-facts
  element's template), and, if you find it needed, grade the finding.
- Glossary, invariants, part map: the author found none needed. Judge that.

Minor findings M1, M5, N1 and N3 are known and go to the request's list; do not repeat them as new.

Report: `reports/review-return-report.md` (same directory), first line `PASS <sha>` or `FAIL <sha>`
with the sha of `af061ed2`; checks with command and exit code, **Unread material**, **Searches not
found or unclear**, working copies and their removal. No full gate; focused checks only, and do not
start or stop the real Docker Desktop. Return the first line, the path and a one-line check result.
