# Handoff — the fix of the whole-change review's Minor findings, task oboz-w-siedzibie

## Delegation

As before: the orchestrator has the person's delegation; you never ask the human; questions go to the
orchestrator in your report. Never label an answer as the human's approval.

## Stage and boundary

- Method: `.the-way/task-cycle/change/SKILL.md`, variant "the fix of a review's findings".
- Where you work: the same worktree and branch, `the old game's repository on the author's disk2-wt\oboz-w-siedzibie`,
  `task/oboz-w-siedzibie`, from the reviewed head `07fd0de35e07ea03bb4e8e706ce221f54be0b801`.
- Findings file: `reports/findings-1.md` (in `docs/task-cycles/oboz-w-siedzibie/`). It holds no
  blocking finding and four Minor findings (M1–M4) that the whole-change review (`PASS`, report
  `reports/review-1-report.md`) found within the task; the orchestrator has them all fixed before the
  request opens. A fix is its own commits on the branch. A finding you hold wrong you answer with
  evidence in your report instead of changing code; the reviewer, not you, grades and scopes.
- What the orchestrator tells you about each (the reviewer graded and scoped them; you judge only the
  way to fix):
  - M1: the three texts fix one layout (the sides of the chest and the characters) that the human judges
    on the screenshot at the request. Fix by making the texts say only what the task settles, leaving
    the sides to the code and its tests, so a different composition at the request changes the code
    and no entry or rule — unless you can show the sides are part of what D-389 binds. If a verification
    example needs a layout, say it without the sides ("the fire at the middle of the band, the chest and
    the characters of Siedziba beside it").
  - M2: change the title of D-271 only through `the-way-record-decision` and only as its method allows
    a changed question; if the method does not allow it, say so and leave the title.
  - M3: shorten the new styleguide rule as the guidelines' template asks (no restatement of D-389, no
    list of the code's files), keeping what To do 7 asks the rule to say; read
    `.the-way/product-guidelines/template.md` and do it through `the-way-maintain-styleguide`.
  - M4: add a case in `tests/view/scene-picture.test.mjs` beside the earlier ones that the two new files
    hold pixels alone (the chunks `IHDR`, `IDAT` and `IEND`), in the form of the wolf's files' case there.
- Run the checks that your change touches again (the focused tests, `foundation_check.py`, the
  quality test of `tests/quality/test_quality_invariants.py` on the changed files, `npm run typecheck`)
  and report each with command and exit code. Do not run the full gate; the orchestrator does. For M4 show
  the new case failing once for the break it names, then passing.
- Commit as before (path-wise `git add`, English messages with the type and emoji); do not push.

## Report

Write it to `docs/task-cycles/oboz-w-siedzibie/reports/fix-1-report.md` and return status, commits,
a one-line check result and the path; it holds, per finding, what you did or why you hold it wrong, the
checks with commands and exit codes, your own-work check, **Unread material** (what this handoff
names that stayed unread or was read in part, or `none`) and **Searches not found or unclear**
(each thing looked for and not found or unclear, or `none`).
