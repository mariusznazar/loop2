# Handoff - executor of slice 6 (executor-6), task `podzial-trzech-miejsc`

The orchestrator of the cycle delegated every intermediate choice to itself; the person who requested the cycle is not asked during the cycle. Nothing you write is the human's approval.

## Where and what

- Worktree (work only from its root): `the worktree's root`, branch `task/podzial-trzech-miejsc`. The slice's base is `47ef5894`; the commits between it and your start are other agents' work, which you keep. `git rev-parse HEAD` when this handoff was written: `47ef5894`.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`) in that worktree. Your variant: "a slice, or the retry of a slice". Read that `SKILL.md` whole; a file it names, one beside it included, only when the step or variant that names the file comes.
- Frozen task (the passages your slice's *Read* names, from this file): `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md`. Plan: `.runs/task-cycles/podzial-trzech-miejsc/plan.md` (your slice's section is copied below word for word; where the plan's ranges of a foundation entry differ from the current ones given below, the current ones hold). No spec.
- Answers of step 4 of the cycle: trust boundary - yes, in a limited sense (the call sites in `startApp` of `src/browser/view/screen-address.ts`, `src/browser/view/email-confirmation.ts` and `src/browser/view/password-reset.ts`; the files themselves are not changed); irreversible operation - no.
- Your directory for working copies: `.runs/executor-6/` (directly under the ignored `.runs/` of the worktree). Report path: `.runs/task-cycles/podzial-trzech-miejsc/reports/executor-6-report.md`.
- You run the slice's focused checks (its *Checks*), never the product's full gate (`npm test` with no path): the gate is the orchestrator's, run after a signal of the human's adviser. Your own-work check, the commands and exit codes of every check, **Unread material**, **Searches not found or unclear** and the line on your working copies stand in the report as the method gives them. Commit your work on the branch with a message in English in the style of the repository's history, adding files by path (never `git add -A`, `git add .` or `git commit -a`).
- Code in English (identifiers, comments); Polish only in what the code shows to the player or matches on.

Working copies (word for word from the cycle's rule): An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Current state of the foundation (the foundation entries moved)

The agent of the plan's *Foundation entries* committed `8ca21555`, which changes D-323 in `foundations/decisions.md` (it adds a paragraph and lines to *Relations*, *Verification*, *Rationale* and *Rejected*: from line 4616 on, `foundations/decisions.md` stands 2 lines lower than the plan's ranges say). Find a decision by its heading `### D-<n>` and read it whole; the ranges of the plan were measured on `fc6e0046`. `foundations/invariants.md`, the part map and the guidelines are unchanged since the base unless your slice's own text says otherwise.

## Extra notes of the orchestrator for this slice

- The foundation commit `8ca21555` changed D-323: read its new third paragraph whole; it is the source of your change and binds where this slice's goal differs from it (return `questions`/`returned` then, as the goal says). Its start, for the test's citation: "After an error that no code of the game handled, whether the end-of-run window is open stays a memory of the page as D-371 gives it". The agent that wrote it also added to D-323's *Verification* temporary examples of what complies and what violates the paragraph; the return step removes them once a test of this slice holds the paragraph, so your changed test must carry a `decision: D-323` line in the form `guidelines/testing.md` gives, quoting the start of that sentence exactly (the foundation check verifies the citations of tests).
- The invariant `uncaught-failure-game-state` is not cited by `tests/view/run-screen-state.test.mjs`; it is cited by `tests/view/state-store.test.mjs:356` and `tests/view/uncaught-failure.test.mjs:353`, `:441`, `:800`. Change nothing in those; run them.
- Two comments become false by your change and you fix them (comment-only edits, no change of any expectation, so acceptance criterion 1 is kept): the comments of the interface in `src/browser/view/run-screen-state.ts` around lines 77-85 that say „Koniec przejścia” and the end of the scene's effect do nothing after halt, and the comment above the case "after halt() the window's buttons change nothing" in `tests/view/end-window-game.test.mjs` (around line 1219, "Catches a window that still opens and closes after an error nothing handled"). The second file is not in the plan's *Change*; this ruling of the orchestrator adds it for the comment alone, and the case's body and expectation stay exactly as they are.
- Run the focused view tests of your *Checks* once on the unchanged tree before you change anything, to know which passed.
- The test first: change the guard case "after halt the question, the window and the wait change nothing, while entering and leaving go on" of `tests/view/run-screen-state.test.mjs` to the new expectation, run it and see it fail (record the command, exit code and the failing assertion), then change the code and see it pass.
- `src/browser/view/app.ts`, `state-store.ts` and the files the split slices created are not changed in this slice (the plan says so); where you find the change needs one, stop and return.
- Edge to think through and report on: „Koniec przejścia” after the error when a question stands (D-371: the window does not stand beside a question) and when the window was closed by „✕” before the error (it reopens at „Koniec przejścia”, per D-323's new paragraph); and the wait of the window for the scene's effect (D-322) when the error comes during the wait.


## Your slice's section of the plan (copied word for word)

### Slice 6 — the end-of-run window after an error no code of the game handled

- **Goal:** To do 8, the one change of behaviour of the task, in a commit of its own apart from the split, to D-323 and `uncaught-failure-game-state` as rows 3 and 4 of *Foundation entries* wrote them before Slice 1: after an error that no code of the game handled, the game halted, the end-of-run window opens of itself at the end of the scene's effect of a death or a completion, and „Koniec przejścia” opens it, as before the error, since whether the window is open is a memory of the page and not of the game state; the game state and saving stay as D-323 gives them. The places are the two guards the task names in `src/browser/view/run-screen-state.ts`, of `openWindow` and of `effectEnded`, and the comments of the module's interface that say they do nothing after halt. Everything else keeps its behaviour after halt, as the tests that this slice does not change hold it: „✕” and Escape change nothing (the case "after halt() the window's buttons change nothing" of `tests/view/end-window-game.test.mjs` stays as it is, acceptance criterion 1), the question „Zapisać, odrzucić, wrócić?” stays (`closeQuestion` and `ask` change nothing), so „Koniec przejścia” with a question standing after the error leaves the question and the window does not stand beside it (D-371), and no act of the player changes the state. Where the changed D-323 says otherwise than this paragraph, the decision binds and the agent returns with the difference instead of choosing. First the failing test: the guard case "after halt the question, the window and the wait change nothing, while entering and leaving go on" of `tests/view/run-screen-state.test.mjs` takes the new expectation for the window and the wait — the end of the effect after halt shows the window, „Koniec przejścia” after halt opens a window „✕” closed before the error, „✕” after halt and the question as before — with the changed D-323 as the case's source, and is seen failing; then the code makes it pass. `src/browser/view/app.ts` and `src/browser/view/state-store.ts`, which the task names as places, only make the halt and do not change in this slice, nor does any code the split slices moved; where the agent finds the change needs another file, it stops and returns.
- **Change:** `src/browser/view/run-screen-state.ts` · `tests/view/run-screen-state.test.mjs`
- **Read:** `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:18-39` Need, To do and Acceptance criteria ·
  `foundations/decisions.md:4613-4629` D-323, as row 3 of *Foundation entries* changed it · `foundations/decisions.md:10061-10189` D-311 ·
  `foundations/decisions.md:10528-10546` D-371 · `foundations/decisions.md:10444-10478` D-368 ·
  `foundations/decisions.md:10502-10527` D-370 · `foundations/decisions.md:11341-11407` D-322 ·
  `foundations/decisions.md:10190-10210` D-324 · `foundations/decisions.md:8111-8142` D-173 ·
  `foundations/decisions.md:4645-4661` D-407 ·
  `foundations/invariants.md:1218-1227` uncaught-failure-game-state, as row 4 of *Foundation entries* left it ·
  `foundations/invariants.md:1408-1417` function-and-file-size ·
  `foundations/part_map.md:3-32` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/run-entry.ts` · `src/browser/view/state-store.ts` ·
  `tests/view/end-window-game.test.mjs:1200-1229`
- **Model:** same - the one change of behaviour of the task, test first, bound to the changed D-323; its follow-through (comments made false, the citation of the decision) asks for more care than a mechanical move (class raised by the orchestrator, WAY-229)
- **Risk:** none
- **Checks:** `npm test -- tests/view/run-screen-state.test.mjs` fails on the guard case after the change of the test and before the change of the code, and passes after it ·
  `npm test -- tests/view/end-window-game.test.mjs` · `npm test -- tests/view/run-screen.test.mjs` ·
  `npm test -- tests/view/end-question.test.mjs` · `npm test -- tests/view/uncaught-failure.test.mjs` ·
  `npm test -- tests/view/state-store.test.mjs` · `npm run typecheck` ·
  `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view/run-screen-state.ts tests/view/run-screen-state.test.mjs` ·
  `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/run-screen-state.ts tests/view/run-screen-state.test.mjs` ·
  `node tests/quality/eslint-size-rules.mjs` prints no line ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 5 · D-323 and uncaught-failure-game-state, rows 3 and 4 of *Foundation entries*


## Return

Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`, as the method gives them), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds, besides what the method asks, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`) and the line on your working copies.
