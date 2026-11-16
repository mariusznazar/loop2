# Handoff — review of the fix, `review-change`

You are the reviewer of the whole change, resumed, to review the fix range once. Same worktree
`the root of the task's worktree`; read-only; your working-copy directory is `.runs/review-fix/`.

- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), as for a fix.
- Range: `ca90b465..509961a1` (one commit by the author: `509961a1`).
- Findings fixed, in your words: `reports/review-whole-findings.md` (M1 and M2, both Minor within the task) — the findings file of this fix round.
- The author's report of the fix: `reports/author-fix-report.md`.
- Judge whether M1 and M2 are fixed, whether the fix introduced a new Critical or Important finding (only such a finding fails this review; a new Minor goes to the request's list),
  whether the two instruction copies are still byte-identical, whether the change of the placeholder of step 5 (beyond your suggested fix, which you called optional) is within the task, and that nothing else of D-234 changed.
- Checks: the foundation check and the deploy skill test, each with command and exit code; `npm test` is the orchestrator's.
- Report to `.runs/task-cycles/proba-bez-wersji-zapisu/reports/review-fix-report.md`, first line `PASS <sha>` or `FAIL <sha>`, with **Unread material**, **Searches not found or unclear** and the working-copies line. Remove `.runs/review-fix/` before you return.
