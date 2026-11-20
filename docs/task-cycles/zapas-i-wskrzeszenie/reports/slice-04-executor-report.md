# Slice 4 report - executor

**Status:** done

**Stop rule (question 7): not triggered.** The best program of each map solves far more than 20% of the seeds 1-500: Skraj lasu 97.4% (P23), Las 99.4% (P10), Las - glebiej 92.4% (P10). No map needs a stop of the cycle before Slice 5.

## Commit

- `0fde9df0` feat: :sparkles: measure each map from what the maps before it gave, by the best reference program, in a progression command of the balance instrument (D-438). Base was `74652031`.

## Files changed (lines added / removed)

| File | + / - |
|---|---|
| `balance/progression.mjs` (new) | +360 / 0 |
| `balance/cli.mjs` | +34 / -4 (38 lines changed) |
| `tests/balance/progression.test.mjs` (new) | +331 / 0 |
| `tests/balance/cli.test.mjs` | +70 / 0 |
| `guidelines/coding-balance-instrument.md` | +1 / 0 (row `balance/progression.mjs`, `copy`) |
| `.claude/skills/loop2-balance/SKILL.md` and `.agents/skills/loop2-balance/SKILL.md` | +47 / -5 each, the same edit in both, byte-identical (`cmp` equal) |

Total of the commit: 7 files, 890 insertions, 14 deletions (`git show --stat 0fde9df0`).

## The measurement (command, then table)

Command, from the worktree root: `npm run --silent balance -- progression --out .runs/slice-04-executor/progression.md` (default seeds 1-500, all three maps of the game, all 23 reference programs). Exit 0, 46 s. Nothing of the result is committed (D-429).

The table, one row per map and program (23 rows per map; it is the file's content):

```
| Map | Program | Solved (seeds 1-500) | Median game minutes of solved runs | Deaths by cause | Runs at the cap |
| --- | --- | --- | --- | --- | --- |
| Skraj lasu | P1 | 0 % | — | cold 497, hunger 3 | 0 |
| Skraj lasu | P2 | 16.8 % | 840 | hunger 415, cold 1 | 0 |
| Skraj lasu | P3 | 96.4 % | 975 | cold 17, hunger 1 | 0 |
| Skraj lasu | P4 | 97 % | 712 | cold 15 | 0 |
| Skraj lasu | P5 | 94.6 % | 754 | cold 27 | 0 |
| Skraj lasu | P6 | 94.6 % | 754 | cold 27 | 0 |
| Skraj lasu | P7 | 94.6 % | 754 | cold 27 | 0 |
| Skraj lasu | P8 | 96.4 % | 975 | cold 17, hunger 1 | 0 |
| Skraj lasu | P9 | 97 % | 712 | cold 15 | 0 |
| Skraj lasu | P10 | 94.6 % | 754 | cold 27 | 0 |
| Skraj lasu | P11 | 94.6 % | 754 | cold 27 | 0 |
| Skraj lasu | P12 | 0 % | — | cold 500 | 0 |
| Skraj lasu | P13 | 0 % | — | cold 500 | 0 |
| Skraj lasu | P14 | 0 % | — | hunger 499, cold 1 | 0 |
| Skraj lasu | P15 | 0 % | — | hunger 499, cold 1 | 0 |
| Skraj lasu | P16 | 0 % | — | cold 500 | 0 |
| Skraj lasu | P17 | 94.6 % | 754 | cold 27 | 0 |
| Skraj lasu | P18 | 0 % | — | cold 500 | 0 |
| Skraj lasu | P19 | 0 % | — | cold 500 | 0 |
| Skraj lasu | P20 | 0 % | — | cold 500 | 0 |
| Skraj lasu | P21 | 0 % | — | cold 500 | 0 |
| Skraj lasu | P22 | 0 % | — | cold 500 | 0 |
| Skraj lasu | P23 | 97.4 % | 733 | cold 13 | 0 |
| Las | P1 | 0 % | — | cold 498, hunger 2 | 0 |
| Las | P2 | 7.4 % | 850 | hunger 313, cold 150 | 0 |
| Las | P3 | 50.4 % | 923 | cold 75, hunger 171 | 2 |
| Las | P4 | 71.8 % | 754 | cold 141 | 0 |
| Las | P5 | 62.4 % | 775 | cold 188 | 0 |
| Las | P6 | 93.8 % | 480 | cold 31 | 0 |
| Las | P7 | 94 % | 480 | cold 30 | 0 |
| Las | P8 | 50.4 % | 923 | cold 75, hunger 171 | 2 |
| Las | P9 | 69.6 % | 643 | cold 152 | 0 |
| Las | P10 | 99.4 % | 480 | cold 3 | 0 |
| Las | P11 | 62.4 % | 775 | cold 188 | 0 |
| Las | P12 | 0 % | — | cold 500 | 0 |
| Las | P13 | 0 % | — | cold 498, hunger 2 | 0 |
| Las | P14 | 0 % | — | hunger 350, cold 150 | 0 |
| Las | P15 | 0 % | — | hunger 351, cold 149 | 0 |
| Las | P16 | 0 % | — | cold 500 | 0 |
| Las | P17 | 93.8 % | 480 | cold 31 | 0 |
| Las | P18 | 93.8 % | 480 | cold 31 | 0 |
| Las | P19 | 64.8 % | 633 | cold 176 | 0 |
| Las | P20 | 93.8 % | 480 | cold 31 | 0 |
| Las | P21 | 0 % | — | cold 500 | 0 |
| Las | P22 | 0 % | — | cold 500 | 0 |
| Las | P23 | 94 % | 480 | cold 30 | 0 |
| Las — głębiej | P1 | 0 % | — | combat 407, cold 93 | 0 |
| Las — głębiej | P2 | 0 % | — | combat 288, cold 77, hunger 135 | 0 |
| Las — głębiej | P3 | 0 % | — | combat 384, cold 41, hunger 75 | 0 |
| Las — głębiej | P4 | 0 % | — | combat 397, cold 103 | 0 |
| Las — głębiej | P5 | 0 % | — | combat 385, cold 115 | 0 |
| Las — głębiej | P6 | 0 % | — | combat 470, cold 30 | 0 |
| Las — głębiej | P7 | 0 % | — | combat 470, cold 30 | 0 |
| Las — głębiej | P8 | 1.6 % | 771 | cold 130, combat 247, hunger 115 | 0 |
| Las — głębiej | P9 | 34.8 % | 603 | cold 221, combat 105 | 0 |
| Las — głębiej | P10 | 92.4 % | 654 | combat 22, cold 16 | 0 |
| Las — głębiej | P11 | 1.6 % | 781 | cold 341, combat 151 | 0 |
| Las — głębiej | P12 | 0 % | — | combat 160, cold 340 | 0 |
| Las — głębiej | P13 | 0 % | — | cold 386, combat 114 | 0 |
| Las — głębiej | P14 | 0 % | — | combat 252, cold 113, hunger 135 | 0 |
| Las — głębiej | P15 | 0 % | — | combat 395, cold 59, hunger 46 | 0 |
| Las — głębiej | P16 | 0 % | — | combat 160, cold 340 | 0 |
| Las — głębiej | P17 | 0 % | — | combat 470, cold 30 | 0 |
| Las — głębiej | P18 | 0 % | — | combat 470, cold 30 | 0 |
| Las — głębiej | P19 | 0 % | — | combat 391, cold 109 | 0 |
| Las — głębiej | P20 | 0 % | — | combat 470, cold 30 | 0 |
| Las — głębiej | P21 | 0 % | — | cold 393, combat 107 | 0 |
| Las — głębiej | P22 | 0 % | — | combat 374, cold 126 | 0 |
| Las — głębiej | P23 | 0 % | — | combat 470, cold 30 | 0 |
```

The sentence under the table, as the command wrote it:

> Each map was measured with the practice and ranks from the first solvings of the maps before it, each by that map's best program, and with the stock its program takes, brought out by manual runs of solved maps (Skraj lasu: no manual run, the stock not gathered in full; Las: 3 manual runs; Las — głębiej: 3 manual runs).

For the agent only (not in the table; read from the measurement's data, `.runs/slice-04-executor/summary.mjs`, removed with the directory): best program of Skraj lasu P23 (`forestSettledVariantExample`), of Las and of Las - glebiej P10 (`forestDeepBest`); the stock of both later maps came from manual runs of Skraj lasu by P23 (3 runs each, complete). Practice the maps were measured with: Skraj lasu none; Las exploration 1, gathering 41, fire-making 1, eating 16, flame spell 5; Las - glebiej exploration 3, gathering 64, fire-making 2, eating 27, flame spell 10. No branch needed by the best programs was bought (none of them uses an action a branch opens).

Readings that the table does not say and the orchestrator may want:
- The sentence for Skraj lasu says "no manual run, the stock not gathered in full": the best program there (P23) has a take list, no map is solved before Skraj lasu, so it went in with an empty chest, and it still solves 97.4%. Programs without a take list (P3, P4 at 96.4-97%) are about as good there.
- Las - glebiej: only P10 (92.4%) and P9 (34.8%) pass 20%. The older measurement in the task (2-6% without stock) is for other programs and an older state; this one has the first-solving practice and a stock of 3 manual runs.
- `--programs` narrows the programs the best of each map is picked from, so a narrowed run is not a cut of the whole table (e.g. `--programs forestDeepBest,forestBest --maps forest --seeds 1-20` gave 4 manual runs, not 3). Written in the skill.

## Choice of how the mode builds the state (named as the task asks)

A sweep from a given state, the state built through the game's functions: not the campaign extended. Reasons: the campaign's player runs an earning loop through the whole campaign and has no step for a manual run of a solved map; the measurement is to be without the loop; the state of question 13 (median practice of many seeds, program-specific ranks and stock) is not one seed's road. Built as:
1. Practice: per map, the median per skill (rounded, zeros omitted) over the solved runs of its best program on the measurement's seeds, from the engine's `sweep`; summed along `prerequisitesOf` (the maps that open the map). The best program of a map is the one with the largest share solved, then the smaller median minutes, then the earlier in the registry.
2. Ranks: `neededBranches(program)` = the branches whose effect is `kind: "action"` for an action the program's rules use; bought with the game's `buyBranch` as far as the points reach (`skillsFor`).
3. Stock: `stockFor` runs manual runs of a solved map (`send`, `advanceMinutes`, `end` of the game, with `LOOP_START_MS` as the fixed clock and the n-th run seeded with `lastSeed = n`) by the best program of that map, from an empty chest, until the chest holds the program's take list; the candidate map (each solved map before the measured one) with the fewest runs wins, the earliest on a tie; a take list over the chest capacity (`BALANCE.chestCapacity`), one no solved map can give, or more than `MAX_STOCK_RUNS` (100) runs is "not complete" and the measurement goes on with what the chest holds. Every run counts, a death included; a death is not settled (so it does not touch the practice) and only costs the run.
4. Each program is then measured with the engine's `sweep` with its own skills and its own stocked chest.

Rejected: extending `balance/campaign.mjs` (outside this slice's *Change*, and it carries the loop); copying the whole state per seed through chained maps (question 13 rejects it). Cost if wrong: a different way of picking the stocking map or program changes only the count of manual runs in the sentence, not the shares.

The table reuses `renderTable` of `balance/check-map.mjs` and cuts its three earning-loop columns (`withoutLoopColumns`), because its cell helpers are private and that file is not in this slice's *Change*; guarded by the test of the exact six column names. If the review prefers exporting those helpers from `check-map.mjs`, it is a small follow-up outside this slice.

## Checks (command, exit code)

- Written first, failing on the base (a stub `balance/progression.mjs` with empty results): `npm test -- tests/balance/progression.test.mjs` exit 1, 13 cases, 12 failed (10 on an assertion, 2 stopped with a TypeError on the stub's empty result: "a map counts by its best program..." and "one sentence under the table..."), 1 passed (the determinism case, which an empty stub also satisfies). After the code: exit 0, 13 pass.
- `tests/balance/cli.test.mjs`: the three new cases failed on the base `cli.mjs` (`git show HEAD:balance/cli.mjs`), exit 1, with the error "unknown command progression" (the command was missing, so the cases stopped on the refusal, not on an assertion); after: exit 0, 23 pass.
- `npm test -- tests/invariants/test_balance_instrument_file_writes.py` exit 0 (3 tests); `..._repeatability.py` exit 0 (2); `tests/invariants/test_cross_part_imports.py` exit 0 (10); `tests/agent_workflow/test_loop2_balance_skill.py` exit 0 (3; the two copies of the skill byte-identical, description 389 characters).
- The two invariant scans seen failing on my new file: with `Math.random()` appended to `balance/progression.mjs`, `test_balance_instrument_repeatability.py` exit 1 ("balance/progression.mjs names Math.random"); with `writeFileSync` appended, `test_balance_instrument_file_writes.py` exit 1 ("... names writeFileSync"); the file restored from a copy before the commit (`git status` clean after the commit).
- `tests/balance/check-map.test.mjs` exit 0 (7 pass), as it names `check-map.mjs` that the new file imports.
- `npx eslint balance tests/balance` exit 0; `npx prettier --check balance tests/balance` clean for the code (the markdown file `guidelines/coding-balance-instrument.md` was already not prettier-formatted before my row; not a checked kind).
- The measurement: the command above, exit 0.
- Not run: the full `npm test` (not mine), `foundation_check.py`, `check_instructions.py` (not named in the *Checks*).

## Own-work check (section 3)

Requirement most likely unmet: the table and its sentence "name no skill, branch, rank or item" and give the number of manual runs. Check: the test of the table scans the text below the header for every program's condition, action, group name and every item, resource, skill and branch name of the data (words of 4+ letters), and for every program identifier; the sentence test needs `Las: <n> manual run` with n from the measurement and `Skraj lasu: no manual run`, one line, one period. Showed: green. Also read by eye in the real output above: only map names, labels `P#`, numbers, causes (`cold`, `hunger`, `combat`, the instrument's own cause words from the check-map table).

A second one: the stock goes through the game's chest rules. Check: the stock test requires a non-zero count, a completed list and at most the chest capacity; the row test requires that a row's figures equal an independent `sweep` with `skillsFor` ranks and the row's stocked chest.

Mutations I thought through: a program buying every branch (caught: the ranks test); the loop never stopping or stopping at the cap with a false `complete` (caught: `absent`, `tooMany`, `none`); the best program taken as the first (caught for Skraj lasu by `forestBest` over the empty program, `P4`); randomness (the repeatability test of the measurement, twice). Not protected: the tie-break of `bestOf` by the median minutes and the choice among several stocking maps (no case with two candidates that differ); the rounding of an even count of medians is protected by the hand-made median of the test.

## Walkthrough (a command a person runs)

The command was run for real: `npm run --silent balance -- progression --out ...` (the table above), `... progression --seeds 1-20 --maps forest --programs forestDeepBest,forestBest` printed a table and a sentence on standard output and exit 0, `... progression --maps nope` printed `balance: --maps: nope is no map of the game` and exit 1, `help` lists the command and its flags. Not checked: a browser or the game itself (the change alters no screen).

## Reaches beyond the dispatch

- `foundations/decisions.md` D-438 (rationale, relations) and D-428 were read through the line ranges the dispatch names (`D-427`, `D-429`, `D-437`, `D-388`, `D-398`, `D-189`, `D-214`, `D-179`); the invariants section for `instrument-game-agreement` and the other two; `src/browser/sim/game.ts` (`send`, `advanceMinutes`, `end`, `settleDeath`) and `src/browser/sim/trip.ts`, `src/browser/sim/data/skills.ts`, `maps.ts`, `balance.ts`, `tests/balance/cli.test.mjs`, `tests/agent_workflow/test_loop2_balance_skill.py`, `tests/invariants/balance_source_scan.py`: for how the game's functions deposit loot and pay practice and for the checks of the files of the instrument. The dispatch's list did not name them, but its *Read* (`balance/engine.mjs`, `skills.ts`) pointed at them.

## Working copies

- `.runs/slice-04-executor/` (progression table, a one-off summary script, a copy of my `cli.mjs` and `progression.mjs` for the red/green runs, logs) and the logs `.runs/slice-04-executor-*.log` stood in the worktree; removed before return (see the end of this report).

## Unread material

- `.runs/task-cycles/zapas-i-wskrzeszenie/task.md` outside the passages copied into the handoff: not read (not named). `foundations/glossary.md:296-306` (overlay, wall) and `foundations/part_map.md:127-157` read only for the two part entries (`balance-tools`, `agent-workflow`), glossary not opened. `foundations/decisions.md` D-437 read; row D-428 read whole; the "Foundation entries row (new)" is D-438 and read whole. `tests/sim/reference-programs.mjs` read in parts (lines 1-110, 280-440, 600-682). `balance/trace.mjs`, `balance/overlay.mjs`, `balance/players/` not read (not touched).
- The reading note about the decisions a changed test quotes: I changed no existing case; I added cases to `tests/balance/cli.test.mjs` and a new file, quoting D-428 and D-429 in `decision:` lines that I took from the cases already in the files.

## Searches not found or unclear

- "Foundation entries row (new)" in the dispatch is not a heading in the foundation; I took it for D-438, which stands in `foundations/decisions.md` and matches the text of the plan's table.
- The plan names "the best reference program of that map (median of the solved runs on seeds 1-500)": it does not say whether the median is over the solved runs' practice per skill or the program with the median share; I took per-skill median of practice over the solved runs (as the task's sentence in question 13 reads: "wprawa ... mediana z rozwiązanych przejść").
- How to tell that a program "needs" a branch: not defined anywhere; I used the branches that open an action its rules use. A reference program whose comment says it needs the branch of a spell (`wastelandCleanFlame`, effect `cleanFlame`) is not detected as needing it; it measures without it (`wastelandCleanFlame` is the 22nd of the registry, P22, 0% on all three maps in the table; it is not a best program anywhere, so no stock or practice of the chain depends on it).
- `stockFor`'s choice of stocking program is not set by the task; chose the best program of the stocking map.

## Questions and concerns

No questions. Concerns:
1. The cli test cases failed on the base with an `Error`, not an assertion (a missing command), and 2 of the progression cases stopped on a TypeError of the stub: a stub cannot fail every case at an assertion.
2. `balance/check-map.mjs`'s private helpers are not exported; see the choice above.
3. P22 (`wastelandCleanFlame`) and the branch it needs: see Searches.

## Removal of the working copies

The directory `.runs/slice-04-executor` and the four logs `.runs\slice-04-executor-*.log` beside it were removed before return; nothing remains. The table is in this report.
