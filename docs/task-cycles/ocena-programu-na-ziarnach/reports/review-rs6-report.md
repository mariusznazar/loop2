PASS 7fc40efc

# Review rs6 — slice 6, task `ocena-programu-na-ziarnach`

Range `3218a620..7fc40efc` (one commit, `7fc40efc`); `git rev-parse HEAD` in the cycle's worktree gave `7fc40efcda8e0285db1b5a16c2f1844bd6d357f8`, the head given. Pinned the-way `19e5774a…` checked in both the cycle's worktree and the review worktree. Changed files: `src/browser/sim/saved-game.ts` (1 line), `tests/sim/saved-game.test.mjs`, `tests/sim/previous-programs.test.mjs`.

## What stands together (the pair of "Wersja podnoszona razem z kształtem")

- `src/browser/sim/saved-game.ts:85` `SAVED_GAME_VERSION` 8 → 9. `git log -G'SAVED_GAME_VERSION = ' <merge-base main>..7fc40efc` lists only `7fc40efc`, and `main` holds 8: the version rises once on the branch, for both shape changes (judgings of slice 4, `inARow`/`loopRecord` of slice 5).
- The document of version 9 (`tests/sim/saved-game.test.mjs:792-802`, `JUDGINGS` at `:766-786`) fills each new branch: judgings of two characters (1 and 2), two programs (1 and 3), three maps (forestEdge, forest, forestDeep); every kind of result (`MIXED_RESULTS` holds solved, death and undecided); take lists of 0, 1 and 2 entries; Ola's loop at `inARow` 2 below `loopRecord` 3. `HEADQUARTERS` adds `judgings: {}` and a run equal to its record. The first case (`:888-901`) loads the server's save of it into `DOCUMENT.game` with `deepEqual`.
- The document of version 8 is kept as `DOCUMENT_V8` (`:718`) and refused as `version` by a case of its own (`:1248-1267`), which also asserts `SAVED_GAME_VERSION === DOCUMENT_V8.version + 1` and that the game of version 8 under version 9 is refused as `shape`. Documents 1–7 keep their refusals. The precondition that moved from the case of version 7 to the case of version 8 is a move forced by the raise, not a weakened test (`guidelines/testing.md`, "Changing an existing test").
- The trust-boundary cases that `guidelines/testing.md` names for `saved-game.ts` reach the new places through the document: 16 crafted counts and 31 crafted judgings in `CRAFTED` (`:2304-2339`, `:2496-2570`), refused whole as `shape`; the sweep "no value a document can hold, at any place of it, throws out of the load" (`:2882`) walks `DOCUMENT`, so it covers `judgings` and the two counts; edge cases that should load (`:2979-3010`).

## Findings

### Blocking

None.

### Minor

None within the range.

### Out of scope

1. **Important by consequence, outside the task: a thorough player's remembered judgings can push the save past 64 KiB** — design of D-440 against D-104/D-207, not a defect of this slice. The measurement in `reports/slice-06-measure.mjs` is correct (see "The measurement of room" below): 300 judgings (5 characters × 20 programs × 3 maps) take 107.6 % of the limit with empty programs, 128 % with programs of 10 rules, up to 167 % in the worst case. What the player would see: from that point every save fails with „Nie udało się zapisać postępu: stan gry jest za duży. Zatrzymaj pętle albo usuń niepotrzebne programy.” (D-208), and progress since the last good save is at risk. Stopping loops does not free that room. Deleting or editing programs does, because that erases their judgings, but nothing tells the player that judgings take room. Fixing it needs a decision the task does not hold: a cap on remembered judgings, a shorter form of a judging, or a higher limit through D-104/D-207. This is for the human at the request, as the plan says.
2. **Minor, slice 5's code (`src/browser/sim/saved-game.ts:1154-1158`), outside the range: the load admits a `loopRecord` (and so an `inARow`) above `completed`.** The game's own functions never make such a state: `src/browser/sim/loop.ts:363-365` raises `completed`, `inARow` and `loopRecord` together from 0, so `loopRecord ≤ completed` always holds. The load already checks one relation between fields (`completed >= runNumber` refused), so a check `loopRecord > completed → refuse()` would fit. A crafted save of the player's own account can only inflate that player's own loop record in the report („najdłużej bez śmierci”), which costs no other player anything (D-07). "Wolno odmówić więcej" permits the check but does not require it. The executor named it as well.

## Declined to judge

- That `tests/sim/saved-game.test.mjs` was red at the base `3218a620`, where the load already required `judgings` and the two counts while the document had neither: the plan put the version raise in this slice, and those commits lie outside the range.
- `guidelines/testing.md:177` names the trust-boundary case of `tests/sim/previous-programs.test.mjs` as "a document of each version from 1 to 5 …". That name is stale: it said "1 to 8" before the range and "1 to 9" after. The text was already out of date before this change, and this range changes no guideline.
- The load admits empty levels of `judgings` (`{}` for a character or a program), which the game's own `judgingsWithoutProgram` never writes. That is slice 4's code. Admitting a value of the type is not a refusal of less, and the range's edge case only records that behaviour.
- `-0` in `inARow` (a value only an in-memory document can hold) loads as `-0` through `count`, the same function that reads `completed`. It changes no comparison, it predates the range, and JSON cannot carry it.

## The measurement of room (orchestrator's question)

- I re-ran `reports/slice-06-measure.mjs` at the head (`node <path>/slice-06-measure.mjs` from the review worktree's root). Its output was identical line for line to `reports/slice-06-measure-output.txt` (`Compare-Object`: 0 differences).
- Independent arithmetic from the JSON text of one remembered judging (mixed results: 4×`"solved"` + 4×`"death"` + 4×`"undecided"` + commas and brackets = 117 bytes, `"results":` 10; two equipment entries of 26 bytes each = 55, `"equipment":` 12; braces and comma 3 → 196 bytes; map key on average 11.7 bytes with colon, plus a comma; program-key wrapper about 2.3 bytes per judging over 3 maps) gives about 211 bytes per judging. The script gives 211.9. Then 6 913 + 300 × 211.9 ≈ 70 480 bytes against the script's 70 497. The figures are right.
- The shape the script builds by hand matches what the game writes: `rememberedOf` (`src/browser/sim/judging-record.ts:38-43`) writes `{results: kinds[], equipment: [{item, count}]}`, and the script's 3-map states load back through `loadSavedGame`.
- Two things the human should read the figures with. Neither changes the conclusion that the limit is within reach.
  - The script counts `game` alone, as the server's `Buffer.byteLength(game)` (`src/server/account-routes.ts:521`) does. But the body limit of D-104 and the browser's `maxSaveBodyBytes` (`src/browser/account-api.ts:195`, D-207) count the whole body `{"version":9,"basedOn":…,"game":…}`, about 35 bytes more. That is negligible.
  - The base state holds no manual map run and no earning loop. A save with a manual map run is about 9.8 KB (D-207, *Rejected*), and each earning loop holds a map run, so in play the room left for judgings is smaller than the "N judgings fit of 300" lines say. Those counts are upper bounds, not typical values.
- The 10-map figures use synthetic keys 10 characters long, as long as `forestEdge`. They are stated as not loadable, which is correct.

## Trust boundary (`src/browser/sim/saved-game.ts`)

The range touches it: it raises the version and adds the crafted documents of the new shape. I attacked the load myself with a probe (`reports/review-rs6-probe.mjs`, output `reports/review-rs6-probe-output.txt`). It builds a document of version 9 through the game's own functions (`createCharacter`, `createProgram`, `judgeAndRemember` on two maps for two characters, `startLoop`, `savedGame(withSaveTime(…))`, a JSON round trip). The document loads, also with `revision` beside it as the server hands it back. Then it alters one thing at a time, 70 cases:

- Counts: text, 1.5, −1, NaN, Infinity, `true`, `[]`, `{}`, 1e308 and 2^53 in both counts, run above the record, BigInt, a Number object, each count missing, a foreign key, a count present only on the prototype.
- Judgings: `__proto__` at the character, program and map level; map keys `constructor` and `toString`, program key `toString`; character keys `1.0`, ` 1`, `-1`, `0`, `1e0`, `99`; program keys `99`, `nextProgramId`, `0`, `01`; map keys `desert` and `FORESTEDGE`.
- Results: 0, 11, 13 and 1000 of them; a sparse 12; an object with `length` 12; a string; null; a result `SOLVED`, null, undefined, `__proto__` or `hasOwnProperty`; a result nested 100 000 deep; an extra own property on the list.
- Equipment: null; an entry without a count; items `__proto__` and `constructor`; counts −1, 1e21 and NaN; an entry given as an array or as null; 100 000 entries.
- Containers: `results` present only on the prototype; `judgings` as a Map, a class instance, a string or missing; a character level as a number; a map level as a list; a judging of a character taken off the team.

Every case was refused as `shape`, with no throw and the input left as it was, except `inARow` `-0`, which loaded (see Declined to judge). The loaded state shares no value with the document: I changed the document's results, equipment and count after the load, and the state stayed as it was.

## Tests and mutation

StrykerJS (`guidelines/testing.md`, "Mutation testing") ran on the lines of the new shape that the range's document and crafted cases protect: `saved-game.ts:1137-1168` (`earningLoop`), `:1254-1296` (`SEED_KINDS`, `rememberedJudging`, `rememberedJudgings`) and `:1419`. It used `tests/sim/saved-game.test.mjs` alone, so it measures what the range's test file catches. Result: 46 mutants, 42 killed, 4 survived, all equivalent:
- `SEED_KINDS` `solved/death/undecided: true → false` (`:1255-1257`): `oneOf` (`:216-222`) checks only `Object.hasOwn(closed, value)`, never the value.
- `characterKey(characterEntry, records, [] → ["Stryker was here"])` (`:1284`): `taken.includes(character)` compares a number with a string, so it never matches.

The line the range changes (`:85`, a number literal) has no mutant. Its protection is the precondition and the load of `DOCUMENT` at version 9.

The executor's own-work check (four hand mutations of the load, each turning the crafted case red) fits where the change is weakest, and Stryker confirms it more widely. The executor made no walk through the running product and gave a reason: the only visible effect is the decided refusal of version 8 saves (D-206), and no screen shows a judging in this slice. That reason holds.

`tests/sim/previous-programs.test.mjs`, edited outside the slice's *Change*: its precondition `SAVED_GAME_VERSION === 8` failed after the raise, a cause on the requirement side (D-206 raise). The edit adds a document of version 9 and extends the loop to `[6, 7, 8, 9]`. It strengthens the case and weakens nothing, so the edit is sound.

Quotations: the comment lines `decision:` added in the range quote D-206, D-241, D-440, D-165 and D-386. `foundation_check.py --skip-test-citations` finds no error in a file of the range.

## Checks run

All in a detached worktree of `7fc40efc` at `.runs/review-rs6/wt`, after `npm ci` (exit 0) and `git submodule update --init -- .the-way` (checked out `19e5774a…`, equal to the gitlink).

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/sim/saved-game.test.mjs` | 0 | pass |
| `npm test -- tests/sim/previous-programs.test.mjs` | 0 | pass |
| `npm test -- tests/sim/saved-game-judgings.test.mjs` | 0 | pass |
| `npm test -- tests/sim/loop-record.test.mjs` | 0 | pass |
| `node <reports>/slice-06-measure.mjs` | 0 | output identical to `slice-06-measure-output.txt` |
| `node ../probe.mjs` (= `reports/review-rs6-probe.mjs`) | 0 | 70 crafted cases: 69 `shape`, 1 loaded (`-0`, declined); no throw, input unchanged, result shares nothing |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1 | 5 errors, all the expected `D-243` quotations: `tests/view/account-screen.test.mjs:2683`, `:2807`, `:2975`, `tests/view/maps-screen.test.mjs:494`, `:700`; none in a file of the range |
| `npx eslint tests/sim/saved-game.test.mjs tests/sim/previous-programs.test.mjs src/browser/sim/saved-game.ts` | 0 | clean |
| `npx prettier --check` (same three files) | 0 | clean |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.review.json --mutate "src/browser/sim/saved-game.ts:1137-1168,…:1254-1296,…:1419-1419"` (`stryker.review.json` = the repo's config with `tap.testFiles` set to `tests/sim/saved-game.test.mjs` only) | 0 | 42 killed / 4 survived (all equivalent); summary in `reports/review-rs6-stryker-summary.txt` |

Not run, as the handoff says: `npm test` without a file argument (the full gate). Not run: the view tests that take `SAVED_GAME_VERSION` from the constant (`tests/view/account-screen.test.mjs`, `tests/view/previous-save.test.mjs`). They are not in the slice's *Checks*, and a grep of `tests/` found no other hand-written `version: 8` of the current version.

## Reaches beyond the dispatch

- `src/browser/sim/saved-game.ts:216-222` (`oneOf`), `:1112-1168`, `:1254-1422`: to judge the load of the new places and the surviving mutants.
- `src/browser/sim/judging-record.ts` whole and `src/browser/sim/judging.ts:30-115`: to check that the measurement's hand-built judgings have the shape the game writes, and to build the probe's document through the game.
- `src/browser/sim/loop.ts:95-124`, and a grep of `completed`/`inARow`/`loopRecord` in it: to build a loop in the probe and to judge the relation `loopRecord ≤ completed`.
- `src/browser/account-api.ts:185-200`, `src/server/account-routes.ts` (grep of the limit): which bytes the limits count.
- `foundations/decisions.md`: D-440 (11840-11865) and D-241 (8661-8685) whole, D-425 (825-842) for the size rule, D-208 (line 4016, the sentence on a save too large): the decisions the range quotes, and the consequence of the room finding.
- `stryker.config.json`: to run the mutation step the testing guideline gives to a reviewer of a simulation file.
- `tests/sim/understanding-fixture.mjs` (`newKnowingGame`, `withEdgeSolved`): for the probe.

## Working copies

- `.runs/review-rs6/wt`: a detached worktree of `7fc40efc`, with its `node_modules`, `.the-way` submodule, `stryker.review.json` and `.runs/stryker-review/`. Removed with `git worktree remove --force` (exit 0), then `git worktree prune`. It no longer appears in `git worktree list`.
- `.runs/review-rs6/` (`probe.mjs`, `stryker-out.txt`, `measure-rerun.txt`): removed whole; `Test-Path` gives False.
- Kept beside this report: `reports/review-rs6-probe.mjs`, `reports/review-rs6-probe-output.txt`, `reports/review-rs6-stryker-summary.txt`.
- I made no change in the cycle's worktree outside `reports/`. At the end its `git status` shows uncommitted files of another agent (`src/browser/view/maps-screen.tsx`, `src/browser/view/judging-lines.ts` and others), which I did not touch.

## Unread material

- The plan's "Foundation entries row 2" and "row 6": the handoff names them in *Read* but gives no table, and the plan file is not mine to read. I took them to be D-440 and D-241, the entries whose shape the slice versions, and read both whole.
- `src/browser/sim/types.ts`: I did not read it whole. I read the types through their use in `saved-game.ts` and `judging-record.ts`.
- `guidelines/testing.md`: read whole, in two pages. `guidelines/coding.md` and `guidelines/coding-saved-game.md`: read whole. D-206, D-213, D-386, D-207, D-104 and the invariant `save-version`: read whole at the lines given.
- `tests/sim/saved-game.test.mjs`: I read the diff of the range and the sweep (`:2882-2930`), not the whole file.

## Searches not found or unclear

- `git log -S'SAVED_GAME_VERSION = '` finds nothing, because the count of occurrences does not change. `-G` found the one commit.
- The `npm test -- <file>` output gave no TAP summary lines to my pattern (`# tests`/`# pass`), so I record the exit codes. The gate fails a run with no test executed (`guidelines/testing.md`, "Test files in the gate"), so an exit of 0 means the tests ran and passed.
