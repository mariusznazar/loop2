Status: done

# Executor 12 report — „Wytwórz” and „Opatrz” carried out, and the first crafted piece revealed

Commit: `ef87d9e6` on `task/model-czynnosci-i-przedmiotow` (base `c791f755`). The worktree is clean after it.

## Files changed

| File | +/- | Part | Why |
|---|---|---|---|
| `src/browser/sim/run.ts` | +41/-2 | (1) one-time | the time of both verbs (`craft` from the property its row names, `tend` from its row) and the end of each in `landUse`; no item named in code |
| `src/browser/sim/body.ts` | +11/-0 | (1) one-time | `tendedBody`, the function of the body for healing |
| `src/browser/sim/program.ts` | +13/-1 | (1) one-time | `actionPrice` takes the target as an optional third argument and prices by it |
| `src/browser/sim/understanding.ts` | +12/-3 | (1) one-time | the new revealing event `crafted` read in `happened` for any item |
| `tests/sim/craft-and-tend.test.mjs` | +707/-0 | (1) one-time for the tests of the shape (durations, effects, interruption, refusals, price, revelation, absence of practice read from the data and from a second item laid on it); the cases that name the bandage are (2) | the new test file, 26 cases |
| `stryker.config.json` | +1/-0 | (1) one-time | lists the new test file (the check of the list is `test_mutation_test_selection.py`) |

Every file is (1): each was changed so that a later item of the same sort is a row of data. Nothing in the slice is (2) alone; the bandage's own row, words and numbers were written by earlier slices, and this slice only reads them.

## Checks (command, exit code)

First, before any code (the failing run): `npm test -- tests/sim/craft-and-tend.test.mjs` — exit 1, 15 of 26 failing on their assertions (durations 2 against 11, backpack unchanged at the end, health unchanged, price empty, no `discovered` event), the 11 that passed being the refusal cases the earlier slice had already made. Then, after the code:

- `npm test -- tests/sim/craft-and-tend.test.mjs` — exit 0, 26 pass
- `npm test -- tests/sim/campfire.test.mjs` — exit 0
- `npm test -- tests/sim/encounters.test.mjs` — exit 0
- `npm test -- tests/sim/discovery.test.mjs` — exit 0
- `npm test -- tests/sim/rule-signs.test.mjs` — exit 0
- `npm test -- tests/sim/body.test.mjs` — exit 0
- `npm test -- tests/quality/test_mutation_test_selection.py` — exit 0
- `npm test -- tests/quality/test_function_and_file_size.py` — exit 0
- `npm run typecheck` — exit 0
- `npx eslint` on the five changed code and test files — exit 0 (one `no-unused-vars` report on the first draft of the test file, `setProgram`, fixed before the commit; both runs are not kept as a pair because the report was of the file before the commit)
- `npx prettier --check` on the six changed files — exit 0
- `node tests/quality/eslint-size-rules.mjs` — exit 0, "0 functions and files over a threshold in 341 files" (D-425 holds; `run.ts` grew by 41 lines and stands under 800 lines of code)

Not run: `npm test` with no argument and any folder run (the gate is the orchestrator's); `foundation_check.py` and the mutation tool (the reviewer's).

## Own-work check (section 3)

Requirement most likely unmet: *To do* 5 — „Opatrz” checks at its end what it checks at its start, so a bandage stays where health came back to full by the end (D-145), plus the "never above full health" cap. Check: the cases "health came back to full by its end" (health 99.95, which is refused for nothing at the start, ends at 100 with the bandage in the backpack and no practice) and "no more than full health" (99 ends at exactly 100). To see that the first one catches the break, I removed for a moment the test `state.body.health >= BALANCE.body.startHealth` from `landUse`: `npm test -- tests/sim/craft-and-tend.test.mjs` exit 1 on that very case; the code was restored and the file run again, exit 0 (the commit holds the restored code).

Second most likely: an attack taking something. The four attack cases (before the end of each verb, and in the minute in which each ends, after its effect) pass.

## Alters behaviour a user sees in the running product?

Yes in principle — the game's character can now carry out both verbs — but no screen, route or text changes in this slice (the panel's pick and price text belong to later slices; `program-editor.ts` calls `actionPrice` as before). The state check by code and tests is what the plan asks, and it was done through the full minute (`stepMinute`, `advanceMinutes`); no walk in a browser was made.

## Choices

- The time of „Wytwórz” is read as `ITEMS[action.item][ACTIONS.craft.minutes.fromTarget]!.minutes`, so the field the row names is the one read; the `!` is the same one the refusal code already uses for the recipe (the program check admits only a target the data give a recipe). Rejected: `ITEMS[action.item].recipe!.minutes`, which would leave `fromTarget` unread. Cost if wrong: none seen.
- „Opatrz” lasts `ACTIONS.tend.minutes` through the same list of cases as the other fixed-minute actions.
- The end of „Opatrz” is `state.body.health >= BALANCE.body.startHealth`, read in `landUse` against the body as the minute's step left it; the same comparison stands in `actionRefusal`. Rejected: a helper in `body.ts` for "health is full", which would be a second place for one comparison beside the existing one in `program.ts`.
- „Wytwórz” checks the pieces at its end with `backpack[use.item] < use.count` inline, not through `holds` of `program.ts`, which is private to that file. Rejected: exporting it for one use.
- The new revealing event is read for any item as "the count of the target in the backpack rose across the minute", the way a gathering is read; it needs no named item.
- Neither verb adds practice because no skill of the data lists either; `practiced` already gives no practice for an action no skill grows. A test holds it (`practice` stays `{}` at the end of each verb and of a refused end).
- The test file lays a second item (`splint`, a recipe of two pieces in an order, a healing) and two duration branches on `ITEMS` and `BRANCHES` in a `try/finally` and takes them off; this is the way `action-targets.test.mjs` already lays items. It shows that the engine reads the data, not a kind of its own.
- Expected health values are written as hand arithmetic (`50 + 0.05 + healing`) rounded to two decimals with `toFixed`, because a plain float sum can differ from the game's six-decimal rounding by one unit in the last place; the healing and the minutes are read from the bandage's row (D-82).

## Reaches beyond the dispatch

None beyond the dispatch's files, plus the three decisions the handoff does not list but the test comments quote: none. I read `src/browser/sim/types.ts` (the `Action` union), `src/browser/sim/action-targets.ts`, `src/browser/view/program-editor.ts` (the one caller of `actionPrice`), `src/browser/sim/combat.ts` (`resolveCombat` head), `src/browser/sim/data/creatures.ts`, `src/browser/sim/data/skills.ts`, `tests/sim/action-targets.test.mjs`, `tests/sim/program-fixture.mjs` and `tests/sim/understanding-fixture.mjs`, to see what a call needs and to take the layout of the tests, and `foundations/decisions.md` D-443 (named by the handoff only as the new decision) and D-60 whole.

## Searches not found or unclear

none

## Unread material

- `foundations/decisions.md` D-193 (read whole), D-363, D-128, D-82 (read whole), D-121, D-380, D-309, D-140, D-142, D-145, D-387, D-71, D-63, D-425 — read whole as named. None unread.
- `foundations/part_map.md:34-65` and `:91-126` — not read (this slice names no part-map change; the files changed are inside the simulation part and its tests).
- `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md` and `spec.md` — I read only the passages the handoff copies.
- `foundations/invariants.md`: read `simulation-isolation`, `simulation-inputs`, `content-identifiers`, `program-rule-pick`, `function-and-file-size` whole; `simulation-inputs` holds (`tendedBody` and the new `landUse` cases return new objects).

## Plan against code

One small mismatch, adapted: the handoff's file list for `understanding.ts` says `happened`; the action is read there as `const action = finished.activity.action; switch (action.kind)` so that the `craft` case narrows the target. No structural mismatch.

## Problems observed

None. No test of a later slice left failing by this slice among the checks I ran.

## Working copies

`.runs/executor-12/` in the worktree held the logs of the runs and a copy of `run.ts` for the break I made for a moment; it stood at `.runs/executor-12`, and I removed it. No worktree or clone was made.
