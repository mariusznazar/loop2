# Static-root containment correction

Commit: `26661cd6a934a797062d096d856feec4548caffb`.

Changed only `tests/invariants/test_public_file_boundary.py`: the canonical static root must be equal to or a descendant of the canonical literal `dist/public` directory. `Path.resolve().is_relative_to()` compares path components, so sibling names such as `publicity` and ancestors are not admitted. The foreign-working-directory launch, public-byte comparisons and traversal probes remain intact. The edit preserved existing bytes apart from the assertion replacement.

## Evidence

- `python -B -m unittest discover -s tests/invariants -p test_public_file_boundary.py -v`: 1 test passed in 9.176 s.
- Reused the independently authored `.runs/task-cycles/first-foundation/review-round2/check.py` unchanged except redirecting its temporary/log directory to `.runs/task-cycles/first-foundation/round2-fix-checks`; did not rewrite reviewer mutations or original evidence.
- `subdirectory`: mutation build exit 0; HTTP `/assets/probe.txt` returned 200 and exact planted public bytes; focused invariant check passed (1 test, 0 failures, 0 errors, 9.499 s). Log: `.runs/task-cycles/first-foundation/round2-fix-checks/subdirectory.log`.
- `leak`: mutation build exit 0; HTTP `/leak/package.json` returned 200 and exact manifest bytes; focused invariant check failed at the canonical containment assertion (1 test, 1 failure, 0 errors, 10.204 s). Log: `.runs/task-cycles/first-foundation/round2-fix-checks/leak.log`.
- `git diff --check`: passed; only the usual LF-to-CRLF Git working-copy notice.
- Explicit-path commit contains one changed assertion in one test file. Working tree clean after commit.

The full invariant suite was not repeated for this one assertion correction; the affected invariant and both independent counterexamples were run. No application code, foundation, build checks or reviewer harness was changed. Independent review acceptance remains with the orchestrator/reviewer. The previously reported instrumentation limits remain: construction during import/createApp is observed; lazy registration, other static-serving implementations and symlinks within served contents require separate reassessment if introduced.
