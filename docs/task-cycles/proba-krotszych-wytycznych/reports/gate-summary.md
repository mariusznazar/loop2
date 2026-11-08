# Summary of the two gate runs (the full logs stay in the ignored working copy of the record; they hold the Polish console text in the system code page and many absolute paths)

| Run | Tree | Command | Exit | Result |
|---|---|---|---|---|
| Base | `df0f125`, clean | `npm test` | 1 | 2005 Node tests passed. Python: 13 + 115 (5 skipped) + 244 (3 skipped) + 40 tests; 2 errors, both in `tests/quality/test_quality_invariants.py`: `test_ruff_source_rules` and `test_shellcheck_source_rules` (FileNotFoundError: the tool of the quality venv is not installed on this computer). The summary line: `412 tests in 4 directories; failed: tests/quality (exit code 1)`. |
| Final | `e1ab9c9`, clean | `npm test` | 1 | The same: 2005 Node tests passed; Python 412 tests, the same 2 errors, 8 skipped (no Docker daemon). The summary line is identical. |
| Stopped | `aa03c01`, then `406f0af` | `npm test` | — | Stopped by the orchestrator before the end because the head moved; no result. |
| Corrected | `6882f83`, clean | `npm test` | 1 | The same as the two before: 2005 Node tests passed; Python 412 tests, the same 2 errors, 8 skipped. |
