# Handoff — the agent of the plan's *Foundation entries*, part A (new entries: the projected decision and glossary term, and the new decisions of the rows)

## Delegation

Mariusz, the product's owner, delegated the intermediate choices of this task cycle to the orchestrator that dispatches you; the orchestrator's answers are never his approval. You never ask the human; questions go back to the orchestrator by returning `questions`.

## Where you work

- Worktree (your working directory, the repository's root): `the task's worktree`, branch `task/wyposazenie-postaci`, base `f2263d0502395ea1a3113b558e5258c256589676`; the pinned the-way is its `.the-way` (`6ed3cb364adedacea214d2a0df690cea32f2e72f`). Commit on this branch, by path (`git add <path>…`, never `git add -A`), with English commit messages in the style of the repository's log.
- Stage: the foundation step for the plan's *Foundation entries* (part A of three parts the orchestrator split them into, written one after another on this branch). Variant: none of the rows of `make-change`; your stage is the foundation step. Read `.the-way/task-cycle/skill/foundation_step.md` whole, and the `SKILL.md` of an element, at the path that file gives, when you write an entry of that element. Method of the stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole, for the report, the own-work check and the commits. You write foundation entries only through the skills of the elements (`record-decision`, `record-invariant`, `record-glossary-term`, `record-environment-fact`, `update-part-map`), each read as its file in `.the-way`, as `foundation_step.md` gives.
- Boundary: you write the entries below and nothing else: no code, no test, no change of a guideline. You return before any slice is made. You run the foundation checks that `foundation_step.md` and your method name (such as `python -B .the-way/elements/common/foundation_check.py`), not the product's gate.
- Report: `docs/task-cycles/wyposazenie-postaci/reports/foundation-A-report.md` (the report file is the input of the cycle's scripts: `task-cycle/remarks_check.py` reads it); its first line is your status; it holds the commits, the checks with command and exit code, the meaning sentences and mark of each entry you wrote (`request.md` takes them from there), **Unread material**, **Searches not found or unclear** (each `none` where none), your own-work check and the line on your working copies.
- Your directory for working copies: `.runs/foundation-A/`.
- The record directory `docs/task-cycles/wyposazenie-postaci/` also holds `cycle.md`, other agents' handoffs and reports: not yours to read, except `task_frozen.md`, `plan.md` (the sections named below) and this handoff.

Working copies (the first paragraph of the section "Working copies" of the cycle's skill, word for word):

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way` populated, and the dependencies those checks need installed as the product's own rules give, before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and command of a probe that shows a finding among them, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## The task and the answers of step 4

- Frozen task (whole; it binds; Polish): `docs/task-cycles/wyposazenie-postaci/task_frozen.md`; its *Decisions in play*, *Settlements to record* and the *To do* 14 are your sources. Route: planned slices; no spec. Trust boundary: yes (`src/browser/sim/saved-game.ts`, `src/browser/view/judging-cache.ts`, `assets/icons/**`); irreversible operation: no; no human action; no move of the pin.
- The plan is `docs/task-cycles/wyposazenie-postaci/plan.md`: read its sections *Foundation entries* (lines 7–53) and *Choices* (from the heading "## Choices") and the slices named in the column *What depends on it* of your rows, so that each entry says what those slices make. Its rows are copied below word for word; the plan is the address.

The plan's section *Foundation entries*, introduction:

The agent of the foundation entries writes every row below before slice 1, through the foundation
step (`.the-way/task-cycle/skill/foundation_step.md`). Rows 9 and 32 of *Settlements to record* go to
the styleguide (Slice 11) and rows 17 and 25 to the game's data (Slices 1, 4 and 7), so none of the
four is an entry here.

Rows you write in this part (A):

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| F1 — new decision "Where does an action take the piece it uses from?" | decision, new | projected entry of the approved definition (task, *Decisions in play*, line 250) | Slices 4, 7, 8 |
| F2 — glossary term `gear` | glossary term, new | projected entry of the approved definition (task, line 251) | every slice |
| F21 — the gear belongs to the character, put on from the chest, outside the trip plan | decision, new | row 1 | Slices 1, 2, 3 |
| F22 — the player changes the gear outside an unfinished manual map run of the character, in an earning loop from its next map run | decision, new | row 3 | Slices 2, 19, 20 |
| F23 — a slot nothing fits stands empty on the screen Postać | decision, new | row 8 | Slices 11, 19 |
| F24 — the gear is no backpack | decision, new | row 10 | Slices 1, 4, 7 |
| F25 — eight slots of one piece each; the stick fits the main hand, the bandage a pocket; the strike takes from the main hand alone | decision, new | row 16 | Slices 1, 4 |
| F26 — an empty slot refilled from the backpack only at the use of an action that takes from it | decision, new | row 18 | Slice 4 |
| F27 — the action „Załóż — {rzecz}” | decision, new | row 19 | Slice 7 |
| F28 — the condition „Puste — {miejsce}” | decision, new | row 21 | Slices 6, 13, 14 |
| F29 — the slot by slot merge of a loop's gear changed by the player and by the map run | decision, new | row 28 | Slice 3 |
| F30 — the gear changed through a tile and the pick under it | decision, new | row 31 | Slices 11, 20 |
| F31 — the tiles of a character in an earning loop show the next map run's gear, with its sentence | decision, new | row 33 | Slices 11, 19 |

Each row of *Settlements to record* marked decision is an entry of its own question and number unless
the writer's search of the whole foundation finds it already stated (task, *To do* 14). F32, F33
and F34 are the cycle's: the request puts them before the human.

Order of numbers: the new decisions take the next free numbers after the highest number of the log, in the order of the rows here (F1, then F21–F31); the glossary term F2 is written with them. A new decision's *Scope* names the parts by identifier; its *Verification* names tests the plan's slices make (the slice numbers stand in the plan's column *What depends on it*).

## What to read (WAY-150)

Read as `.the-way/elements/common/way_of_working.md` ("Read" and "Reading the foundation") and the skill of each element you write give. The parts the entries name: `simulation`, `browser-view`, `balance-tools`. Decisions you change or answer otherwise are read whole with their *Rejected*; the whole log is searched once per entry as its skill gives. A decision index of the selected parts and sections that the cycle wrote is at `.runs/orchestrator/decision_index.md` (search it with Grep; it is no substitute for reading a decision you change). The part map's entries and the invariants of the parts named above, as the method gives.

## Report

Return: status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits (by path), a one-line check result naming what failed or did not run, and the report path.
