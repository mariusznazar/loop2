# Handoff — review of correction 1, task `ekran-postaci`

## Who you are working for

The person who requested this cycle has delegated intermediate choices to the orchestrator. Nothing you say is the
human's approval; you never ask the human anything (questions go to the orchestrator in your report, first line
`questions`). You did not make the change; you alone grade and scope your findings.

## What you review

- The correction's range: base `00b952cff519b41871d5736ec8aed18813fd4a0d` to head
  `589ef0c05f3b07746d28c13e43b9ad1d4fc8d411`, one commit (`589ef0c0`), five files: `foundations/decisions.md`,
  `foundations/invariants.md`, `guidelines/styleguide-browser-view.md`, `tests/invariants/test_design_token_contrast.py`,
  `tests/view/character-screen.test.mjs`. Worktree `.runs/worktrees/ekran-postaci`, branch `task/ekran-postaci`; read-only;
  compute the diff yourself (`git diff 00b952cf..589ef0c0`, `git log 00b952cf..589ef0c0`) and confirm `git rev-parse HEAD` is
  `589ef0c0…`. Your directory for working copies: `.runs/review-correction-1/`. The base is the head of the request as the human saw it
  (the tree of the base is the tree of `61f5ce35`, the whole change already reviewed three times); do not repeat those reviews.
- Method: `.the-way/task-cycle/review/SKILL.md`, the review of a correction made for the human's remarks; read `fix.md`
  beside it and follow it. The remarks stand in place of a findings file: `reports/correction-1-remarks.md`
  (`.runs/worktrees/ekran-postaci/.runs/task-cycles/ekran-postaci/reports/correction-1-remarks.md`), the human's words through the day advisor who writes for the
  human. Of the three items only the second asks for a change: a contrast check for the pair „practice bar track grey on the
  block”, with a floor below today's value of about 2.3 to 1 (for example 2 to 1), so a later change of that grey toward the block's colour fails a test; no
  new colour value. Items 1 and 3 are let through and items 4–8 with the two departures are accepted, so the correction must
  change nothing of the look, the words or the entries they describe.
- The author's report: `.runs/task-cycles/ekran-postaci/reports/author-correction-1-report.md` — a set of claims to verify, not
  evidence. The frozen task: `.runs/task-cycles/ekran-postaci/task.md` (for what the settlements and *Decisions in play* say about the
  roles and the bar).
- The entries the correction writes or changes: D-42, D-40, D-48 (*Verification*), the invariant `design-token-contrast`, the
  styleguide's rules „Contrast of every pair” and „The screen Postać” and its roles table. Read each whole as it stands at the head
  and in the diff, with the template's rules for the element (`.the-way/elements/decisions/template.md`,
  `.the-way/elements/invariants/template.md`). An invariant is written or changed only for a rule the task, a decision or the human sets:
  here the human's remark 2 sets it.

## Points the orchestrator asks you to look at

- Does the new pair really hold the track's grey against `panel` at a floor of 2:1 in `test_design_token_contrast.py`, and does the
  check fail when the grey is set near the panel (judge from the test's own control case and, if you want proof, a run with the
  real file changed for a moment and restored — never leave a changed file)?
- Is the floor the track's only? `text-disabled` must not become subject to the thresholds of text (4.5:1) or of non-text roles (3:1)
  or to any other background than `panel` through this pair: check the pair's form in the test, the made-up passing tokens it uses and
  the sentences of D-42, the invariant and the styleguide.
- Do the sentences of D-42, D-40, D-48, the invariant and the styleguide agree with one another and with the test, leave no sentence that
  still says no check holds the pair, and change no binding sentence beyond the pair? Does the quotation of D-40 in
  `tests/view/character-screen.test.mjs` read right, and does `python -B .the-way/elements/common/foundation_check.py` stay at 0 errors?
- Does anything of the look change (it must not): `src/browser/**` is untouched by the range.
- The trust boundary answer of the cycle is unchanged (`assets/icons/**`); this range touches no file of it.

## Rules

- Run **no full gate** (the user's instruction for this cycle; CI runs it after the orchestrator's push); focused checks only,
  each with its command and exit code; a check you do not run is named unchecked.
- Do not read `cycle.md` or other reports of the record directory except the author's correction report, the remarks and this handoff.
- Select your own foundation reading as far as this range needs it; name each reach in your report.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Your report

Write it to `.runs/task-cycles/ekran-postaci/reports/review-correction-1-report.md` (the name begins with the role; the file is the input of
`task-cycle/remarks_check.py`). First line: `PASS 589ef0c05f3b07746d28c13e43b9ad1d4fc8d411`, `FAIL 589ef0c05f3b07746d28c13e43b9ad1d4fc8d411` or
`questions`. Then the graded findings (place, grade, within the task or outside it, and for a blocking finding whether it contradicts
the settlements), the checks with command and exit code, your reaches, **Unread material**, **Searches not found or unclear** (each `none`
where nothing), and the line on your working copies. Return the first line, a one-line check result and the report's path.
