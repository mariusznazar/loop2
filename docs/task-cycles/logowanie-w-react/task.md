# Logowanie jako jedna karta, pierwszy ekran gry zbudowany w React

Status: ready for cycle
Project relation: plan item: plan_mvp2_loop2.md — logowanie-w-react

## Description

### Need

- Niezalogowany gość widzi dziś dwa formularze obok siebie i pod nimi wiersze wzmianek o autorach ikon, a nic na tym ekranie nie mówi, czym gra jest (`src/browser/view/account-screen.ts:223`, `src/browser/view/app.ts:401`, loop2 48544f0).
- Mariusz o tym, na czym mu zależy: „najbardziej zależy mi na edytorze, ludziku i stronie logowania, bo to obecnie jest w najgorszym stanie + podział na ekrany” (definicja, Inputs and constraints).
- Cel projektu to zamiana loop2 „w grę z osobnymi ekranami, czytelnym ekranem przejścia, nowym edytorem programu, sceną z ludzikiem, ładnym logowaniem i samouczkiem” (definicja, Goal).
- Decyzja o React (definicja, Technology; D-03 poniżej) potrzebuje pierwszego ekranu, na którym staną budowanie, testy i wzorzec dla następnych.
- Cel zadania w planie: „Niezalogowany gość widzi jedną kartę z nazwą gry, jednym zdaniem o grze, przełącznikiem „Zaloguj się” i „Załóż konto” oraz zwiniętymi wzmiankami, a wszystkie formularze tej karty działają jak dotąd i są pierwszym ekranem zbudowanym w React, lokalnie i na serwerze testowym.”

### To do

1. Niezalogowany gość widzi jedną kartę: nazwę gry, jedno zdanie o grze, przełącznik „Zaloguj się” i „Załóż konto”, formularz wybranego stanu i zwinięte wzmianki (D-96).
   - Zdanie brzmi: „Napisz postaci program i sprawdź, jak długo przeżyje bez ciebie.” (pytanie 5).
   - Zdanie stoi w danych gry w `src/browser/sim/data/`, a widok je stamtąd czyta (D-96, D-18).
2. Karta niesie cztery stany (D-96):
   - „Zaloguj się”: adres, hasło i przycisk „Nie pamiętam hasła”.
   - „Załóż konto”: adres, hasło i powtórzone hasło.
   - „Nie pamiętam hasła”: puste pole „Adres e-mail”, przyciski „Wyślij odnośnik” i „Wróć do logowania”, który wraca do „Zaloguj się”.
   - „Ustaw nowe hasło”: formularz strony otwartej odnośnikiem z wiadomości, także dla zalogowanego gracza, a strona nie buduje gry, póki ten formularz stoi (D-225).
3. Karta otwiera się na „Zaloguj się” (pytanie 1):
   - W „Zaloguj się” i „Załóż konto” stoi przełącznik, a formularz nie ma nagłówka.
   - „Nie pamiętam hasła” i „Ustaw nowe hasło” mają nagłówek i nie mają przełącznika, a wychodzi się z nich jak dziś: „Wróć do logowania” i „Anuluj”.
4. Przełącznik czyści pola i komunikaty formularzy i stawia fokus w polu adresu, jak dziś „Nie pamiętam hasła” (pytanie 2).
5. Każdy formularz działa jak dotąd: te same żądania do serwera, te same odmowy i zdania, sprawdzanie pól przed wysłaniem, blokada całej karty na czas czekania, napisy „Logowanie…”, „Zakładanie konta…”, „Wysyłanie…” i „Ustawianie…”, powrót fokusu na kontrolkę, od której gracz zaczął, pominięcie spóźnionej odpowiedzi i wejście do gry po sukcesie (D-44, D-96, D-222, D-225).
6. Zdania strony, które dziś stoją nad formularzami (potwierdzenie adresu, zmienione hasło, nieważny odnośnik, wygasła sesja, zaktualizowana gra), stoją w karcie, nad przełącznikiem (pytanie 3):
   - Gdzie przełącznika nie ma, zdanie stoi nad formularzem (D-156, D-225).
   - Zdanie zostaje przy przełączaniu stanów karty i odchodzi dopiero przy przejściu między kartą a grą.
7. Zwinięte wzmianki stoją w każdym stanie karty, jedno kliknięcie je otwiera, a ich treść jest ta sama co w stopce: tytuł ikony, autor, strona, licencja i sposób zmiany pliku (D-27, `icon-credits`).
   - Napis na zwiniętej sekcji: „Autorzy grafiki” (pytanie 6).
8. Karta stoi na środku okna (pytanie 11), a na jej ekranie nie ma nic poza nią, ani nagłówka, ani stopki (pytanie 4).
   - Ekrany oczekiwania zostają jak dziś, z nagłówkiem i stopką: „Sprawdzanie logowania…”, „Potwierdzanie adresu…”, ostrzeżenie ze „Spróbuj ponownie” i chwila po udanym logowaniu (`src/browser/view/app.ts:276`).
9. Kod karty i jej czterech stanów jest komponentami `.tsx` w React, a pozostałe ekrany gry zostają w DOM do swoich zadań (D-03).
10. `npm run build` składa kod przeglądarki razem z Reactem esbuildem w pliki podawane przez serwer, `npm run typecheck` sprawdza pliki `.tsx`, a obraz Dockera buduje się tak samo (D-06).
11. README mówi prawdę o budowaniu: zdanie „gra w przeglądarce zbudowana na DOM” (`README.md:3`) i opis kroku `npm run build` (`README.md:11`).
12. `npm run kitchen-sink` dalej buduje stronę wszystkich stanów, a strona dalej pokazuje stany formularzy, które wymieniają D-44 i D-45.
13. Niezmiennik `browser-view-framework` i jego test `tests/invariants/test_browser_view_framework.py` mówią to, co projektowane brzmienie: widok rysuje Reactem i interfejsami przeglądarki, bez innej biblioteki widoku, a test dalej oblewa, gdy taka biblioteka wejdzie do kodu albo zależności uruchomieniowych.
14. Strażnicy, którzy wybierają pliki po rozszerzeniu, czytają też `.tsx`, każdy z przypadkiem kontrolnym: `tests/invariants/test_browser_view_token_values.py:79` (uwaga planu, 2026-11-01), `tests/invariants/test_application_build_output.py:49`, `tests/invariants/test_application_package_layout.py:20`.
15. Przypadki testów ekranu konta dalej chronią to samo zachowanie po stracie ręcznego modelu dokumentu, a `guidelines/testing.md` opisuje stan po tej zmianie przez `maintain-testing-guidelines`: wiersz `browser-view` w tabeli części, przepis `unit test` i część *Not tested on purpose*.
16. `guidelines/coding-browser-module.md` opisuje budowanie w React przez `maintain-coding-guidelines`:
   - Reguła „TypeScript i DOM” i jej przykłady przestają przeczyć D-03.
   - Tabela *Files of this kind* wskazuje ekran karty jako wzorzec z decyzją D-36, a `src/browser/view/status-row.ts` przestaje nim być.
   - Pliki tej zmiany stoją w tabeli, której dziś brakuje m.in. `account-screen.ts` i `password-reset.ts`.
   - Nowe znaczenie, którego ten dokument nie ustala, cykl proponuje człowiekowi przy zablokowanym szkicu requestu (WAY-172).
17. Skill `loop2-deploy` przestaje mówić o dwóch formularzach i opisuje kartę, w obu kopiach, `.claude/skills/loop2-deploy/` i `.agents/skills/loop2-deploy/`:
   - `references/setup_and_secrets.md:328`: „Signed out, the page shows the two forms and no game or Program panel.”
   - `references/setup_and_secrets.md:343`: „Logout shows the forms again and no game.”
   - `SKILL.md:224`: „A blocked player who reloads the page sees the forms again”.
18. Zmiana budowania strony wszystkich stanów nie jest zmianą granicy serwera podglądu, więc test odmowy tego serwera nie wchodzi w tym zadaniu, a niezmiennik `preview-server-access` zostaje przy przeglądzie (pytanie 7).
   - Jeśli cykl zmieni `scripts/kitchen-sink.mjs`, nie rusza wierszy podawania plików (`scripts/kitchen-sink.mjs:34` i dalej).
   - To czytanie wchodzi do D-76 przez wiersz S5, także gdy `scripts/kitchen-sink.mjs` się nie zmieni.
   - Zdanie `guidelines/testing.md:174`–`:177` mówi po tym zapisie to samo co D-76, przez `maintain-testing-guidelines`.

### Acceptance criteria

- Lokalnie agent przechodzi kartę i wszystkie jej stany w prawdziwej przeglądarce, w grze uruchomionej poleceniem z zadania 1, a pod adresem `https://loop2.mariusznazar.com/` przechodzi je człowiek (H1).
- Lokalnie poczta nigdzie nie dochodzi (pytanie 8), więc potwierdzenie adresu i udane ustawienie hasła przechodzą do końca tylko na serwerze testowym, w H1.
- Lokalnie formularz „Ustaw nowe hasło” otwiera się adresem z `#reset-password=` (`src/browser/view/password-reset.ts:7`) i pokazuje odmowę odnośnika.

### Questions to settle

- Pytanie 1. Który stan karty stoi po jej otwarciu i co stoi nad polami w każdym z czterech stanów?
  - Answer: Karta otwiera się na „Zaloguj się”. Przełącznik stoi tylko w „Zaloguj się” i „Załóż konto” i tam formularz nie ma nagłówka. „Nie pamiętam hasła” i „Ustaw nowe hasło” mają nagłówek, nie mają przełącznika, a wychodzi się z nich jak dziś: „Wróć do logowania” i „Anuluj”.
  - Not chosen:
    - przełącznik we wszystkich czterech stanach — w „Ustaw nowe hasło” kliknięcie przełącznika musiałoby zrobić to, co „Anuluj”, czyli usunąć odnośnik z adresu, a tego D-225 nie przewiduje, więc trzeba zmienić tę decyzję
    - nagłówek także przy przełączniku — trzy razy to samo słowo na małej karcie
  - Source: human, 2026-11-01, odpowiedź na cały pakiet rundy: „zgadzam się na komplet rekomendacji”, pozycja 7 pakietu. Pytanie nazwało koszt tej drogi: „w tych dwóch stanach jest tylko jedno wyjście”.
- Pytanie 2. Co dzieje się z wpisanym adresem, hasłem i komunikatami, gdy gość przełączy „Zaloguj się” i „Załóż konto”?
  - Answer: Przełącznik czyści pola i komunikaty formularzy i stawia fokus w polu adresu, jak dziś „Nie pamiętam hasła”.
  - Not chosen:
    - adres przechodzi na drugi stan, a hasła i komunikaty znikają — osobna reguła i jej przypadki testów
    - każdy stan trzyma swoje pola — hasło leży w niewidocznym polu, a powrót pokazuje stare komunikaty
  - Source: human, 2026-11-01, „zgadzam się na komplet rekomendacji”, pozycja 8 pakietu. Pytanie nazwało koszt tej drogi: gość, który wpisał adres pod „Zaloguj się” i dopiero wtedy się przełączył, wpisuje go drugi raz. Fakt z kodu (tak jest dziś, to nie wymaganie): „Each button empties every field and removes every message, swaps the sections and moves focus to the address field of the form it opened.” (`src/browser/view/account-screen.ts:363`–`:364`, loop2 48544f0).
- Pytanie 3. Gdzie stoi jedno zdanie strony, które decyzje każą stawiać nad formularzami konta?
  - Answer: Zdanie strony stoi w karcie, nad przełącznikiem, a gdzie przełącznika nie ma, nad formularzem. Zostaje przy przełączaniu stanów karty i odchodzi dopiero przy przejściu między kartą a grą, jak dziś. Odpowiedź dotyczy też zadania 3.
  - Not chosen:
    - zdanie nad kartą — po zadaniu 3 potrzebny drugi panel na obrazie, bo „text stands on a solid background, never on a picture” (definicja, „Where may a picture of the game stand?”)
    - zdanie znika przy przełączeniu — jedno kliknięcie kasuje „Gra została zaktualizowana. Odśwież stronę.”
  - Source: human, 2026-11-01, „zgadzam się na komplet rekomendacji”, pozycja 9 pierwszego pakietu; brzmienie dla stanów bez przełącznika i pytanie P2 przeciw temu wyborowi: human, 2026-11-01, „wszystko według rekomendacji”, drugi pakiet. Pytania nazwały koszty tej drogi: „karta na chwilę rośnie o jeden wiersz” oraz gość po zmianie hasła, który przełączy kartę na „Załóż konto”, czyta „Zaloguj się nowym hasłem.” nad zakładaniem konta. Fakt z kodu (tak jest dziś, to nie wymaganie): „leaves at the next change between forms and game” (`src/browser/view/app.ts:88`–`:89`, loop2 48544f0).
- Pytanie 4. Co widać poza kartą na jej ekranie i co widać, zanim karta się pojawi?
  - Answer: Na ekranie karty nie ma nic poza kartą, ani nagłówka, ani stopki. Ekrany oczekiwania zostają jak dziś, z nagłówkiem i stopką, także po zalogowaniu.
  - Not chosen:
    - oczekiwanie w karcie — zalogowany gracz przy każdym odświeżeniu widzi kartę logowania, jakby go wylogowało
    - nagłówek i stopka także przy karcie — wyklucza to cytat niżej
  - Source: dla ekranu karty cytat, którego człowiek nie skreślił: „A signed-out visitor sees one card on a picture of the game” (D-96, `definicja_mvp2_loop2.md:600`) oraz „A section of credits, folded and opened with one click, stands on Siedziba and on the login card” i *Rejected*: „the credits open in a footer of every screen — dozens of rows standing below the game” (D-27, `:465`, `:474`), odcisk 8de9ffff. Dla oczekiwania: human, 2026-11-01, „zgadzam się na komplet rekomendacji”, pozycja 10 pakietu; pytanie nazwało koszt tej drogi: przy każdym wejściu niezalogowany gość przez chwilę widzi nagłówek i stopkę, zanim wskoczy karta. Fakt z kodu (tak jest dziś, to nie wymaganie): `root.append(header, main, createFooter());` (`src/browser/view/app.ts:401`) i ekran oczekiwania po logowaniu (`:276`), loop2 48544f0.
- Pytanie 5. Jak brzmi jedno zdanie o grze?
  - Answer: „Napisz postaci program i sprawdź, jak długo przeżyje bez ciebie.”
  - Not chosen:
    - „Napisz postaci program. Niech przeżyje bez ciebie.” — dwa zdania wbrew „one sentence” w D-96
  - Source: human, 2026-11-01, „zgadzam się na komplet rekomendacji”, pozycja 11 pakietu.
- Pytanie 6. Jaki napis stoi na zwiniętych wzmiankach?
  - Answer: „Autorzy grafiki”.
  - Not chosen:
    - „Wzmianki o autorach” — brzmi urzędowo na karcie, która ma nie wyglądać jak formularz
  - Source: human, 2026-11-01, „zgadzam się na komplet rekomendacji”, pozycja 11 pakietu.
- Pytanie 7. Czy zmiana sposobu budowania w `scripts/kitchen-sink.mjs` jest pierwszą zmianą granicy serwera podglądu, która według D-76 wymaga testu odmowy w tym zadaniu?
  - Answer: Nie. Odstępstwa z D-76 i dla `assets/sprites/**` kończy tylko zmiana zasady granicy: inny rodzaj pliku, inna droga wejścia, inny odbiorca. Zmiana budowania strony wszystkich stanów nie jest zmianą granicy serwera podglądu. Pierwsze zadanie, które na tym czytaniu się oprze, zapisuje je przy odstępstwie.
  - Not chosen:
    - każda zmiana plików granicy się liczy — test przy zadaniu 6 i ewentualnie przy zadaniu 2, zmiana odpowiedzi człowieka „pliki testów żadne”, zmiana planu
    - nowe pliki się liczą, a zmiana budowania nie — test przy zadaniu 6, te same zmiany
  - Source: human, 2026-11-01, „zgadzam się na komplet rekomendacji”, pozycja 13 pakietu. Pytanie nazwało koszt tej drogi: serwer dalej bez stałego testu, czyli jak dziś. Fakt z kodu (tak jest dziś, to nie wymaganie): strona wszystkich stanów bierze z `account-screen.js` jedną stałą (`src/browser/kitchen-sink/kitchen-sink.ts:22`, loop2 48544f0).
- Pytanie 8. Co dzieje się z pocztą konta przy lokalnym starcie i co z tego wynika dla sprawdzenia karty?
  - Answer: Poczta przy lokalnym starcie wskazuje adres, pod którym nic nie odpowiada, więc potwierdzenie adresu i udane ustawienie hasła przechodzi do końca tylko człowiek na serwerze testowym. Cel zadania „lokalnie i na serwerze testowym” dostaje to jawne ograniczenie w Acceptance criteria.
  - Not chosen:
    - mały odbiornik poczty na komputerze, z odnośnikami wypisywanymi przez polecenie — zadanie 1 rośnie i może wymagać zmiany w serwerze
  - Source: human, 2026-11-01, „zgadzam się na komplet rekomendacji”, pozycja 1 pakietu; pytanie wspólne z zadaniem 1, gdzie stoi jako jego pytanie o pocztę; plan_mvp2_loop2.md, Change log, 2026-11-01: „odpowiedź ogranicza cel zadania 2”.
- Pytanie 9. Kiedy człowiek przechodzi kartę na serwerze testowym?
  - Answer: W cyklu, przed scaleniem, i obejmuje to całą drogę z pocztą: potwierdzenie adresu, odnośnik do resetu, nowe hasło oraz pracę klawiaturą i fokus.
  - Not chosen:
    - sprawdzenie po scaleniu — ewentualny błąd psuje logowanie do cofnięcia zmiany
  - Source: human, 2026-11-01, „zgadzam się na komplet rekomendacji”, pozycja 14 pakietu. Podział „lokalnie agent, na serwerze testowym człowiek” rozstrzygnął project orchestrator w drugim pakiecie, a człowiek nie zgłosił sprzeciwu, 2026-11-01.
- Pytanie 10. Kto wpisuje do mapy części wzorzec `src/browser/*.tsx`, skoro zadanie 3 pisze zmieniony wpis `browser-view`, a `.the-way/elements/common/foundation_check.py:47` odrzuca wzorzec, do którego nie pasuje żaden śledzony plik?
  - Answer: Wzorzec `src/browser/*.tsx` wchodzi do mapy części z pierwszym plikiem, który do niego pasuje, a definicja zostaje bez zmian. Stawia go to zadanie, które stawia taki plik (WAY-126).
  - Not chosen:
    - poprawka definicji — nowa bramka i ponowne sprawdzenie planu za jeden wiersz
  - Source: human, 2026-11-01, „zgadzam się na komplet rekomendacji”, pozycja 15 pakietu.
- Pytanie 11. Gdzie w oknie stoi karta?
  - Answer: Karta stoi na środku okna, a ognisko i mag obok niej, z warunkiem „Przy oknie o szerokości od 1280 px ognisko i mag widać obok karty; na węższym wolno im zniknąć pod kartą.”. Warunek obrazu należy do zadania 3, a to zadanie stawia kartę na środku okna.
  - Not chosen:
    - nic nie zapisywać — dziś nic nie kosztuje, ale gdy mag będzie schowany, plik obrazu powstaje drugi raz
  - Source: human, 2026-11-01, odpowiedź na drugi pakiet: „wszystko według rekomendacji”, pytanie P4, droga A; pytanie wspólne z zadaniem 3, gdzie stoi jako jego pytanie o ognisko i maga. Szerokość 1280 px zaproponował project orchestrator, nie pochodzi ze źródła, a człowiek ją przyjął.
- Którym narzędziem składać kod przeglądarki?
  - Answer: esbuild.
  - Source: plan_mvp2_loop2.md, Open questions: „Którym narzędziem składać kod przeglądarki? — definition: breakdown — answer: esbuild (human, 2026-11-01)”.

## Context

- Plan rozdzielił logowanie na to zadanie i zadanie 3, bo „sam `account-screen.test.mjs` ma 3262 wiersze i 67 przypadków, więc React, esbuild i wymiana modelu dokumentu to dość ryzyka na jeden cykl, a kłopot z obrazem nie zablokuje Reacta” (plan, Change log, 2026-11-01).
- Szkic karty stoi w `rozpoznanie_mvp2/rozpoznanie_projektant.md`, część C.1; jest materiałem, nie decyzją.
- Szkic stawia wzmianki poza kartą, a D-96 wymienia je w karcie; obowiązuje D-96.
- Porównanie budowania ekranów, koszty Reacta i próby z imitacjami dokumentu stoją w `rozpoznanie_mvp2/technologia_budowanie_ekranow.md`, sekcja „Konsekwencje”.
- Punkty wejścia w kodzie (loop2 48544f0): `src/browser/view/account-screen.ts`, `src/browser/view/password-reset.ts`, `src/browser/view/app.ts:228` (`showForms`) i `:401` (nagłówek i stopka stoją zawsze), `src/browser/view/footer.ts`, `src/browser/styles.css:253`, `src/browser/kitchen-sink/kitchen-sink.ts:250`.
- Nazwa gry to dziś „Loop” (`src/browser/view/app.ts:101`).
- Strona wszystkich stanów ładuje moduły bez składania (`scripts/kitchen-sink.mjs:21`) i bierze z `account-screen.js` jedną stałą, `RESET_REQUESTED_SENTENCE` (`src/browser/kitchen-sink/kitchen-sink.ts:22`).
- Przeniesienie tej stałej do modułu bez Reacta może zostawić `scripts/kitchen-sink.mjs` bez zmian; tego nikt nie uruchomił.
- Ręczny model dokumentu w `tests/view/account-screen.test.mjs` zajmuje pierwsze 420 wierszy pliku razem z pomocnikami.
- Z 67 przypadków tego pliku 37 czyta wnętrze modelu wprost, 44 wywołuje zdarzenia przez `.fire`, 41 przechodzi przez całą stronę, a 13 nie robi żadnej z tych rzeczy (liczone skryptem po blokach `test(`, wynik przybliżony, loop2 48544f0).
- Przypadki przechodzące przez całą stronę budują też ekrany gry, które zostają w DOM, więc zastępstwo modelu musi nieść także je.
- Własne zastępcze dokumenty mają też `tests/invariants/test_icon_credits.py:82` i `tests/view/icons.test.mjs:124`, które rysują stopkę (`createFooter`).
- `tests/view/password-reset.test.mjs` sprawdza tylko czyste funkcje, a ekran „Ustaw nowe hasło” sprawdza `tests/view/account-screen.test.mjs`.
- Testy importują moduły z `dist/public/` po jednym pliku (`tests/view/account-screen.test.mjs:21`), a przeglądarka ładuje je dziś tak samo (`src/browser/index.html:11`).
- Serwer nie kompresuje plików (`src/server/app.ts:58`), a próba z raportu technologii dała około 218 KB więcej kodu na stronie.
- Każdy nowy pakiet przechodzi audyt D-33, a `scripts/audit_dependencies.py` porównuje plik blokady z punktem rozejścia gałęzi.
- Plik blokady powstaje na Windowsie, a obraz serwera buduje się na Linuksie (`Dockerfile:1`, `:4`, `:11`), więc musi nieść esbuilda dla obu systemów, bo „esbuild liczy się tam jako wiele pakietów, po jednym na system” (`rozpoznanie_mvp2/technologia_budowanie_ekranow.md:143`); człowiek przyjął ten koszt przy S6.
- Agent nie wdraża i nie wysyła poczty z serwera testowego: nie zakłada tam konta i nie naciska „Wyślij odnośnik” (`.claude/skills/loop2-deploy/SKILL.md:181`).
- Skill `loop2-deploy` obejmuje pięć pozycji listy WAY-139: wdrożenie commita requestu przed scaleniem, sekrety, wycofanie, podział pracy agenta i człowieka oraz czytanie dzienników, więc zadanie nie dostaje pozycji na tę pracę poza To do 17.
- Zmiana nie rusza schematu bazy, więc wdrożenie gałęzi przed scaleniem nie otwiera okna, w którym scalenie czegoś innego psuje serwer.

## Questions carried to cycle

- Czym zastąpić ręczny model dokumentu w testach ekranów przechodzących na React? (plan, Open questions: „definition: breakdown — plan: task 2”; Change log: „wybór między jsdom a happy-dom zapada na tym zadaniu, nie w ciemno”.)
- Jak wspólne kontrolki z `src/browser/view/controls/` istnieją w ekranie React, skoro pozostałe ekrany dalej używają ich w DOM (raport technologii: „W bibliotece stają się jej komponentami albo zostają jako owinięte elementy”), i co z tego widać na stronie wszystkich stanów?
- Jak `src/browser/view/app.ts`, który zostaje w DOM, osadza kartę napisaną w React?
- Gdzie stoi wynik kompilacji po modułach, którego używają testy, skoro D-06 składa kod przeglądarki w pliki podawane przez serwer?
- Czy reguł Reacta pilnuje narzędzie, skoro D-29 trzyma zestaw reguł ESLint bez zmian, czy tylko przewodnik i przegląd?
- Czy strona wszystkich stanów wstaje bez zmiany `scripts/kitchen-sink.mjs`, gdy stała `RESET_REQUESTED_SENTENCE` przejdzie do modułu bez Reacta?

## Human actions

- H1. Wdrożenie commita gałęzi na serwer testowy poleceniem `loop2-deploy <sha>` i przejście karty w przeglądarce pod `https://loop2.mariusznazar.com/` według „Deploying a request head and accepting it” w `.claude/skills/loop2-deploy/references/setup_and_secrets.md:304`: cztery stany, założenie konta testowego, potwierdzenie adresu z wiadomości, logowanie, wylogowanie, prośba o odnośnik, ustawienie nowego hasła z odnośnika oraz praca klawiaturą i fokus — in the cycle

## Decisions in play

Wpisy projektowane cytuje definicja `definicja_mvp2_loop2.md` (odcisk 8de9ffff), sekcja *Projected foundation changes*. Wpisy obecne cytuje `foundations/` przy loop2 48544f0. Mapa przydziałów pochodzi z sekcji *Projected entries* planu.

### Zadanie pisze w całości

- **D-03 — How is the browser view built?**

  > The browser view is built in TypeScript with React, its screens written as `.tsx` components that draw from the game state, and no other UI framework stands in its code or its runtime dependencies.

- **D-06 — How are the browser and server built together?**

  > The browser and server share one npm package and lockfile, and have separate TypeScript compilation configurations and output directories. Building the application compiles both configurations and bundles the browser's code, React included, into the files the server hands out.

- **D-36 — Which file is the exemplar for browser modules?**

  > The exemplar for kind `browser-module` is the first screen built with React, named by the task that builds it, and its kind guidelines are read before adding or changing a file of that kind. Keeping focus and passing user actions to the application remain examples alongside browser-view-framework and content-identifiers, without requiring `update()` in every module or forbidding the rebuilding of static elements.

- **browser-view-framework**

  > The browser view renders its screens with React and browser APIs, with no other UI framework in its code or runtime dependencies.

### Zadanie urzeczywistnia część, a resztę pisze inne zadanie

Część, którą kod tego zadania czyni prawdziwą, zadanie zapisuje w fundamencie (WAY-126).

- **D-96 — What does a player see before and after signing in?**

  > A signed-out visitor sees one card on a picture of the game: the game's name, one sentence about the game from the game's data, a switch between „Zaloguj się” and „Załóż konto”, the form of the state picked — email and password with the button „Nie pamiętam hasła”, or email, password and repeated password — and the folded credits, with neither headquarters nor program panel visible; that button puts in the card the form „Nie pamiętam hasła” with an empty field „Adres e-mail” and the buttons „Wyślij odnośnik” and „Wróć do logowania”, the last of which brings back „Zaloguj się”, and a page opened by a password-reset link shows the form „Ustaw nowe hasło” (D-225) in the card, for a signed-in player too, and builds no game while that form stands. Anyone can create an account without operator approval or email confirmation and immediately enters Siedziba signed in; signing in with email and password and reloading with a valid session, that form apart, also lead to Siedziba, or, when the saved game state holds a manual map run, to that map run — paused while it goes on, or on its screen after its end when it ended in a completion or in the character's death. The browser constructs the game only after the server confirms the session and then answers with the account's saved game state or that it has none, and an unavailable or uncertain answer to either request shows a warning and retry rather than an anonymous game or a new one; a saved game state that the game discards — of another version, naming an archetype missing from the data or of a shape the game does not admit — starts a new game, above which stands once, in `warning`, „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” for the first two and „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.” for the last.

- Część tego zadania: karta z nazwą gry, zdaniem, przełącznikiem, formularzami i zwiniętymi wzmiankami, bez obrazu gry (zadanie 3). Resztę wpisu pisze zadanie 4.

- **D-27 — Where do the game's icons come from?**

  > The game's icons are SVG files from game-icons.net, kept in `assets/icons/` outside the directory the account and save server serves and copied into that directory when the application is built. An icon file holds nothing that runs and refers to nothing outside itself. A section of credits, folded and opened with one click, stands on Siedziba and on the login card and credits each icon with its title as game-icons.net gives it, its author, its page on game-icons.net and its licence, and says how the icon file differs from its source.

- Część tego zadania: zwinięta sekcja wzmianek na karcie logowania. Stopka pod grą zostaje do zadania 24, które pisze resztę wpisu.

- **icon-credits**

  > For each SVG icon file directly in `assets/icons/`, the game's section of credits holds a credit that names the icon's title as its page on game-icons.net gives it, the icon's author, that page and the licence CC BY 3.0, and says how the icon file differs from its source.

- Część tego zadania: wzmianki w zwiniętej sekcji karty. Resztę wpisu pisze zadanie 24.

- **browser-view (changed)**

  > The part draws the game's screens in the browser, sends the browser's requests to the account and save server, and holds the kitchen-sink page that shows the shared controls, roles and tiles in every state. - **Files:** src/browser/*.ts src/browser/*.tsx src/browser/*.css src/browser/index.html src/browser/view/** src/browser/kitchen-sink/** assets/icons/** assets/fonts/** assets/sprites/** tests/view/** tests/account-api.test.mjs tests/invariants/test_browser_view_framework.py tests/invariants/test_icon_file_content.py tests/invariants/test_icon_credits.py tests/invariants/test_terrain_drawing_numbers.py tests/invariants/test_browser_view_token_values.py tests/invariants/test_browser_view_focus_outline.py tests/invariants/test_design_token_contrast.py tests/invariants/test_design_token_sources.py - **Depends on:** simulation · account-server - **Trust boundary:** assets/icons/** assets/fonts/** assets/sprites/**

- Część tego zadania: jeśli cykl postawi plik `.tsx` bezpośrednio w `src/browser/`, to zadanie wpisuje wzorzec `src/browser/*.tsx` do mapy razem z tym plikiem, a bez takiego pliku go nie wpisuje (pytanie 10); pliki w `src/browser/view/` mapa już obejmuje. Resztę wpisu pisze zadanie 3.

### Obecne decyzje, których zadanie dotyka

- **D-18 — Where does the game's content live?**

  > The game's content — game maps, items, creatures, character skills and their numbers — stands in data files. A game map, an item or a creature of a kind the simulation already handles is added by a change of data alone.

- **D-29 — Which rules check TypeScript and JavaScript?**

  > Every application, script and test TypeScript and JavaScript file of browser-view, simulation, account-server and build-tools passes local pinned ESLint 10.12.0 run with `--max-warnings 0` on `eslint.config.mjs`, which applies @eslint/js 10.0.1 `recommended` and, for TypeScript, typescript-eslint 8.71.2 flat `recommendedTypeChecked` unchanged, with globals 17.13.0 and TypeScript API 6.0.2 for the parser while application compilation stays on TypeScript 7, all within the one shared npm package and lockfile. That configuration sets `linterOptions.noInlineConfig`, so an inline configuration comment fails the check, and ignores only dependencies, generated files, the submodule and temporary work results, while the check runs with an empty bulk-suppressions file of its own, so an `eslint-suppressions.json` in the repository hides no report; review, in place of a check of the effective configuration, keeps its rules to those sets and its file patterns to that scope. Changing the rule set takes a human-accepted change of this decision.

- **D-33 — Which introduced dependency vulnerabilities block a change?**

  > The dependency audit passes without a network request where `package-lock.json` equals its version at {fork-point}, and otherwise fails on each advisory of low, moderate, high or critical severity that local pinned npm 12.2.1, run as `npm audit --json --package-lock-only --audit-level=low --include=dev --include=optional --include=peer --registry=https://registry.npmjs.org/`, reports for that lockfile and not for its version at {fork-point}, reading the npm/GitHub Advisory Database through the public npm registry when the check runs. A failed request or an unreadable report fails the audit; info does not block, and the low threshold has no automatic revision or scheduled threshold review. The audit covers the root npm package of build-tools with its direct, transitive, production, development, optional and peer dependencies, sending package names and versions without application code, while nested npm packages and runtime, container-image, operating-system and non-npm dependencies are outside it.

- **D-42 — Which accessibility requirements does the browser view keep?**

  > For now every screen of the browser view keeps three success criteria of WCAG 2.2, the W3C Recommendation of 12 December 2024 — 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast and 2.4.7 Focus Visible — and no other requirement of WCAG, with no date or event set for returning to it. Every role of the kind text but `text-disabled`, the signal colours included, has a contrast ratio of at least 4.5:1 on `page`, `panel` and `highlight`, and `text-disabled` has no threshold. `control-border`, `focus` and `character` have a contrast ratio of at least 3:1 against the colours they touch, and so has `tile-revealed` against `tile-hidden`.

- **D-43 — What counts in the browser view as a value written in place of a design token?**

  > In the files of the part browser-view other than its file of design tokens, a value written in place of a design token is a colour in any notation — hexadecimal, functional, a named colour or a system colour — in styles and in TypeScript and, in styles, a size or spacing in `px`, `rem` or `em`, a font name, or a unitless stroke width, dash pattern, opacity or font weight, those four unitless kinds being all. None is `0`, a percentage, a size in `fr`, `vw` or `vh`, a keyword such as `transparent`, `currentColor`, `inherit` or `none`, a screen-width threshold of an `@media` rule, the geometry of the terrain drawing computed in TypeScript, the `width` and `height` attributes of an image, a layout dimension — a width or height with its minimum and maximum, or the sizes of the columns of a layout grid — or the content of an icon file in `assets/icons/`, whose colour stands in the file and is changed by hand when the value of `text-strong` changes.

- **D-44 — Which controls do the screens of the browser view build on?**

  > The screens of the browser view build every button, select list, number field and text field from the six shared controls of `src/browser/view/controls/` — the button, the destructive button, the button selected in its group, the select list, the number field and the text field — and the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program” and „Zatrzymaj” are destructive buttons. A control awaiting a server response is disabled with text in `text-disabled`; the button that sends a form then reads „Logowanie…”, „Zakładanie konta…”, „Wysyłanie…” or „Ustawianie…” for the corresponding form — „Zaloguj się”, „Załóż konto”, „Nie pamiętam hasła” or „Ustaw nowe hasło” — and that form's fields are disabled, and the header's button „Wyślij ponownie” then reads „Wysyłanie…”. A form's server refusal and loss of connection appear as one sentence below the form in `warning`, the answer to a request for a password-reset link (D-222) appears in that place in `text-secondary`, and the kitchen-sink page shows the waiting and refusal states of every form, „Nie pamiętam hasła” and „Ustaw nowe hasło” included, and the form „Nie pamiętam hasła” with that answer.

- **D-45 — Where does the browser view's kitchen-sink page stand?**

  > The kitchen-sink page of the browser view is built from `src/browser/kitchen-sink/` and opened on the developer's machine by its own command, `npm run kitchen-sink`, and nothing `npm run build` writes, which is what reaches the test server, holds it. The page shows every shared control in each of its states or the reason a state does not apply, every role, and samples of tiles in each state drawn with the roles, never a drawing of the game from a game state.

- **D-47 — Which elements of the browser view are controls, and how does their focus show?**

  > A control of the browser view is every HTML element the browser lets the keyboard reach, links included, and the code marks none. One `:focus-visible` rule of the game's stylesheet draws the focus of every control from the role `focus`, and no other style or code of the part browser-view sets `outline` or an `outline-*` property, except that the kitchen-sink page's stylesheet repeats that rule with one more selector, for its sample of the focused state.

- **D-75 — When are complete player journeys tested in a real browser?**

  > Permanent tests of complete player journeys in a real browser are deferred, and a changed journey is checked manually. Automation is reconsidered when a critical-journey defect escapes smaller tests or repeated manual checking becomes a significant task cost; that task settles the tool and scope.

- **D-76 — When do fonts and the preview server gain refusal tests?**

  > Permanent refusal tests for font files and the local interface preview server are deferred until the first task changing the respective boundary, which introduces its refusal test and changes its invariant to method test. Until then, review checks font provenance and that the preview server serves only its own directory and only on the developer's machine.

- To zadanie zmienia ten wpis: zapisuje przy nim czytanie z wiersza S5 (pytanie 7), bo to pierwsze zadanie, które się na nim opiera. Po scaleniu D-76 niesie warunek, do którego odsyła odstępstwo dla `assets/sprites/**` w zadaniu 3.

- **D-88 — How are real browser events, focus and SVG checked?**

  > Real browser events, focus and SVG rendering are checked manually after a change and are not automated; tests using a hand-made document model prove only its modelled logic. Automation is reconsidered on a defect that the model missed or together with the player-journey automation of D-75, and this exclusion never covers a trust boundary.

- **D-97 — What does the player's logout do?**

  > The shared „Wyloguj” button stands in the header beside the title, first saves the current game state on the server while it reads „Wylogowywanie…”, and then ends only this browser's server-side session; a tab that stopped saving after the refusal of D-210 ends it without saving. When that save fails for want of a connection or by an error of the server, logout does not happen and the game stays with „Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.” in `warning`; when the server refuses the save as based on an earlier save than another browser's (D-209) or as too large (D-208), logout goes on; when it refuses it as of a lower version (D-210), and when the tab had already stopped saving after that refusal, logout goes on and the account forms show „Gra została zaktualizowana. Odśwież stronę.” in `warning` above them; and when it answers that there is no session, the game ends as D-211 gives. A confirmed logout returns to the account forms and hides the game, while a failed server operation keeps the game with a warning instead of claiming that logout succeeded; logout disposes the mounted game's timers and owned events, and stale account responses cannot remount it.

- **D-98 — Which player passwords are accepted?**

  > A player password has from 12 through 128 Unicode code points of any kind, without a digit or uppercase-letter requirement, and its content is preserved without trimming or normalization. Registration's repeated password and the repeated new password of a password reset equal the password exactly, a new password keeps to these rules with registration's sentences and is never compared with the account's old password, and browser validation uses the same code-point interpretation without making UTF-16 field limits authoritative.

- **D-99 — How are player email addresses compared and checked?**

  > The account server normalizes email with ECMAScript trim and lowercase, stores the normalized address uniquely, and accepts its form when exactly one `@` has nonempty text on both sides. It imposes no dot, DNS or ASCII restriction; confirmation establishes whether the address is real.

- **D-100 — What do duplicate registration and failed login tell the player?**

  > Registration with an email address that already has an account shows „Konto z tym adresem już istnieje.”. A credential login with an unknown address or a wrong password shows „Nieprawidłowy adres e-mail lub hasło.” without distinguishing the two, and so does, whatever the account's block, a login with the password that was right when it was checked and that a password reset replaced meanwhile, which is neither a failed nor a successful login for the attempt limits of D-102; a blocked account's correct password is refused as D-139 gives.

- **D-139 — What does the login of a blocked account tell the player?**

  > A login of a blocked account with the correct password is refused with „To konto jest zablokowane.”, status 403 and the code `account-blocked`, and no session, while a wrong password of a blocked account gets the login message of D-100. That refusal is neither a failed nor a successful login for the attempt limits of D-102: it adds no failure and clears none, and an address locked by failures refuses it as it refuses every login.

- **D-156 — How does an emailed link confirm a player's email address?**

  > The link of a confirmation message is the configured public origin followed by `/#confirm-email=<token>`, its token 32 random bytes written in base64url, of which the account database keeps only the SHA-256 digest. The game page the link opens sends the token to the account server in a request meeting D-104, also without a session, and shows „Potwierdzanie adresu…” in `text-secondary`, then „Adres e-mail potwierdzony.” in `positive`, „Odnośnik jest nieważny albo wygasł.” in `warning`, or, when the request gets neither answer, the account client's sentence of its failure in `warning` with the token kept in the page's address for a reload, above the account forms for a signed-out player and above the game for a signed-in one, whatever screen the game opens on. The server gives one and the same refusal to every token that is malformed, unknown, used, expired, of another kind or of a blocked account, and a confirmation stops every other confirmation link of the account.

- **D-157 — What does a signed-in player see of an unconfirmed address, and who may ask for another confirmation message?**

  > A signed-in player whose email address is unconfirmed sees on every screen, in the header on a line under the title and „Wyloguj”, „Adres e-mail niepotwierdzony.” in `text-secondary` and the shared button „Wyślij ponownie”, and both are gone once the address is confirmed. Only a signed-in player asks for another confirmation message, and it goes only to the address of that player's own account. Right after registration and after each sending asked for, the sentence in that place gives the outcome of the sending: „Wysłaliśmy odnośnik potwierdzający na <adres>.” in `text-secondary` when the message was sent, „Za dużo wiadomości. Spróbuj ponownie za godzinę.” above a limit of D-105, „Nie udało się wysłać wiadomości. Spróbuj ponownie później.” when the sending failed and the account client's sentence of its failure when the request for a message fails for another reason than an address already confirmed, the last three in `warning`, each beside „Wyślij ponownie”.

- **D-160 — What does an emailed link of a blocked account do?**

  > An emailed link of a blocked account, of an email confirmation or of a password-reset message, changes nothing and leaves the account as it is, and a player who opens such a confirmation link, or sends the form of such a password-reset link, sees „Odnośnik jest nieważny albo wygasł.” in `warning` above the account forms or above the game, as D-156 and D-225 give. A link that a block stopped stays stopped after the account is unblocked, and the player, signed in again, asks for a new confirmation message with „Wyślij ponownie”.

- **D-211 — What does the player see when a save of the game state finds no session?**

  > When the server answers a save of the game state that there is no session, whatever ended it — an expiry, a block of the account (D-137) or a password reset (D-138) — the game leaves the screen and its time stops, the account forms return with „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.” in `warning` above them, and the unsaved game state stays in the page's memory only, never in the browser's lasting storage, so a reload or a closing of the page before signing in loses it. After a sign-in to the same account the game sends that state and goes on from it, a manual map run in it coming back as D-96 and D-212 give; after a sign-in to another account the state is dropped and the game loads that account's saved game state.

- **D-222 — What does a request for a password-reset link answer?**

  > Every request for a password-reset link whose address is well formed under D-99 gets one and the same answer, which leaves before any work on an account and without waiting for the mail server, so neither its content nor its time tells what became of the request; the page then shows „Jeśli to konto ma potwierdzony adres, wysłaliśmy na niego odnośnik. Gdy wiadomość nie przyjdzie, spróbuj ponownie później.” in `text-secondary` under the form „Nie pamiętam hasła”, which stays with its address field empty and with „Wróć do logowania”. An address not so written gets „Podaj adres e-mail w postaci nazwa@domena.” under the field and nothing is sent: the form holds that condition, and so does the server, which refuses such an address with that sentence. Only after the answer does the server record and send a link, and only for an account with a confirmed address that is not blocked and within the limits of D-105, and a failure of that work shows only in the server's log.

- **D-224 — What form does a password-reset link take?**

  > The link of a password-reset message is the configured public origin followed by `/#reset-password=<token>`, its token 32 random bytes written in base64url, of which the account database keeps only the SHA-256 digest. The game page reads the token from the fragment of its address and sends it only with the form „Ustaw nowe hasło”, in a request meeting D-104.

- **D-225 — What does the form „Ustaw nowe hasło” hold, and how does it end?**

  > The form „Ustaw nowe hasło” holds the fields „Nowe hasło” and „Powtórz hasło” and the buttons „Ustaw hasło” and „Anuluj”, which removes the fragment of the address and opens the page as usual, and the page shows it without asking the server about the link, so a player learns that a link does not work only after sending the form. After the password is set, „Hasło zmienione. Zaloguj się nowym hasłem.” stands in `positive` above the account forms and the fragment is gone; after a refusal of the link, whatever its reason, the fragment is gone and the page runs its session check and puts „Odnośnik jest nieważny albo wygasł.” in `warning` above what that leads to, the account forms or the game. No connection or a full password gate leaves the form, one sentence under it and the link working.

## Settlements to record

Candidates: 11 shown, 6 accepted — 2026-11-01

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| S1 | Karta otwiera się na „Zaloguj się”; przełącznik stoi tylko w „Zaloguj się” i „Załóż konto” i tam formularz nie ma nagłówka, a „Nie pamiętam hasła” i „Ustaw nowe hasło” mają nagłówek, nie mają przełącznika i wychodzi się z nich przez „Wróć do logowania” i „Anuluj”. | decision | Pytanie 1 | który stan stoi po otwarciu karty, czy przełącznik zostaje w stanach „Nie pamiętam hasła” i „Ustaw nowe hasło” i czy formularz przy przełączniku ma nagłówek |
| S2 | Przełącznik czyści pola i komunikaty formularzy i stawia fokus w polu adresu. | decision | Pytanie 2 | czy wpisany adres przechodzi na drugi stan i czy każdy stan trzyma swoje pola |
| S3 | Zdanie strony stoi w karcie, nad przełącznikiem, a gdzie przełącznika nie ma, nad formularzem; zostaje przy przełączaniu stanów karty i odchodzi dopiero przy przejściu między kartą a grą. | decision | Pytanie 3 | czy zdanie stoi nad kartą, czy w niej, i czy przełącznik je kasuje |
| S4 | Ekrany oczekiwania nie stoją w karcie. | decision | Pytanie 4 | czy „Sprawdzanie logowania…” i ostrzeżenie ze „Spróbuj ponownie” stoją w karcie |
| S5 | Odstępstwo z D-76 kończy tylko zmiana zasady granicy: inny rodzaj pliku, inna droga wejścia, inny odbiorca, a zmiana budowania strony wszystkich stanów nie jest zmianą granicy serwera podglądu. | decision | Pytanie 7 | czy zmiana `scripts/kitchen-sink.mjs` wymaga testu odmowy i przestawienia `preview-server-access` na test |
| S6 | Kod przeglądarki składa esbuild. | decision | Pytanie „Którym narzędziem składać kod przeglądarki?” oraz pytanie P3 przeciw temu wyborowi, human, 2026-11-01, „wszystko według rekomendacji”: esbuild zostaje. Not chosen: inne narzędzie — przed cyklem trzeba próby z Vite, której nikt nie zrobił. | które narzędzie składa kod przeglądarki, gdy D-06 mówi tylko „bundles” |

## Out of scope

- Obraz gry za kartą, tekst na pełnym tle i droga pliku obrazu do serwera: zadanie 3.
- Zwinięcie wzmianek pod grą: zadanie 24.
- Przejście pozostałych ekranów na React: zadania 4, 5, 6 i 13.
