FAIL 0fde9df091c2a4bb27b3d8de99fdc9f18c3d0ab4

# Review of slices 3 and 4 of `zapas-i-wskrzeszenie` (grouped review)

- Range: `814cb8b1..0fde9df0`, two commits: `74652031` (slice 3) and `0fde9df0` (slice 4). `git rev-parse HEAD` in the worktree is `0fde9df091c2a4bb27b3d8de99fdc9f18c3d0ab4`, the head given.
- Diff computed with `git diff 814cb8b1..74652031` and `git diff 74652031..0fde9df0`; 12 files, as the handoff lists.
- Counts: blocking 2 (both slice 3), Minor 7 (4 slice 3, 3 slice 4), out of scope 0.
- Stop rule (question 7): **not triggered.** I reproduced part of the measurement independently and found no reason to doubt the executor's shares (see "The measurement" below).

## Findings

### Important

**I-1 (slice 3). `tests/sim/trip.test.mjs:670` still quotes the old sentence of D-214, in a case this slice rewrote, and the case now asserts the opposite of the quote.**

The case "a run records at its start whether its map was solved, and a restart after the solving completion records it anew" (`tests/sim/trip.test.mjs:668`) had its body rewritten in `74652031`: the restart now takes from the chest (`assert.deepEqual(restarted.team.chest.pieces, { stick: 2, berry: 3, moss: 2 })`, lines 680-688). But its line 670 still reads:

```
// decision: D-214 "A map run restart after the completion that solved the map is such a run: it takes its equipment from nowhere and pays nothing"
```

D-214 now says (`foundations/decisions.md`, D-214): "A map run restart after the completion that solved the map is such a run: it takes its equipment from the chest and pays no practice." The slice's goal requires "each `decision:` line quoting a sentence Slice 1 rewrote quotes the sentence as it stands now", and the executor's report claims "Every `decision:` quote that Slice 1 rewrote now quotes the sentence as it stands (D-189, D-214)" — false for this line. Why it matters: the case claims to hold a rule of D-214 the game no longer has, and the foundation check fails on it. Evidence: `python -B .the-way/elements/common/foundation_check.py` (exit 1) prints `tests/sim/trip.test.mjs:670: the quotation stands in no binding sentence of `D-214``; it is the only error the check reports in the files of this range (`tests/sim/trip.test.mjs`, `tests/sim/run-record.test.mjs`, `balance/`, `tests/balance/`). The one-line fix is the quote line 72 of the same file already carries.

Contradiction: yes — D-214 (the case's `decision:` line restates D-214 with the sentence the entry no longer holds, while its assertions follow the new sentence).

**I-2 (slice 3). The comment of `clippedTake` in `src/browser/sim/trip.ts:79-80` still says the old rule of D-189.**

```
/**
 * The take list as a run of a solved map takes it (D-189): each entry cut by the carrying capacity
 * and the map's entry cap in list order, the list's own counts standing in for the stock. Pure.
 */
```

After this slice no run of a solved map takes its list that way: every start goes through `takeTrip` from the chest (`src/browser/sim/game.ts:283`), and D-189 says "A manual map run of a map already solved takes its equipment from the chest and brings its loot out to it as every other map run does (D-179), and pays no practice." The slice's goal requires that "the comments ... of `trip.ts` say what holds now", and the executor updated the comments of `sendTake`, `takeFromNowhere` and `tripLoot` in the same file but left this one. Why it matters: a reader of the simulation (and the agent of slice 16 or 17, which still meets this function through the view's `rehearsalMark` in `src/browser/view/trip-lines.ts:37`) reads, under the citation of D-189, a rule D-189 no longer has. By the method's rule on a file that restates a foundation entry differently (WAY-263) this is Important; the fix is one comment, saying what the function computes (the take list clipped by capacity and entry cap with the list's own counts as stock) without attributing it to a run of a solved map.

Contradiction: yes — D-189 (the comment cites D-189 for taking from nowhere, which D-189 now rejects).

### Minor

**m-1 (slice 3). The cases of the from-nowhere functions now quote the new sentence of D-189, which they do not hold, and two of their names and a comment still state the old rule.**
`tests/sim/trip.test.mjs:623` ("takeFromNowhere clips ..."), `:649` ("clippedTake lists ..."), `:823` ("sendTake at a solved map takes the take list from nowhere ..."), `:834` ("sendTake at a solved map is not cut by any chest's stock ...") and `:845` ("the backpack of a solved map's run is the entries sendTake gives from nowhere") each carry `decision: D-189 "A manual map run of a map already solved takes its equipment from the chest ..."` while asserting a take from nowhere; the block comment at `:785-787` says "an unsolved map takes from the chest, a solved one from nowhere", and the name at `:845` says the backpack of a solved map's run is taken from nowhere, which is false after this slice. The plan keeps these functions and their cases until slice 16, and the quote change follows the plan's wording mechanically, so the cost is limited to that interval; Minor because the cases test functions that still exist, but the `decision:` lines are a traceability claim that is untrue. Recommended: drop the D-189 line from these five cases (or cite no decision) and rename the case at `:845` and fix the comment at `:785-787`, or let the slice that removes the functions remove the cases with them; for the orchestrator to place.

**m-2 (slice 3). `tripLoot` keeps `solvedMapRun` in its `Pick` type (`src/browser/sim/trip.ts:115`) and no longer reads it.** `src/browser/sim/loop.ts:337` and `balance/engine.mjs:193` pass it in literals. Harmless; the comment now says the mark "does not change the list". Executor's concern 3; a later cleanup.

**m-3 (slice 3). `tests/sim/trip.test.mjs:586` cites `invariant: solved-map-manual-run`, whose sentence is about practice only ("adds no practice to any character skill"), for a case that checks only the take from the chest.** `trip-transfer` is the invariant that case holds. Pre-existing citation, left as it was by the rewrite.

**m-4 (slice 3). The comment of `takeFromNowhere` (`src/browser/sim/trip.ts:94-96`) speaks of the plan, "until the slice that removes it".** Product code describing the process that will change it; it goes stale the moment the plan changes. Say what holds: no start of a map run calls it.

**m-5 (slice 4). The table is made by rendering the map check's table and cutting its last three columns from the text** (`balance/progression.mjs:41` `LOOP_COLUMN_COUNT = 3`, `withoutLoopColumns` at `:320-329`). The count 3 is knowledge of `headerOf` in `balance/check-map.mjs:79-91` held a second time, and the cut parses Markdown by `" | "`. A new column of the map check, or a loop column moved, makes this table wrong silently except for the test's exact six names (`tests/balance/progression.test.mjs:271-279`, which does guard it). Minor: guarded, and `check-map.mjs` is outside the slice's *Change* (executor's concern 2). Exporting the cell helpers, or giving `renderTable` the columns to print, is the follow-up.

**m-6 (slice 4). `neededBranches` counts only branches whose effect opens an action** (`balance/progression.mjs:47-59`); a program that needs a branch of another kind, as `wastelandCleanFlame` (P22) needs "Czysty płomień" (`cleanFlame`, `src/browser/sim/data/skills.ts:133-139`), is measured without it. The skill says so ("read such a row as measured without it"). I checked that it changes nothing in this measurement: with the practice Las — głębiej is measured with (flame spell 10), `buyBranch` cannot buy `cleanFlame` (cost 3 points; my script: `cleanFlameBought: false`), and P22 with the rank given outright solves 0 % of seeds 1-60 on Las — głębiej. Executor's concern 3; Minor.

**m-7 (slice 4). The stocking runs make the state more generous than the game in two ways the table's sentence does not say.** In `stockOnMap` (`balance/progression.mjs:99-124`) a death in a stocking run is left unsettled, so it costs no use of the resurrection and no practice; and the stocking character buys the ranks of the stocking program (`skillsFor(candidate.program, practice)`, `:100`) from the same points the measured program's ranks are bought from (`:206`), so points are spent twice. Neither matters for the measured numbers (no best program needs a branch; the stocking program P23 solves 97.4 % of Skraj lasu, and all runs of my reproduction were solved), and the first is in the skill ("its death is not settled"). The second is not written anywhere; one sentence in the skill would do.

### Notes on the executor's concerns (not findings)

- Concern on `--programs`: a narrowed run picks the best program of each earlier map among the programs named, so its state and its count of manual runs differ from the full run. The skill says so ("a narrowed run is no cut of the whole table"); acceptable as documented.
- The executor found the plan's "the view still calls `takeFromNowhere`" wrong; I confirm: the view calls `sendTake` with a `null` chest (`src/browser/view/trip-lines.ts:54`) and `clippedTake` (`:37`), and `takeFromNowhere` has no caller outside `src/browser/sim/trip.ts:104` and the tests.
- Choice of how the state is built: a sweep from a state built through the game's functions (practice summed along `prerequisitesOf`, ranks by `buyBranch`, stock by `send` / `advanceMinutes` / `end`), not the campaign extended. It answers question 13 and the "Questions carried to cycle" item, it names its choice in the report, and every map run of it goes through the game's functions or the engine (D-427, "Przejście mapy jak w grze").

## Slice 3 against its section

- Every start takes from the chest through one function: `startRun` (`src/browser/sim/game.ts:276-289`) calls `takeTrip` for every start; `send` (`:439`) and `restart` (`:499`) both go through `startRun`. The earning loop already used `takeTrip` (`src/browser/sim/loop.ts:73`). Restart after the solving completion takes from the chest: case at `tests/sim/trip.test.mjs:70` (chest 9 to 6) and `:668`.
- Completion of a marked run deposits the frozen bring list clipped as any completion: `tripLoot` no longer returns `[]` for a marked run (`trip.ts:114-127`), and `advanceMinutes` deposits `tripLoot(endedRun, …)` for every completed run (`game.ts:855-863`); practice is paid only where `!endedRun.solvedMapRun` (`:872-886`), and `settleCompletion` still returns early for a marked run (`:654`). Cases: `trip.test.mjs:690`, `:361`, `:753`.
- Death, „Zakończ” and „Restart” lose what was carried: no code change was needed (`end` drops the run, `restart` takes anew, a death deposits nothing); death on a marked run covered at `trip.test.mjs:766`, the general case at `:294`.
- `takeFromNowhere`, `sendTake` with a `null` chest and `clippedTake` stay exported and their code unchanged, as the plan says.
- Comments of `solvedMapRun` and `deposited` (`types.ts`), `startRun` and `advanceMinutes` (`game.ts`) say what holds; `trip.ts` except `clippedTake` (I-2).
- Rewritten cases give their reason (the hand-counted chest arithmetic in comments); the D-189 and D-214 quotes match the foundation as slice 1 left it, except `trip.test.mjs:670` (I-1).
- Trust boundary (`src/browser/sim/saved-game.ts`): not changed in this range. Slice 3 makes the completed marked run hold a non-empty deposit, so I checked that the load admits it whole: a copy of `tests/sim/saved-game.test.mjs` with only line 3128 changed to expect a non-empty deposit passes its round trip of every state, the completed marked run included (see Checks). The crafted-input checks the handoff lists (resurrection shape) belong to slices that change `saved-game.ts`, not to this range.
- Walk through the running product: not made by the executor, with reasons (screens about to change in slices 15 and 17; the walk recommended at slice 17). The reason is given, and the change is visible to the player (chest counts, the preview line), so the walk stays owed by a later slice.

## Slice 4 against its section

- Question 13: practice from the first solvings of the maps before, each by the best program of that map, median per skill of its solved runs on the measurement's seeds (`medianPractice`, `measureMap`), summed along the chain of maps that open the map (`prerequisitesOf` is transitive: `balance/engine.mjs:72-80`); ranks bought with the game's `buyBranch` as far as the points reach in the branches the program needs (see m-6 for the reading of "needs"); stock of the measured program's take list from manual runs of solved maps, refused above `BALANCE.chestCapacity` (the number of the game, not a copy), with the count of runs; every program measured on seeds 1-500 from that state; the map counts by its best program.
- Question 14: the table has the map check's columns without the earning loop's (`Map`, `Program`, `Solved (seeds 1-500)`, median minutes, deaths by cause, runs at the cap), programs as `P1`…`P23`, and one sentence under it with the number of manual runs; I read the executor's table and sentence and found no skill, branch, rank or item; the test scans for them (`tests/balance/progression.test.mjs:262-312`).
- Question 11 and the rules of the kind: numbers of the game from the built game (`BALANCE.chestCapacity`, `MAPS`, `BRANCHES`, `SKILLS`); reference programs from `tests/sim/reference-programs.mjs`; shared things imported (`DEFAULT_CAP_MINUTES`, `quantile`, `seedRange`, `sweep`, `makeState`, `buildSkills`, `prerequisitesOf` from `engine.mjs`, `LOOP_START_MS` from `loop.mjs`, `renderTable` from `check-map.mjs`, `programLabels` from `describe.mjs`); no file write (only `balance/cli.mjs` writes, through `delivered`); fixed clock `LOOP_START_MS` and the measurement's seeds; the comment at the top names `instrument-game-agreement`; unknown map and unknown program refused before any measurement (`progression.mjs:277-282`, `cli.mjs` `runProgression`); a row `copy` in "Files of this kind" (`guidelines/coding-balance-instrument.md:24`). D-429: no result committed.
- D-428 / D-427: labels only, no identifier in the table; reference programs read from their one file.
- Both copies of the skill are byte-identical (`cmp` equal) and describe the command, its flags, the state, the table and the 20 % reading as no number for later maps (question 7).
- `--seeds` defaults to 1-500 for `progression` in the measurement, not in the flags (case at `tests/balance/cli.test.mjs:539`).

## The measurement

The executor's shares of the best programs: Skraj lasu 97.4 % (P23), Las 99.4 % (P10), Las — głębiej 92.4 % (P10), all above the 20 % of question 7. My independent reproduction (my own script, my own stocking loop on other seeds, through the engine's `sweep` and the game's `send` / `advanceMinutes` / `end`), in `.runs/review-s34/` (removed):

| Reading | Executor | Reviewer |
|---|---|---|
| Skraj lasu, P23, seeds 1-500, new character, empty chest | 97.4 % | 97.4 % |
| Practice paid by the first solving of Skraj lasu (median of P23's solved runs) | exploration 1, gathering 41, fire-making 1, eating 16, flame spell 5 | identical |
| Stock of P10's take list (stick 8, berry 7) from Skraj lasu by P23 | 3 runs (seeds from `lastSeed` 1, 2, 3) | 2 runs (seeds from `lastSeed` 1001, 1002), both solved |
| Las, P10, from that state | 99.4 % on 1-500, median 480 | 100 % on 1-60, median 480; 99.4 % on 1-500 |
| Practice Las — głębiej is measured with | exploration 3, gathering 64, fire-making 2, eating 27, flame spell 10 | identical |
| Las — głębiej, P10, from that state | 92.4 % on 1-500, median 654, combat 22, cold 16 | 91.7 % on 1-60, median 620, combat 3, cold 2 |

The shares of the first map also agree with D-398's own measurement of Skraj lasu (naive 16.8 %, decent 96.4 %, best 97 %), which the executor's rows P2, P3 and P4 repeat exactly. I find no reason to doubt the numbers. The difference in the count of manual runs (2 against 3) comes from the seeds of the stocking runs; the sentence under the table reports a count that depends on those seeds, which is in the nature of the reading and not a fault.

## Declined to judge

- The load's refusal of crafted documents at `src/browser/sim/saved-game.ts` (counts above the data's, a moment with no use spent, wrong types): `saved-game.ts` is not changed in this range; the resurrection's saved shape is changed by other slices, whose reviews check it.
- The two view cases failing by the plan (`tests/view/trip.test.mjs:406`, `tests/view/world-area.test.mjs:239`, slice 17) and `tests/sim/saved-game.test.mjs:3128` (slice 7): placed by the orchestrator, outside these slices' *Change*.
- The other errors `foundation_check.py` reports (76 in all) in files these slices do not change (`tests/sim/loop.test.mjs`, `team.test.mjs`, `saved-game.test.mjs`, `tests/view/clock.test.mjs`, `trip.test.mjs`, `maps-screen.test.mjs`, `account-screen.test.mjs`, the listing of `resurrection-renewal`): later slices' files.

## Checks run

Focused tests, each `npm test -- <file>` in the reviewed worktree (no tracked file changed; `git status --short` clean after):

| File | Exit | Note |
|---|---|---|
| `tests/sim/trip.test.mjs` | 0 | |
| `tests/sim/run-record.test.mjs` | 0 | |
| `tests/sim/saved-game.test.mjs` | 1 | one failure, line 3128, expects the old deposit `[]` (slice 7 by the handoff) |
| `tests/sim/completion.test.mjs` | 0 | |
| `tests/balance/agreement.test.mjs` | 0 | |
| `tests/view/trip.test.mjs` | 1 | one failure, line 406, "Wyniesie: patyk 3" for "Wyniesie: nic" (slice 17) |
| `tests/view/world-area.test.mjs` | 1 | one failure, line 239, same (slice 17) |
| `tests/view/end-window-game.test.mjs` | 0 | |
| `tests/sim/catch-up.test.mjs`, `death.test.mjs`, `loop.test.mjs`, `rules.test.mjs`, `first-map-balance.test.mjs`, `encounters.test.mjs` | 0 each | `rules.test.mjs` reads the text of sources; the executor left it unrun |
| `tests/view/run-screen.test.mjs`, `maps-screen.test.mjs`, `state-store.test.mjs`, `program-editor.test.mjs`, `account-screen.test.mjs` | 0 each | |
| `tests/balance/progression.test.mjs` | 0 | |
| `tests/balance/cli.test.mjs` | 0 | |
| `tests/balance/check-map.test.mjs` | 0 | |
| `tests/invariants/test_balance_instrument_file_writes.py` | 0 | |
| `tests/invariants/test_balance_instrument_repeatability.py` | 0 | |
| `tests/invariants/test_cross_part_imports.py` | 0 | |
| `tests/agent_workflow/test_loop2_balance_skill.py` | 0 | |
| `tests/quality/test_function_and_file_size.py` | 0 | `progression.mjs` (360 lines) under the thresholds |

Other checks:

- `npx eslint` on the 9 changed code and test files: exit 0. `npx prettier --check` on the same: exit 0.
- `python -B .the-way/elements/common/foundation_check.py`: exit 1, 76 errors; in the files of this range only `tests/sim/trip.test.mjs:670` (I-1).
- Mutation testing (testing guidelines, "Mutation testing"): StrykerJS on the changed simulation lines, `--mutate "src/browser/sim/game.ts:282-289,src/browser/sim/game.ts:854-883,src/browser/sim/trip.ts:114-130"`, with a copy of `stryker.config.json` under `.runs/review-s34/` whose only changes are the test list without `tests/sim/saved-game.test.mjs` (it fails in the initial run by the plan, and Stryker refuses to start on a failing test) and the report paths: exit 0, 34 mutants, 34 killed, 0 survived. The first attempt with the repository's config stopped on that failing initial test (exit 1), as said.
- Load round trip of the completed marked run with its deposit: a copy of `tests/sim/saved-game.test.mjs` under `.runs/review-s34/`, its fixture imports pointed at `tests/sim/` and line 3128 changed to `assert.notEqual(doneMarked.run.deposited.length, 0)`, run with `node --test --test-name-pattern="loads back from its saved document"`: 2 pass, 0 fail.
- `cmp .claude/skills/loop2-balance/SKILL.md .agents/skills/loop2-balance/SKILL.md`: equal.
- Reproduction of the measurement: `node .runs/review-s34/reproduce.mjs .runs/review-s34/reproduce.json`, exit 0; results in the table above.
- Not run: the full `npm test` (the cycle's own run before the request), `check_instructions.py`, and `npm run balance -- progression` for the whole table (the reproduction covers the best programs' chain).

## Reaches beyond the dispatch

- `foundations/decisions.md` D-397 and D-404 (read whole, beside D-398, which follows them in the file): to compare the first map's shares with an earlier measurement.
- `src/browser/view/trip-lines.ts:25-56`: to see which view functions still call `clippedTake` and `sendTake` with a `null` chest (I-2, notes).
- `balance/engine.mjs` (lines 1-135, 180-260, 300-375) and `balance/check-map.mjs` (whole): what `progression.mjs` imports, `prerequisitesOf`, `makeState`'s full Understanding, `renderTable`.
- `src/browser/sim/game.ts` `send`, `restart`, `end`, `settleCompletion` and the end of `advanceMinutes`; `src/browser/sim/data/skills.ts:120-145` (`cleanFlame`); `tests/sim/reference-programs.mjs:625-682` (the registry and P22): for slice 3's paths and the executor's concern 3.
- `tests/sim/saved-game.test.mjs:3110-3140`: the failing case, to check the load round trip behind it.
- `guidelines/coding-simulation-module.md`, `coding-balance-instrument.md`, `coding.md`, `testing.md`: named in *Read*; `testing.md` led to the mutation run.

## Working copies

- `.runs/review-s34/` held the test logs, `reproduce.mjs` and its `reproduce.json`, the Stryker config copy and its `mutation.json`, the copy of the saved-game test and the foundation check log. Removed before return with `rm -rf` by its full path. No git worktree was made.
- `.stryker-tmp/` (ignored), a sandbox my first, failed Stryker run left: removed by its full path.
- `dist/` was rebuilt by `npm test` (the product's own tool, ignored); left as it is.

## Unread material

- `.runs/task-cycles/zapas-i-wskrzeszenie/task.md` and `plan.md`: only the passages copied into the handoff (by design of the handoff).
- `foundations/part_map.md:33-64` (simulation): not read; `:127-157` (balance-tools, agent-workflow) read.
- `foundations/decisions.md` D-183, D-185, D-186, D-187, D-194: read whole; D-179, D-189, D-214, D-438, D-427, D-428, D-429, D-437, D-388, D-398: read whole.
- `tests/sim/reference-programs.mjs`: lines 1-45, 283-433 by grep of headings, 625-682 only.
- `tests/sim/trip.test.mjs`: the diff, the list of case names and lines 294-330, 665-690, 766-790, 845-870; not whole.
- `tests/sim/saved-game.test.mjs`: lines 1-31 (imports) and 3110-3140 only.
- `.claude/skills/loop2-balance/SKILL.md`: the diff only, not the whole file.

## Searches not found or unclear

- "Foundation entries row (new)" in the handoff: no heading of that name; the entry is D-438 ("May the progression require the player's absence?"), as the executor also took it.
- Whether "the branches the measured program needs" (question 13) covers branches other than those that open an action: not defined in the task or the foundation; see m-6.
- Whether slice 16 of the plan removes the from-nowhere cases of `tests/sim/trip.test.mjs` with the functions (m-1): not checked, as the plan's other slices are outside my handoff.
