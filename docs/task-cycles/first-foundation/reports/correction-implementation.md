# PR #6 correction implementation

Commit: `5820dcc94063f0b4443a1c53597c23fb5ecb9758` (`Withdraw broad public file boundary invariant`).

## Change and reason

The PR owner withdrew `public-file-boundary/1` because neither a repeated human review nor the proposed finite automated probe can support its broad sentence. Removed that invariant and its recovered row, its human assessment instructions, and the part-map assignment for its test. Deleted the test by orchestrator choice C29. Reverted the `Server(..., working_directory=...)` support option because only the deleted test used it. Kept all remaining decisions, invariants, part responsibilities, and the `npm ci` prerequisite unchanged.

## Checks (from `C:/Storage/repos/loop2-first-foundation`)

| Command | Exit | Result |
|---|---:|---|
| `npm ci` | 0 | 80 packages installed; 0 vulnerabilities |
| `python -B .the-way/elements/invariants/format_guard.py foundations/invariants.md --base 44294da228ab8c27dfd1683f931f59f8d7f8d29d --merge-onto 44294da228ab8c27dfd1683f931f59f8d7f8d29d` | 0 | 0 errors, 0 warnings, 0 unchecked |
| `python -B .the-way/elements/part-map/format_guard.py foundations/part_map.md --base 44294da228ab8c27dfd1683f931f59f8d7f8d29d` (before staging deletion) | 1 | Reported deleted test as unclaimed; 1 unchecked dependency graph check |
| `git add -- foundations/invariants.md foundations/part_map.md foundations/public_file_boundary_assessment.md tests/invariants/loop2_invariant_support.py tests/invariants/test_public_file_boundary.py` | 0 | Staged exactly the five assigned product paths |
| `python -B .the-way/elements/part-map/format_guard.py foundations/part_map.md --base 44294da228ab8c27dfd1683f931f59f8d7f8d29d` (after staging) | 0 | 0 errors, 0 warnings, 1 unchecked dependency graph check |
| `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl` | 0 | 33 tests passed |
| `npm test` | 0 | Build and 5 HTTP/startup tests passed |
| `git diff --cached --check` | 0 | No whitespace errors |

The dependency graph remains unchecked because the product declares no command to report dependencies between parts. The initial part-map error came from its tracked-file scan seeing the deleted test until the deletion was staged; the rerun passed. No other check failed or stayed unchecked.

## Self-review

The staged diff contains only the five assigned paths. No remaining `public-file-boundary`, `public_file_boundary`, or `working_directory` reference exists under `foundations`, `tests`, `src`, `scripts`, or `README.md`. Existing files kept their CRLF working-tree line endings. The unchanged application test still covers static serving from a foreign working directory and traversal cases.
