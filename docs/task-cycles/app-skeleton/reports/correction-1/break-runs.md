# Deliberate break runs (correction 1)

Worktree: C:/Storage/repos/loop2-breakrun, detached at 22dbff4, `.the-way` at 96c52488…, `npm ci`, checks copied from tests/invariants (same bytes as commit ab34d90). Command per run: `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/<id>.jsonl`; each patch applied alone with `git apply`, `npm install` where the patch touched package files, tree restored after each run.

| Run | Exit | account-server-runtime | account-server-typecheck | account-server-express-http | browser-view-framework | loop2-api-error-route |
|---|---|---|---|---|---|---|
| baseline (no break) | 0 | pass 5 | pass 3 | pass 7 | pass 5 | pass 2 |
| account-server-express-http.patch | 1 | pass 5 | pass 3 | fail 3, pass 4 | pass 5 | pass 2 |
| account-server-runtime.patch | 1 | fail 2, pass 3 | pass 3 | pass 7 | pass 5 | pass 2 |
| account-server-typecheck.patch | 1 | pass 5 | fail 2, pass 1 | pass 7 | pass 5 | pass 2 |
| browser-view-framework.patch | 1 | pass 5 | pass 3 | pass 7 | fail 3, pass 2 | pass 2 |
| loop2-api-error-route.patch | 1 | pass 5 | pass 3 | pass 7 | pass 5 | fail 1, pass 1 |

Each break fails its own invariant and no other. Runs on a deliberate break give evidence, not results.

## Rerun on the checks after code review (commit 2544a6a)

Same procedure, worktree at ab34d90 with the fixed checks copied in (script: orchestrator scratchpad breakrun.sh).

| Run | Exit | account-server-runtime | account-server-typecheck | account-server-express-http | browser-view-framework | loop2-api-error-route |
|---|---|---|---|---|---|---|
| baseline (no break) | 0 | pass 5 | pass 3 | pass 7 | pass 6 | pass 2 |
| account-server-express-http.patch | 1 | pass 5 | pass 3 | fail 3, pass 4 | pass 6 | pass 2 |
| account-server-runtime.patch | 1 | fail 2, pass 3 | pass 3 | pass 7 | pass 6 | pass 2 |
| account-server-typecheck.patch | 1 | pass 5 | fail 2, pass 1 | pass 7 | pass 6 | pass 2 |
| browser-view-framework.patch | 1 | pass 5 | pass 3 | pass 7 | fail 3, pass 3 | pass 2 |
| loop2-api-error-route.patch | 1 | pass 5 | pass 3 | pass 7 | pass 6 | fail 1, pass 1 |
