# Handoff — the one author of the change (`make-change`)

You are the one author of the whole change of the task `wskrzeszenie-wspolne`, in a the-way task cycle. The person who requested the cycle delegated intermediate choices to the orchestrator; the orchestrator answers your questions from the task, its sources, the foundation and the code. Nothing here is the human's approval.

## Where you work

- Worktree (work from its root, write only there): `the task's worktree`, branch `task/wskrzeszenie-wspolne`, base commit `2a8645d46c50b23437ad824d1e7969ee760d05f1` (main). Dependencies are installed (`npm ci` done) and `.the-way` is populated at `55afa8e57aa1b83c77108576a36642722e0dda15`, the commit the gitlink records. Do not move the pin.
- Your report: `.runs/task-cycles/wskrzeszenie-wspolne/reports/author-report.md` (in the worktree; the `.runs/` directory is ignored by git).
- Read the product's `AGENTS.md` and, in `src/browser/`, `src/browser/AGENTS.md`.

## Your stage and variant

- Method: `.the-way/task-cycle/change/SKILL.md` (the project skill `the-way-make-change` points to it). Read that `SKILL.md` whole; read a file it names, one beside it included, only when the step or variant that names it comes. Your variant, in the words of its row: **"the whole change as the one author"**.
- Boundary: you make the code, the tests and, through the foundation step, the foundation entries the task carries; you return before any review. The foundation step is `task-cycle/skill/foundation_step.md` of the pinned the-way (read it whole, and the skill of an element when you write an entry of that element — the project skills `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`). Do not run the return step (a later resumption of you does), do not open a request, do not merge, do not start another stage. Questions go to the orchestrator, never to the human.
- Do **not** run the product's full gate (`npm test`) — the orchestrator runs it. Run only the focused checks of the tests you write or change, and the checks the guidelines name for your files (type check, lint, format of the files you changed). Give each check's command and exit code in the report.

## The task

The frozen task is `.runs/task-cycles/wskrzeszenie-wspolne/task.md` (read it whole: *Description* — Need, To do 1–12, Questions to settle 1–8 with the answers —, *Context*, *Decisions in play*, *Settlements to record* (none), *Out of scope*). It is the sole authority for what to build; do not widen it. `Project relation: independent`; no spec and no plan exist (no open design choice at start).

Answers of the orchestrator to the two questions at start:
- Trust boundary: **yes** — `src/browser/sim/saved-game.ts` (a trust boundary of the part `simulation`, which takes in documents from the server) is touched by the change. Its guidelines `guidelines/coding-saved-game.md` apply whole, and the reviewers will check crafted input at it (old per-character field, missing or extra field, NaN / non-integer / unsafe moments, an unknown settlement kind, a wrong version).
- Irreversible operation: **no**.

Choices that are yours to make (the task and D-190/D-216/D-386 settle *what*, not *how*): where the shared moment of readiness lives in the game state and its name; how a first solving marks the resurrection ready without a clock (the function that passes game time does not know the clock; D-386 lets a moment be a safe integer of any sign; a new game starts ready at 0); how the end-of-run window learns that the completion renewed the resurrection, and its shape in the saved state; how `endLoopRun` and `catchUp` pass the practice gathered at the loop to the death settlement. Make each, name it in the report (what, why, the way rejected, what it costs if wrong) — the orchestrator enters it in the cycle's questions table. If you find an open design choice the task, the foundation and the code do not settle, return `returned` with a report and no code, as `make-change` gives.

## What to read (selected by the orchestrator, WAY-150, WAY-213)

Foundation, by identifier, each whole (`foundations/decisions.md` headings `### D-nnn`, `foundations/invariants.md` and `foundations/glossary.md` headings `## <identifier>`):
- Decisions of the task's *Decisions in play*: D-189, D-190, D-206, D-216, D-217, D-219, D-220, D-240, D-242, D-329, D-386.
- Further decisions that mention a resurrection and that the change reaches: D-04, D-212, D-241, D-246, D-247, D-248, D-311; and D-243 (start of an earning loop), D-368 (end-of-run window) and D-221 (loop clock), which the above link to.
- Invariants: `resurrection-renewal`, `catch-up-state`, `catch-up-death-moment`, `catch-up-minutes`, `death-settled-once`, `trip-run-end`, `save-version`, `minute-span-split`, `loop-practice-payment`, and any other whose *Part* names `simulation`, `browser-view` or `every` and which a test you change cites by its line `invariant: <identifier>`.
- Glossary: `resurrection`, `generation number`, and the terms the code you touch uses (`earning loop`, `catch-up`, `solved map`, `map run`).
- The part map (`foundations/part_map.md`, whole) for the parts `simulation` and `browser-view`.

Guidelines, each whole: `guidelines/coding.md`; `guidelines/coding-simulation-module.md` (for `src/browser/sim/` files other than data and `saved-game.ts`); `guidelines/coding-saved-game.md` (for `src/browser/sim/saved-game.ts`, in its place for that file); `guidelines/coding-content-data.md` (if you touch `src/browser/sim/data/`); `guidelines/coding-browser-module.md` (for files in `src/browser/view/`); `guidelines/styleguide-browser-view.md` (before changing any file of the part `browser-view`; the change here is texts of existing lines, not a new screen); `guidelines/testing.md` (before writing or changing any test, and for the focused checks you run).

Code the change reaches (find, don't take these as the full list): `src/browser/sim/game.ts` (`resurrectionReady`, new-character creation, `characterAfterDeath`, `settleDeath`, the solving function that appends to `solvedMaps`), `src/browser/sim/loop.ts` (`endLoopRun`, `passLoops`, `catchUp`, the away report line), `src/browser/sim/types.ts`, `src/browser/sim/saved-game.ts` (character document, `deathSettlement` kinds, `SAVED_GAME_VERSION`), `src/browser/sim/data/balance.ts`, `src/browser/view/team-lines.ts`, `src/browser/view/end-window-lines.ts`, the screens that call `resurrectionLine` (`character-screen.tsx`, `headquarters.tsx`, `maps-screen.tsx`, `game-view.ts`), `src/browser/view/away-report.ts`, and the tests under `tests/sim/` and `tests/view/` that mention a resurrection (about 25 files; `tests/sim/death.test.mjs`, `tests/sim/saved-game.test.mjs`, `tests/sim/loop.test.mjs`, `tests/sim/catch-up.test.mjs`, `tests/view/team-lines.test.mjs`, `tests/view/end-window-lines.test.mjs` and the headquarters, character-screen, maps-screen, account-screen and clock tests among them).

Language: code, identifiers, comments and docstrings in English; texts the game shows to the player in Polish, exactly as the task writes them (including „…” quotation marks and the wording of To do 7–10).

## Binding rules from the cycle

- Commit your work on the branch by explicit paths (`git add <path>…`, never `git add -A`/`.`/`commit -a`); commit messages in English in the style of the repository's existing commits (`type: :emoji: summary`).
- The foundation entries named in To do 12 and *Decisions in play* (D-190, D-220, D-240, D-217, D-329, D-216, D-386; the invariants `resurrection-renewal` and `catch-up-state`; the glossary entries `resurrection` and `generation number`) are written by you in this change through the element skills; the task gives each its change. Decide where the line about the renewal goes (D-216 or the decision of the window the search of the foundation finds fitting). Search the foundation once for entries the change touches as the foundation step gives, and fix in the same change any that no longer match.
- Raise `SAVED_GAME_VERSION` once (To do 11); keep the saved-game guidelines (a load that admits what the game's own functions make, D-386).
- Return, at the end, your status, commits, a one-line check result naming what failed or did not run, the report's path, your questions and concerns, each reach beyond this handoff, **Unread material** and **Searches not found or unclear** (each `none` or the items), and your own-work check, as `make-change` gives.
