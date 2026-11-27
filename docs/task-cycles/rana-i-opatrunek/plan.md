# Plan — Rana i opatrunek — drzewo opatrywania z gałęzią Ucisk i mapa z watahą jako ściana

- Task: .runs/task-cycles/rana-i-opatrunek/task_frozen.md
- Spec: none
- Base: be4e9c09f3c45f421d04983948a88bd6240809bf

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| D-379 — the ninth character skill „Opatrywanie małych ran”, its curve and its four branches with their effects and prices | decision, change | Settlements to record, row 6; Decisions in play, D-379 | Slices 2, 4, 8 |
| D-144 — „Ucisk — {rzecz}”, opened by the bought branch Ucisk, is an action of combat of its own that the player writes as a combat rule; „Opatrz” stays out of combat | decision, change | Settlements to record, row 1 | Slices 4, 11 |
| D-144 — Ucisk uses one piece from a pocket of the belt, an empty pocket taking a piece from the backpack; „Opatrz” takes from the backpack | decision, change | Settlements to record, row 2 | Slices 4, 7 |
| D-144 — Ucisk restores what „Opatrz” restores with the same item, bought ranks of „Mocniejszy zwój” included, never above full health | decision, change | Settlements to record, row 3 | Slices 3, 4 |
| D-150 — „Ucisk — {rzecz}” grows „Opatrywanie małych ran”, a predisposition of the elemental mage | decision, change | Settlements to record, row 4 | Slice 4 |
| Row 5 — one tree grown by „Wytwórz — Opatrunek”, „Opatrz — Opatrunek” and „Ucisk — Opatrunek”, in the data of the skills and the mage's predispositions, held by a test | data or code | Settlements to record, row 5 | Slices 2, 4 |
| D-145 — the health „Opatrz” gives back is the item's healing increased by the bought ranks of „Mocniejszy zwój” | decision, change | Settlements to record, row 7 | Slice 3 |
| D-387 — 0.05 health a minute is the number of a character with no bought rank of „Szybkie gojenie”, each rank adding 0.05 | decision, change | Settlements to record, row 8 | Slice 3 |
| D-290 — Ucisk stands in the group „Żywność i walka” after „Odskocz” | decision, change | Settlements to record, row 9 | Slices 4, 5, 9, 10 |
| Row 10 — Ucisk has the icon of „Opatrz”, `bandage-roll`, in the data of the actions | data or code | Settlements to record, row 10 | Slices 4, 10 |
| D-199 — Ucisk among the branches that give the price and no before-and-after values | decision, change (follows from the code) | Decisions in play, D-199 | Slice 8 |
| D-380 — „Ucisk — {rzecz}” refused „zdrowie pełne” before „brakuje {ile} × {rzecz}”, the lack counted in the pockets and the backpack | decision, change (follows from the code) | Decisions in play, D-380 | Slice 4 |
| D-363 — Ucisk among the actions whose target gives the price, as „Ucisk — Opatrunek (1 opatrunek)” | decision, change (follows from the code) | Decisions in play, D-363 | Slices 4, 9 |
| D-120 — its *Verification*: „Wytwórz” and „Opatrz” with the bandage as the target no longer stay open with no predisposition | decision, change (follows from the code) | Decisions in play, D-120 | Slices 1, 2 |

The change writes no new entry: every row changes an existing decision or the data. The entries are
written before Slice 1. Tests of the product quote binding sentences of D-379, D-144, D-150, D-145,
D-199, D-290, D-380, D-363, D-387 and D-120 in `decision:` lines (the planner's report lists the
files); each rewritten entry keeps a quoted sentence as it stands where the change allows, adding
what is new as a sentence of its own or after the quoted words. After the entries are written,
`python -B .the-way/elements/common/foundation_check.py` names every quotation that no longer
stands; a stale quotation in a file that no slice below changes goes to a slice by an edit of this
plan before Slice 1 is dispatched.

## Slices

### Slice 1 — Pairs of verb and target in the data of the skills

- **Goal:** A character skill names in its data the pairs of verb and target it grows (D-193,
  D-120), not a list of verbs: `SkillDef` in `src/browser/sim/data/skills.ts` replaces the field
  `actions` with a field `grownBy`, a list of pairs, each an action and, for an action that takes an
  item as its target, optionally that item; a pair with no item covers every target of its verb.
  The eight skills grow exactly the pairs they grow today, each a verb with no item. Every reader of
  the field reads the pairs: `practiced` in `src/browser/sim/skills.ts` takes the action's item
  where it has one (its callers in `src/browser/sim/run.ts` pass it; the calls of
  `src/browser/sim/combat.ts` pass kinds with no item and stay as they are); in
  `src/browser/sim/understanding.ts` the repertoire (`repertoireOf`, `actionInRepertoire`) keeps an
  action whose pair a skill among the predispositions grows or no skill grows, an item action being
  judged by its pair, and the kind staying in `repertoire.actions` where at least one of its pairs
  is open; the cases of item actions in `actionInRepertoire` and `undiscoveredPart` read whether a
  kind takes an item from `takesItem` of `src/browser/sim/action-targets.ts` instead of listing the
  kinds; a tree enters the Understanding with the first pair it grows whose verb and target the
  Understanding holds after the minute, at least one of them new in it (`newlyRevealed`, D-195).
  Behaviour does not change: only the test of `tests/sim/data.test.mjs` that reads the field („the
  character skills grow the listed pairs of verb and target, and the walks stand in none”) is
  rewritten for the new field, with the same pairs and the same free actions.
- **Change:** `src/browser/sim/data/skills.ts` · `src/browser/sim/skills.ts` ·
  `src/browser/sim/understanding.ts` · `src/browser/sim/run.ts` · `tests/sim/data.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-content-data.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/action-targets.ts` · `src/browser/sim/data/actions.ts` ·
  `src/browser/sim/data/items.ts` · `src/browser/sim/combat.ts` ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:29-29` To do, item 1 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:214-214` Settlements to record, row 5 ·
  `foundations/decisions.md:7654-7678` D-120 · `foundations/decisions.md:7279-7299` D-191 ·
  `foundations/decisions.md:7319-7339` D-193 · `foundations/decisions.md:7359-7376` D-195 ·
  `foundations/decisions.md:8374-8392` D-443 · `foundations/decisions.md:8283-8302` D-126 ·
  `foundations/decisions.md:854-872` D-425 · `foundations/invariants.md:226-235` simulation-inputs ·
  `foundations/invariants.md:236-247` content-identifiers ·
  `foundations/invariants.md:1428-1437` function-and-file-size ·
  `foundations/glossary.md:5-11` character skill · `foundations/glossary.md:111-135` predisposition,
  archetype, Understanding, repertoire · `foundations/glossary.md:186-191` practice ·
  `foundations/part_map.md:34-66` simulation
- **Model:** same — a change of the readers of the repertoire and of the Understanding across three
  modules, with the behaviour kept (the orchestrator's change of the plan's `cheaper`, at the plan's
  review)
- **Risk:** none
- **Checks:** `npm run typecheck` · `npm test -- tests/sim/data.test.mjs` ·
  `npm test -- tests/sim/repertoire.test.mjs` · `npm test -- tests/sim/skills.test.mjs` ·
  `npm test -- tests/sim/discovery.test.mjs` · `npm test -- tests/sim/craft-and-tend.test.mjs` ·
  `npm test -- tests/sim/rule-signs.test.mjs` · `npm test -- tests/sim/rules.test.mjs` ·
  `npm test -- tests/quality/test_function_and_file_size.py` — every one of them passing with no
  expectation changed but the shape test named in the Goal
- **Depends on:** D-120

### Slice 2 — The tree „Opatrywanie małych ran” and its three numerical branches

- **Goal:** `SKILLS` of `src/browser/sim/data/skills.ts` gains, last, after „Unik przed ciosem”, the
  skill `tending`, „Opatrywanie małych ran”, growing the pairs „Wytwórz — Opatrunek” and „Opatrz —
  Opatrunek” (the verbs `craft` and `tend` with the item `bandage`), its levels and points at 10, 28,
  60 and 110 practice; „Ucisk — Opatrunek” joins its pairs in Slice 4. `BranchEffect` gains two
  kinds that carry an amount and no actions, `healing` (health one piece of a healing item gives
  back) and `healthRegain` (health that comes back by itself in a game minute). `BRANCHES` gains
  `strongerRoll` „Mocniejszy zwój” (`healing`, 5 per rank, costs 1 · 1 · 2, description „Opatrunek
  leczy więcej.”), `deftHand` „Wprawna dłoń” (the existing kind `duration` on `tend`, 2 minutes per
  rank, costs 1 · 1 · 2, „Opatrujesz szybciej.”) and `quickHealing` „Szybkie gojenie”
  (`healthRegain`, 0.05 per rank, costs 2 · 3, „Rany schodzą same szybciej — cecha, działa
  zawsze.”), each with the numerical `preview` whose base, step, unit and minimum question 3 of the
  planner's report settles (the orchestrator gives them in the handoff). The predispositions of
  `elementalMage` in `src/browser/sim/data/archetypes.ts` gain `tending`, last. So „Wytwórz —
  Opatrunek” and „Opatrz — Opatrunek” ending in effect add one practice to the tree (D-193), the tree
  enters the Understanding in the minute „Wytwórz” enters it with the bandage (D-195), and the
  bought „Wprawna dłoń” shortens „Opatrz” (D-374 holding). The kinds `healing` and `healthRegain`
  act in nothing until Slice 3. The tests that hold today that neither verb adds practice
  (`tests/sim/craft-and-tend.test.mjs`) and that „Wytwórz” and „Opatrz” with an item stay open with
  no predisposition (`tests/sim/repertoire.test.mjs`, D-120) change to the new rule; the count and
  table of skills of `tests/sim/data.test.mjs` and the table of D-379 of `tests/sim/skills.test.mjs`
  gain the tree; a new `tests/sim/tending.test.mjs` holds the tree's pairs and predisposition
  (Settlements row 5), its practice from each pair, its entry into the Understanding with
  „Wytwórz”, the repertoire without the predisposition and the shortened „Opatrz”.
- **Change:** `src/browser/sim/data/skills.ts` · `src/browser/sim/data/archetypes.ts` ·
  `tests/sim/data.test.mjs` · `tests/sim/skills.test.mjs` · `tests/sim/repertoire.test.mjs` ·
  `tests/sim/craft-and-tend.test.mjs` · `tests/sim/tending.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-content-data.md` · `guidelines/testing.md` ·
  `src/browser/sim/skills.ts` · `src/browser/sim/understanding.ts` · `src/browser/sim/data/items.ts` ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:29-30` To do, items 1 and 2 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:51-56` Questions to settle, Q2 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:68-74` Questions to settle, Q6 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:214-215` Settlements to record, rows 5 and 6 ·
  `foundations/decisions.md:7549-7575` D-379 · `foundations/decisions.md:7654-7678` D-120 ·
  `foundations/decisions.md:7279-7299` D-191 · `foundations/decisions.md:7300-7318` D-192 ·
  `foundations/decisions.md:7319-7339` D-193 · `foundations/decisions.md:7359-7376` D-195 ·
  `foundations/decisions.md:7505-7517` D-374 · `foundations/decisions.md:7036-7055` D-145 ·
  `foundations/invariants.md:968-977` action-duration-minimum ·
  `foundations/glossary.md:5-11` character skill · `foundations/glossary.md:111-135` predisposition,
  archetype, Understanding, repertoire · `foundations/glossary.md:186-197` practice, trait ·
  `foundations/part_map.md:34-66` simulation
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/tending.test.mjs` (written first, failing on the base of the
  slice) · `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/skills.test.mjs` ·
  `npm test -- tests/sim/repertoire.test.mjs` · `npm test -- tests/sim/craft-and-tend.test.mjs` ·
  `npm test -- tests/sim/discovery.test.mjs` · `npm run typecheck` ·
  `python -B .the-way/elements/common/foundation_check.py`, which reports no quotation of the files
  this slice changes
- **Depends on:** Slice 1 · Row 5 · D-379 · D-120

### Slice 3 — „Mocniejszy zwój” in the healing and „Szybkie gojenie” in the health that comes back

- **Goal:** The two new kinds of branch effect act. One function of `src/browser/sim/skills.ts`
  gives the health one piece of a healing item gives back to a character: the item's `healing` of
  the data plus the bought `healing` bonus (5 per rank of „Mocniejszy zwój”); „Opatrz” in
  `landUse` of `src/browser/sim/run.ts` gives back that health, never above full health (D-145,
  Settlements row 7), and Slice 4 uses the same function for Ucisk. `bodyMinute` of
  `src/browser/sim/body.ts` takes the health regained in a minute that is neither chilled nor
  starving as an argument whose default is the data's 0.05, and `minuteBeforePick` of
  `src/browser/sim/run.ts` passes the data's number plus the bought `healthRegain` bonus (0.05 per
  rank of „Szybkie gojenie”), the sum kept at the body's decimal places (D-387, Settlements row 8).
  A character with no rank of either branch heals and regains exactly as before (To do, item 6): the
  tests that expect 25 health from a bandage and 0.05 a minute stay unchanged and pass. New cases in
  `tests/sim/body.test.mjs` and `tests/sim/craft-and-tend.test.mjs`, written first, hold the health
  with each rank of the two branches, the cap at full health and the minutes of combat, in which the
  body stands still (D-60).
- **Change:** `src/browser/sim/skills.ts` · `src/browser/sim/body.ts` · `src/browser/sim/run.ts` ·
  `tests/sim/body.test.mjs` · `tests/sim/craft-and-tend.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/testing.md` · `src/browser/sim/data/skills.ts` · `src/browser/sim/data/balance.ts` ·
  `src/browser/sim/data/items.ts` ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:29-29` To do, item 1 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:38-38` To do, item 6 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:216-217` Settlements to record, rows 7 and 8 ·
  `foundations/decisions.md:7036-7055` D-145 · `foundations/decisions.md:6645-6663` D-387 ·
  `foundations/decisions.md:6369-6384` D-60 · `foundations/decisions.md:7549-7575` D-379 ·
  `foundations/decisions.md:7300-7318` D-192 · `foundations/invariants.md:226-235` simulation-inputs ·
  `foundations/invariants.md:1428-1437` function-and-file-size ·
  `foundations/glossary.md:192-197` trait · `foundations/part_map.md:34-66` simulation
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/body.test.mjs` · `npm test -- tests/sim/craft-and-tend.test.mjs`
  (their new cases written first, failing on the base of the slice) ·
  `npm test -- tests/sim/combat.test.mjs` · `npm test -- tests/sim/encounters.test.mjs` ·
  `npm test -- tests/sim/catch-up.test.mjs` · `npm test -- tests/view/body-row.test.mjs` ·
  `npm test -- tests/balance/agreement.test.mjs` ·
  `npm test -- tests/quality/test_function_and_file_size.py` · `npm run typecheck`
- **Depends on:** Slice 2 · D-145 · D-387 · D-144 (row 3)

### Slice 4 — Ucisk, an action of combat, in the simulation

- **Goal:** The action `pressure`, „Ucisk”, exists and acts. In `src/browser/sim/data/actions.ts` it
  stands after `dodge` and before `equip`, in the group `foodAndCombat` (D-290, Settlements row 9),
  with the icon `bandage-roll` and its title as „Opatrz” has them (row 10), `minutes: null`, item
  targets from the property `healing` (D-443), revealed with the tree `tending`
  (`treeDiscovered`, as `patrol` is with its tree, D-195), the `status` words that question 2 of
  the planner's report settles (the orchestrator gives them in the handoff), and a combat effect of
  a new form that says it heals by its target and takes its piece from the place `pocket`. `src/browser/sim/types.ts`
  gains the action `{ kind: "pressure"; item: ItemId }` among `Action` and `pressure` among
  `CombatVerbKind`. `BRANCHES` gains `pressure`, „Ucisk”, of `tending`, effect `action` on
  `pressure`, cost 3, no preview, description „Opatrzenie w trakcie starcia, za turę zamiast za
  dziesięć minut.”; the pair of `pressure` with no item, which covers „Ucisk — Opatrunek” and every
  other target with healing (Choices), joins the pairs of `tending` (row 5, D-150). `src/browser/sim/programs.ts` takes it on the closed list with an item among its targets.
  In `src/browser/sim/program.ts`: its price is one piece of its target (D-363); outside combat it
  is refused „tylko w walce” (D-309); in a combat turn it is refused „zdrowie pełne” at the health
  of that turn — the health the combat judge is given, not the body's health at the attack — and
  then „brakuje 1 × {rzecz}” where no pocket holds its item and the backpack holds none (D-380); the
  piece rule of an action of combat that uses an item reads the place the action's data name: the
  main hand for „Uderz — patyk” as today (D-456), for Ucisk the first pocket holding the item, or,
  where none does, a piece taken from the backpack into the first empty pocket in the same turn
  (D-457). In `resolveCombat` of `src/browser/sim/combat.ts`, Ucisk uses up that piece, gives back
  the health of Slice 3's function, never above full health (D-144, rows 1 to 3), records the turn
  with its refill mark, no damage and the health after it, and adds one practice to `tending`
  (D-193). Without the bought branch the action is passed over (D-126, D-120) and the rule reads
  „gałąź niewykupiona” (D-289). `src/browser/sim/saved-game.ts` reads a turn of Ucisk in a combat
  record — among `COMBAT_VERBS`, its refill mark allowed, its damage 0 — and refuses Ucisk as an
  ordinary activity, as it refuses every action of combat; `SAVED_GAME_VERSION` stays 11 here and
  rises in Slice 6. A new `tests/sim/pressure.test.mjs`, written first, holds each of these. This
  slice leaves failing the tests that list the actions of the data, of the group „Żywność i walka”
  or of the minute in which the tree enters: `tests/sim/data.test.mjs`,
  `tests/sim/craft-and-tend.test.mjs` and `tests/sim/discovery.test.mjs`, made to pass by Slice 5;
  `tests/view/program-editor.test.mjs`, made to pass by Slice 9; `tests/view/rule-editor.test.mjs`,
  `tests/view/icons.test.mjs` and `tests/view/gear-editor.test.mjs`, made to pass by Slice 10.
- **Change:** `src/browser/sim/data/actions.ts` · `src/browser/sim/data/skills.ts` ·
  `src/browser/sim/types.ts` · `src/browser/sim/programs.ts` · `src/browser/sim/program.ts` ·
  `src/browser/sim/combat.ts` · `src/browser/sim/saved-game.ts` · `tests/sim/pressure.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-content-data.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/coding-saved-game.md` ·
  `guidelines/testing.md` · `src/browser/sim/data/gear.ts` · `src/browser/sim/data/items.ts` ·
  `src/browser/sim/action-targets.ts` · `src/browser/sim/skills.ts` ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:31-31` To do, item 3 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:46-50` Questions to settle, Q1 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:63-67` Questions to settle, Q5 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:75-81` Questions to settle, Q7 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:204-223` Settlements to record ·
  `foundations/decisions.md:7007-7035` D-144 · `foundations/decisions.md:7124-7138` D-150 ·
  `foundations/decisions.md:7036-7055` D-145 · `foundations/decisions.md:6898-6941` D-140 ·
  `foundations/decisions.md:7056-7073` D-146 · `foundations/decisions.md:8355-8373` D-380 ·
  `foundations/decisions.md:10309-10323` D-363 · `foundations/decisions.md:10206-10245` D-309 ·
  `foundations/decisions.md:9916-9967` D-289 · `foundations/decisions.md:9968-9996` D-290 ·
  `foundations/decisions.md:8283-8302` D-126 · `foundations/decisions.md:7654-7678` D-120 ·
  `foundations/decisions.md:7319-7339` D-193 · `foundations/decisions.md:7359-7376` D-195 ·
  `foundations/decisions.md:7401-7416` D-197 · `foundations/decisions.md:8374-8392` D-443 ·
  `foundations/decisions.md:12772-12786` D-456 · `foundations/decisions.md:12787-12799` D-457 ·
  `foundations/decisions.md:3918-3970` D-206 · `foundations/invariants.md:364-374`
  program-closed-lists · `foundations/invariants.md:1048-1057` save-version ·
  `foundations/invariants.md:248-263` program-rule-pick ·
  `foundations/glossary.md:174-179` combat turn · `foundations/glossary.md:338-342` gear ·
  `foundations/part_map.md:34-66` simulation
- **Model:** strongest — the action needs design: a new form of combat effect, a piece rule that reads
  the place the data name, and a reader at the trust boundary, all at once (the orchestrator's change
  of the plan's `same`, at the plan's review)
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/pressure.test.mjs` (written first, failing on the base of the
  slice) · `npm test -- tests/sim/combat.test.mjs` · `npm test -- tests/sim/encounters.test.mjs` ·
  `npm test -- tests/sim/gear-combat.test.mjs` · `npm test -- tests/sim/gear-combat-wear.test.mjs` ·
  `npm test -- tests/sim/rule-signs.test.mjs` · `npm test -- tests/sim/saved-game.test.mjs` ·
  `npm test -- tests/sim/previous-programs.test.mjs` ·
  `npm test -- tests/invariants/test_program_closed_lists.py` ·
  `npm test -- tests/invariants/test_icon_credits.py` · `npm test -- tests/sim/rules.test.mjs` ·
  `npm test -- tests/quality/test_function_and_file_size.py` · `npm run typecheck`
- **Depends on:** Slice 3 · D-144 · D-150 · D-380 · D-363 · D-290 · Row 5 · Row 10

### Slice 5 — The tests of the data and of discovery agree with Ucisk

- **Goal:** The tests of the simulation that list the actions of the data, the group „Żywność i
  walka” of the pick (D-290: „Zjedz — jagoda”, „Opatrz”, „Uderz — patyk”, „Kopnij”, „Odskocz”,
  „Ucisk”, „Załóż”), the free actions, the revealing event of each action (Ucisk with the tree
  `tending`, D-195), D-144 and D-150 hold the data as Slice 4 left it, and the tests of the minute
  in which the tree enters the Understanding name Ucisk among what that minute reveals. Only
  expectations that Slice 4's data change, each with its source in the foundation, change;
  `tests/sim/data.test.mjs`, `tests/sim/craft-and-tend.test.mjs` and `tests/sim/discovery.test.mjs`
  pass again. The slice also repairs, by the orchestrator's edit of the plan at the end of Slice 4
  (the earlier slices' checks did not reach them): `tests/sim/action-targets.test.mjs` (three tests
  fail since Slice 2 put the tree into the data: the two that hold that „Wytwórz” and „Opatrz” with
  the bandage lie in the repertoire, and the one that says neither verb is grown by a character
  skill, whose expectations follow the task's item 1 and D-120 as they now stand) and
  `tests/sim/team.test.mjs` (one test, the created character's record, which holds the data of the
  mage); and the `decision:` quotation lines that `python -B
  .the-way/elements/common/foundation_check.py --skip-test-citations` lists in
  `tests/sim/body.test.mjs`, `tests/sim/craft-and-tend.test.mjs` and `tests/sim/tending.test.mjs`
  (eleven at the end of Slice 4, written by Slices 2 to 4 against the wording the decisions had
  before the foundation step): each is changed to the opening of the binding sentence that now says
  the same, and no assertion beside it changes. Only expectations that the change of the data makes
  stale change; each keeps its source in the foundation.
- **Change:** `tests/sim/data.test.mjs` · `tests/sim/craft-and-tend.test.mjs` ·
  `tests/sim/discovery.test.mjs` · `tests/sim/action-targets.test.mjs` · `tests/sim/team.test.mjs` ·
  `tests/sim/body.test.mjs` · `tests/sim/tending.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `src/browser/sim/data/actions.ts` ·
  `src/browser/sim/data/skills.ts` · `tests/sim/action-targets.test.mjs:340-420` · `tests/sim/team.test.mjs:60-140` ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:29-30` To do, items 1 and 2 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:31-31` To do, item 3 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:210-219` Settlements to record, rows 1 to 10 ·
  `foundations/decisions.md:9968-9996` D-290 · `foundations/decisions.md:7007-7035` D-144 ·
  `foundations/decisions.md:7124-7138` D-150 · `foundations/decisions.md:7359-7376` D-195 ·
  `foundations/decisions.md:6985-7006` D-143 · `foundations/decisions.md:7549-7575` D-379 ·
  `foundations/decisions.md:7654-7678` D-120 · `foundations/part_map.md:34-66` simulation
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/craft-and-tend.test.mjs` ·
  `npm test -- tests/sim/discovery.test.mjs` · `npm test -- tests/sim/action-targets.test.mjs` ·
  `npm test -- tests/sim/team.test.mjs` · `npm test -- tests/sim/body.test.mjs` ·
  `npm test -- tests/sim/tending.test.mjs` · `npm test -- tests/sim/skills.test.mjs` ·
  `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`, which exits 0
  (no quotation of any test stale)
- **Depends on:** Slice 4

### Slice 6 — The version of the saved game's shape rises to 12

- **Goal:** `SAVED_GAME_VERSION` of `src/browser/sim/saved-game.ts` is 12 (To do, item 9; D-206):
  a saved game of version 11 in which „Wytwórz” is already discovered would never get the tree
  `tending`, which enters only with a pair discovered in a minute (D-195), and a combat record may
  now hold a turn of Ucisk. The comment over the constant says so. In `tests/sim/saved-game.test.mjs`
  the document of version 11 stays, written out, as an old one, refused as `version` like those
  before it; the document of the current version, version 12, is version 11 with what the change
  adds, filling each new optional branch: a character with practice and bought ranks of `tending`,
  Ucisk among them, the tree among the known ones, a combat record with a turn of Ucisk that
  refilled an empty pocket and one that took from a pocket, practice of `tending` in the map run
  and in its combat; it loads into the state it describes. Crafted documents of version 12 are
  refused whole as `shape`: a turn of Ucisk with damage other than 0, Ucisk as the ordinary activity
  of a map run, a rank of a branch of `tending` above its prices or in a tree the Understanding
  lacks. In `tests/sim/previous-programs.test.mjs` the table of readable versions gains version 12
  and its precondition names it the current version. The header comment of the saved-game test
  tells version 12 as the others are told.
- **Change:** `src/browser/sim/saved-game.ts` · `tests/sim/saved-game.test.mjs` ·
  `tests/sim/previous-programs.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-saved-game.md` · `guidelines/testing.md` ·
  `tests/sim/saved-game.test.mjs:1-264` header, programs and skills ·
  `tests/sim/saved-game.test.mjs:945-1172` the document of version 10, the gear, the current
  document and its first tests · `tests/sim/saved-game.test.mjs:1387-1600` the refusal of each old
  version · `tests/sim/saved-game.test.mjs:2982-3210` the crafted documents of the gear and the
  combat record · `tests/sim/previous-programs.test.mjs:120-290` the readable versions ·
  `src/browser/sim/types.ts` · `src/browser/sim/data/skills.ts` ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:41-41` To do, item 9 ·
  `foundations/decisions.md:3918-3970` D-206 · `foundations/decisions.md:7359-7376` D-195 ·
  `foundations/decisions.md:7279-7299` D-191 · `foundations/invariants.md:1048-1057` save-version ·
  `foundations/invariants.md:1378-1387` previous-save-programs-reader ·
  `foundations/part_map.md:34-66` simulation
- **Model:** same — the reader at the trust boundary and its long test are judged together
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/saved-game.test.mjs` (the current document of version 12
  written first, refused on the base of the slice) · `npm test -- tests/sim/previous-programs.test.mjs` ·
  `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/sim/loop-record.test.mjs` ·
  `npm test -- tests/view/account-screen.test.mjs` · `npm run typecheck`
- **Depends on:** Slice 5

### Slice 7 — Ucisk and the refill of a pocket in the paragraph of an encounter and in the chronicle

- **Goal:** The paragraph of an encounter (D-147) gives a turn of Ucisk as an element of its own,
  „Mag …” in the words and with the health that question 2 of the planner's report settles (the
  orchestrator gives them in the handoff), and a turn whose piece was taken from the backpack into
  an empty pocket first gives the refill as an element before it, as the refill of the main hand
  is given today (D-457); the chronicle gives that refill as an entry of its own with no actor, at
  the minute the turns resolve (D-340). The refill's words stand in the row of the place `pocket`
  of `GEAR_PLACES` in `src/browser/sim/data/gear.ts` (`refill`), as question 1 of the planner's
  report settles them; `src/browser/view/combat-line.ts` and `src/browser/view/chronicle-entries.ts`
  read the words of the place the refilled action takes its piece from instead of the main hand's
  alone, and name no item or place by a literal (content-identifiers). New cases, written first, in
  `tests/view/gear-words.test.mjs` and `tests/view/combat-line.test.mjs` hold both; the cases of the
  main hand stay as they are.
- **Change:** `src/browser/sim/data/gear.ts` · `src/browser/view/combat-line.ts` ·
  `src/browser/view/chronicle-entries.ts` · `tests/view/gear-words.test.mjs` ·
  `tests/view/combat-line.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/coding-content-data.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:31-31` To do, item 3 ·
  `foundations/decisions.md:7074-7106` D-147 · `foundations/decisions.md:11595-11639` D-340 ·
  `foundations/decisions.md:12787-12799` D-457 · `foundations/decisions.md:7007-7035` D-144 ·
  `foundations/invariants.md:236-247` content-identifiers · `foundations/part_map.md:3-33`
  browser-view
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/gear-words.test.mjs` · `npm test -- tests/view/combat-line.test.mjs`
  (their new cases written first, failing on the base of the slice) ·
  `npm test -- tests/view/chronicle-entries.test.mjs` · `npm test -- tests/view/chronicle.test.mjs` ·
  `npm test -- tests/sim/rules.test.mjs` · `npm test -- tests/invariants/test_content_identifiers.py` ·
  `npm run typecheck`
- **Depends on:** Slice 4

### Slice 8 — The values of the numerical branches on the screen Postać

- **Goal:** `branchText` of `src/browser/view/character-skills.ts` writes a value of a numerical
  branch with the decimal comma where it has a fraction and with no trace of the computer's
  rounding — „Szybkie gojenie” reads „teraz 0,05 … → po kupnie 0,1 …” and „0,15”, never
  „0.15000000000000002” (To do, item 4; the styleguide's sentence on a number with a fraction in
  the sentence of a rule) — and gives Ucisk its price and no before-and-after values, as
  „Obchód”, „Czysty płomień” and „Zwiad” (D-199). New cases, written first, in
  `tests/view/character-skills.test.mjs` hold the words of the four branches of „Opatrywanie małych
  ran” at each rank, their descriptions from the data, and the values of the existing branches as
  they read today.
- **Change:** `src/browser/view/character-skills.ts` · `tests/view/character-skills.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/data/skills.ts` · `src/browser/view/character-trees.tsx` ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:32-32` To do, item 4 ·
  `foundations/decisions.md:7433-7462` D-199 · `foundations/decisions.md:7549-7575` D-379 ·
  `foundations/part_map.md:3-33` browser-view
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/character-skills.test.mjs` (its new cases written first,
  failing on the base of the slice) · `npm test -- tests/view/character-screen.test.mjs` ·
  `npm test -- tests/view/knowledge-screen.test.mjs` · `npm run typecheck`
- **Depends on:** Slice 4 · D-199

### Slice 9 — Ucisk in the pick of the program editor

- **Goal:** The rule panel shows Ucisk as the rules of the game give it to every action, which the
  view already computes from the data: in the group „Żywność i walka” after „Odskocz” and before
  „Załóż” (D-290), with the icon of „Opatrz” (row 10), no price at its cell and the price at its
  target, „Opatrunek (1 opatrunek)”, and at the chosen action, „Ucisk — Opatrunek (1 opatrunek)”
  (D-363), the time „tura” (D-293), greyed „gałąź niewykupiona” during a map run of a character
  without the branch and „wybierzesz w przejściu postaci, która ją kupiła” with none (D-289), a
  rule of it amber „tylko w walce” outside the minutes of an attack (D-309). A new
  `tests/view/pressure-pick.test.mjs` holds each of these; where the view does not give one, the
  slice reports it rather than changing a view module, which this slice does not list. The test of
  `tests/view/program-editor.test.mjs` that lists the cells of the groups (lines 1068 to 1118 at the
  plan's base) holds Ucisk in its place and passes again.
- **Change:** `tests/view/pressure-pick.test.mjs` · `tests/view/program-editor.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `tests/view/program-editor.test.mjs:1-80` imports and helpers ·
  `tests/view/program-editor.test.mjs:1068-1118` the cells of the groups ·
  `src/browser/view/program-editor.ts:700-911` the pick of actions, time and price ·
  `src/browser/view/item-target-pick.ts` ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:31-31` To do, item 3 ·
  `foundations/decisions.md:9968-9996` D-290 · `foundations/decisions.md:10309-10323` D-363 ·
  `foundations/decisions.md:9635-9665` D-293 · `foundations/decisions.md:9916-9967` D-289 ·
  `foundations/decisions.md:10206-10245` D-309 · `foundations/decisions.md:7377-7400` D-196 ·
  `foundations/part_map.md:3-33` browser-view
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/pressure-pick.test.mjs` · `npm test -- tests/view/program-editor.test.mjs` ·
  `npm test -- tests/view/item-verb-panel.test.mjs` · `npm test -- tests/view/gear-rule-panel.test.mjs`
- **Depends on:** Slice 4 · D-290 · D-363

### Slice 10 — The lists of actions of the rule editor, the icons and the gear editor hold Ucisk

- **Goal:** The tests of the view that list the actions of the group „Żywność i walka” or the icon of
  each action hold Ucisk in its place, after „Odskocz” and before „Załóż” (D-290), with the icon
  `bandage-roll` (row 10): the test of `tests/view/rule-editor.test.mjs` at lines 1700 to 1765 of the
  plan's base, the list of `tests/view/icons.test.mjs` at lines 134 to 276 and the test of
  `tests/view/gear-editor.test.mjs` at lines 144 to 160. Only those expectations change, and the
  three files pass again.
- **Change:** `tests/view/rule-editor.test.mjs` · `tests/view/icons.test.mjs` ·
  `tests/view/gear-editor.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `tests/view/rule-editor.test.mjs:1-60` imports and helpers ·
  `tests/view/rule-editor.test.mjs:1700-1765` the cells of the groups ·
  `src/browser/sim/data/actions.ts` ·
  `foundations/decisions.md:9968-9996` D-290 · `foundations/part_map.md:3-33` browser-view
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/rule-editor.test.mjs` · `npm test -- tests/view/icons.test.mjs` ·
  `npm test -- tests/view/gear-editor.test.mjs` · `npm test -- tests/invariants/test_icon_credits.py`
- **Depends on:** Slice 4 · D-290 · Row 10

### Slice 11 — The reference program that brings bandages and tends with them

- **Goal:** `tests/sim/reference-programs.mjs` ends with a new reference program, after
  `forestSettledVariantExample`, last in `REFERENCE_PROGRAMS`, so that the labels of the older
  programs do not move (D-427, D-428): it takes bandages from the chest with its take list, standing
  before what gives way to them within the cap of 15 pieces spent in the order of the list
  (`src/browser/sim/trip.ts`, „One shared budget, spent in list order”), tends itself with them
  outside combat with „Opatrz” and holds in its group of combat a rule of Ucisk before the strike;
  its comment says that it depends on the branch Ucisk. The program is written once, with sensible
  thresholds of health, from the groups of the best program of the map with the wolf pack (P10,
  `forestDeepBest`); a rule is changed only where the trace of a run shows that it plainly does not
  work, and no threshold is chosen for the result (To do, item 5). Short helpers for „Opatrz” and
  Ucisk join the notation of the file. `tests/balance/agreement.test.mjs` gains a case of that
  program on `forestPack` with Ucisk bought and a bandage in a pocket, which ends alike through the
  game and through the instrument (instrument-game-agreement). Both copies of the balance skill,
  `.claude/skills/loop2-balance/SKILL.md` and `.agents/skills/loop2-balance/SKILL.md`, byte for byte
  alike, give the new number of reference programs where they give 23.
- **Change:** `tests/sim/reference-programs.mjs` · `tests/balance/agreement.test.mjs` ·
  `.claude/skills/loop2-balance/SKILL.md` · `.agents/skills/loop2-balance/SKILL.md`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `src/browser/sim/trip.ts` ·
  `src/browser/sim/data/maps.ts:140-161` forestPack ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:33-39` To do, items 5 to 7 ·
  `.runs/task-cycles/rana-i-opatrunek/task_frozen.md:88-94` Questions to settle, Q10 ·
  `foundations/decisions.md:12508-12522` D-427 · `foundations/decisions.md:12523-12539` D-428 ·
  `foundations/decisions.md:12540-12554` D-429 · `foundations/decisions.md:6176-6194` D-438 ·
  `foundations/decisions.md:7007-7035` D-144 · `foundations/decisions.md:7036-7055` D-145 ·
  `foundations/decisions.md:8866-8886` D-187 · `foundations/invariants.md:1438-1447`
  instrument-game-agreement · `foundations/glossary.md:302-307` wall ·
  `foundations/part_map.md:34-66` simulation · `foundations/part_map.md:128-159` balance-tools,
  agent-workflow
- **Model:** same — the program is written once by judgment and read in a trace, not tuned
- **Risk:** none
- **Checks:** `npm test -- tests/balance/agreement.test.mjs` (its new case written first, failing on
  the base of the slice) · `npm test -- tests/balance/cli.test.mjs` ·
  `npm test -- tests/balance/check-map.test.mjs` · `npm test -- tests/balance/progression.test.mjs` ·
  `npm test -- tests/sim/judging.test.mjs` · `npm test -- tests/agent_workflow/test_loop2_balance_skill.py` ·
  `npm run --silent balance -- programs` (the new program is the last label) ·
  `npm run --silent balance -- trace --map forestPack --program <its identifier> --chest <its take list> --ranks pressure=1 --gear pocket1=bandage --seeds 1`
  (each rule of bandages acts where its condition holds) ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 6 · Slice 7 · Slice 8 · Slice 9 · Slice 10

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Outcome: the healing tree with Ucisk, and the wolf pack a wall that asks for the bandage, solvable without it | Slices 1–11; the measurement of the cycle's end (Choices) |
| To do 1 — the ninth tree, grown by three pairs, its curve and branches, last in the data, the predispositions and the screen | Slices 1, 2, 3, 4, 8; D-379; Row 5 |
| To do 2 — the tree among the mage's predispositions, so the mage keeps „Wytwórz” and „Opatrz” | Slice 2; D-120 |
| To do 3 — Ucisk: the action of combat opened by the branch, targets with healing, pocket and refill, healing as „Opatrz”, refusals, price, time, signs, icon, place in the pick; „Opatrz” stays out of combat; the bandage fits a pocket (true at the base, `src/browser/sim/data/items.ts:111`) | Slices 4, 5, 7, 9, 10; D-144; D-150; D-380; D-363; D-290; Row 10 |
| To do 4 — the screen Postać shows the tree and Ucisk without values, the descriptions, the decimal comma with no rounding trace | Slices 2, 4, 8; D-199 |
| To do 5 — the reference program at the end of the file, and the one check by the instrument with the three-row table and the order of the maps | Slice 11; the measurement of the cycle's end (Choices) |
| To do 6 — the pack still solvable with what the maps before it gave; a run without bandage, tending or Ucisk ends as before | Slice 3 (unchanged expectations at rank 0); the measurement of the cycle's end, base against branch (Choices) |
| To do 7 — no number of the pack or of the wolf changes, no mark of a wall | No slice changes `src/browser/sim/data/maps.ts`, `src/browser/sim/data/creatures.ts` or `balance/overlays/` |
| To do 8 — the numbers of the bandage stay | No slice changes the row of the bandage in `src/browser/sim/data/items.ts` |
| To do 9 — the version of the saved game's shape rises by one | Slice 6 |
| To do 10 — the foundation's changes and the rows of Settlements | Foundation entries |
| Settlements row 1 | D-144; Slice 4 |
| Settlements row 2 | D-144; Slices 4, 7 |
| Settlements row 3 | D-144; Slices 3, 4 |
| Settlements row 4 | D-150; Slice 4 |
| Settlements row 5 | Row 5; Slices 2, 4 (test `tests/sim/tending.test.mjs`) |
| Settlements row 6 | D-379; Slices 2, 4 |
| Settlements row 7 | D-145; Slice 3 |
| Settlements row 8 | D-387; Slice 3 |
| Settlements row 9 | D-290; Slices 4, 5, 9, 10 |
| Settlements row 10 | Row 10; Slices 4, 10 |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The skills' data name pairs of verb and target (`grownBy`, an action with an optional item), as the earlier game's data do, and the eight skills move to it first, with no change of behaviour (Slice 1) | Keep `actions` and add a list of item targets beside it for the new skill alone | One more change of the readers of the field; the shape test of the data is rewritten again |
| The repertoire judges an item action by its pair: open where a skill among the predispositions grows it or no skill does; the kind stays in the list of actions where one of its pairs is open | Judge the kind alone | With one archetype nothing differs today; the second archetype would see „Wytwórz — Opatrunek” open without the tree |
| Two new kinds of branch effect that carry an amount and no actions, `healing` and `healthRegain`; „Wprawna dłoń” uses the existing `duration` on `tend`, Ucisk the existing `action` | Kinds with a list of actions, or reading the branches by their identifiers | A renaming of two kinds in the data and in `skillBonus` |
| „Szybkie gojenie” enters `bodyMinute` as an argument of the health regained, its default the data's number, the caller adding the bonus; `body.ts` stays free of skills | `bodyMinute` reads the character's skills | One more parameter to move if the body ever reads more of the character |
| One function gives the health a healing item gives back to a character, used by „Opatrz” and by Ucisk | Two computations | The two could drift; with one there is nothing to drift |
| Ucisk is the action `pressure` with targets from `healing`, a combat effect of a new form that heals by its target and names the place of its piece, the pocket; the piece rule of a combat action reads the place its data name, the strike keeping the main hand | A separate path for the pocket in `combat.ts`, or Ucisk taking straight from the backpack when the pockets are empty | A refill that leaves no entry, or the strike's rule bent for a second place |
| Ucisk takes from the first pocket that holds its item; with none, a piece goes from the backpack into the first empty pocket and is used up in the same turn, with the refill marked (D-457) | Using the backpack's piece with no refill | One chronicle entry more or less per such turn |
| The refusal „zdrowie pełne” of Ucisk reads the health of the combat turn the judge is given | The body's health at the attack | Ucisk would be judged on a health that no longer stands after the first blow |
| The pair of Ucisk is written with no item, covering every target with healing | The pair with the bandage alone | A second healing item would grow no skill through Ucisk until the data list it |
| Identifiers: skill `tending`, branches `strongerRoll`, `deftHand`, `quickHealing`, `pressure`, action `pressure`, effect kinds `healing`, `healthRegain`; test files `tests/sim/tending.test.mjs`, `tests/sim/pressure.test.mjs`, `tests/view/pressure-pick.test.mjs` | Other names | A rename in data and tests; `--ranks pressure=1` of the measurement follows the branch's name |
| Ucisk stands between „Odskocz” and „Załóż”: „za Odskocz” and „at the end of the actions of combat” of question Q7 agree there, „Załóż” being no action of combat | After „Załóż” | One move in the data and in three tests |
| The version rises in a slice of its own after Ucisk exists, and Slice 4 changes only what makes the reader admit a turn of Ucisk | One slice for the action and the version | Two reviews of the boundary instead of one larger slice that would not fit one agent |
| No slice moves code out first: the rule of size of D-425, run on the base, reports 0 functions and files over a threshold in 382 files (`tests/quality/eslint-size-rules.mjs`); `saved-game.ts` is D-425's own exception | A move slice before the slices that add to `run.ts` and `program.ts` | A slice that pushes a file over 800 lines fails `tests/quality/test_function_and_file_size.py`, which each code slice runs |
| The three-row table needs no change of the instrument: `sweep` takes `--chest`, `--ranks` and `--gear` with a pocket (`balance/cli.mjs`), and the cycle's end measures, on `forestPack` and on `forestDeep`, on seeds 1-500: the best reference program without bandage and the new program, both with a new character's skills, and the new program with `--ranks pressure=1 --gear pocket1=bandage`, each with the chest its take list asks; the order of the two maps with one character by `.runs/k9-measure/same-character.mjs` copied into the worktree's `.runs/k9-measure/` and the game built there, or by `progression` once task 4 is merged; and, for To do 6, a `sweep` of each reference program that neither crafts, tends nor presses, on `forestPack`, on the base and on the branch, the two alike | A new flag of `progression` or a mode of its own for the table | A table the orchestrator assembles by hand from sweeps, which a mode would print in one call |
| The view's editor already computes the cell, time, price and reason of an action from the data, so Slices 9 and 10 change only tests | Changing the editor's modules | A gap the new test finds becomes a report of Slice 9 and a plan edit |
