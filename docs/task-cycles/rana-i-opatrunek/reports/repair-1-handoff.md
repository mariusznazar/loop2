# Handoff — the repair of eight stale quotation lines (task rana-i-opatrunek)

You make a small repair as an agent of the type `the-way-stage`, variant of `make-change`: **the fix of a review's findings** in form (read `.the-way/task-cycle/change/fix.md` and `.the-way/task-cycle/change/SKILL.md` sections 3 and 6), but there is no review finding: the orchestrator found by running `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` at the head `6955a494899b6c0b9c943823d2fd6a3cc74c2ed7` that Slices 8 and 9 left eight `decision:` quotation lines that the check refuses.

- Worktree `the worktree's root` (branch `task/rana-i-opatrunek`), head as above. Commit by path, in English, no push. Your directory for working copies: `.runs/repair-1/`. Report: `.runs/task-cycles/rana-i-opatrunek/reports/repair-1-report.md` (the file is the input of the cycle's scripts); the cycle record and other files of the record directory are not yours.
- The eight lines, as the check prints them:
  - `tests/view/character-skills.test.mjs:171` and `:234` — the quotation does not begin a sentence of `D-199`
  - `tests/view/pressure-pick.test.mjs:68` — the quotation stands in no binding sentence of `D-290`
  - `tests/view/pressure-pick.test.mjs:81` and `:104` — stands in no binding sentence of `D-363`; `:93` — does not begin a sentence of `D-363`
  - `tests/view/pressure-pick.test.mjs:112` — does not begin a sentence of `D-293`
  - `tests/view/pressure-pick.test.mjs:121` — does not begin a sentence of `D-289`
- Change **only the quotation of each such line** (the text after the decision number in the line `decision: D-… "…"`) so that it begins one of the binding sentences of that decision as it stands in `foundations/decisions.md` (find each decision by its heading `### D-<n> —`; read it whole; the binding sentences are the first part of the entry, before its *Scope*). Where a quotation is long, quote from the opening of the sentence through the words the test holds, as the earlier repairs in `tests/sim/body.test.mjs` and `tests/sim/tending.test.mjs` do (look at them with `git show 17a80c09`). Change no assertion, no test body, no other line. If a line's quotation names a decision whose sentence says something other than what the test holds, report that instead of bending the quotation (a test must not cite a sentence it does not hold).
- Check: `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` must exit 0 afterwards; run `npm test -- tests/view/character-skills.test.mjs` and `npm test -- tests/view/pressure-pick.test.mjs` (exit 0) and `python -B .the-way/instruction-files/check_instructions.py`. Never run the whole suite.
- Report: the commit, each line with its old and new quotation, each check as command and exit code, **Unread material** and **Searches not found or unclear** (each `none` where none), working copies.

## Working copies (word for word)

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

