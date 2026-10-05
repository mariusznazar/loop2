# Check author C2 — report

Worktree C:\Storage\repos\loop2-c2 at 0b96e9e, the-way 96c52488 (verified). `npm ci` run in the worktree.
Not read: src/, scripts/, tests/*.mjs, dist/, docs/, git history, .runs/ (other than this file and the record).
Written: the two check files below and this report. Helper and existing checks unchanged. No commits.

## Questions

1. The existing checks that start the server (`test_loop2_api_error_route.py`, `test_account_server_express_http.py`) fail at once on an occupied port 3000. Only my new check waits (up to 300 s) for the port. While another agent shares the port, the gate can still fail through those two. Should the wait move into `loop2_invariant_support.Server`? That is a helper change, so I did not make it.
2. The one-process check reads processes and listeners through PowerShell on Windows and `ps`/`lsof` elsewhere. The POSIX branch has never run. Is that acceptable, or should the method name the platform?
3. Reading of "the built game": every file `npm run build` places in `dist/public`, with `/` serving one of its HTML files. If a later build adds build-only files to `dist/public` that are not meant to be served (source maps, a build-info file), this check will fail on them.

## tests/invariants/test_loop2_one_serving_process.py — loop2-one-serving-process/1

The check builds once (the shared `support.built_copy()`), waits for port 3000 to be free, then starts `npm start` with `DEBUG=router`. It sends every request first, then reads the process table and the TCP listeners once.

| Test | Clause |
|---|---|
| `test_the_built_game_is_served` | "serves the built game": each file under `dist/public` is served with its exact bytes at its path below `dist/public`; GET `/` returns 200 with one of its HTML files; at least one HTML file and one JS file exist |
| `test_api_requests_are_answered` | "serves … `/api/` requests": two made-up unmatched `/api/` paths get an HTTP response (status 100–599); whether it is an error is left to loop2-api-error-route |
| `test_one_process_of_the_started_tree_listens_and_starts_nothing` | "One … process": in the tree started by `npm start`, exactly one process listens on port 3000; no process in that tree listens on any other TCP port; the listener has started no child processes |
| `test_installed_express_is_major_5` | "Express 5": the copy's `node_modules/express` is major 5 (5 written as a literal) |
| `test_express_5_router_dispatches_game_and_api_requests` | "Express 5 … both": Express 5's router (debug namespace `router`) logs `dispatching GET <path>` for every request above. Express 4's `express:router` does not match |

Assumptions written into the check:
- The tree of `npm start` is found through parent ids, filtered by creation time.
- A second serving process would have to be either a listener in that tree or a child of the listener.
- The `/api/` responses and the built files are compared with what the run itself produced; the expected major version and the paths are literals.

Does not cover:
- a container or deployment;
- a process started after the probes;
- a cooperating process outside the tree that talks to the server without a TCP listener;
- methods other than GET.

## tests/invariants/test_application_build_output.py — application-build-output/1

Each test builds in a fresh `TreeCopy` with no `dist`. The configuration names, source directories and output directories are literals: `tsconfig.browser.json` src/browser → dist/public, `tsconfig.server.json` src/server → dist/server. They are not read from the tsconfigs at run time.

| Test | Clause |
|---|---|
| `test_build_emits_every_source_file_of_both_configurations` | "compiles both": the unchanged copy builds with exit code 0, and each `.ts` file of each source directory has a `.js` file at the same relative path in its output directory, which `node --check` accepts |
| `test_build_compiles_made_up_source_under_each_configuration` | "the browser and the server … configurations": two made-up probes are written as literals. The browser probe uses `HTMLElement` and `document`, so it is valid only under the DOM library. The server probe uses `process`, so it is valid only with Node types. The build succeeds, and each probe appears as JavaScript in its own output directory: the marker string is kept, the `interface` keyword is gone, and `node --check` accepts it |
| `test_each_configuration_rejects_source_only_the_other_accepts` | each configuration is applied as itself, not merged: the build fails when the server probe is placed in src/browser and when the browser probe is placed in src/server |

Does not cover:
- runtime behaviour of the compiled code;
- copied (not compiled) files such as the HTML page;
- configurations other than the two named.

The cross test relies on two assumptions written into it: `@types/node` declares no `document`, and the browser configuration loads no Node types. The `types: []` setting seen in `tsconfig.browser.json` matches the second.

## Run

`python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl` was run once: exit code 0, 31 tests in 57 s, OK.

| Invariant | Verdict | Tests |
|---|---|---|
| loop2-one-serving-process/1 | pass | 5 |
| application-build-output/1 | pass | 3 |
| account-server-express-http/1 | pass | 7 |
| account-server-runtime/1 | pass | 5 |
| account-server-typecheck/1 | pass | 3 |
| browser-view-framework/1 | pass | 6 |
| loop2-api-error-route/1 | pass | 2 |

The record has 0 null lines. After the run, port 3000 was free and no `loop2-` temporary directories were left behind.

Not done: a deliberate break of either invariant. Under WAY-69 that is another agent's act.

## After code review

Finding: the cross test in `test_application_build_output.py` passed on any build failure, including a failure with an unrelated cause.

The fix, in `test_each_configuration_rejects_source_only_the_other_accepts`: the test still requires a non-zero exit. It now also requires the build output to show the expected failure. Before comparing, ANSI colour codes are removed and backslashes become `/`. The expected text is written as literals in `CROSSED_FAILURE`:
- server probe placed in src/browser: the output must name `src/browser/invariant_check_build_probe.ts` and contain `Cannot find name 'process'`;
- browser probe placed in src/server: the output must name `src/server/invariant_check_build_probe.ts` and contain both `Cannot find name 'HTMLElement'` and `Cannot find name 'document'`.

The module docstring now says this.

New assumptions in the check:
- `npm run build` prints TypeScript's diagnostics on stdout or stderr;
- TypeScript reports a missing global with the wording `Cannot find name '<name>'`.

Answers to the questions: Q1, Q2 and Q3 were accepted. The helper stays unchanged and the fixed port is an accepted assumption. The POSIX path stays unchecked and is named as a limitation. The reading of "the built game" goes to the human as an assumption written into the check.

Gate run, once: exit code 0, 31 tests in 42 s, OK. All seven invariants pass, with the same per-test counts as before (application-build-output/1: 3, loop2-one-serving-process/1: 5). The record has 0 null lines. Only `tests/invariants/test_application_build_output.py` changed in this round. No commits.
