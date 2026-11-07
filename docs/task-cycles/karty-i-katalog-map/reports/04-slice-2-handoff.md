# Handoff - slice 2 (stage: make-change, "a slice, or the retry of a slice")

You make slice 2 of the plan of the task cycle `karty-i-katalog-map` (screen Mapy, card of a map, section "Kto idzie"). You are a fresh executor; the model class set for you by the plan is `cheaper`.

## Delegation

The person who requested this cycle delegated intermediate choices to the orchestrator. Answer nothing as the human's approval. Never ask the human. A question you cannot settle from your reading goes back in your report with the status `questions`; an open design choice the code shows returns with the status `returned` and no code (see the method).

## Where you work

- Worktree (work from its root): `the root of the task worktree`, branch `task/karty-i-katalog-map`; the slice's base is `ce5e865d9d503260998c6697f4121d6fe93b7a98`. The-way is the worktree's `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`; use only that copy.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole, and `.the-way/task-cycle/change/slice.md` for a slice (a file the method names only when the step that names it comes). Its project skill is `the-way-make-change`.
- Your full report: `docs/task-cycles/karty-i-katalog-map/reports/04-slice-2-report.md`. Return only: status, your commits, a one-line check result naming what failed or did not run, and the report path. The report must hold each check with its command and exit code, the section **Searches not found or unclear** (items or `none`), the own-work check the method asks for, every reach beyond this handoff (what, where, why) and your questions and concerns.
- Commit on the task branch with `git add <path> ...` by path (never `git add -A`, `git add .` or `git commit -a`), in English in the form of this repository's commits (`feat: :sparkles: ...`, `test: :white_check_mark: ...`, `docs: :memo: ...`, `refactor: :recycle: ...`; see `git log` for the form), each message ending with the line `Claude-Session: https://claude.ai/code/session_01GQhooYPtvX6D9fFqcP4YfG`. Leave the worktree clean.
- The checks of your slice are the focused checks its section names, run as it names them; you run no full `npm test` (the orchestrator runs the gate). `npm test -- <one file>` runs exactly one file.
- Project rules: read `AGENTS.md`; the guideline files named in your slice's *Read* each whole.
- Product language: code, identifiers, comments and commit messages in English; game text, test names and guideline prose in the language of the files you change (Polish where they are Polish). Do not rewrite files into another language.

## Names of foundation entries since the plan was written

The foundation entries were written before slice 1 by the foundation step (commit `afe5920`). In your *Read*, "Settlement 1..6" and "(new) ..." entries have these identifiers: (new) What does the screen Mapy show? = D-325; (new) What does the game say before an earning loop that earns nothing? = D-326; Settlement 1 = D-327; Settlement 2 = D-328; Settlement 3 = D-329; Settlement 4 = D-330; Settlement 5 = D-331; Settlement 6 = D-332. Read each entry the section names whole, from its `### D-nnn` heading to the next `###` heading.

Current line ranges in `foundations/decisions.md` (they differ from the ranges in the copied section; the current ones hold; find an entry by its heading when in doubt): `D-04` lines 52-120 | `D-18` lines 390-408 | `D-35` lines 786-800 | `D-58` lines 1178-1192 | `D-60` lines 1208-1222 | `D-80` lines 1511-1523 | `D-142` lines 2697-2711 | `D-179` lines 3273-3287 | `D-180` lines 3288-3302 | `D-187` lines 3381-3393 | `D-189` lines 3407-3421 | `D-214` lines 3981-3998 | `D-325` lines 7057-7071 | `D-326` lines 7072-7086 | `D-327` lines 7087-7101 | `D-328` lines 7102-7116 | `D-329` lines 7117-7131 | `D-330` lines 7132-7146 | `D-331` lines 7147-7161 | `D-332` lines 7162-7176.

## Your slice, copied word for word from `docs/task-cycles/karty-i-katalog-map/plan.md`

### Slice 2 — Numbers of the card and what a send takes, in the simulation

- **Goal:** a new module `src/browser/sim/map-card.ts` exports pure functions over a map's
  definition (`MapDef`) that give the card its numbers (carried question 1): the whole game minutes
  a body at the data's start temperature, with no warmth, stays at or above the chill threshold at
  the map's ambient temperature, as `bodyMinute` of `body.ts` cools it, and null where the body does
  not cool below that threshold (Las 83, Las — głębiej 33); for a resource of the map, the tiles
  expected to hold it — its density times the map's tiles, rounded to the nearest whole — with the
  number of tiles (Las, patyk: 11 of 16; Las — głębiej, patyk: 18 of 25); for an attacker, the mean
  game minutes between attacks with the cooldown, the cooldown plus the reciprocal of the chance,
  rounded to whole minutes (wolf: 280, D-142); and the usual step, the step most maps of `MAPS`
  give, the first of the data's order on a tie (5 today). `src/browser/sim/trip.ts` exports one pure
  function giving the entries a send takes into a manual map run — at a map not solved the take list
  clipped by the chest, the carrying capacity and the map's entry cap, at a solved map the take list
  from nowhere as `clippedTake` gives it (D-189, D-214) — and `takeTrip` and `takeFromNowhere` take
  their entries through it, so the line „Wejdzie: …” of slice 5 and the send cannot differ (To do 5,
  item 4). The new test file enters the list of `stryker.config.json`. No field of the game state
  changes. Each expected value is written out in its case from To do 4 or the task's *Context*, with
  the line it comes from.
- **Change:** `src/browser/sim/map-card.ts` · `src/browser/sim/trip.ts` ·
  `tests/sim/map-card.test.mjs` · `tests/sim/trip.test.mjs` · `stryker.config.json`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:40-64` To do, items 4 and 5 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:148-180` Context ·
  `docs/task-cycles/karty-i-katalog-map/task.md:182-187` Questions carried to cycle ·
  `docs/task-cycles/karty-i-katalog-map/task.md:283-294` Settlements to record ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  Foundation entries: Settlement 1 and D-180 as written ·
  `foundations/decisions.md:52-120` D-04 · `foundations/decisions.md:390-408` D-18 ·
  `foundations/decisions.md:786-800` D-35 · `foundations/decisions.md:1176-1190` D-58 ·
  `foundations/decisions.md:1206-1220` D-60 · `foundations/decisions.md:1509-1521` D-80 ·
  `foundations/decisions.md:2696-2710` D-142 · `foundations/decisions.md:3272-3286` D-179 ·
  `foundations/decisions.md:3378-3390` D-187 · `foundations/decisions.md:3404-3418` D-189 ·
  `foundations/decisions.md:3978-3995` D-214 ·
  `foundations/invariants.md:214-225` simulation-isolation ·
  `foundations/invariants.md:226-235` simulation-inputs ·
  `foundations/invariants.md:959-968` trip-transfer ·
  `foundations/invariants.md:1039-1048` solved-map-manual-run ·
  `foundations/invariants.md:579-588` node-test-selection ·
  `foundations/invariants.md:599-608` mutation-test-selection ·
  `foundations/part_map.md:30-60` simulation · `foundations/part_map.md:84-116` build-tools ·
  `foundations/glossary.md:142-147` solved map · `foundations/glossary.md:199-203` trip plan ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/data/maps.ts` · `src/browser/sim/data/balance.ts` · `src/browser/sim/body.ts` ·
  `src/browser/sim/layout.ts` · `src/browser/sim/data/creatures.ts` ·
  `src/browser/sim/data/resources.ts` · `src/browser/sim/run.ts:640-670` ·
  `src/browser/sim/game.ts:189-251` · `src/browser/sim/loop.ts:60-110` ·
  `tests/quality/test_mutation_test_selection.py`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/map-card.test.mjs` (written first, failing) ·
  `npm test -- tests/sim/trip.test.mjs` · `npm test -- tests/sim/loop.test.mjs` ·
  `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm test -- tests/quality/test_node_test_selection.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` · `npm run typecheck` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** the plan's *Foundation entries*

## Plan's Choices and notes

The plan's *Choices* (plan.md lines 641-660) bind where your slice's *Read* names them. The orchestrator's notes at the end of plan.md (section "Orchestrator's notes") apply.
