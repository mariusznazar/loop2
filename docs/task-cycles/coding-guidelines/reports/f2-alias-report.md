# F2 alias correction — independent ESLint methods

Status: DONE_WITH_CONCERNS at the committed check-author boundary, before independent review. The alias-resolution correction and focused fixture tests are complete. Product ESLint invariants remain unavailable on the actual installation; S1 must correct the parser runtime installation and install product configuration. No configuration, source outside the assigned methods, manifest, lockfile or foundation entry was changed.

## Inputs and selection

- Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`; current branch `task/coding-guidelines`; start commit `95667855d9e8be3616b1dbb545c8bcdc35de4d09`.
- Pinned the-way checkout and gitlink both verified as `d829e3aa6242a9b8901274531dd82fd5c7d87628`.
- Read `author-contract.md`, `f2-handoff.md` and `f2-alias-handoff.md`, product AGENTS.md/CLAUDE.md, Superpowers 6.4.1 test-driven-development and its writing-good-tests reference, and the implementer prompt. No subagents were used. The cycle plan, frozen task, excluded branches, foundation-author reasoning and future configuration-author reasoning were not read.
- Read the complete current part map, the pinned guideline-reading procedure, coding template and common foundation-reading procedure. Both changed product files belong to build-tools; the method's covered source spans browser-view, simulation, account-server and build-tools. This change creates no screen or other visible behavior.
- Current complete decision Scope inspection selected build-tools decisions D-01/1, D-02/1, D-03/2, D-04/3, D-05/3, D-06/3, D-27/1 and D-28/1 through D-33/1; all selected entries were read whole. D-29 and its D-06 relation were applied to this correction. Read both assigned ESLint invariant entries and both complete linked rule-set facts. Read the whole invariants file, product glossary, existing tsconfig interfaces, build script, method/helper interface report and current manifests as input data. The foundation search across decisions, invariants, facts, glossary and map found no new foundation meaning needed for aliases.
- Selected product guidelines: none, because guidelines/ is absent. This is the announced coding-guideline creation task exception, not a waiver or a passed guideline check. D-28 defers a separate build/test exemplar. No guideline-selection expansion was needed; D-32 independently requires the installed formatter on the changed JS bridge.
- Observed runtime/tool inputs: Node v24.17.0; local ESLint 10.12.0, @eslint/js 10.0.1, typescript-eslint/parser/estree 8.71.2, globals 17.13.0; local Prettier 3.9.10. Parser wrapper package metadata is @typescript/typescript6 6.0.2, its actual exported TypeScript API is 6.0.3, and the separately installed compiler runtime is TypeScript 7.0.2.

## Changes and independent expectations

The Python method and its expected rule lists are unchanged. Expected membership remains derived exclusively from the two authoritative facts: 64 JavaScript rules; for TypeScript, JavaScript recommendations minus the inherited compatibility/replacement disables plus recommendedTypeChecked additions, yielding 92 active rules. The existing fact-membership test still verifies these complete sets independently of product configuration. No levels, options, source scope, directive behavior or output-schema validation was weakened.

`loadTools` now accepts the actual TypeScript 6 compatibility-package identity as well as the ordinary TypeScript package. It resolves the API from the verified parser/estree dependency chain, checks local installed metadata against the root lock entry and compares the exported API's runtime version with adopted 6.0.2. A wrapper's metadata cannot stand in for its exported runtime version.

The application compiler is identified through an exact TypeScript 7 declaration, either ordinary `typescript` or an npm alias of `typescript`. Its alias spelling is not prescribed. The declared alias/version must match the root lock declaration; installed package identity, local resolution and version must match, and the exported runtime must equal that exact declared 7.x version. An absent or ambiguous compiler is unavailable rather than guessed. The selected compiler is an installed compiler dependency; this does not claim the build script invokes it. That integration remains S1's responsibility and was checked separately by npm test.

The package lookup stops at the resolved module's nearest package metadata instead of climbing past an unexpected package. Lock identity must agree with installed metadata (including npm alias `name` where present). Existing pinned ESLint/config/globals/version checks remain in place.

Four new test methods run the actual Node bridge against temporary package trees, using real module resolution, manifests, locks and module runtime exports. They cover two distinct compiler alias spellings, a nested standard TS6 API alongside ordinary TS7, mismatched API/compiler runtime versions despite correct metadata, wrong parser identity or lock identity, wrong installed versions, range/unpinned declarations, lock declaration mismatch and missing compiler. The minimal module fixtures isolate loader behavior; they do not claim to execute real lint rules.

Applied the installed adopted Prettier defaults with explicit LF and external configuration disabled to the whole changed JS bridge, as required before freezing checks. A normalized Espree AST comparison across formatting was identical. This formatting changes layout in previously unformatted bridge code but not behavior outside the loader correction.

## Choices and costs

1. Follow actual resolved parser API and actual package/runtime identity. Retaining a strict metadata name of `typescript` rejects the legitimate compatibility package; accepting any 6-looking package would admit unrelated inputs. Accepting the two actual TypeScript package identities preserves locality/version/lock checks and adds a small identity allowlist. New distribution identities would need an explicit method extension, not a silent pass.
2. Discover the compiler by its exact target/version declaration rather than the key `typescript`. Keeping that key assumption confuses the parser API alias with the application compiler. Supporting ordinary and aliased declarations adds a short declaration parser and an ambiguity failure; it preserves the same shared manifest/lock boundary without prescribing an alias name. Multiple candidate compiler declarations require clarification rather than selecting arbitrarily.
3. Check exported runtime versions in addition to package metadata. Metadata-only validation accepts an actual 6.0.3 API under a 6.0.2 compatibility wrapper. Runtime checking loads already-installed modules and catches that drift, at the cost of executing the local dependency exports before linting. The bridge already executes these local dependencies to run ESLint; no package is installed or fetched by this method.
4. Preserve the actual unavailable result rather than adjust expectations or repair installation in this role. This leaves product linting blocked until S1, while avoiding a false successful verdict or an unauthorized manifest/configuration edit. A compatible installation must supply actual API 6.0.2 and a separate compiler 7 under the accepted D-29; alias spelling alone settles neither.
5. Formatter changes occur here because later product slices cannot change frozen methods. The larger bridge diff is review cost; normalized AST evidence isolates formatting from the small loader behavior change.

## Check evidence

All paths in the table are relative to `.runs/task-cycles/coding-guidelines/reports/`. For each captured command, the named `.txt` holds complete combined stdout/stderr, and adjacent `.txt.json` holds exact argument array, actual process exit and elapsed time. The capture helper can itself be surfaced by PowerShell with exit 1 for a captured nonzero child; the child exit in JSON below is authoritative. Outputs contain no secrets or client/user data.

| Exact command | Actual child exit | Complete output | Result |
|---|---:|---|---|
| `python -m unittest discover -s tests/quality -p test_eslint_checks.py` | 1 | f2-alias-red.txt | RED: 20 tests; 7 failing subtests. Two legitimate compiler aliases were rejected, two standard-package mismatched runtimes incorrectly passed, and alias-runtime cases were stopped by the old name assumption before reaching runtime validation. |
| `python -m unittest discover -s tests/quality -p test_eslint_checks.py` | 0 | f2-alias-green.txt | GREEN: all 20 tests pass after the loader correction. |
| `node .runs/task-cycles/coding-guidelines/reports/f2-alias-format-ast.mjs before` | 0 | f2-alias-format-before.txt | Capture semantic AST before formatter. |
| `node node_modules/prettier/bin/prettier.cjs scripts/inspect_eslint.mjs --write --no-config --no-editorconfig --end-of-line lf` | 0 | f2-alias-format-write.txt | Adopted installed formatter applied. |
| `node .runs/task-cycles/coding-guidelines/reports/f2-alias-format-ast.mjs after` | 0 | f2-alias-format-after.txt | Normalized AST unchanged by formatting. |
| `node node_modules/prettier/bin/prettier.cjs scripts/inspect_eslint.mjs --check --no-config --no-editorconfig --end-of-line lf` | 0 | f2-alias-format-check.txt | Changed bridge has adopted formatter output. |
| `python -B scripts/check_eslint.py --record .runs/task-cycles/coding-guidelines/reports/f2-alias-source.jsonl` | 2 | f2-alias-source.txt | Actual source method unavailable: Parser TypeScript API runtime must be 6.0.2; record invariant:null. |
| `python -B scripts/check_eslint.py --configuration --record .runs/task-cycles/coding-guidelines/reports/f2-alias-configuration.jsonl` | 2 | f2-alias-configuration.txt | Actual configuration method unavailable for the same actual API mismatch; record invariant:null. |
| `node .runs/task-cycles/coding-guidelines/reports/f2-alias-runtime-check.mjs` | 0 | f2-alias-weakest.txt | Weakest-point check confirms wrapper metadata6.0.2 / actual API6.0.3 / compiler7.0.2 and verifies both actual methods gave no named verdict. |
| `npm.cmd test` | 1 | f2-alias-npm-test.txt | Project test command fails in build: node_modules/typescript/bin/tsc is missing; application Node tests never execute. |
| `python -m unittest discover -s tests/quality` | 0 | f2-alias-quality.txt | All 116 fixture tests pass on the final formatted files; 165.601s test time, 166.039s capture time. No further broad run. |
| `git diff --check` | 0 | f2-alias-diffcheck.txt | No whitespace errors. |
| `git diff --cached --check` | 0 | f2-alias-staged-diffcheck.txt | Final staged diff has no whitespace errors. |

The first attempt at the ignored formatter-AST helper used five parent path segments instead of four and failed to resolve Espree. The helper path was corrected before formatter execution; no product file was changed by that failed helper attempt. `node node_modules/prettier/bin/prettier.cjs --version` reported 3.9.10, exit 0. Exploratory read commands included an absent node_modules/@typescript/typescript6 directory (the actual package is installed at its alias path node_modules/typescript) and an initially mistyped quality test filename; neither negative lookup was used as evidence of absence or a pass.

## Weakest point, self-review and practical limits

The requirement most likely to be missed is actual API6.0.2 behind a compatibility wrapper bearing version6.0.2. The actual installed wrapper exports `require("@typescript/old")`; its dependency declaration is `npm:typescript@^6`, and the current lock/install select TypeScript6.0.3. The weakest-point script verifies actual runtime exports and the resulting null-invariant failure records. Fixture runtime mismatches also fail for ordinary packages, so the test does not rely on the alias name being wrong. Limits: this establishes correct rejection of the actual installed mismatch; no real source lint or effective product configuration has passed yet.

Self-reviewed the actual two-file diff against the handoff. No change was made to scripts/check_eslint.py, shared mechanics, adopted rule membership, invariants, covered application source, build script, manifest, lockfile or product configuration. The four added tests catch loader changes, not source text or private function spelling. All package-tree writes belong to disposable ignored fixture paths. The bridge's non-loader formatting was checked by actual AST equality.

Sharpness: both changed files belong to build-tools. This changes how installed dependency metadata/exports become a quality-gate capability decision; wrong acceptance could certify linting with an unsupported parser. Locality, lock identity and exact runtime checks keep malformed/wrong tool inputs unavailable. It does not alter the lockfile trust boundary itself, application state, deployment behavior or any irreversible action. There is no intended visible UI change; screenshot verification is unchecked because no changed screen exists.

## Interfaces and unresolved next-stage work

- S1 must make parser-resolved actual TypeScript API exactly6.0.2. The current @typescript/typescript6 wrapper metadata6.0.2 is insufficient: `node_modules/typescript/lib/typescript.js` reexports `@typescript/old`, currently actual typescript6.0.3. Pin a compatible actual API installation and prove its runtime6.0.2; do not change D-29 to fit this mismatch.
- The application compiler is a separate exact TypeScript7 dependency. The current installed `typescript-compiler` is actual typescript7.0.2. The method accepts different alias spellings targeting that exact package/version. The build script still points to `node_modules/typescript/bin/tsc`; npm test proves this path is missing. S1 must route both application compilations through the actual compiler7 and rerun product checks.
- Product `eslint.config.mjs` is absent at this stage. Both actual methods stop before configuration loading due to the API mismatch, so the effective configuration, complete real lint run and configured scope remain unchecked. Installing configuration is S1's work; no empty invented configuration was supplied here.
- Both actual ESLint invariants are unavailable, not proven violations of source/rules and never passes. The focused package-tree tests and AST/formatter checks do not substitute for those live methods.
- Full final part tests, foundation/guideline form checks and merge-gate work remain with root after S1 and later slices. No foundation file changed in this correction. No live UI, deployment, push or merge check was performed.
- The compiler-declaration identification deliberately fails when absent or ambiguous. It verifies a separate installed compiler dependency and its runtime version; application-build integration is verified by the product's build/output invariants and project tests, not inferred from presence of a dependency.

## Commit and file counts

Committed range: `95667855d9e8be3616b1dbb545c8bcdc35de4d09..c47a40850baac91518568d996fc27f11ad2639be`.

Commit: `c47a408 fix: verify aliased TypeScript tool runtimes`.

| File | Added | Removed |
|---|---:|---:|
| scripts/inspect_eslint.mjs | 171 | 51 |
| tests/quality/test_eslint_checks.py | 101 | 0 |

Total: 272 added, 51 removed. Only the two explicit assigned product paths were staged and committed; scripts/check_eslint.py needed no change. Reports and evidence remain ignored. Commit author email was verified as the configured private email. Final git status --short is empty. The task branch tracks origin/task/coding-guidelines with the same branch name. The broader quality fixture run completed with 116 passing tests; no running check session remains. Independent review is root's next dispatch.
