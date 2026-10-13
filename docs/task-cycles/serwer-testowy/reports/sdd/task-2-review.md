# Slice 2 review (b9400ed..1fa0d31)

Verdicts: spec compliance PASS; task quality PASS, with one Important finding in the container check (not in the slice's files).

## Spec compliance
Dockerfile, .dockerignore, compose.yaml match the brief: both stages `FROM node:24-slim`; `npm ci`, typecheck, build, `npm prune --omit=dev` in that order; runtime stage copies only package.json, node_modules, dist, chowned to node; USER node, NODE_ENV/LOOP2_LISTEN_*, EXPOSE 3000, exec-form CMD, Node HEALTHCHECK, labels (title, revision from ARG LOOP2_COMMIT declared in the runtime stage). Compose: project loop2, service app, container loop2, LOOP2_COMMIT default unknown, 18080:3000, mem_limit 512m, restart unless-stopped, init true, no volume/network/socket/`loop` reference. No server name, SSH port/user or IPv6 in the diff. `docker compose -f compose.yaml config -q` OK (local CLI, not the server's 2.35.1).

## Real build (Docker 29.7.2 answered; scratch copy, image/container removed afterwards)
- `docker build --build-arg LOOP2_COMMIT=abc123 .` succeeds (npm ci with Linux native TypeScript package from the lockfile works; node_modules not sent, .dockerignore allow-list effective).
- `docker run --init`: Node v24.21.0; process uid 1000 (node); `GET /` 200 text/html; `GET /api/nothing` 404 `{"error":"Not found"}` application/json; health status healthy; labels title=loop2, revision=abc123; /app/dist and /app/node_modules owned by node; typescript absent from runtime node_modules (pruned); runtime /app holds only dist, node_modules, package.json.
- Type error appended to src/server/main.ts: build fails at `npm run typecheck`.
- Probe run as `-u node`: exactly one listening process (`node dist/server/main.js`, port 3000, express 5.2.1, no child processes).

## Invariant checks (scratch copy with git init + node_modules)
Unbroken: runtime OK; typecheck fails only deploy-script/workflow tests (Slice 3/4, expected); isolation fails only the 6 deploy-script tests (expected); static one-serving-process tests pass.
Deliberate breaks (written from the sentences, reverted after each):
- account-server-runtime/1: FROM node:22-slim (build stage, line 1) -> test_deployment_files_name_only_node_24 FAILED. Runtime stage FROM (line 12) node:22-slim -> same test FAILED. Caught.
- account-server-typecheck/1: delete `RUN npm run typecheck` -> test_dockerfile_type_checks_before_the_runtime_stage_takes_dist FAILED. Caught.
- loop2-container-isolation/1: `container_name: loop` -> test_compose_names_its_own_project_service_and_container and test_compose_shares_nothing_with_another_deployment FAILED. Caught.
- loop2-one-serving-process/2: CMD `["sh","-c","node dist/server/main.js & node dist/server/main.js"]` -> test_image_command_is_exec_form_node FAILED. Caught.

## Findings
- Important (check defect, not the Dockerfile): `test_running_container_has_one_listening_node_process` fails on the correct, unbroken image here: "no process of the container listens within 60 s" although the log shows the server listening. Cause: the check reads the container's processes with `docker exec -u 0`; on this engine root without CAP_SYS_PTRACE gets EACCES on `/proc/<pid>/cwd` and `/proc/<pid>/fd/*` of the uid-1000 server process, so `ports` is empty. Run as `-u node` the same probe sees the one listener correctly. Because the spec requires a non-root `node` user, this check can never pass under default capabilities where this ptrace rule applies (it may pass on the server's kernel; unknown). Fix belongs to the foundation step: run the probe as the image's user (drop `user="0"`), or read ports from `/proc/net/tcp` plus the process list without fd access. Its CMD-break proof therefore rests on the static exec-form test only.
- Minor: none in the diff. HEALTHCHECK one-liner is valid exec-form JSON with fetch (Node 24); status 200 required. Trust-boundary section (deploy/**): not applicable, no deploy change.

## Unchecked
Server-side Compose 2.35.1 acceptance; build on the server's architecture (lockfile holds linux native packages for several arches, local build was the Docker Desktop linux engine).

## Re-review after 54dc9f7
Verdict: ADDRESSED.
1. Unbroken (scratch copy of HEAD 54dc9f7, Docker daemon answering): `python -B tests/invariants/test_loop2_one_serving_process_container.py` -> Ran 3 tests, OK (the running-container test now passes).
2. Deliberate break from the sentence: CMD kept exec-form `node`, but it spawns a second node process listening on port 4000 next to the server. The static exec-form test passes; the daemon test fails: "2 != 1 : processes listening in the container before the requests" (listeners pid 7 and its child pid 15). Caught by the daemon part.
3. Not weakened: the diff only strengthens. The probe runs as the image's own user (no `-u 0`); added are a check of exactly one listener before the requests, and a check that every listening socket in /proc/net/tcp(6) belongs to a process whose descriptors the probe could read (an unreadable owner now fails instead of being uncounted); the HTTP probe got a 10 s timeout. All earlier assertions (one listener after requests, `node`, no children, express 5, GET / 200 HTML, /api/ status) remain.
Cleanup: no images or containers left from this re-review (scratch copy only).
