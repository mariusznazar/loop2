# Handoff — review of the correction on request #50

## Delegation and boundary

The person who requested this cycle delegated intermediate choices to the cycle's orchestrator; nothing the orchestrator tells you is that person's approval, the remark below excepted, which is that person's own. You made none of this change. You are read-only: change no file and commit nothing. Stop every process you start and remove what your checks leave behind. Do not run the product's gate: the full `npm test` is the orchestrator's (WAY-160).

## Where you work

Worktree `C:\Storage\repos\loop2-wt\lokalny-start`, branch `task/lokalny-start`. Work from its root by the absolute path: your session starts in the main checkout `C:\Storage\repos\loop2`, which you do not touch. On Windows, Git Bash and PowerShell both exist.

## Method

Read `C:\Storage\repos\loop2-wt\lokalny-start\.the-way\task-cycle\review\SKILL.md` whole, and a file it names only when the step or variant that names it comes. You review a later change to the open request, with the human's remark in place of a findings file, and the reconciliation with the target branch that it opens with. You grade and scope alone.

## The remark, in place of a findings file

The human, 2026-11-02, answering the blocked request's question: „zmieńmy to zdanie, zmieńmy też D-254 i może jak i tak się zatrzymaliśmy to uwzględnijmy też uwagi minor”.

What the orchestrator took that to bind: the reviewer's clause in the sentence of what is now D-256, and the Minor findings of the four reviews, as the author's handoff lists them. The orchestrator's handoff to the author stands as `reports/handoff-correction.md`, and the wording of the clause of D-254's *Rejected* in it is the orchestrator's: the human saw no such words before this review.

## What is reviewed

- Range: `302ea89c37e14252b0dd591646c57d1596cd3d15..0c8b97c`: the merge 42ed270 of `main` at fe25b7d, then 5f403c9 and 0c8b97c.
- Of the merge, judge what this branch brings to it: the conflict resolution and the renumbering of this change's decisions from D-252 to D-256 to D-254 to D-258. What `main` brought was reviewed in its own request; do not review it again, but do check how this change meets it.
- The numbers in `review-whole.md`, `review-fix-1.md`, `review-return.md` and `review-fix-2.md` are those before the merge; `reports/correction.md` holds the mapping.
- The correction's report, its return step included: `C:\Storage\repos\loop2-wt\lokalny-start\.runs\task-cycles\lokalny-start\reports\correction.md`.
- The frozen task: `C:\Storage\repos\loop2-wt\lokalny-start\.runs\task-cycles\lokalny-start\task.md`. The blocked request's question and its answer change one thing against it: To do 2 reads wider than the new sentence of D-256, by the human's decision.

## Answers of the start

- Trust boundary: yes. `scripts/local-start.mjs` is one, and this range changes it again: failures through the log line, a proxy error's line, `stop` made with `wx`, the telling loop. Check crafted input there, and that no line it writes can carry a value of a request, a secret or personal data.
- Irreversible operation: no. Check that the removal still cannot be led outside `.runs/local-start/`.

## Report

Write your full report to `C:\Storage\repos\loop2-wt\lokalny-start\.runs\task-cycles\lokalny-start\reports\review-correction.md`, first line `PASS <sha>`, `FAIL <sha>` or `questions`, as your method gives. Return that first line, a one-line check result naming what failed or did not run, and the report's path.
