# Executor 4 report — Slice 4, Ucisk in the simulation

**Status:** done with concerns

Concerns, in short: (1) four test files outside the slice's *Change* needed new expected values, because the task changes what they check (below, "Adaptations"); (2) the walk of `walkthrough.md` was not performed (below); (3) the foundation check reports 11 errors, all on quotation lines that earlier slices wrote, none on a line of this slice.

## Commits (range 0b18ce2a..16e9e93e)

- `72840676` test: the new `tests/sim/pressure.test.mjs`, written first (14 tests, all failing on the base).
- `16e9e93e` feat: the action, its branch and pair, the piece rule, the turn, the saved-game reader; the adapted tests; one more test in `pressure.test.mjs` (the piece rule read directly, `combatPiece`).

## Files changed (base..head)

| File | + | − |
|---|---|---|
| `src/browser/sim/combat.ts` | 59 | 13 |
| `src/browser/sim/data/actions.ts` | 26 | 2 |
| `src/browser/sim/data/skills.ts` | 10 | 0 |
| `src/browser/sim/program.ts` | 67 | 24 |
| `src/browser/sim/programs.ts` | 1 | 0 |
| `src/browser/sim/saved-game.ts` | 7 | 5 |
| `src/browser/sim/types.ts` | 6 | 2 |
| `tests/invariants/test_program_closed_lists.py` | 4 | 2 |
| `tests/sim/gear-wear.test.mjs` | 1 | 0 |
| `tests/sim/pressure.test.mjs` (new, 15 tests) | 590 | 0 |
| `tests/sim/tending.test.mjs` | 10 | 3 |

(From `git diff --numstat 0b18ce2a HEAD`.)

## What was made

- `actions.ts`: a new type `CombatEffect`, with a third form `{ heals: "target"; place: GearPlace }`; the row `pressure` after `dodge`, before `equip`: label „Ucisk”, group `foodAndCombat`, status „Uciska ranę” (Q2, from the handoff), `minutes: null`, `itemTargets: { property: "healing" }`, `revealedBy: { kind: "treeDiscovered", skill: "tending" }`, `combat: { heals: "target", place: "pocket" }`, icon `bandage-roll` / „Bandage roll icon”.
- `skills.ts`: the pair `{ action: "pressure" }` (no item, so every target of healing) among the pairs of `tending`; the branch `pressure`, „Ucisk”, of `tending`, costs `[3]`, effect `action` on `pressure`, no preview, the description of the plan.
- `types.ts`: `{ kind: "pressure"; item: ItemId }` in `Action`, `pressure` in `CombatVerbKind` (so it stays out of `MINUTE_KINDS` and of `minutesByAction`: `SAVED_GAME_VERSION` stays 11).
- `programs.ts`: `pressure` checked with its target, as `tend`.
- `program.ts`: `actionPrice` one piece of the target; outside combat „tylko w walce”; `combatItem` now takes the action (the target for an action that heals, the data's item for the strike); a new `pieceSlots` reads the place the data name (the pockets), else the main hand (`WIELDING_SLOT`) for the strike; `combatPiece(character, action)` returns `{ slot, refill } | null` — the first slot holding the item, else the first empty one with a piece in the backpack; `healsInCombat`; `combatRefusal` takes the health of the turn (`combat.health` the judge is given) and refuses an action that heals with „zdrowie pełne” before the lack „brakuje 1 × {rzecz}”.
- `combat.ts`: `wielding` became `withPiece` (generic over the slot); `healed` takes the piece (through the first empty pocket from the backpack where none holds it), uses it up (slot back to null), gives back `tendedBody(body at the turn's health, healingOf(skills, item))`; the turn is recorded with its refill mark, damage 0 and the health after it; one practice by `practiced(practice, "pressure", item)` (tree `tending`).
- `saved-game.ts`: `pressure` in `COMBAT_VERBS` (a turn of it is read, an activity of it refused), refill allowed where `combatItem(acted)` is not null, damage must be 0 for `equip` and for an action that heals.

## Checks run

| Command | Exit | Note |
|---|---|---|
| `npm test -- tests/sim/pressure.test.mjs` (at `72840676`, before the code) | 1 | 14 of 14 failing; 4 on an assertion, 10 on a `TypeError` of the missing row (`ACTIONS.pressure` undefined) |
| `npm test -- tests/sim/pressure.test.mjs` (at head) | 0 | 15 of 15 |
| `npm test -- tests/sim/combat.test.mjs` | 0 | 11 |
| `npm test -- tests/sim/encounters.test.mjs` | 0 | 29 |
| `npm test -- tests/sim/gear-combat.test.mjs` | 0 | 8 |
| `npm test -- tests/sim/gear-combat-wear.test.mjs` | 0 | 10 |
| `npm test -- tests/sim/rule-signs.test.mjs` | 0 | 40 |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 | 49 |
| `npm test -- tests/sim/previous-programs.test.mjs` | 0 | 25 |
| `npm test -- tests/sim/rules.test.mjs` | 0 | 6 |
| `npm test -- tests/invariants/test_program_closed_lists.py` (before its adaptation) | 1 | the tripwire: data list `pressure`, the check did not |
| `npm test -- tests/invariants/test_program_closed_lists.py` (after) | 0 | 4 |
| `npm test -- tests/invariants/test_icon_credits.py` | 0 | 3 |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 | 2 |
| `npm run typecheck` | 0 | |
| `npm test -- tests/sim/tending.test.mjs` (after adaptation) | 0 | 8 |
| `npm test -- tests/sim/gear-wear.test.mjs` (after adaptation) | 0 | 16 |
| `node node_modules/eslint/bin/eslint.js <the 10 changed TS/JS files>` | 0 | |
| `node node_modules/prettier/bin/prettier.cjs --check <the same files>` | 0 | |
| `python -B .the-way/elements/common/foundation_check.py` | 1 | 11 errors, see below |

A sweep beyond the *Checks*, to find the tests of the code touched: one `npm run build`, then `node --test <file>` for each file of `tests/sim/`, `tests/view/`, `tests/balance/` and `tests/*.test.mjs`, one at a time (not `npm test` with no file). Its results:

- Failing after the change and announced by the slice's *Goal*: `tests/sim/data.test.mjs` (3 tests), `tests/sim/craft-and-tend.test.mjs` (2) — Slice 5; `tests/view/program-editor.test.mjs` (2) — Slice 9; `tests/view/rule-editor.test.mjs` (1), `tests/view/icons.test.mjs` (3), `tests/view/gear-editor.test.mjs` (1) — Slice 10. All of them pass on the base (`data`, `craft-and-tend` measured there; the view files not measured on the base, they are announced).
- Announced as left failing, but it passes: `tests/sim/discovery.test.mjs` (50 of 50 at head and on the base). Slice 5 has nothing to repair there for this slice.
- Failing on the base too, so not of this slice (measured in a worktree of `0b18ce2a`): `tests/sim/action-targets.test.mjs` — the same three tests, „an action with an item target lies in the repertoire where its kind and its item lie there”, „the reason of a rule whose item target lies outside the repertoire names the item by its row”, „neither verb is grown by a character skill: both are open to every character and add no practice”; `tests/sim/team.test.mjs` — „a created character joins the end of the team's list as an elemental mage, in the order of creation”. They read as left by an earlier slice (the tree `tending` among the mage's predispositions and the pairs of „Wytwórz” and „Opatrz” in it); I left them as they are.
- Failing after the change, not announced, passing on the base: `tests/sim/tending.test.mjs` (2 tests) and `tests/sim/gear-wear.test.mjs` (1) — adapted, see below.
- Every other file passed.

Foundation check: the 11 errors stand on `decision:` lines of `tests/sim/body.test.mjs` (197, 198, 211, 212, 221), `tests/sim/craft-and-tend.test.mjs:354` and `tests/sim/tending.test.mjs` (106, 181, 235, 259, 287). None of these lines is one this slice wrote: the tending lines are the quotations of D-379 and D-121 that stood there at the base (only their line numbers moved by up to 2). The quotation lines of `pressure.test.mjs` and the two lines I added in `tending.test.mjs` are not reported. I did not measure the check on the base (the base worktree had no `.the-way`), so "they stood at the base" rests on the content of the lines, not on a base run.

## Adaptations (section 4 of `make-change`, small mismatches)

- `tests/invariants/test_program_closed_lists.py` (an invariant test, `program-closed-lists`, changed): it is in the slice's *Checks* but not in its *Change*, and its tripwire fails whenever the data gain an action kind. I added `pressure` to `ACTION_KINDS`, a rule `Zdrowie poniżej 50 → Ucisk — Opatrunek` to `VALID`, and „the four kinds that take an item” to the docstring. Seen failing (exit 1) before, passing (exit 0) after. The invariant's sentence is unchanged, so no foundation entry changes.
- `tests/sim/tending.test.mjs`: the test of the pairs of the tree now expects `{ action: "pressure" }` as its third pair (row 5, D-150), with a line `decision: D-150`; the test of the first moss now expects the actions `["explore", "pressure", "craft"]` — „Ucisk” enters with the tree (D-195), and in the order of the data it stands before „Wytwórz”. The cause lies in the task (row 5, D-150, D-195).
- `tests/sim/gear-wear.test.mjs`: „„Załóż” ends the group „Żywność i walka” of the pick” now lists `pressure` before `equip` (D-290 as changed by the foundation step). It is a test of the kind the plan names (it lists the actions of the group), only the plan did not name this file.
- `src/browser/sim/data/gear.ts` is unchanged: the strike keeps its data `{ damage: 6, item: "stick" }`, and its slot is still `WIELDING_SLOT`, which `pieceSlots` uses as the place of an action whose data name none. I did not add `place: "mainHand"` to the strike: `data.test.mjs` asserts its row word for word, and Slice 5 would meet a change it was not told of. The doc comment of `WIELDING_SLOT` still says it is the slot of „a combat action that uses an item, „Uderz — patyk””; that stays true of the strike but is no longer true of every such action. Rewording it is a one-line change in a file outside this slice.

## Own-work check (section 3)

- The requirement most likely missed: „the health of that turn — the health the combat judge is given, not the body's health at the attack” (and with it „zdrowie pełne” at full health in a real turn). Checks: the judge cases of `pressure.test.mjs` with the body at 40 and the turn at 100 („zdrowie pełne”), and the body at 100 and the turn at 40 (go); and a whole fight (`resolveCombat`) where the character comes back to 100 during two dodges of the wolf, after which „Ucisk” is passed over for the strike and the second bandage stays in the backpack. Both pass; with `combatRefusal` reading `run.body.health` the first case fails.
- Mutations in my head, each caught by a test: the slot not emptied after use (final gear); the backpack not lowered at a refill (final backpack 1 of 2); taking from the backpack while a pocket holds one (with a pocket and two in the backpack the backpack ends at 1); the second pocket of two holding chosen (`combatPiece` cases); the cap at 100 removed (93 + 25 → 100); the ranks of „Mocniejszy zwój” ignored (68, not 58); no practice (`tending: 2`); `pressure` dropped from `COMBAT_VERBS` (the activity of „Ucisk” loads, and the record does not); the damage-0 check dropped (a saved turn dealing 3 loads); the refill allowed only where the data name an item (the saved turn with `refill: true` is refused).
- Trust boundary (`saved-game.ts`): crafted documents in `pressure.test.mjs` — a turn of „Ucisk” dealing 3, one on a stick, one with no target, and „Ucisk” as the activity of a minute — each is refused as `shape`; the control, „Opatrz” with the same bandage as the activity, loads. Not marked with the invariant `save-version`: the testing guidelines list by name the cases that hold it, and adding a marker belongs to whoever changes that list.

## Walk of `walkthrough.md`

The change alters behaviour a user sees in the running product: the rule panel gains „Ucisk” in „Żywność i walka”, and a fight with a bought „Ucisk” heals by a bandage of a pocket. The walk was **not performed**. Its plan of cases:

| Case | By what | Verdict |
|---|---|---|
| „Ucisk” stands after „Odskocz” in the pick, with the icon of „Opatrz”, „tura” for its time | the rule panel in a browser | unchecked |
| without the branch the rule is greyed with „gałąź niewykupiona”; outside a fight with „tylko w walce” | the copy editor of a map run | unchecked |
| a fight with a bandage in a pocket at 40 health: the paragraph of the encounter shows the turn, the pocket empties | a map run of Las — głębiej in a browser | unchecked |
| side observation | — | none |

Reason: the view is adapted to „Ucisk” only by Slices 7, 9 and 10 (the paragraph of the encounter, the editor, the icons), whose tests this slice leaves failing by plan, so a browser now shows a half state that the walk would judge against requirements those slices still have to meet; and reaching the fight takes a mage with 60 practice of the tree and the branch bought, for which I did not look for development data in the foundation. I did not read the decisions that settle the way to the running product, nor `.claude/skills/loop2-play/SKILL.md`. This is the second concern of the status; the walk belongs to the last slice that touches the view, or to this one again if the orchestrator wants it now.

## Reaches beyond the dispatch

- `src/browser/sim/understanding.ts` (whole): where „gałąź niewykupiona” comes from and how the repertoire drops a rule of a branch not bought.
- `src/browser/sim/run.ts:720-810` and `src/browser/sim/game.ts` (`ruleSigns`, `advanceMinutes`, `withSaveTime`): that the fight gets a program reduced to the repertoire.
- `src/browser/sim/run-record.ts` (whole): that an action with a combat effect is no key of `minutesByAction`, so the version stays 11.
- `src/browser/sim/body.ts:55-71` (`tendedBody`), `src/browser/sim/character.ts` (`gearSlots`, `fitsSlot`), `src/browser/sim/data/revelations.ts`.
- `foundations/decisions.md`: D-310 (for the quotation of „gałąź niewykupiona” at a rule, since D-289 speaks of the panel), D-379 (lines 7577-7581, the quotation of the price 3), D-140 at its current range 6903-6946.
- Tests read for their helpers and expectations: `tests/sim/gear-combat.test.mjs`, `tests/sim/tending.test.mjs`, `tests/sim/craft-and-tend.test.mjs:440-549`, `tests/sim/rule-signs.test.mjs` (parts), `tests/sim/data.test.mjs:170-290`, `tests/sim/saved-game.test.mjs:1-140`, `tests/sim/program-fixture.mjs`, `tests/sim/understanding-fixture.mjs`, `tests/invariants/test_program_closed_lists.py`, `tests/sim/rules.test.mjs`, `tests/quality/eslint-size-rules.mjs`; `.the-way/elements/decisions/template.md` (the form of a `decision:` line).

## Working copies

- `.runs/executor-4/` (in the worktree): the two commit message files and the outputs of the sweeps — removed.
- `.runs/executor-4/base`, a worktree of `0b18ce2a` with a junction `node_modules` to the main checkout's: the junction removed first (`rmdir`), then `git worktree remove --force`, then `git worktree prune` — removed; the main checkout's `node_modules` checked present afterwards.
- No remainder.

## Unread material

- `guidelines/testing.md`: read whole (in two pages).
- `foundations/decisions.md` D-206 (3918-3970): not read; the saved-game guideline and the slice's *Goal* („stays 11 here and rises in Slice 6”) gave what I needed.
- `foundations/decisions.md` D-197: read; D-195, D-193, D-126, D-120: read.
- `ui_check.md` beside the method: not read — the slice draws no screen of its own (see the walk above).

## Searches not found or unclear

- `discovery.test.mjs` was announced as left failing by this slice; it passes before and after. Unclear whether the plan meant another file — `tending.test.mjs` is the file that broke on the first moss.
- Whether the strike's data had to name the place `mainHand` („reads the place the action's data name: the main hand for „Uderz — patyk” as today”): I read „as today” as the strike's slot staying `WIELDING_SLOT` of the gear data (choice below).

## Choices

- The strike keeps its row; the place comes from the data only for an action that names one (`place`), the main hand otherwise. Way rejected: `place: "mainHand"` on the strike, symmetric, but it changes a row that `data.test.mjs` asserts and that Slice 5 was not told about. Cost if wrong: one key in the strike's data and one branch less in `pieceSlots`.
- The form of the effect is `{ heals: "target"; place: "pocket" }`; whether an action heals is asked through `healsInCombat`, so the reader of the saved game and the judge share it. Way rejected: testing `kind === "pressure"` in each place — the next healing action of combat would need each place found again.
- The refill through a pocket is modelled as „the piece goes into the first empty pocket, then is used up”, which leaves the pocket empty and lowers the backpack by one; the record carries `refill: true`. The words for the chronicle („bierze … z plecaka” of the place `pocket`) are not added: per Q2 the element of the encounter's paragraph is Slice 7's.
- `combatPiece` now returns `{ slot, refill } | null` and takes the action, not the item; `combatItem` takes the action. Both are used only by the simulation (searched in `src/`, `tests/`, `balance/`, `scripts/`).

## Problems observed

- The 11 errors of the foundation check named above (earlier slices' quotation lines that do not begin a sentence, or no longer stand in the binding sentences, of D-379, D-387, D-60, D-145, D-121). Not caused by this slice; a guess as to the cause: the foundation step rewrote those decisions after the tests quoting them were written.
- The failing tests of `action-targets.test.mjs` and `team.test.mjs` on the base, named above.
