# Handoff — spec reviewer, task `rozliczenie-przejsc`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **reviewer** of the spec, a fresh agent
that did not write it. Your questions go to the orchestrator, never to the human. You change no
file except your report and return before any plan, slice or code.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\rozliczenie-przejsc`, branch
  `task/rozliczenie-przejsc`, head = base `95de83b` (`main`). Process pin `.the-way` at `a8dfe8a`,
  not moved by this task.
- Method: `.the-way/task-cycle/spec/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes.
- Variant: you review the spec (reviewer).
- Spec: `.runs/task-cycles/rozliczenie-przejsc/spec.md` — read it whole.
- Frozen task: `.runs/task-cycles/rozliczenie-przejsc/task.md` — read it whole, 254 lines; the Read
  tool shows it in two pages.
- Designer's report: `.runs/task-cycles/rozliczenie-przejsc/reports/01-spec-design-report.md`, with
  the ways it weighed, its assumptions and its concerns.
- Report path: `.runs/task-cycles/rozliczenie-przejsc/reports/02-spec-review-report.md`
- Do not run the product's gate (`npm test`); it is the orchestrator's.
- Reading loop's code and tests at `C:\Storage\repos\loop`, commit `cdc7c0d`, is allowed where the
  task cites them. Nothing is written outside the worktree.

## Answers of step 4

- Trust boundary: **yes**. The part map names `src/browser/sim/saved-game.ts` as the trust boundary
  of `simulation`. The change adds new fields to the game state, so that file reads them out of a
  document from outside: a forged or malformed value must be refused whole.
- Irreversible operation: **yes**. Raising `SAVED_GAME_VERSION` (To do 21) makes the game discard
  every older saved game state in full at load (D-206) once the merge deploys `main` (D-11). The
  human accepted that cost in the task (Q4, *Context*). The cycle only prepares the raised number
  and performs nothing on the server; the human performs it by merging.

## What to read

Beside the spec and the task:

- Foundation (`foundations/decisions.md`, each decision whole, by its heading): D-04, D-07, D-18,
  D-39, D-40, D-55, D-56, D-61, D-62, D-71, D-96, D-119, D-122, D-132, D-173, D-179, D-183, D-185,
  D-186, D-187, D-188, D-189, D-190, D-191, D-192, D-194, D-199, D-200, D-201, D-206, D-207, D-208,
  D-211, D-212, D-213.
- `foundations/invariants.md`, each whole: `simulation-isolation`, `simulation-inputs`,
  `map-run-repeatability`, `restart-seed`, `minute-span-split`, `character-team`, `trip-transfer`,
  `trip-run-end`, `save-version`.
- `foundations/glossary.md`: `manual map run`, `completion`, `solved map`, `map run restart`,
  `practice`. `foundations/part_map.md`: the entries `simulation`, `browser-view`.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`,
  `guidelines/coding-saved-game.md`, `guidelines/coding-browser-module.md`,
  `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`.
- Code as the spec's decisions cite it, read where you check a claim: `src/browser/sim/game.ts`,
  `saved-game.ts`, `src/browser/view/clock.ts`, `game-saver.ts`, `game-view.ts`, `trip-lines.ts`,
  `headquarters.ts`, `tests/invariants/test_minute_span_split.py`.
