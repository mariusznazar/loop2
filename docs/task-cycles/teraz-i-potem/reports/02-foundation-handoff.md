# Handoff 02 — the plan's Foundation entries (make-change, foundation step)

## Delegation

The human (Mariusz) started the-way task cycle for this task with `/the-way-implement-task` and delegated intermediate choices to the cycle's orchestrator. You are a fresh agent of the cycle. Send every question to the orchestrator by returning `questions` (or `blocked` for a question the foundation step leaves to the human); never ask the human, never start the next stage.

## Where you work

- Worktree (work from its root): `the worktree's root`, branch `task/teraz-i-potem`, current head `381588fbd31838b9c0075707a6588213cf6e5eaa` (the task's base; slice 1's base is the same commit).
- Pinned the-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it. Your stage is **the agent of the plan's *Foundation entries*** — none of the rows of its table of what you make; for that stage read `.the-way/task-cycle/skill/foundation_step.md` whole, and the skill of an element when you write an entry of that element: the project skills `the-way-record-decision` (`.claude/skills/the-way-record-decision/SKILL.md`) and `the-way-record-invariant` (`.claude/skills/the-way-record-invariant/SKILL.md`); each selects the reading its entry needs.
- Boundary: write only the foundation entries the plan's section *Foundation entries* lists, in `foundations/decisions.md` and `foundations/invariants.md` (and another foundation file only where an element's skill requires it for these entries, named in your report). No code, no test, no guideline file. Commit your work on the branch (`git add` by path; English commit messages in the repository's form `docs: :memo: …`). Do not run the product's whole gate; run `python -B .the-way/elements/common/foundation_check.py` as your focused check.
- Report path: `.runs/task-cycles/teraz-i-potem/reports/02-foundation-report.md`. Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, your own-work check, every reach beyond this handoff, your questions and concerns, for each entry written its meaning sentences and its mark (written whole, in part, corrected), and the section **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).

## The task, plan and answers of step 4

- Frozen task: `.runs/task-cycles/teraz-i-potem/task.md` — read it whole. Its *To do* point 6 gives the binding wording of the entries; *Settlements to record* rows 1–8; *Decisions in play* the current and projected wordings. Plan item `plan_mvp2_loop2.md — teraz-i-potem` (task 14).
- Plan: `.runs/task-cycles/teraz-i-potem/plan.md`; your list is its section `## Foundation entries` (lines 7–34), copied here word for word:

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| Row 1 — „Teraz” under the scene: the icon and the action as in the rule's row, at the right „reguła 2.1 · zostało 3 z 5 min”, the wait „Czeka — żadna reguła nie pasuje” with no rule and minutes, no progress bar, a fixed height | decision | *Settlements to record*, row 1 | Slices 3, 5 |
| Row 2 — „Potem”: the label, the icon and the action of the rule that wins now with „reguła 2.1”, in the minutes of an attack the combat rule the turn would choose, with no winner „żadna reguła nie pasuje — postać stanie” in `warning`, after the end the rule that wins at the stopped minute | decision | *Settlements to record*, row 2 | Slices 3, 5 |
| Row 3 — a click or a key on „Teraz” or „Potem” scrolls the program once to its rule, a folded group to its header; a row with no rule scrolls nothing | decision | *Settlements to record*, row 3 | Slice 6 |
| Row 4 — after a death „Teraz” reads its cause in `text`, the clock stands at the minute of death | decision | *Settlements to record*, row 4 | Slices 3, 5, 7 |
| Row 5 — a met requirement of the solving condition: its name, its numbers and the fill of its bar in `positive` | decision | *Settlements to record*, row 5 | Slices 1, 4, 8 |
| Row 6 — the bar of the solving condition stands after the end, at the stopped minute, with the current streak | decision | *Settlements to record*, row 6 | Slices 4, 8 |
| Row 7 — the body row in cells, the notes under temperature and satiety, their words, rounding down, from minute zero and after the end | decision | *Settlements to record*, row 7 | Slices 1, 2, 9 |
| Row 8 — in the minutes of an attack „Teraz” reads „Walczy z wilkiem” alone | decision | *Settlements to record*, row 8 | Slices 3, 5 |
| D-311 — How is the screen of a map run laid out? (the part this task's code makes true, in the binding wording of To do 6; its *Rejected* loses the clause To do 6 names) | decision, changed | projected entry „How is the screen of a map run laid out?”, Pytanie 11, To do 6 | Slices 5, 7, 8, 9 |
| D-133 — Where does the player see a map run's streak and a map's solving condition? (whole, in the projected wording) | decision, changed | projected entry D-133, *Decisions in play* „Zadanie zapisuje w całości” | Slices 4, 8 |
| `rule-state-from-pick` (in the wording of To do 6, with the D-147 exceptions); check: review, as its *Method* stays | invariant, changed | projected entry, Pytania 9, 14, 15, To do 6 | Slices 3, 5, 6 |
| D-147 — What record of an encounter does the player read? (the part this task makes true: the sentence on „Teraz”) | decision, changed in part | projected entry D-147, Pytania 9 and 14 | Slices 3, 5 |
| D-122 — What does a map run do, and what does the player see, when something is discovered? (the transitional sentence and the two *Verification* examples of To do 6) | decision, changed in part | projected entry D-122, Pytanie 12, To do 6 | Slice 7 |
| D-132 — What does the screen show, and what can the player do, after a completion? (the transitional sentence of To do 6) | decision, changed in part | projected entry D-132, Pytanie 12, To do 6 | Slices 3, 5, 7 |
| D-39 — What do the signal colours of the browser view mean? (the sentence To do 6 adds) | decision, added to | projected entry D-39, Pytanie 5 część 1, To do 6 | Slices 1, 8 |
| D-40 — What do the neutral roles of the browser view mean? (the sentence To do 6 adds) | decision, added to | projected entry D-40, Pytanie 5 część 1, To do 6 | Slices 1, 8 |
| D-62 — *Verification*, the example To do 6 gives | decision, example corrected | To do 6, last bullet | Slice 7 |
| D-135 — *Verification*, the example To do 6 gives | decision, example corrected | To do 6, last bullet | Slice 8 |
| D-178 — *Verification*, the example To do 6 gives | decision, example corrected | To do 6, last bullet | Slice 9 |
| D-57 — *Verification*, the example To do 6 gives | decision, example corrected | To do 6, last bullet; *Decisions in play* „Przykład do poprawy” | Slice 9 |
| D-46 — *Verification*: „the clock of the map run in the status row of the header” (the cycle's) | decision, example corrected | To do 6, last bullet: the plan's answer „wszystkie, każdy w zadaniu, którego zmiana go unieważnia”; the task does not name it | Slice 7 |
| D-324 — *Verification*: „the status row ending in „ (pauza)”” (the cycle's) | decision, example corrected | as D-46 | Slice 7 |
| D-280 — the binding sentence „its minute being the map run's game minute as the status row writes it” and its *Rationale* „it reads as the status row does” (the cycle's): the writer judges whether naming the clock keeps the meaning or is a question | decision, reference corrected | found by the planner; the task does not name it | Slice 7 |
| D-291 — Which icon stands for an action? (its sentence lists where the icon stands; rows 1 and 2 add „Teraz” and „Potem”): the writer's search ties the rows to it or extends it | decision, possibly changed | rows 1 and 2 | Slice 5 |

- Spec: none.
- Trust boundary: no. Irreversible operation: no. (The entries describe screens and counting; nothing touches `src/browser/sim/saved-game.ts` or `assets/**`.)

## Orchestrator's rulings that bind you

- Wording: where To do 6 gives a binding wording, write it as given (English, the log's style); the rows of *Settlements to record* become decisions in the log's form, each where its element's skill places it (a new decision, or a sentence of an existing one where the skill finds the question is the same), with *Origin* naming the task note as the log's other entries name task notes („teraz_i_potem_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), …”).
- *Relations* and *Verification* of the projected entries have `TODO` in the definition (task, *Decisions in play*): settle them while writing, as the element's skill gives.
- D-280: the clause „as the status row writes it” names where the same game minute is written; after this change the clock of the header writes it („Minuta 212”). Replacing the reference with the clock of the header keeps the meaning; make that correction and name it in your report. Only if you find the meaning would change, return it as a question instead.
- D-46, D-324: correct their *Verification* examples for the header without the status row, as the plan's answer quoted in To do 6 („wszystkie, każdy w zadaniu, którego zmiana go unieważnia”) covers.
- D-291: search it and tie the rows „Teraz” and „Potem” to it or extend its list of places, whichever its wording needs; name what you did.
- Colours: the task's red and grey of the body row's notes are left to slice 1 (the styleguide); write no role for them in the log unless an entry of To do 6 says so.

## What to read

- The frozen task whole; the plan's section above.
- Decisions, each whole: D-311, D-133, D-147, D-122, D-132, D-39, D-40, D-62, D-135, D-178, D-57, D-46, D-324, D-280, D-291, D-308, D-309, D-310, D-320, D-130, D-188, D-125, D-185, D-216, D-282, D-333.
- Invariants, each whole: `rule-state-from-pick`.
- The approved definition's projected entries the task carries, for the reasons and rejected ways the log's entries give: `the project definition in the author's notes`, section *Projected foundation changes* — the entries „How is the screen of a map run laid out?”, D-133, D-147, D-122, D-132, D-39, D-40 and „rule-state-from-pick” (find each by its heading or identifier). The task's To do 6 binds where it differs.
- `foundations/part_map.md`, the parts `browser-view`, `simulation`, `product-foundation`.
