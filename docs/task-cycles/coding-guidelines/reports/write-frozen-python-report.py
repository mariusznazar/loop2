from pathlib import Path
import json
import subprocess

reports = Path('.runs/task-cycles/coding-guidelines/reports')
parts = []
for path in ('scripts/check_eslint.py', 'scripts/check_ruff.py', 'scripts/check_shellcheck.py',
             'scripts/quality_support.py', 'tests/quality/test_eslint_checks.py',
             'tests/quality/test_format_check.py', 'tests/quality/test_quality_support.py'):
    result = subprocess.run(['git', 'diff', '--numstat', '--', path], capture_output=True,
                            check=True, text=True, encoding='utf-8')
    added, removed, name = result.stdout.strip().split('\t')
    parts.append(f'| `{name}` | {added} | {removed} |')
checks = []
for stem in ('frozen-python-red', 'frozen-python-green', 'frozen-python-focused',
             'frozen-python-eslint-trace-green', 'frozen-python-eslint-focused-green',
             'frozen-python-changed-ruff', 'frozen-python-changed-ruff-final',
             'frozen-python-preservation', 'frozen-python-live-eslint-config',
             'frozen-python-live-shellcheck', 'frozen-python-live-ruff',
             'frozen-python-diff-check'):
    evidence = json.loads((reports / (stem + '.txt.json')).read_text(encoding='utf-8'))
    command = subprocess.list2cmdline(evidence['command'])
    checks.append(f'### {stem}\n\nExit: **{evidence["exit_code"]}**. Exact argv: '
                  f'[{stem}.txt.json]({stem}.txt.json). Complete combined stdout/stderr: '
                  f'[{stem}.txt]({stem}.txt).\n\n```text\n{command}\n```\n')
text = '''# Frozen Python method correction

Status: DONE_WITH_CONCERNS at the independent foundation/check-method correction boundary.
Product/configuration work is not resumed by this report. Root owns the next independent review.
Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`, branch `task/coding-guidelines`.
Input HEAD: `a9080ce`. Final commit: COMMIT_PENDING.
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
''' + '\n'.join(parts) + '''

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

''' + '\n'.join(checks)
(reports / 'frozen-python-live-report.md').write_text(text, encoding='utf-8', newline='\n')
print('report written')
