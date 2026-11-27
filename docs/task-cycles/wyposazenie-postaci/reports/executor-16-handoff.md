# Handoff — executor-16: the executor of Slice 16

## Delegation

Mariusz, the product's owner, delegated the intermediate choices of this task cycle to the orchestrator that dispatches you; the orchestrator's answers are never his approval. You never ask the human; a question goes back to the orchestrator by returning `questions`.

## Where you work

- Worktree (your working directory, the repository's root): `the task's worktree`, branch `task/wyposazenie-postaci`. The pinned the-way is its `.the-way` (`6ed3cb364adedacea214d2a0df690cea32f2e72f`); dependencies are installed (`node_modules`). Commit on this branch, by path (`git add <path>…`, never `git add -A`), with English commit messages in the style of the repository's log.
- Slice base (written before you were dispatched): `883489bf`. Your range is from that base.
- Stage: one slice of a planned change. Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant: "a slice, or the retry of a slice". Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Boundary: you make only this slice's Goal, in the files its *Change* names (a file outside it only where the Goal cannot be met without, named in your report). You never run the product's gate (`npm test` without a file, the whole suite); you run the focused checks of the slice's *Checks* and the checks your method asks for. You write no foundation entry (they stand already, written before slice 1) unless the slice says so.
- Class and model asked for: `same`.
- Your report: `docs/task-cycles/wyposazenie-postaci/reports/executor-16-report.md` (the report file is the input of the cycle's scripts: `task-cycle/remarks_check.py` reads it). Its first line is your status; it holds your commits, each check with its command and exit code, the tests that fail on your slice's base and their result there, **Unread material**, **Searches not found or unclear** (each `none` where none), your own-work check and the line on your working copies. Return status, commits, a one-line check result naming what failed or did not run, and the report's path.

- Your directory for working copies: `.runs/executor-16/`.

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

### Slice 16 — The tile, a kind of the shared button

- **Goal:** `ReactButton` in `src/browser/view/controls/react-button.tsx` gets the kind of the tile of a gear slot (F20, *To do* 10): a square button showing either the icon of an item, drawn as a mask in the colour of the text beside it (D-43), with the item's name as its accessible name read by screen readers, or the pale name of the slot; selected in its group with the frame of a chosen pick cell (`selected`, `aria-pressed`); disabled. Its look stands in `src/browser/styles.css` alone (D-265), its target of touch at least `--touch-target-min` in the block of the phone layout that holds the shared controls' targets (rule "Everything is done by touch, and every control holds the touch target"); no new token, role or meaning, as the styleguide's rules of Slice 11 give. `tests/view/shared-controls.test.mjs` gets a case for each of its states (rule "Wspólna kontrolka w jednej postaci"). The check in a real browser is Slice 17's, on the kitchen-sink page.
- **Change:** `tests/view/shared-controls.test.mjs` · `src/browser/view/controls/react-button.tsx` · `src/browser/styles.css`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:54-54` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:159-159` Questions to settle ·
  `foundations/part_map.md:3-33` browser-view · `foundations/decisions.md:5110-5128` D-44 ·
  `foundations/decisions.md:4399-4446` D-265 · F20 ·
  `tests/view/shared-controls.test.mjs:1-68` · `tests/view/shared-controls.test.mjs:119-166` ·
  `tests/view/shared-controls.test.mjs:487-541` · `tests/view/shared-controls.test.mjs:705-800` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — orchestrator's addition in the plan review: the first control of a kind the styleguide asks to be departed from in its states, whose look no earlier control fixes; a cheaper executor failing it would cost a reset of the slice.
- **Risk:** none
- **Checks:** `npm test -- tests/view/shared-controls.test.mjs` (its new cases written first, failing) ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm run typecheck`
- **Depends on:** Slice 15 · F20

## The foundation entries the slice names as F-numbers (the plan's *Foundation entries*), by their entries now

| Plan's name | Entry | Current range |
|---|---|---|
| F20 | `D-44` in `foundations/decisions.md` | 5117-5136 |

## Current ranges of the foundation entries and the plan's *Choices* named in the slice's *Read* (they hold where they differ from the plan's)

| File | Label | Plan's range | Current range |
|---|---|---|---|
| `foundations/part_map.md` | browser-view | 3-33 | 3-32 |
| `foundations/decisions.md` | D-44 | 5110-5128 | 5117-5136 |
| `foundations/decisions.md` | D-265 | 4399-4446 | 4399-4445 |
