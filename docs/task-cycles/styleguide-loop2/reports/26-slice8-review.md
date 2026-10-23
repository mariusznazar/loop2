PASS 73b0563abee12f3973fcb8084c449c4e8c11ec8e

# Review 26 — slice 8: `npm run kitchen-sink` and the test that the build holds no page

- **Reviewed:** slice 8, range `7d6b39f16b1febe382088bb7497857f9e57286c8..73b0563abee12f3973fcb8084c449c4e8c11ec8e`
  (one commit, `73b0563`); `git rev-parse HEAD` of the worktree equals the head given.
- **Method:** `.the-way/task-cycle/review/SKILL.md` at the pinned `f0b2130` (gitlink and checkout agree).
- **Read:** handoff 26; `task.md`; `spec.md` (Decisions 1–9, 8a); `plan.md` (foundation table, pattern
  table, slice 8); `reports/25-slice8-report.md`; `cycle.md` questions table (QA-1..QA-4, R-n2, C6);
  `guidelines/coding.md` and `guidelines/styleguide-browser-view.md` whole (the range touches
  `build-tools` only; the styleguide is read for its rule "The kitchen-sink page", which cites the
  invariant this slice tests); decisions D-01–D-06, D-27–D-33, D-45, D-46 whole; invariants
  `application-build-kitchen-sink`, `application-build-output`, `application-package-layout`,
  `application-build-layout`, `account-server-occupied-address`, `loop2-container-icons`,
  `eslint-source-rules`, `ruff-source-rules`, `shellcheck-source-rules`, `prettier-source-format`,
  `introduced-npm-vulnerabilities`; part map `build-tools` and *External context*;
  `tests/invariants/loop2_invariant_support.py` (`listed_files`, `files_under`, `run`, `TreeCopy`);
  `Dockerfile`, `.dockerignore`, `tsconfig.browser.json`, `tsconfig.kitchen-sink.json`,
  `src/browser/kitchen-sink/index.html`; the screenshot `reports/shots/slice8/s8-01-kitchen-sink-1440.png`.

## Findings

### Critical

none

### Important

none

### Minor

**M1 — `tests/invariants/test_application_build_kitchen_sink.py:96-106`: the test does not see the
page's stylesheet in what `npm run build` writes.**
The marker stands only in `src/browser/kitchen-sink/index.html:6` and
`src/browser/kitchen-sink/kitchen-sink.ts:18`; `src/browser/kitchen-sink/kitchen-sink.css` carries
none. A build that copied that stylesheet into `dist/public/` would hold a file of the page and the
test would still pass. Evidence: in a scratch worktree of the head, `scripts/build.mjs` given an
extra `copyFile` of `src/browser/kitchen-sink/kitchen-sink.css` into `dist/public/kitchen-sink.css`;
`python -B -m unittest discover -s tests/invariants -p "test_application_build_kitchen_sink.py" -k
test_build_writes_no_file_of_the_page` exit 0 (reverted). The spec (Decision 4) puts the marker in
the HTML and the entry only, and the test's docstring names "copies of the page's code without its
marker" as not covered, so this is a known edge of the agreed design, not a missed requirement; no
code of the range copies that file today (`scripts/static-files.mjs:8-10` takes only `*.css`
directly in `src/browser/`). It matters only in that `README.md`'s new sentence „jej arkusz stylów
leży w `src/browser/kitchen-sink/`, poza arkuszami kopiowanymi do `dist/public`” is kept by review
alone. Cheap closing: a `/* loop2-kitchen-sink-page */` comment in `kitchen-sink.css` and
`dist/kitchen-sink/kitchen-sink.css` added to test 3's expected files.

**M2 — `tests/invariants/test_application_build_kitchen_sink.py:59-71, 126-133`: the "writes
nothing outside `dist/kitchen-sink/`" check sees files only.**
`tree_state` records files, so a directory created outside `dist/kitchen-sink/` with nothing in it
goes unseen, and `node_modules` of the copy is a junction to the real `node_modules`
(`loop2_invariant_support.py:158-163, 187-190`), so a write there would land in the real tree and is
left out of the comparison. No code of the range does either (the script's only writes are
`rm`/compile/copy into `dist/kitchen-sink/`, `scripts/kitchen-sink.mjs:19-32`). Broader coverage
that would be nice, not a defect.

### Out of scope

none graded.

## Declined to judge

- `scripts/kitchen-sink.mjs:36` serves any `Host` header (`curl -H "Host: evil.example"` → 200), so a
  page the developer visits could reach the kitchen-sink server through DNS rebinding — set aside:
  the server is bound to loopback, runs only on the developer's demand and serves only the
  repository's own public page, styles, fonts and icons, so nothing readable is secret; neither the
  task nor spec Decision 6 asks for a host check.
- `README.md:52` „gruby bursztynowy obrys na kafelku postaci” (executor's concern) — outside this
  slice's change; the sentence also stays true: `--character` is `#ffd230`, an amber yellow, at 4 px
  (`src/browser/tokens.css:35`, `:71`). The whole-change review may still weigh the wording against
  Q9's „żółty”.
- An image build of `Dockerfile` — no Docker daemon here (see Checks); judged by reading instead:
  `Dockerfile:7` copies `scripts/` whole and `.dockerignore` passes `scripts/`, so
  `scripts/static-files.mjs`, which `scripts/build.mjs` now imports, reaches the build stage; and the
  refactored build writes `dist/public/` byte for byte as the old one did (check 4).

## What was checked and how it came out

- **Against the task and spec.** To do 7 / Q13 / row 8 / D-45: own command `npm run kitchen-sink`
  (`package.json:12`) builds into `dist/kitchen-sink/` and serves locally; `npm run build` holds no
  page (check 1, check 4). Spec Decision 6: compile with the pinned TypeScript 7 compiler as
  `build.mjs` runs it (`scripts/kitchen-sink.mjs:11-25`); assembly of HTML, page stylesheet,
  `tokens.css`, `styles.css`, `fonts/`, `icons/` (check 2); `127.0.0.1`, port 0, address printed,
  browser launch failure swallowed (check 3); `--build-only` exits 0 without serving (check 2);
  compile failure exits before serving (`:24-25`, with `noEmitOnError` inherited from
  `tsconfig.browser.json`). Decision 7 / C6: one helper, `scripts/static-files.mjs`, used by both.
  Decision 8 row 15: the test runs in `TreeCopy`, cites `# invariant: application-build-kitchen-sink`
  in each of its three tests, and its positive control compiles the page in `npm test`. Nothing added
  beyond the slice: the extra probe test (game source importing the page's entry) is the risk spec
  Decision 4 names. `package-lock.json` unchanged (D-33).
- **Invariant test named:** new test `tests/invariants/test_application_build_kitchen_sink.py` for
  the new invariant `application-build-kitchen-sink`; no existing invariant test changed.
- **The test fails when the behaviour breaks:** the executor showed test 1 failing with
  `"exclude": []` in `tsconfig.browser.json` and test 3 failing on a type error and on a copy into
  `dist/public/`; test 2 shows the byte search finding compiled page code in `dist/public/`. Its
  expected values are literals, not computed by the code under test. Gaps: M1, M2.
- **Trust boundary `scripts/kitchen-sink.mjs` (QA-3):** address loopback only; served root
  `dist/kitchen-sink/`; path climbing refused in every encoding tried; writes only under
  `dist/kitchen-sink/` (check 3; check 1, test 3). The browser launch builds its command line from the
  fixed host and a numeric port only, so no input reaches `cmd /c start`.
- **Own-work check of the executor:** it named the browser launch, the path no test exercises; its
  scratch check (a launcher that does not exist) would catch a launch failure turned into an error.
  Repeated here (check 3) with the same result.
- **User interface (WAY-219):** the range changes no screen code; the screenshot shows the page,
  served by the new command, rendering slice 7's content with the game's fonts and roles.
- **Foundation:** D-29/D-32/D-30 — the new scripts pass ESLint and Prettier, the test passes Ruff
  (check 6); D-06 — `build.mjs` keeps its two configurations; D-27/D-46 — fonts and icons copied as
  before; part map — `scripts/kitchen-sink.mjs` and the test now exist, clearing their two pattern
  errors of the plan's table.

## Checks

All runs that write files ran in a temporary worktree of `73b0563` (`git worktree add --detach`,
`node_modules` as a junction to the task worktree's), removed afterwards; the reviewed worktree
stayed clean (`git status --short` empty, HEAD `73b0563`).

1. `python -B -m unittest discover -s tests/invariants -p "test_application_build_kitchen_sink.py" -v`
   — exit 0, 3 tests OK (4.3 s).
2. `npm run kitchen-sink -- --build-only` — exit 0; `dist/` holds only `kitchen-sink/` with
   `index.html`, `kitchen-sink.css`, `tokens.css`, `styles.css`, `fonts/`, `icons/`, `kitchen-sink/`,
   `sim/`, `view/`; `diff -r assets/fonts dist/kitchen-sink/fonts` exit 0; `diff -r assets/icons
   dist/kitchen-sink/icons` exit 0.
3. Serving mode, run as a scratch copy of `scripts/kitchen-sink.mjs` whose only change is the Windows
   launcher name replaced by a non-existent program (so no tab opened on this machine, and the failed
   launch path is exercised): printed `Kitchen-sink page: http://127.0.0.1:57496/ (Ctrl+C stops it)`;
   `netstat -ano` — listening on `127.0.0.1:57496` only; `curl` — `/`, `/kitchen-sink/kitchen-sink.js`,
   `/tokens.css`, `/fonts/OFL.txt` 200; `--path-as-is` `/../package.json`, `/%2e%2e/package.json`,
   `/%2e%2e/%2e%2e/package.json`, `/..%2fpackage.json`, `/..%5c..%5cpackage.json`,
   `/%5c..%5c..%5cpackage.json`, `/fonts/..%2f..%2f..%2fpackage.json`, `/C:/Windows/win.ini`,
   `/%00`, `//evil.example/`, `/.git` each 404; `/fonts` 301 to `/fonts/` on the same host;
   `Host: evil.example` 200. Process stopped (`Stop-Process`), port no longer listening.
4. Refactor of `scripts/build.mjs`: `rm -rf dist && npm run build` at the head — exit 0; the same
   with `scripts/build.mjs` of the base `7d6b39f` against the same sources — exit 0; `sha256sum` of
   every file of `dist/public/` (40 files) identical between the two (`diff` exit 0);
   `grep -rl "loop2-kitchen-sink-page" dist` exit 1 (no file).
5. Mutation for M1 (described there) — test 1 exit 0 with the page's stylesheet copied into
   `dist/public/`; reverted.
6. `node node_modules/eslint/bin/eslint.js --max-warnings 0 scripts/kitchen-sink.mjs
   scripts/static-files.mjs scripts/build.mjs` — exit 0; pinned Prettier `--check --no-config
   --no-editorconfig --ignore-path .gitignore` on the three scripts — they pass (the same run flags
   `package.json` only because its working copy in the scratch worktree is CRLF; the committed
   `package.json` passes, and JSON is outside D-32's scope); `ruff check --config ruff.toml
   --ignore-noqa tests/invariants/test_application_build_kitchen_sink.py` — exit 0.
7. `git diff --exit-code 00e53aee5bd21692ddd3b2f7c7541625a3114a3f -- package-lock.json` — exit 0;
   `git diff --stat 7d6b39f 73b0563 -- package-lock.json Dockerfile .dockerignore` — empty.
8. `python -B -m unittest discover -s tests/invariants -p "test_application_build_output.py"` —
   exit 0, 3 tests OK.
9. `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree, read only) — exit 1,
   one error, the expected one: `foundations/part_map.md:108: the pattern src/browser/AGENTS.md in
   the *Files* of agent-workflow matches no file git tracks`.

Not run:

- The full suite `npm test` — the cycle's own run before the request.
- `python -B .the-way/gate/run_tests.py tests/quality` — Ruff writes its cache into the tree it runs
  in and the scratch worktree had no `.the-way` or quality venv; replaced by check 6 on the changed
  files and check 7 for the audit's offline path. Unverified as a suite run.
- An image build and `tests/invariants/test_loop2_container_icons.py` — no Docker daemon in this run;
  see Declined to judge for the reading that stands in for it.
- Ctrl+C on the served command — not sent; the script installs no signal handler, so Node's default
  ends the process.
