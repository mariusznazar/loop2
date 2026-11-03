# Handoff — planner of task `przyciski-i-zakladki`

## Delegation and stage

- The person who requested this cycle (Mariusz, the product's owner) delegated the cycle's intermediate choices to its orchestrator; nothing in this handoff is that person's approval.
- Stage: planning of a ready task's change into slices. Method: `.the-way/task-cycle/plan/SKILL.md` of the pinned the-way (commit `f45ca40`), read whole; a file it names, one beside it included, only when the step or variant that names it comes.
- Boundary: write `plan.md` and its size report `plan-size.md` in `/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/`, and your full report at `/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/reports/planner.md`. Write no code, change no tracked file, start no slice, make no commit. Questions go to the orchestrator in your report with status `questions`, never to the human. Do not run the product's gate (`npm test` without arguments); its run is the orchestrator's.
- Return: your status (`done`, `done with concerns`, `questions`, `returned` or `reserved`), a one-line check result naming what failed or did not run, and the report's path. In the report keep **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`) and each reach beyond this handoff.

## Worktree and commits

- Work from `/home/user/loop2`, the product's root; the task branch is `claude/lucid-ptolemy-jl068t`, base `799d1ffc899fe631ddc03381302ede7d94f49df5` (= `origin/main`). No spec was written; the pin did not move, so no check of a pin move is carried.
- Frozen task: `/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/task.md` (from the-brain commit `8b604d6`). Read it whole. The project plan it belongs to is copied at `/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/reports/project-plan-source.md` (task 27; read its change log rows of 2026-11-02 about task 27 and D-44 if you need the plan's view).
- The research named in the task's *Context* (`.runs/styleguide/browser-view/button-hierarchy.md`, `tabs-semantics-and-look.md`, `neutral-status-message.md`) lies on the owner's computer, not in this container; the task says the answers in *Questions to settle* describe the look, so the plan works from them.

## Answers of step 4

- Trust boundary: no — no file of `assets/icons/**`, `assets/fonts/**`, `assets/sprites/**` or `deploy/**` is touched.
- Irreversible operation: no.
- Open design choice: none found by the orchestrator — the look and behaviour are settled by the task's answers to pytania 1–6b and its *Settlements to record*; class names, how the tab look attaches to the button selected in its group, the shape of the new control's two forms and the kitchen-sink samples are choices of how to make what the task settles. If you find a choice the task, foundation and code truly leave open, return it as `returned` with no plan.
- Route: planned slices, chosen because the change spans browser-view code in two forms with the comparison test, the kitchen-sink page and screenshots; guidelines of agent-workflow through two guideline skills; and the foundation (eight new decisions, four changed).

## What the work requires that the plan must place

- Every item of *To do* 1–12, every row 1–8 of *Settlements to record*, and the changes of D-44, D-222, D-40 and D-265 of *To do* 11. The task carries no projected entry to write (it realizes none; pytanie 6).
- *To do* 8 goes through the project skill `the-way-maintain-styleguide` (`.claude/skills/the-way-maintain-styleguide/SKILL.md`, which points to `.the-way/product-guidelines/styleguide/SKILL.md`); *To do* 10 through `the-way-maintain-coding-guidelines` (`.the-way/product-guidelines/coding/SKILL.md`) with the deliberate departure of pytanie 5a (no full audit). Foundation entries go through `the-way-record-decision` (`.the-way/elements/decisions/skill/SKILL.md`), as `.the-way/task-cycle/skill/foundation_step.md` gives for the plan's *Foundation entries*.
- *To do* 12: screenshots of every state of the card on the picture of the game, taken by the product's settled route to run and operate the game, `.claude/skills/loop2-play/SKILL.md`; the orchestrator's choice (record Q3) is that they are saved as PNG files under `/home/user/loop2/.runs/task-cycles/przyciski-i-zakladki/screenshots/` (ignored by git), which the record commit at the request carries. Plan which slice takes them and checks them by inspection (an own-work check of the user interface).
- A new value of appearance needs its token and source (`src/browser/AGENTS.md`); the task says no new colour and keeps `--bar-width` at 2 px with a widened `Source:` (*To do* 7), and `15%` of the window's height with `vh` is not a value written in place of a token (task, *Decisions in play*, D-43/D-48).
- Classes of model: `cheaper` (Sonnet) by default; `same` and `strongest` are one class here (Opus). Give each slice its *Model* with the reason where it is not `cheaper`.

## Environment of this container (for checks the plan names)

- Node v24.22.1 and npm 11 first on PATH (`/root/.local/bin`), Python 3.14.6 as `python`, `.runs/quality-venv` installed, Docker running with a local `node:24-slim`. One test file runs with `npm test -- <file>` (README). The kitchen-sink page builds with `npm run kitchen-sink`; the game runs locally with `npm run local` as `.claude/skills/loop2-play/SKILL.md` gives.

## What to read

Foundation entries, each whole (heading to next `###` in `foundations/decisions.md`, next `##` elsewhere):

- Decisions the task names: D-39, D-40, D-42, D-43, D-44, D-45, D-47, D-48, D-96, D-222, D-259, D-260, D-265, D-269, D-272.
- Decisions of browser-view the work touches beyond those: D-36 (exemplar for browser modules), D-38 (styleguide discipline), D-41 (roles of focus), D-87 and D-88 (pixel comparisons; real browser events and focus), D-152 (sign-in and password reset), D-254 (agent operates the game), D-261, D-262 (the login card's sentence and screen), D-264 (what a test of a React screen runs on), D-267 (rules of hooks), D-28 (coding-guideline discipline), D-73 and D-77 (testing discipline; test selection).
- Invariants: `browser-view-framework`, `browser-view-token-values`, `browser-view-focus-outline`, `design-token-contrast`, `design-token-sources`, `application-build-kitchen-sink`, `eslint-source-rules`, `prettier-source-format`, `node-test-selection`, `document-test-memory-limit` (`foundations/invariants.md`).
- Part map: the entries `browser-view`, `agent-workflow` and `product-foundation` of `foundations/part_map.md`.

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, and `src/browser/AGENTS.md`.

Code to read as the plan needs it: `src/browser/view/account-card.tsx`, `src/browser/styles.css`, `src/browser/tokens.css`, `src/browser/view/controls/` (all files), `src/browser/kitchen-sink/` (all files), `tests/view/react-controls.test.mjs`, `tests/view/account-screen.test.mjs`, and the invariant tests under `tests/invariants/` that read styles and tokens.
