# Handoff — the foundation entries, group 1 (rows that need no web page)

You are a fresh agent of the plan's *Foundation entries*. Work from the worktree `the task's worktree` (branch `task/teksty-rozjechane-z-kodem`). The person who requested the cycle (Mariusz) delegated intermediate choices to the orchestrator, which answers your questions; you never seek the human. The orchestrator's answers are not the human's approval.

**Methods.** Read `.the-way/task-cycle/skill/foundation_step.md` whole, and `.the-way/task-cycle/change/SKILL.md` whole (the method `make-change`; you take none of its variants, your stage is the foundation step). Write each entry through the project skill of its element (`the-way-record-decision`, `the-way-record-environment-fact`, `the-way-record-glossary-term`): read that skill's `SKILL.md` from `.the-way` and the element's template, examples and `elements/common/rules.md` as `elements/common/way_of_working.md` steps 1-4 give. "Ask" in those skills means: return `questions` to the orchestrator. Commit on the task branch, `git add` by path, English commit messages in the style of `git log`.

**Boundary.** You write only `foundations/decisions.md`, `foundations/environment_facts.md`, `foundations/glossary.md`, and a further foundation file only where the element skill requires it. No code, no guideline, no test. Run `python -B .the-way/elements/common/foundation_check.py` after each entry (exit 0, `0 errors`); do not run the product's gate. Another run writes the other group of the plan's rows later, on this same branch; do not write its rows.

**Frozen task.** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md` (read it whole). **Plan.** `docs/task-cycles/teksty-rozjechane-z-kodem/plan.md`, its section *Foundation entries* (copied below word for word for your rows). Base of this step: `adbec4b025b9b5760bdb41b5d803794cbb062acd`.

**Answers of step 4.** Trust boundary: yes (the code slices that follow touch `src/server/configuration.ts` and `package-lock.json`; your entries bear on them: D-111, D-252). Irreversible operation: no. Open design choice: none. No spec.

**Your rows** (copied from the plan's *Foundation entries*):

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| Settlement row 1 — what `account-database-check` and `measure-passwords` print when they fail is no log line but a message to whoever ran the command, so it keeps the error's text and gets no JSON failure line; the code of both stays. The entry is D-252 as item 37 names it, or the entry that already holds the settlement if the writer's search of the foundation (WAY-33) finds one, D-354 being the neighbour to read first | decision | Settlements to record, row 1; To do 37; question 7 | Slice 10 (the rule "Recording a failure" of `guidelines/coding.md` follows it) |
| Settlement row 2 — the server refuses to start when the mail password file decodes to an empty password, a file of only a byte-order mark included (D-111) | decision | Settlements to record, row 2; To do 29; question 3 | Slice 4 |
| D-48 — *Origin* says the names of the tokens other than roles were chosen by the cycle (Decision 1 of its spec), not by question Q18 | decision | To do 24 | none |
| D-54 — *Rejected* no longer names sorting by name as a rejected variant; the *violates* example stays | decision | To do 25 | none |
| D-54, D-56 — "place on the list" in one meaning: the order of the characters does not change, the position number shifts when a character before it leaves | decision | To do 26 | none |
| D-56 — the binding sentence gives the number the first character of a game gets, as the code gives it | decision | To do 27 | none |
| D-67 — the first *complies* example speaks of a tile missing two sticks, the only kind that gets two back | decision | To do 28 | none |
| D-156 — *Rationale* does not call the player's webmail page a "mail service", the term D-111 uses for Outsider's SMTP service | decision | To do 30 | none |
| D-183 — *Rejected* gives the variant of question Q6 of the frozen task `git show 1b09f80:docs/task-cycles/plan-wyprawy/task.md` instead of "unknown" | decision | To do 31 | none |
| D-04, D-213 — they name the state D-211 calls "the unsaved game state" by that name, not "saved game state" | decision | To do 32 | none |
| D-101 — "restore" where "resurrect" meant bringing back a destroyed session | decision | To do 33; question 4, answer A | Slice 5 (the texts of two tests follow it) |
| D-207 — *Rejected* says a tab left open for a day sends about 2880 saves at the 30-second rhythm | decision | To do 35; question 5, answer A | none |
| `catch-up` — the glossary entry says what D-247 says: the computing runs from the save time after each load of a saved game state | glossary term | To do 36; question 6 | none |
| D-313 — *Rejected* drops the last variant (the group "Program" with the condition "Zawsze" added where the copy has none) that Mariusz did not consider | decision | To do 39 | none |
| D-313 — *Rationale* says why an action the rule panel offers no target for gives way to the next one; the reason stands in the cycle record `git show 2aae30a:docs/task-cycles/ekran-przejscia/cycle.md` (its Q9 row, its line 130, and its line 230) and where it is not there the writer returns the question | decision | To do 40 | none |
| D-147, D-185 — *Rejected* does not justify a rejection by the order "above discovery" that the screen no longer has | decision | To do 41 | none |
| D-312 — "Its further cost" names the third way another group comes before the one the game wrote into: the game's rule moved to a later group | decision | To do 42 | none |

**Rules that bind you beyond the method.**
- Take every quotation, number and place from its source — the task, the code, `git show` of the commit the row names, the page the row names — never from memory. A row whose source you cannot find or whose wording the source does not hold returns `questions`; do not fill it. For a *Rejected* that a row empties or drops, use the ways the row's source keeps, `none considered` where the human said so, or `unknown`, as the decisions' template gives; the plan proposes `unknown` for To do 25 and, for To do 41, a reason the decisions' own sources hold, else `unknown`.
- Item 40 (D-313 *Rationale*): the reason stands in `git show 2aae30a:docs/task-cycles/ekran-przejscia/cycle.md`; where it is not there, return `questions` naming what you searched.
- Settlement row 1 (D-252 / D-354 neighbour) and row 2 (D-111) are rows of *Settlements to record* of the frozen task; their meaning is the row's, their wording yours. Search the foundation (way_of_working step 2, WAY-33) for an entry that already states the settlement; if one does, tie the row to it and make no second entry.
- Where an entry you correct is named by other entries (`Relations`, `Based on`, *Verification*), follow what the element skill gives for what follows.
- Keep the entry text of the foundation in English; keep quotation of Polish sources in Polish where they are quoted.

**Report.** Write the full report to `docs/task-cycles/teksty-rozjechane-z-kodem/reports/foundation-1-report.md` with, for each entry, one sentence of its meaning in English and one in Polish, marked `row <n>`, `projected` or `the cycle's`; the foundation checks run (command, exit code); your own-work check as `make-change` gives; and the sections **Unread material** and **Searches not found or unclear** (each `none` if so). Return: status (`done`, `done with concerns`, `questions`, `blocked`), your commits, a one-line check result, the report path, your questions and concerns, and each reach beyond this handoff.
