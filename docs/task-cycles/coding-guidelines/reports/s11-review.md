# S11 independent scoped review

## Spec compliance

**Verdict: Spec compliant for S11.** Review range: `553180840590787ea373ae67326aa9439ec2854e..a98222d9306d1011290e7092251cbf30764a1384`. Reviewed the supplied complete seven-file package, the frozen task and accepted npm amendment, task-11 brief, author report, pinned common/coding templates and the coding author route. No missing, extra or misunderstood S11 change found.

**Cannot verify here:** final independent application of all thirteen good/bad pairs and separately invented invariant breaks remains the explicitly assigned later whole-product stage. This review does not mark that stage complete. S12's instruction pointer, the whole-branch review, final gate and integration are outside this range.

## Selection and authority

- Physical ownership is agent-workflow for all five `guidelines/**` files and build-tools for the two `tests/quality/**` fixture files (`foundations/part_map.md:76`, `foundations/part_map.md:105`). General guidelines describe all six code parts, so the semantic decision selection expands beyond those two physical owners.
- Verified the handoff selection against the actual diff and `.the-way/product-guidelines/reading.md`: read `guidelines/coding.md` and all four indexed kind guidelines in full from the review package. All five metadata headers, four index rows and reading conditions agree with this S11 scope. No additional guideline, missing file, malformed metadata or conflicting condition was found. No selection discrepancy to resolve. S12 work is not present in this package.
- Read the full part map, all current decision Scope fields and all selected current entries D-01 through D-37, including rationale and rejected alternatives. Expected current Scope union is D-01 through D-37 and the read selection matches it. In particular D-03/2, D-04/3, D-05/3 and D-06/3 are the current versions. Read the complete product invariants and glossary, relevant pinned glossary entries and the four standing-check set facts. Relevant task authority is npm 12.2.1 in the amendment and D-33, while the audit comparison remains the original fork `c379207bfd8bd148d3589ea75604ba5165915d01`.
- No changed product file was separately reread outside its supplied diff. Focused unchanged-source reads below were for named risks. No product file, index, branch or HEAD was mutated; no subagent was dispatched.

## Strengths

- Exact accepted file/status tables and four index entries are preserved (`guidelines/coding-content-data.md:11`, `guidelines/coding-simulation-module.md:11`, `guidelines/coding-browser-module.md:11`, `guidelines/coding-http-application.md:11`, `guidelines/coding.md:12`). Each kind has exactly one accepted exemplar. The thirteen cases are complete short files at the required paths, including complete configuration replacement cases (`guidelines/coding.md:75`, `guidelines/coding.md:109`).
- Standing-check scope, versions, severity threshold, original-fork comparison, unavailable-result behavior and protection against suppressions agree with the accepted task and D-29 through D-33 (`guidelines/coding.md:23`, `guidelines/coding.md:164`, `guidelines/coding.md:187`). All fourteen named Ruff examples, the concrete time-test example and accepted deferrals remain (`guidelines/coding.md:240`, `guidelines/coding.md:303`, `guidelines/coding.md:311`). There is no newly invented architecture rule or separate command beside the gate.
- The kind files keep control lifecycle, catalogue shape, GameResult and factory organization under Examples, preserving their intended illustrative status rather than expanding binding obligations (`guidelines/coding-content-data.md:44`, `guidelines/coding-simulation-module.md:71`, `guidelines/coding-browser-module.md:77`, `guidelines/coding-http-application.md:81`).
- The audit example explicitly states its prerequisites and live-data limitation (`guidelines/coding.md:209`). Its two persistent companion files are inert data with no scripts or application installation requirement (`tests/quality/fixtures/dependency-audit/package.json:1`, `tests/quality/fixtures/dependency-audit/package-lock.json:1`).

## Issues

### Critical

None.

### Important

None.

### Minor

None requiring a change. No appearance finding: this range changes documentation and inert fixture data, not a screen or its behavior.

## Concrete risks checked

1. **Fixture fails validation before advisory matching, making its good case unusable.** Read the entire `_collect` implementation (`scripts/check_dependencies.py:167`): every manifest needs an associated lock; every lock needs a manifest; both package-lock and npm-shrinkwrap are inspected independently; dependency maps must agree and each concrete version must satisfy its range. The manifest and both documented shrinkwrap cases match the persistent lock's root map, with `^1.2.0` admitting 1.2.8 and 1.2.5. The saved baseline/good/bad outputs and invariant records show pass/pass/fail, not a failure merely attributed to process exit status. No unresolved pairing risk found.
2. **Additional manifest accidentally creates a second application package.** Read the complete existing layout check (`tests/invariants/test_application_package_layout.py:20`) and map assignments. The fixture is under build-tools/test data, outside browser/server source ancestry; it installs or executes nothing. Both saved package-layout logs show one test passing. This is consistent with D-06 and `application-package-layout/1`, not an application package split.
3. **Narrative examples or test description misstate the cited existing code.** Read whole resources.ts, game.ts, status-row.ts, app.ts and time.test.mjs. The catalogue derives ResourceId from keys (`src/browser/sim/data/resources.ts:22`); the simulation exports state/events and accepts numeric real/game time (`src/browser/sim/game.ts:22`, `src/browser/sim/game.ts:224`, `src/browser/sim/game.ts:241`); status-row creates controls once and updates them in place (`src/browser/view/status-row.ts:40`); createApp constructs without listening (`src/server/app.ts:9`); the named test checks minute 1 and carry 0 for 1000 ms (`tests/sim/time.test.mjs:39`). The browser case's ResourceId import is supported by the existing re-export (`src/browser/sim/types.ts:5`). No source mismatch found; no exemplar re-election was performed.
4. **Form-check success is mistaken for semantic acceptance.** Inspected both complete saved form-check outputs and their adjacent exact-command/exit metadata: both exit 0, with zero errors, warnings and unchecked results. The first run explicitly omits merge-reference comparison; the second supplies the original fork and completes that comparison. These are form/reference evidence only. The author report correctly preserves later independent case acceptance as outstanding.
5. **Audit pair uses a remembered or package-wide vulnerability instead of exact version matching.** Inspected the saved primary registry response and match results: GHSA-xvch-5gv4-984h has critical severity and range `>=1.0.0 <1.2.6`; saved matching excludes 1.2.8 and includes 1.2.5. Read the author's helper and full result log: it checks build-tools ownership, an Express positive control in the original snapshot and no original minimist pair before executing the extracted cases. The matching and actual pass/fail logs support the current example, subject to the explicitly stated future advisory-data limitation. This is author evidence, not independent acceptance of all pairs.

## Evidence and limits

No tests, suites, live registry requests or gate commands were run by this reviewer: the supplied evidence answers the identified risks without repeating reported runs. Reads included `s11-guidelines-form.log` and `.log.json`, `s11-guidelines-reference.log` and `.log.json`, `s11-author-checks-pass.log`, `s11-author-checks.py`, `s11-audit-baseline.log`, `s11-audit-good.log`, `s11-audit-bad.log`, `s11-audit-pair-results.json`, both package-layout logs, `s11-fixture-primary-source.json` and `s11-fixture-source.log`, all beside this report. Audit records specifically identify `introduced-npm-vulnerabilities/1` with pass/fail. The final logs contain no tool warnings or unexplained failing result. Earlier failed author-helper assumptions are disclosed in the author report and corrected in its final helper; they are not product acceptance evidence.

Declined/out-of-scope: redoing the accepted exemplar comparison; imposing GameResult/update()/factory/catalogue architecture obligations; automatic Python/Bash formatting; broad regression, real-browser checks or deployment; S12 pointer changes; rewriting foundation/checkers; independent final deliberate breaks or all-pair execution at this slice boundary. No rule weakening or silent failure was accepted.

## Assessment

**Task quality: Approved.** The seven-file change faithfully records the settled policy and useful bounded examples, and the small fixture enables the required single-file audit cases without changing application dependencies or weakening the method. No unresolved S11 defect found. The known continuing limitation is mutable advisory data; remaining independent all-pair acceptance, invariant breaks and whole-task gates are explicit downstream obligations, not passes granted by this report.
