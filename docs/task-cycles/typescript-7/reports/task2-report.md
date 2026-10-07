# Task 2 implementation report — TypeScript 7.0.2 compiler behavior

## Result

**DONE.** The exact 7.0.2 candidate installed by Task 1 passed both compiler paths and the focused positive and negative invariant probes on Windows x64. `typecheck` emitted no `dist` in a fresh source copy, and `build` produced the required browser and server outputs. No compatibility failure appeared, so no product or invariant file changed and no Task 2 commit was made. Task 3's full clean-install, product-test, and invariant gate remain unrun here.

## Workspace and preflight

All commands ran at `C:\Storage\repos\loop2\.runs\worktrees\task-typescript-7`. Commands and exits:

| Command | Exit | Evidence |
| --- | ---: | --- |
| `git status --short` | 0 | Clean. |
| `git rev-parse HEAD` | 0 | `5dc50b556f648f66f5202f2c7964aa42e9d7284a`, Task 1's candidate commit. |
| `git ls-files --stage -- .the-way` | 0 | Gitlink `c64a6071384fb57cdb9d7e9db4560ddc43e3b355`. |
| `git -C .the-way rev-parse HEAD` | 0 | Same pinned commit. |
| `node node_modules/typescript/bin/tsc --version` | 0 | `Version 7.0.2` from the installed CLI. |

Task 1 recorded successful `npm ci` and installation of the matching `@typescript/typescript-win32-x64@7.0.2` native package. No install or CLI failure required diagnosis before the Task 2 commands.

## Focused compiler and output checks

| Command | Exit | Evidence |
| --- | ---: | --- |
| `python -B -c "import atexit, os, sys; sys.path.insert(0, 'tests/invariants'); import loop2_invariant_support as support; copy = support.TreeCopy(); atexit.register(copy.remove); code, output = copy.npm('run', 'typecheck'); emitted = os.path.exists(copy.file('dist')); print(output); sys.exit(0 if code == 0 and not emitted else 1)"` | 0 | The fresh-copy `npm run typecheck` exited 0 and the copy still had no `dist`; both conditions were required for exit 0. |
| `npm run typecheck` | 0 | `node scripts/build.mjs --check` completed without diagnostics. |
| `npm run build` | 0 | `node scripts/build.mjs` completed without diagnostics. |
| `Test-Path -LiteralPath dist/public/index.html` | 0 | `True`. |
| `Test-Path -LiteralPath dist/public/main.js` | 0 | `True`. |
| `Test-Path -LiteralPath dist/server/main.js` | 0 | `True`. |
| `python -B -m unittest discover -s tests/invariants -p test_application_build_output.py -v` | 0 | 3 tests passed. The unchanged source tree emitted JavaScript for every source file; made-up browser and server sources emitted valid JavaScript under their own configurations; crossed sources were rejected with the injected file identity and expected missing-name diagnostics. |
| `python -B -m unittest discover -s tests/invariants -p test_account_server_typecheck.py -v` | 0 | 3 tests passed. Both `typecheck` and `build` rejected deliberate server type errors; the bad build left no `dist/server/main.js` in its fresh copy. The deployment-route check also passed. |

The crossed-source test confirms the existing TypeScript 7 diagnostics still contain `Cannot find name 'process'` for the browser configuration and `Cannot find name 'HTMLElement'` and `Cannot find name 'document'` for the server configuration. Its assertions also require a nonzero build exit and the relevant injected source path. The diagnostic-only foundation route was therefore unnecessary.

## Self-review, files, and remaining work

I inspected `scripts/build.mjs`, both tsconfigs, the two focused invariant tests, and the applicable foundation. The launcher still runs browser then server through the shared compiler with `-p`, adds `--noEmit` for checks, and propagates nonzero exits. The configurations retain separate globals and output directories, `ES2022`, `NodeNext`, `strict`, `rootDir`, `outDir`, and `noEmitOnError`. The observed results satisfy `application-build-output/1` and `account-server-typecheck/1` without a correction.

| Final command | Exit | Evidence |
| --- | ---: | --- |
| `git status --short` | 0 | Clean; no product or test file changed. |
| `git diff --check` | 0 | No whitespace errors. |
| `git diff -- scripts/build.mjs tsconfig.browser.json tsconfig.server.json tests/invariants/test_application_build_output.py` | 0 | Empty diff. |
| `git rev-parse HEAD` | 0 | Still `5dc50b556f648f66f5202f2c7964aa42e9d7284a`. |

No RED/GREEN sequence was needed because no behavior change was made. No paths were staged and no empty commit was created. There is no observed Task 2 blocker or foundation conflict. Task 3 owns the fresh `npm ci`, complete product test run, full pinned invariant gate, final diff review, and final Windows outcome. Linux build and execution remain unchecked by the frozen task's scope.
