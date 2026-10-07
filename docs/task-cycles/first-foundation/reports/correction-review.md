# PR #6 correction review

**Range:** `102b405d2377b73fc28ff7c076d6d69f052f41f6..5820dcc94063f0b4443a1c53597c23fb5ecb9758`
**Boundary:** read-only product review; this report is the only written file.

## Verdicts

- **Spec compliance: PASS.** The correction implements the owner's binding PR comment and orchestrator choice C29.
- **Task quality: APPROVED.** No Critical, Important, or Minor issue found in the correction.
- **Ready for the next cycle stage: Yes.** This is a review verdict, not an independent foundation assessment or a PR update.

## Strengths and evidence

1. `foundations/invariants.md:95` now follows `application-build-layout/1` directly with `account-server-occupied-address/1`, and its recovered table at `foundations/invariants.md:115` contains only `account-server-occupied-address`. The removed `public-file-boundary/1` has no surviving current entry or recovered row. The only removed foundation document is `foundations/public_file_boundary_assessment.md`.
2. `foundations/part_map.md:16-23` removes only the deleted test's `account-server` file assignment. `product-foundation` still says it holds the product's foundation at `foundations/part_map.md:61-65`. The five-path diff contains no decision-log change, and the remaining named invariants and `npm ci` prerequisite at `foundations/invariants.md:3,75-110` are unchanged against the parent commit.
3. `tests/invariants/test_public_file_boundary.py` is deleted. `tests/invariants/loop2_invariant_support.py:223-251` again exposes only `Server(copy, extra_env=None)` and starts `npm start` in the copy root. The current callers at `tests/invariants/test_account_server_express_http.py:136`, `test_account_server_occupied_address.py:26`, `test_loop2_one_serving_process.py:159`, and `test_loop2_api_error_route.py:66` use only the retained arguments.
4. No live product reference to `public-file-boundary`, `public_file_boundary`, `public_file_boundary_assessment`, or `working_directory` remains under the tracked product source and foundation paths. The part-map assignment was the sole product consumer of the removed test. Historical cycle records and review packages are evidence, not runtime or foundation consumers.
5. `tests/http.test.mjs:50-60` still checks the built HTML and JavaScript bytes, and `tests/http.test.mjs:87-100` checks raw and encoded traversal probes. Its setup at `tests/http.test.mjs:17-28` constructs the app after changing to a temporary working directory. `src/server/app.ts:6-19` resolves the public directory from `import.meta.url` and registers one `express.static` root. Deleting the specialized probe therefore leaves the current application's ordinary serving, foreign-directory construction, and tested traversal behavior covered.

## Issues

### Critical (must fix)

None.

### Important (should fix)

None.

### Minor (nice to have)

None.

## Coverage considered and set aside

- **Additional static roots and direct file responses:** The deleted test instrumented Express static registration and `sendFile`; `tests/http.test.mjs` does not. A future route such as `/source` serving `src/` could escape the existing fixed-path HTTP tests. This is a real loss of prospective detection, but the owner expressly allowed the supporting test to disappear and withdrew the broad rule. No such second root or direct file route exists in the current `src/server/app.ts`, so the correction introduces no uncovered current application behavior. The owner's comment assigns a narrower rule to the first later task that adds a file-returning route. I do not treat the retired broad rule as a current requirement.
- **Full behavior under every process working directory:** The HTTP test changes directory for app construction and restores it before requests; it is a finite test. I did not interpret its passing status as proof of a universal file-serving boundary.

## Checks performed and omitted

- Read the exact owner comment through `gh api repos/mariusznazar/loop2/issues/comments/6032215252`, the correction prompt and implementation report, product `AGENTS.md`, Superpowers 6.4.1 reviewer prompt, and the code review playbook.
- Inspected the full five-file correction diff, current foundation, support helper, server app, HTTP tests, and all surviving `Server(...)` callers. Searched product paths for the withdrawn identifier and support option. Confirmed the reviewed checkout HEAD equals the specified correction commit and the pinned the-way gitlink equals its checkout.
- Did not rerun `npm ci`, the invariant gate, `npm test`, or format guards. The implementation report records successful `npm ci`, 33/33 invariant tests, 5/5 product tests, invariant and part-map guards, and one still-unchecked part-map dependency-graph check. The initial pre-staging part-map error was resolved by the recorded staged rerun. No concrete new risk in this deletion justified duplicating those runs.
- Did not perform the independent foundation assessment, update PR #6, or edit product files.
