# Handoff — the foundation step of the task `ekrany-i-menu`

You write the foundation entries this task carries, as the plan's *Foundation entries* list them.
The person who requested this cycle (Mariusz, the product's owner) has delegated every intermediate
choice to the orchestrator; you ask no human anything. A question goes back to the orchestrator in
your report with the status `questions` or `blocked`, as `task-cycle/skill/foundation_step.md` gives.

## Where you work

- Worktree (start every command from its root): `C:\Storage\repos\loop2-wt\ekrany-i-menu`
  (Git Bash `/c/Storage/repos/loop2-wt/ekrany-i-menu`). Branch `task/ekrany-i-menu`, base commit
  `20d804b04ba564b578551c687cde78baadf78878`, process pin `.the-way` at
  `f45ca40724251a46965aed69f733d0a35c430048`.
- Report path: `docs/task-cycles/ekrany-i-menu/reports/foundation.md`.

## Your stage

- Stage: **the foundation step** of the plan's *Foundation entries* (the agent that "writes the
  plan's *Foundation entries*"). You take none of the rows of the `make-change` table (not the whole
  change, a slice, a fix or a correction): your stage is the foundation step.
- Read whole: `.the-way/task-cycle/change/SKILL.md` (the way a change is made and reported: commits,
  report, own-work check; read the files it names when the step that names them comes), and
  `.the-way/task-cycle/skill/foundation_step.md`. When you write an entry of an element, read that
  element's project skill and what it names: `the-way-record-decision`, `the-way-record-glossary-term`,
  `the-way-record-invariant`, `the-way-record-environment-fact`, `the-way-update-part-map` (project
  skills with the `the-way-` prefix; never a personal skill of a like name).
- You write foundation entries only. No product code, no test, no guideline file (slices write the
  guideline files `guidelines/styleguide-browser-view.md` and `guidelines/coding-browser-module.md`).
- Do not run `npm test` or the product's gate; its run is the orchestrator's. Run what the element
  skills tell you to run for an entry (for example `python -B .the-way/elements/common/foundation_check.py`).

## The answers of step 4

- Trust boundary: no. Irreversible operation: no. Open design choice: none, no spec. Route: planned
  slices; you are the plan's *Foundation entries* writer, and slice 1 starts at your head.

## What you read

1. The whole frozen task: `docs/task-cycles/ekrany-i-menu/task.md` (copy of
   `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\ekrany_i_menu_loop2.md`, sha256
   prefix `ebb78ed12f587c20`). *Decisions in play* quotes each entry; for every projected entry
   ("Wpisy projektowane cytuje `definicja_mvp2_loop2.md` …, odcisk 9641f804") take its full approved
   text from the source, not from the quotation:
   `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp2_loop2.md`, section
   *Projected foundation changes*, and the project plan
   `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\plan_mvp2_loop2.md`, its projected-entries
   table (which task writes which entry).
2. The plan's *Foundation entries* (copied below word for word; the file is
   `docs/task-cycles/ekrany-i-menu/plan.md`, section *Foundation entries*) and, to see what depends
   on each entry, the plan's *Slices* (do not write what a slice writes).
3. The foundation, as the element skills and `.the-way/elements/common/way_of_working.md`
   ("Reading the foundation") give it; the decision log is `foundations/decisions.md`. The
   decisions of *Decisions in play* by identifier, whole. The titles of the 177 decisions whose
   *Scope* names `browser-view` are in `docs/task-cycles/ekrany-i-menu/reports/browser_view_decision_titles.txt`.
4. Guidelines the work touches: none are code, so none are required beyond what the element skills read.

## The orchestrator's rulings on the planner's open points

These bind you; they are the orchestrator's answers under the delegation, recorded as autonomous
choices, never as the human's approval.

- **E36, E37, E38 (D-62, D-132, D-173).** The project plan assigns the projected D-62 to task 16,
  and a plan member writes only the projected entries its plan item assigns. So you write for D-62
  *only* the minimal correction of the one clause the code of this task makes untrue — „Zakończ”
  returns to the screen Postać of that character, the screen D-53 gives, while sending stays at
  Siedziba — as a change of the current entry, and you leave the rest of the projected D-62 to task
  16. D-132 and D-173: correct only the *Verification* example that says „Zakończ” returns to the
  headquarters. Name in your report the exact words you changed and left. If you find that a
  correction needs a value neither the task nor the sources give, or that D-62 and D-53 collide
  with no precedence recorded, return `blocked` with the question instead of guessing.
- **E39 ("card").** Let the search of the whole foundation (way_of_working step 2) judge whether the
  word needs a glossary entry. Write one through `the-way-record-glossary-term` only where the
  skill's own criteria call for it and the meaning is one the task and the decisions already carry;
  otherwise write nothing and say why in the report. Do not settle a new meaning.
- A row you find already stated in the foundation becomes no second entry: tie it to that entry and
  say so in the report (foundation_step.md).
- Write each entry's meaning sentence in Polish, as one sentence per entry, for the request, in
  your report (a table: row, identifier, sentence).

## Commits

Commit on the task branch, in English, in the style of the repository's recent commits
(`git log --oneline` shows `docs: :memo: …`), one commit per entry or per few related entries as
the element skills allow; `git add <paths>` explicitly, never `git add -A`, `git add .` or
`git commit -a`; messages with several lines through `git commit -F <file>` (file outside the
repository, e.g. in the scratchpad or `.runs/`). After the first commit in this worktree check
`git log --format='%h %ae'` shows the private address `mariusznn@gmail.com`; report it if not. Leave
no uncommitted tracked change. Do not push.

## Your report

Write the full report to `docs/task-cycles/ekrany-i-menu/reports/foundation.md`: per row of the
plan's table the identifier written or changed (or the entry it was tied to), its commit, and the
Polish sentence of its meaning; every check you ran as command and exit code; your reaches beyond
this handoff (what you read that this handoff did not name, where, why); questions; and
**Searches not found or unclear** (each thing looked for and not found or unclear, or `none`). Return
only: status (`done`, `done with concerns`, `questions`, `blocked`), commits (the range from the
base to your head), a one-line check result naming what failed or did not run, and the report path.

---

## The plan's *Foundation entries*, word for word

