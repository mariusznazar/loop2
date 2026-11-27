# Handoff — executor-21: the executor of Slice 21

## Delegation

Mariusz, the product's owner, delegated the intermediate choices of this task cycle to the orchestrator that dispatches you; the orchestrator's answers are never his approval. You never ask the human; a question goes back to the orchestrator by returning `questions`.

## Where you work

- Worktree (your working directory, the repository's root): `the task's worktree`, branch `task/wyposazenie-postaci`. The pinned the-way is its `.the-way` (`6ed3cb364adedacea214d2a0df690cea32f2e72f`); dependencies are installed (`node_modules`). Commit on this branch, by path (`git add <path>…`, never `git add -A`), with English commit messages in the style of the repository's log.
- Slice base (written before you were dispatched): `7898151d`. Your range is from that base.
- Stage: one slice of a planned change. Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant: "a slice, or the retry of a slice". Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Boundary: you make only this slice's Goal, in the files its *Change* names (a file outside it only where the Goal cannot be met without, named in your report). You never run the product's gate (`npm test` without a file, the whole suite); you run the focused checks of the slice's *Checks* and the checks your method asks for. You write no foundation entry (they stand already, written before slice 1) unless the slice says so.
- Class and model asked for: `cheaper`.
- Your report: `docs/task-cycles/wyposazenie-postaci/reports/executor-21-report.md` (the report file is the input of the cycle's scripts: `task-cycle/remarks_check.py` reads it). Its first line is your status; it holds your commits, each check with its command and exit code, the tests that fail on your slice's base and their result there, **Unread material**, **Searches not found or unclear** (each `none` where none), your own-work check and the line on your working copies. Return status, commits, a one-line check result naming what failed or did not run, and the report's path.

- Your directory for working copies: `.runs/executor-21/`.

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

### Slice 21 — The balance instrument starts a measurement with the character's gear

- **Goal:** The gear of the measured character is a parameter of the starting state of a measurement, as its skills are (*To do* 13): `makeState` in `balance/engine.mjs` puts it on the created character and `startOf` gives it to `newMapRun`, so that a map run starts as the game starts one (`instrument-game-agreement`); `runOnce` and `sweep` take it; the commands `sweep`, `trace`, `check-map` and `progression` take a flag `--gear` of pairs `slot=item`, such as `mainHand=stick`, an unknown slot, an unknown item or an item that does not fit its slot refused with the usage error, the slots and fits read from the built game's data; with no flag the new character's empty gear, so that the stick of a take list reaches the main hand at the first strike (Slice 4). `tests/balance/agreement.test.mjs` shows a seed with a stick in the main hand ending alike in the game and in the instrument; `tests/balance/gear.test.mjs` (new) the parameter and the flag; `.claude/skills/loop2-balance/SKILL.md` names the flag. Then, Las — matecznik standing in the game, one run of `npm run --silent balance -- progression --maps forestLair --gear mainHand=stick --out .runs/<directory of this slice's agent>/lair.md`, and the report gives the share of seeds its best program solves, for the request's description (*To do* 15); a seed solved goes to the human as a finding and the paragraph of D-438 stays as it is.
- **Change:** `balance/engine.mjs` · `balance/check-map.mjs` · `balance/progression.mjs` · `balance/trace.mjs` · `balance/cli.mjs` ·
  `tests/balance/agreement.test.mjs` · `tests/balance/gear.test.mjs` · `.claude/skills/loop2-balance/SKILL.md`
- **Read:** `.claude/skills/loop2-balance/SKILL.md` · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:59-61` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:243-245` Decisions in play ·
  `foundations/part_map.md:128-139` balance-tools · `foundations/part_map.md:140-159` agent-workflow ·
  `foundations/decisions.md:6167-6185` D-438 · `foundations/decisions.md:918-932` D-437 ·
  `foundations/decisions.md:12448-12464` D-428 · `foundations/decisions.md:12465-12479` D-429 ·
  `foundations/invariants.md:1438-1447` instrument-game-agreement · `foundations/invariants.md:1448-1457` balance-instrument-file-writes ·
  `foundations/invariants.md:1458-1467` balance-instrument-repeatability · `foundations/glossary.md:296-301` overlay ·
  `tests/balance/cli.test.mjs` · `tests/agent_workflow/test_loop2_balance_skill.py` ·
  `guidelines/coding.md` · `guidelines/coding-balance-instrument.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/balance/gear.test.mjs` (written first, failing) · `npm test -- tests/balance/agreement.test.mjs` ·
  `npm test -- tests/balance/engine.test.mjs` · `npm test -- tests/balance/cli.test.mjs` · `npm test -- tests/balance/check-map.test.mjs` ·
  `npm test -- tests/balance/progression.test.mjs` · `npm test -- tests/balance/trace.test.mjs` ·
  `npm test -- tests/invariants/test_balance_instrument_file_writes.py` ·
  `npm test -- tests/invariants/test_balance_instrument_repeatability.py` ·
  `npm test -- tests/agent_workflow/test_loop2_balance_skill.py`
- **Depends on:** Slice 20 · Slice 4

## The foundation entries the slice names as F-numbers (the plan's *Foundation entries*), by their entries now

| Plan's name | Entry | Current range |
|---|---|---|

## Current ranges of the foundation entries and the plan's *Choices* named in the slice's *Read* (they hold where they differ from the plan's)

| File | Label | Plan's range | Current range |
|---|---|---|---|
| `foundations/part_map.md` | balance-tools | 128-139 | 128-138 |
| `foundations/part_map.md` | agent-workflow | 140-159 | 140-158 |
| `foundations/decisions.md` | D-438 | 6167-6185 | 6176-6193 |
| `foundations/decisions.md` | D-437 | 918-932 | 918-931 |
| `foundations/decisions.md` | D-428 | 12448-12464 | 12520-12535 |
| `foundations/decisions.md` | D-429 | 12465-12479 | 12537-12550 |
| `foundations/invariants.md` | instrument-game-agreement | 1438-1447 | 1438-1446 |
| `foundations/invariants.md` | balance-instrument-file-writes | 1448-1457 | 1448-1456 |
| `foundations/invariants.md` | balance-instrument-repeatability | 1458-1467 | 1458-1466 |
| `foundations/glossary.md` | overlay | 296-301 | 296-300 |
