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
