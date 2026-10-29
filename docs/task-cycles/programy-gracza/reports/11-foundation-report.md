# Foundation entries report — programy-gracza

**Status:** done with concerns

Stage: the agent of the plan's *Foundation entries* (F1–F24; F25 left to Slices 4 and 5 as the plan
gives). Worktree `C:/Storage/repos/loop2-wt/programy-gracza`, branch `task/programy-gracza`, base
`4bfb962`. Pinned process `3aee7d958835cc19b95519f4d21b37538b78e3e1`, gitlink and checkout equal.
Trust boundary: no; irreversible operation: no.

## Commits and files

- `7ed5cc0` docs: :memo: record the foundation entries of the player-programs task
  - `foundations/decisions.md` +241 −45
  - `foundations/invariants.md` +21 −1
  - `foundations/glossary.md` +6 −0

One commit: the entries are one coherent set, and each change of D-44, D-93, D-123, D-131 and
D-136 names the new decisions or invariants of the same set, so a split would leave a commit naming
an entry it does not hold.

## Entries (line ranges after `7ed5cc0`)

| Entry | Lines | Plan item · rows | Znaczenie (pl) |
|---|---|---|---|
| D-152 — Who owns a program? | `foundations/decisions.md:2741-2755` | F18 · — (projected entry, the part this task makes true) | Programy należą do gracza jako jedna lista wspólna dla wszystkich postaci; postać wybiera program przy wejściu na mapę (domyślnie ostatnio używany), ręczne przejście wykonuje kopię wziętą na starcie, „Restart” jedzie dalej na kopii z jej niezapisanymi zmianami, gracz może w trakcie ręcznego przejścia przełączyć postać na świeżą kopię innego programu, zmiana kopii trafia do programu tylko zapisem, a zapisana zmiana programu działa od następnego wejścia na mapę innego niż restart albo od przełączenia na ten program. |
| D-153 — How does the game state tell one program from another? | `:2756-2770` | F17 · — (spec decision 1) | Każdy program dostaje przy założeniu numer o jeden większy od ostatnio nadanego, a wszystko, co w stanie gry wskazuje program — program kopii, program używany ostatnio przez postać, wybór w wierszu siedziby, program ostatniego wejścia na mapę i program, przy którym stoją liczniki po „Zakończ” — wskazuje go tym numerem. |
| D-154 — Where does the player see the player's programs and pick the one to edit? | `:2771-2785` | F1 · row 1 | U góry panelu programu stoi lista „Program: {nazwa}” ze wszystkimi programami gracza, edytor pod nią pokazuje wybrany program, a w trakcie przejścia na górze listy stoi „Kopia w przejściu”, pod nią zapisane programy. |
| D-155 — What can the player do with the list of programs? | `:2786-2800` | F2 · row 2 | Lista programów daje „Nowy program”, „Zmień nazwę” i „Usuń”; nowy program ma pustą grupę „Program” z warunkiem „Zawsze”; program, który został na liście sam, zostaje; duplikatu programu gra dziś nie ma. |
| D-156 — What becomes of a map run whose copy's program the player deletes? | `:2801-2815` | F3 · row 3 | Usunięcie programu, do którego należy kopia przejścia, zostawia przejście na kopii; znikają „Zapisz w programie” i „Porzuć zmiany”, a „Zapisz jako nowy program” zostaje. |
| D-157 — How is a program named? | `:2816-2830` | F4 · row 4 | Program nowej gry to „Program”, nowe programy „Program 2”, „Program 3” pierwszym wolnym numerem; nazwa jest niepusta po obcięciu spacji na brzegach, nazwy innego programu (bez względu na wielkość liter) gra nie przyjmuje, a długości nazwy dziś nie ogranicza. |
| D-158 — Where does the player pick the program a character enters a map with, and which one stands there first? | `:2831-2845` | F5 · row 5 | Program postaci gracz wybiera z listy „Program: {nazwa}” w jej wierszu siedziby, jednej na wiersz; lista pokazuje pierwszy istniejący z: wyboru na wierszu sprzed wysłania, programu ostatnio używanego przez postać (także po przełączeniu), programu ostatniego wejścia na mapę którejkolwiek postaci, pierwszego programu listy. |
| D-159 — How does the program panel show the copy and its unsaved changes? | `:2846-2860` | F6 · row 6 | W trakcie przejścia panel pokazuje kopię pod nagłówkiem „Kopia: {nazwa programu}”; gdy kopia różni się od programu (takiego, jaki był przy wzięciu kopii albo ostatnim zapisie), stoi linia „Niezapisane zmiany w kopii.” w `warning` i czynne są trzy przyciski, a gdy jest taka sama — linii nie ma i przyciski są nieaktywne; „Zapisz jako nowy program” podpowiada pierwszą wolną nazwę, a po nim kopia należy do nowego programu, który staje się ostatnio używanym przez postać. |
| D-160 — How does the game announce a save of the copy over a program that changed? | `:2861-2875` | F8 · row 8 | Gdy program kopii ma zmiany od wzięcia kopii albo ostatniego zapisu kopii w nim, przy przyciskach zapisu stoi w `warning` linia „Program {nazwa} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.”, a „Zapisz w programie” zapisuje od razu, jednym kliknięciem, i linia znika. |
| D-161 — What can the player do with the copy after a map run ends? | `:2876-2890` | F10 (part) · row 10 | Na ekranie po śmierci i po domknięciu edycja kopii i trzy przyciski działają jak w przejściu, aż do „Restart” albo „Zakończ”; „Zakończ” kończy przejście od razu, niezapisane zmiany przepadają, a panel pokazuje potem program, do którego należy kopia. |
| D-162 — How does the player switch the character to another program during a map run? | `:2891-2904` | F14 · row 14 | W trakcie przejścia wybór zapisanego programu z listy panelu otwiera go do edycji; gdy panel pokazuje zapisany program inny niż program kopii, pod listą stoi „Przełącz postać na ten program”, którego kliknięcie od razu przełącza postać, a panel wraca do „Kopia w przejściu”; przy programie kopii przycisku nie ma. |
| D-44 (change) | `:868-882` | F22 · F7, F16 · rows 7, 16 | „Porzuć zmiany” i „Przełącz postać na ten program” dołączają do przycisków niszczących obok „Zakończ”, „Usuń” i „Restart”, a uzasadnienie obejmuje przycisk, który zeruje postęp na mapie albo kasuje niezapisane zmiany kopii. |
| D-93 (change) | `:1632-1679` | F23 · F10 (part), F12 (part) · rows 10, 12 | Liczniki stoją w trakcie przejścia przy regułach kopii, a nie przy zapisanym programie otwartym w panelu; zaczynają od zera także przy przełączeniu postaci; po śmierci i domknięciu stoją przy kopii, a po „Zakończ” przy regułach programu kopii („0×” przy regule o innej treści) i przy żadnym innym programie. |
| D-123 (change) | `:2160-2192` | F24 · F11 · row 11 | Regułę wpisywaną przy odkryciu (dziś „Zawsze → Eksploruj” przy pierwszym wychłodzeniu) gra wpisuje do pierwszej grupy kopii i programu, do którego kopia należy, inne programy zostają, a wpis nie jest ani niezapisaną zmianą kopii, ani zmianą programu ogłaszaną przy zapisie. |
| D-131 (change) | `:2360-2393` | F21 · F12 (part) · row 12; task To do 7, 8 | Passę i liczbę pokonanych napaści zeruje edycja kopii, po której kopia się różni (także „Porzuć zmiany”), oraz każde przełączenie postaci na inny program, także o tych samych regułach; zapis kopii i edycja zapisanego programu zostawiają je. |
| D-136 (change) | `:2479-2507` | F19 · — (projected entry, its added clause) | Passę zeruje na każdej mapie także każde przełączenie postaci na inny program. |
| `streak-program-change` (change) | `foundations/invariants.md:828-837` | F20 · — | Zmiana reguł albo grup reguł kopii wykonywanej w przejściu i każde przełączenie postaci na inny program, także o tych samych regułach, zerują passę tego przejścia na każdej mapie. |
| `saved-program-edit` (new) | `foundations/invariants.md:838-847` | F9 · row 9 | Edycja zapisanego programu w trakcie przejścia zostawia kopię, passę przejścia i liczniki zadziałań reguł kopii takimi, jakie były. |
| `copy-save` (new) | `foundations/invariants.md:848-857` | F15 · row 15 | „Zapisz w programie” i „Zapisz jako nowy program” zostawiają treść kopii i passę przejścia, a „Zapisz jako nowy program” nie jest przełączeniem postaci na inny program. |
| `copy` (glossary) | `foundations/glossary.md:175-179` | F13 · row 13 | Kopia to program, który przejście wykonuje, wzięty z jednego z programów gracza na starcie przejścia, przy przełączeniu postaci albo na starcie pętli zarobkowej; jej zmiany trafiają do programu przez zapis gracza, a „Restart” jedzie dalej na niej. |

Identifiers: the two new invariants keep the proposed `saved-program-edit` and `copy-save`, so the
check files of Slices 4 and 5 stay `tests/invariants/test_saved_program_edit.py` and
`tests/invariants/test_copy_save.py`.

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (base `4bfb962`, before any edit) | 0 — `0 errors` |
| `python -B .the-way/elements/common/foundation_check.py` (working tree, before the commit) | 0 — `0 errors` |
| `python -B .the-way/elements/common/foundation_check.py` (after `7ed5cc0`) | 0 — `0 errors` |
| `git diff -U0 -- foundations \| grep "^+" \| grep -i -w -E "only\|never\|always\|without\|should\|will\|must"` (Q11 rule of wording, and the template's forbidden words) | 0 — hits only in D-152, whose approved wording keeps „only”, „never” and „without” |

Not run: `npm test`, as the handoff gives; no test was written (no code in this stage).

## Own-work check

- Requirement most likely missed: each row of *Settlements to record* written whole, with the row's
  meaning (foundation step, WAY-134). Check: I read each row clause by clause against the entry
  that carries it. Found: every clause lands. The rows split over two entries are 10 (D-161 and
  D-93) and 12 (D-93 and D-131); rows 7 and 16 sit in D-44, row 11 in D-123. The one
  clause I worded more narrowly than the literal row is in rows 6 and 10, described under
  *Choices* 3.
- Second check: whether `foundation_check.py` reports a test-method invariant with no citing test.
  It does not (exit 0 with `saved-program-edit` and `copy-save` at `Method: test` and no test yet),
  so nothing in the foundation step fails before Slices 4 and 5.

## Reaches beyond the handoff

- `foundations/decisions.md` D-141 and D-71 (found by a search for D-131 and D-136 references) —
  to check for a collision; none: D-141 resets „as D-131 gives”, D-71 lets the streak „follow D-136”.
- the-way's `foundations/glossary.md` headings — for the "Two glossaries" rule; no the-way term
  collides with `copy`, and the new entries avoid bare `step`, `part` and `check` in a domain sense.
- `git grep -i -w` on every form of „copy” over tracked files — the glossary skill's list of uses.
- The vault task document `programy_gracza_loop2.md` (`_zadania`) — to cite it in *Origin*; it is
  identical to the frozen `task.md` (same sha256 `6977b560…`).
- `git show 82bbb1c` / `9dd8306` — the earlier cycle's precedent for an invariant recorded at
  `Method: test` before its test.

## Choices (each with the way rejected and its cost if wrong)

1. **Rows 10 and 12 are split across two entries each.** Row 10's counts go to D-93 and the rest
   (editing and saving after an end, „Zakończ” dropping changes, the panel after „Zakończ”) to the
   new D-161. Row 12's counts go to D-93 and its beaten attacks to D-131. Rejected: all of row 10
   or row 12 in D-93, which answers "What does a program rule show the player?", so D-93 would
   carry a second question (decision template: "two independent questions, propose two entries").
   Cost if wrong: the meaning sits in two entries instead of one. A reviewer who wants the rows
   whole moves sentences between them; the meaning does not change.
2. **Questions of three decisions were reworded in place:** D-123 "at the first chill" → "at a
   discovery" (row 11 covers every rule written at a discovery, Q7). D-131 "Which edits of the
   program …" → "Which changes of the program a map run carries out …" (it now holds the switch).
   D-158's heading is new. Rejected: new numbers for the wider questions. Cost if wrong: the reviewer
   asks for a new number, and the sentences move to it.
3. **"The program the copy belongs to" instead of the row's literal wording.** Row 10 says „program,
   z którego wzięto kopię”, and row 3 says „programu, z którego kopię wykonuje trwające przejście”.
   Row 6 makes the copy belong to the new program after „Zapisz jako nowy program”, and spec
   decisions 5 and 6 read it the same way. Row 6's "differs from the program it was taken from" is
   worded as "differs from its program as the copy was taken from it or last saved into it". That
   is the orchestrator's Q-D1, and it uses the definition's own measure. Cost if wrong: after a save
   as a new program, „Zakończ” would show the program the copy was first taken from, and the counts
   would stand there.
4. **D-158 writes the fallback order of spec decision 4 (Q-D4, the orchestrator's choice)** for row
   5's „gdy program domyślny zniknął z listy, domyślny staje się program używany ostatnio”.
   Rejected: the row's literal sentence, which leaves open which "program used last" it means.
5. **D-160 holds the exact text of the line, which comes from Q14,** although row 8 names only „linia
   w roli `warning`”. Rejected: leaving the text out, which would leave a settled human answer
   unrecorded.
6. **`saved-program-edit` and `copy-save` read `Method: test` before their tests exist.** The tests
   come in Slices 4 and 5 of the same request. This is the plan's choice and the precedent of
   `streak-program-change` (82bbb1c, test in 9dd8306). The invariant template says "An invariant
   whose test is not written yet reads `review`" (WAY-61). That holds on the branch until Slices 4
   and 5, and it is met at the merge. Cost if wrong: two words change to `review` and back.
7. **The handoff's "each new invariant's *Verification* names its check" was adapted.** An
   invariant entry has no *Verification* field. Each decision the invariants derive from names them
   instead: D-152, D-131, D-93 and D-159 hold `saved-program-edit` or `copy-save`. The test file
   cites the invariant by its line `invariant: <identifier>`. No path to a test file stands in the
   foundation, and F25 adds those paths to the part map.
8. **`Part` of the two new invariants is `simulation · browser-view`.** A view change that sends an
   edit of a saved program to the copy's edit, or a save to the switch, would make them false.
   Rejected: `simulation` alone, which a view change would not read. The template says a writer in
   doubt names more.
9. **The glossary entry `copy` has `Not: none`.** The other uses of the word in tracked files carry
   its everyday sense: a copy of a file, a key, a database, a name or the traits. The `copy` status
   of the coding guidelines is a value of the-way's template, a process word, and the product's
   glossary does not define those (WAY-226). Its carrier would also hold the term itself, which
   *Not* does not allow. Cost if wrong: one *Not* line.
10. **Rationale and *Rejected* of D-154 to D-162 are my wording from the task's material.** That
    material is the costs accepted in Q3, Q9, Q12, Q14 and Q16, the ways not taken in Q14–Q17, and
    the alternatives in the column "What the cycle would otherwise guess". The task gives no reason
    for some of the rejected ways (row 1's separate screen, row 5's step after „Wyślij”, row 10's
    question at „Zakończ”). For those, the reasons are short ones that follow from the row. The
    human sees them at the merge.
11. **D-152 keeps the approved wording.** Only the earning-loop clauses are removed, as the task's
    *Decisions in play* allocates them to task 18. Its *Rationale* and *Rejected* stay whole, the
    earning-loop sentences of the rationale included, and its *Verification* gains the two new
    invariants. *Origin* reads „a part of the approved entry”, as D-136 does.

## Problems and observations

- The styleguide's list of destructive buttons (`guidelines/styleguide-browser-view.md:195-197`)
  and the comment at `src/browser/styles.css:105` still name three buttons. D-44 now names five. That is guideline and code, outside this stage. The spec
  leaves the styleguide edit to the same change, and the plan puts it in Slice 7.
- `src/browser/sim/game.ts:233` has the comment "A copy of the program built from the closed list".
  It uses „copy” in its everyday sense, next to the new term. The maker of Slice 1 may reword it.
- D-20 *Rejected* lists "a change of the program taking effect only from a map run restart — two
  versions of the program in force at once". D-152 now keeps a saved program and a copy in force
  at once. Reading: D-20's option was about edits of what the map run carries out, which still take
  effect at once in the copy, so there is no collision of binding sentences. D-152 was approved at
  the definition's readiness gate, which searched the foundation. I name it for the reviewer.
- No question for the human arose.
