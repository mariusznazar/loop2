# Handoff — correction 1 after the human's remarks, task `ekran-postaci` (you resume as the one author)

## Who you are working for

As before: the person who requested this cycle has delegated intermediate choices to the orchestrator; nothing you
decide is the human's approval; you never ask the human anything (questions go to the orchestrator in your report).

## Where and what

- The same worktree `.runs/worktrees/ekran-postaci`, branch `task/ekran-postaci`. The branch head is
  `00b952cff519b41871d5736ec8aed18813fd4a0d` (the commit that removes the copy of the record; its tree is the tree of
  `61f5ce35`, the code both reviews passed). Your correction's range starts there. The request is open:
  https://github.com/mariusznazar/loop2/pull/169, and CI passed on that head. Your directory for working copies:
  `.runs/author-correction-1/`.
- Method: `.the-way/task-cycle/change/SKILL.md`, variant **a correction for the human's remarks**, which you read again
  for this variant. The remarks bind; they stand word for word in `reports/correction-1-remarks.md`
  (`.runs/worktrees/ekran-postaci/.runs/task-cycles/ekran-postaci/reports/correction-1-remarks.md`) — read it whole. Their source is
  the human, through the day advisor who writes for the human, as in the task.
- What the remarks ask, by item of the request's *For you to decide*:
  - **Item 1 (the check by hand outside Chrome): let through.** Do nothing.
  - **Item 3 (the focus ring on a typed address): let through.** Do nothing.
  - **Items 4–8 accepted, and the two departures from the old Loop (the thicker bar, no clearing under the figure)
    accepted as they are.** Change nothing of the look, the words or the entries those items describe.
  - **Item 2 (the grey of the bar's track): the new use of that grey is approved; and the correction to make is:**
    "add a contrast check for the pair „practice bar track grey on the block” with a floor below today's value of
    about 2.3 to 1 (for example 2 to 1), so a later change of that grey toward the block's colour fails a test instead
    of fading the bars with every test green. No new colour value is needed." That is the whole correction.
- How to make it: the game already checks the contrast of its pairs by the invariant `design-token-contrast`
  (`tests/invariants/test_design_token_contrast.py`) and the thresholds of D-42 and the styleguide's rule "Contrast of
  every pair". The pair here is the track of the practice bar, `text-disabled`, on the block's background `panel`
  (the screen areas' background), at a floor of 2:1 unless you find a reason in D-42 or the styleguide that a floor
  of another value fits the pair better and stays below today's 2.30:1 (name it and why). Find where the foundation
  wants such a pair written — in D-42's sentence, in the invariant's sentence, in the styleguide — and write it by the
  foundation step (`.the-way/task-cycle/skill/foundation_step.md`, and the `SKILL.md` of the element at the path that
  file gives), as it gives for a decision or an invariant; the sentences that now say that no check holds the pair
  (D-40's *Rationale*, the styleguide rule of the screen Postać and its roles table, wherever you find them, and the
  `highlight`/`text-disabled` rows) change to say what is true after the correction. A pair of `text-disabled` with
  `panel` added to the contrast check must not turn the roles' other contrast thresholds, which hold for the text
  roles on their backgrounds, into a new demand on text that uses `text-disabled`: the floor is for this track only —
  settle in which form it stands (a pair of its own with its own floor) and say so in the sentence you write.
- Test first where it changes behaviour: show the new check failing for the expected reason (for example by a run
  with the grey set to a value near the `panel`, restored afterwards, or by the check's own way of showing a pair that
  fails) and passing at the real value; each with its command and exit code.
- Take the return step for what the correction touched, as `.the-way/task-cycle/skill/return_step.md` gives: compare the
  entries you write or change (D-42, the invariant, D-40, the styleguide, and what else the correction reaches) with the
  code and correct what no longer matches, in a commit of its own if it changes anything; write a rows-and-entries
  summary as before. No entry for the *Minor findings* of earlier reviews other than the pair of item 2.
- Commit by explicit path with English messages in the repository's form (decisions at the end); run only focused checks
  (`npm test -- <one file>`, ESLint, Prettier, the typecheck, `python -B .the-way/elements/common/foundation_check.py`
  after a foundation change), each with its command and exit code. **Run no full gate** — CI runs it on the push the
  orchestrator makes. Take no screenshot (the look does not change) and push nothing to the screenshots repository.
- The other files of the record directory are not yours to read except `reports/correction-1-remarks.md` and this
  handoff.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Your report

Write it to `.runs/task-cycles/ekran-postaci/reports/author-correction-1-report.md` (the name begins with the role; the file is the
input of `task-cycle/remarks_check.py`). First line: your status. Then: the commits and their ranges (the correction's
and the return step's, apart), each remark answered with what you did, each check with command and exit code, the
own-work check, the choices with the way rejected, the record's *Return step* items for this correction
(foundation compared with code, decisions, invariants, environment facts, glossary terms, part-map changes, settlement
rows), **Unread material**, **Searches not found or unclear** (each `none` where nothing), and the line on your working
copies. Return the status, the commits, a one-line check result and the report's path.
