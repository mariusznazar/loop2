# Handoff — the fix of the return step's review finding, task `edytor-programu`

## Delegation
The person who requested this cycle delegated every intermediate choice to the orchestrator of `implement-task`. You never ask the human. Nothing here is the human's approval.

## Where you work
- Worktree (work from its root): `C:/Storage/repos/loop2-wt/edytor-programu`, branch `task/edytor-programu`. Reviewed head and your base: `c9e5eb026fb1e1ec23614cfceb2c6bed1d946809`. Commit on this branch; push nothing.
- Pinned process: `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
- You make: **the fix of a review's findings.** Read in full `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`) and `.the-way/task-cycle/change/fix.md`. The file you change is a foundation file: write the change through the project skill `the-way-record-decision` (`.claude/skills/the-way-record-decision/SKILL.md`), which reads `.the-way`; also read `.the-way/task-cycle/skill/foundation_step.md` for the bounds.
- Findings file: `docs/task-cycles/edytor-programu/reports/findings-return-1.md` (the blocking finding, in the reviewer's words). Its full review: `docs/task-cycles/edytor-programu/reports/report-review-return.md` (the Minor findings there are not yours).
- Report: `docs/task-cycles/edytor-programu/reports/report-fix-return-1.md` (if your tool refuses the file, return the whole report as text).
- Commit by paths with `git add <paths>` only; message in English in the repository's form; no full gate.

## What to do
In `foundations/decisions.md`, D-291's *Verification* "complies" example still writes the target in lower case („Zapas poniżej 8 · patyk → Zbierz — patyk”); change it to „Zapas poniżej 8 · Patyk → Zbierz — Patyk” as the finding says, the same way the return step changed the other examples (commit `c9e5eb0`). Change nothing else: no rule, no *Relations*, no *Rejected*; the Minor findings (D-291's *Rationale* and *Rejected*, D-282, line 1295) stay as they are. Run `python -B .the-way/elements/common/foundation_check.py` and report its own exit code (not through a pipe). If the finding is wrong, say so with evidence.

## Report
Status, your commit, the check with command and exit code, your own-work check, each reach beyond this handoff, **Searches not found or unclear:** or `none`. Return only: status, commit, a one-line check result, and the report path.
