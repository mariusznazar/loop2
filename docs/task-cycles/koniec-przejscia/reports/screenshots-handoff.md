# Handoff — screenshots of the end-of-run window for the request (task koniec-przejscia)

You take the screenshots that the request shows the human, from the running game, and push them as the product's foundation settles (decisions D-357 and D-358, `foundations/decisions.md`: the public repository `mariusznazar/screenshots`, directory `loop2/koniec-przejscia/`, branch `loop2/koniec-przejscia`, never `main`, with the `gh` account of the owner already signed in on this computer). Work from the worktree `` (HEAD `8ac37c6d`, the tree the gate passed on). You change no tracked file of the repository: no screenshot file, record or script goes into it; your scratch lies in `.runs/` and `.playwright-cli/`, which git ignores. Never touch the main checkout `a repository on the author's disk`.

## Method

Read whole `.claude/skills/loop2-play/SKILL.md` and follow it: `npm run local` over HTTPS, an account through the login card (a made-up address at `example.test`, local only), Playwright CLI (Playwright MCP only where the CLI fails and only from a session started in this worktree), the way to put a state into the game (the skill's `PUT /api/saved-game` and `compose-state` way; earlier checks of this cycle left helpers in `.runs/s4check/` — `compose.mjs`, `send.sh`, `dead.json`, `oneshort.json` — read them whole before you use them: they were written by another agent and may be stale for the merged tree), and its section "Show a screenshot to the human". Close the browser you opened (`playwright-cli close`), run `npm run local:stop` when you finish, delete `.playwright-cli/` and `.runs/screenshots/` after the push. Use no browser another cycle uses.

## What to show (viewport 1280 × 720 unless a line says otherwise)

1. The window after a **death**: title „Mag zamarzł” (or the cause the state gives), the longest-streak line with its bar, the line of what the death cost, the sections that have content, the buttons at the bottom; the menu bar above the window.
2. The window after a **completion** of a map that opens another (Las): the title in the positive role, „Do skrzynki: …” or „Do skrzynki nic nie trafiło.”, and the buttons „Restart”, „Zakończ”, „Otwarte: Las — głębiej →”.
3. The screen after **„✕”** on the ended map run: the scene, the program with its counters, the header with „Koniec przejścia”, „Restart” and „Zakończ”, and the world area from the top without the old line of what the death or the completion took.
4. Optionally, if cheap, the window in the one-column layout at 800 × 720.

Look at every screenshot before you push it: it may show only the made-up account of this start and no real address, password or token (the menu „Konto” stays closed). Inspect what each shows against what the list above says; report honestly what a screenshot does not show or shows wrongly (for example a state composed by hand that no real game reaches).

## Report

Write `docs/task-cycles/koniec-przejscia/reports/screenshots-report.md`: for each screenshot its file name, what it shows in one sentence, the state it was made from (how composed) and the embed link exactly as the skill gives (`![…](https://github.com/mariusznazar/screenshots/blob/<commit>/loop2/koniec-przejscia/<file>.png?raw=true)` with the commit that holds the file, read after the push); the push's command and result; any screenshot looked at and not shown, with the reason (a failed push: set up no credentials and say so); the method (viewport sizes, how the state was made, whether anything differs from the real game); each observation that looks like a defect of the window or the screen (with evidence); **Unread material:** and **Searches not found or unclear:** (each `none` if so). Return only the status, a one-line result and the report path.
