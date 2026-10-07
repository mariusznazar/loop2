# Task 3 implementer report

- **Status:** DONE
- **Model:** GPT-6
- **Base:** `782f76e9602722dfa20ec3cf7c714679208b9d72`
- **Head / commit:** `afbc7c3` — `test: protect public file boundary from foreign working directory`
- **Files committed:** `tests/invariants/test_public_file_boundary.py`, `tests/invariants/loop2_invariant_support.py`

## Changes and reasoning

Added a runtime check citing `public-file-boundary/1`. It builds a temporary copy, reads the literal expected `dist/public/index.html` and `dist/public/main.js` bytes, starts the built server from a temporary foreign working directory, and requires those exact bytes at `/` and `/main.js`. It plants fixed sentinel bytes in the foreign directory, repository-copy root, and `dist/server`; direct and encoded traversal probes must not return the sentinel or the root `package.json` bytes. The check makes no assertion about error page wording and always calls `server.stop()` after launch.

Extended `Server(copy, extra_env=None)` with optional `working_directory=None`. The default remains `npm start` from the copy root. A supplied directory launches `node` with the absolute built server entry point from that directory. Both modes use the existing log files, readiness wait, and process-tree cleanup. The new check exercises this option. The helper edit was necessary because `npm start` must run in the package root and a separate launcher would duplicate lifecycle handling. The edited helper retained CRLF working-tree line endings.

## Verification

| Command | Exit | Result |
|---|---:|---|
| `python -B -m unittest discover -s tests/invariants -p test_public_file_boundary.py -v` | 0 | 1 passed, initial focused run |
| `python -B -m unittest discover -s tests/invariants -p test_loop2_api_error_route.py -v` | 0 | 2 passed |
| `python -B -m unittest discover -s tests/invariants -p test_loop2_one_serving_process.py -v` | 0 | 5 passed |
| `python -B -m unittest discover -s tests/invariants -p test_account_server_express_http.py -v` | 0 | 7 passed |
| `npm test` | 0 | 5 passed |
| `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl` | 0 | 34 passed |
| `python -B -m unittest discover -s tests/invariants -p test_public_file_boundary.py -v` | 0 | 1 passed, final focused run |
| `git diff --cached --check` | 0 | No whitespace errors |

## Self-review and limits

Checked the staged diff, named file boundary, default helper signature behavior, cleanup path, literal expected public paths, sentinel placement, and request probes. The branch was clean after the explicit-path commit. No application or foundation files were changed.

The deliberate server break and fresh review belong to the reviewer, not this implementer, and remain unchecked here. The occupied-address invariant check is not yet written; this interim gate success cannot cover it. No format guard was needed for this commit because no foundation file changed. No merge check was claimed.
