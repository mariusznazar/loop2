# Slice 2 report — hex geometry and nearest tile

Commit: d60cc99 `feat(sim): add hex geometry and nearest tile`
Files: src/browser/sim/hex.ts, tests/sim/hex.test.mjs

## Implemented
offsetToAxial, sameHex, hexDistance, tileAt, neighbours (tile-list order), nearestTile (Dijkstra, ties by list order, first step = first neighbour in list order on a cheapest path, start tile 0 min with next = from), hexCenter, hexCorners, tileLabel. Geometry per A2 (pointy-top, odd rows right, radius via `size`).

## TDD
RED: test written first; `npm test` -> `ERR_MODULE_NOT_FOUND ... dist\public\sim\hex.js` (hex.test.mjs failed).
GREEN: after hex.ts, one test failed because my own expected value was wrong (distance (0,0)->(3,3) offset is 5, not 4; verified by hand); corrected the test, not the code.
Final `npm test`: tests 23, pass 23, fail 0 (13 new hex tests; Slice 1 count was 10). `npm run typecheck`: clean.

## Invariants
`python -B .the-way/gate/run_tests.py tests/invariants`: 44 run, 9 failures, all in the four expected simulation checks (no dist/public/sim/game.js yet). Nothing else failed.

## Self-review
No sim imports beyond `./types.js`; no DOM/Node/random/time; no content ids. Dijkstra is O(n^2), fine for 16 tiles. Git warns LF->CRLF on the new files (repo normalisation, no action).

## Concerns
None.
