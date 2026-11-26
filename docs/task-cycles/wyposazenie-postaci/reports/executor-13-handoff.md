# Handoff — executor-13: the executor of Slice 13

## Delegation

Mariusz, the product's owner, delegated the intermediate choices of this task cycle to the orchestrator that dispatches you; the orchestrator's answers are never his approval. You never ask the human; a question goes back to the orchestrator by returning `questions`.

## Where you work

- Worktree (your working directory, the repository's root): `the task's worktree`, branch `task/wyposazenie-postaci`. The pinned the-way is its `.the-way` (`6ed3cb364adedacea214d2a0df690cea32f2e72f`); dependencies are installed (`node_modules`). Commit on this branch, by path (`git add <path>…`, never `git add -A`), with English commit messages in the style of the repository's log.
- Slice base (written before you were dispatched): `778ea803`. Your range is from that base.
- Stage: one slice of a planned change. Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant: "a slice, or the retry of a slice". Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Boundary: you make only this slice's Goal, in the files its *Change* names (a file outside it only where the Goal cannot be met without, named in your report). You never run the product's gate (`npm test` without a file, the whole suite); you run the focused checks of the slice's *Checks* and the checks your method asks for. You write no foundation entry (they stand already, written before slice 1) unless the slice says so.
- Class and model asked for: `cheaper`.
- Your report: `docs/task-cycles/wyposazenie-postaci/reports/executor-13-report.md` (the report file is the input of the cycle's scripts: `task-cycle/remarks_check.py` reads it). Its first line is your status; it holds your commits, each check with its command and exit code, the tests that fail on your slice's base and their result there, **Unread material**, **Searches not found or unclear** (each `none` where none), your own-work check and the line on your working copies. Return status, commits, a one-line check result naming what failed or did not run, and the report's path.

- Your directory for working copies: `.runs/executor-13/`.

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

### Slice 13 — The program editor offers „Puste” and „Załóż”

- **Goal:** In `src/browser/view/program-editor.ts`: a new condition „Puste” names the first place its pick offers; the sentence of a rule reads „Puste — Ręka główna” or „Puste — Kieszeń”; the pick offers „Puste” once the Understanding holds it, among the conditions of the body after „Energia natury poniżej” (row 23, F18), its targets the places some item of the data fits (row 21, F28); „Załóż” stands at the end of „Żywność i walka”, its targets the items of the Understanding whose row names a place, as „Opatrz” has its targets, with „1 min” and no price (D-293, D-363). `tests/view/program-editor.test.mjs` takes the new section's and group's order and passes again (failing since Slice 6); the rest in `tests/view/gear-editor.test.mjs` (new). The check of the editor in a real browser is Slice 15's.
- **Change:** `tests/view/program-editor.test.mjs` · `src/browser/view/program-editor.ts` · `tests/view/gear-editor.test.mjs`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:34-38` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:273-277` Settlements to record ·
  `foundations/part_map.md:3-33` browser-view · `foundations/decisions.md:9926-9952` D-290 ·
  `foundations/decisions.md:9593-9623` D-293 · `foundations/decisions.md:10262-10276` D-363 ·
  `foundations/decisions.md:8349-8367` D-443 · F18 · F27 · F28 ·
  `tests/view/program-editor.test.mjs:1-60` · `tests/view/program-editor.test.mjs:1066-1182` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/gear-editor.test.mjs` (written first, failing) · `npm test -- tests/view/program-editor.test.mjs` ·
  `npm test -- tests/view/item-verb-panel.test.mjs` · `npm run typecheck`
- **Depends on:** Slice 12 · F18 · F28

## The foundation entries the slice names as F-numbers (the plan's *Foundation entries*), by their entries now

| Plan's name | Entry | Current range |
|---|---|---|
| F18 | `D-290` in `foundations/decisions.md` | 9975-10002 |
| F27 | `D-458` in `foundations/decisions.md` | 12803-12816 |
| F28 | `D-459` in `foundations/decisions.md` | 12818-12831 |

## Current ranges of the foundation entries and the plan's *Choices* named in the slice's *Read* (they hold where they differ from the plan's)

| File | Label | Plan's range | Current range |
|---|---|---|---|
| `foundations/part_map.md` | browser-view | 3-33 | 3-32 |
| `foundations/decisions.md` | D-290 | 9926-9952 | 9975-10002 |
| `foundations/decisions.md` | D-293 | 9593-9623 | 9642-9671 |
| `foundations/decisions.md` | D-363 | 10262-10276 | 10317-10330 |
| `foundations/decisions.md` | D-443 | 8349-8367 | 8386-8403 |
