# Handoff — planner, task `petla-zarobkowa`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **planner**, a fresh agent. Your
questions go to the orchestrator, never to the human; you return before any slice is made and you
write no code.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\petla-zarobkowa`, branch
  `task/petla-zarobkowa`, head = base `4ed8fcd` (`main`). Process pin `.the-way` at `a8dfe8a`, not
  moved by this task, so no check of a moved pin is carried.
- Method: `.the-way/task-cycle/plan/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes.
- Frozen task: `.runs/task-cycles/petla-zarobkowa/task.md` — read it whole, 384 lines; the Read tool
  shows it in two pages. Its code line numbers are at `95de83b`; the spec's *Constraints* correct
  them against `4ed8fcd`.
- Reviewed spec: `.runs/task-cycles/petla-zarobkowa/spec.md` — read it whole, 520 lines. Its review
  passed with no findings: `.runs/task-cycles/petla-zarobkowa/reports/02-spec-review-report.md`.
- Plan path: `.runs/task-cycles/petla-zarobkowa/plan.md`
- Size report path: `.runs/task-cycles/petla-zarobkowa/plan-size.md`
- Report path: `.runs/task-cycles/petla-zarobkowa/reports/03-plan-report.md`
- Do not commit: the plan stays in the ignored `.runs/`. Do not run the product's gate (`npm test`);
  it is the orchestrator's, and no slice's *Checks* name it.

## Answers of step 4

- Trust boundary: **yes**. The part map names `src/browser/sim/saved-game.ts` as the trust boundary
  of `simulation`. The change adds new fields to the game state, so that file reads them out of a
  document from outside: a forged or malformed value must be refused whole. Mark the slice that
  changes that file.
- Irreversible operation: **yes**. Raising `SAVED_GAME_VERSION` (To do 10) makes the game discard
  every older saved game state in full at load (D-206) once the merge deploys `main` (D-11). The
  human accepted that cost in the task. The cycle only prepares the raised number and performs
  nothing on the server; the human performs it by merging. Mark the slice that raises it.

## What the cycle already knows

- The spec's *Foundation entries* lists the entries. `foundation_check.py` requires that each
  comment `invariant: <identifier>` names an entry, so the entries stand in the repository before
  the first marker that names them. List them under the plan's *Foundation entries*, as your method
  gives.
- The spec's section 17 names the natural cuts and says one agent could not hold the first two
  together comfortably. The first cut is the largest; judge whether it is one slice or more by the
  method's measure of a slice. A state of the branch between slices must not leave the repository's
  tests red in a way a later slice repairs without the slice saying so.
- The spec reviewer's notes, none of them a finding of the spec:
  1. `saveTimeMs` null being refused turns `loadSavedGame(savedGame(state))` red at
     `tests/sim/saved-game.test.mjs:1671`, `:1687`, `tests/sim/death.test.mjs:215`, `:322`,
     `tests/view/game-saver.test.mjs:405` and `tests/view/trip.test.mjs:241`. Two of these lie under
     `tests/view`, while section 17's first cut lists the simulation's tests; and until the second
     cut the saver sends documents the load refuses. The first slice has to carry those test
     changes, each with its cause, as `guidelines/testing.md` *Changing an existing test* asks.
  2. D-207's *Verification*, "a tab that has just loaded a saved game state with its map run paused
     sending nothing until the player acts in it", stays true only with no loop passing: To do 17
     makes such a tab send at the hidden page and at a run's end. Section 9 says "nothing passing",
     but the spec's D-207 row does not name the clause. The change of D-207 narrows it.
  3. A stopped line's `practice` is "the gain in the loop's `practice`" while the loop is gone.
     `chest.test.ts:550` gives `{}`, and section 16 takes it as a case. Whatever is kept must stay a
     positive count: the load's `practice` refuses anything else, and with it the whole save.
- `stryker.config.json` lists its test files, so a new `tests/sim` file joins it.
- A view change needs the state check and screenshot inspection `guidelines/testing.md` and the
  styleguide give; the kitchen-sink page and the changed states of the screens are in your reach.

## What to read

- Foundation (`foundations/decisions.md`, each decision whole, from its heading to the next): D-04,
  D-18, D-21, D-22, D-39, D-44, D-54, D-55, D-56, D-62, D-71, D-93, D-96, D-118, D-122, D-123, D-132,
  D-164, D-168, D-170, D-173, D-179, D-183, D-187, D-188, D-189, D-190, D-191, D-194, D-199, D-200,
  D-206, D-207, D-208, D-209, D-211, D-212, D-213, D-214, D-216, D-217, D-219, D-221.
- `foundations/invariants.md`, each whole: `map-run-repeatability`, `simulation-randomness`,
  `minute-span-split`, `player-map-run-pace`, `simulation-isolation`, `simulation-inputs`,
  `restart-seed`, `save-version`, `trip-transfer`, `trip-run-end`, `saved-program-edit`,
  `character-team`, `solved-map-manual-run`, `resurrection-renewal`, `death-settled-once`.
- `foundations/part_map.md`: the entries `simulation`, `browser-view`, `product-foundation`.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`,
  `guidelines/coding-saved-game.md`, `guidelines/coding-content-data.md`,
  `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`,
  `guidelines/testing.md`.
- Code and tests, as far as the cuts need: `src/browser/sim/game.ts`, `run.ts`, `trip.ts`, `types.ts`,
  `random.ts`, `programs.ts`, `saved-game.ts`, `data/balance.ts`; `src/browser/view/clock.ts`,
  `app.ts`, `game-saver.ts`, `game-view.ts`, `headquarters.ts`, `trip-lines.ts`,
  `character-skills.ts`, `src/browser/styles.css`; `tests/sim/`, `tests/view/`.
