# Independent assessment of the final foundation candidate

Assessed product range `44294da228ab8c27dfd1683f931f59f8d7f8d29d..b92a87e733a7669c9a8a7b1ded5a3f648f5beb64`, filtered to the eight paths named in the assessment prompt. No task, project definition, specification, plan, cycle record, implementation report, review report or author reasoning was read.

## Observations

### 1. `public-file-boundary/1` has a verified false negative

- **Where:** `foundations/invariants.md:97`; `tests/invariants/test_public_file_boundary.py:39-47`.
- **What was checked:** The sentence promises that the server serves static files *only* from `dist/public`. The check requests a fixed list of unprefixed paths plus `/source/server/outside-public.txt`. In a disposable `TreeCopy`, I added a second static mount before the public mount:

  ```typescript
  app.use('/leak', express.static(fileURLToPath(new URL('../../', import.meta.url))));
  ```

  The mutated application built successfully. It exposes repository files outside `dist/public` (for example `/leak/package.json`), but the new invariant test completed with `failures=0 errors=0`, because none of its requests use `/leak`.
- **Consequence:** A change to `src/server/**` can add another static root under any unprobed URL prefix, violate the binding sentence, and still receive a passing verdict from this check. The existing planted files make the current probes strong against the roots they name, but do not establish the word “only.”
- **Necessary correction:** Make the check fail when any additional static mount serves a directory outside `dist/public`. That requires a mechanism which enumerates or instruments all static mounts/roots, or a source-level rule that constrains every `express.static` registration. If the intended method remains a finite set of HTTP probes, narrow the invariant sentence to exactly the boundary those probes establish.

### 2. `application-build-layout/1` rejects layouts its sentence permits, and its new test can be cut

- **Where:** `foundations/invariants.md:87`; `tests/invariants/test_application_build_layout.py:24-36`, `tests/invariants/test_application_build_layout.py:49-58`.
- **What was checked:** The invariant requires distinct TypeScript compilation configurations and distinct output directories. The check additionally requires each JSON file to contain `compilerOptions.rootDir` and `compilerOptions.outDir` directly and requires the two `rootDir` values to differ.
  - In a disposable copy, each root config extended its own base config containing the original, distinct effective `rootDir` and `outDir`. TypeScript successfully resolved the configs and their included files, after which the check errored with `KeyError: 'compilerOptions'` at the raw-JSON lookup.
  - In another disposable copy, both configs used `rootDir: "."`, kept separate includes and separate output directories, and remained distinct configurations. The check failed with `browser and server rootDir must differ`.
- **Consequence:** A valid refactor to inherited TypeScript configuration, or to a shared source root with separate includes and outputs, is blocked even though the invariant remains true. The check therefore turns unrecorded layout details into foundation rules.
- **Cheaper existing mechanism:** `tests/invariants/test_application_build_output.py:36-40` already names both configs, source roots and distinct output roots. Its tests at `tests/invariants/test_application_build_output.py:139-189` prove that the build compiles both sides into those outputs and that the compiler environments stay separate. The pinned runner permits one test method to cite multiple invariants (`.the-way/gate/run_tests.py:13-23`).
- **Necessary correction:** Delete `tests/invariants/test_application_build_layout.py`, remove its ownership row at `foundations/part_map.md:45`, and cite `application-build-layout/1` from the existing output/separation tests. If a dedicated check is kept, read TypeScript’s resolved compiler options and remove the distinct-`rootDir` assertion. The whole new test file is the part of this change that can be cut.

## Checks with no concern

- **`application-package-layout/1`:** `tests/invariants/test_application_package_layout.py:154-214` checks the root manifest and lockfile, rejects package files above application sources selected through the part map, and examines other tracked package manifests for references to the application. The unchanged-tree test passed. I found no concrete false positive or false negative in the assessed mechanism.
- **`account-server-occupied-address/1`:** `tests/invariants/test_account_server_occupied_address.py:18-55` proves normal launch before and after the occupied-address case, holds the exact listening address, requires non-zero exit, rejects the readiness line and checks that the blocker retained the address. The unchanged-tree test passed. This matches `foundations/invariants.md:107`.
- **Three decision versions:** `foundations/decisions.md:143-194` appends versions 2 in order; all three binding parts are byte-for-byte unchanged from version 1 and use `Change: unchanged sentences`. D-04/2 narrows only the example, D-05/2 adds only an origin, and D-06/2 adds the two new derived invariant identifiers. The decision guard found no issue besides the three expected `<request link>` approval placeholders.
- **Recovered rows:** `foundations/invariants.md:129-130` has the required current identifiers and versions. Current `README.md:21-27`, `tests/http.test.mjs:53-98`, `tests/startup.test.mjs:7-34`, and the named code history support the two behaviours and show that they predate this foundation change. The invariant guard accepted both rows.
- **npm prerequisite and shared support:** `foundations/invariants.md:3` matches `README.md:9` and the actual failure raised by `tests/invariants/loop2_invariant_support.py:173-176` when `node_modules` is absent. The new foreign-working-directory launch path at `tests/invariants/loop2_invariant_support.py:225-250` executes the built entry by absolute path and leaves process-tree cleanup intact. I found no concern in this shared change.
- **Part-map ownership:** `foundations/part_map.md:23-24` assigns the server-behaviour checks to `account-server`; `foundations/part_map.md:44-45` assigns the build-layout checks to `build-tools`; the shared helper remains owned by `build-tools`. The part-map guard found no ownership/form issue. The dependency graph remains unchecked because the product declares no graph-report command, as stated in the assessment prompt.

## Source fidelity unavailable, without a demonstrated contradiction

- `foundations/decisions.md:155` and `foundations/decisions.md:172` point to vault concept/project-definition sources. The assessment prompt forbids reading the project definition, specification and plan, so I could not verify those citations against their source. D-04/2 repeats the existing origin; D-05/2 introduces the origin. Nothing in the allowed product material demonstrates a contradiction.
- The recovered rows also cite a historical proposal report and PR review units. The prompt forbids implementation/review reports, so those citations were not opened. The allowed current product files and their named history independently support both recovered behaviours; the unavailable citations are therefore unverified source fidelity, not evidence of contradiction.

## Focused execution evidence

- `test_application_build_layout.py`: pass on the unchanged tree.
- `test_application_package_layout.py`: pass on the unchanged tree.
- `test_public_file_boundary.py`: pass on the unchanged tree; also (incorrectly) pass on the disposable extra-static-root mutation described above.
- `test_account_server_occupied_address.py`: pass on the unchanged tree.
- Decision guard: only the three known approval-placeholder errors/warnings.
- Invariant guard: 0 errors, 0 warnings, 0 unchecked.
- Part-map guard: 0 errors, 0 warnings, dependency graph 1 unchecked.

The full invariant suite was not run; the focused executions above were sufficient to verify the two named mechanisms.
