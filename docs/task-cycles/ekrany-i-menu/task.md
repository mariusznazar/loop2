---
title: Osobne ekrany Siedziba, Postać i Programy pod jednym paskiem menu
status: draft
created: 2026-11-02
updated: 2026-11-03
tags: [zadanie]
related: "[[(P) Loop]]"
---

# Osobne ekrany Siedziba, Postać i Programy pod jednym paskiem menu

Status: ready for cycle
Project relation: plan item: plan_mvp2_loop2.md — ekrany-i-menu

## Description

### Need

- Zalogowany gracz ma dziś jedną stronę: po lewej zawsze panel programu, po prawej Siedziba albo przejście (`src/browser/view/game-view.ts:94`).
- Na tej stronie stoją razem program, postać, drzewa umiejętności, wysyłanie na mapy i skrzynka (zrzut `C:\Storage\The Brain\The Brain\.playwright-mcp\rozpoznanie\loop2_10_siedziba_po_przejsciu.png`).
- Mariusz: „obecnie gra jest strasznie nieczytelna, gdzie loop pod tym względem było dużo dalej”, a najbardziej chodzi mu o „podział na ekrany, układ elementów, interfejs tworzenia programu, animację ludzika”.
- Definicja projektu wskazuje podział na ekrany wśród rzeczy najważniejszych: „najbardziej zależy mi na edytorze, ludziku i stronie logowania, bo to obecnie jest w najgorszym stanie + podział na ekrany”.
- Odświeżenie strony nie ma dziś dokąd wrócić, bo żaden ekran nie ma adresu.
- Przejście ręczne nie ma dziś stanu „gracz wyszedł, przejście czeka”, bo gracz nie może opuścić jego ekranu.
- Cel zadania w planie: „Zalogowany gracz przechodzi między osobnymi ekranami Siedziba, Postać i Programy pod adresami po `#`, pod jednym paskiem menu z „Konto”; odświeżenie zostaje na tym samym ekranie, a wyjście z ekranu ręcznego przejścia pauzuje je i w menu staje „Wróć do przejścia”, które stoi tam też po końcu przejścia, do „Restart” albo „Zakończ”.”
- Na tym zadaniu stoją zadania 5, 6, 13 i 22, które wstawiają swoje ekrany pod ten pasek.

### To do

1. Na każdym ekranie zalogowanego gracza stoi u góry jeden pasek menu, a treść pod nim ma jedną szerokość: najwyżej 1344 px, a w węższym oknie całą szerokość okna (pytanie 11).
   - Po lewej stronie paska stoi nazwa gry; na ekranach oczekiwania (D-262) nazwa stoi sama, bez pozycji (pytanie 11).
   - Pozycje paska to Siedziba, Programy i menu „Konto”, bez ikon; Mapy i Wiedzę dopisują zadania 13 i 22 (pytanie 7).
   - Pasek znaczy pozycję miejsca, w którym jest gracz, tekstem w `text-strong` i linią w `selected` u dołu (D-277); na ekranie Postać znaczy Siedzibę (pytanie 7), a na ekranie przejścia nie znaczy żadnej pozycji (D-277, odczyt pod *Decisions in play*).
2. Ekrany mają adresy po `#`: `#/` to Siedziba, `#/postac/{n}` to Postać, `#/programy` i `#/programy/{n}` to Programy, `#/postac/{n}/przejscie` to ekran przejścia; {n} to numer postaci (D-56) albo programu (D-165).
   - Odświeżenie pod adresem ekranu zostaje na tym ekranie; pod adresem bez fragmentu i po zalogowaniu formularzem gra prowadzi do Siedziby albo, gdy zapis gry trzyma ręczne przejście, do tego przejścia (pytanie 1).
   - Przyciski wstecz i naprzód przeglądarki prowadzą po tych adresach.
   - Adres, który nie prowadzi do istniejącego ekranu, po cichu otwiera najbliższy: `#/postac/{n}/przejscie` bez przejścia ekran Postać tej postaci, `#/programy/{n}` bez takiego programu `#/programy`, a każdy inny Siedzibę (pytanie 8).
   - Fragmenty `#confirm-email=` i `#reset-password=` działają jak dotąd (D-156, D-225); gdy po nich gra buduje się dla zalogowanego gracza, otwiera Siedzibę (D-96).
   - „Anuluj” formularza „Ustaw nowe hasło” otwiera zalogowanemu graczowi Siedzibę, a niezalogowany widzi formularze konta, jak dziś (pytanie 16).
3. Siedziba jest osobnym ekranem: sekcja „Gdy cię nie było”, sekcja „Drużyna” z nagłówkiem i sekcja „Skrzynka”, bez panelu programu i bez umiejętności.
   - Wysyłanie zostaje tu jak dziś: lista „Program:”, „Mapa: …”, zdanie warunku, „Wyślij”, „Puść w pętlę” i ich ostrzeżenia, do zadania 13.
   - Imię na karcie postaci jest odnośnikiem do `#/postac/{n}` (pytanie 7).
   - Gracz, który wraca do ręcznego przejścia, czyta raport z nieobecności po wejściu na Siedzibę (D-246).
4. Ekran Postać pokazuje jedną postać: imię, pokolenie, archetyp, wiersz wskrzeszenia, wiersz pętli z „Zatrzymaj” albo wiersz zatrzymanej pętli i sekcję „Umiejętności” z „Kup”, w treści D-199, D-200, D-217, D-244 i D-245.
5. Ekran Programy ma po lewej listę programów gracza z „Nowy program”, „Zmień nazwę” i „Usuń”, a obok dzisiejszy panel programu z edytorem i „Plan wyprawy”, bez jego listy wyboru „Program:” (pytanie 5); nowy edytor robi zadanie 5.
   - Wybór programu na liście zmienia adres na `#/programy/{n}`, a adres wybiera program na liście.
   - Panel pokazuje zawsze zapisany program wybrany na liście, nigdy kopię (pytanie 15).
   - Gdy ręczne przejście trwa albo skończyło się i czeka na „Restart” albo „Zakończ”, nad edytorem stoi „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.”, a „Przełącz postać na ten program” stoi tylko na ekranie przejścia (pytanie 15).
   - Oferta czynności w edytorze Programów idzie za postacią w przejściu, także czekającym (pytanie 15) i skończonym, do „Restart” albo „Zakończ” (pytanie 17), jak dziś.
6. Ekran przejścia pod `#/postac/{n}/przejscie` pokazuje to, co dziś stoi przy przejściu: panel programu z kopią i kolumnę przejścia; nowy układ robi zadanie 6.
   - Ekran dostaje przejście jako parametr i sam nie czyta przejścia ze stanu gry.
   - Lista wyboru panelu ma na górze „Kopia w przejściu”, a pod nią zapisane programy gracza (D-166).
   - Wysłanie postaci prowadzi na ten ekran.
   - „Zakończ” prowadzi na ekran Postać tej postaci (pytanie 6).
7. Wyjście z ekranu przejścia, którąkolwiek drogą, zatrzymuje je jak „Pauza”, a pętle chodzą dalej; powrót go nie wznawia, przejście czeka w pauzie na „Wznów” (pytanie 10).
   - Poza ekranem przejścia, gdy ręczne przejście trwa albo skończyło się i czeka na „Restart” albo „Zakończ”, w menu stoi „Wróć do przejścia · {mapa} · minuta {m}”, na przykład „Wróć do przejścia · Las · minuta 212”, i prowadzi pod adres przejścia (pytania 2 i 9).
   - Na samym ekranie przejścia tej pozycji nie ma (pytanie 9).
8. Na Siedzibie i ekranie Postać, gdy ręczne przejście czeka albo się skończyło, działa to, na co pozwala symulacja, a „Wyślij”, „Puść w pętlę” postaci z tego przejścia i „Kup” są nieaktywne (pytanie 3).
   - Przy nieaktywnych przyciskach Siedziby stoi „Przejście na mapie {mapa} jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.”.
   - Przy „Umiejętności” stoi „Przejście na mapie {mapa} jest niezakończone. Stopnie kupisz po jego zakończeniu.”.
9. Menu „Konto” trzyma adres, „Wyloguj” i sprawę niepotwierdzonego adresu z „Wyślij ponownie”, a wiersz niepotwierdzonego adresu znika z góry strony (D-97, D-157).
   - Zdanie o wyniku wysyłania stoi w menu „Konto”, bez znaku na pasku (pytanie 11).
   - Menu otwiera się kliknięciem albo klawiaturą, zamyka klawiszem Escape, kliknięciem obok i drugim kliknięciem, a fokus wraca wtedy na „Konto” (pytanie 11).
   - Menu zostaje otwarte, gdy „Wyloguj” albo „Wyślij ponownie” czeka na serwer, i po odpowiedzi stoi otwarte, aż gracz je zamknie, więc zdanie o wyniku da się przeczytać (pytanie 11).
10. Wiersz o nieudanym zapisie stoi pod paskiem menu i pokazuje się tylko przy kłopocie, także ze zdaniem D-97 po nieudanym zapisie przed wylogowaniem (D-208).
11. Zdanie strony nad ekranem gry, jak „Adres e-mail potwierdzony.” albo zdanie o odrzuconym zapisie, znika przy pierwszej zmianie ekranu (pytanie 12).
12. Wiersz wskrzeszenia czyta się „Wskrzeszenie za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie”, a poniżej godziny „za {m} min czasu realnego” (D-217), i odświeża się z upływem czasu także wtedy, gdy przejście czeka (odczyt nieskreślony przez Mariusza 2026-11-03, drugi pakiet rundy, część F).
13. Każda kolumna ekranu jest osobnym obszarem, który węższy układ może przestawić, a drużyna jest sekcją z nagłówkiem.
14. W React powstają pasek menu, ekran Postać i lista programów; Siedziba, panel programu i ekran przejścia zostają w DOM (pytanie 4).
   - Przycisk niszczący dostaje postać React z przypadkiem w teście porównującym obie postacie (D-265), bo „Zatrzymaj” na ekranie Postać i „Usuń” na liście programów stoją w React (odczyt nieskreślony przez Mariusza 2026-11-03, drugi pakiet rundy, część F).
15. `guidelines/styleguide-browser-view.md` dostaje wygląd i stany pozycji menu, menu „Konto” i pozycji listy programów, przycisk „Wyślij ponownie” przestaje tam stać „z nagłówka”, a przykład „„Wyloguj” w nagłówku” i wiersz nagłówka na stronie wszystkich stanów idą za menu „Konto”; zmiany idą przez `the-way-maintain-styleguide`.
16. `guidelines/coding-browser-module.md` dostaje przykład ekranu w React rysującego z bieżącego stanu gry i z adresu oraz wiersze nowych plików; zmiany idą przez `the-way-maintain-coding-guidelines`.
17. Fundament dostaje wszystko, co *Decisions in play* oznacza do zapisania w tym zadaniu, oraz poprawki D-196, D-207, D-225 i D-275 wymienione tam pod „Przykłady i zdania do poprawy w tym zadaniu”.
18. Agent przechodzi zmienione ekrany lokalnie w prawdziwej przeglądarce (D-254) i wkleja ich zrzuty do prośby o scalenie; Mariusz gra po scaleniu, a jego uwaga idzie kolejną zmianą (pytanie 14).

### Questions to settle

- Pytanie 1. Czy odświeżenie zostaje na ekranie z adresu, gdy zapis gry trzyma przejście?
  - Answer: Tak. Adres wygrywa, gdy nazywa ekran; zasada o Siedzibie albo przejściu z zapisu działa tylko pod adresem bez fragmentu i po zalogowaniu formularzem, a po odnośniku z maila strona otwiera Siedzibę. Przejście czeka bezpiecznie w pauzie, a koszt to jedno kliknięcie „Wróć do przejścia”.
  - Not chosen:
    - Przy przejściu w zapisie każde odświeżenie prowadzi na ekran przejścia — cel z planu niespełniony, a gracz piszący program traci miejsce przy każdym odświeżeniu.
    - Adres wygrywa też po zalogowaniu — inne konto w tej samej karcie trafia pod adres poprzedniego gracza.
    - Bez decyzji — cykl wybierze sam, a jego wybór będzie wyglądał jak ustalenie.
  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B1 pakietu rundy zadań 4–7; ta sama treść stoi w zatwierdzonym D-96 (definicja_mvp2_loop2.md, odcisk 9641f804, wiersz 601: „signing in with email and password, and reloading with a valid session at an address with no fragment, that form apart, also lead to Siedziba, or, when the saved game state holds a manual map run, to that map run […] while a reload at another address stays on the screen that address leads to, and after an emailed link (D-156, D-224) the page opens Siedziba”).
- Pytanie 2. Czy „Wróć do przejścia” stoi też po końcu przejścia, zanim gracz wybierze „Restart” albo „Zakończ”?
  - Answer: Tak, pozycja stoi też po końcu, do „Restart” albo „Zakończ”.
  - Not chosen:
    - Po końcu menu nie działa — nowy stan paska, a kopię i tak da się poprawić na ekranie końca.
    - Dosłownie jak w definicji sprzed bramki 2026-11-03 — po wyjściu po końcu zostaje tylko przycisk wstecz przeglądarki.
  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B3 (A) pakietu rundy; ta sama treść stoi w zatwierdzonym wpisie „(new) — Which screens does the game have, and how does the player move between them?” (definicja, odcisk 9641f804, wiersz 166: „outside the screen of a manual map run that goes on, or that has ended and waits for „Restart” or „Zakończ”, it also holds „Wróć do przejścia” with the map and the map run's clock”).
- Pytanie 3. Co gracz może robić na Siedzibie i ekranie Postać, gdy przejście czeka albo się skończyło, i czy gra mówi, dlaczego „Wyślij” i „Kup” nie działają?
  - Answer: Działa to, na co pozwala symulacja, a przy nieaktywnych przyciskach stoi jedno zdanie, prawdziwe w obu stanach: „Przejście na mapie {mapa} jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.”, a przy „Umiejętności”: „Przejście na mapie {mapa} jest niezakończone. Stopnie kupisz po jego zakończeniu.”. „Kup” jest odmówione także po końcu przejścia, do „Restart” albo „Zakończ”. Fakty z kodu przy 20d804b: symulacja odmawia „Wyślij” (`src/browser/sim/game.ts:316`) i „Kup” (`src/browser/sim/skills.ts:151`) przy każdym przejściu w stanie gry, także skończonym, a „Puść w pętlę” tylko postaci z tego przejścia (`src/browser/sim/loop.ts:118-123`).
  - Not chosen:
    - Jak wyżej, bez zdań — wyłączone przyciski bez powodu.
    - Siedziba i Postać tylko do oglądania — gracz nie puści pętli innej postaci, a kod musi blokować to, na co symulacja pozwala.
  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B3 (C) pakietu rundy; w pakiecie zdanie przy „Umiejętności” stało jako „… Stopnie kupisz po jego zakończeniu.”, gdzie „…” to pierwsze zdanie przy Siedzibie — odczyt nieskreślony przez Mariusza 2026-11-03 (drugi pakiet rundy, część F); zdania potwierdzone także przyjęciem wiersza kandydatów 1 (drugi pakiet rundy, część D). Cytaty: „„Wyślij” beside the other characters inactive wherever the headquarters shows during a manual map run” (foundations/decisions.md przy 20d804b, D-55, *Verification*); „A pause of a manual map run, its stop at a discovery and the screen after its end hold that map run, and the earning loops of other characters go on through them.” (D-250); zatwierdzony D-200 (definicja, odcisk 9641f804, wiersz 901): „outside a manual map run, one that has ended counting as a map run until „Restart” or „Zakończ””.
- Pytanie 4. Które ekrany tego zadania powstają w React?
  - Answer: Pasek menu, ekran Postać i lista programów powstają w React; Siedziba zostaje w DOM, traci tylko umiejętności, a przenosi ją zadanie 13; dzisiejszy panel programu i ekran przejścia zostają w DOM do zadań 5 i 6. Zadanie 4 przenosi umiejętności (`src/browser/view/character-skills.ts`, 123 wiersze, z 138 wierszami testu), a lista wyboru i pole liczby w React należą do zadania 5.
  - Not chosen:
    - Siedziba przechodzi na React w tym zadaniu — 552 wiersze i 18 przypadków testu, a wiersze wysyłania, które zadanie 13 usunie, trzeba napisać dwa razy; zysk: kolejne zadania zastają ją gotową.
  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B4 (A) pakietu rundy; reguła z zadania 27: „Reguła dotyczy tylko nowych ekranów: dokładka do starego ekranu może powstać w DOM, a przenosi ją dopiero zadanie tego ekranu.” (zadanie_hierarchia_przyciskow_i_karta_logowania.md, pytanie 5b).
- Pytanie 5. Czy ekran Programy dostaje listę programów po lewej już w tym zadaniu?
  - Answer: Tak, listę po lewej z „Nowy program”, „Zmień nazwę” i „Usuń” buduje zadanie 4, a obok stoi dzisiejszy panel w trybie przejściowym; zadanie 5 wymienia już tylko edytor. Gracz ma układ docelowy od razu, a największe zadanie maleje. Ta sama odpowiedź obowiązuje zadanie 5 (edytor-programu, pytanie o listę programów).
  - Not chosen:
    - Listę robi zadanie 5, od razu w nowym edytorze — do tego czasu ekran wygląda jak wycięty panel, a `#/programy/{n}` niczego nie wybiera na liście; zysk: lista powstaje raz.
    - Bez decyzji — oba dokumenty mogą założyć, że listę robi drugie zadanie.
  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B5 (A) pakietu rundy.
- Pytanie 6. Dokąd prowadzi „Zakończ”, zanim powstanie ekran Map?
  - Answer: Na ekran Postać tej postaci, już w tym zadaniu; wysyłanie z karty mapy czeka na zadanie 13.
  - Source: cytaty, nieskreślone przez Mariusza 2026-11-03: „The player sends a character to a game map from the card of the map on the screen Mapy, and „Zakończ” returns to the screen Postać of that character.” (definicja, odcisk 9641f804, wiersz 541, D-53); „ekran Map (zadanie 13) idzie po edytorze (zadanie 5), a do tej chwili postać rusza z Siedziby jak dziś” (plan_mvp2_loop2.md, dziennik, 2026-11-01). Krok, którego cytat nie mówi wprost: plan daje D-53 zadaniom 4 i 13, wysyłanie czeka na 13, więc zadaniu 4 przypada samo „Zakończ”.
- Pytanie 7. Co stoi w pasku menu, zanim powstaną Mapy i Wiedza, i jak gracz dochodzi do ekranu Postać?
  - Answer: Pasek ma Siedzibę, Programy i „Konto”; imię na karcie postaci prowadzi na Postać, a na Postaci pasek znaczy Siedzibę, jak w starym Loop. Pozycje nie mają ikon, inaczej niż w starym Loop.
  - Not chosen:
    - Mapy i Wiedza stoją od razu, wyłączone — dwie pozycje bez treści.
  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta propozycja T1 pakietu rundy; znak bieżącej pozycji daje D-277 (foundations/decisions.md przy 20d804b).
- Pytanie 8. Co się dzieje pod adresem, który nie prowadzi do istniejącego ekranu?
  - Answer: Strona po cichu otwiera najbliższy istniejący ekran: adres przejścia bez przejścia ekran Postać tej postaci, `#/programy/{n}` bez programu `#/programy`, każdy inny Siedzibę.
  - Not chosen:
    - Ekran „Nie ma takiego miejsca” — trafia na niego przycisk wstecz po „Zakończ”.
  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta propozycja T2 pakietu rundy; ta sama treść stoi w zatwierdzonym wpisie „(new) — How does an address name a screen?” (definicja, odcisk 9641f804, wiersz 181).
- Pytanie 9. Jak brzmi „Wróć do przejścia” i czy stoi też na samym ekranie przejścia?
  - Answer: „Wróć do przejścia · Las · minuta 212”: czas przejścia w minutach gry, jak dziś w wierszu stanu, a liczba stoi nieruchomo, bo przejście czeka w pauzie. Pozycja stoi tylko poza ekranem przejścia. Ten sam zapis zegara bierze nagłówek ekranu przejścia w zadaniu 6.
  - Not chosen:
    - „03:32” — nowy zapis czasu, którego gra nie ma.
    - Pozycja także na ekranie przejścia — odnośnik do miejsca, w którym gracz już jest.
  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B16 (A i C) pakietu rundy; fakt z kodu: `src/browser/view/status-row.ts:75` przy 20d804b zaczyna wiersz stanu od `Minuta ${run.minute}`.
- Pytanie 10. Czy powrót do przejścia wznawia je sam?
  - Answer: Nie. Przejście stoi w pauzie, a gracz naciska „Wznów”.
  - Not chosen:
    - Wznawia się samo, jeśli szło przed wyjściem — gra musi wtedy pamiętać, kto pauzował, a odświeżenie tę pamięć gubi (droga pokazana w pakiecie rundy, A2, na wypadek skreślenia cytatu).
  - Source: cytaty, nieskreślone przez Mariusza 2026-11-03, a wiersz kandydatów 14 przyjęty przez niego 2026-11-03 („wszystko przyjmuję zgodnie z rekomendacjami”, drugi pakiet rundy, część D): „Leaving the screen of a manual map run pauses it as „Pauza” does.” (definicja, odcisk 9641f804, wiersz 196); „one pause gives the player one way to hold a map run and one way to go on.” (definicja, uzasadnienie D-122); „the map run stops in the same pause as after „Pauza”, and the player goes on with „Wznów”.” (definicja, D-122); „A pause holds a map run without ending it, and it stays an act of its own” (foundations/decisions.md, D-21, uzasadnienie). Krok: żadne zdanie nie mówi wprost o powrocie, odpowiedź wynika ze złożenia zdania o wyjściu i zdania o jednej pauzie.
- Pytanie 11. Jak działa menu „Konto”, co stoi na pasku poza pozycjami i jaką szerokość ma treść?
  - Answer:
    1. Nazwa gry stoi po lewej na pasku, a na ekranach oczekiwania (D-262) stoi sama, bez pozycji.
    2. „Konto” otwiera się kliknięciem albo klawiaturą, zamyka klawiszem Escape, kliknięciem obok i drugim kliknięciem, a fokus wraca na „Konto”.
    3. Menu zostaje otwarte, gdy „Wyloguj” albo „Wyślij ponownie” czeka na serwer, i po odpowiedzi też stoi otwarte, aż gracz je zamknie, więc wynik da się przeczytać. Ostrzeżenie o nieudanym zapisie przed wylogowaniem stoi pod paskiem, nie w menu.
    4. Zdanie o wysłanej wiadomości po rejestracji stoi w zamkniętym menu „Konto”, bez znaku na pasku; znany koszt: gracz nie zobaczy też „Nie udało się wysłać wiadomości.”, dopóki nie otworzy „Konto”.
    5. Treść ma najwyżej 1344 px szerokości, a przy węższym oknie zajmuje całą szerokość.
  - Not chosen:
    - Punkty 1 i 2 bez ustalenia — cykl wybierze sam.
    - Punkt 2: menu otwiera i zamyka tylko kliknięcie w „Konto” — pytanie kontrolne nie podało kosztu tej drogi; słabość wybranej: wymagania dostępności gry (D-42) tego nie żądają, a przewodnik stylu dostaje nowy rodzaj elementu z obsługą klawiatury.
    - Punkt 3: menu zamyka się od razu — zdanie o wyniku znika.
    - Punkt 3, po odpowiedzi serwera: menu zamyka się samo, a wynik czyta się po ponownym otwarciu — pytanie kontrolne nie podało kosztu tej drogi poza tym opisem.
    - Punkt 5: inna liczba — zmienia tylko jeden wymiar.
  - Source: punkty 1, 2, 3 i 5: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęte propozycje T3, T4, T5 i T6 pakietu rundy; punkty 2 i 3 potwierdzone w pytaniach kontrolnych E1 (droga A, „Utrzymujesz”) i E2 (droga A, „Po odpowiedzi menu też stoi otwarte, aż gracz je zamknie, więc wynik da się przeczytać.”) drugiego pakietu rundy: Mariusz, 2026-11-03: „wszystko przyjmuję zgodnie z rekomendacjami”; liczba 1344 pochodzi z `rozpoznanie_mvp2\rozpoznanie_projektant.md`, część A.3. Punkty 3 i 4 w części cytatem, nieskreślonym przez Mariusza 2026-11-03: „A signed-in player whose email address is unconfirmed sees in the menu „Konto” „Adres e-mail niepotwierdzony.” in `text-secondary` and the shared button „Wyślij ponownie”, both gone once the address is confirmed.” i „Right after registration and after each sending asked for, the sentence in that place gives the outcome of the sending” (definicja, odcisk 9641f804, wiersz 796, D-157), odrzucone: „a line in the header of every screen — the first thing the player reads of the game is a request about an address” (wiersz 805); „When one fails, the header line under the menu bar shows „Nie udało się zapisać postępu. Gra spróbuje ponownie.” in `warning`, or, once the save before a logout has failed, the sentence D-97 gives for that failure” (wiersz 916, D-208).
- Pytanie 12. Jak długo zdania strony stoją nad ekranem gry?
  - Answer: Zdanie stoi nad pierwszym ekranem i znika przy pierwszej zmianie ekranu.
  - Not chosen:
    - Stoi nad każdym ekranem do przeładowania — zdanie z chwili wejścia wisi nad Programami i Postacią.
  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta propozycja T7 pakietu rundy; utrzymana w pytaniu kontrolnym E3 drugiego pakietu rundy, które nazwało słabość wyboru („Gracz, który od razu kliknie w menu, może go nie przeczytać.”): Mariusz, 2026-11-03: „wszystko przyjmuję zgodnie z rekomendacjami”. Cytaty: „above the account forms for a signed-out player and above the game for a signed-in one, whatever screen the game opens on” (foundations/decisions.md, D-156); „above which stands once” (D-96).
- Pytanie 13. Czy zapisywany D-96 zachowuje zdanie o błędzie kodu przy wczytywaniu?
  - Answer: Tak, razem z klauzulą uzasadnienia; zatwierdzony D-96 już je ma.
  - Source: cytaty, nieskreślone przez Mariusza 2026-11-03, a dziś zdanie zatwierdzonego D-96 (definicja, odcisk 9641f804, wiersz 601): „as does a load that meets an error of the code (D-213), which discards nothing, with „Nie udało się wczytać gry. Spróbuj ponownie.” in `warning`”, i jego uzasadnienia (wiersz 609): „an error of the code in the load says nothing about the saved game state, so it costs the player a retry and never the state”; D-213 (foundations/decisions.md) odsyła do tego zdania: „while the player gets the sentence of D-96”.
- Pytanie 14. Jak człowiek sprawdza zmianę?
  - Answer: Agent przechodzi ekrany lokalnie i wkleja zrzuty do prośby o scalenie, a Mariusz gra po scaleniu; uwaga idzie kolejną zmianą, jak w zadaniu 27. Błędy adresów i fokusu widać i łatwo poprawić kolejną zmianą. Human actions: none.
  - Not chosen:
    - `npm run local` na gałęzi przed scaleniem — czas Mariusza przed scaleniem.
    - Wdrożenie gałęzi na serwer testowy przed scaleniem — to samo plus wdrożenie.
  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B17 (X) pakietu rundy dla zadania 4.
- Pytanie 15. Co pokazuje ekran Programy, gdy przejście czeka albo się skończyło?
  - Answer: Programy pokazują zawsze zapisany program, nigdy kopię, a nad edytorem stoi zdanie „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.”; „Przełącz postać na ten program” zostaje na ekranie przejścia. W edytorze czekające przejście liczy się jak trwające, czyli oferta czynności idzie za postacią w przejściu, jak dziś w kodzie. Koszt: poprawka zrobiona w Programach nie dochodzi do czekającego przejścia, chyba że gracz przełączy postać, co zeruje passę; zysk: adres zawsze nazywa zapisany program.
  - Not chosen:
    - Na liście po lewej staje też „Kopia w przejściu” — lista i adres muszą obsłużyć kopię, więcej pracy w zadaniach 4 i 5, zmiana projektowanego wpisu o programach; zysk: poprawka działa z każdego miejsca.
    - Gdy przejście czeka, „Programy” prowadzą na ekran przejścia — gracz nie napisze zapisanego programu przy czekającym przejściu.
    - Bez decyzji — cykl zgadnie, a to, czy poprawka dojdzie do przejścia, gracz odkryje po fakcie.
  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B2 (A) pakietu rundy; ta sama treść stoi w zatwierdzonym D-166 (definicja, odcisk 9641f804, wiersz 811). Fakt z kodu przy 20d804b: `editorRepertoire` bierze repertuar postaci z przejścia, dopóki przejście stoi w stanie gry, także skończone (`src/browser/sim/understanding.ts:138-150`).
- Pytanie 16. Co otwiera „Anuluj” formularza „Ustaw nowe hasło”?
  - Answer: Zalogowanemu graczowi Siedzibę, jak po każdym odnośniku z maila; niezalogowany widzi formularze konta, jak dziś.
  - Source: cytaty, nieskreślone przez Mariusza 2026-11-03 (drugi pakiet rundy, A1; „wszystko przyjmuję zgodnie z rekomendacjami”): „and after an emailed link (D-156, D-224) the page opens Siedziba” (zatwierdzony D-96, definicja, odcisk 9641f804, wiersz 601, w zdaniu o graczu z ważną sesją), gdzie D-224 to „What form does a password-reset link take?” (foundations/decisions.md przy 20d804b); D-225 mówi dziś: „„Anuluj”, which removes the fragment of the address and opens the page as usual”. Krok, którego cytat nie mówi wprost: „Anuluj” kończy stronę otwartą odnośnikiem D-224, więc zdanie o odnośniku z maila obejmuje też je; ten krok to odczyt agenta od planu (plan_mvp2_loop2.md, dziennik, 2026-11-03, uwaga dla zadania 4 o D-225), pokazany Mariuszowi w A1. Uwaga planu w tej samej linii: wybór przejścia z zapisu byłby odejściem od zatwierdzonego D-96 i dostałby własną linię w dzienniku.
- Pytanie 17. Co oferuje edytor w Programach po końcu przejścia, do „Restart” albo „Zakończ”?
  - Answer: Czynności postaci z przejścia, do „Restart” albo „Zakończ”, jak dziś w kodzie i jak przyjęte „Kup” po końcu („one that has ended counting as a map run”). D-196 trzeba przy tym doprecyzować. Ta sama odpowiedź obowiązuje zadanie 5, które buduje ten edytor.
  - Not chosen:
    - Oferta archetypu po końcu, jak D-196 czytana dosłownie — kod do zmiany, a w Programach po śmierci oferta zmienia się, choć przejście jeszcze stoi.
  - Source: Mariusz, 2026-11-03: „wszystko przyjmuję zgodnie z rekomendacjami” — przyjęta rekomendacja C1 (A) drugiego pakietu rundy. Cytaty: D-196 (foundations/decisions.md przy 20d804b): „Outside a map run the program editor currently offers the repertoire computed from the Understanding through the archetype’s predispositions […] During a map run, both the copy editor and the saved-program editor use the running character’s repertoire, including its bought branches.”; zatwierdzony D-200 (definicja, odcisk 9641f804, wiersz 901): „outside a manual map run, one that has ended counting as a map run until „Restart” or „Zakończ””. Fakt z kodu przy 20d804b: `editorRepertoire` bierze repertuar postaci z przejścia, dopóki `state.run` stoi w stanie gry (`src/browser/sim/understanding.ts:138-150`).

## Context

- Numery wierszy kodu poniżej są z commitu `20d804b`; pliki, których dotyczą, nie zmieniły się od `799d1ff`.
- Zadanie 27 jest scalone (PR #54): dało znak bieżącej pozycji menu (D-277), akcję poboczną (D-275), zakładkę (D-276) i status `do not copy` przy modułach w DOM w `guidelines/coding-browser-module.md`.
- Plan, 2026-11-01: „ekran Map (zadanie 13) idzie po edytorze (zadanie 5), a do tej chwili postać rusza z Siedziby jak dziś”.
- Zadanie 13 nie należy do fazy „Przed zgłoszeniem 10x”, więc wysyłanie z Siedziby może zostać na dłużej.
- Dzisiejszy układ i widoczność Siedziby: `src/browser/view/game-view.ts:94-104`, `:267-280`.
- Wiersze wskrzeszenia odświeżają się dziś tylko bez przejścia (`src/browser/view/game-view.ts:179-181`).
- Widok programu to stan panelu, nie stanu gry (`src/browser/view/program-panel.ts:94`).
- Nagłówek, stopka, ekrany oczekiwania i „Wyloguj”: `src/browser/view/app.ts:134-156`, `:397-436`.
- Czysto liczące funkcje wiersza wskrzeszenia i pętli stoją dziś w `src/browser/view/headquarters.ts:101`, `:122`, `:130`, a ekran Postać ich potrzebuje.
- Umiejętności: `src/browser/view/character-skills.ts`; „Kup” jest wyłączone przy każdym przejściu (`:115`).
- Wspólne kontrolki w React to dziś przycisk — zwykły, akcja poboczna, wybrany w grupie i zakładka (`src/browser/view/controls/react-button.tsx:10`) — i pola tekstowe (`react-text-field.tsx`); przycisk niszczący, lista wyboru i pole liczby mają tylko postać DOM.
- D-270 nie dopuszcza biblioteki adresów opartej na React bez zmiany tej decyzji, więc adresy obsługuje kod produktu.
- Plan, 2026-11-03, uwaga dla zadań 4 i 13: D-196 i D-55 mówią o przejściu w toku, a skończone przejście zostaje w stanie gry do „Restart” albo „Zakończ”; zadanie 4, które poprawia D-196, nazywa przy tym stan po końcu przejścia.
- Szkic ekranów i przejść stoi w `rozpoznanie_mvp2\rozpoznanie_projektant.md`, części A.3 i A.4; to materiał, nie zatwierdzone wymaganie.
- Zadanie nie zmienia sposobu wdrażania ani miejsca działania gry.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

Wpisy obecne cytuje `foundations/decisions.md` przy loop2 `20d804b`. Wpisy projektowane cytuje `definicja_mvp2_loop2.md` zatwierdzona 2026-11-03, odcisk 9641f804. Przydziały pochodzą z sekcji *Projected entries* planu.

Pole *Relations* i *Verification* wpisu projektowanego z `TODO` cykl ustala przy zapisie, a pole, które czeka na zadanie, zostaje takie, jak w fundamencie (definicja, „Projected foundation changes”).

### Zadanie zapisuje w całości

- (new) — What happens to a manual map run when the player leaves its screen? (definicja): „Leaving the screen of a manual map run pauses it as „Pauza” does.”
- D-96 — What does a player see before and after signing in? (definicja, wpis zmieniony): „Anyone can create an account without operator approval or email confirmation and immediately enters Siedziba signed in; signing in with email and password, and reloading with a valid session at an address with no fragment, that form apart, also lead to Siedziba, or, when the saved game state holds a manual map run, to that map run — paused while it goes on, or on its screen after its end when it ended in a completion or in the character's death — while a reload at another address stays on the screen that address leads to, and after an emailed link (D-156, D-224) the page opens Siedziba.”
  - Wpis zachowuje zdanie o błędzie kodu przy wczytywaniu i klauzulę uzasadnienia o nim (pytanie 13), a jego *Rejected* niesie drogi nie wybrane w pytaniu 1.
- D-97 — What does the player's logout do? (definicja): „The shared „Wyloguj” button stands in the menu „Konto”, first saves the current game state on the server while it reads „Wylogowywanie…”, and then ends only this browser's server-side session”.
- D-157 — What does a signed-in player see of an unconfirmed address, and who may ask for another confirmation message? (definicja): „A signed-in player whose email address is unconfirmed sees in the menu „Konto” „Adres e-mail niepotwierdzony.” in `text-secondary` and the shared button „Wyślij ponownie”, both gone once the address is confirmed.”
- D-199 — What does the screen Postać show of character skills? (definicja): „The screen Postać shows „Umiejętności” after a tree is known, with a row for each known tree giving „{umiejętność} — poziom {p} · wprawa {w}/{próg} · punkty {k}””, reszta treści bez zmian.
- D-200 — Where does the player buy a branch rank, and when does it act? (definicja, wpis zmieniony): „The player currently buys a branch rank with „Kup” on the screen Postać outside a manual map run, one that has ended counting as a map run until „Restart” or „Zakończ”, at a character in an earning loop too”.
- D-208 — What does the player see of saving the game state? (definicja): „When one fails, the header line under the menu bar shows „Nie udało się zapisać postępu. Gra spróbuje ponownie.” in `warning`, or, once the save before a logout has failed, the sentence D-97 gives for that failure”.
- D-212 — How does a manual map run come back from a loaded saved game state? (definicja, wpis nowy w definicji): „one that ended in a completion or in the character's death comes back with its screen after its end, with „Restart”, „Zakończ” and the copy open to editing as D-62, D-132 and D-173 give, and the screen the page opens on is the one D-96 gives.”
- D-217 — What does the game show of a character's resurrection? (definicja): „The card and the screen of a character show, from its creation, „Wskrzeszenie gotowe” in `text-secondary`, and while the resurrection is not ready „Wskrzeszenie za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” in `danger`, the time reading „za {m} min czasu realnego” below one hour.”
- D-244 — What does the player see of an earning loop? (definicja): „A running earning loop currently shows on the card and the screen of its character as one line in the role `text`, „Pętla: {mapa} · przejście {n} · minuta {m} · domknięte {k}”, with the button „Zatrzymaj”.”
- `headquarters` (definicja, słownik): „The headquarters is the screen Siedziba, which shows the player's team with its characters and its chest.”

### Zadanie urzeczywistnia część, a resztę pisze inne zadanie

Część, którą kod tego zadania czyni prawdziwą, zadanie zapisuje w fundamencie (WAY-126), bo inaczej fundament mówiłby nieprawdę o scalonej grze.

- (new) — Which screens does the game have, and how does the player move between them? (definicja; pisze zadanie 22): „The game has the screens Siedziba, Postać, Mapy, Programy, Wiedza and Przejście, all of one content width under one menu bar. The menu bar holds Siedziba, Mapy, Programy, Wiedza and the menu „Konto” with the address and „Wyloguj”, and outside the screen of a manual map run that goes on, or that has ended and waits for „Restart” or „Zakończ”, it also holds „Wróć do przejścia” with the map and the map run's clock.”
  - Część tego zadania: ekrany Siedziba, Postać, Programy i Przejście, jedna szerokość, pasek z Siedzibą, Programami i „Konto”, „Wróć do przejścia”.
- (new) — How does an address name a screen? (definicja; pisze zadanie 22): „An address names a screen in the fragment after `#`: `#/`, `#/postac/{n}`, `#/mapy`, `#/mapy/{map}`, `#/programy`, `#/programy/{n}`, `#/wiedza` and `#/postac/{n}/przejscie`, the last naming a map run by the number of its character, and an address that leads to no existing screen silently opens the nearest one: `#/postac/{n}/przejscie` with no map run the screen Postać of that character, `#/programy/{n}` with no such program `#/programy`, and any other Siedziba. The screen of a map run takes its map run as a parameter and reads no map run of the game state by itself. The fragments of emailed links (D-156, D-224) stand apart from these, and after them the page opens Siedziba.”
  - Część tego zadania: wszystko poza adresami Map i Wiedzy.
- (new) — What do the screens leave room for from the start? (definicja; pisze zadanie 5): „Each column of a screen is an area of its own that a narrower layout can rearrange, Siedziba draws the team as a section with a heading, and the rule panel offers its pick in steps, the action first and its target after it.”
  - Część tego zadania: obszary i drużyna jako sekcja.
- D-44 — Which controls do the screens of the browser view build on? (definicja; pisze zadanie 5): „and the button „Wyślij ponownie” then reads „Wysyłanie…””.
  - Część tego zadania: to słowo; dziś stoi „the header's button „Wyślij ponownie””.
- D-53 — Where does the player send a character from, and where does „Zakończ” lead? (definicja; pisze zadanie 13): „The player sends a character to a game map from the card of the map on the screen Mapy, and „Zakończ” returns to the screen Postać of that character.”
  - Część tego zadania: „Zakończ” (pytanie 6); wysyłanie z karty mapy robi zadanie 13.
- D-166 — Where does the player see the player's programs and pick the one to edit? (definicja, wpis zmieniony; pisze zadanie 5): „The screen Programy holds on the left the list of the player's programs and in the middle the program editor with the program picked there. That program is always a saved one, never the copy: while a manual map run goes on, or has ended and waits for „Restart” or „Zakończ”, „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.” stands above the editor, and „Przełącz postać na ten program” stands on the screen of a map run alone. On the screen of a map run the program panel shows the copy, and its select list holds „Kopia w przejściu” at its top and the player's saved programs below it.”
  - Część tego zadania: cały wpis poza nowym edytorem, który robi zadanie 5 (pytania 5 i 15).
  - Obecny D-166 uznaje za błąd „a section of the headquarters or a screen of its own listing the programs”, więc to zdanie musi odejść w tym zadaniu.
- D-245 — What does „Zatrzymaj” do? (definicja; pisze zadanie 25): „On the character's card and screen, until the next send or start of that character and after a load of the saved game state too, stands in the role `text-secondary` „Pętla zatrzymana · wprawa: {umiejętność} +{n}, …”, or „Pętla zatrzymana” where the earning loop gathered no practice.”
  - Część tego zadania: karta i ekran zamiast „row”.
- D-246 — What does the player read after being away? (definicja, wpis zmieniony; pisze zadanie 25): „and a player returning to a manual map run reads the report on reaching Siedziba.”
  - Część tego zadania: to zdanie; dziś stoi „a player returning to a manual map run reads the report in the headquarters after „Zakończ””, co przestaje być prawdą, gdy Siedziba jest dostępna przed „Zakończ”, a po nim gracz trafia na Postać.
- D-03 — How is the browser view built? (zapisana w zadaniu 2): „The browser view is built in TypeScript with React, its screens written as `.tsx` components that draw from the game state”.
  - Plan wymienia to zadanie wśród urzeczywistniających; zakres rozstrzyga pytanie 4.

### Przykłady i zdania do poprawy w tym zadaniu

- D-196 (*Verification* i *Rationale*): „a branch bought by any teammate opening that action in the headquarters editor”, „the headquarters editor cannot add a branch action”; edytor stoi teraz na ekranie Programy (plan, pytanie o nieaktualne przykłady: „D-196 i D-207 w zadaniu 4”). Zdanie wiążące „During a map run, both the copy editor and the saved-program editor use the running character’s repertoire” nazywa przy tym przejście, które czeka (pytanie 15), i przejście, które skończyło się i czeka na „Restart” albo „Zakończ” (pytanie 17; plan, uwaga dla zadań 4 i 13): w obu edytorach oferta idzie wtedy za postacią z przejścia. *Rejected* niesie drogę nie wybraną w pytaniu 17.
- D-207 (*Verification*): „„Kup” of a branch rank in the headquarters followed at once by a save request”; „Kup” stoi teraz na ekranie Postać.
- D-225: „„Anuluj”, which removes the fragment of the address and opens the page as usual”; po tym zadaniu „Anuluj” otwiera zalogowanemu graczowi Siedzibę, a niezalogowany widzi formularze konta, jak dziś (pytanie 16). Reszta D-225, zdanie po ustawieniu hasła i po odmowie odnośnika, zostaje bez zmian.
- D-275 (*Verification*): „„Wyloguj” in the header kept a plain button”; „Wyloguj” stoi teraz w menu „Konto” (D-97).

### Obecne decyzje, których zadanie dotyka bez zmiany

- D-55 — How many manual map runs go on at a time? (*Verification*): „„Wyślij” beside the other characters inactive wherever the headquarters shows during a manual map run”; stan po końcu przejścia nazywa przy tym wpisie zadanie 13 (plan, uwaga dla zadań 4 i 13).
- D-122 — What does a map run do, and what does the player see, when something is discovered?: „the map run stops in the same pause as after „Pauza””.
- D-129 — How long does the pace the player picks stay?: „through a pause, the pause at a discovery included”.
- D-156 — How does an emailed link confirm a player's email address?: „above the account forms for a signed-out player and above the game for a signed-in one, whatever screen the game opens on”.
- D-164 — Who owns a program?: „A program can be edited at any time”.
- D-170, D-188, D-243, D-251 i D-149 zostają przy Siedzibie, bo wysyłanie zostaje tam do zadania 13.
- D-180 — Where does the player arrange the trip plan?: „The program panel shows a section „Plan wyprawy” below the rule groups”; plan przydziela zmianę zadaniom 5 i 13.
- D-207 — When does the game save the game state on the server?: „right after each change of it the player makes — […] a pause and a pace”, więc pauza przy wyjściu z ekranu zapisuje, a sama zmiana ekranu nie.
- D-213 — Which file is the exemplar for saved-game code?: o błędzie kodu przy wczytywaniu „while the player gets the sentence of D-96”.
- D-250 — What does a pause or an end screen hold?: „hold that map run, and the earning loops of other characters go on through them”.
- D-262 — What stands on the screen of the login card, and where do the waiting screens stand?: „The waiting screens […] stand outside the card, with the header and the footer, for a signed-in player too.”
- D-27 — Where do the game's icons come from?: „The game's footer and a section of credits on the login card”; stopka zostaje do zadania 24.
- D-265 — How does a shared control stand in a screen built with React while other screens stay in DOM?: „a shared control that a React screen uses has two forms in `src/browser/view/controls/`, a React component and a DOM function”, „a screen no task has moved to React yet stays in those APIs on the DOM form”.
- D-264 — What does a test of a screen built with React run on?: „One harness, `tests/view/page-document.mjs`, carries those files”.
- D-269 — Does the kitchen-sink page hold React?: „it shows each shared control in its DOM form”.
- D-270 — Which libraries built on React may the browser view take?: „counts as another UI framework under D-03, whether it draws anything or not”.
- D-276 — What is a tab of the browser view?: „A tab keeps the HTML element, `aria-pressed` and keyboard of the button selected in its group”.
- D-277 — How does the menu bar show where the player is?: „The menu bar marks the place the player is at as the chosen tab is marked (D-276): its text in `text-strong` and the same line in `selected` at its bottom.”
  - Odczyt nieskreślony przez Mariusza 2026-11-03 (drugi pakiet rundy, część F; „wszystko przyjmuję zgodnie z rekomendacjami”): na ekranie przejścia pasek menu nie znaczy żadnej pozycji, bo D-277 każe znaczyć miejsce, w którym gracz jest, a żadna pozycja go nie nazywa; „Wróć do przejścia” tam nie stoi (pytanie 9).
- D-75, D-88 i D-254: zachowanie w prawdziwej przeglądarce sprawdza agent i człowiek, a imitacja dokumentu tego nie dowodzi.
- D-42 i D-47: kryteria dostępności i wspólna obwódka fokusu obejmują nowe odnośniki menu bez dodatku.

## Settlements to record

Candidates: 15 shown, 11 accepted — 2026-11-03

Numery wierszy są numerami drugiego pakietu rundy, część D. Wiersze 12, 13, 15 i 16 odrzucone, bo kończą się z zadaniem albo już je mówią zatwierdzone wpisy; wiersz 5 przeszedł do odczytu D-277 pod *Decisions in play*.

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Na Siedzibie i ekranie Postać, gdy ręczne przejście czeka albo się skończyło, działa to, na co pozwala symulacja, a przy nieaktywnych przyciskach stoi „Przejście na mapie {mapa} jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.”, a przy „Umiejętności” „Przejście na mapie {mapa} jest niezakończone. Stopnie kupisz po jego zakończeniu.”. | decision | Pytanie 3 | czy nieaktywne „Wyślij”, „Puść w pętlę” i „Kup” mówią, dlaczego nie działają, i jakimi słowami |
| 2 | Pozycja menu czyta się „Wróć do przejścia · {mapa} · minuta {m}”, z minutą gry jak w wierszu stanu, która stoi nieruchomo, bo przejście czeka w pauzie. | decision | Pytanie 9 | zapis zegara przy pozycji: minuta gry czy „03:32” |
| 3 | Imię na karcie postaci w Siedzibie prowadzi na ekran Postać, a na ekranie Postać pasek menu znaczy Siedzibę, jak w starym Loop. | decision | Pytanie 7 | którędy gracz dochodzi do ekranu Postać i którą pozycję pasek wtedy znaczy |
| 4 | Pozycje paska menu nie mają ikon, inaczej niż w starym Loop. | decision | Pytanie 7 | czy przenieść ikony pozycji menu ze starego Loop |
| 6 | Nazwa gry stoi po lewej na pasku menu, a na ekranach oczekiwania stoi sama, bez pozycji. | decision | Pytanie 11, punkt 1 | czy nazwa gry zostaje na pasku i co stoi na ekranach oczekiwania |
| 7 | Menu „Konto” otwiera się kliknięciem albo klawiaturą, zamyka klawiszem Escape, kliknięciem obok i drugim kliknięciem, a fokus wraca na „Konto”. | decision | Pytanie 11, punkt 2 | obsługa klawiatury i zamykania menu, której D-42 nie wymaga |
| 8 | Menu „Konto” zostaje otwarte, gdy „Wyloguj” albo „Wyślij ponownie” czeka na serwer, i po odpowiedzi też stoi otwarte, aż gracz je zamknie, więc wynik da się przeczytać. | decision | Pytanie 11, punkt 3 | czy menu zamyka się po kliknięciu albo po odpowiedzi, gubiąc zdanie o wyniku |
| 9 | Treść ekranów ma najwyżej 1344 px szerokości, a w węższym oknie zajmuje całą szerokość. | decision | Pytanie 11, punkt 5 | szerokość treści wspólna dla zadań 5, 6, 13 i 22 |
| 10 | Zdanie strony nad ekranem gry, jak „Adres e-mail potwierdzony.”, znika przy pierwszej zmianie ekranu. | decision | Pytanie 12 | czy zdanie z chwili wejścia stoi nad każdym ekranem do przeładowania |
| 11 | W edytorze Programów przejście czekające, a także skończone, do „Restart” albo „Zakończ”, liczy się jak trwające: oferta czynności idzie za postacią w przejściu, jak dziś w kodzie (zmienia D-196). | decision | Pytanie 15 dla przejścia czekającego, pytanie 17 dla skończonego | czy przy czekającym albo skończonym przejściu edytor Programów oferuje repertuar postaci z przejścia czy archetypu |
| 14 | Powrót do przejścia go nie wznawia; gracz naciska „Wznów”. | decision | Pytanie 10 | czy powrót na ekran przejścia wznawia je samo, gdy szło przed wyjściem — zadanie 6 przebudowuje ten ekran, a wpis o wyjściu z ekranu przejścia mówi tylko o wyjściu |

## Out of scope

- Ekrany Mapy i Wiedza oraz ich adresy robią zadania 13 i 22.
- Przeniesienie Siedziby do React robi zadanie 13.
- Nowy edytor programu i przeniesienie „Plan wyprawy” robi zadanie 5.
- Nowy układ ekranu przejścia robi zadanie 6.
- Zwinięcie wzmianek i przeniesienie ich ze stopki do Siedziby robi zadanie 24.
- Pas obrazu u góry Siedziby i obóz robi zadanie 21.
- Układ na telefon: zadanie tylko zostawia na niego miejsce.
