# Handoff — review of the fix of the review of slices 35 (`review-change`, the fix of earlier findings)

You review text of the foundation that you did not write. The human who asked for this cycle delegated intermediate choices to the orchestrator; you ask the human nothing. Read-only: change no file in the worktree,
commit nothing, never open, commit, stash or check out anything in the vault `the author's notes` or in `the local clone of the old game's repository`. Another agent may be committing to the branch while you review: read only from
commits (`git show 1eec81dc:foundations/decisions.md`, `git diff 3a4a8090..1eec81dc`), never from the working tree. Put scratch files in a new directory of your own under the session scratchpad.

- Worktree root: `the repository root`. Method: read `.the-way/task-cycle/review/SKILL.md` whole and `fix.md` beside it (this is the review of a fix; it says what you read and what bounds the review).
- Range to review: `3a4a8090..1eec81dc` (the fix). The findings it answers: `docs/task-cycles/martwe-odsylacze-origin/reports/findings-35.md` (blocking findings on D-185 and D-216, in the first reviewer's words; first review
  `reports/review-35-report.md`, `FAIL d07c5537`). The fix report (claims to verify): `reports/fix-35-report.md`.
- Sources for your comparison: the snapshot `the private snapshot of the notes (not committed)/vault/` (the notes the findings quote and the onward passages of the project concept), the code the fix describes, and the foundation entries at `1eec81dc`.
- Check: each finding is gone; each sentence the fix wrote is true at the head (check the code and the other entries yourself), traceable to a note passage or to what the entry already held, and free of a pointer to a note, task, question or decision number of the
  concept or of a task document, of "the MVP"/"the definition"/"the task", of a secret or host address; no new contradiction with a binding sentence or a linked entry. Check nothing before *Rationale* changed. Only a new Critical or Important finding in this fix fails it; Minor findings are listed and do not block.
- Report to `docs/task-cycles/martwe-odsylacze-origin/reports/review-fix-35-report.md`; first line `PASS 1eec81dc` or `FAIL 1eec81dc`; findings graded as `review-change` gives them; checks with command and exit code; **Unread material** (or `none`); **Searches not found or unclear** (or `none`).
  Return: first line, findings by grade, report path.
