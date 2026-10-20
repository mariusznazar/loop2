# Planner report

Status: complete at plan boundary. No product file edited, no commit created, no next stage invoked.

## Inputs and boundary

- Worktree: C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines.
- Frozen task: .runs/task-cycles/coding-guidelines/task.md, accepted 2026-10-20, read whole. It is source-only for the approved MVP definition at fingerprint 9e480247, carries no projected MVP entry, and explicitly excludes MVP implementation and styleguide work.
- Product base: c379207bfd8bd148d3589ea75604ba5165915d01.
- Process gitlink and checkout: d829e3aa6242a9b8901274531dd82fd5c7d87628, both verified by git; full outputs listed below.
- Read project plan-task adapter, pinned task-cycle plan method and cycle boundaries, shared foundation reading method and guidelines reading method. Read coding-guideline author instructions and both templates to establish required output shape and method ownership; no refinement or exemplar audit reopened.
- Read AGENTS.md and CLAUDE.md. Root reports provide the source acceptance and environment context; product checks remain root's work and were not run concurrently by this planner.

## Foundation and guideline selection

All seven mapped parts are affected: browser-view/simulation/account-server by assertions or formatting; build-tools by dependencies/configuration/new checks/support behavior; deployment by formatting attributes and Python test import; agent-workflow by guidelines and pointer; product-foundation by accepted entries. The complete part map was read, including common scales, surfaces and trust boundaries. Highest touched criticality is high through deployment; package-lock.json and src/server/** are trust boundaries; no irreversible operation is planned.

Current decision Scope inspection selects D-01/1, D-02/1, D-03/2, D-04/3, D-05/3, D-06/3, and D-07/1 through D-27/1. All selected entries were read whole, including rationales and rejected ways. All current invariants were read, with loop2-one-serving-process/2 and the remaining current /1 entries. Product environment_facts.md, glossary.md and pinned process glossary were read whole, so linked facts and terms are covered. Topic search across foundations for lint/format/audit/guideline/exemplar/suppression/tool names found no pre-existing competing adoption; matches were unrelated environment-fact prose. Expected selection and read selection agree.

No product guidelines exist at base. The task creates coding.md and the four accepted kind files; its general coverage includes all six code-holding parts. Existing-kind deferrals are explicit task settlements, not inferred exceptions. No selection expansion or discrepancy arose. There is no styleguide order example to apply: the task creates coding guidelines and has no intended UI behavior/appearance change. If formatting exposes a visible effect, the affected executor returns it before changing task scope.

## Output and order

- Plan: .runs/task-cycles/coding-guidelines/plan.md.
- Size: .runs/task-cycles/coding-guidelines/plan-size.md.
- Six F-prefixed units are foundation-check preparation, explicitly separated from the twelve product implementation slices. Every accepted foundation entry and map consequence precedes dependent code. The three distinct identities for invariant sentence, method/check and covered code are required; check authors receive filtered sentence/method inputs, never this planning rationale or product-author reasoning.
- The audit method is separately reviewable. Python process-observation corrections use the foundation route for existing invariant tests; support cleanup and regression tests are a separate product slice.
- Forty-five original formatter targets are all named: build script in Slice 1, product sources and original tests in Slices 4–10. New covered scripts must also comply; no original-code exception survives final integration.
- Every To do item (10) and settlement row (22) has an explicit coverage row. The plan lists all 22 entries without drafting their text; rows 21–22 use the exact pinned template copies.
- Product authors use the coding-template author route for guidelines and maintain-instruction-files for the pointer. No personal/global instruction changes are authorized. Source-only MVP projected entries are not imported.
- The plan identifies theoretical independent work while retaining sequential execution, as required by Superpowers 6.4.1 and shared mutable test state.

## Choices and evidence

The plan's Choices table records eight reversible implementation choices with rejected alternatives and cost if wrong. These include: separate foundation-check batches; Python CLI/recording with an ESLint JS bridge; local hashed Python tool installation; accepted TS6/TS7 aliases; exact-version audit semantics; grouped formatting slices; guidelines written after compliance; language conventions. Root should copy these choices into the cycle record before dispatch.

Version feasibility used unauthenticated HTTPS reads with a generic user-agent and no owner/account/path data. All eight exact npm metadata endpoints, Ruff 0.17.1 and ShellCheck v0.11.0 release metadata returned successfully. Node engine ranges support the reported Node 24 environment; typescript-eslint's TypeScript peer range is >=4.8.4 <6.1.0, supporting the accepted TS6 alias. This confirms publication/metadata compatibility, not successful installation or the accepted active-rule counts. Those remain checks of the independent foundation/tooling stages; the plan preserves the accepted 92 TS, 64 JS and 393 blocking Ruff counts without reinterpretation.

PyPI publishes shellcheck-py 0.11.0.1 with no Python dependency and Windows/Linux x86-64 wheels. It is proposed solely as a distribution wrapper; execution must verify bundled ShellCheck 0.11.0. A hashed requirements lock and repo-local ignored environment avoid a custom archive installer and global-tool drift. Actual installs were intentionally not run by this planner while root operated npm/product baseline checks.

## Executed checks and complete evidence

All paths below are relative to this worktree. Output files are complete sanitized output, not excerpts. Plain file reads/searches were discovery, not product checks.

| Command | Exit | Complete output |
|---|---:|---|
| git ls-files --stage -- .the-way | 0 | .runs/task-cycles/coding-guidelines/reports/planner-pin-gitlink.txt |
| git -C .the-way rev-parse HEAD | 0 | .runs/task-cycles/coding-guidelines/reports/planner-pin-checkout.txt |
| python -B .runs/task-cycles/coding-guidelines/reports/planner-version-check.py | 0 | reports/planner-version-stdout.txt and reports/planner-versions.json beside this report; both original and captured repeat reported 10 items, 0 failures |
| python -B - (unauthenticated urllib JSON request to https://pypi.org/pypi/shellcheck-py/json; writes selected versions/latest) | 0 | reports/planner-shellcheck-py-stdout.txt and reports/planner-shellcheck-py.json |
| python -B - (unauthenticated urllib JSON request to https://pypi.org/pypi/shellcheck-py/0.11.0.1/json; writes version, dependencies and artifact hashes) | 0 | reports/planner-shellcheck-wrapper-stdout.txt and reports/planner-shellcheck-wrapper.json |
| python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/coding-guidelines/plan.md (first draft) | 1 | reports/planner-size-first.md; stderr empty |
| python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/coding-guidelines/plan.md (first repair) | 1 | reports/planner-size-initial.md; stderr empty |
| python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/coding-guidelines/plan.md (final) | 0 | .runs/task-cycles/coding-guidelines/plan-size.md and reports/planner-size-stderr.txt |
| python -B .runs/task-cycles/coding-guidelines/reports/planner-coverage-check.py | 0 | reports/planner-coverage-output.txt |
| git status --short | 0 | reports/planner-worktree-status.txt (empty: no tracked changes) |

The shorthand reports/ paths in this table resolve from .runs/task-cycles/coding-guidelines, not from the reports directory itself.

The initial size checks identified a nonexistent Read path, .the-way/gate/README.md. Its needed record/schema content is already in the read run_tests.py; the false path was removed. The first repair did not remove it because non-ASCII separator matching through piped Python input did not match; the final repair used an ASCII Unicode escape and the next size run passed. This is a tooling repair, not a change of task or a foundation departure. A mistaken discovery read of product-guidelines/coding/skill/SKILL.md was similarly corrected to the adapter's actual product-guidelines/coding/SKILL.md before using it.

The public web tool could read Ruff metadata but returned inaccessible-url errors for the npm JSON pages; direct unauthenticated HTTPS metadata checks above established those versions. This was not evidence of missing packages. No source code or repository data was uploaded.

## Result, failures and unchecked work

Final size result: all 18 units fit; maximum 10 changed files, maximum 73,575 estimated read tokens. No too-large or unchecked slice remains. Coverage result: all original 45 formatter targets accounted for, all 10 To do items, all 22 settlement rows. Earlier size failures are repaired and retained as evidence.

Product checks, installation, actual active-rule membership validation, live npm audit, deliberate invariant breaks, guideline case acceptance, foundation guards on new entries and integration review have not been run by the planner and are not claimed passed. Root reported baseline npm tests 173/173 and invariants 141/141 passed; root owns that evidence, which is not replaced here.

No unresolved design question or blocking concern. Before dispatch root must assign distinct identities and refresh final foundation identifiers/methods and any generated-file Read inputs; callable method interfaces in the plan are proposed and can be updated by their independent authors with recorded evidence. Returned at the planning boundary.
