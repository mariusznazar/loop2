# Return step report — programy-gracza

**Status:** done

Stage: the return step of a planned change, a fresh agent (`return_step.md`, `foundation_step.md`,
`task-cycle/change/SKILL.md`; element skill `the-way-record-decision` for the two corrected entries).
Worktree `C:/Storage/repos/loop2-wt/programy-gracza`, branch `task/programy-gracza`, head at start
`03915185`, task base `4bfb962`. Pinned process `3aee7d958835cc19b95519f4d21b37538b78e3e1`, gitlink
and checkout equal. Trust boundary: no; irreversible operation: no.

## Commits and files

- `ee9ea92` docs: :memo: record the copy of a deleted program as holding unsaved changes
  - `foundations/decisions.md` +6 −6 (D-156, D-159)
- `b00517a` docs: :memo: point the program-name comment at D-157 and list D-44's five destructive buttons in the stylesheet
  - `src/browser/sim/programs.ts` +1 −1 (comment only)
  - `src/browser/styles.css` +2 −1 (comment only)

## The foundation compared with the code

Compared: every entry the change writes or changes (D-44, D-93, D-123, D-131, D-136, D-152–D-162;
`streak-program-change`, `saved-program-edit`, `copy-save`; glossary `copy`; part map `simulation`),
the entries the task's *Decisions in play* names, and the selection for the parts `simulation` and
`browser-view` (D-04, D-20, D-23, D-53, D-55, D-56, D-62, D-90–D-92, D-119, D-122, D-124, D-126,
D-127, D-132–D-135, D-143, D-149; invariants `map-run-repeatability`, `action-in-progress`,
`restart-seed`, `program-rule-pick`, `program-closed-lists`, `program-world-reference`,
`simulation-inputs`, `simulation-isolation`; the glossary whole; the part map entries `simulation`
and `browser-view`) against `src/browser/sim/{types,game,programs}.ts`,
`src/browser/view/{program-panel,program-editor,game-view,headquarters,clock}.ts` and the tests.

What no longer matched, and its correction:

1. **D-159 against the code for a copy whose program was deleted.** D-159 said the line
   „Niezapisane zmiany w kopii.” stands and the buttons are active *while the copy differs from its
   program as the copy was taken from it or last saved into it*, and are gone/inactive while it is
   the same. The code (`copyHasUnsavedChanges`, `src/browser/sim/programs.ts:536-543`;
   `program-panel.ts` `render`) counts a copy whose program is gone as unsaved whatever its content:
   the line stands and „Zapisz jako nowy program” is active even for a copy with no edit of its own
   (the orchestrator's autonomous choice Q-D3 / C5). Read literally, D-159 called for the line gone
   and the button inactive there. Correction (`ee9ea92`): D-159 now covers the copy while its program
   is on the player's list and sends the deleted case to D-156; D-156 now states that the copy's
   heading keeps the name the program had, and that the copy counts as holding unsaved changes —
   the line stands and „Zapisz jako nowy program” is active until the copy is saved as a new
   program — with a compliance and a violation example, a rationale sentence and one *Rejected*
   option (the copy measured against the deleted program's content). D-153's rationale already said
   the heading keeps the name; it stays consistent. No invariant derives from D-156; `copy-save`
   derives from D-159 and is untouched in meaning.
2. **A code comment cited the wrong decision.** `src/browser/sim/programs.ts:333` cited D-156 (a
   deletion) for the naming rule of D-157. Corrected to D-157 (`b00517a`).
3. **A code comment listed D-44's old three destructive buttons.** `src/browser/styles.css:105` read
   „Zakończ”, „Usuń”, „Restart” (D-44), while D-44 and the styleguide now name five. Corrected to the
   five (`b00517a`). The foundation agent's report 11 had named it.

Everything else matched; points judged:

- D-152: the copy taken at a send (`send`), carried on by „Restart” as it is (`restart` passes
  `run.copy`), a fresh copy at a switch (`switchProgram`), saves announced and never blocked
  (`saveCopyIntoProgram` has no refusal for changes the copy lacks), saved edits leaving the copy
  (`editProgram`). Earning-loop parts absent from code and entry, as assigned to task 18.
- D-153: every record naming a program (`pickedPrograms`, `lastUsedPrograms`, `lastEnteredProgram`,
  `copy.programId`, `countsProgram`) names it by number; `nextProgramId` only grows.
- D-93: `end` reconciles the counts against the copy's program and records `countsProgram`, clears
  them when that program is gone; a saved program shown during a map run gets no counts
  (`shownContent`); `switchProgram` and `startRun` start every count from zero.
- D-123: the first-chill rule goes into the copy, its base and the copy's program while it is on
  the list (`advanceMinutes`), so neither measure turns true.
- D-131, D-136, `streak-program-change`: `withCopyProgram` zeroes the streak and the beaten attacks
  of a map run not ended where the copy changes (the discard included); `switchProgram` zeroes both
  always; saves and `editProgram` leave them.
- D-154–D-158, D-160–D-162 against `program-panel.ts` and `headquarters.ts`: the list with „Kopia
  w przejściu” first, the actions and the last program kept, the name rule and suggestion, the
  row's list and its fallback order, the line of a changed program and its one-click save, the
  copy editable after a death and a completion, the switch button only in a map run not ended and
  not beside the copy's program.
- D-20 / `action-in-progress`: a switch leaves `run.current`.
- D-44: `createButton(..., { kind: "destructive" })` for „Usuń”, „Porzuć zmiany” and „Przełącz
  postać na ten program”.
- Code placement (C14): no foundation entry or part-map line names `game.ts` as the place of the
  copy's operations; `programs.ts` and `program-panel.ts` fall under the globs `src/browser/sim/**`
  and `src/browser/view/**`. The only foundation mention of `game.ts` is D-35 (the exemplar of
  `simulation-module`), which this does not touch.
- Part map: the two new check files stand in `simulation`; `tests/invariants/program_fixture.py`
  was already there. No file of the range is unclaimed (foundation check 0 errors).
- Glossary: `copy` matches its uses in the entries and code. The other uses of "copy" in tracked
  files (deploy notes, build tests, "its own copy of the traits") carry the everyday meaning a
  reader tells apart, so WAY-99 asks for no renaming and *Not* stays `none`. "base" in the code
  (`ProgramCopy.base`) carries the usual meaning of the version changes are measured against and
  stands in no entry; no entry.
- Environment facts: the change rests on no new source outside the product. The C15 fix rests on
  the browser firing `change` when a changed text field loses focus, which the editor's commits
  already rested on before this task, and on a Chromium probe of the slice (report 23), not a
  published source; no entry rests on it. None written.

## Autonomous choices judged under WAY-36

| Choice | Binds after the merge? | Held by | Result |
|---|---|---|---|
| C3 / Q-D1 — the copy measured against its base | yes | D-159 ("as the copy was taken from it or last saved into it"), D-160 (same measure), D-152 (a saved change reaches a map run only at an entry or a switch, so a discard gives the base back) | no new entry |
| C5 / Q-D3 — a copy of a deleted program counts as unsaved, heading keeps the name | yes | was not held, and D-159 read literally contradicted it | written into D-156, D-159 scoped (`ee9ea92`) |
| C6 / Q-D4 — the order of a row's default | yes | D-158 | no new entry |
| C7 / Q-D5 — beside which program's rules counts stand | yes | D-93 (copy's rules during a map run and its ended screens; after „Zakończ” the copy's program, „0×” where content differs, no other program) | no new entry. The panel showing the first program after „Zakończ” when the copy's program is gone is view navigation with no rule beyond D-161's case, and stays a row of the questions table |
| C8 — the suggested name is the field's value | no rule beyond D-159's "offers the first free name" | D-159 | row of the questions table |
| C9 — `setProgram` outside a map run edits the row default program | no: a function's behaviour used by tests, no product rule | — | row of the questions table (review Minor 2 goes to the request) |
| C15 — the panel blurs the editor's focused field before switching | no: a fix keeping typed text in the program it was typed into, no choice between product behaviours | — | row of the questions table |

## Entries written or changed by this request

Decisions changed: D-44, D-93, D-123, D-131, D-136 (foundation step); D-156 and D-159 (foundation
step, corrected in this step). Decisions new: D-152–D-162 (foundation step). Invariants: changed
`streak-program-change`; new `saved-program-edit`, `copy-save`. Glossary: new `copy`. Part map:
`simulation` gains `tests/invariants/test_saved_program_edit.py` and `tests/invariants/test_copy_save.py`
(`bf7e827`, `4321b2c`). Environment facts: none.

Projected entries:

- „(new) — Who owns a program?” — written in part as D-152: all but the earning-loop clauses and
  the earning-loop example of compliance, which task 18 makes true.
- „(new) — How is a map solved, and what opens the next one?” (D-136, written by task 8) — in part:
  the clause "and every switch of the character to another program" and its violation example.
- `streak-program-change/1` (written by task 7) — in part: the copy and "every switch of the
  character to another program during the map run, to one holding the same rules included".
- The glossary term `program` stays as written by task 1; its trip plan comes with task 13.

## *Settlements to record* — rows and their entries

| Row | Carried by |
|---|---|
| 1 | D-154 |
| 2 | D-155 |
| 3 | D-156 |
| 4 | D-157 |
| 5 | D-158 |
| 6 | D-159 |
| 7 | D-44 |
| 8 | D-160 |
| 9 | `saved-program-edit` |
| 10 | D-161 · D-93 |
| 11 | D-123 |
| 12 | D-93 · D-131 |
| 13 | glossary `copy` |
| 14 | D-162 |
| 15 | `copy-save` |
| 16 | D-44 (and the styleguide's list of destructive buttons) |

No row's settlement was found already stated in an earlier entry; no row is tied to an existing
entry in place of a new one.

## Meaning of each entry (pl)

| Entry | Znaczenie |
|---|---|
| D-44 (change) | „Porzuć zmiany” i „Przełącz postać na ten program” dołączają do przycisków niszczących obok „Zakończ”, „Usuń” i „Restart”, a uzasadnienie obejmuje przycisk, który zeruje postęp na mapie albo kasuje niezapisane zmiany kopii. |
| D-93 (change) | Liczniki stoją w trakcie przejścia przy regułach kopii, a nie przy zapisanym programie otwartym w panelu; zaczynają od zera także przy przełączeniu postaci; po śmierci i domknięciu stoją przy kopii, a po „Zakończ” przy regułach programu kopii („0×” przy regule o innej treści) i przy żadnym innym programie. |
| D-123 (change) | Regułę wpisywaną przy odkryciu (dziś „Zawsze → Eksploruj” przy pierwszym wychłodzeniu) gra wpisuje do pierwszej grupy kopii i programu, do którego kopia należy; inne programy zostają, a wpis nie jest ani niezapisaną zmianą kopii, ani zmianą programu ogłaszaną przy zapisie. |
| D-131 (change) | Passę i liczbę pokonanych napaści zeruje edycja kopii, po której kopia się różni (także „Porzuć zmiany”), oraz każde przełączenie postaci na inny program, także o tych samych regułach; zapis kopii i edycja zapisanego programu je zostawiają. |
| D-136 (change) | Passę zeruje na każdej mapie także każde przełączenie postaci na inny program. |
| D-152 | Programy należą do gracza jako jedna lista wspólna dla wszystkich postaci; postać wybiera program przy wejściu na mapę (domyślnie ostatnio używany), ręczne przejście wykonuje kopię wziętą na starcie, „Restart” jedzie dalej na kopii z jej niezapisanymi zmianami, gracz może w trakcie ręcznego przejścia przełączyć postać na świeżą kopię innego programu, zmiana kopii trafia do programu tylko zapisem, a zapisana zmiana programu działa od następnego wejścia na mapę innego niż restart albo od przełączenia na ten program. |
| D-153 | Każdy program dostaje przy założeniu numer o jeden większy od ostatnio nadanego, a wszystko, co w stanie gry wskazuje program, wskazuje go tym numerem. |
| D-154 | U góry panelu programu stoi lista „Program: {nazwa}” ze wszystkimi programami gracza, edytor pod nią pokazuje wybrany program, a w trakcie przejścia na górze listy stoi „Kopia w przejściu”, pod nią zapisane programy. |
| D-155 | Lista programów daje „Nowy program”, „Zmień nazwę” i „Usuń”; nowy program ma pustą grupę „Program” z warunkiem „Zawsze”; program, który został na liście sam, zostaje; duplikatu programu gra dziś nie ma. |
| D-156 (corrected in this step) | Usunięcie programu, do którego należy kopia przejścia, zostawia przejście na kopii, której nagłówek zachowuje dawną nazwę programu; znikają „Zapisz w programie” i „Porzuć zmiany”, a kopia liczy się odtąd jako mająca niezapisane zmiany — stoi linia „Niezapisane zmiany w kopii.”, a „Zapisz jako nowy program” jest czynny, aż kopia zostanie zapisana jako nowy program. |
| D-157 | Program nowej gry to „Program”, nowe programy „Program 2”, „Program 3” pierwszym wolnym numerem; nazwa jest niepusta po obcięciu spacji na brzegach, nazwy innego programu (bez względu na wielkość liter) gra nie przyjmuje, a długości nazwy dziś nie ogranicza. |
| D-158 | Program postaci gracz wybiera z listy „Program: {nazwa}” w jej wierszu siedziby, jednej na wiersz; lista pokazuje pierwszy istniejący z: wyboru na wierszu sprzed wysłania, programu ostatnio używanego przez postać (także po przełączeniu), programu ostatniego wejścia na mapę którejkolwiek postaci, pierwszego programu listy. |
| D-159 (corrected in this step) | W trakcie przejścia panel pokazuje kopię pod nagłówkiem „Kopia: {nazwa programu}”; gdy program kopii jest na liście, a kopia różni się od niego (takiego, jaki był przy wzięciu kopii albo ostatnim zapisie), stoi linia „Niezapisane zmiany w kopii.” w `warning` i czynne są trzy przyciski, a gdy jest taka sama — linii nie ma i przyciski są nieaktywne; kopię usuniętego programu opisuje D-156; „Zapisz jako nowy program” podpowiada pierwszą wolną nazwę, a po nim kopia należy do nowego programu, który staje się ostatnio używanym przez postać. |
| D-160 | Gdy program kopii ma zmiany od wzięcia kopii albo ostatniego zapisu kopii w nim, przy przyciskach zapisu stoi w `warning` linia „Program {nazwa} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.”, a „Zapisz w programie” zapisuje od razu, jednym kliknięciem, i linia znika. |
| D-161 | Na ekranie po śmierci i po domknięciu edycja kopii i trzy przyciski działają jak w przejściu, aż do „Restart” albo „Zakończ”; „Zakończ” kończy przejście od razu, niezapisane zmiany przepadają, a panel pokazuje potem program, do którego należy kopia. |
| D-162 | W trakcie przejścia wybór zapisanego programu z listy panelu otwiera go do edycji; gdy panel pokazuje zapisany program inny niż program kopii, pod listą stoi „Przełącz postać na ten program”, którego kliknięcie od razu przełącza postać, a panel wraca do „Kopia w przejściu”; przy programie kopii przycisku nie ma. |
| `streak-program-change` (change) | Zmiana reguł albo grup reguł kopii wykonywanej w przejściu i każde przełączenie postaci na inny program, także o tych samych regułach, zerują passę tego przejścia na każdej mapie. |
| `saved-program-edit` (new) | Edycja zapisanego programu w trakcie przejścia zostawia kopię, passę przejścia i liczniki zadziałań reguł kopii takimi, jakie były. |
| `copy-save` (new) | „Zapisz w programie” i „Zapisz jako nowy program” zostawiają treść kopii i passę przejścia, a „Zapisz jako nowy program” nie jest przełączeniem postaci na inny program. |
| glossary `copy` (new) | Kopia to program, który przejście wykonuje, wzięty z jednego z programów gracza na starcie przejścia, przy przełączeniu postaci albo na starcie pętli zarobkowej; jej zmiany trafiają do programu przez zapis gracza, a „Restart” jedzie dalej na niej. |
| part map `simulation` (change) | Część `simulation` obejmuje odtąd po nazwie pliki sprawdzeń dwóch nowych niezmienników: `tests/invariants/test_saved_program_edit.py` i `tests/invariants/test_copy_save.py`. |

## Checks

| Command (from the worktree root) | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after the D-156/D-159 edit, before the commit) | 0 — `0 errors` |
| `git diff -U0 -- foundations \| grep "^+" \| grep -i -w -o -E "only\|never\|always\|without\|should\|will\|must"` (Q11 rule of wording and the template's forbidden words, on this step's additions) | 1 — no hit |
| `node_modules/.bin/prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/styles.css src/browser/sim/programs.ts` | 0 |
| `npm run typecheck` | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 (4 tests) |
| `npm test -- tests/quality/test_quality_invariants.py` (quality venv first on PATH; log `reports/43-quality.log`) | 0 (5 tests) |
| `python -B .the-way/elements/common/foundation_check.py` (after `b00517a`) | 0 — `0 errors` |

Not run: the gate `npm test` with no arguments — the orchestrator's, as the handoff gives. No Node
test was run: the code change is two comments, and no test reads them. No test was written: no
behaviour changed.

## Own-work check

- Requirement most likely missed: that every entry the change writes still says what the code does
  in the corner cases the cycle settled on its own (WAY-11), since the review compared the code with
  the task and the spec more than with the literal sentences of the new entries. Check: for each
  autonomous choice C3–C15, I read the code path and the binding sentence of the entry that should
  hold it, and asked whether the sentence, read literally, is true on the head. Found: one false
  reading (D-159 for a copy whose program is gone), corrected; the others true.
- Second check: that the correction contradicts no other entry. Searched the foundation for D-156,
  D-159, "deleted", "gone", "heading": D-153's rationale (the heading keeps the name) agrees; D-161
  and `copy-save` are unaffected; tests citing D-156 (`tests/view/program-panel.test.mjs:459`, `:706`)
  test the behaviour the corrected D-156 now states.

## Reaches beyond the handoff

- `.the-way/foundations/decisions.md` WAY-11, WAY-36, WAY-99 and `.the-way/foundations/invariants.md`
  `return-step-record` — to read what the return step and the questions table carry.
- `.the-way/task-cycle/record_template.md:91-98` — the questions table and WAY-36.
- `.the-way/elements/glossary/skill/SKILL.md` and `template.md` — to judge "copy" and "base" without
  writing an entry.
- `foundations/environment_facts.md` headings and D-36 — to judge whether C15 rests on a fact.
- `reports/03-design-answers.md`, `reports/23-slice-06-report.md:131-150`,
  `reports/25-slice-07-report.md`, `reports/29-whole-review-handoff.md:35-38` — the wording of
  Q-D1–Q-D5 and C9–C15.
- `guidelines/coding.md`, `guidelines/coding-simulation-module.md`,
  `guidelines/styleguide-browser-view.md` — read before the two comment edits, as `AGENTS.md` asks.

## Choices (each with the way rejected and its cost if wrong)

1. **Q-D3 written into D-156, with D-159 scoped to a copy whose program is on the list.** Rejected:
   a clause in D-159 alone ("or its program is gone") — D-159 would then call all three buttons
   active where two are gone; a new decision — the deleted case is D-156's question. Cost if wrong:
   sentences move between the two entries; the meaning stays.
2. **The two comment fixes made here rather than left to the request.** They are code saying
   something about the foundation that is false (WAY-11, "corrects whatever no longer matches").
   Rejected: a note for the request. Cost if wrong: none to behaviour; two comment lines.
3. **The panel's fallback to the first program after „Zakończ” of a deleted copy's program left out
   of D-161** (part of C7 / Q-D5). D-161 is silent there rather than false, and the fallback is view
   navigation with nothing later work keeps. Rejected: a clause in D-161. Cost if wrong: one clause
   added later.

## Problems and observations

- The whole-change review's Minor 1–4 (`reports/30-whole-review.md`) are review findings for the
  request; none showed an entry out of step with the code beyond the D-159 point above.
- No question for the human or the orchestrator arose.
