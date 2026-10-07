# Package-layout and citation correction

Author: fresh invariant-check correction agent, under the delegated foundation return step.
Input HEAD: bba696959ba721b50d0d2884df0fdbf45e5579bc.
Committed HEAD: 53621c5490f838630ffa89857f0812dbc48ce478.
Commit: test: classify package boundaries by part ownership.

## Scope and authority

Read repository AGENTS.md, pinned task-cycle skill, invariant and part-map templates and common rules, current foundation, independent assessment observations 3 and 4, and the orchestrator settlement. The submodule checkout and gitlink both equal 7cfeb4c2349b181d251d1a03cb2005b980acbe9e. WAY-69's separation is observed: this agent changes checks only; the fresh reviewer must independently write/repeat the deliberate breaks.

Changed only tests/invariants/test_application_package_layout.py and tests/invariants/test_application_build_output.py. No product source, foundation or map edit. Existing bytes were read and written as bytes, retaining existing line endings. No other agent was delegated. Both paths alone were staged. Working tree was clean after commit; branch task/first-foundation has no upstream.

## Classification settlement

The part-map format has no application/tooling discriminator. A part's responsibility is free prose, and tests belong to the part they test. I reported this before editing or committing the package check. The orchestrator chose a conservative classification policy: browser-view/account-server are application parts; build-tools/agent-workflow/product-foundation are the known non-application parts. Source in a nested package owned by any other part fails with an instruction to classify that part in a reviewed check update. No responsibility keywords, build scripts, HTML URL inference or source-byte inference classify packages. Files beneath tests/ do not count as application source.

Leaving the former method would retain both the concrete false positive and the missed Vite application. The chosen method rejects that application and shrinks the check from 267 to 92 lines; its maintenance cost is explicit classification of a new tooling part before that part can have its own package. This is an orchestrator choice under delegation, not human approval or a new product foundation rule.

The map's Git patterns assign source ownership. The root package manifest and lock entry still have to agree on their name. Application-owned source may have no intervening package.json, package-lock.json or npm-shrinkwrap.json. Known tooling-owned source can have separate packages.

TypeScript config parsing is no longer needed for the ownership method, so inherited configurations work without special resolution helpers. The existing build tests continue checking the two configurations' actual compilation/output. Removed only application-build-layout/1 from the crossed-type test; both compilation/output methods retain that citation, and all existing application-build-output/1 citations remain.

## Verification

- python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py -v: 1 test passed (0.071 s).
- python -B -m unittest discover -s tests/invariants -p test_application_build_output.py -v: 3 tests passed (15.929 s).
- python -B .runs/task-cycles/first-foundation/reports/package-rewrite-controls.py: all 8 expected outcomes matched.
- git diff --check: passed (only Git's normal LF-to-CRLF checkout notices).

The disposable controls copy actual tracked files and the changed checks into fresh temporary Git repositories, track all fixture files explicitly, and run the focused check there. They never mutate the working product. Full executable controls and individual output logs are beside this report; results are in package-rewrite-controls.json.

| Control or break | Expected | Observed |
|---|---|---|
| Unchanged product | pass | pass |
| Tracked tests/package.json with Node test script using http.test.mjs and startup.test.mjs | pass | pass |
| Complete apps/rogue-browser Vite package, HTML module entry, TypeScript using document, separate map part describing a second browser application | fail | fail: unclassified part containing separate package |
| src/server/package.json enclosing the existing application server | fail | fail: separate application package |
| scripts/tools package with TypeScript and Vite build script, owned by existing build-tools part | pass | pass |
| Browser config inheriting its former content from a base config | pass | pass |
| New separately mapped tooling part with its own package | fail pending reviewed classification | fail: explicit classification required |
| Root lock entry name differs from root manifest | fail | fail |

## Limits and unchecked work

The source population uses .ts/.mts/.cts/.js/.mjs/.cjs/.html outside tests/. New source forms or test locations require review. The check relies on the part map's truthful ownership and its separate format guard (including unique file assignment); it does not semantically verify prose or detect application code falsely assigned to an allowed tooling owner. A package wrapper that points to remote source instead of containing source is not inferred from shell metadata. Supporting that architecture requires renewed boundary review.

A new legitimate tooling part is deliberately rejected until classified in the check. That is the selected fail-closed cost, independently demonstrated by the control. This report does not claim all new tooling parts automatically pass.

The full gate, independent reviewer mutations, whole-branch review and independent assessment were not run by this author; they remain the orchestrator's next stages. Citation-only removal changes no executed compilation assertion, so no new compiler mutation was invented for that edit.
