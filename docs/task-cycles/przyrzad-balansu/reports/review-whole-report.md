FAIL 4caa290f732a83e8154b192a6673d6d97ac27448

# Review of the whole change — task `przyrzad-balansu`

- Range: `6a7b0acb4510084877e21579eaa0ab18232c9c19` (`origin/main`) to `4caa290f732a83e8154b192a6673d6d97ac27448`; `git rev-parse HEAD` in the worktree gave the head named in the handoff.
- Read: the method (`.the-way/task-cycle/review/SKILL.md`, `whole_change.md`, the section "Reading the foundation" of `.the-way/elements/common/way_of_working.md`), the frozen task, the plan, the foundation-entries report and every executor report (1, 2, 7, 8 and 9 whole; 3, 4, 5, 6 and 10 not opened, see Unread material), the whole diff and the twelve commit messages.
- Counts: 1 blocking finding (Important), 0 Critical, 6 Minor, 0 out of scope.

## Findings

### Important

**I-1. The table of the map check gives away what some programs do through their identifiers.** Places: `balance/check-map.mjs:113` (the cell `row.programId`), `tests/sim/reference-programs.mjs:588`, `:607`, `:631` (the identifiers), `.claude/skills/loop2-balance/SKILL.md:94-99` (the skill sends the table to the person as one with "no condition, action or rule of any program"). Slices: 1 (`62b73c35`, which chose the identifiers) and 9 (`c2ead6ec`, which prints them in the table); the skill of slice 10 (`4caa290f`) repeats the promise.

What the person sees: the table that Mariusz gets so as not to know the solutions has, in its column "Program", rows such as `wastelandCleanFlame`, `deadZoneNoFire` and `forestWorkingS5B3M6F0CampAtMoss` (the real table of slice 9, `reports/executor-9-check-map-forest-pack.md:21-24`, holds all three). These names state the rules of the programs in other words: `wastelandCleanFlame` says that Pustkowie is held with the branch „Czysty płomień”, `deadZoneNoFire` that Martwa strefa is held without a campfire, and `forestWorkingS5B3M6F0CampAtMoss` the four stock thresholds of its gathering rules (5 sticks, 3 berries, 6 moss, 0 fibre) and that it builds its campfire only on a tile with moss. Pustkowie and Martwa strefa are exactly the maps of two of the overlays this change brings for checking.

Why it matters: the task asks for a table "bez treści programów, żeby nie znać rozwiązań" (*Need*, To do 5, Question 5, row 2 of *Settlements*), and D-428 holds that "the table holds no condition, action or rule of any program", with the rationale that "a program that solves a map would give that person the solution". A threshold of a rule and the branch a program depends on are rule content; the identifier carries them past the check. The task accepted that the programs are readable in the public repository (Question 4), but that is a file the person may choose not to open; the table is handed to the person by the agent, row by row.

Evidence: the test `tests/balance/check-map.test.mjs:117-143` checks only that no group name and no label of a condition or action of `forestBest` appears, and asserts that the identifier does appear (`:128-131`), so a rule carried in a name passes; the real table above holds the three names.

Ways to fix, for the cycle to choose: (a) the table shows a neutral label per program (for example `P1`…`P23`, with the key printed for the agent apart from the table, or written only with `--out`); (b) rename the reference programs to identifiers that say nothing of their rules (touches the tests that import them, the player descriptions and the skill). If nothing is done, every map check of a package that runs the full list hands the person these hints on the two maps the overlays add.

### Minor

**M-1. The test of a row of the map check does not guard the chest of its sweep.** `tests/balance/check-map.test.mjs:158-172` (slice 9, `c2ead6ec`), within the task. The case "a row of one map and one program with few seeds comes from the measurement of that map and program" computes the expected sweep and loop with the chest `{ stick: 8, berry: 7 }`, while the row it compares takes the chest of `forestBest`'s take list, which is empty; the two agree only because `forestBest` takes nothing. A mutant of mine that gives the row's sweep an empty chest (`balance/check-map.mjs:45-51`, `chest` replaced by `chest: {}`) left all six cases passing (`npm test -- tests/balance/check-map.test.mjs`, exit 0, `reports/review-whole-mutant-chest.log`). A row of `forestDeepBest` whose sweep lost its chest would then show a share solved far below what the program does, and no test would say so. The code itself is right; the case should compare a program that takes something, with the chest written from its take list.

**M-2. D-425 lists what its function limit covers, and the list does not hold the new part's code.** `foundations/decisions.md:824` (foundation step, `333b945b`), within the task. The cycle added `balance-tools` to the *Scope* of D-425 and to the *Part* of `function-and-file-size`, but the sentence still reads "every file that ESLint checks under D-29 — the application, the scripts, the tests, the JavaScript of the three agent-workflow directories D-29 names and the two root configuration files"; `balance/*.mjs` is none of the five things listed. The main clause ("every file that ESLint checks under D-29") does cover it and the run of the rule does reach `balance/` (my run of `tests/quality/eslint-size-rules.mjs` read 314 files at the head against 297 at the base), so the code agrees with the entry; a reader taking the list after the dash as closed would think the instrument's files outside the limit. The agent of the foundation step named this as its concern 2 and nobody took it up. Add "the balance instrument" to the list.

**M-3. The trace starts a map run by a second copy of the engine's start.** `balance/trace.mjs:89-113` repeats `balance/engine.mjs:104-126` (`startOf`: the take list from the chest, the reduced program, `newMapRun`) (slice 6, `690156e1`), within the task. Two copies of how the instrument starts a map run can drift apart; today the trace test (`tests/balance/trace.test.mjs:168-180`) compares only the outcome and the end minute with the engine, so a drift in the equipment taken would show only through them. Exporting `startOf` and using it in the trace removes the copy.

**M-4. Three comments cite the invariant `instrument-game-agreement` for what it does not hold.** `balance/overlay.mjs:5` (an overlay restored in memory, nothing written), `balance/loop.mjs:5` and `balance/campaign.mjs:4` ("copies no number of the game") (slices 5, 6 and 7), within the task. The invariant says one thing: the same seed run through the game and through the instrument ends alike. A reader looking for what guards the restore of an overlay or the absence of copied numbers is sent to an entry that holds neither; the overlay's restore rests on the glossary term `overlay` and D-18, the "no number copied" on To do 1 of the task, not on a foundation entry.

**M-5. The map check measures a program that needs a branch without it, and the table does not say so.** `balance/check-map.mjs:35-60` and `.claude/skills/loop2-balance/SKILL.md:91-99` (slices 9 and 10), within the task. Every row runs with a new character's skills unless `--practice` or `--ranks` say otherwise, and those flags apply to all rows alike. `wastelandCleanFlame` lives on the branch „Czysty płomień” (its comment, `tests/sim/reference-programs.mjs:625-630`); executor 8 measured it at 0 of 50 on Pustkowie without the branch and 47 of 50 with it. Its row on Pustkowie will read close to 0 %, which a person may take for "Pustkowie cannot be passed" rather than "this program was run without its branch". This is what Choice 8 of the plan mandated; a line in the skill telling the agent to rerun such a program with `--ranks` and `--programs` would cover it.

**M-6. The skill does not say what the agent tells the person about its own attempts.** `.claude/skills/loop2-balance/SKILL.md:100-112` (slice 10, `4caa290f`), within the task. Step 4 has the agent try to pass the map without the thing the map asks about and says that "the attempts' programs stay with the agent: they go into no table and no request for the person". It does not say whether the outcome of the attempts (for example, the share a program that avoids the fights solves) goes to the person, though that outcome is what the check is for (the task's *Need*, quoting the scope of Project 2: "Mariusz dostaje tabelę wyników bez treści programów"). An agent may read the sentence as "report nothing of the attempts". One sentence fixes it: the attempts' shares and failures go to the person as rows like the table's, under a neutral label.

## Declined to judge

- The *Depends on* line of `build-tools` (its npm script runs `balance/cli.mjs`) and the *Scope* of D-28, D-73, D-81 to D-85, D-253 and other decisions that bind every code part without naming `balance-tools`: the handoff names them as the return step's work.
- The six campaigns that end one point above the author's notes (executor 7): explained by the lowered thresholds of the combat trees in the game's data; I did not rerun the notes' campaigns, and nothing in the task asks for a test of it.
- `tests/balance/engine.test.mjs`, added by slice 2 beyond its *Change*, and the `export` slice 7 added to `earnedPoints` in `balance/loop.mjs`: I read both and found nothing wrong; they need no finding.
- The plan's slice 10 wording "outside the repository, under `.runs/`": the skill says "outside the tracked files, under `.runs/` where git ignores it", which is what D-429 asks; no finding.

## Against the task

Every item of *To do* is met by the commits: the standing tool with English commands and flags (1, slices 2, 6, 7, 8); the 23 reference programs, three player descriptions and three overlays (2); `npm run balance` builds the game first (3, `package.json:13`); overlays in memory only, restored after the measurement (4); the map check and its table (5, with I-1 against "bez treści programów"); the agreement test citing `instrument-game-agreement` with cases that take from the chest (6); the acceptance test solving Las on a named seed with nature energy spent, the empty program dying in minute 243, and D-378 changed (7); one place of the reference programs, read by the tests of the simulation and by `balance/cli.mjs` (8); the part `balance-tools`, depending on `simulation` (9); both guidelines naming the part, the testing table's row and the unit-test recipe counting `tests/balance/` (10); the skill and the line in `AGENTS.md` (11, with M-5 and M-6); results printed or written only to the `--out` path (12). The five rows of *Settlements to record* stand as D-427, D-428, D-429, the glossary term `overlay` and the invariant `instrument-game-agreement`. The acceptance criteria: my own sweep below gives a summary identical to the notes' summary kept by executor 8; the fresh-clone check rests on executor 8's report (log `reports/executor-8-npm-ci.log`), which I did not repeat.

Private names: a search of the whole diff and of the twelve commit messages for `przyrzad`, `przyrząd`, `symulator`, `krytyk`, `analiz`, `nakladk`, `nakładk`, `polityk`, `The Brain`, `Notes`, `fable`, `silnik`, `kampania`, `wspolne`, `zrodla`, `D-80` and `private` found one hit: the ordinary Polish words "przyrządu pomiarowego balansu" in `guidelines/testing.md:362`, which name no note or folder; `test_tracked_file_private_paths.py` passes. No text cites D-80.

Trust boundary and irreversible operations: none. The instrument reads a file outside the repository only by `--program`, `--player` and `--overlay`, and writes only to the `--out` path (`balance/cli.mjs:287-291`, `:500-503`); `--player` without a path reads `balance/players/<id>.json` inside the repository. After my sweep `git status --porcelain` of the head worktree was empty.

Changed tests: the acceptance test drops its "every kind of the closed list" case and feeding from the finished kinds, with the changed D-378 as the requirement-side cause; the first-pass precondition narrows from an empty trip plan to an empty take list, with the shared program's bring list as the cause and D-404 naming no bring list; executor 1's counts show the moved programs solve the same seeds (81, 483, 290, 289). The invariant tests changed are `tests/quality/test_quality_invariants.py` (D-32 quotation and Prettier patterns) and `tests/quality/test_source_tool_scope.py` (`SCOPE_PARTS`), both following the cycle's changes of D-29, D-32 and their invariants.

## The structure of the code the change leaves

`python -B .the-way/task-cycle/change_file_sizes.py 6a7b0acb… 4caa290f…` (exit 0): 42 files, 26 added, 16 modified; lines 15341 before, 20516 after. The largest added files are `tests/sim/reference-programs.mjs` 682, `balance/campaign.mjs` 615, `tests/balance/cli.test.mjs` 529, `balance/cli.mjs` 528, `balance/engine.mjs` 354; the three changed tests of the simulation shrank (−12, −35, −64). The size rule's run (`node tests/quality/eslint-size-rules.mjs`) names the same four places in a worktree of the base and one of the head (`kitchen-sink.tsx`, `startApp`, `createProgramsEntry`, `build`), none of this change (`reports/review-whole-size-base.log`, `review-whole-size-head.log`): the change pushed nothing over a threshold. No code lost its last user (`program-fixture.mjs` keeps its users in eleven tests of the simulation). Structure finding: M-3.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Head | `git rev-parse HEAD` | 0 | `4caa290f…` |
| Sizes of changed files | `python -B .the-way/task-cycle/change_file_sizes.py <base> <head>` | 0 | as above |
| Size rule, base and head | `node tests/quality/eslint-size-rules.mjs` in each worktree | 0, 0 | same four places, none of the change |
| Focused tests in a worktree of the head | `npm test -- <file>` for `tests/sim/acceptance.test.mjs` (5), `first-map-balance.test.mjs` (5), `new-account-first-pass.test.mjs` (3), `tests/balance/agreement` (6), `engine` (7), `overlay` (5), `loop` (5), `trace` (3), `campaign` (11), `cli` (20), `check-map` (6) | 0 each | all pass (`reports/review-whole-focused.txt`) |
| Python tests | `npm test -- tests/quality/test_node_test_selection.py`, `tests/invariants/test_cross_part_imports.py`, `tests/agent_workflow/test_tracked_file_private_paths.py`, `tests/agent_workflow/test_loop2_balance_skill.py`, `tests/quality/test_source_tool_scope.py`, `tests/quality/test_quality_invariants.py` | 0 each | OK (1, 10, 1, 3, 4, 5 tests) |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors (`reports/review-whole-foundation.log`) |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py`, head and base | 0, 0 | 0 errors; 146 warnings at the head against 156 at the base, every difference a dead path of `.runs/` or `dist/` that the base worktree lacked; the new skill adds none |
| The sweep of the acceptance criterion | `npm run --silent balance -- sweep --map forest --program forestBest --seeds 1-500` | 0 | 1.9 s with the build; 500 runs, 359 solved (71.8 %), median 754, cold 141, capped 0; standard error empty; the summary is identical, as JSON, to `reports/executor-8-sweep-notes.json` (`reports/review-whole-sweep.json`) |
| Nothing written | `git status --porcelain --ignore-submodules=all` in the head worktree after the sweep | 0 | empty |
| Mutant: a row's sweep ignores the chest | as M-1 | 0 | survived (M-1) |
| Private names | search of the diff and commit messages, above | — | one ordinary word, no name |
| Not run | the full gate (`npm test` with no argument), as the handoff says; the notes' instrument itself (I compared with its output kept by executor 8); `npm ci` in a fresh clone (executor 8's run) | — | unverified by me |

## Reaches beyond the handoff

- `src/browser/sim/trip.ts:1-140`, `src/browser/sim/game.ts:270-310` and `:845-875`, `src/browser/sim/loop.ts:55-100` and `:300-380`: to check that the engine and the loop's balance take and deposit as the game does.
- `foundations/part_map.md` (search for `tests/sim`), `tests/quality/eslint-size-rules.mjs` (search for its patterns), `tests/balance/cli.test.mjs:1-50`, `:196-345` (read in part): to check part ownership, the reach of the size rule and the CLI's wiring tests.
- `reports/executor-9-check-map-forest-pack.md`: the real table, for I-1.
- The author's rules files `scripts.md` and `git.md` under the notes' `.ai/rules/`, which a hook of the session showed before a script and a worktree command.

## Working copies

Under `.runs/review-whole/` of the task's worktree: a worktree of the head (`.runs/review-whole/head`) and one of the base (`.runs/review-whole/base`), each with junctions to the worktree's `node_modules` and `.the-way` (the pin `bfb2e109…` at both commits), and logs, the decision index and a saved copy of `balance/check-map.mjs` for the mutant. The junctions were removed first (their targets checked intact), then both worktrees with `git worktree remove --force` and `git worktree prune`, then the directory; `git worktree list` no longer shows them and `git status --porcelain` of the task's worktree is empty. Kept beside this report: `review-whole-focused.txt`, `review-whole-size-base.log`, `review-whole-size-head.log`, `review-whole-mutant-chest.log`, `review-whole-sweep.json`, `review-whole-foundation.log`, `review-whole-decision-index.txt`. Nothing remains.

## Unread material

Decisions: the index of my selection (`reports/review-whole-decision-index.txt`; sections *Balance measurement*, *Testing discipline*, *Code rules, exemplars and static checks*, parts `balance-tools`, `simulation`, `build-tools`, `agent-workflow`, `product-foundation`, and the decisions the task names) lists 53 in full and 203 by heading; I read it whole and ran through the headings. Read whole: 8 — D-378, D-425, D-427, D-428, D-429, D-189, D-253, D-177. Read in part: D-29 and D-32 (sentence, *Scope* and the start of *Verification*, from the diff), D-404 (sentence, *Verification*, start of *Rationale*). Decisions that bear on the change and stayed unread whole: D-18, D-22, D-82, D-83, D-266, D-351, D-362, D-388, D-61, D-63, D-136, D-387 (binding sentences read in the index only); D-239, D-240, D-249 (by heading; the loop's agreement with the game was checked by running its tests); D-397, D-398.

Invariants: `instrument-game-agreement`, `eslint-source-rules`, `prettier-source-format` and the *Part* of `function-and-file-size` read whole in the diff; `map-run-repeatability`, `cross-part-imports`, `tracked-file-private-paths`, `tracked-file-private-names`, `first-map-balance`, `new-account-first-pass`, `node-test-selection` not opened (their tests were run). Part map: the entry `balance-tools` whole; the others by search only. Glossary: the entry `overlay` only; the-way's glossary not opened.

Guidelines: `guidelines/coding.md` whole; `guidelines/testing.md` whole, its trust-boundary table (lines 173-247) read by its first cells only, since the part has no trust boundary.

The executors' reports 3, 4, 5, 6 and 10 were not opened (their slices were judged on the code, the tests and the checks above); the plan's handoffs of the slices not opened; `tests/balance/cli.test.mjs` read in part (lines 1-50, 196-345 and its test names).

## Searches not found or unclear

- A source in the foundation for the rule "the instrument copies no number of the game" that three comments cite as `instrument-game-agreement` (M-4): none; it stands in the task's To do 1 only.
- What the agent reports to the person of its own attempts at a map (M-6): not found in the skill, the task or the plan; the task leaves the number of attempts and thresholds to the definition of each package.
