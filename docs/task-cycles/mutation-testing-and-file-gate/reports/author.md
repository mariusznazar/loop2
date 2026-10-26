# Author report

**Status:** done with concerns

**Commit:** `85c6e64` — `test: add simulation mutation checks and focused test gate`.
Base: `7012abc`. Worktree: `C:/Storage/repos/loop2/.runs/worktrees/mutation-gate`.
Tracked working tree clean after commit. No PR, backlog edit, application-code change or subagent dispatch.

The change implements task items 1–9 and all six settlements. The concern is the supplied baseline's Windows listener discovery failure, not a failing focused check of this change. The author did not run the full gate; the orchestrator owns that run after review.

## Changed files

| File | Added | Removed |
|---|---:|---:|
| `.gitignore` | 2 | 0 |
| `README.md` | 3 | 1 |
| `foundations/decisions.md` | 37 | 5 |
| `foundations/environment_facts.md` | 12 | 0 |
| `foundations/invariants.md` | 20 | 0 |
| `foundations/part_map.md` | 2 | 1 |
| `guidelines/testing.md` | 59 | 5 |
| `package-lock.json` | 2208 | 146 |
| `package.json` | 9 | 2 |
| `scripts/test-node-file.mjs` | 17 | 0 |
| `scripts/test.py` | 67 | 0 |
| `stryker.config.json` | 36 | 0 |
| `tests/quality/gate_fixture.py` | 48 | 0 |
| `tests/quality/test_mutation_test_selection.py` | 24 | 0 |
| `tests/quality/test_node_test_selection.py` | 11 | 24 |
| `tests/quality/test_test_gate.py` | 93 | 0 |

## Checks

Commands below ran from the worktree root. Logs named without a directory are in this report's directory. Exit codes are the native process codes, captured separately from PowerShell's rendering of stderr as `NativeCommandError`; that rendering is not a failed test.

| Command | Exit | Result / evidence |
|---|---:|---|
| `node node_modules/npm/bin/npm-cli.js install --save-dev --save-exact @stryker-mutator/core@10.0.0 @stryker-mutator/tap-runner@10.0.0 --no-audit --ignore-scripts` | 0 | Added 144 packages; both requested dependencies exact. |
| `node node_modules/npm/bin/npm-cli.js install --no-audit --ignore-scripts` | 0 | Applied the scoped corrected `typed-rest-client` → `qs` override. |
| `python -m venv .runs/quality-venv` | 0 | Provisioned the README's local environment. |
| `.runs/quality-venv/Scripts/python.exe -m pip install --require-hashes -r requirements-quality.txt` | 0 | Pinned requirements installed. |
| `.runs/quality-venv/Scripts/ruff.exe --version` | 0 | `ruff 0.17.1`. |
| `.runs/quality-venv/Scripts/shellcheck.exe --version` | 0 | `version: 0.11.0`. |
| `npm test -- tests/quality/test_test_gate.py` | 1 → 0 | `focused-red.log`, `focused-green.log`: without executed-test guards, five assertions failed for empty Node/Python files, an empty suite and skipped-only files; restored guards pass all six tests. Other cases verify exact selection, sibling imports, no Python build, Node build before tests, no extra gate stages, missing/non-test paths, multiple files, import errors and failed tests. |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 1 → 0 | `mutation-selection-red.log`, `mutation-selection-green.log`: omitted `world.test.mjs` fails the set assertion; restored entry passes. |
| `node node_modules/npm/bin/npm-cli.js test -- tests/quality/test_node_test_selection.py` (red), then `npm test -- tests/quality/test_node_test_selection.py` (green) | 1 → 0 | `node-selection-red.log`, `node-selection-green.log`: temporarily replaced the view glob with the hex filename; the assertion named all seven omitted view files. Restored the gate before green and commit. Earlier green run also passed. |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | `quality.log`: all five quality checks pass, including unchanged D-33 comparison of the actual lockfiles and source lint/format checks. |
| `npm test -- tests/quality/test_audit_dependencies.py` | 0 | `audit-protection.log`: both existing refusal tests pass, including malformed responses and introduced advisories. |
| `npm test -- tests/sim/hex.test.mjs` | 0 | `node-focused.log`: actual project build then only the 13 hex tests. |
| `npm test -- tests/invariants/test_account_server_occupied_address.py` | 0 | `python-sibling.log`: one existing test imports its sibling `loop2_invariant_support` and passes; its own fixture builds its copy as before. The focused gate does not build the working-tree application. |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate 'src/browser/sim/hex.ts,src/browser/sim/game.ts,src/browser/sim/program.ts,src/browser/sim/data/campfire.ts' --cleanTempDir false` | 0 | Real tree execution; details below. |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `author-foundation.log`: 0 errors, run after staging new files so ownership and invariant test discovery included them. |
| `git diff --check` and `git diff --cached --check` | 0 | No whitespace errors. |
| `git check-ignore .stryker-tmp/sandbox-5PAEpl .runs/stryker/mutation.json stryker.log` | 0 | All three paths ignored. |

The Node summary probe used `npm --prefix .runs/task-cycles/mutation-testing-and-file-gate/reports/node-probe test -- empty.test.mjs` and the same command with `real.test.mjs`, both exit 0. These probe scripts were observational: an empty file produces a final summary counting the file as one test, while a real `node:test` case additionally produces a file-specific summary. The permanent gate tests exercise the rejection behavior through `npm test`.

Read-only lock comparison through Python and `git show 7012abc:package-lock.json` exited 0: 144 added package paths, zero removed paths and no changed version at any previously present package path. Installed core/tap-runner are 10.0.0, fast-uri is 3.1.9, and the scoped typed-rest-client dependency is qs 6.16.1; the unrelated existing qs remains 6.16.0. No `typescript-checker` package is installed or configured. No audit code or refusal expectation changed.

The lock comparison's reusable inspection is `python -B .runs/task-cycles/mutation-testing-and-file-gate/reports/inspect-lock.py`, run from the worktree root, exit 0. The script prints every changed version at an existing path, followed by removed/added path counts; its output contained only `removed_paths 0` and `added_paths 144`. It is a read-only inspection script, outside committed product files.

## Own-work check and mutation runtime

Weakest requirement: Stryker must operate in the real worktree without copying `.runs`, `.the-way` or stale `dist` output, and TypeScript 7 must compile its instrumented larger simulation modules. The real command above exercised that requirement rather than another archived copy.

The run found four source files and created 772 mutants. Its single logged build command succeeded; the initial TAP run covered the 18 explicitly listed test files. Final counts: 670 killed, 11 timed out, 87 survived, 4 without coverage, 0 errors; exit 0 after approximately 2 minutes 19 seconds. `data/campfire.ts` was among the instrumented files but produced no reported mutants. Survivor counts and sample locations are `game.ts` 59 (first at line 36), `hex.ts` 12 (first at line 30), `program.ts` 16 (first at line 43). The clear-text output and JSON both identify locations. These counts prove functioning execution and reporting, not test quality or acceptance of every survivor.

Read-only inspection found `.runs` and `.the-way` absent from `.stryker-tmp/sandbox-5PAEpl`, although both exist at the real root. The original `dist/server` exists but is absent from the sandbox; `dist/public/main.js` is regenerated by the browser compiler. Instrumented `src/browser/sim/game.ts` starts with `// @ts-nocheck`. This confirms the configured exclusions and successful instrumented compile. No product simulation file changed.

This was manual sandbox inspection, not an automated test: an interactive Python snippet compared `Path.exists()` at the real root and sandbox for `.runs`, `.the-way`, `dist/server` and `dist/public/main.js`, then read the first line of sandbox `src/browser/sim/game.ts`. The observed root/sandbox pairs were respectively `True/False`, `True/False`, `True/False` and `True/True`; the first line was `// @ts-nocheck`. The interpretation that browser output was regenerated additionally rests on the successful single build in `.runs/stryker/runtime.log` and the configuration excluding the original `dist` directory.

Generated mutation artifacts stay **outside the cycle record** and are not committed: `.runs/stryker/runtime.log`, `.runs/stryker/mutation.json`, `.stryker-tmp/sandbox-5PAEpl`. The runtime log was moved out of this report directory before handoff, so cycle archival cannot include it. The optional incremental output is configured as `.runs/stryker/incremental.json`; incremental mode is not enabled by default.

The author mentally mutated the changed build-tools behavior: removing no-test guards is killed by focused-test-execution; omitting a listed simulation test is killed by mutation-test-selection; omitting a full Node group is killed by node-test-selection; removing the Node build or running a neighboring file is killed by the actual-execution fixture. The fixture replaces only slow build and unrelated Python/foundation stages, while retaining the real npm entry point, gate scripts, Node runner and unittest loader.

## Foundation settlements — wording for the request

| Task row | Recorded at | One sentence in Polish |
|---|---|---|
| 1 | D-94 | Recenzent używa StrykerJS bez dodatku sprawdzającego typy na zmienionych plikach symulacji, a widok dołącza zmianą decyzji dopiero po błędzie rysunku lub list, który przejdzie przez testy i recenzję. |
| 2 | D-95 | Gdy poprawiona zależność nie usuwa ostrzeżenia wniesionego przez StrykerJS, usuwamy narzędzie i wracamy do sprawdzania mutacji w głowie autora, zachowując audyt. |
| 3 | D-77 | Pełny `npm test` pozostaje wymagany przed requestem, a wybór jednego pliku uruchamia tylko ten plik — Node po budowaniu, Python bez niego — bez kontroli fundamentu i bez nowego limitu całego przebiegu. |
| 4 | focused-test-execution | Zawężona bramka odmawia sukcesu dla pliku niebędącego testem i dla przebiegu bez wykonanego testu. |
| 5 | mutation-test-selection | Lista StrykerJS musi obejmować każdy plik `tests/sim/*.test.mjs` poza źródłowym sprawdzeniem `rules.test.mjs`. |
| 6 | stryker-simulation-execution + typescript-nocheck-support; both in D-94 Based on | Dwa fakty opisują razem uruchamianie `node:test` przez TAP w StrykerJS 10.0.0, pojedyncze budowanie przerobionych źródeł i przyjęcie oznaczenia `// @ts-nocheck` przez TypeScript 7.0.2. |

Row 6 was split with the orchestrator's C6 agreement because the foundation template requires separately changing source editions to be separate facts. The Stryker fact carries TAP support, instrumentation and one build during initialization; the TypeScript fact carries acceptance and emission. Neither clause of the accepted settlement was discarded. Sources are publisher files at immutable commits, with short verbatim passages and read date. The actual runtime above checks their composition in loop2. The new config belongs to build-tools; script/test paths were already covered by its globs. D-73, D-83 and D-33 remain binding without edits.

## Choices, alternatives and reaches

- Python owns the entry point because Python is already required for the full gate and can load one unittest module directly; a shell chain cannot route the argument, and a new dependency is unnecessary. No-argument stages preserve the previous order and commands, including stopping on the first failing stage. There is still no full-run timeout.
- Exact Python loading uses `importlib` plus `loadTestsFromModule`, with the file's directory and root on `sys.path`. `unittest discover -s <directory> -p <filename>` can also discover the same filename below a package directory; the fixture includes such a nested file to prove it is not selected. Using only `python -m unittest <path>` would break existing sibling imports. The cost is a small explicit loader instead of delegating discovery.
- Focused Node uses the documented `node:test` programmatic runner and reporter, preserving default process isolation. The child summary distinguishes actual test cases from the parent summary's empty-file count. Parsing human-readable output would couple success to formatting; disabling isolation would change the normal runner behavior. Empty files, empty suites and only skipped tests fail; TODO-only cases are excluded from the executed count too. This makes no-test success impossible under the observed runtime summaries.
- Chose the eligible Stryker 10.0.0 pair. Historical task context said npm release age 7; the effective pinned npm 12.2.1 configuration reports 6, while the global npm 11.13 query reports null. The orchestrator accepted C3: respect the effective setting without overriding it. 10.1.1 is too young; 10.0.0 and corrected fast-uri 3.1.9 are eligible. Choosing the historical setting silently would delay a permitted installation; bypassing the effective setting would violate the task.
- Scoped qs 6.16.1 under Stryker/core/typed-rest-client corrects its pinned vulnerable qs without changing the application dependency versions. Rejected a broad `npm audit fix` or audit relaxation. The existing audit passes with this corrected version, so D-95 does not require removing the tool.
- Chose `.stryker-tmp` plus ignored `.runs/stryker` outputs, fixed concurrency 4 and the direct compiler path. Putting the sandbox under `.runs` would need a different relative compiler path; unrestricted concurrency risks excessive timeout classifications. Stryker 10.0.0's own `Sandbox.init` confirms build occurs before node_modules linking, so the supplied direct-compiler approach remains necessary. Four workers trade speed for steadier results; timeouts remain visible for assessment.
- Explicit test list plus a set-equality invariant preserves the accepted exclusion and detects additions. A negated glob was not adopted because the task's probe did not establish its behavior. The runtime uses the real list, and the rewritten full gate test uses actual Node execution rather than reimplementing glob matching.
- Kept the whole-run recipe references (`as in unit test`) so all three levels inherit full and one-file commands. README's old direct directory-runner instruction was replaced with the supported one-file entry, as the orchestrator requested. No copied skill or process instruction was edited.
- Read beyond the supplied task: official Node 24.17.0 `node:test` summary/run documentation, Python 3.14 unittest/importlib documentation, npm package metadata, pinned Stryker 10.0.0 source/docs and TypeScript 7.0.2 publisher conformance baseline. These reads justified execution mechanics and immutable foundation citations. Public reads were unauthenticated and carried no owner identity, email or local path.
- TypeScript's npm repository metadata points at microsoft/TypeScript, where the published git head's compiler paths returned 404; the same head resolves in microsoft/typescript-go, the actual TypeScript 7 publisher source, whose conformance baseline is cited. This is source-location correction, not a version change.
- Foundation entries used the respective project decision, invariant, environment-fact and part-map methods. The testing template was read for placement and shape; maintenance of the guide remains this implementation cycle, not a new refinement. No open design choice or human permission remains.

## Limitations and supplied baseline

The orchestrator's pre-edit `npm test` exited 1: Node 343, agent-workflow 5 and deploy 65 passed; the invariant run had 168 tests and failed `test_loop2_one_serving_process.OneExpressProcessServesGameAndApi.setUpClass` because `Get-NetTCPConnection -State Listen` returned no matching CIM objects. The orchestrator independently reproduced that with a real listening TcpListener. No listener test was changed. The baseline's 32 quality tests also lacked the worktree's Ruff/ShellCheck executables; provisioning the pinned README environment fixes that local prerequisite and the focused quality check now passes. Baseline foundation was skipped by chaining; the orchestrator separately checked it before edits with exit 0, 0 errors. See `base-gate.log` and `base-install.log` for supplied evidence.

Unchecked by this author: the post-change full gate (reserved for orchestrator after review), other-platform runtime, exhaustive mutation of all simulation files, and individual classification or repair of the 87 calibration survivors. No simulation code changed, and repairing old test gaps or the task's 12 deferred findings is out of scope. Mutation evidence deliberately reports timeouts and no-coverage cases rather than interpreting a percentage as approval. No UI changed, so no rendered-appearance check applies.
