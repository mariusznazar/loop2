# Handoff — review of the whole change

## Delegation

The human who requested this cycle delegated the intermediate choices to the orchestrator. Nothing here is the human's approval. You review read-only: change no file of the worktree, commit nothing. You ask no question of the human; a question goes to the orchestrator in your report (section 4 of the method).

## Where you work

Worktree (your working directory): `<repository root>`, branch `task/zasady-linii-zadan`. Run the-way's scripts as `.the-way/<path>`.

## Your method and variant

Method: the project skill `the-way-review-change`, which reads `.the-way/task-cycle/review/SKILL.md` — read it whole. This is the review of the whole change: also read `.the-way/task-cycle/review/whole_change.md` and follow it. Your report is written to `docs/task-cycles/zasady-linii-zadan/reports/review-whole-report.md`, as the method gives it; its first line is `PASS <sha>` or `FAIL <sha>`. Return that first line, the changed files with their added and removed line counts, the checks you ran with commands and exit codes, and the report path. Do not run `npm test` (the orchestrator's gate); focused checks of your own choosing are yours.

## What you review

- Range: base `01418389` (the target branch, `main`) to head `9bbed2f8` (`git rev-parse HEAD` must show it; on a mismatch ask).
- The commits in it: `8a2b3f2c` (the pin move, below), then the one author's `59d3f8fd`, `a46e02fc`, `9bbed2f8`.
- The route: one author without a plan; no spec, no plan, no slices, so no slice had a review of its own: you judge the whole change.
- The frozen task: `docs/task-cycles/zasady-linii-zadan/task.md` — read it whole (it is in Polish). Judge every item of *To do*, the row of *Settlements to record*, the questions of *Questions to settle* with their answers, and *Out of scope*, and the source fidelity of the change to them.
- The author's report: `docs/task-cycles/zasady-linii-zadan/reports/author-report.md` — claims to verify, not evidence. It records one correction made in this cycle: the orchestrator's first handoff asked the author to add this task's document to D-362's *Origin*, the decisions template forbids that, and the author restored *Origin* in `9bbed2f8`.

## The pin move

The task moves the pin of `.the-way` from `52f8164a354ee1a704af0d58add2f3be8e4f0247` to `e9a0f926dc9758f6554e8c0a30925d3e4d68cfed` (item 1 of *To do*) in the branch's first commit `8a2b3f2c`. That commit must hold only the gitlink at the commit the task names, and what the installer owns (here the installer rewrote nothing else: its preview showed every other path as `KEEP`). Check that. The product's checks the move carried:
- on the base `01418389`, before the move: `npm test` failed only in `tests/quality` (2 tests, `FileNotFoundError`, the fresh worktree lacked `.runs/quality-venv`; installed per `README.md`, then `python -B .the-way/gate/run_tests.py tests/quality` exit 0, 40 tests OK); `python -B .the-way/elements/common/foundation_check.py` exit 0, 0 errors. Records: `docs/task-cycles/zasady-linii-zadan/reports/base-gate.log`, `base-quality-rerun.log`, `base-foundation-check.log`.
- the gate on the pin-move commit `8a2b3f2c` is still running in a separate checkout; its result is not available to you. Say in your report if you would need it for any finding.

## Risk answers

Trust boundary: no. Irreversible operation: no (the entry `task-rules` in the locations file outside the repository is a human action done before the cycle; the change must not give its value or the path it holds).

## What to select and read

You select your own foundation and guidelines, by the parts the change touches: `agent-workflow` (`AGENTS.md`, `.the-way`) and `product-foundation` (`foundations/decisions.md`). Two things the orchestrator found in the author's report, to carry:
- The author read D-362, the invariant `tracked-file-private-paths` and the part-map entries whole, but only the titles of the other decisions whose *Scope* names `agent-workflow` or `product-foundation` (about 45), and no glossary entry. Read the decisions of that search that bear on the backlog section, the agent instructions or the locations file, whole, as `way_of_working.md` gives you.
- The author did not read `.the-way/project-level/task_line.md` and `.the-way/project-level/backlog_place.md`; the second states what a `Task rules` line is for. Compare the new line of `AGENTS.md` with them and with the-way's own `AGENTS.md` at `e9a0f92` (`git -C .the-way show e9a0f92:AGENTS.md`).
- Guideline files: the change touches no product code, no test and no user interface; select none unless you find a reason.

Check, besides section 2 of the method: the new line of `AGENTS.md` word for word against the-way's line with `loop2` for `the-way`; that D-362 says what the change does and no more than the task's question 2 and row 1 settle; that the *Rejected* additions match the task's *Not chosen* for question 2; that no tracked file holds an absolute path on the author's disk or a link to a note (`python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths`); `python -B .the-way/elements/common/foundation_check.py`.

Report **Unread material** and **Searches not found or unclear**, and the count of decisions read whole and by title only.
