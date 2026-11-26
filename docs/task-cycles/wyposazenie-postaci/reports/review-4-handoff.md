# Handoff — review-4: a reviewer of Slice 4

## Delegation

Mariusz, the product's owner, delegated the intermediate choices of this task cycle to the orchestrator that dispatches you; the orchestrator's answers are never his approval. You never ask the human; a question goes back by returning `questions`.

## What you review and where

- Worktree (your working directory, the repository's root): `the task's worktree`, branch `task/wyposazenie-postaci`. You are read-only: you change no tracked file and make no commit. The pinned the-way is its `.the-way` (`6ed3cb364adedacea214d2a0df690cea32f2e72f`).
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), variant: a planned slice. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes. You are an agent that did not make the change.
- Range to review: `ad07d536..5714afbd` (`git diff ad07d536..5714afbd`; read the full diff of the range). Slice: Slice 4.
- The author's report (the executor's, which you read with the range): `docs/task-cycles/wyposazenie-postaci/reports/executor-4-report.md`.
- Step 4 answers: trust boundary **yes** — `src/browser/sim/saved-game.ts`, `src/browser/view/judging-cache.ts` and `assets/icons/**` are trust boundaries; check crafted input at the boundary this slice touches (a saved state or stored value with a wrong type, a slot an item does not fit, an unknown item, a non-integer or negative count, a missing or extra field, a prototype key), and that every refusal is whole and throws nothing. Irreversible operation: no.
- The mechanical check made by the orchestrator found, as information for you and not a finding: the files of the range outside the slice's *Change* are listed in the executor's report under "Files outside the slice's *Change*"; judge each against the Goal.

- Your report: `docs/task-cycles/wyposazenie-postaci/reports/%s-report.md` (the report file is the input of the cycle's scripts: `task-cycle/remarks_check.py` reads it). Its FIRST line is `PASS <sha>` or `FAIL <sha>` (the head you reviewed, or `questions`), as your method gives; it holds each blocking finding with its grade, its place `file:line` and the reviewer's mark of contradiction with the settlements where it has one, Minor findings and findings outside the task's scope apart, the checks you ran with command and exit code, **Unread material**, **Searches not found or unclear** (each `none` where none) and the line on your working copies. Return that first line, the report's path and a one-line check result.
- Your directory for working copies: `.runs/review-4/`.

Working copies (the first paragraph of the section "Working copies" of the cycle's skill, word for word):

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way` populated, and the dependencies those checks need installed as the product's own rules give, before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and command of a probe that shows a finding among them, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## What binds, and what to read

- The record directory `docs/task-cycles/wyposazenie-postaci/` also holds `cycle.md` and other agents' handoffs and reports: not yours to read unless named here. Frozen task (Polish): `docs/task-cycles/wyposazenie-postaci/task_frozen.md`; plan: `docs/task-cycles/wyposazenie-postaci/plan.md`; no spec.
- The foundation entries of this task are written (D-451–D-463, the changed decisions, the glossary term `gear`, the fact `game-icons-gloves-title`); the plan's names F1–F34 are mapped to them below; F32 is the new decision D-463. `python -B .the-way/elements/common/foundation_check.py` reports a known count of `decision:` citation errors of tests that Slices 4, 4b and 18 fix; any other error is a finding.
- The slice's text and what its executor was given to read follow, with current ranges of the entries; you read what you need to judge the slice against the task, the plan's slice and the foundation (select your own foundation and guidelines by the parts the diff touches, as your method gives).

## Your slice, from `plan.md`, word for word

### Slice 4 — The strike takes the stick from the main hand, and combat carries the gear and the backpack

- **Goal:** „Uderz — patyk” takes its stick from the main hand and from no other slot (row 16, F4, F25). Where the main hand is empty and the backpack holds a stick, the strike first takes one stick from the backpack into the main hand and strikes in the same turn, with no time of its own (row 18, F26). After a strike the stick stays in the main hand, unchanged (F5). With a stick neither in the main hand nor in the backpack the combat rule is passed over with „brakuje 1 × patyk” (row 24, F6); „tylko w walce” outside combat stays. An encounter keeps the character's gear and backpack from turn to turn: the conditions and the refusals of each turn read them as the turns before left them, `resolveCombat` gives them after the fight in its `CombatResult`, and the map run takes them when the turns resolve (`src/browser/sim/run.ts`, where the result of `resolveCombat` lands); an exchange marks a refill, so that the view shows it as an element of its own before the strike's (Slice 12, *To do* 3). The words of the refill, „bierze patyk z plecaka do ręki” (row 25), stand in the game's data, beside the place's words of Slice 1 in `src/browser/sim/data/gear.ts`. `src/browser/sim/saved-game.ts` reads the new fields of a combat result and the refill mark strictly — a backpack over the carrying capacity, gear that does not fit and a mark of no boolean refused as shape — and writes them; the version stays 11, and the document in `tests/sim/saved-game.test.mjs` is rewritten under the comment the saved-game guidelines ask for, since no saved game state of version 11 exists anywhere yet. A stick taken into the hand is taken by no action that takes pieces from the backpack (row 10). Tests in `tests/sim/gear-combat.test.mjs` (new, listed in `stryker.config.json`); the cases of `tests/sim/combat.test.mjs` whose stick now goes into the hand change by the rule "Changing an existing test", their reason being F4 and F5.
- **Change:** `tests/sim/saved-game.test.mjs` · `src/browser/sim/types.ts` · `src/browser/sim/combat.ts` · `src/browser/sim/program.ts` ·
  `src/browser/sim/run.ts` · `src/browser/sim/saved-game.ts` · `src/browser/sim/data/gear.ts` ·
  `tests/sim/gear-combat.test.mjs` · `tests/sim/combat.test.mjs` · `stryker.config.json`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:30-31` To do · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:33-33` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:37-37` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:138-138` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:258-259` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:270-272` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:278-279` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/plan.md:602-618` Choices ·
  `foundations/part_map.md:34-66` simulation · `foundations/decisions.md:6989-7011` D-144 ·
  `foundations/decisions.md:7012-7034` D-145 · `foundations/decisions.md:8332-8348` D-380 ·
  `foundations/decisions.md:6885-6924` D-140 · `foundations/decisions.md:8041-8084` D-23 ·
  `foundations/decisions.md:7053-7085` D-147 · `foundations/decisions.md:10199-10234` D-310 ·
  `foundations/invariants.md:248-263` program-rule-pick · `foundations/invariants.md:1048-1057` save-version ·
  `foundations/invariants.md:226-235` simulation-inputs · `foundations/glossary.md:174-179` combat turn ·
  F1 · F3 · F4 · F5 · F6 · F24 · F25 · F26 ·
  `tests/sim/saved-game.test.mjs:1-93` · `tests/sim/saved-game.test.mjs:740-1093` ·
  `tests/sim/saved-game.test.mjs:2885-2910` · `tests/sim/saved-game.test.mjs:3192-3251` ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/coding-content-data.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md`
- **Model:** strongest — it threads the state of an encounter through the turns that the pick, the conditions and the saved document all read.
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/gear-combat.test.mjs` (written first, failing) · `npm test -- tests/sim/combat.test.mjs` ·
  `npm test -- tests/sim/encounters.test.mjs` · `npm test -- tests/sim/saved-game.test.mjs` ·
  `npm test -- tests/sim/rule-signs.test.mjs` · `npm test -- tests/invariants/test_program_rule_pick.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` · `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm run typecheck`
- **Depends on:** Slice 3 · F1 · F3 · F4 · F5 · F6 · F26

## The foundation entries the slice names as F-numbers (the plan's *Foundation entries*), by their entries now

| Plan's name | Entry | Current range |
|---|---|---|
| F1 | `D-451` in `foundations/decisions.md` | 12698-12711 |
| F3 | `D-23` in `foundations/decisions.md` | 8072-8118 |
| F4 | `D-144` in `foundations/decisions.md` | 7014-7041 |
| F5 | `D-145` in `foundations/decisions.md` | 7043-7064 |
| F6 | `D-380` in `foundations/decisions.md` | 8367-8384 |
| F24 | `D-455` in `foundations/decisions.md` | 12758-12771 |
| F25 | `D-456` in `foundations/decisions.md` | 12773-12786 |
| F26 | `D-457` in `foundations/decisions.md` | 12788-12801 |

## Current ranges of the foundation entries and the plan's *Choices* named in the slice's *Read* (they hold where they differ from the plan's)

| File | Label | Plan's range | Current range |
|---|---|---|---|
| `docs/task-cycles/wyposazenie-postaci/plan.md` | Choices | 602-618 | 612-628 |
| `foundations/part_map.md` | simulation | 34-66 | 34-65 |
| `foundations/decisions.md` | D-144 | 6989-7011 | 7014-7041 |
| `foundations/decisions.md` | D-145 | 7012-7034 | 7043-7064 |
| `foundations/decisions.md` | D-380 | 8332-8348 | 8367-8384 |
| `foundations/decisions.md` | D-140 | 6885-6924 | 6904-6946 |
| `foundations/decisions.md` | D-23 | 8041-8084 | 8072-8118 |
| `foundations/decisions.md` | D-147 | 7053-7085 | 7084-7115 |
| `foundations/decisions.md` | D-310 | 10199-10234 | 10254-10288 |
| `foundations/invariants.md` | program-rule-pick | 248-263 | 248-262 |
| `foundations/invariants.md` | save-version | 1048-1057 | 1048-1056 |
| `foundations/invariants.md` | simulation-inputs | 226-235 | 226-234 |
| `foundations/glossary.md` | combat turn | 174-179 | 174-178 |
