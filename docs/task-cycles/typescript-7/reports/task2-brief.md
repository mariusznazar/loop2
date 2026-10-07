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
