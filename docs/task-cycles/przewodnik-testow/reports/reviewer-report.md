PASS 42522e679b27cff411ee80a0e24e336dd40ad5de

# Whole-change review

Reviewed range: `8ac8584c7187c2c2bf63f0a71aeee4fb992a83f5..42522e679b27cff411ee80a0e24e336dd40ad5de`. Reviewed tree: `c31fddf732c6d329fd28d11d6dd23bafd774adc0`. The worktree was clean and remained at the dispatched head. The submodule checkout and gitlink both name `2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c`.

I made neither implementation commit. I reviewed the code/tests and the documentation/foundation in separate passes, against the whole frozen task and the pinned review method. No spec or plan is present; the two commits are the atomic installer update and the substantive change. No slice findings were handed into this review.

## Findings by grade

- Critical: none.
- Important: none.
- Minor: none.

PASS means no blocking finding in this range. It does not mean the full gate is green or that skipped checks passed.

## Code and test pass

### Action duration and effects

At `C:/Storage/repos/loop2-wt/przewodnik-testow/tests/invariants/test_action_in_progress.py:165`, the helper now asserts action kind and end minute, rather than a rule index, start-minute field or entire activity object. The main case still observes every minute, the unrevealed entrance and unchanged position before minute 20, revelation at minute 20, movement only at minute 25 to the target selected before the program changed, and the next action chosen from the changed program. All three controls remain: the initially changed program wanders immediately, the original program waits after exploration, and keeping the intermediate program leads to another wander rather than exploration. Removing technical-object equality is justified by Q7a and preserves these behavioural differences.

The isolated interruption mutation changes the current end minute when the program changes. Its log shows this case failing at minute 6 (`wander` instead of `explore`), and the intermediate-program control failing at end minute 26 instead of 30. The failure occurs in the intended assertions, independently of the later baseline error. The reviewed code also continues to reject a changed movement target that changes the final arrival, an early reveal or movement, a delayed completion, and a wrong next action.

### Geometry

At `C:/Storage/repos/loop2-wt/przewodnik-testow/tests/view/terrain-picture.test.mjs:48`, three explicit pairwise-adjacent axial inputs cover the three edge directions. The test checks six distinct points, equal circumradii and adjacent edge lengths, two common vertices forming an edge, centre separation of two apothems, and centres on opposite sides of that edge. The radius and side relation is derived independently; no product geometry function supplies expected coordinates. The shape assertions establish regular hexagons, and the common-edge and opposite-side assertions exclude gaps and overlap for the example. They do not bind a global angle or translation.

The author's shape and gap mutations fail respectively on radius 11 versus 10 and zero common vertices versus two. In the positive control every obtained point is rotated by 0.37 radians and translated by (37, -19) before the unchanged assertions; the geometry case passes. This is relevant evidence for the author's own-work question: the tolerance for rigid transforms has not discarded shape and adjacency protection.

### Wandering

At `C:/Storage/repos/loop2-wt/przewodnik-testow/tests/sim/actions.test.mjs:163`, the existing hidden-neighbour and all-revealed cases now use an independently enumerated seven-tile input and six permitted axial neighbours. Neither `neighbours()` nor `hexDistance()` supplies their expected result. The seed labels identify the variants; the preference assertion does not freeze which revealed tile would otherwise have been selected. The existing repeatability case at line 391 remains unchanged.

The one-draw case at line 240 supplies state zero and expects a literal next state from the published Mulberry32 increment, while executing the real game generator. I checked the cited external implementation: its state increment is `0x6D2B79F5`. The fixture's comment explicitly permits replacement with a different generator and does not prescribe candidate ordering or `floor(u * n)`. It is an independent fixture for the present real generator, not a new product requirement to keep that generator forever. [Published Mulberry32 implementation](https://github.com/bryc/code/blob/master/jshash/PRNGs.md#mulberry32).

The recorded mutations independently fail the three changed protections: two consumed draws produce 3663131626 rather than 1831565813; ignoring hidden-tile preference fails seed 2; choosing the character's own tile fails the explicit neighbour membership check. Comparing the two evidence trees confirms that only these two retained neighbour/preference cases and guide prose changed after the earlier demonstrations; the final two wander demonstrations and final author gate cover the corrected tree.

### Refusal and inclusion invariants

The changed invariant tests are `tests/invariants/test_action_in_progress.py` (`action-in-progress`), `tests/http.test.mjs` (`public-file-access`), `tests/quality/test_audit_dependencies.py` (`dependency-audit-refusal`) and the new `tests/quality/test_node_test_selection.py` (`node-test-selection`).

The HTTP case at `C:/Storage/repos/loop2-wt/przewodnik-testow/tests/http.test.mjs:123` sends raw dot segments, encoded separators, double encoding and a malformed encoding through real HTTP, checks 400/403/404, rejects file-content signatures and rejects the game's page. Its marker is in the existing case; no duplicate test was added. The changed-root demonstration fails this assertion on `/package.json: 200`, while the normal public-file case also distinguishes the bad root.

The audit case at `C:/Storage/repos/loop2-wt/przewodnik-testow/tests/quality/test_audit_dependencies.py:59` contains both required checks under the invariant marker. The malformed-report mutation reaches line 67 and fails because no `ValueError` is raised; the introduced-advisory mutation reaches line 77 and fails because the audit returns 0 rather than 1. The latter uses controlled audit results and is not evidence of a live registry response. The pre-existing lockfile invariant remains unchanged, as required.

At `C:/Storage/repos/loop2-wt/przewodnik-testow/tests/quality/test_node_test_selection.py:13`, the new test reads the actual npm command, identifies its Node invocation, expands its current explicit paths and single-star patterns, and compares them with every Node test file under `tests/`. Unsupported command/glob shapes fail closed instead of being silently interpreted. The current command's selections agree with this model. The test itself lies in the already discovered and git-tracked quality directory; its named failure on `tests/quality/omitted.test.mjs`, followed by 32 passing quality cases in the restored final run, proves its inclusion. It adds no alternate runner or selection mode.

No permanent production file at a mapped trust boundary changes in this range. I nevertheless inspected the HTTP refusal inputs and audit failure handling, since their test/invariant claims change. No irreversible product operation is introduced. No rendered UI behaviour changes; screenshot and real-browser evidence are not applicable to this diff.

## Documentation and foundation pass

I compared the entire new guide with the full common and testing templates, and with Q4-Q10 of the frozen task. The nine required rules retain their order and fields, followed by the product's inclusion rule. The levels and six-part table match the accepted classification; each of the three recipes contains all nine fields with its decision and preserves the permitted resources. The guide carries the six approved departures, four deliberate exclusions and their return conditions, the seven boundary rows and two authorization rows, independent sources, the AI rule and the real limits of modelled browser tests. It introduces no property-testing library, generated-input tests, browser automation, selector or central timeout.

The three designated exemplar cases are named exactly, with their accepted limits. The integration exemplar explicitly does not approve the HTTP helpers' timeout/cleanup behaviour. The explicit-time example moves from coding to testing, stays an example rather than a fourth exemplar, and `tests/sim/time.test.mjs` is unchanged. D-28 retains general code-quality checks and its other deferrals. The new root instruction is one conditional pointer outside the installer block; the existing root CLAUDE import reaches the same instruction. The task expressly authorized placement; the reported before/after checks and delegated wording approval are consistent with the placement method, and the final checker adds no warning.

All 11 To do items are met by the reviewed commits and their observed failure evidence: exact installer update (1), complete guide (2), D-28/coding/time-example separation (3), instruction pointer (4), three test corrections (5-7), future generated-input criterion only (8), HTTP and both audit failures (9-10), and the selected-file invariant with demonstrated omission (11). The baseline handling follows Q11; it is not an introduced-code waiver. Q9's separate backlog update is cycle bookkeeping and is outside these commits.

All 25 settlement rows are represented without a changed meaning:

| Task rows | Entries checked |
|---|---|
| 1-7 | D-73 adoption and D-74 through D-79, the six explicit departures |
| 8-13 | D-80 balance, D-81 levels, D-82 sources, D-83 files/inclusion, D-84 real mechanisms, D-85 bounded exemplars |
| 14-17 | D-86 public access, D-87 pixel comparisons, D-88 browser behaviour, D-89 return-condition review |
| 18 | Revised D-28 and moved example |
| 19-23 | public-file-access, dependency-audit-refusal, font-file-provenance, preview-server-access, node-test-selection |
| 24-25 | unit test and integration test glossary entries |

The reciprocal references in D-33, D-45 and D-46 point to the new derived invariants. Font provenance and preview access retain method `review`; the guide explicitly says that this is not a demonstrated refusal. The first changed boundary triggers a test. The existing preview script serves only its declared output directory on 127.0.0.1; existing font source comments name the accepted Geist release. This review does not newly verify font bytes against a downloaded release. Neither boundary's implementation changes here.

The installer preview at the reviewed target reports KEEP for every managed path, including both copies of all wrappers and the managed AGENTS block. The 42-path installer commit includes the exact gitlink and generated output together. Existing `.gitmodules`, root CLAUDE and ignore policy remain intact. The permanent new files already belong to mapped patterns; no map change is missing.

## Declined to judge

1. The exact Windows cause and repair of the pre-existing `Get-NetTCPConnection` class-setup failure at `C:/Storage/repos/loop2-wt/przewodnik-testow/tests/invariants/test_loop2_one_serving_process.py:177`: Q11 explicitly separates this diagnosis from implementation and excludes an unrelated repair. The unchanged baseline failure remains reported, not passed.
2. Repair of the existing HTTP helper's missing whole-operation/listening limits at `C:/Storage/repos/loop2-wt/przewodnik-testow/tests/http.test.mjs:29` and `:67`: Q7 expressly defers that repair and Q5i excludes the helpers from the selected exemplar. This review checked that the new guide preserves that limitation rather than representing the helper as compliant.

These are two out-of-scope notes, not blocking findings in the changed code.

## Checks run and evidence inspected

All commands below ran in `C:/Storage/repos/loop2-wt/przewodnik-testow` unless a path says otherwise.

| Command/check | Result |
|---|---|
| `git rev-parse HEAD`; `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD`; `git status --short` | Each exit 0; dispatched head, matching target pin, clean tree; repeated at the end |
| `git log --oneline 8ac8584..42522e6` and range diff/stat reads, including all substantive paths | Exit 0; exactly two commits and the stated change scope |
| `git diff --check 8ac8584c7187c2c2bf63f0a71aeee4fb992a83f5..42522e679b27cff411ee80a0e24e336dd40ad5de` | Exit 0 |
| `python -B .the-way/elements/common/foundation_check.py` | Exit 0; 0 errors |
| `python -B .the-way/instruction-files/check_instructions.py .` | Exit 0; 0 errors, 14 pre-existing warnings, 7 size infos. Warnings are existing remote/server paths, the shorthand checker name, the ESLint package notation and illustrative paths; no new guide warning |
| `python -B .the-way/installation/install.py . --url https://github.com/mariusznazar/the-way.git` | Exit 0; preview only, every path KEEP, no apply |
| `git diff --stat e96c2f222d9551a962a91f65d226aa9f59dd3c4a c31fddf732c6d329fd28d11d6dd23bafd774adc0` and the corresponding test diff | Exit 0; only guide prose and the two retained wander fixtures changed between evidence trees |
| Manual comparison of frozen task, full guide/templates, foundation entries, test cases/callers and demonstrations | Results described above; no missing accepted outcome found |
| Web open/find of the test's published Mulberry32 source | Successful; independently verified the fixture increment at source lines 392-397 |

Repository source/log reads and successful `rg` searches exited 0. Two exploratory read commands failed without mutation: a guessed `src/browser/sim/actions.ts` path does not exist (PowerShell exit 1), and a Bash-style brace list in PowerShell failed parsing (exit 1). I corrected the paths to `run.ts`, `game.ts` and `program.ts` before making any conclusion from those reads.

I inspected the author's demonstration script and the target assertion output in all eight failing demonstration logs, their recorded exit files (all `npm test` exit 1), the positive geometry result, and the final gate log. The malformed-report and advisory runs have additional deliberate formatting failures; those are not counted as refusal evidence. The intended assertions demonstrably fail themselves.

The final author `npm test` run is evidence for the reviewed tree: Node 318/318 pass; Python 261 cases across four directories, including all 32 quality cases, with one pre-existing setup error and three Docker-dependent skips. The chained foundation check did not execute after that error; my separate run above passes. The earlier baseline has the same setup failure. No later success is used to erase a failure.

I did not repeat the full suite, as the review method reserves that run for the cycle. I ran no narrowed repository-test command, respecting the product's one-command rule. The orchestrator's post-review gate is still required. Container checks skipped without Docker, the Windows listener assertion blocked by setup, live npm registry format on an unchanged lockfile, and font/preview refusal tests remain unchecked; none is reported passed. Real-browser/screenshot checks do not apply to a change of documentation and tests with no UI change.

## Reaches beyond the dispatch's named files

- The pinned common/discipline guideline templates and decision-entry template: checked the required form, recipe semantics and the permitted optional Verification examples, rather than inferring requirements from earlier entries.
- The instruction-placement method, its principles and tool-loading reference; installation README and the target installer preview: checked the pointer and generated installation consistency.
- `src/browser/AGENTS.md`, `src/browser/sim/random.ts`, relevant `run.ts`, `game.ts` and `program.ts` passages, `src/server/app.ts`, `scripts/audit_dependencies.py`, `scripts/kitchen-sink.mjs`, `scripts/static-files.mjs`, and font source comments in `src/browser/tokens.css`: checked the mechanisms behind the test and new invariant claims.
- `package.json` and `.the-way/gate/run_tests.py`: checked actual Node selections, Python discovery and inclusion of the new invariant test.
- The three designated exemplar cases and existing repeatability case: checked that the guide's descriptions and limits identify the intended code.
- The isolated demonstration script, exact evidence-tree diff and target log output: checked that the reported failures exercise the intended assertions and relate to the final tree.
- The external Mulberry32 source linked above: checked the independent expectation instead of accepting the author's causal claim.

No reviewed product file, index or branch was changed by this review. Only this ignored report was written.
