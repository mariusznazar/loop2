# Handoff — executor-7: the executor of Slice 7

## Delegation

Mariusz, the product's owner, delegated the intermediate choices of this task cycle to the orchestrator that dispatches you; the orchestrator's answers are never his approval. You never ask the human; a question goes back to the orchestrator by returning `questions`.

## Where you work

- Worktree (your working directory, the repository's root): `the task's worktree`, branch `task/wyposazenie-postaci`. The pinned the-way is its `.the-way` (`6ed3cb364adedacea214d2a0df690cea32f2e72f`); dependencies are installed (`node_modules`). Commit on this branch, by path (`git add <path>…`, never `git add -A`), with English commit messages in the style of the repository's log.
- Slice base (written before you were dispatched): `78fd5cbf`. Your range is from that base.
- Stage: one slice of a planned change. Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant: "a slice, or the retry of a slice". Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Boundary: you make only this slice's Goal, in the files its *Change* names (a file outside it only where the Goal cannot be met without, named in your report). You never run the product's gate (`npm test` without a file, the whole suite); you run the focused checks of the slice's *Checks* and the checks your method asks for. You write no foundation entry (they stand already, written before slice 1) unless the slice says so.
- Class and model asked for: `same`.
- Your report: `docs/task-cycles/wyposazenie-postaci/reports/executor-7-report.md` (the report file is the input of the cycle's scripts: `task-cycle/remarks_check.py` reads it). Its first line is your status; it holds your commits, each check with its command and exit code, the tests that fail on your slice's base and their result there, **Unread material**, **Searches not found or unclear** (each `none` where none), your own-work check and the line on your working copies. Return status, commits, a one-line check result naming what failed or did not run, and the report's path.

- Your directory for working copies: `.runs/executor-7/`.

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

### Slice 7 — The action „Załóż — {rzecz}” outside combat

- **Goal:** The action „Załóż — {rzecz}” (row 19, F27) stands in the closed list of the types and of `src/browser/sim/data/actions.ts`, one for every slot; its targets are the items whose row names a place (a property of the items' rows in `src/browser/sim/data/items.ts` that gives an action its targets, as D-443 gives them), today the stick and the bandage. At its end, as every action pays at its end so that an attack before it takes nothing (D-142), it takes one piece of its target from the backpack into the slot the item fits — into a pocket the first empty one — and puts the piece that slot held into the backpack, so the backpack never overflows. It lasts 1 game minute outside combat (row 20, F7); its row in the program editor shows „1 min” (D-293) and no price, since it uses up nothing (D-363); in the pick it stands at the end of „Żywność i walka” (row 23, F18), and the first wolf attack reveals it (row 22, F17). Its row in the data names its icon file, the one F33 records (Slice 9 adds the file), and its status, „Zakłada”, which „Teraz” and the chronicle write with its target (row 25, Slice 12). Its refusals (row 24, F6): „brakuje 1 × {rzecz}” where the backpack lacks the item, „już założone: {rzecz}” where the item's slot holds it already, „kieszenie pełne” where every pocket is full, the reason on the state of the slot before the one on the lack (D-380); for an item of a pocket only „kieszenie pełne”. It is not refused „tylko w walce” outside combat (F8); the data mark it as an action that can also be carried out in combat without being an action of combat, so that Slice 8 lets it act there and its time stays „1 min”. Its game minutes count as a kind of their own in the record of a manual map run (`MINUTE_KINDS` in `src/browser/sim/run-record.ts`). A rule with it lies in the repertoire where the Understanding holds its target, as for „Opatrz”. Leaves failing until a later slice: `tests/sim/saved-game.test.mjs` (the kinds of the record), `tests/sim/data.test.mjs` (the groups of D-290 and what the first wolf attack reveals) and `tests/sim/discovery.test.mjs` until Slice 8; `tests/view/icons.test.mjs` (the action's icon file) until Slice 9; `tests/view/program-editor.test.mjs` (the groups of the pick, failing since Slice 6) until Slice 13; `tests/view/rule-editor.test.mjs` (the groups of the pick, failing since Slice 6) until Slice 14. Tests in `tests/sim/gear-wear.test.mjs` (new, listed in `stryker.config.json`).
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/data/actions.ts` · `src/browser/sim/data/items.ts` ·
  `src/browser/sim/program.ts` · `src/browser/sim/run.ts` · `src/browser/sim/programs.ts` · `src/browser/sim/understanding.ts` ·
  `src/browser/sim/run-record.ts` · `tests/sim/gear-wear.test.mjs` · `stryker.config.json`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:32-35` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:38-39` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:139-140` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:144-146` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:273-279` Settlements to record ·
  `foundations/part_map.md:34-66` simulation · `foundations/decisions.md:8349-8367` D-443 ·
  `foundations/decisions.md:6944-6967` D-142 · `foundations/decisions.md:8332-8348` D-380 ·
  `foundations/decisions.md:6885-6924` D-140 · `foundations/decisions.md:10162-10198` D-309 ·
  `foundations/decisions.md:9593-9623` D-293 · `foundations/decisions.md:10262-10276` D-363 ·
  `foundations/decisions.md:9926-9952` D-290 · `foundations/decisions.md:9953-9986` D-291 ·
  `foundations/decisions.md:10199-10234` D-310 · `foundations/invariants.md:187-197` action-in-progress ·
  `foundations/invariants.md:364-374` program-closed-lists · `foundations/invariants.md:248-263` program-rule-pick ·
  F1 · F3 · F6 · F7 · F8 · F17 · F18 · F24 · F27 · F33 ·
  `src/browser/sim/action-targets.ts` · `src/browser/sim/combat.ts` ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/coding-content-data.md` ·
  `guidelines/testing.md`
- **Model:** same — a new action across the closed lists, the pick, the end of an action and the record of a map run.
- **Risk:** none
- **Checks:** `npm test -- tests/sim/gear-wear.test.mjs` (written first, failing) · `npm test -- tests/sim/actions.test.mjs` ·
  `npm test -- tests/sim/program.test.mjs` · `npm test -- tests/sim/repertoire.test.mjs` · `npm test -- tests/sim/run-record.test.mjs` ·
  `npm test -- tests/sim/action-targets.test.mjs` · `npm test -- tests/invariants/test_action_in_progress.py` ·
  `npm test -- tests/invariants/test_program_closed_lists.py` · `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm run typecheck`
- **Depends on:** Slice 6 · F6 · F7 · F8 · F27 · F33

## The foundation entries the slice names as F-numbers (the plan's *Foundation entries*), by their entries now

| Plan's name | Entry | Current range |
|---|---|---|
| F1 | `D-451` in `foundations/decisions.md` | 12698-12711 |
| F3 | `D-23` in `foundations/decisions.md` | 8072-8118 |
| F6 | `D-380` in `foundations/decisions.md` | 8367-8384 |
| F7 | `D-140` in `foundations/decisions.md` | 6904-6946 |
| F8 | `D-309` in `foundations/decisions.md` | 10213-10252 |
| F17 | `D-143` in `foundations/decisions.md` | 6991-7012 |
| F18 | `D-290` in `foundations/decisions.md` | 9975-10002 |
| F24 | `D-455` in `foundations/decisions.md` | 12758-12771 |
| F27 | `D-458` in `foundations/decisions.md` | 12803-12816 |
| F33 | fact `game-icons-gloves-title` in `foundations/environment_facts.md` | 247-251 |

## Current ranges of the foundation entries and the plan's *Choices* named in the slice's *Read* (they hold where they differ from the plan's)

| File | Label | Plan's range | Current range |
|---|---|---|---|
| `foundations/part_map.md` | simulation | 34-66 | 34-65 |
| `foundations/decisions.md` | D-443 | 8349-8367 | 8386-8403 |
| `foundations/decisions.md` | D-142 | 6944-6967 | 6967-6989 |
| `foundations/decisions.md` | D-380 | 8332-8348 | 8367-8384 |
| `foundations/decisions.md` | D-140 | 6885-6924 | 6904-6946 |
| `foundations/decisions.md` | D-309 | 10162-10198 | 10213-10252 |
| `foundations/decisions.md` | D-293 | 9593-9623 | 9642-9671 |
| `foundations/decisions.md` | D-363 | 10262-10276 | 10317-10330 |
| `foundations/decisions.md` | D-290 | 9926-9952 | 9975-10002 |
| `foundations/decisions.md` | D-291 | 9953-9986 | 10004-10036 |
| `foundations/decisions.md` | D-310 | 10199-10234 | 10254-10288 |
| `foundations/invariants.md` | action-in-progress | 187-197 | 187-196 |
| `foundations/invariants.md` | program-closed-lists | 364-374 | 364-373 |
| `foundations/invariants.md` | program-rule-pick | 248-263 | 248-262 |
