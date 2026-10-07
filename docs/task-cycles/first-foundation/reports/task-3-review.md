# Task 3 independent review

## Spec Compliance

✅ Spec compliant for the immutable change from `782f76e9602722dfa20ec3cf7c714679208b9d72` to `afbc7c37f7a8ef72cd908fb85d886f97183c55ce`.

The diff contains only the new boundary check and the optional shared launcher argument. The check cites `public-file-boundary/1`, reads literal built public assets, plants the fixed outside sentinel in all three required locations, launches the built entry point from a foreign working directory, compares both public responses to exact expected bytes, and probes every direct and encoded traversal path in the brief. It leaves non-API error wording unconstrained and stops the launched server in `finally`.

Evidence: [check, lines 18–46](../../../../tests/invariants/test_public_file_boundary.py#L18), [optional launcher and preserved default](../../../../tests/invariants/loop2_invariant_support.py#L227).

⚠️ The immutable diff cannot establish the separate identities of the check author and sentence/server-code authors. The controller must retain its dispatch provenance for that requirement. The implementer's green results (focused 1/1, affected server checks 14/14, npm tests 5/5, gate 34/34) are reported evidence, not independently rerun here. This is a task review, not a merge verdict or proof of the remaining invariant coverage.

## Findings

### Critical

None.

### Important

None.

### Minor

None.

## Strengths

- [Exact public bytes](../../../../tests/invariants/test_public_file_boundary.py#L20): the test reads the real build outputs before launch and compares the returned bodies. A fallback page cannot masquerade as the public assets merely by returning HTTP 200.
- [Outside probes](../../../../tests/invariants/test_public_file_boundary.py#L26): foreign-CWD, copy-root and compiled-server sentinels cover distinct mistaken roots, while the direct and encoded manifest probes exercise traversal without prescribing Express error-page wording.
- [Launcher compatibility](../../../../tests/invariants/loop2_invariant_support.py#L242): omitted `working_directory` preserves `npm start` from the copy root and retains `extra_env` position and meaning. The foreign-directory option reuses lifecycle handling rather than introducing another process manager.
- [Failure visibility and cleanup](../../../../tests/invariants/test_public_file_boundary.py#L33): subtests continue into the outside-file assertions after a missing public response, and the enclosing `finally` stops the server.

## Independent deliberate-break evidence

Binding sentence: `public-file-boundary/1` — “The server serves static files only from the built public directory, whatever working directory its process starts in.”

Derived fault: replace the built-location root with the current process directory. This directly violates the sentence's independence from launch location.

Disposable detached worktree: `C:/Storage/repos/loop2-first-foundation/.runs/task3-review-static-root`, created at reviewed HEAD `afbc7c37f7a8ef72cd908fb85d886f97183c55ce`. Before creation, `.runs` was resolved and the proposed absolute target was verified as its strict child, the target was verified absent, and `git check-ignore -- .runs/task3-review-static-root` succeeded. No mutation was applied to the reviewed checkout.

Exact mutation in disposable `src/server/app.ts:7`:

```diff
-const publicDirectory = fileURLToPath(new URL('../public/', import.meta.url));
+const publicDirectory = process.cwd();
```

The mutation used byte replacement, preserving all line endings. `npm ci` in the disposable worktree exited 0 (80 packages added, zero vulnerabilities). Only this check was run against the mutation:

```text
python -B -m unittest discover -s tests/invariants -p test_public_file_boundary.py -v
```

Exit: **1**. One test ran in 24.197 seconds and produced three intended assertion failures:

```text
(public='/')
line 35: self.assertEqual(status, 200)
AssertionError: 404 != 200

(public='/main.js')
line 35: self.assertEqual(status, 200)
AssertionError: 404 != 200

(outside='/outside-public.txt')
line 43: self.assertNotIn(marker, body)
AssertionError: b'loop2-invariant-outside-public-asset' unexpectedly found in b'loop2-invariant-outside-public-asset'

Ran 1 test in 24.197s
FAILED (failures=3)
```

The compiled server started and answered HTTP requests. The failure therefore demonstrates missing real public assets and actual outside sentinel exposure, not build/import failure, malformed setup, or a port conflict. All direct and encoded probes ran as subtests; only the direct sentinel probe additionally failed for this chosen mutation.

Cleanup: immediately before removal, both `.runs` and the existing worktree were resolved again and the strict-child boundary was rechecked. `git worktree remove --force <verified absolute target>` exited 0. `Test-Path -LiteralPath <target>` confirmed it no longer exists. Test teardown completed without a held-port failure.

## Scope and evidence limits

The immutable diff package was read once; no diff was regenerated and no reported green suite was rerun. The changed helper's diff ends mid-constructor. To assess the concrete lifecycle risk of the new direct-node launch and the dependencies required for the disposable break, I read the helper through its readiness/stop logic, `TreeCopy`, `built_copy`, and raw HTTP request helper; this read returned the whole helper, wider than the minimum needed. I inspected `src/server/main.ts` and `src/server/app.ts` only to locate the actual startup/static-root mechanism for the required mutation. No broader source crawl was performed.

The report destination was verified ignored with `git check-ignore -- .superpowers/sdd/plan/task-3-review.md`. Only this report was written in the reviewed checkout; its product files, index and branch/HEAD were not changed.

## Assessment

**Task quality: Approved.**

The change implements the requested runtime boundary with literal expected outputs and a minimal compatible launch option. The independent root mutation is detected by both availability and exposure assertions, with cleanup verified.
