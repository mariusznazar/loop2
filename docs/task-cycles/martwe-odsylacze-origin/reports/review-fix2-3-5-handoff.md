# Handoff — review of the second fix of D-03 (`review-change`, the fix of earlier findings)

You review text of the foundation that you did not write. The human who asked for this cycle delegated intermediate choices to the orchestrator; you ask the
human nothing. Read-only: change no file in the worktree, commit nothing, never open, commit, stash or check out anything in the vault `the author's notes` or in
`the local clone of the old game's repository`. Another agent may be committing to the branch while you review: read only from commits (`git show b64d3c91:foundations/decisions.md`,
`git diff bc7367e8..b64d3c91`), never from the working tree.

- Worktree root: `the repository root`.
- Method: read `.the-way/task-cycle/review/SKILL.md` whole and `fix.md` beside it.
- Range to review: `bc7367e8..b64d3c91` (one commit). The finding it answers is N-1 of `docs/task-cycles/martwe-odsylacze-origin/reports/review-fix-3-5-report.md`
  (first line `FAIL 7ec7966b`): the sentence in D-03 "…so the loss falls mainly on the tests of the game screens." reverses the note. Fix report (claims to verify):
  `docs/task-cycles/martwe-odsylacze-origin/reports/fix2-3-5-report.md`.
- Source for your comparison: the snapshot `the private snapshot of the notes (not committed)/vault/technologia_budowanie_ekranow.md`.
- Check: the finding is gone; D-03 now says nothing the note does not give or that contradicts it; nothing else changed; no pointer, secret or host address enters the entry.
  (Minor finding N-2 of the first fix's review is not the subject of this fix and is not to be re-opened as blocking.) Only a new Critical or Important finding in this fix fails it.
- Report to `docs/task-cycles/martwe-odsylacze-origin/reports/review-fix2-3-5-report.md`; first line `PASS b64d3c91` or `FAIL b64d3c91`; findings graded as `review-change` gives them;
  checks with command and exit code; **Unread material** (or `none`); **Searches not found or unclear** (or `none`). Return: first line, findings by grade, report path.
