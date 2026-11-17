# Handoff — review of fix 1

You are the reviewer of the whole change, resumed: review the fix of your findings once (`review-change`, variant: the fix of earlier findings).

- Worktree: `the task's worktree`; branch `task/poprawki-kodu-z-przegladu-fundamentu`.
- Fix range: `1d8caf1710408bd57940048892bd9c19fc75640b..e384f793` (one commit, `e384f793`; confirm with `git rev-parse HEAD`).
- Findings file the fix was given: `reports/fix-1-findings.md` (your I-1, I-2, M-1, M-2, cut word for word). Fix report: `reports/fix-1-report.md`. Both in `.runs/task-cycles/poprawki-kodu-z-przegladu-fundamentu/`.
- The orchestrator's answer to I-1 (binding on the fix): row 2 read as asking an entry of its own for the term; the fix wrote the entry `at the camp` and made the `headquarters` *Not* point to it. Judge whether the entry, its definition with the manual-map-run qualifier, and its *Not* meet I-1 and I-2 and the glossary template's rules, and whether M-1 and M-2 are fixed. A new Critical or Important finding in the fix counts as one that remains; a Minor finding does not block.
- Your directory for working copies: `.runs/review-fix-1/`. Report path: `.runs/task-cycles/poprawki-kodu-z-przegladu-fundamentu/reports/review-fix-1-report.md`, first line `PASS <sha>` or `FAIL <sha>`.
- Do not run the product's full gate. Focused checks with command and exit code each.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule.

Return the report's first line, your check result in one line, the report's path, concerns, reaches, **Unread material** and **Searches not found or unclear**.
