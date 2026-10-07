# Spec Compliance

**Issues found.** The requested corrections are present and the required named controls behave as intended, but the ownership parser rejects a valid known-tooling map spelling. Its ownership resolution also differs from the pinned guard for overlapping patterns.

Reviewed immutable range: `bba696959ba721b50d0d2884df0fdbf45e5579bc..53621c5490f838630ffa89857f0812dbc48ce478` in `C:/Storage/repos/loop2-first-foundation`. HEAD matched the head commit. The pinned submodule and index both identify `7cfeb4c2349b181d251d1a03cb2005b980acbe9e`. Read WAY-69, Superpowers 6.4.1 task-reviewer prompt and manifest, the code-review playbook, both binding sentences, map, independent assessment observations 3/4 and their settlement. No product files, index, commits or branches were changed.

# Strengths

- `tests/invariants/test_application_package_layout.py:16-19,69-87`: explicit known application/tool parts and an actionable unknown-part failure replace speculative build-script and HTML heuristics. The reduction removes most classifier maintenance cost.
- `tests/invariants/test_application_package_layout.py:70`: test-tooling package control now passes without weakening the nested server or independently mapped Vite-browser cases.
- `tests/invariants/test_application_build_output.py:139-155,172-174`: only the crossed-type method loses the layout citation; both real output methods keep it. This matches the narrower sentence at `foundations/invariants.md:87`.

# Issues

## Critical

None.

## Important — new thread: valid map list syntax causes a tooling false positive

**Anchor:** `tests/invariants/test_application_package_layout.py:32-35`.

**To paste:** `file_owners` no longer removes the optional `- ` prefix accepted by the pinned map guard, although the previous implementation did. A build-tools entry with `Files: - tools/review/**` causes a known tooling package to fail as owned by `unspecified`; the map guard accepts this map. Normalize each pattern the same way as the pinned guard before writing Git attributes.

**Why this is reported:** The check must use authoritative map ownership so that ordinary development tooling does not look like another application. The pinned guard's `patterns()` at `.the-way/elements/part-map/format_guard.py:704-714` strips an optional list marker before matching. This implementation writes that marker literally into its generated attribute file. Git reads the marker as the path pattern and does not associate the intended tool source with build-tools.

The independent control adds `tools/review/package.json` and `tools/review/run.mjs`, assigns `- tools/review/**` to existing build-tools, and changes the root manifest map pattern to `/package.json` to avoid the original basename pattern claiming the nested manifest too. Browser/server packages remain unchanged. The package test fails with `tools/review/package.json contains tools/review/run.mjs, owned by unspecified; classify this part in the package-layout check before accepting a separate package`. The pinned map guard reports **0 errors, 0 warnings**, with four explicit unchecked items because the disposable repository has no base commit or dependency command. A tracked `.the-way` placeholder preserves the map's existing path claim without copying or using another process version. This control therefore does not depend on an invalid map.

Leaving the code as is rejects a compliant tooling change solely because of map formatting. Restoring the established normalization is a local correction; it needs only the focused tooling control repeated. Evidence: `.runs/task-cycles/first-foundation/package-review-cases/bullet-control.txt`, `bullet-guard.txt`, and the retained disposable `known-tool` directory.

## Important — new thread: overlapping claims silently overwrite application ownership

**Anchor:** `tests/invariants/test_application_package_layout.py:35,47-49` (effect at `:74-75`).

**To paste:** All map patterns set the same Git attribute, so a later tooling claim overwrites an earlier application claim. Adding `src/server/extra/{package.json,main.ts}` and assigning `src/server/extra/**` to build-tools makes the package test pass even though account-server still claims it. Preserve all matches or reject ambiguous ownership before exempting a source as tooling.

**Why this is reported:** The test describes its matcher as following the map guard, but Git resolves successive values for one attribute using the last matching value. The map guard uses one independent attribute per pattern at `.the-way/elements/part-map/format_guard.py:786-809`, retains every claim and rejects overlaps at `:833-836`. In the mutation, existing `src/server/**` continues to claim the new source, while later build-tools also claims it. The test reports GREEN because build-tools wins and the ancestor-package check is skipped. Baseline server source still exists, so the assertion that account-server owns some source does not prevent this.

**Scope and existing protection:** The independently run map guard rejects both duplicate claims, so this is a false pass of the focused invariant, not a demonstrated bypass of the combined required pre-merge checks. The guard output also includes one unrelated `.the-way` missing-file error because that initial disposable case did not copy the submodule. Its two explicit overlap diagnostics establish the ownership difference independently of that fixture omission. Retaining this behavior relies on a separate guard always preceding interpretation of the invariant result; rejecting ambiguity locally keeps the promised fail-closed classification. Evidence: `package-review-cases/results.json` (overlap GREEN) and `overlap-guard.txt` (duplicate claims RED).

## Minor

None.

# Independent checks

All mutations were independently constructed from the foundation sentences and requested controls, in disposable repositories under ignored `.runs/task-cycles/first-foundation/package-review-cases`. Product test methods were executed unchanged; the harness redirected the existing support root/listing to the disposable repository. Build copies and ownership temporary files were also kept under `.runs`. No HTTP process or port 3000 was used.

| Case | Observed | Evidence/meaning |
|---|---|---|
| Unchanged package layout | GREEN | One focused test succeeds. |
| Tracked `tests/package.json`, ordinary test tooling | GREEN | Browser and server source/package structure untouched. |
| Full Vite browser package, `index.html` loading `/src/main.ts`, separate new map part | RED | Explicit request to classify `rogue-browser`; does not infer tooling from script shape. Vite was not installed or run; complete source/manifest shape is sufficient for this structural invariant. |
| Nested `src/server/package.json` | RED | Names `src/server/app.ts` and the intervening manifest. |
| Known tool package assigned to build-tools | GREEN | Tool source is explicitly exempt. |
| New unknown tool part with own package | RED | Names owner `review-tool`, source and manifest; asks for classification. Expected conservative behavior, not a false-positive finding. |
| Unowned new browser source/package | RED | Owner `unspecified` and explicit classification diagnostic. Pinned map guard separately reports unowned source. |
| Overlapping application/tool ownership | GREEN in package test, RED in map guard | Scoped false pass described above. |
| Valid bullet spelling of known tooling pattern | RED in package test, map guard 0 errors/0 warnings | False positive described above. |
| Browser gains Node types; server gains DOM library; outputs stay distinct | GREEN in both layout-citing output methods | Two tests pass. Crossed-type method is no longer a layout citation. Its existing build-output contract was not changed or regraded. |
| Both compilation outputs set to `dist/merged` | RED in both layout-citing methods | Missing expected `dist/public` and `dist/server` JavaScript is detected. |

The first six requested package outcomes and both layout outcomes satisfy the settlement. Test outputs and tracebacks are retained in `package-review-cases/results.json`; reproducible harnesses are `package-review-runner.py`, `package-review-bullet.py` and `package-review-bullet-valid.py` in the cycle directory. The initial known-tool fixture's unanchored root manifest pattern can also cause a same-part overlap in the separate map guard; the reported valid bullet control explicitly anchors it before its guard run. The baseline and package tests themselves do not invoke that guard.

Named checks beyond the diff: the map guard was read/run solely to compare ownership semantics; the unchanged support/build script were read solely to isolate copies and establish that the output methods invoke the actual two compiler builds. No whole-suite rerun. `git diff --check` is clean and the reviewed checkout remains clean.

# Assessment

**Task quality: Needs fixes.** The main corrections are materially better and their mandatory examples now work. Restore the map's supported pattern normalization; make the treatment of ambiguous map ownership explicit rather than silently selecting the later part.

WAY-69 separation: this reviewer did not author the binding sentences, revised tests or product code; mutations above were constructed independently. Wider merge readiness, approval placeholders and unrelated invariant tests are outside this task review.
