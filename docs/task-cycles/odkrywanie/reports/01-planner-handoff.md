# Handoff — planner, task cycle odkrywanie

## Delegation

The human (Mariusz) started this the-way task cycle and delegated every intermediate choice to the
cycle's orchestrator. You answer to the orchestrator, never to the human. Send questions back as
your method gives; do not start any other stage.

## Your stage

- Method: the project skill `the-way-plan-task` (pinned the-way at `.the-way`, commit 574a37b).
  Read it and what it names whole.
- Stage and boundary: divide this task's change into slices. Write no code. Return at the plan's
  end, before any slice is made.
- Worktree (only place you write): `C:/Storage/repos/loop2/.runs/worktrees/odkrywanie`, branch
  `task/odkrywanie`, base `d9a237435f22c29b7d37430054f6fa7ed0a81323` (origin/main; task 5 rule
  groups merged as 7b3d450, task 4 campfire and food merged earlier).
- Write: `.runs/task-cycles/odkrywanie/plan.md` and its size report
  `.runs/task-cycles/odkrywanie/plan-size.md` (from the pinned slice-size script as your method
  gives).
- Report: write your full report to `.runs/task-cycles/odkrywanie/reports/02-planner-report.md`
  and return its status, a one-line check result and that path.

## Task

Frozen task (read whole): `.runs/task-cycles/odkrywanie/task.md` — copy of
`C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/_zadania/odkrywanie_loop2.md`, accepted
2026-10-26, sha256 bc0398f0…86fd. Relation: plan item 6 `odkrywanie` of
`C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/plan_mvp_loop2.md`; definition
`definicja_mvp_loop2.md` there, approved 2026-10-26, fingerprint 7692b28a. The task's line
numbers and code references cite loop2 `9a5f360`; task 5 has since rebuilt the program into rule
groups, so find each place again in the current worktree.

No spec was written: the orchestrator found no open design choice (below).

## The orchestrator's answers at start

- Trust boundary: no. The change touches simulation, browser-view and product-foundation; the only
  trust boundaries there are `assets/icons/**` and `assets/fonts/**`. If a slice must add or change
  such a file, mark its *Risk* accordingly.
- Irreversible operation: no. Human actions: none.
- Open design choice: none. Every foundation entry the change writes is carried by the task — rows
  O1–O9 of *Settlements to record*, the projected entries and terms of § Decisions in play (written
  whole, or the part the code makes true where the task says so).
- Answers to the task's *Questions carried to cycle* and one further reading (bind your plan):
  - Q-C1 — The program editor offers the repertoire computed from the Understanding through the
    predispositions of the archetype of the character the program serves. With one program per game
    and every character an elemental mage today, the editor uses the elemental mage's repertoire,
    computed by the same function the simulation uses for the character in a map run.
  - Q-C2 — The Understanding records discovered actions, conditions and items by their data
    identifiers; the campfire enters it under an identifier the data files give it as a
    discoverable thing, without becoming a backpack item. The exact representation is a
    how-to-make choice inside that.
  - Q-C3 — The chain of revelations and the five character skills with their predispositions stand
    in data files of `src/browser/sim/data/`, beside the actions, items and conditions they concern
    (D-18; `guidelines/coding-content-data.md`). The decision written from row O9 carries the
    chain's meaning, not its location.

## What to read (selected by the orchestrator)

Foundation entries, each whole (decisions in `foundations/decisions.md`, invariants in
`foundations/invariants.md`, terms in `foundations/glossary.md`, parts in
`foundations/part_map.md`):

- Decisions: D-04, D-18, D-20, D-21, D-23, D-25, D-26, D-34, D-35, D-36, D-39, D-44, D-47, D-51,
  D-55, D-56, D-60, D-62, D-63, D-71, D-72, D-82, D-90, D-91, D-92, D-93.
- Invariants: player-map-run-pace, minute-span-split, program-closed-lists, program-rule-pick,
  action-in-progress, content-identifiers, simulation-isolation, simulation-inputs,
  map-run-repeatability, character-team, node-test-selection.
- Part map: simulation, browser-view, product-foundation.
- Glossary: character skill, program rule, map run, and any term the plan uses.

Guidelines, each file whole: `guidelines/coding.md`, `guidelines/coding-content-data.md`,
`guidelines/coding-simulation-module.md`, `guidelines/coding-browser-module.md`,
`guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`.

Propose in each slice's *Read* the entries, guideline files and passages that slice needs; the
orchestrator checks and may add to them.
