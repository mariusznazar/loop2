# Handoff — reviewer of the return step, task `petla-zarobkowa`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the reviewer of the return step, a fresh
agent that made none of the change. You change no file except your report. Your questions go to the
orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\petla-zarobkowa`, branch
  `task/petla-zarobkowa`.
- Method: `.the-way/task-cycle/review/SKILL.md` in the worktree (the project skill
  `the-way-review-change`). Read it whole; read a file it names only when the step or variant that
  names it comes.
- Variant: a later change to an open request is not this; this is the return step's range, judged
  against the task and the entries the return step writes or corrects.
- Range: `34417de..42784ca`, one commit, four files: `foundations/decisions.md`,
  `foundations/glossary.md`, `foundations/invariants.md`, `guidelines/coding-saved-game.md`.
- Report path, first line `PASS <sha>` or `FAIL <sha>`:
  `.runs/task-cycles/petla-zarobkowa/reports/17-return-review-report.md`
- Do not run the product's gate (`npm test` with no file argument); it is the orchestrator's. A
  focused check you run carries its command and exit code. Before writing any script read
  `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md`.

## Answers of step 4

- Trust boundary: **yes**, `src/browser/sim/saved-game.ts`; the range touches no code.
- Irreversible operation: **yes**, raising `SAVED_GAME_VERSION`, already made and only prepared; the
  range does not touch it.

## Sources

- The return step's report: `.runs/task-cycles/petla-zarobkowa/reports/16-return-step-report.md`, with
  its table of corrections, its measurement and its concerns.
- Frozen task: `.runs/task-cycles/petla-zarobkowa/task.md`, read as far as these need: *Settlements
  to record* (rows 10, 16, 19, 24), Q12, *Decisions in play*.
- The code each corrected entry speaks of, read where you check a claim: `src/browser/sim/loop.ts`,
  `src/browser/sim/saved-game.ts`.
- The whole-change review: `.runs/task-cycles/petla-zarobkowa/reports/14-whole-review-report.md`,
  findings M-8 and M-9.
- `guidelines/coding-saved-game.md` changes a sentence: check it against the product's guideline
  rules and the guidelines' own route for a changed meaning, as your method gives.
