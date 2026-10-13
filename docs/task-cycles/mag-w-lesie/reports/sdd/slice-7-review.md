### Spec Compliance

- ✅ Spec compliant. `terrainPicture(state, size = 24)` in `src/browser/view/terrain-picture.ts:57` is pure (no DOM, no state mutation) and returns width/height, plus per tile polygon points built from `hexCenter` + `hexCorners` (:61-73), `revealed`, icons {resource, href `/icons/<icon>.svg` from `RESOURCES[resource].icon` (:84), position, size, `dimmed` at stock 0 (:88)} and outline `character` | `stepTarget` | null (:92-96). All tiles are emitted from minute 0 (:69), icons only for revealed tiles (:76), no stock number leaves the function. Spec § 9.2 cases each have a test (tests/view/terrain-picture.test.mjs:130, 168, 205, 215). Only the two files named in the brief changed.
- ✅ Spec rule S2 and D-04/3, D-08/1, D-09/1: no resource, map or archetype id literal in the view file; names and icons come from `RESOURCES`; imports only from `sim/`; the output has no stock numbers.
- ⚠️ Cannot verify from diff: the "revealed lighter / unrevealed dark / amber thick / dashed" styling is the drawing component's job (a later slice). The picture gives the data it needs (`revealed`, `outline`).

### Strengths
- Output is plain data with a precise type, so the component later only draws. Offset shifts the drawing to 0,0; `width`/`height` are derived from the real corner extents, and a test checks every polygon lies inside.
- Icon order follows resource data (`RESOURCE_ORDER`, :54), so it is stable and independent of stock key order.
- Character outline wins over step target (:92-96), so exactly one outline per tile.
- Tests use real simulation states (`send`, `advanceMinutes`), not mocks. The step-target test walks 80 minutes and checks both the "move running" and "no move" branches, with a guard that a move was seen (:232).

### Issues

#### Critical (Must Fix)
None.

#### Important (Should Fix)
None.

#### Minor (Nice to Have)
- tests/view/terrain-picture.test.mjs:198-203: "no stock numbers" asserts via `text.includes('stock')`, which only guards against a key named `stock`; a stock number under another key would pass. A stronger check is to assert the exact key sets of picture, tile and icon objects. Low risk now since the output type is explicit.
- tests/view/terrain-picture.test.mjs:168-196: the dimming test zeroes only one resource and relies on `Object.keys(...).length > 1` for some tile; it passes, but tiles that start at stock 0 are not constructed explicitly. Fine for the spec's "fixture state".
- src/browser/view/terrain-picture.ts:68-90: icon layout (0.7*size squares, 2 per row, centred) is an unverified visual choice; with 3-4 resources two rows of 1.4*size height fit the hex (2*size tall). Slice 10 can adjust (implementer noted it). Layout is untested beyond distinct positions and finiteness.
- src/browser/view/terrain-picture.ts:63-66, :100: `Math.min/max(...xs)` on spread arrays is fine at 16 tiles; would need a loop for very large maps. No action needed.

### Assessment

**Task quality:** Approved

**Reasoning:** The function matches spec § 5 and § 9.2 point by point, is pure, keeps content ids out of view code, and its tests exercise real simulation states, including both outline kinds and the empty-run case. Only minor test-strength notes remain.
