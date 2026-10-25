# Author's comparison with the pinned guideline templates

Source: .the-way/product-guidelines/template.md and .the-way/product-guidelines/testing/template.md at 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c. This is an author check, not the independent review.

- Header, Discipline and Applies to: present; six valid parts. When to read covers writing, changing and review. Root AGENTS pointer is outside the managed block.
- Required section order: When to read, Levels, Rules, Recipes, Not tested on purpose, Examples, Where in code.
- Levels: three rows with D-81; unit/integration meanings live in the glossary, not copied as another glossary. Six-part complexity table distinguishes calculations, real connections and real-browser behaviour; no ratio of levels.
- Required rules: Choosing the level; A lower test for a bug caught high; Where the expected value comes from; Test inputs and expected values; Changing an existing test; Behaviour, not implementation; Trust boundaries; AI in tests; Flaky tests. Each has Decision, Invariant, Good and Bad in order. The tenth product rule is Test files in the gate, backed by D-83 and node-test-selection.
- Choosing table: all nine template questions represented. Generated-input tests, complete browser journeys and npm contract checks have the accepted substitutions; no added library, runner or generated test.
- Expectations and changes: independent sources; accepted-document policy; current results/snapshots do not establish correctness; weakening, deletion and skipping require a cause on the requirement/data side; setup checks do not fix internal representation.
- Boundary table: icons, fonts, server, lockfile, audit script, preview server and deployment. Lockfile and audit use the same refusal test, not duplicate tests. Font and preview review deferrals remain explicit and tied to their first changed boundary. Authorization table has who/resource/action/result/decision with D-86.
- AI: no AI test tool is adopted; future judge/healing conditions retain template requirements. Flaky reruns diagnose, not erase failures.
- Recipes: all three levels carry the nine fields in order: Purpose, Files, Shape, Doubles, Data, Time and randomness, Exemplar, Command, Time limit. Repeated fields point to their earlier level. Binding fields cite product decisions. The HTTP helper's idle timeout and unbounded listening wait remain explicitly outside its exemplar and are deferred until helper change.
- Six departures: D-74 generated inputs; D-75 journeys; D-76 fonts/preview refusal tests; D-77 selection/whole-run timeout; D-78 named variants; D-79 registry contract. No seventh unstated departure identified.
- Exclusions: pass-through code, screen-pixel comparisons, whole browser journeys and real events/focus/SVG, each with return condition and decision. Trust boundaries are not excluded there. Author/reviewer revisit is explicit.
- Examples: moved explicit-time illustration, without changing the test or designating a fourth exemplar; examples of tests adding no protection.
- Where in code: current tracked configuration, directories, referenced product files and exemplar cases. No copied central timeout or tool configuration value.
- Foundation: 25 accepted settlement rows mapped in author-report.md; revised D-28 retains all unrelated deferrals; D-33/D-45/D-46 reciprocal verification references added.

Observed corrections from this check: replaced an invented icon-test case name with its actual existing control case; removed rationale from the guideline's boundary paragraph (it belongs in D-76); made external source locations explicit; checked expected values in retained wander cases and replaced product-derived neighbours with explicit axial inputs/allowed results. These are author corrections, not new product choices.
