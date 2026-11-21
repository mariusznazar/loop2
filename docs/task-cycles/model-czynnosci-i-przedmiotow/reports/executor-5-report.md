Status: done

# Executor 5 report — slice 5, every item of the data has its own words, in the simulation

Base `9976d7366ec6f72ea22500771d395ddaf53f5245`; one commit on `task/model-czynnosci-i-przedmiotow`: `38c61d4c`.

## Files changed (added / removed lines)

| File | + / - | Sort (*To do* 14) |
|---|---|---|
| `src/browser/sim/data/items.ts` | 36 / 9 | one-time for the model |
| `src/browser/sim/program.ts` | 13 / 8 | one-time for the model |
| `tests/invariants/test_content_identifiers.py` | 42 / 10 | one-time for the model |
| `tests/sim/data.test.mjs` | 15 / 2 | one-time for the model (not in the slice's *Change*; see "Reaches beyond the handoff") |

## What was made

- `items.ts`: `ItemDef` gains `name`, `plural`, `icon`, `iconTitle`. The four items take them from their resource rows through `wordsOf(resource)`, which reads `RESOURCES[resource]`; no word stands twice. The rows live in `ITEM_ROWS` (`as const satisfies Record<ResourceId, ItemRow> & Record<string, ItemRow>`), `ItemId = keyof typeof ITEM_ROWS`, `ITEMS: Record<ItemId, ItemDef> = ITEM_ROWS`. `RESOURCES` and `resources.ts` are untouched. The comment that said the items are the resources of Las is gone.
- `program.ts`: `thingName` is split into `itemName(item)` (reads `ITEMS`) and `resourceName(resource)` (reads `RESOURCES`). „brakuje {ile} × {rzecz}” and „brak opału: {rzecz}” use `itemName`; „tu nie leży”, „nie znasz miejsca, gdzie leży” and „leży już tutaj” use `resourceName`. Nothing the player reads changes.
- `test_content_identifiers.py`: kind `item` added to ENTRIES (four rows), `("items.js", "ITEMS", "item")` added to the tripwire's COLLECTIONS, docstring worded as row 13 words the invariant; controls: an item added or renamed in the data goes unseen by ENTRIES (tripwire control), and a new case `test_control_the_scan_flags_a_view_file_naming_an_item` (a view file naming each of the four items by identifier and by name is flagged as an *item*; an item no resource is, a made-up `bandage`, is flagged by identifier and name).
- `data.test.mjs`: the case "the items are the four resources of Las, with their words and their uses" expects each item row with its name, plural forms, icon and icon title written out as literals; the case "every item … names an item of the data" compares the four words, not only the name, with the resource row.

## Checks (command, exit code)

- First failing run of the invariant's check for an item: ENTRIES with its four `item` rows removed (the rest of the new test in place), `npm test -- tests/invariants/test_content_identifiers.py` — exit 1, `FAILED (failures=10)`: `test_control_the_scan_flags_a_view_file_naming_an_item` failed for each of the eight words ("the scan does not flag the item 'fiber' in a view file", …), `test_control_the_tripwire_fails_on_an_entry_not_written_out` failed ("a renamed item goes unseen"), `test_tripwire_every_data_entry_is_written_out` failed ("the data gives the item 'stick' named 'patyk', which ENTRIES … does not hold", four of them). The rows were restored before the commit.
- `npm run typecheck` — exit 0 (it first failed with TS7022/TS2456 circularity when the rows were checked against `ItemDef` itself; see choices).
- `npm test -- tests/invariants/test_content_identifiers.py` — exit 0, 5 tests OK (the passing run of the same command).
- `npm test -- tests/sim/rule-signs.test.mjs` — exit 0, 40 pass.
- `npm test -- tests/sim/data.test.mjs` — first run exit 1 (the case with `deepEqual` on `ITEMS.stick` etc. expected rows without the new words; cause is in the requirement: the item row now holds the words); after changing that test, exit 0, 37 pass.
- `npm test -- tests/sim/campfire.test.mjs` — exit 0, 35 pass.
- Beyond the named checks, on the code I touched: `npm test -- tests/sim/program.test.mjs` exit 0 (19 pass), `npm test -- tests/sim/program-counts.test.mjs` exit 0 (11 pass).
- `npx prettier --check` on `items.ts`, `program.ts`, `data.test.mjs` — passes; `npx eslint` on the same three — exit 0; Ruff `format --check` and `check` (`ruff.toml`, with the main checkout's `.runs/quality-venv` tool, since this worktree has none) on `test_content_identifiers.py` — pass.
- `node tests/quality/eslint-size-rules.mjs` — "0 functions and files over a threshold in 338 files", exit 0.
- Not run: the full gate (`npm test` with no argument) and `foundation_check.py`, per the handoff.

## Own-work check

Requirement most likely missed: "Nothing the player reads changes", together with "a reason that names an item reads the item's row, a reason that names a resource on a map keeps reading the resource's row". Check: a script in `.runs/executor-5/check.mjs` against the built `dist`, calling `actionRefusal` on a hand-made run view (empty tiles, empty backpack). Rows as they are: „brakuje 1 × jagoda” / „tu nie leży jagoda” / „nie znasz miejsca, gdzie leży jagoda”. After renaming `ITEMS.berry.name`: only „brakuje 1 × ITEMNAME” changed. After renaming `RESOURCES.berry.name` instead: only the two resource reasons changed. The existing cases of `rule-signs.test.mjs`, which check the reasons' words, pass. The script is ad hoc (removed); I added no permanent test for the row each reason reads, because the slice's *Change* lists none and a test that lays a changed name on a row checks a decision on where the word is read, not a rule the player sees — the reviewer may want one.

Mutations considered: the tripwire `COLLECTIONS` entry for items removed (the first failing run shows the tripwire catches an item the data gives and ENTRIES lacks); a typo in an item row's field (`fuell`) and a resource with no item row (`moss` renamed) both fail the typecheck (run by hand, exit non-zero, restored); `revealedBy` naming a non-item fails at the `ITEMS` assignment.

## Choices (with the way rejected and cost if wrong)

- **Rows in a private `ITEM_ROWS`, `ItemId` read from its keys, `ITEMS` annotated `Record<ItemId, ItemDef>`.** Rejected: `ITEMS = {…} satisfies Record<ResourceId, ItemDef> & Record<string, ItemDef>` with `ItemId = keyof typeof ITEMS` — it is circular (`ItemDef.revealedBy` → `Revelation` → `ItemId`; TS2456, TS2502). Rejected: `ItemId` as an explicit union written by hand — it would not be a key of the rows. Cost if wrong: a later slice that adds the bandage adds one row to `ITEM_ROWS`, as to `ITEMS` before; nothing else. The rows are checked against a local `ItemRow` (the shape of `ItemDef` with `revealedBy` loosened to `{ kind: string; item: string }`) so the typecheck still catches an unknown field or a missing resource row; the revelation's item is checked at the `ITEMS` assignment.
- **`wordsOf(resource)` as one helper instead of sixteen field references.** Same by-reference reading as today (module-load copy of the resource row's values). Cost if wrong: none; a field added to the words is one line in the helper and in `ItemDef`.
- **Item entries in ENTRIES for all four items, beside the four resource entries.** A view file naming `stick` now yields two findings (as the resource and as the item); the check stays correct and reads as row 13 words it. Rejected: listing only items no map holds — the tripwire reads all of `ITEMS`, so the four would not be written out.
- **Plural forms are not scanned by the invariant** (it names identifiers and names only, as before).

## Reaches beyond the handoff

- `tests/sim/data.test.mjs` is changed though the slice's *Change* does not list it, while its *Checks* list it as a check that passes: it deep-compared `ITEMS.stick` and the other three with rows that had no words, so it failed by the requirement itself (the item row holds name, plural, icon and icon title). One-line mismatch of the plan and the code, adapted; the new expectations are literals.
- Read beyond the dispatch: `tests/sim/rules.test.mjs:325-380` (the S2 control, to see it does not read `items.ts`), `tests/invariants/test_content_identifiers.py` and the callers of `ItemId`/`ResourceId` by Grep (`run.ts:208`, `saved-game.ts`, `types.ts`) to be sure `ResourceId` stays assignable to `ItemId`. No foundation entry beyond those named was read.

## Test left failing that a later slice owns

None seen in the files I ran. I did not run the whole gate; a test of another file that deep-compares an item row with its old shape would fail the same way `data.test.mjs` did (grep of `tests/` for such comparisons found only `data.test.mjs`).

## Walkthrough

Alters nothing a user sees in the running product: the reasons and every name stay the same words; the change is the shape of the data and which row a reason reads.

## Working copies

`.runs/executor-5/` (copies of the test file and `items.ts` kept while I broke and restored them, the failing run's output, the ad hoc check script, the check outputs) stood in the worktree; removed before return. No worktree or clone made.

## Unread material

none (every file, entry and passage the handoff names was read whole; `testing.md` in two pages).

## Searches not found or unclear

none
