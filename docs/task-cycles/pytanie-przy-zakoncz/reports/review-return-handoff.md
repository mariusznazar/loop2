# Handoff — review of the return step

You review the range of the return step of the task "Pytanie „Zapisać, odrzucić, wrócić?” przy „Zakończ”"
with the project skill `the-way-review-change`. You made none of the change. Read-only: edit no
file of the product, commit nothing.

## Where

- Worktree root (read from here; `.the-way` is this worktree's): `C:\Storage\repos\loop2-wt\pytanie-przy-zakoncz`
- Method: `.the-way/task-cycle/review/SKILL.md`, whole; a file it names only when the step or
  variant that names it comes.
- Range: `cb9d5e7..6a02418` — one commit, `6a02418`, made by the author resumed for the return step:
  `foundations/decisions.md` (D-173 and D-324 corrected) and `tests/view/end-question.test.mjs`
  (one assertion added). `cb9d5e7` is the head that the review of the whole change passed
  (its fix passed review as well) and on which the orchestrator's gate passed.
- Report: `C:\Storage\repos\loop2-wt\pytanie-przy-zakoncz\.runs\task-cycles\pytanie-przy-zakoncz\reports\review-return-report.md`,
  first line `PASS <sha>` or `FAIL <sha>` of the head you reviewed, graded findings, the checks you
  ran with command and exit code, and **Searches not found or unclear**.

## What you are given

- The frozen task, whole: `.runs/task-cycles/pytanie-przy-zakoncz/task.md` (*To do*, *Questions to
  settle*, *Settlements to record* rows 1–8 bind).
- The author's report of the return step: `.runs/task-cycles/pytanie-przy-zakoncz/reports/return-step-report.md`.
- What the return step must do: `.the-way/task-cycle/skill/return_step.md` — it compares with the
  code the entries the change writes or changes, those the task names and those a search of the
  foundation found, and the part map of the touched parts, and corrects in the same change what no
  longer matches; it writes an invariant only for a rule the task, a decision or the human sets.
- Judge the range against the task and against the entries the return step writes or corrects (D-173,
  D-324): is each correction true to the final code (`src/browser/view/game-view.ts`,
  `end-question.tsx`, `program-panel.tsx`, `run-screen.tsx` at `6a02418`) and to the task's rows,
  is the added test assertion sound (does it fail for the break it names), and did the return step
  miss an entry the final code contradicts (D-62, D-132, D-53, D-171, D-172, D-212, D-44, the part
  map, the glossary). A Minor finding of this review is not fixed: it goes to the request's list.
- Checks you may run: focused ones only, e.g. `npm test -- tests/view/end-question.test.mjs`
  (the form `python -B scripts/test.py <file>` fails outside npm),
  `python -B .the-way/elements/common/foundation_check.py`. Do not run `npm test` without an
  argument.

Return: the first line of your report, a one-line check result naming what failed or did not run,
and the report path.
