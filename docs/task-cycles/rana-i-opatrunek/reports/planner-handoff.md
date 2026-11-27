# Handoff — the planner of the task rana-i-opatrunek

You are the planner (stage: `plan-task`) of a task cycle of the-way. The orchestrator of the cycle
dispatched you as an agent of the type `the-way-stage`.

## Delegation

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator.
You never ask the human; questions go back to the orchestrator in your report, with proposed answers
and evidence. Nothing the orchestrator answers is the human's approval.

## Where you work

- The worktree and your working directory: `the worktree's root` (branch `task/rana-i-opatrunek`, base commit `be4e9c09f3c45f421d04983948a88bd6240809bf`). Work from its root; read the-way from its `.the-way` (pinned at `6ed3cb364adedacea214d2a0df690cea32f2e72f`), never from another copy.
- The method of your stage: `.the-way/task-cycle/plan/SKILL.md` (`plan-task`). Read it whole. Read a file it names inside `.the-way` only when the step that names it comes (for example `.the-way/task-cycle/slice_size.py` is run, `.the-way/task-cycle/plan/too_large.md` is read only after a too-large attempt, which there was none of).
- Your stage and its boundary: write the plan of the change in full, check the size of each slice, return before any slice is made. You write only the plan file, the size report and your report; no code, no test, no foundation entry. The cycle record `cycle.md` and the other files of the record directory (other agents' handoffs, reports, findings) are not yours to read unless this handoff names them.
- The ignored record directory of the cycle: `.runs/task-cycles/rana-i-opatrunek/` (relative to the worktree).
- Write the plan to `.runs/task-cycles/rana-i-opatrunek/plan.md`, its size report to `.runs/task-cycles/rana-i-opatrunek/plan-size.md`.
- The full report goes to `.runs/task-cycles/rana-i-opatrunek/reports/planner-report.md`. That file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it), which is why its name begins with the role and not with `report`. Where your tool refuses the write all the same, return the report whole as your answer.
- The name of your directory for working copies: `.runs/planner/` (relative to the worktree).

## Working copies (word for word)

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

## The task and its frozen copy

- The frozen task (read it whole; you divide the whole change): `.runs/task-cycles/rana-i-opatrunek/task_frozen.md` (sha256 `55c86eaf63df7156`). It is a plan member of a project plan; its sections *To do* (items 1–10), *Questions to settle* with answers, *Settlements to record* (rows 1–10, row 11 rejected with a reason), *Decisions in play* and *Out of scope* are all binding. The plan's *Projected entries* gives this task no entry to write.
- Spec: none (no open design choice was found at start; see below).
- The move of the pin: none (the pin was not moved by this task); no checks carried from it.
- No test fails on the base: the CI run on the base's branch was green (3468 node tests, 718 Python tests).

## Answers of step 4 (the two questions at start)

- Trust boundary: **yes** — the part map names `src/browser/sim/saved-game.ts` (and `src/browser/sim/previous-programs.ts`) as the trust boundary of the part `simulation`; item 9 of the task raises the version of the saved game's shape, which touches `saved-game.ts` and the tests that read a saved game. Mark each slice whose *Change* holds a file the part map names as a trust boundary (`src/browser/sim/saved-game.ts`, `src/browser/sim/previous-programs.ts`, and for browser-view `src/browser/view/judging-cache.ts` and the other files its *Trust boundary* lists, should a slice change them) with `trust boundary — <which>`; every such slice gets a review of its own, and every code review of the cycle checks crafted input at that boundary.
- Irreversible operation: **no**.
- Route: planned slices (the cycle judged that one agent cannot hold this change: data of the simulation, several modules of the simulation, the saved game's version, the screen Postać and the program editor of the browser view, the balance instrument with a new reference program, the tests, and the entries of the foundation).
- Open design choice: none found by the orchestrator; if you find one in the code, return `returned` as section 2 of your method gives. The orchestrator expects these to be choices of how to make what is settled, to list under *Choices*: where the rank of „Szybkie gojenie” enters the natural regain of health; the shape of the two new kinds of branch effect in `BranchEffect` (`src/browser/sim/data/skills.ts`); how the balance instrument builds the row with a bought Ucisk and a bandage in the belt pocket; how the pocket refill for Ucisk reuses what task 8 built for the gear; the order of the new reference program's „Zabierz” list.

## What you read (named by me; each guideline file whole)

Foundation, by identifier (read each entry whole; use `python -B .the-way/elements/common/decision_index.py --output .runs/planner/index.md --decision <ID> …` for the index and open whole the ones you need; the file `foundations/decisions.md` is 1.5 MB — never read it whole):

- the decisions of the task's *Decisions in play*: D-379, D-144, D-150, D-145, D-199, D-290, D-380, D-363, D-387, D-120, D-140, D-126, D-192, D-443, D-191, D-193, D-195, D-196, D-197, D-289, D-293, D-309, D-146, D-60, D-374, D-136, D-24, D-428, D-429, D-427, D-206, D-438 (the log at the base holds only the first paragraph of D-438 and the older wording of the entries the task says task 3 rewrote; compare with the code);
- the decisions of the gear and of the pockets that Ucisk stands on: D-461, D-460, D-458, D-459, D-457, D-456, D-455, D-451, D-340, D-147, D-143, D-183, D-187;
- the invariants: `instrument-game-agreement`, `program-closed-lists`, `action-duration-minimum`, `save-version`, and `function-and-file-size` (with D-425, the rule of size — see below);
- the glossary: whole (`foundations/glossary.md`, 11 KB) — terms `gear`, `wall`, `combat turn`, `Understanding`, and the others the task uses;
- the part map: `foundations/part_map.md`, whole (the parts `simulation`, `browser-view`, `balance-tools`, `product-foundation`, `agent-workflow` are touched).

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-content-data.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-saved-game.md`, `guidelines/coding-browser-module.md`, `guidelines/coding-balance-instrument.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`. Name in your report what you find missing or uncertain in them. With the styleguide read its order-of-work example and follow it or explain the departure.

The balance instrument's skill, whole, because the task's item 5 is a measurement the cycle makes with it: `.claude/skills/loop2-balance/SKILL.md` (the copy in this worktree, as committed).

Code and tests, as you need them to name each slice's files: at least `src/browser/sim/data/skills.ts`, `actions.ts`, `items.ts` (or where the data of the bandage stand), `archetypes.ts`, `src/browser/sim/combat.ts`, `program.ts`, `understanding.ts`, `trip.ts`, `gear.ts`, `saved-game.ts`, the module that regains health, `src/browser/view/` (the screen Postać, the rule panel and the program editor), `balance/`, `tests/sim/reference-programs.mjs`, `tests/sim/`, `tests/balance/`, `tests/view/`. The orchestrator did not read them; you read to cut slices.

The rule of size: where a slice adds to a function or a file standing over the threshold of D-425, the plan begins with a slice that moves a part out without a change of behaviour (bullet in section 3 of your method). Find the functions and files over the threshold by running `node tests/quality/eslint-size-rules.mjs` in a working copy of the base in your directory (`.runs/planner/`, a checkout with `.the-way` and `node_modules` as the product's rules give), or by reading the code.

## What to be careful about (from the task, so you do not miss it)

- Item 5 asks for a **measurement by the balance instrument** and a **new reference program** at the end of `tests/sim/reference-programs.mjs` (D-427, D-428); the measurement is a step of the cycle's end, made by the orchestrator, not a slice's code — but the program and any change of the instrument that its three-row table needs (the flag `--ranks` is given by `check-map`, not by `progression`; the row with Ucisk gives the character a bandage in the belt pocket) are slices. Say in the plan which slices make them and what the orchestrator then measures; the plan is no place for the program's text.
- Item 6: a program that makes no bandage, applies none and presses none must end the same after the change as before it (the wolf pack's result without a bandage must not fall): include a check for it.
- Item 9: the version of the saved game's shape rises by one; the guidelines `coding-saved-game.md` say what holds (a test of the old and the new version, a strict reader). Mark the slice a trust boundary.
- Item 10: *Foundation entries* lists the entries the task says the foundation gets: the rows 1–10 of *Settlements to record* by row number, and the changes to the decisions of *Obecne decyzje, które zadanie zmienia* (D-379, D-144, D-150, D-145, D-199, D-290, D-380, D-363, D-387, D-120) as they follow from the code. Name entries; never word them.
- Texts the game shows are in Polish and exact where the task quotes them („Opatrywanie małych ran”, „Mocniejszy zwój”, „Wprawna dłoń”, „Szybkie gojenie”, „Ucisk”, the descriptions of the branches, „Ucisk — Opatrunek (1 opatrunek)”, „zdrowie pełne”, „brakuje 1 × opatrunek”, „gałąź niewykupiona”, „tylko w walce”); the values of „Szybkie gojenie” stand with the decimal comma and with no trace of floating-point rounding („0,15”, not „0.15000000000000002”).
- Code, identifiers and comments are in English; what the code shows the player stays in Polish (the author's rule on the language of code).
- The icon of Ucisk is the existing `bandage-roll` — no new icon file, no new credit.

## Report

Write the full report as your method's section 5 gives it, with **Unread material** and **Searches not found or unclear** (each `none` where none). Return the status, the plan's path, a one-line check result and the report's path.
