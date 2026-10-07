# Planning report — TypeScript 7 migration

## Result and stage boundary

Completed and self-reviewed the implementation plan at `.runs/task-cycles/typescript-7/plan.md`. It starts with the Superpowers 6.4.1 required header and checkboxes, maps the files before tasks, and separates three reviewer gates: dependency/baseline evidence, compiler behavior and conditional compatibility correction, then the final verified upgrade or fallback. This report returns to the orchestrator before implementation, installation, test execution, or product edits. The only files written in this stage are this report and the plan in the ignored cycle record.

No human approval is claimed. The task owner's intermediate delegation passes through the orchestrator. The plan's commands are for the implementation stage and none are reported as passing here.

## Inputs read and authority checked

- Read the full planning dispatch, reviewed `.runs/task-cycles/typescript-7/spec.md`, frozen task, independent `reports/spec-review.md`, design report and cycle record.
- Read the product `AGENTS.md`, pinned `.the-way/task-cycle/skill/SKILL.md`, project `the-way-implement-task` adapter, WAY-125/1, and Superpowers 6.4.1 `writing-plans/SKILL.md`. The writing-plans file names execution skills but links no additional planning resource. Its default plan path is overridden by the cycle-specific path in the dispatch and adapter.
- Verified `.the-way` gitlink and checkout both equal `c64a6071384fb57cdb9d7e9db4560ddc43e3b355`. The worktree branch is `task/typescript-7`; `origin/HEAD` is `origin/main`, and current `HEAD` and `origin/main` meet at `50c693a476326ae00f5b35bbe076aa3ef9ec508e`.
- Read all five product foundation files and the relevant `package.json`, `package-lock.json`, `scripts/build.mjs`, both tsconfigs, product tests, invariant tests and shared invariant support. The part map claims the planned primary files for `build-tools`; its lockfile is a trust boundary. There is no current foundation sentence pinning an exact TypeScript release.
- Inspected the the-way invariant and part-map guard command signatures and the product's test commands. The worktree had no `node_modules` or `dist` before planning, and no product file was modified.

The plan carries the spec-review correction that the configurations fix several options but do not eliminate all TypeScript 7 default changes. It therefore verifies actual behavior instead of asserting complete default compatibility.

## Planning decisions and rationale

1. **Run a full 6.0.3 baseline before editing.** This distinguishes a preexisting failure from a migration failure. `npm ci` is required before the invariant gate. Baseline build creates `dist`, so the TypeScript 7 no-emit check later uses `loop2_invariant_support.TreeCopy` in a temporary copy rather than mistaking earlier output for fresh emission.
2. **Try exact 7.0.2 directly through the existing launcher.** The reviewed spec has published-package evidence that the Node entry remains present, but actual Windows native installation and execution are still untested. The plan leaves `scripts/build.mjs` and tsconfigs alone unless a captured failure justifies a narrow change.
3. **Use existing negative probes as the chief proof.** `test_application_build_output.py` already compiles positive browser/server probes and rejects crossed globals. `test_account_server_typecheck.py` injects bad server types. Adding a version-string test or duplicating these probes would give little independent evidence. The plan uses focused runs and the full gate.
4. **Route a diagnostic-only test change through the foundation step.** The current crossed-source assertion expects exact `Cannot find name` wording. If TypeScript 7 changes only that text, a separate author must preserve file identity and missing-global evidence; another reviewer must deliberately break the check. The plan does not predict unobserved compiler wording or weaken the test to exit-code-only. A changed invariant file gets its applicable guard with `--base` and `--merge-onto`.
5. **Audit the lockfile as untrusted external data.** The plan inspects the whole diff, checks parsed TypeScript-related entries for npm registry URLs and SHA-512 integrity, checks native optional package metadata and architecture, and investigates unrelated dependency movement. The actual CLI run validates that metadata alone did not mislead us.
6. **Make fallback substantive and reviewable.** Exact 6.0.3 restoration could leave no product diff. If the direct attempt fails after scoped corrections, the plan calls for a durable `docs/typescript-7-migration-blocker.md` containing only observed failure, attempted fixes, restored-state verification and unchecked Linux status. The pinned part-map skill assigns that new report to `build-tools`, followed by its guard and independent foundation assessment. This is conditional; no report or part-map edit is proposed for a successful 7.0.2 upgrade. This course was supplied by the orchestrator after I raised the empty-PR issue.
7. **Keep Linux explicitly unchecked.** The frozen task records the owner's Windows-only answer. No Windows result is presented as Linux proof. The plan does not introduce an exact-version foundation decision, because the existing foundation binds TypeScript/Node/build behavior but not a patch release.

## Self-review against the spec

| Spec requirement | Plan location | Result |
|---|---|---|
| Latest stable 7.x candidate, exact pin | Global Constraints; Task 1 | 7.0.2 from reviewed 2026-10-07 source; no floating range |
| Baseline and clean Windows install | Task 1 Steps 1–3 | Baseline precedes edit; `npm ci` exercises each lockfile |
| Preserve one package, Node 24, two configurations and outputs | Global Constraints; Task 2 | First attempt changes only manifest/lockfile; checks both outputs |
| Actual compiler invocation and native package | Task 1 Steps 3–4 | CLI, architecture, installed package, lock metadata |
| Check-only no emission, real build and negative type probes | Task 2 Step 1 | Fresh-copy no-emission assertion plus existing invariant tests |
| Diagnostic change through foundation route | Task 2 Step 3 | Independent author, deliberate break, no generic-failure assertion |
| Product and full invariant checks | Tasks 1 and 3 | Baseline and final gates recorded separately |
| Lockfile trust boundary | Task 1 Step 4; Task 3 Step 4 | Registry, integrity, platform selectors, unrelated movement |
| Conditional restoration to 6.0.3 | Task 3 Steps 2–3 | Preview, explicit paths, reinstall and full verification, durable blocker report |
| Foundation return and Linux status | Task 3 Step 4 | Actual diff reconsidered; Linux named unchecked |

The plan contains no unresolved implementation placeholder. A future compiler error cannot be responsibly encoded as an exact fix before it is observed; Task 2 requires recording the real command and diagnostic and settling only a scoped correction. The fallback report content likewise must come from actual execution evidence, so the plan gives its required fields rather than fabricated text. The plan's `Review Focus` has five concrete conditions, each linked to a task's existing test or direct assertion. File names and paths match the inspected repository, including `dist/public/main.js` from `src/browser/main.ts`.

## Execution cautions for the orchestrator

- PowerShell `git add` commands name paths explicitly. Before any fallback restore, preview the task paths and restore only task-owned changes from the recorded base in the isolated worktree. An invariant-test correction may need a separate restore path.
- A changed foundation file needs its guard. The part-map guard takes `--base` and no `--merge-onto`; the invariant guard takes both on a task branch. Run tests for every changed part before the request. A check that never ran remains unchecked.
- If the direct attempt succeeds, no blocker report or part-map edit is needed. If it fails, do not call a failed 6.0.3 restoration verified; show both failures in the request.
- Review and assessment belong after implementation. No build, product test, invariant test, Linux check, dependency installation, or foundation guard was run during this planning stage.
