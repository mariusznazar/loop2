# Report — Slice 3, task `logowanie-w-react`

**Status:** done with concerns

The concerns are three things left for the cycle to read, none of which stops the slice: a sentence of the spec that does not pass my reckoning (the define), two wide checks that overlap the method's rule on the full suite, and one gap in an existing guard. All stand below.

## Files and commits

Base 35371e04171e6c72e15108ebd4808184c3b84c36. Whole slice: 82 files, +387 −293.

| Commit | What |
|---|---|
| `09c99ee09c29cb2115ffc12d5d4ed0d74af18fdb` | The one replacement, run once: 78 files, 282 lines, +282 −282. Nothing else in it. |
| `13f91f8eb490917e8a002bc62f7e62f158ea2ca4` | Build, config, hand edits, new cases, Prettier's rewrap of one file. |
| `9df8f0233eea1d5e430811999eedba9ddc661a90` | One comment of `scripts/build.mjs`. |

By hand, added and removed against the base (the last three also hold lines of the replacement):

- `scripts/build.mjs` +21 −2
- `tsconfig.browser.json` +3 −2
- `tests/invariants/test_application_build_output.py` +75 −4
- `tests/invariants/test_application_build_kitchen_sink.py` +1 −1
- `tests/invariants/test_icon_credits.py` +3 −3 (constant +1 −1)
- `tests/invariants/test_terrain_drawing_numbers.py` +5 −5 (constant +1 −1)
- `tests/sim/data.test.mjs` +21 −18 (replacement +18 −18, Prettier +3 −0 net, see Choices)

Unchanged, as the slice says: `BUILT_PAGE` in `test_browser_view_framework.py` and `test_loop2_api_error_route.py`, `BUILT_GAME`, `GAME_PAGE`, `tests/http.test.mjs:26` and `:30`, `scripts/kitchen-sink.mjs`, `tsconfig.kitchen-sink.json`, `Dockerfile`, `.dockerignore`, `stryker.config.json`, `src/server/`, `eslint.config.mjs`, `src/browser/index.html`.

## Checks

Failing runs, written first, on the base's build:

| Command | Exit | Showed |
|---|---|---|
| `npm test -- tests/invariants/test_application_build_output.py` | 1 | `test_the_page_loads_one_file_that_joins_the_browsers_code`: `['./view/app.js', './invariant_check_build_probe.js'] != []`. `test_a_build_leaves_nothing_of_an_earlier_build`: left `dist/public/…` and `dist/browser/…`. Three failures on assertions, 5 tests. |

The same command, after the change, is the first row below: exit 0. That is the failing and the passing run of the invariant `application-build-output` (row F20).

The slice's *Checks*, run on the working tree of `13f91f8` unless noted:

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/invariants/test_application_build_output.py` | 0 | 5 tests, OK |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 | 3 tests, OK |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 | 6 tests, OK |
| `npm run typecheck` | 0 | |
| `npm run build` | 0 | also exit 0 on `9df8f02` |
| `node --test tests/*.test.mjs tests/sim/*.test.mjs tests/view/*.test.mjs` | 0 | 1204 tests, 1204 pass, 0 skipped |
| `python -B -m unittest discover -s tests/invariants -p "test_*.py"` | 0 | 235 tests, OK, none skipped |
| `git grep -n -E "dist/public/(sim\|view\|account-api)" -- tests` | 1 | finds nothing, as asked |
| `npm run kitchen-sink -- --build-only` | 0 | |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests, OK; run again on the comment's change, exit 0 |

Further checks of mine:

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |
| Mutation: the removal also under `--check`; `python -B -m unittest test_application_build_output.BuildCompilesBothConfigurations.test_a_build_leaves_nothing_of_an_earlier_build` in `tests/invariants` | 1 | `npm run typecheck … removed dist/public/…` and `dist/browser/…`; restored |
| Mutation: `bundle: false`; the same way, `…test_the_page_loads_one_file_that_joins_the_browsers_code` | 1 | `['./view/app.js', './invariant_check_build_probe.js'] != []`; restored |
| Both cases on the restored `scripts/build.mjs` | 0 | OK |

Did not run: `npm test` (the product gate, the orchestrator's); `tests/deploy`, `tests/agent_workflow` and the other files of `tests/quality`, which the slice's *Checks* do not name; Stryker on `src/browser/sim/`, the reviewer's by the testing guidelines.

## Own-work check

Requirement most likely unmet, To do 10: that what the build now writes works for a player and that the image builds the same way. No test in this repository loads the bundle in a browser, and the build runs esbuild on Linux in the image for the first time.

- Browser: `npm run local`, a real Chromium through Playwright. The page fetched one script, `200 /main.js`, and `GET /view/app.js` answered 404, so no compiled module is served. A new account made through the form reached the game screen: „Plan wyprawy”, „Siedziba”, „Drużyna”, „Skrzynka 0/60” at positive widths, the program selector, the footer's credits. After a reload, zero page errors and zero console errors. On the signed-out page the only two console errors were the expected 401 of `/api/account` and a 404, the latter seen as `/favicon.ico` on the earlier run; neither comes from the bundle.
- Image: `docker build --progress=plain -t loop2-slice3-check .` at `9df8f02`, exit 0, so `npm ci`, `npm run typecheck` and `npm run build` ran on Linux with the `Dockerfile` unchanged. `docker run --rm --entrypoint sh loop2-slice3-check -c '…'`, exit 0: `dist/public` holds one JavaScript file, `main.js`, of 133,185 bytes, the same size as on Windows. The image is removed. `package-lock.json` holds 26 esbuild platform packages, `@esbuild/linux-x64` at line 1123. `tests/deploy/test_loop2_image_icons.py` did not run.
- What this does not show: the bundle holds no React yet, so React's code has not run in a browser from the product's own page. Slice 11 brings that.

## Reaches beyond the dispatch

- `.runs/task-cycles/logowanie-w-react/plan.md`: a search for `F20`, `EMITTED_EXTENSION`, `README` and `SOURCE_EXTENSIONS`, since the section says „the invariant of row F20” without its text and Decision 4 names `.tsx` in `EMITTED_EXTENSION`. It showed F20 is `application-build-output`, and that `.tsx` belongs to Slice 7 and the README to Slice 13.
- `tests/invariants/test_browser_view_framework.py`, whole, to see how the guard reads specifiers before writing mine.
- `src/browser/AGENTS.md`, `src/browser/main.ts`, `scripts/kitchen-sink.mjs`, `tsconfig.kitchen-sink.json`, the top of `tests/invariants/loop2_invariant_support.py`: what the probe and the config rest on.
- `reports/gate-base.log`: the base's test count, to size the run.
- The user's own rules on scripts and git, and the Playwright playbook, as those instructions require.

## Searches not found or unclear

- Spec, Decision 4: „esbuild would otherwise leave React in development mode”. Not so at `minify: true`: esbuild 0.28.2 bundling `react-dom/client` with the same options and no `define` left 0 `process.env` and no development build. The `define` stands as the slice says; it binds only if minifying is ever turned off in part. I wrote the comment in `scripts/build.mjs` to say that, and no test can fail by its removal, which is equivalent today.
- README's step at `:25` still describes the build without the bundle. Slice 13 owns it, and the file is outside this slice's *Change*.

## Choices

- **Two commits for the paths and the build, against one.** The replacement alone in `09c99ee` lets a reader verify that no line it wrote was edited by hand. Cost: that commit does not pass the tests alone; `13f91f8` follows it.
- **Prettier on `tests/sim/data.test.mjs`.** The replacement adds one character, and three lines of 80 passed the width. `prettier-source-format` would fail, while the slice says no line the replacement writes is edited by hand. I ran `prettier --write` on that file alone, so a tool wrote them, in `13f91f8`. Rejected: leaving them, which breaks the quality check. Cost if wrong: three rewrapped statements, no meaning changed.
- **How the bundle's case proves bundling** (left to the maker). The case adds to a temporary copy a module that `main.ts` imports and that imports `react` and `react-dom/client`, since no React is on the page yet. It then reads the built page's one script and asserts: no module specifier left, the probe's marker and `__REACT_DEVTOOLS_GLOBAL_HOOK__` inside, no `process.env`, and no other JavaScript in `dist/public`. Rejected: reading the unchanged tree, which proves nothing about React until Slice 11. `__REACT_DEVTOOLS_GLOBAL_HOOK__` is React's own name: a React that stops using it fails this case loudly.
- **A second case, not named by the slice:** `test_a_build_leaves_nothing_of_an_earlier_build` for the removal, and that `npm run typecheck` removes nothing. The slice sets the rule and `--check`'s exemption, and neither had a test. It cites D-266 and no invariant, as D-266 is verified by an agent's comparison. Cost: one more build and one more typecheck in the gate.
- **Not tested:** that the bundle is minified and its target. These are choices, and only a deliberate decision could fail such a test; the docstring says so.
- **`mkdir` left `scripts/build.mjs`:** esbuild creates `dist/public/`, and the static copy follows it.
- **`.tsx` in `EMITTED_EXTENSION`:** left to Slice 7 as the plan divides it, though Decision 4's table names it. Until then `test_build_emits_every_source_file_of_both_configurations` would not see a `.tsx` file; none exists.

No adaptation of the plan was needed. The counts agree with the spec: 78 files, 282 lines.

Changed invariant tests: `test_application_build_output.py` (`CONFIGURATIONS`, the docstring's sentence and *Covers*, one new case for the invariant), `test_application_build_kitchen_sink.py` (literal), `test_icon_credits.py` and `test_terrain_drawing_numbers.py` (paths and `VIEW_DIRECTORY`), each following D-266.

## Problems as observed

- **Two wide checks against the method.** `.the-way/task-cycle/change/SKILL.md` section 3 says not to run the full suite even where a plan's *Checks* names it. The slice's `node --test …` and `unittest discover -s tests/invariants` are not `npm test`, but together they are most of it. I ran them since this slice changed 78 test files and they are the tests of the code touched. They took about 12 minutes.
- **A gap in `test_browser_view_framework.py`:** its `IMPORT_SPECIFIER` needs white space after `import`, so it does not see a minified `import"x"`. A bare import left in the bundle that way would pass that guard. The new case's `MODULE_SPECIFIER` reads that form. Not changed: the file is outside this slice. Whether the guard should change is for the cycle.
- **The image holds `dist/browser`:** `Dockerfile:24` copies all of `dist`, so the 58 compiled modules stand in the image, where the server does not hand them out and nothing runs them. The `Dockerfile` does not change in this cycle; this is about the size of the image only.
- **Bundle size:** `dist/public/main.js` is 133,185 bytes, 42,736 by gzip, without React. The spec's 357,727 includes React and is not comparable yet.
- **The browser check's certificate:** Playwright's default context refuses the local start's certificate; I used a context with `ignoreHTTPSErrors`. Nothing of the product.
