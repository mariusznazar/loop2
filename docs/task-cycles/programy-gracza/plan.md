# Plan — Programy gracza: wybór programu przy wejściu na mapę i kopia programu w przejściu

- Task: `.runs/task-cycles/programy-gracza/task.md`
- Spec: `.runs/task-cycles/programy-gracza/spec.md`
- Base: `4bfb9623e9310220e335377df7fbb4c9ad413406`

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| F1 — row 1: the program list in the program panel, „Kopia w przejściu” first during a map run | decision | task, *Settlements to record* row 1 | Slice 6 |
| F2 — row 2: „Nowy program”, „Zmień nazwę”, „Usuń”; the new program's empty group; the last program stays; no duplicate today | decision | task row 2 | Slice 4 · Slice 6 |
| F3 — row 3: deleting the program of a running copy leaves the map run on the copy, with only „Zapisz jako nowy program” | decision | task row 3 | Slice 4 · Slice 5 · Slice 7 |
| F4 — row 4: the names of programs | decision | task row 4 | Slice 4 · Slice 6 |
| F5 — row 5: the select list „Program:” of a headquarters row and its default | decision | task row 5 | Slice 1 · Slice 4 · Slice 8 |
| F6 — row 6: the copy's heading, the line of unsaved changes, the three buttons, the copy belonging to the new program after „Zapisz jako nowy program” | decision | task row 6 | Slice 5 · Slice 7 |
| F7 — row 7: „Porzuć zmiany” is a destructive button (changes D-44's list) | decision | task row 7 | Slice 7 |
| F8 — row 8: a save over a changed program announced by a line in `warning` and done at once | decision | task row 8 | Slice 5 · Slice 7 |
| F9 — row 9: an edit of a saved program during a map run leaves that map run's copy, streak and counts; method test, its check `tests/invariants/test_saved_program_edit.py` under the proposed identifier `saved-program-edit` | invariant | task row 9 | Slice 4 |
| F10 — row 10: the screens after a death and a completion; „Zakończ” drops the unsaved changes; the counts after it (refines D-93) | decision | task row 10 | Slice 1 · Slice 6 · Slice 7 |
| F11 — row 11: the rule written at a discovery goes into the copy and its program, and neither counts it as a change (changes D-123) | decision | task row 11 | Slice 1 · Slice 5 |
| F12 — row 12: a switch starts the counts from zero and zeroes the beaten attacks with the streak (changes D-93) | decision | task row 12 | Slice 5 |
| F13 — row 13: the copy of a program | glossary term | task row 13 | every slice, for the word „copy” |
| F14 — row 14: picking a saved program during a map run opens it; the button „Przełącz postać na ten program” and when it stands | decision | task row 14 | Slice 7 |
| F15 — row 15: the two saves leave the copy's content and the streak; a save as a new program is no switch; method test, its check `tests/invariants/test_copy_save.py` under the proposed identifier `copy-save` | invariant | task row 15 | Slice 5 |
| F16 — row 16: „Przełącz postać na ten program” is a destructive button (changes D-44's list and rationale) | decision | task row 16 | Slice 7 |
| F17 — new: „How does the game state tell one program from another?” | decision | spec, *Foundation entries*, “Further entries”, first item; spec decision 1 | Slice 1 · Slice 4 · Slice 5 · Slice 8 |
| F18 — „(new) — Who owns a program?”, the part this task makes true, every part but those on the earning loop | decision | task, *Decisions in play*, projected entry „(new) — Who owns a program?”; spec, “Further entries”, second item | Slice 1 · Slice 4 · Slice 5 |
| F19 — D-136: “and every switch of the character to another program” sets the streak to zero | decision, change | task, *Decisions in play*, „(new) — How is a map solved, and what opens the next one?”; spec, “Further entries” | Slice 5 |
| F20 — `streak-program-change`: covers the copy, and every switch sets the streak to zero, also to a program of the same rules; method test | invariant, change | task, *Decisions in play*, `streak-program-change/1`; spec, “Further entries” | Slice 1 · Slice 5 |
| F21 — D-131: the edits of the copy the map run carries out, the discard among them; an edit of a saved program leaves the streak | decision, change | spec, “Further entries”; task To do 7 | Slice 1 · Slice 4 · Slice 5 |
| F22 — D-44: „Porzuć zmiany” and „Przełącz postać na ten program” join the destructive buttons, and the rationale widens (rows 7 and 16) | decision, change | spec, “Further entries” | Slice 7 |
| F23 — D-93: rows 10 and 12 and spec decision 6 | decision, change | spec, “Further entries” | Slice 1 · Slice 5 · Slice 6 · Slice 7 |
| F24 — D-123: row 11 | decision, change | spec, “Further entries” | Slice 1 |
| F25 — part map: the part `simulation` gains by name the check files of F9 and F15 | part map, change | spec, “Further entries”, last item | Slice 4 · Slice 5 |

The foundation step writes F1–F24 before Slice 1, through the project skills `the-way-record-decision`,
`the-way-record-invariant` and `the-way-record-glossary-term`. F7, F10, F11, F12 and F16 may be
written as the changes of D-44, D-93 and D-123 that F22, F23 and F24 name, as the foundation step
words them. F25 is not written in the foundation step: `foundation_check.py` refuses a pattern of a
part's *Files* that matches no file git tracks (`.the-way/elements/common/foundation_check.py:47`),
so each line is written through `the-way-update-part-map` in the slice that creates its check file,
in the same commit, as the earlier cycle did for `tests/invariants/test_streak_program_change.py`.
Where the foundation step records F9 or F15 under another identifier, the check file of Slice 4 or
Slice 5 takes that identifier's name, `tests/invariants/test_<identifier with underscores>.py`.

## Slices

### Slice 1 — the copy of a manual map run and the player's programs in the game state

- **Goal:** The game state holds the player's programs in place of the one program, and a manual
  map run carries out a copy of one of them.
  - The game state holds the list of the player's programs in the order they were created, each
    with its number, its name and its content of today's shape, and the next number to give. A new
    game holds program 1, „Program”, with the empty rule group „Program” under „Zawsze”, and the
    next number 2 (To do 1; F17).
  - The game state holds the three records of spec decision 4 — per character number the program
    picked on its headquarters row, per character number the program it used last, and the
    game-wide program with which a character last entered a map — and the program the firing
    counts stand beside after „Zakończ”. Every record names a program by its number.
  - The game state's map run holds the record of its copy: the copied content the simulation
    carries out, the number of its program — or none, with the name the program had when it was
    deleted — and its base, the content of its program as the copy was taken from it or last saved
    into it (spec decision 3). The record is a field of the game state's map run, of a type that
    extends the map run of `src/browser/sim/run.ts`, so `newMapRun` and the functions of a minute
    keep their signatures (*Choices*).
  - A new simulation module, `src/browser/sim/programs.ts`, owns the list and the records: finding
    a program by number, and the program of a headquarters row in spec decision 4's order — the
    pick, the character's program used last, the game-wide program entered with last, the first
    program of the list, each only while it is on the list.
  - `send` takes a program number beside the map and the character; where it is absent, it sends
    with the row's program of that character (*Choices*). It refuses a number not on the list. The
    copy and its base are that program's content; the character's program used last and the
    game-wide program entered with last become it, and the character's pick is cleared; every
    count of the copy's rules starts at zero.
  - The simulation carries out the copy reduced to the character's repertoire, as `programOf`
    reduces the one program today.
  - `setProgram` within a map run is the edit of the copy, unchanged in effect: checked against
    the run's map, counts reconciled, and the streak and the beaten attacks of a map run not ended
    set to zero where the copy after the edit differs from the copy before it, also in a pause; the
    copy's program stays as it was (To do 7). Outside a map run `setProgram` edits, checked as a
    program outside a map run is checked today, the program decision 4 gives a character with no
    pick and no program used last: the game-wide program entered with last, or else the first of
    the list (*Choices*).
  - „Restart” builds the new map run with the copy record of the map run it replaces, as it is,
    unsaved changes included, and starts every count from zero (To do 6).
  - „Zakończ” drops the map run and its copy. The counts are reconciled against the copy's program:
    a rule of that program keeps the count of the copy's rule of the same identity where the two
    have the same condition and action, and stands at „0×” otherwise; that program becomes the one
    the counts stand beside. Where the copy's program is gone, the counts are cleared (To do 10,
    spec decision 6).
  - At the first chill the rule „Zawsze → Eksploruj” goes, each by `withFirstChillRule` on its own
    content, into the copy, into its base and into the copy's program where that program is on the
    list, and into no other program; the streak stays (To do 11).
  - The program editor's `update` takes the program to show and its counts, in place of reading
    them from the game state. Until Slice 6 the game view shows the copy with its counts during a
    map run, and otherwise the program that `setProgram` edits outside a map run, with counts where
    they stand beside it, so the game plays as before on that program.
  - The tests of the send, „Restart”, „Zakończ”, the first chill and the counts —
    `tests/sim/flow.test.mjs`, `tests/sim/discovery.test.mjs` and `tests/sim/program-counts.test.mjs`
    — change with the behaviour, each changed expectation naming its To do as
    `guidelines/testing.md`, “Changing an existing test”, asks. The other test files that read the
    one program of the game state stay red until Slices 2 and 3 migrate them; they are not this
    slice's checks.
  - `src/browser/sim/programs.ts` joins the table “Files of this kind” of
    `guidelines/coding-simulation-module.md` as a row of status `copy`.
- **Change:** `guidelines/coding-simulation-module.md` · `src/browser/sim/types.ts` · `src/browser/sim/game.ts` · `src/browser/sim/programs.ts` ·
  `src/browser/view/program-editor.ts` · `src/browser/view/game-view.ts` · `tests/sim/copy.test.mjs` ·
  `tests/sim/flow.test.mjs` · `tests/sim/discovery.test.mjs` · `tests/sim/program-counts.test.mjs`
- **Read:** `.runs/task-cycles/programy-gracza/task.md:14-27` To do ·
  `.runs/task-cycles/programy-gracza/task.md:101-105` Questions carried to cycle ·
  `.runs/task-cycles/programy-gracza/task.md:160-181` Settlements to record ·
  `.runs/task-cycles/programy-gracza/spec.md:29-48` Constraints ·
  `.runs/task-cycles/programy-gracza/spec.md:52-70` 1. A program is told apart by a number given when it is created ·
  `.runs/task-cycles/programy-gracza/spec.md:84-122` 3. The copy belongs to the map run, 4. The game's records of which program a character goes with ·
  `.runs/task-cycles/programy-gracza/spec.md:124-155` 5. Operations of the simulation, 6. Firing counts follow the copy ·
  `.runs/task-cycles/programy-gracza/spec.md:189-196` Units and their interfaces ·
  `.runs/task-cycles/programy-gracza/spec.md:235-242` Left to the maker ·
  `.runs/task-cycles/programy-gracza/plan.md:576-588` Choices ·
  Foundation entries F5 · F10 · F11 · F13 · F17 · F18 · F20 · F21 · F23 · F24 ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:401-414` D-20 ·
  `foundations/decisions.md:450-510` D-22 · D-23 · `foundations/decisions.md:733-761` D-35 · D-36 ·
  `foundations/decisions.md:1083-1108` D-56 · `foundations/decisions.md:1185-1198` D-62 ·
  `foundations/decisions.md:1573-1666` D-90 · D-91 · D-92 · D-93 ·
  `foundations/decisions.md:2032-2056` D-119 · `foundations/decisions.md:2148-2169` D-123 ·
  `foundations/decisions.md:2213-2261` D-126 · D-127 · `foundations/decisions.md:2338-2388` D-131 · D-132 ·
  `foundations/decisions.md:2450-2475` D-136 · `foundations/decisions.md:2575-2588` D-143 ·
  `foundations/invariants.md:165-196` map-run-repeatability · simulation-randomness · action-in-progress ·
  `foundations/invariants.md:214-262` simulation-isolation · simulation-inputs · program-rule-pick ·
  `foundations/invariants.md:309-317` restart-seed · `foundations/invariants.md:364-373` program-closed-lists ·
  `foundations/invariants.md:528-536` minute-span-split · `foundations/invariants.md:828-836` streak-program-change ·
  `foundations/part_map.md:3-56` browser-view · simulation ·
  `foundations/glossary.md:18-30` map run · program · `foundations/glossary.md:65-71` map run restart ·
  `foundations/glossary.md:131-155` manual map run · completion · solved map · streak ·
  `foundations/glossary.md:163-167` beaten attack ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/run.ts` · `src/browser/sim/understanding.ts` · `src/browser/view/clock.ts` ·
  `tests/sim/program-fixture.mjs` · `tests/sim/understanding-fixture.mjs` ·
  `tests/invariants/test_streak_program_change.py`
- **Model:** same — it sets the shapes of the game state, the map run and the editor's input that
  every later slice builds on, across the parts `simulation` and `browser-view`.
- **Risk:** none
- **Checks:** first a failing case in `tests/sim/copy.test.mjs`: an edit during a map run leaves
  program 1 as it was while the map run carries out the edited copy. Then `npm run typecheck` ·
  `npm test -- tests/sim/copy.test.mjs` · `npm test -- tests/sim/flow.test.mjs` ·
  `npm test -- tests/sim/discovery.test.mjs` · `npm test -- tests/sim/program-counts.test.mjs` ·
  `npm test -- tests/sim/streak.test.mjs` · `npm test -- tests/sim/team.test.mjs` ·
  `npm test -- tests/invariants/test_restart_seed.py` ·
  `npm test -- tests/invariants/test_map_run_repeatability.py` ·
  `npm test -- tests/invariants/test_action_in_progress.py` ·
  `npm test -- tests/invariants/test_streak_program_change.py` ·
  `npm test -- tests/invariants/test_minute_span_split.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`. By hand in a real browser (D-75, D-88):
  `npm run dev` in the worktree, the account requests answered by an intercepted session as in the
  earlier cycle; send a character, edit the program during the map run, „Restart”, „Zakończ” and
  send again, and inspect by screenshot that the edit acts in the map run and survives „Restart”,
  and that after „Zakończ” the editor shows program 1 without the edit, with the counts and „0×”
  beside the edited rule. Name in the report each state left unchecked.
- **Depends on:** F5 · F10 · F11 · F13 · F17 · F18 · F20 · F21 · F23 · F24

### Slice 2 — the JavaScript tests read the program list and the copy

- **Goal:** The JavaScript tests that read the game state's one program or call the editor's
  `update` with a game state alone pass again against Slice 1: where a test reads `state.program`,
  it reads the copy of the game state's map run during a map run, or the program of the list by
  its number outside one; where it calls the program editor's `update`, it passes the program to
  show and its counts. Each changed expectation keeps the strength of its check and names its reason
  in the task's To do 1, 6 or 7, as `guidelines/testing.md`, “Changing an existing test”, asks. No
  test is deleted, skipped or weakened. The slice changes no product file; a product fault the
  migration shows goes back to the orchestrator in the report.
- **Change:** `tests/sim/campfire.test.mjs` · `tests/sim/conditions.test.mjs` · `tests/sim/data.test.mjs` ·
  `tests/sim/encounters.test.mjs` · `tests/sim/gather.test.mjs` · `tests/sim/program.test.mjs` ·
  `tests/sim/purity.test.mjs` · `tests/sim/repertoire.test.mjs` · `tests/view/program-editor.test.mjs`
- **Read:** `.runs/task-cycles/programy-gracza/task.md:14-27` To do ·
  `.runs/task-cycles/programy-gracza/spec.md:84-110` 3. The copy belongs to the map run ·
  `.runs/task-cycles/programy-gracza/spec.md:124-146` 5. Operations of the simulation ·
  `.runs/task-cycles/programy-gracza/plan.md:576-588` Choices ·
  Foundation entries F13 · F17 · F18 ·
  `foundations/glossary.md:18-30` map run · program ·
  `guidelines/coding.md` · `guidelines/testing.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/game.ts` · `src/browser/view/program-editor.ts` ·
  `tests/sim/program-fixture.mjs` · `tests/sim/understanding-fixture.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/campfire.test.mjs` · `npm test -- tests/sim/conditions.test.mjs` ·
  `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/encounters.test.mjs` ·
  `npm test -- tests/sim/gather.test.mjs` · `npm test -- tests/sim/program.test.mjs` ·
  `npm test -- tests/sim/purity.test.mjs` · `npm test -- tests/sim/repertoire.test.mjs` ·
  `npm test -- tests/view/program-editor.test.mjs` · `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1

### Slice 3 — the invariant checks read the program list and the copy

- **Goal:** The Python invariant checks whose Node drivers read the game state's one program pass
  again against Slice 1. A driver that records `state.program` records the copy of the map run
  during a map run, or the program of the list by number outside one, so each check still reads
  the program its invariant names: for `program-closed-lists` the program the simulation accepted,
  for `program-rule-pick` the program the map run carries out, which keeps every rule it passes
  over, for `program-world-reference` every program the simulation holds — the list's programs
  and the copy. The made-up control of `test_simulation_inputs.py` that pushes onto a program's
  rules pushes onto a program of the new shape, so the control still fails as it should. Each
  check's docstring, its reading of the sentence included, says what it now reads. Each changed
  expectation names its reason in the task's To do 1 or 6; no check is weakened. The slice changes
  no product file.
- **Change:** `tests/invariants/test_program_closed_lists.py` · `tests/invariants/test_program_rule_pick.py` ·
  `tests/invariants/test_program_world_reference.py` · `tests/invariants/test_simulation_inputs.py` ·
  `tests/invariants/program_fixture.py`
- **Read:** `.runs/task-cycles/programy-gracza/task.md:14-27` To do ·
  `.runs/task-cycles/programy-gracza/spec.md:84-110` 3. The copy belongs to the map run ·
  `.runs/task-cycles/programy-gracza/plan.md:576-588` Choices ·
  Foundation entries F13 · F17 · F18 ·
  `foundations/invariants.md:214-262` simulation-isolation · simulation-inputs · program-rule-pick ·
  `foundations/invariants.md:364-373` program-closed-lists · `foundations/invariants.md:386-395` program-world-reference ·
  `foundations/glossary.md:18-30` map run · program ·
  `guidelines/coding.md` · `guidelines/testing.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/game.ts` ·
  `tests/invariants/loop2_invariant_support.py`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_program_closed_lists.py` ·
  `npm test -- tests/invariants/test_program_rule_pick.py` ·
  `npm test -- tests/invariants/test_program_world_reference.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` · `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1

### Slice 4 — the operations on the player's program list

- **Goal:** The simulation's module of the player's programs, which Slice 1 adds as
  `src/browser/sim/programs.ts`, gains the operations on the list, each a function that takes the
  game state, returns a `GameResult`, changes nothing passed to it and throws on a call the game
  does not allow, outside a map run and during one alike (spec decision 5, list operations):
  - the name a program takes from typed text, as `characterName` does for a character: trimmed,
    and refused, with which of the two reasons, when empty after trimming or when another program's
    name equals it regardless of letter case — a program's own name in another letter case does not
    block its rename — with no length limit (To do 4);
  - the suggested name „Program n”, for the smallest n from 2 that no program's name takes, letter
    case ignored;
  - create a program: the suggested name, the next number, one empty rule group „Program” under
    „Zawsze”, at the end of the list; the caller finds its number through the state;
  - rename a program, by number, keeping its place;
  - delete a program, by number, refused while the list holds one program. Where the map run's copy
    belongs to it, the copy's number becomes none and the copy keeps the name the program had.
    Where the counts stand beside it after „Zakończ”, they are cleared. Records of spec decision 4
    that name it simply find no program from then on (To do 3);
  - edit a saved program, by number, checked against the resources of every map, as a program
    outside a map run is checked today. Where the counts stand beside it after „Zakończ”, they are
    reconciled with the new content. It never changes a map run, its copy, its streak, its beaten
    attacks or its counts (To do 9; F9);
  - pick the program of a headquarters row: a character number and a program number on the list,
    kept until that character is sent.
  The row's program of Slice 1 is tested here through each fallback of spec decision 4: the pick,
  the program used last, the game-wide program entered with last, the first program of the list,
  each passed over once its program is deleted, and a pick kept through the creation of another
  character and cleared by the send (To do 5). „Zakończ” after the deletion of the copy's program
  clears the counts. The check of F9 is written with its control — an edit of the copy in the same
  scenario sets the streak to zero — so it can fail, and the edit of the program the copy came
  from is among its cases. Its file is added by name to the *Files* of the part `simulation`
  through `the-way-update-part-map`, in the same commit.
- **Change:** `src/browser/sim/programs.ts` · `src/browser/sim/game.ts` · `src/browser/sim/types.ts` ·
  `tests/sim/program-list.test.mjs` · `stryker.config.json` ·
  `tests/invariants/test_saved_program_edit.py` · `foundations/part_map.md`
- **Read:** `.runs/task-cycles/programy-gracza/task.md:16-24` To do, items 1–9 ·
  `.runs/task-cycles/programy-gracza/task.md:160-181` Settlements to record ·
  `.runs/task-cycles/programy-gracza/spec.md:52-82` 1. A program is told apart by a number given when it is created, 2. The player's program list ·
  `.runs/task-cycles/programy-gracza/spec.md:112-134` 4. The game's records of which program a character goes with, 5. Operations of the simulation, list operations ·
  `.runs/task-cycles/programy-gracza/spec.md:148-155` 6. Firing counts follow the copy ·
  `.runs/task-cycles/programy-gracza/spec.md:231-231` Foundation entries, the part-map change ·
  `.runs/task-cycles/programy-gracza/plan.md:576-588` Choices ·
  Foundation entries F2 · F3 · F4 · F5 · F9 · F13 · F17 · F18 · F21 · F25 ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:998-1020` D-52 ·
  `foundations/decisions.md:1044-1061` D-54 · `foundations/decisions.md:1083-1108` D-56 ·
  `foundations/decisions.md:1592-1608` D-91 · `foundations/decisions.md:1632-1666` D-93 ·
  `foundations/decisions.md:2338-2363` D-131 ·
  `foundations/invariants.md:214-234` simulation-isolation · simulation-inputs ·
  `foundations/invariants.md:828-836` streak-program-change ·
  `foundations/part_map.md:28-56` simulation ·
  `foundations/glossary.md:18-30` map run · program · `foundations/glossary.md:87-92` headquarters ·
  `foundations/glossary.md:150-155` streak ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `tests/invariants/test_streak_program_change.py` ·
  `tests/invariants/program_fixture.py` · `tests/sim/program-fixture.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** first a failing case in `tests/sim/program-list.test.mjs`: a second created program is
  named „Program 2” and takes the number 2. Then `npm run typecheck` ·
  `npm test -- tests/sim/program-list.test.mjs` · `npm test -- tests/invariants/test_saved_program_edit.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/quality/test_quality_invariants.py` ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 1 · Slice 3 · F2 · F3 · F4 · F5 · F9 · F17 · F21

### Slice 5 — the saves, the discard and the switch of the copy

- **Goal:** The simulation gains the operations on a manual map run's copy and the two measures of
  its record, each operation a function that takes the game state, returns a `GameResult`, changes
  nothing passed to it and throws on a call the game does not allow (spec decision 5, the
  operations on the manual map run):
  - the measure „the copy has unsaved changes”: the copy differs from its base, or its program is
    gone; and the measure „the copy's program has changes the copy lacks”: that program is on the
    list and its content differs from the base. Both compare as `setProgram` compares programs
    today, the rule and group identity counters included, so a rule added and then deleted counts
    as a change in both (the spec re-review's note on spec decision 3);
  - save the copy into its program: refused without unsaved changes or with its program gone; the
    program's content and the base become the copy; the copy, streak, beaten attacks and counts
    stay; no confirmation, also where the program has changes the copy lacks (To do 8, 9; F8, F15);
  - save the copy as a new program, with a name by the name rules of Slice 4: refused without
    unsaved changes; the new program, at the end of the list with the next number, takes the
    copy's content; the copy takes the new program's number and its base becomes the copy; the
    character's program used last becomes the new program; copy, streak, beaten attacks and counts
    stay, and this is no switch (To do 8; F6, F15);
  - discard the copy's changes: refused without unsaved changes or with its program gone; the copy
    becomes its base as an edit of the copy does — counts reconciled, the streak and the beaten
    attacks of a map run not ended set to zero where the copy changes (To do 8; F21);
  - switch the character to another program: refused without a map run, with a map run ended in
    death or a completion, for a program not on the list and for the program the copy belongs to.
    The map run gets a fresh copy record of that program; the streak and the beaten attacks become
    zero; every count of the new copy's rules starts from zero; the character's program used last
    becomes it. The seed, the minute, the map, the body, the backpack, the action in progress
    (D-20) and the pause, the pause at a discovery included, stay as they are (To do 12; F12, F19).
  The rule written at the first chill is neither an unsaved change nor a change the save announces,
  shown with a program and a copy that start equal (To do 11). The check of F15 is written with its
  control — a switch in the same scenario sets the streak to zero — and its file is added by name
  to the *Files* of the part `simulation` through `the-way-update-part-map`, in the same commit. The
  check of `streak-program-change` gains a switch, to a program of other rules and to one of the
  same rules, each setting the streak to zero, and its docstring reads the sentence for the copy as
  F20 words it.
- **Change:** `src/browser/sim/programs.ts` · `src/browser/sim/game.ts` · `src/browser/sim/types.ts` ·
  `tests/sim/copy-actions.test.mjs` · `stryker.config.json` ·
  `tests/invariants/test_copy_save.py` · `tests/invariants/test_streak_program_change.py` ·
  `foundations/part_map.md`
- **Read:** `.runs/task-cycles/programy-gracza/task.md:21-27` To do, items 6–12 ·
  `.runs/task-cycles/programy-gracza/task.md:160-181` Settlements to record ·
  `.runs/task-cycles/programy-gracza/task.md:149-150` Decisions in play, „How is a map solved” and streak-program-change/1 ·
  `.runs/task-cycles/programy-gracza/spec.md:84-110` 3. The copy belongs to the map run ·
  `.runs/task-cycles/programy-gracza/spec.md:136-155` 5. Operations of the simulation, on the manual map run, 6. Firing counts follow the copy ·
  `.runs/task-cycles/programy-gracza/spec.md:226-231` Foundation entries, streak-program-change to the part-map change ·
  `.runs/task-cycles/programy-gracza/plan.md:576-588` Choices ·
  Foundation entries F3 · F6 · F8 · F11 · F12 · F13 · F15 · F17 · F18 · F19 · F20 · F21 · F23 · F25 ·
  `foundations/decisions.md:401-414` D-20 · `foundations/decisions.md:450-474` D-22 ·
  `foundations/decisions.md:1632-1666` D-93 · `foundations/decisions.md:2112-2146` D-122 ·
  `foundations/decisions.md:2338-2363` D-131 · `foundations/decisions.md:2450-2475` D-136 ·
  `foundations/invariants.md:187-196` action-in-progress · `foundations/invariants.md:214-234` simulation-isolation · simulation-inputs ·
  `foundations/invariants.md:309-317` restart-seed · `foundations/invariants.md:828-836` streak-program-change ·
  `foundations/part_map.md:28-56` simulation ·
  `foundations/glossary.md:18-30` map run · program · `foundations/glossary.md:65-71` map run restart ·
  `foundations/glossary.md:131-155` manual map run · completion · solved map · streak ·
  `foundations/glossary.md:163-167` beaten attack ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/understanding.ts:309-339` withFirstChillRule ·
  `tests/invariants/program_fixture.py` · `tests/sim/program-fixture.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** first a failing case in `tests/sim/copy-actions.test.mjs`: „Zapisz w programie” after
  an edit of the copy gives the program the copy's content and leaves the streak. Then
  `npm run typecheck` · `npm test -- tests/sim/copy-actions.test.mjs` ·
  `npm test -- tests/invariants/test_copy_save.py` · `npm test -- tests/invariants/test_streak_program_change.py` ·
  `npm test -- tests/invariants/test_action_in_progress.py` · `npm test -- tests/invariants/test_restart_seed.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/quality/test_quality_invariants.py` ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 4 · F3 · F6 · F8 · F11 · F12 · F15 · F19 · F20 · F21 · F23

### Slice 6 — the program panel: the list, its actions and the program it shows

- **Goal:** A new browser module, `src/browser/view/program-panel.ts`, owns the left panel and
  holds as view state which program it shows (spec decision 7, without the controls of the copy,
  which Slice 7 adds):
  - at the top the shared select list named „Program:”, its positions the names of the player's
    programs in list order, the shown program's name being what it shows; during a map run
    „Kopia w przejściu” stands first. Picking a position shows that program and changes no game
    state (To do 2; F1);
  - „Nowy program”, „Zmień nazwę” and the destructive „Usuń”, from the shared controls. „Usuń” is
    disabled while the list holds one program. While the copy is shown, „Zmień nazwę” and „Usuń”
    are hidden and „Nowy program” stays. „Nowy program” shows the new program; „Usuń” of the shown
    program shows the first program of the list; „Zmień nazwę” shows the name field filled with the
    current name, and „Zapisz” (To do 3; F2);
  - the name field: the shared text field named „Nazwa programu”, with its message under it in
    `warning` — „Wpisz nazwę programu.” for a name empty once trimmed, „Program o tej nazwie już
    istnieje.” for a name another program has — the reason taken from the simulation's name rule
    of Slice 4. It is built so that Slice 7 can use it for „Zapisz jako nowy program”. It leaves the
    panel without saving when the player shows another program or picks the same action again, and
    no cancel button is added (To do 4; F4);
  - the program editor under the list edits the shown program: the copy through `setProgram`, a
    saved program through the edit of a saved program of Slice 4. Counts show only where spec
    decision 6 puts them: during a map run, its screens after death and after a completion
    included, beside the copy's rules only; outside a map run, beside the program the counts stand
    beside only (F23);
  - which program the panel shows: at a new game program 1; at a send and at „Restart” the copy; at
    „Zakończ” the copy's program, or the first program of the list where it is gone (To do 10; F10).
  The panel builds its controls once and updates them in place, so a field being typed into keeps
  its focus while time passes (D-36); the editor's own heading gives way to the panel's list where
  the two would repeat. The game view creates the panel with callbacks it turns into simulation
  calls, each after `clock.flush()`, as the editor's commit is today, and replaces Slice 1's
  interim choice of what the editor shows. Styles read only the design tokens; a value the token
  file lacks is named in the report, never chosen (`src/browser/AGENTS.md`). The panel's states are
  tested on the hand-made document model, as `tests/view/program-editor.test.mjs` models one.
  `src/browser/view/program-panel.ts` joins the table “Files of this kind” of
  `guidelines/coding-browser-module.md` as a row of status `copy`.
- **Change:** `src/browser/view/program-panel.ts` · `src/browser/view/game-view.ts` ·
  `src/browser/view/program-editor.ts` · `src/browser/styles.css` · `tests/view/program-panel.test.mjs` ·
  `guidelines/coding-browser-module.md`
- **Read:** `.runs/task-cycles/programy-gracza/task.md:16-27` To do ·
  `.runs/task-cycles/programy-gracza/task.md:160-181` Settlements to record ·
  `.runs/task-cycles/programy-gracza/spec.md:72-82` 2. The player's program list ·
  `.runs/task-cycles/programy-gracza/spec.md:148-183` 6. Firing counts follow the copy, 7. The program panel ·
  `.runs/task-cycles/programy-gracza/spec.md:189-196` Units and their interfaces ·
  `.runs/task-cycles/programy-gracza/spec.md:235-242` Left to the maker ·
  Foundation entries F1 · F2 · F4 · F9 · F10 · F13 · F17 · F23 ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:748-761` D-36 ·
  `foundations/decisions.md:778-851` D-38 · D-39 · D-40 · D-41 · D-42 ·
  `foundations/decisions.md:868-881` D-44 · `foundations/decisions.md:913-926` D-47 ·
  `foundations/decisions.md:1376-1387` D-75 · `foundations/decisions.md:1547-1558` D-88 ·
  `foundations/decisions.md:1632-1666` D-93 · `foundations/decisions.md:2032-2056` D-119 ·
  `foundations/invariants.md:35-43` browser-view-framework · `foundations/invariants.md:468-476` browser-view-focus-outline ·
  `foundations/part_map.md:3-26` browser-view ·
  `foundations/glossary.md:18-30` map run · program · `foundations/glossary.md:131-135` manual map run ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/game.ts` · `src/browser/view/status-row.ts` ·
  `src/browser/view/clock.ts` · `src/browser/view/controls/button.ts` ·
  `src/browser/view/controls/select-list.ts` · `src/browser/view/controls/text-field.ts` ·
  `src/browser/tokens.css` · `tests/view/program-editor.test.mjs`
- **Model:** same — it replaces how the game view feeds the editor and wires the operations of
  Slices 1 and 4 into the panel, the screen every later view slice extends.
- **Risk:** none
- **Checks:** first a failing case in `tests/view/program-panel.test.mjs`: a new game's panel lists
  „Program” and „Usuń” is disabled. Then `npm run typecheck` ·
  `npm test -- tests/view/program-panel.test.mjs` · `npm test -- tests/view/program-editor.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/invariants/test_browser_view_framework.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`. By hand in a real browser (D-75, D-88):
  `npm run dev` in the worktree, the account requests answered by an intercepted session as in the
  earlier cycle; inspect by screenshot a new game's panel; „Nowy program” showing „Program 2”; „Zmień
  nazwę” with the filled field and each of its two messages, „program” in another letter case
  included; „Usuń” disabled with one program and the first program shown after a deletion; during
  a map run „Kopia w przejściu” first, „Zmień nazwę” and „Usuń” hidden with the copy shown, a saved
  program shown without counts; after „Zakończ” the copy's program with its counts; and by keyboard
  the focus outline on each new control and the focus kept in the name field and in an editor
  field while time passes. Name in the report each state left unchecked.
- **Depends on:** Slice 2 · Slice 4 · F1 · F2 · F4 · F10 · F23

### Slice 7 — the controls of the copy in the program panel

- **Goal:** While the program panel of Slice 6 shows the copy, during a map run and on its screens
  after a death and after a completion until „Restart” or „Zakończ”, it shows (spec decision 7,
  “When the copy is shown” and “The switch button”):
  - the heading „Kopia: {name}”, the name of the copy's program, or once it is gone the name it had
    (To do 8; F6);
  - under it, in `warning`, „Niezapisane zmiany w kopii.” while the copy has unsaved changes, by the
    measure of Slice 5;
  - „Zapisz w programie”, „Zapisz jako nowy program” and the destructive „Porzuć zmiany”, active
    while the copy has unsaved changes and inactive otherwise; „Zapisz w programie” and „Porzuć
    zmiany” are absent once the copy's program is gone (To do 3, 8; F3, F7);
  - beside the save buttons, in `warning`, „Program {name} ma zmiany, których nie ma w tej kopii —
    zapis w programie je zastąpi.” while the copy's program has changes the copy lacks, whether or
    not the copy has unsaved changes; „Zapisz w programie” saves at once, and the line goes (To do
    9; F8);
  - „Zapisz jako nowy program” shows the name field of Slice 6 already holding the first free name
    as its value, which the player may keep or change, and „Zapisz”; after the save the panel still
    shows the copy, now belonging to the new program (To do 8; F6);
  - during a map run not ended in death or a completion, while a saved program other than the
    program the copy belongs to is shown, the destructive button „Przełącz postać na ten program”
    under the list; a click switches and shows the copy again. It is absent beside the program the
    copy belongs to, so after „Zapisz jako nowy program” it stands beside the program the copy was
    taken from and not beside the new one, and absent on the screens after a death and after a
    completion (To do 12; F14, F16).
  The game view turns each button into its simulation call of Slice 5, after `clock.flush()`. The
  styleguide's list of destructive buttons (`guidelines/styleguide-browser-view.md:193-197`, in
  “States of shared controls”) gains „Porzuć zmiany” and „Przełącz postać na ten program”, as F22
  words D-44. The panel's states are tested on the hand-made document model.
- **Change:** `src/browser/view/program-panel.ts` · `src/browser/view/game-view.ts` · `src/browser/styles.css` ·
  `guidelines/styleguide-browser-view.md` · `tests/view/program-panel.test.mjs`
- **Read:** `.runs/task-cycles/programy-gracza/task.md:18-27` To do, items 3 and 6–12 ·
  `.runs/task-cycles/programy-gracza/task.md:160-181` Settlements to record ·
  `.runs/task-cycles/programy-gracza/spec.md:157-183` 7. The program panel ·
  Foundation entries F3 · F6 · F7 · F8 · F10 · F13 · F14 · F16 · F22 ·
  `foundations/decisions.md:748-761` D-36 · `foundations/decisions.md:778-851` D-38 · D-39 · D-40 · D-41 · D-42 ·
  `foundations/decisions.md:868-881` D-44 · `foundations/decisions.md:913-926` D-47 · `foundations/decisions.md:1185-1198` D-62 ·
  `foundations/decisions.md:1376-1387` D-75 · `foundations/decisions.md:1547-1558` D-88 ·
  `foundations/decisions.md:2365-2388` D-132 ·
  `foundations/invariants.md:468-476` browser-view-focus-outline ·
  `foundations/part_map.md:3-26` browser-view ·
  `foundations/glossary.md:18-30` map run · program · `foundations/glossary.md:137-141` completion ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/game.ts` · `src/browser/view/controls/button.ts` ·
  `src/browser/view/controls/text-field.ts` · `src/browser/tokens.css`
- **Model:** cheaper
- **Risk:** none
- **Checks:** first a failing case in `tests/view/program-panel.test.mjs`: after an edit of the copy
  the line „Niezapisane zmiany w kopii.” stands and the three buttons are active. Then
  `npm run typecheck` · `npm test -- tests/view/program-panel.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/quality/test_quality_invariants.py` ·
  `python -B .the-way/elements/common/foundation_check.py`. By hand in a real browser (D-75, D-88):
  `npm run dev` in the worktree, the account requests answered by an intercepted session as in the
  earlier cycle; inspect by screenshot the copy with no unsaved changes (no line, buttons inactive)
  and with them (line, buttons active); the line of a changed program with and without unsaved
  changes, and gone after „Zapisz w programie”; „Zapisz jako nowy program” with „Program 2” in the
  field, the heading after it, and the switch button beside the first program and not beside the
  new one; „Porzuć zmiany”; a copy whose program was deleted; a switch, with the streak at zero in
  the status row and the counts at „0×”; the screens after a death and after a completion of Las,
  the buttons working and no switch button; „Zakończ” with unsaved changes; the first-chill rule
  leaving no line. The text of the two destructive buttons is checked in `danger`. Name in the
  report each state left unchecked, such as a completion of Las — głębiej.
- **Depends on:** Slice 5 · Slice 6 · F3 · F6 · F7 · F8 · F14 · F16 · F22

### Slice 8 — the program of each headquarters row

- **Goal:** Each character's row of the headquarters gets, beside „Mapa: …” and „Wyślij”, one
  shared select list named „Program:” — one per row whatever the number of maps — its positions
  the names of the player's programs in list order, showing the row's program of spec decision 4
  as the simulation gives it. A pick calls the simulation's pick of Slice 4. „Wyślij” sends with
  the program the row shows: the headquarters passes its number, and the clock's send carries it
  to the simulation's `send`. The rows are rebuilt when the programs or their names change, as
  they are today when the team or the solved maps change (To do 5; F5, spec decision 8). The row's
  list is tested through a pure function of its positions and its shown program, as the
  headquarters' other pure parts are tested.
- **Change:** `src/browser/view/headquarters.ts` · `src/browser/view/game-view.ts` · `src/browser/view/clock.ts` ·
  `src/browser/styles.css` · `tests/view/headquarters.test.mjs` · `tests/view/clock.test.mjs`
- **Read:** `.runs/task-cycles/programy-gracza/task.md:20-20` To do, item 5 ·
  `.runs/task-cycles/programy-gracza/task.md:170-170` Settlements to record, row 5 ·
  `.runs/task-cycles/programy-gracza/spec.md:112-122` 4. The game's records of which program a character goes with ·
  `.runs/task-cycles/programy-gracza/spec.md:185-196` 8. The headquarters row, Units and their interfaces ·
  `.runs/task-cycles/programy-gracza/plan.md:576-588` Choices ·
  Foundation entries F5 · F13 · F17 ·
  `foundations/decisions.md:748-761` D-36 · `foundations/decisions.md:868-881` D-44 ·
  `foundations/decisions.md:1022-1081` D-53 · D-54 · D-55 · `foundations/decisions.md:1376-1387` D-75 ·
  `foundations/decisions.md:1547-1558` D-88 · `foundations/decisions.md:2665-2678` D-149 ·
  `foundations/part_map.md:3-26` browser-view · `foundations/glossary.md:87-92` headquarters ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/game.ts` · `src/browser/view/controls/select-list.ts` ·
  `src/browser/tokens.css`
- **Model:** cheaper
- **Risk:** none
- **Checks:** first a failing case in `tests/view/headquarters.test.mjs`: the row of a character that
  has not gone shows the first program of the list. Then `npm run typecheck` ·
  `npm test -- tests/view/headquarters.test.mjs` · `npm test -- tests/view/clock.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`. By hand in a real browser (D-75, D-88):
  `npm run dev` in the worktree, the account requests answered by an intercepted session as in the
  earlier cycle; inspect by screenshot two characters' rows with one list each and two maps open;
  a character that has not gone showing the program entered with last; a pick kept after creating
  another character and used by „Wyślij”; a switched character's row showing the program it was
  switched to; a deleted default falling back; the focus outline on the list. Name in the report
  each state left unchecked.
- **Depends on:** Slice 4 · Slice 7 · F5 · F17

## Coverage

| What the task requires | Slices or entries |
|---|---|
| To do 1 — programs of the player, one list; a new game's „Program” | Slice 1 · Slice 4 · F17 · F18 |
| To do 2 — the panel's list „Program: {nazwa}” and the editor under it | Slice 6 · F1 |
| To do 3 — „Nowy program”, „Zmień nazwę”, „Usuń”; the last program stays; deleting the copy's program | Slice 4 · Slice 6 · Slice 7 · F2 · F3 |
| To do 4 — the names, the first free number, the `warning` message, no length limit | Slice 4 · Slice 6 · F4 |
| To do 5 — the headquarters row's „Program:” and its default | Slice 1 · Slice 4 · Slice 8 · F5 |
| To do 6 — the copy taken at the start; „Restart” on the same copy | Slice 1 · F18 |
| To do 7 — edits go into the copy; a changed copy zeroes the streak and the beaten attacks | Slice 1 · Slice 2 · Slice 3 · F20 · F21 |
| To do 8 — the heading, the line, the three buttons, „Zapisz jako nowy program”, saves leave copy and streak, the discard | Slice 5 · Slice 7 · F6 · F7 · F15 |
| To do 9 — „Kopia w przejściu”, editing saved programs during a map run, the line of a changed program | Slice 4 · Slice 5 · Slice 6 · Slice 7 · F1 · F8 · F9 |
| To do 10 — the screens after death and completion, „Zakończ”, the counts after it | Slice 1 · Slice 6 · Slice 7 · F10 · F23 |
| To do 11 — the rule at a discovery into the copy and its program, counted as no change | Slice 1 · Slice 5 · F11 · F24 |
| To do 12 — the switch and its button | Slice 5 · Slice 7 · F12 · F14 · F16 · F19 · F20 |
| *Settlements to record* rows 1–16 | F1–F16; their code as each row's *What depends on it* names |
| *Questions carried to cycle* — how a program is told apart | F17 · Slice 1 · Slice 4 |
| *Questions carried to cycle* — where the copy stands and the records | Slice 1 · Slice 5 |
| *Questions carried to cycle* — counts following the copy | Slice 1 · Slice 5 · Slice 6 · F23 |
| Projected entries „(new) — Who owns a program?”, the sentence of a switch in „How is a map solved”, `streak-program-change/1` | F18 · F19 · F20 · Slice 5 |
| The spec re-review's note: “the copy has unsaved changes” compares with the identity counters, as the other measure does | Slice 5 |
| The part-map change | F25 · Slice 4 · Slice 5 |
| The changed journeys checked by hand (D-75, D-88) | Slice 1 · Slice 6 · Slice 7 · Slice 8 |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| `setProgram` keeps its name as the edit of the copy within a map run (spec, *Left to the maker*), and outside a map run edits the program a character with no pick and no program used last would be sent with — the game-wide program entered with last, or else the first of the list — so about twenty-five test files that set a program before a send stay as they are. From Slice 6 the view edits saved programs by number and uses `setProgram` only within a map run. | `setProgram` refused outside a map run, and every test and step script that sets a program before a send rewritten | A review that rejects the outside meaning sends those files into three more slices of migration of up to ten files each. |
| `send` takes the program number as an optional field beside the map and the character; absent, it sends with the row's program of spec decision 4. The headquarters always passes it. | A required number, and every test and step script that sends rewritten (about thirty-five files) | A caller that forgets the number sends with the row's default, which is what the headquarters would show. |
| The copy record is a field of the game state's map run, of a type extending the map run of `src/browser/sim/run.ts`, so `newMapRun` and the functions of a minute keep their signatures. | The copy as a field of `run.ts`'s map run built by `newMapRun` — eleven test files that call `newMapRun` would change | A move of the field into the run type later, a type-level change. |
| The firing counts stay in the game state's `ruleCounts`, keyed by the copy's rule identities during a map run, with a record of the program they stand beside after „Zakończ”. | The counts moved onto the copy record — the counts after „Zakończ” outlive the map run and need a place in the game state anyway, and every counts test would change | One field moved, with its tests. |
| The player's programs get a simulation module of their own, `src/browser/sim/programs.ts`, and the panel a browser module of its own, `src/browser/view/program-panel.ts` (spec, *Left to the maker*). | Everything in `src/browser/sim/game.ts` (684 lines) and `src/browser/view/game-view.ts` | A file split or merge, no change of behaviour. |
| The order: the simulation's copy first with the least view change that keeps the game building and playable, then the migration of the tests that read the one program (Slices 2 and 3) so that the tests are green again before new behaviour is added, then the list, the copy's operations, the panel, the copy's controls and the headquarters. The styleguide's example (“Plan of a user-interface change”: environment and library, values in their source, one screen, its states) is followed for the view where it applies: no environment, library or token value changes, so the view starts at the screen (Slice 6) and goes on to its states (Slice 7) and the second screen (Slice 8). | The view of each screen made together with its simulation operations — each slice would cross both parts and grow past ten files | A later slice waits on an earlier one it does not need; the slices are made one after another anyway. |
| The two lines of the part map (F25) are written in Slices 4 and 5 with their check files, through `the-way-update-part-map`. | In the foundation step — `foundation_check.py` would fail on a pattern matching no tracked file until the slices | None found; the earlier cycle did the same. |
| The styleguide's list of destructive buttons is changed in Slice 7, with the buttons. | In the foundation step — the styleguide is a guideline file, which the skills of the foundation step do not write | Between the foundation step and Slice 7 D-44 and the styleguide's list differ. |
| The identifiers `saved-program-edit` (F9) and `copy-save` (F15) are proposed for the two new invariants, and the check files are named after them. | Paths left unnamed until the foundation step | The orchestrator renames the path in the handoff of Slice 4 or 5. |
