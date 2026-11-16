# Handoff — the review of the whole change, task `ekran-wiedzy`

You review the whole change of one task of a the-way task cycle as an agent that did not make it. The person who requested the cycle delegated intermediate choices to the orchestrator; nothing the orchestrator says here is the human's approval. You are read-only toward the product's files: you do not edit, fix or commit anything; you report.

## Where and what

- Worktree (the root you work from): `the root of the task's worktree`, branch `task/ekran-wiedzy`. `.the-way` is at `bfb2e109735b5fff98802b8be0ff3c43c799262a`; `npm ci` and `.runs/quality-venv` exist.
- **Method:** `.the-way/task-cycle/review/SKILL.md`, the review **of the whole change**; read it whole, and `whole_change.md` beside it when it says so, and each other file it names only when the step that names it comes. You have no skill tool: read each method as a file.
- **Range to review:** base `6caa013e04bafca4c28b540fabccf55201ce49a4` (`origin/main`) to head `caa13ffd5061e2cc60c7406203a6b5cf2045240b` (`caa13ffd`; the tree is clean). Two commits: `11164840` (the screen, the wolf's icon, the foundation entries, the tests) and `caa13ffd` (the styleguide).
- **The frozen task:** `docs/task-cycles/ekran-wiedzy/task.md` (Polish). Read it whole. It is the one source of what the change must do.
- **No spec and no plan:** the cycle found no open design choice and the change was made by one author without a plan, so there are no slices; the whole change is your one review.
- **The author's report:** `docs/task-cycles/ekran-wiedzy/reports/author-report.md` (the author's own account; check the code against the task, not against the report).
- Your report: `docs/task-cycles/ekran-wiedzy/reports/review-whole-report.md`. Your directory for working copies: `.runs/review-whole/`.

## Answers of the orchestrator at step 4 (you are told of both)

- Trust boundary: **yes** — the part map names `assets/icons/**` (part `browser-view`) as a trust boundary, and the change adds one SVG file there, `assets/icons/wolf-head.svg`, from game-icons.net, with its credit. **Check crafted input at that boundary**: the file holds nothing that runs and refers to nothing outside itself, and what the invariants `icon-file-content`, `icon-credits` and `loop2-container-icons` demand holds, including for the credit's title, author and page (read the page, never trust the author's word for them).
- Irreversible operation: **no.**
- Execution route: one author, class `same`. The author's choice left by the task, "what folds a tree open", and its reason stand in the author's report; judge it.

## What the orchestrator asks you to look at besides the method's own list

1. **Source fidelity of the entries.** The task gives the text of the foundation entries (*Decisions in play*, *Settlements to record*; the new decision of the screen Wiedza as one entry: the definition's binding sentence plus the three sentences about the left area, the right area and the counters; the changes of D-280, D-281, D-291, D-322, D-327; the environment fact and *Rests on* of `icon-credits`). Compare each written entry with the task's text word for word where the task quotes it, and check nothing the task does not settle was invented (the new entry's identifier, its section and its *Rejected* included). Check that no entry or test or comment names a note kept outside the repository (D-362).
2. **Coverage of every item**: *To do* 1–10, each of the eight questions' answers, each of the three *Settlements to record* rows, each carried projected entry — name for each where it stands in the diff.
3. **Four points the author raised** (judge each as the method grades; none is pre-judged):
   a. D-416's *Rationale* holds the sentence "the player sees it nowhere today" word for word from the approved definition; it is untrue once this change is merged.
   b. D-280's *Verification* still says "the game opening the screens Siedziba, Postać, Mapy, Programy and Przejście at their addresses" (the task asked to correct only the four-item example), and D-281's *Verification* was changed from "seven" to "eight addresses".
   c. The task states "gra nie ma jeszcze odmiany liczebników" and asks that the task add one; the code already has `countedName` in `src/browser/view/program-editor.ts`, which the author reused for the four nouns (a file whose status in `guidelines/coding-browser-module.md` is `do not copy`; the author held that a pure import is allowed by D-265). Judge the reuse against D-265 and the guideline, and whether the added code is tested as the task requires.
   d. The author added no row for the three new files in `guidelines/coding-browser-module.md`'s table of files of its kind.
4. **The screen in the running game and the screenshots.** The author checked the screen in a real browser and pushed five screenshots to the public repository `mariusznazar/screenshots` (the route the skill `.claude/skills/loop2-play/SKILL.md` and `.the-way/task-cycle/change/ui_check.md` settle). Judge whether that followed the rule they give; you may run the game yourself (`npm run local`, `loop2-play`) to look at a state the task requires.
5. **Tests.** Judge the new and changed tests against `guidelines/testing.md`, and the stronger of the author's mutation claims by running a mutation of your own on at least one rule (the counters' plural forms, the creature's plaque, the open trees at an entering).
6. **The author left material unread** (its report's *Unread material*): decisions D-195, D-199, D-200, D-119, D-283, D-148, D-325, D-120, D-196, D-264, D-267, D-269, D-44, D-43, D-42, D-47, D-122, D-316, D-317, D-271, D-272, D-118, D-128, the invariant `browser-view-token-values` (the change adds 104 lines to `src/browser/styles.css`), the glossary entry `Understanding` whole, and the part map whole. Your own selection by the method covers them: read what the method names, and do not take the author's silence on any of these as evidence.

## Boundary of your stage

You may run focused checks (`npm test -- <file>`, type checks, lint, `foundation_check.py`, `check_instructions.py`, a crafted input of your own, a mutation of your own, the running game). **Do not run the product's full gate** (`npm test` with no file): its run is the orchestrator's. Every check you report carries its command and exit code. Grades, scope and what blocks are yours alone; the orchestrator moves no finding from one kind to another.

## Working copies (word for word from the cycle's skill)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Return

Write the full report as the method gives it, its first line `PASS <sha>` or `FAIL <sha>`, with graded findings (each with its file and line, its reasoning in full, and for each blocking finding that it comes from no slice, since there are none), the Minor findings within the task apart from those outside the task's scope, the number of decisions you read whole, the checks you ran with commands and exit codes, **Unread material** and **Searches not found or unclear** (`none` is an answer; a missing section is not), and your working copies. Return the first line of the report, the report's path, and a one-line check result naming what failed or did not run.
