# Handoff — review of the whole change, `review-change`, "the whole change"

You review the whole change of task `wzorzec-kodu-przyrzadu` of loop2 as an agent that did not make it. The person who requested this cycle has delegated intermediate choices to the orchestrator; no answer you get is that person's approval. You are read-only for the repository: you change no tracked file and make no commit.

## Where and what

- Worktree (the root of the product; work from it, run the-way's scripts from it as `.the-way/<path>`): `the root of the task's worktree`, branch `task/wzorzec-kodu-przyrzadu`. `.the-way` is initialized at `19e5774a`, equal to the gitlink; the task did not move the pin.
- Method: read `.the-way/task-cycle/review/SKILL.md` whole; your variant is the review of the whole change. Read a file it names only when the step or variant that names it comes.
- Range to review: base `4ee41c5f1d54172f646172da9b3f248dcaf5755e` to head `ce67fbd7` (three commits: `59081e9f` code, `4b0d615f` tests, `ce67fbd7` foundation and guidelines).
- The frozen task, which you read whole and which is the requirement: `.runs/task-cycles/wzorzec-kodu-przyrzadu/task.md`. No spec and no plan exist (one author, no plan). The task's five rows of *Settlements to record* are its settlements; check each row, each item of *To do* and each acceptance criterion against the change, and the source fidelity of the entries the author wrote.
- The author's report: `.runs/task-cycles/wzorzec-kodu-przyrzadu/reports/author-report.md` (read it; it holds the commands and the equality evidence of the measurements, the entries with their marks and the choices).
- Answers of the two questions at start: touches a trust boundary — no; holds an operation that cannot be undone — no.
- You select your own foundation and guidelines by the parts of the change, by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` and `.the-way/product-guidelines/reading.md`; write the index of your selection to your directory and state in your report how many decisions you read whole.
- You read the full diff of the range.
- Your directory for working copies: `.runs/review-whole/` of the worktree. Report path: `.runs/task-cycles/wzorzec-kodu-przyrzadu/reports/review-whole-report.md` (this file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it; if your write is refused all the same, return the report whole as your answer). The first line of the report is `PASS <sha>` or `FAIL <sha>` as the method gives. The files of the cycle's record directory other than the three named here (`task.md`, this handoff, the author's report) are not yours to read.
- Where the author's report says something stayed unread, it is carried to you: the author did not read the code of `tests/balance/*.test.mjs`, so it did not check which of them cite D-429 or another decision by a line `decision:` (the foundation check passes); it read D-162 only by its index lines; it did not read `balance/cli.mjs` lines 76–439. Judge whether any of it bears on the change.
- Points the author names as weak or unchecked, for you to test, not to take on its word: (a) the `cap` outcome in `campaign` is not printed anywhere, so the equality of outputs cannot show the value of the outcome there; (b) `meanNumber` on an empty list: whether any of the author's 12 measuring commands reaches it; (c) the two new Python tests flag names, not semantics — their stated blind spots against the sentences of the two new invariants; (d) the choice of the file for each of the four shared things; (e) D-437 is marked `the cycle's` because the author added a pair of examples to *Verification*.

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

You do not run the product's full gate (`npm test`): its run is the orchestrator's or CI's. You may run focused checks (a single test file as `npm test -- <file>`, the two checks of the-way, ESLint) in the worktree; the build `dist/`, `node_modules/` and `.runs/quality-venv/` already stand there.

## Report

As `review-change` gives. It must hold **Unread material** (what stayed unread or was read in part of your own selection, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), each check you ran with its command and exit code, the grade and scope of each finding, and for each blocking finding whether it contradicts a settlement of the task (`Contradiction: yes` or `no`).
