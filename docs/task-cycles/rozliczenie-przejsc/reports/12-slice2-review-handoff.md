# Handoff — reviewer of Slice 2, task `rozliczenie-przejsc`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the reviewer of one slice, a fresh agent
that did not make it. You change no file except your report. Your questions go to the orchestrator,
never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\rozliczenie-przejsc`, branch
  `task/rozliczenie-przejsc`.
- Method: `.the-way/task-cycle/review/SKILL.md` in the worktree (the project skill
  `the-way-review-change`). Read it whole; read a file it names only when the step or variant that
  names it comes.
- Variant: a planned slice — Slice 2.
- Range: `de432c6..8949515`.
- Report path, first line `PASS <sha>` or `FAIL <sha>`:
  `.runs/task-cycles/rozliczenie-przejsc/reports/12-slice2-review-report.md`
- Do not run the product's gate (`npm test` with no file argument); it is the orchestrator's. A
  focused check you run carries its command and exit code. Before writing any script read
  `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md`.

## Answers of step 4, each a thing this review aims at

- Trust boundary: **yes**. `src/browser/sim/saved-game.ts` reads `Character.generation` and
  `Character.resurrectionReadyAtMs`. Check crafted input there: a forged or malformed value in a
  document from outside refuses it whole.
- Irreversible operation: **yes** for the task; Slice 1 raised the version and this slice keeps it
  at 2. Check that nothing is performed on a server.

## Your selection

The executor's handoff is your selection: read
`.runs/task-cycles/rozliczenie-przejsc/reports/11-slice2-handoff.md` whole. It holds the slice's
section of the plan word for word, the passages of the task and spec, and the current ranges of the
foundation entries.

## Reports of the agents

Executor: `.runs/task-cycles/rozliczenie-przejsc/reports/11-slice2-report.md`.

The mechanical check found a clean worktree, a non-empty range, the changed files matching the
slice's *Change*, and each check with its command and exit code.
