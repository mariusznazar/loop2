# Independent scoped review — Slice 3

## Spec compliance

**Verdict: Spec compliant for Slice 3.** Reviewed range `b0e3d4f..fc7445a`, all three files and every hunk of `.superpowers/sdd/plan/s3-review-package.txt`. The package identifies commit `fc7445a540c0beb524ea821cd30d9c25a3ce0e92`, 218 additions and 25 removals. This is a slice gate, not whole-branch or merge acceptance.

The two assigned unused imports are removed. The acquisition and cleanup changes implement the requested second-open failure, spawn failure, live-log lifetime, incomplete-process stop, rejection of failed enumeration output and main-process termination after enumeration failure. No new invariant sentence, checker configuration, blocking-rule exception, unrelated Python cleanup or product behavior is introduced.

**Cannot verify as passed:** three Docker-dependent checks remain unchecked. This is preserved explicitly below and does not change the source-compliance verdict.

## Strengths

- `tests/invariants/loop2_invariant_support.py:236`: the ordinary two-file context manager unwinds stdout when opening stderr fails. The instance's ExitStack retains the successful pair until stop; it does not close a live server's output at constructor return.
- `tests/invariants/loop2_invariant_support.py:256`: log acquisition and spawning now fall inside the constructor's existing exception cleanup, with `process = None` established first. `stop` can release resources without accessing an unassigned stderr handle or dereferencing a missing process.
- `tests/invariants/loop2_invariant_support.py:74`: nonzero enumeration status raises before any stdout is parsed. `kill_tree` at line 102 attempts termination of the known live main process in an inner finally, then performs the existing wait/fallback in an outer finally. Failed observations are not treated as permission to terminate their partial PID output.
- `tests/quality/test_invariant_support.py:52`, `:63`, `:70`, `:81`, `:107`: tests observe actual open-file state, directory removal and a real child process. The added failure during stop confirms that process cleanup failure still unwinds log ownership, with the error visible to the caller.
- `tests/quality/test_invariant_support.py:145`: the Windows test owns two real processes, makes the unrelated sentinel look like a descendant only in failed query output, and asserts the main process exits while the sentinel survives. It separately injects `TimeoutExpired`; these are useful behavioral checks rather than assertions about mock call counts.

## Issues

### Critical

None.

### Important

None.

### Minor

None requiring a new review thread. The outstanding environment and workspace items are recorded below rather than presented as source defects.

## Foundation and guideline selection

Read the complete part map and complete current decision Scope and invariant Part fields, including `every`. The changed support helper and new quality tests belong to **build-tools** (`foundations/part_map.md:64`); the removed deploy-test import belongs to **deployment** (`foundations/part_map.md:115`). No user interface or new formal code kind is introduced.

Read the current whole applicable decision entries D-01/1, D-02/1, D-03/2, D-04/3, D-05/3, D-06/3, D-08/1 through D-17/1 and D-27/1 through D-33/1, with linked D-07/1 and D-22/1. Read the whole invariants and glossary files and the linked environment-fact entries. D-28/1 explicitly defers separate test/build/deployment exemplars and automatic Python/Bash formatting; this slice does not invent those obligations. D-30/1 retains Ruff 0.17.1, 393 blocking rules and the exact fourteen deferred examples. The diff changes no rule list, inline suppression or tool configuration.

Applied `.the-way/product-guidelines/reading.md` to the actual changed paths. `guidelines/` is absent at review. The encompassing task creates the missing guidelines, so selection remains none under that creation-task exception; this slice does not wait for its own later output. The adopted npm pin is 12.2.1 under D-33/1 and the accepted amendment; neither audit policy nor the original audit fork `c379207bfd8bd148d3589ea75604ba5165915d01` changes here.

## Concrete risks checked

1. **Acquisition before ownership is registered.** Examined every acquisition hunk and the constructor's completion/except block. The review-package hunk stopped before the end of initialization, so I read the missing constructor tail (`tests/invariants/loop2_invariant_support.py:251–284`) separately. A failed second open closes the first through the nested with; failed spawning closes the registered pair through `stop`; original acquisition/spawn errors are reraised when cleanup succeeds.
2. **Log closure before the live child finishes.** Checked the retained instance ExitStack, stop ordering and the live-server test at line 81. `kill_tree` is attempted before stack closure, and both log objects remain open until stop. The focused final test evidence has no skips or ResourceWarnings.
3. **Partial failed output authorizes unrelated process termination.** Examined the status guard before parsing, successful parent/age filtering, nested finally ordering and tests at lines 128, 135 and 145. A raised query failure bypasses the descendant loop; known-main taskkill and the final poll/wait path still execute. Successful enumeration retains the existing child/age filtering. There is no exception suppression in the new Windows path. If a later cleanup operation itself raises, Python retains the earlier error as its exception context rather than declaring success.
4. **Shared cleanup changes command execution rather than only servers.** Inspected the unchanged `run` caller at `tests/invariants/loop2_invariant_support.py:142`, because `kill_tree` is shared. It still invokes cleanup in finally; a newly detected observation failure remains an error instead of producing an apparently successful npm-command result. The redundant timeout cleanup was preexisting and is outside the accepted repair scope.
5. **PowerShell's pipeline might hide an actual CIM command error behind status zero.** Ran one read-only focused probe, reproduced below. An invalid CIM class with the same formatting pipeline returns status 1 in this environment, so the new guard catches that actual failure. This probe does not establish every possible provider failure behavior.
6. **Changed ownership might invalidate invariant consumers.** Read the unchanged serving-process and API-route check files named by the brief. Their Server/output/stderr/stop usage remains compatible; no assertion or observation parser in those consumers changes in this slice.

## Recorded validation inspected

I did not rerun a reported suite. I read the saved complete focused red/green output, command/exit metadata, final Ruff output and record, invariant/deployment output and relevant gate records, and npm test command/exit and totals.

| Evidence in this report directory | Observed result | Interpretation |
|---|---|---|
| `s3-red-confirmed.txt` and `.txt.json` | exit 1; 7 tests, 5 failures and 1 error | Demonstrates first/both log leaks, failed stdout acceptance, surviving main processes after failure/timeout and incomplete-stop failure in the pre-implementation state. |
| `s3-green-first.txt` | 7 tests, OK | Initial repair behavior. |
| `s3-green.txt` | 8 tests, OK | Adds cleanup-failure resource coverage. |
| `s3-green-final.txt` and `.txt.json` | exit 0; 8 tests, OK, no skips | Final pair-context implementation passes the focused tests. The native Windows test was executed rather than skipped. |
| `s3-ruff.txt` | exit 1; two SIM115 diagnostics | Genuine intermediate failure is retained; it is not represented as acceptance. |
| `s3-ruff-final.txt`, `.txt.json`, `.runs/s3-ruff-final.jsonl` | exit 0; `ruff-source-rules/1` pass | Final source check passes without a source or configuration suppression in this diff. The check's independent full acceptance belongs to its own stage. |
| `s3-invariants.txt` and `.txt.json` | exit 1; 141 tests, OK with 2 skips | The gate records no verdict for the two Docker invariant checks rather than recording pass. |
| `s3-deploy.txt` and `.txt.json` | exit 0; 64 tests, OK with 1 skip | The non-invariant Docker skip remains unchecked despite exit 0. |
| `s3-deploy-skip.txt` | 1 test skipped: no Docker daemon answers | Identifies the actual environment limitation; no image check ran. |
| `s3-npm-test.txt` and `.txt.json` | exit 0; build and 173 Node tests, 173 pass, 0 skips | Additional integration evidence. Normal npm command notices are informational, not test warnings. |
| `s3-diffcheck.txt.json`, `s3-commit.txt` | whitespace check exit 0; three-file commit | Recorded author boundary matches the review package. |

### Reviewer probe — full command and captured output

Working directory: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`.
Exact PowerShell command:

```powershell
@'
import subprocess
script = "Get-CimInstance -ClassName Loop2ReviewNoSuchClass | ForEach-Object { '{0} {1} {2}' -f $_.ProcessId, $_.ParentProcessId, ([DateTimeOffset]$_.CreationDate).ToUnixTimeMilliseconds() }"
result = subprocess.run(['powershell', '-NoProfile', '-NonInteractive', '-Command', script], capture_output=True, timeout=60)
print('returncode:', result.returncode)
print('stdout:', repr(result.stdout))
print('stderr:', repr(result.stderr))
'@ | python -B -
```

Command exit: **0**. The child PowerShell query's exit is **1**. Full captured stdout/stderr from the outer command:

```text
returncode: 1
stdout: b''
stderr: b'Get-CimInstance : Invalid class \r\nAt line:1 char:1\r\n+ Get-CimInstance -ClassName Loop2ReviewNoSuchClass | ForEach-Object {  ...\r\n+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n    + CategoryInfo          : MetadataError: (root\\cimv2:Loop2ReviewNoSuchClass:String) [Get-CimInstance], CimExceptio \r\n   n\r\n    + FullyQualifiedErrorId : HRESULT 0x80041010,Microsoft.Management.Infrastructure.CimCmdlets.GetCimInstanceCommand\r\n \r\n'
```

The probe intentionally creates an observation error; the diagnostic is its expected result, not noise from a passing product test. It starts no server, kills no process, changes no product file and uses `-B`.

## Declined and out-of-scope items

- No broad audit or refactoring of the preexisting support module, alternate process parser, formatting policy or unselected exemplars. The exact accepted repair boundary is met.
- No separate defect for failure to establish detached descendants after a failed observation. The task requires an attempt to terminate the known main process and an honest error; it cannot infer unknown PIDs from a failed query.
- No speculative blocking finding for the preexisting best-effort taskkill return handling, fallback kill without an additional wait, rmtree ignore-errors behavior or simultaneous cleanup failure. No new demonstrated regression in this range justifies widening the accepted repairs.
- No UI appearance finding or screenshot requirement: this range changes no screen or visual behavior.
- No invariant deliberate-break run, guideline-case acceptance or final whole-product gate here. Those remain assigned to the later complete-product stage.
- No product edits, git commands, subagents, suite reruns or attempted generated-bytecode deletion during this review.

## Outstanding concerns and evidence limits

1. Docker remains unavailable. `ContainerServesIcons.test_container_serves_each_icon_with_the_file_bytes`, `RunningContainerHasOneServingProcess.test_running_container_has_one_listening_node_process` and `ImageServesIcons.test_built_image_serves_every_icon_and_the_page` remain unchecked. Their missing results must remain visible at final integration.
2. The new native process-failure integration case is Windows-specific (`tests/quality/test_invariant_support.py:144`); POSIX behavior has not received a real failure-injection run here. The POSIX termination body is unchanged apart from enclosing finally.
3. If enumeration fails after the root has exited, detached descendants cannot be proven absent; the error remains visible. This is a stated evidence limit rather than successful whole-tree cleanup.
4. The author's two generated `.pyc` files remain an unresolved workspace-cleanup concern according to the handoff/report. Automatic approval review rejected their deletion as blocked by policy; I neither retried nor independently changed that state.
5. Final independent check acceptance, full product gate and whole-branch review remain later cycle responsibilities. This verdict does not certify the entire branch.

## Assessment

**Task quality: Approved.** The implementation establishes explicit log ownership across partial initialization, preserves live output, rejects failed process observations before using their data, and retains a termination attempt and visible errors. Meaningful failure-injection evidence covers the requested behavior; no in-scope source fix is outstanding. Approval is scoped to this slice and preserves every unchecked environment result above.
