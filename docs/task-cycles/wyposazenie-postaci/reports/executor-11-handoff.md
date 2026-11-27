# Handoff — executor-11: the executor of Slice 11

## Delegation

Mariusz, the product's owner, delegated the intermediate choices of this task cycle to the orchestrator that dispatches you; the orchestrator's answers are never his approval. You never ask the human; a question goes back to the orchestrator by returning `questions`.

## Where you work

- Worktree (your working directory, the repository's root): `the task's worktree`, branch `task/wyposazenie-postaci`. The pinned the-way is its `.the-way` (`6ed3cb364adedacea214d2a0df690cea32f2e72f`); dependencies are installed (`node_modules`). Commit on this branch, by path (`git add <path>…`, never `git add -A`), with English commit messages in the style of the repository's log.
- Slice base (written before you were dispatched): `90ff1100`. Your range is from that base.
- Stage: one slice of a planned change. Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant: "a slice, or the retry of a slice". Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Boundary: you make only this slice's Goal, in the files its *Change* names (a file outside it only where the Goal cannot be met without, named in your report). You never run the product's gate (`npm test` without a file, the whole suite); you run the focused checks of the slice's *Checks* and the checks your method asks for. You write no foundation entry (they stand already, written before slice 1) unless the slice says so.
- Class and model asked for: `same`.
- Your report: `docs/task-cycles/wyposazenie-postaci/reports/executor-11-report.md` (the report file is the input of the cycle's scripts: `task-cycle/remarks_check.py` reads it). Its first line is your status; it holds your commits, each check with its command and exit code, the tests that fail on your slice's base and their result there, **Unread material**, **Searches not found or unclear** (each `none` where none), your own-work check and the line on your working copies. Return status, commits, a one-line check result naming what failed or did not run, and the report's path.

- Your directory for working copies: `.runs/executor-11/`.

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

### Slice 11 — The styleguide's rules for the gear

- **Goal:** By the method of `.the-way/product-guidelines/styleguide/SKILL.md` (reading a file it names when its step comes), `guidelines/styleguide-browser-view.md` gets: in the rule "The screen Postać" a part on the gear (rows 9 and 32, *To do* 10 and 11) — the section „Wyposażenie” under the frame of what the character does, headed as „Umiejętności”, in the phone layout above „Umiejętności”; the figure in the middle of the slots at twice the size of the band (F15), the name, the line of generation and archetype and the resurrection line at the top of the left area (F14); the tiles, each square, with the item's icon or the slot's pale name in a role whose meaning holds it, a chosen tile framed as a chosen pick cell; the pick under it in pick cells with its heading „{miejsce}: {rzecz}” or „{miejsce}: nic”, „Zdejmij” with no icon, a greyed cell with its reason; the sentences of an earning loop and of an unfinished manual map run (F31, F16); the touch target of the phone layout; the tile as a shared control (F20) — with its decisions in *Decision* (F14, F15, F16, F20, F23, F30, F31) and its good and bad examples, the points on the figure at the top (D-445) and on what stands beside it (D-446) changed with the layout, and the rule's good and bad example with them; in the rule "States of shared controls" the tile among the controls that depart from the list of states, with the states that do not apply and why (F20); in the rule "The body row of a map run" the line of gear under the backpack line (F19). No new role, token value or meaning of a role (rule "Each role in its meaning").
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `.the-way/product-guidelines/styleguide/SKILL.md` · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:41-57` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:104-111` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:157-168` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:258-259` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:266-268` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:283-288` Settlements to record ·
  `foundations/part_map.md:140-159` agent-workflow · `foundations/decisions.md:4881-4902` D-445 ·
  `foundations/decisions.md:4903-4922` D-446 · `foundations/decisions.md:4923-4940` D-447 ·
  `foundations/decisions.md:5110-5128` D-44 · `foundations/decisions.md:10710-10753` D-287 ·
  `foundations/decisions.md:5000-5014` D-38 · `foundations/decisions.md:5042-5062` D-40 ·
  F14 · F15 · F16 · F19 · F20 · F23 · F30 · F31 ·
  `guidelines/coding.md` · `guidelines/testing.md`
- **Model:** same — it words the look of a screen that every later slice of the view follows.
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` ·
  `rg -U "Wyposażenie" guidelines/styleguide-browser-view.md`
- **Depends on:** Slice 10 · F14 · F15 · F16 · F19 · F20 · F23 · F30 · F31

## The foundation entries the slice names as F-numbers (the plan's *Foundation entries*), by their entries now

| Plan's name | Entry | Current range |
|---|---|---|
| F14 | `D-446` in `foundations/decisions.md` | 4906-4928 |
| F15 | `D-445` in `foundations/decisions.md` | 4881-4904 |
| F16 | `D-287` in `foundations/decisions.md` | 10765-10819 |
| F19 | `D-311` in `foundations/decisions.md` | 10821-10982 |
| F20 | `D-44` in `foundations/decisions.md` | 5117-5136 |
| F23 | `D-454` in `foundations/decisions.md` | 12743-12756 |
| F30 | `D-461` in `foundations/decisions.md` | 12848-12861 |
| F31 | `D-462` in `foundations/decisions.md` | 12863-12876 |

## Current ranges of the foundation entries and the plan's *Choices* named in the slice's *Read* (they hold where they differ from the plan's)

| File | Label | Plan's range | Current range |
|---|---|---|---|
| `foundations/part_map.md` | agent-workflow | 140-159 | 140-158 |
| `foundations/decisions.md` | D-445 | 4881-4902 | 4881-4904 |
| `foundations/decisions.md` | D-446 | 4903-4922 | 4906-4928 |
| `foundations/decisions.md` | D-447 | 4923-4940 | 4930-4946 |
| `foundations/decisions.md` | D-44 | 5110-5128 | 5117-5136 |
| `foundations/decisions.md` | D-287 | 10710-10753 | 10765-10819 |
| `foundations/decisions.md` | D-38 | 5000-5014 | 5007-5020 |
| `foundations/decisions.md` | D-40 | 5042-5062 | 5049-5068 |
