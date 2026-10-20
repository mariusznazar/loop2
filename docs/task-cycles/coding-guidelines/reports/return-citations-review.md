# Return-citations independent scoped review

## Spec compliance

**Spec compliance: Spec compliant.** No missing, extra or misunderstood requirement found in the assigned return-step metadata change.

**Task quality: Approved.** No Critical, Important or Minor finding introduced by this range. There is no unresolved concern requiring a repair/re-review allowance.

- Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`.
- Reviewed range: `ef057111b09f0b081e1c9c1dd61678bb29040a07..52bd7f7f1608774113cdc3039a9e49b51e87bc97`.
- Authority: complete `reports/return-citations-review-handoff.md`, including the appended return-step metadata boundary; `reports/return-citations-handoff.md`; pinned `.the-way/elements/invariants/template.md`, especially Test; full WAY-65/1 in `.the-way/foundations/decisions.md:1907`; shared form rules. The task-reviewer prompt and code-review playbook were read in full.
- Change inspected: complete provided review-package diff, seven files, 17 inserted comments, zero removed lines. The reviewed commit does not add a check algorithm or alter an invariant sentence/version.
- This is the scoped review only. It neither supplies the separate assessment nor claims the concurrent complete gate has passed.

All paths abbreviated below are relative to the worktree above. Review evidence and this report are under `.runs/task-cycles/coding-guidelines/reports/`.

## Guideline and foundation selection

I verified the selection against the actual seven scripts, rather than the earlier S11/S12 work. The complete part map assigns `scripts/**` to build-tools (`foundations/part_map.md:64`); its responsibility includes checking quality and auditing dependencies. The map also identifies `scripts/check_dependencies.py` as a trust-boundary file. This patch changes metadata at that boundary, not executable processing of untrusted advisories.

Selected and read whole: `guidelines/coding.md`. Inspected the complete kind index at `guidelines/coding.md:13` and every guideline file's Discipline, Applies to and When to read metadata. None of the content-data, simulation-module, browser-module or http-application rows matches these Python adapters, discovery helper and JavaScript tooling bridge. D-28/1 (`foundations/decisions.md:823`) explicitly defers separate build/test/entry-point exemplars while keeping general checks applicable. Thus the appended handoff correctly narrows the earlier broad selection: the four kind guides are not applicable to this review. No missing/malformed header or unresolved reading condition was found; no additional guide was selected.

Foundation read: complete part map, complete product invariant file, complete product glossary, the current decision Scope fields across the complete log, and complete selected current build-tools entries D-01/1, D-02/1, D-03/2, D-04/3, D-05/3, D-06/3, D-27/1, D-28/1, D-29/1, D-30/1, D-31/1, D-32/1, D-33/1. D-07/1 and D-08/1 were read as linked context. Read the four rule-membership facts that the six standing entries name: eslint-recommended-rules/1, typescript-eslint-typechecked-rules/1, ruff-default-rules/1, shellcheck-default-bash-checks/1. The existing npm choice is D-33's 12.2.1, not the earlier frozen task value. Searches across foundation files for citations, data lines, linting, formatting, quality and dependency audit yielded no additional rule changing this metadata judgment. The complete current Scope inspection and selected identifiers agree; unrelated decisions and external source freshness were not independently re-audited.

## Strengths and requirement checks

| Requirement / concrete risk | Evidence and conclusion |
|---|---|
| Six standing verdicts must cite their actual invariant/version at the smallest independently recorded unit | `scripts/check_eslint.py:229`, `:230`; `scripts/check_ruff.py:190`; `scripts/check_shellcheck.py:170`; `scripts/check_format.py:186`; `scripts/check_dependencies.py:337` immediately precede their `run_check` operations. The targets match the current six foundation entries and method commands. |
| ESLint's two alternatives must remain distinct without an executable dispatch refactor | `scripts/check_eslint.py:228` selects one name from `--configuration`; the existing `run_check(name, name + "/1", ...)` records exactly that alternative. Both citations at the shared dispatch describe the two possible named outcomes, not two independent checks or a new requirement that one invocation record both. This complies with WAY-65's recorded-unit rule. |
| Shared discovery must name its statically read ownership map | `scripts/quality_support.py:71` is beside the read of `foundations/part_map.md`; `scripts/check_dependencies.py:119` separately cites the explicit base-map snapshot consumption. Current/base ownership roles are preserved. |
| Formatter static inputs must be cited where consumed | `scripts/check_format.py:113` cites `.gitattributes` beside the isolated attribute query; `:135` and `:137` cite the directly parsed manifest and lock; `:151` cites `prettier.config.mjs` beside the bridge invocation that consumes it. Reading the cut-off bridge context confirmed its explicit `resolveConfig` path at `:49`. The Python comment is outside the JavaScript literal, preserving its exact executable value. |
| ESLint bridge must cite tracked root/configuration reads | `scripts/inspect_eslint.mjs:19` cites `eslint.config.mjs` at ESLint construction; `:164` and `:168` cite the root manifest and lockfile beside their direct reads. Installed package metadata read in `loadTools` belongs to node_modules, not tracked product data. |
| Audit current manifests must not lose static root dependency declarations | `scripts/check_dependencies.py:292` and `:293` cite the root manifest/lock at their discovered-and-read collection. The same inputs are then looked up for the local npm pin. The manifest basename set and discovery remain dynamic; the comment does not narrow new-file coverage. |
| Ruff/ShellCheck need no fabricated tracked configuration input | The static-read search in their adapters finds dynamically discovered source reads; the adopted rules remain in code with isolated tool invocation. Installation requirements are declarations, not data these methods directly read. |
| Discovery must not be mistaken for semantic proof | `.the-way/elements/invariants/format_guard.py:1141` defines the real citation regex, and `:1165` onward skips files lacking an invariant citation. Thus a passing general guard does not validate helper-only data lines by itself. The author's bounded discovery probe explicitly includes both helper files and all 11 data lines, checks existence/tracking and adjacency, and reports this limitation accurately. |

The complete metadata set is six invariant comments and eleven data comments naming six distinct tracked targets: `foundations/part_map.md`, `package.json`, `package-lock.json`, `.gitattributes`, `prettier.config.mjs`, `eslint.config.mjs`. The comments have each language's real comment syntax and exact current identifiers/versions. The snapshot loop citation is meaningful even though the same operation also reads dynamically selected manifests: the map is the statically fixed required input at that operation.

The existing package-layout invariant test (`tests/invariants/test_application_package_layout.py:25`, `:67`, `:71`) confirms this repository's data-line practice includes actual product inputs, not only recorded/oracle fixtures. This supports the requested interpretation without inventing a narrower fixture-only rule.

## Issues

### Critical

None.

### Important

None.

### Minor

None introduced by the reviewed range.

## Executable preservation and evidence review

I did not rerun reported checks or any suite. I inspected the exact command arrays in the author report/review package, the complete small successful stdout/stderr files and their reported actual exits, plus the initial failed preservation/staging evidence. The initial JavaScript assertion output is about 301 KB; I inspected its failure header and position-only token difference and its final assertion metadata, not every repeated token dump. No live test was run in this review, so there is no newly generated test output or exit code to claim.

- `return-citations-preservation-green.txt` (exit 0): all six Python files have equal noncomment executable token type/spelling sequences and full ASTs with source positions excluded. The command only normalizes `tokenize.NEWLINE` spelling, excluding COMMENT and nonsemantic NL; string tokens and complete AST constant values remain compared. Thus the embedded BRIDGE literals and their JavaScript backslashes are not erased from comparison.
- `return-citations-js-preservation-green.txt` (exit 0): Espree parse/token equality for `inspect_eslint.mjs`, excluding only source-position fields. This preserves executable tokens/structure while allowing inserted comment offsets.
- `return-citations-discovery.txt` (exit 0): reports all six invariant comments at recorded dispatch units and eleven data comments; checks all their targets are tracked files using the real pinned regex. Its printed bridge-preservation claim is corroborated by the separate preservation run, not by the discovery probe alone.
- `return-citations-ruff.txt`, `return-citations-eslint.txt`, `return-citations-eslint-configuration.txt` (each exit 0): each contains the matching named `pass` record, with no diagnostic noise.
- `return-citations-invariant-guard.txt` (exit 0): 0 errors, 0 warnings, 0 unchecked. The two notes concern the absent empty violated list and absent human verdict file; neither claims a human verdict.
- `return-citations-diff-check.txt` (exit 0) contains Windows autocrlf notices. `return-citations-stage-check-initial.txt` (exit 2) shows CRLF staged as trailing whitespace under the initial `core.autocrlf=false` add. The explicit-path renormalizing correction and final `return-citations-stage-check.txt` (exit 0, empty) are disclosed, not hidden passes.
- `return-citations-preservation.txt` (initial exit 1) fails at check_eslint's checkout-vs-blob NEWLINE spelling; the corrected token comparison still compares indentation, executable token spelling and full ASTs. The JavaScript initial exit 1 compares token offsets despite the already-equal AST; the corrected command removes positions consistently. These are instrument corrections with retained failed evidence, not weakened product rules.
- `return-citations-commit-final.txt` records commit `52bd7f7` with seven files and 17 insertions. The provided full committed diff has no deleted/replaced executable line, supporting the claim that normalization did not turn the final commit into a file rewrite.

The preservation evidence is sufficient for this comments-only return change. It is not fresh evidence that a live audit's changing advisory database gives the same result, nor a universal proof about environment behavior. The author does not claim otherwise. Earlier accepted behavior, guideline-case and deliberate-break evidence can remain applicable to the unchanged algorithms and inputs under the explicit review boundary; this review does not independently reissue that acceptance.

## Focused outside-diff inspection and limits

The review package supplies the changed hunks; I did not crawl unrelated code. Focused expansions addressed these named risks:

1. Static input omissions hidden outside hunks: searched all seven method/helper files for read/parse/file-path operations, read the formatter's cut-off bridge/attribute context, audit's cut-off snapshot context and ESLint caller context. This verified the six tracked target classes and the distinction from dynamic source paths, absent optional root npm-shrinkwrap, generated temporary attributes, tool executables and installed metadata. No statically named tracked product data input was found missing from the requested set.
2. A runtime name mistaken for a formally cited verdict: inspected `quality_support.run_check`'s record construction (`scripts/quality_support.py:166` onward) and the ESLint dispatch. The comments align with actual recorded invariant values and do not alter error-to-no-named-verdict behavior.
3. A clean guard overstated as helper coverage: inspected the focused `check_citations` implementation and bounded discovery command. Its actual limit is disclosed above and in the author report.
4. A citation placed near a call but not the actual data read: inspected the cut-off bridge and snapshot contexts and the unchanged package-layout precedent, as described above. This was the reason to read those changed-file excerpts beyond the review package's truncated functions.

No invariant sentence, command algorithm, application/configuration source, rule membership, expected value or accepted scope changes in this range. Therefore there is no affected behavior/input requiring renewed deliberate-break or guideline-case execution for this patch. No UI appearance changed, so no appearance finding or screenshot claim applies.

Declined/out of scope: enumerating every dynamically discovered source; fabricating a target for absent/untracked npm-shrinkwrap; treating installed tool metadata as tracked product data; adding citations inside Python JavaScript literals merely for inner-language proximity; splitting the shared ESLint dispatch for metadata; rerunning the live audit, formatter, ShellCheck, broad suites or process/port/container checks; next-stage assessment or repairs; reopening the four pre-existing deferred final-review Minors. Existing deferrals are not newly approved or closed here.

## Return boundary

Product files, index, HEAD and branch state were not mutated. No helpers/subagents, cleanup, port/process/container actions, dependency installation, external writes, fixes or competing gate runs were performed. Only this requested ignored report was written.

**Final spec compliance: Spec compliant. Final task quality: Approved. Unresolved findings in this scoped range: none.** The controller still owns the in-flight complete gate, separate return-step assessment and whole-branch reconciliation; their results are outside this report's claim.
