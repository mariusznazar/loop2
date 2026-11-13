**State: ready** — one item under *Fix or let through* waits for your answer; nothing blocks the merge, and everything under *You accept by merging* waits for nothing.

## What you will see

The three combat skills now give their points much sooner, so a player can earn them on the first maps with combat. „Walka bronią jednoręczną” gives a level and a point at 15, 40, 100 and 300 practice (before: 30, 90 and 200), „Kopanie” at 10 and 30 (before: 20), and „Unik przed ciosem” at 4 and 15 (before: 10 and 30). The branch „Mocniejszy cios” has a fourth rank, 1 point and +2 damage like the other three, so bought in full it makes a blow with a stick do 14 damage (before: 12 at three ranks); the fourth point of „Walka bronią jednoręczną” goes there. The branch „Cięższy kop” has two ranks of 1 point and +1 damage each (before: three ranks), because „Kopanie” now gives two points and a branch that could never be bought in full would leave a point missing. „Zwinny odskok” is unchanged.

On the screen of the character („Postać”) nothing new appears; the existing rows show the new numbers: „Mocniejszy cios” as 0/4 with the price 1, „Cięższy kop” as 0/2, and each combat tree's next point at 15, 10 and 4 practice. A look at the running game with a made-up account, with the game's own state composed so that the combat trees were present (a fresh character shows none yet), found the rows as the new numbers say and nothing broken: after buying every rank the rows read 4/4 with „teraz 14 obrażeń” and 2/2 with „teraz 5 obrażeń”.

![the screen Postać at practice 0: Mocniejszy cios 0/4, Cięższy kop 0/2, next points at 15, 10 and 4](https://github.com/mariusznazar/screenshots/blob/2e27abeab2137888b8f7a8442460dd9e690b9225/loop2/progi-drzew-walki/postac-start.png?raw=true)

![the screen Postać after buying every rank: Mocniejszy cios 4/4 teraz 14 obrażeń, Cięższy kop 2/2 teraz 5 obrażeń](https://github.com/mariusznazar/screenshots/blob/2e27abeab2137888b8f7a8442460dd9e690b9225/loop2/progi-drzew-walki/postac-bought.png?raw=true)

### Underneath

The numbers stand in the data of the character skills, and the decision that fixes them was changed with them; the screen reads the number of ranks from the data, so no screen code changed. The new numbers are set generously on purpose and are to be corrected either way when more maps are balanced.

## For you to decide

### Needed from you

none

### Fix or let through

1. The review of the whole change read 27 of the 326 decisions it selected whole and ran through the rest by title, and it named five neighbouring decisions about combat (the first attack of the wolf, weapon wear and dressing wounds, what ends an encounter, what pays and what takes from the chest, the section „Kto idzie”) as possibly bearing on the change but unread. The author who fixed the review's small remarks then read all five whole and found no number or claim of the combat trees in them, and the reviewer's text search of the whole log for the old numbers had found none there; no second reviewer read them. If one of them still said something the new numbers replace, whoever later compares a change with it would follow a stale claim, and would find it when that decision is next used, not before. A fresh reviewer reading the five costs one more review round of a few minutes and tokens; letting it through costs nothing today. I recommend letting it through, since two independent readings, a search and a whole reading, found nothing. Have a fresh reviewer read the five now, make a task of it, or let it through? (Course of the cycle, Choices)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

2. The cycle added one clause to an older decision about the combat actions. That decision said the ranks of all branches are taken from the old game; it now says the ranks of „Mocniejszy cios” and „Cięższy kop” are the ones the new decision sets. Without it, whoever later checks a change against the older decision would read a claim that no longer holds. Its only price is one more clause to read there.
3. The decision that fixes the skill numbers had lost its refusal of "other numbers given by the human instead of the old game's data" when it was first rewritten; the cycle put the refusal back, narrowed to the other skills, because it still holds for the five skills whose numbers did not change and the task said nothing either way. Without it, a later agent asked to tune another skill by the human's numbers would find no refusal there.
4. „Zwinny odskok”, the third combat branch, keeps its two ranks at 1 point each. The task names the prices of two branches only, and its wording "the three combat trees and their two branches" reads as those two; lowering the dodge branch too would need a number the task does not give.
5. The cycle added a test of the screen „Postać” that checks the rank counts of the two combat branches, beyond the two tests the task named. The tests of the simulation alone cannot tell a branch of two ranks from one of three, because the points run out before the last rank can be asked for, so a wrong third rank of „Cięższy kop” would have passed them. The price: that test is tied to the wording of the branch row.

## Cost

About 1 h 04 min of working time, of which 43 min waiting for tools, on two models (the orchestrator and the reviewers on Sonnet, the author on Haiku; about 33.8 million tokens in all, 32.6 million of them cached input, 178 thousand output). Review rounds: one review of the whole change with one fix of three small remarks and one review of that fix; one review of the merge with the target branch; one check of the screen in the running game. The table of stages is in the committed record, linked under *Course of the cycle*.

## How to merge

Merge with a merge commit that keeps the commits (not a squash or a rebase), because the link to the record of the cycle survives only then.

<details>
<summary>Po polsku</summary>

**Stan: gotowa** — jeden punkt w części „Popraw albo przepuść” czeka na Twoją odpowiedź; nic nie blokuje scalenia, a to, co jest w części „Przyjmujesz przez scalenie”, na nic nie czeka.

## Co zobaczysz

Trzy umiejętności walki dają teraz punkty dużo wcześniej, więc gracz może je zdobyć już na pierwszych mapach z walką. „Walka bronią jednoręczną” daje poziom i punkt przy 15, 40, 100 i 300 wprawy (wcześniej 30, 90 i 200), „Kopanie” przy 10 i 30 (wcześniej 20), a „Unik przed ciosem” przy 4 i 15 (wcześniej 10 i 30). Gałąź „Mocniejszy cios” ma czwarty stopień, 1 punkt i +2 obrażeń jak trzy pierwsze, więc wykupiona w pełni daje cios patykiem za 14 obrażeń (wcześniej 12 przy trzech stopniach); czwarty punkt „Walki bronią jednoręczną” idzie właśnie tam. Gałąź „Cięższy kop” ma dwa stopnie po 1 punkcie i +1 obrażeń (wcześniej trzy stopnie), bo „Kopanie” daje teraz dwa punkty, a gałąź, której nie da się wykupić do końca, zostawiałaby brakujący punkt. „Zwinny odskok” bez zmian.

Na ekranie postaci („Postać”) nie pojawia się nic nowego; istniejące wiersze pokazują nowe liczby: „Mocniejszy cios” jako 0/4 z ceną 1, „Cięższy kop” jako 0/2 i następny punkt każdego drzewa walki przy 15, 10 i 4 wprawy. Obejrzenie działającej gry na wymyślonym koncie, ze stanem gry złożonym tak, żeby drzewa walki były obecne (świeża postać jeszcze ich nie pokazuje), wykazało wiersze zgodne z nowymi liczbami i nic zepsutego: po wykupieniu wszystkich stopni wiersze czytają się 4/4 z „teraz 14 obrażeń” i 2/2 z „teraz 5 obrażeń”.

### Pod spodem

Liczby stoją w danych umiejętności postaci, a decyzja, która je ustala, została zmieniona razem z nimi; ekran czyta liczbę stopni z danych, więc kod ekranu się nie zmienił. Nowe liczby są celowo hojne i mają być korygowane w obie strony przy wyważaniu kolejnych map.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

brak

### Popraw albo przepuść

1. Przegląd całej zmiany przeczytał w całości 27 z 326 wybranych decyzji, a resztę przejrzał po tytułach, i wskazał pięć sąsiednich decyzji o walce (pierwszy atak wilka, zużycie broni i opatrywanie ran, co kończy spotkanie, co płaci i co zabiera ze skrzynki, sekcja „Kto idzie”) jako mogące dotyczyć zmiany, ale nieprzeczytane. Autor, który poprawiał drobne uwagi przeglądu, przeczytał potem wszystkie pięć w całości i nie znalazł w nich żadnej liczby ani twierdzenia o drzewach walki, a wyszukiwanie tekstowe recenzenta w całym dzienniku za starymi liczbami też ich tam nie znalazło; drugi recenzent ich nie czytał. Gdyby któraś nadal mówiła coś, co nowe liczby zastępują, ktoś porównujący później zmianę z nią poszedłby za nieaktualnym twierdzeniem i odkryłby to dopiero przy następnym użyciu tej decyzji. Świeży recenzent czytający te pięć kosztuje jedną rundę przeglądu na kilka minut i tokeny; przepuszczenie nic dziś nie kosztuje. Rekomenduję przepuścić, bo dwa niezależne odczyty, wyszukiwanie i czytanie w całości, nic nie znalazły. Kazać świeżemu recenzentowi przeczytać te pięć teraz, zrobić z tego zadanie czy przepuścić? (Przebieg cyklu, Wybory)

### Przyjmujesz przez scalenie

Scalenie przyjmuje te punkty; jeśli któryś Ci nie odpowiada, powiedz który.

2. Cykl dopisał jedno zdanie do starszej decyzji o akcjach walki. Mówiła ona, że stopnie wszystkich gałęzi są wzięte ze starej gry; teraz mówi, że stopnie „Mocniejszego ciosu” i „Cięższego kopu” są takie, jakie ustala nowa decyzja. Bez tego ktoś porównujący później zmianę ze starszą decyzją przeczytałby twierdzenie, które już nie obowiązuje. Cena to tylko jedno zdanie więcej do przeczytania.
3. Decyzja ustalająca liczby umiejętności straciła przy pierwszym przepisaniu odrzucenie „innych liczb podanych przez człowieka zamiast danych starej gry”; cykl przywrócił je, zawężone do pozostałych umiejętności, bo nadal obowiązuje dla pięciu umiejętności, których liczby się nie zmieniły, a zadanie nic o tym nie mówiło. Bez niego późniejszy agent, poproszony o dostrojenie innej umiejętności liczbami człowieka, nie znalazłby tam odmowy.
4. „Zwinny odskok”, trzecia gałąź walki, zachowuje dwa stopnie po 1 punkcie. Zadanie podaje ceny tylko dwóch gałęzi, a jego sformułowanie „trzy drzewa walki i ich dwie gałęzie” czyta się jako te dwie; obniżenie także gałęzi uniku wymagałoby liczby, której zadanie nie podaje.
5. Cykl dodał test ekranu „Postać”, który sprawdza liczbę stopni dwóch gałęzi walki, ponad dwa testy wskazane w zadaniu. Same testy symulacji nie odróżniają gałęzi o dwóch stopniach od gałęzi o trzech, bo punkty kończą się, zanim da się zażądać ostatniego stopnia, więc błędny trzeci stopień „Cięższego kopu” by przeszedł. Cena: ten test jest związany z brzmieniem wiersza gałęzi.
## Koszt

Około 1 h 04 min czasu pracy, z czego 43 min oczekiwania na narzędzia, na dwóch modelach (orkiestrator i recenzenci na Sonnecie, autor na Haiku; około 33,8 mln tokenów, z czego 32,6 mln to wejście z pamięci podręcznej, 178 tys. wyjścia). Rundy przeglądu: jeden przegląd całej zmiany z jedną poprawką trzech drobnych uwag i jednym przeglądem tej poprawki; jeden przegląd scalenia z gałęzią docelową; jedno sprawdzenie ekranu w działającej grze. Tabela etapów jest w zatwierdzonym zapisie cyklu, z odnośnikiem w części „Przebieg cyklu”.

## Jak scalić

Scal commitem scalającym, który zachowuje commity (bez squasha i bez rebase), bo odnośnik do zapisu cyklu przeżywa tylko wtedy.

</details>

## Technical changes

- **Data and its tests (`6e7e95e7`).** In `src/browser/sim/data/skills.ts` the thresholds of „Walka bronią jednoręczną” become 15, 40, 100, 300, of „Kopanie” 10, 30 and of „Unik przed ciosem” 4, 15, and the prices of „Mocniejszy cios” `[1, 1, 1, 1]` and of „Cięższy kop” `[1, 1]`; the previews are unchanged and stay coherent (6 + 4 × 2 = 14, 3 + 2 × 1 = 5). `tests/sim/skills.test.mjs`: the table of thresholds, the purchase of „Cięższy kop” (second purchase succeeds, third refused), the combat tests (14 damage, practice 300) and one new test of four ranks with the fifth purchase refused; expectations come from the decision, not from the code's output. The tests were changed first and were seen failing for the expected reasons before the data changed.
- **A test of the screen (`8f8b911c`).** `tests/view/character-skills.test.mjs` gets one test that reads the rows of the two branches at 3/4 → 4/4 and 1/2 → 2/2 from the data. A mutant with a third price for „Cięższy kop” fails it and passes the simulation test alone; this is the one gap of the simulation tests that the cycle closed.
- **The decision (`fb3313f9`, `52772de3`).** D-379 in `foundations/decisions.md`, see *Foundation entries*.
- **The merge (`7a279745`).** `origin/main` moved during the cycle (task `raport-z-wyplata`, 21 files); the merge was clean and reviewed. It holds the union of both sides; the other side states no combat number.
- Not changed: `src/browser/sim/saved-game.ts` (it reads the number of ranks from the data; a branch's rank above its number of prices is refused, and no old save held „Cięższy kop” above its first rank), the pin of the process, any screen code.

## Checks

- **The gate:** `npm test` on the merged tree `7a279745` — exit 0: build ok, Node tests 2259 pass and 0 fail, Python tests 14 + 231 + 257 + 40 OK, `foundation_check.py` 0 errors; "542 tests in 4 directories; every directory passed". A first run on the tree before the merge was stopped by the orchestrator before it ended, because `main` had moved and the final tree would differ; it gave no result.
- **Failing on the base, not in this change:** `npm test` on `1b0c8ad4` before any change exited 1: two tests of `tests/quality/test_quality_invariants.py` (`test_ruff_source_rules`, `test_shellcheck_source_rules`) failed with "file not found", because the new worktree had no `.runs/quality-venv` (the pinned `ruff` and `shellcheck`); everything else passed. On the final tree the venv was present (copied from the main checkout, which is ignored by git), and both pass.
- **Own-work checks:** the author's: the table of thresholds (red then green), the fourth rank of „Mocniejszy cios” (14 damage, fifth purchase refused — refused by points, so the rank cap itself is seen on the screen), „Cięższy kop” (two mutant runs: three prices failed only the screen test); prettier, eslint and `foundation_check.py` exit 0. The reviewer of the whole change ran 15 hand-made mutants of the thresholds and prices: all changed numbers are caught; a mutant of an unchanged „Zwinny odskok” price is caught by neither of the two test files (already so before this change). StrykerJS on `skills.ts` made 0 mutants, so it judged nothing.
- **Screen states:** screen Postać, seen in the running game at `7a279745` with a made-up account and a composed game state (the game's own state with the wolf met; not reached by playing): rows 0/4 and 0/2 with next points at 15, 10, 4; after „Kup” on every rank 4/4 „teraz 14 obrażeń” and 2/2 „teraz 5 obrażeń”, „Zwinny odskok” 2/2 „teraz 7 obrażeń”; „Kup” visible and disabled at a full rank; no clipped text or overlap at 1280×1400; no console errors. Not looked at: a narrow window, the focus and hover states of „Kup”, reaching those practice values by play. Screenshots: the two images above, in the public repository for screenshots.
- **Reviews:** whole change `PASS 8f8b911c` (0 blocking, 3 Minor, all fixed); review of the fix `PASS 52772de3`; review of the merge `PASS 7a279745`.
- **The form check:** pending.
- **The check of private paths on the description:** pending.
- **The check of private paths on the copy of the record:** pending.
- **The check of image files on the copy of the record:** pending.
- **The remarks check on the original and on the copy:** pending.

## Foundation entries

- **D-379 (the cycle's change of an entry the task named):** changed in place, with *Verification* and *Rationale* updated — the skills „Walka bronią jednoręczną” (15, 40, 100, 300), „Kopanie” (10, 30) and „Unik przed ciosem” (4, 15) give a point at those amounts of practice, „Mocniejszy cios” has four ranks and „Cięższy kop” two, each at 1 point; the numbers of the three combat trees are no longer the old game's and are to be corrected either way. Its *Rejected* keeps the settled ways and, narrowed to the other skills, the old refusal of numbers the human gives instead of the old game's. Marked the task's.
- **D-144 (the cycle's):** one clause in its *Rationale* says the ranks of „Mocniejszy cios” and „Cięższy kop” are D-379's, not the old game's.
- No invariant test altered, no surface altered, no *Violated* mark set or cleared; nothing in *Settlements to record* (none were accepted).

## Minor findings

none — the three Minor findings of the review of the whole change (D-144 rationale over-claiming, D-379's *Rejected* line replaced, D-379's *Rationale* wording describing the change) were fixed in `52772de3` and the fix passed its review with no new finding.

## Findings outside the task's scope

none

## Course of the cycle

- **Task and sources:** an independent task, "lower the thresholds of the combat trees and set the ranks of the combat branches to the points"; its document (updated 2026-11-13) and the decisions D-379, D-191, D-199.
- **Process pin:** `55afa8e57aa1b83c77108576a36642722e0dda15`, not moved.
- **Spec:** none — the task settles every number; no open design choice.
- **Route:** one author without a plan, class `cheaper` (Haiku), the default for ordinary implementation; reviews by Sonnet, no cheaper than the orchestrator.
- **Plan:** none.
- **Choices:** 2 rows in the questions table of the record (the reading of "two branches" as the two that change; carrying the five unread decisions to the fixing author); the record's link is below.
- **Blocking findings left:** none.
- **Record:** pending the commit that adds it.
