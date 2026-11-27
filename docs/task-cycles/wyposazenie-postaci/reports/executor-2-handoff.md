# Handoff — executor-2: the executor of Slice 2

## Delegation

Mariusz, the product's owner, delegated the intermediate choices of this task cycle to the orchestrator that dispatches you; the orchestrator's answers are never his approval. You never ask the human; a question goes back to the orchestrator by returning `questions`.

## Where you work

- Worktree (your working directory, the repository's root): `the task's worktree`, branch `task/wyposazenie-postaci`. The pinned the-way is its `.the-way` (`6ed3cb364adedacea214d2a0df690cea32f2e72f`); dependencies are installed (`node_modules`). Commit on this branch, by path (`git add <path>…`, never `git add -A`), with English commit messages in the style of the repository's log.
- Slice base (written before you were dispatched): `5639c225`. Your range is from that base.
- Stage: one slice of a planned change. Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant: "a slice, or the retry of a slice". Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Boundary: you make only this slice's Goal, in the files its *Change* names (a file outside it only where the Goal cannot be met without, named in your report). You never run the product's gate (`npm test` without a file, the whole suite); you run the focused checks of the slice's *Checks* and the checks your method asks for. You write no foundation entry (they stand already, written before slice 1) unless the slice says so.
- Class and model asked for: `cheaper`.
- Your report: `docs/task-cycles/wyposazenie-postaci/reports/executor-2-report.md` (the report file is the input of the cycle's scripts: `task-cycle/remarks_check.py` reads it). Its first line is your status; it holds your commits, each check with its command and exit code, the tests that fail on your slice's base and their result there, **Unread material**, **Searches not found or unclear** (each `none` where none), your own-work check and the line on your working copies. Return status, commits, a one-line check result naming what failed or did not run, and the report's path.

- Your directory for working copies: `.runs/executor-2/`.

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

### Slice 2 — The player's acts on the gear

- **Goal:** `src/browser/sim/gear.ts` (new) holds the player's two acts on a character's gear, as functions of the simulation that give a `GameResult` and change nothing passed to them: putting a piece of an item from the chest on a slot it fits — the piece the slot held goes back to the chest; an item the chest lacks and an item that does not fit the slot are refused — and taking the piece of a slot off into the chest — refused on an empty slot and where the chest has no room, the reason „skrzynka pełna”. Both act on the gear the game keeps at the character (Slice 1): for a character at the camp at once; for a character in an earning loop on its next map run, the map run going on keeping its own gear (as D-200 has a bought rank act), each act marking its slot as changed by the player, a return to the same item included (*To do* 7, F22); for the character of the manual map run the game state holds — going, paused or ended until „Restart” or „Zakończ” — both are refused (F16, row 34). A piece put on in an earning loop leaves the chest at once, and one put on there and taken off before the end of the map run returns to it at once. Each act raises the character's count of gear changes by one (F32, read by Slice 10). The module also gives, for a character's slot, what the pick of the screen Postać shows (Slice 20): the items of the chest that fit the slot with the pieces the chest holds of each, and whether „Zdejmij” can act and, where not, its reason. Tests in `tests/sim/gear-acts.test.mjs` (new, listed in `stryker.config.json`), each act and each refusal, at the camp, in an earning loop and beside a manual map run of that character and of another.
- **Change:** `src/browser/sim/gear.ts` · `tests/sim/gear-acts.test.mjs` · `stryker.config.json`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:29-29` To do · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:41-45` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:87-91` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:262-262` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:285-288` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/plan.md:602-618` Choices ·
  `foundations/part_map.md:34-66` simulation · `foundations/decisions.md:7442-7463` D-200 ·
  `foundations/decisions.md:10710-10753` D-287 · `foundations/decisions.md:8660-8682` D-50 ·
  `foundations/decisions.md:8775-8789` D-184 · `foundations/decisions.md:8966-9024` D-241 ·
  `foundations/invariants.md:226-235` simulation-inputs · `foundations/invariants.md:214-225` simulation-isolation ·
  `foundations/glossary.md:93-98` at the camp · `foundations/glossary.md:136-141` manual map run ·
  `foundations/glossary.md:223-228` earning loop · F2 · F16 · F21 · F22 · F32 ·
  `src/browser/sim/types.ts` · `src/browser/sim/skills.ts` · `src/browser/sim/trip.ts` ·
  `src/browser/sim/data/balance.ts` · `src/browser/sim/data/items.ts` ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/gear-acts.test.mjs` (written first, failing) ·
  `npm test -- tests/invariants/test_simulation_inputs.py` · `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm run typecheck`
- **Depends on:** Slice 1 · F16 · F22 · F32

## The foundation entries the slice names as F-numbers (the plan's *Foundation entries*), by their entries now

| Plan's name | Entry | Current range |
|---|---|---|
| F2 | glossary term `gear` in `foundations/glossary.md` | 338-342 |
| F16 | `D-287` in `foundations/decisions.md` | 10765-10819 |
| F21 | `D-452` in `foundations/decisions.md` | 12713-12726 |
| F22 | `D-453` in `foundations/decisions.md` | 12728-12741 |
| F32 | `D-463` in `foundations/decisions.md` | 12878-12893 |

## Current ranges of the foundation entries and the plan's *Choices* named in the slice's *Read* (they hold where they differ from the plan's)

| File | Label | Plan's range | Current range |
|---|---|---|---|
| `docs/task-cycles/wyposazenie-postaci/plan.md` | Choices | 602-618 | 612-628 |
| `foundations/part_map.md` | simulation | 34-66 | 34-65 |
| `foundations/decisions.md` | D-200 | 7442-7463 | 7473-7493 |
| `foundations/decisions.md` | D-287 | 10710-10753 | 10765-10819 |
| `foundations/decisions.md` | D-50 | 8660-8682 | 8697-8718 |
| `foundations/decisions.md` | D-184 | 8775-8789 | 8819-8832 |
| `foundations/decisions.md` | D-241 | 8966-9024 | 9015-9072 |
| `foundations/invariants.md` | simulation-inputs | 226-235 | 226-234 |
| `foundations/invariants.md` | simulation-isolation | 214-225 | 214-224 |
| `foundations/glossary.md` | at the camp | 93-98 | 93-97 |
| `foundations/glossary.md` | manual map run | 136-141 | 136-140 |
| `foundations/glossary.md` | earning loop | 223-228 | 223-227 |
