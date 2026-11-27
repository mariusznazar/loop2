# Report — the fix of the findings of the whole-change review (task rana-i-opatrunek)

**Status:** done with concerns (m-1 is contested as a structural mismatch and m-8 as not fixed, by the orchestrator's decision; nothing else is open).

Worktree `the worktree's root`, branch `task/rana-i-opatrunek`, fix range `5731b592..55c7d624`. Nothing pushed.

## Commits

| Commit | What |
|---|---|
| `88f17fcc` | I-1: the health of „Ucisk” in the paragraph of an encounter (test written first, seen failing) |
| `f5bd070f` | m-2: the item side of the tree's entry, new file `tests/sim/tree-entry.test.mjs`, registered in `stryker.config.json` |
| `87ee8842` | m-3: the load refuses a combat record whose turn carries out an action of an unbought branch |
| `f1cc7a26` | m-4, the formatting of `tests/view/combat-line.test.mjs`, and the generic pocket words of m-8 (reverted by `55c7d624`) |
| `d9d67869` | m-5 and m-6 |
| `55c7d624` | m-8: the generic pocket words reverted by the orchestrator's decision |

Files changed (added/removed lines against `5731b592`): `src/browser/sim/data/gear.ts` 9, `src/browser/sim/saved-game.ts` 39, `src/browser/view/body-row.ts` 13, `src/browser/view/combat-line.ts` 3, `stryker.config.json` 1, `tests/sim/pressure.test.mjs` 5, `tests/sim/saved-game.test.mjs` 29, `tests/sim/tree-entry.test.mjs` +133 (new), `tests/view/combat-line.test.mjs` 44, `tests/view/gear-words.test.mjs` 2. Total 244 insertions, 34 deletions.

## Findings

### I-1 — fixed (`88f17fcc`)

- Fix: `src/browser/view/body-row.ts` gets an exported `whole(value)` (`` `${Math.floor(value)}` ``), which `bodyNumbers` now uses for the health and the nature energy cells (their behaviour is unchanged), and `src/browser/view/combat-line.ts` writes `zdrowie ${whole(character.characterHealth)}/${BALANCE.body.startHealth}`. One function serves both, so the paragraph and the body row cannot depart.
- The form is a **floor**, because the body row floors (`Math.floor`, the styleguide's „całych liczbach”); 71,1 reads „71”, 59,95 reads „59”. Way rejected: a rounding (`Math.round`), which would write 60 for 59,95 while the body row, beside it on the same screen, writes 59, so the player would read two numbers for one health. Cost if wrong: none outside these two texts; the floor is what the product already did.
- Tests: `tests/view/combat-line.test.mjs` now uses a fractional health (71.1) in the case of the turn, and a new case holds 100 → „100” and 59.95 → „59” (floor, never rounded up). The refill case keeps its integer health (93; it tests the refill words, not the number).
- Test failing first: `npm test -- tests/view/combat-line.test.mjs` exit 1, with `zdrowie 71.1/100` against `zdrowie 71/100` and `59.95/100` against `59/100` (the expected reason). Then exit 0 (5 passed) after the code.
- Beside: `tests/view/body-row-cells.test.mjs` (9), `body-row.test.mjs` (27), `body-row-explanation.test.mjs` (5), `chronicle-game.test.mjs` (4), `gear-words.test.mjs` (7), `world-area.test.mjs` (20) all exit 0, 0 fail.
- Not checked: the end-of-run window and the chronicle read the same `combatText`, so they inherit the form; I did not render them.

### m-1 — contested (not fixed): a structural mismatch

- What the fix needs: `actionInRepertoire(repertoire, action)` judges by the `Repertoire` alone, and a `Repertoire` holds only kinds in `actions` (a type alias of `Understanding`, with no predispositions). To judge an item action by its pair the repertoire has to carry the predispositions it was computed from (a new field of the type of the repertoire), or the callers have to pass them (`ruleInRepertoire`, `programInRepertoire`, `outsideReason`, `program.ts` `reach`, `game.ts`).
- Why that is structural, by the handoff's measure: `repertoireOf` returns what four existing tests compare with `deepEqual` against a bare Understanding (`tests/sim/repertoire.test.mjs` lines 105, 131, 316, and the `without` case at 309): an added field makes them differ and their expectations would have to be rewritten. The type reaches `game.ts`, `program.ts` (`reach: { repertoire, known }`), the editor offer through `editorRepertoire` and `knownRepertoire`, and the literals of repertoires in the tests (`SMALL` and others).
- Proposal and cost: add `predispositions: readonly SkillId[]` to `Repertoire` (a type of its own, `Understanding & { predispositions }`), set by `repertoireOf` (and so by `editorRepertoire` and `knownRepertoire`), and make `actionInRepertoire` judge an item action by `pairOpen(kind, item, repertoire.predispositions)`; a repertoire with no such field falls back to the kind. About 15 lines in `understanding.ts`, the four `deepEqual` expectations of `tests/sim/repertoire.test.mjs` rewritten, and one test with a laid second recipe item and a laid second skill for the divergence. The cost is the rewritten expectations and a widened type for a divergence no data of the game can show today (the bandage is the only item with a recipe, a healing and a pocket; the one archetype holds `tending`); the reviewer already judged it a miss of the plan only. Recommended: leave it to the change that adds a second recipe item or archetype (task 9), which will have a divergence to test.
- Left as it is; no code or test touched for it.

### m-2 — fixed (`f5bd070f`)

- New file `tests/sim/tree-entry.test.mjs` with four cases of `discover` over a skill (`probe`, grows „Wytwórz — szyna”) and an item (`splint`, revealed by the chill) laid in the data as `pressure.test.mjs` lays rows: (1) verb held, item new (the real bandage: the tree `tending` enters); (2) item new, verb not held: the laid tree does not enter; (3) verb new, item neither held nor new: only the real tree enters; (4) both held, nothing new: no entry. Added to `stryker.config.json`.
- Mutants seen killed by hand on `dist/browser/sim/understanding.js` (each restored): `itemHeld → true` (1 fail), `verbHeld(pair.action) && … → ||` (3 fail), the item's „new in this minute” `→ false` (1 fail); the restored build passes 4/4.
- Commands: `npm test -- tests/sim/tree-entry.test.mjs` exit 0 (4 pass).

### m-3 — fixed (`87ee8842`)

- The check the guideline allows: `characterAction` in `src/browser/sim/saved-game.ts` refuses (as shape) an action of a combat record for which `branchActionAvailable(skills, kind)` is false, `skills` being the skills of the map run's character, threaded through `lastCombat`, `combatResult` and `exchange`. It is data-driven (the branch's `action` effect in the data), so it is not special to „Ucisk”, and it is a refusal of the reader's way: the file already checks cross-fields against the character (the backpack against its capacity, the ranks against the Understanding's trees and the points). `guidelines/coding-saved-game.md` holds no sentence that the reader reads shape, not the repertoire; its sentence is „Wolno odmówić więcej, niewolno mniej”, and the reader's refusal of a state the game never writes breaks neither it nor D-386. Searched: `grep "not the repertoire|shape, not"` in `guidelines`, `foundations` and the file: no match.
- Crafted-input tests in `tests/sim/saved-game.test.mjs` (`CRAFTED`): „turns of „Ucisk” … whose character holds no rank of „Ucisk”” and „… no skill of „Opatrywanie małych ran””. Seen failing without the check (the first case reported `ok: true`; the second shown alone with the check off: failed on its own), then passing: `npm test -- tests/sim/saved-game.test.mjs` exit 0 (53 pass).
- One existing edge case had to change, with its cause: „the last rank of „Mocniejszy zwój” with all four points” edited the team's Ala, whose skills object the fixture shares by reference with the map run's character, so it took „Ucisk” off the run's character too and left the combat record's turns with no rank; the case now gives the run's character its own copy of its skills (a comment says why). The state it loads is a legal one (the run's character is a snapshot at the start of the run).
- Beside: the 23 test files that load a document (`grep -l loadSavedGame`) all exit with 0 fail.

### m-4 — fixed (`f1cc7a26`)

The comment of `WIELDING_SLOT` in `src/browser/sim/data/gear.ts` now says it is the slot of a combat action that uses an item and names no place of its own in its data, and that an action that names a place, as „Ucisk” names the pocket, takes its piece from the slots of that place.

### m-5 — fixed (`d9d67869`)

The comment above the test of „Ucisk” with a healing item that fits no pocket in `tests/sim/pressure.test.mjs` keeps only its last sentence (the reason for the laid item). `tests/sim/pressure.test.mjs` exit 0 (16 pass).

### m-6 — fixed (`d9d67869`)

The record of the map run of the document of version 12 (`RUN_RECORD` in `tests/sim/saved-game.test.mjs`) counts 10 minutes of „Opatrz” (one finished tending, `practice.tending: 3` holding two turns of „Ucisk” and that tending) and 50 of gathering (was 5 and 55; the sum of 212 stands), and the two comments that said 5 say 10. I kept `practice.tending: 3` and changed the minutes, so the document describes a game the rules make. `tests/sim/saved-game.test.mjs` exit 0 (53 pass), `tests/sim/run-record.test.mjs` exit 0 (15 pass).

### m-8 — contested (not fixed), by the orchestrator's decision (`55c7d624`)

- I first changed the pocket's refill to „bierze przedmiot z plecaka do kieszeni” (in `f1cc7a26`); the orchestrator decided against it, and `55c7d624` puts „bierze opatrunek z plecaka do kieszeni” back in `src/browser/sim/data/gear.ts`, with the literals of `tests/view/combat-line.test.mjs` and `tests/view/gear-words.test.mjs`. The comment of `WIELDING_SLOT` (m-4) is kept.
- Reason: the words follow the product's pattern for a slot (the main hand's „bierze patyk z plecaka do ręki”, settled in D-340 and the task's row 2); only the bandage fits a pocket today; a generic word loses the information the main hand's words give, and the item data hold no accusative form to interpolate (`name` and `plural` only, so „bierze {nazwa}” would be wrong Polish for a feminine item). It goes to the request's list.

### Not fixed by design

m-7 (the return step's), m-9 (outside the task): untouched. `foundations/` untouched.

## Checks (command and exit code)

- `npm test -- tests/view/combat-line.test.mjs`: 1 (before the code, the expected failure), then 0 after.
- After the revert of m-8 (`55c7d624`): `npm test -- tests/view/gear-words.test.mjs` (7 pass), `combat-line.test.mjs` (5), `chronicle-entries.test.mjs` (15) and `tests/sim/data.test.mjs` (45): each 0; `foundation_check.py --skip-test-citations`: 0.
- `npm test -- tests/view/combat-line.test.mjs`, `gear-words.test.mjs`, `chronicle-game.test.mjs`, `world-area.test.mjs`, `body-row.test.mjs`, `body-row-cells.test.mjs`, `body-row-explanation.test.mjs`: each 0.
- `npm test -- tests/sim/tree-entry.test.mjs`: 0 (4 pass); three hand mutants of `understanding.js` killed.
- `npm test -- tests/sim/saved-game.test.mjs`: 0 (53 pass); before the code, the new crafted case failed.
- `npm test -- tests/sim/pressure.test.mjs`, `discovery.test.mjs`, `tending.test.mjs`, `combat.test.mjs`, `gear-wear.test.mjs`, `gear-combat-wear.test.mjs`, `run-record.test.mjs`, `data.test.mjs`: each 0.
- The 23 test files that call `loadSavedGame`: each 0 fail.
- `npm run typecheck`: 0.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`: 0 (0 errors); also without the flag: 0 (0 errors).
- `npm test -- tests/quality/test_function_and_file_size.py`: 0 (2 tests OK).
- `npm test -- tests/quality/test_mutation_test_selection.py`: 0.
- `npx eslint` on the changed `.ts` and `.mjs` files: 0; `npx prettier --check` on the changed files and `src/browser`: clean.
- The whole suite was not run (as the handoff says).

## Own-work check

The requirement most likely not met: the player reads one number for one health (I-1 and the task's item 4 for numbers with a fraction). Check: the test of the paragraph with fractional health and the body row's own function; it showed 71 and 59, equal to what the body row writes. I did not re-run the probe `reports/review-whole-probe.mjs` (the product behaviour is covered by the case with 71.1 and the floor); the decimal comma of the task's item 4 concerns the values of „Szybkie gojenie”, not this health, which is a whole number.

## Reaches beyond the dispatch

- `guidelines/coding-saved-game.md`, `coding-content-data.md`, `coding-simulation-module.md`, `src/browser/AGENTS.md`: read whole before the files of their kinds.
- `foundations/decisions.md` D-340 (the refill entry of the chronicle) and the D-457 passages, by search, to see whether the pocket's words were bound: they quote the main hand's words only.
- `tests/quality/eslint-size-rules.mjs` head, for whether the size rule covers tests (it takes the linter's files); I put the new test in a new file because `tests/sim/discovery.test.mjs` already stands at 1095 lines.

## Unread material

- `guidelines/styleguide-browser-view.md` (174 KB): not read whole; I searched for nothing in it beyond what the finding quotes (the body row's rule of whole numbers), and relied on the finding's quotation. `guidelines/coding-browser-module.md` read by its headings only (the change adds one exported pure function to an existing module and an import between two modules of the view). `guidelines/testing.md`: read lines 1 to 199 of 510 (the rules of the expected value, the trust-boundary table); the rest not read.
- `.runs/task-cycles/rana-i-opatrunek/reports/review-whole-probe.mjs` and its output: not read (the findings file quotes them).
- `.the-way/task-cycle/change/slice.md`: not read (a fix does not read it).

## Searches not found or unclear

- The sentence „the reader reads shape, not the repertoire”, which the handoff attributes to `guidelines/coding-saved-game.md`: not found there or in `foundations/` (searched `not the repertoire`, `shape, not`); the nearest text is „Wolno odmówić więcej, niewolno mniej” and „Czytaj dokument ściśle”. I judged m-3 by those.
- `m-6`: the finding names „the comment and `practice.tending: 3`”; I read it as the minutes of the record not matching one finished tending and changed the minutes (not the practice); another reading (lowering the practice to 2) would also be consistent.

## Working copies

`.runs/fix-whole/` in the worktree held backups of `dist/browser/sim/understanding.js`, `dist/browser/sim/saved-game.js` and `tests/sim/saved-game.test.mjs` for the hand mutants; each file was restored over its original and the directory removed (`rmdir`). `dist/` was rebuilt by the test runs. No remainder.
