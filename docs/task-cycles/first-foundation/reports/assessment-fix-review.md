# Independent review of the assessment correction

Spec Compliance: ✅ Spec compliant.

Task quality: Approved.

Review range: `877821a0fd945449b71a3aed666675dfec1c519f` → `b92a87e733a7669c9a8a7b1ded5a3f648f5beb64`.

The three requested corrections are present. The independent trials below demonstrate rejection of an independently implemented server package, a literal browser configuration that excludes its own source, and an additional source static root. The same independent package assigned to tooling passes. No Critical, Important or Minor code finding remains.

## Issues

### Critical

None.

### Important

None.

### Minor

None.

## Strengths

- `C:/Storage/repos/loop2-first-foundation/tests/invariants/test_application_package_layout.py:23`: ownership is read from the actual part map and evaluated with Git attribute patterns. The independent server trial fails at line 176 despite its source having no copied application bytes. Changing its ownership to build-tools makes the check pass.
- `C:/Storage/repos/loop2-first-foundation/tests/invariants/test_application_package_layout.py:106`: the browser entry path preserves the previous copied-source/HTML-entry reasoning. The removal is specifically the server byte-comparison inference; direct application-path references and the existing application-root checks remain.
- `C:/Storage/repos/loop2-first-foundation/tests/invariants/test_application_build_layout.py:25`: TypeScript resolves the actual source list. The assertion at line 43 catches exclusion of the browser's tracked source even though the include list still names the browser directory. Physical output comparison remains at line 58.
- `C:/Storage/repos/loop2-first-foundation/tests/invariants/test_public_file_boundary.py:29`: the new planted source marker is exercised through an actual built server and HTTP request. The failure occurs at line 46 with the marker present in the response. The existing public-byte, foreign-CWD and traversal checks, and server cleanup in finally, remain.

## Independent derivation and evidence

I read the three binding sentences in `C:/Storage/repos/loop2-first-foundation/foundations/invariants.md` before the immutable diff and author report. From those sentences I derived these cases:

1. A separately buildable server with its own manifest and main entry violates the single-package sentence even when it does not copy existing application source.
2. A config that names browser source in include but excludes all of it does not compile the browser's source; directory-name matching is insufficient.
3. Keeping the built-public middleware while mounting repository source at another URL violates the static-file boundary.

These are independent executions, not endorsements of the author's eight trial results. The tooling control holds the package bytes and location constant and changes only its declared ownership, isolating that distinction.

### Disposable setup

Target: `C:/Storage/repos/loop2-first-foundation/.runs/independent-assessment-review`.

Before creation, Python resolved the target and `.runs` to absolute paths and asserted the target was a strict child, not the boundary itself, and did not exist. `git worktree add --detach <target> b92a87e733a7669c9a8a7b1ded5a3f648f5beb64` succeeded. Its reported Git top-level was independently checked against the resolved target. `npm ci --ignore-scripts --no-audit --no-fund` succeeded, installing 80 packages. No junction into the reviewed checkout was used.

The reviewed checkout's `.the-way` HEAD and recorded gitlink both equalled `7cfeb4c2349b181d251d1a03cb2005b980acbe9e`. `origin/HEAD` resolved to `origin/main`. The disposable part-map guards ran from the reviewed repository root using its pinned `.the-way/elements/part-map/format_guard.py`, the explicit disposable map path, and `--base` from the disposable HEAD's merge-base with origin/main.

### Package break and tooling control

Created and explicitly staged these disposable files:

- `packages/server/package.json`: private package `review-independent-server`, type module, main `dist/main.js`, build `tsc -p tsconfig.json`.
- `packages/server/tsconfig.json`: rootDir `src`, outDir `dist`, NodeNext module and moduleResolution, include `src/**/*.ts`.
- `packages/server/src/main.ts`: independent Express source importing Express, registering `/review-health` with a JSON ready response, and listening on 3011. This fixture was inspected by the invariant; it was not launched.

The negative map assigns `packages/server/**` to account-server. The root build-tools manifest pattern is anchored as `/package.json` in both disposable maps. This is necessary because Git's unanchored `package.json` also matches a nested manifest: my initial fixture exposed that overlap and was discarded as invalid evidence. After anchoring, both corrected maps pass the guard with `0 error(s), 0 warning(s), 1 unchecked`. The unchecked item is the existing lack of a product dependency-graph command; it does not concern file ownership. No reviewed foundation file was changed.

Focused command, from the disposable root:

`python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py`

Negative result: exit 1, one assertion failure at line 176. The assertion identifies `packages/server/package.json` as an ancestor package of an application-owned file and ends with `packages/server/package.json belongs to a separate application package`. This is the intended assertion, not a parser, dependency or fixture error.

Control: keep the same three files at the same location, assign `packages/server/**` to build-tools instead. Guard: exit 0 with the same single unchecked dependency-graph item. Focused check: exit 0, `Ran 1 test`, `OK`.

The initial unanchored map runs are not counted as successful negative/control evidence. Their guard errors were, respectively, overlapping account-server/build-tools claims and duplicate build-tools claims. The corrected runs above resolve this setup issue.

### Excluded browser source

Only in the disposable browser config, set include to `src/browser/**/*.ts` and `src/server/**/*.ts`, and exclude to `src/browser/**`. All tracked source files remain in place; the config has an actual server source list, while its own browser source is excluded.

Command:

`python -B -m unittest discover -s tests/invariants -p test_application_build_layout.py`

Result: exit 1, one failure at line 43:

```text
AssertionError: set() is not true : tsconfig.browser.json does not include a tracked TypeScript source from src/browser
Ran 1 test in 1.088s
FAILED (failures=1)
```

This reaches the intended source-membership assertion. The original config bytes were restored before the next trial.

### Additional source static root

Only in the disposable server source, after the existing built-public middleware, add:

```typescript
app.use('/source', express.static(fileURLToPath(new URL('../../src/', import.meta.url))));
```

Command:

`python -B -m unittest discover -s tests/invariants -p test_public_file_boundary.py`

Result: exit 1, one failed subtest for `/source/server/outside-public.txt`, at line 46:

```text
AssertionError: b'loop2-invariant-outside-public-asset' unexpectedly found in b'loop2-invariant-outside-public-asset'
Ran 1 test in 11.749s
FAILED (failures=1)
```

The build and server launch succeeded. The only failure was the newly exposed marker, demonstrating that the regression was detected through served bytes while the existing assertions remained operative. Original server bytes were restored.

### Cleanup

Before `git worktree remove --force`, I resolved the target again, asserted it was a strict child of the intended `.runs` directory, and verified its Git top-level again. A socket probe confirmed 127.0.0.1:3000 was released. Worktree removal exited 0 and the target no longer existed. Port 3011 was never opened. No reviewed product file, index, branch or HEAD was edited; only this ignored report is retained in the reviewed checkout.

## Review scope and limits

- The immutable three-file diff was read once. Its build-layout hunk ended before the physical-output assertions, so I read only that function's missing tail to verify that equal resolved outputs remain rejected. No other changed file was reread.
- Named risks checked outside the diff: part-map pattern semantics and fixture assignment validity (actual map and pinned guard); propagation of fixture source into the real build and cleanup of the HTTP server (unchanged shared support); placement and path resolution of the additional static middleware (unchanged server source). The browser config was read to construct the exclusion trial without changing unrelated compiler options.
- ⚠️ I did not rerun the author's green focused suite, npm test, or 35-test invariant gate. Those are reported evidence at the reviewed HEAD, not my executions. Existing frontend negative cases and the merged-output negative case were assessed from the diff, preserved assertions and author evidence; they were not rerun in this bounded correction review.
- ⚠️ The author report's nested-package maps do not establish nonoverlapping ownership unless their root `package.json` pattern is anchored. My independent corrected-map trials supply that missing ownership evidence; this is an evidence qualification, not a defect in the corrected check.
- ⚠️ Ownership-based detection depends on a maintained part map. The `/source` probe is one concrete representative mount, not exhaustive URL enumeration. The TypeScript source query resolves inherited inputs, while physical rootDir/outDir assertions still require explicit options in the two literal configs. These limits are disclosed and do not invalidate the requested correction.

## Declined to judge

- Exhaustive arbitrary static-mount URL discovery: outside this correction's explicitly bounded representative regression probe.
- Config inheritance for physical rootDir/outDir: existing explicit-config convention, outside the changed source-inclusion requirement.
- Classification of a server package deliberately misassigned to a nonapplication part: the chosen contract uses declared application ownership; independent map validity was checked for the supplied negative and control.

## Assessment

Spec Compliance: ✅. All three changed checks satisfy the requested correction and the deliberate breaks fail for the intended reasons.

Task quality: Approved. The correction uses existing product ownership and TypeScript resolution instead of server source-byte inference or include-substring matching, and adds a concrete HTTP regression probe without weakening the existing public-file assertions. No additional change is required for this review scope.
