# Findings of the review of the whole change (`reports/review-whole-report.md`, first line `FAIL ce67fbd73236185ce90b55c15d4f0aef86414aba`), range `4ee41c5f..ce67fbd7`

Cut from the reviewer's report in its words by the orchestrator: first the two blocking findings, then the Minor findings of the review of the whole change within the task (the reviewer marked none outside the task's scope).

## Blocking findings

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

## Minor findings within the task

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
