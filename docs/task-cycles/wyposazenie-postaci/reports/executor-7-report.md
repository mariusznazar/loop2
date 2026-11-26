done with concerns

# Report — executor-7, Slice 7: the action „Załóż — {rzecz}” outside combat

## Commits

- `895b1593` (branch `task/wyposazenie-postaci`, base `78fd5cbf`).

## Files changed (added / removed lines)

- `src/browser/sim/types.ts` +2 · `src/browser/sim/data/actions.ts` +18 · `src/browser/sim/data/items.ts` +3/−2 ·
  `src/browser/sim/program.ts` +56/−1 · `src/browser/sim/run.ts` +11/−2 · `src/browser/sim/programs.ts` +1 ·
  `src/browser/sim/understanding.ts` +4/−1 · `stryker.config.json` +1 · `tests/sim/gear-wear.test.mjs` +477 (new) ·
  `tests/invariants/test_program_closed_lists.py` +5/−3 (outside the slice's *Change*, see Reaches).
- `src/browser/sim/run-record.ts` needed no change: `MINUTE_KINDS` is the data's actions with no combat effect, so `equip` is a kind of its own there with nothing written (the test `its game minutes count as a kind of their own…` shows it).

## What was made

- Action kind `equip` (`{ kind: "equip"; item }`), data row `ACTIONS.equip`: label „Załóż”, group `foodAndCombat` placed after `dodge` (last of the group), status „Zakłada”, 1 minute, `itemTargets: { property: "fits" }` (`TargetProperty` gained `fits`, so the targets are the items whose row holds `fits`: stick and bandage today), `revealedBy` the first wolf attack, `alsoInCombat: true` (new optional field of `ActionDef`, the data mark for Slice 8; nothing reads it yet), icon `gloves` / „Gloves icon” (F33; the file comes with Slice 9).
- `program.ts`: `equipSlot` (first empty slot of the item's place; the one slot of a single-slot place when none is empty; none for a full multi-slot place), `equipRefusal` (slot state before the lack: „kieszenie pełne”, „już założone: {rzecz}”, „brakuje 1 × {rzecz}”), `equipped` (the gear and backpack after the move, null where it cannot); `worldRefusal` takes `equip`. `equipped` and `equipSlot` are exported for Slice 8's combat code.
- `run.ts`: `equip` in the minutes of `startActivity`; `landUse` moves the piece at the action's end (D-142), nothing changes where the end no longer allows it.
- `programs.ts` (check) and `understanding.ts` (repertoire and „jeszcze nieodkryte: {rzecz}”) treat `equip` as `tend` and `craft`.

## Checks (command, exit code)

- `npm test -- tests/sim/gear-wear.test.mjs` written first, failing: run before `equipSlot`/`equipped`/the check wiring existed (data row and types stubbed so it reaches the assertions): pass 6, fail 10, non-zero exit (the pipe through `grep` hid the exit code; the 10 failures were assertions: empty `mainHand` where `stick` expected, `null` refusal where „brakuje…” expected, etc.). After the code: exit 0, pass 16.
- `npm test -- tests/invariants/test_program_closed_lists.py` first run after the code: exit 1 (the tripwire: the data lists `equip`, the test did not); after writing `equip` into `ACTION_KINDS` and `VALID`: exit 0.
- Exit 0: `npm test -- tests/sim/actions.test.mjs`, `…/program.test.mjs`, `…/repertoire.test.mjs`, `…/run-record.test.mjs`, `…/action-targets.test.mjs`, `tests/invariants/test_action_in_progress.py`, `tests/quality/test_mutation_test_selection.py`, `tests/quality/test_node_test_selection.py`, `npm run typecheck`.
- Also exit 0: all other `tests/sim/*.test.mjs` and all `tests/balance/*.test.mjs` (one run per file), `npx eslint` on the touched files, `node tests/quality/eslint-size-rules.mjs` (0 over), `npx prettier --check src/browser/sim tests/sim/gear-wear.test.mjs stryker.config.json`.
- Foundation check `python -B .the-way/elements/common/foundation_check.py`: exit 1, 2 errors, both in `tests/view/character-screen.test.mjs` (D-445, D-446 quotations), neither mine; no `decision:` line of my files errs.
- Not run: the full suite / `npm test` without a file (boundary); `tests/invariants/test_icon_credits.py`, `tests/invariants/test_icon_file_content.py` (Slice 9's); `ruff` (the `.runs/quality-venv` does not exist in this worktree; the Python edit is two list entries and a docstring rewrap under 100 columns).

## Failing tests after the slice, and their result on the base `78fd5cbf`

| Test file | Fails after | On the base | Cause |
|---|---|---|---|
| `tests/sim/data.test.mjs` (4 tests: groups, skill pairs, what an event reveals, one row each) | yes | pass 45/45 | `equip` in the data; announced in the Goal, repaired by Slice 8 |
| `tests/sim/saved-game.test.mjs` (19 tests) | yes | pass 49/49 | the kinds of the record; announced, Slice 8 |
| `tests/sim/encounters.test.mjs` (2 tests: the first attack's discovery) | yes | **already failing, the same 2 tests** (since Slice 6: `emptyPlace` in the discovery) | now also `equip` in the discovery; Slice 8's *Checks* hold this file |
| `tests/view/icons.test.mjs` | yes | pass 45/45 | the icon file `gloves`; announced, Slice 9 |
| `tests/view/program-editor.test.mjs`, `tests/view/rule-editor.test.mjs` | yes | failing since Slice 6 (announced) | Slices 13, 14 |
| `tests/view/account-screen.test.mjs`, `tests/view/end-window-game.test.mjs` | yes (all tests that draw the credits: `credit-lines: no credit for the icon gloves`) | not run on the base; at the base the action has no `gloves` row, so the cause cannot exist there | **not announced in the Goal**; the same cause as `icons.test.mjs` (the action's data row names an icon the credits lack), repaired by Slice 9. Other view files that draw the credits probably fail alike; I ran only the 18 view files that mention actions. |

`tests/sim/discovery.test.mjs` passes (the plan expected it failing until Slice 8; it did not break).

## Own-work check (section 3)

- Requirement most likely unmet: „the first wolf attack reveals it” (row 22, F17) is held by no test of this slice (discovery/data tests are Slice 8's), so a wrong `revealedBy` would stand unseen. Check: the probe `reports/executor-7-probe.mjs` (run with `node` from the worktree root over the built `dist`) calls `discover(newUnderstanding(), run, run, [attacked wolf])`: result `actions: ["strikeWithStick","kick","dodge","equip"]`, `conditions: ["healthBelow","opponentHealthBelow","emptyPlace"]`, and a second attack reveals nothing. Right.
- Mutation in my head (no Stryker, simulation file: the reviewer runs it): `slots.length === 1` dropped (a full pocket row would swap) is caught by the „kieszenie pełne” cases; `backpack[held] += 1` dropped is caught by the full-backpack swap; the order of the two state reasons vs the lack by the three „już założone”/„kieszenie pełne” cases with an empty backpack; the first-empty-pocket choice by the four pocket cases; the end-time guards by the unchanged-state test. Equivalent mutant: removing `case "equip"` from the minutes switch of `startActivity` (the default is `BALANCE.waitMinutes`, also 1) changes nothing observable. Unprotected: the words „Zakłada”, the icon name and `alsoInCombat` are constants no test of this slice reads (Slices 9, 12, 8 do).

## Walkthrough (`walkthrough.md`)

Not walked. The change alters no screen by itself: the action reaches the player only through the first wolf attack, and the places where the player sees and picks it (the program editor's pick, the rule panel, „Teraz”, the chronicle) are Slices 12–14, whose tests already fail on the base for that reason. Walking the browser now would walk a screen the plan leaves incomplete. Cases left unchecked: the pick after the first attack, the row in the editor („1 min”, no price). Side observation: the credits screen throws `credit-lines: no credit for the icon gloves` for every page that draws it until Slice 9 (see the table).

## Choices

- Action kind name `equip`, item field `item` (like `tend`, `craft`), so `ItemAction` and `checkTarget` take it unchanged. Rejected: a name like `putOn`; no cost either way.
- **„już założone” also where the backpack holds another piece of the same item** (a stick in the hand and one in the backpack): refused, following the task (*To do* 5, „gdy miejsce już ją trzyma”) and D-380 (state reasons before the lack). D-458's *Verification* example (a character with a stick in the hand and another in the backpack, „Załóż — patyk” leaving one in the hand and one in the backpack) is compatible with it (the state stays), but its first test sentence („…putting the stick the hand held into the backpack”) describes a swap that with today's data is possible only of the same item, which D-380 refuses; the swap path is tested with an overlay item (`club`, fits the main hand). Cost if wrong: one `if` (the refusal on `gear[slot] === item`) and two test cases.
- `equipped` re-uses `equipRefusal`, so the end-of-action guard is the start-of-action refusal. Rejected: a separate set of guards (two places to keep equal).
- `alsoInCombat?: true` as the name of the data mark (the Goal names none); Slice 8 may rename it at no cost.
- Test for the group order of the pick duplicates part of what `tests/sim/data.test.mjs` will hold after Slice 8; kept so the slice protects its own placement.

## Reaches beyond the dispatch

- `tests/invariants/test_program_closed_lists.py` changed (the closed-list tripwire lists `ACTION_KINDS` and the check drives `VALID`): the slice's *Checks* hold it and Slice 6 changed it the same way; not in the *Change* list.
- Read beyond the named material: `src/browser/sim/data/gear.ts`, `src/browser/sim/character.ts` (`fitsSlot`, `gearSlots`), `src/browser/sim/skills.ts` (`practiced`, `actionMinutes`), `tests/sim/craft-and-tend.test.mjs`, `tests/sim/gear-condition.test.mjs`, `tests/sim/gear-combat.test.mjs`, `tests/sim/program-fixture.mjs`, `foundations/decisions.md` D-425 (size rule), D-456, D-126 quotation in `tests/sim/action-targets.test.mjs`, `.the-way/elements/decisions/template.md` (the `decision:` line), `.the-way/task-cycle/change/walkthrough.md`; and the plan's text of Slices 8 and 9 (to leave `equipped`/`equipSlot` usable and the icon name as F33). Why: the shapes the slice joins.

## Working copies

- `.runs/executor-7/` held the loop's outputs, the probe and a detached worktree of `78fd5cbf` (`.runs/executor-7/base`, `.the-way` copied in, `node_modules` as a junction, used to run `encounters.test.mjs` on the base). The worktree was removed with `git worktree remove --force` and `git worktree prune`, the junction with `rmdir` (the real `node_modules` intact), the directory with `rm -rf` by its full path. The probe is kept as `docs/task-cycles/wyposazenie-postaci/reports/executor-7-probe.mjs`. Nothing remains.

## Unread material

- none of the named foundation entries or passages was left unread; `foundations/decisions.md` D-143 and D-309 and `foundations/invariants.md` blocks were read whole; the plan's *Read* lines of `task_frozen.md` were read in their ranges; `guidelines/testing.md` was read whole (the second page too); `guidelines/coding.md`, `coding-simulation-module.md`, `coding-content-data.md` whole.
- `F1` (D-451) read as the heading's block; F3 (D-23) and F33 read whole.

## Searches not found or unclear

- The plan names no kind identifier for the action and no name for the data mark „also in combat”: chosen as above (unclear, not blocking).
- D-458's first *Verification* test sentence (a swap of the stick the hand held) against D-380's „już założone” (see Choices).
- The plan expects `tests/sim/discovery.test.mjs` to fail until Slice 8; it passes now.
- `tests/sim/encounters.test.mjs` was not in the Goal's list of tests left failing; it already fails on the base from Slice 6 and Slice 8 holds it in its *Checks*.
