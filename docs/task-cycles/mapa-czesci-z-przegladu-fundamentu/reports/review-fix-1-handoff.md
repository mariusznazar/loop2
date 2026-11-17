# Handoff — review of the fix of the review's findings

You are the reviewer of the whole change, resumed to review the range of the fix once. Same worktree, same pinned the-way, method `.the-way/task-cycle/review/SKILL.md` (`review-change`), a fix's review. You are read-only. Your directory for working copies: `.runs/review-fix-1/` (the earlier one is removed). Model of this review: `opus`.

## What you review

- Range: base (the head you reviewed) `abd32babdc7c3d68f6da53d444d1a65663208cfd`, head `d5932fc5`, two commits `fbaf2cac` (the test) and `d5932fc5` (the wording and table). Read the full diff of the range.
- The findings the fix answers: `reports/fix-1-findings.md` (full path `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/fix-1-findings.md`): your blocking finding I-1 and your Minor findings M-1 to M-7, cut word for word from your report.
- The fix's report: `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/fix-1-report.md`; the author's mutation evidence is in `reports/fix-1-evidence/`. Its claims are not yours: run the checks you need yourself.
- The orchestrator's answers to the findings that left a choice (they are the instructions the fix was given; judge whether the fix did them and whether each answer was itself sound):
  - I-1: the case reads the options of the one `ssh` call and takes the first value of each in every form `ssh` accepts; the first value of `StrictHostKeyChecking` must be `yes`; shown failing on R1 and R3.
  - M-1: "and batch mode" dropped from the sentence of `deploy-workflow-input`; the test may keep a `BatchMode` assertion as a side check.
  - M-2: "of that step" dropped from the sentence; no change to the test.
  - M-3: *Rests on* `none`.
  - M-4: **not fixed**: the task mandates one invariant per row of *Settlements to record*; the request will say it. Judge whether that holds.
  - M-5: D-224 added to the *Decision* list of `### Trust boundaries`.
  - M-6: the two cases of `tests/view/account-screen.test.mjs` named in the row of `password-reset.ts`, not marked.
  - M-7: "into the body of the request of its own link".
- Trust boundary: **yes** (as before): check crafted input at the boundaries, above all that the new form of the host-key case refuses the crafted forms of `ssh` options and no honest form of the workflow. Irreversible operation: no.
- A new Critical or Important finding in the fix counts as one that remains; a Minor finding of the fix does not block (the cycle lists it in the request). Grade and scope each finding as the method gives.

Do not run `npm test`; focused checks only (`python -B .the-way/elements/common/foundation_check.py`, `python -B .the-way/instruction-files/check_instructions.py`, `python -B scripts/test.py tests/deploy/test_deploy_workflow.py`, your own mutations of `.github/workflows/deploy.yml` in a copy under your directory).

## Working copies (word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed.

## What you return

Your report to `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/review-fix-1-report.md`, its first line `PASS <sha>`, `FAIL <sha>` or `questions`; checks with command and exit code; reaches; **Unread material**; **Searches not found or unclear**; working copies.
