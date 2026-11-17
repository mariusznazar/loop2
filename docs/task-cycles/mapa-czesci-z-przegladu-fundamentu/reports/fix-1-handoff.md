# Handoff — the fix of the review's findings (the one author, resumed)

You are the one author, resumed for the one fix of the findings of the review of the whole change. Same worktree (`the task's worktree`, branch `task/mapa-czesci-z-przegladu-fundamentu`), same pinned the-way. Your method: `.the-way/task-cycle/change/SKILL.md`, variant **"the fix of a review's findings"**. Your directory for working copies: `.runs/author/` (again; the earlier one is removed). Report: `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/fix-1-report.md`, in the form your method gives, with **Unread material**, **Searches not found or unclear**, each check with command and exit code, and your working copies. The same limits as before: no full gate (`npm test`), commit by path, English commit messages, nothing uncommitted left.

## The findings

`reports/fix-1-findings.md` (cut word for word from the reviewer's report `reports/review-whole-report.md`, `FAIL abd32bab`): one blocking finding, I-1 (Important), and the Minor findings M-1 to M-7, all within the task. The range of your fix runs from the reviewed head `abd32babdc7c3d68f6da53d444d1a65663208cfd`. The review of the fix reads that range once.

## My answers where a finding leaves a choice (autonomous choices of the orchestrator, recorded; the human accepts the entries at the merge)

- **I-1:** do what the finding gives as the fix within the task. Make `test_ssh_is_strict_and_batch` read the options of the one `ssh` call and take the **first** value of each option in every form `ssh` accepts (`-o K=V`, `-o "K V"`, `-oK=V`), as `tests/deploy/test_loop2_backup.py:190-195` does for the backup script; assert the first value of `StrictHostKeyChecking` is `yes`. Show it failing on the break R1 of the review (`-o "StrictHostKeyChecking no"` before the existing option on the `ssh` call), and on R3 (the option moved off the call into an `echo`); the evidence scripts of the review are in `reports/review-whole-evidence/` (`mutate_deploy.py`, `results_deploy.json`) — read them, run your own mutations under `.runs/author/`, report command and exit code of each failing and each passing run. Then the row of `guidelines/testing.md` says what the test now checks, no more. Whether the test also asserts `BatchMode` follows M-1 below.
- **M-1:** drop "and batch mode" from the sentence of `deploy-workflow-input`; row 2 settles only that the SSH connection checks the server's key. Keep the clause "on its command line" if the test checks it. The test may keep its assertion about `BatchMode` as it was before this change (it is not the rule of the invariant any more; the row of the table then names it apart from the invariant's rule or leaves it out, your judgment, said in the report).
- **M-2:** drop "of that step" from the sentence (a secret at the workflow-level `env:` is still an environment variable reaching the script; row 2 does not carry the step). Do not change the test for it.
- **M-3:** the *Rests on* of `deploy-workflow-input` becomes `none`, as the finding gives. If, after M-1, the two OpenSSH facts are left with nothing resting on them, say so in the report (the foundation check will show it); the facts are also used by D-238's invariant, check it.
- **M-4:** the task mandates one invariant for each row of *Settlements to record*; do not split the entries. Answer it in your report as a finding the task mandates, with that evidence.
- **M-5:** add D-224 to the *Decision* list of `### Trust boundaries` in `guidelines/testing.md`.
- **M-6:** name the two cases `tests/view/account-screen.test.mjs:1632` and `:6502` in the row of `password-reset.ts`, as proof of the step from the fragment into the form's request. Do not mark them (item 1 limits the marks to the three test files). Read the two cases to name them exactly and say what each proves.
- **M-7:** reword "into the body of its own one request" as the finding gives, "into the body of the request of its own link"; the meaning of row 1 stays: the one kind of request the token belongs to. The request will name the rewording for the human.

Make every consequence of the wordings follow in the places that cite them (the invariant's text, the row of the table, markers, `Derives from`), and run the foundation check without the switch after the last commit (`python -B .the-way/elements/common/foundation_check.py`), the instruction check (`python -B .the-way/instruction-files/check_instructions.py`), the test file `tests/deploy/test_deploy_workflow.py` with `python -B scripts/test.py <file>` and `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` as before. The Python lint of the test file you change: Ruff is not installed on this computer, say so in the report as a check not run.

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

Status, your commits (the range from `abd32bab`), one line naming each check that failed or did not run, the report path, questions, reaches, **Unread material**, **Searches not found or unclear**.
