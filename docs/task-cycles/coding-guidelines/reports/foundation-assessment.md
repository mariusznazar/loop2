# Independent foundation and invariant-test assessment

## Assessed object and boundaries

- Base: `c379207bfd8bd148d3589ea75604ba5165915d01`.
- Assessed commit: `52bd7f7f1608774113cdc3039a9e49b51e87bc97`.
- Range: `c379207bfd8bd148d3589ea75604ba5165915d01..52bd7f7f1608774113cdc3039a9e49b51e87bc97`.
- Input diff: `.runs/foundation-assessment/input.diff`.
- Input manifest: `.runs/foundation-assessment/range.json`; its 75 included paths exactly match the 75 diff headers, including their order.
- Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`. HEAD matched the assessed commit. The `.the-way` checkout and indexed gitlink both matched `d829e3aa6242a9b8901274531dd82fd5c7d87628`.
- Assessment rule: `.the-way/elements/common/critique/SKILL.md`, read in full. Also read the pinned shared element rules, decision/invariant/environment-fact/part-map templates, and both guidelines templates.

This is a source assessment, not approval, settlement of remarks, a merge verdict or a test-run report. No task, spec, plan, cycle history, author reasoning, operational handoff, previous report, transcript, or 10x branch/directory was read. Existing repository instructions and coding guidelines were read only as permitted rules and source context. No product file, index, branch or HEAD was changed. No product test suite, process observation, port probe or container command was run.

The four changed foundation files and three changed files under `tests/invariants/` were read as whole targets. The quality-check implementations, configuration and installation declarations were read to compare their behavior with the new binding statements. The four designated exemplars, the server entry point, and the two supporting test files for changed process/resource behavior were read in full. The remaining application/test reformatting and complete dependency tree are contextual parts of the supplied manifest, not a claim of exhaustive functional review.

## Observations

### FA-1 — The part map omits the new runtime dependency on product-foundation

**Evidence.** `foundations/part_map.md:85` still gives build-tools:

> - **Depends on:** browser-view · simulation · account-server

The same map assigns `scripts/**` to build-tools and `foundations/**` to product-foundation. The new `scripts/quality_support.py:69`–95 reads and parses `foundations/part_map.md`; `discover_files` calls it at line 109. Missing, unreadable or invalid foundation input stops discovery. Every new standing-check adapter uses this discovery. In addition, `scripts/check_dependencies.py:101`–132 reads the base commit's map and uses it to assign base manifests to build-tools.

This is a concrete functional dependency: changing the foundation's ownership definitions changes the files the quality tools examine, and breaking the file stops those tools. The pinned `.the-way/elements/part-map/template.md`, opening explanation and `Depends on` field, makes the map the declaration of allowed dependencies, not just a catalogue of imports.

**Consequence and cost.** Keeping the current map makes the newly introduced implementation contradict its declared allowed dependencies and hides which component supplies discovery's input. Recording the dependency costs one relationship; it adds no runtime machinery. Removing the map-based discovery instead would require another scope source and duplicate ownership policy.

**What would have to change.** The map must account for build-tools reading product-foundation, or the implementation must cease that dependency. This observation does not claim that a generated dependency graph reported a violation; no graph command was run.

### FA-2 — D-28 embeds a one-time introduction condition in a permanent decision

**Evidence.** The second binding sentence of `foundations/decisions.md:825` reads:

> The introduction of the adopted linters uses full compliance before merge instead of the transitional per-file no-regression invariant, and a repair exceeding the accepted scope returns to a decision rather than leaving a violation or weakening the rule set.

The pinned `.the-way/elements/decisions/template.md:119`–121 explicitly asks whether a rule still binds after the change that brings it is merged; a rule that does not belongs to the work's plan or cycle choices, not the decision log. The assessed range introduces the adopted linters and their strict source invariants together. D-29 through D-32 and the new invariant sentences already express the lasting compliant state; none defines a lasting meaning for “the accepted scope.”

**Consequence and cost.** Keeping this sentence requires future readers to recover the scope of a completed introduction, and mixes a condition for this merge with rules governing later changes. Cutting only that one-time condition reduces future interpretation work and does not remove any current linter or formatter check. Conversely, cutting the lasting deferrals and selected-example choices from D-28 would lose actual policy, so this observation does not call for deleting D-28.

**What would have to change.** Separate the one-time introduction/repair-scope condition from the enduring policy. If the intended meaning is a permanent rule for every later introduction of a linter or change of its set, that meaning needs to be explicit rather than inferred from the present sentence. The critic has not inspected or proposed edits to a task/cycle artifact.

## Explicit results without concerns

### Rule membership and scope

No internal membership contradiction was found between the new environment-fact statements, D-29/D-30 and the independent rule inventories in the methods. A read-only AST/text comparison counted 64 JavaScript rules, 92 active TypeScript rules after compatibility exclusions/additions, and 407 Ruff fact members minus exactly the fourteen D-30 examples, leaving 393. There were no extra Ruff blocking members. This verifies the correspondence among committed sources, not the truth of an external publisher's release.

`scripts/check_eslint.py:15`–92 keeps literal membership separate from imported presets. `scripts/inspect_eslint.mjs:10`–160 uses that membership for the source run and separately compares effective configuration, including options and coverage. `scripts/check_ruff.py:155`–182 supplies the blocking set explicitly with isolated configuration and no preview. The absence of a second Ruff configuration invariant follows the pinned coding template's explicit-list exception; it is not a coverage omission.

`scripts/quality_support.py:97`–161 discovers both tracked and unignored untracked files, checks ownership before language classification and rejects missing/unsafe files. New supported paths cannot silently pass by being absent from a fixed adapter input list. An unsupported ESLint configuration path produces failure rather than successful inspection. Aside from FA-1's missing map relationship, no scope weakening was identified.

### Method result semantics and external input

No concern found in the distinction between an established violation and inability to check. `scripts/quality_support.py:164`–205 records a named pass only after an actual boolean result; an exception records failure with no invariant verdict. The adapters validate their output shapes and coverage rather than translating a successful child-process exit directly into an invariant pass.

D-33 and `scripts/check_dependencies.py` agree on actual introduced name/version pairs, all dependency maps, concrete advisory-range matching, and no success from unsupported or incomplete input. The bridge sends the introduced names and versions to the bulk advisory endpoint, not source code; the no-introduction path returns only after both dependency graphs and ranges validate. Redirect rejection and response validation fit the map's newly named audit trust boundary. No network request was made in this assessment, so no current vulnerability result is asserted.

The ShellCheck adapter deliberately cannot establish neutrality for arbitrary suppressions whose rule classification it does not know (`scripts/check_shellcheck.py:63`–130). This may stop an otherwise clean future script for manual clarification, but it is visible inability to check, not an invented successful verdict. The parser-assisted probe avoids treating examples in strings/heredocs as directives. No evidence in the permitted source justified replacing this with a complete second shell parser.

### Existing invariant checks

No changed assertion, expected value, request population or named invariant version was found in the three changed invariant files.

- `tests/invariants/test_loop2_api_error_route.py` only loses an unused import.
- `tests/invariants/test_loop2_one_serving_process.py:72`–84 and 130–132 now reject failed process/listener commands before parsing their apparently usable stdout. The existing request and process assertions remain.
- `tests/invariants/loop2_invariant_support.py:83`–85 likewise rejects a failed Windows process query; `kill_tree` retains an attempt to stop the known live parent even when descendant enumeration fails. This does not claim that unknown descendants can always be recovered after the parent has exited.
- The `ExitStack` and `_server_logs` change at `tests/invariants/loop2_invariant_support.py:235`–295 ties partial acquisition and process-start failure to cleanup. The new support tests cover second-log-open failure, spawn failure and cleanup failure as well as successful acquisition. They were inspected, not executed.

These changes preserve or strengthen the evidence needed by the existing invariants. Reverting their error checks would allow incomplete external observations to be consumed again. Removing resource cleanup would restore visible leak paths. Nothing of these changes can be cut without losing the behavior they address.

### Exemplars, existing decisions and copied guideline invariants

No contradiction found between D-34–D-37 and the actual selected files. The resource catalogue uses `satisfies` and derives its identifier type from keys; the game module exposes explicit time/state inputs and state/events results; the status row constructs controls once and updates text in place; the HTTP module creates the Express application while the separate entry point starts listening.

The decisions keep these implementation shapes as examples and retain the existing simulation-isolation, nonmutating-input, DOM/framework, content-identifier, Express and API-error obligations. They introduce no new universal `GameResult`, `update()` or factory-shape requirement. The corresponding kind guidelines preserve that distinction.

No concern found with adding `guidelines-form` and `guidelines-reference-current` with `Derives from: none`. Their binding sentences match the pinned common guidelines template's product copies; the pinned template explicitly requires this form. Their Part assignments cover the guideline owner, foundation and pin owner as applicable.

The expanded part responsibility, ownership for quality configuration/tests and guidelines, audit trust boundary, npm registry's bidirectional exchange and PyPI entry describe visible new responsibilities/exchanges. FA-1 is the specific missing relationship rather than a rejection of that map update.

## Cost and what can be cut

The useful moment is a later code change: the checks establish repeatable lint/format outcomes, preserve the adopted rule sets and distinguish introduced vulnerable versions from unchanged debt. The exemplars help the next author of those four kinds without making every similar file structurally identical.

The adapters are substantial compared with invoking the tools directly. Their cost comes from ownership-based discovery, parsing tool output, preserving independently specified rule membership/options, rejecting suppression and distinguishing inability to check. These responsibilities are visible requirements of D-29–D-33 and the pinned templates. A direct linter command alone would not give equivalent evidence. The common support module removes repetition; the narrower exemplars and deferred formatters avoid adding unsupported obligations.

The definite candidate to cut is FA-2's one-time introduction condition. No new inventory, framework, baseline debt mechanism, general parser or additional exemplar is recommended. I found no further removable implementation layer whose removal preserves all currently stated guarantees. This does not assert that the implementation is globally minimal: runtime cost and the maintenance cost of future tool upgrades were not measured.

## Limits and evidence not available

- The allowed source set excludes operational records and author/human deliberations. No claim about problem frequency, recurrence after an earlier rule, measured savings, or fidelity to a human's unstated settlements is made. Number of examined session transcripts/run logs: zero, deliberately excluded. The new-rule status and preexisting test behavior were determined from the supplied diff; wider historical investigation was outside this assessment boundary.
- The environment facts contain versioned source addresses and quoted release content. Their membership was compared with the committed methods and the cited passages, but the external URLs/releases were not fetched. All four new environment-fact Methods are `TODO`; they are unchecked, not passed.
- No invariant Methods, mutation checks, installation commands or broad tests were run. In particular there is no new evidence here of full lint compliance, successful package installation, Windows process ownership at runtime, HTTP behavior, container behavior or deployment.
- The broader application reformatting was not given an exhaustive functional review. No assessment of dependency package bytes, wheel hashes against their publisher, licensing, or every transitive package is implied.
- No author settlement is supplied. The two observations are inputs for source verification and human/author disposition.

## Exact included-file manifest

The following section is transcribed from the input manifest for this assessed range.


```text
.gitattributes
eslint.config.mjs
foundations/decisions.md
foundations/environment_facts.md
foundations/invariants.md
foundations/part_map.md
package-lock.json
package.json
prettier.config.mjs
requirements-quality.in
requirements-quality.txt
scripts/build.mjs
scripts/check_dependencies.py
scripts/check_eslint.py
scripts/check_format.py
scripts/check_ruff.py
scripts/check_shellcheck.py
scripts/inspect_eslint.mjs
scripts/quality_support.py
src/browser/index.html
src/browser/main.ts
src/browser/sim/data/actions.ts
src/browser/sim/data/archetypes.ts
src/browser/sim/data/conditions.ts
src/browser/sim/data/maps.ts
src/browser/sim/data/resources.ts
src/browser/sim/game.ts
src/browser/sim/hex.ts
src/browser/sim/layout.ts
src/browser/sim/program.ts
src/browser/sim/random.ts
src/browser/sim/run.ts
src/browser/sim/types.ts
src/browser/view/app.ts
src/browser/view/clock.ts
src/browser/view/credits.ts
src/browser/view/footer.ts
src/browser/view/program-editor.ts
src/browser/view/send-panel.ts
src/browser/view/status-row.ts
src/browser/view/terrain-panel.ts
src/browser/view/terrain-picture.ts
src/browser/view/tile-list.ts
src/server/app.ts
src/server/main.ts
tests/deploy/test_loop2_deploy_build.py
tests/http.test.mjs
tests/invariants/loop2_invariant_support.py
tests/invariants/test_loop2_api_error_route.py
tests/invariants/test_loop2_one_serving_process.py
tests/quality/fixtures/dependency-audit/package-lock.json
tests/quality/fixtures/dependency-audit/package.json
tests/quality/test_dependency_audit.py
tests/quality/test_eslint_checks.py
tests/quality/test_format_check.py
tests/quality/test_invariant_support.py
tests/quality/test_process_observation.py
tests/quality/test_python_shell_checks.py
tests/quality/test_quality_support.py
tests/sim/actions.test.mjs
tests/sim/data.test.mjs
tests/sim/flow.test.mjs
tests/sim/hex.test.mjs
tests/sim/layout.test.mjs
tests/sim/program.test.mjs
tests/sim/purity.test.mjs
tests/sim/random.test.mjs
tests/sim/rules.test.mjs
tests/sim/time.test.mjs
tests/startup.test.mjs
tests/view/icons.test.mjs
tests/view/program-editor.test.mjs
tests/view/status-row.test.mjs
tests/view/terrain-picture.test.mjs
tests/view/tile-list.test.mjs
```

Excluded from the assessed diff (per the input manifest):

```text
AGENTS.md
README.md
guidelines/coding-browser-module.md
guidelines/coding-content-data.md
guidelines/coding-http-application.md
guidelines/coding-simulation-module.md
guidelines/coding.md
```
