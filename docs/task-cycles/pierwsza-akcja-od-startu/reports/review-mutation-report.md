PASS e6ac95cdc86bfabf2b4bb3ceb0eca187020b6427

# Mutation analysis of the changed simulation files — task pierwsza-akcja-od-startu

Head confirmed: `git rev-parse HEAD` = `e6ac95cdc86bfabf2b4bb3ceb0eca187020b6427`. No tracked file touched (`git status --short` empty before and after). Written: `.runs/stryker/` (report `mutation.json`, `run-out.txt`), `.stryker-tmp/`, and, for the two manual runs below, `dist/browser/sim/understanding.js`, which I restored byte for byte (`cmp` with the saved copy: same).

Result: **no real gap**. 112 mutants, 92 killed, 0 timeout, 20 survived, 0 without coverage, 0 errors. Of the 20 survivors: 2 equivalent now (saved-game), 18 in `chillRuleGroupName`, of which 9 equivalent, 7 killed by view tests that Stryker's test list does not run (2 of the 7 checked by running them), and 2 behaviour not worth fixing.

## Command and exit code

```
node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/data/actions.ts:60-70,src/browser/sim/data/skills.ts:20-30,src/browser/sim/game.ts:740-775,src/browser/sim/saved-game.ts:1208-1225,src/browser/sim/understanding.ts:34-50,src/browser/sim/understanding.ts:366-382,src/browser/sim/understanding.ts:474-512"
```
exit 0; "Instrumented 5 source file(s) with 112 mutant(s)", 3.19 tests per mutant, done in 1 minute 23 seconds (one invocation, in the background).

Line ranges (from `git diff -U0 e6a95a9b..HEAD`, each range taking the changed code with its function's changed part): `actions.ts` 60-70 (the entry of `explore`, line 67 removed; the type change at 12-16 is a type only), `skills.ts` 20-30 (the `revealedBy` of `exploration`; the type at 10-15 is a type only), `game.ts` 740-775 (`found.chill && !holdsRuleWith(…)` in `advanceMinutes`; the docstring change is a comment), `saved-game.ts` 1208-1225 (the new check in `game()`), `understanding.ts` 34-50 (`newUnderstanding`), 366-382 (`newlyRevealed`, trees and unlocked actions), 474-512 (`holdsRuleWith`, `chillRuleGroupName`).

## Mutants by outcome per file

| File | Mutants | Killed | Timeout | Survived | No coverage | Errors |
|---|---|---|---|---|---|---|
| `src/browser/sim/game.ts` | 15 | 15 | 0 | 0 | 0 | 0 |
| `src/browser/sim/saved-game.ts` | 10 | 8 | 0 | 2 | 0 | 0 |
| `src/browser/sim/understanding.ts` | 87 | 69 | 0 | 18 | 0 | 0 |
| `src/browser/sim/data/actions.ts` | 0 | | | | | |
| `src/browser/sim/data/skills.ts` | 0 | | | | | |
| all | 112 | 92 | 0 | 20 | 0 | 0 |

The two data files appear in no row of the tool's table: the ranges hold object literals with a string, a number and an object, which StrykerJS mutates only as expressions of code; none was generated there (112 = 15 + 10 + 87).

## Survivors, each with class and reason

The tap runner of the configuration runs only `tests/sim/*.test.mjs`; the tests of `tests/view/` are not in it (`guidelines/testing.md`: "Testy Pythona i widoku nie biorą udziału w tym przebiegu, więc ocalała zmiana nie dowodzi sama w sobie braku ochrony w pełnej bramce"). Where I say "view test", it is one of the files that ran green in the gate.

`src/browser/sim/saved-game.ts`
- 1216 `every` → `some` on `atStart.conditions`; 1217 the same on `atStart.actions`: **equivalent now.** `newUnderstanding()` holds one condition („Zawsze”) and one action („Eksploruj”), and `every` and `some` agree on a one-element list. They would differ when the data gains a second item with no revealing event; that is not the present requirement (item 6 says „Eksploruj” and „Zawsze”). The crafted cases of `saved-game.test.mjs` kill every other mutant of the check (the negations, the `||`).

`src/browser/sim/understanding.ts`, `chillRuleGroupName`
- 508 `if (state.run.minutesByAction.explore > 0) return null` → `if (false)`: **killed by view tests.** I ran it: with the line removed from `dist`, `tests/view/discovery-band.test.mjs` fails 1 (the player's own rule, carried out, "…gives the text of the discovery and no sentence about a rule") and `tests/view/chronicle.test.mjs` fails 1 (the chronicle's entry of the same case); `tests/sim/discovery.test.mjs` passes 49, which is why it survived in the tool. So the heart of choice D1 is protected where the band is drawn.
- 507 `if (!atChill) return null` → `if (false)`; 500 whole expression → `true`: **killed by a view test.** I ran the removal: `tests/view/discovery-band.test.mjs` fails 1 ("the first finished exploration of a tile with sticks and berries gives the band its text and no sentence about a rule": a held discovery that is not the chill, a copy holding the rule, no minute of exploring: the band wrongly gets the sentence); the other files I ran (`chronicle`, `sim/discovery`, `end-window-lines`, `end-window`) pass. Every other mutant that widens `atChill` to the discovery of that test (501 `(kind) => true` and `!==`; 505 `true` and `!==`) acts on the same state and is killed by the same test; I did not run them one by one.
- 500 `||` → `&&`; 500 `actions.some` → `actions.every`; 503 `conditions.some` → `conditions.every`; 501 `() => undefined`, `(kind) => false`, `=== ""`; 504 `() => undefined`; 505 `false` and `=== ""`: **equivalent in every reachable state.** The chill is the one event that reveals „Wędruj” and „Temperatura poniżej” together, so each of the two arms alone says "chill" at the chill discovery and neither says it at any other discovery; removing, narrowing or and-ing one arm gives the same answer. `every` differs from `some` only on an empty list, and no discovery with an empty list of actions or of conditions can stand with a copy that has no minute of exploring: items come with an exploration (a minute of exploring, which line 508 answers) and the discovery of the wolf carries actions and conditions of its own (`data/actions.ts` 170-190, `data/conditions.ts` 112-123).
- 501 `?.` removed (`revealedBy.kind`): **behaviour not worth fixing, reason given.** It matters only for a held discovery that names „Eksploruj”, which has no `revealedBy` now; a discovery of a game made after this change never names it (the chill reveals „Wędruj” alone). Only a saved game of version 6 made before the change and saved while paused at the first chill can hold one, and the code is right for it (the `?.` is there for it); no test loads such a state, which would pin a legacy path that the load of D-403 keeps open only for that one paused moment. A regression test is optional; I do not ask for one.
- 505 `?.` removed (`CONDITIONS…revealedBy.kind`): **equivalent.** „Zawsze”, the one condition without `revealedBy`, is never in a discovery.

The mutants of `game.ts` (`holdsRuleWith`, the `!` before it, the condition, the rest of the block) are all killed: the test "a copy that holds a rule „Eksploruj” of the player's own gets none from the game…" and its neighbours in `tests/sim/discovery.test.mjs` protect item 5. The mutants of `newUnderstanding`, of `newlyRevealed` (the tree by `explored`, the unlocked actions) and of `holdsRuleWith` are killed, so items 1 to 3 and the rule of item 5 are protected by the simulation tests.

## Findings

None. No real gap: every survivor is equivalent, killed by a test that Stryker's list leaves out, or not worth a test. No Critical, Important or Minor finding from this step.

## Checks (command and exit code)

- `git rev-parse HEAD`, `git status --short`, `git diff -U0 e6a95a9b..HEAD -- <file>` for the five files: exit 0.
- StrykerJS as above: exit 0.
- Manual mutants run against `dist` (the file edited by a script, restored from the saved copy after each): removal of line 508: `node scripts/test-node-file.mjs tests/view/discovery-band.test.mjs` exit 1 (9 pass, 1 fail), `tests/view/chronicle.test.mjs` exit 1 (27 pass, 1 fail), `tests/sim/discovery.test.mjs` exit 0 (49 pass); removal of line 507: `discovery-band` exit 1 (9 pass, 1 fail), `chronicle` exit 0 (28), `sim/discovery` exit 0 (49), `end-window-lines` exit 0 (9), `end-window` exit 0 (13). `cmp` of `dist/browser/sim/understanding.js` with the saved original: identical.
- Not run: the full gate (green already on this head, per the handoff), mutation analysis of files other than the five, Python tests.

## Unread material

- `.runs/stryker/mutation.json` was not opened; I read the clear-text output of the tool (`run-out.txt`), which lists every survivor with its line and change.
- The 87 killed mutants of `understanding.ts`, the 15 of `game.ts` and the 8 of `saved-game.ts` are not itemised (the tool does not print them); no per-mutant list of the killed ones was read.
- `guidelines/testing.md` "Mutation testing" read whole in the review of the whole change; the rest of the files read before were not re-read.

## Searches not found or unclear

- Why the two data files have no mutants: not established beyond the observation that the tool generated none in the ranges (112 = sum of the three files with mutants); I did not look into the tool's treatment of object literals.
- A test that loads a held discovery naming „Eksploruj” from a legacy saved game (for the `?.` survivor at 501): none found.
