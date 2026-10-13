### Slice 2 — container image and Compose service

- **Goal:** `Dockerfile` (multi-stage, every stage `FROM node:24-slim`; build stage `npm ci`,
  `npm run typecheck`, `npm run build`, production dependencies only; runtime stage with
  `package.json`, production `node_modules` and `dist/` only, user `node`, `NODE_ENV=production`,
  `LOOP2_LISTEN_HOST=0.0.0.0`, `LOOP2_LISTEN_PORT=3000`, `EXPOSE 3000`, exec-form `CMD`, a Node.js
  `HEALTHCHECK` on `http://127.0.0.1:3000/`, labels `org.opencontainers.image.title=loop2` and the
  revision from build argument `LOOP2_COMMIT`); `.dockerignore` as an allow-list of
  `package.json`, `package-lock.json`, `tsconfig.*.json`, `scripts/` and `src/`; `compose.yaml`
  with project `loop2`, service `app`, container `loop2`, `LOOP2_COMMIT` defaulting to `unknown`,
  host port 18080 to 3000, `mem_limit: 512m`, `restart: unless-stopped`, `init: true`, no volume,
  external network, socket mount or reference to `loop` — all as spec components 2 and 3 give.
- **Change:** `Dockerfile` · `.dockerignore` · `compose.yaml`
- **Read:** `docs/task-cycles/serwer-testowy/task-frozen.md` · `docs/task-cycles/serwer-testowy/spec.md`
  `package.json` · `scripts/build.mjs` · `tsconfig.server.json` · `tsconfig.browser.json`
  `.gitignore` · `src/server/main.ts` · `foundations/invariants.md` · `foundations/part_map.md`
  `tests/invariants/test_account_server_runtime.py` · `tests/invariants/test_account_server_typecheck.py`
  and, written by the foundation step and so not measured here, tests/invariants/test_loop2_container_isolation.py
  and tests/invariants/test_loop2_one_serving_process_container.py
- **Checks:** the failing tests are the foundation step's: the extended typecheck check, the
  runtime check, the static parts of the container-isolation check and of the container
  one-serving-process check. Then `docker compose -f compose.yaml config` (local Compose CLI 5.4.0
  needs no daemon; it differs from the server's 2.35.1, so a pass does not prove the server accepts
  the file) and `python -B .the-way/gate/run_tests.py tests/invariants`: runtime, typecheck and
  the static container parts pass; the isolation check's script part fails until Slice 4. Only
  where a Docker daemon answers: `docker build --build-arg LOOP2_COMMIT=<sha> .` and `docker run
  --init` of the image — Node.js 24, non-root process, one listening process, `GET /` 200, an
  unknown `/api/` path a JSON 404, health check healthy — and a build with a type error appended to
  `src/server/main.ts` in a temporary copy fails. On this machine the daemon does not run: those
  stay unchecked, and the human's first deployment is their first real run.
- **Depends on:** Slice 1 · every foundation entry above

