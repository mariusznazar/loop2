# Handoff 06 — the foundation step (stage: make-change, the agent of the plan's *Foundation entries*)

You write the foundation entries the plan lists, before any code. You write no code and no test of
the product, and you run no test of the product; you do run the foundation check named below. You
take none of the variants of the table in `make-change`'s `SKILL.md`: your stage is the foundation
step, and your method for it is `.the-way/task-cycle/skill/foundation_step.md`, which you read whole,
together with `.the-way/task-cycle/change/SKILL.md` for how a change is committed and reported. The
skill of an element (`the-way-record-decision`, `the-way-record-glossary-term`) you read whole when
you write an entry of that element, from this worktree's `.claude/skills/`. Use no personal skill of
the same name without the `the-way-` prefix.

## Delegation

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator
(Sonnet 5.5), who delegates to you the writing of these entries on your own recommendation. The
human accepts the entries at the merge of the request or at the readiness gate; you never label
your own answer as the human's approval. A question for the human arises only in the cases
`foundation_step.md` lists: return it with status `blocked`; the orchestrator opens the blocked
draft request. Questions of any other kind go to the orchestrator in your report.

## Where you work

- Worktree (work from its root): `the worktree root`, branch
  `task/kronika-z-filtrami`, base and your range's start `6f36c7ab998ceaf996afb617ca95881b3f007b2d`
  (also slice 1's base, so whichever review judges slice 1 covers your entries). Commit your
  entries on this branch, one commit per entry or per closely tied group, with messages in English
  in the repository's form (`docs: :memo: <what>`, as `git log` shows). Add files by path
  (`git add <path>…`), never `git add -A`, `.` or `commit -a`; the author's address of this
  repository is its noreply address, already configured.
- Frozen task, read whole: `docs/task-cycles/kronika-z-filtrami/task.md` (Polish; sha256 prefix
  cd12745e0f8566f7).
- Reviewed spec, read whole: `docs/task-cycles/kronika-z-filtrami/spec.md` (its *Foundation entries*
  section and the "to check" bullets bind what you write about the paragraph of the last encounter
  and the tabs).
- Plan, read whole: `docs/task-cycles/kronika-z-filtrami/plan.md`; the section you execute is
  copied below word for word.
- Your report: `docs/task-cycles/kronika-z-filtrami/reports/06-foundation-report.md`.

## Answers of step 4

- Trust boundary: no. Irreversible operation: no. Route: planned slices; yours is the plan's
  *Foundation entries*, with no code.
- Slice 1's base is the base above; the executors that follow read the entries as you leave them,
  so name in your report each entry you wrote or changed by its identifier and its range in
  `foundations/decisions.md` (or the glossary) as it stands at your last commit.

## What to read

Per the cycle's selection (the parts you touch are `product-foundation` and the entries about
`browser-view` and `simulation`; "Reading the foundation" in
`.the-way/elements/common/way_of_working.md` is read by the element skills you use). Foundation
entries of `foundations/decisions.md`, each whole, besides those you change: D-04, D-39, D-40,
D-46, D-122, D-123, D-130, D-131, D-132, D-133, D-147, D-148, D-171, D-173, D-174, D-185, D-206,
D-207, D-212, D-216, D-255, D-265, D-267, D-272, D-276, D-283, D-291, D-292, D-308, D-309, D-311,
D-312, D-316, D-323, D-324, D-331, D-334, D-335, D-336, D-337. Invariants (`foundations/invariants.md`):
`simulation-isolation`, `simulation-inputs`, `save-version`, `streak-program-change`,
`rule-state-from-pick`, `content-identifiers`, `saved-program-edit`, `copy-save`. The glossary
(`foundations/glossary.md`) whole; the part map (`foundations/part_map.md`) whole. Guideline files
bearing on the foundation: none to change here (Slices 6 and 7 do the guidelines).

Where you need more, search for it and read the entry found whole; name each reach in your report.

## Notes of the orchestrator

- Task 8's part of the entry „How does an agent learn what went wrong in the running game?"
  (F13) is already in the product: the browser's last-resort handler stands in D-323 and
  `guidelines/coding.md` ("Recording a failure"). The planner's search did not find an entry with
  that heading. Search the whole foundation (WAY-33) before you write F13 as a new entry; a
  settlement already stated becomes no second entry, and your report ties it, as `foundation_step.md`
  gives. Where the projected entry is only partly made true by this task (the chronicle an agent
  reads as a player does), write the part this task's code makes true (WAY-126), in the words the
  task quotes.
- F2–F11: the plan lets the writer decide whether rows 2–10 stand in the new decision of F2 or in
  entries of their own. Decide by the decisions' template (one decision, one question the human
  would ask), say which in the report, and keep the sentence of the approved projected entry whole.
- Entries' *Relations*, *Verification* and *Origin* of the projected entries hold `TODO` in the
  sources; fill them from the work as the element skill gives.
- The words of the entries are yours; the meaning is the task's. A meaning the task did not settle
  is not written (WAY-172).
- After your last commit run `python -B .the-way/elements/common/foundation_check.py` from the
  worktree root, and record its command and exit code in your report. An error your entries did not
  cause goes to the orchestrator.

## The section of the plan you execute (word for word from `plan.md`)

## Foundation entries

Written first, by the cycle's foundation step, in the order of the rows, each through the project
skill its *Kind* names; the agent reads `.the-way/task-cycle/skill/foundation_step.md` whole. The plan
names entries; it never words them.

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| F1 — `chronicle` (new): the record a manual map run keeps for the player to read, each entry with its game minute; not the events a function of the simulation returns | glossary term — `the-way-record-glossary-term` | projected entry, whole (task, *Decisions in play*, „Zadanie zapisuje w całości”); spec, *Foundation entries* | Slices 3, 4, 5 |
| F2 — (new) „What does the chronicle of a map run hold?”: the approved sentence, *Rationale* and *Rejected* in full; whether rows 2, 3, 4, 7, 8, 9 and 10 stand in it or in entries of their own (F4–F10) the writer decides | decision — `the-way-record-decision` | projected entry, whole; spec, *Foundation entries* | Slices 1, 2, 3, 4, 5 |
| F3 — the chronicle lives in the memory of the page, not in the save; after a load only the paragraph of the last encounter stands | decision — `the-way-record-decision` | row 1 | Slices 3, 4, 5 |
| F4 — the start of each action gives an entry in the words of „Teraz”, a wait one entry at its start | decision — `the-way-record-decision` (in F2 or its own) | row 2 | Slice 3 |
| F5 — the entry of a loss of the streak: only above zero to zero, its words, causes and role `danger` | decision — `the-way-record-decision` (in F2 or its own) | row 3 | Slices 1, 3 |
| F6 — every change of the copy gives an entry in `player-change`, also after the end until „Restart” or „Zakończ”; an edit of a saved program gives none | decision — `the-way-record-decision` (in F2 or its own) | row 4 | Slices 1, 3, 4 |
| F7 — the filter row: seven buttons in the look of the pace buttons, one picked, „Wszystko” at the start; „Nic tu jeszcze nie ma.” | decision — `the-way-record-decision` (in F2 or its own) | row 7 | Slices 5, 6 |
| F8 — newest entry on top, the minute alone in a column in `text-label`, background `panel`, colour by kind | decision — `the-way-record-decision` (in F2 or its own) | row 8 | Slices 3, 5, 6 |
| F9 — the sixth kind „Świat”: „Ognisko wygasło”, death and completion in the words of „Teraz”, completion in `positive` | decision — `the-way-record-decision` (in F2 or its own) | row 9 | Slices 2, 3, 5, 6 |
| F10 — the discoveries of one minute give one entry with the whole text of the band, without its buttons | decision — `the-way-record-decision` (in F2 or its own) | row 10 | Slice 3 |
| F11 — the pick of „Kronika” or „Teren” holds through the map run, leaving the screen and „Restart” included | decision — `the-way-record-decision` | row 14 | Slices 3, 4, 5 |
| F12 — D-04 (change): „for the scene and the chronicle, its previous reading of the game state and the events the simulation returned” | decision — `the-way-record-decision` | projected entry, the part this task makes true; spec, *Foundation entries* | Slices 3, 4 |
| F13 — (new) „How does an agent learn what went wrong in the running game?”, in full as the task quotes it | decision — `the-way-record-decision` | projected entry, whole; spec, *Foundation entries* | Slice 5 |
| F14 — D-122 (change): „what it named enters the chronicle”; and its *Rationale* „a player who goes on at once loses the list of discoveries, since the game keeps no record of them”, made untrue by this change (spec, to check) | decision — `the-way-record-decision` | projected entry, this task's part; spec, *Foundation entries* | Slices 3, 5 |
| F15 — D-147 (change): the transitional wording the task gives — the paragraph as an entry of the chronicle in the game minute of the attack, standing through a load too | decision — `the-way-record-decision` | projected entry, this task's part (transitional wording); spec, *Foundation entries* | Slices 3, 5 |
| F16 — D-311 (change): the transitional wording the task gives — the right area's chronicle or table under the tabs „Kronika” and „Teren”, the world without the paragraph; with its *Verification* examples and its *Rationale* and *Rejected* sentences that name the paragraph in the world area (spec, to check) | decision — `the-way-record-decision` | projected entry, this task's part (transitional wording); spec, *Foundation entries* | Slices 5, 6 |
| F17 — D-185 (to check): „under the scene and the last-encounter paragraph when present” — the writer decides whether the clause stays or loses the paragraph | decision — `the-way-record-decision`, only where the writer changes it | spec, *Foundation entries*, to check | Slice 5 |
| F18 — D-272 (to check): the *Verification* example „the paragraph of the last encounter on the solid background under it” | decision — `the-way-record-decision`, only where the writer changes it | spec, *Foundation entries*, to check | Slice 5 |
| F19 — D-276 (to check): „The switch of the login card stands as tabs” while the right area's tabs are a second place — the writer decides whether D-276 names it; otherwise Slice 6 records it in the styleguide | decision — `the-way-record-decision`, only where the writer changes it | spec, *Foundation entries*, to check | Slices 5, 6 |

No invariant, environment fact or part-map entry is written: every new file of this plan falls
under `src/browser/view/**`, `src/browser/sim/**`, `tests/view/**` or `tests/sim/**`, which
`browser-view` and `simulation` already claim. A candidate for the return step, which no row
carries: whether the two new events of the simulation (Slices 1 and 2) bind later work enough for
an entry, since task 16's „ostatnie minuty” may read them (spec, *Foundation entries*, last bullet).

## What the report holds

As `make-change` and `foundation_step.md` give: status, the commits (hashes), for each entry one
sentence of its meaning in English and one in the task document's language and its mark (`row <n>`,
`projected` or `the cycle's`), the foundation check with its command and exit code, the
own-work check, every reach beyond this handoff, and **Searches not found or unclear** (each thing
looked for and not found or unclear, or `none`). Return your status, your commits and the report
path in one short message.
