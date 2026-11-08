# Handoff 13 — review of the return step's commit (fresh reviewer)

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator of `implement-task`. You did not make any part of this change and never ask the human; a question goes back in your report (first line `questions`). Grade and scope are yours alone.

## What you review
- The commit of the return step: range `5e814591a904063749c6a0471779e75a4fbc83c7..HEAD` in the worktree `the worktree's root` (one commit `f0421c3`, `foundations/decisions.md` only: a new D-350 and a line added to the *Origin* of D-166). Confirm `git rev-parse HEAD` shows `f0421c3…`; compute `git diff 5e81459..HEAD` and `git log 5e81459..HEAD` yourself. Read-only; a check that needs changed files runs in a separate worktree under `.runs/`, deleted afterwards.
- Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`), read whole; sections 1–4. The return step's commits are reviewed against the task and the foundation entries the return step writes or corrects (section 1 of the method). Full report path: `docs/task-cycles/proporcje-sceny-i-programu/reports/13-review-return-report.md`; first line `PASS <head sha>` or `FAIL <head sha>`. Return only the first line, the counts of blocking, Minor and out-of-scope findings, a one-line check result, and the report path.
- The return step's report (claims to verify): `docs/task-cycles/proporcje-sceny-i-programu/reports/12-return-report.md`; its method: `.the-way/task-cycle/skill/return_step.md` and `foundation_step.md`.

## The selection of the orchestrator (WAY-150, WAY-213)
- Foundation entries by identifier, each whole, in `foundations/decisions.md` (find by heading): D-350 (new), D-166 (changed *Origin*), D-288, D-295, D-294, D-306, D-311. The decisions' template and rules: `.the-way/elements/decisions/template.md`, `.the-way/elements/common/rules.md`; the check `python -B .the-way/elements/common/foundation_check.py` (you may run it).
- The task (whole, the passages that matter are To do 1–3 and the answers to questions 1 and 3): `docs/task-cycles/proporcje-sceny-i-programu/task.md`. The plan's choice the new entry fixes (row 2 of its *Choices*): `docs/task-cycles/proporcje-sceny-i-programu/plan.md`, section *Choices*, "An open rule inside a folded group has its panel under that group's header".
- The behaviour D-350 describes lives in `src/browser/view/rule-list.tsx` (the slots of the panel under a row and under a header, the folded-group case) and is tested in `tests/view/rule-editor.test.mjs` and `tests/view/program-panel.test.mjs` (the cases on a fold, an unfold and „zwiń wszystkie” and on the panel under the header of a folded group). Check that D-350 says what the code does and nothing more, that its *Verification* examples match the tests, that its *Rejected* come from sources (D-306, D-295), and that its *Origin* `none` and the rationale's citation of D-294 are right.
- The review of the whole change and of its fix are `reports/09-review-whole-report.md` and `reports/11-review-fix1-report.md`; both passed. Do not reopen their findings.

## Return
Per the method: first line, findings by grade with place, reasoning and evidence, **Declined to judge**, each check you ran (command and exit code), each reach beyond this handoff, **Searches not found or unclear**.
