# Slice 14 report

**Status:** done

## Changes
- src/browser/sim/types.ts: `Character` gains `traits: Traits` (+2/-1).
- src/browser/sim/game.ts: `createCharacter` sets `traits: newTraits()`; `send` finds the sent character and gives the map run `{ ...sent.traits }` in place of `newTraits()`; comments updated. `restart` unchanged (keeps the map run's traits).
- tests/sim/traits.test.mjs: 4 tests added (created character has capacity 15 and own copy; sent hand-made character with capacity 4 reaches the map run; the run's copy is independent of the team and survives a restart; send leaves the team unchanged).
- tests/sim/team.test.mjs: adaptation (small mismatch): the deepEqual on created characters now includes `traits: { carryingCapacity: 15 }`; outside the slice's Change list but forced by the new field.

## Checks (command, exit code)
- `node --test tests/sim/traits.test.mjs` before the code: exit 1 (3 assertions failing, 10 passing); after: exit 0.
- `npm run build`: 0. `npm run typecheck`: 0.
- `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`: 0.
- `python -B -m unittest discover -s tests/invariants -p <f>` for test_character_team.py, test_restart_seed.py, test_map_run_repeatability.py, test_simulation_inputs.py: all 0.
- `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`: 0.
- Full `npm test` not run (cycle's run). Known failing on base: test_loop2_one_serving_process, ruff, shellcheck checks.

## Own-work check
Requirement most likely missed: the map run must hold its own copy of the traits, not share the team's object. Test "the map run holds its own copy..." asserts inequality of references and that a restart keeps 4 after the team's traits change to 9. Passed.

## How the copy stands beside the number (D-56)
`RunCharacter` keeps `id` (the team character's number) and `traits` (shallow copy of the team character's traits) side by side; no name or archetype is copied into the map run.

## Reaches beyond the dispatch
Read src/browser/view/headquarters.ts usage via grep (archetypeId only); no `Character` literals elsewhere in src. No saved-game parsing exists in src, so "a saved state holds them" is satisfied by the field on `GameState.team.characters`.
Mutation reasoning: `send` using `newTraits()` fails the capacity-4 test; sharing the object fails the reference test; restart reading from team fails the 9-vs-4 test.
