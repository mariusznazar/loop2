# S11 author report — coding guidelines

Status: DONE at the author boundary. Independent slice review, independent whole-branch good/bad acceptance and invariant deliberate breaks remain root's next stages. No push, merge, deployment, external write, subagent, foundation change or frozen-method edit.

## Authority and selection

- Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`; branch `task/coding-guidelines`, matching upstream `origin/task/coding-guidelines`.
- Start: `553180840590787ea373ae67326aa9439ec2854e`. End/commit: a98222d9306d1011290e7092251cbf30764a1384.
- Pinned process gitlink and checkout both verified as `d829e3aa6242a9b8901274531dd82fd5c7d87628`.
- Read the whole frozen task plus `amendment-npm12.md`, whole author contract and S11 handoff; authoritative plan S11 and applicable execution constraints/dependencies; whole extracted task-11 brief, refreshed after root's C32 seven-path correction. Read product AGENTS.md and CLAUDE.md; project maintain-coding-guidelines entry point, pinned coding skill and its author route, whole common/coding templates, guideline selection and foundation-reading procedure; the pinned implementer prompt.
- Read the complete part map, current decision Scope fields and whole selected current entries, invariants and relevant linked set facts. The semantic scope of the general guidelines covers the six code parts, so the expected current Scope union is D-01 through D-37, all selected/read; no missing Scope match. Relevant current versions include D-03/2, D-04/3, D-05/3 and D-06/3. Product glossary and applicable pinned glossary terms were inspected. The new files physically belong to agent-workflow (`guidelines/**`) and build-tools (`tests/quality/**`); no ownership or responsibility change.
- Whole exemplar sources read: resources.ts, game.ts, status-row.ts, app.ts and the time test; necessary current invariant interfaces inspected, notably simulation inputs/isolation, content identifiers, browser framework, Express/API route and dependency pairing/package layout. Source interpretation was not used to adopt policy or re-elect exemplars.
- Initial guideline discovery: all five outputs absent, as expected for this task creating them. Final selection: the five newly written coding files, all whole-read during self-review. The general file covers all six code parts; four kind conditions retain the accepted scope. Fixture JSON is test data owned by build-tools, with no additional code kind. No existing styleguide; no UI source or intended appearance/behavior change. Screenshots remain unchecked because this slice changes documentation/data and has no settled real-browser route; no visual validation is claimed.
- Root supplied S10's independently Approved cumulative compliance result. It is prior-stage evidence, not an S11 rerun, and no send-target behavioral test evidence is claimed.

## Authored result and counts

Five Polish guideline files retain the required English schema. They carry the exact accepted exemplar/copy tables, the four-row index, standing-check choices, current fingerprints, seven existing kind rules, thirteen good/bad pairs, fourteen named Ruff examples, the concrete existing time-test example and every accepted deferral. No new architecture rule or styleguide was created. Commands are left in invariant Methods, not duplicated as tool instructions.

| File | Added | Removed |
|---|---:|---:|
| `guidelines/coding.md` | 339 | 0 |
| `guidelines/coding-content-data.md` | 54 | 0 |
| `guidelines/coding-simulation-module.md` | 82 | 0 |
| `guidelines/coding-browser-module.md` | 89 | 0 |
| `guidelines/coding-http-application.md` | 92 | 0 |
| `tests/quality/fixtures/dependency-audit/package.json` | 5 | 0 |
| `tests/quality/fixtures/dependency-audit/package-lock.json` | 8 | 0 |
| Total, 7 files | 669 | 0 |

Only these named paths are staged/committed. Existing untracked tests/invariants and tests/quality __pycache__ directories remain untouched. All new files were written with LF; git warns these Markdown/JSON files will normalize to CRLF in a later Windows checkout, which is outside the accepted web-source LF scope and is harmless to their contents.

## Choices, evidence and cost

- Retained all task/foundation choices instead of auditing or changing them: four formal kinds, one test example, Python/Bash formatting and the other accepted kinds deferred. The alternative adds obligations outside accepted scope and maintenance before MVP/styleguide work.
- Kept each rule case a complete short file. ESLint configuration cases are complete compact configurations at their real path, with the bad case disabling only no-debugger. They use the same adopted tool sets, programs and scope. Illustrative control lifecycle, catalogue and factory structure remain under Examples.
- Escalated the audit case/interface conflict rather than altering the checker: `_collect` requires every manifest to have a matching lock and requires every lock to have a manifest. A solitary new nested manifest/lock would yield unavailable, not a valid good case. Root authorized C32 and expanded this slice to seven files. The persistent two-file fixture uses a safe baseline package-lock; each guideline case adds the new npm-shrinkwrap beside it. Both locks are independently read by the existing method with matching declared/root maps and a range admitting either case. No fixture is installed, no root application dependency changed, and application-package-layout passed with these files.
- Fixture cost: thirteen lines of persistent data and an additional minimist pair in the build-tools audit against the original fork, plus keeping the good/bad versions useful as advisories change. Leaving the companion out would violate the template's actual-pass good-case requirement. Replacing the full root application lock would be large, obscure the example and miss its new-path requirement.
- The exact fixture versions were verified through the current primary npm bulk advisory API using the installed npm 12.2.1 bridge. GHSA-xvch-5gv4-984h reports critical severity for `>=1.0.0 <1.2.6`; 1.2.8 does not match and 1.2.5 does. Original-fork collection contains Express as a positive control and no minimist pair. Sources/results: `s11-fixture-primary-source.json`, `s11-fixture-source.log`, and the earlier raw response `s11-advisories.json`, all beside this report. No vulnerability status was inferred from a package-wide severity or remembered version.
- Verified the fourteen Ruff rule meanings against the installed version's own `ruff rule <code> --output-format json` documentation; saved complete output in `s11-ruff-rule-docs.json`. Examples are explanatory text, not additions to the blocking set.

## Verification and exact evidence

All paths below are relative to this report's directory. Each captured log has an adjacent `.log.json` with exact argv, actual exit code, elapsed time and output path. The wrapper was `python -B .runs/task-cycles/coding-guidelines/reports/capture.py <log> <command...>` from the task worktree, unless scratch is explicitly named. Complete combined stdout/stderr was captured, with no credentials or client data.

| Checked command | Actual exit | Output |
|---|---:|---|
| `python -B .the-way/product-guidelines/form_check.py --record .runs/guidelines-form.jsonl` | 0 | `s11-guidelines-form.log` |
| `python -B .the-way/product-guidelines/form_check.py --merge-onto c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/guidelines-reference.jsonl` | 0 | `s11-guidelines-reference.log` |
| `python -B .runs/task-cycles/coding-guidelines/reports/s11-author-checks.py` — final run | 0 | `s11-author-checks-pass.log` |
| `python -B .runs/task-cycles/coding-guidelines/reports/s11-fixture-source.py` | 0 | `s11-fixture-source.log` |
| `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py` — task worktree | 0, 1 test | `s11-package-layout.log` |
| Same application-package-layout command — isolated scratch | 0, 1 test | `s11-scratch-package-layout.log` |
| `python -B scripts/check_dependencies.py --fork-point c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/s11-audit-baseline.jsonl` — isolated scratch, persistent companions only | 0, invariant pass | `s11-audit-baseline.log` |
| `python -B scripts/check_dependencies.py --fork-point c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/s11-audit-good.jsonl` — isolated scratch, exact guideline good file added | 0, invariant pass | `s11-audit-good.log` |
| `python -B scripts/check_dependencies.py --fork-point c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/s11-audit-bad.jsonl` — isolated scratch, exact bad file replacing good | 1, invariant fail as intended | `s11-audit-bad.log` |

Both planned guideline guards reported 0 errors, 0 warnings and 0 unchecked. The first command explicitly does not compare merge references; the second supplies that comparison. They check form/references, not actual rule-case acceptance.

Scratch location: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/s11-audit-scratch`, detached at 5531808. It holds the two companion files and the final deliberately bad npm-shrinkwrap; its node_modules junction points to the installed task environment without changing it. It remains an ignored local artifact; no cleanup was attempted.

The final author checker compares every table path/status and all index rows directly with the frozen task, compares the fourteen example headings with current D-30, checks the time example, deferrals, amendment and thirteen pairs, verifies both fixture files' build-tools ownership, checks original-fork pairs, then runs the actual audit method for good/bad in scratch. It checks named invariant verdicts, not merely process exit codes. Audit output records and exact commands are also saved in `s11-audit-pair-results.json`.

Early author-checker runs failed because the helper incorrectly expected a `status` record key, a package-specific diagnostic string the method does not print, and an assumed exact original Express version. Those assumptions were removed in favor of the actual `verdict` schema, recorded invariant outcomes, the current concrete advisory source and a package-name positive control. No product/checker change was made to fit them. Exact same helper invocation exited 1 with preserved outputs `s11-author-checks.log`, `s11-author-checks-green.log`, `s11-author-checks-final.log`; the corrected run above exited 0. These are helper errors, not TDD evidence for product behavior. A preliminary shell-only case-search probe printed `missing` because PowerShell interpreted backticks; all case extraction subsequently used the literal Python helper file. This did not alter product files.

`git diff --cached --check` exited 0, empty output. Tool/runtime reads showed Python 3.14.3, Node v24.17.0, installed npm 12.2.1; installed package metadata confirms ESLint 10.12.0, @eslint/js 10.0.1, typescript-eslint 8.71.2, globals 17.13.0, parser API 6.0.2, compiler 7.0.2, Prettier 3.9.10. Ruff documentation came from the local pinned Ruff 0.17.1. ShellCheck 0.11.0 is the accepted retained pin; no ShellCheck run was needed for Markdown/JSON changes. No broad suites were repeated.

## Self-review, sharpness and remaining work

Whole changed files were reread, including both complete configuration cases and both fixture files. Corrected explanatory text against actual Ruff rule meanings before staging; no outstanding self-review issue. There is no application behavior implementation in this slice, so no product TDD red/green claim applies.

The weakest point was a case that looks formally valid but cannot actually pass the audit's manifest/lock validation. Root's scoped fixture solution, original-fork positive control, package-layout checks and live baseline/good/bad runs address it without weakening a method. This proves current fixture reach, valid comparison and a genuine vulnerable-version failure. It does not prove all future registry data, independently accept this author's other twelve rule pairs or replace the final reviewer's separate deliberate breaks.

Sharpness: seven added files, two physical parts, documentation covering all six code parts. No application execution path, listening port, host deployment, trust boundary or irreversible effect changes. The fixture adds package names/versions to the existing registry audit; it executes or installs no dependency. Template references and copied status tables can direct later authors, so their accuracy was checked against current sources rather than inferred from formatting.

Remaining required work: independent S11 review; final whole-branch reviewer applies all thirteen guideline pairs (including repeated isolation cases in their own files) and independently invents breaks for every new/changed invariant method; S12 instruction pointer and root's remaining full-gate/return/integration work. Advisory changes can obsolete a safe fixture version. Existing ignored scratch/cache artifacts remain. No full gate, independent acceptance, screenshot or server/container verdict is claimed here.
