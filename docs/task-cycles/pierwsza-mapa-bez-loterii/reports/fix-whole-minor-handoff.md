# Handoff — the fix of the Minor findings of the review of the whole change

You are the one author of this change, resumed. The review of the whole change returned `PASS 23981674d61013e1bfc4cc63a71e5112736a520b` with no blocking finding and four Minor findings within the task. The cycle fixes those once (WAY-161, WAY-162).

- Method: `.the-way/task-cycle/change/SKILL.md`, variant **"the fix of a review's findings"**; read `.the-way/task-cycle/change/fix.md` when the SKILL sends you there.
- Findings file (the reviewer's words, cut from its report): `.runs/task-cycles/pierwsza-mapa-bez-loterii/reports/findings-whole-minor.md` — M1, M2, M3, M4. Read the whole review report where a finding's evidence needs it: `.runs/task-cycles/pierwsza-mapa-bez-loterii/reports/review-whole-report.md`.
- Worktree and branch as before (`.`, `task/pierwsza-mapa-bez-loterii`). The fix's range starts from the reviewed head `23981674`. Commit by explicit path, English messages in the repository's style; do not push; do not run the whole gate (the orchestrator's). Run the affected checks again with their commands and exit codes.
- Report to `.runs/task-cycles/pierwsza-mapa-bez-loterii/reports/fix-whole-minor-report.md`, in the form your method gives (checks with command and exit code, **Unread material**, **Searches not found or unclear**, own-work check), and return the short form.

## What to do, finding by finding

- **M1** (`tests/sim/saved-game.test.mjs`): make the document of the current version hold the maps a game that reached Las holds (`["forestEdge", "forest"]` in `DOCUMENT` and in `HEADQUARTERS`), or correct the comments — the reviewer's fix names the first; take it unless a test then fails for a reason you can name, and say so.
- **M2** (`src/browser/view/program-editor.ts` doc comment and `tests/view/program-editor.test.mjs`): the behaviour is D-289's — your report said no decision names it, and that was wrong; cite D-289 in the comment and make the first assertion of the test start from `newKnowingGame()` (nothing solved) expecting all four resources. Read D-289 whole first.
- **M3** (`foundations/invariants.md`, the entry `first-map-balance`): say „on several hundred map runs the test names”, with no count and no clock constant, and either drop the clause that the naive program never leaves the entrance tile or assert it in the test. Prefer dropping it: the approved row (*Settlements to record*, row 2 in the frozen task) says nothing of it. Where the entry changes, run `python -B .the-way/elements/common/foundation_check.py` (exit and result in the report) and keep any decision that cites those numbers in step with the entry.
- **M4** (the screen Mapy not seen rendered): do the check `.the-way/task-cycle/change/ui_check.md` asks for, by the route the project skill `.claude/skills/loop2-play/SKILL.md` gives for running the game locally and operating it in a real browser (read it whole first): a new game's screen Mapy listing Skraj lasu alone with its card, and, where reachable, the card of Las with „odsłania ją Skraj lasu”, and the program editor's resource selects before a run. Inspect the screenshots yourself and say what you saw. **Publish nothing:** do not push, upload or commit any screenshot, and do not send one to any repository or service; keep the files only in an ignored place of the worktree (for example under `.runs/`) or nowhere, and tell the orchestrator in the report where each lies, so that it can say in the request that the screenshots were inspected and are not shown. Use a browser session of your own and close it at the end (WAY-319). If the route fails or cannot be run, report that failed check itself with its actual result, not a missing-route reason; the screenshot then stays unchecked.

Do not fix O1, O2 or O3: the reviewer marked them outside the task. Change nothing else.

## Carry from the review (read where it bears on your fix)

- The reviewer found that your report's claim, that a version 6 document with `["forestEdge","forest"]` loads whole, was not what `DOCUMENT` held (M1); re-verify every claim of that kind in your fix report by the command that shows it.
- Your report's **Unread material** named decisions and invariants you did not read; the reviewer read most of them and found nothing further. Read the ones your fix touches (D-289 for M2; the entry and D-397 for M3).
