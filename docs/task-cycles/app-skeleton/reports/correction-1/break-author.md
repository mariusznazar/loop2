# Break author report

Patches in `docs/task-cycles/app-skeleton/breaks/`, made against HEAD 77a3754. All five pass `git apply --check` in the worktree root.
Verification was done in a scratch worktree (node_modules copied in), with `npm test` (build + 5 tests) after applying each patch.

1. `account-server-runtime.patch` - `engines.node` "24.x" -> "22.x" in package.json and the root entry of package-lock.json.
   Falsifies "source and deployment use Node.js major version 24" (the declared deployment runtime is 22). npm test: 5/5 pass (runs on local Node 24).
2. `account-server-typecheck.patch` - scripts/build.mjs warns instead of exiting on a tsc failure; tsconfig.server.json `noEmitOnError: false`.
   Falsifies "types are checked before deployment": a build/typecheck with a server type error exits 0 and still emits dist/server. Verified: appended `const n: number = 'x'` to main.ts, `npm run typecheck` exit 0, `npm run build` emitted app.js/main.js. npm test 5/5 pass on clean source.
3. `account-server-express-http.patch` - src/server/app.ts rewritten on node:http (routes, JSON 404, static files, text 404); no express import. express stays in package.json dependencies (unused).
   Falsifies "handles its HTTP routes and responses through Express 5". Builds and typechecks; npm test 5/5 pass; dist/server/app.js has no 'express'.
4. `browser-view-framework.patch` - adds preact 10.26.9 dependency (package.json, lock), main.ts renders `<main>` via preact h/render, index.html importmap, build.mjs copies preact.module.js to dist/public.
   Falsifies "no UI framework in its code or runtime dependencies". Builds; npm test 5/5 pass; browser run not exercised in a real browser (importmap maps 'preact' to /preact.module.js).
5. `loop2-api-error-route.patch` - app.ts drops the /api 404 handler and replaces the final 404 with an index.html fallback (SPA style).
   Falsifies "an unmatched /api/ request ... never the built game's HTML page": /api/x returns index.html. Builds and starts; npm test: 3 of 5 fail (as expected, the existing HTTP tests catch it).

Note: the worktree has unrelated uncommitted modifications in foundations/*.md (not mine, untouched).
