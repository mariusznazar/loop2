# Handoff — the one author, the whole change

You make the whole change of one the-way task as the one author, without a plan. The person who
requested this cycle has delegated intermediate choices to the orchestrator; nothing you are told
here is that person's approval. Ask no human anything: questions go to the orchestrator in your
return, as `questions`.

## Where and what

- Worktree (work only here, from its root): `the task's worktree`
- Branch: `task/lokalizacje-poza-repozytorium`; base `211a4ea556d48f5da98fc08380b3c061b9365709` (target branch `main`).
- Your method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Your variant, in the words of its row: **"the whole change as the one author"**. Read it whole, and a file it names only when the step or variant that names the file comes.
- Foundation step (you write the foundation entries together with the code): `.the-way/task-cycle/skill/foundation_step.md`, read whole before you write an entry; each entry is written through the project skill of its element (`the-way-record-decision`, `the-way-record-invariant`, `the-way-update-part-map` where the part map changes), never by hand.
- Frozen task (read whole): `.runs/task-cycles/lokalizacje-poza-repozytorium/task.frozen.md`
- Your report: `.runs/task-cycles/lokalizacje-poza-repozytorium/reports/author-report.md`
- Class of model: `same` as the orchestrator's (two foundation entries and prose edits in five files).

## What to read

- Foundation entry by identifier, whole: **D-82** in `foundations/decisions.md` (it is also one of the five edits).
- Parts the change touches: `agent-workflow` (`AGENTS.md`, `guidelines/**`, `tests/agent_workflow/**`) and `product-foundation` (`foundations/**`); read their entries in `foundations/part_map.md`, and select the decisions, invariants and glossary entries of those parts by "Reading the foundation" in `.the-way/elements/common/way_of_working.md`.
- Guideline files, each whole: `guidelines/coding.md`, `guidelines/testing.md`.
- The pattern the task's settlement 2 and question 3 point to: in `.the-way/installation/README.md`, the passage beginning "A product whose repository is public adds a second check" (the invariant and the test, with the example test), and the docstring of `.the-way/task-cycle/tracked_private_paths_check.py` (what the command reads and skips).
- The form of the `## Backlog` lines: `.the-way/project-level/backlog_place.md` whole, and the `## Backlog` section of `.the-way/AGENTS.md` as the model of the wording.
- Every file you change, whole, before you change it.

## Answers of the cycle's start (step 4)

- Trust boundary: no. Irreversible operation: no.
- Open design choice: none. Reserved choice: none. Route: one author without a plan.
- The pin of `.the-way` is already at the commit that holds WAY-320, `backlog_place.md` and `tracked_private_paths_check.py` (`e3825a82386a61930a86f8517fc0c5f422fc2833`); you do not move it.
- Checks already failing on the base: `tests/quality/test_quality_invariants.py` — `test_ruff_source_rules` and `test_shellcheck_source_rules` (the tools are not installed on this computer, `FileNotFoundError`). They are not yours.
- `python -B .the-way/elements/common/foundation_check.py` passes on the base (exit 0).

## Rules that bind the change

- The entries of the locations file `~/.the-way/locations.json` for `loop2` (`projects`, `tasks`) already exist. **Never read their values into a file, a commit message, your report or a handoff**: files name the entry ("the entry `projects` under `loop2`"), never the path (WAY-320, `backlog_place.md`). You need not open the locations file at all.
- The settlements the task carries, row 1 (a decision: loop2 points to places outside the repository by entries of the locations file; no tracked file holds an absolute path; a file may name a note and its folder in the notes, e.g. `Notes/Projects/(P) Loop/_zadania`, without a path on the disk) and row 2 (an invariant with the method `test`; its sentence names, between backticks and nowhere else in the sentence, the files that write example paths on purpose, if any). Which of the two entries gets which identifier, scope, wording and *Derives from* is for the record skills to give; the invariant's *Derives from* names the decision you write, as the installation README says.
- Questions 1–3 of the task are answered; do not reopen them. All nine absolute paths listed in *Need* go; the roughly 310 lines of private note names without a path stay as they are. The test comes from the-way (`tracked_private_paths_check.py` run from the product's root with the invariant's identifier), with no list of exceptions of loop2's own for false hits. If the command lists a hit in a file that is no real path, report it; do not add an exception.
- Where the test lives and how the gate reaches it: the product's one command `npm test` runs `scripts/test.py`, which already runs `.the-way/gate/run_tests.py` (it finds `test_*.py` files git tracks). Put the test in the directory of its part (`tests/agent_workflow/` belongs to `agent-workflow`) and follow `guidelines/testing.md` and the test's example in the installation README (cite the invariant in a comment line `invariant: <identifier>`). Check `foundations/part_map.md` and `foundation_check.py` for whether the new file needs a line there.
- Code is written in English; the Polish of the existing files stays as it is where you do not need to change a line. Commit messages in English, in the style of `git log` of this repository (`docs: :memo: …`, `test: …`), with `git add <path> …` by path, never `git add -A`.
- Write nothing outside the worktree. The ignored `.runs/` directory stays out of commits.

## The task's items you carry (all of them)

Items 1–7 of *To do* in the frozen task, both settlements of *Settlements to record*, and the decision in play (D-82: its sense does not change). Item 7: after items 1–6 the new test passes. Record the failing run of the invariant's test (before items 1–6 are made, so that it fails on the nine paths, or by whatever the foundation step and the testing guidelines require) and its passing run in your report with command and exit code.

## What you return

Per `make-change`: the report at the path above with its status, commits, checks with command and exit code, **Unread material**, **Searches not found or unclear**, concerns, and the own-work check; and in your return message the status, the commits, a one-line check result and the report's path. You do not run the product's full gate (`npm test`); the orchestrator does (step 10). Focused checks you may run: the new test file by `python -B scripts/test.py <file>`, `python -B .the-way/task-cycle/tracked_private_paths_check.py <invariant>`, `python -B .the-way/elements/common/foundation_check.py`.
