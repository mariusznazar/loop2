# Handoff - executor of slice 4 (executor-4), task `podzial-trzech-miejsc`

The orchestrator of the cycle delegated every intermediate choice to itself; the person who requested the cycle is not asked during the cycle. Nothing you write is the human's approval.

## Where and what

- Worktree (work only from its root): `the worktree's root`, branch `task/podzial-trzech-miejsc`. The slice's base is `26c650cc`; the commits between it and your start are other agents' work, which you keep. `git rev-parse HEAD` when this handoff was written: `26c650cc`.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`) in that worktree. Your variant: "a slice, or the retry of a slice". Read that `SKILL.md` whole; a file it names, one beside it included, only when the step or variant that names the file comes.
- Frozen task (the passages your slice's *Read* names, from this file): `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md`. Plan: `.runs/task-cycles/podzial-trzech-miejsc/plan.md` (your slice's section is copied below word for word; where the plan's ranges of a foundation entry differ from the current ones given below, the current ones hold). No spec.
- Answers of step 4 of the cycle: trust boundary - yes, in a limited sense (the call sites in `startApp` of `src/browser/view/screen-address.ts`, `src/browser/view/email-confirmation.ts` and `src/browser/view/password-reset.ts`; the files themselves are not changed); irreversible operation - no.
- Your directory for working copies: `.runs/executor-4/` (directly under the ignored `.runs/` of the worktree). Report path: `.runs/task-cycles/podzial-trzech-miejsc/reports/executor-4-report.md`.
- You run the slice's focused checks (its *Checks*), never the product's full gate (`npm test` with no path): the gate is the orchestrator's, run after a signal of the human's adviser. Your own-work check, the commands and exit codes of every check, **Unread material**, **Searches not found or unclear** and the line on your working copies stand in the report as the method gives them. Commit your work on the branch with a message in English in the style of the repository's history, adding files by path (never `git add -A`, `git add .` or `git commit -a`).
- Code in English (identifiers, comments); Polish only in what the code shows to the player or matches on.

Working copies (word for word from the cycle's rule): An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Current state of the foundation (the foundation entries moved)

The agent of the plan's *Foundation entries* committed `8ca21555`, which changes D-323 in `foundations/decisions.md` (it adds a paragraph and lines to *Relations*, *Verification*, *Rationale* and *Rejected*: from line 4616 on, `foundations/decisions.md` stands 2 lines lower than the plan's ranges say). Find a decision by its heading `### D-<n>` and read it whole; the ranges of the plan were measured on `fc6e0046`. `foundations/invariants.md`, the part map and the guidelines are unchanged since the base unless your slice's own text says otherwise.

## Extra notes of the orchestrator for this slice

- This slice makes the last place go under the threshold and takes the expected-failure mark and its comment off the size test, in its same commit (task point 6, first half). Where the size run still names any place after your division, leave the mark and the comment as they are and return with what the run printed.
- `tests/quality/test_function_and_file_size.py:146` has a comment that names `kitchen-sink.tsx` (slice 1 divided that file); the comment above the expected failure is removed with the mark, so nothing of that comment should be left naming a place. Read the whole test file before you edit it.
- Slices 2 and 3 changed `app.ts` and added `page-places.ts` and `page-game-acts.ts`; none of it touches `programs-entry.ts`, `game-view.ts` or the screen registry.
- Run the focused view tests of your *Checks* once on the unchanged tree before you move code, to know which passed.
- D-323 now says (commit `8ca21555`) that after an error no code handled the end-of-run window opens and stays; the code that does it is slice 6's. In Programy, after `halt()` nothing is done by the pull or the reset, as before.


## Your slice's section of the plan (copied word for word)

### Slice 4 — createProgramsEntry under the threshold, and the size test without its mark

- **Goal:** `createProgramsEntry` (245 lines of code at the base) and its method `build` (225) in `src/browser/view/programs-entry.ts` hold at most 200 lines of code each, aiming at about 170 or fewer, with no change of behaviour: the pull of the previous save as Programy holds it (the value `pull`, the numbering of questions and pulls `pullAsk`, `askPrevious`, `pullPrevious`, `answerPull`, `setPull` and the pull's part of leaving Programy) moves to a new module `src/browser/view/programs-pull.ts`, and the memory of the reset control (`ResetState`, `resetViewOf`, `setResetState`, `askReset`, `withdrawReset`, `confirmReset`, and the reset's part of leaving Programy and of `setReset`) to a new module `src/browser/view/programs-reset.ts`. Each is a factory of a memory of the page outside React (D-401, D-402, D-407), which `build` makes and from which it draws the list as it does today: a question asked on entering Programy, an answer after `dispose()`, after leaving or after a later question or pull ignored, the act of the pull taken through the store, and nothing done after `halt()`, all as before. The options of the entry and its type `ProgramsEntry` do not change, so `src/browser/view/game-view.ts` does not change. Measured at the base, the pull holds about 70 lines of code of `build` and the reset control about 35, so `build` comes to about 130 and `createProgramsEntry` to about 150. This is the slice in which the run of the size rule stops reporting anything, so it carries the test's part of To do 6: once the code is divided, `node tests/quality/eslint-size-rules.mjs` prints no line and ends with `0 functions and files over a threshold`; then, in the same slice and its same commit, `@unittest.expectedFailure` goes from `test_no_function_and_no_file_is_over_a_threshold` in `tests/quality/test_function_and_file_size.py` together with the comment above it that names the places („Expected failure while code stands over a threshold…”), so that no commit holds the test failing without its mark or the mark on a passing test. The invariant `function-and-file-size` is not this slice's: Slice 5 sets it. Where the run still names any place — one of the task's three, or another — the mark and the comment stay as they are and the slice returns with what the run printed: a place other than the task's three is for the orchestrator to judge by To do 5, never for this slice to divide.
- **Change:** `src/browser/view/programs-entry.ts` · `src/browser/view/programs-pull.ts` · `src/browser/view/programs-reset.ts` · `tests/quality/test_function_and_file_size.py`
- **Read:** `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:24-39` To do and Acceptance criteria ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:49-54` Questions to settle, question 2 ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:64-69` Questions to settle, question 5 ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:71-85` Context and Questions carried to cycle ·
  `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:106-108` Out of scope ·
  `foundations/decisions.md:822-840` D-425 · `foundations/decisions.md:4169-4185` D-400 ·
  `foundations/decisions.md:4186-4200` D-401 · `foundations/decisions.md:4201-4217` D-402 ·
  `foundations/decisions.md:4035-4076` D-211 · `foundations/decisions.md:4645-4661` D-407 ·
  `foundations/decisions.md:4613-4629` D-323, as row 3 of *Foundation entries* changed it ·
  `foundations/invariants.md:1408-1417` function-and-file-size ·
  `foundations/invariants.md:1218-1227` uncaught-failure-game-state ·
  `foundations/invariants.md:998-1007` expired-session-unsaved-progress ·
  `foundations/invariants.md:408-417` eslint-source-rules · `foundations/invariants.md:438-447` prettier-source-format ·
  `foundations/part_map.md:3-32` browser-view · `foundations/part_map.md:90-125` build-tools ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/program-list.tsx:39-102` · `src/browser/view/screen-registry.ts:22-129` ·
  `src/browser/view/game-view.ts:205-225` · `src/browser/view/previous-save-lines.ts` ·
  `src/browser/view/state-store.ts:59-102` · `tests/quality/eslint-size-rules.mjs`
- **Model:** same - moving the pull and the reset control, which keep a numbering of questions and ignore late answers, out of `build` without a change of behaviour asks for more care than a mechanical move; it also takes off the expected-failure mark (class raised by the orchestrator in the plan's review, WAY-229)
- **Risk:** none
- **Checks:** `npm run typecheck` ·
  `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view/programs-entry.ts src/browser/view/programs-pull.ts src/browser/view/programs-reset.ts` ·
  `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/programs-entry.ts src/browser/view/programs-pull.ts src/browser/view/programs-reset.ts` ·
  `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/view/program-list.test.mjs` ·
  `npm test -- tests/view/program-panel.test.mjs` · `npm test -- tests/view/screen-registry.test.mjs` ·
  `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/uncaught-failure.test.mjs` ·
  `node tests/quality/eslint-size-rules.mjs` prints no line and ends with `0 functions and files over a threshold` ·
  `npm test -- tests/quality/test_function_and_file_size.py` passes both cases, with no expected failure and no unexpected success ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 1 · Slice 3


## Return

Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`, as the method gives them), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds, besides what the method asks, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`) and the line on your working copies.
