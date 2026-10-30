# Report — Slice 1 executor, task `zapis-stanu-na-serwerze`

**Status:** done with concerns

## Files and commits

| File | Added | Removed |
|---|---|---|
| `src/browser/sim/saved-game.ts` (new) | 887 | 0 |
| `tests/sim/saved-game.test.mjs` (new) | 875 | 0 |
| `stryker.config.json` | 1 | 0 |
| `foundations/part_map.md` | 1 | 1 |

- `2923c3c` feat: :sparkles: turn a saved game document into a game state or a refusal in the simulation
- `b4c3687` docs: :memo: name the saved-game load as the simulation's trust boundary

Branch `task/zapis-stanu-na-serwerze`, on `fb1ef9d`.

## What the slice holds

- `SAVED_GAME_VERSION = 1`; `savedGame(state)` → `{ version, game }`, the game a JSON copy of the
  state (the state is plain JSON data; `structuredClone` is a host global the
  `simulation-isolation` scan refuses).
- `loadSavedGame(value: unknown): LoadedGame`, where
  `LoadedGame = { ok: true; state } | { ok: false; reason: "version" | "archetype" | "shape" }`
  (the `{ ok, reason }` form of `ProgramNameCheck` in `types.ts`). Order as spec decision 5 gives:
  no plain object with an own safe-integer `version` → `shape`; another version → `version`; a
  readable `game.team.characters` naming a string archetype that is no own key of `ARCHETYPES` →
  `archetype`; anything else not admitted → `shape`. The reading throws one internal error at the
  first fault and the load catches every throw (a Proxy trap, a stack overflow included), so it
  never throws.
- The state is built field by field as typed literals; closed lists that only a type holds
  (`DeathCause`, `CombatOutcome`, `Activity` and `CombatCreatureAction` kinds, combat actions) are
  `Record`s or mapped types keyed by the type, so a new member fails the type check. Programs, the
  copy and its base go through `checkProgram(value, null)` and must equal its canonical result
  exactly (keys and numbers on their steps); an action outside a program (current activity, combat
  record) is read by the same check, as the action of a one-rule program.
- A map run that goes on (no death, no completion, in combat or not) comes back `paused: true` with
  its minute, pace and `realMsCarry`; an ended one keeps its saved `paused`. No time argument exists.
- Part map: `simulation` *Trust boundary* `src/browser/sim/saved-game.ts` (Foundation entries row 35),
  written through `the-way-update-part-map` on the plan's settlement, after the file was committed.

## Checks run

| Command | Exit | Note |
|---|---|---|
| `npm test -- tests/sim/saved-game.test.mjs` | 1 | written first: stub returning `shape`; the case "a document of the current version loads into the state it describes" fails at its `deepEqual` (actual `{ ok: false, reason: "shape" }`) |
| `npm test -- tests/sim/saved-game.test.mjs` | 1 | invariant test seen failing: stub accepting everything; 6 of 10 failing, all four `invariant: save-version` cases among them |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 | final, 12 tests |
| `npm test -- tests/sim/purity.test.mjs` | 0 | |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 | |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 | drives the two new exported functions through its pool of values |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 | |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | its globs cover the then-untracked files; `node node_modules/eslint/bin/eslint.js --max-warnings 0` on both new files also 0 |
| `npm run typecheck` | 0 | |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | before the part map edit and after it (`0 errors`) |

Not run: the whole gate `npm test` (the cycle runs it); StrykerJS (the reviewer runs it on
`simulation` files, WAY-253, so I did not do the in-head mutation pass either).

## Own-work check

- **Requirement most likely unmet:** "admits nothing less strict than decision 5's floor" — a
  crafted case passing the test only because some other check refuses it. **Check:** a copy of the
  built module that records the line of each refusal, run over all 83 crafted cases (scratch, then
  deleted). **Showed:** every case refused as `shape` by the check aimed at it (key set, prototype,
  own data key, finite, safe integer, uint32, closed list, `checkProgram` message, team reference,
  listed program, counts key set, tile on the map, neighbour, tile count, end minute, combat and
  activity, no run with pause/discovery/carry, pace).
- **Second requirement:** "a change of the type fails the type check". **Check:** one at a time in
  `types.ts`, a field added to `GameState`, `MapRun`, `Tile`, `Body`, `ProgramCopy`, `Completion`,
  `CombatResult`, and a member added to `DeathCause`, `Activity`, `CombatCreatureAction`, then
  `npm run typecheck`, then `git checkout -- src/browser/sim/types.ts`. **Showed:** each exit 1
  with an error in `saved-game.ts`.
- **Third:** the load refusing states the game really makes. **Check:** the test case "a game state
  the simulation made loads back from its saved document": a new game, a run going on with carry,
  a run whose copy's program was deleted, the headquarters after „Zakończ” with counts, a pick, an
  attack going on and a death in combat in Las — głębiej. **Showed:** all load, running ones paused.

## Choices, adaptations, concerns

1. **Picks, programs used last and the last entered program may name a deleted program.** Spec
   decision 5 says "picks and programs used last naming listed programs". `deleteProgram`
   (`src/browser/sim/programs.ts`) leaves them naming the deleted number, and D-165 says "a record
   left naming it finds no program". Requiring listed programs would refuse real saves (the player
   loses everything after deleting a picked program). I admit any number the game gave (below
   `nextProgramId`), keys of picks and programs used last naming a team character; the document of
   the test holds `lastUsedPrograms: { 1: 2 }` with program 2 deleted. Rejected: the spec's wording.
   Cost if wrong: a pick naming a deleted program loads, which the simulation already falls back
   from (`rowProgram`). Treated as a small mismatch; the orchestrator may judge it structural.
2. **Two written-out documents.** "Counts beside a program" (`countsProgram`) is null during every
   map run (`startRun`, type comment), so one document cannot hold it beside the run's branches. The
   main document holds the run (counts beside the copy's rules); `HEADQUARTERS` holds counts beside
   program 1. Both are asserted to load into what they describe.
3. **Stricter than the floor**, each something the simulation never produces: program and
   character names trimmed and non-empty, program names distinct ignoring letter case, an
   Understanding holding „Zawsze”, lists of identifiers each once, tiles at their row-major place,
   one campfire a tile, a move's target a neighbour of the character, an activity's start not after
   the minute and its end after its start, an attack going on only with no activity and no end, an
   activity while a run goes on outside combat, death/completion in the run's minute and not both,
   counts keys exactly the rules of the copy (run) or of `countsProgram`, no `countsProgram` during
   a run, no pause, discovery or carry without a run, `realMsCarry < 1000`, streak and attack
   cooldown start not above the minute. Cost if wrong: a real state refused as `shape`.
4. **Nature energy capped by the data** (`0..BALANCE.natureEnergy.max`, invariant
   `nature-energy-range`). Concern: lowering the cap in the data would refuse saves of the same
   version above it. No other data number (step minutes, stocks, body caps) is checked, by spec
   decision 2.
5. Program content checked against every map's resources (`checkProgram(value, null)`), copy
   included: a copy taken from a list program may hold resources of other maps.
6. `archetypeId` that is no string is `shape`, not `archetype`.
7. Not mine, follows from row 35: `guidelines/testing.md` § Trust boundaries has no row for
   `src/browser/sim/saved-game.ts`; the plan gives that to Slice 8. The saved-game kind guideline
   and exemplar text are Slice 7's.

## Reaches beyond the dispatch

- `plan.md` lines 7–49 (Foundation entries rows 6, 14, 20, 25, 35 text, who writes row 35) and the
  `testing.md` lines of the plan (who writes the trust-boundary row) — to place row 35 and item 7.
- `tests/invariants/test_simulation_isolation.py` (HOST_GLOBALS) and
  `tests/invariants/test_simulation_inputs.py` — which names the scan flags (`document`,
  `structuredClone`) and how new exports are driven.
- `.the-way/elements/part-map/skill/{SKILL,decide_entry,write}.md`, `template.md` § Trust boundary,
  `elements/common/way_of_working.md` § Reading the foundation and § 4 — the part-map skill.
- `foundations/part_map.md` whole; `tests/quality/test_quality_invariants.py` (file globs);
  a grep of `src/` for `ruleCounts`, `countsProgram`, `characters.filter` — whether counts or
  characters change outside `game.ts`/`programs.ts` (they do not).

## Searches not found or unclear

- No way a character leaves the team today (no `characters.filter` in `src/`), so pick keys must
  name team characters.
- "counts beside a program" in spec decision 2 is unclear between counts beside the copy and
  `countsProgram`; both are covered (item 2).
