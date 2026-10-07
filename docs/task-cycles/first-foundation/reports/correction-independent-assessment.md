# Independent assessment — PR #6 correction

Recommendation: **APPLY**. This is advice to the author and human reviewer, not approval of the change.

Assessed range: `44294da228ab8c27dfd1683f931f59f8d7f8d29d..5820dcc94063f0b4443a1c53597c23fb5ecb9758`, repository `C:/Storage/repos/loop2-first-foundation`. The gitlink and checked-out process both equal `7cfeb4c2349b181d251d1a03cb2005b980acbe9e`. I read the dispatched diff, the three complete foundation targets, the changed tests and support module, and the relevant current browser, server, build, HTTP and startup files. Foundation prose and executable checks were examined separately before comparing their claims. No task, spec, plan, cycle record, other assessment, or author rationale was read. No product file was edited.

## Blockers, improvements and nits

None found that requires a change in the assessed range. In particular, I found no demonstrated regression that the changed tests accept or correct current behavior that they reject.

## Checks with no concern

### 1. Foundation claims match the current implementation

**Anchor:** `foundations/decisions.md:143`, `foundations/decisions.md:161`, `foundations/decisions.md:178`.

D-04/2 preserves the TypeScript/browser choice while restricting its negative example to the game's own code. The current browser module uses DOM APIs (`src/browser/main.ts:1`) and is loaded as a module by the HTML. This clarification does not promise that every external library was authored in TypeScript. No concern; no change needed.

D-05/2 preserves the serving decision and adds an origin reference. `src/server/main.ts:6` starts one app; `src/server/app.ts:14` installs the API error handler before static serving at line 18. The revised source reference does not alter that behavior. No implementation contradiction; no change needed. The full external origin document was outside the assessment package, so its historical approval and exact wording were not independently verified.

D-06/2 keeps its binding text and gives the package and output layout their own verification references. The root package runs `scripts/build.mjs`, whose line 9 invokes both named configurations. Their `outDir` values are distinct (`tsconfig.browser.json:11`, `tsconfig.server.json:11`). The current source tree uses that shared package and lockfile. No concern; no change needed.

### 2. The new invariant citations identify checks that exercise their claims

**Anchor:** `foundations/invariants.md:75`, `foundations/invariants.md:85`, `foundations/invariants.md:95`.

The package check reads the root manifest and lockfile, verifies matching package identity, resolves source ownership from the part map, and rejects nested package boundaries above application source (`tests/invariants/test_application_package_layout.py:64`, line 77, line 82). It does not classify application packages from their names or scripts. Known non-application parts are exempt; a new part containing a nested package requires explicit classification. That maintenance cost is visible in the test, and prevents silently accepting a new application package. No concern with the current map and source languages; no change needed.

The build checks start from copies without build output, require both configuration files, inspect the emitted files under two literal output directories, and compile distinct browser/server probes (`tests/invariants/test_application_build_output.py:124`, line 139, line 153). The existing crossed-environment test at line 172 also verifies that each side rejects the other side's ambient globals. Reusing these tests for the layout reference adds no redundant build implementation. No concern; no change needed.

The occupied-address test verifies normal readiness before and after a controlled address collision, binds its own blocker, requires nonzero exit, and forbids the actual readiness line (`tests/invariants/test_account_server_occupied_address.py:25`, line 39, line 50). Its literal address agrees with `src/server/main.ts:3`; the production error handler sets a nonzero exit code at line 14 and only the listening event prints readiness at line 9. The old startup test already contains occupied-port and readiness assertions (`tests/startup.test.mjs:7`, line 29), supporting recovery of this existing behavior. No concern; no change needed. Historical reports and PR comments cited in the recovery row were excluded by the dispatch and remain unverified here.

D-05's unchanged citations also match their tests: the one-process test inspects listeners and descendants and checks Express dispatch, while the API-error test checks status, JSON media type/body, and absence of the built HTML. Their documented sampling and deployment limits remain limits; this assessment does not claim container verification.

### 3. Withdrawal of the broad public-file invariant creates no internal contradiction

**Anchor:** `foundations/invariants.md:95`, `src/server/app.ts:7`, `tests/http.test.mjs:86`.

The final foundation does not state a broad public-file boundary elsewhere and then cite a missing invariant as its verification. D-05 requires serving the built game and keeping unmatched API requests separate; it does not settle a complete future asset-publication policy. Current static serving remains rooted in `dist/public`, and the existing HTTP test still probes raw/encoded traversal and repository paths. The invariant's absence does not negate either the current implementation or the README's description of it. No concern; no replacement rule is needed for consistency of this set.

### 4. Ownership, prerequisites and scope remain coherent

**Anchor:** `foundations/part_map.md:17`, `foundations/part_map.md:32`, `foundations/part_map.md:63`, `foundations/invariants.md:3`.

The new startup test belongs to account-server and the package check belongs to build-tools. The product-foundation description now covers its complete foundation responsibility. The installation prerequisite matches the test support's dependence on the repository's installed modules. The support-module edit only clarifies its process-launch description. No concern; no change needed.

## Purpose, frequency and cost

These changes help a future contributor distinguish the application's shared package, separated compiler environments, and failed-start behavior when changing the build or server. They act at invariant-test execution and foundation review. The existing Node startup test supplies a concrete executable collision case; it does not establish how often users encountered that failure.

The foundation-file history was inspected through `git log` (the first entries appear in `22dbff4` and `99ed33f`, followed by the correction commits). I did not inspect session transcripts or run histories: those materials were outside the assessment boundary. Consequently no frequency or recurrence rate is claimed, and no claim about agent behavior is made.

A blanket ban on every nested manifest would be shorter but would also reject packages belonging to tooling. The ownership check costs a small classification list and a Git attribute lookup, while preserving that distinction. Reusing the existing build tests is already the cheaper mechanism for compiler layout. The occupied-address check overlaps the ordinary startup test, but adds controlled ownership and successful launch controls and belongs to the invariant runner; deleting it would lose those checks from that method.

**What can be cut:** nothing substantive in this final set. No additional process layer or broad public-file invariant is needed.

## Executed validation and limits

All affected test modules passed against the assessed working tree:

- `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py`: 1 test, passed.
- `python -B -m unittest discover -s tests/invariants -p test_application_build_output.py`: 3 tests, passed.
- `python -B -m unittest discover -s tests/invariants -p test_account_server_occupied_address.py`: 1 test, passed.

This assessment did not rerun the complete invariant suite, foundation format guards, or HTTP suite, and does not report those as passes. Historical source approval, external origin documents, and deployment/container behavior remain outside this assessment's evidence.
