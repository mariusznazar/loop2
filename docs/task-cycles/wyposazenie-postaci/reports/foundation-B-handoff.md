# Handoff — the agent of the plan's *Foundation entries*, part B (changes of the decisions the task's *Decisions in play* lists)

## Delegation

Mariusz, the product's owner, delegated the intermediate choices of this task cycle to the orchestrator that dispatches you; the orchestrator's answers are never his approval. You never ask the human; questions go back to the orchestrator by returning `questions`.

## Where you work

- Worktree (your working directory, the repository's root): `the task's worktree`, branch `task/wyposazenie-postaci`, base `f2263d0502395ea1a3113b558e5258c256589676`; the pinned the-way is its `.the-way` (`6ed3cb364adedacea214d2a0df690cea32f2e72f`). Commit on this branch, by path (`git add <path>…`, never `git add -A`), with English commit messages in the style of the repository's log.
- Stage: the foundation step for the plan's *Foundation entries* (part B of three parts the orchestrator split them into, written one after another on this branch). Variant: none of the rows of `make-change`; your stage is the foundation step. Read `.the-way/task-cycle/skill/foundation_step.md` whole, and the `SKILL.md` of an element, at the path that file gives, when you write an entry of that element. Method of the stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole, for the report, the own-work check and the commits. You write foundation entries only through the skills of the elements (`record-decision`, `record-invariant`, `record-glossary-term`, `record-environment-fact`, `update-part-map`), each read as its file in `.the-way`, as `foundation_step.md` gives.
- Boundary: you write the entries below and nothing else: no code, no test, no change of a guideline. You return before any slice is made. You run the foundation checks that `foundation_step.md` and your method name (such as `python -B .the-way/elements/common/foundation_check.py`), not the product's gate.
- Report: `docs/task-cycles/wyposazenie-postaci/reports/foundation-B-report.md` (the report file is the input of the cycle's scripts: `task-cycle/remarks_check.py` reads it); its first line is your status; it holds the commits, the checks with command and exit code, the meaning sentences and mark of each entry you wrote (`request.md` takes them from there), **Unread material**, **Searches not found or unclear** (each `none` where none), your own-work check and the line on your working copies.
- Your directory for working copies: `.runs/foundation-B/`.
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

Rows you write in this part (B):

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| F3 — D-23: the sentence on the piece an action uses narrowed by the gear | decision, changed | *Decisions in play* (D-23); "Touched parts and decisions" (line 252) | Slices 4, 7 |
| F4 — D-144: „Uderz — patyk” needs the stick in the main hand, takes it from the backpack into an empty main hand in the same turn; „Załóż” usable in combat | decision, changed | *Decisions in play* (D-144) | Slices 4, 8 |
| F5 — D-145: the stick stays in the main hand after a strike, unchanged | decision, changed | *Decisions in play* (D-145) | Slice 4 |
| F6 — D-380: the reasons of „Uderz — patyk” and „Załóż — {rzecz}” | decision, changed | *Decisions in play* (D-380); row 24 | Slices 4, 7 |
| F7 — D-140: „Załóż” in combat and out of it | decision, changed | *Decisions in play* (D-140); row 20 | Slices 7, 8 |
| F8 — D-309: no „trwa walka” and no „tylko w walce” for „Załóż” | decision, changed | *Decisions in play* (D-309) | Slices 7, 8 |
| F9 — D-187: the map's caps leave the gear out | decision, changed | *Decisions in play* (D-187); row 4 | Slices 1, 3 |
| F10 — D-190: the gear taken only by a death with no use of the resurrection left, of a character with no practice too | decision, changed | *Decisions in play* (D-190); rows 2, 27 | Slice 3 |
| F11 — D-183: the gear no carried item, back with the character as it stood at the end | decision, changed | *Decisions in play* (D-183); row 26 | Slice 3 |
| F12 — D-439: the judging runs with the character's gear and takes nothing of it | decision, changed | *Decisions in play* (D-439); row 5 | Slice 3 |
| F13 — D-440: a gear change the player makes on the screen Postać erases the character's judgings, one it comes back with from a map run does not | decision, changed | *Decisions in play* (D-440); row 6 | Slice 10 |
| F14 — D-446: the facts at the top of the left area, no longer beside the figure | decision, changed | *Decisions in play* (D-446); row 30 | Slices 11, 18 |
| F15 — D-445: the figure in the section „Wyposażenie”, twice the band's size | decision, changed | *Decisions in play* (D-445); row 29 | Slices 11, 18 |
| F16 — D-287: the tiles of the character of an unfinished manual map run and their sentence | decision, changed | *Decisions in play* (D-287); row 34 | Slices 2, 11, 19 |
| F17 — D-143: the first wolf attack brings „Załóż” and „Puste” | decision, changed | *Decisions in play* (D-143); row 22 | Slices 6, 7, 8 |
| F18 — D-290: „Załóż” at the end of „Żywność i walka”, „Puste” after „Energia natury” | decision, changed | *Decisions in play* (D-290); row 23 | Slices 6, 7, 13, 14 |
| F19 — D-311: the line of gear under the backpack line | decision, changed | *Decisions in play* (D-311); row 7 | Slices 11, 15 |
| F20 — D-44: the tile of a gear slot among the shared controls | decision, changed | *Decisions in play* (D-44) | Slices 11, 16, 17 |

Each row of *Settlements to record* marked decision is an entry of its own question and number unless
the writer's search of the whole foundation finds it already stated (task, *To do* 14). F32, F33
and F34 are the cycle's: the request puts them before the human.

Each row changes the sentence or sentences of an existing decision that the task's *Decisions in play* gives (its own wording of the change stands there, and the row of *Settlements to record* named in *From*): change that decision whole through `record-decision`, keeping its number, its other sentences, its *Rejected* and its *Verification* in step with the new sentence (the tests a slice will write are named in the plan). The same rule holds for the sentence of D-187, D-190, D-183, D-439, D-440, D-446, D-445, D-287, D-143, D-290, D-311 and D-44.

## What to read (WAY-150)

Read as `.the-way/elements/common/way_of_working.md` ("Read" and "Reading the foundation") and the skill of each element you write give. The parts the entries name: `simulation`, `browser-view`, `balance-tools`. Decisions you change or answer otherwise are read whole with their *Rejected*; the whole log is searched once per entry as its skill gives. A decision index of the selected parts and sections that the cycle wrote is at `.runs/orchestrator/decision_index.md` (search it with Grep; it is no substitute for reading a decision you change). The part map's entries and the invariants of the parts named above, as the method gives.

## Report

Return: status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits (by path), a one-line check result naming what failed or did not run, and the report path.

## What part A wrote before you (on this branch, commits `97cadd77` and `5360248e`)

The glossary term `gear` and the new section "Gear of a character" of `foundations/decisions.md` with D-451 (F1, where an action takes the piece it uses from), D-452 (row 1), D-453 (row 3), D-454 (row 8), D-455 (row 10), D-456 (row 16), D-457 (row 18), D-458 (row 19), D-459 (row 21), D-460 (row 28), D-461 (row 31) and D-462 (row 33). Read the ones that bear on a decision you change and keep your changed sentences consistent with them (link them in *Relations* where the entry serves them). Do not edit them: they are part A's, and a finding about them goes into your report's concerns. Your rows change sentences of other decisions; do not restate in them what D-451–D-462 say, point to them.
