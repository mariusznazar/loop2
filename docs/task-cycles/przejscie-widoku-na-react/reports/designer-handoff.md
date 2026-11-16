# Handoff — designer of the spec

**Stage:** the designer of the spec, `write-spec`. You write `spec.md`; you write no plan and no code, and you change no file of the repository.

**Delegation:** the human who requested this cycle delegated every intermediate choice to the orchestrator; there is no human to ask during the cycle. Your questions go to the orchestrator, who answers them from the task, its sources, the foundation and the code. Nothing the orchestrator answers is the human's approval.

**Worktree:** `the task's worktree` (branch `task/przejscie-widoku-na-react`, base `d850f76063c1f7a302b89d0b89e1fca72682be6d`). Work from its root. `.the-way` there is at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the commit the repository pins.

**Method:** read `.the-way/task-cycle/spec/SKILL.md` whole and follow it as the designer's variant; read a file it names only when the step that names it comes. You have no skill tool: it is a file you read.

**Frozen task (read whole):** `docs/task-cycles/przejscie-widoku-na-react/task.md`. Its *Status* is `ready for cycle`, its *Project relation* is `independent`, its *Human actions* are `none`.

**Answers of step 4 of the cycle:**
- Trust boundary: yes — `scripts/kitchen-sink.mjs` is a trust-boundary file of the part `build-tools`. The spec must say how the change leaves its lines that serve files unchanged (D-269, D-76) and which review checks that.
- Irreversible operation: no.
- Open design choice (why you were dispatched): the task's *Questions carried to cycle* — where the sentence „Coś w grze się zepsuło — odśwież stronę.” stands, after the start page is drawn by React in roots of its own, so that an error in any root does not take it down (D-323 settles where the player sees it, not the way) — and, beside it, the shape of the one value of the page's state in `startApp` (item 3 of *To do*), the roots of the start page and their order, and the way `scripts/kitchen-sink.mjs` bundles the page (item 1 of *To do*). Settlements already made are not open: the answers to questions 1–6 and the three rows of *Settlements to record* of the task bind you. No reserved choice is open: the bundle uses esbuild, which `scripts/build.mjs` already uses; a new library, framework or store is not yours to choose, and where the spec seems to need one, return `reserved`.

**Where to write:**
- the spec: `docs/task-cycles/przejscie-widoku-na-react/spec.md`
- your report: `docs/task-cycles/przejscie-widoku-na-react/reports/designer-report.md`
- your working copies, if you make any: `.runs/designer/` (see the paragraph below)

**What to read (the orchestrator selected it; do not read the whole log):**
- Decisions of `foundations/decisions.md`, each whole from its heading to the next heading, with its rationale and *Rejected*: D-03, D-44, D-45, D-47, D-76, D-253, D-259, D-262, D-265, D-269, D-280, D-281, D-286, D-323, D-395, D-407, D-408, D-96, D-97, D-208, D-209, D-211, D-225, D-261, D-285, D-402, D-156, D-157, D-356, and any other decision whose *Scope* names `browser-view` or `build-tools` and whose subject is the start page, the shared controls, the kitchen-sink page or the waiting screen. The task's *Decisions in play* quotes the binding sentences of the ones it names; the decision itself is the source, not the quotation.
- The invariants of `foundations/invariants.md` whose *Part* names `browser-view`, `build-tools` or `every` and that concern the browser view, the kitchen-sink page, the controls or the last-resort handling, and the entries they link to; the glossary entries of the terms you use; the part map entries `browser-view`, `build-tools`, `agent-workflow`.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`.
- Code you need for the design (read excerpts of what you need; the files in the task's *Description*): `src/browser/view/app.ts`, `game-saver.ts`, `email-confirmation.ts`, `last-resort.ts`, `account-card.tsx` (`createFailureCard` and the sentence's component), `menu-bar.tsx`, `game-view.ts`, `state-store.ts`, `src/browser/view/controls/`, `scripts/kitchen-sink.mjs`, `scripts/build.mjs`, `src/browser/kitchen-sink/`, `tsconfig.kitchen-sink.json`, `tests/view/uncaught-failure.test.mjs`, `tests/view/react-controls.test.mjs`, and the tests that call `startApp`.

**What the spec must carry, beyond what the method gives:** the design choices above, each with the ways open, the way chosen and the cost if it is wrong; for every item 1–8 of *To do*, where in the code it shows and what stays untouched; the tests the change needs and which existing tests change and on what ground (the testing guidelines' rule on changing a test); the foundation entries the change writes or changes (D-265 and D-269 by settlements 1 and 2, the roots of settlement 3, what else the search of the foundation finds) as a list, not written by you. Stay within the task: its *Out of scope* binds you.

**Working copies (the paragraph the cycle gives each agent, word for word):**

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

**Return:** status (`questions`, `done` or `reserved`), the report's path, and what the method's report holds, including **Unread material** (what this handoff names that you left unread or read in part, or `none`) and **Searches not found or unclear** (each thing you looked for and did not find or found unclear, or `none`). You run no test or other check and return no check result. You start no next stage and ask no human.
