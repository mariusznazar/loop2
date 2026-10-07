# Settlement of current independent assessment

Assessed product range: `44294da228ab8c27dfd1683f931f59f8d7f8d29d..bba696959ba721b50d0d2884df0fdbf45e5579bc`. Source: `reports/independent-assessment-current.md`. The critic had no access to the task, spec, plan, cycle history, implementation reasoning, or earlier reviews.

## 1. Decision approval placeholders — accepted as a required handoff step

The three merge-guard errors are real on the assessed range. The request URL does not exist yet, so the pinned task-cycle step 12 requires a draft request first, then replacement of the three `<request link>` values, commit, push, and a passing merge-form decision guard before marking the request ready. No version is considered merge-ready while the placeholders remain. This is already in the execution plan, and the critic's finding confirms that the final swap cannot be skipped.

## 2. Direct `sendFile` outside the public directory — accepted

The critic's disposable literal GET route serves `package.json` outside `dist/public`, preserves normal startup/public assets, and the focused boundary test passes. This violates the approved sentence. The current Express-static-root instrumentation has a real blind spot. Keep the sentence and return its check to the foundation step. Add an independent mechanism that detects direct file responses from a registered route regardless of its URL prefix, with the critic's mutation as a required red case and safe serving from within `dist/public` as a green control. The general limitation of executable checks remains explicit: code can create conditional, request-time routes or use another file API, so a future serving architecture must trigger renewed review. Do not substitute an extra fixed `/unprobed-static-leak` HTTP path.

The critic suggests narrowing/splitting the rule or binding an Express-static-only architecture. Either changes the product promise beyond this source task. A direct-route mechanism is a smaller test correction before considering either product change. If it cannot reliably reject the concrete mutation without false positives, reopen this settlement and prepare a blocked draft request for the human's choice.

## 3. Package-layout false positive and false negative — accepted

The `tests/package.json` tooling control and full Vite browser package under a separately mapped application part are concrete counterexamples. The classifier now costs far more than the explicit boundary it protects and still guesses from selected build commands and HTML patterns. Rewrite the check around authoritative application ownership, excluding tests from application source, while retaining a real second-package break for either browser or server side. Remove the speculative recognition helpers when the ownership method replaces them. The check must accept the exact test-tooling control, reject the critic's complete Vite/browser-part mutation, and keep unrelated tooling controls green. If the part map has no reliable way to distinguish a new application part from tooling, name that missing classification instead of inventing a heuristic rule that silently defines it.

## 4. Compiler-layout citation on cross-type rejection — accepted

The new citation alone associates a type-library exclusivity assertion with a sentence requiring distinct configurations and output directories. Remove `# invariant: application-build-layout/1` from that crossed-source method; retain it on the two compilation/output methods. The old `application-build-output/1` citation and test predate this task and remain outside this assessment's changed scope. This correction narrows the newly claimed evidence, while the existing cross-type test continues to run in the gate and may need a separate foundation decision if its old contract is revisited.

## Explicit verdict

Rewrite the three changed invariant-test paths and re-review their deliberate breaks and controls. The foundation sentences and other checked entries remain. Re-run the current whole-branch review, return audit, full gate and independent assessment on the resulting product range, then execute the planned request-link swap.
