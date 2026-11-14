# Handoff — the review of the fix of the Minor findings, `review-change`

You are resumed as the reviewer of the whole change. This is the one review the cycle gives the fix of
the Minor findings you listed.

- What is reviewed: the fix, range `4ffd7b04..32629e02` (two commits: `dcc6b3ba` and `32629e02`) in the
  worktree `the repository root`, read-only.
- Method: `.the-way/task-cycle/review/SKILL.md`, the variant of the review of a fix; read
  `.the-way/task-cycle/review/fix.md` and follow it: what you read and what bounds the review.
- The findings the fix answers: `reports/fix-findings.md` in
  `.runs/task-cycles/krotsza-bramka-procesu/reports/` (your five Minor findings, cut word for word).
- The fix report, a set of claims to verify, not evidence:
  `.runs/task-cycles/krotsza-bramka-procesu/reports/fix-report.md`. The fix handoff
  (`reports/fix-handoff.md`) corrects two facts of the first handoff; findings 1 and 2 are judged
  against that correction and the frozen task `.runs/task-cycles/krotsza-bramka-procesu/task.md`.
- Your report: `.runs/task-cycles/krotsza-bramka-procesu/reports/review-fix-report.md`. Working copies
  go in `.runs/review-fix/`, under the rules of your first handoff. Do not run the whole gate.
- Only a new Critical or Important finding in the fix fails this review; a Minor finding that remains
  or is new does not block, and goes to the request's list with your words and its place.
