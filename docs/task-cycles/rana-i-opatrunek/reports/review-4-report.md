FAIL 16e9e93e872f9b14618c398cd859e255e42b875e

# Review 4 — Slice 4 of rana-i-opatrunek, „Ucisk” in the simulation

Range `0b18ce2a85538217f3723a0428e7d631bc09d217..16e9e93e872f9b14618c398cd859e255e42b875e` (two commits, `72840676` test, `16e9e93e` code); `git rev-parse HEAD` in the reviewed worktree gave the head given. Method `.the-way/task-cycle/review/SKILL.md`, a slice review. Trust boundary: yes (`src/browser/sim/saved-game.ts`); irreversible operation: none.

Counts: blocking 2 · Minor 3 · out of scope 1 (plus the lines of Declined to judge).

## Findings

### Important (blocking)

**I-1. `tests/sim/pressure.test.mjs` is not registered with the mutation runner, so the invariant test `mutation-test-selection` fails.**
- Place: `stryker.config.json` (`tap.testFiles`, no line for `tests/sim/pressure.test.mjs`); the check `tests/quality/test_mutation_test_selection.py:21`.
- What is wrong: the slice adds a new simulation test file and leaves it out of the explicit list of `stryker.config.json`. The invariant test of `mutation-test-selection` asserts that the list equals every `tests/sim/*.test.mjs` but `rules.test.mjs`.
- Why it matters: the one command `npm test` goes red on this test, and `testing.md`, section "Mutation testing", has the reviewer and later changes run StrykerJS with that list: the tests of „Ucisk” do not take part, so a mutant of `combat.ts`/`program.ts` that only `pressure.test.mjs` kills survives there unseen. The guideline's rule "Test files in the gate" and the docstring of the test ("Adding a test without registering it must fail, not silently reduce mutation coverage") name exactly this case.
- Evidence: `npm test -- tests/quality/test_mutation_test_selection.py` at the head, exit 1: "Items in the second set but not the first: 'tests/sim/tending.test.mjs' 'tests/sim/pressure.test.mjs'". Comparing `git ls-tree` of `tests/sim/` with the list of `stryker.config.json`: at the base only `tending.test.mjs` is missing (see O-1), at the head `pressure.test.mjs` too. The executor's sweep ran no file of `tests/quality/` but the size test, so its report does not show it.
- Fix: one line `"tests/sim/pressure.test.mjs",` in `tap.testFiles`, in its alphabetical place.

Contradiction: yes — invariant `mutation-test-selection`.

**I-2. The refill of „Ucisk” puts into a pocket an item that fits no pocket, and heals with it.**
- Place: `src/browser/sim/program.ts:536-548` (`combatPiece`: the `empty` slot is chosen with no check that the item fits it) together with `src/browser/sim/combat.ts:51-66` (`withPiece` writes `gear[piece.slot] = item`), via `pieceSlots` at `program.ts:521-527`.
- What is wrong: the targets of „Ucisk” are every item with `healing` (`itemTargets: { property: "healing" }`, D-443), but `combatPiece` takes a piece from the backpack into the first empty pocket whatever the item's `fits`. D-456: "An item whose data name no place fits no slot"; D-457: the action "takes a *fitting* piece from the backpack into the slot itself"; D-144 (as the foundation step changed it): „Ucisk — {rzecz}” "uses up one piece of its item from a pocket of the belt, an empty pocket taking a piece from the backpack (D-457)". With a healing item that fits no pocket, the game shows a pocket holding it in the same turn and heals with it — in effect „Ucisk” takes it straight from the backpack, which D-144's Verification lists under *violates* („using up a bandage from the backpack while…” is the nearest named case; the general rule is D-456/D-457). The strike did not meet this before, because its one item, the stick, fits the main hand.
- Why it matters: the slice's own tests make such an item a valid target: `tests/sim/pressure.test.mjs:96-104` lays `SPLINT` with `healing` and no `fits`, and `:126-132` and `:172-178` assert it is a target of „Ucisk” and grows the tree. So the code is built for healing items beyond the bandage (the point of D-443), and the first one added without `fits: "pocket"` gets a turn the foundation forbids, with no test to catch it. Today's data (only the bandage, `fits: "pocket"`, `items.ts:111`) do not reach it, so no player sees it yet; that is why this is Important and not Critical.
- Evidence: probe `reports/review-4-probe.mjs` (output `reports/review-4-probe.out.txt`), run with `node probe-review-4.mjs` at the root of a worktree of the head after `npm run build`: with `SPLINT` laid in `ITEMS`, `fitsSlot("splint","pocket1")` is `false`, yet `combatPiece({ empty gear, backpack splint 1 }, { kind: "pressure", item: "splint" })` gives `{"slot":"pocket1","refill":true}`, and a fight at 40 health with „Zdrowie poniżej 50 → Ucisk — szyna” records `{"refill":true,"damage":0,"characterHealth":43}` (40 − 7 + 10) and leaves the backpack with 0 splints.
- Fix: in `combatPiece`, choose the empty slot among those the item fits (`fitsSlot(item, slot)` from `character.ts`), so that „Ucisk — {rzecz}” of an item no pocket fits finds no piece and is refused „brakuje 1 × {rzecz}”; and a case in `pressure.test.mjs` with `SPLINT` in the backpack and empty pockets, refused and leaving the backpack as it was.

Contradiction: yes — D-456 ("An item whose data name no place fits no slot"), D-457 ("takes a fitting piece"), and D-144 as changed (Settlement row 2: „Ucisk zużywa opatrunek z kieszeni pasa”).

### Minor

**M-1. A saved fight with turns of „Ucisk” in the map run of a character who did not buy the branch loads.**
- Place: `src/browser/sim/saved-game.ts:755-779` (`characterAction`) reads a turn by its action, refill mark and damage, never against the skills of the run's character.
- The handoff asked for this case. The probe (second half of `reports/review-4-probe.mjs`) saves the game after a fight with two turns of „Ucisk”, sets `ranks` of `tending` to `{}` in the run's character and the team's characters, and `loadSavedGame` gives `ok: true`, the turns as they were. The game itself never produces that document.
- Why Minor: the reader is a reader of shape, as `guidelines/coding-saved-game.md` "Odmowa zamiast wyjątku" sets it ("wszystko, czego nie dopuszczają typy stanu gry, listy zamknięte i dane, to `shape`"); bought ranks are state, not data, and no turn or activity of the reader is checked against the repertoire today (the guideline says of „Obchód” only that it passes the program check). The loaded state is otherwise consistent: the gear, the backpack and the health of the run are read on their own, so the only effect is a paragraph of the fight that shows „Ucisk” for a character without the branch. Refusing it would be allowed ("Wolno odmówić więcej"), and would be a new kind of check for the reader.

**M-2. The crafted documents of „Ucisk” stand outside the cases that hold the invariant `save-version`.**
- Place: `tests/sim/pressure.test.mjs:543-590`, with no `// invariant: save-version` and not among the crafted documents of `tests/sim/saved-game.test.mjs` (the table "a crafted document of the current version is refused whole as shape", whose refill and „Załóż” rows stand at `:3145-3177`).
- `testing.md`, "Trust boundaries", gives the boundary `saved-game.ts` its direct test in the named cases of `saved-game.test.mjs`. The new refusals (a turn of „Ucisk” dealing 3, on a stick, with no target, „Ucisk” as the activity of a minute) are real and seen failing per the executor, but a reader of the invariant's cases does not find them, and a change to that table does not see them. Moving the four rows into the table of `saved-game.test.mjs` (where the turn of „Załóż” stands) keeps one place for the boundary's refusals. The executor named its reason (the guideline lists the cases by name); the list names the case, not its rows, so adding rows changes no list.

**M-3. The doc comment of `WIELDING_SLOT` now reads more broadly than the code.**
- Place: `src/browser/sim/data/gear.ts:32-35`: "The slot a combat action that uses an item, „Uderz — patyk”, takes its piece from, and no other (D-456): the main hand."
- Since this slice „Ucisk” is a combat action that uses an item and takes it from a pocket; `pieceSlots` (`program.ts:521-527`) uses `WIELDING_SLOT` only for an action whose data name no `place`. The executor saw it and left it as a file outside the slice's *Change*; a reader of `gear.ts` alone is misled. One line.

### Out of scope

**O-1 (Important, outside this slice).** `tests/sim/tending.test.mjs`, added by an earlier slice (`be60238e` and before; missing from `stryker.config.json` at the base `0b18ce2a` already), is not registered with the mutation runner either; the same failure of `tests/quality/test_mutation_test_selection.py` names it. Not of this range, but the fix of I-1 is the same edit and should take it along.

## Judged and found sound

- D-144, D-145: the turn uses up the piece of the first pocket that holds it, or takes one through the first empty pocket in the same turn (`refill: true`), gives back `tendedBody(body at the turn's health, healingOf(skills, item))`, capped at 100, records damage 0 and the health after; „zdrowie pełne” reads `combat.health`, the health the judge is given, not `run.body.health` (`program.ts:572`, `judgeRule` at `:626`). Checked against the tests and the code.
- D-380 order „zdrowie pełne” before „brakuje 1 × opatrunek”, the lack counted in pockets with the backpack that refills one; D-309 „tylko w walce” (`program.ts:493`); D-363 price one piece of the target (`program.ts:122`); D-290 place after „Odskocz”; row 10 icon; D-150 pair `{ action: "pressure" }` covering every target; D-195 the action enters with the tree; D-126/D-310 „gałąź niewykupiona” and the rule passed over without the branch (test at `pressure.test.mjs:469-502`).
- `saved-game.ts`: `pressure` among `COMBAT_VERBS` (a turn read, an activity refused at `:712`), the refill mark allowed only where `combatItem(acted)` is not null, damage 0 for „Ucisk” and „Załóż”; the target is read through the program check, so an item with no healing and no item are refused. `MINUTE_KINDS` (`run-record.ts:16-22`) leaves out every action with a combat effect, so the version stays 11, as the plan says.
- The changed invariant test `tests/invariants/test_program_closed_lists.py` (invariant `program-closed-lists`): `pressure` added to `ACTION_KINDS` and a valid rule „Zdrowie poniżej 50 → Ucisk — Opatrunek” to `VALID`, docstring "four kinds that take an item". The cause is the data's new action kind; the invariant's sentence is unchanged; the test passes. Sound.
- `tests/sim/tending.test.mjs` (pairs of the tree; the first moss now bringing `["explore", "pressure", "craft"]`) and `tests/sim/gear-wear.test.mjs` (the group with `pressure` before `equip`): each changed expectation has its cause in the task (row 5 / D-150, D-195, D-290), with its source. Sound under "Changing an existing test".
- The failures of `tests/sim/craft-and-tend.test.mjs` (2) are stale expectations: „Ucisk” enters with the tree, at the first moss in the first test and at the first bandage in the second, whose fixture has no tree in the Understanding — D-195, not a fault of the code. `data.test.mjs` (3) fail on the lists of actions, as announced. `action-targets.test.mjs` (3) and `team.test.mjs` (1) fail as on the base, given to Slice 5.
- `tests/sim/discovery.test.mjs`, announced as left failing, passes; the executor's reading (the plan meant the file of the first moss, `tending.test.mjs`) is plausible; it changes nothing to judge here.
- The executor's walk was not performed; its judgement that the change alters what a user sees agrees with the change, and the reason (the view of „Ucisk” comes in Slices 7, 9, 10) is given for each unchecked case.
- The executor's own-work check aimed at the health of the turn, which holds; it did not reach the fitting of the piece (I-2).
- Mutation testing of the changed ranges: 126 killed, 14 survived, 2 without coverage. Every survivor is a defensive guard on a path the judge makes unreachable, or equivalent: `combat.ts:56` and `:83` (null checks of a piece the judge guarantees), `:179` (`?? undefined` → `&& undefined`, the pair of „Ucisk” names no item, so the practice is the same), `:183` (the guard of an effect that heals, reached only through the earlier branch), `program.ts:541` (`combatPiece` of an action with no item; both callers test `combatItem` first), `:514` (no row has `item` without the key), `:554` (`healsInCombat` is called only for actions with a combat effect). No survivor is a gap needing an assertion. The two without coverage are the messages of unreachable throws.

## Declined to judge

- The view of „Ucisk” (the pick, the editor, the icons, the paragraph of the encounter) — Slices 7, 9 and 10 of the plan.
- `SAVED_GAME_VERSION` staying 11 — the handoff gives its rise to Slice 6.
- `actionInRepertoire` not judging an item action by its pair — an accepted limitation of Slice 1.
- The eleven `decision:` quotation errors of `foundation_check.py` in `body.test.mjs`, `craft-and-tend.test.mjs`, `tending.test.mjs` — known, given to Slice 5; none on a line of this slice (the new `D-150` line of `tending.test.mjs` and the lines of `pressure.test.mjs` are not reported).
- The failing tests the handoff names as known or announced (`data`, `craft-and-tend`, `action-targets`, `team`, the view files) — owned by later slices; I checked only that the sim ones fail for stale expectations (above).

## Checks run

All in a worktree of the head at `.runs/review-4/` (`.the-way` initialized at `6ed3cb36…`, equal to the gitlink; `node_modules` a junction to the main checkout's).

| Command | Exit |
|---|---|
| `npm test -- tests/sim/pressure.test.mjs` | 0 |
| `npm test -- tests/sim/combat.test.mjs` | 0 |
| `npm test -- tests/sim/encounters.test.mjs` | 0 |
| `npm test -- tests/sim/gear-combat.test.mjs` | 0 |
| `npm test -- tests/sim/gear-combat-wear.test.mjs` | 0 |
| `npm test -- tests/sim/rule-signs.test.mjs` | 0 |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 |
| `npm test -- tests/sim/previous-programs.test.mjs` | 0 |
| `npm test -- tests/invariants/test_program_closed_lists.py` | 0 |
| `npm test -- tests/invariants/test_icon_credits.py` | 0 |
| `npm test -- tests/sim/rules.test.mjs` | 0 |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 |
| `npm test -- tests/sim/tending.test.mjs` | 0 |
| `npm test -- tests/sim/gear-wear.test.mjs` | 0 |
| `npm test -- tests/sim/discovery.test.mjs` | 0 |
| `npm test -- tests/sim/action-targets.test.mjs` | 1 (3 tests, known) |
| `npm test -- tests/sim/team.test.mjs` | 1 (1 test, known) |
| `npm test -- tests/sim/data.test.mjs` | 1 (3 tests, announced) |
| `npm test -- tests/sim/craft-and-tend.test.mjs` | 1 (2 tests, announced; stale expectations) |
| `npm run typecheck` | 0 |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 1 — finding I-1 |
| `python -B .the-way/elements/common/foundation_check.py` | 1 — 11 errors, all on the known quotation lines |
| `node probe-review-4.mjs` (copy: `reports/review-4-probe.mjs`, output `reports/review-4-probe.out.txt`) | 0 — shows I-2 and M-1 |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.review-4.json` (copy of the config: `reports/review-4-stryker-config.json`; mutates `combat.ts:46-93`, `combat.ts:165-185`, `program.ts:507-580`, `saved-game.ts:764-770`; test files `pressure`, `combat`, `encounters`, `gear-combat`, `gear-combat-wear`, `rule-signs`, `saved-game`, `gear-wear`, `tending`) | 0 — 126 killed, 14 survived, 2 no coverage, all classified above |

Not run: the full `npm test` (the cycle's own run before the request); the repository's own Stryker configuration as it stands, since its initial run includes test files the slice leaves failing (`data`, `craft-and-tend`, `action-targets`, `team`) and would abort, hence the narrowed configuration above.

## Reaches beyond the dispatch

- `foundations/decisions.md` D-144, D-145, D-146, D-147, D-148, D-150 (lines 7012-7163, read whole as one range), D-380 and D-443 (8392-8429), D-363 (10346-10362), D-456 and D-457 (12811-12838), D-290 (10005-10033): read whole to judge the code against them; D-140, D-309, D-289, D-126, D-120, D-193, D-195, D-197, D-206 not read (see Unread material).
- `src/browser/sim/saved-game.ts:280-350`, `:690-830` (the reader of activities and combat records); `src/browser/sim/combat.ts:95-228`; `src/browser/sim/run-record.ts:16-22` (`MINUTE_KINDS`); `src/browser/sim/body.ts:63-71` (`tendedBody`); `src/browser/sim/skills.ts:101-176` (`healingOf`, `targetItem`, `practiced`); `src/browser/sim/character.ts:29-46` (`fitsSlot`); `src/browser/sim/data/items.ts:95-120`; `src/browser/sim/data/gear.ts:28-37`: to follow the turn, the piece and the reader.
- `tests/sim/saved-game.test.mjs` (grep of `refill`, lines 3145-3177): the precedent of crafted refill rows (M-2).
- `tests/sim/craft-and-tend.test.mjs:640-720`: to tell a stale expectation from a fault of the code.
- `tests/quality/test_mutation_test_selection.py` and `stryker.config.json`: for the mutation run that `testing.md` asks of the reviewer (I-1).

## Working copies

- `.runs/review-4/` under the worktree `the worktree's root` — a detached worktree of `16e9e93e`: the `node_modules` junction removed first with `rmdir` (the main checkout's `node_modules` checked present after), then `git worktree remove --force`, then `git worktree prune`. Removed.
- `.runs/review-4-out/` under the same worktree — the logs of the checks; it stood beside the named directory, not in it. Removed (`rm -rf` by its full path).
- Kept in `reports/`: `review-4-probe.mjs`, `review-4-probe.out.txt`, `review-4-stryker-config.json`.
- No remainder.

## Unread material

- `foundations/decisions.md` D-140, D-309, D-289, D-126, D-120, D-193, D-195, D-197 and D-206, named by the dispatch, not read whole: their sentences that bear on the change are quoted in the tests and in the task passages of the handoff, and the code agrees with those quotations; I did not open them whole.
- `foundations/invariants.md` (program-closed-lists, save-version, program-rule-pick), `foundations/glossary.md` (combat turn, gear) and `foundations/part_map.md:34-66`: not read; the invariant tests and the guidelines carried what I judged.
- `src/browser/sim/action-targets.ts`, `src/browser/sim/skills.ts` (beyond 101-176), `src/browser/sim/data/gear.ts` (beyond 28-37), `src/browser/sim/data/items.ts` (beyond 95-120): not read whole.
- The guideline files of the dispatch (`coding.md`, `coding-content-data.md`, `coding-simulation-module.md`, `coding-saved-game.md`, `testing.md`): read whole.

## Searches not found or unclear

- none
