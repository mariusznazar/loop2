# Independent reassessment of the current foundation change

## Assessed material

- Immutable product range:
  `44294da228ab8c27dfd1683f931f59f8d7f8d29d..ce55c6cda70aea18f8f4ec647776abad45574058`.
- Strict filter: `foundations/decisions.md`, `foundations/invariants.md`,
  `foundations/part_map.md`, `tests/invariants/loop2_invariant_support.py`,
  `tests/invariants/test_account_server_occupied_address.py`,
  `tests/invariants/test_application_build_output.py`,
  `tests/invariants/test_application_package_layout.py`, and
  `tests/invariants/test_public_file_boundary.py`.
- Pinned the-way checkout and gitlink both resolve to
  `7cfeb4c2349b181d251d1a03cb2005b980acbe9e`.
- I did not read the task, specification, plan, cycle record, settlement, or implementation and
  review reports. Earlier assessment remarks were treated as hypotheses and retested against the
  current commit.

## Verdict

**Rewrite before acceptance.** The package-layout and build-layout corrections answer their prior
findings. The public-file test now catches a direct literal `sendFile` leak, including one sent
with HTTP status 404, without rejecting a safe rooted transfer or an unrelated internal read.
However, the broad invariant still receives a false pass for parameterized routes and for literal
routes inside a mounted Express router. The test itself acknowledges these limits, while the
invariant Method records a pass rather than an unchecked result.

The three decision approval URLs are **pending**, not passed. Their placeholders are expected
before a draft request URL exists, but the merge form of the guard must be rerun after concrete
URLs replace them.

## Blocking observation

### `public-file-boundary/1` still passes ordinary routes that serve a file outside `dist/public`

**Invariant.** `foundations/invariants.md:95-103` says the server serves static files only from the
built public directory, whatever working directory its process starts in.

**Current check.** `tests/invariants/test_public_file_boundary.py:39-119` wraps Express static
roots and successful `sendFile` streams, then requests top-level literal GET routes found in
`app.router.stack`. Lines 8-11 accurately disclose that parameterized routes, nested routes,
authentication and other conditions are not covered. That disclosure does not change the
invariant's result: the Method still reports `pass` for the universal sentence.

#### Control: the previously missed direct leak is now red, including HTTP 404

In the disposable built copy, immediately after `const app = express();`, I registered an
arbitrary literal route:

```js
app.get('/leak-404-arbitrary-route', (_request, response) =>
  response.status(404).sendFile(
    fileURLToPath(new URL('../../package.json', import.meta.url))));
```

The focused check failed on the actual transferred path outside `dist/public`:

```text
FAIL ... file_response={
  'url': '/leak-404-arbitrary-route',
  'target': '<temporary copy>\\package.json'
}
AssertionError: False is not true :
a direct file response serves outside the built public directory
CASE=leak_sendfile_404 SUCCESS=False
```

This answers the original concrete false negative. The 404 status does not hide transferred file
bytes from the audit.

#### Control: safe rooted `sendFile` is green

I registered:

```js
app.get('/safe-rooted-file', (_request, response) =>
  response.sendFile('index.html', { root: publicDirectory }));
```

The focused check passed:

```text
Ran 1 test in 5.423s
OK
CASE=safe_rooted_sendfile SUCCESS=True
```

#### Control: an unrelated internal stream read is green

I registered a literal GET route that opened `package.json` with `createReadStream`, drained the
stream without piping it to the response, and returned 204. The focused check passed:

```text
Ran 1 test in 5.358s
OK
CASE=unrelated_internal_stream_read SUCCESS=True
```

This demonstrates that the `pipe` observation distinguishes an internal read from a file
transfer for the covered route shape.

#### Remaining false negative 1: parameterized route

I registered:

```js
app.get('/leak/:name', (_request, response) =>
  response.sendFile(fileURLToPath(new URL('../../package.json', import.meta.url))));
```

The route violates the same invariant, but the check deliberately skips route paths containing
`:`, so no request invokes it:

```text
Ran 1 test in 5.367s
OK
CASE=parameterized_sendfile_leak SUCCESS=True
```

#### Remaining false negative 2: literal route in a mounted router

I registered:

```js
const leakRouter = express.Router();
leakRouter.get('/file', (_request, response) =>
  response.sendFile(fileURLToPath(new URL('../../package.json', import.meta.url))));
app.use('/nested-leak', leakRouter);
```

The externally reachable route is the fully literal `GET /nested-leak/file`. The top-level stack
layer is middleware rather than a route, so the audit does not descend into it:

```text
Ran 1 test in 5.304s
OK
CASE=nested_router_literal_sendfile_leak SUCCESS=True
```

**Purpose and cost.** The boundary protects users and operators from exposing application or
repository files. The new runtime audit adds about 79 lines and roughly five seconds to a focused
run. It is useful sampled coverage, but route-space sampling cannot prove the broad sentence:
parameters, nested routers, authentication, method choice, headers and request-time registration
make the population open-ended.

**Smallest viable correction.** Choose a closed architecture that can be checked exhaustively,
then make the invariant say that. The smallest fit for the current product is:

1. an invariant that every `express.static` root is within the built public directory; and
2. an invariant or binding architecture rule that the server serves static files only through
   those `express.static` registrations.

The second rule needs a source/dependency check that forbids other file-transfer mechanisms, not
another list of routes. If the product wants to permit direct file responses, the current broad
invariant needs a human-assessed Method or a narrower sentence; enumerating more Express route
shapes will keep moving the false-negative boundary. Once the mechanism is closed, the route
enumeration and stream-pipe machinery that no longer proves a separate rule can be cut.

## Prior observations retested with no remaining concern

### `application-package-layout/1`

The correction reduces the test from 267 to 100 lines and replaces package-script, HTML, URL and
source-byte heuristics with part-map ownership plus an explicit classification boundary.

Disposable controls against the current test:

| Control | Expected | Result | Evidence |
|---|---:|---:|---|
| tracked `tests/package.json`, application packages unchanged | green | green | `CASE=tracked_tests_package SUCCESS=True` |
| complete Vite browser package in a new `rogue-browser` part, with non-overlapping ownership | red | red | failure says the nested package contains `index.html` owned by the unclassified part; `COMPLETE_VITE_APPLICATION_PART_RED=True` |
| nested package under `src/server` | red | red | overlapping `account-server`/`build-tools` ownership is detected; `CASE=nested_server_package SUCCESS=False` |
| valid bulleted continuation lines in map `Files` fields | green | green | `CASE=valid_bulleted_continuations SUCCESS=True` |
| a second part claiming `src/server/**` | red | red | overlap detected at `src/server/app.ts`; `CASE=overlapping_map_owner SUCCESS=False` |

For the Vite control, the part owned `apps/rogue-browser/index.html` and
`apps/rogue-browser/src/**`, while the existing `build-tools` pattern owned the nested
`package.json`; therefore the red result did not depend on overlapping part patterns. It reached
the intended “classify this part” failure at `test_application_package_layout.py:93-95`.

The closed sets at lines 17-20 intentionally make an unknown source-owning part with a nested
package fail for human classification. That can temporarily reject a compliant new CLI or tool
package, but the failure is explicit, the correction is one reviewed set entry, and new parts are
rare foundation changes. This is a visible conservative cost rather than the previous silent
Vite false pass. I found no cheaper automatic classifier that would preserve the same protection.

No further cut is indicated: the speculative recognition layer was removed, and the remaining
Git ownership resolution is the mechanism the part map itself declares.

### `application-build-layout/1`

The correction removes the layout citation only from
`test_each_configuration_rejects_source_only_the_other_accepts`, leaving it on the two output
methods.

I repeated the compliant mutation: both TypeScript configurations and output directories remained
distinct, while the browser configuration admitted Node types and the server configuration
admitted the DOM library. The pre-existing cross-type method failed, so the focused runner exited
1, but its run record contained:

```text
pass application-build-layout/1 — test_build_compiles_made_up_source_under_each_configuration
pass application-build-layout/1 — test_build_emits_every_source_file_of_both_configurations
fail application-build-output/1 — test_each_configuration_rejects_source_only_the_other_accepts
```

There was no `fail` record for `application-build-layout/1`. This is the requested separation:
the layout identifier passes even while the pre-existing output invariant method fails. The older
`application-build-output` strictness is unchanged and remains outside this filtered correction.

### Decision approval placeholders

The entries at `foundations/decisions.md:156`, `:173` and `:191` still read
`Mariusz, merge of <request link>`.

- Branch guard: 0 errors, 3 warnings.
- Merge guard against main: 3 errors, 3 warnings.

This is the expected pre-request state and is **pending**. It is not a pass and the range is not
merge-ready until a concrete request URL replaces each placeholder and the merge guard is rerun.

## Other explicit no-concern checks

- The foundation entries, part assignments, recovered-source rows, occupied-address test and
  shared support file are unchanged from the previously assessed head. Current repository code
  still demonstrates the two recovered behaviours; excluded external citations remain unverified,
  with no demonstrated contradiction.
- The invariant format guard reports 0 errors, 0 warnings and 0 unchecked.
- The part-map guard reports 0 errors and 0 warnings; dependency comparison remains explicitly
  unchecked because the product declares no dependency-graph command.
- `git diff --check` is clean.
- I found no new concrete false positive or false negative in the current package-layout or
  build-layout corrections beyond the intentional unknown-part review described above.

## Verification summary

- Baseline invariant suite at `ce55c6cda70aea18f8f4ec647776abad45574058`:
  **34 tests passed in 69.052 seconds**.
- Public-file focused controls:
  direct literal leak with 404 red; safe rooted `sendFile` green; unrelated internal stream read
  green; parameterized leak incorrectly green; nested-router literal leak incorrectly green.
- Package-layout focused controls:
  all five controls produced their expected green/red result.
- Build-layout run record:
  two layout passes, no layout failure; the cross-type failure belongs only to
  `application-build-output/1`.
- Port 3000 was released after the runs.
