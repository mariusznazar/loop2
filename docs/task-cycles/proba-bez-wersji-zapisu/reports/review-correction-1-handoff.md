# Handoff — review of a correction, `review-change`

You are the reviewer of the whole change, resumed, to review the range of correction 1 once. Same worktree (the root of the task's worktree); read-only; your directory for working copies is `.runs/review-correction-1/`.

- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), as for a later change to an open request.
- Range: `b794b27e..18835d28` (one commit by the author: `18835d28`; the tree at `b794b27e` is the tree of `509961a1` that you reviewed).
- In place of a findings file, the human's remarks, word for word: `.runs/task-cycles/proba-bez-wersji-zapisu/reports/correction-1-remarks.md` (item 1 binds: change the one phrase of step 7 of "Restoring over the server's database", both copies, so the step points to the marker written down last, as step 5 of the trial does; items 2–4 accepted).
  The correction is the fix of the note you made outside the task's scope in `reports/review-fix-report.md`; the human answered "fix it in this request", so it is now within the request, but it changes only what the remark names.
- The author's report: `.runs/task-cycles/proba-bez-wersji-zapisu/reports/author-correction-1-report.md`.
- Judge: whether the remark is carried out (both copies, one phrase, byte-identical), whether the change introduces a new Critical or Important finding (a new Minor goes to the request's list), whether "written down last" is right in step 7 in the context of a restore (the backup holds the marker that stood when it was made; the step has its own fallback) and whether anything else moved.
  Say plainly whether the sentence of step 7 now holds together for an operator who restores a backup made BEFORE a change of `SAVED_GAME_VERSION` after a new marker was given; grade what you find, you alone grade and scope.
- Checks: the foundation check and the deploy skill test, each with command and exit code, `cmp` of the two copies; `npm test` is the orchestrator's.
- Report: `.runs/task-cycles/proba-bez-wersji-zapisu/reports/review-correction-1-report.md`, first line `PASS <sha>` or `FAIL <sha>`, with **Unread material**, **Searches not found or unclear** and the working-copies line; remove `.runs/review-correction-1/` before you return.
