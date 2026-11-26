Status: done

# Executor 4 — Slice 4: the strike takes the stick from the main hand, and combat carries the gear and the backpack

## Commits

- `5714afbd` feat: the strike takes its stick from the main hand, an empty hand taking one stick from the backpack in the same turn, ...; base `ad07d536`.

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `src/browser/sim/combat.ts` | 48 | 6 |
| `src/browser/sim/data/gear.ts` | 16 | 4 |
| `src/browser/sim/program.ts` | 30 | 9 |
| `src/browser/sim/run.ts` | 6 | 0 |
| `src/browser/sim/saved-game.ts` | 35 | 5 |
| `src/browser/sim/types.ts` | 12 | 0 |
| `stryker.config.json` | 1 | 0 |
| `tests/sim/combat.test.mjs` | 9 | 5 |
| `tests/sim/gear-combat.test.mjs` (new) | 262 | 0 |
| `tests/sim/saved-game.test.mjs` | 120 | 9 |

Every file is in the slice's *Change*. No file outside it was changed.

## What was made

- `data/gear.ts`: the place row of the main hand holds the words of the refill, `refill: "bierze patyk z plecaka do ręki"` (row 25). A new constant `WIELDING_SLOT = "mainHand"` names the slot a combat action that uses an item takes its piece from, and no other slot (D-456).
- `program.ts`: `combatPiece(character, item)` gives `held` (the main hand holds the item), `refill` (the hand is empty and the backpack holds a piece) or null. `combatItem(kind)` gives the item a combat action uses, from the actions' data. `combatRefusal` passes the strike over with `brakuje 1 × patyk` only where `combatPiece` is null (D-380). Outside combat, `actionRefusal` keeps `tylko w walce`.
- `combat.ts`: `resolveCombat` keeps the character (gear and backpack) from turn to turn. The creature's pick and the character's pick read a view of the run with the character as the turns before left it. Before a strike, an empty hand takes one stick from the backpack (`wielding`), in the same turn and with no turn of its own. The stick stays in the hand. Each `CombatCharacterAction` carries `refill: boolean`. `CombatResult` carries `gear` and `backpack` after the fight. Nothing passed in is changed.
- `run.ts`: `finishMinute` puts the result's gear and backpack on the map run's character when the turns resolve, for every outcome.
- `types.ts`: `CombatCharacterAction.refill`, `CombatResult.gear` and `CombatResult.backpack`.
- `saved-game.ts`: `characterAction` reads `refill` as a truth value, which may be true only on an action that uses an item. `combatResult` reads `gear` as any gear is read (`gear()`: each slot, an item that fits). It reads `backpack` as any backpack is read and refuses more pieces than the carrying capacity of the map run's character (`lastCombat` now gets `backpackCap(character)`). The version stays 11.
- `tests/sim/saved-game.test.mjs`: the version-11 document's last combat (`LAST_COMBAT`) now holds the result's gear and backpack and a refill mark on each action: true on the first strike, false on the later ones. The comment above the documents states the exception: the document was rewritten without raising the version, since no saved game state of version 11 exists anywhere yet. Crafted cases added:
  - the result's gear goes through every case of `NOT_A_GEAR` (a new entry in `GEAR_PLACES_OF`);
  - a result without gear or backpack, and a gear of none;
  - a backpack of 16 pieces, and one of 16 sticks;
  - a backpack count below 0, a fractional count, a missing item, an item the data lack, and a backpack as a list;
  - a refill mark that is missing, text, a number or none;
  - a refill marked on a kick or a dodge, and a mark on an exchange with no action of the character.
  
  Edge cases that load: a result backpack at exactly 15 pieces, and a result with an empty gear and no refill.
- `tests/sim/combat.test.mjs`, changed by the rule "Changing an existing test". The cause lies in the requirement, F4 (D-144) and F5 (D-145):
  - The case "four stick strikes ..." now also asserts that the result's hand holds the stick and its backpack 0 sticks: the one stick now goes into the hand at the first strike.
  - The case "a stick strike without a stick is skipped ..." expects `refill: false` in the kick's action record, the new field of the record.
  - Five `decision:` lines quote D-144 and D-145 as they now stand.

## Checks (command — exit code)

Test written first, failing run, before the code:
- `npm test -- tests/sim/gear-combat.test.mjs` — 1 (7 tests, 6 failing at their assertions: `result.gear` undefined, no `refill` field, `brakuje 1 × patyk` with a stick in the hand, the run's hand left empty. The one passing case, `tylko w walce` outside combat, guards existing behaviour.)

Invariant test `save-version` ("a crafted document of the current version is refused whole as shape"), seen failing once:
- The cap check and the refill-on-a-non-item-action check were removed for a moment with `reports/executor-4-break.py`, then: `npm test -- tests/sim/saved-game.test.mjs` — 1 (the crafted test fails at "a combat result whose backpack holds 16 pieces, over the carrying capacity"). `saved-game.ts` was then restored byte for byte from a copy.
- After the restore: `npm test -- tests/sim/saved-game.test.mjs` — 0 (49/49).

The slice's *Checks*, after the code:
- `npm test -- tests/sim/gear-combat.test.mjs` — 0 (7/7)
- `npm test -- tests/sim/combat.test.mjs` — 0
- `npm test -- tests/sim/encounters.test.mjs` — 0
- `npm test -- tests/sim/saved-game.test.mjs` — 0
- `npm test -- tests/sim/rule-signs.test.mjs` — 0
- `npm test -- tests/invariants/test_program_rule_pick.py` — 0
- `npm test -- tests/invariants/test_simulation_inputs.py` — 0
- `npm test -- tests/quality/test_mutation_test_selection.py` — 0
- `npm run typecheck` — 0

After Prettier reformatted the two test files (layout only), these were run again:
- `npm test -- tests/sim/gear-combat.test.mjs` — 0
- `npm test -- tests/sim/saved-game.test.mjs` — 0

Tests of the code I touched, beyond the *Checks* (each `npm test -- <file>`), all exit 0:
- `tests/sim/`: skills, run-record, judging, craft-and-tend, catch-up, campfire, actions, previous-programs, data, gear-transfer, gear-state, loop, acceptance, first-map-balance, program, purity;
- `tests/view/`: chronicle-game, end-window, scene-picture, body-blow, world-area;
- `tests/invariants/`: test_simulation_randomness.py, test_program_closed_lists.py, test_content_identifiers.py.

Other checks:
- `npx eslint <the nine changed source and test files>` — 0
- `node tests/quality/eslint-size-rules.mjs` — 0 ("0 functions and files over a threshold in 369 files")
- `npx prettier --check <changed files>` — 1 on the first run (two test files), fixed with `--write`, then clean
- `python -B .the-way/elements/common/foundation_check.py` — 1, with 8 errors left, none in a file of this slice:
  - `tests/sim/encounters.test.mjs:373, 606, 797`
  - `tests/sim/rule-signs.test.mjs:390`
  - `tests/sim/skills.test.mjs:503, 545`
  - `tests/view/character-screen.test.mjs:134, 400`
  
  Before the slice it reported 13 errors, not the 14 the handoff names. The 5 errors of `tests/sim/combat.test.mjs` are gone. The new `decision:` lines in `gear-combat.test.mjs` and `saved-game.test.mjs` raise none.

Not run: the full suite (`npm test` with no file), which the handoff and the method leave to the cycle.

## Tests that fail on the slice's base

None of the tests I ran failed after my change, so no test was run on the base.

## Own-work check

- **Requirement most likely unmet:** a state the game itself makes after a fight with a refill has to save and load back whole (D-386, the strict reading at the trust boundary), and the stick taken into the hand has to go back to the character when the run ends.
- **Check:** a probe that goes through the game's own functions, `reports/executor-4-probe.mjs`. It ran from `.runs/executor-4/` as `node .runs/executor-4/probe.mjs` after a build; to run it from `reports/`, prefix its relative imports with two more `../`.
- **Steps of the probe:**
  1. A knowing game with Ala is sent to Las.
  2. Her map run is given 2 sticks, an empty hand and a wolf fight resolving in the next minute.
  3. `advanceMinutes(1)` resolves the fight.
  4. `savedGame(withSaveTime(...))` is passed through JSON and `loadSavedGame`.
  5. `end` closes the map run.
- **Result:** `probe ok`. The first exchange carries `refill: true`, the run's hand holds the stick and its backpack 1 stick. The document loads `ok`, its `lastCombat` deep-equal to the state's. After `Zakończ`, Ala's gear holds the stick in the main hand.

## The walk through the running product

This change alters what a player sees: after a fight with an empty hand, the backpack shows one stick fewer, and a strike rule with a stick in the hand and none in the backpack is no longer amber with `brakuje 1 × patyk`.

| Case | By what | Verdict |
|---|---|---|
| A fight with an empty hand and sticks in the backpack: the strike works in the first turn, the backpack shows one stick fewer, the chronicle's paragraph is unchanged | screen of a map run in a browser | unchecked |
| A stick in the hand and none in the backpack: the strike rule is green in the minutes of an attack | screen of a map run in a browser | unchecked |
| No stick anywhere: the strike rule is amber with `brakuje 1 × patyk` | screen of a map run in a browser | unchecked |
| A load of a saved game after such a fight | page reload in a browser | unchecked |
| Side observation | — | none |

**What I did not check:** none of the cases above were checked in a browser. The plan's *Choices* (plan.md:627) put the check in a real browser of the screen of a map run in Slice 15. Reaching a wolf fight in the running game also needs a solved map with an attacker and a fight program. The evidence I have is from the simulation layer the screen reads:
- the tests of `gear-combat.test.mjs`, `rule-signs.test.mjs` and `encounters.test.mjs`;
- the probe above, through the game's own functions: send, minute, save, load, `Zakończ`.

The view does not draw the refill element of the paragraph yet (Slice 12) or the line of gear (Slice 15).

## Choices made (way rejected; cost if wrong)

1. **Where the refill mark sits.** The mark is the field `refill` of `CombatCharacterAction`, inside the exchange.
   - Rejected: a field of `CombatExchange` itself, which would allow a mark beside no action of the character.
   - Cost if wrong: Slice 12 reads `exchange.characterAction?.refill` instead of `exchange.refill`, a one-line change.
2. **Which slot the strike uses.** The slot is named in data, `WIELDING_SLOT = "mainHand"` in `data/gear.ts`.
   - Rejected: deriving it from the item's `fits` place, which would let a later combat item that fits a pocket take from the first pocket. D-456 binds the strike to the main hand.
   - Cost if wrong: one constant.
3. **Where the refill words stand.** They are the field `refill` of the place row of the main hand, beside `line` (plan.md:625: the place's words belong with the place). They are written in full, with `patyk`, not as a template with `{rzecz}`.
   - Rejected: a template the view fills, which would need an accusative form of each item's name the data lack.
   - Cost if wrong: when task 10 brings other weapons to the hand, the words become a template.
4. **A hand holding an item other than the one the action uses.** No item of the data reaches this today. `combatPiece` gives null even where the backpack holds a stick: only an empty hand is refilled (D-457), and the reason reads `brakuje 1 × patyk`.
   - Cost if wrong: one branch, when a second item fits the main hand.
5. **The refusal text.** It is written as `brakuje 1 × ${itemName(item)}` and no longer through `lacking`, which would give `brakuje 0 × patyk` where the backpack holds a piece but the hand holds another item.
6. **The extra refusal in the load.** It refuses `refill: true` on an action that uses no item. "Wolno odmówić więcej" (coding-saved-game.md).
   - Cost if wrong: none for the game's own states, since only the strike refills.
   - The load does not refuse a second refill in one encounter, because a later item that wears out (task 9) may refill twice.
7. **The cap of the result's backpack** is the carrying capacity of the map run's character, `backpackCap(character)` of the run character the load has already read.

## Adaptations to the plan

None. The plan's names and paths matched the code.

## Reaches beyond the dispatch

- `plan.md`, by a search for `refill` (lines 153, 308, 349, 403), to keep the mark's name and place consistent with Slice 12's text ("where an exchange carries the refill mark"). I read only the matched sentences.
- `foundations/decisions.md`, D-425 (searched by its heading), to check whether `run.ts` (825 lines with comments) stands over the size threshold. It does not: the size run reports 0.
- D-309, the heading and first sentence only, to see whether a quotable sentence for `tylko w walce` was there. I quoted D-140 instead.
- `.the-way/task-cycle/change/walkthrough.md`, which the method names for a change a user sees.
- `src/browser/AGENTS.md`, `src/browser/sim/character.ts`, `src/browser/sim/gear.ts`, `src/browser/view/combat-line.ts`, `tests/sim/gear-transfer.test.mjs` (fixtures), `tests/sim/program-fixture.mjs`, and parts of `encounters.test.mjs` and `rule-signs.test.mjs`. I read these to see which code and tests consume the combat result.

## Working copies

- `.runs/executor-4/`, under the worktree, held:
  - the outputs of every run;
  - a copy of `saved-game.ts` for the restore after the moment of breaking;
  - `fix_quotes.py`, which rewrote the five quotations in `combat.test.mjs`;
  - `break.py` and `probe.mjs`.
  
  It was removed with `rm -rf` on its full path.
- Kept beside this report: `reports/executor-4-probe.mjs` (the probe of the own-work check) and `reports/executor-4-break.py` (the moment of breaking of the invariant test).
- No git worktree or clone was made.

## Unread material

- `guidelines/testing.md` was read whole, in two parts (lines 1–203 and 204–510).
- The handoff names `tests/sim/saved-game.test.mjs` in four ranges:
  - lines 1–93 and 740–1093 were read whole;
  - of 2885–2910, lines 2885–2910 and the gear table to 3059;
  - of 3192–3251, lines 3192–3251, plus 3095–3190 for the crafted and edge tests.
- Otherwise none.

## Searches not found or unclear

- The handoff says the foundation check reports 14 errors. It reported 13 on the slice's base.
- `tests/sim/encounters.test.mjs` and `tests/sim/rule-signs.test.mjs` stand in this slice's *Checks* but not in its *Change*, and their four quotations of D-144 and D-145 still fail the foundation check. I left them for Slice 4b or 18, as the handoff gives ("Slices 4, 4b and 18 make them 0"). Both test files pass.

## Problems observed

None.
