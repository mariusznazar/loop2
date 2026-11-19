# Handoff - executor of slice 2 (executor-2), task `podzial-trzech-miejsc`

The orchestrator of the cycle delegated every intermediate choice to itself; the person who requested the cycle is not asked during the cycle. Nothing you write is the human's approval.

## Where and what

- Worktree (work only from its root): `the worktree's root`, branch `task/podzial-trzech-miejsc`. The slice's base is `9885485c`; the commits between it and your start are other agents' work, which you keep. `git rev-parse HEAD` when this handoff was written: `9885485c`.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`) in that worktree. Your variant: "a slice, or the retry of a slice". Read that `SKILL.md` whole; a file it names, one beside it included, only when the step or variant that names the file comes.
- Frozen task (the passages your slice's *Read* names, from this file): `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md`. Plan: `.runs/task-cycles/podzial-trzech-miejsc/plan.md` (your slice's section is copied below word for word; where the plan's ranges of a foundation entry differ from the current ones given below, the current ones hold). No spec.
- Answers of step 4 of the cycle: trust boundary - yes, in a limited sense (the call sites in `startApp` of `src/browser/view/screen-address.ts`, `src/browser/view/email-confirmation.ts` and `src/browser/view/password-reset.ts`; the files themselves are not changed); irreversible operation - no.
- Your directory for working copies: `.runs/executor-2/` (directly under the ignored `.runs/` of the worktree). Report path: `.runs/task-cycles/podzial-trzech-miejsc/reports/executor-2-report.md`.
- You run the slice's focused checks (its *Checks*), never the product's full gate (`npm test` with no path): the gate is the orchestrator's, run after a signal of the human's adviser. Your own-work check, the commands and exit codes of every check, **Unread material**, **Searches not found or unclear** and the line on your working copies stand in the report as the method gives them. Commit your work on the branch with a message in English in the style of the repository's history, adding files by path (never `git add -A`, `git add .` or `git commit -a`).
- Code in English (identifiers, comments); Polish only in what the code shows to the player or matches on.

Working copies (word for word from the cycle's rule): An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Current state of the foundation (the foundation entries moved)

The agent of the plan's *Foundation entries* committed `8ca21555`, which changes D-323 in `foundations/decisions.md` (it adds a paragraph and lines to *Relations*, *Verification*, *Rationale* and *Rejected*: from line 4616 on, `foundations/decisions.md` stands 2 lines lower than the plan's ranges say). Find a decision by its heading `### D-<n>` and read it whole; the ranges of the plan were measured on `fc6e0046`. `foundations/invariants.md`, the part map and the guidelines are unchanged since the base unless your slice's own text says otherwise.

## Extra notes of the orchestrator for this slice

- This slice and the next one divide `startApp` in `src/browser/view/app.ts`. No other task may be changing the files of `src/browser/view/` in parallel; do not touch any file the plan's *Change* does not list for your slice.
- Before you move any code, run the focused view tests named in your *Checks* once on the unchanged tree and note which pass, so that a later failure can be told from one that was already there.
- Where a view test fails after your move and you cannot tell from the code why, do not change the test's expectation: the acceptance criterion forbids it. Return with the failure.
- Slice 1 changed `src/browser/kitchen-sink/` and the styleguide only; nothing of it bears on your files.


## Your slice's section of the plan (copied word for word)

### Slice 2 — the drawing of the start page in a module of its own

- **Goal:** The drawing of the start page moves out of `startApp` in `src/browser/view/app.ts` into a new module `src/browser/view/page-places.ts`, with no change of behaviour: the types of what the page shows (`PageState`, `GamePage`, `Logout`, `Reset`), what the bar is given in a state (`barPropsOf`, `sameBarProps`, `NAME_ALONE`, `NO_SENTENCES`), and a factory that builds the places of the page — the header with the menu bar and the row of the failure (drawn at the start, hidden), and `main` with the page's sentences and the waiting screen — and holds what the page shows and what the bar and the row of sentences were last given, with the one change of what the page shows (`release`, `mainContent`, `drawMain`, `draw`, `change`) and the reading of the game the page holds (`gameOf`). The factory takes from the page what the places call back (the bar's logout and the waiting screen's retry) and gives the page what it reads and calls: the current value, `change`, `gameOf`, the row of the failure, the waiting screen's focus of its retry where the page needs it, and the header and `main` to append to the root. The order of the elements in the document, the moment each root is drawn and the order of the steps of `change` stay as they are (D-262, D-381, D-407). No call of `screen-address.ts`, `email-confirmation.ts` or `password-reset.ts` moves in this slice: they stay in `startApp`, and where the agent finds it has to move one, it stops and returns. Measured at the base, the types and the bar's props hold about 60 lines of code of `app.ts` and the places and the drawing about 90 of `startApp`, so `page-places.ts` holds about 160 and `startApp` comes to about 360: it stays over the threshold, and the mark and the comment of `test_no_function_and_no_file_is_over_a_threshold` stay as they are. The descriptions of `guidelines/coding-browser-module.md` that name what this slice moves — that the page (`app.ts`) builds the header and `main` (rule "Nowy ekran i moduły w DOM"), that `app.ts` creates the bar and the waiting screen in `startApp` (examples "Pasek menu w Reactcie" and "Kontrolki i ich aktualizacja"), and that `change` closes and draws (example "Gra na stronie i odpowiedzi serwera") — say where the code stands after the slice (To do 7); no other sentence changes, and the table "Files of this kind" gets no row (task *Out of scope*).
- **Change:** `src/browser/view/app.ts` · `src/browser/view/page-places.ts` · `guidelines/coding-browser-module.md`
- **Read:** `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:24-39` To do and Acceptance criteria ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:71-85` Context and Questions carried to cycle ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:106-108` Out of scope ·
  `foundations/decisions.md:822-840` D-425 · `foundations/decisions.md:4645-4661` D-407 ·
  `foundations/decisions.md:4263-4310` D-265 · `foundations/decisions.md:3139-3189` D-262 ·
  `foundations/decisions.md:3215-3227` D-381 ·
  `foundations/decisions.md:4613-4629` D-323, as row 3 of *Foundation entries* changed it ·
  `foundations/decisions.md:4402-4471` D-280 · `foundations/decisions.md:4592-4612` D-286 ·
  `foundations/invariants.md:1408-1417` function-and-file-size ·
  `foundations/invariants.md:1218-1227` uncaught-failure-game-state ·
  `foundations/invariants.md:408-417` eslint-source-rules · `foundations/invariants.md:438-447` prettier-source-format ·
  `foundations/part_map.md:3-32` browser-view ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/menu-bar.tsx:35-101` · `src/browser/view/waiting-screen.tsx` ·
  `src/browser/view/page-sentences.tsx` · `src/browser/view/header-rows.tsx` ·
  `src/browser/view/game-view.ts:95-172` · `src/browser/view/account-card.tsx:56-109`
- **Model:** same - moving closures that share mutable page memory out of `startApp`, where the tests of `tests/view/` cover the behaviour only in part, asks for more care than a mechanical move (class raised by the orchestrator in the plan's review, WAY-229)
- **Risk:** none
- **Checks:** `npm run typecheck` ·
  `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view/app.ts src/browser/view/page-places.ts` ·
  `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/app.ts src/browser/view/page-places.ts` ·
  `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/login-card-focus.test.mjs` ·
  `npm test -- tests/view/owner-panel.test.mjs` · `npm test -- tests/view/previous-save.test.mjs` ·
  `npm test -- tests/view/uncaught-failure.test.mjs` · `npm test -- tests/view/menu-bar.test.mjs` ·
  `node tests/quality/eslint-size-rules.mjs` names nothing of `page-places.ts`, names `startApp` with fewer lines than 449, and no place the base did not name ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** none


## Return

Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`, as the method gives them), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds, besides what the method asks, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`) and the line on your working copies.
