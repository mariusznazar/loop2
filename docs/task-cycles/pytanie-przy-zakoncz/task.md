---
title: Pytanie „Zapisać, odrzucić, wrócić?” przy „Zakończ”
status: draft
created: 2026-11-06
updated: 2026-11-07
tags: [zadanie]
related: "[[(P) Loop]]"
---

# Pytanie „Zapisać, odrzucić, wrócić?” przy „Zakończ”

Status: ready for cycle
Project relation: plan item: plan_mvp2_loop2.md — pytanie-przy-zakoncz

## Description

### Need

- Dziś „Zakończ” kończy ręczne przejście od razu, a niezapisane zmiany kopii przepadają razem z nim (obecny D-173: „„Zakończ” ends the map run at once, and the copy's unsaved changes go with it”).
- Nowy gracz z raportu rozpoznania stracił tak regułę, dzięki której rozwiązał mapę: „z programu zniknęła reguła „Zasil — ognisko”, dzięki której wygrałem. „Zakończ” nie ostrzegł, że zmiany w kopii przepadną.” (`rozpoznanie_mvp2/rozpoznanie_nowy_gracz.md:178`).
- Definicja projektu ma w zakresie: „Ostrzeżenie przy „Zakończ”: pytanie „Zapisać, odrzucić, wrócić?”, gdy kopia programu ma niezapisane zmiany (NG8).”
- Cel zadania w planie: „„Zakończ” przy niezapisanych zmianach kopii pyta „Zapisać, odrzucić, wrócić?” i robi to, co gracz wybierze, a bez niezapisanych zmian kończy przejście od razu.”
- Projekt ma sprawić, żeby Mariusz zaczął grać w loop2 i rozwiązywał mapy własnym programem; program, który wygrał, nie może znikać bez słowa.

### To do

1. „Zakończ” ręcznego przejścia, którego kopia ma niezapisane zmiany, nie kończy przejścia, tylko stawia pytanie „Zapisać, odrzucić, wrócić?” z trzema odpowiedziami — w każdej chwili przejścia: gdy biegnie, w pauzie, w pauzie przy odkryciu, po śmierci postaci i po rozwiązaniu mapy.
   - Kopia ma niezapisane zmiany, gdy różni się od programu, z którego ją wzięto albo w którym ją ostatnio zapisano, albo gdy jej program zniknął z listy (D-171, D-168).
   - Pytanie stoi w pasie nad programem, jak pas odkrycia (D-122): zdanie „Zapisać, odrzucić, wrócić?” w roli `warning`, a obok przyciski „Zapisz”, „Odrzuć” i „Wróć”, w tej kolejności (pytanie 4).
   - „Odrzuć” jest przyciskiem niszczącym: w spoczynku neutralny, pod kursorem i przy fokusie w `danger`; „Zapisz” i „Wróć” są zwykłymi przyciskami (pytanie 5, D-44 w brzmieniu, które zadanie zapisuje).
   - Gdy program kopii ma zmiany, których nie ma w kopii (D-172), pod zdaniem pytania stoi linia „Program {nazwa} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.” (pytanie 3).
   - Gdy stoi też pas odkrycia — w pauzie przy odkryciu i po rozwiązaniu mapy w minucie odkrycia (D-122) — pas pytania stoi pod nim, tuż nad nagłówkiem kopii „Kopia: {imię}” i jej linią „Niezapisane zmiany w kopii.” (pytanie 8).
2. „Zakończ” bez niezapisanych zmian kończy przejście od razu i prowadzi na ekran Postać tej postaci, jak dziś (D-53).
3. „Zapisz” zapisuje kopię w jej programie, tak jak „Zapisz w programie”, i kończy przejście; gracz trafia na ekran Postać tej postaci (pytanie 1, D-53).
   - Gdy program kopii ma zmiany, których nie ma w kopii, „Zapisz” zapisuje jednym klikiem i je zastępuje, tak jak „Zapisz w programie” (pytanie 3, D-172).
   - Gdy program kopii usunięto w trakcie przejścia, „Zapisz” zapisuje kopię jako nowy program pod pierwszą wolną nazwą, bez pola nazwy, i od razu kończy przejście; kopia należy potem do nowego programu, który staje się programem użytym przez postać ostatnio, tak jak po „Zapisz jako nowy program” (pytanie 2, D-171).
4. „Odrzuć” kończy przejście bez zapisu: zmiany kopii przepadają, program zostaje taki, jaki był, a gracz trafia na ekran Postać tej postaci (pytanie 1, D-53).
5. „Wróć” zamyka pytanie, a przejście trwa dalej na tym samym ekranie, z kopią ze zmianami i bez zapisu, w stanie sprzed „Zakończ”: przejście, które biegło, biegnie dalej, a wstrzymane zostaje wstrzymane (pytania 1 i 6).
6. Póki pytanie stoi, przejście jest wstrzymane jak po „Pauza” (pytanie 6).
   - Wyjście z ekranu przejścia zamyka pytanie jak „Wróć”, a przejście staje, jak przy każdym wyjściu (D-283) (pytanie 6).
   - Pytanie żyje tylko w pamięci strony: po przeładowaniu go nie ma, a przejście wraca jak każde wczytane (D-212) (pytanie 6).
   - Póki pytanie stoi, reszta ekranu działa jak zwykle, a pytanie znika, gdy traci sens (pytanie 7):
     - „Wznów” — z nagłówka albo z pasa odkrycia — zamyka pytanie jak „Wróć” i rusza przejście; „Restart” zamyka pytanie jak „Wróć” i robi to, co robi bez pytania.
     - Gdy kopia przestaje mieć niezapisane zmiany — po „Zapisz w programie”, „Zapisz jako nowy program”, „Porzuć zmiany”, „Przełącz postać na ten program” albo po edycji, po której kopia nie różni się już od swojego programu — pytanie znika, a przejście zostaje wstrzymane; gracz rusza je wtedy „Wznów” albo kończy „Zakończ”, który kończy od razu (To do 2).
     - Przyciski tempa, ponowny „Zakończ” i edycja kopii, po której kopia dalej ma niezapisane zmiany, zostawiają pytanie, jak stoi.
     - Tak samo na ekranach po śmierci postaci i po rozwiązaniu mapy: póki pytanie stoi, przejście się jeszcze nie skończyło, więc edycja kopii i przyciski panelu kopii działają dalej (D-173 w brzmieniu projektowanym, czytane jak w pytaniu 7).
7. Po zakończeniu przejścia którąkolwiek drogą edytor programu pokazuje program, do którego należy kopia (D-173 w brzmieniu projektowanym); po „Zapisz” przy usuniętym programie jest nim nowy program (D-171).
8. W przewodniku stylu (`guidelines/styleguide-browser-view.md`, reguła „States of shared controls”, lista przycisków niszczących w wierszu 232) lista wymienia też „Odrzuć” pytania „Zapisać, odrzucić, wrócić?”, tak jak D-44 w brzmieniu, które zadanie zapisuje (pytanie 5).

### Questions to settle

1. Co robią trzy odpowiedzi, gdy program kopii stoi na liście programów?
   - Answer: „Zapisać” zapisuje kopię w jej programie, tak jak „Zapisz w programie”, i kończy przejście; gracz trafia na ekran Postać tej postaci. „Odrzucić” kończy przejście bez zapisu; zmiany kopii przepadają, program zostaje taki, jaki był; gracz trafia na ekran Postać. „Wrócić” zamyka pytanie; przejście trwa dalej na tym samym ekranie, kopia ze zmianami zostaje, nic się nie zapisuje.
   - Source: Mariusz, 2026-11-06, „przyjmuję zgodnie z rekomendacjami” — przyjęta propozycja pytania Q1 rozmowy zadania 12 (`C:\Storage\repos\loop2\.runs\project-refinement\pytanie-przy-zakoncz.md`, tury 2 i 11); propozycja miała jeden wariant. Odpowiedź mówi, co robi każda z trzech odpowiedzi, o czym zatwierdzone zdanie D-173 („acts on the answer”) milczy, więc dostaje linię w dzienniku zmian planu (zasada planu z 2026-11-03, stosowana także do odpowiedzi, która wypełnia milczenie zatwierdzonego zdania — rozstrzygnięcie rundy V2, tura 14 rozmowy); propozycja z tury 2 podawała koszt „żaden ponad samo zadanie” i tej linii nie wymieniała. Część ze źródła: definicja `definicja_mvp2_loop2.md` (sha256 efc19197…, odcisk 9641f804), D-53, wiersz 541: „„Zakończ” returns to the screen Postać of that character.”; D-173, wiersz 841: „„Zakończ” with unsaved changes of the copy, at any moment of a map run, asks „Zapisać, odrzucić, wrócić?” and acts on the answer, and with none it ends the map run at once; after it the program editor shows the program the copy belongs to.”
2. Co robi „Zapisać”, gdy program kopii usunięto w trakcie przejścia (D-168: zostaje wtedy tylko „Zapisz jako nowy program”)?
   - Answer: „Zapisać” zapisuje kopię jako nowy program pod pierwszą wolną nazwą i od razu kończy przejście; nazwę gracz zmienia potem „Zmień nazwę” na ekranie Programy.
   - Not chosen:
     - B. „Zapisać” otwiera pole nazwy, jak „Zapisz jako nowy program”, a przejście kończy się dopiero po zapisie tej nazwy — drugi krok w pytaniu (pole, odmowa zajętej nazwy, „Zapisz”), czyli więcej do zbudowania i sprawdzenia; gracz za to od razu nazywa program; linia w dzienniku planu jak przy A.
     - C. W tym przypadku pytanie nie ma „Zapisać”, tylko „Odrzucić” i „Wrócić”; gracz wraca i sam klika „Zapisz jako nowy program” — pytanie ma raz trzy, raz dwie odpowiedzi, a gracz musi sam znaleźć, gdzie zapisać; zatwierdzone zdanie D-173 przestaje być prawdą dla tego przypadku, więc potrzebna jest zmiana definicji i jej ponowne zatwierdzenie, a potem ponowne sprawdzenie planu; do tego czasu żadne zadanie nie dostaje „ready for cycle”.
   - Source: Mariusz, 2026-11-06, „przyjmuję zgodnie z rekomendacjami” — pytanie Q2 rozmowy zadania 12, droga A, w brzmieniu z tury 8 (tura 11 zapisuje odpowiedź); koszt drogi A w tym pytaniu: gracz nie wybiera nazwy, jeden klik jak w zwykłym przypadku, linia w dzienniku zmian planu, bo odpowiedź mówi więcej niż zatwierdzone zdanie D-173.
3. Co robi „Zapisać”, gdy program kopii ma zmiany, których nie ma w kopii (D-172)?
   - Answer: „Zapisać” zapisuje i zastępuje te zmiany, a w pytaniu, pod jego zdaniem, stoi ta sama linia co przy przyciskach zapisu panelu kopii: „Program {nazwa} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.”
   - Not chosen:
     - B. „Zapisać” zapisuje i zastępuje te zmiany bez słowa w pytaniu — gracz, który nie widzi panelu kopii, traci bez ostrzeżenia zmiany zrobione w programie.
     - C. Pytanie daje wtedy dwie drogi zapisu: „Zapisz w programie” i „Zapisz jako nowy program” — więcej do zbudowania; pytanie ma wtedy cztery odpowiedzi, więc zatwierdzone zdanie D-173 przestaje być prawdą dla tego przypadku i potrzebna jest zmiana definicji i jej ponowne zatwierdzenie, a potem ponowne sprawdzenie planu; do tego czasu żadne zadanie nie dostaje „ready for cycle”.
   - Source: Mariusz, 2026-11-06, „przyjmuję zgodnie z rekomendacjami” — pytanie Q3 rozmowy zadania 12, droga A, w brzmieniu z tury 8; uzasadnienie rekomendacji: D-164 przy loop2 `5694146`, „saving a copy over a program that changed since the copy was taken from it or last saved into it is announced, never blocked”; koszt drogi A: jedno zdanie więcej w pytaniu w tym rzadkim przypadku i linia w dzienniku zmian planu.
4. Gdzie stoi pytanie i jak brzmią jego przyciski?
   - Answer: W pasie nad programem, jak pas odkrycia (D-122): zdanie „Zapisać, odrzucić, wrócić?” w roli `warning` i trzy przyciski „Zapisz”, „Odrzuć”, „Wróć”, w kolejności zdania. Pytanie stoi w jednym miejscu przez całe przejście i po jego końcu, przy kopii, której dotyczy, i nie zależy od tego, gdzie zadania 14 i 16 postawią „Zakończ”; wpis o układzie ekranu przejścia zostaje bez dopisku, a plan bez zmiany.
   - Not chosen:
     - A. W miejscu „Zakończ”: póki pytanie stoi, zamiast tego przycisku stoi zdanie w `warning` i trzy przyciski, a pytanie idzie za „Zakończ” przez zadania 14 i 16 — w nagłówku wiersz jest już długi, a zadanie 14 dokłada pasek warunku mapy, więc w węższym oknie wiersz może się złamać; zdanie D-311 o nagłówku przestaje być prawdą, póki pytanie stoi, więc zadanie dopisuje zdanie do wpisu o układzie, dołącza do jego wiersza w planie, a plan ustawia zadania 12 i 14 jedno po drugim; przeniesienie pytania do prawego obszaru jest pracą zadania 16; za to odpowiedź stoi tam, gdzie gracz kliknął.
     - C. Okno nad ekranem — zasłania ekran, czego fundament dotąd unikał (wpis o układzie, *Rejected*: „the pick of an action in a window over the screen, as in loop — it hides what the character needs”); nowy rodzaj elementu do zbudowania i opisania w przewodniku stylu.
   - Source: Mariusz, 2026-11-06, „przyjmuję zgodnie z rekomendacjami” — pytanie Q4 rozmowy zadania 12, droga B z napisami „Zapisz”, „Odrzuć”, „Wróć”, w brzmieniu z tury 8; koszt drogi B: wzrok skacze z miejsca „Zakończ” na środek ekranu, a przy pauzie na odkryciu stoją dwa pasy naraz; każda droga miejsca mówi więcej niż zatwierdzone zdanie D-173, więc odpowiedź dostaje linię w dzienniku zmian planu. Napisy przycisków miały jedną propozycję.
5. Czy przycisk odrzucenia jest przyciskiem niszczącym (D-44)?
   - Answer: Tak — „Odrzuć” jest przyciskiem niszczącym. D-44 stoi już w fundamencie, zapisany przez zadanie 5, które jest zrobione, więc zadanie 12 dopisuje „Odrzuć” do listy przycisków niszczących w zdaniu wiążącym i do przykładów naruszenia w *Verification* (brzmienie pod *Decisions in play*), dołącza do wiersza D-44 w planie, a zapisującym zostaje zadanie 5; przewodnik stylu dostaje jedną linię w tej samej liście.
   - Not chosen:
     - B. „Odrzuć” jest zwykłym przyciskiem — D-44, plan i przewodnik bez zmiany, ale przycisk, który gubi program, wygląda na bezpieczny, dokładnie to, co D-44 odrzuciło przy „Przełącz postać na ten program” („a button that … can drop the copy's unsaved changes would look like a safe one”).
   - Source: Mariusz, 2026-11-06, „przyjmuję zgodnie z rekomendacjami” — pytanie Q5 rozmowy zadania 12, droga A, w brzmieniu z tury 8; koszt drogi A: dopisek do D-44, wiersz planu („4, 5 | 5” → „4, 5, 12 | 5”), linia w dzienniku zmian planu i linia w przewodniku stylu.
6. Co dzieje się z czasem przejścia, póki pytanie stoi, i co z pytaniem przy wyjściu z ekranu przejścia i po przeładowaniu strony?
   - Answer: Pytanie wstrzymuje przejście jak „Pauza”, a „Wróć” przywraca stan sprzed „Zakończ”: przejście, które biegło, biegnie dalej, a wstrzymane zostaje wstrzymane. Wyjście z ekranu przejścia zamyka pytanie jak „Wróć” (a przejście staje, jak przy każdym wyjściu, D-283), a pytanie żyje tylko w pamięci strony — po przeładowaniu go nie ma, a przejście wraca jak każde wczytane (D-212).
   - Not chosen:
     - B. Pytanie wstrzymuje przejście, a „Wróć” zostawia je wstrzymane; gracz rusza dalej „Wznów” — jeden klik więcej po „Wróć”; najprostsze do zbudowania; ta sama linia w dzienniku planu co przy A.
     - C. Czas płynie dalej — postać może zginąć albo rozwiązać mapę, póki pytanie stoi; ekran pod pytaniem zmienia się w trakcie decyzji.
   - Source: Mariusz, 2026-11-06, „przyjmuję zgodnie z rekomendacjami” — pytanie Q6 rozmowy zadania 12, droga A z dopowiedzeniem o wyjściu z ekranu i przeładowaniu, w brzmieniu z tury 5; koszt drogi A: gra musi pamiętać, czy przejście biegło; pauza przy pytaniu i dopowiedzenie mówią więcej niż zatwierdzone zdanie D-173, więc linia w dzienniku zmian planu. Dopowiedzenie miało jedną propozycję.
7. Co robią, póki pytanie stoi, „Wznów” (w nagłówku i w pasie odkrycia), „Restart”, przyciski tempa, ponowny „Zakończ”, edycja kopii i przyciski panelu kopii („Zapisz w programie”, „Zapisz jako nowy program”, „Porzuć zmiany”, „Przełącz postać na ten program”)?
   - Answer: Reszta ekranu działa jak zwykle, a pytanie znika, gdy traci sens. „Wznów” (z nagłówka albo z pasa odkrycia) i „Restart” zamykają pytanie jak „Wróć” i robią swoje — tak samo pas odkrycia znika przy „Wznów” (D-122). Gdy kopia przestaje mieć niezapisane zmiany, pytanie znika, a przejście zostaje wstrzymane. Tak jest po „Zapisz w programie”, „Zapisz jako nowy program”, „Porzuć zmiany” albo przełączeniu postaci, a także po edycji, po której kopia nie różni się już od swojego programu. Gracz rusza wtedy „Wznów” albo kończy „Zakończ”, który teraz kończy od razu. Tempo i ponowny „Zakończ” zostawiają pytanie, jak stoi. Edycja kopii też je zostawia, chyba że po niej kopia nie ma już niezapisanych zmian — wtedy pytanie znika jak po zapisie. Pierwsze zdanie zatwierdzonego D-173 („On the screens after a character's death and after a completion, editing the copy, „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” act as during the map run until the player picks „Restart” or „Zakończ”.”, definicja, wiersz 841) czyta się tak, że „picks „Zakończ”” to zakończenie przejścia, które przy niezapisanych zmianach następuje dopiero po odpowiedzi; przy tym odczycie zdanie zostaje prawdziwe.
   - Not chosen:
     - B. Póki pytanie stoi, reszta ekranu nie działa: przyciski nagłówka i panelu kopii są nieaktywne, a kopii nie da się edytować; działają tylko trzy odpowiedzi i wyjście z ekranu, które zamyka pytanie jak „Wróć” — trzeba zbudować stan nieaktywny dla wielu przycisków naraz; ekran zachowuje się jak okno, tylko bez zasłaniania; gracz, który chce sam nazwać nowy program, musi najpierw kliknąć „Wróć”; przy przyjętym odczycie pierwszego zdania D-173 edycja kopii i przyciski panelu po końcu przejścia nie działałyby, więc zdanie przestałoby być prawdą: zmiana definicji i jej ponowne zatwierdzenie, a potem ponowne sprawdzenie planu; do tego czasu żadne zadanie nie dostaje „ready for cycle”.
     - C. Reszta ekranu działa jak zwykle, a pytanie stoi, aż gracz odpowie — najprostsze do zbudowania, ale po „Wznów” pytanie wisi nad biegnącym przejściem, choć miało je wstrzymywać (pytanie 6), a po zapisie w panelu albo po edycji, która cofa ostatnią zmianę, pyta o zmiany, których już nie ma.
   - Source: Mariusz, 2026-11-06, „tu również wszystko zgodnie z rekomendacjami” — pytanie Q7 rozmowy zadania 12 (`C:\Storage\repos\loop2\.runs\project-refinement\pytanie-przy-zakoncz.md`), droga A, w brzmieniu z tury 15 (tura 16 zapisuje odpowiedź); koszt drogi A: kilka przypadków do zbudowania i sprawdzenia, za to gracza nic nie blokuje — może na przykład zapisać kopię pod własną nazwą przez „Zapisz jako nowy program” i dopiero potem kliknąć „Zakończ”; odpowiedź mówi więcej niż zatwierdzone zdanie D-173, które zostaje prawdziwe, więc dostaje linię w dzienniku zmian planu (`plan_mvp2_loop2.md`, linia z 2026-11-06 o pytaniach Q7 A i Q8 B). Odczyt pierwszego zdania D-173 był rekomendacją project orchestratora, przyjętą razem z drogą A; nie wybrany odczyt „kliknięcie” — „picks „Zakończ”” to samo kliknięcie — robiłby to zdanie nieprawdą przy drogach A i C i wymagałby zmiany definicji.
8. W jakiej kolejności stoją pas pytania i pas odkrycia, gdy stoją oba — przy pauzie na odkryciu i po rozwiązaniu mapy w minucie odkrycia (D-122)?
   - Answer: Pas pytania stoi pod pasem odkrycia, tuż nad nagłówkiem kopii i jej linią „Niezapisane zmiany w kopii.”; nic, co już stoi, się nie przesuwa poza samym programem, a pytanie stoi przy kopii, której dotyczy.
   - Not chosen:
     - A. Pas pytania nad pasem odkrycia — pas odkrycia zjeżdża w dół o wysokość pytania, póki pytanie stoi; za to pytanie stoi bliżej nagłówka z „Zakończ”.
   - Source: Mariusz, 2026-11-06, „tu również wszystko zgodnie z rekomendacjami” — pytanie Q8 rozmowy zadania 12, droga B, w brzmieniu z tury 12 (tura 16 zapisuje odpowiedź); koszt drogi B: pytanie stoi o jeden pas dalej od „Zakończ”; odpowiedź mówi więcej niż zatwierdzone zdanie D-173, więc wchodzi do tej samej linii w dzienniku zmian planu co pytanie 7.

## Context

- „Zakończ” stoi w nagłówku ekranu przejścia jako przycisk niszczący (`src/browser/view/run-header.tsx:84-88`) i woła `end` (`src/browser/view/game-view.ts:339-347`), który kończy przejście i porzuca kopię (`src/browser/sim/game.ts:446-470`); `end` woła tylko to jedno miejsce.
- Miarę niezapisanych zmian liczy `copyHasUnsavedChanges` (`src/browser/sim/programs.ts:595`), a zapisy i odrzucenie robią `saveCopyIntoProgram` (`:628`), `saveCopyAsNewProgram` (`:653`, z nazwą podaną przez gracza) i `discardCopyChanges` (`:695`); wszystkie działają też po śmierci i po rozwiązaniu mapy.
- Panel kopii z linią „Niezapisane zmiany w kopii.”, przyciskami zapisu i linią z D-172 stoi w `src/browser/view/program-panel.tsx:549-592`; „Zapisz jako nowy program” otwiera tam pole nazwy z pierwszą wolną nazwą (D-171).
- Pas odkrycia, wzór pasa pytania, rysuje `src/browser/view/discovery-band.tsx`; ekran przejścia stawia go na górze kolumny programu, nad panelem programu (`src/browser/view/run-screen.tsx:139-148`).
- Wybór tempa nie rusza pauzy (`setPace`, `src/browser/sim/game.ts:484-490`).
- Testy, które dziś sprawdzają „Zakończ” bez pytania, stoją m.in. w `tests/view/account-screen.test.mjs` (przypadki od wiersza 2396, 2629, 3518, 3810, 4271, 4313).
- Raport nowego gracza proponował brzmienie „Zapisać w programie, odrzucić, wrócić?” (`rozpoznanie_mvp2/rozpoznanie_nowy_gracz.md:256`); zatwierdzona definicja skróciła je do „Zapisać, odrzucić, wrócić?”.
- Zadanie 16 (koniec przejścia) zależy od tego zadania.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

Wpisy obecne cytuje `foundations/decisions.md` przy loop2 `5694146` (fundament taki sam jak przy `b97fdd0`). Wpisy projektowane cytuje `definicja_mvp2_loop2.md`, zatwierdzona 2026-11-03, odcisk 9641f804. Przydział pochodzi z sekcji *Projected entries* planu (`plan_mvp2_loop2.md`): D-173 urzeczywistnia i pisze zadanie 12 („| 12 | 12 |”); D-44 urzeczywistniają zadania 4, 5 i 12, a pisze go zadanie 5 („| 4, 5, 12 | 5 |”).

### Zadanie zapisuje w całości

- D-173 — What can the player do with the copy after a map run ends? (definicja): „On the screens after a character's death and after a completion, editing the copy, „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” act as during the map run until the player picks „Restart” or „Zakończ”. „Zakończ” with unsaved changes of the copy, at any moment of a map run, asks „Zapisać, odrzucić, wrócić?” and acts on the answer, and with none it ends the map run at once; after it the program editor shows the program the copy belongs to.”
  - *Rationale* (definicja): „the screens after an end show the state that explains it, which is where the player finds the fix, so the copy stays open to editing and saving until the player leaves it. Unsaved changes can be the very rule that won the map, and their silent loss costs far more than one click. Accepted with it: one more click at every end of a map run holding unsaved changes.”
  - *Rejected* (definicja): „„Zakończ” acting at once with unsaved changes, the line „Niezapisane zmiany w kopii.” alone warning of it — a winning program lost without a word; the copy closed to saving once the map run ends — a fix found after a death would be made anew in the program.”
  - *Verification* i *Origin* mają w definicji `TODO`, więc cykl ustala je przy zapisie; obecna *Verification* („violates: … „Zakończ” asking whether to save the copy”) przestaje być prawdą.
  - Obecne brzmienie: „„Zakończ” ends the map run at once, and the copy's unsaved changes go with it; after „Zakończ” the program panel shows the program the copy belongs to.”
  - Odpowiedzi na pytania 1–4 i 6–8 mówią więcej niż zatwierdzone zdanie, które zostaje prawdziwe; dziennik zmian planu ma dla nich dwie linie z 2026-11-06 (pytania Q1, Q2 A, Q3 A, Q4 B i Q6 A; pytania Q7 A i Q8 B). Pierwsze zdanie czyta się tak, że „picks „Zakończ”” to zakończenie przejścia, które przy niezapisanych zmianach następuje dopiero po odpowiedzi (pytanie 7). Co z tych odpowiedzi cykl wpisuje do D-173, mówią wiersze 1–8 *Settlements to record*; brzmienia D-173 z tymi odpowiedziami ten dokument nie podaje.

### Zadanie dopisuje do wpisu zapisanego przez inne zadanie

- D-44 — Which controls do the screens of the browser view build on? (obecny, zapisany przez zadanie 5, które jest zrobione): „the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program” and „Zatrzymaj” are destructive buttons, neutral until the pointer or the focus reaches them and then in `danger`.”; *Verification*, violates: „„Usuń” made as a plain button; „Porzuć zmiany”, „Przełącz postać na ten program” or „Zatrzymaj” made as a plain button”.
  - Brzmienie, które zadanie zapisuje (pytanie 5), w zdaniu wiążącym od „and the buttons”: „and the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program” and „Zatrzymaj”, and „Odrzuć” of the question „Zapisać, odrzucić, wrócić?” (D-173), are destructive buttons, neutral until the pointer or the focus reaches them and then in `danger`.”
  - Wśród przykładów naruszenia w *Verification* dochodzi: „„Odrzuć” of the question „Zapisać, odrzucić, wrócić?” made as a plain button”; reszta wpisu bez zmian.
  - Zatwierdzone zdanie D-44 w definicji (wiersz 526) zostaje prawdziwe, ale mówi mniej niż odpowiedź; plan ma dołączenie zadania 12 do wiersza D-44 (zapisującym zostaje zadanie 5) i jego linię w dzienniku zmian z 2026-11-06.

### Obecne decyzje, których zadanie dotyka bez zmiany

- D-164 — Who owns a program?: „A change made during a map run goes into the copy and reaches the program only when the player saves it there or as a new program, or is dropped when the player discards it or switches the character to another program; saving a copy over a program that changed since the copy was taken from it or last saved into it is announced, never blocked.”
- D-168 — What becomes of a map run whose copy's program the player deletes?: „„Zapisz w programie” and „Porzuć zmiany” are then gone, and the copy counts as holding unsaved changes: the line „Niezapisane zmiany w kopii.” stands and „Zapisz jako nowy program” is active until the copy is saved as a new program.”
- D-171 — How does the program panel show the copy and its unsaved changes?: „„Zapisz jako nowy program” offers the first free name of a program, and after that save the copy belongs to the new program, which becomes the program the character used last.”
- D-172 — How does the game announce a save of the copy over a program that changed?: „While the program the copy belongs to holds changes made since the copy was taken from it or last saved into it, a line in the role `warning` beside the save buttons reads „Program {name} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.”; „Zapisz w programie” then saves at once, in one click, and after the save the line is gone.”
  - *Rejected*: „a window asking to confirm the save — one more click at every such save”.
- D-53 — Where does the player send a character from, and where does „Zakończ” lead?: „„Zakończ” returns to the screen Postać of that character.”
- D-62 — What does the screen show, and what can the player do, after a character's death?: „the player has „Restart”, which starts the map run again with the same seed from game minute zero, and „Zakończ”, which returns to the screen D-53 gives.”
- D-132 — What does the screen show, and what can the player do, after a completion?: „„Pauza” and the pace buttons are gone, and the player has „Restart” and „Zakończ” as after a character's death.”
- D-283 — What happens to a manual map run when the player leaves its screen?: „Leaving the screen of a manual map run pauses it as „Pauza” does.”
- D-21 — How does time pass in a map run the player starts?: „A map run the player starts passes at one game minute per real second times the pace the player picks of 1×, 2×, 4×, 8× and 16×, and the player can pause and resume it.”
- D-122 — What does a map run do, and what does the player see, when something is discovered?: „A band in the role `discovery` above the program names what was discovered and the program rule the game wrote, the discoveries of one game minute in one band, with „Dodaj regułę z tym” and „Wznów”, whose „Wznów” goes on as the „Wznów” of the header does, and it stands until the player goes on, the scene keeping its colours. Where the map run ends in a completion in the game minute of a discovery, the screen after the completion takes the place of the pause, and the band stands, with no „Wznów”, until „Restart” or „Zakończ”.” — wzór pasa pytania (pytanie 4) i drugi pas, który może stać obok niego (pytania 7 i 8).
- D-311 — How is the screen of a map run laid out? (obecny): „The header holds the character's name, the map's name and after them the whole status row in its order: the text of the game minute, the character's activity and the numbers of the solving condition, „Pauza” or „Wznów”, the pace, „Restart”, the warning of a cut trip plan and „Zakończ”.” — pas pytania stoi nad programem (pytanie 4), więc to zdanie zostaje prawdziwe, a zadanie wpisu nie zmienia.
- (new) — How is the screen of a map run laid out? (definicja, pisze zadanie 14): „The header holds the character, the map, the clock, a bar of the solving condition with its numbers, and the pace.”; *Rejected*: „the pick of an action in a window over the screen, as in loop — it hides what the character needs” — pas pytania stoi w kolumnie programu, jak pas odkrycia, więc zdanie wpisu zostaje prawdziwe (pytanie 4).
- (new) — What does the end of a map run explain? (definicja, pisze zadanie 16, które zależy od tego zadania): „The end of a map run takes the right area of its screen […] The buttons stand in sight while the sections scroll.” — pas pytania stoi nad programem także po śmierci postaci i po rozwiązaniu mapy, więc nie idzie za przyciskami końca w prawym obszarze (pytanie 4).
- D-303 — Does deleting a program rule or a rule group ask first?: „A program rule and a rule group are deleted at once, at the click, with no question.”
- D-212 — How does a manual map run come back from a loaded saved game state?: „A manual map run of a loaded saved game state that goes on comes back at the game minute of the save, paused”.
- Niezmiennik `copy-save`: „„Zapisz w programie” and „Zapisz jako nowy program” leave the content of the copy a map run carries out and the map run's streak as they were”.

## Settlements to record

Candidates: 9 shown, 8 accepted — 2026-11-06

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Przy programie kopii na liście „Zapisz” zapisuje kopię w jej programie, tak jak „Zapisz w programie”, i kończy przejście, a gracz trafia na ekran Postać tej postaci; „Odrzuć” kończy przejście bez zapisu, a program zostaje taki, jaki był; „Wróć” zamyka pytanie, a przejście trwa dalej na tym samym ekranie z kopią ze zmianami. | decision | pytanie 1 | Co wpisać w D-173 i w jego *Verification* (w definicji `TODO`) o każdej z trzech odpowiedzi, skoro zatwierdzone zdanie mówi tylko „acts on the answer”. |
| 2 | Przy programie kopii usuniętym w trakcie przejścia „Zapisz” zapisuje kopię jako nowy program pod pierwszą wolną nazwą i od razu kończy przejście. | decision | pytanie 2 | Czy „Zapisz” przy usuniętym programie otwiera pole nazwy, zapisuje bez niego, czy znika z pytania. |
| 3 | Gdy program kopii ma zmiany, których nie ma w kopii, pod zdaniem pytania stoi linia „Program {nazwa} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.”, a „Zapisz” je zastępuje. | decision | pytanie 3 | Czy pytanie ostrzega o zmianach programu, których panel kopii w tej chwili nie pokazuje, czy zapisuje bez słowa. |
| 4 | Pytanie stoi w pasie nad programem, jak pas odkrycia, ze zdaniem „Zapisać, odrzucić, wrócić?” w `warning` i przyciskami „Zapisz”, „Odrzuć” i „Wróć”. | decision | pytanie 4 | Gdzie postawić pytanie (nagłówek, pas, okno) i jak podpisać przyciski. |
| 5 | Pytanie wstrzymuje przejście jak „Pauza”, a „Wróć” przywraca stan sprzed „Zakończ”: przejście, które biegło, biegnie dalej, a wstrzymane zostaje wstrzymane. | decision | pytanie 6 | Czy przy pytaniu czas płynie i czy „Wróć” rusza przejście z powrotem. |
| 6 | Wyjście z ekranu przejścia zamyka pytanie jak „Wróć”, a pytanie żyje tylko w pamięci strony, więc po przeładowaniu go nie ma. | decision | pytanie 6 | Czy pytanie zapisać w stanie gry i czy po powrocie na ekran przejścia ma stać dalej. |
| 7 | Póki pytanie stoi, „Wznów” i „Restart” zamykają je jak „Wróć” i robią swoje, a gdy kopia przestaje mieć niezapisane zmiany — po zapisie, porzuceniu, przełączeniu postaci albo po edycji, po której kopia nie różni się już od swojego programu — pytanie znika, a przejście zostaje wstrzymane; tempo i ponowny „Zakończ” zostawiają pytanie, a edycja kopii też, chyba że po niej kopia nie ma już niezapisanych zmian. | decision | pytanie 7 | Czy reszta ekranu działa, póki pytanie stoi, i czy pytanie przetrwa „Wznów”, zapis w panelu kopii albo edycję, która cofa ostatnią zmianę. |
| 8 | Gdy stoją oba pasy, pas pytania stoi pod pasem odkrycia, nad nagłówkiem kopii. | decision | pytanie 8 | Kolejność pasa pytania i pasa odkrycia. |

## Out of scope

none
