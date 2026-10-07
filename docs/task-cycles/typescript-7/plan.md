# TypeScript 7 Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Attempt an exact TypeScript 7.0.2 upgrade and retain it only when the Windows installation, both builds, product tests, and invariant gate succeed; otherwise restore 6.0.3 and deliver a concrete blocker in a reviewable pull request.

**Architecture:** Keep the one npm package, Node 24 scripts, direct `node_modules/typescript/bin/tsc` launcher, and separate browser/server configurations and output directories for the initial attempt. Regenerate the lockfile through npm, verify the platform-native package and actual compiler behavior, and change the launcher, configuration, or diagnostic check only in response to a captured failure. The orchestrator controls any foundation route and the final pull request.

**Tech Stack:** Node.js 24, npm lockfile v3, TypeScript 6.0.3 → 7.0.2, PowerShell, Python unittest, pinned the-way gate.

**Spec:** `.runs/task-cycles/typescript-7/spec.md`; frozen task: `.runs/task-cycles/typescript-7/task-frozen.md`.

## Global Constraints

- Work from `C:\Storage\repos\loop2\.runs\worktrees\task-typescript-7`; run all relative commands at that repository root.
- The checked-out `.the-way` commit must equal the gitlink `c64a6071384fb57cdb9d7e9db4560ddc43e3b355` before its tools are used.
- Keep Node.js `24.x`, one root `package.json` and `package-lock.json`, both `tsconfig.browser.json` and `tsconfig.server.json`, and their distinct `dist/public` and `dist/server` outputs.
- The first candidate is exact `typescript: 7.0.2`; fallback is exact `6.0.3` only after a concrete unresolved required-gate failure or a required correction that conflicts with the foundation.
- Windows verification is required. Linux build and execution remain **unchecked** in this task, per the frozen owner answer.
- The current `application-build-output/1` sentence and its positive and negative compilation coverage remain binding. A changed diagnostic assertion requires the foundation step, an independent check author, and a deliberate-break review before dependent implementation.
- `package-lock.json` is a trust boundary. Check new and changed URLs, integrity, platform metadata, and unrelated dependency movement. Do not hand-edit integrity or suppress optional native packages.
- The cycle orchestrator receives questions and gives provisional stage choices. No task worker requests intermediate human approval or claims it.
- Stage code changes with explicit paths in PowerShell. Commits use English messages and do not include `.runs/` records.

## Review Focus

1. A Windows native optional package is absent or for the wrong architecture: Task 1 inspects the selected installed package and runs the actual CLI after `npm ci`.
2. The regenerated lockfile points outside the npm registry, lacks integrity, or moves unrelated packages: Task 1 audits the exact diff and parsed changed package entries before accepting it.
3. `typecheck` silently writes output: Task 2 runs it in a fresh temporary source copy and checks that `dist` still does not exist.
4. One configuration accepts a global belonging only to the other: Task 2 runs the existing crossed-source invariant probes and requires failure tied to the injected file and missing name or stable diagnostic equivalent.
5. A bad server type is emitted or a browser/server output is missing: Task 2 runs the existing server type-error and build-output invariant probes; Task 3 runs the full gate and inspects both output trees.

---

## File map and review gates

| File | Responsibility | Change condition |
|---|---|---|
| `package.json` | Exact compiler dev dependency | Primary attempt; restore on fallback |
| `package-lock.json` | Reproducible root and native optional packages | npm-generated primary attempt; restore on fallback |
| `scripts/build.mjs` | Sequential Node compiler launch | Only if captured TypeScript 7 failure shows this launcher is the cause |
| `tsconfig.browser.json`, `tsconfig.server.json` | Browser/server type environment and output | Only for a diagnosed compiler compatibility issue that preserves foundation behavior |
| `tests/invariants/test_application_build_output.py` | Existing positive and crossed-source proof | Only if diagnostic wording changes while the negative behavior remains correct; independent foundation-step author |
| `foundations/invariants.md` | Binding invariant sentence and method | No planned edit; use its guard if the foundation step determines a correction is required |
| `docs/typescript-7-migration-blocker.md` | Durable, observed failure evidence if 6.0.3 remains | Conditional fallback only |
| `foundations/part_map.md` | Claims the conditional blocker report for build-tools | Conditional fallback only, through pinned part-map skill |

Each numbered task has a meaningful review gate. The existing product and invariant tests are the main migration proof; do not add a test that only compares the compiler version to `7.0.2` or repeats their probes.
After each `npm`, `node`, `python`, or `git` command, check its exit code before running a command that depends on it. Record failed and unrun checks separately; the code blocks show order, not permission to continue past a failure.

### Task 1: Establish baseline, regenerate and audit the TypeScript 7 dependency

**Files:** Modify `package.json`, `package-lock.json`. Test with existing npm commands and a clean install. No new test file.

**Interfaces:** Consumes the current root manifest and lockfile. Produces an exact 7.0.2 candidate installed from the shared lockfile for Task 2; retains baseline command results in the cycle record.

- [ ] **Step 1: Verify the worktree, pin, and baseline runtime.** Run in this worktree:

  ```powershell
  git status --short
  git ls-files --stage -- .the-way
  git -C .the-way rev-parse HEAD
  git symbolic-ref --short refs/remotes/origin/HEAD
  node --version
  npm --version
  ```

  Require the two pin hashes to match and Node major 24. Record the task base with `git merge-base HEAD origin/main` and merge target with `git rev-parse origin/main`; never treat a missing branch as `none`.

- [ ] **Step 2: Run and record the unchanged 6.0.3 baseline before editing.** Run the commands in order, recording each exit code and failure separately in `.runs/task-cycles/typescript-7/cycle.md`:

  ```powershell
  npm ci
  node node_modules/typescript/bin/tsc --version
  npm run typecheck
  npm run build
  npm test
  python -B .the-way/gate/run_tests.py tests/invariants --record .runs/typescript-7-baseline-invariants.jsonl
  ```

  The expected compiler version is `6.0.3`. A baseline failure is evidence to diagnose before attributing a later failure to TypeScript 7. The invariant gate needs `npm ci` first and may take time because it makes clean source copies.

- [ ] **Step 3: Generate the candidate from npm, then reinstall from only the new lockfile.** This exact command changes the root manifest and lockfile without installing during the first operation; the following `npm ci` exercises the lockfile:

  ```powershell
  npm install --save-dev --save-exact --package-lock-only typescript@7.0.2
  git diff -- package.json package-lock.json
  npm ci
  node node_modules/typescript/bin/tsc --version
  npm ls typescript --depth=0
  node -p "process.platform + '/' + process.arch"
  ```

  Require `7.0.2` from the actual CLI, not merely the manifest. Inspect `node_modules/typescript/package.json` optional dependencies and the installed matching `@typescript/typescript-win32-*` package for the reported architecture. Record a missing native package or launcher error verbatim with sensitive paths removed.

- [ ] **Step 4: Audit the trust-boundary diff.** Read the full `git diff -- package.json package-lock.json`. Parse the lockfile in PowerShell and inspect the root and every TypeScript-related package entry:

  ```powershell
  $lock = Get-Content -LiteralPath package-lock.json -Raw -Encoding UTF8 | ConvertFrom-Json
  $lock.packages.PSObject.Properties[''].Value.devDependencies.typescript
  $typescriptEntries = $lock.packages.PSObject.Properties | Where-Object { $_.Name -match '^node_modules/(typescript|@typescript/)' }
  $typescriptEntries | ForEach-Object { $_.Name; $_.Value }
  foreach ($entry in $typescriptEntries) {
    if ($entry.Value.resolved -notmatch '^https://registry\.npmjs\.org/') { throw "Unexpected registry URL: $($entry.Name)" }
    if ($entry.Value.integrity -notmatch '^sha512-') { throw "Missing SHA-512 integrity: $($entry.Name)" }
  }
  ```

  Require exact root and `node_modules/typescript` version 7.0.2, registry `resolved` URLs, `sha512-` integrity values, and expected optional `os`/`cpu` selectors. Compare unrelated entry additions, removals, and version changes with the baseline diff; investigate and minimize unexplained movement through npm, never by hand-editing integrity. Treat unknown external URL or missing integrity as a failed gate.

- [ ] **Step 5: Self-review, commit, then reviewer gate.** Check the baseline evidence, exact manifest pin, npm-generated diff, native package selection, and trust-boundary audit. If the candidate installation or CLI fails, keep the captured evidence and proceed to Task 2's diagnosis; do not call the migration successful. Commit the candidate with explicit paths, then return to the orchestrator for independent review before Task 2:

  ```powershell
  git add package.json package-lock.json
  git commit -m 'build: try TypeScript 7.0.2'
  ```

### Task 2: Prove both compiler paths and resolve only observed compatibility failures

**Files:** Test `scripts/build.mjs`, `tsconfig.browser.json`, `tsconfig.server.json`, and `tests/invariants/test_application_build_output.py`; modify any of them only under the conditions below. No default new test file.

**Interfaces:** Consumes Task 1's 7.0.2 attempt. Produces passing browser/server compilation and negative-probe evidence, or a specific unresolved blocker for Task 3. If `npm ci` or the CLI failed, diagnose that failure and rerun the focused install/CLI check before compiler tests; do not run tests against leftover 6.0.3 dependencies.

- [ ] **Step 1: Run focused commands and prove check-only emission behavior.** The baseline build already leaves `dist` in this worktree, so use the existing invariant helper to make a fresh source copy with the installed dependencies and assert that typecheck creates no `dist` there. Run from the repository root:

  ```powershell
  python -B -c "import atexit, os, sys; sys.path.insert(0, 'tests/invariants'); import loop2_invariant_support as support; copy = support.TreeCopy(); atexit.register(copy.remove); code, output = copy.npm('run', 'typecheck'); emitted = os.path.exists(copy.file('dist')); print(output); sys.exit(0 if code == 0 and not emitted else 1)"
  ```

  Then run:

  ```powershell
  npm run typecheck
  npm run build
  Test-Path -LiteralPath dist/public/index.html
  Test-Path -LiteralPath dist/public/main.js
  Test-Path -LiteralPath dist/server/main.js
  python -B -m unittest discover -s tests/invariants -p test_application_build_output.py -v
  python -B -m unittest discover -s tests/invariants -p test_account_server_typecheck.py -v
  ```

  The fresh-copy `typecheck` leaves `dist` absent; build produces both outputs. The focused tests run actual compiled positive probes, crossed-source negative probes, and deliberate server type errors. Require each `Test-Path` result to be `True`.

- [ ] **Step 2: Triage a failure by its actual output.** First classify clean `npm ci`/native launch, genuine typecheck/emit difference, or only changed diagnostic text. Preserve the failing command, exit code, relevant diagnostic, and output-file state in the cycle record. Re-run only the focused reproducer after a scoped correction. Keep `scripts/build.mjs` and both tsconfigs unchanged when the direct attempt passes. A launcher change must still use the shared package, preserve browser then server order, `-p`, `--noEmit` for checks, and nonzero failure propagation. A configuration change must retain `target: ES2022`, `module` and `moduleResolution: NodeNext`, `strict: true`, both explicit `lib`/`types` selections, `rootDir`, `outDir`, and `noEmitOnError: true` unless a concrete failure and foundation review establish a compatible alternative.

- [ ] **Step 3: Take the conditional foundation route before editing an invariant check.** This step applies only if `test_each_configuration_rejects_source_only_the_other_accepts` fails solely because the 7.0.2 diagnostic wording changed while both wrong-global probes still fail for the intended source. Return to the pinned foundation step and have an agent other than the implementation author revise the assertion in `tests/invariants/test_application_build_output.py` from the captured diagnostic. Retain each crossed source, nonzero exit, injected source-file identity, and missing name or a stable equivalent diagnostic code. Do not accept a generic nonzero exit. Keep the `application-build-output/1` sentence unchanged unless the observed product behavior truly forces a different rule, in which case the orchestrator resolves the foundation conflict before code proceeds. Have a separate reviewer deliberately break one compilation path based on the invariant sentence, run the check on the break, and confirm it fails. Run the focused test again. If `foundations/invariants.md` changes, run:

  ```powershell
  $base = git merge-base HEAD origin/main
  $mergeOnto = git rev-parse origin/main
  python -B .the-way/elements/invariants/format_guard.py foundations/invariants.md --base $base --merge-onto $mergeOnto --record .runs/typescript-7-invariants-guard.jsonl
  ```

  The exact assertion must follow observed compiler output; do not predict new wording in the plan.

- [ ] **Step 4: Self-review and commit only observed corrections.** Check the narrow cause, preserved behavior, and focused pass. Stage only files actually changed, by explicit path; for example, a diagnostic-only correction uses:

  ```powershell
  git add tests/invariants/test_application_build_output.py
  git commit -m 'test: preserve cross-config compiler probes'
  ```

  If no file changed, record the focused pass and make no empty commit. Return to the orchestrator for independent review before Task 3. If a genuine compiler incompatibility remains after scoped attempts, preserve it for the Task 3 fallback; do not weaken a foundation invariant.

### Task 3: Full Windows gate, foundation return, and the verified outcome

**Files:** Review the final candidate diff. On fallback restore `package.json`, `package-lock.json`, and any Task 2 product/test changes; conditionally create `docs/typescript-7-migration-blocker.md` and modify `foundations/part_map.md` through the pinned skill.

**Interfaces:** Consumes Task 2's pass or blocker. Produces one reviewable outcome: a verified TypeScript 7 change or a verified 6.0.3 state with a durable observed blocker report. The cycle orchestrator handles whole-branch review, assessment where applicable, and PR creation after this plan.

- [ ] **Step 1: Run the full required Windows gate on a passing 7.0.2 candidate.** Re-run the clean installation and checks against the final lockfile, in order; record every exit code separately:

  ```powershell
  npm ci
  node node_modules/typescript/bin/tsc --version
  npm run typecheck
  npm run build
  npm test
  python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl
  git status --short
  git diff origin/main -- package.json package-lock.json scripts/build.mjs tsconfig.browser.json tsconfig.server.json tests/invariants/test_application_build_output.py foundations
  ```

  Require a clean install, compiler 7.0.2, both emitted outputs and HTML, product pass, invariant pass, and no unreviewed diff. If a foundation file changed, run its named format guard with this branch's `--base` and current `--merge-onto`; run the build-tools part tests (`npm test` and the invariant gate) after the last product edit. Record Linux build and execution as unchecked, regardless of Windows results.

- [ ] **Step 2: Apply the fallback only for a concrete unresolved gate failure.** Record the failed gate, captured cause, and each scoped fix attempted. Preview the exact files to restore with `git diff origin/main -- package.json package-lock.json scripts/build.mjs tsconfig.browser.json tsconfig.server.json tests/invariants/test_application_build_output.py`; then restore only files this task changed from the recorded task base, using explicit paths. For the normal manifest/lockfile-only attempt:

  ```powershell
  $base = git merge-base HEAD origin/main
  git restore --source=$base -- package.json package-lock.json
  ```

  If Task 2 changed the launcher, tsconfigs, or invariant check, add those **specific changed paths** to this restore command after previewing them. Restore only this task's own edits in its isolated worktree. Reinstall and verify the retained 6.0.3 state:

  ```powershell
  npm ci
  node node_modules/typescript/bin/tsc --version
  npm run typecheck
  npm run build
  npm test
  python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl
  ```

  Require version 6.0.3 and record any fallback check that fails rather than calling the state verified.

- [ ] **Step 3: Make a fallback reviewable without inventing a product change.** Only after the verified restoration, write `docs/typescript-7-migration-blocker.md` with the current compiler state, exact failed 7.0.2 command and redacted diagnostic, scoped corrections attempted, unchanged 6.0.3 verification results, and Linux's unchecked status. Invoke the pinned `the-way-update-part-map` skill to add this file to the `build-tools` Files field; run its guard with the task base:

  ```powershell
  $base = git merge-base HEAD origin/main
  python -B .the-way/elements/part-map/format_guard.py foundations/part_map.md --base $base --record .runs/typescript-7-part-map-guard.jsonl
  git add docs/typescript-7-migration-blocker.md foundations/part_map.md package.json package-lock.json
  git commit -m 'docs: record TypeScript 7 migration blocker'
  ```

  Add other restored task paths explicitly only if they changed in Task 2. This conditional report and part-map entry are the fallback PR's substantive diff; the orchestrator sends the foundation edit to the required independent assessment. Do not add a foundation decision pinning an exact compiler version.

- [ ] **Step 4: Final reviewer gate and return step.** Review the real final diff against D-01/1, D-06/2, `account-server-typecheck/1`, `application-build-output/1`, `application-build-layout/1`, and `application-package-layout/1`. Recheck trust-boundary changes and all claimed part files. Write any genuinely lasting new rule only through its project the-way skill; an exact 7.0.2 dependency alone is not such a rule. Run each changed foundation file's guard and the tests of each changed part before the request. Record the result of every run, each failure, and every unchecked check, especially Linux. The final independent code review and, if foundation or invariant tests changed, foundation assessment belong to the orchestrator's cycle, before the PR.
