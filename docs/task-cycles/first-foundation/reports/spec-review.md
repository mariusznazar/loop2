# Independent spec review

**Verdict: revise the package-layout sentence before planning.** The remaining specified outcomes match the frozen task, the earlier proposal, PR #3's U1–U4/U8, and the current foundation.

## Finding 1 — the package check binds more than its sentence

**Location:** `spec.md:13`, `spec.md:37`.

The proposed sentence says the browser and server **share one** npm package and lockfile. Sharing one does not expressly rule out a second application package for either side. The specified check, however, must fail when either side gains a second package boundary. The source proposal said, “The application has one npm package and lockfile,” and the task carried the split as “one package and lockfile / separate configurations and output directories.” A repository could retain the shared root package and lockfile while moving the browser's build into its own package. The proposed sentence could still be read as true, but the check would fail. Under the pinned invariant template, the test must check the sentence and may not introduce a stricter obligation by itself.

**Fix:** make exclusivity explicit while limiting it to the application, for example: “The browser and server use a single shared npm package and lockfile, with no separate application package for either side.” Then keep the test's allowance for an unrelated tooling package. This preserves the source's one-package rule and gives the second-package deliberate break a direct sentence to violate.

## Other required outcomes checked

- `spec.md:14–16`: the compiler-layout half is separate from the existing `application-build-output/1`; both new entries derive from D-06, and D-06's level-1 verification gains both names.
- `spec.md:20–23`: the public-file and occupied-address sentences and their `Derives from: none` and part assignments match part C of the proposal. Only these two need recovered rows under the pinned template because they predate this task and derive from no product decision.
- `spec.md:25`: the `npm ci` preamble identifies the prerequisite without changing the template's single-command *Method* field or claiming missing dependencies become `unchecked`.
- `spec.md:29–31`: the product-foundation sentence, D-05 *Origin*, and D-04 violation example match the accepted PR corrections; the binding decision sentences stay intact.
- `spec.md:35–42`: separate check writers and deliberate-break reviewer, a real built asset and planted outside files, a foreign process working directory, traversal probes, normal-start control, occupied-address failure, and cleanup provide concrete verification. The existing application code supports these behaviors. Generic build or startup failure is expressly rejected as a passing negative case.
- `spec.md:46–48`: four new citing checks, part-map ownership, `npm test`, the full invariant gate, and format guards are accounted for. The task's deployment and TypeScript 7 exclusions remain respected.

No other contradiction, invented product obligation, or untestable assertion was found in the specification.

## Closure check

**Finding 1 closed.** Revised `spec.md:13` explicitly excludes a separate application package for either side, and `spec.md:37` directs the check to enforce that same boundary while allowing unrelated tooling packages. The sentence and check now impose the same obligation. This closure check covered only the revised lines.

## Targeted decision-version amendment review

**Accepted for this boundary.** Revised `spec.md:7,16,27–32` and `design.md` treat D-04/1, D-05/1 and D-06/1 as historical sources and D-04/2, D-05/2 and D-06/2 as current. Commit `d5feaf9` appends only the three /2 entries to `foundations/decisions.md`; their binding sentences repeat /1 exactly. The /2 entries contain the accepted D-04 violation example, D-05 *Origin* and D-06 invariant names, with a rationale for each field change and an explicit rejected alternative. The specification's four invariant sentences, independent-check instructions, deliberate breaks and verification commands are unchanged by this amendment. This was a targeted check, not a new full review.
