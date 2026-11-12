# Handoff — review of the fix of the review of slices 3–5 (`review-change`, the fix of earlier findings)

You review text of the foundation that you did not write. The human who asked for this cycle delegated intermediate choices to the
orchestrator; you ask the human nothing. Read-only: change no file in the worktree, commit nothing, never open, commit, stash or check
out anything in the vault `the author's notes` or in `the local clone of the old game's repository`. Another agent may be committing to the branch while
you review: read only from commits (`git show 7ec7966b:foundations/decisions.md`, `git diff 7e3aa5e8..7ec7966b`), never from the working tree.

- Worktree root: `the repository root`.
- Method: read `.the-way/task-cycle/review/SKILL.md` whole, and `fix.md` beside it (this is the review of a fix; it says what you read and what bounds the review).
- Range to review: `7e3aa5e8..7ec7966b` (one commit, the fix). The findings it answers: `docs/task-cycles/martwe-odsylacze-origin/reports/findings-3-5.md`
  (blocking findings I-1 on D-03 and I-2 on D-12, in the first reviewer's words; the first review is `reports/review-3-5-report.md`, first line `FAIL 1879a6d9`).
  The fix report (claims to verify): `docs/task-cycles/martwe-odsylacze-origin/reports/fix-3-5-report.md`.
- Sources for your comparison: the snapshot `the private snapshot of the notes (not committed)/vault/` — `technologia_budowanie_ekranow.md` and `serwer_testowy_loop2.md`.
- Check: does the fix make each finding disappear, without inventing a reason no note passage gives, without a pointer to a note, task or place on a disk, without a
  secret or host address, and without a new contradiction with the decisions' binding sentences or with the backup decisions D-228, D-230 to D-238? The fix agent also
  changed a phrase in D-12's *Rejected* beyond the finding ("server's present contents warrant" → "contents then warranted"); judge whether that is right or harmful. Also
  check that nothing before *Rationale* changed (the orchestrator's script says only D-03 and D-12 differ and nothing before *Rationale* changed).
- Report to `docs/task-cycles/martwe-odsylacze-origin/reports/review-fix-3-5-report.md`; first line `PASS 7ec7966b` or `FAIL 7ec7966b`; findings graded as `review-change` gives
  them; checks with command and exit code; **Unread material** (or `none`); **Searches not found or unclear** (or `none`). Return: first line, findings by grade, report path.
