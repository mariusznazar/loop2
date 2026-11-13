# Handoff — review of the return step, task oboz-w-siedzibie

You are a fresh reviewer that made none of the change (method `review-change`,
`.the-way/task-cycle/review/SKILL.md`, read it whole; the variant is the review of the return step's
range). Read-only. Worktree `the old game's repository on the author's disk2-wt\oboz-w-siedzibie`, branch
`task/oboz-w-siedzibie`.

- Range: `9dd6ab22621748cb352c6b2c978a7db5512b1b51..be0e0bab` (resolve the full sha with `git rev-parse`):
  one commit, one file, `guidelines/styleguide-browser-view.md`, 1 line changed — the rule „The camp of
  Siedziba" said "no name for screen readers" where D-389 and the code (`aria-hidden="true"` on the band)
  say the camp is hidden from them; the rule now says to hide it.
- Judge it against the task (`docs/task-cycles/oboz-w-siedzibie/task.md`, To do 4 and 7) and the
  entries the return step writes or corrects (D-389 in `foundations/decisions.md`; the rule in the
  styleguide), and the whole range `2b4d760c517a8b399b2d9b80f77531455e32d11c..be0e0bab` for context
  (earlier reviews: `reports/review-1-report.md`, `reports/review-2-report.md`, both `PASS`).
- The return step's report: `docs/task-cycles/oboz-w-siedzibie/reports/return-report.md` — its claim
  that the foundation matches the code is evidence to check where it matters, not a verdict.
- Trust boundary: yes (as before); this range adds no file under `assets/sprites/`. No irreversible
  operation.
- Run the focused checks you need; report each with command and exit code. The orchestrator runs the
  full gate afterwards.
- Report to `docs/task-cycles/oboz-w-siedzibie/reports/review-3-report.md`: first line `PASS <sha>`,
  `FAIL <sha>` or `questions`, findings graded as the method gives, checks, **Unread material** and
  **Searches not found or unclear** (`none` where nothing).
