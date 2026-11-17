# Handoff to the reviewer of the whole change — task `sesja-w-przegladarce`

You review the whole change of this task as an agent that did not make it. Your method is `.the-way/task-cycle/review/SKILL.md` (`review-change`); read it whole, and read a file it names only when the step that names it comes. The variant: **the whole change**. You are read-only: you change no tracked file; you return `PASS <sha>` or `FAIL <sha>` as your report's first line, graded findings and the checks you ran. The full gate of the product (`npm test`) is the orchestrator's; you do not run it. You may run focused checks.

The user's delegation: the strongest model allowed in this cycle is `opus`; no answer of the orchestrator is the human's approval.

Worktree (work from its root): `the worktree root`, branch `task/sesja-w-przegladarce`. Range to review: base `e5516b17` to head `8e9c01a0` (one commit, 3 files: `src/browser/styles.css`, `src/browser/maps-screen.css`, `guidelines/styleguide-browser-view.md`).

Your directory for working copies: `.runs/review-whole/`. Your report path: `.runs/task-cycles/sesja-w-przegladarce/reports/review-whole-report.md`.

## Inputs

- The frozen task: `.runs/task-cycles/sesja-w-przegladarce/task.md` (read whole). No spec, no plan (one-author route; no slice; the one commit is judged whole by you).
- The author's report: `.runs/task-cycles/sesja-w-przegladarce/reports/author-report.md` (including its section "Resume 1"), with the evidence files beside it whose names start with `author-`. The author's report is a claim, not evidence: the task's required outcome is mostly observation of states of the running game, and what the author says it saw you cannot repeat in full. Judge it as follows: (a) every item of points 1–4, 6, 7 and 8 of the task has a row of the *Observations* table with a result and a reason where not viewed (the task's acceptance criterion: the pull request says of each item of points 1–4 what is seen, in which browser and window, or why it was not viewed); (b) a result "matches" that rests on a reading of a screen against a decision, an invariant or a styleguide rule is consistent with that entry, which you read yourself; (c) each "bad" state was treated as point 5 gives (fix only when all three conditions hold; else a defect for the human); (d) the weak spots of the method that the report names are fair and none is hidden (for instance states reached with fields set by hand); (e) the change of point 7 does what the task's point 7 says in the CSS and in the styleguide rule, and you may look at it in a browser yourself if the check needs it (Playwright CLI as `.claude/skills/loop2-play/SKILL.md` gives; close the browser and stop what you started; install nothing).
- Answers of step 4 of the cycle: trust boundary: no (the boundary files of the part `browser-view` are `assets/icons/**`, `assets/fonts/**`, `assets/sprites/**`, `src/browser/view/screen-address.ts`, `email-confirmation.ts`, `password-reset.ts`; none is in the range); irreversible operation: no. No open design choice, no reserved choice.
- The task's *Decisions in play*: D-75, D-88, D-254 (withdrawn; answered again by D-417), D-255, D-03, D-278, D-299, D-323, D-349. Read them, and select the rest of your foundation and guidelines by the parts of the change, as "Reading the foundation" in `.the-way/elements/common/way_of_working.md` gives (the part `browser-view`; decisions D-265 and D-421 on where the look of a shared control stands; D-169, D-170 for the program list; the invariants of `browser-view`). The guidelines of the changed parts: `guidelines/styleguide-browser-view.md` (whole), `guidelines/testing.md` (whole, for whether a test for the CSS change is required or excluded: the author added none and says why), `guidelines/coding.md`.
- Reaches the author reported beyond its handoff: decisions D-396, D-169, D-170, D-311, D-368, D-370, D-371, D-415, D-417; invariants `browser-view-token-values`, `uncaught-failure-game-state`; code of the view directory read to trace causes.
- Minor and out-of-scope findings of earlier reviews: none (no slice reviews exist).
- What the author says it did not do: point 4 (Firefox) not viewed — `playwright-cli` 0.1.22 wants Firefox 1553, the computer has 1532; nothing installed (the task says to say so and install nothing); the real popup of the opened select list is not drawn in headless Chrome (full name checked in the DOM); no permanent test added (D-87, D-88 give why).

## What to check beyond correctness of the diff

1. The CSS: `.select-list { max-width: 100%; overflow: hidden; text-overflow: ellipsis; }` in `src/browser/styles.css` (shared sheet, D-265/D-421) and `.maps-who-program { max-width: 100% }` in `src/browser/maps-screen.css`: does it fulfil point 7 for the two screens, with 40- and 200-letter names, without side effects on any other `select` of the game (the trip plan's, the kitchen-sink's, any in the account card or the program editor) — find every use of the class and judge each? Does `overflow: hidden` clip the focus outline of the select (the styleguide's focus rule; `tests/invariants/test_browser_view_focus_outline.py`)? Is a rule in the shared sheet right where the task says "lista dostaje największą szerokość"?
2. The styleguide's change to the rule "A name typed by the player breaks in its row": consistent with the rule's other text, with its examples and `Decision:` field, with the checks that read the file (`foundation_check.py`, tests that quote it).
3. Source fidelity: the task's point 7 text versus what was built; point 5's three conditions versus the one fix and the four defects named; the claim "Point 2 solved by play on Skraj lasu and Las" versus the task's text (the task spoke of "Las" as the first map).
4. Whether anything of the task's points is missing from the report, and whether the defects for the human are stated so that a human can decide (what the player sees, how to reach it, the entry touched).

Grades and what blocks are as `review-change` gives. A defect the author rightly reported for the human is no finding; a finding is something the author got wrong or left out.

## First paragraph of "Working copies" of the cycle, word for word

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed.
