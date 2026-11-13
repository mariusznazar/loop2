# Handoff — the one author, stage "make the change"

You make: **the whole change as the one author**, of a change without a plan.

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator, and the orchestrator to you for how the change is made. Nothing here is the human's approval. You never ask the human; questions go back to the orchestrator in your report (status `questions`).

## Where

- Worktree (work only here, never in another checkout): `the task's worktree root`, branch `task/raport-z-wyplata`, base `2b4d760c517a8b399b2d9b80f77531455e32d11c` (= `origin/main`). `npm ci` and `.runs/quality-venv` are already in place.
- Method of the stage: `.the-way/task-cycle/change/SKILL.md` in the worktree; read it whole, variant "the whole change as the one author", and each file it names only when its step comes. Read the product's `AGENTS.md` and `src/browser/AGENTS.md` (you change files of `src/browser/`).
- Frozen task: `.runs/task-cycles/raport-z-wyplata/task.md` (read whole). No spec and no plan exist: the route is one author without a plan, since the task leaves no open design choice. How the state remembers that practice was paid (the task's *Questions carried to cycle*) is yours to choose and to name in your report; the task describes both ways it knows and their effect on D-241.
- Report: write it to `.runs/task-cycles/raport-z-wyplata/reports/author-report.md` as the method gives, and return its status, commits, a one-line check result, and the report's path.

## Answers of step 4 (told to every agent of the cycle)

- Trust boundary: **yes** — `src/browser/sim/saved-game.ts` is the simulation part's trust boundary (a saved game state arrives from the server). The change removes `AwayReportLine.practice` and, depending on your way of remembering a payment, adds a field to the earning loop; the reader of the saved document must refuse a document with a missing, negative, non-integer, or oversized value in those fields, and never load a state that pays more than the loop gathered. Test that crafted input.
- Irreversible operation: **no**.
- Open design choice: none. Reserved choice: none.
- A change of the shape of the game state bumps `SAVED_GAME_VERSION` once (task, pytanie 4); if you do not change the shape, say why.

## What to read (selected by the orchestrator)

Foundation entries by identifier, each whole (to the next heading), in `foundations/`:

- Decisions: D-39, D-44, D-189, D-190, D-183, D-206, D-207, D-239, D-240, D-241, D-242, D-244, D-245, D-246, D-247, D-248, D-274, D-275, D-45, D-265, D-269, D-326, D-386, D-201, D-213. (D-189, D-245, D-246 exist now in their old wording; the task's *Decisions in play* carries the approved new wording that you write.) Also the decisions whose *Scope* names `simulation` or `browser-view` and that bear on what you find while working, by "Reading the foundation" in `.the-way/elements/common/way_of_working.md`.
- Invariants: `trip-run-end`, `catch-up-state`, `save-version`, `death-settled-once`, `loop-run-knowledge`, `browser-view-token-values`, `browser-view-focus-outline`.
- Glossary: practice, resurrection, earning loop, catch-up, completion, headquarters, save time, loop clock.
- Part map: `foundations/part_map.md`, parts `browser-view`, `simulation`, `product-foundation`, `agent-workflow` (the styleguide in `guidelines/`).
- Guideline files, each whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-saved-game.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`. Because the change touches a user interface, also read the styleguide's example of the order of work (`guidelines/styleguide-browser-view.md`, section "Examples", subsection "Plan of a user-interface change") as an example, not a rule (WAY-213), and `.the-way/task-cycle/change/ui_check.md` when your method names it for the screens you change.

## Boundary of your stage

You make the code, the tests and the foundation entries the task carries (the foundation step: read `.the-way/task-cycle/skill/foundation_step.md` whole, and the skill of each element when you write an entry of it: the project skills `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-update-part-map`, `the-way-record-environment-fact`), commit them on the task branch, and return before review. You do not run the product's full gate (`npm test`) — it is the orchestrator's — only focused checks of what you change, each with its command and exit code in your report. You do not write the return step (a later stage), the request, or the record, and you never start a next stage. The orchestrator's record `cycle.md` is not for you.

The task's *Decisions in play* says which entries you write whole (D-245, D-246, D-189 in the approved wording, fields *Verification* and *Origin* as the task says), which you correct (D-241's rationale sentence and, if your way of remembering a payment makes it untrue, its binding sentence; the *Verification* example of D-246) and which you extend (D-207 gets „Odbierz”, D-39, D-44, the styleguide's "States of shared controls" and "Main button, secondary action and tab", the kitchen-sink page). Commit by explicit paths (`git add <path>…`), never `git add -A`; commit messages in English in the style of the repository's log (`git log`); commit message with quotes or backticks through `git commit -F <file>`.

## Things the orchestrator found in the code (hypotheses to verify, not facts)

- `endLoopRun` (`src/browser/sim/loop.ts`) adds `run.practice` to the loop's `practice` at a completion; `stopLoop` pays `loop.practice` + a run's practice when the run has no death; `catchUp` writes the practice gain into the report line (`AwayReportLine.practice`) and `stoppedLine` empties it. `src/browser/view/world-area.tsx:70` reads `run.practice` too — check what it shows for a loop's map run before you change what `run.practice` means.
- The report line is rendered by `goingText` in `src/browser/view/away-report.ts`, the section by `AwayReport` in `src/browser/view/headquarters.tsx`, and acts of the headquarters reach the simulation through `src/browser/view/game-view.ts`.
- The shared button is `src/browser/view/controls/react-button.tsx`; the kitchen-sink page is under `src/browser/kitchen-sink/`.

## Report must hold (besides what the method gives)

- the way you chose to remember that practice was paid, the way rejected, and what D-241 became;
- whether `SAVED_GAME_VERSION` was bumped, and why;
- for the interface: the states of the report line and button you checked (waiting practice with and without a running map run, after „Odbierz”, a line stopped by death), the method and what you saw;
- the **Unread material** and **Searches not found or unclear** sections, and the own-work check.
