# First foundation follow-up: design specification

Current assessment amendment: The package check uses the part map's file ownership to identify application source under a nested package; it exempts test-only source and known nonapplication parts. An unknown new part with source and its own package requires explicit classification. The compiler-layout citation applies to the two existing compilation/output methods; the older cross-type environment method retains only its preexisting build-output citation. The public-file runtime test supplies finite evidence for static roots, direct literal routes, public bytes and traversal. Independent breaks proved that parameterized, mounted and header-conditioned outside-file responses can still pass it. The broad source sentence therefore uses the pinned file-path Method `foundations/public_file_boundary_assessment.md` for a human assessment of the full serving surface. The runtime test remains and its deliberate breaks remain evidence, but it no longer cites that invariant or records a broad pass. Before a human verdict on the assessed commit, that invariant is unchecked under the pinned rules. These settled verification choices preserve the four binding sentences below.

## Intent and scope

Make three existing product behaviors binding in the foundation through invariant checks that a task implementer cannot quietly change with ordinary tests. Apply the three accepted wording corrections to the existing foundation and state that `npm ci` precedes invariant methods in a fresh checkout. The application should keep its present behavior. This task does not add deployment or account routes, change the TypeScript version, or revise any binding decision sentence.

The frozen independent task is the scope authority. The proposed invariant sentences come from part C of the earlier cycle proposal at `5928e7b`; they are not projected entries of the approved MVP definition. The definition supplies only the full approved D-05 entry cited by its new *Origin* field. The task names D-04/1, D-05/1 and D-06/1 as the source versions to correct. The pinned decision log is append-only: leave those merged versions untouched and append D-04/2, D-05/2 and D-06/2 with unchanged binding sentences and the accepted field edits.

## Foundation design

Split the proposed `application-build-layout` sentence along the two promises already in D-06:

1. `application-package-layout/1`: “The browser and server use a single shared npm package and lockfile, with no separate application package for either side.” This protects the common package boundary.
2. `application-build-layout/1`: “The browser and server have distinct TypeScript compilation configurations and output directories.” This protects the compiler layout.

Both derive from `D-06@094e6fa7`, whose binding fingerprint is unchanged in current version D-06/2, rest on no environment fact, and cover `build-tools · browser-view · account-server`, as the original combined proposal specified. D-06/2 *Verification* names these two and the existing `application-build-output`; the latter continues to protect that an application build compiles both configurations. Each new sentence gets a citing check and deliberate break. The compiler-layout citation belongs on the existing independent build-output check: its probe compilation demonstrates distinct configurations and output directories without making direct JSON keys or different `rootDir` values binding requirements.

Add the other proposed sentences without changing their meaning or adding D-05 as a source:

- `public-file-boundary/1`: “The server serves static files only from the built public directory, whatever working directory its process starts in.” `Derives from: none`; `Part: account-server · build-tools`.
- `account-server-occupied-address/1`: “When the account and save server's listening address is already in use, the server process exits with a non-zero code without printing its readiness line `Loop: <address>`.” `Derives from: none`; `Part: account-server · build-tools`.

Their behavior predates these entries, so each needs a row in *Recovered invariants*, based on a search of the product sources and history and settled with the gate report at review. The two layout entries derive from D-06 and need no recovered row. The package-layout, compiler-layout and occupied-address entries use the existing test-gate command as *Method*. The public-file entry uses the pinned human-assessed file-path Method after the independent false-pass assessment, with its finite test retained as supporting evidence. All four have `Rests on: none` and `Correction: none`.

Under `# Invariants`, before the entries, state: “Before running an invariant Method in a fresh checkout, run `npm ci` from the repository root.” Keep every *Method* field as its single existing command. The gate still reports an error if dependencies are absent; the precondition makes the required setup explicit.

Apply the accepted edits verbatim. For decisions, append new `unchanged sentences` versions; D-04/1, D-05/1 and D-06/1 remain as merged:

- `product-foundation` description in `foundations/part_map.md`: “The part holds the product's foundation.” Assign the package-layout check to `build-tools`, static-file and occupied-address checks to `account-server`. The existing build-output check already belongs to `build-tools` and carries the compiler-layout citation.
- D-05/2 *Origin*: `the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What serves the built game and account requests in the container?"`. *Rationale for change*: “the origin connects the serving-process choice with its full approved entry.” *Rejected*: “omitting the link to the full approved entry — the shortened choice hides its source.”
- D-04/2 *Verification* violation example: `a part of the game written as a Godot scene, or a script of the game's own code that the browser loads, written directly in JavaScript instead of compiled from TypeScript`. *Rationale for change*: “the violation example distinguishes the game's own code from external libraries without broadening the language choice.” *Rejected*: “keeping an example that also excludes external libraries — it extends the decision beyond the game's own code.”
- D-06/2 *Verification*: `level 1 — invariants: application-package-layout · application-build-layout · application-build-output`. *Rationale for change*: “the verification names the package boundary and compiler layout as well as compilation of both sides.” *Rejected*: “keeping verification limited to compilation alone — it leaves the package boundary and compiler layout unprotected.”

## Independent checks

An agent that writes neither an invariant sentence nor the covered application code writes each invariant check. The agent receives the sentence and method, not the implementation's reasoning. A separate reviewer derives a deliberate break from each sentence, applies it in a disposable copy, and confirms the corresponding check fails. Invariant check files are read-only during subsequent implementation. If a check exposes a real product defect, return to the foundation step before changing a check.

- Package layout: verify that the browser and server use the single shared npm package and lockfile and that neither side has a separate application package. Avoid interpreting an unrelated tooling package as a second application package.
- Compiler layout: use the existing build-output check's literal browser/server configurations, compiled probe sources, distinct output directories, and separate compiler environments. Cite both invariants on its relevant methods. Do not require direct `compilerOptions` fields or distinct `rootDir` values.
- Public-file boundary: retain the finite automated test of Express static roots, direct literal file routes, real public bytes, foreign working directory and crafted traversal paths. Independently assess the complete serving behavior at a named commit through `foundations/public_file_boundary_assessment.md`; the sampled test gives no verdict for the broad invariant. Do not constrain the text of the non-API error page.
- Occupied address: prove an unoccupied control launch can become ready, then hold the server's listening address while launching it again. Require non-zero exit and no `Loop: <address>` readiness line. Allow the failure diagnostic to mention the address; clean up the blocker and process on all outcomes.

Use literal expected values in the checks rather than deriving expectations from the application code they protect. A test that merely sees any build or startup failure cannot count as a successful detection of the intended break. The public-file deliberate break demonstrates the finite supporting test, while a human verdict is required for the full sentence.

## Files and verification

Expected product edits: `foundations/invariants.md`, `foundations/decisions.md`, `foundations/part_map.md`, three new files under `tests/invariants/`, and a citation in the existing `test_application_build_output.py` (one citing check per sentence). Existing application code and ordinary tests should need no edit. A targeted change to shared invariant test support is permitted only if a new check cannot be written safely with its current process and temporary-copy helpers.

Install dependencies with `npm ci`, run the focused citing invariant checks and four deliberate breaks, `npm test`, and the full invariant gate. Run format guards on every changed foundation file with this task's fork point and merge target as required by the repository. Report each pass, failure, and unchecked condition separately. Direct server checks supply runtime verification for the two visible behaviors. The pull request is the user's decision point; intermediate go-aheads are provisional orchestrator decisions.
