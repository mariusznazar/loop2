# Handoff — review of the return step's commit, task `ekran-postaci`

## Who you are working for

The person who requested this cycle has delegated intermediate choices to the orchestrator. Nothing you say is the
human's approval; you never ask the human anything (questions go to the orchestrator in your report, first line
`questions`). You did not make the change; you alone grade and scope your findings.

## What you review

- The return step's range: base `7a10eaf074825de3b7177bb281ff348d8e186059` to head
  `61f5ce35b983e85f46fe682dd0f5df08e303394b`, one commit (`61f5ce35`), two files: `foundations/decisions.md` and
  `tests/view/icons.test.mjs`. Worktree `.runs/worktrees/ekran-postaci`, branch `task/ekran-postaci`; read-only; compute
  the diff yourself (`git diff 7a10eaf0..61f5ce35`, `git log 7a10eaf0..61f5ce35`) and confirm `git rev-parse HEAD` is
  `61f5ce35…`. Your directory for working copies: `.runs/review-return/`.
- Method: `.the-way/task-cycle/review/SKILL.md` — the review of the return step's commits, which its section 2 and the
  method's reading section give: against the task and the foundation entries the return step writes or corrects.
  (The whole change before this commit, `cfdbd267..7a10eaf0`, was reviewed and passed twice; do not repeat that
  review, but a fault of the return step's commit that shows only against the whole change counts.)
- The return step's report: `.runs/task-cycles/ekran-postaci/reports/author-return-report.md` — a set of claims to
  verify, not evidence. The return step is the stage of `.the-way/task-cycle/skill/return_step.md`: read it whole to
  know what the step may and may not do (it corrects what no longer matches, removes from a pair of examples the
  part a test holds and names that test by a `tests:` clause of the decision's *Verification*, writes an invariant
  only for a rule the task, a decision or the human sets, defers nothing).
- The frozen task: `.runs/task-cycles/ekran-postaci/task.md` (read it whole). The entries the commit corrects:
  D-445, D-446 and D-201 (their *Verification* fields); read each whole as it stands at the head and as it stood at
  `7a10eaf0`, and the template's rules for a *Verification* (`.the-way/elements/decisions/template.md`).
- The trust boundary answer for the cycle is unchanged (`assets/icons/**`); this commit touches no file of it, but the
  test it edits, `tests/view/icons.test.mjs`, holds the icon's checks — see that the two added `decision: D-446` lines
  cite what the test really holds.

## Points the orchestrator asks you to look at

- For each part the commit moved out of a pair of examples into a `tests:` clause: does a test of the repository really
  hold that part, as the clause says (name the test), and does the pair that remains cover only what no test holds? A
  claim that a test holds something it does not is a fault of the decision's *Verification*.
- The two added `decision: D-446` lines of `tests/view/icons.test.mjs`: do they quote the right sentence of D-446 as the
  foundation check holds it (the check passes at the head, `python -B .the-way/elements/common/foundation_check.py`)?
- Whether the commit changed a binding sentence or a *Rationale*, or dropped an example it should have kept.

## Rules

- Run **no full gate** (the user's instruction for this cycle); focused checks only, each with command and exit code;
  a check you do not run is named unchecked.
- Do not read `cycle.md` or other reports of the record directory except the return step's report and this handoff.
- Select your own foundation reading as far as this commit needs it (by the method's reading of the decisions named
  above); name each reach in your report.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Your report

Write it to `.runs/task-cycles/ekran-postaci/reports/review-return-report.md` (the name begins with the role; the file is
the input of `task-cycle/remarks_check.py`). First line: `PASS 61f5ce35b983e85f46fe682dd0f5df08e303394b`,
`FAIL 61f5ce35b983e85f46fe682dd0f5df08e303394b` or `questions`. Then the graded findings (place, grade, within the task or
outside it, and for a blocking finding whether it contradicts the settlements), the checks with command and exit code,
your reaches, **Unread material**, **Searches not found or unclear** (each `none` where nothing), and the line on your
working copies. Return the first line, a one-line check result and the report's path.
