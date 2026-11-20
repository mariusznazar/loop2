# Handoff — the review of the return step after correction 1, `review-change`, "a later change to an open request" (the return step's range)

You review, as an agent that did not make or review any earlier part of this change, the one commit the return step made after correction 1. You are read-only for the repository: you change no tracked file and make no commit. The person who requested this cycle has delegated intermediate choices to the orchestrator; no answer you get is that person's approval.

- Worktree (the root of the product; work from it, run the-way's scripts from it as `.the-way/<path>`): `the root of the task's worktree`, branch `task/wzorzec-kodu-przyrzadu`. `.the-way` is initialized at `19e5774a`, equal to the gitlink.
- Method: read `.the-way/task-cycle/review/SKILL.md` whole; read a file it names only when the step or variant that names it comes.
- Range: `a44a0fd0` to `5bc3a85f` (one commit, `5bc3a85f`, one file, `guidelines/coding-balance-instrument.md`, the rule "Zegar i losowość", +5/-3). It was made by the one author in the return step, after the human's remarks of correction 1 and the review of the correction (`PASS a44a0fd0`), to make the rule's list of what the test leaves to the reviewer match the test's docstring.
- Judge it against the task and the entries the return step corrects: the frozen task `.runs/task-cycles/wzorzec-kodu-przyrzadu/task.md` (read whole; its row 5 of *Settlements to record*, its *To do* 3 fourth bullet, and the answer to its question 6 are the requirement of this rule); the invariant `balance-instrument-repeatability` in `foundations/invariants.md` (the sentence the rule serves); the test `tests/invariants/test_balance_instrument_repeatability.py` as it stands (its docstring's "Reading", "Stricter than the sentence" and "Does NOT cover" are what the rule must match: check that the rule's list neither claims the test misses a form it reads, nor leaves out a class the docstring names, and that the rule still states a reason in one sentence and lists no state the template forbids, by `.the-way/product-guidelines/template.md` and `coding/template.md`); and the language and form of the other rules of the guidelines file (Polish, as the file stands).
- The author's report of the step: `reports/author-correction-return-report.md`. The review of the correction, for the context of why the rule was touched: `reports/review-correction-report.md` (its section of Minor findings; its other Minor finding — a type annotation `d: Date` in a `.ts` file would be flagged — is no finding of this range). The human's remarks: `reports/correction-1-remarks.md` (they bind; remarks 2 and the campaign outcome of remark 3 are let through).
- You select your own foundation and guidelines by the parts of the change (`guidelines/**` is the part `agent-workflow`; the rule concerns `balance-tools`) by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` and `.the-way/product-guidelines/reading.md`; state in your report how many decisions you read whole. You read the full diff of the range.
- Only a new Critical or Important finding fails this review; a Minor finding does not block and goes to the request's list. Do not run the product's full gate (`npm test`); focused checks only (the two checks of the-way, the repeatability test).
- Your directory for working copies: `.runs/review-correction-return/` of the worktree, removed before you return. Report path: `.runs/task-cycles/wzorzec-kodu-przyrzadu/reports/review-correction-return-report.md` (this file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it; if your write is refused all the same, return the report whole as your answer). The first line of the report is `PASS <sha>` or `FAIL <sha>`. The files of the cycle's record directory other than those this handoff names are not yours to read.

## Working copies (word for word from the cycle's method)

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
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.

## Report

As `review-change` gives; with **Unread material** (what stayed unread or was read in part of your own selection, or `none`) and **Searches not found or unclear** (each `none` where there is nothing), each check with command and exit code, the grade and scope of each finding, and for a blocking finding whether it contradicts a settlement of the task (`Contradiction: yes` or `no`).
