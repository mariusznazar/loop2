# Pętla zarobkowa na mapie rozwiązanej i doliczanie czasu nieobecności

Status: ready for cycle
Project relation: plan item: plan_mvp_loop2.md — petla-zarobkowa

## Description

### Need

- Dziś każde przejście mapy uruchamia gracz i w grze trwa naraz jedno: stan gry trzyma jedno przejście (`GameState.run`, `src/browser/sim/types.ts:336`, loop2 `95de83b`).
- Gdy gra jest zamknięta, nic się w niej nie dzieje.
- Gracz nie ma więc jak puścić dopracowanego programu na mapę, którą już rozwiązał, i wrócić nazajutrz po to, co postać zarobiła.
- Po zadaniu 14 ręczne przejście mapy rozwiązanej nic nie płaci i nic nie bierze ze skrzynki, więc bez pętli postać po pierwszym domknięciu mapy nie ma z czego rosnąć ani skąd znosić przedmiotów.
- Projekt MVP loop2 obejmuje „Pętla zarobkowa na mapie rozwiązanej, w czasie realnym, poza regulatorem prędkości; doliczanie nieobecności po powrocie (D22, D23).” (definicja, In scope, punkt 20).
- Obejmuje też część punktu 8: pętla wykonuje kopię programu wziętą na swoim starcie.
- Cel projektu wymienia „pętlę na mapie rozwiązanej, w których postać nabiera wprawy i zbiera przedmioty”.

### To do

1. Gracz puszcza postać w pętlę zarobkową przyciskiem „Puść w pętlę”, który stoi w wierszu postaci w siedzibie przy każdej mapie rozwiązanej, obok „Wyślij”; klik od razu puszcza postać programem z listy „Program:” tego wiersza (Q1).
   - Na mapie nierozwiązanej pętli nie ma (test loop `src/sim/sim.test.ts:1509`).
   - Postać ma najwyżej jedną pętlę (test loop `src/sim/sim.test.ts:1520`), a kilka postaci chodzi w pętlach równolegle, obok jednego ręcznego przejścia (D-55; odpowiedź P3).
2. Pętla idzie minuta gry na minutę realną, a regulator prędkości jej nie dotyczy; ta liczba stoi w danych balansu (D-18).
   - Pauza ręcznego przejścia nie zatrzymuje pętli innych postaci (odpowiedź P1), także zatrzymanie przy odkryciu, które jest tą samą pauzą (D-122: “the map run stops in the same pause as after „Pauza””).
   - Ekran po końcu ręcznego przejścia też nie zatrzymuje pętli innych postaci (odpowiedź Q17).
3. Pętla wykonuje kopię programu wziętą na swoim starcie, z programu, który pokazuje lista „Program:” w wierszu postaci (D-170).
   - Ten program staje się programem użytym ostatnio przez postać i tym, z którym postać ostatnio weszła na mapę, a wybór w wierszu się czyści, jak przy wysłaniu.
   - Zmiana programu po starcie pętli jej nie dosięga i działa od następnego startu pętli (test loop `src/sim/loop.test.ts:157`).
   - Usunięcie programu zostawia pętlę na kopii (D-164, D-168).
   - Postaci w pętli nie da się przełączyć na inny program (odpowiedź P2), a kopii pętli nie da się poprawić, zapisać ani porzucić (test loop `src/sim/policy.test.ts:587`).
4. Każde przejście pętli jest osobnym przejściem i zaraz po domknięciu albo po śmierci z gotowym wskrzeszeniem startuje następne, na tej samej kopii (odpowiedź Q16).
   - Ziarno następnego przejścia pochodzi z losowania przejścia poprzedniego, z generatora tego rodzaju losowania, nigdy z czasu realnego (test loop `src/sim/sim.test.ts:1720`).
   - Pierwsze przejście pętli bierze nowe ziarno, jak każde wysłanie postaci, z ostatniego ziarna i czasu realnego (odpowiedź Q10).
5. Na każdym starcie przejścia pętli plan wyprawy kopii wiąże się od nowa: lista „Zabierz” bierze ze skrzynki drużyny, także na mapie rozwiązanej, a to, czego w skrzynce brakuje, nie wchodzi (D-179; testy loop `src/sim/chest.test.ts:350`, `:369`).
   - Pętla idzie dalej przycięta.
6. Przejście pętli płaci łupem przy domknięciu, według zamrożonej listy „Wynieś” (D-179).
   - Wprawa domkniętych przejść zbiera się przy pętli, poza umiejętnościami postaci, i wchodzi do nich przy zatrzymaniu pętli, razem z wprawą przejścia w toku, jeśli postać żyje (odpowiedź Q5; testy loop `src/sim/sim.test.ts:1630`, `:1645`).
   - Przejście zakończone śmiercią nie płaci ani łupem, ani wprawą, a to, co pętla zebrała wcześniej, zostaje przy pętli, gdy śmierć pokryje wskrzeszenie (test loop `src/sim/sim.test.ts:1561`).
7. Śmierć w pętli liczy się jak każda śmierć (wpis „What does a character's death take?”): gotowe wskrzeszenie nie ratuje przejścia, które kończy się śmiercią, tylko zużywa się, a pętla idzie dalej następnym przejściem (odpowiedź Q16).
   - Śmierć bez gotowego wskrzeszenia zatrzymuje pętlę i zabiera też wprawę zebraną przy pętli (odpowiedź Q13).
8. Gracz zatrzymuje pętlę przyciskiem niszczącym „Zatrzymaj” (tekst w `danger`, jak „Zakończ”), a klik działa od razu, bez pytania (odpowiedź Q5).
   - Postać wraca do zwykłego wiersza, a w nim do następnego wysłania albo puszczenia tej postaci stoi w roli `text-secondary` linia „Pętla zatrzymana · wprawa: {umiejętność} +{n}, …”.
   - Linia wraca po wczytaniu stanu gry (wiersz 7 *Settlements to record*).
   - Gdy pętla nie zebrała wprawy, linia brzmi samo „Pętla zatrzymana” (odpowiedź Q18).
   - Przedmioty niesione w przejściu w toku przepadają, a jego łup nie trafia do skrzynki (definicja, *Verification* wpisu „What pays, and what takes from the chest?”: “while its loot stays out”; D-183).
   - Gracz nie ogląda przerwanego przejścia: to nazwane odejście od loop (test loop `src/sim/sim.test.ts:1622`).
9. W wierszu postaci w pętli stoi jedna linia w roli `text`, „Pętla: {mapa} · przejście {n} · minuta {m} · domknięte {k}”, i przycisk „Zatrzymaj” (odpowiedź Q2).
   - Mapy przejścia pętli nie da się otworzyć: to nazwane odejście od loop (odpowiedź Q20; testy loop `src/sim/sim.test.ts:1622`, `:1685`).
   - Licznik zadziałań reguł (D-93) nie obejmuje pętli, więc panel programu jej nie pokazuje.
   - Start pętli nie rusza liczników, które zostawiło ręczne przejście (wiersz 4 *Settlements to record*).
   - Przy postaci w pętli „Wyślij” i „Puść w pętlę” są nieczynne i gracz najpierw zatrzymuje pętlę: to nazwane odejście od loop (odpowiedź Q3; testy loop `src/sim/sim.test.ts:1667`, `:1680`).
   - Przy postaci w pętli „Kup” działa, a kupiony stopień działa od następnego przejścia tej pętli, bo trwające zachowuje umiejętności ze swojego startu (odpowiedź Q4).
10. Zapis stanu gry niesie chwilę realną z zegara przeglądarki, od której liczy się nieobecność (odpowiedź Q8; test loop `src/sim/sim.test.ts:1970`).
    - Serwer zostaje bez zmian: kolumny na tę chwilę nie ma i nie przybywa.
    - Tym samym zegarem zadanie 14 liczy odnowienie wskrzeszenia.
    - Zmiana kształtu stanu gry podnosi `SAVED_GAME_VERSION` (`guidelines/coding-saved-game.md`, „Wersja podnoszona razem z kształtem”), więc zapisy starszej wersji przepadają w całości (D-206).
11. Po wczytaniu stanu gry — po zalogowaniu, przeładowaniu strony, po przegranej z zapisem innej przeglądarki (D-209) i po zalogowaniu na to samo konto ze stanem zachowanym w pamięci strony (D-211) — gra dolicza opuszczone minuty pętli: pełne minuty od chwili zapisu do teraz, a reszta krótsza niż minuta czeka na następną minutę pętli (test loop `src/sim/sim.test.ts:2020`).
    - Listę tych chwil niesie wiersz 25 *Settlements to record*.
    - Wczytanie samo niczego nie dolicza: doliczanie jest osobnym krokiem po nim (D-212; `guidelines/coding-saved-game.md`).
    - Doliczanie nie ma górnej granicy minut: to nazwane odejście od loop (odpowiedź Q7; testy loop `src/sim/sim.test.ts:2015`, `:2026`).
    - Zegar cofnięty przed chwilę zapisu daje zero minut i nie zabiera niczego, a zegar pętli rusza wtedy od teraz (testy loop `src/sim/sim.test.ts:2017`, `:2028`).
12. Doliczanie bierze postacie po kolei, każdą do końca, w kolejności listy postaci (D-54; test loop `src/sim/loop.test.ts:44`).
    - Postacie stykają się na granicach przejść: przedmiot trafia do skrzynki przy domknięciu, następne przejście bierze to, co w niej zastanie, a gdy miejsca starczy dla łupu jednej postaci, bierze go postać wcześniejsza na liście.
    - Pętla zatrzymana śmiercią nie zatrzymuje doliczania pozostałych postaci (test loop `src/sim/loop.test.ts:79`).
13. Doliczanie rusza od stanu wczytanego: ręczne przejście, które trwało, stoi na pauzie w minucie zapisu i się nie przesuwa, a przejście zakończone domknięciem albo śmiercią zostaje na ekranie po swoim końcu (odpowiedź P1, D-212).
14. Śmierć w doliczanej minucie zna swoją chwilę realną — chwila zapisu plus minuty od niej — więc wskrzeszenie zużyte w trakcie nieobecności odnawia się od tej chwili i może pokryć kolejną śmierć tej samej nocy (D-04, *Rationale*: “real time passed in as an argument keeps the earning loop, the catch-up and the renewal of a resurrection on one footing”; test loop `src/sim/sim.test.ts:1848`).
15. Przejście pętli dziś niczego nie odkrywa: Zrozumienie i program zostają, czas nie staje i gra nie dopisuje reguły z D-123, a gracz odkryje to w ręcznym przejściu (odpowiedź Q9).
16. Po powrocie gracz dostaje raport w sekcji „Gdy cię nie było” w siedzibie, nad „Drużyna”, po jednej linii na postać, która miała pętlę (odpowiedź Q6).
    - Najpierw pętle, które stanęły, w `danger`: „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”
    - Potem pozostałe, w `text`: „{imię}: {m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa: {umiejętność} +{n}”, puste części pominięte, z dopiskiem „ · wskrzeszenie zużyte”, gdy śmierć pokryło wskrzeszenie.
    - Pod nimi, gdy skrzynka jest pełna, „Skrzynka jest pełna.” w `warning`.
    - Jeden przycisk „Zamknij” zamyka całą sekcję: to nazwane odejście od loop, gdzie zamyka się raport każdej postaci (odpowiedź Q21; test loop `src/sim/sim.test.ts:1743`).
    - Raport leży w stanie gry, więc przeżywa przeładowanie.
    - Kolejny powrót przed „Zamknij” dodaje się do raportu (wiersz 22 *Settlements to record*).
    - Sekcja pokazuje się od jednej pełnej doliczonej minuty, a pętla, która stanęła, otwiera ją przy każdej liczbie minut (test loop `src/sim/loop.test.ts:91`–`92`; wiersz 23 *Settlements to record*).
    - Pętla, która stanie przy otwartej grze, trafia do tej samej sekcji (wiersz 24 *Settlements to record*), a jej linia nie podaje minut: „{imię}: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.” (odpowiedź Q19).
    - Gdy w sekcji stoją same takie pętle, tytuł brzmi „Pętle, które stanęły”, a gdy jest w niej choć jedna linia z powrotu, zostaje „Gdy cię nie było” (odpowiedź Q19).
    - Gracz, który wraca do ręcznego przejścia, zobaczy raport w siedzibie po „Zakończ” (wiersz 26 *Settlements to record*).
    - W linii pętli, która idzie dalej, {m} to minuty doliczone (test loop `src/sim/sim.test.ts:1732`).
    - W linii pętli, która stanęła po powrocie, {m} to też minuty doliczone, czyli tyle, ile pętla przerobiła w doliczaniu, zanim stanęła, nie ile minęło od zapisu (odpowiedź Q19; test loop `src/sim/sim.test.ts:1811`).
    - Każda postać liczy własną zmianę w skrzynce (test loop `src/sim/loop.test.ts:134`), a przyrost wprawy pochodzi z tego doliczania (testy loop `src/sim/sim.test.ts:1592`, `src/sim/chest.test.ts:535`).
17. Rytm 30 sekund realnych obowiązuje ręczne przejście, a pętle zapisują się przy czynnościach gracza, po końcu każdego swojego przejścia i przy ukryciu strony (odpowiedź Q11).
    - „Puść w pętlę”, „Zatrzymaj” i „Zamknij” raportu są zmianami stanu, których dokonuje gracz, więc idą do listy czynności z D-207.
    - Limit 64 KiB zostaje, a gra nie ogranicza liczby pętli (odpowiedź Q12).
    - Linia z D-208 brzmi „Nie udało się zapisać postępu: stan gry jest za duży. Zatrzymaj pętle albo usuń niepotrzebne programy.”
18. Lista map oznacza ręczne przejście mapy rozwiązanej, które nie przewiduje pętli (wpis „What pays, and what takes from the chest?”; odpowiedź Q14).
    - Warunek: mapa jest rozwiązana, a któraś pozycja listy „Zabierz” programu z wiersza, po przycięciu udźwigiem i pułapem wnoszenia, przekracza zapas w skrzynce.
    - W wierszu postaci przy tej mapie, pod „Wyślij”, w roli `warning`, jak linia przycięcia z D-188, stoi: „Próba weźmie zapas, którego nie ma w skrzynce — pętla zarobkowa go nie dostanie.”
19. Krok fundamentu cyklu zapisuje wpisy przydzielone temu zadaniu i dopisuje części, które prawdziwymi czyni jego kod (*Decisions in play*).
    - Gdy cykl przychodzi po zadaniu 14, opiera się na tym, co zadanie 14 wpisało do D-189, D-190 i D-194.
    - Usuwa z D-194 przyjęty koszt stanu sprzed pętli, który zadanie 14 wpisuje do zmiany tej decyzji (cała drużyna ma najwyżej dwie wypłaty wprawy i dwie łupu, a nowa postać nie ma skąd wziąć wprawy), bo pętla ten stan kończy.
    - Zmienia też wpisy, które zmieniają odpowiedzi tego zadania; lista stoi w *Decisions in play*.

### Questions to settle

Odpowiedziane wcześniej, przeniesione tu ze źródeł:

- P1. Czy doliczanie nieobecności przesuwa ręczne przejście, które trwało, gdy gra się zamknęła?
  - Answer: nie — doliczanie rusza od stanu wczytanego, w którym to przejście stoi na pauzie, a pauza ręcznego przejścia nie zatrzymuje pętli zarobkowych innych postaci. Przejście wraca w minucie zapisu, zatrzymane pauzą, z tempem z zapisu; czas nieobecności go nie przesuwa — ani przed tym zadaniem, ani po nim; gracz rusza je przyciskiem „Wznów”. Przyjęty koszt: jedno kliknięcie po każdym wczytaniu z trwającym przejściem oraz dwa wymogi dla tego zadania — kolejność „najpierw wczytanie, potem doliczanie” i pauza ręcznego przejścia, która nie zatrzymuje pętli innych postaci.
  - Not chosen:
    - (pytanie 8 zadania 16) B — przejście wraca dokładnie w stanie z zapisu, biegnie dalej, jeśli biegło; czas nieobecności go nie przesuwa — gracz logujący się na innym urządzeniu może przegapić odkrycie, napaść albo śmierć postaci w pierwszych sekundach.
    - (pytanie 8 zadania 16) C — od zadania 18 doliczanie przesuwa też trwające ręczne przejście o czas nieobecności (w jakim tempie — do ustalenia w zadaniu 18), a do tego czasu przejście wraca jak w A — przejście, które gracz rozwiązuje jak zagadkę i ogląda (uzasadnienie D-21: “so the player still watches the program act”), domyka się albo kończy śmiercią postaci pod jego nieobecność; przy 1× zamknięcie karty na 8 minut kończy przejście Lasu; zadanie 18 dostaje dodatkowy wymóg.
    - (pytanie 15 zadania 16) A — odpowiedź 8 zostaje, a definicja dostaje ją teraz: proces definicji zmienia oba wpisy o doliczaniu — decyzja dostaje zdanie “The catch-up does not advance a manual map run: a manual map run that was going on when the game closed returns at the game minute of its last save, paused, with its saved pace.”, a niezmiennik `catch-up-state/1` obejmuje tylko postać „outside a manual map run”; zadanie 16 dołącza w planie do urzeczywistniających decyzję o doliczaniu — zmiana zatwierdzonej definicji otwiera na nowo jej bramkę gotowości (niezależna krytyka zmiany, przeszukanie całego fundamentu pod kolizje, zgoda człowieka na zmienione wpisy, nowy odcisk definicji), a po niej ponowne sprawdzenie całego planu z krytyką; do ich końca nie rusza żaden cykl zadania planu (wtedy 9, 10 i 13 `ready for cycle`) i żadne zadanie nie staje się gotowe; do tego zmiana wiersza planu z jej krytyką.
    - (pytanie 15 zadania 16) C — odpowiedź 8 zostaje, definicja teraz bez zmian, wiersz 8 tylko dla tego zadania („… do zadania 18 nic się nie dolicza”), plan dostaje pytanie otwarte dla zadania 18, a kolizję rozstrzyga refinement zadania 18 — jak w B zmiana planu z krytyką i potwierdzeniem człowieka; do refinementu zadania 18 definicja mówi szerzej niż odpowiedź; jeśli tam okaże się, że kolizja jest, ta sama zmiana definicji z bramką przyjdzie wtedy; zasada człowieka o powrocie rewizji do dokumentu, który nosi decyzję, świadomie odłożona do zadania 18.
    - (pytanie 15 zadania 16) D — powrót do drogi C pytania 8: od zadania 18 doliczanie przesuwa też trwające ręczne przejście, do tego czasu przejście wraca jak w A; wpisy definicji zostają, a wiersz 8 kończy się na „do zadania 18 nic się nie dolicza” — przejście, które gracz rozwiązuje jak zagadkę i ogląda, domyka się albo kończy śmiercią postaci pod jego nieobecność, w tempie, które ustali zadanie 18: w tempie ręcznego przejścia przy 1× przejście Lasu kończy się już po 8 minutach nieobecności, w tempie pętli po 8 godzinach.
  - Source: plan `plan_mvp_loop2.md` (sha256 7eb77bdd1418, wersja z drzewa roboczego notatek; ostatni commit planu 1facfdf9), Open questions, linia 166, i dziennik zmian, linia 290; dokument zadania 16 `_zadania/zapis_stanu_na_serwerze_loop2.md`, pytania 8 i 15. Człowiek: Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji” (pytanie 8, droga A) i „przyjmuję zgodnie z rekomendacjami” (pytanie 15, droga B); ponowne sprawdzenie planu: „potwierdzam”.
- P2. Czy postać w pętli zarobkowej może przełączyć program w trakcie pętli?
  - Answer: nie; pętla wykonuje kopię wziętą na swoim starcie, a przełączanie definicja dopuszcza tylko w trakcie ręcznego przejścia.
  - Source: plan, Open questions, linia 165 (human, 2026-10-28), i dziennik zmian, linia 255: droga C pytania Q17 rozmowy refinementu zadania 8, Mariusz, 2026-10-28, „przyjmują rekomendacje dla 7”, doprecyzowane „tak chodzi o Q16 - Q18; źle przeczytałem”; zdanie definicji, „(new) — Who owns a program?”: “during a manual map run the player can switch the character to another program”. Drogi niewybrane tamtej rozmowy nie stoją w dokumentach, które przetrwały, więc tu ich nie ma.
- P3. Czy po zadaniu 18 ręczne przejście dalej ma trwać jedno naraz?
  - Answer: tak: w całym MVP jedno ręczne przejście naraz, a zadanie 18 dokłada obok niego pętle zarobkowe, które chodzą równolegle; jeśli zadanie 18 zechce też równoległych ręcznych przejść, zmienia ten wpis jawnie. To zadanie tego nie zmienia (D-55).
  - Source: [zamrożony opis zadania 11](https://github.com/mariusznazar/loop2/blob/d1d35ac74758abf70ad7875b072ad7d22ce848aa/docs/task-cycles/siedziba-i-druzyna/task.md), pytanie 12; Mariusz, 2026-10-24: „przujmuję tak jak rekomendujesz razem z wierszem 5”. Pytanie pokazało jedną drogę, więc *Not chosen* nie ma.
- P4. Czy kandydaci do fundamentu z tego zadania biorą zasadę brzmienia?
  - Answer: tak — zasada obowiązuje zadania gry 14 i 18. Zastrzeżenie: „to są elementy na potrzeby mvp / docelowo się zmienią, więc chciałbym uniknąć sytuacji w której decyzje będą kategorycznie zabraniać alternatyw” (Mariusz, 2026-10-24); zakaz: kandydat nie zawiera słów „tylko”, „nigdy”, „zawsze”, „bez” ani innych, które wykluczają alternatywę, a wykluczenia trwające dłużej niż zadanie opisują to, czego gra dziś nie ma. Zatwierdzone wpisy projektowane zostają w swoim brzmieniu; zasada dotyczy wierszy *Settlements to record*.
  - Source: plan, dziennik zmian, linia 277 (Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji”), odpowiedź osobna dla zadań 14, 17, 18 i 21; `_zadania/plan_wyprawy_loop2.md`, pytanie Q9. Dziennik nie zapisuje dróg tej osobnej odpowiedzi, więc *Not chosen* nie ma.
- P5. Czy liczby z danych loop są wymaganiem tego zadania?
  - Answer: tak, tam, gdzie loop je ma: refiner pokazuje ich tabelę do wglądu (*Context*) i pyta tylko o to, czego loop nie rozstrzyga.
  - Source: plan, dziennik zmian, linia 277 (Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji”).
- P6. Czy testy loop wiążą tak jak liczby z jego danych?
  - Answer: Droga A — testy wiążą jak liczby: rozstrzygają to, co pokrywają, a odejście od nich jest nazwaną decyzją. Słaby punkt nazwany w pytaniu: wchodzą też zachowania, których nikt świadomie nie wybierał. Odpowiedź wiąże zadania gry 14 i 18.
  - Not chosen:
    - B — testy są tylko materiałem — około dziesięciu punktów dostaje własne pytanie, a definicja traktuje znaczące odejście od loop jako obalenie celu.
  - Source: Mariusz, 2026-10-30, „przyjmuję wszystko zgodnie z rekomendacjami” (pakiet rundy zadań 14, 17, 18 i 21, pytanie W1); plan, dziennik zmian, linia 300; definicja, Inputs and constraints, linia 72, i Success, linia 89.

Odpowiedzi rundy 2026-10-30:

- Q1. Gdzie i jakim przyciskiem gracz puszcza postać w pętlę zarobkową?
  - Answer: Droga A — przy każdej mapie rozwiązanej, obok „Wyślij”, stoi przycisk „Puść w pętlę”; klik od razu puszcza postać programem z listy „Program:”. Słaby punkt nazwany w pytaniu: kolejny przycisk w długim wierszu.
  - Not chosen:
    - B — osobna sekcja siedziby „Pętle” z wyborem postaci, mapy i programu — drugie miejsce wysyłania postaci i kilka razy więcej widoku.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D14). Materiał: definicja, „(new) — Who owns a program?”: “a character picks a program when it enters a map — by default the one it used last”; D-53; D-170; `src/browser/view/headquarters.ts:213`–`237`, loop2 `95de83b`.
- Q2. Co gracz widzi z trwającej pętli?
  - Answer: Droga A — w wierszu postaci jedna linia „Pętla: {mapa} · przejście {n} · minuta {m} · domknięte {k}” i przycisk zatrzymania; mapy pętli nie da się otworzyć, a licznik zadziałań reguł nie obejmuje pętli. Słaby punkt nazwany w pytaniu: gracz nie zobaczy, co postać robi ani dlaczego zginęła, a reguła „licznik w każdym przejściu” dostaje wyjątek. Podgląd może dojść później bez przeróbki pętli.
  - Not chosen:
    - B — A plus przycisk „Podgląd” z mapą do oglądania — drugi rodzaj ekranu przejścia i duży kawałek cyklu.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D15). Materiał: test loop `src/sim/policy.test.ts:587`; D-55; D-93; koncepcja §5; `src/browser/view/game-view.ts:236`, loop2 `95de83b`.
- Q3. Co robi „Wyślij” przy postaci, która chodzi w pętli?
  - Answer: Droga A, nazwane odejście od loop — „Wyślij” i „Puść w pętlę” są nieczynne, gracz najpierw zatrzymuje pętlę. Słaby punkt nazwany w pytaniu: jedno kliknięcie więcej.
  - Not chosen:
    - B — jak w loop: „Wyślij” sam zatrzymuje pętlę, a jedno kliknięcie po cichu gubi plecak przejścia w toku.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D16). Testy loop, od których zadanie odchodzi: `src/sim/sim.test.ts:1667`, `:1680`.
- Q4. Co robi „Kup” przy postaci, która chodzi w pętli, i od kiedy działa kupiony stopień gałęzi?
  - Answer: Droga A — „Kup” działa, a stopień działa od następnego przejścia pętli, bo trwające zachowuje umiejętności ze swojego startu. Słaby punkt nazwany w pytaniu: drobna zmiana przyjętej reguły kupowania (D-200).
  - Not chosen:
    - B — „Kup” nieczynny: żeby wydać punkty, gracz gubi plecak przejścia w toku.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D17). Materiał: D-200, D-194; testy loop tego nie pokrywają.
- Q5. Co dokładnie robi zatrzymanie pętli i co gracz wtedy widzi?
  - Answer: Co płaci — cytat zostawiony przez człowieka: wprawa zebrana przy pętli i wprawa przejścia w toku wchodzą do umiejętności, a łup tego przejścia zostaje na mapie. Definicja, „(new) — What pays, and what takes from the chest?”: “Practice earned during an earning loop is gathered there and added to the character skills when the loop stops, including practice from a run stopped before its completion without death.” *Verification*, complies: “stopping an earning loop in the middle of a map run adds the practice of that map run, while its loot stays out”. *Rationale*: “Loot leaves a map in the character's backpack, so a map run that did not complete brought nothing out; paying the earning loop's practice at its stop keeps the player fixing the program rather than waiting for a completion.”
  - Answer: Co gracz widzi — droga A, nazwane odejście od loop: przycisk niszczący „Zatrzymaj” (tekst w `danger`, jak „Zakończ”), bez pytania; postać wraca do zwykłego wiersza, a w nim stoi w roli `text-secondary` „Pętla zatrzymana · wprawa: {umiejętność} +{n}, …” do następnego wysłania albo puszczenia tej postaci. Słaby punkt nazwany w pytaniu: gracz nie obejrzy przerwanego przejścia.
  - Not chosen:
    - B — jak w loop: przejście zostaje do obejrzenia, ale to trzeci rodzaj końca przejścia i zajmuje miejsce jedynego ręcznego przejścia.
  - Source: definicja (sha256 fda97782458d, Status approved 2026-10-29), linie 1457–1459, 1471–1472, 1483–1485; Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycje C7 i D18). Test loop, od którego zadanie odchodzi: `src/sim/sim.test.ts:1622`.
- Q6. Gdzie gracz czyta raport z nieobecności, co w nim stoi i jak go zamyka?
  - Answer: Droga A — sekcja „Gdy cię nie było” w siedzibie, nad „Drużyna”, po jednej linii na postać, którą zamyka jeden przycisk „Zamknij”; brzmienia, kolejność i zasady stoją w *To do* 16. Słaby punkt nazwany w pytaniu: nowa sekcja i nowy kawałek stanu gry, a sekcja pojawia się od jednej doliczonej minuty, więc także po krótszym przeładowaniu.
  - Not chosen:
    - B — A, ale zamykanie przy każdej postaci, jak w loop — tyle kliknięć, ile postaci.
    - C — jedna linia dla całej drużyny — gracz nie wie, której postaci co się stało.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D19). Materiał: testy loop `src/sim/sim.test.ts:1732`–`1743`, `:1811`, `src/sim/report.test.ts:7`, `src/sim/loop.test.ts:134`, `src/sim/chest.test.ts:527`, `:535`; koncepcja §5: „zbiorczy raport z nocy (najpierw pętle, które stanęły, bo tylko one wymagają ręki gracza)”; D-39; D-96.
- Q7. Czy doliczanie ma górną granicę minut, a jeśli tak, jaką?
  - Answer: Droga B, nazwane odejście od loop — bez granicy. Słaby punkt nazwany w pytaniu: po wielu miesiącach strona stoi kilka sekund na postać (pomiar na krótkich przejściach, a telefon i dłuższe przejścia będą wolniejsze), a zegar przestawiony o lata daje postęp tylko we własnej grze, co decyzje już przyjmują. Granicę można dodać później, gdy gra dojrzeje i będzie zmieniać definicję z innego powodu.
  - Not chosen:
    - A — granica 7 dni, resztę tracimy; liczba była propozycją refinera — zmiana zatwierdzonej definicji, czyli bramka gotowości i ponowne sprawdzenie planu; do ich końca żadne zadanie nie stanie się gotowe i nie ruszy żaden cykl.
    - C — inna liczba — koszt jak w A.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D20). Definicja: “The catch-up takes place when the player returns and advances the missed game minutes”. Testy loop, od których zadanie odchodzi: `src/sim/sim.test.ts:2015`, `:2026`.
- Q8. Czyim zegarem liczy się chwilę zapisu: przeglądarki czy serwera?
  - Answer: Droga A — zegar przeglądarki, jak w loop; chwila leży w stanie gry, a tym samym zegarem zadanie 14 liczy odnowienie wskrzeszenia. Słaby punkt nazwany w pytaniu: zły zegar urządzenia dolicza za dużo albo zero minut, a gracz może oszukać, co decyzje już przyjmują dla własnego postępu.
  - Not chosen:
    - B — zegar serwera — nowa wersja bazy kont z krokiem człowieka na serwerze, zmiana dwóch decyzji, a otwarta karta i tak idzie zegarem przeglądarki, więc w grze byłyby dwa zegary.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D21). Materiał: D-04; D-07, *Rationale*: “Players can replace their own saved game states and forge their own progress. The MVP accepts that cost”; definicja, Out of scope; test loop `src/sim/sim.test.ts:1975`.
- Q9. Co dzieje się, gdy postać w przejściu pętli spotka coś, czego gracz jeszcze nie odkrył?
  - Answer: Droga A — przejście pętli niczego nie odkrywa, a gracz odkryje to w ręcznym przejściu. Definicja zostaje. Słaby punkt nazwany w pytaniu: postać spotkała głód, a gra tego nie zapisała. Na rozwiązanej mapie odkryć jest mało, a nic ich nie traci.
  - Not chosen:
    - B — odkrycie wchodzi od razu, a raport je nazywa — niezmiennik doliczania przestaje być prawdziwy, więc potrzebna jest zmiana definicji z bramką.
    - C — odkrycia czekają w raporcie i wchodzą przy jego zamknięciu; pomysł krytyka, spoza źródeł — kolejny kawałek stanu gry; definicja zostaje.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D22). Materiał: D-118, D-119, D-122, D-123; definicja, `catch-up-state/1`; testy loop tego nie pokrywają.
- Q10. Skąd bierze ziarno pierwsze przejście pętli?
  - Answer: Nowe, jak przy każdym wysłaniu postaci. Zdanie definicji, że przejście pętli bierze ziarno z poprzedniego, dotyczy dalszych przejść, bo pierwsze poprzedniego nie ma, więc definicja nie wymaga zmiany.
  - Source: pozycja C8 pakietu rundy, zostawiona przez człowieka (Mariusz, 2026-10-30, „przyjmuję rekomendacje”), pod odpowiedzią P6. Test loop `src/sim/sim.test.ts:1464`: „`startLoop` bierze ziarno pierwszego przejścia z `freshSeed()`, czyli z prawdziwego losu”. Pokazana jako odpowiedź ze źródła, bez dróg, więc *Not chosen* nie ma.
- Q11. Czy same pętle, bez ręcznego przejścia, zapisują stan gry na serwerze co 30 sekund realnych?
  - Answer: Droga A — nie: rytm 30 sekund ma ręczne przejście, a pętle zapisują się przy czynnościach gracza, po każdym swoim przejściu i przy ukryciu strony. Słaby punkt nazwany w pytaniu: zmiana jednego zdania reguły zapisu (D-207).
  - Not chosen:
    - B — bez zmian: karta zostawiona na noc to około 1440 zapisów na dobę; przy jednej pętli niczego nie chronią, bo doliczanie odtworzy ten sam przebieg.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D23). Materiał: D-207; `src/browser/view/game-saver.ts:24`, `:198`, loop2 `95de83b`.
- Q12. Co gra robi, gdy stan gry z wieloma pętlami przestaje mieścić się w limicie 64 KiB zapisu?
  - Answer: Droga A — limit zostaje, gra nie ogranicza liczby pętli, a komunikat brzmi „Nie udało się zapisać postępu: stan gry jest za duży. Zatrzymaj pętle albo usuń niepotrzebne programy.” Słaby punkt nazwany w pytaniu: przy kilku pętlach zapis staje, dopóki gracz którejś nie zatrzyma; limit mieści najwyżej około 10 pętli na Lesie albo 8 na Lesie — głębiej, a w praktyce mniej.
  - Not chosen:
    - B — gra dopuszcza najwyżej N pętli naraz — reguła, której definicja nie ma, i nowa liczba do ustalenia.
    - C — cykl odchudza zapis pętli — dłuższy cykl, bardziej złożone wczytanie i brak gwarancji progu.
    - D — wyższy limit — przeglądarka nie wyśle przy zamykaniu karty więcej niż 64 KiB, więc ostatni zapis by przepadał.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D24). Materiał: D-207, D-208, D-104; fakt `fetch-keepalive-body-quota`; definicja, In scope: „w drużynie dowolnie wiele postaci”.
- Q13. Co dzieje się z wprawą zebraną przy pętli, gdy śmierć bez wskrzeszenia ją zatrzyma?
  - Answer: Przepada razem z resztą.
  - Source: pozycja C9 pakietu rundy, zostawiona przez człowieka (Mariusz, 2026-10-30, „przyjmuję rekomendacje”), pod odpowiedzią P6. Test loop `src/sim/chest.test.ts:550`: „noc zatrzymana śmiercią bez wskrzeszenia nie niesie przyrostu wprawy”; `src/sim/death.test.ts:48`. Definicja, linia 1526: “so a night can be lost”. Pokazana jako odpowiedź ze źródła, bez dróg, więc *Not chosen* nie ma.
- Q14. Czy oznaczenie na liście map, że ręczne przejście mapy rozwiązanej nie przewiduje pętli zarobkowej, robi zadanie 14, czy to zadanie, a jeśli to zadanie, jaki ma warunek, tekst i rolę? (pytanie kanoniczne: Q5 rozmowy refinementu zadania 14)
  - Answer: Droga B — to zadanie, które wnosi pętlę i może użyć jej nazwy z ekranu; warunek, tekst i rola stoją w *To do* 18. Słaby punkt nazwany w pytaniu: do scalenia tego zadania próba bierze zapas bez słowa, ale nie ma jeszcze czego przewidywać, a droga odchodzi od zdania dokumentu zadania 13, który człowiek przyjął.
  - Not chosen:
    - A — zadanie 14 robi oznaczenie — warunek: mapa rozwiązana, a któraś pozycja listy „Zabierz” programu z wiersza, po przycięciu udźwigiem i pułapem wnoszenia, przekracza zapas w skrzynce; tekst: „Próba weźmie zapas, którego nie ma w skrzynce — pętla zarobkowa go nie dostanie.”, w wierszu postaci przy tej mapie, pod „Wyślij”, w roli `warning`. Koszt: gra mówi o pętli, której jeszcze nie ma.
    - (tekst) inny tekst, podany przez człowieka — pozycja D26 pakietu; koszt nie został nazwany.
  - Source: Mariusz, 2026-10-30, „przyjmuję wszystko zgodnie z rekomendacjami” (pakiet rundy, pozycja D2) i „przyjmuję rekomendacje” (pozycja D26). Zdanie, od którego zadanie odchodzi: dokument zadania 13, zamrożona kopia, commit 1b09f80c, `docs/task-cycles/plan-wyprawy/task.md:208`. Definicja, linie 1461–1462: “the list of maps marks it as not predicting the earning loop when the chest lacks that equipment”.
- Q15. Czy przyjmujesz stan między scaleniami zadań 14 i 18, w którym wprawę i łup daje wyłącznie pierwsze domknięcie każdej mapy? (pytanie kanoniczne: Q4 rozmowy refinementu zadania 14)
  - Answer: Droga A — kolejność z planu: scalamy zadanie 14, potem to. Przyjęty koszt: po scaleniu zadania 14 powtarzanie Lasu przestaje podnosić postać, cała drużyna ma najwyżej dwie wypłaty wprawy i dwie łupu, nowa postać nie ma skąd wziąć wprawy, a nikt nie mierzył, czy Las — głębiej da się przejść z jedną wypłatą. Przez cały cykl tego zadania gra prawie nie daje wprawy, co dotyczy tylko właściciela, a jego zapis na serwerze przepada przy obu wdrożeniach, bo oba zmieniają kształt stanu gry (D-206). To przyjęcie odwraca *Rejected* D-194 (“only the first solution paying practice here — before earning loops this would leave at most two payments”) i koszt odrzucony w zadaniu 10, pytanie Q1, dla wcześniejszego odcinka. Pozycja D1 tego odwrócenia nie nazwała; człowiek zobaczył je przy cięciu, przy wierszu K2 zadania 14, i wiersz przyjął (Mariusz, 2026-10-30, „pytania zgodnie z rekomendacją, wiersze przyjmuję”).
  - Not chosen:
    - B — zadanie 14 zostawia wypłatę wprawy za powtórkę do zadania 18 — zmiana celu zadania i planu, niezmiennik `solved-map-manual-run` złamany przez ten czas w części o wprawie, dwukrotna zmiana tej samej decyzji w fundamencie.
    - C — oba zadania wchodzą jednym pushem — gotowe zadanie 14 czeka na zadanie 18, a dłuższa gałąź to więcej konfliktów.
  - Source: Mariusz, 2026-10-30, „przyjmuję wszystko zgodnie z rekomendacjami” (pakiet rundy, pozycja D1). Materiał: D-194 `foundations/decisions.md:3404`, *Rejected*; plan, wiersz 18, Depends on „14, 16”; zadanie 10, zamrożona kopia, commit 81336e9e, `docs/task-cycles/wprawa-i-drzewa/task.md:54`; D-11; D-206.
- Q16. Czy gotowe wskrzeszenie ratuje przejście, czy przejście kończy się śmiercią jak dziś, a wskrzeszenie chroni wprawę, wykupione stopnie i numer pokolenia? (pytanie kanoniczne: Q3 rozmowy refinementu zadania 14)
  - Answer: Gotowe wskrzeszenie nie ratuje przejścia: przejście kończy się śmiercią jak dziś, postać traci to, co niosła, a przejście nie płaci niczym. Wskrzeszenie chroni przed tym, co śmierć zabiera „też”: całą wprawą, każdym wykupionym stopniem i wzrostem numeru pokolenia, a samo się przy tym zużywa. Definicja, „(new) — What does a character's death take?”: “A character's death takes what it carried and pays nothing of its map run; when the character has no resurrection ready, it also takes all its practice and every rank of branch it bought, and the character's generation number grows by one, its archetype unchanged. The programs, the chest, the Understanding and the solved maps survive every death. Each character has one resurrection, used up by a death and renewed after a span of real time set in the balance data, eight hours to start, and a death without one stops the character's earning loop.” D-61: “A character dies in the game minute in which its health reaches zero, also during the character's action in progress, and the map run then ends in death with its cause.” Definicja, „(new) — What pays, and what takes from the chest?”: “a run that ends in death pays neither loot nor practice”. Definicja, „(new) — How fast does the earning loop go?”: “Each map run of an earning loop is a map run of its own, followed at once by the next as long as the earning loop goes on.” Rozjazd, którego pozycja C3 nie pokazała: definicja, In scope, linia 44, mówi „śmierć zabiera postać”, co czytane dosłownie sięga szerzej niż cytat wyżej, więc to zdanie czyta się przez ten cytat.
  - Source: definicja `definicja_mvp_loop2.md` (sha256 fda97782458d, Status approved 2026-10-29), linie 44, 1505–1510, 1456, 1376–1377; fundament na `95de83b`: D-61 `foundations/decisions.md:1193`; cytat zostawiony przez człowieka (Mariusz, 2026-10-30, „przyjmuję wszystko zgodnie z rekomendacjami”, pakiet rundy, pozycja C3).
- Q17. Czy ekran po końcu ręcznego przejścia zatrzymuje pętle innych postaci?
  - Answer: Nie, tak samo jak pauza. Słaby punkt nazwany w pytaniu: reguły mówią o tym ekranie „czas stoi”, więc trzeba dopisać, że dotyczy to tego przejścia.
  - Not chosen:
    - Zatrzymuje: oglądanie wyniku wstrzymuje zarobek innych postaci.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D25). Materiał: D-62, D-132.
- Q18. Jak brzmi linia po zatrzymaniu pętli, która nie zebrała wprawy?
  - Answer: Droga A — samo „Pętla zatrzymana”. Słaby punkt nazwany w pytaniu: jeden warunek w widoku; to ta sama zasada co w raporcie, gdzie puste części są pominięte.
  - Not chosen:
    - B — brak linii — nic nie mówi, że stało się to, o co gracz prosił.
    - C — „Pętla zatrzymana · wprawa: nic”, jak „Wyniesie: nic” — linia mówi o wprawie, której nie było.
  - Source: Mariusz, 2026-10-30, „wszystko zgodnie z rekomendacją mi pasuje” (pakiet rundy, pozycja 18-Q18). Materiał: D-201 `foundations/decisions.md:3511`, D-186 `:3296`; testy loop tekstu tej linii nie pokrywają.
- Q19. Co stoi w miejscu „po {m} min” w linii „{imię}: pętla stanęła po {m} min …”, gdy pętla stanęła przy otwartej grze, i jaki tytuł ma wtedy sekcja?
  - Answer: Minuty — droga C: przy otwartej grze linia nie podaje minut: „{imię}: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.” Słaby punkt nazwany w pytaniu: jeden warunek w widoku, a gracz nie wie, ile pętla szła. Przy powrocie zostaje „po {m} min”, a {m} to minuty doliczone: pakiet powiedział wprost tylko, że przy otwartej grze nic nie było doliczane, a to znaczenie {m} niesie test loop `src/sim/sim.test.ts:1812`, który czyta przy pętli, która stanęła, ten sam licznik co test „raport z nieobecności mówi, ile minut zeszło” (`:1732`), pod odpowiedzią P6.
  - Answer: Tytuł — droga E: gdy w sekcji są tylko takie pętle, tytuł brzmi „Pętle, które stanęły”, a gdy jest w niej choć jedna linia z powrotu, zostaje „Gdy cię nie było”. Słaby punkt nazwany w pytaniu: drugi tytuł i jeden warunek.
  - Not chosen:
    - (minuty) A — wszystkie minuty tej pętli od puszczenia — liczba bywa większa niż ostatnia nieobecność, a {m} znaczy w sekcji dwie rzeczy; to wygląda też na odejście od loop.
    - (minuty) B — minuty od ostatniego doliczenia — osobny licznik w stanie gry, a liczba mówi niewiele.
    - (tytuł) D — zostaje „Gdy cię nie było” — tytuł mówi nieprawdę graczowi, który siedział przy grze.
  - Source: Mariusz, 2026-10-30, „wszystko zgodnie z rekomendacją mi pasuje” (pakiet rundy, pozycja 18-Q19). Testy loop tego przypadku nie pokrywają: żaden nie zatrzymuje pętli przy otwartej grze. Materiał: testy loop `src/sim/sim.test.ts:1732`, `:1811`–`1812`, `src/sim/loop.test.ts:93`–`94`.
- Q20. Czy zostaje odpowiedź Q2, że trwającego przejścia pętli nie da się obejrzeć, teraz nazwana odejściem od loop?
  - Answer: Droga A, nazwane odejście od loop — zostaje. Słaby punkt nazwany w pytaniu: gracz nie podejrzy pętli i sprawdza program tylko ręcznym przejściem. Podgląd może dojść później bez przeróbki pętli. Definicja zostaje bez zmian. Pozycja D15, na którą człowiek odpowiedział w Q2, tego odejścia nie nazwała.
  - Not chosen:
    - B — dochodzi „Podgląd” z mapą do oglądania — drugi rodzaj ekranu przejścia i duży kawałek cyklu.
  - Source: Mariusz, 2026-10-30, „wszystko zgodnie z rekomendacją mi pasuje” (pakiet rundy, pozycja 18-Q20). Testy loop, od których zadanie odchodzi: `src/sim/sim.test.ts:1622`, `:1685`. Definicja, Success, linia 89: „dostępna interakcja znacząco odbiega od odpowiadającej jej interakcji w loop”.
- Q21. Czy zostaje odpowiedź Q6, że jeden „Zamknij” zamyka całą sekcję raportu, teraz nazwana odejściem od loop?
  - Answer: Droga A, nazwane odejście od loop — zostaje jeden „Zamknij”. Słaby punkt nazwany w pytaniu: gracz nie zamknie raportu jednej postaci, zostawiając drugą.
  - Not chosen:
    - B — zamykanie przy każdej postaci, jak w loop — tyle kliknięć, ile postaci.
  - Source: Mariusz, 2026-10-30, „wszystko zgodnie z rekomendacją mi pasuje” (pakiet rundy, pozycja 18-Q21). Test loop, od którego zadanie odchodzi: `src/sim/sim.test.ts:1743`.

## Context

- Materiał z loop: definicja pozwala czytać z kodu loop pliki danych i testy, a zachowanie, którego one nie pokrywają, zadania biorą z koncepcji albo ustalają same (definicja, Inputs and constraints).
- Silnika i interfejsu loop to zadanie nie czytało.
- Commit loop: `cdc7c0d`.
- Testy loop o pętli: `src/sim/loop.test.ts` (kolejność listy postaci, raport przy każdej postaci, pętla stojąca nie zatrzymuje doliczania reszty), `src/sim/sim.test.ts:1486`–`1910` (uruchamianie, wprawa, zatrzymanie, śmierć, wskrzeszenie w trakcie nocy) i `:2008`–`2043` (zaległe minuty, zegar po wczytaniu), `src/sim/chest.test.ts:350`–`374` i `:491`–`558` (plan wyprawy w pętli, bilans skrzynki w raporcie), `src/sim/report.test.ts` (raport: najpierw pętle, które stanęły).
- Odejścia od testów loop, nazwane w odpowiedziach: Q3, Q5 (co gracz widzi), Q7, Q20 i Q21.
- Liczby z danych loop do wglądu (P5):

| Liczba | W loop (`src/sim/data/balance.ts`) | W loop2 | Dla tego zadania |
|---|---|---|---|
| Minut gry na sekundę realną przy 1× | `gameMinutesPerRealSecond: 1` | 1 (D-21, dane) | dotyczy ręcznego przejścia, nie pętli |
| Pułap skrzynki | `chestCapacity: 60` | 60 | bez zmian; decyduje o łupie pętli |
| Odnowienie wskrzeszenia | `revivalCooldownMinutes: 480` minut realnych | wnosi zadanie 14 | doliczanie liczy je czasem realnym |
| Passa Lasu | `survivalMinutes: 480` (`maps.ts:154`) | `solving: { streak: 480 }` | domknięcie Lasu w pętli to najwcześniej 8 godzin realnych |

- Tempa pętli dane loop nie niosą; minuta gry na minutę realną stoi w definicji.
- Górna granica doliczania w loop istnieje (`MAX_CATCHUP_MINUTES`, test `src/sim/sim.test.ts:2015`), a jej wartość leży w pliku silnika `save.ts`, którego zadanie nie czyta; odpowiedź Q7 od tej granicy odchodzi.
- Pomiar refinera na loop2 `95de83b`, jednorazowy, na komputerze Mariusza: program 17 reguł z testu akceptacyjnego Lasu.
- Stan siedziby z jedną postacią ma 2947 bajtów, samo przejście Lasu w minucie 300 ma 6150 bajtów, a Lasu — głębiej 7075 bajtów, z kopią programu i jej podstawą.
- Liczba pętli w limicie 64 KiB wyliczona z tych bajtów jest górnym oszacowaniem: pomiar nie liczy pozostałych postaci ani raportu.
- Minuta gry jednej postaci kosztuje około 0,0068 ms (23 074 minuty gry w 156 ms, przejścia skrócone śmiercią), a koszt minuty rośnie z długością przejścia (definicja, *Rationale* wpisu „How fast does the earning loop go?”), więc to dolne oszacowanie kosztu doliczania.
- W kodzie loop2 `95de83b`: `paused` jest jednym polem całego stanu gry (`src/browser/sim/types.ts:339`), a `passRealTime` nic nie przesuwa, gdy gra stoi na pauzie (`src/browser/sim/game.ts:402`–`412`).
- W kodzie loop2 `95de83b`: siedziby nie widać, gdy w stanie gry jest przejście (`src/browser/view/game-view.ts:236`), więc w trakcie ręcznego przejścia i na ekranie po jego końcu gracz nie widzi wierszy postaci.
- Pętli nie da się więc w trakcie ręcznego przejścia ani puścić, ani zatrzymać.
- W kodzie loop2 `95de83b`: zapis to `{ version, game }` (`savedGame`, `src/browser/sim/saved-game.ts:85`), a `SAVED_GAME_VERSION` wynosi 1 (`:69`).
- W kodzie loop2 `95de83b`: serwer trzyma `version`, `revision` i `game` i nie czyta wnętrza gry (`src/server/database.ts:101`, D-07).
- W kodzie loop2 `95de83b`: zegar widoku mierzy `performance.now()` co 200 ms (`src/browser/view/clock.ts:36`), a ziarno wysłania to hasz poprzedniego ziarna i czasu realnego (`mixSeed`, `src/browser/sim/random.ts:38`; `send`, `src/browser/sim/game.ts:301`).
- W kodzie loop2 `95de83b`: nowe przejście bierze umiejętności z przejścia, które zastępuje (`src/browser/sim/game.ts:147`–`149`), a odpowiedź Q4 wymaga, żeby następne przejście pętli wzięło też stopień kupiony w trakcie pętli.
- Las — głębiej ma passę 540 i dwie pokonane napaści (`src/browser/sim/data/maps.ts:93`), więc jego domknięcie w pętli to najwcześniej 9 godzin realnych.
- Przemiatanie, czyli puszczanie programu na wielu ziarnach naraz, jest poza zakresem MVP (definicja, Out of scope), więc gracz sprawdza program przed pętlą ręcznym przejściem.
- Taka próba kosztuje przy śmierci jak każda inna, także całą wprawę, gdy wskrzeszenie nie jest gotowe (rozmowa refinementu zadania 14, pytanie Q1, cytat zostawiony przez człowieka).
- Wdrożenie scalenia tego zadania podnosi wersję stanu gry, więc skasuje zapis gry na serwerze testowym, z komunikatem z D-96 (D-206); człowiek nic przy tym nie robi.

## Questions carried to cycle

- Jak stan gry trzyma przejścia wielu postaci obok jednego ręcznego przejścia: zadanie 11 przyjęło koszt „postacie nie chodzą równolegle aż do zadania 18, które i tak przebuduje przejścia na postać” ([zamrożony opis zadania 11](https://github.com/mariusznazar/loop2/blob/d1d35ac74758abf70ad7875b072ad7d22ce848aa/docs/task-cycles/siedziba-i-druzyna/task.md), pytanie 5), a D-56 mówi, że przejście wskazuje postać jej numerem.
- Którym generatorem przejście pętli losuje ziarno następnego: D-22 daje jeden generator na rodzaj losowania, a dziś są cztery (`src/browser/sim/random.ts`, `Stream`).
- Jak zegar widoku przekazuje symulacji czas pętli, tak by pętla szła zegarem świata także przy ukrytej karcie i uśpionym komputerze (definicja: “one game minute per real minute”; `src/browser/view/clock.ts`).
- Ile zapisów wysyła doliczanie: D-207 każe zapisywać po końcu przejścia, a doliczanie kończy naraz wiele przejść.
- Jak porównanie „od ostatniego wysłanego zapisu” z D-207 traktuje chwilę zapisu, która zmienia się przy każdym zapisie: D-207, *Verification*: “a tab that has just loaded a saved game state with its map run paused sending nothing until the player acts in it”.

## Human actions

none

## Decisions in play

Plan przypisuje temu zadaniu punkty In scope 8 i 20. Zadanie zapisuje te wpisy projektowane w całości, a to, co fundament już z nich ma, zmienia albo uzupełnia (WAY-126).

- „(new) — How fast does the earning loop go?” (urzeczywistniają zadania 7 i 18, zapisuje to zadanie): “An earning loop goes only on a solved map, one game minute per real minute, and the speed control does not reach it, while a manual map run may be fast-forwarded. Each map run of an earning loop is a map run of its own, followed at once by the next as long as the earning loop goes on. Solving a map unlocks its earning loop without certifying that the chosen program survives every seed.” — część o ręcznym przejściu stoi w D-21; *Verification*, complies: “the speed control inactive for a character in an earning loop” (po odpowiedzi Q2 regulatora przy postaci w pętli nie ma wcale).
- „(new) — When and how is the time away computed?” (urzeczywistnia i zapisuje to zadanie): “The catch-up takes place when the player returns and advances the missed game minutes, taking the characters one at a time, each to the end, in the order of the player's list of characters. Characters meet only at the borders of map runs: an item reaches the chest when a map run completes, and the next map run takes what it finds there; when the chest has room for one character's loot only, the character earlier on the list takes it.” — *Verification*, complies: “two characters of one team caught up one after the other in the list's order, the first taking its loot into a chest with room for one”; violates: “characters caught up together, game minute by game minute; a map run that takes from the chest in the middle of another character's map run”.
- „(new) — Where does the simulation's randomness come from?” (urzeczywistniają zadania 3, 4, 8 i 18, zapisuje to zadanie): “Every random draw of the simulation comes from generators seeded by the seed saved in the map run's state, one generator for each kind of draw — attacks, gathering, the map's layout and wandering among them — and the map run draws its map's layout at its start, before the first game minute, in a fixed order. A restart of a map run keeps its seed, any other map run outside an earning loop takes a new seed, and each map run of an earning loop takes its seed from a draw of the map run before it.” — *Verification*, violates: “an earning loop that draws each map run's seed afresh; gathering that draws from the generator of attacks”. D-22 ma dziś węższe brzmienie: “one generator for each kind of draw — the game map's layout and wandering among them” i “any other map run takes a new seed”; zadanie doprowadza je do tego wpisu, a pierwsze przejście pętli bierze nowe ziarno (odpowiedź Q10).
- „(new) — What pays, and what takes from the chest?” (urzeczywistniają zadania 10, 13, 14 i 18, zapisuje to zadanie): “A manual map run that first solves its map pays practice and loot once per map for the player, whichever character completes it. A manual run of a solved map pays nothing. An earning-loop run pays loot only on completion; a run that ends in death pays neither loot nor practice. Earned loot reaches the chest on completion. Practice earned during an earning loop is gathered there and added to the character skills when the loop stops, including practice from a run stopped before its completion without death. A manual map run of a map already solved takes nothing from the chest: it takes its equipment from nowhere, cut only by the character's carrying capacity and the map's cap, and the list of maps marks it as not predicting the earning loop when the chest lacks that equipment.” — kod tego zadania czyni prawdziwymi zdania o przejściu pętli, o wprawie zebranej w pętli i o oznaczeniu na liście map; *Verification*, complies: “stopping an earning loop in the middle of a map run adds the practice of that map run, while its loot stays out”; violates: “practice added at each completion of an earning loop; […] a run ending in death paying loot or practice”.
- „(new) — What does a character's death take?” (urzeczywistniają zadania 13, 14 i 18, zapisuje to zadanie): “A character's death takes what it carried and pays nothing of its map run; when the character has no resurrection ready, it also takes all its practice and every rank of branch it bought, and the character's generation number grows by one, its archetype unchanged. The programs, the chest, the Understanding and the solved maps survive every death. Each character has one resurrection, used up by a death and renewed after a span of real time set in the balance data, eight hours to start, and a death without one stops the character's earning loop.” — kod tego zadania czyni prawdziwą część “a death without one stops the character's earning loop”; resztę niesie D-190 i zadanie 14.
- „(new) — Who owns a program?” (urzeczywistniają zadania 12 i 18, zapisało zadanie 12 jako D-164): “[…] a manual map run or an earning loop carries out a copy taken at its start, […] and its saved change takes effect at the next manual map entry other than a map run restart, at the next switch to it during a manual map run or at the next start of an earning loop, never in an earning loop already running.” — *Verification*, complies: “a program edited while a character's earning loop goes on its copy, the loop unchanged until its next start”. D-164 nie ma dziś części o pętli; zadanie je dopisuje razem ze sprawdzeniem.
- `catch-up-state/1` (zapisuje to zadanie): “For the same starting game state and real-time inputs, a character whose team's chest no other character's map run reaches during a span of game minutes has the same character and chest state after catch-up as after the game runs without a break over that span.”
- Pojęcie `earning loop` (zapisuje to zadanie): “An earning loop is a succession of map runs that one character makes on one map without the player starting each.”
- Pojęcie `catch-up` (zapisuje to zadanie): “The catch-up is the computing of the game minutes that passed while the game was closed.”

Obecne decyzje, które odpowiedzi tego zadania zmieniają:

- D-62: “After a character's death the screen stays on the state of the game minute of death and time stands still, […]” — odpowiedź Q17: czas stoi dla tego przejścia, a pętle innych postaci idą dalej.
- D-71: “Discoveries enter the Understanding where their cause occurs — body, ending action or attack — and the following effects and picks read that updated Understanding and program, a rule written by a discovery included, with discoveries collected once for the whole minute and the pause taken after that minute has finished.” — odpowiedź Q9; reszta D-71, “Outside combat a game minute takes effect in this order: […]”, obowiązuje przejście pętli jak każde przejście.
- D-93: “During a map run every program rule of the copy the map run carries out shows how many times it fired in that map run, […]” — odpowiedź Q2: dotyczy ręcznego przejścia. Definicja zostaje bez zmian: “Every program rule shows how many times it fired in the current map run” (linia 976) i “the speed control inactive for a character in an earning loop” (linia 1385) nie stają się fałszywe, bo licznika ani regulatora nie ma tu na żadnym ekranie (rozstrzygnięcie orkiestratora projektu, rozmowa zadania 14, Turn 11, uwaga 20); wyjątek od reguły „licznik w każdym przejściu” jest kosztem, który człowiek przyjął w Q2.
- D-118: “When something is discovered, game time stops by itself.” — po odpowiedzi Q9 zdanie zostaje prawdziwe, bo przejście pętli niczego nie odkrywa; wyjątek zapisuje wpis z wiersza 16 *Settlements to record*.
- D-122: “When something is discovered in a map run the player starts, the map run stops in the same pause as after „Pauza” […]” — zostaje; dotyczy ręcznego przejścia.
- D-123: “A program rule the game writes at a discovery goes into the first rule group of the copy the map run carries out and into the first rule group of the program the copy belongs to, while that program is on the player's list […]” — zostaje; w przejściu pętli po odpowiedzi Q9 takiego zapisu nie ma, więc kopia zostaje taka, jaka była na starcie.
- D-132: “After a completion the screen stays on the state of the game minute of the completion and time stands still, […]” — odpowiedź Q17, jak D-62.
- D-183: “When „Zakończ” or „Restart” ends a map run before completion, its carried items — brought in and gathered — are lost. At completion, the items outside the frozen bring list are lost.” — odpowiedź Q5: zatrzymanie pętli kończy przejście tak samo.
- D-200: “The player currently buys a branch rank with „Kup” in the headquarters outside a map run, and the rank acts from that character’s next map run. The game currently has no purchase in the map-run view and no undo of a purchase.” — odpowiedź Q4: „Kup” działa też przy postaci w pętli.
- D-207: “The game saves the game state on the server by itself right after each change of it the player makes — […] — right after a map run ends in a completion or in the character's death, every 30 real seconds while a map run passes, and once more when the page becomes hidden, closing included, with no guarantee that this last save arrives. […] A save whose body is larger than 64 KiB is not sent and counts as refused as too large (D-208).” — odpowiedź Q11; *Rejected* tego wpisu odrzuca zapis bez rytmu dla przejścia, które doliczanie nie odtworzy, więc zmiana dotyka też jego uzasadnienia.
- D-208: “[…] the same line reads „Nie udało się zapisać postępu: stan gry jest za duży. Usuń niepotrzebne programy.” in `warning` until a save succeeds.” — odpowiedź Q12.

Obecne decyzje, których zadanie dotyka bez zmiany:

- D-04: “The game is written in TypeScript and runs in the browser. Its simulation is a set of pure functions, of which those that pass game time take a game state and a span of game minutes and return the next game state together with the events it produced, and real time enters the simulation only as an argument. […]” — czas nieobecności wchodzi do symulacji jako argument.
- D-07: “The server holds the players' accounts and each player's saved game state, and computes nothing of the game. The browser computes the whole game — the map runs, the earning loops and the catch-up — and sends the saved game state to the server.”
- D-21: “A map run the player starts passes at one game minute per real second times the pace the player picks of 1×, 2×, 4×, 8× and 16×, and the player can pause and resume it. […]” — dotyczy przejścia, które uruchamia gracz; pętli nie.
- D-39: “`warning` means caution, that something is not carried out or is not saved, a wrong value typed into a field included; `danger` means that a character, progress or data may be lost” — role nowych tekstów.
- D-50: “The chest belongs to a team and has a cap on the total count of pieces, by the same rule of capacity as the backpack. Each character belongs to exactly one team and uses its chest, and a character has no chest of its own.”
- D-53: “The player sends a character to a game map from the headquarters, and „Zakończ” returns to the headquarters.”
- D-54: “The characters of the team stand on its list in the order they were created.”
- D-55: “The game holds one manual map run at a time: while one character is in a manual map run, the game sends no other on a manual map run.” — *Rationale*: “Earning loops, which go on side by side, stand beside the one manual map run rather than in its place.”
- D-56: “Each character carries a number the game gives it when the character is created, […] A map run names the team's character it carries by that number.”
- D-119: “The Understanding belongs to the player and is one for all characters, and what any character discovers enters it for every character. […]”
- D-164 — jak wyżej, przy wpisie „(new) — Who owns a program?”.
- D-168: “Deleting the program the copy of the map run belongs to leaves the map run going on with the copy, […]”
- D-170: “The player picks the program a character enters a map with on the select list „Program: {name}” in that character's row of the headquarters, beside „Mapa: …” and „Wyślij”, one list for each row whatever the number of maps. […]”
- D-179: “The trip plan is a field of the program, both its lists are bound at the start of a map run — the list of what comes out as a frozen snapshot — and at a completion only what that list names goes to the chest. Reality cuts the trip plan down and never up: outside a manual map run of a map already solved, what the chest lacks does not go into the backpack, what the backpack lacks does not come back, and where items compete for one budget — the backpack, the map's cap, the free room in the chest — as many go in from the top of the list as fit. […]”
- D-188: “In the headquarters, at a character's map, „Plan wyprawy wejdzie przycięty: mapa wpuszcza najwyżej {n} sztuk.” in `warning` stands when its entry cap is below the smaller of the take list's requested total in that row's chosen program and the character's carrying capacity. […]” — oznaczenie z *To do* 18 stoi w tym samym miejscu.
- D-189: “Earned loot reaches the chest on completion. The game currently takes equipment from the chest at each map run's start and deposits according to its frozen bring list at each completion, including a manual map run of an already solved map.” — zmienia go zadanie 14.
- D-190: “A character's death takes what it carried, including pieces taken from the chest, and leaves the chest as it stood.”
- D-191: “A character skill grows by practice, which counts only its actions that ended in effect, and is never bought. […]”
- D-194: “A manual map run holds the practice it gathers separately by character skill and currently pays all of it once to the character making the run in the game minute of every completion, including a completion of an already solved map. […]” — dotyczy ręcznego przejścia; zmienia go zadanie 14, a ten cykl usuwa z niego koszt nazwany w *To do* 19.
- D-204: “The browser loads and sends whole saved game states through HTTPS request-response endpoints, using JSON and the browser's `fetch()` API. […]” — po odpowiedzi Q8 zostaje, razem z D-205.
- D-206: “A saved game state carries the version number of its shape, and the game loads whole only a saved game state whose version is the game's current one. The game discards a saved game state of any other version in full, including the player's programs, and starts the player anew. […]”
- D-209: “[…] The browser whose save it refuses so drops its unsaved game state, loads the server's saved game state — a manual map run that went on coming back paused (D-212) — […] and plays on from the loaded state, saving as D-207 gives.” — doliczanie po tym wczytaniu dopisuje wiersz 25 *Settlements to record*.
- D-211: “[…] After a sign-in to the same account the game sends that state and goes on from it, a manual map run in it coming back as D-96 and D-212 give; […]” — jak przy D-209, wiersz 25 *Settlements to record*.
- D-212: “A manual map run of a loaded saved game state that goes on comes back at the game minute of the save, paused, with the pace of the save, and the player resumes it with „Wznów”; one that ended in a completion or in the character's death comes back on its screen after its end, with „Restart”, „Zakończ” and the copy open to editing as D-62, D-132 and D-173 give. No time that passed between the save and the load advances it, the computing of time away included.”
- D-213: “[…] Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, never throwing and changing nothing passed to it.”

Niezmienniki, które zadanie może złamać: `map-run-repeatability`, `simulation-randomness`, `minute-span-split`, `player-map-run-pace`, `simulation-isolation`, `simulation-inputs`, `restart-seed`, `save-version`, `trip-transfer`, `saved-program-edit`, a po zadaniu 14 `solved-map-manual-run`.

- `trip-run-end`: “Death, ending or restarting an unfinished map run returns none of its carried items to the chest, while completion deposits the frozen bring list's clipped contents and leaves the remaining items unavailable to subsequent runs.” — zatrzymanie pętli kończy przejście tak samo, więc cykl dopisuje je do tego niezmiennika i do jego testu.

## Settlements to record

Candidates: 29 shown, 26 accepted — 2026-10-30

Wiersze przyjął Mariusz, 2026-10-30, „wszystko zgodnie z rekomendacją mi pasuje”. „Propozycja refinera” w kolumnie *Source* znaczy, że tej części człowiek nie widział w pakiecie rundy z pytaniami i przyjął ją dopiero razem z wierszem. „Pozycja” to numer w pakiecie rundy, który człowiek dostał 2026-10-30, a „odpowiedź P6” to jego zasada, że testy loop wiążą tak jak liczby z danych loop, a odejście od nich jest nazwaną decyzją.

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Gracz puszcza postać w pętlę przyciskiem „Puść w pętlę”, który stoi dziś w wierszu postaci w siedzibie przy każdej mapie rozwiązanej, obok „Wyślij”, bierze program z listy „Program:” tego wiersza i działa od razu po kliknięciu. | decision | pytanie Q1, droga A (Mariusz, 2026-10-30, pozycja D14), *Not chosen* tam; propozycja refinera: „działa od razu po kliknięciu”, którego pozycja D14 nie pokazała | gdzie stoi przycisk, jak się nazywa, skąd bierze program i czy pyta przed startem |
| 2 | Puszczenie w pętlę liczy się dla listy „Program:” jak wysłanie: program staje się użytym ostatnio i tym, z którym postać ostatnio weszła na mapę, a wybór w wierszu się czyści. | decision | propozycja refinera, cały wiersz: *To do* 3, krok od D-170: “The player picks the program a character enters a map with on the select list „Program: {name}””, która mówi tylko o wejściu na mapę | czy start pętli zmienia to, co wiersz pokaże przy następnym wysłaniu |
| 3 | Trwającą pętlę gracz widzi dziś w wierszu postaci: jedna linia w roli `text`, „Pętla: {mapa} · przejście {n} · minuta {m} · domknięte {k}”, i przycisk „Zatrzymaj”. | decision | pytanie Q2, droga A (pozycja D15), *Not chosen* tam; nazwane odejście od loop, którego testy zakładają, że przejście pętli da się obejrzeć (`src/sim/sim.test.ts:1622`, `:1685`), przyjęte w pytaniu Q20, *Not chosen* tam; propozycja refinera: rola `text`, czyli zwykły kolor tekstu | co i gdzie pokazać z pętli |
| 4 | Mapy przejścia pętli gra dziś nie otwiera, licznik zadziałań reguł obejmuje ręczne przejście, a start pętli zostawia liczniki po ręcznym przejściu takie, jakie były. | decision | pytanie Q2, droga A (pozycja D15), *Not chosen* tam; to samo nazwane odejście od loop co w wierszu 3, pytanie Q20; zmienia D-93: “During a map run every program rule of the copy the map run carries out shows how many times it fired in that map run”; propozycja refinera: część o starcie pętli, bo D-93 trzyma liczniki “until the next send or map run restart”, a pozycja D15 o tym nie mówi | czy budować drugi ekran przejścia, czy liczyć i pokazywać liczniki pętli i czy jej start czyści liczniki po ręcznym przejściu |
| 5 | Przy postaci w pętli „Wyślij” i „Puść w pętlę” są dziś nieczynne, a gracz najpierw ją zatrzymuje. | decision | pytanie Q3, droga A (pozycja D16), *Not chosen* tam; nazwane odejście od loop, gdzie „Wyślij” sam zatrzymuje pętlę | czy „Wyślij” sam zatrzymuje pętlę, jak w loop |
| 6 | Przy postaci w pętli „Kup” działa, a kupiony stopień działa od następnego przejścia tej pętli, gdy trwające zachowuje umiejętności ze swojego startu. | decision | pytanie Q4, droga A (pozycja D17), *Not chosen* tam; zmienia D-200: “The player currently buys a branch rank with „Kup” in the headquarters outside a map run”; propozycja refinera: „gdy trwające zachowuje umiejętności ze swojego startu”, którego pozycja D17 nie pokazała | czy wyłączyć „Kup” i czy stopień wchodzi do trwającego przejścia |
| 7 | „Zatrzymaj” to przycisk niszczący z tekstem w roli `danger`, który działa od razu po kliknięciu: przedmioty niesione w przerwanym przejściu przepadają, jego łup nie trafia do skrzynki, postać wraca do zwykłego wiersza, a w nim do następnego wysłania albo puszczenia tej postaci, także po wczytaniu stanu gry, stoi w roli `text-secondary` „Pętla zatrzymana · wprawa: {umiejętność} +{n}, …”, a gdy pętla nie zebrała wprawy, samo „Pętla zatrzymana”. | decision | pytanie Q5, droga A, nazwane odejście od loop (pozycje C7 i D18), *Not chosen* tam; zmienia D-183: “When „Zakończ” or „Restart” ends a map run before completion, its carried items — brought in and gathered — are lost.”; propozycja refinera: obie role (pozycja D18 mówi „w kolorze ostrzegawczym”), „do następnego wysłania albo puszczenia”, „także po wczytaniu stanu gry”; linia przy pętli, która nie zebrała wprawy — pytanie Q18, droga A, *Not chosen* tam | czy pytać o potwierdzenie, czy zostawić przejście do obejrzenia, jak w loop, czy pokazać, co weszło, co dzieje się z plecakiem i czy linia przeżywa przeładowanie |
| 8 | Gdy postać nie ma gotowego wskrzeszenia, śmierć zabiera też wprawę zebraną przy pętli. | decision | pytanie Q13 (pozycja C9, zostawiona przez człowieka) | która z dwóch reguł definicji idzie pierwsza |
| 9 | Pierwsze przejście pętli bierze nowe ziarno, jak każde wysłanie postaci. | decision | pytanie Q10 (pozycja C8, zostawiona przez człowieka) | skąd wziąć ziarno, którego wpis o losie nie nazywa |
| 10 | Po powrocie gracz czyta raport w sekcji „Gdy cię nie było” w siedzibie, nad „Drużyna”, po jednej linii na postać, która miała pętlę, a jeden przycisk „Zamknij” zamyka całą sekcję: najpierw pętle, które stanęły, w `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”; potem pozostałe, w `text`, „{imię}: {m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa: {umiejętność} +{n}”, puste części pominięte, z dopiskiem „ · wskrzeszenie zużyte”, gdy śmierć pokryło wskrzeszenie; pod nimi, gdy skrzynka jest pełna, „Skrzynka jest pełna.” w `warning`; {m} to w obu liniach minuty doliczone. | decision | pytanie Q6, droga A (pozycja D19), *Not chosen* tam; nazwane odejście od loop, gdzie raport zamyka się przy każdej postaci (`src/sim/sim.test.ts:1743`), przyjęte w pytaniu Q21, *Not chosen* tam; propozycja refinera: role (pozycja D19 mówi „ostrzegawczo”), „puste części pominięte” i warunki dopisku oraz linii o pełnej skrzynce (pozycja D19 mówi „gdy trzeba”); {m} jako minuty doliczone — pytanie Q19, droga C, *Not chosen* tam, i test loop `src/sim/sim.test.ts:1812` | gdzie stoi raport, jak go zamknąć, jakie ma teksty |
| 11 | Raport leży w stanie gry, więc przeżywa przeładowanie. | decision | pytanie Q6, droga A (pozycja D19: „nowy kawałek stanu gry”); propozycja refinera: „przeżywa przeładowanie” | czy raport przeżywa przeładowanie |
| 12 | Doliczanie liczy dziś wszystkie opuszczone minuty, a górnej granicy gra dziś nie ma. | decision | pytanie Q7, droga B, nazwane odejście od loop (pozycja D20), *Not chosen* tam | czy przepisać z loop sufit minut i jaką liczbą |
| 13 | Chwilę zapisu, po angielsku `save time`, podaje zegar przeglądarki, a leży ona w stanie gry. | decision | pytanie Q8, droga A (pozycja D21), *Not chosen* tam; propozycja refinera: „leży w stanie gry” i słowo `save time`, bo “moment of saving” w D-207 znaczy co innego: okazję do wysłania zapisu | czy dodać kolumnę w bazie kont, który zegar wskazać i jakim angielskim słowem nazwać tę chwilę |
| 14 | Doliczanie przerabia pełne minuty od chwili zapisu, a reszta krótsza niż minuta czeka na następną minutę pętli; zegar cofnięty przed chwilę zapisu daje zero minut i nie zabiera niczego, a zegar pętli rusza wtedy od teraz. | invariant | propozycja refinera, cały wiersz, pod odpowiedzią P6: *To do* 11; testy loop `src/sim/sim.test.ts:2017`, `:2020`, `:2028`; człowiek widział w pakiecie tylko „zegar cofnięty przed chwilę zapisu daje zero doliczonych minut” | co zrobić z resztą minuty i z ujemną różnicą czasu |
| 15 | Śmierć w doliczanej minucie rozlicza się w chwili realnej tej minuty, czyli chwili zapisu plus minuty od niej. | invariant | propozycja refinera, cały wiersz, pod odpowiedzią P6: *To do* 14; test loop `src/sim/sim.test.ts:1848` | czy liczyć odnowienie wskrzeszenia od chwili powrotu |
| 16 | Przejście pętli dziś niczego nie odkrywa, więc czas nie staje i gra nie dopisuje do programu reguły przy odkryciu, a gracz odkrywa to w ręcznym przejściu. | decision | pytanie Q9, droga A (pozycja D22), *Not chosen* tam; zmienia D-71: “Discoveries enter the Understanding where their cause occurs”; propozycja refinera: „czas nie staje” i część o regule, wnioski z tej drogi przy D-123: “A program rule the game writes at a discovery goes into the first rule group of the copy” | czy przejście pętli staje, pisze do Zrozumienia i dopisuje regułę przy odkryciu |
| 17 | Przejście pętli zostawia dziś Zrozumienie i programy gracza takie, jakie zastało. | invariant | propozycja refinera, cały wiersz: pytanie Q9, droga A; stoi na tym niezmiennik `catch-up-state/1` z definicji | czy pilnować tego testem, na którym stoi prawdziwość `catch-up-state/1` |
| 18 | Rytm 30 sekund realnych dotyczy ręcznego przejścia, a pętle zapisują się przy czynnościach gracza, po końcu każdego swojego przejścia i przy ukryciu strony. | decision | pytanie Q11, droga A (pozycja D23), *Not chosen* tam; zmienia D-207: “every 30 real seconds while a map run passes”; propozycja refinera: „przy czynnościach gracza”, którego pozycja D23 nie pokazała | czy wysyłać zapis co 30 sekund przez całą noc |
| 19 | Gra dziś nie ogranicza liczby pętli, limit zapisu 64 KiB zostaje, a przy za dużym stanie gry linia o nieudanym zapisie brzmi „Nie udało się zapisać postępu: stan gry jest za duży. Zatrzymaj pętle albo usuń niepotrzebne programy.” | decision | pytanie Q12, droga A (pozycja D24), *Not chosen* tam; zmienia D-208: “the same line reads „Nie udało się zapisać postępu: stan gry jest za duży. Usuń niepotrzebne programy.””; limit stoi w D-207: “A save whose body is larger than 64 KiB is not sent” | czy ograniczyć liczbę pętli, odchudzać zapis albo podnieść limit |
| 20 | Pauza ręcznego przejścia, jego zatrzymanie przy odkryciu i ekran po jego końcu nie zatrzymują pętli innych postaci, a „czas stoi” na ekranie po śmierci i po domknięciu dotyczy tego przejścia. | decision | odpowiedź P1 (pauza nie zatrzymuje pętli innych postaci); pytanie Q17 (pozycja D25), *Not chosen* tam; zmienia D-62: “After a character's death the screen stays on the state of the game minute of death and time stands still” i D-132: “After a completion the screen stays on the state of the game minute of the completion and time stands still”; propozycja refinera: „zatrzymanie przy odkryciu”, krok od D-122: “stops in the same pause as after „Pauza”” | czy jedno pole `paused` i ekran końca wstrzymują cały czas gry |
| 21 | Przy mapie rozwiązanej, gdy któraś pozycja listy „Zabierz” programu z wiersza, po przycięciu udźwigiem i pułapem wnoszenia, przekracza zapas w skrzynce, pod „Wyślij” stoi w roli `warning` „Próba weźmie zapas, którego nie ma w skrzynce — pętla zarobkowa go nie dostanie.” | decision | pytanie Q14 (pozycje D2 i D26), *Not chosen* tam; propozycja refinera: „programu z wiersza”, „po przycięciu udźwigiem i pułapem wnoszenia” i rola `warning` (pozycja D26 mówi „lista „Zabierz” przekracza zapas w skrzynce” i „kolorem ostrzegawczym”) | jaki warunek, tekst i miejsce ma oznaczenie, którego wpis nie opisuje |
| 22 | Kolejny powrót przed „Zamknij” dodaje się do raportu. | decision | propozycja refinera, cały wiersz: *To do* 16 | czy nowy raport zastępuje stary, czy się z nim sumuje |
| 23 | Sekcja pokazuje się od jednej pełnej doliczonej minuty, a pętla, która stanęła, otwiera ją przy każdej liczbie minut. | decision | pytanie Q6, droga A (pozycja D19: „Pojawia się od jednej doliczonej minuty”); propozycja refinera: część o pętli, która stanęła, pod odpowiedzią P6: test loop `src/sim/loop.test.ts:91`–`92`, gdzie raport ma śmierć przy zerze minut | czy gracz dowie się o pętli, która stanęła w pierwszej minucie |
| 24 | Pętla, która stanie przy otwartej grze, trafia do tej samej sekcji, jej linia brzmi wtedy „{imię}: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, a gdy w sekcji nie ma żadnej linii z powrotu, tytuł brzmi „Pętle, które stanęły”. | decision | propozycja refinera: ta sama sekcja, *To do* 16; linia i tytuł — pytanie Q19, drogi C i E, *Not chosen* tam | czy przy otwartej grze pętla staje po cichu, co stoi w miejscu „po {m} min” i jaki tytuł ma sekcja |
| 25 | Doliczanie rusza po każdym wczytaniu stanu gry: po zalogowaniu, po przeładowaniu strony, po przegranej z zapisem innej przeglądarki i po zalogowaniu na to samo konto ze stanem zachowanym w pamięci strony. | decision | propozycja refinera, cały wiersz: *To do* 11; obok wpisu definicji “The catch-up takes place when the player returns”, D-209: “plays on from the loaded state” i D-211: “goes on from it”, które o doliczaniu po tych dwóch wczytaniach nie mówią | czy doliczać po przegranej z innym zapisem i przy stanie z pamięci strony, czy grać od razu |
| 26 | Gracz, który wraca do ręcznego przejścia, czyta raport w siedzibie po „Zakończ”. | decision | propozycja refinera, cały wiersz: *To do* 16; *Context*: siedziby nie widać, gdy w stanie gry jest przejście | czy pokazać raport na ekranie przejścia |

## Out of scope

- Przemiatanie i inne pomoce do oceny ryzyka programu przed pętlą — definicja, Out of scope.
- To, co ręczne przejście mapy rozwiązanej płaci i bierze — zadanie 14.
- To, jak działa wskrzeszenie poza doliczaniem i pętlą, także w ręcznym przejściu — zadanie 14.
