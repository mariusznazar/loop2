# Task 2 implementation report

## Scope and model

- Model: Codex GPT-6.
- Worktree: `C:/Storage/repos/loop2-first-foundation`, branch `task/first-foundation`.
- BASE: `d5feaf9836347eb9fd8a5b86ce788151292855fd`.
- HEAD: `a9021b8e95808549728246b392d001de3b00502c` (`test: protect application package and compiler layout`).
- Pinned `.the-way`: `7cfeb4c2349b181d251d1a03cb2005b980acbe9e`, matching the gitlink.
- Changed files: `tests/invariants/test_application_package_layout.py`, `tests/invariants/test_application_build_layout.py`. This report is ignored.

## Implementation and classification

The package check requires the root manifest and lockfile, matches the lockfile's root package name, requires TypeScript sources under both application roots, and rejects package manifests or npm lockfiles along those sources' ancestor paths. It also inspects every tracked nested `package.json` outside those roots. A nested package is classified as a separate application package when a build script names either application's source, config, or output, or when a build script and TypeScript source occur under a browser/server/client/web/api directory. An unrelated tooling package such as `scripts/tooling/package.json` has neither application evidence and remains allowed. No other manifests or npm lockfiles are currently tracked; the root `package.json` and `package-lock.json` are the complete current set.

The compiler check reads the two literal config files, requires each to include its own nonempty TypeScript source tree, requires both `rootDir` and `outDir`, and requires the browser and server values to differ. The existing output check remains responsible for proving that the application build actually compiles both sides.

The nested-package classification uses evidence visible in tracked paths and build commands. A deliberately disguised application package with an arbitrary directory name and generic build command may escape this static check; the independent reviewer should consider this when choosing the separate-package break. The check does reject the ordinary `apps/browser` or `apps/server` package layout and direct application source/config references while allowing the tooling control.

## Review correction

The independent review at `.superpowers/sdd/plan/task-2-review.md` found three Important defects in commit `a9021b8`: an `apps/frontend` application package passed, equivalent output paths passed, and fixed output-name substrings could reject unrelated tooling. Fix commit `4d540b8063f492b841dd09a8fea96f42ca9d2f78` (`test: recognize application packages and resolved compiler paths`) changes only the same two check files.

The package check now reads the current application configs to derive their source and output paths, resolves build-script path references relative to each package, and follows a package's local `tsc -p` config. It recognizes browser packages from their `browser` entry, browser-oriented config or HTML source, build command, and own TypeScript source; server packages use their `main` entry and Express dependency with a build command and own TypeScript source. It no longer treats the literal text `dist/public` or `dist/server` as application identity. The compiler check resolves `rootDir` and `outDir` relative to each config before comparing directories.

### Covering runs after the fix

| Trial | Command | Exit | Relevant output |
|---|---|---:|---|
| Unchanged package | `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py -v` | 0 | 1 test, `OK` |
| Unchanged compiler | `python -B -m unittest discover -s tests/invariants -p test_application_build_layout.py -v` | 0 | 1 test, `OK` |
| Separate `apps/frontend` package | Same package command in `.runs/task2-fix-package-break` | 1 | `AssertionError: True is not false : apps/frontend/package.json defines a separate application package`; `FAILED (failures=1)` |
| Server `outDir: ./dist/public` | Same compiler command in `.runs/task2-fix-build-break` | 1 | `AssertionError: 1 != 2 : browser and server outDir must differ`; `FAILED (failures=1)` |
| Unrelated `scripts/tooling` package whose build uses its own `dist/public` | Same package command in `.runs/task2-fix-tooling-control` | 0 | 1 test, `OK` |

Each trial used a detached disposable worktree at the original reviewed commit with the corrected check copied in. The package break copied the actual browser sources into `apps/frontend/src`, added its browser entry, generic `tsc -p tsconfig.json` build, and matching local config, then staged those files. The output break changed only the server `outDir` spelling. The tooling control staged a TypeScript source, local config, and generic build with `--outDir dist/public` under `scripts/tooling`. Every worktree path was checked as an absent strict child of `.runs` before creation and as an existing strict child before `git worktree remove --force`. All three removals returned 0 and the paths were absent afterward. The two red results are assertion failures for the intended invariant, with no import or dependency errors. `npm test` and the full gate were not rerun because the correction changes only these two static checks; both focused checks and all review mutations ran.

Post-fix self-review: `git diff --check`, `git diff --cached --check`, and `git show --format= --check HEAD` all returned 0. The explicit-path commit contains only the two authorized checks and the branch worktree is clean. The earlier broad concern about an ordinary frontend package is resolved by the reproduced break; the remaining limit is that static checks cannot infer an application role from a package that exposes no relevant entry, configuration, source, or build evidence.

## Review correction, round 2

Re-review `.superpowers/sdd/plan/task-2-rereview-1.md` accepted all three original fixes but found a false positive: browser-facing tooling with its own `browser` entry, DOM config and TypeScript source was rejected. Commit `e9fcea3a6cffa83dd25c795eb2f54bd9fd7d0412` (`test: distinguish application source from browser tooling`) changes only `tests/invariants/test_application_package_layout.py`.

The nested-package rule now requires an application-specific relationship. It still rejects build commands whose resolved paths target this application's current configs, source roots, or outputs. For a locally built package, it follows the package's build-selected TypeScript config, resolves its entry under that config's output directory, and requires at least one TypeScript source at the corresponding relative path to have the same bytes as the current browser or server application's source. A browser entry, DOM typing, Express dependency, or generic TypeScript build alone no longer identifies a package as this application. This is deliberately static: a newly rewritten application package with no reference to existing source or output may not be identifiable from manifest/config structure alone.

### Covering runs after round 2

| Trial | Command | Exit | Relevant output |
|---|---|---:|---|
| Unchanged package | `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py -v` | 0 | 1 test, `OK` |
| Unchanged compiler | `python -B -m unittest discover -s tests/invariants -p test_application_build_layout.py -v` | 0 | 1 test, `OK` |
| Copied application source in `apps/frontend` | Package command in `.runs/task2-fix2-package-break` | 1 | `AssertionError: True is not false : apps/frontend/package.json defines a separate application package`; `FAILED (failures=1)` |
| Browser-facing helper in `scripts/tooling` | Package command in `.runs/task2-fix2-browser-tooling-control` | 0 | 1 test, `OK` |

The package break repeated the review's copied `src/browser` tree, `browser: ./dist/main.js`, generic `tsc -p tsconfig.json` build and local browser config; its files were staged in the disposable index. The new tooling control staged its own `main.ts`, `browser: ./dist/main.js`, generic build, and DOM-enabled local config whose output stays under `scripts/tooling`. Each trial started at detached `4d540b8` with the corrected check copied in. Each worktree path was checked to be an absent strict child of `.runs` before creation and an existing strict child before removal. Both `git worktree remove --force` calls exited 0 and both paths were absent afterward. The red case failed on the intended assertion, without an import or dependency error. The earlier merged-output correction was unchanged; its focused check passed on the unchanged product.

Self-review after round 2: `git diff --check`, `git diff --cached --check`, and `git show --format= --check HEAD` returned 0. The fix commit contains only the authorized package check, and the branch worktree is clean. `npm test` and the full invariant gate were not repeated because this round changed only the static package classifier; the focused checks and the two relevant mutation scenarios ran.

## Review correction, round 3

Re-review `.superpowers/sdd/plan/task-2-rereview-2.md` accepted the browser-tooling control but found that a separate frontend with independently written source and an application HTML page passed. Commit `1885c1de04d447716673632c6cf463748a0694d6` (`test: identify separate browser application pages`) changes only `tests/invariants/test_application_package_layout.py`.

The package check now resolves a package's `browser` entry against its own compiler output and requires a corresponding TypeScript source. It then recognizes an application when that package has its own tracked `index.html` at the package root or source root, or when the corresponding source is a copy of this application's source. Thus the page and compiled entry jointly identify a separate browser application without requiring byte-identical source. A browser-targeted helper with no application page and no copied application source remains permitted. The application output directories continue to come from the current configs; no output spelling is hardcoded in classification.

### Covering runs after round 3

| Trial | Exact command | Exit | Relevant output |
|---|---|---:|---|
| Unchanged product | `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py -v` | 0 | `Ran 1 test`; `OK` |
| Independently written frontend | Same command in `.runs/task2-fix3-original-frontend` | 1 | `AssertionError: True is not false : apps/frontend/package.json defines a separate application package`; `FAILED (failures=1)` |
| Copied browser application | Same command in `.runs/task2-fix3-copied-frontend` | 1 | `AssertionError: True is not false : apps/frontend/package.json defines a separate application package`; `FAILED (failures=1)` |
| Browser-facing tooling | Same command in `.runs/task2-fix3-browser-tooling` | 0 | `Ran 1 test`; `OK` |

The independent frontend trial staged `apps/frontend/src/main.ts` with original DOM code, `apps/frontend/index.html` with a script entry, a `browser: ./dist/main.js` manifest and `tsc -p tsconfig.json` build, and a local DOM config emitting `src/main.ts` to `dist/main.js`. The copied trial staged the actual browser source tree, its local config, and the same browser entry/build. The tooling trial staged `scripts/tooling/main.ts`, a browser entry, generic TypeScript build and DOM config, but no application page. All three trials started as detached worktrees at `e9fcea3`, with the corrected check copied in. Each target path was verified as an absent strict child of `.runs` before creation and an existing strict child before `git worktree remove --force`. All removals exited 0 and all paths were absent afterward. The two red results were intended assertion failures, with no import or dependency error.

Self-review: `git diff --check`, `git diff --cached --check`, and `git show --format= --check HEAD` returned 0. The explicit-path fix commit contains only the package check and the branch worktree is clean. The compiler-layout check was untouched and its resolved-path deliberate break remains covered by the round-1 trial. `npm test` and the full gate were not rerun for this static package-check correction.

## Verification

`npm ci` was already complete in this worktree before dispatch; it was not rerun.

| Command | Exit | Result |
|---|---:|---|
| `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py -v` | 0 | 1 test, `OK` |
| `python -B -m unittest discover -s tests/invariants -p test_application_build_layout.py -v` | 0 | 1 test, `OK` |
| `npm test` | 0 | Build succeeded; 5 tests passed, 0 failed |
| `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl` | 0 | 33 tests, `OK`; 33 recorded `pass` verdicts |
| `git diff --cached --check` | 0 | No whitespace errors before commit |
| `git show --format= --check HEAD` | 0 | No whitespace errors in commit |

The gate record contains no named intermediate error for `public-file-boundary/1` or `account-server-occupied-address/1`: those two check files are not written yet, so no verdict for either sentence was established by this run. The 33 passing checks include the two Task 2 checks and existing checks only. No deliberate break was made here; a separate reviewer owns those runs.

## Self-review

Reviewed the committed diff and working-tree status after commit. The commit contains exactly the two authorized check files, both cite their invariant identifiers, and the working tree is clean. Root data files and config data files have annotations. The checks read tracked working-tree paths through `listed_files()` and do not alter product files. The static nested-package classification limitation above is the only concern.

## Review correction, round 4

BASE: `1885c1de04d447716673632c6cf463748a0694d6`. Only `tests/invariants/test_application_package_layout.py` changed. The compiler check is unchanged.

The tracked page must now actually load the package browser entry through a script source URL. HTMLParser reads script elements (ignoring comments and ordinary text); URL resolution follows the first base URL, relative path segments, encoded file paths, and query/fragment suffixes. External URLs do not match local entries. Copied application source remains independent evidence. No output spelling is used as package identity.

Unchanged product: `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py -v` returned 0, `Ran 1 test`, `OK`.

Each following trial used a detached disposable worktree at BASE under `.runs/task2-fix4-<trial>`, with only the corrected package check copied in before its fixture was created. Both absent targets before creation and existing targets before removal were resolved and checked as strict descendants of the intended `.runs` directory. Every `git worktree remove --force <verified-path>` returned 0; every directory was absent afterward.

Frontend fixtures use `apps/frontend`, a browser entry, `tsc -p tsconfig.json`, and a local source/output config. The copied fixture copies the actual browser source. The original fixture uses separately written TypeScript and a page loading `./dist/../dist/main.js?build=1#boot`. Tooling fixtures use their own TypeScript source and DOM config under `scripts/tooling`; the no-page case has no HTML, the unrelated-page case loads `fixture.js` and only mentions the actual entry in an HTML comment, and the third tooling case repeats that unrelated page with its own output named `dist/public`. Output mutations set the server output to `dist/public` or `./dist/public` respectively. New package fixtures were staged by explicit directory path only in disposable indexes.

### Trial: copied-frontend

Command: `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py -v`

Exit: 1

```text
test_application_uses_only_the_root_package (test_application_package_layout.ApplicationPackageLayout.test_application_uses_only_the_root_package) ... FAIL

======================================================================
FAIL: test_application_uses_only_the_root_package (test_application_package_layout.ApplicationPackageLayout.test_application_uses_only_the_root_package)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\.runs\task2-fix4-copied-frontend\tests\invariants\test_application_package_layout.py", line 168, in test_application_uses_only_the_root_package
    self.assertFalse(references_application or
    ~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
                     builds_own_application,
                     ^^^^^^^^^^^^^^^^^^^^^^^
                     f"{package_path} defines a separate application package")
                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: True is not false : apps/frontend/package.json defines a separate application package

----------------------------------------------------------------------
Ran 1 test in 0.081s

FAILED (failures=1)
```

### Trial: original-frontend

Command: `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py -v`

Exit: 1

```text
test_application_uses_only_the_root_package (test_application_package_layout.ApplicationPackageLayout.test_application_uses_only_the_root_package) ... FAIL

======================================================================
FAIL: test_application_uses_only_the_root_package (test_application_package_layout.ApplicationPackageLayout.test_application_uses_only_the_root_package)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\.runs\task2-fix4-original-frontend\tests\invariants\test_application_package_layout.py", line 168, in test_application_uses_only_the_root_package
    self.assertFalse(references_application or
    ~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
                     builds_own_application,
                     ^^^^^^^^^^^^^^^^^^^^^^^
                     f"{package_path} defines a separate application package")
                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: True is not false : apps/frontend/package.json defines a separate application package

----------------------------------------------------------------------
Ran 1 test in 0.076s

FAILED (failures=1)
```

### Trial: tooling-no-page

Command: `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py -v`

Exit: 0

```text
test_application_uses_only_the_root_package (test_application_package_layout.ApplicationPackageLayout.test_application_uses_only_the_root_package) ... ok

----------------------------------------------------------------------
Ran 1 test in 0.068s

OK
```

### Trial: tooling-unrelated-page

Command: `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py -v`

Exit: 0

```text
test_application_uses_only_the_root_package (test_application_package_layout.ApplicationPackageLayout.test_application_uses_only_the_root_package) ... ok

----------------------------------------------------------------------
Ran 1 test in 0.080s

OK
```

### Trial: tooling-dist-public

Command: `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py -v`

Exit: 0

```text
test_application_uses_only_the_root_package (test_application_package_layout.ApplicationPackageLayout.test_application_uses_only_the_root_package) ... ok

----------------------------------------------------------------------
Ran 1 test in 0.091s

OK
```

### Trial: merged-output-exact

Command: `python -B -m unittest discover -s tests/invariants -p test_application_build_layout.py -v`

Exit: 1

```text
test_browser_and_server_configs_are_distinct (test_application_build_layout.ApplicationBuildLayout.test_browser_and_server_configs_are_distinct) ... FAIL

======================================================================
FAIL: test_browser_and_server_configs_are_distinct (test_application_build_layout.ApplicationBuildLayout.test_browser_and_server_configs_are_distinct)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\.runs\task2-fix4-merged-output-exact\tests\invariants\test_application_build_layout.py", line 43, in test_browser_and_server_configs_are_distinct
    self.assertEqual(len(resolved_outputs), 2, "browser and server outDir must differ")
    ~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: 1 != 2 : browser and server outDir must differ

----------------------------------------------------------------------
Ran 1 test in 0.051s

FAILED (failures=1)
```

### Trial: merged-output-dot

Command: `python -B -m unittest discover -s tests/invariants -p test_application_build_layout.py -v`

Exit: 1

```text
test_browser_and_server_configs_are_distinct (test_application_build_layout.ApplicationBuildLayout.test_browser_and_server_configs_are_distinct) ... FAIL

======================================================================
FAIL: test_browser_and_server_configs_are_distinct (test_application_build_layout.ApplicationBuildLayout.test_browser_and_server_configs_are_distinct)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "C:\Storage\repos\loop2-first-foundation\.runs\task2-fix4-merged-output-dot\tests\invariants\test_application_build_layout.py", line 43, in test_browser_and_server_configs_are_distinct
    self.assertEqual(len(resolved_outputs), 2, "browser and server outDir must differ")
    ~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: 1 != 2 : browser and server outDir must differ

----------------------------------------------------------------------
Ran 1 test in 0.054s

FAILED (failures=1)
```

Every red trial failed through its intended invariant assertion, with no setup/import/dependency failure. All three tooling controls passed.

Self-review: read the complete fix diff. The only behavioral change replaces page existence with a parsed script-to-entry relationship; existing source-copy and application-path evidence is preserved. The page parser does not execute JavaScript or infer dynamic imports or web-server URL mappings: those remain outside this static check. No additional requirement or known failure remains among the dispatched scenarios. `git diff --check` returned 0; the only tracked changed path is the authorized package check. No branch upstream is configured. The full suite, npm test, and the gate were not rerun for this focused static-check correction; the unchanged compiler check was exercised by both output mutations.

Fix commit: `782f76e9602722dfa20ec3cf7c714679208b9d72` (`test: require browser page linkage to package entry`). Staged explicitly with `git add -- tests/invariants/test_application_package_layout.py`. `git diff --cached --check` and `git show --format= --check HEAD` both returned 0. Post-commit `git status --short` was empty. This ignored report is the only additional persistent write.
