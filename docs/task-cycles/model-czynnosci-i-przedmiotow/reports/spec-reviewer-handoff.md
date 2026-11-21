# Handoff — the reviewer of the spec (`write-spec`, reviewing)

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; nothing it answers is that person's approval. You ask no human; questions go back to the orchestrator.

## Where you work

- Worktree (your working directory): `the root of the task's worktree` — branch `task/model-czynnosci-i-przedmiotow`, base `aff09e987e3b64801f9011b2f8ad69c4723b4521`. The pinned the-way is the worktree's `.the-way` (`19e5774aed6d1d628042e23deccc110ed9f112c0`).
- Your method: `.the-way/task-cycle/spec/SKILL.md` (`write-spec`), the variant **reviewing** a spec (section 3): read that `SKILL.md` whole and then `.the-way/task-cycle/spec/review.md`. You are not the designer and you did not write the spec. Do not call a skill; read the files.
- Your stage and its boundary: review the spec and return `PASS` or `FAIL` as its first line of the report. You change no file but your report. You write no spec, plan, code or foundation entry; you run no test.
- Your directory for working copies: `.runs/spec-reviewer/` (directly under the ignored `.runs/` of the worktree).
- The spec: `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md` (this is the first review; there is no `spec-reviewed.md`).
- The frozen task, read whole: `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md`.
- Report path (the file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it): `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/spec-reviewer-report.md`; its first line is `PASS` or `FAIL`; it holds **Unread material** and **Searches not found or unclear** (each `none` where nothing).
- `cycle.md` and the other files of `.runs/task-cycles/model-czynnosci-i-przedmiotow/` — handoffs, other reports — are not yours to read, except the designer's report: `reports/designer-report.md` (its **Unread material** and its two assumptions are part of what you check).

Working copies (the first paragraph of "Working copies" of the cycle's skill, word for word):

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## What the reviewer checks against (read whole each, selected by the orchestrator)

The parts the change touches: `simulation`, `browser-view`, `balance-tools`, `product-foundation`. Entries in `foundations/` of the worktree, by identifier (find a decision by `### D-nnn` in `foundations/decisions.md`; never read the whole file):

- Decisions: D-145, D-290, D-121, D-318, D-363, D-293, D-380, D-18, D-23, D-26, D-60, D-63, D-71, D-142, D-82, D-64, D-50, D-120, D-126, D-128, D-140, D-143, D-144, D-150, D-179, D-181, D-193, D-206, D-401, D-289, D-309, D-291, D-306, D-310, D-334, D-340, D-387, D-416, D-27, D-427, D-428, D-429, D-437, D-439, D-440, D-441, D-442, D-425, D-34 and the decisions they link to.
- Invariants: `content-identifiers`, `icon-credits`, `program-closed-lists`, `program-world-reference`, `save-version`, `instrument-game-agreement`, `balance-instrument-file-writes`, `balance-instrument-repeatability`, `judging-cache-reading`, `previous-save-programs-reader`, `simulation-isolation`.
- `foundations/glossary.md` and `foundations/part_map.md` (whole).
- Guidelines (whole each): `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-content-data.md`, `guidelines/coding-saved-game.md`, `guidelines/coding-balance-instrument.md`, `guidelines/coding-browser-module.md`.

## What to look at in particular (your own judgment decides the rest)

1. The spec against the frozen task: every *To do* item 1–15, the *Acceptance criteria*, the *Settlements to record* rows 1–15, Questions 1–11 — each met, none contradicted, none widened.
2. The spec against the foundation: no decision, invariant or guideline contradicted unless the task itself carries the change (name each change the spec makes to an entry and whether the task carries it).
3. The two assumptions of the designer's report (`reports/designer-report.md`, "What the task requires, and what I assume"): the reading of *To do* 15 (is the pair of revision and fingerprint what the item asks, or must the count itself not repeat?) and the sentence the spec adds to D-289 beyond the task.
4. Claims about the code the spec rests on — verify each against the code at the base: that the readers named read the tables at call time while `ITEM_IDS` of `saved-game.ts` and `ITEM_ORDER` of `judging-cache.ts` capture at load; that the check builds an action from `kind` and `item` alone and the load refuses extras by comparison; that `resources.ts` is the exemplar of `content-data` (D-34); the list of hand-written kind lists (`goalOf`, `USES_BACKPACK`). The designer left parts unread (its report's **Unread material**: `src/browser/sim/programs.ts` 421–840, most of `saved-game.ts`, `previous-programs.ts` 1–54, most of `rule-panel.tsx` and `knowledge-lines.ts`, `tests/invariants/test_program_closed_lists.py` 231–581); read what a claim of the spec needs there.
5. Whether the saved game's version rise and the new keys of `minutesByAction` and `Backpack` are all the saved game's shape change (look at `src/browser/sim/saved-game.ts` and `guidelines/coding-saved-game.md`), and whether Decision 5's stored-form version 2 reaches every reader of the stored value.
6. Trust boundary — the spec's section for it against `saved-game.ts`, `previous-programs.ts`, `judging-cache.ts` and the icons: anything crafted input could do that the section misses.

## What you return

The status line `PASS` or `FAIL` as the report's first line, the report path, and for a `FAIL` the findings, each with where it shows and what to change; no check result. Your return names the report's path and its first line.
