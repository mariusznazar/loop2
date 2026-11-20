PASS ad90dd334377f0a24821cef0e70f0a53388906e3

# Review of the whole change — task `zapas-i-wskrzeszenie`

Range: `46cfec71..ad90dd33` (31 commits; `git rev-parse HEAD` = `ad90dd33…`, as given). Method: `.the-way/task-cycle/review/SKILL.md`, variant "the whole change" (`whole_change.md`). Reviewer did not make the change; read-only; no subagent.

Bound by: the frozen task (`task.md`, read whole), the plan (`plan.md`, read whole), the human's remarks (`correction-1-remarks.md`; remark 3 replaces "uses left" in the settlement by `usesSpent` and makes the load refuse only a save with more spent than the new count, also with an open end-of-run window; remark 1 makes the campaign take its loop-minute step from `balance/loop.mjs`).

## Findings

### Critical

none

### Important

none

### Minor — within the task

New in this review:

1. **`balance/progression.mjs:99-124` and `:236-240` — the stock of a measured program is brought out only by the best program of each earlier map, and nothing says so.** `stockOnMap` runs manual runs of a solved map with `candidate.program`, the best program of that map (`candidates` built from `map.bestProgramId`), so what reaches the chest is that program's bring list, not anything a player could bring with another program. Where the best program of an earlier map does not bring out an item the measured program takes, the stock ends "not complete" after 100 runs and the map is measured with less than question 13 calls a generous state ("Zapas: lista „Zabierz” mierzonego programu, o ile ręczne przejścia map już rozwiązanych pozwalają ją wynieść"); question 13 also says that a failure "przy takim stanie jest pewnym sygnałem, że mapa wymaga pętli", which holds only if the state is generous. The skill (`.claude/skills/loop2-balance/SKILL.md`, section "Measuring whether each map can be solved…", and its copy) says the stock is "brought out by manual runs of the solved maps before it" and does not say by which program, so a reader of "the stock not gathered in full" reads it as "cannot be brought out". The measurement of this task is not affected: both later maps got their stock complete in 3 runs (slice 4 report; my reproduction for Las — głębiej on seeds 1-60: 4 runs, complete). Why Minor: today's result stands; the cost is for the next map whose take list names an item the earlier best program does not bring. Remedy: one sentence in the skill naming the stocking program, or let the stocking try the measured program and the reference programs whose bring list names the items.

2. **`src/browser/sim/types.ts:303-304`, `src/browser/sim/game.ts:740`, `src/browser/sim/saved-game.ts:881` — the settlement kind `resurrectionReady` now means "found the stock full", while the function `resurrectionReady` (`game.ts:118`) now means "at least one use left".** The same word names two different states in one module: a first completion at 2 of 3 uses finds the resurrection "ready" by the function and is settled `resurrectionRenewed`, not `resurrectionReady`. The doc comment of `CompletionSettlement` says what the kind means, so no code reads it wrongly today. The kind is a key of the saved document, so a rename needs the version raised; that is why it is Minor and a later change's matter.

Carried from the slice reviews, still present, judged within the task (wording of the reviewers kept short; places checked at the head):

3. `tests/sim/team.test.mjs:729-731` — the test's comment begins "Task question 15: …", pointing at a document outside the foundation, which `guidelines/testing.md` ("Where the expected value comes from": „Komentarz testu nie wskazuje dokumentu spoza fundamentu”) forbids (review-s56-fix M-F1). The return step, which records `usesSpent` in the foundation, is the natural place to give the rule of remark 3 a foundation entry this comment can name.
4. `src/browser/sim/trip.ts` (`tripLoot`, its `Pick<GameMapRun, "bringPlan" | "character" | "solvedMapRun">`) — `solvedMapRun` is picked and no longer read; `loop.ts:337` and `balance/engine.mjs` still pass it (review-s34 m-2). Code with no user after the change.
5. `balance/progression.mjs:41` (`LOOP_COLUMN_COUNT = 3`) and `:320-329` (`withoutLoopColumns`) — the table is cut out of the map check's Markdown by counting columns, knowledge of `balance/check-map.mjs` held a second time ("Jedno miejsce wspólnej rzeczy" of `guidelines/coding-balance-instrument.md`); guarded only by the test of the six column names (review-s34 m-5).
6. `balance/progression.mjs:100` and `:206` — the stocking character and the measured character buy ranks from the same points, so points are spent twice; not written in the skill (review-s34 m-7, second half).
7. `src/browser/sim/game.ts` comments of `teamAfterDeath` ("`nowMs` is taken as a safe integer; the caller checks it") and `settleDeath` ("a `nowMs` that is no safe integer is a RangeError") — `momentAfter` (`game.ts:88-94`) also throws for a safe `nowMs` whose `nowMs + renewal` is no safe integer (review-s56 M-1).
8. `tests/sim/saved-game.test.mjs` (the marked completion, "Of the three berries … carries two") — pins 2 berries from one play instead of comparing with the unmarked completion, which D-189 makes the independent expectation (review-s07 M1).
9. `foundations/decisions.md`, D-240 *Rationale* ("…than a character higher on it died with the resurrection", "a character whose resurrection another's turn reaches") and *Rejected* ("the resurrection going to the character that died first in real time") — still the one resurrection, while the binding sentence speaks of the last use (review-s01 M-2). Not on the handoff's list of entries the return step corrects; it is an entry this change rewrote.
10. `foundations/decisions.md`, D-190 *Rejected* — lacks some ways not chosen of questions 2 and 4 (review-s01 M-1); `foundations/invariants.md`, `resurrection-renewal` — several rules in one sentence (review-s01 M-3).
11. Names and comments of tests that still say the old thing: `tests/sim/catch-up.test.mjs:205` ("the clock stopped" for a running clock), `tests/sim/loop.test.mjs:1401` (`readyAt`), `tests/view/team-lines.test.mjs:187` ("for 8 hours of renewal"), `tests/view/clock.test.mjs:616` ("an hour after the reading" for about two hours), `tests/view/world-area.test.mjs:277` (`notReady`), and the titles in `tests/view/end-window-game.test.mjs` / `end-window.test.mjs` ("where the resurrection was ready") (review-s810 M-2, M-6; review-s1114 M-2, M-5; review-s1518 2). Assertions right; words mislead.
12. Wrapping: `balance/check-map.mjs:4`, `.claude/skills/loop2-balance/SKILL.md:99` (and its copy), `guidelines/styleguide-browser-view.md:679` (review-s810 M-5, review-s1518 2).
13. Invariant citations on cases that do not hold the invariant: `tests/sim/trip.test.mjs:585` and the marked-deposit case of `tests/sim/saved-game.test.mjs` cite `solved-map-manual-run` (now about practice only) for checks of the chest (review-s02 1, review-s34 m-3).
14. `tests/view/trip.test.mjs:211-226` — "the enter line of a map already solved is cut by the chest" passes no solved state to `entersLine`, so it repeats the unsolved case; the requirement is held by the jsdom case of `tests/view/maps-screen.test.mjs` and by the type `Chest` (review-s1518 1).
15. Test gaps of slices 8-10: `tests/sim/death.test.mjs:246-271` loads a hand-made used-up state under a D-386 quotation about states the game's functions make (review-s810 M-3); `tests/sim/catch-up.test.mjs` no longer asserts the clock started anew after the stock refilled (M-4); no campaign case counts completions alongside covered deaths in one return (review-s810-fix M-2).
16. `tests/balance/campaign.test.mjs:289-321` runs a process (`spawnSync`) in a file of the unit recipe of `guidelines/testing.md` (correction-1 m-3).
17. `src/browser/sim/saved-game.ts` settlement check (around `:834-841`) — a window whose death spent more uses than the team now stores spent is refused at a count between the two; this follows remark 3 if "zużytych" counts the settlement's spent, not if it counts only the team's (correction-1 m-1). For the orchestrator to put to the human only if the stricter reading was meant.

### Minor — outside the task's scope

- On the screen of a manual run of a solved map, „Wprawa w tym przejściu: Eksploracja +1” stands under „Mapa jest już rozwiązana: to przejście nie płaci wprawy; …” (walk report, side observation). That is D-194 and D-201 as they stood before this task (a run of a solved map keeps its practice with the run); the task changed only the line of D-215. A player may read the two lines as contradicting each other. Outside the task.
- `guidelines/coding-saved-game.md` was edited by hand, not through `the-way-maintain-coding-guidelines` (correction-1 m-4); the slice 14 executor wrote no failing run first (review-s1114 M-3). Process records, no consequence in the files.

No finding blocks, so no finding carries a slice or a mark of contradiction.

## Against the task, item by item

- To do 1 (take from the chest, „Restart” included): `startRun` (`game.ts:323-343`) takes every start through `takeTrip`; the take from nowhere is gone (`trip.ts`), `sendTake` takes a chest always. Held by `tests/sim/trip.test.mjs` (solved run and restart take from the chest) and the walk (cases 5, 6). Met.
- To do 2 (deposit, no practice, D-185 line, losses): `tripLoot` makes no exception; `advanceMinutes` pays practice only for an unmarked run; load admits the marked deposit by the common rule (`saved-game.ts` `deposited`); walk cases 7-9, 12. Met.
- To do 3 (uses, clock, first solving, settlement, load, catch-up order): `usesAt`, `teamAfterDeath`, `settleCompletion` (`game.ts:96-135`, `:634-666`, `:716-745`) do what D-190, D-240 and D-242 say; I traced the returns (`back = min(spent, 1 + floor((now − next)/R))`, next moment `next + back·R`), a death with the clock running keeping its moment, a death settled at an earlier real moment never moving it back, and a first completion at a return moment counting the return first. Data: `resurrectionUses: 3`, `resurrectionRenewalRealMinutes: 240`. Settlement holds `usesSpent` (remark 3), the window computes the uses left when drawn. Load: `resurrectionUses` (`saved-game.ts:504-517`) and the settlement check; the remark-3 test line stands (`tests/sim/team.test.mjs:732-762`, lowering 3→1 with the window open after a first death loads, two spent refused). Met.
- To do 4 (texts, styleguide): `team-lines.ts`, `end-window-lines.ts` (with `renewalSpanText` for question 16), `trip-lines.ts`, `maps-screen.tsx`; the warning, its constant, rule and comments gone; styleguide's two sentences and the D-251 number changed. Wordings checked letter by letter against question 6 and D-215/D-216/D-217. Met.
- To do 5 (instrument): loop and map check start full (`newGame`), `--no-resurrection` spends all with the clock at the loop's start (`balance/loop.mjs` `startState`), the campaign tries with one use left (`dueAttempt` through `resurrectionReady`), returns counted by `resurrectionAt` and the game's catch-up in steps (`passAway`), the step taken from `MS_PER_LOOP_MINUTE` of `balance/loop.mjs` (remark 1). Switch text in `cli.mjs` and both skill copies (byte-identical) speaks of uses; `progression.mjs` has its row in the table of the kind. Met.
- To do 6 (measurement): `balance/progression.mjs`, command `progression`; slice 4's run on seeds 1-500: best programs 97.4 % (Skraj lasu), 99.4 % (Las), 92.4 % (Las — głębiej); the stop rule did not trigger. My reproduction at the head (Las — głębiej, seeds 1-60): best P10 91.7 %, P9 45 %, stock in 4 manual runs. The table names no program content. Met (see Minor 1 for the limit of the stocking).
- To do 7 (foundation, D-251): D-438 written as the task quotes it (*Relations* `none`, *Verification* an agent's comparison, within question 7); D-189, D-179, D-214, D-190, D-220, D-240, D-242, D-428, D-215, D-216, D-217, D-329, the four invariants and the glossary entry `resurrection` say what the code does; D-251 is on the list of withdrawn numbers with no successor, and `git grep D-251` finds no other reference. Met.
- Settlements rows 1-10: each found in the entry the row names (row 2's "a later direction, not built" stands in D-190's rationale, its binding part — numbers of the account, no item — in the binding sentence). Fidelity to the sources: nothing altered or invented found; the projected entry's `Meaning (pl)` line is a field of the definition's template only (`.the-way/project-level/definition_template.md`), rightly not carried.
- Known and left to the return step (not reported as findings): D-386, glossary `generation number`, D-241 rationale, D-219 verification, D-194 rejected, D-04 verification, D-56's neighbour, D-216 heading, D-329's binding "with their warnings", D-428's `tests:` clause, and recording `usesSpent`.

Foundation entries the change goes against or leaves stale in a way a reader is misled by, beyond the return step's list: D-240 *Rationale*/*Rejected* (Minor 9). No invariant test changed its rule beyond the entries the change rewrote; the cases citing `trip-transfer`, `trip-run-end`, `solved-map-manual-run` and `resurrection-renewal` were changed with those entries.

Guidelines: the change agrees with `guidelines/coding.md` (size rule, linter, formatter), `testing.md` (save for Minor 3, 8, 13-16), `coding-simulation-module.md`, `coding-saved-game.md` (version raised with the shape, the old document kept and refused as another version, the data bound added to its list), `coding-content-data.md`, `coding-browser-module.md`, `coding-balance-instrument.md` (save for Minor 5), `styleguide-browser-view.md` and `src/browser/AGENTS.md` (no value in place of a token; CSS changes are comments and a removed rule).

Trust boundary `src/browser/sim/saved-game.ts`: counts above the data's, negative, fractional, non-finite, text, null, `true`, a list; a moment with none spent, missing with some spent, fractional, text, object, beyond either safe bound; the old key beside and instead of the new; a settlement's `usesSpent` missing, 0, below 0, fractional, infinite, text, null, above the count, beside or replaced by `usesLeft`, and on a run going on — all refused as `shape` by the code and by the cases of `tests/sim/saved-game.test.mjs` (crafted table, marked `save-version`) and `tests/sim/team.test.mjs`. My probe on the built head added `true`, `[1]`, `{}` and a missing key (refused) and `-0`, `±MAX_SAFE_INTEGER` moments (admitted, as D-386 gives; no throw at a reading). No operation that cannot be undone.

The executors' own-work checks and the walk: the walk's cases follow the task's requirements (16 cases, colours read from computed styles, screenshots outside the repository; no screenshot file in the range). Its one unchecked part (hover/focus of unchanged shared buttons, part state on Postać) gives reasons.

## The structure of the code the change leaves

`python -B .the-way/task-cycle/change_file_sizes.py 46cfec71 ad90dd33` (exit 0): 56 files, +2120 lines. Growth of note: `src/browser/sim/game.ts` 897 → 960 (+63: `usesAt`, `momentAfter`, `renewalMs`, `resurrectionAt` and the two settling functions), `src/browser/sim/saved-game.ts` 1411 → 1433 (the excepted file), `balance/campaign.mjs` 610 → 644, `balance/cli.mjs` 529 → 559, `balance/progression.mjs` new 360, `tests/sim/team.test.mjs` 167 → 783; shrunk: `trip.ts` 143 → 109, `trip-lines.ts` 107 → 82, `maps-screen.tsx` 481 → 466. The size rule of D-425 (`tests/quality/eslint-size-rules.mjs`, the script the invariant test reads; the invariant is not marked violated) reports 0 functions and files over a threshold on the base (323 files) and 0 on the head (326 files): the change pushed nothing over. Code left with no user: the `solvedMapRun` of `tripLoot`'s parameter (Minor 4). Names no longer true: Minor 2, 11.

## Declined to judge

- The practice line on a solved run (D-194, D-201): behaviour the task does not change (listed above as outside the scope).
- The player descriptions of `balance/players/` that say "ready": the plan keeps them, reading "ready" as "a use left".
- Whether the numbers 3 and 4 hours and the 20 % share are right for the game: settled by the human (questions 4, 7), to be tuned in later tasks.
- The adequacy of the measured shares for maps after Las — głębiej: outside the task (question 7 binds this task only).

## Checks run

| Check | Result |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, 0 errors |
| `python -B .the-way/instruction-files/check_instructions.py` | exit 0, 0 error, 143 warn, 7 info; no warning on the changed skill |
| `npm run typecheck` | exit 0 |
| `npm test -- <file>` one at a time: `tests/sim/team`, `saved-game`, `trip`, `death`, `completion`, `catch-up`, `loop`; `tests/view/end-window-lines`, `team-lines`, `maps-screen`, `trip`, `world-area`, `clock`, `account-screen` (132 pass); `tests/balance/progression`, `campaign`, `loop`, `check-map`, `cli` | each exit 0, no failure |
| `npx eslint` and `npx prettier --check` on the changed `.ts`/`.tsx`/`.mjs` files | exit 0 both |
| `python -B .the-way/task-cycle/change_file_sizes.py 46cfec71 ad90dd33` | exit 0 (table above) |
| `node tests/quality/eslint-size-rules.mjs <worktree>` on worktrees of base and head | exit 0 both; 0 reports both |
| StrykerJS, as `guidelines/testing.md` "Mutation testing" asks, on `src/browser/sim/game.ts:76-135,634-666,716-745` (the rules of the uses), a copy of `stryker.config.json` with the test list `team`, `death`, `completion`, `catch-up`, `loop`, in a worktree of the head | exit 0; 89 mutants, 85 killed, 4 survived, 0 no coverage. Survivors: two string literals of error messages (`:91`, `:722`, not worth holding); `next === null ||` removed at `:104` (equivalent: with `next` null the count is 0, so the arithmetic gives the same `{0, null}`); `events: []` of `settleCompletion` at `:744` (not part of the changed rule) |
| `npm run --silent balance -- progression --maps forestDeep --seeds 1-60` in a worktree of the head | exit 0; best P10 91.7 %, stock in 4 manual runs |
| Probe of the load with crafted team values (built head) | as reported under the trust boundary |

Not run: the full `npm test` (the cycle's own run before the request; CI runs it on the request), as the handoff gives.

## Reaches beyond the dispatch

- `tests/quality/eslint-size-rules.mjs`, `tests/quality/test_function_and_file_size.py`, `stryker.config.json`, `package.json` scripts: to run the size rule and StrykerJS as the method asks.
- `.the-way/project-level/definition_template.md` (search for `Meaning (pl)`): whether that line of the projected entry belongs in a decision.
- `balance/engine.mjs` (`prerequisitesOf`, `makeState`): how the progression chains maps.
- Lines of `foundations/decisions.md` found by a search for old resurrection words (D-04 line 98, D-385 line 4225, D-239, D-246, D-248): to tell stale entries from those that stay true.
- The review reports `review-s02`, `review-s07`, `review-s34`, `review-s1518` (search for "Stryker" only): which ranges had a mutation run.

## Working copies

- `.runs/review-whole/` held: git worktrees of `46cfec71` (`base`) and `ad90dd33` (`head`), the head one with a directory junction `node_modules` to the reviewed worktree's `node_modules` and Stryker's sandbox, its config copy and report, the build the balance run made; the decision index and extracts, logs of the checks, the probe script. The junction was removed first with `rmdir` (the reviewed worktree's `node_modules` checked intact), then `git worktree remove --force` for both and `git worktree prune`, then the directory by its full path. Nothing remains; `git worktree list` shows neither, and `git status` of the reviewed worktree is clean. The report needs nothing kept in `reports/`.

## Unread material

24 decisions of the index read whole (the index of the whole selection was written with `decision_index.py` and read: 116 listed in full, 263 by heading; sections "Maps: their content, time and solving", "Team, body, death and resurrection", "Trip plan, chest and items", "Earning loop and time away", "Screen Mapy and Siedziba", "Screen of a map run and the end-of-run window", "Balance measurement", "Saving the game state and the previous save", parts `simulation`, `browser-view`, `balance-tools`, `agent-workflow`, `product-foundation`, and the decisions the task names or the altered tests quote). Read whole: D-189, D-190, D-214, D-215, D-216, D-217, D-438, D-220, D-179, D-240, D-242, D-386, D-219, D-221, D-194, D-428, D-329, D-183, D-185, D-206, D-246, D-427, D-429, D-437 (and D-251 in the diff, before its withdrawal).

- Decisions bearing on the change read by their binding sentences in the index only: D-22, D-239, D-388, D-398 (named by the task as staying), D-18, D-368, D-64 (quoted by altered tests).
- Invariants: read whole the 22 the change reaches (`trip-transfer`, `trip-run-end`, `solved-map-manual-run`, `resurrection-renewal`, `death-settled-once`, `catch-up-state`, `catch-up-death-moment`, `catch-up-minutes`, `save-version`, `instrument-game-agreement`, `balance-instrument-file-writes`, `balance-instrument-repeatability`, `loop-practice-payment`, `first-map-stock`, `first-map-balance`, `trip-plan-progress`, `character-team`, `minute-span-split`, `function-and-file-size`, `simulation-isolation`, `simulation-inputs`, `cross-part-imports`); the other invariants of the touched parts by identifier and *Part* only.
- Glossary: entries `resurrection`, `generation number`, `wall`, `solved map`, `manual map run`, `completion`, `earning loop`, `trip plan`, `catch-up` read; the rest not; the-way's glossary not read.
- Part map: entries `browser-view`, `simulation`, `account-server`, `build-tools`, `balance-tools`, `agent-workflow`, `product-foundation` read whole; the rest not.
- Guidelines: all read whole (`guidelines/coding.md`, `testing.md`, `coding-simulation-module.md`, `coding-saved-game.md`, `coding-content-data.md`, `coding-browser-module.md`, `coding-balance-instrument.md`, `styleguide-browser-view.md`, `src/browser/AGENTS.md`).
- The diff: product code, foundation, guidelines, skills and the tests of the trust boundary (`saved-game.test.mjs`, the new cases of `team.test.mjs`) read in full; the other test diffs (`catch-up`, `death`, `completion`, `loop`, `account-screen`, `clock`, `end-window*`, `maps-screen`, `world-area`, `balance/*`) read in parts and judged through their passing runs, the slice reviews and the mutation run, not line by line.
- Reports: `slice-04-executor-report.md`, `walk-report.md`, `minor-findings-so-far.md` read whole; the other executor, fix and review reports and the findings files not read (searched only for "Stryker").

## Searches not found or unclear

- Whether the return step also corrects the *Rationale* and *Rejected* of D-240: not on the handoff's list; unclear (Minor 9).
- How the progression picks the program that brings the stock out: not settled by the task (question 13 leaves the way to the cycle) and not written in the skill (Minor 1).
