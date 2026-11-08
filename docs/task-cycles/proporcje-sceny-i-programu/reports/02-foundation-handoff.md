# Handoff 02 — the agent of the plan's *Foundation entries* (stage: foundation step)

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator of
`implement-task`; the orchestrator's go-ahead is provisional and never the human's approval. You
never ask the human; a question the foundation step reserves to the human is returned with the
status `blocked` and named in the report, as `.the-way/task-cycle/skill/foundation_step.md` gives.

## Where you work
- Worktree (work from its root): `the worktree's root`, branch `task/proporcje-sceny-i-programu`. The branch head is the base of this stage and of slice 1: `01b26d54d1fea63de8570ca854814ff8e564048c`.
- Shell: Windows 11; Git Bash and PowerShell. Commit with `git add <path> …` by explicit paths, never `git add -A`; commit messages in English in the style of the repository's log (`docs: :memo: …`); end each message with the line `Co-Authored-By: Claude <noreply@anthropic.com>`. Commit with `git commit -F <file>` if the message holds quotes. Do not push.
- The base checks have ended; the tree is yours. `python -B .the-way/elements/common/foundation_check.py` is the check you run on your own result.

## Method and stage
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`). Variant: none of its table's rows — you are the agent of the plan's *Foundation entries*. Read that `SKILL.md` whole, then `.the-way/task-cycle/skill/foundation_step.md` whole. Read `.the-way/task-cycle/skill/return_step.md` only if its step comes (it does not here).
- Stage and boundary: write the foundation entries below through the project skills of their elements (`the-way-record-decision` for every entry here; others only if your search of the foundation shows a glossary term or an invariant is needed — name that in the report and ask via `questions`, do not write an entry the plan does not list), on the task branch, and return before any slice is made. You write no product code and no test. You are not a slice and you do not run `npm test`.
- Full report path: `docs/task-cycles/proporcje-sceny-i-programu/reports/02-foundation-report.md`. Report format: that of `make-change` section 6, with, for each entry, one sentence of its meaning in English and one in Polish (the task document's language), marked `row <n>` or `the cycle's`, and **Searches not found or unclear** (each thing you looked for and did not find, or `none`). The checks you ran stand with command and exit code.

## Inputs
- Frozen task (read whole): `docs/task-cycles/proporcje-sceny-i-programu/task.md`. It carries three accepted rows in *Settlements to record* (rows 1–3) and names the decisions in play. Its *Questions to settle* 1–6 and their *Not chosen* options are the sources of the *Rejected* of each decision.
- The plan (read only its section *Foundation entries* and *Choices*; it names the entries and words none): `docs/task-cycles/proporcje-sceny-i-programu/plan.md`. The section *Foundation entries* is copied here word for word:

```
| Entry | Kind | From | What depends on it |
|---|---|---|---|
| Row 1 — the panel of a rule or a rule group opens in place, under the row of the rule or the header of the group it changes, on the screen of a map run and on Programy | decision | Settlements to record, row 1 (questions 1 and 3) | Slices 1, 2, 4, 5, 6 |
| Row 2 — the screen of a map run has two columns under its header: on the left the world with, under the drawing of the map and the line of a tile, the area with the tabs „Kronika” and „Teren”; on the right the program | decision | Settlements to record, row 2 (questions 1, 2 and 6) | Slices 4, 5, 6 |
| Row 3 — the scene has one size, 672 × 304, twice its picture | decision | Settlements to record, row 3 (question 1, To do 4) | Slices 3, 6 |
| D-311 (changed: three areas become two columns, the place of the tabs, the rule opened from its row) | decision | Decisions in play; rows 1 and 2 | Slices 4, 6 |
| D-288 (changed: the rule panel stands under the rows, not beside them) | decision | Decisions in play; row 1 | Slices 1, 2, 5, 6 |
| D-282 (changed: the examples of areas of the screen of a map run and of Programy) | decision | Decisions in play; rows 1 and 2 | Slices 1, 2, 4, 6 |
| D-19 (changed: the list of revealed tiles no longer stands in the area the editing takes) | decision | Decisions in play; row 2 | Slice 4 |
| D-338 (changed: the chronicle's filters are no longer in a right area) | decision | Decisions in play; row 2 | none of the slices; wording only |
| D-343 (changed: the title and body speak of a right area) | decision | Decisions in play; row 2 | Slices 4, 6 |
| D-345 (changed: the rationale speaks of a right area) | decision | Decisions in play; row 2 | none of the slices; wording only |
| D-346 (changed: the tab picked is kept in the area under the world; a closed panel gives nothing back) | decision | Decisions in play; rows 1 and 2 | Slice 4 |
| D-334 (changed only where its *Rejected* names a right area; the place of the end of the map run stays open for task 16) | decision | Decisions in play; row 2; Out of scope | none of the slices; wording only |
```

- What the plan adds under that table: D-280 is read and stays as it is. D-336 and D-43 bear on the change and need no change. No invariant, glossary entry, environment fact or part-map entry is written.

## Notes from the orchestrator
- Each row is written **whole**, as an entry of its kind, its meaning the row's and its wording yours (WAY-134). The row's settlement may already be stated by a decision the changed entries below carry; where your search of the whole foundation (WAY-33) finds that, tie the row to that entry instead of writing a second one, as `foundation_step.md` gives, and say so in the report. Row 3 has no decision of the log naming the scene's display size (the planner found only D-317 mentioning "pictures scaled up"): you decide whether it is a new decision or a clause of D-311, by your search.
- The nine "changed" decisions change by what the rows settle: change the sentences the task's *Decisions in play* quotes, and what follows from the change in the same entry (*Verification*, *Rationale*, *Rejected* where it speaks of the old layout), no more. Their `Origin` fields get the task document named by what it is, as the existing entries name theirs (a vault note and its section, no absolute path).
- **Out of scope, do not decide:** the place of the end of the map run (question 6, answer E1): task 16 chooses it. Where an entry you change speaks of the end of the map run standing in the right area, say only what is true after this change and leave the place open; do not place it under the world or elsewhere.
- Do not write a figure the task calls arithmetic (526 px in a window 1280 px wide, 622 px at content 1344 px; the 706 px world area) as a measured fact; the task gives those as a rule's cost in the comparison, not as a requirement. A figure enters an entry only if the decision needs it and its source is the task's question 1.
- Every changed decision keeps its identifier; none is withdrawn. Where a changed decision's meaning changes beyond what the task document carries (WAY-30), return `blocked` with the question for the human.
- Entries are written through `the-way-record-decision` (read its `SKILL.md` and what it names, as it gives). The foundation check is yours to run: `python -B .the-way/elements/common/foundation_check.py` must report `0 errors` for the foundation after your commits (it may report files claimed by no part: say what it printed).

## Return
Return the status, the commits, a one-line check result naming what failed or did not run, and the report path.
