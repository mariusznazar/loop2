# Handoff — the agent of the plan's *Foundation entries*, task `edytor-programu`

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator of
`implement-task`. Your go-ahead is provisional, never the human's approval; the human accepts the
entries you write by merging the request. You never ask the human: a question that the foundation
step allows goes to the orchestrator as status `blocked` (see the file named below).

## Where you work

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\edytor-programu`, branch `task/edytor-programu`.
  Your base (the head before you start): `6fec0ea2de6033b4e46c43fc8593014b08eef542`. Slice 1 starts at your last commit.
- Pinned process: the worktree's `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
- Method: you are the agent of the plan's *Foundation entries*. Read in full
  `.the-way/task-cycle/skill/foundation_step.md` and then the project skill of each element when you write
  an entry of that element: `the-way-record-decision`, `the-way-record-invariant`,
  `the-way-record-glossary-term`, `the-way-record-environment-fact`, `the-way-update-part-map` (each skill is
  `.claude/skills/the-way-*/SKILL.md` in the worktree, which reads `.the-way`). Take no variant row of `make-change`:
  your stage is the foundation step. You write foundation entries only; no code, no test, no guideline file
  (the styleguide text is Slice 1's, and the invariant test files of slices stay theirs).
- Stage boundary: write every entry of the table below on the task branch and return before any slice is made.
  Never start Slice 1 or review.

## Paths

- Frozen task (read whole, in pages, 329 lines): `docs/task-cycles/edytor-programu/task.frozen.md`
  (source `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\edytor_programu_loop2.md`).
- The task's sources of the projected entries: the approved definition
  `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp2_loop2.md` (fingerprint 9641f804), section
  *Projected foundation changes* — take the projected wording of each entry from there, never from memory;
  and `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\plan_mvp2_loop2.md`, section *Projected entries*, item 5.
- Your full report: `docs/task-cycles/edytor-programu/reports/report-foundation.md`. If your tool refuses to
  write the file, return the whole report as text instead; the orchestrator saves it.

## Answers of the start

- Trust boundary touched by the change: yes — `assets/icons/**`. Irreversible operation: no.
- Open design choice: none. Reserved choice: none. Route: planned slices (14), your table is the plan's *Foundation entries*.
- Settled by the orchestrator for you (autonomous choices, recorded in the cycle record, not the human's):
  - Q1: row E37 — correct D-196's *Verification* as far as this change's code makes it untrue.
  - Q2: row E2 — change the standing D-282, write no second entry of that question.
  - Q3: the cells carry the data's full labels (relevant to E19/E18 wording).
- The base gate fails today on `tests/quality` (`test_ruff_source_rules`, `test_shellcheck_source_rules`): `ruff` and `shellcheck` are not installed on this computer. That is the base's state, not yours.

## Reading selected by the orchestrator

Guidelines: none needed beyond what the element skills read (your work writes foundation files only; `guidelines/**` is not yours).
Foundation: the elements' skills select the reading per entry; start from the identifiers the table names and
the entries those link to. The glossary of the-way at the pin is read as the glossary skill gives.

## Specifics

- Rows E16 (`game-icons-<file name>-title`, 11 environment facts) need the title each icon's page on game-icons.net gives.
  Read each page (use the `web-fetch` agent or `WebFetch` where you have it); the source of a fact is the page, never memory.
  The 11 icons: binoculars, hiking, direction-sign, grab, claw-hammer, match-tip, logging, meal, deadly-strike, boot-kick, dodge.
  Where a page cannot be reached, return `blocked` naming the missing fact; never write a title from memory.
  Row E17: judge from the same pages whether the authors of the 11 icons are only Delapouite and Lorc (the contributors the standing fact names); change `game-icons-licence` only where an icon has another author.
- Row E9 (`icon-credits`): its *Rests on* gains the title facts; the check `tests/invariants/test_icon_credits.py` is edited by Slices 3–4, not by you.
- Rows E37–E39 are consequences the planner found; the search of the whole foundation (way_of_working, step 2) decides each: write only what the search shows to be needed, and report what you judged and did not write.
- The plan names entries, it never words them; the wording is yours, from the sources and the task's rows (WAY-134).
- Commit by paths with `git add <paths>` (never `-A`, `.` or `-a`); messages in English in the repository's form (`git log --oneline -8` shows it, e.g. `docs: :memo: …`). Check `git log --format='%h %ae' -3` after your first commit. No push.
- Keep for the request: for each entry you write or change, one sentence of its meaning in the task document's language (Polish), plus the identifier — put them in the report. For each row of *Settlements to record* tied to an entry already stated rather than written anew, name both.
- The return step later compares the foundation with the code; you do not.

## Report

Write the full report with: status, your commits, each entry (identifier, kind, row of the table, meaning sentence in Polish), what each row became, entries tied to existing ones, each search of the foundation and what it found, the checks you ran with command and exit code (at least `python -B .the-way/elements/common/foundation_check.py` — it checks the foundation; note it may report every tracked file claimed by no part or other failures that predate you: say which are yours), each reach beyond this handoff, **Searches not found or unclear:** each thing looked for and not found or unclear, or `none`, and questions with a recommendation. Return only: status, commits, a one-line check result naming what failed or did not run, and the report path.

---

## The plan's *Foundation entries*, copied word for word from `plan.md`

## Foundation entries

The foundation step writes these before any slice is made, each through the skill of its element.
Rows E1–E6 come from the task's *Decisions in play*, "Wpisy projektowane, które zadanie urzeczywistnia
i pisze"; E7–E14 from "Wpisy projektowane, które zadanie urzeczywistnia w części, a pisze inne
zadanie", each only as far as this change's code makes it true (WAY-126); E15 and the changed parts
of E3, E6, E10–E12 from "Obecne wpisy, które zadanie zmienia"; E16–E17 from *To do* item 15; E18–E36
are the rows 1–19 of *Settlements to record*; E37–E39 are consequences the planner found, which the
foundation step's search judges and this plan words not.

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| E1 (new) — How does the player write a program rule? | decision | Decisions in play, "Wpisy projektowane, które zadanie urzeczywistnia i pisze"; plan item 5, projected entries | Slice 1 · Slice 5 · Slice 6 · Slice 9 · Slice 10 · Slice 12 · Slice 13 |
| E2 D-282 — What do the screens leave room for from the start? (the projected "(new)" entry of that title, standing since task 4 as D-282 without its part about the rule panel; changed to the projected wording: the rule panel offers its pick in steps; the areas of Programy) | decision | Decisions in play, "Wpisy projektowane, które zadanie urzeczywistnia i pisze"; plan item 5 | Slice 10 · Slice 12 · Slice 13 |
| E3 D-44 — Which controls do the screens of the browser view build on? (whole, in the projected wording: eight shared controls with the pick cell; the destructive buttons neutral until the pointer or the focus reaches them; the part task 4 made true included, question 15) | decision | Decisions in play, both "Wpisy projektowane…" and "Obecne wpisy, które zadanie zmienia"; plan item 5 | Slice 1 · Slice 6 · Slice 7 · Slice 8 |
| E4 D-93 — What does a program rule show the player? (projected, with the heading „sprawdzane od góry” on both screens and the sum „Wykonano {n}×” in the header of a rule group) | decision | Decisions in play, "Wpisy projektowane…"; plan item 5 | Slice 5 · Slice 9 · Slice 12 |
| E5 D-166 — Where does the player see the player's programs and pick the one to edit? (projected) | decision | Decisions in play, "Wpisy projektowane…"; plan item 5 | Slice 12 · Slice 13 |
| E6 D-255 — Where does the data an agent checks the game on come from? (projected: the agent builds the game state with functions of the simulation and sends it by the ordinary save request) | decision | Decisions in play, "Wpisy projektowane…" and "Obecne wpisy…"; plan item 5 | Slice 2 |
| E7 D-03 — How is the browser view built? (realized in part by the editor, the rule panel and the program panel in React; the step compares it with the projected D-03 and is expected to change no word) | decision, part | Decisions in play, "…urzeczywistnia w części"; plan item 5 | Slice 9 · Slice 10 · Slice 11 · Slice 12 |
| E8 D-27 — Where do the game's icons come from? (the part of this task: the 11 icons of actions from game-icons.net in `assets/icons/`; the folded credits on Siedziba stay for task 24) | decision, part | Decisions in play, "…urzeczywistnia w części"; plan item 5 | Slice 3 · Slice 4 |
| E9 icon-credits (the part of this task: the 11 new files credited; its *Rests on* gains the title facts of E16, and of E17 where it changes; check `tests/invariants/test_icon_credits.py`, written out per file in its tables `TITLES` and `AUTHORS`) | invariant, part | Decisions in play, "…urzeczywistnia w części"; plan item 5 | Slice 3 · Slice 4 |
| E10 D-43 — What counts in the browser view as a value written in place of a design token? (the part of this task: an icon file of an action drawn as a mask, taking its colour from the text beside it; the other icons keep the colour in their files until task 24, both ways side by side) | decision, part | Decisions in play, "…urzeczywistnia w części" and "Obecne wpisy…"; plan item 5 | Slice 1 · Slice 6 · Slice 9 |
| E11 D-39 — What do the signal colours of the browser view mean? (*Verification*: the text of „Zakończ” in `danger` under the pointer) | decision, part | Decisions in play, "…urzeczywistnia w części" and "Obecne wpisy…"; plan item 5 | Slice 1 · Slice 8 |
| E12 D-245 — What does „Zatrzymaj” do? (the part of this task: a destructive button that acts at once on the click, no longer with its text in `danger` at rest) | decision, part | Decisions in play, "…urzeczywistnia w części" and "Obecne wpisy…"; plan item 5 | Slice 8 |
| E13 D-124 — What does „+ reguła” do? (the part of this task: the label „+ reguła”, the rule added at the end of its rule group and its rule panel opened on the condition; „never disabled” stays for task 10, the present disabled clause standing, question 12) | decision, part | Decisions in play, "…urzeczywistnia w części"; plan item 5 | Slice 9 · Slice 10 |
| E14 D-180 — Where does the player arrange the trip plan? (the part of this task: Programy shows „Plan wyprawy” folded to a line of icons between the program's name and its rules, with „Zabierz” and „Wynieś”, its positions as D-180 gives; the card of a map stays for task 13) | decision, part | Decisions in play, "…urzeczywistnia w części"; plan item 5; question 11 | Slice 11 · Slice 12 |
| E15 D-91 — What program does a new game start with? (*Verification* no longer names „Dodaj regułę”) | decision, correction | Decisions in play, "Obecne wpisy, które zadanie zmienia"; To do item 17 | Slice 9 |
| E16 environment facts `game-icons-<file name>-title`, one per new icon file: binoculars, hiking, direction-sign, grab, claw-hammer, match-tip (Slice 3); logging, meal, deadly-strike, boot-kick, dodge (Slice 4) — each the title its page on game-icons.net gives, written through `the-way-record-environment-fact` (To do item 15) | environment fact | To do item 15; icon-credits *Rests on* | Slice 3 · Slice 4 |
| E17 game-icons-licence (judged: whether the authors of the 11 icons stand among the contributors it names, Delapouite and Lorc; changed through `the-way-record-environment-fact` only where an icon has another author) | environment fact, to be judged | To do item 15; Decisions in play, "Obecne wpisy, które zadanie stosuje bez zmiany" | Slice 3 · Slice 4 |
| E18 Settlement row 1 — what stands greyed in the rule panel and with which reason; a held value outside the pick shown chosen and greyed | decision | Settlements to record, row 1 (questions 1 and 16) | Slice 5 · Slice 10 |
| E19 Settlement row 2 — the groups of actions and the sections of conditions in the pick | decision | Settlements to record, row 2 | Slice 5 · Slice 10 |
| E20 Settlement row 3 — one icon per action: in the row, in the cell and over the mage's head | decision | Settlements to record, row 3 | Slice 3 · Slice 4 · Slice 9 · Slice 10 |
| E21 Settlement row 4 — the numbers „2.1” and „2” | decision | Settlements to record, row 4 | Slice 5 · Slice 9 |
| E22 Settlement row 5 — the time of one execution, in the row and in the panel | decision | Settlements to record, row 5 | Slice 5 · Slice 9 · Slice 10 |
| E23 Settlement row 6 — the folding of rule groups in the page's memory, outside the save | decision | Settlements to record, row 6 | Slice 9 · Slice 12 |
| E24 Settlement row 7 — a folded group shows name, condition and number of rules; a rule dropped on it lands at its end, the group staying folded | decision | Settlements to record, row 7 | Slice 5 · Slice 9 |
| E25 Settlement row 8 — a click on a group's header opens the same panel; „✕” of the group in the header | decision | Settlements to record, row 8 | Slice 9 · Slice 10 |
| E26 Settlement row 9 — „↓” on the last rule of a group to the start of the next, „↑” on the first to the end of the previous | decision | Settlements to record, row 9 | Slice 5 · Slice 9 |
| E27 Settlement row 10 — „zwiń wszystkie” / „rozwiń wszystkie” a plain button, beside more than one group | decision | Settlements to record, row 10 | Slice 9 |
| E28 Settlement row 11 — no search and no row „ostatnio” in the pick | decision | Settlements to record, row 11 | Slice 10 |
| E29 Settlement row 12 — no current value beside a condition | decision | Settlements to record, row 12 | Slice 10 |
| E30 Settlement row 13 — „Pusta grupa — przepuszcza dalej.” | decision | Settlements to record, row 13 | Slice 9 |
| E31 Settlement row 14 — „Zmiana zeruje passę tego przejścia.” in the panel of the copy | decision | Settlements to record, row 14 | Slice 10 · Slice 12 |
| E32 Settlement row 15 — a rule and a group deleted at once, with no question | decision | Settlements to record, row 15 | Slice 9 |
| E33 Settlement row 16 — „+ dodaj grupę” beside „+ reguła” | decision | Settlements to record, row 16 | Slice 9 |
| E34 Settlement row 17 — no ⊘, no „N reguł nie zadziała”, no amber „0×” | decision | Settlements to record, row 17 | Slice 9 |
| E35 Settlement row 18 — the flow of the panel: opened on the condition, fields in order, each pick a change, open after the last field, closed by „✕”, Esc or another rule | decision | Settlements to record, row 18 (questions 7 and 17) | Slice 10 |
| E36 Settlement row 19 — „Plan wyprawy: pusty” | decision | Settlements to record, row 19 | Slice 11 · Slice 12 |
| E37 D-196 — Which branch actions does the program editor offer outside a map run? (its *Verification* "„Obchód” … absent outside a run" stops being true once a branch action stands greyed with „wybierzesz w przejściu postaci, która ją kupiła” outside a map run, E18; judged, worded by the step) | decision, correction, to be judged | planner: consequence of E18 and question 1, row c; `foundations/decisions.md:3473-3486` | Slice 5 · Slice 10 |
| E38 D-131, D-179 (*Rationale*), D-186 and trip-plan-progress (they speak of a change of the copy's trip plan during a map run as possible, while the trip plan leaves the screen of a map run, E14; the task's Context says they stay true because the simulation's functions stay — the step's search judges, words nothing unless one becomes false) | search, to be judged | Context, line 209 of the task | Slice 11 · Slice 12 · Slice 13 |
| E39 glossary candidates "rule panel" (panel reguły), "pick cell" (komórka wyboru) and "drop line" (linia upuszczenia) — judged by the step 2 search of "Reading the foundation" for a word whose meaning in the product differs from a reader's | glossary term, to be judged | planner: way_of_working step 2; To do items 3, 7, 12 | Slice 1 · Slice 6 · Slice 9 · Slice 10 |

No part-map change is expected: every file the slices add lies under `src/browser/view/**`,
`tests/view/**` or `assets/icons/**` (browser-view), or under `.claude/**` and `.agents/**`
(agent-workflow). The new SVG files stand at the trust boundary `assets/icons/**` without changing
its rule — another SVG file of the same kind, the same way in, the same receiver — so
icon-file-content keeps its test and gets no new one (`guidelines/testing.md`, *Trust boundaries*).
