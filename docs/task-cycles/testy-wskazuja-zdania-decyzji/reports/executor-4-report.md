# Report — executor of slice 4 (server runtime, build and address decisions)

**Status:** done with concerns. The concerns are judgments for the reviewer and the human. They are listed under "Concerns" and "Remarks for the human (R3)". Nothing blocks.

## Commits (base `7ee18d26daf31aa284c1b7481b32e386fe392efa`)

- `ef443684` test: :white_check_mark: mark the tests that hold the sentences of the decisions on the server's runtime, the build of browser and server, the port a test gives the server and the release check of the image with lines decision:
- `60cd36c8` docs: :memo: name the tests of D-02, D-06, D-49 and D-237, and add or rewrite a pair of examples for D-06, D-49 and D-237 only for the part no invariant and no test holds

Author address checked after the first commit with `git log -1 --format="%h %ae"`: `mariusznn@gmail.com`.

## Files changed (`git diff --numstat 7ee18d26..60cd36c8`)

| File | Added | Removed |
|---|---|---|
| foundations/decisions.md | 16 | 8 |
| tests/account-database-check.test.mjs | 4 | 0 |
| tests/invariants/test_account_save_sqlite_upgrade.py | 1 | 0 |
| tests/invariants/test_account_server_runtime.py | 3 | 0 |
| tests/invariants/test_application_build_output.py | 1 | 0 |
| tests/invariants/test_simulation_type_check.py | 3 | 0 |
| tests/quality/test_invariant_support.py | 2 | 0 |

Files outside the slice's *Change* (item 5), one line each:
- `tests/quality/test_invariant_support.py` (build-tools): D-49 lines.
- `tests/invariants/test_simulation_type_check.py` (build-tools): D-06 lines. Slice 2's D-393 line in this file was left as it was.
- `tests/invariants/test_application_build_output.py` (build-tools): a D-06 line.
- `tests/invariants/test_account_save_sqlite_upgrade.py` (deployment): a D-237 line.

None of these files is browser-view, so no styleguide applied. Each file's focused test was run (below).

Files in the *Change* that got no line, by R1 (see "Choices" 1 and 2):
- `tests/invariants/test_account_server_express_http.py`
- `tests/invariants/test_loop2_one_serving_process.py`
- `tests/invariants/test_application_package_layout.py`
- `tests/deploy/test_loop2_image_icons.py`

No test's code, name or assertion changed, and no mention of a decision number was removed. In the log, only the *Verification* fields of D-02, D-06, D-49 and D-237 changed. D-01, D-05 and D-108 were not touched.

## Checks run

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after the edits, before the commits) | 0 | `0 errors`; 11 decisions listed as `held by nothing`, none of D-01, D-02, D-05, D-06, D-49, D-108, D-237 |
| `python -B .the-way/elements/common/foundation_check.py` (on `60cd36c8`) | 0 | `0 errors`; 11 listed, none of the slice's seven |
| `git diff -U0 7ee18d26 -- foundations/decisions.md`, read | 0 | 4 hunks, at base lines 25 (D-02), 199 (D-06), 1140-1142 (D-49) and 5099-5101 (D-237). Each lies in the *Verification* field of its decision. |
| `git diff --check` | 0 | no whitespace problem |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/account-database-check.test.mjs` | 0 | "All matched files use Prettier code style!" |
| `npm test -- tests/invariants/test_account_server_runtime.py` | 0 | Ran 5, OK. See the note below this table. |
| `npm test -- tests/invariants/test_account_server_runtime.py` (re-run on the corrected file) | 0 | Ran 5, OK |
| `npm test -- tests/quality/test_invariant_support.py` | 0 | Ran 13, OK |
| `npm test -- tests/invariants/test_application_package_layout.py` (unchanged; the *Checks* name it) | 0 | Ran 2, OK |
| `npm test -- tests/invariants/test_account_save_sqlite_upgrade.py` | 0 | Ran 2, OK |
| `npm test -- tests/account-database-check.test.mjs` | 0 | tests 8, pass 8, fail 0, skipped 0 |
| `npm test -- tests/invariants/test_simulation_type_check.py` | 0 | Ran 4, OK |
| `npm test -- tests/invariants/test_application_build_output.py` | 0 | Ran 7, OK |
| `npm test -- tests/invariants/test_account_server_express_http.py` (unchanged; the *Checks* name it) | 0 | Ran 7, OK |
| `npm test -- tests/invariants/test_loop2_one_serving_process.py` (unchanged; the *Checks* name it) | 0 | Ran 5, OK |
| `npm test -- tests/deploy/test_loop2_image_icons.py` (unchanged; the *Checks* name it) | 0 | Ran 1, OK. The image was really built and run; the test removed its container and image. |

Note on the first runtime run: one of my edits had dropped the space in `root_entry = load_json(` at line 66, which left `=load_json(`. The code was still valid, so the first run passed. `git diff --numstat` showed 1 removed line, so I restored the space and re-ran the file (second row). The commit holds only added lines, with no removed line in `tests/`.

Not run:
- The full gate, which a slice does not run.
- Ruff on the changed Python files: no local Ruff exists. `test_ruff_source_rules` fails at the base with `FileNotFoundError`. The long comment lines match earlier slices, and `ruff.toml` selects no line-length rule (slice 2's report).

No test was written first and no invariant test changed in behaviour: the slice adds comment lines only. So no failing run applies.

## Own-work check

- **Requirement most likely missed:** item 3: every test that holds a sentence of the seven decisions carries a line. A test that cites no number is the risk.
- **Check:** I searched all of `tests/` by the content of the sentences, not only by the numbers:
  - `LOOP2_LISTEN_PORT`, `free_port`, `freePort`, "names free";
  - `account-database-check`, `LOOP2_COMMIT`, `cache`, `unpinned`, `digest`, `node:24`;
  - `Express`, "Not found", `text/html`, "relative";
  - the invariant identifiers of the seven decisions;
  - `tsconfig.sim`, `noEmit`, `REACT`.

  I then listed every case of the six changed files with the lines above it (`grep -n "def test_\|^test(\|# decision:"`), and judged again each case left without a line.
- **What it showed:** the cases that hold something no invariant derived from the decision states are the ones with lines. The search found these other candidates; each was judged and left without a line, with its reason:
  - `tests/http.test.mjs:138` "API keeps its JSON error …": holds D-05 sentence 2, which `loop2-api-error-route` states (R1).
  - `tests/account-api.test.mjs:140`, `:656`: hold D-108 sentence 2 in part. That sentence is stated by `loop2-shared-public-origin`, and `:140` is a test of `account-client-requests`, which names D-108 in *Derives from* (R1).
  - `tests/startup.test.mjs` (its own `freePort`): it follows D-49, it does not check it.
  - `tests/invariants/test_account_server_default_address.py:44`: it is the exception D-49 sentence 2 names, but it fails on no second test of the default address.
  - `tests/deploy/test_loop2_deploy_build.py`: it checks that a failed build stops the deployment. That belongs to the rationale and to D-229, not to D-237's sentence.
  - `tests/invariants/test_account_save_sqlite_upgrade.py:109`: the control of the reader. It fails when the reader breaks, not when the Dockerfile breaks D-237.
  - `tests/invariants/test_simulation_type_check.py:79`: it runs `npm run typecheck`, not the build that D-06 names.

## Rows per decision (item 6)

### D-01 — what runs the server
- **Held by tests:** none beyond its invariants (R1).
- **Held by invariants:**
  - sentence 1 whole: TypeScript source, Node.js 24 in the declarations and the deployment (`account-server-runtime`);
  - sentence 2 whole (`account-server-typecheck`).

  "LTS" is a property of Node.js 24, not a separate requirement.
- **Held by nothing:** nothing.
- **Verification:** unchanged.

### D-02 — Express 5 on Node.js 24
- **Held by tests, in part:** sentence 1, "on Node.js 24". The cases:
  - `tests/invariants/test_account_server_runtime.py:55` `test_package_engines_admit_only_node_24`;
  - `:63` `test_lockfile_root_engines_admit_only_node_24`;
  - `:202` `test_deployment_files_name_only_node_24`.

  These are tests of `account-server-runtime`, an invariant of D-01, not of D-02, so R1 does not bar the line (slice 1's precedent, D-28 lines on eslint tests).
- **Held by invariants:** sentence 1: Express 5 routing and handling the HTTP routes and responses (`account-server-express-http`).
- **Held by nothing:** nothing.
- **Verification:** `tests:` added; no pair at the base and none needed.

### D-05 — one serving process in the container
- **Held by tests:** none beyond its invariants (R1). `tests/deploy/test_loop2_image_icons.py:90` holds part of sentence 1: the container serves the built game's files. It gets no line, by R1 applied to a test with no `invariant:` line, as slice 2 did (see "Choices" 2).
- **Held by invariants:**
  - sentence 1 whole (`loop2-one-serving-process`);
  - sentence 2 whole (`loop2-api-error-route`).
- **Held by nothing:** nothing.
- **Verification:** unchanged.

### D-06 — how browser and server are built
- **Held by tests, in part (sentence 2):**
  - the build type-checks the simulation's files under a configuration of their own: `tests/invariants/test_simulation_type_check.py:97` `test_build_refuses_it_too_and_leaves_nothing_to_serve`;
  - that configuration takes every file of the simulation: `:120` `test_the_configuration_takes_every_typescript_file_of_the_simulation`;
  - it writes nothing beside the sources: `:108` `test_the_build_writes_nothing_beside_the_sources_of_the_simulation`;
  - React joined into the one script of `dist/public`, the files the server hands out: `tests/invariants/test_application_build_output.py:273` `test_the_page_loads_one_file_that_joins_the_browsers_code`. Its invariant `application-build-output` does not say "React included", so R1 gives the line.
- **Held by invariants:**
  - sentence 1 whole (`application-package-layout`, `application-build-layout`);
  - sentence 2: compiling the browser and server configurations and bundling the browser's code into the file the page loads (`application-build-output`);
  - the simulation part also by `simulation-type-check` (an invariant of D-393).
- **Held by nothing:** "emits nothing" where the simulation's configuration emits outside the sources. An `outDir` in `tsconfig.sim.json` fails no test.
- **Verification:** `tests:` added; pair added (R2).

### D-49 — the port a test gives the server
- **Held by tests, in part:** sentence 1, for the starts of the shared server helper. The helper gives the server, in `LOOP2_LISTEN_PORT`, the port its probe names at that start, and another one when a start whose port was taken runs once more. The cases:
  - `tests/quality/test_invariant_support.py:126` `test_start_gives_the_server_a_free_port_on_127_0_0_1`;
  - `:137` `test_start_whose_port_was_taken_runs_once_more_on_another_port`.
- **Held by invariants:** none.
- **Held by nothing:**
  - sentence 1 for starts outside the helper, such as the own `freePort` of `tests/startup.test.mjs`;
  - that the probe (`free_port`) asks the system: it is replaced in both cases;
  - sentence 2 (one test of the default address);
  - sentence 3 (the cases left outside the rule).
- **Verification:** `tests:` added; pair rewritten.

### D-108 — the shared public address
- **Held by tests:** none beyond the invariants (R1; see "Remarks for the human" 1).
- **Held by invariants:** sentences 1 and 2 whole (`loop2-shared-public-origin`, method review). "At loop2's address" is the origin at which the game is loaded, which the invariant names.
- **Held by nothing:** nothing.
- **Verification:** unchanged.

### D-237 — the release check in the image build
- **Held by tests, in part (sentence 1):**
  - a step of its own in the final stage, after the server's user is set, whose failure stops the build: `tests/invariants/test_account_save_sqlite_upgrade.py:104` `test_dockerfile_runs_the_check_in_the_last_stage_after_dist_and_user`;
  - a temporary database that leaves no file, and the release printed: `tests/account-database-check.test.mjs:63` "the check passes on this Node.js, prints the release it checked and leaves no file";
  - an error fails the check and claims no release: `:75` "the check fails when its temporary directory cannot be written";
  - the server's database code and `backup()` of `node:sqlite` reached (the method of D-236): `:92` "the check passes under the pass-through stand-in, which it reached";
  - each difference fails (an empty backup, another hash, another saved game state), as do a backup in two steps (one step) and an error of the release (a refused rate): `:111` "the check fails on ${name}", five named variants.
- **Held by invariants:** none derived from D-237. `account-save-sqlite-upgrade` derives from D-229, so R1 does not bar the lines on its tests.
- **Held by nothing:**
  - sentence 2 (the image stays unpinned);
  - reading back the database it wrote before the backup;
  - working on no database but the temporary one.
- **Verification:** `tests:` added; pair rewritten.

## Pairs added or rewritten, for the human to accept at the merge

**D-06** (added by R2; lead-in "An agent compares a change with the part no invariant and no test holds:")
- complies: `tsconfig.sim.json` keeping `noEmit`, the simulation compiled for the page by the browser's configuration alone
- violates: the simulation's configuration given an output directory of its own, so that building the application writes a compiled copy of the simulation there

**D-49** (rewritten; lead-in "An agent compares a change with the part no test holds:")
- complies: a new test that starts the built server through the shared server helper of the invariant tests, or that asks the system for a free port at each start of its own and gives it to the server in `LOOP2_LISTEN_PORT`; a test that gives `LOOP2_LISTEN_PORT` a value the server refuses before it listens; a server started inside a container a test runs, on the port the container names;
- violates: a test that starts the server with `LOOP2_LISTEN_PORT=3000` or another port written into the test; a probe of a free port in the shared helper that picks a port itself instead of asking the system for one; a second test that starts the server without `LOOP2_LISTEN_HOST` and `LOOP2_LISTEN_PORT`.

The old `complies:` described the helper's behaviour, which the tests now hold. The new one adds the cases of sentence 3. The new `violates:` adds the probe.

**D-237** (rewritten; lead-in "An agent compares a change with the part no test holds:")
- complies: the final stage built on a Node.js image named by its major version alone, such as `node:24-slim`, so that each build takes the release the host pulls; a release check that reads back what it wrote before it makes the backup, and works on no database but the temporary one it makes
- violates: a base image pinned by version and digest while this entry stands; a release check that reads the server's database, or that compares only the backup and no longer reads back the database it wrote

Removed from the old pair:
- "a release check moved out of the image's build into the deploy script": `:104` now holds it.
- "a release that fails the build step ends the deployment at the build …" and "a build of the same commit that takes the step from its cache …": they speak of the deployment and of Docker's cache, which belong to the rationale and D-229, not to a part of D-237's sentences.

The `tests:` clauses added (D-02, D-06, D-49, D-237) stand in `foundations/decisions.md` at each decision's *Verification*.

## Choices, with the way rejected

1. **R1 kept lines off the tests of an invariant derived from the same decision.**
   - What it covered: `test_account_server_express_http.py`, `test_loop2_one_serving_process.py`, `test_application_package_layout.py`, the tests of `account-server-typecheck`, `test_loop2_api_error_route.py` and `test_loop2_one_serving_process_container.py`.
   - Lines were given only where the test holds a part its own invariant does not state (D-06 at `:273`), or where the invariant derives from another decision (D-02 on the runtime tests; D-06 on the simulation type check; D-237 on the tests of `account-save-sqlite-upgrade`).
   - Rejected: no line on any invariant test.
   - Cost if wrong: the 11 lines on invariant tests go, along with the `tests:` clauses of D-02 and of D-06's simulation part.
2. **R1 applied to `tests/deploy/test_loop2_image_icons.py`, a test with no `invariant:` line.**
   - What it holds of D-05 (the container serves the built game's files) is what `loop2-one-serving-process` states, so it got no line, as slice 2 did for `test_docker_gate.py:112`.
   - Rejected: a D-05 line there and a `tests:` clause in D-05 that repeats its invariant.
   - Cost if wrong: one line and one clause.
3. **D-02's lines on the runtime tests.**
   - "On Node.js 24" restates D-01, but a test that fails when the server moves to another Node.js holds that part of D-02's sentence, and no invariant of D-02 states it.
   - I marked the engines (package and lockfile) and the deployment files, not the `@types/node` cases, which concern the types of the source, not the release it runs on.
   - Rejected: no D-02 line, leaving the part to the invariant of D-01.
   - Cost if wrong: three lines and one clause.
4. **Quotations run from the sentence's start to the end of the held part.** Where the held part is the last clause (D-237's "any difference or error fails the image's build", D-06's "React included"), the whole sentence is quoted, as earlier slices did.
5. **Place of the lines:** inside the case's body, after any `invariant:` line, as slices 2 and 3 did.

## Mismatches with the plan (small, adapted)

- The *Change* names four test files that by R1 got no line. It does not name the four files reached under item 5.
- The *Checks* run `npm test -- <file>` for the unchanged files of the *Change* as well. I ran them, the Docker image test included.

## Concerns

1. D-06's pair speaks of a thin part: an `outDir` in the simulation's configuration. R2 asks for it all the same.
2. D-49 sentence 1 is held for the shared helper only. The tests replace `free_port`, so that the probe asks the system for a port is held by nothing. The pair names it.

## Remarks for the human (R3; nothing changed)

1. **D-108's *Verification* names only `loop2-shared-public-origin`.** The invariant `account-client-requests` (`foundations/invariants.md`, "Derives from: D-108 · D-117") also derives from it, but the field does not name it. *Verification*'s `invariants:` was to stay as it stands, so I left it.
2. **The docstring of `tests/deploy/test_loop2_image_icons.py` cites D-05 among its sources ("(D-27, D-05, D-14)").** Per choice 2 the test carries no D-05 line, and the mention stays.
3. **D-237's *Rationale* and the old pair speak of the deployment ending at the build and of Docker's cache.** No sentence of D-237 states either. D-229 and `tests/deploy/test_loop2_deploy_build.py` (exit 7, no `up`) cover the first.

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/slice.md`: the method's row for a slice names it.
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/task-frozen.md`: read whole, beyond its three passages. Nothing outside them changed what I did.
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/executor-1-report.md` (whole) and the R1 passages of `executor-2-report.md` and `executor-3-report.md`: for the form and precedents earlier slices set.
- `foundations/invariants.md`: the entries `account-save-sqlite-upgrade`, `simulation-type-check` and `account-client-requests`, to read their *Derives from* for R1.
- `foundations/decisions.md` D-236: to judge "by the method of D-236".
- Read to judge what each candidate test fails on:
  - test files: `tests/quality/test_invariant_support.py`, `tests/invariants/test_simulation_type_check.py`, `tests/invariants/test_application_build_output.py`, `tests/invariants/test_account_save_sqlite_upgrade.py`, `tests/account-database-check-standin.mjs`, `tests/account-api.test.mjs:1-200`, `tests/http.test.mjs:125-170`;
  - helpers and product code: `tests/invariants/loop2_invariant_support.py:20-38` and `:265-354`, `src/server/account-database-check.ts`, `tsconfig.sim.json`, the `RUN`, `FROM` and `USER` lines of `Dockerfile`, the build and start lines of `package.json`, the sim lines of `scripts/build.mjs`.

## Working copies

`.runs/executor-4/` held:
- the outputs of the foundation check (`fc.txt`, `fc2.txt`);
- the log of each focused run;
- `exits.txt` with each run's exit code.

I removed it before returning. I made no worktree, clone or script.

`tests/deploy/test_loop2_image_icons.py` built and ran a container itself (a product test's own resource) and removed both. Afterwards no container `loop2-image-icons-check-*` remains. One image `loop2-image-icons-check:cf492fe1b4fa` (`6b05d3e647a5`) remains, created "2 weeks ago", so not by this run, whose image was `sha256:667b4702…`. I left it, since it is not mine.

## Unread material

- `.the-way/elements/decisions/template.md`: read 105-264, which covers the *Read*'s 111-127, 162-166 and 220-260; the rest not read.
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md`: not opened. Its passages come word for word in the handoff.
- `guidelines/testing.md`: read whole, in two pages.
- Everything else the dispatch names: read whole.

## Searches not found or unclear

- No test checks that the Node.js base image stays unpinned (searched `unpinned`, `digest`, `node:24`, `sha256` in `tests/`). `test_deployment_files_name_only_node_24` accepts a pinned tag of major 24.
- No test checks that every test that starts the server uses a free port. There is no scan for a fixed `LOOP2_LISTEN_PORT`.
- No test checks that `tsconfig.sim.json` emits nowhere at all; one test checks only that nothing is written beside the sources.
- Unclear: whether R1 covers a test of another invariant that states the same part, such as `account-api.test.mjs` for D-108 sentence 2, held by the review-method `loop2-shared-public-origin`. I read R1 as being about the part stated, so no line.
