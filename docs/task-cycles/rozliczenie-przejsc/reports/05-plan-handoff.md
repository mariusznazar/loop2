# Handoff — planner, task `rozliczenie-przejsc`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **planner**, a fresh agent. Your
questions go to the orchestrator, never to the human; you return before any slice is made and you
write no code.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\rozliczenie-przejsc`, branch
  `task/rozliczenie-przejsc`, head = base `95de83b` (`main`). Process pin `.the-way` at `a8dfe8a`,
  not moved by this task, so no check of a moved pin is carried.
- Method: `.the-way/task-cycle/plan/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes.
- Frozen task: `.runs/task-cycles/rozliczenie-przejsc/task.md` — read it whole, 254 lines; the Read
  tool shows it in two pages.
- Reviewed spec: `.runs/task-cycles/rozliczenie-przejsc/spec.md` — read it whole. It went through a
  review, one revision and a re-review; its decision 11 records the orchestrator's settlement of the
  finding left after that.
- Plan path: `.runs/task-cycles/rozliczenie-przejsc/plan.md`
- Size report path: `.runs/task-cycles/rozliczenie-przejsc/plan-size.md`
- Report path: `.runs/task-cycles/rozliczenie-przejsc/reports/05-plan-report.md`
- Do not commit: the plan stays in the ignored `.runs/`. Do not run the product's gate (`npm test`);
  it is the orchestrator's, and no slice's *Checks* name it.

## Answers of step 4

- Trust boundary: **yes**. The part map names `src/browser/sim/saved-game.ts` as the trust boundary
  of `simulation`. The change adds new fields to the game state, so that file reads them out of a
  document from outside: a forged or malformed value must be refused whole. Mark the slice that
  changes that file.
- Irreversible operation: **yes**. Raising `SAVED_GAME_VERSION` (To do 21) makes the game discard
  every older saved game state in full at load (D-206) once the merge deploys `main` (D-11). The
  human accepted that cost in the task (Q4, *Context*). The cycle only prepares the raised number
  and performs nothing on the server; the human performs it by merging. Mark the slice that raises
  it.

## What the cycle already knows

- The spec's *Foundation entries* lists the entries. `foundation_check.py` requires that each
  comment `invariant: <identifier>` names an entry, so the entries stand in the repository before
  the first marker that names them. List them under the plan's *Foundation entries*, as your method
  gives.
- The spec's report names the natural cuts: payment and equipment from nowhere; settlement and
  clock; headquarters lines; foundation. The shape of the game state and the raised version go
  together, so a state of the branch between slices must not save a document of a shape the load
  refuses.
- The reviewer's notes for the maker: `tests/sim/trip.test.mjs:361`, marker `trip-run-end`, also
  changes under To do 3 and 5, as its restart follows a completion, and its new expectation needs
  the requirement named, as `guidelines/testing.md`, *Changing an existing test*, asks.
- `guidelines/coding-content-data.md` holds no rule for validating a number of `BALANCE`; a data test
  pins it. `stryker.config.json` lists its test files, so the new `tests/sim/death.test.mjs` joins it.
- A view change needs the state check and screenshot inspection `guidelines/testing.md` and the
  styleguide give; the kitchen-sink page and the changed states of the screens are in your reach.

## What to read

- Foundation (`foundations/decisions.md`, each decision whole, by its heading): D-03, D-04, D-18,
  D-39, D-40, D-55, D-61, D-62, D-71, D-96, D-119, D-122, D-132, D-173, D-179, D-185, D-186, D-187,
  D-188, D-189, D-190, D-191, D-194, D-199, D-200, D-201, D-206, D-207, D-212, D-213.
- `foundations/invariants.md`, each whole: `simulation-isolation`, `simulation-inputs`,
  `map-run-repeatability`, `restart-seed`, `minute-span-split`, `character-team`, `trip-transfer`,
  `trip-run-end`, `save-version`.
- `foundations/part_map.md`: the entries `simulation`, `browser-view`, `product-foundation`.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`,
  `guidelines/coding-saved-game.md`, `guidelines/coding-content-data.md`,
  `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`,
  `guidelines/testing.md`.
- Code and tests, as far as the cut needs: `src/browser/sim/game.ts`, `trip.ts`, `types.ts`,
  `saved-game.ts`, `data/balance.ts`; `src/browser/view/clock.ts`, `app.ts`, `game-view.ts`,
  `trip-lines.ts`, `headquarters.ts`, `src/browser/styles.css`; `tests/sim/`, `tests/view/`.
