# Independent spec review handoff — programy-gracza

Work from the worktree root `C:/Storage/repos/loop2-wt/programy-gracza`, branch `task/programy-gracza`, base `4bfb9623e9310220e335377df7fbb4c9ad413406`. Pinned process `3aee7d958835cc19b95519f4d21b37538b78e3e1`, gitlink and checkout equal.

Delegation: the user invoked `the-way-implement-task` and delegated intermediate choices to the orchestrator. You are the fresh reviewer of the spec, not its designer. Your method: read `.the-way/task-cycle/spec/SKILL.md` whole (entry point `.claude/skills/the-way-write-spec/SKILL.md`), in its review variant; read a file it names only when the step naming it comes. Stage: review of the spec only — no edits to the spec, the foundation, product code or tests, and no gate run. Questions go to the orchestrator in your report, never to the human. Do not read `cycle.md`.

Review `.runs/task-cycles/programy-gracza/spec.md` against the whole frozen task `.runs/task-cycles/programy-gracza/task.md` (accepted 2026-10-28). Read the designer's report `.runs/task-cycles/programy-gracza/reports/02-design-report.md` and the orchestrator's answers `.runs/task-cycles/programy-gracza/reports/03-design-answers.md`. Q-D1 is answered from the definition; Q-D2–Q-D5 are autonomous orchestrator choices, not human approval — judge them against the task and the foundation, do not take them as beyond review.

Write your full report to `.runs/task-cycles/programy-gracza/reports/05-spec-review.md`; its first line is `PASS` or `FAIL`. Return that first line, a one-line check result naming what failed or did not run, and the report path.

Trust boundary: no. Irreversible operation: no.

Approved sources beyond the task: definition `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md` (approved 2026-10-28, fingerprint 7e33760d), § Projected foundation changes, „(new) — Who owns a program?” (about lines 995–1045) and „(new) — How is a map solved, and what opens the next one?”; plan `plan_mvp_loop2.md` row 12 beside it, and rows 13, 16, 18 only to judge whether the spec lets those later tasks build on it without doing their work. The predecessor game `loop` may be read only in `src/sim/data/` and tests.

Read whole, from the current foundation:
- Decisions: D-04, D-18, D-20, D-21, D-22, D-23, D-26, D-35, D-36, D-38, D-39, D-40, D-42, D-44, D-47, D-50–D-56, D-62, D-73, D-75, D-80, D-82, D-84, D-88, D-90–D-93, D-118–D-136, D-143, D-149.
- Invariants: map-run-repeatability, simulation-randomness, action-in-progress, simulation-isolation, simulation-inputs, program-rule-pick, restart-seed, program-closed-lists, program-world-reference, character-team, minute-span-split, streak-program-change, browser-view-framework, browser-view-focus-outline.
- Part map: `simulation` and `browser-view`. Product glossary `foundations/glossary.md` whole; the-way's glossary terms open design choice, foundation step, return step, invariant, surface.
- Guidelines whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`; `src/browser/AGENTS.md`.
- Code to ground the review, as needed: `src/browser/sim/types.ts`, `game.ts`, `run.ts`, `program.ts`, `understanding.ts`, `character.ts`; `src/browser/view/app.ts`, `game-view.ts`, `program-editor.ts`, `headquarters.ts`, `status-row.ts`, `clock.ts`, `controls/`; `tests/sim/program-fixture.mjs` and tests in `tests/sim/`, `tests/view/`, `tests/invariants/test_streak_program_change.py`. The designer also read these; name in your report each file you read beyond this list.

Pay attention to: coverage of every *To do* item, every row of *Settlements to record*, the projected entry and the two additions the task carries; the program-number decision against D-56 and D-22; the copy in the map run and its base against restart (D-62, `restart-seed`), switch (D-20, `action-in-progress`) and death/completion screens (D-62, D-132); the counts after edits, save-as, switch and „Zakończ” against D-93; the first-chill write against D-123 and To do 11; the D-131 change against settlement row 9; the simulation/view boundary (D-04, `simulation-inputs`); no work of tasks 13, 16 or 18.

Report each check you run with its command and exit code; name what you did not run.
