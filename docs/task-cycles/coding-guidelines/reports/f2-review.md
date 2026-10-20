# Spec Compliance

**❌ Issues found:** the three assigned files implement the requested methods and adversarial fixtures, but one blanket-suppression spelling can receive a successful source verdict. See Important 1.

**Reviewed range:** `5f7d31cb7a6e2d274d996f22577f84050f4d3b2e..103bddd04584d25ea93f64d3aace328666250845`.

**⚠️ Integration remains unverified:** both actual methods exit 2 with `invariant: null` before loading ESLint because the adopted dependency is not yet declared. This is the stage's expected inability, not enforcement acceptance. Real type-aware linting, parser/API resolution, normalized option equivalence, actual configuration coverage and final good/bad/deliberate-break cases still require verification after installation/configuration.

## Strengths

- The independent membership in `scripts/check_eslint.py:16–165` is compared to the whole authoritative fact sentences by `tests/quality/test_eslint_checks.py:25`; it does not import the configuration under test as its expected set.
- `scripts/check_eslint.py:196` validates coverage and schema before judgment, and `:250` compares complete active levels/options against an isolated baseline. The malformed/incomplete oracle fixtures target real false-pass mechanisms.
- `scripts/inspect_eslint.mjs:12–17` disables inline application, bulk suppressions, fixes and cache. AST comments avoid confusing directive-like strings with real comments. The separate source engine does not inherit weakened configured rules.
- `tests/quality/test_eslint_checks.py:153` exercises actual Git discovery of new owned nested paths. The unavailable-tool cases verify null-invariant records rather than treating inability as success.

## Issues

### Critical

None found in the assigned scope.

### Important 1 — Empty parsed rule lists must mean blanket suppression

**Scope:** in scope; new thread.

**Anchor:** [scripts/inspect_eslint.mjs:107](C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/scripts/inspect_eslint.mjs:107), consumed by [scripts/check_eslint.py:264](C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/scripts/check_eslint.py:264).

**Copyable comment:** A comment such as `/* eslint-disable , */` disables every rule in ESLint, but this branch serializes its empty parsed list as `[]`, which `source_ok` accepts. Normalize the parsed list by its length, recording `null` when it contains no rule names, and add a regression case for comma-only blanket directives.

**Why this is reported:** This branch exists to detect prohibited source directives even when the file currently has no blocking diagnostic. It tests whether the raw directive value is nonempty, rather than whether parsing produced any rule names. For the value `,`, `parseListConfig` produces an empty map; the bridge emits `disabledRules: [[]]`, and Python's intersection with the adopted names is empty. The source check then returns true for an otherwise clean file holding a blanket suppression. The [pinned ESLint implementation](https://raw.githubusercontent.com/eslint/eslint/v10.12.0/lib/linter/linter.js) at lines 226–227 explicitly converts an empty parsed list to a null rule ID, meaning all rules. The parser's [official implementation](https://raw.githubusercontent.com/eslint/rewrite/main/packages/plugin-kit/src/config-comment-parser.js) drops empty comma-separated names. This contradicts `eslint-source-rules/1` independently of whether a diagnostic happens to be present.

The focused probe exercised the actual bridge and Python judgment with a narrow ESLint/parser double and obtained bridge exit 0, `disabledRules: [[]]`, and `actual_source_ok: true` against expected false. It does not claim real installed ESLint conformance; the pinned ESLint source establishes the blanket-disable semantics. Parse the rule list once, serialize its names when nonempty and `null` otherwise. Cover `eslint-disable`, `eslint-disable-next-line` and `eslint-disable-line` using this shared handling. The independent lint engine would still report a real violation, so this finding concerns acceptance of the prohibited suppression itself, not a demonstrated hidden diagnostic.

**Evidence:** [probe script](f2-review-probe.py), [complete combined output](f2-review-probe.txt), [exact argv and exit metadata](f2-review-probe.txt.json). Command: `python -B .runs/task-cycles/coding-guidelines/reports/f2-review-probe.py`; actual exit **1**, deliberately signaling the reproduced false pass.

### Minor 2 — Capture expected inability output inside the fixtures

**Scope:** in scope; new thread; nonblocking.

**Anchor:** [tests/quality/test_eslint_checks.py:195](C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/tests/quality/test_eslint_checks.py:195) and [tests/quality/test_eslint_checks.py:206](C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/tests/quality/test_eslint_checks.py:206).

**Copyable comment:** These expected-failure tests emit five fail/null-invariant records directly into an otherwise successful unittest run, including a fabricated warning. Capture the output around these calls, while keeping the assertions on the recorded result, so successful suite output does not resemble a live invariant failure.

**Why this is reported:** The tests correctly verify unavailable-tool and malformed-result handling. Their calls also print records intended for the method's operator, so the final focused and complete-quality outputs interleave `verdict: fail` records and a synthetic `warning` with passing test progress. This does not invalidate the tests or their reported exit 0, but it adds misleading failure noise to every successful run and makes a real new tool warning harder to distinguish. Redirect stdout/stderr for these expected-error calls and, if useful, assert on the captured content. The real method's operator output should remain intact.

**Evidence:** [focused output](f2-final-focused.txt), [complete-quality output](f2-final-quality.txt).

## Selection and scope checks

- The pinned checkout and gitlink both resolve to `d829e3aa6242a9b8901274531dd82fd5c7d87628`.
- Read the reviewer contract, exact Superpowers 6.4.1 task-reviewer template, handoff, author report, whole assigned invariant entries, D-29 and both linked membership facts, complete part map, guideline reading procedure and coding template. Read D-28's whole entry for the build/test exemplar deferral and the two current application tsconfigs for the actual type-aware interface.
- All three changed paths belong to build-tools. The methods read the four parts D-29 names. No product guidelines exist yet; creating them belongs to this task's later stages, so none could be selected for whole reading. D-28 expressly defers separate building/test exemplars. No selection expansion is needed, and there is no UI change requiring screenshots.
- Read the complete assigned diff. The initial batched tool output truncated its beginning, so the omitted Python/bridge portions were retrieved in bounded chunks from the same diff package. No changed product file was separately reopened. Reviewed implementation and ignored report/document claims in separate passes.
- Named checks outside the diff: the helper's advertised discovery/run interfaces were read in F1's report because the adapters depend on them; tsconfigs were read to assess type-aware coverage; official pinned ESLint code was inspected to verify constructor suppression options, default-option normalization and directive semantics. The option-normalization and line-comment restrictions agree with the [pinned config implementation](https://raw.githubusercontent.com/eslint/eslint/v10.12.0/lib/config/config.js) and [pinned SourceCode implementation](https://raw.githubusercontent.com/eslint/eslint/v10.12.0/lib/languages/js/source-code/source-code.js). This is source inspection, not a successful live integration run.
- The D-29 parser dependency check resolves the actual TypeScript API from typescript-estree and requires 6.0.2; it does not invent an alias-name requirement. Treating identical normalized declarations as redundant is consistent with the supplied authoritative clarification. No separate concern found in these two choices.

## Evidence and sharpness

Author evidence was read, not regenerated. [Focused command metadata](f2-final-focused.txt.json) records `python -m unittest discover -s tests/quality -p test_eslint_checks.py`, exit **0**, and the complete output shows **15 tests** passing. Complete quality output shows **32 tests** passing. The weakest-point red/green records genuinely show the incomplete/off/warn oracle cases changing from three failed assertions to a successful focused run; that closes those routes, not all suppression routes.

The source command `python -B scripts/check_eslint.py --record .runs/eslint.jsonl` actually exited **2**; [full output](f2-final-live-source.txt), [metadata](f2-final-live-source.txt.json). The configuration command `python -B scripts/check_eslint.py --configuration --record .runs/eslint-configuration.jsonl` actually exited **2**; [full output](f2-final-live-config.txt), [metadata](f2-final-live-config.txt.json). Both outputs contain null-invariant inability records because ESLint is not declared at the adopted version.

The only new executable check was the narrow suppression probe above, answering a doubt absent from the author's fixtures. No suite was rerun. No product edits, installs, index/branch/commit changes, external writes, server actions or subagents occurred. The relevant boundary is converting source/configuration inspection into a gate verdict: a false pass can certify a prohibited source directive. No application-state or irreversible change is present in this diff.

## Assessment

**Task quality: Needs fixes.** Independent expectation derivation, discovery and fail-closed reporting are well structured, but Important 1 leaves a concrete false-pass route in the source invariant. Minor 2 is retained as nonblocking output hygiene. Final live invariant acceptance and the actual good/bad/deliberate-break integrations remain unchecked until the adopted dependencies and configuration exist.
