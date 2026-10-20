# S1 continuation - accepted npm installation and configuration

Status: DONE_WITH_CONCERNS at the product-author boundary, before independent review. All seven assigned S1 paths are complete. The accepted npm amendment and actual API/TS7 separation are implemented. The two live source/format invariants still fail on the exact baseline work assigned to later slices; they are not waived or reported as passes. The earlier s1-report.md is preserved unchanged.

## Boundary and inputs

- Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`; branch `task/coding-guidelines`, upstream `origin/task/coding-guidelines` with matching name. Start HEAD: `c47a40850baac91518568d996fc27f11ad2639be`.
- Authoritative task: frozen task.md plus amendment-npm12.md; accepted local npm is exactly 12.2.1. Original audit fork remains `c379207bfd8bd148d3589ea75604ba5165915d01`; low/moderate/high/critical still block. No policy, threshold, exclusion or comparison base was changed.
- Read both S1 handoffs, resume handoff and author contract; task, authoritative plan's constraints and S1 section, extracted task-1-brief; prior S1 report; relevant independent F2/F4/F5 reports and fixes, F2 alias report/review and F5 npm12 report/review. The latter reviews approve their bounded check changes, not this product installation. Read product AGENTS.md/CLAUDE.md, application tsconfigs, Dockerfile and existing complete assigned human/code files.
- Checked-out the-way and gitlink both remain `d829e3aa6242a9b8901274531dd82fd5c7d87628`. Read pinned guideline selection, common foundation-selection procedure and coding template; Superpowers 6.4.1 TDD, writing-good-tests and implementer prompt. No subagents, excluded branch/directory contents, global writes, vault writes, deployment, push, merge or later stage.

## Foundation and guideline selection

The complete part map assigns manifests, lockfile, build script, configurations and README to build-tools, and .gitattributes to deployment. Scope inspection across the current complete decision log selected D-01/1, D-02/1, D-03/2, D-04/3, D-05/3, D-06/3, D-08/1 through D-17/1 and D-27/1 through D-33/1; these entries were read whole, including rationale/rejected alternatives. D-07/1 was additionally read through D-01's relation. The selected-entry reading copy is s1-resume-foundation-selected.md; this is an ignored reading artifact, not a new policy catalogue. All 23 current Scope matches plus linked D-07 are accounted for.

Read the complete invariants file, both complete ESLint membership facts, relevant linked environment facts (including Node support), product glossary and pinned process glossary. The source/format/build/package invariants retain their existing meanings. Whole-foundation topic search across all five elements is retained in s1-resume-foundation-search.txt (75 matched lines); relevant ESLint/API/compiler/format/audit/lock topics add no contrary alias or new foundation meaning. No foundation file was modified and no foundation guard is claimed passed by S1.

Selected product guideline files: none, because guidelines/ is absent and this enclosing task creates them. This is the announced creation-task exception. D-28's deferred build/test exemplars apply. Current actual changes do not expand that selection; no new screen or formal kind exemplar is introduced. No styleguide exists yet. Screenshot/UI verification is unchecked because this slice changes no intended visible UI and has no selected screen route.

## Implementation and choices

1. package.json/package-lock.json retain the accepted `typescript: npm:@typescript/typescript6@6.0.2` and `typescript-compiler: npm:typescript@7.0.2` aliases and install exact npm12.2.1. A single root override, `@typescript/old: npm:typescript@6.0.2`, pins the real API behind the compatibility wrapper. Without it the existing wrapper exports actual API6.0.3 and the independent method correctly gives no verdict. Adding another direct application package or changing the adopted API/compiler would exceed scope. This supported npm override is the smallest constraint for the only occurrence; cost is an explicit transitive compatibility pin to maintain with future accepted upgrades. npm installed it under node_modules/typescript/node_modules/@typescript/old.
2. scripts/build.mjs explicitly invokes node_modules/typescript-compiler/bin/tsc for both application configurations. The rest of the build has adopted Prettier formatting. Normalized Espree AST comparison against start HEAD proves that only the compiler-path literal changes beyond formatting. Keeping the old path fails because the compatibility wrapper has no bin/tsc. Using implicit tsc bin resolution would leave alias/bin selection ambiguous; the explicit path has a small update obligation if the alias changes.
3. eslint.config.mjs composes the actual adopted presets, scopes every inherited TypeScript configuration to all four typed extensions, provides browser/Node globals and all eight TS/JS extensions under the current covered owned directories, and explicitly includes root tool configs and HTTP/startup tests. The independent live method confirms the full effective 64/92 name/level/options sets rather than only counts.
4. TS6 Programs are built in memory from the existing browser/server compiler options and dynamically discovered TS/.mts/.cts/.tsx roots. A third program covers new script/test paths beyond application tsconfigs, with Node types and the browser library context needed by view tests. These are lint-only noEmit contexts; application tsconfigs, TS7 and the single application package remain intact. A default-project allowlist does not support arbitrary recursive new paths; another tsconfig/package would expand the assigned files. Cost: creating three lint Programs and maintaining config/attribute directory patterns if the product's part ownership changes. The independent discovered-path method rejects newly owned files omitted from effective configuration.
5. prettier.config.mjs exports an empty object: this is one explicit shared configuration using every pinned default without maintaining a partial copied options list. The installed real method validates default metadata plus editor resolution. Nondefault/nested editor settings would fail that method. Narrow .gitattributes rules cover the current selected web-code roots/extensions and browser HTML/CSS, including new paths; no global text rule was added. The preexisting deploy/** LF rule is retained. There are no Python/Bash formatting changes.
6. README documents normal npm ci, local tool/check use, actual API/compiler separation, explicit original-fork audit and result codes. It explains the release-age condition only for deliberate lock regeneration. Installed npm11.13.0's inherited min-release-age produced a moving cutoff of 2026-10-13, refusing the newly accepted npm12.2.1 on 2026-10-20. An attempted command-local --before was rejected because min-release-age and before are exclusive. Root authorized command-local current-release installation; the supported `--min-release-age=0` option generated the lock successfully. Plain npm ci then succeeded under unchanged user configuration. No global config was read wholesale or modified.

Supporting primary API references consulted: npm package-json overrides documentation (https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#overrides) and typescript-eslint parser Programs documentation (https://typescript-eslint.io/packages/parser/#programs). The actual pinned installed APIs, independent methods and real execution establish feasibility; documentation alone is not a pass.

## Exact installed versions and trust boundary

s1-resume-runtime.txt checks manifest pins, lock root entries and installed runtime metadata: Node24.17.0, ESLint10.12.0, @eslint/js10.0.1, globals17.13.0, typescript-eslint8.71.2, Prettier3.9.10, npm12.2.1. Actual estree/parser-resolved exported API is6.0.2; actual separate compiler facade and native `tsc --version` are7.0.2. Real npm bundled dependencies are semver7.8.5, make-fetch-happen16.0.1 and npm-registry-fetch20.0.1.

The lock is a mapped build-tools trust boundary. Full machine parsing/entry comparison of the generated lock checks all346 package-table entries; all101 changed entries relative to start HEAD are root declarations, npm and its bundled dependency subtree, or the actual TypeScript API package. No unrelated dependency entry changes. This does not verify arbitrary tarball contents; npm ci's lock/integrity installation and the current live audit are separate evidence.

Sharpness: actual diff touches build-tools and deployment. Wrong compiler selection can break build/deployment, while wrong configuration or dependency acceptance could certify unsupported tools. The map assigns no build-tools failure-mode criticality, so no new label is invented. No runtime HTTP trust boundary, persistent application data, running server, deployment configuration or irreversible action changes. Registry data remains untrusted and the audit's supported endpoint, transport and unavailable semantics remain those of the independently authored method.

## Verification, TDD and weakest point

Before implementation, the actual configuration method failed unavailable for real API6.0.3 (exit2), and npm run typecheck failed at the old missing compiler path (exit1). These are genuine baseline failures. Configuration/installation is independently checked; no duplicate permanent test or frozen-method change was added. The compiler-path behavior change is covered by the existing failing typecheck and subsequent real compiler execution/application suite.

The weakest requirement is complete type-aware support for new variants outside application tsconfigs. The ignored s1-resume-new-paths.mjs probe copies the real configs into an isolated ignored fixture and uses the installed real ESLint/parser/TS6/Prettier via a local node_modules junction. It exercises112 cases: seven new directories across simulation, view, server, scripts and three test roots; eight language extensions; a good/bad pair for each. Typed bad cases must report no-floating-promises, which requires real type information; JS bad cases must report no-debugger. Every case keeps the exact active64/92 count and has no fatal parser result. All pass their expectations. The probe also checks122 repository attribute paths, five exclusion controls and real explicit/editor Prettier resolution. Practical limit: this real-tool fixture does not invoke the independent method's locality/discovery layer through the junction. Actual independent live methods run separately on the real product; fixture success is not full product compliance or every possible future file.

s1-resume-config-negative.py temporarily weakens no-debugger in this author's owned config, runs the real independent method and requires exit1 with named eslint-configuration-rules/1 fail, then restores exact original bytes in finally. Its outer exit0 means the negative control succeeded; its inner failure is retained. This confirms that green configuration did not come from trusting its own presets. The final source/format checks were run on the restored real product, before the later negative control; exact-byte restoration and final owned formatter check establish unchanged state afterward.

Compiler trace uses an ignored NODE_OPTIONS preload only during the two planned npm commands; it observes actual wrapper subprocess argv and version without replacing the compiler or spawn implementation. Each command records both configs, actual alias path, runtime7.0.2 and expected --noEmit presence/absence. The real native tsc --version separately prints7.0.2. Normal npm test then runs without that preload and passes all173 application tests, with no skips/failures. No additional broad suite was run.

Final real results:

- npm ci: exit0,179 packages installed,327 audited, standard npm output found0 vulnerabilities. This aggregate is not substituted for the product invariant.
- introduced-npm-vulnerabilities/1: pass, exit0 against original fork c379207, real installed npm12.2.1 bundled client/semver and current registry. The result is point in time and may change with advisory data.
- eslint-configuration-rules/1: pass, exit0, full installed effective configuration.
- npm run typecheck/build: pass, exit0 with the actual compiler observations above; build output exists for browser/server.
- npm test:173/173 pass, exit0.
- eslint-source-rules/1: fail, exit1; exactly16 no-unnecessary-type-assertion messages in the accepted five baseline files (hex12; layout/program/run/terrain-picture1 each). Assigned later slices retain them; no new tooling/config violation exists.
- prettier-source-format/1: fail, exit1;44 original files remain. The original build script is formatted in S1; all new owned JS/config files pass. No unavailable formatter/API/editor result remains.
- Owned formatter, AST/lock preservation, negative configuration,112-case new-path probe and staged whitespace checks: pass. No frozen check was edited.

The complete captured command ledger follows below. Every referenced .txt contains complete combined stdout/stderr; its adjacent .txt.json gives exact argv, actual exit and duration. Failed exploratory helper/import attempts are retained, not described as product defects: first new-path helper used a Windows absolute path as an ESM specifier; fixed to pathToFileURL. First compiler observer assumed a TS6-style lib/typescript.js in TS7 and itself failed before compiler execution; corrected to the actual version facade, then native version and both real compilations passed. An uncaptured exploratory runtime print guessed a root @typescript/old path, which is actually nested after the override; the final runtime probe resolves the real dependency chain. A Python stdin edit briefly lost Polish characters in the newly added README block; self-review replaced that entire new block with UTF-8 apply_patch and verified the complete final diff. None of these attempts changed a frozen method or was hidden as green evidence.

## Self-review, counts and remaining work

Read complete final assigned human/code files and actual diff; parsed the whole generated lock and compared every entry as above. Verified normal/editor formatter consistency, exact runtime resolution, no unrelated graph drift, compiler argv, copied output behavior, owned file set and restored mutation bytes. The final seven-path staged set excludes .runs/.superpowers and all other authors' frozen code. Existing scripted rewrites preserved line endings; formatter's LF conversion is intentional for the owned web code. No literal backslash insertion was required in product scripts; retained escaped newline strings in config were read literally after writing.

| File | Added in continuation | Removed in continuation |
|---|---:|---:|
| .gitattributes |60|0|
| README.md |13|0|
| eslint.config.mjs |108|0|
| package-lock.json |502|447|
| package.json |4|1|
| prettier.config.mjs |1|0|
| scripts/build.mjs |29|16|
| Total,7 files |717|464|

The complete S1 net review from403c446f5b90c408e013f176516ebc16e8a30a0c across these seven paths, including prior partial manifest commit3781ff9, is3560 additions/47 removals. It excludes intervening independent method changes.

Unresolved for controller: independently review this complete S1 net change, then proceed to planned dependent slices. The16 source violations and44 formatting files are genuine outstanding task work, not a merge-ready state. Python/ShellCheck installation, later fixes/formatting, guidelines and agent pointer, full final part/gate checks, deliberate breaks/guideline cases and final foundation assessment remain outside S1. No deployment/container, screenshot or final merge readiness is claimed. No new foundation meaning, method defect, accepted-scope expansion or S1 installation obstacle remains.

Continuation commit: `3a769e67dcdeada5481df0e93b37f2d8f5a1eedf` - `build: install accepted quality tools and preserve TS7 compilation`. Committed range: `c47a40850baac91518568d996fc27f11ad2639be..3a769e67dcdeada5481df0e93b37f2d8f5a1eedf`. Complete S1 review range: `403c446f5b90c408e013f176516ebc16e8a30a0c..3a769e67dcdeada5481df0e93b37f2d8f5a1eedf`, restricted to the seven assigned paths. Private author identity verified against the required private address; post-commit worktree and index are empty. The branch/upstream names still match. Commit output/exit0 are retained in s1-resume-commit.txt and adjacent JSON. Stop before independent review.

## Complete captured command ledger

| Exact argv | Child exit | Full output |
|---|---:|---|
| `["python", "-B", "scripts/check_dependencies.py", "--fork-point", "c379207bfd8bd148d3589ea75604ba5165915d01", "--record", ".runs/s1-resume-dependency-audit.jsonl"]` | 0 | s1-resume-audit.txt |
| `["python", "-B", ".runs/task-cycles/coding-guidelines/reports/s1-resume-compiler-check.py", "build"]` | 0 | s1-resume-build-green.txt |
| `["python", "-B", ".runs/task-cycles/coding-guidelines/reports/s1-resume-compiler-check.py", "build"]` | 1 | s1-resume-build.txt |
| `["python", "-B", "scripts/check_eslint.py", "--configuration", "--record", ".runs/eslint-configuration.jsonl"]` | 0 | s1-resume-config-final.txt |
| `["python", "-B", "scripts/check_eslint.py", "--configuration", "--record", ".runs/s1-resume-eslint-configuration-first.jsonl"]` | 0 | s1-resume-config-first.txt |
| `["python", "-B", ".runs/task-cycles/coding-guidelines/reports/s1-resume-config-negative.py"]` | 0 | s1-resume-config-negative.txt |
| `["git", "diff", "--check", "--", "package.json", "package-lock.json", "scripts/build.mjs", "eslint.config.mjs", "prettier.config.mjs", ".gitattributes", "README.md"]` | 0 | s1-resume-diffcheck.txt |
| `["python", "-B", "scripts/check_format.py", "--record", ".runs/format.jsonl"]` | 1 | s1-resume-format-final.txt |
| `["python", "-B", "scripts/check_format.py", "--record", ".runs/s1-resume-format-first.jsonl"]` | 1 | s1-resume-format-first.txt |
| `["node", "node_modules/prettier/bin/prettier.cjs", "--config", "prettier.config.mjs", "--write", "scripts/build.mjs", "eslint.config.mjs", "prettier.config.mjs"]` | 0 | s1-resume-format-owned.txt |
| `["npm.cmd", "install", "--package-lock-only", "--ignore-scripts", "--no-audit", "--min-release-age=0"]` | 0 | s1-resume-lock-age0.txt |
| `["npm.cmd", "install", "--package-lock-only", "--ignore-scripts", "--no-audit", "--before=2026-10-20T07:01:00Z"]` | 1 | s1-resume-lock-current.txt |
| `["npm.cmd", "install", "--package-lock-only", "--ignore-scripts", "--no-audit"]` | 1 | s1-resume-lock.txt |
| `["node", "node_modules/typescript-compiler/bin/tsc", "--version"]` | 0 | s1-resume-native-version.txt |
| `["node", ".runs/task-cycles/coding-guidelines/reports/s1-resume-new-paths.mjs"]` | 0 | s1-resume-new-paths-fixed.txt |
| `["node", ".runs/task-cycles/coding-guidelines/reports/s1-resume-new-paths.mjs"]` | 1 | s1-resume-new-paths.txt |
| `["npm.cmd", "ci"]` | 0 | s1-resume-npm-ci.txt |
| `["npm.cmd", "test"]` | 0 | s1-resume-npm-test.txt |
| `["node", "node_modules/prettier/bin/prettier.cjs", "--config", "prettier.config.mjs", "--check", "scripts/build.mjs", "eslint.config.mjs", "prettier.config.mjs"]` | 0 | s1-resume-owned-format-check.txt |
| `["node", ".runs/task-cycles/coding-guidelines/reports/s1-resume-preservation.mjs"]` | 0 | s1-resume-preservation.txt |
| `["python", "-B", "scripts/check_eslint.py", "--configuration", "--record", ".runs/s1-resume-red-config.jsonl"]` | 2 | s1-resume-red-config.txt |
| `["npm.cmd", "run", "typecheck"]` | 1 | s1-resume-red-typecheck.txt |
| `["node", ".runs/task-cycles/coding-guidelines/reports/s1-resume-runtime.mjs"]` | 0 | s1-resume-runtime.txt |
| `["python", "-B", "scripts/check_eslint.py", "--record", ".runs/eslint.jsonl"]` | 1 | s1-resume-source-final.txt |
| `["python", "-B", "scripts/check_eslint.py", "--record", ".runs/s1-resume-eslint-first.jsonl"]` | 1 | s1-resume-source-first.txt |
| `["git", "diff", "--cached", "--check"]` | 0 | s1-resume-staged-diffcheck.txt |
| `["python", "-B", ".runs/task-cycles/coding-guidelines/reports/s1-resume-compiler-check.py", "typecheck"]` | 0 | s1-resume-typecheck-green.txt |
| `["python", "-B", ".runs/task-cycles/coding-guidelines/reports/s1-resume-compiler-check.py", "typecheck"]` | 1 | s1-resume-typecheck.txt |

Commit capture: exact argv `["git", "commit", "-m", "build: install accepted quality tools and preserve TS7 compilation"]`; child exit0; complete output s1-resume-commit.txt and adjacent JSON. Final git status/index/name-set and literal-newline/UTF-8 checks were read-only; no new product change or broad test run followed the commit.
