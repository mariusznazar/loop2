# Independent panel assessment B

Perspective: consistency and form, including what can be cut, maintenance cost, redundancy and source-to-code honesty.

## Assessed material and boundary

Repository: C:/Storage/repos/loop2-skeleton.

Code range: 3342d43bb2bff033efa1791f2f3037020af6f5f7..de3ceb36b51636464c8e5fd80980e8c9d18754ed. HEAD was de3ceb36b51636464c8e5fd80980e8c9d18754ed, with no tracked difference from that commit. Untracked docs were not opened. The submodule checkout and gitlink both named 271222203981b5cedd2fcbf3451b60362cc3e4d4.

This assessment concerns the UNAPPROVED proposed foundation alongside the named code commit. It does not accept entries into the foundation or authorize a merge. WAY-10/1 reserves this kind of change for a human (.the-way/foundations/decisions.md:288). All current product foundation files have no entries.

Assessed code files: .gitignore; README.md; package-lock.json; package.json; scripts/build.mjs; src/browser/index.html; src/browser/main.ts; src/server/app.ts; src/server/main.ts; tests/http.test.mjs; tests/startup.test.mjs; tsconfig.browser.json; tsconfig.server.json. Their list agrees with the actual git diff for the range above. Existing foundation files read: foundations/decisions.md, foundations/environment_facts.md, foundations/glossary.md, foundations/invariants.md, foundations/part_map.md.

The supplied manifest, code diff, proposed patch, three proposed files and code-evidence.md were read. The code-evidence file was treated as an index of claims and each substantive finding below was checked against code or pinned process files. No task, spec, plan, chronicle, other assessment or author report was read. Tracked names alone were enumerated to assess ownership; the untracked docs were not treated as code-commit evidence. No tests or guards were rerun; no pass is claimed. Only this report was written.

SHA-256 of supplied inputs, all under .runs/task-cycles/app-skeleton/assessment/:

| File | SHA-256 |
|---|---|
| manifest.json | e85fdec45c89057f1e719f789585e6aa704be77d5c6f3674b165c4d3b483ef44 |
| code.diff | 466508e391c1dee3db940884be7c4ffbc1c7736df30e44bdb399893958b7e4c5 |
| UNAPPROVED-foundation.patch | cf0c8eec742e88c0f963057495e09d94affd6f859c8f20733c87b18ec2db9c2d |
| code-evidence.md | 4f285bfd5abaf192a565c5aee48164fbc6254f446af23ad10c21eb1dc29dd538 |
| proposed/decisions.md | d855b6bbd85a134b3b528da2ba5202216a9997c150015a00cda5e1fb91dfe7fe |
| proposed/invariants.md | d40f34592305ad6e26c5777e81afe65472752089f013cf65e8d076065078297e |
| proposed/part_map.md | 040269e9d4b22d107c8d3dac5b4dd06f8feaa3bef8ef1b798d40b5102f58cd93 |

The three proposed-file hashes match the manifest.

## Exact input prompt

> Independent panel assessor B, perspective: consistency and form; explicitly name what can be cut from proposed set or that nothing can, cost/redundancy/source-to-code honesty. Work C:/Storage/repos/loop2-skeleton. Follow pinned .the-way/elements/common/panel.md and WAY10, relevant element templates/rules; verify pin271222203981b5cedd2fcbf3451b60362cc3e4d4. User delegates workflow coordination root, no human foundation approval; no code/proposal/git changes, no subagents. Stage boundary your full assessment only. INPUTS ONLY: .runs/task-cycles/app-skeleton/assessment/manifest.json, code.diff (base3342d43bb2bff033efa1791f2f3037020af6f5f7..de3ceb36b51636464c8e5fd80980e8c9d18754ed), UNAPPROVED-foundation.patch, proposed/{decisions,invariants,part_map}.md, code-evidence.md; actual code files and five unchanged foundations at namedcommit. Do NOT read task/spec/plan/chronology/prompts/author report/other assessment or whole return folder. Current HEAD same code with only untracked docs. Candidates explicitly unapproved, human prefix/approval/failure modes/scale missing, all invariant methodsTODO; assess proposal for human review, not assert accepted entries. Verify every substantive remark against actual allowed material, cite file:line, mark blocking vs human-dependent conditions, end ONE call accept/accept with fixes/redraft. No broad test rerun; no file mutation except own report. Full report .runs/task-cycles/app-skeleton/reports/panel-consistency.md; include assessed filelist/hash/range, perspective, exact input prompt, evidence/remarks/call and explicit cut recommendation. Return concise call/report. No direct human question, no next stage.

## Findings

### B1 — Fix the two ownership patterns that have no files in the assessed commit

**Blocking for applying this exact map to the assessed code commit; mechanically repairable, not a human-dependent policy choice.**

The proposed map assigns `docs/superpowers/**` and `docs/task-cycles/**` to agent-workflow (.runs/task-cycles/app-skeleton/assessment/proposed/part_map.md:67). Neither has a tracked match in de3ceb36b51636464c8e5fd80980e8c9d18754ed. The evidence index acknowledges this at .runs/task-cycles/app-skeleton/assessment/code-evidence.md:21. This is not merely unused documentation: the pinned guard explicitly emits an error for every Files pattern without a tracked match (.the-way/elements/part-map/format_guard.py:809).

Cut both patterns from a proposal tied solely to this commit. If the foundation is later applied to a commit that contains these documents, retain or reintroduce only the patterns with actual tracked matches and reassess against that commit. Untracked files cannot satisfy the rule at the named code commit.

Leaving the patterns makes this map fail that form check. Removing them costs no ownership coverage today; adding future documentation will require adding its ownership in the same later change. This finding does not require reading the excluded document contents.

### B2 — The missing approval and human assessments remain conditions, not agent fixes

**Human-dependent; blocks treating the proposal as accepted or merge-ready, not presenting it for review.**

The decision has a placeholder prefix and `Approved by: on acceptance` (.runs/task-cycles/app-skeleton/assessment/proposed/decisions.md:3 and :14). Approval needs an actual human and date, not an agent verdict (.the-way/elements/decisions/template.md:275). The first three derivations are explicitly TODO pending that decision identity (.runs/task-cycles/app-skeleton/assessment/proposed/invariants.md:9, :19, :29). Those must become real decision references with fingerprints if the decision is accepted.

The criticality scale and every part's failure assessment remain unanswered (.runs/task-cycles/app-skeleton/assessment/proposed/part_map.md:5, :29, :40, :55, :70, :79). The template permits no TODO in part fields and states that a human writes failure modes (.the-way/elements/part-map/template.md:26 and :184). Substituting `none` would turn missing knowledge into a claim of absence. Leaving these clearly marked in an unapproved review copy preserves the uncertainty. They cannot be carried unchanged into a finished foundation.

The rationale, rejected options, dependencies and HTTP-client row are proposed judgments. Their correspondence with code does not establish that a human chose them. In particular, code can show a shared package and absence of a bundler; it cannot prove that somebody previously rejected a bundler for the reason in .runs/task-cycles/app-skeleton/assessment/proposed/decisions.md:17. Present that wording as a proposal to adopt, not recovered historical reasoning.

### B3 — TODO methods are honest checking debt, not a reason to invent passes or downgrade verification

**Nonblocking for review; six invariants remain unchecked.**

All six Method fields say TODO (.runs/task-cycles/app-skeleton/assessment/proposed/invariants.md:7, :17, :27, :37, :47, :57). This is allowed for an invariant, including on the main branch under the common rules (.the-way/elements/common/rules.md:20). The level 1 verification is also appropriate despite unknown methods: the decision template explicitly separates deriving an invariant from knowing its method (.the-way/elements/decisions/template.md:189).

The ordinary HTTP tests check relevant outcomes at tests/http.test.mjs:54, :65, :77 and :86, but contain no invariant citations or per-invariant versioned verdicts. The pinned template says a run without such a verdict gives no pass (.the-way/elements/invariants/template.md:107 and :211). Nor does package.json:7 declare a dependency-graph command. The map comparison therefore stays unchecked, as .the-way/elements/part-map/template.md:5 requires.

Leaving TODO costs unautomated protection; replacing it now with the ordinary npm test command would imply a checking contract the current tests do not provide. Do not manufacture a method or require a new check implementation merely to make this proposal look complete.

## Consistency and source-to-code checks

| Proposed content | Verified support and limit |
|---|---|
| Shared package, separate compilation | package.json:7, package-lock.json:6, tsconfig.browser.json:10 and tsconfig.server.json:10 support the proposed decision and layout invariant. This is an architectural choice proposal, not evidence of prior human approval. |
| Build output | scripts/build.mjs:9 compiles the two configurations; :18 gates HTML copying to build mode; :20 copies HTML. Separate from merely having two configuration files. |
| Type checking | package.json:8 selects check mode; scripts/build.mjs:10 passes --noEmit and :15 returns a failed compiler status. The loop is fail-fast: it need not run the second compiler after the first fails. The invariant should be understood as covering both configurations on a successful check, not promising full diagnostic aggregation. |
| API fallback | src/server/app.ts:6 places the JSON 404 handler before static serving. tests/http.test.mjs:65 covers the stated paths and HTML negotiation across methods. |
| Public-file root | src/server/app.ts:9 resolves the root against import.meta.url; tests/http.test.mjs:17 constructs the app from another directory, and :86 checks selected traversal attempts. These are code and ordinary test evidence, not an accepted invariant verdict. |
| Missing page | src/server/app.ts:11 supplies a 404 instead of an HTML fallback; tests/http.test.mjs:77 covers ordinary missing routes and files. No claim of exhaustive HTTP-input verification follows. |
| Parts | src/browser/main.ts:1 and src/browser/index.html:9 fit browser-page; src/server/app.ts:4 and src/server/main.ts:3 fit server-http; package.json:7 and scripts/build.mjs:9 fit build-tools. Tests remain with the server part they exercise. The five unchanged foundation files justify a foundation owner even before entries exist. |
| Trust boundary | src/server/app.ts:6 and :10 handle client request paths; the map points to this file at .runs/task-cycles/app-skeleton/assessment/proposed/part_map.md:41. HTTP-client trust classification remains a proposed judgment. |

No contradiction with an existing product decision, invariant, glossary term or environment fact was found: those five foundation files contain no entries. That absence does not itself authorize these new rules.

## What can be cut, and what should remain

Cut the two currently unmatched documentation ownership patterns as described in B1.

I recommend cutting no whole entry from the proposed set on redundancy grounds. The three build invariants protect distinct properties: layout, produced output, and no-output checking. A shared build script can implement all three, and the pinned template allows one future method run to check many invariants (.the-way/elements/invariants/template.md:107); three entries do not require three runners. Combining them would save fields but make later weakening of one property harder to isolate.

The three HTTP invariants likewise separate an API response contract, static-root selection, and page fallback behavior. Removing one loses a distinct constraint shown in src/server/app.ts:6, :9 or :11. The five-part division is proportionate: repository-wide build files and agent instructions are explicitly separate kinds of part under .the-way/elements/part-map/template.md:213 and :215. Merging those just to reduce the entry count would conflict with that separation. Keeping these entries costs six unchecked methods and five human failure assessments; that cost should be visible at human review, not concealed by empty or invented answers.

## Call

**accept with fixes**
