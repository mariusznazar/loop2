PASS 3218a620

# Review `rg` — task `ocena-programu-na-ziarnach`, slices 3, 8, 9, 7

Range `afac5cd0..3218a620`; `git rev-parse HEAD` in the cycle's worktree gave `3218a620134d21c17a22151787527bc1c43789b2`, the head of the handoff. Judged: `93dd78b3` (slice 3), `b1a49f87` (slice 8), `23e0fa01` (slice 9), `3218a620` (slice 7). The other commits of the range (`bae893e2`, `f93df2f6`, `9efb8a8a`) were read as context only.

Counts: blocking 0 · Minor 2 · out of scope 2 (the two lines of *Declined to judge*).

## Findings

### Critical

none

### Important

none

### Minor

**M1 — slice 3, `src/browser/sim/judging.ts:45-60`, tests `tests/sim/judging.test.mjs:427` and `tests/sim/judging-record.test.mjs:866-875`.** The four refusals of `judgeOnSeeds` (a map the data lacks, a map not open, a character the team lacks, a program not on the list) pass their tests with each guard removed: StrykerJS left `if (!character)` → `if (false)`, `if (!chosen)` → `if (false)` and the map guard (`typeof mapId !== "string" || !Object.hasOwn(MAPS, mapId)` → `false`, and `||` → `&&`) alive. Without a guard the function still throws, but a `TypeError` of reading `.traits` or `.program` of `undefined` (or whatever `mapOf` throws), and the tests assert only `assert.throws(..., Error)`, which a `TypeError` meets. Why it matters: the requirement "it refuses a character, program or map it cannot judge in the way the simulation refuses such arguments elsewhere" holds today by the guards, but no test would notice the guard going; the outcome a caller sees (an exception) stays the same, which is why this is Minor. A check that the thrown error is not a `TypeError` (or is the function's own `Error`, by `error.constructor === Error`) would kill these mutants without fixing the text of the refusal, which `guidelines/testing.md` "Behaviour, not implementation" forbids. Evidence: the StrykerJS run below, survivors at `judging.ts:45:7` (three), `:52:7`, `:57:7`.

**M2 — slice 8, `tests/balance/engine.test.mjs:67-69`.** The test named "the default cap of a map run is the judging cap the built game holds, not a number of the instrument" asserts `DEFAULT_CAP_MINUTES === BALANCE.judgingCapMinutes`; with the literal `4000` put back into `balance/engine.mjs` it still passes while the data hold 4000. It fails only once the data and a copy in the instrument differ — which is the moment the rule "Liczba gry" of `guidelines/coding-balance-instrument.md` guards against, so the test has value (the executor showed it failing against data changed to 3001 and a literal 4000). The name claims more than it can tell: "not a number of the instrument" is not what it checks; "equals the judging cap the built game holds" is. Polish only; the code itself meets the rule (`balance/engine.mjs:12,32`).

## What I checked and found right

- **Slice 3 against To do 1–3, Questions 4, 5, 9, D-439, D-22, D-179, D-189, D-249.** `BALANCE.judgingCapMinutes: 4000` and `BALANCE.judgingSeeds: [1..12]` stand beside each other in `src/browser/sim/data/balance.ts:46-55`; no number of the cap stands in code of the simulation (grep for `4000` in `src/` and `balance/`: only `data/balance.ts`). `judgeOnSeeds` takes the equipment by `sendTake` (the very function `takeTrip`, which the earning loop's `beginRun` calls, builds on), reduces the program with `programOf` as `beginRun` does, copies traits, and `newMapRun` copies the backpack (`run.ts:370-373`), so all twelve runs start alike and nothing reaches the chest. The loop `while (!mapRunEnded(run) && run.minute < cap)` is the loop of `runOnce` (`balance/engine.mjs:227`), so a solving or a death in the cap's minute counts and only a run still going is `undecided`. `stepMinute` alone passes the minutes, so nothing is discovered and no rule is written (as `advanceLoopRun`). It reads no clock and draws no seed (the seeds come from the data). `game.ts` is not grown by the slice.
- **Slice 7 against To do 2, 6, Questions 2, 15, D-440, D-165, D-170, D-243, D-190, D-221.** `judgeAndRemember` returns the state with `judgings` alone changed (`judging.ts:103-115`); the pick, the program used last, the last-entered program, the last seed, the chest and characters are untouched (test `judging-record.test.mjs:820`). The mark (`judging-record.ts:66-79`): count solved, all twelve, `stockShort` where the chest holds less of an item than taken, badge only for twelve with no shortfall — as D-440. Every place the simulation writes content into a listed program, which I listed myself by grep for `programs:` and `withProgramContent` in `src/browser`: `editProgram`, `saveCopyIntoProgram`, `setProgram` without a map run, and the first-chill write of `advanceMinutes` go through `withProgramSaved`; `deleteProgram` removes the program's judgings; `createProgram`, `appendPrograms` (previous save) and `saveCopyAsNewProgram` give new numbers, which D-165 never reuses; `renameProgram` touches the name alone; `setProgram` within a map run, `discardCopyChanges` and a switch change the copy, not the list. `withProgramContent` is now called only inside `withProgramSaved`. No file outside `src/browser/sim/` writes `programs`. `teamAfterDeath` has two callers, `settleDeath` (`game.ts:703`) and `takeEnd` (`loop.ts:321`), both erase on `progressLost` only; `takeEnd` serves `endLoopRun` and both catch-up paths (`loop.ts:558`, `:606`), so the catch-up erases alike. A covered death, a death with no practice and a bought rank erase nothing (tests `:676`, `:702`, `:723`). A second settling of a death leaves the state (`death-settled-once`, test `:673`).
- **Orchestrator's choice (a), the first chill erases.** Confirmed: D-123 is silent on judgings, and D-440 says "A change of the rules, the rule groups or the trip plan of a program erases the judgings remembered for it"; the chill writes a rule into the listed program, so its rules change. No source says otherwise.
- **Orchestrator's choice (b), rows in `guidelines/coding-simulation-module.md`.** The guideline's text does not ask for them, and the-way's coding template says a file added after the audit takes no row: `.the-way/product-guidelines/coding/template.md:268-269`, "a file added after that audit takes no row until the guidelines are refreshed or extended". No finding.
- **Orchestrator's choice (c), `stryker.config.json`.** The added lines are what `tests/quality/test_mutation_test_selection.py` requires (run: exit 0). No finding.
- **The comparison of content by `JSON.stringify`** (`judging-record.ts:126-131`): I probed whether a save of unchanged content erases for content from every source the list holds — a new game, a created program, the rule of the first chill, and a game loaded back from a saved document — and none erased (probe below). Key order is the same in each, since content passes `checkProgram`.
- **Slice 8 against To do 11, Question 16, D-437, D-427, D-428, D-18, `instrument-game-agreement`, `balance-instrument-repeatability`.** `DEFAULT_CAP_MINUTES = BALANCE.judgingCapMinutes` (`balance/engine.mjs:32`), imported from `dist/browser/sim/data/balance.js` as `campaign.mjs` already does; `trace.mjs:14`, `campaign.mjs:59` and `progression.mjs:26` take it from the engine, unchanged; no other 4000 in `balance/`. The opening comment ("copies no number of the game") is now true. No existing expectation changed.
- **Slice 9 against To do 8, 10, Question 8, D-38, D-39, D-40, D-44, D-274, D-326, D-329, D-243, D-439, D-440.** Every role of To do 10 stands in "The screen Mapy" (`guidelines/styleguide-browser-view.md:690-722`) in its meaning of the table Roles; "States of shared controls" gives loading to „Oceń na 12 ziarnach” with `text-disabled` and „Oceniam…” (`:228-231`, `:267-269`), as D-44's waiting control and D-329; „Puść w pętlę”, also as „Puść mimo to”, and the judging button stay plain buttons (`:485-487`); D-251 is not cited. The rules keep the template's fields *Decision*, *Invariant*, *Good*, *Bad* (`.the-way/product-guidelines/template.md:56-59`); `foundation_check.py` reports no error in the styleguide or a decision it cites.
- **Trust boundary (`src/browser/sim/saved-game.ts`).** None of the four commits touches it. What slice 7 adds meets it twice: the states it produces load back (tests `assertLoadsBack` after a judging, a deletion and a death; my probe after two judgings), and `judgingMark` reads a loaded judging's items and results, which the reader of slice 4 validates (items the game gave, twelve results, `saved-game.ts:1269`). Crafted documents themselves were not in these commits, so I sent none.
- **Irreversible operation:** none. The four commits add pure functions, data numbers, a test and guideline text; nothing writes outside the game state returned.
- **Size (D-425):** `npx eslint src/browser/sim/` exit 0 and `tests/quality/test_function_and_file_size.py` exit 0.
- **The executors' own-work checks** fit the weakest points (slice 3: equipment and reduction equal to the loop's; slice 7: every write into the list and both death settlements; slice 8: a copy of the number). Their walkthroughs say no behaviour a user sees changes; that agrees with the code, since no screen calls the new functions yet.

## Mutation testing (StrykerJS, per `guidelines/testing.md` "Mutation testing")

Mutated: `judging.ts`, `judging-record.ts`, `programs.ts:385-404`, `programs.ts:560-564`, `game.ts:700-712`, `loop.ts:325-345`. 137 mutants, score 91.24%: `judging-record.ts` 100%, `loop.ts` 100%, `judging.ts` 79.59%, `game.ts` 87.5%, `programs.ts` 85.71%. Survivors, classified:

- `judging.ts:45:7` (three), `:52:7`, `:57:7` — guards of the refusals: a real but small gap, finding M1.
- `judging.ts:46:21`, `:48:21`, `:54:7`, `:59:7` — the text of a refusal emptied: behaviour not worth fixing, the guideline forbids fixing a refusal's text.
- `judging.ts:81:7` — the ids of the run (`{ mapId, characterId }` → `{}`): equivalent; the result of a seed reads only the death and the completion, and the outcome of a run does not depend on these labels.
- `game.ts:711:13`, `programs.ts:564:13` — `events: []` of `settleDeath` and `deleteProgram`: lines these slices did not write; outside the task (Declined to judge).

The run used a copy of `stryker.config.json` without `tests/sim/saved-game.test.mjs`, whose case "a document of the current version loads into the state it describes" fails in the initial run at this head; the handoff says that file fails by the plan until slice 6.

## Declined to judge

- `src/browser/sim/game.ts:711` and `src/browser/sim/programs.ts:564`, the surviving mutants `events: []` → `["Stryker was here"]` of `settleDeath` and `deleteProgram`: lines that stood before the range; no slice of this review wrote them.
- The five errors of `foundation_check.py`, quotations of D-243 in `tests/view/account-screen.test.mjs:2683,2807,2975` and `tests/view/maps-screen.test.mjs:494,700`: in files none of the four commits touches; the handoff and the slice reports name them for later slices.

## Checks run

All in the detached worktree `.runs/review-rg/wt` at `3218a620`, after `npm ci` (exit 0).

| Command | Exit |
|---|---|
| `npm test -- tests/sim/judging.test.mjs` | 0 |
| `npm test -- tests/sim/judging-record.test.mjs` | 0 |
| `npm test -- tests/sim/data.test.mjs` | 0 |
| `npm test -- tests/sim/random.test.mjs` | 0 |
| `npm test -- tests/sim/death.test.mjs` | 0 |
| `npm test -- tests/sim/loop.test.mjs` | 0 |
| `npm test -- tests/sim/catch-up.test.mjs` | 0 |
| `npm test -- tests/sim/program-list.test.mjs` | 0 |
| `npm test -- tests/sim/copy.test.mjs` | 0 |
| `npm test -- tests/balance/engine.test.mjs` | 0 |
| `npm test -- tests/balance/agreement.test.mjs` | 0 |
| `npm test -- tests/balance/trace.test.mjs` | 0 |
| `npm test -- tests/balance/campaign.test.mjs` | 0 |
| `npm test -- tests/balance/cli.test.mjs` | 0 |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 |
| `npm test -- tests/invariants/test_simulation_randomness.py` | 0 |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 |
| `npm test -- tests/invariants/test_saved_program_edit.py` | 0 |
| `npm test -- tests/invariants/test_balance_instrument_repeatability.py` | 0 |
| `npm test -- tests/invariants/test_cross_part_imports.py` | 0 |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 |
| `npx eslint src/browser/sim/` | 0 |
| `npx eslint src/browser/sim/ tests/sim/judging.test.mjs tests/sim/judging-record.test.mjs balance/engine.mjs tests/balance/engine.test.mjs` | 0 |
| `npm run typecheck` | 0 |
| `python -B <cycle worktree>/.the-way/elements/common/foundation_check.py`, run from my worktree (its own `.the-way` is not initialized; the script is the pinned `19e5774a` of the cycle's worktree) | 1 — the five D-243 quotations named under *Declined to judge*, none in a file of these commits |
| StrykerJS, `node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.review.json --mutate "<the six targets above>"` | 0; the first run with the repository's config stopped (ConfigError) on the planned failure of `tests/sim/saved-game.test.mjs` |
| Probe `probe-keyorder.mjs`: an unchanged `editProgram` after two judgings on a new game's programs, after the first-chill rule, and JSON of each content against `checkProgram` of it | every judging kept; JSON equal |
| Probe `probe-load.mjs`: a state with two judgings saved (`withSaveTime`), loaded with `loadSavedGame`, then each program edited unchanged | load `ok: true`; every judging kept |

Not run: the full gate (`npm test` with no argument), by the handoff; `check_instructions.py`, which no file of these commits concerns.

## Reaches beyond the dispatch

- `foundations/decisions.md` D-123 whole — for the orchestrator's choice (a).
- `.the-way/product-guidelines/coding/template.md:85-124, 250-274` — whether a new file owes a row (choice b).
- `.the-way/product-guidelines/template.md` lines with *Decision*, *Good*, *Bad* (grep) — the form of the styleguide's rules.
- `src/browser/sim/run.ts` `newMapRun`, `stepMinute`; `src/browser/sim/game.ts` `programOf`, `canSendMap`, `send`, `setProgram`, `teamAfterDeath`, `settleDeath`, `advanceMinutes`; `src/browser/sim/loop.ts` `beginRun`, `startLoop`, `takeEnd`; `src/browser/sim/programs.ts` `checkProgram` and every function that writes `programs`; `src/browser/sim/saved-game.ts` `savedGame`, `loadSavedGame`; `balance/engine.mjs:1-40, 208-260`; `foundations/part_map.md` simulation and balance-tools — the callers and contracts of the change.
- `foundations/glossary.md` map run, program, completion, copy.
- `a note in the author's private notes`, `.ai/rules/git.md` — named by the session's hook before scripts and git commands.

## Working copies

- `.runs/review-rg/wt` — detached worktree of `3218a620` with `node_modules`, `dist`, `.stryker-tmp` and the config `stryker.review.json`; removed with `git worktree remove --force`, then `git worktree prune`.
- `.runs/review-rg/` — the two probe scripts, the logs of the checks, the StrykerJS output and extracts of foundation entries; removed by its full path. Nothing kept in `reports/` besides this report: the figures it needs are quoted above.

## Unread material

- `guidelines/styleguide-browser-view.md`: read the changed rules ("States of shared controls", "Main button, secondary action and tab", "The screen Mapy") and the diff, not the file whole (1213 lines). Slice 9's *Read* does not name the file itself; the rules the change writes were read whole.
- `foundations/part_map.md:3-31` browser-view and `:139-157` agent-workflow: not read; the guideline text of slice 9 names no file of either beyond the styleguide.
- `tests/sim/judging.test.mjs:260-453` and `tests/sim/judging-record.test.mjs:1-170, 180-400, 680-750`: read by test name and by StrykerJS, not line by line.
- `tests/sim/reference-programs.mjs`, `tests/sim/program-fixture.mjs`, `tests/balance/agreement.test.mjs`, `tests/balance/cli.test.mjs:100-140`, `balance/trace.mjs`, `balance/campaign.mjs:1-140`: not read line by line; their use of `DEFAULT_CAP_MINUTES` checked by grep, and their tests run (exit 0).
- `.the-way/product-guidelines/styleguide/SKILL.md` and its step files: not read; the styleguide's form was compared with the-way's general template and `foundation_check.py`.

## Searches not found or unclear

- The cycle's worktree showed uncommitted changes of another agent during the review (`src/browser/sim/saved-game.ts`, `tests/sim/previous-programs.test.mjs`, `tests/sim/saved-game.test.mjs`); I made no change there and reviewed only the commits.
- My worktree's `.the-way` submodule was not initialized; `foundation_check.py` was run from the cycle worktree's `.the-way` at the pinned commit `19e5774a`.
