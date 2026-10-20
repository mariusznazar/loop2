# Plan — Wytyczne kodowania loop2

Current task authority: task.md together with amendment-npm12.md in the cycle directory; the accepted npm pin is 12.2.1 and the low-or-higher threshold is unchanged.

- Task: .runs/task-cycles/coding-guidelines/task.md
- Spec: none
- Base: c379207bfd8bd148d3589ea75604ba5165915d01

## Accepted introduction requirements

For this task, original Q8 and settlement 1 remain binding: every adopted blocking violation is removed before PR16 merges. If a repair exceeds the accepted task scope, return to a decision rather than weakening the rule set or leaving a violation. Settlement 1 is split by destination: D-28 records the lasting selected discipline and full-compliance source invariants without a transitional per-file no-regression invariant; this plan records only the introduction and repair-scope conditions of this execution. No unit, dependency, invariant meaning or accepted settlement is removed or changed.

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| Settlement 1 | decision | Frozen task, Settlements to record row 1 | Slices 1–12 |
| Settlement 2 | decision | Frozen task, Settlements to record row 2 | F2, 1, 4, 7, 11 |
| Settlement 3 | decision | Frozen task, Settlements to record row 3 | F3, 2, 3, 11 |
| Settlement 4 | decision | Frozen task, Settlements to record row 4 | F3, 2, 11 |
| Settlement 5 | decision | Frozen task, Settlements to record row 5 | F4, 1, 4–11 |
| Settlement 6 | decision | Frozen task, Settlements to record row 6 | F5, 1, 11 |
| Settlement 7 | decision | Frozen task, Settlements to record row 7 | 5, 11 |
| Settlement 8 | decision | Frozen task, Settlements to record row 8 | 4, 11 |
| Settlement 9 | decision | Frozen task, Settlements to record row 9 | 6, 7, 11 |
| Settlement 10 | decision | Frozen task, Settlements to record row 10 | 8, 11 |
| Settlement 11 | environment fact | Frozen task, Settlements to record row 11 | F2, 1, 11 |
| Settlement 12 | environment fact | Frozen task, Settlements to record row 12 | F2, 1, 11 |
| Settlement 13 | environment fact | Frozen task, Settlements to record row 13 | F3, 2, 11 |
| Settlement 14 | environment fact | Frozen task, Settlements to record row 14 | F3, 2, 11 |
| Settlement 15 | invariant | Frozen task, Settlements to record row 15 | F2; check scripts/check_eslint.py; slices 1, 4, 7, 11 |
| Settlement 16 | invariant | Frozen task, Settlements to record row 16 | F3; check scripts/check_ruff.py; slices 2, 3, 11 |
| Settlement 17 | invariant | Frozen task, Settlements to record row 17 | F3; check scripts/check_shellcheck.py; slices 2, 11 |
| Settlement 18 | invariant | Frozen task, Settlements to record row 18 | F2; check scripts/check_eslint.py --configuration with scripts/inspect_eslint.mjs; slices 1, 11 |
| Settlement 19 | invariant | Frozen task, Settlements to record row 19 | F4; check scripts/check_format.py; slices 1, 4–11 |
| Settlement 20 | invariant | Frozen task, Settlements to record row 20 | F5; check scripts/check_dependencies.py; slices 1, 11 |
| Settlement 21 | invariant | Frozen task, Settlements to record row 21 | Existing pinned .the-way/product-guidelines/form_check.py, no new checker implementation; slices 11–12 |
| Settlement 22 | invariant | Frozen task, Settlements to record row 22 | Existing pinned .the-way/product-guidelines/form_check.py --merge-onto, no new checker implementation; slices 11–12 |
| File ownership and standing-check reach | part map | To do 8–9; necessary consequences of added files | F1–F6 and Slices 1–12 |

Write all entries before F1. Use the project record-environment-fact, record-decision, record-invariant and update-part-map skills, in linked-entry dependency order. The task carries no MVP projected entry. Copy the exact identifiers and sentences for settlements 21–22 from the pinned general template. Give source-code linter checks both their covered parts and build-tools; the formatter additionally reaches deployment through .gitattributes. Guidelines references reach agent-workflow/product-foundation; form names every. The foundation author settles final invariant identifiers and methods and supplies their whole sentences and methods to check authors.

The map gives all new scripts, requirements files, npm configuration and tests/quality files to build-tools, and guidelines/** to agent-workflow. Expand scripts/build.mjs to a nonoverlapping scripts/** assignment rather than duplicate ownership; include eslint.config.mjs, prettier.config.mjs, requirements-quality.in and requirements-quality.txt explicitly. Keep .gitattributes assigned to deployment. Existing invariant-test ownership stays unchanged. Follow through necessary consequence fields rather than invent new decisions or glossary terms.

Foundation checks F1–F6 are bounded preparation within the foundation route, before dependent covered code. Each is a fresh check-author assignment, not ordinary authoring of the configuration it checks; F1 is mechanics only. Sentence author, check author and covered-code author must be three distinct identities. The sentence/method check handoff must not carry product-author reasoning, this plan, or a duplicate requirements catalogue; the orchestrator supplies the allowed methodological sources. No check author later owns a covered-code/configuration slice. Product slices never edit frozen invariant checks; any required correction returns to the foundation step. Existing serving-process test changes in F6 use that same route.

## Slices

### Slice F1 — Shared mechanics for standing checks

- **Goal:** Provide only file ownership/discovery, local process invocation and the-way result recording; keep expectations and adopted rule lists out of shared mechanics. A failed tool invocation produces a failure with no invariant verdict, never a pass. Discover tracked and unignored new product files by current part ownership, excluding dependencies, generated output, submodule and run records.
- **Change:** `scripts/quality_support.py` · `tests/quality/test_quality_support.py`
- **Read:** `foundations/part_map.md` · `foundations/environment_facts.md` · `foundations/invariants.md` · `.the-way/product-guidelines/reading.md` · `.the-way/gate/run_tests.py` · `tests/invariants/test_application_package_layout.py`
- **Checks:** Start with tests for new nested owned files, ambiguous ownership, missing executable, malformed output, nonzero process result and record schema. Run `python -m unittest discover -s tests/quality -p test_quality_support.py`. No network or tool download in checks.
- **Depends on:** Foundation entries and map

### Slice F2 — ESLint source and configuration checks

- **Goal:** Implement the methods for settlements 15 and 18 from their sentences and methods alone, including exact adopted active rules/options, TS and JS coverage, TS6 parser API, inline suppressions and changed configuration. Keep independently captured expected membership in the check, not imported from configuration being tested.
- **Change:** `scripts/check_eslint.py` · `scripts/inspect_eslint.mjs` · `tests/quality/test_eslint_checks.py`
- **Read:** `foundations/part_map.md` · `foundations/environment_facts.md` · `foundations/invariants.md` · `.the-way/product-guidelines/reading.md` · `.the-way/product-guidelines/coding/template.md` · `tsconfig.browser.json` · `tsconfig.server.json`
- **Checks:** Start with isolated fixture tests for new TS/JS files, config disabling or weakening a rule, adding exclusions, inline directives and tool failures; run `python -m unittest discover -s tests/quality -p test_eslint_checks.py`. Run `python -B scripts/check_eslint.py --record .runs/eslint.jsonl` and `python -B scripts/check_eslint.py --configuration --record .runs/eslint-configuration.jsonl`; missing installed tools/config at this stage is an expected genuine non-pass, not an expected-pass test.
- **Depends on:** F1; settlements 2, 11, 12, 15, 18

### Slice F3 — Python and Bash standing checks

- **Goal:** Implement settlement 16 with the explicit adopted 393-rule list, isolated Ruff configuration and suppression detection limited to blocking rules; implement settlement 17 with the pinned ShellCheck default nonoptional Bash set, every severity, no external rc/environment changes and source directive protection. Detect new owned files, including extensionless standalone Bash scripts.
- **Change:** `scripts/check_ruff.py` · `scripts/check_shellcheck.py` · `tests/quality/test_python_shell_checks.py`
- **Read:** `foundations/part_map.md` · `foundations/environment_facts.md` · `foundations/invariants.md` · `.the-way/product-guidelines/reading.md` · `.the-way/product-guidelines/coding/template.md` · `deploy/loop2-deploy`
- **Checks:** Start with new-path, suppression, nonblocking noqa:E402, environment override and missing-tool fixtures. Run `python -m unittest discover -s tests/quality -p test_python_shell_checks.py`; run `python -B scripts/check_ruff.py --record .runs/ruff.jsonl` and `python -B scripts/check_shellcheck.py --record .runs/shellcheck.jsonl`, retaining expected absent-tool results until Slice 2.
- **Depends on:** F1; settlements 3, 4, 13, 14, 16, 17

### Slice F4 — Formatting standing check

- **Goal:** Implement settlement 19 using local pinned Prettier with the editor configuration, full part-derived TS/JS and browser HTML/CSS scope, new paths, LF bytes and configuration-only changes reaching the check. Check expected adopted configuration rather than accepting an arbitrary formatter invocation.
- **Change:** `scripts/check_format.py` · `tests/quality/test_format_check.py`
- **Read:** `foundations/part_map.md` · `foundations/environment_facts.md` · `foundations/invariants.md` · `.the-way/product-guidelines/reading.md` · `.the-way/product-guidelines/coding/template.md` · `.gitattributes`
- **Checks:** Start with good/bad new-path fixtures, excluded files, weakened config, CRLF and unavailable tool. Run `python -m unittest discover -s tests/quality -p test_format_check.py` and `python -B scripts/check_format.py --record .runs/format.jsonl`; before installation and complete reformatting record the actual non-pass.
- **Depends on:** F1; settlements 5, 19

### Slice F5 — Dependency audit of introduced versions

- **Goal:** Implement settlement 20 as its own reviewable change: compare every build-tools npm manifest/lockfile against explicit fork point; use real package-name/version pairs including aliases and nested, transitive, dev, optional and peer dependencies; match advisory ranges to those exact versions through pinned npm. Unchanged pairs do not block, empty newly introduced set can pass offline only after complete valid comparison, and unsupported/incomplete/error data produces no successful verdict. External data is untrusted.
- **Change:** `scripts/check_dependencies.py` · `tests/quality/test_dependency_audit.py`
- **Read:** `foundations/part_map.md` · `foundations/environment_facts.md` · `foundations/invariants.md` · `.the-way/product-guidelines/reading.md` · `.the-way/product-guidelines/coding/template.md` · `package.json` · `package-lock.json`
- **Checks:** Start with deterministic fixture tests covering changed version vs unchanged vulnerable version, aliases, multiple installed versions, direct/transitive/dev/optional/peer packages, nested new manifests/locks, missing base/locks, unsupported lock/report shape, range matching and all severities, network errors and offline no-change. Run `python -m unittest discover -s tests/quality -p test_dependency_audit.py`; run `python -B scripts/check_dependencies.py --fork-point c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/dependency-audit.jsonl`. Live result is not replaced by fixture success.
- **Depends on:** F1; settlement 6, 20

### Slice F6 — Reliable existing process observations

- **Goal:** Through the foundation route for modified invariant tests, reject failed process reads in both Windows and Unix branches of the existing serving-process check, and remove the accepted unused API-check import. Retain the invariant sentences and independently test the observation mechanics; the support cleanup change waits for Slice 3.
- **Change:** `tests/invariants/test_loop2_one_serving_process.py` · `tests/invariants/test_loop2_api_error_route.py` · `tests/quality/test_process_observation.py`
- **Read:** `foundations/part_map.md` · `foundations/environment_facts.md` · `foundations/invariants.md` · `.the-way/product-guidelines/reading.md` · `tests/invariants/loop2_invariant_support.py`
- **Checks:** Write failing mocked subprocess tests first: valid-looking stdout with nonzero exit must be rejected on both platforms. Run `python -m unittest discover -s tests/quality -p test_process_observation.py`; run `python -m unittest discover -s tests/invariants -p test_loop2_one_serving_process.py` and `python -m unittest discover -s tests/invariants -p test_loop2_api_error_route.py`; reserve the original check author and full independent acceptance route if any invariant method interpretation changes.
- **Depends on:** Foundation route for invariant test changes; independent of F1-F5

### Slice 1 — Install npm tools and preserve TS7 compilation

- **Goal:** Declare and lock all accepted npm tools, including pinned local npm; use the accepted TS6 API alias plus separate TS7 compiler alias and explicit compiler path. Configure ESLint and Prettier as settled, cover new part-owned files and new check code, keep one application npm package. Add narrow LF attributes only for Prettier scope and document local setup.
- **Change:** `package.json` · `package-lock.json` · `scripts/build.mjs` · `eslint.config.mjs` · `prettier.config.mjs` · `.gitattributes` · `README.md`
- **Read:** `foundations/part_map.md` · `foundations/decisions.md` · `foundations/invariants.md` · `.the-way/product-guidelines/reading.md` · `.runs/task-cycles/coding-guidelines/task.md` · `tsconfig.browser.json` · `tsconfig.server.json` · `Dockerfile` · `.the-way/product-guidelines/coding/template.md`
- **Checks:** Run `npm ci`, `npm run typecheck`, `npm run build`, and configuration check `python -B scripts/check_eslint.py --configuration --record .runs/eslint-configuration.jsonl`. Verify installed exact versions and TS7 compiler execution, not just aliases in JSON. Run source/format standing checks and retain outstanding baseline failures until their slices; run the audit with the explicit base. Do not silently weaken rule count or choose replacement versions.
- **Depends on:** F1-F5; settlements 1, 2, 5, 6 and map

### Slice 2 — Install local Python-distributed tools

- **Goal:** Declare Ruff and the ShellCheck wrapper in a dedicated requirements input and fully hashed lock, with no runtime dependencies missing from the lock. Install into a repository-local ignored environment under .runs; wrapper package version is an implementation detail and executed ShellCheck must report the exact accepted binary version. Describe repeatable installation and executable locations in existing README.
- **Change:** `requirements-quality.in` · `requirements-quality.txt` · `README.md`
- **Read:** `foundations/part_map.md` · `foundations/decisions.md` · `foundations/invariants.md` · `.the-way/product-guidelines/reading.md` · `.runs/task-cycles/coding-guidelines/task.md` · `.gitignore` · `.the-way/product-guidelines/coding/template.md`
- **Checks:** Create local environment using `python -m venv .runs/quality-venv`; install with `.runs/quality-venv/Scripts/python.exe -m pip install --require-hashes -r requirements-quality.txt` on Windows (use the environment bin path on Unix). Verify executable versions. Run `python -B scripts/check_ruff.py --record .runs/ruff.jsonl` and `python -B scripts/check_shellcheck.py --record .runs/shellcheck.jsonl`; Ruff baseline findings remain until Slice 3. No downloads occur in either check.
- **Depends on:** Slice 1 (README); F3; settlements 3, 4 and map

### Slice 3 — Clean up test-server resources on failures

- **Goal:** Remove the remaining two accepted unused imports, close stdout if stderr opening fails, close both logs and remove temporary resources if spawning fails, preserve logs for a live server, and still attempt to terminate the known main process when child enumeration fails. Reject failed enumeration output. Do not widen Python cleanup beyond the eight accepted findings without returning evidence.
- **Change:** `tests/invariants/loop2_invariant_support.py` · `tests/deploy/test_loop2_deploy_build.py` · `tests/quality/test_invariant_support.py`
- **Read:** `foundations/part_map.md` · `foundations/decisions.md` · `foundations/invariants.md` · `.the-way/product-guidelines/reading.md` · `.runs/task-cycles/coding-guidelines/task.md` · `tests/invariants/test_loop2_one_serving_process.py` · `tests/invariants/test_loop2_api_error_route.py`
- **Checks:** Write meaningful failure-injection tests first for second open, spawn, failed descendant query with partial stdout, main-process termination and stop without a fully initialized process. Run `python -m unittest discover -s tests/quality -p test_invariant_support.py`, `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariants-after-support.jsonl`, `python -B .the-way/gate/run_tests.py tests/deploy --record .runs/deploy-after-support.jsonl`, and Ruff check. Preserve environment-related unrun results.
- **Depends on:** F6; Slice 2; settlement 16

### Slice 4 — Fix simulation assertions and format modules

- **Goal:** Remove only the fifteen accepted unnecessary simulation assertions, preserve necessary ones, and format the seven simulation modules with adopted Prettier. Game behavior remains unchanged.
- **Change:** `src/browser/sim/game.ts` · `src/browser/sim/hex.ts` · `src/browser/sim/layout.ts` · `src/browser/sim/program.ts` · `src/browser/sim/random.ts` · `src/browser/sim/run.ts` · `src/browser/sim/types.ts`
- **Read:** `foundations/part_map.md` · `foundations/decisions.md` · `foundations/invariants.md` · `.the-way/product-guidelines/reading.md` · `.runs/task-cycles/coding-guidelines/task.md` · `tests/sim/hex.test.mjs` · `tests/sim/layout.test.mjs` · `tests/sim/program.test.mjs` · `tests/sim/time.test.mjs`
- **Checks:** Run local pinned Prettier on exactly the Change paths, `npm run typecheck`, `npm run build`, and `node --test "tests/sim/*.test.mjs"`. Verify emitted behavior/AST changes are limited to removal of assertions plus formatting; use existing simulation invariants and compare assertion removal count against the task. Run ESLint check, retaining the one view finding until Slice 7.
- **Depends on:** Slice 1; settlements 8, 15, 19

### Slice 5 — Format game content data

- **Goal:** Format the six current content-data files and preserve all data and exported identifiers.
- **Change:** `src/browser/sim/data/actions.ts` · `src/browser/sim/data/archetypes.ts` · `src/browser/sim/data/balance.ts` · `src/browser/sim/data/conditions.ts` · `src/browser/sim/data/maps.ts` · `src/browser/sim/data/resources.ts`
- **Read:** `foundations/part_map.md` · `foundations/decisions.md` · `foundations/invariants.md` · `.the-way/product-guidelines/reading.md` · `.runs/task-cycles/coding-guidelines/task.md` · `tests/sim/data.test.mjs`
- **Checks:** Run local pinned Prettier on the Change paths, `npm run typecheck`, `npm run build`, `node --test tests/sim/data.test.mjs`, and current content-identifiers/simulation-isolation checks. Verify only formatting changed.
- **Depends on:** Slice 1; settlements 7, 19

### Slice 6 — Format view control construction

- **Goal:** Format the first five view modules without intended UI or behavior changes.
- **Change:** `src/browser/view/app.ts` · `src/browser/view/clock.ts` · `src/browser/view/credits.ts` · `src/browser/view/footer.ts` · `src/browser/view/program-editor.ts`
- **Read:** `foundations/part_map.md` · `foundations/decisions.md` · `foundations/invariants.md` · `.the-way/product-guidelines/reading.md` · `.runs/task-cycles/coding-guidelines/task.md` · `tests/view/program-editor.test.mjs` · `tests/view/icons.test.mjs`
- **Checks:** Run local pinned Prettier on the Change paths, `npm run typecheck`, `npm run build`, and `node --test "tests/view/*.test.mjs"`. Check normalized syntax/token content is unchanged and preserve string literals.
- **Depends on:** Slice 1; settlements 9, 19

### Slice 7 — Fix terrain assertion and format remaining browser files

- **Goal:** Remove the one accepted terrain-picture assertion; format remaining view modules, browser entry and HTML while preserving behavior and rendered appearance.
- **Change:** `src/browser/view/send-panel.ts` · `src/browser/view/status-row.ts` · `src/browser/view/terrain-panel.ts` · `src/browser/view/terrain-picture.ts` · `src/browser/view/tile-list.ts` · `src/browser/main.ts` · `src/browser/index.html`
- **Read:** `foundations/part_map.md` · `foundations/decisions.md` · `foundations/invariants.md` · `.the-way/product-guidelines/reading.md` · `.runs/task-cycles/coding-guidelines/task.md` · `tests/view/terrain-picture.test.mjs` · `tests/view/status-row.test.mjs` · `tests/view/tile-list.test.mjs`
- **Checks:** Run local pinned Prettier on Change paths, `npm run typecheck`, `npm run build`, `node --test "tests/view/*.test.mjs"`, and ESLint check. Confirm cumulative removal count is exactly sixteen and no other assertion was removed; inspect HTML whitespace effects and token preservation. Any discovered visible behavior change returns to root before continuing.
- **Depends on:** Slice 4 (cumulative assertion completion); Slice 1; settlements 9, 15, 19

### Slice 8 — Format HTTP server and integration tests

- **Goal:** Format the server application, its entry point and the two HTTP/startup tests, preserving server routing, process startup and assertions.
- **Change:** `src/server/app.ts` · `src/server/main.ts` · `tests/http.test.mjs` · `tests/startup.test.mjs`
- **Read:** `foundations/part_map.md` · `foundations/decisions.md` · `foundations/invariants.md` · `.the-way/product-guidelines/reading.md` · `.runs/task-cycles/coding-guidelines/task.md` · `tests/invariants/test_loop2_api_error_route.py` · `tests/invariants/test_account_server_occupied_address.py`
- **Checks:** Run local pinned Prettier on Change paths, `npm run typecheck`, `npm run build`, and `node --test tests/http.test.mjs tests/startup.test.mjs`; verify normalized syntax unchanged. Apply adversarial HTTP/startup coverage already in tests because src/server is a trust boundary.
- **Depends on:** Slice 1; settlements 10, 19

### Slice 9 — Format simulation tests

- **Goal:** Format all ten current simulation tests with no changes to inputs or assertions.
- **Change:** `tests/sim/actions.test.mjs` · `tests/sim/data.test.mjs` · `tests/sim/flow.test.mjs` · `tests/sim/hex.test.mjs` · `tests/sim/layout.test.mjs` · `tests/sim/program.test.mjs` · `tests/sim/purity.test.mjs` · `tests/sim/random.test.mjs` · `tests/sim/rules.test.mjs` · `tests/sim/time.test.mjs`
- **Read:** `foundations/part_map.md` · `foundations/decisions.md` · `foundations/invariants.md` · `.the-way/product-guidelines/reading.md` · `.runs/task-cycles/coding-guidelines/task.md`
- **Checks:** Run local pinned Prettier on Change paths, `npm run build`, and `node --test "tests/sim/*.test.mjs"`; verify normalized syntax unchanged.
- **Depends on:** Slice 4; Slice 5; settlement 19

### Slice 10 — Format view tests

- **Goal:** Format all five current view tests with no changes to inputs or assertions, completing the original 45-file reformatting.
- **Change:** `tests/view/icons.test.mjs` · `tests/view/program-editor.test.mjs` · `tests/view/status-row.test.mjs` · `tests/view/terrain-picture.test.mjs` · `tests/view/tile-list.test.mjs`
- **Read:** `foundations/part_map.md` · `foundations/decisions.md` · `foundations/invariants.md` · `.the-way/product-guidelines/reading.md` · `.runs/task-cycles/coding-guidelines/task.md`
- **Checks:** Run local pinned Prettier on Change paths, `npm run build`, and `node --test "tests/view/*.test.mjs"`. Run `python -B scripts/check_format.py --record .runs/format.jsonl`, ESLint and Ruff checks, and `npm test`. Verify every original covered file and every new covered file passes, with no historic exceptions.
- **Depends on:** Slice 6; Slice 7; Slice 8; Slice 9; settlement 19

### Slice 11 — Write general and four kind guidelines

- **Goal:** Write the five files from the accepted task and product foundation through the coding template author route. Include exact accepted tables/statuses, index, all settled checks, existing kind rules, required short whole-file good/bad cases and the one test example; retain the fourteen Ruff examples and all accepted deferrals. Do not repeat the exemplar comparison audit or add architecture rules.
- **Change:** `guidelines/coding.md` · `guidelines/coding-content-data.md` · `guidelines/coding-simulation-module.md` · `guidelines/coding-browser-module.md` · `guidelines/coding-http-application.md` · `tests/quality/fixtures/dependency-audit/package.json` · `tests/quality/fixtures/dependency-audit/package-lock.json`
- **Read:** `foundations/part_map.md` · `foundations/decisions.md` · `foundations/invariants.md` · `.the-way/product-guidelines/reading.md` · `.runs/task-cycles/coding-guidelines/task.md` · `.agents/skills/the-way-maintain-coding-guidelines/SKILL.md` · `.the-way/product-guidelines/coding/SKILL.md` · `.the-way/product-guidelines/coding/template.md` · `.the-way/product-guidelines/template.md` · `src/browser/sim/data/resources.ts` · `src/browser/sim/game.ts` · `src/browser/view/status-row.ts` · `src/server/app.ts` · `tests/sim/time.test.mjs`
- **Checks:** Run `python -B .the-way/product-guidelines/form_check.py --record .runs/guidelines-form.jsonl` and `python -B .the-way/product-guidelines/form_check.py --merge-onto c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/guidelines-reference.jsonl`. An independent reviewer applies every rule good/bad pair in a scratch worktree and also invents a separate deliberate break for every new/changed invariant check. Stage named new files for path checks; never commit cycle files.
- **Depends on:** All preceding slices; settlements 1-22

### Slice 12 — Point agent instructions at completed guidelines

- **Goal:** Use maintain-instruction-files to add the one conditional pointer outside the installer block in root AGENTS.md, with no duplicate tool commands or kind paths. CLAUDE.md already imports AGENTS.md and requires no second instruction.
- **Change:** `AGENTS.md`
- **Read:** `foundations/part_map.md` · `foundations/decisions.md` · `foundations/invariants.md` · `.the-way/product-guidelines/reading.md` · `.runs/task-cycles/coding-guidelines/task.md` · `CLAUDE.md` · `.the-way/instruction-files/principles.md` · `.the-way/instruction-files/check_instructions.py`
- **Checks:** Run `python -B .the-way/instruction-files/check_instructions.py`; run `python -B .the-way/gate/run_tests.py tests/agent_workflow --record .runs/agent-workflow.jsonl` and both guideline checks. Apply the personal maintain-instruction-files method during execution; its external path is a method input, not a product write.
- **Depends on:** Slice 11; settlements 21, 22

## Independence and execution

F2–F5 are theoretically independent after F1 because each owns separate methods and fixture tests; the audit has its own scope and review. F6 can be judged against its original two checks independently of new tooling. Product formatting Slices 5, 6 and 8 are separate goals after installation; Slices 9 and 10 wait for the corresponding source formatting only for coherent review/test evidence. Separate files do not authorize concurrent writers: all executions and all tests using shared ports, node_modules or the mutable worktree are sequential. Superpowers 6.4.1 subagent-driven-development independently forbids parallel implementation subagents. Root records its ruling before dispatch.

Every author reads current whole applicable guidelines once they exist and refreshes the part/foundation selection before relying on it. The missing general guidelines are this task output, so earlier slices do not wait for them. There is no styleguide or intended visible UI change, hence no styleguide order example applies. Existing files created by earlier slices are additionally read before dependent work; those absent at planning time are named in dependencies rather than as nonexistent Read paths. Refresh the plan-size report if a slice expands its write set.

All check commands run from the task worktree. Each full sanitized output and actual exit code is preserved in the cycle reports. No unrun check is a pass. Every slice has an independent reviewer and weakest-point check. Foundation-check baseline tool/config failures and remaining adopted-code violations are expected only until their dependent slices complete; final integration requires full compliance, with no transition-debt mechanism. Use current main commit for merge-onto at final verification, and actual original fork point for audits. Standalone script names/flags above are planned callable interfaces, to be realized by the independent method authors; if they need a different interface root updates plan/handoffs before downstream invocation.

After Slice 12 root runs the full product gate, every changed part test directory, npm tests/typecheck, all new standing checks, all changed foundation format guards and both guideline checks. Capture unchanged environment limitations honestly. Whole-branch review includes final diff coverage, separate invariant deliberate breaks and good/bad cases in scratch worktrees; then return step, independent foundation assessment, reconciliation and request are cycle stages, not additional implementation slices.

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Required outcome: coding guidelines with standing checks for current product | All entries; F1–F6; 1–12 |
| To do 1 | 11; settlement 1 |
| To do 2 | 11; settlements 7–10 |
| To do 3 | F1–F5, 1–2 |
| To do 4 | 4 and 7 |
| To do 5 | F6 and 3 |
| To do 6 | 1 and 4–10 (build script in 1); new JS in check slices also formatted |
| To do 7 | All 22 foundation rows; F1–F6; 11; independent check authors and reviewers |
| To do 8 | Foundation invariant Parts/map; F1–F5; 1–2 |
| To do 9 | Foundation map before dependent work |
| To do 10 | Foundation settlements 21–22; 12; pinned form checker |
| Settlement row 1 | Foundation row 1; dependencies and check explicitly named in Foundation entries |
| Settlement row 2 | Foundation row 2; dependencies and check explicitly named in Foundation entries |
| Settlement row 3 | Foundation row 3; dependencies and check explicitly named in Foundation entries |
| Settlement row 4 | Foundation row 4; dependencies and check explicitly named in Foundation entries |
| Settlement row 5 | Foundation row 5; dependencies and check explicitly named in Foundation entries |
| Settlement row 6 | Foundation row 6; dependencies and check explicitly named in Foundation entries |
| Settlement row 7 | Foundation row 7; dependencies and check explicitly named in Foundation entries |
| Settlement row 8 | Foundation row 8; dependencies and check explicitly named in Foundation entries |
| Settlement row 9 | Foundation row 9; dependencies and check explicitly named in Foundation entries |
| Settlement row 10 | Foundation row 10; dependencies and check explicitly named in Foundation entries |
| Settlement row 11 | Foundation row 11; dependencies and check explicitly named in Foundation entries |
| Settlement row 12 | Foundation row 12; dependencies and check explicitly named in Foundation entries |
| Settlement row 13 | Foundation row 13; dependencies and check explicitly named in Foundation entries |
| Settlement row 14 | Foundation row 14; dependencies and check explicitly named in Foundation entries |
| Settlement row 15 | Foundation row 15; dependencies and check explicitly named in Foundation entries |
| Settlement row 16 | Foundation row 16; dependencies and check explicitly named in Foundation entries |
| Settlement row 17 | Foundation row 17; dependencies and check explicitly named in Foundation entries |
| Settlement row 18 | Foundation row 18; dependencies and check explicitly named in Foundation entries |
| Settlement row 19 | Foundation row 19; dependencies and check explicitly named in Foundation entries |
| Settlement row 20 | Foundation row 20; dependencies and check explicitly named in Foundation entries |
| Settlement row 21 | Foundation row 21; dependencies and check explicitly named in Foundation entries |
| Settlement row 22 | Foundation row 22; dependencies and check explicitly named in Foundation entries |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|
| Keep invariant method work in six bounded foundation batches, independently from configuration/code authors. | Let one tooling author write the policy, its checker and covered config. | More dispatches; fewer author identities would violate WAY-69 and invalidate acceptance. |
| Use Python scripts for standing-check CLI/records and a small JS bridge only for ESLint APIs. | Mix independent record implementations across several runtimes. | Extra bridge process; common mechanics must not hide expectations or become another policy source. |
| Use a repository-local Python venv with hashed requirements for Ruff and shellcheck-py; verify the actual ShellCheck binary version. | Hand-maintain a new cross-platform archive installer or use global tools. | Wrapper is another distribution dependency; unsupported platforms must report unavailable rather than silently fall back. Metadata confirms Windows/Linux x86-64 wheels, but actual install/execution is still an implementation check. |
| Preserve accepted TS6 API and TS7 compiler using the already trialed two package aliases. | Downgrade the compiler or run ESLint against an unsupported TS7 API. | Additional package footprint is accepted by Q2; explicit compiler resolution and regression checks are needed. |
| Keep the audit in one independent method batch with adversarial fixtures and live run. | Treat npm audit exit status or highest package severity as the whole policy. | More precise parsing/range matching; unsupported shapes must be non-pass rather than guessed. |
| Group the 45 formatting targets by kind and test suite, each under ten changed files, with assertion removals in the owning source batches. | One 45-file formatting slice, or one slice per file. | Several review ranges; monolith violates size guard, per-file slices add no useful review boundary. |
| Write complete guidelines after code is compliant, then add only the AGENTS.md pointer. | Publish tables claiming copy status before repairs or duplicate commands in instructions. | Later guideline writing requires authors to apply frozen task/template until then; allowed for the task creating missing guidelines. |
| Use English for code identifiers/comments and Polish explanatory guidelines text with required English schema headings. | Add a separate language decision or duplicate bilingual documents. | Follows current repository code and user-facing documentation; schema fields remain exact. |
