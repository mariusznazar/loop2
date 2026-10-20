### Spec Compliance

- ✅ Spec compliant for the assigned F1 mechanics stage. Reviewed range: `75a5fc91b8e74c81cba6f0aded3f2bf3752475a6..5f7d31cb7a6e2d274d996f22577f84050f4d3b2e`. The package contains exactly the two permitted product files: `scripts/quality_support.py` (+195) and `tests/quality/test_quality_support.py` (+178). No caller scripts, tool configuration, rule lists, foundation entries or application behavior were added.
- ✅ Discovery includes tracked and unignored untracked files, checks ownership before requested-part filtering, rejects unsuccessful Git discovery, missing/unsafe sources and ambiguous ownership, and excludes the specified artifacts and gitlinks: `scripts/quality_support.py:47`, `scripts/quality_support.py:57`, `scripts/quality_support.py:65`, `scripts/quality_support.py:92`.
- ✅ Local execution uses an absolute executable and no shell, preserves unsuccessful raw process evidence, rejects unsupported exits and unreadable UTF-8, and leaves accepted violation codes and complete output validation to callers: `scripts/quality_support.py:20`.
- ✅ Complete operations must return an actual bool; proven pass/fail records cite the invariant, inability records fail with no invariant, and no named pass is emitted before completion: `scripts/quality_support.py:159`. The record's keys and JSONL behavior agree with `.the-way/gate/run_tests.py`'s `Record` and the standing-check record contract in `.the-way/product-guidelines/coding/template.md`.
- ✅ Required meaningful fixtures exist for nested new files, ambiguity, missing executables, unsuccessful invocation, unreadable output, malformed parsed output and result schema: `tests/quality/test_quality_support.py:52`, `tests/quality/test_quality_support.py:69`, `tests/quality/test_quality_support.py:116`, `tests/quality/test_quality_support.py:122`, `tests/quality/test_quality_support.py:131`, `tests/quality/test_quality_support.py:142`. These use disposable Git repositories and real Python subprocesses, rather than mocked success responses.
- ⚠️ This diff does not establish any of the six live tool invariants. Their adapters and configurations are intentionally outside F1; later complete-product acceptance must establish tool versions, independent policy expectations, output-schema validation, good/bad cases and deliberate invariant breaks.
- ✅ The already-started broad invariant command has completed with exit 0 and 141 tests passing. The updated author report, collection log, complete output and capture metadata agree. No duplicate run was started. This existing-suite result does not establish the six absent live tool methods.

### Strengths

- Ownership matching uses Git attribute semantics rather than a looser Python wildcard interpretation. The fixture distinguishes `scripts/*.py` from a nested source path, and ambiguity in a different part still stops discovery: `scripts/quality_support.py:92`, `tests/quality/test_quality_support.py:61`, `tests/quality/test_quality_support.py:69`. No concern found in the inspected current-map ownership behavior.
- The weakest-point exercise caught a real source omission and retained a regression fixture: `tests/quality/test_quality_support.py:96`. The captured failing output names `scripts/dist/source.py`; the final focused output passes all 17 tests after narrowing the generated-output exclusion to root `dist/`. This is substantive adversarial evidence, not only a successful product run.
- Invocation and verdict recording remain separate. A successful first subprocess cannot create a pass when a later subprocess fails, and an accidental `None` cannot become success: `scripts/quality_support.py:159`, `tests/quality/test_quality_support.py:154`, `tests/quality/test_quality_support.py:164`. No concern found in these fail/inability boundaries.
- Raw failed-process evidence stays attached to `QualityError`; the accepted-code interface accommodates tools that use a distinct violation status without embedding any rule policy: `scripts/quality_support.py:20`, `tests/quality/test_quality_support.py:122`.

### Issues

#### Critical (Must Fix)

None found in the assigned scope.

#### Important (Should Fix)

None found in the assigned scope.

#### Minor (Nice to Have)

None identified for action. No speculative refactoring or coverage expansion is requested.

### Assessment

**Task quality:** Approved.

**Reasoning:** The two modules have distinct responsibilities, a small caller-facing interface and explicit unsuccessful outcomes. Real Git/process fixtures and the final adversarial correction support the mechanics claim; approval does not establish correctness of the future tool adapters or whole-branch acceptance.

### Scope and guideline selection

- Read `reviewer-contract.md`, the complete named Superpowers 6.4.1 `subagent-driven-development/task-reviewer-prompt.md`, the complete code-review playbook, F1 brief, author contract and author report. The full supplied diff was reviewed as the change; changed files were not separately opened. Line anchors were derived from the supplied patch.
- Read the complete current `foundations/part_map.md` and `.the-way/product-guidelines/reading.md`. The two changed files belong to build-tools; this stage adds helper/test Python code and has no intended visible UI change. The announced overall change reaches seven parts, but this review is limited to F1.
- Selected whole-read product guideline files: none. `guidelines/` is absent; both direct directory inspection and a recursive directory search confirmed that absence. This is the announced discipline-creation gap, not a successful guidelines check. The whole D-28 entry expressly defers separate build/test exemplars, so no new kind guideline or exemplar is required from F1. No selection expansion or discrepancy was found.
- Read the whole six assigned invariant entries and D-28 through D-33 to distinguish shared mechanics from caller policy. The helper does not assert rule-set membership, so linked edition facts were not expanded for a policy judgment. Read the complete pinned coding template for its standing-check output and source-scope contracts.
- Sharpness: build-tools only; application behavior, deployment operations and the declared lockfile/dependency-check trust boundary are untouched. The relevant correctness boundary is translating discovery/process output into a named invariant verdict. No irreversible product action is introduced. UI screenshot verification is not applicable to this helper-only stage.

### Focused outside-diff checks

1. Named risk: a Python wildcard substitute or inconsistent ownership semantics could hide nested owned source. Read the existing `tests/invariants/test_application_package_layout.py` ownership implementation and the complete current part map; the new helper follows the same Git attribute matching semantics and adds explicit ownership rejection. The author's live discovery output includes all seven part populations with literal source paths, including `src/browser/sim/game.ts` under simulation and both new files under build-tools. No concern found from that inspection.
2. Named risk: an inability could be written as a successful named invariant result or an incompatible record. Inspected the pinned runner's record schema and failure semantics and the coding template's standing-check record requirement, then compared them with `run_check` and its literal schema assertions. No concern found in pass/violation/inability encoding.
3. Named risk: a claimed green could predate the final discovery correction or carry ignored warnings. Read complete focused red/green, weakest-point red/green and npm output plus their capture metadata. The final 17-test green covers the correction; the npm run is transparently earlier, and its application tests do not establish the helper correction. Final green outputs inspected contain no warning noise. No additional runtime probe was warranted.

### Evidence inspected

All paths in this table are beneath `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/`. Each output has its adjacent `.txt.json` command/exit capture. These are inspected author runs, not reviewer reruns.

| Exact command | Actual exit | Full sanitized stdout/stderr | Observed evidence |
|---|---:|---|---|
| `python -m unittest discover -s tests/quality -p test_quality_support.py` | 1 | `f1-red.txt` | Initial red: 16 failures, shared module absent. |
| `python -m unittest discover -s tests/quality -p test_quality_support.py` | 1 | `f1-green-first.txt` | Two concrete Windows newline fixture mismatches; not accepted as green. |
| `python -m unittest discover -s tests/quality -p test_quality_support.py` | 0 | `f1-green.txt` | Initial 16-test green. |
| `python -m unittest discover -s tests/quality -p test_quality_support.py` | 1 | `f1-weakest-red.txt` | New nested-dist fixture exposes omitted source. |
| `python -m unittest discover -s tests/quality -p test_quality_support.py` | 0 | `f1-weakest-green.txt` | Final 17-test green after the discovery correction. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f1-live.py` | 0 | `f1-live-final.txt` | Real current-map discovery across all seven parts. |
| `npm.cmd test` | 0 | `f1-npm-test.txt` | Build and 173 Node tests pass, with no skipped tests; predates the final helper-only correction. |
| `git diff --cached --check` | 0 | `f1-diffcheck.txt` | Empty whitespace-check output. |
| `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/task-cycles/coding-guidelines/reports/f1-invariants.jsonl` | 0 | `f1-invariants.txt` | Existing 141 invariant tests pass. Collection log `f1-result.log` and capture metadata agree; no new execution was requested or performed. |

Reviewer static checks: actor is the independent F1 reviewer; method is full diff inspection, focused authoritative-source comparison and complete captured-output inspection; observed evidence is cited above. Runtime command and exit fields are not applicable because the reviewer ran no behavioral test or mutation probe. No git state was changed, and no suite was rerun.

### Unresolved and outside-scope work

- No unresolved F1 defect or requested fix.
- No pending broad session remains: session 18746 has been collected with actual exit 0 and 141 tests passing.
- All six live tool invariants remain unchecked at this boundary: `eslint-source-rules/1`, `eslint-configuration-rules/1`, `ruff-source-rules/1`, `shellcheck-source-rules/1`, `prettier-source-format/1`, `introduced-npm-vulnerabilities/1`. Their future adapters must verify pinned local tools and complete output schemas and isolate external options where their adopted policies require it. Shared fixture success is not their acceptance.
- Full guideline form/reference checks, paired guideline cases, deliberate invariant breaks and final whole-branch review belong to later complete-product acceptance. The absent guidelines are recorded as work this task is creating.

Full report: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/f1-review.md`.
