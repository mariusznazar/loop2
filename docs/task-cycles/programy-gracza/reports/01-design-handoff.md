# Spec designer handoff — programy-gracza

Work from the worktree root `C:/Storage/repos/loop2-wt/programy-gracza`, branch `task/programy-gracza`, base `4bfb9623e9310220e335377df7fbb4c9ad413406`. Pinned process `3aee7d958835cc19b95519f4d21b37538b78e3e1`, gitlink and checkout equal.

Delegation: the user invoked `the-way-implement-task` for this task and delegated intermediate choices to the orchestrator. You are the designer of the spec. Your method: read `.the-way/task-cycle/spec/SKILL.md` whole (entry point `.claude/skills/the-way-write-spec/SKILL.md`); read a file it names only when the step or variant naming it comes. Stage: designer, writing the spec only — no product code, no foundation entries, no tests, no gate run. Questions go to the orchestrator in your report (status `questions`), never to the human. Do not read `cycle.md`.

Inputs:
- Frozen task, read whole: `.runs/task-cycles/programy-gracza/task.md` (accepted 2026-10-28, SHA256 6977b560…185d). Its *Questions carried to cycle* name the open choices; the orchestrator's finding at start, recorded for you:
  1. how the game state tells one program from another, so that a character's pointer to the program it used last and a copy's source survive renaming and deleting another program — a choice that binds tasks 13, 16 and 18, so it becomes a foundation decision;
  2. where the copy stands (map run or game state) and how the game remembers its source program, the program each character used last, the program picked on the headquarters row before sending, and whether the source program changed since the copy was taken from it or last saved into it (To do 9, Q14);
  3. how the firing counts of D-93, keyed today by rule identifiers of the one program, follow the rules of the copy — through edits, after „Zapisz jako nowy program”, after a switch, and after „Zakończ” where counts stand beside the source program's rules with „0×” for a rule whose content differs (To do 10).
  Do not reopen what the task's *To do*, *Questions to settle* and *Settlements to record* settle; the spec decides only what they leave open, and names the foundation entries the cycle writes (all 16 rows, the projected entry „(new) — Who owns a program?” in the part the task makes true, the additions to D-136 and `streak-program-change`, the changes to D-44, D-93 and D-123, the glossary term of row 13, and the decision for choice 1).
- Spec path: `.runs/task-cycles/programy-gracza/spec.md`. Report path: `.runs/task-cycles/programy-gracza/reports/02-design-report.md`. Return a short status (`questions` or `done`), a one-line check result naming what failed or did not run, and the report path.
- Trust boundary: no. Irreversible operation: no. No assets, server, dependency or deployment change expected.

Sources with authority beyond the task: approved definition `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md` (approved 2026-10-28, fingerprint 7e33760d), § Projected foundation changes, „(new) — Who owns a program?”, „(new) — How is a map solved, and what opens the next one?”; plan `plan_mvp_loop2.md` row 12 beside it. Dependencies 5, 7, 8, 11 are merged and in the base; the task cites code at `6540e4c` — current code governs, line numbers may have moved; record any discrepancy. The predecessor game `loop` may be read only in `src/sim/data/` and tests, never engine or UI. Tasks 13 (trip plan), 16 (saving the game state) and 18 (earning loop) are out of scope: design so they can build on the choice, write nothing of them.

Read whole, from the current foundation:
- Decisions: D-04, D-18, D-20, D-21, D-22, D-23, D-26, D-35, D-36, D-38, D-39, D-40, D-42, D-44, D-47, D-50–D-56, D-62, D-73, D-75, D-80, D-82, D-84, D-88, D-90–D-93, D-118–D-136, D-143, D-149.
- Invariants: map-run-repeatability, simulation-randomness, action-in-progress, simulation-isolation, simulation-inputs, program-rule-pick, restart-seed, program-closed-lists, program-world-reference, character-team, minute-span-split, streak-program-change, browser-view-framework, browser-view-focus-outline.
- Part map: entries `simulation` and `browser-view`. Product glossary `foundations/glossary.md` whole; the-way's glossary terms open design choice, foundation step, return step, invariant, surface.
- Guidelines whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`; `src/browser/AGENTS.md`.
- Code to ground the spec, as needed: `src/browser/sim/types.ts`, `game.ts`, `run.ts`, `program.ts`, `understanding.ts`, `character.ts`; `src/browser/view/app.ts`, `game-view.ts`, `program-editor.ts`, `headquarters.ts`, `status-row.ts`, `controls/`; their tests in `tests/sim/` and `tests/view/`. Name in your report each file you read beyond this list.

No external research is needed. Report each check you run with its command and exit code; name what you did not run.
