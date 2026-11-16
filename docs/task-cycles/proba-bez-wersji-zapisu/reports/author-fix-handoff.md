# Handoff — the fix of a review's findings, `make-change`

You are the one author, resumed (agent type `the-way-author`). Work from the root of the worktree
`the root of the task's worktree` (branch `task/proba-bez-wersji-zapisu`).

- Method: `.the-way/task-cycle/change/SKILL.md`, variant **the fix of a review's findings**; read `.the-way/task-cycle/change/fix.md` where that variant names it.
- Findings file: `.runs/task-cycles/proba-bez-wersji-zapisu/reports/review-whole-findings.md` (the reviewer's words; two Minor findings within the task, M1 and M2, no blocking finding).
  The review of the whole change passed (`PASS ca90b465…`, report `reports/review-whole-report.md`); the fix range runs from `ca90b465`.
- Fix both findings. For M1 the suggested fix is the reviewer's; if you also change the placeholder of step 5 ("the marker name written down in the install step 8") keep it minimal and say why in your report; both instruction copies stay byte-identical.
  For M2 use the reviewer's wording or a precise equivalent; make no other change to D-234 (the foundation check's citations of the binding sentence must stay green: the Rationale is not the binding sentence, but run it).
- Answer with evidence any finding you hold wrong; do not widen the task. Out of scope as before: `scripts/restore-trial.mjs` and the game.
- Run the affected checks again, each with command and exit code, no pipe that hides the exit code: `python -B .the-way/elements/common/foundation_check.py`,
  `python -B -m unittest tests.agent_workflow.test_loop2_deploy_skill`. Do not run `npm test`.
- Commit by path (`git add <file> <file>`), message in English in the style of the repository's recent commits.
- Working copies: your directory is `.runs/author/` as before; remove it before you return.
- Report: `.runs/task-cycles/proba-bez-wersji-zapisu/reports/author-fix-report.md`: status, commits, checks with commands and exit codes, your own-work check, reaches, **Unread material**, **Searches not found or unclear**, working copies.
