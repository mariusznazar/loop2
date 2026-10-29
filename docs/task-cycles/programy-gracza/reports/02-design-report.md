# Spec designer report — programy-gracza

Status: done. The spec is at `.runs/task-cycles/programy-gracza/spec.md`.

The record of the round:

- Batch 1 (Q-D1–Q-D5, below) went to the orchestrator, which answered in `reports/03-design-answers.md`:
  - Q-D1: way A, from the approved definition;
  - Q-D2–Q-D5: the recommendations given here, taken as the orchestrator's autonomous choices, not as the human's approval;
  - its notes: name D-131's change among the foundation entries, and write the decision on program numbers with its *Rejected*. The spec does both.
- No answer opened a new question.

The spec follows *Design settled so far* below, with the answers applied.

Worktree `C:/Storage/repos/loop2-wt/programy-gracza`, branch `task/programy-gracza`, HEAD `4bfb962` (equal to the handoff's base `4bfb9623…`). Pinned process read from `.the-way/task-cycle/spec/SKILL.md` and `.the-way/task-cycle/spec/design.md`.

## Questions, batch 1

### Q-D1. What does „Niezapisane zmiany w kopii.” measure against, and what does „Porzuć zmiany” restore?

The task, To do 8: „Gdy kopia różni się od programu, z którego ją wzięto, pod nagłówkiem stoi … linia „Niezapisane zmiany w kopii.” … Porzucenie przywraca kopii treść programu”. To do 9 lets the player edit that same program during the map run. So the program can change while the copy does not, and the sentence can be read two ways:

- **A (recommended): against the program as the copy was taken from it or last saved into it.** The copy remembers that content (its *base*). A copy is unsaved when it differs from its base, and „Porzuć zmiany” gives it the base back. If the player edits only the saved program, the copy has no unsaved changes, its save buttons are inactive, and the line of Q14 („Program {nazwa} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.”) still shows, because the program differs from the base (To do 9 states that line without any condition on unsaved changes).
- **B: against the program as it stands now.** Editing only the saved program lights „Niezapisane zmiany w kopii.” although the player never touched the copy, and „Porzuć zmiany” pulls the program's new content into the running copy and sets the streak to zero.

Why A: the approved definition, „(new) — Who owns a program?”, lines 1007–1012: “A change made during a map run goes into the copy and reaches the program only when the player saves it … or is dropped when the player discards it …”, and a program's “saved change takes effect at the next manual map entry other than a map run restart, at the next switch to it during a manual map run or at the next start of an earning loop”. Discarding is not on that list, so under B a saved change would reach a running map run in a way the definition does not allow. A also keeps D-123's write simple: the game writes the rule into the copy, the program and the base, so the write is neither an unsaved change nor a change the save announces (To do 11), with no extra rule.

Cost of a wrong answer: under A wrongly chosen, the player cannot use „Porzuć zmiany” to load a program edited during the map run into the copy (they can still switch to it, To do 12). Under B wrongly chosen, the panel says the copy has unsaved changes when it has none, and a discard changes the program the map run carries out from a saved edit, against the definition. The choice is cheap to turn back before the code; after it, the comparison and the discard rules change in one module.

### Q-D2. Which texts does the panel use where the task names no text?

To do 4 asks for „komunikat pod polem nazwy w roli `warning`” and gives no wording. To do 3 names „Zmień nazwę” and does not say what it shows. Recommended, modelled on what the game already says (`src/browser/view/headquarters.ts:17` „Wpisz imię postaci.”) and on To do 8 („Zapisz jako nowy program” shows the name field and „Zapisz”):

- an empty name, also after trimming: „Wpisz nazwę programu.”;
- a name another program already has, in any letter case: „Program o tej nazwie już istnieje.”;
- „Zmień nazwę” shows the same name field as „Zapisz jako nowy program”, filled with the current name, and the button „Zapisz”; the field is named „Nazwa programu” for assistive technology.

Cost of a wrong answer: wording only, changed in one module and its tests; nothing saved depends on it. If no text is picked, the maker invents it, and an invented text in the pull request looks like a decision nobody made.

### Q-D3. What does the panel show for a copy whose program the player deleted?

To do 3 says that after the deletion „znikają … „Zapisz w programie” i „Porzuć zmiany”, a „Zapisz jako nowy program” zostaje”. Two things stay open:

- the heading „Kopia: {nazwa programu}” — recommended: the name the program had when it was deleted;
- whether the copy then counts as unsaved — recommended: yes. „Niezapisane zmiany w kopii.” shows and „Zapisz jako nowy program” is active even if the player never edited the copy, because no program on the list holds what the copy holds, and „Zakończ” would lose it. Under the plain rule of To do 8 (active only when the copy differs from its program), a player who deletes the program by mistake could not get it back from the running copy.

Cost of a wrong answer: one condition and one heading in the panel; nothing saved depends on it.

### Q-D4. Which program is "the one used last" in the defaults of the headquarters row?

To do 5 uses two phrases: a character that has not gone out yet gets „program, z którym ostatnio weszła na mapę którakolwiek postać”, and when the default program has left the list, „domyślny staje się program używany ostatnio”. Recommended reading, one fixed order the game reads for each character row, taking the first program still on the list:

1. the program picked on that row and not yet sent with;
2. the program that character used last — set when it is sent, when it is switched to another program (Q13), and by „Zapisz jako nowy program” (To do 8);
3. the program with which any character last entered a map — set only when a character is sent, as Q4 literally says („weszła na mapę”);
4. the first program of the list.

The other reading would also set step 3 at a switch and at a save as a new program. Cost of a wrong answer: a different program preselected on a headquarters row after a switch, until the player picks another; nothing is lost and it is one line of the resolving function to change.

### Q-D5. Beside which program's rules do the firing counts stand?

D-93 says “During a map run every program rule shows how many times it fired in that map run”. With several programs, read literally, that would give counts to the rules of every saved program, though only the copy fires. Recommended:

- during a map run, its ended screens included, counts stand beside the rules of the copy only. A saved program opened for editing during the map run shows no counts;
- after „Zakończ”, they stand beside the rules of the program the copy came from (To do 10), with „0×” where that program's rule has other content than the copy's rule of the same identity, and no counts beside any other program;
- after „Zakończ” of a copy whose program was deleted, no program has counts, and the panel shows the first program of the list;
- deleting the program the counts stand beside clears them, as before the game's first map run.

This widens the change of D-93 that the task already names (rows 10 and 12), so D-93 says which program's rules show counts. Cost of a wrong answer: counts of one program shown beside another's rules. Rule identities are given per program, starting from 1, so two programs share identities and the numbers would be false. Changing this later touches only what the panel shows.

## Design settled so far (pending the answers)

I will write this into the spec once the batch is answered. The task's three carried questions are answered as follows.

1. **Telling programs apart — foundation decision (choice 1).** Each program of the player carries a number the game gives it when it is created, one more than the number it gave last, held in the game state as the next number, as D-56 does for characters. A number is never given again, also after a deletion. The pointers the game keeps — the copy's program, each character's program used last, the program picked on a row, the program the counts stand beside after „Zakończ” — name a program by that number. So a rename changes nothing they point at, and a deleted program's number never comes to mean another program. Rejected: the name (renaming would cut every pointer, and names are compared regardless of letter case); the place on the list (a deletion shifts it); a random identifier (the simulation draws randomness only from a map run's generators, D-22, and D-56 rejects it for the same reason). This serves task 16 (the saved state keeps the numbers and the next number) and task 18 (an earning loop names its source program by number).
2. **Where the copy stands (choice 2).** The copy belongs to the map run: the run holds the copied program, the number of its program (none once that program is deleted, together with the name it had) and its base. A restart builds the new run from the copy record of the run it replaces, as it is. „Zakończ” drops the run, and the copy and its unsaved changes go with it. Death and a completion leave the run, so the copy stays editable until „Restart” or „Zakończ”. A switch replaces the copy record with a fresh one of the other program. The run is the natural owner because each earning loop of task 18 will carry its own copy, as each map run does. Rejected: one copy in the game state beside the run (it would not extend to several earning loops); a copy on the character (the definition's *Verification* names “a program stored as a field of the character” as a violation). The program picked on a row and each character's program used last are game-state records keyed by the character's number, not fields of the character, set through functions of the simulation (D-04). The game-wide program entered with last is one game-state record.
3. **Counts (choice 3).** The counts are keyed by the rule identities of the copy, which it takes from its program. An edit of the copy reconciles them as `reconcileCounts` does today (a rule keeps its count while its condition and action stay). A save into the program and a save as a new program leave the copy, so they leave its counts. A discard is an edit of the copy back to its base, so a rule whose content goes back starts again from zero. A switch and a restart start every count from zero. The first-chill rule enters the copy with zero. „Zakończ” reconciles the counts against the program the copy came from (same identity and same content keeps the count, anything else „0×”) and records that program as their owner. Later edits of that program outside a map run reconcile them again (D-93), edits of other programs leave them, and the next send or restart replaces them.

Other points the spec settles as the task leaves them open, without asking:

- Programs stand on the list in the order they were created, and a rename keeps a program's place (as D-54 does for characters). A program saved as new joins the list at its end.
- The name suggested for „Nowy program” and „Zapisz jako nowy program” is „Program n” for the smallest n from 2 whose name no program has, letter case ignored. A name is stored trimmed. A program's own name, in another letter case, does not block its rename.
- „Usuń” is disabled while the list holds one program (a destructive button in `text-disabled`, D-44). While the panel shows the copy, „Zmień nazwę” and „Usuń” are hidden, since they act on saved programs, and „Nowy program” stays.
- The simulation refuses: a switch with no map run, with an ended map run, to a program not on the list, or to the program the copy belongs to (the button is absent there, Q17); a send without a program on the list. A saved program edited during a map run is checked against the resources of every map, as a program outside a map run is today, and the copy against its run's map. The editor's offers stay computed from the game state as today.
- The first-chill write (D-123) goes into the copy, its base and the program the copy came from, if that program is still on the list. As today, it does not set the streak to zero.
- A switch leaves the action in progress running (D-20), sets the streak and the beaten attacks to zero and sets the character's program used last. It is allowed in a pause, the pause at a discovery included.
- The units: a simulation module for the player's program list (create, rename, delete, edit a saved program, name rules, resolve a row's default, compare a copy with its base and its program). Functions in `game.ts` for what touches the run: send with a program, edit the copy, save into the program, save as new, discard, switch, the chill write, and end reconciling the counts. The browser view gets a program panel module that owns the select list „Program:”, the list actions, the copy's heading, the two warning lines, the save, discard and switch buttons and which program is shown. It hands the existing program editor the program to edit and its counts. On the headquarters row, a select list „Program:” goes beside „Mapa: …” and „Wyślij”.
- Foundation entries the cycle writes: the 16 rows of *Settlements to record*; the part of „(new) — Who owns a program?” this task makes true; the added clause of D-136 and of `streak-program-change` about a switch; the changes of D-44 (two destructive buttons and the wider rationale, with the styleguide's list), D-93 (rows 10, 12 and Q-D5) and D-123 (row 11); the glossary term of row 13; the decision of choice 1; and the change of **D-131**. The task does not name D-131, but it is task 7's row 6, which this task carries over to the copy (To do 7). Its text „Of the edits of the program” must say the copy, or it will contradict row 9 (an edit of a saved program leaves the streak).

## Ways weighed so far

- Choice 1: a counting number (chosen) / the name / the place on the list / a random identifier — reasons under point 1.
- Choice 2: the copy in the map run (chosen) / one copy in the game state / the copy on the character — reasons under point 2. "Changed since taken or last saved" is measured as content against the base (chosen) rather than by a version counter on each program. A program edited and then put back is then not reported as changed, which fits the line's purpose of warning about changes that would be lost, and it needs no counter that every edit and the chill write would have to keep.
- Choice 3: counts keyed by the copy's rule identities with an owner after „Zakończ” (chosen) / counts per program for every program (a second store with no use, since only the copy fires) / counts dropped at „Zakończ” (against To do 10 and D-93).
- The picked program on a row: in the game state through a simulation function (chosen) / held only in the headquarters module. A view-only value would be lost with every rebuild of the team's rows unless kept apart, would escape the simulation's tests, and would not be saved by task 16.

## Discrepancies between the task's citations (`6540e4c`) and the current code (`4bfb962`)

The current code governs. The cited places have moved:

- `src/browser/sim/types.ts:179` `program` → `:251`; `game.ts:372` `setProgram` → `:416`; `game.ts:301` `programOf` → `:327`; `game.ts:557` the chill write → `:632`; `understanding.ts:293` `withFirstChillRule` → `:314`;
- `src/browser/view/game-view.ts:40`, `:53` → the panel at `:40`–`:42`, the editor at `:56`; `headquarters.ts:140` → the row's map label and „Wyślij” at `:151`–`:166`;
- `guidelines/styleguide-browser-view.md:195`–`196` (the list of destructive buttons) → `:196`–`:197`;
- D-131 („Which edits of the program reset a map run's solving progress?”) is now in the foundation. It is task 7's row 6, which the task lists as not yet recorded.

## The four checks (on the written spec)

1. **Placeholder, `TBD` or empty section.** `grep -nE "TBD|TODO|\?\?\?|XXX" .runs/task-cycles/programy-gracza/spec.md` gave exit 1, no match. `grep -c "^## " …/spec.md` gave exit 0 and 6, the six sections of the form, each with content on reading. Nothing to fix.
2. **Contradictions.** Read for these pairs:
   - decision 2, "an edit of a saved program never changes a map run", against decision 5's save into the program and the chill write. Both change a program, not the run, so they agree;
   - decision 3's "unsaved when the program is gone" against decision 5's refusals. Save as new stays allowed, while save into the program and discard are refused when the program is gone, which agrees with To do 3;
   - decision 6's counts during a run against decision 5's edit of a saved program. That edit reconciles only the counts that stand beside a program after „Zakończ”, so it never touches a running map run's counts;
   - decision 7's "shown at „Zakończ”" against decision 6's "cleared when the program is gone".

   None contradicts another, the task or the foundation. D-131's wording on "the program" would contradict row 9 until it is changed, and that change is listed among the foundation entries.
3. **Several independent changes.** No. The program list, the copy and the panel depend on one another: the copy needs program numbers, the panel and the row need both. The change is large, so the plan may want slices, for example the simulation's list and copy first, then the panel and the headquarters row. That is a sequencing matter, not independent changes.
4. **A requirement read two ways.** Picked and written down:
   - unsaved changes measured against the base (Q-D1);
   - the row's program order (Q-D4);
   - "changed since" as a comparison of content with the base, not a version counter (decision 3);
   - what the panel shows after each act (decision 7);
   - the select list's „Program: {name}” met by the chosen name with a label or an accessible name (left to the maker, with the condition stated).

## Reaches beyond the dispatch

- `.the-way/task-cycle/spec/design.md`, the designer's method, which the skill names for this step.
- `src/browser/view/clock.ts` (how `send` reaches the simulation), `src/browser/view/controls/select-list.ts` whole, and `button.ts` / `text-field.ts` by their exports: the controls the panel and the row will build on.
- `tests/sim/program-fixture.mjs`, and a search of `tests/sim`, `tests/view` and `tests/invariants` for `setProgram`, `.program` and `ruleCounts`, to size the change of the simulation's interface: about forty test files drive `setProgram` or read `state.program`, the Python invariant checks among them, through step scripts.
- The opening docstring of `tests/invariants/test_streak_program_change.py`: it notes that the first-chill write does not go through `setProgram` and is not driven there.
- The approved definition `definicja_mvp_loop2.md`, lines 995–1045 („(new) — Who owns a program?” whole), for Q-D1; and `plan_mvp_loop2.md`, rows 13, 16 and 18, to design for the later tasks.
- From `foundations/decisions.md`: D-131 whole (found as a decision on the streak with the program, not in the dispatch's list).

## Checks run

- `git log --oneline -3` and `git status --short` in the worktree: exit 0, HEAD `4bfb962`, clean tree (`.runs/` is ignored); the same `git status --short` after writing the spec: exit 0, clean.
- `grep -nE "TBD|TODO|\?\?\?|XXX" spec.md`: exit 1 (no match, the expected result); `grep -c "^## " spec.md`: exit 0, 6.
- Not run: `npm test`, `python -B .the-way/elements/common/foundation_check.py`, and every other gate check. The handoff excludes them at the designer stage, and no file of the product changed.

## Revision 1

Revised once, for the review `reports/05-spec-review.md` (FAIL), as the handoff `reports/06-spec-revision-handoff.md` asks. Nothing else in the spec changed.

- **F1 (accepted).** The part map is now among the *Foundation entries*, as a change written through `the-way-update-part-map`:
  - the part `simulation` gains, by name, the test files `tests/invariants/test_<id>.py` of the two new invariants (rows 9 and 15). The identifier is the one each invariant takes when it is recorded, so the spec cannot name it yet;
  - any other new file under `tests/invariants/`, such as a helper that is not a test, is named in the part whose checks use it;
  - new files under `src/browser/sim/**`, `src/browser/view/**`, `tests/sim/**` and `tests/view/**` stay claimed by the existing globs.

  The part map is dropped from "Entries this task does not change".
- **F2 (the orchestrator's autonomous choice).** Decision 7 states the reading: „Zapisz jako nowy program” shows the name field already holding the first free name („Program n”) as its value, which the player may keep or change, and „Zapisz”. It names the other reading, the name only as the empty field's hint (`placeholder`, styleguide `:174`–`:175`), and why it is not taken: To do 4 refuses an empty name, so a hint-only suggestion could not be saved without retyping. The field may still carry the hint „Nazwa programu”. Cost if wrong: one control's initial value. This is also added to check 4, the requirements read two ways.
- **Observation 1.** Decision 3 now says that "changed since" compares programs as `setProgram` does today, identity counters included, so a rule added and then deleted still counts as a change, consistent with D-131.
- **Observation 2.** Decision 1 now says that the name a copy keeps after its program is deleted is shown only in its heading, and is no pointer.

The four checks again, on the revised spec:

1. `grep -nE "TBD|TODO|\?\?\?|XXX" spec.md`: exit 1, no match. `grep -c "^## " spec.md`: exit 0, 6. The pattern `test_<id>.py` stands for a file name the foundation step fixes, not for missing content.
2. Re-read for contradictions: the new part-map entry agrees with the two invariants and with *Left to the maker*, and the value reading of F2 agrees with To do 4 and with decision 2's suggested name. None found.
3. Still one change, not several independent ones.
4. The F2 reading is added to the readings written down.

Checks run for the revision: the two greps above; `git status --short`: exit 0, clean. Not run: `npm test` and `python -B .the-way/elements/common/foundation_check.py`, which the handoff excludes at this stage. No product file changed.
