# Handoff — review of the return step's commit

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; no answer of the orchestrator is that person's approval. You review only and change nothing in the reviewed worktree. Questions go back to the orchestrator in your report (section 4 of your method). You are a fresh agent that made none of this change.

## What you review

- The commits of the return step of task `struktura-kodu`: range `2b9b2cd3910357de5fcf836e07e9e149d7d43573..6cc90484` (one commit, `6cc90484`, touching `foundations/decisions.md`, D-425 only); confirm `git rev-parse HEAD` in the worktree is `6cc90484…` before you go on; compute the diff and the log yourself.
- Worktree (read-only for you): `<worktree root>`, branch `task/struktura-kodu`; `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole: the review of the return step's commits as its section 2 gives, "against the task and the foundation entries the return step writes or corrects". Directory for working copies: `.runs/review-return/` (remove what you make there before you return). Run no full gate.
- Report: `.runs/task-cycles/struktura-kodu/reports/review-return-report.md`; first line `PASS <sha>` or `FAIL <sha>` (the full head you reviewed).

## What it is judged against (copied or named, each whole)

- The frozen task `.runs/task-cycles/struktura-kodu/task-frozen.md` (read whole: row 1 of *Settlements to record* is the entry D-425 carries; the answers under *Questions to settle* are its source).
- The return step's report: `.runs/task-cycles/struktura-kodu/reports/return-step-report.md` (claims to verify, not evidence), and the step's method `.the-way/task-cycle/skill/return_step.md` (read whole: what the step compares, writes and removes from a decision's pair of examples when a test holds part of its sentence).
- The entry the step corrected: **D-425** in `foundations/decisions.md` (heading `### D-425`, read whole with its *Rationale* and *Rejected*), the decisions template `.the-way/elements/decisions/template.md` (whole: the form of *Verification* and its `tests:` clause, and what *Rationale* may and may not state) and `.the-way/elements/decisions/skill/SKILL.md`; the invariant `function-and-file-size` in `foundations/invariants.md` (whole); D-29 and D-28 (whole).
- The code the clause claims is held by tests: `tests/quality/eslint-size-rules.mjs` and `tests/quality/test_function_and_file_size.py` (read whole). Check that each part the new `tests:` clause lists is held by the test (the thresholds and the counting, the scope of the function limit and that the file limit is off in tests, and the two exceptions standing whole and no other), that the pair of examples keeps only what no test holds, and that the removed *Rationale* sentence was rightly removed (and that nothing else of the entry changed).
- Cycle choices that bind (judge against them): Q1, Q3 and Q4 as stated in `reports/review-whole-handoff.md` (under `.runs/task-cycles/struktura-kodu/`).
- Gaps carried: the return-step agent read no executor, review or plan report and read the changed view diffs only for hooks, effects and cited names; this review does not widen to the code of the slices (judged by the earlier reviews, both `PASS`: `reports/review-whole-report.md`, `reports/review-fix-report.md`), but a claim of the return step about the code that you can check cheaply, check.

## What you return

Per your method: the first line of the report, graded findings (Minor findings of this review are not fixed in this cycle; they go to the request's list), the checks you ran with command and exit code (for example `python -B .the-way/elements/common/foundation_check.py`), **Unread material**, **Searches not found or unclear**, your reaches, and your working copies' line. Return the first line, a one-line check result and the report's path.
