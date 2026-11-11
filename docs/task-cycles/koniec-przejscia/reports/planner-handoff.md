# Handoff — the planner of the task "koniec-przejscia"

You are the planner of this task's change. Work from the worktree `` (task branch `task/koniec-przejscia`, base `211a4ea556d48f5da98fc08380b3c061b9365709`). Write only the two files named below; never write code, a test or a foundation entry, and never ask the human.

## Delegation

The human who requested this cycle has delegated intermediate choices to the orchestrator; you send your questions to the orchestrator in your report. Nothing you do is the human's approval.

## Method

Read whole `.the-way/task-cycle/plan/SKILL.md` and follow it. Read `.the-way/task-cycle/plan/too_large.md` only if that file's step comes (it does not: this is the first plan). Read a file that `SKILL.md` names only when the step that names it comes.

## Stage and boundary

Stage: plan (`plan-task`), the first plan of this task. Boundary: the finished `plan.md` and `plan-size.md`; return before any slice is made.

- Plan path: `docs/task-cycles/koniec-przejscia/plan.md`
- Size report path: `docs/task-cycles/koniec-przejscia/plan-size.md` (from `python -B .the-way/task-cycle/slice_size.py docs/task-cycles/koniec-przejscia/plan.md`, run from the worktree's root)
- Report path: `docs/task-cycles/koniec-przejscia/reports/planner-report.md`

## Inputs

- Frozen task, read whole: `docs/task-cycles/koniec-przejscia/task.md` (the task document `koniec_przejscia_loop2.md`, `Status: ready for cycle`, accepted by the human 2026-11-11). It is the only source of the task; its sources (the project definition and plan of MVP2) are not available to you except as the task quotes them. No spec was written (no open design choice, see the answers below).
- Answers of the two questions at the start (WAY-13):
  - Trust boundary: **yes** — `src/browser/sim/saved-game.ts` is the trust boundary of the part `simulation`; the task raises the version of the save from 3 to 4 with new fields of the state of the map run (To do 10). Mark every slice that changes that file, or the way a saved game state is read back, with the risk `trust boundary — src/browser/sim/saved-game.ts`.
  - Irreversible operation: **no**.
- Route: planning, selected by the orchestrator because the change crosses two parts (`simulation`, `browser-view`), reaches a trust boundary, adds a new kind of element (the first window over a game screen) and writes foundation entries, the styleguide and two tables of coding guidelines.
- No move of the pin; no check carried by one.
- Checks failing on the base: pending, the orchestrator is running the whole gate (`npm test`) on the base while you plan. You will be told if any fails there. Do not run the gate yourself.

## The task's guidelines and the foundation to read

Guideline files, each whole (WAY-213): `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-saved-game.md`, `guidelines/styleguide-browser-view.md` (read its example of the order of work and follow it or explain the departure), `guidelines/testing.md`, `src/browser/AGENTS.md`. The plan's *Read* of each slice names the files that slice's agent needs; `guidelines/coding-saved-game.md` for a slice that changes `src/browser/sim/saved-game.ts`.

Foundation: `foundations/part_map.md` whole; `foundations/glossary.md` whole. Decisions of `foundations/decisions.md`, each read whole by its heading `### D-nn` to the next heading, by identifier:

- those the task's *Decisions in play* names: D-53, D-55, D-62, D-93, D-122, D-132, D-133, D-135, D-147, D-149, D-173, D-185, D-188, D-190, D-201, D-206, D-208, D-212, D-215, D-216, D-280, D-283, D-311, D-313, D-322, D-323, D-324, D-338, D-339;
- the orchestrator's selection for the parts `browser-view` and `simulation` that bear on the end of a map run, the discovery, the save, the chronicle, the menu bar and focus: D-39, D-43, D-44, D-47, D-71, D-123, D-134, D-136, D-142, D-179, D-183, D-186, D-189, D-194, D-204, D-207, D-210, D-213, D-214, D-217, D-221, D-250, D-275, D-276, D-277, D-285, D-287, D-308, D-312, D-334, D-335, D-340, D-341, D-342, D-343, D-344, D-345, D-346, D-348.

Invariants: select by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` step 3 — those of `foundations/invariants.md` whose *Part* names `browser-view`, `simulation` or `every` and that bear on the end of a map run, a save, a state of the map run, the view's tokens and controls, or on a test the change alters; read each whole. Name in your report how you chose them, since the orchestrator's selection of invariants is yours.

Anything else you need: reach for it by identifier or word, read the entry whole, and name the reach in your report.

## What to cut and what the task already settles

- *Foundation entries* of the plan: the projected entry "(new) — What does the end of a map run explain?", the changed brewing of D-62, D-122, D-135, D-147, D-185, D-216 (those the task's *Decisions in play* "Zadanie zapisuje w całości" names), the parts of D-311 and D-132 and D-212 that the code makes true, the changes of D-53, D-122, D-173 and D-313 the task assigns to chosen ways, and rows 1–7 of *Settlements to record*, as To do 11 gives. The window is called "the end-of-run window" in the entries; the glossary gets no entry (task Question 11). The entries are written through the project skills `the-way-record-decision` (and the rest), by the agent of the *Foundation entries* row; the plan names them, never words them.
- The styleguide rule about the window (To do 12) goes through `the-way-maintain-styleguide`; the new files of the task in the tables of `guidelines/coding-browser-module.md` and `guidelines/coding-simulation-module.md` (To do 13) go through `the-way-maintain-coding-guidelines`. Place each in a slice of its own or in the slice that creates the files it names, as you judge best; the slice's *Goal* names the skill.
- *Questions carried to cycle* (task, the section of that name) are choices of how to make what the task settles: take each in the plan, list it under *Choices* with the way rejected and the cost if wrong, and for a value the token file lacks apply `src/browser/AGENTS.md` (name it in the plan's slice as a value to be named in the executor's report, never chosen). If you find an entry the change needs beyond the rows of *Settlements to record*, or a choice the code makes costly to turn back, that no row settles, return it as section 2 of the method gives.
- The previous cycles' request records are not to be used as a source.

## Report

Write the full report to the report path as `SKILL.md` section 5 gives, including **Unread material:** and **Searches not found or unclear:** (each `none` if so). Return the status, the plan's path, a one-line check result and the report's path.
