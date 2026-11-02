# Handoff — Slice 3, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator, never to him.

**Worktree.** `C:\Storage\repos\loop2-wt\logowanie-w-react`, branch `task/logowanie-w-react`, this slice's base 35371e04171e6c72e15108ebd4808184c3b84c36. Work from its root.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole, and a file it names only when the step or variant that names it comes. Your variant is „a slice, or the retry of a slice”. Boundary: this slice alone; return before any other.

**Addresses.** Frozen task `.runs/task-cycles/logowanie-w-react/task.md`, spec `.runs/task-cycles/logowanie-w-react/spec.md`, plan `.runs/task-cycles/logowanie-w-react/plan.md`, all ignored files. You open neither the whole plan nor the whole task; what binds you stands below.

**Answers of step 4.** Trust boundary: yes, `package-lock.json` of `build-tools`, partner npm registry; `scripts/kitchen-sink.mjs` does not change. Irreversible operation: no.

**Fixed for this cycle.** Docker Desktop now runs on this machine, so a test that needs a Docker daemon runs. Run no product gate: that run is the orchestrator's. A file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation; `spec.md` decisions 9 to 11 give why, and no comparison on a rendered element runs by Node's `assert`. Commit with explicit paths, in English, in the style `git log` shows; never `git add -A`.

**Report.** Write `.runs/task-cycles/logowanie-w-react/reports/slice-3.md` as your method gives, each check with its command and exit code. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path; questions, reaches and **Searches not found or unclear** stand in the report.

## Your section of the plan, word for word

### Slice 3 — Per-module output in dist/browser and the bundle

- **Goal:** `tsconfig.browser.json` writes to `dist/browser`, sets `jsx` to `react-jsx` and includes `src/browser/**/*.tsx`, its exclusion of `src/browser/kitchen-sink/**` kept. `scripts/build.mjs`, without `--check`, first removes `dist/public/` and `dist/browser/`, and after both compilations bundles `dist/browser/main.js` with esbuild into `dist/public/main.js` — ES module, for the browser, target ES2022, minified, `process.env.NODE_ENV` defined as `"production"`, esbuild's default keeping the licence comments — then copies the HTML and the static files as today. `src/browser/index.html` does not change. Tests import the per-module output: one replacement, run once and committed, turns `dist/public/sim`, `dist/public/view` and `dist/public/account-api` into `dist/browser/…` in every file git tracks under `tests/`; no line it writes is edited by hand. By hand: `dist/public` becomes `dist/browser` in `CONFIGURATIONS` of `tests/invariants/test_application_build_output.py` and in `VIEW_DIRECTORY` of `tests/invariants/test_icon_credits.py` and `tests/invariants/test_terrain_drawing_numbers.py`, and the literal at `tests/invariants/test_application_build_kitchen_sink.py:110` becomes `dist/browser/kitchen-sink/kitchen-sink.js`. `tests/invariants/test_application_build_output.py` gains a case that the file the page loads is a bundle, written first and seen failing, citing the invariant of row F20. These stay, meaning what is served: `BUILT_PAGE` in `tests/invariants/test_browser_view_framework.py` and `tests/invariants/test_loop2_api_error_route.py`, `BUILT_GAME` in `tests/invariants/test_loop2_one_serving_process.py`, `GAME_PAGE` in `tests/invariants/test_application_build_kitchen_sink.py`, and `tests/http.test.mjs:26` and `:30`, which now read the bundle. `scripts/kitchen-sink.mjs`, `tsconfig.kitchen-sink.json`, `Dockerfile`, `.dockerignore`, `stryker.config.json`, `src/server/` and `eslint.config.mjs` do not change. No test on jsdom exists yet.
- **Change:** `tsconfig.browser.json` · `scripts/build.mjs` · `tests/invariants/test_application_build_output.py` · `tests/invariants/test_application_build_kitchen_sink.py` · `tests/invariants/test_icon_credits.py` · `tests/invariants/test_terrain_drawing_numbers.py` · `tests/invariants/test_*.py` · `tests/sim/*.mjs` · `tests/view/*.test.mjs` · `tests/account-api.test.mjs`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:39-39` To do 10 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:24-28` Non-goals ·
  `.runs/task-cycles/logowanie-w-react/spec.md:108-133` Decision 4 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:283-291` Left to the maker ·
  `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `scripts/static-files.mjs` · `Dockerfile` · `stryker.config.json` · `tests/http.test.mjs:20-36` ·
  `tests/invariants/loop2_invariant_support.py:175-225` ·
  `foundations/decisions.md:928-942` D-45 ·
  `foundations/invariants.md:75-94` application-package-layout, application-build-layout ·
  `foundations/invariants.md:498-507` application-build-kitchen-sink ·
  `foundations/invariants.md:578-587` node-test-selection ·
  `foundations/invariants.md:598-607` mutation-test-selection ·
  `foundations/part_map.md:3-27` browser-view · `foundations/part_map.md:82-115` build-tools ·
  rows F2, S6, F18, F20
- **Model:** same — a change across build-tools, browser-view and simulation, on which every later slice stands.
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_application_build_output.py`; `npm test -- tests/invariants/test_application_build_kitchen_sink.py`; `npm test -- tests/invariants/test_browser_view_framework.py`; `npm run typecheck`; `npm run build`; `node --test tests/*.test.mjs tests/sim/*.test.mjs tests/view/*.test.mjs`; `python -B -m unittest discover -s tests/invariants -p "test_*.py"`; `git grep -n -E "dist/public/(sim|view|account-api)" -- tests`, which finds nothing; `npm run kitchen-sink -- --build-only`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 2 · F2 · S6 · F18 · F20

## Current ranges

Where a range differs from the plan's, this one holds. The foundation step moved the log after the plan was written.

- `guidelines/coding.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `scripts/static-files.mjs`
- `Dockerfile`
- `stryker.config.json`
- `tests/http.test.mjs:20-36`
- `tests/invariants/loop2_invariant_support.py:175-225`
- `foundations/decisions.md:927-941` D-45
- `foundations/invariants.md:75-84` application-package-layout
- `foundations/invariants.md:85-94` application-build-layout
- `foundations/invariants.md:499-508` application-build-kitchen-sink
- `foundations/invariants.md:579-588` node-test-selection
- `foundations/invariants.md:599-608` mutation-test-selection
- `foundations/part_map.md:3-27` browser-view
- `foundations/part_map.md:82-115` build-tools
- `foundations/decisions.md:135-154` D-06
- `foundations/decisions.md:5376-5394` D-263
- `foundations/decisions.md:5460-5487` D-266
- `foundations/invariants.md:65-74` application-build-output

## Passages of the task, the spec and the plan your *Read* names, word for word

### `.runs/task-cycles/logowanie-w-react/task.md:39-39` To do 10

10. `npm run build` składa kod przeglądarki razem z Reactem esbuildem w pliki podawane przez serwer, `npm run typecheck` sprawdza pliki `.tsx`, a obraz Dockera buduje się tak samo (D-06).

### `.runs/task-cycles/logowanie-w-react/spec.md:24-28` Non-goals

- No picture behind the card (task 3), no folding of the footer's credits (task 24), no other screen in React (tasks 4, 5, 6, 13).
- No React form of the destructive button, the select list or the number field: the card uses none of them.
- No change of `eslint.config.mjs`'s rule set, no real-browser test (D-75, D-88), no change of `scripts/kitchen-sink.mjs`, `tsconfig.kitchen-sink.json`, `Dockerfile`, `.dockerignore` or `stryker.config.json`.
- No move of other test files off their own stand-ins: `tests/view/*.test.mjs` other than `account-screen.test.mjs`, `tests/view/icons.test.mjs:124` and `tests/invariants/test_icon_credits.py:82` keep theirs, changing only the path they import.
- No source map, no compression on the server, no change of the server's public directory.

### `.runs/task-cycles/logowanie-w-react/spec.md:108-133` Decision 4

### 4. Per-module output moves to `dist/browser/`; `dist/public/` holds only what the server hands out

- `tsconfig.browser.json`: `outDir` becomes `dist/browser`, `jsx` becomes `react-jsx`, `include` adds `src/browser/**/*.tsx`; the exclusion of `src/browser/kitchen-sink/**` stays.
- `scripts/build.mjs`: without `--check`, after both compilations, it bundles `dist/browser/main.js` with esbuild into `dist/public/main.js`, then copies the HTML and the static files as today. It first removes `dist/public/` and `dist/browser/`, since a module left from an earlier build would be served or imported silently.
- The bundle: ES module, for the browser, target ES2022, minified, `process.env.NODE_ENV` defined as `"production"` (esbuild would otherwise leave React in development mode), esbuild's default keeping the licence comments. `src/browser/index.html` does not change.
- esbuild takes the compiler's output, not the sources, so the code tests import is the code that is bundled, and one compiler alone reads `.ts` and `.tsx`.
- React and react-dom stand in `dependencies`, exactly pinned, since they reach the player, as D-03's „runtime dependencies” reads; esbuild, `@types/react`, `@types/react-dom` and jsdom in `devDependencies`. The image's `node_modules` keeps about 8 MB it does not run.

Measured: 58 modules of 382,894 bytes become one file of 357,727 bytes minified, React and the spike included, 112,179 by gzip, 929,736 unminified; none of the listed frameworks' markers but `__REACT_DEVTOOLS_GLOBAL_HOOK__`; no import specifier left; no `process.env`; 5 licence comments; bundling in under a second. The lockfile written on Windows holds 26 esbuild platform packages, `@esbuild/linux-x64` among them. So minifying pays for itself: the page weighs less than today, and the task's 218 KB does not arrive.

Each thing the handoff asked to check:

| What | Rests on the layout? | What changes |
|---|---|---|
| `browser-view-framework` | yes | `BUILT_PAGE` stays and now reads the bundle, which still must import nothing. In the test `.tsx` leaves the foreign formats and joins the TypeScript ones; `react`, `react-dom` and their subpaths leave the forbidden names and the two React markers leave `FRAMEWORK_MARKERS`, since `__REACT_DEVTOOLS_GLOBAL_HOOK__` stands in the bundle. Every other framework's name and marker stays, so the test still fails on another library. |
| `application-build-output` | yes | Test: `dist/public` becomes `dist/browser` in `CONFIGURATIONS`; `.tsx` in `EMITTED_EXTENSION` with its control; a new case for the bundle. The sentence gains the bundling. |
| `application-build-layout` | yes, stays true: `dist/browser` and `dist/server` are distinct | Only the test above. |
| `application-package-layout` | no | `.tsx` in `SOURCE_EXTENSIONS`, with its control. |
| `application-build-kitchen-sink` | partly | The search stands over all of `dist`, so it holds. Literal at `tests/invariants/test_application_build_kitchen_sink.py:110`: `dist/public/kitchen-sink/…` becomes `dist/browser/kitchen-sink/…`. |
| `mutation-test-selection` | no | The selection reads names. `stryker.config.json` does not change: its `buildCommand` compiles `tsconfig.browser.json` wherever that writes, and `tests/sim/*` import the new path. |
| `node-test-selection` | no | `scripts/test.py` and `test-node-file.mjs` do not change. |
| `stryker.config.json` | no | See above. `.stryker-tmp` stands inside the repository, so `react` resolves from the parent directory when the build runs, before the link to `node_modules` is made. Seen in a run stopped at the dry run; mutants not run, see *Left to the maker*. |

Path literals, counted: `dist/public/sim`, `/view` and `/account-api` stand on 282 lines of 78 test files, 54 Node and 24 Python, and become `dist/browser/…`. Three constants change with them, in `test_application_build_output.py`, `test_icon_credits.py` and `test_terrain_drawing_numbers.py`. Three stay, as they mean what is served: `BUILT_PAGE` in `test_browser_view_framework.py` and `test_loop2_api_error_route.py`, `BUILT_GAME` in `test_loop2_one_serving_process.py`. So do `tests/http.test.mjs:26` and `:30`, which now read the bundle. A literal missed fails loudly: the module is not found.

Rejected: keeping `tsc`'s output in `dist/public/` and the bundle beside it under another name — no line of a test changes, but the server hands out 58 modules no browser loads, each with an unresolvable `react`, against D-06's „bundles … into the files the server hands out”, and `test_built_page_loads_only_its_own_code_and_no_framework` needs a hole for them, which is the guard item 13 keeps. Rejected: moving what the server serves instead, so `dist/public` keeps the modules — the name then lies, and the server, `public-file-access`, README and the HTTP tests move for it. Rejected: esbuild reading the sources — a second compiler of the same files, and tests would not import what ships. Rejected: tests importing the bundle — they import single modules. Cost: a mechanical diff across 78 files in the request, the price of one clear rule of what `dist/public` is.

### `.runs/task-cycles/logowanie-w-react/spec.md:283-291` Left to the maker

## Left to the maker

- The order of the work, which the plan settles, with one thing fixed: the watchdog and its test come first, before any test on jsdom (decision 7). After that, decision 1 can be proved before any React enters: the port of the 69 cases ran on the DOM page in the trial.
- The wording of the limit's sentence, and how `tests/view/memory-limit.test.mjs` bounds its own waiting.
- The state's shape in the card (one reducer or several states), the division of its components within the file, the names of its props and of the harness's helpers, as long as the interfaces above hold.
- The rules of the card in `styles.css`, on existing tokens.
- How the bundle's case in `test_application_build_output.py` proves bundling, and the wording of each control case of To do 14. On the token guard, a `.tsx` control flags a colour in a `style` attribute; measured, the reader needs only the extension.
- How `tests/view/page-document.mjs` tells the product's console lines from React's.
- Running what the trial did not: the image (`Dockerfile`), Stryker on `src/browser/sim/data/about.ts`, which the review of a changed file of `simulation` does anyway, and the full gate.
