# Handoff to the one author — the return step again, after correction 1

You are the one author of this change, resumed to repeat the return step for what correction 1 touched. The person who requested the cycle has delegated every intermediate choice to the orchestrator; nothing you are told is that person's approval. Do not ask the human.

## Where you work

- The root of the task's worktree, branch `task/skill-scen-pikselowych`. Correction 1 is reviewed: `PASS 7095f804` (`reports/review-correction-1-report.md` in `docs/task-cycles/skill-scen-pikselowych/reports/`). Your range for this step starts at `7095f804`. Commit, if anything no longer matches, with explicit paths only, in English.
- Your directory for working copies: `.runs/author/`. Your report: `docs/task-cycles/skill-scen-pikselowych/reports/correction-1-return-step-report.md`.

## Method

Read `.the-way/task-cycle/skill/return_step.md` and `.the-way/task-cycle/skill/foundation_step.md` again and follow them, for what the correction touched only. Your earlier return step (`reports/return-step-report.md`) stands for the rest.

## What the correction changed

Commit `7095f804`: `SKILL.md` of both copies of `loop2-scene-art` — the Flashes section (the real size of the frames of a window 1280 × 720, the region in whole pixels, the `playwright-cli eval` command for the page's numbers) and check 2 (how to take a full-size screenshot for a colour sample under the tint, the rule that a scene picture pixel is a block of 2 × 2 pixels of the screen) — and one test in `tests/agent_workflow/test_scene_art_contrast.py`. No script, no entry of the foundation and no part of the map changed.

Compare with the code the entries that name the measure of flashes, the colour of an effect or the size of the scene on the screen (D-415, D-317, D-349, D-271, D-42 and the entries your earlier search found), and the part map of `agent-workflow`; correct in the same change whatever no longer matches. The reviewer's two Minor findings of the correction (N1, N2 in its report) are not fixed in this change; do not change the skill for them.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## What you return

Status, commits (or `none`), a one-line check result and the report path, in the form of the earlier return step's report: the foundation compared with the code, decisions, invariants, environment facts, glossary terms, part-map changes written or changed, and **Unread material** and **Searches not found or unclear** (each `none` or the items), working copies. If you commit, run the foundation check and report its exit code.
