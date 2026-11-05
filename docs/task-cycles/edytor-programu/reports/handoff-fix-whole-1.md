# Handoff — the fix of the whole-change review's findings, task `edytor-programu`

## Delegation
The person who requested this cycle delegated every intermediate choice to the orchestrator of `implement-task`. You never ask the human. A question goes back in your report with status `questions`; a fact or permission nobody supplies makes you `blocked`. Nothing here is the human's approval.

## Where you work
- Worktree (work from its root): `C:/Storage/repos/loop2-wt/edytor-programu`, branch `task/edytor-programu`. Reviewed head and your base: `01363a5afa5cfa6172341aaeacacee7ff77f537d`. Your range runs from it. Commit on this branch; push nothing.
- Pinned process: `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
- You make: **the fix of a review's findings.** Read in full `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`) and `.the-way/task-cycle/change/fix.md`.
- Findings file (the blocking finding, in the reviewer's words): `docs/task-cycles/edytor-programu/reports/findings-whole-1.md`. Its full review: `docs/task-cycles/edytor-programu/reports/report-review-whole.md` (read only what you need; the Minor findings are not yours to fix).
- Report: `docs/task-cycles/edytor-programu/reports/report-fix-whole-1.md` (if your tool refuses the file, return the whole report as text).
- Commit by paths with `git add <paths>` only; message in English in the repository's form (`git log --oneline -8`); do not run the product's full gate.

## What to do
Fix Important 1: rewrite step 5 of the check of a composed state in `.claude/skills/loop2-play/SKILL.md` and its copy `.agents/skills/loop2-play/SKILL.md` (keep the two copies byte-identical) so that it matches the game as it stands at the head: the actions stand as cells in the rule panel, under the field „Czynność”, which opens from a row or from „+ reguła”; on the screen of a map run the panel stands in the place of the table of revealed tiles (or, with a rule open, read it where the screen puts it). Read the section of the skill around step 5 whole, and any other sentence of the skill that still names the DOM editor, „Dodaj regułę”, „Dodaj grupę” or an action select list (`git grep` for them in both copies) and correct those too, only where they describe the game wrongly. Do not change anything else.
- Verify by a real run, as slice 2 did and as `.claude/skills/loop2-play/SKILL.md` gives (playwright-cli is installed; `compose-state.mjs` builds the state; stop every process you start, delete `.playwright-cli/` when done): follow the corrected step literally on a composed state and confirm that the four cells „Uderz — patyk”, „Kopnij”, „Odskocz” and „Obchód” stand under „Czynność” where the step says. Put one screenshot under `docs/task-cycles/edytor-programu/reports/` named `fix-whole-1-*.png` and give its full path.
- Check: `npm test -- tests/agent_workflow/test_loop2_play_skill.py` (the two copies stay the same; start from the failing run if you change the test), and the commands of your own verification, each with command and exit code in the report. If a finding is wrong, say so with evidence; do not fix what the finding does not name.

## Report
Status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), your commits, what each check showed with command and exit code, your own-work check, the screenshot path, each reach beyond this handoff, **Searches not found or unclear:** or `none`. Return only: status, commits, a one-line check result naming what failed or did not run, and the report path.
