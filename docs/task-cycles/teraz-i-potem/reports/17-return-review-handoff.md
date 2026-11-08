# Handoff 17 — review of the return step (review-change)

## Delegation

The human (Mariusz) started the-way task cycle for this task with `/the-way-implement-task` and delegated intermediate choices to the cycle's orchestrator. You are a fresh reviewer that made none of the change. You are read-only: change no repository file, commit nothing; write only your report. Send questions to the orchestrator by returning `questions`; never ask the human.

## Where you work

- Worktree (work from its root): `the worktree's root`, branch `task/teraz-i-potem`.
- Pinned the-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: read `.the-way/task-cycle/review/SKILL.md` whole and follow it; you review **the return step's commits**, against the task and the foundation entries the return step writes or corrects.
- Range: `52367a97ee32519e9c97a2649be9530f3e50a73c..0a8c6a8` (one commit, `foundations/decisions.md` only).
- Report path: `.runs/task-cycles/teraz-i-potem/reports/17-return-review-report.md`, first line `PASS <sha>`, `FAIL <sha>` or `questions`, each check with its command and exit code, and **Searches not found or unclear** (or `none`). Return that first line, a one-line check result and the report path. Do not run the product's whole gate.
- Trust boundary: no. Irreversible operation: no.

## What it reviews against

- Frozen task `.runs/task-cycles/teraz-i-potem/task.md` (To do 1, Pytanie 3, *Settlements to record* rows 1, 3 and 8).
- The return step's report `.runs/task-cycles/teraz-i-potem/reports/16-return-report.md` and its handoff `reports/16-return-handoff.md`.
- The entries it changes, each whole: D-334 and D-336 in `foundations/decisions.md` (find by heading), with D-174 that D-336 now cites; and the code they describe: `src/browser/view/now-rows.tsx`, `src/browser/view/program-panel.tsx` (`scrollToRule`), `tests/view/run-screen.test.mjs` (the case of a saved program shown).
- The plan's *Choices* `.runs/task-cycles/teraz-i-potem/plan.md` (rows on the scroll while a saved program is shown, and on the rows that name a rule), and the open Minor finding M-5 of the whole-change review (`reports/13-review-report.md`, `reports/15-fix-review-report.md`), which concerns the same behaviour.
