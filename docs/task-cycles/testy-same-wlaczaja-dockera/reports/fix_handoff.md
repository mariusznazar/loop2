# Handoff — the fix of the Minor findings of the whole-change review, `make-change`

Variant: **"the fix of a review's findings"** (`.the-way/task-cycle/change/fix.md`, read whole).

- Same worktree and branch as before (`the repository's root`,
  `task/testy-same-wlaczaja-dockera`); reviewed head `fe779640cae69ed6288ac7c664a6b66c639bb966`. The fix's range runs from it.
- Findings file: `reports/review_findings.md` (path `.runs/task-cycles/testy-same-wlaczaja-dockera/reports/review_findings.md`),
  the reviewer's words. Four Minor findings within the task (1–4); none blocks. Fix all four, or answer
  with evidence one you hold wrong. The two outside the task's scope (5, 6 of the review) are not fixed.
- The review's full report, for the evidence of each finding:
  `.runs/task-cycles/testy-same-wlaczaja-dockera/reports/review_whole_report.md` (Minor section).
- Finding 3 (testing guidelines): do it through the project skill `the-way-maintain-testing-guidelines`
  as far as the cycle allows without human contact — a small addition only (the integration recipe's
  *Doubles* and `scripts/docker_gate.py` in *Where in code*, as the reviewer names). If that skill
  requires a human decision you cannot take, return `questions` for that finding alone and fix the rest.
- Finding 2: the quoted claim in D-390's *Rationale* needs its source — the task's *Context* holds the
  reading (`docker desktop status` showed `stopped` while `docker version` answered, 2026-11-13). Fix it
  by the element rules (an environment fact, or a *Rationale* free of the unsourced claim); you may not
  invent a source: if none can be named, remove the claim from the entry.
- Finding 4: loosen the tight bounds so they hold on a loaded computer while the tests still fail for
  the right reason (the reviewer's mutation shows 2.37 s against 1.5 s; a bound that still separates a
  start from no start is enough).
- Run the affected checks again (each with command and exit code); run no full `npm test`; do not stop
  or start Docker Desktop. Commit by path, English messages. Re-run `foundation_check.py` after any
  foundation edit.
- Report: `.runs/task-cycles/testy-same-wlaczaja-dockera/reports/fix_report.md`, with **Unread material**
  and **Searches not found or unclear** (`none` where none), own-work check, checks with command and
  exit code. Return status, commits, one-line check result.
