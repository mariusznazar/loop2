# Final whole-branch code review

Range: `44294da228ab8c27dfd1683f931f59f8d7f8d29d..877821a0fd945449b71a3aed666675dfec1c519f` — eight commits, eight product files.

Reviewed worktree: `C:/Storage/repos/loop2-first-foundation`.

## Scope and evidence

I read the immutable review package once, recovering only the output segment truncated by the tool. I reviewed foundation changes first against the frozen task, spec, plan and pinned element templates/common rules, then the checks and their integration. The `.the-way` checkout and gitlink both name `7cfeb4c2349b181d251d1a03cb2005b980acbe9e`. HEAD was the requested commit and the working tree was clean before writing this ignored report. No reviewed file, index or branch was changed.

Targeted unchanged-code inspection addressed two concrete risks: whether the new server launch option changes old callers or leaks a running server, and whether the new compiler-layout assertion can pass while the build stops compiling one side. I read shared support, the existing build-output invariant check, the package scripts, build script and both compiler configurations. The default launch remains `npm start` at the copied repository root; the new mode launches the absolute built entry from the supplied directory and uses the existing readiness wait and process cleanup. The existing build-output check builds fresh copies, checks emitted files and tests the separation of browser/server compiler environments. The new layout check complements that runtime build evidence.

I used the orchestrator's reported current-HEAD results rather than rerunning the broad suite: ordinary tests 5/5, invariant gate 35/35 with a recorded pass for each new identifier, and `git diff --check` exit 0. These are supplied run evidence, not runs performed by this reviewer. Reported guards: invariant 0 errors/0 warnings/0 unchecked; decisions 3 errors/3 warnings for the three approval placeholders; part map 0 errors/0 warnings/1 unchecked for the missing dependency-graph command.

## Critical findings

None.

## Important findings

No new defect requiring a correction to the reviewed implementation.

The three approval placeholders remain an explicit, unresolved pre-merge condition, covered by the planned request handoff below. Their known guard errors are not waived or described as passing.

## Minor findings

None. No stylistic changes requested.

## Strengths

- Foundation and checks agree on four distinct identifiers and `/1` citations. Package ownership and compiler layout have separate sentences and checks. Both derive from the unchanged D-06 fingerprint; the two runtime rules correctly have recovered rows instead of an invented derivation from D-05.
- D-04/2, D-05/2 and D-06/2 append the accepted field corrections with `Change: unchanged sentences`. The immutable diff does not rewrite their approved `/1` predecessors. The exact product-foundation description and the dependency-installation precondition match the spec.
- The part map assigns the two layout checks to build-tools and both runtime checks to account-server; shared support remains owned by build-tools. No application source or ordinary test changed.
- The public-file check requires the actual HTML and JavaScript bytes from the built public directory while launching from a foreign directory. Its outside-file sentinels and traversal probes are independent of the error page's wording. The planted files live only in the temporary copy and foreign temporary directory, with server shutdown in `finally`.
- The occupied-address check requires normal readiness before and after the blocked launch, holds a real listening socket throughout the negative case, requires nonzero exit, and rejects the exact readiness line without rejecting an ordinary diagnostic that contains the address. A persistent unrelated startup failure cannot satisfy the normal controls.
- Compiler output paths are resolved before comparison, preventing differently spelled paths to one directory from counting as distinct outputs. The package check does not globally reject every nested npm package; it checks application-source ancestry and evidence connecting other packages to application build locations or entries.

## Recommendations and remaining handoff

Complete the already planned approval-link substitution after creating the draft PR. Locations:

- `C:/Storage/repos/loop2-first-foundation/foundations/decisions.md:156`
- `C:/Storage/repos/loop2-first-foundation/foundations/decisions.md:173`
- `C:/Storage/repos/loop2-first-foundation/foundations/decisions.md:191`

This is a **proposed addition to the existing request-handoff item**, not a new review thread.

**Do wklejenia:** Przed scaleniem zastąp trzy pola `<request link>` rzeczywistym adresem tego PR i uruchom ponownie strażnika formatu decyzji. Obecny wynik zawiera trzy błędy i trzy ostrzeżenia, więc nie stanowi zaliczenia tej kontroli.

**Dlaczego to zgłaszam:** Pole wskazuje akt zatwierdzenia wersji decyzji przez scalenie konkretnego requestu. Wartość `Mariusz, merge of <request link>` przy D-04/2, D-05/2 i D-06/2 nie identyfikuje żadnego requestu; dlatego obecny wynik nie uprawnia do scalenia. Zaplanowana podmiana samych trzech placeholderów na URL PR, commit i ponowne sprawdzenie formatu domykają ten warunek bez zmiany zdań wiążących ani starszych wersji decyzji. Pozostawienie placeholderów zachowuje błędy strażnika i brak wskazanego aktu zatwierdzenia; podmiana kosztuje jedną małą korektę dokumentu i jego kontrolę.

Keep the existing part-map dependency-graph result explicitly unchecked in the request. The four independent deliberate breaks and authorship evidence belong to the cycle reports: this review does not replace those records or the separately planned foundation assessment, return step, reconciliation and human merge decision.

## Declined to judge / evidence limits

- Container deployment and account-route implementation: explicitly outside this task, with no application change in the reviewed package.
- TypeScript 7 migration: explicitly outside scope; no version change in the package.
- Whether every possible future build system or independently developed tooling UI can be classified automatically as application or tooling by the package check: the implementation is a structural check of this repository's TypeScript/package layout, not a proof of arbitrary future package semantics. No actual incompatible tooling package is introduced here.
- Independent check authorship, the historical source-search execution, deliberate-break execution and subsequent foundation assessment: these acts are not established by a product diff. The dispatch supplies their existing evidence and names later required stages; I did not infer their absence from the diff or replay the unit reviews.
- Actual cross-part dependency agreement: no product command supplies the graph; the reported unchecked condition remains unresolved.

## Assessment

**Ready to merge? With fixes.**

The reviewed implementation has no new blocking finding and is ready to proceed to the planned request handoff. The exact reviewed HEAD is not merge-ready while its three approval placeholders produce decision-guard errors; replace them with the PR URL and complete the remaining planned gates before merging. No application/check fix or broad test rerun is requested by this review.
