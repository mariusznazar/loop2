# Handoff to the one author — the fix of the review's findings (round 1)

You are the one author of this change, resumed for the fix. The person who requested this cycle has delegated every intermediate choice to the orchestrator; nothing you are told is that person's approval. Do not ask the human.

## Where you work

- Worktree: `the root of the task's worktree`, branch `task/skill-scen-pikselowych`. Reviewed head: `9459331b738617be566c11cfb40286d4de4cbd56`; your fix range starts there. Commit on this branch with explicit paths only, in English, in the form of the history.
- Your directory for working copies: `.runs/author/` (the one you had). Your fix report: `docs/task-cycles/skill-scen-pikselowych/reports/fix-1-report.md`.

## Method and variant

Read `.the-way/task-cycle/change/SKILL.md` again as far as the variant "the fix of a review's findings" requires, and follow it. Fix the findings in `reports/review-whole-findings.md` (the file in `docs/task-cycles/skill-scen-pikselowych/reports/`): three blocking findings, I1–I3, and nine Minor findings within the task, M1–M9, all in the reviewer's words. The review's report, `reports/review-whole-report.md`, holds the evidence; read the parts a finding cites. The Minor finding O1 outside the task is not fixed.

## Rulings of the orchestrator

- **I1** (flash units): fix it so that a count of frame pixels is never set beside a threshold of screen pixels. The reviewer names two ways: scale the field and the threshold by the ratio of the frame's width to the page's `window.innerWidth` (the skill already has the reader compute that ratio for the scene's rectangle), or stop printing the comparison and say in `SKILL.md` that the counts are in frame pixels. Choose the one you can test; name the other as rejected, with its cost. A test must read the line of the busiest field and the line "against the first frame" (M5), and must show the field and the threshold change with the scale.
- **I2** (colour sample from a frame): state in `SKILL.md`, where the advice stands, that a frame of `loop2-play` is scaled down and lossy and that its pixel is an approximation for a broad area; for a sample at a thin prop the skill points to the file of the sprite or to a full-size screenshot. Put the limit of the JPEG reader where a reader of a frame needs it.
- **I3** (test name and comment): the expected values stay; rename the test and rewrite its comment so that they name no source outside the foundation (D-82), saying only what is measured.
- **M4**: name D-415 in `SKILL.md` where the skill states its content, so that one text binds; keep the skill's wording short.
- **M6**: say in `SKILL.md` how to turn the game's place of a frame (its cell) into the place the preview takes (the box of its visible pixels), with the offsets taken from `sheet-frames.mjs measure`; a test or an existing test's extension shows the instruction works if you can make one without copying the script's output into an expectation.
- **M8**: attribute the field and the threshold to D-317's source as the reviewer says (WCAG 2.3.1, kept by D-42), in the output and in `SKILL.md`.
- **M9**: correct the wording of the *Verification* of D-415 so that it does not turn on itself; keep the entry's meaning (rows' meanings are not to change). Run `python -B .the-way/elements/common/foundation_check.py` after.
- **M1, M2, M3, M5, M7**: fix each as the reviewer describes; M2 and M3 refuse the malformed input with an `error:` line and exit 1, with a test for each.
- Both copies of the skill stay byte-identical; run the affected tests and the checks of your own work again; the full gate is the orchestrator's.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## What you return

Status, commits, a one-line check result and the report path; the report names, for each finding, what you changed (file and place) and the check that shows it, any finding you hold wrong with your evidence, and the sections **Unread material** and **Searches not found or unclear** (each `none` or the items) and your own-work check.
