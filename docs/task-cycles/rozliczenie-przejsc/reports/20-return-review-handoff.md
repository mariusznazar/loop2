# Handoff — reviewer of the return step, task `rozliczenie-przejsc`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the reviewer of the return step, a fresh
agent that made none of the change. You change no file except your report. Your questions go to the
orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\rozliczenie-przejsc`, branch
  `task/rozliczenie-przejsc`.
- Method: `.the-way/task-cycle/review/SKILL.md` in the worktree (the project skill
  `the-way-review-change`). Read it whole; read a file it names only when the step or variant that
  names it comes.
- Variant: a later change on the task's branch: the return step's commits, against the task and the
  entries the return step writes or corrects.
- Range: `923391c..3a5b172`.
- Author's report: `.runs/task-cycles/rozliczenie-przejsc/reports/19-return-report.md`
- What the return step does: `.the-way/task-cycle/skill/return_step.md`.
- Report path, first line `PASS <sha>` or `FAIL <sha>`:
  `.runs/task-cycles/rozliczenie-przejsc/reports/20-return-review-report.md`
- Do not run the product's gate (`npm test` with no file argument); it is the orchestrator's. A
  focused check you run carries its command and exit code. Before writing any script read
  `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md`.

## Answers of step 4

- Trust boundary: **yes**, `src/browser/sim/saved-game.ts`; this range does not touch it.
- Irreversible operation: **yes**, raising `SAVED_GAME_VERSION`; this range does not touch it. Check
  that nothing is performed on a server.

## What to read

- The frozen task `.runs/task-cycles/rozliczenie-przejsc/task.md`: *To do* 16, 22, Q3, Q9, Q11,
  *Questions carried to cycle*, and *Settlements to record*, rows 9 and 10.
- The spec `.runs/task-cycles/rozliczenie-przejsc/spec.md`, decision 4, whose rule D-221 writes down.
- The entries: D-04, D-212, D-216, D-219, D-221, `death-settled-once`, `resurrection-renewal`,
  and the terms `resurrection`, `generation number`.
- The code the entries speak of: `settleDeath` in `src/browser/sim/game.ts`, `src/browser/view/clock.ts`,
  the load's refusal in `src/browser/sim/saved-game.ts`.
- The element's skill of decisions, `.the-way/elements/decisions/`, for the form of D-221 and the
  wording rule of Q9, and `.the-way/elements/glossary/template.md`, *Two glossaries*, for the
  correction of D-04.

The author names two concerns, C1 and C2, in its report; the whole-change review
(`reports/17-whole-review-report.md`) did not see this range.
