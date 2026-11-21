done with concerns

# Report of the executor of slice 11 — the saved game state's shape at version 10

Worktree `the root of the task's worktree`, branch `task/model-czynnosci-i-przedmiotow`, base `856fa86063c3b23533ee75ce556c5db47c475d61`.

## Commit

- `c791f755` — feat: raise the saved game state's version to 10 for the bandage and the verbs „Wytwórz” and „Opatrz” … (D-443, D-206, D-213). The worktree is clean after it.

## Files changed

| File | Added / removed | Sorted for the model |
|---|---|---|
| `src/browser/sim/saved-game.ts` | +1 / -1 | one-time for the model: `SAVED_GAME_VERSION` 9 to 10 and nothing else; the loader already reads the backpack from the data's items (`ITEM_IDS`), the minute kinds from `MINUTE_KINDS`, actions through the program check and the tile stock through the resources, so the bandage and both verbs needed no other change |
| `tests/sim/saved-game.test.mjs` | +about 395 / -about 40 (the whole commit: 414 added, 42 removed) | one-time for the model: the document of the current version written anew at version 10, the document of version 9 kept, the new crafted cases |
| `tests/sim/previous-programs.test.mjs` | in the same commit | one-time for the model: the one hard-coded precondition of the table of readable versions (see *Reaches beyond this handoff*) |

*To do* 14 is not in my handoff, so the three sorts above are my reading of "one-time for the model" (a change that belongs to this model change alone and is not kept as a recurring rule); see *Searches not found or unclear*.

## What the test file now holds

- `DOCUMENT_V9`: the former current document verbatim (version 9, backpacks of four items, no `craft` or `tend` minutes). It is refused as `version`, and the same game under version 10 is refused as `shape` (new case "the document of version 9 is refused as version, whatever its game holds").
- `DOCUMENT` (version 10): the backpack of the map run holds the bandage at 1 and the earning loop's backpack at 0; the chest holds the bandage; the open report line's chest holds 2; `minutesByAction` holds `craft` 10 and `tend` 5 (sum still 212); the Understanding holds `craft`, `tend` and the item `bandage`; `PROGRAM_10` (program 3 and the earning loop's program) holds rules of „Wytwórz” (rule 4) and „Opatrz” (rule 5) with the bandage as target and the bandage on its take list; the copy's base holds both rules, the copy holds both and the player's rule 6 (`ruleCounts` for 1 to 6); the manual run's activity is „Wytwórz”, the earning loop's „Opatrz”. `HEADQUARTERS` is rewritten at version 10 with the earning loop of version 10.
- Crafted documents refused whole as `shape` (all in `CRAFTED`): backpack without the bandage (map run, earning loop), the four-item backpack of version 9, bandage count below 0, fractional, text, none, beyond the safe integers, a backpack with an item the data lack; a tile whose stock names the bandage (three places); chest bandage below 0, fractional, beyond capacity; `minutesByAction` without `craft`, without `tend`, without both, below 0, fractional, text, none, beyond the safe integers, summing wrong; entered-with list with the bandage out of order. For each of 6 places (a program, a copy, a base, an earning loop's program, the activity going on of the run, of an earning loop) and each of the 2 verbs: target moss, stick, fiber, berry (no recipe or healing), an identifier the data lack, `toString`, `constructor`, empty, capitals, trailing space, none, number, list, object, truth value, no `item`, a field beyond `kind` and `item` — 6 x 2 x 17 = 204 generated cases.
- Control test "each place of an action holds „Wytwórz” and „Opatrz” with the bandage, and loads": each of the 6 places x 2 verbs with the bandage loads into the state it describes, so a generated refusal is for the target and not for the place.
- The existing hostile-value test ("no value a document can hold, at any place of it, throws out of the load") walks the new `DOCUMENT` and so reaches every new field; it passed.

## Checks (command and exit code)

- First, the failing case: with `SAVED_GAME_VERSION` put back to 9 beside the new test file, `npm test -- tests/sim/saved-game.test.mjs` exit 1, 30 of 47 failed (every load of the version-10 document refused as `version`, "the current version is the one the document … is written with", "the document of version 9 is refused as version"). Then the constant at 10.
- `npm test -- tests/sim/saved-game.test.mjs` exit 0 (47 pass, 0 fail; two cases new over the 45 before).
- `npm test -- tests/sim/previous-programs.test.mjs` exit 0 (25 pass). Before my change to that file it failed at exit 1 on its precondition (`10 !== 9`) once the constant was raised.
- `npm test -- tests/sim/content-revision.test.mjs` exit 0 (39 pass) — run because it holds `version: 9` literals; it does not depend on the constant.
- `npm run typecheck` (`node scripts/build.mjs --check`) exit 0.
- `npx eslint src/browser/sim/saved-game.ts tests/sim/saved-game.test.mjs tests/sim/previous-programs.test.mjs` exit 0.
- `npx prettier --check` the same three files: the first run flagged `tests/sim/saved-game.test.mjs` (one line of the generated cases); `npx prettier --write tests/sim/saved-game.test.mjs` fixed it (one `map` call on one line), the tests re-run after it exit 0. The final tree is Prettier-formatted.
- `node tests/quality/eslint-size-rules.mjs` exit 0: "0 functions and files over a threshold in 340 files". The rule of D-425 holds for the files I changed.
- Not run: the full gate and any folder of tests (the orchestrator's); the view tests `tests/view/account-screen.test.mjs`, `tests/view/judging-cache-page.test.mjs`, `tests/view/previous-save.test.mjs`, which use `SAVED_GAME_VERSION` relatively (`SAVED_GAME_VERSION - 1`, `+ 1`) and so should not depend on the value; I did not run them, and no focused check of this slice names them.

## Own-work check (section 3)

- Requirement most likely unmet: "a backpack whose keys are not exactly the data's items, the bandage missing included" and "no value a document can hold throws, the new fields included". Check: a mutation of `saved-game.ts` making `ITEM_IDS` leave the bandage out, run against the new tests: `npm test -- tests/sim/saved-game.test.mjs` exit 1 with 21 failed (the document of the current version no longer loads, and the crafted backpack cases lose their refusal); the code was restored from a copy before the commit (`git diff` shows only the one-line version change). For the throwing requirement, the existing walk over every place of the document passed on the new document (the new places are in it). For the verbs, the control test shows the same places load with the bandage, and the 204 crafted cases refuse each other target; those refusals come from the program check of slice 10 (`programs.ts`), which this slice does not change.
- Mutation in my head, beyond that: a version left at 9 (caught: the red run above); a document of version 9 loading under 10 (caught by "the game of version 9 held under the current version" as `shape` and by the loop of other versions); a tile accepting the bandage (caught by three cases); a minute kind missing (caught by nine cases).

## Walk of `walkthrough.md`

Read. Not performed. The slice changes the shape of the saved game state and its load, and the user sees a difference only once the version is deployed (a saved game of version 9 is discarded and a new game starts); the cycle does not deploy, and the product's browser path for a discarded save belongs to the view's own tests and to the slices that carry the bandage to the screen. Every case of the plan is therefore unchecked in the running product, for that reason; the refusal and the load are proven at the level of the simulation by the tests above. I did not start the product.

## Reaches beyond this handoff

- `tests/sim/previous-programs.test.mjs` (not among the slice's *Change* files): changed because the slice's own check names it, and raising the constant made it fail on its precondition `assert.equal(SAVED_GAME_VERSION, 9, …)`. The cause lies in the requirement (the version rises), not in a bug. The change: a document of version 10 added to the table of readable versions (same shape as version 9: items with `contentRevision`), the loop over versions 6 to 10, the precondition at 10, the comment above it. No expectation was weakened. A plan/code mismatch to the plan's *Change* list (small, adapted).
- Read, to understand what the load already does: `src/browser/sim/programs.ts` (grep of the conditions), `src/browser/sim/previous-programs.ts` (grep of the version), `src/browser/sim/run-record.ts` (`MINUTE_KINDS`), `src/browser/sim/action-targets.ts` (head), `src/browser/sim/types.ts` (grep of `craft`/`tend`), `src/browser/sim/data/conditions.ts` (`itemBelow`, `healthBelow` ranges), `tests/sim/content-revision.test.mjs` (the `version: 9` literal), and a grep of `SAVED_GAME_VERSION` across `src` and `tests`. Read to have the ranges of `D-443`, `D-206`, `D-213` and the invariant by heading (`foundations/decisions.md:8155`, `:3905`, `:675`; `foundations/invariants.md:1048`) — the handoff named D-206, D-213, save-version and part_map and said D-443 is written by the foundation step; D-443 itself was not in the list.

## Choices (with the way rejected and its cost if wrong)

- The new verbs' rules are appended to the end of the first group of each program, so the indexes the old crafted cases use (`rules[0]`, `rules[1]`, `groups[1]`) did not move. Rejected: inserting them in front, which would have rewritten about twenty existing cases. Cost if wrong: none for behaviour.
- The copy's base holds rules 4 and 5 and the player's rule `lightItem` becomes 6 (counts for 1 to 6), as a real game numbers them, instead of rules 5 and 6 behind the old rule 4. Rejected: the shorter edit. Cost if wrong: none; the load compares no copy rule with its base.
- The crafted verb cases are generated by a loop over places, verbs and targets, not written out one by one. Rejected: 204 written lines. Cost: a reader sees the table, not each case; the names of the cases state place, verb and target.
- `RUN_RECORD` stays as the name of the current record and the version-4 record is renamed `RUN_RECORD_V4`, so the existing checks of the current record keep their name.
- The bandage is not placed in `enteredWith` of the document (only in the "every item" edge case and the out-of-order case): the existing cases index `enteredWith[0]` and the capacity cases count its pieces. Cost if wrong: a trip list holding the bandage is covered by the edge case and by the take list of `PROGRAM_10`, not by the main document's record.

## Problems observed

- None in the code. One value of the plan I could not check against the slice's wording: the plan says "a tile whose stock names the bandage" is refused as `shape`, which the load already did before this slice (stock keys are read against the resources); the new cases pin it, they do not change it.

## Unread material

- `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:138-139` and `spec.md:85-87`, `:359-367`, `:381-384`: not opened; I read the passages as the handoff copied them word for word. 
- `foundations/part_map.md:34-65`: read the simulation part (the entry through its trust-boundary lines); the lines in range after it were not needed.
- `foundations/decisions.md` D-443: read whole at `:8155-8176` (the handoff did not name its range). Everything else the handoff names I read whole: `guidelines/coding.md`, `testing.md`, `coding-saved-game.md`, `coding-simulation-module.md`, `src/browser/AGENTS.md`, `data/items.ts`, `data/actions.ts`, `src/browser/sim/saved-game.ts`, `.the-way/task-cycle/change/SKILL.md`, `slice.md`; `walkthrough.md` only its first 3500 characters (enough to judge that no walk applies); `ui_check.md` not read (the slice changes no screen).

## Searches not found or unclear

- *To do* 14 ("The report sorts each changed file as one-time for the model") is not in my handoff, and I did not search for it (the cycle's files are not mine to read); my sort of the files is my reading of the phrase.
- No `python3` on this machine's Bash path (a Windows stub answers "nie znaleziono Python"); I made every edit with the edit tool and `sed`, so nothing depended on it.

## Working copies

My directory `.runs/executor-11/` (output of the test runs, a copy of `saved-game.ts` before the mutation and a copy of the test file before Prettier) stood at `.runs/executor-11`; I removed it by its full path before returning (the listing of `.runs/` afterwards no longer shows it). No worktree or clone was made.
