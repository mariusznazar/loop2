# Handoff — the return step (the one author, resumed)

You are the one author, resumed for the return step (step 11 of `implement-task`). Same worktree (`the task's worktree`, branch `task/mapa-czesci-z-przegladu-fundamentu`), same pinned the-way. The reviews of the change and of its fix passed: the whole change after the fix, head `d5932fc5b68c99fdc9a6b45cc23a812b04720d51`, range from the base `ea6383975cb72e875d215dfc23c171cafb838207`.

Read whole: `.the-way/task-cycle/skill/return_step.md` and, as it says it writes as the foundation step writes, `.the-way/task-cycle/skill/foundation_step.md`; read the `SKILL.md` of an element, at the path `foundation_step.md` gives, when you write an entry of that element. Your method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), which names the return step. Your directory for working copies: `.runs/author/` (again). Report: `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/return-step-report.md`, with the fields of the record's *Return step* (copy their names), **Unread material**, **Searches not found or unclear**, each check with command and exit code, your working copies.

## What the step compares

The entries the change wrote or changed — the invariants `page-address-fragment` and `deploy-workflow-input`, the part-map entries of `browser-view`, `deployment`, `agent-workflow`, `account-server` and `build-tools`, the table of trust boundaries in `guidelines/testing.md` — those the task names (its *Decisions in play*: D-281, D-210, D-32, D-46, D-09, D-10, D-11, D-351) and those your search of the foundation found, each with the code at the head. Correct whatever no longer matches, in the same change.

Points that I know and that you decide, within the rules of the step:

1. You wrote in your report that D-09 and D-281 could name the new invariants in their *Verification*. Decide by the step's rule: a decision's *Verification* is changed through `record-decision` only where the entry the change wrote needs it so that nothing stays false or unlinked; a link a rule does not require is **no entry this request writes, and no entry is deferred**: it is neither proposed nor listed for later. Say in the report which it is, with the rule you applied.
2. The environment facts: write as a fact only a source outside the product that an entry the change writes rests on and the foundation does not hold. After the fix `deploy-workflow-input` has `Rests on: none`; say whether any entry now rests on a source that the foundation lacks (the substitution of `${{ }}` in a workflow, the runner's SSH), or none does.
3. The glossary: a word the entries use in a meaning for which WAY-95 gives it an entry (the reviewer read no such word; check "fragment", "token", "emailed link", "refusal").
4. Rows of *Settlements to record*: rows 1 and 2 are written as the invariants `page-address-fragment` and `deploy-workflow-input`; say it in the field of the record.
5. The orchestrator's recorded choices bind: M-4 not split (task mandates one invariant per row); the wording of the fix (M-1, M-2, M-3, M-7); do not reopen them.
6. The Minor findings of the review of the fix (N-1: the test does not read `-o` bundled behind another short flag, such as `ssh -4o "StrictHostKeyChecking no"`, while the row of `guidelines/testing.md` says it covers every form `ssh` accepts; N-2: the test takes the first `ssh` text of the file, so a decoy `echo ssh …` line placed before the real call passes; N-3: the case also fails on a broken `BatchMode`) are **not fixed in this cycle**: the review findings of the request are no foundation entries. Do not change the test for them; but the row of the table must not say more than the test checks — if, comparing the row with the code, you find a sentence that claims a form the test does not read (N-1), correct the row's words to what the test checks, since the step corrects what no longer matches. Say in the report what you changed for it, or that you changed nothing.

No full gate (`npm test`). Focused checks: `python -B .the-way/elements/common/foundation_check.py` (no switch), `python -B .the-way/instruction-files/check_instructions.py`, and any test file you touch. Commit by path, English messages. Where you commit nothing, say so: the return step then has no range to review.

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

Status, your commits (the range from `d5932fc5`, or none), one line naming each check that failed or did not run, the report path, questions, reaches, **Unread material**, **Searches not found or unclear**.
