# Handoff — fix 2 (the failure of the first gate run), cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything; a question goes to the orchestrator in your report with status `questions`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`, head `614f28f2` (take the full hash from `git log -1`). Your commits come after it.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **the fix of a failure of the gate**. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole; your variant, in the words of its row: "the fix of a review's findings" — read `.the-way/task-cycle/change/fix.md` for it. The findings: `reports/gate-failure-findings.md` (`.runs/task-cycles/drobne-bledy-ekranow/reports/gate-failure-findings.md`). You have no skill tool.
- The frozen task: `.runs/task-cycles/drobne-bledy-ekranow/task.md`; the plan: `.runs/task-cycles/drobne-bledy-ekranow/plan.md`; the reports of slices 8 and 9 and of fix 1 are in `reports/` (`slice-8-report.md`, `slice-9-report.md`, `fix-1-report.md`). Read the decisions D-306, D-350, D-294 and the decision that gives the end-of-run window's „Dodaj regułę z tym” (find it by searching `foundations/decisions.md` for that phrase) whole, and `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md` whole.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/fix-2-report.md`. Your directory for working copies: `.runs/fix-2/`.

## Working copies (first paragraph of the cycle's rule, word for word)

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

## What binds the fix

1. Fix the cause with the smallest change; keep what the change was asked to do: the panel follows its rule across groups (slice 8, task point 15), „✕” under a folded group gives the focus to its header (point 6), every new copy has every group unfolded (point 7). Do not undo one of them to make this test pass: where two requirements collide, say so in your report as a question.
2. Write the failing-first test only if the existing failing test does not already cover the cause; the failing test is the proof.
3. Checks you run (command and exit code each): the focused `npm.cmd test -- tests/view/end-window-game.test.mjs` (must exit 0), and the focused runs of every test file that touches the files you change (`tests/view/program-panel.test.mjs`, `tests/view/rule-editor.test.mjs`, `tests/view/program-editor.test.mjs`, `tests/view/run-screen.test.mjs`, and the test files of the other files you change); `npx eslint` on every changed `.ts`/`.tsx` file and `npx prettier --check` on every changed `.ts`/`.tsx`/`.mjs` file (exit 0); `python -B .the-way/elements/common/foundation_check.py` (exit 0). Run, as well, every other test file under `tests/view/` once, one by one or as a group of files, so that a second failure of the same cause would show now and not at the next gate run (do not run `npm test` with no file argument: the full gate is the orchestrator's alone and waits for the signal of the human's adviser).
4. Commit with explicit `git add <paths>`, messages in English in the style of the repository.

## Your report

As `make-change` gives it for a fix: status, your commits, the commit that introduced the failure (and how you found it), how the finding was fixed, each check with its command and exit code, the own-work check (the requirement most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material**, **Searches not found or unclear**, reaches beyond the handoff, and the line on working copies.
