# Handoff to the reviewer — the review of correction 1

You are the reviewer of the whole change, resumed to review a correction the author made for the human's remarks on the open request. The person who requested the cycle has delegated every intermediate choice to the orchestrator; nothing you are told is that person's approval. Do not ask the human.

## Where you work

- The root of the task's worktree, branch `task/skill-scen-pikselowych`. Range: base `9dd26b22354a79f18bc5a30a07ee6a8adc05e699` (the head the request had), head `7095f804`; compute `git diff 9dd26b22..7095f804` and `git log 9dd26b22..7095f804` yourself and confirm `git rev-parse HEAD`. One commit, `7095f804`, three files: `SKILL.md` of both copies and `tests/agent_workflow/test_scene_art_contrast.py`.
- Your directory for working copies: `.runs/review-whole/`. Your report: `docs/task-cycles/skill-scen-pikselowych/reports/review-correction-1-report.md`; first line `PASS <sha>` or `FAIL <sha>`. Read-only toward the repository.

## Method

Read `.the-way/task-cycle/review/SKILL.md` and its `fix.md` again as far as the review of a correction for the human's remarks needs, and follow them. In place of a findings file, the remarks bind: `reports/correction-1-remarks.md` in `docs/task-cycles/skill-scen-pikselowych/reports/` (word for word, three items; item 3 is let through, no change). The author's report is `reports/correction-1-fix-report.md`: claims to verify. The frozen task, `docs/task-cycles/skill-scen-pikselowych/task.md`, stays the source for fidelity.

## What to judge

- Remark 1: the author ran `flashes.mjs` on a real recording of the running game and found the frames behave as `SKILL.md` assumes (800 × 450 px for a 1280 × 720 window, ratio 0.625), so no code changed; the text of the Flashes section was sharpened. Judge whether the evidence in the report supports "behaves as assumed" (both the real recording and the overlay of a known size with its count against the expected number), whether the sharpened text is true to it and to the code of `flashes.mjs`, and whether anything in the skill still contradicts the real frames. The recording's own frames are not in the repository, and should not be.
- Remark 2: the new paragraph on the full-size screenshot in check 2 of `SKILL.md`: whether every command and option it gives exists and works as written (run the commands you can on files of your own, such as a PNG you build), whether the rule on a scene picture pixel being a 2 × 2 block of the screen (`round(left) + 2*sx`, `round(top) + 2*sy`) agrees with D-349's size of the scene (672 × 304 px, twice its picture) and with where the code of the game places the scene, and the new test: its expected values must come from the foundation or from an independent source, never from the output of the script under test (`guidelines/testing.md`, *Where the expected value comes from*), and its name and comment name no source outside the foundation (D-82).
- That the two copies of the skill are byte-identical and no tracked file names a place outside the repository (D-362).
- A new Critical or Important finding, or a remark not fulfilled, makes the review `FAIL`; a Minor finding does not block and goes to the list of Minor findings with `file:line`.

## Checks

Focused only; no full `npm test`. Every check carries its command and exit code.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## What you return

The status line, graded findings with `file:line`, the checks with commands and exit codes, your reaches, **Unread material** and **Searches not found or unclear** (each `none` or the items), working copies.
