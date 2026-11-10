# Handoff — the foundation entries, group 2 (rows that need web pages), written after group 1 on the same branch

You are a fresh agent of the plan's *Foundation entries*. Work from the worktree `the task's worktree` (branch `task/teksty-rozjechane-z-kodem`). The person who requested the cycle (Mariusz) delegated intermediate choices to the orchestrator, which answers your questions; you never seek the human. The orchestrator's answers are not the human's approval.

**Methods.** Read `.the-way/task-cycle/skill/foundation_step.md` whole, and `.the-way/task-cycle/change/SKILL.md` whole (the method `make-change`; you take none of its variants, your stage is the foundation step). Write each entry through the project skill of its element (`the-way-record-decision`, `the-way-record-environment-fact`, `the-way-record-glossary-term`): read that skill's `SKILL.md` from `.the-way` and the element's template, examples and `elements/common/rules.md` as `elements/common/way_of_working.md` steps 1-4 give. "Ask" in those skills means: return `questions` to the orchestrator. Commit on the task branch, `git add` by path, English commit messages in the style of `git log`.

**Boundary.** You write only `foundations/decisions.md`, `foundations/environment_facts.md`, `foundations/glossary.md`, and a further foundation file only where the element skill requires it. No code, no guideline, no test. Run `python -B .the-way/elements/common/foundation_check.py` after each entry (exit 0, `0 errors`); do not run the product's gate. Another run writes the other group of the plan's rows later, on this same branch; do not write its rows.

**Frozen task.** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md` (read it whole). **Plan.** `docs/task-cycles/teksty-rozjechane-z-kodem/plan.md`, its section *Foundation entries* (copied below word for word for your rows). Base of this step: `adbec4b025b9b5760bdb41b5d803794cbb062acd`.

**Answers of step 4.** Trust boundary: yes (the code slices that follow touch `src/server/configuration.ts` and `package-lock.json`; your entries bear on them: D-111, D-252). Irreversible operation: no. Open design choice: none. No spec.

**Your rows** (copied from the plan's *Foundation entries*):

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| D-01, D-02, D-05 — *Based on* quotes at each page a passage word for word with its place and the date it was read, in the decision template's form (*web*) | decision | To do 21 | none |
| `docker-build-cache-invalidation` and D-237 — the fact quotes the passage "Build arguments do result in cache invalidation." and the *Rationale* says the release check returns with a new commit through the build argument `LOOP2_COMMIT`, not through a change of code (*web*) | environment fact and decision | To do 34 | none |
| a new environment fact that the browser resolves no bare import, and D-269 — *Based on* names it (*web*) | environment fact and decision | To do 38 | none |

**Rules that bind you beyond the method.**
- Take every quotation, number and place from its source — the task, the code, `git show` of the commit the row names, the page the row names — never from memory. A row whose source you cannot find or whose wording the source does not hold returns `questions`; do not fill it. For a *Rejected* that a row empties or drops, use the ways the row's source keeps, `none considered` where the human said so, or `unknown`, as the decisions' template gives; the plan proposes `unknown` for To do 25 and, for To do 41, a reason the decisions' own sources hold, else `unknown`.
- Item 40 (D-313 *Rationale*): the reason stands in `git show 2aae30a:docs/task-cycles/ekran-przejscia/cycle.md`; where it is not there, return `questions` naming what you searched.
- Settlement row 1 (D-252 / D-354 neighbour) and row 2 (D-111) are rows of *Settlements to record* of the frozen task; their meaning is the row's, their wording yours. Search the foundation (way_of_working step 2, WAY-33) for an entry that already states the settlement; if one does, tie the row to it and make no second entry.
- Where an entry you correct is named by other entries (`Relations`, `Based on`, *Verification*), follow what the element skill gives for what follows.
- Keep the entry text of the foundation in English; keep quotation of Polish sources in Polish where they are quoted.
- The rows of this group need the pages their sources name (opened with the web tools you have; if you have none, return `blocked`): quote each passage word for word with its place and the date you read it (today is 2026-11-10), in the form of the template of the element. Never paraphrase and never quote from memory.

**Report.** Write the full report to `docs/task-cycles/teksty-rozjechane-z-kodem/reports/foundation-2-report.md` with, for each entry, one sentence of its meaning in English and one in Polish, marked `row <n>`, `projected` or `the cycle's`; the foundation checks run (command, exit code); your own-work check as `make-change` gives; and the sections **Unread material** and **Searches not found or unclear** (each `none` if so). Return: status (`done`, `done with concerns`, `questions`, `blocked`), your commits, a one-line check result, the report path, your questions and concerns, and each reach beyond this handoff.
