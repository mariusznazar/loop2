# Handoff — spec designer, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (Mariusz, the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You
are the **designer of the spec** (step 6 of `.the-way/task-cycle/skill/SKILL.md`). Use the project
skill **`the-way-write-spec`** (read its method and everything it names, whole) — never a personal
skill of another name.

Boundary: write `spec.md` and your report; write no plan, no code, no test and no foundation entry.
Send questions to the orchestrator (return `questions` with them in your report); never ask the
human. Return `done` with the spec, or `questions`.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie` (branch `task/ognisko-i-jedzenie`, base
  a945cf1d4c62e8cdac222a7de47277c08a77b2c5). Read the code there; change nothing tracked by git.
- Pinned the-way: `.the-way` at 86b78ad780aa8e97a9619fb7277cb64da50fb74a.
- Write the spec to `.runs/task-cycles/ognisko-i-jedzenie/spec.md`.
- Write your full report to `.runs/task-cycles/ognisko-i-jedzenie/reports/01-spec-designer-report.md`.
- Frozen task (read it whole): `.runs/task-cycles/ognisko-i-jedzenie/task.md` — a copy of
  `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\ognisko_i_jedzenie_loop2.md`,
  accepted 2026-10-24. Its relation: plan item 4 of `plan_mvp_loop2.md`, from definition
  `definicja_mvp_loop2.md` (approved 2026-10-13, fingerprint 9e480247), both in
  `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\`. Read those sources only where the task
  cites them and you need the cited passage.

## Answers of step 4

- Trust boundary: **yes** — `assets/icons/**` (part `browser-view`): the task adds a campfire icon
  from game-icons.net, an untrusted source. The spec does not design the icon; it may name what the
  change must keep there (D-27, invariants `icon-file-content`, `icon-credits`,
  `loop2-container-icons`).
- Irreversible operation: **no**.

## The open design choice

Every row of the task's *Settlements to record* (1–15) and both projected entries it writes settle
their entries; do not redesign them. The task carries three questions to the cycle (*Questions
carried to cycle*); the spec settles them:

1. **The order of effects within one game minute** — cooling and warming (campfire, burning
   stick), satiety falling, health lost or regained, a campfire and a stick burning down, renewal
   of tile stock, an action ending and its effect taking hold, death — such that death and every
   threshold crossing (chilled below 35.0 °C, starving below 30) fall in the same game minute
   however game time is split into calls of the simulation (D-04: the simulation takes a game
   state and a span of game minutes). This decides game outcomes later tasks rest on (task 7
   counts minutes without loss to cold or hunger; task 8 adds wounds and a cause of death; task 9
   turns "Zapal" into a spell). Weigh whether it is a choice that binds after the merge and so a
   foundation entry the cycle writes (WAY-36), and if so give its wording, its kind and what it
   rests on; honour the human's rule for candidates built from MVP choices (task, *Context*, the
   line beginning "Brzmienie kandydatów zbudowanych z wyborów na MVP").
2. **Where carrying capacity, the first trait, stands in the code and in the game's data** while
   task 11 `siedziba-i-druzyna` (running in parallel, document
   `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\siedziba_i_druzyna_loop2.md`)
   creates characters outside the map run — and how whichever cycle merges second joins the
   backpack's cap to the character in the team (task, *Context* and Q15). Today a character exists
   only in the map run (`MapRun.character` in `src/browser/sim/types.ts`). Read task 11's document
   only for what it says about a character's data.
3. **The range and step of the number each new condition takes** — temperature with tenths (loop
   data: default 36.5, step 0.1), satiety in %, pieces of an item in the backpack, minutes left of
   the nearest campfire — and how the program editor, which today takes the range of its number
   from the one condition "Tu leży mniej niż" (`src/browser/view/program-editor.ts:34`), and
   `checkCondition` (`src/browser/sim/game.ts:54`, `:67`) take them.

Where the task and the foundation leave you a way to make what they settle, that is no open choice;
name it only where it shapes one of the three.

## Read

Foundation of `foundations/` in the worktree, each entry whole (heading to next heading):

- Decisions: D-04, D-18, D-19, D-20, D-21, D-22, D-23, D-24, D-25, D-26, D-27, D-39, D-41, D-44
  (`foundations/decisions.md`).
- Invariants (`foundations/invariants.md`): `program-rule-pick`, `program-closed-lists`,
  `program-world-reference`, `walk-target`, `walk-feasibility`, `action-in-progress`,
  `player-map-run-pace`, `simulation-randomness`, `simulation-isolation`, `simulation-inputs`,
  `map-run-repeatability`, `map-run-layout`, `restart-seed`, `content-identifiers`,
  `icon-file-content`, `icon-credits`, `loop2-container-icons`, `terrain-drawing-numbers`, and the
  entries they link to as far as your design needs them.
- Glossary (`foundations/glossary.md`): `game minute`, `free game minute`, `map run`,
  `map run restart`, `program`, `program rule`; the-way's glossary at `.the-way` where the method
  needs it.
- Part map: `foundations/part_map.md`, parts `simulation`, `browser-view`, `product-foundation`.

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`,
`guidelines/coding-content-data.md`, `guidelines/coding-browser-module.md`,
`guidelines/styleguide-browser-view.md`, and `src/browser/AGENTS.md`.

Code (task *Context*, at a945cf1): `src/browser/sim/types.ts`, `program.ts`, `run.ts`, `game.ts`,
`random.ts`, `data/*.ts`; `src/browser/view/program-editor.ts`, `status-row.ts`, `tile-list.ts`,
`terrain-picture.ts`, `footer.ts`, `credits.ts`; tests under `tests/sim/`, `tests/view/`,
`tests/invariants/`.

Predecessor game loop (`C:\Storage\repos\loop`): the definition lets tasks read **only** its data
files `src/sim/data/` and its tests; do not read its engine or interface code.
