# Independent-assessment correction report

Model: GPT-6 (inherited session model).

## Changes and choices

Only the three authorized invariant checks are changed. Application ownership comes from the browser-view/account-server Files fields of foundations/part_map.md, resolved with Git attributes patterns just like the part-map guard; nested package/lock ancestors of owned files fail. Direct references and copied/independent browser entry checks remain; server source-byte inference is removed. The new foundation data read is annotated. TypeScript itself resolves the literal configurations and their source inclusion; resolved rootDir/outDir checks remain distinct. A sentinel planted in src/server is probed through /source/server alongside unchanged built assets, CWD and traversal probes.

Limitations: application ownership relies on the product's part map being maintained; prefixed static coverage is a concrete /source regression probe, not exhaustive enumeration of all conceivable mount prefixes. The compiler source-list query resolves inherited include/exclude/files but the existing rootDir/outDir assertions continue to inspect explicit values in the two literal configs.

## Focused unchanged-product verification

From C:/Storage/repos/loop2-first-foundation:
- `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py`: exit 0, 1 test OK.
- `python -B -m unittest discover -s tests/invariants -p test_application_build_layout.py`: exit 0, 1 test OK.
- `python -B -m unittest discover -s tests/invariants -p test_public_file_boundary.py`: exit 0, 1 test OK.

## Disposable trials

Each trial uses a detached worktree at C:/Storage/repos/loop2-first-foundation/.runs/assessment-fix-trial; its absolute path and git top-level are verified before mutation. Only the three corrected checks are copied from the actual worktree. node_modules is a junction to the installed dependencies; the junction is explicitly unlinked before worktree removal. New fixture files are staged by exact path. Every case restores its own modified bytes and deletes only its created files. No product application/foundation file is edited outside this disposable worktree.

Setup: `git worktree add --detach .runs/assessment-fix-trial HEAD` exit 0; `git rev-parse --show-toplevel` and `git rev-parse HEAD` verified the intended path and pre-dispatch commit. Python `_winapi.CreateJunction` linked installed dependencies.
### Distinct server assigned to account-server

Fixture files: packages/server/package.json, packages/server/tsconfig.json, packages/server/src/main.ts, foundations/part_map.md.

Command (disposable worktree): `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py`

Exit 1; expected 1.

```text
F
======================================================================
FAIL: test_application_uses_only_the_root_package (test_application_package_layout.ApplicationPackageLayout.test_application_uses_only_the_root_package)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\.runs\assessment-fix-trial\tests\invariants\test_application_package_layout.py", line 176, in test_application_uses_only_the_root_package
    self.assertNotIn((parent / filename).as_posix(), tracked,
    ~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                     f"{source} belongs to a separate application package")
                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: 'packages/server/package.json' unexpectedly found in {'foundations/environment_facts.md', '.claude/skills/the-way-record-environment-fact/SKILL.md', '.agents/skills/the-way-implement-task/SKILL.md', 'tests/invariants/test_application_package_layout.py', 'foundations/glossary.md', 'tests/invariants/test_account_server_runtime.py', 'tests/invariants/test_public_file_boundary.py', 'scripts/build.mjs', 'packages/server/src/main.ts', '.agents/skills/the-way-record-invariant/SKILL.md', '.claude/rules/the-way.md', 'src/server/main.ts', 'AGENTS.md', 'packages/server/package.json', '.claude/skills/the-way-refine-task/SKILL.md', '.claude/skills/the-way-implement-task/SKILL.md', 'tests/invariants/test_application_build_layout.py', '.claude/skills/the-way-update-part-map/SKILL.md', 'foundations/decisions.md', '.claude/skills/the-way-record-decision/SKILL.md', '.agents/skills/the-way-record-decision/SKILL.md', '.agents/skills/the-way-define-project/SKILL.md', '.agents/skills/the-way-critique/SKILL.md', '.gitignore', 'tests/invariants/test_browser_view_framework.py', '.claude/skills/the-way-define-project/SKILL.md', 'src/server/app.ts', 'packages/server/tsconfig.json', 'tests/invariants/test_account_server_occupied_address.py', 'tests/invariants/loop2_invariant_support.py', 'tests/invariants/test_account_server_express_http.py', 'tests/startup.test.mjs', 'tests/invariants/test_application_build_output.py', 'package.json', 'foundations/invariants.md', 'tsconfig.server.json', 'foundations/part_map.md', 'tests/invariants/test_account_server_typecheck.py', '.agents/skills/the-way-update-part-map/SKILL.md', '.claude/skills/the-way-record-glossary-term/SKILL.md', 'tests/invariants/test_loop2_api_error_route.py', '.agents/skills/the-way-record-environment-fact/SKILL.md', '.agents/skills/the-way-record-glossary-term/SKILL.md', '.agents/skills/the-way-find-foundation-entries/SKILL.md', '.agents/skills/the-way-refine-task/SKILL.md', '.claude/skills/the-way-find-foundation-entries/SKILL.md', 'src/browser/main.ts', 'tsconfig.browser.json', '.claude/skills/the-way-record-invariant/SKILL.md', 'tests/invariants/test_loop2_one_serving_process.py', 'README.md', 'package-lock.json', 'tests/http.test.mjs', '.claude/skills/the-way-critique/SKILL.md', '.claude/skills/the-way-settle-technology/SKILL.md', 'src/browser/index.html', '.gitmodules', '.agents/skills/the-way-settle-technology/SKILL.md'} : packages/server/package.json belongs to a separate application package

----------------------------------------------------------------------
Ran 1 test in 0.119s

FAILED (failures=1)
```

### Server-like tooling assigned to build-tools

Fixture files: tools/server-tool/package.json, tools/server-tool/tsconfig.json, tools/server-tool/src/main.ts, foundations/part_map.md.

Command (disposable worktree): `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py`

Exit 0; expected 0.

```text
.
----------------------------------------------------------------------
Ran 1 test in 0.122s

OK
```

### Copied frontend outside application roots

Fixture files: packages/frontend-copy/package.json, packages/frontend-copy/tsconfig.json, packages/frontend-copy/src/main.ts.

Command (disposable worktree): `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py`

Exit 1; expected 1.

```text
F
======================================================================
FAIL: test_application_uses_only_the_root_package (test_application_package_layout.ApplicationPackageLayout.test_application_uses_only_the_root_package)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\.runs\assessment-fix-trial\tests\invariants\test_application_package_layout.py", line 211, in test_application_uses_only_the_root_package
    self.assertFalse(references_application or
    ~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
                     builds_own_application,
                     ^^^^^^^^^^^^^^^^^^^^^^^
                     f"{package_path} defines a separate application package")
                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: True is not false : packages/frontend-copy/package.json defines a separate application package

----------------------------------------------------------------------
Ran 1 test in 0.148s

FAILED (failures=1)
```

### Independent frontend with HTML entry

Fixture files: packages/frontend/package.json, packages/frontend/tsconfig.json, packages/frontend/src/main.ts, packages/frontend/index.html.

Command (disposable worktree): `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py`

Exit 1; expected 1.

```text
F
======================================================================
FAIL: test_application_uses_only_the_root_package (test_application_package_layout.ApplicationPackageLayout.test_application_uses_only_the_root_package)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\.runs\assessment-fix-trial\tests\invariants\test_application_package_layout.py", line 211, in test_application_uses_only_the_root_package
    self.assertFalse(references_application or
    ~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
                     builds_own_application,
                     ^^^^^^^^^^^^^^^^^^^^^^^
                     f"{package_path} defines a separate application package")
                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: True is not false : packages/frontend/package.json defines a separate application package

----------------------------------------------------------------------
Ran 1 test in 0.120s

FAILED (failures=1)
```

### Browser tooling without application page

Fixture files: tools/browser-tool/package.json, tools/browser-tool/tsconfig.json, tools/browser-tool/src/main.ts.

Command (disposable worktree): `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py`

Exit 0; expected 0.

```text
.
----------------------------------------------------------------------
Ran 1 test in 0.100s

OK
```

### Misleading browser-copy include

Fixture files: tsconfig.browser.json, src/browser-copy/main.ts.

Command (disposable worktree): `python -B -m unittest discover -s tests/invariants -p test_application_build_layout.py`

Exit 1; expected 1.

```text
F
======================================================================
FAIL: test_browser_and_server_configs_are_distinct (test_application_build_layout.ApplicationBuildLayout.test_browser_and_server_configs_are_distinct)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\.runs\assessment-fix-trial\tests\invariants\test_application_build_layout.py", line 43, in test_browser_and_server_configs_are_distinct
    self.assertTrue(sources & included,
    ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^
                    f"{filename} does not include a tracked TypeScript source from {source}")
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: set() is not true : tsconfig.browser.json does not include a tracked TypeScript source from src/browser

----------------------------------------------------------------------
Ran 1 test in 1.243s

FAILED (failures=1)
```

### Merged physical output directories

Fixture files: tsconfig.server.json.

Command (disposable worktree): `python -B -m unittest discover -s tests/invariants -p test_application_build_layout.py`

Exit 1; expected 1.

```text
F
======================================================================
FAIL: test_browser_and_server_configs_are_distinct (test_application_build_layout.ApplicationBuildLayout.test_browser_and_server_configs_are_distinct)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\.runs\assessment-fix-trial\tests\invariants\test_application_build_layout.py", line 58, in test_browser_and_server_configs_are_distinct
    self.assertEqual(len(resolved_outputs), 2, "browser and server outDir must differ")
    ~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: 1 != 2 : browser and server outDir must differ

----------------------------------------------------------------------
Ran 1 test in 2.373s

FAILED (failures=1)
```

### Additional source static root under URL prefix

Fixture files: src/server/app.ts.

Command (disposable worktree): `python -B -m unittest discover -s tests/invariants -p test_public_file_boundary.py`

Exit 1; expected 1.

```text
F
======================================================================
FAIL: test_only_built_public_files_are_served_from_a_foreign_working_directory (test_public_file_boundary.PublicFileBoundary.test_only_built_public_files_are_served_from_a_foreign_working_directory) (outside='/source/server/outside-public.txt')
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\.runs\assessment-fix-trial\tests\invariants\test_public_file_boundary.py", line 45, in test_only_built_public_files_are_served_from_a_foreign_working_directory
    self.assertNotIn(marker, body)
    ~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^
AssertionError: b'loop2-invariant-outside-public-asset' unexpectedly found in b'loop2-invariant-outside-public-asset'

----------------------------------------------------------------------
Ran 1 test in 9.074s

FAILED (failures=1)
```

Cleanup: verified disposable absolute path and git top-level, unlinked node_modules junction using `os.rmdir`, then `git worktree remove --force .runs/assessment-fix-trial` exit 0.

## Trial fixtures in detail

- Distinct server: packages/server/package.json has type=module, main=dist/main.js, build=tsc -p tsconfig.json; tsconfig has rootDir=src, outDir=dist and src/**/*.ts; src/main.ts imports node:http createServer and starts an independent response handler. The disposable part map adds packages/server/** to account-server. It fails at the explicit separate-application-package ancestor assertion.
- Server tooling uses the same independent main/build/source structure under tools/server-tool and assigns tools/server-tool/** to build-tools; it passes.
- Copied frontend uses the exact current browser main source in packages/frontend-copy with its own browser entry/build/config; it fails. Independent frontend uses distinct document.body source and an index.html script pointing to dist/main.js; it fails. Browser tooling has the independent source/build/browser entry with no application page; it passes.
- Misleading include changes only the browser include to src/browser-copy/**/*.ts and adds/stages a real source in that tree; the expected own-root source-inclusion assertion fails.
- Merged output changes server outDir to dist/public/../public, preserving distinct spelling but resolving to the browser output; the expected outDir assertion fails.
- Additional static root retains app.use(express.static(publicDirectory)) and adds app.use('/source', express.static(fileURLToPath(new URL('../../src/', import.meta.url)))). The focused test fails specifically because /source/server/outside-public.txt returns the planted outside marker bytes.

## Full verification

- `npm test`: exit 0; 5 tests pass, 0 failures/skips. Includes build, foreign CWD serving, API errors, missing routes, traversal and occupied address.
- `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/assessment-fix-invariant-tests.jsonl`: exit 0; 35 tests pass in 86.996 seconds, no skipped test. Ran once after implementation.
- `git diff --check`: exit 0. Git emitted only the pre-existing autocrlf conversion notice for these LF working files. Rewrites preserve the original working-file line endings.
- `git status --short`: exactly the three authorized checks modified; no application/foundation/shared-support changes.
- Branch is task/first-foundation with no upstream configured.

## Self-review

Reviewed the complete three-file diff and final files for scope, assertion causes and cleanup. Every negative trial failed at its intended assertion, and both tooling controls stayed green. Existing built-byte/CWD/traversal assertions and server stop in finally remain intact. Newly read foundation data is annotated. No review blocker found. Clarified one comment after the gate to describe browser fallback separately from explicit server ownership; no executable statement changed after the gate. No TDD sequence was mandated; deliberate regression probes are recorded above rather than claimed as a pre-implementation red run. The scope limitations are stated under Choices above for the independent reviewer.

Gate records verified: 35/35 pass, no null identifier. Invariants retained: account-server-express-http/1, account-server-occupied-address/1, account-server-runtime/1, account-server-typecheck/1, application-build-layout/1, application-build-output/1, application-package-layout/1, browser-view-framework/1, loop2-api-error-route/1, loop2-one-serving-process/1, public-file-boundary/1.

## Commit

`git add -- tests/invariants/test_application_package_layout.py tests/invariants/test_application_build_layout.py tests/invariants/test_public_file_boundary.py` exit 0.

`git commit -m 'test: strengthen application layout and public boundary invariants'` exit 0.

Commit: b92a87e733a7669c9a8a7b1ded5a3f648f5beb64. Post-commit `git status --short` is empty. The ignored report and .runs gate record remain available.
