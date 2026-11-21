# Handoff — the planner (`plan-task`)

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; nothing it answers is that person's approval. You ask no human; questions go back to the orchestrator.

## Where you work

- Worktree (your working directory): `the root of the task's worktree` — branch `task/model-czynnosci-i-przedmiotow`, base `aff09e987e3b64801f9011b2f8ad69c4723b4521`. The pinned the-way is the worktree's `.the-way` (`19e5774aed6d1d628042e23deccc110ed9f112c0`).
- Your method: `.the-way/task-cycle/plan/SKILL.md` (`plan-task`); read it whole; read `.the-way/task-cycle/plan/too_large.md` only if its case comes (it does not). Do not call a skill; read the files.
- Your stage and its boundary: write the plan and its size report and return before any slice is made. You write no code, no test, no foundation entry; you ask no human.
- Plan path: `.runs/task-cycles/model-czynnosci-i-przedmiotow/plan.md`; size report: `.runs/task-cycles/model-czynnosci-i-przedmiotow/plan-size.md` (run `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/model-czynnosci-i-przedmiotow/plan.md` as the method gives; keep its output in that file).
- Report path (the file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it): `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/planner-report.md`; it holds **Unread material** and **Searches not found or unclear** (each `none` where nothing).
- Your directory for working copies: `.runs/planner/` (directly under the ignored `.runs/` of the worktree). `node_modules` is installed in the worktree; if you run the size rule's test on the base, run it in the worktree itself on the clean tree (nothing is changed yet), not in a copy.
- `cycle.md` and the other files of `.runs/task-cycles/model-czynnosci-i-przedmiotow/` — handoffs, other reports — are not yours to read, except the spec and the frozen task named below.

Working copies (the first paragraph of "Working copies" of the cycle's skill, word for word):

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## What you plan

- The frozen task, read whole: `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md`. *To do* item 15 was added by the day advisor after the approval; the cycle carries it (it is independent of the model of actions and items: plan it as its own slice or slices).
- The reviewed spec, read whole: `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md` (reviewed: `PASS` after one revision). It binds where it settles more than the task; the task binds where they differ. Its **Left to the maker** list names what the planner and the authors choose.
- The orchestrator's choice of route: planning (the change spans the simulation's data, types and modules, the program check, the saved game, the revelations, the editor and its panel, the scene and credits, two icons, the balance instrument, the invariant tests, the foundation entries and the judging cache — more than one agent holds).
- The answers of step 4: trust boundary **yes** (`src/browser/sim/saved-game.ts`, `src/browser/sim/previous-programs.ts`, `assets/icons/**`, `src/browser/view/judging-cache.ts` — a slice whose files include one is marked so); irreversible operation **no** (the bump of the saved game's version clears saves once deployed; the cycle deploys nothing).
- The checks the move of the pin carried: none (the pin was not moved).
- The foundation entries the spec names (its section *Foundation entries*) are the plan's *Foundation entries*, with the rows of the task's *Settlements to record* as their row numbers; the plan names them and never words them. Rows 4 and 7 go to data and icons, not to the foundation. The cost table of *To do* 14 belongs to the request's description, not to a slice; name in the plan what a slice must report so that the orchestrator can count it (the files each slice changes are listed in its *Change*).
- Check the rule of size (D-425): `program.ts`, `programs.ts`, `run.ts`, `program-editor.ts`, `rule-panel.tsx` are large; where a slice adds to a function or file over the threshold, begin with a slice that moves a part out without a change of behaviour, as the method gives; read the threshold in D-425 and `guidelines/coding.md`.
- Slice classes: a class other than `cheaper` carries its reason; the data and type shape of the items and the targets module, and the judging-cache fingerprint, are designs the spec settled: weigh them as the method gives.

## Foundation and guidelines you read (whole each), selected by the orchestrator

The parts the change touches: `simulation`, `browser-view`, `balance-tools`, `product-foundation`, and `agent-workflow` (the guidelines under `guidelines/**` belong to it). Read the entries in `foundations/` of the worktree by identifier (find a decision by `### D-nnn` in `foundations/decisions.md`; never read the whole file), for each slice's *Read* by the method:

- Decisions (task's *Decisions in play* and the spec): D-145, D-290, D-121, D-318, D-363, D-293, D-380, D-18, D-23, D-26, D-60, D-63, D-71, D-142, D-82, D-64, D-50, D-120, D-126, D-128, D-140, D-143, D-144, D-150, D-179, D-181, D-193, D-206, D-401, D-289, D-309, D-291, D-306, D-310, D-334, D-340, D-387, D-416, D-27, D-34, D-425, D-427, D-428, D-429, D-437, D-439, D-440, D-441, D-442; also the decision that holds the rule of the part-map file assignment for the files a slice adds and the decision(s) of the testing and styleguide kinds a slice's checks need, which you find by search.
- Invariants: `content-identifiers`, `icon-credits`, `program-closed-lists`, `program-world-reference`, `save-version`, `instrument-game-agreement`, `balance-instrument-file-writes`, `balance-instrument-repeatability`, `judging-cache-reading`, `previous-save-programs-reader`, `simulation-isolation`, `loop2-container-icons`, `icon-file-content`.
- `foundations/glossary.md` and `foundations/part_map.md`, whole.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-content-data.md`, `guidelines/coding-saved-game.md`, `guidelines/coding-balance-instrument.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md` (read its example of the order of work and follow it or explain the departure).
- `src/browser/AGENTS.md` and `.claude/skills/loop2-scene-art/SKILL.md` (the credits and the two icons; the scene gets no new picture, only the icons of the items) — name them in the *Read* of the slice they bear on.

## What you return

Status (`done`, `done with concerns`, `questions`, `returned` or `reserved`), the plan path, the size report path and your report path; no check result is needed beyond the size script's command and exit code, which the report states.
