# Handoff — review of the fix of the review of slices 12-14 (`review-change`, the fix of earlier findings)

You review text of the foundation that you did not write. The human who asked for this cycle delegated intermediate choices to the orchestrator; you ask the human nothing. Read-only: change no file in the worktree,
commit nothing, never open, commit, stash or check out anything in the vault `the author's notes` or in `the local clone of the old game's repository`. Another agent may be committing to the branch while you review: read only from
commits (`git show a732d90d:foundations/decisions.md`, `git diff cdf5ee15..a732d90d`), never from the working tree. Put scratch files in a new directory of your own under the session scratchpad.

- Worktree root: `the repository root`. Method: read `.the-way/task-cycle/review/SKILL.md` whole and `fix.md` beside it (this is the review of a fix; it says what you read and what bounds the review).
- Range to review: `cdf5ee15..a732d90d` (the fix). The findings it answers: `docs/task-cycles/martwe-odsylacze-origin/reports/findings-12-14.md` (blocking findings on D-243 and D-247, in the first reviewer's words; first review
  `reports/review-12-14-report.md`, `FAIL f3194047`). The fix report (claims to verify): `reports/fix-12-14-report.md`.
- Sources for your comparison: the snapshot `the private snapshot of the notes (not committed)/vault/` (the notes the findings quote and the onward passages of the project concept), the code the fix describes, and the foundation entries at `a732d90d`.
- Check: each finding is gone; each sentence the fix wrote is true at the head (check the code and the other entries yourself), traceable to a note passage or to what the entry already held, and free of a pointer to a note, task, question or decision number of the
  concept or of a task document, of "the MVP"/"the definition"/"the task", of a secret or host address; no new contradiction with a binding sentence or a linked entry. Check nothing before *Rationale* changed. Only a new Critical or Important finding in this fix fails it; Minor findings are listed and do not block.
- Report to `docs/task-cycles/martwe-odsylacze-origin/reports/review-fix-12-14-report.md`; first line `PASS a732d90d` or `FAIL a732d90d`; findings graded as `review-change` gives them; checks with command and exit code; **Unread material** (or `none`); **Searches not found or unclear** (or `none`).
  Return: first line, findings by grade, report path.
