# Fix report — Slice 1 review findings I1 and I3, task `zapis-stanu-na-serwerze`

**Status:** done

## Files and commits

| File | Added | Removed |
|---|---|---|
| `src/browser/sim/saved-game.ts` | 15 | 3 |
| `tests/sim/saved-game.test.mjs` | 94 | 0 |

- `b36292e` fix: :bug: load the server's save with its revision, and test waits and walks loading back

On `59cd18a` (D-97 fix by another agent, left untouched).

## I1 — fixed (orchestrator's way: an optional top-level `revision`)

- **How:** the new `savedDocument(value)` in `saved-game.ts` reads the document's keys as exactly
  `version` and `game`, or, when an own key `revision` stands, exactly `version`, `revision` and
  `game`, the revision checked by `identity` (positive safe integer); only `game` goes on into
  the state. The order of refusals is the same: the `shape` of `version`, then `version`, then
  `archetype`, then `shape`. The doc comment of `loadSavedGame` names the server's `save` with
  its revision. The helper is not called `document`, because the `simulation-isolation` scan
  flags that name.
- **Tests:** a new case, "the server's save of the current version loads into the game it holds,
  its revision left out": `{ version: 1, revision: 3, game }` → `{ ok: true, state: game }`, and
  the same save at version 2 → `version`. New entries of `CRAFTED`, each refused as `shape`: a
  revision of 0, of −1, of 2.5, as text, as `null`, and beyond the safe integers; a key besides
  version, revision and game.
- **Seen failing:** with the code of `b4c3687` (`git show HEAD:src/browser/sim/saved-game.ts`
  put back for the run), `npm test -- tests/sim/saved-game.test.mjs` → exit 1. Only the new
  server-save case failed. With the fix → exit 0.
- **Mutant:** `identity(read.revision)` → `integer(read.revision)`: exit 1.

## I3 — fixed

- **How:** "a game state the simulation made loads back from its saved document" gains three
  states that the simulation makes in Las on `REAL_MS`, moved on minute by minute until the
  character is doing the named kind:
  - a wait under a new game's empty „Program”;
  - a `walkTo` under `WALKING` (explore; „Tu leży mniej niż jagoda 1” → walk to berries; wander);
  - a `walkToCampfire` under `RETURNING` (walk to the campfire, craft one, explore, gather sticks
    below 6, wander).

  Preconditions are asserted: the kind of activity, a `stepTo` set for both walks, and no death.
  `CRAFTED` gains "a wait holding a rule's number" (`{ kind: "wait", ruleId: 2 }` → `shape`).
- **Mutants the reviewer names, each now killed** (each applied alone in the worktree, then
  `npm test -- tests/sim/saved-game.test.mjs`, then restored):

| Mutant | Exit |
|---|---|
| `MOVES.walkTo: false` | 1 |
| `MOVES.walkToCampfire: false` | 1 |
| the `wait` reader `fields(value, [])` | 1 |
| the `wait` reader returning another value | 1 |
| `doing.kind === "rule" && MOVES…` → `true && MOVES…` | 1 |

  `npm run typecheck` was 0 for the `fields(value, [])` mutant, so its exit 1 is the load-back
  case failing, not the build.

## Checks run after the fix

| Command | Exit |
|---|---|
| `npm test -- tests/sim/saved-game.test.mjs` | 0 (13 tests) |
| `npm test -- tests/sim/purity.test.mjs` | 0 |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 |
| `npm run typecheck` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |

Not run: the whole `npm test` (the cycle runs it) and StrykerJS (the reviewer runs it).

## Reaches beyond the dispatch

- `spec.md:80-90` (decision 1) — to confirm the `save` object's exact keys and the type of
  `revision` ("positive integer").

## Searches not found or unclear

- Spec decision 1 says `revision` is a "positive integer", not a positive *safe* integer. I took
  the orchestrator's "positive safe integer", which matches how the load reads every other
  identity.
- The programs that drive the walks were found by trying them on `REAL_MS` in a scratch script.
  Whether a later change of the data or the layout still reaches a walk within 400 game minutes is
  guarded by the preconditions: the case fails rather than passing without a walk.
