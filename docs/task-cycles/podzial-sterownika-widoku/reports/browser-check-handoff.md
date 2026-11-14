# Handoff — the check in a real browser (a correction's check; not a method of the-way)

## Who asks

The human's remarks of correction 1 (`reports/correction-1-remarks.md`, read it whole) ask the cycle to play four steps in a real browser, as a player, and write the result of each step into the description of the request. You make that check. You are an agent that did not make the change. You change no tracked file and make no commit: you observe and report. If a step shows a difference from the base, you report it with the evidence; the orchestrator has the author fix it.

## Where and how

- Worktree (the build to check, the head): `the root of the task's worktree`, branch `task/podzial-sterownika-widoku`, head `527d13b614ae54917e03b6f1f3efd5f616bf6458`. The base to compare with is commit `9e13af95af4fa77445eccfe3e50a28e00c2adaf0` (the target branch before the change).
- Read whole `.claude/skills/loop2-play/SKILL.md` of the worktree and follow it: `npm run local` over HTTPS as a background command, an account through the login card, Playwright CLI (`playwright-cli`, version 0.1.22 is installed) with Playwright MCP where the CLI fails, a stream of frames for motion, and "End the check". Run its commands in the root of the checkout you start the game from. Nothing of the check stays in the repository: no Playwright test, no frame, no snapshot, no screenshot; evidence goes into your report as text.
- For the base: make a working copy of the base in `.runs/browser-check/base` (`git worktree add --detach .runs/browser-check/base 9e13af95af4fa77445eccfe3e50a28e00c2adaf0`, then `git submodule update --init -- .the-way` is not needed for the game; `npm ci` in it, or a link of `node_modules` as the earlier agents did — remove the link first when you remove the copy, so the real `node_modules` stays intact), and start its game from there. Run the head and the base one after another, never side by side in one browser (they would share a session cookie).
- Your directory for working copies: `.runs/browser-check/`. Report: `.runs/task-cycles/podzial-sterownika-widoku/reports/browser-check-report.md`.

Working copies (copied word for word from the cycle's skill):

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
> clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
> directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
> in the system's temporary directory, in the scratch directory of a session or in the main checkout
> of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
> itself under its session's directory is moved into the agent's directory and the original removed.
> The files that a product's own tools and tests make by themselves are no working copy of the agent
> and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a
> worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside
> its report what the report needs, and states in the report where each copy stood and that it was
> removed. Where a removal fails, the agent finishes all the same and names in the report the
> remainder, with its full path and the reason it stayed.


## The four steps (copied word for word from item 1 of *Fix or let through* of the request)

   1. Start the game on your computer as the project's play instructions say, log in, and send a character on a map until its trip ends or it dies.
   2. Reload the page: the window of the end of the trip should open on its own, with the keyboard inside it. Press Escape: the window closes and "Koniec przejścia" appears in the header; pressing it opens the window again.
   3. On a trip with unsaved changes to the copy of the program, press "Zakończ": the question "Zapisać, odrzucić, wrócić?" appears; "Wróć" closes it and leaves the trip as it was.
   4. On Siedziba press "Odbierz" and on Mapy press "Wejdź": the keyboard focus should land where it landed before the change (on the first control of the screen itself).

The remarks name the same checks as: the window of the end of the trip after a reload with the keyboard inside it; Escape and "Koniec przejścia"; the question "Zapisać, odrzucić, wrócić?" with "Wróć"; the focus after "Odbierz" on Siedziba and "Wejdź" on Mapy.

## What to report, step by step

For each step, on the head and, where it matters, on the base: what you did, what appeared (the visible words), and where the keyboard focus stood after it (the element that `document.activeElement` is, named by its role and text, read with the CLI's `eval`), then whether it matches what the step says. Step 4 says "where it landed before the change", so run step 4 on the base too and compare the two focus targets; run any other step on the base as well when what you observe is not plainly what the step says. Reaching "Odbierz" needs a character that waited at an earning loop (see the skill's "Compose a game state" for a state you can send by the ordinary save request); if you cannot reach a state in which a button exists, say so and what you tried: never write a step as passed that you did not reach, and never invent a focus target. Say separately what the check could not show (the skill's "What this start cannot check").

The decisions behind the first three steps, so you know what a correct result is: the end-of-run window opens at every entry on the screen of an ended map run, after leaving by the menu bar and after a reload too, and its "✕" and Escape close it and uncover the screen, whose header then holds "Koniec przejścia", which opens it again; "Zakończ" with unsaved changes asks "Zapisać, odrzucić, wrócić?", and "Wróć" closes the question and leaves the map run as it was. They are in `foundations/decisions.md` as D-368, D-371, D-173 and D-324, if you need the words.

## What to return

Status (`done` with each step's result, or `blocked` with what is missing), the report path, and in the report: for each step its result on the head and on the base as above, the console errors you saw (lines beginning `uncaught` or `saved-game-load` are the game's own), **Unread material**, **Searches not found or unclear** (`none` where none), and the working copies line: each copy you made and that it was removed (the base worktree with `git worktree remove --force` and `git worktree prune`, `npm run local:stop`, `playwright-cli close`, and `.playwright-cli/` deleted).
