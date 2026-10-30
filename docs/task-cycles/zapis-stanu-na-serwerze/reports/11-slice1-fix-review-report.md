PASS b36292edb8d9faa55a19a79439aa76004dd398ec

# Review of the fix — Slice 1 findings I1, I2, I3, task `zapis-stanu-na-serwerze`

- Range: `b4c3687..b36292e` — `59cd18a` (I2, foundation agent), `b36292e` (I1 and I3, Slice 1
  executor). `git rev-parse HEAD` in the worktree = `b36292edb8d9faa55a19a79439aa76004dd398ec`, the
  head given; worktree clean.
- Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md`; bounded by the findings files
  `reports/09-slice1-fix-findings-foundation.md` and `reports/10-slice1-fix-findings-code.md`.
- Result: I1 fixed, I2 fixed, I3 fixed; the fix brings no new Critical or Important finding.
  Blocking: 0. Minor: 0 new. Out of scope: 0.

## Findings of the findings files

**I1 — fixed.** `src/browser/sim/saved-game.ts:872-878`: the new `savedDocument` reads exactly
`version` and `game`, or, where an own key `revision` stands, exactly `version`, `revision` and
`game`, with `revision` checked by `identity` (positive safe integer) and only `game` going on
into the state (`:895`). This is the way the orchestrator chose. The order of the reasons does not
change: `versionOf` and `namesAbsentArchetype` run first, and `savedDocument` runs inside the
`try` that gives `shape`. A revision that is an accessor or inherited is refused by `own()` through
`fields`. Evidence: the new test "the server's save of the current version loads into the game it
holds, its revision left out" (`tests/sim/saved-game.test.mjs:398-410`) and seven new `CRAFTED`
cases (a revision of 0, −1, 2.5, `"3"`, `null`, 2^53, and an extra key beside the three) pass. My
earlier probe on the new build: `{ ...savedGame(state), revision: 3 }` → `ok` (it was `shape` on
`b4c3687`). StrykerJS leaves no survived or uncovered mutant in `:868-898`.

**I2 — fixed.** `foundations/decisions.md:1762`, D-97: "when it refuses it as of a lower version
(D-187), and when the tab had already stopped saving after that refusal, logout goes on and the
account forms show „Gra została zaktualizowana. Odśwież stronę.” in `warning` above them". That
now says what Settlements row 6 says (`task.md:295`): the tab that stopped saving logs out without
a save attempt and the sentence stays above the forms. *Verification* gained a complies example
and a violates example for exactly that case. The first sentence ("a tab that stopped saving after
the refusal of D-187 ends it without saving") still stands, and nothing else in the entry changed.
`foundation_check.py` 0.

**I3 — fixed.** "a game state the simulation made loads back from its saved document" now also
holds states made by the simulation in Las: a wait under a new game's empty „Program”, a `walkTo`
under `WALKING`, and a `walkToCampfire` under `RETURNING`
(`tests/sim/saved-game.test.mjs:855-897`, `:900-912`). Preconditions assert the activity kind, a set
`stepTo` for both walks, and no death (`:936-948`); the wait state's map run going on is checked by
the expected `paused: true`. A new `CRAFTED` case refuses a wait holding a rule's number. Evidence:
StrykerJS on `saved-game.ts` at the new head kills every mutant I3 named — the `wait` branch of
`ACTIVITIES` (`:462-464`, which before had no test reaching it), `MOVES.walkTo`/`MOVES.walkToCampfire: false`
(`:285-286`), and `doing.kind === "rule"` → `true` (`:496`). None of those survives, and none goes
uncovered.

## The fix diff itself

Nothing new found. The new tests take their expectations from the documents written into the test
or from the state the simulation made (the load must give it back unchanged, paused where the map
run goes on); none takes the load's own output as its expected value. The search loop of
`sentDoing` is bounded (400 minutes) and guarded by its preconditions, so the case fails rather
than passing without a wait or a walk. The comment of `loadSavedGame` (`:881-882`) has one line
over 100 characters. Prettier does not wrap comments, and `test_quality_invariants.py` passes, so
this is only a remark.

## Declined to judge

- The survivors that stay at `saved-game.ts:494` and `:497` (activity minutes, a move without its
  target) and the rest of my earlier M1 list — Minor findings of review 08, not in the findings
  files, which go to the whole-change review (WAY-161).

## Checks

| Command / method | Exit / result |
|---|---|
| `npm test -- tests/sim/saved-game.test.mjs` | 0 (13 tests, 13 pass) |
| `npm test -- tests/sim/purity.test.mjs` | 0 |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |
| `npm run typecheck` | 0 |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/saved-game.ts"` in a detached worktree of `b36292e` (scratchpad, `node_modules` linked, removed afterwards) | 0; 717 mutants: 625 killed, 80 survived, 12 no coverage (before the fix: 604 / 86 / 17). In `:283-287`, `:461-500` and `:868-898` the only survivors are at `:494` and `:497` (M1 of review 08). Report: `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\57822f85-5994-4aa0-ab30-2463555a5fde\scratchpad\mutation-saved-game-fix.json` |
| Scratch probe of crafted inputs (`…\scratchpad\fuzz\probe.mjs`) on the new build | the save with `revision` → `ok`; the same without `revision` → `ok` |
| Scratch fuzz (`…\scratchpad\fuzz\fuzz.mjs`, 150 random games) on the new build | 50 534 states, 0 refusals, 0 differences |

Not run: the whole gate (`npm test` with no argument), as the dispatch gives.

## Reaches beyond the dispatch

- `.the-way/task-cycle/review/fix.md` — the method's file for the review of a fix (named by
  `SKILL.md`).
- `task.md:295` (row 6) — to compare D-97 with its source again.

## Searches not found or unclear

- The executor's open point: spec decision 1 calls `revision` a "positive integer", while the load
  checks a positive *safe* integer. Both agree for every revision the server can write (it counts
  up from 1, stored as an SQLite integer). A revision above 2^53 − 1 would be refused as `shape`.
  I read this as no conflict; the orchestrator's choice holds.
- Otherwise none.
