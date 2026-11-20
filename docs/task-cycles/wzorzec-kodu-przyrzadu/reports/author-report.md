# Author report — `wzorzec-kodu-przyrzadu`, the whole change as the one author

**Status:** `done with concerns` (the concerns are named under "Problems as observed" and "Choices"; none blocks).

Branch `task/wzorzec-kodu-przyrzadu`, base `4ee41c5f1d54172f646172da9b3f248dcaf5755e`. Nothing pushed, merged or opened.

## Commits (private email `mariusznn@gmail.com` checked with `git log --format='%h %ae'`)

| Commit | What |
|---|---|
| `59081e9f` | `refactor: :recycle:` the four repeats removed from `balance/` (To do 7) |
| `4b0d615f` | `test: :white_check_mark:` the two new tests of rows 4 and 5 and their shared reader |
| `ce67fbd7` | `docs: :card_file_box:` D-437, D-429's *Verification*, two invariants, the part-map lines, the guidelines file and its row in `guidelines/coding.md` |

Files changed against the base, added/removed lines (`git diff 4ee41c5f --stat`): `balance/campaign.mjs` +17/-22, `balance/engine.mjs` +16/-2, `balance/loop.mjs` +8/-11, `balance/trace.mjs` +9/-5, `foundations/decisions.md` +16/-1, `foundations/invariants.md` +20, `foundations/part_map.md` +3, `guidelines/coding-balance-instrument.md` +171 (new), `guidelines/coding.md` +1, `tests/invariants/balance_source_scan.py` +188 (new), `tests/invariants/test_balance_instrument_file_writes.py` +170 (new), `tests/invariants/test_balance_instrument_repeatability.py` +160 (new). Total 779 insertions, 41 deletions.

## Checks (command, exit code), all in the worktree root

| Check | Command | Exit |
|---|---|---|
| Foundation | `python -B .the-way/elements/common/foundation_check.py` (whole, no `--skip-test-citations`) | 0 (`0 errors`) |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 (`0 error, 144 warn, 7 info`; none of the 144 warnings names a file of this change) |
| ESLint | `npx eslint --max-warnings 0 balance tests/balance` | 0 |
| Prettier | `npx prettier --no-config --no-editorconfig --check balance/*.mjs tests/balance/*.mjs` | 0 |
| Ruff (format, lint) on the three new Python files | `.runs/quality-venv/Scripts/ruff.exe format --config ruff.toml --check <3 files>`, `ruff check --config ruff.toml --ignore-noqa <3 files>` | 0, 0 |
| Tests of the part | `node --test tests/balance/*.test.mjs` | 0 (64 pass, 0 fail) |
| New test, writes | `npm test -- tests/invariants/test_balance_instrument_file_writes.py` | 0 (3 tests OK) |
| New test, repeatability | `npm test -- tests/invariants/test_balance_instrument_repeatability.py` | 0 (2 tests OK) |
| Quality checks (ESLint, Prettier, Ruff, ShellCheck, shfmt of the whole repository) | `npm test -- tests/quality/test_quality_invariants.py` | 0 (8 OK), run before and after the commits |
| Size of function and file | `npm test -- tests/quality/test_function_and_file_size.py` | 0 |
| Imports within the part map | `npm test -- tests/invariants/test_cross_part_imports.py` | 0 (10 OK) |

Not run: the full `npm test` (the cycle's run, not mine).

### Each new invariant's test seen failing once

Method: a temporary edit of `balance/trace.mjs` (a copy kept in `.runs/author/`, restored byte for byte, `git status` clean after): appended `import { appendFileSync } from "node:fs"; appendFileSync("balance-result.txt", "x"); export const stamp = Date.now() + Math.random();`.

| Invariant | Failing run (with the edit) | Passing run (edit reverted, at head) |
|---|---|---|
| `balance-instrument-file-writes` | `npm test -- tests/invariants/test_balance_instrument_file_writes.py` exit 1, `FAIL: test_no_file_of_the_instrument_but_the_command_line_writes`, `['balance/trace.mjs names appendFileSync', ...] != []`; the two control tests passed | same command, exit 0 |
| `balance-instrument-repeatability` | `npm test -- tests/invariants/test_balance_instrument_repeatability.py` exit 1, `FAIL: test_no_file_of_the_instrument_reads_the_clock_or_draws_apart_from_the_seed`, `['balance/trace.mjs names Math.random', 'balance/trace.mjs reads the system clock by Date.now'] != []`; the control test passed | same command, exit 0 |

The first run of each, before the edit, also passed (code already had the behaviour), which is why the break was made.

## Equality of the measurements before and after (To do 7, acceptance criteria)

The game built once (`npm run build`, from the base commit's sources; `dist/` is the same for both runs because the change touches no file the build reads). `node balance/cli.mjs <command>` run directly, so no rebuild between the two runs. Run once on the base code (before the edit of `balance/`, head `4ee41c5f`) into `.runs/author/before/`, once on head `59081e9f`'s `balance/` into `.runs/author/after/`, with the script `.runs/author/measure.sh`. Compared with `cmp` standard output and standard error of each, and the list of commands with exit codes. Result: all 12 outputs, all 12 error outputs, and the exit codes (all 0) are byte for byte identical. Nothing of the outputs entered the repository (D-429).

| # | Command and flags | What it exercises |
|---|---|---|
| 1 | `sweep --map forest --program forestNaive --seeds 1-30` | default cap (header `cap: null`, `capped: 0`) |
| 2 | `sweep --map forest --program forestDecent --seeds 1-30 --cap 30` | `capped: 30` |
| 3 | `sweep --map forestEdge --program emptyProgram --seeds 1-20 --cap 30` | `capped: 20` |
| 4 | `trace --map forest --program forestNaive --seeds 3` | default cap, ends `death ... cause hunger` |
| 5 | `trace --map forest --program forestNaive --seeds 3 --cap 30` | ends `end: cap at minute 30` |
| 6 | `trace --map forestEdge --program forestDecent --seeds 1` | ends `solved at minute 850` |
| 7 | `loop --map forest --program forestDecent --seeds 1-5 --hours 8,24` | `meanNumber`, `MS_PER_MINUTE` in `loop.mjs` |
| 8 | `loop --map forest --program forestNaive --seeds 1-3 --hours 8,24 --no-resurrection` | `MS_PER_MINUTE` in the `resurrectionReadyAtMs` branch |
| 9 | `campaign --player edge-daily-decent --seeds 1-2` | `meanNumber`, `MS_PER_MINUTE`, `MS_PER_DAY` in `campaign.mjs` |
| 10 | `campaign --player .runs/author/player-cap.json --seeds 1-2` | the `cap` branch of `manualRun`: a copy of `edge-daily-decent` with `days: 1`, `capMinutes: 30`, outside the tracked files |
| 11 | `check-map --overlay balance/overlays/forest-pack.json --maps forestPack --programs forestDecent,emptyProgram` | `check-map` through `sweep` and `loopBalance` (a narrowed run, about 6 seconds, not the full 55 seconds) |
| 12 | `programs` | unchanged path, included for completeness |

Seeds are the ones in the flags; the player description of 10 is a copy of `balance/players/edge-daily-decent.json` with `name: "cap-test"`, `days: 1`, `capMinutes: 30`.

Unchecked: (a) in `campaign` the outcome `cap` against `death` is never printed (only `result.outcome === "solved"` is read), so no output could differ for the changed expression there; command 10 shows that the branch with a small `capMinutes` runs and gives the same output, but not that its outcome was `cap` and not `death` for a given run. The expression is now the one function of `engine.mjs`, read in a line `outcomeOf(run)`, which the sweeps and traces 2, 3 and 5 do show gives `cap`. (b) `check-map` over the full 500 seeds and all programs (the narrowed run covers the same code paths). (c) `--out` writing: no changed line touches it.

That the default cap is still 4000: `grep -n 4000 balance/*.mjs` finds one line, `balance/engine.mjs:31`, `export const DEFAULT_CAP_MINUTES = 4000;`.

## The own-work check (section 3)

The requirement my work most likely does not meet: "Przejście zakończone na pułapie (wynik `cap`) daje przed zmianą i po niej to samo wyjście", on the `campaign` side, where the `cap` branch has no printed difference. The check: command 10 above (small `capMinutes`, a copy outside the repository), compared byte for byte; it showed identical output. The weakest point is the one named under "Unchecked (a)": the check shows no crash or output drift, and cannot show the value of `outcome` in a branch whose value nothing prints.

A second weak point I tested: the new scans' blind spots against the sentences. The control tests flag 16 forms of a writing function (named import, `fs.`, `fsPromises.`, `fs?.`, computed key as string and template, `fs/promises`, copy, rename, truncate, `cpSync`, and others) and 25 forms of a clock or random source, and do not flag the same names in comments, strings, template text, regular expressions, `process.stdout.write`, `readFileSync`, or `new Date(0)`; each blind spot the scans keep is named in each test's docstring and in the guidelines rule.

Mutations in my head: a wrong `outcomeOf` order (death before completion) is caught by the existing `tests/balance/agreement.test.mjs`, which computes the expression independently; a `meanNumber` that returned `0` for an empty list is caught by the byte comparison of the outputs only where an empty list occurs, which I did not check that any of the 12 commands reaches (unprotected as far as I verified); a missing `export` of one of the four things fails at import, so every test of `tests/balance/` and the CLI would stop.

## Foundation entries written

Each entry: one sentence of its meaning in English, one in Polish, its mark.

1. **D-437 "Which file is the exemplar for the code of the balance instrument?"** in section "Code rules, exemplars and static checks" after D-434. Marked **the cycle's** (its meaning is row 1's; it is marked so because I added a pair of examples to *Verification*, which the row does not give and no test holds). EN: "The exemplar for kind `balance-instrument`, the files of code of the balance instrument in `balance/` without the JSON files of overlays and player descriptions, is `balance/engine.mjs`." PL: "Wzorcem rodzaju `balance-instrument`, czyli plików kodu przyrządu balansu w `balance/` bez plików JSON nakładek i opisów graczy, jest `balance/engine.mjs`." The pair, word for word, for the description to quote under the entry:
   - `complies: balance-instrument guidelines designate the selected exemplar, list each file of code of the instrument in the table of the kind and leave the overlay files and the player descriptions out of it`
   - `violates: a second exemplar for the kind; a row for an overlay file or a player description in the table of the kind`
   *Rejected* is from the sources of rows 1 and 5 (the small map check as exemplar; the JSON files in the table; two kinds); *Based on* none; *Relations* derives from D-28; *Scope* balance-tools.
2. **`balance-instrument-file-writes`** in `foundations/invariants.md` after `instrument-game-agreement`. Mark **row 4**. EN: "No file of code in `balance/` other than `balance/cli.mjs` writes a file or creates a directory." PL: "Żaden plik kodu w `balance/` poza `balance/cli.mjs` nie zapisuje pliku ani nie zakłada katalogu." *Derives from* D-429; *Part* balance-tools; *Method* test.
3. **`balance-instrument-repeatability`**, next to it. Mark **row 5**. EN: "No file of code in `balance/` reads the system clock or draws a random number from any source other than the seed of its measurement." PL: "Żaden plik kodu w `balance/` nie czyta zegara systemowego ani nie losuje ze źródła innego niż ziarno pomiaru." *Derives from* `recovered from code — balance/engine.mjs, …` as the template's "Links" gives for an entry a human chose from what the product did; *Part* balance-tools; *Method* test.
4. **D-429's *Verification*** gains `invariants: balance-instrument-file-writes.` in front of `tests:` and `no invariant and` in the closing clause; its binding sentences, *Rationale*, *Rejected* and the pair of examples unchanged. Mark **row 4**. EN: "The *Verification* of D-429 names the invariant that no file of the instrument but its command line writes a file." PL: "Pole *Verification* decyzji D-429 wymienia niezmiennik, że żaden plik przyrządu poza jego wierszem poleceń nie zapisuje pliku."
5. **Part map, `balance-tools` *Files*:** added `tests/invariants/test_balance_instrument_file_writes.py` and `tests/invariants/test_balance_instrument_repeatability.py` (marks **rows 4 and 5**; they are the two test files To do 6 names) and `tests/invariants/balance_source_scan.py` (mark **the cycle's**: the helper the two tests share is no file the task names; the same line would have been needed for any test of the part). EN: "The three new Python files that check the code of `balance/` belong to the part `balance-tools`." PL: "Trzy nowe pliki Pythona, które czytają kod `balance/`, należą do części `balance-tools`." The part's binding sentence is unchanged (the tests belong to the part they test; its sentence already holds "the tests that keep its instrument in agreement with the game").

Rows 2 and 3 went to the guidelines file only (*Decision* `none`, *Invariant* `none`), as the task says: rules "Liczba gry" and "Jedno miejsce wspólnej rzeczy" in `guidelines/coding-balance-instrument.md`, each with its reason in one sentence. The guidelines file also holds rules 1-3 of To do 2 (D-427 with `instrument-game-agreement`; D-351 with `cross-part-imports`; D-427, `none`), rule "Zapis plików" (D-429, `balance-instrument-file-writes`) and rule "Zegar i losowość" (*Decision* `none`, `balance-instrument-repeatability`, with its reason in one sentence). The rule of imports names `tests/sim/reference-programs.mjs` as the one file of the simulation's tests the instrument imports; that is the state of today's `balance/cli.mjs` stated as the allowed case, not a list.

## Choices I made (what, the way rejected, cost if wrong)

1. **Where each of the four shared things stands now** (the importing files' own imports decide):
   - `DEFAULT_CAP_MINUTES` and the result expression, now `outcomeOf(run)`, and the mean, now `meanNumber`, stand in **`balance/engine.mjs`**, exported: `trace.mjs`, `loop.mjs` and `campaign.mjs` all import `engine.mjs` already, and `engine.mjs` imports no other file of `balance/`, so no cycle can form. Rejected: `loop.mjs` for the mean (it holds it today) — `trace.mjs` would then import a file it does not; a new file of the instrument for the four (a ninth file for four lines, and a new import for every importer). Cost if wrong: `engine.mjs` grows by 14 lines and holds a mean beside `meanOf`, which sums by keys and rounds to the same two places; the two are not repeats, so the rule does not touch them.
   - `MS_PER_MINUTE` stands in **`balance/loop.mjs`**, exported: `campaign.mjs` already imports `LOOP_START_MS` from it, `loop.mjs` already holds the other units of time (`MS_PER_HOUR`, `MS_PER_LOOP_MINUTE`), and `loop.mjs` does not import `campaign.mjs`. Rejected: `engine.mjs` (the engine holds no real-time unit today and would take one only for the loop and the campaign). Cost if wrong: a later file that needs milliseconds in a minute and does not import `loop.mjs` meets the rule's question again; it would import it from there.
   - `campaign.mjs` keeps `MS_PER_SECOND` and `MS_PER_DAY`, now `24 * 60 * MS_PER_MINUTE` (same value, `86400000`), as they are not repeats.
   - `meanNumber` replaced `mean` and `meanNumber` by name in all eight places of `campaign.mjs`; rejected an import alias `meanNumber as mean` (a second name for one thing).
2. **The two tests are Python files in `tests/invariants/`**, not `.mjs` files in `tests/balance/`: the task's To do 6 speaks of a test file no part claims, added through `update-part-map`, and names the two Python tests as sources of patterns; a file in `tests/balance/` is claimed by `tests/balance/**` and needs no map line. Rejected: `.mjs` tests in `tests/balance/` (no map change, but the lexer of comments and strings would be a third written again in JavaScript). Cost if wrong: three lines of the map that a reviewer may want gone; moving the tests moves them out again.
3. **A shared reader, `tests/invariants/balance_source_scan.py`,** holds the lexer (a copy of the cut of comments, strings, templates and regular expressions that `test_simulation_isolation.py` holds) and the choice of files. Rejected: importing from `test_simulation_isolation.py` (it belongs to `simulation`, and `cross-part-imports` would fail: only `test-helpers` may be imported from a test); moving the lexer into `loop2_invariant_support.py` and the two simulation tests with it (a change of three files outside the task). Cost: the lexer now stands in two copies (`test_simulation_isolation.py` and the helper; `test_simulation_randomness.py` holds a third, different one). I propose, as an item for later and not done here, one lexer in `test-helpers`.
4. **The scan of writes is by names,** `WRITING_NAMES`, matched in code outside comments and strings, plus a string literal equal to one of them (computed key). Names like `link`, `cp`, `rename`, `mkdir` also catch a variable of that name (stricter than the sentence, as the isolation test is stricter). Cost if wrong: a false positive for a local named `link`; fixed by a rename in the file.
5. **The scan of repeatability flags the generator constant `0x6D2B79F5`** (as the randomness test of the simulation does) and the module names `crypto`, `perf_hooks` and `hrtime`. The sentence says "random source other than the seed": a copy of the generator step in the instrument would be one. Cost if wrong: none seen (no file holds them).
6. **`guidelines/coding.md`'s "Odłożone rodzaje kodu" example left as it is** (it names the saved-game and mail kinds in the table of kinds; it does not need the new kind); rejected: add a sentence for the new kind there (more than To do 5 asks).
7. **No move-out commit** (section 1 of the method): nothing I changed stands over the thresholds (`balance/campaign.mjs`, the longest, 615 lines against 800; no function over 200 lines), so the rule of size does not apply; `tests/quality/test_function_and_file_size.py` passes.

## Each reach beyond the handoff (what, where, why)

- Read `.the-way/elements/common/way_of_working.md` "Reading the foundation" and the side files the three element skills name (`decisions/skill/read.md`, `decide_entry.md`; `invariants/skill/decide_entry.md`, `draft.md`, `write.md`; `part-map/skill/decide_entry.md`, `write.md`), and `.the-way/elements/decisions/template.md`, `invariants/template.md`, `part-map/template.md`, whole: the skills send there (step 1-4); the handoff named only the three `SKILL.md`.
- Read `.the-way/product-guidelines/template.md` whole: `coding/template.md` builds on it for the form of rules and the language rule.
- Read `.the-way/instruction-files/check_instructions.py` docstring and its skipped directories: to know whether `dist/` and backticked paths in the new guidelines file raise a warning (they do not).
- Read `foundations/decisions.md` entries D-28 (whole), D-35 (whole), D-213 (whole) and the section headings, and `foundations/invariants.md` entries `instrument-game-agreement`, `cross-part-imports`, `simulation-randomness`, `simulation-isolation`, `function-and-file-size` (whole): D-213 and D-35 as models for D-437; the handoff named D-35 and D-162; I did not read D-162 whole.
- Read `tests/invariants/loop2_invariant_support.py` (first 75 lines) and the lexer and patterns of `tests/invariants/test_simulation_isolation.py` (lines 1-80, 205-500): to write the helper and the two tests by the patterns, as the task allows.
- Ran `npm ci` (39 seconds) and `npm run build` in the worktree, and `npm test -- tests/quality/test_quality_invariants.py` once, which made `.runs/quality-venv` (Ruff, ShellCheck and shfmt): to run ESLint, Prettier and Ruff on the changed files. These are the product's own tools' files under the ignored `.runs/`, `node_modules/` and `dist/`, left in place; they are no working copies of mine.
- Ran the two new test files and four other focused test files by `npm test -- <file>` (quality and import tests above).

## Unread material

- Not read: `tests/balance/*.test.mjs` (the handoff named them; I ran them and they pass, I did not read their code, so I did not check which of them cite D-429 by a line `decision:`; `foundation_check.py` reports 0 errors with D-429's binding sentences unchanged); `tests/sim/reference-programs.mjs` (only its path is used); `.the-way/product-guidelines/coding/recognize.md` (the template did not send me to it); glossary entries (I used the terms *overlay*, *map run*, *reference program* as the glossary and decisions give them; read the list of headings and the entry *overlay*, not each entry).
- Read in part: `balance/cli.mjs` (lines 1-75 and 440-529 of 529, not 76-439), `balance/check-map.mjs` (lines 1-60 of 141), `balance/describe.mjs` and `balance/overlay.mjs` (the first 12 and 30 lines): the files I did not change, read only for the examples and the table of files; `tests/invariants/test_simulation_randomness.py` (lines 1-260 and 480-611, not the driver in between); `tests/invariants/test_simulation_isolation.py` (as above); the decision index of D-18, D-22, D-425, D-351 and D-162 (binding sentences and *Scope* only, not whole entries); the part-map entries of `product-foundation` and `test-helpers` (read as printed, the full part map was not read whole); `guidelines/testing.md` read whole in three reads; `guidelines/coding.md` whole.
- Read whole: the handoff, the task, `make-change` `SKILL.md`, `foundation_step.md`, `coding/template.md`, `loop2-balance/SKILL.md`, `coding-simulation-module.md`, `coding-saved-game.md`, the three element `SKILL.md`, D-28, D-35, D-213, D-427, D-428, D-429, and `engine.mjs`, `trace.mjs`, `loop.mjs`, `campaign.mjs`.

## Searches not found or unclear

- The handoff's `decision_index.py --decision 28 … --sections` form does not run: the script wants `D-28`, and `--sections` takes no other switch (`Error: --sections takes no other switch`; `Error: foundations/decisions.md: no decision 28`). I ran `--sections` alone, then the index with `--section "Balance measurement" --section "Code rules, exemplars and static checks" --part balance-tools --part agent-workflow --decision D-28 …` (26 012 bytes), which gave the entries listed above.
- To do 6 reads "plik testu, który nie należy do żadnej części": unclear whether the task expects the test files outside `tests/balance/`; I took it as above (choice 2). A file under `tests/balance/` would have needed no map line.
- The decision template's rule that a decision with a pair of examples written by the author is `the cycle's` (`foundation_step.md`) means D-437 goes before the human as such; its meaning is row 1's, only the pair is mine. If the human prefers *Verification* `none`, the pair is two lines to drop.
- No file of the repository says how a test runs alone for a file in `tests/invariants/`; `npm test -- <file>` (from `guidelines/testing.md`, "Test files in the gate") does it, so I used that.

## Problems as observed

- The first attempt of a script of mine to edit the new test file failed on a pattern with a backslash-zero in a Python literal (the rule of `scripts.md` on backslashes), and wrote nothing; I made the edits with the edit tool. No effect on the result.
- The outputs of `campaign` for a player description are printed with `"seeds": "1-2"` etc. and no outcome per attempt; the limit this puts on the check is "Unchecked (a)" above.
- `check_instructions.py` reports 144 warnings on the repository at head; I did not compare the count with the base. None names a file of this change (checked by `grep balance-instrument`, and the new test files are not instruction files).

## Working copies

All under the ignored `.runs/author/` of the worktree `.runs/author/`: `before/` and `after/` (the 12 outputs, 12 error outputs and `commands.txt` of each run), `measure.sh`, `player-cap.json`, `trace.mjs.orig` (the original of the file edited for the failing runs), `fail_file_writes.txt` and `fail_repeatability.txt` (the failing runs), `sections.md`, `decisions-index.md`, `fc.txt`, `ci.txt`, `quality1.txt`. Removed by `rm -r` of that directory by its full path before I returned (see the last line of this report). No worktree or clone was made. What stays and is not a working copy of mine: `node_modules/`, `dist/`, `.runs/quality-venv/` of the product's own tools, all ignored by git, and this report.
