PASS 04a81323dfc71c14e171f6dab7072284331636aa

# Review of Slice 8 — „Załóż” in combat, the first wolf attack's discoveries and the saved document

Range `78a70000..04a81323` (commits `dba5de23`, `04a81323`); `git rev-parse HEAD` in the worktree is `04a81323dfc71c14e171f6dab7072284331636aa`, the head given. `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`, the pinned commit. Variant: a planned slice; trust boundary `src/browser/sim/saved-game.ts`.

## Findings

### Critical

none

### Important

none

### Minor

1. **`tests/sim/saved-game.test.mjs:3167-3168` and `tests/sim/saved-game.test.mjs:991-1004` — the document of the current version no longer holds a turn with no action of the character, and the case named for one now changes a turn that has one.**
   The rewrite puts the turn of „Załóż” (`EQUIP_TURN`) at index 1 of the last combat's exchanges, which in the version-10 document was the only exchange with `characterAction: null` (`tests/sim/saved-game.test.mjs:423`). Two consequences:
   - The crafted case „a refill mark on an exchange with no action of the character” still writes `fought(document).exchanges[1].refill = true`, but exchange 1 now holds the turn of „Załóż”; the case is refused for the extra key on the exchange, so it still passes, but it no longer tests what its name says.
   - The guideline `guidelines/coding-saved-game.md:103-104` („Test zapisanego dokumentu bieżącej wersji … wypełnia każdą gałąź opcjonalną”) and the comment over the document (`tests/sim/saved-game.test.mjs:93-94`, „It fills every optional branch of the game state”) no longer hold for the branch `characterAction: null` of a combat record of the current version.
   Why Minor and not blocking: the branch is still protected by another test. Probe: in a worktree of the head, `exchange()` in `src/browser/sim/saved-game.ts:787-790` changed to read every `characterAction` through `characterAction()` (so a null turn is refused); `npm test -- tests/sim/saved-game.test.mjs` exit 1, the one failing case „a game state the simulation made loads back from its saved document” (`tests/sim/saved-game.test.mjs:4183`). Log: `docs/task-cycles/wyposazenie-postaci/reports/review-8-probe-null-action.log`. Fix: either keep a null turn in the document (for example put the turn of „Załóż” on another exchange, or add one), or point the crafted case at an exchange with no action and keep the comment true.

2. **`foundations/glossary.md:174-178` (combat turn) — outside the slice's *Change*, a wording no longer exact after this slice.** It says the character has no action in a turn „when it finds no feasible combat rule (D-146)”; after this slice a turn's action may be „Załóż”, which is no combat rule. A reader could take a rule with „Załóż” as unable to act in a turn. Minor: the glossary entry is not among the slice's files and D-140/D-144 say plainly that „Załóż” takes a turn; for the orchestrator to judge whether a later slice or the return step touches the entry.

### Outside the task's scope

none

## Declined to judge

- `src/browser/view/combat-line.ts:50-58` reads a turn of „Załóż” as „Mag {status}: wilk N/24”: the words of a turn of „Załóż” in the combat paragraph are Slice 12's, as the executor also notes.
- The pick of „Załóż” and „Puste” in the program editor and the rule panel, and `src/browser/view/program-editor.ts:827` („tura” only for actions with a combat effect): Slices 13-14.
- The walk through the running product: Slice 15's, as the plan says.

## What was checked against the task, the plan and the foundation

- *To do* 5 (`task_frozen.md:37-39`), row 20 / D-140: `resolveCombat` (`src/browser/sim/combat.ts:84-162`) builds each turn's `view` from the character the turn before left; a chosen `equip` changes gear and backpack with the same `equipped` as outside combat, deals 0, grows no practice, counts a rule start and ends the turn (one rule per turn; the program does not pass on). The wolf acts first in the turn as in any turn. Tests in `tests/sim/gear-combat-wear.test.mjs` show each of these with values written out (stick 2 → hand + 1 in the backpack, wolf strike 7 → 93; `Puste` hand/pocket filling one per turn and then `Kopnij`).
- D-140 / D-380 / D-458: `combatRefusal` (`src/browser/sim/program.ts:527-536`) gives an action with `alsoInCombat` the refusals it has outside combat; „trwa walka” stays for other ordinary actions (shown by the D-309 test, `explore` → „trwa walka”).
- D-309 and the invariant `rule-state-from-pick`: the signs come from `judgeProgram`, the one pick function; the new tests use `ruleSigns` in and outside the minutes of an attack (no „trwa walka”, no „tylko w walce”, winning where the first turn would choose it).
- D-143 / D-144 / F17: `tests/sim/data.test.mjs` takes `equip` in the revealing row of the first wolf attack and the group order; `tests/sim/discovery.test.mjs` holds no test of the wolf attack (checked: no `wolf`/`attacked` in it) and needed no change; `tests/sim/encounters.test.mjs` (changed at the base commit `78a70000`) passes.
- Saved document / `save-version` (trust boundary): a turn's action may be `equip`, read through the program action reader (item of the data with a place of the gear), with `refill` false and `damage` exactly 0; an `equip` going on outside a fight still loads, a combat verb going on outside a fight is still refused. Crafted cases cover refill mark, damage 6 and 0.5, no item, an unknown item, an item with no place (moss), an extra field, an action no turn carries out, and the `equip` minutes count (missing, −1, 3.5, text, null, sum off by one). The version stays 11 under the guideline's exception (main still has `SAVED_GAME_VERSION = 10`; the comment over the document states the exception). The fuzz case „no value a document can hold, at any place of it, throws out of the load” passes.
- Changed invariant tests (`// invariant: save-version`): „each place of an action holds „Wytwórz”, „Opatrz” and „Załóż” with the bandage, and loads” (renamed, extended to `equip`), and the cases added to `CRAFTED` read by „a crafted document of the current version is refused whole as shape”; the `VERB_PLACES` loop now refuses moss, fiber and berry as targets of „Załóż”. None weakened an expectation.
- Rewritten document: `walkToCampfire` 10 → 6 with `equip: 4` keeps the sum 212; Understanding gains `equip` and `emptyPlace`; `ruleStarts` gains `7: 1`. Each change has its reason in the data/requirement (the new kind and the turn of „Załóż”), per `guidelines/testing.md` „Changing an existing test”.
- Code passing a test without the requirement: none found — no branch or value in `combat.ts`, `program.ts` or `saved-game.ts` keyed to a test's input.
- Reserved choice: none taken.
- Size rule (D-425): `tests/quality/test_function_and_file_size.py` passes.
- Executor's own-work check: the weakest requirement it names (turn reads the gear the turn before left; one rule per turn) is the one the slice most likely breaks; its test `each turn starts one rule…` would catch it (executor's mutation; my Stryker run below agrees nothing in that path survives).

## Checks run

| Command | Exit |
|---|---|
| `npm test -- tests/sim/gear-combat-wear.test.mjs` | 0 |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 |
| `npm test -- tests/sim/discovery.test.mjs` | 0 |
| `npm test -- tests/sim/data.test.mjs` | 0 |
| `npm test -- tests/sim/rule-signs.test.mjs` | 0 |
| `npm test -- tests/sim/encounters.test.mjs` | 0 |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 |
| `npm run typecheck` | 0 |
| `npm test -- tests/sim/{gear-combat,gear-wear,gear-condition,gear-acts,run-record,program,combat}.test.mjs` (each) | 0 each |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 |
| `npx eslint` on the 7 changed source and test files | 0 |
| `npx prettier --check` on the 8 changed files | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 1 — 2 errors, both `tests/view/character-screen.test.mjs:134` and `:400` (D-446, D-445 quotations), in the known category of test citation errors Slices 4, 4b, 18 fix; none in this slice's files |
| Probe (worktree of head): `exchange()` refusing a null turn, `npm test -- tests/sim/saved-game.test.mjs` | 1 — 1 failing („a game state the simulation made loads back…”); log `reports/review-8-probe-null-action.log` |
| Probe (worktree of head): `currentActivity` refusing `equip` going on (`isTurnAction` for `isCombatVerb`), `npm test -- tests/sim/saved-game.test.mjs` | 1 — „each place of an action holds „Wytwórz”, „Opatrz” and „Załóż”…” fails; log `reports/review-8-probe-equip-going-on.log` |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/combat.ts:122-160,src/browser/sim/program.ts:527-536,src/browser/sim/saved-game.ts:326-342,src/browser/sim/saved-game.ts:709-712,src/browser/sim/saved-game.ts:754-777"` (worktree of head) | 0 — score 91.35 %; log `reports/review-8-stryker.log` |

Classification of the surviving mutants (`guidelines/testing.md` „Mutation testing”):
- `combat.ts:132` `if (put === null)` → `false`, and `combat.ts:133` string (no coverage): unreachable guard — the pick takes „Załóż” only where `equipRefusal` is null, so `equipped` is never null there; equivalent.
- `combat.ts:137` `if (!effect)` → `false`, and `combat.ts:138` string (no coverage): unreachable guard, pre-existing; equivalent.
- `combat.ts:146` `damage > 0` → `true` / `>= 0`: the strike and the kick always deal more than 0; pre-existing logic moved into the branch; equivalent.
- `saved-game.ts:328-330` `true` → `false` in `COMBAT_VERBS`: read only through `Object.hasOwn`, the value is never read; equivalent.
No real gap.

Not run: the full `npm test` (the cycle's own run), `python -B .the-way/instruction-files/check_instructions.py` (not touched by the slice; the cycle's full run).

## Reaches beyond the dispatch

- `src/browser/view/combat-line.ts:25-80`, `src/browser/view/scene-picture.ts:180-210`, `src/browser/sim/game.ts:150-185`, `src/browser/sim/run-record.ts:1-40`, `src/browser/view/judging-cache.ts` (grep) — the consumers of a turn's action and of the minute kinds, to see whether `equip` in a turn breaks any of them (none throws; the words are Slice 12's).
- `src/browser/sim/program.ts:360-680` — `equipRefusal`, `equipped`, `actionRefusal`, `judgeProgram`, `chooseCombatRule`, to judge the combat pick.
- `git show main:src/browser/sim/saved-game.ts` — to check the exception for rewriting the document without raising the version (main is at 10).
- `foundations/decisions.md` D-458 (12803-12816), D-459 (12818-12831) whole; `foundations/glossary.md` combat turn (174-178) and Understanding (123-128).

## Working copies

- `.runs/review-8/head` — a detached worktree of `04a81323` with `.the-way` initialized and `node_modules` as a junction to the task worktree's; used for the two probes and Stryker. The junction was removed as a link first (the target `node_modules` checked intact), then the worktree with `git worktree remove --force` and `git worktree prune`; the directory `.runs/review-8/` was removed. Kept in `reports/`: `review-8-probe-null-action.log`, `review-8-probe-equip-going-on.log`, `review-8-stryker.log`. The reviewed worktree's tracked files, index and branch are unchanged (`git status --short` empty).

## Unread material

- `foundations/part_map.md:34-65` (simulation): not read.
- `foundations/decisions.md` D-310 (10254-10288): not read.
- `foundations/invariants.md` `rule-state-from-pick` and `save-version`, D-140, D-143, D-144, D-309: read whole.
- `tests/sim/saved-game.test.mjs`: read 78-104, 385-470, 1560-1600, 1860-1885, 3130-3210 and 3360-3400 and the whole diff; lines 1-77, 740-1093 beyond the diff and 2885-2910 beyond the diff were not read whole; the rest of the file only searched.
- Guidelines `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-saved-game.md`, `guidelines/testing.md`: read whole.
- `task_frozen.md`: read 30-42, 137-141, 272-277.

## Searches not found or unclear

- `tests/sim/discovery.test.mjs`: no test of the first wolf attack (searched `attacked`, `wolf`: no hit) — the plan's Goal names it as taking „Załóż” and „Puste”; those assertions stand in `tests/sim/encounters.test.mjs` (changed at the base commit) and `tests/sim/data.test.mjs`.
