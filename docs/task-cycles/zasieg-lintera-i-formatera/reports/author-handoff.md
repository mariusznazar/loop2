# Handoff — the one author, `make-change`

You are the one author of the change of one task of the-way task cycle of the repository loop2. The
person who requested this cycle has delegated intermediate choices to the cycle's orchestrator; you
send your questions to the orchestrator and return at your boundary, you never ask the human and never
start the next stage.

## Variant, worktree, report

- **Variant:** the whole change as the one author.
- **Worktree (work only here):** `the repository root (the task's worktree)`, branch `task/zasieg-lintera-i-formatera`, base `aa0ecd09a1037e3aff0ac2bcfc786f2707352929`. Dependencies are installed (`node_modules`, `.runs/quality-venv`) and `.the-way` is at the pinned commit `55afa8e57aa1b83c77108576a36642722e0dda15`.
- **Method:** `.the-way/task-cycle/change/SKILL.md` — read it whole; read a file it names only when the step or variant that names it comes. Run the-way's scripts from the worktree root as `.the-way/<path>`.
- **Report path:** `docs/task-cycles/zasieg-lintera-i-formatera/reports/author-report.md`
- **Frozen task (read whole):** `docs/task-cycles/zasieg-lintera-i-formatera/task.md`. It is in Polish; write code, comments and commit messages in English, as the repository does. What the code prints for the reader stays as the repository has it.
- No spec and no plan exist: the task leaves no open design choice. Where you meet one, return `returned` with a report and no code, as the method gives.

## Answers of the cycle's step 4

- Touches a trust boundary: **no** (the change touches `eslint.config.mjs`, `.gitattributes`, `tests/quality/**`, `foundations/**`, `guidelines/coding.md`; none is a trust-boundary file of the part map).
- Holds an operation that cannot be undone: **no**.
- Open design choice: **none**. Reserved choice: **none**.
- Your class: `same` as the orchestrator's.
- The task's measurements were taken on commit `fc00c406`; the base is 8 commits newer, and those commits do not touch the task's scope. Reconcile the task's file lists against the tree you have; name a mismatch in your report.

## What the orchestrator selected for you to read

Guideline files, each whole (Applies to every part this change touches):

- `guidelines/coding.md`
- `guidelines/testing.md`

Foundation entries, each whole (a decision from its `###` heading to the next, an invariant from its `##` heading to the next), in `foundations/`:

- decisions **D-29**, **D-32**, **D-28**, **D-83**
- invariants **eslint-source-rules**, **prettier-source-format**, **node-test-selection**
- the part map `foundations/part_map.md` whole (it is short) — the scope of the change is "every TS/JS file of the five parts browser-view, simulation, account-server, build-tools and deployment, according to the part map"; the helper `file_owners` in `tests/invariants/loop2_invariant_support.py` (part `test-helpers`) gives each git-tracked file its part, and `tests/invariants/test_cross_part_imports.py` (decision D-351) shows how another test uses it

The decisions and invariants that bear on the parts you touch beyond these (build-tools, deployment, agent-workflow, product-foundation, test-helpers) you select yourself by "Reading the foundation" in `.the-way/elements/common/way_of_working.md`, as the foundation step's skills give. Name in your report any reach beyond this list.

Exemplar of a completeness test that asks the tool instead of reproducing its syntax: `tests/quality/test_node_test_selection.py` (D-83). The existing tool-running test of the invariants you change: `tests/quality/test_quality_invariants.py`.

## Foundation step

You write the entries the task carries yourself, through the pinned project skills of their elements (`the-way-record-decision`, `the-way-record-invariant`, and others where your search of the foundation calls for them), as `.the-way/task-cycle/skill/foundation_step.md` gives. Read it whole. The rows of the task's *Settlements to record* are already accepted by the human with the task document; write each whole, keep one sentence of meaning in English and one in Polish for each entry in your report, and mark each `row 1`, `row 2`, `row 3` or `the cycle's`. The task's *Decisions in play* says exactly what D-29 and D-32 change and what their *Verification* must say after.

## Required outcome, in short (the frozen task is the binding text)

1. `eslint.config.mjs`: the ESLint `recommended` set, and for TypeScript `recommendedTypeChecked`, reach every TS/JS file of the five parts, including the ten files the task lists (nine in `tests/` root, plus `tests/deploy/restore-trial-docker-standin.mjs`). No change to the rule sets and no change to the files of the tests.
2. `PRETTIER_PATTERNS` in `tests/quality/test_quality_invariants.py` and the LF rules of `.gitattributes` cover the same files.
3. A new test (invariant test) that stops the gate when a TS/JS file of the five parts, according to the part map, does not receive the D-29 rule sets from ESLint, does not match the patterns of the Prettier test, or has no LF line ending in `.gitattributes`. The test asks ESLint for the rules each file gets and compares them with the sets of @eslint/js and typescript-eslint themselves, not with a rule list frozen in the product; it asks the tools instead of reproducing their pattern syntax. It cites the invariants it keeps in the form the repository's tests use (`# invariant: <identifier>` — see the existing tests). Where the new test sits (a new file or in `test_quality_invariants.py`) is your choice by the testing guidelines; say why in the report.
4. The invariants `eslint-source-rules` and `prettier-source-format` and the decisions D-29 and D-32 change as the task's *To do* 3 and 4 and *Decisions in play* give; their *Verification* and *Part* lines agree with the new wording; every foundation entry that names them stays consistent.
5. The paragraph of `guidelines/coding.md`, section "Linter", that says review keeps the patterns of `eslint.config.mjs` says the test keeps them.
6. The acceptance criterion: the new test, run against the configuration of the base (before your configuration change), fails and names the ten files. Run it that way and keep both the failing and the passing run, each with its command and exit code, in your report; say how you produced the "before" state (for example, by writing the test first and committing it separately, or by checking the base out in a temporary location under `.runs/`).

## Checks you run (yours; the full gate is the orchestrator's)

- The focused checks of what you change: the new test, `npm test -- tests/quality/test_quality_invariants.py`, `npm test -- tests/quality/test_node_test_selection.py` if you touch it, ESLint and Prettier on the ten files, and `python -B .the-way/elements/common/foundation_check.py` from the worktree root (at the cycle's end the full run must pass without `--skip-test-citations`; while an invariant waits for its test the switch is allowed). Do not run the full `npm test`; the orchestrator runs it.
- Each check in the report carries its command and exit code.
- Do the own-work check the method gives (`SKILL.md` of `make-change`), and keep its report in the shape the method gives, with **Unread material** and **Searches not found or unclear** (each `none` where it applies).

## Commits

Commit on the task branch, by path (`git add <path> <path>`, never `git add -A`, `.` or `commit -a`); commit messages in English in the repository's style (`type: :emoji: lowercase sentence`, see `git log --oneline`); never force-push, never push at all — the orchestrator pushes. Keep the worktree clean at your return. Do not touch `.runs/` content other than your report and any temporary location you make under it, and do not commit anything of `.runs/`.

Return: status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, one line of check results naming what failed or did not run, and the report path.
