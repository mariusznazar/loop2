Status: done with concerns

# Slice 9 — The tests of the data and of the trip take the bandage and the two verbs

Worktree: `the root of the task's worktree`, branch `task/model-czynnosci-i-przedmiotow`, base `1351e3a1e9392852085ecc40949d04f07ebe6804`.

## Commits

- `6026004b` — `test: :white_check_mark: have the tests of the data and of the trip take the bandage and the verbs „Wytwórz” and „Opatrz” … (D-443, D-290, D-121)`. Author on the commit: `mariusznn@gmail.com`, the address the repository's config gives.

## Files changed

| File | Added | Removed |
|---|---|---|
| `tests/sim/data.test.mjs` | 86 | 7 |
| `tests/sim/trip.test.mjs` | 5 | 1 |
| `tests/invariants/test_content_identifiers.py` | 1 | 0 |

Total: 92 added, 8 removed (`git diff --numstat 1351e3a1 HEAD`).

No product code changed. `src/browser/sim/data/items.ts` was edited once for a failing run (see below) and restored before the commit; `git diff 1351e3a1 HEAD` lists only the three test files.

## Changes, and the reason of each

- `tests/sim/data.test.mjs`
  - D-290 citation at line 206 now quotes „five named groups” (the sentence as the log holds it). The citation check no longer reports `tests/sim/data.test.mjs`.
  - Group list: `["tend", "foodAndCombat"]` after `eat`, `["craft", "crafting"]` at the end. Reason: data gained „Opatrz” and „Wytwórz” (D-290 as row 3 changes it).
  - Items test renamed to „the items are the four resources of Las and the bandage”: keys now `stick, berry, moss, fiber, bandage`, and an exact row for `ITEMS.bandage` (name „opatrunek”, plural, icon `first-aid-kit`, title „First aid kit icon”, `revealedBy` gathered moss, recipe 2 moss in 10 minutes, healing 25). Reason: the data's new item.
  - New test „the bandage is no resource and lies on no map”.
  - New test „every recipe uses at least one piece of an item of the data, and every healing property is a positive number” (spec Decision 2).
  - Test "every item of a resource takes its words from the resource…": the loop skips `bandage` (the only item that is no resource). Reason: the bandage is no resource (spec Decision 2 / D-443).
  - Campfire test: the `ITEMS` keys list gained `bandage`.
  - ROWS: new row `gathered moss` → action `craft`, item `bandage`; new row `crafted bandage` → action `tend`. Reason: D-121 as row 4 changes it.
  - Free actions (grown by no character skill): `["wander", "walkTo", "walkToCampfire", "tend", "craft"]`. Reason: D-120 and the task's item 10 (both verbs grow no skill).
  - "every fixed action duration" filter: `action.minutes !== null` → `typeof action.minutes === "number"`, because `craft` takes its minutes from its recipe (`{ fromTarget: "recipe" }`) and would fail the whole-minutes check.
- `tests/sim/trip.test.mjs`: `bandage: 0` added to the backpack expectations at the five places that compare a whole backpack (including the `takeTrip` result at line 222). Reason: the bandage is an item of the backpack (D-64: the cap counts the pieces of all items together) and starts at 0.
- `tests/invariants/test_content_identifiers.py`: ENTRIES gains `{"kind": "item", "id": "bandage", "name": "opatrunek"}`. Nothing else in the test changed.

## Checks (command and exit code)

- Failing case first (recipe that uses no piece): `items.ts` temporarily set to `count: 0`, `npm test -- tests/sim/data.test.mjs` → exit 1, `✖ every recipe uses at least one piece…`, `AssertionError [ERR_ASSERTION]: bandage recipe count 0`. Restored to `count: 2` before the commit.
- Tripwire seen failing: ENTRIES line removed temporarily, `npm test -- tests/invariants/test_content_identifiers.py` → exit 1, `the data gives the item 'bandage' named 'opatrunek', which ENTRIES … does not hold`, `FAILED (failures=1)`. Line restored.
- `npm test -- tests/sim/data.test.mjs` → exit 0, pass 39, fail 0 (after the restore).
- `npm test -- tests/sim/trip.test.mjs` → exit 0, pass 24, fail 0.
- `npm test -- tests/invariants/test_content_identifiers.py` → exit 0, 5 tests OK.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` → exit 1, 2 errors: `tests/view/program-editor.test.mjs:1058` and `tests/view/rule-editor.test.mjs:1528`, both "the quotation stands in no binding sentence of `D-290`". Expected: those are the two other D-290 citations that stay until Slices 13 and 15. The `tests/sim/data.test.mjs` citation is clean. The same two errors appear without `--skip-test-citations`.
- `npx prettier --check tests/sim/data.test.mjs tests/sim/trip.test.mjs` → exit 0.
- `npx eslint tests/sim/data.test.mjs tests/sim/trip.test.mjs` → exit 0.
- `node tests/quality/eslint-size-rules.mjs` → exit 0, "0 functions and files over a threshold in 339 files".
- `npm run typecheck` → exit 0.
- Ruff, from the environment `the quality environment of the main checkout (outside this worktree)` (the shared one, read only): `ruff check --config ruff.toml tests/invariants/test_content_identifiers.py` → exit 0; `ruff format --check` → exit 0.
- Not run: the full gate (`npm test` with no argument) — by the handoff's rule, not run by this agent.

## Own-work check (section 3)

- Requirement most likely missed: that a changed expectation is not weakened to pass. Check: the new recipe test catches a zero count (run above, failing); the tripwire catches the missing entry (run above, failing). Both fail for the expected reason and pass with the data as it stands.
- Second check: that the bandage is on no map. The test "the bandage is no resource and lies on no map" passes against the current maps.
- Mutation thoughts: a change moving `tend` to a different revealing event, or `craft` to a crafted bandage, breaks the ROWS test; an `itemTargets` change is outside this slice's tests.

## Reaches beyond the handoff

- Read `guidelines/testing.md` whole (510 lines) in three reads, `guidelines/coding.md` and `guidelines/coding-content-data.md` whole; read `src/browser/sim/data/items.ts`, `actions.ts`, `revelations.ts` whole; read `tests/sim/data.test.mjs`, `tests/sim/trip.test.mjs` and `tests/invariants/test_content_identifiers.py` whole (in chunks).
- Read `foundations/decisions.md`: D-290 (9665-9691), D-121 (7464-7521), D-120 (7440-7463), D-128 (7683-7723), D-82 (1044-1058), D-443 (8155-8190, the whole entry). Read `foundations/invariants.md` content-identifiers (236-247).
- Grepped `foundations/decisions.md` for „opatrun”/„bandage” to find the bandage's sources (D-443 names the rule; the numbers 2 / 10 / 25 are in no decision). Hits used only to locate the rule and the risk of the rows, not to change code.
- The rules-on-demand hook, on two commands, required reading `the author's global rules for scripts` and `…\rules\git.md`; the hook supplied the text, which I followed.

## Unread material

- `foundations/part_map.md` (34-65): not read; the handoff listed it, but no change needed a part.
- The spec and the task: only the passages the handoff copied (spec Decision 2 and task items 1–5, 8–10); spec and task not read whole.
- `foundations/decisions.md` D-387, D-64, D-193, D-143 and D-179 were not opened by this agent; cited in test comments that already existed.
- `tests/view/program-editor.test.mjs` and `tests/view/rule-editor.test.mjs` (D-290 citations): not read, out of this slice.
- `src/browser/sim/data/*` other than the three named files: not read.

## Searches not found or unclear

- None that changed the code. One unclear point, below under concerns: the handoff's wording "the data's change as the reason of each changed expectation" — I put the reasons in the commit message and in this report; the trip backpack changes have no comment of their own (D-64 already sits in the first of those tests).

## Choices made, with the way rejected

- Bandage excluded from the "item is a resource" loop by a `continue` on its id, instead of adding a resource row for the bandage. Rejected: spec Decision 2 and the handoff say the bandage is no resource. Cost if wrong: a second non-resource item later needs its own exemption; the loop then needs a rule rather than a name.
- "fixed action duration" test now filters on `typeof minutes === "number"`, instead of naming `craft` as an exception. Rejected: a name list would need an update for every action that takes its minutes from a target. Cost if wrong: a future action whose `minutes` is neither a number nor null would be dropped from this test silently, though the type check holds it.
- The bandage's exact row (2 moss, 10 minutes, 25 health) is pinned in the test as the data gives it. Rejected: checking only the shape of the row, which would not fail on a change of the preliminary numbers that the task's item 6 may make. Cost if wrong: task 6 must update this one row; that is the data change the task expects.

## Concerns (status: done with concerns)

1. The bandage's numbers (recipe 2 moss / 10 minutes, healing 25) are preliminary (task items 2 and 4: "Liczby są wstępne"), and no decision of the foundation holds them. The test pins them as the data's row, so the expectation has no foundation source (guidelines D-82 asks for one). Question for the orchestrator: do you want the test to pin the numbers now, or only their shape until task 6 settles them? My recommendation: pin now; the exact row changes with the data, which is the case the task describes. The answer does not block this commit.
2. Two other D-290 citations (`tests/view/program-editor.test.mjs:1058`, `tests/view/rule-editor.test.mjs:1528`) still quote the old sentence; they belong to Slices 13 and 15, as the handoff says. Until then the foundation check reports them.

## Repair (after the coordinator's message on `6026004b`)

The bandage case in `tests/sim/data.test.mjs` wrote the preliminary numbers into the test (`recipe: { uses: [{ item: "moss", count: 2 }], minutes: 10 }` and `healing: { health: 25 }`). The case now asserts the bandage's words as literals (name, plural forms, icon, icon title, revealedBy gathered moss), and the recipe and the healing by shape, each read from `ITEMS.bandage`: a recipe that uses `moss` as one piece, positive integer counts, positive integer minutes, and a positive number of health. A search of the slice's diff for the literals 2, 10 and 25 found no other occurrence standing for these numbers. The `1` in `>= 1` is a bound, not a number of the data.

Checks run after the repair (each exit code is that of the command):
- `npx prettier --write tests/sim/data.test.mjs` (reformat of the new lines), then `npx prettier --check tests/sim/data.test.mjs tests/sim/trip.test.mjs` → 0
- `npx eslint tests/sim/data.test.mjs tests/sim/trip.test.mjs` → 0
- `node tests/quality/eslint-size-rules.mjs` → 0, "0 functions and files over a threshold in 339 files"
- `npm test -- tests/sim/data.test.mjs` → 0, pass 39, fail 0
- `npm test -- tests/sim/trip.test.mjs` → 0, pass 24, fail 0
- `npm test -- tests/invariants/test_content_identifiers.py` → 0, 5 tests OK

The repair is a new commit on top of `6026004b` (its hash is in the return message). `tests/sim/data.test.mjs` only; `git diff --stat 6026004b` lists that one file.

Concern 1 below is resolved by this repair; choice 3 (pinning the exact row) is replaced by the shape check.

## Working copies

- `.runs/executor-9/` — my directory for logs of the runs and two copies of the Python test (`ci-fixed.py`, `ci-without.py`), plus `ci-fixed.py` as the restored copy. Removed before return with `rm -rf` on that full path; nothing remained (checked: the path no longer exists).
- No git worktree was created.
