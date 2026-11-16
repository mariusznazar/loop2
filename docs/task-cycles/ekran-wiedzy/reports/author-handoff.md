# Handoff — the one author of the change, task `ekran-wiedzy`

You are the one author (agent type `the-way-author`) of a change in a task cycle of the-way. The person who requested the cycle delegated intermediate choices to the orchestrator; the orchestrator's answers below are provisional, never the human's approval. Do not ask the human anything: questions go back to the orchestrator in your return (status `questions`).

## Where you work

- Worktree (the root you work from, and the only place you write): `the root of the task's worktree`, branch `task/ekran-wiedzy`, base `6caa013e04bafca4c28b540fabccf55201ce49a4` (= `origin/main`). `.the-way` is initialized at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, `npm ci` is done and `.runs/quality-venv` exists. Run every command from this root; scripts of the-way run as `.the-way/<path>`.
- Your directory for working copies: `.runs/author/` (directly under the ignored `.runs/` of the worktree).
- Your report: `docs/task-cycles/ekran-wiedzy/reports/author-report.md`.
- Windows, PowerShell and Bash both available; `npm.cmd` for npm in PowerShell.

## Method and variant

Read `.the-way/task-cycle/change/SKILL.md` whole, as the method `make-change`, variant **"the whole change as the one author"**, and a file it names (one beside it included) only when the step or variant that names it comes. You have no skill tool: read each method, and each skill the method or this handoff names, as a file. Where the method or a file names a the-way skill without the `the-way-` prefix, the file of this product's skill is `.claude/skills/the-way-<name>/SKILL.md`, which reads `.the-way/...`.

The foundation step (the entries the task carries) is part of your work: read `.the-way/task-cycle/skill/foundation_step.md` whole and follow it; write each entry through the element's `SKILL.md` as that file gives (`record-decision`, `record-invariant` if one is needed, `record-glossary-term`, `update-part-map`, `record-environment-fact`; each under `.the-way/elements/`). You do not take the return step now: the orchestrator resumes you for it later.

## What to make

The frozen task: `docs/task-cycles/ekran-wiedzy/task.md` — read it whole. It is Polish; the product's code, comments and commit messages are English; what the screen writes to the player is Polish, with the exact strings the task gives. Everything the task requires (*To do* 1–10, the answers of *Questions to settle*, *Decisions in play*, *Settlements to record*) is required; nothing beyond it. The task's *Out of scope* is binding. A note of the task refers to notes the author keeps outside the repository: no entry of the foundation, comment, test name or commit message names such a note or the folder it lies in (D-362); copy the sentence the task gives as the entry's text, not its provenance in the notes.

No spec and no plan exist: the orchestrator found no open design choice. The task leaves one choice to you: **what folds a tree open** (a row with the tree's name and its number of branches, collapsed at each entering of the screen, opened by a click or the keyboard). The shared button already knows `aria-expanded` (`src/browser/view/controls/react-button.tsx`); a new shared control goes on the page of all states in the same change (styleguide, "The kitchen-sink page"). Make that choice, name it in your report (what you chose, the way rejected, its cost), and the orchestrator enters it in the questions table. If you meet a design choice the task and the foundation leave open and that is not of this kind, return `returned` with the report and no code, as the method gives.

Where the screen lives in the code is settled: D-408 (a module of its own, one entry of the registry's table in `src/browser/view/screen-registry.ts`'s table — see how the other entries are built, e.g. `maps-entry.ts` — its address in `screen-address.ts`, its place on the menu bar), D-407, D-265, D-264 and `guidelines/coding-browser-module.md`. No function the game view shares between its screens may name the new screen. The new screen is built in React on the file the guidelines give as the exemplar, not as a module that builds the DOM by hand. Names of game things come from the data (invariant `content-identifiers`).

## Answers of the orchestrator at step 4

- Does the change touch a trust boundary? **Yes**: `assets/icons/**` (part `browser-view`) takes files from game-icons.net; the task adds one SVG file there (`wolf-head`) and its credit. The invariants `icon-file-content`, `icon-credits` and `loop2-container-icons` apply to it and must stay true; the file holds nothing that runs and refers to nothing outside itself. Fetch the icon from game-icons.net by the way the foundation settles for the other icons (D-27, `README.md` "Icons", the facts of the foundation on game-icons.net) and take its title from its page; **take the title, the author and the page from the source, never from memory** (a value you cannot read from the page stays a question in your report). Reviews of this cycle check crafted input at that boundary.
- Does it hold an operation that cannot be undone? **No.**
- Open design choice: none, except the choice named above.
- The class of model for you: `same` as the orchestrator (sonnet).

## What you read (selected by the orchestrator)

Foundation entries by identifier. The whole index of the selected decisions is at `.runs/orchestrator/index.txt` (116 decisions in full, 233 by heading alone; write nothing there). From it, and from the log `foundations/decisions.md`, read whole:
- the decisions the task changes or writes: **D-280, D-281, D-291, D-322, D-327**; the ones it realizes: **D-27, D-282**; the ones it touches: **D-277, D-195, D-199, D-200, D-119, D-283, D-148, D-325, D-328, D-120, D-196**;
- the decisions on how a screen is added and built: **D-408, D-407, D-265, D-264, D-395, D-44, D-267, D-269, D-43, D-42, D-47**;
- the decisions on the scene and the plaques of a discovery: **D-122, D-316, D-317, D-271, D-272**, and on the Understanding **D-118, D-128**;
- the invariants `icon-credits`, `icon-file-content`, `loop2-container-icons`, `content-identifiers`, `loop-run-knowledge`, `browser-view-token-values`, and every invariant of `foundations/invariants.md` whose *Part* is `browser-view` and which names a screen, the menu bar, a heading, a list, focus or a test of the view, as far as the work reaches it;
- the glossary entry `Understanding` and any term you use; the part map `foundations/part_map.md` whole;
- the environment facts of `foundations/environment_facts.md` about game-icons.net and the icons (find them by `icon`, `game-icons`).
You select the rest of the foundation yourself by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` for the entries you write (step 1 of each element's `SKILL.md`), and you name in your report what you reached beyond this list.

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/coding-content-data.md` (the creature data is content data), `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`. For the plaque in the scene read also `.claude/skills/loop2-scene-art/SKILL.md` (`AGENTS.md` of the product requires it before a picture or an effect of the scene changes). For the check of the screen in the running game (the change touches a user interface) read `.the-way/task-cycle/change/ui_check.md` and `.claude/skills/loop2-play/SKILL.md`, and the styleguide's example of the order of work as an example.

Source material outside the repository that the task cites (the old Loop under `the old Loop repository`, commit `cdc7c0d`) may be read for the screen's layout and the `counted` function, as the task says; the notes of the author's vault are not for you.

## Boundary of your stage

You make the change and its tests, write the foundation entries (the task's *Decisions in play* gives the text), edit the styleguide (*To do* 10) and commit; you return before any review. **Do not run the product's full gate (`npm test` with no file)**: its run belongs to the orchestrator (WAY-160). Run focused checks only (`npm test -- <file>`, the type checks, lint and format on the files you touch, `foundation_check.py`, `check_instructions.py`) and put each command and its exit code in your report. Commit by explicit paths (`git add <path> ...`, never `git add -A`, `.` or `commit -a`), messages in English in the style of the repository's history (`feat: :sparkles: ...`, `docs: :card_file_box: ...`); after your first commit check `git log --format='%h %ae'` shows the repository's address. Do not push. Do not touch the record `.runs/task-cycles/`.

The change touches a user interface: check the states of the screen in a real browser as `ui_check.md` gives (affected components and states, method, observed result, evidence). A screenshot kept for the human goes where `ui_check.md` says; the record's copy never holds an image, so name the address of the place where it lies, never the file.

## Working copies (word for word from the cycle's skill)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Return

Write the full report to the report path above as `make-change` gives it, with its **Unread material** and **Searches not found or unclear** sections (`none` is an answer; a missing section is not), the own-work check with commands and exit codes, the choice named above, and where the screen's strings, counts and plural forms are tested. Return the status, your commits, a one-line check result naming what failed or did not run, and the report's path.
