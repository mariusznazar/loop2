# Handoff — review of the whole change, task `napis-o-awarii`

You are the reviewer of the whole change, an agent that did not make it. Variant of `review-change`: **the whole change**. You are read-only: change no file of the worktree, commit nothing.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\napis-o-awarii`, branch `task/napis-o-awarii`. Work from its root.
- Method: the project skill `the-way-review-change`, which reads `C:\Storage\repos\loop2-wt\napis-o-awarii\.the-way\task-cycle\review\SKILL.md` (and `whole_change.md` beside it where its variant row names it). `.the-way` is at `61c72fb6347649a9bd61a71f0d2695f2e91e8b6a`.
- Range to review: from the task's base `5694146` to the head `bd1971decef013bd2a5bd5f6a8f9ac21343b6fff` (commits `cbe0a66`, `af2cfae`, `bd1971d`; 15 files, +1166 −51).
- Frozen task (whole; the authority): `C:\Storage\repos\loop2-wt\napis-o-awarii\.runs\task-cycles\napis-o-awarii\task-frozen.md`. It is a member of a project plan (`plan_mvp2_loop2.md`, task 8); its projected entry for the decision "How does an agent learn what went wrong in the running game?" is task 15's and is out of scope here.
- Route: one author without a plan, no spec. The author's report: `C:\Storage\repos\loop2-wt\napis-o-awarii\.runs\task-cycles\napis-o-awarii\reports\author-report.md`.
- Your report: `C:\Storage\repos\loop2-wt\napis-o-awarii\.runs\task-cycles\napis-o-awarii\reports\review-1.md`; its first line is `PASS <sha>` or `FAIL <sha>` (or `questions`).

## Answers of the orchestrator at start

- Trust boundary: **no** — no file of a trust boundary of the part map is touched. Still check that the console line never carries an error's `message` or `stack`, as D-252 and `guidelines/coding.md` require.
- Irreversible operation: **no**.
- Open design choice and reserved choice: none.

## Selection and what to check

You select your own foundation and guidelines by the parts of the change (`browser-view`, `agent-workflow`, `product-foundation`) as "Reading the foundation" in `elements/common/way_of_working.md` and `product-guidelines/reading.md` give; read each guideline file whole. The orchestrator's selection that the author got is in `reports/handoff-author.md` beside your report, for information only.

Check at least:
- every item *To do* 1–7 and every row 1–5 of *Settlements to record* of the frozen task, and the answers to its six questions, against the code, the tests and the entries written (coverage and source fidelity: the entries mean what the rows mean and no more; D-262's addition is the row's sentence);
- the foundation entries written or changed (D-323, D-253, D-262, the environment fact, the invariant) as their templates and the foundation's rules give, including *Based on* / *Rests on* / *Verification* links and that no entry contradicts another (the author reports that D-323 has *Based on* `none` and the card-down branch rests on a React behaviour with no fact entry);
- that the author read what the task needed: the author did not read whole D-62, D-122, D-132, D-173, D-203, D-204, D-211, D-259, D-261, D-264, D-265, D-286 (it names them in its report); check whether any of them is contradicted by the change;
- the guidelines (coding, browser-module, testing, styleguide of the browser view, `src/browser/AGENTS.md`), the invariant test and its record, that tests assert behaviour and not implementation, and flaky or time-dependent tests;
- the part map and the `foundation_check.py` result for the new files;
- the appearance of the sentence on the card and in the header row, by the criteria the method gives for appearance (WAY-220); the author's real-browser evidence is in its report;
- the two skill copies `.claude/skills/loop2-play/SKILL.md` and `.agents/skills/loop2-play/SKILL.md` and `tests/agent_workflow/test_loop2_play_skill.py`.

Run the checks you need yourself (focused tests: `npm test -- tests/view/<file>.test.mjs`; `npm run typecheck`; `python -B .the-way/elements/common/foundation_check.py`), each with command and exit code in the report. Do not run the full `npm test`; the orchestrator runs the gate on the reviewed change. Do not use the author's mutation script or any file under `.runs/` as evidence of correctness: run your own check.

Report the checks you ran, every finding with its grade and its scope as the method gives it, the **Searches not found or unclear** you made, and any reach beyond this handoff. Return only: the report's first line, a one-line check result naming what failed or did not run, and the report's path.
