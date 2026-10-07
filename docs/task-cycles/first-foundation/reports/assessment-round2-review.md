# Assessment correction review, round 2

**Spec compliance: needs fixes. Task quality: needs fixes.** The two requested deliberate breaks are caught, and the removed compiler-layout check is replaced as the settlement requested. One new false positive in the static-root assertion must be corrected before acceptance.

Review range: `b92a87e733a7669c9a8a7b1ded5a3f648f5beb64..daecde3b54f4a80cd23a4883f81d3c145775ff95` (both correction commits). Reviewer is independent of the check author. Pinned `.the-way` checkout and gitlink both equal `7cfeb4c2349b181d251d1a03cb2005b980acbe9e`.

## Important — new thread: a valid public subdirectory is rejected

**Anchor:** `tests/invariants/test_public_file_boundary.py:57`.

**Ready to paste:** The equality assertion rejects a second static mount rooted at `dist/public/assets`, although every file it can serve is still inside the built public directory. I verified that `/assets/probe.txt` returns the planted public asset with HTTP 200, while this check fails with “outside the built public directory.” Compare canonical paths by containment, allowing the public directory itself and its descendants, while continuing to reject sibling and ancestor directories.

**Why this matters:** The new instrumentation closes the arbitrary-URL-prefix gap by observing roots when the app constructs Express static middleware. The binding sentence at `foundations/invariants.md:97` limits where served files come from; it does not forbid more than one root within the allowed directory. Strict path equality turns that into an additional, undocumented restriction. In the disposable copy I retained the existing public mount and added `app.use('/assets', express.static(fileURLToPath(new URL('../public/assets/', import.meta.url))));`, with a synthetic file in that directory. The application builds and serves that file successfully, and its original public responses remain covered by the focused check. The failure is specifically the new root comparison, not a compilation, startup or HTTP failure. Leaving it unchanged blocks an ordinary safe asset mount. Containment after canonical resolution is a small correction; retain realpath resolution so aliases and directory links do not turn the comparison into a lexical-prefix check. A path such as `dist/publicity` must remain outside.

Evidence: `.runs/task-cycles/first-foundation/review-round2/subdirectory.log`. One test, one assertion failure, zero errors; independent build exit 0 and real HTTP confirmation precede the focused test.

## Requested deliberate breaks and unchanged control

All experiments run through the reviewer-authored harness `.runs/task-cycles/first-foundation/review-round2/check.py`. Invocation: `python -B .runs/task-cycles/first-foundation/review-round2/check.py <mode>`. The harness captures unittest results and intentionally returns normally even for an expected RED test; the counts below, rather than its process exit code, state the test outcome.

| Mode | What the reviewer changed in a disposable copy | Observed result |
|---|---|---|
| `control` | Nothing | Four focused tests GREEN: public boundary plus all three build-output methods; zero failures/errors. |
| `leak` | Retained public mount; added `express.static` of the repository root under `/leak` | Build exit 0. Real `/leak/package.json` returned HTTP 200 and exactly the manifest bytes. Boundary check RED at line 57: one assertion failure, zero errors. |
| `merged` | Added one compiler config with `rootDir: src`, `outDir: dist/merged`, DOM and Node environments, including both source trees; changed the build to compile that one config | Independent build exit 0. All three cited methods RED, six subtest failures, zero errors. Emission tests report missing separate public/server outputs. The crossed-source method reports build exit 0 for source the separate environments must reject. These are meaningful assertions, not unrelated build errors. |
| `inherited` | Each root config extends its own base holding its original complete configuration | All three build methods GREEN, zero failures/errors. The old direct-JSON false positive is removed. |
| `shared-root` | Both configs use `rootDir: .`, with their original separate includes, output directories and environment settings | Independent build exit 0. Four output-path assertion failures; crossed-source method GREEN. See qualification below. |
| `subdirectory` | Added a second static mount and synthetic asset strictly within `dist/public/assets` | Build and actual HTTP asset response succeed; boundary check incorrectly RED at line 57. |

Full outputs are the correspondingly named `.log` files beside the harness. The copied product files and all mutations were confined to disposable directories under the ignored `.runs/task-cycles/first-foundation/review-round2/`; the harness removes its copies. No application, source, test, foundation or index edit was made on the task branch. `git status --short` remained empty. The harness and this report are ignored run records.

## Shared rootDir: sentence coverage versus functioning product

`tests/invariants/test_application_build_output.py:110`, `:151` and `:164` still expect the original literal source-relative output layout. A common `rootDir: .` therefore emits `dist/public/src/browser/main.js` and nested server files, while the assertions expect `dist/public/main.js` and `dist/server/main.js`. The configurations remain distinct, outputs remain separate, and the compiler-environment check passes. Thus deleting the dedicated check does not make the cited methods accept every layout permitted by the isolated sentence.

However, I also ran `npm start` on this exact mutation: it exits 1 with `Cannot find module .../dist/server/main.js`. `dist/public/main.js` is absent; `/main.js` cannot work through the normal launch because there is no running server. This experiment is **not evidence that a functioning product refactor is rejected**. I do not raise a second blocking finding from it. The retained checks enforce the repository's existing build/launch locations in addition to the more general layout sentence. The settlement/report should not claim that merely sharing rootDir is now guaranteed to pass. Changing that output layout would require coordinated application/launch/test work.

## Instrumentation trust and limitations

At `tests/invariants/test_public_file_boundary.py:35-49`, the patch is installed before dynamically importing the built app, so current module-level aliases of `express.static` receive the wrapped function. It forwards to the real Express implementation; actual public-byte and traversal checks still run separately. The expected root is a literal `dist/public`, not read from the app's computed root, which preserves an independent oracle under WAY-69. Both the arbitrary-prefix break and valid-subdirectory counterexample were independently derived from the boundary sentence.

The mechanism observes static middleware **construction during import/createApp**, not proof of every reachable HTTP serving path. It would need reassessment for lazy/request-time registrations, middleware installed only by another entry point, direct `serve-static` imports or custom file-response implementations. It can also observe constructed but unmounted middleware. These are stated limits of this implementation, not additional reproduced findings in this correction range. Root realpath comparison alone does not audit symlinks within the served tree.

## Citations and ownership

- The new citations at `tests/invariants/test_application_build_output.py:141`, `:155`, `:174` are inside actual unittest method bodies. `.the-way/gate/run_tests.py:13-31` permits a method to cite multiple invariants and associates its outcome with each citation. This reuse is supported by the pinned runner.
- `foundations/part_map.md:43` already owns the retained output test under `build-tools`; deleting the dedicated check's row removes the stale assignment. `test_public_file_boundary.py` remains assigned to `account-server` at line 23. No new unowned tracked file is introduced by this correction.
- The useful part of the deletion is confirmed: inherited configurations pass, and the shared-output/shared-compiler mutation is caught without restoring the redundant test file.

## Scope and checks not run

Read the supplied independent assessment, its settlement, both binding sentences, the correction diff, the Superpowers 6.4.1 task-review instructions, and the user-specified code-review playbook. Inspected shared support, build/launch code and runner documentation only for named risks: mutation isolation, real compilation/startup, interception timing, test citations and ownership.

No full invariant suite, full product test suite, foundation format guards, dependency-graph check or whole-branch review was run here. This is a scoped correction review with independent controls and deliberate breaks; it does not substitute for those gates.
