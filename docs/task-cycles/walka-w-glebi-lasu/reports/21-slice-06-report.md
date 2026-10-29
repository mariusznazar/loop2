# Slice 6 implementation report

Status: **done**. This is the slice implementation and own-work check, not an independent review or full task completion.

Worktree: `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu`
Branch: `task/walka-w-glebi-lasu`
Base: `e7c9912d95c987254b13a9ec7c9fc3973c5f1243`
Head/commit: `471597bbe8defb909ed0fff2baeb6de2baa70902` — `feat: :sparkles: integrate attacks into complete game minutes`
Process pin verified: both `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` returned `3aee7d958835cc19b95519f4d21b37538b78e3e1` (exit 0). Working tree clean after commit. No push, PR, merge, deployment or task-source edit.

## Result and integration contracts

The attack stream has its own constant `0x4154544b`; existing stream constants are unchanged. A run starts its generator from its seed and cooldown from zero. Eligible ordinary minutes draw once, including inside long activities, after their finishing effect and completion check. An attack clears `current`, records `activeCombat` and replaces `lastCombat`.

`ActiveCombat = { creatureId, attackMinute, resolveMinute }`. `LastCombat` adds `result: CombatResult | null`; `result` remains null if completion precedes the turns. `MapRun` adds these nullable fields, `attackRandom`, `attackCooldownStart`, and makes `current` nullable. Existing `defeatedAttacks` starts at zero and remains governed by the existing program-change reset. Restart reconstructs combat state from the same seed. Edits preserve encounter, record, cooldown and generator.

Combat minutes advance world and streak once, holding the body still. M+5 invokes `resolveCombat` with the current program **after** `programInRepertoire` filtering. The result updates health, defeated attacks and cooldown; death wins over completion; a continuing run starts ordinary work in that same minute. New events are `attacked` (with `creature`, matching revelation data), `combatExchange` (ordered creature action then character action, possibly null), and `combatEnded`. Rule counts consume each actual character action from those exchange events once. They do not count the encounter as an ordinary rule.

Both public full-minute paths use the same final phase. The new export is:

```ts
finishMinute(
  stepped: MinuteBeforePick,
  map: MapDef,
  program: Program,
): { run: MapRun; events: GameEvent[] }
```

It finishes an already advanced minute and returns only its own phase events. `minuteBeforePick` is explicitly documented as incomplete. `stepMinute` composes both phases; its program argument, like the earlier run-level API, is already filtered, while `advanceMinutes` owns game Understanding/repertoire and the single discovery result. Ordinary discoveries update the program before the final phase; on attack, the union is recomputed against the original knowledge in catalog order and emitted once before the minute stops. Creature-only discoveries now pause correctly.

For slice 7's successful frozen-input table, add `finishMinute(stepped,map,program)` on an eligible attack and on a resolving encounter; retain the separately requested additions `resolveCombat(run,map,creatureId,program)` and `chooseCombatRule(run,map,program,health,opponentHealth)` from slice 3. No other function export was introduced here. The run/state shapes above are needed by its prepared inputs. `canSendMap` is already covered by the preceding slice.

The minimal status uses `Walczy` during an active encounter and its resolution minute even when ordinary work has started. Death reads `Mag zginął w walce`; completion takes precedence. Terrain handles absent current activity and removes the interrupted target outline. The complete creature-specific status wording and encounter paragraph remain slice 8's UI completion; this slice does not claim them implemented.

## Changed paths

| Path | Added | Removed |
|---|---:|---:|
| `src/browser/sim/data/balance.ts` | 2 | 0 |
| `src/browser/sim/data/maps.ts` | 3 | 1 |
| `src/browser/sim/game.ts` | 33 | 21 |
| `src/browser/sim/random.ts` | 2 | 1 |
| `src/browser/sim/run.ts` | 134 | 15 |
| `src/browser/sim/types.ts` | 18 | 3 |
| `src/browser/sim/understanding.ts` | 3 | 0 |
| `src/browser/view/status-row.ts` | 12 | 1 |
| `src/browser/view/terrain-picture.ts` | 1 | 1 |
| `stryker.config.json` | 1 | 0 |
| `tests/sim/data.test.mjs` | 2 | 1 |
| `tests/sim/encounters.test.mjs` | 518 | 0 |

The Change list's `combat.ts` required no edit. Three paths extend that list: `data/balance.ts`, `data/maps.ts`, and `tests/sim/data.test.mjs`. The orchestrator was informed and explicitly authorized the two expected-data-field corrections. Duration 5 belongs to balance data; cooldown 180 belongs to the map attacker under D-142. The data test's wolf expectation was already missing the `revealedBy` field introduced by the preceding slice. Its correction follows D-143/D-128 and preserves deep equality, rather than weakening the assertion.

## Tests and checks

Every product test ran through the required `npm test -- <one file>`. The new suite is listed in Stryker selection. Expected numbers come from D-140–D-147 and the supplied task/spec: M+5, 180 full protected minutes, eight kicks/58 health, four stick strikes/79 health, and forty dodges/15 health. Generator state 35 is an explicit test input selected to yield a real hit; it is not a mock or a gameplay difficulty expectation.

| Exact command | Exit | Evidence |
|---|---:|---|
| `npm test -- tests/sim/encounters.test.mjs` before implementation | 1 | Both initial tests reached assertions: no `attacked` event during long exploration; defeated count stayed 1 instead of 2 at M+5. |
| `npm test -- tests/sim/encounters.test.mjs` first implementation build | 1 | TS2345 on the inferred narrow `ending` event array; fixed by explicitly typing it `GameEvent[]`. No passing test claimed for that run. |
| `npm test -- tests/sim/encounters.test.mjs` after type fix | 0 | Initial 2 cases passed. |
| `npm test -- tests/sim/encounters.test.mjs` after broader cases | 0 | 18 cases passed. |
| `npm test -- tests/sim/encounters.test.mjs` final | 0 | 20 cases passed, including own-work combined chill/attack and departed-creature case. |
| `npm test -- tests/sim/discovery.test.mjs` | 0 | 31 passed; existing ordinary revelations and pause/order behavior preserved. |
| `npm test -- tests/sim/completion.test.mjs` | 0 | 14 passed. |
| `npm test -- tests/sim/time.test.mjs` | 0 | 19 passed. |
| `npm test -- tests/view/terrain-picture.test.mjs` | 0 | 12 passed. |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 | 1 passed; encounters suite included. |
| `npm test -- tests/view/status-row.test.mjs` | 0 | 27 passed. |
| `npm test -- tests/sim/data.test.mjs` initial | 1 | 29 passed, 2 failed: expected attacker lacked new cooldown, expected wolf lacked prior slice's revelation. |
| `npm test -- tests/sim/data.test.mjs` after source-derived expectation updates | 0 | 31 passed. |
| `npm test -- tests/sim/program-counts.test.mjs` | 0 | 11 passed. |
| `npm test -- tests/sim/flow.test.mjs` | 0 | 12 passed. |
| `npm test -- tests/sim/random.test.mjs` | 0 | 8 passed. |
| `npm test -- tests/sim/combat.test.mjs` | 0 | 9 passed. |
| `npm test -- tests/sim/purity.test.mjs` | 0 | 3 passed; does not replace slice 7's expanded successful-call table. |
| `npm test -- tests/sim/acceptance.test.mjs` | 0 | 5 passed, including existing forest program and empty-program results. |
| `node node_modules/prettier/bin/prettier.cjs --write src/browser/sim/types.ts src/browser/sim/random.ts src/browser/sim/data/balance.ts src/browser/sim/data/maps.ts src/browser/sim/run.ts src/browser/sim/game.ts src/browser/sim/understanding.ts src/browser/view/status-row.ts src/browser/view/terrain-picture.ts tests/sim/encounters.test.mjs stryker.config.json` | 0 | Formatting applied to changed paths only. |
| `node node_modules/prettier/bin/prettier.cjs --check src/browser/sim/types.ts src/browser/sim/random.ts src/browser/sim/data/balance.ts src/browser/sim/data/maps.ts src/browser/sim/run.ts src/browser/sim/game.ts src/browser/sim/understanding.ts src/browser/view/status-row.ts src/browser/view/terrain-picture.ts tests/sim/encounters.test.mjs tests/sim/data.test.mjs stryker.config.json` | 0 | All matched files passed. |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/sim/types.ts src/browser/sim/random.ts src/browser/sim/data/balance.ts src/browser/sim/data/maps.ts src/browser/sim/run.ts src/browser/sim/game.ts src/browser/sim/understanding.ts src/browser/view/status-row.ts src/browser/view/terrain-picture.ts tests/sim/encounters.test.mjs` | 0 | Initial changed-path lint. |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/sim/types.ts src/browser/sim/random.ts src/browser/sim/data/balance.ts src/browser/sim/data/maps.ts src/browser/sim/run.ts src/browser/sim/game.ts src/browser/sim/understanding.ts src/browser/view/status-row.ts src/browser/view/terrain-picture.ts tests/sim/encounters.test.mjs tests/sim/data.test.mjs` | 0 | Final lint includes the adapted data test. |
| `git diff --check` | 0 | No whitespace findings. |
| `git diff --cached --check` | 0 | No whitespace findings in committed scope. |

Not run: full `npm test` and standalone foundation checker (the full gate belongs to the cycle); mutation tool (independent reviewer); expanded invariant test files (slice 7); full browser journey and balance seed measurement (slice 8). No unrelated serving-process repair was attempted. Every Node test command built both application configurations successfully except the explicitly recorded TS2345 run.

## Own-work check

Most likely missed requirement: an attack occurring in the same minute as an ordinary revelation must retain that revelation/program change, combine the results once, and stop before any turn or ordinary start. Added `first chill and attack in one minute keep the automatic exploration rule but never start it during combat` alongside the finished-exploration/attack case. Final encounters command passed: exactly one discovery contains the expected catalog order, the automatic exploration rule exists, its count stays zero and `current` is null. The creature-only discovery case separately guards the empty-discovery check and pause. No issue remained in these checks.

Other named breaks covered by the suite: attack tied only to completed activities; off-by-one start/end cooldown; draws after death/completion or during combat; lost finishing effect; a delayed interrupted move; body ticking or a doubled world tick; M+5 completion before turns; combat death treated as completion; early completion inventing a result; stale/raw program bypassing repertoire; counts once per encounter rather than per action; no ordinary start until M+6; status prematurely switching to that ordinary action; departure counted as victory; mismatched full-minute APIs; shared wander/gather randomness shifting first attack. Simulation mutation assessment remains the reviewer's tool obligation. For browser calculation, removing the nullable-current check would throw in the interrupted-move fixture, and forgetting the resolution-minute status would fail its `Walczy` assertion.

## Browser evidence and limits

Artifact: `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu/.runs/task-cycles/walka-w-glebi-lasu/reports/22-slice-06-status.png`, opened and visually inspected. A duplicate produced by MCP remains ignored under `C:/Storage/repos/loop2/.runs/task-cycles/walka-w-glebi-lasu/reports/22-slice-06-status.png` because the tool's output root is the main checkout. Neither was staged.

Initial browser attempt failed with occupied profile `mcp-chrome-d96ee7f`. Read-only process inspection showed Chrome PID 24756 with still-live node parent 47020. No process was killed. The orchestrator obtained closure from the agent owning that earlier local evidence connection. The next navigation failed with `ERR_CONNECTION_REFUSED`; then `npm start` in this worktree reported `Loop: http://127.0.0.1:3000`. Its build was the final focused-test build of this worktree. The owned process was stopped by Ctrl-C at the end (session 38119, exit 1 due interruption), and `browser_close` returned `No open tabs`.

The browser intercepted only `**/api/account`, returning 200 JSON `{id:'qa-local-slice6',email:'slice6@example.invalid'}` with `x-qa-slice: 6`. A request confirmed the marker. No real login/account/server mutation and no product-module substitution occurred. The first ready wait incorrectly expected the email to be displayed and timed out; source/DOM inspection established that the game shows `Program` and `Siedziba`, not that email. Subsequent setup waited for the visible `Siedziba` heading. This timeout was a check-selection error, not an application defect.

From the running page, imported built `/sim/game.js`, content catalogs, `/view/status-row.js` and `/view/terrain-panel.js`. Created a knowing game and character through simulation APIs, sent to the open deeper forest, then prepared minute 180 with real hit-generator state 35 and a move ending at 184. `advanceMinutes` produced the attack at 181. Further simulation calls produced resolution at 186, combat death at 186 from 7 health, and early completion at 182 from streak 539/two defeats. Product status/terrain components rendered those four states in the local page at 1440×1000; sample headings distinguish the cases. Their button callbacks were inert because this check concerns rendering; no interactions or full journey are claimed.

Separate DOM projection returned:

- `Minuta 181 · Walczy · Passa 1/540 · Pokonane napaści 0/2`
- `Minuta 186 · Walczy · Passa 6/540 · Pokonane napaści 1/2`
- `Minuta 186 · Mag zginął w walce`
- `Minuta 182 · Las — głębiej rozwiązany`, with `positive` only on this row.

All four text elements had positive width and x=16. Terrain contained 25 tile groups, one character outline and zero step-target outlines. Screenshot shows readable rows and retained end controls, with pace/pause absent on death/completion. Browser console reported 0 errors and 0 warnings. This is rendered component evidence from controlled prepared states and actual transitions, not a natural journey through the map or proof of the unfinished encounter paragraph. No shared control style, token or control state was changed; no return condition for introducing browser automation was triggered.

## Choices, rejected alternatives and reaches

- Shared `finishMinute` phase instead of duplicating completion/attack/combat in `game.ts` and `stepMinute`: keeps both public paths aligned and allows discovery between phases. Cost: one additional exported helper and an explicit successful immutable-input obligation. A callback-driven engine was rejected as more coupling for the same sequencing.
- Nullable ordinary `current` plus separate active/last encounter, instead of a combat-shaped ordinary activity: avoids false ordinary starts/counts and makes interrupted targets disappear. Cost: nullable current in the two view readers and future consumers; typechecking found no other browser reader requiring adaptation.
- Exchange events consumed by `countStarts`, instead of adding both ordinary starts and resolver totals: one count source prevents double accounting. The result retains its resolver totals for factual record. Cost: event consumers must recognize the new exchange event, and tests guard final ordering.
- Recompute the single discovery union only on an attack, against minute-start knowledge, while applying earlier discovery before the final phase. Rejected independent discovery events: they lose the one-pause/catalog-order contract. Cost: a second catalog scan in attack minutes only.
- Map-attacker cooldown data and balance duration, instead of engine literals or a global map cooldown: follows D-18/D-142. Cost: the two additional data files and expected-shape correction. No multi-attacker scheduling was added; the accepted scope currently has one attacker and the engine consumes its first row.
- Reset cooldown when early completion ends an unresolved encounter, while leaving its result null. The run is ended and cannot draw again; the stored end follows the same end-of-encounter interpretation without inventing turns.
- Minimal `Walczy` text in this slice, with the complete creature wording/paragraph left to the explicitly assigned UI slice. No extra presentation data was invented here.

Reaches beyond named source paths: content-data guideline before the two data changes; the complete `tests/sim/data.test.mjs` for its exact-shape updates; existing slice 3/4 report passages for resolver API and local browser setup; `package.json`, `view/game-view.ts`, `view/terrain-panel.ts`, and relevant `view/app.ts` lines to ground component rendering/account readiness; creature/action/condition/item data for exact revelation identity, presentation inputs and catalog order; global script/git/search instructions and applicable Playwright references. No other product/source path was changed. Required process and coding/testing/browser guidelines were used; no subagent was dispatched by this executor.
