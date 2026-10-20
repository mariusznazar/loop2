# Design report

Stage: BLOCKED on role-preservation acceptance after independent spec review; not implementation-ready. No implementation, planning or commit. Output: `.runs/task-cycles/styleguide-loop2/spec.md`.

## Inputs and version checks

Read frozen task `task.md` (including Q1–Q19, carried questions and all 22 settlements), `reports/start.md`, root AGENTS, pinned task-cycle design/dispatch boundaries, product-guidelines reading procedure, styleguide and generic templates, common foundation reading procedure, complete part map and decision log. Base is `dc1f9cf9e9f3713386b6059d8214e588c69e5ba8`.

Manual version inspection by design agent: `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD` both showed `d829e3aa6242a9b8901274531dd82fd5c7d87628`; command invocation completed with exit 0. These are read-only source-identification commands, not invariant check runs; their complete useful outputs are the two hashes just given. No product check command was executed by this agent.

Read Superpowers brainstorming 6.4.1 whole. Classified architectural because the work introduces common controls, value-source/build interfaces and mechanical check contracts. No visual question needs a new mockup: exact appearance choices already stand in the frozen task. Visual companion was therefore not invoked. Its architectural process is adapted by the task cycle: spec remains ignored, approvals are provisional orchestrator choices, and no next implementation/planning skill is invoked.

Before reading the source-only MVP definition, read the Obsidian rulebook. Source definition status is approved 2026-10-13. Read goal/scope/constraints/technology and inspected projected-entry headings; the relevant program-rule counter entry does not authorize adding a counter here. No MVP projected entry is made true by this task. Read no loop UI/engine code and no prohibited branch/directory.

## Independent source selection

Prospective touched parts are browser-view, build-tools, agent-workflow, product-foundation and deployment. Deployment becomes definite because fonts are vendored under assets and Docker currently copies/adopts only icons. Complete current Scope inspection matches D-01 through D-19, D-21, D-23, D-26 through D-33 and D-36; source references and governing links additionally reach D-22. Read the complete decision log, so no matched entry is missing; D-20, D-24, D-25, D-34, D-35 and D-37 were also read but do not add work. Existing D-19 explicitly leaves real-browser verification without a declared route.

Read current invariant Part fields throughout; read whole entries for every/global, browser/build/deployment/agent-workflow checks and gameplay invariants linked by view decisions. Read product and pinned process glossaries. Searched all foundation files for style/font/focus/token/contrast/color/control/page concepts; no existing appearance foundation entry duplicates the task's settlements. Relevant linked environment facts include icon licenses/titles, runtime, deployment and adopted lint sets; long tool-set source quotations remain the existing facts, not revalidated external evidence. The design does not alter their facts or adopted sets.

Inspected headers of every current guideline and complete general kind index. Read `guidelines/coding.md` and `guidelines/coding-browser-module.md` whole. The first applies to all code touched, including new scripts and standalone page; the latter applies to shared controls and existing view modules. Existing kind guidelines for simulation/data/HTTP application do not match the actual changes. CSS remains an accepted D-28 deferral, with the task's explicit amendment, and no CSS exemplar is invented. Missing browser styleguide is the task's output, not a prerequisite. The standalone page outside the ordinary compiler requires actual ESLint program/global scope, format discovery and part ownership extensions; this is explicitly included.

Code read for feasibility: current package/compiler/build configuration, root HTML styles, status row, program editor, send panel, terrain renderer/model/list, current view-test pattern, Dockerfile, dockerignore and quality support discovery/recording. Existing tests principally exercise pure data functions; they do not provide a real DOM or browser. The spec distinguishes a recording-DOM structural check from rendered evidence.

## Choices and costs

The orchestrator gave provisional go-ahead to the four directions and subsequently to the instruction-file routing. These are delegated choices, not user approval:

1. JSON token source plus generated CSS. Makes values/kinds/source adjacency decidable without executing code; costs a small deterministic generator. CSS comments would avoid generation but complicate metadata extraction; TS would make a data source executable.
2. Official vendored WOFF2 font files with license. Avoids an npm package for two binaries; costs manual updates and narrow Docker copy/include changes. npm would add dependency audit/updates. Binary source/provenance and trust-boundary checks are required.
3. Separate `tools/styleguide/` source/config/output and loopback preview command. Costs a compiler configuration and local launcher, uses the existing compiler and does not alter the account server. A general explorer would add substantial dependencies; source inside the main browser compiler risks shipping the page.
4. Exported six-control registry plus actual DOM construction inspected by checks. This is stronger than manifest presence, while remaining within current tool capabilities. Static focus analysis covers the agreed structural condition and treats unsupported syntax as inability, never a shrunken-scope pass. Full rendered evidence remains separate.

Additional small choices: six semantic factories may share implementation; fields expose native nodes and error association; controls preserve callbacks/clamping/focus identity; page preview hover/focus styles are development-only and checked against real state declarations; token output is generated/untracked; state page builds only under `.runs`; preview serving is output-directory-only and loopback. These follow existing DOM/build patterns and preserve task meanings.

Leaving the current UI unchanged fails the task's immediate migration and observed audit problems. The selected changes are local/reversible. No out-of-repository write is required; browser opening is the command's user-facing local behavior, not a design-stage action.

## Font evidence

Official public repository read through web, without authentication or private identifiers: https://github.com/vercel/geist-font. It identifies SIL Open Font License 1.1 and release downloads.

Public API read-only calls on 2026-10-20:

- `https://api.github.com/repos/vercel/geist-font/releases/latest`: tag `v1.8.1`, release `https://github.com/vercel/geist-font/releases/tag/v1.8.1`, asset `geist-font-v1.8.1.zip`.
- `https://api.github.com/repos/vercel/geist-font/git/trees/v1.8.1?recursive=1`: contains both variable webfonts and OFL.
- `https://api.github.com/repos/vercel/geist-font/commits/v1.8.1`: commit `e1f671c727f6de7e97c1e1d26dbb44f349c19459`.
- `https://raw.githubusercontent.com/vercel/geist-font/v1.8.1/OFL.txt`: copyright notice and OFL 1.1; distribution includes notice/license.

No binary was downloaded or product dependency installed. Exact font paths and pinned license URL are in the spec. Binary validity/hash verification belongs to implementation; not claimed passed. Web's attempt to open latest-release API returned inaccessible; direct unauthenticated API read then succeeded. This is source research, not product-test evidence.

## Instruction method discrepancy

The product has no installed `the-way-maintain-instruction-files` adapter. The adapter in `.the-way/.agents/skills/` says it serves the-way itself and redirects a product to its own adapter. The installed personal `maintain-instruction-files` method explicitly selects the product's pinned `.the-way/instruction-files/SKILL.md`, which exists and self-selects this pin. Read these entry points and underlying method; the implementation owner must read its principles/loading files and perform placement checks.

The orchestrator explicitly accepted using the exact pinned underlying method via the installed adapter, while recording the task's naming discrepancy. No replacement version or new adapter is introduced, and no global instructions are edited. The task already authorizes the two placements; cycle delegation applies to their intermediate approval.

## Verification proposed, not executed

The spec gives check CLI contracts, required discovery scope, failure versus inability semantics, explicit fork-point handling, real state-node assertions and an actual production build/reference inspection. The role-meaning method remains three independent agent readings with two required successes. New invariant sentences, tests and implementation need separate authors. Reviewers must observe deliberate-break failures and strict whole-file good/bad cases.

Existing product tests/typecheck, quality methods, invariant tests, changed-part tests and foundation/guideline guards are required on implementation. The parent's baseline npm install/test result is context only; this agent neither ran nor claims those checks. No new check has passed yet. Commands/exit codes/full-output paths for executed product checks: not applicable, none run. No screenshot, keyboard traversal, browser rendering, Docker font serving or network font request absence was observed.

## Self-review and next boundary

Self-reviewed spec for missing task coverage, invented gameplay, value drift, first-introduction fork-point cases, source and executable boundaries. Every task To do has a destination. Values remain in the frozen source; the spec requires exact copying without inventing extra role semantics.

The independent review found the proposed synthetic-base acceptance incompatible with the actual fork-point definition and mandatory first-commit guideline-case test. The spec now marks this requirement BLOCKED and removes that workaround as an acceptance method. The actual fork has no roles, making historical name/kind preservation vacuously true. A synthetic base can test the checker's ordinary behavior, but it cannot supply the mandated bad guideline case against the real fork. Schema errors or deletion of a newly introduced role cannot be relabeled as breaches of that historical invariant.

The parent orchestrator prepares the blocked draft and owns the decision needed to resolve this conflict. The four settled design directions remain unchanged. Division remains a conditional recommendation only after the conflict is resolved, because of the check contracts, foundation/guideline cases and author independence. No implementation is authorized by this report's current status.

Correction touched only this report and `spec.md`; no product changes, test runs, new review loop or commits. The next boundary is the blocked draft, not implementation.
