# Slice 22 report

**Status:** done with concerns (concerns below: spec pointers left, partial reads)

**Base:** HEAD at start `1eec81dcb80bac856577bf0e565d788f844c90d6` (as the handoff said), worktree clean.
**Commit:** `a9c59e17` on `task/martwe-odsylacze-origin` (`git add` by path, not pushed).
**Files changed:** 9 test files of `tests/sim/`, 75 insertions, 84 deletions; only comment lines (checked: `git diff -U0` shows no changed line that is not a comment). `foundations/decisions.md` unchanged; no decision written, so `the-way-record-decision` was not run.

## Checks

| Check | Command | Exit |
|---|---|---|
| death | `npm test -- tests/sim/death.test.mjs` | 0 (26 pass) |
| catch-up | `npm test -- tests/sim/catch-up.test.mjs` | 0 (28 pass) |
| loop | `npm test -- tests/sim/loop.test.mjs` | 0 (37 pass) |
| saved-game | `npm test -- tests/sim/saved-game.test.mjs` | 0 (36 pass) |
| flow | `npm test -- tests/sim/flow.test.mjs` | 0 (12 pass) |
| time | `npm test -- tests/sim/time.test.mjs` | 0 (19 pass) |
| team | `npm test -- tests/sim/team.test.mjs` | 0 (7 pass) |
| world | `npm test -- tests/sim/world.test.mjs` | 0 (12 pass) |
| streak | `npm test -- tests/sim/streak.test.mjs` | 0 (19 pass) |
| eslint | `node node_modules/eslint/bin/eslint.js --max-warnings 0 <the nine files>` | 0 |
| prettier | `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig <the nine files>` | 0 |
| foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 (0 errors) |
| S1 | `git grep -nIE '<S1 pattern>' -- <the nine files>` | 1 (no line) |
| S2 | `git grep -nIE '<S2 pattern>' -- <the nine files>` | 1 (no line), so there is no S2 line to list |

The product's gate (`npm test` with no argument) was not run, as instructed. I also ran, as a wider net, a grep of the nine files for `rows? N`, `P/W/C N`, "the definition", "the concept", "the note", "predecessor", "old loop", "the spec", "answers", "task", "note": only my own new sentences ("predecessor", "the spec"), the spec pointers named below, and the data key `note = "x"` in `saved-game.test.mjs` matched.

## Own-work check (section 3)

Requirement most likely missed: a pointer that does not match the S1/S2 patterns (a row, an answer, a "the spec"/"the definition" of a task, a number only). Check: the wider grep above, plus reading every comment line I touched against the decision it now names. Result: no pointer to a note, a task or the old Loop's tests is left. Left on purpose: pointers to the spec of a loop2 cycle (see Concerns). I also checked, per replaced line, that the decision named says what the comment says (D-22, D-61, D-91, D-129, D-132, D-133, D-164, D-173, D-179, D-183, D-190, D-194, D-200, D-206, D-212, D-219, D-220, D-221, D-240, D-241, D-242, D-243, D-245, D-246, D-247, D-248, D-249, D-250, D-341, D-368 and the invariants `resurrection-renewal`, `death-settled-once`, `player-map-run-pace`); where a decision did not say the whole of an old comment, I dropped the part it did not carry (listed below).

## Per changed line: old pointer, outcome, entry

Outcomes: named = entry named; removed = pointer or comment removed (the test title or the code already says it, or the invariant tag above it does). Line numbers are of the new files.

### tests/sim/death.test.mjs
- Header (1-5): "task rozliczenie-przejsc, To do 8 and 10-17 (questions Q3, Q11 and W1), which bind the tests of loop at commit cdc7c0d ... loop `sim.test.ts:2002`, `death.test.ts:77-81`, `src/sim/death.test.ts`" -> named D-190, D-219, D-220, D-221 and invariants `resurrection-renewal` (moment equal counts as ready), `death-settled-once`. The binding sentence of the old Loop's tests is gone; what it bound (new character ready from the start; equal moment counts as ready) stands in D-220 and `resurrection-renewal`.
- `RENEWAL_MS` doc: "(task, *Context*)" -> named D-190 (eight hours to start).
- "To do 10; loop death.test.ts:34-47" -> named D-190. "To do 11; loop 48-59" -> named D-190. "To do 11, 18" -> named D-190. "To do 11; loop 61-75, 98-111" -> named D-190.
- "To do 12; loop death.test.ts:77-81" -> removed (test title and `resurrection-renewal` tag say it).
- "Q11, To do 13" and "To do 13" -> named D-219.
- "To do 10 with D-206; row 13: every document is stamped, and the load refuses one that is not." (2 places) -> named D-248 (the document carries the moment of its save). The clause "the load refuses one that is not" is not in the foundation; the code needs it not at that line (it is the next concern below).
- "D-07, Q11" -> D-07, D-219. "To do 14; D-61, D-190, D-194; Q1, Q3" -> D-61, D-190, D-194. "To do 14" -> D-190. "To do 15; loop 61-75" -> D-190.
- "To do 16; loop 83-87" -> removed the pointer, kept the sentence. "To do 16; spec, decision 10" -> removed (the `death-settled-once` tag above says it).
- "To do 17; D-200" -> D-200. "To do 17, spec decision 6; loop 113-127" -> "Spec, decision 6; D-190".

### tests/sim/catch-up.test.mjs
- Header (1-10): "task petla-zarobkowa (To do 2 and 11 to 16, answers P1, Q6, Q7 and Q19, the settlements of rows ...) ... bind the tests of loop at commit cdc7c0d ... `src/sim/loop.test.ts:44` ..." -> named D-240, D-242, D-246, D-247, D-248; the departures (no upper bound; one button; no minutes in a stop of the open game) now name D-247 and D-246, which hold them. The spec pointer (sections 2, 4, 6, 7, 8, 11, 14, 15) stays.
- "To do 11, 14, row 14, `catch-up-minutes`, loop sim.test.ts:2017..." -> a plain sentence naming the invariant `catch-up-minutes` (no `invariant:` tag, so no test-to-invariant mapping changes).
- "no upper bound (Q7)" -> D-247. "To do 2, row 20, P1" -> D-250.
- "To do 14, loop sim.test.ts:1773, :1848: a death in the k-th minute ..." -> removed (the `catch-up-death-moment` tag above it says it).
- "Row 17, To do 15" -> D-249. "To do 12, D-240" -> D-240 (its "spec section 7" stays).
- "To do 16, Q6, loop loop.test.ts:134, chest.test.ts:535" -> D-246.
- "To do 12, loop loop.test.ts:79; To do 16, rows 23 and 24, Q19, loop :91-92, sim.test.ts:1811" -> D-240, D-246 with the sentence that a loop a death stopped opens its line at any number of game minutes.
- "To do 16, row 22" / "row 24, Q19" / "Q21" -> D-246 (three places).

### tests/sim/loop.test.mjs
- Header (1-6): "task petla-zarobkowa (To do 1 and 3 to 9 and 15, answers Q4, Q5, Q9, Q10, Q13 and Q16, rows ...) ... bind the tests of loop at commit cdc7c0d ... sim.test.ts:1464-1730, chest.test.ts:350-374, loop.test.ts:157-170, policy.test.ts:587" -> named D-22, D-179, D-183, D-245, D-190, D-200, D-241, D-243, D-249; the spec pointer stays.
- "Q10: the first seed" and "Task, Q10: the first seed is the only one" -> D-22 (it holds: the first map run of an earning loop takes a new seed, as a send does; each later one from a draw of the map run before).
- "To do 5; loop chest.test.ts:350-358" -> pointer removed, sentence kept (D-179 already named there).
- "To do 15, Q9; loop: none (the departure)" -> D-249. "To do 4 and spec 3" -> "Spec 3" (D-119, D-249 already named).
- "To do 3; loop loop.test.ts:157-170, policy.test.ts:587" -> D-241. "To do 9, Q4" -> D-200. "To do 4 and 6, spec 4, D-179" -> "Spec 4, D-179".
- "To do 6 and 7, Q16, D-190" and "To do 7, Q13, D-190" -> D-190. "To do 8, Q5, D-245, D-183; loop sim.test.ts:1630-1665" -> D-245, D-183.

### tests/sim/saved-game.test.mjs
- Header: "(task petla-zarobkowa, To do 10 with D-206; spec ...)" -> "(D-206; spec ...)"; "(task koniec-przejscia, To do 5 and 10 with D-206, D-135 and D-368)" -> "(D-206, D-135 and D-368)".
- "To do 10 with D-206: 4 is the current version..." (2 places) and "To do 10 with D-206: a save of the version before the raise" -> D-206.
- "(task koniec-przejscia, To do 5 and 10): exactly its three keys" -> D-368. "To do 10: the record comes back whole" -> D-368, D-212.
- "Spec section 13; Q8, D-07" -> "Spec section 13; D-07, D-248". `SAVE_MS` comment "To do 10 with D-206; row 13: ..." -> D-248.

### Other files
- `flow.test.mjs`: "Task "programy-gracza", To do 1" -> D-91, D-164; "To do 6" (2) -> D-164; "To do 10" -> D-173; "task "rozwiazanie-lasu", To do 2" -> D-129.
- `streak.test.mjs`: "Changed by the task "rozwiazanie-lasu": ..." -> D-132, D-133 (and the history phrase "now" is gone); "(task kronika-z-filtrami, To do 4; D-341)" -> "(D-341)".
- `team.test.mjs`: "task rozliczenie-przejsc, To do 8" -> D-220.
- `time.test.mjs`: "the task "rozwiazanie-lasu", To do 1 and Questions 2 and 3" -> D-21 and the invariant `player-map-run-pace` (which holds "one game minute for each whole 1/pace of a real second").
- `world.test.mjs`: "worked out by hand from the task's numbers" -> "from the numbers of the game's data" (removed; see Concerns on the source of those numbers).

## Concerns and open points

1. **Spec pointers left.** Many comments say "Spec, decision N" / "spec section N" (for example `death.test.mjs` decisions 4 and 6, `catch-up.test.mjs`, `loop.test.mjs`, `saved-game.test.mjs` sections 1, 9, 11, 13). The slice says a pointer to a record of a loop2 cycle alone stays, and none of these names a task, so I left them. But the cycle records were removed from the tree (commit `0d631398`; `git ls-files` shows no `task-cycles` file), so these pointers lead to history only. Decision for the orchestrator: leave, or give each the decision that holds the same (many are D-221, D-164, D-179). I did not do the second because the slice does not ask for it and it would change which source a reader trusts.
2. **No new decision was needed.** Every old pointer was either already carried by a decision or invariant (named) or carried nothing the code needs (removed). Two clauses were dropped because the foundation does not hold them and the code and test titles already say them: "the load refuses a document that is not stamped" (the test `the saved document of a state never stamped is refused as shape` says it; its source is a spec pointer that stays) and the exact numbers of the cooling, warming and renewal in `world.test.mjs` (they are game data, D-80 allows concrete numbers for a parameter test). If the orchestrator wants the first to be a decision, it needs a human choice of requirement text; I did not invent one.
3. The handoff's S1/S2 patterns had no hit left, but they do not match "spec" pointers (concern 1).

## Reaches beyond the dispatch
- Read and searched the decision log by heading for D-22, D-61, D-91, D-129, D-132, D-133, D-164, D-173, D-179, D-190, D-194, D-200, D-206, D-212, D-219, D-220, D-221, D-239..D-250, D-58, D-59, D-67, D-07, D-341 (first paragraphs and a few *Rationale* passages, not each entry whole), to check what each replaced pointer could name.
- Read the settlements table of the snapshot note `petla_zarobkowa_loop2.md` (rows 1-26) to see which rows D-239..D-250 derive from. Nothing from it entered a file.

## Unread material
- `.claude/skills/the-way-record-decision/SKILL.md` was read whole; `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `common/rules.md`, `common/way_of_working.md`, `task-cycle/skill/foundation_step.md`: not read, because no decision was written (they are read when the step comes).
- `guidelines/coding.md`: not read (only comments changed). `guidelines/testing.md`: read lines 1-370 of 458 (the rules; the rest are recipes and "not tested on purpose").
- `.the-way/task-cycle/change/SKILL.md` and `slice.md`: read whole.
- Task passages (`task.md:17-27, 29-40, 50-57, 107-115`): read from the handoff's copies, not from the file.
- Invariants: read whole `resurrection-renewal`, `death-settled-once`, `save-version`, `player-map-run-pace`, `tracked-file-private-names`. Not read whole: `catch-up-state`, `catch-up-minutes`, `catch-up-death-moment` (read one-sentence statements through grep), `loop-run-knowledge`, `trip-transfer`, `trip-run-end`, `saved-program-edit`, `minute-span-split`, `map-run-repeatability`, `simulation-inputs`. The part-map entry of `simulation` was not read.
- Files changed, read in part: `loop.test.mjs` (header and the lines around each pointer, not the whole), `saved-game.test.mjs` (header and the lines around each pointer), `flow.test.mjs`, `streak.test.mjs`, `team.test.mjs`, `time.test.mjs`, `world.test.mjs` (the lines around each pointer, `world.test.mjs` also its first 30 lines). `death.test.mjs` and `catch-up.test.mjs` were read whole.
- Snapshot of private sources: only `petla_zarobkowa_loop2.md` (settlements table) opened; no old-Loop file opened (no test of the old Loop was needed once the foundation held the requirement).

## Searches not found or unclear
- Where the foundation holds "the load refuses a saved document that carries no save time": not found (D-248 says the document carries the moment). Left to the spec pointer in `saved-game.test.mjs` (see concern 2).
- Where the foundation holds the source of the cooling, warming and renewal numbers in `world.test.mjs` (0.002 × (37 − 25), 0.5, 0.15, every 30 and 40 minutes, stocks 12 and 8): D-58, D-59, D-67 hold the rules and say the numbers stand in the game map's data; the numbers themselves are in `src/browser/sim/data`. Not unclear for the comment, but not a decision either.
- None else.
