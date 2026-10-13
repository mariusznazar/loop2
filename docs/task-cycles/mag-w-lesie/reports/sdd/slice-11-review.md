# Slice 11 review — the image carries and serves the icons

- Range: e3a6ac6..fe57eae (77bd277 test, fe57eae fix); 3 files, +154 lines
- Plan: `.runs/task-cycles/mag-w-lesie/plan-correction-1.md`, *Slice 11* and *Choices*
- Executor's report: `.runs/task-cycles/mag-w-lesie/reports/sdd/slice-11-report.md`
- Reviewed in one pass; the diff is small. No skill used, no subagent.

## What I ran myself (checkout at fe57eae, tree clean before and after)

| Check | Result |
|---|---|
| `python -B .the-way/gate/run_tests.py tests/deploy` | exit 0, `Ran 64 tests in 115.882s`, `OK`; the word "skip" does not occur in the output (the new test built and ran the image, Docker 29.7.2) |
| `python -B .the-way/gate/run_tests.py tests/invariants` (no `--record`, so nothing written) | exit 0, `Ran 127 tests in 191.415s`, `OK`; no skip (the container check of `loop2-one-serving-process/2`, `test_account_server_typecheck.py`, `test_loop2_container_isolation.py`, `test_loop2_host_sharing.py` among them) |
| Build context as `.dockerignore` admits it: a throwaway `busybox` build `COPY . /ctx` + `find` (Dockerfile from stdin, image removed after) | `/ctx/assets/icons/{berry-bush,fern,flax,wood-stick}.svg`, `package.json`, `package-lock.json`, `tsconfig.browser.json`, `tsconfig.server.json`, `scripts/`, `src/` — nothing else |
| Docker leftovers after all runs | no container, no image named `loop2*` |

`npm test` and the failing-first run of check 1 I did not repeat; the report quotes them and the
planner's probe on Base (ENOENT for `/app/assets/icons/` at `RUN npm run build`) agrees with the
failure the report shows.

## Strengths

- The change is the smallest that answers the remark: one `COPY assets/icons/ assets/icons/`
  (`Dockerfile:8`) and one `!assets/icons/` (`.dockerignore:7`). The runtime stage, the type-check
  RUN and `COPY --from=build … /app/dist` are untouched, so the final image still holds only
  `package.json`, `node_modules` and `dist/`; the icon sources themselves never reach the runtime
  stage, only the `*.svg` copies `scripts/build.mjs` writes into `dist/public/icons/`.
- `.dockerignore` admits exactly `assets/icons/**` and nothing more (verified above), as the
  plan's first Choice asks (not `assets/` whole).
- The test proves what the remark asks, on the real artefact: it builds the image from the
  working tree, runs it, and compares each served icon **byte for byte** with the working-tree
  file, plus status and media type, plus `/` as HTML. The list of icons is read from
  `assets/icons/` with the same rule `scripts/build.mjs` uses (top level, name ends with `.svg`,
  case-sensitive), so a fifth icon is checked without editing the test.
- It cannot pass empty (`assertTrue(icons, …)` before the daemon check, so it holds even on a
  machine without Docker), it skips with a reason naming what stays unchecked, it publishes no
  host port (no clash with the container check's port 3000), it reads the port from the
  container's own `LOOP2_LISTEN_PORT`, and its readiness loop retries on refused connections
  while a 404 reaches the status assertion instead of being retried away.
- The failing test was committed alone first (77bd277), then the fix (fe57eae).

## Trust boundary (WAY-48): does a crafted file under `assets/icons/` get caught before the image?

Which files reach the image: `scripts/build.mjs:22-25` copies each top-level entry of
`assets/icons/` whose name ends with `.svg` (case-sensitive). Which files the checks read:

- `tests/view/icons.test.mjs:39` — `readdirSync(ICONS).filter(name => name.endsWith('.svg'))`:
  the very same set, from disk (so it also covers a git-ignored file). On that set it applies the
  forbidden-form scan and, stronger, the shape test (`icons.test.mjs:76-90`: only `svg` and `path`
  elements, only `xmlns`, `viewBox`, `d`, `fill` attributes).
- `tests/invariants/test_icon_file_content.py:139-141` — files git tracks or would track, top
  level, `.svg` in any case: a superset by letter case, a subset only for git-ignored files, which
  the JS check covers.
- A non-SVG file or an upper-case `.SVG` enters the build context (`.dockerignore` admits the
  whole directory) but not the image, since the build does not copy it.
- A subdirectory named `*.svg` makes `copyFile` fail, so the build — and a deployment — stops
  (exit 7, the part map's low failure mode "the build fails").

So the checks' file set covers every file the image can serve; a crafted SVG is flagged by both
checks. What the checks do not do is run on the path to the image — see Minor 3.

## Issues

### Critical (Must Fix)

None.

### Important (Should Fix)

None.

### Minor (Nice to Have)

1. **`tests/deploy/test_loop2_image_icons.py:109-112` — the container's cleanup is registered
   only after `docker run` returns.** If `docker run -d` exceeds `COMMAND_TIMEOUT`,
   `subprocess.run` raises `TimeoutExpired`, `addCleanup(docker_run, "rm", "-f", name)` is never
   reached and the container (already created under the random name) stays, holding the image so
   its `image rm -f` cleanup also leaves it behind. The test's own docstring promises both are
   removed afterwards. Rare (a hung daemon), but a leftover running container on a developer's
   machine is the one thing the docstring rules out. Fix: register
   `self.addCleanup(docker_run, "rm", "-f", name)` before `docker_run("run", …)` (and likewise the
   image cleanup before the build); `rm -f` of a name that does not exist is harmless.

2. **`tests/deploy/test_loop2_image_icons.py:1-2` — the docstring cites "review remark 3 of the
   task mag-w-lesie".** That remark lives in the pull request and in `.runs/`, which git ignores;
   a reader of the test on `main` later has nothing to resolve it against, and it records how the
   test came about rather than what it guards. The other deploy tests cite their spec sections,
   which share the problem, but this one also names the decisions that last. Fix: keep
   `D-27/1, D-05/3` (and `D-14/1`, the Dockerfile-built container) and drop the remark reference,
   or move it to the commit message where it already is in substance.

3. **Plan/spec level, not this slice's code — the icon checks guard the image only through the
   manual pre-merge gate.** What a person sees: once this merges, every push to `main` puts the
   icons on the internet-facing test server, where `express.static` (`src/server/app.ts:18`)
   serves `/icons/<name>.svg` as `image/svg+xml` on the game's own origin, with no
   `Content-Security-Policy` or `X-Content-Type-Options` header. The spec's safety argument
   (`.runs/task-cycles/mag-w-lesie/spec.md:243`: "drawn only through `<img>`/SVG `<image>`, where
   scripts do not run") does not cover a visitor who opens `/icons/x.svg` directly — then a script
   in the file would run on the game's origin. The only guard is the two icon checks, and nothing
   on the deploy path runs them: `deploy/loop2-deploy:293-304` runs `docker compose build`, whose
   build stage runs only `npm run typecheck` and `npm run build`. AGENTS.md's gate ("before a
   merge … the tests of every changed part") does cover it, since an icon change is a
   `browser-view` change. This is the same footing every `src/` change already has, so it is not a
   regression of this slice and the plan did not ask for more. Two ways out, for the human to
   choose: (a) leave it — the cost is that the guard is as strong as the merge discipline; (b)
   defence in depth — e.g. a response header `Content-Security-Policy: default-src 'none'` (plus
   `style-src 'unsafe-inline'` if needed) on `/icons/`, or the icon scan run inside the build stage
   so a crafted icon fails the build (exit 7, nothing deployed). Cost of (b): one more middleware
   or one more RUN and its test, and a change outside the slice's three files (`src/server/` is
   `account-server`'s, or the Dockerfile would need `tests/` admitted).

## Declined to judge

- `COPY assets/icons/` stands before `RUN npm run typecheck` (`Dockerfile:8`), so a change to an
  icon alone also re-runs the type check layer — a seconds-scale cache effect; the plan asked
  only that the type-check RUN keep its shape, and the executor reported the placement.
- Icon file names holding URL-special characters (`#`, `?`, `%`): `scripts/build.mjs` and the
  test's `f"/icons/{icon}"` would both mishandle them; no current name has one and no rule
  governs icon names.
- An icon that is a symbolic link: the checks read the target on the host, the build's `copyFile`
  follows the target inside the build container; they diverge only if the same path holds
  different content on both sides, which I found no practical way to arrange.
- Untracked files left in the server's checkout directory entering the build context — the
  deploy script's checkout hygiene, outside this slice.
- Build cache growth from the extra image build per `tests/deploy` run (local machine) — the
  plan's Choices accept the second build; the report notes the cache is not pruned.

## Recommendations

- Apply Minor 1 and 2 if the slice is touched again; neither blocks.
- Carry Minor 3 to the human as a question with the two options above; it is a property of the
  spec's trust model now exposed by deployment, not a defect of this change.

## Assessment

**Ready to merge?** Yes

**Reasoning:** The Dockerfile and `.dockerignore` admit exactly `assets/icons/` and the image now
builds and serves every icon with its exact bytes, shown by a new test I re-ran (64 deploy tests
and 127 invariant tests pass, none skipped); the two Minor test issues do not affect correctness,
and the third is a plan-level question for the human.

## Re-review of fe57eae..1390634

- Range: one commit, 1390634 `test(deploy): register image icon check cleanups before the
  commands they undo`; only `tests/deploy/test_loop2_image_icons.py` changes (+6 −4). Checkout at
  1390634, tree clean before and after.
- **Minor 1 — fixed.** `self.addCleanup(docker_run, "image", "rm", "-f", tag)` now stands before
  `docker build` and `self.addCleanup(docker_run, "rm", "-f", name)` before `docker run`
  (`tests/deploy/test_loop2_image_icons.py:110-115`), so a build or run that times out still has
  its cleanup registered. Cleanups run in reverse order of registration: the container first,
  then the image, which is the order that works. Removing a name that does not exist with
  `-f` is harmless (exit status ignored, as before). The added comment is accurate.
- **Minor 2 — fixed.** The docstring's first line now cites only `D-27/1, D-05/3, D-14/1`;
  the reference to the review remark is gone.
- **Nothing new broken.** No other line of the test changed; the assertions, the probe, the
  skip and the icon list are as reviewed above. `python -B .the-way/gate/run_tests.py
  tests/deploy`: exit 0, `Ran 64 tests in 110.834s`, `OK`, the word "skip" absent from the
  output; afterwards no container and no image named `loop2*` remain.
- Minor 3 was ruled outside this request by the coordinator; not re-judged.

**Verdict:** Yes, ready to merge. Both Minor issues are fixed and nothing new broke.

## Deliberate breaks of loop2-container-icons/1

- Invariant: "The loop2 container built from the repository serves each SVG file in
  `assets/icons/` at the path `/icons/<file name>`, with the same bytes as the file."
- Check: `tests/invariants/test_loop2_container_icons.py` at a44c9c3 (I did not write it). I
  wrote the breaks from the sentence and read the check only to learn how to run it.
- Where I ran it: a temporary detached worktree of a44c9c3 in the session scratchpad
  (`git worktree add --detach <scratch>/wt-icons a44c9c3`). The `.the-way` submodule was not
  initialised: the check does not need it. Each break was applied by a script, run, then undone
  (`git checkout -- .` plus `git clean` of the added files). The worktree was removed afterwards
  and pruned. No container or image named `loop2*` remains. `C:\Storage\repos\loop2-mag-w-lesie`
  was not modified.
- Command for each case, from `<worktree>/tests/invariants`:
  `python -B -m unittest -v test_loop2_container_icons`. Docker 29.7.2 answered, and no run was
  skipped (every run printed `Ran 1 test` with no skip).

| # | Change to the product (makes the sentence false) | Result | Why it failed (check's message) |
|---|---|---|---|
| B0 | none: unbroken | **pass** (exit 0, `OK`, 13.4 s) | — |
| C1 | control, sentence stays true: a new valid icon `oak leaf.svg` (space in the name) | **pass** (exit 0) | — (the percent-encoded path is served) |
| B1 | `Dockerfile`: line `COPY assets/icons/ assets/icons/` removed | **fail** | `docker build` failed: `ENOENT … scandir '/app/assets/icons/'` |
| B2 | `.dockerignore`: line `!assets/icons/` removed | **fail** | `docker build` failed: `"/assets/icons": not found` |
| B3 | new icon `oak.SVG` (upper-case extension), which `scripts/build.mjs` skips | **fail** | `GET /icons/oak.SVG … answers 404` |
| B4 | build appends a newline to `fern.svg` after copying it | **fail** | `GET /icons/fern.svg … answers 2735 bytes that differ from … (2734 bytes)` |
| B5 | build rewrites every icon's fill `#2b2b2b` → `#2b2b2c` (same length) | **fail** | all four icons: bytes differ with equal length (e.g. 2704 vs 2704) |
| B6 | server: `app.use('/icons', …404)` before the static files | **fail** | all four: `answers 404` |
| B7 | build copies icons to `dist/public/img/` (served under `/img/`, not `/icons/`) | **fail** | all four: `answers 404` |
| B8 | extra icon `oak.svg` added, with `.dockerignore` line `assets/icons/oak.svg`, so the image does not carry it | **fail** | `GET /icons/oak.svg … answers 404` |
| B9 | runtime stage: `RUN rm dist/public/icons/flax.svg` before `USER node` | **fail** | `GET /icons/flax.svg … answers 404` |
| B10 | server: a route for `/icons/fern.svg` that sends the file plus one space | **fail** | `2735 bytes that differ from … (2734 bytes)` |
| B11 | build writes names lower-cased; icon `Oak-Leaf.svg` added | **fail** | `GET /icons/Oak-Leaf.svg … answers 404` |
| B12 | build copies no icon; server answers every unknown path with `index.html` (status 200) | **fail** | all four: the page's 3573 bytes differ from the icon (status 200 passed, the byte comparison caught it) |

**Gaps (a break that should fail but passes): none.** All 12 breaks fail, each for the reason its
change predicts. The unbroken tree and the control both pass. B12 shows the check does not rely on
the status code alone. B5 shows it compares content, not just length. B3 shows it counts
upper-case `.SVG` files, so the build's case-sensitive rule cannot shrink the set unnoticed.

How the check reads the sentence, for the record (consistent with the sentence; no gap found):
"each SVG file" means each top-level file whose name ends in `.svg` in any letter case, read from
disk, so git-ignored files are included. "The same bytes as the file" means the working-tree
bytes.
