# Handoff — reviewer of the spec

**Stage:** the review of the spec, `write-spec`, the reviewer's variant (an agent that did not write the spec). You read the spec against the frozen task and the foundation; you change no file of the repository and write no plan and no code. Return `PASS` or `FAIL` as the method gives it.

**Delegation:** the human who requested this cycle delegated every intermediate choice to the orchestrator; there is no human to ask. Your questions go to the orchestrator.

**Worktree:** `the task's worktree` (branch `task/przejscie-widoku-na-react`, base `d850f76063c1f7a302b89d0b89e1fca72682be6d`). Work from its root. `.the-way` is at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the commit the repository pins.

**Method:** read `.the-way/task-cycle/spec/SKILL.md` whole and follow it as the reviewer's variant; read a file it names only when the step that names it comes. You have no skill tool: it is a file you read.

**To review:**
- the spec: `docs/task-cycles/przejscie-widoku-na-react/spec.md`
- the frozen task (read whole): `docs/task-cycles/przejscie-widoku-na-react/task.md`
- the designer's report: `docs/task-cycles/przejscie-widoku-na-react/reports/designer-report.md`

**Answers of step 4:** trust boundary — yes (`scripts/kitchen-sink.mjs` is a trust-boundary file of `build-tools`; check that the spec leaves its lines that serve files alone and names the review that checks it); irreversible operation — no; open design choice — yes, the one the spec's *Open choice* line names; no reserved choice.

**Where to write your report:** `docs/task-cycles/przejscie-widoku-na-react/reports/spec-reviewer-report.md`; its first line is `PASS` or `FAIL`. Working copies, if you make any: `.runs/spec-review/`.

**What to read (selected by the orchestrator):**
- Decisions of `foundations/decisions.md`, each whole, with rationale and *Rejected*: D-03, D-44, D-45, D-47, D-76, D-253, D-259, D-262, D-265, D-269, D-275, D-276, D-280, D-281, D-286, D-323, D-381, D-395, D-407, D-408, D-96, D-97, D-208, D-209, D-211, D-225, D-261, D-264, D-266, D-263, D-273, D-285, D-402, D-156, D-157, D-356.
- The invariants the spec names (`browser-view-framework`, `application-build-kitchen-sink`, `preview-server-access`, `browser-view-focus-outline`, `uncaught-failure-game-state`) and the part map entries `browser-view`, `build-tools`, `agent-workflow`.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`.

**Material the designer left unread — yours to read, because only a reader of it can judge the parts of the spec that rest on it (its report's *Unread material*):**
- `src/browser/view/controls/button.ts`, `text-field.ts`, `number-field.ts`, `pick-cell.ts` (the DOM forms the spec deletes; judge that no behaviour they hold is lost that the React forms or the moved tests do not hold, and that nothing else imports them).
- `src/browser/view/account-card.tsx` whole, `menu-bar.tsx` whole, `game-view.ts` and `state-store.ts` where the spec changes them, `src/browser/kitchen-sink/kitchen-sink.css` whole.
- `tests/view/uncaught-failure.test.mjs` whole; `tests/view/react-controls.test.mjs` for the cases Decision 7 says move; the tests that call `startApp`, including `tests/view/owner-panel.test.mjs`, for what they click, read or wait for (Decision 7's claim that only the clicks on „Spróbuj ponownie” outside `act` change).
- The last lines of the *Rejected* paragraphs of D-253 and D-225.

**What to judge in particular, beyond the method's checks:**
1. Decision 1 (the row of the failure drawn at the start into a hidden host and shown at the error): does it meet D-323 and the carried question; is the hypothesis about screen readers marked as one and cheap to confirm; does it keep the row's sentence once; is the way still consistent with To do 2 (React draws the row).
2. Decision 3 (the one value and the logout as a field of the game kind, not a kind): does it keep every behaviour of the page listed in the spec, notably the reset during a logout and the held outcomes; is a transition missing.
3. Decision 4 (the bundling of the kitchen-sink page): does it leave the lines of `scripts/kitchen-sink.mjs` that serve files alone; does the staging directory fail the invariant test of the build; does the bundle copy anything from `assets/sprites/`.
4. Decision 7 (tests): each changed or removed existing assertion has its ground in a requirement, as the testing guidelines' rule on changing a test asks; the two assertions of To do 7 are the ones the task means (the spec derives them from the record of request #62, `git show 905c1ab8:docs/task-cycles/napis-o-awarii/request.md`).
5. The list of foundation entries the change writes: does it hold every entry the change makes untrue (search the foundation yourself once, for the entries the spec's changes touch), and is each marked as the task's settlements or the cycle's precision.
6. Whether the change, as the spec designs it, is one the task's *Out of scope* leaves alone, and whether a requirement of the task's eight items has no place in the spec.

**Working copies (the paragraph the cycle gives each agent, word for word):**

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

**Return:** the report's first line `PASS` or `FAIL`, its path, its findings and what the method's report holds, including **Unread material** (what this handoff names that you left unread or read in part, or `none`) and **Searches not found or unclear** (each thing you looked for and did not find or found unclear, or `none`). You run no test or other check and return no check result. You start no next stage and ask no human.
