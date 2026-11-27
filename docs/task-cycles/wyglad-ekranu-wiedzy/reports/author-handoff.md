# Handoff — the one author, whole change

You are the one author of a change in a task cycle of the-way, resumed after each review for a fix and for the return step. The person who started this cycle has delegated every intermediate choice to the orchestrator; nothing you are told here is that person's approval, and you ask no human anything. Questions go to the orchestrator, as your method gives.

## Where you work

- Worktree (your only place to write; work from its root): `the worktree of the task`, branch `task/wyglad-ekranu-wiedzy`, base `a49c5f63e63037c3e608fbf3066cde178c5c06e9` (`origin/main`). Its `.the-way` is populated at `6ed3cb364adedacea214d2a0df690cea32f2e72f` and `npm ci` has run there.
- **Write nothing in the main checkout `the main checkout of the repository`** — not a file, not a worktree, not a database, not a log. The session that started the cycle forbids it. Run the game, the tests and every script from the worktree only. If a command you need would write there, do not run it and say so in the report.
- Your directory for working copies: `.runs/author/` of the worktree (create it). Your report: `.runs/task-cycles/wyglad-ekranu-wiedzy/reports/author-report.md`. The file `reports/author-report.md` is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); the name does not start with `report`, `summary`, `findings` or `analysis`, so your write of it is allowed. If your tool refuses it all the same, return the whole report as your answer.
- `cycle.md` and the other files of the record directory `.runs/task-cycles/wyglad-ekranu-wiedzy/` — other agents' handoffs, reports and findings — are not yours to read, except the frozen task named below.
- Leave no shell, server or browser running when you return: stop the game you started (`npm run local`), close the browser you opened (WAY-319), and report that you did.

## Method and stage

- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole. Your variant, in the words of its row: **"the whole change as the one author"**. Read each further file it names — `foundation_step.md` of `.the-way/task-cycle/skill/`, `.the-way/task-cycle/change/ui_check.md`, `.the-way/task-cycle/change/walkthrough.md` — when the step that names it comes.
- Stage and boundary: make the whole change the frozen task requires — the code and its tests, the foundation entries and the styleguide rule the task's *Settlements to record* send to the foundation and the guidelines (the foundation step, `.the-way/task-cycle/skill/foundation_step.md`, which you read whole), and the screenshots the task's item 6 names — commit it on the branch, make your own-work check, write the report, and return before review. You do not run the product's full gate (no unfiltered `npm test`; its run is the orchestrator's or CI's); run the focused checks your change needs, each with its command and exit code in the report. You do not write the request description, open a request or push the branch. You keep the return step (comparing the foundation with the code) for the dispatch that resumes you.
- Class of model: the strongest available (`opus`), because the change needs the judgment of a designer on a screen that a human will compare on screenshots.

## The task

- The frozen task, read whole: `.runs/task-cycles/wyglad-ekranu-wiedzy/task_frozen.md` (a copy of the approved task document, "ready for cycle", 2026-11-25). Requirements, answers and values stay in that file; nothing here restates them. Its *To do* 1–7, its *Questions to settle* 1–7 with their answers, its *Settlements to record* rows 1–6 and its *Decisions in play* bind you; its *Context* gives the code to start from. No spec and no plan stands: the route is one author without a plan.
- Question 4's answer is a threshold, not a template: you may depart from the answers to questions 1–3 within what the human chose — look, words, proportions, spacing, arrangement — and you show it on the screenshots and say in the report what you departed from and why; you reach for no variant the human did not choose and depart from no decision the task leaves unchanged. How the degrees of a branch stand at 360 px, and the least width of a column of the Understanding, are yours to choose; the styleguide sentence of row 6 gives the latter.
- The answers of the two questions at start: the change does **not** touch a trust boundary of the part map; it holds **no** operation that cannot be undone.
- The frozen task says the code stands at `origin/main` `97936c24`; the base is `a49c5f63` (later merges). Read the code as it stands in the worktree and report anything that no longer matches the task.

## What to read (the orchestrator's selection)

- Foundation: the index of decisions the orchestrator wrote, `.runs/orchestrator/index.md` (decisions of the sections "Look of the browser view…", "Browser view: screens, navigation and their code", "Discovery and the Understanding", "Character skills and nature energy", and the part `browser-view`), and open whole, from `foundations/decisions.md`, these decisions: D-416 (the one the change rewrites), D-280, D-282, D-396, D-44, D-40, D-43, D-42, D-39, D-47, D-48, D-199, D-200, D-379, D-291, D-421, D-274, D-275, D-276, D-279, D-418, D-419, D-38. Of these D-416 is read with its *Rationale* and *Rejected*. The invariants whose *Part* is `browser-view` or `every` and the glossary entries of the words you use, as `elements/common/way_of_working.md` "Reading the foundation" steps 3 and 4 give (`.the-way/elements/common/way_of_working.md`); the part map `foundations/part_map.md`.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`. The styleguide's example of the order of work for a change of a user interface is the example you follow (WAY-213).
- The skill that runs the game and operates it in a real browser: `.claude/skills/loop2-play/SKILL.md`, read whole before you run the game. Read `.claude/skills/loop2-scene-art/SKILL.md` only if you add or change a picture of the scene (the task does not ask for one).
- The code to start from: `src/browser/view/knowledge-screen.tsx`, `src/browser/view/knowledge-lines.ts`, `src/browser/knowledge-screen.css`, `.screen.knowledge-areas` in `src/browser/styles.css`, `src/browser/view/character-skills.ts` (`branchText`), `src/browser/sim/data/skills.ts`, `tests/view/knowledge-screen.test.mjs`, `tests/view/knowledge-lines.test.mjs`, and the row of a tree on the screen Postać.
- Tests: where a test holds a sentence of a decision by a line `decision:` and your change alters that sentence, re-quote it, as the testing guidelines give.

## Screenshots (item 6 of the task; D-418, D-419)

- The comparison the request shows, made by you: the old Loop's two screenshots of 31 October (`the folder of the old Loop's screenshots in the author's notes, file loop_13_wiedza.png` and `loop_02_wiedza.png` — look at each first; if one shows an e-mail address, a login name or another personal datum, do not push it and say so in the report), the screen of loop2 **before** the change and **after** it in the same window size 1600 × 1000 and in states as alike as you can make them (many known things and trees; and with the trees open, including a branch with a number, one without, "Mocniejszy cios" of four degrees in "Walka bronią jednoręczną" and "Długi krok" in "Eksploracja"), at 360 px with touch before and after, and after the change one more at a window about 1100 px wide in the phone layout. Take the "before" shots from the base `a49c5f63` — build or run the base in a separate copy under `.runs/author/` (a worktree of the base commit with `.the-way` and its dependencies populated), never in the main checkout, and remove it before you return.
- They lie in the place D-418 and D-419 settle — the public repository `mariusznazar/screenshots`, directory `loop2/wyglad-ekranu-wiedzy/`, on a branch `loop2/wyglad-ekranu-wiedzy`, never on `main`, pushed by you with the `gh` account of the repository's owner, with no step of the human. Clone it into `.runs/author/` of the worktree (never elsewhere); remove the clone before you return. Use only a made-up local account; no real name, e-mail or password may stand on a screenshot. The report lists, for each screenshot, its state in words and the full link to its file in the commit you pushed, with `?raw=true` appended, so that the orchestrator can embed it; a screenshot stays in no file of the product repository or of the record.
- Look at every screenshot after you take it and judge it against the styleguide, the task's *To do* and the acceptance criterion; a screenshot is not a pass of an item you did not look at in it. Check by the checks of task item 4: no scroll to the side, no text outside its frame, every control at least 48 × 48 px at 360 px with touch — measured in the running game, not only read in code.

## Foundation entries

Write the entries the *Settlements to record* send to the foundation as `foundation_step.md` gives, by the project skills it names (read each skill's `SKILL.md` by its path in `.the-way/` or `.claude/skills/`, since you have no skill tool): rows 1, 4, 5 → sentences of D-416 (its *Verification* and *Rejected* too, as the task's *Decisions in play* gives); rows 2, 3, 6 → the rule "The screen Wiedza" of `guidelines/styleguide-browser-view.md` with its "Good" and "Bad" examples, which stand on the screen as it is after the change (item 5). Nothing else of the foundation is written without the task, a decision or the foundation naming it. Run `python -B .the-way/elements/common/foundation_check.py` before you return and `python -B .the-way/instruction-files/check_instructions.py` if a file of agent instructions changes.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.

## Report

Write the report to `.runs/task-cycles/wyglad-ekranu-wiedzy/reports/author-report.md` as your method gives it, with its status first, each check with its command and exit code, your own-work check, your departures from the answers of the task (item 7) with the reason for each, your **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), your **Searches not found or unclear** (each thing you looked for and did not find or found unclear, or `none`), the screenshots with their links, the working copies you made and that you removed, and what you left running (nothing). Return only the status, your commits, a one-line check result naming what failed or did not run, and the report's path.
