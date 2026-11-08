# Handoff 15 — screenshots of the changed screens for the request (stage: evidence)

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator of `implement-task`. You never ask the human; questions go to the orchestrator in your report. You write no tracked file and change no code; you only run the game and take screenshots.

## Where you work
- Worktree (work from its root): `the worktree's root`, head `64a8a83e2215ffe2eaef03743df7209346fd6c8a` (confirm; the tree must be clean before and after you). Shell: Windows 11, Git Bash / PowerShell. Nothing else is running in this worktree.
- The route: the project skill `loop2-play`, `.claude/skills/loop2-play/SKILL.md` — read it whole first. It says how to run the game on this computer (`npm run local`), make an account through the login card, drive the real browser with Playwright CLI (Playwright MCP where the CLI fails), build a game state with `compose-state.mjs` (so that a map run has a character with a running action and a program with rules), and stop everything. The account is made only on the local start's own database (`example.test` addresses). Stop the game (`npm run local:stop`) and close the browser when you finish; delete `.playwright-cli/`.
- Do not use personal data; do not paste secrets into the report.

## The screenshots (save them as PNG into `docs/task-cycles/proporcje-sceny-i-programu/reports/screens/`; that directory exists)
Window 1280 × 720 px unless the line says otherwise. Look at each image after taking it (Read the PNG) and say in the report what you see, one or two sentences each; a screenshot you did not look at is not evidence.
1. `run-two-columns-1280.png` — the screen of a map run of „Las” with a character, a program with at least two rules in one group, and a map run in progress (paused is fine): on the left the world with the scene, below it the drawing of the map and the line of a tile, below that the tabs „Kronika” and „Teren” with the chronicle; on the right the program. If the lower part lies below the window's bottom edge, take the whole page (full-page screenshot) and say so.
2. `run-rule-panel-open-1280.png` — the same screen after a click on a rule's row: the rule panel stands under that row in the program, the tabs „Kronika” and „Teren” unchanged on the left.
3. `run-end-question-1280.png` — after „Zakończ” in the header: the question „Zapisać, odrzucić, wrócić?” with its buttons.
4. `programy-panel-in-place-1280.png` — the screen Programy (`#/programy`) with a saved program and a rule opened: two columns (list of programs, program), the panel under the rule's row.
5. `run-stacked-1000.png` — the screen of a map run in a window 1000 px wide (then 1000 × 900 is fine): the world, the program and the tabs one under the other (full page).
Measure and report, for screenshot 1: the width in px of the program column (`document.querySelector('.run-program').getBoundingClientRect().width`, or the element's class in `src/browser/view/run-screen.tsx`) and the scene's size.

## Report
Write `docs/task-cycles/proporcje-sceny-i-programu/reports/15-screens-report.md`: status; the five files with what each shows; the measurements; the commands that started and stopped the game, with exit codes; what you could not do and why; each reach beyond this handoff; **Searches not found or unclear** (each thing you looked for and did not find, or `none`). Return only the status, a one-line result naming what is missing, and the report path.
