# F1 — shared foundation-check mechanics

Status: DONE at the committed F1 boundary. Implementation and focused checks are complete. The previously started broad invariant run has also completed successfully: 141 tests, exit 0. No review, dependent check implementation, merge, push or deployment was performed.

## Inputs and selection

- Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`, branch `task/coding-guidelines`; start `75a5fc91b8e74c81cba6f0aded3f2bf3752475a6`.
- Pinned the-way: gitlink and checkout both `d829e3aa6242a9b8901274531dd82fd5c7d87628`.
- Read `f1-handoff.md` and `author-contract.md` first, product AGENTS.md and CLAUDE.md, Superpowers 6.4.1 TDD and its writing-good-tests reference, and implementer-prompt.md. The cycle plan, frozen task, foundation-author reasoning/reports and excluded branches were not read.
- Read the whole current part map; the announced overall work reaches seven parts, while this stage's two files belong solely to build-tools. There is no UI change or new UI route. Screenshot verification is unchecked because this stage has no intended visible change.
- Read `.the-way/product-guidelines/reading.md`, `.the-way/elements/common/way_of_working.md`, the coding template, the runner's record implementation, and the existing application-package-layout ownership method. Read the build script to establish that generated application output is root `dist/`.
- Inspected the complete decision log's Scope fields. Current build-tools matches are D-01, D-02, D-03/2, D-04/3, D-05/3, D-06/3, D-27, D-28 through D-33; their whole entries were read. No new foundation meaning is introduced here. Read the whole six assigned invariant entries: eslint-source-rules/1, ruff-source-rules/1, shellcheck-source-rules/1, eslint-configuration-rules/1, prettier-source-format/1, introduced-npm-vulnerabilities/1. Their adopting decisions were read whole; set-membership facts are identified by those links but shared mechanics neither copy nor assert their membership. Read the product glossary and the pinned process terms used in this stage.
- Selected whole-read product guidelines: none exist. `guidelines/coding.md` is absent, as announced; this task creates it. D-28 explicitly defers separate build/test exemplars, so this stage does not create a kind guideline. No selection expansion or contradiction was found.

## Committed change and API

Range: `75a5fc91b8e74c81cba6f0aded3f2bf3752475a6..5f7d31cb7a6e2d274d996f22577f84050f4d3b2e`.

| File | Added | Removed |
|---|---:|---:|
| scripts/quality_support.py | 195 | 0 |
| tests/quality/test_quality_support.py | 178 | 0 |

The private author email was verified after commit, and `git status --short` was empty. Only these explicit paths were staged. Reports and run outputs remain ignored.

- `discover_files(root, parts) -> list[str]`: `root` must be the repository root; `parts` is an iterable of current map identifiers. Returns sorted repository-relative POSIX file paths, with no language filtering. Uses the current map, Git attribute matching with case sensitivity, tracked files and unignored untracked files. Gitlinks are excluded without traversing their contents. Root `dist/`, dependency/environment directories and run/cache artifacts are excluded. Unowned or ambiguously owned candidates anywhere in the candidate population fail discovery before requested-part filtering. Missing tracked sources, unsafe paths, symlinks, unmerged index entries, malformed records and Git warnings/errors are failures.
- `run_tool(command, *, cwd, accepted_codes=(0,), timeout=120, env=None, input=None) -> subprocess.CompletedProcess`: command arguments are a sequence; its executable must be an absolute local path. Runs without a shell or a download/installation step. `input`, where given, is bytes. Success outputs are strictly decoded UTF-8 strings, preserving line endings. The caller owns accepted exit codes, arguments, environment isolation, local version verification and output-schema validation. `env=None` inherits the environment; callers whose policy forbids external tool options must pass the appropriate environment explicitly.
- `QualityError`: inability to check. Its `.result` retains the raw process result or underlying invocation/timeout exception where available. Nonzero results outside `accepted_codes`, invalid UTF-8, missing executables and timeouts raise it. Accepted violation exit codes still require caller-side schema validation.
- `run_check(check, invariant, operation, *, record=None) -> int`: `operation` must return an actual bool after all discovery/tool/parser work finishes. True writes named pass and returns 0; False writes named fail and returns 1; invocation/parser/other ordinary exceptions or interruption write fail with `invariant: null`, describe the inability, and return 2. No named pass is written before the whole operation completes. Records overwrite prior results, use `.jsonl`, and follow the runner's `check`, `verdict`, `invariant`, optional `description` schema. Record-write failures propagate and must not be translated into success by callers.

No rule list, adopted configuration, version expectation, tool-specific source classifier, advisory policy or invariant sentence is in the helper. The five dependent method scripts were not created.

## Choices, evidence and costs

1. Git attribute matching follows the existing ownership invariant and part-map guard. Python fnmatch would incorrectly let `scripts/*.py` claim deeper files; the nested ownership fixture exercises this distinction with literal expected paths. The cost is local Git process/temp-file work per discovery, rather than a small in-memory matcher.
2. Validate ownership across all non-artifact candidates before filtering requested parts. Silently dropping an unknown or overlapping candidate could hide source; failure forces its classification. The cost is that an unrelated unowned unignored scratch file can stop a selected-part check; scratch work belongs under ignored runs. Missing tracked files also fail until the deletion is staged or restored.
3. Root `dist/` is the known generated application output. The first implementation excluded every nested directory of that name; the weakest-point fixture proved that could hide owned source. The corrected helper includes `scripts/dist/source.py`. Dependency/environment/cache names remain recognizable artifact directories. A future different generated output location needs an explicit mechanics update rather than automatic exclusion by a guessed filename.
4. Absolute executable paths and shell-free subprocess execution avoid implicit executable lookup/install wrappers in check adapters. The helper performs no download. It cannot establish the pinned version or prevent a caller from deliberately choosing an installer; each independent adapter must select and verify its already-installed tool. This keeps policy out of shared mechanics at the cost of explicit caller setup.
5. Exit codes and JSON formats differ by tool, so adapters choose accepted codes and validate the complete report. The helper only establishes successful invocation/readable output and defers the invariant record until explicit bool completion. A universal tool-output parser would duplicate policy here and couple otherwise independent checks.

## Check evidence

All paths below are relative to this worktree's `.runs/task-cycles/coding-guidelines/reports/`. Every captured command has combined complete stdout/stderr in the named `.txt` and exact argument/exit/timing evidence in the adjacent `.txt.json`. Captures use the supplied `capture.py`; no secrets or customer data occur in these outputs.

| Exact executed command | Actual exit | Complete output | Meaning |
|---|---:|---|---|
| `python -m unittest discover -s tests/quality -p test_quality_support.py` | 1 | f1-red.txt | Expected initial RED: 16 assertion failures because the shared module did not exist. |
| `python -m unittest discover -s tests/quality -p test_quality_support.py` | 1 | f1-green-first.txt | First implementation: 14 pass, 2 fixture newline mismatches on Windows. Fixtures were corrected to emit explicit bytes; successful tool output is preserved. |
| `python -m unittest discover -s tests/quality -p test_quality_support.py` | 0 | f1-green.txt | Initial GREEN: all 16 fixture tests pass. |
| `python -m unittest discover -s tests/quality -p test_quality_support.py` | 1 | f1-weakest-red.txt | Adversarial RED: nested owned source named dist was incorrectly excluded. |
| `python -m unittest discover -s tests/quality -p test_quality_support.py` | 0 | f1-weakest-green.txt | Final focused GREEN: all 17 tests pass after narrowing root output exclusion. |
| `npm.cmd test` | 0 | f1-npm-test.txt | Existing application build and 173 Node tests pass. Ran once, before the final discovery-only correction; that correction is covered by final focused tests. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f1-live.py` | 1 | f1-live.txt | First manual check used nonexistent sim/time.ts after successful discovery; this was an evidence-fixture mistake, not a claimed product failure. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f1-live.py` | 0 | f1-live-final.txt | Current map discovery across all seven parts; existing sim/game.ts belongs to simulation only, new helper/tests belong to build-tools, foundations/invariants.md belongs to product-foundation. Full discovered path sets captured. |
| `git diff --cached --check` | 0 | f1-diffcheck.txt | No whitespace errors in the final staged diff. |
| `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/task-cycles/coding-guidelines/reports/f1-invariants.jsonl` | 0 | f1-invariants.txt | All 141 existing invariant tests pass; elapsed capture 323.956 seconds. |

Commands were run with `PYTHONDONTWRITEBYTECODE=1` after initial fixture execution; incidental bytecode from the first run was removed by explicit file paths.

The broad invariant command was started before root instructed that F1 needs no additional broad suite. Root subsequently requested collection of that already-running session only. Session **18746** is now complete, exit **0**, with **141 tests passing** in 322.724 seconds (323.956 seconds capture elapsed). Complete stdout/stderr is `f1-invariants.txt`, exact command/exit metadata is `f1-invariants.txt.json`, and the completed invariant record is `f1-invariants.jsonl`. This follow-up collected the existing run and changed only ignored evidence/report artifacts; it started no new tests and made no product change.

## Self-review and weakest point

Read the complete staged diff before commit and verified the committed file set afterwards. The principal missed-requirement risk is incomplete discovery of new owned source. The additional adversarial nested-dist fixture caught an actual omission, failed before the correction and passed after it. The live check also confirmed ownership against the real current map rather than only miniature fixtures. Practical limits: the fixture covers the known root output convention, not arbitrary future generated layouts; full guideline form and tool-policy enforcement belong to later stages.

Adversarial boundaries exercised: overlapping ownership outside selected parts, unowned files, unknown parts, failed Git discovery, absent tracked sources, ignored new files versus tracked ignored files, paths with spaces, nested wildcard semantics, gitlinks, dependency/generated artifacts, missing executables, disallowed relative launchers, nonzero invocation with preserved raw evidence, accepted violation exit codes, malformed JSON, unreadable UTF-8, timeout, accidental None results, stale-record overwrite, no partial pass after an earlier successful subprocess, malformed record path and invariant citation.

Sharpness from this diff: only build-tools code and its mechanics tests change. It neither alters application state nor crosses the deployment/lockfile trust boundaries, and it has no irreversible product action. The relevant boundary is interpreting Git/tool output into a gate verdict: false success could admit a bad change; inability now yields no named verdict. The helper contains no adopted expectation that could weaken a check; correctness of independent language/audit adapters remains unverified here.

## Unchecked and handoff concerns

- The earlier pending broad invariant run has been collected: 141 tests pass, exit 0. No pending session remains.
- Live eslint-source-rules, eslint-configuration-rules, ruff-source-rules, shellcheck-source-rules, prettier-source-format and introduced-npm-vulnerabilities remain **unchecked**: their method scripts/configurations are intentionally absent at F1. Fixture results do not establish any of these product invariants.
- No foundation file changed, so no foundation-format guard was required for this stage. Full final part/guideline/gate checks stay with root after the complete change exists. The current absence of guidelines is the task's announced creation gap, not a successful guidelines check.
- Adapters must choose local pinned executables, validate their versions and complete tool schemas, define source scopes from their independent authoritative inputs, reject suppressions where required, clear external configuration/environment options where required, and convert proven violations to False only after those operations complete. Record creation failures must remain unsuccessful exits.
- No outstanding foundation/design question or implementation blocker was found. Independent review is root's next action; this author stops at committed F1.
