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

## Foundation entries

The foundation step writes these before any slice is made, each through the skill of its element.
Rows E1–E24 come from the task's *Decisions in play*, E25–E35 from its *Settlements to record*,
E36–E39 are consequences the planner found in the log and the definition; the foundation step's
search (way_of_working step 2) judges each of E36–E39 and words none of them here.

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| E1 (new) — What happens to a manual map run when the player leaves its screen? | decision | Decisions in play, "Zadanie zapisuje w całości" (projected entry of the definition) | Slice 8 |
| E2 D-96 — What does a player see before and after signing in? (changed: entry by form, reload with no fragment, reload at an address, after an emailed link; keeps the sentence of an error of the code in the load and its clause of rationale; *Rejected* carries the ways not chosen in question 1) | decision | Decisions in play, "Zadanie zapisuje w całości"; questions 1 and 13 | Slice 7 · Slice 8 |
| E3 D-97 — What does the player's logout do? („Wyloguj” in the menu „Konto”) | decision | Decisions in play, "Zadanie zapisuje w całości" | Slice 4 · Slice 7 |
| E4 D-157 — What does a signed-in player see of an unconfirmed address…? (the menu „Konto”) | decision | Decisions in play, "Zadanie zapisuje w całości" | Slice 1 · Slice 4 · Slice 7 |
| E5 D-199 — What does the screen Postać show of character skills? | decision | Decisions in play, "Zadanie zapisuje w całości" | Slice 5 · Slice 9 |
| E6 D-200 — Where does the player buy a branch rank, and when does it act? (on Postać; an ended map run counts until „Restart” or „Zakończ”) | decision | Decisions in play, "Zadanie zapisuje w całości" | Slice 5 · Slice 9 |
| E7 D-208 — What does the player see of saving the game state? (the line under the menu bar) | decision | Decisions in play, "Zadanie zapisuje w całości" | Slice 7 |
| E8 D-212 — How does a manual map run come back from a loaded saved game state? (the screen D-96 gives) | decision | Decisions in play, "Zadanie zapisuje w całości" | Slice 8 |
| E9 D-217 — What does the game show of a character's resurrection? (card and screen; „czasu realnego”) | decision | Decisions in play, "Zadanie zapisuje w całości"; To do item 12 | Slice 5 · Slice 8 · Slice 9 |
| E10 D-244 — What does the player see of an earning loop? (card and screen) | decision | Decisions in play, "Zadanie zapisuje w całości" | Slice 5 · Slice 9 |
| E11 headquarters — the screen Siedziba | glossary term | Decisions in play, "Zadanie zapisuje w całości" (projected glossary entry) | Slice 5 · Slice 8 · Slice 9 · Slice 10 |
| E12 (new) — Which screens does the game have, and how does the player move between them? (the part of this task: Siedziba, Postać, Programy, Przejście, one content width, the bar with Siedziba, Programy and „Konto”, „Wróć do przejścia”) | decision, part | Decisions in play, "Zadanie urzeczywistnia część" (task 22 writes the whole) | Slice 1 · Slice 4 · Slice 7 · Slice 8 · Slice 10 |
| E13 (new) — How does an address name a screen? (all but the addresses of Mapy and Wiedza) | decision, part | Decisions in play, "Zadanie urzeczywistnia część" (task 22 writes the whole) | Slice 3 · Slice 8 · Slice 10 |
| E14 (new) — What do the screens leave room for from the start? (the part of this task: areas of the columns, the team as a section with a heading) | decision, part | Decisions in play, "Zadanie urzeczywistnia część" (task 5 writes the whole) | Slice 8 · Slice 9 · Slice 10 |
| E15 D-44 — Which controls do the screens of the browser view build on? (the part of this task: „Wyślij ponownie” then reads „Wysyłanie…”, no longer „the header's”) | decision, part | Decisions in play, "Zadanie urzeczywistnia część" (task 5 writes the whole) | Slice 1 · Slice 4 · Slice 7 |
| E16 D-53 — Where does the player send a character from, and where does „Zakończ” lead? (the part of this task: „Zakończ” returns to Postać) | decision, part | Decisions in play, "Zadanie urzeczywistnia część"; question 6 (task 13 writes the whole) | Slice 8 |
| E17 D-166 — Where does the player see the player's programs and pick the one to edit? (all but the new editor; the rejected "a section of the headquarters or a screen of its own" leaves) | decision, part | Decisions in play, "Zadanie urzeczywistnia część"; questions 5 and 15 (task 5 writes the whole) | Slice 6 · Slice 10 |
| E18 D-245 — What does „Zatrzymaj” do? (the part of this task: card and screen in place of "row") | decision, part | Decisions in play, "Zadanie urzeczywistnia część" (task 25 writes the whole) | Slice 5 · Slice 9 |
| E19 D-246 — What does the player read after being away? (the part of this task: the report read on reaching Siedziba) | decision, part | Decisions in play, "Zadanie urzeczywistnia część" (task 25 writes the whole) | Slice 8 · Slice 9 |
| E20 D-03 — How is the browser view built? (realized in part by the bar, Postać and the list in React; the step compares it with the projected D-03 and is expected to change no word) | decision, part | Decisions in play, "Zadanie urzeczywistnia część"; question 4 | Slice 4 · Slice 5 · Slice 6 |
| E21 D-196 — Which branch actions does the program editor offer outside a map run? (*Verification* and *Rationale* name the editor of Programy; the binding sentence names the waiting map run and the ended one; *Rejected* carries the way not chosen in question 17) | decision, correction | Decisions in play, "Przykłady i zdania do poprawy"; questions 15 and 17 | Slice 10 |
| E22 D-207 — When does the game save the game state on the server? (*Verification*: „Kup” on Postać) | decision, correction | Decisions in play, "Przykłady i zdania do poprawy" | Slice 5 |
| E23 D-225 — What does the form „Ustaw nowe hasło” hold, and how does it end? („Anuluj” opens Siedziba for a signed-in player) | decision, correction | Decisions in play, "Przykłady i zdania do poprawy"; question 16 | Slice 8 |
| E24 D-275 — Which actions of the browser view stand as text rather than as buttons? (*Verification*: „Wyloguj” in the menu „Konto”) | decision, correction | Decisions in play, "Przykłady i zdania do poprawy" | Slice 1 · Slice 7 |
| E25 Settlement row 1 — the sentences beside the inactive „Wyślij”, „Puść w pętlę” and „Kup” | decision | Settlements to record, row 1 | Slice 5 · Slice 9 |
| E26 Settlement row 2 — „Wróć do przejścia · {mapa} · minuta {m}” | decision | Settlements to record, row 2 | Slice 3 · Slice 4 |
| E27 Settlement row 3 — the name on the card leads to Postać, where the bar marks Siedziba | decision | Settlements to record, row 3 | Slice 3 · Slice 4 · Slice 9 |
| E28 Settlement row 4 — the bar's items have no icons | decision | Settlements to record, row 4 | Slice 1 · Slice 4 |
| E29 Settlement row 6 — the game's name on the bar, alone on the waiting screens | decision | Settlements to record, row 6 | Slice 1 · Slice 4 · Slice 7 |
| E30 Settlement row 7 — how the menu „Konto” opens and closes, focus back on „Konto” | decision | Settlements to record, row 7 | Slice 1 · Slice 4 |
| E31 Settlement row 8 — the menu „Konto” stays open while waiting and after the answer | decision | Settlements to record, row 8 | Slice 1 · Slice 4 · Slice 7 |
| E32 Settlement row 9 — content at most 1344 px wide, the full width of a narrower window | decision | Settlements to record, row 9 | Slice 7 |
| E33 Settlement row 10 — the page's sentence above the game leaves at the first change of screen | decision | Settlements to record, row 10 | Slice 8 |
| E34 Settlement row 11 — in the editor of Programy a waiting or ended manual map run counts as going on (changes D-196, with E21) | decision | Settlements to record, row 11 | Slice 10 |
| E35 Settlement row 14 — a return to the map run does not resume it | decision | Settlements to record, row 14 | Slice 8 |
| E36 D-62 — What does the screen show, and what can the player do, after a character's death? (its clause „Zakończ”, which returns to the screen from which the player sends the character, stops being true once „Zakończ” leads to Postać while sending stays at Siedziba; the projected D-62 of the definition reads „returns to the screen D-53 gives”, and the plan assigns D-62 to task 16 — the part this task's code makes true is that clause, WAY-126) | decision, part | planner: consequence of E16; definition, Projected foundation changes, D-62 | Slice 8 |
| E37 D-132 — What does the screen show…after a completion? (*Verification* complies: „„Zakończ” returns to the headquarters”) | decision, correction | planner: consequence of E16 | Slice 8 |
| E38 D-173 — What can the player do with the copy after a map run ends? (*Verification* complies: „„Zakończ” with unsaved changes returning to the headquarters at once”; its dialog stays for task 12) | decision, correction | planner: consequence of E16 | Slice 8 |
| E39 a word used in two meanings — "card": the login card (D-96, D-262, D-278) and a character's card on Siedziba (projected D-217, D-244, D-245); also D-218, which names the headquarters alone while Postać shows the same label (To do item 4) | glossary term or decision, to be judged | planner: way_of_working step 2 ("a word used in two meanings"); To do item 4 | Slice 5 · Slice 9 |

No invariant, environment fact or part-map change is expected: every file the slices add lies under
`src/browser/view/**` or `tests/view/**`, which the part map gives to browser-view, and no slice touches
a trust boundary of the part map. Should the address decision (E13) rest on how the browser handles a
change of the fragment, the foundation step records that source through `the-way-record-environment-fact`.
