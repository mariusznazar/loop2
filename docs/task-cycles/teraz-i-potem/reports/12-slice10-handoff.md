# Handoff 12 — slice 10 (make-change)

## Delegation

The human (Mariusz) started the-way task cycle for this task with `/the-way-implement-task` and delegated intermediate choices to the cycle's orchestrator. You are a fresh executor of the cycle. Send every question to the orchestrator by returning `questions`; never ask the human, never start the next slice or stage.

## Where you work

- Worktree (work from its root): `the worktree's root`, branch `task/teraz-i-potem`. The slice's base is the branch's head when you start (`git rev-parse HEAD`); the orchestrator recorded it.
- Pinned the-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it. You make **a slice, or the retry of a slice**; read a file it names (such as `slice.md` or `ui_check.md`) when the step or variant that names it comes.
- Class of model: cheaper (Sonnet), by the plan.
- Boundary: make slice 10 of the plan and nothing else; change only the files its *Change* names (a file outside it is a reach you name in your report, or a question). Commit by path (`git add <file> …`, never `-A`), English commit messages in the repository's form (`feat: :sparkles: …`, `test: …`, `docs: :memo: …`). Do not run the product's whole gate (`npm test` with no argument); run the focused checks of the slice's *Checks*.
- Report path: `.runs/task-cycles/teraz-i-potem/reports/12-slice10-report.md`. Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, your own-work check, every reach beyond this handoff, your questions and concerns, and the section **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).

## Task, spec, plan and answers of step 4

- Frozen task: `.runs/task-cycles/teraz-i-potem/task.md` (the human's task note, accepted 2026-11-07). Read the passages your slice's *Read* names.
- Spec: none. Plan: `.runs/task-cycles/teraz-i-potem/plan.md`.
- Trust boundary: no. Irreversible operation: no. No slice touches `src/browser/sim/saved-game.ts`, `src/browser/sim/types.ts` or `assets/**`; if yours would have to, return the question.
- The plan's *Foundation entries* are written (commit `bd44c39`): rows 1, 4 and 8 of *Settlements to record* stand in D-334, row 2 in D-335, row 3 in D-336, row 7 in D-337, rows 5 and 6 in D-133. Where the *Read* says "Foundation entries row N", read the entry named here.

## Your slice — copied word for word from `plan.md`

### Slice 10 — The rows of the new view files in the coding guidelines

- **Goal:** The table *Files of this kind* of `guidelines/coding-browser-module.md` gains a row for
  each of the two view files slices 5 and 6 created, src/browser/view/now-lines.ts and
  src/browser/view/now-rows.tsx, in the table's order, each with the status `copy` and the decision
  `—`: neither builds elements through the DOM API, which the status `do not copy` marks (the rule
  "Nowy ekran i moduły w DOM", D-265), and neither is the exemplar (D-36). Read the two files as they
  stand on the branch; where one builds elements through the DOM API, return a question to the
  orchestrator instead of writing `copy`. Work as the cycle's author the project skill
  `the-way-maintain-coding-guidelines` names: its section "Where the skill works", and in
  `.the-way/product-guidelines/coding/template.md` the section on `## Files of this kind` and
  "Writing the files", give what that author writes and from what; a step of the skill that leads a
  matter with the human is answered from the task (To do 5), and a matter the task does not settle
  returns to the orchestrator as a question. Nothing else of the file changes.
- **Change:** `guidelines/coding-browser-module.md`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:50-50` To do, item 5 · `guidelines/coding.md` ·
  `foundations/decisions.md:685-699` D-28 · `foundations/decisions.md:801-815` D-36 ·
  `foundations/decisions.md:5453-5494` D-265 · `foundations/decisions.md:5597-5622` D-269 ·
  `foundations/part_map.md:118-134` agent-workflow ·
  `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md` ·
  `.the-way/product-guidelines/coding/SKILL.md` · `.the-way/product-guidelines/template.md` ·
  `.the-way/product-guidelines/coding/template.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 5 · Slice 6

## Current ranges of the foundation entries your *Read* names

The ranges in the *Read* above are from the plan; the foundation step has moved them. These hold now (an entry runs from its heading to the next one):

| Entry | Range now |
|---|---|
| D-28 | `foundations/decisions.md:685-699` |
| D-36 | `foundations/decisions.md:801-815` |
| D-265 | `foundations/decisions.md:5468-5509` |
| D-269 | `foundations/decisions.md:5612-5637` |

Line ranges of the task, guidelines and code in the *Read* stand as the plan gives them, except where an earlier slice changed a file: find the passage again by its name.

## Orchestrator's notes for this slice

- The two files stand on the branch as slices 5 and 6 left them (commits `46e0ed9`, `92f6860`): `src/browser/view/now-lines.ts` and `src/browser/view/now-rows.tsx`.
- To do 5 says the change goes „przez `the-way-maintain-coding-guidelines`”. In a cycle no human is present: work as the cycle's author that skill names (its section "Where the skill works") and write the rows by the coding template's sections the slice names; answer from the task; a matter the task does not settle returns to the orchestrator as a question.
