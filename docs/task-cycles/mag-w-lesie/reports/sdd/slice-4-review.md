### Spec Compliance

- ✅ Spec compliant. Every item of the brief's *Change* has its hunk (`src/browser/sim/program.ts`, `src/browser/sim/run.ts`, `tests/sim/program.test.mjs`, `tests/sim/actions.test.mjs`); nothing outside it changed.
  - § 4.5 conditions: `always` holds; `hereBelow` reads 0 on an unrevealed tile or a missing resource, holds iff stock < N, so N = 0 never holds — `program.ts:9-13`, `program.ts:16-23`.
  - § 4.5 feasibility, without drawing: explore iff the tile is unrevealed (`program.ts:33-36`); Wędruj iff ≥ 1 neighbour (`program.ts:37-38`); Idź iff `nearestTile(… revealed && stock > 0)` exists with `minutes > 0` (`program.ts:26-28`, `program.ts:39-42`). The functions take `RunView` (`program.ts:6`), which has no `wanderRandom`, so they cannot draw.
  - § 4.5 `chooseActivity`: the first rule whose condition holds and whose action is feasible, with the action copied; otherwise a wait (`program.ts:47-55`). A wait lasts `BALANCE.waitMinutes` (`run.ts:31`).
  - § 4.5 start and duration: explore lasts `ACTIONS.explore.minutes` (`run.ts:36-38`). Wędruj's candidates are the unrevealed neighbours if there are any, otherwise all neighbours; one draw from the wander stream picks `candidates[floor(u × n)]`, and the step lasts the target tile's `stepMinutes` (`run.ts:39-49`). Idź steps to `walkTarget(...).next`, lasts that tile's `stepMinutes` and draws nothing (`run.ts:50-54`).
  - § 4.5 finish: explore reveals only the character's tile and changes no stock (`run.ts:110-113`); a move puts the character on `stepTo` and emits `moved` (`run.ts:114-118`).
  - § 4.6: `newMapRun` starts at minute 0 on the entrance, with `streamState(seed,'wander')`, and chooses the first activity at minute 0 (`run.ts:73-93`). `stepMinute` consults the program only when `minute === current.endMinute`, and then in that same minute with the program passed now (`run.ts:99-131`). This satisfies D-10/1 and `action-in-progress/1`. The task's items 5 and 6 and D-13/1 and D-15/1 are met: the program chooses again after every single step, no route is stored, and there is no way to start an action by hand.
  - § 9.1 program list: all six items are covered (`program.test.mjs:61-85`, `:44-47`, `:79-92`, `:93-101`). § 9.1 actions list: covered except the view-side "dashed target" item. `current.stepTo` is checked to stay the target throughout (`actions.test.mjs:157-187`).
- Ledger rulings, judged on their merits:
  - `newMapRun`'s 4th parameter `{ mapId, archetypeId }` (`run.ts:77`): accepted. `MapRun` needs both ids and `MapDef` carries neither. I checked whether the read-only invariant checks call `run.js` with the spec's 3-argument signature: a grep of `tests/invariants` for `newMapRun|stepMinute|run\.js|program\.js` finds nothing, so this change cannot break them.
  - Event order `activityFinished` → `tileRevealed`/`moved` → `activityStarted`: accepted. It follows the wording of § 4.6 and its causal order.
  - Extra exports `walkTarget` and `RunView`: accepted. `walkTarget` lets the feasibility check and the start of Idź share one predicate instead of duplicating it. `RunView` is the type-level guard that feasibility never draws.
- I checked the risk that the run's shape departs from the invariant's expected shape. `tests/invariants/test_action_in_progress.py:98-113` expects `current` as `{activity:{kind,ruleIndex,action}, startMinute, endMinute, stepTo}`. `CurrentActivity` as built at `run.ts:59-64` has exactly that shape.
- ⚠️ Cannot verify from the diff:
  - The `action-in-progress/1`, `map-run-repeatability/1` and `simulation-randomness/1` checks can run only once `game.ts` exists (Slice 5). The implementer's forward check was a scratch script that was not committed, so it is unverifiable. Confirm with the invariant run at the Slice 5 gate.
  - The spec rule S1/S2 scans of § 9.1 are not part of this slice. By reading I see only `./` imports and no id literals in `program.ts` and `run.ts`, but the scan tests must confirm this.
  - That `types.ts` exports `MapId`, `ArchetypeId` and `CurrentActivity` is assumed from the implementer's report of a clean `npm run typecheck`, which I did not re-run.

### Strengths

- The narrow `RunView` parameter (`program.ts:6`) makes "feasibility draws nothing" true by type, not only by test. The test at `program.test.mjs:93-101` backs it up by comparing the run's JSON, including `wanderRandom`.
- The finish and the next start in one minute are a single, readable path (`run.ts:99-131`). The program is consulted at exactly one place, and that place is gated by `endMinute`. This is the structure D-10/1 needs.
- The tests use real built modules and real data, and take their ids from the data modules (spec rule S2). They pin exact values, for example `candidates[floor(u × n)]` against an independent `nextRandom` call (`actions.test.mjs:141-148`) and a 9-minute target tile that tells the target tile's duration apart from the map's (`actions.test.mjs:157-187`). The implementer's mutation table shows that each behavioural test can fail.
- Purity is tested over 200 minutes with a program that mixes the actions (`actions.test.mjs:258-271`). Copies are made only where something changes, and unchanged tiles are shared without being mutated (`run.ts:112`).

### Issues

#### Critical (Must Fix)

None.

#### Important (Should Fix)

None.

#### Minor (Nice to Have)

1. `run.ts:101`: `if (minute !== run.current.endMinute)`. An activity whose duration is 0 (a future map with `stepMinutes: 0`, or `ACTIONS.explore.minutes: 0`) gets `endMinute === startMinute`. The run would then never match again: the character stays frozen forever, with no error. Nothing in `tests/sim/data.test.mjs` asserts that durations are > 0; it pins only Las's 5 and explore's 20. D-08 says new maps are a data-only change, so this guard belongs somewhere. Fix: a data test that every map's `stepMinutes` and `ACTIONS.explore.minutes` are integers ≥ 1, or `minute >= endMinute` in `run.ts:101`.
2. `run.ts:68` and `run.ts:104`: inconsistent aliasing in events. `stepTo` is copied into the event (`stepTo && { ...stepTo }`), but `activity` is not. `activityStarted.activity` is the same object as the new run's `current.activity`, and `activityFinished.activity` is the same object as the *input* run's `current.activity`. A consumer that mutates an event would silently change the run state, and in the second case the caller's input run. No current caller does this. Fix: copy `activity` the same way `stepTo` is copied, or drop the `stepTo` copy so the rule is consistent.
3. `actions.test.mjs:204`: the duration of Idź is asserted as `map.stepMinutes`, while every tile has the same `stepMinutes`. A mutation "Idź lasts the map's step instead of the target tile's" would pass; the mutation table tested this only for Wędruj. Fix: give `expected.next` a distinct `stepMinutes` (as `actions.test.mjs:161` does for Wędruj) and assert that value.
4. The spec's § 4.3 still lists `run.ts: newMapRun(map, seed, program)`. The accepted 4-argument signature lives only in the ledger (`progress.md`) and in the slice report. Slice 5's implementer and the final reviewer read the spec, so record the signature in the spec or in the cycle record's "Questions and autonomous choices" section. Otherwise it will be raised again as a deviation.

### Assessment

**Task quality:** Approved

**Reasoning:** Choosing, feasibility, the start and finish of each action, and the minute step match spec § 4.5–4.6, D-10/1, D-13/1 and D-15/1 exactly. The tests pin real behaviour with exact values. The remaining items are robustness and consistency polish that does not affect today's data or callers.
