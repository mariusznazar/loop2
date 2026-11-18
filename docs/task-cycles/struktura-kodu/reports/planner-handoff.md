# Handoff — planner

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; no answer of the orchestrator is that person's approval. You write a plan only; you write no code, no test and no foundation entry, and you never ask the human. Questions go back to the orchestrator in your report.

## Where

- Worktree (your working directory): `<worktree root>`, branch `task/struktura-kodu`, base `a3d913dac87160f56b194ce863c60145a551765a` (`origin/main`).
- Process pin: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Method of the stage: `.the-way/task-cycle/plan/SKILL.md` (`plan-task`) — read it whole; read the files it names only when the step that names them comes. You have no skill tool: a skill named by its name alone is the `SKILL.md` whose frontmatter `name:` it is, read as a file under `.the-way`.
- Your stage and its boundary: write `plan.md` and `plan-size.md` in `.runs/task-cycles/struktura-kodu/` and return. The record directory is `.runs/task-cycles/struktura-kodu/`; the full report goes to `.runs/task-cycles/struktura-kodu/reports/planner-report.md`.
- Your directory for working copies: `.runs/planner/`.

## Working copies (word for word from the cycle)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed.

## The task

Frozen task, read whole: `.runs/task-cycles/struktura-kodu/task-frozen.md` (independent task, `Status: ready for cycle`, no human actions, no questions carried).

Answers of the cycle's step 4:

- Trust boundary: no (no file of the change is a trust-boundary file of the part map). Irreversible operation: no. So no slice is marked with a risk.
- Open design choice: none. Reserved choice: none. Route: planned slices (the orchestrator judged the change too wide for one author).
- The three rows of *Settlements to record* of the task are the entries the cycle writes: row 1 a decision (the size rule), row 2 an invariant (marked violated, its test an expected failure, WAY-51), row 3 a decision (knip stays out of the gate). Rows 1 and 3 go through `the-way-record-decision`, row 2 through `the-way-record-invariant`; the part-map change of To do 6 through `the-way-update-part-map`. Their methods are `.claude/skills/the-way-record-decision/SKILL.md`, `.claude/skills/the-way-record-invariant/SKILL.md` and `.claude/skills/the-way-update-part-map/SKILL.md` of the worktree (the foundation step's file is `.the-way/task-cycle/skill/foundation_step.md`; the plan's *Foundation entries* are written by the agent that file names).

## Reconciliation of the task with the code at the base (autonomous choice Q1 of the orchestrator — binds the plan)

The orchestrator measured the base with ESLint's built-in `max-lines-per-function` (max 200) and `max-lines` (max 800), both with `skipBlankLines` and `skipComments`, script `.runs/orchestrator/size.mjs` (run `node .runs/orchestrator/size.mjs` from the worktree root; it prints ASCII). Over `src/**`, `scripts/**` and `tests/**` it found, for functions above 200 lines and files above 800:

- `src/browser/view/app.ts:248` `startApp` 449 (split by another task — stays above the limit);
- `src/browser/view/program-panel.tsx:397` `ProgramPanelView` 293, `src/browser/view/rule-list.tsx:215` `RuleListView` 511, `src/browser/view/rule-panel.tsx:197` `RulePanelView` 345, `src/browser/view/scene.tsx:557` `Scene` 366 — the four views this task splits;
- `src/server/account-routes.ts:407` `accountRoutes` 444 — exception of the decision;
- `tests/transport.test.mjs:537` an async arrow function, 238 — this task splits it (the task says line 517; the line moved);
- files: `src/browser/sim/saved-game.ts` 1154 — exception of the decision; scripts: none; tests' files are outside the file rule.

Not named by the task, found above the limit at the base: `src/browser/view/programs-entry.ts:81` `createProgramsEntry` 245 (its method `build` at line 102, 225) and `src/browser/kitchen-sink/kitchen-sink.tsx` 890 lines. And `createGameView` (`src/browser/view/game-view.ts`) the task names is no longer above the limit: its split has been merged.

Choice Q1 (binding): the rule, the thresholds and the exceptions stay as the task settles them (`accountRoutes`, `saved-game.ts`, no others). The cycle writes no further exception and splits neither `startApp`, `createProgramsEntry` nor `kitchen-sink.tsx` (the task's *Out of scope* and "never widen the task"). The invariant is marked violated and its test an expected failure for the set above the limit at the time the change is made — today `startApp`, `createProgramsEntry` and `kitchen-sink.tsx` — and the marking names that set; the request will put the two new ones before the human. The task's wording that the invariant is violated "while `createGameView` and `startApp` stand above the limit" is therefore carried out with the set found, not with `createGameView`. Measure again at the head of the branch before the entries are written (another merge may have moved the set) and name in your plan how the slice that writes the invariant takes the set.

## What you read

Foundation, from the worktree. Parts the change touches by the part map's rules: browser-view (the four view files and `tests/view/**`), account-server (`tests/transport.test.mjs`), build-tools (`tests/quality/**`, `eslint.config.mjs`, `scripts/**`), agent-workflow (`guidelines/**`), product-foundation (`foundations/**`).

- The decision index of the orchestrator's selection, `.runs/orchestrator/index.md` (read it; the decisions it lists whole are those of the sections *Code rules, exemplars and static checks* and *Testing discipline* and of the touched parts). Open whole: D-29 (`foundations/decisions.md:446`), D-267, D-28, D-32, D-73, D-77, D-83, D-36 (heading `### D-NNN` to the next heading). Decisions of the section *Browser view: screens, navigation and their code* and the log's sections on the gate (D-405, D-406 order and stages of the gate; D-264 what a React screen test runs on) — open those whose bearing you find; name each reach.
- Invariants: search `foundations/invariants.md` for those whose *Part* names a touched part or `every`, in particular `eslint-source-rules` and the invariants of the quality checks; each whole if you plan to cite it.
- Part map: all of `foundations/part_map.md` (10 KB).
- Glossary: `foundations/glossary.md` (9 KB).
- Guidelines, each file whole: `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md` (read its order-of-work example and follow it or explain the departure), `src/browser/AGENTS.md`. For the four views the change keeps what the player sees unchanged; the test of those views is by the DOM (`tests/view/**`).
- Code and tests: the four view files and their tests (`tests/view/*.test.mjs` for each), `tests/transport.test.mjs` around line 537, `tests/quality/` (the existing quality tests: `test_quality_invariants.py`, `test_source_tool_scope.py`, `eslint-rule-sets.mjs`) and `eslint.config.mjs` — to cut slices and to name each slice's files; read to cut, not to design the code.
- The measurement script and the verdict of an agent that judged the four views: the verdict is described in the task's *Context* (the line "Ocena siedmiu funkcji…"): `RuleListView` — move dragging of rules to a separate hook; `Scene` — the state of the scene in one memory object and one pure step function; `ProgramPanelView` — the transition header with the name field as a separate component; `RulePanelView` — take out `changed` and the group-name field. Take it as a hypothesis the planner and the executors check in the code.

## What to plan

Every item of *To do* 1–6, every row of *Settlements to record* and the Q1 above. Slice by what an executor can hold: for example, one slice for the foundation entries and the rule's test and the guideline rule and the part-map entry (the plan's *Foundation entries* is the place of the entries themselves, written before any code), and the four view splits and the test-function split cut so that no slice touches the same file as another (they share no file today). A slice's *Checks* name focused checks (one test file by `npm test -- <file>` — accepts exactly one test file; the focused run of Python tests is by the same command) and never the full gate, which the orchestrator runs (the full gate is run by the orchestrator only, once the cycle reaches step 10; no agent runs `npm test` without an argument). Remember the product's rule that every new or changed test is seen failing before it is seen passing, and that the invariant's test is a test seen failing (the test fails now on `startApp` and the other names above; that failure is the expected failure the invariant records). Mark no slice with a risk (both answers are no). Where you set a class other than `cheaper` give its reason; the classes available are `cheaper` (haiku), `same` (sonnet) and `strongest` (opus; `fable` is disabled).

## Report

Write the report to `.runs/task-cycles/struktura-kodu/reports/planner-report.md` as the method gives it, and return its status, a one-line result, the report's path. The report holds **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), what you find missing or uncertain in the guidelines, each reach beyond this handoff, and the working copies' line.
