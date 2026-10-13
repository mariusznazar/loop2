# Plan — Wysłać maga żywiołów na mapę Las, po której chodzi według programu reguł — correction 1, remark 3 (the image carries the icons)

- Task: .runs/task-cycles/mag-w-lesie/task.md
- Spec: .runs/task-cycles/mag-w-lesie/spec.md
- Base: 6354c125a2a56626d5e1ba20b2aa561bcfa5cb98

Slices 1–10 of `.runs/task-cycles/mag-w-lesie/plan.md` are made and reviewed; nothing of them is
redone. This plan covers the human's review remark 3 only: since pull request #11 every push to
`main` builds the Docker image and deploys it, the image's build stage copies only
`package*.json`, `tsconfig.*.json`, `scripts/` and `src/`, and `scripts/build.mjs` now reads
`assets/icons/`.

Seen on Base (the planner ran `docker build --build-arg LOOP2_COMMIT=planner-probe -t
loop2-planner-probe:c1 .` from the worktree root, Docker 29.7.2): the build stops at `RUN npm run
build` with `ENOENT: no such file or directory, scandir '/app/assets/icons/'` (exit 1). So today
the image does not build, a deployment from `main` after this request would stop at its build
(exit 7), and the container check of `loop2-one-serving-process/2` fails where a Docker daemon
answers. `python -B .the-way/gate/run_tests.py tests/deploy` passed on Base (63 tests): those
tests drive the deploy script with a stand-in `docker` and build no image.

## Order of work

1. **Foundation step** (orchestrator, with `the-way-update-part-map`, before Slice 11): the
   part-map change below (orchestrator ruling Q62).
2. **Slice 11**, made by its own fresh agent and reviewed by another.
3. **Return step and gate of the correction**: the checks under *Coverage*.

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| Part `deployment`: its *Depends on* takes in the reach its build now makes into `assets/icons/**`, a file pattern of `browser-view` that is also `browser-view`'s trust boundary — written as the part map's rules for *Depends on* require (what the part may depend on), with the dependency graph left unchecked as at Base | part map | review remark 3; orchestrator ruling Q62 | Slice 11 (the Dockerfile and `.dockerignore` it changes are `deployment`'s files and copy `browser-view`'s files); written before Slice 11 |

No invariant is listed. The image side is already bound: `loop2-one-serving-process/2` says one
Express 5 process in the loop2 container "serves both the built game and `/api/` … requests", and
its container check (`tests/invariants/test_loop2_one_serving_process_container.py`) builds the
image from the working tree, so it fails on Base and catches an image that does not build. What
that check does not read is which of the built game's files beyond `/` the container serves — a
reading of an existing check, not a missing entry. The derivation WAY-12 does leave open is on
D-27/1: its clause "copied into that directory when the application is built" stands at level 2,
yet a sentence a commit can make false is derivable from it. That clause comes from D-27/1, not
from remark 3, and the correction's code does not depend on it, so it is left to the
correction's return step (question 2 in the report).

Checks of the foundation step, from the worktree root:
`python -B .the-way/elements/part-map/format_guard.py foundations/part_map.md --base d2b4687320e7b0e89306e9e5530bfc824a90627f`
(0 errors; the two warnings and the one unchecked line of Base may stay, plus any warning the new
dependency brings without a recorded separation) ·
`python -B .the-way/elements/decisions/format_guard.py foundations/decisions.md --base d2b4687320e7b0e89306e9e5530bfc824a90627f --merge-onto d2b4687320e7b0e89306e9e5530bfc824a90627f`
and the same for `foundations/invariants.md` with `.the-way/elements/invariants/format_guard.py`
(Scope and *Part* names read against the changed map).

## Slices

### Slice 11 — the image carries and serves the icons

- **Goal:** the Docker build stage holds `assets/icons/` before `npm run build`, so the image
  builds and its `dist/public/icons/` holds every SVG file of `assets/icons/`; `.dockerignore`
  admits `assets/icons/` and still nothing else new; the runtime stage, the type-check RUN and the
  `COPY --from` of `dist/` keep their shape; a new test of the deployment part builds the image
  from the working tree where a Docker daemon answers, runs it, and shows that for each SVG file
  in `assets/icons/` a GET of `/icons/<name>` in the running container answers 200 with an SVG
  media type and the file's bytes, and that `/` still answers 200 with the HTML page; where no
  daemon answers, the test skips with a reason naming what stays unchecked, and it removes the
  container and image it made.
- **Change:** `Dockerfile` · `.dockerignore` · `tests/deploy/test_loop2_image_icons.py`
- **Read:** `scripts/build.mjs` · `src/server/app.ts` ·
  `tests/invariants/test_loop2_one_serving_process_container.py` ·
  `tests/invariants/loop2_invariant_support.py:120-146` ·
  `tests/invariants/test_account_server_typecheck.py:1-40` ·
  `foundations/decisions.md:240-260` · `foundations/decisions.md:360-378` ·
  `foundations/decisions.md:436-466` · `foundations/decisions.md:770-802` ·
  `foundations/part_map.md:1-17` · `foundations/part_map.md:103-133` ·
  `.runs/task-cycles/mag-w-lesie/spec.md:238-250`
- **Checks:** from the worktree root, in this order:
  1. The failing test first: `python -B .the-way/gate/run_tests.py tests/deploy` with only the new
     test file written — the new test fails at `docker build` (ENOENT for `/app/assets/icons/`),
     the other 63 tests pass.
  2. After the Dockerfile and `.dockerignore` change: `python -B .the-way/gate/run_tests.py
     tests/deploy` — all tests pass and the new one is not skipped (the report shows no skip).
  3. `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
     — every test passes, the container test of `loop2-one-serving-process/2` included and not
     skipped (it builds the image, which failed on Base); `test_account_server_typecheck.py`,
     `test_loop2_container_isolation.py` and `test_loop2_host_sharing.py` pass on the changed
     Dockerfile. The invariant checks are read-only: a failure goes back to the orchestrator.
  4. `npm test` — passes, the count of tests unchanged from Base.
  5. By hand in the built image: `docker build --build-arg LOOP2_COMMIT=correction-1 -t
     loop2-correction-1 .`; `docker run -d --name loop2-correction-1 -p 127.0.0.1:3999:3000
     loop2-correction-1`; once healthy (`docker inspect --format "{{.State.Health.Status}}"
     loop2-correction-1` reads `healthy`), `curl -sS -o /dev/null -w "%{http_code} %{content_type}"`
     on `http://127.0.0.1:3999/icons/wood-stick.svg` and on each of `berry-bush.svg`, `fern.svg`,
     `flax.svg` gives `200 image/svg+xml…`, and on `http://127.0.0.1:3999/` gives `200
     text/html…`; `docker exec loop2-correction-1 ls dist/public/icons` lists the four files;
     then `docker rm -f loop2-correction-1` and `docker image rm loop2-correction-1`. The slice's
     report quotes the outputs.
- **Depends on:** Part `deployment` *Depends on* change (foundation step)

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Remark 3 — the image carries the icons | Slice 11 (`Dockerfile` copies `assets/icons/` into the build stage, `.dockerignore` admits it; check 5 lists `dist/public/icons` in the image); part-map change of `deployment` |
| Remark 3 — show that the image builds | Slice 11 (the new test's `docker build` — failing on Base, passing after; the container test of `loop2-one-serving-process/2` in check 3; the build by hand in check 5) |
| Remark 3 — show that the image serves them | Slice 11 (the new test: each SVG of `assets/icons/` served at `/icons/<name>` with its bytes from the running container; check 5 by `curl` through a host port) |
| Decisions binding the change: D-27/1 (icons kept outside the served directory, copied in when the application is built), D-05/3 (one Express process serves the built game in the container), D-06/3 (building compiles both configurations), D-14/1 (a Docker container from a Dockerfile), D-17/1 (build limits unaffected by copying more files) | Slice 11; check 3 (the invariant checks derived from D-05/3, D-06/3, D-17/1 and D-01's type check before deployment) |
| *Questions carried to cycle* — where the icons come from (source files outside the served directory) | unchanged by this correction; the image now carries them as the build does outside it (Slice 11) |
| Success: every changed foundation file passes its format guard | foundation step (checks above) |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The build stage copies and `.dockerignore` admits `assets/icons/` only | `assets/` whole (a later asset directory would enter the image without any review of the image) | a later asset directory needs one more line in each of the two files |
| The proof that the image builds and serves the icons is a new test of the deployment part in `tests/deploy/` | widening the container check of `loop2-one-serving-process/2` to `/icons/` (a change of a read-only invariant check, with its reading of "the built game", which needs its own independent assessment); proof only by hand (not repeated on a later change of the Dockerfile) | a second image build in each run of `tests/deploy` (about as long as the container check's); where no daemon answers, the test is skipped and the image stays unchecked |
| The new test reads the list of icons from `assets/icons/` and compares bytes | a fixed list of the four names, or the status alone | none beyond reading four small files |
| One slice | a slice for the Dockerfile and one for the test (the test is the slice's failing check, written first) | none |
