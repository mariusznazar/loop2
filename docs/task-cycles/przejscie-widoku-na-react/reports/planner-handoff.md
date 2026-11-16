# Handoff — the planner

**Stage:** the planner, `plan-task`. You write `plan.md` and its size report `plan-size.md`; you write no code and change no file of the repository. You return before any slice is made.

**Delegation:** the human who requested this cycle delegated every intermediate choice to the orchestrator; there is no human to ask. Your questions go to the orchestrator, who answers them from the task, the spec, the foundation and the code, and records the answer as an autonomous choice, never as the human's approval.

**Worktree:** `the task's worktree` (branch `task/przejscie-widoku-na-react`, base `d850f76063c1f7a302b89d0b89e1fca72682be6d`). Work from its root. `.the-way` is at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the commit the repository pins; the task moves no pin, so no check came from a move.

**Method:** read `.the-way/task-cycle/plan/SKILL.md` whole and follow it; read a file it names only when the step that names it comes. You have no skill tool: it is a file you read.

**Inputs (read whole):**
- the frozen task: `docs/task-cycles/przejscie-widoku-na-react/task.md`
- the reviewed spec: `docs/task-cycles/przejscie-widoku-na-react/spec.md` (it passed its review; its section *Settlements of the cycle after the spec's review* binds you, and "Decision 5" in its Goal 5 means Decision 7). Its two reviews and the first text are in `reports/spec-reviewer-report.md`, `reports/spec-reviewer-report-2.md` and `spec-reviewed.md`; read them only for a question the spec leaves.

**Answers of step 4:**
- Trust boundary: yes — `scripts/kitchen-sink.mjs` is a trust-boundary file of `build-tools`; the slice that changes it is marked so in its *Risk*, which gives it a review of its own aimed at crafted request paths at the preview server and at the lines of the script that serve files staying as they are.
- Irreversible operation: no.
- Open design choice: the spec settled it. No reserved choice is open.

**Route:** planning, because the change needs division (the orchestrator's reason is in the record: five parts, an ordered set of work, about eight new or rewritten modules, a deleted 1335-line test with its protecting cases moved, six changed test files, eight foundation entries, two guideline files). The order the spec names is forced: the start page, the saver and the card stop using the DOM forms before they are deleted; the kitchen-sink page is bundled in a slice of its own; the guideline files and the foundation entries have their own place in the plan.

**What the plan carries, beyond what the method gives:**
- The plan's *Foundation entries* (the entries the change writes or changes, from the spec's section of that name), as the method gives them; the foundation step writes them, not a slice's executor. Foundation entries and guideline files are written only through the project skills named in the product's `AGENTS.md` (`the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-update-part-map`, `the-way-record-environment-fact`; `the-way-maintain-coding-guidelines` and `the-way-maintain-styleguide` for the guideline files). Place the guideline changes of the spec's Decision 8 in a slice whose executor reads the maintenance skill's file by its path in `.the-way` (the executor has no skill tool) — or tell the orchestrator in your report where you place them and why.
- No slice's *Checks* run the product's gate (`npm test` with no argument); a slice names focused checks only (the product's way of running one file is in `README.md`: `npm test -- <file>`), and the foundation check `python -B .the-way/elements/common/foundation_check.py`, which the gate also runs, where the slice changes the foundation or a guideline. The gate is the orchestrator's alone.
- Each slice's *Model* and *Risk*, with a reason for a class other than `cheaper`.
- The tests each slice writes, changes or moves, with the ground the spec gives for each changed or removed assertion (the testing guidelines' rule on changing a test), and the slice in which each existing test file that the spec changes is changed, so that no slice leaves the tests of the tree red for a reason a later slice repairs: say in each slice which tests stay green after it.
- Where a slice leaves a user interface changed, the executor reads the styleguide's example of the order of work, and a check in a real browser is the executor's (`.claude/skills/loop2-play/SKILL.md` says how the game runs on this computer).

**What to read (selected by the orchestrator; you read no more of the decision log than this):**
- Decisions of `foundations/decisions.md`, each whole with rationale and *Rejected*: D-03, D-44, D-45, D-47, D-76, D-253, D-259, D-262, D-263, D-264, D-265, D-266, D-269, D-273, D-275, D-276, D-280, D-281, D-286, D-323, D-381, D-395, D-407, D-408, D-96, D-97, D-208, D-209, D-211, D-225, D-261, D-285, D-402, D-156, D-157, D-356.
- The invariants the spec names (`browser-view-framework`, `application-build-kitchen-sink`, `preview-server-access`, `browser-view-focus-outline`, `uncaught-failure-game-state`) and the part map entries `browser-view`, `build-tools`, `agent-workflow`, `product-foundation`.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`.
- The code and tests the spec names, as far as the plan needs them to size slices and to name their *Read* and *Change*.

**Where to write:** `docs/task-cycles/przejscie-widoku-na-react/plan.md`, `docs/task-cycles/przejscie-widoku-na-react/plan-size.md`; your report `docs/task-cycles/przejscie-widoku-na-react/reports/planner-report.md`. Working copies, if any: `.runs/planner/`.

**Working copies (the paragraph the cycle gives each agent, word for word):**

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

**Return:** status (`done`, `done with concerns`, `questions`, `returned` or `reserved`), the report's path, a one-line result of what the size script reported, and what the method's report holds, including **Unread material** (what this handoff names that you left unread or read in part, or `none`) and **Searches not found or unclear** (each thing you looked for and did not find or found unclear, or `none`). You start no next stage and ask no human.
