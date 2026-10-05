# Panel settlement 1: application (A), then consistency (B)

## Input scope and authority

Repository: C:/Storage/repos/loop2-skeleton. Read the whole assessment A (`.runs/task-cycles/app-skeleton/reports/panel-application.md`) before the whole assessment B (`.runs/task-cycles/app-skeleton/reports/panel-consistency.md`), then checked each substantive remark below against the allowed repository material. This is the first settlement; no other reviews were inputs.

Code range: 3342d43bb2bff033efa1791f2f3037020af6f5f7..de3ceb36b51636464c8e5fd80980e8c9d18754ed. HEAD resolves to the latter, and `git diff <head> --` for the assessed code and foundations is empty. Both the gitlink and checkout of .the-way resolve to 271222203981b5cedd2fcbf3451b60362cc3e4d4. Read its elements/common/panel.md, WAY-10/1 at foundations/decisions.md:288, common rules, and relevant decision/invariant/part-map templates and ownership guard.

Allowed assessment inputs read: `.runs/task-cycles/app-skeleton/assessment/manifest.json`, `code.diff`, `UNAPPROVED-foundation.patch`, `code-evidence.md`, and `proposed/decisions.md`, `proposed/invariants.md`, `proposed/part_map.md`. Below, `proposed/` refers to that assessment directory. Checked proposed-file SHA-256 values against the manifest: decisions d855b6bbd85a134b3b528da2ba5202216a9997c150015a00cda5e1fb91dfe7fe; invariants d40f34592305ad6e26c5777e81afe65472752089f013cf65e8d076065078297e; part map 040269e9d4b22d107c8d3dac5b4dd06f8feaa3bef8ef1b798d40b5102f58cd93.

The 13 code files are .gitignore, README.md, package-lock.json, package.json, scripts/build.mjs, src/browser/index.html, src/browser/main.ts, src/server/app.ts, src/server/main.ts, tests/http.test.mjs, tests/startup.test.mjs, tsconfig.browser.json, tsconfig.server.json. The five existing foundation files (decisions, invariants, environment_facts, glossary, part_map) have no product entries. Tracked names were enumerated for ownership; excluded document contents, task/spec/plan/chronology/author reports and return folder were not read. No broad tests or guards were run, so this report claims no run passed. Only settlement reports are written.

The proposed patch is explicitly UNAPPROVED. The binding process is pinned the-way; no product decision in force establishes that every observed behavior must become an invariant. WAY-10 reserves these new foundation entries to a human, even where both settlements agree. Coordination delegation is not approval.

## Every remark, checked in A then B order

### A1: page delivery is unprotected — holds in part

The coverage observation holds. src/server/app.ts:9-10 serves the built directory; src/browser/index.html:9 loads /main.js; src/browser/main.ts:1-2 appends main. tests/http.test.mjs:53-63 checks successful HTML/JS delivery, though it does not execute the DOM code. Deleting static middleware at app.ts:10 leaves the API and plain 404 handlers at :6-8 and :11-13. The six sentences in proposed/invariants.md:5,15,25,35,45,55 do not positively require a successful page response: build claims concern output; root restriction can hold vacuously; the missing-page claim constrains missing files only. Thus an ordinary test can fail without violating these proposed sentences.

The claim that this is necessarily a blocking foundation omission does not hold from allowed evidence. proposed/decisions.md:5 concerns compilation, not delivery, and its three verification links at :11 cover its actual scope. No accepted product promise compels expanding it. Calling page delivery a permanent invariant, and especially a critical flow, is a human choice. A's own conditional conclusion is better supported than its unconditional blocker label. Recommend a concrete candidate for human review below; do not silently add a requirement or criticality.

### A2: missing human values — holds

proposed/decisions.md:3,14 leaves identity and approval unfinished; proposed/invariants.md:9,19,29 leaves derivations unfinished. proposed/part_map.md:5 and :29,40,55,70,79 leave scale/failure assessments unfinished. .the-way/elements/decisions/template.md:273-278 requires actual human approval, common/rules.md:17-24 distinguishes missing values from none and limits TODO on the main branch, and part-map/template.md:26-27,184-186 gives no TODO in part fields and reserves failure assessments to a human. These block binding adoption, not presenting an honest unapproved proposal. An agent cannot substitute names, dates, severities or absence claims.

### A3: six unchecked methods — holds

All six Method fields in proposed/invariants.md:7,17,27,37,47,57 are TODO. invariant template :98-110 permits that and gives no pass without a versioned verdict. tests/http.test.mjs:53-99 and tests/startup.test.mjs:7-35 are ordinary tests without that record. The report correctly distinguishes a reviewable sentence from an executed method. No forced runner implementation or downgrade of verification follows.

### A4: startup failure is an additional human candidate — holds

src/server/main.ts:3-10 logs an error, sets exitCode=1 and returns before readiness output. tests/startup.test.mjs:7-31 tests occupied port and absence of readiness output. None of the six proposed sentences constrains this behavior, and server-http's failure field at proposed/part_map.md:40 is unknown rather than a contrary claim. The suggestion is correctly conditional. It is no current code defect and no automatic blocker; human adoption would add protection and its ongoing checking cost.

### A's application table and ownership/dependency observations — holds, with stated limits

All six illustrated edits can falsify their named sentence: one package and separate outputs are in package.json:1, package-lock.json:6, tsconfig.browser.json:10-11 and tsconfig.server.json:10-11; HTML copying is scripts/build.mjs:18-20; noEmit and nonzero propagation are :10,14-15; HTTP fallbacks/root are src/server/app.ts:6-13. The type-check loop is fail-fast; successful checking covers both configurations, failure need not collect both diagnostics. The thirteen changed files are owned once by proposed/part_map.md:27-53. Existing tracked instruction/submodule files and foundations match :62-68 and :77. Neither docs pattern has a tracked match. No dependency graph command exists in package.json:7-12, so the allowed-dependency proposal is not an observed passing comparison (.the-way/elements/part-map/template.md:3-7). A's call is supportable only with its human conditions separated from mandatory fixes as above.

### B1: cut unmatched docs patterns — holds

proposed/part_map.md:67-68 includes docs/superpowers/** and docs/task-cycles/**. `git ls-files` at the assessed HEAD contains neither path population. This is checked against actual tracked names, not inferred from the evidence index. .the-way/elements/part-map/format_guard.py:806-813 reports a Files pattern lacking tracked matches as an error. Removing both patterns is the one required mechanical correction to this proposal for this named code commit. It removes no ownership today; a later commit adding documentation must update ownership for its actual files. Do not apply this recommendation blindly to a later assessed commit.

### B2: missing approval/judgments and rationale status — holds

The missing fields have the evidence and constraints given for A2. The rationale/rejections at proposed/decisions.md:16-17 and allowed dependencies/external row at proposed/part_map.md:11,28,39,54,69,78 are judgments. package.json and configs establish implementation, not a human's historical reason for choosing it. Preserve these as proposed new wording for adoption, not a recovered historical decision. If recovery is intended, .the-way/elements/decisions/template.md:265-271 requires a searched origin and unknown/sourced/human-given rationale; that different classification has not been established. No alteration of the proposed rationale is mechanically demanded merely because it is awaiting adoption.

### B3: TODO is honest debt; graph comparison unchecked — holds

Evidence is as under A3 and A's table. .the-way/elements/decisions/template.md:183-191 explicitly separates deriving an invariant from knowing its method; level 1 remains appropriate for these derivable build sentences. No graph command appears in package.json. Calling `npm test` a Method without a per-invariant verdict would not supply the required pass. Keep six methods and graph comparison explicitly unchecked; do not invent a check or claim execution here.

### B's eight consistency rows — holds, within their stated limits

Shared package/configuration: package.json:7-18, package-lock.json:6 and both tsconfigs:10-11 support it. Build output: scripts/build.mjs:9-20 supports it. Type checking: scripts/build.mjs:10,14-15 supports no emission and failure propagation with fail-fast qualification. API fallback: src/server/app.ts:6 precedes static serving. Public root: app.ts:9 is module-relative, and tests/http.test.mjs:17-27,86-99 exercise other cwd and selected traversal inputs. Missing page: app.ts:11-13 plus tests/http.test.mjs:77-84 support it. Parts: actual source/test/build paths match the proposed assignments. Trust boundary: app.ts:6,10 handles request paths; the untrusted client classification remains a human judgment. None establishes an exhaustive input proof, a test-run result, or human acceptance. The five empty current foundations support B's no-existing-product-contradiction observation, not approval.

### B's cut and cost assessment — holds

Cut only the two unmatched patterns as a required form correction. No whole entry is redundant on the evidence: three build sentences constrain layout, production and check behavior separately; three HTTP sentences constrain API fallback, root selection and missing-page response separately. .the-way/elements/invariants/template.md:107 permits a shared future runner, so six entries do not force six runners. Part-map/template.md:211-216 keeps repository-wide build files and agent-only instructions in separate parts. Keeping five parts and six invariants carries human failure-assessment work and checking debt; combining or deleting them merely to shrink the count sacrifices distinct responsibilities/constraints. B's accept-with-fixes call is supported.

## Recommendation, concrete fixes and questions for the human

**Call: accept with fixes**, as an unapproved proposal to present to a human; not acceptance into the foundation and not merge permission.

Required correction F1, within the pinned process and without choosing product policy: replace only agent-workflow's Files field with the following for the assessed commit:

```markdown
- **Files:** AGENTS.md
  .agents/**
  .claude/**
  .gitmodules
  .the-way
```

Leaving the two docs patterns causes a form error; cutting them costs no present coverage and requires restoring ownership when documentation is tracked later. No other code or proposal edit is mandated by this settlement. Keep all six current entries, TODO methods, and explicit human gaps visible in the review copy. Before actual adoption the human must choose the prefix/decision and judgments; then record the actual approval and actual decision fingerprints in the three derivations. Those are adoption prerequisites, not authorized agent fixes.

H1. Is successful delivery a lasting product promise? Concrete proposed additional sentence, not yet an adopted entry: **After a successful build, a running server returns the built browser HTML with status 200 for GET / and its compiled entry script with status 200 and a JavaScript content type for GET /main.js.** This narrowly protects existing delivery, without freezing the page's future UI as empty. Leaving it out keeps ordinary test protection but no invariant for this success path; adopting adds a seventh invariant and its checking debt. Recommendation: adopt if this bootstrap delivery is intended to bind later changes. A separate human choice is whether its cross-part path (build-tools, server-http, browser-page) warrants a critical flow and what degree; no degree or coverage claim can be supplied from code. A flow, if approved, needs the full template fields and has no demonstrated flow-test coverage here.

H2. Is the occupied-port behavior a lasting product promise? Concrete proposed additional sentence, not yet an adopted entry: **When the configured listening address is already in use, the server process exits nonzero and does not report that it is ready.** Leaving it out retains an ordinary regression test; adopting adds an invariant and checking debt. Recommendation: retain as a human candidate; do not broaden to every possible startup fault on the strength of one occupied-port test.

H3. Does the human adopt the proposed build decision and its rationale/rejected options as new choices, and which product prefix identifies it? Its exact proposed text is in proposed/decisions.md:3-17 and in the supplied patch; this report authorizes no acceptance record. Leaving it unapproved preserves freedom but gives future work no binding build decision; adopting binds later package/build changes and requires real approval and derivation fingerprints.

H4. What failure modes, damage, severity scale, allowed dependencies and external-context judgment does the human adopt for the five proposed parts? Leaving the review copy open is honest but not a complete binding map; supplying those judgments enables the map while imposing the chosen review costs. Neither `none` nor a severity may be inferred from missing knowledge. Discuss these one part at a time with the actual proposed text and concrete damage before recording them.

No invariant method, graph comparison, coverage run or human verdict passed in this settlement. The coordinator should present the original patch, F1's effect, both settlements and these reserved questions under WAY-10. No approval has been delegated.