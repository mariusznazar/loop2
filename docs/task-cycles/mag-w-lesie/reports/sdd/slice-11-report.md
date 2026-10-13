# Slice 11 report — the image carries and serves the icons

- Plan: `.runs/task-cycles/mag-w-lesie/plan-correction-1.md`, Slice 11
- Branch: `task/mag-w-lesie`, started at e3a6ac6
- Skill used: `superpowers:test-driven-development` 6.4.1 (and its `writing-good-tests.md`); no other skill.

## Commits

| Commit | What |
|---|---|
| 77bd277 `test(deploy): build the image and require it to serve every icon` | new `tests/deploy/test_loop2_image_icons.py` (failing test, committed alone) |
| fe57eae `fix(deploy): copy assets/icons into the image's build stage` | `Dockerfile`: `COPY assets/icons/ assets/icons/` after `COPY src/ src/`, before the type-check RUN; `.dockerignore`: `!assets/icons/` appended |

Diff of the change (whole):

```
 Dockerfile:     COPY src/ src/
               + COPY assets/icons/ assets/icons/
                 RUN npm run typecheck
.dockerignore:   !src/
               + !assets/icons/
```

Line endings kept (both files CRLF in the working tree, LF in the index, as before). The runtime
stage, the type-check RUN and the `COPY --from` of `dist/` are untouched.

## The new test

`tests/deploy/test_loop2_image_icons.py::ImageServesIcons.test_built_image_serves_every_icon_and_the_page`
cites no invariant. Where a Docker daemon answers it builds the image from the working tree
(`docker build --build-arg LOOP2_COMMIT=image-icons-check`), runs it, and from inside the
container (its own Node.js, port from the container's `LOOP2_LISTEN_PORT`) GETs `/` and
`/icons/<name>` for each `*.svg` of `assets/icons/` read from the working tree; it asserts 200 +
`image/svg+xml` + the file's exact bytes per icon (subtest per icon), and 200 + `text/html` for `/`.
It asserts first that `assets/icons/` holds at least one SVG (so it cannot pass empty). Without a
daemon it skips with "no Docker daemon answers; the image's build and the icons it serves stay
unchecked". Container and image are removed through `addCleanup`.

Breaks it catches: the build stage lacking `assets/icons/` (Dockerfile COPY or `.dockerignore`
admission missing → build fails, ENOENT); the build no longer copying the icons into
`dist/public/icons/` or the server not serving them (404 / wrong type); a changed file in the image
(bytes differ); `/` broken.

## Checks (from the worktree root, in the plan's order)

1. **Failing test first** — `python -B .the-way/gate/run_tests.py tests/deploy` with only the new
   test written: exit 1; `Ran 64 tests`, `FAILED (failures=1)`; the one failure is the new test at
   `docker build`:
   `#13 1.241 Error: ENOENT: no such file or directory, scandir '/app/assets/icons/'` …
   `ERROR: failed to build: failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code: 1`.
   The other 63 passed; no skip in the output.
2. **After the change** — `python -B .the-way/gate/run_tests.py tests/deploy`: exit 0;
   `Ran 64 tests in 134.740s`, `OK`; no skip (the word "skip" does not occur in the output).
3. `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`:
   exit 0; `Ran 127 tests in 177.196s`, `OK`. The record holds 124 lines, all `pass`, no null line
   (so no skip and no uncited failure). Among them `pass` for
   `test_loop2_one_serving_process_container.py::RunningContainerHasOneServingProcess.test_running_container_has_one_listening_node_process`
   (builds the image; failed on Base), for all six tests of `test_account_server_typecheck.py`, the
   three of `test_loop2_container_isolation.py` and the nine of `test_loop2_host_sharing.py`. No
   "port 3000 … already in use" occurred, so no rerun was needed.
4. `npm test`: exit 0; `ℹ tests 172`, `ℹ pass 172`, `ℹ fail 0`, `ℹ skipped 0`. Base count, from a
   temporary detached worktree of 6354c12 (node_modules linked in, removed afterwards): exit 0,
   `ℹ tests 172`, `ℹ pass 172`, `ℹ fail 0`, `ℹ skipped 0` — unchanged.
5. By hand: `docker build --build-arg LOOP2_COMMIT=correction-1 -t loop2-correction-1 .` → exit 0;
   `docker run -d --name loop2-correction-1 -p 127.0.0.1:3999:3000 loop2-correction-1` → exit 0;
   `docker inspect --format "{{.State.Health.Status}}" loop2-correction-1` → `healthy`; then
   `curl -sS -o /dev/null -w "%{http_code} %{content_type}"`:
   ```
   /icons/wood-stick.svg -> 200 image/svg+xml
   /icons/berry-bush.svg -> 200 image/svg+xml
   /icons/fern.svg -> 200 image/svg+xml
   /icons/flax.svg -> 200 image/svg+xml
   / -> 200 text/html; charset=utf-8
   ```
   `docker exec loop2-correction-1 ls dist/public/icons`:
   ```
   berry-bush.svg
   fern.svg
   flax.svg
   wood-stick.svg
   ```
   `docker rm -f loop2-correction-1` → exit 0; `docker image rm loop2-correction-1` → exit 0.

Cleanup: afterwards no container and no tagged image named `loop2-invariant-check*`,
`loop2-image-icons-check*` or `loop2-correction-1` remains. Build cache from the builds stays in the
local Docker store (not pruned).

## Deviations from the plan

None in substance. Two notes on how:
- the new test fetches from inside the container (`docker exec … node -`), as the container check
  of `loop2-one-serving-process/2` does, instead of publishing a host port, so it needs no free host
  port; the host-port path is covered by check 5;
- the `COPY assets/icons/` stands before `RUN npm run typecheck` (with the other source COPYs),
  not between the type check and the build; the type-check RUN itself is unchanged.

## Questions

None.

## Fixes after review

From `.runs/task-cycles/mag-w-lesie/reports/sdd/slice-11-review.md`, Minor 1 and Minor 2 (Minor 3
ruled out of this slice by the orchestrator).

- Commit 1390634 `test(deploy): register image icon check cleanups before the commands they undo`
  (only `tests/deploy/test_loop2_image_icons.py`):
  - Minor 1: the container's and the image's names are fixed (unique) before the commands, and
    `addCleanup(docker_run, "image", "rm", "-f", tag)` is registered before `docker build`,
    `addCleanup(docker_run, "rm", "-f", name)` before `docker run`; a build or run that times out
    still leaves nothing behind. Cleanups run last-registered first: the container, then the image.
  - Minor 2: the docstring's first line now cites only `D-27/1, D-05/3, D-14/1`; the reference to
    the review remark is gone.
- Rerun `python -B .the-way/gate/run_tests.py tests/deploy`: exit 0, `Ran 64 tests in 106.278s`,
  `OK`; the word "skip" does not occur in the output (the new test built and ran the image).
  Afterwards no container and no image named `loop2-image-icons-check*` remains.
