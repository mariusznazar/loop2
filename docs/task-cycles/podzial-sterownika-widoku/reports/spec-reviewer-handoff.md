# Handoff — the reviewer of the spec (stage `write-spec`, the reviewer's role)

## Who asks and what you may decide

The person who requested this cycle delegated the intermediate choices to the orchestrator. You are a fresh agent that did not write the spec. You review it; you do not edit it, and you write no plan, slice or code and no commit.

## Worktree and method

- Worktree (work from its root): `the root of the task's worktree` (branch `task/podzial-sterownika-widoku`, base `9e13af95af4fa77445eccfe3e50a28e00c2adaf0`). The pinned the-way is `.the-way` of this worktree at `ec7929d02164c8754f0236d93db52624688967e6`.
- Method: read whole `.the-way/task-cycle/spec/SKILL.md` and follow it (variant: **review a spec as the reviewer**); read `review.md` beside it when its step comes.
- The spec to review: `.runs/task-cycles/podzial-sterownika-widoku/spec.md`; the designer's report (for what it read and its concerns): `.runs/task-cycles/podzial-sterownika-widoku/reports/spec-designer-report.md`.
- Frozen task (read whole): `.runs/task-cycles/podzial-sterownika-widoku/task-frozen.md`. Its handoff to the designer, which names the open choice and what was settled by the task: `.runs/task-cycles/podzial-sterownika-widoku/reports/spec-designer-handoff.md` (read the section "The task and the choice you settle" and "What to design").
- Report path: `.runs/task-cycles/podzial-sterownika-widoku/reports/spec-reviewer-report.md` (first line `PASS` or `FAIL` as `review.md` gives).
- Your directory for working copies: `.runs/spec-reviewer/`.

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


## What to read (the orchestrator's selection; foundation entries each whole) — the same as the designer's

- Part map: the entry `browser-view` of `foundations/part_map.md` (and the files list it gives).
- Decisions (`foundations/decisions.md`): D-03, D-04, D-07, D-28, D-36, D-173, D-207, D-208, D-211, D-212, D-250, D-264, D-265, D-267, D-280, D-281, D-282, D-283, D-284, D-287, D-295, D-311, D-322, D-323, D-324, D-339, D-346, D-351, D-368, D-370, D-371, D-383, D-395.
- Invariants (`foundations/invariants.md`): those whose *Part* names `browser-view` or `every` and that the decisions above link to or that a test of `tests/view/` cites by `invariant: <identifier>`; search by those words, and read each found whole.
- Glossary (`foundations/glossary.md`, short, whole): the terms the spec will use.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`. The styleguide `guidelines/styleguide-browser-view.md` is deliberately not named: the change shows the player nothing new.
- Code: `src/browser/view/game-view.ts` whole; `clock.ts`, `game-saver.ts`, `screen-address.ts`, `app.ts` (only how it uses `GameView`), `end-question.tsx`, `end-window.tsx`, `run-screen.tsx`, `character-screen.tsx`, `maps-screen.tsx`, `headquarters.tsx`, `program-panel.tsx`, `program-list.tsx`, `chronicle.ts`; the four tests through `createGameView` and the factory calls in the other `tests/view/*.test.mjs` as far as needed to see the input they use.

Where you need more, reach selectively as `SKILL.md` gives and name each reach in the report. Questions go to the orchestrator in your return (status `questions`); never to the human.

## What to check specially

The designer reported: the line numbers of the task differ from the code on the base (mapped in the spec); twelve test files call factories directly where the task counts eleven; the choice that the three modules get their own tests and the entry files do not; the reading of "actions that depend on time" as every action that today calls `clock.flush()` first, the game reset excluded; several call orders kept that no test pins. Check these against the code and the frozen task, and check that the spec keeps what the task settled (separate React roots, existing tests unchanged, the three settlement rows) and what the player sees (D-207, D-323, D-173, D-311, D-322, D-368, D-281, D-283, D-284, D-295, D-339).

## What to return

The report's first line, the report path, and in the report **Unread material**, **Searches not found or unclear** (each `none` where none), every reach beyond this handoff and the working copies line. You run no test or check.
