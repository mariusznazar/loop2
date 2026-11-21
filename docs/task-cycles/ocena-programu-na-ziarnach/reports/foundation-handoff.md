# Handoff — the agent of the plan's Foundation entries, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human; return `blocked` where `task-cycle/skill/foundation_step.md` says a question is for the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`; the base of this work and of slice 1 is `c36e2739883002af2b959b787eb0880b748fd7e5`, the current HEAD). Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. `npm ci` has run there.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant: **"the whole change as the one author"** is NOT yours; you take none of its rows. You are the agent of the plan's *Foundation entries*: read `.the-way/task-cycle/skill/foundation_step.md` whole, and the `SKILL.md` of the element of each entry you write, at the path that file gives (`elements/decisions/skill/SKILL.md` for a decision, `elements/glossary/skill/SKILL.md` for a glossary term, in the pinned `.the-way`), each whole, with `elements/common/way_of_working.md`'s steps they name. Read the rest of `.the-way/task-cycle/change/SKILL.md` for the commits, the report and the own-work check only as far as it applies to entries (you write no code and no test).
- You write only the foundation entries listed below, in `foundations/decisions.md` and `foundations/glossary.md`, through the element skills, and commit them on the task branch (by path, never `git add -A`; messages in English in the repository's style, e.g. `docs: :card_file_box: …`, naming the decisions). Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` as the way of working gives, and fix what your entries broke. Do not write code, tests or the styleguide (other slices), and do not run the product's gate.
- Frozen task, read whole: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md` (its *Settlements to record*, *Decisions in play*, *Questions to settle* and *To do* 9 are your sources; the definition's projected entry stands quoted in *Decisions in play*).
- Plan (the section below is the plan's *Foundation entries*, copied word for word; the plan file is `.runs/task-cycles/ocena-programu-na-ziarnach/plan.md` — you do not open it): the entries and the constraint on quoted passages.
- Your report path (input of the cycle's scripts; the name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/foundation-report.md`. Your directory for working copies: `.runs/foundation/`.
- `cycle.md` and the other files of the record directory are not yours to read unless named here; it names the frozen task and your report path.
- Remarks of the orchestrator: (a) D-251 was withdrawn by task 24 (`foundations/decisions.md`, search `D-251`), so the task's mention of it as a standing decision is stale; where the task's changed decisions or the new decisions would cite it, cite what stands now; write nothing about it beyond that, and name it in your report. (b) D-189, D-179 and D-190 stand in the wording task 24 left; the sentence of D-190's *Rationale* about "no sweeping over many seeds" is corrected in that wording. (c) The projected entry's *Relations* and *Verification* are `TODO` in the definition: fill them from the code the plan will make (the slices: the pure judging function in `src/browser/sim/judging.ts` with its tests in `tests/sim/judging.test.mjs`; the remembered judgings and saved game in `src/browser/sim/saved-game.ts` with `tests/sim/saved-game-judgings.test.mjs`; the screen in `src/browser/view/maps-screen.tsx` with `tests/view/maps-screen.test.mjs`); a *Verification* that names a test file the slice will write is allowed as the plan names it; where the decisions' template wants a different form, follow it and say so. (d) The entry numbers: a new decision takes the next free number of the log; do not renumber others. (e) Every changed decision keeps word for word each passage a test quotes in a line `decision:` (search `tests/` for `decision: D-243`, `D-329`, `D-325`, `D-241`, `D-246`, `D-22`), taking its change as a sentence of its own or as words after the quoted passage, where the new meaning allows it; where it does not, a quoted passage changes and you name every test file quoting it in your report (the later slices follow). Do not run `foundation_check.py` without `--skip-test-citations`.
- *Decisions in play* of the task and the glossary are in the frozen task and `foundations/glossary.md`; select the rest of the foundation you read by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` (the decision log is large; use `decision_index.py` as that method gives it, with its output under `.runs/foundation/`).

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| (new) — How does the game judge a program before an earning loop? — with its *Relations* and *Verification*, which the definition leaves `TODO`, and the sentences of rows 1, 2 and 3 | decision (new) | projected entry of the definition carried in *Decisions in play* ("Realized by 2", "Written by 2"); rows 1, 2, 3 | Slice 3, Slice 7, Slice 10, Slice 11 |
| What the game remembers of a judging and when a program has the badge | decision (new) | row 4 | Slice 4, Slice 6, Slice 7, Slice 10 |
| D-243 — How does the player start an earning loop? | decision (change of its sentence) | row 5 | Slice 11, Slice 12 |
| D-329 — What stands at each character in the section „Kto idzie”, and in what order? | decision (change of its sentence) | row 6 | Slice 10 |
| D-325 — What does the screen Mapy show? | decision (change of its sentence) | row 7 | Slice 10 |
| D-241 — How does the game state hold earning loops? | decision (change of its sentence) | row 8 | Slice 5, Slice 6 |
| D-246 — What does the player read after being away? | decision (change of its sentence) | row 9 | Slice 13 |
| D-22 — Where does the simulation's randomness come from? | decision (a sentence added) | row 10 | Slice 3 |
| D-190 — What does a character's death take? — the sentence of its *Rationale* that says the game has no sweeping over many seeds | decision (rationale corrected, in the wording task 24 left) | row 11 | none |
| judging | glossary term (new) | row 12 | Slice 3, Slice 7 |
| loop record | glossary term (new) | row 13 | Slice 5, Slice 13 |

Every changed decision keeps word for word each passage of it that a test quotes in a line
`decision:`, taking its change as a sentence of its own or as words after the quoted passage, where
the new meaning allows it; a quoted passage the new meaning makes untrue is changed, and the slice
that changes the test file holding the quotation makes the quotation follow (Slices 5, 11 and 12
name theirs). The part map's entry of `test-helpers` follows in Slice 2, which adds its file; the
styleguide follows in Slice 9. No invariant is written.

## Report

Write the report as `make-change` gives it and `foundation_step.md` adds: for each entry one sentence of its meaning in English and one in Polish (the task document's language), its mark (`row <n>`, `projected` or `the cycle's`), the added pairs word for word where you add any; the commits; the check results with their commands and exit codes; every reach beyond your handoff; **Unread material** and **Searches not found or unclear** (each `none` where none). Return your status, the commits, a one-line check result and the report's path.
