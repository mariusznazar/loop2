# Independent assessment of the current foundation change

## Assessed material

- Immutable range: `44294da228ab8c27dfd1683f931f59f8d7f8d29d..bba696959ba721b50d0d2884df0fdbf45e5579bc`.
- Filter: `foundations/decisions.md`, `foundations/invariants.md`,
  `foundations/part_map.md`, and the five named invariant-test files only.
- Rules: the pinned critique skill and the pinned decision, invariant, part-map and common element
  rules at `.the-way` commit `7cfeb4c2349b181d251d1a03cb2005b980acbe9e` (the gitlink and checkout agree).
- Independent evidence: current product code and README, plus the product-code commits named by
  the recovered rows (`11c7cbb`, `de3ceb3`, `3af85d1`). Citations into the vault, PR discussion,
  and task-cycle reports are outside this assessment's input boundary; I treat them as unverified
  citations, not as contradictions.

## Verdict

**Rewrite before acceptance.** Three test changes do not faithfully check the invariant they now
claim to protect, and the decision log is not merge-ready because all three new versions still
carry an approval-link placeholder. The foundation entries themselves otherwise form a coherent
set and the repository evidence supports both recovered behaviours.

## Observations

### 1. Blocking: the three decision versions cannot pass the merge guard with placeholder approvals

**Checked.** The decision template's approval rule, the changed entries at
`foundations/decisions.md:156`, `:173` and `:191`, and both branch and merge forms of the pinned
decision guard.

**Evidence.** The entries read `Mariusz, merge of <request link>`. With only `--base`, the guard
reports three warnings and no errors, which is appropriate while drafting. With the actual main
commit passed as `--merge-onto 44294da228ab8c27dfd1683f931f59f8d7f8d29d`, it reports one error
for each entry: the placeholder is not accepted by a merge onto main.

**Effect.** Leaving the range unchanged makes the required pre-merge guard fail. Replacing the
placeholder earlier costs one edit when the request URL exists. Carrying it into merge costs a
failed gate and leaves no valid approval trace.

**Smallest viable correction.** Replace `<request link>` with the concrete request URL in all
three entries before the merge check. If approval is recorded by a dated human act rather than by
the merge, use the other form the template permits.

### 2. High: `public-file-boundary` misses a direct static-file route outside `dist/public`

**Checked.** The sentence at `foundations/invariants.md:97`, the runtime inspection at
`tests/invariants/test_public_file_boundary.py:34-54`, the request probes at `:67-82`, current
`src/server/app.ts`, and the cited product-code history.

**Evidence from a disposable mutation.** In the built copy, immediately after
`const app = express();`, I registered:

```js
app.get('/unprobed-static-leak', (_request, response) =>
  response.sendFile(fileURLToPath(new URL('../../package.json', import.meta.url))));
```

The route serves a static file outside `dist/public` at `/unprobed-static-leak`, directly
contradicting the invariant. The focused `PublicFileBoundary` test still passed. Its own run also
proved that the mutated application started normally and continued to serve `/` and `/main.js`
with the expected built bytes. Output:

```text
Ran 1 test in 5.565s
OK
MUTATION_SURVIVED=True
```

The mechanism is concrete: the inspection wraps only `express.static`, while the HTTP portion
requests a fixed list of paths. `Response.sendFile`, `Response.download`, or bytes read through
the filesystem are invisible unless their exact route is guessed by that list.

**Purpose and cost.** The invariant protects operators and users from exposing repository or
server files, and it would act on the original foreign-working-directory case. The behaviour has
not recurred in product code after `3af85d1` (zero later commits touch `src/server/app.ts`), so the
new invariant is preventive rather than a response to repeated breakage. Its focused test costs
about 5.6 seconds with the cached build and 87 lines, which is reasonable if it detects the stated
boundary; currently it gives a false pass for an ordinary Express file-serving mechanism.

**Smallest viable correction.** Do not add `/unprobed-static-leak` to the probe list; that only
fixes the example. Either:

1. narrow and split the rule into what can be checked exhaustively, for example
   `Every directory the server registers with Express static-file middleware is within the built
   public directory.` and a separate foreign-working-directory serving invariant; or
2. preserve the broad boundary and add a separately enforced architecture rule that all static
   files are served through the inspected `express.static` registrations. Without that closed
   mechanism, a finite route list cannot prove the universal sentence.

### 3. High: `application-package-layout` has both a false positive and a false negative, despite 267 lines of heuristics

**Checked.** The sentence at `foundations/invariants.md:77`, ownership parsing at
`tests/invariants/test_application_package_layout.py:22-53`, application-entry inference at
`:83-198`, and the main assertions at `:203-263`.

**False-positive mutation.** I added only a tracked `tests/package.json` for test tooling. The
browser and server application packages stayed unchanged. Because `tests/http.test.mjs` is owned
by `account-server`, the ancestor loop at `:220-227` treated the test-tool package as a separate
application package and failed:

```text
AssertionError: 'tests/package.json' unexpectedly found ... :
tests/http.test.mjs belongs to a separate application package
ONLY_TEST_TOOLING_PACKAGE_ADDED=True
APPLICATION_PACKAGES_UNCHANGED=True
TEST_REJECTED_COMPLIANT_MUTATION=True
```

**False-negative mutation.** I added a complete second browser package under
`apps/rogue-browser`: its own `package.json` with `vite build`, an `index.html` loading
`/src/main.ts`, and TypeScript that writes to `document.body`. I also gave it a separate part-map
entry whose responsibility says it is a second browser application. The focused invariant test
passed:

```text
Ran 1 test in 0.302s
OK
SECOND_BROWSER_PACKAGE_ADDED=True
SECOND_BROWSER_PART_ADDED=True
MUTATION_SURVIVED=True
```

The third-party-package loop only recognises selected `tsc` command shapes, paths overlapping
the current configurations, or a package `browser` field whose emitted entry can be linked back
to current source bytes or a page. A normal Vite package with no `browser` field escapes all
three heuristics.

**Purpose, frequency and cost.** The invariant fills a real verification gap in D-06. The product
has had one root package and two configurations since `11c7cbb`; the one later change to the build
files added the startup test command and did not break the layout. There is no recorded recurrence.
The 267-line check adds HTML parsing, URL resolution, shell tokenisation, TypeScript configuration
resolution and source-byte inference, but still lacks a stable definition of “application
package”. It can therefore move the problem to ordinary test tooling while missing the direct
case it was written to forbid.

**Smallest viable correction and cut.** Delete the speculative recognition layer
(`build_tokens`, `referenced_configs`, `PageScripts`, `page_loads_entry`, `config_outputs`,
`has_browser_entry`, and the loop at `:241-263`). Define the population from an authoritative
product boundary instead: files explicitly classified as browser/server application source by
the part map (excluding their tests) must be compiled by the root package's configurations and
must have no intervening package or lockfile. If the product cannot distinguish application source
from its tests in that boundary, narrow the invariant to the current browser and server source
trees rather than guessing from unrelated package metadata. This removes most of the maintenance
cost and makes missed classifications visible in the part map.

### 4. Medium: a newly added `application-build-layout` citation claims a type-environment rule absent from the invariant

**Checked.** The new citations at `tests/invariants/test_application_build_output.py:141`, `:155`
and `:174`, against `application-build-layout/1` at `foundations/invariants.md:85-93`.

**Evidence from a disposable mutation.** I kept the two TypeScript configuration files and their
two output directories distinct. I only allowed Node types in the browser configuration and the
DOM library in the server configuration. That leaves the new invariant true. The cross-probe test
at `:172-192` rejected the change twice because it separately demands that each configuration
exclude the other side's types:

```text
configuration='browser' ... FAIL: `npm run build` exits 0 ... uses `process`
configuration='server' ... FAIL: `npm run build` exits 0 ... uses `document`
CONFIGS_REMAIN_DISTINCT=True
OUTPUT_DIRS_REMAIN_DISTINCT=True
TEST_REJECTED_COMPLIANT_MUTATION=True
```

The separation of type environments appears in D-06's rationale, but the binding sentence and
the derived invariant require separate configurations and output directories, not mutually
exclusive type libraries.

**Scope distinction.** The cross-probe test and its citation of
`application-build-output/1` already existed at the base commit. Whether that older invariant test
is itself too strict is outside this filtered change. The assessed range newly adds only the
`application-build-layout/1` citation, so this observation concerns that citation, not the
unchanged build-output verdict.

**Smallest viable correction.** Remove only the `# invariant: application-build-layout/1` citation
from `test_each_configuration_rejects_source_only_the_other_accepts`. The first two build tests
already establish the two named configurations and their distinct output locations. If exclusive
browser/server type environments are intended to bind, add them to the decision's binding
sentences and derive a separate invariant; rationale alone does not authorise the test.

## Checks with no concern

- **D-04/2:** the binding sentences and fingerprint stay unchanged. The revised violation example
  now limits the JavaScript prohibition to the game's own code, which is faithful to the decision
  and avoids accidentally excluding external libraries.
- **D-05/2:** only provenance changes. The added vault origin was not independently opened under
  this assessment's boundary, so its source claim remains unverified; nothing in repository code
  contradicts it.
- **D-06/2:** naming package layout, build layout and build output closes the three clauses of its
  binding sentences without duplicating or contradicting another decision. The invariant guard
  accepts the decision links and fingerprints.
- **Recovered `public-file-boundary`:** current README and HTTP tests, `11c7cbb`, and the later
  server implementation at `3af85d1` demonstrate the behaviour and its foreign-working-directory
  case. Extra citations to a task-cycle report and PR discussion remain unverified under the input
  boundary, but there is no demonstrated contradiction.
- **Recovered `account-server-occupied-address`:** `de3ceb3` introduced the occupied-address test
  and non-zero startup failure, and `3af85d1` preserved it while changing the server start shape.
  The new invariant test checks the literal ready signal named by the sentence, performs a normal
  launch before and after the blocked launch, and leaves port 3000 free. I found no concern.
- **Part map:** the three new test files are assigned to the parts whose behaviour they test. The
  shorter `product-foundation` responsibility covers all files under `foundations/**` better than
  the previous two-item paraphrase. The part-map guard reports no errors or warnings; dependency
  comparison remains explicitly unchecked because the product declares no dependency-graph
  command.
- **Fresh-checkout instruction:** the one-line `npm ci` prerequisite matches README and the helper's
  explicit missing-`node_modules` failure. Its small duplication prevents an otherwise confusing
  first run and does not alter an invariant.
- **Whitespace and repository state:** `git diff --check` is clean, HEAD is the required immutable
  commit, and the worktree remained clean after disposable mutations.

## Verification run summary

- Full invariant suite: **34 tests passed** in **77.437 s**; port 3000 was released afterward.
- Decision guard with `--base` only: **0 errors, 3 warnings** (the three link placeholders).
- Decision guard with `--merge-onto` main: **3 errors** (the same placeholders).
- Invariant guard: **0 errors, 0 warnings, 0 unchecked**.
- Part-map guard: **0 errors, 0 warnings, 1 unchecked** (dependency graph unavailable).
- `git diff --check`: clean.
