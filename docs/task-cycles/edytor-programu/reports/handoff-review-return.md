# Handoff — review of the return step's commits, task `edytor-programu`

## Delegation
The person who requested this cycle delegated every intermediate choice to the orchestrator of `implement-task`. You never ask the human. You are read-only: change no tracked file, commit nothing; do not run the full gate.

## Where you work
- Worktree (work from its root): `C:/Storage/repos/loop2-wt/edytor-programu`, branch `task/edytor-programu`. Pinned process: `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
- Method: read in full `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`); you review **the return step's commits**, as its section 2 gives, against the task and the foundation entries the return step writes or corrects. (`.the-way/task-cycle/review/fix.md` is not your variant.)
- Range: `a504688..c9e5eb0` (one commit, `foundations/decisions.md` only; confirm `git rev-parse HEAD` and compute the diff yourself).
- The return step's report: `docs/task-cycles/edytor-programu/reports/report-return-step.md` (claims to verify, not evidence); the frozen task: `docs/task-cycles/edytor-programu/task.frozen.md`; the task's rows of *Settlements to record* and the entries D-288, D-291, D-293, D-300, D-306 as they stand now.
- Report: `docs/task-cycles/edytor-programu/reports/report-review-return.md` (if your tool refuses the file, return the whole report as text); its first line is `PASS <sha>` or `FAIL <sha>`.

## What to judge
- That the changed lines only reword the examples (target names „Patyk” as the rows and tests show them) and change no rule, no *Relations*, *Verification* meaning or *Rejected* of an approved decision; that each corrected example agrees with the code and the tests (`tests/view/rule-editor.test.mjs`, `src/browser/view/rule-list.tsx`, `src/browser/view/program-editor.ts`) and with the task's own wording of the criterion („Zapas poniżej 8 · Patyk → Zbierz — Patyk”).
- That the entries are still well formed (`python -B .the-way/elements/common/foundation_check.py` is a read-only check you may run).
- The return step reported two questions it did not write (D-289 held value with no reason; D-304 „+ dodaj grupę” placement). Judge whether leaving them unwritten is right (the bounds: no change to the meaning of an approved decision beyond what the task carries) and whether the return step missed any other entry that the code at the head no longer matches (a short search of your own is enough; the whole-change review's report `docs/task-cycles/edytor-programu/reports/report-review-whole.md` lists what it already judged).
- The base gate fails on `tests/quality` for two tests only (ruff and shellcheck not installed): the base's state.

## Report
First line, graded findings (place and reason), the checks you ran with command and exit code, **Searches not found or unclear:** or `none`. Return only: the first line, a one-line check result, and the report path.
