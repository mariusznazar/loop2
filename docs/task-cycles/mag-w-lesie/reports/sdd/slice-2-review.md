### Spec Compliance

- ✅ Spec compliant. Every § 4.3 export of `hex.ts` is present with the specified signature (`src/browser/sim/hex.ts:31,35,39,45,50,81,103,108,116`). `nearestTile` follows § 4.5: Dijkstra with the entered tile's `stepMinutes` as cost (`hex.ts:55-74`), `from` qualifies at 0 with `next = from` (`hex.ts:94`), ties go to the earlier list index via strict `<` (`hex.ts:89`), `next` is the first neighbour of `from` in list order with `step.stepMinutes + cost(step→target) === minutes` (`hex.ts:95-98`). Geometry matches A2 and loop `terrain.test.ts:68-106`: axial q = col − floor(row/2), centre x = size·√3·(q + r/2), y = 1.5·size·r, first corner at −π/2 and clockwise (y axis down). `tileLabel` gives "(col, row)" (C4). Imports are only `./types.js`; no DOM, Node, time or randomness; no content ids (S1/S2). Only the two files named in the brief are touched.
- ⚠️ Cannot verify from diff: Slice 1's `Hex` and `Tile` types, which I checked in `types.ts` (matches use). The whole-game effect of item 6 (Idź moves one step per `next`) belongs to Slice 5 and is not testable here.

### Strengths
- Small, pure, single-responsibility module with no hidden state. The rule "cost = entered tile" is kept consistent between `costsFrom` and the first-step check (`step.stepMinutes + rest`).
- Tests assert real behaviour. The detour test (`hex.test.mjs:251-257`) is built so the first neighbour in list order (cost 20) is NOT on the cheapest path. It therefore exercises both the cost and the first-step selection. I checked by hand that the 15-minute route (0,1)→(1,1)→(2,0) exists in the odd-rows-right grid.
- The neighbour-order tests (`hex.test.mjs:169-176`) use correct odd-row adjacency, and the geometry test mirrors the older game's values at size 24.
- Test-first evidence in the report is credible, and the one wrong expectation was fixed in the test after a hand check. `hexDistance((0,0),(3,3))` is 5, which I confirmed.

### Issues

#### Critical (Must Fix)
None.

#### Important (Should Fix)
None.

#### Minor (Nice to Have)
- `src/browser/sim/hex.ts:20-28`: `DIRECTIONS` is declared and never used. `neighbours` and `costsFrom` use `hexDistance(...) === 1` instead. It is dead code and could mislead a reader about how neighbour order is decided. Delete it.
- `tests/sim/hex.test.mjs:233-240`: the tie test uses uniform costs. It would also pass with an "earliest found" bug in some orderings, and no test covers a tie between a cheap near tile and an equally costly far one with non-uniform `stepMinutes`. Optional extra case.
- `src/browser/sim/hex.ts:99`: `return null` after the neighbour loop is unreachable for any consistent input (cost > 0 implies a matching neighbour). With `stepMinutes` of 0 or a non-integer, `===` on sums is fragile. Current data uses integers, so there is no defect today.
- No test for a `from` that is not on the tile list (returns null via all-Infinity costs). Behaviour is sensible and untested.

### Assessment

**Task quality:** Approved

**Reasoning:** The implementation matches spec § 4.3, § 4.5, § 9.1 and assumptions A2, C2 and C4, with pure, simple code and tests that exercise the cost, tie and first-step rules. Only a dead constant and optional test breadth remain.
