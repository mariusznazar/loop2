PASS 55c7d624dfde1e919febe5a1953e0c6dd78f66ad

# Review of the fix of the whole-change review's findings — task rana-i-opatrunek

Range `5731b59213c317bdfb76e0ed27ca0768c2dbdbcb..55c7d624dfde1e919febe5a1953e0c6dd78f66ad` (six commits: `88f17fcc`, `f5bd070f`, `87ee8842`, `f1cc7a26`, `d9d67869`, `55c7d624`; 9 files, +239 −31), branch `task/rana-i-opatrunek`; `git rev-parse HEAD` in the worktree gives `55c7d624`. Method: `.the-way/task-cycle/review/SKILL.md` and `fix.md`, read whole. Bounded by `reports/fix-whole-findings.md` (I-1, m-1 to m-6, m-8); claims checked against `reports/fix-whole-report.md`.

Counts: 0 blocking remain; of the findings file, I-1 and m-2 to m-6 fixed, m-1 remains (Minor, contest kept as a deferral, the finding kept), m-8 withdrawn; no new finding in the fix diff of any grade; 0 out of scope.

## The findings

### I-1 (Important) — fixed

- `src/browser/view/combat-line.ts:85` now writes `zdrowie ${whole(character.characterHealth)}/…`, and `whole` (`src/browser/view/body-row.ts:25-32`, `Math.floor`) is the very function the body row now uses for health and nature energy (`body-row.ts:56-57`, behaviour of the row unchanged), so the paragraph and the body row show one number for one health and cannot drift apart.
- Evidence on the new head: the probe `reports/review-whole-fix-probe.mjs` (output `reports/review-whole-fix-probe.out.txt`) plays the reference program `forestBandages` on Las — wataha through the game's own functions and prints the paragraph: „Mag uciska ranę: zdrowie 72/100”, where the same probe on the reviewed head gave fractions with a point. `tests/view/combat-line.test.mjs` now holds a fractional health (71.1 → „71”) and the floor at 59.95 → „59” and 100 → „100”; the fixer saw it fail first on `71.1/100`.
- The fix writes a whole number, not a decimal comma: that is what the body row writes for health, which was the departure the finding named; a comma would have left two different numbers. Accepted.

### m-1 (Minor) — remains; the contest is kept as a deferral, the finding is kept

The fixer's evidence is a cost, not an absence of the defect: judging an item action by its pair needs the predispositions in `Repertoire` (an alias of `Understanding`) or at every caller, and four `deepEqual` expectations of `tests/sim/repertoire.test.mjs` compare a repertoire with a bare Understanding. That holds (`src/browser/sim/understanding.ts:84-133` unchanged). The divergence still cannot occur with today's data (one item with a recipe, a healing and a pocket; one archetype holding `tending`), as my first review said. I keep the finding as a Minor one that remains, and agree it belongs to the change that adds a second recipe item or a second archetype (task 9's club), which will have a divergence to test. It blocks nothing.

### m-2 (Minor) — fixed

`tests/sim/tree-entry.test.mjs` (new, registered in `stryker.config.json`) lays a skill growing „Wytwórz — szyna” and an item revealed by the chill, and holds the four sides of the rule: verb held and item new enters (with the game's own bandage and „Wytwórz”), item new with no verb does not, verb new with the item neither held nor new does not enter the laid tree, both held and none new does not. Its rows are laid and taken off in `finally`, with preconditions that the data lack them. StrykerJS on `understanding.ts:403-420` with this file among the tests: the mutants that survived in my first review are killed now, one equivalent one survives (see *Checks*).

### m-3 (Minor) — fixed; the trust boundary checked again

- `src/browser/sim/saved-game.ts:772`: a turn of a combat record whose action `branchActionAvailable(skills, kind)` refuses, `skills` being the skills of the map run's character, is refused as `shape`; the skills are threaded through `exchange`, `combatResult` and `lastCombat` from `plainMapRun` (`:1129-1134`), which reads both a manual map run and the run of an earning loop.
- A document the game writes still loads: the run's character is a copy of the skills at the start of the run (`run.ts:427`, `copySkills`), the fight is fought with those skills, and no later act changes them — a purchase acts from the next run (D-200), a death keeps the map run on the screen as it was (D-190), and every new run starts with `lastCombat: null` (`run.ts:440`). The probe confirms it on the new head: a manual map run of a character with „Ucisk” bought, saved after a fight with a turn of „Ucisk”, loads (`ok=true`), and so does the game with an earning loop whose map run fought with „Ucisk” (`ok=true`); the same two documents with the rank taken off the map run's character are refused as `shape`, while on the reviewed head both were admitted (`reports/review-whole-fix-probe-base.out.txt`). Every test file of `tests/sim/` and `tests/view/` that calls `loadSavedGame` and the loop, catch-up and death tests pass.
- Crafted input: the two new cases of `CRAFTED` in `tests/sim/saved-game.test.mjs:3395-3404` (a run's character with no rank of „Ucisk”, and with no skill of the tree) join the cases of the invariant `save-version`, whose test refuses each whole. The one edge case that changed („the last rank of „Mocniejszy zwój” with all four points”) changed for the cause the fixer names — the fixture shared one skills object between the team's Ala and the run's character — and it now loads a legal state; no assertion was weakened.
- The refusal is data-driven (the branch's `action` effect), not special to „Ucisk”; it refuses more, never less („Wolno odmówić więcej, niewolno mniej”, `guidelines/coding-saved-game.md`).

### m-4 (Minor) — fixed

`src/browser/sim/data/gear.ts:36-40`: the comment of `WIELDING_SLOT` now names it the slot of a combat action that names no place of its own, and says an action that names a place, as „Ucisk” the pocket, takes from that place's slots — true of `pieceSlots` (`program.ts:521-527`).

### m-5 (Minor) — fixed

`tests/sim/pressure.test.mjs:314-315` keeps only the sentence that gives the reason for the laid item.

### m-6 (Minor) — fixed

`RUN_RECORD` of the document of version 12 (`tests/sim/saved-game.test.mjs:871-895`) counts 10 minutes of „Opatrz” (one finished tending, the data's 10 minutes) and 50 of gathering, the sum of 212 kept, and the two comments say 10; `practice.tending: 3` (two turns of „Ucisk” and that tending) now matches what the rules make.

### m-8 (Minor) — withdrawn

The contest holds: the pocket's words „bierze opatrunek z plecaka do kieszeni” name the one item that fits a pocket today, as the main hand's words name the stick; the item data hold no inflected form to put into a generic sentence (`name` and `plural` only), so a generic word would lose what the words tell and a templated one would be wrong Polish. The change that makes a second item fit a pocket meets these words in the same data row. `55c7d624` restores the words and their test literals exactly as at the reviewed head (`git diff 5731b592..55c7d624 -- tests/view/gear-words.test.mjs` is empty).

## The fix diff, for what it broke

Read whole (`git diff 5731b592..55c7d624`). Nothing found: no code that passes a test without meeting the requirement, no weakened assertion, no new literal of an item or place in the view (`whole` is a pure number function), no growth over a threshold (size test passes). The import of `body-row.ts` into `combat-line.ts` is between two pure modules of the view. The intermediate commit `f1cc7a26` and its revert leave no trace but the comment of m-4.

## Checks run

In the worktree of the head `.runs/review-whole-fix/head` (and, for the comparison, of the base `5731b592`, `.runs/review-whole-fix/base`).

| Check | Exit |
|---|---|
| `node scripts/build.mjs`; `npm run --silent typecheck` | 0; 0 |
| `node scripts/test-node-file.mjs <file>` for every `tests/sim/` and `tests/view/` file that calls `loadSavedGame` (catch-up, content-revision, death, discovery, judging-record, loop-record, loop, pressure, program-list, saved-game, team; account-screen, end-question, end-window-game, game-saver, judging-cache-page, login-card-focus, owner-panel and the rest the grep listed), and `tests/sim/tree-entry`, `tending`, `tests/view/combat-line`, `gear-words`, `chronicle-entries`, `body-row`, `body-row-cells`, `tests/balance/agreement` | 0 each (34 files) |
| `python -B scripts/test.py` for `tests/quality/test_mutation_test_selection.py`, `test_function_and_file_size.py`, `tests/invariants/test_content_identifiers.py` | 0 each |
| `python -B .the-way/elements/common/foundation_check.py` | 0, „0 errors” |
| `node probe-fix.mjs <out>` on the head (copy `reports/review-whole-fix-probe.mjs`, output `reports/review-whole-fix-probe.out.txt`) and on the base (output `reports/review-whole-fix-probe-base.out.txt`) | 0 — head: both game-written documents load, both stripped ones refused as `shape`, paragraph „zdrowie 72/100”; base: the stripped ones admitted |
| StrykerJS, `--mutate "src/browser/sim/saved-game.ts:760-790,src/browser/sim/understanding.ts:403-420"` with the product's list of simulation tests | 0 — 67 killed, 1 survived, 0 no coverage; `saved-game.ts` 35 of 35 killed (the new refusal included); the survivor, `understanding.ts:417` (`pair.item !== undefined &&` → `true`), is equivalent: for a pair with no item `items.includes(undefined)` is false |

Not run: the whole suite (the cycle's own run, by the handoff).

## Working copies

- `.runs/review-whole-fix/` — worktrees of the head (`head/`) and of the base `5731b592` (`base/`, whose built `dist/browser/sim/saved-game.js` I edited to trace a refusal of my own first probe, which lacked a save time), each with `.the-way` initialized at the pin (head) and `node_modules` a junction to `the `node_modules` of the main checkout`, and the outputs of the checks. Removed: the junctions by `rmdir`, the two worktrees by `git worktree remove --force` and `git worktree prune`, then the directory by its full path. The reviewed worktree, its index and branch are unchanged.
- Kept in `reports/`: `review-whole-fix-probe.mjs` (run from a worktree root after `node scripts/build.mjs`: `node review-whole-fix-probe.mjs <out>`), `review-whole-fix-probe.out.txt`, `review-whole-fix-probe-base.out.txt`.

## Unread material

- `guidelines/coding-saved-game.md`, `coding-browser-module.md`, `testing.md` and `coding.md`: read whole in the review of the whole change and not again; `guidelines/styleguide-browser-view.md`: read in part as that review says.
- No decision opened anew; the fix writes no foundation entry.

## Searches not found or unclear

none
