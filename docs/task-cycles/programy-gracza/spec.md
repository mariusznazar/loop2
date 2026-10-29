# Spec — Programy gracza: wybór programu przy wejściu na mapę i kopia programu w przejściu

- Task: `.runs/task-cycles/programy-gracza/task.md` (accepted 2026-10-28)
- Open choice: how the game state tells one program from another; where the copy stands and how the game remembers its source program, each character's program used last, the program picked on a headquarters row and whether the source program changed since the copy was taken from it or last saved into it; how the firing counts of D-93 follow the rules of the copy (the task's *Questions carried to cycle*). The orchestrator's answers to the designer's batch 1 (`reports/03-design-answers.md`) settle the readings marked "Q-D1"–"Q-D5" below; Q-D2–Q-D5 are the orchestrator's autonomous choices, not the human's approval.

## Intent

The game holds one program today. A map run carries it out live, and every edit replaces it, in a map run and outside one. This change gives the player a list of programs shared by the whole team. A character enters a map with one of them, and a manual map run carries out a copy of that program taken at its start. Edits made during the map run go into the copy, which the player saves into the program, saves as a new program or discards. „Restart” carries on the same copy, and the player can switch the character to another program in the middle of a manual map run. The design leaves room for the trip plan (task 13), the saved game state (task 16) and the earning loop (task 18) to build on the same records.

## Goals and non-goals

Goals — everything of the task's *To do* 1–12, on the foundation rows 1–16:

- the player's list of programs, with „Nowy program”, „Zmień nazwę” and „Usuń”, its naming rules, and the new game's one program „Program”;
- the select list „Program:” on each headquarters row, with its default and the pick kept until the character is sent;
- the copy of a manual map run: taken at the send, carried on by „Restart”, edited by the program editor, saved into its program, saved as a new program or discarded, dropped by „Zakończ”, replaced by a fresh copy at a switch;
- the two warning lines, the save, discard and switch buttons, and the program panel's list in a map run („Kopia w przejściu” and the saved programs);
- the rule written at the first chill, going into the copy and its program;
- the firing counts following the copy, and standing beside its program's rules after „Zakończ”.

Non-goals:

- the earning loop and its copies (task 18). The design names where they will stand, and writes nothing of them;
- the trip plan as a field of the program, and what leaves the map after a switch (task 13);
- keeping programs across a page reload (task 16). The records this change adds are plain data of the game state, so task 16 can save them as they are;
- a duplicate of a program (Q2), a limit on a name's length (Q3), a confirmation before „Zakończ”, „Usuń”, „Porzuć zmiany” or a switch (Q9, Q10, D-44);
- a switch on the screens after a death or a completion (Q12).

## Constraints

- The frozen task: its *To do*, *Questions to settle* Q1–Q17 and *Settlements to record* rows 1–16 bind every point below; this spec does not reopen them.
- The approved definition `definicja_mvp_loop2.md` (fingerprint 7e33760d), „(new) — Who owns a program?”, lines 1000–1013: a saved change of a program reaches a manual map run only at a manual map entry other than a restart, or at a switch to that program; a change made in the copy reaches the program only by a save, and is dropped by a discard or a switch; a save over a changed program is announced, never blocked. Its *Verification* counts “a program stored as a field of the character” as a violation.
- D-04: the browser view changes the game state only through functions of the simulation and draws from the game state. What the panel shows is view state; everything the game must remember is game state.
- D-20 and `action-in-progress`: an edit of the copy and a switch leave the action in progress running.
- D-22, `restart-seed`, `map-run-repeatability`: a restart and a switch keep the seed; a switch does not start a new map run.
- D-23, D-26, D-90, D-119, D-126, D-127, `program-closed-lists`, `program-world-reference`, `program-rule-pick`: the content of a program — its rule groups, rules and identity counters — keeps its current shape and checks. The simulation carries out the copy reduced to the character's repertoire, as `programOf` reduces the one program today.
- D-56: a character is named by its number; the same pattern serves programs (decision 1).
- D-93, D-131, D-136, `streak-program-change`: counts, streak and beaten attacks as the task carries them over to the copy.
- D-44, D-39 and the styleguide: every control is built from the shared controls of `src/browser/view/controls/`. The warning lines are in `warning`, and the destructive buttons have their text in `danger`.
- `simulation-isolation`, `simulation-inputs`: no new function of the simulation changes a value passed to it.
- Code as it stands at `4bfb962`:
  - `GameState.program` (`src/browser/sim/types.ts:251`);
  - `setProgram` (`src/browser/sim/game.ts:416`), with the streak and beaten-attack reset, and `reconcileCounts` (`:276`);
  - `programOf` (`:327`), `startRun` (`:339`), `restart` (`:502`), `end` (`:521`);
  - the first-chill write in `advanceMinutes` (`:632`, through `withFirstChillRule`, `src/browser/sim/understanding.ts:314`);
  - the panel and the editor (`src/browser/view/game-view.ts:40`–`:60`, `src/browser/view/program-editor.ts:616`);
  - the headquarters row (`src/browser/view/headquarters.ts:139`–`:168`).
- About forty test files under `tests/sim`, `tests/view` and `tests/invariants` drive `setProgram` or read `state.program`. The Python invariant checks drive the simulation through step scripts that name exported functions.

## Decisions

### 1. A program is told apart by a number given when it is created

Each program of the player carries a number the game gives it when the program is created: one more than the number the game gave last, held in the game state as the next number to give. Numbers are never given again, also after a deletion. A new game holds program 1, „Program”, and the next number 2. „Nowy program” and „Zapisz jako nowy program” each take the next number. Every record that points at a program names it by this number:

- the copy's program;
- each character's program used last;
- the program picked on a headquarters row;
- the game-wide program entered with last;
- the program the counts stand beside after „Zakończ”.

So a rename changes no pointer. A deleted program's number never comes to mean another program, so a pointer left naming it simply finds no program. The name a copy keeps after its program is deleted (decision 3) is shown only in the copy's heading. It is no pointer: nothing finds a program by it.

Rejected:

- the name — a rename would cut every pointer, and names are compared regardless of letter case;
- the place on the list — a deletion before a program shifts it;
- an identifier drawn at random — the simulation draws randomness only from a map run's generators (D-22, and D-56 rejects it for characters for the same reason).

Cost if wrong: a later change of the key would touch every pointer and, after task 16, saved games. That is why this is a foundation decision.

### 2. The player's program list

- The game state holds the list of the player's programs. Each entry has its number, its name and its content, a program of today's shape.
- The list stands in the order programs were created. A rename keeps a program's place, and a program made by „Nowy program” or „Zapisz jako nowy program” joins the end (an order of the spec, as D-54 is for characters).
- A name is stored trimmed. It is refused when it is empty after trimming, or when another program's name equals it regardless of letter case; a program's own name in another letter case does not block its rename.
- The suggested name for „Nowy program” and „Zapisz jako nowy program” is „Program n”, for the smallest n from 2 that no program's name takes, letter case ignored.
- A new program holds one empty rule group „Program” under „Zawsze”, as a new game does (D-91).
- Deleting is refused while the list holds one program. A deletion never touches a map run, beyond what decision 3 says of a copy whose program is gone.
- A saved program, whenever it is edited, is checked as a program outside a map run is checked today: against the resources of every map. An edit of a saved program never changes a map run, its copy, its streak, its beaten attacks or its counts (row 9).

Rejected: names that may repeat, as characters' names may (D-52) — Q3 settles otherwise; a list sorted by name — a rename would move programs.

### 3. The copy belongs to the map run

A map run holds the record of its copy, made of:

- the copied program, the content the simulation carries out;
- the number of its program, or none once that program is deleted, together with the name the program had when it was deleted;
- its base: the content of its program as the copy was taken from it or last saved into it (Q-D1).

What each act does with the record:

- **Send** takes the program the player passes, which must be on the list. The copy and its base are both that program's content, and its number is the program's.
- **„Restart”** builds the new map run with the copy record of the map run it replaces, as it is: unsaved changes, number and base included (Q8).
- **„Zakończ”** drops the map run, and the copy goes with it. Death and a completion leave the map run standing, so the copy stays editable and savable until „Restart” or „Zakończ” (Q9).
- **A switch** replaces the record with a fresh one of the other program: copy and base are its content, number its number.

Measures read from the record:

- **The copy has unsaved changes** when it differs from its base, or when its program is gone (Q-D3).
- **The copy's program has changes the copy lacks** when that program is on the list and its content differs from the base. This is a comparison of content, so a program edited and then put back counts as unchanged. It compares the programs as `setProgram` compares them today, the rule and group identity counters included, so a rule added and then deleted still counts as a change, as it does for D-131.

Rejected:

- one copy in the game state beside the map run — it would not extend to the several earning loops of task 18, each with its own copy, as each map run carries its own;
- the copy as a field of the character — the definition's *Verification* names a program stored on the character as a violation;
- "changed since" read from a version counter that every edit of a program raises — a program edited and put back would warn of changes that would not be lost, and every edit and the first-chill write would have to keep the counter.

Cost if wrong: the copy moves between records, which touches the run's shape, restart, end and switch. That is cheap before task 16 saves it.

### 4. The game's records of which program a character goes with

The game state holds three records, kept apart from the team's characters (decision 3's rejection):

- per character number, the program picked on its headquarters row and not yet sent with — set by a function of the simulation when the player picks on the row, cleared when that character is sent;
- per character number, the program that character used last — set when it is sent, when it is switched to another program (Q13), and when its copy is saved as a new program (To do 8);
- the game-wide program with which a character last entered a map — set only when a character is sent (Q4, „weszła na mapę”; Q-D4).

A function of the simulation gives a row's program as the first, still on the list, of: the program picked on the row; the character's program used last; the game-wide program entered with last; the first program of the list (Q-D4). The headquarters row shows that program, and „Wyślij” passes it to the send.

Rejected: the pick held only in the headquarters module — it would have to survive every rebuild of the team's rows on its own, would escape the simulation's tests and would not be saved by task 16; one per-character record for both the pick and the program used last — a pick never sent would replace the program used last, which the fallback of To do 5 still needs.

### 5. Operations of the simulation

Each operation is a function of the simulation that takes the game state and returns a `GameResult`, changes nothing passed to it, and throws on a call the game does not allow. The maker picks the names and the modules (see *Left to the maker*).

On the program list, outside and during a map run alike:

- **create a program** — name suggested as in decision 2, at the end of the list; returns its number to the caller through the state;
- **rename a program** — by number, with the name rules of decision 2;
- **delete a program** — by number, refused for the last one. When the map run's copy belongs to it, the copy's number becomes none and the copy keeps the name it had. When the counts stand beside it after „Zakończ”, they are cleared;
- **edit a saved program** — by number, with the content checked as in decision 2. Where the counts stand beside that program after „Zakończ”, they are reconciled with the new content, as `reconcileCounts` does today;
- **pick the program of a headquarters row** — character number and program number.

On the manual map run:

- **send** — takes the program number with the map and the character, which `send` takes today; sets the records of decision 4 and starts every count of the copy's rules at zero;
- **edit the copy** — the current `setProgram` within a map run, unchanged in effect. The copy is checked against the run's map. Counts are reconciled. Where the copy after the edit differs from the copy before it, the streak and the beaten attacks of a map run not ended become zero (D-131, row 7 of the task's To do). Allowed also after death or a completion, when no streak is reset, as today;
- **save the copy into its program** — refused when the copy has no unsaved changes or its program is gone. The program's content becomes the copy, and so does the base. The copy, streak, beaten attacks and counts stay (row 15). No confirmation, also when the program has changes the copy lacks (row 8);
- **save the copy as a new program** — refused when the copy has no unsaved changes; with a name and the name rules of decision 2. The new program at the end of the list takes the copy's content, and the copy takes the new program's number and its base becomes the copy. The character's program used last becomes the new program. Copy, streak, beaten attacks and counts stay, and this is not a switch (rows 6, 15);
- **discard the copy's changes** — refused when the copy has no unsaved changes or its program is gone. The copy becomes its base, as an edit of the copy does: it reconciles counts and resets the streak and the beaten attacks of a map run not ended (To do 8);
- **switch the character to another program** — refused without a map run, with a map run ended in death or a completion, for a program not on the list, and for the program the copy belongs to (Q12, Q17). It gives the map run a fresh copy record of that program (decision 3), sets the streak and the beaten attacks to zero, starts every count of the new copy's rules from zero, and sets the character's program used last. It leaves the seed, the minute, the map, the body, the backpack and the action in progress as they are (D-20), and the pause as it stands, the pause at a discovery included;
- **end** — as today, and it also reconciles the counts against the copy's program (decision 6).

The rule of the first chill (D-123, row 11) goes into the copy, into its base and into the copy's program if that program is on the list, each by `withFirstChillRule` on its own content. Every other program stays as it was. The write is neither an unsaved change nor a change the save announces, because the copy and its base, and the program and the base, each receive it alike. As today, it does not reset the streak.

### 6. Firing counts follow the copy

- During a map run, its screens after death and after a completion included, the counts are keyed by the rule identities of the copy, which it takes from its program. They stand beside the copy's rules only. A saved program shown in the panel during a map run shows no counts (Q-D5).
- An edit of the copy keeps the count of a rule whose condition and action stay, and starts again from zero a rule whose content changed (D-93, as today). Saves leave the counts. A discard keeps a count only where the rule's content does not change. „Restart” and a switch start every count from zero (row 12).
- At „Zakończ” the counts are reconciled against the copy's program. A rule of that program keeps the count of the copy's rule of the same identity when the two have the same condition and action, and stands at „0×” otherwise. The game records that program as the one the counts stand beside (row 10). When the copy's program is gone, the counts are cleared. The next send or „Restart” replaces them.
- Outside a map run, counts stand beside their program only. Every other program shows none. Deleting their program clears them.

Rejected: counts kept for every program — a second store with nothing to fill it, since only the copy fires; counts dropped at „Zakończ” — against To do 10 and D-93; counts beside every program's rules by identity alone — rule identities start from 1 in every program, so another program's rules would show false numbers.

### 7. The program panel

A new browser module owns the left panel and holds which program it shows. That choice is view state, and nothing is saved by it. From top to bottom:

- **The list** — a select list named „Program:”, its positions the names of the player's programs in list order; during a map run „Kopia w przejściu” stands first (rows 1, 6). Picking a position shows that program; picking does not change the game state.
- **List actions** — „Nowy program”, „Zmień nazwę”, „Usuń” (destructive). „Usuń” is disabled while the list holds one program. While the panel shows the copy, „Zmień nazwę” and „Usuń” are hidden and „Nowy program” stays. „Nowy program” shows the new program. „Usuń” of the shown program shows the first program of the list. „Zmień nazwę” shows the name field filled with the current name and „Zapisz”.
- **The name field** — the shared text field named „Nazwa programu”, with its message under it in `warning`: „Wpisz nazwę programu.” for a name empty after trimming, „Program o tej nazwie już istnieje.” for a name another program has (Q-D2). The same field serves „Zmień nazwę” and „Zapisz jako nowy program”.

„Zapisz jako nowy program” shows the field already holding the first free name („Program n”, decision 2) as its value, which the player may keep or change, and „Zapisz”. This is the spec's reading of To do 8 and row 6 („pole nazwy z podpowiedzią pierwszej wolnej nazwy”; the orchestrator's autonomous choice). The other reading puts the name only as the empty field's hint (`placeholder`, the empty state of `guidelines/styleguide-browser-view.md:174`–`:175`). It is not taken because To do 4 refuses an empty name: a suggestion shown only as a hint could not be saved without retyping it, so it would do nothing. The field may still carry the hint „Nazwa programu” for its empty state. Cost if wrong: one control's initial value.
- **When the copy is shown:**
  - the heading „Kopia: {name}”, the name of the copy's program, or once it is gone, the name it had (Q-D3);
  - under it, in `warning`, „Niezapisane zmiany w kopii.” while the copy has unsaved changes;
  - „Zapisz w programie”, „Zapisz jako nowy program” and the destructive „Porzuć zmiany”, active while the copy has unsaved changes and inactive otherwise. „Zapisz w programie” and „Porzuć zmiany” are absent once the copy's program is gone (To do 3);
  - beside the save buttons, in `warning`, „Program {name} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.” while the copy's program has changes the copy lacks, whether or not the copy has unsaved changes (To do 9, Q-D1);
  - the program editor, editing the copy, with its counts.
- **When a saved program is shown** — the program editor, editing that program, with counts only where decision 6 puts them.
- **The switch button** — during a map run not ended, while a saved program other than the copy's program is shown, the destructive button „Przełącz postać na ten program” stands under the list (rows 14, 16). Clicking it switches and shows the copy again.

Which program the panel shows:

- at a new game, program 1;
- at a send and at a switch, the copy;
- at „Restart”, the copy;
- at „Zakończ”, the copy's program, or the first program of the list when it is gone (To do 10, Q-D5);
- after „Zapisz jako nowy program”, still the copy, now belonging to the new program.

The program editor stays an editor of one program's content. The panel hands it the content to show, the counts to show (or none) and the callback its edits go to. The offers of the editor's lists stay computed from the game state as today, whichever program it shows. Like the editor today, the panel builds its controls once and updates them in place, so a field being typed into keeps its focus (D-36).

### 8. The headquarters row

Each character's row gets, beside „Mapa: …” and „Wyślij”, one select list named „Program:” — one per row whatever the number of maps (row 5). Its positions are the names of the player's programs, and it shows the row's program from decision 4. A pick calls the simulation's pick of decision 5. „Wyślij” sends with the program the row shows. The list is rebuilt when the programs or their names change, as the rows are rebuilt today when the team or the solved maps change.

### Units and their interfaces

- **Simulation, player's programs** — owns the list, its numbers and names, the row's program and the comparisons of decision 3. Used by the game functions and by the view for what it draws. Depends on `types.ts`, the program check and `withFirstChillRule`. Its exported functions take the game state, or parts of it, and return new values.
- **Simulation, game** (`game.ts`) — the operations of decision 5 that touch a map run, and the chill write; carries out the copy through `programOf`. Depends on the unit above and on `run.ts` as today.
- **Types** (`types.ts`) — the saved program, the copy record on the map run, and the game state's list, next number, three records of decision 4 and counts with the program they stand beside.
- **Browser, program panel** — decision 7. It is created by `game-view.ts` with callbacks that the game view turns into simulation calls, each after `clock.flush()`, as the editor's commit is today. It is updated with the game state and redraws only what changed.
- **Browser, program editor** — unchanged in role. Its update takes the program to show and its counts, instead of reading `state.program` and `state.ruleCounts`.
- **Browser, headquarters** — decision 8. Its controls gain the pick, and its send passes the program number.

## Foundation entries

The foundation step or the return step words each entry; the meaning is given here in one sentence.

New decisions from the task's rows (all 16 rows; the kind is the task's):

1. decision — the program list stands in the program panel behind the select list „Program: {name}”, with „Kopia w przejściu” first during a map run.
2. decision — the list's actions are „Nowy program”, „Zmień nazwę” and „Usuń”; a new program holds the empty group „Program” under „Zawsze”; the last program is not deleted; the game has no duplicate today.
3. decision — deleting the program of a running copy leaves the map run on the copy, without „Zapisz w programie” and „Porzuć zmiany”, with „Zapisz jako nowy program”.
4. decision — program names: the new game's „Program”, new programs „Program n” by the first free number, trimmed, not empty, not another program's name in any letter case, no length limit today.
5. decision — the row's select list „Program:” in the headquarters, and its default.
6. decision — the copy's heading, the line „Niezapisane zmiany w kopii.”, the three buttons active only with unsaved changes, and the copy belonging to the new program after „Zapisz jako nowy program”, which becomes the character's program used last.
7. decision — „Porzuć zmiany” is a destructive button (changes D-44's list).
8. decision — a save over a program changed since the copy was taken from it or last saved into it is announced by a line in `warning` beside the save buttons and done at once.
9. invariant — an edit of a saved program during a map run leaves that map run's copy, streak and counts as they were; method test.
10. decision — on the screens after a death and a completion, the copy stays editable and savable until „Restart” or „Zakończ”. „Zakończ” drops the copy's unsaved changes. After it, the counts stand beside the copy's program's rules, „0×” where content differs (refines D-93).
11. decision — the first-chill rule goes into the copy and its program, and neither counts it as a change (changes D-123).
12. decision — a switch starts the counts from zero and sets the beaten attacks to zero with the streak (changes D-93).
13. glossary term — the copy of a program: the program a map run carries out, taken from one of the player's programs at the start of the map run, at a switch, or at the start of an earning loop. Its changes reach a program only by the player's save, and a restart carries it on.
14. decision — during a map run, picking a saved program in the panel opens it for editing. The button „Przełącz postać na ten program” stands under the list while a saved program other than the copy's program is shown.
15. invariant — „Zapisz w programie” and „Zapisz jako nowy program” leave the copy's content and the streak as they were, and saving as a new program is not a switch; method test.
16. decision — „Przełącz postać na ten program” is a destructive button (changes D-44's list and rationale).

Further entries:

- decision, new — „How does the game state tell one program from another?”: decision 1 of this spec, with its *Rejected* (the name, the place on the list, a random identifier). Its *Verification* says: complies — a rename and a deletion leaving a copy's program, a character's program used last and a row's pick naming the same program; violates — a pointer naming a program by name or place, a number given again.
- decision, new, the part this task makes true — „(new) — Who owns a program?” from the definition, every part except those on the earning loop (“or an earning loop carries out a copy”, “or at the next start of an earning loop, never in an earning loop already running”, and the compliance example on the loop), which task 18 makes true.
- decision, change — D-136: adds “and every switch of the character to another program” to what sets the streak to zero.
- invariant, change — `streak-program-change`: covers the copy, and adds that every switch of the character to another program during the map run sets the streak to zero, even when the new program has the same rules; its test drives a switch.
- decision, change — D-131: “Of the edits of the program” becomes the edits of the copy the map run carries out, with the discard among them; an edit of a saved program leaves the streak (task 7's row 6, carried over to the copy by To do 7).
- decision, change — D-44: „Porzuć zmiany” and „Przełącz postać na ten program” join „Zakończ”, „Usuń” and „Restart” as destructive buttons, and the rationale extends to a button that sets progress on a map to zero or drops the copy's unsaved changes; the same change edits the styleguide's list (`guidelines/styleguide-browser-view.md:196`–`:197`).
- decision, change — D-93: rows 10 and 12, and decision 6 of this spec. The counts stand beside the copy's rules during a map run and nowhere else. After „Zakończ” they stand beside its program's rules, „0×” where content differs, and beside no other program. A switch starts them from zero.
- decision, change — D-123: row 11.
- part map, change, written through `the-way-update-part-map`. The part `simulation` gains, by name in its *Files*, as the map lists each other invariant's check, the test files of the two new invariants of rows 9 and 15. Each is `tests/invariants/test_<id>.py`, with the identifier the invariant takes when it is recorded. Every other new file under `tests/invariants/` that the change adds, such as a helper that is not a test, is named in the same change in the part whose checks use it. New modules and tests under `src/browser/sim/**`, `src/browser/view/**`, `tests/sim/**` and `tests/view/**` are claimed by the existing globs.

Entries this task does not change, checked against it: D-20 (a switch is a change of the program and leaves the action in progress), D-91 (stays true of the new game's one program), D-53, D-55, D-62, D-132. The `program` glossary term also stays.

## Left to the maker

- The names of the new functions, types and modules, and whether the player's programs live in a module of their own or in `game.ts`. The units above are the boundary.
- Whether `setProgram` keeps its name as the edit of the copy. Whether the simulation's step scripts in `tests/invariants` are migrated by a compatibility wrapper or rewritten. Changed tests name the task's To do as their reason (`guidelines/testing.md`, Changing an existing test).
- The representation of "none" for a deleted copy's program and of the counts' program; the exact placement and classes of the panel's controls within the styleguide.
- Whether the panel's select list shows the text „Program:” as a visible label beside it or only as its accessible name. The task's notation „Program: {name}” is met either way, provided the chosen program's name is what the list shows.
- How the name field leaves the panel without saving (showing another program, or the same action again). No cancel button is added.
- The tests: simulation tests for each operation of decision 5, the comparisons of decision 3, the row's program of decision 4 and the counts of decision 6; tests for the two new invariants and the switch in `streak-program-change`; view tests for the panel's states on the hand-made document model; and a manual check of the changed player journeys in a real browser (D-75, D-88).
