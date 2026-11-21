done

# Report of the executor of slice 10 — the program check, the repertoire and the targets of the two verbs

Base `9e867128d33b47d432ede8448124c03a62875fb4`, one commit on `task/model-czynnosci-i-przedmiotow`:

- `856fa860` feat: have the program check take „Wytwórz” and „Opatrz” only with an item among the targets the data give the verb … (D-443, D-23, D-126)

## Files changed (added / removed lines)

| File | + / - | Sorted (To do 14) |
|---|---|---|
| `src/browser/sim/programs.ts` | 23 / 0 | for the model: `checkTarget` reads the targets from `itemTargets` at each call; `checkAction` gains the case `craft`/`tend`, built from `kind` and `item` alone |
| `src/browser/sim/understanding.ts` | 10 / 2 | for the model: `actionInRepertoire` and `undiscoveredPart` take an item target; the reason names `ITEMS[item].name` |
| `tests/sim/action-targets.test.mjs` (new) | 486 / 0 | for the model, except the test of the reason that reads „opatrunek” and the test of the bandage as no resource, which are for the bandage alone |
| `stryker.config.json` | 1 / 0 | for the model (the new test file listed in `tap.testFiles`) |
| `tests/sim/previous-programs.test.mjs` | 211 / 0 | for the model (the reader and the guard of version 9); the bandage appears only as the one valid target |
| `tests/invariants/test_program_closed_lists.py` | 12 / 7 | for the model (`ACTION_KINDS` gains `tend` and `craft`, `VALID` holds both with the bandage, `"craft"` leaves the made-up kinds, `item` joins the plausible fields); the bandage as the item of the two rules is for the bandage alone |
| `tests/invariants/test_program_world_reference.py` | 87 / 7 | `ITEM_IDS` gaining `"bandage"` is for the bandage alone; the LEGIT and NAMING programs of the two verbs and the new controls are for the model |

Test files not in the plan's *Change*: none. `tests/sim/repertoire.test.mjs`, `program.test.mjs` unchanged and green.

## Checks (command, exit code)

First the failing runs, on the slice's tests with `src/` put back to the base (the patch of `src/` taken off with `git checkout -- src` and applied again after; the tests of the branch's tree untouched):

- `npm test -- tests/sim/action-targets.test.mjs` on the base `src/`: exit 1, 6 of 12 failed (the second item as a target, the build from kind and item, the refusal with the value named, the repertoire, the reason, the passing over), each at an assertion or at `program: action kind craft is not on the closed list` from `setProgram`, which is the refusal the old check gave.
- `npm test -- tests/sim/previous-programs.test.mjs` on the base `src/`: exit 1, 2 of 25 failed (the item skipped and named with the bandage read beside it, the extra field dropped); the sweep of hostile values and the guard of the programs of today pass on the base too, as they should (they guard what the slice must not change).
- `npm test -- tests/invariants/test_program_closed_lists.py` on the base `src/`: exit 1, 2 of 4 failed (`VALID` with `tend` and `craft` not taken in, outside a map run, in one and in an earning loop; and the load of the same).
- `npm test -- tests/invariants/test_program_world_reference.py` on the base `src/`: exit 1, 1 of 3 failed (a valid program of the two verbs refused with `action kind craft is not on the closed list`).

Then with the slice's `src/`:

- `npm test -- tests/sim/action-targets.test.mjs`: exit 0, 12 passed.
- `npm test -- tests/sim/previous-programs.test.mjs`: exit 0, 25 passed.
- `npm test -- tests/invariants/test_program_closed_lists.py`: exit 0, 4 tests OK.
- `npm test -- tests/invariants/test_program_world_reference.py`: exit 0, 3 tests OK.
- `npm test -- tests/sim/repertoire.test.mjs`: exit 0, 32 passed.
- `npm test -- tests/sim/program.test.mjs`: exit 0, 19 passed.
- `npm test -- tests/quality/test_mutation_test_selection.py`: exit 0, OK (the new file is listed).
- `npm test -- tests/sim/trip.test.mjs`: exit 0, 24 passed (the tests of the code I touched, beyond the section's list).
- `npm run typecheck`: exit 0. `npx eslint` on the four TS/MJS files: exit 0. `npx prettier --check` on those files and `stryker.config.json`: exit 0. `ruff format` and `ruff check --config ruff.toml` on the two Python files: left unchanged, all passed (ruff of `../../quality-venv`).
- `node tests/quality/eslint-size-rules.mjs`: exit 0, `0 functions and files over a threshold in 340 files` (D-425 holds).

### A failing test outside the slice

`npm test -- tests/sim/saved-game.test.mjs` fails 19 of 45, **the same 19 on the base `src/` as on the slice's `src/`** (compared by name, exit 1 both): hand-written documents of the current version whose backpack lacks the bandage, which the saved-game slice (the load and the version 10) owns. I did not change that file and made nothing pass for it. The run is outside the section's *Checks*; I ran it only to see whether my change moved it.

## Own-work check (section 3)

The requirement my work most likely does not meet: the refusal must hold **at every boundary through the one check**, not only in `setProgram` — the load of a saved game state and the reader of a previous save (Decision 3 unit 2). The reader is held by the new tests of `previous-programs.test.mjs`. The load has no test in this slice (its tests are the saved-game slice's), so I checked it by a one-off script of `.runs/executor-10/load_check.mjs` (removed): a document made by `savedGame` from a game whose program holds „Wytwórz — Opatrunek” loaded (`ok`); the same document with the program's action `craft`/moss, `tend`/stick, `craft` with no item and `craft`/bandage with an extra field each gave `ok: false`, reason `shape`. The first fits the closed-lists test, which loads `VALID` (with both verbs) at four places and passes.

Also the requirement „no list of items for „Opatrz” in the code”: `programs.ts` holds no identifier of an item; the test lays a second item (`splint`) on the built `ITEMS` and removes it in `finally`, and the targets, the check and the repertoire take it with no change of code; `Object.keys(ITEMS)` is compared before and after, and `splint` is never in the data.

Mutations considered (what each test catches): `checkTarget` accepting any item of the data — the refusal table of moss, stick, a case variant, objects; accepting by `kind` alone — the overlay of `board` and `salve` (a recipe alone is no target of „Opatrz”); building the action from the whole object — the extra-field tests (the check, the reader and the append); `actionInRepertoire` ignoring the item — the passed-over rule at a map run start, where the known case carries out rule 1 and the unknown one rule 2; the reason naming the verb's label instead of the item — the two reason tests, with `szyna` for the overlay row.

## Walkthrough

The change alters no behaviour a user sees in the running product: no screen, API answer or command changes. The program check accepts two kinds that no screen offers yet (the editor takes them in a later slice), so the editor, the scene and the save show the same as before.

## Choices (with the way rejected and the cost if wrong)

1. `checkTarget` throws `ProgramCheckError` with the message `program: item {value} is not a target of the action kind {kind}`, naming the value by `shown` (a text as it stands, an object as „an object”). Rejected: the same message as `checkItem`, which says „not an item of the data” and would be false for moss. The wording is no part of any test beyond that the value appears in it. Cost if wrong: a message to reword.
2. The cases `craft` and `tend` stand in `checkAction` by name, beside the kinds of today, not through a loop on `takesItem` in the `default` branch. Rejected: the `default` branch reading `ACTIONS` — it would accept a kind the data lists with a target but the type `Action` has no shape for, a hole the type check does not see. Cost if wrong: a third verb with a target needs one more `case` here (the `Action` type needs its own line anyway).
3. The documents with the new verbs in `previous-programs.test.mjs` carry `SAVED_GAME_VERSION` as their version, the guard of the programs of today the literal 9: the first reads whatever the current version is once the version rises to 10, the second is the document „as a version 9 holds it” and stays so. Cost if wrong: none until the version bump.
4. D-126 is shown in a map run by a character with 2 moss from the chest, so that the first rule of the known case starts (rule 1) and the unknown case skips to rule 2; with no moss the two cases would look alike (the rule is refused for the lack of moss).
5. `PLAUSIBLE_FIELDS` of the closed-lists test gains `item`, so an unlisted kind given the fields of a kind with an item is also refused; every unlisted kind now stands once more with it. Cost: a few more offers, the run took the same few seconds.

## Mismatches of the plan and the code (section 4)

- None of substance. `"craft"` stood only in `UNLISTED_ACTION_KINDS` (not in the condition list of made-up kinds) and was removed there, as the section says.
- `tests/sim/action-targets.test.mjs` did not exist (the plan: Slice 7 wrote the module, this slice the test file); created as the section says.

## Reaches beyond the handoff

- `foundations/decisions.md` D-310 (`sed -n 9925,9936p`) for the quotation of the reason „jeszcze nieodkryte: {name}” in the `decision:` line of the reason test, because D-289 holds the greyed reasons of the rule panel, not the reason of `outsideReason`. Where: `foundations/decisions.md:9925-9936`.
- `the author's global rules for git` and `scripts.md` (the hooks of the session asked for them before a commit and before a script).
- `tests/sim/program-fixture.mjs`, `tests/sim/understanding-fixture.mjs`, `tests/invariants/program_fixture.py` and the `src/browser/sim/skills.ts` function `practiced`, `src/browser/sim/game.ts` `setProgram`, `src/browser/sim/program.ts` `chooseActivity`, to write the tests with the helpers the repository has.
- `tests/sim/trip.test.mjs` (read in part, lines 1-100) for how a chest is set up with partial pieces; and `tests/sim/saved-game.test.mjs` run only (see above).

## Working copies

`.runs/executor-10/` (the patch of `src/`, the one-off `load_check.mjs`, `edit_wr.py`, the logs of the runs and the commit message) stood in the worktree's ignored `.runs/`; removed before I returned (the removal by its full path). No worktree or clone was made. `dist/` of the worktree stands built from the slice's `src/` (an ignored directory the tests rebuild).

## Unread material

- `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md` and `spec.md`: not opened; I read the passages the handoff copies word for word.
- `foundations/part_map.md:34-65` and `:91-126`: not opened (the new test file lies under `tests/sim/`; `foundation_check.py` is not in the section's checks and was not run, so whether the part map claims it is unchecked).
- `foundations/decisions.md` D-23, D-26, D-120, D-126, D-193, D-401, D-289, D-425 and `foundations/glossary.md:123-134` and the invariants `program-rule-pick`, `function-and-file-size`, `program-closed-lists`, `program-world-reference`, `previous-save-programs-reader`: read whole by their ranges.
- `src/browser/sim/types.ts:41-61` read; `guidelines/testing.md` read whole (two pages).

## Searches not found or unclear

- none that blocked the work. One note: the handoff's „Foundation entries row 1” and its first and second sentence I took to be D-443's two sentences (the entry's text names itself as the new decision, in the log at `foundations/decisions.md:8155`); the plan's table itself is not in my handoff.
