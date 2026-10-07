# Task 4 independent review

## Spec Compliance

✅ Spec compliant. Reviewed immutable package `C:/Storage/repos/loop2-first-foundation/.superpowers/sdd/plan/review-afbc7c3..877821a.diff` once, for BASE `afbc7c37f7a8ef72cd908fb85d886f97183c55ce` through HEAD `877821a0fd945449b71a3aed666675dfec1c519f`. Its sole changed file is the required 59-line invariant check.

The binding sentence is `account-server-occupied-address/1`: “When the account and save server's listening address is already in use, the server process exits with a non-zero code without printing its readiness line `Loop: <address>`.”

- `C:/Storage/repos/loop2-first-foundation/tests/invariants/test_account_server_occupied_address.py:19` cites the sentence in the asserting test; line 20 rejects preoccupied setup.
- Lines 25–36 require the exact normal readiness line and stop the server before checking that its address is free. Line 55 repeats this normal control after socket release on the passing path.
- Lines 38–41 bind the specified host and port with a Python socket, leave address reuse off, and confirm a listener. Backlog 5 permits the two connection probes without filling a backlog of 1 on Windows.
- Lines 43–53 run the built entry point directly with Node and a ten-second timeout; require nonzero exit, reject the exact readiness line in combined output, and confirm the address remains occupied. Diagnostic text mentioning the address is allowed.
- Socket context management at line 38 and the control's `finally` at lines 32–33 clean up on assertions and exceptions. Direct `subprocess.run` kills and waits for its child on timeout.

⚠️ The dispatch establishes separate sentence/check/server authors and says the controller holds provenance. This review does not independently establish authorship from the task diff. The implementer's reported green focused check (1/1), npm tests (5/5), and invariant gate (35/35) were read, not rerun. During the deliberate red run, the second normal control is intentionally unreachable because the nonzero assertion fails; the first normal control demonstrably passed.

## Critical findings

None.

## Important findings

None.

## Minor findings

None.

## Strengths

- `C:/Storage/repos/loop2-first-foundation/tests/invariants/test_account_server_occupied_address.py:13`: literal readiness matching avoids rejecting a legitimate diagnostic merely because it contains the address.
- `C:/Storage/repos/loop2-first-foundation/tests/invariants/test_account_server_occupied_address.py:36`: a successful normal startup must precede the negative case, so a persistent build/startup defect cannot masquerade as proof of the invariant.
- `C:/Storage/repos/loop2-first-foundation/tests/invariants/test_account_server_occupied_address.py:43`: the negative case launches the actual built Node entry point and observes its process result rather than a mock or npm wrapper.
- `C:/Storage/repos/loop2-first-foundation/tests/invariants/test_account_server_occupied_address.py:55`: the successful path also proves the same built copy can start after the blocking socket is released.

## Focused unchanged-code inspection

Named risk: the shared helpers might hide readiness failures, retain the server process/port, or build a copy without the deliberate mutation. Inspected `C:/Storage/repos/loop2-first-foundation/tests/invariants/loop2_invariant_support.py`: `TreeCopy` copies tracked working-tree contents; `built_copy()` rejects build failure; `Server` rejects a preoccupied port and exits before readiness, and `stop()` kills the process tree and waits for port release. `HOST`/`PORT` match the required literals. No expectation is calculated by the helper for this test.

Named risk: the deliberate break might affect ordinary listening instead of the occupied-address branch. Inspected `C:/Storage/repos/loop2-first-foundation/src/server/main.ts`: normal readiness is printed only in the listening callback; the error callback assigns the exit code. An initial attempted read of `server/main.ts` found no file; the actual source path was located as `src/server/main.ts`.

## Independent deliberate-break evidence

Derived directly from the sentence's nonzero-exit requirement: make only `EADDRINUSE` exit successfully, leaving the listening callback unchanged.

Disposable detached checkout: `C:/Storage/repos/loop2-first-foundation/.runs/task4-review-break`, created at the reviewed HEAD. Before creation, full-path resolution verified this target is a strict child of the task checkout's `.runs`; `git check-ignore .runs/task4-review-break` confirmed it is ignored. The target did not already exist.

Exact mutation in the disposable `src/server/main.ts`, preserving existing bytes/line endings:

```diff
-  process.exitCode = 1;
+  process.exitCode = error.code === 'EADDRINUSE' ? 0 : 1;
```

`npm ci` in the disposable checkout exited 0: 80 packages installed, zero vulnerabilities. Then ran only the prescribed focused check:

```text
python -B -m unittest discover -s tests/invariants -p test_account_server_occupied_address.py -v
```

Exit: **1**, one test, 14.122 seconds. Intended assertion failure:

```text
File "C:\Storage\repos\loop2-first-foundation\.runs\task4-review-break\tests\invariants\test_account_server_occupied_address.py", line 50
    self.assertNotEqual(result.returncode, 0)
AssertionError: 0 == 0
FAILED (failures=1)
```

Reaching line 50 establishes that the build, first normal readiness control, normal-server stop, free-port assertion, blocking bind/listen, initial blocker probe, and bounded blocked launch all completed. This is the intended regression signal, not a setup failure, timeout, or unrelated crash. The blocked Node process had exited with 0; `subprocess.run` reaped it. Unwinding the socket context closed the blocker. The normal control uses `Server.stop()` in `finally`, which kills its process tree. After the test, a fresh Python socket successfully bound and listened on `127.0.0.1:3000` and was explicitly closed, confirming that the test address was released.

Before removal, resolved the existing disposable target and `.runs` again and verified the strict-child relationship. `git worktree remove --force` succeeded, and `Test-Path` confirmed that the target no longer existed. No mutation was made to the reviewed branch, index, HEAD or product files. The only review output retained is this ignored report.

## Assessment

**Task quality: Approved.** The check exercises the real runtime behavior, distinguishes setup failure from occupied-address behavior, and detects a sentence-derived success-exit regression at the intended assertion. No scope, correctness, or cleanup issue requiring a fix was found.
