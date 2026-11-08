# Handoff 14 — the fix of the review's findings (make-change)

## Delegation

The human (Mariusz) started the-way task cycle for this task with `/the-way-implement-task` and delegated intermediate choices to the cycle's orchestrator. Send every question to the orchestrator by returning `questions`; never ask the human.

## Where you work

- Worktree (work from its root): `the worktree's root`, branch `task/teraz-i-potem`, reviewed head `434f32bbbf74695181ab5de5add4137d989aaac2`; the fix's range runs from it.
- Pinned the-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: `.the-way/task-cycle/change/SKILL.md`; you make **the fix of a review's findings**: read `.the-way/task-cycle/change/fix.md` whole and follow it.
- Class of model: `cheaper` (Sonnet), the class of the executor of slice 8, from which the blocking finding comes; the Minor findings name no slice and do not change the agent or the class.
- Findings file: `.runs/task-cycles/teraz-i-potem/reports/14-findings.md` — I-1 (blocking, slice 8) and M-1 to M-5 (Minor, within the task). Fix each, or answer with evidence a finding you hold wrong.
- Boundary: fix only these findings; change only the files they name and the tests that pin what you change. A finding whose fix would need a choice the task, D-336 and the foundation do not settle (M-5 may) is returned as `returned` with the choice and the ways open, without code for it — fix the others. Commit by path, English messages in the repository's form. Do not run the product's whole gate; run the affected focused checks again, each with its command and exit code (no `tail`/`head` swallowing the exit code). Where you touch the look, check it in a running browser by `.claude/skills/loop2-play/SKILL.md` and stop the local start you began (`npm run local:stop`).
- A foundation entry you change (M-4: D-216 *Rejected*) is changed through the project skill `the-way-record-decision` (`.claude/skills/the-way-record-decision/SKILL.md`), as `.the-way/task-cycle/skill/foundation_step.md` gives; a styleguide line (M-3) is written as the cycle's author `the-way-maintain-styleguide` names, from the task.
- Report path: `.runs/task-cycles/teraz-i-potem/reports/14-fix-report.md`, as `fix.md` gives, with each check's command and exit code, your own-work check and **Searches not found or unclear**. Return your status, commits, a one-line check result and the report path.

## Reading

- The frozen task `.runs/task-cycles/teraz-i-potem/task.md`, the passages each finding needs (To do 1 for M-5; To do 3 and 5 for I-1, M-3).
- Foundation: D-46, D-216, D-280, D-311, D-336 (each whole, find by its heading in `foundations/decisions.md`).
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`.
- The review report `reports/13-review-report.md` for the evidence of each finding.
