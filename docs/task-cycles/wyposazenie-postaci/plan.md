# Plan — loop2: wyposażenie postaci osobne od plecaka, widoczne na ekranie Postać, z którego cios patykiem bierze patyk

- Task: docs/task-cycles/wyposazenie-postaci/task_frozen.md
- Spec: none
- Base: f2263d0502395ea1a3113b558e5258c256589676

## Foundation entries

The agent of the foundation entries writes every row below before slice 1, through the foundation
step (`.the-way/task-cycle/skill/foundation_step.md`). Rows 9 and 32 of *Settlements to record* go to
the styleguide (Slice 11) and rows 17 and 25 to the game's data (Slices 1, 4 and 7), so none of the
four is an entry here.

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| F1 — new decision "Where does an action take the piece it uses from?" | decision, new | projected entry of the approved definition (task, *Decisions in play*, line 250) | Slices 4, 7, 8 |
| F2 — glossary term `gear` | glossary term, new | projected entry of the approved definition (task, line 251) | every slice |
| F3 — D-23: the sentence on the piece an action uses narrowed by the gear | decision, changed | *Decisions in play* (D-23); "Touched parts and decisions" (line 252) | Slices 4, 7 |
| F4 — D-144: „Uderz — patyk” needs the stick in the main hand, takes it from the backpack into an empty main hand in the same turn; „Załóż” usable in combat | decision, changed | *Decisions in play* (D-144) | Slices 4, 8 |
| F5 — D-145: the stick stays in the main hand after a strike, unchanged | decision, changed | *Decisions in play* (D-145) | Slice 4 |
| F6 — D-380: the reasons of „Uderz — patyk” and „Załóż — {rzecz}” | decision, changed | *Decisions in play* (D-380); row 24 | Slices 4, 7 |
| F7 — D-140: „Załóż” in combat and out of it | decision, changed | *Decisions in play* (D-140); row 20 | Slices 7, 8 |
| F8 — D-309: no „trwa walka” and no „tylko w walce” for „Załóż” | decision, changed | *Decisions in play* (D-309) | Slices 7, 8 |
| F9 — D-187: the map's caps leave the gear out | decision, changed | *Decisions in play* (D-187); row 4 | Slices 1, 3 |
| F10 — D-190: the gear taken only by a death with no use of the resurrection left, of a character with no practice too | decision, changed | *Decisions in play* (D-190); rows 2, 27 | Slice 3 |
| F11 — D-183: the gear no carried item, back with the character as it stood at the end | decision, changed | *Decisions in play* (D-183); row 26 | Slice 3 |
| F12 — D-439: the judging runs with the character's gear and takes nothing of it | decision, changed | *Decisions in play* (D-439); row 5 | Slice 3 |
| F13 — D-440: a gear change the player makes on the screen Postać erases the character's judgings, one it comes back with from a map run does not | decision, changed | *Decisions in play* (D-440); row 6 | Slice 10 |
| F14 — D-446: the facts at the top of the left area, no longer beside the figure | decision, changed | *Decisions in play* (D-446); row 30 | Slices 11, 18 |
| F15 — D-445: the figure in the section „Wyposażenie”, twice the band's size | decision, changed | *Decisions in play* (D-445); row 29 | Slices 11, 18 |
| F16 — D-287: the tiles of the character of an unfinished manual map run and their sentence | decision, changed | *Decisions in play* (D-287); row 34 | Slices 2, 11, 19 |
| F17 — D-143: the first wolf attack brings „Załóż” and „Puste” | decision, changed | *Decisions in play* (D-143); row 22 | Slices 6, 7, 8 |
| F18 — D-290: „Załóż” at the end of „Żywność i walka”, „Puste” after „Energia natury” | decision, changed | *Decisions in play* (D-290); row 23 | Slices 6, 7, 13, 14 |
| F19 — D-311: the line of gear under the backpack line | decision, changed | *Decisions in play* (D-311); row 7 | Slices 11, 15 |
| F20 — D-44: the tile of a gear slot among the shared controls | decision, changed | *Decisions in play* (D-44) | Slices 11, 16, 17 |
| F21 — the gear belongs to the character, put on from the chest, outside the trip plan | decision, new | row 1 | Slices 1, 2, 3 |
| F22 — the player changes the gear outside an unfinished manual map run of the character, in an earning loop from its next map run | decision, new | row 3 | Slices 2, 19, 20 |
| F23 — a slot nothing fits stands empty on the screen Postać | decision, new | row 8 | Slices 11, 19 |
| F24 — the gear is no backpack | decision, new | row 10 | Slices 1, 4, 7 |
| F25 — eight slots of one piece each; the stick fits the main hand, the bandage a pocket; the strike takes from the main hand alone | decision, new | row 16 | Slices 1, 4 |
| F26 — an empty slot refilled from the backpack only at the use of an action that takes from it | decision, new | row 18 | Slice 4 |
| F27 — the action „Załóż — {rzecz}” | decision, new | row 19 | Slice 7 |
| F28 — the condition „Puste — {miejsce}” | decision, new | row 21 | Slices 6, 13, 14 |
| F29 — the slot by slot merge of a loop's gear changed by the player and by the map run | decision, new | row 28 | Slice 3 |
| F30 — the gear changed through a tile and the pick under it | decision, new | row 31 | Slices 11, 20 |
| F31 — the tiles of a character in an earning loop show the next map run's gear, with its sentence | decision, new | row 33 | Slices 11, 19 |
| F32 — D-441: the value of a remembered judging holds the character's count of the gear changes the player made, read against the game state, and the version of the stored form rises | decision, changed, the cycle's | row 6 (F13) and the way D-441 already makes a death and a change of a program erase a judging | Slices 1, 2, 10 |
| F33 — environment fact `game-icons-<file>-title` of the icon its writer picks on game-icons.net for „Załóż”: a sign of putting on or taking into the hand, unlike every icon of the other actions | environment fact, new, the cycle's | D-27, D-291 (each action one icon) | Slices 7, 9 |
| F34 — invariant `icon-credits`: its *Rests on* gains F33 | invariant, changed, the cycle's | F33 | Slice 9 |

Each row of *Settlements to record* marked decision is an entry of its own question and number unless
the writer's search of the whole foundation finds it already stated (task, *To do* 14). F32, F33 and
F34 are the cycle's: the request puts them before the human.

## Slices

### Slice 1 — Gear in the game state and its saved document

- **Goal:** The game state holds the gear, its data and its saved document, as the plan's *Choices* settle the shape. `src/browser/sim/data/gear.ts` (new) holds the eight slots in their order — „Ręka główna”, „Druga ręka”, „Głowa”, „Tułów”, „Nogi” and three pockets of the belt — each slot of one place (main hand, second hand, head, torso, legs, pocket; the three pockets share the place „Kieszeń”) and holding one piece, the number of pockets one number of the data, and the words of each place's part of the line of the screen of a map run (Slice 15): „w ręku” for the main hand, „pod ręką” for the pockets. The row of an item in `src/browser/sim/data/items.ts` names the place it fits: the stick the main hand, the bandage a pocket (row 17); nothing fits the other places. `src/browser/sim/types.ts`: a gear maps each slot to the item it holds or to none; a character of the team holds the gear the game keeps at it outside a map run (for a character in an earning loop the gear of its next map run), the slots the player changed on the screen Postać since the start of the map run going on of its earning loop (none for any other character), and the count of the gear changes the player made on the screen Postać, from 0 (F32); the character of a map run holds the gear of that map run. A new character has an empty gear, no changed slot and the count 0 (`src/browser/sim/character.ts`, `createCharacter`). A manual map run starts with the character's gear, whole whatever the map's entry cap (F9, row 4), outside the trip plan and the chest (`startRun`); `newMapRun` in `src/browser/sim/run.ts` takes the gear a map run starts with as a parameter after the backpack, empty where none is given, so that the earning loop, the judging and the balance instrument run as before until Slices 3 and 21 give them the character's gear. `src/browser/sim/saved-game.ts` writes the new fields and reads them strictly — each slot present and no other, each held item an item of the data that fits its slot's place, the changed slots a list of slots each once and only at a character with an earning loop, the count a safe integer from 0, the gear of a map run's character read as a character's — and `SAVED_GAME_VERSION` rises to 11. The backpack's cap, „Zapas poniżej”, the backpack line and every action that takes pieces from the backpack read the backpack alone (row 10, F24). Tests: `tests/sim/saved-game.test.mjs` — the document of the current version rewritten at version 11 with a character holding a stick in the main hand and a bandage in a pocket and a character of an earning loop with a changed slot, the document of version 10 kept and refused as another version, crafted documents of version 11 refused whole as shape (a piece in a slot it does not fit, an item the data lack, a slot missing or one more, a changed slot at a character with no earning loop or named twice, a count negative, fractional or no number, a gear of another type), none of them throwing; `tests/sim/gear-state.test.mjs` (new, listed in `stryker.config.json`) — the data's eight slots and their fits, the new character's empty gear, a manual map run entering a map with an entry cap of 0 with the character's gear whole and the chest unchanged by it, and the stick in the main hand counted neither by „Zapas poniżej” nor by the backpack's cap, burnt by no „Zasil — ognisko” and lit by no „Zapal — patyk”. `src/browser/sim/game.ts` stands near the 800 lines D-425 allows a file: keep what is added there to the calls, the gear's own functions in `src/browser/sim/character.ts` or the data.
- **Change:** `tests/sim/saved-game.test.mjs` · `src/browser/sim/data/gear.ts` · `src/browser/sim/data/items.ts` ·
  `src/browser/sim/types.ts` · `src/browser/sim/character.ts` · `src/browser/sim/game.ts` ·
  `src/browser/sim/run.ts` · `src/browser/sim/saved-game.ts` · `tests/sim/gear-state.test.mjs` ·
  `stryker.config.json`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:26-31` To do · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:58-58` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:125-135` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:198-203` Questions carried to cycle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:254-263` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:269-271` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/plan.md:602-618` Choices ·
  `foundations/part_map.md:34-66` simulation · `foundations/decisions.md:6689-6709` D-64 ·
  `foundations/decisions.md:8683-8698` D-179 · `foundations/decisions.md:8830-8844` D-187 ·
  `foundations/decisions.md:3918-3970` D-206 · `foundations/decisions.md:688-732` D-213 ·
  `foundations/decisions.md:4269-4287` D-386 · `foundations/decisions.md:854-872` D-425 ·
  `foundations/invariants.md:1048-1057` save-version · `foundations/invariants.md:978-987` trip-transfer ·
  `foundations/invariants.md:226-235` simulation-inputs · `foundations/invariants.md:214-225` simulation-isolation ·
  `foundations/invariants.md:538-547` character-team · `foundations/glossary.md:18-24` map run ·
  `foundations/glossary.md:223-228` earning loop · F2 · F9 · F21 · F24 · F25 · F32 ·
  `src/browser/sim/loop.ts:63-100` · `src/browser/sim/judging.ts:53-110` · `src/browser/sim/data/balance.ts` ·
  `tests/sim/saved-game.test.mjs:1-93` · `tests/sim/saved-game.test.mjs:740-1093` ·
  `tests/sim/saved-game.test.mjs:1399-1420` · `tests/sim/saved-game.test.mjs:2885-2910` ·
  `tests/sim/saved-game.test.mjs:3192-3251` ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/coding-content-data.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md`
- **Model:** strongest — it settles the shape of the gear that every later slice reads and the strict reading of a trust boundary.
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/gear-state.test.mjs` (written first, failing) · `npm test -- tests/sim/saved-game.test.mjs` ·
  `npm test -- tests/sim/team.test.mjs` · `npm test -- tests/sim/trip.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` · `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm test -- tests/quality/test_function_and_file_size.py` · `npm run typecheck`
- **Depends on:** F2 · F9 · F21 · F24 · F25 · F32

### Slice 2 — The player's acts on the gear

- **Goal:** `src/browser/sim/gear.ts` (new) holds the player's two acts on a character's gear, as functions of the simulation that give a `GameResult` and change nothing passed to them: putting a piece of an item from the chest on a slot it fits — the piece the slot held goes back to the chest; an item the chest lacks and an item that does not fit the slot are refused — and taking the piece of a slot off into the chest — refused on an empty slot and where the chest has no room, the reason „skrzynka pełna”. Both act on the gear the game keeps at the character (Slice 1): for a character at the camp at once; for a character in an earning loop on its next map run, the map run going on keeping its own gear (as D-200 has a bought rank act), each act marking its slot as changed by the player, a return to the same item included (*To do* 7, F22); for the character of the manual map run the game state holds — going, paused or ended until „Restart” or „Zakończ” — both are refused (F16, row 34). A piece put on in an earning loop leaves the chest at once, and one put on there and taken off before the end of the map run returns to it at once. Each act raises the character's count of gear changes by one (F32, read by Slice 10). The module also gives, for a character's slot, what the pick of the screen Postać shows (Slice 20): the items of the chest that fit the slot with the pieces the chest holds of each, and whether „Zdejmij” can act and, where not, its reason. Tests in `tests/sim/gear-acts.test.mjs` (new, listed in `stryker.config.json`), each act and each refusal, at the camp, in an earning loop and beside a manual map run of that character and of another.
- **Change:** `src/browser/sim/gear.ts` · `tests/sim/gear-acts.test.mjs` · `stryker.config.json`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:29-29` To do · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:41-45` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:87-91` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:262-262` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:285-288` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/plan.md:602-618` Choices ·
  `foundations/part_map.md:34-66` simulation · `foundations/decisions.md:7442-7463` D-200 ·
  `foundations/decisions.md:10710-10753` D-287 · `foundations/decisions.md:8660-8682` D-50 ·
  `foundations/decisions.md:8775-8789` D-184 · `foundations/decisions.md:8966-9024` D-241 ·
  `foundations/invariants.md:226-235` simulation-inputs · `foundations/invariants.md:214-225` simulation-isolation ·
  `foundations/glossary.md:93-98` at the camp · `foundations/glossary.md:136-141` manual map run ·
  `foundations/glossary.md:223-228` earning loop · F2 · F16 · F21 · F22 · F32 ·
  `src/browser/sim/types.ts` · `src/browser/sim/skills.ts` · `src/browser/sim/trip.ts` ·
  `src/browser/sim/data/balance.ts` · `src/browser/sim/data/items.ts` ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/gear-acts.test.mjs` (written first, failing) ·
  `npm test -- tests/invariants/test_simulation_inputs.py` · `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm run typecheck`
- **Depends on:** Slice 1 · F16 · F22 · F32

### Slice 3 — The gear at the start and the end of each map run

- **Goal:** Every map run starts with the character's gear and gives it back at its end, by the functions of `src/browser/sim/gear.ts` (Slice 2), so that `src/browser/sim/game.ts`, near the 800 lines D-425 allows, grows only by their calls. Starts: each map run of an earning loop starts with the gear the game keeps at the character (`beginRun` in `src/browser/sim/loop.ts`), and the start of an earning loop clears the character's changed slots; each of the twelve runs of a judging starts with that gear and takes nothing of it or of the chest (`judgeOnSeeds` in `src/browser/sim/judging.ts`; F12, row 5, *To do* 9) — for the character of a manual map run the gear it entered with, for one in an earning loop the gear of its next map run. Ends of a manual map run: at the completion, in its game minute together with the deposit to the chest and the practice, the map run's gear becomes the character's; at „Zakończ” and „Restart” before a completion, at that act; at a death with a use of the resurrection, the one that spends the last use included, when `settleDeath` settles it (rows 2, 26). A death with no use of the resurrection left takes the gear, also of a character with no practice, whose death takes nothing else but the backpack and spends no use (rows 2, 27, F10): `teamAfterDeath` decides it by the uses at the moment of the settlement, and a death settled once never settles again (`death-settled-once`). Ends of a map run of an earning loop (`takeEnd` and `stopLoop`, in the open game and in the catch-up alike): slot by slot, a slot the player changed keeps the player's choice and the piece the map run left there goes to the chest, and is lost where the chest has no room, as loot beyond its free room is; any other slot takes what the map run left; a death with no use left takes the map run's gear, a slot the player changed keeping the player's choice; the changed slots are cleared (row 28, F29, *To do* 7). The gear comes back whole, beyond the map's exit cap and outside the frozen bring list, and a piece the map run moved from the gear into the backpack shares the backpack's fate (row 26, F11, F9); `trip-transfer` and `trip-run-end` hold as they stand. Tests in `tests/sim/gear-transfer.test.mjs` (new, listed in `stryker.config.json`): each end above, the catch-up giving the same character and chest as the game run without a break (`catch-up-state`), and the judging leaving the gear and the chest as they were.
- **Change:** `src/browser/sim/gear.ts` · `src/browser/sim/game.ts` · `src/browser/sim/loop.ts` · `src/browser/sim/judging.ts` ·
  `tests/sim/gear-transfer.test.mjs` · `stryker.config.json`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:29-29` To do · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:40-47` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:81-86` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:141-143` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:169-173` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:258-264` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:280-282` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/plan.md:602-618` Choices ·
  `foundations/part_map.md:34-66` simulation · `foundations/decisions.md:6415-6447` D-190 ·
  `foundations/decisions.md:8762-8774` D-183 · `foundations/decisions.md:8830-8844` D-187 ·
  `foundations/decisions.md:8683-8698` D-179 · `foundations/decisions.md:8865-8885` D-189 ·
  `foundations/decisions.md:8966-9024` D-241 · `foundations/decisions.md:9164-9201` D-245 ·
  `foundations/decisions.md:6594-6631` D-221 · `foundations/decisions.md:12484-12510` D-439 ·
  `foundations/decisions.md:8935-8965` D-240 · `foundations/decisions.md:854-872` D-425 ·
  `foundations/invariants.md:978-987` trip-transfer · `foundations/invariants.md:988-997` trip-run-end ·
  `foundations/invariants.md:1078-1087` death-settled-once · `foundations/invariants.md:1148-1157` catch-up-state ·
  `foundations/invariants.md:1068-1077` resurrection-renewal · `foundations/invariants.md:1428-1437` function-and-file-size ·
  `foundations/glossary.md:142-147` completion · `foundations/glossary.md:211-216` resurrection ·
  `foundations/glossary.md:308-313` judging · F9 · F10 · F11 · F12 · F21 · F29 ·
  `src/browser/sim/types.ts` · `src/browser/sim/trip.ts` · `src/browser/sim/run.ts:385-450` ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md`
- **Model:** strongest — every end of a map run, the settling of a death, the catch-up and the merge of an earning loop meet here, and a wrong merge loses a piece silently.
- **Risk:** none
- **Checks:** `npm test -- tests/sim/gear-transfer.test.mjs` (written first, failing) · `npm test -- tests/sim/death.test.mjs` ·
  `npm test -- tests/sim/loop.test.mjs` · `npm test -- tests/sim/catch-up.test.mjs` · `npm test -- tests/sim/completion.test.mjs` ·
  `npm test -- tests/sim/judging.test.mjs` · `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/quality/test_function_and_file_size.py` · `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm run typecheck`
- **Depends on:** Slice 2 · F9 · F10 · F11 · F12 · F29

### Slice 4 — The strike takes the stick from the main hand, and combat carries the gear and the backpack

- **Goal:** „Uderz — patyk” takes its stick from the main hand and from no other slot (row 16, F4, F25). Where the main hand is empty and the backpack holds a stick, the strike first takes one stick from the backpack into the main hand and strikes in the same turn, with no time of its own (row 18, F26). After a strike the stick stays in the main hand, unchanged (F5). With a stick neither in the main hand nor in the backpack the combat rule is passed over with „brakuje 1 × patyk” (row 24, F6); „tylko w walce” outside combat stays. An encounter keeps the character's gear and backpack from turn to turn: the conditions and the refusals of each turn read them as the turns before left them, `resolveCombat` gives them after the fight in its `CombatResult`, and the map run takes them when the turns resolve (`src/browser/sim/run.ts`, where the result of `resolveCombat` lands); an exchange marks a refill, so that the view shows it as an element of its own before the strike's (Slice 12, *To do* 3). The words of the refill, „bierze patyk z plecaka do ręki” (row 25), stand in the game's data, beside the place's words of Slice 1 in `src/browser/sim/data/gear.ts`. `src/browser/sim/saved-game.ts` reads the new fields of a combat result and the refill mark strictly — a backpack over the carrying capacity, gear that does not fit and a mark of no boolean refused as shape — and writes them; the version stays 11, and the document in `tests/sim/saved-game.test.mjs` is rewritten under the comment the saved-game guidelines ask for, since no saved game state of version 11 exists anywhere yet. A stick taken into the hand is taken by no action that takes pieces from the backpack (row 10). Tests in `tests/sim/gear-combat.test.mjs` (new, listed in `stryker.config.json`); the cases of `tests/sim/combat.test.mjs` whose stick now goes into the hand change by the rule "Changing an existing test", their reason being F4 and F5.
- **Change:** `tests/sim/saved-game.test.mjs` · `src/browser/sim/types.ts` · `src/browser/sim/combat.ts` · `src/browser/sim/program.ts` ·
  `src/browser/sim/run.ts` · `src/browser/sim/saved-game.ts` · `src/browser/sim/data/gear.ts` ·
  `tests/sim/gear-combat.test.mjs` · `tests/sim/combat.test.mjs` · `stryker.config.json`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:30-31` To do · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:33-33` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:37-37` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:138-138` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:258-259` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:270-272` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:278-279` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/plan.md:602-618` Choices ·
  `foundations/part_map.md:34-66` simulation · `foundations/decisions.md:6989-7011` D-144 ·
  `foundations/decisions.md:7012-7034` D-145 · `foundations/decisions.md:8332-8348` D-380 ·
  `foundations/decisions.md:6885-6924` D-140 · `foundations/decisions.md:8041-8084` D-23 ·
  `foundations/decisions.md:7053-7085` D-147 · `foundations/decisions.md:10199-10234` D-310 ·
  `foundations/invariants.md:248-263` program-rule-pick · `foundations/invariants.md:1048-1057` save-version ·
  `foundations/invariants.md:226-235` simulation-inputs · `foundations/glossary.md:174-179` combat turn ·
  F1 · F3 · F4 · F5 · F6 · F24 · F25 · F26 ·
  `tests/sim/saved-game.test.mjs:1-93` · `tests/sim/saved-game.test.mjs:740-1093` ·
  `tests/sim/saved-game.test.mjs:2885-2910` · `tests/sim/saved-game.test.mjs:3192-3251` ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/coding-content-data.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md`
- **Model:** strongest — it threads the state of an encounter through the turns that the pick, the conditions and the saved document all read.
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/gear-combat.test.mjs` (written first, failing) · `npm test -- tests/sim/combat.test.mjs` ·
  `npm test -- tests/sim/encounters.test.mjs` · `npm test -- tests/sim/saved-game.test.mjs` ·
  `npm test -- tests/sim/rule-signs.test.mjs` · `npm test -- tests/invariants/test_program_rule_pick.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` · `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm run typecheck`
- **Depends on:** Slice 3 · F1 · F3 · F4 · F5 · F6 · F26

### Slice 4b — The test lines that quote the changed sentences of D-144 and D-145 (added by the orchestrator in the plan review)

- **Goal:** Part B of the foundation entries changed the sentences of D-144 („Uderz — patyk” needs the stick in the main hand and takes it from the backpack into an empty hand in the same turn) and of D-145 (the stick stays in the main hand after a strike), and `python -B .the-way/elements/common/foundation_check.py` now reports a decision-citation line of a test that quotes a sentence that no longer stands, in the files named here and in two of Slice 4's (`tests/sim/combat.test.mjs` lines 44, 46, 72, 118, 139, which Slice 4 changes). This slice brings each such line in `tests/sim/data.test.mjs` (line 229), `tests/sim/encounters.test.mjs` (lines 373, 606, 797), `tests/sim/rule-signs.test.mjs` (line 390) and `tests/sim/skills.test.mjs` (lines 503, 545) to the sentence that now stands in `foundations/decisions.md`, by the rule "Changing an existing test" of `guidelines/testing.md`: where the test asserts what the old sentence said (a stick taken from the backpack and left there), it is changed to the new meaning with the reason D-144 or D-145; where it asserts what the new sentence also holds (the strike's result with the stick in the backpack, now taken into the hand first), only the quoted sentence changes. No production code changes. After this slice the foundation check reports no decision-citation line of D-144 or D-145; the lines of D-445 and D-446 in `tests/view/character-screen.test.mjs` (lines 400 and 134) remain until Slice 18.
- **Change:** `tests/sim/data.test.mjs` · `tests/sim/encounters.test.mjs` · `tests/sim/rule-signs.test.mjs` · `tests/sim/skills.test.mjs`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:30-31` To do · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:214-215` Decisions in play · `docs/task-cycles/wyposazenie-postaci/plan.md:612-628` Choices · `foundations/decisions.md:7014-7065` D-144 and D-145 · `foundations/decisions.md:12698-12712` D-451 · `foundations/decisions.md:12773-12802` D-456 and D-457 (ranges as the log stands after part B; find again by heading where it moved) · `tests/sim/data.test.mjs:220-262` · `tests/sim/encounters.test.mjs:360-410` · `tests/sim/encounters.test.mjs:598-622` · `tests/sim/encounters.test.mjs:695-892` · `tests/sim/rule-signs.test.mjs:380-422` · `tests/sim/skills.test.mjs:495-585` (each of these holds whole the tests whose citation line is changed) · `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/encounters.test.mjs` · `npm test -- tests/sim/rule-signs.test.mjs` · `npm test -- tests/sim/skills.test.mjs` · `python -B .the-way/elements/common/foundation_check.py` (its remaining errors are the two lines of `tests/view/character-screen.test.mjs`, until Slice 18)
- **Depends on:** Slice 4

### Slice 5 — The view's new condition and the scene's goal stay whole for a kind added later

- **Goal:** With no change of behaviour, `newCondition` in `src/browser/view/program-editor.ts` gives none, nothing to name, for a kind of condition its cases do not name, and `goalOf` in `src/browser/view/scene-picture.ts` lets the mage stay where it stands for a kind of action its cases do not name, so that Slices 6 and 7 add the condition „Puste” and the action „Załóż” to the simulation's closed lists with no change of a file of the view, whose compilation would otherwise stop at these two switches; Slices 12 and 13 give both kinds their own handling. Every condition and action of today keeps its behaviour, so the existing tests are the checks.
- **Change:** `src/browser/view/program-editor.ts` · `src/browser/view/scene-picture.ts`
- **Read:** `docs/task-cycles/wyposazenie-postaci/plan.md:602-618` Choices · `foundations/part_map.md:3-33` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/program-editor.test.mjs` · `npm test -- tests/view/scene-picture.test.mjs` ·
  `npm test -- tests/view/rule-editor.test.mjs` · `npm run typecheck`
- **Depends on:** Slice 4

### Slice 6 — The condition „Puste — {miejsce}” in the simulation

- **Goal:** The condition „Puste — {miejsce}” (row 21, F28) stands in the closed list of the types and of `src/browser/sim/data/conditions.ts`, in the section of the body after „Energia natury poniżej” (row 23, F18), revealed by the first wolf attack (row 22, F17). It holds where the place it names holds nothing, „Kieszeń” where at least one pocket is empty (*To do* 5); it names a place only by its kind, never a pocket's number or position (`program-world-reference`). Its targets are the places some item of the data fits, today the main hand and the pocket, a place gaining its target when an item starts to fit it (as D-443 gives the targets of an action), and the program check refuses any other place; a place lies in every repertoire. In combat it reads the gear as the turns before left it (Slice 4). `tests/sim/data.test.mjs` takes the new section's order and the new revelation. Leaves failing until a later slice: `tests/sim/discovery.test.mjs` (what the first wolf attack brings) until Slice 8, `tests/view/program-editor.test.mjs` (the sections of the pick) until Slice 13, and `tests/view/rule-editor.test.mjs` (the cells of the pick) until Slice 14. Tests in `tests/sim/gear-condition.test.mjs` (new, listed in `stryker.config.json`).
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/data/conditions.ts` · `src/browser/sim/program.ts` ·
  `src/browser/sim/programs.ts` · `src/browser/sim/understanding.ts` · `src/browser/sim/gear.ts` ·
  `tests/sim/data.test.mjs` · `tests/sim/gear-condition.test.mjs` · `stryker.config.json`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:36-38` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:145-145` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:275-277` Settlements to record ·
  `foundations/part_map.md:34-66` simulation · `foundations/decisions.md:8349-8367` D-443 ·
  `foundations/decisions.md:9926-9952` D-290 · `foundations/decisions.md:6968-6988` D-143 ·
  `foundations/decisions.md:8313-8331` D-376 · `foundations/decisions.md:8111-8141` D-26 ·
  `foundations/decisions.md:8260-8279` D-126 · `foundations/decisions.md:8280-8299` D-127 ·
  `foundations/invariants.md:386-396` program-world-reference · `foundations/invariants.md:364-374` program-closed-lists ·
  `foundations/invariants.md:248-263` program-rule-pick · `foundations/glossary.md:130-135` repertoire ·
  F17 · F18 · F28 ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/coding-content-data.md` ·
  `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/gear-condition.test.mjs` (written first, failing) · `npm test -- tests/sim/data.test.mjs` ·
  `npm test -- tests/sim/conditions.test.mjs` · `npm test -- tests/sim/program.test.mjs` · `npm test -- tests/sim/repertoire.test.mjs` ·
  `npm test -- tests/invariants/test_program_world_reference.py` · `npm test -- tests/invariants/test_program_closed_lists.py` ·
  `npm test -- tests/invariants/test_program_rule_pick.py` · `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm run typecheck`
- **Depends on:** Slice 5 · F17 · F18 · F28

### Slice 7 — The action „Załóż — {rzecz}” outside combat

- **Goal:** The action „Załóż — {rzecz}” (row 19, F27) stands in the closed list of the types and of `src/browser/sim/data/actions.ts`, one for every slot; its targets are the items whose row names a place (a property of the items' rows in `src/browser/sim/data/items.ts` that gives an action its targets, as D-443 gives them), today the stick and the bandage. At its end, as every action pays at its end so that an attack before it takes nothing (D-142), it takes one piece of its target from the backpack into the slot the item fits — into a pocket the first empty one — and puts the piece that slot held into the backpack, so the backpack never overflows. It lasts 1 game minute outside combat (row 20, F7); its row in the program editor shows „1 min” (D-293) and no price, since it uses up nothing (D-363); in the pick it stands at the end of „Żywność i walka” (row 23, F18), and the first wolf attack reveals it (row 22, F17). Its row in the data names its icon file, the one F33 records (Slice 9 adds the file), and its status, „Zakłada”, which „Teraz” and the chronicle write with its target (row 25, Slice 12). Its refusals (row 24, F6): „brakuje 1 × {rzecz}” where the backpack lacks the item, „już założone: {rzecz}” where the item's slot holds it already, „kieszenie pełne” where every pocket is full, the reason on the state of the slot before the one on the lack (D-380); for an item of a pocket only „kieszenie pełne”. It is not refused „tylko w walce” outside combat (F8); the data mark it as an action that can also be carried out in combat without being an action of combat, so that Slice 8 lets it act there and its time stays „1 min”. Its game minutes count as a kind of their own in the record of a manual map run (`MINUTE_KINDS` in `src/browser/sim/run-record.ts`). A rule with it lies in the repertoire where the Understanding holds its target, as for „Opatrz”. Leaves failing until a later slice: `tests/sim/saved-game.test.mjs` (the kinds of the record), `tests/sim/data.test.mjs` (the groups of D-290 and what the first wolf attack reveals) and `tests/sim/discovery.test.mjs` until Slice 8; `tests/view/icons.test.mjs` (the action's icon file) until Slice 9; `tests/view/program-editor.test.mjs` (the groups of the pick, failing since Slice 6) until Slice 13; `tests/view/rule-editor.test.mjs` (the groups of the pick, failing since Slice 6) until Slice 14. Tests in `tests/sim/gear-wear.test.mjs` (new, listed in `stryker.config.json`).
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/data/actions.ts` · `src/browser/sim/data/items.ts` ·
  `src/browser/sim/program.ts` · `src/browser/sim/run.ts` · `src/browser/sim/programs.ts` · `src/browser/sim/understanding.ts` ·
  `src/browser/sim/run-record.ts` · `tests/sim/gear-wear.test.mjs` · `stryker.config.json`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:32-35` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:38-39` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:139-140` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:144-146` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:273-279` Settlements to record ·
  `foundations/part_map.md:34-66` simulation · `foundations/decisions.md:8349-8367` D-443 ·
  `foundations/decisions.md:6944-6967` D-142 · `foundations/decisions.md:8332-8348` D-380 ·
  `foundations/decisions.md:6885-6924` D-140 · `foundations/decisions.md:10162-10198` D-309 ·
  `foundations/decisions.md:9593-9623` D-293 · `foundations/decisions.md:10262-10276` D-363 ·
  `foundations/decisions.md:9926-9952` D-290 · `foundations/decisions.md:9953-9986` D-291 ·
  `foundations/decisions.md:10199-10234` D-310 · `foundations/invariants.md:187-197` action-in-progress ·
  `foundations/invariants.md:364-374` program-closed-lists · `foundations/invariants.md:248-263` program-rule-pick ·
  F1 · F3 · F6 · F7 · F8 · F17 · F18 · F24 · F27 · F33 ·
  `src/browser/sim/action-targets.ts` · `src/browser/sim/combat.ts` ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/coding-content-data.md` ·
  `guidelines/testing.md`
- **Model:** same — a new action across the closed lists, the pick, the end of an action and the record of a map run.
- **Risk:** none
- **Checks:** `npm test -- tests/sim/gear-wear.test.mjs` (written first, failing) · `npm test -- tests/sim/actions.test.mjs` ·
  `npm test -- tests/sim/program.test.mjs` · `npm test -- tests/sim/repertoire.test.mjs` · `npm test -- tests/sim/run-record.test.mjs` ·
  `npm test -- tests/sim/action-targets.test.mjs` · `npm test -- tests/invariants/test_action_in_progress.py` ·
  `npm test -- tests/invariants/test_program_closed_lists.py` · `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm run typecheck`
- **Depends on:** Slice 6 · F6 · F7 · F8 · F27 · F33

### Slice 7b — The two tests of the first wolf attack's discovery in the file of encounters (added by the orchestrator after Slice 7's report)

- **Goal:** Slices 6 and 7 made the first wolf attack bring the condition „Puste” and the action „Załóż” into the Understanding (row 22, F17), and two tests of `tests/sim/encounters.test.mjs` that assert what that attack discovers fail on the base of this slice (they began to fail with Slice 6). This slice brings them to what D-143 now says (the first wolf attack brings the wolf, „Uderz — patyk”, „Kopnij”, „Odskocz”, „Zdrowie poniżej”, „Przeciwnik ma poniżej”, „Załóż” and „Puste”), by the rule "Changing an existing test" of `guidelines/testing.md`, the reason being D-143: the expected lists of the discovered actions and conditions gain the two new members in the order of the data; no other assertion changes. No production code changes. After it `tests/sim/encounters.test.mjs` passes.
- **Change:** `tests/sim/encounters.test.mjs`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:36-39` To do · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:237-237` Decisions in play · `foundations/decisions.md:7076-7090` D-143 · `tests/sim/encounters.test.mjs:440-570` · `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/encounters.test.mjs` · `npm test -- tests/sim/discovery.test.mjs` (it passes today; it must still pass)
- **Depends on:** Slice 7

### Slice 8 — „Załóż” in combat, the first wolf attack's discoveries and the saved document

- **Goal:** „Załóż” acts in a combat turn: it takes the character's turn, in which the wolf acts as always, and changes the gear and the backpack of the turn as outside combat, at once (row 20, F7, F4); the combat pick takes it, with the refusals of Slice 7. In the minutes of an attack its rule is not amber with „trwa walka” and can be the rule the first turn would choose, and outside them it is not amber with „tylko w walce” (F8, `rule-state-from-pick`). A turn's action may be it (`CombatCharacterAction`); `src/browser/sim/saved-game.ts` reads it as an action of a turn and reads the record's kinds with it, the version staying 11 and the document rewritten as in Slice 4. The first wolf attack brings „Załóż” and „Puste” into the Understanding (F17): `tests/sim/discovery.test.mjs` and `tests/sim/data.test.mjs` take them, and pass again, as `tests/sim/saved-game.test.mjs` does. The condition „Puste” checked before each turn sees the gear as the turn before left it (*To do* 5). Tests in `tests/sim/gear-combat-wear.test.mjs` (new, listed in `stryker.config.json`).
- **Change:** `tests/sim/saved-game.test.mjs` · `src/browser/sim/types.ts` · `src/browser/sim/combat.ts` · `src/browser/sim/program.ts` ·
  `src/browser/sim/saved-game.ts` · `tests/sim/discovery.test.mjs` · `tests/sim/data.test.mjs` ·
  `tests/sim/gear-combat-wear.test.mjs` · `stryker.config.json`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:35-35` To do · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:37-39` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:139-140` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:274-276` Settlements to record ·
  `foundations/part_map.md:34-66` simulation · `foundations/decisions.md:6885-6924` D-140 ·
  `foundations/decisions.md:10162-10198` D-309 · `foundations/decisions.md:6968-6988` D-143 ·
  `foundations/decisions.md:6989-7011` D-144 · `foundations/decisions.md:10199-10234` D-310 ·
  `foundations/invariants.md:1228-1237` rule-state-from-pick · `foundations/invariants.md:1048-1057` save-version ·
  `foundations/glossary.md:174-179` combat turn · `foundations/glossary.md:123-129` Understanding ·
  F4 · F7 · F8 · F17 · F27 · F28 ·
  `tests/sim/saved-game.test.mjs:1-93` · `tests/sim/saved-game.test.mjs:740-1093` · `tests/sim/saved-game.test.mjs:2885-2910` ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/coding-saved-game.md` ·
  `guidelines/testing.md`
- **Model:** same — it joins the combat, the signs of the rules and the saved document for one action.
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/gear-combat-wear.test.mjs` (written first, failing) · `npm test -- tests/sim/saved-game.test.mjs` ·
  `npm test -- tests/sim/discovery.test.mjs` · `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/rule-signs.test.mjs` ·
  `npm test -- tests/sim/encounters.test.mjs` · `npm test -- tests/quality/test_mutation_test_selection.py` · `npm run typecheck`
- **Depends on:** Slice 7 · F4 · F7 · F8 · F17

### Slice 9 — The icon of „Załóż”

- **Goal:** The icon file that F33 records, from the commit of game-icons/icons that `src/browser/view/credits.ts` names for the other icons (or from its page where that commit lacks it, as `wood-pile.svg` was taken), stands in `assets/icons/` changed as the other icon files are and holding nothing `icon-file-content` forbids; its credit stands in the section „Autorzy grafiki” among the actions' icons in the order of the data, with its title, author, page, licence and how the file differs from its source (`icon-credits`, F34); its author and title stand in the lists of `tests/invariants/test_icon_credits.py`. `tests/view/icons.test.mjs` passes again (failing since Slice 7), and so do the view tests that draw the credits and fail since Slice 7 with `credit-lines: no credit for the icon gloves` — `tests/view/account-screen.test.mjs` and `tests/view/end-window-game.test.mjs` are known; run every other test file of `tests/view/` that fails with that message and report it (the orchestrator's addition after Slice 7's report).
- **Change:** `assets/icons/*.svg` · `src/browser/view/credits.ts` · `tests/invariants/test_icon_credits.py` ·
  `tests/view/icons.test.mjs`
- **Read:** `foundations/part_map.md:3-33` browser-view · `foundations/decisions.md:4945-4999` D-27 ·
  `foundations/decisions.md:9953-9986` D-291 · `foundations/invariants.md:319-330` icon-file-content ·
  `foundations/invariants.md:331-342` icon-credits · F33 · F34 · `src/browser/sim/data/actions.ts` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** trust boundary — `assets/icons/**`
- **Checks:** `npm test -- tests/view/icons.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/end-window-game.test.mjs` · `npm test -- tests/invariants/test_icon_file_content.py` ·
  `npm test -- tests/invariants/test_icon_credits.py` · `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 8 · F33 · F34

### Slice 10 — A gear change the player makes erases the character's remembered judgings

- **Goal:** As F13 and F32 give: the value of a remembered judging holds, beside what it holds today, the count of gear changes the player made of its character in the game state the judging read (Slice 1, raised by the acts of Slice 2); a remembered judging stands beside „Program:” only while its character's count in the game state at hand equals the one stored; the opening removes the values whose count stands above that of their character in the loaded game, as it removes those above its generation number; the version of the stored form rises, and a value under a key of an earlier version is neither read, written nor removed, as version 1's. A change the character comes back with from a map run — a refill, „Załóż”, a use — and the death of a character with no practice that takes its gear raise no count, so erase nothing; a death that takes the practice erases as before (row 6, *To do* 9). The count is kept and compared by `src/browser/view/judging-cache.ts`, so the record of the simulation (`src/browser/sim/judging-record.ts`) stays as it is; `src/browser/view/maps-entry.ts` gives the cache the count where it stores a judging, if the cache cannot read it from the state it is given. Crafted stored values — the count missing, of another type, negative, fractional or beyond the safe integers — read as none, throw nothing and stay where they are (`judging-cache-reading`), as cases of `tests/view/judging-cache.test.mjs`; the rest in `tests/view/judging-cache-gear.test.mjs` (new).
- **Change:** `tests/view/judging-cache.test.mjs` · `src/browser/view/judging-cache.ts` · `src/browser/view/maps-entry.ts` ·
  `tests/view/judging-cache-gear.test.mjs`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:47-47` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:265-265` Settlements to record ·
  `foundations/part_map.md:3-33` browser-view · `foundations/decisions.md:12511-12551` D-440 ·
  `foundations/decisions.md:12552-12605` D-441 · `foundations/invariants.md:1468-1477` judging-cache-reading ·
  F13 · F32 · `tests/view/judging-cache.test.mjs:1-160` · `tests/view/judging-cache.test.mjs:845-900` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — the reading of a trust boundary changes its stored form against the state of the simulation.
- **Risk:** trust boundary — `src/browser/view/judging-cache.ts`
- **Checks:** `npm test -- tests/view/judging-cache-gear.test.mjs` (written first, failing) · `npm test -- tests/view/judging-cache.test.mjs` ·
  `npm test -- tests/view/judging-cache-record.test.mjs` · `npm test -- tests/view/judging-cache-page.test.mjs` ·
  `npm test -- tests/view/maps-record.test.mjs` · `npm run typecheck`
- **Depends on:** Slice 9 · Slice 2 · F13 · F32

### Slice 11 — The styleguide's rules for the gear

- **Goal:** By the method of `.the-way/product-guidelines/styleguide/SKILL.md` (reading a file it names when its step comes), `guidelines/styleguide-browser-view.md` gets: in the rule "The screen Postać" a part on the gear (rows 9 and 32, *To do* 10 and 11) — the section „Wyposażenie” under the frame of what the character does, headed as „Umiejętności”, in the phone layout above „Umiejętności”; the figure in the middle of the slots at twice the size of the band (F15), the name, the line of generation and archetype and the resurrection line at the top of the left area (F14); the tiles, each square, with the item's icon or the slot's pale name in a role whose meaning holds it, a chosen tile framed as a chosen pick cell; the pick under it in pick cells with its heading „{miejsce}: {rzecz}” or „{miejsce}: nic”, „Zdejmij” with no icon, a greyed cell with its reason; the sentences of an earning loop and of an unfinished manual map run (F31, F16); the touch target of the phone layout; the tile as a shared control (F20) — with its decisions in *Decision* (F14, F15, F16, F20, F23, F30, F31) and its good and bad examples, the points on the figure at the top (D-445) and on what stands beside it (D-446) changed with the layout, and the rule's good and bad example with them; in the rule "States of shared controls" the tile among the controls that depart from the list of states, with the states that do not apply and why (F20); in the rule "The body row of a map run" the line of gear under the backpack line (F19). No new role, token value or meaning of a role (rule "Each role in its meaning").
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `.the-way/product-guidelines/styleguide/SKILL.md` · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:41-57` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:104-111` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:157-168` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:258-259` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:266-268` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:283-288` Settlements to record ·
  `foundations/part_map.md:140-159` agent-workflow · `foundations/decisions.md:4881-4902` D-445 ·
  `foundations/decisions.md:4903-4922` D-446 · `foundations/decisions.md:4923-4940` D-447 ·
  `foundations/decisions.md:5110-5128` D-44 · `foundations/decisions.md:10710-10753` D-287 ·
  `foundations/decisions.md:5000-5014` D-38 · `foundations/decisions.md:5042-5062` D-40 ·
  F14 · F15 · F16 · F19 · F20 · F23 · F30 · F31 ·
  `guidelines/coding.md` · `guidelines/testing.md`
- **Model:** same — it words the look of a screen that every later slice of the view follows.
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` ·
  `rg -U "Wyposażenie" guidelines/styleguide-browser-view.md`
- **Depends on:** Slice 10 · F14 · F15 · F16 · F19 · F20 · F23 · F30 · F31

### Slice 12 — The words of the gear on the screen of a map run

- **Goal:** „Teraz” and the chronicle write „Zakłada {rzecz}” for „Załóż” (row 25), from its status in the data (Slice 7) and the name of its target; the paragraph of an encounter writes, where an exchange carries the refill mark (Slice 4), „Mag bierze patyk z plecaka do ręki” as an element of its own before the element of the strike (*To do* 3), and „Mag zakłada {rzecz}” for „Załóż” in a turn; the words come from the data. In the scene „Załóż” counts among the actions whose end takes pieces out of the backpack (`USES_BACKPACK` in `src/browser/view/scene-picture.ts`), so that the hit or miss of a gathering ending in the same reading is read right. Tests in `tests/view/gear-words.test.mjs` (new). The check of these words in a real browser is Slice 15's.
- **Change:** `src/browser/view/now-lines.ts` · `src/browser/view/chronicle-entries.ts` · `src/browser/view/combat-line.ts` ·
  `src/browser/view/scene-picture.ts` · `tests/view/gear-words.test.mjs`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:30-30` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:34-34` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:279-279` Settlements to record ·
  `foundations/part_map.md:3-33` browser-view · `foundations/decisions.md:7053-7085` D-147 ·
  `foundations/decisions.md:12362-12374` D-367 · `tests/view/combat-line.test.mjs` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/gear-words.test.mjs` (written first, failing) · `npm test -- tests/view/now-lines.test.mjs` ·
  `npm test -- tests/view/chronicle-entries.test.mjs` · `npm test -- tests/view/combat-line.test.mjs` ·
  `npm test -- tests/view/scene-picture.test.mjs` · `npm test -- tests/invariants/test_content_identifiers.py` · `npm run typecheck`
- **Depends on:** Slice 11

### Slice 13 — The program editor offers „Puste” and „Załóż”

- **Goal:** In `src/browser/view/program-editor.ts`: a new condition „Puste” names the first place its pick offers; the sentence of a rule reads „Puste — Ręka główna” or „Puste — Kieszeń”; the pick offers „Puste” once the Understanding holds it, among the conditions of the body after „Energia natury poniżej” (row 23, F18), its targets the places some item of the data fits (row 21, F28); „Załóż” stands at the end of „Żywność i walka”, its targets the items of the Understanding whose row names a place, as „Opatrz” has its targets, with „1 min” and no price (D-293, D-363). `tests/view/program-editor.test.mjs` takes the new section's and group's order and passes again (failing since Slice 6); the rest in `tests/view/gear-editor.test.mjs` (new). The check of the editor in a real browser is Slice 15's.
- **Change:** `tests/view/program-editor.test.mjs` · `src/browser/view/program-editor.ts` · `tests/view/gear-editor.test.mjs`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:34-38` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:273-277` Settlements to record ·
  `foundations/part_map.md:3-33` browser-view · `foundations/decisions.md:9926-9952` D-290 ·
  `foundations/decisions.md:9593-9623` D-293 · `foundations/decisions.md:10262-10276` D-363 ·
  `foundations/decisions.md:8349-8367` D-443 · F18 · F27 · F28 ·
  `tests/view/program-editor.test.mjs:1-60` · `tests/view/program-editor.test.mjs:1066-1182` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/gear-editor.test.mjs` (written first, failing) · `npm test -- tests/view/program-editor.test.mjs` ·
  `npm test -- tests/view/item-verb-panel.test.mjs` · `npm run typecheck`
- **Depends on:** Slice 12 · F18 · F28

### Slice 14 — The rule panel picks the place of „Puste” and the item of „Załóż”

- **Goal:** The window of a rule (`src/browser/view/rule-panel.tsx`, with `src/browser/view/item-target-pick.ts` where the pick of an item target lives) gives „Puste” the pick of its place — „Ręka główna” and „Kieszeń” — in pick cells, as „Zapas poniżej” has the pick of its item, and „Załóż” the pick of its item with no price; the keyboard moves among the cells as in every pick. `tests/view/rule-editor.test.mjs` takes the new group's and section's cells and passes again (failing since Slice 7); the rest in `tests/view/gear-rule-panel.test.mjs` (new). The check in a real browser is Slice 15's.
- **Change:** `tests/view/rule-editor.test.mjs` · `src/browser/view/rule-panel.tsx` · `src/browser/view/item-target-pick.ts` ·
  `tests/view/gear-rule-panel.test.mjs`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:34-38` To do ·
  `foundations/part_map.md:3-33` browser-view · `foundations/decisions.md:9874-9925` D-289 ·
  `foundations/decisions.md:9926-9952` D-290 · F18 · F28 ·
  `tests/view/rule-editor.test.mjs:1-60` · `tests/view/rule-editor.test.mjs:1564-1760` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/gear-rule-panel.test.mjs` (written first, failing) · `npm test -- tests/view/rule-editor.test.mjs` ·
  `npm test -- tests/view/item-verb-panel.test.mjs` · `npm test -- tests/view/rule-window.test.mjs` · `npm run typecheck`
- **Depends on:** Slice 13

### Slice 15 — The line of gear on the screen of a map run, and that screen checked in a browser

- **Goal:** Under the backpack line the world of the screen of a map run holds one line in the same small text and in the class of the lines under the backpack, so that no stylesheet changes (row 7, F19): the hand first, then the pockets — „Wyposażenie: patyk w ręku, 2 × opatrunek pod ręką”, „Wyposażenie: 2 × opatrunek pod ręką”, „Wyposażenie: patyk w ręku”, and „Wyposażenie: nic” for no gear — built from the gear of the map run's character with the words of the data (Slice 1) by a pure function in `src/browser/view/gear-lines.ts` (new) and drawn by `src/browser/view/world-area.tsx`; after the end, the gear of the stopped minute. Then the screen of a map run is checked in Chromium in both layouts as `.claude/skills/loop2-play/SKILL.md` gives (styleguide rule "A change is checked in both layouts"): the line of gear, „Teraz” with „Zakłada …”, the paragraph of an encounter with the refill (Slice 12), and the program editor of the copy with „Puste” and „Załóż” in its pick and in the window of a rule (Slices 13 and 14), at 1280 × 720 with no touch and at 360 px with touch, with nothing scrolling sideways, no text over its frame and no control under the touch target; a fault found there is fixed in the file that holds it and named in the report.
- **Change:** `tests/view/world-area.test.mjs` · `src/browser/view/world-area.tsx` · `src/browser/view/gear-lines.ts` ·
  `tests/view/gear-lines.test.mjs`
- **Read:** `.claude/skills/loop2-play/SKILL.md` · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:55-55` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:117-121` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:128-128` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:266-266` Settlements to record ·
  `foundations/part_map.md:3-33` browser-view · `foundations/decisions.md:10754-10911` D-311 · F19 ·
  `tests/view/world-area.test.mjs:1-60` · `tests/view/world-area.test.mjs:186-320` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/gear-lines.test.mjs` (written first, failing) · `npm test -- tests/view/world-area.test.mjs` ·
  `npm test -- tests/view/run-screen.test.mjs` · `npm test -- tests/invariants/test_content_identifiers.py` · `npm run typecheck`
- **Depends on:** Slice 14 · F19

### Slice 16 — The tile, a kind of the shared button

- **Goal:** `ReactButton` in `src/browser/view/controls/react-button.tsx` gets the kind of the tile of a gear slot (F20, *To do* 10): a square button showing either the icon of an item, drawn as a mask in the colour of the text beside it (D-43), with the item's name as its accessible name read by screen readers, or the pale name of the slot; selected in its group with the frame of a chosen pick cell (`selected`, `aria-pressed`); disabled. Its look stands in `src/browser/styles.css` alone (D-265), its target of touch at least `--touch-target-min` in the block of the phone layout that holds the shared controls' targets (rule "Everything is done by touch, and every control holds the touch target"); no new token, role or meaning, as the styleguide's rules of Slice 11 give. `tests/view/shared-controls.test.mjs` gets a case for each of its states (rule "Wspólna kontrolka w jednej postaci"). The check in a real browser is Slice 17's, on the kitchen-sink page.
- **Change:** `tests/view/shared-controls.test.mjs` · `src/browser/view/controls/react-button.tsx` · `src/browser/styles.css`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:54-54` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:159-159` Questions to settle ·
  `foundations/part_map.md:3-33` browser-view · `foundations/decisions.md:5110-5128` D-44 ·
  `foundations/decisions.md:4399-4446` D-265 · F20 ·
  `tests/view/shared-controls.test.mjs:1-68` · `tests/view/shared-controls.test.mjs:119-166` ·
  `tests/view/shared-controls.test.mjs:487-541` · `tests/view/shared-controls.test.mjs:705-800` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — orchestrator's addition in the plan review: the first control of a kind the styleguide asks to be departed from in its states, whose look no earlier control fixes; a cheaper executor failing it would cost a reset of the slice.
- **Risk:** none
- **Checks:** `npm test -- tests/view/shared-controls.test.mjs` (its new cases written first, failing) ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm run typecheck`
- **Depends on:** Slice 15 · F20

### Slice 17 — The tile on the kitchen-sink page

- **Goal:** The kitchen-sink page shows the tile of Slice 16 in its React form in each of its states — with an item's icon and with a slot's pale name, chosen and not, under the pointer, with focus and disabled — and the states that do not apply with their reason, as the rule "The kitchen-sink page" and the rule "States of shared controls" give, with made-up values and no game state (D-45, D-269); the page built with `npm run kitchen-sink` and the tile looked at there in Chromium in both layouts; nothing of the page enters what `npm run build` writes.
- **Change:** `src/browser/kitchen-sink/control-samples.tsx` · `src/browser/kitchen-sink/kitchen-sink.css`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:54-54` To do · `foundations/part_map.md:3-33` browser-view ·
  `foundations/decisions.md:5129-5143` D-45 · `foundations/decisions.md:4476-4508` D-269 ·
  `foundations/invariants.md:518-527` application-build-kitchen-sink · F20 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_application_build_kitchen_sink.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm run typecheck`
- **Depends on:** Slice 16

### Slice 18 — Postać: the figure goes into the section „Wyposażenie”, twice its size

- **Goal:** The left area of the screen Postać holds, under the frame of what the character does and from the creation of the character, a section „Wyposażenie” headed as „Umiejętności” is (row 9), in the phone layout above „Umiejętności”; the figure stands in it, twice the size it has in the picture band of Siedziba (F15, row 29) — the factor a constant of the scene's data in `src/browser/sim/data/scene.ts`, beside `CHARACTER_FIGURE` (*To do* 10) — with the rest of D-445 as it is: the same picture, beat and pose, no clearing, no control, hidden from readers of the screen. The name as the screen's heading, the line of generation and archetype and the resurrection line stand at the top of the left area, above the frame, no longer beside the figure (F14, row 30). The cases of `tests/view/character-screen.test.mjs` on the figure and the facts change by the rule "Changing an existing test", their reason being F14 and F15. The slots come in Slice 19; the check in a real browser is Slice 20's.
- **Change:** `tests/view/character-screen.test.mjs` · `src/browser/view/character-screen.tsx` · `src/browser/view/character-figure.tsx` ·
  `src/browser/character-screen.css` · `src/browser/sim/data/scene.ts`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:48-50` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:268-268` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:283-284` Settlements to record ·
  `foundations/part_map.md:3-33` browser-view · `foundations/decisions.md:4881-4902` D-445 ·
  `foundations/decisions.md:4903-4922` D-446 · `foundations/decisions.md:4923-4940` D-447 · F14 · F15 ·
  `tests/view/character-screen.test.mjs:1-140` (the orchestrator's change in the plan review: the line of the test that quotes D-446 stands at line 134) · `tests/view/character-screen.test.mjs:399-452` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/coding-content-data.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — orchestrator's addition in the plan review: the layout of the screen Postać changes (the figure moves, twice its size) and is judged by its look in a real browser.
- **Risk:** none
- **Checks:** `npm test -- tests/view/character-screen.test.mjs` (its changed cases written first, failing) ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm run typecheck`
- **Depends on:** Slice 17 · F14 · F15

### Slice 19 — Postać: the tiles of the eight slots and their sentences

- **Goal:** Around the figure stand the tiles of the eight slots (*To do* 10, row 8): on its left „Głowa”, „Tułów” and „Nogi”, on its right „Ręka główna” and „Druga ręka”, under it a row of the three pockets; each a tile of Slice 16 holding the icon of the item in its slot or the slot's pale name, a slot that nothing fits standing empty (F23); in a component of its own, `src/browser/view/character-gear.tsx` (new). The tiles show the gear the game keeps at the character outside a map run: for a character in an earning loop the gear of its next map run, with „Postać jest w pętli. Zmiana działa od następnego przejścia.” above the tiles (row 33, F31); for the character of the manual map run the game state holds — going, paused or ended until „Restart” or „Zakończ” — the gear it entered with, its tiles not selectable, with „Przejście na mapie {mapa} jest niezakończone. Wyposażenie zmienisz po jego zakończeniu.” under the heading (row 34, F16), another character's tiles staying selectable. Each entering of the screen starts with no tile chosen (as D-199's trees start folded). The pick under a tile comes in Slice 20. Tests in `tests/view/character-gear.test.mjs` (new).
- **Change:** `src/browser/view/character-gear.tsx` · `src/browser/view/character-screen.tsx` · `src/browser/character-screen.css` ·
  `tests/view/character-gear.test.mjs`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:41-45` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:48-50` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:160-161` Questions to settle ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:267-267` Settlements to record ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:287-288` Settlements to record ·
  `foundations/part_map.md:3-33` browser-view · `foundations/decisions.md:10710-10753` D-287 ·
  `foundations/decisions.md:4923-4940` D-447 · `foundations/decisions.md:7412-7441` D-199 · F16 · F23 · F31 ·
  `src/browser/view/controls/react-button.tsx` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — orchestrator's addition in the plan review: eight tiles with the states of the task's sentences, read from a character's state in three situations.
- **Risk:** none
- **Checks:** `npm test -- tests/view/character-gear.test.mjs` (written first, failing) · `npm test -- tests/view/character-screen.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` · `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm run typecheck`
- **Depends on:** Slice 18 · F16 · F23 · F31

### Slice 20 — Postać: the pick under a tile, the screen checked in a browser, the screenshots

- **Goal:** A touch on a selectable tile chooses it and opens under the tiles the pick in pick cells (row 31, F30; row 32): the items of the chest that fit the slot, each with its icon, its name and the pieces the chest holds of it, and „Zdejmij”, with no icon, where the slot holds something; above the pick „{miejsce}: {rzecz}”, or „{miejsce}: nic” for an empty slot; „W skrzynce nie ma nic, co tu pasuje.” where the chest holds nothing that fits, beside „Zdejmij” at a slot that holds something; a cell that cannot act greyed with its reason, as „Zdejmij” with „skrzynka pełna”; a pick or „Zdejmij” acts and closes the pick, and a second touch on the chosen tile closes it; what the pick shows comes from the simulation's function of Slice 2. The two acts go out of the screen as its acts do (`onBuy`, `onStop`) and the entry of the screen runs them through the store's act that counts the time first (D-409), calling the acts of Slice 2; the focus never falls to the page (rule "Focus does not fall to the page"). Tests in `tests/view/character-gear-pick.test.mjs` (new). Then the screen Postać is checked in Chromium in both layouts as `.claude/skills/loop2-play/SKILL.md` gives — at 1280 × 720 with no touch and at 360 px with touch, with its measurement: nothing scrolling sideways, no text over its frame, no control under the touch target — at a character at the camp, in an earning loop and in a manual map run, with tiles full and empty and the pick open; a fault found there is fixed in the file that holds it and named in the report. Last, the screenshots of the screen Postać with the section „Wyposażenie” in both layouts for the request's description (*To do* 10), which this slice's agent pushes itself to `mariusznazar/screenshots`, in its directory `loop2/wyposazenie-postaci/` on the branch `loop2/wyposazenie-postaci` (D-418, D-419, the skill's section "Show a screenshot to the human"), its report naming each file's link in its commit, with `?raw=true`, for the description.
- **Change:** `src/browser/view/character-gear.tsx` · `src/browser/view/character-screen.tsx` · `src/browser/view/character-entry.ts` ·
  `src/browser/character-screen.css` · `tests/view/character-gear-pick.test.mjs`
- **Read:** `.claude/skills/loop2-play/SKILL.md` · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:51-53` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:56-56` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:285-286` Settlements to record ·
  `foundations/part_map.md:3-33` browser-view · `foundations/decisions.md:9422-9436` D-409 ·
  `foundations/decisions.md:1681-1695` D-418 · `foundations/decisions.md:1696-1710` D-419 ·
  `foundations/decisions.md:9874-9925` D-289 · F22 · F30 ·
  `src/browser/view/controls/react-pick-cell.tsx` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — orchestrator's addition in the plan review: the pick, the check in a real browser in both layouts and the push of the screenshots.
- **Risk:** none
- **Checks:** `npm test -- tests/view/character-gear-pick.test.mjs` (written first, failing) · `npm test -- tests/view/character-gear.test.mjs` ·
  `npm test -- tests/view/character-screen.test.mjs` · `npm test -- tests/view/screen-registry.test.mjs` ·
  `npm test -- tests/view/state-store.test.mjs` · `npm run typecheck`
- **Depends on:** Slice 19 · F22 · F30

### Slice 21 — The balance instrument starts a measurement with the character's gear

- **Goal:** The gear of the measured character is a parameter of the starting state of a measurement, as its skills are (*To do* 13): `makeState` in `balance/engine.mjs` puts it on the created character and `startOf` gives it to `newMapRun`, so that a map run starts as the game starts one (`instrument-game-agreement`); `runOnce` and `sweep` take it; the commands `sweep`, `trace`, `check-map` and `progression` take a flag `--gear` of pairs `slot=item`, such as `mainHand=stick`, an unknown slot, an unknown item or an item that does not fit its slot refused with the usage error, the slots and fits read from the built game's data; with no flag the new character's empty gear, so that the stick of a take list reaches the main hand at the first strike (Slice 4). `tests/balance/agreement.test.mjs` shows a seed with a stick in the main hand ending alike in the game and in the instrument; `tests/balance/gear.test.mjs` (new) the parameter and the flag; `.claude/skills/loop2-balance/SKILL.md` names the flag. Then, Las — matecznik standing in the game, one run of `npm run --silent balance -- progression --maps forestLair --gear mainHand=stick --out .runs/<directory of this slice's agent>/lair.md`, and the report gives the share of seeds its best program solves, for the request's description (*To do* 15); a seed solved goes to the human as a finding and the paragraph of D-438 stays as it is.
- **Change:** `balance/engine.mjs` · `balance/check-map.mjs` · `balance/progression.mjs` · `balance/trace.mjs` · `balance/cli.mjs` ·
  `tests/balance/agreement.test.mjs` · `tests/balance/gear.test.mjs` · `.claude/skills/loop2-balance/SKILL.md`
- **Read:** `.claude/skills/loop2-balance/SKILL.md` · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:59-61` To do ·
  `docs/task-cycles/wyposazenie-postaci/task_frozen.md:243-245` Decisions in play ·
  `foundations/part_map.md:128-139` balance-tools · `foundations/part_map.md:140-159` agent-workflow ·
  `foundations/decisions.md:6167-6185` D-438 · `foundations/decisions.md:918-932` D-437 ·
  `foundations/decisions.md:12448-12464` D-428 · `foundations/decisions.md:12465-12479` D-429 ·
  `foundations/invariants.md:1438-1447` instrument-game-agreement · `foundations/invariants.md:1448-1457` balance-instrument-file-writes ·
  `foundations/invariants.md:1458-1467` balance-instrument-repeatability · `foundations/glossary.md:296-301` overlay ·
  `tests/balance/cli.test.mjs` · `tests/agent_workflow/test_loop2_balance_skill.py` ·
  `guidelines/coding.md` · `guidelines/coding-balance-instrument.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/balance/gear.test.mjs` (written first, failing) · `npm test -- tests/balance/agreement.test.mjs` ·
  `npm test -- tests/balance/engine.test.mjs` · `npm test -- tests/balance/cli.test.mjs` · `npm test -- tests/balance/check-map.test.mjs` ·
  `npm test -- tests/balance/progression.test.mjs` · `npm test -- tests/balance/trace.test.mjs` ·
  `npm test -- tests/invariants/test_balance_instrument_file_writes.py` ·
  `npm test -- tests/invariants/test_balance_instrument_repeatability.py` ·
  `npm test -- tests/agent_workflow/test_loop2_balance_skill.py`
- **Depends on:** Slice 20 · Slice 4

### Slice 22 — The instrument's earning loop and campaign with gear

- **Goal:** The command `loop` takes the flag `--gear` of Slice 21 and starts the earning loop with that gear on the character; a player description of `campaign` takes an optional field `gear` of slots and items, read and refused as the description's other fields are (`balance/describe.mjs`), and the campaign puts that gear on the character with the game's own act of Slice 2 from what the chest holds, with no copy of a rule of the game (rule "Przejście mapy jak w grze"); with neither, the empty gear of a new character. `.claude/skills/loop2-balance/SKILL.md` names both. Tests in `tests/balance/loop.test.mjs` and `tests/balance/campaign.test.mjs`.
- **Change:** `balance/loop.mjs` · `balance/campaign.mjs` · `balance/describe.mjs` · `balance/cli.mjs` ·
  `tests/balance/loop.test.mjs` · `tests/balance/campaign.test.mjs` · `.claude/skills/loop2-balance/SKILL.md`
- **Read:** `.claude/skills/loop2-balance/SKILL.md` · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:59-59` To do ·
  `foundations/part_map.md:128-139` balance-tools · `foundations/decisions.md:918-932` D-437 ·
  `foundations/decisions.md:12448-12464` D-428 · `foundations/invariants.md:1438-1447` instrument-game-agreement ·
  `foundations/invariants.md:1448-1457` balance-instrument-file-writes · `tests/balance/campaign-fixture.mjs` ·
  `tests/agent_workflow/test_loop2_balance_skill.py` ·
  `guidelines/coding.md` · `guidelines/coding-balance-instrument.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/balance/loop.test.mjs` (its new cases written first, failing) · `npm test -- tests/balance/campaign.test.mjs` ·
  `npm test -- tests/balance/cli.test.mjs` · `npm test -- tests/invariants/test_balance_instrument_file_writes.py` ·
  `npm test -- tests/agent_workflow/test_loop2_balance_skill.py`
- **Depends on:** Slice 21 · Slice 2

### Slice 23 — A fight walked in a real browser, and the styleguide's line on the component of the gear line (added by the orchestrator after Slice 15's report)

- **Goal:** (1) Slice 15's browser check could not reach a fight, so what a fight shows of the gear stands unchecked. Walk it in a real browser as `.claude/skills/loop2-play/SKILL.md` gives: with a stick in the backpack and an empty main hand, a map run with a wolf attack (a seed that meets the wolf can be found with the balance instrument, whose modes take the character's gear since Slice 21) in which the strike takes the stick into the hand — the combat line reads „Mag bierze patyk z plecaka do ręki” as an element of its own before the strike's, the chronicle reads „Bierze patyk z plecaka do ręki”, the line of gear on the screen of the map run turns from „Wyposażenie: nic” to „Wyposażenie: patyk w ręku” — and a program with the rule „Puste — Ręka główna → Załóż — patyk” and one with „Załóż” in the combat rules: the rule of „Załóż” stands in its colour out of combat and in the turn of a fight and is never amber with „trwa walka” or „tylko w walce” (D-309 as changed); „Teraz” reads „Zakłada {rzecz}”; the encounter's paragraph in the chronicle shows the equip turn. Make the check at 1280 × 720 and at 360 px with touch; put screenshots where `.the-way/task-cycle/change/ui_check.md` says and report their links. A fault found in a file an earlier slice changed is fixed by this slice outside its *Change* and named in its report. (2) The paragraph of `guidelines/styleguide-browser-view.md` that Slice 11 wrote for the line of gear (the rule "The body row of a map run", the passage that says "Komponent to `src/browser/view/body-row-cells.tsx`") names the component of the body row; the gear line is drawn by `src/browser/view/world-area.tsx` right after the body row's cells, with its words made by `src/browser/view/gear-lines.ts`, and the passage says so, in the rule's own style, changing nothing else.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `docs/task-cycles/wyposazenie-postaci/task_frozen.md:30-39` To do · `docs/task-cycles/wyposazenie-postaci/task_frozen.md:55-55` To do · `foundations/decisions.md:10821-10840` D-311 · `foundations/decisions.md:8383-8398` D-380 · `guidelines/coding.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` · `.claude/skills/loop2-balance/SKILL.md` · `.the-way/task-cycle/change/walkthrough.md` · `.the-way/task-cycle/change/ui_check.md`
- **Model:** same — a walk through a fight in a real browser that the cheaper executor of Slice 15 could not reach.
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` (its remaining errors are the two lines of `tests/view/character-screen.test.mjs`, until Slice 18) · the browser check above, with its observations and screenshot links in the report
- **Depends on:** Slice 22

## Coverage

| What the task requires | Slices or entries |
|---|---|
| *To do* 1 — eight slots, one piece each, fits in the data, the bandage fitting a pocket already | Slice 1; F25; row 17 in Slice 1 |
| *To do* 2 — the gear belongs to the character, put on from the chest, goes with it into every map run and back, outside the trip plan | Slices 1, 2, 3; F21 |
| *To do* 3 — the strike takes the stick from the main hand, refills it from the backpack in the same turn, its chronicle and combat line words, „brakuje 1 × patyk” | Slices 4, 12; F4, F5, F6, F26 |
| *To do* 4 — the gear is no backpack | Slices 1, 4, 7; F24 |
| *To do* 5 — refill at use, „Załóż”, „Puste”, combat carrying gear and backpack, the pick's places, discovery at the first wolf attack | Slices 4, 6, 7, 8, 12, 13, 14; F7, F8, F17, F18, F26, F27, F28 |
| *To do* 6 — what takes the gear: only a death with no use left, a character with no practice too; the gear back as it stood | Slice 3; F10, F11 |
| *To do* 7 — changes on the screen Postać at the camp and in an earning loop, the slot by slot merge, the chest, the tiles in a loop and in a manual map run | Slices 2, 3, 19, 20; F16, F22, F29, F31 |
| *To do* 8 — the map's caps leave the gear out | Slices 1, 3; F9 |
| *To do* 9 — the judging with the character's gear; a change the player makes erases the judgings, one from a map run does not | Slices 3, 10; F12, F13, F32 |
| *To do* 10 — the section „Wyposażenie”, the figure twice its size, the tiles, the pick, the tile as a shared control with tests and the kitchen-sink page, the line of the screen of a map run, the screenshots | Slices 15, 16, 17, 18, 19, 20; F14, F15, F19, F20, F23, F30, F31 |
| *To do* 11 — the styleguide's part on the gear and the changed points of the rule of the screen Postać | Slice 11 |
| *To do* 12 — the version of the saved document raised | Slice 1 (and kept at 11 by Slices 4 and 8) |
| *To do* 13 — the balance instrument with the character's gear in every mode | Slices 21, 22 |
| *To do* 14 — the foundation entries | F1–F34 |
| *To do* 15 — one `progression` check of Las — matecznik with a stick in the main hand, its result in the request | Slice 21 |
| Row 1 | F21; Slices 1, 2, 3 |
| Row 2 | F10; Slice 3 |
| Row 3 | F22; Slices 2, 20 |
| Row 4 | F9; Slices 1, 3 |
| Row 5 | F12; Slice 3 |
| Row 6 | F13, F32; Slices 2, 10 |
| Row 7 | F19; Slices 11, 15 |
| Row 8 | F23; Slice 19 |
| Row 9 | Slices 11, 18 |
| Row 10 | F24; Slices 1, 4, 7 |
| Row 16 | F25; Slices 1, 4 |
| Row 17 | Slice 1 |
| Row 18 | F26; Slice 4 |
| Row 19 | F27; Slice 7 |
| Row 20 | F7; Slices 7, 8 |
| Row 21 | F28; Slices 6, 13, 14 |
| Row 22 | F17; Slices 6, 7, 8 |
| Row 23 | F18; Slices 6, 7, 13, 14 |
| Row 24 | F6; Slices 4, 7 |
| Row 25 | Slices 4, 7, 12 |
| Row 26 | F11; Slice 3 |
| Row 27 | F10; Slice 3 |
| Row 28 | F29; Slice 3 |
| Row 29 | F15; Slices 11, 18 |
| Row 30 | F14; Slices 11, 18 |
| Row 31 | F30; Slices 11, 20 |
| Row 32 | Slices 11, 20 |
| Row 33 | F31; Slices 11, 19 |
| Row 34 | F16; Slices 2, 11, 19 |
| Projected decision "Where does an action take the piece it uses from?" | F1 |
| Projected glossary term `gear` | F2 |
| Changes of the entries *Decisions in play* lists: D-23, D-144, D-145, D-380, D-140, D-309, D-187, D-190, D-183, D-439, D-440, D-446, D-445, D-287, D-143, D-290, D-311, D-44 | F3–F20 |
| Entries *Decisions in play* lists with no change: D-443, D-142, D-293, D-363, D-291, D-64, D-179, D-200, D-447, D-199, D-206, D-38, D-438, `trip-transfer`, `instrument-game-agreement`, `program-world-reference` | held by the checks of Slices 1, 3, 6, 7, 13, 21 |
| The part map | no line: every new file falls under a pattern of its part (`src/browser/sim/**`, `src/browser/view/**`, `assets/icons/**`, `tests/sim/**`, `tests/view/**`, `tests/balance/**`) |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The shape of the gear (first question carried to cycle): a gear maps each of the eight slots of the data to the one item it holds or none; a character of the team holds the gear the game keeps at it outside a map run, the slots the player changed since the start of its earning loop's map run going on, and a count of the gear changes the player made; the character of a map run holds the gear of that map run; an item's row names the place it fits; the slots, places and their words stand in `src/browser/sim/data/gear.ts`. | A list of pieces per place with counts — question 13 rejected a pocket holding several pieces; the gear inside the trip plan — question 1. | Every later slice reads the shape; a change of it is a change of the saved document's shape, which the task's projects discard at each change anyway. |
| The gear of the next map run and the marks of the slots the player changed (fourth question carried to cycle) stand at the character, not in the earning loop, since the gear outside a map run is the character's and D-241 lists what an earning loop holds. | The earning loop holding the next run's gear and the marks — a change of D-241 with no row of the task, and the gear of a character whose loop stops would move between two places. | The marks lie at every character, empty outside an earning loop; the load refuses marks at a character with no earning loop. |
| The encounter's gear and backpack (third question carried to cycle): the encounter keeps them from turn to turn, its result holds them after the fight and the map run takes them at the resolution; an exchange marks a refill for the view. | Working the gear out after the fight from the exchanges — two places computing the same, which drift apart. | The saved combat result grows by two fields and a mark. |
| The balance instrument (second question carried to cycle): the gear is a parameter of the starting state, as the skills are — `makeState` puts it on the created character, a flag `--gear` of `slot=item` pairs in `sweep`, `trace`, `loop`, `check-map` and `progression`, a field `gear` of a player description that the campaign puts on with the game's act. | An overlay — it changes only the game's data tables (`OVERLAY_TABLES`), as *To do* 13 says. | One flag more in six commands and one field more in a description. |
| How a gear change the player makes erases the judgings (F32, the cycle's change of D-441): the game state counts the player's gear changes at the character, the stored judging holds the count it was made at, and the reading compares it, as D-441 already does with the generation number; the cache keeps and compares the count, the simulation's record unchanged. | The page removing the character's stored judgings at the act — another device or browser keeps a badge that lies, which D-441's reading against the game state was made to prevent. | A field of the game state and of the stored judging, the stored form's version raised, so the judgings remembered before the change show nothing once. |
| The new logic of the gear stands in a module of its own, `src/browser/sim/gear.ts`, and game.ts only calls it. | Writing it into game.ts — about 740 of the 800 lines D-425 allows; a move slice would then come first. | One module more to read. |
| A slice of the view (Slice 5) lets two switches of the view give a default for a kind they do not name — the new condition of the editor and the mage's goal in the scene — with no change of behaviour, before the simulation adds „Puste” and „Załóż”. | Adding each kind to the simulation and the two switches of the view in one slice — the view's whole guidelines and the simulation's files do not fit one agent's reading, and the build stops on a switch the kind does not reach. | A kind added later to the simulation reaches those two places by the default until the view names it; the editor then offers nothing for it and the mage stays where it stands. |
| The tile is a kind of the shared button, as the button of a cell of the body row is (D-44). | A control of its own in a file of its own — D-44 lists the button's kinds as one control, and a square button with an icon and a chosen state is a button. | One kind more in `ReactButton` and its tests. |
| „Załóż” gets an icon of its own from game-icons.net (F33, F34), picked by the writer of the foundation entries. | Sharing an icon with another action, such as „Zbierz”'s hand — „Załóż — patyk” and „Zbierz — patyk” would look alike, against D-291's reason. | One icon file, its credit and its environment fact. |
| The words of the refill and of the line of gear stand in the game's data, beside the places. | Words written in the view — `content-identifiers` keeps the names of the game's things in the data, and the place's words belong with the place. | none known. |
| The acts on the gear go through the store's act that counts the time first (D-409), since for a character in an earning loop the map run whose end merges the gear depends on time. | The act without catch-up, as „Kup” — a change would be marked against a map run the catch-up has already ended. | none known. |
| The checks in a real browser stand in Slice 15 for the screen of a map run and its editor, in Slice 17 for the kitchen-sink page and in Slice 20 for the screen Postać, not in each slice of the view. | Each slice of the view checking in a browser — the play skill does not fit the reading of the slices of the view beside their guidelines. | A fault the check finds is fixed in a file an earlier slice changed, outside the checking slice's *Change*, and named in its report. |
| New tests stand in new files, listed in `stryker.config.json` where they test the simulation. | Adding the cases to the long test files of today — a file in *Change* counts whole in its agent's reading. | More test files. |
