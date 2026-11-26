PASS 5714afbd4846e557213f8505d0988cd070269cf3

# Review 4 — Slice 4: the strike takes the stick from the main hand, and combat carries the gear and the backpack

Range `ad07d536..5714afbd` (one commit, `5714afbd`), variant: a planned slice. `git rev-parse HEAD` in the worktree is `5714afbd4846e557213f8505d0988cd070269cf3`; `.the-way` stands at the pinned `6ed3cb364adedacea214d2a0df690cea32f2e72f`.

## Blocking findings

none

## Minor findings

1. **`src/browser/sim/program.ts:424` — no test guards the rule that only an empty main hand is refilled.**
   - `combatPiece` gives `refill` only where `held === null` (D-457: "An empty slot of the gear stays empty until ... the character uses an action that takes a piece from that slot").
   - The Stryker mutant `if (true && character.backpack[item] > 0) return "refill";` survived. With it, a hand holding an item other than the stick and a stick in the backpack would have that item overwritten by `wielding` (`combat.ts:53-61`), and the item would be lost.
   - Today nothing reaches this. Only the stick fits the main hand (D-456), no act of the game puts a piece in a slot it does not fit, and the load refuses such a gear. So it is Minor. The gap becomes real when task 9 or 10 makes a second item fit the hand. Then a case with a hand holding the other item, a stick in the backpack and the strike refused belongs in `tests/sim/gear-combat.test.mjs`.
   - Evidence: `reports/review-4-stryker.txt`.

## Findings outside the task's scope

1. **Minor, outside the slice's files — `foundations/decisions.md`, D-380, first paragraph.**
   - The paragraph still lists „Uderz — patyk” among the actions "short of a thing in the backpack, „brakuje {ile} × {rzecz}”".
   - The third paragraph narrows this: the strike is short only where the stick lies neither in the main hand nor in the backpack.
   - The code follows the third paragraph (`program.ts:443`) and the tests agree. A reader of the first paragraph alone could expect the refusal with a stick in the hand and none in the backpack.
   - This is the foundation's wording, which the foundation writer of the cycle owns. This slice did not change it.

## Declined to judge

- Surviving mutants on lines this slice did not change, which lay inside the ranges I gave Stryker: `combat.ts:84` (`characterHealth > 0` → `true` / `>= 0`), `combat.ts:124` (`if (!effect)` → `if (false)`), `combat.ts:135` (`damage > 0` → `true` / `>= 0`) and `saved-game.ts:757` (`if (!isCombatAction(acted)) refuse()` removed). All of them were there before this slice, so they are outside the task.

## Review against the task, the plan and the foundation

- **Strike from the main hand only (row 16, D-144, D-456).** `combatPiece` reads only `gear[WIELDING_SLOT]` and the backpack. Tests cover:
  - a stick in the second hand or in a pocket, refused with „brakuje 1 × patyk”;
  - a stick held in the hand with sticks in the backpack: no refill, and the backpack keeps 2.
- **Empty hand refill (row 18, D-457).** `wielding` takes one stick into the hand after the rule is picked, in the same exchange. The refill takes no turn of its own: test 2 has four exchanges and health 79, the same as with a stick held from the start.
- **Stick stays in the hand (D-145).** The result's gear holds the stick, and every later strike makes no second refill (test 6).
- **No stick anywhere (row 24, D-380).** The reason is `brakuje 1 × patyk`. The rule is passed over for the kick. Outside combat the reason stays `tylko w walce` (D-140, D-310).
- **State threaded through the turns.**
  - Each turn builds `view = { ...run, character }` for the creature's pick and the character's pick.
  - Test 5 shows „Zapas poniżej 1 szt. · Patyk” holding from turn 2, after the refill.
  - The refusal also reads the view. With today's actions no test can tell this apart from reading the run before the fight: no combat act lowers the stick, and „Załóż” comes in a later slice. So this part rests on review.
- **The map run takes the result.** `run.ts:749-754` sets the gear and the backpack from the result for every outcome, death included. Death then goes to the later handling of Slice 3. The test through `stepMinute` shows:
  - the hand holds the stick and the backpack is empty;
  - the stick serves neither „Zasil — ognisko” nor „Zapal — patyk”;
  - „Zapas poniżej” counts nothing of the hand (row 10, D-455);
  - the input stays unchanged.
- **Every caller of `resolveCombat` is covered.** The only product caller is `finishMinute`. Judging, the catch-up and the balance engine all go through `stepMinute`, so the game and the instrument agree.
- **Refill mark.** The mark is `CombatCharacterAction.refill`, a field inside the exchange. This matches the plan's "an exchange marks a refill". It is false on every action without a refill.
- **Refill words (row 25).** `GEAR_PLACES.mainHand.refill = "bierze patyk z plecaka do ręki"` stands in the game's data beside the place, as the plan's *Choices* row requires. The view reads it in Slice 12.
- **Saved game (trust boundary, D-206, D-213, D-386, `save-version`).**
  - `refill` is read as a strict boolean and refused on an action that uses no item.
  - The result's `gear` is read by `gear()`: exact slots, items of the data, fit checked.
  - The result's `backpack` is read by `backpack()`, an exact key set of whole counts from 0, and refused above `backpackCap` of the map run's character.
  - `fields` refuses missing, extra and `__proto__` keys. The sweep "no value a document can hold, at any place of it, throws out of the load" now reaches the new fields, since the document holds them.
  - Crafted cases cover a wrong type, gear that does not fit (through `GEAR_PLACES_OF`), an unknown item, negative and fractional counts, missing and extra fields, a list, and 16 pieces. Edge cases cover exactly 15 pieces and an empty gear with no refill.
  - The version stays 11, and the comment above the document names the exception the saved-game guidelines allow. This holds: `main` still has `SAVED_GAME_VERSION = 10`, and version 11 exists only on this branch.
- **Existing test changes ("Changing an existing test").** In `tests/sim/combat.test.mjs`:
  - two assertions were added to the four-strikes case;
  - `refill: false` was added to the kick's deep-equal, a new field of the record;
  - five `decision:` lines now quote D-144 and D-145 as they stand.
  No assertion was weakened, and the reasons given are D-144 and D-145.
- **New test file.** `tests/sim/gear-combat.test.mjs` is listed in `stryker.config.json`; `test_mutation_test_selection.py` passes. Every expected value is written out, from D-144's numbers or from arithmetic.
- **No code made only to pass a test.** I found no branch, value or comparison in the product code whose purpose is to pass a test.
- **Guidelines (coding, simulation-module, content-data, saved-game, testing).**
  - Inputs stay unchanged: `simulation-inputs` passes, and the tests deep-equal the run and the program before and after.
  - The load refuses and does not throw.
  - Data stays in `data/`.
  - ESLint, Prettier and the size rule pass, by the executor's report. I did not repeat them.
- **No reserved choice is taken.** There is no screenshot in the range.
- **The author's own-work check fits the weakest point.** That point is a game-made state after a refill, which must save and load back whole (D-386). The probe goes through the game's own functions.
- **The walk through the running product.** The executor says what a player sees change and leaves every case for the browser unchecked. The reason given is the plan's *Choices* row: checks in a real browser for the screen of a map run stand in Slice 15. That is acceptable for this slice.

## Mutation testing (classification)

I ran Stryker on the changed lines: 182 mutants, 168 killed, 13 survived, 1 with no coverage.

| Mutant | Class |
|---|---|
| `combat.ts:51` `item === null` → `false` | equivalent: `combatPiece(character, null)` gives null, so the result is the same |
| `combat.ts:125` error text emptied | no coverage; an unreachable guard, not worth fixing |
| `program.ts:423` `"held"` → `""` | equivalent: no caller compares the value with `"held"`, only with `null` and `"refill"` |
| `program.ts:424` `held === null` → `true` | a real gap, but out of reach today: Minor finding 1 |
| `program.ts:431` `"item" in effect \|\| effect.item` and `true && effect.item` | equivalent: kick and dodge have no `item`, so both give null |
| `program.ts:431` `effect \|\| …` | reported as survived, but killed when applied by hand to the built code: `node --test tests/sim/combat.test.mjs tests/sim/gear-combat.test.mjs` fails 8 cases (exit 1). I take it as a fault of Stryker's report, not a gap in the tests |
| `combat.ts:84/124/135`, `saved-game.ts:757` | lines this slice did not change: Declined to judge |

## Checks run

All checks ran in the head worktree `.runs/review-4/head` after `npm ci`, unless the row says otherwise.

| Check | Command | Exit |
|---|---|---|
| gear-combat tests | `npm test -- tests/sim/gear-combat.test.mjs` | 0 |
| combat tests | `npm test -- tests/sim/combat.test.mjs` | 0 |
| saved-game tests | `npm test -- tests/sim/saved-game.test.mjs` | 0 |
| rule-signs tests | `npm test -- tests/sim/rule-signs.test.mjs` | 0 |
| encounters tests | `npm test -- tests/sim/encounters.test.mjs` | 0 |
| type check | `npm run typecheck` | 0 |
| program-rule-pick invariant | `npm test -- tests/invariants/test_program_rule_pick.py` | 0 (rerun after a clean rebuild) |
| simulation-inputs invariant | `npm test -- tests/invariants/test_simulation_inputs.py` | 0 (rerun after a clean rebuild) |
| mutation test selection | `npm test -- tests/quality/test_mutation_test_selection.py` | 0 |
| Stryker | `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/combat.ts:41-62,src/browser/sim/combat.ts:78-170,src/browser/sim/program.ts:412-445,src/browser/sim/run.ts:749-754,src/browser/sim/saved-game.ts:743-812,src/browser/sim/saved-game.ts:1098-1104"` | 0; 92.31 % (7 min 34 s) |
| Probe: refill check removed | delete `if (refill && combatItem(acted.kind) === null) refuse();` in `saved-game.ts`, then `npm test -- tests/sim/saved-game.test.mjs` | 1: the crafted test fails at "a refill marked on a kick"; source restored with `git checkout` |
| Probe: cap check removed | delete `if (backpackCount(left) > capacity) refuse();`, then `npm test -- tests/sim/saved-game.test.mjs` | 1: fails at "a combat result whose backpack holds 16 pieces, over the carrying capacity"; source restored |
| Probe: `combatItem` mutant | the mutant written into the built `dist/browser/sim/program.js`, then `node --test tests/sim/combat.test.mjs tests/sim/gear-combat.test.mjs` | 1: 8 cases fail |
| Foundation check (in the reviewed worktree, read-only) | `python -B .the-way/elements/common/foundation_check.py` | 1, with 8 `decision:` citation errors, all outside this slice (see below) |

The 8 errors of the foundation check:

- `tests/sim/encounters.test.mjs:373, 606, 797`
- `tests/sim/rule-signs.test.mjs:390`
- `tests/sim/skills.test.mjs:503, 545`
- `tests/view/character-screen.test.mjs:134, 400`

These are the known citation errors that Slices 4b and 18 fix. Their files are in those slices' *Change* in `plan.md:187` and `plan.md:457`. No other error was reported.

Not run: the full suite, which is the cycle's own run; ESLint and Prettier, which the executor reports as clean.

## Reaches beyond the dispatch

- `plan.md` lines 184-190 and 454-458 (the *Change* of Slices 4b and 18): to confirm that the remaining citation errors belong to them.
- `src/browser/sim/data/actions.ts:196-216` (combat effects): to classify the `combatItem` mutants.
- `src/browser/sim/saved-game.ts:120-230, 625-651` (the reading helpers `fields`, `flag`, `backpack`, `gear`): to judge the trust boundary.
- `src/browser/sim/character.ts` (`backpackCap`, `backpackCount`, `fitsSlot`): to judge the cap and the fit.
- `src/browser/sim/run.ts:720-824` (`finishMinute`): the caller of `resolveCombat`.
- `program.ts:549-560` (`chooseCombatRule`): to check that the refusal reads the view.
- A search for `resolveCombat`, `CombatResult`, `lastCombat`, `characterAction` and `exchanges` across `src/`, `balance/` and `tests/`: to find every consumer.
- `src/browser/view/judging-cache.ts`, searched for "combat" (none found): to check whether this slice reaches that trust boundary. It does not.
- `tests/sim/saved-game.test.mjs:385-460, 1100-1127, 3560-3615, 4092-4151`: the version-10 combat record, the load test, the sweep and the game-made states.

## Working copies

- I made a git worktree of `5714afbd` at `.runs/review-4/head`. Its `.the-way` was populated at the pinned commit, its dependencies came from `npm ci`, and it held the run outputs `out-*.txt`, `probe-*.txt` and `stryker-out.txt` beside it.
  - It was removed with `git worktree remove --force` (exit 0), then `git worktree prune`.
  - The directory `.runs/review-4` was then removed whole. `Test-Path` gives False.
- Kept beside this report: `reports/review-4-stryker.txt`, the surviving mutants and the summary.
- **An incident in the reviewed worktree.** The first attempt at the refill probe used `[IO.File]::ReadAllText` / `WriteAllText` with a relative path. .NET resolves that against the process directory, which was the reviewed worktree, not the probe worktree.
  - So for about one minute `src/browser/sim/saved-game.ts` of the reviewed worktree `the task's worktree` lacked the line `if (refill && combatItem(acted.kind) === null) refuse();`.
  - Nothing was built or committed there in that time. I found it with `git status`, saw the one-line diff and restored the file with `git checkout -- src/browser/sim/saved-game.ts`.
  - `git status --short` there is now empty, and HEAD is still `5714afbd`. The test run of that attempt ran in the probe worktree on unchanged source, so it proved nothing and is not counted. The probe was repeated with absolute paths and is the one reported above.

## Unread material

- `foundations/decisions.md`: D-147 was read whole, though it bears little on this slice.
- `guidelines/testing.md`: read whole, in two parts (1-203 and 204-510).
- `tests/sim/saved-game.test.mjs`: read in its diff and in the ranges named under "Reaches beyond the dispatch", not lines 1-93 and 740-1093 whole as the dispatch names them. I read the diff in those ranges and lines 1100-1127.
- Otherwise none.

## Searches not found or unclear

- `.stryker-tmp`: `git check-ignore` does not match it under `.gitignore`. That is why Stryker ran only in the probe worktree.
- Stryker reported the mutant `effect || …` at `program.ts:431` as survived, though the tests kill it when it is applied by hand. The cause is unclear.
