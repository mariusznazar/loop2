# Handoff — reviewer of Slice 1, task `petla-zarobkowa`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the reviewer of one slice, a fresh agent
that did not make it. You change no file except your report. Your questions go to the orchestrator,
never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\petla-zarobkowa`, branch
  `task/petla-zarobkowa`.
- Method: `.the-way/task-cycle/review/SKILL.md` in the worktree (the project skill
  `the-way-review-change`). Read it whole; read a file it names only when the step or variant that
  names it comes.
- Variant: a planned slice — Slice 1.
- Range: `4ed8fcd..bc8eaec`. It holds the plan's *Foundation entries*, commit `96d7b45`, as part of
  the range, and Slice 1, commit `bc8eaec`.
- Report path, first line `PASS <sha>` or `FAIL <sha>`:
  `.runs/task-cycles/petla-zarobkowa/reports/06-slice1-review-report.md`
- Do not run the product's gate (`npm test` with no file argument); it is the orchestrator's. A
  focused check you run carries its command and exit code. `dist` must be rebuilt before a direct
  `node --test` run; `npm test -- <file>` builds. Before writing any script read
  `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md`.

## Answers of step 4, each a thing this review aims at

- Trust boundary: **yes**. `src/browser/sim/saved-game.ts` reads the new keys `loops`,
  `stoppedLoops`, `awayReport` and `saveTimeMs`. Check crafted input there: a forged or malformed
  value in a document from outside refuses it whole, and no document the game itself writes is
  refused.
- Irreversible operation: **yes**. Slice 1 raises `SAVED_GAME_VERSION` to 3, which makes the game
  discard every older saved game state in full at load (D-206) once the merge deploys `main`
  (D-11). Check that the change only prepares that: nothing is performed on the server.

## Your selection

The executor's handoff is your selection: read
`.runs/task-cycles/petla-zarobkowa/reports/05-slice1-handoff.md` whole. It holds the slice's section
of the plan word for word, the passages of the task and spec, and the current ranges of the
foundation entries.

## Reports of the agents

- Agent of the entries: `.runs/task-cycles/petla-zarobkowa/reports/04-foundation-report.md`, with its
  meaning sentences, its table of rows and its concerns 1–6. Because slice 1's range holds the
  entries, your review covers all of them, those whose code comes in later slices included: each
  against `.runs/task-cycles/petla-zarobkowa/spec.md:452-520` (*Foundation entries* and *Left to the
  maker*), the frozen task's rows of *Settlements to record*, and the projected wording in
  `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md`, headings at lines
  818, 895, 1000, 1373, 1452, 1503, 2143, 2287, 2298. The frozen task:
  `.runs/task-cycles/petla-zarobkowa/task.md`, read as far as these need. The plan's *Foundation
  entries* stands at `.runs/task-cycles/petla-zarobkowa/plan.md:7-51`.
- Executor: `.runs/task-cycles/petla-zarobkowa/reports/05-slice1-report.md`, with its concerns 1–3
  and its adaptations.

The mechanical check found a clean worktree, a non-empty range, the changed files matching the
slice's *Change* and the plan's *Foundation entries*, and each check with its command and exit code.
