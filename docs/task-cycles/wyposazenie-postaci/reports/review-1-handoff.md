# Handoff — review-1: a reviewer of Slice 1 and the foundation entries

## Delegation

Mariusz, the product's owner, delegated the intermediate choices of this task cycle to the orchestrator that dispatches you; the orchestrator's answers are never his approval. You never ask the human; a question goes back by returning `questions`.

## What you review and where

- Worktree (your working directory, the repository's root): `the task's worktree`, branch `task/wyposazenie-postaci`. You are read-only: you change no tracked file and make no commit. The pinned the-way is its `.the-way` (`6ed3cb364adedacea214d2a0df690cea32f2e72f`).
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), variant: a planned slice. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes. You are an agent that did not make the change.
- Range to review: `f2263d05..5639c225` (`git diff f2263d05..5639c225`; read the full diff of the range). Slice: Slice 1 and the foundation entries.
- The author's report (the executor's, which you read with the range): `docs/task-cycles/wyposazenie-postaci/reports/executor-1-report.md`.
- Step 4 answers: trust boundary **yes** — `src/browser/sim/saved-game.ts`, `src/browser/view/judging-cache.ts` and `assets/icons/**` are trust boundaries; check crafted input at the boundary this slice touches (a saved state or stored value with a wrong type, a slot an item does not fit, an unknown item, a non-integer or negative count, a missing or extra field, a prototype key), and that every refusal is whole and throws nothing. Irreversible operation: no.
- The mechanical check made by the orchestrator found, as information for you and not a finding: the files of the range outside the slice's *Change* are listed in the executor's report under "Files outside the slice's *Change*"; judge each against the Goal.

- This range includes the foundation entries the plan's *Foundation entries* lists (commits `97cadd77`, `5360248e`, `45fa435c`, `f91fa619`), written before the slice by three agents; judge them too, against the plan's table of entries (`docs/task-cycles/wyposazenie-postaci/plan.md`, lines 7–53 and the rows of *Settlements to record* in the frozen task). Their reports: `docs/task-cycles/wyposazenie-postaci/reports/foundation-A-report.md`, `foundation-B-report.md`, `foundation-C-report.md` (same directory). Facts to weigh: the foundation check's 14 errors after part B are the known `decision:` citations of tests (Slices 4, 4b and 18 fix them; this slice already changed one line of `tests/sim/data.test.mjs`); F32 was written as the new decision D-463 instead of a change of D-441, whose binding sentences stand at the word limit; part A found that Slices 15–20 of the plan were unread by it. Source fidelity of each entry against its row of *Settlements to record* is yours to check (the glossary term `gear` and D-451 are the projected entries of the approved definition, quoted in the frozen task, lines 250–252).


- Your report: `docs/task-cycles/wyposazenie-postaci/reports/%s-report.md` (the report file is the input of the cycle's scripts: `task-cycle/remarks_check.py` reads it). Its FIRST line is `PASS <sha>` or `FAIL <sha>` (the head you reviewed, or `questions`), as your method gives; it holds each blocking finding with its grade, its place `file:line` and the reviewer's mark of contradiction with the settlements where it has one, Minor findings and findings outside the task's scope apart, the checks you ran with command and exit code, **Unread material**, **Searches not found or unclear** (each `none` where none) and the line on your working copies. Return that first line, the report's path and a one-line check result.
- Your directory for working copies: `.runs/review-1/`.

Working copies (the first paragraph of the section "Working copies" of the cycle's skill, word for word):

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way` populated, and the dependencies those checks need installed as the product's own rules give, before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and command of a probe that shows a finding among them, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## What binds, and what to read

- The record directory `docs/task-cycles/wyposazenie-postaci/` also holds `cycle.md` and other agents' handoffs and reports: not yours to read unless named here. Frozen task (Polish): `docs/task-cycles/wyposazenie-postaci/task_frozen.md`; plan: `docs/task-cycles/wyposazenie-postaci/plan.md`; no spec.
- The foundation entries of this task are written (D-451–D-463, the changed decisions, the glossary term `gear`, the fact `game-icons-gloves-title`); the plan's names F1–F34 are mapped to them below; F32 is the new decision D-463. `python -B .the-way/elements/common/foundation_check.py` reports a known count of `decision:` citation errors of tests that Slices 4, 4b and 18 fix; any other error is a finding.
- The slice's text and what its executor was given to read follow, with current ranges of the entries; you read what you need to judge the slice against the task, the plan's slice and the foundation (select your own foundation and guidelines by the parts the diff touches, as your method gives).

## Your slice, from `plan.md`, word for word

### Slice 1 — Gear in the game state and its saved document

- **Goal:** The game state holds the gear, its data and its saved document, as the plan's *Choices* settle the shape. `src/browser/sim/data/gear.ts` (new) holds the eight slots in their order — „Ręka główna”, „Druga ręka”, „Głowa”, „Tułów”, „Nogi” and three pockets of the belt — each slot of one place (main hand, second hand, head, torso, legs, pocket; the three pockets share the place „Kieszeń”) and holding one piece, the number of pockets one number of the data, and the words of each place's part of the line of the screen of a map run (Slice 15): „w ręku” for the main hand, „pod ręką” for the pockets. The row of an item in `src/browser/sim/data/items.ts` names the place it fits: the stick the main hand, the bandage a pocket (row 17); nothing fits the other places. `src/browser/sim/types.ts`: a gear maps each slot to the item it holds or to none; a character of the team holds the gear the game keeps at it outside a map run (for a character in an earning loop the gear of its next map run), the slots the player changed on the screen Postać since the start of the map run going on of its earning loop (none for any other character), and the count of the gear changes the player made on the screen Postać, from 0 (F32); the character of a map run holds the gear of that map run. A new character has an empty gear, no changed slot and the count 0 (`src/browser/sim/character.ts`, `createCharacter`). A manual map run starts with the character's gear, whole whatever the map's entry cap (F9, row 4), outside the trip plan and the chest (`startRun`); `newMapRun` in `src/browser/sim/run.ts` takes the gear a map run starts with as a parameter after the backpack, empty where none is given, so that the earning loop, the judging and the balance instrument run as before until Slices 3 and 21 give them the character's gear. `src/browser/sim/saved-game.ts` writes the new fields and reads them strictly — each slot present and no other, each held item an item of the data that fits its slot's place, the changed slots a list of slots each once and only at a character with an earning loop, the count a safe integer from 0, the gear of a map run's character read as a character's — and `SAVED_GAME_VERSION` rises to 11. The backpack's cap, „Zapas poniżej”, the backpack line and every action that takes pieces from the backpack read the backpack alone (row 10, F24). Tests: `tests/sim/saved-game.test.mjs` — the document of the current version rewritten at version 11 with a character holding a stick in the main hand and a bandage in a pocket and a character of an earning loop with a changed slot, the document of version 10 kept and refused as another version, crafted documents of version 11 refused whole as shape (a piece in a slot it does not fit, an item the data lack, a slot missing or one more, a changed slot at a character with no earning loop or named twice, a count negative, fractional or no number, a gear of another type), none of them throwing; `tests/sim/gear-state.test.mjs` (new, listed in `stryker.config.json`) — the data's eight slots and their fits, the new character's empty gear, a manual map run entering a map with an entry cap of 0 with the character's gear whole and the chest unchanged by it, and the stick in the main hand counted neither by „Zapas poniżej” nor by the backpack's cap, burnt by no „Zasil — ognisko” and lit by no „Zapal — patyk”. `src/browser/sim/game.ts` stands near the 800 lines D-425 allows a file: keep what is added there to the calls, the gear's own functions in `src/browser/sim/character.ts` or the data.
- **Change:** `tests/sim/saved-game.test.mjs` · `src/browser/sim/data/gear.ts` · `src/browser/sim/data/items.ts` ·
  `src/browser/sim/types.ts` · `src/browser/sim/character.ts` · `src/browser/sim/game.ts` ·
  `src/browser/sim/run.ts` · `src/browser/sim/saved-game.ts` · `tests/sim/gear-state.test.mjs` ·
  `stryker.config.json`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:26-31` To do · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:58-58` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:125-135` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:198-203` Questions carried to cycle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:254-263` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:269-271` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/plan.md:602-618` Choices ·
  `foundations/part_map.md:34-66` simulation · `foundations/decisions.md:6689-6709` D-64 ·
  `foundations/decisions.md:8683-8698` D-179 · `foundations/decisions.md:8830-8844` D-187 ·
  `foundations/decisions.md:3918-3970` D-206 · `foundations/decisions.md:688-732` D-213 ·
  `foundations/decisions.md:4269-4287` D-386 · `foundations/decisions.md:854-872` D-425 ·
  `foundations/invariants.md:1048-1057` save-version · `foundations/invariants.md:978-987` trip-transfer ·
  `foundations/invariants.md:226-235` simulation-inputs · `foundations/invariants.md:214-225` simulation-isolation ·
  `foundations/invariants.md:538-547` character-team · `foundations/glossary.md:18-24` map run ·
  `foundations/glossary.md:223-228` earning loop · F2 · F9 · F21 · F24 · F25 · F32 ·
  `src/browser/sim/loop.ts:63-100` · `src/browser/sim/judging.ts:53-110` · `src/browser/sim/data/balance.ts` ·
  `tests/sim/saved-game.test.mjs:1-93` · `tests/sim/saved-game.test.mjs:740-1093` ·
  `tests/sim/saved-game.test.mjs:1399-1420` · `tests/sim/saved-game.test.mjs:2885-2910` ·
  `tests/sim/saved-game.test.mjs:3192-3251` ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/coding-content-data.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md`
- **Model:** strongest — it settles the shape of the gear that every later slice reads and the strict reading of a trust boundary.
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/gear-state.test.mjs` (written first, failing) · `npm test -- tests/sim/saved-game.test.mjs` ·
  `npm test -- tests/sim/team.test.mjs` · `npm test -- tests/sim/trip.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` · `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm test -- tests/quality/test_function_and_file_size.py` · `npm run typecheck`
- **Depends on:** F2 · F9 · F21 · F24 · F25 · F32

## The foundation entries the slice names as F-numbers (the plan's *Foundation entries*), by their entries now

| Plan's name | Entry | Current range |
|---|---|---|
| F2 | glossary term `gear` in `foundations/glossary.md` | 338-342 |
| F9 | `D-187` in `foundations/decisions.md` | 8874-8892 |
| F21 | `D-452` in `foundations/decisions.md` | 12713-12726 |
| F24 | `D-455` in `foundations/decisions.md` | 12758-12771 |
| F25 | `D-456` in `foundations/decisions.md` | 12773-12786 |
| F32 | `D-463` in `foundations/decisions.md` | 12878-12893 |

## Current ranges of the foundation entries and the plan's *Choices* named in the slice's *Read* (they hold where they differ from the plan's)

| File | Label | Plan's range | Current range |
|---|---|---|---|
| `docs/task-cycles/wyposazenie-postaci/plan.md` | Choices | 602-618 | 612-628 |
| `foundations/part_map.md` | simulation | 34-66 | 34-65 |
| `foundations/decisions.md` | D-64 | 6689-6709 | 6708-6727 |
| `foundations/decisions.md` | D-179 | 8683-8698 | 8720-8734 |
| `foundations/decisions.md` | D-187 | 8830-8844 | 8874-8892 |
| `foundations/decisions.md` | D-206 | 3918-3970 | 3918-3969 |
| `foundations/decisions.md` | D-213 | 688-732 | 688-731 |
| `foundations/decisions.md` | D-386 | 4269-4287 | 4269-4286 |
| `foundations/decisions.md` | D-425 | 854-872 | 854-871 |
| `foundations/invariants.md` | save-version | 1048-1057 | 1048-1056 |
| `foundations/invariants.md` | trip-transfer | 978-987 | 978-986 |
| `foundations/invariants.md` | simulation-inputs | 226-235 | 226-234 |
| `foundations/invariants.md` | simulation-isolation | 214-225 | 214-224 |
| `foundations/invariants.md` | character-team | 538-547 | 538-546 |
| `foundations/glossary.md` | map run | 18-24 | 18-23 |
| `foundations/glossary.md` | earning loop | 223-228 | 223-227 |
