# Panel settlement 2: consistency (B), then application (A)

## Input scope and order

After writing the first settlement, I read both assessments whole again, this time `.runs/task-cycles/app-skeleton/reports/panel-consistency.md` before `.runs/task-cycles/app-skeleton/reports/panel-application.md`. This second settlement starts from B's form, source and cost questions, then tests A's behavior claims against the allowed files. It does not adopt either assessor's causal explanation without checking the source.

Repository: C:/Storage/repos/loop2-skeleton. Code range: 3342d43bb2bff033efa1791f2f3037020af6f5f7..de3ceb36b51636464c8e5fd80980e8c9d18754ed. Checked HEAD is the latter and the assessed tracked code/foundations have no difference from it. The gitlink and checkout both resolve to pinned process 271222203981b5cedd2fcbf3451b60362cc3e4d4. Authority is .the-way/elements/common/panel.md and .the-way/foundations/decisions.md:288 (WAY-10/1), with the relevant element templates/common rules/ownership guard. There are no existing product foundation entries.

Assessed input files: `.runs/task-cycles/app-skeleton/assessment/manifest.json`, `code.diff`, `UNAPPROVED-foundation.patch`, `code-evidence.md`, `proposed/decisions.md`, `proposed/invariants.md`, `proposed/part_map.md`; below `proposed/` refers to that assessment directory. Checked proposed-file hashes match the manifest: decisions d855b6bbd85a134b3b528da2ba5202216a9997c150015a00cda5e1fb91dfe7fe; invariants d40f34592305ad6e26c5777e81afe65472752089f013cf65e8d076065078297e; map 040269e9d4b22d107c8d3dac5b4dd06f8feaa3bef8ef1b798d40b5102f58cd93.

Code files assessed: .gitignore, README.md, package-lock.json, package.json, scripts/build.mjs, src/browser/index.html, src/browser/main.ts, src/server/app.ts, src/server/main.ts, tests/http.test.mjs, tests/startup.test.mjs, tsconfig.browser.json, tsconfig.server.json. Existing foundations read: decisions.md, environment_facts.md, glossary.md, invariants.md, part_map.md under foundations/. Tracked names were inspected for ownership, not excluded document contents. No task, spec, plan, chronicle, author report, return folder or other reviews were read. No tests or guards were run; no test pass is claimed. Only these settlement reports are written.

This is an UNAPPROVED candidate foundation, not an invariant-test-mechanics change. Agreement cannot approve it: WAY-10 leaves adoption to a human. Human prefix/approval, scale and failure assessments are explicitly missing, and methods are TODO.

## Every remark, checked in B then A order

### B1 — holds

proposed/part_map.md:67-68 claims docs/superpowers/** and docs/task-cycles/**. Actual tracked names at the assessed commit contain no match for either. The ownership guard at .the-way/elements/part-map/format_guard.py:806-813 emits an error for a Files pattern without a tracked file. Cut the two patterns in a map applied to this commit. That is a form repair, not a product-policy decision; untracked documents do not change the evidence. Retaining them fails form, removing them loses no present coverage. A later commit with tracked docs needs its own matching ownership and reassessment.

### B2 — holds

Missing identity/approval in proposed/decisions.md:3,14 and derivations in proposed/invariants.md:9,19,29 cannot become binding records as written. .the-way/elements/decisions/template.md:273-278 requires a human and date; common/rules.md:17-24 does not turn unknown into none. Scale/failure fields at proposed/part_map.md:5,29,40,55,70,79 are human-dependent; part-map/template.md:26-27 permits no TODO in part fields and :184-186 assigns failure modes to the human.

Rationale/rejections at proposed/decisions.md:16-17, dependencies at proposed/part_map.md:28,39,54,69,78 and the HTTP-client row at :11 are proposed judgments. Source shows current architecture, not historical deliberation. Treat them as new choices to adopt; do not present them as recovered human reasoning. If called inherited instead, the decision template :265-271 requires searched origin and unknown/sourced/human-given rationale. No historical claim is needed for this explicitly new unapproved proposal. Gaps are adoption conditions, not hidden omissions or authorization to fill them.

### B3 — holds

Six methods at proposed/invariants.md:7,17,27,37,47,57 are TODO. .the-way/elements/invariants/template.md:98-110 reports that as unchecked and requires a versioned verdict before a pass. tests/http.test.mjs:53-99 and tests/startup.test.mjs:7-35 do not emit those verdicts. .the-way/elements/decisions/template.md:183-191 allows level 1 with a derived invariant whose method remains unknown. package.json:7-12 supplies no dependency-graph command; part-map/template.md:3-7 leaves comparison unchecked. No new runner or downgrade is justified simply to remove honest debt.

### B's consistency table — holds with its explicit limits

1. Shared package and distinct outputs: package.json:7-18, package-lock.json:6, tsconfig.browser.json:10-11, tsconfig.server.json:10-11 support the proposal, not approval.
2. Build output: scripts/build.mjs:9-20 compiles both configs and copies HTML only outside check mode.
3. Type checking: package.json:8 and scripts/build.mjs:10,14-15 support no emission and nonzero failure, while the loop exits early on failure. The wording does not require collecting both compilers' diagnostics after one fails.
4. API: src/server/app.ts:6-8 precedes static serving; tests/http.test.mjs:65-74 tests ordinary paths/methods/HTML Accept.
5. Public root: app.ts:9 uses import.meta.url; tests/http.test.mjs:17-27 and :86-99 exercise other cwd and selected traversal strings. No exhaustive runtime proof follows.
6. Missing page: app.ts:11-13 and tests/http.test.mjs:77-84 support plain 404 rather than home-page fallback.
7. Parts: browser sources, server sources/tests and build/config paths match proposed/part_map.md:27-53; the five current foundation files justify ownership of foundations/** even without entries.
8. Trust boundary: app.ts:6,10 receives request paths and proposed/part_map.md:41 points there; classification of HTTP clients as untrusted is still a judgment.

Current empty foundations show no contradiction with an existing product entry; they do not authorize new constraints.

### B's cutting/maintenance recommendation and call — holds

Only the two unmatched patterns have a demonstrated removal benefit without losing a current rule. Layout, produced output and typecheck constrain distinct properties, as do API response, static root and missing-page behavior (proposed/invariants.md:5,15,25,35,45,55). One runner may later check several entries (invariant template :107), so six rules do not require six programs. Repository-wide build files and agent instructions belong in separate parts (part-map/template.md:211-216). No whole entry must be cut for redundancy. Keeping the set carries six unchecked methods and five human failure assessments. B's accept-with-fixes call is proportionate.

### A1 — holds in part

A identifies a real missing positive constraint. src/server/app.ts:9-10 provides static delivery, src/browser/index.html:9 loads the entry module, and src/browser/main.ts:1-2 appends main. tests/http.test.mjs:53-63 asserts successful delivery but not browser execution. Delete static middleware at app.ts:10: JSON fallback remains and other requests receive 404. None of the six proposed invariants explicitly promises a successful response; the root rule can become vacuous and the missing-file rule does not require present files to be served. Thus test failure can escape this proposed invariant set.

A's unconditional blocker label goes beyond allowed evidence. The build decision at proposed/decisions.md:5,11 only binds compilation and correctly lists its three build invariants; it does not claim page delivery. There is no existing product decision requiring that this observed behavior become a lasting invariant. This is a human coverage choice, as A's own conclusion partly acknowledges. A critical flow also requires human judgment/degree, not inference that every cross-part behavior is critical. Recommend the narrow additional sentence below, conditionally; no automatic new invariant or flow.

### A2 — holds

The identity, approval, derivation, scale and failure gaps are present at the exact proposal locations given under B2. Common/rules.md:17-24, decision template :273-278 and part-map template :26-27,184-186 support blocking binding adoption until real human choices exist. These explicit omissions do not block presenting a candidate. No invented none, severity or acceptance is permissible.

### A3 — holds

The same six TODO fields and ordinary tests identified under B3 establish unchecked methods. Reviewability and checking are distinct; no automated guarantee or pass is supplied. Leaving this debt is permitted, not a reason to rewrite meaningful sentences or invent a method.

### A4 — holds

src/server/main.ts:3-10 returns on an error, setting a nonzero exit code and omitting readiness output. tests/startup.test.mjs:7-31 covers the occupied configured port. None of proposed/invariants.md:5-55 covers it and server-http's failure field is unknown. A correctly leaves lasting protection to the human. This is no current startup defect and does not justify expanding to every possible startup failure; the candidate below is restricted to the observed occupied-address case.

### A's six application examples, ownership observations and call — holds with qualification

Each stated edit contradicts its named candidate sentence: package/config output edits versus proposed/invariants.md:5; removing scripts/build.mjs:18-20 versus :15; removing --noEmit or returning zero at scripts/build.mjs:10,15 versus :25; HTML API response at app.ts:6-8 versus :35; cwd/repository-root lookup instead of app.ts:9 versus :45; home-page fallback at app.ts:11-13 versus :55. These are counterexample reasoning, not executed mutation tests.

The thirteen changed files each have one proposed owner, existing tracked instructions/submodule and foundation files fit their owners, and neither docs pattern matches. package.json:7-12 has no graph command, so dependencies remain proposed allowed relationships. A's accept-with-fixes call is supportable with its page-delivery suggestion treated as human-dependent, not mandatory merely because the test exists.

## Recommendation and human boundary

**Call: accept with fixes**, for a human-review proposal only.

Required mechanical fix F1 for the named assessed commit: replace agent-workflow's Files field with this exact block, removing only the two unmatched docs patterns:

```markdown
- **Files:** AGENTS.md
  .agents/**
  .claude/**
  .gitmodules
  .the-way
```

Retaining the two patterns produces a form error; cutting them costs no current ownership and requires adding ownership when future docs are tracked. No other code or proposal edit is required by this settlement. Keep the six present entries, TODO methods and explicit human gaps visible. Before adoption, a human must settle the build decision/prefix and map judgments, after which actual approval and actual fingerprints replace placeholders. The panel supplies no invented approval.

H1. Is successful delivery a lasting product promise? Concrete candidate: **After a successful build, a running server returns the built browser HTML with status 200 for GET / and its compiled entry script with status 200 and a JavaScript content type for GET /main.js.** Leaving it out preserves ordinary tests but leaves invariant protection absent; adopting creates a seventh invariant and its method debt. Recommend adoption if this bootstrap delivery is intended to bind later work. It does not freeze an empty UI. Whether build-tools, server-http and browser-page form a critical flow, with which degree, is a separate human decision; actual flow fields/test coverage cannot be fabricated.

H2. Is occupied-port behavior a lasting promise? Concrete candidate: **When the configured listening address is already in use, the server process exits nonzero and does not report that it is ready.** Leaving it out keeps an ordinary regression test; adopting adds an invariant and checking debt. Keep it a human candidate without claiming coverage of all startup faults.

H3. Does the human adopt the full proposed build decision/rationale/rejections as new choices, and which product prefix identifies it? proposed/decisions.md:3-17 and the supplied patch contain the exact material. Unapproved wording leaves future choices free; adoption binds them and requires the real approval record and derivation fingerprints. Do not recover historical reasoning from present code.

H4. Which failure modes, damage, severity scale, allowed dependencies and external-context judgment does the human adopt for the five parts? Leaving gaps preserves uncertainty but is not a finished map; adopting explicit judgments enables it at the resulting review cost. Review actual wording one part at a time and never substitute none for an unknown.

Six invariant methods, graph comparison and any proposed flow coverage remain unchecked. No new pass, human verdict or authorization is claimed. The coordinator must bring the diff, effects and settlements to the human under WAY-10.

## Agreement after swapped reading

Both settlements give **accept with fixes**, with the same required fix F1 (remove the two unmatched docs ownership patterns only for this assessed commit), the same preservation of six existing candidate invariants/TODO methods, and the same adoption conditions. Both classify A1 as holds in part, all other numbered remarks as holds, and keep page delivery/startup/critical-flow decisions human-dependent. Both recommend no whole-entry cut and no new check implementation. Reading B before A does not change the call, fixes or reserved questions. This agreement is a recommendation about new foundation entries, not panel authority to accept them.