# Handoff — correction 1 for the human's remarks, task `ekran-wiedzy`

You are the one author, resumed, and you make a correction for the human's remarks with `make-change`, variant **"a correction for the human's remarks"** (`.the-way/task-cycle/change/SKILL.md`; read the row of that variant, and `.the-way/task-cycle/skill/foundation_step.md` because the correction changes a field of a foundation entry). The remarks bind. They came as a comment of the human's account on the open request, written in the name of the human by the adviser of the day; the orchestrator took them as the human's decision.

- Worktree: `the root of the task's worktree`, branch `task/ekran-wiedzy`, head `47f446e063c3b3e90473f61ab69c3c3204f0477e` (the request's last head; its tree equals the tree the gate ran on, `45a7caf4`). Your correction range starts there. Your directory for working copies: `.runs/author-correction-1/`.
- The remarks, word for word: `reports/correction-1-remarks.md` (full path `docs/task-cycles/ekran-wiedzy/reports/correction-1-remarks.md`). Read it whole.
- Your report: `docs/task-cycles/ekran-wiedzy/reports/correction-1-report.md`.

## What the remarks ask of you

Only **item 1**: add „Wiedza” to the list in the *Verification* of the decision D-280 (`foundations/decisions.md`) that now reads "the game opening the screens Siedziba, Postać, Mapy, Programy and Przejście at their addresses". The wording you proposed in your fix-1 report was "Siedziba, Postać, Mapy, Programy, Wiedza and Przejście" in that one phrase; use it unless the entry's own order or form says otherwise. The remark overrides the task's instruction to leave that part of the entry as it is; nothing else in D-280 or any other entry changes. Check the rest of that *Verification* and its test citations still agree with what the tests open (the test of a reload at each of the eight addresses is in `tests/view/account-screen.test.mjs`).

Items 2 and 3 of the remarks are **let through**: do not touch the number of binding sentences in D-416's first paragraph, and do not read or change anything for the decisions about the scene. Items 4–10 are accepted as they stand; change none of what they describe.

In your report give the old and the new phrase (for the request's description), say the entry's change is the human's decision and so marked (`the cycle's` — the entry change comes from a remark, not from the task), and record each check with command and exit code.

## Boundary

One commit by explicit paths, English message in the style of `45a7caf4`; no push; no full gate (`npm test` without a file) — the orchestrator runs it on the corrected tree after the review. Run the affected checks again: `python -B .the-way/elements/common/foundation_check.py` (test citations included) and `python -B .the-way/instruction-files/check_instructions.py`, each with its exit code. Do not touch the record `.runs/task-cycles/` besides your report.

## Working copies (word for word from the cycle's skill)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Return

The full report with its **Unread material** and **Searches not found or unclear** sections (`none` is an answer), the correction with the check that shows it, the commit, and your working copies.
