# Handoff — executor of Slice 14, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You are
the **executor of Slice 14** of the plan. Use the project skill **`the-way-make-change`** (read its
method and what it names, whole). Make this slice and nothing beyond it; commit on the branch by
explicit paths; return before review with status `done`, `done with concerns`, `questions`,
`returned` (an open design choice, or the slice too large — with no code) or `blocked`. Questions go
to the orchestrator in your report, never to the human.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`.
- Slice base: `55818a4bc8af38b6fe00451c342b1609013789af` (`git rev-parse HEAD` before your work).
- Pinned the-way `.the-way` at 86b78ad.
- Frozen task: `.runs/task-cycles/ognisko-i-jedzenie/task.md`; reviewed spec:
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md`; plan: `.runs/task-cycles/ognisko-i-jedzenie/plan.md`.
- Write your full report to `.runs/task-cycles/ognisko-i-jedzenie/reports/20-slice-14-report.md`;
  every check in it with its command and exit code.

## Answers of step 4

- Trust boundary: yes — `assets/icons/**` (part `browser-view`), the campfire icon from
  game-icons.net (Slice 10 only).
- Irreversible operation: no.

## Your section of the plan (word for word, `plan.md:392-408`)

### Slice 14 — the team's character carries its traits into the map run

- **Goal:** (Orchestrator's amendment at the reconciliation with `main`: task 11 merged first, so this cycle makes the join of spec Decision 2, as the plan's *Choices* gives.) A character created in the team (`createCharacter` in `src/browser/sim/game.ts`, type `Character` in `src/browser/sim/types.ts`) carries its traits, made by `newTraits` of `src/browser/sim/character.ts` when it is created — carrying capacity 15 —, and a saved game state holds them with the character. `send` copies the sent character's traits into the map run's character (`RunCharacter.traits`) in place of `newTraits()`; „Restart” keeps the traits of the map run it replaces, as today. The map run keeps naming the team's character by its number (D-56) and holds its own copy of the traits for the map run (spec Decision 2, *The join*), so `map-run-repeatability` and a restart do not depend on the team. Test first, in `tests/sim/traits.test.mjs`: a created character carries carrying capacity 15; the map run of a sent character carries that character's traits, also where the character's traits differ from a new character's (a hand-made game state); a restart keeps them; and `character-team` still holds.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/game.ts` · `tests/sim/traits.test.mjs`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/spec.md:245-290` Decision 2 ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:59-61` Questions to settle (Q15) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:75-80` Context (task 11, the chest) ·
  `foundations/decisions.md:1087-1113` D-56 ·
  `foundations/invariants.md:500-509` character-team ·
  `foundations/invariants.md:155-165` map-run-repeatability ·
  `foundations/invariants.md:291-300` restart-seed ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `src/browser/sim/character.ts` · `src/browser/sim/run.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/sim/traits.test.mjs`, first failing, then passing; `npm run typecheck`; `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_character_team.py` (where it exists), `test_restart_seed.py`, `test_map_run_repeatability.py`, `test_simulation_inputs.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`.
- **Depends on:** Slice 5 · the reconciliation with `main`

## Current ranges

The foundation step wrote the plan's F1–F20 and moved some ranges of `foundations/`. Read
`.runs/task-cycles/ognisko-i-jedzenie/reports/foundation-map.md`: it maps each F-entry your *Read*
names to its identifier and current range, and gives the current range of each range of
`foundations/` that moved. Where it differs from the plan's, the current one holds.

## Known checks already failing on the base (a945cf1)

`npm test` exits 1 on this machine for three checks unrelated to this change:
`tests/invariants/test_loop2_one_serving_process.py` (setUpClass: `Get-NetTCPConnection` finds no
listening connection) and `tests/quality` `test_ruff_source_rules`, `test_shellcheck_source_rules`
(Ruff and ShellCheck are not installed). Name any of them you meet as already failing, not as yours.

## After the reconciliation with `main`

- `main` (task 11, merge d11dd0f) is merged into the branch (55818a4): the headquarters, the team,
  `createCharacter`, sending a character of the team; D-50–D-56, `character-team`, `headquarters`.
- This branch's decisions were renumbered D-50–D-65 → D-57–D-72 (ddc587f). **`reports/foundation-map.md`
  shows the numbers before that renumbering and is stale**; the ranges in your *Read* above are
  current.
- At the merge the map run's character became `RunCharacter` (`id`, `at`, `traits`, `backpack`);
  `main`'s team character keeps the type `Character`. A send still gives the map run's character
  `newTraits()` (`src/browser/sim/game.ts`, around line 301); your slice replaces that with the sent
  character's traits.
- D-56's *Verification* names as violating "a map run holding a copy of the character's name or
  archetype in place of its number": the map run keeps the number and holds a copy of the traits
  beside it (spec Decision 2) — keep the number; name in your report how the copy stands beside it.
