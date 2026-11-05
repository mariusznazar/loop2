# Report — the agent of the plan's Foundation entries, task `edytor-programu`

Saved by the orchestrator from the agent's returned text (its tool refused to write the file). The words are the agent's.

**Status:** done

**Commits** (branch `task/edytor-programu`, base 6fec0ea, not pushed; author address `mariusznn@gmail.com`; Slice 1 starts at `083b347`):
- `4a6fe50` docs: :memo: record the titles of the 11 action icons from game-icons.net, credit Felbrigg and Skoll in game-icons-licence and rest icon-credits on the new titles. Files: `foundations/environment_facts.md`, `foundations/invariants.md`.
- `18e2afa` docs: :memo: bring D-44, D-93, D-166, D-255 and D-282 to their approved wording, and make true in D-39, D-43, D-91, D-124, D-180, D-196 and D-245 what the new program editor makes true. File: `foundations/decisions.md`.
- `083b347` docs: :memo: record how the player writes a program rule in the new editor and the settlements of its rule panel, rule groups and trip plan line, D-288 to D-307. File: `foundations/decisions.md`.

**Check:** `python -B .the-way/elements/common/foundation_check.py` gave 0 errors, exit 0, on the base and after every edit. `npm test` did not run: outside this stage; the base already fails `tests/quality` because `ruff` and `shellcheck` are not installed.

## Entries, and what each row became

| Row | Entry | Kind | What was done | Meaning (pl) |
|---|---|---|---|---|
| E1 | D-288 — How does the player write a program rule? | decision, new | Projected wording. *Relations*: derives from D-23 · D-44. | Edytor jest jeden na Programach i na ekranie przejścia: wiersz czyta się jak zdanie, regułę zmienia panel obok, wybór idzie komórkami z wyszarzeniem i powodem, reguły przesuwa uchwyt i strzałki, całe grupy sam uchwyt. |
| E2 | D-282 | decision, change | Standing entry changed, no second entry (Q2). Gains the stepped pick of the rule panel and the areas of Programy. | Każda kolumna ekranu, także na Programach, to osobny obszar, Siedziba ma drużynę jako sekcję, a panel reguły daje wybór krokami: czynność, potem cel. |
| E3 | D-44 | decision, change | Projected first sentence: eight controls including the pick cell; destructive buttons neutral until the pointer or the focus reaches them. | Ekrany budują się z ośmiu wspólnych kontrolek, w tym komórki wyboru, a przyciski niszczące są szare w spoczynku i czerwienieją pod kursorem i przy fokusie. |
| E4 | D-93 | decision, change | Projected wording; examples use „Wykonano 0×”. | Lista reguł na obu ekranach stoi pod „sprawdzane od góry”, licznik to „Wykonano 3×”, nagłówek grupy pokazuje sumę. |
| E5 | D-166 | decision, change | „beside it” became „in the middle”; example and *Origin* updated. | Programy: lista po lewej, edytor zapisanego programu w środku, nad nim zdanie o przejściu, gdy trwa albo czeka. |
| E6 | D-255 | decision, change | Projected binding sentence and *Rationale*; new examples. | Agent składa stan gry funkcjami symulacji i wysyła go zwykłym zapisem do lokalnego serwera z jednorazową bazą; wczesne stany osiąga graniem. |
| E7 | D-03 | decision, part | No change: the log already says the projected sentence word for word. | — |
| E8 | D-27 | decision, part | No change: the 11 icons fall under the standing sentences. | — |
| E9 | icon-credits | invariant, change | *Rests on* gains the 11 title facts; sentence unchanged. | Wzmianka o każdej ikonie, także 11 nowych, opiera się na tytule z jej strony. |
| E10 | D-43 | decision, change | Icon clause names both ways of drawing: action icon as a mask taking the colour of the text beside it; every other icon keeps its colour in its file. | Ikona czynności jest rysowana maską i bierze kolor tekstu obok, pozostałe trzymają kolor w pliku — dwa sposoby obok siebie. |
| E11 | D-39 | decision, part | *Verification*: „Zakończ” in `danger` under the pointer. | „Zakończ” czerwienieje dopiero pod kursorem. |
| E12 | D-245 | decision, part | Binding sentence loses „with its text in the role `danger`”; neutral-at-rest example added. | „Zatrzymaj” jest niszczący, działa od razu, szary w spoczynku. |
| E13 | D-124 | decision, part | Renamed to "What does „+ reguła” do?"; adds at the end of its group and opens the panel on the condition; the disabled clause stays (question 12). | „+ reguła” dodaje „Zawsze → Eksploruj” na końcu grupy i otwiera panel na warunku; do zadania 10 wyłączone bez czynności w Zrozumieniu. |
| E14 | D-180 | decision, part | Programy shows the trip plan folded to a line of icons between the program's name and its rules; the card of a map stays for task 13. | Plan wyprawy stoi na Programach jako linia ikon między nazwą a regułami. |
| E15 | D-91 | decision, correction | Example now says „+ reguła”. | Przykład w D-91 mówi „+ reguła”. |
| E16 | game-icons-{binoculars, hiking, direction-sign, grab, claw-hammer, match-tip, logging, meal, deadly-strike, boot-kick, dodge}-title | environment facts, new | Each passage is the heading of the icon's page, read live on 2026-11-05; each cites a Wayback capture found through the CDX index. | Strona każdej z 11 ikon podaje jej tytuł. |
| E17 | game-icons-licence | environment fact, change | 2 of the 11 icons have other authors: `logging` by Skoll, `dodge` by Felbrigg. The sentence names Delapouite, Lorc, Felbrigg and Skoll. | Repozytorium game-icons udostępnia na CC BY 3.0 ikony autorów Delapouite, Lorc, Felbrigg i Skoll. |
| E18 | D-289 — What does the rule panel show greyed, and with which reason? | decision, new | Row 1 with Q16 („Obchód”). Relations: derives from D-118 · D-196 · D-288, narrows D-119. | Nieodkryte nie stoi wcale; czego nie wolno wybrać, stoi wyszarzone z powodem; reguła z wartością spoza wyboru pokazuje ją wybraną i wyszarzoną. |
| E19 | D-290 — grouping of cells | decision, new | Row 2 | Czynności w grupach Ruch, Zbieranie, Ogień, Żywność i walka; warunki w dwóch kolumnach, sekcje oddzielone kreską. |
| E20 | D-291 — Which icon stands for an action? | decision, new | Row 3; scope browser-view · simulation. | Czynność ma jedną ikonę w wierszu, komórce i nad głową maga, nigdy ikonę celu. |
| E21 | D-292 — numbering | decision, new | Row 4 | Grupa „2”, reguła „2.1”. |
| E22 | D-293 — time of an action | decision, new | Row 5 with Q17 a | Czas jednego wykonania w wierszu i w panelu; ruch poza przejściem bez czasu. |
| E23 | D-294 — folding kept where | decision, new | Row 6 | Zwinięcie w pamięci strony, znika po odświeżeniu, poza zapisem. |
| E24 | D-295 — folded group, drop on it | decision, new | Row 7 | Zwinięta grupa: nazwa, warunek, liczba reguł; upuszczona reguła na koniec, grupa zostaje zwinięta. |
| E25 | D-296 — change and delete a group | decision, new | Row 8 | Klik nagłówka otwiera ten sam panel; „✕” grupy w nagłówku. |
| E26 | D-297 — arrow at a group's edge | decision, new | Row 9 with Q17 d | „↓” z końca grupy na początek następnej, „↑” z początku na koniec poprzedniej. |
| E27 | D-298 — fold or unfold all | decision, new | Row 10 with Q17 c | Zwykły przycisk „zwiń/rozwiń wszystkie”, tylko przy więcej niż jednej grupie. |
| E28 | D-299 — no search, no recent picks | decision, new | Row 11 | Wybór bez szukajki i bez „ostatnio”. |
| E29 | D-300 — no current value | decision, new | Row 12 | Przy warunku nie ma bieżącej wartości. |
| E30 | D-301 — empty group | decision, new | Row 13 | „Pusta grupa — przepuszcza dalej.” |
| E31 | D-302 — copy panel and the streak | decision, new | Row 14 | Panel kopii mówi „Zmiana zeruje passę tego przejścia.”, bez słowa o liczniku. |
| E32 | D-303 — delete with no question | decision, new | Row 15 | Reguła i grupa kasują się od razu. |
| E33 | D-304 — add a group | decision, new | Row 16 | „+ dodaj grupę” obok „+ reguła”. |
| E34 | D-305 — no dead-rule marks | decision, new | Row 17 | Bez ⊘, „N reguł nie zadziała” i bursztynowego „0×”. |
| E35 | D-306 — flow of the rule panel | decision, new | Row 18 with Q17 e | Panel otwiera się na warunku, pola kolejno, każdy wybór od razu zmienia i przechodzi dalej, strzałki po komórkach także wyszarzonych, zamyka „✕”, Esc albo inna reguła. |
| E36 | D-307 — empty trip plan line | decision, new | Row 19 | „Plan wyprawy: pusty”. |
| E37 | D-196 | decision, correction | The complies example "absent outside a run" became untrue (D-289 shows the action greyed with „wybierzesz w przejściu postaci, która ją kupiła”); example corrected, binding sentences unchanged. | Poza przejściem czynność gałęzi stoi wyszarzona z powodem, nie znika. |
| E38 | D-131, D-179, D-186, trip-plan-progress | judged | Nothing written: none became false. | — |
| E39 | "rule panel", "pick cell", "drop line" | judged | Nothing written: no entry needed. | — |

No part-map change. Rows tied to an entry already stated: none; each of rows 1–19 became its own decision, D-289 to D-307.

## Searches of the foundation

- Decision log: searched rule, group, editor, program panel, pick, offer, icon, delete, trip plan, „Dodaj regułę”/„Dodaj grupę”, drag, handle, arrows, fold, greyed, „0×”, destructive, shared controls. Read whole: D-23, D-26, D-27, D-39, D-43, D-44, D-90, D-91, D-93, D-118, D-119, D-124, D-130, D-131, D-166, D-179, D-180, D-182, D-186, D-196, D-244, D-245, D-255–D-258, D-275, D-280–D-287. No decision already answered any of rows 1–19.
- Collision: D-119 says the editor offers the whole computed repertoire; row 1 greys targets absent from the map and actions with no target to point at. Recorded as `narrows D-119` in D-289.
- Decisions deriving from changed ones (D-130, D-180, D-245, D-274–D-276; D-256–D-258 and local-start-access; saved-program-edit, trip-plan-progress): none says a destructive button is red at rest; all still true.
- „Dodaj regułę” remains only in the *Origin* of D-124 as a quoted heading of a source document.
- E38: D-131, D-179, D-186 and trip-plan-progress describe what the simulation does when a plan changes; none says the screen of a map run edits the plan; the plan of a saved program can still be edited on Programy during a map run.
- E39: none of the three words occurs in tracked files before this change; each means what a reader of game and web interfaces takes it to mean; no "panel", "cell" or "pick" in the-way's glossary at the pin.

## Checks run

- `python -B .the-way/elements/common/foundation_check.py`: 0 errors, exit 0, on the base, after each edit and at the end.
- `curl` of the 11 pages: HTTP 200 for all; each `<h1 id="icon-name">` matches the written passage (11 of 11).
- `license.txt` at commit 82d9488: contributor lines found word for word; the tree lists `skoll/logging.svg` and `felbrigg/dodge.svg` as the only files of those names.
- `npm test`: not run.

## Reach beyond the handoff

- D-44 and D-93: the projected *Rationale* and *Rejected* are shorter than the log's; the projected text was taken and the log's reasons and rejected ways kept where they do not contradict it. D-44: question 9's option C added to *Rejected*; the old sentence "a destructive button that looks like a safe one hides…" dropped, as the projection drops it.
- D-124: question renamed to the projected one.

## Searches not found or unclear

- Wayback captures: all 11 are in the CDX index with status 200. Four (hiking, match-tip, logging, meal) were opened and show the same heading. The other seven (binoculars, direction-sign, grab, claw-hammer, deadly-strike, boot-kick, dodge) did not open (archive HTTP 000); for those seven the capture is cited from the CDX index alone. The live page was checked for all 11.
- The "bez decyzji" ways not chosen in the task's questions were left out of *Rejected*: they are not ways the product could take.

## Questions, with recommendations

1. D-289 `narrows D-119`. Recommendation: keep it and leave D-119 unedited; the human accepted row 1 and the code already hid these cases. The alternative, a sentence in D-119 itself, would change an approved decision beyond what the task carries.
2. Slices 3–4: two icons are not by Delapouite or Lorc — `logging` is by Skoll (`https://game-icons.net/1x1/skoll/logging.html`), `dodge` by Felbrigg (`https://game-icons.net/1x1/felbrigg/dodge.html`). The credits, and `AUTHORS` in `tests/invariants/test_icon_credits.py`, must name them. Recommendation: pass this into the handoffs of Slices 3 and 4.
