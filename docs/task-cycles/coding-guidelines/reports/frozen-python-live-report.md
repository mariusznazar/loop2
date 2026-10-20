# Frozen Python method correction

Status: DONE_WITH_CONCERNS at the independent foundation/check-method correction boundary.
Product/configuration work is not resumed by this report. Root owns the next independent review.
Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`, branch `task/coding-guidelines`.
Input HEAD: `a9080ce`. Final commit: `b0e3d4f93889cf7b4ffa5405cf386a8640885c03` (range `a9080ce..b0e3d4f`).
Pinned `.the-way`: `d829e3aa6242a9b8901274531dd82fd5c7d87628`, verified against the gitlink.

## Scope and sources

Read the full handoff and author contract, product AGENTS.md/CLAUDE.md, pinned common
way_of_working.md and product-guidelines/reading.md, the complete part map, current decision
Scope fields (wrapped values included), selected decisions/invariants and authoritative facts,
product glossary and pinned the-way glossary, all seven changed files and their affected
focused tests. Read Superpowers 6.4.1 test-driven-development and writing-good-tests.md,
subagent-driven-development/implementer-prompt.md, and the user's code-review playbook for
self-review. The source failure is `s2-live-ruff.txt` / `s2-live-ruff.txt.json`, actual exit 1.
No subagents, product configuration changes, external writes, server access, deployment, push,
or 10x sources were used.

Touched part: **build-tools**, assigned by `scripts/**` and `tests/quality/**` in
foundations/part_map.md. Its shared verdict boundary serves every quality adapter. It reaches
no new player-facing screen and changes no trust boundary, critical flow, package or tool pin.

The complete current Scope inspection selects D-01/1, D-02/1, D-03/2, D-04/3, D-05/3,
D-06/3, D-27/1 and D-28/1 through D-33/1 for build-tools (foundations/decisions.md at lines
3, 20, 509, 467, 240, 767, 787, 823, 841, 857, 873, 889, 905 respectively). These entries
were read whole; there is no missing expected Scope match. Linked D-07/1, D-08/1 and D-22/1
were also read. Current invariant Part fields, including every, were inspected. Relevant
quality entries are eslint-source-rules/1, eslint-configuration-rules/1, ruff-source-rules/1,
shellcheck-source-rules/1, prettier-source-format/1 and introduced-npm-vulnerabilities/1
(foundations/invariants.md:390 onward), with their complete authoritative facts
eslint-recommended-rules/1, typescript-eslint-typechecked-rules/1, ruff-default-rules/1 and
shellcheck-default-bash-checks/1 (foundations/environment_facts.md:138 onward).
Whole-foundation keyword search included Python/Bash, Ruff/ShellCheck, ESLint/Prettier,
quality, unavailable and exception, across all five files. It located those same rules,
ownership and facts and no additional rule needing change. No binding entry changed.

Guideline selection stays **empty under the current creation-task exception**, verified by
actual absence of `guidelines/`. D-28 explicitly defers building/test exemplar kinds and
Python/Bash automatic formatting; no Python guideline or new test kind was invented. This is
code in build-tools, not an absence of code. The encompassing task still owes the general
coding guidelines. No selection discrepancy or new foundation meaning was found.

Root expanded the initial five-file set plus optional support tests by narrowly authorizing
tests/quality/test_eslint_checks.py: two existing tests consumed the whole stderr stream as
one JSON value. The invariant requires the JSONL record, not JSON-only diagnostic stderr;
those assertions now require a traceback and matching error description before the final
exact JSON record. This makes seven authorized changed files. Other review findings stay out.

## Changes, choices and cost

- Replace four static split strings with list literals. JS_RULES remains an ordered list of
  64, TS_ADDITIONS of 47, TS_DISABLED of 26 and BLOCKING of 393, without duplicates. Retaining
  the old strings keeps the SIM905 violation; literal lists add punctuation and some Ruff-list
  lines without runtime or maintenance policy changes. No membership was inferred from tool
  configuration. The preservation check evaluates old source against HEAD and the new AST,
  proves ordered equality, hashes each complete sequence and proves all other AST in those
  two method files unchanged. It also compares Ruff's set to the 407-rule fact minus the
  exact 14 adopted examples. Existing ESLint fact-based membership test passed.
- Return the Bash shebang predicate directly, preserving interpreter-before-suffix behavior
  and the original fallback. Keeping the old branch leaves SIM103; the direct predicate adds
  no alternate language policy. Existing new/extensionless/suffix/directive cases passed,
  and actual ShellCheck passed.
- Bind the formatter fixture's loop payload as a keyword default. Callback invocation remains
  unchanged; each fake result now retains its iteration's payload if invoked later. Existing
  malformed/incomplete-result cases all passed. No new mirror test was added.
- Keep the exact `(Exception, KeyboardInterrupt)` catch and add named-logger exception reporting.
  The record object, description, final JSON stderr line, return codes 0/1/2, record overwrite,
  closure and propagation of SystemExit/GeneratorExit/other BaseException remain unchanged.
  Failure stderr now also contains the traceback. This is an observable diagnostics change.
  The named logger uses normal logging fallback in the CLI, with no basicConfig, handler
  mutation or retained redirected stream. Two successive redirected invocations are tested.
  A custom logging protocol or per-call handler adds lifecycle/configuration code without a
  demonstrated need. Narrowing the catch loses unexpected failure normalization. A proposed
  BaseException filter was withdrawn before implementation because it only avoided detection
  while adding broad control flow; no such code is in the diff.

The [pinned Ruff BLE001 source](https://raw.githubusercontent.com/astral-sh/ruff/0.17.1/crates/ruff_linter/src/rules/flake8_blind_except/rules/blind_except.rs)
explains the danger of masking exceptions and expressly accepts logging that carries their
tracebacks. The implemented exception call reports that trace, rather than disguising the
catch or suppressing the rule. All 393 rules, including BLE001, still apply unchanged.

## Changed lines

Added/removed counts are from `git diff --numstat a9080ce` before the explicit-path commit.

| File | Added | Removed |
|---|---:|---:|
| `scripts/check_eslint.py` | 59 | 143 |
| `scripts/check_ruff.py` | 45 | 31 |
| `scripts/check_shellcheck.py` | 2 | 4 |
| `scripts/quality_support.py` | 5 | 0 |
| `tests/quality/test_eslint_checks.py` | 10 | 2 |
| `tests/quality/test_format_check.py` | 1 | 1 |
| `tests/quality/test_quality_support.py` | 59 | 0 |

All script rewrites used byte reads/writes, retaining existing working-file line endings.
The new subprocess source's literal newline escape was checked after writing. Git emits its
existing LF-to-CRLF checkout warnings; `git diff --check` reports no whitespace error.
No `.runs` or `.superpowers` record belongs to the commit.

## TDD and focused verification

The diagnostics behavior test was written first. RED ran three tests: two diagnostic tests
failed in four subcases because no traceback existed; the BaseException propagation
characterization already passed. The failures were assertion failures at the intended missing
trace, not setup errors. GREEN passed all three after the logging call. The regular exception
and KeyboardInterrupt are exercised through real fresh Python processes; tests assert exit 2,
empty stdout, traceback/function frame, exact JSONL schema and exact final JSON stderr record.

The full focused quality domain was run once: **119 tests, exit 1**, with exactly two failures
in the expanded ESLint assertions. Those assertions initially treated the qualified exception
name in the traceback as a whole-list element; record descriptions retain the short class
name. The correction matches the exact description within traceback text, still requires
traceback and logger message, and compares the final object exactly. The two targeted tests
then passed, and the complete ESLint suite was rerun: **20 tests, exit 0**. The other 99 tests
passed in the initial domain run. Thus all 119 distinct quality tests have passing evidence
across the initial domain run and the corrected ESLint rerun; there is no claim that a single
final full-domain invocation was green. No other product/application suites were run under
this correction handoff's explicit bounded verification requirement.

Actual adopted Ruff checked all seven final files, with full explicit 393-rule selection and
isolation: **exit 0, empty diagnostic list**. Live ESLint configuration: **exit 0**, named pass.
Live ShellCheck: **exit 0**, named pass. Full standing Ruff: **exit 1**, still the genuine named
ruff-source-rules/1 violation, limited to the two unchanged S3 files listed below. No failure
was downgraded to unavailable or pass.

## Weakest point, sharpness and self-review

Highest sharpness is retained for unknown build-tools failure modes. The map currently records
none; that is not evidence that the shared verdict boundary is low risk. A wrong result here
could accept defects throughout the product. No network trust boundary, deployment operation,
player state or irreversible effect is introduced. Local writes remain quality result records.

The weakest point is error/unavailable classification after introducing logging. Real-process
RuntimeError/KeyboardInterrupt tests prove traceback visibility while preserving the exact
exit-2/null-invariant record. Repeated redirected stderr proves no first-call stream is held.
SystemExit(7), GeneratorExit and a plain BaseException propagate as the exact same object,
leave no verdict record or stderr output, and leave the record handle closed. Existing malformed
tool output, stderr, timeout, missing/unpinned tool, stale-pass overwrite, incomplete coverage
and no-partial-pass tests also passed. Practical limits: arbitrary embedding programs can
configure Python logging themselves; no new logger configuration promise is added. Deliberate
breaks against every final guideline case belong to the later complete-product reviewer.

Self-review read every diff hunk against the handoff and frozen rules. Constants preserve type,
sequence, set and all nonconstant code; Bash source classification has the same return values;
formatter fixtures retain synchronous results; error handling preserves caught/propagated
exception classes and record contents. The only changed runtime effect is the explicit failure
traceback. New tests exercise actual subprocess/capture behavior, not logger mocks or copied
literal membership tests. No remaining in-scope defect was found. Independent review remains
separate and has not run at this boundary.

## Failed or unchecked work and next dispatch

- Full standing Ruff remains failed by `tests/deploy/test_loop2_deploy_build.py:16` F401 and
  `tests/invariants/loop2_invariant_support.py:20` F401 plus :239 and :240 SIM115. These files
  are byte-for-byte outside this diff and remain S3 work. Their failures were present in the
  incoming live evidence and are preserved in the outgoing full-method capture.
- The first 119-test focused invocation remains recorded as exit 1; its two failures were
  corrected and the full 20-test owning suite rerun successfully. No unresolved focused failure.
- Broad application/deployment suites, live Prettier/source ESLint, screenshots, final
  deliberate breaks and guideline-case acceptance are unchecked here: no application,
  deployment, formatter implementation or screen changed, and the handoff reserves final
  complete-product acceptance to its reviewer. Fixture tests are not claimed as live passes.
- Root should dispatch independent review of this seven-file commit before product work resumes.

## Captured checks

Each check below ran from the stated task worktree through `capture.py`. The `.txt` is the
complete combined stdout/stderr; the adjacent JSON holds exact argv, actual exit and duration.
Commands are reproduced from those JSON records without shell reconstruction. The 393-rule
argument is intentionally complete in the two direct Ruff records.

### frozen-python-red

Exit: **1**. Exact argv: [frozen-python-red.txt.json](frozen-python-red.txt.json). Complete combined stdout/stderr: [frozen-python-red.txt](frozen-python-red.txt).

```text
python -B -m unittest tests.quality.test_quality_support.QualitySupportTests.test_unavailable_reports_traceback_and_preserves_structured_record tests.quality.test_quality_support.QualitySupportTests.test_each_failure_reports_to_current_stderr tests.quality.test_quality_support.QualitySupportTests.test_noninterrupt_base_exceptions_propagate_without_a_verdict
```

### frozen-python-green

Exit: **0**. Exact argv: [frozen-python-green.txt.json](frozen-python-green.txt.json). Complete combined stdout/stderr: [frozen-python-green.txt](frozen-python-green.txt).

```text
python -B -m unittest tests.quality.test_quality_support.QualitySupportTests.test_unavailable_reports_traceback_and_preserves_structured_record tests.quality.test_quality_support.QualitySupportTests.test_each_failure_reports_to_current_stderr tests.quality.test_quality_support.QualitySupportTests.test_noninterrupt_base_exceptions_propagate_without_a_verdict
```

### frozen-python-focused

Exit: **1**. Exact argv: [frozen-python-focused.txt.json](frozen-python-focused.txt.json). Complete combined stdout/stderr: [frozen-python-focused.txt](frozen-python-focused.txt).

```text
python -B -m unittest discover -s tests/quality -p test_*.py
```

### frozen-python-eslint-trace-green

Exit: **0**. Exact argv: [frozen-python-eslint-trace-green.txt.json](frozen-python-eslint-trace-green.txt.json). Complete combined stdout/stderr: [frozen-python-eslint-trace-green.txt](frozen-python-eslint-trace-green.txt).

```text
python -B -m unittest tests.quality.test_eslint_checks.EslintChecks.test_missing_node_has_no_named_verdict_and_overwrites_old_pass tests.quality.test_eslint_checks.EslintChecks.test_tool_errors_and_malformed_json_never_become_success
```

### frozen-python-eslint-focused-green

Exit: **0**. Exact argv: [frozen-python-eslint-focused-green.txt.json](frozen-python-eslint-focused-green.txt.json). Complete combined stdout/stderr: [frozen-python-eslint-focused-green.txt](frozen-python-eslint-focused-green.txt).

```text
python -B -m unittest tests.quality.test_eslint_checks
```

### frozen-python-changed-ruff

Exit: **0**. Exact argv: [frozen-python-changed-ruff.txt.json](frozen-python-changed-ruff.txt.json). Complete combined stdout/stderr: [frozen-python-changed-ruff.txt](frozen-python-changed-ruff.txt).

```text
.runs/quality-venv/Scripts/ruff.exe check --isolated --no-preview --no-fix --no-cache --ignore-noqa --output-format=json --select ASYNC100,ASYNC105,ASYNC115,ASYNC116,ASYNC210,ASYNC220,ASYNC221,ASYNC222,ASYNC230,ASYNC251,B002,B003,B004,B005,B006,B008,B009,B010,B012,B013,B014,B015,B016,B017,B018,B019,B020,B021,B022,B023,B025,B026,B029,B030,B031,B032,B033,B035,B039,BLE001,C400,C401,C402,C403,C404,C405,C406,C408,C409,C410,C411,C413,C414,C415,C417,C418,C419,D419,DTZ002,DTZ003,DTZ004,E722,E902,EXE001,EXE002,EXE004,EXE005,F401,F402,F404,F406,F407,F501,F502,F503,F504,F505,F506,F507,F508,F509,F521,F522,F523,F524,F525,F541,F601,F602,F621,F622,F631,F632,F633,F634,F701,F702,F704,F706,F707,F811,F821,F822,F823,F841,F842,F901,FA100,FA102,FLY002,FURB105,FURB122,FURB129,FURB132,FURB136,FURB157,FURB161,FURB162,FURB163,FURB166,FURB168,FURB169,FURB177,FURB181,FURB188,G010,G101,G201,G202,INT001,INT002,INT003,LOG001,LOG002,LOG009,LOG014,LOG015,N999,PERF101,PERF102,PERF402,PGH005,PIE790,PIE794,PIE796,PIE800,PIE804,PIE807,PIE810,PLC0105,PLC0131,PLC0132,PLC0205,PLC0206,PLC0208,PLC0414,PLC3002,PLE0100,PLE0101,PLE0115,PLE0116,PLE0117,PLE0118,PLE0303,PLE0304,PLE0305,PLE0307,PLE0308,PLE0309,PLE0604,PLE0605,PLE0643,PLE0704,PLE1132,PLE1142,PLE1205,PLE1206,PLE1300,PLE1307,PLE1310,PLE1507,PLE1519,PLE1520,PLE1700,PLE2502,PLE2510,PLE2512,PLE2513,PLE2514,PLE2515,PLR0124,PLR0133,PLR0206,PLR1704,PLR1708,PLR1711,PLR1716,PLR1722,PLR1730,PLR1733,PLR1736,PLR2044,PLW0120,PLW0127,PLW0128,PLW0129,PLW0131,PLW0133,PLW0177,PLW0211,PLW0245,PLW0406,PLW0602,PLW0604,PLW0642,PLW0711,PLW1501,PLW1507,PLW1508,PLW1509,PLW2101,PT010,PT014,PT020,PT025,PT026,PT031,PTH124,PTH210,PYI001,PYI002,PYI003,PYI004,PYI005,PYI006,PYI007,PYI008,PYI009,PYI010,PYI012,PYI013,PYI015,PYI016,PYI017,PYI018,PYI019,PYI020,PYI025,PYI026,PYI029,PYI030,PYI032,PYI033,PYI034,PYI035,PYI036,PYI041,PYI042,PYI043,PYI044,PYI045,PYI046,PYI047,PYI048,PYI049,PYI050,PYI052,PYI055,PYI057,PYI058,PYI059,PYI061,PYI062,PYI063,PYI064,PYI066,RET501,RUF008,RUF009,RUF010,RUF013,RUF015,RUF016,RUF017,RUF018,RUF019,RUF020,RUF022,RUF023,RUF024,RUF026,RUF028,RUF030,RUF032,RUF033,RUF034,RUF040,RUF041,RUF046,RUF048,RUF049,RUF051,RUF053,RUF057,RUF058,RUF063,RUF068,RUF101,RUF200,S102,S110,S112,SIM101,SIM103,SIM107,SIM113,SIM114,SIM115,SIM118,SIM201,SIM202,SIM208,SIM210,SIM211,SIM220,SIM221,SIM222,SIM223,SIM401,SIM905,SIM911,T100,TC004,TC005,TC007,TC010,TRY002,TRY004,TRY201,TRY203,TRY401,UP001,UP003,UP004,UP005,UP006,UP007,UP008,UP009,UP010,UP011,UP012,UP014,UP017,UP018,UP019,UP020,UP021,UP022,UP023,UP024,UP025,UP026,UP028,UP029,UP030,UP032,UP033,UP034,UP035,UP036,UP037,UP039,UP040,UP041,UP043,UP044,UP045,UP046,UP047,UP049,UP050,W605,YTT101,YTT102,YTT103,YTT201,YTT202,YTT203,YTT204,YTT301,YTT302,YTT303 -- scripts/check_eslint.py scripts/check_ruff.py scripts/check_shellcheck.py scripts/quality_support.py tests/quality/test_format_check.py tests/quality/test_quality_support.py tests/quality/test_eslint_checks.py
```

### frozen-python-changed-ruff-final

Exit: **0**. Exact argv: [frozen-python-changed-ruff-final.txt.json](frozen-python-changed-ruff-final.txt.json). Complete combined stdout/stderr: [frozen-python-changed-ruff-final.txt](frozen-python-changed-ruff-final.txt).

```text
.runs/quality-venv/Scripts/ruff.exe check --isolated --no-preview --no-fix --no-cache --ignore-noqa --output-format=json --select ASYNC100,ASYNC105,ASYNC115,ASYNC116,ASYNC210,ASYNC220,ASYNC221,ASYNC222,ASYNC230,ASYNC251,B002,B003,B004,B005,B006,B008,B009,B010,B012,B013,B014,B015,B016,B017,B018,B019,B020,B021,B022,B023,B025,B026,B029,B030,B031,B032,B033,B035,B039,BLE001,C400,C401,C402,C403,C404,C405,C406,C408,C409,C410,C411,C413,C414,C415,C417,C418,C419,D419,DTZ002,DTZ003,DTZ004,E722,E902,EXE001,EXE002,EXE004,EXE005,F401,F402,F404,F406,F407,F501,F502,F503,F504,F505,F506,F507,F508,F509,F521,F522,F523,F524,F525,F541,F601,F602,F621,F622,F631,F632,F633,F634,F701,F702,F704,F706,F707,F811,F821,F822,F823,F841,F842,F901,FA100,FA102,FLY002,FURB105,FURB122,FURB129,FURB132,FURB136,FURB157,FURB161,FURB162,FURB163,FURB166,FURB168,FURB169,FURB177,FURB181,FURB188,G010,G101,G201,G202,INT001,INT002,INT003,LOG001,LOG002,LOG009,LOG014,LOG015,N999,PERF101,PERF102,PERF402,PGH005,PIE790,PIE794,PIE796,PIE800,PIE804,PIE807,PIE810,PLC0105,PLC0131,PLC0132,PLC0205,PLC0206,PLC0208,PLC0414,PLC3002,PLE0100,PLE0101,PLE0115,PLE0116,PLE0117,PLE0118,PLE0303,PLE0304,PLE0305,PLE0307,PLE0308,PLE0309,PLE0604,PLE0605,PLE0643,PLE0704,PLE1132,PLE1142,PLE1205,PLE1206,PLE1300,PLE1307,PLE1310,PLE1507,PLE1519,PLE1520,PLE1700,PLE2502,PLE2510,PLE2512,PLE2513,PLE2514,PLE2515,PLR0124,PLR0133,PLR0206,PLR1704,PLR1708,PLR1711,PLR1716,PLR1722,PLR1730,PLR1733,PLR1736,PLR2044,PLW0120,PLW0127,PLW0128,PLW0129,PLW0131,PLW0133,PLW0177,PLW0211,PLW0245,PLW0406,PLW0602,PLW0604,PLW0642,PLW0711,PLW1501,PLW1507,PLW1508,PLW1509,PLW2101,PT010,PT014,PT020,PT025,PT026,PT031,PTH124,PTH210,PYI001,PYI002,PYI003,PYI004,PYI005,PYI006,PYI007,PYI008,PYI009,PYI010,PYI012,PYI013,PYI015,PYI016,PYI017,PYI018,PYI019,PYI020,PYI025,PYI026,PYI029,PYI030,PYI032,PYI033,PYI034,PYI035,PYI036,PYI041,PYI042,PYI043,PYI044,PYI045,PYI046,PYI047,PYI048,PYI049,PYI050,PYI052,PYI055,PYI057,PYI058,PYI059,PYI061,PYI062,PYI063,PYI064,PYI066,RET501,RUF008,RUF009,RUF010,RUF013,RUF015,RUF016,RUF017,RUF018,RUF019,RUF020,RUF022,RUF023,RUF024,RUF026,RUF028,RUF030,RUF032,RUF033,RUF034,RUF040,RUF041,RUF046,RUF048,RUF049,RUF051,RUF053,RUF057,RUF058,RUF063,RUF068,RUF101,RUF200,S102,S110,S112,SIM101,SIM103,SIM107,SIM113,SIM114,SIM115,SIM118,SIM201,SIM202,SIM208,SIM210,SIM211,SIM220,SIM221,SIM222,SIM223,SIM401,SIM905,SIM911,T100,TC004,TC005,TC007,TC010,TRY002,TRY004,TRY201,TRY203,TRY401,UP001,UP003,UP004,UP005,UP006,UP007,UP008,UP009,UP010,UP011,UP012,UP014,UP017,UP018,UP019,UP020,UP021,UP022,UP023,UP024,UP025,UP026,UP028,UP029,UP030,UP032,UP033,UP034,UP035,UP036,UP037,UP039,UP040,UP041,UP043,UP044,UP045,UP046,UP047,UP049,UP050,W605,YTT101,YTT102,YTT103,YTT201,YTT202,YTT203,YTT204,YTT301,YTT302,YTT303 -- scripts/check_eslint.py scripts/check_ruff.py scripts/check_shellcheck.py scripts/quality_support.py tests/quality/test_format_check.py tests/quality/test_quality_support.py tests/quality/test_eslint_checks.py
```

### frozen-python-preservation

Exit: **0**. Exact argv: [frozen-python-preservation.txt.json](frozen-python-preservation.txt.json). Complete combined stdout/stderr: [frozen-python-preservation.txt](frozen-python-preservation.txt).

```text
python -B .runs/task-cycles/coding-guidelines/reports/frozen-python-preservation.py
```

### frozen-python-live-eslint-config

Exit: **0**. Exact argv: [frozen-python-live-eslint-config.txt.json](frozen-python-live-eslint-config.txt.json). Complete combined stdout/stderr: [frozen-python-live-eslint-config.txt](frozen-python-live-eslint-config.txt).

```text
python -B scripts/check_eslint.py --configuration --record .runs/frozen-python-eslint-configuration.jsonl
```

### frozen-python-live-shellcheck

Exit: **0**. Exact argv: [frozen-python-live-shellcheck.txt.json](frozen-python-live-shellcheck.txt.json). Complete combined stdout/stderr: [frozen-python-live-shellcheck.txt](frozen-python-live-shellcheck.txt).

```text
python -B scripts/check_shellcheck.py --record .runs/frozen-python-shellcheck.jsonl
```

### frozen-python-live-ruff

Exit: **1**. Exact argv: [frozen-python-live-ruff.txt.json](frozen-python-live-ruff.txt.json). Complete combined stdout/stderr: [frozen-python-live-ruff.txt](frozen-python-live-ruff.txt).

```text
python -B scripts/check_ruff.py --record .runs/frozen-python-ruff.jsonl
```

### frozen-python-diff-check

Exit: **0**. Exact argv: [frozen-python-diff-check.txt.json](frozen-python-diff-check.txt.json). Complete combined stdout/stderr: [frozen-python-diff-check.txt](frozen-python-diff-check.txt).

```text
git diff --check
```

## Commit evidence

Explicit-path commit succeeded, exit 0: [frozen-python-commit.txt](frozen-python-commit.txt), exact argv and exit in [frozen-python-commit.txt.json](frozen-python-commit.txt.json). Subject: `fix: make quality methods comply with adopted Ruff rules`.
