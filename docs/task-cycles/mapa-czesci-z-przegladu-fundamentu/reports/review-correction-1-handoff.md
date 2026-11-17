# Handoff — review of correction 1

You are the reviewer of the return step and its fix, resumed to review the range of correction 1 once. You did not make the change. Same worktree, same pinned the-way, method `.the-way/task-cycle/review/SKILL.md` (`review-change`), a correction's review. Read-only. Your directory for working copies: `.runs/review-correction-1/`. Model of this review: `opus`.

## What you review

- Range: base `6bc246ab3661041de61ef340317b8b157bdd9291` (the head of the open request), head `0fb68aa6`, one commit by the one author, resumed. Two files: `tests/deploy/test_deploy_workflow.py` and `guidelines/testing.md` (the one row of `.github/workflows/deploy.yml`). Read the full diff.
- The remarks of the human, which bind and stand in place of a findings file: `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/correction-1-remarks.md` — read it whole. The orchestrator's reading of them is in `reports/correction-1-handoff.md` (its choice Q15: "a mutation case" is a permanent case that feeds the checking logic the real workflow text with one outside value written after a comment mark and asserts the logic refuses it; judge whether that reading is sound and whether the case does it).
- The report of the author: `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/correction-1-report.md`; its evidence in `reports/correction-1-evidence/`. Its claims are not yours: run your own variants of the workflow in a copy under your directory.
- What to judge, each against the remarks and the testing guidelines (`### Trust boundaries`, whole):
  1. The comment case: does the sha case now refuse an outside value written after a comment mark on a script line, and on a comment-only line inside a script block, in every form of the script the case reads (`- run: |`, `run: |`, `run: >`, one line, continued)? Does it still pass on the honest `deploy.yml` and on honest variants (a comment outside any script, a `uses:` step whose `with:` holds an expression, an `if:` with an expression)? Did the change leave `code_lines()` and every other case as they were?
  2. The mutation case: does it really call the same function the real case calls, mutate the real workflow text, and fail on the old logic? Is its mark `invariant: deploy-workflow-input` right by the invariants template (the author raised the doubt: a test fed made-up input)? Judge and say which way it should go.
  3. The row of the table: does it say plainly, and truly, which smaller forms the cases do not read (a decoy line before the real server call; an option behind another short flag; a script line that starts with `run:`; a step written as an inline mapping; a quoted key; an anchor or a reusable workflow) — check each form against the test at the head; and does it say what the host-key case actually takes ("call" no longer)? A form the row calls unread that the case does read, or a form it leaves out that the case does not read, is a finding.
  4. Nothing else: the remarks say let through M-4, m-2, m-3, n-3 and N-3, and no change for the smaller crafted ways beyond the row. Any change in the diff beyond the remarks is a finding.
- Gaps the orchestrator carries to you: the author reports that it did not re-read `guidelines/coding.md` and the rest of `guidelines/testing.md` this round (it read them in earlier rounds, in the same session), and read `reports/review-fix-1-report.md` and `reports/review-fix-2-report.md` only in part. Read `guidelines/coding.md` yourself, whole, since the change is test code, and judge the diff against it.
- Trust boundary: **yes**; check crafted input at it. Irreversible operation: no. A new Critical or Important finding counts as one that remains; a Minor finding does not block and goes to the request's list. Grade and scope each finding as the method gives.
- Do not run `npm test`. Focused checks: `python -B .the-way/elements/common/foundation_check.py`, `python -B .the-way/instruction-files/check_instructions.py`, `python -B scripts/test.py tests/deploy/test_deploy_workflow.py`; Ruff exists at `.runs/quality-venv/Scripts/ruff.exe` (the orchestrator ran `ruff check` on the file: exit 0).

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

Your report to `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/review-correction-1-report.md`, its first line `PASS <sha>`, `FAIL <sha>` or `questions`; checks with command and exit code; reaches; **Unread material**; **Searches not found or unclear**; working copies.
