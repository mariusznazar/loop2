# Report - executor of slice 7 (the campaign of a player over many days)

**Status:** done

**Commits:** `d78071df` on `task/przyrzad-balansu` (base `690156e1`), one commit by path: `feat: :sparkles: add the campaign of a player over many days to the balance instrument, ...`. Author address checked with `git log --format='%h %ae'`: the private address, as the rules say for this account.

## Files changed

| File | Added / removed lines |
|---|---|
| `balance/campaign.mjs` (new) | +615 / 0 (about 400 lines of code without comments and blanks; the longest function is under 40) |
| `balance/players/edge-daily-best.json` (new) | +50 / 0 |
| `balance/players/edge-daily-decent.json` (new) | +50 / 0 |
| `balance/players/edge-daily-decent-stock.json` (new) | +50 / 0 |
| `tests/balance/campaign.test.mjs` (new) | +217 / 0 |
| `balance/loop.mjs` | +1 / -1 (the keyword `export` on `earnedPoints`; a reach, see below) |

## What was made

- `balance/campaign.mjs` exports `playCampaign({ player, programs, seed })`, `campaignSweep({ player, programs, seeds })` (the notes' campaign and its sum, ported into small functions: the 300-line function is now 25 functions, none near the 200-line rule, so no further file was needed) and `programsOf(player, registry)`, which turns the identifiers of a description into programs from a registry the caller gives (the tests pass `REFERENCE_PROGRAMS`; the module imports no reference program itself, so Slice 8's command wires it). The description is checked at the start of a campaign (days, returns, a pace that is one of `BALANCE.paces`, the cash-in rule, maps and branches that exist, roles that have programs); a bad one throws a sentence naming what is wrong.
- The campaign runs the game's `send`, `advanceMinutes`, `setPaused`, `settleDeath`, `settleCompletion`, `end`, `startLoop`, `catchUp`, `closeAwayReport`, `stopLoop` and `buyBranch`; it copies no number: the real time of a manual map run is `ceil(minutes / (BALANCE.gameMinutesPerRealSecond * pace))` seconds; the loop clock starts at `LOOP_START_MS` of `balance/loop.mjs`.
- The three descriptions in `balance/players/` (`edge-daily-best`, `edge-daily-decent`, `edge-daily-decent-stock`), each with an English `description`, take Skraj lasu (`firstMap: "forestEdge"`) from the game's data, no overlay. Programs by the identifiers of `tests/sim/reference-programs.mjs`: best = `forestBest`, `forestDeepBest`; decent = `forestDecent`, `forestDeepDecent`; stock = decent with `forestLoopWithStock` for Las (eight sticks asked). Each attempt's `needChest` equals the take list of its program (a test checks that the need covers the take list).
- The summary keeps the notes' figures; "second map" became "last map" (`lastMapSolved`, `lastMapSolvedDay`, `lastMapAttempts`, `lastMapSolvedShare`), since a description may hold any number of attempts.

## Checks (command, exit code)

| Check | Command | Exit | Result |
|---|---|---|---|
| Test before the module stands (placeholder returning shapes with empty values) | `npm test -- tests/balance/campaign.test.mjs` | 1 | 8 of 11 failed on assertions (`firstMapAttempts >= 1`, `final.solvedMaps` lacks the first map, `daily` is empty, no byDay rows, ...); 3 passed on the placeholder because they hold vacuously for it (no purchases, equal empty records, a thrown refusal is not yet tested). Log: `reports/executor-7-red.log` |
| Test after the module | `npm test -- tests/balance/campaign.test.mjs` | 0 | 11 of 11 pass (final run, after formatting and the last comment edit). Log: `reports/executor-7-green.log` |
| ESLint | `node node_modules/eslint/bin/eslint.js --max-warnings 0 balance tests/balance` | 0 | pass |
| Prettier | `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore balance tests/balance` | 0 first after `--write` on the two new `.mjs` files | pass |
| Size rules | `node tests/quality/eslint-size-rules.mjs` | 0 | names nothing of `balance/` (grep count 0); it lists four items elsewhere (`src/browser/view/programs-entry.ts` and others), none mine |
| Own check: loop test still passes after the `export` | `npm test -- tests/balance/loop.test.mjs` | 0 | 5 of 5 |
| Own check: foundation check | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 0 | 0 errors |
| Own check: private paths | `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` | 0 | run after the commit, when the new files are tracked |
| Own check: names of the notes | `grep -n -i -E "analizy|symulator|krytyka|The Brain|Storage|repos|przyrzad|nakladk|fable|C:|polityk|kampania|silnik|D-80"` on the five new files | 1 | no match (the first run matched the verb "notes" in two comments; reworded) |

Not run: the full gate (`npm test` with no argument), as the handoff says.

## Own-work check

**Requirement most likely not met:** the campaign must play as the game does and give what the notes' instrument gave on the same road, and it must start no loop before the first map is solved and buy nothing the points do not cover.

- Relations in the test, written without the campaign's help: the player with an empty first program ends with no loop, no purchase and nothing solved; the first map is solved in at least the real time its game minutes take at the pace (a pace mutant, see below, fails it); the days of the record run 1..3; each solved map's opening map stands before it in the solved list; per tree, the cost of the bought ranks (from `BRANCHES`) is at most the points earned (from `SKILLS` thresholds and the final practice), and `bought` agrees with the ranks held, branch by branch; an attempt needing more than the chest's capacity is never made; the same seed gives the same campaign; the means of the sum come from the logs it sums.
- Mutants (each run, then the good copy restored and `cmp` equal before the commit):
  - the check of the chest dropped from `dueAttempt` (`hasAll` replaced by `true`): `npm test -- tests/balance/campaign.test.mjs` exit 1, only "an attempt whose need of the chest can never be met is never made" fails (`reports/executor-7-mutant-needchest.log`);
  - `bought.push(branchId, branchId)`: exit 1, only the purchases case fails (`reports/executor-7-mutant-bought.log`);
  - the manual real time divided by twice the pace: exit 1, only the first-map real-time case fails (`reports/executor-7-mutant-pace.log`).
  - Starting the loop before the first map is solved is refused by the game's `startLoop` (the campaign throws "the game refused the loop"), which the first test would meet as an error.
- Comparison with the notes' own results of the same three players on seeds 1-100 (28 days), as a check of the port, by a script of mine in `.runs/executor-7/` (removed): first map solved 100/100 for all three; last map solved 100, 100 and 98 of 100 (the notes' 100, 100, 98); the median day of the last map 2, 3, 2 (the same); progress lost 0; resurrections used per campaign 0.22, 0.59, 0.30 (the same); loop completions 58.89, 59.05, 58.99 (the same); for the best player, final points 15 on every seed (the same). For the two decent players six campaigns end with 18 points where the notes' files show 17 with the same practice per tree; the cause is that the game's thresholds of the combat trees were lowered after the notes' results were made (`git log` shows commit `6e7e95e7` on `src/browser/sim/data/skills.ts`), checked on seeds 17, 49 and 57 where `oneHandedCombat` practice is 20, 20 and 16 and the number of points from it grew; the per-seed logs of the two runs are otherwise equal in attempts, solved days, resurrections and completions on all 100 seeds.

## Choices (way rejected, cost if wrong)

1. **`settleCompletion` is called at the end of a manual map run that ended in a completion**, which the handoff's list of game functions does not name and the notes' campaign did not call. The game's browser clock (`src/browser/view/clock.ts`) calls it, and it makes the team's resurrection ready at the first completion of a map when it was not ready. Rejected: leaving it out as the notes did. Cost if wrong: results of a campaign where a manual run solved a map with the resurrection spent could differ from the notes'. I ran the 300 campaigns above with the call removed: the figures were the same, so on these three players it changes nothing seen; with it, the campaign agrees with the game on that rule.
2. **`resurrectionReady` is called with the team**, not the character as the notes' version did (the game's signature is `resurrectionReady(team, nowMs)`); a small mismatch adapted to the code.
3. **The loop's save time after a catch-up is the `clockMs` the game returns**, as `balance/loop.mjs` does, not the notes' extra `saveTimeMs: clock.ms` on the branch that leaves the loop going. The two are equal here (the clock moves in whole loop minutes between returns). Rejected: the second assignment, which hides the game's own value.
4. **`lastPurchaseDay` is written at every purchase** with the real days gone then (also in the first purchase, which the notes wrote as 0, and after a manual attempt, where the notes wrote none). Rejected: the notes' two special cases. Cost: `lastPurchaseDay` can differ slightly from the notes' figure for the first purchase; the summary of the best player gives 23-24 as the notes do.
5. **The description is checked and given defaults at one place** (`checkedPlayer`); `firstMap` and `pace` are required and carry no default of the game's identifiers (the notes defaulted the first map to `forest` and the pace to 16). Rejected: the notes' defaults, which copy a game value into the instrument. Cost: a description without them is refused with a sentence.
6. **`programsOf` takes the registry as an argument** instead of importing `tests/sim/reference-programs.mjs` into `campaign.mjs`. Rejected: the import inside the module, which would tie the module to one registry. Cost: Slice 8's command passes the registry (one line).
7. **The campaign function was split into 25 functions of one file** (615 lines with comments, about 400 of code), not into more files; the size rule is satisfied (the check names nothing of `balance/`). Rejected: a second file for the summary; it would hold about 130 lines and a second import list. Cost: one file near half of the 800-line limit; a later growth may ask for a split.
8. **Short test campaigns on one to three seeds**; the longest is 10 days on seeds 1 and 2 (about 50 ms each). The tests import the three player files with a JSON import (`with { type: "json" }`) and read no other file; this reads a product's data file, not a test's, and the testing guidelines' "no file of test data" is about the latter. Rejected: copying the descriptions into the test, which would test a copy. Cost: if the JSON import form is later not accepted by a tool, the import lines change.

## Reaches beyond the handoff

- `balance/loop.mjs`: the keyword `export` added to `earnedPoints`, so the campaign uses the same count of earned points as the loop (the other way was a second copy of five lines). The file is of Slice 6 and not in this slice's *Change*; the loop test still passes.
- `src/browser/sim/game.ts` (`send`, `settleDeath`, `settleCompletion`, `end`, `advanceMinutes`, `resurrectionReady`, `canSendMap`), `src/browser/sim/skills.ts` (the head, `buyBranch`, `branchRank`), `src/browser/sim/programs.ts` (`checkProgram`), `src/browser/sim/trip.ts` (`pieceCount`), `src/browser/sim/data/balance.ts` (the head) and `src/browser/view/clock.ts` (a grep for `settleCompletion`): read in parts to confirm the signatures and the pace rule; the handoff names `game.ts` and `skills.ts` but not these.
- The notes' `wyniki/` files of the three players on seeds 1-100 and `programy/zrodla.mjs` (the three programs' descriptions), read to check the port and the mapping of the notes' program names to the identifiers; `git diff 20bcc58d HEAD --stat -- src/browser/sim/data/skills.ts` and `git log` on that file, to explain the 18-against-17 points.
- `tests/sim/reference-programs.mjs` (parts) and the reports `executor-1-report.md` and `executor-6-report.md` of this cycle, for the identifiers and the loop module's conventions.

## Unread material

- `foundations/glossary.md`: read the entries `manual map run`, `completion`, `solved map`, `streak`, `practice`, `trip plan`, `resurrection`, `generation number`, `earning loop`, `loop`, `catch-up`, `save time`, `loop clock`, `reading`, `overlay` (lines 136-260 and 290-294); not the rest.
- `guidelines/testing.md`: read lines 1-214 (the trust-boundary table's first rows to line 214 only), 249-266, 304-313 and 332-430 and the headings; not 215-248 (the rest of the trust-boundary table), 267-303 (mutation testing) and 314-331 (tests on a document imitation); this slice touches none of those subjects.
- `src/browser/sim/game.ts`, `src/browser/sim/loop.ts` (read 95-220, 555-612 and `catchUp`), `src/browser/sim/skills.ts`: read in the parts named above, not whole.
- The notes: `przyrzad/kampania.mjs` whole, the three `polityki/skraj_dobowa_*.json` whole; `README.md` lines 15-110 in part; `przyrzad/balans.mjs` lines 175-205, `przyrzad/silnik.mjs` the function `earnedPoints`, `programy/zrodla.mjs` the comments and sources of the programs the descriptions use; the other files of the notes not read.
- `foundations/decisions.md`: D-136, D-397, D-239, D-240 and D-425 read whole; D-427 read; the other decisions not opened.

## Searches not found or unclear

- none. One point I checked and found small: the handoff says "taking Skraj lasu from the game's data and no overlay"; the data holds it as the map `forestEdge` and the descriptions name it by that identifier.

## Problems observed

- The six campaigns whose final points differ from the notes' files (17 against 18) are explained by the changed thresholds of the combat trees in the game's data, as shown in the own-work check; the cause was verified by the practice per tree being equal and the thresholds' history, not by running the old game.
- Three of the 11 tests passed on the empty placeholder (they hold vacuously for empty records); the mutants above show the tests that guard the module do fail on a wrong module.

## Working copies

`.runs/executor-7/` under the worktree root held the logs of the runs, a probe script, the comparison scripts, their output and the saved good copy of `campaign.mjs` for the mutants; the logs the report needs were copied to `reports/executor-7-red.log`, `executor-7-green.log` and `executor-7-mutant-*.log`; the directory is removed before returning. The build output `dist/` is the product's ignored build output, not a working copy of mine.
