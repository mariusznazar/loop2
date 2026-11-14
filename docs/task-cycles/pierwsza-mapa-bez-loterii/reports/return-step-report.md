# Return step — task `pierwsza-mapa-bez-loterii`

Status: **done, nothing written and nothing corrected; no commit** (head stays `3b378a8b`, `git status` clean).

## Return step (fields of the record)

- **Foundation compared with code:** none of the entries no longer matches the code. What was compared:
  - D-396 against `src/browser/sim/data/maps.ts` and `game.ts`: a new game has `solvedMaps: []`, and `canSendMap` over `Object.keys(MAPS)` gives `['forestEdge']` alone; `MAPS.forest.opensAfter` is `forestEdge`, `MAPS.forestDeep.opensAfter` is `forest` (command: `node` import of `dist/browser/sim/data/maps.js` and `game.js`, printed those values, exit 0).
  - D-397 against the same data, printed whole by that command: 4 × 4, entrance column 1 row 1, 25 °C, step 5, streak 480, no attackers, no caps, sticks `density 1, stock 12, renewMinutes 30`, berries `density 1, stock 8, renewMinutes 40`, no moss or fiber; `minutesWithoutFire` gives 83, so the first chill is game minute 84 as its *Verification* says. Every number of the entry equals the data. The card in the real browser showed the same numbers (fix report, M4).
  - `first-map-stock` (*Method* `test`, *Derives from* D-396): cited by `tests/sim/layout.test.mjs`; `first-map-balance` (*Method* `test`, *Derives from* D-396 · D-397): cited by two cases of `tests/sim/first-map-balance.test.mjs`. D-396 *Verification* names both, D-397 names `first-map-balance`; `python -B .the-way/elements/common/foundation_check.py` exit 0, `0 errors`, with citations checked.
  - D-19, D-121, D-124, D-330, D-378, D-388 (the corrected sentences): each read at head; the new wording is true (D-124's 84 minutes and D-330's row of Skraj lasu were also seen in the running game; D-378's Las test `tests/sim/acceptance.test.mjs` passes in the last run, 2023 of 2023 node tests).
  - Entries named under *Decisions in play* of the frozen task: D-18, D-22, D-24, D-80, D-82, D-96, D-122, D-123, D-132, D-133, D-136, D-142, D-144, D-149, D-189, D-190, D-206, D-208, D-209, D-210, D-327, D-328, D-332, D-362 — no sentence made false (D-24, D-328 are the ones the task says stay true; D-136's *Rationale* "Las teaches keeping the loop going" is the one the task lists as left, see the questions below).
  - Read whole now and judged: **D-123** (a new game's first chill is in game minute 84 on Skraj lasu too: true), **D-125** (a new game's first map run shows satiety from minute zero: true), **D-126** (true), **D-143** (wolf only on Las — głębiej: true), **D-325** (true: complies example is at `#/mapy/forest`, Las; one sentence of its *Rationale*, "a counter of maps makes sense only with content beyond the second map or with a small number", was written for a game of two maps and says when a counter makes sense, not how many maps there are, so it is not false; left), **D-368** (complies example for a completion of Las with „Otwarte: Las — głębiej →”: true; a completion of Skraj lasu would read „Skraj lasu rozwiązany” and „Otwarte: Las →”, which the code builds from the data), **D-362** (the entries and files of this change name no note and no path of the disk; command: `git diff e54f23c0..HEAD | grep "^+"` for the folder and note words found only file headers; `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` exit 0).
  - Invariants of `simulation` and `every` (62 entries): I read the sentence of each and, where it named maps, versions, seeds, tiles or a new game, the whole entry. `save-version` (true: the loader refuses any version but 6; tests in `tests/sim/saved-game.test.mjs`), `map-run-tiles` (true for density 1; its Python test now writes out `forestEdge`), `map-run-layout`, `content-identifiers` (no file of `src/browser/` outside the data names `forestEdge` or „Skraj lasu”: `grep -rn "forestEdge\|Skraj lasu" src` gives only `maps.ts`), `solved-map-manual-run`, `trip-transfer`, `trip-run-end`, `streak-program-change` ("on every map"), `restart-seed`, `map-run-repeatability`: none false after the change.
  - Part map, parts touched: `simulation` (`src/browser/sim/data/maps.ts`, `saved-game.ts` under `src/browser/sim/**`; `tests/sim/**` holds the new `tests/sim/first-map-balance.test.mjs`; the four Python tests and `program_fixture.py` I changed are in its list), `browser-view` (`src/browser/view/program-editor.ts`, `tests/view/**`), `product-foundation` (`foundations/**`), `agent-workflow` (`.claude/**`, `.agents/**`), `build-tools` (`README.md`, `stryker.config.json`). Every file the change added or changed belongs to a part: the check reports no unclaimed file (`foundation_check.py` exit 0). No dependency between parts changed, no trust boundary changed (the loader's rule was not touched).
- **Decisions written or changed:** none in this step (the change wrote D-396, D-397 and corrected D-19, D-121, D-124, D-330, D-378, D-388 in its foundation step, commit `78d2aa2b`).
- **Invariants written or changed:** none in this step (the change wrote `first-map-stock` and `first-map-balance`: the first projected from the definition and set by D-396, the second from row 2 of *Settlements to record*, set by the human's answers on position 1a and Q6; `first-map-balance` was narrowed in the fix, commit `3b378a8b`).
- **Environment facts:** none. The measurement in a copy of the engine outside the repository stands in D-397's *Rationale* as a measurement with its conditions, not as a fact about the world that no commit makes true; no entry rests on a source outside the product that the foundation lacks.
- **Glossary terms:** none. I read `foundations/glossary.md` and the glossary of the-way at the pinned commit (`.the-way/foundations/glossary.md`) whole, and WAY-95. „Skraj lasu” is the name of a map in the data, not a term. „first map”, „opening map”, „opener” are used in the sense a reader of the field gives them, and D-136 says in the sentence what an opener is, so a reader would not read an English file wrongly; „solved map” has an entry whose sentence is still true (a map on which a map run has had a completion). No term is used against its entry.
- **Part-map changes:** none.
- **Projected entries written whole or in part:** D-396 (whole, with the two departures the template forces: *Relations* filled, *Verification* also names `first-map-balance`) and `first-map-stock` (whole, with *Method* `test` as projected mode allows once a cheap test exists, *Derives from* D-396). Both by the foundation step, `78d2aa2b`.
- **Rows of *Settlements to record* written:** row 1 → D-397; row 2 → `first-map-balance`.

## Choices that bind after the merge (WAY-36)

Decided one by one; none is written, each stays a row of the cycle's questions table:

| Choice | Binds after the merge? | Why not an entry |
|---|---|---|
| identifier `forestEdge` | no | an identifier of the data, like `forest` and `forestDeep`, which no entry records either; D-332 already says the address is built from the identifier the data gives, and D-18 puts maps in data; renaming it later is a change of data and of the save version, which D-206 handles |
| first place of Skraj lasu in the data | no | what binds is D-396 (a new game opens Skraj lasu) and D-136 (a map opens by its opener), both written; the order of the list of maps is the data's order, a fact of the code that no decision states for any map, and writing one now would be a new rule beyond the task and the row |
| horizon of 5000 game minutes that defines „solved” in the balance test | no | a cut-off of the test; the measurement showed 0 open runs at 5000 and the same shares at 20000, so it changes no share; the reviewer's M3 moved test details out of the invariant, and the entry's „solves the map” stays the meaning of a completion |
| seeds named as real moments | no | a choice of the test (the sentence says „several hundred map runs that its test names”); same reason |

Nothing else the change decided binds: the migration helper `withEdgeSolved` and the 62 migrated test files are test code; the editor reading the resources of every map is D-289's rule (cited in the comment since the fix).

## Checks (command, exit)

| Command | Exit |
|---|---|
| `node` import of `dist/browser/sim/data/maps.js`, `map-card.js`, `game.js` printing the data, `minutesWithoutFire`, the maps a new game can send to | 0 (values above) |
| `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |
| `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` | 0 |
| `grep -rn "forestEdge\|Skraj lasu" src` outside `maps.ts` | no hit |
| `git status --short` | empty, so no uncommitted change |

Not run: the whole gate (the orchestrator's), the node tests again (no file changed since the fix review's run of 2023 of 2023).

## Unread material

- The 62 invariants of `simulation` and `every`: for the 18 that name maps, versions, seeds, tiles or a new game I read the entry whole; for the other 44 I read only the sentence (the first paragraph).
- Decisions of *Decisions in play* not read whole in any step: D-18, D-22, D-80, D-82, D-142, D-144, D-208, D-209, D-210 (I know them by the fragments in the task and by the searches; the review read most of them and found nothing). D-24, D-122, D-136, D-206 were read in part earlier; their cited sentences are the ones compared.
- D-325's and D-368's *Rationale* and *Rejected*: read, but I compared only the parts that name Las, a number of maps or the first map.

## Searches not found or unclear

- A decision that states the order of the list of maps: not found (searched `data's order`, `order of the maps`, `order of the list of maps` in `foundations/decisions.md`).
- A glossary entry for „first map”: none, and none judged needed (see above).
- Unclear, for the request's list: D-136 *Rationale* "Las teaches keeping the loop going, Las — głębiej adds combat" is now incomplete (Skraj lasu is the first step), though not false; the task lists D-136 among the entries left, so I did not change it. Also D-325's counter-of-maps sentence (above).
- Carried, not mine to change (review findings O1, O2, O3 and the Minor note of the fix review: the header comment of `tests/sim/first-map-balance.test.mjs` that the naive program never leaves the entrance tile, true of the program as written, not asserted): go to the request's list.
