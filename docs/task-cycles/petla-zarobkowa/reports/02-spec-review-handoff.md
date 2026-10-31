# Handoff — spec reviewer, task `petla-zarobkowa`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **reviewer** of the spec, a fresh agent
that did not write it. Your questions go to the orchestrator, never to the human. You change no
file except your report and return before any plan, slice or code.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\petla-zarobkowa`, branch
  `task/petla-zarobkowa`, head = base `4ed8fcd` (`main`). Process pin `.the-way` at `a8dfe8a`, not
  moved by this task.
- Method: `.the-way/task-cycle/spec/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes.
- Variant: you review the spec (reviewer).
- Spec: `.runs/task-cycles/petla-zarobkowa/spec.md` — read it whole, 423 lines.
- Frozen task: `.runs/task-cycles/petla-zarobkowa/task.md` — read it whole, 385 lines; the Read tool
  shows it in two pages. Its code line numbers are at `95de83b`; `main` moved to `4ed8fcd` when
  task 14 merged.
- Designer's report: `.runs/task-cycles/petla-zarobkowa/reports/01-spec-design-report.md`, with the
  ways it weighed, its readings and its concerns.
- Report path: `.runs/task-cycles/petla-zarobkowa/reports/02-spec-review-report.md`
- Do not run the product's gate (`npm test`); it is the orchestrator's.
- Reading loop's data files and tests at `C:\Storage\repos\loop`, commit `cdc7c0d`, is allowed where
  the task cites them; not its engine or interface. Nothing is written outside the worktree.

## Answers of step 4

- Trust boundary: **yes**. The part map names `src/browser/sim/saved-game.ts` as the trust boundary
  of `simulation`. The change adds new fields to the game state, so that file reads them out of a
  document from outside: a forged or malformed value must be refused whole.
- Irreversible operation: **yes**. Raising `SAVED_GAME_VERSION` (To do 10) makes the game discard
  every older saved game state in full at load (D-206) once the merge deploys `main` (D-11). The
  human accepted that cost in the task. The cycle only prepares the raised number and performs
  nothing on the server; the human performs it by merging.

## What to read

Beside the spec and the task:

- Foundation (`foundations/decisions.md`, each decision whole, from its heading to the next): D-04,
  D-07, D-18, D-21, D-22, D-39, D-44, D-50, D-53, D-54, D-55, D-56, D-61, D-62, D-71, D-93, D-96,
  D-104, D-118, D-119, D-122, D-123, D-132, D-164, D-168, D-170, D-173, D-179, D-183, D-187, D-188,
  D-189, D-190, D-191, D-193, D-194, D-199, D-200, D-201, D-204, D-206, D-207, D-208, D-209, D-211,
  D-212, D-213, D-214, D-215, D-216, D-217, D-218, D-219, D-220, D-221.
- `foundations/invariants.md`, each whole: `map-run-repeatability`, `simulation-randomness`,
  `minute-span-split`, `player-map-run-pace`, `simulation-isolation`, `simulation-inputs`,
  `restart-seed`, `save-version`, `trip-transfer`, `trip-run-end`, `trip-plan-progress`,
  `saved-program-edit`, `character-team`, `solved-map-manual-run`, `resurrection-renewal`,
  `death-settled-once`, `streak-program-change`.
- `foundations/glossary.md`: `manual map run`, `completion`, `solved map`, `map run restart`,
  `practice`, `resurrection`. `foundations/part_map.md`: the entries `simulation`, `browser-view`.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`,
  `guidelines/coding-saved-game.md`, `guidelines/coding-content-data.md`,
  `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`,
  `guidelines/testing.md`.
- Code as the spec's decisions cite it, read where you check a claim: `src/browser/sim/game.ts`,
  `run.ts`, `trip.ts`, `types.ts`, `random.ts`, `programs.ts`, `saved-game.ts`;
  `src/browser/view/clock.ts`, `app.ts`, `game-saver.ts`, `game-view.ts`, `headquarters.ts`,
  `trip-lines.ts`, and the tests in `tests/sim/` and `tests/view/` the spec names.
- Loop's tests the spec or the task cite, under the human's answer P6 that they bind as loop's
  numbers do, a departure from them being a named decision.
