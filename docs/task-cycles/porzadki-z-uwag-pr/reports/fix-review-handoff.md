# Handoff - review of the fix (`review-change`, the fix of a review's findings)

## Delegation

You are the reviewer of the whole change who returned `FAIL c1b371d`. The cycle fixed your findings once and asks you to review the fix range once. The human who requested this cycle
delegated every intermediate choice to the orchestrator; nothing here is the human's approval. You are read-only with regard to tracked files; leave no temporary edit behind (a temporary
checkout goes under `.runs/` and is removed again). You never ask the human. Finish all your own background work before you return.

## What you review

- Worktree: `the root of the repository`, branch `task/porzadki-z-uwag-pr`. The fix range: `c1b371d..60d4047` (compute it yourself: `git diff c1b371d..60d4047`, `git log c1b371d..60d4047`; confirm `git rev-parse HEAD` is `60d4047`).
- Method: read `.the-way/task-cycle/review/fix.md` whole, besides `.the-way/task-cycle/review/SKILL.md` which you know.
- Your findings, as the fix agents received them: `.runs/task-cycles/porzadki-z-uwag-pr/reports/findings-fix-a.md` (I-1 blocking, m-1) and `.runs/task-cycles/porzadki-z-uwag-pr/reports/findings-fix-b.md` (Minor findings inside the task).
- The fix reports (claims to verify, not evidence): `reports/fix-a-report.md` (commits `bc8f9ca` and `9400aee`) and `reports/fix-b-report.md` (commits `08268c9`, `9b0996f`, `5337efe`, `60d4047`; 11 findings fixed, 8 answered with evidence in its table).
- The orchestrator's choice for I-1 (autonomous; the human decides at the request): rewrite D-353 to say the silenced write is the session write that ends a response, refused because a block was committed while the request was in progress, as while a registration waits on its message; narrow the two code comments; leave `establishSession` and its 503 and its line as they are. The reason: the other way (also silencing `establishSession`) changes a route that To do 10 does not name. The request will tell the human that D-353 is now broader than row 2 (any request's end-of-response write, a login included) and narrower in one window (the first store of a registration keeps its line).

## What bounds the review

As `fix.md` gives. Judge: does the fix remove each finding it says it fixed, does each answer with evidence hold, and does the fix introduce a new finding? Only a new Critical or Important finding in the fix fails this review; a Minor finding that remains or is new does not block and goes to the request's list. Do not widen to the whole change again.

Questions to compute (not suspicions), beside the full scope of the fix range:
- Does the rewritten D-353 (and its *Verification* pair) say what the code does and no more, and is any word outside the changed sentence moved? Do the comments of `src/server/database.ts` and `src/server/app.ts` now agree with D-353, and is the code of the range otherwise unchanged (`git diff c1b371d..60d4047 -- src`)?
- Of the eight answered findings: for each, does the evidence hold (read the cited place), or can a change remove the finding after all?
- The new reset case of Slice 7 M1 in `tests/invariants/test_local_start_access.py` (stand-in branch `/reset`, a 100 ms delay): does it fail with the `failed` flag removed and pass with it (run it both ways in a temporary copy, not in the worktree), and is the delay a flaky wait the testing guideline forbids?
- Slice 4 #1: the three `assert.match(..., /cannot be replaced/)` became `instanceof Error`: is the case weaker than before in what it catches (it names the class of a block's refusal)?
- Run the changed test files once each, the skill tests of `tests/agent_workflow/`, and `python -B .the-way/elements/common/foundation_check.py`.

## What to return

The first line of a new report `PASS 60d4047` or `FAIL 60d4047`, then findings (new blocking; Minor, with place and own words, and whether inside the task), your judgment of each fix and each answer, the checks as command and exit code, reaches beyond the handoff, and **Searches not found or unclear**.
Full report path: `.runs/task-cycles/porzadki-z-uwag-pr/reports/fix-review.md`. Return to the orchestrator only the first line, a one-line check result and the report path.
