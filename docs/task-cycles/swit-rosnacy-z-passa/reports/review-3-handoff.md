# Handoff — review of the return step's commit

You are a fresh reviewer of a the-way task cycle (method `the-way-review-change`, variant for a later change
to the cycle: the return step's range). You did not make the change. Read-only; do not run the full `npm test`.
Work from the worktree root `the task's worktree` (branch `task/swit-rosnacy-z-passa`).
Method: `.the-way/.claude/skills/the-way-review-change/SKILL.md` — read it whole; read a file it names only when the
step or variant that names it comes.

- Range to review: `a3125aaad786274c9c729ea32da940dc3387621a` (head of the reviewed and passed change)
  to `650e6df02df35a5d9cd261c5a51bb530f683fd49`: one commit, `650e6df0`, two files
  (`foundations/decisions.md`, `guidelines/styleguide-browser-view.md`), 6 insertions, 5 deletions.
- The return step's report: `docs/task-cycles/swit-rosnacy-z-passa/reports/return-report.md`. Its handoff:
  `reports/return-handoff.md`. The return step's rules: `.the-way/task-cycle/skill/return_step.md`.
- Review it against the frozen task `docs/task-cycles/swit-rosnacy-z-passa/task.md` (read whole) and the entries
  the return step corrects (D-316, D-372) with the code they describe (`src/browser/view/scene-picture.ts`
  `tintShown`, `src/browser/styles.css` the frost rules, `tests/view/scene*.test.mjs`). Two claims to test against
  the code: (1) the tint's 2 s return also waits at a discovery (D-322), not only in the pause; (2) the frost is
  the outline alone at its first pixel, not at the first two. Note that (1) extends task row 3, which names the
  pause only: judge whether the entry still honours the settlement and says so truthfully.
- Earlier reviews: `reports/review-1-report.md` (FAIL, fixed), `reports/review-2-report.md` (PASS of the fix).
  The Origin ruling stands: no entry names the task document (pinned template, WAY-27).
- Trust boundary `assets/sprites/**`: this range touches no file there.
- Report: `docs/task-cycles/swit-rosnacy-z-passa/reports/review-3-report.md`, first line `PASS <sha>` or
  `FAIL <sha>`; checks with command and exit code; **Unread material**; **Searches not found or unclear**.
