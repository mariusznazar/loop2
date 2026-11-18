# Handoff — the fix of the review's findings (stage `fix`, the one author resumed)

## Delegation and place

Same delegation, worktree and branch as in `reports/author-handoff.md`; you are the same author, resumed on the same branch. Method: `.the-way/task-cycle/change/SKILL.md`, variant "the fix of a review's findings". Your directory for working copies: `.runs/author-fix/`. Your report: `.runs/task-cycles/testy-padajace-losowo/reports/fix-report.md`. Commit with `git add <path>…` only; no push.

## The findings

The findings file: `reports/whole-review-findings.md` (in `.runs/task-cycles/testy-padajace-losowo/`), cut word for word from the review of the whole change (`reports/review-whole-report.md`, which ended `FAIL 4cf96da13b44240d6f9460409068d6887b4fa783`). Three blocking findings (I-1, I-2, I-3) and six Minor findings within the task (M-1 to M-6). Fix all nine in this one round; there is one fix and one review of it, no second round. The fix's range starts at the reviewed head `4cf96da1`.

You answer with evidence a finding you hold wrong; do not weaken a check to make one go away.

## The orchestrator's rulings where a finding offers a choice

- **I-1:** add the qualification to the sentence of `guidelines/testing.md`, in the reviewer's words or near them („bez związku ze zmianą kodu i bez ustalonej przyczyny”); do not change D-432. The sentence stays one sentence, as point 5 of the task asks, and still names the register file. **M-6** goes with it: give the sentence a rule of its own in the chapter list of `guidelines/testing.md` (e.g. `### Register of flaky tests`, *Decision* D-432, with the *Good*/*Bad* lines the format of a rule in that file asks), and restore the rule *Flaky tests* to its template form (*Decision* D-73 alone, its own text as it was at the base `659b1e02`). Read `.the-way/product-guidelines/testing/template.md` lines 222-227 as the reviewer cites it. If the check of the guidelines' format or the foundation check requires something of a new rule (for instance a *Where in code* line or a count), do it and say so.
- **I-2:** name entry b's five conditions, quoted from executor 19's report as entry a quotes executor 18's: `git show 28ab60c9:docs/task-cycles/luki-w-testach-z-przegladu/reports/executor-19-report.md` (the table "Every attempt"). Use the reviewer's wording of them if it matches the report, and check it against the report yourself before writing it. Check entry c the same way against executor 20's report for the same kind of gap, and report what you found.
- **I-3:** option (a): drop the comment `# The break: …` and let the code carry the reason, by a named value for the limit of the "logs *" variant whose name says it leaves the quick `inspect` calls time to answer, beside the 1 s of the "inspect *" variant. No `# The break:` label on a fault the case does not catch. Keep the test's `decision:` line and the neighbours' conventions; the change stays within the size rules (D-425) and Prettier/Ruff style as the file already holds. Re-run the case alone and the mutation (the "logs *" limit raised so that the hang is not cut must still fail); you need not repeat the load series, since the limit's value stays 5 s.
- **M-1 to M-5:** apply the reviewer's fix of each as it stands, checking each fact against its source before you write it (for M-1 read the line in `tests/account-api.test.mjs` yourself; for M-3 the executor 18 report).

## Checks

Run again the checks the fix affects (the changed case alone and its mutation, `npm test -- tests/deploy/test_loop2_watch.py` is not required again unless you change more than the lines named, `python -B .the-way/elements/common/foundation_check.py`, `python -B .the-way/instruction-files/check_instructions.py`), each with command and exit code. Do not run the full gate (`npm test` without arguments); it is the orchestrator's.

## Working copies (word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Report

As in the first handoff: status, commits, one-line check result, the own-work check, **Unread material**, **Searches not found or unclear**, and for each finding what you did (fixed, with where, or held wrong, with evidence).
