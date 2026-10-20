# Spec Compliance

**Spec compliant for this bounded integration correction.** The changes support valid installed aliases and authentic Bulk advisories without changing D-33, the invariant sentence, the severity threshold, the comparison base or the audited actual identities. Both assigned files have the requested implementation/test changes.

**Actual product result: named invariant failure, exit 1.** The actual original-fork audit now reaches the installed pinned client and current registry and records `introduced-npm-vulnerabilities/1` as failed. The earlier exit-2/schema result is retained as historical integration evidence, not the final result. There is no audit pass, and the product dependency/policy conflict remains unresolved.

**Cannot verify from this diff:** successful final product acceptance, full product/guideline gates or a resolution of the npm pin/threshold conflict. Those remain controller-owned and unchecked here. This review does not approve a manifest/lock change or a policy exception.

Range: `34e7d2a7c9d67845a983eb626029d92f3cf5cf36..403c446f5b90c408e013f176516ebc16e8a30a0c`.

Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`.

# Strengths

- **Alias correctness:** `scripts/check_dependencies.py:239` distinguishes an ordinary install-name/version reference from an explicit `npm:` real-name assertion. The latter still requires exact actual-name equality at `:241`; range validation and actual package-pair collection are unchanged. Tests at `tests/quality/test_dependency_audit.py:146`, `:152` and `:188` assert the real `@typescript/typescript6@6.0.2` payload and both ordinary/peer behavior. This addresses the authentic installed graph rather than renaming the audited package to its install alias.
- **Boundary controls:** `tests/quality/test_dependency_audit.py:158`, `:165` and `:172` still reject conflicting explicit aliases, unsatisfied ranges and conflicting tarball versions. The optional-present-provider case at `:179` demonstrates that optional peer metadata cannot hide the real alias package from a matching high-severity advisory.
- **Authentic schema with strict present-value handling:** `_advisories` now uses the already validated outer package key only when nested `name` is absent. `tests/quality/test_dependency_audit.py:261` covers blocking/nonblocking outcomes for omitted names; `:272` retains rejection of present null, empty, conflicting and nonstring names. `:283` preserves bad-range and unsubmitted-group rejection. Complete response processing, mandatory fields, severity/range matching and duplicate-key protection are unaffected by this small change.
- **Measured integration evidence:** the final live trace preserves both the complete Bulk response and actual matching request/results. It includes seven false matches for safe `brace-expansion@5.0.12` alongside seven true matches for introduced bundled `brace-expansion@5.0.5`, demonstrating why concrete version matching matters. A package-wide severity was not substituted.

# Issues

## Critical (Must Fix)

None found in the assigned correction.

## Important (Should Fix)

None found in the assigned correction.

## Minor (Nice to Have)

None raised. No unresolved code-review finding remains from this bounded review.

# Assessment

**Task quality: Approved.** Two small production changes correct evidenced over-rejection at the lock/registry boundaries, with focused behavioral and adversarial tests and a genuine live failure result. The dependency audit is correctly blocking the current introduced bundled npm versions; that policy/input conflict remains an operational blocker for the controller.

# Independent Mechanism and Evidence Checks

This reviewer read the exact Superpowers 6.4.1 task-reviewer template, reviewer contract, integration handoff, complete author report and assigned full diff once. The correction changes exactly two Python files, **+96/-2**, with four added/two removed production lines and 92 added test lines. There is no changed product prose; the document pass therefore has no product document to judge. The author report was inspected separately as unverified evidence.

Re-read complete introduced-npm-vulnerabilities/1 and D-33/1, including all fields, rationale and rejected alternatives. They remain unchanged. D-33 has no Based on or Relations dependencies requiring expansion. Re-read the complete part map and guideline-reading procedure: the changed scripts and quality tests belong only to **build-tools**, at its lockfile/adapter and untrusted-registry boundary. `Test-Path guidelines` returned False; the previously established missing-guidelines creation gap remains explicit. Earlier whole-read coding template and D-28 build/test-exemplar deferral remain applicable. No selection expansion, UI route, screenshot obligation or invented technical-metadata restriction arises from this correction.

Outside-diff reading was limited to named concrete risks:

1. **Whether relaxing ordinary name equality can still represent npm's actual alias semantics.** Read the whole installed pinned npm `node_modules/npm/node_modules/@npmcli/arborist/lib/dep-valid.js` and relevant `edge.js` method. `edge.js:105` compares installation names; `dep-valid.js` validates ordinary version/range references against `child.version`, not the child's actual package name. The recorded Arborist virtual-tree output contains nine incoming valid peers to install name `typescript`, actual name `@typescript/typescript6`, version `6.0.2`. The state observer script uses installed npm's `Arborist.loadVirtual()` and reports its own `edge.valid`; it neither installs nor replaces the graph with a fixture. No concern remains for the implemented distinction. The explicit-alias check is retained independently by the adapter, as required by this correction.
2. **Whether omitted nested advisory names are authentic rather than incomplete data silently accepted.** Read installed npm's `@npmcli/arborist/lib/audit-report.js:117` and `@npmcli/metavuln-calculator/lib/advisory.js:25`. npm passes the outer map key separately to its calculator and fills an absent nested name from that key. The complete captured live Bulk objects all omit nested `name`. The adapter's missing-key fallback is therefore grounded in actual schema and exact-version client behavior; a present malformed/conflicting name does not receive that fallback. No concern remains in the bounded schema change.
3. **Whether the claimed live failure is manufactured, aggregated incorrectly or merely a fixture result.** Read the observer script and parsed the complete final JSONL exchange. The wrapper calls the captured production `_node`, records its actual answer and returns that same answer. Reconstructed every match request item from every returned advisory and submitted version and checked equality with the recorded actual match request. All response groups are submitted names. The trace contains **236 introduced pairs**, **35 concrete advisories**, **42 advisory/version checks**, **35 true blocking matches** and **10 distinct blocking actual pairs**. The extra seven checks are the safe brace-expansion version's nonmatches. The complete trace's matching booleans and policy result are consistent with the named failure; the live database was not queried again during review.

The ten blocking actual pairs are `@sigstore/core@3.2.0`, `@sigstore/verify@3.1.0`, `brace-expansion@5.0.5`, `http-cache-semantics@4.2.0`, `ip-address@10.1.0`, `pacote@21.5.0`, `postcss-selector-parser@7.1.1`, `sigstore@4.1.0`, `tar@7.5.13` and `undici@6.25.0`. Read the complete current lock data and located each exact pair under `node_modules/npm/node_modules/`, with `inBundle: true`. This independently confirms the supplied bundle-location evidence. These are results of the captured database read, not promises about future registry contents.

The product manifest/lock were treated only as input data. Their current SHA-256 values match both the author's before and after evidence:

- `package.json`: `1853e14c659d6ec59f97a2759881fc2eaa5db89714141b94002809becda84625`
- `package-lock.json`: `997d60665cee25c8094d6d8719fb2c5d82e9e578857bc3ec71da11582fb2b2c0`

No product input, index, branch or dependency installation was mutated by this review.

# Check Record and Practical Limits

Evidence directory: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/`. Each listed `.txt` preserves complete sanitized stdout/stderr; its adjacent `.txt.json` records exact argv, actual child exit and duration. Those records were read rather than regenerated.

| Author command | Actual exit | Complete output | Observed result |
|---|---:|---|---|
| `python -B .runs/task-cycles/coding-guidelines/reports/f5-integration1-state.py` | 0, before and after | `f5-integration1-state-before.txt`, `f5-integration1-state-after.txt` | Identical input hashes; installed npm 11.13.0; nine valid actual alias peers. |
| `python -B -m unittest discover -s tests/quality -p test_dependency_audit.py -k alias_peer` | 1, then 0 | `f5-integration1-red.txt`, `f5-integration1-alias-green.txt` | Seven cases: four evidenced RED failures, then all pass. |
| `python -B scripts/check_dependencies.py --fork-point c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/f5-integration1-audit.jsonl` | **2** | `f5-integration1-live.txt` | Earlier authentic schema failure, invariant null. Retained, superseded by final named verdict. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f5-integration1-live-evidence.py` (initial observer) | **2** | `f5-integration1-live-evidence.txt` | Original complete real exchange in `f5-integration1-node.jsonl`; no successful verdict. |
| `python -B -m unittest discover -s tests/quality -p test_dependency_audit.py` | 0 | `f5-integration1-green.txt` | Interim 32 tests pass before schema correction. |
| `python -B -m unittest discover -s tests/quality -p test_dependency_audit.py -k bulk_` | 1, then 0 | `f5-integration1-schema-red.txt`, `f5-integration1-schema-green.txt` | Three omitted-name subcase failures in RED, then all three tests pass. |
| `python -B scripts/check_dependencies.py --fork-point c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/f5-integration1-audit-final.jsonl` | **1** | `f5-integration1-live-final.txt` | **Named fail: introduced-npm-vulnerabilities/1.** |
| `python -B .runs/task-cycles/coding-guidelines/reports/f5-integration1-live-evidence.py` (final observer) | **1** | `f5-integration1-live-evidence-final.txt` | Separate real named-failure run; full raw trace `f5-integration1-node-final.jsonl` and matched rows `f5-integration1-matches-final.json`. |
| `python -B -m unittest discover -s tests/quality -p test_dependency_audit.py` | **0** | `f5-integration1-green-final.txt` | **35 tests pass**, no skips or warnings in captured test output. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f5-integration1-sources.py` | 0 | `f5-integration1-sources.txt` | Ten exact bundled pair locations. |
| `git diff --cached --check` | 0 | `f5-integration1-diffcheck.txt` | Empty output, staged whitespace check passed. |

**Reviewer execution:** no production audit, network request, test suite, installation or broad gate was rerun. This reviewer manually inspected the diff, pinned client sources and all supplied failure/success evidence, using a read-only Python projection of the complete saved JSONL/lock data for match-request consistency, counts, exact locations and input hashes; that projection exited 0. Its complete observed data are the preserved underlying JSONL, match summary, source-location and state files named above; it produced no new product verdict. Manual source/evidence-read command fields are not applicable. No additional empirical doubt required a new runtime test.

Sharpness remains build-tools at lock identity and registry-response boundaries: false success can miss an introduced vulnerable actual pair; false inability blocks legitimate work. The bounded correction keeps explicit identity/range/source and malformed-response controls. No runtime state or irreversible operation changes. The final whole-branch review, full product/guideline gates, final deliberate-break/good-bad acceptance and resolution of the current dependency-policy conflict remain outside this assignment and unchecked here.

**Unresolved code findings: none. Unresolved product condition: named introduced-npm-vulnerabilities/1 failure for the current introduced npm bundle.**
