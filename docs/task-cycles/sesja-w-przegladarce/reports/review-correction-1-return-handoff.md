# Handoff to the reviewer of the return step of correction 1

You review the range of the return step of correction 1 as an agent that did not make it and did not review the cycle before. Your method is `.the-way/task-cycle/review/SKILL.md` (`review-change`); read it whole, and a file it names only when the step that names it comes. Variant: "a later change to an open request" (the range of the return step). You are read-only: first line of your report `PASS <sha>` or `FAIL <sha>`, graded findings, the checks you ran. You do not run the full gate (the orchestrator's); focused checks are yours to run. The strongest model allowed in this cycle is `opus`.

Worktree (work from its root): `the worktree root`, branch `task/sesja-w-przegladarce`. Range: `1ce0195a..255e41be` (one commit, `guidelines/styleguide-browser-view.md` +13). Your directory for working copies: `.runs/review-correction-1-return/`. Report: `reports/review-correction-1-return-report.md`.

Inputs:
- The frozen task `.runs/task-cycles/sesja-w-przegladarce/task.md` and the human's remarks of correction 1, word for word, `reports/correction-1-remarks.md` (binding; only item 2 concerns code and rules: "The menu bar stays in sight when a run screen opens: moving the keyboard focus to the screen must not scroll the page.").
- The correction's code: commit `1ce0195a` (`src/browser/view/screen-registry.ts`, `src/browser/view/run-entry.ts`), reviewed `PASS` in `reports/review-correction-1-report.md`; the author's report `reports/correction-1-report.md`.
- The report of the return step you review: `reports/correction-1-return-step-report.md` (and the first return step's `reports/return-step-report.md` for what was compared before). The method of the return step: `.the-way/task-cycle/skill/return_step.md` — read it, since you judge the range against it: it compares the entries the change writes or changes, those the task names and those the search of the foundation found, with the code, writes a rule that binds after the merge where the foundation step would, and writes an invariant only for a rule the task, a decision or the human sets.
- The styleguide template and rules for a guidelines rule: `.the-way/product-guidelines/template.md` (what a rule holds: *Decision*, *Invariant*, *Good*, *Bad*, the binding sentence and its reason; what stays out of a rule), and the product's `guidelines/styleguide-browser-view.md` whole (it is the file changed).

Check (against the task and the entries the return step writes or corrects):
1. The new rule "The menu bar stays in sight when the screen of a map run opens" says what the human's remark says and no wider; its *Good* and *Bad* lines hold the rule's template; its reason is one sentence the template requires; it keeps today's state of the product out of the rule; its place right after "Focus does not fall to the page" fits.
2. It does not contradict a neighbouring rule or a decision (D-370 and the end window; D-371; the rule on focus; D-408 and D-407 on focus and the registry) — read what you need whole.
3. The return step's claim that no entry went stale: do the decisions and the styleguide still match the code at `1ce0195a`? In particular any sentence that says a screen takes the focus and is scrolled into view, or that the page is left where it is, or an example that the correction makes false. Search yourself (focus, scroll, przewij, scrollTop, preventScroll).
4. The choice to write a styleguide rule (decision "none") and no decision and no invariant: right by `return_step.md` and the templates? The invariants file: should the human's remark have set an invariant (a rule the human sets)? Judge by `return_step.md`.
5. The foundation check: run `python -B .the-way/elements/common/foundation_check.py` (command and exit code in your report), and the tests that read the styleguide file if any (search `tests/`).

Grades as `review-change` gives. A rule with *Decision* `none` that the cycle found itself is named in the request's description for the human to accept (the orchestrator's job, not yours).

## First paragraph of "Working copies" of the cycle, word for word

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
