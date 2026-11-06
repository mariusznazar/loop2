# Handoff — planner of the task cycle `ekran-przejscia`

## Delegation and boundary

The human asked the orchestrator to take this task through the-way's task cycle to a reviewable
pull request and delegated the intermediate choices to it. You are the planner. Your stage ends when
`plan.md` and `plan-size.md` stand in the record's directory; you write no code, make no commit,
start no slice and ask the human nothing. Questions go to the orchestrator: return `questions` with
them in your report.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\ekran-przejscia`
- Branch: `task/ekran-przejscia`; base of the task `d50158a` (origin/main); head `44317eb`, the
  commit that moved the-way's pin from f45ca40 to 61c72fb. Every reset stops at `44317eb`.
- Method: read whole `.the-way/task-cycle/plan/SKILL.md` and follow it; read a file it names only
  when the step or variant that names it comes.
- Frozen task (read whole): `.runs/task-cycles/ekran-przejscia/task.md`, accepted 2026-11-03,
  a member of the plan `plan_mvp2_loop2.md`, item 6. No spec was written.
- Write: `.runs/task-cycles/ekran-przejscia/plan.md` and `.runs/task-cycles/ekran-przejscia/plan-size.md`.
- Report: `.runs/task-cycles/ekran-przejscia/reports/report-planner.md`.

## Answers of step 4 (binding)

- Trust boundary: yes — `assets/sprites/**` (part `browser-view`); the task adds the PNG of the
  forest frame there. Mark the slice that adds it with that risk. Its review checks, as D-273 gives,
  that the file holds pixels alone and that the build copies from `assets/sprites/` only PNG files
  and only into what `npm run build` writes. A slice changing `src/browser/sim/saved-game.ts`
  (trust boundary of `simulation`) is marked too.
- Irreversible operation: no.
- Open design choice: none. Reserved choice: none. Route: planned slices.
- The four *Questions carried to cycle* are execution choices; the orchestrator's answers:
  1. The frame is composed once, outside the product's code, from the old Loop's cut sprites of
     Pixel Crawler in `C:\Storage\repos\loop\public\sprites\` (`ground.png`, `pine_tall.png`,
     `tree_snow.png`, `sap_snow.png` and the others), laid out as `C:\Storage\repos\loop\src\components\probe\Scene.tsx`
     lays them out (its `DECOR`, around line 28), in snow and in full light, 336 × 152 px. No script
     and no image library enters the repository; the slice composes it with a one-off script kept in
     the ignored record directory (Pillow 12.3.0 is installed on this machine) and names the recipe
     in its report. README names the picture beside the login backdrop as the login backdrop is named.
     The 672 × 304 size is the same file drawn at 2:1 (task *Context*), so one file serves both.
  2. and 3. The widths of the world and right areas and the window width from which the three areas
     stand side by side are layout dimensions (D-43) that follow from the scene's width, the rule
     panel's width the editor of task 5 already has and the 1344 px of content of D-280. The slice
     that lays the screen out chooses them and names them; the request shows the screen at 336 and
     at 672 (task item 6, question 1), so the scene size must be switchable for that showing without
     a second picture file — plan how, in the smallest reversible form.
  4. How the simulation tells the view of the rule it wrote and the group it wrote it into is code
     under D-122 and D-123; where it changes the shape of the saved game state, the plan's rule
     applies: „każde zadanie, które zmienia kształt stanu gry, podbija wersję raz w swojej zmianie”.
- Sources changed since the task was accepted (reconciled by the orchestrator): the task cites code
  at `20d804b`; tasks 4, 5 and 11 merged after it. The trip screen now has
  `src/browser/view/run-screen.ts`, the new editor (`program-panel.tsx`, `rule-list.tsx`,
  `rule-panel.tsx`) and the rule states of task 11. The React destructive button already exists
  (`src/browser/view/controls/react-button.tsx:13`), so task item 8's fallback is not needed.
  The projected entries „How does an address name a screen?” and „What do the screens leave room for
  from the start?” now stand as D-281 and D-282. Read every line number of the task's *Context*
  again against the worktree.
- The move of the pin: the gate on `44317eb` is running; the orchestrator gives you the checks it
  broke before you finish, or confirms there are none. Until then, plan as if there are none.

## What you read

Product instructions: `AGENTS.md`, `src/browser/AGENTS.md`.

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`,
`guidelines/coding-simulation-module.md`, `guidelines/coding-saved-game.md`,
`guidelines/testing.md`, `guidelines/styleguide-browser-view.md`. Task item 9 says the coding
guidelines' changes go through `the-way-maintain-coding-guidelines`: plan how its slice uses that
skill's files in the cycle without a human conversation, and say so. Where a change makes another
passage of these guidelines untrue (for example the styleguide's *Program editor* on where the rule
panel stands), its correction belongs to this task (WAY-172); plan it.

Foundation, `foundations/decisions.md`, each entry whole (from its heading to the next `###`):
every entry the task's *Decisions in play* names — D-130, D-19, D-133, D-147, D-185, D-216, D-122,
D-272, D-271, D-03, D-46, D-62, D-132, D-188, D-186, D-201, D-215, D-125, D-70, D-21, D-129, D-131,
D-123, D-43, D-44, D-265, D-276, D-279, D-264, D-269, D-273, D-87, D-88, D-254 — and D-280, D-281,
D-282, D-283, D-250, D-306, D-308, D-289, D-302, D-304, D-76. Read further entries of the parts
`browser-view` and `simulation` where a slice's work needs them, and name each such reach in your
report.

Invariants, `foundations/invariants.md`: those whose *Part* names `browser-view`, `simulation` or
`every` that the change reaches, among them `terrain-drawing-numbers` (its test
`tests/invariants/test_terrain_drawing_numbers.py` changes, task *Context*), `player-map-run-pace`,
`sprite-file-content` and `loop2-container-sprites` where it stands. Part map:
`foundations/part_map.md`, entries `browser-view`, `simulation`, `build-tools`. Glossary: the
product's `foundations/glossary.md` and `.the-way/foundations/glossary.md` for terms the plan uses.

## What each slice's *Read* holds

Name in each slice's *Read* the foundation entries by identifier, the guideline files and the
passages of the task the slice needs; the orchestrator checks them and copies them into the slice's
handoff. Give each slice a *Model* (`cheaper` by default; `same` or `strongest` with its reason),
a *Risk* (the trust boundary above, or none) and *Checks* that name focused checks a slice can
actually run — never a run of the whole gate, which is the orchestrator's.

The request must show the screen in a real browser in both scene sizes with the editor of task 5 in
the program area (task item 6); plan the slice whose executor takes those screenshots by the
product's skill `.claude/skills/loop2-play/SKILL.md`, into the ignored record directory.

## Return

Return your status (`done`, `done with concerns`, `questions`, `returned` or `reserved`), the paths
of `plan.md`, `plan-size.md` and your report, and a one-line check result naming what failed or did
not run. Your report holds every check you ran with its command and exit code, your questions and
concerns, each reach beyond this handoff, and **Searches not found or unclear** — each thing looked
for and not found or unclear, or `none`.
