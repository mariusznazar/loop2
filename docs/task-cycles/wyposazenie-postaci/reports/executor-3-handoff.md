# Handoff — executor-3: the executor of Slice 3

## Delegation

Mariusz, the product's owner, delegated the intermediate choices of this task cycle to the orchestrator that dispatches you; the orchestrator's answers are never his approval. You never ask the human; a question goes back to the orchestrator by returning `questions`.

## Where you work

- Worktree (your working directory, the repository's root): `the task's worktree`, branch `task/wyposazenie-postaci`. The pinned the-way is its `.the-way` (`6ed3cb364adedacea214d2a0df690cea32f2e72f`); dependencies are installed (`node_modules`). Commit on this branch, by path (`git add <path>…`, never `git add -A`), with English commit messages in the style of the repository's log.
- Slice base (written before you were dispatched): `ad81cec4`. Your range is from that base.
- Stage: one slice of a planned change. Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant: "a slice, or the retry of a slice". Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Boundary: you make only this slice's Goal, in the files its *Change* names (a file outside it only where the Goal cannot be met without, named in your report). You never run the product's gate (`npm test` without a file, the whole suite); you run the focused checks of the slice's *Checks* and the checks your method asks for. You write no foundation entry (they stand already, written before slice 1) unless the slice says so.
- Class and model asked for: `strongest`.
- Your report: `docs/task-cycles/wyposazenie-postaci/reports/executor-3-report.md` (the report file is the input of the cycle's scripts: `task-cycle/remarks_check.py` reads it). Its first line is your status; it holds your commits, each check with its command and exit code, the tests that fail on your slice's base and their result there, **Unread material**, **Searches not found or unclear** (each `none` where none), your own-work check and the line on your working copies. Return status, commits, a one-line check result naming what failed or did not run, and the report's path.

- Your directory for working copies: `.runs/executor-3/`.

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

### Slice 3 — The gear at the start and the end of each map run

- **Goal:** Every map run starts with the character's gear and gives it back at its end, by the functions of `src/browser/sim/gear.ts` (Slice 2), so that `src/browser/sim/game.ts`, near the 800 lines D-425 allows, grows only by their calls. Starts: each map run of an earning loop starts with the gear the game keeps at the character (`beginRun` in `src/browser/sim/loop.ts`), and the start of an earning loop clears the character's changed slots; each of the twelve runs of a judging starts with that gear and takes nothing of it or of the chest (`judgeOnSeeds` in `src/browser/sim/judging.ts`; F12, row 5, *To do* 9) — for the character of a manual map run the gear it entered with, for one in an earning loop the gear of its next map run. Ends of a manual map run: at the completion, in its game minute together with the deposit to the chest and the practice, the map run's gear becomes the character's; at „Zakończ” and „Restart” before a completion, at that act; at a death with a use of the resurrection, the one that spends the last use included, when `settleDeath` settles it (rows 2, 26). A death with no use of the resurrection left takes the gear, also of a character with no practice, whose death takes nothing else but the backpack and spends no use (rows 2, 27, F10): `teamAfterDeath` decides it by the uses at the moment of the settlement, and a death settled once never settles again (`death-settled-once`). Ends of a map run of an earning loop (`takeEnd` and `stopLoop`, in the open game and in the catch-up alike): slot by slot, a slot the player changed keeps the player's choice and the piece the map run left there goes to the chest, and is lost where the chest has no room, as loot beyond its free room is; any other slot takes what the map run left; a death with no use left takes the map run's gear, a slot the player changed keeping the player's choice; the changed slots are cleared (row 28, F29, *To do* 7). The gear comes back whole, beyond the map's exit cap and outside the frozen bring list, and a piece the map run moved from the gear into the backpack shares the backpack's fate (row 26, F11, F9); `trip-transfer` and `trip-run-end` hold as they stand. Tests in `tests/sim/gear-transfer.test.mjs` (new, listed in `stryker.config.json`): each end above, the catch-up giving the same character and chest as the game run without a break (`catch-up-state`), and the judging leaving the gear and the chest as they were.
- **Change:** `src/browser/sim/gear.ts` · `src/browser/sim/game.ts` · `src/browser/sim/loop.ts` · `src/browser/sim/judging.ts` ·
  `tests/sim/gear-transfer.test.mjs` · `stryker.config.json`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:29-29` To do · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:40-47` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:81-86` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:141-143` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:169-173` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:258-264` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:280-282` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/plan.md:602-618` Choices ·
  `foundations/part_map.md:34-66` simulation · `foundations/decisions.md:6415-6447` D-190 ·
  `foundations/decisions.md:8762-8774` D-183 · `foundations/decisions.md:8830-8844` D-187 ·
  `foundations/decisions.md:8683-8698` D-179 · `foundations/decisions.md:8865-8885` D-189 ·
  `foundations/decisions.md:8966-9024` D-241 · `foundations/decisions.md:9164-9201` D-245 ·
  `foundations/decisions.md:6594-6631` D-221 · `foundations/decisions.md:12484-12510` D-439 ·
  `foundations/decisions.md:8935-8965` D-240 · `foundations/decisions.md:854-872` D-425 ·
  `foundations/invariants.md:978-987` trip-transfer · `foundations/invariants.md:988-997` trip-run-end ·
  `foundations/invariants.md:1078-1087` death-settled-once · `foundations/invariants.md:1148-1157` catch-up-state ·
  `foundations/invariants.md:1068-1077` resurrection-renewal · `foundations/invariants.md:1428-1437` function-and-file-size ·
  `foundations/glossary.md:142-147` completion · `foundations/glossary.md:211-216` resurrection ·
  `foundations/glossary.md:308-313` judging · F9 · F10 · F11 · F12 · F21 · F29 ·
  `src/browser/sim/types.ts` · `src/browser/sim/trip.ts` · `src/browser/sim/run.ts:385-450` ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md`
- **Model:** strongest — every end of a map run, the settling of a death, the catch-up and the merge of an earning loop meet here, and a wrong merge loses a piece silently.
- **Risk:** none
- **Checks:** `npm test -- tests/sim/gear-transfer.test.mjs` (written first, failing) · `npm test -- tests/sim/death.test.mjs` ·
  `npm test -- tests/sim/loop.test.mjs` · `npm test -- tests/sim/catch-up.test.mjs` · `npm test -- tests/sim/completion.test.mjs` ·
  `npm test -- tests/sim/judging.test.mjs` · `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/quality/test_function_and_file_size.py` · `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm run typecheck`
- **Depends on:** Slice 2 · F9 · F10 · F11 · F12 · F29

## The foundation entries the slice names as F-numbers (the plan's *Foundation entries*), by their entries now

| Plan's name | Entry | Current range |
|---|---|---|
| F9 | `D-187` in `foundations/decisions.md` | 8874-8892 |
| F10 | `D-190` in `foundations/decisions.md` | 6424-6465 |
| F11 | `D-183` in `foundations/decisions.md` | 8799-8817 |
| F12 | `D-439` in `foundations/decisions.md` | 12556-12589 |
| F21 | `D-452` in `foundations/decisions.md` | 12713-12726 |
| F29 | `D-460` in `foundations/decisions.md` | 12833-12846 |

## Current ranges of the foundation entries and the plan's *Choices* named in the slice's *Read* (they hold where they differ from the plan's)

| File | Label | Plan's range | Current range |
|---|---|---|---|
| `docs/task-cycles/wyposazenie-postaci/plan.md` | Choices | 602-618 | 612-628 |
| `foundations/part_map.md` | simulation | 34-66 | 34-65 |
| `foundations/decisions.md` | D-190 | 6415-6447 | 6424-6465 |
| `foundations/decisions.md` | D-183 | 8762-8774 | 8799-8817 |
| `foundations/decisions.md` | D-187 | 8830-8844 | 8874-8892 |
| `foundations/decisions.md` | D-179 | 8683-8698 | 8720-8734 |
| `foundations/decisions.md` | D-189 | 8865-8885 | 8914-8933 |
| `foundations/decisions.md` | D-241 | 8966-9024 | 9015-9072 |
| `foundations/decisions.md` | D-245 | 9164-9201 | 9213-9249 |
| `foundations/decisions.md` | D-221 | 6594-6631 | 6613-6649 |
| `foundations/decisions.md` | D-439 | 12484-12510 | 12556-12589 |
| `foundations/decisions.md` | D-240 | 8935-8965 | 8984-9013 |
| `foundations/decisions.md` | D-425 | 854-872 | 854-871 |
| `foundations/invariants.md` | trip-transfer | 978-987 | 978-986 |
| `foundations/invariants.md` | trip-run-end | 988-997 | 988-996 |
| `foundations/invariants.md` | death-settled-once | 1078-1087 | 1078-1086 |
| `foundations/invariants.md` | catch-up-state | 1148-1157 | 1148-1156 |
| `foundations/invariants.md` | resurrection-renewal | 1068-1077 | 1068-1076 |
| `foundations/invariants.md` | function-and-file-size | 1428-1437 | 1428-1436 |
| `foundations/glossary.md` | completion | 142-147 | 142-146 |
| `foundations/glossary.md` | resurrection | 211-216 | 211-215 |
| `foundations/glossary.md` | judging | 308-313 | 308-312 |
