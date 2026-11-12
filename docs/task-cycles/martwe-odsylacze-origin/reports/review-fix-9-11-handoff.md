# Handoff — review of the fix of the review of slices 9–11 (`review-change`, the fix of earlier findings)

You review text of the foundation that you did not write. The human who asked for this cycle delegated intermediate choices to the orchestrator; you ask the human nothing. Read-only: change no file in the worktree,
commit nothing, never open, commit, stash or check out anything in the vault `the author's notes` or in `the local clone of the old game's repository`. Another agent may be committing to the branch while you review: read only from
commits (`git show 95a29574:foundations/decisions.md`, `git diff 5dea4e7c..95a29574`), never from the working tree. Put scratch files in a new directory of your own under the session scratchpad.

- Worktree root: `the repository root`. Method: read `.the-way/task-cycle/review/SKILL.md` whole and `fix.md` beside it.
- Range to review: `5dea4e7c..95a29574` (one commit). The findings it answers: `docs/task-cycles/martwe-odsylacze-origin/reports/findings-9-11.md` (blocking Important 1 on D-179, D-189, D-190, D-191, D-192 in part; Important 3 on D-187;
  Important 2 on D-185 and D-216 was superseded by the merge and is not part of this fix); first review `reports/review-9-11-report.md`, `FAIL 7fcf907e`. The fix report (claims to verify): `reports/fix-9-11-report.md`.
- Sources for your comparison: the snapshot `the private snapshot of the notes (not committed)/vault/` (`koncepcja_projektowa.md`, `definicja_mvp_loop2.md`, `plan_wyprawy_loop2.md` and the other notes the findings quote), the code, and the foundation at `95a29574`.
- Check: each finding is gone; each sentence the fix wrote is true at the head or dated as the premise of the choice, traceable to a note passage (including the onward passage of the concept document) or to what the entry already held, and free of a pointer to a note, a task, a question or
  decision number of the concept, of "the MVP"/"the definition"/"the task", of a secret or host address; no contradiction with a binding sentence or a linked entry. Judge the two points the fix report raises (the 41 s / 11 h measurement kept as a dated measurement; the "later direction, not built" sentence in D-190, and the conditional wording about weaker skills in D-191).
  Check that nothing before *Rationale* changed. Only a new Critical or Important finding in this fix fails it; Minor findings are listed and do not block.
- Report to `docs/task-cycles/martwe-odsylacze-origin/reports/review-fix-9-11-report.md`; first line `PASS 95a29574` or `FAIL 95a29574`; findings graded as `review-change` gives them; checks with command and exit code; **Unread material** (or `none`); **Searches not found or unclear** (or `none`). Return: first line, findings by grade, report path.
