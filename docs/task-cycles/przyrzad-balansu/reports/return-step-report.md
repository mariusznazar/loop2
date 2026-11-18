# Report - the return step, task `przyrzad-balansu` (`make-change`, the return step)

**Status:** done with concerns (two findings of the tests and one reach beyond the handoff, below; none blocks).

**Base:** `f3bc5fdf86865d035cd27c568980e58602921406`. **Commits** on `task/przyrzad-balansu`:

- `081f6e01` - the foundation: `foundations/decisions.md`, `foundations/invariants.md`, `foundations/part_map.md`.
- `64f37f21` - the lines `decision: D-428` and `decision: D-429` in two test files (`tests/balance/check-map.test.mjs`, `tests/balance/cli.test.mjs`): comments only. Kept as a commit of its own so that the cycle can drop it (see "Reaches beyond the handoff"). The foundation check at `081f6e01` alone reports D-428 and D-429 as held by nothing (their `tests:` clause stands before the lines do); at `64f37f21` it reports `0 errors`.

I changed no code, no skill and no test assertion; items 1 and 2 of the correction stand as they were.

## Entries written or changed

All are marked `the cycle's` (no row of the task carries them).

| Entry | English | Polski |
|---|---|---|
| D-428 (changed) | The map check names each program by a label, its place in the whole list that `programs` prints, and never by the program's identifier, since an identifier can state the rules of its program; its *Verification* names the tests that hold the table's columns, rows and labels and keeps a pair only for the seeds 1 to 500 and the rows for every map and program. | Tryb sprawdzania mapy nazywa program etykietą, czyli jego miejscem na pełnej liście, którą wypisuje `programs`, a nigdy jego identyfikatorem, bo identyfikator może opisywać reguły programu; *Verification* wskazuje testy kolumn, wierszy i etykiet, a parę przykładów zostawia tylko dla ziaren 1-500 i wierszy dla każdej mapy i programu. |
| D-429 (changed, *Verification* only) | The clause `tests:` names the sweep and the `programs` command printing their result, writing no file, and with `--out` writing to the given path alone; the pair stays for the other commands and for committed result files. | Klauzula `tests:` wskazuje polecenia `sweep` i `programs`, które wypisują wynik, nie piszą plików, a z `--out` piszą tylko pod podaną ścieżką; para przykładów zostaje dla pozostałych poleceń i dla zacommitowanych plików z wynikami. |
| D-425 (taken through the decisions skill, one pair line added) | Its sentence and its `tests:` clause already say what the planted 201-line function under `balance/` holds (the limit on a function reaches the instrument); the part no test holds, the limit on a file reaching `balance/`, now stands as a violating example. | Zdanie i klauzula `tests:` mówią już dokładnie to, co trzyma podłożona funkcja 201 linii w `balance/` (limit funkcji obejmuje przyrząd); część, której nie trzyma żaden test, czyli limit pliku w `balance/`, stoi teraz jako przykład naruszenia. |
| *Scope* of D-28, D-73, D-77, D-78, D-81, D-82, D-83, D-84, D-85, D-252, D-253, D-351, D-362 (changed) | Each gains `balance-tools`; no sentence of any of them changes. | Każda zyskuje `balance-tools`; zdanie żadnej z nich się nie zmienia. |
| invariant `node-test-selection` (changed, *Part*) | *Part* gains `balance-tools`: a new `tests/balance/*.test.mjs` file left out of `npm test` makes its sentence false. | *Part* zyskuje `balance-tools`: nowy plik `tests/balance/*.test.mjs` pominięty przez `npm test` czyni jego zdanie fałszywym. |
| part map `build-tools` (changed) | The sentence says the part runs the balance instrument over a build of the game, and *Depends on* gains `balance-tools`. | Zdanie mówi, że część uruchamia przyrząd balansu na zbudowanej grze, a *Depends on* zyskuje `balance-tools`. |
| part map `agent-workflow` (changed) | The sentence says the part holds the skill that runs the balance instrument, and *Depends on* gains `balance-tools`. | Zdanie mówi, że część trzyma skill, który uruchamia przyrząd balansu, a *Depends on* zyskuje `balance-tools`. |

Written through the element's `SKILL.md` read as a file (`elements/decisions/skill/SKILL.md`, `elements/part-map/skill/SKILL.md`, `elements/invariants/skill/SKILL.md`, with `elements/common/way_of_working.md`, `rules.md` and the three templates): the reading, the decision of what the entry is (an edit in place of a neighbour, never a new number), the search for neighbours, the draft, and the foundation check after the write.

## Comparisons and their results

### 1. Entries the change wrote or changed, against the code at `f3bc5fdf`

- **D-427** (`tests/sim/reference-programs.mjs`): true. `balance/cli.mjs:22` imports `REFERENCE_PROGRAMS` from it, the tests of `tests/sim` (`acceptance`, `first-map-balance`, `new-account-first-pass`) and of `tests/balance` import from it, and no file of `balance/` holds a program of its own (`grep groups` finds only `describe.mjs`, which reads a program); the player descriptions name programs by identifier. *Rationale* matches the part map (`simulation` depends on none, `balance-tools` on `simulation`). No test holds "no copy stands elsewhere", so the pair stays. Unchanged.
- **D-428:** the table (`balance/check-map.mjs`) prints nine columns, the `Program` column holds `P<n>`, the key is what `programs` prints (`balance/describe.mjs`, `programLabels`), and tests hold that no identifier of the 23 programs and no text of a rule is in the table (`check-map.test.mjs`, the test of `forestBest` and the one through `runCommand`). The old sentence ("no condition, action or rule of any program") was true but left the label choice, which binds after the merge and which the skill and two tests rest on, to prose of the review. Judged: an identifier can carry rules, so the label is what keeps the sentence true; it became a binding sentence (a third sentence of the same paragraph), the *Rationale* says why, *Rejected* holds the way the whole-change review offered and the fix rejected (neutral names for the 23 programs) with its cost, and the clause `tests:` replaces the part of the pair the tests hold. Changed (above).
- **D-429:** true. The only writer is `main` near the end of `balance/cli.mjs`, from the `files` that a command returns, and a command returns files only for `--out`. `cli.test.mjs` holds it for `sweep` and `programs`; named by the clause, the pair kept for the other commands. Changed (above).
- **D-378:** true against `tests/sim/acceptance.test.mjs` (the four lines `decision: D-378` quote its first sentence; the test of the empty program quotes the whole). The *Verification* `tests:` clause is what the tests hold: on the named seed, a program of the closed lists completing the map with nature energy spent on its lightings, and the empty program dying (minute 243, cold). Unchanged.
- **D-29, D-32:** true. `eslint.config.mjs` lists `balance` in `directories`, in the program of `tsconfig.browser.json` and in the node globals; `.gitattributes` gives `balance/**` the LF lines; `PRETTIER_PATTERNS` and `SCOPE_PARTS` hold `balance-tools`. Unchanged.
- **D-425:** see "D-425 through the skill" below.
- **Invariants `eslint-source-rules`, `prettier-source-format`, `function-and-file-size`:** true; the third is still `Violated: yes` for the four places of the real repository (`startApp`, `createProgramsEntry`, `build`, `kitchen-sink.tsx`), none in `balance/` (the log of the size test in the reviews' reports, and the control file I read in the diff).
- **Invariant `instrument-game-agreement`:** true against `tests/balance/agreement.test.mjs`: five cases cite it, each sending 40 seeds through the game's `send` and `advanceMinutes` and through `runOnce`, comparing end minute, outcome, cause, practice (and also backpack and loot, which is more than the sentence says; a superset, so true).
- **Glossary `overlay`:** true against `balance/overlay.mjs` (memory only, restored after the command). No other word the change uses needs an entry (`balance instrument` and `reference program` are defined in D-427's sentence, as the foundation step found).
- **Part `balance-tools`:** files `balance/**` and `tests/balance/**` claim exactly what is tracked; `Depends on: simulation` matches every import (`../dist/browser/sim/...`, which `cross-part-imports` matches to `src/browser/sim`, and `../tests/sim/reference-programs.mjs`); nothing of `balance-tools` imports another part. The sentence holds. Unchanged.

### D-425 through the skill (item 2)

The fix had edited the entry by hand. Read whole and taken through the decisions skill: the sentence names the balance instrument beside the application, the scripts, the tests and the agent-workflow directories, which is what `eslint.config.mjs` now reaches (the size run takes its files from it). The clause `tests:` says "the limit on a function reaching ... the balance instrument ..." and "the limit on a file off in the tests"; the test `test_control_the_script_reports_what_stands_over_a_threshold_and_nothing_else` plants `balance/over-function.mjs` (a function of 201 lines) and holds exactly the first, not a limit on a file under `balance/`. The clause claims no more, so I did not change it. The limit on a file reaching `balance/` is held by no test; it stands as a violating example in the pair ("the files under `balance/` left out of the limit on a file"), which the skill allows for a part no invariant and no test holds. `python -B .the-way/elements/common/foundation_check.py` `0 errors` after it; `npm test -- tests/quality/test_function_and_file_size.py` exit 0 (`OK (expected failures=1)`).

### 3. Decisions that list parts one by one in *Scope* (item 3)

Found by a script over the *Scope* of every decision (`.runs/return-step/scopes.py`, removed), 4 or more code parts without `balance-tools`, then those with 2-3 parts read by heading. Criterion: the decision binds the instrument if its sentence is a rule over all code, all tests or all tracked files, or over a kind of file or script the instrument holds (`.mjs` code, Node tests, a command run by hand). The instrument holds no Python, no Bash, no server, no page, no font.

Added (`balance-tools` after `build-tools`, sentences untouched): **D-28** (the coding checks cover all code, tests included; `guidelines/coding.md` already lists the part), **D-73** (the testing discipline; `guidelines/testing.md` already lists the part), **D-77** (`npm test` and `npm test -- <file>`; `scripts/test.py` now names `tests/balance/*.test.mjs`), **D-78** (the shape of a case), **D-81** (the levels of tests), **D-82** (the source of an expectation; the tests of `tests/balance` write expected values out and name no document), **D-83** (the selection of `*.test.mjs` by `npm test`), **D-84** (a simulation test supplies state, time and seed; the instrument's tests do), **D-85** (the exemplars of the levels), **D-252** (failures and logs: the instrument prints what a command prints to whoever ran it, throws other errors, and logs nothing), **D-253** (a script run by hand that touches no account data ends with the default print: the entry point at the end of `balance/cli.mjs` catches only its own `UsageError` and lets any other error end the process), **D-351** (imports within the part map: all of the instrument's imports are within `simulation`), **D-362** (no tracked file names a note or a private path: no match for notes, paths or private names in `balance/`, `tests/balance/` or the skill; the overlay's description says "the earlier game" and names no repository).

Not added, and why:

- **D-30 (Python), D-31 (Bash):** the instrument holds no `.py` and no Bash script, so their sentences bind none of its files. Judged on holdings and not on the convention of the lists, since D-31 lists `simulation` and `browser-view`, which hold no Bash either, so the lists are a convention that these decisions keep; I did not follow it for a part holding none. Cost if wrong: a Python file added to `balance/` later would be checked by Ruff all the same (the test runs on the repository), and the change that adds it adds the part to D-30, D-31 and `ruff-source-rules` then. The same reasoning leaves `ruff-source-rules` and `shellcheck-source-rules` as they are.
- **D-74, D-75, D-76, D-79, D-87, D-88, D-89** (generated inputs, real-browser journeys, fonts and preview server, the npm registry, pixel comparison, real browser events, who revisits an exclusion): each defers or limits one kind of test that the instrument has none of; an author of a change to the instrument has no need of them.
- **D-268** (a document imitation in a test): the instrument has no document.
- **D-06, D-266:** how the application is built and where its output stands; the instrument reads `dist/browser/` and the build part is its only owner, so a change to the instrument does not meet them. **D-49** (a port for a server a test starts), **D-393** (names outside the language in the simulation), **D-94** (mutation testing of the simulation: "other parts retain the author's mental mutation check"), **D-255, D-412, D-413, D-417** (checking the game in a browser, secrets, CI, the skill that plays): none concerns what the instrument does. **D-356, D-400, D-410:** the server and the accounts.
- **D-04** ("the game is written in TypeScript") and **D-07** ("the browser computes the whole game"): the instrument is a tool outside the game and its code is JavaScript, while the game stays TypeScript and computed in the browser; neither sentence is broken (D-07 only says the server computes nothing of the game). Named so that a reader sees the question was asked.

Invariants whose *Part* lists parts one by one: `node-test-selection` gains `balance-tools` (the new directory of tests is a place where a change can make its sentence false). `cross-part-imports`, `tracked-file-private-paths`, `tracked-file-private-names`, `map-run-repeatability` name `every`: left. The others listed that lack the part (`ruff-source-rules`, `shellcheck-source-rules`, `document-test-memory-limit`, `application-build-output` and its kin, the account and container invariants) concern a kind of file or part the instrument has none of.

### 4. The part map (item 4)

- **`build-tools` *Depends on*:** judged to need `balance-tools`, by the glossary of the-way: a dependency of a part is "any reach ... a script of it that reads a file of the other ... a path ... of the other", not only an import (`elements/part-map/template.md`, "Allowed dependencies"). Its `package.json` script `balance` runs `balance/cli.mjs` after the build, and its `scripts/test.py` names `tests/balance/*.test.mjs`, as it names the tests of `browser-view`, `simulation` and `account-server`, which `Depends on` lists. `cross-part-imports` reads imports only, so the line permits what no code does yet; it adds no cycle (`balance-tools` depends on `simulation` alone). The sentence now says the part runs the balance instrument over a build of the game, as it says it launches the password measurement and the restore trial; without it the dependency would name something the part is not said to answer for. Cost if wrong: one line and one clause to revert; `npm test -- tests/invariants/test_cross_part_imports.py` exit 0 after the change. Rejected: no line, because an npm script naming a file is no import: true for the invariant, false for the definition of the dependency.
- **`balance-tools` *Depends on*:** only `simulation`; the instrument imports no file of `build-tools`. It needs the build in `dist/`, as the tests of `tests/sim` do, and the map matches that to `simulation` (D-351, `cross-part-imports`, "built from"), so no dependency on `build-tools` is written; the tests of `simulation` carry the same need and the map holds `Depends on: none` for it.
- **`agent-workflow`:** the skill `loop2-balance` (`.claude/skills/loop2-balance/SKILL.md` and its twin under `.agents/`) runs `npm run balance`, names `balance/` and `tests/balance/` and tells the agent to read `tests/sim/reference-programs.mjs`; "a skill of it that calls a file of the other" is a dependency, so `Depends on` gains `balance-tools` and the sentence says why, as it does for the skill that plays the game and `simulation`. It already lists `simulation` and `build-tools`.
- **`simulation`, `product-foundation`:** `simulation` now holds `tests/sim/reference-programs.mjs` by its pattern `tests/sim/**`, and imports no part; its sentence holds. `product-foundation` (`foundations/**`) unchanged.
- **Tracked files without a part, or in two:** the foundation check reports none (`0 errors`).

### The rules of item 4 of the remarks, one by one

| Rule | The instrument keeps it? Where |
|---|---|
| D-18 (content lives in data files) | Yes. The instrument holds no number of the game (`grep` for 480, 540, 37.0, 0.35, 243 finds none); it reads `dist/browser/sim/data/*`; overlays are JSON files that change the tables in memory only (`balance/overlay.mjs`). The shipped overlays are examples of a map that is no part of the game's data. |
| D-22 (randomness) | Yes. No `Math.random`, no `Date.now`; a seed comes from the list a command is given, and the loop starts through the game's `startLoop` with `lastSeed`; the seeds of later map runs of a loop come from the game's `catchUp`. `instrument-game-agreement` holds the equality with the game. |
| D-82 (sources of expectations) | Yes. No comment in `balance/` or `tests/balance/` names a task document, note or ticket (grep); values are written out in the tests. |
| D-83 (where tests live, how they enter the gate) | Yes. `*.test.mjs` under `tests/balance/`, selected by `scripts/test.py` (`NODE_TESTS` holds `tests/balance/*.test.mjs`) and held by `node-test-selection` (exit 0). |
| D-266 (output of the compilation) | Yes. Every import of the instrument is `../dist/browser/...`; `npm run balance` builds first. |
| D-351 / `cross-part-imports` | Yes. `npm test -- tests/invariants/test_cross_part_imports.py` exit 0. |
| D-362 / `tracked-file-private-paths`, `tracked-file-private-names` | Yes. `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` exit 0; grep of `balance/`, `tests/balance/` and the skill for notes, folders, absolute paths and the private repository finds nothing (the second invariant is a review: this is that comparison). |
| D-388, D-387, D-398 (numbers of the maps, the body, the first map) | Yes. The instrument copies none; the game's data are read, and an overlay changes them in memory for one command. The overlay `forest-pack.json` repeats resource numbers of Las - głębiej for a map of its own (and says so), and changes no map of the game. |
| D-61 (death and its cause), D-63 (lighting), D-136 (solving a map) | Yes, through the game's own functions (`newMapRun`, `stepMinute`, `mapRunEnded`, `takeTrip`); `instrument-game-agreement` compares end minute, outcome, cause and practice. The branch of D-63 („Czysty płomień”) is not among the agreement cases (the practice case buys the rank of the patrol); the instrument runs any ranks `--ranks` gives through the same functions, so nothing in the code departs from D-63. The solved maps that open a map are read from the map's data (`prerequisitesOf`). |
| D-239, D-240, D-249 (the earning loop) | Yes. `balance/loop.mjs` runs the game's `startLoop` and `catchUp` on a solved map (the maps that open it are marked solved first), one loop minute per real minute through `BALANCE.loopMinuteRealSeconds`; it counts the discoveries of nothing. |
| D-397, `first-map-balance`, `new-account-first-pass` | Yes. The three tests that read the programs from `reference-programs.mjs` (`first-map-balance`, `new-account-first-pass`, `acceptance`) keep their preconditions (6 and 12 rules; 21 rules in 5 groups with an empty take list) and the numbers of the invariants; the sentences name "a decent program of twelve rules" and "a program of 21 rules in 5 groups that its test names", which the test still names. |
| `map-run-repeatability` | Yes. Same seed, same run: the instrument adds none that is not a function of the seed; `agreement.test.mjs` and the repeat run in `overlay.test.mjs` (`assert.deepEqual(again, baseline)`). |
| `node-test-selection` | Its *Part* lacked the part: corrected (above). |

## Own-work check

Requirement most likely unmet: that no entry of the foundation still names a state the code left, or lists parts one by one while binding the instrument. Check: the scripts over every *Scope* and *Part* of `foundations/decisions.md` and `foundations/invariants.md` (list above); `python -B .the-way/elements/common/foundation_check.py` `0 errors` (with citations, after both commits); and the focused tests.

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |
| `npm test -- tests/invariants/test_cross_part_imports.py` | 0 |
| `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` | 0 |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 (`OK (expected failures=1)`) |
| `npm test -- tests/balance/check-map.test.mjs` | 0 (7 tests) |
| `npm test -- tests/balance/cli.test.mjs` | 0 (20 tests) |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` and `eslint --max-warnings 0` on the two test files | 0 and 0 |

Not run: the full gate, `check_instructions.py` (no instruction file changed), mutation analysis. No check failed and then passed.

## Findings (not mine to fix)

1. **The level of some tests of the instrument.** `guidelines/testing.md` (the unit test's *Files* line, `:363`) lists `tests/balance/` among the directories of unit tests, "poziomu nie wyznacza katalog". By D-81 and the glossary a unit test uses no "files holding test data", and an integration test uses "real files". `tests/balance/overlay.test.mjs` (lines 79, 139), `tests/balance/check-map.test.mjs` (the test of the overlay `wasteland.json`, and the check refusing no overlay) and `tests/balance/cli.test.mjs` (the commands given `overlayFile(...)`) read the shipped overlay files from disk through `readOverlay`; `campaign.test.mjs` imports the player files as JSON. Whether those are "files of test data" is a question of the word: they are the instrument's own files, used as inputs. If they are, the guideline should name those test files as integration tests, as it does for the two of `tests/view/`, or the tests should take the overlay from a literal. I changed neither: the sentence of the guideline is not plainly false, and the test files are not mine.
2. **D-427's *Rejected*** names "the other changes that write programs into the same tests" and "three changes", which describe the state of the work when the entry was written and read oddly after the merge. A reader after the merge finds no such changes. Left: it is the way the row's source keeps (the template takes it as it stands), and a rewrite would be the writer's guess.

No mismatch of the code with a rule was found: nothing to return to the cycle as a code finding.

## Guidelines (item 5)

`guidelines/coding.md` (*Applies to* and the paragraph on the six parts of D-29, "sześciu części") and `guidelines/testing.md` (*Applies to*, the table row for `balance-tools`, the unit test's *Purpose* and *Files*, the list of paths of the gate) match the code, apart from finding 1 above. Read: the diff of both files against `6a7b0acb`, the line quoted above, and the rest of `testing.md` by grep for `balance`; not the whole file again.

## Reaches beyond the handoff

- The commit `64f37f21` edits two test files (comments only, `decision:` lines). The handoff says items 1 and 2 stand and the code and the tests are not changed; I read that as protecting the correction, and `return_step.md` and the decisions skill name the tests by the clause `tests:` only "once their lines `decision:` stand", and the foundation check reports a decision with that clause and no line as held by nothing. The commit is separate so the cycle can drop it: dropping it needs the clauses `tests:` of D-428 and D-429 back to a pair.
- D-30, D-31, D-49, D-74-D-79, D-87-D-89, D-268, D-356, D-393, D-400, D-410, D-412, D-413, D-94, D-04, D-07, D-33, D-12, D-255, D-06 (binding sentences and *Scope*, to judge whether they bind the instrument); D-252, D-253 and D-28, D-73, D-77, D-81 (whole).

## Unread material

- Read whole (heading to the next heading): D-18, D-22, D-82, D-83, D-266, D-351, D-362, D-388, D-61, D-63, D-136, D-387, D-239, D-240, D-249, D-397, D-398, D-425, D-427, D-428, D-429, D-378, D-28, D-73, D-77, D-78, D-81, D-84, D-85, D-252, D-253, D-255, D-412, D-94; the invariants `map-run-repeatability`, `cross-part-imports`, `tracked-file-private-paths`, `tracked-file-private-names`, `first-map-balance`, `new-account-first-pass`, `node-test-selection`, `function-and-file-size`, `eslint-source-rules`, `prettier-source-format`, `instrument-game-agreement`; the glossary entries `overlay`, `unit test`, `integration test`; the part map whole.
- Part-read: the decisions named under "Reaches" read by their binding sentences and *Scope* only (D-06, D-30, D-31, D-49, D-74, D-75, D-76, D-79, D-87, D-88, D-89, D-268, D-356, D-393, D-400, D-410, D-413, D-04, D-07, D-33, D-12); `guidelines/testing.md` and `guidelines/coding.md`: the diff and the lines that name the instrument; `tests/balance/` (all files by grep; `check-map.test.mjs` whole, `agreement.test.mjs` whole, `overlay.test.mjs` lines 1-110, `cli.test.mjs` lines 315-372 and 485-531); `balance/check-map.mjs` and `balance/loop.mjs` whole, the other files of `balance/` by grep of imports, writes, randomness and constants; `tests/sim/reference-programs.mjs` by grep only.
- The reports of the cycle (`foundation-entries-report.md`, `correction-1-report.md`, `fix-whole-report.md` by grep for D-428 and the label, `review-whole-report.md` by grep) and the plan: not read whole. `task-frozen.md`: grep for exclusions only.

## Searches not found or unclear

- Whether the lists of parts in D-30 and D-31 are meant as "every code part" or "the parts that hold such files": the entries do not say (D-31 lists parts with no Bash). I judged on holdings (see item 3) and name the cost.
- Whether the overlay files and the player files count as "files of test data" for D-81: the glossary does not say (finding 1).
- No source for the choice of the label other than the review's finding and the fix report of this cycle; the entry stands as `the cycle's` without a row.

## Working copies

`.runs/return-step/` of the worktree held my scripts, the decision extracts and the test logs. Removed before the return (`ls .runs` shows no such directory). No worktree, clone or screenshot made.

## Lines of the record's *Return step*

- Foundation compared with code: the entries the change wrote or changed (D-427, D-428, D-429, D-378, D-29, D-32, D-425, `instrument-game-agreement`, `eslint-source-rules`, `prettier-source-format`, `function-and-file-size`, `overlay`, `balance-tools`), the rules the whole-change review read in part (D-18, D-22, D-82, D-83, D-266, D-351, D-362, D-388, D-61, D-63, D-136, D-387, D-239, D-240, D-249, D-397, D-398; seven invariants), the decisions that list parts one by one and the part map of the touched parts; what no longer matched: D-428 (the label, its tests), D-429 and D-425 (tests and a pair), the *Scope* of thirteen decisions and the *Part* of `node-test-selection` without `balance-tools`, and the part map's `Depends on` of `build-tools` and `agent-workflow`; each corrected; two findings of the tests' level and of D-427's *Rejected* reported, not corrected.
- Decisions written or changed: D-428, D-429, D-425 (the cycle's); *Scope* of D-28, D-73, D-77, D-78, D-81, D-82, D-83, D-84, D-85, D-252, D-253, D-351, D-362 (the cycle's)
- Invariants written or changed: `node-test-selection` (the cycle's; set by D-83, which binds `tests/` of every part)
- Environment facts: none
- Glossary terms: none (the `overlay` entry of row 4 stands and matches the code)
- Part-map changes: `build-tools`, `agent-workflow`
- Projected entries written whole or in part: none
- Rows of *Settlements to record* written: none by this step (rows 1-5 were written by the foundation step and compared here)
