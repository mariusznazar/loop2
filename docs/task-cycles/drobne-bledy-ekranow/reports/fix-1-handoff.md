# Handoff — fix 1 of the review of the whole change, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything; a question goes to the orchestrator in your report with status `questions`. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`, head `5b3dac418ed9d744c4e9854b068909b96944be57`. Your range for review is from this head; your commits come after it.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **the fix of a review's findings**. Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole; your variant, in the words of its row: "the fix of a review's findings" — read `.the-way/task-cycle/change/fix.md` for it. You have no skill tool.
- The findings file (the blocking findings first, then the Minor findings within the task, in the reviewers' words): `reports/review-whole-findings.md` (`.runs/task-cycles/drobne-bledy-ekranow/reports/review-whole-findings.md`). Fix every finding in it, and no finding it does not hold. The two reports it was cut from are `reports/review-whole-report.md` and `reports/review-docs-report.md`; read them only for the passages of the findings you need.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/fix-1-report.md`. Your directory for working copies: `.runs/fix-1/`.
- The frozen task: `.runs/task-cycles/drobne-bledy-ekranow/task.md`; the plan: `.runs/task-cycles/drobne-bledy-ekranow/plan.md`. The task binds where a finding is silent.

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

1. **Keep every fix as small as its finding asks.** A fix that grows beyond its findings draws a new serious finding.
2. **B1 / I-1 (the twelve `decision:` lines)** is one fault named twice: fix it once, then run `python -B .the-way/elements/common/foundation_check.py` and see `0 errors`. A `decision:` line quotes the start of a binding sentence of the decision, word for word, and the test must still hold what the sentence says (`guidelines/testing.md`, read it whole). Where the reviewer's replacement quotation is not the start of a sentence of the decision at the head, find the real one in `foundations/decisions.md`.
3. **Findings that change a decision or the styleguide (I-4, M-1, M-2, M-3, and the comment-only changes where they quote D-297)** are foundation changes: write them by following the pinned element skill as a file (`.the-way/elements/decisions/skill/SKILL.md`; `.the-way/task-cycle/skill/foundation_step.md` says how a writer does it), keeping every sentence's meaning as the task gives it. For I-4 and for M-2 (the unit in the examples), the unit comes from the data of conditions (`src/browser/sim/data/conditions.ts`); the examples that show a number of a condition without it get it. The orchestrator's earlier decision: the return step of the cycle also corrects such examples later; doing them now is fine, and where an example is a quotation of a test (`decision:`) the quotation stays word for word.
4. **I-2 (comments and test titles that state the old D-297)** are comments and test names only: change the words so they say what D-297 says now (the arrow is off only where no group stands before the rule's group, and for „↓” only where none stands after it; an empty group at the edge takes the rule); change no behaviour. A test title is part of a test: keep what the test checks.
5. **I-3 / M1 (the menu test)**: model the test so that it holds in a real browser: a click on a link of the bar leaves the focus on the clicked link (D-285). In the test document, which moves no focus on a click, put the focus on the link yourself before the click, as a browser does, and assert that the focus stays there after the menu closes.
6. **M2 (dead branches of `focusAfter`)**: narrow `focusAfter`, its type and `keysOf` to the one branch the list calls („remove”); keep the behaviour and its tests.
7. **M3 (test comments pointing to the task document)**: rewrite them to say what the test holds, without pointing to a document outside the foundation.
8. **M4 (key of the fire-cell spans; the class `hovered` of an unrevealed tile)**: use the safe key; remove the class `hovered` from an unrevealed tile only if no style or test reads it (search first) — and say what you found.
9. Each commit: explicit `git add <paths>`, messages in English in the style of the repository's commits. Separate commits for code, for tests and comments, and for the foundation files are welcome.
10. **Checks you run (command and exit code each):** `python -B .the-way/elements/common/foundation_check.py` (must exit 0 with `0 errors`), `python -B .the-way/instruction-files/check_instructions.py`, `npx eslint` on every changed `.ts`/`.tsx` file, `npx prettier --check` on every changed `.ts`/`.tsx`/`.mjs`/`.css` file (the two Markdown files were already unformatted at the base: leave their layout alone), and the focused `npm test -- <file>` of every test file you change (and `tests/view/rule-editor.test.mjs`, `tests/view/program-editor.test.mjs`, `tests/view/menu-bar.test.mjs`, `tests/view/program-panel.test.mjs`, `tests/view/login-card-focus.test.mjs`, `tests/view/game-saver.test.mjs`, `tests/view/shared-controls.test.mjs`, `tests/view/world-area.test.mjs`). **Never run the full suite** (`npm test` without a file): the full gate is the orchestrator's alone, and it waits for a signal of the human's adviser.
11. Answer with evidence a finding you hold wrong (as `fix.md` gives); do not skip one silently.

## Your report

As `make-change` gives it for a fix: status, your commits, each finding with how it was fixed (or why not, with evidence), each check with its command and exit code, the own-work check (the requirement of the findings most likely not met, the check that would catch it, its run and result), your questions and concerns, **Unread material**, **Searches not found or unclear**, reaches beyond the handoff, and the line on working copies.
