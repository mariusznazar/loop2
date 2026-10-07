# Independent foundation and invariant-test assessment

## Assessed material

- Product range: `44294da228ab8c27dfd1683f931f59f8d7f8d29d..877821a0fd945449b71a3aed666675dfec1c519f`.
- Assessed product files: the eight files named in the dispatch, and no other changed product file.
- Rules read: the project `the-way-critique` skill, the pinned critique skill, the decision, invariant and part-map templates and skills, their shared rules and way of working, their examples, and the pinned glossary. The gitlink and checked-out `.the-way` both resolve to `7cfeb4c2349b181d251d1a03cb2005b980acbe9e`.
- Unchanged product code and history were read only for the claims named below: the package/build layout, static-file root, occupied-address startup behaviour, their existing product tests, and the recovered rows' cited code commits.
- I did not read the frozen task, project definition, specification, plan, cycle record, author reports, review reports or author reasoning. I did not rerun the whole suite; a green run would not answer the false-negative and duplication concerns below.

## Observations

### 1. `application-package-layout` can pass with a separate server application package

**Location:** `tests/invariants/test_application_package_layout.py:77`, especially lines 104-111 and 146-169; binding sentence at `foundations/invariants.md:77`.

**Checked evidence:** The check examines a package outside `src/browser` and `src/server` only when its `build` or `build:*` command refers to the current application's paths, or `has_application_entry` recognizes its own entry. For the server branch, `has_application_entry` returns true only when a source file in that package has a byte-identical counterpart under `src/server` (lines 104-106). The alternative recognition through an HTML page exists only for the browser branch (lines 107-111). A package such as `packages/server/package.json`, with its own TypeScript configuration, distinct server source and `main` entry, therefore makes both `references_application` and `builds_own_application` false. The current repository has only the root `package.json` and `package-lock.json`, so this is a future false negative rather than a present violation.

**Who and when:** The entry is meant to protect D-06's shared-package choice when later build or server work introduces another package. That is exactly when the unrecognized-server branch acts.

**Consequence:** The gate can record `pass` for `application-package-layout/1` on a commit that contains a second server application package, while the invariant says there is no separate application package for either side. The 173-line heuristic also makes future package layouts expensive to interpret and maintain.

**What needs to change:** Rewrite the check around a product-owned, explicit boundary instead of trying to infer whether an arbitrary package is an application from `main`, build-script tokens and copied source bytes. One viable boundary is the application parts and launch/build entrypoints recorded by the product; another is a narrower invariant that names the concrete package-manifest locations it forbids. Whichever rule is chosen needs a deliberate break with a distinct, independently built server package and must fail on it. The current server recognition branch should not remain as written.

### 2. The new build-layout test duplicates a stronger existing invariant test and can be cut

**Location:** `tests/invariants/test_application_build_layout.py:12-43`; existing protection in `tests/invariants/test_application_build_output.py:139-189`; map addition at `foundations/part_map.md:45`.

**Checked evidence:** The new file checks that the two named configuration files exist, that an `include` string contains `src/browser` or `src/server`, and that resolved `rootDir` and `outDir` values differ. Its substring test at lines 25-27 would accept an include such as `src/browser-copy/**/*.ts`, so on its own it is weaker than its sentence. The pre-existing `application-build-output` check already writes made-up browser-only and server-only TypeScript into the two source trees, requires the build to emit each into the literal, distinct output directories, and crosses the probes to require each configuration to reject the other environment. Multiple invariant citations on one check are an established pinned form.

**Who and when:** `application-build-layout/1` usefully makes the previously implicit layout rule explicit for later build changes. The extra file adds no distinct moment of protection: both files run through the same invariant method and cover the same two configurations.

**Consequence:** Two checks encode the same configuration names, source roots and output roots. A future layout change has two places to update, and the shallower one can disagree with the executable build check. This is maintenance cost without additional protection.

**What needs to change:** Keep the invariant entry and D-06/2 verification, add `# invariant: application-build-layout/1` citations to the relevant existing checks in `test_application_build_output.py`, and remove `test_application_build_layout.py` plus its part-map file row. If the checks must remain separate for another rule, the new one should at least reuse the existing literal configuration matrix and verify actual inclusion rather than substring membership.

### 3. `public-file-boundary` does not fail when the server exposes an additional static root under another URL prefix

**Location:** `tests/invariants/test_public_file_boundary.py:17-44`; binding sentence at `foundations/invariants.md:97`.

**Checked evidence:** The test proves that `/` and `/main.js` return the built public bytes, then probes six paths for one marker or the root manifest bytes. A deliberate product break that retains `express.static(publicDirectory)` and adds another `express.static` rooted at `src` under a prefix such as `/source` leaves every asserted response unchanged while serving `/source/server/app.ts` from outside `dist/public`. The current server has only the public static root (`src/server/app.ts:18`), so the product currently conforms. The older product test has protected a foreign working directory and selected traversal paths since `11c7cbb`, and no later commit inspected introduced a recorded breach; it does not remove this new check's untested additional-root case.

**Who and when:** The invariant protects people running the server from accidental disclosure when server routing or static middleware changes. An added static root is a direct, ordinary way that promise can be broken.

**Consequence:** The invariant's universal `only from the built public directory` claim can receive a passing verdict after a clear breach. The check currently demonstrates a correct root and some traversal resistance, but not the claimed exclusion of another configured root.

**What needs to change:** Accept the check against an independent deliberate break that adds a second static directory and make that break fail. The assertion should exercise a known file through the added root (including a prefixed root), not only compare selected root-level paths with two byte strings. If the intended promise is limited to traversal and working-directory independence, narrow the invariant sentence to those behaviours instead of keeping `only`.

## Source-fidelity limits, kept separate from contradictions

- `foundations/decisions.md:172` adds the full approved project-definition entry as D-05/2's origin. The dispatch forbids reading that project definition, so I could not verify that it contains the full reasoning rather than only the projected decision. The new origin does not contradict the unchanged binding sentences or the decision template on the material I was allowed to read.
- The recovered rows at `foundations/invariants.md:129-130` cite a historical return proposal and PR observations. Those task/report sources were forbidden, so I did not use them to confirm the rows. I did verify the product-side evidence: `README.md:21,25,27`, `tests/http.test.mjs:53-98`, `tests/startup.test.mjs:7-34`, and the cited code history at `11c7cbb`, `de3ceb3` and `3af85d1`. These show executable cases and continued protection, but no repository-history instance in which either new invariant's sentence was false. This is a source-fidelity limit, not a verified contradiction in either row.

## Checks with no concern

- **D-04/2 (`foundations/decisions.md:143-159`):** the binding sentences are byte-for-byte unchanged, `unchanged sentences` is the correct change kind, and the revised violation example now limits direct JavaScript to the game's own code. It protects later agents from treating external library JavaScript as a violation of the language choice. No extra rule or check is introduced.
- **D-05/2 (`foundations/decisions.md:161-176`):** append-only versioning and `unchanged sentences` are correct for the Origin-only change. Its source fidelity remains limited as stated above.
- **D-06/2 (`foundations/decisions.md:178-194`):** the unchanged binding sentences and expanded level-1 list agree with the three derived invariants. The package check needs the rewrite in observation 1, and the separate layout test can be cut as in observation 2; the decision version itself is properly formed.
- **`application-build-layout/1` (`foundations/invariants.md:85-93`):** this is one commit-testable sentence derived from D-06 and names all three parts whose changes can falsify it. The concern is duplicated mechanics, not the entry.
- **`application-package-layout/1` (`foundations/invariants.md:75-83`):** the entry is a valid derived invariant and records a real architectural choice. The concern is the method's false negative, not the need for the entry.
- **`account-server-occupied-address/1` and its check (`foundations/invariants.md:105-113`, `tests/invariants/test_account_server_occupied_address.py:18-55`):** current product code has exactly one fixed listening address (`src/server/main.ts:3-14`). The check holds that address, requires non-zero exit, forbids the exact readiness line, verifies a normal launch before the negative case, and verifies recovery afterward. The existing product test records the same concrete occupied-address case. No broader configurable-address population exists in the inspected product, and no concern was found.
- **`public-file-boundary/1`:** the entry itself states one product property, names the two parts that can falsify it, and is correctly recovered rather than derived. Observation 3 concerns the check's reach.
- **Fresh-checkout prerequisite (`foundations/invariants.md:3`):** `TreeCopy` deliberately links the repository's real `node_modules` and gives the same `npm ci` instruction when it is missing (`tests/invariants/loop2_invariant_support.py:160-176`). One prerequisite at the top avoids repeating it in every Method. `npm ci` is already the documented lockfile installation (`README.md:5-10`). No cheaper equally clear prerequisite was found.
- **Shared server support (`tests/invariants/loop2_invariant_support.py:221-291`):** direct `node` launch is used only for a supplied foreign working directory, while ordinary starts still exercise `npm start`; both use the same built entrypoint. The change is scoped to enabling the public-root case and does not write the real tree.
- **Recovered rows (`foundations/invariants.md:125-130`):** both entries derive from no product decision and were present as product behaviour before this foundation change, so they belong on the recovered list. The allowed product evidence shows concrete executable cases. Source limits are listed separately above.
- **Part map (`foundations/part_map.md:13-70`):** each new test is assigned to the part it tests, shared invariant support stays with build-tools, and the `product-foundation` wording now uses the pinned definition of foundation. The new file patterns do not overlap. The allowed dependency graph at lines 25 and 46 remains unchecked because the product declares no dependency-graph command; I do not treat it as confirmed correct.
- **Known guard state:** the approval URL placeholders at `foundations/decisions.md:156,173,191` remain unresolved until a draft request exists. I did not assume the decision guard passed.

## What can be cut

`tests/invariants/test_application_build_layout.py` can be cut by moving the new invariant citation onto the stronger existing build-output checks, as described in observation 2. I found no basis to cut any of the four invariant entries or the three append-only decision versions. The package-layout check needs a rewrite, and the public-file-boundary check needs a deliberate-break case or a narrower sentence; cutting either check without replacement would leave its entry without a verdict-producing method.

This report gives observations only; it does not approve the change or edit the product.
