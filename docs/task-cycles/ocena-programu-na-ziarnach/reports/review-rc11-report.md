FAIL 730863c3

# Review rc11 — task `ocena-programu-na-ziarnach`, correction 1, slice 1

- Range: `4d813606..730863c3` (commits `056c2545`, `730863c3`); `git rev-parse HEAD` in the cycle's worktree gave `730863c3b781169501fa3e5872ebbf8460f43b1e`, the head given. Pinned the-way `19e5774a…` checked (`git -C .the-way rev-parse HEAD` equals the gitlink).
- Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md` (review of a correction).
- Slice reviewed: Slice 1 — a content revision for each saved program and the moment the game was made, in the simulation and its load.
- Files changed equal the slice's *Change* (9 files: `types.ts`, `programs.ts`, `game.ts`, `saved-game.ts`, `content-revision.test.mjs`, `program-list.test.mjs`, `copy.test.mjs`, `copy-actions.test.mjs`, `stryker.config.json`).

## Findings

### Important

**1. `newGame` stores any number as the moment the game was made, so the simulation can make a game state that its own load refuses**

- Place: `src/browser/sim/game.ts:385` (`export function newGame(madeAtMs = 0): GameState`) and `:421` (`madeAtMs,`).
- What is wrong: the strict load reads `madeAtMs` with `integer` (`src/browser/sim/saved-game.ts:1431`) and refuses any value that is not a safe integer. `newGame` takes the moment with no check and stores it as given. A game made with `newGame(1.5)`, `newGame(NaN)`, `newGame(Infinity)` or `newGame(2 ** 53)` is saved without complaint and refused as `shape` at the next load. D-206 then discards it and the player starts again.
- Why it matters: D-386 opens with „The load of a saved game state admits every game state the game's own functions make, so the game never writes a saved game state that its own load discards.” Its *Rationale* gives the means: „The moment a function stores is checked where it enters the game state, because a number the load would refuse must never reach a document.” Every other function that stores a real moment follows this: `withSaveTime` (`game.ts:778-783`), `momentAfter` (`game.ts:88-95`), the death settlements (`game.ts:698-705`, `:732-739`) and the loop functions (`loop.ts:410-445`, `:456`) all throw a `RangeError` on a moment that is not a safe integer. `newGame` is the one new entry point of a real moment, and it skips the check. Today only tests and the default 0 call it. In Slice 8 the page passes the clock's reading on three paths, where a fractional reading (a `performance.now()`-style value, or a computed moment) would type-check as `number`. It would cost the player the whole save one load later, with nothing visible at the moment the game is made. The plan says „`newGame` takes it as an optional argument and stores it”. That is the shape the plan asks for, and it is still a defect against D-386.
- Evidence: the review probe `reports/review-rc11-probe-load.mjs`, output in `reports/review-rc11-probe-load.txt`. `newGame(1.5)`, `newGame(NaN)`, `newGame(Infinity)`, `newGame(9007199254740992)` and `newGame("5")`, each followed by `withSaveTime`, `savedGame`, a JSON round trip and `loadSavedGame`, gave `refused shape` with no throw at `newGame`. The test `tests/sim/content-revision.test.mjs:345-351` checks only whole numbers.
- What would close it: `newGame` refuses a moment that is not a safe integer with a `RangeError`, as `withSaveTime` does, and one case shows the refusal.

Contradiction: yes — D-386 (first sentence of its binding text, „The load of a saved game state admits every game state the game's own functions make …”, and its *Rationale* on checking a stored moment where it enters the game state).

Slice: 1.

### Minor

**2. The balance instrument still builds saved programs without a content revision** (`balance/campaign.mjs:174-181`, outside the slice's *Change*)

`newAccount` builds the player's list as `{ id, name, program }`. With this slice the field `contentRevision` is required on `SavedProgram`, and the `.mjs` file is not type-checked, so those programs carry `undefined`. The first content write raises it to `NaN`: `undefined + 0` and `undefined + 1` are both `NaN`. For an account with `knowing: false`, that write is the first-chill rule during `advanceMinutes`. No measurement reads the field, and `npm test -- tests/balance/campaign.test.mjs` passes (exit 0), so no result changes today. The state is still one that neither the types nor the load admit. Evidence: the probe `probe-missing-field.mjs` (an edit of a hand-made item without the field gave `NaN`), and reading `balance/campaign.mjs:168-191`. Decision 3 of the spec already sends this file to a later slice for the fixed moment. The same change could add `contentRevision: 0` to each item.

**3. Wording in the new test file** (`tests/sim/content-revision.test.mjs:117`)

The comment over `COUNTERS_ALONE` says „The three counters-only differences”, but the object changes two counters (`nextGroupId`, `nextRuleId`). It is polish.

### Out of scope

none

## Remarks of correction 1 (`reports/correction-1-remarks.md`)

- Remark 1 (judgings out of the saved game, into a browser cache): **partly made, for this slice's share.** The slice adds what the cache's check and key need: the content revision of each saved program (D-442) and the moment the game was made (D-04, D-386), written by the save and read by the strict load. The judgings are still in the game state and the save (Slice 9), and the cache, its key and its erasing come in later slices. That is the plan's order, not a gap of this slice.
- Remark 2 (let through): nothing to make.
- Remark 3 (the sentence in „Kto idzie” as a link): not in this slice.
- Remark 4 (`guidelines/testing.md:177` title): not in this slice.
- Remark 5 (accepted): nothing to make.

## What was checked against the task and the foundation

- **Where the revision rises (D-442, spec Decisions 2 and 6 S1).** `withProgramContent` (`programs.ts:391-407`) adds 1 where `contentDiffers` finds a difference. `contentDiffers` compares `[groups, tripPlan]` by `sameData`, which ignores key order and keeps array order (`programs.ts:311-320`), with the counters left out. `withProgramSaved` (`programs.ts:416-428`) is its only caller. A grep of `src/browser` for `withProgramContent|withProgramSaved|programs:` shows these writers of a listed program's content: `editProgram` (`programs.ts:612`), `saveCopyIntoProgram` (`:745`), `setProgram` without a run (`game.ts:449`) and the first-chill write in `advanceMinutes` (`game.ts:897-902`), all through `withProgramSaved`. The other writes of `programs` are `createProgram`, `appendPrograms` and `saveCopyAsNewProgram` (each at 0), `renameProgram` (spread, keeps the revision), `deleteProgram` (filter) and `newGame` (0). No other place in the simulation writes content into a listed program. The view changes the list only through these functions (D-04).
- **New programs at 0:** the first program of `newGame` (`game.ts:387-394`), `createProgram` (`programs.ts:488`), `appendPrograms` (`:525`), `saveCopyAsNewProgram` (`:782`).
- **The strict load at the trust boundary** (`save-version`, `guidelines/coding-saved-game.md` „Odmowa zamiast wyjątku”, „Ścisłe wczytanie”). The item of the list is read with `fields(item, ["id","name","program","contentRevision"])`, so its keys are exactly these four, own data keys, with `__proto__` counted. The revision is read with `count` (a safe integer from 0) and the moment with `integer` (a safe integer of any sign). Both are built into new objects, and nothing compares them with a clock or with anything else. The version stays 9 (`saved-game.ts:85`), as spec Goal 1 says.
- **Crafted version-9 documents** (probe, output kept in `reports/review-rc11-probe-load.txt`):
  - Revision: missing, null, `"3"`, -1, 1.5, NaN, ±Infinity, 2^53, 1e21, `true`, `[]`, `{}` and `3n` are all refused as `shape`. An extra key `revision`, an own `__proto__` key beside the revision, the revision only under `__proto__`, an inherited revision and a getter that throws are all refused as `shape`, and the getter is never run. 0, `MAX_SAFE_INTEGER` and -0 are admitted; -0 reads as 0 and saves as 0.
  - Moment: missing, null, a string, NaN, ±Infinity, 1.5, ±2^53, `{}`, `5n`, an extra key `madeAt` and the moment under another name are all refused as `shape`. 0, -0, -5, `MIN_SAFE_INTEGER`, `MAX_SAFE_INTEGER` and 8.64e15 are admitted as given.
  - Nothing threw.
  - Round trip: a game with moment -42, one edited program (revision 1) and one created and renamed program (revision 0) loads back `deepEqual` to the state saved (probe `probe-roundtrip.mjs`).
- **Irreversible operation:** none in the range. The change only adds fields, their raising and their load; nothing is removed or sent.
- **D-04 and `simulation-isolation`:** no simulation file reads a clock or the moment; `madeAtMs` is only stored, saved and loaded.
- **Tests:** `content-revision.test.mjs` covers each case of spec Decision 10, first item:
  - 0 for the first program, a created one, an appended one and a copy saved as new;
  - one rise for each of eight content changes through each of `editProgram`, `setProgram` and `saveCopyIntoProgram`;
  - the first chill, with the other program kept;
  - A→B→A raised twice;
  - none for a rename, the same content, counters alone, or keys made in another order;
  - none for a pick, a send or the deletion of another program;
  - the moment of a new game.

  The expected values start at 3, so a reset to 0 or 1 cannot pass. The changed expectations in the three older files give their reason in a comment (`program-list.test.mjs` „an edit replaces …” at revision 1, `copy.test.mjs` first chill at revision 1). No assertion was weakened.
- **`decision:` lines the range adds:** checked by hand against D-442, D-04 and D-386. Each quotes from the beginning of a binding sentence, word for word. The foundation check reports no quotation error in any file of the range.
- **Guidelines:** the rules reached are coding.md (linter, formatter, size), coding-simulation-module.md and coding-saved-game.md (isolation, unchanged arguments, refusal instead of exception, strict load) and testing.md (Changing an existing test, Test inputs, Trust boundaries, Mutation testing). No departure was found besides Finding 1. The new load cases carry no `// invariant: save-version` line. Spec Decision 10 places the marked cases in `tests/sim/saved-game.test.mjs`, which Slice 2 rewrites, so I took this as no finding (see Declined).
- **Reserved choice:** none taken.
- **The executor's own-work check** (mutations of the comparison and of the load's `count`) fits where the change is weakest. My Stryker run agrees on every new line: see Checks.
- **The executor's walk:** the change alters nothing a user sees. That holds: no screen reads either field yet, and `newGame()` with no argument behaves as before.

## Declined to judge

- `src/browser/sim/previous-programs.ts` still takes an item only with exactly `id`, `name`, `program`. A version-9 previous save written by this code (items with `contentRevision`) would have every item skipped. This is Slice 3's change by the plan and spec Decision 6. No version-9 previous save can exist before version 10, and `tests/sim/previous-programs.test.mjs` passes at the head.
- `tests/sim/saved-game.test.mjs` is red by design (its version-9 document lacks both fields); Slice 2 rewrites it. Not run.
- `withProgramSaved` still erases judgings by a `JSON.stringify` comparison (key order counts) while the revision uses `sameData`. The two can disagree only for content whose keys come in another order. The first run's code goes in Slice 9.
- The new trust-boundary cases in `content-revision.test.mjs` are not marked with `save-version`; Slice 2 places the marked cases in `saved-game.test.mjs`.
- `balance/engine.mjs` and `balance/campaign.mjs` passing a fixed moment (spec Decision 3) belongs to a later slice. Only the missing revision of Finding 2 is noted.

## Checks run

All ran in a detached worktree of `730863c3` at `.runs/review-rc11/wt`, after `npm ci` (exit 0).

| Check | Exit |
|---|---|
| `npm test -- tests/sim/content-revision.test.mjs` | 0 |
| `npm test -- tests/sim/program-list.test.mjs` | 0 |
| `npm test -- tests/sim/copy.test.mjs` | 0 |
| `npm test -- tests/sim/copy-actions.test.mjs` | 0 |
| `npm test -- tests/sim/death.test.mjs` | 0 |
| `npm test -- tests/sim/loop.test.mjs` | 0 |
| `npm test -- tests/sim/catch-up.test.mjs` | 0 |
| `npm test -- tests/sim/loop-record.test.mjs` | 0 |
| `npm test -- tests/sim/discovery.test.mjs` | 0 |
| `npm test -- tests/sim/previous-programs.test.mjs` | 0 |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 |
| `npm test -- tests/invariants/test_saved_program_edit.py` | 0 |
| `npm test -- tests/invariants/test_copy_save.py` | 0 |
| `npm test -- tests/balance/campaign.test.mjs` (for Finding 2) | 0 |
| `npx tsc -p tsconfig.browser.json --noEmit` / `tsconfig.sim.json` | 0 / 0 |
| `npx eslint` on the 8 changed TS/MJS files | 0 |
| `npx prettier --check` on the 9 changed files | 0 |
| `node tests/quality/eslint-size-rules.mjs` | 0 (0 over a threshold in 336 files) |
| `python -B .the-way/elements/common/foundation_check.py` | 1: 13 errors, none in a file of the range. 12 are quotation errors in `judging-record.test.mjs`, `previous-programs.test.mjs`, `saved-game-judgings.test.mjs`, `saved-game.test.mjs` and `view/previous-save.test.mjs` (later slices). The 13th is `judging-cache-reading` with no citing test (Slice 5 or later). These are the errors the orchestrator named. |
| `node probe-load.mjs` (crafted documents, `newGame` with bad moments) | 0, results above |
| `node probe-roundtrip.mjs` (save and load `deepEqual`) | 0 |
| `node probe-missing-field.mjs` (item without the field, then an edit) | 0, printed `NaN` |
| StrykerJS, `--mutate "src/browser/sim/programs.ts:374-407,src/browser/sim/game.ts:385-422,src/browser/sim/saved-game.ts:487-505,src/browser/sim/saved-game.ts:1428-1432"`, with a copy of `stryker.config.json` (`stryker.review.json`, in my worktree only) whose `tap.testFiles` were narrowed to the four test files of the slice | 0 |

StrykerJS was run with the test files narrowed because the full list includes `saved-game.test.mjs`, which is red by design and would fail the initial run.

- `game.ts`: 9 of 9 mutants killed.
- `programs.ts`: 11 of 11 killed.
- `saved-game.ts`: 11 killed, 10 survived and 2 not covered. Every survivor and uncovered mutant lies on lines the range did not change: `:493-496` (the uniqueness of numbers and names) and `:505` (the empty list). They are protected by the excluded `saved-game.test.mjs`, so they are no gap of this slice. The mutants on the changed lines `:490`, `:502` and `:1431` were all killed.

Not run: the full gate (`npm test` with no argument), by the handoff; `tests/sim/saved-game.test.mjs`, red by design until Slice 2.

## Reaches beyond the dispatch

- `foundations/decisions.md`, D-441 (whole, lines 11924-11948): named by the orchestrator's notes as an entry the range realizes.
- `src/browser/sim/game.ts:84-95`, `:778-790` and a grep for `RangeError` in `src/browser/sim/`: to see how other functions guard a stored moment, for Finding 1.
- `balance/campaign.mjs:160-199` and greps of `balance/` for `nextProgramId|contentRevision|madeAtMs`, `knowing` and the content-writing functions: callers outside the *Change* that build `SavedProgram` values, for Finding 2.
- `src/browser/sim/saved-game.ts:80-219`, `:770-799` and `:1300-1500`: the strict load's helpers and `game()`, to judge the boundary.
- `src/browser/sim/programs.ts:295-625` and `game.ts:425-454`, `:880-919`: callers and writers of a listed program's content.
- `stryker.config.json`: to run StrykerJS as `guidelines/testing.md` „Mutation testing” gives.

## Working copies

- `.runs/review-rc11/wt` (a detached worktree of `730863c3`, with its `.the-way` submodule and `node_modules`): removed with `git worktree remove --force`, followed by `git worktree prune`.
- `.runs/review-rc11/`: removed whole. It held the probes `probe-load.mjs`, `probe-roundtrip.mjs` and `probe-missing-field.mjs`, the logs of the runs, the StrykerJS JSON report and incremental file, and the narrowed StrykerJS config, which was inside the worktree.
- Kept beside this report, because the report cites them: `reports/review-rc11-probe-load.mjs` and `reports/review-rc11-probe-load.txt`.
- No remainder.
- At my last `git status`, the cycle's worktree showed `M tests/sim/previous-programs.test.mjs`. I did not write it: I made no change in the cycle's worktree. Another agent is presumably writing there, as the handoff warns.

## Unread material

- `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-saved-game.md`, `guidelines/testing.md` and `src/browser/AGENTS.md`: read whole.
- Read whole: D-442, D-386, D-165, D-441 and the invariant `save-version`.
- D-04: read lines 59-88 (the binding text and the start of its fields), not the remainder of its *Verification*, *Rationale* and *Rejected*.
- D-123: binding text only (7558-7571), not its *Verification* to the end nor its *Rationale*.
- D-213: lines 671-684 (binding text and fields to *Relations*).
- Invariants `simulation-isolation`, `simulation-inputs` and `saved-program-edit`: read whole.
- Glossary `program`, `copy` and `content revision`: read.
- Part map `simulation` (33-64): read.
- The spec: read whole. The executor's report and the remarks: read whole.
- `src/browser/sim/*.ts`: read in the ranges named under Reaches, not whole.
- `tests/sim/program-list.test.mjs`, `copy.test.mjs` and `copy-actions.test.mjs`: read in the diff, not whole.
- The frozen task: not opened. The handoff's section „Passages of the frozen task” is empty, and the plan's *Read* names no passage of the task.

## Searches not found or unclear

- The handoff's section „Passages of the frozen task” holds no passage. I judged against the spec passages, the plan's slice and the foundation entries it names.
- `round trip deepEqual: false` in `review-rc11-probe-load.txt` compares JSON texts, which differ only in the order of keys. The `deepEqual` round trip of `probe-roundtrip.mjs` passed.
- Nothing else.
