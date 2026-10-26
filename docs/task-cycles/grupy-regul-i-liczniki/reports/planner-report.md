# Planner report — rule groups and counters

## Status

done with concerns. The plan is complete; no open design choice was found and no question needs the human. Concerns are the breadth of the fixture migration, the known baseline environment failure and the additional readings listed below. No product code, test, foundation entry or external source was changed. No executor was started and cycle.md was not read.

- Plan: `.runs/task-cycles/grupy-regul-i-liczniki/plan.md`
- Final size report: `.runs/task-cycles/grupy-regul-i-liczniki/plan-size.md`
- Base: `9a5f3605f73da87fc5c87089c8166d2658c0add6`
- Pinned the-way: `2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c`

## Division and its cost

The plan has seven sequential slices. Two prepare the Node tests and two prepare the Python invariant drivers; the fifth switches the grouped contract and its selector, validation, fixture construction and current editor together; the sixth adds counter semantics and display; the seventh completes group controls, native dragging and the related README text. Each preparation slice preserves executable product behaviour and runs the full gate. The test-only builders construct explicit input and expose its rule list, never calculate expected selection or counters. They initially construct the current format and switch once with the production contract. No flat/grouped compatibility model enters the product.

The four preparation slices are necessary because the pinned size checker permits at most ten changed files. A one-step representation change reaches substantially more than ten files across two independent test languages. Preparation costs four full gates and two small helpers, but avoids either an unreviewable atomic migration or a temporary second product representation. Slice 4 is the largest by reading, about 154,900 estimated tokens; it needs the same model class because the independent world-reference and feasibility checkers must keep their negative controls while dropping positional assumptions. The estimates are rough, and an author may still return for size under its method.

The JS helper is already claimed by simulation through `tests/sim/**`. The new Python helper `tests/invariants/program_fixture.py` needs the simulation part-map update named F10. No build support, runner or dependency changes are planned. README belongs to build-tools, but only its Program-panel and new-game description is in scope; this does not change tooling or a trust boundary.

## Foundation and coverage

The Foundation entries table maps all five accepted settlement rows separately, the complete projected D-23 entry including the currently missing item-choice sentence, the projected rule-count entry, the rule-group term, the program-rule-pick invariant and its check, and the new Python helper's ownership. No foundation wording or identifier was invented in this plan. The foundation author uses the project element skills and the actual source entries.

All seven To do items and the overall outcome are mapped in Coverage. Counter visibility is governed by the accepted task: before the first run counts are absent; after death or Stop they remain; send and Restart reset before counting the first action. The original projected phrase about the current run is not used to override that accepted interpretation. Combat remains future task 8, although its meaning of one firing belongs in the accepted settlement.

Stable identities, next-identity metadata, separate nullable counts, canonical content comparison, a counter-only UI refresh and native drag target resolution are implementation choices listed with alternatives and costs. None adds a new player capability or an unsettled foundation rule. Existing `program.ts:itemFor` explicitly chooses an item from the data; D-23's missing item-choice sentence records that existing behaviour rather than demanding an invented new selection algorithm.

## Guidelines and visual order

Read whole: `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, plus root and browser AGENTS.md. No missing, malformed or contradictory applicable guideline was found. The general coding guideline explicitly defers a separate CSS exemplar, so CSS is not an unclassified new kind requiring a new guideline here.

The styleguide's order-of-work example starts with environment/library, then sourced values, screen and states. The environment, common controls and token values already exist and do not change. The plan therefore starts with the program contract and then the editor and its states. It adds neither a value nor a role meaning. Real event, focus and drag evidence remains a one-time browser check under D-75/D-88, with the D-89 return-condition assessment named for authors and the final reviewer. Pure transformation tests do not stand for native mouse dragging.

## Readings beyond the dispatch

- `.the-way/product-guidelines/reading.md` and the Reading the foundation passage in `.the-way/elements/common/way_of_working.md`: required by the plan method to select faithful slice readings.
- `.the-way/task-cycle/slice_size.py`: to understand its ten-file cap, future-file treatment, required headings and output contract before selecting coherent slices.
- `tests/invariants/loop2_invariant_support.py`, selected build/driver support passages: confirmed that it is build-tools infrastructure, not a program-model helper. It is not to be changed.
- Program fixtures, assertions and checker passages across `tests/sim/`, `tests/view/` and the listed Python invariant files: needed to enumerate every flat-format consumer and avoid a migration that silently makes all offers invalid. Particularly `test_program_world_reference.py` treats arbitrary numbers as world references and must distinguish exact internal identity locations while retaining illegal-coordinate controls; `test_walk_feasibility.py` currently relies on ruleIndex.
- `terrain-drawing-numbers` in `foundations/invariants.md:336-345`: the Python fixture batch reaches its test, though the drawing's behaviour does not change. Added to Slice 4 Read.
- `README.md:48-55` and build-tools in `foundations/part_map.md:70-98`: the orchestrator's later instruction added the related public program description to the final slice. Other stale descriptions were observed but not silently added to scope.
- Linked environment-fact passages about lint sets, CSS and WCAG were consulted for the existing guideline constraints; no value, linter set or accessibility requirement is changed, and no external documentation was fetched or relied on for a new choice. Some combined outputs were truncated; no claim about unread tails is used to establish a new fact.
- D-33, D-49 and D-86 were read as linked context for existing testing guidelines and the added build-tools documentation scope; they authorize no dependency, server or trust-boundary changes. Selected server decision passages were also inspected without extending the work to those parts.
- The Obsidian rulebook was read before the original plan and definition. The original full projected entries at definition lines 919–982 and the rule-group entry around 2152, task 5 and its assignment rows in the source plan were read. These are already named by the dispatch; no vault file was written.

The task and author report were read in full. The selected foundation decisions, invariant entries, part-map entries and product/process terms were read by complete entry; applicable guideline output lost to combined-call truncation was reread in smaller ranges. Product code was read to cut the boundaries, not to write a hidden spec.

## Checks and remaining evidence

- `git ls-files --stage -- .the-way`: exit 0; pinned commit matches.
- `git -C .the-way rev-parse HEAD`: exit 0; same commit.
- Initial `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/grupy-regul-i-liczniki/plan.md`: exit 2 because PowerShell's pipe to Python replaced the em dash in slice headings with a question mark. The plan's encoding and separators were corrected through ASCII Python source with explicit Unicode code points. This was an artifact-writing fault, not a slice-size waiver.
- Final same size command: exit 0; all seven slices fit, none unchecked. Changed-file counts are 9, 9, 10, 10, 10, 6 and 4. Final report saved as `plan-size.md`.
- No product tests were run by this read-only planning stage and no passing product result is claimed.

The orchestrator supplied baseline evidence: `npm test` exited 1. Node 318 passed; Python agent_workflow 5 OK, deploy 64 OK with one Docker skip, invariants 160 with one error and two Docker skips, quality 32 OK. The sole error was `test_loop2_one_serving_process.OneExpressProcessServesGameAndApi.setUpClass`, where PowerShell `Get-NetTCPConnection -State Listen` reported no `MSFT_NetTCPConnection` objects. Separate foundation check exited 0 with zero errors. This baseline caveat is repeated in every slice's Checks field: report a recurrence as failure/unchecked environment evidence and do not modify unrelated tests to hide it. Docker has since been enabled by the user; subsequent gates re-evaluate container coverage instead of perpetuating the earlier skips.

The grouped invariant failing-before evidence, completed slice gates, actual browser drag/focus checks, screenshots, independent whole-change review and final full test run remain future work. The plan ends before implementation, as requested.

## Questions

none
