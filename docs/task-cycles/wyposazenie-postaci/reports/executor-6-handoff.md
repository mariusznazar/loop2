# Handoff — executor-6: the executor of Slice 6

## Delegation

Mariusz, the product's owner, delegated the intermediate choices of this task cycle to the orchestrator that dispatches you; the orchestrator's answers are never his approval. You never ask the human; a question goes back to the orchestrator by returning `questions`.

## Where you work

- Worktree (your working directory, the repository's root): `the task's worktree`, branch `task/wyposazenie-postaci`. The pinned the-way is its `.the-way` (`6ed3cb364adedacea214d2a0df690cea32f2e72f`); dependencies are installed (`node_modules`). Commit on this branch, by path (`git add <path>…`, never `git add -A`), with English commit messages in the style of the repository's log.
- Slice base (written before you were dispatched): `5d72724c`. Your range is from that base.
- Stage: one slice of a planned change. Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant: "a slice, or the retry of a slice". Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Boundary: you make only this slice's Goal, in the files its *Change* names (a file outside it only where the Goal cannot be met without, named in your report). You never run the product's gate (`npm test` without a file, the whole suite); you run the focused checks of the slice's *Checks* and the checks your method asks for. You write no foundation entry (they stand already, written before slice 1) unless the slice says so.
- Class and model asked for: `cheaper`.
- Your report: `docs/task-cycles/wyposazenie-postaci/reports/executor-6-report.md` (the report file is the input of the cycle's scripts: `task-cycle/remarks_check.py` reads it). Its first line is your status; it holds your commits, each check with its command and exit code, the tests that fail on your slice's base and their result there, **Unread material**, **Searches not found or unclear** (each `none` where none), your own-work check and the line on your working copies. Return status, commits, a one-line check result naming what failed or did not run, and the report's path.

- Your directory for working copies: `.runs/executor-6/`.

Working copies (the first paragraph of the section "Working copies" of the cycle's skill, word for word):

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way` populated, and the dependencies those checks need installed as the product's own rules give, before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and command of a probe that shows a finding among them, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## The task and what binds

- The record directory `docs/task-cycles/wyposazenie-postaci/` also holds `cycle.md` and other agents' handoffs, reports and findings; they are not yours to read unless named here. You read there `task_frozen.md` (the frozen task, Polish) and `plan.md` in the ranges this handoff names, and write your report.
- Frozen task: `docs/task-cycles/wyposazenie-postaci/task_frozen.md`. Plan: `docs/task-cycles/wyposazenie-postaci/plan.md`. No spec was written.
- Step 4 answers: trust boundary **yes** (`src/browser/sim/saved-game.ts`, `src/browser/view/judging-cache.ts`, `assets/icons/**`; a slice whose *Risk* names one is reviewed by another agent against crafted input there); irreversible operation **no**.
- The foundation entries of this task are written and committed (decisions D-451–D-463 in the section "Gear of a character", the changed decisions, the glossary term `gear`, the environment fact `game-icons-gloves-title`). The plan's *Foundation entries* names them F1–F34: F32 was written as the NEW decision D-463 (the count of the player's gear changes that a remembered judging holds), D-441's text is unchanged; F3–F20 are the changes of the existing decisions D-23, D-44, D-140, D-143–D-145, D-183, D-187, D-190, D-287, D-290, D-309, D-311, D-380, D-439, D-440, D-445, D-446. Where the slice's text says F32 or D-441's count, read D-463. Read an entry by its heading; the line ranges of the log moved.
- `python -B .the-way/elements/common/foundation_check.py` currently reports 14 errors of one kind (a `decision:` line of a test quotes a sentence of D-144, D-145, D-445 or D-446 that the foundation changed): Slices 4, 4b and 18 make them 0; no other slice may add one. A test file you change that holds a `decision:` line must quote the sentence as it now stands.
- Where a later slice is named in your slice's text, it stands in the plan after yours; do not make its work.

## Your slice, from `plan.md`, word for word

### Slice 6 — The condition „Puste — {miejsce}” in the simulation

- **Goal:** The condition „Puste — {miejsce}” (row 21, F28) stands in the closed list of the types and of `src/browser/sim/data/conditions.ts`, in the section of the body after „Energia natury poniżej” (row 23, F18), revealed by the first wolf attack (row 22, F17). It holds where the place it names holds nothing, „Kieszeń” where at least one pocket is empty (*To do* 5); it names a place only by its kind, never a pocket's number or position (`program-world-reference`). Its targets are the places some item of the data fits, today the main hand and the pocket, a place gaining its target when an item starts to fit it (as D-443 gives the targets of an action), and the program check refuses any other place; a place lies in every repertoire. In combat it reads the gear as the turns before left it (Slice 4). `tests/sim/data.test.mjs` takes the new section's order and the new revelation. Leaves failing until a later slice: `tests/sim/discovery.test.mjs` (what the first wolf attack brings) until Slice 8, `tests/view/program-editor.test.mjs` (the sections of the pick) until Slice 13, and `tests/view/rule-editor.test.mjs` (the cells of the pick) until Slice 14. Tests in `tests/sim/gear-condition.test.mjs` (new, listed in `stryker.config.json`).
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/data/conditions.ts` · `src/browser/sim/program.ts` ·
  `src/browser/sim/programs.ts` · `src/browser/sim/understanding.ts` · `src/browser/sim/gear.ts` ·
  `tests/sim/data.test.mjs` · `tests/sim/gear-condition.test.mjs` · `stryker.config.json`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:36-38` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:145-145` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:275-277` Settlements to record ·
  `foundations/part_map.md:34-66` simulation · `foundations/decisions.md:8349-8367` D-443 ·
  `foundations/decisions.md:9926-9952` D-290 · `foundations/decisions.md:6968-6988` D-143 ·
  `foundations/decisions.md:8313-8331` D-376 · `foundations/decisions.md:8111-8141` D-26 ·
  `foundations/decisions.md:8260-8279` D-126 · `foundations/decisions.md:8280-8299` D-127 ·
  `foundations/invariants.md:386-396` program-world-reference · `foundations/invariants.md:364-374` program-closed-lists ·
  `foundations/invariants.md:248-263` program-rule-pick · `foundations/glossary.md:130-135` repertoire ·
  F17 · F18 · F28 ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/coding-content-data.md` ·
  `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/gear-condition.test.mjs` (written first, failing) · `npm test -- tests/sim/data.test.mjs` ·
  `npm test -- tests/sim/conditions.test.mjs` · `npm test -- tests/sim/program.test.mjs` · `npm test -- tests/sim/repertoire.test.mjs` ·
  `npm test -- tests/invariants/test_program_world_reference.py` · `npm test -- tests/invariants/test_program_closed_lists.py` ·
  `npm test -- tests/invariants/test_program_rule_pick.py` · `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm run typecheck`
- **Depends on:** Slice 5 · F17 · F18 · F28

## The foundation entries the slice names as F-numbers (the plan's *Foundation entries*), by their entries now

| Plan's name | Entry | Current range |
|---|---|---|
| F17 | `D-143` in `foundations/decisions.md` | 6991-7012 |
| F18 | `D-290` in `foundations/decisions.md` | 9975-10002 |
| F28 | `D-459` in `foundations/decisions.md` | 12818-12831 |

## Current ranges of the foundation entries and the plan's *Choices* named in the slice's *Read* (they hold where they differ from the plan's)

| File | Label | Plan's range | Current range |
|---|---|---|---|
| `foundations/part_map.md` | simulation | 34-66 | 34-65 |
| `foundations/decisions.md` | D-443 | 8349-8367 | 8386-8403 |
| `foundations/decisions.md` | D-290 | 9926-9952 | 9975-10002 |
| `foundations/decisions.md` | D-143 | 6968-6988 | 6991-7012 |
| `foundations/decisions.md` | D-376 | 8313-8331 | 8348-8365 |
| `foundations/decisions.md` | D-26 | 8111-8141 | 8146-8175 |
| `foundations/decisions.md` | D-126 | 8260-8279 | 8295-8313 |
| `foundations/decisions.md` | D-127 | 8280-8299 | 8315-8333 |
| `foundations/invariants.md` | program-world-reference | 386-396 | 386-395 |
| `foundations/invariants.md` | program-closed-lists | 364-374 | 364-373 |
| `foundations/invariants.md` | program-rule-pick | 248-263 | 248-262 |
| `foundations/glossary.md` | repertoire | 130-135 | 130-134 |
