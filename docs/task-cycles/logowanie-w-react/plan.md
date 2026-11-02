# Plan — Logowanie jako jedna karta, pierwszy ekran gry zbudowany w React

- Task: `.runs/task-cycles/logowanie-w-react/task.md`
- Spec: `.runs/task-cycles/logowanie-w-react/spec.md`
- Base: 3d366c8cea73c950ac935f5fa344eff4bd8ceaba

## Foundation entries

The rows F1–F23 are named so that a slice's *Read* can point at them; S1–S6 are the rows of the task's *Settlements to record*.

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| F1 — D-03, whole | decision, changed | task, *Zadanie pisze w całości*; spec, *Foundation entries* | Slices 2, 8, 10, 13, 14 |
| F2 — D-06, whole | decision, changed | task, *Zadanie pisze w całości*; spec, *Foundation entries* | Slices 3, 13 |
| F3 — D-36, whole, naming `src/browser/view/account-card.tsx` as the exemplar | decision, changed | task, *Zadanie pisze w całości*; spec, *Foundation entries* | Slices 10, 14 |
| F4 — browser-view-framework, whole. Check: `tests/invariants/test_browser_view_framework.py` | invariant, changed | task, *Zadanie pisze w całości*; spec, *Foundation entries* | Slice 2 |
| F5 — D-96, the part the card makes true; the clause on a load that meets an error of the code (D-213) and „headquarters” stay | decision, changed | task, *Zadanie urzeczywistnia część*; spec, *Foundation entries* | Slices 10, 11 |
| F6 — D-27, the folded section on the login card; the footer stays until task 24 | decision, changed | task, *Zadanie urzeczywistnia część*; spec, *Foundation entries* | Slice 9 |
| F7 — icon-credits, the credits in the card's section as well as in the footer until task 24. Check: `tests/invariants/test_icon_credits.py` | invariant, changed | task, *Zadanie urzeczywistnia część*; spec, *Foundation entries* | Slice 9 |
| F8 — browser-view in the part map: not written. No file `src/browser/*.tsx` comes, so the pattern does not enter (question 10) and `tests/view/**` already claims the new test files | part map, no change | task, *Zadanie urzeczywistnia część*; spec, decision 7 and *Foundation entries* | none |
| S1 | decision, new or into D-96 | task, row S1 | Slices 10, 11 |
| S2 | decision, new or into D-96 | task, row S2 | Slice 10 |
| S3 — leaves the words „above the account forms” of D-97, D-156, D-160, D-211 and D-225 standing and says where that now is | decision, new or into D-96 | task, row S3; spec, *Foundation entries* | Slices 10, 11 |
| S4 | decision, new or into D-96 | task, row S4 | Slices 11, 12 |
| S5 | decision, into D-76, though `scripts/kitchen-sink.mjs` does not change | task, row S5 | Slice 15 |
| S6 | decision, new or into D-06 | task, row S6 | Slice 3 |
| F15 — D-88: a ready-made document imitation, like a hand-made model, proves no real events, focus or rendering | decision, changed | spec, *Foundation entries* | Slices 5, 6, 15 |
| F16 — tests of a screen in React run on jsdom, and only those files leave their stand-ins | decision, new | spec, *Foundation entries* | Slices 5, 6, 15 |
| F17 — a shared control has a React form and a DOM form of one element tree until its last DOM screen moves, and a test keeps them alike (relates to D-44) | decision, new | spec, *Foundation entries* | Slices 8, 14 |
| F18 — per-module output stands in `dist/browser/`, and `dist/public/` holds only what the server hands out (relates to D-06) | decision, new | spec, *Foundation entries* | Slices 3, 13 |
| F19 — no tool guards React's rules, with its return condition (relates to D-29); it names the rules of hooks and of effects that `guidelines/coding-browser-module.md` holds and review keeps, so Slice 14 takes them from this entry | decision, new | spec, *Foundation entries* | Slice 14 |
| F20 — application-build-output: building also bundles the browser's code into the file the page loads. Check: `tests/invariants/test_application_build_output.py` | invariant, changed | spec, *Foundation entries* | Slices 3, 7 |
| F21 — a test on jsdom runs under a memory limit of 2 GiB in its own process and takes `assert` from the harness; D-77 stands | decision, new | spec, *Foundation entries* | Slices 1, 5, 15 |
| F22 — working name `document-test-memory-limit`, method test. Check: `tests/view/memory-limit.test.mjs` | invariant, new | spec, *Foundation entries* | Slices 1, 5, 15 |
| F23 — working name `node-assert-failure-inspect` | environment fact, new | spec, *Foundation entries* | Slices 1, 5 |

## Slices

No slice leaves the tree broken for the next one, so the gate could stand between any two. Slice 11 leaves the card without its look, which Slice 12 gives.

### Slice 1 — The memory limit, its proof and the guard

- **Goal:** `tests/view/memory-limit.mjs` exports `startMemoryLimit({ limitBytes, intervalMs })`, by default 2 GiB read every 100 ms: a worker thread of the calling process that reads `process.memoryUsage.rss()` and above the limit writes one sentence straight to standard error and kills the process with `SIGKILL`; the sentence names the limit, the memory reached, the file by `process.argv[1]`, the likely cause and what to look for, and it says this is no flaky test. `tests/view/memory-limit.test.mjs`, with its child `tests/view/memory-limit-child.mjs`, shows that a growing child is killed, names the limit, the file and the cause and never reaches its own stop; that this reads as a failure through both `node --test` and `scripts/test-node-file.mjs`; and, as the control, that a child under the limit ends well. The proof clears `NODE_TEST_CONTEXT` for its children and asserts the sentence as well as the exit code on both routes, so it cannot pass with nothing run; it bounds its own waiting; its child allocates on a stuck main thread at a low limit and stops itself far below anything that matters. The same test file holds the guard of spec decision 10: it fails where a test file other than `tests/view/page-document.mjs` imports `jsdom` or `happy-dom`, statically or by a dynamic `import(...)`, and where a file that imports that harness imports `assert`, `node:assert` or `node:assert/strict`. The harness does not exist yet: the guard passes on the tree without it, and a control on crafted text shows it refusing each form, without the crafted text tripping the guard on its own file. Its cases cite the invariant of row F22 by a line `invariant: <identifier>`, and the test is seen failing once. Safety rule of this cycle: a failing comparison on a rendered element can take down the human's machine (spec decisions 1, 9, 11). Until `tests/view/memory-limit.mjs` stands, no test on jsdom in which a comparison on an element can fail runs at all; this slice runs nothing on jsdom, and neither jsdom nor React is installed yet.
- **Change:** `tests/view/memory-limit.mjs` · `tests/view/memory-limit.test.mjs` · `tests/view/memory-limit-child.mjs`
- **Read:** `.runs/task-cycles/logowanie-w-react/spec.md:30-38` Constraints ·
  `.runs/task-cycles/logowanie-w-react/spec.md:154-171` Decision 7, The units of the change ·
  `.runs/task-cycles/logowanie-w-react/spec.md:189-224` Decision 9 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:226-236` Decision 10 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:238-244` Decision 11 ·
  `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `scripts/test-node-file.mjs` · `scripts/test.py` ·
  `foundations/decisions.md:1462-1476` D-77 · `foundations/decisions.md:1477-1489` D-78 ·
  `foundations/invariants.md:578-587` node-test-selection · `foundations/glossary.md:94-105` unit test, integration test ·
  `foundations/part_map.md:3-27` browser-view · rows F21, F22, F23
- **Model:** same — every later run on jsdom leans on this slice, and a proof that passes empty leaves the human's machine exposed.
- **Risk:** none
- **Checks:** `npm test -- tests/view/memory-limit.test.mjs`, failing first with the kill not yet written; `node --test tests/view/memory-limit.test.mjs`; `npm test -- tests/quality/test_node_test_selection.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** F21 · F22 · F23

### Slice 2 — The packages and the framework guard

- **Goal:** `package.json` holds, each pinned exactly, `react` 19.3.1 and `react-dom` 19.3.1 in `dependencies`, and `esbuild` 0.28.2, `jsdom` 30.1.3, `@types/react` 19.3.0 and `@types/react-dom` 19.3.0 in `devDependencies`, and `package-lock.json` is what npm writes for them, holding esbuild for Windows and for Linux (`@esbuild/linux-x64`). `happy-dom` does not enter. Nothing uses the packages yet. `tests/invariants/test_browser_view_framework.py` says what row F4 says: `.tsx` leaves the foreign formats and joins the TypeScript ones; `react`, `react-dom` and their subpaths leave the forbidden names and the two React markers leave `FRAMEWORK_MARKERS`, since `__REACT_DEVTOOLS_GLOBAL_HOOK__` will stand in the bundle; `BUILT_PAGE` stays; every other framework's name and marker stays; its docstring stops calling `.tsx` a framework's format. This comes with the packages because `react` in `dependencies` fails the guard as it stands. The test still fails on another library in the code and in the runtime dependencies: seen failing once on each, with a made-up library put in for a moment, and the report names those runs. The report also names, for each package added and for what it brings: the result of the audit under D-33, each install script a new package runs, and the registry the lockfile resolves it from. Safety rule of this cycle: jsdom now stands on the disk, and this slice runs nothing on it; a failing comparison on a rendered element can take down the human's machine (spec decisions 1, 9, 11).
- **Change:** `package.json` · `package-lock.json` · `tests/invariants/test_browser_view_framework.py`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:42-42` To do 13 ·
  `.runs/task-cycles/logowanie-w-react/task.md:147-149` Context ·
  `.runs/task-cycles/logowanie-w-react/spec.md:38-38` Constraints ·
  `.runs/task-cycles/logowanie-w-react/spec.md:114-116` Decision 4 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:122-122` Decision 4 ·
  `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `scripts/audit_dependencies.py` · `README.md:32-32` ·
  `foundations/decisions.md:750-762` D-33 · `foundations/invariants.md:448-457` introduced-npm-vulnerabilities ·
  `foundations/invariants.md:548-557` dependency-audit-refusal · `foundations/part_map.md:3-27` browser-view ·
  `foundations/part_map.md:82-115` build-tools · rows F1, F4
- **Model:** cheaper
- **Risk:** trust boundary — `package-lock.json` of `build-tools`, partner npm registry
- **Checks:** `npm test -- tests/invariants/test_browser_view_framework.py`; `python -B scripts/audit_dependencies.py`; `git grep -c "node_modules/@esbuild/linux-x64" -- package-lock.json`; `npm ci`; `npm test -- tests/invariants/test_application_package_layout.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · F1 · F4

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

### Slice 4 — The game's sentence and the account rules without DOM

- **Goal:** `src/browser/sim/data/about.ts`, a file of kind `content-data` that imports nothing, holds the game's name „Loop” and its one sentence, „Napisz postaci program i sprawdź, jak długo przeżyje bez ciebie.”, and the header of `src/browser/view/app.ts` reads the name from it. `src/browser/view/account-rules.ts`, without React or DOM, holds `addressProblem`, `passwordProblems`, `registrationProblems`, `RegistrationField` and `RESET_REQUESTED_SENTENCE`, moved unchanged out of `src/browser/view/account-screen.ts`. `src/browser/view/account-screen.ts`, `src/browser/view/password-reset.ts`, `src/browser/kitchen-sink/kitchen-sink.ts` (one import line) and the imports of `tests/view/account-screen.test.mjs` take them from there. Nothing a player sees changes and no expected value of a test changes. The kitchen-sink page keeps building with `scripts/kitchen-sink.mjs` byte for byte as it is.
- **Change:** `src/browser/sim/data/about.ts` · `src/browser/view/account-rules.ts` · `src/browser/view/account-screen.ts` · `src/browser/view/password-reset.ts` · `src/browser/view/app.ts` · `src/browser/kitchen-sink/kitchen-sink.ts` · `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:18-20` To do 1 ·
  `.runs/task-cycles/logowanie-w-react/task.md:91-95` Pytanie 5 ·
  `.runs/task-cycles/logowanie-w-react/task.md:138-140` Context ·
  `.runs/task-cycles/logowanie-w-react/spec.md:143-152` Decision 6 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:154-171` Decision 7, The units of the change ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/coding-content-data.md` ·
  `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/data/resources.ts` ·
  `foundations/decisions.md:57-118` D-04 · `foundations/decisions.md:388-406` D-18 ·
  `foundations/decisions.md:928-942` D-45 ·
  `foundations/invariants.md:214-225` simulation-isolation · `foundations/invariants.md:236-247` content-identifiers ·
  `foundations/invariants.md:498-507` application-build-kitchen-sink ·
  `foundations/part_map.md:3-59` browser-view, simulation
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs`; `npm test -- tests/view/password-reset.test.mjs`; `npm test -- tests/invariants/test_simulation_isolation.py`; `npm test -- tests/invariants/test_content_identifiers.py`; `npm test -- tests/invariants/test_application_build_kitchen_sink.py`; `npm run kitchen-sink -- --build-only`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 3

### Slice 5 — The harness on jsdom

- **Goal:** `tests/view/page-document.mjs` (no `.test.mjs`) starts, as its first act, the limit of `tests/view/memory-limit.mjs`, and only then installs a window of jsdom, so a test file that imports it first has `window` when `react-dom` loads. It gives a fresh window per case; a control that becomes disabled loses focus, by watching `disabled` and moving focus to an element outside `body`; `settle` and any mount outside it go through `act`, with `IS_REACT_ACT_ENVIRONMENT` in the harness; typing goes through the input's native value setter and a bubbling `input` event; a report of React's development build through `console.error` fails the case, and lines the product writes itself, such as `saved-game-load …`, are told apart. It exports an `assert` with `equal`, `notEqual`, `deepEqual`, `ok`, `match`, `doesNotMatch` and `fail`, each taking a message as Node's does: none builds Node's message and none puts a value on the error; `equal` and `notEqual` are `Object.is`; `deepEqual` takes plain data alone and refuses an element anywhere in either value, by a walk of arrays and plain objects that enters nothing else. `tests/view/page-document.test.mjs` holds the harness's own cases, including a failing `assert` on a rendered element that names its case in a short error and a `deepEqual` that refuses an element, and uses that `assert`. React may be drawn there with `createElement`; no product module in React exists yet. Safety rule of this cycle: a failing comparison on a rendered element can take down the human's machine (spec decisions 1, 9, 11). A test file on jsdom imports the harness first and takes `assert` from it, so the limit runs and `node:assert` stays out. A file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation. The harness's own failing cases run only under the limit.
- **Change:** `tests/view/page-document.mjs` · `tests/view/page-document.test.mjs`
- **Read:** `.runs/task-cycles/logowanie-w-react/spec.md:42-73` Decision 1 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:154-171` Decision 7, The units of the change ·
  `.runs/task-cycles/logowanie-w-react/spec.md:189-197` Decision 9 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:226-236` Decision 10 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:238-244` Decision 11 ·
  `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `tests/view/account-screen.test.mjs:1-420` the hand-made model and its helpers · tests/view/memory-limit.mjs, which Slice 1 writes ·
  `foundations/decisions.md:1436-1448` D-75 · `foundations/decisions.md:1462-1489` D-77, D-78 ·
  `foundations/part_map.md:3-27` browser-view · rows F15, F16, F21, F22, F23
- **Model:** same — the first code on jsdom, where a wrong step repeats the crash, and every later test takes its reading of a page from it.
- **Risk:** none
- **Checks:** `npm test -- tests/view/page-document.test.mjs`, written first and seen failing; `npm test -- tests/view/memory-limit.test.mjs`, whose guard now reads the real harness; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · Slice 2 · F15 · F16 · F21 · F22 · F23

### Slice 6 — The 69 cases on jsdom, on today's page

- **Goal:** `tests/view/account-screen.test.mjs` loses its hand-made document model and runs every one of its 69 cases on the harness, against the DOM page as it stands: the harness imported first, `assert` from the harness, the model's own helpers rebuilt on the real document. Expected values stay. A case that compares elements in a `deepEqual` compares names or identities instead, as spec decision 10 gives, `assert.deepEqual(order, [logout, line, row])` at `tests/view/account-screen.test.mjs:2982` becoming one `equal` for each place. The case that leaned on the model's spy gets its seed. The file's opening comment and `tests/view/password-reset.test.mjs:4` lose their mention of the hand-made model. The report accounts for every case by name: moved with only its harness changed, or why not, with the source `guidelines/testing.md` *Changing an existing test* asks for. A case on focus is seen failing once, by its short error, against the code that returns focus removed for a moment. The tests of `createAccountScreen` stay until Slice 11. Other test files keep their stand-ins. Safety rule of this cycle: a failing comparison on a rendered element can take down the human's machine (spec decisions 1, 9, 11). This file runs on jsdom only with the harness imported first and with its `assert`; a file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation.
- **Change:** `tests/view/account-screen.test.mjs` · `tests/view/password-reset.test.mjs`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:44-44` To do 15 ·
  `.runs/task-cycles/logowanie-w-react/task.md:141-145` Context ·
  `.runs/task-cycles/logowanie-w-react/spec.md:42-73` Decision 1 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:175-175` Decision 7 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:226-236` Decision 10 ·
  `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  tests/view/page-document.mjs, which Slice 5 writes ·
  `foundations/decisions.md:1477-1489` D-78 · `foundations/invariants.md:998-1007` expired-session-unsaved-progress ·
  rows F15, F16, F21
- **Model:** same — 69 cases must keep what they protect through the loss of their model, on the path where a lapse crashes the machine.
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs`, reporting 69 cases; `npm test -- tests/view/password-reset.test.mjs`; `npm test -- tests/view/memory-limit.test.mjs`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 4 · Slice 5

### Slice 7 — The guards read .tsx

- **Goal:** Before the first `.tsx` file, the guards that pick files by extension read it, each with a case of control: `tests/invariants/test_browser_view_token_values.py:79`, where a `.tsx` control flags a colour in a `style` attribute; `tests/invariants/test_application_build_output.py:49`, where `.tsx` stands in `EMITTED_EXTENSION` and a made-up `.tsx` source compiles to its `.js` in the build, and a type error in a `.tsx` file fails `npm run typecheck`; `tests/invariants/test_application_package_layout.py:20`, where `.tsx` stands in `SOURCE_EXTENSIONS`. Each control is seen failing once with the extension taken out. `IMPORT_SPECIFIER` of `tests/invariants/test_browser_view_framework.py` needs white space after `import`, so it does not see the minified form `import"x"`, and `BUILT_PAGE` is a minified bundle now: it comes to read that form, with a control seen failing without the change, so that the guard of To do 13 keeps failing on a framework left as an import in the bundle. `tests/invariants/test_simulation_randomness.py:54` stays. No `.tsx` file of the product enters.
- **Change:** `tests/invariants/test_browser_view_token_values.py` · `tests/invariants/test_application_build_output.py` · `tests/invariants/test_application_package_layout.py` · `tests/invariants/test_browser_view_framework.py`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:39-39` To do 10 ·
  `.runs/task-cycles/logowanie-w-react/task.md:43-43` To do 14 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:122-125` Decision 4 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:289-289` Left to the maker ·
  `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `tests/invariants/loop2_invariant_support.py:175-225` ·
  `foundations/decisions.md:898-912` D-43 · `foundations/invariants.md:458-467` browser-view-token-values ·
  `foundations/invariants.md:75-94` application-package-layout, application-build-layout · row F20
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_application_build_output.py`; `npm test -- tests/invariants/test_application_package_layout.py`; `npm test -- tests/invariants/test_browser_view_framework.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 3 · F20

### Slice 8 — The controls in React and the test that keeps them alike

- **Goal:** `src/browser/view/controls/react-button.tsx` holds the button with the kinds the card needs, plain and selected in its group, `submit`, a waiting text that stands for `setButtonWaiting`, and `aria-pressed` and `aria-busy` as the DOM form sets them. `src/browser/view/controls/react-text-field.tsx` holds the text field and the password field with a visible label, an error message and the attributes the DOM forms set, and the form's warning and note. Each draws the same elements with the same classes and attributes as its DOM form; `src/browser/styles.css` stays the one place of the look, and `src/browser/view/controls/button.ts` and `src/browser/view/controls/text-field.ts` do not change. No React form of the destructive button, the select list or the number field comes. `tests/view/react-controls.test.mjs`, written first, draws both forms for each kind and state the card uses and compares tag, attributes and text, ids compared by what they point at and the input's `value` attribute left out; a difference put in for a moment is seen failing. `literal_texts` of `tests/invariants/test_browser_view_token_values.py` reads the `/` of a JSX closing tag such as `</p>` as the start of a regex, since `<` is in `REGEX_AFTER`, and skips the rest of that line, so a colour later on the line goes unread: it comes to read such a line, with a control seen failing without the change, the rest of that reader unchanged. Safety rule of this cycle: a failing comparison on a rendered element can take down the human's machine (spec decisions 1, 9, 11). The test imports the harness first and takes `assert` from it, and compares strings and plain data, never elements in a `deepEqual`; a file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation.
- **Change:** `src/browser/view/controls/react-button.tsx` · `src/browser/view/controls/react-text-field.tsx` · `tests/view/react-controls.test.mjs` · `tests/invariants/test_browser_view_token_values.py`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:157-157` Questions carried to cycle ·
  `.runs/task-cycles/logowanie-w-react/spec.md:63-73` Decision 1, the harness ·
  `.runs/task-cycles/logowanie-w-react/spec.md:75-85` Decision 2 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:143-152` Decision 6 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/controls/button.ts` · `src/browser/view/controls/text-field.ts` ·
  tests/view/page-document.mjs, which Slice 5 writes ·
  `foundations/decisions.md:883-927` D-42, D-43, D-44 · `foundations/decisions.md:958-972` D-47 ·
  `foundations/invariants.md:468-477` browser-view-focus-outline · rows F1, F17
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/react-controls.test.mjs`, written first and seen failing; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_browser_view_framework.py`; `npm test -- tests/view/memory-limit.test.mjs`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 5 · Slice 7 · F17

### Slice 9 — The folded credits

- **Goal:** `src/browser/view/credits-section.tsx` draws a native `<details>` with the `<summary>` „Autorzy grafiki”, from `footerCredits()` of `src/browser/view/footer.ts`, so its content is the footer's: the icon's title, author, page, licence and how the file differs from its source; links open in a new tab. No state and no script. `src/browser/view/footer.ts` does not change. `tests/view/icons.test.mjs` and `tests/invariants/test_icon_credits.py` keep their stand-ins for `createFooter` and read the section through `renderToStaticMarkup`, which needs no document; the script `tests/invariants/test_icon_credits.py` writes to a temporary directory reaches `react` and `react-dom/server` from the built copy, not from where the script stands. The check cites the invariant of row F7 and is seen failing once with a credit taken out. This slice stays off jsdom.
- **Change:** `src/browser/view/credits-section.tsx` · `tests/view/icons.test.mjs` · `tests/invariants/test_icon_credits.py`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:34-35` To do 7 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:173-173` Decision 7, the credits' test ·
  `.runs/task-cycles/logowanie-w-react/spec.md:183-183` Decision 8, the folded credits ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/footer.ts` · `src/browser/view/credits.ts` ·
  `tests/invariants/loop2_invariant_support.py:175-225` ·
  `foundations/decisions.md:958-972` D-47 · rows F6, F7
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/icons.test.mjs`; `npm test -- tests/invariants/test_icon_credits.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 7 · F6 · F7

### Slice 10 — The card and its four states

- **Goal:** `src/browser/view/account-card.tsx`, the exemplar of row F3, holds the card and its four states as React components, and one plain function, `createAccountCard(options)`, returning `{ element, focus(), dispose() }`, with the options client, the page's one sentence (`ConfirmationNotice | null`), `signedIn(account, message)` and `reset: { token, address, finished(ending) } | null`. It creates its own host element and root and renders synchronously with `flushSync`; `focus()` moves focus to the first field; `dispose()` unmounts and removes the element, and an answer still awaited is then ignored; `signedIn` and `finished` are called from an event handler or the continuation of an answer, never from render or an effect. The card reads the name and the sentence from `src/browser/sim/data/about.ts`, the rules from `src/browser/view/account-rules.ts`, and builds on the React controls and `src/browser/view/credits-section.tsx`. It does what To do 1–7 and spec decision 8 give, each form behaving as `src/browser/view/account-screen.ts` and `src/browser/view/password-reset.ts` behave today: the same requests, refusals and sentences, checks before sending, the lock of the whole card, the waiting texts, focus back on the control the player started from after the commit that unlocks, a late answer ignored. `src/browser/view/app.ts` does not use it yet, so nothing a player sees changes in this slice. New cases in `tests/view/account-screen.test.mjs`, each written first, drive the card through `createAccountCard`: the four states, the switch, the page's sentence staying across states, the credits in every state, `dispose()` during a wait, and what the cases of `createAccountScreen` protect, which go in Slice 11. Safety rule of this cycle: a failing comparison on a rendered element can take down the human's machine (spec decisions 1, 9, 11). The test file keeps the harness first and its `assert`; a file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation.
- **Change:** `src/browser/view/account-card.tsx` · `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:18-35` To do 1–7 ·
  `.runs/task-cycles/logowanie-w-react/task.md:67-84` Pytania 1–3 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:63-73` Decision 1, the harness ·
  `.runs/task-cycles/logowanie-w-react/spec.md:87-106` Decision 3 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:135-141` Decision 5 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:156-171` Decision 7, The units of the change ·
  `.runs/task-cycles/logowanie-w-react/spec.md:177-187` Decision 8 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/account-screen.ts` · `src/browser/view/password-reset.ts` ·
  `src/browser/view/email-confirmation.ts` · `src/browser/account-api.ts` ·
  `src/browser/view/controls/button.ts` · `src/browser/view/controls/text-field.ts` ·
  tests/view/page-document.mjs, src/browser/view/account-rules.ts, src/browser/sim/data/about.ts, src/browser/view/controls/react-button.tsx, src/browser/view/controls/react-text-field.tsx and src/browser/view/credits-section.tsx, which Slices 4, 5, 8 and 9 write ·
  `foundations/decisions.md:57-118` D-04 · `foundations/decisions.md:388-406` D-18 ·
  `foundations/decisions.md:913-927` D-44 · `foundations/decisions.md:958-972` D-47 ·
  `foundations/decisions.md:1804-1848` D-98, D-99, D-100 · `foundations/decisions.md:2607-2621` D-139 ·
  `foundations/decisions.md:4120-4172` D-222 · `foundations/decisions.md:4198-4253` D-224, D-225 ·
  `foundations/decisions.md:5099-5134` D-252 ·
  `foundations/invariants.md:808-827` account-client-requests, account-client-outcomes ·
  rows F1, F3, F5, S1, S2, S3
- **Model:** same — this file is what every later screen copies, and its state, focus and late answers take judgment the spec leaves to the maker.
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs`, each new case seen failing first; `npm test -- tests/view/react-controls.test.mjs`; `npm test -- tests/view/memory-limit.test.mjs`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 4 · Slice 6 · Slice 8 · Slice 9 · F1 · F3 · F5 · S1 · S2 · S3

### Slice 11 — The page holds the card

- **Goal:** `src/browser/view/app.ts`, still DOM and without JSX, holds the card as spec decision 3 gives: the card element stands in `root` beside `header`, `main` and the footer, never inside `main`, and while it stands those three are `hidden`; the footer is kept in a constant; one function closes the card and shows the page, and every screen that is no card goes through it; one function places a card, closing any card before it, and `showForms` and `showReset` go through it; `showForms` passes one sentence, `sentence` or the pending notice; `focus()` is called where `accountScreen.focus()` is called today and nowhere else; waiting screens keep their header and footer. `createPageNotice` stays for the refused save above the game. `src/browser/view/account-screen.ts` is deleted; `src/browser/view/password-reset.ts` loses `createResetScreen` and keeps `readResetToken`, `ResetEnding`, `ResetOutcome` and `resetOutcome`. `tests/view/account-screen.test.mjs` runs on the card: its helpers read the card's states, and each changed expectation names the item of *To do* or the answer that changes it; the cases of `createAccountScreen` itself are replaced by the cases of Slice 10 that protect the same behaviour. The report accounts for all 69 cases by name, as `.runs/task-cycles/logowanie-w-react/spec.md:175` gives. The look of the card is not finished until Slice 12: the page works, without the card's rules. Safety rule of this cycle: a failing comparison on a rendered element can take down the human's machine (spec decisions 1, 9, 11). The test file keeps the harness first and its `assert`; a file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation.
- **Change:** `src/browser/view/app.ts` · `src/browser/view/account-screen.ts` · `src/browser/view/password-reset.ts` · `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:21-37` To do 2–8 ·
  `.runs/task-cycles/logowanie-w-react/task.md:79-90` Pytania 3–4 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:32-32` Constraints, moved lines ·
  `.runs/task-cycles/logowanie-w-react/spec.md:87-106` Decision 3 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:156-175` Decision 7 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/main.ts` · `src/browser/view/email-confirmation.ts` ·
  src/browser/view/account-card.tsx and tests/view/page-document.mjs, which Slices 5 and 10 write ·
  `foundations/decisions.md:1789-1803` D-97 · `foundations/decisions.md:2868-2897` D-156, D-157 ·
  `foundations/decisions.md:2928-2940` D-160 · `foundations/decisions.md:3856-3888` D-211 ·
  `foundations/decisions.md:4120-4172` D-222 · `foundations/decisions.md:4220-4253` D-225 ·
  `foundations/decisions.md:5099-5134` D-252 ·
  `foundations/invariants.md:998-1007` expired-session-unsaved-progress ·
  rows F5, F15, S1, S3, S4
- **Model:** same — this slice changes the page's every way to and from the card, and restates 69 cases against it.
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs`, its changed cases seen failing first; `npm test -- tests/view/password-reset.test.mjs`; `npm test -- tests/view/memory-limit.test.mjs`; `npm test -- tests/invariants/test_browser_view_framework.py`, now on a bundle with React; `npm test -- tests/invariants/test_application_build_output.py`; `npm test -- tests/invariants/test_application_build_kitchen_sink.py`; `npm run kitchen-sink -- --build-only`; `npm test -- tests/deploy/test_loop2_image_icons.py`, reported as unchecked where no Docker daemon answers; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 10 · F5 · F15 · S1 · S3 · S4

### Slice 12 — The look of the card, walked in a real browser

- **Goal:** `src/browser/styles.css` holds the rules of the card's screen and the card, on existing tokens: the card stands in the middle of the window, about 400 px wide as a layout dimension, on `panel` with its text; nothing stands beside it; the rules of the two forms side by side go. A value the token file does not hold is named in the report, never chosen, as `src/browser/AGENTS.md` gives. Then, as `.claude/skills/loop2-play/SKILL.md` gives, the agent starts the game with `npm run local` and goes through the card in a real browser with Playwright CLI: the four states, the switch, a form sent with Enter, a click on a label, the lock while waiting, focus and the keyboard through the card and the folded credits, the waiting screens with their header and footer, a sign-up, a logout back to the card, and a page opened with `#reset-password=` showing the form and the refusal of the link. It opens the kitchen-sink page in the same browser and sees all its form samples and no error but a missing favicon. Mail reaches nowhere locally, so confirming an address and a successful new password stay with the human's check. A fault this walk finds in the card or the page is fixed here. Evidence goes into the report and nothing of the walk stays in the repository. Safety rule of this cycle: a failing comparison on a rendered element can take down the human's machine (spec decisions 1, 9, 11). A file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation.
- **Change:** `src/browser/styles.css` · `src/browser/view/account-card.tsx` · `src/browser/view/app.ts` · `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:36-37` To do 8 ·
  `.runs/task-cycles/logowanie-w-react/task.md:59-63` Acceptance criteria ·
  `.runs/task-cycles/logowanie-w-react/task.md:85-90` Pytanie 4 ·
  `.runs/task-cycles/logowanie-w-react/task.md:122-126` Pytanie 11 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:99-99` Decision 3 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:183-187` Decision 8 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `src/browser/tokens.css` ·
  `src/browser/kitchen-sink/kitchen-sink.ts:226-345` ·
  `foundations/decisions.md:883-912` D-42, D-43 · `foundations/decisions.md:928-942` D-45 ·
  `foundations/decisions.md:958-972` D-47 · `foundations/decisions.md:1436-1448` D-75 ·
  `foundations/decisions.md:5162-5190` D-254 · `foundations/decisions.md:5240-5280` D-257, D-258 ·
  `foundations/invariants.md:458-477` browser-view-token-values, browser-view-focus-outline ·
  rows F15, S3, S4
- **Model:** same — the look of the card is what the human asked for most, and the walk may fix the exemplar and the page.
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_browser_view_focus_outline.py`; `npm test -- tests/invariants/test_design_token_contrast.py`; `npm test -- tests/view/account-screen.test.mjs`; `npm run local` with `playwright-cli` as `.claude/skills/loop2-play/SKILL.md` gives, ended by `npm run local:stop`; `npm run kitchen-sink` as a background command, its printed address opened with `playwright-cli`, then stopped; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 11 · S3 · S4

### Slice 13 — README and the deploy skill say what stands

- **Goal:** `README.md` stops saying „gra w przeglądarce zbudowana na DOM” at `:3` and says the view is built with React, and its step of `npm run build` at `:25` says the build compiles both parts into `dist/browser` and `dist/server`, bundles the browser's code into `dist/public` with esbuild and copies the rest there. Any other sentence of the file that this change makes untrue goes with them. The skill `loop2-deploy` describes the card instead of two forms, the same in both copies: `references/setup_and_secrets.md:328` and `:343` and `SKILL.md:225`. The skill `loop2-play` says at `SKILL.md:58` „Under „Załóż konto”, fill…”, which now takes a press of the switch first: it says so, the same in both copies, with any other sentence of that skill the card makes untrue.
- **Change:** `README.md` · `.claude/skills/loop2-deploy/SKILL.md` · `.claude/skills/loop2-deploy/references/setup_and_secrets.md` · `.agents/skills/loop2-deploy/SKILL.md` · `.agents/skills/loop2-deploy/references/setup_and_secrets.md` · `.claude/skills/loop2-play/SKILL.md` · `.agents/skills/loop2-play/SKILL.md`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:40-40` To do 11 ·
  `.runs/task-cycles/logowanie-w-react/task.md:50-53` To do 17 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:32-32` Constraints, moved lines ·
  `tests/agent_workflow/test_loop2_deploy_skill.py` · rows F1, F2, F18, S6
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`; `npm test -- tests/agent_workflow/test_loop2_play_skill.py`; `git grep -n "zbudowana na DOM" -- README.md`, which finds nothing
- **Depends on:** Slice 11 · F1 · F2 · F18 · S6

### Slice 14 — The coding guidelines of React

- **Goal:** Written as the cycle's author of `the-way-maintain-coding-guidelines`: `guidelines/coding-browser-module.md` describes building in React. The rule „TypeScript i DOM” and its examples stop contradicting row F1. *Files of this kind* names `src/browser/view/account-card.tsx` as the exemplar with D-36, `src/browser/view/status-row.ts` stops being it, `src/browser/view/account-screen.ts` leaves the table, and the new files of the view stand in it. The file gains the rules of hooks and of effects that review keeps (spec decision 5), the two forms of a shared control (spec decision 2), and that a module the kitchen-sink page imports must not reach a `.tsx` file (spec decision 6). `guidelines/coding-content-data.md` gains the row of `src/browser/sim/data/about.ts`. Every rule and row comes from the task, the spec and the entries the foundation step wrote; a meaning none of them settles goes into no file and stands in the report as a question for the human at the blocked draft request.
- **Change:** `guidelines/coding-browser-module.md` · `guidelines/coding-content-data.md`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:45-49` To do 16 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:75-85` Decision 2 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:135-141` Decision 5 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:143-152` Decision 6 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:281-281` Foundation entries, guidelines ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/coding/template.md` ·
  `.the-way/product-guidelines/coding/SKILL.md:40-43` ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` ·
  src/browser/view/account-card.tsx, which Slice 10 writes · rows F1, F3, F17, F19
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 4 · Slice 8 · Slice 10 · F1 · F3 · F17 · F19

### Slice 15 — The testing guidelines of jsdom and the memory limit

- **Goal:** Written as the cycle's author of `the-way-maintain-testing-guidelines`: `guidelines/testing.md` describes the state after this change. The row `browser-view` of the table of parts, the recipe `unit test` and the part *Not tested on purpose* stop leaning on the hand-made document model, in line with rows F15 and F16. The recipe `unit test` says a test of a screen in React runs on the harness `tests/view/page-document.mjs` and takes `assert` from it, a helper on jsdom too. The file holds the rule of spec decision 11: a file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation. `tests/view/memory-limit.test.mjs` stands in the recipe `integration test`. The sentence at `guidelines/testing.md:175`–`:178` says after this what D-76 says after row S5. `scripts/kitchen-sink.mjs` and `preview-server-access` stay as they are, with no refusal test. Every field comes from the task, the spec and the entries the foundation step wrote; a meaning none of them settles goes into no file and stands in the report as a question for the human at the blocked draft request.
- **Change:** `guidelines/testing.md`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:44-44` To do 15 ·
  `.runs/task-cycles/logowanie-w-react/task.md:54-57` To do 18 ·
  `.runs/task-cycles/logowanie-w-react/task.md:101-106` Pytanie 7 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:42-73` Decision 1 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:189-197` Decision 9 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:226-236` Decision 10 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:238-244` Decision 11 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:281-281` Foundation entries, guidelines ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/testing/template.md` ·
  `.the-way/product-guidelines/testing/SKILL.md:39-42` ·
  tests/view/memory-limit.mjs and tests/view/page-document.mjs, which Slices 1 and 5 write ·
  rows S5, F15, F16, F21, F22
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 1 · Slice 6 · S5 · F15 · F16 · F21 · F22

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Outcome: one card with the name, the sentence, the switch and the folded credits, every form as before, first screen in React, locally and on the test server | Slices 4, 8, 9, 10, 11, 12; the test server by H1 |
| To do 1 | Slices 4, 10, 12; F5 |
| To do 2 | Slices 10, 11; F5 |
| To do 3 | Slice 10; S1 |
| To do 4 | Slice 10; S2 |
| To do 5 | Slices 10, 11 |
| To do 6 | Slices 10, 11; S3 |
| To do 7 | Slices 9, 10; F6, F7 |
| To do 8 | Slices 11, 12; S4 |
| To do 9 | Slices 8, 9, 10, 11; F1 |
| To do 10 | Slices 2, 3, 7; F2, S6, F18, F20; image: Slice 11's check and H1 |
| To do 11 | Slice 13 |
| To do 12 | Slices 4, 11, 12 |
| To do 13 | Slices 2, 7; F4 |
| To do 14 | Slices 7, 8 |
| To do 15 | Slices 5, 6, 11, 15; F15, F16 |
| To do 16 | Slice 14; F3, F17, F19 |
| To do 17 | Slice 13 |
| To do 18 | Slice 15; S5 |
| Acceptance: the agent goes through the card in a real browser locally | Slice 12 |
| Acceptance: a person goes through it at `https://loop2.mariusznazar.com/`, with mail | H1, no slice; the request opens as a blocked draft |
| Acceptance: `#reset-password=` opens the form and shows the refusal locally | Slice 12 |
| Row S1 | S1, Slices 10, 11 |
| Row S2 | S2, Slice 10 |
| Row S3 | S3, Slices 10, 11 |
| Row S4 | S4, Slices 11, 12 |
| Row S5 | S5, Slice 15 |
| Row S6 | S6, Slice 3 |
| Projected entries the task writes whole: D-03, D-06, D-36, browser-view-framework | F1, F2, F3, F4 |
| Projected entries it writes in part: D-96, D-27, icon-credits, browser-view | F5, F6, F7; F8 records why the part map stays |
| Entries the spec names | F15–F23 |
| Spec: no test file under `tests/` on jsdom can take the machine's memory down, and a failing one names its case | Slices 1, 5; F21, F22, F23 |
| Spec: a throwaway file on jsdom takes the same limit by a written rule | the Goal of each slice that touches jsdom, Slice 15 |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| Versions of the packages the spec does not name are those of the trial: react and react-dom 19.3.1, @types/react and @types/react-dom 19.3.0, esbuild 0.28.2 | The newest at install time: not what the spec measured | A newer patch is held back until a later change |
| The framework guard changes in Slice 2 with the packages | Changing it with the first React code: `react` in `dependencies` fails the guard from the moment it enters, so the tree stays red for nine slices | None: the guard speaks of React for slices in which no React code stands |
| The packages stand in a slice of their own, the only one with a review of its own | Packages with the build: the trust-boundary review would also read 78 test files | One review more |
| The per-module move, the bundle and the rewrite of the path literals are one slice, the rewrite one replacement counted by patterns in *Change* | Files by hand in slices of ten: the tree is red between them and the work is mechanical | A literal missed fails loudly: the module is not found |
| The moves to `about.ts` and `account-rules.ts` come before the port | With the card: the port and the card would both carry a change of import | One small slice more |
| The 69 cases move to jsdom on today's DOM page first (Slice 6), and change for the card later (Slice 11) | Moving and changing them together: a lost protection could not be told from a changed requirement | The file is edited twice |
| The harness's own cases stand in a new file, `tests/view/page-document.test.mjs` | In `tests/view/memory-limit.test.mjs`: that file keeps `node:assert` and the guard forbids it beside the harness | Three files on jsdom, not two, in the sum of decision 9; its 13 still hold |
| The card's new cases stand in `tests/view/account-screen.test.mjs` | A new `account-card.test.mjs`: a fourth file on jsdom, against the spec's one file of the port | The file grows past 3381 lines |
| The guards that read `.tsx` come before the first `.tsx` file | After the card: the first files would pass unread | None |
| The card is built and tested apart (Slice 10) and the page takes it after (Slice 11) | One slice: too much for one reviewer, and a fault of the page could not be told from a fault of the card | Dead code for one slice, and the bundle holds React only from Slice 11 |
| The look and the walk in a real browser stand in one slice that may also fix the card and the page | The walk as a slice of its own: a slice with no commit fails the mechanical check; the walk inside Slice 11: the look is what it judges | Slice 12 changes files Slices 10 and 11 made |
| README and the deploy skill come after the page takes the card | With the build: `README.md:3` would say React before any React runs | None |
| The rule of spec decision 11 enters `guidelines/testing.md` in Slice 15, and each slice's Goal carries it until then | In Slice 1: `guidelines/testing.md` changes twice | An agent outside this cycle meets jsdom only on this branch, after Slice 2 |
| The focused checks of Slice 3 name the Node stage and the invariant tests | Files one by one: `npm test -- <file>` takes one file, and the rewrite touches 78 | Slice 3 takes minutes more; it is not the gate, which also runs the other directories and the foundation check |
