done with concerns

# Executor 7 report — slice 7, the bandage, „Wytwórz” and „Opatrz” enter the data and the types

Base `19903a2929ca198981adfd0759555f28580cae80`. One commit: `760def64` (`feat: :sparkles: add the bandage and the verbs „Wytwórz” and „Opatrz” to the data and the types ...`). The worktree is clean.

## Files changed (added / removed lines)

| File | + / - | Sorted as |
|---|---|---|
| `src/browser/sim/data/items.ts` | 38 / 3 | one-time for the model: the `recipe` and `healing` fields, the type `TargetProperty`, the widened `ItemRow`; for the bandage alone: the `bandage` row (its words, icon, revelation, the numbers 2 moss / 10 min / 25) |
| `src/browser/sim/data/actions.ts` | 39 / 3 | one-time for the model: `ActionMinutes`, `itemTargets`, the group „Wytwarzanie”, the rows `tend` and `craft` |
| `src/browser/sim/data/revelations.ts` | 2 / 0 | one-time for the model: the revealing event `crafted` |
| `src/browser/sim/types.ts` | 3 / 1 | one-time for the model: the kinds `craft` and `tend` |
| `src/browser/sim/action-targets.ts` (new) | 29 / 0 | one-time for the model |
| `src/browser/sim/program.ts` | 12 / 0 | one-time for the model: the refusals of both verbs |
| `src/browser/view/program-editor.ts` | 15 / 1 | one-time for the model: `withActionKind` with `items`; `actionTime` returns null for a time the target holds |
| `src/browser/view/rule-panel.tsx` | 1 / 0 | one-time for the model |
| `src/browser/view/discovery-rule.ts` | 19 / 4 | one-time for the model; outside the slice's *Change* list, see Reaches |
| `src/browser/view/scene-picture.ts` | 8 / 1 | one-time for the model |
| `guidelines/coding-simulation-module.md` | 1 / 0 | one-time for the model: the row of `action-targets.ts`, status `copy` |

Only the `bandage` row of `items.ts` (and the three numbers in it) is for the bandage alone; every other change serves the next item made by a recipe or with a healing property too.

## Checks

| Command | Exit |
|---|---|
| `npm run typecheck` | 0 |
| `npm test -- tests/sim/rule-signs.test.mjs` | 0 (40 pass) |
| `npm test -- tests/sim/program.test.mjs` | 0 (19 pass) |
| `npm test -- tests/sim/repertoire.test.mjs` | 0 (32 pass) |
| `npm test -- tests/view/scene-picture.test.mjs` | 0 (71 pass) |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 (2 pass) |
| `node tests/quality/eslint-size-rules.mjs` | 0 — "0 functions and files over a threshold in 339 files" (D-425 holds for every file changed) |
| `npx eslint` on the ten code files | 0 |
| `npx prettier --check` on the ten code files and the guideline | 0 |

Tests of the code I touched, one file each (the full gate was not run):

- Pass: `tests/view/discovery-rule.test.mjs`, `tests/sim/run-record.test.mjs`, `tests/sim/world.test.mjs`, `tests/sim/conditions.test.mjs`, `tests/sim/acceptance.test.mjs`, `tests/sim/first-map-balance.test.mjs`, `tests/sim/new-account-first-pass.test.mjs`, `tests/sim/traits.test.mjs`, `tests/balance/cli.test.mjs`, `tests/balance/trace.test.mjs`, and in `tests/view/`: `knowledge-lines`, `knowledge-screen`, `trip-plan`, `program-panel`, `program-list`, `discovery-band`, `now-lines`, `chronicle`, `chronicle-entries`, `scene` — all exit 0.
- Fail, each named by the plan as a later slice's: `tests/sim/data.test.mjs` (7 failing cases), `tests/sim/trip.test.mjs` (5) — Slice 9; `tests/invariants/test_program_closed_lists.py` (1: `test_programs_with_unlisted_kinds_are_refused`) — Slice 10; `tests/sim/saved-game.test.mjs` (several, the load answers `shape`) — Slice 11; `tests/view/program-editor.test.mjs` (3: the program the editor builds passes `setProgram`; the actions stand in four named groups; a known resource the map lacks stands greyed) — Slice 13; `tests/view/rule-editor.test.mjs` (1: the groups of the action pick, "stand in the groups Ruch, Zbieranie, Ogień, Żywność i walka") — Slice 15.
- Not run, expected to fail by the plan (no file, no credit for the two icons): `tests/view/icons.test.mjs`, `tests/invariants/test_icon_credits.py`, the credits, login-card and Siedziba screen tests — Slice 8.
- **Fails and the plan does not name it:** `tests/invariants/test_content_identifiers.py`, case `test_tripwire_every_data_entry_is_written_out` (1 of 5). The data now give the item `bandage` named `opatrunek`, which `ENTRIES` of that test does not hold: "add it there so that the check scans for it". I did not change the test (the slice changes none). Whoever adds `{"kind": "item", "id": "bandage", "name": "opatrunek"}` to `ENTRIES` must check the scan then finds neither word in code under `src/browser/` outside the data; this slice's code holds neither (`grep` of the diff). Which slice owns it is for the orchestrator.

No test failed written first: the slice has no test of its own (the plan says so).

## Own-work check

Requirement most likely unmet: the refusals of rows 10 and 15 (the first lacked piece of the recipe in the recipe's order; „zdrowie pełne” before „brakuje 1 × opatrunek”; 99.95 is not full), the targets read from the data, and the editor taking the first offered target. Check: a one-off script, `.runs/executor-7/check.mjs`, run on the built game with `node` (exit 0), on `actionRefusal` and `withActionKind` with a hand-made run view. It showed:

- `itemTargets("craft")` = `["bandage"]`, `itemTargets("tend")` = `["bandage"]`, `itemTargets("gather")` = `[]`; `takesItem` true for `craft` and `tend`, false for `eat` and `gather`.
- „Wytwórz — Opatrunek”: 0 moss → „brakuje 2 × mech”; 1 moss → „brakuje 1 × mech”; 2 moss → no refusal (also on an empty tile list, so it needs no revealed tile).
- „Opatrz — Opatrunek”: health 100 with no bandage → „zdrowie pełne”; health 100 with one → „zdrowie pełne”; health 99.95 with none → „brakuje 1 × opatrunek”; 99.95 with one → no refusal.
- `withActionKind(... "craft" ...)` with `items = []` → null (nothing changes); with `["stick","bandage"]` → `{kind:"craft", item:"bandage"}`; „Opatrz” likewise; „Zbierz” still takes the first resource.
- The groups in the data's order: move, gather, fire, foodAndCombat, crafting; `tend` stands in `ACTIONS` right after `eat`.

The script lives in the working directory below and is not committed.

## Choices (with the way rejected and the cost if wrong)

1. **Data shape of a verb's targets and time.** `ActionDef` gains `itemTargets?: { property: "recipe" | "healing" }`, and `minutes` becomes `ActionMinutes = number | null | { fromTarget: "recipe" }`; `null` still means the step of a tile. „Wytwórz” has `minutes: { fromTarget: "recipe" }`, „Opatrz” has `minutes: 10`. Rejected: a second optional field `minutesFrom` beside `minutes: null` (it would give `null` a second meaning, which the spec forbids). Cost if wrong: a rename of two fields and their few readers.
2. **Order of the rows in `ACTIONS`.** `tend` right after `eat` (the spec); `craft` at the end, after `dodge`, so that each group's rows stay together in the data's order. Rejected: `craft` right after `tend` (it breaks the contiguity of the groups in the file). Cost if wrong: the order of the actions in a discovery and in the record's keys; a later test with a fixed order would need the other place.
3. **`ItemDef.recipe.uses` is `readonly`**, and `ItemRow` repeats the recipe with `item: string` to avoid the type cycle that `ItemId` read from the keys would make, as `revealedBy` already does. Cost if wrong: none beyond the types.
4. **`worldRefusal` for `craft` reads `ITEMS[item].recipe!`** (a non-null assertion, as `firstItemFor` does): a `craft` action whose item holds no recipe cannot pass the program check (Slice 10), so the case is unreachable once the check lands. Rejected: a refusal text for it (no wording is settled). Cost if wrong: a thrown error on a hand-built, unchecked action.
5. **„Zdrowie pełne” is `run.body.health >= BALANCE.body.startHealth`**, the cap the data gives (D-387 / `body.ts` caps health at it).
6. **`actionTime` returns null for an action whose minutes the target holds** (the bare „Wytwórz” shows no time, spec Decision 3 unit 7). The time beside each target comes in Slice 13.
7. The revealing event is named `crafted` (`{ kind: "crafted"; item }`); `happened` in `understanding.ts` does not give it yet (Slice 12). The existing `gathered` branch already reveals the bandage and „Wytwórz” at the first gathered moss.

## Reaches beyond the handoff

- `src/browser/view/discovery-rule.ts`, not in the slice's *Change* list: it calls `withActionKind`, whose new required parameter `items` would otherwise break the typecheck. It now passes `offeredItems(state)` (computed once, moved above the first loop); the helper `withAction` takes `{ resources, items }`. No behaviour changes for the verbs of today; for the two new verbs „Dodaj regułę z tym” takes the first offered target. A small mismatch of the plan with the code; the alternative (an optional parameter defaulting to `[]`) would have made the discovery rule silently skip both verbs later.
- Read beyond the handoff: `foundations/environment_facts.md:204-214` (the icon titles: „Bandage roll icon”, „First aid kit icon”; the plan's rows 15 and 16 point there), `src/browser/sim/run.ts:100-240`, `src/browser/sim/understanding.ts:230-410` (to see what `happened` and the exhaustive switches need), `src/browser/sim/data/balance.ts` (grep for `startHealth`), `tests/invariants/test_content_identifiers.py:1-130`, `.the-way/task-cycle/change/slice.md`.

## Working copies

`.runs/executor-7/` (directly under the ignored `.runs/` of the worktree; the script `check.mjs` and two text outputs) — removed before return (`rm -rf` by its full path; stood at `.runs/executor-7`). No remainder.

## Unread material

- The decisions and invariants of the handoff's list (D-425, D-18, D-23, D-26, D-121, D-128, D-290, D-318, D-380, D-310, D-145, D-140, D-306; the invariants function-and-file-size, program-closed-lists, program-world-reference, simulation-inputs; `foundations/glossary.md` Understanding; `foundations/part_map.md` ranges): not opened one by one. The slice's section and the spec's Decisions 1–3, copied in the handoff, were read whole and followed; the size rule was checked by running it, not by reading D-425.
- `guidelines/styleguide-browser-view.md` and `guidelines/testing.md` (the latter is only for changing a test; I changed none): not read. The view changes touch no style, token or markup.
- `task-frozen.md`, `spec.md`: only the passages copied into the handoff.

## Searches not found or unclear

- none found missing. Unclear: which slice owns the failure of `test_content_identifiers.py` named above (the plan lists no owner).

## Concerns

- `tests/invariants/test_content_identifiers.py` fails (the tripwire for the item `bandage`), not named in the plan's list of failures.
- The program check (`programs.ts`) was not touched: both kinds stay refused there until Slice 10, so neither verb is reachable in the game, as the plan says.
