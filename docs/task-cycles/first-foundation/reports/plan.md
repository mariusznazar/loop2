# Planning report and self-review

## Result

Plan: `C:/Storage/repos/loop2-first-foundation/.runs/task-cycles/first-foundation/plan.md`.

The reviewed spec is implementable without a planned application-code change. Four invariant sentences and the three accepted foundation field corrections are the first unit. Independent check authors then write two layout checks and two runtime checks. In each unit, the author runs the focused check green and commits explicit paths before a fresh reviewer receives an immutable `BASE..HEAD` review package, derives the deliberate break, and gives separate spec and quality verdicts. Fixes use new commits and scoped re-review. The invariant checks become read-only after the foundation step. The final unit is orchestrator closeout, not invented application work.

## Source and command checks

- Frozen task has `Status: ready for cycle` and `Project relation: independent`. The spec-review finding about package-layout exclusivity is closed in the reviewed spec.
- `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD` both returned `7cfeb4c2349b181d251d1a03cb2005b980acbe9e`.
- `git symbolic-ref --short refs/remotes/origin/HEAD` returned `origin/main`; both `git merge-base HEAD main` and `git rev-parse main` returned `44294da228ab8c27dfd1683f931f59f8d7f8d29d` at planning time.
- All three pinned format-guard `--help` interfaces and the gate runner `--help` were checked. Baseline guards returned exit 0. Invariants and decisions reported 0 unchecked; the part map reported one `unchecked` line for the unreported dependency graph and new/stale violations. The plan carries that baseline explicitly.
- `python --version` returned 3.14.3, `node --version` returned v24.17.0, and `npm --version` returned 11.13.0. `npm ci` and product tests were not run during planning; they are required execution steps. Missing dependencies must be recorded as an error.
- The four proposed sentences and the D-06 fingerprint were compared with the reviewed spec, current foundation, and part C of `5928e7b:docs/task-cycles/app-skeleton/reports/correction-1/return/proposal-pl.md`. The package sentence is the reviewed split and explicit exclusivity correction. In foundation commit `d5feaf9`, D-04/1, D-05/1, and D-06/1 remain the approved source versions; D-04/2, D-05/2, and D-06/2 are appended current versions with unchanged binding sentences and branch approval placeholders.
- Task 1 product edits are already in `d5feaf9`. The plan labels that execution state so a resumed worker reviews that commit rather than appending a second /2 version.
- The repository was clean before and after writing the ignored planning files; no product file or vault file was edited.

## Writing-plans self-review

| Check | Result |
|---|---|
| Spec coverage | Intent/scope: Global Constraints. Four entries, recovered rows, current D-04/2, D-05/2, D-06/2 fields from approved /1 sources, npm precondition, and part-map edits: Task 1. Independent checks and breaks: Tasks 2–4. Runtime visibility: Tasks 3–4. `npm ci`, focused checks, `npm test`, gate, guards, return, assessment, request and the /2 approval URL swap: Task 5. No requirement is left without a task. |
| File map and interfaces | Each of the four new test files has one invariant responsibility. The optional support edit is scoped to foreign-directory process launch; default calls stay compatible. All new test files have one part owner. Product edits are confined to the three foundation files, four tests, and the justified helper edit. |
| Placeholder scan | Searched the completed plan for `TODO`, `TBD`, `fill in`, `similar to`, `appropriate error`, and `write tests for`: no hits. The conditional real-defect path is an explicit scope gate, not an incomplete task. |
| Type and name consistency | The four invariant identifiers and their `/1` citations, current D-04/2, D-05/2, D-06/2 decisions, unchanged D-06 fingerprint `094e6fa7`, test paths, gate command, `support.Server(..., working_directory=...)`, `support.built_copy()`, `support.request()`, `support.HOST`, and `support.PORT` agree across tasks. The method uses the existing single command and `.runs` record path. |
| Review Focus | All five lines map to a test and an independent break or control in Tasks 2–4. The package test permits unrelated tooling; compiler test checks distinct outputs; public check starts from a foreign directory and probes traversal; occupied check uses before/after controls. |
| Red/green quality and SDD order | On the unchanged application the four focused checks should be green. Each author commits that green change before the reviewer receives a `BASE..HEAD` package. Each reviewer then independently makes a sentence false and observes the corresponding focused check turn red in an ignored disposable worktree. A build/setup failure does not count. Fix commits receive scoped re-review. The plan does not require a production TDD rewrite for behavior the product already has. |
| Foundation process | Task 1 invokes project element skills, searches the whole foundation, writes dependent fields and recovered rows, and runs all three guards. Tasks 2–4 keep check authors separate from sentence and application-code authors; reviewers own deliberate breaks. The return step and independent assessment are explicit. |
| Request handoff | The orchestrator handles commits and request mechanics. The plan names final branch reconciliation, rechecks, records, recovered-row gate evidence, the baseline unchecked condition, and the URL swap in the three current /2 *Approved by* fields while leaving /1 unchanged. |

## Planning judgments and limits

- The current server code already serves `dist/public` from a module-relative path and exits nonzero on a bind error. The plan therefore does not ask an agent to rewrite it just to demonstrate TDD. If a check finds a real defect, the orchestrator opens a new test-first implementation and review unit and returns to the foundation step if an invariant test must change.
- The occupied-address check does not require a particular diagnostic message. It proves normal startup before and after the blocked launch, holds the address during the failed launch, and checks the exit code and absence of the exact readiness line. This matches the sentence without adding a diagnostic-text contract.
- The public-file check compares actual bytes of two built public assets with HTTP responses while keeping the public path and outside sentinels literal. Generated and temporary files receive no `data:` annotation; the format guard requires such annotations to name files it can find.
- The package-layout check protects application source package boundaries and leaves tooling packages outside those boundaries alone. A reviewer must probe both cases. If a separate package at another path actually builds either side, the check author must classify it by that application role rather than its directory name.
- Recovered-row *Found* text must cite the actual sources found, not a reason inferred from code. Current `README.md`, ordinary tests, `src/server` code, and the archived earlier cycle proposal give locations to inspect. The human settles the two rows at merge with the gate report.

## Questions to the orchestrator

None. The selected execution mode is subagent-driven. Please give a provisional go-ahead after your plan review; this is not human approval and does not begin execution from this planning dispatch.
