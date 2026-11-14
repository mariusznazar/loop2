# Handoff — review of the whole change

You are a reviewer that made none of this change. Review it as the cycle's **review of the whole change** for the task of the-way's task cycle in the product `loop2`.

## Place, method, range

- Worktree: `<worktree root>` (branch `task/pierwsze-porzadki-dziennika`). Read-only for you: change nothing, commit nothing, touch no branch. Work from the worktree's root.
- Method: the project skill `the-way-review-change` — read `.the-way/task-cycle/review/SKILL.md` whole, and `.the-way/task-cycle/review/whole_change.md`, which it names for the review of the whole change, as it directs; a file either names, only when the step that names it comes. Pinned the-way commit `55afa8e57aa1b83c77108576a36642722e0dda15` (the task does not move it).
- Range to review: base `a62ad91fb53b049c8d883f04a6a4927604142688` to head `25d909aec27bfabf15abac5c5b48c23896cca246` (three commits: `65d858b9`, `1a56e519`, `25d909ae`). The route is one author without a plan: there is no spec, no plan and no slices; the whole change is your one review.
- The frozen task: `docs/task-cycles/pierwsze-porzadki-dziennika/task.md` — read it whole. Its `Settlements to record` is `none`; its *Out of scope* binds.
- The author's report: `docs/task-cycles/pierwsze-porzadki-dziennika/reports/author-report.md`. The author returned `done with concerns` and lists choices of its own and material it did not read; read the report, and judge the change from the code, not from the report.
- Report path (write the full report there; its first line is `PASS <sha>`, `FAIL <sha>` or `questions`): `docs/task-cycles/pierwsze-porzadki-dziennika/reports/review-whole-report.md`. Return the first line, the changed files with line counts, the checks you ran with command and exit code, your findings graded by the method, and your **Unread material** and **Searches not found or unclear** sections (each `none` where it is none), and how many decisions you read whole and how many by title only (WAY-150).

## What to know that the task document does not say

- Reconciliation, recorded by the orchestrator: the base is `origin/main`, twelve commits ahead of the checkout where the task was written; one place that refers to a withdrawn number stands in a rationale the task does not list (D-264), and the author found one more (D-404).
- The task places the rules of the six withdrawn entries in the skills `loop2-play` and `loop2-deploy` and, for D-80, in `guidelines/testing.md`; the author added reasons to the skills (items 1–3 of *To do*).
- You select your own foundation and guidelines by "Reading the foundation" and `product-guidelines/reading.md`: the parts touched are `product-foundation`, `agent-workflow` and `browser-view`; the product's `AGENTS.md` also asks for `guidelines/styleguide-browser-view.md` before a change of any file of `browser-view` (the author changed one comment line of a test and read none of the styleguide).
- Read whole the entries the change withdraws, from the base (`git show a62ad91f:foundations/decisions.md`), and the 23 entries it edits in both forms (`git diff a62ad91f 25d909ae -- foundations/decisions.md`); the question each of the 23 edits asks is whether the sentence binds the same without the word.
- Check, besides the method's own list: every reference to the six numbers over all tracked files; that both copies of each skill are identical; that the reason sentences added to the skills are faithful to the rationale of the withdrawn entries at the base (nothing invented); that `foundations/environment_facts.md` was changed in agreement with the rules of the-way for facts (`.the-way/elements/environment-facts/`) and with the task's *Out of scope*; and that `python -B .the-way/elements/common/foundation_check.py` exits as the author says.
- You run no full test gate (`npm test` is the orchestrator's, and it has not run on this change); run the focused checks you need and report their commands and exit codes.
