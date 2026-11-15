# Handoff to the author — the fix of a review's findings

Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), your variant: **the fix of a review's
findings**; read the `fix.md` beside it as that row gives. Worktree and branch as before
(`the task's worktree`, `task/naprawa-startu-dockera-w-bramce`);
the reviewed head is `826b2a63`, and the range of your fix runs from it. Your directory for working
copies: `.runs/author-fix/`. The working-copies rule of your first handoff holds unchanged.

Findings file (the reviewer's words): `reports/fix-findings.md` (under
`.runs/task-cycles/naprawa-startu-dockera-w-bramce/`); the full review is
`reports/review-whole-report.md`. Your report: `reports/author-fix-report.md`.

- **B1 (blocking)** — fix it as the finding proposes or by a better way you name; add the test the
  finding says is missing (a process whose first ask of the daemon is slow and ends after another
  process's start has finished), and show that it fails on the code of `826b2a63` and passes after
  the fix (command, exit code of each run). Part 1 and part 2 stay two parts: put the B1 fix and its
  test in commits that touch nothing of part 2, so that `826b2a63` still reverts alone.
- **M1** — the reviewer's remedy is that the request shows the clause as the cycle's own choice; the
  orchestrator carries it to the request. Change nothing for M1 unless you hold the clause wrong; say
  so in your report either way.
- **M2, M3, M4** — fix them (Minor findings of the review of the whole change are fixed within the
  task). M3: a cap at the waiter's own limit, with what the waiter then does stated in D-390's
  sentence only if the sentence no longer says it; keep D-390's wording within settlement row 2 and
  the clause M1 names.
- **M5** — contingent on a revert of `826b2a63`, which the orchestrator may make after its
  measurement; the orchestrator will correct the two texts it names in the revert commit. Do not
  fix it now, but where a fix of B1–M4 touches the same comment or line, do not make it worse.

You run no full gate. Run the focused checks the findings need
(`python -B scripts/test.py tests/quality/test_docker_gate.py`, `tests/quality/test_test_gate.py`,
the foundation check, ruff as before) and give each with its command and exit code. Your report holds
what `fix.md` gives, with **Unread material** and **Searches not found or unclear** (each, or `none`)
and your working copies and their removal. Return status, commits, a one-line check result and the
report path.
