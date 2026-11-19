# Handoff - agent of the plan's *Foundation entries* (rows 3 and 4), task `podzial-trzech-miejsc`

The orchestrator of the cycle delegated every intermediate choice to itself; the person who requested the cycle is not asked during the cycle. Nothing you write is the human's approval, and the request puts what you write before the human.

## Where and what

- Worktree (work only from its root): `the worktree's root`, branch `task/podzial-trzech-miejsc`, base `fc6e0046` (HEAD now).
- Stage: the foundation step of the task cycle for the two entries below. Your handoff names `.the-way/task-cycle/skill/foundation_step.md`; read it whole, and read the `SKILL.md` of an element (`.the-way/elements/decisions/skill/SKILL.md` for the decision, `.the-way/elements/invariants/skill/SKILL.md` for the invariant) when you write an entry of that element, with the files that `SKILL.md` names when its step comes. A skill that those files name by its name alone you read as a file (you have no skill tool). You take no row of `make-change`'s table of variants; your stage is the foundation step. You change only `foundations/decisions.md` and `foundations/invariants.md`; no code, test or guideline.
- Frozen task (read whole): `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md`; your entries come from its *To do* 8 and its *Decisions in play*. Plan (read the sections *Foundation entries*, *Choices*): `.runs/task-cycles/podzial-trzech-miejsc/plan.md`. No spec.
- Your commit: one commit (or two, one for each entry) of your own, apart from any code, with a message in English in the style of the repository's history (`docs: :card_file_box: ...`). Add files by path, never `git add -A`. Commit nothing else.
- Your directory for working copies: `.runs/foundation/`. Report path: `.runs/task-cycles/podzial-trzech-miejsc/reports/foundation-report.md`.
- You run focused checks only, never the product's gate (`npm test`): `python -B .the-way/elements/common/foundation_check.py` after your edit, with its command and exit code in the report.

Working copies (word for word from the cycle's rule): An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## The entries (copied word for word from the plan's *Foundation entries*)

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| D-323, its sentence on what gives way after an error no code of the game handled, agreed with D-311 and D-371: whether the end-of-run window is open is a memory of the page, so the window still opens after the error, at the end of the scene's effect and by „Koniec przejścia” (the choice of the window's reach is in *Choices*) | decision, changed through `the-way-record-decision` | To do 8 | Slice 6; written by the agent of these entries before Slice 1, in a commit of its own apart from the split |
| `uncaught-failure-game-state`, agreed with the changed D-323, changed only where its wording no longer holds; check: `tests/view/run-screen-state.test.mjs`, the guard case "after halt the question, the window and the wait change nothing, while entering and leaving go on", and `tests/view/uncaught-failure.test.mjs` | invariant, through `the-way-record-invariant` | To do 8 | Slice 6; written with D-323 by the agent of these entries before Slice 1 |

The plan's row says `Slice 6`, which makes the code of this entry's change later; D-323 is written now, before its code, as every entry written before its code is.

## The choice that fixes what the window does after the error (copied word for word from the plan's *Choices*, with the orchestrator's ruling)

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| To do 8 opens the window after the error by the end of the scene's effect and by „Koniec przejścia” only — the two guards the task names, `openWindow` and `effectEnded`; „✕”, Escape and the question keep what they do after the error | „✕” and Escape closing the window after the error too, as a memory of the page | The window could stand after the error with no way to close it but a reload, which the sentence of D-323 asks for anyway; closing it too would change the expectation of `tests/view/end-window-game.test.mjs` "after halt() the window's buttons change nothing", which acceptance criterion 1 does not allow |

Orchestrator's ruling (autonomous choice Q4 of the cycle record, source: the task's acceptance criterion 1 and `tests/view/end-window-game.test.mjs:1218-1229`): after an error no code of the game handled, (a) the end-of-run window opens of itself at the end of the scene's effect of a death or a completion, and „Koniec przejścia” opens it, since whether the window is open is a memory of the page (D-371, D-407); (b) „✕” and Escape of the window, and the question „Zapisać, odrzucić, wrócić?”, keep what D-323 already gives them after the error (nothing is closed or asked: the guards of `closeWindow`, `ask` and `closeQuestion` stay); (c) the game state and saving stay as D-323 gives them. So after the error the window, once open, stays until the page is reloaded. Write that, in the decision's sentence and in its rationale, with the way rejected (letting „✕” close it too) and the cost. This is a choice the human may reverse, so write it plainly enough to be found and reversed.

## What binds your writing

- D-323 changes an approved decision: the task's *To do* 8 carries the change (its sentence agreed with D-311 and D-371) and nothing wider. Write no change to D-311 or D-371 unless a word of them would otherwise contradict the changed D-323 as written; where it would, return `blocked` with the contradiction instead of editing them. Where the change would alter the meaning of an approved decision beyond what the task carries, return `blocked` with the question.
- Mark each entry `the cycle's` in your report (no row of *Settlements to record* carries it; the task's *To do* 8 does), with one sentence of its meaning in English and one in Polish, as the foundation step gives.
- The invariant `uncaught-failure-game-state`: change it only where its wording no longer holds after the changed D-323; say in your report which words changed or that none did, and keep its *Method*, check and *Rests on* true (its check is `tests/view/run-screen-state.test.mjs` and `tests/view/uncaught-failure.test.mjs`; do not change those tests; a later slice does).
- Writing: English in the entries as the log is written; Polish stays in what the game shows the player (quoted sentences, button names).

## What to read (selected by the orchestrator)

- Decisions by identifier, each whole: D-323, D-311, D-371, D-407, D-368, D-370, D-322, D-324, D-173; the `Rejected` of D-323.
- Invariants: `uncaught-failure-game-state`; search `foundations/invariants.md` by *Part* `browser-view` for any other that speaks of the window after an error.
- The part map entry of `browser-view` and `product-foundation`; the glossary entries of the terms you use (`foundations/glossary.md`).
- Code, for comparison: `src/browser/view/run-screen-state.ts` (the guards around lines 225, 234, 241), `src/browser/view/state-store.ts`, `src/browser/view/app.ts` around the handling of an error that nothing handled, `tests/view/run-screen-state.test.mjs` and `tests/view/end-window-game.test.mjs` around the halt cases.
- An index of the decisions of the sections of `browser-view` and `build-tools` stands in `.runs/orchestrator/index.md` (locates decisions only).

## Return

Return your status (`done`, `done with concerns`, `questions` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds, besides the entries and their marks: **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), and the line on your working copies.
