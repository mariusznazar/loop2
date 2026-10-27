# Report — the plan's foundation entries, task cycle odkrywanie

- **Status:** done with concerns
- **Commit:** `dcd529d` docs: :memo: record the foundation entries of the discovery task (on `task/odkrywanie`, over base `d9a2374`)
- **Files:** `foundations/decisions.md` +224 −6 · `foundations/invariants.md` +12 −9 · `foundations/glossary.md` +25 −0

Method: `the-way-make-change` (pinned `.the-way` 574a37b, gitlink and checkout agree), the foundation-step paragraph of `.the-way/task-cycle/skill/SKILL.md`, and each entry written through `the-way-record-decision`, `the-way-record-invariant` and `the-way-record-glossary-term` (their SKILL.md, template, examples, `elements/common/rules.md` and `way_of_working.md` read whole). No product code and no test changed.

## Entries, with one sentence of meaning in Polish for the request

| Plan entry | Foundation entry | Znaczenie (pl) |
|---|---|---|
| "When does the player learn what the world holds?" (whole) | D-118 (new) | Warunek „Zawsze” jest w Zrozumieniu od startu nowej gry; każda inna akcja, przedmiot i warunek wchodzi do niego dopiero przez odkrycie w grze, a przy odkryciu czas gry staje sam. |
| "Whose is the knowledge of the world…" (the part this task makes true) | D-119 (new) | Zrozumienie należy do gracza i jest jedno dla wszystkich postaci, a to, co odkryje którakolwiek z nich, wchodzi do niego dla wszystkich; repertuar postaci wylicza się ze Zrozumienia przez predyspozycje jej archetypu, nie jest zapisywany i to samo wyliczenie rozstrzyga o listach edytora i o tym, co symulacja pozwala postaci wykonać. |
| "What does an archetype open to a character?" (whole) | D-120 (new) | Archetyp otwiera umiejętności postaci, nie akcje: akcja jest otwarta, gdy umiejętność, którą hoduje jej para czasownik × cel, należy do predyspozycji archetypu; akcja, której nie hoduje żadna umiejętność, jest otwarta dla każdej postaci, a archetyp nie filtruje przedmiotów. |
| O9 | D-121 (new) | Akcje, przedmioty i warunki Lasu wchodzą do Zrozumienia przez łańcuch odkryć z tabeli punktu 2 „To do” (wychłodzenie, eksploracja, patyk, ognisko, „Zapal”, jagoda). |
| O3 | D-71 (changed in place) | Odkrycie zapada w kroku minuty, który je wywołał, reszta minuty dzieje się do końca, wybór reguły na końcu minuty widzi już odkrycie i regułę wpisaną przy nim, w minucie śmierci odkrycie z kończącej się akcji nie zapada, a przejście staje po całej minucie odkrycia. |
| O2 | D-122 (new) | Odkrycie zatrzymuje przejście tą samą pauzą co „Pauza” („ (pauza)” w wierszu stanu, dalej przyciskiem „Wznów”), a pod wierszem stanu do wznowienia stoi jedna linia w roli `discovery` z tym, co odkryto w tej minucie. |
| O1 | D-123 (new) | Gdy pierwsze wychłodzenie wnosi „Eksploruj” do Zrozumienia, gra dopisuje „Zawsze → Eksploruj” do pierwszej grupy programu, a gdy grup nie ma, zakłada grupę „Program” z warunkiem „Zawsze” i dopisuje regułę do niej. |
| O6 | D-124 (new) | „Dodaj regułę” jest nieaktywny, dopóki Zrozumienie nie zawiera żadnej akcji, a potem dokłada „Zawsze → Eksploruj” na końcu swojej grupy. |
| O7 | D-125 (new) | Wiersz ciała, plecak, lista odsłoniętych kafelków i rysunek mapy pokazują stan gry niezależnie od Zrozumienia — np. sytość widać przed odkryciem „Sytość poniżej”. |
| O8 | D-126 (new; `narrows D-23`) | Symulacja przechodzi nad regułą, której warunek, akcja albo cel akcji leży poza repertuarem postaci, do następnej reguły, jak nad akcją niewykonalną w tej minucie, a reguła zostaje w programie. |
| O4 | `player-map-run-pace` (sentence changed; Derives from D-21 · D-118 · D-122) | Minuta gry, w której coś odkryto, zostawia przejście w pauzie, a czas realny przekazany w tym samym wywołaniu ponad tę minutę nie przesuwa go o żadną minutę. |
| O5 | `minute-span-split` (sentence changed; Derives from D-04 · D-71 · D-118) | Podział odcinka minut na wywołania symulacji daje ten sam stan i te same zdarzenia aż do minuty śmierci postaci albo minuty odkrycia włącznie. |
| `program-rule-pick` | `program-rule-pick` (sentence changed; Derives from D-23 · D-126) | Postać zaczyna pierwszą regułę, której warunek, akcja i cel akcji należą do jej repertuaru, warunek zachodzi i akcję da się wykonać, a każda pominięta reguła zostaje w programie. |
| predisposition | glossary `predisposition` | Predyspozycja to umiejętność postaci, której archetyp pozwala postaci się nauczyć. |
| archetype | glossary `archetype` | Archetyp to rodzaj postaci, który wyznacza jej predyspozycje. |
| Understanding (the part this task makes true) | glossary `Understanding` | Zrozumienie to zapis akcji, przedmiotów i warunków, które gracz odkrył, razem z warunkiem „Zawsze”, który zawiera od startu nowej gry. |
| repertoire | glossary `repertoire` | Repertuar postaci to ten podzbiór Zrozumienia, którego postać może użyć w programie. |

Every row O1–O9 has its own entry; the search of the whole foundation found none of them already stated. The part map is unchanged, as the plan says.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors" (before the change, after the decisions, after the glossary, and after the commit).
- No test ran: this stage writes no code and no test. The three invariant tests are not changed here; the handoff gives them to slice 8 (`tests/invariants/test_program_rule_pick.py`) and slice 10 (`tests/invariants/test_player_map_run_pace.py`, `tests/invariants/test_minute_span_split.py`), and the failing run of each is theirs.
- Own-work check — the requirement most likely missed: the wording rule of question 7 (B) in the rows' binding sentences. Check: read the binding sentences of D-121–D-126, the added sentences of D-71 and the three invariant sentences for "only", "never", "always", "without", "w MVP" and stage words. Result: none in those sentences (the name „Zawsze” is a name). The words "only" and "never" remain in D-118, D-119 and D-120, which are projected entries written in their approved wording, not rows.

## Choices made, with the way rejected and its cost if wrong

1. **Condition and action names in Polish in projected entries.** The approved texts write the condition as "Always" and the verb as "Make"; I wrote „Zawsze” and „Wytwórz” (D-118 binding sentence and Rationale, D-120 Verification, Rationale and Rejected, glossary `Understanding`), as D-91 and the other entries of the log name the game's conditions and actions. Rejected: copying "Always"/"Make" verbatim — the log would name one condition by two names. Cost if wrong: a wording change of an approved entry that the reviewer may want reverted; the meaning is unchanged.
2. **D-119, the part this task makes true:** kept the approved wording minus what branches and saving bring: "is saved once for all characters" became "is one for all characters" (saving is task 16's), and the branch clauses, the branch sentence of *Rationale*, the bought-branch violating example and the bought-branch *Rejected* item were left out. I added a complying example from the task's point 1 ("a character's death, „Restart” and „Zakończ” leaving the Understanding as it was"). Task 10 writes the rest.
3. **Projected fields not in the current template** (*Change*, *Review when*, *Approved by*, *Avoid*, "level 2 —") were dropped; *Scope* (TODO in the definition) is `simulation, browser-view` for D-118 and D-119, `simulation` for D-120; *Origin* names the concept passages and "the full approved entry" in the definition, the way D-23 and D-93 do.
4. **O3 as an edit of D-71 in place** (the question it answers is D-71's: the order of a game minute), adding two binding sentences, complying and violating examples, a *Rationale* sentence, the task document in *Origin*, and `derives from D-118`; the old relations `derives from D-04 · D-23` were rewritten `derives from D-04 · derives from D-23` in the log's usual form.
5. **O2 kept apart from O3:** "time stops after the whole minute" stands in D-71 (O3's row), and D-122 holds only the pause and the line. The lost real time stands in the invariant `player-map-run-pace` (O4), not in D-122.
6. **D-126 relations:** `derives from D-119 · narrows D-23`. D-23 has the character carry out the first rule whose condition holds and whose action can be carried out; a rule whose *condition* lies outside the repertoire but holds would still be picked under D-23 alone, so D-126 goes against it in that narrower area and prevails there (P-2: D-23 unchanged).
7. **Links between decisions and invariants:** D-118 *Verification* names `player-map-run-pace` and `minute-span-split`, D-122 names `player-map-run-pace`, D-126 names `program-rule-pick`, and each of those invariants names them back in *Derives from*.
8. **D-121's three binding sentences carry the whole chain** (Q-C3: meaning, not location). Moss and fibre stand in the sentence as items of a revealed tile; "they have no use yet" went to *Rationale*.
9. **D-124 says "disabled"**, the word D-44 uses for a control's state, for the task's „nieaktywny”.

## Concerns

- **Where *Rejected* came from (D-121–D-126).** The task document gives the human's choice and its accepted cost for each question, but not the other ways put to the human; the refinement conversation it cites (`.runs/project-refinement/odkrywanie.md` in loop2) is no longer on disk (the directory is empty). I wrote each *Rejected* from what the task names as the alternative: the column "What the cycle would otherwise guess" (O1, O2, O7, O8), the cost of the chosen way (O9: "przesuwa warunki ogniska później niż w loop"), and for O6 a way the foundation itself excludes (D-118, D-119). Reasons in D-126's and D-124's *Rejected* are my own reading, not quoted. A reviewer who has the conversation may want them aligned with the options actually shown.
- **Campfire against "items".** D-121 brings "the campfire" into the Understanding, while the glossary's `Understanding` (approved wording) lists actions, items and conditions, and in loop2 the campfire is no backpack item (Q-C2 settles how the code records it). I left the approved definition as it is and named the campfire explicitly in D-121. Task 10, which writes the rest of the `Understanding` definition, may say whether the record holds such things besides items.
- **Two senses of "reveal".** The foundation uses "reveal" for a tile that exploring uncovers (D-25, `exploring-reveal`, "list of revealed tiles") and D-118's approved wording uses "reveals it" for discovery. Both are ordinary English senses, so neither takes a glossary entry; in the rows' entries I wrote "discovered"/"brings into the Understanding" for discovery and kept "reveal" for tiles.
- **Invariant tests now behind their sentences (expected).** The three tests still quote the old sentences in their docstrings and check none of the new clauses. Some scenarios also rely on an Understanding that the code will gate later. For example, `test_program_rule_pick.py` runs "always → go to resource" and "fewer than 0 sticks here" rules on a new game's mage, and `test_player_map_run_pace.py` passes up to 212 game minutes past the first chill at minute 84. Slices 8 and 10 have to rewrite them: once the code gates by the repertoire and stops at discoveries, those scenarios change outcome.

## Reaches beyond the dispatch

- `.the-way/foundations/decisions.md` (WAY-03), `.the-way/foundations/invariants.md` (`instruction-file-imports`), `.the-way/foundations/glossary.md` (`invariant`, `foundation`, and its term list): the element examples, as step 1 of the shared way of working requires, and the check of step 2 of the glossary skill that the-way's glossary holds none of the four terms.
- `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md` lines 1041–1142 and 2253–2332: the approved projected entries whole (handoff allowed it).
- `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/_zadania/grupy_regul_i_liczniki_loop2.md`: how the previous cycle's decision rows filled *Rejected*.
- `src/browser/sim/data/actions.ts`, `conditions.ts`: the exact Polish names of actions and conditions used in D-121–D-126.
- `git grep` over tracked files for "understanding", "repertoire", "predisposition", "archetype" (glossary step 2): "archetype" is used in `content-identifiers`, a decision example and code, all in the defined meaning; the other three have no uses yet.
