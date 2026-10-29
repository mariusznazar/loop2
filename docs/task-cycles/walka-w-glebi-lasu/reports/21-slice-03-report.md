# Slice 3 implementation report

**Status:** done with concerns

**Worktree:** `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu`  
**Branch:** `task/walka-w-glebi-lasu`  
**Slice base / starting HEAD:** `d31172d2eefc7f8859b2dab77bba5cf72e1b68be`  
**Commit / resulting HEAD:** `ba80da339059dc55ee206f75f22a9c745897efe0` — `feat: :crossed_swords: resolve combat exchanges`

## Change

`resolveCombat(run, map, creatureId, program)` now computes an encounter without changing its inputs, advancing time or drawing randomness. The attacking creature acts first in every exchange. It and the character select rules immediately before their actions against their current health; the character's action uses ordered groups and rules, and only combat actions with their required items are feasible. A lethal creature strike records a missing character action and ends the encounter immediately. The resolver stops on defeat, death or after 40 exchanges.

The result contains both final health values, the outcome, ordered action facts for each exchange, and starts per character rule. A pending reduction from dodge is local to the encounter, is refreshed to 5 by another dodge, is consumed by the next creature strike and is not accumulated. Creature behavior and character combat effects are read from their data. The character's stick is not consumed.

The function accepts a repertoire-filtered program, as the spec requires. The later game-flow slice must pass the current program after applying the character's repertoire. The function's public signature cannot verify that caller-side property; passing the full program would allow undiscovered or unavailable rules to act.

| File | Added | Removed |
|---|---:|---:|
| `src/browser/sim/combat.ts` | 115 | 0 |
| `src/browser/sim/program.ts` | 29 | 0 |
| `src/browser/sim/types.ts` | 28 | 0 |
| `tests/sim/combat.test.mjs` | 180 | 0 |
| `stryker.config.json` | 1 | 0 |

The new exported function is `resolveCombat(run: MapRun, map: MapDef, creatureId: CreatureId, program: Program): CombatResult`. Its successful immutable-input use is covered in `tests/sim/combat.test.mjs`. The shared `chooseCombatRule(run, map, program, health, opponentHealth)` is exported from `program.ts` for use by the resolver.

## Checks

| Command | Exit | Result |
|---|---:|---|
| `npm test -- tests/sim/combat.test.mjs` with the empty resolver stub | 1 | Expected red assertion: the wolf stayed at 24 health instead of being defeated. |
| `npm test -- tests/sim/combat.test.mjs` during initial implementation | 1 | TypeScript caught missing combat action typing and numeric literal inference; corrected before continuing. |
| `npm test -- tests/sim/combat.test.mjs` after type corrections | 1 | Two test expectations were wrong: they expected one rule start despite repeated kicks. The actual count correctly included every started action. |
| `npm test -- tests/sim/combat.test.mjs` after correcting the counts | 1 | One later assertion incorrectly expected a rule conditioned on health below 94 to stop after the first exchange; health remained below that threshold. Removed the incorrect assertion. |
| `npm test -- tests/sim/combat.test.mjs` final | 0 | 9 passed, 0 failed. Covers 4 exchanges/79 health for stick strikes, 8/58 for kicks, death on exchange 15 with no feasible rule, lethal opening before character response, 40 dodges/15 health, missing-stick fallback, ordinary-action refusal, post-strike character conditions, group order, creature dodge below 8, and immutable inputs. |
| `npm test -- tests/sim/program.test.mjs` | 0 | 19 passed, 0 failed. Existing program selection behavior remains green. |
| `npm test -- tests/quality/test_mutation_test_selection.py` before updating Stryker | 1 | Expected failure identified the missing `tests/sim/combat.test.mjs` entry. |
| `npm test -- tests/quality/test_mutation_test_selection.py` after updating Stryker | 0 | Passed; the new suite is selected for reviewer-run mutation analysis. |
| `node node_modules/prettier/bin/prettier.cjs --check src/browser/sim/combat.ts src/browser/sim/program.ts src/browser/sim/types.ts tests/sim/combat.test.mjs stryker.config.json` initial | 1 | Reported formatting issues; files were formatted. |
| `node node_modules/prettier/bin/prettier.cjs --write src/browser/sim/combat.ts src/browser/sim/program.ts src/browser/sim/types.ts tests/sim/combat.test.mjs stryker.config.json` | 0 | Formatted changed files. |
| Same Prettier `--check` command, final | 0 | All changed files use the expected format. |
| `node node_modules/@eslint/bin/eslint.js --max-warnings 0 src/browser/sim/combat.ts src/browser/sim/program.ts src/browser/sim/types.ts tests/sim/combat.test.mjs` | 1 | Incorrect local executable path; no lint run occurred. |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/sim/combat.ts src/browser/sim/program.ts src/browser/sim/types.ts tests/sim/combat.test.mjs` | 0 | No lint findings. |
| `git diff --check`; `git diff --cached --check`; `git show --format= --check HEAD` | 0 | No whitespace errors. |

Not run: full `npm test` (excluded by this slice dispatch), Stryker (assigned to the independent reviewer), the foundation checker, browser evidence, and integration with minute progression. No browser behavior changes in this slice.

## Own-work check

The likeliest failure was choosing the character's rule before the creature's strike, which would make health conditions and action feasibility use stale health. The check is `npm test -- tests/sim/combat.test.mjs`; its hand-checked case starts at 100 health with `healthBelow 94`, receives a 7-point bite, then starts the conditioned kick at 93. The same suite checks the wolf's strict own-health threshold: after the third stick strike leaves it at 6, it dodges in the fourth exchange. Both passed.

## Choices and limitations

- Kept the resolver's output limited to health, outcome, exchange facts and rule starts. The game-minute step, death state, attack record, cooldown and presentation remain for later slices; combining those here would couple the pure resolver to unrelated transitions.
- Kept the rule picker in `program.ts` and reused `conditionHolds`, while limiting feasible actions through the action data's combat effect and item requirement. A separate combat rule-order loop would risk drifting from group order and condition meanings.
- A creature whose data has no applicable rule raises an error instead of silently inventing a fallback action. The current wolf's final `always` pair makes that branch unreachable for this task; a future creature must provide a complete applicable repertoire.
- The resolver accepts a `Program`, and the caller must pass it after repertoire filtering. If the later caller skips that step, rules the character cannot use may act; this is the outstanding integration obligation, not a failure in the focused resolver contract.

No invariant test was changed. The new simulation suite is listed in Stryker selection, and its mutation run remains for the reviewer. The only reaches beyond the slice's selected source were the full D-140 through D-151 combat decisions, `program-rule-pick`, and the simulation module guideline, all named by the dispatch.
