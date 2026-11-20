PASS 001349f53b72cf3b005fe706b913dd022f89122a

# Review of the fix of the findings of the review of the whole change — `wzorzec-kodu-przyrzadu`

Fix range: `ce67fbd7` to `001349f5` (`git rev-parse HEAD` = `001349f53b72cf3b005fe706b913dd022f89122a`, the head given). Two commits: `dcb27cbd` (tests), `001349f5` (guidelines file and the part sentence). Nothing in `balance/` changed. `.the-way` at `19e5774a`, equal to the gitlink. The findings file `reports/review-whole-findings.md` bounds this review (`.the-way/task-cycle/review/fix.md`).

Counts: 0 blocking; 2 new Minor findings in the fix diff, within the task; 0 out of scope. Of the earlier findings: both blocking fixed; Minor 1-4 fixed; Minor 5 contested, and I accept the contest.

## Each finding of the findings file

### Important 1 — the rule "Przejście mapy jak w grze": fixed

`guidelines/coding-balance-instrument.md:32-37` at the new head: *Good* "Tryb pomiaru przeprowadza przejście mapy funkcjami zbudowanej gry, na przykład `newMapRun` i `stepMinute`, `send` i `advanceMinutes` albo `catchUp`."; text "Przejście mapy z jednego ziarna kończy się w przyrządzie tak samo jak w grze, bo przyrząd uruchamia zbudowaną symulację i kroczy przejście jej własnymi funkcjami; reguł gry nie liczy po swojemu." That is To do 2's rule, with the names as examples. The sentence that kept a loop of its own to a per-minute mode is gone. `balance/campaign.mjs` (`send`/`advanceMinutes`) and `balance/loop.mjs` (`catchUp`) now meet the rule, so their status `copy` holds. The clash with D-437 ("without requiring every mode of the instrument to take the shape of the engine") is gone; D-437 is unchanged.

### Important 2 — the clock-and-randomness scan missed plain static forms: fixed

I re-ran `findings()` of `tests/invariants/test_balance_instrument_repeatability.py` at the new head on the seven forms of the finding. Every one is flagged now:

| Form | Flagged by |
|---|---|
| `const { random } = Math; … random()` | Math, Date or performance taken as a value |
| `const { now } = Date; … now()` | the same |
| `process.uptime()` | `uptime` |
| `os.uptime()` | `uptime` |
| `performance.timeOrigin` | `timeOrigin` |
| `new Intl.DateTimeFormat().format()` | `Intl.DateTimeFormat` |
| `new Date(undefined)` | `new Date(undefined)` |

Each new pattern has a case in the control test (`FLAGGED_SOURCES`, 11 cases added), and the control of clean source still passes. The scan of the real `balance/` gives no finding for any of the eight files (probe below and the test's first case), so the stricter patterns raise no false finding on the instrument as it stands. The rule's sentence (`guidelines/coding-balance-instrument.md:114-118`) and the docstring's "Does NOT cover" now name what is left for the reviewer: a generator written from scratch, a name built at run time, an object handed in from outside the file, `Reflect` and `Function`, and a method no form names. Minor 1 and Minor 2 of this round below cover two small gaps in that text.

### Minor 1 — the rule "Importy przyrządu" listed today's imports: fixed

`guidelines/coding-balance-instrument.md:46-47`: "Plik przyrządu importuje tylko pliki przyrządu i pliki symulacji. Pliku żadnej innej części nie importuje." The list is gone. The path of the reference programs stays only in the rule of D-427.

### Minor 2 — a sentence of the cycle's own in the rule of row 3: fixed

`guidelines/coding-balance-instrument.md:86-87`: "Rzecz stoi w pliku, który pliki jej potrzebujące już importują, żeby nie powstał cykl importów." The wording is no longer circular. The author's fix report names the sentence as the cycle's own, for the request to show the human.

### Minor 3 — the rule "Zapis plików" dropped the tests of the answer to question 4: fixed

`guidelines/coding-balance-instrument.md:100-102` now leaves the case "testom w `tests/balance/cli.test.mjs` i recenzentowi każdej zmiany tego pliku", as the answer to question 4 gives it. Naming the file rather than its two cases keeps the rule from listing state.

### Minor 4 — the sentence of the part `balance-tools`: fixed

`foundations/part_map.md:129` now ends "… and the tests that keep its instrument in agreement with the game, from writing a file outside its command line and from reading the clock or drawing outside the seed of a measurement." *Files*, *Depends on* and *Trust boundary* are unchanged, and the foundation check reports 0 errors. The author names the sentence as the cycle's own, for the request.

### Minor 5 — a second copy of the lexer: contested; I accept the contest and do not keep the finding for this task

The author's evidence holds. One lexer means moving it into `tests/invariants/loop2_invariant_support.py` (part `test-helpers`). It also means changing both tests of the simulation, which hold two different lexers (`segments` in `test_simulation_isolation.py`, `split_source` in `test_simulation_randomness.py`), and choosing one against both tests' control cases. That reaches three files outside this task's tests. The copy is still a fact; it goes to the request as a later item (one lexer in `test-helpers`), as the author proposes.

## New findings in the fix diff

### Minor 1 (new, within the task) — the docstring's reading claims every use of `Math`, `Date` or `performance` as a value; the pattern catches only some places

`tests/invariants/test_balance_instrument_repeatability.py:13-14` reads "where `Math`, `Date` or `performance` stands as a value, assigned, destructured or passed on". `CLOCK_OR_DRAW_AS_VALUE` (`:54-56`) matches only after `=`, `,` or `(` and before `;`, `,` or `)`. My probes, not flagged:
- `const o = { m: Math }; … o.m.random()`
- `const [m] = [Math]; … m.random()`
- `function g() { return Math; } … g().random()`
- `const g = () => Date; … g().now()`
- `const m = true ? Math : null; … m.random()`

None of these is in the "Does NOT cover" list or in the rule's sentence on what the reviewer keeps. A destructuring with no semicolon is not flagged either, but Prettier (D-32) adds the semicolon before a file can pass the gate, so that form cannot reach `main`. I grade it Minor, unlike Important 2 of the first round. The forms there were the plain idiomatic way to take a function off `Math` or `Date`. These put `Math` or `Date` into an object, an array, a return value or a conditional, and nothing in the instrument suggests such code. The gap is in the wording more than in the gate. Either narrow the reading to the places the pattern reads, or add `:`, `[`, `return`, `=>` and `?` to its left side, each with a control case.

### Minor 2 (new, within the task) — the stricter patterns flag uses the invariant's sentence allows, and the docstring does not say the reading is stricter

These are flagged though none reads the clock or draws a number:
- `new Intl.DateTimeFormat('pl').format(new Date(0))`
- `Object.keys(Math)`
- `String(row.Date)` (a field named `Date` passed on)
- a local variable named `uptime`
- `const { UTC } = Date`

The author's fix report states the cost ("stricter than the sentence for `Intl.DateTimeFormat` … and for `Math`/`Date`/`performance` taken as a value"). The docstring, though, lists these forms as readings of the clock without saying that, so an agent hit by such a finding reads its own code as breaking the invariant. No file of `balance/` is flagged today, and a rewrite of the line clears it. One sentence in the docstring would do ("stricter than the sentence: …"). Minor.

## Declined to judge

- `foundations/part_map.md:226`, a warning `dead-path` for `mariusznazar/screenshots` from `check_instructions.py`: it was there before the fix range (the section *External context*), and the fix does not touch it.

## Checks run

| Check | Command | Exit / result |
|---|---|---|
| Head and pin | `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | `001349f5…`; `19e5774a` both |
| Fix diff and log | `git diff ce67fbd7..001349f5`; `git log ce67fbd7..001349f5` | read whole; no file under `balance/` |
| Whitespace | `git diff --check ce67fbd7..001349f5` | 0 |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 (`0 error, 144 warn, 7 info`; the only lines on a file of the fix are the older `dead-path` at `foundations/part_map.md:226` and a size note) |
| Test, repeatability | `npm test -- tests/invariants/test_balance_instrument_repeatability.py` | 0 (2 OK) |
| Test, writes | `npm test -- tests/invariants/test_balance_instrument_file_writes.py` | 0 (3 OK) |
| Imports | `npm test -- tests/invariants/test_cross_part_imports.py` | 0 (10 OK) |
| Ruff format | `.runs/quality-venv/Scripts/ruff.exe format --config ruff.toml --check tests/invariants/test_balance_instrument_repeatability.py` | 0 |
| Ruff lint | `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa tests/invariants/test_balance_instrument_repeatability.py` | 0 |
| Scan probes | `python -B .runs/review-whole-fix/probe_clock.py` (runs `findings()` on the 7 forms of Important 2, 6 other forms of value-taking, 5 forms the sentence allows, and on each of the 8 real files of `balance/`) | 0; result kept as `reports/review-whole-fix-probe-result.txt` |

Not run: ESLint, Prettier and `node --test tests/balance/*.test.mjs`, since the fix touches no `.mjs` file. The failing run of the new control cases before the patterns is the author's; I did not repeat it. My probes show each of the seven forms flagged only through a pattern the fix added. The full `npm test` is the cycle's run.

## Reaches beyond the dispatch

- `.the-way/task-cycle/review/fix.md`, whole: the method of this round. I read it from the main checkout's `.the-way`, which stands at the same commit `19e5774a` as the worktree's.
- `guidelines/coding-balance-instrument.md:26-120` at the new head: to read the changed rules in place.

## Working copies

- `.runs/review-whole-fix/`: the probe script, its result, the outputs of the checks. The probe result is kept beside this report as `reports/review-whole-fix-probe-result.txt`; the directory was then removed. No worktree or clone was made.

## Unread material

none

## Searches not found or unclear

none
