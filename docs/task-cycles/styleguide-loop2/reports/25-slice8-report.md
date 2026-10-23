# Report 25 — slice 8: `npm run kitchen-sink` and the test that the build holds no page

- **Status:** done with concerns
- **Worktree / branch:** `C:\Storage\repos\loop2-wt\styleguide-loop2`, `task/styleguide-loop2`
- **Base:** `7d6b39f16b1febe382088bb7497857f9e57286c8`
- **Commit:** `73b0563abee12f3973fcb8084c449c4e8c11ec8e` — "feat: build and serve the kitchen-sink page
  locally with npm run kitchen-sink and test that npm run build holds none of it" (author
  `<private address>`). Not pushed.
- **Method:** `.the-way/task-cycle/change/SKILL.md` at the pinned `f0b2130` (gitlink and checkout
  agree), executor of a planned slice.

## Read

Handoff 25; `task.md`, `spec.md` (8a included), `plan.md` (foundation entries, slice 7, slice 8,
coverage, choices); `cycle.md` questions table; `reports/07-foundation-report.md` (identifier
`application-build-kitchen-sink`, test file name); `reports/24-slice7-review.md`. Parts touched:
`build-tools` only (`scripts/**`, `/package.json`, `README.md`, the new test). Guidelines selected by
`.the-way/product-guidelines/reading.md`: `guidelines/coding.md` whole (no kind row matches build
scripts — a kind D-28 defers). Decisions with *Scope* `build-tools` or named by the task, read whole:
D-01–D-06, D-27–D-33, D-45, D-46; invariants `application-build-output`,
`application-package-layout`, `application-build-layout`, `icon-file-content`, `icon-credits`,
`loop2-container-icons`, the four linter/format/audit invariants, `application-build-kitchen-sink`.
Code: `scripts/build.mjs`, `package.json`, `README.md`, `tsconfig.browser.json`,
`tsconfig.kitchen-sink.json`, `src/server/app.ts`, `src/server/main.ts`,
`src/browser/kitchen-sink/index.html` and the marker in `kitchen-sink.ts`,
`tests/invariants/loop2_invariant_support.py` (`listed_files`, `files_under`, `run`, `TreeCopy`,
`built_copy`), `tests/invariants/test_application_build_output.py`, `eslint.config.mjs`,
`.gitattributes`, `.gitignore`.

## Files changed

| File | + | − |
|---|---|---|
| `scripts/kitchen-sink.mjs` (new) | 68 | 0 |
| `scripts/static-files.mjs` (new) | 30 | 0 |
| `scripts/build.mjs` | 6 | 28 |
| `package.json` | 1 | 0 |
| `README.md` | 5 | 1 |
| `tests/invariants/test_application_build_kitchen_sink.py` (new) | 137 | 0 |

What each does:

- `scripts/static-files.mjs` — `copyStaticFiles(root, out)`: the stylesheets directly in
  `src/browser/`, `assets/fonts/*.woff2` and `OFL.txt` into `fonts/`, `assets/icons/*.svg` into
  `icons/` — the same filters `build.mjs` had (choice C6, spec Decision 7).
- `scripts/build.mjs` — keeps its two configurations and the copy of the game's `index.html`;
  the copy of CSS, fonts and icons goes through the helper. `dist/public/` holds the same entries as
  before (listing below).
- `scripts/kitchen-sink.mjs` — removes `dist/kitchen-sink/`, compiles `tsconfig.kitchen-sink.json`
  with `node_modules/typescript-compiler/bin/tsc` as `build.mjs` runs it (non-zero exit on a compile
  error, before anything is served), copies the page's `index.html` and `kitchen-sink.css` from
  `src/browser/kitchen-sink/` to the root of `dist/kitchen-sink/`, then the helper's files. With
  `--build-only` it ends there (exit 0). Otherwise `express.static(dist/kitchen-sink)` on
  `127.0.0.1`, port 0 (the system picks), prints `Kitchen-sink page: http://127.0.0.1:<port>/
  (Ctrl+C stops it)`, launches the default browser (`cmd /c start "" <url>` on Windows, `open` on
  macOS, `xdg-open` elsewhere; a spawn error is swallowed, the address stays printed) and runs until
  Ctrl+C. A listen error prints a message and sets exit code 1.
- `package.json` — script `"kitchen-sink": "node scripts/kitchen-sink.mjs"`. No dependency change.
- `README.md` — step 3: „arkuszy stylów leżących bezpośrednio w `src/browser/`” (slice 2 review
  Minor M1); new section „Strona wszystkich stanów” naming `npm run kitchen-sink`, `--build-only`,
  loopback and the system's port, that it writes only `dist/kitchen-sink/`, that `npm run build`
  holds none of it, and that its stylesheet stays outside what reaches `dist/public`.
- `tests/invariants/test_application_build_kitchen_sink.py` — three tests citing
  `# invariant: application-build-kitchen-sink`, marker `loop2-kitchen-sink-page` written out as a
  literal, each in a fresh `TreeCopy`:
  1. `npm run build` exits 0, writes `dist/public/index.html`, no file below `dist/` holds the
     marker (byte search), no `dist/kitchen-sink/`;
  2. made-up game module `src/browser/invariant_check_kitchen_sink_probe.ts` importing the page's
     entry — the risk spec Decision 4 names — then `npm run build`: the same search finds
     `dist/public/kitchen-sink/kitchen-sink.js`;
  3. positive control: `npm run kitchen-sink -- --build-only` exits 0 (timeout 180 s, so a command
     that ignores the flag fails instead of hanging the suite); the same search finds the marker in
     `dist/kitchen-sink/index.html` and in the compiled entry
     `dist/kitchen-sink/kitchen-sink/kitchen-sink.js`; no file of the copy outside
     `dist/kitchen-sink/` (node_modules left out) is added, changed or removed.

## Checks

Logs in `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\1d1a68d6-a4ef-4c40-a07f-c510f1f4e29e\scratchpad\s8-*.log`.

| Command | Exit | Result |
|---|---|---|
| `python -B -m unittest discover -s tests/invariants -p "test_application_build_kitchen_sink.py"` — test first, before any script | 1 | tests 1, 2 OK; test 3 fails at its exit-code assertion: `npm error Missing script: "kitchen-sink"` (the plan's expected failure) |
| same, `-k test_build_writes_no_file_of_the_page`, with `"exclude": []` in `tsconfig.browser.json` (invariant broken for a moment; file restored byte for byte, `git status` clean for it) | 1 | `['dist/public/kitchen-sink/kitchen-sink.js'] != []` — the invariant's test seen failing |
| same command after the code | 0 | 3 tests OK (4.2 s); rerun after the final build: 0, 3 OK |
| mutation: a type error appended to `kitchen-sink.ts` (reverted) | 1 | test 3: `error TS2322 …`, `npm run kitchen-sink -- --build-only` exits 1 — the page's compile is checked in `npm test` |
| mutation: `kitchen-sink.mjs` also copying into `dist/public/` (reverted) | 1 | test 3: files under `dist/public/` listed as written outside `dist/kitchen-sink/` |
| `npm run kitchen-sink -- --build-only` | 0 | `dist/kitchen-sink/`: `index.html`, `kitchen-sink.css`, `tokens.css`, `styles.css`, `fonts/` (4 woff2 + `OFL.txt`), `icons/` (4 svg), `kitchen-sink/kitchen-sink.js`, `sim/`, `view/controls/` |
| `npm run kitchen-sink` in the background | — | printed `Kitchen-sink page: http://127.0.0.1:53617/ (Ctrl+C stops it)` |
| `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:53617/` | 0 | `200`; `/kitchen-sink/kitchen-sink.js` 200; `/../package.json`, `--path-as-is /../../package.json`, `/%2e%2e/%2e%2e/package.json` each 404 (trust boundary: root kept to `dist/kitchen-sink/`) |
| `Get-NetTCPConnection -LocalPort 53617 -State Listen` | — | `LocalAddress 127.0.0.1` only (trust boundary: loopback) |
| process stopped (`Stop-Process` on the node process; its `cmd.exe` parent ended) | — | port no longer listening |
| Playwright at 1440×900 on the served page, full-page screenshot `reports/shots/slice8/s8-01-kitchen-sink-1440.png` | — | page renders as slice 7's: marker `<meta>` present; stylesheets `/tokens.css`, `/styles.css`, `/kitchen-sink.css` loaded; body `Geist, sans-serif`, Geist 400 and 500 loaded; 26 icon images; document 1425 px wide, no horizontal scroll; one console error: `/favicon.ico` 404 |
| `npm run build` (after `rm -rf dist`) | 0 | `dist/public`: `fonts/ icons/ index.html main.js sim/ styles.css tokens.css view/` — the same entries as before the refactor; no `dist/kitchen-sink/` |
| `diff -r assets/fonts dist/public/fonts` | 0 | identical |
| `diff -r assets/icons dist/public/icons` | 0 | identical (beyond the plan, for the refactored icon copy) |
| `grep -rl "loop2-kitchen-sink-page" dist/public` | 1 | no file |
| `git diff --exit-code 00e53aee5bd21692ddd3b2f7c7541625a3114a3f -- package-lock.json` | 0 | unchanged (D-33) |
| `python -B -m unittest discover -s tests/invariants -p "test_application_build_output.py"` | 0 | 3 tests OK |
| `python -B -m unittest discover -s tests/invariants -p "test_loop2_one_serving_process.py"` (uses the built copy) | 0 | 5 tests OK |
| `node --test "tests/view/*.test.mjs"` (after the build) | 0 | pass |
| `python -B .the-way/gate/run_tests.py tests/quality` | 0 | 27 tests OK |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 scripts/kitchen-sink.mjs scripts/static-files.mjs scripts/build.mjs` | 0 | — |
| pinned Prettier `--check --no-config --no-editorconfig --ignore-path .gitignore` on the three scripts | 0 | formatted |
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa tests/invariants/test_application_build_kitchen_sink.py` | 0 | — |
| `python -B .the-way/elements/common/foundation_check.py` (after the commit) | 1 | 1 error, the expected one: `foundations/part_map.md:108: the pattern src/browser/AGENTS.md in the *Files* of agent-workflow matches no file git tracks` |

Not run:

- `npm test` — the cycle's full run before the request.
- `tests/invariants/test_loop2_container_icons.py` and any image build — they need Docker; the
  refactor of `build.mjs` copies the same icon and font sets (`diff -r` above), and `Dockerfile` is
  unchanged.
- The default-browser launch was issued on this machine during the server check (`cmd /c start`)
  but not observed; a tab may have opened in Mariusz's browser. Its failure path was checked (own-work
  check below).

## Own-work check (section 3)

- **Requirement most likely not met:** "opens the default browser (a failed launch is no error)"
  (spec Decision 6) — the launch path no test exercises.
- **Check:** scratch edit making the launcher a non-existent program
  (`no-such-browser-launcher`), `node scripts/kitchen-sink.mjs` in the background, then `curl`.
- **Result:** the address was printed (`http://127.0.0.1:59516/`), `curl` gave `200` two seconds
  after the failed spawn; the process kept serving until stopped. Edit reverted (file restored from
  copy, the `"cmd"` line back).
- **User interface (WAY-219):** no screen code changed; the page served by the new command was
  inspected in the screenshot above at 1440 px.

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| `kitchen-sink.mjs` removes `dist/kitchen-sink/` before compiling, so a module deleted from the page or the game does not linger in the served page | assembling over the old output | none outside `dist/kitchen-sink/`; a developer's hand edits there are lost on the next run |
| The game's `index.html` and the page's `index.html`/`kitchen-sink.css` are copied by each script, not by the helper; the helper holds only what both take (CSS, fonts, icons) | the helper taking an HTML source argument | none in behaviour |
| Printed line in English (`Kitchen-sink page: … (Ctrl+C stops it)`), as `src/server/main.ts` prints `Loop: http://…` | Polish, as the README | wording of one console line |
| Test 2, a made-up game module importing the page's entry, beyond the plan's two runs — spec Decision 8 asks each test to show on made-up input that it can fail, and Decision 4 names this exact path | relying on the positive control alone (it shows the marker in the page's own output, not that the build's search would find page code there) | one more `npm run build` in a copy (~1.5 s here) |
| Test 3 also asserts the command changes nothing outside `dist/kitchen-sink/` (spec Decision 6, trust boundary QA-3), by size and modification time of every file of the copy outside `node_modules` | leaving that to review | a false failure if some tool touched another file of the copy; none seen |
| Test 3 asserts the marker in the compiled entry too, so test 1's search of compiled code is known to see the constant | the HTML alone | none |

No adaptation of section 4: the plan's files, commands and names matched the code.

## Problems and concerns

- A tab may have opened in the default browser on this machine during the server check (the
  command's own behaviour; the plan asks for that run).
- The positive control takes `npm run kitchen-sink -- --build-only` as the only compile of the page
  in `npm test` (review 24): verified by the type-error mutation above.
- `README.md`'s „Panel terenu” paragraph still says „gruby bursztynowy obrys” for the character
  outline, now `#ffd230` (Q9 calls it „żółty”/obrys postaci). Not this slice's goal; left as is —
  noted for the request or slice 9's review.
