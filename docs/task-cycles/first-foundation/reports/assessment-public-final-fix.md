# Public boundary correction: no authorized sound patch established

Assessed product HEAD: `ce55c6cda70aea18f8f4ec647776abad45574058`.
Input read in full: `reports/independent-assessment-recheck.md` and pinned `task-cycle/skill/SKILL.md`. The source-bound public-file-boundary/1 sentence stays unchanged:

> The server serves static files only from the built public directory, whatever working directory its process starts in.

No product file was edited or committed. Only this ignored report was written. This agent returns at the requested pre-edit decision boundary; it has not started a new implementation/review/PR stage. No full gate rerun is claimed: without a product change it cannot resolve the known false pass. The reassessment reports the existing full suite green while its deliberate violations are green too.

## Confirmed blocker

The assessment's parameterized and nested-router leaks are ordinary violations. Adding those route shapes would close those examples but leave request headers, cookies, method, body, authentication, time and application state unbounded. A test-only wrapper sees only operations actually executed during its run. It cannot prevent or observe a later operation in the uninstrumented product.

I reproduced an additional counterexample below on the current code: an already enumerated literal GET route serves the public script normally but serves root package.json for one ordinary request header. The focused test still passes. This proves that recursively enumerating every route cannot establish the broad sentence even when route discovery itself is complete.

Static source inspection can improve coverage but must also follow aliases, imported functions, dynamically computed paths and ordinary filesystem-to-response byte flows. Banning all reads would reject permitted internal reads. Banning every transfer except express.static would reject the required safe rooted sendFile control. Patching the built server during the test to enforce containment would check the modified test server, not establish the unmodified product's behavior.

## What is impossible, and what is not

A complete terminating automatic checker for arbitrary JavaScript that always accepts every compliant program and rejects every possible outside-file response is not available: a file response can depend on arbitrary program computation and unbounded request/state choices. Finite HTTP sampling cannot provide that guarantee.

This does NOT make a sound incomplete checker impossible. Such a checker may pass only programs for which it establishes a sufficient proof and block all others, including some compliant programs. That distinction matters here: a fail-closed proof boundary is potentially a verification policy, not necessarily a new product architecture rule. It must say 'no proof for this construct', not silently redefine safe sendFile or internal reads as forbidden.

I have not established a small sound incomplete checker within this correction. Merely hashing the present app, matching known route snippets, checking whether a sendFile token appears, or maintaining a finite API blacklist is not a general proof. A reviewed source snapshot can be evidence for an approved version, but it is human-attested evidence and should be represented that way. It would also block the required disposable safe control unless that control's semantics are genuinely proved or separately attested.

## Reviewable options and costs

### 1. Preserve sentence and use a human-assessed Method

Retain the broad sentence exactly. Set Method to a review document using the already supported the-way human-assessment route. That review covers the complete file-serving surface and its relevant dependencies; keep existing automated root/public-byte/traversal checks as supporting evidence rather than presenting their pass as proof of the entire sentence.

Leaving the current method unchanged keeps a demonstrated false pass. This option removes that misrepresentation without restricting valid Express behavior, and safe rooted sendFile/internal reads remain permitted. Cost: each relevant serving change needs a recorded human assessment; the gate cannot automatically grant the broad invariant a pass without that verdict. It requires a foundation Method change outside this agent's write authorization, and must first be checked against any source requirement for an executable Method. No narrowing of the sentence is needed.

Recommendation if the source permits a human-assessed Method: this is the smallest truthful fit to the current broad promise. If an executable Method is mandatory, this option requires a source-level decision and cannot be silently substituted.

### 2. Preserve sentence and implement a fail-closed source-proof Method

Permit a test-only verifier to accept a deliberately limited set of provable serving programs, and report no verdict for unknown constructs. It must prove all externally reachable serving operations of accepted code, not choose sample route values. Registered paths and router nesting can then be irrelevant if every response-producing operation is certified independently of routing. The supported proof rules could accept a statically public-rooted sendFile and reads whose bytes are drained internally rather than sent to a response. Therefore the specified safe rooted control and unrelated-read control can, in principle, be green without an express.static-only architecture restriction.

Concrete proof obligations before a pass:

- Define and inspect the entire executable application/module closure contributing to the server, including entry/startup files, imports and generated output, with explicit trust assumptions for pinned Express/send and build dependencies.
- Establish the built public root independently and prove containment for every possible file target in each accepted emitter; handle aliases, root options, extension/index selection and symlink assumptions explicitly.
- Trace filesystem-derived bytes through response operations, not merely API names; allow harmless internal reads only when they cannot reach a response in the accepted program.
- Reject or return no verdict for unknown imports, dynamic dispatch/code loading, monkeypatches, unproved callbacks/paths and other constructs outside the sound proof rules. Never fall back from unknown to runtime samples and call that a pass.
- Bind evidence to the code/dependency version being checked, preserving the independent sentence/check/code roles and deliberate-break review.

Cost: this is a new source analysis/proof system, with false blocking of valid unrecognized refactors, recurring proof-rule maintenance, and review required whenever the supported code subset grows. A source snapshot certificate is cheaper but shifts proof back to recorded human assessment. There is no soundness evidence for either system in the current task record. Expanding the current test ad hoc would hide these new obligations.

Pinned gate detail: `run_tests.py:34-38` makes a skipped test produce no invariant verdict, and the gate reads that as ERROR unless another check failed; it is NOT automatically UNCHECKED. The closed unchecked-reason list must not be invented around. A fail-closed proof checker can deliberately block with an explicit diagnostic, but the orchestrator must settle whether this verification policy and its cost are within the task before implementation. This option can satisfy the unchanged sentence and the named safe controls in principle; it has not been implemented or demonstrated sound here.

### 3. Preserve sentence and enforce containment in production

Introduce a production serving boundary that validates actual file targets for every supported transfer, or an OS/process boundary with access only to public static files and explicitly separated internal data access. Then test and inspect that enforcement, including bypass prevention. Merely wrapping sendFile is insufficient while arbitrary filesystem bytes can still be sent through response.send or streams.

Cost: application/architecture changes, integration risk, and an explicit closed serving mechanism. This is outside the authorized test-only correction. A prohibition on other serving paths needs a binding source; the test cannot invent it. Safe public sendFile could remain supported by the enforcement API, but that product design has not been authorized.

### 4. Keep expanding route and request samples

This is cheap for the next two examples and preserves valid controls. It continues to false-pass untested branches, as the header experiment demonstrates, so it does not meet the stated blocker. I do not recommend it as an acceptance fix.

## Requested orchestrator settlement

Select whether the broad Method may become human-assessed, or whether a new fail-closed verification policy with explicit proof obligations is authorized for design. If neither is compatible with the source, and production enforcement remains out of scope, the required automatic broad verdict is blocked. The current passing suite must not be reported as resolving that blocker.


# Public boundary final correction assessment

## Additional concrete counterexample

The current literal route is enumerated and requested, but a different ordinary header exposes the outside file. Both uninstrumented requests returned HTTP 200: default request exactly public main.js; header x-boundary-case: outside exactly root package.json. The focused invariant still passed. Mutation was applied only to the built disposable copy and restored in finally.

```js
app.get('/boundary-header-case', (request, response) => {
  if (request.get('x-boundary-case') === 'outside') {
    response.sendFile(fileURLToPath(new URL('../../package.json', import.meta.url)));
  } else {
    response.sendFile('main.js', {root: publicDirectory});
  }
});
```

```text
.
----------------------------------------------------------------------
Ran 1 test in 5.347s

OK
```
