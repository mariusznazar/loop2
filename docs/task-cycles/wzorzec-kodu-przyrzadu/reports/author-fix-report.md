# Author fix report — `wzorzec-kodu-przyrzadu`, fix of the findings of the review of the whole change

**Status:** `done with concerns` (Minor 5 is contested, not fixed; see below).

Fix range `ce67fbd7..001349f5`. Commits (private email `mariusznn@gmail.com`):

| Commit | What |
|---|---|
| `dcb27cbd` | `test: :white_check_mark:` the new patterns and control cases of the clock-and-random scan (Important 2) |
| `001349f5` | `docs: :pencil2:` the guidelines file (Important 1, Minor 1, 2, 3, and the rule's sentence of Important 2) and the part sentence (Minor 4) |

Nothing pushed. `balance/` was not touched in this round.

## Findings

### Important 1 — the rule "Przejście mapy jak w grze" bound every mode to the engine's way of stepping: fixed

The reviewer's reading is right (the rule's text and *Good* named `newMapRun`/`stepMinute` and `startOf` as the way, and gave an own loop of steps only to a per-minute mode, while `campaign.mjs` steps by `send`/`advanceMinutes` and `loop.mjs` by `catchUp`, both `copy`). The rule now reads as To do 2 gives it: "Przejście mapy z jednego ziarna kończy się w przyrządzie tak samo jak w grze, bo przyrząd uruchamia zbudowaną symulację i kroczy przejście jej własnymi funkcjami; reguł gry nie liczy po swojemu." *Good*: "Tryb pomiaru przeprowadza przejście mapy funkcjami zbudowanej gry, na przykład `newMapRun` i `stepMinute`, `send` i `advanceMinutes` albo `catchUp`." *Bad* unchanged. The sentence that allowed an own loop of steps only to a per-minute mode is gone. D-437 and its sentence are unchanged; the guidelines no longer contradict it. The rule's meaning is row 1's To do 2 first bullet (D-427, `instrument-game-agreement`), as before.

### Important 2 — the clock-and-randomness scan missed plain static forms: fixed, by patterns plus control cases

Way chosen: add patterns, with a control case each, and name the remaining blind spots in the docstring and the rule. Rejected: only naming the seven forms as blind spots; cost, the rule would leave the reviewer forms a three-line pattern catches, and a later mode written with `const { random } = Math` would pass the gate. Cost of the way chosen: the scan is stricter than the sentence for `Intl.DateTimeFormat` (flagged anywhere, though a date format given a date reads no clock) and for `Math`/`Date`/`performance` taken as a value (`list.map(Math)` would be flagged); the instrument has no use for either, and a rewrite of the line clears a false positive.

Patterns added to `tests/invariants/test_balance_instrument_repeatability.py`:
- `uptime`, `timeOrigin`, `Intl.DateTimeFormat` as names (`FORBIDDEN_NAMES`);
- `new Date(undefined)` (`SYSTEM_TIME`);
- `CLOCK_OR_DRAW_AS_VALUE`: `Math`, `Date` or `performance`, reached by its own name or as a member, standing after `=`, `,` or `(` and before `;`, `,` or `)`: one pattern that closes `const { random } = Math`, `const { now } = Date`, `const { now } = performance`, `const { now } = globalThis.Date`, `const D = Date` and `list.map(Date)`.

Control cases added (11), one for each form: the four destructurings, the alias, the value passed on, `process.uptime()`, `os.uptime()`, `performance.timeOrigin`, `new Intl.DateTimeFormat().format()`, `new Date(undefined)`. The scan now flags all seven forms the reviewer gave (`random` from `Math`, `now` from `Date`, `process.uptime`, `os.uptime`, `performance.timeOrigin`, the `Intl` form, `new Date(undefined)`).

Seen failing, then passing:
- Before the patterns (the 11 cases added, the scan as it was): `npm test -- tests/invariants/test_balance_instrument_repeatability.py` exit 1, `FAIL: test_control_the_scan_flags_each_forbidden_form`, a subtest failure `the scan does not flag '...'` for each of the 11 new sources (first: `'const { random } = Math;\nexport const u = random();\n'`).
- After the patterns: the same command exit 0 (2 tests OK); the first test of the file, which scans the real `balance/`, still passes, so none of the new patterns flags a file of the instrument.

The docstring's "Reading" now names the new forms and "Does NOT cover" now says what stays: a generator from scratch; a clock or random source through a name built at run time, through an object handed in from outside the file (a `Date` or `Math` taken as an argument and called there) or through `Reflect` and `Function`; a method that reads the current moment and is named by none of the forms; a command the file starts. The rule "Zegar i losowość" now says the test misses "generatora napisanego od zera, zegara ani losowości sięgniętych nazwą złożoną dopiero w trakcie działania albo przez obiekt podany z zewnątrz pliku (`Date` albo `Math` wzięte jako argument), ani metody, która czyta bieżącą chwilę, a żadna z jego postaci jej nie nazywa; te przypadki pilnuje recenzent." Meaning of row 5 unchanged.

### Minor 1 — the rule "Importy przyrządu" listed today's imports: fixed

The rule now reads "Plik przyrządu importuje tylko pliki przyrządu i pliki symulacji. Pliku żadnej innej części nie importuje." The mention of `tests/sim/reference-programs.mjs` stays only in the rule "Programy wzorcowe", where D-427 puts it.

### Minor 2 — a sentence of the cycle's own, not named: fixed and named

The sentence "Rzecz stoi w pliku, który importują wszystkie pliki jej potrzebujące, żeby nie powstał cykl importów" now reads "Rzecz stoi w pliku, który pliki jej potrzebujące już importują, żeby nie powstał cykl importów." The reviewer is right that the old wording was circular. **This sentence is the cycle's own**, not one a row of *Settlements to record* gives (row 3 gives the rule and its reach, not where the thing stands): a rule that only says how to write code, in the rule "Jedno miejsce wspólnej rzeczy" of `guidelines/coding-balance-instrument.md`. The request should show it to the human among what the human did not see in the task. Its English sense: "the shared thing stands in a file that the files needing it already import, so that no import cycle arises."

### Minor 3 — the rule "Zapis plików" dropped the tests of the answer to question 4: fixed

The sentence now reads "ten przypadek zostaje testom w `tests/balance/cli.test.mjs` i recenzentowi każdej zmiany tego pliku". The source says "dwóm dzisiejszym testom": the file `tests/balance/cli.test.mjs` holds both lines `decision: D-429` (`:324` and `:507`, verified by `grep`), so I name the file, not the two cases, which the guidelines would otherwise list as state.

### Minor 4 — the part sentence of `balance-tools` was no longer whole: fixed

`foundations/part_map.md`, sentence of `balance-tools`, now ends "… and the tests that keep its instrument in agreement with the game, from writing a file outside its command line and from reading the clock or drawing outside the seed of a measurement." *Files*, *Depends on* and *Trust boundary* unchanged. **This sentence is the cycle's own** (no row gives it; the task's To do 6 names the part-map line of the tests, not the sentence), so the request should show it to the human; the one entry changed is the part `balance-tools` (binding part). The entries that name the part (D-427, D-428, D-429, D-437, the invariants) are not changed by it: it widens a description and removes no promise.

### Minor 5 — a second copy of the lexer: contested, not fixed

The finding asks for one lexer in the tests, and the reviewer names the way, importing from the simulation's test file, as one that breaks `cross-part-imports`. The only way to one lexer is to move it into `tests/invariants/loop2_invariant_support.py` (part `test-helpers`) and have `test_simulation_isolation.py` and `test_simulation_randomness.py`, which belong to `simulation`, import it; and those two hold different lexers (`segments`/`code_only` against `split_source`), so one lexer also means choosing and testing one of them against both tests' control cases. That changes three files of the simulation's tests and one of the test helpers, which this task's scope (the two tests and their reader) does not hold, and a fix that grows beyond its finding is the likeliest to draw a new serious finding (`fix.md`). Evidence: `tests/invariants/test_simulation_isolation.py:246-372` (`segments`), `tests/invariants/test_simulation_randomness.py` (`split_source`), `tests/invariants/balance_source_scan.py` (the copy). I left it; the request should list it as a later item: one lexer in `test-helpers` for the three tests.

## Checks (command, exit code)

| Check | Command | Exit |
|---|---|---|
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 (`0 error, 144 warn, 7 info`, same count as in the first round; none names the guidelines file) |
| Test, repeatability | `npm test -- tests/invariants/test_balance_instrument_repeatability.py` | 0 (failing run before the patterns: 1) |
| Test, writes | `npm test -- tests/invariants/test_balance_instrument_file_writes.py` | 0 |
| Imports | `npm test -- tests/invariants/test_cross_part_imports.py` | 0 |
| Ruff | `.runs/quality-venv/Scripts/ruff.exe format --config ruff.toml --check <the test>`; `ruff check --config ruff.toml --ignore-noqa <the test>` | 0, 0 |

Not run: ESLint, Prettier and `node --test tests/balance/*.test.mjs` (no `balance/` or `.mjs` file touched in this round); the full `npm test`.

## Own-work check

The weakest point of this round: a new pattern that flags a file of the instrument that is fine, or a new pattern the control test does not hold. The check: the first test of the repeatability file scans the real `balance/` with all patterns and passes (exit 0), and each new pattern stands in the control list with a case that failed before the pattern and passes after it (the failing and passing runs above). A second, unrun-pattern risk is the stricter `CLOCK_OR_DRAW_AS_VALUE` against the clean source of the control test (`new Date(0)`, `globalThis.Date.UTC(...)`, `{ Date: 1, performance: 2 }`, `Math.round(...)`): that control still passes. Mutation in my head: removing `CLOCK_OR_DRAW_AS_VALUE` fails the four destructuring cases and the alias and value cases; removing `uptime` fails the two uptime cases; the rule's sentences are prose and have no test.

## Unread material

None of the files this handoff names stayed unread: the handoff, the findings file and `fix.md` were read whole. I re-read the parts of `guidelines/coding-balance-instrument.md`, `tests/invariants/test_balance_instrument_repeatability.py` and `foundations/part_map.md` I changed; I did not re-read `balance/` files (untouched) or the lexers of the two simulation tests beyond the line ranges quoted above (known from the first round).

## Searches not found or unclear

- None, except one point: the handoff and findings say "`Contradiction: yes` (D-437 as you wrote it)". I read it as the guidelines rule contradicting D-437's clause "without requiring every mode of the instrument to take the shape of the engine"; I changed the rule and left D-437 as written.

## Working copies

`.runs/author-fix/` of the worktree (`.runs/author-fix/`): `before-patterns.txt` (the failing run), `fc.txt`, `ci.txt`, `edit.py`, `doc.py`. Removed by `rm -r` of that path before I returned. `node_modules/`, `dist/` and `.runs/quality-venv/` of the product's own tools stay, ignored by git.
