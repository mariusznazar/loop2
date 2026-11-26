# Handoff — executor-22: the executor of Slice 22

## Delegation

Mariusz, the product's owner, delegated the intermediate choices of this task cycle to the orchestrator that dispatches you; the orchestrator's answers are never his approval. You never ask the human; a question goes back to the orchestrator by returning `questions`.

## Where you work

- Worktree (your working directory, the repository's root): `the task's worktree`, branch `task/wyposazenie-postaci`. The pinned the-way is its `.the-way` (`6ed3cb364adedacea214d2a0df690cea32f2e72f`); dependencies are installed (`node_modules`). Commit on this branch, by path (`git add <path>…`, never `git add -A`), with English commit messages in the style of the repository's log.
- Slice base (written before you were dispatched): `abcfad51`. Your range is from that base.
- Stage: one slice of a planned change. Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant: "a slice, or the retry of a slice". Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Boundary: you make only this slice's Goal, in the files its *Change* names (a file outside it only where the Goal cannot be met without, named in your report). You never run the product's gate (`npm test` without a file, the whole suite); you run the focused checks of the slice's *Checks* and the checks your method asks for. You write no foundation entry (they stand already, written before slice 1) unless the slice says so.
- Class and model asked for: `cheaper`.
- Your report: `docs/task-cycles/wyposazenie-postaci/reports/executor-22-report.md` (the report file is the input of the cycle's scripts: `task-cycle/remarks_check.py` reads it). Its first line is your status; it holds your commits, each check with its command and exit code, the tests that fail on your slice's base and their result there, **Unread material**, **Searches not found or unclear** (each `none` where none), your own-work check and the line on your working copies. Return status, commits, a one-line check result naming what failed or did not run, and the report's path.

- Your directory for working copies: `.runs/executor-22/`.

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

### Slice 22 — The instrument's earning loop and campaign with gear

- **Goal:** The command `loop` takes the flag `--gear` of Slice 21 and starts the earning loop with that gear on the character; a player description of `campaign` takes an optional field `gear` of slots and items, read and refused as the description's other fields are (`balance/describe.mjs`), and the campaign puts that gear on the character with the game's own act of Slice 2 from what the chest holds, with no copy of a rule of the game (rule "Przejście mapy jak w grze"); with neither, the empty gear of a new character. `.claude/skills/loop2-balance/SKILL.md` names both. Tests in `tests/balance/loop.test.mjs` and `tests/balance/campaign.test.mjs`.
- **Change:** `balance/loop.mjs` · `balance/campaign.mjs` · `balance/describe.mjs` · `balance/cli.mjs` ·
  `tests/balance/loop.test.mjs` · `tests/balance/campaign.test.mjs` · `.claude/skills/loop2-balance/SKILL.md`
- **Read:** `.claude/skills/loop2-balance/SKILL.md` · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:59-59` To do ·
  `foundations/part_map.md:128-139` balance-tools · `foundations/decisions.md:918-932` D-437 ·
  `foundations/decisions.md:12448-12464` D-428 · `foundations/invariants.md:1438-1447` instrument-game-agreement ·
  `foundations/invariants.md:1448-1457` balance-instrument-file-writes · `tests/balance/campaign-fixture.mjs` ·
  `tests/agent_workflow/test_loop2_balance_skill.py` ·
  `guidelines/coding.md` · `guidelines/coding-balance-instrument.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/balance/loop.test.mjs` (its new cases written first, failing) · `npm test -- tests/balance/campaign.test.mjs` ·
  `npm test -- tests/balance/cli.test.mjs` · `npm test -- tests/invariants/test_balance_instrument_file_writes.py` ·
  `npm test -- tests/agent_workflow/test_loop2_balance_skill.py`
- **Depends on:** Slice 21 · Slice 2

## The foundation entries the slice names as F-numbers (the plan's *Foundation entries*), by their entries now

| Plan's name | Entry | Current range |
|---|---|---|

## Current ranges of the foundation entries and the plan's *Choices* named in the slice's *Read* (they hold where they differ from the plan's)

| File | Label | Plan's range | Current range |
|---|---|---|---|
| `foundations/part_map.md` | balance-tools | 128-139 | 128-138 |
| `foundations/decisions.md` | D-437 | 918-932 | 918-931 |
| `foundations/decisions.md` | D-428 | 12448-12464 | 12520-12535 |
| `foundations/invariants.md` | instrument-game-agreement | 1438-1447 | 1438-1446 |
| `foundations/invariants.md` | balance-instrument-file-writes | 1448-1457 | 1448-1456 |

## Additions of the orchestrator (they bind with the slice's text)

- Slice 21's executor left this open (its report, concerns): the earning-loop columns of `check-map` (`balance/check-map.mjs`) still start with an empty gear, because `balance/loop.mjs` was outside Slice 21; with `--gear` the sweep columns and the loop columns of one row measure different characters. Task *To do* 13 asks that the gear of the measured character is a parameter of the starting state in ALL modes of the instrument. So this slice also threads the gear through `loopBalance` (and whatever `check-map.mjs` calls) so that the loop columns of `check-map` start with the gear given to `check-map`; `balance/check-map.mjs` and its test join your *Change* for this (add a case to `tests/balance/check-map.test.mjs` if it holds the loop columns, else a case in a new test file listed as the other balance tests are).
- The twin of the skill, `.agents/skills/loop2-balance/SKILL.md`, must stay byte-identical to `.claude/skills/loop2-balance/SKILL.md` (a skill test requires it); change both.
- Never edit anything under `the main checkout of the repository` outside `.runs/worktrees/wyposazenie-postaci/`.
