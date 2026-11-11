# Handoff — the one author, the whole change

## Delegation

The human who requested this cycle delegated the intermediate choices of the cycle to the orchestrator. Nothing here is the human's approval. You answer to the orchestrator; ask no question of the human.

## Where you work

- Worktree (your working directory, and the only place you write): `<repository root>`, branch `task/zasady-linii-zadan`.
- Base of your work: `8a2b3f2c` (the commit that moved the pin of `.the-way` to `e9a0f926dc9758f6554e8c0a30925d3e4d68cfed`). `git -C .the-way rev-parse HEAD` shows that commit. Work from the worktree's root; run the-way's scripts as `.the-way/<path>`.
- Commit under the product's git rules: `git add <path> <path>…` by explicit paths, never `git add -A`, `git add .` or `git commit -a`; commit messages in English, in the style of `git log` (for example `docs: :memo: …`). Do not push. Do not create or switch branches.

## Your method and variant

Method: the project skill `the-way-make-change`, which reads `.the-way/task-cycle/change/SKILL.md` — read it whole, and a file it names only when the step or variant that names it comes. Your variant, in the words of its row: **the whole change as the one author**.

Stage and boundary: you make the whole change, the foundation step with it (`.the-way/task-cycle/skill/foundation_step.md` — read it whole), and you return before review with the report below. You do not run the return step now: the orchestrator resumes you for it after the review (`.the-way/task-cycle/skill/return_step.md`). Do not run the product's gate (`npm test`); that run is the orchestrator's. Focused checks of your own choosing are yours (for example `python -B .the-way/elements/common/foundation_check.py` and `python -B .the-way/gate/run_tests.py tests/agent_workflow`); each check you report carries its command and exit code.

## The task

The frozen task: `docs/task-cycles/zasady-linii-zadan/task.md` (original path in the record only; the frozen copy is yours). Read it whole. It is in Polish; the entries you write in the foundation are in English, as the foundation files are.

Answers of the cycle's step 4:
- Trust boundary: no. Every review is told so.
- Irreversible operation: no. The entry `task-rules` under `loop2` in the author's locations file is a human action already done before the cycle; the change does not touch the file, and no file you write gives its value or the path it holds.
- Open design choice: none. Reserved choice: none. Route: one author without a plan.

The pin is already moved (item 1 of *To do*): do not touch `.the-way`, `.gitmodules`, `.claude/skills/the-way-*` or `.agents/skills/the-way-*`.

## What to make

Item 2 of *To do*: in `AGENTS.md`, in the section `## Backlog`, replace the bullet that begins "When a task document first reaches `Status: ready for cycle`" with the line below, which is the line of the-way's own `AGENTS.md` at `e9a0f92` with `loop2` for `the-way` (copied word for word; keep the bullet and wrapping style of the neighbouring bullets of loop2's `AGENTS.md`):

> Task rules: the entry `task-rules` under `loop2` in the same locations file. It names the author's rules for a task's line: its status when new, its move to ready, its dependencies. A missing entry or file is handled as for the tasks.

Item 3 and row 1 of *Settlements to record*: D-362 (`foundations/decisions.md`, heading `### D-362`) lists, among the entries under `loop2` in the locations file, `task-rules` beside `projects` and `tasks`, the one that names the author's rules for a task's line in his notes. loop2 gets no new decision about where the rules of a task's line come from (question 2 of the task, *Not chosen*). Write the change through the project skill `the-way-record-decision`; the skill selects the reading the entry needs, and the WAY-33 search of the whole foundation. Keep the decision's remaining fields coherent with the change (its *Verification* examples, *Origin*, *Rationale*, *Rejected*): the new *Origin* names this task as the source of the change, in the form the decisions' template gives, with the task document's file name and the folder it lies in within the notes (`Notes/Projects/(P) Loop/_zadania`), never a path on a disk. Entries that cite D-362 (for example the invariant `tracked-file-private-paths`) are compared with the changed decision; correct what no longer matches.

The text of `AGENTS.md`, of the decision and of every other tracked file holds no absolute path on the author's disk and no link to a note (invariant `tracked-file-private-paths`; the check is `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths`). `AGENTS.md` names the entry, never the path or the content of the locations file or of the rulebook.

Out of scope (task): any change to the lines `Projects` and `Tasks` of `## Backlog`; any change to the vault's rulebook.

## What to read

- Foundation entries by identifier, each whole: D-362 (task's *Decisions in play*). The part map entries of `agent-workflow` and `product-foundation` (short file; read the entries of the parts you touch). Invariant `tracked-file-private-paths` (`foundations/invariants.md`, heading `## tracked-file-private-paths`), since it derives from D-362.
- Guideline files: none apply. The change touches no product code, no test and no user interface; `AGENTS.md` and a decision of the foundation are neither (`guidelines/coding.md` and `guidelines/testing.md` are therefore not in your reading; if you reach one, name the reach in your report).
- Every file you change, whole, before you change it: `AGENTS.md`.
- Task passages: the whole frozen task.

## Your report

Write the full report to `docs/task-cycles/zasady-linii-zadan/reports/author-report.md`, as `.the-way/task-cycle/change/SKILL.md` gives it. It must hold, besides what that method names: for the entry you write or change, one sentence of its meaning in English and one in Polish, marked `row 1`; every check with its command and exit code; your own-work check; **Unread material** (what this handoff names that stayed unread or was read in part, or `none`); **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
