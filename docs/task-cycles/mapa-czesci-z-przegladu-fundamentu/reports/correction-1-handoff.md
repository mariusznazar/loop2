# Handoff — correction 1 for the human's remarks (the one author, resumed)

You are the one author, resumed for a correction after the human's remarks on the open request (pull request 149). Same worktree (the task's worktree: your working directory, branch `task/mapa-czesci-z-przegladu-fundamentu`, the head of the request is `6bc246ab3661041de61ef340317b8b157bdd9291`; its code is the tree of `e117eccc`), same pinned the-way (`.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`). Your method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant **"a correction for the human's remarks"**. Your directory for working copies: `.runs/author/`. Report: `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/correction-1-report.md`, in the form your method gives, with **Unread material**, **Searches not found or unclear**, each check with command and exit code, your own-work check, your working copies. No full gate (`npm test`), commit by path, English messages, nothing uncommitted left. The correction's range runs from `6bc246ab`.

## The remarks (they bind)

`.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/correction-1-remarks.md`, which holds the human's comment word for word. Read it whole. In short, and as the orchestrator's reading of it:

1. **The comment case, fixed in this request.** The test `test_sha_reaches_the_script_only_through_env` (marked `invariant: deploy-workflow-input`) reads the lines the helper `code_lines()` gives, which cut everything after ` #`; GitHub fills in `${{ … }}` in the text of a script before the shell sees any comment, so an outside value written after a comment mark on a line of a script passes. Make the case read the lines of a script **whole** (a line of the `run:` value and every line under it, without cutting a comment), so a green run does not let such a value through. Do not change what `code_lines()` gives to the other cases of the file unless every one of them is shown to need it; read script lines whole for this case only. Where the honest `deploy.yml` holds an expression in a comment inside its script (it should not), say so in the report and return it as a question rather than weaken the case.
2. **Add a mutation case for it** (the orchestrator's reading, recorded as choice Q15): a permanent case of `tests/deploy/test_deploy_workflow.py` that feeds the same checking logic the real workflow text mutated by one expression written after a comment mark on a script line (` # ${{ secrets.DEPLOY_HOST }}` after a command, and a line that is only a comment inside the script block), and asserts that the logic refuses it — which asks the check to be a function of the text that the real case and the new case both call. Show the new case failing on the logic before your fix and passing after (commands and exit codes in the report). Mark it `invariant: deploy-workflow-input` only if it checks the rule of that invariant directly, and say what you did and why.
3. **The smaller crafted ways: do not extend the test.** A decoy line before the real server call, an option written behind another short flag, a script line that starts with the word the test looks for, a step written as an inline mapping (and a quoted key, which the review of the fix of the return step also named): make the row of the table of trust boundaries in `guidelines/testing.md` for `.github/workflows/deploy.yml` **say plainly which of these forms its cases do not read**, so the row no longer overstates and the reviewer of a later change knows to read them by hand. Check each form against the test as it stands after item 1 (read `reports/review-fix-2-report.md` and `reports/review-fix-1-report.md`, which name them with evidence in their `*-evidence/` folders), so that the row says only what is true.
4. **Item 2 of the human's remarks: the one sentence.** The row for the host-key test says "call" where the test takes the first place in the file where the word `ssh` and a space appear (with lines continued by a backslash joined); make the row say what the test actually takes. Do this in the same edit of the row.
5. **Let through, no change:** M-4, m-2, m-3, n-3, N-3 — do not touch them. Items 3 to 8 of the description are accepted; they ask for nothing.

The rows must hold in Polish in the language of their neighbours; code and comments in English.

## What you read

The files you read for the earlier rounds still stand; in particular `tests/deploy/test_deploy_workflow.py` and `.github/workflows/deploy.yml`, `guidelines/testing.md` (whole, because the row you edit lies in it and the rule of its `### Trust boundaries` binds it), `guidelines/coding.md` (whole, because you change test code), the invariant `deploy-workflow-input` in `foundations/invariants.md`. Reaches beyond are named in your report.

Trust boundary: yes — the change keeps its answer: it touches the test and the row of a trust boundary; check crafted input at it. Irreversible operation: no.

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

Status, your commits (the range from `6bc246ab`), one line naming each check that failed or did not run, the report path, questions, reaches, **Unread material**, **Searches not found or unclear**.
