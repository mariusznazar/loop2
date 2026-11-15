# Report — executor of slice 1 (code-quality and test-gate decisions)

**Status:** done with concerns

## Commits and files

- `a8755060` test: :white_check_mark: mark the tests that hold the sentences of the code-quality and test-gate decisions with lines decision: (author `mariusznn@gmail.com`, checked with `git log -1 --format=%ae`)
- `8a5c2af0` docs: :memo: add a pair of examples for the part of D-30, D-33, D-79 and D-83 that no invariant and no test holds (author `mariusznn@gmail.com`). This addition follows the orchestrator's ruling R2.
- Range: `394ca859caa5d8316eafdb33145f243ddf5c3bac..8a5c2af0`

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 12 + 12 | 12 + 4 (first commit + second) |
| `tests/quality/test_audit_dependencies.py` | 3 | 0 |
| `tests/quality/test_node_test_selection.py` | 1 | 0 |
| `tests/quality/test_quality_invariants.py` | 4 | 0 |
| `tests/quality/test_source_tool_scope.py` | 2 | 0 |
| `tests/quality/test_test_gate.py` | 5 | 0 |

No test file outside the slice's *Change* got a line (item 5 of "Work of every slice": none reached).

## Checks run

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (base, before any edit) | 0 | `0 errors`, 23 decisions `listed: … held by nothing`, D-79 among them |
| `python -B .the-way/elements/common/foundation_check.py` (after the edits, same tree as the commit) | 0 | `0 errors`, 22 listed; none of D-28, D-29, D-30, D-31, D-32, D-33, D-77, D-79, D-83, D-94, D-95 listed |
| `npm test -- tests/quality/test_source_tool_scope.py` | 0 | Ran 4, OK |
| `npm test -- tests/quality/test_test_gate.py` | 0 | Ran 9, OK |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | Ran 1, OK |
| `npm test -- tests/quality/test_audit_dependencies.py` | 0 | Ran 2, OK |
| `npm test -- tests/quality/test_mutation_test_selection.py` (file unchanged; run since the plan's *Checks* names it) | 0 | Ran 1, OK |
| `npm test -- tests/quality/test_quality_invariants.py` | 1 | Ran 5; `test_ruff_source_rules` and `test_shellcheck_source_rules` ERROR with `FileNotFoundError` (`.runs/quality-venv` does not exist in the worktree: `ls .runs/quality-venv` → "No such file or directory"). The handoff gives both as failing at the base too; I did not re-run them on the base. Not caused by the slice: the slice added only comment lines to them. The other 3 passed. |
| `git diff -U0 394ca859… -- foundations/decisions.md` (after the first commit) | 0 | Hunks at 825-826 (D-28), 840-842 (D-29), 883-884 (D-32), 898 (D-33), 1636-1638 (D-77), 1664 (D-79). Every changed line is in the *Verification* field of one of the slice's decisions. |
| `python -B .the-way/elements/common/foundation_check.py` (after the R2 addition, same tree as `8a5c2af0`) | 0 | `0 errors`, 22 listed; none of the slice's 11 decisions listed |
| `git diff -U0 394ca859… -- foundations/decisions.md` (after `8a5c2af0`) | 0 | Hunks at 825 (D-28), 840 (D-29), 855 (D-30), 883 (D-32), 898 (D-33), 1636 (D-77), 1664 (D-79), 1705 (D-83), all in the *Verification* field of the slice's decisions |
| `git diff --check` (before `8a5c2af0`) | 0 | no whitespace problem |
| `git diff --check` | 0 | no whitespace problem; `git ls-files --eol` shows all six files at LF |

Not run: the Prettier check, because the slice changed no `.mjs` file. The full gate was not run either, because a slice does not run it (method, section 3).

No test was written first and no invariant test changed: the slice adds comment lines only. So no failing run applies.

## Own-work check

- **The requirement most likely unmet:** item 3 of "Work of every slice": "every test that holds a sentence, in whole or in part, carries a line `decision:`". I did not add a line where an invariant test holds only the part its own invariant states, and that invariant derives from the same decision. The choice is under "Choices" below.
- **Check:** list every test case of the six files with its `invariant:` and `decision:` lines (`grep -n "def test_\|# invariant:\|# decision:"`). Compare each case with the judgment table below, and search all of `tests/` for the content of the sentences: tool names, flags, versions, `noInlineConfig`, `suppressions`, `checkers`, `lockfile`, `npm test`, `scripts/test.py`, `GateFixture`, `mutation`, `whole run`, `template`, `exemplar`, `guidelines/`, as well as the decision numbers.
- **What it showed:** every case of the six files carries the lines the table gives. No test outside them holds a sentence of the slice's decisions. The candidates I read and rejected:
  - `tests/invariants/test_application_package_layout.py` (one npm package): it does not check where ESLint is installed.
  - `tests/quality/test_docker_gate.py` `GateRuns`: holds D-390 and D-406, not D-77.
  - `tests/view/memory-limit.test.mjs`: names `scripts/test-node-file.mjs` but tests the memory limit.

## Judgment per decision

Sentences are numbered S1, S2, … within each decision's binding paragraph.

| Decision | Held in whole or in part by tests (`path:line`, case) | Held by invariants | Held by nothing | *Verification* |
|---|---|---|---|---|
| D-28 | S2, in part: the full compliance of ESLint, Ruff and ShellCheck, with no allowance for a file that broke a rule before. Cases: `tests/quality/test_quality_invariants.py:41` `test_eslint_source_rules` (the empty suppressions file of its own defeats a bulk-suppressions baseline), `:53` `test_ruff_source_rules` (`--ignore-noqa` defeats a `noqa` baseline), `:60` `test_shellcheck_source_rules`. S3, in part: ESLint and Prettier reach the test files of the parts in their scope as they reach the other files. Cases: `tests/quality/test_source_tool_scope.py:77` `test_eslint_gives_every_scope_file_the_rule_sets`, `:114` `test_prettier_patterns_check_every_scope_file`. | none named | S1 whole (template adoption, deferrals, exemplars); S2 "without a transitional per-file no-regression invariant" (another invariant added beside them fails nothing); S3: Ruff reaching tests (an exclude in `ruff.toml` fails nothing), testing rules in `guidelines/testing.md`, the explicit-time example | pair rewritten, `tests:` added |
| D-29 | none beyond its invariant. The scope test and the ESLint run hold exactly what `eslint-source-rules` states, so they carry no D-29 line (see Choices). | `eslint-source-rules`: S1 all files of the five parts pass ESLint 10.12.0 at error or warning and receive the published sets unchanged; S2 an inline configuration comment fails, a bulk-suppressions file hides nothing, ignores reach no scope file, the test that asks ESLint which rules each file receives; S3 in part: a rule of the sets turned off or changed fails | the versions of @eslint/js, typescript-eslint, globals and the TypeScript API, the TypeScript 7 compiler, one shared npm package; review keeping out rules beyond the sets; S3 for a rule added from outside the sets | pair rewritten (both examples spoke of the part the invariant holds) |
| D-30 | none beyond its invariant | `ruff-source-rules`: S1 every `.py`/`.pyi` file Ruff finds passes Ruff 0.17.1 under `ruff.toml`; S2 whole | the content of `ruff.toml` (required version, preview off, excludes, the 393 rules less the fourteen); S3 | pair added (R2) |
| D-31 | none beyond its invariant | `shellcheck-source-rules`: S1 for the scripts the test names | S1 for a script not named; S2 (review of new scripts and directives); S3 | unchanged (pair already speaks only of the unheld part) |
| D-32 | S1, in part: the HTML and CSS of the browser view pass Prettier's check with its default options. Case: `tests/quality/test_quality_invariants.py:66` `test_prettier_source_format`; the invariant names TypeScript and JavaScript only. | `prettier-source-format`: S1 for TypeScript and JavaScript of the five parts, default options, no ignore file able to hide a file; S2 the LF attributes and the test of patterns and attributes | S1 the exclusions (Markdown, icons, …); S2 `prettier.config.mjs` setting no option, the attributes being narrow, review of `prettier-ignore` | `tests:` added, `complies:` rewritten |
| D-33 | S1, in part: the audit passes without a network request where the lockfile equals its version at the fork point, and audits it once it differs. Case: `tests/quality/test_audit_dependencies.py:47` `test_audits_only_a_lockfile_changed_from_the_fork_point`. | `introduced-npm-vulnerabilities` and `dependency-audit-refusal`: S1 failing on each new advisory of low or higher severity; S2 a failed request or an unreadable report fails, info not blocking (by the list of severities) | S1 npm 12.2.1 and its flags, the registry it reads; S2 no automatic revision of the threshold; S3 the extent of the audit | `tests:` added, pair added (R2) |
| D-77 | S1 whole. With no argument, the full gate runs (build, Node tests, Python tests, foundation check): `tests/quality/test_test_gate.py:62` `test_the_whole_gate_runs_its_stages`, `tests/quality/test_node_test_selection.py:10` `test_every_node_test_file_is_selected_by_npm_test`. One file is run alone, after a build for Node and with none for Python, with no other test and no foundation check: `tests/quality/test_test_gate.py:37` `test_python_selection_imports_sibling_helper_without_build_or_neighbours`, `:53` `test_node_selection_builds_then_runs_only_the_selected_file`. Exactly one file is accepted: `:132` `test_more_than_one_file_is_rejected`. The selected file is run and its failure fails the run: `:140` `test_failed_tests_and_import_errors_fail_the_selection`. | `focused-test-execution`: S2 a focused run with no executed test or a file that is not a test fails (`test_empty_or_skipped_only_files_fail`, `test_python_exit_during_import_or_collection_fails`, `test_missing_or_non_test_file_fails_before_building`) | S2 "only the full gate suffices before a request"; S3 whole (no whole-run limit file; tests bound their own waiting) | `tests:` added, pair rewritten |
| D-79 | S2, in part: an unreadable response of the audit fails the audit. Cases: `tests/quality/test_audit_dependencies.py:61` `test_counts_each_advisory_of_low_or_higher_severity`, where a controlled report with `error` raises; `:47` `test_audits_only_a_lockfile_changed_from_the_fork_point`, where a run with no npm gives an empty output and exit 1. | none named | S1 (no separate contract test; the real audit in the gate checks the format) | was `none`; `tests:` added, pair added (R2) |
| D-83 | none beyond its invariant | `node-test-selection`: S2 first clause | S1 (Node and Python, directories, names; a `foo.spec.mjs` fails nothing); S2 the verified execution of a new `test_*.py` | pair added (R2) |
| D-94 | none beyond its invariant | `mutation-test-selection`: S2 | S1 (StrykerJS for simulation, no type-checking plugin, the reviewer runs it; `checkers: []` is checked by nothing); S3 | unchanged (pair already speaks only of S1 and S3) |
| D-95 | none | none | S1 | unchanged (pair stands) |

### Lines `decision:` added (8 cases, 12 lines)

- `tests/quality/test_quality_invariants.py:43, :55, :62` — `D-28 "For the adopted linters, full-compliance source invariants apply"`
- `tests/quality/test_quality_invariants.py:68` — `D-32 "All application, script and test TypeScript and JavaScript in browser-view, … and browser HTML and CSS pass `--check` of local pinned Prettier 3.9.10 run with `--no-config --no-editorconfig --ignore-path .gitignore`"` (full quotation in the file)
- `tests/quality/test_source_tool_scope.py:79, :116` — `D-28 "The general coding quality checks cover all code, tests included"`
- `tests/quality/test_test_gate.py:38, :54` — D-77, the whole first sentence; `:63` — `D-77 "`npm test` without arguments runs the full gate"`; `:133` — through "accepts exactly one test file"; `:141` — through "runs only it"
- `tests/quality/test_node_test_selection.py:12` — `D-77 "`npm test` without arguments runs the full gate"`
- `tests/quality/test_audit_dependencies.py:48` — `D-33 "The dependency audit passes without a network request where `package-lock.json` equals its version at {fork-point}"`; `:49` and `:63` — `D-79 "Tests of the audit use controlled responses to force errors, and an unreadable real response fails the audit"`

## Pairs added or rewritten, for the human to accept at the merge

**D-28** (rewritten: the clause "use full-compliance source invariants" is now held by tests)

- complies: general and four kind guidelines follow the pinned templates, retain the stated deferrals and direct test authors to the testing guidelines, with no transitional per-file no-regression invariant beside the full-compliance source invariants
- violates: unchanged ("a stylesheet exemplar or guidelines of their own for stylesheets, automatic Python formatting, a transition-debt check or another departure from the templates, introduced without a new decision")

**D-29** (rewritten: both old examples spoke of the part `eslint-source-rules` holds; the lead-in now reads "with the part no invariant holds")

- complies: a version of ESLint, @eslint/js, typescript-eslint or globals changed in the root `package.json` and `package-lock.json` together with a human-accepted change of this decision;
- violates: a rule from outside the sets of @eslint/js and typescript-eslint added to `eslint.config.mjs`, or a newer typescript-eslint or globals installed, without a human-accepted change of this decision; the parser moved off the TypeScript API 6.0.2, or ESLint installed in an npm package of its own.

**D-32** (`complies:` rewritten: "formatted by Prettier" is held by the invariant)

- complies: a new browser module with no `prettier-ignore` comment, with `prettier.config.mjs` still setting no option;
- violates: unchanged ("a `// prettier-ignore` comment, or an option added to `prettier.config.mjs`.")

**D-77** (rewritten: the old examples spoke of the focused selection, which the tests now hold)

- complies: the full gate run before a request; a new test that waits for a process or a server within a time limit of its own
- violates: treating a focused pass as the full gate before a request; a configuration file that limits the whole run; a new test that waits for a process with no limit of its own

**D-30** (added by R2; lead-in "An agent compares a change with the part no invariant holds:")

- complies: a rule moved between the blocking set and the fourteen examples of `ruff.toml`, or another version of Ruff required there, together with a human-accepted change of this decision
- violates: a rule removed from `select` in `ruff.toml`, preview turned on or `required-version` dropped, with no change of this decision; a directory of code added to the excludes of `ruff.toml`

**D-33** (added by R2; lead-in "An agent compares a change with the part no invariant and no test holds:")

- complies: the audit run by the local pinned npm with the flags of this decision, `--include=dev`, `--include=optional` and `--include=peer` among them, against the public npm registry
- violates: an audit that leaves out development, optional or peer dependencies, asks another registry or runs an npm fetched when the check runs; a scheduled job that raises the threshold above low; an audit that sends the application's code

**D-79** (added by R2, as the first report proposed; lead-in "An agent compares a change with the part no test holds:")

- complies: a change to the audit's reading of the npm report, checked by the real audit of the gate and by a test with a controlled response
- violates: a separate contract test of the registry's response added beside the audit, or the real audit taken out of the gate

**D-83** (added by R2; lead-in "An agent compares a change with the part no invariant holds:")

- complies: a new Node test named `*.test.mjs` in an existing directory of tests; a new `test_*.py` file counted as covered once a run of the gate shows it executed
- violates: a new test named `*.spec.mjs` or written for another test runner; a new `test_*.py` file in a new directory counted as covered by its name alone, with no run of the gate showing it executed

### Re-check by ruling R2

| Decision | Unheld part | Pair at the base | Outcome |
|---|---|---|---|
| D-30 | yes (`ruff.toml` content, S3) | none | pair added |
| D-31 | yes (unnamed scripts, directives, S3) | yes, speaking only of the unheld part | unchanged |
| D-33 | yes (npm and its flags, registry, threshold review, extent) | none | pair added |
| D-79 | yes (S1) | none | pair added |
| D-83 | yes (S1, S2 second clause) | none | pair added |
| D-94 | yes (S1, S3) | yes, speaking only of S1 and S3 | unchanged |
| D-95 | yes (whole) | yes | unchanged |

No decision of the slice is held in whole by tests and invariants, so no pair was removed by this ruling.

## Choices, with the way rejected

1. **An invariant test carries no line `decision:` for the part that its own invariant, derived from the same decision, already states.** The orchestrator accepted this as ruling R1. For example, `test_eslint_gives_every_scope_file_the_rule_sets` gets no D-29 line, and `test_counts_each_advisory_of_low_or_higher_severity` gets no D-33 line. It does get a line for a sentence of another decision (D-28, D-77, D-79) and for a part beyond its invariant's text (D-32's HTML and CSS).
   - Why: the template, "Decision or invariant", says "a sentence so held [by a line `decision:`] gets no invariant derived from the decision". The branch's own precedent for D-390 in `tests/quality/test_docker_gate.py` does the same: its tests of `gate-docker-start-waits-once` (lines 260, 277) carry no D-390 line.
   - Rejected: a line on every invariant test as well, which item 3 of the plan read literally asks for. Then the `tests:` clause would repeat what `invariants:` names.
   - Cost if wrong: about six more lines (D-29 on 4 cases, D-33 on 2 cases, D-77 on 3 cases, D-83 on 1, D-94 on 1, D-30 and D-31 on 1 each), plus a `tests:` clause in D-30, D-31, D-83 and D-94. That is cheap to add in a retry.
2. **The quotation runs from the start of the sentence to the end of the part the test holds.** It does not stop at the shortest three words. So D-77's focused cases quote the whole first sentence, and the D-32 line quotes through the HTML and CSS clause.
   - Rejected: a quotation of three words, which tells the reader of the test nothing.
3. **Where a held part is in the middle of a sentence, the quotation still begins at the sentence's start and runs through that part.** For example, D-79's second sentence is quoted whole for both audit cases, and the `tests:` clause names the part held.
4. **The wording of the `tests:` clauses** names behaviour, not tests, as the template asks. D-77's clause contains the command `npm test`. That is a command, not a path, a test name or a number.

## Concerns

1. **Settled by R2:** D-30, D-33, D-79 and D-83 were partly held with no pair. Each now carries a pair for the part nothing holds; the pairs are listed above.
2. **D-28 is broader than the code** (wording not changed, as the plan requires):
   - "The general coding quality checks cover all code": ESLint and Prettier reach only the five parts of D-29 and D-32. TypeScript and JavaScript of agent-workflow, the play skill's scripts, are left out on purpose, according to D-29's *Rejected*.
   - Its `complies:` speaks of "four kind guidelines", while `guidelines/coding.md` lists ten kinds. I kept these words as they were.
3. **The invariant `eslint-source-rules` names ESLint 10.12.0, but its test runs whichever ESLint is installed.** I counted the ESLint version as held by the invariant's text. For that reason D-29's `violates:` names typescript-eslint and globals, not ESLint. Its `complies:` does name an ESLint version change.
4. **The handoff says "Earlier slices have added lines `decision:`".** The branch has no commit beyond the base `394ca859`, so this slice is the first. I followed the form of the D-390 and D-406 lines already on `main` instead. Small mismatch, adapted.

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/slice.md`: the method's row for a slice names it.
- `.the-way/elements/common/foundation_check.py`: a search for how it checks a line `decision:`, to know what the check validates.
- To judge what each test would fail on, I read these files: `tests/quality/gate_fixture.py`, `tests/quality/eslint-rule-sets.mjs`, `scripts/audit_dependencies.py`, `scripts/test.py`, `eslint.config.mjs`, `ruff.toml`, `prettier.config.mjs`, `stryker.config.json`, the `package.json` lines of the tools, `requirements-quality.in`.
- Also, as candidates found by the search of `tests/` by content: `tests/invariants/test_application_package_layout.py`, `tests/quality/test_docker_gate.py:300-376` with its lines `invariant:` and `decision:`, `tests/view/memory-limit.test.mjs:1-40`, and the invariant `gate-docker-start-waits-once`, read for the precedent of choice 1.
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/task-frozen.md`: I read it whole, beyond the three passages the *Read* names. The slice method says a slice opens only its passages. Nothing outside them changed what I did.

## Working copies

`.runs/executor-1/` held the outputs of the foundation check on the base and after the edits, plus the logs and exit codes of the six focused runs. I removed it before returning. For the R2 addition, `.runs/executor-1/` held the output of the foundation check again, and I removed it again before returning. I made no worktree, clone or script.

## Unread material

- `guidelines/testing.md`: read whole, in two pages (1-352, 353-477).
- `.the-way/elements/decisions/template.md`: read 105-264, which covers the *Read*'s 111-127, 162-166 and 220-260; the rest of the file not read.
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md`: not opened. Its lines 16-74 and 77-86 come copied word for word in the handoff.
- Everything else the dispatch names: read whole.

## Searches not found or unclear

- No test checks the pinned versions of ESLint, @eslint/js, typescript-eslint, globals, the TypeScript API, Ruff, ShellCheck, Prettier or npm. I searched `tests/` for each version number.
- No test checks `linterOptions.noInlineConfig` itself, `prettier.config.mjs` setting no option, `checkers: []` of `stryker.config.json`, or the rule selection of `ruff.toml`.
- Unclear: whether a sentence that describes a test itself can be held by that test, on the criterion "it would fail if the code broke the sentence". Examples are D-29's "a test keeps its file patterns to that scope …" and D-79's "Tests of the audit use controlled responses". I judged D-29's sentence held through the invariant. D-79's case holds that sentence only through its second clause.
