---
title: Drobne błędy ekranów z uwag PR-ów — edytor programu, panel reguły, siedziba, konto i scena
status: draft
created: 2026-11-16
updated: 2026-11-16
tags: [zadanie]
related: "(P) Loop"
---

# Drobne błędy ekranów z uwag PR-ów — edytor programu, panel reguły, siedziba, konto i scena

Status: ready for cycle
Project relation: independent
Defect introduced by: https://github.com/mariusznazar/loop2/pull/21 · https://github.com/mariusznazar/loop2/pull/45 · https://github.com/mariusznazar/loop2/pull/47 · https://github.com/mariusznazar/loop2/pull/56 · https://github.com/mariusznazar/loop2/pull/58 · https://github.com/mariusznazar/loop2/pull/59

## Description

### Need

- Gracz trafia na ekranach gry na drobne błędy zgłoszone w przeglądach PR-ów i dotąd nienaprawione: linię powiązania przy nieodkrytym kafelku, liczby warunków bez jednostki, fokus klawiatury wypadający na stronę, grupy zwinięte w nowej kopii, ikonę oderwaną od nazwy w panelu reguły, wyszarzoną komórkę udającą klikalną, powtórzony marsz maga.
- Część zgłoszeń to rozjazdy decyzji z kodem; agent czytający decyzję dosłownie „naprawi” kod wbrew temu, co gracz ma dostać, a każdy kolejny przegląd zgłasza je od nowa.

### To do

1. Najechanie kursorem na nieodkryty kafelek rysunku mapy nie rysuje linii powiązania (`link-highlight`); linia stoi tylko przy kafelku odkrytym, który ma wiersz w tabeli odkrytych kafelków (D-41; uwaga loop2#021-1).
2. Długie imię postaci bez spacji łamie się w wierszu drużyny Siedziby i nie wychodzi poza wiersz (loop2#024-3).
3. Liczba warunku stoi z jednostką z danych warunku — „Zostało mniej niż — ognisko 20 min”, „°C”, „%”, „szt.”, „pkt” — w zdaniu wiersza reguły, przy polu liczby w panelu reguły i w zdaniu reguły wilka na ekranie przejścia („Wilk: Zdrowie poniżej 8 → Odskocz”, `src/browser/view/combat-line.ts`) (pytanie 17; loop2#025-2).
4. Po odrzuconym odnośniku z maila i po „Anuluj” fokus klawiatury trafia na kartę logowania, nie na stronę; D-381 dopisuje oba przypadki do tych, po których strona przenosi fokus na kartę (pytanie 16; loop2#045-1).
5. Po „Zatrzymaj” przy postaci w pętli fokus klawiatury zostaje w wierszu tej postaci, nie wypada na stronę (loop2#047-6).
6. Gdy panel reguły otwarty przez „Dodaj regułę z tym” stoi pod nagłówkiem zwiniętej grupy, „✕” oddaje fokus nagłówkowi tej grupy (D-350; loop2#058-6).
7. Każda nowa kopia — po wysłaniu postaci i po przełączeniu postaci na inny program — ma wszystkie grupy rozwinięte; zwinięcia poprzedniej kopii na nią nie przechodzą (loop2#056-4).
8. W komórce wyboru panelu reguły ikona stoi przy pierwszej linii nazwy także wtedy, gdy długa nazwa („Wytwórz — ognisko”) łamie się w dwie linie (loop2#056-5).
9. Wyszarzona komórka wyboru nie podświetla się pod kursorem, a styleguide widoku nazywa kolor jej przerywanej ramki: `text-disabled` (loop2#056-6).
10. Marsz maga, który gracz przerwał wyjściem z ekranu przejścia w pierwszych 640 ms, nie powtarza się po powrocie; mag stoi tam, gdzie każe D-319 (loop2#059-10).
11. Tabela odkrytych kafelków pod „Teren” mieści się w swoim obszarze przy oknie 1280 × 720 cała, bez przewijania w poziomie; cykl ogląda ją w przeglądarce i, jeśli nie mieści się, zwęża odstępy i kolumny. Gdy zwężenie nie wystarcza bez szkody dla czytelności (np. ucinania nazw), tabela zostaje przewijana z widocznym paskiem, a cykl opisuje to w prośbie o scalenie (pytanie 18; D-396; loop2#66-5).
12. Cykl odtwarza w jednej rozegranej grze „Eksploracja +1” w trakcie przejścia wobec „0/15” w drzewie po „Zakończ” i poprawia tylko wtedy, gdy wprawa ginie wbrew regułom gry; gdy obie liczby są zgodne z regułami, opisuje je w prośbie o scalenie (loop2#055-11).
13. Porządek w kodzie widoku: komórki wyboru panelu reguły dostają `tabIndex` z właściwości, nie z efektu (`guidelines/coding-browser-module.md`, sekcja „Efekty”; loop2#056-7); z modułu edytora programu znikają typy celów fokusu i komentarze starego edytora DOM (loop2#056-12); ze spisu podziękowań znikają sprawdzenia `icon === undefined` i `iconTitle === undefined`, których dane nie dopuszczają (loop2#056-15); test „a loaded map run comes back paused, …” w `tests/view/scene-picture.test.mjs`, dziś kopia testu pauzy tuż przed nim, naprawdę wczytuje zapis (`loadSavedGame`) i sprawdza, że scena stoi jak w pauzie (pytanie 19; loop2#059-9).
14. D-297 mówi to, co robi kod: „↑” jest wyłączona tylko wtedy, gdy przed grupą reguły nie stoi żadna grupa, a „↓” tylko wtedy, gdy za nią nie stoi żadna; pusta grupa na brzegu przyjmuje regułę ze strzałki (pytanie 1).
15. Panel reguły otwarty na regule, którą gracz przenosi do innej grupy — strzałką „↑”/„↓” albo uchwytem — zostaje otwarty i idzie za regułą do nowej grupy, tak jak dziś idzie za nią w obrębie grupy; usunięcie reguły zamyka jej panel. D-306 dopisuje, że usunięcie reguły zamyka panel, a *Rejected* D-350 mówi, że gracz straciłby otwarte pole i miejsce w nim, nie pisaną regułę (pytanie 4; loop2#67-7, loop2#67-12).
16. D-04 wymienia wśród tego, z czego widok rysuje grę, trzy źródła, których dziś nie zna: dla kroniki akty gracza na kopii wraz z kopią przed aktem i po nim (D-348), dla okna końca przejścia pamięć strony o tym, czy jest otwarte (D-371), dla sceny położenie, które przeglądarka podaje dla maga w marszu; kod się nie zmienia (pytanie 5; loop2#059-3, loop2#66-8).
17. Ukryta strona, zamknięcie karty włącznie, i rytm 30 s wysyłają stan gry także wtedy, gdy ostatni wysłany zapis się nie udał, więc zmiana, której zapis zawiódł, ma przy zamknięciu karty jeszcze jedną szansę; rytm 30 s nie dubluje zaplanowanego ponowienia po 5, 10, 20 i co 30 s — po porażce czeka jedno żądanie naraz: wysyłka w chwili zapisu z D-207 idzie od razu i zastępuje zaplanowane ponowienie, jak mówi D-208 („…and at once at a moment of saving of D-207”). D-207 dostaje w zdaniu o rytmie i ukrytej stronie dopisek „or where the save last sent failed” (pytanie 6; loop2#043-1).
18. Kliknięcie poza otwartym menu „Konto” zamyka je i zostawia fokus tam, gdzie gracz kliknął, więc pierwsze kliknięcie w pole tekstowe stawia w nim kursor; gdy kliknięte miejsce fokusu nie przyjmuje (puste tło), fokus wraca na „Konto” i nie zostaje na zamkniętym, ukrytym elemencie menu; Escape i drugie kliknięcie w „Konto” dalej oddają fokus „Konto”. D-285 odnosi powrót fokusu na „Konto” do Escape, drugiego kliknięcia i kliknięcia w miejsce bez fokusu (pytanie 7; loop2#055-4).
19. Przy kopii bez niezapisanych zmian, której program ma zmiany nieobecne w kopii, linia pod przyciskami zapisu czyta „Program {name} ma zmiany, których nie ma w tej kopii.”; pełne zdanie „Program {name} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.” stoi tylko wtedy, gdy kopia ma niezapisane zmiany i „Zapisz w programie” działa. D-172 dostaje to drugie brzmienie (pytanie 8; loop2#039-1).
20. Gdy w trakcie marszu maga jego nowa czynność każe mu stać w miejscu („Zjedz — jagoda”, „Zapal — patyk”, walka, „Zbierz” i „Obchód” z włóknem), mag staje tam, dokąd doszedł, a nie dobiega do celu poprzedniego marszu (D-318; pytanie 9; loop2#059-11).
21. Wpis kroniki o zmienionej regule stawia stare i nowe zdanie reguły w cudzysłowach połączonych słowem „na”: „Zmieniono regułę 2.1: „Zawsze → Eksploruj” na „Zawsze → Wędruj””; D-342 dostaje ten wzór (pytanie 10; loop2#66-2).
22. Komentarz nad regułą z `filter: grayscale(1) brightness(0.55)` w `src/browser/styles.css` („A dead mage and an extinguished fire share one grey…”) podaje źródło wartości: przyjęcie przez Mariusza 2026-11-16; wartość, D-316 i D-322 się nie zmieniają (pytanie 11; loop2#059-14).
23. W `guidelines/styleguide-browser-view.md`, w bloku „Otwarte dla człowieka” pod oknem końca przejścia, pozycja „kawałki paska czasu odróżnia tylko ich kolejność, odstęp i długość, bo plik tokenów nie ma serii wypełnień…” wychodzi z bloku i staje jako ustalenie: kawałki paska czasu mają jeden kolor, a odróżnia je kolejność, szczelina, długość i legenda pod paskiem w tej samej kolejności; dwie pozostałe pozycje bloku zostają otwarte (pytanie 15; loop2#79-3).
24. W `guidelines/styleguide-browser-view.md` zdanie o menu „Konto” („…a zamyka klawiszem Escape, kliknięciem obok i drugim kliknięciem „Konto”, fokus wraca wtedy na „Konto”…”) mówi to samo co zmieniona D-285 (punkt 18).
25. Komentarze arkuszy stylów po podziale na pliki ekranów (loop2#145): komentarz na górze wspólnego `src/browser/styles.css` nie mówi już o „the rules of each other screen” tak, jakby ekrany objęte wyjątkiem z D-421 nie miały własnych arkuszy; siedem komentarzy w arkuszach ekranów, które mówią, że reguła stoi „above”, wskazuje plik, w którym ta reguła stoi teraz. Tylko komentarze, bez zmiany reguł. Uwaga: po loop2#145 reguły z punktów 2, 8, 9 i 22 mogą stać w arkuszu ekranu, a nie w `styles.css` — szukaj po treści reguły. Źródło: opis PR-a https://github.com/mariusznazar/loop2/pull/145 (pozycja 1 „Fix or let through” po poprawce), doradca dnia 16.11.

### Questions to settle

- Strzałka „↑” na pierwszej regule programu, gdy przed jej grupą stoi pusta grupa (i „↓” na ostatniej przy pustej grupie za nią): zmienić D-297 pod kod czy kod pod D-297?
  - Answer: zmienić D-297 pod kod — gracz z klawiaturą zachowuje jedyną drogę do pustej grupy na brzegu, kod i test już tak działają, zmienia się jedno zdanie decyzji.
  - Not chosen:
    - kod pod D-297 („↑” wyłączona na pierwszej regule programu także przy pustej grupie przed nią) — zmiana kodu i dwóch testów, a gracz z klawiaturą traci jedyną drogę do pustej grupy na brzegu, bo przeciąganie działa tylko myszą.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „3 a — D-297 pod kod: gracz z klawiaturą zachowuje jedyną drogę do pustej grupy na brzegu, kod i test już tak działają, zmienia się jedno zdanie decyzji.”
- Które z potwierdzonych drobnych błędów zadanie poprawia bez zmiany decyzji?
  - Answer: wszystkie z tabeli A — punkty 1–11 i 13 *To do*.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a — tabela A w całości: każda pozycja to kilka linii bez zmiany decyzji, a 66-5 sprawdzane okiem w przeglądarce przy 1280 px.”
- Które uwagi zostają bez zmiany?
  - Answer: loop2#65-3 (D-336 przyjmuje, że „Teraz” i „Potem” nic nie robią przy pokazanym zapisanym programie), loop2#79-2 (D-370 przyjmuje, że Escape po kliknięciu obok okna końca nic nie zamyka), loop2#025-6 (okno końca przejmuje fokus zaraz po efekcie śmierci), loop2#043-22 (wymaga stanu gry ponad 64 KiB i nieudanego wylogowania naraz), loop2#78-3 (cena w czterech kolumnach jest czytelna, poprawka to przeprojektowanie siatki); loop2#055-11 idzie do *To do* jako punkt 12 z warunkiem.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „2 a — tabela B w całości: 65-3 i 79-2 to koszty, które decyzje D-336 i D-370 przyjmują wprost; 055-11 — tak jak proponujesz: cykl odtwarza to w jednej rozegranej grze i poprawia tylko wtedy, gdy wprawa ginie wbrew regułom (wpisz to jako punkt To do z warunkiem, nie jako pozycję do zostawienia).”
- Panel reguły zamyka się, gdy gracz przenosi otwartą regułę do innej grupy, a D-306 tego zamknięcia nie wymienia: panel idzie za regułą czy zamknięcie zostaje i trafia do D-306?
  - Answer: panel idzie za regułą do nowej grupy (strzałki i uchwyt); D-306 dopisuje, że usunięcie reguły zamyka panel; *Rejected* D-350 poprawione na „the player would lose the open field and the place in it”.
  - Not chosen:
    - zamknięcie zostaje, D-306 wymienia przeniesienie do innej grupy i usunięcie — dwa zdania w fundamencie bez zmiany kodu, a gracz dalej traci otwarte pole przy każdym przeniesieniu przez granicę grupy; „b utrwalałoby w decyzji zachowanie, którego nikt nie wybrał”.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a — panel idzie za regułą do nowej grupy (strzałki i uchwyt); D-306 dopisuje, że usunięcie reguły zamyka panel; Rejected D-350 poprawione na „the player would lose the open field and the place in it”. Powód: w obrębie grupy panel już idzie za regułą, więc zamknięcie na granicy grupy to niespójność, którą gracz odczuwa jako utratę pola; poprawka mała, a b utrwalałoby w decyzji zachowanie, którego nikt nie wybrał.”
- D-04 nie zna trzech źródeł, z których widok dziś rysuje (odczyt położenia maga z przeglądarki, akty gracza na kopii dla kroniki, pamięć strony o oknie końca): wstawka w D-04 czy powiązania „narrows D-04” i scena licząca położenie maga sama?
  - Answer: jedna wstawka w D-04 z trzema źródłami — akty gracza na kopii z kopią przed i po (D-348), pamięć strony o oknie końca (D-371), położenie maga w marszu podawane przez przeglądarkę.
  - Not chosen:
    - D-348 i D-371 z relacją „narrows D-04”, a scena liczy położenie maga z chwili startu marszu i zegara — zmiana kodu sceny i testów oraz ryzyko, że policzone położenie rozjedzie się z narysowanym i mag skręci z miejsca, w którym go nie widać.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a — jedna wstawka w D-04 z trzema źródłami (akty gracza na kopii z kopią przed i po — D-348; pamięć strony o oknie końca — D-371; położenie maga w marszu podawane przez przeglądarkę). Powód: wszystkie trzy działają i stoją na własnych decyzjach, brakuje tylko nazwy w liście; b płaci zmianą kodu sceny za zgodność z listą i wnosi ryzyko, że mag skręci z miejsca, w którym go nie widać.”
- Po nieudanym zapisie ukryta strona nic nie wysyła, bo stan nieudanego zapisu liczy się jako „ostatnio wysłany”, więc zamknięcie karty przed udanym ponowieniem gubi zmianę: wysyłać także po nieudanym zapisie czy zapisać w D-207 przyjęty koszt?
  - Answer: ukryta strona i rytm 30 s wysyłają stan także wtedy, gdy ostatni zapis się nie udał; brzmienie D-207 nie rusza reszty zdania; rytm 30 s nie dubluje zaplanowanego ponowienia — po porażce w kolejce stoi jedno żądanie naraz.
  - Not chosen:
    - zostawić, a D-207 dopisuje przyjęty koszt utraty zmiany po zamknięciu karty przed udanym ponowieniem — jedno zdanie bez zmiany kodu, a gracz przy chwilowej awarii serwera traci ostatnią zmianę.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a — ukryta strona i rytm 30 s wysyłają stan także wtedy, gdy ostatni zapis się nie udał; D-207 dostaje „changed since the save that last succeeded” (albo dopisek o nieudanym zapisie — wybierz brzmienie, które nie rusza reszty zdania). Powód: chodzi o utratę postępu gracza, a ostatnia wysyłka przy zamknięciu istnieje właśnie na ten przypadek; koszt kilka linii. Dopisz w To do warunek dla cyklu: rytm 30 s nie może dublować zaplanowanego ponowienia (5/10/20/30 s) — po porażce w kolejce stoi jedno żądanie naraz.”
- Kliknięcie obok otwartego menu „Konto” oddaje fokus „Konto”, więc pierwsze kliknięcie w pole tekstowe przepada: fokus zostaje tam, gdzie gracz kliknął, czy D-285 dopisuje przyjęty koszt?
  - Answer: kliknięcie obok zamyka menu i zostawia fokus tam, gdzie gracz kliknął; Escape i drugie kliknięcie w „Konto” dalej oddają fokus „Konto”; kliknięcie w miejsce, które fokusu nie przyjmuje, oddaje fokus „Konto”, nie zostawia go na zamkniętym, ukrytym elemencie menu.
  - Not chosen:
    - zostawić, a D-285 dopisuje, że pierwsze kliknięcie w pole przy otwartym menu tylko zamyka menu — jedno zdanie bez zmiany kodu, a gracz traci pierwsze kliknięcie za każdym razem.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a — kliknięcie obok zamyka menu i zostawia fokus tam, gdzie gracz kliknął; Escape i drugie kliknięcie w „Konto” dalej oddają fokus „Konto”. Powód: przy myszy gracz sam wskazał miejsce, a zabrane pierwsze kliknięcie to odczuwalna usterka; powrót fokusu zostaje tam, gdzie ma sens — przy klawiaturze. Uwaga dla To do: kliknięcie obok w miejsce, które fokusu nie przyjmuje (puste tło), nie może zostawić fokusu na zamkniętym, ukrytym elemencie menu — wtedy fokus wraca na „Konto”.”
- Zdanie D-172 „…— zapis w programie je zastąpi.” stoi także przy wyszarzonym „Zapisz w programie”, gdy gracz zmienił tylko program, a nie kopię: zdanie tylko przy niezapisanych zmianach kopii, sama pierwsza połowa bez nich, czy przyjęty koszt?
  - Answer: bez niezapisanych zmian kopii stoi „Program {name} ma zmiany, których nie ma w tej kopii.”, pełne zdanie tylko przy niezapisanych zmianach kopii; D-172 dostaje drugie brzmienie.
  - Not chosen:
    - zdanie tylko przy niezapisanych zmianach kopii — jeden warunek bez nowego tekstu, a gracz, który zmienił tylko program, nie dowiaduje się, że kopia go nie zna.
    - zostawić, a D-172 dopisuje przyjęty koszt — jedno zdanie, a gracz czyta zapowiedź zapisu przy wyłączonym przycisku.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 b — bez niezapisanych zmian kopii stoi „Program {name} ma zmiany, których nie ma w tej kopii.”, pełne zdanie z „zapis w programie je zastąpi” tylko przy niezapisanych zmianach kopii; D-172 dostaje drugie brzmienie. Powód: informacja prawdziwa zostaje, znika tylko obietnica zapisu przy wyszarzonym przycisku; nowy tekst to ucięte, już przyjęte zdanie, więc nie wymaga osobnej akceptacji brzmienia.”
- Mag w marszu, którego nowa czynność każe stać, dobiega do celu starego marszu, a D-318 mówi „the mage stays where it stands”: kod pod D-318 czy D-318 pod kod?
  - Answer: kod pod D-318 — gdy nowa czynność każe stać, mag staje tam, dokąd doszedł; decyzja bez zmian.
  - Not chosen:
    - D-318 dopisuje, że marsz w toku kończy się u swojego celu — jedno zdanie bez zmiany kodu, a gracz przy szybkim tempie widzi do 640 ms biegu przy napisie o jedzeniu albo walce.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a — kod pod D-318: gdy nowa czynność każe stać, mag staje tam, dokąd doszedł (placeOf bierze miejsce osiągnięte). Powód: decyzja już mówi, co ma być, D-319 robi to samo przy zmianie celu, a odczyt miejsca istnieje; decyzja bez zmian.”
- Wpis kroniki „Zmieniono regułę 2.1: Zawsze → Eksploruj → Zawsze → Wędruj” czyta się jak jeden łańcuch, bo strzałka zdania reguły i strzałka zmiany to ten sam znak: jakie brzmienie?
  - Answer: „Zmieniono regułę 2.1: „Zawsze → Eksploruj” na „Zawsze → Wędruj””, wzór do D-342.
  - Not chosen:
    - „Zmieniono regułę 2.1 — było: Zawsze → Eksploruj · jest: Zawsze → Wędruj” — ten sam koszt, wpis dłuższy.
    - zostawić — nic nie kosztuje, a każdy wpis o zmienionej regule czyta się jak jeden łańcuch.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a — „Zmieniono regułę 2.1: „Zawsze → Eksploruj” na „Zawsze → Wędruj””, wzór do D-342. Powód: krótsze od b, „na” i cudzysłowy już są w kronice i przy nazwach grup, a wpis przestaje czytać się jak jeden łańcuch.”
- Szarość martwego maga i zgasłego ogniska `grayscale(1) brightness(0.55)` stoi w D-316 i D-322, choć nikt jej nie wybrał (pytanie 2 z PR #59; loop2#059-14): przyjąć czy wybrać inną wartość z podglądu?
  - Answer: przyjęta, tak jak na zrzucie z gry; D-316 i D-322 bez zmian, a komentarz przy wartości w arkuszu stylów podaje jej źródło: przyjęcie przez Mariusza 2026-11-16.
  - Not chosen:
    - inna szarość z podglądu kilku wartości — runda podglądu przed cyklem i zmiana dwóch decyzji.
  - Source: Mariusz przez doradcę dnia, 2026-11-16, o zrzutach pięciu spraw wyglądu: „apropo tych 5 spraw wyglądu - na screenach wszystko jest ok”; odczyt doradcy: „1 a — szarość przyjęta (komentarz przy wartości w styles.css ze źródłem „przyjęte przez Mariusza 2026-11-16”)”.
- Krzak jagód w scenie nie ma jagód, bo paczka nie ma takiego obrazka (pytanie 6 z PR #59; loop2#059-8): zostawić czy dorysować jagody ręcznie?
  - Answer: zostaje, tak jak na zrzucie.
  - Not chosen:
    - dorysować ręcznie kilka jagód w kolorze z palety paczek i dopisać ręczną przeróbkę do D-316 — praca pikselowa w cyklu i jeszcze jeden wygląd do przyjęcia okiem.
  - Source: jak wyżej, „na screenach wszystko jest ok”; odczyt doradcy: „2 a — krzak zostaje”.
- Mniejszy płomień ogniska w jego ostatnich 20 minutach (D-373) wycięto ręcznie, a przyjęcie jego wyglądu przez Mariusza, kryterium zadania z PR #83, nigdzie nie stoi (loop2#83-1): przyjąć czy wzmocnić różnicę wobec pełnego płomienia?
  - Answer: przyjęty, tak jak na zrzutach z gry; `assets/sprites/fire-small.png` i D-373 bez zmian, przyjęcie zapisuje ta odpowiedź.
  - Not chosen:
    - mocniejsza różnica, np. same żarzące się węgle — ręczna przeróbka w cyklu i runda oglądania.
  - Source: jak wyżej, „na screenach wszystko jest ok”; odczyt doradcy: „3 a — mniejszy płomień przyjęty (zapis w dokumencie zadania)”.
- Szron grubości 1–2 pikseli sceny to sam obrys `#3c7289` i wygląda jak przerywana linia ciemnych morskozielonych kresek na brzegach sceny (D-372; loop2#83-3): szron od pierwszego ochłodzenia od razu w 4 pikselach, szron pojawiający się później w 4 pikselach, czy bez zmian?
  - Answer: bez zmian — dzisiejszy wygląd od 1 piksela przyjęty, tak jak na zrzutach; D-372 i grubość szronu w kodzie zostają.
  - Not chosen:
    - od pierwszego ochłodzenia od razu 4 piksele, dalej jak dziś — kilka linii, test i zmiana zdania D-372, szron pojawia się skokiem.
    - szron dopiero przy ok. 36,56 °C, od razu w 4 pikselach — ta sama zmiana, a gracz traci pierwsze ok. 0,4 °C ostrzeżenia.
  - Source: jak wyżej, „na screenach wszystko jest ok”; odczyt doradcy: „4 — szron bez zmian: ani a, ani b; dzisiejszy wygląd od 1 px przyjęty, D-372 i frostOf bez zmian, uwaga loop2#83-3 zamknięta jako przyjęta”.
- Kawałki paska „Na co poszedł czas” w oknie końca mają jeden kolor, a styleguide widoku trzyma to jako „Otwarte dla człowieka” (loop2#79-3): jeden kolor i zamknięcie sprawy w styleguide czy seria kolorów?
  - Answer: jeden kolor; pozycja „Otwarte dla człowieka” o kawałkach paska czasu staje się w styleguide ustaleniem: kawałki odróżnia kolejność, szczelina, długość i legenda pod paskiem w tej samej kolejności.
  - Not chosen:
    - seria kolorów — nowe tokeny, kropka koloru przy pozycjach legendy, sprawdzenie kontrastu i runda podglądu wartości przed cyklem.
  - Source: jak wyżej, „na screenach wszystko jest ok”; odczyt doradcy: „5 a — jeden kolor; pozycja „Otwarte dla człowieka” w styleguide zamienia się w ustalenie”.

- Punkt 4 *To do* (fokus na karcie logowania po odrzuconym odnośniku z maila i po „Anuluj”) przeczy D-381: „…the page moves focus to it only after a confirmed logout, after a logout the server answers with no session and after a password was set…”: zmienić D-381 czy wyrzucić punkt 4?
  - Answer: D-381 dopisuje oba przypadki — odrzucony odnośnik z maila i „Anuluj”.
  - Not chosen:
    - punkt 4 wypada z zadania — zero pracy, a gracz z klawiaturą dalej gubi fokus.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a — D-381 dopisuje oba przypadki (odrzucony odnośnik z maila, „Anuluj”) + wiersz ustaleń; to ta sama rodzina co przyjęty wiersz 14 o fokusie.”
- Zdanie reguły wilka na ekranie przejścia składa osobny kod (`src/browser/view/combat-line.ts`): czy liczba stoi tam z jednostką jak w zdaniu reguły gracza?
  - Answer: tak, jednostka także w zdaniu wilka.
  - Not chosen:
    - tylko wiersz reguły gracza i pole liczby panelu — zdanie wilka bez jednostki obok zdań gracza z jednostką.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „2 a — jednostka także w zdaniu wilka; „zawsze” z wiersza 16 ma być prawdziwe na każdym ekranie.”
- Tabela odkrytych kafelków już przewija się w poziomie, gdy jest szersza od obszaru, a uwaga loop2#66-5 zgłosiła ją jako uciętą: czy „mieści się” znaczy „cała bez przewijania”, czy przewijanie wystarcza?
  - Answer: cała tabela widoczna bez przewijania w poziomie przy 1280 × 720; gdy zwężenie odstępów i kolumn nie wystarcza bez szkody dla czytelności (np. ucinania nazw), zostaje przewijanie z widocznym paskiem, opisane w prośbie o scalenie.
  - Not chosen:
    - przewijanie w poziomie wystarcza — punkt 11 nic nie zmienia, o ile pasek jest widoczny.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „3 a — cała tabela widoczna bez przewijania w poziomie przy 1280 × 720; warunek dla cyklu: jeśli zwężenie odstępów i kolumn nie wystarcza bez łamania czytelności (np. ucinania nazw), cykl zostawia przewijanie z widocznym paskiem i opisuje to w prośbie o scalenie, zamiast ściskać na siłę.”
- Test „a loaded map run comes back paused, …” jest dokładną kopią testu pauzy tuż przed nim, więc sama zmiana nazwy zostawia duplikat: test naprawdę wczytuje zapis czy znika?
  - Answer: test naprawdę wczytuje zapis i sprawdza scenę w pauzie.
  - Not chosen:
    - test znika jako duplikat; wczytanie w pauzie przypina test symulacji `tests/sim/saved-game.test.mjs`.
    - zmiana nazwy — zostają dwa identyczne testy.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „4 a — test naprawdę wczytuje zapis i sprawdza scenę w pauzie.”

## Context

- Zadanie czekało na zadania MVP2, które przepisywały te ekrany (10, 14, 16–25); wszystkie są scalone, a lista uwag została sprawdzona na `main` z 2026-11-16 (`7ba7a116`).
- Źródło uwag: sekcja „Zadanie 3” pliku `a note in the author's private notes) Proces pracy nad produktem\przeglad_fundamentu_dane\uwagi_z_pr_2026-11-06.md` (30 uwag) i nota G-1 z propozycjami F-24 i F-25 w `a note in the author's private notes) Loop\_zadania\foundation_review_2026-11-13.md` (12 uwag).
- Uwagi, które kod już załatwił na `7ba7a116`: loop2#021-26 (stan postaci wyszedł z wiersza zegara do „Teraz”), loop2#024-5 (testy siedziby na imitacji dokumentu), loop2#056-10 (funkcji `createRuleList`, `createRulePanel`, `createTripPlan` już nie ma), loop2#056-9 (ścieżki panelu obok wierszy już nie ma), loop2#059-16 (D-43 nie ma już przykładu o procentach sceny).
- Uwagi loop2#67-1 i loop2#67-8 dotyczą okien węższych niż 1100 px; D-396: „a fault of the look in a window below the smallest, where no decision defines it, is not fixed”.
- Strzałka „↑” przy pustej grupie: `src/browser/view/program-editor.ts`, funkcja `moveRule` („const neighbour = program.groups[at + offset]”), przypięte testem „„↓” on the last rule of a group makes it the first of the next, „↑” on the first the last of the previous; an empty group takes it too” w `tests/view/program-editor.test.mjs`; przeciąganie reguł to HTML drag and drop w `src/browser/view/rule-list.tsx` (`draggable`), bez obsługi klawiatury.
- Mag dobiegający do starego celu: `src/browser/view/scene.tsx`, funkcja `placeOf` zwraca dla celu „zostań” miejsce `kept`, czyli cel trwającego marszu; miejsce, do którego mag doszedł, czyta już funkcja `reachedX` (D-319).

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- D-04, zmieniana przez to zadanie (pytanie 5): „The browser view draws the game only from the game state, the game's content data, the moment of the browser's clock, which it reads and passes to the simulation, and, for the scene and the chronicle, its previous reading of the game state and the events the simulation returned, and changes the game state only through functions of the simulation, …” Zmiana: lista dostaje dla kroniki akty gracza na kopii z kopią przed i po (D-348), dla okna końca pamięć strony o tym, czy jest otwarte (D-371), dla sceny położenie maga w marszu podawane przez przeglądarkę.
- D-348: „The browser view describes an act of the player on the copy from what the act was and, for an edit, from the copy before the act and the copy after it, together with the program rule or rule group the player moved where the program editor names it”.
- D-371: „Whether the end-of-run window (D-368) is open is a memory of the page, kept by the game view and never written into the game state or the save”.
- D-297, zmieniana przez to zadanie (pytanie 1): „„↓” on the last program rule of a rule group moves it to the start of the next group, and „↑” on the first program rule of a group to the end of the previous one; „↑” is disabled only on the program's first rule and „↓” only on its last.” Zmiana: „↑” wyłączona tylko wtedy, gdy przed grupą reguły nie stoi żadna grupa, „↓” tylko wtedy, gdy za nią nie stoi żadna.
- D-207, zmieniana przez to zadanie (pytanie 6): „The 30-second rhythm and the hidden page send the game state only where it changed since the save last sent, the save time of a document being no change of it; the browser has at most one save request in flight, …” Zmiana: „…only where it changed since the save last sent, or where the save last sent failed, …”.
- D-285, zmieniana przez to zadanie (pytanie 7): „The menu „Konto” opens on a click and from the keyboard, and closes on Escape, on a click outside it and on a second click on „Konto”, focus then returning to „Konto”.” Zmiana: po kliknięciu poza menu fokus zostaje tam, gdzie gracz kliknął, a wraca na „Konto” po Escape, po drugim kliknięciu w „Konto” i po kliknięciu w miejsce, które fokusu nie przyjmuje.
- D-172, zmieniana przez to zadanie (pytanie 8): „While the program the copy belongs to holds changes made since the copy was taken from it or last saved into it, a line in the role `warning` beside the save buttons reads „Program {name} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.”; „Zapisz w programie” then saves at once, in one click, and after the save the line is gone.” Zmiana: pełne zdanie stoi, gdy kopia ma niezapisane zmiany; bez nich linia czyta „Program {name} ma zmiany, których nie ma w tej kopii.”.
- D-342, zmieniana przez to zadanie (pytanie 10): „…„Zmieniono regułę 2.1: … → …”, …” Zmiana: wzór „Zmieniono regułę 2.1: „…” na „…””.
- D-41: „`link-highlight` means that this tile and this row of the list of revealed tiles are the same place”.
- D-294: „Which rule groups are folded lasts in the page's memory while the player moves between screens and goes with a reload of the page, after which every rule group stands unfolded; the saved game state does not hold it.”
- D-306, zmieniana przez to zadanie (pytanie 4): „After the last field the panel stays open, and „✕”, Escape or opening another rule closes it.” Zmiana: usunięcie reguły też zamyka jej panel; przeniesienie reguły do innej grupy go nie zamyka.
- D-350: „A rule panel open on a rule whose rule group is folded stands directly under the header of that group, where the row of the rule is not drawn.” Zmiana w *Rejected* (pytanie 4): „…so the player would lose the field and the rule being written” → „…so the player would lose the open field and the place in it”.
- D-318: „Where its action leads nowhere — „Zbierz” and „Obchód” with fibre as the target, „Zapal — patyk”, „Zjedz — jagoda” and a fight — the mage stays where it stands.”
- D-319: „The walk of the mage to its place lasts 640 ms and the frames of its sprite change every 160 ms, at every pace, as a movement of the character and no effect of an ordinary event.”
- D-396: „The smallest window the game supports has a page area of 1280 × 720 px … a fault of the look in a window below the smallest, where no decision defines it, is not fixed.”
- D-336: „While the program panel shows a saved program in place of the copy … the click scrolls nothing and the saved program stays shown.”
- D-370: „The window takes the focus when it opens, Escape is read in the window and not on the document, and nothing traps the focus”.
- D-316 i D-322, bez zmian (pytanie 11): D-316 „…extinguished, the same picture in `grayscale(1) brightness(0.55)` and without motion”; D-322 „…and lies grey with `grayscale(1) brightness(0.55)`”. Punkt 22 *To do* dopisuje źródło tej wartości w komentarzu arkusza stylów.
- D-381, zmieniana przez to zadanie (pytanie 16): „…the page moves focus to it only after a confirmed logout, after a logout the server answers with no session and after a password was set…” Zmiana: lista dostaje też odrzucony odnośnik z maila i „Anuluj”.
- D-208: „once the save before a logout has failed, the sentence D-97 gives for that failure … until a save succeeds and the sentence goes.”

## Settlements to record

Candidates: 20 shown, 17 accepted — 2026-11-16

| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | „↑” jest wyłączona tylko wtedy, gdy przed grupą reguły nie stoi żadna grupa, a „↓” tylko wtedy, gdy za nią nie stoi żadna; pusta grupa na brzegu przyjmuje regułę ze strzałki. | sentence of D-297 | pytanie 1 | czy „naprawić” kod pod dzisiejsze zdanie D-297 i wyłączyć „↑” na pierwszej regule programu |
| 2 | Panel reguły idzie za regułą przeniesioną do innej grupy, strzałką i uchwytem; usunięcie reguły zamyka jej panel. | sentence of D-306 | pytanie 4 | czy zamknięcie panelu przy przeniesieniu przez granicę grupy zostaje i trafia do D-306 |
| 3 | Odrzucony wariant D-350 mówi, że gracz straciłby otwarte pole i miejsce w nim, nie pisaną regułę. | sentence of D-350 | pytanie 4 | brzmienie *Rejected* D-350 przy zmianie D-306 |
| 4 | Widok rysuje grę także z aktów gracza na kopii z kopią przed i po (kronika), z pamięci strony o oknie końca i z położenia maga w marszu podawanego przez przeglądarkę. | sentence of D-04 | pytanie 5 | czy przepisać scenę, żeby liczyła położenie maga sama, albo powiązać D-348 i D-371 relacją „narrows D-04” |
| 5 | Rytm 30 s i ukryta strona wysyłają stan także wtedy, gdy ostatni wysłany zapis się nie udał. | sentence of D-207 | pytanie 6 | czy wysyłać po nieudanym zapisie, czy zapisać w D-207 przyjęty koszt utraty zmiany |
| 6 | Kliknięcie poza menu „Konto” zostawia fokus tam, gdzie gracz kliknął; na „Konto” fokus wraca po Escape, po drugim kliknięciu w „Konto” i po kliknięciu w miejsce bez fokusu. | sentence of D-285 | pytanie 7 | dokąd idzie fokus po kliknięciu poza menu |
| 7 | To samo zdanie o menu „Konto” stoi w styleguide widoku (punkt 24 *To do*). | guidelines: styleguide | pytanie 7 | zostawić w styleguide zdanie sprzeczne ze zmienioną D-285 |
| 8 | Bez niezapisanych zmian kopii linia czyta „Program {name} ma zmiany, których nie ma w tej kopii.”; pełne zdanie z „zapis w programie je zastąpi” tylko przy niezapisanych zmianach kopii. | sentence of D-172 | pytanie 8 | które brzmienie stoi przy wyszarzonym „Zapisz w programie” |
| 9 | Wpis kroniki o zmienionej regule: „Zmieniono regułę 2.1: „Zawsze → Eksploruj” na „Zawsze → Wędruj””. | sentence of D-342 | pytanie 10 | jaki znak rozdziela stare i nowe zdanie reguły |
| 10 | Szarość martwego maga i zgasłego ogniska `grayscale(1) brightness(0.55)` ma źródło: przyjęcie przez Mariusza 2026-11-16. | data or code: komentarz w `src/browser/styles.css` | pytanie 11 | wartość bez źródła, którą kolejny przegląd zgłosi albo cykl zmieni |
| 11 | Kawałki paska czasu w oknie końca mają jeden kolor; odróżnia je kolejność, szczelina, długość i legenda w tej samej kolejności. | guidelines: styleguide | pytanie 15 | czy wprowadzić serię kolorów paska |
| 12 | Wyszarzona komórka wyboru panelu reguły nie podświetla się pod kursorem, a jej przerywana ramka stoi w `text-disabled`. | guidelines: styleguide | punkt 9 *To do*, przyjęty w pytaniu 2 („tabela A w całości”); przyjęte przez doradcę dnia w imieniu Mariusza, 2026-11-16: „wiersze 12–16 przyjęte wszystkie” | kolor ramki wyszarzonej komórki i czy ma stan pod kursorem |
| 13 | Długie imię albo nazwa wpisana przez gracza bez spacji łamie się w swoim wierszu i nie wychodzi poza niego. | guidelines: styleguide | punkt 2 *To do*; przyjęte przez doradcę dnia w imieniu Mariusza, 2026-11-16: „wiersze 12–16 przyjęte wszystkie” | czy następny ekran z nazwą gracza też ją zawija, czy ucina albo przewija |
| 14 | Gdy element z fokusem znika (zamknięta karta, przerwany wiersz), fokus idzie na element, który stoi w jego miejscu albo najbliżej, nigdy na stronę. | guidelines: styleguide | punkty 4, 5 i 6 *To do*; przyjęte przez doradcę dnia w imieniu Mariusza, 2026-11-16: „wiersze 12–16 przyjęte wszystkie” | dokąd oddać fokus w następnej kontrolce, która znika po kliknięciu |
| 15 | Każda nowa kopia — po wysłaniu postaci i po przełączeniu postaci na inny program — ma wszystkie grupy rozwinięte. | sentence of D-294 | punkt 7 *To do*; przyjęte przez doradcę dnia w imieniu Mariusza, 2026-11-16: „wiersze 12–16 przyjęte wszystkie” | czy zwinięcia jednej kopii przechodzą na następną |
| 16 | Liczba warunku stoi zawsze z jednostką z danych warunku, na każdym ekranie: w zdaniu reguły gracza, w zdaniu reguły wilka i przy polu liczby panelu reguły. | data or code: jednostka w danych warunków (`src/browser/sim/data/conditions.ts`) i test, że ma ją każdy warunek z liczbą | punkt 3 *To do* i pytanie 17; przyjęte przez doradcę dnia w imieniu Mariusza, 2026-11-16: „wiersze 12–16 przyjęte wszystkie” | czy jednostka siedzi w danych warunku, czy w widoku, i czy nowy warunek musi ją mieć |
| 17 | Strona przenosi fokus na kartę logowania także po odrzuconym odnośniku z maila i po „Anuluj”. | sentence of D-381 | pytanie 16 | czy zostawić fokus na stronie, bo D-381 mówi „only”, albo zrobić poprawkę wbrew decyzji |

## Out of scope

- Uwagi loop2#65-3, loop2#79-2, loop2#025-6, loop2#043-22 i loop2#78-3 — zostają, jak mówi odpowiedź na pytanie 3.
- Uwagi loop2#059-8 (krzak bez jagód), loop2#83-1 (mniejszy płomień) i loop2#83-3 (cienki szron) — wygląd przyjęty bez zmian, jak mówią odpowiedzi na pytania 12–14.
