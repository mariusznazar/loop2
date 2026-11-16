# Handoff — reviewer of correction 1, pass 2: documents, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything; a question goes to the orchestrator in your report with status `questions`. You made none of the change. Nothing the orchestrator says is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Method: `review-change`, `.the-way/task-cycle/review/SKILL.md`, read whole; for the review of a correction made for the human's remarks read `.the-way/task-cycle/review/fix.md` and follow it: **the remarks take the findings file's place**.
- What is reviewed: **correction 1** of the open request (https://github.com/mariusznazar/loop2/pull/146), made for the human's remarks, which are, word for word, in `reports/correction-1-remarks.md` (`.runs/task-cycles/drobne-bledy-ekranow/reports/correction-1-remarks.md`). Range: base `c015e4c6` (the head the request stood on; take the full hash from `git log`) to head `9350cfe22adc3a693b8152bd3b03e2d8a2917c75`; compute the diff yourself and confirm `git rev-parse HEAD`.
- The correction's reports (claims to verify, never evidence): `reports/correction-1a-report.md` (code and tests: commits `4c6b4496`, `63f615e7`, `0c539660`, `786a4ca0`, `8b068a5b`) and `reports/correction-1b-report.md` (documents: commits `3a10c9c8`, `9350cfe2`). The frozen task is `.runs/task-cycles/drobne-bledy-ekranow/task.md` (the task binds where the remarks say less); the earlier reports are in `reports/` (slice 19's, `slice-19-report.md`, is the model of the cut walk).
- Say for each remark of the human's, one by one — 1(a), 1(b), 1(c), 2 (let through: nothing to do), 3, 4, 5, 6 — whether the correction makes it (**made**, or **not made** with evidence), and review the correction's diff as section 2 of the skill gives; a new Critical or Important finding in the correction counts as one that remains; a Minor finding blocks nothing.
- Deliberate decisions of the correction (so you do not report them as faults; you still report faults in the code or text that carries them): the native list of programs (a `select`) stays as wide as its longest option for a long name (a design choice for the human; it goes to the request); no test for 1(c) (jsdom does no layout; slice 13's rule has none either); `tenths` cuts down to tenths (exact for the one fractional condition); part B marked its change of D-367 `the cycle's` with the human's remark 1(a) as its source; D-04 now lists every memory of the page that the view draws from that part B found by reading the code; Minor findings 2 and 4 and finding 6 of the request were let through by the human.
- Read-only: no edit, no commit. Do not run the full suite (`npm test` without a file); focused `npm.cmd test -- <file>` runs are yours. Do not start the local game unless your pass says so below.

## Working copies (first paragraph of the cycle's rule, word for word)

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

## Report

As `review-change` gives it: the first line `PASS <sha>` or `FAIL <sha>`, graded findings (anchor `path:line`, the full wording, an expanded justification: why the code exists, the mechanism of the fault, an example with concrete values, the fix), the checks with commands and exit codes, reaches beyond the handoff, **Unread material**, **Searches not found or unclear**, and the line on working copies.

## Your scope: the documents (pass 2 of 2)

Remarks 3, 5 and 6, and the sentences part A made untrue (part B's work): the diff of `foundations/decisions.md` and `guidelines/styleguide-browser-view.md` in the range. Read the changed decisions whole (D-04, D-316, D-317, D-319, D-367) with their *Rejected*, and the passages of the styleguide that changed. Judge each as a document change: is each sentence true of the code at the head (read the code where a sentence says what the code does: for D-04, search the view for every memory of the page the view draws from and say whether the list is whole and each cited decision settles what is cited; for D-367 whether the new wording is true and whether it collides with another decision or with the styleguide; for D-319 whether the tests the clause names exist with those titles and hold what the clause says; for Escape, whether D-370 is the decision that settles it), does each entry keep the human's remark and add nothing beyond it, and is the typed-name rule of the styleguide now true (name any element that shows a typed name and does not break it, which the rule covers). Run `python -B .the-way/elements/common/foundation_check.py` and `python -B .the-way/instruction-files/check_instructions.py` (exit codes). Do not start the local game.
Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/review-corr-1-docs-report.md`; your directory for working copies: `.runs/review-corr-docs/`.
