# Handoff — the designer of the spec (`write-spec`, writing)

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator (the cycle), which answers your questions; nothing it answers is that person's approval. You ask no human. Questions go back to the orchestrator as `questions`.

## Where you work

- Worktree (your working directory, root of the task's branch): `the root of the task's worktree` — branch `task/model-czynnosci-i-przedmiotow`, base `aff09e987e3b64801f9011b2f8ad69c4723b4521`. The pinned the-way is the worktree's `.the-way` (commit `19e5774aed6d1d628042e23deccc110ed9f112c0`).
- Your method: `.the-way/task-cycle/spec/SKILL.md` (`write-spec`), the variant: **writing** the spec (you are the designer). Read that `SKILL.md` whole; read `.the-way/task-cycle/spec/design.md` when its step comes (section 2 of the method). Do not call a skill; read the files.
- Your stage and its boundary: write `spec.md` and return before any plan, slice or code. You write no code, no foundation entry and no test. You run no test or other check.
- Your directory for working copies: `.runs/designer/` (directly under the ignored `.runs/` of the worktree). Make nothing in the system's temporary directory, in the scratch directory of a session or in the main checkout.
- Spec path: `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md`.
- Report path (full report; the file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it): `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/designer-report.md`. Its first line is yours; it holds the sections the method names, among them **Unread material** and **Searches not found or unclear** (each `none` where nothing).
- `cycle.md` and the other files of `.runs/task-cycles/model-czynnosci-i-przedmiotow/` — other agents' handoffs, reports, findings — are not yours to read, except those this handoff names.

Working copies (the first paragraph of "Working copies" of the cycle's skill, word for word):

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## The task and the open choice

- The frozen task, read whole: `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md` (its approval: the day advisor's, 2026-11-20; *To do* item 15 was added by the day advisor after it — settle it as part of the task, see below).
- The open design choice the cycle found (the cycle holds no way as settled): the task document's section *Questions carried to cycle* (the whole section is the choice) — and what *To do* leaves in the same place. Name for each the ways open, what each costs now and later, and choose with the evidence. The choices to settle:
  1. How the game's data tell an item that is made (the bandage) from a resource that lies on maps — and with that whether the item's identifier is the resource's identifier (`export type ItemId = ResourceId;` in `src/browser/sim/data/items.ts` today), and what is then the map-side word for "what gathering gives".
  2. Where the recipe and the healing property stand in the data: in the row of the item (as `fuel`, `food`, `lightable` today) or in a table of recipes; what an overlay of the balance instrument (`balance/overlay.mjs`, `OVERLAY_TABLES`) then has to know.
  3. The shape of an action of the character that is "a verb with a target", in the types and the data (`src/browser/sim/types.ts`, `Action`; `src/browser/sim/data/actions.ts`), how the program's check, the load of a saved game, the repertoire (`understanding.ts`), the revelations (`data/revelations.ts`, the new kind of event "the first crafted piece of an item"), the editor's picks (`view/program-editor.ts`) and the balance instrument read it, with the targets of a verb derived from the items' properties, so that the second item (the acceptance criterion) is a row of data.
  4. How a program written with today's actions (own kinds of action, also pulled from a previous save, D-401) stays the same, as the projected decision's second sentence says.
  5. *To do* item 15 — how the revision of a program's content is made not to repeat for different content (the way the designer of the judging rejected for its cost, the moment of the change as the revision, is one way open; the decision is D-442, the cache D-441, the judging D-439 and D-440), and what the comment of `isAboveLoaded` in `src/browser/view/judging-cache.ts` (about line 250) should say or whether it goes.
  Settle each of the five as a choice of design; do not widen the task; do not settle what the task, a decision or the human's answers (*Questions to settle*, 1–11) already settle — quote them.

## Foundation and guidelines you read (whole each), selected by the orchestrator

The parts the change touches: `simulation`, `browser-view`, `balance-tools`, and `product-foundation` (the foundation entries it writes). Read the entries in `foundations/` of the worktree, by identifier (find a decision by `### D-nnn` in `foundations/decisions.md`; never read the whole file):

- Decisions (the task's *Decisions in play*): D-145, D-290, D-121, D-318, D-363, D-293, D-380, D-18, D-23, D-26, D-60, D-63, D-71, D-142, D-82, D-64, D-50, D-120, D-126, D-128, D-140, D-143, D-144, D-150, D-179, D-181, D-193, D-206, D-401, D-289, D-309, D-291, D-306, D-310, D-334, D-340, D-387, D-416, D-27, D-427, D-428, D-429, D-437; for item 15 also D-439, D-440, D-441, D-442 and the decisions they link to.
- Invariants (`foundations/invariants.md`, by identifier): `content-identifiers`, `icon-credits`, `program-closed-lists`, `program-world-reference`, `save-version`, `instrument-game-agreement`, `balance-instrument-file-writes`, `balance-instrument-repeatability`.
- The glossary `foundations/glossary.md` (short, whole) and the part map `foundations/part_map.md` (whole).
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-content-data.md`, `guidelines/coding-saved-game.md`, `guidelines/coding-balance-instrument.md`, `guidelines/coding-browser-module.md`. (The spec changes no screen: the styleguide and the testing guidelines are for the author's handoff; reach for them selectively if a choice needs them, and name the reach.)

## What the spec must show about the code (read to design, not to write)

The files named in the task's *Context* and *Questions carried to cycle*: `src/browser/sim/types.ts`, `src/browser/sim/data/{items,resources,actions,revelations,maps,balance}.ts`, `src/browser/sim/{program,programs,run,understanding,saved-game}.ts`, `src/browser/view/{program-editor,rule-panel,knowledge-lines}.ts(x)`, `balance/{overlay,describe,trace,engine}.mjs`, `tests/invariants/test_program_closed_lists.py`, `src/browser/view/judging-cache.ts`, and the code of the revision counter D-442 names. The task's counts of files per kind of action are the baseline of its cost table (*To do* 14) — do not recount.

## Trust boundary and irreversible operation (the answers of step 4)

- Trust boundary: yes — `src/browser/sim/saved-game.ts`, `src/browser/sim/previous-programs.ts`, `assets/icons/**`, `src/browser/view/judging-cache.ts`. The spec names how crafted input at each is handled (a saved game with an action whose target the data do not give, an item identifier the data do not hold, a stored judging under a changed revision).
- Irreversible operation: no — the bump of the saved game's version clears saved games once deployed; the cycle deploys nothing.

## What you return

Status (`questions`, `done` or `reserved`), the spec path and your report path, as the method's section 4 gives; no check result. `questions` go in your return and in the report; a question the task, the foundation or the code answers you answer yourself.
