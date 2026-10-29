# Planner handoff — programy-gracza

Work from the worktree root `C:/Storage/repos/loop2-wt/programy-gracza`, branch `task/programy-gracza`, base `4bfb9623e9310220e335377df7fbb4c9ad413406`. Pinned process `3aee7d958835cc19b95519f4d21b37538b78e3e1`, gitlink and checkout equal.

Delegation: the user invoked `the-way-implement-task` and delegated intermediate choices to the orchestrator. You are the planner. Your method: read `.the-way/task-cycle/plan/SKILL.md` whole (entry point `.claude/skills/the-way-plan-task/SKILL.md`); read a file it names only when the step naming it comes. Stage: planning only — no product code, no foundation entries, no tests, no gate run. Questions go to the orchestrator in your report (status `questions`), never to the human. Do not read `cycle.md`.

Inputs, each read whole:
- Frozen task `.runs/task-cycles/programy-gracza/task.md` (accepted 2026-10-28).
- Reviewed spec `.runs/task-cycles/programy-gracza/spec.md` (review PASS after one revision: `reports/05-spec-review.md`, `reports/07-spec-rereview.md`). The re-review noted one small gap, not a finding: the spec states that comparisons include the rule identity counters only for the check "the program has changes the copy lacks"; the check "the copy has unsaved changes" compares the same way — carry that into the slice that builds it.
- The orchestrator's answers and choices: `reports/03-design-answers.md`, `reports/06-spec-revision-handoff.md` (F2: the suggested name is the field's value).

Outputs: `.runs/task-cycles/programy-gracza/plan.md` and its size report `.runs/task-cycles/programy-gracza/plan-size.md`, written by `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/programy-gracza/plan.md` run from the worktree root as your method gives. Full report at `.runs/task-cycles/programy-gracza/reports/09-plan-report.md`. Return a short status, a one-line check result naming what failed or did not run, and the report path.

Two questions at start: trust boundary — no; irreversible operation — no. So no slice is marked with either risk. The task moves no pin, so no check is carried by a pin move.

Model classes for each slice's *Model* (WAY-229): `cheaper` by default; `same` for a slice across many parts or that integrates the work of earlier slices; `strongest` for one that needs design. In this harness `cheaper` is Sonnet and `same`/`strongest` are the orchestrator's model. Give each class other than `cheaper` its reason.

What the cycle already knows of the change's size, for your division: about forty-one test files drive `setProgram` or read `state.program` (`tests/sim/`, `tests/view/`, `tests/invariants/` through step scripts, and `tests/invariants/program_fixture.py`); the panel's `src/browser/view/program-editor.ts` is 1074 lines; `src/browser/sim/game.ts` 684 lines. The foundation entries are many and interdependent (16 rows, the projected entry, D-44, D-93, D-123, D-131, D-136, `streak-program-change`, a new decision, a glossary term, the part-map change) — plan them as the plan's *Foundation entries*, written before slice 1 by their own agent, unless your method gives another place. Each slice's *Checks* name focused checks only, never the gate (`npm test`). Each slice must end in at least one commit of tracked files; a slice that would only produce ignored evidence cannot pass the cycle's mechanical check.

The browser journeys are checked by hand and by screenshot under D-75 and D-88; plan in the slice that builds each screen how its states are shown and inspected (the earlier cycle used `npm run dev` in the worktree with an intercepted account, or the kitchen-sink page) and name any state left unchecked.

Read whole, from the current foundation, and propose each slice's *Read* from it:
- Decisions: D-04, D-18, D-20, D-21, D-22, D-23, D-26, D-35, D-36, D-38, D-39, D-40, D-42, D-44, D-47, D-50–D-56, D-62, D-73, D-75, D-80, D-82, D-84, D-88, D-90–D-93, D-118–D-136, D-143, D-149.
- Invariants: map-run-repeatability, simulation-randomness, action-in-progress, simulation-isolation, simulation-inputs, program-rule-pick, restart-seed, program-closed-lists, program-world-reference, character-team, minute-span-split, streak-program-change, browser-view-framework, browser-view-focus-outline.
- Part map: `simulation`, `browser-view`. Product glossary `foundations/glossary.md` whole.
- Guidelines whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`; `src/browser/AGENTS.md`.
- Code as needed: `src/browser/sim/types.ts`, `game.ts`, `run.ts`, `program.ts`, `understanding.ts`, `character.ts`; `src/browser/view/app.ts`, `game-view.ts`, `program-editor.ts`, `headquarters.ts`, `status-row.ts`, `clock.ts`, `controls/`; `tests/sim/program-fixture.mjs`, `tests/invariants/program_fixture.py`, `tests/invariants/test_streak_program_change.py`, and the tests that drive `setProgram`. Name in your report each file you read beyond this list.

Report each check you run with its command and exit code; name what you did not run.
