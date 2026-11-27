PASS e2850d3ffdf2379e794513a2f40994d959b08e28

# Review of Slice 6, task rana-i-opatrunek (review-change)

Range: base `17a80c095368a46b97a7ca549ebac3f1757d6596`, head `e2850d3ffdf2379e794513a2f40994d959b08e28`
(one commit, `e2850d3f`). `git rev-parse HEAD` in the worktree showed the head. Diff computed with
`git diff 17a80c09..e2850d3f` and `git log 17a80c09..e2850d3f`: `src/browser/sim/saved-game.ts`
(+7/-2), `tests/sim/previous-programs.test.mjs` (+12/-3), `tests/sim/saved-game.test.mjs` (+405/-56).

Risk: trust boundary `src/browser/sim/saved-game.ts` (invariant `save-version`). No operation that
cannot be undone.

## Findings

### Critical

None.

### Important

None.

### Minor

**m-1 — The document of the current version counts a tend that the rules could not have finished
(in scope).** `tests/sim/saved-game.test.mjs:1196-1203` (comment over `DOCUMENT`) and
`tests/sim/saved-game.test.mjs:1167-1172` (`run.practice.tending: 3`). The comment says the map run's
practice counts "the two turns of „Ucisk” of that combat, and the one tending with a bandage, the 5
minutes of „Opatrz” its record holds". But „Opatrz” lasts 10 minutes (`src/browser/sim/data/actions.ts:201`),
and Ala holds no rank of „Wprawna dłoń”, which alone shortens it (`src/browser/sim/data/skills.ts:242-248`).
So the 5 minutes in `RUN_RECORD.minutesByAction.tend` (`tests/sim/saved-game.test.mjs:891`) are no
finished tend. By D-191/D-193 practice counts only actions that ended in effect, so the third point of
`tending` describes a state the game does not make. The load does not compare practice with the
record, so no assertion is wrong and nothing a player sees changes. The cost is a misleading comment
in the document that the guideline makes the reference of the current shape
(`guidelines/coding-saved-game.md`, "Wersja podnoszona razem z kształtem"). A reader taking that
arithmetic as the game's rule would learn it wrong. Fix: `tending: 2`, the two turns of „Ucisk”, with
the comment saying so. Or keep 3 and name the point as one the record does not explain. Evidence: the
three lines cited.

**m-2 — The saved-game guideline does not name the cause of this raise (out of scope).** The comment
over the constant (`src/browser/sim/saved-game.ts:91-94`) now says the version rises too "where the
keys stay and an old document still describes a game the rules no longer make" (D-195). The list of
causes in `guidelines/coding-saved-game.md:100-126` names changes of the type, of the data's items,
of the gear's slots and of the ordinary actions. It also says a change of skills and branches "nie
podnosi wersji sama". It does not name this cause. The constant's comment and the task's item 9
carry it, so the code is right, but a later author who reads only the guideline does not meet it.
This lies outside the slice: the slice's *Change* names no guideline file, and task item 9 asks for
none. It is worth a decision of the human: changing the guideline goes through
`the-way-maintain-coding-guidelines`.

## What was checked against the task, the foundation and the guidelines

- **Task item 9 (`task_frozen.md:41`).** `SAVED_GAME_VERSION` is 12 (`saved-game.ts:96`), and the
  comment over it gives the reason item 9 names (D-195). A document of version 11 is refused as
  `version` (`tests/sim/saved-game.test.mjs:1718-1737`), and so is the document of version 12 written
  as 11.
- **The old document stays written out.** The test file is byte-identical between the target branch
  `origin/main` (`be4e9c09`) and the slice's base. So `DOCUMENT_V11` is the document of version 11 as
  it reached the target branch. The diff only renames it (`DOCUMENT` -> `DOCUMENT_V11`,
  `LAST_COMBAT` -> `LAST_COMBAT_V11`) and changes nothing inside it. Versions 1 to 10 keep their own
  tests. The list of other versions changed from `[0, 8, 9, 10, 12, -1]` to `[0, 9, 10, 11, 13, -1]`.
  Dropping 8 from it weakens nothing, since version 8 has its own test at line 1648. The pair
  `SAVED_GAME_VERSION === DOCUMENT_V10.version + 1` moved to the test of version 11 as `... V11 + 1`.
  The version rose, so the requirement itself is the reason for the change (`guidelines/testing.md`,
  "Changing an existing test").
- **The document of version 12 is not one that passes whatever the reader does.** "a document of the
  current version loads into the state it describes" compares the whole state with `deepEqual`. The
  new test at line 1676 holds literal values: the tree last among the known trees, the ranks
  `{ strongerRoll: 1, pressure: 1 }`, practice 110, `run.practice.tending` 3, the combat's 2, and the
  two turns as `["bandage", false, 0, 95]` and `["bandage", true, 0, 100]`. The health arithmetic
  checks out against the data and D-145: 72 - 7 + 30 = 95, and 95 - 7 + 30 capped at 100 = 100, where
  30 = 25 (`data/items.ts:110`) + 5 (`strongerRoll`). The points check out too: thresholds
  `[10, 28, 60, 110]` give 4 points, spent as 3 + 1. Edges: practice 60 and „Ucisk” at exactly 3
  points; three ranks of „Mocniejszy zwój” for 1 + 1 + 2. Mutation (below) and the run of the head's
  tests with the constant set back to 11 (below) show that the tests fail when the reader is wrong.
- **Hostile input at the boundary, as the dispatch lists it.** Each case is in `CRAFTED`, refused
  whole as `shape`:
  - a turn of „Ucisk” with damage 6, 0.5 or -6, and a refilled turn with damage 6;
  - „Ucisk” as the activity going on of the map run and of an earning loop, and a minute counted to
    `pressure`;
  - a rank of „Ucisk” at 2, and of „Mocniejszy zwój” and „Wprawna dłoń” at 4, all above their prices;
  - a rank in a tree the Understanding lacks;
  - ranks beyond the points at a team character, at the map run's character and at an earning loop's
    character;
  - a branch of another tree, and a skill with another key, no ranks or practice below 0;
  - the practice of `tending` at 0 in the map run and in the combat.

  The loader paths that refuse them (`characterSkills`, `saved-game.ts:416-445`; `characterAction`,
  `saved-game.ts:757-782`; the activity check at `saved-game.ts:715`) changed in Slices 4 and 5, not
  here. Older cases that write into `exchanges[3]` and `exchanges[4]` now reach a turn of „Ucisk”, for
  example "a refill marked on a dodge" and "a creature's action off its list". I checked each one: it
  still refuses for its own reason.
- **D-206, D-195, D-191, `save-version`, `previous-save-programs-reader`.** The code does what the
  entries say. The reader of previous programs takes versions up to `SAVED_GAME_VERSION`
  (`previous-programs.ts:64`), so a previous save of version 11 stays readable, and
  `tests/sim/previous-programs.test.mjs` now holds a document of version 12 with its precondition
  naming 12. No other file holds the number 11 as the version: `tests/view/previous-save.test.mjs`,
  `tests/view/account-screen.test.mjs` and `tests/view/judging-cache-page.test.mjs` read the constant.
- **Guidelines.** `guidelines/coding-saved-game.md`: the document is rewritten only together with the
  raise, the earlier documents stay and are refused as another version, and the constant equals the
  version of the document. All three hold. `guidelines/coding.md`: the formatter and linter were run by
  the executor, and the gate runs them again. The size limits do not reach test files (D-425, as the
  executor reports; not re-checked). `guidelines/testing.md`: data are picked by identifier, the
  expected values are written out, and the precondition is marked.
- **Reserved choice.** None taken.
- **Code made only to pass a test.** None. The only product change is the constant and its comment.
- **The executor's own-work check.** The requirement it named is that the crafted cases refuse for
  the reason the task names. That is where this change is weakest. The narrowed mutation run below
  confirms the check would catch it.
- **The executor's walk in a real browser.** Claimed, not re-run. What it judges a player sees after
  the change agrees with the change: an account with a version-11 save gets the band „Zapis
  pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” and a new game saved as
  version 12. Its cases follow from task item 9, and each unchecked case gives its reason.

## Invariant tests changed

All in `tests/sim/saved-game.test.mjs`, marked `save-version`:

- "a document of another version is refused as version, whatever its game holds": the list of
  versions, and "version 13 of another shape";
- "the document of version 10 is refused as version, whatever its game holds": the `+ 1` pair moved
  out;
- new: "the document of version 11 is refused as version, whatever its game holds";
- "a crafted document of the current version is refused whole as shape": 28 new named `CRAFTED`
  entries (lines 3360-3465), and „Ucisk” added to the table of rule-place targets;
- new: "„Ucisk” with the bandage stands in a rule of a program, a copy, a base and an earning loop's
  program, and loads";
- new: "the document of the current version holds the tree of „Opatrywanie małych ran”, its bought
  ranks and two turns of „Ucisk”, and the load gives them back";
- new: "the branches of „Opatrywanie małych ran” load at their edges: …".

In `tests/sim/previous-programs.test.mjs`: "a document of each readable version, the current one
included, gives its programs in order, a program without a trip plan skipped and named"
(`previous-save-programs-reader`) gains version 12.

## Declined to judge

- A saved fight with turns of „Ucisk” loads for a character who never bought the branch: known M-1 of
  Slice 4's review, not this slice.
- The crafted documents of „Ucisk” standing in `pressure.test.mjs`: known M-2 of Slice 4's review.
- After the last combat, the map run's gear holds two bandages in pockets (`DOCUMENT_V11` run gear),
  while the combat left the pockets empty. The game can reach this through two „Załóż” after the
  fight, the load compares neither, and the gear comes from the earlier task wyposazenie-postaci, not
  this slice.
- The surviving mutant of the predisposition check (`saved-game.ts:426`): pre-existing code outside
  the slice (classified below).

## Checks run

All in a worktree of the head at `.runs/review-6/`, with `.the-way` initialized at the pinned
`6ed3cb36` (equal to the gitlink) and `node_modules` a junction to the main checkout's.

- `npm test -- tests/sim/saved-game.test.mjs`: exit 0, 53 tests, 53 pass.
- `npm test -- tests/sim/previous-programs.test.mjs`: exit 0, 25 pass.
- `npm test -- tests/view/previous-save.test.mjs`: exit 0, 46 pass.
- `npm test -- tests/sim/loop-record.test.mjs`: exit 0, 24 pass.
- `npm test -- tests/view/account-screen.test.mjs`: exit 0, 132 pass.
- `npm run typecheck`: exit 0.
- Probe of the base constant. I set `SAVED_GAME_VERSION` to 11 in the review worktree, ran
  `npm test -- tests/sim/saved-game.test.mjs`, then restored the file with `git checkout`. Result:
  exit 1, 53 tests, 34 fail. Among the failures are "a document of the current version loads into the
  state it describes", "the current version is the one the document of the current version is written
  with" and "the document of version 11 is refused as version …". This agrees with the executor's
  first run.
- StrykerJS with a narrowed configuration of my own, kept at
  `.runs/task-cycles/rana-i-opatrunek/reports/review-6-stryker.json`. It mutates
  `saved-game.ts:86-96`, `:403-445` and `:750-785`, and its tests are `tests/sim/saved-game.test.mjs`
  and `tests/sim/previous-programs.test.mjs`. Command:
  `node node_modules/@stryker-mutator/core/bin/stryker.js run review6-stryker.json`, exit 0, 5 min 28 s.
  Result: 62 mutants, 60 killed, 1 survived, 1 no coverage.
  - The range of the constant (`:86-96`) gives no mutant, since StrykerJS has no mutator for number
    literals. The constant is held instead by the probe above.
  - Every mutant of the price check, the known-tree check, the branch-of-own-tree check, the points
    check and the zero-damage check of „Ucisk”/„Załóż” was killed.
  - Survived `[ConditionalExpression]` at `saved-game.ts:426:9`
    (`if (!predispositions.includes(id))` -> `if (false)`), and NoCoverage at `:426:40`. Both are
    equivalent under the current data: the data hold one archetype, `elementalMage`, predisposed to all
    nine skills (`data/archetypes.ts:16-33`), so no document a test can write meets a skill outside
    the predispositions. The code is outside the slice.
- The full suite was not run: it is the cycle's own run before the request. The CI file and
  `foundation_check.py` were not run here for the same reason.

## Reaches beyond the dispatch

- `git merge-base origin/main HEAD` and `git diff be4e9c09..17a80c09 --stat` on the two saved-game
  files: to confirm `DOCUMENT_V11` is the document of version 11 as it reached the target branch.
- `src/browser/sim/saved-game.ts:290-460, 700-790`: the loader paths the crafted cases rely on.
- `src/browser/sim/data/skills.ts:75-83, 230-266`: prices and thresholds of `tending`. `data/items.ts:110`:
  the bandage's healing. `data/actions.ts:196-201`, at head and at `be4e9c09`: the minutes of
  „Opatrz”, for m-1. `data/archetypes.ts:14-40`: to classify the surviving mutant.
- `foundations/decisions.md`: a search for „Ucisk” with save/load words (one passage of the D-145
  rationale, line 7073), to see whether a decision bounds the saved turn.
- `.claude/skills/loop2-deploy/references/backup_and_restore.md`, a search for
  `SAVED_GAME_VERSION`: no hard-coded number.
- A search of `tests/view/*.test.mjs` and `src/` for `SAVED_GAME_VERSION` and literal versions.
- `stryker.config.json`: to narrow it.

## Working copies

- `.runs/review-6/`, a detached worktree of `e2850d3f`, with `.the-way` initialized, the junction
  `node_modules` to `the `node_modules` of the main checkout`, my Stryker config, its log and JSON report,
  and the probe log. The junction was removed first with `rmdir`, then the worktree with
  `git worktree remove --force` and `git worktree prune`. The `.stryker-tmp` inside it went with the
  worktree. Removed.
- Six test logs that my first command wrote one level up, in
  `.runs/review-6-*.log` instead of inside my
  directory: removed by their full paths.
- Kept: `.runs/task-cycles/rana-i-opatrunek/reports/review-6-stryker.json`, the input of the mutation
  run.

## Unread material

- `src/browser/sim/types.ts`: not read whole. I read the loader's use of the types instead.
- `foundations/part_map.md:34-66`: not read. The trust boundary was taken from the dispatch.
- `tests/sim/saved-game.test.mjs`: I read the diff whole, lines 1-80, 780-1071, 1255-1300 and
  1990-2080, 3130-3365 and 3591-3616, and the list of the version tests (1502-1793) by search. Of the
  ranges the plan's *Read* names, 1387-1600 and 2982-3129 were not read line by line.
- `src/browser/sim/data/skills.ts`: read in the parts listed under reaches, not whole.
- D-144, D-150, D-145, D-380, D-363, D-290, D-379, D-120: not opened whole. The slice changes no code
  that they govern beyond the constant. The loader paths they bound changed in earlier slices.

## Searches not found or unclear

- none
