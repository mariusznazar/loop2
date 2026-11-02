# Karta logowania na obrazie gry, lokalnie i na serwerze testowym

Status: ready for cycle
Project relation: plan item: plan_mvp2_loop2.md — logowanie-na-tle-gry

## Description

### Need

- Niezalogowany gość widzi dziś formularze na pustym, czarnym tle i nic na tym ekranie nie pokazuje gry (zrzut `C:\Storage\The Brain\The Brain\.playwright-mcp\rozpoznanie\loop2_01_logowanie.png`).
- Zadanie 2 daje mu jedną kartę, ale ta karta dalej stoi na pustym tle strony.
- Mariusz chciał: „Strona logowania i rejestracji w dużo bardziej estetycznej formie” oraz „Może jakieś tło, żeby gra nie wyglądała tak bardzo formularzowo” (`rozpoznanie_mvp2\rozpoznanie_material.md:38-39`).
- Definicja projektu wymienia logowanie wśród rzeczy najważniejszych: „najbardziej zależy mi na edytorze, ludziku i stronie logowania, bo to obecnie jest w najgorszym stanie + podział na ekrany”.
- Cel zadania w planie: „Karta logowania stoi na obrazie gry, tekst leży na pełnym tle, a plik obrazu idzie z `assets/sprites/` przez budowanie do obrazu serwera, lokalnie i na serwerze testowym.”
- To pierwszy plik grafiki poza ikonami i czcionkami, więc zadanie otwiera drogę `assets/sprites/`, z której potem korzysta scena (zadania 6, 7 i 17–20).

### To do

1. Karta logowania stoi na obrazie gry we wszystkich swoich stanach: „Zaloguj się”, „Załóż konto”, „Nie pamiętam hasła” i „Ustaw nowe hasło”, ten ostatni także u zalogowanego gracza, który otworzył odnośnik do zmiany hasła.
   - Obraz pokazuje zimowy las nocą, ognisko i maga przy ogniu, jest przyciemniony i nieruchomy i zajmuje całe okno (pytanie 1).
   - Obraz stoi tylko razem z kartą: przy „Sprawdzanie logowania…”, „Potwierdzanie adresu…” i ostrzeżeniu ze „Spróbuj ponownie” go nie ma (pytanie 2).
   - Ognisko i mag stoją obok karty, którą zadanie 2 stawia na środku okna: „Przy oknie o szerokości od 1280 px ognisko i mag widać obok karty; na węższym wolno im zniknąć pod kartą.” (pytanie 8).
2. Każdy tekst na ekranie z obrazem leży na pełnym tle, nigdy na obrazie, a tło karty nie jest półprzezroczyste. Dotyczy to także zdań, które decyzje stawiają nad formularzami konta: „Hasło zmienione. Zaloguj się nowym hasłem.” i „Odnośnik jest nieważny albo wygasł.” (D-225, D-160), „Adres e-mail potwierdzony.” i zdania o błędzie połączenia (D-156), „Gra została zaktualizowana. Odśwież stronę.” (D-97) oraz „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.” (D-211). Te zdania stoją w karcie, nad przełącznikiem, a gdzie przełącznika nie ma, nad formularzem, więc leżą na jej tle (pytanie 6).
3. Plik obrazu leży w `assets/sprites/`, poza katalogiem podawanym przez serwer, pochodzi z paczki Pixel Crawler i jest obrazem PNG, a `npm run build` kopiuje go do katalogu podawanego przez serwer. Budowanie strony wszystkich stanów (`npm run kitchen-sink`) nie kopiuje plików z `assets/sprites/`.
4. Obraz serwera, czyli paczka, z której startuje kontener gry, zawiera ten plik, a karta stoi na obrazie gry lokalnie i na serwerze testowym.
5. README mówi, że budowanie kopiuje też pliki z `assets/sprites/`.
6. Fundament dostaje wszystko, co *Decisions in play* oznacza do zapisania w tym zadaniu:
   - W całości: niezmiennik `sprite-file-content`, fakt środowiska `pixel-crawler-terms` i zmieniony wpis mapy części `browser-view`.
   - W części, którą kod tego zadania czyni prawdziwą: wpisy D-96, „Where may a picture of the game stand?” i „Where do the scene's pictures come from?”.
   - Tabela *External context* mapy części dostaje partnera Pixel Crawler (pytanie 5).
   - Wpis mapy nie dostaje wzorca `src/browser/*.tsx`, jeśli żaden śledzony plik do niego nie pasuje (pytanie 7).
7. Fundament dostaje czasowe odstępstwo dla `assets/sprites/**` jako nową decyzję (pytanie 4), która odsyła do warunku końca zapisanego w D-76 i mówi, że kolejny plik PNG go nie kończy (pytanie 3).
   - Zamknięta lista odstępstw w D-73 dostaje numer tej decyzji, a `guidelines/testing.md:10` liczy i wymienia dziewięć odstępstw.
   - Wiersze `guidelines/testing.md:149`–`:150` dostają numer tej decyzji i niezmiennik `sprite-file-content`.
   - Tabela granic zaufania w `guidelines/testing.md` dostaje wiersz tej granicy, a akapit pod nią (`guidelines/testing.md:174`–`:178`) i zdanie `guidelines/testing.md:352`–`:353`, które mówią dziś tylko o fontach i podglądzie, obejmują też to odstępstwo.
   - Zmiany w `guidelines/testing.md` idą przez `maintain-testing-guidelines`.

### Questions to settle

- Pytanie 1. Co pokazuje obraz gry za kartą logowania, ile okna zajmuje i czy się rusza?
  - Answer: Zimowy las nocą, ognisko i mag przy ogniu, przyciemniony i nieruchomy, na całe okno. Krytyk nie potwierdził drzew ze śniegiem w paczce, więc las może wyjść inny.
  - Not chosen:
    - to samo bez maga — obraz mówi mniej o grze
    - płomień w ruchu — drugi plik i odejście od planu
  - Source: human, 2026-11-01, „zgadzam się na komplet rekomendacji” w odpowiedzi na cały pakiet rundy, pozycja 12. Zastrzeżenie o drzewach ze śniegiem sprostowały arkusze paczki, zob. *Context*.
- Pytanie 2. Czy obraz stoi także wtedy, gdy na ekranie nie ma karty: przy „Sprawdzanie logowania…” i przy ostrzeżeniu z „Spróbuj ponownie”?
  - Answer: Nie, obraz stoi tylko razem z kartą, a ekrany oczekiwania zostają bez obrazu. Wpis definicji: „A picture of the game stands behind the login card, in a band at the top of Siedziba and as the scene, and text stands on a solid background, never on a picture.” Jego *Meaning (pl)*: „Grafika stoi w trzech miejscach, obok tekstu, a tekst zawsze leży na pełnym tle.” Ekrany oczekiwania nie stoją w karcie, bo tak rozstrzygnęło zadanie 2: „Ekrany oczekiwania zostają jak dziś, z nagłówkiem i stopką, także po zalogowaniu”.
  - Not chosen:
    - obraz od pierwszej chwili — zalogowany gracz przy każdym przeładowaniu widzi przez moment obraz logowania, zanim wejdzie do gry, i pojawia się czwarte miejsce obrazu poza trzema z definicji
  - Source: definicja_mvp2_loop2.md:345 i :356, Status approved 2026-11-01, odcisk 8de9ffff; cytat pokazany człowiekowi i nieskreślony, 2026-11-01; część o ekranach oczekiwania: human, 2026-11-01, pakiet rundy, pozycja 10.
- Pytanie 3. Czy dołożenie kolejnego pliku PNG do `assets/sprites/` jest „pierwszą zmianą tej granicy”, która kończy czasowe odstępstwo z pytania 4?
  - Answer: Nie. Odstępstwo dla `assets/sprites/**` kończy tylko zmiana zasady granicy: inny rodzaj pliku, inna droga wejścia, inny odbiorca. Kolejny plik PNG nie kończy odstępstwa i plan się nie zmienia. Pierwsze zadanie, które na tym czytaniu się oprze, zapisuje je przy odstępstwie. Tym zadaniem jest zadanie 2, więc po nim czytanie stoi w D-76, a odstępstwo tego zadania odsyła do warunku zapisanego w D-76. Koszt przyjęty przez człowieka: kolejnych plików pilnuje przegląd, więc „czasowe” może w praktyce znaczyć „na stałe”.
  - Not chosen:
    - każda zmiana plików granicy — test przy zadaniu 6, które pierwsze dokłada obrazek, zmiana odpowiedzi „pliki testów żadne”, zmiana planu
    - nowe pliki się liczą, a zmiana budowania nie — te same koszty
  - Source: human, 2026-11-01, „zgadzam się na komplet rekomendacji” w odpowiedzi na cały pakiet rundy, pozycja 13. Odwołanie do D-76: human, 2026-11-01, „wszystko według rekomendacji” w odpowiedzi na cały drugi pakiet rundy, wiersz 3.C1 i wiersz 2.S5.
- Pytanie 4. Czy `assets/sprites/**`, nowa granica zaufania, dostaje stały test odmowy, jak każe zasada „Trust boundaries” w `guidelines/testing.md`, czy czasowe odstępstwo na wzór D-76, skoro `sprite-file-content` ma w definicji metodę `review`?
  - Answer: „czasowe odstępstwo na wzór D-76: przegląd zamiast stałego testu do pierwszej zmiany tej granicy, a zapisuje je zadanie 3”
  - Not chosen:
    - stały test odmowy, jak każe zasada „Trust boundaries” w `guidelines/testing.md` — plan nie zapisuje kosztu ani powodu człowieka
  - Source: plan_mvp2_loop2.md, *Open questions*, oddany 2026-11-01 (human, 2026-11-01), oraz wpis dziennika zmian planu z tego dnia.
- Pytanie 5. Jacy zewnętrzni partnerzy dochodzą do mapy części?
  - Answer: „partnera Pixel Crawler dopisuje zadanie 3, a LPC Wolf zadanie 20”
  - Source: plan_mvp2_loop2.md, *Open questions*, pytanie o pliki testów, miejsce ustawień Playwrighta i partnerów, oddany 2026-11-01 (human, 2026-11-01).
- Pytanie 6. Gdzie stoi jedno zdanie strony, które decyzje każą stawiać nad formularzami konta? (Pytanie wspólne z zadaniem 2, tam pytanie 3.)
  - Answer: Zdanie strony stoi w karcie, nad przełącznikiem, a gdzie przełącznika nie ma, nad formularzem, więc leży na pełnym tle karty. Zostaje przy przełączaniu stanów karty i odchodzi dopiero przy przejściu między kartą a grą, jak dziś.
  - Not chosen:
    - zdanie nad kartą — po zadaniu 3 potrzebny drugi panel na obrazie
    - zdanie znika przy przełączeniu — jedno kliknięcie kasuje „Gra została zaktualizowana. Odśwież stronę.”
  - Source: human, 2026-11-01, „zgadzam się na komplet rekomendacji” w odpowiedzi na cały pakiet rundy, pozycja 9. Brzmienie dla stanów bez przełącznika i to, że zdanie zostaje przy przełączaniu: human, 2026-11-01, „wszystko według rekomendacji” w odpowiedzi na cały drugi pakiet rundy, wiersz 2.S3 i pytanie P2.
- Pytanie 7. Czy to zadanie wpisuje do mapy części wzorzec `src/browser/*.tsx` z projektowanego wpisu `browser-view (changed)`?
  - Answer: Zadanie 3 nie wpisuje wzorca `src/browser/*.tsx`, jeśli żaden śledzony plik do niego nie pasuje, bo `.the-way/elements/common/foundation_check.py:47` odrzuca wzorzec bez pliku. Definicja zostaje bez zmian.
  - Not chosen:
    - poprawka definicji — nowa bramka i ponowne sprawdzenie planu za jeden wiersz
  - Source: human, 2026-11-01, „zgadzam się na komplet rekomendacji” w odpowiedzi na cały pakiet rundy, pozycja 15.
- Pytanie 8. Gdzie stoi karta w oknie i czy ognisko i mag mają być widoczne obok niej, a nie zasłonięte kartą? (Część o miejscu karty wspólna z zadaniem 2.)
  - Answer: Karta stoi na środku okna, ognisko i mag obok niej, z warunkiem: „Przy oknie o szerokości od 1280 px ognisko i mag widać obok karty; na węższym wolno im zniknąć pod kartą.” Warunek obrazu należy do tego zadania, a kartę na środku okna stawia zadanie 2.
  - Not chosen:
    - nic nie zapisywać — dziś nic nie kosztuje, ale gdy mag będzie schowany, plik obrazu powstaje drugi raz
  - Source: human, 2026-11-01, „wszystko według rekomendacji” w odpowiedzi na cały drugi pakiet rundy, pytanie P4. Szerokość 1280 px to propozycja orkiestratora, bez źródła w dokumentach, przyjęta przez człowieka.
- Pytanie 9. Kiedy człowiek ogląda kartę na obrazie gry na serwerze testowym?
  - Answer: W cyklu, przed scaleniem.
  - Not chosen:
    - sprawdzenie po scaleniu — ewentualny błąd psuje logowanie do cofnięcia zmiany
  - Source: human, 2026-11-01, „zgadzam się na komplet rekomendacji” w odpowiedzi na cały pakiet rundy, pozycja 14.

## Context

- Szkic karty i tła stoi w `rozpoznanie_mvp2\rozpoznanie_projektant.md`, części C.1 i C.2 oraz propozycja 9; to materiał, nie zatwierdzone wymaganie.
- Treść karty i jej przejście na React należą do zadania 2, a to zadanie dokłada obraz, pełne tło tekstu i drogę pliku.
- Numery wierszy poniżej są z commitu 48544f0 i mogą się przesunąć po zadaniach 1 i 2.
- Budowanie kopiuje ikony i czcionki w `scripts/static-files.mjs:12-29`, a katalogu `assets/sprites/` jeszcze nie ma.
- Tę samą funkcję kopiowania woła budowanie aplikacji i budowanie strony wszystkich stanów (`scripts/static-files.mjs:3`, `scripts/kitchen-sink.mjs:32`), więc plik dopisany do niej trafiłby też na serwer podglądu, a nowy odbiorca kończy odstępstwo (pytanie 3).
- Do obrazu serwera wchodzą dziś tylko dwa katalogi `assets/`: przepuszcza je `.dockerignore:7-8` i kopiuje `Dockerfile:8-9`.
- Droga ikon jest wzorem drogi pliku, a jej sprawdzenie w kontenerze stoi w `tests/invariants/test_loop2_container_icons.py`.
- Karta dziś to `src/browser/view/account-screen.ts:171`, formularz „Ustaw nowe hasło” to `src/browser/view/password-reset.ts`, a style to `src/browser/styles.css:253`.
- Pliki paczki leżą w `C:\Storage\repos\loop\assets\pixel-crawler\`: mag w `Entities\Npc's\Wizzard\`, ogniska w `Environment\Structures\Stations\Bonfire\`, drzewa w `Environment\Props\Static\Trees\`.
- Drzewa ze śniegiem w paczce są: stoją w czwartej kolumnie arkusza `Environment\Props\Static\Trees\Model_01\Size_05.png`, a jasnoniebieskie podłoże, wyglądające na śnieg, w `Environment\Tilesets\Floors_Tiles.png` (arkusze obejrzane 2026-11-01).
- Modele drzew `Model_02` i `Model_03` nie mają w `Size_05.png` wersji ze śniegiem.
- Warunki paczki pozwalają przerabiać jej grafikę, więc przyciemnienie na noc jest dozwolone (`pixel-crawler-terms`).
- Sposób cięcia arkuszy opisuje `C:\Storage\repos\loop\assets\README.md`, sekcja „Zanim czegokolwiek użyjesz”.
- Wycięte obrazki starego Loop leżą w `C:\Storage\repos\loop\public\sprites\`, ale stojąca tam postać to łotrzyk, a nie mag (`rozpoznanie_mvp2\rozpoznanie_frajda.md`, wiersz 92).
- Paczka Pixel Crawler nie wymaga wzmianki, więc zadanie nie dopisuje jej do wzmianek, o ile plik obrazu pochodzi tylko z tej paczki.
- Przyciemnienie zapisane w samym pliku nie wymaga nowej wartości wyglądu, a przyciemnienie w stylach wymagałoby nowego tokenu ze źródłem ustalonym z człowiekiem (styleguide, „Every value with its source”).
- Formularz „Ustaw nowe hasło” da się obejrzeć bez wysyłania wiadomości, bo strona pokazuje go, nie pytając serwera o odnośnik (D-225): wystarczy adres gry z `#reset-password=` i dowolnym tekstem.
- Lokalnie kartę na obrazie przechodzi agent, a na serwerze testowym człowiek (drugi pakiet rundy, 2026-11-01, bez sprzeciwu człowieka).

## Questions carried to cycle

- Jak złożyć obraz z kawałków paczki?
- W jakiej rozdzielczości powstaje plik obrazu?
- Jak obraz dopasowuje się do okna, skoro zajmuje je całe, a warunek z pytania 8 ma trzymać się od szerokości 1280 px?
- Czy skrypt składający obraz wchodzi do repozytorium?

## Human actions

- H1. Wdrożenie commita gałęzi zadania na serwer testowy zainstalowanym skryptem wdrożenia i obejrzenie pod publicznym adresem karty na obrazie gry w czterech stanach (pytanie 9) — in the cycle

## Decisions in play

Wpisy projektowane cytuje definicja `definicja_mvp2_loop2.md` (odcisk 8de9ffff), sekcja *Projected foundation changes*. Wpisy obecne cytuje `foundations/` przy loop2 48544f0. Mapa przydziałów pochodzi z sekcji *Projected entries* planu.

### Zadanie pisze w całości

- `sprite-file-content` (definicja, niezmiennik): „Every file the build copies from `assets/sprites/` is a PNG image.” — **Method:** review · **Rests on:** none · **Derives from:** TODO — Where do the scene's pictures come from?, projected in C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp2_loop2.md · **Part:** browser-view · **Violated:** no.
  - *Derives from* dostaje numer decyzji, którą to zadanie zapisuje z części wpisu „Where do the scene's pictures come from?” (niżej), więc ta decyzja stoi w fundamencie przed niezmiennikiem.
- `pixel-crawler-terms` (definicja, fakt środowiska): „The terms of the Pixel Crawler pack ask for no credit, allow its arts to be altered and used in commercial products, and forbid selling them as a final product.” — **Source:** repository loop, `assets/pixel-crawler/Terms.txt` § points 1, 2, 3 and 4 — "It is not necessary to credit the author for any use of the arts, but if it is done it is appreciated." · "The arts present can be altered in any shape, color or pattern" · "These arts cannot be sold as a final product, only the author can sell the assets" · "You can use these assets in creating commercial products, study or any other project where they are functional"; read 2026-11-01.
- `browser-view (changed)` (definicja, mapa części; urzeczywistniają zadania 2 i 3): opis części bez zmian, **Files:** src/browser/*.ts · src/browser/*.tsx · src/browser/*.css · src/browser/index.html · src/browser/view/** · src/browser/kitchen-sink/** · assets/icons/** · assets/fonts/** · assets/sprites/** · tests/view/** · tests/account-api.test.mjs · tests/invariants/test_browser_view_framework.py · tests/invariants/test_icon_file_content.py · tests/invariants/test_icon_credits.py · tests/invariants/test_terrain_drawing_numbers.py · tests/invariants/test_browser_view_token_values.py · tests/invariants/test_browser_view_focus_outline.py · tests/invariants/test_design_token_contrast.py · tests/invariants/test_design_token_sources.py; **Depends on:** simulation · account-server; **Trust boundary:** assets/icons/** · assets/fonts/** · assets/sprites/**.
  - Zadanie dopisuje `assets/sprites/**` do **Files** i **Trust boundary**, a wzorzec `src/browser/*.tsx` tylko według pytania 7.

### Zadanie urzeczywistnia część, a resztę pisze inne zadanie

Część, którą kod tego zadania czyni prawdziwą, zadanie zapisuje w fundamencie (WAY-126).

- D-96 — What does a player see before and after signing in? (definicja, wpis zmieniony; urzeczywistniają zadania 2, 3 i 4, zapisuje zadanie 4): „A signed-out visitor sees one card on a picture of the game: the game's name, one sentence about the game from the game's data, a switch between „Zaloguj się” and „Załóż konto”, the form of the state picked — email and password with the button „Nie pamiętam hasła”, or email, password and repeated password — and the folded credits, with neither headquarters nor program panel visible; that button puts in the card the form „Nie pamiętam hasła” with an empty field „Adres e-mail” and the buttons „Wyślij odnośnik” and „Wróć do logowania”, the last of which brings back „Zaloguj się”, and a page opened by a password-reset link shows the form „Ustaw nowe hasło” (D-225) in the card, for a signed-in player too, and builds no game while that form stands.”
  - Część tego zadania: słowa „on a picture of the game”, dopisane do D-96, który po zadaniu 2 mówi o karcie bez obrazu. Resztę pisze zadanie 4.
- (new) — Where may a picture of the game stand? (definicja; urzeczywistniają zadania 3, 6, 7 i 21, zapisuje zadanie 21): „A picture of the game stands behind the login card, in a band at the top of Siedziba and as the scene, and text stands on a solid background, never on a picture.”
  - Część tego zadania: nowa decyzja o miejscu za kartą i zasadzie o tekście, bez pasa w Siedzibie i bez sceny. Resztę pisze zadanie 21.
  - *Relations* i *Verification* mają w definicji `TODO`, więc cykl ustala je przy zapisie: `foundation_check.py` nie przyjmuje `TODO` w *Verification*.
- (new) — Where do the scene's pictures come from? (definicja; urzeczywistniają zadania 3, 6, 7, 17, 18, 19 i 20, zapisuje zadanie 20): „The scene's pictures are sprites of the packs Pixel Crawler and LPC Wolf, kept in `assets/sprites/` outside the directory the account and save server serves and copied into it when the application is built. A sprite file holds pixels alone, the game credits each pack whose licence asks for a credit, and the character of the scene is the pack's mage.”
  - Część tego zadania: nowa decyzja o paczce Pixel Crawler, katalogu poza katalogiem podawanym przez serwer, kopiowaniu przy budowaniu i zdaniu „A sprite file holds pixels alone”. Resztę, czyli LPC Wolf, wzmianki i maga sceny, pisze zadanie 20.
  - *Based on* tej decyzji to tylko `pixel-crawler-terms`, a *Verification* tylko `sprite-file-content`, bo `lpc-wolf-licence`, `sprite-credits` i `loop2-container-sprites` jeszcze nie stoją w fundamencie.
- `loop2-container-sprites` (definicja, niezmiennik; urzeczywistniają zadania 3, 7, 17, 18, 19 i 20, zapisuje zadanie 20): „The image of the application holds in the directory the account and save server serves every file the scene's drawing asks for.”
  - Część tego zadania: droga pliku do obrazu serwera (To do 4), bez zapisu wpisu, bo rysowania sceny jeszcze nie ma, więc kod tego zadania nie czyni prawdziwą żadnej części zdania.

### Obecne decyzje, których zadanie dotyka

- D-76 — When do fonts and the preview server gain refusal tests?: „Permanent refusal tests for font files and the local interface preview server are deferred until the first task changing the respective boundary, which introduces its refusal test and changes its invariant to method test. Until then, review checks font provenance and that the preview server serves only its own directory and only on the developer's machine.”
  - Po zadaniu 2 D-76 niesie czytanie warunku z pytania 3: odstępstwo kończy tylko zmiana zasady granicy. To zadanie go nie powtarza, tylko odsyła do niego (wiersz C1).
- D-73 — Which testing discipline does loop2 adopt?: „Loop2 adopts the testing-guideline template of its pinned the-way in full, with only the departures of D-74, D-75, D-76, D-77, D-78, D-79, D-163 and D-235. Its testing rules and the recipes of its levels stand in `guidelines/testing.md`, read before writing or changing a test.”
- D-40 — What do the neutral roles of the browser view mean? (fragment o tłach): „In the browser view the background `page` means that here is the game, `panel` a block set apart”.
- D-42 — Which accessibility requirements does the browser view keep? (fragment o kontraście): „Every role of the kind text but `text-disabled`, the signal colours included, has a contrast ratio of at least 4.5:1 on `page`, `panel` and `highlight`, and `text-disabled` has no threshold.”
- D-45 — Where does the browser view's kitchen-sink page stand?: „The kitchen-sink page of the browser view is built from `src/browser/kitchen-sink/` and opened on the developer's machine by its own command, `npm run kitchen-sink`, and nothing `npm run build` writes, which is what reaches the test server, holds it. The page shows every shared control in each of its states or the reason a state does not apply, every role, and samples of tiles in each state drawn with the roles, never a drawing of the game from a game state.”
- `preview-server-access`: „The interface preview server serves only files from `dist/kitchen-sink/` and only on the developer's machine.”
- D-87 — When are whole-screen pixel comparisons used?: „Whole screens are not preserved by pixel-by-pixel image comparison, while agreed appearance rules keep their checks and a changed appearance is inspected in a browser. Image comparison is reconsidered on a concrete visual defect or an agreed requirement for an exact layout; this exclusion does not cover the safety of external icons or fonts.”
- D-86 — Which files may a visitor obtain from the public server?: „Every visitor may retrieve the built game's files from its public directory and no file outside it. A request outside that directory, with a raw or encoded path, receives 400, 403 or 404 with neither that file's content nor the game's page.”
- D-11 — Which branch deploys loop2 to the test server?: „The deploy branch is `main`: a push to `main`, the merge of a pull request included, reaches the test server without anyone starting it by hand, deployed itself or within a later commit of `main` that contains it.”
- D-15 — How is loop2 recovered when a deployment goes wrong?: „A deployment that stops before it starts the new containers leaves the running loop2 containers in service. A rollback is a deployment of an earlier commit — a revert merged to `main`, or a human's run of the installed deploy script with that commit, which may name a commit of any branch of the GitHub repository while the automation's key deploys only commits of `main`. No earlier image is kept, so a rollback restores the earlier commit's code, never the data of that time.”
- D-225 — What does the form „Ustaw nowe hasło” hold, and how does it end? (fragment o zdaniach nad formularzami): „After the password is set, „Hasło zmienione. Zaloguj się nowym hasłem.” stands in `positive` above the account forms and the fragment is gone; after a refusal of the link, whatever its reason, the fragment is gone and the page runs its session check and puts „Odnośnik jest nieważny albo wygasł.” in `warning` above what that leads to, the account forms or the game.”
- D-156 — How does an emailed link confirm a player's email address? (fragment o zdaniach nad formularzami): „The game page the link opens sends the token to the account server in a request meeting D-104, also without a session, and shows „Potwierdzanie adresu…” in `text-secondary`, then „Adres e-mail potwierdzony.” in `positive`, „Odnośnik jest nieważny albo wygasł.” in `warning`, or, when the request gets neither answer, the account client's sentence of its failure in `warning` with the token kept in the page's address for a reload, above the account forms for a signed-out player and above the game for a signed-in one, whatever screen the game opens on.”
- D-160 — What does an emailed link of a blocked account do? (fragment): „An emailed link of a blocked account, of an email confirmation or of a password-reset message, changes nothing and leaves the account as it is, and a player who opens such a confirmation link, or sends the form of such a password-reset link, sees „Odnośnik jest nieważny albo wygasł.” in `warning` above the account forms or above the game, as D-156 and D-225 give.”
- D-97 — What does the player's logout do? (fragment): „when it refuses it as of a lower version (D-210), and when the tab had already stopped saving after that refusal, logout goes on and the account forms show „Gra została zaktualizowana. Odśwież stronę.” in `warning` above them”.
- D-211 — What does the player see when a save of the game state finds no session? (fragment): „the account forms return with „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.” in `warning` above them”.

## Settlements to record

Candidates: 4 shown, 1 accepted — 2026-11-01

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| C1 | „Czasowe odstępstwo na wzór D-76: przegląd zamiast stałego testu” dla `assets/sprites/**`, kończone warunkiem zapisanym w D-76; kolejny plik PNG go nie kończy. | decision | Pytania 3 i 4 | Cykl zapisałby „do pierwszej zmiany tej granicy” bez czytania, a zadanie 6, które pierwsze dokłada obrazek, samo zgadywałoby, czy dodaje stały test. |

## Out of scope

- Treść karty: nazwa gry, zdanie o grze, przełącznik, formularze i zwinięte wzmianki robi zadanie 2.
- Pas obrazu u góry Siedziby robi zadanie 21, a scenę zadania 6 i 7.
