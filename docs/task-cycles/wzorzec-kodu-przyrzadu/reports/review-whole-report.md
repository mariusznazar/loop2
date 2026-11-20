FAIL ce67fbd73236185ce90b55c15d4f0aef86414aba

# Review of the whole change — `wzorzec-kodu-przyrzadu`

Range: base `4ee41c5f1d54172f646172da9b3f248dcaf5755e` to head `ce67fbd7` (`git rev-parse HEAD` = `ce67fbd73236185ce90b55c15d4f0aef86414aba`, the head given). Three commits: `59081e9f` (code), `4b0d615f` (tests), `ce67fbd7` (foundation and guidelines). No plan, so no slice; every finding comes from the one author's change. `.the-way` at `19e5774a`, equal to the gitlink.

Counts: 2 blocking (Important), 5 Minor (all within the task), 0 out of scope.

## Findings

### Important 1 — the rule "Przejście mapy jak w grze" binds every mode to the engine's way of stepping a map run, which two `copy` files do not follow

- **Place:** `guidelines/coding-balance-instrument.md:32` (*Good*), `:35-38` (the rule's text); against `balance/campaign.mjs:226-236` and `balance/loop.mjs:118`, `:195`, both listed as `copy` at `guidelines/coding-balance-instrument.md:18` and `:22`.
- **What is wrong:** To do 2 asks for the rule "przejście mapy z jednego ziarna kończy się w przyrządzie tak samo jak w grze, bo przyrząd uruchamia zbudowaną symulację i kroczy przejście jej własnymi funkcjami". The file writes a narrower rule: "kroczy przejście mapy jej własnymi funkcjami, `newMapRun` i `stepMinute`", *Good* "Tryb pomiaru bierze przejście mapy z silnika albo startuje je przez `startOf` i kroczy `stepMinute` zbudowanej gry", and "Własnej pętli kroków potrzebuje tylko tryb, który musi widzieć zdarzenia każdej minuty; startuje wtedy przejście tak jak silnik." The campaign mode starts its manual map run with the game's `send` and steps it in its own loop by `advanceMinutes(current, MANUAL_STEP_MINUTES)` (600 minutes per call), sees no event of each minute and does not start the run as the engine does; the loop mode passes map runs through the game's `catchUp`. Both use the game's own functions, so both meet the task's rule, but both break the rule as written, and the same file marks them `copy`, a model to follow.
- **Why it matters:** the rule binds (it is under `## Rules`), and the task says tasks 5 and 24 change files of the instrument. An agent who follows the rule either rewrites the campaign's manual run onto `startOf`/`stepMinute`, which leaves the path the browser takes for a manual run (`send`, `advanceMinutes`, `settleDeath`, `settleCompletion`), or writes a new mode that follows the campaign's `copy` and gets flagged by the rule. The guidelines contradict themselves either way. D-437, which this change writes, says the engine's traits illustrate the rules of the kind "without requiring every mode of the instrument to take the shape of the engine"; this rule requires it.
- **Evidence:** `balance/campaign.mjs:2` ("through the game's own functions (`send`, `advanceMinutes`, …)"), `:228-236`; `balance/loop.mjs:1` ("the game's own `startLoop` and `catchUp`"); the rule's lines quoted above.
- **Fix in words:** state the rule as To do 2 gives it — a map run passes through the built game's own functions and ends by them, never by rules of the mode's own — with `newMapRun`/`stepMinute`, `send`/`advanceMinutes` and `catchUp` at most as examples, and drop the sentence that allows an own loop of steps only to a per-minute mode.

Contradiction: yes — D-437 ("these illustrate the rules of the kind, without requiring every mode of the instrument to take the shape of the engine"), written by this change.

### Important 2 — the clock-and-randomness scan misses plain static forms that its docstring and the rule say it catches; the rule leaves the reviewer only two cases

- **Place:** `tests/invariants/test_balance_instrument_repeatability.py:24-26` ("Does NOT cover"), `guidelines/coding-balance-instrument.md:116-118` ("Test nie łapie generatora napisanego od zera ani zegara sięgniętego nazwą złożoną dopiero w trakcie działania; ten przypadek pilnuje recenzent").
- **What is wrong:** I ran `findings()` of the test on made-up sources (method and output under the checks below). Not flagged, though each reads the clock or draws a number outside the seed and none is a name built at run time:
  - `const { random } = Math; export const u = random();`
  - `const { now } = Date; export const t = now();`
  - `export const t = process.uptime();`
  - `import os from 'node:os'; export const t = os.uptime();`
  - `export const t = performance.timeOrigin;`
  - `export const t = new Intl.DateTimeFormat().format();` (formats the current moment)
  - `export const t = new Date(undefined);` (the current moment)
  The scan takes the static patterns of `test_simulation_randomness.py` and `test_simulation_isolation.py`, as the answer to question 6 gives, but those two checks have a second half the new one lacks: a run of the built simulation with `Math.random`, `crypto` and `Date` replaced by functions that throw (`test_simulation_randomness.py:18-31`, `test_simulation_isolation.py:29-39`). That run closes the destructuring forms for the game; here nothing does. The answer to question 6 and the rule say the test misses only a generator written from scratch and a clock reached by a name built at run time, and the rule leaves "ten przypadek" to the reviewer, so a reviewer who trusts it does not look for the forms above.
- **Why it matters:** the rule is binding text that states what the gate already catches; a later mode written with `const { random } = Math` passes the gate, and the reviewer has been told the gate covers `Math.random`. The measurement then stops repeating with the same flags and seeds, which is exactly what row 5 is to prevent, with no signal.
- **Fix in words:** either add patterns for these forms (a destructuring from `Math`, `Date` or `performance`; `uptime`; `timeOrigin`; `new Date(` with `undefined`; an `Intl` date format with no date) with cases in the control test, or name them in the docstring's "Does NOT cover" and in the rule's sentence on what the reviewer keeps. The scan of writes names its blind spots (`open`/`openSync` with a flag, `child_process`, names built at run time) and my probes found none it does not name: `openSync` + `writeSync` and `fs/promises` `open` + `write` fall under the named `open` case.

Contradiction: no

### Minor 1 — the rule "Importy przyrządu" lists today's imports, narrower than the invariant that checks it (within the task)

`guidelines/coding-balance-instrument.md:47-49`: "Plik przyrządu importuje tylko pliki przyrządu i pliki symulacji: zbudowaną symulację i programy wzorcowe z `tests/sim/reference-programs.mjs`." After the colon the sentence reads as the full list of what may be imported, while `cross-part-imports`, which the rule names as its check, allows any file of the part `simulation`. The template's "A rule lists no state and repeats no decision or value" (`.the-way/product-guidelines/template.md:90-97`) is against such a list, and the task's rule is "nie importuje pliku żadnej części poza symulacją i samym przyrządem". The author says it states today's `cli.mjs` as the allowed case. No harm I can name today; the list goes stale with the first other import of a file of the simulation.

### Minor 2 — a binding sentence of the cycle's own in the rule of row 3, not named as such (within the task)

`guidelines/coding-balance-instrument.md:88-89`: "Rzecz stoi w pliku, który importują wszystkie pliki jej potrzebujące, żeby nie powstał cykl importów." Row 3 and To do 3 give the rule and its reach, not where the thing stands; the sentence is the author's. A rule that only says how to write code may be the cycle's own, but then the request names it among what the human did not see (`.the-way/product-guidelines/template.md:121-125`), and the author's report does not name it. As written it is also circular — a file that needs the thing imports its file by definition; what is meant reads as "in a file the files that need it already import".

### Minor 3 — the rule "Zapis plików" drops the two tests from the answer to question 4 (within the task)

`guidelines/coding-balance-instrument.md:102-104` leaves the command written into `balance/cli.mjs` that writes to a fixed path to "recenzent każdej zmiany tego pliku". The answer to question 4 leaves it to "dwóm dzisiejszym testom i recenzentowi", and the test's docstring (`tests/invariants/test_balance_instrument_file_writes.py:26-28`) names `tests/balance/cli.test.mjs`, whose lines `decision: D-429` stand at `:324` and `:507`. A small departure from the source; it understates the cover, so no one is misled into less care.

### Minor 4 — the sentence of the part `balance-tools` no longer says all the tests the part holds (within the task)

`foundations/part_map.md:129`: the part "holds … the tests that keep its instrument in agreement with the game". The change adds to its *Files* (`:133-135`) two tests that keep the instrument from writing files and from reading the clock, which are no tests of agreement. The author judged the sentence still holds. It is a description that stopped being whole, not a wrong assignment; the files are claimed correctly.

### Minor 5 — a second copy of the lexer of comments and strings (within the task)

`tests/invariants/balance_source_scan.py:59-164` copies the cut of `tests/invariants/test_simulation_isolation.py`; `test_simulation_randomness.py` holds a third, different one. A fix to one lexer (a regular-expression case it misreads, say) does not reach the others. The author named it and proposed one lexer in `test-helpers` as later work; importing from the simulation's test file would break `cross-part-imports`, so the copy is the cheap way inside this task.

## Points the handoff asked me to test

- **(a) the `cap` outcome in `campaign`:** the expression moved byte for byte into `outcomeOf` (`balance/engine.mjs:34-36`), and `manualRun` calls it at the same place (`balance/campaign.mjs:240`), before the settlements. The value is the same by construction; my own comparison (below) also ran a campaign with `capMinutes: 30` at base and at head with identical output. Not a finding.
- **(b) `meanNumber` on an empty list:** the body in `balance/engine.mjs:297-303` is the same text as the removed `mean` of `campaign.mjs` and `meanNumber` of `loop.mjs` (both visible in the diff), `null` for an empty list included, so whether a command reaches that branch does not matter. Not a finding.
- **(c) blind spots of the two new tests:** Important 2 for repeatability; the scan of writes names its blind spots truly as far as my probes reach.
- **(d) the file of each shared thing:** `engine.mjs` imports no file of `balance/`, `loop.mjs` imports `engine.mjs`, `campaign.mjs` imports both, `trace.mjs` imports `engine.mjs`: no cycle, and every file that needs a thing already imported its holder. Sound. `MS_PER_DAY` is now `24 * 60 * MS_PER_MINUTE`, the same 86 400 000. Not a finding.
- **(e) D-437 marked `the cycle's`:** the pair of examples follows the form of D-35 and D-162 and says what the binding sentences say; the binding sentences name `balance-instrument` and `balance/engine.mjs` in backticks, as the coding template requires. The mark is right; the request has to show the pair to the human.
- **Carried unread:** `tests/balance/cli.test.mjs:324` and `:507` hold D-429's second sentence by `decision:` lines; the change keeps D-429's binding sentences, so they still match (foundation check 0 errors). The decisions template says a sentence so held gets no invariant derived from the decision (WAY-22); `balance-instrument-file-writes` states another rule — which file writes — than the held sentence, and the task settles it as deriving from D-429, so I do not count it as a finding. The examples of `UsageError` and of `main` writing the files (`guidelines/coding-balance-instrument.md:147-150`) hold against `balance/cli.mjs:31-32`, `:289-290`, `:393-399`, `:483`, `:500-503`. D-162 by index only does not bear on the change.

## Against the task, item by item

- To do 1: the file has the template's form of a kind; *Applies to* `balance-tools`; *When to read* as asked; eight rows, the seven others `copy`, the exemplar with D-437; `## Where in code` names `balance/` and, as other kind files of loop2 do, the exemplar and the tests. Met.
- To do 2: three rules present; the first is Important 1, the second Minor 1.
- To do 3: four rules with their fields as asked; row 3's rule carries Minor 2, row 4's Minor 3, row 5's Important 2.
- To do 4: the five examples present and true to the code (checked `balance/engine.mjs:57`, `:62`, `:114`, the head comments of the eight files, `balance/cli.mjs` as above).
- To do 5: row added to `guidelines/coding.md:27`. Met.
- To do 6: two tests, each seen failing per the author's report (not repeated by me); the three files added to `balance-tools`; D-429's *Verification* names the invariant, binding sentences unchanged. Met.
- To do 7: one `4000` in `balance/` (`balance/engine.mjs:31`); the outcome expression only in `outcomeOf`; one mean; one `MS_PER_MINUTE`. Met.
- Acceptance criteria: the author's 12 commands; my own 6 below. Met, with the request still to give the commands and the result.
- Rows 1-5: row 1 → D-437, faithful; row 2 → rule "Liczba gry", faithful; row 3 → rule "Jedno miejsce wspólnej rzeczy", faithful but for Minor 2; row 4 → invariant `balance-instrument-file-writes`, faithful; row 5 → invariant `balance-instrument-repeatability`, faithful, its *Derives from* in the form the invariants template gives for a recovered rule.
- Reserved choice: none (no new language, library, store or place to run).
- Structure: `balance/engine.mjs` 357 → 371 lines, `balance/campaign.mjs` 615 → 610, `balance/loop.mjs` 258 → 255, `balance/trace.mjs` 125 → 129; the size test passes on base and on head, so nothing crossed a threshold; no code is left without a user and no name stopped being true.

## Declined to judge

- Whether 4000 is a measurement parameter or a number of the game: the task leaves it to task 2.
- The similar fragments (percent with one place, rounding to two places): out of scope by the task.
- The own copies of 4000 and of the outcome expression in `tests/balance/agreement.test.mjs`: out of scope by the task.
- That the campaign prints no outcome per attempt: behaviour of the campaign the task does not touch.

## Checks run

| Check | Command | Exit / result |
|---|---|---|
| Head and pin | `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | `ce67fbd7…`; `19e5774a` both |
| Diff and log | `git diff 4ee41c5f…..ce67fbd7`; `git log 4ee41c5f…..ce67fbd7` | read whole |
| Whitespace | `git diff --check 4ee41c5f…..ce67fbd7` | 0 |
| Sizes | `python -B .the-way/task-cycle/change_file_sizes.py 4ee41c5f… ce67fbd7` | 0 |
| Size rule, base | `python -B -m unittest tests/quality/test_function_and_file_size.py` in a worktree of the base | 0 (2 OK) |
| Size rule, head | same, in the reviewed worktree | 0 (2 OK) |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 (`0 error, 144 warn, 7 info`; no line names a file of the change) |
| New test, writes | `npm test -- tests/invariants/test_balance_instrument_file_writes.py` | 0 (3 OK) |
| New test, repeatability | `npm test -- tests/invariants/test_balance_instrument_repeatability.py` | 0 (2 OK) |
| Imports | `npm test -- tests/invariants/test_cross_part_imports.py` | 0 (10 OK) |
| Tests of the part | `node --test tests/balance/*.test.mjs` | 0 (64 pass, 0 fail); a first try `node --test tests/balance/` was my wrong invocation (exit 1, no module) |
| ESLint | `npx eslint --max-warnings 0 balance tests/balance` | 0 |
| Prettier | `npx prettier --no-config --no-editorconfig --check balance/*.mjs` | 0 |
| Scan probes | `python -B .runs/review-whole/probe_scans.py` (imports `findings` of both new tests, runs it on 7 sources for writes and 8 for the clock) | 0; result kept as `reports/review-whole-probe-result.txt` |
| Equality of measurements | `node balance/cli.mjs` at base (worktree) and head, same built `dist/` (no file under `src/` changes in the range): `sweep --map forest --program forestDecent --seeds 1-10 --cap 30`; `trace --map forest --program forestNaive --seeds 3 --cap 30`; `trace --map forest --program forestNaive --seeds 3`; `loop --map forest --program forestDecent --seeds 1-3 --hours 8,24`; `campaign --player <copy of edge-daily-decent with days 2, capMinutes 30, outside the repository> --seeds 1-2`; `campaign --player edge-daily-decent --seeds 1`; compared with `cmp` | every command exit 0 on both sides; all 6 outputs byte for byte the same (560, 287, 3044, 1402, 3834, 6681 bytes); the sweep shows `capped: 10`, the trace ends `end: cap at minute 30` |

Not run: the full `npm test` (the cycle's run); `check-map` (the author ran a narrowed one; it reaches `sweep` and `loopBalance`, both covered above); mutation testing (the change touches no file of `simulation`).

## Reaches beyond the dispatch

- `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/coding/template.md`, whole: the change writes guidelines (section 2).
- `.the-way/elements/decisions/template.md` (Verification), `.the-way/elements/invariants/template.md` ("Links"): to judge D-429's *Verification* and the *Derives from* of the new invariant.
- `.the-way/project-level/technology/reserved_choices.md`, whole: section 2.
- The "Where in code" of four other kind files and the `Invariant: none` rules of the kind files of loop2: to see whether the new file follows the product's practice (it does).
- The docstrings of `tests/invariants/test_simulation_randomness.py` and `tests/invariants/test_simulation_isolation.py` and their lines of patterns: to compare the new scans' reach with the checks they copy (Important 2).
- `tests/balance/*.test.mjs` by search for `decision:`, `invariant:` and the four moved names: the handoff carried them unread.
- `balance/cli.mjs` by search for `UsageError`, `files` and `main`, and `balance/campaign.mjs:1-260`, `balance/engine.mjs` by search for its errors: to check the rule and the examples against the code.
- Glossary entries *game minute*, *map run*, *earning loop*, *overlay*.
- `.the-way/task-cycle/remarks_check.py` docstring: to write this report's last section in the form it reads.

## Working copies

- `.runs/review-whole/base/`: a worktree of the base `4ee41c5f`, with two junctions in it (`node_modules` and `dist`, to the reviewed worktree's). The junctions were removed first with `rmdir`, the targets checked intact, then `git worktree remove --force` (exit 0) and `git worktree prune`. Removed.
- `.runs/review-whole/`: the index of my selection, the list of sections, the probe script and its result, the outputs of the 6 commands on both sides, the player copy, the outputs of the checks. The index and the probe result are kept beside this report as `reports/review-whole-decision-index.md` and `reports/review-whole-probe-result.txt`; the directory was then removed.

## Unread material

Of the index of my selection (sections "Balance measurement" and "Code rules, exemplars and static checks", parts `balance-tools`, `agent-workflow`, `product-foundation`, and D-18, D-22, D-28, D-351, D-425, D-427, D-429 by number; 32 listed in full, 49 by heading), I read 5 decisions whole: D-28, D-83, D-427, D-429, D-437. D-18 and D-351 were read in part (binding sentences and the start of *Verification*); the others by their index lines. Of the run through the 49 headings, only D-83 pointed to a bearing (where new Python tests go) and was opened. Guideline files: `guidelines/coding.md`, `guidelines/testing.md` (in two reads) and `guidelines/coding-balance-instrument.md` read whole. Product code read in part: `balance/cli.mjs` (by search), `balance/check-map.mjs`, `balance/describe.mjs`, `balance/overlay.mjs` (their head comments), `balance/campaign.mjs` lines 1-260 and the diff; `tests/balance/*.test.mjs` by search only.

## Searches not found or unclear

- Whether the rule of the decisions template that a sentence a test holds by a line `decision:` gets no invariant derived from the decision (WAY-22) reaches the new invariant `balance-instrument-file-writes`, which derives from D-429 while `tests/balance/cli.test.mjs` holds D-429's second sentence: unclear; I judged it does not, because the invariant states another rule than the held sentence and the task settles it.
