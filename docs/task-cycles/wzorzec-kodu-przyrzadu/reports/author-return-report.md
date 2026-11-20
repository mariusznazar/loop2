# Author return report — `wzorzec-kodu-przyrzadu`, the return step

**Status:** `done`. Nothing needed a change, so **no commit** was made; head stays `001349f5`.

## Foundation compared with code (head `001349f5`, range `4ee41c5f..001349f5`): what no longer matched

Compared with the code, the tests and the files of the tree as they stand: none of them no longer matches. Each entry, with what I compared:

- **D-437**: the exemplar `balance/engine.mjs` exists and is the one `exemplar` row of `guidelines/coding-balance-instrument.md`, whose name holds the kind `balance-instrument`; the binding sentences name that path and that kind, as `foundation_check.py` requires. The engine does what the sentence says: `startOf`, `runOnce` and `makeState` take an explicit input and give data, `startOf` and `buildSkills` refuse an unknown map, skill or branch with an error that names it (`run: no map …`, `skills: unknown skill …`). The kind lists the eight `.mjs` files of `balance/` and no JSON file of `balance/overlays/` or `balance/players/`.
- **D-429**: sentences unchanged; its *Verification* names `balance-instrument-file-writes`, whose *Derives from* names D-429, and still names the tests of `tests/balance/cli.test.mjs` (its lines `decision: D-429` stand at `:324` and `:507`) and the pair of examples; a command of `balance/cli.mjs` is the one place that writes (`mkdirSync`, `writeFileSync` in `main`), as the invariant says.
- **D-427**: no file of `balance/` holds a reference program (`balance/cli.mjs` imports `tests/sim/reference-programs.mjs`); unaffected by the change.
- **D-351 and `cross-part-imports`**: `npm test -- tests/invariants/test_cross_part_imports.py` exit 0 with the three new Python files (they import `loop2_invariant_support`, part `test-helpers`, and each other, part `balance-tools`); `balance/*.mjs` still imports only `balance/` files and the built simulation and `tests/sim/reference-programs.mjs`; the four moved things add no import between files that did not import each other (`trace.mjs`, `loop.mjs`, `campaign.mjs` import `engine.mjs`; `campaign.mjs` imports `loop.mjs`; no cycle).
- **`instrument-game-agreement`**: the sentence (same minute, outcome, cause, practice, through the game's functions or the instrument) is unchanged by the move of the outcome name to `outcomeOf` in `engine.mjs`; `tests/balance/agreement.test.mjs` still derives the outcome itself and the 64 tests of `tests/balance/` passed after the code commit.
- **D-28**: its binding sentence ("any deferred existing kind is compared before its exemplar is selected") is the sentence D-437 acts on; the task says it stays word for word; nothing in it names the balance kind, and the code makes none of it false.
- **`balance-instrument-file-writes`, `balance-instrument-repeatability`**: both sentences hold on the files of `balance/` (the first test of each Python file scans them and passes); *Part* `balance-tools` is the part whose files a change can make them false in; `Violated: no`.
- **Part map**: `balance-tools` *Files* hold `balance/**`, `tests/balance/**` and the three new files under `tests/invariants/`, each of which exists and is claimed once (`foundation_check.py` exit 0); the sentence of the part, as the fix round changed it, says what the new tests keep; *Depends on* `simulation` holds (the instrument imports no other part). `agent-workflow` (claims `guidelines/**`, so the new guidelines file; its sentence on the skill that reads `balance-tools` is unchanged by the code) and `product-foundation` (claims `foundations/**`) match.
- **Search of the foundation for the things the change touches** (the cap, the outcome name, the mean, milliseconds in a minute, the tests of the part, repeatability and writes of the instrument): `grep` of `foundations/`, `guidelines/`, `AGENTS.md` and the skill `.claude/skills/loop2-balance/SKILL.md` for `4000`, `DEFAULT_CAP`, `meanNumber`, `MS_PER_MINUTE`, `outcomeOf`, "at the cap", "balance instrument" and "instrument" finds no entry that says where one of the four things stands or what its value is; `guidelines/testing.md` (the row of `balance-tools` and the recipe of the unit test, which lists `tests/balance/`) says nothing the new tests contradict, and `tests/invariants/` stands in its integration-test recipe by resources, not by directory; the glossary holds `overlay` and `exemplar`, and D-437 uses `exemplar` as the glossary gives it. Nothing found needed a correction.

## D-437's pair of examples and the *Verification* of D-429

- No test holds a part of D-437's sentence: `grep` for `decision: D-437` in `tests/` finds nothing, and a test holds a sentence only through such a line. The refusal of an unknown identifier is tested function by function in `tests/balance/`, but those tests cite no sentence of D-437, and the task keeps the refusal as an example, not a checked rule. So the pair of D-437 stays whole, with nothing removed and no `tests:` clause added. Its two lines are the pair the first report quoted for the description under the entry (the entry is marked `the cycle's`).
- The *Verification* of D-429 needs no change from this paragraph: the existing clause `tests:` stands, the invariant is named, and the pair stays for the part no invariant and no test holds (a command written into `balance/cli.mjs` that writes a result to a fixed path).

## Decisions written or changed

- D-437, written (row 1; marked `the cycle's` for the pair of examples in its *Verification*, as the first report said).
- D-429, changed: only its *Verification* (row 4); binding sentences, *Rationale*, *Rejected* and the pair unchanged.

## Invariants written or changed

- `balance-instrument-file-writes` — set by row 4 of the task and D-429.
- `balance-instrument-repeatability` — set by row 5 of the task (the human's answer to question 6); *Derives from* `recovered from code — balance/engine.mjs, …`, as the template's "Links" gives for what the human chose from what the product did.

## Environment facts

None. The change rests on no source outside the product that the foundation does not hold: the tools it uses (Node.js, Python, Ruff) are the product's own and already have their entries; the lists of names the scans use are the product's own convention, not an outside source.

## Glossary terms

None written or corrected. The words the English foundation text of this change uses that could carry a field meaning — "exemplar" (an entry exists, used as it gives), "kind" (of code, as D-34, D-35 and the other decisions of exemplars use it), "engine", "mode", "instrument" — are read in the product's meaning in the sentence that uses them and no sentence of the foundation is read wrongly in the field's meaning (D-437 names the engine as `balance/engine.mjs`), so by the template's "Which words take an entry" none takes one. The guidelines file is in Polish and is not held against the glossary.

## Part-map changes

- `balance-tools`: *Files* gained `tests/invariants/balance_source_scan.py`, `tests/invariants/test_balance_instrument_file_writes.py` and `tests/invariants/test_balance_instrument_repeatability.py` (the code commit's docs commit `ce67fbd7`); its sentence widened by the fix round (`001349f5`, marked the cycle's there). No change in this step.

## Projected entries written whole or in part

None. The plan assigns this task no entry of the definition's "Projected foundation changes".

## Rows of *Settlements to record* written

- Row 1 → decision D-437.
- Row 2 → guidelines: coding, the rule "Liczba gry" of `guidelines/coding-balance-instrument.md`.
- Row 3 → guidelines: coding, the rule "Jedno miejsce wspólnej rzeczy" of `guidelines/coding-balance-instrument.md`.
- Row 4 → invariant `balance-instrument-file-writes` (and the extension of D-429's *Verification*).
- Row 5 → invariant `balance-instrument-repeatability`.

## Choices that bind after the merge (WAY-36), judged by the questions of the decisions template ("Where it goes")

The seven choices of the first report:
- Choice 1, the places of the four shared things (the cap, the outcome name and the mean in `balance/engine.mjs`; milliseconds in a minute in `balance/loop.mjs`): question 3 ("a single text, number, list or location?") answers yes: it goes to the code, with the test that holds it where one can (none can cheaply: the guidelines rule "Jedno miejsce wspólnej rzeczy" already binds later code to keep one place, and the review compares a change with it). No entry; nothing to add to the rule.
- Choices 2 to 5 (where the two tests stand, the shared reader, the scan of writes by names, the generator constant in the scan): how-to-write-the-test choices; the tests' docstrings hold what each covers and does not cover; they bind no code beyond the invariants' sentences. Question 2 ("a rule only for how to write code or tests?") sends them to the guidelines or the tests, and the guidelines already say what the tests miss in the rules "Zapis plików" and "Zegar i losowość". No entry.
- Choice 6 (no sentence added to "Odłożone rodzaje kodu"), choice 7 (no move-out commit): nothing binds after the merge.
- The fix round's choices (patterns plus control cases for the clock scan; the part sentence): in the tests' docstring and the part's sentence, both already written.

No entry is deferred or proposed for later; the contested Minor 5 of the review (one lexer in `test-helpers`) is a review finding, no foundation entry.

## Checks (command, exit code), at head `001349f5`

| Check | Command | Exit |
|---|---|---|
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 (`0 error, 144 warn, 7 info`; the same count as in the two earlier rounds) |

The tests and linters of the change were run in the first and the fix report; this step changes no file, so none of them was run again. The full `npm test` stays the cycle's.

## Unread material

None of the files the handoff names stayed unread: the handoff, `return_step.md`, `foundation_step.md` (read in the first round, re-read by its path in the handoff's list: I re-read `return_step.md` whole and `record_template.md` section "Return step" only), the glossary template and the glossary entry `exemplar`. I did not re-read `foundations/decisions.md` beyond D-437's heading, nor the whole of the part map or of the invariants; I compared the entries I wrote and the ones the task names, as read in the first round.

## Searches not found or unclear

None. (One point of reading: the handoff says "the first review round and its fix are in the commits"; I read that as two commits of the fix (`dcb27cbd`, `001349f5`) after the three of the change, and compared the head.)

## Working copies

`.runs/author-return/` of the worktree (`.runs/author-return/`): `fc.txt` and `ci.txt`, the outputs of the two checks. Removed by `rm -r` of that path before I returned. `node_modules/`, `dist/` and `.runs/quality-venv/` of the product's own tools stay, ignored by git.
