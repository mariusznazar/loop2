# Handoff — executor-23: the executor of Slice 23

## Delegation

Mariusz, the product's owner, delegated the intermediate choices of this task cycle to the orchestrator that dispatches you; the orchestrator's answers are never his approval. You never ask the human; a question goes back to the orchestrator by returning `questions`.

## Where you work

- Worktree (your working directory, the repository's root): `the task's worktree`, branch `task/wyposazenie-postaci`. The pinned the-way is its `.the-way` (`6ed3cb364adedacea214d2a0df690cea32f2e72f`); dependencies are installed (`node_modules`). Commit on this branch, by path (`git add <path>…`, never `git add -A`), with English commit messages in the style of the repository's log.
- Slice base (written before you were dispatched): `3c6bd87b`. Your range is from that base.
- Stage: one slice of a planned change. Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant: "a slice, or the retry of a slice". Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Boundary: you make only this slice's Goal, in the files its *Change* names (a file outside it only where the Goal cannot be met without, named in your report). You never run the product's gate (`npm test` without a file, the whole suite); you run the focused checks of the slice's *Checks* and the checks your method asks for. You write no foundation entry (they stand already, written before slice 1) unless the slice says so.
- Class and model asked for: `same`.
- Your report: `docs/task-cycles/wyposazenie-postaci/reports/executor-23-report.md` (the report file is the input of the cycle's scripts: `task-cycle/remarks_check.py` reads it). Its first line is your status; it holds your commits, each check with its command and exit code, the tests that fail on your slice's base and their result there, **Unread material**, **Searches not found or unclear** (each `none` where none), your own-work check and the line on your working copies. Return status, commits, a one-line check result naming what failed or did not run, and the report's path.

- Your directory for working copies: `.runs/executor-23/`.

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

### Slice 23 — A fight walked in a real browser, and the styleguide's line on the component of the gear line (added by the orchestrator after Slice 15's report)

- **Goal:** (1) Slice 15's browser check could not reach a fight, so what a fight shows of the gear stands unchecked. Walk it in a real browser as `.claude/skills/loop2-play/SKILL.md` gives: with a stick in the backpack and an empty main hand, a map run with a wolf attack (a seed that meets the wolf can be found with the balance instrument, whose modes take the character's gear since Slice 21) in which the strike takes the stick into the hand — the combat line reads „Mag bierze patyk z plecaka do ręki” as an element of its own before the strike's, the chronicle reads „Bierze patyk z plecaka do ręki”, the line of gear on the screen of the map run turns from „Wyposażenie: nic” to „Wyposażenie: patyk w ręku” — and a program with the rule „Puste — Ręka główna → Załóż — patyk” and one with „Załóż” in the combat rules: the rule of „Załóż” stands in its colour out of combat and in the turn of a fight and is never amber with „trwa walka” or „tylko w walce” (D-309 as changed); „Teraz” reads „Zakłada {rzecz}”; the encounter's paragraph in the chronicle shows the equip turn. Make the check at 1280 × 720 and at 360 px with touch; put screenshots where `.the-way/task-cycle/change/ui_check.md` says and report their links. A fault found in a file an earlier slice changed is fixed by this slice outside its *Change* and named in its report. (2) The paragraph of `guidelines/styleguide-browser-view.md` that Slice 11 wrote for the line of gear (the rule "The body row of a map run", the passage that says "Komponent to `src/browser/view/body-row-cells.tsx`") names the component of the body row; the gear line is drawn by `src/browser/view/world-area.tsx` right after the body row's cells, with its words made by `src/browser/view/gear-lines.ts`, and the passage says so, in the rule's own style, changing nothing else.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:30-39` To do · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:55-55` To do · `foundations/decisions.md:10821-10840` D-311 · `foundations/decisions.md:8383-8398` D-380 · `guidelines/coding.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` · `.claude/skills/loop2-balance/SKILL.md` · `.the-way/task-cycle/change/walkthrough.md` · `.the-way/task-cycle/change/ui_check.md`
- **Model:** same — a walk through a fight in a real browser that the cheaper executor of Slice 15 could not reach.
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` (its remaining errors are the two lines of `tests/view/character-screen.test.mjs`, until Slice 18) · the browser check above, with its observations and screenshot links in the report
- **Depends on:** Slice 22

## The foundation entries the slice names as F-numbers (the plan's *Foundation entries*), by their entries now

| Plan's name | Entry | Current range |
|---|---|---|

## Current ranges of the foundation entries and the plan's *Choices* named in the slice's *Read* (they hold where they differ from the plan's)

| File | Label | Plan's range | Current range |
|---|---|---|---|
| `foundations/decisions.md` | D-311 | 10821-10840 | 10821-10982 |
| `foundations/decisions.md` | D-380 | 8383-8398 | 8367-8384 |
