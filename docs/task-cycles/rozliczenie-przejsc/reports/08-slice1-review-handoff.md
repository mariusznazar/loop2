# Handoff — reviewer of Slice 1, task `rozliczenie-przejsc`

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
- Variant: a planned slice — Slice 1.
- Range: `95de83b..16f8bee`. It holds the plan's *Foundation entries*, commit `0363149`, as part of
  the range, and Slice 1, commit `16f8bee`.
- Report path, first line `PASS <sha>` or `FAIL <sha>`:
  `.runs/task-cycles/rozliczenie-przejsc/reports/08-slice1-review-report.md`
- Do not run the product's gate (`npm test` with no file argument); it is the orchestrator's. A
  focused check you run carries its command and exit code. Before writing any script read
  `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md`.

## Answers of step 4, each a thing this review aims at

- Trust boundary: **yes**. `src/browser/sim/saved-game.ts` reads the new key `solvedMapRun` and
  narrows `deposited`. Check crafted input there: a forged or malformed value in a document from
  outside refuses it whole.
- Irreversible operation: **yes**. Slice 1 raises `SAVED_GAME_VERSION` to 2, which makes the game
  discard every older saved game state in full at load (D-206) once the merge deploys `main`
  (D-11). Check that the change only prepares that: nothing is performed on the server.

## Your selection

The executor's handoff is your selection: read
`.runs/task-cycles/rozliczenie-przejsc/reports/07-slice1-handoff.md` whole. It holds the slice's
section of the plan word for word, the passages of the task and spec, and the current ranges of the
foundation entries.

## Reports of the agents

- Agent of the entries: `.runs/task-cycles/rozliczenie-przejsc/reports/06-foundation-report.md`,
  with its meaning sentences and its concerns C1–C4. Because slice 1's range holds the entries, your
  review covers all of them, those whose code comes in later slices included: each against the
  spec's `spec.md:284`–`339` (*Foundation entries* and decision 11 just above it), the frozen task's
  rows of *Settlements to record*, and the projected wording. The frozen task:
  `.runs/task-cycles/rozliczenie-przejsc/task.md`, read as far as these need.
- Executor: `.runs/task-cycles/rozliczenie-przejsc/reports/07-slice1-report.md`. It says it worked
  from the handoff's copied passages and did not open the foundation ranges itself.

The mechanical check found a clean worktree, a non-empty range, the changed files matching the
slice's *Change* and the plan's *Foundation entries*, and each check with its command and exit code.
