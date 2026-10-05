# Correction 1 — redo of skeleton code against the invariant checks

Worktree `C:\Storage\repos\loop2-skeleton`, branch `task/app-skeleton`, HEAD `ab34d90`.
Check command (run from the worktree root):
`python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`.
Every run's console output and record are kept next to this file as `run-<label>.txt` / `run-<label>.jsonl`
(labels: baseline, red-5, green-5, red-3, green-3, red-2, mid-2, green-2, red-1, green-1, red-4, final);
`npm test` outputs as `npm-test-<n>.txt` / `npm-test-final.txt`. The record that existed before this
run is kept as `invariant-tests.before-redo.jsonl`. Port 3000 had no listener (only TIME_WAIT entries) before the runs.

Baseline (before any set-aside): exit 0; every invariant all `pass`
(express-http 7, runtime 5, typecheck 3, browser-view 5, api-error-route 2; 22 tests).

Caveat that applies to every redo below: I read the original code (to name the covered code) before
setting it aside, so the redo is written by hand, not restored from git, but it is not
independent of the original. In every case it came out byte-identical to the removed code.

## 5. loop2-api-error-route/1

- Covered code: `src/server/app.ts:6-8`, the `app.use('/api', …)` handler answering 404 JSON `{ error: 'Not found' }`.
- Set aside: those three lines.
- RED: check command exit 1; loop2-api-error-route/1 fail 1 / pass 1 (others all pass).
  Failing test `test_unmatched_api_requests_receive_json_errors_not_the_page`:
  `Content-Type 'text/plain; charset=utf-8'` (the request fell to the plain 404 handler).
- Redo: re-added the `/api` handler before the static handler in `createApp`.
- GREEN: exit 0, all five invariants all pass; `npm test` exit 0, 5 tests / 5 pass / 0 fail.

## 3. account-server-express-http/1

- Covered code: `src/server/app.ts:1-15` (Express import, `express()` app, its routes, `express.static`,
  fallback 404) and `src/server/main.ts:1-11` (`createApp().listen(...)` on Express's app).
- Set aside: deleted `src/server/app.ts`; emptied `src/server/main.ts` (build still compiles; `npm start` serves nothing).
  Not set aside: the `express` dependency in package.json/package-lock.json (a declaration, not routing
  behaviour; removing it from the lockfile is outside the "no installs" boundary).
- RED: exit 1; account-server-express-http/1 fail 2 / pass 5
  (`no file of src/server imports express`; running server: `npm start exited 0 before accepting connections`).
  loop2-api-error-route/1 also fail 2 (its handler lived in the removed file). The two `setUpClass`
  failures were recorded with `invariant: None` by run_tests.py.
- Redo: wrote `app.ts` (Express 5 app: `/api` JSON 404, static `dist/public` resolved from the module URL,
  plain-text 404 fallback) and `main.ts` (listen on 127.0.0.1:3000, error to stderr with exit code 1,
  ready line `Loop: http://127.0.0.1:3000`).
- GREEN: exit 0, all pass; `npm test` exit 0, 5/5 pass.

## 2. account-server-typecheck/1

- Covered code: `scripts/build.mjs:15` (`if (result.status !== 0) process.exit(...)`, which makes both
  `npm run typecheck` and `npm run build` fail on a tsc error) and `tsconfig.server.json:9`
  (`"noEmitOnError": true`, so a failed build leaves no `dist/server/main.js`).
- Set aside: both lines.
- RED: exit 1; account-server-typecheck/1 fail 2 / pass 1:
  `npm run typecheck exits 0 although [...] hold a type error`, `npm run build exits 0 although [...]`.
- Redo, step 1 (exit gate only): exit 1; typecheck/1 fail 1 / pass 2 —
  `npm run build with a server type error still leaves dist/server/main.js to start`. Shows both pieces are needed.
- Redo, step 2: `"noEmitOnError": true` back in `tsconfig.server.json`.
- GREEN: exit 0, all pass; `npm test` exit 0, 5/5 pass.

## 1. account-server-runtime/1

- Covered code: `package.json:6` (`"engines": { "node": "24.x" }`), `package-lock.json:17-19` (root
  entry `engines.node`), `@types/node` 24.19.0 (package.json + lockfile), `tsconfig.server.json` `"types": ["node"]`.
- Set aside: `engines` in package.json and in the lockfile root entry. Not set aside: `@types/node`
  and `types: ["node"]` (removing them breaks the server build; changing them is a dependency change).
- RED: exit 1; account-server-runtime/1 fail 2 / pass 3
  (`package.json declares no engines.node`; `package-lock.json's root entry declares no engines.node`).
- Redo: `"engines": { "node": "24.x" }` in package.json and in the lockfile root entry.
- GREEN: exit 0, all pass; `npm test` exit 0, 5/5 pass.

## 4. browser-view-framework/1

- Covered code: `src/browser/main.ts:1-2` (`document.createElement('main')`, `document.body.append(main)`)
  and `tsconfig.browser.json` `lib` with `"DOM"`.
- Set aside: emptied `src/browser/main.ts` (file kept, so the browser compilation still has an input and
  the build still emits `dist/public/main.js`). Not set aside: the DOM lib entry.
- RED: exit 1; browser-view-framework/1 fail 1 / pass 4:
  `no TypeScript file of src/browser refers to document`.
- Redo: `main.ts` creates an empty `<main>` and appends it to `document.body` (as README describes).
- GREEN: see final.

## Final

- Check command: exit 0, `Ran 22 tests ... OK`; account-server-express-http/1 pass 7,
  account-server-runtime/1 pass 5, account-server-typecheck/1 pass 3, browser-view-framework/1 pass 5,
  loop2-api-error-route/1 pass 2. `.runs/invariant-tests.jsonl` holds this final run.
- `npm test`: exit 0; tests 5, pass 5, fail 0, cancelled 0, skipped 0, todo 0.
- `git diff HEAD`: empty (`git status --short` clean). No difference, so no commit.

## Observations for the orchestrator

- Every check failed when its covered code was set aside; no check passed with the code removed.
- Checks that the set-asides did not exercise: the express dependency tests
  (`test_runtime_dependency_on_express_5`, `test_installed_express_is_5`), `test_node_type_definitions_are_major_24`,
  `test_server_compilation_uses_node_type_definitions`, and the DOM-lib half of
  `test_browser_compilation_uses_dom_and_source_refers_to_document` were not shown to fail.
- run_tests.py records a failing `setUpClass` with `invariant: None`, not under the invariant of its class.
