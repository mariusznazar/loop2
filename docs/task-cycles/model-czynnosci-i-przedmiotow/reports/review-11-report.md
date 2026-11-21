PASS c791f75539c44dc866f1bd9c603fc5ba40867a65

# Review of slice 11: the saved game state's shape at version 10

Range `856fa86063c3b23533ee75ce556c5db47c475d61..c791f75539c44dc866f1bd9c603fc5ba40867a65`, one commit (`c791f755`). `git rev-parse HEAD` in the worktree is `c791f75539c44dc866f1bd9c603fc5ba40867a65`, which matches the head I was given. The pinned `.the-way` is at `19e5774aed6d1d628042e23deccc110ed9f112c0`, which matches the gitlink.

Changed files: `src/browser/sim/saved-game.ts` (+1/-1, `SAVED_GAME_VERSION` 9 -> 10), `tests/sim/saved-game.test.mjs` (+~395/-~40), `tests/sim/previous-programs.test.mjs` (+13/-4; not in the slice's *Change* list, see "Scope" below).

## Findings

### Critical

none

### Important

none

### Minor

1. **`tests/sim/saved-game.test.mjs:2775-2778`: the case for a fractional „Opatrz” count does not isolate the fraction of `tend`.**
   The case is "the game minutes by action with „Opatrz” fractional". It sets `tend = 4.5` and also `gather = 55.5`, so that the sum stays at 212. But `gather = 55.5` is itself fractional. The load would refuse this document as `shape` even if it accepted a fractional `tend`. The case therefore passes whether or not the property it names holds.
   It matters little today. The reader `record` in `src/browser/sim/saved-game.ts:1061-1068` reads every kind of `MINUTE_KINDS` through the same `count`, so no kind can be lenient on its own. The case also copies the pattern of the existing case at `tests/sim/saved-game.test.mjs:2145-2146` (`explore = 39.5`, `wander = 30.5`).
   Isolating the fraction is not possible while the sum must also hold: any single fractional value breaks the sum, and any fix that keeps the sum needs a second fraction. The case can only show "refused" for one of two reasons. Graded Minor (broader coverage that would be nice). It lies within the task.

## Scope

- `tests/sim/previous-programs.test.mjs` lies outside the slice's *Change* list. The slice's own check, `npm test -- tests/sim/previous-programs.test.mjs`, held the precondition `assert.equal(SAVED_GAME_VERSION, 9, …)`, and raising the version made it fail. The change adds a document of version 10 to the table of readable versions (items with `contentRevision`, which agrees with D-401 "version 9 or above"), raises the loop to 6..10 and the precondition to 10. No expectation is weakened. The requirement (the version rises) makes this change necessary, so it is no finding.
- One existing assertion was removed: `assert.equal(SAVED_GAME_VERSION, DOCUMENT_V8.version + 1)` in the version-8 test. The raise made it false. The same relation now stands for version 9 in the new test "the document of version 9 is refused as version, whatever its game holds". This is a change of a test with its cause in the requirement (`guidelines/testing.md`, "Changing an existing test"). No finding.

## What I checked against the task

- **The version is raised together with the shape** (`guidelines/coding-saved-game.md`, „Wersja podnoszona razem z kształtem”; D-206; invariant save-version):
  - The constant is now 10.
  - `DOCUMENT` is rewritten at version 10, and `DOCUMENT_V9` stays in the test.
  - `DOCUMENT_V9` is refused as `version`. The same game held under version 10 is refused as `shape`.
  - The current document set to version 9 is refused as `version`.
  - The loop over other versions now uses 0, 8, 9, 11 and -1.
  - "the current version is the one the document of the current version is written with" still compares the constant with `DOCUMENT.version`.
- **The current document fills the new branches**, as the slice requires:
  - The map run's backpack holds the bandage at 1. The earning loop's backpack holds it at 0.
  - The chest holds the bandage. The open report line's chest holds 2.
  - `minutesByAction` holds `craft` 10 and `tend` 5. The sum is still 212, the run's minute.
  - The Understanding holds `craft`, `tend` and the item `bandage`.
  - Rules of both verbs with the bandage as target stand in program 3 / `PROGRAM_10`, in the copy, in its base and in the earning loop's program.
  - The bandage is on the take list of `PROGRAM_10`.
  - The manual run's activity is „Wytwórz”. The earning loop's activity is „Opatrz”.
  - `HEADQUARTERS` is at version 10, with its earning loop at the new shape.
  - "a document of the current version loads into the state it describes" passes for both documents.
- **Crafted documents of version 10 are refused whole as `shape`** (`spec.md:359-367`):
  - **Wrong targets of either verb.** The places are a program, a copy, a base, an earning loop's program, the activity of the map run and the activity of an earning loop. The targets tried are:
    - moss, stick, fiber and berry, which have no recipe and no healing;
    - an identifier the data lack;
    - `toString` and `constructor`;
    - empty text, capitals and a trailing space;
    - `null`, a number, a list, an object and `true`;
    - no `item`;
    - a field beyond `kind` and `item`.
    That makes 6 x 2 x 17 = 204 cases.
  - **Control for those cases.** The control test "each place of an action holds „Wytwórz” and „Opatrz” with the bandage, and loads" shows that each place and verb loads with the bandage. So each refusal comes from the target and not from the place.
  - **Rule indexes.** I verified the indexes `VERB_PLACES` uses against the fixtures. In `PROGRAM_10`, group 0 is [1, 3, craft 4, tend 5], so the indexes are 2 and 3. In `COPY_BASE_10` it is [1, 2, 3, craft 4, tend 5], and in `COPY_PROGRAM_10` it is [1, 2, 3, craft 4, tend 5, 6], so the indexes are 3 and 4.
  - **The rest of the list:**
    - a backpack without the bandage, in the map run and in an earning loop;
    - the backpack of version 9;
    - an item the data lack;
    - wrong counts of the bandage;
    - a tile stock that names the bandage, in three places;
    - chest counts and capacity;
    - `minutesByAction` without `craft`, without `tend` or without both, with wrong values, or summing wrong;
    - `enteredWith` out of order with the bandage.
  - **Already covered.** The cases of today stay (`CRAFTED` is extended with `Object.assign`). Items the data lack in the chest, a trip list, a burning item and the Understanding are covered by existing cases (`tests/sim/saved-game.test.mjs:1719`, `:1722`, `:1752`, `:1834`, `:2167`, `:2221`, `:2627`).
- **No value throws:** "no value a document can hold, at any place of it, throws out of the load" walks `DOCUMENT`, so it also walks every new field, and it passes.
- **Trust boundary, `src/browser/sim/saved-game.ts`:**
  - I read how the load reads what the slice relies on: `backpack` (`fields(value, ITEM_IDS)`, exactly the data's items), the tile stock (`pieces`, keys only from `RESOURCES`), `chest` (keys from `ITEMS`, capacity), `record` (`fields(…, MINUTE_KINDS)`, sum against the minute), and `program`/`action` (through `checkProgram` plus `matches`, so an extra field is refused).
  - An activity's action and every program place go through that one check.
  - Nothing in the slice's change opens a new path.
- **Foundation:**
  - D-206, D-213 and the invariant save-version: the code does what they say.
  - D-443: the verbs' targets come from the data's properties. The tests choose the items by identifier.
  - No foundation entry is written or changed by this slice.
  - Changed tests marked with an invariant: "a document of another version is refused as version" and "the server's save of the current version loads…" (versions moved by one), the version-8 test (one assertion moved to the version-9 test), "a crafted document of the current version is refused whole as shape" (cases added), "a record at the edges of what it admits loads" (the bandage added to the every-item edge). There are two new tests marked `save-version`: the version-9 test and the control test of the verbs.
- **Guidelines:**
  - `coding-saved-game.md`: the version rule, refusal instead of an exception, and the strict load. They agree.
  - `coding.md`: the linter, the formatter and the size rule. They pass.
  - `testing.md`: expected values come from the foundation and the data by identifier, the trust boundary is tested directly, and changing an existing test needs a cause. They agree, except Minor 1.
  - No reserved choice is taken.
- **Code that passes a test without meeting its requirement:** none. The only product change is the constant.
- **The author's own-work check:** it names the backpack keys and the no-throw requirement, which is where the slice is weakest, and a mutation backs it. I repeated mutations of my own (below).
- **The author's walk:** not performed. The reason given is that the change is visible only once a version-9 save is discarded after deployment, which the cycle does not do. That agrees with the change: no screen changes, and the refusal path for another version is the existing one.

## Declined to judge

- A burning item that names an item that cannot be lit (for example the bandage or moss) loads (`src/browser/sim/saved-game.ts:994-999` reads `oneOf(burning.item, ITEMS)`). This behaviour exists before this slice. The spec asks only for refusing an item the data lack, so it is outside the task.
- An activity whose action differs from the action of the rule its `ruleId` names loads. The control test puts `tend` in the activity of rule 4, which is a craft rule. This load behaviour exists before this slice and is not asked by the task.
- An activity's length is not compared with the minutes of its action (the recipe for „Wytwórz”). This exists before the slice and is outside the task.

## Checks run

| Check | Where | Exit | Result |
|---|---|---|---|
| `npm test -- tests/sim/saved-game.test.mjs` | reviewed worktree, head | 0 | 47 pass, 0 fail |
| `npm test -- tests/sim/previous-programs.test.mjs` | reviewed worktree, head | 0 | 25 pass, 0 fail |
| Mutation A: tile stock read with `oneOf(key, ITEMS)` instead of `RESOURCES` in `pieces`, then `npm test -- tests/sim/saved-game.test.mjs` | review worktree | 1 | 46 pass, 1 fail: the crafted test, at "a tile whose stock names the bandage". Caught. |
| Mutation D: `SAVED_GAME_VERSION = 9`, then `npm test -- tests/sim/saved-game.test.mjs` / `npm test -- tests/sim/previous-programs.test.mjs` | review worktree | 1 / 1 | 30 fail / 1 fail. Caught. This is the failing first state the slice's *Checks* require. |
| Mutation E: `itemTargets` in `src/browser/sim/action-targets.ts:27` also admitting moss, then `npm test -- tests/sim/saved-game.test.mjs` | review worktree | 1 | 46 pass, 1 fail, at "„Wytwórz” in a program with moss, which the data give no recipe". Caught. |
| `npm run typecheck` | review worktree, head unchanged | 0 | |
| `npx eslint src/browser/sim/saved-game.ts tests/sim/saved-game.test.mjs tests/sim/previous-programs.test.mjs` | review worktree | 0 | |
| `npx prettier --check` (the same three files) | review worktree | 0 | all formatted |
| `node tests/quality/eslint-size-rules.mjs` | review worktree | 0 | "0 functions and files over a threshold in 340 files" |
| `npm test -- tests/sim/content-revision.test.mjs` | review worktree | 0 | 39 pass |
| `npm test -- tests/view/previous-save.test.mjs` | review worktree | 0 | 46 pass |
| `npm test -- tests/view/judging-cache-page.test.mjs` | review worktree | 0 | 6 pass |

Not run:

- The full gate (`npm test` with no argument) and any run over a folder of tests: the handoff forbids them, and the orchestrator holds that run.
- StrykerJS on `src/browser/sim/saved-game.ts`. The slice's only product change is a numeric literal, which Stryker's mutators do not change. Its run also executes every file of `tests/sim/`, which is the folder run the handoff forbids. The three hand mutations above stand in for it.
- The view tests `tests/view/account-screen.test.mjs` and `tests/view/game-saver.test.mjs`, which use the version. They use it relative to the constant. They are left to the gate.

## Reaches beyond the handoff

- `foundations/decisions.md:8155-8180` D-443, read whole. The handoff named it by its number only, and the slice's cases rest on it.
- `src/browser/sim/saved-game.ts:240-330`, `:340-382`, `:570-615`, `:640-722`, `:994-999`, `:1055-1080`, and grep of the readers of actions and programs: how the load reads the backpack, the tile stock, the chest, the activity, actions, programs, burning items and the record. I read them to judge the trust boundary, since the slice relies on them unchanged.
- `src/browser/sim/run-record.ts:14-29` (`MINUTE_KINDS`) and `src/browser/sim/action-targets.ts` (grep, line 27 for the mutation): where the minute kinds and the verbs' targets come from.
- `src/browser/sim/previous-programs.ts` (grep of the version): to judge the change to `tests/sim/previous-programs.test.mjs`.
- Grep of `SAVED_GAME_VERSION` and `version: 9` across `src` and `tests`: to look for other places the raise could break.

## Working copies

- A git worktree of the head commit, detached, at `.runs/review-11/wt`. It held a junction `node_modules` pointing to the reviewed worktree's `node_modules`, and was used for the mutations, the typecheck, ESLint, Prettier, the size rules and three test files. I removed the junction alone first (`cmd /c rmdir`), checked that the reviewed worktree's `node_modules` still stood, and then removed the worktree with `git worktree remove --force` and `git worktree prune`. `git worktree list` no longer shows it.
- Test output files in `.runs/review-11/` (`sg.txt`, `pp.txt`, `mA.txt`, `mD.txt`, `mD2.txt`, `mE.txt`, `tc.txt`, `one.txt`). Removed with the directory. `.runs/` no longer lists `review-11`.
- `git status --short` of the reviewed worktree is empty after the review. Nothing remains.

## Unread material

- `guidelines/testing.md`: read whole, in two parts (lines 1-207 and 208-510).
- `foundations/part_map.md:34-65`: read the simulation entry within that range (lines 34-65).
- `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:138-139` and `spec.md:85-87`, `:359-367`, `:381-384`: read as the handoff copies them word for word. I did not open the files themselves.
- `tests/sim/saved-game.test.mjs` (3916 lines): read the whole diff, the fixtures it builds on (`:95-229`), the helpers and the tests at `:990-1094`, `:2880-3000` and `:3150-3219`, and grep for the existing cases with unknown items and minutes. I did not read the rest of the file whole.
- `src/browser/sim/saved-game.ts` (1454 lines): read the ranges named under "Reaches", not the whole file. The slice changes one line of it.
- Everything else the handoff names I read whole: `guidelines/coding.md`, `guidelines/coding-saved-game.md`, `guidelines/coding-simulation-module.md`, `src/browser/AGENTS.md`, `src/browser/sim/data/items.ts`, `src/browser/sim/data/actions.ts`, D-206, D-213, save-version, the executor's report and `.the-way/task-cycle/review/SKILL.md`.

## Searches not found or unclear

- *To do* 14 ("the report sorts each changed file as one-time for the model") is not quoted in the handoff, so I cannot check the executor's sorting against its wording. The executor's report sorts all three files as one-time for the model.
- The handoff's foundation ranges (D-206 `:3905-3957`, D-213 `:675-719`, save-version `:1048-1057`) each matched the entry's heading.
