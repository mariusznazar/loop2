# Handoff — the one author of the change (task kafelek-postaci-w-siedzibie)

You are the one author of a change without a plan, for the whole change, in the task cycle of the-way
(`implement-task`). The person who requested this cycle has delegated intermediate choices to the
orchestrator; no human answers questions during the cycle. Never label an answer as the human's approval.

## Where and what

- Worktree (your working directory; every command runs from its root): `the root of the task's worktree`, branch `task/kafelek-postaci-w-siedzibie`, base `d79ad0b7fc3972bf2b2fb3124c593522f01eda92`. The pinned the-way is `.the-way` of the worktree at `6ed3cb364adedacea214d2a0df690cea32f2e72f`, initialised; use no other copy. Dependencies: if `node_modules` is missing in the worktree, install them as the product's rules give (`npm ci`) before any check.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant "the whole change as the one author". Read it whole; read a file it names only when the step or variant that names it comes.
- Stage and boundary: you make the whole change — the code, the tests, the guidelines (styleguide), the foundation entries the task carries (foundation step: `.the-way/task-cycle/skill/foundation_step.md`, read it whole; and the `SKILL.md` of an element, at the path that file gives, when you write an entry of that element) — and you return before review. You do not start the next stage and do not ask a human. Commit by path (`git add <path> …`, never `-A`, `.` or `-a`); commit messages in English in the form of the repository's existing commits (`type: :emoji: message (D-n, …)`). The return step (`.the-way/task-cycle/skill/return_step.md`) comes later, when the orchestrator resumes you for it.
- Frozen task, the whole of it, which you read first: `.runs/task-cycles/kafelek-postaci-w-siedzibie/task_frozen.md` (path from the worktree's root). It holds the *To do* items 1–15, the answers to questions 1–10, *Context*, *Decisions in play* and *Settlements to record* (15 rows). The task has no spec and no plan. Its *Questions carried to cycle* says `none`, its *Human actions* `none`.
- Answers of the orchestrator to step 4: touches a trust boundary: no; holds an irreversible operation: no; open design choice: none (the open points the task leaves to the agent — whether the frame of the open "+ postać" tile is dashed, proportions, spacing, words within the human's choice — are choices of how to make what is settled: make them, show them on screenshots, and name them in your report as the task's To do 13 gives). Reserved choice: none.
- The change is inside the part `browser-view` (and its foundation entries and guidelines). No simulation file should need to change (the task says the simulation stays as it is: `closeAwayReport` already closes the whole report).

## What you read (selected by the orchestrator; read each whole)

Guidelines (whole): `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md` (long; its rules "The screen Postać", "The picture band of Siedziba", "States of shared controls", "Main button, secondary action and tab", "A name typed by the player breaks in its row", "Contrast of every pair", "Focus does not fall to the page" bear on this task), `src/browser/AGENTS.md`. For running the game and a real browser: `.claude/skills/loop2-play/SKILL.md`. Where you add or change a picture or an effect of the scene (you should not need to): `.claude/skills/loop2-scene-art/SKILL.md`. For a screenshot you show: `.the-way/task-cycle/change/ui_check.md` (read when you come to the screenshots).

Foundation: the decisions of the task's *Decisions in play* by identifier (D-218, D-217, D-244, D-245, D-246, D-280, D-282, D-389, D-287, D-447, D-446, D-54, D-51, D-52, D-39, D-40, D-42, D-279, D-275, D-43, D-44, D-265, D-396, D-418, D-419, D-38); plus the decisions, invariants and linked entries of the part `browser-view` that your work reaches, selected as "Reading the foundation" of `.the-way/elements/common/way_of_working.md` gives (you select for what you write; the index goes to a file under your directory for working copies, never a tracked file); the tests this change alters hold lines `// decision: D-n "…"` — add by `--decision` each decision whose sentence such a test holds, and read the invariants such a test cites by `// invariant: <identifier>`. Part map: `foundations/part_map.md` entry `browser-view`. Glossary: the terms you use.

Other sources (read-only, outside the worktree — reading outside it stays with you):
- The old Loop, repository `the old Loop's repository`, branch `origin/test` at `715026e` (read it with `git -C the old Loop's repository show origin/test:<path>`, never check it out or change it): `src/components/probe/CharacterTile.tsx`, `src/components/probe/RosterPanel.tsx`, `src/components/probe/AwaySummary.tsx`, `src/sim/report.ts` (`awaySummary`).
- The old Loop's screenshots of 2026-10-31, 1600 × 1000, for the side by side of the request (item 12): `loop_13_siedziba.png` from the author's private folder of screenshots of the old Loop (2026-10-31) and `loop_01_start.png` (one character outside a loop). Look at them with the image reader.

## The rules you carry into the work (the human's, via the orchestrator)

- **No full gate.** You never run the product's full gate (`npm test` of the whole repository, `gate_times.py`): its run is the orchestrator's or CI's, and the human has asked that it wait for a signal. Run focused checks only: the test files of your change (`node --test <file>` or the repository's way for one file — find it in `guidelines/testing.md`), `npm run typecheck`, ESLint and Prettier on the changed files, `python -B .the-way/elements/common/foundation_check.py`, `python -B .the-way/instruction-files/check_instructions.py`, and the Python quality/invariant tests your change can touch, each by its own command. A check that did not run is reported as not run.
- **No shell left behind.** Every process you start in the background (the local game server `npm run local`, a browser, a watcher) is stopped before you return; report it in the line on working copies/remainders.
- Language: code, comments, identifiers, commit messages in English; what the game prints stays Polish exactly as the task words it (the task's Polish strings are literal contracts: "W obozie", "Pętla zatrzymana …", "Bez ciebie …", "+ postać", "Imię nowej postaci", "Drużyna nie ma jeszcze postaci.", "Wpisz imię postaci.", "Załóż", "Anuluj", "Zamknij", "Odbierz", "Zatrzymaj", "Skrzynka jest pełna.").
- Personal data and secrets do not go into the screenshots you publish or into any report: use a test account of the local game as `loop2-play` gives.

## Screenshots (To do 12 and the rules for a UI change)

The side-by-side of the old Loop and loop2 goes into the request's description, so you produce and publish the screenshots: of loop2 in the same window size 1600 × 1000, in a state as close to the old one as possible (one character in the camp), and loop2-only screenshots of the states the old one lacks: several characters, a character in an earning loop, a character in a manual map run, a character after the loop was stopped, tiles with the away report ("Gdy cię nie było"), the empty team with the open name field, and the section in the phone layout at 360 px (touch). Push them as D-418 and D-419 give: public repository `mariusznazar/screenshots`, directory `loop2/kafelek-postaci-w-siedzibie/`, on a branch named `loop2/kafelek-postaci-w-siedzibie`, never `main`, with the `gh` account of the owner, by yourself; the old Loop's two screenshots go there too (D-418 allows the predecessor's screenshots). Report the commit SHA of that repository and the file names; the description will embed them by `https://github.com/mariusznazar/screenshots/blob/<sha>/loop2/kafelek-postaci-w-siedzibie/<file>?raw=true`. The record's copy holds no image: keep none in `reports/`; keep the screenshot only in your working directory until it is pushed, then remove it. Say in your report what each screenshot shows and what you checked on it (the colours of the frames, that no text stands outside a frame, no side scroll at 360 px, the touch targets ≥ 48 px, the focus ring on the name). The task says that your screenshots must make the human not name the old Loop better at the tile.

## What the task's measure is

Acceptance: on the side by side of Siedziba of the old Loop and loop2 the human names the old Loop better at the tile of a character in none place. Treat the old Loop's tile as the floor and aim at better; depart from the human's answers only inside the limits of the task's To do 13 and answer 5, and say in your report what you departed from and why.

## Dividing the work (the orchestrator's suggestion, not a plan)

Foundation sentences first (via the project skills `the-way-record-decision` etc., read as `foundation_step.md` gives), then the shared control kind, the tile and the grid, the away report, the new-character tile, the styleguide, the tests that cite changed sentences (To do 14: `foundation_check.py` verifies that quoted sentences stand in the binding sentence of a decision), the kitchen-sink page, then the screenshots. If you find that the change is too large for one agent, return `returned` with where the size lies and no code (the orchestrator then plans); do not return it early for a hard part.

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

Your directory for working copies: `.runs/author/`. (`reports/` means `.runs/task-cycles/kafelek-postaci-w-siedzibie/reports/`.)

## Your report

Write the full report to `.runs/task-cycles/kafelek-postaci-w-siedzibie/reports/author-report.md` (that name is chosen so that Claude Code lets you write it; the report file is the input of the cycle's scripts — `task-cycle/remarks_check.py` reads it — the case the note about reports that you may not write leaves open). Where you are refused all the same, return the report whole as your answer. The report follows `make-change`'s report form and holds, besides it, the lines the cycle needs: its first line is your status; **Unread material** (what this handoff names that stayed unread or was read in part, or `none`); **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`); your own-work check (the weakest requirement, its check, what it showed); each check you ran with its command and exit code; the line on working copies and remainders; reaches (files or parts you touched beyond your handoff's selection); the departures of To do 13; the screenshots with their repository commit; the foundation entries you wrote or changed with their identifiers and the rows of *Settlements to record* each carries. `cycle.md` and the other files of the record's directory (other agents' handoffs, reports, findings) are not yours to read unless this handoff names them: it names `task_frozen.md` only.

Return to the orchestrator: your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
