# Handoff — the one author (stage `make-change`)

## Who asks and what you may decide

The person who requested this cycle delegated the intermediate choices to the orchestrator; no answer of the orchestrator is the human's approval. You make the whole change as the one author, without a plan. You return before any review; the orchestrator dispatches the reviewers and later resumes you for fixes and for the return step.

## Variant, worktree, method

- Variant of `make-change`, in the words of its row: **"the whole change as the one author"**.
- Method: read whole `.the-way/task-cycle/change/SKILL.md` and follow it; read a file it names, one beside it included, only when the step or variant that names it comes.
- Worktree (work from its root): `the root of the task's worktree`, branch `task/podzial-sterownika-widoku`, base `9e13af95af4fa77445eccfe3e50a28e00c2adaf0`. The pinned the-way is `.the-way` of this worktree at `ec7929d02164c8754f0236d93db52624688967e6`. The worktree has its dependencies installed (`npm ci` done). Commit on this branch; no other branch, no push.
- Foundation step: the change carries foundation entries (below), so read whole `.the-way/task-cycle/skill/foundation_step.md` and follow it for writing them; it points to the skill of each element. The return step is later and separate.
- Report path: `.runs/task-cycles/podzial-sterownika-widoku/reports/author-report.md`.
- Your directory for working copies: `.runs/author/`.

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

## What to make

- Frozen task (read whole): `.runs/task-cycles/podzial-sterownika-widoku/task-frozen.md`. The task is the authority.
- The reviewed spec (read whole; it binds your design): `.runs/task-cycles/podzial-sterownika-widoku/spec.md`. Its review (`PASS`): `reports/spec-reviewer-revision-report.md`; the first review's findings, fixed in it: `reports/spec-reviewer-report.md`. The spec's *Left to the maker* names what is yours.
- Answers of step 4: touches a trust boundary — no; holds an irreversible operation — no; open design choice — settled by the spec; reserved choice — none. The move of the pin carried no checks.
- The change fits one agent by the orchestrator's judgment; the spec's decision 11 gives an order of work that keeps every test passing at each step (store, then the state of Przejście, then the registry and the entries) — you may follow it as your own order. If the change proves too large for one agent, or you meet an open design choice the spec does not settle, return `returned` with no code, as `SKILL.md` gives.
- Two notes of the spec's reviewers to hold: copy `game-view.ts:686-705` (the `saveAndEnd` act with its guard) together; the closed import list of decision 1 names types one by one and leaves out a few inferred types such as `Screen` — a type-only import you write by hand is allowed, name it in the report, or have the registry re-export `Screen`.
- Keep the call orders the spec lists as kept (the clock's timer registered before the saver's, the run screen's three update calls in their current order, Postać built before Mapy): no test pins them, so only you and the review hold them.
- Every existing test file passes without any change of its file; do not edit any file under `tests/` that exists today. The new modules get the new test files the spec's decision 9 lists.
- Do not run the product's full gate (`npm test` with no argument): its run is the orchestrator's. Run the focused checks you need: one test file as `npm.cmd test <path-to-test-file>` (Windows; the runner builds first), `npm.cmd run typecheck`, and the quality tests that cover your new files (`tests/quality/`), each named in the report with its command and exit code.
- The guideline file `guidelines/coding-browser-module.md` changes as the spec's decision 10 gives.

## What to read (the orchestrator's selection; foundation entries each whole)

- Part map: the entry `browser-view` of `foundations/part_map.md`.
- Decisions (`foundations/decisions.md`): D-03, D-04, D-07, D-28, D-36, D-173, D-207, D-208, D-211, D-212, D-217, D-225, D-247, D-250, D-264, D-265, D-267, D-268, D-280, D-281, D-282, D-283, D-284, D-287, D-295, D-311, D-322, D-323, D-324, D-329, D-339, D-342, D-346, D-351, D-352, D-368, D-370, D-371, D-383, D-395, D-396, D-401, D-402, D-88, D-96, D-97.
- Invariants (`foundations/invariants.md`): those whose *Part* names `browser-view` or `every`, and those a test of `tests/view/` that you read cites by `invariant: <identifier>`; read each found whole. Glossary: `foundations/glossary.md` whole.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`. The styleguide is deliberately not named: the change shows the player nothing new. For the order of work in a user interface the skill mentions, this change touches no screen's look, so no state check with a screenshot applies; say so in the report.
- Code: what the spec names.

Where you need more, reach selectively as `SKILL.md` gives and name each reach in the report.

## Foundation entries you write (the task's *Settlements to record*, each through the skill of its element)

The spec's section *Foundation entries* lists them: three decisions (settlements 1, 2 and 3 of the task, in the words the task gives them, “osobny korzeń Reacta” rather than “wyspa” in the first), and no invariant, glossary term, environment fact or part-map change. Write them through `the-way-record-decision` (its method under `.the-way`), and run the foundation check on them as the method says. A question for the human that the foundation step leaves open: return `blocked` with it.

## What to return

Status, your commits, a one-line check result naming what failed or did not run, the report path; in the report each check with its command and exit code, the own-work check, the weakest-point check (the requirement named, the check, what it showed), **Unread material**, **Searches not found or unclear**, every reach, and the working copies line.
