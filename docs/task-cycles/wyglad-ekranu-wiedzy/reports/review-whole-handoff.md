# Handoff — review of the whole change

You review, as an agent that did not make it, the whole change of one task in a task cycle of the-way. The person who started this cycle delegated every intermediate choice to the orchestrator; nothing here is that person's approval. You ask no human anything: a question goes to the orchestrator as your method gives.

## Where you work

- Worktree (read it; you change nothing in it): `the worktree of the task`, branch `task/wyglad-ekranu-wiedzy`. **Write nothing in the main checkout `the main checkout of the repository`** — the session forbids it; run every command from the worktree.
- Your directory for working copies: `.runs/review-whole/` of the worktree (create it). Your report: `.runs/task-cycles/wyglad-ekranu-wiedzy/reports/review-whole-report.md`; its first line is `PASS <sha>` or `FAIL <sha>` (or `questions`). If you write blocking findings, the orchestrator cuts them into a findings file itself.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read, except the ones this handoff names below.
- Leave no shell, server or browser running when you return; close the browser you opened.

## Method and range

- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole; it sends you to `.the-way/task-cycle/review/whole_change.md` for the review of the whole change — read it when it says so. You select your own foundation and guidelines by the parts of the change, as that method gives (decision index by `elements/common/decision_index.py` into `.runs/review-whole/`; guideline files whole), and you report how many decisions of your index you read whole.
- What is reviewed: **the whole change**, base `a49c5f63e63037c3e608fbf3066cde178c5c06e9`, head `ba1ccf8d5a1835123b62b20ddf7802173e7fa10d` (three commits: `de3bbbfa` D-416, `ad650416` the screen and tests, `ba1ccf8d` the styleguide rule). Confirm `git rev-parse HEAD` equals the head; read the diff `git diff a49c5f63..ba1ccf8d` yourself, in full.
- The frozen task, read whole: `.runs/task-cycles/wyglad-ekranu-wiedzy/task_frozen.md` (approved task, "ready for cycle"). Check every item of its *To do*, every row of its *Settlements to record* and every item of *Decisions in play* it changes, and source fidelity — the new text of D-416 and of the styleguide rule against the rows. Its acceptance criterion is the human's judgment on the comparison of screenshots; you judge by looking at the screenshots (below) whether the change plausibly meets it and report what you see, but the verdict on beauty is the human's.
- No spec and no plan stand: the route is one author without a plan; there are no slices. The pin is not moved. The answers of the two questions at start: the change touches **no** trust boundary of the part map and holds **no** operation that cannot be undone.
- The author's report, a set of claims to verify, not evidence: `.runs/task-cycles/wyglad-ekranu-wiedzy/reports/author-report.md`. Its checks are the author's; you may run focused checks yourself (each with its command and exit code in your report) but not the product's full gate, which is the orchestrator's or CI's.
- Gaps the author reports and the orchestrator carries to you: of the decisions it was told to read whole, the author read only the binding sentences of D-280, D-282, D-40, D-43, D-42, D-39, D-47, D-48, D-200, D-379, D-291, D-274, D-275, D-276, D-279 and D-38 (not their *Verification*, *Rationale* and *Rejected*), read D-199 only to its *Verification*, and did not read the-way's glossary or the-way's styleguide template; judge the change against those entries yourself where they bear on it.
- Known facts of the change the orchestrator checked: the data hold 9 trees and 18 branches and „Ucisk” also has no number (the task speaks of 8 and 14 and three such branches); the author wrote the row-5 word into D-416's *Rejected* (the task's *Decisions in play*) though the row's *Goes to* says "sentence of D-416"; the author departed from the answers within the threshold of question 4 in four ways (its report, "Departures"). Judge whether each departure stays inside what the human chose (the task's question 4 and its item 7).

## Screenshots

The author pushed eleven screenshots to the public repository `mariusznazar/screenshots` (branch `loop2/wyglad-ekranu-wiedzy`, commit `8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c`); their links are in the author's report, section "Screenshots". Download them into `.runs/review-whole/` (never to another place), look at every one, and judge them against the styleguide, the task's *To do* and its item 4 — a state you did not look at in a screenshot is not a pass. Remove your downloads before you return. Do not push anything anywhere.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.

## Report

Write the report as your method gives it: first line `PASS <sha>` or `FAIL <sha>`, each blocking finding with its grade, the slice it comes from or that it comes from none, and the reviewer's mark of a contradiction with the settlements; the Minor findings and the findings outside the task's scope apart; the checks you ran with command and exit code; the number of decisions you read whole; your **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing you looked for and did not find, or `none`); the working copies you made and removed. Return the report's first line, the path, and a one-line result.
