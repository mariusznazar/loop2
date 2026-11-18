# Report - executor of slice 8 (one npm command for every mode, the results kept out of the repository)

**Status:** done

**Commits:** `a09d0945` on `task/przyrzad-balansu` (base `d78071df`), one commit by path: `feat: :sparkles: add one npm command for every mode of the balance instrument, npm run balance, ...`. Author address checked with `git log --format='%h %ae'`: the private address, as the rules say for this account.

## Files changed

| File | Added / removed lines |
|---|---|
| `balance/cli.mjs` (new) | about +400 / 0 (the longest function is under 40 lines) |
| `balance/describe.mjs` (new) | about +100 / 0 |
| `tests/balance/cli.test.mjs` (new) | about +510 / 0 (20 tests) |
| `package.json` | +1 / 0 (the script `balance`) |

## What was made

- `npm run balance -- <command> [flags]` is the script `node scripts/build.mjs && node balance/cli.mjs`; the build is the game's whole build (Choice 4 of the plan). Commands: `sweep`, `trace`, `loop`, `campaign`, `programs`, and `help`. Flags: `--map`, `--program`, `--seeds`, `--chest`, `--practice`, `--ranks`, `--overlay`, `--cap`, `--hours`, `--no-resurrection`, `--player`, `--out`. A flag that is none of the command's is refused (a table `COMMAND_FLAGS`, from which `help` prints its list).
- `balance/cli.mjs` exports `parseSeeds`, `parsePairs`, `parseArgs` and `runCommand`. `runCommand(command, options)` is synchronous and does no output of its own: it gives `{ printed, files: [{ path, content }] }`, and only `main` (the process entry) writes the files and prints. So the instrument writes a file only where `--out` named a path (D-429); the test shows it on the returned value.
- `--program` is an identifier of `REFERENCE_PROGRAMS` (`tests/sim/reference-programs.mjs`), or else the path of a JSON program file, checked with the game's own `checkProgram`. `--player` is an identifier of `balance/players/` or a path. `--overlay` is repeated, or lists files with commas, or both; the overlays are laid in order, read through `readOverlay`/`applyOverlay` of Slice 5, and restored in reverse in a `finally`.
- Output. `sweep`: standard output holds `{ header, summary }`; the `--out` file holds `{ header, summary, results }` (the per-seed rows). `loop`: `{ header, perCheckpoint }`, the file adds `runs`. `campaign`: `{ header, summary }`, the file adds `logs`. `trace`: the lines of the trace and a last line `end: <outcome> at minute N[, cause C]`. `programs`: every reference program in the game's words on standard output; with `--out` one `<identifier>.json` per program (the game's shape) and `programs.md` with all in words, in the directory. With `--out` nothing is printed on standard output and one line on standard error says how many files were written.
- `balance/describe.mjs` exports `describeProgram(name, program)` and `describePrograms(registry)`. Conditions and actions are worded from the data (`CONDITIONS[kind].label` with the number and its `unit`, or the number with the item or resource name; `ACTIONS[kind].label` with the resource name), the trip plan with the item names; a kind the data lacks is an error naming it. The structure words around the labels (`rules`, `groups`, `Take`, `Bring`, `Group`, `when`) are English; the labels and names are the game's.
- `npm run --silent balance -- ...` prints the result alone: checked on a clone and on the worktree, standard error empty, standard output parsed whole as JSON.

## Checks (command, exit code)

| Check | Command | Exit | Result |
|---|---|---|---|
| Test before the command line stands (stubs returning empty values) | `npm test -- tests/balance/cli.test.mjs` | 1 | 20 of 20 failed on assertions (deepEqual, "Missing expected exception", `ruleLines`, and `SyntaxError: Unexpected end of JSON input` on the stub's empty output), none on a missing module. Log: `reports/executor-8-red.log` |
| Test after | `npm test -- tests/balance/cli.test.mjs` | 0 | 20 of 20 pass. Log: `reports/executor-8-green.log` |
| Sweep as the slice names it | `npm run --silent balance -- sweep --map forest --program forestBest --seeds 1-500` | 0 | read whole as JSON: 500 runs, 359 solved (71.8 %), median 754, deaths `cold` 141, capped 0; standard error empty. Output kept in `reports/executor-8-sweep-repo.json` |
| ESLint | `node node_modules/eslint/bin/eslint.js --max-warnings 0 balance tests/balance` | 0 | pass |
| Prettier | `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore balance tests/balance` | 0 | pass |
| Size rules | `node tests/quality/eslint-size-rules.mjs` | 0 | names nothing of `balance/` (grep count 0) |
| No file written | `git status --porcelain` after the sweeps, the trace, the loop, the campaign and `programs --out` into the directory under `.runs/` | - | empty (build output `dist/` and `.runs/` are ignored) |
| Own check: cross-part imports | `npm test -- tests/invariants/test_cross_part_imports.py` | 0 | pass (the file imports `tests/sim/reference-programs.mjs`, a file of `simulation`, as D-427 says) |
| Own check: private paths | `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` | 0 | pass, run after the commit |
| Own check: names of the notes | grep for `analizy`, `symulator`, `krytyka`, `The Brain`, `Storage`, `przyrzad`, `nakladk`, `fable`, `C:`, `polityk`, `silnik`, `D-80`, `wyniki` on the three new files | 1 | no match |
| Own check: foundation | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` and the same without the flag | 0, 0 | 0 errors both |

Not run: the full gate (`npm test` with no argument), as the handoff says.

### The one-time comparison with the notes' instrument (same commit `a09d0945`'s build)

The notes' instrument was run as its README gives, `przemiatanie --map forest --program las_najlepszy --ziarna 1-500` with its flag for the simulation's directory pointed at this worktree's `dist/browser/sim`, and without its flag that writes a file (nothing was written into the notes; `git status` of that directory is empty). The summary objects of the two, serialized as JSON, are **identical byte for byte** (all 12 fields: `runs`, `solved`, `solvedShare`, `solveMinute`, `deaths`, `capped`, `firstFire`, `noFire`, `practicePerSolved`, `lootPerSolved`, `backpackAtSolve`, `timeShare`).

| | solved | share | solve minutes (n, min, p10, median, p90, max) | deaths | capped |
|---|---|---|---|---|---|
| this repository's instrument | 359 of 500 | 71.8 % | 359, 654, 691, **754**, 838, 1501 | cold 141 (min 243, median 338, max 777) | 0 |
| the notes' instrument | 359 of 500 | 71.8 % | 359, 654, 691, **754**, 838, 1501 | cold 141 (the same) | 0 |
| the task's figures, earlier commit | 359 of 500 | 71.8 % | median 754 | - | - |

Both outputs are kept in `reports/executor-8-sweep-repo.json` and `reports/executor-8-sweep-notes.json`. The notes' instrument writes only the summary on standard output, so only the summaries were compared, not the per-seed rows; the per-seed agreement with the game itself is the invariant of `tests/balance/agreement.test.mjs`. No difference to name.

### The check in a fresh clone

`git clone --branch task/przyrzad-balansu` of this worktree into `.runs/executor-8/clone` (commit `a09d0945`, no `dist/`, no `node_modules`), then `npm ci` (exit 0, 23 s, network available; log in `reports/executor-8-npm-ci.log`), then `npm run --silent balance -- sweep --map forest --program forestBest --seeds 1-500` with no other step (exit 0, about 2 s including the build): 500 runs, 359 solved, median 754; standard error empty; `git status --porcelain` of the clone empty. The output is `reports/executor-8-sweep-clone.json`. The check ran.

## Own-work check

**Requirement most likely not met:** "nothing the instrument writes goes into the repository unless a flag names a path there", with "standard output holds the result alone" under `--silent`, and "each flag reaches the measurement" (a flag that is parsed and dropped is the typical break of a command line).

- No write: `runCommand` returns files and never writes; the test asserts `files` is empty without `--out` and holds exactly the one path given with it, and `printed` is empty with it (mutant: printing as well, see below, fails). The process check: `git status --porcelain` empty after all the commands above.
- Each flag reaches the measurement: the tests compare the command's summary with the engine's, the loop's and the campaign's own for the same arguments, each with a precondition that the flag changes the result on those seeds: `--chest`, `--cap`, `--practice`, `--ranks` on a sweep, `--practice`, `--no-resurrection` and `--hours` on a loop, `--overlay` (laid, both orders of two, restored also after a failure), `--player`, `--seeds`.
- Mutants run on `balance/cli.mjs` (each run, then the good copy restored and compared equal): the chest dropped from the sweep - fails the sweep case; the overlay's restore removed - fails two overlay cases; the range `1-5` off by one - fails four cases; `--out` printing as well - fails the `--out` case; a repeated flag accepted - fails the refusal case; the loop's practice dropped - fails the loop case. **One survived the first version of the test:** the resurrection flag ignored in the loop (`resurrectionReady: true`), because a character with no practice loses nothing by a death, so the readings were equal with and without the resurrection on seeds 1-20. I found a case where they differ (a character with `smallItemGathering=80`: the spent resurrection changes the stopped share and the resurrection-used share), rewrote the loop test around it with a precondition that the two direct runs differ, and the mutant then fails. The mutants were not kept in the repository.
- The sweep read through the `--program` file path was checked by hand (the file written by `programs --out`, `forestBest.json`, gives 359 solved) and not by a test, since a test of file reading would be a file of test data (D-81; Choice 12 of the plan).

## Choices (way rejected, cost if wrong)

1. **`runCommand` returns `{ printed, files }` and `main` writes.** Rejected: commands that print and write inside. Cost: none; the tests need no disk.
2. **The standard output of `sweep`, `loop` and `campaign` holds the header and the summary, the `--out` file holds also the per-seed rows.** The slice says a command "prints its result on standard output, or writes it to the file `--out` names"; 500 rows of a sweep are about 1 MB and unreadable on standard output, and the notes' instrument also printed the summary and kept the rows for its file flag. Rejected: the same full text in both. Cost if wrong: a person who wants the rows without a file asks for `--out` and reads it.
3. **`programs` prints the descriptions in the game's words, not the programs as JSON.** The slice says "prints every reference program". Rejected: printing the JSON of all 23 programs (about 20 pages of data); the JSON is what `--out` writes. Cost if wrong: one function to change.
4. **`--seeds` defaults to 1-100 and `trace` to seed 1, `--cap` to the engine's own default (the header shows `cap: null` then)**, no default copied into the command. Rejected: a default of 1-500 for the sweep (the convention of the measurements); the header always shows the seeds used, so a number on 100 seeds is not taken for one on 500. Cost: a person forgets `--seeds 1-500`.
5. **`trace` takes `--seeds` with exactly one seed** (the slice names no `--seed`); more are refused with "a trace takes one seed". Rejected: a new flag outside the slice's list.
6. **A refusal of what a person typed is a `UsageError` printed as a sentence with exit code 1, any other error propagates with its stack** (the default of Node, D-253). An error of the engine on a skill name is wrapped as a usage error; an invalid player description throws from the campaign with its own sentence and a stack. Cost: a stack for a mistyped description.
7. **The check `isEntryPoint`** compares the real paths of `process.argv[1]` and of the module, so the tests import the module with no side effect and the npm script runs it. Rejected: splitting `main` into a second file, one more file for four lines.
8. **The descriptions' structure words are English** (`3 rules in 2 groups. Take: ... Bring: ...`), the labels and names those of the game, in Polish as the player sees them. Rejected: Polish structure words as in the notes' instrument (the language of code and of what it prints to the agent; the game's words are the part the player sees).
9. **A `--program` path is checked with `checkProgram(value, null)`** (the resources of every map count as allowed, overlay maps included), so a program file that the game would refuse is refused with the game's sentence. Rejected: reading the file unchecked, which would fail deep in a map run.

## Reaches beyond the handoff

- `balance/cli.mjs` imports `tests/sim/reference-programs.mjs` (a file outside `balance/`), as D-427 and Choice 2 of the plan say; the cross-part test passes.
- `src/browser/sim/programs.ts` (`checkProgram`, `allowedResources`, `ProgramCheckError`, read in parts) to see what it accepts and with which `run`; `balance/players/edge-daily-best.json` and `balance/overlays/*.json` (read in part) for the identifiers the tests use; `src/browser/sim/data/skills.ts` (one `grep`) for the branch identifier `cleanFlame` in a manual check.
- Executor 7's report, for the exports of `campaign.mjs`, and the sources of `balance/engine.mjs`, `overlay.mjs`, `trace.mjs`, `loop.mjs`, `campaign.mjs` (the parts that give the signatures), since the handoff says to read their exports.
- The notes' `przyrzad/balans.mjs` (whole) and `przyrzad/programy.mjs` (whole) and `README.md` (whole), as the handoff names, and nothing else of them.
- `.the-way/task-cycle/change/slice.md` was read, as the method names.

## Unread material

- `guidelines/testing.md`: the whole file was read, but its trust-boundary table (lines 173-247) only by skimming the first rows' relevance; none of its rows concerns this slice.
- `foundations/glossary.md`: read whole, but the tool's output cut each line at 400 characters; the entries have short lines, so no entry was cut that matters here.
- `src/browser/sim/data/actions.ts`: lines 1-60 of 195; `src/browser/sim/data/resources.ts`: lines 1-40 of 47; `src/browser/sim/data/items.ts`: lines 1-30 of 51. The rest are the table rows, whose shape (`label`, `name`, `unit`) the first rows show; `conditions.ts` whole; `scripts/build.mjs` whole.
- `foundations/decisions.md`: D-266, D-362, D-405 and D-427 to D-429 read whole; no other entry opened.
- `.runs/task-cycles/przyrzad-balansu/task-frozen.md`: read whole (the passages 27-45, 66-71 and 117-127 and the rest).
- `plan.md`: lines 1-60 (Foundation entries, Slices 1-3) and 150-200 (Choices) read; slices 4-10 not opened, since the handoff carries Slice 8 word for word.

## Searches not found or unclear

- none. One point to note: the plan's Choice 1 lists `check-map` among the commands "the flags those Slice 8 names", while Slice 8 names five commands; I made the five and left `check-map` to Slice 9, as the slice says.
- One value: the handoff's *Checks* line names `--program <the best program of Las>`; I took it to be `forestBest` (the identifier Slice 1 gave), which the comparison with the notes' `las_najlepszy` confirms (identical summaries).

## Problems observed

- None in the code. `npm run balance` without `--silent` shows the two banner lines `> loop2@0.0.0 balance` and the command on standard output (npm's own); the skill of Slice 10 should name `npm run --silent balance`, as the slice says.
- On Las, `wastelandCleanFlame` solves 0 of 50 on the wasteland overlay with no chest and no ranks (dies of cold), and 47 of 50 with `--chest stick=6,berry=4 --ranks cleanFlame=1`; that is the program's design (its comment says it needs the branch), and the table of the map check (Slice 9) will have to give each program the chest and ranks it asks for, which Choice 8 of the plan says it does by the take list only. Noted for Slice 9, not a defect of this slice.

## Working copies

`.runs/executor-8/` under the worktree root held the logs, a clone of the branch with its `node_modules` (`.runs/executor-8/clone`), a good copy of `cli.mjs` for the mutants, three probe scripts and the programs written by `programs --out`. The logs the report needs are kept in `reports/` (`executor-8-red.log`, `executor-8-green.log`, `executor-8-sweep-repo.json`, `executor-8-sweep-notes.json`, `executor-8-sweep-clone.json`, `executor-8-npm-ci.log`); the directory was removed with `rm -rf` before returning, and nothing stays. The build output `dist/` is the product's ignored build output, not a working copy of mine.
