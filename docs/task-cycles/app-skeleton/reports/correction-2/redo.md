# Redo of the server code against loop2-one-serving-process/1 (correction 2)

Worktree C:\Storage\repos\loop2-skeleton, branch task/app-skeleton, start HEAD aa2c621, the-way pinned at 96c52488 (gitlink matches). `dist/` did not exist at start. No old server code read: no git history of src/, no `.runs/`, `docs/`, other worktrees. Read only what the prompt allows (README, package files, tsconfigs, scripts/build.mjs, src/browser, tests/, foundations/) plus Express 5.2.1's `lib/application.js` `listen` in node_modules.

## RED

- `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl` -> exit 1. Ran 23 tests: 5 failures, 5 errors. Every one comes from the missing server source: `npm run build` / `npm run typecheck` stop with `TS18003: No inputs were found in config file tsconfig.server.json`, and `test_server_source_imports_express` finds no file of src/server importing express. The setUpClass of the express-http runtime class, loop2-api-error-route and loop2-one-serving-process error on the failed build.
- `npm test` -> exit 2, same TS18003 in the build step; the node tests did not run.

## What was written and why

`src/server/app.ts` — `export function createApp(): Express`:
- `app.use('/api', ...)` answers every method on `/api`, `/api/` and below with `404` and JSON `{ "error": "Not found" }` (README; D-05 "an unmatched `/api/` request receives an API error"; tests/http.test.mjs exact body). It is mounted before the static files, so no `/api/...` path can reach the game's page. HEAD bodies are dropped by Node.
- `express.static(dist/public)` with the directory resolved from `import.meta.url` (`../public/` beside the compiled `dist/server/app.js`), so the files are found from any working directory (http test runs `createApp()` from a temp cwd). `/` serves `index.html`; misses (`/apix`, `/missing.js`) and traversal (403/400 inside serve-static, fall through) end in Express's ordinary 404, not JSON and not the page.
- Express is the only request handler: no `createServer(fn)` and no `request` listener (account-server-express-http source scan).

`src/server/main.ts` — `createApp().listen(3000, '127.0.0.1')` in the one `node dist/server/main.js` process, no child processes, no other listener (loop2-one-serving-process). On `listening` it prints `Loop: http://127.0.0.1:3000`; on `error` it prints `Loop could not start on 127.0.0.1:3000: <code> <message>` to stderr and sets exit code 1, so an occupied port gives a non-zero exit with `127.0.0.1:3000` and `EADDRINUSE` in stderr and no ready line (tests/startup.test.mjs). Listeners are attached on the server directly rather than through Express 5's `listen` callback, which `application.js` wires to `error` as well.

No new packages; tests/ and foundations/ untouched.

## GREEN

- `npm test` -> exit 0. Build ok; 5 tests, 5 pass, 0 fail (static HTML/JS from another cwd; API JSON 404 across paths, methods, queries, HTML Accept; ordinary 404s; traversal; EADDRINUSE start failure).
- `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl` -> exit 0. Ran 31 tests, OK. Recorded verdicts of this run, all `pass`: account-server-express-http/1 (7), account-server-runtime/1 (5), account-server-typecheck/1 (3), application-build-output/1 (3), browser-view-framework/1 (6), loop2-api-error-route/1 (2), loop2-one-serving-process/1 (5).
- Port 3000 was free before each run; no process killed that this run did not start.

## Commit

`3af85d18199bdd95435568fcd239d332a831849d` (3af85d1) on task/app-skeleton, author mariusznn@gmail.com, files `src/server/app.ts` and `src/server/main.ts` only, message `fix: redo server code against the one serving process check`. Working tree clean afterwards (dist/ and .runs/ ignored).
