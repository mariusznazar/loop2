done with concerns

# Executor report — Slice 17 (the balance instrument runs, traces and describes the two verbs)

## Status

`done with concerns`: the slice is made and every focused check passes. One concern (the capital letter of the item's name in a description, below) wants a look from the orchestrator or reviewer.

## Commit

- `f9a9d24f` — feat: have the balance instrument describe and trace the two verbs with an item as their target (base `82d478ba`; one commit on `task/model-czynnosci-i-przedmiotow`; worktree clean after it).

## Files changed (sorting of *To do* 14)

| File | Added/removed | Part | Reason |
|---|---|---|---|
| `balance/describe.mjs` | +12 / −1 | (1) one-time for the model | The description takes any action holding an `item` as its target, whatever the item or the verb; no kind, no item named in the code. |
| `balance/trace.mjs` | +6 / −2 | (1) one-time for the model | The same for the trace: it names the item of any started action that holds one. |
| `tests/balance/cli.test.mjs` | +36 / −0 | (2) the bandage alone | The program with both verbs described uses the bandage's name and the refusal case uses `splint`, an item no data hold. |
| `tests/balance/trace.test.mjs` | +46 / −0 | (2) the bandage alone | The trace test is run on a program that crafts and dresses with the bandage. |
| `tests/balance/agreement.test.mjs` | +51 / −0 | (2) the bandage alone | The agreement program gathers moss, crafts the bandage and dresses with it. |
| `tests/balance/overlay.test.mjs` | +129 / −1 | (1) one-time for the model | The acceptance criterion's instrument part: a second item laid by an overlay becomes a target of both verbs, moss of neither. It proves that a later item is a row of data; its bandage-free content is the model's proof. |

`balance/engine.mjs` is unchanged, as the slice says.

## What was made

- `balance/describe.mjs`: `actionText` words an action holding an `item` as `<label> — <Item name>`, the name read from `ITEMS` at the call and capitalised (`Wytwórz — Opatrunek`, `Opatrz — Opatrunek`, and `Wytwórz — Szyna` for an item laid by an overlay). An item the data lack throws `describe: the data holds no item <id>` through the existing `nameOf`/`definitionOf`.
- `balance/trace.mjs`: `startText` names the item of a started rule action, by the name the data give it, as it names a resource (`start Wytwórz opatrunek`).
- No number of the game, no file written, no clock read in either file.

## Checks (command, exit code)

Failing first (code of `balance/describe.mjs` and `balance/trace.mjs` at the index, tests written):

- `npm test -- tests/balance/cli.test.mjs` — exit 1; the two new cases fail on their assertions (the description read `Wytwórz` with no target; no exception for an item the data lack).
- `npm test -- tests/balance/trace.test.mjs` — exit 1; "no line of a started „Wytwórz” with its item".
- `npm test -- tests/balance/overlay.test.mjs` — exit 1; description actual `Opatrz`/`Wytwórz`, expected `Opatrz — Szyna`/`Wytwórz — Szyna`.
- `npm test -- tests/balance/agreement.test.mjs` — exit 0 with the unchanged engine (the engine already behaves as the invariant says). So the invariant's case was **seen failing by a break**: for a moment `balance/engine.mjs` zeroed the bandage in the backpack after each step; the new agreement case failed (exit 1), and the file was restored with `git checkout balance/engine.mjs` before the commit. A first break I tried (an extra `stepMinute` after a craft) changed nothing, as stepping twice is the same sequence of minutes; I dropped it for the second.

Passing, with the code of the slice:

- `npm test -- tests/balance/cli.test.mjs` — exit 0, 25 pass.
- `npm test -- tests/balance/trace.test.mjs` — exit 0, 4 pass.
- `npm test -- tests/balance/agreement.test.mjs` — exit 0, 8 pass.
- `npm test -- tests/balance/overlay.test.mjs` — exit 0, 6 pass.
- `npm test -- tests/invariants/test_balance_instrument_file_writes.py` — exit 0, 3 pass.
- `npm test -- tests/invariants/test_balance_instrument_repeatability.py` — exit 0, 2 pass.
- `npm test -- tests/balance/progression.test.mjs` — exit 0, 13 pass (`balance/progression.mjs` imports `describe.mjs`; run beyond the section's list, as a test of code I touched).
- `npx eslint` on the six changed files — exit 0; `npx prettier --check` on them — exit 0; `node scripts/build.mjs --check` (typecheck) — exit 0.
- `node tests/quality/eslint-size-rules.mjs` — exit 0, "0 functions and files over a threshold in 343 files" (D-425 holds for the changed files).
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — exit 0, 0 errors; the full run without the flag also gave exit 0, 0 errors (so the `decision:` quotation of `overlay.test.mjs` is exact).

Not run: `npm test` with no argument and any folder of tests (the gate is not mine).

## Own-work check (section 3)

Requirement most likely not met: *Acceptance criteria* — a second item is a target of both verbs "in the instrument" with no change of code outside the data, and **moss of neither**; and the instrument "describes and runs" it. Check: `tests/balance/overlay.test.mjs` lays `SPLINT_OVERLAY` (the content a file would hold: only an `ITEMS` row, nothing of `ACTIONS`) and shows, in one case: the description reads `Opatrz — Szyna` and `Wytwórz — Szyna`; `runOnce` crafts it in 4 minutes (the overlay's own number, written out), dresses with it (`minutesBy.tend > 0`, health hurt first, the splint used up — `backpack.splint` 0); the trace starts `Wytwórz szyna` and `Opatrz szyna`; a program naming moss as the target of either verb is refused by the run with an error naming `moss`; after the restore the item is gone, every table is deep-equal to what it was, and both the description and the run of the removed item are refused naming `splint`. It showed all of this passing, and its failing run (above) failed on the description, as the unfixed code gives.

Mutations considered: dropping the `item` branch of `describe.mjs` or `trace.mjs` (caught by the cli, trace and overlay cases); a list of target items in the instrument (the overlay case would not describe `szyna`); the engine stepping the game's functions differently for a verb (caught by the agreement case, seen above); a description that accepts an item the data lack (caught by the cli and overlay cases, for both verbs).

## Walkthrough

The change alters no behaviour a user sees in the running game; the instrument is a command-line tool for the author, and its description and trace are read by the tests of `tests/balance/`. The npm command that starts the process is checked by hand, not by these tests (per the header of `tests/balance/cli.test.mjs`); I did not run `npm run balance` by hand.

## Concern and choices

- **Concern — capital of the item's name.** The plan words the description as „Wytwórz — Opatrunek” (capital), as the game's pick does (`targetName` in `src/browser/view/item-target-pick.ts`). The instrument's existing description of a resource keeps the data's name as it stands (`Zbierz — patyk`, asserted by an older test of `cli.test.mjs`). I capitalised the item's name only, following the plan's literal, which makes one description hold `Zbierz — patyk` beside `Wytwórz — Opatrunek`. The spec says "as an action with a resource is", which would give `Wytwórz — opatrunek`. Rejected: changing the resource's wording too — an older test of this file asserts it and the slice does not name it. Cost if wrong: one line in `capitalized` and the three literals of the tests. The orchestrator may decide between the two.
- The capital letter is made by a small function of `describe.mjs` (`capitalized`), since `balance/` may not import the view's `targetName` (D-351, `cross-part-imports`).
- `balance/trace.mjs` names the item with `ITEMS[action.item].name`, as it names a resource with `RESOURCES[...]`; an item the data lack in a trace is refused earlier, by the game's own check when the instrument sets the program (shown by the overlay case after the restore), so the trace has no branch of its own for it.
- The agreement case compares a program written in the test on Las — głębiej with an empty chest (`solvedMaps` `forestEdge`, `forest`); its precondition case shows that the program crafts and dresses in a map run, so the comparison is not of runs that never used the verbs.
- The cli case for an unknown item uses `splint`, which no data hold; it is also the item of the overlay case, which removes it after the run, so no case depends on the other's order.

## Reaches beyond the dispatch

- `src/browser/view/item-target-pick.ts:22` (`targetName`), read to see how the game capitalises an item target; `src/browser/sim/action-targets.ts` and `src/browser/sim/types.ts` (the shape of `Action`), `src/browser/sim/run-record.ts` (`minuteKind`, what `minutesBy` holds), `tests/sim/reference-programs.mjs` and `tests/sim/understanding-fixture.mjs` (the notation of the programs written in the tests), `tests/sim/craft-and-tend.test.mjs` (the second item of the simulation's tests, for its shape), D-443 in `foundations/decisions.md` (to take the exact words of the quotation). Reason: the section names no file of the editor, the notation or the fixtures, and the tests had to be written from them.

## Unread material

- Not read: `foundations/decisions.md` D-427 and D-18 (their substance came from the guideline `guidelines/coding-balance-instrument.md` and D-443, which I read whole), `foundations/glossary.md` overlay and `foundations/part_map.md` balance-tools (the overlay's meaning came from the header of `balance/overlay.mjs`). D-437 and D-443 I read whole; of `foundations/invariants.md` I read the lines 1435-1470 only (the three entries named plus the start of the next). `task-frozen.md` and `spec.md` I read as the passages the handoff copies, not the files.
- `guidelines/testing.md` was read whole in two reads (the first was cut at line 207).

## Searches not found or unclear

- none

## Working copies

- `.runs/executor-17/` of the worktree (probe scripts, copies of the two source files, test output files, the commit message file) stood under the ignored `.runs/`; removed before returning, by its full path.
