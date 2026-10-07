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
