# Slice 2 — executor report, task `ocena-programu-na-ziarnach`

## Status

`done with concerns` (the concerns are the reads that now differ from a copy's, listed under "Where a test sees more or differently", and the one gap in the controls).

## Commits

- `afac5cd0c2cd4f73ffef5b7c57ae8f6c16fe9d0d` — `refactor: :recycle: cut the source text of TypeScript and JavaScript in one place ...` (one commit: the lexer, the four files and the part map, since the part map's new pattern must match a tracked file for `foundation_check.py`).

## Files changed (added / removed lines, `git diff --stat HEAD~1`)

| File | + / - |
|---|---|
| `tests/invariants/source_lexer.py` (new) | 222 / 0 |
| `tests/invariants/balance_source_scan.py` | 7 / 153 |
| `tests/invariants/test_content_identifiers.py` | 1 / 108 |
| `tests/invariants/test_simulation_isolation.py` | 1 / 147 |
| `tests/invariants/test_simulation_randomness.py` | 2 / 123 |
| `foundations/part_map.md` | 5 / 2 |

Total 238 insertions, 533 deletions (the numbers above are from `git diff --numstat HEAD~1 HEAD`). No file of the game changed. No test case and no expected value of the five tests changed.

## What was made

- `tests/invariants/source_lexer.py` holds the one cut: `REGEX_AFTER`, `REGEX_AFTER_WORDS`, `segments`, `without_comments`, `code_only` and `string_values`. `segments` is the copy of `test_simulation_isolation.py` / `balance_source_scan.py` (identical to each other), with one change (below).
- `test_simulation_isolation.py` imports `code_only, without_comments`; `test_content_identifiers.py` imports `without_comments`; `test_simulation_randomness.py` uses `code_only(text)` for the code and `string_values(text)` for the strings where `split_source` stood; `balance_source_scan.py` keeps the names `code_only` and `string_values` (as plain assignments from `source_lexer`, so the two balance tests need no change and ruff F401 has nothing to flag). None of the four files keeps a cutting or the two constants.
- `foundations/part_map.md`: the sentence of `test-helpers` says it also cuts the source text of TypeScript and JavaScript into code, comments, strings, template text and regular expressions; its *Files* list `tests/invariants/source_lexer.py`. Written on my recommendation through the steps of `the-way-update-part-map` (SKILL.md, `decide_entry.md`, `write.md`, the template, `rules.md`, `way_of_working.md` read); no other entry names the sentence of `test-helpers` (searched `test-helpers|test helpers` in `foundations/`, only *Scope*/*Part* lists, D-351 and `cross-part-imports`, which name the part by identifier).

## Choices (with the way rejected and the cost if wrong)

1. **One lexer, the isolation/balance `segments` as the base.** Rejected: the `split_source` or `without_comments` shape as the base (they keep no piece list, so the other views could not be built on them without a rewrite). Cost if wrong: none beyond the differences listed below.
2. **`string_values` returns every reading a scan must not miss**, not one: a string as written between its quotes and with its escapes taken off (what `split_source` gave `simulation-randomness`; what `string_values` gave the balance tests was the first of the two); a template piece between its marks and with every backtick, `$`, `{`, `}` taken off its ends (what the balance `string_values` gave; the first is what `split_source` gave). Rejected: two functions, one per old behaviour (it keeps two cuts in effect, and each test would still see only its old reading); one reading only (balance or randomness would stop seeing a form it sees today). Cost if wrong: each of the two tests sees a few more forms (see below), never fewer.
3. **A regular expression right after `${` is read as a regex** (`last_code` answers `{` after a template piece ending in `${`). The copy of `test_content_identifiers.py` did this by accident of keeping the raw text; the three copies of `segments` read the `/` as a division. Rejected: keeping the three's reading and giving `without_comments` of `content-identifiers` the same: for `${/[//]/.test(a)}` it hides the rest of the text as a comment (an evasion window in the scan of three invariants today, found by the differential check below). A real instance of this form stands in `scripts/restore-trial.mjs:365` (not scanned by any of the five tests). Cost if wrong: see "Where a test sees ...".
4. **`balance_source_scan.py` keeps `code_only` and `string_values` as assignments**, rejected: editing the two balance test files to import `source_lexer` (outside the slice's *Change*).

## Where a test sees more or differently (for the request, as the task asks)

Established by the differential check `reports/slice-02-diff_check.py` (454 texts: every tracked TypeScript/JavaScript file of the repository, every `FLAGGED_SOURCES`/`CLEAN_SOURCE` of the five tests, and 21 hand-made edge texts), comparing the copies of `b2114894` with the new code. On every tracked file under `src/browser/` and `balance/` — the files the five tests scan — all views are identical to the copies' (`segments`, `without_comments`, `code_only`, `findings` of the three tests and `string_values` as a superset). The differences, all on forms that no scanned file holds today:

- **Regex that opens a substitution** (`` `x ${/re'/.test(a)} y` ``): `simulation-isolation`, `simulation-randomness` and the balance tests now blank the regex and no longer read a name inside it as code (they did, by misreading it as a division); and they no longer lose the text after `//` inside such a regex's class to a false comment. `content-identifiers` reads it as before. This is the one place where a test sees less (a name inside such a regex literal); the sentences of all four invariants exclude regular expressions from the scan.
- **`simulation-randomness`, more**: a template whose text is a forbidden string between edge marks (`` `{crypto}` ``, `` `$crypto` ``) is flagged now (the old `split_source` did not flag it; the balance cut did). A string with an escape (`'cry\pto'`) is read with the escape off, as before, and also as written.
- **Balance tests, more**: a string equal to a forbidden name once its escapes are off (`'write\File'`) is flagged now; the old balance cut read it as written only. A string not closed at the end of the text is read whole (the old `piece[1:-1]` dropped its last character, so `'… crypto` at the end of a file was read as `crypt`).
- **`content-identifiers`**: otherwise unchanged; the whitespace count where a comment stood differs (one space before, two now, as in the isolation copy), which no token search reads. The 60-piece window of its old `last_significant` and the 40-character window of `split_source` are gone: the lookback is to the last non-blank code, as in `segments`, which differs only where more than 40 characters or 60 pieces of white space stand before a `/`.
- A finding of `simulation-randomness` for one string can now stand more than once in the list (one entry per reading); the test asserts the list empty, or a flag present, so no case changes.

## Checks (each command, exit code)

| Check | Result |
|---|---|
| `npm test -- tests/invariants/test_simulation_isolation.py` | exit 0, 5 tests OK |
| `npm test -- tests/invariants/test_simulation_randomness.py` | exit 0, 6 tests OK |
| `npm test -- tests/invariants/test_content_identifiers.py` | exit 0, 4 tests OK |
| `npm test -- tests/invariants/test_balance_instrument_file_writes.py` | exit 0, 3 tests OK |
| `npm test -- tests/invariants/test_balance_instrument_repeatability.py` | exit 0, 2 tests OK |
| `npm test -- tests/invariants/test_cross_part_imports.py` (run again after the commit) | exit 0, 10 tests OK |
| `python -B .the-way/elements/common/foundation_check.py` (after the commit) | exit 1, 7 errors, all of one kind: `tests/sim/loop.test.mjs:237`, `:304`, `tests/view/account-screen.test.mjs:2683`, `:2807`, `:2975`, `tests/view/maps-screen.test.mjs:494`, `:700`: the quotation stands in no binding sentence of `D-243` — the seven quotations the handoff names for slices 5, 10 and 12. The error that stood before the commit (`source_lexer.py` matched no tracked file) is gone. |
| `ruff format --check` and `ruff check` with `ruff.toml` (ruff 0.17.1, from the main checkout's `.runs/quality-venv`, used as a tool only) on the five Python files | both clean |
| `python -B .runs/executor-2/diff_check.py` (kept as `reports/slice-02-diff_check.py`) | prints the differences listed above and nothing else |

Failing runs written first: none — a move of code under unchanged controls; the checks are the five unchanged tests, the differential check, and no new test. Mutation by thought: wrong `last_code` return, unescape off-by-one, template mark strip — each would change `FLAGGED_SOURCES` outcomes in randomness/balance only through the escape and edge-mark readings, which no control case holds (see the own-work check).

A first background start of the checks ran twice at once (two copies of the same loop writing one results file); every test passed in both, and the cross-part test was run again alone after the commit, the numbers above are that run.

## Own-work check

- **Requirement most likely not met:** "no test stops seeing a form it sees today" (task *To do* 12; slice *Goal*) for the forms that the five tests' own controls do not hold — the escape reading of strings and the edge-mark reading of templates, which no control case exercises, so a loss there would pass the five tests unseen.
- **Check:** the differential script over 454 texts, comparing for each copy its own view with the new code: `segments`, `code_only`, `without_comments` equal; `findings` of the three tests equal; `string_values`/strings a superset of the copies'; code view of `split_source` equal in every name pattern it feeds.
- **Result:** equal on every tracked file the five tests scan. Differences only on made-up edge texts, listed above; the one "less" is a name inside a regular expression literal that opens a substitution (item 3).
- **Gap, not closed by the slice:** the new readings and the regex-after-`${` rule have no control case of their own, as the old `split_source`'s escape reading had none. A control case would be a new test file in `test-helpers` (outside this slice's *Change*); I recommend the orchestrator decide whether a later slice or the request holds one.

## Walk of the user-visible behaviour

The change alters no behaviour a user sees in the running product: it moves the cut of source text used by tests of invariants into one test helper and touches no file of the game, the server or the build.

## Reaches beyond the handoff

- `scripts/restore-trial.mjs:365` — opened by `grep` to read a real regex after `${` (found by the differential check); not changed.
- Used ruff from the main checkout's `.runs/quality-venv` as a tool (the worktree has none); wrote nothing there.
- `foundations/part_map.md`: read lines 1-140 and 196-225 (the handoff names 33-64, 127-137, 204-212); `.the-way/elements/part-map/skill/decide_entry.md`, `write.md`, `.the-way/elements/part-map/template.md`, `.the-way/elements/common/rules.md`, `.the-way/elements/common/way_of_working.md` and `.the-way/task-cycle/change/slice.md`, named by the method and the skill.
- `a note in the author's private notes`, `scripts.md` (the global instructions' rules for commits and scripts).

## Working copies

- `.runs/executor-2/` (old copies of the four files from `b2114894`, the differential script, test run outputs): stood in `.runs/executor-2/`; removed before return. The differential script is kept as `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-02-diff_check.py`; it reads the old copies from `.runs/executor-2/old/`, which are made with `git show b2114894:tests/invariants/<file>.py` under the names `old_<file>.py`.

## Unread material

- `guidelines/coding.md`: read whole. `guidelines/testing.md`: read whole (two reads, 1-214 and 215-509).
- `foundations/part_map.md:33-64`, `:127-137`, `:204-212`: read (inside the larger reads above).
- `foundations/decisions.md:704-753` D-351, `foundations/invariants.md:1248-1257`, `:214-225`, `:176-186`, `:236-247`, `:1448-1457`, `:1458-1467`: read.
- `.the-way/elements/part-map/skill/SKILL.md`, `tests/invariants/test_balance_instrument_file_writes.py`, `test_balance_instrument_repeatability.py`, `loop2_invariant_support.py`: read; the support file only lines 1-80 (its helpers are not changed).
- Task passages (lines 51, 164-168, 237-241) came in the handoff; the task file itself not opened.
- Not read: D-425's *Rejected* and the size rule's invariant (the new file is Python, which the ESLint size rules do not cover).

## Searches not found or unclear

- none that blocked the work. Unclear: the handoff says "no agent runs the full gate", and the slice's *Checks* hold only focused runs, as run here; the one command's `foundation_check.py` errors for D-243 stand until slices 5, 10 and 12.

## Class of model

`same` was enough.
