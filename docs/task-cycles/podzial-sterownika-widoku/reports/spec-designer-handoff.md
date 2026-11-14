# Handoff — the designer of the spec (stage `write-spec`, the designer's role)

## Who asks and what you may decide

The person who requested this cycle delegated the intermediate choices of the cycle to the orchestrator; the orchestrator
answers your questions from the task, its sources, the foundation and the code. No answer of the orchestrator is the
human's approval. You return at the boundary of the reviewed spec: no plan, no slice, no code, no commit of code.

## Worktree and method

- Worktree (work from its root): `the root of the task's worktree` (branch `task/podzial-sterownika-widoku`, base `9e13af95af4fa77445eccfe3e50a28e00c2adaf0`). Do not write outside it except your own files named below.
- Method: read whole `.the-way/task-cycle/spec/SKILL.md` and follow it (variant: **write the spec as the designer**); read `design.md` beside it when its step comes. The pinned the-way is `.the-way` of this worktree at `ec7929d02164c8754f0236d93db52624688967e6`.
- Spec path: `.runs/task-cycles/podzial-sterownika-widoku/spec.md`.
- Report path: `.runs/task-cycles/podzial-sterownika-widoku/reports/spec-designer-report.md`.
- Your directory for working copies: `.runs/spec-designer/`.

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

## The task and the choice you settle

- Frozen task (read whole): `.runs/task-cycles/podzial-sterownika-widoku/task-frozen.md`.
- Answers of step 4: touches a trust boundary — no; holds an irreversible operation — no; reserved choice — none.
- **The open design choice** — the task's *Questions carried to cycle*, word for word:
  > Granice trzech modułów i podział akcji dziś zebranych w `panelControls`, `mapsControls` i fabrykach ekranów między magazyn, rejestr i stan ekranu przejścia — wybór cyklu; karta D4 zakłada, że cykl napisze do tego specyfikację.
- The task already settles, and the spec must not reopen: separate React roots stay (*Questions to settle* 1); all existing test files pass without any change of their file, factories keep today's input `update(props)` and, for the screen Przejście, `setQuestion` and `setWindow` (2); the three *Settlements to record* rows; the *To do* items 1–5 and the *Acceptance criteria*; *Out of scope*.
- The line numbers of the task come from commit `2b4d760c`; on the base `src/browser/view/game-view.ts` has about 1300 lines, because „Odbierz”, the pull of the previous save and the reset of the game on the screen Programy came after it. Reconcile the task against the code on the base, name in the spec every place where the numbers or the shape differ, and keep the task's requirements. Do not widen the task.
- The user's argument for this cycle also says: the day's advisor decides when the full test gate starts. That concerns the orchestrator only, not your stage.

## What to design (the spec must answer, with the code of the base in view)

1. The three modules outside React — the store of the game state, the registry of screens, the state of the screen Przejście (the question „Zapisać, odrzucić, wrócić?", the end-of-run window, the window's wait for the scene's effect, the focus of a window opened before the game is put on the page): file names, exported functions and types, who owns what, who may import whom, so that `createGameView` stays the composition with the same `GameViewOptions` and `GameView` and `app.ts` does not change.
2. For each of the seven shared places the task lists (taking a simulation result, reading the clock, showing a screen, `screenHolder`, `renderScreens`, `shownElement`, `dispose`), and for the protocol „catch up the time, then act" (`clock.flush()` before each action): what replaces it, and what the one place is where a time-dependent action catches up time. Name the actions that must not catch up time (new character, purchase of a branch — task *To do* 1) and the new ones added since `2b4d760c` (pull, reset, „Odbierz”).
3. Where each action now gathered in `panelControls`, `mapsControls` and the screen factories goes.
4. The registry's entry: what one entry holds (how to build, how to refresh from the game state and the moment of the clock, how to remove, whether it lives constantly or only while the player is on it), what the screen Siedziba, Programy, Przejście (constant) and Postać, Mapy (on entry only) hold in it, the choice of the element that gets the keyboard focus, and the clean-up.
5. How the existing tests stay unchanged, in particular the four files through `createGameView` (`tests/view/account-screen.test.mjs`, `chronicle-game.test.mjs`, `end-question.test.mjs`, `end-window-game.test.mjs`) and the eleven that call the factories directly; check it against those files.
6. The new tests each new module gets (the level and the shape follow `guidelines/testing.md`), and the change of `guidelines/coding-browser-module.md` that the task's *To do* 5 asks for (the two examples and a row in the table for each new file, with its status).
7. Which foundation entries the change writes (the task's three *Settlements to record* rows: decisions; any change of the part map or glossary the change forces), or that it writes none beyond them, each with the reason.
8. How the change keeps what the player sees: D-207 save moments, D-323 rejection of results after `halt()`, D-173 / D-311 / D-322 / D-368 opening and closing of the question and the window, D-281 / D-283 / D-284 the behaviour on leaving and returning to the screen of a map run, D-295 / D-339 shared memory of the page. Give each a place in the design where it stays.
9. The order in which the change can be made and whether one author can hold it or it needs division (your recommendation; the orchestrator judges the route after the spec's review).

## What to read (the orchestrator's selection; foundation entries each whole)

- Part map: the entry `browser-view` of `foundations/part_map.md` (and the files list it gives).
- Decisions (`foundations/decisions.md`): D-03, D-04, D-07, D-28, D-36, D-173, D-207, D-208, D-211, D-212, D-250, D-264, D-265, D-267, D-280, D-281, D-282, D-283, D-284, D-287, D-295, D-311, D-322, D-323, D-324, D-339, D-346, D-351, D-368, D-370, D-371, D-383, D-395.
- Invariants (`foundations/invariants.md`): those whose *Part* names `browser-view` or `every` and that the decisions above link to or that a test of `tests/view/` cites by `invariant: <identifier>`; search by those words, and read each found whole.
- Glossary (`foundations/glossary.md`, short, whole): the terms the spec will use.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`. The styleguide `guidelines/styleguide-browser-view.md` is deliberately not named: the change shows the player nothing new.
- Code: `src/browser/view/game-view.ts` whole; `clock.ts`, `game-saver.ts`, `screen-address.ts`, `app.ts` (only how it uses `GameView`), `end-question.tsx`, `end-window.tsx`, `run-screen.tsx`, `character-screen.tsx`, `maps-screen.tsx`, `headquarters.tsx`, `program-panel.tsx`, `program-list.tsx`, `chronicle.ts`; the four tests through `createGameView` and the factory calls in the other `tests/view/*.test.mjs` as far as needed to see the input they use.

Where you need more, reach selectively as `SKILL.md` gives and name each reach in the report. Questions go to the orchestrator in your return (status `questions`); never to the human.

## What to return

Status (`questions`, `done` or `reserved`), the spec path, the report path, and in the report: **Unread material** and **Searches not found or unclear** (each `none` where none), every reach beyond this handoff, and the working copies line. No test or check result: you run none.
