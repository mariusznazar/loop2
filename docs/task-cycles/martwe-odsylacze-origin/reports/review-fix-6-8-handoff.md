# Handoff — review of the fix of the review of slices 6–8 (`review-change`, the fix of earlier findings)

You review text of the foundation that you did not write. The human who asked for this cycle delegated intermediate choices to the orchestrator; you ask the human
nothing. Read-only: change no file in the worktree, commit nothing, never open, commit, stash or check out anything in the vault `the author's notes` or in
`the local clone of the old game's repository`. Another agent may be committing to the branch while you review: read only from commits (`git show 60c5f99f:foundations/decisions.md`,
`git diff 59b06238..60c5f99f`), never from the working tree. Put scratch files in a new directory of your own under the session scratchpad.

- Worktree root: `the repository root`.
- Method: read `.the-way/task-cycle/review/SKILL.md` whole and `fix.md` beside it (this is the review of a fix; it says what you read and what bounds the review).
- Range to review: `59b06238..60c5f99f` (one commit). The findings it answers: `docs/task-cycles/martwe-odsylacze-origin/reports/findings-6-8.md` (blocking I-1 on D-84 and D-85,
  I-2 on D-79, I-3 on D-96, I-4 on D-144, in the first reviewer's words; first review `reports/review-6-8-report.md`, `FAIL 7e3aa5e8`). The fix report (claims to verify):
  `reports/fix-6-8-report.md`.
- Sources for your comparison: the snapshot `the private snapshot of the notes (not committed)/vault/` (the notes the findings quote), the code the fix describes (`tests/http.test.mjs` at
  `60c5f99f`: `git show 60c5f99f:tests/http.test.mjs`), and the foundation entries it names (D-163, D-235, D-73, D-280, D-287, D-82 as rewritten).
- Check: each finding is gone; each sentence the fix wrote is true at the head (check the code and the other entries yourself), traceable to a note passage or to what the entry already held,
  and free of a pointer to a note, task, question number or place on a disk, of a secret, a host address, and of a new contradiction with a binding sentence or a linked entry. Check
  nothing before *Rationale* changed. Only a new Critical or Important finding in this fix fails it; Minor findings are listed and do not block.
- Report to `docs/task-cycles/martwe-odsylacze-origin/reports/review-fix-6-8-report.md`; first line `PASS 60c5f99f` or `FAIL 60c5f99f`; findings graded as `review-change` gives them;
  checks with command and exit code; **Unread material** (or `none`); **Searches not found or unclear** (or `none`). Return: first line, findings by grade, report path.
