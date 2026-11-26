# Handoff — executor-19: the executor of Slice 19

## Delegation

Mariusz, the product's owner, delegated the intermediate choices of this task cycle to the orchestrator that dispatches you; the orchestrator's answers are never his approval. You never ask the human; a question goes back to the orchestrator by returning `questions`.

## Where you work

- Worktree (your working directory, the repository's root): `the task's worktree`, branch `task/wyposazenie-postaci`. The pinned the-way is its `.the-way` (`6ed3cb364adedacea214d2a0df690cea32f2e72f`); dependencies are installed (`node_modules`). Commit on this branch, by path (`git add <path>…`, never `git add -A`), with English commit messages in the style of the repository's log.
- Slice base (written before you were dispatched): `7d18842d`. Your range is from that base.
- Stage: one slice of a planned change. Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant: "a slice, or the retry of a slice". Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Boundary: you make only this slice's Goal, in the files its *Change* names (a file outside it only where the Goal cannot be met without, named in your report). You never run the product's gate (`npm test` without a file, the whole suite); you run the focused checks of the slice's *Checks* and the checks your method asks for. You write no foundation entry (they stand already, written before slice 1) unless the slice says so.
- Class and model asked for: `same`.
- Your report: `docs/task-cycles/wyposazenie-postaci/reports/executor-19-report.md` (the report file is the input of the cycle's scripts: `task-cycle/remarks_check.py` reads it). Its first line is your status; it holds your commits, each check with its command and exit code, the tests that fail on your slice's base and their result there, **Unread material**, **Searches not found or unclear** (each `none` where none), your own-work check and the line on your working copies. Return status, commits, a one-line check result naming what failed or did not run, and the report's path.

- Your directory for working copies: `.runs/executor-19/`.

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

### Slice 19 — Postać: the tiles of the eight slots and their sentences

- **Goal:** Around the figure stand the tiles of the eight slots (*To do* 10, row 8): on its left „Głowa”, „Tułów” and „Nogi”, on its right „Ręka główna” and „Druga ręka”, under it a row of the three pockets; each a tile of Slice 16 holding the icon of the item in its slot or the slot's pale name, a slot that nothing fits standing empty (F23); in a component of its own, `src/browser/view/character-gear.tsx` (new). The tiles show the gear the game keeps at the character outside a map run: for a character in an earning loop the gear of its next map run, with „Postać jest w pętli. Zmiana działa od następnego przejścia.” above the tiles (row 33, F31); for the character of the manual map run the game state holds — going, paused or ended until „Restart” or „Zakończ” — the gear it entered with, its tiles not selectable, with „Przejście na mapie {mapa} jest niezakończone. Wyposażenie zmienisz po jego zakończeniu.” under the heading (row 34, F16), another character's tiles staying selectable. Each entering of the screen starts with no tile chosen (as D-199's trees start folded). The pick under a tile comes in Slice 20. Tests in `tests/view/character-gear.test.mjs` (new).
- **Change:** `src/browser/view/character-gear.tsx` · `src/browser/view/character-screen.tsx` · `src/browser/character-screen.css` ·
  `tests/view/character-gear.test.mjs`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:41-45` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:48-50` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:160-161` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:267-267` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:287-288` Settlements to record ·
  `foundations/part_map.md:3-33` browser-view · `foundations/decisions.md:10710-10753` D-287 ·
  `foundations/decisions.md:4923-4940` D-447 · `foundations/decisions.md:7412-7441` D-199 · F16 · F23 · F31 ·
  `src/browser/view/controls/react-button.tsx` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — orchestrator's addition in the plan review: eight tiles with the states of the task's sentences, read from a character's state in three situations.
- **Risk:** none
- **Checks:** `npm test -- tests/view/character-gear.test.mjs` (written first, failing) · `npm test -- tests/view/character-screen.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` · `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm run typecheck`
- **Depends on:** Slice 18 · F16 · F23 · F31

## The foundation entries the slice names as F-numbers (the plan's *Foundation entries*), by their entries now

| Plan's name | Entry | Current range |
|---|---|---|
| F16 | `D-287` in `foundations/decisions.md` | 10765-10819 |
| F23 | `D-454` in `foundations/decisions.md` | 12743-12756 |
| F31 | `D-462` in `foundations/decisions.md` | 12863-12876 |

## Current ranges of the foundation entries and the plan's *Choices* named in the slice's *Read* (they hold where they differ from the plan's)

| File | Label | Plan's range | Current range |
|---|---|---|---|
| `foundations/part_map.md` | browser-view | 3-33 | 3-32 |
| `foundations/decisions.md` | D-287 | 10710-10753 | 10765-10819 |
| `foundations/decisions.md` | D-447 | 4923-4940 | 4930-4946 |
| `foundations/decisions.md` | D-199 | 7412-7441 | 7443-7471 |
