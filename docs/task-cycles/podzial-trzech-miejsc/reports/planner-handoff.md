# Handoff — planner (stage `plan-task`), task `podzial-trzech-miejsc`

You are the planner of one task cycle of the-way. The orchestrator of the cycle delegated every intermediate choice to itself; the person who requested the cycle is not asked during the cycle, and nothing you write is the human's approval.

## Where and what

- Worktree (work only from its root, never from another checkout): `the worktree's root`, branch `task/podzial-trzech-miejsc`, base `fc6e0046` (HEAD now; no commit of the task yet).
- Method of your stage: `.the-way/task-cycle/plan/SKILL.md` (`plan-task`) in that worktree. Read that `SKILL.md` whole; a file it names, only when the step or variant that names it comes.
- Stage and boundary: you write `plan.md` and its size report `plan-size.md` in `.runs/task-cycles/podzial-trzech-miejsc/` and return. You write no code, change no tracked file, run no test of the product's gate and make no commit.
- Frozen task (read whole): `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md`. Project relation: independent. No spec was written (no open design choice: see below).
- Your directory for working copies: `.runs/planner/` (directly under the ignored `.runs/` of the worktree).
- Report path: `.runs/task-cycles/podzial-trzech-miejsc/reports/planner-report.md`.

Working copies (word for word from the cycle's rule): An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Answers of step 4 of the cycle

- Does the change touch a trust boundary? Yes, in a limited sense: the files the part map names as the trust boundary of `browser-view` (`src/browser/view/screen-address.ts`, `src/browser/view/email-confirmation.ts`, `src/browser/view/password-reset.ts`) are not changed by the task, but `startApp` in `src/browser/view/app.ts` imports and calls all three, so a split of `startApp` moves the call sites of that input. The slice that splits `startApp` is marked with this risk (*Risk* names the trust boundary), so it gets a review of its own.
- Irreversible operation? No.
- Open design choice? None. The way to divide `startApp`, `createProgramsEntry` with `build`, and the kitchen-sink file is the choice *Questions carried to cycle* leaves to the cycle; it is a choice of how to make what the task settles. Propose it in the plan and name it under *Choices*. Row 1 of *Settlements to record* is settled (the sentence of the styleguide), and point 4 says the author of the cycle writes that sentence; point 8 carries its own foundation sentences (D-323, invariant `uncaught-failure-game-state`) and point 6 the invariant `function-and-file-size`.
- Reserved choice: none.
- Route: planned slices (orchestrator's judgment: four separable parts with different verification — the kitchen-sink page has no test and needs a before/after picture; `startApp` has call sites of the trust boundary and is covered by `tests/view/`; `createProgramsEntry`; the behaviour change of point 8, which the task wants as a separate commit).
- Measure at start of the cycle (point 5), `node tests/quality/eslint-size-rules.mjs` on the base: exactly the places of the task — `src/browser/kitchen-sink/kitchen-sink.tsx` 890 of 800, `startApp` 449 of 200, `createProgramsEntry` 245 of 200 and its method `build` 225 of 200 — and no other place, so point 5 has nothing to divide at the start.

## Rules of this cycle that bind your plan

- No slice's *Checks* runs the product's full gate (`npm test`): the gate is run by the orchestrator only, after a signal of the human's adviser. Slice checks are focused ones: for example `node tests/quality/eslint-size-rules.mjs`, the focused `tests/view/*.test.mjs` files that cover the moved behaviour (name them), `npx tsc` projects, the ESLint and Prettier run on the changed files — each as the product's rules and `guidelines/testing.md` give them. Every check the plan names must be able to run on this machine without the gate.
- The task's point 8 goes in a commit of its own, separate from the split (task text). The plan must keep the split slices free of the change of behaviour, and the slice of point 8 free of the split, so that a review can tell them apart. Think about the order: point 8 touches `app.ts`, `state-store.ts` and `run-screen-state.ts`; `startApp` is split in the same file.
- Point 6 (`@unittest.expectedFailure` and its comment removed from `tests/quality/test_function_and_file_size.py`, and the invariant `function-and-file-size` set to `Violated: no` through the skill `the-way-record-invariant`) belongs to the change that makes the last place go under the threshold; plan it so that no commit leaves the size test failing without its mark, or its mark on a passing test. State the order.
- The foundation entries of the task (D-323 sentence and invariant `uncaught-failure-game-state` for point 8; invariant `function-and-file-size`; the styleguide sentence of point 4) are written through the skills of the-way for foundation entries; `.the-way/task-cycle/skill/foundation_step.md` says how the plan's *Foundation entries* is made. Read it for the plan's *Foundation entries* section.
- The kitchen-sink page has no test of its content; its picture before the split must be collected before the split (task *Context*) and compared after it (acceptance criterion 3). The plan must say who collects it, with which command (`npm run kitchen-sink` per `guidelines/styleguide-browser-view.md` and `.claude/skills/loop2-play/SKILL.md`), where it is kept (a working copy under `.runs/` is allowed; a screenshot is never committed and never kept in the record) and how it is compared. Take also the invariant `application-build-kitchen-sink` and D-269 into account: the page marker `PAGE_MARKER` must stay where the invariant's test looks for it.
- A new file of `src/browser/kitchen-sink/` is compiled by `tsconfig.kitchen-sink.json` and left out of `npm run build` by `tsconfig.browser.json`; check this against the files, not from this handoff.
- Plans must keep each new file and each function under the thresholds of D-425 (functions at most 200 lines of code, files at most 800, counted by the rule of the decision) — verify the plan's expectation of each resulting file's size against the real code, not by estimate alone.
- Code is in English (identifiers, comments); Polish stays only in what the code shows to the player or matches on.

## What to read (selected by the orchestrator; you may read more and must name each reach in your report)

Task: the whole frozen task.

Foundation entries by identifier (read each entry whole in `foundations/decisions.md`, `foundations/invariants.md`, `foundations/part_map.md`):
- decisions: D-425, D-45, D-269, D-407, D-408, D-421, D-323, D-311, D-371, D-29, D-265, D-395;
- invariants: `function-and-file-size`, `uncaught-failure-game-state`, `application-build-kitchen-sink`, and whatever other invariant of the parts `browser-view` and `build-tools` the change reaches (search `foundations/invariants.md` by *Part*);
- the part map entries of `browser-view`, `build-tools`, `agent-workflow` and `product-foundation`.

Guideline files, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`.

Code: `src/browser/view/app.ts`, `src/browser/view/programs-entry.ts`, `src/browser/kitchen-sink/kitchen-sink.tsx`, `src/browser/view/state-store.ts`, `src/browser/view/run-screen-state.ts`, `tests/view/run-screen-state.test.mjs`, `tests/quality/test_function_and_file_size.py`, `tests/quality/eslint-size-rules.mjs`, the modules these import that a split would move code into or out of, and the tests of `tests/view/` that cover `startApp` and the Programy screen (the task's *Context* names several).

An index of the decisions of the sections "Browser view: screens, navigation and their code" and "Code rules, exemplars and static checks" and of the parts `browser-view` and `build-tools` is in `.runs/orchestrator/index.md` (a working file of the orchestrator; read it only to locate a decision, never in place of an entry).

## Return

Return, as the method gives it: your status, the paths of `plan.md` and `plan-size.md`, a one-line check result (name what failed or did not run), your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`). The full report is the file at the report path above.
