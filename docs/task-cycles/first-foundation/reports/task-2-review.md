# Spec Compliance: ❌ Issues found

Task quality: **Needs fixes**.

Reviewed immutable BASE `d5feaf9836347eb9fd8a5b86ce788151292855fd` to HEAD `a9021b8e95808549728246b392d001de3b00502c`. Read the supplied diff exactly once; no changed-file reread or diff regeneration. The two files and distinct invariant citations match the requested scope, but both sentence-derived deliberate breaks pass. The package classifier also embeds output-directory spelling prohibited by the dispatch.

⚠️ Diff limits: the existing build-output check and complete gate dispatch are unchanged and not independently revalidated. The implementer's reported full-suite runs were not repeated. Only the three mandated focused trials ran. The separate citations are visible in the diff; gate behavior outside it remains reported evidence.

## Critical

None.

## Important

### 1. Separate frontend application package is accepted — NEW THREAD

**Anchor:** `C:/Storage/repos/loop2-first-foundation/tests/invariants/test_application_package_layout.py:65` (classification conditions at lines 59–67).

**Ready to paste:** A separate `apps/frontend` npm package containing the actual browser sources, its own browser TypeScript config, a `browser` entry and `build: tsc -p tsconfig.json` passes this check. The package is accepted because neither its path nor generic build command matches the fixed names, despite explicit browser evidence. Follow the package's configuration and entry points when determining application ownership, while preserving the unrelated tooling control.

**Why this matters:** This check exists to prevent the browser or server acquiring its own application package, including outside the current source roots. The second scan only consults build-command substrings and a five-word directory vocabulary. `frontend` is a normal application directory name, not a disguised arbitrary identifier. A copy of the product browser source plus its browser compiler configuration gives concrete evidence that this is an application package. The test overlooks the manifest's `browser` entry and the config invoked by the build command. In the trial below, all files are staged in the disposable worktree, valid JSON loads, and the actual assertion method runs to `OK`; no import or dependency failure can explain the result. Expand evidence collection to include referenced local configs and application entry points, and resolve relevant paths relative to the owning package/config. Do not merely add `frontend` to the vocabulary: that preserves the same mechanism for another ordinary name. Keep the tooling package with its own TypeScript/build script passing.

### 2. Two spellings of the same output directory count as distinct — NEW THREAD

**Anchor:** `C:/Storage/repos/loop2-first-foundation/tests/invariants/test_application_build_layout.py:37` (same issue applies to rootDir at line 36).

**Ready to paste:** `outDir: dist/public` and `outDir: ./dist/public` refer to the same directory, but `len(set(outputs))` accepts them as two outputs. Changing only the server config to `./dist/public` leaves this test green while both sides emit into the browser directory. Compare resolved paths relative to each config, rather than their raw strings, for both rootDir and outDir.

**Why this matters:** The invariant is about distinct compilation/output locations. A set of JSON strings proves only distinct spelling. The deliberate break preserves both valid configs and their correct source roots, and merges the physical output directories using a perfectly valid relative-path spelling. The intended failure message `browser and server outDir must differ` never appears. This can allow generated server files into the browser output or cause collisions. Normalize and resolve actual directory identities before comparison; relative paths must use each config's directory as their base. This is a plan-mandated defect in the illustrative `len(set(outputs))` shape, not a reason to accept the defect. No fixed output-directory names are needed for the correction.

### 3. Package classification hardcodes output names — NEW THREAD

**Anchor:** `C:/Storage/repos/loop2-first-foundation/tests/invariants/test_application_package_layout.py:15` (used at lines 59–60).

**Ready to paste:** `dist/public` and `dist/server` are hardcoded as evidence of an application package even though the requirement explicitly forbids fixed output-directory spelling. Consequently a tooling build command mentioning its own relative `dist/public` directory is classified as application code, and a legitimate output rename leaves the classifier using stale paths. Read the actual application configurations and resolve referenced paths in the package's context instead of treating those two substrings as application identity.

**Why this matters:** This is a directly visible spec violation and a classifier correctness issue, not a naming preference. A command such as `tsc --outDir dist/public` executed inside `scripts/tooling` emits below that tooling package; it does not target the repository browser output. The substring check nevertheless makes `references_application` true and fails at line 65 without requiring any additional evidence. Conversely renamed application outputs are no longer recognized through that reference path. This mechanism is established from the diff; the three-trial budget was not expanded with a fourth execution. Derive current locations from tracked configuration and resolve command/config references in their actual directory context. This also avoids maintaining an undocumented second source of truth.

## Minor

None.

## Strengths

- `test_application_package_layout.py:23–24` and `test_application_build_layout.py:12–13` provide separate asserting tests and exact `application-package-layout/1` / `application-build-layout/1` citations.
- `test_application_package_layout.py:37–47` checks every source ancestor for package and npm lock files, instead of inspecting only the immediate source directory.
- `test_application_build_layout.py:16–30` checks that the named configs exist and their source trees are nonempty; it does not replace the existing execution-based build-output check.
- `test_application_package_layout.py:27–35` checks the root manifest/lock relationship against real file contents. The unrelated tooling control below passes even with its own TypeScript source and build script.
- The immutable diff contains exactly the two authorized Python files, 111 added lines, with no product mutation.

## Independent deliberate-break and control evidence

All trials started at detached HEAD `a9021b8e95808549728246b392d001de3b00502c` in their own worktrees under `C:/Storage/repos/loop2-first-foundation/.runs/`. Before creating a worktree, its full absolute path was checked to be a strict child of the resolved `.runs` directory and to not exist. `git check-ignore .runs/task2-review-package-break` confirmed the boundary is ignored. Before every `git worktree remove --force`, its existing resolved absolute path was checked again against that same strict prefix. Every removal returned 0 and `Test-Path` confirmed the trial directory no longer existed. No reviewed branch/index/HEAD or product files were changed.

### Trial A: separate application package

Directory: `C:/Storage/repos/loop2-first-foundation/.runs/task2-review-package-break`.

Mutation:

1. Copy the actual complete `src/browser` directory to `apps/frontend/src`.
2. Add and stage `apps/frontend/package.json`:

```json
{
  "name": "loop2-frontend",
  "private": true,
  "type": "module",
  "browser": "./dist/main.js",
  "scripts": { "build": "tsc -p tsconfig.json" },
  "devDependencies": { "typescript": "6.0.3" }
}
```

3. Copy `tsconfig.browser.json` to `apps/frontend/tsconfig.json`, preserving its browser compiler options and replacing `rootDir` with `src`, `outDir` with `dist`, and `include` with `["src/**/*.ts"]`.
4. Stage precisely `apps/frontend/package.json`, `apps/frontend/tsconfig.json` and `apps/frontend/src` in the disposable index.

Command: `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py -v`.

Exit: **0**, unexpectedly green. Output:

```text
test_application_uses_only_the_root_package (test_application_package_layout.ApplicationPackageLayout.test_application_uses_only_the_root_package) ... ok
Ran 1 test in 0.123s
OK
```

Expected intended assertion: `apps/frontend/package.json defines a separate application package`. No assertion fired. Valid files and the test body were executed; no setup/dependency exception occurred. This proves finding 1.

Cleanup: verified resolved path; `git worktree remove --force <above-directory>` exit 0; directory absent.

### Trial B: merged physical output directory

Directory: `C:/Storage/repos/loop2-first-foundation/.runs/task2-review-build-break`.

Mutation: byte-preserving replacement of `"outDir": "dist/server"` with `"outDir": "./dist/public"` in `tsconfig.server.json`. Browser `outDir` remains `dist/public`. Both configs are at the repository root, so the output paths identify the same directory. Source roots and includes remain valid and distinct.

Command: `python -B -m unittest discover -s tests/invariants -p test_application_build_layout.py -v`.

Exit: **0**, unexpectedly green. Output:

```text
test_browser_and_server_configs_are_distinct (test_application_build_layout.ApplicationBuildLayout.test_browser_and_server_configs_are_distinct) ... ok
Ran 1 test in 0.054s
OK
```

Expected intended assertion: `browser and server outDir must differ`. No assertion fired. No import, JSON or dependency error occurred. This proves finding 2.

Cleanup: verified resolved path; `git worktree remove --force <above-directory>` exit 0; directory absent.

### Trial C: unrelated tooling package control

Directory: `C:/Storage/repos/loop2-first-foundation/.runs/task2-review-tooling-control`.

Mutation: add and stage precisely these files:

`scripts/tooling/package.json`:

```json
{"name":"loop2-tooling","private":true,"scripts":{"build":"tsc -p tsconfig.json"}}
```

`scripts/tooling/main.ts`:

```typescript
export function formatLabel(value: string): string { return value.trim(); }
```

`scripts/tooling/tsconfig.json`:

```json
{"compilerOptions":{"outDir":"dist"},"include":["main.ts"]}
```

Command: `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py -v`.

Exit: **0**, expected green. Output:

```text
test_application_uses_only_the_root_package (test_application_package_layout.ApplicationPackageLayout.test_application_uses_only_the_root_package) ... ok
Ran 1 test in 0.102s
OK
```

No failure assertion expected or observed. This control confirms an unrelated package with its own compile step remains permitted.

Cleanup: verified resolved path; `git worktree remove --force <above-directory>` exit 0; directory absent.

## Focused unchanged-file inspection

- Risk: trial files might not be enumerated, and copied-worktree setup might require dependencies. Read `tests/invariants/loop2_invariant_support.py` once; `ROOT` is derived from the local test location, `listed_files()` enumerates cached and unignored files and filters existing files. The focused tests do not invoke the dependency/build helpers. Added trial files were explicitly staged to eliminate ambiguity.
- Risk: a merged-output mutation or copied application config could be invalid. Read `tsconfig.browser.json`, `tsconfig.server.json` and `package.json` once. Both configs reside at the root; the browser config targets DOM/ES2022 and emits to `dist/public`; the server emits to `dist/server`. The root uses TypeScript 6.0.3, retained in the trial package. No broad codebase crawl or network request was made.

## Assessment

**Spec Compliance: ❌. Task quality: Needs fixes.** The files are appropriately scoped and grounded in real tracked data, but they do not yet protect either invariant against the demonstrated ordinary regressions. Resolve the three Important findings and rerun the affected focused checks and the same deliberate-break/control scenarios before advancing.
