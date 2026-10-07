# Design report — TypeScript 7 migration

## Dispatch and classification

Read `.runs/task-cycles/typescript-7/task-frozen.md`, product `AGENTS.md`, the five foundation files, the pinned task-cycle adapter, WAY-125, Superpowers 6.4.1 `brainstorming`, and the relevant manifest, lockfile, build script, configurations, README, and invariant tests. The `.the-way` gitlink and checkout both resolve to `c64a6071384fb57cdb9d7e9db4560ddc43e3b355`. The task is **bounded** by brainstorming's classification: it changes a compiler dependency in an existing, inspectable flow. The the-way task cycle explicitly calls for the **architectural path** and its written spec/plan for every ready task. I used that path through spec self-review and stopped before `writing-plans`. No product file, dependency installation, or build result was changed or claimed in this stage.

The task owner wants a working TypeScript 7 migration or a documented fallback to 6.0.3. Their explicit 2026-10-06 answer accepts Windows-only verification in this cycle; Linux is for the first deployment task. The independent task relation adds no project-plan assignments. The orchestrator, not the human, may provisionally settle intermediate workflow choices; this report claims no human approval.

## Sources and observed behavior

| Source | Observation and design consequence |
|---|---|
| `package.json`, `package-lock.json` | One package and lockfile pin `typescript: 6.0.3`; migration should pin one exact 7.x version and regenerate the lockfile through npm. |
| `scripts/build.mjs` | `spawnSync(process.execPath, [node_modules/typescript/bin/tsc, -p, config, ...])` checks/builds browser then server. `--check` adds `--noEmit`; build copies HTML after both succeed. |
| `tsconfig.browser.json`, `tsconfig.server.json` | Both name their libs, types, root and output directories. Browser `types: []` and DOM lib; server `types: ["node"]` and ES lib. No deprecated option listed in the TypeScript 7 announcement appears in these files. |
| `tests/invariants/test_application_build_output.py` | Three tests prove emitted JavaScript, made-up source compiled in each configuration, and rejection of cross-configuration globals. Negative probes require exact TypeScript 6 wording `Cannot find name '<name>'`; TypeScript 7 wording needs a real probe. |
| `tests/invariants/test_account_server_typecheck.py` | Tests clean typecheck/build and deliberate type errors, plus a deployment-route tripwire. Retain this behavior with 7. |
| Foundation `D-01/1`, `D-06/2`; named invariants | Require TypeScript/Node 24, pre-deployment server typecheck, one npm package and lockfile, separate configs/output, and both builds. They do not pin compiler version or a particular CLI invocation. |
| `foundations/part_map.md` | `build-tools` owns the manifest, lockfile, launcher, configurations, and build-output invariant test. Failure modes and criticality scale are unspecified, so the task cycle treats sharpness as highest. `package-lock.json` is a trust boundary. |
| [npm latest metadata](https://registry.npmjs.org/typescript/latest), read 2026-10-07 | Version is 7.0.2; the target is exact `7.0.2`, not a floating `7` range. |
| [Official TypeScript 7.0 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/), read 2026-10-07 | TypeScript 7 is a Go native port, aims at TypeScript 6 CLI/typecheck compatibility, adopts new defaults, and makes deprecated flags hard errors. It lacks a stable programmatic API at 7.0; this repository directly uses the CLI. |
| [Published npm tarball](https://registry.npmjs.org/typescript/-/typescript-7.0.2.tgz), read 2026-10-07 in memory | `package/bin/tsc` contains `#!/usr/bin/env node` and imports `../lib/tsc.js`. That module resolves a platform package and runs its executable; `package.json` lists Windows and Linux native packages as optional dependencies. The existing Node launcher path is valid by package structure, though actual installation/execution has not been tested. |

The package tarball inspection used an in-memory Python download with a generic `User-Agent`; no owner or machine details were sent. It performed no installation or product write. The current worktree was clean before these cycle-record files were written.

## Approaches and tradeoffs

1. **Exact 7.0.2 upgrade with existing build script — recommended.** Lowest code churn and directly tests the published package's Node launcher. Cost: the npm install now depends on a platform-native optional package; Windows succeeds only if npm installs and launches it. Linux cannot be inferred from this test.
2. **Route compilation through `npm exec tsc` or `.bin`.** Could decouple the script from a package path if that path breaks. It adds npm/shell resolution to a flow that already has a valid Node wrapper, creating more platform behavior to test. Use only on evidence of an actual launcher failure.
3. **Install 6 and 7 side by side.** Offers compatibility for tools importing the old TypeScript API, but none are present in this repository. It increases package and command ambiguity; the TypeScript team's side-by-side guidance targets that API case, not this CLI-only build.

Selected: approach 1, with a narrow evidence-driven route to approach 2 if necessary. Approach 3 is out of scope unless a real API consumer is discovered.

## Build, typecheck, and diagnostic risk

`node node_modules/typescript/bin/tsc` remains a valid entry into the 7.0.2 package. Its wrapper hands arguments to a native executable. The package manifest lists matching Windows and Linux optional dependencies, but `npm ci` and the wrapper must still prove that the correct Windows package is installed and executable. Keep browser/server compilation sequential, preserve `-p` and `--noEmit`, and preserve `noEmitOnError` in both configs. An error in the browser config must continue to stop before the server build; a type error in either config must fail build/typecheck.

The official compatibility statement does not promise identical error text. `application-build-output/1` currently distinguishes the desired negative probe failure by file path plus exact text. If the compiler reports the same missing globals with new wording, first capture the real output, then have an independent invariant-check author revise only the diagnostic assertion while keeping the stated behavioral proof. This is a foundation step before dependent implementation because the task-cycle adapter requires invariant checks to precede code they cover. The check cannot become an exit-code-only test. Have a reviewer write and run a deliberate break from the invariant sentence after any test change.

## Verification and fallback criterion

Implementation should regenerate the lockfile from the exact manifest pin and inspect the resolved 7.0.2 package plus platform entries and integrity. On Windows, run clean `npm ci`, CLI `--version`, `npm run typecheck`, `npm run build`, `npm test`, and the full invariant gate with its required `.the-way` command. Verify separate output trees and `--check` without output. Report Linux as unchecked. For the lockfile trust boundary, inspect new registry URLs and package metadata rather than assuming npm's output is benign. No security-sensitive application input boundary is touched, but the invariant negative probes provide adversarial compiler inputs.

Fallback to the exact 6.0.3 manifest/lockfile only after the 7.0.2 install, invocation, compilation, typecheck, tests, or invariants cannot be made to pass through scoped, justified corrections without violating the foundation. Verify the restored state and present the concrete blocker in the PR. A mere change of diagnostic wording is a reason to update the check correctly, not immediate grounds for fallback. Any newly required platform support beyond Windows is outside this task's accepted verification boundary.

## Foundation impact

No current decision or invariant sentence specifies the exact compiler version or launcher. The successful package upgrade alone needs no new foundation entry. The existing `application-build-output/1` check may need a correction under the same invariant if its wording assumption fails. That correction requires the task-cycle foundation sequence, independent author, deliberate-break review, and applicable guard. The part map already claims the expected files; revisit only if the final diff adds a new file or changes responsibility. No glossary term is introduced. The npm package's native layout is external, version-specific evidence in this design, not yet a product foundation fact or a binding decision basis. Reassess the actual final diff in the return step.

## Questions and provisional answers

| Question | Provisional answer and evidence | Cost if wrong |
|---|---|---|
| Must Linux build be proven now? | No. The frozen task records the task owner's 2026-10-06 answer: Windows is sufficient, Linux follows in deployment work. | A platform-specific failure could remain until deployment. Mark it unchecked rather than reporting a pass. |
| Can the existing `scripts/build.mjs` launch TypeScript 7? | Yes by package structure: the 7.0.2 tarball still has the Node `bin/tsc` shim. Real Windows execution is a required implementation check. | If npm omits or cannot run the native optional package, builds fail; diagnose before changing the launcher. |
| Must an exact `Cannot find name` message survive? | No exact wording is a foundation promise. The invariant promises compilation of both distinct configurations; its negative probe must still identify the wrong global and source. Actual 7.0.2 output is not yet observed. | A loose assertion could pass on an unrelated compiler failure; retain file/name or stable diagnostic-code evidence. |
| Should 7.0.2 become a foundation decision? | Provisionally no. Existing D-01/D-06 bind language/runtime/build layout, and an exact compiler patch is a replaceable dependency choice. Reconsider if implementation reveals a lasting product rule. | If a continuing version constraint is discovered and left only in the manifest, later changes could silently break it. |
| What if 7.x cannot pass the required Windows gate? | Restore exact 6.0.3 product files and explain the observed blocker in the PR, as the frozen task states. | Premature fallback would miss a small compatible correction; require a concrete failure and scoped attempt first. |

There is no outstanding question that blocks the reviewed spec. These answers are provisional cycle choices, not human approval.

## Self-review and stage boundary

Checked the spec for placeholders, contradictory fallback language, ambiguous verification scope, and scope creep. The selected path retains a direct 7.0.2 attempt, explicitly distinguishes source evidence from unrun Windows and Linux checks, and states when an invariant-test correction must precede implementation. The work fits one implementation plan. The spec is ready for an independent spec review by another agent. This report returns before `writing-plans`, product edits, or dependency installation.
