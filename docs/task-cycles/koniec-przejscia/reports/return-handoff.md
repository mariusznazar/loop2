# Handoff — the return step of the task koniec-przejscia

You take the return step of the cycle: you compare the foundation entries the change writes or changes, those the task names and those a search of the foundation finds, and the part map of the touched parts, with the code as it stands, and correct in the same change whatever no longer matches; you write what the return step writes (below). Work from the worktree `` (branch `task/koniec-przejscia`, HEAD `4ef0789c…`, which the reviews passed and the orchestrator's gate checks; never touch the main checkout `a repository on the author's disk`). You write foundation entries only (and the commit holding them): no product code, no test, no guideline.

## Delegation

The human who requested this cycle delegated intermediate choices to the orchestrator; your questions go to it in your report (status `questions` or `blocked`). Nothing you decide is the human's approval.

## Method

Read whole `.the-way/task-cycle/change/SKILL.md` (for how a change is reported and committed; your stage takes none of its rows: you are "the agent of the return step") and `.the-way/task-cycle/skill/return_step.md` and `.the-way/task-cycle/skill/foundation_step.md`, which your stage is. Write each entry through the project skill of its element, by the skill's own steps (`the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-record-environment-fact`, `the-way-update-part-map`: project skills with the `the-way-` prefix; read the skill of an element when you write an entry of that element). Read the entries the skill's step 1 selects, and search the whole foundation once, as `way_of_working.md` step 2 gives.

## What is to be compared

- The frozen task `docs/task-cycles/koniec-przejscia/task.md` whole, with its *Decisions in play* and rows 1–7 of *Settlements to record*; the plan `docs/task-cycles/koniec-przejscia/plan.md` (its *Choices* table is the list of choices the change made to the questions the task carried); the code the cycle made: `git diff 211a4ea..4ef0789c` (computed yourself).
- The entries the change wrote or changed: D-362 (new), D-53, D-62, D-122, D-132, D-135, D-147, D-173, D-185, D-212, D-216, D-311, D-313 (`reports/foundation-report.md` says what each means), and the part map of `browser-view` and `simulation` (`foundations/part_map.md`), the invariants `save-version`, `death-settled-once`, `solved-map-manual-run`, `minute-span-split`, `content-identifiers`, `browser-view-token-values` and the decisions D-206, D-208, D-212, D-213, D-285, D-323, D-324, D-338, D-339 that touch them.
- The reviews' words on foundation entries, as information for you to verify against the code, not instructions: the review of the whole change (`reports/whole-review-report.md`, `reports/whole-review-fix-report.md`) found D-311 still says Escape closes the window without the qualification D-362 now carries (Escape pressed in the window, which takes the focus when it opens); and, out of the task's scope, that D-339 (*Verification* and *Rationale*: "the saved game state keeping its version") may read as stale after the bump of the save to version 4 — judge whether a sentence of D-339 no longer matches the code and, if so, correct it in the smallest way (the task leaves D-338 and D-339 without change of meaning). D-362's heading question differs from the projected entry's wording by decision of the foundation step; leave it.

## What the return step writes (task and plan)

- Each choice of the plan's *Choices* (and of the executors' reports in `reports/slice-*-report.md`, `reports/fix-1-report.md`) that binds after the merge, such as: where the record of the end lives (`GameMapRun` and not `MapRun`; `longestStreak`, `minutesByAction` as a closed list over the kinds of action plus `wait` and `combat`, `enteredWith`), how the window covers the screen (the covered header and areas are `hidden`), the memory of the window being a memory of the page, what focus and Escape do, what „Koniec przejścia” does while the question stands, which of two end buttons the question remembers — as a decision, or inside the entry it belongs to, through `the-way-record-decision`, where it binds later work (tasks 18 and 19 of the plan stand on this window) and the task does not exclude it. A choice that binds nobody after the merge stays a row of the questions table (name it in your report, with the reason).
- The task and the foundation exclude: a glossary entry for "the end-of-run window" (task Question 11: "okno końca przejścia" reads without one).
- An invariant only for a rule the task, a decision or the human sets; none is expected.
- The part map: judge whether a file the change added needs a line (each stands under a pattern already held).
- No entry is deferred: one this request does not write is neither proposed nor listed for later.

## Checks and commits

After each entry run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`, and at the end `python -B .the-way/elements/common/foundation_check.py` without the switch (the test citations of the invariants must then pass). Commit by path (never `git add -A`), messages in English in the form of the repository's history. Do not run the product's gate.

## Report

Write the full report to `docs/task-cycles/koniec-przejscia/reports/return-report.md`: for each entry compared what no longer matched and its correction, or that it matched; the entries written or changed with the meaning of each in one sentence of English and one of Polish and its mark (`the cycle's` for an entry no row and no projected entry carries whole); the choices left as rows of the questions table; the commits; each check with command and exit code; the own-work check (the requirement most likely unmet and the check that would catch it); **Unread material:** and **Searches not found or unclear:** (each `none` if so). Return only the status, the commits, a one-line check result and the report path.
