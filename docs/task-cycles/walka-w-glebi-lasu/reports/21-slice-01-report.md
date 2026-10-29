# Slice 1 implementation report

**Status:** done with concerns

**Worktree:** `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu`  
**Branch:** `task/walka-w-glebi-lasu`  
**Slice base:** `7a633a7ab44868427c9c824948b99d4400a631ca`  
**Starting HEAD:** `e230046bc27e2c666672ac7897b7b95d067577ed`  
**Resulting HEAD / commit:** `8fb55fb39cb1f61809a0411ac2d6d898f1f13b7e` — `feat: :crossed_swords: add combat health conditions`

## Change

| File | Added | Removed |
|---|---:|---:|
| `src/browser/sim/types.ts` | 8 | 0 |
| `src/browser/sim/data/conditions.ts` | 18 | 0 |
| `src/browser/sim/data/revelations.ts` | 3 | 1 |
| `src/browser/sim/program.ts` | 9 | 0 |
| `src/browser/sim/game.ts` | 2 | 0 |
| `src/browser/view/program-editor.ts` | 2 | 0 |
| `tests/sim/conditions.test.mjs` | 30 | 0 |
| `tests/sim/data.test.mjs` | 28 | 0 |
| `tests/view/program-editor.test.mjs` | 34 | 0 |

The shared condition list now includes `healthBelow` and `opponentHealthBelow`. Both take integer thresholds from 0 to 100; their defaults are 50 and 10. `conditionHolds` now accepts an optional `ConditionContext` as its fourth argument. Without it, own health reads the character's body and opponent health is false. With it, the actor's and opponent's health points are compared using strict less-than. Existing world conditions do not use this context. Program validation, condition number controls, and the existing editor picker accept both kinds. Revelation data has an `attacked` event kind; invoking discovery remains for a later slice.

No new public simulation function was introduced. The existing function's widened signature is `conditionHolds(run: RunView, map: MapDef, condition: Condition, context?: ConditionContext): boolean`.

## Checks

| Command | Exit | Result |
|---|---:|---|
| `npm test -- tests/sim/conditions.test.mjs` before implementation | 1 | Expected red assertion: `healthBelow(8)` for an actor at 6 returned `undefined`, not `true`. |
| `npm test -- tests/sim/conditions.test.mjs` after implementation | 0 | 16 passed, 0 failed. Includes strict threshold, actor health, absent opponent, valid ranges and invalid numbers. |
| `npm test -- tests/sim/data.test.mjs` | 0 | 28 passed, 0 failed. Checks exact condition data and attack revelation mapping. |
| `npm test -- tests/view/program-editor.test.mjs` | 0 | 39 passed, 0 failed. Checks both conditions through the existing picker, defaults, ranges and program acceptance. |
| `git diff --check` | 0 | No whitespace errors. |
| `git diff --cached --check` | 0 | No whitespace errors in the staged paths. |

The data and editor tests were added before the corresponding source changes, but were not separately run red. The conditions test supplied the observed initial failing assertion for the missing behavior.

## Own-work check

The requirement most likely to be wrong is actor-relative health: a wolf at 6 health must satisfy its own threshold 8, while the character's health must not be read in its place. The focused condition test passed that case, the strict equality boundary, opponent health, and the false result when no opponent is supplied. Program number validation and the editor's existing number field also passed for both new conditions.

The UI check instructions require checking the changed control states and a screenshot at a route settled by the foundation. The existing select and number controls remain in use, and their combat-condition options and ranges passed the code-level checks. The foundation does not settle a browser route for the authenticated game editor, so no running-product screenshot was taken; that evidence remains unchecked for this slice.

## Choices and limitations

- Added an optional actor context to the shared condition evaluator. A separate set of creature-only health conditions would duplicate meanings; percentages would change the approved 6/24 versus threshold 8 behavior. If the context is wired to the wrong side in a later combat caller, the creature's rule choice can change; the explicit context parameter and 6-health test expose that boundary.
- Added the generic `attacked` revelation kind without a creature identifier, because the creature catalog and its identifier type belong to Slice 2 and discovery invocation belongs to Slice 6. If later data requires an attack to identify its creature, the event payload will need to adopt that identifier when those slices add it.
- Did not run the full `npm test` gate, the foundation checker, mutation tooling, or a browser screenshot. The slice handoff excludes the full suite and assigns mutation tooling to the independent reviewer. The foundation files are unchanged. The screenshot route is not settled by the foundation, as noted above.

No structural disagreement with the slice plan was found. No invariant test was changed. No other source passages or artifacts were reached beyond the dispatch and the UI/browser instructions required for checking a changed screen.
