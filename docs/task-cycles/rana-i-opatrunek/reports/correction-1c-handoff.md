# Handoff — correction 1, part C: the row „Teraz” at 360 px (task rana-i-opatrunek)

You make part C of a correction after the human's remarks, as a fresh agent of the type `the-way-stage`, variant of `make-change`: **a correction for the human's remarks** (read `.the-way/task-cycle/change/SKILL.md` whole, and `ui_check.md` and `walkthrough.md` beside it: the change alters what a screen shows; the remark binds).

## The remark you carry (word for word; it binds)

> (c) wiersz „Teraz” ucina „Wytwórz — Opatrunek” wielokropkiem przy 360 px — **popraw, jeśli to kilka linii CSS** (np. zawijanie zamiast wielokropka, bez zmiany szerokości sceny): gracz ma widzieć, która reguła działa teraz. Zrzut przed i po przy 360 px. Jeśli poprawka jest większa, opisz przyczynę i miejsce w opisie; dopiszę to do zadania z kolejki, które rusza ekran przejścia.

(And on the item (b), which stands beside it and which you do **not** touch: „scena szersza o 12 px od pudełka na telefonie — przepuść: to celowa geometria (zmierzona przy PR #182), nic się nie ucina ani nie przewija” — the scene's width stays as it is.)

The finding: the walk of the cycle saw, on the screen of a map run in the phone layout (360 px, touch), the line „Teraz” cut „Wytwórz — Opatrunek” with an ellipsis when the line also says „zostało 10 z 10 min”: `span.now-text`, content 134 px in a box of 114 px (`reports/walk-report.md`, side observation 2, with its measurement files in `reports/` if named there; read the report's section on it). The row is drawn by `src/browser/view/now-rows.tsx` and `src/browser/run-screen.css` (`.now-text`, `.now-row`, the `@media (width < 1280px)` block).

## What to make, and when not to

- Read whole the rule of the screens that governs it: `guidelines/styleguide-browser-view.md` (whole; about 1,980 lines, read it all — the earlier reviewers read only parts), `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`, and the decisions D-334, D-335, D-336, D-396, D-43 and any other whose binding sentence speaks of this row (find them by heading `### D-<n> —` in `foundations/decisions.md`; never read that file whole).
- **The orchestrator's reading of the remark:** make the smallest CSS change that lets the text of the row „Teraz” show in full at 360 px in the phone layout — for example the text wrapping into the second line inside the row's fixed minimum height, or a smaller step, **without changing the row's height, the width of the scene or the layout of anything under the row** (D-334 says the row keeps one height whatever it holds; the comment in `run-screen.css` says it cuts a longer text so that a change of its text moves nothing below it: a wrap within the fixed height keeps that). A change of a few lines of CSS (and, if the guidelines ask, a test) is yours to make.
- **If** the change needs more than a few lines of CSS, or a change of the row's height, or **contradicts a binding sentence of a decision** (for example one that says the row cuts a longer text, or has exactly one line), **do not make it**: leave the code as it is and report the cause and the exact place (file, selector, line, the decision and the sentence) in your report; the orchestrator then writes it in the request as the remark asks. Say clearly in the first lines of your report which of the two you did.
- If you make the change: a test where the guidelines ask for one (jsdom cannot measure a layout; see `guidelines/testing.md`), and a look at the running game: **a screenshot before and a screenshot after at 360 px with touch** of the screen of a map run, with the line „Teraz” holding „Wytwórz — Opatrunek” and „zostało 10 z 10 min” (compose the state as the walk did: its scripts are `reports/walk-compose.mjs` and `reports/walk-send.sh`; read `.claude/skills/loop2-play/SKILL.md` for how to run the game and to operate it in a real browser), plus a measurement that the scene's width and the heights of the rows under „Teraz” are the same before and after (give the numbers). Check also 1280 px does not change.
- Screenshots go where the foundation settles (D-418, D-419; read both): you push them yourself to the public repository `mariusznazar/screenshots` with the `gh` account on this computer, to the directory `loop2/rana-i-opatrunek/` on the branch `loop2/rana-i-opatrunek` (it exists; add files in a new commit, never `main`, never force), named `c1-teraz-before-360.png` and `c1-teraz-after-360.png`; the report gives each as the link to its file in your commit with `?raw=true`, as D-418 gives. No image goes into the repository of loop2 or into a file of the record. The screenshot tool's own files are working copies: move them into your directory and remove them at the end. A test account made through the login card, no personal data in a picture. Stop the local start when you finish.
- Worktree `the worktree's root` (branch `task/rana-i-opatrunek`), head `dbc931e8932c1b9821ba1146d295cf883508320f` (the end of part B); your range runs from there. Commit by path, in English, no push of the branch. Your directory for working copies: `.runs/correction-1c/`. Report: `.runs/task-cycles/rana-i-opatrunek/reports/correction-1c-report.md` (the file is the input of the cycle's scripts). The cycle record and other agents' files of the record directory are not yours except those named here.
- Checks (command and exit code each): `npm run typecheck` if you touch a `.tsx`, the tests of the files you touch (`tests/view/…`), the invariant tests that read the CSS (`tests/invariants/test_browser_view_*.py` — run those that read `run-screen.css`), Prettier/ESLint on a changed script or style file as the repository runs them, and `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`. Never run the whole suite.
- Report: which of the two you did (changed / not changed and why), the diff in words, the before and after numbers, the screenshot links, each check, **Unread material**, **Searches not found or unclear** (`none` where none), working copies.

## Working copies (word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.

