# Handoff to the one author — correction 1 after the human's remarks on the request

You are the one author of this change, resumed for a correction. The remarks of the human, word for word, are in `reports/correction-1-remarks.md` (in `docs/task-cycles/skill-scen-pikselowych/reports/`). They bind; read them whole. The person who requested the cycle has delegated every intermediate choice to the orchestrator; nothing you are told is that person's approval. Do not ask the human.

## Where you work

- Worktree: the root of the task's worktree (the same one you worked in), branch `task/skill-scen-pikselowych`; the request is https://github.com/mariusznazar/loop2/pull/142. Start of the correction: head `9dd26b22354a79f18bc5a30a07ee6a8adc05e699` (its tree is the tree of `af282831`, the gate's). `origin/main` is `e125db89`, already in the branch; nothing was merged. `.the-way` is at the pinned `bfb2e109`.
- Your directory for working copies: `.runs/author/`. Your report: `docs/task-cycles/skill-scen-pikselowych/reports/correction-1-fix-report.md`.
- Commit with explicit paths only, in English, in the form of the history.

## Method

Read `.the-way/task-cycle/change/SKILL.md` again as far as the variant "a correction for the human's remarks" requires, and follow it. The remarks bind; where you hold a remark wrong, say so in the report with your evidence rather than skip it.

## What the remarks ask (the orchestrator's reading; the file is the source)

1. **Run the measure of flashes on a real recording of the running game** and check that the ratio of the frame's width to the page's width behaves as `SKILL.md` assumes; correct the skill or the script if it does not. This runs the check that was left out (item 4 of the request): on the corrected tree, with its result in your report.
   - Start the game and take the recording as `.claude/skills/loop2-play/SKILL.md` gives (`npm run local`, Playwright CLI from the worktree root, the stream of frames, `save-frames.mjs`): read that skill whole first. A check made so touches neither the test server nor a player's save.
   - Do two things, each with its command and exit code in the report: (a) take a real recording of the scene of a map run and run `flashes.mjs` on it, with `--scale` taken the way `SKILL.md` tells the reader; state the size of the frames you got, the page's width (`window.innerWidth`) and the ratio, and whether the frames are shrunk as `SKILL.md` and `flashes.mjs` say (the reviewer found at most 800 px in the code of the installed Playwright; confirm it on a real frame); (b) take a recording in which the page itself shows a flash of a known size — for example, by the page's own `eval`, an overlay of a known size in CSS pixels turned from black to white between frames — and check that `flashes.mjs` with the scale the skill gives counts about the expected number of pixels of the *screen* (the overlay's area in CSS pixels, the pixels the browser draws for it), so that the unit of the measure is shown on real frames and not only on made-up ones. The overlay and everything of this check stay in `.runs/author/` and are removed; nothing of the check is committed except what the skill or a script must change.
   - If the recording behaves as the skill assumes, the correction changes no code for this item: say so in the report with the numbers, and name any statement of the skill that the real frames made you sharpen (a real frame size, the way to read `innerWidth`). If it does not, correct `flashes.mjs` and `SKILL.md` and their tests so that they agree with the real frames, and show the check again on the corrected tree.
   - Playwright MCP wrote a screenshot into the main checkout earlier; use the CLI from the worktree root, and if a tool saves anything outside `.runs/author/`, move it in and remove the original and any empty directory it made.
2. **Fix the item on the full-size screenshot**: `SKILL.md` sends the agent to "a full-size PNG screenshot" for a colour sample under the scene's tint but does not say how to take one. Add the paragraph that says how, from what you do in (a) and from `loop2-play`'s own text (the screenshot with Playwright CLI, where the file lands and how to feed it to `contrast.mjs` with `--ground` and `--prop`). The sample under the tint is a pixel of that screenshot, taken at the scale the page shows (note the page's pixel ratio and the scene's size on the screen, 672 × 304 px). Both copies of the skill stay byte-identical; a test of the skill that pins what its text names keeps passing and, where it can, covers the new paragraph's commands and options.
3. **Item 3 is let through**: no change.

Run again the checks of your own work for what you change (the affected `tests/agent_workflow` files through `npm test -- <file>`, `ruff check tests`, `prettier --check` on the scripts, the foundation check and the check of the instruction files). The full `npm test` is the orchestrator's.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

You also stop the game you started (`npm run local:stop`) and end the Playwright session before you return, and say so.

## What you return

Status, commits, a one-line check result and the report path. The report names, for each remark, what you did and its evidence (the commands with exit codes and the numbers of (a) and (b)), anything you hold wrong, **Unread material** and **Searches not found or unclear** (each `none` or the items), your own-work check and your working copies.
