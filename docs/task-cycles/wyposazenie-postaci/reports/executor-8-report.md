done

# Report of executor-8 — Slice 8: „Załóż” in combat, the first wolf attack's discoveries and the saved document

## Commits (on `task/wyposazenie-postaci`, base `78a70000`)

- `dba5de23` test: the lists of the data test take the action „Załóż” (`tests/sim/data.test.mjs`, +6 −3).
- `04a81323` feat: „Załóż” acts in a combat turn, the combat pick, the saved document (7 files, +595 −56):
  `src/browser/sim/types.ts` (new `CombatVerbKind`; `CombatCharacterAction["action"]` may be `equip`; `MinuteKind` excludes the three verbs of combat only),
  `src/browser/sim/combat.ts` (the turn of `equip` puts the piece on at once with no damage and no practice, the next turn reads the gear and the backpack it left),
  `src/browser/sim/program.ts` (`combatRefusal` gives an action the data mark `alsoInCombat` the refusals it has outside combat),
  `src/browser/sim/saved-game.ts` (a turn's action may be `equip`, with no refill and damage 0; a combat verb going on outside a fight stays refused; the record's kinds already hold `equip` through `MINUTE_KINDS`),
  `tests/sim/saved-game.test.mjs`, `tests/sim/gear-combat-wear.test.mjs` (new, 10 tests), `stryker.config.json` (the new file listed).

## Checks (command, exit code)

- `npm test -- tests/sim/gear-combat-wear.test.mjs` — written first, exit 1 (7 of 10 failing, assertions on the expected values: the character action `null` where „Załóż” was expected, „trwa walka” where „go” was expected; log kept in `reports/executor-8-red-gear-combat-wear.log`), after the code exit 0 (10 pass).
- `npm test -- tests/sim/saved-game.test.mjs` — exit 0 (49 pass); on the base it was exit 1 (19 failing: the document lacked the kind `equip` of the record).
- `npm test -- tests/sim/discovery.test.mjs` — exit 0 (50 pass; also on the base).
- `npm test -- tests/sim/data.test.mjs` — exit 0 (45 pass); on the base exit 1 (4 failing: the group, the skills' free list, the revealing row and the one-row test did not hold `equip`).
- `npm test -- tests/sim/rule-signs.test.mjs` — exit 0 (40 pass).
- `npm test -- tests/sim/encounters.test.mjs` — exit 0 (29 pass).
- `npm test -- tests/quality/test_mutation_test_selection.py` — exit 0 (1 test OK).
- `npm run typecheck` — exit 0.
- Tests of the code touched, each exit 0: `gear-combat` (7), `gear-wear` (16), `gear-condition` (4), `gear-state` (12), `gear-transfer` (14), `gear-acts` (24), `run-record` (15), `program` (19), `actions` (18), `repertoire` (32), `combat` (11).
- `npx eslint` on the 7 changed source and test files — exit 0; `npx prettier --check src/browser/sim tests/sim stryker.config.json` — all formatted.
- `python -B .the-way/elements/common/foundation_check.py` — exit 1, 2 errors, both `tests/view/character-screen.test.mjs` lines 134 and 400 (quotations of D-446 and D-445), not in my slice's files (the handoff said 14 before Slices 4, 4b and 18; no error added by this slice, none in a file I changed).
- Not run: the full `npm test` (the cycle's), the instruction-files check, `tests/invariants/*` (no invariant's test is in my slice's *Checks*).

Tests failing on the slice's base (a clean worktree at `78a70000`, measured before my first edit, no separate copy needed): `tests/sim/saved-game.test.mjs` 19 failing and `tests/sim/data.test.mjs` 4 failing, as above; both are the ones Slice 7 announced as left failing until Slice 8, and both pass now. `tests/sim/discovery.test.mjs` and `tests/sim/encounters.test.mjs` passed on the base and pass now.

The invariant `save-version` (trust boundary of `saved-game.ts`): the test of the strict load was seen failing (19 failing on the base, exit 1) and passing after (exit 0). A mutation was also run: removing the line that refuses an `equip` turn with damage made `a crafted document of the current version is refused whole as shape` fail (exit 1), restored afterwards (not committed).

## What was made

- A turn of „Załóż” in `resolveCombat`: after the wolf's action the character's chosen `equip` rule changes `gear` and `backpack` with the same `equipped` function the action uses outside combat (swap with the piece the slot held, first empty pocket), deals 0 damage, grows no practice, counts a rule start, and ends the turn (one action per turn). The `view` of each turn is built from the character as the turn before left it, so the pick, the condition „Puste” and the wolf's own conditions read the new gear.
- `combatRefusal`: an action with `alsoInCombat` in the data (only `equip`) takes `actionRefusal`, so in combat it names „brakuje 1 × {rzecz}”, „już założone: {rzecz}” or „kieszenie pełne”, never „trwa walka”, and outside combat it was already never „tylko w walce” (Slice 7). Because the pick (`judgeProgram`) is the one function the signs come from, a rule with „Załóż” stands on `rule-winning` in the minutes of an attack where the first turn would choose it (D-309) — shown by `ruleSigns` in the new tests.
- The saved document: `isCombatVerb` (the three verbs, still refused as an activity going on outside a fight) and `isTurnAction` (the three and `equip`); a turn of `equip` is read with `refill` false and `damage` 0, else refused as shape. The version stays 11; the document of the test is rewritten, as the comment above it says, without raising the version: the Understanding holds `equip` and `emptyPlace`, the record holds 4 minutes of `equip` (taken from `walkToCampfire`, the sum stays 212), and the second turn of the last combat is a turn of „Załóż” (a bandage put on). The strict-reading cases were added: a turn of „Załóż” with a refill mark, with damage, with fractional damage, with no item, with an item the data lack, with an item that fits no place, with a field beyond its kind and item, and with an action no turn carries out; the record's counts of `equip` (missing, below 0, fractional, text, none, a sum off by one); and the existing loops over the places of an action now take „Załóż” too (a rule of a program, of a copy, of a base, of an earning loop's program, and the activity going on of a map run and of an earning loop), with the items that fit no place refused.

## Own-work check (section 3)

- Requirement most likely not met: *To do* 5, „the condition „Puste” checked before each turn sees the gear as the turn before left it”, and one rule per turn („Załóż” takes the turn, the program does not pass to the next rule in the same turn). Check: `each turn starts one rule…` in `gear-combat-wear.test.mjs` gives one turn the program `Puste — Ręka główna → Załóż — patyk; Puste — Kieszeń → Załóż — opatrunek; Zawsze → Kopnij` with 1 stick and 3 bandages, and expects `equip stick, equip bandage ×3, kick, kick`. Shown to catch the break: with `view` built from the run's own character (the turn before's gear not read) 4 of 10 tests failed, including this one; the code was restored.
- Second requirement: the wolf acts as in any turn in the turn of „Załóż” — `exchanges[0]` of the first test holds the wolf's strike 7 (health 93) and the character's `equip` action with damage 0 and the wolf's health 24; and a character the wolf kills before its action puts nothing on.

## Walk of `walkthrough.md`

The change alters what a user will see (a rule with „Załóż” acts in a fight, its sign in the editor, the combat paragraph), but the player cannot reach it in the running product yet: the pick of „Załóż” and „Puste” in the rule panel and the editor stands in Slices 13 and 14 (the view tests `program-editor` and `rule-editor` are named failing until then), and the check in a real browser is Slice 15's, as the plan says. The walk is therefore not performed in this slice; the plan of cases, all unchecked with that reason:

| Case | By what | Verdict |
|---|---|---|
| a rule „Zawsze → Załóż — patyk” in the minutes of an attack is not amber, stands on the winning background where the turn would choose it | the program editor of the running game during an attack | unchecked: no pick of the action in the editor until Slices 13–14; decided by `ruleSigns` in `gear-combat-wear.test.mjs` |
| the first wolf attack reveals „Załóż” and „Puste” | the game in a browser | unchecked: Slice 15; decided by `data.test.mjs` and `encounters.test.mjs` |
| a turn of „Załóż” in the paragraph of the encounter | the screen of a map run after an attack | unchecked: the words are Slice 12's |
| side observation | — | see below |

What I did not check: the screens (the view is untouched); a real browser; the earning loop and judging over a fight with „Załóż” (their code takes `resolveCombat`'s `gear` and `backpack` as Slice 4 made them and is untouched here; the unit tests of the map run cover the take).
Side observation (outside the task's scope, Slice 12's): `src/browser/view/combat-line.ts` reads the status of a turn's action from the data, so a turn of „Załóż” would read „Mag zakłada: wilk 24/24” until Slice 12 gives it the words of row 25 („Mag zakłada {rzecz}”); it does not break, it reads wrong for an `equip` turn.

## Reaches beyond the dispatch

None beyond the dispatch's files and entries. One read outside the named ranges: `src/browser/view/combat-line.ts:30-75` (to judge the walk; read-only, not changed) and `foundations/decisions.md` D-23 and D-380 headings for the quotations of the tests' `decision:` lines (the sentences quoted as they now stand).

## Mismatches between the plan and the code (small, adapted)

- The plan says `tests/sim/discovery.test.mjs` „takes” „Załóż” and „Puste”; it holds no test of the first wolf attack (those stand in `tests/sim/encounters.test.mjs`, Slice 7b), it passed on the base and needed no change. `tests/sim/data.test.mjs` needed four list edits (the group order, the skills' free list, the revealing row, and a quotation of the new sentence of D-143).
- The plan's Change lists `src/browser/sim/types.ts` for the action of a turn; `MinuteKind` is derived from the same type, so it needed the new `CombatVerbKind` to keep `equip` a kind of minute. No file outside the Change list was changed.
- The handoff's `foundation_check.py` count of 14 errors reads 2 on this base (the earlier slices' tests); they are in `tests/view/character-screen.test.mjs`.

## Choices

- `combatRefusal` uses the data's `alsoInCombat` mark and `actionRefusal` (the refusals outside combat, with the nature-energy and branch checks) rather than a test for `equip` by name; rejected: a branch on the kind `equip`, which would need a change for each later action the data mark the same way. Cost if wrong: a later `alsoInCombat` action with a refusal that only makes sense outside combat shows it in combat; none exists today.
- The saved document requires `damage` 0 for a turn of `equip` (a document may be refused more, not less); rejected: not checking, as the load does for a kick's damage. Cost if wrong: a document of some future version with an `equip` turn that deals damage would be refused as shape; the simulation never writes one.
- The document's turn of „Załóż” has the rule number 7, which no rule of the copy has: the load reads a combat record's rule numbers as numbers and compares none with the copy (the comment above the constant says so). Rejected: adding a rule to the copy, which would rewrite the counts, the copy and the program around it.

## Unread material

- `foundations/part_map.md:34-65` (simulation): not read (the dispatch names it; the files are those of the guidelines' tables).
- `foundations/decisions.md` D-310 (10254-10288): read the whole entry. D-23, D-380, D-143, D-144, D-140, D-309, D-458, D-459: read whole. D-142, D-145, D-290, D-425: read the passages named above only.
- `foundations/glossary.md` (combat turn, Understanding) and `invariants.md` (`rule-state-from-pick`, `save-version`): read whole.
- `tests/sim/saved-game.test.mjs`: read lines 1-95, 255-475, 650-1100, 1835-1870, 2240-2360, 2870-3135, 3195-3320 (the named 1-93, 740-1093, 2885-2910 and the places the changes touched); the rest of the 4300-line file was not read, only searched.
- `guidelines/testing.md`: read whole (two pages). `guidelines/coding.md`, `coding-simulation-module.md`, `coding-saved-game.md`: read whole.
- `task_frozen.md`: read lines 25-44 (the named 35 and 37-39 with their neighbours), 135-142 and 270-279; not lines 36 beyond *To do* 5 context of other questions.
- Every changed file whole before changing it: `combat.ts` and `program.ts` whole; `types.ts`, `saved-game.ts` and the test files only in the ranges changed (the dispatch's allowance: the entries by ranges).

## Searches not found or unclear

- none that blocked the work. Unclear: the handoff says the plan's F32 reads D-463; this slice does not touch it.

## Working copies

None made: the base measurements were taken in the worktree before the first edit. Scratch scripts of mine (`.runs/executor-8-*.mjs`, backups and logs) were removed; one log kept in `reports/executor-8-red-gear-combat-wear.log`. Mutations (two, in `saved-game.ts` and `combat.ts`) were made in the worktree, run, and restored before the commit; `git diff` shows only the intended changes.
