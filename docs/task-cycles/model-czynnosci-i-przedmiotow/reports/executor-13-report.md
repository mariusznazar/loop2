done with concerns

# Executor 13 — report (slice 13, the program editor offers the two verbs and their targets)

Base `ef87d9e66db01e0dbbec639b5f9851e0897e27c8`; one commit on `task/model-czynnosci-i-przedmiotow`: `16a720e2`. The worktree is clean.

The concerns are two things outside this slice, named below: a `decision:` line of `tests/view/rule-editor.test.mjs` that the foundation check still reports, and one case of that file that fails (both owned by the panel's slice, not in this slice's *Change*).

## Files changed

| File | Added / removed | Part | Why |
|---|---|---|---|
| `src/browser/view/item-target-pick.ts` (new) | +99 / −0 | (1) one-time for the model | The pick of an item target, the words of its cells (price in brackets, capitalised name), the time of a target, the known targets of a verb, the price text moved out of `program-editor.ts`, `namesItem`, `targetName`. Nothing in it names the bandage. |
| `src/browser/view/program-editor.ts` | +75 / −36 | (1) one-time for the model | The branches for an action that names an item: `withActionItem`, `actionTargetPick`, `ruleFields`, `actionPick`'s reason, `actionTime`/`actionPriceText` with a target, `actionSentence`, `actionFieldValue`. The −36 is `targetName` and the price formatting moved to the new module. |
| `tests/view/program-editor.test.mjs` | +338 / −6 | (1) for the cases of the shape (second item, the verbs' kinds, the target pick, the pick's five groups); (2) for the cases that name the bandage („Opatrunek”, its price by shape) | One file counts once, in (1), as it is changed for both. |

D-425: `node tests/quality/eslint-size-rules.mjs` printed `0 functions and files over a threshold in 342 files` (exit 0). `program-editor.ts` grew by its branches alone; the price formatting and `targetName` left it for the new module.

## What was made

- **Item-target module** `item-target-pick.ts`: `targetName`, `namesItem` (type guard on the action), `priceText(price)` (the formatting `actionPriceText` had), `knownTargets(state, kind)` (items of `itemTargets(kind)` the Understanding holds, data order), `itemTargetTime(state, kind, item)` (the recipe minutes of the target through `actionMinutes` for the character of a map run; null where the verb's time is its own), `itemTargetPick(state, held)` (each held-or-known target of the verb, in `ITEMS` order, label „Opatrunek (2 mchy)”, held-but-unknown greyed with no reason). Nothing is listed by name: the targets come from `itemTargets`, which reads the property the action's row names.
- **`program-editor.ts`**: `actionPick` greys an item verb whose `knownTargets` is empty with `PICK_REASONS.noTarget`, after the branch reason; `ruleFields` adds `actionTarget` for an action that names an item; `actionTargetPick` gives the item pick; `withActionItem(program, groupId, index, item)` changes the rule's target and returns null when unchanged, when the action names no item, or when the item is not among `itemTargets(kind)` (so every program built passes the program check); `actionSentence` reads „Wytwórz — Opatrunek”; `actionTime(state, kind, item?)` and `actionPriceText(state, kind, item?)` take the target as an optional third argument, so `rule-panel.tsx` and `rule-list.tsx` compile unchanged; `actionFieldValue(state, action)` is the new function for Slice 14: the verb, its target and its price („Wytwórz — Opatrunek (2 mchy)”), and for an action with no item target the name of its cell. The cells of „Wytwórz” and „Opatrz” in the pick need no code: `actionPrice` with no item gives nothing, so the cell has no price, and `actionTime` gives „Wytwórz” no time and „Opatrz” its own.
- **The group order** („Opatrz” right after „Zjedz — jagoda”, „Wytwórz” in „Wytwarzanie”) was already in `actions.ts` from an earlier slice; this slice's test now holds it.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Failing cases first (target pick, second item, greying, sentence, fields, time and price, field value) | `npm test -- tests/view/program-editor.test.mjs` before the code, with stubs of `withActionItem`, `actionFieldValue` and `itemTargetTime` | 1 | 7 failed, each on its assertion (the verbs stood open with no reason, the target pick was null, the sentence read „Wytwórz”, `ruleFields` lacked `actionTarget`); the 3 cases that failed before the change (the kinds, the five groups, the stock list) passed with the updated expectations |
| Same file after the code | `npm test -- tests/view/program-editor.test.mjs` | 0 | 63 pass, 0 fail |
| Foundation check, citations | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1 | `tests/view/program-editor.test.mjs` no longer reported; 13 errors remain in other files (below) |
| Typecheck | `npm run typecheck` | 0 | |
| ESLint | `npx eslint` on the three files | 0 | |
| Prettier | `npx prettier --check` on the three files | 0 | |
| Size rules | `node tests/quality/eslint-size-rules.mjs` | 0 | 0 over a threshold |
| Size test | `npm test -- tests/quality/test_function_and_file_size.py` | 0 | 2 tests OK |
| Beyond the section (tests of the code I touched) | `npm test -- tests/view/program-panel.test.mjs` | 0 | 60 pass |
| | `npm test -- tests/view/discovery-rule.test.mjs` | 0 | 18 pass |
| | `npm test -- tests/view/rule-editor.test.mjs` | 1 | 75 pass, 1 fail — see below |

The 13 errors the foundation check still reports are not in a file of this slice: `tests/sim/action-targets.test.mjs:381`, `tests/sim/craft-and-tend.test.mjs` (9 lines), `tests/sim/previous-programs.test.mjs:574` and `tests/view/rule-editor.test.mjs:1528`. The last quotes „four named groups” of D-290 — the same fault as the one this slice fixed in `program-editor.test.mjs`, but `rule-editor.test.mjs` is not in this slice's *Change*; Slice 14 (the panel) owns it, and its case „the actions stand in the groups Ruch, Zbieranie, Ogień, Żywność i walka, each with its icon and the time of one execution beside it” fails for the same reason (it expects four groups). I did not touch it.

The decision lines of `program-editor.test.mjs` I changed: the D-290 line now quotes „The pick of the rule panel sets the actions in five named groups” (the form `tests/sim/data.test.mjs:206` already quotes, a beginning of the sentence of D-290 as the log holds it); the acceptance-criterion case quotes the first sentence of D-443 whole, „An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data.” (read from `foundations/decisions.md:8157`).

## Own-work check (WAY-164)

The requirement most likely not met: the acceptance criterion, its editor part — an item that gets a recipe and a healing property from the data alone becomes a target of both verbs in the editor with no code change, and moss of neither. The check is the case „a second item with a recipe and a healing property becomes a target of both verbs…”: it lays `ITEMS.splint` (a recipe of three sticks and 15 minutes, a healing property) over the built `ITEMS`, removes it in a `finally`, and asserts the pick of both verbs holds it (labels „Szyna (3 patyki)”, „Szyna (1 szyna)”), the verb takes the first known target in data order, `withActionItem` moves between targets and refuses moss, the sentence, field value, time and price follow its row, moss is in no pick, and after removal the pick is the bandage alone. It passed. It also passes only with code that reads the targets from the data: the module names no item, and `grep` of `item-target-pick.ts` for „bandage”, „moss” shows none.

Mutations I weighed against the tests: `withActionItem` without the `itemTargets` check (caught: moss and stick refused, and the setProgram case would fail); `ruleFields` without `namesItem` (caught); the no-target reason missing or applied to a verb that has a target (caught by the greying case, with moss-only and empty Understandings and a map run); `actionTime` applying a target's minutes to an action that does not take them (caught by `actionTime(outside, "gather", "bandage")`); `itemTargetPick` dropping the held-but-unknown target (caught: the held `tend` bandage stays, greyed). Not caught, and I judge not worth a test: the price of an item target following the skills of the character of a map run (no branch today lowers a price of either verb).

## Walkthrough (`walkthrough.md`)

The change alters what the rule panel shows through functions it already calls: the pick of „Wytwórz” and „Opatrz” greys with „nie znasz jeszcze celu”, a rule of either verb now has a field of its target (`ruleFields`, `actionTargetPick`), and its sentence reads „Wytwórz — Opatrunek”. What the panel draws of the action field's value and the time beside a target is Slice 14's. I made no walk in a browser: the handoff says a state check by code and tests is what the plan asks of this slice, and the action field's value is not drawn until Slice 14. Plan of cases, all unchecked in the running product, for that reason:

| Case | By what | Verdict |
|---|---|---|
| The action pick holds „Wytwórz” in „Wytwarzanie” and „Opatrz” after „Zjedz — jagoda”, greyed where no target is known | a screen in a browser | unchecked; held by the cases of `program-editor.test.mjs` and `program-panel.test.mjs` (60 pass) on the real functions |
| A pick of either verb moves on to a field of its target with the targets and their price | a screen in a browser | unchecked; the functions and the field order are tested, the panel's drawing of the value is Slice 14 |
| Side observation | | the `rule-editor.test.mjs` case above fails on the old four-group expectation; nothing else seen |

What I did not check: the panel in a real browser; the chronicle, „Teraz” and the rule list rows for a rule of either verb (they take `actionSentence`, tested here, and `actionTime(state, kind)` which gives „Wytwórz” no time until Slice 14 passes the target).

## Reaches beyond the dispatch

- `tests/view/rule-editor.test.mjs` (the failing case and the `decision:` line of 1528), `tests/sim/data.test.mjs:206` (the quotation of D-290 that I copied the form of), `src/browser/view/rule-panel.tsx:150-260` and `:360-400`, `:505-545`, `src/browser/view/discovery-rule.ts:95-130`, `src/browser/sim/understanding.ts`, `src/browser/sim/action-targets.ts`, `src/browser/sim/skills.ts:70-110`, `src/browser/sim/run.ts:140-170` — read to see how the panel calls the functions I changed and how the simulation computes the minutes of „Wytwórz”, so that the signatures and the minutes agree. `foundations/decisions.md:8150-8175` (D-443) and `:9665-9691` (D-290) were in the handoff's list; I read the first sentence of D-443 there for the quotation. `.the-way/task-cycle/change/slice.md` and `walkthrough.md` were read as the method gives.
- `tests/sim/understanding-fixture.mjs` (read whole) for the full Understanding the cases build on.
- Test-side data: `ITEMS_LISTED` of the editor test now holds `"bandage"` (the list is a list of the items the editor is given, written out).

## Choices and the way rejected

- **`priceText` and `targetName` moved to the new module, `program-editor.ts` imports them.** Rejected: leaving them in `program-editor.ts` and importing them back into the new module (a runtime cycle between the two files). Cost if wrong: none for callers, `actionPriceText` and the other exports stay where the panel and tests import them.
- **`item-target-pick.ts` imports `PickCell` from `program-editor.ts` as a type only** (no runtime cycle). Rejected: moving the type to the new module and re-exporting it (changes where nine importers find it).
- **`withActionItem` returns null for an item outside `itemTargets(kind)`**, not only for an unchanged one. The program check refuses such a program (D-443), so the editor never builds it; the cost if the plan wanted the check left to `setProgram` alone is one branch.
- **`actionFieldValue` returns the cell's label (the verb with its price) for an action with no item target**, so Slice 14 can call it for every action. Rejected: returning null for them (Slice 14 would branch).
- **The bandage price in the tests by shape** (`BANDAGE_PRICE` is a pattern holding the row's count and a form of „mech”), as `9e867128` did for the data test; exact words and numbers stand on the laid-in item (`Szyna (3 patyki)`), whose row the test writes. „Opatrunek (1 opatrunek)” is exact: one piece is D-443's price of „Opatrz”.

## Problems

- A command of mine, `git stash push -u`, ran against the shared stash stack when I tried to read the foundation check at the base; I applied the entry at once by its hash and dropped it by its tag. The stash stack was empty before and after; the three files were intact (checked by `git status`) and the test results above were obtained after.

## Sorting of the changed files (*To do* 14)

See the table at the top: `item-target-pick.ts` and `program-editor.ts` are (1) one-time for the model; `tests/view/program-editor.test.mjs` is counted once, in (1), being changed both for the shape (second item, kinds, target pick, five groups) and for the bandage's words (2).

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1–400 of 1216 whole and the rest searched with `Grep` for `program-editor`, `Wytwórz`, `ruleFields`, `actionSentence`, `actionTime`, `item-target` (no match). The remaining 800 lines are about the stylesheets, the scene and the other screens; this slice changes no stylesheet and draws nothing.
- `guidelines/testing.md`: read whole (two pages).
- `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md`, `spec.md`, the foundation entries D-293, D-363, D-289, D-306, D-291 and `foundations/part_map.md`: not opened by me; I worked from the passages the handoff copies word for word (To do 7–9, the acceptance criterion, Decision 1, Decision 3 unit 7) and D-290 and D-443 read from the log. D-293, D-363, D-289, D-306 and D-291 as the handoff names them were not read whole; their rules reach me through the copied passages and the existing tests' `decision:` lines.
- `src/browser/sim/program.ts` read lines 1–180 (the part `actionPrice` stands in), not the rest of its 539 lines.

## Searches not found or unclear

- none for the code. One thing unclear: the handoff says the `decision:` line at `tests/view/program-editor.test.mjs:1058` must quote „the sentence as the log now holds it”; the sentence of D-290 is one long sentence listing the five groups, so I quoted its beginning („The pick of the rule panel sets the actions in five named groups”), as `tests/sim/data.test.mjs:206` already does; the foundation check accepts it (no error for the file).

## Working copies

`.runs/executor-13/` held the commit message and the outputs of the red and green runs; I removed it (`rm -rf` by its full path) before returning. No other copy was made.
