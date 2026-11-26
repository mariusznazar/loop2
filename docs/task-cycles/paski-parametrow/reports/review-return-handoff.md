# Handoff — review of the return step — task `paski-parametrow`

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator. The orchestrator's answers are never that person's approval. You ask no human; questions go back to the orchestrator in your report (status `questions`).

## What you review
- Worktree (your working directory): `the root of the task's worktree`, branch `task/paski-parametrow`. `.the-way` is at `b502011f`, equal to the gitlink. Your directory for working copies: `.runs/review-return/`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`); the return step's commits are reviewed as its section 2 gives, against the task and the entries the return step writes or corrects. Read the method whole; read the other files it names when their step comes.
- Range: base `e058ab30` (the head the whole change and its fix passed review at) to head `38e5dbf0` (`git rev-parse HEAD` must show a SHA that starts so; on a mismatch ask which range to review). One commit, five files: `foundations/decisions.md` (the *Verification* fields of D-337, D-450, D-311, D-178, D-39, D-40, D-42, D-44, D-04), and `decision:` comment lines in `tests/view/body-blow.test.mjs`, `body-row-cells.test.mjs`, `body-row-explanation.test.mjs`, `body-row-motion.test.mjs`. Compute the diff yourself.
- The return step's report (claims to verify, not evidence): `.runs/task-cycles/paski-parametrow/reports/return-step-report.md`; its method is `.the-way/task-cycle/skill/return_step.md` (read it: what the return step compares and writes) and `foundation_step.md` beside it. Frozen task, read whole: `.runs/task-cycles/paski-parametrow/task.md`.
- Report path: `.runs/task-cycles/paski-parametrow/reports/review-return-report.md`, first line `PASS <sha>` or `FAIL <sha>` (or `questions`). The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); if the harness refuses the write, return the report whole as your answer. It ends with **Unread material** and **Searches not found or unclear** (`none` is an answer) and gives for each blocking finding whether it carries the mark `Contradiction: yes` or `no` against the settlements. Minor findings within the task are listed apart from those you mark outside its scope.
- Read-only. No handoff tells you to run the product's gate (no bare `npm test`); `python -B .the-way/elements/common/foundation_check.py`, `python -B .the-way/instruction-files/check_instructions.py` and the focused test files of the view (`npm test -- <one file>`) are yours where they show what a finding needs.

## What to judge (the points that matter in this commit)
1. That **no binding sentence, no *Rationale* and no *Rejected*** of any decision changed (the report claims *Verification* fields only): compare the diff of `foundations/decisions.md` paragraph by paragraph.
2. For each decision, that the parts of its sentence that the new `tests:` clause names **are really held by the named tests** (read the test, not its title): D-337, D-450, D-311, D-178, D-39, D-40, D-42, D-44, D-04. The report removed the pairs of examples of D-450 and D-178 whole; judge whether any part of those sentences is held by no test (the report names as soft spots the real motion in a browser, and the cases in jsdom).
3. The report's claim that **D-311's first sentence** ("The world holds, from the top, …") has no `decision:` line anywhere and that it put such a line on the first case of `body-row-explanation.test.mjs`, which holds the explanation's place, not the order of the scene: judge whether that case holds the sentence it quotes or whether the quotation claims more than the case holds (the foundation check reads only that a quotation stands in a binding sentence).
4. That the pairs the return step wrote anew (the marker's height in D-337; "another opacity than 40 %" in D-42; the rewording of D-04's complies) are right and that nothing a test holds is left in a pair.
5. That the return step's **decisions not to write** are sound: no environment fact for the six token `Source:` readings of the repository `loop` and the Tailwind palette; no glossary entry; no part-map change; no entry for the light core of the marker beyond D-40, nor for `aria-controls`, the spaces in the parts of a cell or the explanation's wording (question 2 and 3 of the decisions template's "Where it goes", per its report). Read `.the-way/elements/decisions/template.md`, `.the-way/elements/environment-facts/template.md` and `.the-way/elements/glossary/template.md` as the method gives.
6. That what the return step corrected makes no entry say more than the code does: compare the changed *Verification* fields with the code of the head.

## Foundation and guidelines you read
You select your own by the method for the parts the commit touches (the foundation and the browser-view's tests). The decisions the commit edits, read whole with their diff; the invariant `design-token-contrast` and `design-token-sources`; the product's `guidelines/testing.md` (the tests' rule about quotations of decisions, `decision:` lines and `tests:` clauses) whole; `guidelines/coding.md` where a comment line of a test falls under it.

## Working copies — copied word for word from the cycle's skill
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
