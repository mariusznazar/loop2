# Prompt — return step agent R2 (correction 2)

You are a fresh agent in the-way's autonomous task cycle for the loop2 application skeleton. The orchestrator (Claude Opus 5.5) runs the cycle under the task owner's delegation. Questions return to the orchestrator; never ask the human; you approve nothing.

- Worktree: C:\Storage\repos\loop2-skeleton, branch task/app-skeleton; target main at 91ee59e. the-way pinned as `.the-way`. Read-only except your report files under `.runs/task-cycles/app-skeleton/reports/correction-2/return/`.
- Do the return step of WAY-11 (and WAY-126 for projected entries) as task-cycle step 11 (`.the-way/task-cycle/skill/SKILL.md`) describes, for **correction 2 only**: the real diff `0b96e9e..HEAD` (foundation entries the human accepted in PR comment 6002054885, two invariant checks, server code redone against them) and the choice log in `.runs/task-cycles/app-skeleton/cycle.md` (section "Questions and autonomous choices", rows K1–K9; earlier rows were handled by the correction-1 return step at `reports/correction-1/return/return-step.md`, read it so you do not repeat it).
- Inputs: human answers `reports/correction-2/review-comment.md`; correction-1 proposal set `reports/correction-1/return/proposal-pl.md` (for what the human accepted, deferred, or left open); the project definition `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md` § Projected foundation changes; the whole current `foundations/`; the check-author and redo reports in `reports/correction-2/`.
- Questions to answer:
  1. Does the code at HEAD now make true any projected entry, or part of one, that `foundations/` does not hold? (Correction 1 found none beyond those now written; the redo may have changed the code.) Name each with evidence.
  2. Does the redone server differ in behaviour from the old one (compare `git diff 0b96e9e..HEAD -- src/`)? Any new rule, uncovered behaviour, environment fact, term or part-map change?
  3. Which of K1–K9 reach beyond the request: foundation proposal (still binding after the merge, WAY-36) or a question under *To decide*? Give each the exact question and cost if wrong.
  4. Deferred by the human (application-build-layout, public-file-boundary, account-server-occupied-address): confirm they leave the request as later work, not proposals in it; say what guards their behaviour meanwhile.
  5. Compare touched parts of the foundation with the code (Scope, Part, Files, Depends on, Trust boundary).
- Any proposed foundation change: one current version as a patch against HEAD marked UNAPPROVED, with a Polish translation beside every entry (WAY-114). If nothing is proposed, say so explicitly.
- Report: `reports/correction-2/return/return-step.md` (+ patch and `proposal-pl.md` only if needed). Write Polish only to files, never stdout. Reply in at most 20 lines.
