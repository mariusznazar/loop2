# Handoff — the plan's *Foundation entries* of the task cycle `ekran-przejscia`

## Delegation and boundary

The human asked the orchestrator to take this task through the-way's task cycle to a reviewable
pull request and delegated the intermediate choices to it. Your stage is **the plan's *Foundation
entries*** (no variant row of `make-change` applies to it): you write the entries E1–E18 below and
nothing else — no code, no test, no guideline. You return before any slice starts. Questions go to
the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\ekran-przejscia`
- Branch `task/ekran-przejscia`; your base is `44317eb` (the commit that moved the-way's pin from
  f45ca40 to 61c72fb; the task's base is `d50158a`). Commit on the branch; never push, never reset
  below `44317eb`.
- Methods, each read whole from the worktree's `.the-way`:
  - `.the-way/task-cycle/change/SKILL.md` — for reading, checks, commits and the report;
  - `.the-way/task-cycle/skill/foundation_step.md` — what the step writes and what it reports;
  - the skill of each element when you write an entry of it: the project skills
    `the-way-record-decision` and `the-way-record-invariant` (entry points in
    `.claude/skills/the-way-record-decision/SKILL.md` and `.claude/skills/the-way-record-invariant/SKILL.md`,
    which point into `.the-way`). Read each element's skill whole, and select the foundation you
    read as its step 1 gives.
- Frozen task, read whole: `.runs/task-cycles/ekran-przejscia/task.md` (accepted 2026-11-03; a
  member of `plan_mvp2_loop2.md`, item 6). Its *Decisions in play* quotes the projected wordings
  (from `definicja_mvp2_loop2.md`, approved 2026-11-03, fingerprint 9641f804) and the parts this task
  makes true; its *Settlements to record* holds rows 1–5. Write a projected entry in the projected
  wording where the task says „Zadanie zapisuje w całości”, and only the part this task makes true
  elsewhere (WAY-126); *Relations* and *Verification* of a projected entry hold `TODO` in the
  definition, so you settle them as you write.
- Plan: `.runs/task-cycles/ekran-przejscia/plan.md`. Its section *Foundation entries*, copied word
  for word below, is your list.
- Report: `.runs/task-cycles/ekran-przejscia/reports/report-foundation.md`. If the harness refuses
  that write, return the whole report as text in your final message instead.

## Answers of step 4 (binding)

- Trust boundary: yes — `assets/sprites/**`; it does not concern your entries, which write no file
  there. Irreversible operation: no. Open design choice: none. Reserved choice: none.
- The orchestrator's answers that bear on entries: the saved game state keeps its shape and
  `SAVED_GAME_VERSION` stays 3 (the band names the copy's first rule group as it stands, read from
  the held discovery); „Dodaj regułę z tym” is disabled where the copy holds no rule group; the
  committed scene size is 672 × 304 until the human picks one of the two sizes the request shows
  (task question 1) — write no entry that fixes the scene's size.
- Sources changed since the task was accepted: the projected entries „How does an address name a
  screen?” and „What do the screens leave room for from the start?” now stand as D-281 and D-282.
  The code the task cites at `20d804b` has moved (tasks 4, 5, 11 merged): read the code again where
  an entry's *Verification* names it.

## What to read

Foundation entries by identifier, each whole, from the worktree as it stands: every identifier the
list below names (D-130, D-19, D-133, D-147, D-185, D-216, D-122, D-272, D-282, D-281, D-46, and the
invariant `terrain-drawing-numbers`), and those the task's *Decisions in play* names beside them
(D-123, D-124, D-131, D-271, D-273, D-03, D-62, D-132, D-188, D-186, D-201, D-215, D-280, D-288);
the rest as each element's skill selects. Guidelines: none is needed for entries.

## The plan's *Foundation entries*, word for word

## Foundation entries

The agent of these entries writes them before Slice 1, through the pinned record skills; the slices
read each by its identifier (or, for an entry not yet written, by its row here).

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| E1 — D-130 written whole in the projected wording: the five pace buttons beside „Pauza” in the header of the screen of a map run | decision | projected entry D-130 (*Decisions in play*, „Zadanie zapisuje w całości”) | Slices 5, 9 |
| E2 — D-19 written whole in the projected wording (the numbers of stock stand in the list and in the line under the drawing, which shows the hovered tile or else the character's tile, never on the drawing), its *Rationale* gaining the projected sentence on the list in the right area | decision | projected entry D-19 (*Decisions in play*, „Zadanie zapisuje w całości”) | Slices 6, 7, 9, 11 |
| E3 — the part of the projected entry „How is the screen of a map run laid out?” this task makes true: three areas under one header, world left, program middle, one content at a time right with the editing of a program rule before the table of revealed tiles, the end of the map run not in the right area; the world from the top the scene, the last-encounter paragraph, the lines of the end, the body row with the backpack, the drawing of the map and the line of a tile, with no „Teraz” and „Potem”; the header with the character, the map and the whole status row in place of the bar (task 14 writes the rest) | decision | projected entry (part, WAY-126), questions 3 and 4 | Slices 5, 6, 9 |
| E4 — row 1: until task 14 the whole status row stands in the header unchanged, after the character's name and the map, with „Restart”, the warning of a cut trip plan and „Zakończ” as today (the writer may write it into E3 or beside it) | decision | row 1 | Slices 5, 9 |
| E5 — D-133, the part this task makes true: the numbers of the solving condition stand in the header, in the status row (the bar is task 14's, the sentence on the map's card task 13's) | decision | projected entry D-133 (part) | Slice 5 |
| E6 — D-147, the sentence of place only: the paragraph stands in the world area under the scene and above the body row | decision | projected entry D-147 (part, question 7) | Slice 6 |
| E7 — D-185, the sentence of place only: the line stands in the world area under the scene and the last-encounter paragraph when present, above the body row | decision | projected entry D-185 (part, question 7) | Slice 6 |
| E8 — D-216, the sentence of place only: the line stands at the place of the line „Do skrzynki: …” | decision | projected entry D-216 (part, question 7) | Slice 6 |
| E9 — D-122, the part this task makes true: a band in the role `discovery` above the program names what was discovered and the program rule the game wrote, with „Dodaj regułę z tym” and „Wznów”, until the player goes on, or until „Restart” or „Zakończ” after a completion in the game minute of a discovery; it replaces the line under the status row (the scene's colours are task 7's, the chronicle task 15's, the end task 16's) | decision | projected entry D-122 (part) | Slices 2, 8, 9 |
| E10 — row 5: the band says of the rule the game wrote „Gra dopisała regułę w grupie „{nazwa grupy}”: Zawsze → Eksploruj.”, with no number of the rule, the group being the copy's | decision | row 5 | Slices 2, 8 |
| E11 — row 4: what „Dodaj regułę z tym” adds and where the rule panel opens | decision | row 4 | Slices 3, 4, 8, 9 |
| E12 — row 2: the scene's frame is a forest in snow, from the cut pictures of the old Loop | decision | row 2 | Slices 1, 6 |
| E13 — row 3: the scene's frame is in full light, and night is a layer over the frame | decision | row 3 | Slices 1, 6 |
| E14 — D-272, the part this task makes true: the words „as the scene”, and its *Verification* example „the waiting screens and the game with no picture”, which stops being true | decision | projected entry D-272 (part) | Slices 1, 6 |
| E15 — D-282, the part this task makes true: its *Verification* example of the screen of a map run names its three areas, where it now names the program panel and the column of the map run | decision | projected entry „What do the screens leave room for from the start?” (now D-282, part) | Slice 9 |
| E16 — D-281: „The screen of a map run takes its map run as a parameter and reads no map run of the game state by itself” stays true through the rebuild; the writer confirms it and changes nothing unless the code shows otherwise | decision | projected entry „How does an address name a screen?” (now D-281, part) | Slice 9 |
| E17 — D-46, its *Verification* example: the clock of the map run in the status row of the header of the screen of a map run set in Geist Mono | decision | question 9, *Decisions in play* „Przykład do poprawy w tym zadaniu” | Slice 5 |
| E18 — terrain-drawing-numbers: its sentence kept, or reworded only so far as the drawing no longer stands in a terrain panel beside the list but in the world area with the line of a tile under it; its check `tests/invariants/test_terrain_drawing_numbers.py` changes in Slice 7 for the cause D-19 gives | invariant | projected entry D-19, task *Context* on the test | Slices 7, 11 |

The change writes no entry of the part map (every new file lies under `src/browser/view/**`,
`assets/sprites/**` or `tests/view/**`, which the part `browser-view` claims, and `README.md`,
which `build-tools` claims), no glossary term and no environment fact. D-271 keeps its wording
(the frame is the scene's first picture), D-03 keeps its wording, and `loop2-container-sprites` is
task 20's to write.

## Return

Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or
`blocked`), your commits, a one-line check result naming what failed or did not run, and the
report's path. The report holds, for each entry, its identifier, one sentence of its meaning in
English and one in Polish (the task document's language), and its mark `row <n>`, `projected` or
`the cycle's`, as `foundation_step.md` gives; every check you ran with its command and exit code
(at least `python -B .the-way/elements/common/foundation_check.py`); your questions and concerns;
each reach beyond this handoff; and **Searches not found or unclear** — each thing looked for and
not found or unclear, or `none`.
