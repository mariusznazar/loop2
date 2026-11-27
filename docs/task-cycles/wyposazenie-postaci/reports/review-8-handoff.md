# Handoff — review-8: a reviewer of Slice 8

## Delegation

Mariusz, the product's owner, delegated the intermediate choices of this task cycle to the orchestrator that dispatches you; the orchestrator's answers are never his approval. You never ask the human; a question goes back by returning `questions`.

## What you review and where

- Worktree (your working directory, the repository's root): `the task's worktree`, branch `task/wyposazenie-postaci`. You are read-only: you change no tracked file and make no commit. The pinned the-way is its `.the-way` (`6ed3cb364adedacea214d2a0df690cea32f2e72f`).
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), variant: a planned slice. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes. You are an agent that did not make the change.
- Range to review: `78a70000..04a81323` (`git diff 78a70000..04a81323`; read the full diff of the range). Slice: Slice 8.
- The author's report (the executor's, which you read with the range): `docs/task-cycles/wyposazenie-postaci/reports/executor-8-report.md`.
- Step 4 answers: trust boundary **yes** — `src/browser/sim/saved-game.ts`, `src/browser/view/judging-cache.ts` and `assets/icons/**` are trust boundaries; check crafted input at the boundary this slice touches (a saved state or stored value with a wrong type, a slot an item does not fit, an unknown item, a non-integer or negative count, a missing or extra field, a prototype key), and that every refusal is whole and throws nothing. Irreversible operation: no.
- The mechanical check made by the orchestrator found, as information for you and not a finding: the files of the range outside the slice's *Change* are listed in the executor's report under "Files outside the slice's *Change*"; judge each against the Goal.

- Your report: `docs/task-cycles/wyposazenie-postaci/reports/%s-report.md` (the report file is the input of the cycle's scripts: `task-cycle/remarks_check.py` reads it). Its FIRST line is `PASS <sha>` or `FAIL <sha>` (the head you reviewed, or `questions`), as your method gives; it holds each blocking finding with its grade, its place `file:line` and the reviewer's mark of contradiction with the settlements where it has one, Minor findings and findings outside the task's scope apart, the checks you ran with command and exit code, **Unread material**, **Searches not found or unclear** (each `none` where none) and the line on your working copies. Return that first line, the report's path and a one-line check result.
- Your directory for working copies: `.runs/review-8/`.

Working copies (the first paragraph of the section "Working copies" of the cycle's skill, word for word):

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way` populated, and the dependencies those checks need installed as the product's own rules give, before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and command of a probe that shows a finding among them, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## What binds, and what to read

- The record directory `docs/task-cycles/wyposazenie-postaci/` also holds `cycle.md` and other agents' handoffs and reports: not yours to read unless named here. Frozen task (Polish): `docs/task-cycles/wyposazenie-postaci/task_frozen.md`; plan: `docs/task-cycles/wyposazenie-postaci/plan.md`; no spec.
- The foundation entries of this task are written (D-451–D-463, the changed decisions, the glossary term `gear`, the fact `game-icons-gloves-title`); the plan's names F1–F34 are mapped to them below; F32 is the new decision D-463. `python -B .the-way/elements/common/foundation_check.py` reports a known count of `decision:` citation errors of tests that Slices 4, 4b and 18 fix; any other error is a finding.
- The slice's text and what its executor was given to read follow, with current ranges of the entries; you read what you need to judge the slice against the task, the plan's slice and the foundation (select your own foundation and guidelines by the parts the diff touches, as your method gives).

## Your slice, from `plan.md`, word for word

### Slice 8 — „Załóż” in combat, the first wolf attack's discoveries and the saved document

- **Goal:** „Załóż” acts in a combat turn: it takes the character's turn, in which the wolf acts as always, and changes the gear and the backpack of the turn as outside combat, at once (row 20, F7, F4); the combat pick takes it, with the refusals of Slice 7. In the minutes of an attack its rule is not amber with „trwa walka” and can be the rule the first turn would choose, and outside them it is not amber with „tylko w walce” (F8, `rule-state-from-pick`). A turn's action may be it (`CombatCharacterAction`); `src/browser/sim/saved-game.ts` reads it as an action of a turn and reads the record's kinds with it, the version staying 11 and the document rewritten as in Slice 4. The first wolf attack brings „Załóż” and „Puste” into the Understanding (F17): `tests/sim/discovery.test.mjs` and `tests/sim/data.test.mjs` take them, and pass again, as `tests/sim/saved-game.test.mjs` does. The condition „Puste” checked before each turn sees the gear as the turn before left it (*To do* 5). Tests in `tests/sim/gear-combat-wear.test.mjs` (new, listed in `stryker.config.json`).
- **Change:** `tests/sim/saved-game.test.mjs` · `src/browser/sim/types.ts` · `src/browser/sim/combat.ts` · `src/browser/sim/program.ts` ·
  `src/browser/sim/saved-game.ts` · `tests/sim/discovery.test.mjs` · `tests/sim/data.test.mjs` ·
  `tests/sim/gear-combat-wear.test.mjs` · `stryker.config.json`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:35-35` To do · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:37-39` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:139-140` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:274-276` Settlements to record ·
  `foundations/part_map.md:34-66` simulation · `foundations/decisions.md:6885-6924` D-140 ·
  `foundations/decisions.md:10162-10198` D-309 · `foundations/decisions.md:6968-6988` D-143 ·
  `foundations/decisions.md:6989-7011` D-144 · `foundations/decisions.md:10199-10234` D-310 ·
  `foundations/invariants.md:1228-1237` rule-state-from-pick · `foundations/invariants.md:1048-1057` save-version ·
  `foundations/glossary.md:174-179` combat turn · `foundations/glossary.md:123-129` Understanding ·
  F4 · F7 · F8 · F17 · F27 · F28 ·
  `tests/sim/saved-game.test.mjs:1-93` · `tests/sim/saved-game.test.mjs:740-1093` · `tests/sim/saved-game.test.mjs:2885-2910` ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/coding-saved-game.md` ·
  `guidelines/testing.md`
- **Model:** same — it joins the combat, the signs of the rules and the saved document for one action.
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/gear-combat-wear.test.mjs` (written first, failing) · `npm test -- tests/sim/saved-game.test.mjs` ·
  `npm test -- tests/sim/discovery.test.mjs` · `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/rule-signs.test.mjs` ·
  `npm test -- tests/sim/encounters.test.mjs` · `npm test -- tests/quality/test_mutation_test_selection.py` · `npm run typecheck`
- **Depends on:** Slice 7 · F4 · F7 · F8 · F17

## The foundation entries the slice names as F-numbers (the plan's *Foundation entries*), by their entries now

| Plan's name | Entry | Current range |
|---|---|---|
| F4 | `D-144` in `foundations/decisions.md` | 7014-7041 |
| F7 | `D-140` in `foundations/decisions.md` | 6904-6946 |
| F8 | `D-309` in `foundations/decisions.md` | 10213-10252 |
| F17 | `D-143` in `foundations/decisions.md` | 6991-7012 |
| F27 | `D-458` in `foundations/decisions.md` | 12803-12816 |
| F28 | `D-459` in `foundations/decisions.md` | 12818-12831 |

## Current ranges of the foundation entries and the plan's *Choices* named in the slice's *Read* (they hold where they differ from the plan's)

| File | Label | Plan's range | Current range |
|---|---|---|---|
| `foundations/part_map.md` | simulation | 34-66 | 34-65 |
| `foundations/decisions.md` | D-140 | 6885-6924 | 6904-6946 |
| `foundations/decisions.md` | D-309 | 10162-10198 | 10213-10252 |
| `foundations/decisions.md` | D-143 | 6968-6988 | 6991-7012 |
| `foundations/decisions.md` | D-144 | 6989-7011 | 7014-7041 |
| `foundations/decisions.md` | D-310 | 10199-10234 | 10254-10288 |
| `foundations/invariants.md` | rule-state-from-pick | 1228-1237 | 1228-1236 |
| `foundations/invariants.md` | save-version | 1048-1057 | 1048-1056 |
| `foundations/glossary.md` | combat turn | 174-179 | 174-178 |
| `foundations/glossary.md` | Understanding | 123-129 | 123-128 |
