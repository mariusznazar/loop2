# Handoff — the one author of the change

Stage: the whole change as the one author (`make-change`), with the foundation step and its code, before any review.

## Delegation

The person who requested this cycle delegated the intermediate choices to the orchestrator. You do not wait for or seek the human's approval; you ask the orchestrator (return `questions`) where the task, its sources, the foundation and the code leave a choice open. Your go-ahead is provisional, never the human's approval.

## Where you work

- Worktree (work from its root, never from the main checkout): `the task's worktree`
- Branch: `task/poprawki-kodu-z-przegladu-fundamentu`
- Base: `e7b3d071d7877c005c33f432d41860cc818361f5` (`origin/main`, the merge of PR #146). Nothing is committed on the branch yet.
- Process pin: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, initialised in the worktree; it matches the gitlink.
- Dependencies are installed in the worktree (`npm ci`, `.runs/quality-venv`).
- Your directory for working copies: `.runs/author/` of the worktree.
- Your report path: `.runs/task-cycles/poprawki-kodu-z-przegladu-fundamentu/reports/author-report.md`

## Method

Read whole `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is "the whole change as the one author". Read a file it names, one beside that `SKILL.md` included, only when the step or variant that names it comes. The foundation step: `.the-way/task-cycle/skill/foundation_step.md` — read it whole; write each entry through the element's `SKILL.md` it gives (the path under `.the-way/elements/`), read when you write an entry of that element. The return step is not yours now; the orchestrator resumes you for it later.

Boundary: make the whole change (code, tests, foundation entries, own-work check), commit it in your own commits on the branch, and return before any review. Do not run the product's gate (`npm test` as a whole): its run is the orchestrator's. Your focused checks (single test files, `eslint`, `prettier --check` of the files you touch, `python -B .the-way/elements/common/foundation_check.py`) are yours. A full-gate run waits for a signal the orchestrator gets from the human's side; never start one.

## The task (frozen)

The frozen task is `.runs/task-cycles/poprawki-kodu-z-przegladu-fundamentu/task.md` in the worktree (original: the task note in the author's backlog, approved 2026-11-13). Read it whole. `Project relation: independent`; `Human actions: none`; `Questions carried to cycle: none`.

## Answers of step 4

- Touches a trust boundary: no (no file of the change is a trust-boundary file of the part map).
- Holds an operation that cannot be undone: no.
- Open design choice: none. The *Settlements to record* rows 1 and 2 and the three answers of *Questions to settle* settle every choice the task leaves; the rest (the wording of the sentences you add to D-323, D-208, D-97, D-389, the new word's glossary entry) is the foundation step's own work, bound by the task's text.
- Route: one author without a plan, class `same` as the orchestrator's (the change reaches four parts: simulation, browser-view, the guidelines of agent-workflow, product-foundation).

## Reconciliation of the task with the base (the orchestrator's finding — read it)

The task was read at commit `fc00c406`; the base is 49 commits further. Line numbers in the task are stale. Find each place by its symbol or text, not by line. Known drift:

- `src/browser/styles.css` is split: the stylesheet rules you need are now in other `src/browser/*.css` files (for example `src/browser/run-screen.css` holds `--scene-speck-ember` and `--scene-speck-bronze` at about lines 1121 and 1125; `src/browser/headquarters.css` and other `*.css` files mention "Siedziba"). Search every file of `src/browser/` and `tests/`.
- `game-saver.ts` changed since (a commit made the game send the game state at a hidden page and at the 30-second rhythm after a failed save); `sendNow` is at about line 147, `inFlight` is set at about line 150 and cleared in `answered` at about line 183. D-207 and D-208 were also changed since: read their current text, not the task's quotation.
- `game.ts` and `understanding.ts` changed; find the line that omits the pause only at a completion (about line 873: `paused: !completed`) and the first-cooling write before `if (after.death) return found;` in `understanding.ts`.
- `guidelines/styleguide-browser-view.md` changed (the "Siedziba" lines are not at 804/811 any more); `tests/view/game-saver.test.mjs`, `tests/view/camp-picture.test.mjs` and `tests/view/scene-picture.test.mjs` changed.
- Where a quotation of a decision in the task differs from the current log, the current log is the truth; where the task's *To do* names a place that no longer exists or has moved in meaning, return `questions` naming what you found.

Search every use, not only those the task lists: the task's lists are what the review of the foundation found, not a complete census. A use of "Siedziba" in the meaning of the place of a character outside a manual map run and an earning loop is to be renamed wherever it stands in the code, tests, comments, guidelines and the foundation; a use in the meaning of the screen stays (D-330 and the like). A use of the `bronze` / `ember` shade or token stays nowhere. Decide each "Siedziba" use by reading its context, and name in your report the uses you left, with the reason.

## What each *To do* item needs (from the task; the task's text binds)

1. F-11 — death in the minute of a discovery: no pause, the discovery stays in the game state (D-122, invariant `player-map-run-pace`); the invariant's test `tests/invariants/test_player_map_run_pace.py` gets a scenario with a death in the minute of the first cooling (minute 84) and its description loses the exclusion and the pointer to `minute-span-split` in the point "until it ends". Test first: it must fail before the change and pass after.
2. F-26 code — an exception from the saving code before the request leaves (`sendNow`: the read of the state, `withSaveTime`, `savedGame`, and a rejection of the `saveGame` promise before sending) counts as a failed save: D-208's sentence (D-97's sentence for the save before a logout), the retries at D-208's rhythm, the logout gets a failure so „Wyloguj” works again; the error itself still goes on to D-323's handling (do not catch it silently: it must still reach `src/browser/view/last-resort.ts`). Cases in `tests/view/game-saver.test.mjs`: an ordinary save and a save before logout. Test first.
3. F-26 entry — D-323 gets one sentence of precedence: after an error no code of the game handled, every decision about the game that goes on gives way to D-323.
4. F-32 — the glossary entry `headquarters` gets a *Not* (and the settlement row 2: whether the new word gets an entry of its own is the glossary skill's judgment, bound by the task's text); every use of "Siedziba" for the place of the character is rewritten as „at the camp” / „w obozie”; the function `inSiedziba` is renamed from the new word. D-389 is changed through `the-way-record-decision` (a project skill of this repository, see the repository's `AGENTS.md`).
5. F-39 — tokens and shades renamed: `--scene-speck-ember` → `--scene-speck-bright`, `bronze` → `faint` per the task text (read the task: `bright` is today's `ember` (4.2:1), `faint` today's `bronze` (3.3:1)); the colour values and the source comments of the tokens stay; the type `SceneSpeckShade` with its comment, the 12 data entries and the test.

## Foundation entries and files to read

Decisions in play, by identifier (current text in `foundations/decisions.md`): D-48, D-97, D-122, D-207, D-208, D-323, D-330, D-368, D-389; invariant `player-map-run-pace` (and its linked entries); glossary `headquarters`; the part map (`foundations/part_map.md`) for the parts you touch: browser-view, simulation, agent-workflow (guidelines), product-foundation.

The orchestrator's index of the decisions that bear on the parts you touch, written by `.the-way/elements/common/decision_index.py` (parts browser-view and simulation, the sections of saving, the screen Mapy and Siedziba, the screen of a map run, the Scene, discovery, the look of the browser view, and the decisions above): `.runs/task-cycles/poprawki-kodu-z-przegladu-fundamentu/decision-index.md`. Read it; open whole each decision the change changes or goes against (with its *Rejected*), and those whose binding sentences leave open what the work has to do. The list of sections is `.runs/task-cycles/poprawki-kodu-z-przegladu-fundamentu/sections.md`.

Guidelines, each whole, as `.the-way/product-guidelines/reading.md` selected them: `guidelines/coding.md`; `guidelines/coding-simulation-module.md` (the simulation module files); `guidelines/coding-content-data.md` (`src/browser/sim/data/scene.ts`); `guidelines/coding-browser-module.md` (modules of `src/browser/view/`); `guidelines/testing.md`; `guidelines/styleguide-browser-view.md` (a browser-view file changes: tokens, stylesheets, view files; it also carries the "Siedziba" uses to rewrite); `src/browser/AGENTS.md`. Where a part of the change reaches a file the selection did not cover, read the guidelines of its part yourself and name that reach in your report.

The change touches the look of no screen (renames, a state of the saving line, a pause flag). Read `.the-way/task-cycle/change/ui_check.md` where `make-change` sends you to it and do what it asks for the states a change of this kind reaches; say in the report what you checked and where, or that nothing of the look changed.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule.

## Report

Write the full report to the report path above as `make-change` gives it. Return: your status, your commits, a one-line check result naming what failed or did not run, the report's path, your questions and concerns, each reach beyond this handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`); the report holds your own-work check with commands and exit codes.

Commit messages: English, in the style of the repository's log (`type: :emoji: sentence`); `git add` by path only, never `git add -A` / `.` / `commit -a`. Commit the foundation entries with the code per `foundation_step.md`.
