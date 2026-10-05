# Break author B2 report (correction 2)

Base 0b96e9e. Patches in `.runs/breaks/`, each independent; `git apply --check` on a clean tree passes for all three.

## loop2-one-serving-process.patch (src/server/app.ts, main.ts)
Change: the API 404 handler moves to a second Express app run in a forked child process (port 3001, `main.js --api`); the parent on 3000 serves static files and proxies `/api` to the child via fetch.
Falsifies: "One Express 5 process serves ..." - two node processes now run (verified with Get-CimInstance: `main.js` and `main.js --api`); the game is served by one, API requests by the other.
Verification: `npm run build` OK; `node dist/server/main.js`: `/` 200, `/main.js` 200, `/api/x` 404 `{"error":"Not found"}`, `/zzz` 404 plain. Killing the parent also removed the child.
Side effects: also opens a second port (3001); API 404 comes from the child through a proxy. Express 5 still handles API routes, no UI framework, unmatched /api still JSON.

## application-build-output.patch (scripts/build.mjs, package.json, src/server/*.ts)
Change: build compiles only tsconfig.browser.json; server TypeScript is no longer compiled; `npm start` runs `node src/server/main.ts` (Node 24 type stripping), imports use `.ts`, static dir points to `../../dist/public/`.
Falsifies: "compiles both the browser and the server TypeScript configurations" - the server config is never compiled; `dist/server` is not produced.
Verification: dist removed, `npm run build` OK, `ls dist` shows only `public/`; `npm start`: `/` 200, `/main.js` 200, `/api/x` 404 JSON.
Side effects: server config is no longer type-checked by `npm run typecheck` either (same loop); `npm test` startup tests may depend on `dist/server` (not run, tests/invariants not read).

## application-build-output-2.patch (scripts/build.mjs)
Change: build compiles only tsconfig.server.json; the browser `main.ts` is copied verbatim to `dist/public/main.js` (valid JS because it uses no type syntax).
Falsifies: same clause, the browser configuration is not compiled (no type check, no emit by tsc).
Verification: dist removed, `npm run build` OK; `dist/` has `public/{index.html,main.js}` and `server/`; `npm start`: `/` 200, `/main.js` 200 (raw TS source), `/api/x` 404 JSON.
Side effects: none against other rules; browser still has no UI framework.

Servers I started were stopped after each check.

## Re-targeted to 031b0a6

Worktree detached at 031b0a6 (tests/invariants not opened). Patches `loop2-one-serving-process.patch` and `application-build-output.patch` were re-created against the rewritten server code with the same intent and overwritten; `application-build-output-2.patch` is unchanged.
- loop2-one-serving-process: API app in a forked child (port 3001, `--api`), parent on 3000 serves static files and proxies `/api`. Build OK; `/` 200, `/api/x` 404 JSON; two node processes seen (`main.js` and `main.js --api`).
- application-build-output: build compiles browser config only; start runs `node src/server/main.ts`; imports `.ts`; public dir `../../dist/public/`. Build OK, `dist/` has only `public/`; `/` 200, `/api/x` 404 JSON.
- Apply check: `git apply --check` passes for all three on clean 031b0a6. Working tree restored; servers stopped. Side effects as in the sections above.
