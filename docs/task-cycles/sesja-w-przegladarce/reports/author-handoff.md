# Handoff to the one author — task `sesja-w-przegladarce`

## Who you are and what you make

You are the one author (`the-way-author`) of the change of this task, in the cycle `implement-task` of the-way. The method of your stage is `.the-way/task-cycle/change/SKILL.md` (`make-change`); read it whole. Your variant is: **the whole change as the one author**. A fresh agent reviews your change afterwards with `review-change`; the full gate of the product is run by the orchestrator, never by you.

The user's delegation to this cycle: the person who requested it has delegated intermediate choices to the orchestrator; no answer you get is the human's approval. The strongest model allowed in this cycle is `opus`.

Worktree (work from its root, never from the main checkout): `the worktree root`, branch `task/sesja-w-przegladarce`, base `e5516b17`. Dependencies are installed (`npm ci` done, `.runs/quality-venv` present).

The frozen task document: `.runs/task-cycles/sesja-w-przegladarce/task.md` — read it whole. There is no spec and no plan (no open design choice; one author).

Your directory for working copies: `.runs/author/`. Your report path: `.runs/task-cycles/sesja-w-przegladarce/reports/author-report.md`.

## Answers of step 4

- Trust boundary: no. The boundary files of the part `browser-view` are `assets/icons/**`, `assets/fonts/**`, `assets/sprites/**`, `src/browser/view/screen-address.ts`, `email-confirmation.ts`, `password-reset.ts`. If a fault you see leads into one of them, do not fix it; report it as a defect for the human's decision.
- Irreversible operation: no. You run the game only locally, as D-255 gives; you touch neither the test server nor any player's save.
- No open design choice; no reserved choice.

## What the task is, in one paragraph

One continuous session in a real browser (Chrome, window 1280 × 720; then a short pass in Firefox) that looks at the states of the game's screens the task lists, records what is seen, fixes a bad state only when all three conditions of point 5 hold, and otherwise reports it as a defect for the human. Point 7 is the one change that is decided in advance: the width and ellipsis of the program `select`. Points 1–4, 6 and 8 are observation. Read the task's points 1–8 and its *Out of scope* as binding; `Out of scope` is a boundary.

## What you read (named by me; read each whole unless a range is given)

- Skill of the running game and the browser: `.claude/skills/loop2-play/SKILL.md` (the skill `loop2-play`; read it as a file; its scripts `compose-state.mjs`, `frames.js`, `save-frames.mjs` stand beside it).
- Guidelines: `AGENTS.md` of the product, `guidelines/coding.md`, `guidelines/coding-browser-module.md` (if you change a module of the view directory), `guidelines/testing.md`, `guidelines/styleguide-browser-view.md` (whole; it governs every screen you judge and the exception of point 7), `src/browser/AGENTS.md`. If you fix a style in a CSS file, read the styleguide before, not after.
- Foundation: select it by "Reading the foundation" in `.the-way/elements/common/way_of_working.md`, for the part `browser-view` and, for the states you judge, the part `simulation` where a state comes from it. Write your index with `python -B .the-way/elements/common/decision_index.py --output .runs/author/<name>.md ...` (the switches are in its docstring). The log is divided into topical sections; the ones that bear on this task are: "Browser view: screens, navigation and their code", "Look of the browser view: styleguide, controls, pictures and fonts", "Screen of a map run and the end-of-run window", "Chronicle", "Scene", "Combat", "Earning loop and time away", "Program editor", "Rule panel and the signs of a rule", "Screen Mapy and Siedziba", "Signing in: the login card and credentials", "Saving the game state and the previous save", "The gate, test tools and the local start". Run the index with `--section HEADING` for the ones whose screen you are looking at, and `--part browser-view`.
- Decisions named by the task (`--decision`): D-75, D-88, D-254, D-255, D-03, D-278, D-299, D-323, D-349; for point 8 also D-208, D-97 and D-253; for point 7 the entry of the styleguide's rule "A name typed by the player breaks in its row" (`guidelines/styleguide-browser-view.md:530`) and the decision that the rule cites.
- Where the screenshots go: D-418 and D-419 (read both whole). A screenshot you show the human lies where D-418 says; you push it as D-419 says. Show as few as the evidence needs; they are public. Take no screenshot of anything but the game on a local test account (no personal data, no secrets). Keep no screenshot in a file of the repository or the record.
- Invariants of `browser-view` (and `every`) selected as step 3 of "Reading the foundation" gives, and the glossary.
- `.the-way/task-cycle/change/ui_check.md` (you change or inspect a user interface); `.the-way/task-cycle/skill/foundation_step.md` only if your change writes a foundation entry (point 7's styleguide exception is a change of a guidelines file, not of the foundation log; if you find that it needs a decision or an invariant to change, return `returned` — do not change a decision).

## What you do (the order is yours; these are the boundaries)

1. **Observation of points 1–4, 6 and 8.** Each state is looked at in Chrome at 1280 × 720 through Playwright CLI as `loop2-play` gives (Playwright MCP where the CLI fails). Reach states by playing or by composing a state with the simulation's functions and the ordinary save request, as D-255 gives. For the game's answers (the conditions of a state), read the console during play where a point asks for it (point 1, loop2#66-1).
2. **Point 2 (a solved Forest).** Try to write, in the game's program editor, a program that solves the Forest; the character's Understanding may be composed by a script. Stop after about 45 minutes of trying (write the start and the end time in your report); then show the end of a solved map on a composed state and say in the report that the "real program" part of loop2#65-1 and loop2#79-1 stays open. Do not leave a program that solves the Forest in the repository (it is out of scope).
3. **Point 3.** Settle the effect of the scroll of loop2#79-22 (what moves and by how much, on what path), and look at the weak points of point 3 as listed. D-317 and D-347 are not looked at; the report says that and why (task *Questions to settle*, third).
4. **Point 4 (Firefox).** A short pass over the four screens named. If the Firefox of Playwright does not run with the installed `playwright-cli`, the report says so with the error; install nothing.
5. **Point 8.** Make an error in the save code in a real browser before the request leaves (for instance by replacing the save client from the browser) and look at whether the error reaches the last-resort handling (`src/browser/last-resort.ts` or the file the code names); what the player sees first (D-208), then the sentence of D-323; the same for the save before logging out (D-97). Do this only with a test account on the local game.
6. **Point 7.** Make the change: the program `select` on the screen Mapy and the screen of a map run (the task's "ekran przejścia"; the glossary entry `map run` is the Polish "przejście") gets the widest allowed width; a cut name shows an ellipsis; the full name stays in the opened options; the exception for `select` goes into the styleguide rule "A name typed by the player breaks in its row" (the list does not break the name, it cuts it). Tests: as `guidelines/testing.md` gives for a CSS or view change; look at it in the browser with a name of 40 letters and with 200 letters with no space at 1280 × 720, and say the page width you measured before and after.
7. **A state that looks bad** (point 5): fix it only when (a) the screen contradicts a current decision, an invariant or a rule of the styleguide, (b) the fix fits in the files of `browser-view` (the list in `foundations/part_map.md`), (c) the fix changes no decision. Anything else: no fix; the report lists it as a defect for the human's decision, with the state, how to reach it, what is seen, and which entry or rule it touches or that none does. Every fix has a test as the testing guidelines give, and a state check as `ui_check.md` gives.

## Bounds

- Do not work outside the worktree; do not change the main checkout; do not touch the test server, a player's save, or the account database that is not the local one made for this check. Make no commit outside the branch `task/sesja-w-przegladarce`. Do not run the full gate (`npm test`); run the focused checks of the files you change as `guidelines/testing.md` gives; the full gate is the orchestrator's.
- One browser session of yours; no other agent drives a browser at the same time. Close the browser you opened and stop the local game (`npm run local:stop`) before you return (WAY-319).
- You do the foundation step and the return step where this task requires them (the cycle resumes you for the return step later). Commit your work as `make-change` gives; commit messages in English, as the product's last commits show them; `git add` by paths.
- If an observation shows a state the task cannot settle (for instance a fault in `game-view.ts`, whose split is another task's), report it; do not enlarge the task.
- If the change proves too large for one author, or you meet an open design choice, return `returned` with the report and no code, as `make-change` gives.

## What the report must hold (besides what `make-change` requires)

A table `Observations` with one row for every item of points 1, 2, 3, 4, 6, 7 and 8 of the task (each sub-item and each weak point separately, by its identifier such as `loop2#65-1` or `D-299`, plus "scroll of loop2#79-22" and the two names of point 7): the state, how it was reached (played, composed with which script, or edited), the browser and window size, the result, one of `matches` / `bad: fixed (commit)` / `bad: defect for the human` / `not viewed: why`, what was seen in plain words (measured values where you measured), and where the evidence lies (the address of a screenshot pushed as D-419 gives, or `frames`/`console` kept in `reports/` with a name that starts with `author-`; no image files in `reports/`). Also: the program of point 2 and how long it took, or the failure and the minutes; the console lines you read; the weak spots of the method; the part of the task you could not do.

## First paragraph of "Working copies" of the cycle, word for word

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed.
