# F2 — independent ESLint invariant methods

Status: DONE_WITH_CONCERNS at the committed F2 author boundary. Assigned methods and fixture tests are implemented. Live source/configuration invariants remain unresolved because the adopted ESLint dependencies/configuration have not yet been supplied. No dependency was installed, product configuration changed, review dispatched, merge, push or deployment performed.

## Inputs and selection

- Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`, branch `task/coding-guidelines`; start `5f7d31cb7a6e2d274d996f22577f84050f4d3b2e`. The pinned gitlink and checkout both show `d829e3aa6242a9b8901274531dd82fd5c7d87628`.
- Read the stage handoff and author contract, product AGENTS.md/CLAUDE.md, whole assigned eslint-source-rules/1 and eslint-configuration-rules/1 entries, D-29/1 and both whole linked membership facts, and complete part map. Read existing browser/server tsconfigs and package interface, quality_support.py and F1's mechanics interface/limitations. The cycle plan, frozen task, foundation author's reasoning and future configuration-author reasoning were not read. No excluded branches were read.
- Read `.the-way/product-guidelines/reading.md`, whole coding template and common way_of_working.md. Inspected the complete decision Scope fields; current build-tools matches D-01, D-02, D-03/2, D-04/3, D-05/3, D-06/3, D-27, D-28 through D-33 were read whole. Application-package-layout/build-output/build-layout and relevant runtime/typecheck interface entries were read; the complete product and pinned process glossaries were read. Linked entries were expanded only where their meaning affects these mechanics, not into unrelated icon or deployment behavior.
- All three assigned paths belong to build-tools. The checks read browser-view, simulation, account-server and build-tools exactly as D-29 names them. There is no UI change; screenshots are unchecked because there is no intended visible change. No product guidelines exist yet; this task creates them. No selection discrepancy or expansion arose. D-28 defers separate build/test exemplars, so these files create no kind guideline.
- Used Superpowers 6.4.1 TDD with writing-good-tests.md and implementer-prompt.md. Self-review is distinct from root's independent review. Before staged self-review, read the user's code-review playbook and Obsidian rulebook as external sources; no vault writes occurred.

## Committed change

Range: `5f7d31cb7a6e2d274d996f22577f84050f4d3b2e..103bddd04584d25ea93f64d3aace328666250845`.

| Assigned file | Added | Removed |
|---|---:|---:|
| scripts/check_eslint.py | 318 | 0 |
| scripts/inspect_eslint.mjs | 213 | 0 |
| tests/quality/test_eslint_checks.py | 212 | 0 |

Only these explicit paths were staged and committed. Reports and evidence remain ignored. Final git status is clean, and the committed author email was verified as the configured private address.

## Independent expectations and operation

The Python method embeds membership transcribed from the authoritative fact sentences. JavaScript has all 64 fact rules. TypeScript removes inherited compatibility/replacement disables (26 names, 19 overlapping the 64 active rules) and adds all 47 enabled compatibility/plugin rules, yielding 92 active names. Full membership is independently extracted from the fact sentences in a test and compared, beyond the cardinalities. Neither checker nor oracle imports recommended configuration exports. Both facts expressly prescribe error level with no configured options; this is sourced, not assumed from counts.

ESLint normalizes a no-options rule by merging its implementation's meta.defaultOptions. The bridge constructs an isolated configuration from the literal expected map, then compares the real effective active names, numeric levels and complete effective options against that oracle. Explicit declarations equal to defaults remain equivalent. Warning/off levels, missing/additional active rules and changed options fail. Inactive extra rule names do not change the active set. Normalization behavior was checked in the [pinned implementation](https://raw.githubusercontent.com/eslint/eslint/v10.12.0/lib/config/config.js); the check uses the documented calculateConfigForFile/lintText APIs.

Discovery applies the current part map using F1 mechanics, then classifies .ts/.mts/.cts/.tsx/.js/.mjs/.cjs/.jsx, including unignored new paths, with no fixed root allowlist. Actual ignored paths or configured processors fail coverage instead of disappearing. Source checks execute independent blocking rules in an isolated engine using the actual language/globals/project context, with the pinned parser implementation for TypeScript, inline configuration disabled, bulk suppressions disabled, no cache and no fixes. They do not inherit weakened actual rules. The configuration method separately checks each discovered path's actual effective rule map.

Comments come from parsed AST tokens, not source regexes; strings containing directive-like text do not act as comments. The bridge uses the public local lock-verified ConfigCommentParser from @eslint/plugin-kit resolved from ESLint. Its documented interface is in the [official package README](https://raw.githubusercontent.com/eslint/rewrite/main/packages/plugin-kit/README.md). Inline declarations are interpreted and normalized through isolated ESLint configuration before comparison: redundant declarations pass; actual active-rule/options changes fail. Blanket or adopted-rule disable comments fail even when no diagnostic happens to be present. Enables alone do not alter the adopted set; a preceding prohibited disable is independently found. Line/block/shebang distinctions follow [pinned ESLint SourceCode](https://raw.githubusercontent.com/eslint/eslint/v10.12.0/lib/languages/js/source-code/source-code.js). Uninterpretable directives and fatal parser results produce inability, with no named verdict.

The Python parser rejects duplicate JSON keys, non-JSON constants, wrong schema/types, missing/duplicate/unexpected file records, malformed diagnostic/directive/rule fields and incomplete expected-rule oracle membership/levels. Report coverage is validated before judgment. Shared run_check writes a named pass/fail only for a completed Boolean result. Invocation/parser/unavailable-tool failures give exit 2 and invariant null. NODE_OPTIONS, NODE_PATH and ESLINT_USE_FLAT_CONFIG are removed for the child. Execution uses absolute local Node without a shell or installer.

## Interfaces for following authors

- Keep local eslint 10.12.0, @eslint/js 10.0.1, typescript-eslint 8.71.2 and globals 17.13.0 exactly declared in the shared package and lock root. Installed versions and their local lock entries must agree. Parser/typescript-estree must resolve to 8.71.2. Actual TypeScript resolved from typescript-estree must be 6.0.2; the application compiler stays exactly pinned TypeScript 7. No alias name is prescribed. Root explicitly confirmed that D-29 interpretation.
- Provide root eslint.config.mjs. Effective configuration must cover every currently owned TS/JS variant and new path, retain the 64/92 sets with effective no-configured-options defaults, supply globals and type information, and not ignore or process covered files. Current tsconfigs include only application .ts roots; they do not establish type-aware coverage for arbitrary new script/test .ts/.mts/.cts/.tsx files. Supply that coverage rather than narrowing discovery.
- The bridge resolves @eslint/plugin-kit from ESLint and verifies its installed version against the lock. No new direct dependency or independently chosen version is required. A missing API/export yields inability. ESLint engine options follow the [official API reference](https://eslint.org/docs/latest/integrate/nodejs-api).
- Public commands remain `python -B scripts/check_eslint.py --record .runs/eslint.jsonl` and `python -B scripts/check_eslint.py --configuration --record .runs/eslint-configuration.jsonl`. Exit 0 is pass, 1 proven violation, 2 inability. The bridge consumes one JSON request on stdin and returns a schema-1 object on stdout. Warning output or a nonzero exit cannot pass.

## Choices and costs

1. Literal fact membership keeps expectations independent of adopted configuration. It duplicates membership lines and needs reviewed updates when foundation membership changes. Reading the tested presets/configuration as the oracle would silently follow their weakening.
2. Effective default normalization uses pinned rule implementations rather than copied undocumented option objects. It respects the facts' explicit no-configured-options policy and avoids false failures from injected defaults. It costs isolated configuration calculation per file and depends on the verified pinned runtime.
3. Redundant declarations are allowed as root clarified from D-29; banning every configuration comment would add a product restriction. ESLint's own parser plus isolated option calculation adds a transitive API dependency and per-directive work. It avoids maintaining a second JSON-like comment grammar. Unsupported declarations/APIs yield no named verdict.
4. Independent source execution prevents disabled actual rules or suppressions from hiding reports; actual language context is still needed for globals and project services. Separate engines cost work per file. This is not a sandbox for deliberately hostile executable configuration or tampered installed rule implementations.
5. Fatal/unknown parser results use inability rather than guessing a blocking rule. This can stop the gate until project configuration is fixed, but never certifies source the parser did not inspect. Scope/result failures cannot become an empty clean result.

## Evidence

All output paths below are relative to this report. Every row's output is complete combined sanitized stdout/stderr; adjacent `.txt.json` files contain exact argv, child exit code and elapsed time. Outer PowerShell sometimes reports 1 for the wrapper's sys.exit(2); captured child exit 2 is the actual invariant-method result.

| Exact command | Actual exit | Complete output |
|---|---:|---|
| `python -B -m unittest discover -s tests/quality -p test_eslint_checks.py` | 1 | f2-bridge-red.txt |
| `python -B -m unittest discover -s tests/quality -p test_eslint_checks.py` | 0 | f2-comment-kind-green.txt |
| `python -B -m unittest discover -s tests/quality -p test_eslint_checks.py` | 1 | f2-comment-kind-red.txt |
| `git diff --cached --check` | 0 | f2-diffcheck.txt |
| `python -m unittest discover -s tests/quality -p test_eslint_checks.py` | 0 | f2-final-focused.txt |
| `python -B scripts/check_eslint.py --configuration --record .runs/eslint-configuration.jsonl` | 2 | f2-final-live-config.txt |
| `python -B scripts/check_eslint.py --record .runs/eslint.jsonl` | 2 | f2-final-live-source.txt |
| `python -B -m unittest discover -s tests/quality` | 0 | f2-final-quality.txt |
| `python -B -m unittest discover -s tests/quality -p test_eslint_checks.py` | 0 | f2-green-first.txt |
| `python -B scripts/check_eslint.py --configuration --record .runs/eslint-configuration.jsonl` | 2 | f2-live-config.txt |
| `python -B scripts/check_eslint.py --record .runs/eslint.jsonl` | 2 | f2-live-source.txt |
| `npm.cmd test` | 0 | f2-npm-test.txt |
| `python -B -m unittest discover -s tests/quality -p test_eslint_checks.py` | 0 | f2-parser-error-green.txt |
| `python -B -m unittest discover -s tests/quality -p test_eslint_checks.py` | 1 | f2-parser-error-red.txt |
| `python -B -m unittest discover -s tests/quality -p test_eslint_checks.py` | 1 | f2-red.txt |
| `python -B -m unittest discover -s tests/quality -p test_eslint_checks.py` | 0 | f2-redundant-directive-green.txt |
| `python -B -m unittest discover -s tests/quality -p test_eslint_checks.py` | 1 | f2-redundant-directive-red.txt |
| `python -B -m unittest discover -s tests/quality -p test_eslint_checks.py` | 0 | f2-weakest-green.txt |
| `python -B -m unittest discover -s tests/quality -p test_eslint_checks.py` | 1 | f2-weakest-red.txt |

Initial red evidence establishes missing methods. Later targeted red/green evidence preserves actual failures for redundant directives, incomplete oracle data, comment kind and fatal parser handling. Final focused tests: 15 pass. Complete quality tests: 32 pass. npm test builds and passes all 173 existing application tests. It ran once after initial implementation; subsequent changes only refine check parsing/validation, covered by final complete quality tests. Expected failure records inside unit output are assertions of failure handling, not failed unit tests.

Both final live methods exit 2 because eslint is not yet declared at 10.12.0. Full outputs: f2-final-live-source.txt and f2-final-live-config.txt. `.runs/eslint.jsonl` and `.runs/eslint-configuration.jsonl` retain fail/invariant-null records. These are genuine non-passes; fixtures do not replace product verdicts. No installation/configuration was created to obtain a green live result.

## Self-review, weakest point and sharpness

Read the complete staged three-file diff. Final staged whitespace check passes. Only build-tools code changes. The relevant boundary is interpretation of discovery/tool output into a gate verdict: a false success could admit bad code. There is no application-state change, deployment/lockfile trust-boundary change or irreversible effect.

The weakest requirement was trustworthy complete coverage/result interpretation. A real Git fixture proves newly owned nested .mts/.jsx sources are selected while dependencies are excluded. A further adversarial test demonstrated that incomplete/warning/off defaults in bridge output could produce a source pass; f2-weakest-red.txt fails before source-side oracle validation and f2-weakest-green.txt passes after it. This proves those identified false-pass routes are closed, not real ESLint conformance. Comment-kind red/green evidence also closes a real false rejection of an inert Line comment.

## Unresolved and unchecked

- Live eslint-source-rules and eslint-configuration-rules have no named verdict until actual pinned dependencies/configuration exist. Authentic type-aware linting, default normalization and ConfigCommentParser loading remain unverified here. Fixtures cover Python judgment, real Git discovery and bridge orchestration with a narrow API double; they are not an ESLint runtime conformance test. After installation, later authors/root must execute both methods and real good/bad/new-path/config-weakening cases.
- Configuration must support owned TS variants outside current application tsconfigs. Missing type information produces inability rather than false source success.
- Complete future scope is checked against the current Git/map population on every run, not every hypothetical filename. Newly created fixtures prove discovery; future config exclusions fail when such source exists.
- Foundation/check changes remain reviewable independently. No foundation file changed, so no foundation format guard was needed. Final whole-change gate/guidelines checks and independent review are root's next stages, not complete here.
- Screenshot validation is unchecked because these are build/check files without visible behavior. No next-stage action was taken.

## Fix round 1

Both findings from f2-review.md are addressed in commit e85670a467de02ec0c46d1fb17777f54ad70ec9e. Complete changes, focused red/green evidence, source-semantics verification, self-review and remaining integration concerns are recorded in f2-fix1-report.md beside this file. The focused suite now has 16 passing tests and clean expected-error output; no broad suite or later stage was rerun.
