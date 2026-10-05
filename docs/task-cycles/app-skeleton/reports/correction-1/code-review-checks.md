# Code review: invariant checks, 22dbff4..ab34d90

Ran once: 22 tests OK in 23 s, port 3000 free before, only TIME_WAIT sockets after, no loop2-* temp directories left.

## Strengths
- Each check exercises the product (npm build/typecheck/start in a temp copy, real HTTP), not just its text; the real tree is never written.
- Expected values are literals (24, 5, the made-up type error, probe paths, 400-599, JSON); only the compared side comes from the run (WAY-69).
- The control test `test_root_serves_the_built_page` makes the "never the HTML page" comparison use the page really served.
- Cleanup is solid: try/except in TreeCopy and Server.__init__, addClassCleanup, atexit, junction removed with rmdir before rmtree (the real node_modules is never deleted), taskkill /T on Windows, new session + killpg on POSIX, port-pre-check with a clear message and no kill.
- Docstrings state plainly what is not covered.

## Critical
None.

## Important
1. test_account_server_runtime.py:119 (NODE_VERSION_KEY) - only the first element of a matrix such as `node-version: [24, 22]` is read, so a workflow that also runs Node 22 passes. Why: false pass once a CI/deployment file exists (today none do, so no effect now). Fix: capture the whole bracket/list and check every element; also read `node-version-file`.
2. test_browser_view_framework.py:116-119 - "uses browser APIs to render" is checked only by `\bdocument\b` appearing anywhere in a .ts file (a comment or a word in a string satisfies it); the DOM-lib check passes vacuously when `lib` is absent. Why: a false pass for the second half of the sentence. Fix: look for a DOM call after stripping comments (`document.createElement|getElementById|querySelector|body|...`), or at least `document\.`.

## Minor
1. loop2_invariant_support.py:94-95 (`kill_tree`) returns early when the npm process has already exited, though its node child may live on (POSIX: killpg of the group would still work; Windows: orphan). Why: a leaked process holding port 3000 breaks the next run. Fix: on POSIX always killpg; on Windows record the child via taskkill before npm exits, or find the port owner.
2. test_account_server_express_http.py:136 - `assertGreaterEqual(status, 100)` asserts nothing useful; drop it or assert the actual status is 200/404 as the probe expects.
3. test_account_server_express_http.py:126 - the dispatch proof depends on the debug line format of the `router` package (`router dispatching GET /path`) and on DEBUG output going to stderr. It is brittle against a router upgrade (the failure would be loud, not a false pass). Note it next to the lockfile pin, or accept `dispatching` with any prefix.
4. loop2_invariant_support.py:131-145 - the copy takes the working tree (tracked + untracked), not the commit, and uses the real node_modules (no `npm ci` check). Fine for the gate, but the docstrings say "on the commit"; align wording, or fail on a dirty tree.
5. test_browser_view_framework.py:166 - IMPORT_SPECIFIER matches prose such as `imported from "x"` in built HTML/JS strings; a rare false failure. Same pattern is duplicated in the express test file; move to the support module.
6. test_account_server_typecheck.py:90 - `test_no_deployment_route_left_unread` fails on purpose when any deployment file appears; document it in the invariant's notes so a later unrelated Dockerfile does not look like a regression.
7. Time: build runs 1x shared plus 2 more full builds/typechecks in the typecheck tests (about 23 s total); acceptable.

## Verdict
Ready with fixes (Important 1 and 2 only matter once a deployment file appears / for the browser-API half; neither blocks the current commit).
